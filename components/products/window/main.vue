<template>
  <div class="products-layout">
    <div class="products-layout-item">
      <label for="manufacturer"
        ><p class="products-layout-title">Производитель:</p></label
      >
      <select id="manufacturer" name="manufacturer" v-model="prodData.productManufacturerId">
        <option
          v-for="(manufacturer, i) in manufacturers"
          :key="i"
          :value="manufacturer.id"
        >
          {{ manufacturer.name }}
        </option>
      </select>
    </div>
    <label class="products-layout-item">
      <p class="products-layout-title">Модель</p>
      <input
        type="text"
        v-model="prodData.model"
        placeholder="Введите модель"
      />
    </label>
    <label class="products-layout-item">
      <p class="products-layout-title">Номер продукта</p>
      <input
        type="text"
        v-model="prodData.identificationNumber"
        placeholder="Введите номер"
      />
    </label>
    <label class="products-layout-item">
      <p class="products-layout-title">Первенство</p>
      <input
        type="text"
        v-model="prodData.priority"
        placeholder="Введите первенство"
      />
    </label>
    <div class="products-layout-item">
      <label for="categories"
        ><p class="products-layout-title">Выберите категорию:</p></label
      >
      <select id="categories" name="categories" v-model="prodData.categoryId">
        <option
          v-for="(category, i) in categories"
          :key="i"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="products-layout-item">
      <label for="sections"
        ><p class="products-layout-title">Выберите секцию:</p></label
      >
      <select id="sections" name="sections" v-model="prodData.sectionId">
        <option
          v-for="(section, i) in sections"
          :key="i"
          :value="section.id"
        >
          {{ section.name }}
        </option>
      </select>
    </div>
    <label class="products-layout-item">
      <p class="products-layout-title">Ссылка</p>
      <input
        type="text"
        v-model="prodData.link"
        placeholder="https://example.com/"
      />
    </label>
    <label class="products-layout-item">
      <p class="products-layout-title">Мета название</p>
      <input
        type="text"
        v-model="prodData.metaTitle"
        placeholder="Введите мета название"
      />
    </label>
    <label class="products-layout-item box50">
      <p class="products-layout-title">Мета тег</p>
      <input
        type="text"
        v-model="prodData.metaTags"
        placeholder="Введите мета тег"
      />
    </label>
    <label class="products-layout-item box50">
      <p class="products-layout-title">Мета описание</p>
      <input
        type="text"
        v-model="prodData.metaDescription"
        placeholder="Введите мета описание"
      />
    </label>
    <label class="products-layout-item box30">
      <p class="products-layout-title">Цена</p>
      <input
        type="text"
        v-model="prodData.price"
        placeholder="Укажите цену"
      />
    </label>
    <label class="products-layout-item box30">
      <p class="products-layout-title">Наценка</p>
      <input
        type="text"
        v-model="prodData.extra"
        placeholder="Укажите наценку"
      />
    </label>
    <label class="products-layout-item box30">
      <p class="products-layout-title">Прибыль</p>
      <input
        type="text"
        v-model="prodData.profit"
        placeholder="Укажите прибыль"
      />
    </label>
    <div class="products-layout-item">
      <label for="countries"
        ><p class="products-layout-title">Выберите страну:</p></label
      >
      <select id="countries" name="countries" v-model="prodData.countryId">
        <option
          v-for="(country, i) in countries"
          :key="i"
          :value="country.id"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <label class="products-layout-item">
      <p class="products-layout-title">Склад</p>
      <input
        type="text"
        v-model="prodData.warehouse"
        placeholder="Место хранения"
      />
    </label>
    <label class="products-layout-item">
      <p class="products-layout-title">Количество</p>
      <input
        type="text"
        v-model="prodData.amount"
        placeholder="Укажите количество"
      />
    </label>
    <div class="products-layout-item">
      <label for="availabilities"
        ><p class="products-layout-title">Наличие товара:</p></label
      >
      <select id="availabilities" name="availabilities" v-model="prodData.availability">
        <option
          v-for="(available, i) in availabilities"
          :key="i"
          :value="available.id"
        >
          {{ available.name }}
        </option>
      </select>
    </div>
    <label class="products-layout-item textarea">
      <p class="products-layout-title">Описание продукта</p>
      <textarea
        class="products-layout-desc"
        v-model="prodData.description"
        placeholder="Введите описание"
      ></textarea>
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  prodData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const manufacturers = ref<any[]>([])
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
  const [categoryRes, sectionsRes, countriesRes, manufacturersRes] = await Promise.all([
    apiProductsFetch('/api/categories', options).then(res => res.json()),
    apiProductsFetch('/api/sections', options).then(res => res.json()),
    apiProductsFetch('/api/countries', options).then(res => res.json()),
    apiProductsFetch('/api/productmanufacturers', options).then(res => res.json()),
  ]);
  categoryRes.map((el: any)=> categories.value.push(el))
  sectionsRes.map((el: any)=> sections.value.push(el))
  countriesRes.map((el: any)=> countries.value.push(el))
  manufacturersRes.map((el: any)=> manufacturers.value.push(el))
}
onMounted(async () => {
  getData()
});
</script>

<style lang="scss" scoped>
.products-layout {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  & input,
  textarea {
    color: #000 !important;
    background: #fff;
  }

  &-title {
    font-size: 1.2rem;
    line-height: 120%;
    color: #cccccc;
    margin-bottom: .4rem;
  }

  &-item {
    max-width: calc(100% / 4 - 0.8rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & select {
      background-color: white;
      font-size: 1.4rem !important;
      color: black;
      padding: 0.725rem 1.2rem;
      border-radius: .5rem;
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
      border: 0.1rem solid #eeeeee;
      outline: none;
      font-size: 1.4rem !important;
      line-height: 120%;
      padding: 0.725rem 1.2rem;
      border-radius: 0.5rem;
    }
    & > * {
      width: 100%;
      text-align: start;
    }
  }
  &-desc {
    resize: none;
    height: 25rem;
  }
}
</style>
