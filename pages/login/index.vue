<template>
    <div class="login">
        <div class="login-box">
            <div class="login-modal">
                <label for="login">
                    <p class="login-modal-title">Логин</p>
                    <input type="email" v-model="user.email" id="login" placeholder="Введите логин" />
                </label>
                <label for="password">
                    <p class="login-modal-title">Пароль</p>
                    <div class="login-modal-wrapper">
                        <input :type="showPass ? 'text': 'password'" id="password" v-model="user.password" placeholder="Введите пароль" />
                        <span v-html="eye" class="login-modal-eye" :class="{show: showPass}" @click="toggle"></span>
                    </div>
                </label>
                <button class="login-button" @click="login">Вход</button>
            </div>
            <p class="login-sign_up">Нет аккаунта? <nuxt-link class="login-sign_up-link" to="/sign-up">Регистрация</nuxt-link></p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import eye from '~/assets/icons/eye.svg?raw';
import { ref } from 'vue';
import { apiDataFetch, uri } from '~/composables/Exports';
import { setActivityMiddleware } from '~/middleware/history.activity';
import { FailedAlert, PushNotification } from '~/composables/Notification/list';

definePageMeta({
    layout: "auth"
})

const showPass = ref(false);

const toggle = () => {
    showPass.value = !showPass.value;
};

const user = ref({
    email: "",
    password: ""
})

const checkUserAlive = async (token: string) => {
    const response = await apiDataFetch(`/users/get-my-data`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
    });
    if (response.ok) return true;
    else return false;
};

const login = async () => {
    if (!user.value.email || !user.value.password) {
        return FailedAlert("Заполните все поля!")
    } else {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.value)
        }

        await apiDataFetch(`/auth/sign-in`, options)
            .then(response => response.json())
            .then(async response => {
                const data = response;
                if (!response.error) {
                    localStorage.setItem("Authorization", data.accessToken);
                    const isAlive = await checkUserAlive(data.accessToken);
                    if (!isAlive) {
                        localStorage.removeItem("Authorization");
                        return FailedAlert("Вы неправильно ввели логин или пароль!");
                    }
                    if (response.message) {
                        await PushNotification(response.message);
                        localStorage.removeItem("userEmail");
                    }
                }
            })

        setActivityMiddleware(`Вошел в систему`, 'user_signed_up');
    }
}
</script>

<style lang="scss" scoped>
.login {
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

        &-wrapper{
            position: relative;
            width: 100%;
        }

        &-eye{
            width: 3.6rem;
            height: 100%;
            position: absolute;
            bottom: 0;
            right: 0;
            cursor: pointer;

            &::after{
                content: '';
                position: absolute;
                width: 2.2rem;
                height: .2rem;
                background: #4D4D4D;
                top: 50%;
                left: 20%;
                transform: rotate(45deg);
                display: none;
            }
            &.show{
                &::after{
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

    &:hover{
        background: rgba(34, 156, 57, 0.2);
    }
  }

  &-sign_up{
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