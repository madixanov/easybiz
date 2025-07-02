<script setup lang="ts">
import { DatePicker } from 'v-calendar';
 
import 'v-calendar/dist/style.css';
import calendar from '@/assets/calendar.svg?raw';

const emit = defineEmits(['dateSelected']);
const selectedDate = ref(new Date());

const onDateChange = (date: Date) => {
  emit('dateSelected', date);
};
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-heroicons-calendar-days-20-solid" v-html="calendar" />

      <template #panel="{ close }">
          <div class="flex items-center">
              <DatePicker
                  ref="days"
                  v-model="selectedDate" 
                  @update:modelValue="onDateChange"
                  :max-date="new Date()" 
                  @close="close" 
              />
          </div>
      </template>
  </UPopover>
</template>

<style scoped>
.dark\:text-gray-900:is(.dark *) {
    background: white !important;
    width: 100% !important;
    height: 4rem !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid #E5E5E5
}
</style>