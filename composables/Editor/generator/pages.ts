import { FailedAlert, PushNotification } from "~/composables/Notification/list";
import { apiConstructorFetch } from "~/composables/Exports";
class Pages {
    private p_id: string | string[];
    private p_name: string;
    private p_url?: string;

    constructor(id: string | string[], name: string, url?: string) {
        this.p_id = id;
        this.p_name = name;
        this.p_url = url;
    }

    async create() {
        const body = { pageDto: {
            id: null,
            title: this.p_name,
            projectId: this.p_id,
            urlPath: this.p_url,
            html: `<p>New element in page: ${this.p_name}</p>`,
            css: `*{margin: 0;padding:0;box-sizing: border-box;}`,
            metas: [],
            scripts: [],
            fonts: [],
            sectionsJson: '',
            lastSaved: new Date().toISOString(),
            isPublished: false,
        }};

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await apiConstructorFetch(`/api/pages`, options);
            const data = await response.text();
            console.log(data);
            PushNotification("Страница успешно создана");
        } catch (error: any) {
            FailedAlert(error.message)
        }
    }
}

export default Pages;