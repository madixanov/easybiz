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
          :prod="stats.best_product"
          :title="'Самый продаваемый продукт'"
          :icon="'fa-dollar-sign'"
          :style="{
            height: loaded ? '100%' : '0',
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
          :prod="stats.most_viewed"
          :title="'Наиболле популярный продукт'"
          :icon="'fa-eye'"
          :style="{
            height: loaded ? '100%' : '0',
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
        :style="{ position: 'relative', height: '25rem' }"
      />
      <ProductsList
        :prod="stats.products"
        :title="'продаваемые продукты'"
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
        :style="{ position: 'relative', height: '25rem' }"
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
import type { StatisticsDto } from "~/interface/products/product";

const loaded = ref(false);

const props = defineProps<{
  stats: StatisticsDto;
}>();


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
