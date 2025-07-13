<template>
  <div class="cards">
    <div class="cards-card" v-for="(item, index) in sortedData as ProductDto" :key="item.id">
      <input type="checkbox" class="cards-card-checkbox" :value="item.id" :checked="selectedProducts.includes(item.id)" @change="toggleCheckbox(item.id)"/>
      <div class="cards-card-image">
        <img :src="item.imageUrl" alt="Product Image" @click="showModal(item.imageUrl)"/>
      </div>
      <p class="cards-card-title">{{ item.model.slice(0, 22) }}</p>
      <span class="cards-card-price">${{ item.price }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from "~/interface/products/product";
import showModal from "~/composables/modals/showImage";

const props = defineProps<{
  rows: Array<ProductDto>;
  selectedProducts: string[];
}>();

const emit = defineEmits(["update:selected-products"]);

const sortedData = computed(() =>
  props.rows.slice().sort((a: any, b: any) => a.id.localeCompare(b.id))
);

const toggleCheckbox = (id: string) => {
  const newSelected = props.selectedProducts.includes(id)
    ? props.selectedProducts.filter((pid) => pid !== id)
    : [...props.selectedProducts, id];

  emit("update:selected-products", newSelected);
};
</script>

<style lang="scss" scoped>
.cards {
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  border-top: .1rem solid #e5e5e5;
  padding: 2rem;

  &-card {
    max-width: calc(100% / 4 - 0.8rem);
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0.1rem solid #dadee3;
    border-radius: 0.6rem;
    
    @media (max-width: 1140px) {
      max-width: calc(100% / 3 - 0.8rem);
    }

    @media (max-width: 900px) {
      max-width: calc(100% / 2 - 0.8rem);
    }

    @media (max-width: 480px) {
      max-width: 100%;
    }

    &-image {
      width: 100%;
      height: 13.5rem;
      margin-top: 1rem;
      border-radius: 0.6rem;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: rgb(238, 238, 238);
      }
    }

    &-title {
      font-size: 1.2rem;
      line-height: 125%;
      margin: 0.8rem 0 2rem 0;
    }

    &-price {
      font-size: 1.2rem;
      line-height: 125%;
      border: 0.1rem solid #dadee3;
      border-radius: 5rem;
      padding: 0.4rem 1rem;
    }

    &-checkbox{
        align-self: start;
      appearance: none; 
      width: 1.5rem;
      height: 1.5rem;
      border: .2rem solid #ddd;
      border-radius: 3px; 
      cursor: pointer;
      position: relative;

      &:checked{
        background-color: #28a745;
        border-color: #28a745; 

        &::after{
          content: "✔"; 
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
