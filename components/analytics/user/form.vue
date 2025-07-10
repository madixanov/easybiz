<template>
    <div class="stats" v-if="loaded">
        <div class="stats-container">
            <header class="stats-header">
                <h4 class="stats-heading">{{ $t('dash.submission')}}</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="stats-detail">
                <h1 class="stats-calculator"> {{ messages.length && messages.length !== 0 ? messages.length : 0 }}
                </h1>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
const counter = ref(0)
const loaded = ref(false)
const { t } = useI18n()
interface Messages {
  id: string;
  admin?: Array<any>;
  adminId: string;
  client?: Array<any>;
  clientId: string;
  createdAt: string; 
  updatedAt: string;
  status: "ARCHIVED" | "ACTIVE" | "OPEN" ;
  usersId: string | null;
}

const props = defineProps({
    messages: {
        type: Array<Messages>,
        default: []
    }
})

onMounted(() => {
    loaded.value = true;
})
</script>

<style scoped lang="scss"></style>