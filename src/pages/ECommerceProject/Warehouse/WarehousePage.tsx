// Warehouse - Kho: quản lý tồn kho, cập nhật SL, xác nhận xuất kho
import { ArrowLeft, Package, Boxes, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const WarehousePage = () => {
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Kho (Warehouse)</h1>
          <p className="text-sm sm:text-base text-slate-600">
            Quản lý tồn kho, cập nhật số lượng, xác nhận xuất kho. NÂNG CAO.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Boxes, label: 'Tồn kho', desc: 'Quản lý tồn kho' },
            { icon: Package, label: 'Cập nhật SL', desc: 'Cập nhật số lượng' },
            { icon: ClipboardCheck, label: 'Xuất kho', desc: 'Xác nhận xuất kho' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl bg-white p-4 shadow-md border border-slate-100 flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-6">
          <p className="text-slate-600 text-center py-8">
            Dashboard kho: quản lý tồn kho, cập nhật số lượng và xác nhận xuất kho sẽ được triển khai tại đây.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarehousePage;
