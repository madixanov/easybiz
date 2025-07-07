<template>
  <UiLoader :height="'100%'" v-if="!loader" />
  <div class="wrapper">
    <div class="nav-wrapper">
      <div class="nav">
        <span @click="closeAside()" class="nav-closer" v-html="closer"></span>
        <div class="nav-logo">
          <nuxt-link to="/"> .tech </nuxt-link>
        </div>
        <ul class="nav-list">
          <nuxt-link :to="`/`">
            <span>
              <img src="/assets/icons/navigation/stats.svg" alt="" />
            </span>
            <p class="nav-item-name">Дашбоард</p>
          </nuxt-link>
          <nuxt-link
            class="mail-links"
            :to="`/messages/`"
            :class="
              $router.currentRoute.value.path.includes('messages')
                ? 'active'
                : ''
            "
          >
            <div class="origin mail">
              <div class="origin-star">
                <span>
                  <img src="/assets/icons/navigation/messages.svg" alt="" />
                </span>
                <p class="nav-item-name">
                  <span>Уведомления</span>
                </p>
              </div>
              <div class="mail-counter">
                <img class="mail-tick" src="../assets/tick.svg" alt="" />
<<<<<<< HEAD
                <span  v-if="unread.length > 0">{{ unread.length }}</span>
=======
                <span v-if="unread.length > 0">{{ unread.length }}</span>
>>>>>>> master
              </div>
            </div>
            <span>
              <ul class="sub-menu">
                <li
                  class="sub-menu-item"
                  :class="
                    $router.currentRoute.value.path.includes('requests')
                      ? 'active'
                      : ''
                  "
                >
                  <nuxt-link :to="`/messages/requests`">Обращение</nuxt-link>
                </li>
                <li
                  class="sub-menu-item"
                  :class="
                    $router.currentRoute.value.path.includes('incoming')
                      ? 'active'
                      : ''
                  "
                >
                  <nuxt-link :to="`/messages/incoming`">Почта</nuxt-link>
                </li>
                <li
                  class="sub-menu-item"
                  :class="
                    $router.currentRoute.value.path.includes('settings')
                      ? 'active'
                      : ''
                  "
                >
                  <nuxt-link :to="`/messages/settings`">Настройки</nuxt-link>
                </li>
              </ul>
            </span>
          </nuxt-link>
          <nuxt-link :to="`/projects`">
            <span>
              <img src="/assets/icons/navigation/pages.svg" alt="" />
            </span>
            <p class="nav-item-name">Страницы</p>
          </nuxt-link>
          <nuxt-link
            :to="`/me/edit`"
            :class="
              $router.currentRoute.value.path.includes('/me/edit')
                ? 'active'
                : ''
            "
          >
            <span>
              <img src="/assets/icons/navigation/user.svg" alt="" />
            </span>
            <p class="nav-item-name">Профиль</p>
          </nuxt-link>
          <button data-type="logout" @click="logout">
            <span>
              <img src="/assets/icons/navigation/logout.svg" alt="" />
            </span>
            <p class="nav-item-name">Выйти</p>
          </button>
          <!-- Test -->
        </ul>
      </div>
    </div>

    <ProfileNav />

    <div class="wrapper-box">
<<<<<<< HEAD
      <div
        class="chat-nav"
        v-if="$router.currentRoute.value.path.includes('messages')"
      >
        <ul class="chat-nav-list">
          <span class="nav-burger" @click="showAside()" v-html="burger"></span>
          <nuxt-link
            :to="`/messages/requests`"
            class="chat-nav-link"
            :class="
              $router.currentRoute.value.path.includes('requests')
                ? 'active'
                : ''
            "
            ><span v-html="chats"></span
          ></nuxt-link>
          <nuxt-link
            :to="`/messages/incoming`"
            class="chat-nav-link"
            :class="
              $router.currentRoute.value.path.includes('incoming')
                ? 'active'
                : ''
            "
            ><span v-html="email"></span
          ></nuxt-link>
          <nuxt-link
            :to="`/messages/saved`"
            class="chat-nav-link"
            :class="
              $router.currentRoute.value.path.includes('saved') ? 'active' : ''
            "
            ><span v-html="star"></span
          ></nuxt-link>
          <nuxt-link
            :to="`/messages/faq`"
            class="chat-nav-link"
            :class="
              $router.currentRoute.value.path.includes('faq') ? 'active' : ''
            "
            ><span v-html="faq"></span
          ></nuxt-link>
        </ul>
      </div>
