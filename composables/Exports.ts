export const PORT = 3300
export const USER_FETCH_HOST = 'http://3.125.46.191'
export const PRODUCTS_URL = 'http://13.239.85.199'
export const CONSTRUCTOR_URL = 'http://3.67.84.116'

export const uri = `${USER_FETCH_HOST}`

export function apiDataFetch(url: string, options: RequestInit) {
    // const path = USER_FETCH_HOST + url; 
    const path = url; 
    return fetch(path, options);
}

export function apiProductsFetch(url: string, options: RequestInit) {
    // const path = PRODUCTS_URL + url; 
    const path = url;
    return fetch(path, options);
}

export function apiConstructorFetch(url: string, options: RequestInit) {
    const path = CONSTRUCTOR_URL + url;
    // const path = url;
    return fetch(path, options);
}

export async function storeData(name: string, value: any) {
    // localStorage.setItem(name, value)
}

export async function removeStoreData(name: string) {
    // localStorage.removeItem(name)
}

export function showStoreData(name: string) {
    // const local = localStorage.getItem(name)
    // return local
}

export function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 128) + 127;

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    const randomLightColor = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    return randomLightColor;
}

export function isValidAnchor(rte: any) {
    // const selection = rte.selection();
    // if (selection && selection.rangeCount > 0) {
    //     const range = selection.getRangeAt(0);
    //     const commonAncestor = range.commonAncestorContainer;
    //     if (commonAncestor.nodeType === Node.ELEMENT_NODE) {
    //         const anchor = (commonAncestor as Element).closest('a');
    //         return !!anchor;
    //     } else if (commonAncestor.nodeType === Node.TEXT_NODE) {
    //         const parentElement = commonAncestor.parentElement;
    //         if (parentElement && parentElement.closest('a')) {
    //             return true;
    //         }
    //     }
    // }
    // return false;
}

export const types = {
    input: "input",
    button: "button",
    select: "select",
    textarea: "textarea",
    checkbox: "checkbox",
    radio: "radio",
    text: "text"
}

export const isRequestPopular = (query: string, value: string) => {
    return `?${query}=${value}`
}

export async function updateStructure(options: any) {
    await apiDataFetch(`${uri}/api/update/test-stranitsa/javascript/${options.scriptType}`, {
        body: JSON.stringify({
            className: options.className,
            slides: options.params
        }, null)
    })
}

export function numbersToDateString(seconds: number) {
    // const days = Math.floor(seconds / 86400);
    // seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default {
    PORT,
    USER_FETCH_HOST,
    apiDataFetch,
    apiProductsFetch,
    types,
    isRequestPopular,
    uri,
    updateStructure,
    getRandomColor,
    numbersToDateString
}