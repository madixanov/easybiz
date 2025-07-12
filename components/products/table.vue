<template>
  <div class="product-table">
    <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
    <table
      :style="{
        opacity: loaded ? 1 : 0,
        transition: 'all 500ms ease',
      }"
    >
      <thead>
        <tr>
          <th>
            <input type="checkbox" :checked="allSelected" @change="toggleAll" />
          </th>
          <th>Id</th>
          <th>Image</th>
          <th>Producer</th>
          <th>Products</th>
          <th>Categories</th>
          <th>Link</th>
          <th>Price</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in products" :key="product.id">
          <td>
            <input
              type="checkbox"
              :value="product.id"
              :checked="selectedProducts.includes(product.id)"
              @change="toggleSingle(product.id)"
            />
          </td>
          <td>{{ i + 1 }}</td>
          <td>
            <img :src="product.imageUrl" alt="Product" class="product-image" />
          </td>
          <td>{{ product.productManufacturer.name }}</td>
          <td>{{ product.model }}</td>
          <td>{{ product.category.name }}</td>
          <td><a :href="product.link" target="_blank" rel="noopener noreferrer">{{ product.link }}</a></td>
          <td>${{ product.price }}</td>
          <td>
            <nuxt-link :to="`/generator/table/${product.id}`" class="edit-icon"
              >✎</nuxt-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from "~/interface/products/product";
import UiLoader from "~/components/ui/loader.vue";

const loaded = ref(false);
const props = defineProps<{
  products: Array<ProductDto>;
  selectedProducts: any[];
}>();

const emit = defineEmits(["update:selected-products"]);

const allSelected = computed(() => {
  return (
    props.products.length > 0 &&
    props.products.every((p: ProductDto) =>
      props.selectedProducts.includes(p.id)
    )
  );
});

const toggleAll = () => {
  const newSelection = allSelected.value ? [] : props.products.map((p) => p.id);
  emit("update:selected-products", newSelection);
};

const toggleSingle = (id: any) => {
  const newSelected = props.selectedProducts.includes(id)
    ? props.selectedProducts.filter((pid) => pid !== id)
    : [...props.selectedProducts, id];
  emit("update:selected-products", newSelected);
};
onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 1000);
});
</script>

<style scoped lang="scss">
.product-table {
  width: 100%;
  position: relative;
  overflow-x: auto;

  table {
    font-size: 1.4rem;
    width: 100%;
    background: #fff;
    color: #333;

    th,
    td {
      padding: 1.2rem 1.6rem;
      text-align: left;
      white-space: nowrap;

      @media (max-width: 600px) {
        padding: 0.8rem 1rem;
      }
    }

    tr {
      border-top: 0.1rem solid #e5e5e5;
      border-bottom: 0.1rem solid #e5e5e5;

      &:last-of-type {
        border-bottom: unset;
      }
    }

    th {
      background-color: #fff;
      border-bottom: 0.1rem solid #e5e5e5;
      font-weight: 600;
      z-index: 1;
    }

    .product-image {
      width: 6rem;
      height: 4.4rem;
      border-radius: 0.4rem;
      object-fit: cover;

      @media (max-width: 600px) {
        width: 5rem;
        height: 3.4rem;
      }
    }

    .edit-icon {
      cursor: pointer;
      color: #333;
      font-weight: bold;
      transition: color 0.2s;

      &:hover {
        color: #1d8d1d;
      }
    }

    tr:hover {
      background-color: #fafafa;
    }

    input[type="checkbox"]:checked {
      background-color: #28a745;
      border-color: #28a745;
    }

    input[type="checkbox"] {
      appearance: none;
      width: 1.5rem;
      height: 1.5rem;
      border: 0.2rem solid #ddd;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
    }

    input[type="checkbox"]:checked::after {
      content: "✔";
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
    }
  }
}
</style>
