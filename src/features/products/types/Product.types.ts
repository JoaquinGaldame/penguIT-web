export type ProductCategory =
  | 'main-course'
  | 'beverage'
  | 'dessert'
  | 'combo';

export type SaleUnit =
  | 'unit'
  | 'portion'
  | 'bottle'
  | 'kilogram';

export interface CreateProductRequest {
  name: string;
  sku: string;
  category: ProductCategory;
  description: string;
  saleUnit: SaleUnit;
  salePrice: number;
  estimatedCost?: number;
  taxRate: 0 | 10.5 | 21;
  isActive: boolean;
  isAvailableForSale: boolean;
  trackStock: boolean;
  initialStock?: number;
  minimumStock?: number;
  image?: File;
}

export interface Product
  extends Omit<CreateProductRequest, 'image'> {
  id: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  products: Product[];
}

export interface CreateProductResponse {
  product: Product;
}

export type ProductStatusFilter =
  | 'all'
  | 'active'
  | 'inactive';

export interface ProductsState {
  search: string;
  category: ProductCategory | 'all';
  status: ProductStatusFilter;
}