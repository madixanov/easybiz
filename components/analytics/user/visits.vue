<template>
    <div class="stats">
        <div class="stats-container">
            <div class="results">
                <div class="result" v-for="(result, index) in data" :key="index">
                    <div class="result-static" style="display: flex; align-items: center;">
                        <span class="result-icon" v-html="icon"></span>
                        <p class="result-agent"> {{ (result as any).name }} </p>
                    </div>
                    <p class="result-percentage"> {{ (result as any).count }} </p>
                </div>
            </div>
        </div>
    </div>
    <div class="dash-block-nodata" v-if="props.data.length === 0">No data available!</div>
</template>

<script setup lang="ts">
import icon from '@/assets/neo.svg?raw';
const props = defineProps({
    data: {
        type: Array<any>,
        default: [],
    }
})

onMounted(async () => {
})
</script>

<style lang="scss" scoped>
.stats {
    width: 100%;

    &-container {
        justify-content: flex-start;
        max-height: unset;
        padding-bottom: 2.4rem;
        border: unset !important;
        & > .results{
            margin-top: 0;
        }
    }
}

.dash-block-nodata {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.2rem;
    line-height: 100%;
    font-weight: 700;
    color: black
}
</style>