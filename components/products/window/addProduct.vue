<script lang="ts" setup>
const emits = defineEmits(["close"]);
</script>

<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-container">
        <div class="modal-header">
            <h2 class="modal-title">Добавить продукт</h2>
            <button class="modal-close" @click="$emit('close')">&times;</button>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  padding: 4rem;
  transition: 300ms;
  opacity: 0;
  visibility: hidden;
  z-index: -2;

  &-container {
    width: 100%;
    height: 100%;
    max-width: 120rem;
    max-height: 60rem;
    overflow-y: auto;
    width: 100%;
    border-radius: 1rem;
    background: #fff;
    transition: 300ms;
    transition-delay: 300ms;
    transform: scale(0);
  }

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 2000;

    & .modal-container {
      transform: scale(1);
    }
  }
}
</style>
