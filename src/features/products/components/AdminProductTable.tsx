import { useState } from 'react'
import { Link } from 'react-router'
import type { Product } from '../types/product'
import { formatCurrency } from '../utils/formatCurrency'
import { getProductStock } from '../utils/getProductStock'

interface AdminProductTableProps {
  products: Product[]
}

interface ProductImageProps {
  product: Product
}

function ProductImage({ product }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  const primaryImage =
    product.images.find((image) => image.isPrimary) ??
    product.images[0]

  if (!primaryImage || imageError) {
    return (
      <div className="flex h-16 w-14 items-center justify-center bg-neutral-100">
        <span className="text-[8px] font-semibold tracking-widest text-neutral-400">
          AUVENO
        </span>
      </div>
    )
  }

  return (
    <img
      src={primaryImage.url}
      alt={primaryImage.alt}
      onError={() => setImageError(true)}
      className="h-16 w-14 object-cover"
    />
  )
}

export default function AdminProductTable({
  products,
}: AdminProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="border border-neutral-200 px-6 py-16 text-center">
        <p className="text-sm text-neutral-500">
          No products available.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-neutral-200">
      <table className="w-full min-w-225 border-collapse text-left">
        <thead className="bg-neutral-50">
          <tr className="border-b border-neutral-200">
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">
              Product
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">
              Category
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">
              Brand
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">
              Price
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">
              Stock
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">
              Status
            </th>

            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const totalStock = getProductStock(product)

            return (
              <tr
                key={product.id}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <ProductImage product={product} />

                    <div>
                      <p className="font-medium text-neutral-950">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {product.variants.length} variants
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-neutral-600">
                  {product.category.name}
                </td>

                <td className="px-5 py-4 text-sm text-neutral-600">
                  {product.brand.name}
                </td>

                <td className="px-5 py-4 text-sm font-medium">
                  {formatCurrency(product.basePrice)}
                </td>

                <td className="px-5 py-4 text-sm">
                  {totalStock}
                </td>

                <td className="px-5 py-4">
                  {totalStock > 0 ? (
                    <span className="inline-flex bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                      Out of Stock
                    </span>
                  )}
                </td>

                <td className="px-5 py-4 text-right">
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="text-sm font-semibold underline underline-offset-4"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}