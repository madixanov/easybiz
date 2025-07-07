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
                    <input type="text" id="password" v-model="user.password" placeholder="Введите пароль" />
                </label>
                <button class="login-button" @click="login">Вход</button>
            </div>
            <p class="login-sign_up">Нет аккаунта? <nuxt-link class="login-sign_up-link" to="/sign-up">Зарегестрироваться</nuxt-link></p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { apiDataFetch, uri } from '~/composables/Exports';
import { setActivityMiddleware } from '~/middleware/history.activity';
import { FailedAlert, PushNotification } from '~/composables/Notification/list';

definePageMeta({
    layout: "auth"
})

const $router = useRouter()

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

        await apiDataFetch(`/users/sign-in`, options)
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