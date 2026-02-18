// Customer - Khách hàng: đặt hàng, thanh toán, lịch sử đơn, hồ sơ, đánh giá
import { ArrowLeft, User, ShoppingBag, CreditCard, History, Star, ChevronRight, Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ShoppingBag,
    label: 'Đơn hàng',
    desc: 'Đặt hàng & theo dõi',
    to: '/ecommerce/customer/order',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    hoverBorder: 'hover:border-violet-200',
  },
  {
    icon: CreditCard,
    label: 'Thanh toán',
    desc: 'Thanh toán đơn hàng',
    to: undefined,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-200',
  },
  {
    icon: History,
    label: 'Lịch sử đơn',
    desc: 'Xem lịch sử mua hàng',
    to: undefined,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBorder: 'hover:border-amber-200',
  },
  {
    icon: User,
    label: 'Hồ sơ',
    desc: 'Quản lý thông tin cá nhân',
    to: undefined,
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    hoverBorder: 'hover:border-sky-200',
  },
  {
    icon: Star,
    label: 'Đánh giá',
    desc: 'Đánh giá sản phẩm',
    to: undefined,
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    hoverBorder: 'hover:border-rose-200',
  },
];

const CustomerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 via-fuchsia-50/60 to-amber-50/80 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        <Link
          to="/ecommerce"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 mb-6 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Về giới thiệu dự án
        </Link>

        {/* Hero */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-violet-100 text-violet-700 text-xs font-medium mb-4 shadow-sm">
            <Sparkles size={14} />
            CORE ROLE
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Khách hàng
          </h1>
          <p className="text-slate-600 max-w-xl">
            Đặt hàng, thanh toán, xem lịch sử đơn, quản lý hồ sơ và đánh giá sản phẩm — mọi thứ tại một nơi.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {features.map((item) => {
            const Icon = item.icon;
            const cardClass = `group rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-4 transition-all duration-300 ${item.hoverBorder} ${item.to ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : ''}`;
            const content = (
              <>
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-105 transition-transform ${item.iconColor}`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                {item.to && (
                  <ChevronRight size={20} className="shrink-0 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
                )}
              </>
            );
            return item.to ? (
              <Link key={item.label} to={item.to} className={cardClass}>
                {content}
              </Link>
            ) : (
              <div key={item.label} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Đơn hàng', value: '0', icon: Package, sub: 'Đang xử lý' },
            { label: 'Đã giao', value: '0', icon: ShoppingBag, sub: 'Tháng này' },
            { label: 'Đánh giá', value: '0', icon: Star, sub: 'Đã viết' },
            { label: 'Voucher', value: '0', icon: CreditCard, sub: 'Có thể dùng' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/90 backdrop-blur border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon size={16} className="text-slate-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Main content area */}
        <div className="rounded-2xl bg-white/95 backdrop-blur shadow-lg border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Tổng quan</h2>
            <p className="text-sm text-slate-500 mt-0.5">Hoạt động và gợi ý dành cho bạn</p>
          </div>
          <div className="p-8 sm:p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mx-auto mb-5">
                <ShoppingBag size={36} className="text-violet-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có hoạt động gần đây</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Khi bạn đặt hàng, thanh toán hoặc đánh giá sản phẩm, thông tin sẽ hiển thị tại đây.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/ecommerce/store"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <ShoppingBag size={18} />
                  Mua sắm ngay
                </Link>
                <Link
                  to="/ecommerce/customer/order"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Đặt hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