=======
      <div class="chat-wrapper">
        <div
          class="chat-nav"
          :style="{
            display: $router.currentRoute.value.path.includes('messages')
              ? 'block'
              : 'none',
          }"
        >
          <ul class="chat-nav-list">
            <span
              class="nav-burger"
              @click="showAside()"
              v-html="burger"
            ></span>
            <nuxt-link
              :to="`/messages/requests`"
              class="chat-nav-link"
              :class="
                $router.currentRoute.value.path.includes('requests')
                  ? 'active'
                  : ''
              "
              ><span v-html="chats"></span
            ></nuxt-link>
            <nuxt-link
              :to="`/messages/incoming`"
              class="chat-nav-link"
              :class="
                $router.currentRoute.value.path.includes('incoming')
                  ? 'active'
                  : ''
              "
              ><span v-html="email"></span
            ></nuxt-link>
            <nuxt-link
              :to="`/messages/saved`"
              class="chat-nav-link"
              :class="
                $router.currentRoute.value.path.includes('saved')
                  ? 'active'
                  : ''
              "
              ><span v-html="star"></span
            ></nuxt-link>
            <nuxt-link
              :to="`/messages/faq`"
              class="chat-nav-link"
              :class="
                $router.currentRoute.value.path.includes('faq') ? 'active' : ''
              "
              ><span v-html="faq"></span
            ></nuxt-link>
          </ul>
        </div>
      </div>

>>>>>>> master
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
  <SocketChannel />
</template>

<script lang="ts" setup>
// import Loader from '~/components/ui/loader.vue';
import burger from "@/assets/burger.svg?raw";
import chats from "@/assets/icons/chat/requests.svg?raw";
import email from "@/assets/icons/chat/email.svg?raw";
import star from "@/assets/icons/chat/star.svg?raw";
import faq from "@/assets/icons/chat/faq.svg?raw";
import closer from "@/assets/x-close.svg?raw";
import ProfileNav from "~/components/navigations/profile.vue";
import { PushNotification } from "~/composables/Notification/list";
import { apiDataFetch } from "~/composables/Exports";
// import { socket } from "~/composables/socket";
// import SocketChannel from '~/components/notifications/socket.channel.vue';

const $router = useRouter();

const count = ref(0);
const unread = ref([]);

const closeAside = () => {
  const nav = document.querySelector(".nav") as HTMLElement;
  nav?.classList.remove("opened-aside");
};
const showAside = () => {
  const nav = document.querySelector(".nav") as HTMLElement;
  nav?.classList.add("opened-aside");
};

const messages = async () => {
  unread.value = [];

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      "Content-Type": "application/json",
    },
  };
  await apiDataFetch("/users/get-flows", options)
    .then((response) => response.json())
    .then((data) =>
      data.forEach((item: any) => {
        if (item.status === "OPEN") {
          unread.value.push(item as never);
        }
      })
    );
};

const loader = ref(true);

const logout = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  await apiDataFetch("/users/logout", options).then((res) => {
    if (res.ok) {
      localStorage.removeItem("Authorization");
      PushNotification("Вы успешно вышли из системы");
    }
  });
};

// socket.on("chat message", async () => {
//     count.value = 0;
//     await messages();
// });

onMounted(async () => {
  const $router = useRouter();
  await messages();

  // $router.afterEach(async (to, from) => {
  //     await messages();
  // })
  const nav = document.querySelector(".nav") as HTMLElement;
  nav?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("a") || target.closest(".nuxt-link")) {
      closeAside();
    }
  });
  // useRouter().afterEach(() => {
  //     loader.value = false
  //     setTimeout(() => {
  //         loader.value = true
  //     }, 400)
  // })
  // const url = '../assets/ringtone.mp3';
  // const audio = document.createElement("audio");
  // audio.src = url;
  // audio.volume = 0.5;
  // audio.play();
  // document.body.appendChild(audio);
});
<<<<<<< HEAD

onMounted(() => {});
=======
>>>>>>> master
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: flex-start;

  &-box {
    max-width: 100%;
    width: 100%;
    display: flex;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.origin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &-star {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  & > img {
    transform: rotate(-90deg);
    transition: 300ms;
  }
}

.content {
  max-width: 100%;
  width: 100%;
  padding: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }
}

.mail-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;

  & span {
    font-size: 1.2rem;
    line-height: 1.6rem;
    font-weight: 500;
    color: white !important;
    background: #18d26b;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.2rem;
  }
}
</style>
