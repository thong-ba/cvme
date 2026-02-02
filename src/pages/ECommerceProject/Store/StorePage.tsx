// Guest Store - Khách vãng lai: xem SP, tìm kiếm/lọc, chi tiết, giỏ (local)
import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const StorePage = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <Link
          to="/ecommerce"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-violet-600 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Về giới thiệu dự án</span>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Cửa hàng (Guest)</h1>
          <p className="text-sm sm:text-base text-slate-600">
            Xem sản phẩm, tìm kiếm / lọc, xem chi tiết, thêm vào giỏ (local). Chưa đăng nhập.
          </p>
        </div>

        <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 overflow-hidden p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <Link
              to="/ecommerce/store/cart"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
            >
              <ShoppingCart size={20} />
              Giỏ hàng (local)
            </Link>
          </div>

          <div className="border border-dashed border-slate-200 rounded-xl p-8 sm:p-12 text-center">
            <Package className="mx-auto size-12 text-slate-300 mb-4" />
            <h2 className="text-lg font-semibold text-slate-700 mb-2">Danh sách sản phẩm</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Khu vực hiển thị sản phẩm, tìm kiếm / lọc và thêm vào giỏ (local) sẽ được triển khai tại đây.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
