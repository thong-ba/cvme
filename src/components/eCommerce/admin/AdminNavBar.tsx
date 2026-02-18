import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const navItems = [
  { to: '/ecommerce/admin', label: 'Dashboard', end: true },
  { to: '/ecommerce/admin/users', label: 'User', end: false },
  { to: '/ecommerce/admin/products', label: 'Sản phẩm', end: false },
  { to: '/ecommerce/admin/orders', label: 'Đơn hàng', end: false },
  { to: '/ecommerce/admin/permissions', label: 'Phân quyền', end: false },
  { to: '/ecommerce/admin/content', label: 'Nội dung', end: false },
];

interface AdminNavBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function AdminNavBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Tìm user, đơn hàng...',
}: AdminNavBarProps) {
  const location = useLocation();

  return (
    <nav className="rounded-2xl bg-white/95 shadow-sm border border-slate-100 mb-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 sm:p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to="/ecommerce"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors text-sm font-medium"
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
                    isActive ? 'bg-violet-500 text-white' : 'text-slate-600 hover:bg-slate-100'
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
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
          />
        </div>
      </div>
    </nav>
  );
}
