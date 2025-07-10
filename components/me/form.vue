<template>
  <div class="profile-form">
    <label for="first-name" class="profile-label">
      <p class="profile-label-title">{{ $t('profile.name')}}</p>
      <input
        id="first-name"
        type="text"
        class="profile-label-input"
        :value="props.username"
        @input="e => emit('update:username', (e.target as HTMLInputElement).value)"
      />
    </label>

    <label for="second-name" class="profile-label">
      <p class="profile-label-title">{{ $t('profile.lastname')}}</p>
      <input
        id="second-name"
        type="text"
        class="profile-label-input"
        disabled
        :placeholder="$t('profile.unavailable')"
      />
    </label>

    <div class="profile-label">
      <p class="profile-label-title">{{ $t('profile.lan')}}</p>
      <div class="profile-label-options" @click="toggleDropdown">
        <div class="profile-label-selected">
          <img :src="selected.flag" />
          <span>{{ selected.label }}</span>
        </div>
        <ul v-if="dropdownVisible" class="profile-label-dropdown">
          <li
            v-for="lang in languages"
            :key="lang.code"
            @click.stop="selectLanguage(lang)"
            class="profile-label-item"
          >
            <img :src="lang.flag" alt="flag" />
            <span>{{ lang.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { locale, setLocale } = useI18n()

interface LanguageOption {
  code:  'en' | 'ru' | 'de';
  label: string;
  flag: string;
}

const props = defineProps<{
  username: string;
}>();

const emit = defineEmits<{
  (e: 'update:username', value: string): void;
}>();


const languages: LanguageOption[] = [
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
];

const selected = ref<LanguageOption>(languages[0]);
const dropdownVisible = ref(false);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectLanguage = (lang: LanguageOption) => {
  selected.value = lang;
  setLocale(lang.code);
  dropdownVisible.value = false;
};

onMounted(() => {
  const current = languages.find(l => l.code === locale.value)
  if (current) selected.value = current
})
</script>


<style lang="scss" scoped>
.profile {
  &-label {
    &-options {
      background: #808b961a;
      border-radius: 0.4rem;
      padding: 1rem 1.5rem;
      cursor: pointer;
      position: relative;
    }

    &-selected {
      display: flex;
      align-items: center;
      gap: 1rem;

      & > img {
        width: 2.1rem;
        height: 1.5rem;
        border-radius: 0.4rem;
        object-fit: cover;
      }

      & > span {
        font-size: 1.4rem;
        font-weight: 500;
        color: #3c3d51;
        line-height: 100%;
      }
    }

    &-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      margin-top: 0.4rem;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    &-item{
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;

      &:hover{
        background: #f0f0f0;
      }

      & > img{
        width: 2.6rem;
        height: 1.8rem;
        border-radius: .4rem;
      }

      & > span{
        font-size: 1.4rem;
        font-weight: 500;
        color: #3c3d51;
        line-height: 100%;
      }
    }
  }
}
</style>
