// import { ref } from 'vue'

import { EditorApp } from './Editor/classes/app.build';
// import { Plugins } from './Editor/plugins/app';

// import { canvasProps } from './Editor/generator/scripts';
// import { getLabels } from './Editor/assets/labels';


// export const component = ref({
//     container: '#gjs',
//     fromElement: true,
//     height: '100%',
//     width: '100%',
//     plugins: [Plugins],
//     canvas: { ...canvasProps().scripts, ...canvasProps().styles },
//     allowScripts: true,
// })

// export async function init() {
//     await getLabels(component.value);

//     const editor = new EditorApp(component.value);
//     return editor;
// }
// export default { init }

import { ref } from 'vue';
import grapesjs from 'grapesjs';  // Импортируем сам GrapesJS
import { Plugins } from './Editor/plugins/app'; // Плагины, если они у вас есть

import { canvasProps } from './Editor/generator/scripts';
import { getLabels } from './Editor/assets/labels';

export const component = ref({
    container: '#gjs',
    fromElement: true,
    height: '100%',
    width: '100%',
    plugins: [Plugins],
    canvas: {
        scripts: canvasProps().scripts,
        styles: canvasProps().styles,
    },
    allowScripts: true,
});

export async function init() {
    // Загрузка меток перед инициализацией
    await getLabels(component.value);

    // Инициализация редактора через GrapesJS
    // const editor = grapesjs.init(component.value);
    const editor = new EditorApp(component.value);

    return editor; // Возвращаем объект редактора
}

export default { init }; // Экспортируем метод инициализации
