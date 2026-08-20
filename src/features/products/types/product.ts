export interface Category {
  id: number
  name: string
  slug: string
}

export interface Brand {
  id: number
  name: string
  slug: string
}

export interface ProductImage {
  id: number
  url: string
  alt: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductVariant {
  id: number
  sku: string
  size: string
  color: string
  colorHex: string
  price: number
  stock: number
}

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  basePrice: number
  weightGrams: number
  category: Category
  brand: Brand
  images: ProductImage[]
  variants: ProductVariant[]
}