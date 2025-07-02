<template>
  <div class="profile">
    <div class="profile-wrapper screen80">
      <div class="profile-section" id="profilemain">
        <h3 class="profile-title">Основные</h3>
        <MeUploader :user="user" @update-image="updateImage" />
        <UiLoader
          :height="'100%'"
          style="position: relative"
          :has-background="false"
          v-if="!loaded"
        />
        <MeForm v-if="loaded && user" v-model:username="user.username" />
      </div>
      <div class="profile-section" id="profilesecurity">
        <h3 class="profile-title">Безопасность</h3>
        <UiLoader
          :height="'100%'"
          style="position: relative"
          :has-background="false"
          v-if="!loaded"
        />
        <MeSafety
          v-if="loaded"
          :email="user?.email"
        />
        <MeSessions
          v-if="loaded"
          :sessions="sessions"
          title="Сессии и устройства"
          name-prefix="Мобильное устройство"
          added-prefix="Вход выполнен"
          @alert="showAlert"
        />
      </div>
      <div class="profile-section" id="socials">
        <h3 class="profile-title">Интеграции</h3>
        <UiLoader
          :height="'100%'"
          style="position: relative"
          :has-background="false"
          v-if="!loaded"
        />
        <MeIcons v-if="loaded" :telegram="user.telegram" :instagram="user.instagram"/>
        <MeSocial
          v-if="loaded && user"
          v-model:telegram="user.telegram"
          v-model:instagram="user.instagram"
          v-model:facebook="user.facebook"
        />
      </div>
      <div class="profile-section" id="integrationsanalytics">
        <h3 class="profile-title">Аналитика</h3>
        <UiLoader
          :height="'100%'"
          style="position: relative"
          :has-background="false"
          v-if="!loaded"
        />
        <MeAnalytics :title="'Яндекс Метрика'" />
        <MeAnalytics :title="'Google Analytics'" />

        <!-- <MeSessions
          v-if="loaded"
          :sessions="cards"
          title="Платежи"
          name-prefix=""
          added-prefix="Добавлен в"
          @alert="showSecAlert"
        /> -->
      </div>
    </div>

    <div class="profile-wrapper screen20">
      <div class="profile-buttons">
        <button class="profile-buttons-btn" @click="save">Сохранить</button>
        <button class="profile-buttons-btn cancel" @click="cancel">
          Отменить
        </button>
      </div>
    </div>

    <transition name="fade">
      <Alert
        v-if="alert"
        :item="item"
        @close="showAlert"
        @delete="deleteSession"
        :name="'устройство'"
      />
    </transition>
    <transition name="fade">
      <Alert
        v-if="secAlert"
        :item="secItem"
        @close="showSecAlert"
        :name="'карты'"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { UserInterface } from "~/interface/me/user";
import type { SessionsInterface } from "~/interface/me/sessions";
import Alert from "~/components/ui/modals/alert.vue";
import { apiDataFetch } from "~/composables/Exports";
import { FailedAlert, PushNotification, SuccessNotification } from "~/composables/Notification/list";
const loaded = ref(false);

const sessionId = ref("");
const item = ref("");
const alert = ref(false);
const secAlert = ref(false);
const secItem = ref("");

const showAlert = (name: string, id: string) => {
  alert.value = !alert.value;
  item.value = name;
  sessionId.value = id;
};

const showSecAlert = (name: string) => {
  secAlert.value = !secAlert.value;
  secItem.value = name;
};

const sessions = ref<SessionsInterface[]>([]);
const user = ref<UserInterface | null>(null);
const originalUser = ref<UserInterface | null>(null);

const getData = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };

  const res = await apiDataFetch("/users/get-my-data", options);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const userData = await res.json();
  user.value = userData;
  originalUser.value = structuredClone(userData);
  await apiDataFetch("/users/get-my-sessions", options)
    .then((res) => res.json())
    .then((res) => res.data.map((e: any) => sessions.value.push(e)));
};

const deleteSession = async () => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };

  const res = await apiDataFetch(
    `/users/del-my-sessions/${sessionId.value}`,
    options
  );
  if (res.ok) {
    sessionId.value = "";
    PushNotification("Устройство удалено");
    alert.value = false;
  } else {
    FailedAlert("Что-то пошло не так");
    alert.value = false;
  }
  console.log(res.json(), "alert");
};

const updateImage = async (newImage: File) => {
  if (!user.value) return;

  const formData = new FormData();
  formData.append('image', newImage);

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
    body: formData,
  };

  try {
    const res = await apiDataFetch('/users/upload', options);
    const data = await res.json();

    if (res.ok && data) {
      const url = data.data.trim();
      const fileName = url.split('/').pop();

      user.value.image = fileName;
      SuccessNotification('Аватар обновлён');
    } else {
      FailedAlert('Не удалось обновить аватар');
    }
  } catch (error) {
    FailedAlert('Ошибка при загрузке изображения');
    console.error(error);
  }
};


// const cards = ref([
//   {
//     deviceType: '8880 **** ***3 1234',
//     date: '01.01.2025 00:00',
//     expiration: '01/30',
//   },
//   {
//     deviceType: '9860 **** ***3 1234',
//     date: '01.01.2024 00:10',
//     expiration: '01/29',
//   },
// ]);

const save = async () => {
  if (!user.value || !originalUser.value) return;

  const allowedFields = ["username", "telegram", "instagram", "facebook"];
  const changedFields: Record<string, string> = {};

  for (const key of allowedFields) {
    const current = user.value?.[key as keyof UserInterface];
    const original = originalUser.value?.[key as keyof UserInterface];

    if (current !== original && typeof current === "string") {
      changedFields[key] = current;
    }
  }

  if (Object.keys(changedFields).length === 0) {
    FailedAlert("Нет изменений");
    return;
  }

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify(changedFields),
  };

  const res = await apiDataFetch(
    `/users/update-self/${user.value.id}`,
    options
  );

  if (res.ok) {
    PushNotification("Изменения сохранены");
    originalUser.value = JSON.parse(JSON.stringify(originalUser.value));
  } else {
    FailedAlert("Не удалось сохранить изменения");
  }
};

const cancel = () => {
  user.value = JSON.parse(JSON.stringify(originalUser.value));
  console.log(user.value, "user after cancel");
};

onMounted(async () => {
  await getData();

  setTimeout(() => {
    loaded.value = true;
  }, 100);
});
</script>