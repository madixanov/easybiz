import type { ProductDto } from "~/interface/products/product";
export class Products {
    private collector: any[];
    constructor(collector?: any[]) {
        this.collector = collector || [];
    }

    public async get(minPrice?: number, maxPrice?: number) {
        this.collector.length = 0;

        let query = "";
        if (minPrice !== undefined && maxPrice !== undefined) {
            query = `?ProductFilter.MinimumPrice=${minPrice}&ProductFilter.MaximumPrice=${maxPrice}`;
        }

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await apiProductsFetch(`/api/products${query}`, options);
        const data = await response.json();

        data.forEach((product: ProductDto) => {
            if (product.imageUrl?.startsWith("https://via.placeholder.com/")) {
                product.imageUrl = product.imageUrl.replace("https://via.placeholder.com/", "https://placehold.co/");
            }

            this.collector.push(product);
        });

        return this.collector;
    }

    public async getProduct(id: any) {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        };

        const data = await apiProductsFetch(`/api/products/${id}`, options).then(res => res.json())
        return this.collector?.push(data as ProductDto);
    }

    public async create(product: any) {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productCreateUpdateDto: product})
        };

        const response = await apiProductsFetch(`/api/products`, options);
        const data = await response.json();
        console.log(data, 'created');

        return response;
    }

    public async delete(ids: string[]) {
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productIds:  ids})
        };
        const res = await apiProductsFetch(`/api/products/batch`, options)
        return res
    }

    public async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
      
        const options = {
          method: "POST",
          body: formData,
        };
      
        const response = await apiProductsFetch(`/api/products/upload-preview`, options);
        
        if (!response.ok) {
            console.log("Image upload failed");
            return '';
        }
      
        const data = await response.json();
        return data.url;
      }
}
export default Products;