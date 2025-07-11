import type { ProductDto } from "~/interface/products/product";
export class Products {
    private collector: any[];
    constructor(collector?: any[]) {
        this.collector = collector || [];
    }

    public async get() {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await apiProductsFetch('/api/products', options);
        const data = await response.json();

        data.forEach((product: ProductDto) => {

            if (product.imageUrl?.startsWith('https://via.placeholder.com/')) {
              product.imageUrl = product.imageUrl.replace('https://via.placeholder.com/', 'https://placehold.co/');
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
            body: JSON.stringify(product)
        };

        const response = await apiProductsFetch(`/api/products`, options);
        const data = await response.json();
        console.log(data, 'created');

        return data;
    }
}
export default Products;