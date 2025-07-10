<template>
  <div class="request-wrapper">
    <h2 class="request-id">
      Обращение №{{ $router.currentRoute.value.params.id }}
    </h2>
    <div class="request-block">
      <div class="request-info">
        <div class="request-info-wrapper">
          <span class="request-info-details">
            {{ chat[0]?.sender.username }}
          </span>
        </div>
        <div class="request-info-date">
          {{ formatDate(chat[chat.length - 1]?.createdAt) }}
        </div>
      </div>
      <textarea
        name="sender"
        class="request-chat"
        :value="chat[0]?.content"
        readonly
      ></textarea>
    </div>
    
    <div v-if="chat.length === 2 && chat[1]?.sender.role.name === 'ADMIN'" class="request-block">
      <div class="request-info">
        <div class="request-info-wrapper">
          <span class="request-info-details">
            <!-- Тургунов Сардор / seller@gmail.com / +998903333322 -->
            {{ chat[1].sender.username }}
          </span>
        </div>
        <div class="request-info-date">{{ formatDate(chat[1]?.createdAt) }}</div>
      </div>

      <!-- <div class="mail-media" :style="{display: images? 'none' : 'flex'}"> -->
          <!-- <img :src="url" alt="image" > -->
      <!-- </div> -->

      <textarea
        name="admin-reply"
        class="request-chat"
        :value="chat[1]?.content"
        readonly
      ></textarea>
    </div>
    
    <div v-if="chat.length < 2 || chat[1]?.sender.role.name !== 'ADMIN'" class="request-block">
      <div class="request-info">
        <div class="request-info-wrapper">
          <span class="request-info-details">
            Тургунов Сардор / seller@gmail.com / +998903333322
          </span>
        </div>
        <div class="request-info-date">01/06/2025</div>
      </div>
      <textarea
        name="seller"
        v-model="message"
        class="request-chat"
        placeholder="Напишите ваше сообщение"
      ></textarea>
    </div>

    <div v-if="chat.length < 2 || chat[1]?.sender.role.name !== 'ADMIN'" class="request-send">
      <div class="request-send-wrapper" :class="{ disabled: message === '' }">
        <button class="request-send-button" @click="sendMessage">
          Отправить
        </button>
        <button class="request-send-arrow">
          <span v-html="arrow"></span>
        </button>
      </div>
    </div>

    <div class="request-footer">
      <span class="request-footer-title">
        Обращение №{{ $router.currentRoute.value.params.id }} <span v-if="chat.length === 2">завершено</span>
      </span>
      <span class="request-info-date">01/06/2025</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import arrow from "@/assets/arrow-down.svg?raw";
import { ref, onMounted } from "vue";
import type { Message } from "~/interface/mail/Message";
import { apiDataFetch } from "~/composables/Exports";
import {
  FailedAlert,
  SuccessNotification,
} from "~/composables/Notification/list";
const $router = useRouter();
const message = ref(
  "Спасибо за ваш комментарий! Будем рады видеть ваши отзывы снова!"
);

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const chat = ref<Array<Message>>([]);

const getRequests = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };

  try {
    const res = await apiDataFetch(
      `/chats/get-message?sessionId=${$router.currentRoute.value.params.id}`,
      options
    );
    if (!res.ok) {
      console.log("Error: " + res.status);
      return;
    }

    const req = await res.json();
    console.log(req);
    
    req.forEach((el: Message) => chat.value.push(el));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const sendMessage = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify({
      content: message.value,
    }),
  };

  try {
    const res = await apiDataFetch(
      `/chats/send-message/${$router.currentRoute.value.params.id}`,
      options
    );
    if (!res.ok) {
      FailedAlert("Сообщение не отправилось");
      return;
    } else {
      SuccessNotification(
        `Сообщение отправлено пользователю ${chat.value[0]?.sender.username}`
      );
      setTimeout(() => {
        $router.push("/messages/requests");
      }, 3000);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const connectChat = async ()=>{
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };

  await apiDataFetch(`/chats/connect-chat/${$router.currentRoute.value.params.id}`, options).then(res=> res.json()).then(res=>console.log(res))
}
onMounted(() => {
  connectChat()
  getRequests();
});
</script>

<style lang="scss" scoped>
.request {
  &-wrapper {
    max-width: 66rem;
    width: 100%;
  }

  &-id {
    font-size: 4rem;
    font-weight: 500;
    line-height: 100%;
    color: #000 !important;

    @media (max-width: 480px) {
      font-size: 3rem;
    }
  }

  &-block {
    width: 100%;
    margin-top: 2.5rem;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-details {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 120%;
      color: #000000;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    &-date {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 120%;
      color: #6f7375;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }

  &-chat {
    width: 100%;
    height: 16.1rem;
    padding: 1.5rem;
    font-size: 1.6rem !important;
    line-height: 200%;
    color: #000000;
    background: #fff;
    border-radius: 0.8rem;
    border: 0.1rem solid #e0e2e7;
    margin-top: 1.2rem;
    resize: none;
    outline: none;

    &::placeholder {
      color: #a3a5a9;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 140%;

      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
    }
  }

  &-send {
    width: 100%;

    &-wrapper {
      height: 3.6rem;
      display: flex;
      width: max-content;
      margin-left: auto;
      background: #229c39;
      border-radius: 0.4rem;
      overflow: hidden;

      &.disabled {
        opacity: 0.4;
        pointer-events: none;
        & > button {
          cursor: not-allowed;
        }
      }
    }

    &-button {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 120%;
      padding: 0 2rem;
      color: #fff;
      border-right: 0.1rem solid #e5e5e5;
    }

    &-arrow {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 0.8rem;
      cursor: pointer;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2.5rem;

    &-title {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 130%;
      color: #6f7375;
    }
  }
}
</style>
