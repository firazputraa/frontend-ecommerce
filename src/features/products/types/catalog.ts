export type ProductSort =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'

export interface ProductQuery {
  search?: string
  category?: string
  brand?: string
  size?: string
  color?: string
  minPrice?: number
  maxPrice?: number
  sort?: ProductSort
}
