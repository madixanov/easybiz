<template>
  <div class="dash-widget">
    <div class="dash-widget-header">
      <h3 class="dash-widget-header-title">Аналитика</h3>
    </div>
    <div class="dash-widget-body">
      <div class="dash-widget-total">
        <h4>{{ stat.products }}</h4>
        <p>Продуктов в продаже</p>
      </div>
      <div class="dash-widget-total">
        <h4>{{ stat.sold }}</h4>
        <p>Продано на этом месяце</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface StatItem {
  products: string;
  sold: string;
}

const props = defineProps({
  stat: {
    type: Object as PropType<StatItem>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.dash {
  &-widget {
    background: white;
    height: 100%;
    border: 0.1rem solid rgb(214, 214, 214);
    border-radius: 0.8rem;
    overflow: hidden;

    &-header {
      border-bottom: 0.1rem solid rgb(214, 214, 214);
      padding: 1rem 1.5rem;
      width: 100%;

      &-title {
        font-size: 1.4rem;
        font-weight: 500;
        color: black;
      }
    }

    &-body {
      width: 100%;
    }

    &-total {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 1.8rem;
      padding: 2.5rem 0;

      & h4 {
        font-size: 3.6rem;
        line-height: 100%;
      }

      & p {
        font-size: 1.4rem;
        color: #b1b1b1;
      }
    }
  }
}
</style>
