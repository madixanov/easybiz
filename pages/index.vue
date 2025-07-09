<template>
  <div class="dash">
    <div class="dash-header">
      <div class="dash-header-menu">
        <span
          class="dash-header-burger"
          @click="showAside()"
          v-html="burger"
        ></span>
        <h2 class="dash-heading">Статистика</h2>
      </div>
      <div class="dash-header-buttons">
        <div class="dash-header-button-dates" ref="dates">
          <button
            class="dash-header-button-date"
            data-filter="day"
            :class="{ active: selectedFilter === 'day' }"
            @click="onTap('day', selectedType)"
          >
            За день
          </button>
          <button
            class="dash-header-button-date"
            data-filter="month"
            :class="{ active: selectedFilter === 'month' }"
            @click="onTap('month', selectedType)"
          >
            За месяц
          </button>
          <button
            class="dash-header-button-date"
            data-filter="year"
            :class="{ active: selectedFilter === 'year' }"
            @click="onTap('year', selectedType)"
          >
            За год
          </button>
          <div class="dash-header-calendar">
            <!-- <UiDatepicker :stat="statistics" /> -->
            <UiDatepicker @dateSelected="onDateSelected" />
          </div>
        </div>
        <div class="dash-header-devices">
          <span
            class="dash-header-device-icon"
            :class="{ active: selectedType === 'DESKTOP' }"
            @click="onTap(selectedFilter, 'DESKTOP')"
            v-html="laptop"
          ></span>
          <span
            class="dash-header-device-icon"
            :class="{ active: selectedType === 'MOBILE' }"
            @click="onTap(selectedFilter, 'MOBILE')"
            v-html="phone"
          ></span>
        </div>
      </div>
    </div>
    <CollectorAnalytics :stats="statistics" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {apiDataFetch} from "@/composables/Exports";
import burger from "@/assets/burger.svg?raw";
import laptop from "@/assets/laptop.svg?raw";
import phone from "@/assets/phone.svg?raw";

const dates = ref();
const selectedFilter = ref("day");
const selectedType = ref("DESKTOP");
const loaded = ref(false);

const statistics = ref({
  views: 0,
  users: 0,
  time: "0:00",
  messages: [],
  browsers: [] as {
    browser: string;
    count: number;
    percentage: string;
    color: string;
  }[],
  devices: [] as any[],
  pages: [] as any[],
});

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const showAside = () => {
  const nav = document.querySelector(".nav") as HTMLElement;
  nav?.classList.add("opened-aside");
};

const onTap = async (date: string, type?: string, customDate?: { day: number; month: number; year: number }) => {
  selectedFilter.value = date;

  if (type) {
    selectedType.value = type;
  }

  let query = '';
  if (date === 'custom' && customDate) {
    query = `?day=${customDate.day}&month=${customDate.month}&year=${customDate.year}&deviceType=${type}`;
  } else {
    query = type ? `?deviceType=${type}` : '';
  }

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`
    }
  };

  try {
    const [browsersRes, devicesRes, usersRes, timeRes, pagesRes] = await Promise.all([
      apiDataFetch(`/statistics/browsers_statistics/${date}${query}`, options).then(res => res.json()),
      apiDataFetch(`/statistics/devices-statistics/${date}${query}`, options).then(res => res.json()),
      apiDataFetch(`/statistics/user-statistics/${date}${query}`, options).then(res => res.json()),
      apiDataFetch(`/statistics/average-time-statistics/${date}${query}`, options).then(res => res.json()),
      apiDataFetch(`/statistics/page-statistics/${date}${query}`, options).then(res => res.json())
    ]);

    statistics.value.pages = pagesRes.sort((a: any, b: any) => b.count - a.count);
    statistics.value.browsers = browsersRes.map((item: any) => ({ ...item, color: getRandomHexColor() }));
    statistics.value.devices = devicesRes.map((item: any) => ({ ...item, color: getRandomHexColor() }));
    statistics.value.users = usersRes.data.total_count;

    const formatTime = (str: string): string => {
      const hours = str.match(/(\d+)h/)?.[1] ?? '0';
      const minutes = str.match(/(\d+)m/)?.[1] ?? '00';
      return `${hours}:${minutes.padStart(2, '0')}`;
    };
    statistics.value.time = formatTime(timeRes.averageSessionTime);
  } catch (error) {
    statistics.value.time = "0:00";
  }
};

const onDateSelected = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  onTap('custom', selectedType.value, { day, month, year });
};

const messages = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  };
  const res = await apiDataFetch("/chats/get-flows", options);
  const data = await res.json();
  statistics.value.messages = data;
};

onMounted(() => {
  messages();
  onTap("year", "DESKTOP");
  loaded.value = true;
});
</script>

<style scoped lang="scss">
.dash,
.dash-blocks {
  width: 100%;
}

.dash {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-menu {
      display: flex;
      align-items: center;
      column-gap: 1.2rem;
    }

    &-burger {
      display: none;

      @media (max-width: 1024px) {
        display: block;
      }
    }

    &-calendar {
      width: 4rem;
      height: 4rem;
    }

    &-button {
      &-dates {
        display: flex;
        align-items: center;

        & > button {
          color: black;
          width: max-content;
          padding: 1rem 2rem;
          border: 0.05rem solid #e5e5e5;
          background: white;

          &:first-of-type {
            border-radius: 0.4rem 0 0 0.4rem;
          }

          &:last-of-type {
            border-radius: 0 0.4rem 0.4rem 0;
          }

          @media (max-width: 768px) {
            font-size: 1.4rem !important;
            padding: 1rem 1.6rem;
          }

          &.active {
            background-color: #f1f9fe;
            color: #0054ff;
          }
        }
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2.4rem;

      @media (max-width: 480px) {
        display: none;
      }
    }

    &-devices {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 768px) {
        display: none;
      }

      & > span {
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.05rem solid #e5e5e5;
        border-radius: 0.4rem;
        background: white;
        cursor: pointer;

        &.active {
          background: #f1f9fe;

          & * {
            fill: #0054ff;
          }
        }

        &:last-of-type {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        &:first-of-type {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  }

  &-blocks {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
  }

  &-block {
    width: 100%;
    max-width: calc((100% / 4) - 1.2rem);
  }

  &-heading {
    font-size: 3.2rem;
    line-height: 3.6rem;
    font-weight: 500;
    width: 100%;

    @media (max-width: 768px) {
      font-size: 2.6rem;
    }
  }
}
</style>
