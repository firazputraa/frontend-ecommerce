import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGallery from "../../features/products/components/ProductGallery";
import ProductVariantSelector from "../../features/products/components/ProductVariantSelector";
import { getProductBySlug } from "../../features/products/services/product.service";
import type { Product, ProductVariant } from "../../features/products/types/product";
import { formatCurrency } from "../../features/products/utils/formatCurrency";

export default function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getProductBySlug(slug);

        setProduct(data);

        if (data) {
          const firstAvailableVariant = data.variants.find((variant) => variant.stock > 0) ?? data.variants[0];

          if (firstAvailableVariant) {
            setSelectedColor(firstAvailableVariant.color.name);

            setSelectedSize(firstAvailableVariant.size);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadProduct();
  }, [slug]);

  function handleColorChange(color: string) {
    setSelectedColor(color);

    const firstVariantForColor = product?.variants.find((variant) => variant.color.name === color && variant.stock > 0) ?? product?.variants.find((variant) => variant.color.name === color);

    setSelectedSize(firstVariantForColor?.size ?? "");
  }

  const selectedVariant: ProductVariant | undefined = product?.variants.find((variant) => variant.color.name === selectedColor && variant.size === selectedSize);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-360 px-5 py-20 text-center text-sm text-neutral-500 md:px-8">Loading product...</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-360 px-5 py-20 md:px-8">
          <p className="text-sm uppercase tracking-widest text-neutral-500">Product not found</p>

          <h1 className="mt-3 text-3xl font-bold">This product is unavailable.</h1>

          <Link to="/shop" className="mt-8 inline-block border-b border-black pb-1 text-sm font-semibold uppercase">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const displayPrice = selectedVariant?.price ?? product.basePrice;

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="mx-auto max-w-360 px-5 py-6 md:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <Link to="/shop" className="transition hover:text-black">
            Shop
          </Link>

          <span>/</span>

          <span>{product.category.name}</span>

          <span>/</span>

          <span className="text-neutral-950">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-360 gap-10 px-5 pb-20 md:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)] lg:gap-16">
        <ProductGallery images={product.images} />

        <section className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{product.brand.name}</p>

          <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">{product.name}</h1>

          <p className="mt-4 text-xl font-medium">{formatCurrency(displayPrice)}</p>

          <div className="my-8 border-t border-neutral-200" />

          <ProductVariantSelector variants={product.variants} selectedColor={selectedColor} selectedSize={selectedSize} onColorChange={handleColorChange} onSizeChange={setSelectedSize} />

          <div className="mt-8 border-t border-neutral-200 pt-6">
            {selectedVariant ? (
              <>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-neutral-500">SKU</span>

                  <span className="font-medium">{selectedVariant.sku}</span>
                </div>

                <div className="mt-3 flex justify-between gap-4 text-sm">
                  <span className="text-neutral-500">Availability</span>

                  <span className={selectedVariant.stock > 0 ? "font-medium text-green-700" : "font-medium text-red-600"}>{selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : "Out of stock"}</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-neutral-500">Select a size to view stock availability.</p>
            )}
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Description</h2>

            <p className="mt-4 text-sm leading-7 text-neutral-600">{product.description}</p>
          </div>

          <div className="mt-6 flex justify-between border-t border-neutral-200 pt-5 text-sm">
            <span className="text-neutral-500">Weight</span>

            <span className="font-medium">{product.weightGrams}g</span>
          </div>
        </section>
      </div>
    </main>
  );
}

