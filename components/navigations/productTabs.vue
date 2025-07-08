<template>
  <div class="product-tabs">
    <div class="product-tabs-wrapper">
      <nuxt-link class="product-tabs-link" to="/generator">
        Статистика
      </nuxt-link>
      <nuxt-link class="product-tabs-link" to="/generator/table">
        Продукты
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.product-tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  &-wrapper {
    height: auto;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    border: .1rem solid #e5e5e5;
  }

  &-link {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 130%;
    padding: .8rem 1.2rem;
    color: #333;

    &:first-of-type{
        border-right: .1rem solid #e5e5e5;
    }

    &.router-link-active {
        color: #229C39;
        background: rgba(34, 156, 56, 0.05);
    }
  }
}
</style>
