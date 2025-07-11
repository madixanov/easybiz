<template>
  <div class="filter" @click.self="emits('close')">
    <div class="filter-container">
      <div class="filter-container-range">
        <div class="range-values">
          <span>от {{ minPrice }}$</span>
          <span>до {{ maxPrice }}$</span>
        </div>

        <div class="slider-container">
          <div class="slider-track"></div>
          <div
            class="slider-range"
            :style="{
              left: getLeft(),
              width: getWidth(),
            }"
          ></div>

          <input
            type="range"
            :min="min"
            :max="max - gap"
            v-model.number="minPrice"
            @input="handleMinInput"
            step="1"
          />

          <input
            type="range"
            :min="min + gap"
            :max="max"
            v-model.number="maxPrice"
            @input="handleMaxInput"
            step="1"
          />
        </div>
      </div>

      <button class="filter-submit" @click="applyFilter">Применить</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["close", "submit"]);

const min = 10;
const max = 1000;
const gap = 10;

const props = defineProps({
  minPrice: {
    type: Number,
    default: min,
  },
  maxPrice: {
    type: Number,
    default: max,
  },
});

const applyFilter = () => {
  emits("submit", {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  });
};

const minPrice = ref(props.minPrice);
const maxPrice = ref(props.maxPrice);

const handleMinInput = () => {
  if (minPrice.value > maxPrice.value - gap) {
    minPrice.value = Math.min(maxPrice.value - gap, max - gap);
  }
  minPrice.value = Math.max(min, Math.min(minPrice.value, max - gap));
};

const handleMaxInput = () => {
  if (maxPrice.value < minPrice.value + gap) {
    maxPrice.value = Math.max(minPrice.value + gap, min + gap);
  }
  maxPrice.value = Math.min(max, Math.max(maxPrice.value, min + gap));
};

const getLeft = () => {
  const percent = ((minPrice.value - min) / (max - min)) * 100;
  return `${Math.min(Math.max(percent, 0), 100).toFixed(2)}%`;
};

const getWidth = () => {
  const percent = ((maxPrice.value - minPrice.value) / (max - min)) * 100;
  return `${Math.min(Math.max(percent, 0), 100).toFixed(2)}%`;
};
</script>

<style lang="scss" scoped>
.range-values {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.slider-container {
  position: relative;
  height: 4rem;

  .slider-track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 6px;
    background: #c8e6c9;
    border-radius: 3px;
    transform: translateY(-50%);
  }

  .slider-range {
    position: absolute;
    top: 50%;
    height: 0.6rem;
    background: #229c39;
    border-radius: 0.3rem;
    transform: translateY(-50%);
    z-index: 1;
  }

  input[type="range"] {
    -webkit-appearance: none;
    position: absolute;
    width: 100%;
    height: 4rem;
    background: none;
    pointer-events: none;
    z-index: 2;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      pointer-events: all;
      width: 1.6rem;
      height: 1.6rem;
      background: #229c39;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      position: relative;
      z-index: 3;
    }

    &::-moz-range-thumb {
      pointer-events: all;
      width: 1.6rem;
      height: 1.6rem;
      background: #229c39;
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }
  }
}

.filter {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  padding: 4rem;
  transition: opacity 300ms, visibility 300ms;
  opacity: 0;
  visibility: hidden;
  z-index: 0;

  &-container {
    width: 100%;
    height: max-content;
    max-width: 40rem;
    overflow-y: auto;
    padding: 2rem 2.5rem;
    border-radius: 1rem;
    background: #fff;
    transition: transform 300ms;
    transition-delay: 300ms;
    transform: scale(0);

    display: flex;
    flex-direction: column;
    align-items: center;

    &-range {
      width: 100%;
    }
  }

  &-submit {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #229c38e0;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #229c39;
    }
  }

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 2000;

    & .filter-container {
      transform: scale(1);
    }
  }
}
</style>
