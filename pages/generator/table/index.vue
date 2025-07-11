<template>
  <div class="products">
    <div class="products-controller">
      <p class="products-controller-title">Продукты</p>
      <div class="products-filter">
        <button class="products-filter-button">Filter</button>
        <button class="products-filter-button">Search</button>
        <button class="products-filter-button">Delete</button>
      </div>
      <div class="products-controller-display">
        <button class="products-controller-display-button" @click="() => (isCarded = false)" :style="{background: !isCarded ? '#e0e0e0': 'transparent'}"><span v-html="tableView"></span></button>
        <button class="products-controller-display-button" @click="() => (isCarded = true)" :style="{background: isCarded ? '#e0e0e0': 'transparent'}"><span v-html="cardView"></span></button>
      </div>
    </div>
    
    <ProductTable
      :products="prod"
      :selected-products="selectedProducts"
      @update:selected-products="selectedProducts = $event"
      :style="{ display: isCarded ? 'none' : 'block' }"
    />

    <CardedView
      :rows="prod"
      :selected-products="selectedProducts"
      @update:selected-products="selectedProducts = $event"
      :style="{ display: isCarded ? 'flex' : 'none' }"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ProductDto } from "~/interface/products/product";
import Products from "~/composables/modals/products";
import ProductTable from "~/components/products/table.vue";
import CardedView from "~/components/products/card.vue";
import tableView from "~/assets/icons/table-view.svg?raw";
import cardView from "~/assets/icons/card-view.svg?raw";

const isCarded = ref(false);

const prod = ref<ProductDto[]>([]);
const getProducts = async ()=>{
  await new Products(prod.value).get();
}

const selectedProducts = ref<string[]>([]);

onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  background: #fff;
  border: 0.1rem solid #e5e5e5;
  border-radius: 0.8rem;
  overflow: hidden;

  &-controller {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem;

    &-title {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 140%;
      color: #000;
    }

    &-display {
      display: flex;
      align-items: center;
      border: 0.1rem solid #e5e5e5;
      border-radius: 0.8rem;
      overflow: hidden;

      &-button {
        padding: .5rem .8rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-of-type {
          border-right: 0.1rem solid #e5e5e5;
        }

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }

  &-filter {
    display: flex;
    align-items: center;
    border: 0.1rem solid #e5e5e5;
    border-radius: 0.8rem;
    overflow: hidden;

    &-button {
      font-size: 1.2rem !important;
      font-weight: 400;
      line-height: 120%;
      color: #475166;
      border-right: 0.1rem solid #e5e5e5;
      padding: 0.8rem 1.2rem;

      &:last-of-type {
        border-right: unset;
      }

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
