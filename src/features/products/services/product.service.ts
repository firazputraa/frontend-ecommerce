import { mockProducts } from '../data/products.mock'
import type { ProductQuery } from '../types/catalog'
import type { Product } from '../types/product'

export async function getProducts(
  query: ProductQuery = {},
): Promise<Product[]> {
  let products = [...mockProducts]

  if (query.search) {
    const search = query.search.toLowerCase().trim()

    products = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.category.name.toLowerCase().includes(search) ||
        product.brand.name.toLowerCase().includes(search)
      )
    })
  }

  if (query.category) {
    products = products.filter(
      (product) => product.category.slug === query.category,
    )
  }

  if (query.brand) {
    products = products.filter(
      (product) => product.brand.slug === query.brand,
    )
  }

  if (query.size) {
    products = products.filter((product) =>
      product.variants.some(
        (variant) =>
          variant.size.toLowerCase() === query.size?.toLowerCase() &&
          variant.stock > 0,
      ),
    )
  }

  if (query.color) {
    products = products.filter((product) =>
      product.variants.some(
        (variant) =>
          variant.color.toLowerCase() === query.color?.toLowerCase() &&
          variant.stock > 0,
      ),
    )
  }

  if (query.minPrice !== undefined) {
    products = products.filter(
      (product) => product.basePrice >= query.minPrice!,
    )
  }

  if (query.maxPrice !== undefined) {
    products = products.filter(
      (product) => product.basePrice <= query.maxPrice!,
    )
  }

  switch (query.sort) {
    case 'price-asc':
      products.sort((a, b) => a.basePrice - b.basePrice)
      break

    case 'price-desc':
      products.sort((a, b) => b.basePrice - a.basePrice)
      break

    case 'name-asc':
      products.sort((a, b) => a.name.localeCompare(b.name))
      break

    case 'newest':
    default:
      products.sort((a, b) => b.id - a.id)
      break
  }

  return products
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return mockProducts.find((product) => product.slug === slug)
}