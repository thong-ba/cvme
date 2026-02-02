import { Truck, Shield, RefreshCw, CreditCard } from 'lucide-react';

const items = [
  { icon: Truck, label: 'Miễn phí vận chuyển', sub: 'Đơn từ 500K' },
  { icon: RefreshCw, label: 'Đổi trả 7 ngày', sub: 'Hàng chính hãng' },
  { icon: Shield, label: 'Bảo hành chính hãng', sub: '1-2 năm' },
  { icon: CreditCard, label: 'Thanh toán an toàn', sub: 'Ví, thẻ, COD' },
];

const TrustStrip = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 border-b border-amber-400/30 relative overflow-hidden">
      {/* Trang trí Tết: hoa mai / pattern nhẹ */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2 L22 8 L28 8 L23 12 L25 18 L20 14 L15 18 L17 12 L12 8 L18 8 Z' fill='%23fff'/%3E%3C/svg%3E")`,
      }} />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 relative">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-100 text-xs font-bold border border-amber-300/40">
            🧧 Chúc mừng năm mới
          </span>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 text-white hover:text-amber-100 transition-colors"
              >
                <div className="p-2 rounded-full bg-white/20 shadow-sm text-amber-100">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{item.label}</p>
                  <p className="text-xs text-amber-100/90">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
