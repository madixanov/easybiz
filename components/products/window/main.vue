<template>
  <div class="products-layout">
    <label class="products-layout-item">
      <p class="products-layout-title">Название продукта</p>
      <input
        type="text"
        v-model="productData.title"
        placeholder="Введите название"
      />
    </label>
    <label class="products-layout-item">
      <p class="products-layout-title">Цена продукта</p>
      <input
        type="text"
        v-model="productData.price"
        @input="formatPrice($event)"
        placeholder="Введите цену"
      />
    </label>
    <label class="products-layout-item">
      <p class="products-layout-title">Количество продукта</p>
      <input
        type="text"
        v-model="productData.amount"
        placeholder="Введите количество"
      />
    </label>
    <div class="products-layout-item">
      <!-- <label for="categories"
        ><p class="products-layout-title">Выберите категорию:</p></label
      >
      <select id="categories" name="categories" v-model="productData.category">
        <option
          v-for="(category, i) in categories"
          :key="i"
          :value="category.id"
        >
          {{ category.category_name }}
        </option>
      </select> -->
    </div>
    <label class="products-layout-item textarea">
      <p class="products-layout-title">Описание продукта</p>
      <textarea
        class="products-layout-desc"
        v-model="productData.description"
        placeholder="Введите описание"
      ></textarea>
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  productData: {
    type: Object,
    required: false,
    default: () => ({
      title: "",
      price: "",
      amount: "",
      description: "",
      media: [],
      category: "",
    }),
  },
});

const formatPrice = (event: Event) => {
  let input = (event.target as HTMLInputElement).value;
  input = input.replace(/[^0-9.]/g, "");
  const parts = input.split(".");
  if (parts.length > 2) input = parts[0] + "." + parts.slice(1).join("");
  if (input && !input.startsWith("$")) input = `$${input}`;
  props.productData.price = input;
};

onMounted(async () => {});
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
    max-width: calc(100% / 2 - 0.5rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & #categories {
      border: 0.1rem solid #eeeeee;
      outline: none;
      font-size: 1.2rem;
      line-height: 120%;
      padding: 0.525rem 0.5rem;
      border-radius: 0.5rem;
      color: #8f8f8f;
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
