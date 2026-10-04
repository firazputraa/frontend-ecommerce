import productsData from "../data/products.json";
import type { ProductQuery, ProductSort } from "../types/catalog";
import type { Product } from "../types/product";

const products = productsData as Product[];

function matchesSearch(product: Product, search: string): boolean {
  const query = search.toLowerCase().trim();

  if (!query) {
    return true;
  }

  return [product.name, product.description, product.category.name, product.brand.name, ...product.variants.map((variant) => variant.sku)].some((value) => value.toLowerCase().includes(query));
}

function matchesVariantFilters(product: Product, query: ProductQuery): boolean {
  if (query.size && !product.variants.some((variant) => variant.size === query.size)) {
    return false;
  }

  if (query.color && !product.variants.some((variant) => variant.color.name.toLowerCase() === query.color!.toLowerCase())) {
    return false;
  }

  return true;
}

function matchesPrice(product: Product, query: ProductQuery): boolean {
  if (query.minPrice !== undefined && product.basePrice < query.minPrice) {
    return false;
  }

  if (query.maxPrice !== undefined && product.basePrice > query.maxPrice) {
    return false;
  }

  return true;
}

function sortProducts(productList: Product[], sort: ProductSort = "newest"): Product[] {
  const sorted = [...productList];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.basePrice - b.basePrice);

    case "price-desc":
      return sorted.sort((a, b) => b.basePrice - a.basePrice);

    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "newest":
    default:
      return sorted;
  }
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  let result = products.filter((product) => {
    if (query.category && product.category.slug !== query.category) {
      return false;
    }

    if (query.brand && product.brand.slug !== query.brand) {
      return false;
    }

    if (!matchesSearch(product, query.search ?? "")) {
      return false;
    }

    if (!matchesVariantFilters(product, query)) {
      return false;
    }

    if (!matchesPrice(product, query)) {
      return false;
    }

    return true;
  });

  result = sortProducts(result, query.sort);

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

