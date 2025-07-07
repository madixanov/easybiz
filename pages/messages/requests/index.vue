<template>
  <div class="requests">
    <h2 class="requests-title">Обращение</h2>
    <div class="requests-wrapper">
      <table class="requests-table" :style="{
        opacity: loaded ? 1 : 0,
        height: loaded ? 'auto' : '20rem',
        transition: 'all 300ms ease',
        transitionDelay: '100ms'
      }">
        <thead>
          <tr>
            <th>№</th>
            <th>Автор</th>
            <th>Сообщение</th>
            <th>Статус</th>
            <th class="options-th">Опции</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, i) in requests" :key="i" class="requests-table-col"
            :class="{ archived: el.status.toLowerCase() == 'archived' }">
            <td class="requests-table-td requests-table-id">
              <nuxt-link :to="`/messages/requests/${el.id}`" class="requests-table-link">{{ i + 1 }}</nuxt-link>
            </td>
            <td class="requests-table-td requests-table-name">
              <nuxt-link :to="`/messages/requests/${el.id}`" class="requests-table-link">{{ el.client.username
                }}</nuxt-link>
            </td>
            <td class="requests-table-td">
              <nuxt-link :to="`/messages/requests/${el.id}`" class="requests-table-link">{{
                el.messages[el.messages.length - 1].content.slice(0, 40) }}..</nuxt-link>
            </td>
            <td class="requests-table-td status" :class="{ active: el.status.toLowerCase() == 'active' }">
              <p class="requests-table-link" v-if="el.status.toLowerCase() == 'archived'">{{ el.status }}</p>
              <nuxt-link :to="`/messages/requests/${el.id}`" class="requests-table-link" v-else>{{ el.status
                }}</nuxt-link>
            </td>
            <td class="requests-table-options">
              <div class="requests-table-options-wrapper">
                <span class="requests-table-icon" v-html="edit" @click="() => console.log('edit')"></span>
                <div class="requests-table-devider"></div>
                <span class="requests-table-icon" v-html="trash" @click="el.status !== 'ARCHIVED' ? showAlert(i) : 0"
                  :style="{ cursor: el.status !== 'ARCHIVED' ? 'pointer' : 'not-allowed' }"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
      <div class="requests-nodata" :style="{display: loaded && requests.length === 0 ? 'flex' : 'none'}">Пока обращений нет</div>
    </div>

    <transition name="fade">
      <Alert @close="showAlert" @delete="archiveChat" v-if="alert" :item="'№' + id" :name="'обращение'" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { apiDataFetch } from "~/composables/Exports";
import type { ChatItem } from "~/interface/mail/Message";
import Alert from "~/components/ui/modals/alert.vue";
import edit from "@/assets/edit.svg?raw";
import trash from "@/assets/trash.svg?raw";
import { PushNotification } from "~/composables/Notification/list";
const loaded = ref(false);
const alert = ref(false);
const id = ref(0);
const showAlert = (i: number) => {
  alert.value = !alert.value;
  id.value = i + 1;
};

const requests = ref<Array<ChatItem>>([])

const getRequests = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };

  try {
    const res = await apiDataFetch("/users/get-flows", options);
    if (!res.ok) {
      console.log("Error: " + res.status);
      return;
    }

    const req = await res.json();
    const sortedReq = req.sort((a, b) => {
      if (a.status === 'ARCHIVED' && b.status !== 'ARCHIVED') {
        return 1;
      }
      if (a.status !== 'ARCHIVED' && b.status === 'ARCHIVED') {
        return -1;
      }
      return 0;
    });

    sortedReq.forEach((el: any) => requests.value.push(el))
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const archiveChat = async () => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    }
  };

  try {
    const res = await apiDataFetch(`/users/chat-session-archive/${requests.value[id.value - 1].id}`, options);
    if (!res.ok) {
      console.log("Error: " + res.status);
      return;
    }
    PushNotification("Обращение успешно архивировано!");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  getRequests();
  setTimeout(() => {
    loaded.value = true;
  }, 3000);
});
</script>

<style scoped lang="scss">
.requests {
  &-nodata {
    width: 100%;
    margin: 0 auto;
    height: 12rem;
    background: rgba(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4rem;
    line-height: 100%;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }

  &-title {
    font-size: 4rem;
    font-weight: 500;
    line-height: 100%;
    color: #110d0d !important;

    @media (max-width: 480px) {
      font-size: 3rem;
    }
  }

  &-wrapper {
    margin-top: 2.6rem;
    border: 0.1rem solid #e0e2e7;
    border-radius: 1.2rem;
    overflow: hidden;
    position: relative;
    @media (max-width: 650px) {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  &-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    background-color: #fff;

    @media (max-width: 650px) {
      min-width: 65rem;
    }

    &-col {
      border-bottom: 0.1rem solid #e0e2e7;

      &:last-of-type {
        border-bottom: none;
      }

      &:hover {
        background: rgba(34, 156, 56, 0.05)
      }

      &.archived {
        opacity: 0.4;

        // & td,a,span{
        //     cursor: not-allowed;
        // }
      }
    }

    & th,
    & td {
      text-align: left;
    }

    & th {
      padding: 0.8rem 1.6rem;
      font-size: 1.4rem;
      font-weight: bold;
      color: #6f727a;
      background-color: #f7f7f9;
      border-bottom: 0.1rem solid #e0e2e7;
    }

    & .options-th {
      text-align: center;
      padding: 0.8rem 0.2rem;
    }

    &-td {
      font-size: 1.6rem;
      color: #232325;
      line-height: 130%;
      border-left: 0.1rem solid #e0e2e7;
      cursor: pointer;

      &:first-of-type {
        border-left: none;
      }
    }

    &-id {
      font-size: 1.4rem !important;
      font-weight: 400 !important;
      color: #6f727a !important;
    }

    &-name {
      font-weight: 700;
    }

    &-link {
      display: inline-block;
      width: 100%;
      font-size: inherit;
      font-weight: inherit;
      padding: 1.5rem 1.6rem;
      color: inherit;
      text-decoration: none;
    }

    &-options {
      border-left: none;
      cursor: default;

      &-wrapper {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        padding: 0 1.6rem;
      }
    }

    &-devider {
      width: 0.2rem;
      height: 1.5rem;
      background: #e0e2e7;
    }

    &-icon {
      width: 1.5rem;
      height: 1.5rem;
      display: inline-block;
      cursor: pointer;

      &:first-of-type {
        border-right: 0.1rem solid #e0e2e7;
      }
    }

    & .status {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 140%;
      color: #6f727a;

      &.active {

        &>a,
        p {
          color: #249f5d !important;
        }
      }
    }
  }
}
</style>