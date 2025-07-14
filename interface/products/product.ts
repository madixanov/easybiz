export interface ProductDto {
  id?: string;
  model?: string;
  identificationNumber?: string;
  priority?: number;
  link?: string;
  imageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaTags?: string;
  description?: string;
  price?: number | undefined;
  profit?: number | undefined;
  extra?: number | undefined;
  amount?: number;
  views?: number;
  warehouse?: string;
  availability?: boolean;
  isDeleted?: boolean;

  categoryId?: string;
  category?: any;

  countryId?: string;
  country?: any;

  productManufacturerId?: string;
  productManufacturer?: any;

  sectionId?: string;
  section?: any;

  sales?: any[];

  error?: string;           
  details?: any[];
}

export interface Category {
  id: string;
  name: string;
  totalProfit: number;
}

export interface StatisticsDto {
  best_product: ProductDto;
  most_viewed: ProductDto;
  bestProducts: ProductDto[];
  products: ProductDto[];
  categories: Category[];
  sections: Category[];
  analytics: {
    products: number;
    sold: number;
  };
}