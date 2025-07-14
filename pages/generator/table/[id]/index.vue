<template>
  <div class="product">
    <div class="product-header">
      <h1>Изменение продукта</h1>
    </div>
    <div class="product-wrapper">
      <div class="product-container screen40">
        <div class="product-container-image">
          <img
            :src="
              product.imageUrl?.replace(
                'https://via.placeholder.com',
                'https://placehold.co'
              )
            "
            alt=""
          />
        </div>
      </div>
      <div class="product-container screen60">
        <div class="product-item">
          <label for="manufacturers"
            ><p class="product-item-title">Производитель:</p></label
          >
          <select
            id="manufacturers"
            name="manufacturers"
            v-model="product.productManufacturerId"
          >
            <option
              v-for="(manufacturer, i) in manufacturers"
              :key="i"
              :value="manufacturer.id"
            >
              {{ manufacturer.name }}
            </option>
          </select>
        </div>
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
          <select
            id="categories"
            name="categories"
            v-model="product.categoryId"
          >
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
            min="0"
            step="0.01"
            @input="validatePrice"
            pattern="^\d+(\.\d{0,2})?$"
          />
          <span>$</span>
        </label>
        <label class="product-item box30">
          <p class="product-item-title">Наценка</p>
          <input
            type="text"
            v-model="product.extra"
            placeholder="Укажите наценку"
            min="0"
            max="100"
            step="0.01"
            @input="validateExtra"
            pattern="^\d{1,3}(\.\d{0,2})?$"
          />
          <span>%</span>
        </label>
        <label class="product-item box30">
          <p class="product-item-title">Прибыль</p>
          <input
            type="text"
            v-model="product.profit"
            placeholder="Укажите прибыль"
            :style="{ background: '#f0f0f0 !important' }"
            disabled
          />
          <span>$</span>
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
            type="number"
            v-model="product.amount"
            placeholder="Укажите количество"
            min="0"
          />
        </label>
        <div class="product-item">
          <label for="availabilities"
            ><p class="product-item-title">Наличие товара:</p></label
          >
          <select
            id="availabilities"
            name="availabilities"
            v-model="product.availability"
          >
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
    <div class="product-buttons">
      <button
        class="product-buttons-save"
        :disabled="!isProductChanged"
        @click="updateProduct"
      >
        Сохранить
      </button>
      <button class="product-buttons-cancel" @click="cancelChanges">
        Отменить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiProductsFetch } from "~/composables/Exports";
import Products from "~/composables/modals/products";
import {
  FailedAlert,
  SuccessNotification,
} from "~/composables/Notification/list";
import type { ProductDto } from "~/interface/products/product";
const $router = useRouter();
const id = $router.currentRoute.value.params.id;
const productData = ref<any>([]);

// Данные для продукта
const product = ref<ProductDto>({
  extra: 0,
  price: 0,
  profit: 0,
});

const originalProduct = ref<ProductDto>(
  JSON.parse(JSON.stringify(product.value))
);

const getProduct = async () => {
  await new Products(productData.value).getProduct(id);
  product.value = productData.value[0];
  originalProduct.value = JSON.parse(JSON.stringify(product.value));
};

const manufacturers = ref<any[]>([]);
const categories = ref<any[]>([]);
const sections = ref<any>([]);
const countries = ref<any>([]);
const availabilities = ref([
  { id: true, name: "Имеется" },
  { id: false, name: "Нету" },
]);

const getData = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [manufacturersRes, categoryRes, sectionsRes, countriesRes] =
    await Promise.all([
      apiProductsFetch("/api/productmanufacturers", options).then((res) =>
        res.json()
      ),
      apiProductsFetch("/api/categories", options).then((res) => res.json()),
      apiProductsFetch("/api/sections", options).then((res) => res.json()),
      apiProductsFetch("/api/countries", options).then((res) => res.json()),
    ]);
  categoryRes.map((el: any) => categories.value.push(el));
  sectionsRes.map((el: any) => sections.value.push(el));
  countriesRes.map((el: any) => countries.value.push(el));
  manufacturersRes.map((el: any) => manufacturers.value.push(el));
};

