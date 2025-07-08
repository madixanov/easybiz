<template>
  <div class="dash-widget">
    <header class="dash-widget-header">
      <p class="dash-widget-header-title">Наиболее {{ title }}</p>
    </header>
    <section class="dash-widget-list" :style="{ 'max-height': `${height}rem`, height: '100%' }">
      <ul class="dash-widget-ul">
        <li
          class="dash-widget-item"
          v-for="(item, i) in prod.sort((a: any, b: any) => b.price - a.price).slice(0, 10)"
          :key="i"
        >
          <div class="dash-widget-item-block">
            <div class="dash-widget-item-image">
              <img :src="item.url" alt="Product Image" v-if="item.url && item.url.length > 0">
              <img src="https://placehold.co/300x300?text=No+Image" alt="Unavailable" v-else>
            </div>
            <span>{{item.title.slice(0, 24).trim() +(item.title.length > 20 ? "..." : "")}}</span>
          </div>
          <span v-if="item.price" class="dash-widget-item-price">${{ item.price.toFixed(2) }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  prod: {
    type: Array<any>,
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

      &-image{
        width: 6rem;
        height: 4.4rem;

        & > img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &-price {
        height: max-content;
        font-size: 1rem;
        font-weight: 700;
        line-height: 100%;
        padding: 0.6rem 1rem;
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
