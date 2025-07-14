<template>
  <div class="modal-window-container">
    <header class="modal-window-header">
      <p class="modal-window-header-title">Настройки сайта</p>
    </header>
    <div class="modal-window-content">
      <div class="modal-window-labels">
        <label for="web-logo" class="modal-window-label" role="logo">
          <p class="modal-window-label-title">Логотип</p>
          <input
            v-if="!website.banner"
            id="web-logo"
            type="file"
            placeholder="Logo of the website"
          />
          <output v-else-if="website?.banner">
            <img :src="website?.banner" class="modal-window-logo" alt="" />
          </output>
        </label>
        <label for="web-name" class="modal-window-label">
          <p class="modal-window-label-title">Название</p>
          <input
            id="web-name"
            type="text"
            v-model="website.title"
            placeholder="Title of the website"
          />
        </label>
      </div>
      <div class="modal-window-labels">
        <label for="web-name" class="modal-window-label">
          <p class="modal-window-label-title">Описание</p>
          <textarea
            type="text"
            v-model="website.description"
            placeholder="Title of the website"
          ></textarea>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface WebsiteInterface {
  banner: string | null;
  title: string | null;
  description: string | null;
}

const props = defineProps({
  website: {
    required: true,
    type: Object as PropType<WebsiteInterface>,
    default: {
      logo: "",
      title: "",
      description: "",
    },
  },
});
</script>

<style scoped lang="scss">
.modal {
  &-window {
    &-container {
      border: 0.1rem solid #dadee6;
      border-radius: 0.8rem;
    }
    &-logo {
      width: 10rem;
      height: 10rem;
      border: 0.1rem solid black;
      object-fit: contain;
      background: black;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;

      &-title {
        font-size: 1.4rem;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    &-content {
      padding: 1.5rem;
      padding-top: 0;
      width: 100%;
    }

    &-labels {
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 0.6rem;

      & > label {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        text-align: start;
        row-gap: 0.6rem;

        &[role="logo"] {
          border-bottom: 0.1rem solid #eee;
          padding-bottom: 0.6rem;

          & input {
            padding: 0;
            border: unset;
            border-radius: unset;
            font-size: 1.2rem;
          }
        }

        & input {
          margin-bottom: 0.6rem;
          border: 0.1rem solid #eee;
          border-radius: 0.6rem;
          width: 100%;
          padding: 0.6rem 1rem;
          font-size: 1.2rem;
        }

        & textarea {
          width: 100%;
          font-size: 1.2rem;
          border: 0.1rem solid #eee;
          border-radius: 0.6rem;
          padding: 0.6rem 1rem;
        }
      }
    }

    &-label {
      &-title {
        font-size: 1.4rem;
      }
    }

    &-save {
      width: 100%;
      height: 100%;
      padding: 1rem 1.5rem;
      background: #000;
      color: white;
      border-radius: 0.6rem;
      text-align: center;
      margin-top: 1.2rem;
    }
  }
}
</style>
