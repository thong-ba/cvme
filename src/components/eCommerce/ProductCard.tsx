import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { toastSuccess } from '../../utils/toast';
import type { Product } from '../../types/ecommerce';

const WISHLIST_KEY = 'ecommerce_wishlist';

function useWishlist(productId: string) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const isInWishlist = ids.includes(productId);
  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIds((prev) => {
        const next = prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
        return next;
      });
    },
    [productId]
  );
  return { isInWishlist, toggle };
}

interface ProductCardProps {
  product: Product;
  showFlashSale?: boolean;
  onQuickView?: (product: Product) => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const ProductCard = ({ product, showFlashSale, onQuickView }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggle: toggleWishlist } = useWishlist(product.id);
  const price = product.salePrice ?? product.price;
  const hasSale = product.salePrice != null && product.salePrice < product.price;
  const discountPercent = hasSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      thumbnail: product.thumbnail,
      price: product.price,
      salePrice: product.salePrice,
      quantity: 1,
    });
    toastSuccess(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <Link
      to={`/ecommerce/store/product/${product.slug}`}
      className="group block rounded-xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {(showFlashSale && product.inFlashSale) && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
            -{product.flashSaleDiscount ?? 0}%
          </span>
        )}
        {hasSale && !showFlashSale && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
            -{discountPercent}%
          </span>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={toggleWishlist}
            className="p-2 rounded-full bg-white shadow-md text-slate-600 hover:text-red-500 hover:bg-red-50 transition-colors"
            aria-label={isInWishlist ? 'Bỏ yêu thích' : 'Yêu thích'}
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white shadow-md text-slate-600 hover:bg-violet-600 hover:text-white transition-colors"
              aria-label="Xem nhanh"
            >
              <Eye size={18} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-md text-slate-600 hover:bg-violet-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Thêm vào giỏ"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-slate-900 line-clamp-2 text-sm min-h-[2.5rem] group-hover:text-violet-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-amber-500">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-medium text-slate-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="font-semibold text-violet-600">{formatPrice(price)}</span>
          {hasSale && (
            <span className="text-xs text-slate-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
