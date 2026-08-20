import { useState } from 'react'
import type { ProductImage } from '../types/product'

interface ProductGalleryProps {
  images: ProductImage[]
}

export default function ProductGallery({
  images,
}: ProductGalleryProps) {
  const [failedImages, setFailedImages] = useState<Set<number>>(
    new Set(),
  )

  const sortedImages = [...images].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )

  function handleImageError(id: number) {
    setFailedImages((current) => {
      const next = new Set(current)
      next.add(id)
      return next
    })
  }

  if (sortedImages.length === 0) {
    return (
      <div className="flex aspect-4/5 items-center justify-center bg-neutral-100">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          AUVENO
        </span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {sortedImages.map((image) => (
        <div
          key={image.id}
          className="flex aspect-4/5 items-center justify-center overflow-hidden bg-neutral-100"
        >
          {failedImages.has(image.id) ? (
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              AUVENO
            </span>
          ) : (
            <img
              src={image.url}
              alt={image.alt}
              onError={() => handleImageError(image.id)}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}