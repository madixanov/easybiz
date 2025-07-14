<template>
  <div class="dash-widget">
    <header class="dash-widget-header">
      <p class="dash-widget-header-title">Наиболее {{ title }}</p>
    </header>
    <section class="dash-widget-list" :style="{ 'max-height': `${height}rem`, height: '100%', display: cat.length > 0 ? 'block' : 'none' }">
      <ul class="dash-widget-ul">
        <li
          class="dash-widget-item"
          v-for="(item, i) in cat"
          :key="i"
        >
          <div class="dash-widget-item-block">
            <span class="dash-widget-item-rating" :class="{'bg-gold': i === 0,'bg-silver': i === 1,'bg-bronze': i === 2}">{{ i + 1 }} </span>
            <span>{{
              item.name.slice(0, 24).trim() +
              (item.name.length > 20 ? "..." : "")
            }}</span>
          </div>
          <span class="dash-widget-item-price">${{ item.totalProfit }}</span>
        </li>
      </ul>
    </section>
    <div class="dash-widget-nodata">
      <p>Нет доступных данных</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from '~/interface/products/product';

const props = defineProps({
  cat: {
    type: Array as PropType<Category[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    default: 25,
  },
});
</script>

<style lang="scss" scoped>
.dash {
  &-widget {
    background: white;
    height: 100%;
    border: 0.1rem solid rgb(214,214,214);
    border-radius: .8rem;
    overflow: hidden;

    &-header {
      border-bottom: 0.1rem solid rgb(214,214,214);
      padding: 1rem 1.5rem;
      width: 100%;
      &-title {
        font-size: 1.4rem;
        font-weight: 500;
        color: black;
      }
    }

    &-nodata{
      width: 100%;
      height: 15rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;

      & P{
        font-size: 2rem;
        font-weight: 600;
        line-height: 120%;
      }
    }

    &-list {
      overflow-y: auto;

    }
    &-ul {
      width: 100%;
    }
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      @media (max-width: 450px) {
        padding: 1rem 0.8rem;
      }
      
      & span {
        font-size: 1.2rem;
        line-height: 100%;
        text-transform: capitalize;
      }

      &-block {
        display: flex;
        align-items: center;
        column-gap: 1.5rem;
      }

      &-rating {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 0.1rem solid #e6e6e6;

        @media (max-width: 450px) {
          width: 2.5rem;
          height: 2.5rem;
        }

        &.bg-gold{
          color: #fff !important;
          background: #CA8A04;
          border: unset;
        }
        &.bg-silver{
          color: #fff !important;
          background: #010101;
          border: unset;
        }
        &.bg-bronze{
          color: #fff !important;
          background: #D97706;
          border: unset;
        }
      }

      &-price {
        height: max-content;
        line-height: 100%;
        padding: 0.4rem 0.6rem;
        border-radius: 5rem;
        border: 0.1rem solid #e6e6e6;
      }
    }
  }
}
.dash-widget-list::-webkit-scrollbar {
  width: 1.2rem;
}
.dash-widget-list::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border: 0.3rem solid #f3f3f3;
  border-radius: 0.5rem;
}
.dash-widget-list::-webkit-scrollbar-thumb:hover {
  background-color: #acacac;
}
.dash-widget-list::-webkit-scrollbar-track {
  background: #f3f3f3;
}
</style>
