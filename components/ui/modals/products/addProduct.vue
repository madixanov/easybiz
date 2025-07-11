<script lang="ts" setup>
import ProductMain from "~/components/products/window/main.vue";
import ProductMedia from "~/components/products/window/media.vue";
import Products from "~/composables/modals/products";
const emits = defineEmits(["close"]);
const activeIndex = ref(0);
const isFilled = ref(false);

const productParams = ref({
  model: "",
  priority: 0,
  link: "",
  metaTitle: "",
  metaTags: "",
  metaDescription: "",
  price: 0,
  extra: 0,
  profit: 0,
  warehouse: "",
  amount: 0,
  availability: true,
  description: "",
  imageUrl: "",
  views: 0,
  productManufacturerId: "0197f3f3-f7e8-7ac0-938f-94490f52c368",
  sectionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  categoryId: "",
  countryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
})
const createProduct = async () => {
  await new Products().create(productParams.value);
};
</script>

<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-header-title">Добавить продукт</h2>
        <div class="modal-header-buttons">
          <button
            v-for="(el, i) in ['Главная', 'Медиа']"
            :key="i"
            @click="activeIndex = i"
            :class="{ active: activeIndex === i }"
          >
            {{ el }}
          </button>
        </div>
        <button class="modal-header-add" :disabled="!isFilled" :style="{opacity: !isFilled ? '0.8' : '1'}" @click="createProduct">
          Добавить
        </button>
      </div>
      <ProductMain :style="{ display: activeIndex === 0 ? 'flex' : 'none' }" />
      <ProductMedia :style="{ display: activeIndex === 1 ? 'flex' : 'none' }" />
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
  z-index: 0;

  &-container {
    width: 100%;
    height: 100%;
    max-width: 120rem;
    max-height: 60rem;
    overflow-y: auto;
    padding: 2rem 2.5rem;
    border-radius: 1rem;
    background: #fff;
    transition: 300ms;
    transition-delay: 300ms;
    transform: scale(0);
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    &-title {
      font-size: 1.6rem !important;
      font-weight: 400;
      color: #333;
      line-height: 120%;
    }

    &-buttons {
      display: flex;
      border: 0.1rem solid #e5e5e5;
      border-radius: 0.8rem;
      overflow: hidden;

      & button {
        font-size: 1.2rem !important;
        font-weight: 400;
        color: #000;
        background: transparent;
        padding: 1rem 1.5rem;
        border-right: 0.1rem solid #e5e5e5;

        &:last-of-type {
          border: unset;
        }

        &.active {
          color: #229c39;
          background: rgba(34, 156, 56, 0.05);
        }
      }
    }

    &-add {
      font-size: 1.4rem !important;
      color: #fff;
      line-height: 120%;
      padding: 0.8rem 1.2rem;
      background: #229c39;
      border-radius: 0.8rem;
    }
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