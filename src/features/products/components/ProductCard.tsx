import { useState } from 'react'
import type { Product } from '../types/product'
import { formatCurrency } from '../utils/formatCurrency'
import { Link } from 'react-router'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0]

  const availableColors = Array.from(
    new Map(
      product.variants.map((variant) => [
        variant.color,
        {
          name: variant.color,
          hex: variant.colorHex,
        },
      ]),
    ).values(),
  )

  return (
    <article className="group">
        <Link
        to={`/product/${product.slug}`}
        className="block"
        >
      <div className="relative aspect-4/5 overflow-hidden bg-neutral-100">
        {primaryImage && !imageError ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              AUVENO
            </span>
          </div>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-950">
              {product.name}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {product.category.name}
            </p>
          </div>

          <p className="shrink-0 text-sm font-medium text-neutral-950">
            {formatCurrency(product.basePrice)}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {availableColors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="h-4 w-4 rounded-full border border-neutral-300"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
     </Link>
    </article>
  )
}