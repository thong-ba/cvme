// E-Commerce Project Introduction
import {
  ArrowLeft,
  ShoppingBag,
  User,
  Store,
  Shield,
  Users,
  Package,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectIntroductionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50 relative overflow-x-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-r from-violet-600 to-amber-500 z-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/90 text-sm mb-8 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 border border-white/20 hover:bg-white/25 hover:-translate-x-1"
        >
          <ArrowLeft size={20} />
          Về trang chủ
        </Link>

        <div className="text-center text-white">
          <div className="relative inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white/20 backdrop-blur-md rounded-full mb-6 border-[3px] border-white/30">
            <ShoppingBag size={48} className="text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
              <Sparkles size={16} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 drop-shadow-lg">
            Nền tảng Quản lý Bán hàng
          </h1>
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Hệ thống quản lý bán hàng online với đầy đủ tính năng cho từng vai trò: khách, khách hàng, người bán, admin, nhân viên và kho.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-800 text-sm font-medium border border-white/50 shadow-lg">
              <Package size={14} className="text-violet-600" />
              Quản lý sản phẩm & tồn kho
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-slate-800 text-sm font-medium border border-white/50 shadow-lg">
              <ShoppingBag size={14} className="text-violet-600" />
              Đơn hàng & thanh toán
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <section className="mb-16 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-violet-100">
          <h2 className="text-3xl md:text-4xl font-bold text-violet-600 mb-6 flex items-center gap-3 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-violet-600 after:to-amber-500 after:rounded">
            Giới thiệu dự án
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Nền tảng Quản lý Bán hàng là hệ thống quản lý bán hàng online với đầy đủ tính năng: quản lý sản phẩm, đơn hàng, khách hàng, tồn kho và báo cáo doanh thu. Dashboard trực quan với biểu đồ thống kê real-time, quản lý inventory và order processing. Hệ thống hỗ trợ nhiều vai trò từ khách vãng lai đến quản trị viên.
          </p>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-violet-100">
          <h2 className="text-3xl md:text-4xl font-bold text-violet-600 mb-8 flex items-center gap-3 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-violet-600 after:to-amber-500 after:rounded">
            Tính năng theo vai trò
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Guest - BẮT BUỘC */}
            <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-violet-200 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white mb-5 shadow-lg">
                <User size={24} />
              </div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-3">BẮT BUỘC</span>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Khách vãng lai (Guest)</h3>
              <p className="text-sm text-slate-500 italic mb-4">Chưa đăng nhập</p>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                Xem sản phẩm, tìm kiếm / lọc, xem chi tiết, thêm vào giỏ (local).
              </p>
              <ul className="space-y-1 mb-6 list-none text-sm text-slate-600">
                <li>✓ Xem sản phẩm</li>
                <li>✓ Tìm kiếm / lọc</li>
                <li>✓ Chi tiết sản phẩm</li>
                <li>✓ Thêm vào giỏ (local)</li>
              </ul>
              <Link
                to="/ecommerce/store"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold px-5 py-2.5 bg-violet-50 rounded-full transition-all hover:bg-violet-600 hover:text-white"
              >
                Vào cửa hàng →
              </Link>
            </div>

            {/* Customer - CORE */}
            <div className="group relative bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-emerald-200 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white mb-5 shadow-lg">
                <User size={24} />
              </div>
              <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-3">CORE ROLE</span>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Khách hàng (Customer)</h3>
              <p className="text-sm text-slate-500 italic mb-4">Đã đăng nhập</p>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                Đặt hàng, thanh toán, lịch sử đơn, quản lý hồ sơ, đánh giá sản phẩm.
              </p>
              <ul className="space-y-1 mb-6 list-none text-sm text-slate-600">
                <li>✓ Đặt hàng & thanh toán</li>
                <li>✓ Lịch sử đơn hàng</li>
                <li>✓ Quản lý hồ sơ</li>
                <li>✓ Đánh giá sản phẩm</li>
              </ul>
              <Link
                to="/ecommerce/customer"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold px-5 py-2.5 bg-emerald-50 rounded-full transition-all hover:bg-emerald-600 hover:text-white"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Seller */}
            <div className="group relative bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-amber-200 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mb-5 shadow-lg">
                <Store size={24} />
              </div>
              <span className="inline-block px-3 py-1 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full mb-3">SÀN / NHIỀU SHOP</span>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Người bán (Seller)</h3>
              <p className="text-sm text-slate-500 italic mb-4">Shop Owner</p>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                Quản lý sản phẩm, khuyến mãi, xử lý đơn hàng, xem doanh thu shop.
              </p>
              <ul className="space-y-1 mb-6 list-none text-sm text-slate-600">
                <li>✓ Quản lý sản phẩm</li>
                <li>✓ Tạo khuyến mãi</li>
                <li>✓ Xử lý đơn hàng</li>
                <li>✓ Doanh thu shop</li>
              </ul>
              <Link
                to="/ecommerce/seller"
                className="inline-flex items-center gap-2 text-amber-600 font-semibold px-5 py-2.5 bg-amber-50 rounded-full transition-all hover:bg-amber-600 hover:text-white"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Admin - LUÔN CÓ */}
            <div className="group relative bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-red-200 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white mb-5 shadow-lg">
                <Shield size={24} />
              </div>
              <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full mb-3">LUÔN CÓ</span>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Admin</h3>
              <p className="text-sm text-slate-500 italic mb-4">Quản trị hệ thống</p>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                Quản lý user, sản phẩm, đơn hàng, phân quyền, nội dung.
              </p>
              <ul className="space-y-1 mb-6 list-none text-sm text-slate-600">
                <li>✓ Quản lý user & phân quyền</li>
                <li>✓ Quản lý sản phẩm & đơn hàng</li>
                <li>✓ Quản lý nội dung</li>
              </ul>
              <Link
                to="/ecommerce/admin"
                className="inline-flex items-center gap-2 text-red-600 font-semibold px-5 py-2.5 bg-red-50 rounded-full transition-all hover:bg-red-600 hover:text-white"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Staff */}
            <div className="group relative bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-orange-200 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white mb-5 shadow-lg">
                <Users size={24} />
              </div>
              <span className="inline-block px-3 py-1 bg-orange-200 text-orange-800 text-xs font-semibold rounded-full mb-3">NÂNG CAO</span>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Nhân viên (Staff)</h3>
              <p className="text-sm text-slate-500 italic mb-4">Employee</p>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                Xử lý đơn, chăm sóc khách hàng. Không có quyền hệ thống.
              </p>
              <ul className="space-y-1 mb-6 list-none text-sm text-slate-600">
                <li>✓ Xử lý đơn hàng</li>
                <li>✓ Chăm sóc khách hàng</li>
              </ul>
              <Link
                to="/ecommerce/staff"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold px-5 py-2.5 bg-orange-50 rounded-full transition-all hover:bg-orange-600 hover:text-white"
              >
                Khám phá ngay →
              </Link>
            </div>

            {/* Warehouse */}
            <div className="group relative bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 md:p-8 transition-all duration-400 border-2 border-transparent hover:border-purple-200 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white mb-5 shadow-lg">
                <Package size={24} />
              </div>
              <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 text-xs font-semibold rounded-full mb-3">NÂNG CAO</span>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Kho (Warehouse)</h3>
              <p className="text-sm text-slate-500 italic mb-4">Inventory</p>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                Quản lý tồn kho, cập nhật số lượng, xác nhận xuất kho.
              </p>
              <ul className="space-y-1 mb-6 list-none text-sm text-slate-600">
                <li>✓ Quản lý tồn kho</li>
                <li>✓ Cập nhật số lượng</li>
                <li>✓ Xác nhận xuất kho</li>
              </ul>
              <Link
                to="/ecommerce/warehouse"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold px-5 py-2.5 bg-purple-50 rounded-full transition-all hover:bg-purple-600 hover:text-white"
              >
                Khám phá ngay →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-violet-100">
          <h2 className="text-3xl md:text-4xl font-bold text-violet-600 mb-6 flex items-center gap-3 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-violet-600 after:to-amber-500 after:rounded">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3 mt-6">
            {['React', 'TypeScript', 'Vite', 'React Query', 'REST API', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectIntroductionPage;
