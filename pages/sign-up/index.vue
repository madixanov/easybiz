<template>
  <div class="sign_up">
    <div class="sign_up-box">
      <div class="sign_up-modal">
        <label for="username">
          <p class="sign_up-modal-title">Имя</p>
          <input
            type="text"
            v-model="user.username"
            id="username"
            placeholder="Введите никнейм"
          />
        </label>
        <label for="email">
          <p class="sign_up-modal-title">Почта</p>
          <input
            type="email"
            v-model="user.email"
            id="email"
            placeholder="Введите почту"
          />
        </label>
        <label for="password">
          <p class="sign_up-modal-title">Пароль</p>
          <input
            type="text"
            id="password"
            v-model="user.password"
            placeholder="Введите пароль"
          />
        </label>
        <label for="telegram">
          <p class="sign_up-modal-title">Telegram</p>
          <input
            type="text"
            id="telegram"
            v-model="user.telegram"
            placeholder="Введите свой никнейм"
          />
        </label>
        <label for="instagram">
          <p class="sign_up-modal-title">Instagram</p>
          <input
            type="text"
            id="instagram"
            v-model="user.instagram"
            placeholder="Введите свой никнейм"
          />
        </label>
        <label for="facebook">
          <p class="sign_up-modal-title">Facebook</p>
          <input
            type="text"
            id="facebook"
            v-model="user.facebook"
            placeholder="Введите свой никнейм"
          />
        </label>
        <button class="sign_up-button" @click="sign_up">Регистрация</button>
      </div>
      <p class="sign_up-login">Уже существует аккаунт? <nuxt-link class="sign_up-login-link" to="/login">Войти</nuxt-link></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { apiDataFetch } from "~/composables/Exports";
import {
  FailedAlert,
  PushNotification,
  SuccessNotification,
} from "~/composables/Notification/list";
import type { UserInterface } from "~/interface/me/user";

const $router = useRouter();

definePageMeta({
  layout: "auth",
});

const user = ref<UserInterface>({
  username: "",
  email: "",
  password: "",
  roleId: "5c8b772a-f59b-4737-bae3-f086c9fb0252",
  telegram: "",
  facebook: "",
  instagram: "",
  image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
});

const sign_up = async () => {
  if (!user.value.username || !user.value.email || !user.value.password || !user.value.telegram || !user.value.instagram || !user.value.facebook) {
    return FailedAlert("Заполните все поля!");
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.value),
    };

    await apiDataFetch(`/users/sign-up`, options)
      .then((response) => response.json())
      .then(async (res) => {
        if(res.error){
            await FailedAlert(res.message);
            return
        }
        await SuccessNotification(res.message);
        localStorage.setItem("userEmail", res.data.email);
        setTimeout(() => {
            $router.push("/sign-up/otp");
        }, 3000);
      });
  }
};
</script>

<style lang="scss" scoped>
.sign_up {
  padding: 0 1.5rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  overflow-y: auto;

  &-logo {
    margin-bottom: 1.5rem;
  }

  &-box {
    width: 100%;
    max-width: 44rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &-modal {
    border: 0.1rem solid #e5e5e5;
    width: 100%;
    padding: 2.4rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    row-gap: 2.4rem;

    &-title {
      color: #000;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 3rem;
      letter-spacing: 0.015rem;
    }

    & label {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    & input {
      width: 100%;
      padding: 0.7rem 1.6rem;
      border: 0.1rem solid #e5e5e5;
      background: unset !important;
      border-radius: 0.4rem;
      outline: none;
      color: #000 !important;
    }
  }

   &-button {
    background: rgba(34, 156, 57, 0.15);
    color: #229c39;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.8rem;
    letter-spacing: 0.01rem;
    text-align: center;
    border: none;
    border-radius: 0.4rem;
    width: 100%;
    padding: 1.1rem 0;
    margin-top: 1rem;

    &:hover{
        background: rgba(34, 156, 57, 0.2);
    }
  }

  &-login{
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 120%;
    color: rgba(0, 0, 0, 0.8);

    &-link {
      color: #229c39;
      font-weight: 500;
      text-decoration: none;
    }
  }
}
</style>
