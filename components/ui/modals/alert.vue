<template>
    <div class="alert" @click.self="$emit('close')">
        <div class="alert-wrapper">
            <span v-html="alert"></span>
            <h2 class="alert-title">Удаление {{ name }}</h2>
            <p class="alert-message">Вы точно хотите удалить {{name}} {{ item }}?</p>
            <button class="alert-delete" @click="$emit('delete')">Удалить</button>
            <button class="alert-close" @click="$emit('close')">Отменить</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import alert from '@/assets/alert.svg?raw';
const emit = defineEmits(['close', 'delete']);
const props = defineProps<{
    item: string;
    name: string;
}>();
</script>

<style lang="scss" scoped>
.alert{
    transition: 300ms ease;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background: #0000004D;
    backdrop-filter: blur(5px); 
    overflow: hidden;
    z-index: 1001;

    &-wrapper{
        max-width: 36rem;
        width: 100%;
        padding: 4rem 3rem;
        border-radius: .8rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &-title{
        font-size: 2.4rem;
        font-weight: 700;
        line-height: 150%;
        color: #110D0D !important;
        margin-top: 1rem;
        margin-bottom: .8rem;
    }

    &-message{
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 180%;
        color: #223263 !important;
        margin-bottom: 3rem;
    }

    &-delete{
        width: 100%;
        padding: 1.2rem 0;
        border-radius: .4rem;
        background: #229C39;
        box-shadow: 0 0 1.5rem .1rem #229C393D;
        color: #fff;
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 150%;
        border: none;
        cursor: pointer;
        margin-bottom: 1.2rem;
    }
    
    &-close{
        width: 100%;
        padding: 1.2rem 0;
        border-radius: .4rem;
        background: #fff;
        box-shadow: 0 0 1.5rem .1rem #229C393D;
        color: #9098B1;
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 150%;
        border: none;
        cursor: pointer;
        margin-bottom: 1.2rem;
    }
}
</style>