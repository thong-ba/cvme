// Staff - Nhân viên: xử lý đơn, chăm sóc KH. Không quyền hệ thống.
import { ArrowLeft, FileText, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaffPage = () => {
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Nhân viên (Staff)</h1>
          <p className="text-sm sm:text-base text-slate-600">
            Xử lý đơn hàng, chăm sóc khách hàng. Không có quyền hệ thống. NÂNG CAO.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: FileText, label: 'Xử lý đơn', desc: 'Xử lý đơn hàng' },
            { icon: MessageCircle, label: 'Chăm sóc KH', desc: 'Hỗ trợ khách hàng' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl bg-white p-4 shadow-md border border-slate-100 flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
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
            Dashboard nhân viên: xử lý đơn và chăm sóc khách hàng sẽ được triển khai tại đây.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
