<template>
  <div class="products">
    <div class="products-controller">
      <p class="products-controller-title">Продукты</p>
      <div class="products-filter">
        <button class="products-filter-button">Filter</button>
        <button class="products-filter-button">Search</button>
        <button class="products-filter-button">Delete</button>
      </div>
      <div class="products-controller-display">
        <button class="products-controller-display-button" @click="() => (isCarded = false)" :style="{background: !isCarded ? '#e0e0e0': 'transparent'}"><span v-html="tableView"></span></button>
        <button class="products-controller-display-button" @click="() => (isCarded = true)" :style="{background: isCarded ? '#e0e0e0': 'transparent'}"><span v-html="cardView"></span></button>
      </div>
    </div>
    
    <ProductTable
      :products="prod"
      :selected-products="selectedProducts"
      @update:selected-products="selectedProducts = $event"
      :style="{ display: isCarded ? 'none' : 'block' }"
    />

    <CardedView
      :rows="prod"
      :selected-products="selectedProducts"
      @update:selected-products="selectedProducts = $event"
      :style="{ display: isCarded ? 'flex' : 'none' }"
    />


  </div>
</template>

<script lang="ts" setup>
import ProductTable from "~/components/products/table.vue";
import CardedView from "~/components/products/card.vue";
import tableView from "~/assets/icons/table-view.svg?raw";
import cardView from "~/assets/icons/card-view.svg?raw";

const isCarded = ref(false);
interface Product {
  id: string;
  image: string;
  producer: string;
  products: string;
  categories: string;
  link: string;
  price: number;
}

// const products: Product[] = [
//   {
//     id: "p0001",
//     image: "https://picsum.photos/id/74/200/300",
//     producer: "Apple",
//     products: "Apple iPad Air 11 2078 M2, 128 GB, Wi-Fi, iPadOS...",
//     categories: "Tablets",
//     link: "Apple-iPad-Air",
//     price: 678,
//   },
//   {
//     id: "p0002",
//     image: "https://picsum.photos/id/61/200/300",
//     producer: "Brand New",
//     products: "Brand New Bike, Local buyer only",
//     categories: "Mobile phones",
//     link: "Brand-New-Bike",
//     price: 988,
//   },
//   {
//     id: "p0003",
//     image: "https://picsum.photos/id/91/200/300",
//     producer: "Sony",
//     products: "Playstation 4 Limited Edition (with games)",
//     categories: "Mobile phones",
//     link: "Playstation-4-...",
//     price: 765,
//   },
//   {
//     id: "p0004",
//     image: "https://picsum.photos/id/51/200/300",
//     producer: "Game",
//     products: "Gaming Chair, local pickup only",
//     categories: "Tablets",
//     link: "Gaming-Chair",
//     price: 876,
//   },
//   {
//     id: "p0005",
//     image: "https://picsum.photos/id/10/200/300",
//     producer: "UC",
//     products: "UC Integrations",
//     categories: "Mobile phones",
//     link: "UC-Integrations",
//     price: 780,
//   },
//   {
//     id: "p0006",
//     image: "https://picsum.photos/id/12/200/300",
//     producer: "Pierre",
//     products: "Pierre Gold Accent Chair",
//     categories: "Mobile phones",
//     link: "Pierre-Gold-Ac...",
//     price: 877,
//   },
// ];
const prod = ref<any>([]);
const getProducts = async ()=>{
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  }; 
  const res = await apiProductsFetch('/api/products', options);
  const data = await res.json();
  data.map((el: any)=> prod.value.push(el))
  console.log(res);
}
const selectedProducts = ref<string[]>([]);
onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  background: #fff;
  border: 0.1rem solid #e5e5e5;
  border-radius: 0.8rem;
  overflow: hidden;

  &-controller {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem;

    &-title {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 140%;
      color: #000;
    }

    &-display {
      display: flex;
      align-items: center;
      border: 0.1rem solid #e5e5e5;
      border-radius: 0.8rem;
      overflow: hidden;

      &-button {
        padding: .5rem .8rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-of-type {
          border-right: 0.1rem solid #e5e5e5;
        }

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }

  &-filter {
    display: flex;
    align-items: center;
    border: 0.1rem solid #e5e5e5;
    border-radius: 0.8rem;
    overflow: hidden;

    &-button {
      font-size: 1.2rem !important;
      font-weight: 400;
      line-height: 120%;
      color: #475166;
      border-right: 0.1rem solid #e5e5e5;
      padding: 0.8rem 1.2rem;

      &:last-of-type {
        border-right: unset;
      }

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
