import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CatalogFilters from '../../features/products/components/CatalogFilters'
import ProductGrid from '../../features/products/components/ProductGrid'
import { getProducts } from '../../features/products/services/product.service'
import type { ProductSort } from '../../features/products/types/catalog'
import type { Product } from '../../features/products/types/product'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const search = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? ''
  const brand = searchParams.get('brand') ?? ''
  const size = searchParams.get('size') ?? ''
  const color = searchParams.get('color') ?? ''
  const minPrice = searchParams.get('minPrice') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const sort =
    (searchParams.get('sort') as ProductSort | null) ??
    'newest'

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)

      try {
        const data = await getProducts({
          search: search || undefined,
          category: category || undefined,
          brand: brand || undefined,
          size: size || undefined,
          color: color || undefined,

          minPrice:
            minPrice !== ''
              ? Number(minPrice)
              : undefined,

          maxPrice:
            maxPrice !== ''
              ? Number(maxPrice)
              : undefined,

          sort,
        })

        setProducts(data)
      } finally {
        setIsLoading(false)
      }
    }

    void loadProducts()
  }, [
    search,
    category,
    brand,
    size,
    color,
    minPrice,
    maxPrice,
    sort,
  ])

  function updateFilter(
    key: string,
    value: string,
  ) {
    const nextParams = new URLSearchParams(searchParams)

    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }

    setSearchParams(nextParams)
  }

  function clearFilters() {
    setSearchParams({})
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-360 px-5 py-12 md:px-8 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Shop
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
            Discover contemporary essentials designed for everyday wear.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-5 py-8 md:px-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-200 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="w-full max-w-md">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                updateFilter(
                  'search',
                  event.target.value,
                )
              }
              placeholder="Search products..."
              className="w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          <div className="flex items-center justify-between gap-5 md:justify-end">
            <p className="text-sm font-medium">
              {products.length} PRODUCTS
            </p>

            <select
              value={sort}
              onChange={(event) =>
                updateFilter(
                  'sort',
                  event.target.value,
                )
              }
              className="border border-neutral-300 bg-white px-3 py-3 text-sm font-medium outline-none"
            >
              <option value="newest">
                Newest
              </option>

              <option value="price-asc">
                Price: Low to High
              </option>

              <option value="price-desc">
                Price: High to Low
              </option>

              <option value="name-asc">
                Name: A-Z
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <CatalogFilters
            category={category}
            brand={brand}
            size={size}
            color={color}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onFilterChange={updateFilter}
            onClear={clearFilters}
          />

          <div className="min-w-0 flex-1">
            {isLoading ? (
              <div className="py-20 text-center text-sm text-neutral-500">
                Loading products...
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
