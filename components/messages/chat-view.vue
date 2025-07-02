<template>
  <section class="mail-chat">
    <div class="mail-block" v-for="msg in messages" :key="msg.id">
      <div class="mail-info">
        <div class="mail-info-wrapper">
          <span class="mail-info-details">{{ msg.sender.username }}</span> 
          <span class="mail-info-fav" v-html="fav" @click="saveMessage(msg.id)"></span>
        </div>
        <div class="mail-info-date">{{ new Date(msg.createdAt).toLocaleDateString('ru-RU') }}</div>
      </div>
      <textarea readonly class="mail-input" :value="msg.content"></textarea>
    </div>

    <div class="mail-block" :style="{display: messages?.length === 2 ? 'none' : 'block'}">
      <div class="mail-info">
        <div class="mail-info-wrapper">
          <span v-html="reply"></span>
          <span class="mail-info-details">Geekart@gmail.com</span>
        </div>
      </div>
      <textarea
        v-model="msj"
        name="reply"
        class="mail-input"
        placeholder="Напишите сообщение..."
      ></textarea>
    </div>

    <div class="mail-buttons" :style="{display: messages?.length === 2 ? 'none' : 'flex'}">
      <button class="mail-button" @click="sendMessage" :disabled="!msj.trim()">Отправить</button>
      <button>
        <span v-html="media"></span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { apiDataFetch } from "~/composables/Exports";
import {FailedAlert, PushNotification, SuccessNotification} from '~/composables/Notification/list';
import type { Message } from "~/interface/mail/Message"
import reply from "@/assets/icons/mailbox/reply.svg?raw";
import media from "@/assets/icons/mailbox/media.svg?raw";
import fav from "@/assets/icons/chat/star.svg?raw";

const $router = useRouter();
const msj = ref<string>('')
console.log(msj.value);

const messages = ref<Message[]>()

const getMessages = async ()=>{
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  const res = await apiDataFetch('/users/get-message', options)
  const data = await res.json();
  messages.value = data.filter((msg: any) => msg.sessionId === $router.currentRoute.value.params.id);

  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  console.log(messages.value?.[0]);
  await apiDataFetch(`/users/message-isRead/${messages.value?.[0].id}`, option)
  await apiDataFetch(`/users/connect-chat/${messages.value?.[0].sessionId}`, option)
}


const sendMessage = async () => {
  if (!msj.value.trim()) return;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify({
      content: msj.value.trim(),
    }),
  };

  try {
    const res = await apiDataFetch(`/users/send-message/${$router.currentRoute.value.params.id}`, options);

    if (!res.ok) {
      FailedAlert("Сообщение не отправилось");
      return;
    } else {
      PushNotification("Сообщение отправлено пользователю");
    }
    console.log("Сообщение отправлено:", await res.json());
  } catch (error) {
    console.error("Ошибка при отправке:", error);
  }
};

const saveMessage = async (id: string)=>{
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    }
  };
  await apiDataFetch(`/users/favorites/${id}`, options).then(res=>res.json()).then(res=> SuccessNotification(res.message))
}

onMounted(()=>{
  getMessages()
})
</script>

<style lang="scss" scoped></style>
