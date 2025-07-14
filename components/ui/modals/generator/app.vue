<script lang="ts" setup>
import { FailedAlert, PushNotification } from "~/composables/Notification/list";

const emits = defineEmits(["close"]);

const website = ref({
  logo: "",
  title: "",
  description: "",
});
const myUserId = ref("");
const upload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = (target as any).files[0];

  const formData = new FormData();
  formData.append("files", value);
  const response = await apiDataFetch("/machines/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
    },
    body: formData,
  });

  const data = await response.json();

  website.value.logo = await data[0].url;

  const userData = await apiDataFetch("/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
    },
  });

  const userDataResponse = await userData.json();
  myUserId.value = await userDataResponse.id;

  const updateWebsiteData = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          url: website.value.title
            ? website.value.title.toLowerCase()
            : "website-" + myUserId + "-title" + ".easybiz.uz",
          author: myUserId,
          title: website.value.title
            ? website.value.title
            : "website-" + myUserId + "-title",
          description: website.value.description
            ? website.value.description
            : "website-" + myUserId + "-description",
          banner: website.value.logo,
        },
      }),
    };

    const response = await apiDataFetch("/machines", options);
    const data = await response.json();

    console.log(data);
  };

  await updateWebsiteData();
};

const updateApp = async () => {
  if (
    website.value.title.trim() === "" &&
    website.value.description.trim() === ""
  ) {
    return FailedAlert("Оба поля должны быть заполнены");
  }

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        url: website.value.title
          ? website.value.title.toLowerCase()
          : "website-" + myUserId + "-title" + ".easybiz.uz",
        title: website.value.title
          ? website.value.title
          : "website-" + myUserId + "-title",
        description: website.value.description
          ? website.value.description
          : "website-" + myUserId + "-description",
      },
    }),
  };

  const response = await apiDataFetch("/machines", options);
  const data = await response.json();

  console.log(data);
};
</script>

<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-container">
      <header class="modal-header">
        <h2 class="modal-header-title">Создать сайт</h2>
      </header>
      <div class="modal-main">
        <div class="modal-main-labels">
          <label for="web-logo" class="modal-main-label" role="logo">
            <p class="modal-main-label-title">Логотип</p>
            <input
              v-if="!website.logo"
              @input="upload($event)"
              id="web-logo"
              type="file"
              placeholder="Баннер для сайта"
            />
            <output v-else-if="website?.logo">
              <img :src="website?.logo" class="modal-main-logo" alt="" />
            </output>
          </label>
          <label for="web-name" class="modal-main-label">
            <p class="modal-main-label-title">Название</p>
            <input id="web-name" type="text" placeholder="Название сайта" />
          </label>
        </div>
        <div class="modal-window-labels">
          <label for="web-name" class="modal-window-label">
            <p class="modal-window-label-title">Описание</p>
            <textarea type="text" placeholder="Описание страницы"></textarea>
          </label>
        </div>
      </div>
      <button class="modal-save" @click="updateApp">Добавить сайт</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  padding: 4rem;
  transition: 300ms;
  opacity: 0;
  visibility: hidden;
  z-index: 0;

  &-container {
    width: 100%;
    height: 100%;
    max-width: 120rem;
    max-height: 60rem;
    overflow-y: auto;
    width: 100%;
    border-radius: 1rem;
    background: #fff;
    transition: 300ms;
    transition-delay: 300ms;
    transform: scale(0);
  }

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 1000;

    & .modal-container {
      transform: scale(1);
    }
  }

  &-header {
    padding: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.1rem solid #eeeeee;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    &-title {
      font-size: 1.5rem;
      line-height: 1.5;
    }
  }

  &-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    padding: 2rem;

    &-label {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 0.4rem;
      color: #000;

      &[role="logo"] {
        border-bottom: 0.1rem solid #eee;
        padding-bottom: 0.6rem;

        & input {
          padding: 0;
          border: unset;
          border-radius: unset;
          font-size: 1.2rem;
        }
      }

      &-title {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 120%;
        color: #000;
        margin-bottom: 0.4rem;
      }

      & input {
        width: 100%;
        padding: 1rem 1.5rem;
        background: #fff;
        border: 0.2rem solid #eeeeee;
        border-radius: 0.8rem;
        outline: none;
      }

      & label {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-save {
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    background: #229c39;
    border-radius: 0.8rem;
  }
}
</style>
