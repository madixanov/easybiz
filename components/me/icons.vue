<template>
  <div class="profile-icons-wrapper">
    <div class="profile-icons">
      <div class="profile-icons-box" >
        <img v-if="urlInst" :src="urlInst" alt="Preview" />
        <div v-else class="profile-icons-icon">
          <span v-html="smreaload"></span>
        </div>
      </div>
      <!-- <div class="profile-icons-box" >
        <img v-if="url" src="" alt="Preview" />
        <div v-else class="profile-icons-icon">
          <span v-html="smreaload"></span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const urlInst = ref(null)
import smreaload from "@/assets/icons/reload-small.svg?raw";
const props = defineProps<{
  telegram: string;
  instagram: string;
}>()
onMounted(()=>{
  urlInst.value = `https://www.instagram.com/${props.instagram}`
})
</script>

<style lang="scss" scoped>
.profile{
    &-icons {
    display: flex;
    gap: 1rem;

    &-wrapper {
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      border-radius: 0.4rem;
      box-shadow: 0 0 1rem 0.1rem #878c9d14;
    }

    &-box {
      width: 5rem;
      height: 5rem;
      border-radius: 0.4rem;
      background: #aaa;
      overflow: hidden;
      position: relative;
      cursor: pointer;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-icon {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 0.3rem;
      height: 100%;
    }
  }
}
</style>