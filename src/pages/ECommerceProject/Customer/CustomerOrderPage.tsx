// Trang đặt hàng - Khách hàng
import { useState, useMemo } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, Phone, User, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../../../types/ecommerce';
import { getStoredCart, clearStoredCart, formatCurrency } from '../../../utils';
import { toastSuccess } from '../../../utils/toast';

const CustomerOrderPage = () => {
  const [items, setItems] = useState<CartItem[]>(() => getStoredCart<CartItem>());
  const [fullName, setFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0),
    [items]
  );
  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = fullName.trim();
    const address = shippingAddress.trim();
    const phoneVal = phone.trim();
    if (!name || !address || !phoneVal) {
      return;
    }
    clearStoredCart();
    setItems([]);
    setSubmitted(true);
    toastSuccess('Đặt hàng thành công. Đơn hàng sẽ được xử lý sớm.');
  };

  if (submitted || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            to="/ecommerce/customer"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-violet-600 mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm sm:text-base">Về trang khách hàng</span>
          </Link>
          <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {submitted ? 'Đặt hàng thành công' : 'Chưa có sản phẩm'}
            </h2>
            <p className="text-slate-600 mb-6">
              {submitted
                ? 'Đơn hàng của bạn đã được ghi nhận. Bạn có thể xem lịch sử đơn tại trang Khách hàng.'
                : 'Thêm sản phẩm từ cửa hàng vào giỏ rồi quay lại đây để đặt hàng.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/ecommerce/store"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
              >
                <ShoppingBag size={18} />
                Mua sắm
              </Link>
              <Link
                to="/ecommerce/customer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Trang khách hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 max-w-6xl mx-auto">
        <Link
          to="/ecommerce/customer"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-violet-600 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Về trang khách hàng</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Đặt hàng</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-violet-600" />
                Thông tin giao hàng
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-700 mb-1">
                    <Phone size={14} />
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    placeholder="0901234567"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-700 mb-1">
                    <MapPin size={14} />
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition resize-none"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-700 mb-1">
                    <FileText size={14} />
                    Ghi chú
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition resize-none"
                    placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Đơn hàng ({totalItems} sản phẩm)</h2>
              <ul className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => {
                  const key = item.variant
                    ? `${item.productId}_${item.variant.type}_${item.variant.value}`
                    : item.productId;
                  const price = item.salePrice ?? item.price;
                  return (
                    <li key={key} className="flex gap-3 text-sm">
                      <img
                        src={item.thumbnail}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 line-clamp-2">{item.productName}</p>
                        <p className="text-slate-500">
                          {price > 0 ? formatCurrency(price) : ''} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-violet-600 shrink-0">
                        {formatCurrency(price * item.quantity)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính</span>
                  <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 text-lg pt-2">
                  <span>Tổng cộng</span>
                  <span className="text-violet-600">{formatCurrency(subtotal)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors"
              >
                Xác nhận đặt hàng
              </button>
              <Link
                to="/ecommerce/store"
                className="mt-3 block w-full text-center py-2.5 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerOrderPage;
