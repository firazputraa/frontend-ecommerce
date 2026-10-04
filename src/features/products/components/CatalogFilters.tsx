import productsData from "../data/products.json";
import type { Product } from "../types/product";

interface CatalogFiltersProps {
  category: string;
  brand: string;
  size: string;
  color: string;
  minPrice: string;
  maxPrice: string;
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
}

const products = productsData as Product[];

const categories = [
  {
    name: "Boots",
    value: "boots",
  },
  {
    name: "Sandals",
    value: "sandals",
  },
  {
    name: "Shoes",
    value: "shoes",
  },
  {
    name: "Slippers",
    value: "slippers",
  },
];

const brands = Array.from(new Map(products.map((product) => [product.brand.slug, product.brand])).values());

const sizes = ["One Size"];

const colors = [
  {
    name: "Default",
    value: "default",
    hex: "#111111",
  },
];

export default function CatalogFilters({ category, brand, size, color, minPrice, maxPrice, onFilterChange, onClear }: CatalogFiltersProps) {
  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-wide">Filters</h2>

        <button type="button" onClick={onClear} className="text-xs text-neutral-500 underline underline-offset-4 transition hover:text-black">
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="border-b border-neutral-200 py-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wide">Category</h3>

        <div className="space-y-3">
          {categories.map((item) => (
            <label key={item.value} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="category" checked={category === item.value} onChange={() => onFilterChange("category", category === item.value ? "" : item.value)} />

              {item.name}
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="border-b border-neutral-200 py-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wide">Brand</h3>

        <div className="space-y-3">
          {brands.map((item) => (
            <label key={item.slug} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="brand" checked={brand === item.slug} onChange={() => onFilterChange("brand", brand === item.slug ? "" : item.slug)} />

              {item.name}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-neutral-200 py-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wide">Price</h3>

        <div className="grid grid-cols-2 gap-2">
          <input type="number" min="0" value={minPrice} onChange={(event) => onFilterChange("minPrice", event.target.value)} placeholder="Min" className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black" />

          <input type="number" min="0" value={maxPrice} onChange={(event) => onFilterChange("maxPrice", event.target.value)} placeholder="Max" className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black" />
        </div>
      </div>

      {/* Size */}
      <div className="border-b border-neutral-200 py-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wide">Size</h3>

        <div className="grid grid-cols-2 gap-2">
          {sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onFilterChange("size", size === item ? "" : item)}
              className={`border px-2 py-2 text-sm transition ${size === item ? "border-black bg-black text-white" : "border-neutral-300 hover:border-black"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="py-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wide">Color</h3>

        <div className="space-y-3">
          {colors.map((item) => (
            <button key={item.value} type="button" onClick={() => onFilterChange("color", color === item.value ? "" : item.value)} className="flex w-full items-center gap-3 text-sm">
              <span
                className={`h-5 w-5 rounded-full border ${color === item.value ? "ring-2 ring-black ring-offset-2" : "border-neutral-300"}`}
                style={{
                  backgroundColor: item.hex,
                }}
              />

              {item.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

