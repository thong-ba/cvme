import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const navItems = [
  { to: '/ecommerce/seller', label: 'Dashboard', end: true },
  { to: '/ecommerce/seller/products', label: 'Sản phẩm', end: false },
  { to: '/ecommerce/seller/promotions', label: 'Khuyến mãi', end: false },
  { to: '/ecommerce/seller/orders', label: 'Đơn hàng', end: false },
  { to: '/ecommerce/seller/revenue', label: 'Doanh thu', end: false },
];

interface SellerNavBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function SellerNavBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Tìm đơn hàng, khách hàng...',
}: SellerNavBarProps) {
  const location = useLocation();

  return (
    <nav className="rounded-2xl bg-white/95 shadow-sm border border-slate-100 mb-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Link
            to="/ecommerce"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Về dự án</span>
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2 flex-wrap">
            {navItems.map((item) => {
              const isActive = item.end
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>
      </div>
    </nav>
  );
}
