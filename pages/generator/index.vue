<template>
  <div class="products-statistics">
    <Statistics :stats="statistics" />
  </div>
</template>
<script setup lang="ts">
import { apiProductsFetch } from "~/composables/Exports";
import Statistics from "~/components/collector/statistics.vue";
import type { StatisticsDto, Category, ProductDto } from "~/interface/products/product"

const statistics = ref<StatisticsDto>({
  best_product: {} as ProductDto,
  most_viewed: {} as ProductDto,
  products: [] as any[],
  bestProducts: [] as any[],
  sections: [] as any[],
  categories: [] as any[],
  analytics: {
    products: 0,
    sold: 0
  }
});

const getStatistics = async (): Promise<void> => {
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const [productAmountRes, soldRes, bestSellerRes, mostViewedRes, productsRes, bestProductsRes, sectionsRes, categoriesRes] = await Promise.all([
      apiProductsFetch(`/api/statistics/items-on-sale`, options).then(res => res.json()) as Promise<number>,
      apiProductsFetch(`/api/statistics/sales-this-month`, options).then(res => res.json()) as Promise<number>,
      apiProductsFetch(`/api/statistics/best-seller`, options).then(res => res.json()) as Promise<ProductDto>,
      apiProductsFetch(`/api/statistics/most-viewed`, options).then(res => res.json()) as Promise<ProductDto>,
        apiProductsFetch(`/api/statistics/top-selling-products`, options).then(res => res.json()) as Promise<ProductDto[]>,
      apiProductsFetch(`/api/statistics/top-viewed-products`, options).then(res => res.json()) as Promise<ProductDto[]>,
      apiProductsFetch(`/api/statistics/top-sections`, options).then(res => res.json()) as Promise<Category[]>,
      apiProductsFetch(`/api/statistics/top-categories`, options).then(res => res.json()) as Promise<Category[]>
    ]);

    statistics.value.best_product = bestSellerRes;
    statistics.value.most_viewed = mostViewedRes;
    productsRes.map((el: ProductDto) => statistics.value.products.push(el));
    bestProductsRes.map((el: ProductDto) => statistics.value.bestProducts.push(el));
    categoriesRes.map((el: Category) => statistics.value.categories.push(el));
    sectionsRes.map((el: Category) => statistics.value.sections.push(el));
    statistics.value.analytics.products = productAmountRes;
    statistics.value.analytics.sold = soldRes;

    console.log(statistics.value, 'filled');
  } catch (error) {
    console.error('getStatistics error:', error);
  }
};

onMounted(() => {
  getStatistics();
});
</script>
<style scoped lang="scss"></style>
