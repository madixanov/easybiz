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
    price?: number;
    profit?: number;
    extra?: number;
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
  }
  