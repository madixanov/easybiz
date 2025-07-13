<template>
  <div class="products">
    <div class="products-controller">
      <p class="products-controller-title">Продукты</p>
      <div class="products-filter">
        <button class="products-filter-button" :disabled="prod.length < 1" @click="toggle">Filter</button>
        <!-- <button class="products-filter-button">Search</button> -->
        <button
          class="products-filter-button"
          :disabled="selectedProducts.length === 0"
          @click="showAlert"
        >
          Delete
        </button>
      </div>
      <div class="products-controller-display">
        <button
          class="products-controller-display-button"
          @click="() => (isCarded = false)"
          :style="{ background: !isCarded ? '#e0e0e0' : 'transparent' }"
        >
          <span v-html="tableView"></span>
        </button>
        <button
          class="products-controller-display-button"
          @click="() => (isCarded = true)"
          :style="{ background: isCarded ? '#e0e0e0' : 'transparent' }"
        >
          <span v-html="cardView"></span>
        </button>
      </div>
    </div>

    <ProductTable
      :products="prod"
      :selected-products="selectedProducts"
      @update:selected-products="selectedProducts = $event"
      :style="{ display: !isCarded && prod.length !==0 ? 'block' : 'none' }"
    />

    <CardedView
      :rows="prod"
      :selected-products="selectedProducts"
      @update:selected-products="selectedProducts = $event"
      :style="{ display: isCarded && prod.length !==0 ? 'flex' : 'none' }"
    />

    <div class="products-nodata"  :style="{ display: loaded && prod.length === 0 ? 'flex' : 'none' }"><h2>Продукты ещё не добавлены!</h2></div>

  </div>

  <ProductsFilter
    :class="{ active: show }"
    @close="toggle"
    :values="filter"
    @submit="submitFilter"
  />
  <transition name="fade">
    <DeleteAlert
      v-if="alert"
      :name="'товар'"
      :item="''"
      @close="showAlert"
      @delete="deleteProduct"
    />
  </transition>
</template>

<script lang="ts" setup>
import Products from "@/composables/modals/products";
import type { ProductDto } from "~/interface/products/product";
import ProductsFilter from "~/components/ui/modals/products/filter.vue";
import ProductTable from "~/components/products/table.vue";
import DeleteAlert from "~/components/ui/modals/alert.vue";
import CardedView from "~/components/products/card.vue";
import tableView from "~/assets/icons/table-view.svg?raw";
import cardView from "~/assets/icons/card-view.svg?raw";
import { SuccessNotification } from "~/composables/Notification/list";

const filter = ref({
  minPrice: 10,
  maxPrice: 1000,
});
const loaded = ref(false)

const isCarded = ref(false);

const alert = ref(false);
const show = ref(false);
const toggle = () => {
  show.value = !show.value;
};
const showAlert = () => {
  alert.value = !alert.value;
};

const submitFilter = async (updatedFilter: {
  minPrice: number;
  maxPrice: number;
}) => {
  show.value = false;
  filter.value = updatedFilter;
  prod.value = [];
  await new Products(prod.value).get(
    updatedFilter.minPrice,
    updatedFilter.maxPrice
  );
};

const prod = ref<ProductDto[]>([]);
const getProducts = async () => {
  await new Products(prod.value).get();
};

const selectedProducts = ref<string[]>([]);
const deleteProduct = async () => {
  const res = await new Products().delete(selectedProducts.value);
  if (res.ok) {
    selectedProducts.value = [];
    SuccessNotification("Продукт успешно удален");
    alert.value = false;
    getProducts();
  }
};

onMounted(() => {
  getProducts();
  setTimeout(() => {
    loaded.value = true;
  }, 1000);
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
        padding: 0.5rem 0.8rem;
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

  &-nodata{
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: .1rem solid #e5e5e5;

    & h2{
      font-size: 4rem;
      font-weight: 600;
      line-height: 120%;
      color: #333;
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