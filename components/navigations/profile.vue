<template>
  <div class="profile-nav" v-if="route.path.includes('edit')">
    <div class="profile-nav-section">
      <span class="nav-burger" @click="showAside()" v-html="burger"></span>
      <div
        class="profile-nav-section-title"
        :class="{ active: activeGroup === 'profile' }"
      >
        <img src="/assets/icons/navigation/user.svg" alt="" />
        <h3>{{ $t('nav.sub.profile.title') }}</h3>
      </div>
      <ul class="profile-nav-list">
        <a
          class="profile-nav-link"
          href="#profilemain"
          :class="{ active: activeId === 'profilemain'}"
        >{{ $t('nav.sub.profile.main') }}</a>
        <a
          class="profile-nav-link"
          href="#profilesecurity"
          :class="{ active: activeId === 'profilesecurity'}"
        >{{ $t('nav.sub.profile.security') }}</a>
      </ul>
    </div>
    <div class="profile-nav-section">
      <div
        class="profile-nav-section-title"
        :class="{ active: activeGroup === 'integrations' }"
      >
        <img src="/assets/icons/navigation/integration.svg" alt="" />
        <h3>{{ $t('nav.sub.integrations.title') }}</h3>
      </div>
      <ul class="profile-nav-list">
        <a
          class="profile-nav-link"
          href="#integrationssocials"
          :class="{ active: activeId === 'integrationssocials' }"
        >{{ $t('nav.sub.integrations.socials') }}</a>
        <a
          class="profile-nav-link"
          href="#integrationsanalytics"
          :class="{ active: activeId === 'integrationsanalytics' }"
        >{{ $t('nav.sub.integrations.analytics') }}</a>
        <a
          class="profile-nav-link"
          href="#integrationspayments"
          :class="{ active: activeId === 'integrationspayments' }"
        >{{ $t('nav.sub.integrations.payments') }}</a>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

const { t } = useI18n()
import burger from  '@/assets/burger.svg?raw';
import ScrollSections from '@/composables/navigation/ScrollSections'
const showAside = ()=>{
    const nav = document.querySelector('.nav') as HTMLElement
    nav?.classList.add('opened-aside');
}
const route = useRoute()
const activeId = ref('')
const activeGroup = ref('')

ScrollSections(activeId, activeGroup)
</script>

<style lang="scss" scoped></style>
