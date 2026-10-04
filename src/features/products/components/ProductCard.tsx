import { Link } from "react-router-dom";

import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

  const totalStock = product.variants.reduce((total, variant) => total + variant.stock, 0);

  const isOutOfStock = totalStock <= 0;

  return (
    <article className="group">
      <Link to={`/product/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="aspect-4/5 overflow-hidden bg-neutral-100">
          {primaryImage ? (
            <img src={primaryImage.url} alt={primaryImage.alt} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">No image</div>
          )}
        </div>

        {/* Product Information */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {/* Brand */}
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{product.brand.name}</p>

              {/* Product Name */}
              <h3 className="mt-1 text-sm font-medium uppercase tracking-wide text-black">{product.name}</h3>
            </div>

            {/* Price */}
            <p className="shrink-0 text-sm font-medium text-black">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(product.basePrice)}
            </p>
          </div>

          {/* Category */}
          <p className="mt-2 text-sm text-neutral-500">{product.category.name}</p>

          {/* Stock Indicator */}
          <div className="mt-3 flex items-center gap-2">
            <span className={`h-3.5 w-3.5 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-black"}`} />
            <span className="sr-only">{isOutOfStock ? "Out of stock" : "Available"}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
