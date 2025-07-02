<template>
  <div class="profile-nav" v-if="route.path.includes('edit')">
    <div class="profile-nav-section">
      <span class="nav-burger" @click="showAside()" v-html="burger"></span>
      <div
        class="profile-nav-section-title"
        :class="route.path.includes('profile') ? 'active' : ''"
      >
        <img src="/assets/icons/navigation/user.svg" alt="" />
        <h3>Профиль</h3>
      </div>
      <ul class="profile-nav-list">
        <a
          class="profile-nav-link"
          href="#profilemain"
          :class="{ active: activeId === 'profilemain' }"
          >Основные</a
        >
        <a
          class="profile-nav-link"
          href="#profilesecurity"
          :class="{ active: activeId === 'profilesecurity' }"
          >Безопасность</a
        >
      </ul>
    </div>
    <div class="profile-nav-section">
      <div
        class="profile-nav-section-title"
        :class="route.fullPath.includes('integrations') ? 'active' : ''"
      >
        <img src="/assets/icons/navigation/integration.svg" alt="" />
        <h3>Интеграции</h3>
      </div>
      <ul class="profile-nav-list">
        <a
          class="profile-nav-link"
          href="#integrationssocials"
          :class="{ active: activeId === 'integrationssocials' }"
          >Социальные сети</a
        >
        <a
          class="profile-nav-link"
          href="#integrationsanalytics"
          :class="{ active: activeId === 'integrationsanalytics' }"
          >Аналитика</a
        >
        <a
          class="profile-nav-link"
          href="#integrationspayments"
          :class="{ active: activeId === 'integrationspayments' }"
          >Платежи</a
        >
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import burger from  '@/assets/burger.svg?raw';
import ScrollSections from '@/composables/navigation/ScrollSections'
const showAside = ()=>{
    const nav = document.querySelector('.nav') as HTMLElement
    nav?.classList.add('opened-aside');
}
const route = useRoute()
const activeId = ref('')

ScrollSections(activeId)
</script>

<style lang="scss" scoped></style>
