import { Link } from 'react-router-dom';
import { X, Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { toastSuccess } from '../../utils/toast';
import type { Product } from '../../types/ecommerce';

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, open, onClose }: QuickViewModalProps) => {
  const { addItem } = useCart();

  if (!open) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product) return;
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

  if (!product) return null;

  const price = product.salePrice ?? product.price;
  const hasSale = product.salePrice != null && product.salePrice < product.price;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Xem nhanh sản phẩm"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 shadow-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        <div className="grid sm:grid-cols-2 gap-4 p-4 sm:p-6">
          <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-2">{product.name}</h3>
            <div className="mt-2 flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium text-slate-600">
                {product.rating} ({product.reviewCount} đánh giá)
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2 flex-wrap">
              <span className="font-bold text-violet-600 text-lg">{formatPrice(price)}</span>
              {hasSale && (
                <span className="text-sm text-slate-400 line-through">{formatPrice(product.price)}</span>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-600 line-clamp-3">{product.shortDescription}</p>
            <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-2">
              <Link
                to={`/ecommerce/store/product/${product.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-violet-600 text-violet-600 font-medium hover:bg-violet-50 transition-colors"
                onClick={onClose}
              >
                <Eye size={18} />
                Xem chi tiết
              </Link>
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
              >
                <ShoppingCart size={18} />
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
