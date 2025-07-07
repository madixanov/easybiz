<template>
  <div class="profile-form">
    <!-- <label for="password" class="profile-label">
      <p class="profile-label-title">Пароль</p>
      <input
        id="password"
        type="password"
        class="profile-label-input"
        :value="password"
        placeholder="Ваш пароль"
        readonly
      />
    </label> -->

    <label for="reset" class="profile-label media" v-if="success">
      <p class="profile-label-title">Изменить пароль</p>
      <input
        id="reset"
        type="text"
        class="profile-label-input"
        placeholder="Новый пароль"
        v-model="newPassword"
      />
      <button class="profile-label-verify" @click="reset">Подтвердить</button>
    </label>

    <label for="otp" class="profile-label full" v-if="!success">
      <p class="profile-label-title">
        Введите код для изменения пароля
        <span v-if="sended">Код отправлен на почту {{ email }}</span>
      </p>
      <div class="profile-label-otp">
        <input
          id="otp"
          type="text"
          class="profile-label-input"
          maxlength="6"
          placeholder="Введите код"
          v-model="otp"
        />
        <span class="profile-label-timer" v-if="sended">{{ formattedTime }}</span>
      </div>
      <div class="profile-label-btn">
        <button v-if="!sended" @click="sendOtp">Отправить код</button>
        <button v-else-if="otp.length === 6" @click="verifyOtp">Подтвердить</button>
        <button v-else disabled class="disabled">Повторить код</button>
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { apiDataFetch } from "~/composables/Exports";
import { ref, computed, onUnmounted, defineProps } from "vue";
import { FailedAlert, SuccessNotification } from "~/composables/Notification/list";

const props = defineProps<{
  email: undefined | string;
}>();

const success = ref(false);
const sended = ref(false);
const otp = ref("");
const newPassword = ref("");

const totalSeconds = ref(120);
let interval: ReturnType<typeof setInterval> | undefined;


const formattedTime = computed(() => {
  const minutes = Math.floor(totalSeconds.value / 60)
    .toString()
    .padStart(1, "0");
  const seconds = (totalSeconds.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const startTimer = () => {
  totalSeconds.value = 120;
  sended.value = true;

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
    } else {
      clearInterval(interval);
      sended.value = false;
    }
  }, 1000);
};

const sendOtp = async () => {
  if (sended.value) return;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify({
      to: props.email,
      subject: "Password Reset OTP",
    }),
  };

  const res = await apiDataFetch("/users/send-otp-reset", options);

  if (!res.ok) {
    FailedAlert('Попробуйте позже');
    return;
  }
  await res.json();
  SuccessNotification(`Код отправлен на почту ${props.email}`);
  startTimer();
};

const verifyOtp = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify({
      otp_code: otp.value,
      email: props.email,
    }),
  };

  const res = await apiDataFetch("/users/verify-otp-reset", options);

  if (res.ok) {
    await res.json();
    success.value = true;
    otp.value = "";
    SuccessNotification("Код подтвержден");
  } else {
    FailedAlert("Неправильный код");
    otp.value = "";
  }
};

const reset = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify({
      email: props.email,
      newPassword: newPassword.value,
    }),
  };

  await apiDataFetch("/users/reset-password", options)
    .then((res) => {
      if (res.ok) {
        newPassword.value = "";
        success.value = false;
        sended.value = false;
        clearInterval(interval);
        SuccessNotification("Пароль успешно изменён");
      } else {
        FailedAlert("Пароль должен содержать заглавную, строчную букву и цифру");
      }
    })
    .catch((error) => {
      console.error("Ошибка сети или сервера:", error);
    });
};

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style lang="scss" scoped>
.profile {
  &-label {
    &.media{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & > button{
        align-self: flex-end;
        margin-top: .6rem;
      }

      @media(max-width: 480px) {
        margin-bottom: 1.2rem;
      }
    }

    &-verify {
      font-size: 1.4rem !important;
      line-height: 100%;
      font-weight: 500;
      background: transparent;
      color: #3c3d51 !important;
      border: none;
    }

    &-otp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 1rem;
      background: #808b961a;
      border-radius: 0.4rem;

      & > input {
        background: transparent;
        width: max-content !important;
      }
    }

    &-btn {
      text-align: right;

      & > button {
        font-size: 1.4rem !important;
        line-height: 100%;
        font-weight: 500;
        background: transparent;
        color: #3c3d51;
        border: none;

        &.disabled{
          color:rgba(60, 61, 81, 0.5);
        }
      }
    }
  }
}
</style>
