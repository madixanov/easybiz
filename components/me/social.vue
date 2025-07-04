<template>
  <div class="profile-form">
    <label for="instagram" class="profile-label">
      <p class="profile-label-title">Instagram</p>
      <input
        type="text"
        id="instagram"
        class="profile-label-input"
        placeholder="Никнейм"
        :value="instagram"
        @input="emit('update:instagram', $event.target.value)"
      />
    </label>

    <label for="facebook" class="profile-label">
      <p class="profile-label-title">Facebook</p>
      <input
        type="text"
        id="facebook"
        class="profile-label-input"
        placeholder="Никнейм"
        :value="facebook"
        @input="emit('update:facebook', $event.target.value)"
      />
    </label>

    <label for="telegram" class="profile-label">
      <p class="profile-label-title">Telegram</p>
      <input
        type="text"
        id="telegram"
        class="profile-label-input"
        placeholder="Никнейм"
        :value="telegram"
        @input="emit('update:telegram', $event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  telegram: string
  instagram: string
  facebook: string
}>()

const emit = defineEmits<{
  (e: 'update:telegram', value: string): void
  (e: 'update:instagram', value: string): void
  (e: 'update:facebook', value: string): void
}>()
</script>


<style lang="scss" scoped></style>
