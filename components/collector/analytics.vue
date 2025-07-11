<template>
    <div class="dash-blocks">
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersViewStats :views="stats.views" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
            }" />
        </div>
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersCalculate :count="stats.users" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersTImerStats :time="stats.time" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersFormCount :messages="stats.messages" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
    </div>
    <div class="dash-blocks">
        <div class="dash-block screen50">
            <div class="dash-block-nest">
                <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" :style="{position: 'relative', height: '15rem'}" />
                <UsersBrowsersCounter v-if="loaded" :agents="stats.browsers" />
            </div>
            <div class="dash-block-nest">
                <h4 class="dash-block-nest-title">{{ $t('dash.devices')}}</h4>
                <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" :style="{position: 'relative', height: '15rem'}" />
                <Doughnut :data="stats.devices" v-if="loaded" />
            </div>
        </div>
        <div class="dash-block screen50">
            <!-- <div class="dash-block-nest">
                <UsersRouteActivity v-if="loaded" />
            </div> -->

            <div class="dash-block-nest">
                <h4 class="dash-block-nest-title">{{ $t('dash.page_views')}}</h4>
                <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" :style="{position: 'relative', height: '15rem'}" />
                <UserVisits v-if="loaded" :data="props.stats.pages"/>    
            </div>
            <div class="dash-block-nest">
                <RegionController v-if="loaded" :statistics="countries" />
                <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" :style="{position: 'relative', height: '15rem'}" />
                <!-- <RegionController v-if="loaded" :statistics="[]" /> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RegionController from '../analytics/user/regions.vue';
import UsersBrowsersCounter from '../analytics/user/browser.vue';
import UsersCalculate from '../analytics/user/user.vue';
import UsersFormCount from '../analytics/user/form.vue';
import UsersTImerStats from '../analytics/user/timer.vue';
import UsersViewStats from '../analytics/user/views.vue';
import UserVisits from '../analytics/user/visits.vue';

import Doughnut from '../ui/doughnut.vue';

const {t} = useI18n();

const getRanHex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
const countries = [
    {
        region:'Узбекистан',
        visits: '203',
        color: getRanHex(),
    },
    {
        region:'Россия',
        visits: '83',
        color: getRanHex(),
    },
    {
        region:'Турция',
        visits: '49',
        color: getRanHex(),
    },
];

const $router = useRouter();
const loaded = ref(false);

const props = defineProps({
    stats: {
        type: Object,
        default: () => ({
            views: 0,
            users: 0,
            time: "0:00",
            messages: [],
            browsers: [] as { browser: string; count: number; percentage: string, color: string }[],
            devices: [] as any,
            pages: [] as any
        })
    }
})
console.log(props.stats, 'stats')
// const all = async () => {
    // const options = {
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    //     }
    // }
    // await apiDataFetch(`/users/user-statistics`, options).then(response => response.json()).then(data => {
    //     stats.users = data.data.total_count
    // })

    // await apiDataFetch(USER_FETCH_HOST + `/stats/all?date=${$router.currentRoute.value.query.date}`, options)
    //     .then(response => response.json())
    //     .then(response => {
    //         const data = response;
    //         var time = 0;

    //         // Views

    //         stats.views += data.length;

    //         // Users
    //         const users = new Set();

    //         data.forEach((item: any) => {
    //             users.add(item.unique_id);

    //             time += item.timeout;
    //         })

    //         // Timeline 
    //         stats.time = numbersToDateString(time);

    //         stats.users += users.size;

    //         // Browser

            // const browserCounts: Record<string, number> = {};

            // data.forEach((item: { browser: string }) => {
            //     const browserName = item.browser;
            //     browserCounts[browserName] = (browserCounts[browserName] || 0) + Math.floor(Math.random() * 10) + 1;
            //     // browserCounts[browserName] = (browserCounts[browserName] || 0) + 1;
            // });
            // const totalVisits = Object.values(browserCounts).reduce((sum, count) => sum + count, 0);
            const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

            // Object.entries(browserCounts).forEach(([browser, visits]) => {
            //     stats.browsers.push({
            //         browser,
            //         visits,
            //         percentage: ((visits / totalVisits) * 100).toFixed(2) + "%",
            //         color: getRandomHexColor()
            //     });
            // });

            // await apiDataFetch(`/users/browser-statistics`, options).then(response => response.json()).then(response => {
            //     const browsers = response;
            //     browsers.forEach((item: { browser: string, count: number, percentage: string }) => {
            //         stats.browsers.push({...item, color: getRandomHexColor()})
            //     });
            //     console.log(stats.browsers, 'stat');
            // });
            // Pages

            // const pageCounts: Record<string, number> = {};

            // data.forEach((item: { pages: string }) => {
            //     const pageName = item.pages;
            //     pageCounts[pageName] = (pageCounts[pageName] || 0) + Math.floor(Math.random() * 10) + 1;
            // });
            // const totalViews = Object.values(pageCounts).reduce((sum, count) => sum + count, 0);

            // Object.entries(pageCounts).forEach(([pages, visits]) => {
            //     props.stats.pages.push({
            //         pages,
            //         visits,
            //         percentage: ((visits / totalViews) * 100).toFixed(),
            //     });
            // });

            
            // Devices

            // await apiDataFetch(`/users/devices-statistics`, options).then(response => response.json()).then(response => {
            //     const devices = response;
            //     devices.forEach((item: { deviceType: string, count: number, percentage: string }) => {
            //         stats.devices.push({...item, color: getRandomHexColor()})
            //     });
            //     console.log(stats.devices, 'stat');
            // });

            
        // })


onMounted(async () => {-
        // await all();
        
        setTimeout(() => {
            loaded.value = true;
        }, 1000);
})
</script>

<style scoped lang="scss">
.dash,
.dash-blocks {
    width: 100%;

}

.dash {
    &-header {
        border: .1rem solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-blocks {
        margin-top: 1.2rem;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;

        @media (max-width: 1024px) {
            margin-top: 1.2rem;
        }

        @media (max-width: 768px) {
            justify-content: flex-start;
            gap: 1.2rem;
        }
    }

    &-block {
        max-width: calc((100% / 4) - .8rem);
        width: 100%;
        position: relative;

        @media (max-width: 768px) {
            max-width: calc(100% / 2 - .6rem);
        }

        @media (max-width: 480px) {
            max-width: 100%;
        }

        &.screen50 {
            max-width: calc(100% / 2 - .6rem);
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 1.2rem;
            width: 100%;

            @media(max-width: 1024px){
                gap: 1.2rem;
            }

            @media(max-width: 480px){
                max-width: 100%;
            }
        }

        &-nest {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: relative;
            border: 1px solid #E5E5E5;
            border-radius: .4rem;

            &-title {
                width: 100%;
                padding: 2.4rem;
                font-size: 1.6rem;
                line-height: 2.4rem;
                border-bottom: .1rem solid #e5e5e5;

                @media (max-width: 768px){
                    padding: 2rem
                }
            }
        }
    }

    &-pie {
        &-chart {
            width: 30rem !important;
            height: 30rem !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
        }
    }

    &-heading {
        font-size: 2rem;
        line-height: 3rem;
        font-weight: 500;
        width: 100%;
        padding: 2.4rem;
    }
}
</style>