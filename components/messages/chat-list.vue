<template>
  <ul class="mail-senders">
    <li
      class="mail-sender-item"
      v-for="chat in chats"
      :key="chat.id"
      @click="() => $emit('select', chat.id)" 
      :style="{opacity: chat.status === 'CLOSED' ? 0.5 : 1, display: chats.length === 0 ? 'none' : 'block'}"
    >
      <nuxt-link :to="`/messages/${route}/${chat.id}`" class="mail-sender-link" v-if="route === 'incoming'">
        <div class="mail-sender-text">
          <p class="mail-sender-message">
            {{ chat.messages[chat.messages.length - 1]?.content.slice(0, 68) }}...
          </p>
          <div
            class="mail-sender-stat"
            :class="{ active: chat.status == 'OPEN' }"
          ></div>
        </div>
        <span class="mail-sender-email">{{ chat.client.username }}</span>
        <div class="mail-sender-info">
          <span class="mail-sender-date">
            {{
              new Date(chat.messages[chat.messages.length - 1]?.createdAt).toLocaleDateString("ru-RU")
            }}
          </span>
          <span class="mail-sender-date">
            {{
              new Date(chat.messages[chat.messages.length - 1]?.createdAt).toLocaleTimeString(
                "ru-RU",
                { hour: "2-digit", minute: "2-digit" }
              )
            }}
          </span>
        </div>
      </nuxt-link>
      <nuxt-link :to="`/messages/${route}/${chat.messageId}`" class="mail-sender-link" v-else>
        <div class="mail-sender-text">
          <p class="mail-sender-message">
            {{ chat.message.content.slice(0, 68) }}...
          </p>
          <div
            class="mail-sender-stat"
            :class="{ active: !chat.message.isRead}"
          ></div>
        </div>
        <span class="mail-sender-email">{{ chat.message.sender.username }}</span>
        <div class="mail-sender-info">
          <span class="mail-sender-date">
            {{
              new Date(chat.message.createdAt).toLocaleDateString("ru-RU")
            }}
          </span>
          <span class="mail-sender-date">
            {{
              new Date(chat.message.createdAt).toLocaleTimeString(
                "ru-RU",
                { hour: "2-digit", minute: "2-digit" }
              )
            }}
          </span>
        </div>
      </nuxt-link>


    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ChatItem, SavedChatItem } from "~/interface/mail/Message";
const props = defineProps<{
  chats: ChatItem[] | any[];
  route: string;
}>();

console.log('chats-list', props.chats)
</script>

<style lang="scss" scoped></style>
