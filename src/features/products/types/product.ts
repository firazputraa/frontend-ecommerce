export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: ProductColor;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  weightGrams: number;
  category: Category;
  brand: Brand;
  images: ProductImage[];
  variants: ProductVariant[];
}

