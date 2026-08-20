import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import AdminProductTable from '../../../features/products/components/AdminProductTable'
import { getProducts } from '../../../features/products/services/product.service'
import type { Product } from '../../../features/products/types/product'
import { getProductStock } from '../../../features/products/utils/getProductStock'

export default function AdminProductsPage() {
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

  const totalStock = products.reduce(
    (total, product) =>
      total + getProductStock(product),
    0,
  )

  const lowStockProducts = products.filter((product) => {
    const stock = getProductStock(product)

    return stock > 0 && stock <= 10
  }).length

  const outOfStockProducts = products.filter(
    (product) => getProductStock(product) === 0,
  ).length

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="mx-auto max-w-360 px-5 py-10 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Admin / Inventory
            </p>

            <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
              Products
            </h1>

            <p className="mt-3 text-sm text-neutral-600">
              Manage products, variants, pricing, and inventory.
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="inline-flex items-center justify-center bg-black px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-800"
          >
            + Add Product
          </Link>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Products
            </p>

            <p className="mt-3 text-3xl font-bold">
              {products.length}
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Total Stock
            </p>

            <p className="mt-3 text-3xl font-bold">
              {totalStock}
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Low Stock
            </p>

            <p className="mt-3 text-3xl font-bold">
              {lowStockProducts}
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Out of Stock
            </p>

            <p className="mt-3 text-3xl font-bold">
              {outOfStockProducts}
            </p>
          </div>
        </section>

        <section className="mt-8">
          {isLoading ? (
            <div className="border border-neutral-200 bg-white py-20 text-center text-sm text-neutral-500">
              Loading products...
            </div>
          ) : (
            <AdminProductTable products={products} />
          )}
        </section>
      </div>
    </main>
  )
}