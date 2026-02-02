import { useState } from 'react';
import { Star, ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { Product, ProductVariant } from '../../types/ecommerce';

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] ?? null
  );

  const basePrice = product.salePrice ?? product.price;
  const variantOffset = selectedVariant?.priceOffset ?? 0;
  const finalPrice = basePrice + variantOffset;
  const hasSale = product.salePrice != null && product.salePrice < product.price;
  const discountPercent = hasSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : product.flashSaleDiscount ?? 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      thumbnail: product.thumbnail,
      price: product.price,
      salePrice: product.salePrice,
      quantity,
      variant: selectedVariant
        ? { type: selectedVariant.type, value: selectedVariant.value }
        : undefined,
    });
  };

  const sizeVariants = product.variants?.filter((v) => v.type === 'size') ?? [];
  const colorVariants = product.variants?.filter((v) => v.type === 'color') ?? [];

  return (
    <div className="space-y-6">
      <div>
        {discountPercent > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-sm font-semibold rounded mb-2">
            <Tag size={14} /> Giảm {discountPercent}%
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{product.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={18} fill="currentColor" />
            <span className="font-medium text-slate-700">{product.rating}</span>
          </div>
          <span className="text-slate-500 text-sm">{product.reviewCount} đánh giá</span>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-2xl font-bold text-violet-600">{formatPrice(finalPrice)}</span>
        {hasSale && (
          <span className="text-lg text-slate-400 line-through">{formatPrice(product.price + variantOffset)}</span>
        )}
      </div>

      <p className="text-slate-600 leading-relaxed">{product.shortDescription}</p>

      {sizeVariants.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Kích thước / dung lượng</p>
          <div className="flex flex-wrap gap-2">
            {sizeVariants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedVariant?.id === v.id
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-slate-200 hover:border-violet-300 text-slate-700'
                }`}
              >
                {v.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {colorVariants.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Màu sắc</p>
          <div className="flex flex-wrap gap-2">
            {colorVariants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedVariant?.id === v.id
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-slate-200 hover:border-violet-300 text-slate-700'
                }`}
              >
                {v.value}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-slate-600 hover:bg-slate-100"
          >
            −
          </button>
          <span className="w-12 text-center font-medium py-2">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-slate-600 hover:bg-slate-100"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors"
        >
          <ShoppingCart size={20} />
          Thêm vào giỏ
        </button>
      </div>

      {!product.inStock && (
        <p className="text-red-600 font-medium">Tạm hết hàng</p>
      )}
    </div>
  );
};

export default ProductInfo;
