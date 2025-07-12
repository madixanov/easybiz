<template>
  <div class="dash-widget item">
    <header class="dash-widget-header">
      <p class="dash-widget-header-title">{{ title }}</p>
    </header>
    <section class="dash-widget-content" v-if="!prod.error">
      <div class="dash-widget-media">
        <img :src="(prod.imageUrl ?? 'https://placehold.co/300x300?text=No+Image').replace('https://via.placeholder.com','https://placehold.co')" alt="Product Image" />
      </div>
      <div class="dash-widget-data">
        <p class="dash-widget-data-item title">
          <i :class="`fas fa-solid ${icon}`" v-if="prod?.profit"></i> {{ prod?.profit }}
        </p>
        <p class="dash-widget-data-item" v-if="prod?.priority">{{prod?.priority.toFixed(1)}}%</p>
      </div>
    </section>
    <section class="dash-widget-nodata"v-else>
      <h2>{{ title }} не определен</h2>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { ProductDto } from '~/interface/products/product';
const props = defineProps({
  prod: {
    type: Object as PropType<ProductDto>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
})
</script>

<style lang="scss" scoped>
.dash {
  &-widget {
    background: white;
    height: 100%;
    border: 0.1rem solid rgb(214, 214, 214);
    border-radius: .8rem;
    overflow: hidden;

    &.item {
      @media (max-width: 1280px) {
        max-width: 50%;
        width: 100%;
        height: max-content;
      }

      @media (max-width: 900px) {
        max-width: 100%;
        width: 100%;
        height: max-content;
      }
    }

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

    &-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
    }

    &-nodata{
      width: 100%;
      height: 15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 3rem;
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 140%;
    }

    &-media {
      width: 100%;
      max-width: 50%;
      height: 14rem;

      & img {
        width: 100%;
        height: 100%;
        max-height: inherit;
        object-fit: contain;
      }
    }

    &-data {
      max-width: 50%;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-item {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 135%;

        &.title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2rem;

          & i {
            margin-right: 0.5rem;
          }
        }
      }
    }

    &-list {
      height: 25rem;
      overflow-y: auto;

      &.max {
        height: 40rem;
      }
    }

    &-ul {
      width: 100%;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;

      & span {
        font-size: 1.2rem;
        line-height: 100%;
        text-transform: capitalize;
      }

      &-block {
        display: flex;
        align-items: center;
        column-gap: 2rem;
      }

      &-rating {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 0.1rem solid #e6e6e6;
      }

      &-price {
        height: max-content;
        line-height: 100%;
        padding: 0.2rem 0.6rem;
        border-radius: 5rem;
        border: 0.1rem solid #e6e6e6;
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
