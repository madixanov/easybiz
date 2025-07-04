<template>
  <div class="mail">
    <aside class="mail-sidebar" v-if="isDesktop">
      <div class="mail-sidebar-header">
        <h2 class="mail-sidebar-title">Входящие</h2>
      </div>
      <ChatList :chats="chats" :route="'incoming'"/>
    </aside>

    <ChatView />
  </div>
</template>

<script setup lang="ts">
import { apiDataFetch } from "~/composables/Exports";
import ChatList from "~/components/messages/chat-list.vue";
import ChatView from "~/components/messages/chat-view.vue";
import type { ChatItem } from "~/interface/mail/Message";

const chats = ref<ChatItem[]>([]);
const isDesktop = ref(true);

const fetchChats = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  try {
    const response = await apiDataFetch("/users/get-flows", options);
    if (!response.ok) throw new Error("Ошибка при получении чатов");
    const data: ChatItem[] = await response.json();
    chats.value = data;
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

onMounted(() => {
  fetchChats();
  isDesktop.value = window.innerWidth >= 768;
});
</script>

<style lang="scss" scoped></style>
