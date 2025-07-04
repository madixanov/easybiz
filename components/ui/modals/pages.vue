<script lang="ts" setup>
import close from "@/assets/x-close.svg";
import { stringifyQuery } from "vue-router";
import { apiConstructorFetch } from "~/composables/Exports";
import { FailedAlert, PushNotification } from "~/composables/Notification/list";
import Pages from '~/composables/Editor/generator/pages';
const $router = useRouter();

const params = {
  project_id: $router.currentRoute.value.params.project_id,
  page_id: $router.currentRoute.value.params.page_id,
};

const emits = defineEmits(["close", "self"]);

const page = ref({
  title: "",
  url: "",
  description: "",
});

const play = (event: MouseEvent) => {
  const video = event.target as HTMLVideoElement;

  video.play();
};

const create_page = async () => {
  if (page.value.title.trim() === "" || page.value.url.trim() === "") {
    return FailedAlert("Оба поля должны быть заполнены");
  }

  new Pages(params.project_id, page.value.title, page.value.url).create();
  emits("close");
};
</script>

<template>
  <div class="modal" @click.self="$emit('self')">
    <div class="modal-container">
      <header class="modal-header">
        <h2 class="modal-header-title">Создать страницу</h2>
        <button @click="$emit('close')">
          <img :src="close" alt="" />
        </button>
      </header>
      <div class="modal-main">
        <div class="form-group">
          <label for="title">Заголовок страницы:</label>
          <input
            type="text"
            id="title"
            placeholder="Страница 1"
            v-model="page.title"
          />
        </div>
        <div class="form-group">
          <label for="url">URL страницы:</label>
          <input
            type="text"
            id="url"
            placeholder="/pages/1"
            v-model="page.url"
          />
        </div>
      </div>
      <div class="modal-cards">
        <div class="modal-card">
          <video
            disablepictureinpicture=""
            disableremoteplayback=""
            @mouseenter="play($event)"
            poster="https://themes.flexbe.com/img/41604382.jpg"
            preload="none"
            muted
            autoplay
            pip="false"
          >
            <source
              type="video/mp4"
              pip="false"
              src="https://themes.flexbe.com/files/empty-page.mp4"
            />
          </video>
          <div class="modal-card-details">
            <h3>Пустая страница</h3>
            <button :id="'empty'" @click="create_page">Выбрать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  padding: 4rem;
  transition: 300ms;
  opacity: 0;
  visibility: hidden;

  &-container {
    width: 100%;
    height: 100%;
    max-width: 120rem;
    max-height: 60rem;
    overflow-y: auto;
    width: 100%;
    border-radius: 1rem;
    background: #fff;
    transition: 300ms;
    transition-delay: 300ms;
    transform: scale(0);
  }

  &.active {
    opacity: 1;
    visibility: visible;

    & .modal-container {
      transform: scale(1);
    }
  }

  &-header {
    padding: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.1rem solid #eeeeee;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    &-title {
      font-size: 1.5rem;
      line-height: 1.5;
    }
  }

  &-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    padding: 2rem;

    & .form-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 0.4rem;
      color: #000;

      & input {
        width: 100%;
        padding: 1rem 1.5rem;
        background: #fff;
        border: 0.2rem solid #eeeeee;
        border-radius: 0.4rem;
        outline: none;
      }

      & label {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-cards {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2.4rem;
    padding: 2rem;
    width: 100%;
    height: 100%;
    background: #eeeeee;
  }

  &-card {
    background: white;
    border-radius: 0.8rem;
    overflow: hidden;
    transition: 300ms;
    max-width: calc(100% / 3 - 1.2rem);
    box-shadow: 0 20px 20px rgb(48 52 59/7%), 0 -5px 10px -5px rgb(48 52 59/7%);

    &:hover {
      transform: translateY(-0.5rem);
    }

    &-details {
      display: flex;
      flex-direction: column;
      row-gap: 2rem;
      padding: 1.2rem;

      & > button {
        background: white;
        border: 0.1rem solid #4773ff;
        padding: 0.8rem 1.6rem;
        width: max-content;
        color: #000;
        border-radius: 2rem;
        transition: 300ms;

        &:hover {
          background: #4773ff;
          color: white;
        }
      }
    }
  }
}
</style>
