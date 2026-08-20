import { useEffect, useState } from 'react'
import ProductGrid from '../../features/products/components/ProductGrid'
import { getProducts } from '../../features/products/services/product.service'
import type { Product } from '../../features/products/types/product'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } finally {
        setIsLoading(false)
      }
    }

    void loadProducts()
  }, [])

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
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

      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-8 md:py-12">
        <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-4">
          <p className="text-sm font-medium">
            {products.length} PRODUCTS
          </p>

          <button
            type="button"
            className="text-sm font-medium uppercase tracking-wide"
          >
            Sort by
          </button>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-sm text-neutral-500">
            Loading products...
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </main>
  )
}