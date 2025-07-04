<template>
  <div class="mail">
    <aside class="mail-sidebar" v-if="isDesktop">
      <div class="mail-sidebar-header">
        <h2 class="mail-sidebar-title">Входящие</h2>
      </div>
      <ChatList :chats="savedChats" :route="'saved'" />
    </aside>

    <section class="mail-chat" v-if="chat.length > 0">
    <div class="mail-block">
      <div class="mail-info">
        <div class="mail-info-wrapper">
          <span class="mail-info-details">{{ chat[0].message.sender.username }}</span> 
          <span class="mail-info-fav" v-html="fav" @click="saveMessage(chat[0].messageId)"></span>
        </div>
        <div class="mail-info-date">{{ new Date(chat[0].message.createdAt).toLocaleDateString('ru-RU') }}</div>
      </div>
      <textarea readonly class="mail-input" :value="chat[0].message.content"></textarea>
    </div>

    <!-- <div class="mail-block" :style="{display: messages?.length === 2 ? 'none' : 'block'}">
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
    </div> -->
  </section>
  </div>
</template>

<script setup lang="ts">
import { apiDataFetch } from "~/composables/Exports";
import ChatList from "~/components/messages/chat-list.vue";
import type { ChatItem, SavedChatItem } from "~/interface/mail/Message";
import { SuccessNotification } from '~/composables/Notification/list';
import fav from "@/assets/icons/chat/star.svg?raw";

const $router = useRouter();
const chat = ref<SavedChatItem[]>([]);
const savedChats = ref<SavedChatItem[]>([]);
const isDesktop = ref(true);

const fetchSavedChats = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  try {
    const response = await apiDataFetch("/users/favorites", options);
    const data: SavedChatItem[] = await response.json();
    savedChats.value = data;
    chat.value = data.filter(fav => fav.messageId === $router.currentRoute.value.params.id);
    console.log('chat', chat.value);
  } catch (error) {
    console.error("Ошибка:", error);
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

onMounted(() => {
  fetchSavedChats();
  isDesktop.value = window.innerWidth >= 768;
});
</script>

<style lang="scss" scoped></style>
