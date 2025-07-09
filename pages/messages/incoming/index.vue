<template>
  <div class="mail">
    <aside class="mail-sidebar" v-if="isDesktop">
      <div class="mail-sidebar-header">
        <h2 class="mail-sidebar-title">Входящие</h2>
      </div>
      <ChatList :chats="chats" :route="'incoming'"/>
    </aside>

    <div class="mail-box">
      <h4 class="mail-chat-text">Нажмите на чат, чтобы прочитать сообщение</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiDataFetch } from "~/composables/Exports";
import ChatList from "~/components/messages/chat-list.vue";
import type { ChatItem } from "~/interface/mail/Message";

const chats = ref<ChatItem[]>([]);
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
    const response = await apiDataFetch("/chats/get-flows", options);
    const data: ChatItem[] = await response.json();
    chats.value = data;
    console.log(chats.value);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

onMounted(() => {
  fetchSavedChats();
  isDesktop.value = window.innerWidth >= 768;
});
</script>

<style lang="scss" scoped></style>
