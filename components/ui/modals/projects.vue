<script lang="ts" setup>
import close from "@/assets/x-close.svg";
import {apiConstructorFetch} from '~/composables/Exports';
import { FailedAlert, SuccessNotification } from "~/composables/Notification/list";
const $router = useRouter();

const emits = defineEmits(["close", "self"]);

const project = ref({
  title: "",
});

const play = (event: MouseEvent) => {
  const video = event.target as HTMLVideoElement;

  video.play();
};

const create_project = async () => {
  if (project.value.title.trim() === "") {
    return FailedAlert("Название сайта не может быть пустым");
  }

  const projectData = {
    id: null,
    name: project.value.title.trim(),
    pages: [],
    urlPath: project.value.title.trim() + '.easybiz.uz',
    globalCss: null
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectDto: projectData }),
  };

  if (project.value.title.trim() === "") {
    return FailedAlert("Название сайта не может быть пустым");
  }

  const response = await apiConstructorFetch(`/api/projects`, options);
  const data = await response.json();
  if (data.error) {
    return FailedAlert("Ошибка при создании страницы");
  }
  SuccessNotification("Страница успешно создана");
  emits("close");
  console.log(data, "project created");
  
  $router.push(`/projects/${data.id}/pages`);
};
</script>

<template>
  <div class="modal" @click.self="$emit('self')">
    <div class="modal-container">
      <header class="modal-header">
        <h2 class="modal-header-title">Создать сайт</h2>
        <button @click="$emit('close')">
          <img :src="close" alt="" />
        </button>
      </header>
      <div class="modal-main">
        <div class="form-group">
          <label for="title">Название сайта:</label>
          <input
            type="text"
            id="title"
            placeholder="site"
            v-model="project.title"
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
            <h3>Пустой сайт</h3>
            <button :id="'empty'" @click="create_project">
              Выбрать
            </button>
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
  z-index: 9999;

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
