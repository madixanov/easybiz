<script lang="ts" setup>
const props = defineProps({
  classname: {
    required: true,
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div :class="classname">
    <img :src="avatar" alt="Avatar image" />
  </div>
</template>
