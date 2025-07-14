<template>
  <div
    class="product-tabs"
    :style="{
      display: $router.currentRoute.value.path.includes('/generator')
        ? 'flex'
        : 'none',
    }"
  >
    <div class="product-tabs-wrapper">
      <nuxt-link class="product-tabs-link" to="/generator">
        Статистика
      </nuxt-link>
      <nuxt-link class="product-tabs-link" to="/generator/table">
        Продукты
      </nuxt-link>
    </div>
    <button
      class="product-tabs-add"
      @click="toggleGen"
      :style="{ display: url === '/generator' ? 'block' : 'none' }"
    >
      Добавить сайт
    </button>
    <button
      class="product-tabs-add"
      @click="toggle"
      :style="{ display: url === '/generator/table' ? 'block' : 'none' }"
    >
      Добавить продукт
    </button>
  </div>

  <AddProductModal :class="{ active: show }" @close="toggle" />
  <AddWebsiteModal :class="{ active: gen }" @close="toggleGen" />
</template>

<script lang="ts" setup>
import AddProductModal from "~/components/ui/modals/products/addProduct.vue";
import AddWebsiteModal from "~/components/ui/modals/generator/app.vue";

const $router = useRouter();
const url = ref("");

if ($router.currentRoute.value) {
  url.value = $router.currentRoute.value.path;
}
const show = ref(false);
const gen = ref(false);

const toggle = () => {
  show.value = !show.value;
};

const toggleGen = () => {
  gen.value = !gen.value;
};

watch(
  () => $router.currentRoute.value.path,
  (newPath) => {
    url.value = newPath;
  }
);
</script>

<style scoped lang="scss">
.product-tabs {
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  &-wrapper {
    height: auto;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    border: 0.1rem solid #e5e5e5;
  }

  &-link {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 130%;
    padding: 0.8rem 1.2rem;
    color: #333;

    &:first-of-type {
      border-right: 0.1rem solid #e5e5e5;
    }

    &.router-link-active {
      color: #229c39;
      background: rgba(34, 156, 56, 0.05);
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
</style>
