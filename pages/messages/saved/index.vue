<template>
  <div class="mail">
    <aside class="mail-sidebar" v-if="!activeChat || isDesktop">
      <div class="mail-sidebar-header">
        <h2 class="mail-sidebar-title">Сохранённые</h2>
      </div>
      <ChatList :chats="savedChats" :route="'saved'" />
    </aside>

    <div class="mail-box">
      <h4 class="mail-chat-text">Нажмите на чат, чтобы прочитать сообщение</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiDataFetch } from "~/composables/Exports";
import { ref, computed, onMounted } from 'vue';
import ChatList from '~/components/messages/chat-list.vue';
import ChatView from '~/components/messages/chat-view.vue';
import type { ChatItem } from '~/interface/mail/Message';

const savedChats = ref<ChatItem[]>([]);
const activeChatId = ref<string | null>(null);
const newMessage = ref('');
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
    const response = await apiDataFetch('/users/favorites', options);
    const data: ChatItem[] = await response.json();
    savedChats.value = data;
    console.log(savedChats.value);
    
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

const selectChat = (id: string) => {
  activeChatId.value = id;
};

const activeChat = computed(() =>
  savedChats.value.find(chat => chat.id === activeChatId.value) || null
);

const chatMessages = computed(() => {
  if (!activeChat.value) return [];
  return activeChat.value.messages.map(msg => ({
    id: msg.id,
    sender: activeChat.value?.client.username || 'Гость',
    email: 'client@example.com',
    number: '+998901234567',
    text: msg.content,
    createdAt: msg.createdAt,
  }));
});

onMounted(() => {
  fetchSavedChats();
  isDesktop.value = window.innerWidth >= 768;
});
</script>


<style lang="scss" scoped></style>