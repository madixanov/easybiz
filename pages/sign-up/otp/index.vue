<template>
  <div class="otp">
    <div class="otp-box">
      <div class="otp-modal" :style="{display: sended ? 'flex' : 'flex'}">
        <label for="otp">
          <p class="otp-modal-title">Код подтверждения</p>
          <span class="otp-timer" :style="{display: sended ? 'inline-block' : 'none'}">{{ formattedTime }}</span>
          <div class="otp-modal-inputs">
            <input
              v-for="(digit, index) in digits"
              :key="index"
              id="otp"
              type="text"
              maxlength="1"
              inputmode="numeric"
              autocomplete="one-time-code"
              class="otp-modal-digit"
              v-model="digits[index]"
              @input="onInput(index, $event)"
              @keydown.backspace="onBackspace(index, $event)"
              ref="inputs"
            />
          </div>
        </label>
        <button class="otp-button" @click="verifyOtp" :disabled="!isValidOtp">
          Подтвердить
        </button>
        <button class="otp-reset" :disabled="sended" @click="sendOtp">Повторно отправить код</button>
      </div>
      <div class="otp-modal" :style="{display: !sended ? 'none' : 'none'}">
        <label>
          <p class="otp-modal-title">Отправить код для активации акаунта</p>
        </label>
        <button class="otp-button" @click="sendOtp">
          Отправить код
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { apiDataFetch } from "~/composables/Exports";
import {
  FailedAlert,
  SuccessNotification,
} from "~/composables/Notification/list";
const $router = useRouter();

definePageMeta({
  layout: "auth",
});

const localEmail = localStorage.getItem('userEmail')

const sended = ref(false)

const digits = ref<string[]>(["", "", "", "", "", ""]);

const inputs = ref<HTMLInputElement[]>([]);

const isValidOtp = computed(() => digits.value.every((d) => /^\d$/.test(d)));

const totalSeconds = ref(10);
let interval: ReturnType<typeof setInterval> | undefined;
const formattedTime = computed(() => {
  const minutes = Math.floor(totalSeconds.value / 60)
    .toString()
    .padStart(1, "0");
  const seconds = (totalSeconds.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const startTimer = () => {
  totalSeconds.value = 10;
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


function onInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  digits.value[index] = target.value.replace(/\D/g, "").slice(0, 1);
  if (digits.value[index] && index < digits.value.length - 1) {
    nextTick(() => {
      inputs.value[index + 1]?.focus();
    });
  }
}

function onBackspace(index: number, event: KeyboardEvent) {
  if (!digits.value[index] && index > 0 && event.key === "Backspace") {
    nextTick(() => {
      inputs.value[index - 1]?.focus();
    });
  }
}

const sendOtp = async () => {
  if (sended.value) {
    return FailedAlert("Код уже отправлен!");
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        to: localEmail,
        subject: "OTP Verification"
    }),
  };

  await apiDataFetch(`/users/send-otp`, options)
    .then((response) => response.json())
    .then(async (res) => {
      sended.value = true;
      await SuccessNotification(res.message);
      startTimer();
    });
};

const verifyOtp = async () => {
  if (!isValidOtp.value) {
    return FailedAlert("Пожалуйста, введите 6 цифр!");
  }
  const otp = digits.value.join("");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: localEmail,
        otp_code: otp
    }),
  };

  await apiDataFetch(`/users/verify-otp`, options)
    .then((response) => response.json())
    .then(async (res) => {
      sended.value = false;
      await SuccessNotification(res.message);
      setTimeout(() => {
        $router.push("/login");
      }, 3000);
    });
};
</script>

<style lang="scss" scoped>
.otp {
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 2.4rem;

    &-title {
      text-align: center;
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

    &-inputs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

   &-digit{
    width: 3.6rem;
    height: 3.6rem;
    font-size: 2rem;
    text-align: center;
    border: 0.1rem solid #e5e5e5;
    border-radius: 0.4rem;
    outline: none;
    background: unset !important;
    color: #000 !important;

    &:focus {
      border-color: rgba(34, 156, 56, 0.8);
      box-shadow: 0 0 .4rem #229c39;
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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover{
        background: rgba(34, 156, 57, 0.2);
    }
  }

  &-reset{
    font-size: 1.2rem;
    color: #229c39;

    &:disabled{
      color: rgba(34, 156, 56, 0.7);
    }
  }

  &-timer{
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    color: #000;
    margin: 1rem 0;
  }
}
</style>
