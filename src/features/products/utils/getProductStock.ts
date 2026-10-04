import type { Product } from '../types/product'

export function getProductStock(product: Product): number {
  return product.variants.reduce(
    (total, variant) => total + variant.stock,
    0,
  )
}
