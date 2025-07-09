<template>
  <div class="error-page">
    <h1 class="error-page-title">{{ error.statusCode || 404 }}</h1>
    <p class="error-page-text">{{ error.message || 'Страница не найдена.' }}</p>
    <button class="error-page-btn" @click="handleClearError">Вернуться на главную</button>
  </div>
</template>

<script setup lang="ts">
import { clearError } from '#app';

defineProps<{
  error: {
    statusCode?: number;
    message?: string;
  };
}>();

const handleClearError = () => {
  clearError({ redirect: '/' });
};
</script>

<style scoped lang="scss">
.error-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  &-title{
    font-size: 8rem;
    line-height: 120%;
  }

  &-text {
    font-size: 2rem;
    color: #555;
  }

  &-btn {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background-color: #229c38da;
    color: white;
    border: none;
    border-radius: .4rem;
    cursor: pointer;

    &:hover {
      background-color: #229C39;
    }
  }
}
</style>