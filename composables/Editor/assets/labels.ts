import { apiConstructorFetch } from "~/composables/Exports";

export async function getLabels(component: any) {
    (component as any).blockManager = {
        blocks: []
    }

    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }

        await apiConstructorFetch("/api/blocks", options)
            .then(response => response.json())
            .then(response => {
                const data = response;
                console.log(data)
                data.forEach((item: any) => {
                    console.log(item,'from getlabel');
                    
                    if (item.length) {
                        // item.forEach((cmp: any, cmpIndex: number) => {
                            item.label = `
                                <div class="components-card-preview" style="background: black; border-top-left-radius: 4px; border-top-right-radius: 4px; display: flex; flex-direction: column; align-items: center; padding: 10px; gap: 2px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                        <div class="components-card-icons" style="display: flex; align-items: center; justify-content: space-between; gap: 2px;">
                                            <i style="width: 5px !important; height: 5px !important; background: white; border-radius: 50% !important; display: flex; align-items: center; justify-content: center;"></i>
                                            <i style="width: 5px !important; height: 5px !important; background: white; border-radius: 50% !important; display: flex; align-items: center; justify-content: center;"></i>
                                            <i style="width: 5px !important; height: 5px !important; background: white; border-radius: 50% !important; display: flex; align-items: center; justify-content: center;"></i>
                                        </div>
                                    </div>
                                    <img src="${item.previewImageUrl}" alt="">
                                </div>
                            `;

                            (component as any).blockManager.blocks.push(item)
                        // });
                    }
                });
            })
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}