const isProductChanged = computed(() => {
  return (
    JSON.stringify(product.value) !== JSON.stringify(originalProduct.value)
  );
});

const updateProduct = async () => {
  const res = await new Products().update(product.value);
  if (res.ok) {
    SuccessNotification("Продукт успешно обновлен");
    $router.push("/generator/table");
  } else {
    FailedAlert("Ошибка при обновлении продукта");
  }
};

const cancelChanges = () => {
  product.value = JSON.parse(JSON.stringify(originalProduct.value));
};

const validatePrice = () => {
  let price: number | string = product.value.price ?? 0;

  price = price.toString().replace(/[^0-9.]/g, "");

  if ((price.match(/\./g) || []).length > 1) {
    price = price.slice(0, price.lastIndexOf("."));
  }

  if (price.includes(".")) {
    const [integerPart, decimalPart] = price.split(".");
    price = `${integerPart}.${decimalPart.slice(0, 2)}`;
  }

  product.value.price = parseFloat(price);

  if (!product.value.extra) {
    product.value.profit = 0;
    product.value.extra = 0;
  }

  if (!product.value.price) {
    product.value.price = 0;
  }
};

const validateExtra = () => {
  let extra: string | number = product.value.extra ?? 0;

  extra = extra.toString().replace(/[^0-9.]/g, "");

  if ((extra.match(/\./g) || []).length > 1) {
    extra = extra.slice(0, extra.lastIndexOf("."));
  }

  if (extra.includes(".")) {
    const [integerPart, decimalPart] = extra.split(".");
    extra = `${integerPart}.${decimalPart.slice(0, 2)}`;
  }

  product.value.extra = parseFloat(extra);

  if (product.value.extra > 100) {
    product.value.extra = 100;
  }

  if (product.value.extra < 0) {
    product.value.extra = 0;
  }

  if (product.value.extra === 0) {
    product.value.profit = 0;
  }

  if (!product.value.extra) {
    product.value.extra = 0;
  }
};

watch([() => product.value.price, () => product.value.extra], () => {
  const price = product.value.price ?? 0;
  const extra = product.value.extra ?? 0;

  if (price > 0 && extra >= 0 && extra <= 100) {
    product.value.profit = (price * extra) / 100;
  } else {
    product.value.profit = 0;
  }
});

onMounted(() => {
  getData();
  getProduct();
});
</script>

<style lang="scss" setup>
.product {
  &-header {
    margin-bottom: 1rem;

    & > h1 {
      font-size: 2.4rem;
      color: #333;
    }
  }

  &-wrapper {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    border: 0.1rem solid #e5e5e5;
    border-radius: 0.8rem;
    background: #fff;
    color: #000;
  }

  &-container {
    width: 100%;

    &-image {
      width: 100%;
      height: 60rem;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 0.8rem;
      }
    }

    &.screen40 {
      max-width: 40%;
    }

    &.screen60 {
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
      margin-bottom: 0.4rem;
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
      border-radius: 0.8rem;
      border: 0.1rem solid #eeeeee;
      appearance: none;
      cursor: pointer;

      & option {
        font-size: 1.4rem;

        &:hover {
          background-color: #229c22;
          color: white;
        }
      }
    }

    &.box50 {
      max-width: calc(100% / 2 - 0.6rem);
    }

    &.box30 {
      max-width: calc(100% / 3 - 0.7rem);
      position: relative;

      & span {
        position: absolute;
        width: max-content;
        bottom: 0.2rem;
        right: 0;
        border-left: 0.1rem solid #eeeeee;
        font-size: 1.4rem;
        padding: 0.55rem 1rem;
      }
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

  &-buttons {
    margin-top: 1rem;
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & button {
      width: 100%;
      padding: 1rem 0;
      font-size: 1.4rem !important;
      font-weight: 600;
      line-height: 140%;
      color: #fff;
      text-align: center;
      border-radius: 0.8rem;
    }

    &-save {
      background: linear-gradient(0, #4ede67, #4bd2a6);
    }

    &-cancel {
      background: #808b96;
    }
  }
}
</style>
