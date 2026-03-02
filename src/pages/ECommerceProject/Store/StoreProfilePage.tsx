import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  LogIn,
  ShoppingBag,
  Ticket,
  Bell,
  Heart,
  ShieldCheck,
  Settings,
  HelpCircle,
  CreditCard,
  History,
  Package,
  Gift,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { StoreUser } from '../../../contexts/StoreAuthContext';

const AUTH_STORAGE_KEY = 'ecommerce_auth_user';

const StoreProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StoreUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoreUser;
      setUser(parsed);
    } catch {
      setUser(null);
    }
  }, []);

  const handleBackToStore = () => {
    navigate('/ecommerce/store');
  };

  const isGuest = !user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        <button
          type="button"
          onClick={handleBackToStore}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 mb-6 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Về cửa hàng
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Thông tin cơ bản + menu bên trái */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-xl">
                  {(user?.name ?? 'K').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-0.5">
                    Hồ sơ khách hàng
                  </p>
                  <h1 className="text-lg font-bold text-slate-900">
                    {user?.name ?? 'Khách vãng lai'}
                  </h1>
                  <p className="text-xs text-slate-500">
                    {user ? 'Tài khoản demo tại cửa hàng' : 'Bạn chưa đăng nhập tài khoản cửa hàng'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <User size={16} className="text-violet-500 shrink-0" />
                  <span>{user?.name ?? '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail size={16} className="text-violet-500 shrink-0" />
                  <span>{user?.email ?? '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={16} className="text-violet-500 shrink-0" />
                  <span>{user?.phone ?? '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={16} className="text-violet-500 shrink-0" />
                  <span>Chưa cập nhật địa chỉ</span>
                </div>
              </div>

              {isGuest && (
                <div className="mt-5 rounded-xl bg-violet-50 border border-violet-100 px-4 py-3 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <LogIn size={16} className="mt-0.5 text-violet-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Bạn chưa đăng nhập</p>
                    <p className="mb-2">
                      Đăng nhập với tài khoản demo để xem đầy đủ thông tin hồ sơ:
                    </p>
                    <code className="block text-xs bg-white rounded px-2 py-1 mb-1 text-slate-800">
                      Email: demo@shop.demo — Mật khẩu: 123456
                    </code>
                    <Link
                      to="/ecommerce/store/login"
                      className="inline-flex items-center gap-1 text-violet-700 hover:text-violet-900 font-medium mt-1"
                    >
                      <LogIn size={14} />
                      Đi đến trang đăng nhập
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Menu label giống sidebar tài khoản TMĐT */}
            <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-4 sm:p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Trung tâm tài khoản
              </p>
              <nav className="space-y-1 text-sm">
                {[
                  { icon: User, label: 'Hồ sơ của tôi' },
                  { icon: ShoppingBag, label: 'Đơn mua' },
                  { icon: History, label: 'Lịch sử đơn hàng' },
                  { icon: Ticket, label: 'Khuyến mãi' },
                  { icon: Gift, label: 'Kho voucher' },
                  { icon: Heart, label: 'Sản phẩm yêu thích' },
                  { icon: Package, label: 'Đang giao & chờ đánh giá' },
                  { icon: CreditCard, label: 'Ví & phương thức thanh toán' },
                  { icon: MapPin, label: 'Sổ địa chỉ' },
                  { icon: Bell, label: 'Thông báo & ưu đãi' },
                  { icon: ShieldCheck, label: 'Bảo mật tài khoản' },
                  { icon: Settings, label: 'Cài đặt tài khoản' },
                  { icon: HelpCircle, label: 'Trung tâm hỗ trợ' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-violet-50 text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={16} className="text-violet-500 shrink-0" />
                        {item.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-violet-500 font-semibold">
                        Demo
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Hoạt động & cài đặt */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
                Tóm tắt hoạt động
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Đây là bản demo hồ sơ khách hàng. Khi kết nối backend, khu vực này sẽ hiển thị lịch sử
                đơn hàng, ví voucher và thông tin thanh toán của bạn.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Đơn hàng', value: '0' },
                  { label: 'Đã giao', value: '0' },
                  { label: 'Voucher', value: '0' },
                  { label: 'Sản phẩm yêu thích', value: '0' },
                  { label: 'Đánh giá đã viết', value: '0' },
                  { label: 'Điểm thưởng', value: '0' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3 text-xs sm:text-sm"
                  >
                    <p className="text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Thông tin chi tiết tài khoản */}
            <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
                Thông tin chi tiết tài khoản
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Mã khách hàng
                  </p>
                  <p className="text-slate-900">{user?.id ?? 'demo-guest'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Loại tài khoản
                  </p>
                  <p className="text-slate-900">{user ? 'Khách hàng đã đăng ký' : 'Khách vãng lai'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Trạng thái
                  </p>
                  <p className="text-emerald-600 font-medium">Hoạt động</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Ngày tham gia
                  </p>
                  <p className="text-slate-900">— (demo)</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Email liên hệ
                  </p>
                  <p className="text-slate-900">{user?.email ?? 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Số điện thoại
                  </p>
                  <p className="text-slate-900">{user?.phone ?? 'Chưa cập nhật'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
                Cài đặt & bảo mật
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">Thông tin cá nhân</span>
                  <span className="text-xs text-slate-400 italic">Demo — chưa chỉnh sửa được</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">Địa chỉ giao hàng</span>
                  <span className="text-xs text-slate-400 italic">Demo — chưa chỉnh sửa được</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">Phương thức thanh toán</span>
                  <span className="text-xs text-slate-400 italic">Demo — chưa liên kết ví/thẻ</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">Thiết bị đăng nhập</span>
                  <span className="text-xs text-slate-400 italic">Demo — chưa theo dõi thiết bị</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">Nhật ký hoạt động</span>
                  <span className="text-xs text-slate-400 italic">Demo — chưa có lịch sử</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfilePage;

