<template>

    <div class="constructor">
        <div class="main">
            <div class="wrapper" style="margin-top: 0 !important;">
                <div class="demo">
                    <div class="demo-page">
                        <div class="demo-container">
                            <UiLoader v-if="loaded" :has-background="true" :height="'100%'" />
                            <Constructor />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="project-components" @click.self="toggle()">
        <editor-models-components />
    </div>

    <div class="project-subcomponents active" @click.self="toggle2()">
        <editor-models-sub-components />
    </div>

</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';
import {init} from '~/composables/Editor';
import 'grapesjs/dist/css/grapes.min.css';
import { FailedAlert, PushNotification } from '~/composables/Notification/list';

const $router = useRouter();
const loaded = ref(false);

const new_name = ref("");
const abilityCreatePage = ref(false);

const select = (e: any) => {
    $router.push({ query: { url: $router.currentRoute.value.query.url, page_id: e.target.value } });
    PushNotification("Redirecting to...");
}

const closeModalWindow = () => {
    abilityCreatePage.value = !abilityCreatePage.value;
}

const toggle = () => {
    const components = document.querySelector('.project-components') as HTMLElement;
    components.classList.remove('active');
}

const toggle2 = () => {
    const subcomponents = document.querySelector('.project-subcomponents') as HTMLElement;
    subcomponents.classList.remove('active');
}

const pages = ref([] as any[])

const getList = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }

    // await apiDataFetch(`${USER_FETCH_HOST}/constructor/projects?url=${$router.currentRoute.value.query.url}`, options)
    //     .then(response => response.json())
    //     .then(response => {
    //         const data = response;
    //         data.pages.forEach((item: any) => {
    //             pages.value.push(item);
    //         })
    //     })
    // await apiConstructorFetch(`/api/pages/${$router.currentRoute.value.query.url}`, options)
    //     .then(response => response.json())
    //     .then(response => {
    //         const data = response;
    //         data.pages.forEach((item: any) => {
    //             pages.value.push(item);
    //         })
    //     })
}

definePageMeta({
    layout: "editor"
})

onMounted(async () => {
    init()

    await getList();
    setTimeout(() => {
        loaded.value = false
    }, 2000);
})
</script>


<style scoped lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
    color: #344054 !important;
}

.create {
    &-page {
        background: #365BA7;
        color: white;
        height: 3.8rem;
        width: max-content;
        border-radius: .8rem;
        padding: 0 1.4rem;

        &.submit {
            border-radius: .4rem;
            margin-top: 2.4rem;
            width: 100%;
        }

        &.delete {
            background: red
        }
    }
}

.demo-container {
    width: 100% !important;
}

.wrapper {
    display: flex;
}

.form {
    &-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        display: none;

        &.active {
            display: flex;
        }
    }

    &-container {
        width: 100%;
        max-width: 40rem;
        height: max-content;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: .8rem;
        padding: 2.4rem;

        &>label {
            margin-top: 1.2rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            row-gap: .4rem;

            & p {
                font-size: 1.4rem;
                color: #dcdada !important;
            }

            & input {
                width: 100%;
                height: 100%;
                color: black !important;
                background: white !important;
                border: .1rem solid #dcdada !important;
                padding: .6rem 1.2rem;
            }
        }
    }

    &-create {
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 1.5;
        text-align: center;
    }
}

.mirror {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;

    &-player {
        width: 95vw;
        max-width: 1728px;
        height: 80vh;
        border-radius: .8rem
    }
}

.pages {
    &-select {
        background: white;
        color: black;
        border: 1px solid #344054;
        height: 39px;
        border-radius: 5px;
        padding: 5px 10px;
        appearance: none;
    }
}

.project {

    &-components,
    &-subcomponents {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 300ms;
        transform: scale(0);

        &.active {
            transform: scale(1);
        }

        &.logged {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(2px);
        }
    }

    &-subcomponents {
        width: 740px;
        height: 740px;
    }

}
</style>