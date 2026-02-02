import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, ShoppingCart, Menu, X, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useStoreAuth } from '../../contexts/StoreAuthContext';
import { categories } from '../../data/ecommerce';
import TrustStrip from './TrustStrip';

const StoreHeader = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useStoreAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/ecommerce/store');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/ecommerce/store/products?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-amber-100 shadow-sm store-header-tet">
      <TrustStrip />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/ecommerce/store"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-lg sm:text-xl"
          >
            <ShoppingBag size={24} />
            <span className="hidden sm:inline">Shop</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </form>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/ecommerce/store/cart"
              className="relative p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-600">
                  <User size={16} />
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors font-medium"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/ecommerce/store/login"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 transition-colors font-medium"
                >
                  <LogIn size={16} />
                  Đăng nhập
                </Link>
                <Link
                  to="/ecommerce/store/register"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                >
                  <UserPlus size={16} />
                  Đăng ký
                </Link>
              </>
            )}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop nav categories */}
        <nav className="hidden md:flex items-center gap-1 py-2 border-t border-amber-50">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/ecommerce/store/category/${cat.slug}`}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-50 space-y-2">
            <form onSubmit={handleSearch} className="px-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                />
              </div>
            </form>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/ecommerce/store/category/${cat.slug}`}
                className="block px-4 py-2.5 text-slate-700 hover:bg-red-50 hover:text-red-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-amber-50 mt-2">
              {user ? (
                <>
                  <span className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-slate-700">
                    <User size={18} />
                    {user.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/ecommerce/store/login"
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-600 text-red-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    Đăng nhập
                  </Link>
                  <Link
                    to="/ecommerce/store/register"
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default StoreHeader;
