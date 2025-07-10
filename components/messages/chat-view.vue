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
      <div class="mail-media" :style="{display: images.length === 0 ? 'none' : 'flex'}">
        <div class="mail-media-wrapper" v-for="url in images" :key="images">
          <UiLoader v-if="!loaded"/>
          <img :src="url" alt="image" v-else>
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
      <label class="mail-buttons-upload" for="file-upload">
        <input hidden
        id="file-upload"
          type="file"
          ref="fileInput"
          accept=".jpg,.jpeg,.png,.svg"
          @change="onFileSelected"
         />
        <span v-html="media"></span>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { apiDataFetch, USER_FETCH_HOST } from "~/composables/Exports";
import {FailedAlert, PushNotification, SuccessNotification} from '~/composables/Notification/list';
import type { Message } from "~/interface/mail/Message"
import reply from "@/assets/icons/mailbox/reply.svg?raw";
import media from "@/assets/icons/mailbox/media.svg?raw";
import fav from "@/assets/icons/chat/star.svg?raw";

const loaded = ref(false)
const $router = useRouter();
const msj = ref<string>('')
const messages = ref<Message[]>()
const images = ref<any>([])

const onFileSelected = async (event: Event) => {
  loaded.value = false
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file); 

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
    body: formData,
  }

  try {
    const response = await apiDataFetch('/chats/uploads/file', options);

    if (!response.ok) {
      return FailedAlert(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    images.value.push(data.mediaUrl);
    SuccessNotification('Файл успешно загружен');
    setTimeout(() => {
      loaded.value = true;
    }, 1000);
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
  }
};

const getMessages = async ()=>{
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  const res = await apiDataFetch('/chats/get-message', options)
  const data = await res.json();
  messages.value = data.filter((msg: any) => msg.sessionId === $router.currentRoute.value.params.id);
  console.log(messages.value, 'mes');
  
  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  
  await apiDataFetch(`/chats/message-isRead/${messages.value?.[0].id}`, option)
  await apiDataFetch(`/chats/connect-chat/${messages.value?.[0].sessionId}`, option)
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
      mediaUrl: images.value.length > 0 ? images.value[0] : null,
    }),
  };

  try {
    const res = await apiDataFetch(`/chats/send-message/${$router.currentRoute.value.params.id}`, options);

    if (!res.ok) {
      FailedAlert("Сообщение не отправилось");
      return;
    } else {
      PushNotification("Сообщение отправлено пользователю");
      $router.push(`/messages/incoming`);
    }
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
  await apiDataFetch(`/chats/favorites/${id}`, options).then(res=>res.json()).then(res=> SuccessNotification(res.message))
}

onMounted(()=>{
  getMessages()
  setTimeout(() => {
    loaded.value = true
  }, 1500)
})
</script>

<style lang="scss" scoped></style>
