<script lang="ts" setup>
import ProductMain from "~/components/products/window/main.vue";
import ProductMedia from "~/components/products/window/media.vue";
import Products from "~/composables/modals/products";
import { FailedAlert, PushNotification } from "~/composables/Notification/list";
const emits = defineEmits(["close"]);
const activeIndex = ref(0);
const isFilled = ref(false);

const productParams = ref({
  model: "",
  identificationNumber: "c000",
  link: "",
  metaTitle: "",
  metaTags: "",
  metaDescription: "",
  profit: 0,
  price: 0,
  priority: 1,
  extra: 0,
  warehouse: "", 
  amount: 0,
  availability: true,
  description: "",
  productManufacturerId: "",
  sectionId: "",
  categoryId: "",
  countryId: "",
  imageUrl: "",
})

const checkIsFilled = () => {
  isFilled.value = Object.entries(productParams.value).every(([key, val]) => {
    if (["profit", "price", "priority", "extra", "amount", "availability"].includes(key)) return true;
    return typeof val === "string" ? val.trim() !== "" : val != null;
  });
};

const createProduct = async () => {
  const res = await new Products().create(productParams.value);
  if(res.ok){
    PushNotification('Продукт успешно добавлен');
    emits('close');
  }else{
    FailedAlert('Ошибка при добавлении продукта');
  }
};

const imageUpload = async (file: File) => {
  const url = await new Products().uploadImage(file);
  isFilled.value = true;
  productParams.value.imageUrl = url;
};

watch(
  () => productParams.value,
  () => checkIsFilled(),
  { deep: true, immediate: true }
);
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
        <button class="modal-header-add" @click="createProduct" :disabled="!isFilled" :class="{active: isFilled }">
          Добавить
        </button>
      </div>
      <ProductMain :style="{ display: activeIndex === 0 ? 'flex' : 'none' }" :prod-data="productParams" />
      <ProductMedia :style="{ display: activeIndex === 1 ? 'flex' : 'none' }" :media="productParams.imageUrl" @upload="imageUpload"/>
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
    max-width: 90%;
    max-height: 95%;
    width: 100%;
    height: 100%;
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
      background: #229c38d3;
      border-radius: 0.8rem;

      &.active{
        background: #229c39;
      }
    }
  }

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 1000;

    & .modal-container {
      transform: scale(1);
    }
  }
}
</style>