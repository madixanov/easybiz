<template>
  <div class="mail">
    <!-- <aside class="mail-sidebar">
      <div class="mail-sidebar-header">
        <h2 class="mail-sidebar-title">Обращение</h2>
      </div>
        <ul class="mail-senders">
          <li class="mail-sender-item" v-for="(message, index) in 12" :key="index" >
            <a href="" class="mail-sender-link">
                <div class="mail-sender-link-box">
                    <div class="mail-sender-text">
                      <p class="mail-sender-message">
                        {{ text.slice(0, 68).trim() }}...
                      </p>
                      <div class="mail-sender-stat active"></div>
                    </div>
                    <span class="mail-sender-email">Geekart@gmail.com</span>
                    <div class="mail-sender-info">
                      <span class="mail-sender-date">14/09/2023</span>
                      <span class="mail-sender-date">15:19</span>
                    </div>
                </div>
            </a>
          </li>
        </ul>
    </aside>
    <section class="mail-chat">
        <h4 class="mail-chat-message">Выберите сообщение которое хотели прочитать</h4>
    </section> -->
  </div>
</template>

<script lang="ts" setup>
import { FailedAlert } from "~/composables/Notification/list";

onMounted(async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      Accept: "application/json",
    },
  };

  await apiDataFetch(`${USER_FETCH_HOST}/messages/all`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        FailedAlert("No messages were found!");
        setTimeout(() => {
          useRouter().push("/");
          location.reload();
        }, 3000);
      } else {
        useRouter().push("/messages/incoming/1");
      }
    });
});
</script>

<style scoped lang="scss"></style>
