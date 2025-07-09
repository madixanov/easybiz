<template>
  <div class="profile-label full">
    <h4 class="profile-label-title">{{ title }}</h4>

    <div class="profile-label-session" v-for="(session, i) in sessions" :key="i">
      <div class="profile-label-session-info">
        <p class="profile-label-timer bold">
          {{ namePrefix + ' ' +  session.deviceType}}
        </p>
        <span v-if="session.expiration">{{ session.expiration }}</span>
      </div>

      <div class="profile-label-session-date">
        <p class="profile-label-timer">
          {{
            session.createdAt?.includes(addedPrefix)
              ? session.createdAt
              : addedPrefix + " " + new Date(session.date).toLocaleString()
          }}
        </p>
        <button v-if="i !== 0" class="profile-label-session-delete" @click="$emit('alert', session.deviceType, session.id)">
          <span v-html="trash"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import trash from "@/assets/trash.svg?raw";

const props = defineProps({
  sessions: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
    default: "Сессии",
  },
  namePrefix: {
    type: String,
    required: true,
  },
  addedPrefix: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['alert']);

const namePrefix = props.namePrefix ?? "";
const addedPrefix = props.addedPrefix ?? "";
</script>

<style lang="scss" scoped>
.profile-label-session-info {
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 1rem;
    font-weight: 500;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.5019607843) !important;
  }
}
</style>
