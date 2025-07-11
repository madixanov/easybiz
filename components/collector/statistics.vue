<template>
  <div class="dash-container" role="container">
    <div class="dash-container-column">
      <div class="dash-row">
        <UiLoader
          :height="'100%'"
          :has-background="false"
          v-if="!loaded"
          :style="{ position: 'relative', height: '20rem' }"
        />
        <BestProduct
          :prod="stats.most_viewed"
          :title="'Самый продаваемый продукт'"
          :icon="'fa-dollar-sign'"
          :style="{
            height: loaded ? 'max-content' : '0',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 500ms ease',
            transitionDelay: '100ms',
          }"
        />
        <UiLoader
          :height="'100%'"
          :has-background="false"
          v-if="!loaded"
          :style="{ position: 'relative', height: '20rem' }"
        />
        <BestProduct
          :prod="products[1]"
          :title="'Наиболле популярный продукт'"
          :icon="'fa-eye'"
          :style="{
            height: loaded ? 'max-content' : '0',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 500ms ease',
            transitionDelay: '100ms',
          }"
        />
        <UiLoader
          :height="'100%'"
          :has-background="false"
          v-if="!loaded"
          :style="{ position: 'relative', height: '15rem' }"
        />
        <CategoryList
          :cat="stats.sections"
          :title="'прибыльные секции'"
          :style="{
            height: loaded ? 'auto' : '0',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 500ms ease',
            transitionDelay: '100ms',
          }"
        />
      </div>
    </div>
    <div class="dash-container-column">
      <UiLoader
        :height="'100%'"
        :has-background="false"
        v-if="!loaded"
        :style="{ position: 'relative', height: '20rem' }"
      />
      <CategoryList
        :cat="stats.categories"
        :title="'прибыльные категории'"
        :style="{
          height: loaded ? 'auto' : '0',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease',
          transitionDelay: '100ms',
        }"
      />
      <UiLoader
        :height="'100%'"
        :has-background="false"
        v-if="!loaded"
        :style="{ position: 'relative', height: '20rem' }"
      />
      <ProductsList
        :prod="stats.products"
        :title="'просматриваемые продукты'"
        :height="35"
        :style="{
          height: loaded ? 'auto' : '0',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease',
          transitionDelay: '100ms',
        }"
      />
    </div>

    <div class="dash-container-column">
      <UiLoader
        :height="'100%'"
        :has-background="false"
        v-if="!loaded"
        :style="{ position: 'relative', height: '20rem' }"
      />
      <ProductsList
        :prod="stats.bestProducts"
        :title="'просматриваемые продукты'"
        :height="35"
        :style="{
          height: loaded ? 'auto' : '0',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease',
          transitionDelay: '100ms',
        }"
      />
      <UiLoader
        :height="'100%'"
        :has-background="false"
        v-if="!loaded"
        :style="{ position: 'relative', height: '20rem' }"
      />
      <Analytics
        :stat="stats.analytics"
        :style="{
          height: loaded ? 'auto' : '0',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease',
          transitionDelay: '100ms',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoryList from "~/components/statistics/list.vue";
import ProductsList from "~/components/statistics/products.vue";
import BestProduct from "~/components/statistics/product.vue";
import Analytics from "~/components/statistics/analysis.vue";

const products = ref([
  {
    id: 2,
    title: "iphone 15 pro",
    price: 560,
    url: "",
  },
  {
    id: 2,
    title: "iphone 15 pro",
    price: 560,
    url: "",
  },
  {
    id: 2,
    title: "iphone 15 pro",
    price: 560,
    url: "",
  },
  {
    id: 66,
    title: "iphone 12 pro",
    price: 630,
    url: "",
  },
  {
    id: 34,
    title: "iphone 1 pro",
    price: 230,
    url: "",
  },
  {
    id: 65,
    title: "iphone 5 pro",
    price: 300,
    url: "",
  },
  {
    id: 34,
    title: "Samsung s50 ultra",
    price: 400,
    url: "data:image/jpeg;base64,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",
  },
  {
    id: 4,
    title: "Dishwasher Samsung",
    price: 622,
    url: "https://backend.electronyat.qa/media/catalog/product/cache/518e522bac1df92102d4b2a1c65a4531/s/a/samsung_dw_dw60m5050fs_sg_silver_1_1.jpg",
  },
]);

const loaded = ref(false);

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      best_product: {},
      most_viewed: {},
      sections: [],
      categories: [],
      products: [],
      bestProducts: [],
      analytics: {
        products: "0",
        sold: "0",
      },
    }),
  },
});

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 1000);
});
</script>

<style scoped lang="scss">
.dash {
  &-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (max-width: 1280px) {
      flex-direction: row;
    }

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  &-container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.5rem;

    &-buttons[role="buttons"] {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &[role="header"] {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0;
    }

    @media (max-width: 1280px) {
      flex-direction: column;
    }

    &-column {
      max-width: calc(100% / 3);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      @media (max-width: 1280px) {
        max-width: 100%;
      }
    }
  }

  &-title {
    font-size: 1.4rem;
    text-transform: capitalize;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
}
</style>
