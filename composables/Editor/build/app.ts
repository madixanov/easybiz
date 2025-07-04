import type { Editor } from "grapesjs";
import { FailedAlert } from "~/composables/Notification/list";
import Runner from "../classes/app.runner";
import { apiConstructorFetch } from "~/composables/Exports";

export async function buildEditor(editor: Editor) {
    editor.Components.destroy();

    const $router = useRouter();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    const response = await apiConstructorFetch(`/api/blocks`, options)
    const data = await response.json();
    if (data.error) return FailedAlert(data.error);
    // editor.setComponents(data.sections);
    editor.setComponents(data.sectionsJson);
    editor.Css.addRules(data.css)

    setTimeout(() => {
        new Runner(editor).up();
    }, 200);
}