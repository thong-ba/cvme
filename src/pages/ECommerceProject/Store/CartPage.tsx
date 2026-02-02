import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalItems } = useCart();

  const subtotal = items.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 text-center">
        <ShoppingCart className="mx-auto size-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Giỏ hàng trống</h2>
        <p className="text-slate-500 mb-6">Thêm sản phẩm từ cửa hàng để tiếp tục.</p>
        <Link
          to="/ecommerce/store"
          className="inline-flex items-center px-5 py-2.5 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <ShoppingCart size={28} className="text-violet-600" />
        Giỏ hàng ({totalItems} sản phẩm)
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const key = item.variant
              ? `${item.productId}_${item.variant.type}_${item.variant.value}`
              : item.productId;
            const price = item.salePrice ?? item.price;
            return (
              <div
                key={key}
                className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
              >
                <Link
                  to={`/ecommerce/store/product/${item.productSlug}`}
                  className="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-slate-100"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.productName}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/ecommerce/store/product/${item.productSlug}`}
                    className="font-medium text-slate-900 hover:text-violet-600 line-clamp-2"
                  >
                    {item.productName}
                  </Link>
                  {item.variant && (
                    <p className="text-sm text-slate-500 mt-0.5">
                      {item.variant.type}: {item.variant.value}
                    </p>
                  )}
                  <p className="mt-2 font-semibold text-violet-600">{formatPrice(price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1, item.variant)
                      }
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-l-lg"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1, item.variant)
                      }
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-r-lg"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.variant)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    aria-label="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4">Tóm tắt đơn hàng</h2>
            <div className="flex justify-between text-slate-600 mb-2">
              <span>Tạm tính ({totalItems} SP)</span>
              <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-4">
              <div className="flex justify-between font-semibold text-slate-900 text-lg">
                <span>Tổng cộng</span>
                <span className="text-violet-600">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Đăng nhập hoặc nhập thông tin giao hàng ở bước thanh toán.
            </p>
            <Link
              to="/ecommerce/customer"
              className="mt-4 block w-full text-center py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors"
            >
              Thanh toán (Customer)
            </Link>
            <Link
              to="/ecommerce/store"
              className="mt-3 block w-full text-center py-2.5 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
