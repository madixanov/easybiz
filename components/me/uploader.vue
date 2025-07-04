<template>
  <div class="uploader-wrapper">
    <h2 class="uploader-wrapper-title">Your Photo</h2>
    <div class="uploader-avatars">
      <div
        class="avatar-preview main"
        @click="triggerFileInput"
        @dragover.prevent="() => (isDragging = true)"
        @dragleave="() => (isDragging = false)"
        @drop.prevent="onDrop"
        :class="{ dragging: isDragging }"
      >
        <img
          v-if="props.user?.image"
          :src="`${USER_FETCH_HOST}:${PORT}/users/image/${props.user.image}`"
          alt="User Avatar"
        />
        <div v-else class="avatar-preview-icon">
          <span v-html="reload"></span>
        </div>
        <input
          hidden
          type="file"
          ref="fileInput"
          accept=".jpg,.jpeg,.png,.svg"
          @change="onFileSelected"
        />
      </div>
      <!-- <div class="uploader-avatars-wrapper">
        <div class="avatar-preview">
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" />
          <div v-else class="avatar-preview-icon">
            <span v-html="reload"></span>
          </div>
        </div>
        <div class="avatar-preview">
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" />
          <div v-else class="avatar-preview-icon">
            <span v-html="reload"></span>
          </div>
        </div>
        <div class="avatar-preview">
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" />
          <div v-else class="avatar-preview-icon">
            <span v-html="reload"></span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts"> 
import { ref, defineProps, defineEmits } from 'vue';
import { USER_FETCH_HOST, PORT } from '~/composables/Exports';
import reload from '@/assets/icons/reload.svg?raw';
const props = defineProps<{ user: any }>();
const emit = defineEmits<{ (e: 'update-image', image: File): void }>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const triggerFileInput = () => fileInput.value?.click();

const onFileSelected = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) emit('update-image', file);
};

const onDrop = (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) emit('update-image', file);
};
</script>


<style lang="scss" scoped>
.uploader {
  &-wrapper {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
    box-shadow: 0 0 1rem 0.1rem #878c9d14;

    &-title {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 4rem;
      color: #141617 !important;
    }
  }
  &-avatars {
    display: flex;
    align-items: flex-end;
    gap: 1rem;

    &-wrapper {
      display: flex;
      gap: 1rem;
    }
  }
}

.avatar-preview {
  width: 7rem;
  height: 7rem;
  border-radius: 1.6rem;
  background: #aaa;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  @media(max-width: 480px) {
    width: 6.5rem;
    height: 6.5rem;
  }

  &.main {
    width: 10rem;
    height: 10rem;

    @media(max-width: 480px) {
      width: 8.5rem;
      height: 8.5rem;
    }
  }

  &.dragging {
    background-color: rgba(170, 170, 170, 0.6);
    outline: 0.2rem dashed #aaa;
    outline-offset: 0.2rem;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-icon {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0.7rem;
    height: 100%;
  }
}
</style>