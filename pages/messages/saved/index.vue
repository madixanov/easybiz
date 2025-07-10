<template>
  <div class="mail">
    <aside class="mail-sidebar" v-if="!activeChat || isDesktop">
      <div class="mail-sidebar-header">
        <h2 class="mail-sidebar-title">Сохранённые</h2>
      </div>
      <ChatList :chats="savedChats" :route="'saved'" />
    </aside>

    <div class="mail-box">
      <h4 class="mail-chat-text">{{savedChats.length === 0 ? "Пока нет сохраненных сообщений" : 'Нажмите на чат, чтобы прочитать сообщение'}}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiDataFetch } from "~/composables/Exports";
import { ref, computed, onMounted } from 'vue';
import ChatList from '~/components/messages/chat-list.vue';
import type { ChatItem } from '~/interface/mail/Message';

const savedChats = ref<ChatItem[]>([]);
const activeChatId = ref<string | null>(null);
const isDesktop = ref(true);

const fetchSavedChats = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
  };
  try {
    const response = await apiDataFetch('/chats/favorites', options);
    const data: ChatItem[] = await response.json();
    savedChats.value = data;
    console.log(savedChats.value);
    
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
const activeChat = computed(() =>
  savedChats.value.find(chat => chat.id === activeChatId.value) || null
);

onMounted(() => {
  fetchSavedChats();
  isDesktop.value = window.innerWidth >= 768;
});
</script>


<style lang="scss" scoped></style>