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
          <div class="sign_up-modal-wrapper">
            <input
              :type="showPass ? 'text' : 'password'"
              id="password"
              v-model="user.password"
              placeholder="Введите пароль"
            />
            <span
              v-html="eye"
              class="sign_up-modal-eye"
              :class="{ show: showPass }"
              @click="toggle"
            ></span>
          </div>
        </label>
        <button class="sign_up-button" @click="sign_up">Регистрация</button>
      </div>
      <p class="sign_up-login">
        Уже существует аккаунт?
        <nuxt-link class="sign_up-login-link" to="/login">Войти</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import eye from "~/assets/icons/eye.svg?raw";
import { useRouter } from "vue-router";
import { apiDataFetch } from "~/composables/Exports";
import {
  FailedAlert,
  SuccessNotification,
} from "~/composables/Notification/list";
import type { UserInterface } from "~/interface/me/user";

const showPass = ref(false);  

const toggle = () => {
  showPass.value = !showPass.value;
};

const $router = useRouter();

definePageMeta({
  layout: "auth",
});

const user = ref<UserInterface>({
  username: "",
  email: "",
  password: "",
  roleId: "5c8b772a-f59b-4737-bae3-f086c9fb0252",
  image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
});

const sign_up = async () => {
  if (!user.value.username || !user.value.email || !user.value.password) {
    return FailedAlert("Заполните все поля!");
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.value),
    };
    const res = await apiDataFetch(`/auth/sign-up`, options);
    const data = await res.json();
    console.log(res, "response");
    if (!res.ok) {
      return FailedAlert(data.message);
    }
    await SuccessNotification(data.message);
    localStorage.setItem("userEmail", data.data.email);
    setTimeout(() => {
      $router.push("/sign-up/otp");
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
.sign_up {
  padding: 2rem 1.5rem;
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
    row-gap: 1rem;

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
      padding: 0.7rem 3.4rem 0.7rem 1.6rem;
      border: 0.1rem solid #e5e5e5;
      background: unset !important;
      border-radius: 0.4rem;
      outline: none;
      color: #000 !important;
    }

    &-wrapper {
      position: relative;
      width: 100%;
    }

    &-eye {
      width: 3.6rem;
      height: 100%;
      position: absolute;
      bottom: 0;
      right: 0;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        width: 2.2rem;
        height: 0.2rem;
        background: #4d4d4d;
        top: 50%;
        left: 20%;
        transform: rotate(45deg);
        display: none;
      }
      &.show {
        &::after {
          display: block;
        }
      }
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

    &:hover {
      background: rgba(34, 156, 57, 0.2);
    }
  }

  &-login {
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
