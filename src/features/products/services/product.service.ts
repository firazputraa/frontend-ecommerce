import { mockProducts } from '../data/products.mock'
import type { Product } from '../types/product'

export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return mockProducts.find((product) => product.slug === slug)
}