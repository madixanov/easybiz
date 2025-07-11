<template>
  <div class="product">
    <div class="product-header">
      <h1>Product ID {{ id }}</h1>
    </div>
    <div class="product-view">
        {{ product.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Products from '~/composables/modals/products';
import type { ProductDto } from '~/interface/products/product';
const $router = useRouter();
const id = $router.currentRoute.value.params.id;
const productData = ref<any>([])
const product = ref<ProductDto>({})
console.log(id);

const getProduct = async () => {
    await new Products(productData.value).getProduct(id);
    product.value = productData.value[0] as ProductDto;
    console.log(product.value, 'prod');
};

onMounted(() => {
  getProduct();
});
</script>
<style lang="scss" setup>
.product{
    &-view{
        color: #000;
    }
}
</style>
