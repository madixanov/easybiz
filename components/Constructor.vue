<template>
  <div id="gjs">
    <UiLoader :height="'100%'" :has-background="false" />
  </div>
</template>

<script setup lang="ts">
const loaded = ref(true);

onMounted(() => {
  setTimeout(() => {
    loaded.value = false;
  }, 2000);
});
</script>
<style scoped lang="scss"></style>
