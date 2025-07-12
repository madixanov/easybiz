<template>
  <div class="product">
    <div class="product-header">
      <h1>Изменение продукта</h1>
    </div>
    <div class="product-wrapper">
      <div class="product-container screen40">
        <div class="product-container-image">
          <img :src="product.imageUrl?.replace('https://via.placeholder.com', 'https://placehold.co')" alt="">
        </div>
      </div>
      <div class="product-container screen60">
        <label class="product-item">
      <p class="product-item-title">Произодитель</p>
      <input
        type="text"
        placeholder="Введите произодителя"
      />
    </label>
    <label class="product-item">
      <p class="product-item-title">Модель</p>
      <input
        type="text"
        v-model="product.model"
        placeholder="Введите модель"
      />
    </label>
    <label class="product-item">
      <p class="product-item-title">Номер продукта</p>
      <input
        type="text"
        v-model="product.identificationNumber"
        placeholder="Введите номер"
      />
    </label>
    <label class="product-item">
      <p class="product-item-title">Первенство</p>
      <input
        type="text"
        v-model="product.priority"
        placeholder="Введите первенство"
      />
    </label>
    <div class="product-item">
      <label for="categories"
        ><p class="product-item-title">Выберите категорию:</p></label
      >
      <select id="categories" name="categories" v-model="product.categoryId">
        <option
          v-for="(category, i) in categories"
          :key="i"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="product-item">
      <label for="sections"
        ><p class="product-item-title">Выберите секцию:</p></label
      >
      <select id="sections" name="sections" v-model="product.sectionId">
        <option
          v-for="(section, i) in sections"
          :key="i"
          :value="section.id"
        >
          {{ section.name }}
        </option>
      </select>
    </div>
    <label class="product-item">
      <p class="product-item-title">Ссылка</p>
      <input
        type="text"
        v-model="product.link"
        placeholder="https://example.com/"
      />
    </label>
    <label class="product-item">
      <p class="product-item-title">Мета название</p>
      <input
        type="text"
        v-model="product.metaTitle"
        placeholder="Введите мета название"
      />
    </label>
    <label class="product-item box50">
      <p class="product-item-title">Мета тег</p>
      <input
        type="text"
        v-model="product.metaTags"
        placeholder="Введите мета тег"
      />
    </label>
    <label class="product-item box50">
      <p class="product-item-title">Мета описание</p>
      <input
        type="text"
        v-model="product.metaDescription"
        placeholder="Введите мета описание"
      />
    </label>
    <label class="product-item box30">
      <p class="product-item-title">Цена</p>
      <input
        type="text"
        v-model="product.price"
        placeholder="Укажите цену"
      />
    </label>
    <label class="product-item box30">
      <p class="product-item-title">Наценка</p>
      <input
        type="text"
        v-model="product.extra"
        placeholder="Укажите наценку"
      />
    </label>
    <label class="product-item box30">
      <p class="product-item-title">Прибыль</p>
      <input
        type="text"
        v-model="product.profit"
        placeholder="Укажите прибыль"
      />
    </label>
    <div class="product-item">
      <label for="countries"
        ><p class="product-item-title">Выберите страну:</p></label
      >
      <select id="countries" name="countries" v-model="product.countryId">
        <option
          v-for="(country, i) in countries"
          :key="i"
          :value="country.id"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <label class="product-item">
      <p class="product-item-title">Склад</p>
      <input
        type="text"
        v-model="product.warehouse"
        placeholder="Место хранения"
      />
    </label>
    <label class="product-item">
      <p class="product-item-title">Количество</p>
      <input
        type="text"
        v-model="product.amount"
        placeholder="Укажите количество"
      />
    </label>
    <div class="product-item">
      <label for="availabilities"
        ><p class="product-item-title">Наличие товара:</p></label
      >
      <select id="availabilities" name="availabilities" v-model="product.availability">
        <option
          v-for="(available, i) in availabilities"
          :key="i"
          :value="available.id"
        >
          {{ available.name }}
        </option>
      </select>
    </div>
    <label class="product-item textarea">
      <p class="product-item-title">Описание продукта</p>
      <textarea
        class="product-item-desc"
        v-model="product.description"
        placeholder="Введите описание"
      ></textarea>
    </label>
      </div>
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
const getProduct = async () => {
    await new Products(productData.value).getProduct(id);
    product.value = productData.value[0] as ProductDto;
};

const categories = ref<any[]>([]);
const sections = ref<any>([]);
const countries = ref<any>([]);
const availabilities = ref([
  { id: true, name: 'Имеется' },
  { id: false, name: 'Нету' },
]);
const getData = async ()=>{
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const [categoryRes, sectionsRes, countriesRes] = await Promise.all([
    apiProductsFetch('/api/categories', options).then(res => res.json()),
    apiProductsFetch('/api/sections', options).then(res => res.json()),
    apiProductsFetch('/api/countries', options).then(res => res.json()),
  ]);
  categoryRes.map((el: any)=> categories.value.push(el))
  sectionsRes.map((el: any)=> sections.value.push(el))
  countriesRes.map((el: any)=> countries.value.push(el))
}

onMounted(() => {
  getData()
  getProduct();
});
</script>

<style lang="scss" setup>
.product{
    &-header{
        margin-bottom: 2rem;

        & > h1{
            font-size: 2.4rem;
            color: #333;
        }
    }

    &-wrapper{
      display: flex;
      gap: 2rem;
      padding: 2rem;
      border: .1rem solid #e5e5e5;
      border-radius: .8rem;
      background: #fff;
      color: #000;
    }

    &-container{
      width: 100%;

      &-image{
        width: 100%;
        height: 60rem;
        
        & img{
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: .8rem;
        }
      }

      &.screen40{
        max-width: 40%;
      }

      &.screen60{
        max-width: 60%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }

    &-item {
    max-width: calc(100% / 4 - 0.8rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
    &-title {
      font-size: 1.2rem;
      line-height: 120%;
      color: #cccccc;
      margin-bottom: .4rem;
    }

    &-desc {
      resize: none;
      height: 25rem;
    }

    & select {
      background-color: white;
      font-size: 1.4rem !important;
      outline: none;
      color: black;
      padding: 0.725rem 1.2rem;
      border-radius: .8rem;
      border: .1rem solid #eeeeee;
      appearance: none;
      cursor: pointer;

      & option{
        font-size: 1.4rem;

        &:hover{
          background-color: #229C22;
          color: white;
        }
      }
    }

    &.box50{
      max-width: calc(100% / 2 - 0.6rem);
    }
    &.box30{
      max-width: calc(100% / 3 - 0.7rem);
    }

    &.textarea {
      max-width: 100%;
    }
    & textarea,
    input {
      outline: none;
      border: 0.1rem solid #eeeeee;
      font-size: 1.4rem !important;
      line-height: 120%;
      padding: 0.725rem 1.2rem;
      border-radius: 0.8rem;
      color: #000 !important;
      background: #fff !important;
    }
    & > * {
      width: 100%;
      text-align: start;
    }
  }
}
</style>
