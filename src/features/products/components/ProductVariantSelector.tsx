import type { ProductVariant } from "../types/product";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

export default function ProductVariantSelector({ variants, selectedColor, selectedSize, onColorChange, onSizeChange }: ProductVariantSelectorProps) {
  const colors = Array.from(new Map(variants.map((variant) => [variant.color.name, variant.color])).values());

  const sizeVariants = variants.filter((variant) => variant.color.name === selectedColor);

  return (
    <div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Color</h2>

          <span className="text-sm text-neutral-500">{selectedColor}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              title={color.name}
              aria-label={`Select ${color.name}`}
              onClick={() => onColorChange(color.name)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${selectedColor === color.name ? "border-black" : "border-neutral-300"}`}
            >
              <span
                className="h-6 w-6 rounded-full border border-neutral-400"
                style={{
                  backgroundColor: color.hex,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide">Size</h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {sizeVariants.map((variant) => {
            const isOutOfStock = variant.stock <= 0;
            const isSelected = selectedSize === variant.size;

            return (
              <button
                key={variant.id}
                type="button"
                disabled={isOutOfStock}
                onClick={() => onSizeChange(variant.size)}
                className={`border px-3 py-3 text-sm font-medium transition ${isSelected ? "border-black bg-black text-white" : "border-neutral-300"} ${
                  isOutOfStock ? "cursor-not-allowed bg-neutral-100 text-neutral-300 line-through" : "hover:border-black"
                }`}
              >
                {variant.size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

