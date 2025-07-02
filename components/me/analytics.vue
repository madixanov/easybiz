<template>
  <div class="profile-label mb-4 full">
    <h4 class="profile-label-title">{{ title }}</h4>
    <div class="profile-label-toggle">
      <div class="profile-label-checkbox">
        <p
          class="profile-label-script"
          :class="{ active: isChecked }"
          @click="toggleScript"
        >
          {{ text }}
        </p>
        <label class="switch">
          <input
            type="checkbox"
            v-model="isChecked"
            @change="$emit('update:modelValue', isChecked)"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <textarea name="sctipt" placeholder="Напишите скрипт" class="profile-label-sctipts" :class="{ opened: isScriptOpened }"></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
const text = '<script type="text/javascript" >';
const isScriptOpened = ref(false);
const toggleScript = () => {
  isScriptOpened.value = !isScriptOpened.value;
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal: any) => {
    isChecked.value = newVal;
  }
);
</script>

<style lang="scss" scoped>
.profile {
  &-label {
    &-script {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 100%;
      color: #3c3d5133 !important;
      user-select: none;
      cursor: pointer;

      &.active {
        color: #3c3d5180 !important;
      }
    }

    &-checkbox{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-sctipts {
      font-size: 1.3rem !important;
      font-weight: 500;
      line-height: 100%;
      color: #000;
      background: rgba(128, 139, 150, 0.1019607843);
      border-radius: 0 0 0.4rem 0.4rem;
      resize: none;
      outline: none;

      width: 100%;
      height: 0;
      padding: 0;
      
      &.opened {
        height: 8rem;
        margin-top: 1rem;
        padding: 1.35rem;
      }

      &::placeholder {
        font-size: 1.3rem;
        font-weight: 500;
        line-height: 100%;
      }
    }

    &-toggle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding-left: 1rem;
      background: #808b961a;
      border-radius: 0.4rem;
      padding: 1.35rem;
      margin-bottom: 1rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    & .switch {
      position: relative;
      display: inline-block;
      width: 3.2rem;
      height: 1.8rem;

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 300ms;
        border-radius: 2.4rem;

        &:before {
          position: absolute;
          content: "";
          height: 1.3rem;
          width: 1.3rem;
          left: 0.3rem;
          bottom: 50%;
          background-color: white;
          transform: translateY(50%);
          transition: 300ms;
          border-radius: 50%;
        }
      }

      input:checked + .slider {
        background-color: #2196f3;

        &:before {
          transform: translateX(1.3rem) translateY(50%);
        }
      }
    }
  }
}
</style>
