<template>
  <div class="product-media">
    <label class="product-media-upload" for="media-content">
      <span v-html="upload"></span>
      <p class="product-layout-title">Загрузить картинку</p>
      <input
        type="file"
        hidden
        id="media-content"
        @change="onFileChange"
      />
    </label>
    <div class="product-media-cards">
      <!-- <div
        class="product-media-card"
        v-for="(item, index) in media"
        :key="item.id"
      >
        <i
          class="fas fa-solid fa-trash"
        ></i>
        <img :src="item.url" alt="image" @click="showModal(item.url)" />
      </div> -->
      <div v-if="media" class="product-media-card">
        <img :src="media" alt="Uploaded Image"  @click="showModal(media)"/>
      </div>
      <div class="product-media-card-status" v-else>Вы ещё не загрузили фотографию</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import upload from "~/assets/icons/upload.svg?raw";
import showModal from "~/composables/modals/showImage";
const props = defineProps({
  media: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["upload"]);

const media = ref<string | null>(null);

const onFileChange = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput?.files?.[0];
  if (file) {
    try {
      const imageUrl = URL.createObjectURL(file);
      media.value = imageUrl;
      emit("upload", file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  &-media {
    flex-direction: column;
    align-items: center;

    &-upload{
        max-width: 50rem;
        width: 100%;
        height: 20rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 0.1rem solid #e0e0e0;
        border-radius: 0.4rem;
        row-gap: 1rem;
        cursor: pointer;

        & span {
          background: #229c39;
          color: white;
          padding: 1rem;
          border-radius: 50%;
        }

        & > * {
          width: max-content;
        }
    }

    &-cards{
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      padding: 1rem 0;
    }

    &-card {
      position: relative;
      // max-width: calc(100% / 3 - 0.4rem);
      width: 100%;
      height: 30rem;
      border: .1rem solid #e0e0e0;
      border-radius: 0.6rem;
      overflow: hidden;
      cursor: pointer;
      // @media (max-width: 480px) {
      //   max-width: calc(100% / 2 - 0.3rem);
      // }

      & i {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: none;
        font-size: 1rem;
        color: rgb(66, 66, 66);
        background: white;
        border-radius: 5rem;
        padding: 0.5rem;

        &:hover {
          color: rgb(226, 0, 0);
        }
      }

      &:hover i {
        display: block;
      }

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &-status{
        font-style: 1.6rem;
        font-weight: 500;
        color: #2c2c2c;
        line-height: 120%;

      }
    }
  }
}
</style>
