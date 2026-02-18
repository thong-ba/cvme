// Seller - Người bán: quản lý SP, khuyến mãi, đơn hàng, doanh thu shop
import { useState, useMemo } from 'react';
import { Package, Tag, FileText, TrendingUp, ChevronRight, Store, BarChart3, PieChart, LineChart, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
  LineChart as RechartsLine,
  Line,
} from 'recharts';
import { SellerNavBar } from '../../../components/eCommerce';
import { sellerProductIds, sellerOrders, sellerRevenueByDay, sellerPromotions } from '../../../data/seller';
import { formatCurrency, formatDate } from '../../../utils';

const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

const features = [
  { icon: Package, label: 'Sản phẩm', desc: 'Quản lý sản phẩm', to: '/ecommerce/seller/products', bg: 'bg-amber-50', iconColor: 'text-amber-600', hoverBorder: 'hover:border-amber-200' },
  { icon: Tag, label: 'Khuyến mãi', desc: 'Tạo & quản lý khuyến mãi', to: '/ecommerce/seller/promotions', bg: 'bg-orange-50', iconColor: 'text-orange-600', hoverBorder: 'hover:border-orange-200' },
  { icon: FileText, label: 'Đơn hàng', desc: 'Xử lý đơn hàng', to: '/ecommerce/seller/orders', bg: 'bg-violet-50', iconColor: 'text-violet-600', hoverBorder: 'hover:border-violet-200' },
  { icon: TrendingUp, label: 'Doanh thu', desc: 'Xem doanh thu shop', to: '/ecommerce/seller/revenue', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', hoverBorder: 'hover:border-emerald-200' },
];

const totalRevenue14d = sellerRevenueByDay.reduce((s, d) => s + d.revenue, 0);
const orders14d = sellerRevenueByDay.reduce((s, d) => s + d.orders, 0);
const activePromos = sellerPromotions.filter((p) => p.status === 'active').length;
const recentOrders = [...sellerOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

const COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#94a3b8'];

const SellerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const barChartData = useMemo(
    () =>
      sellerRevenueByDay.map((d) => ({
        ...d,
        dateShort: formatDate(d.date).replace(/\/\d{4}$/, ''),
      })),
    []
  );

  const orderStatusPieData = useMemo(() => {
    const count: Record<string, number> = {};
    sellerOrders.forEach((o) => {
      count[o.status] = (count[o.status] ?? 0) + 1;
    });
    return Object.entries(count).map(([status, value]) => ({
      name: statusLabel[status] ?? status,
      value,
    }));
  }, []);

  const lineChartData = useMemo(
    () =>
      sellerRevenueByDay.map((d) => ({
        ...d,
        dateShort: formatDate(d.date).replace(/\/\d{4}$/, ''),
      })),
    []
  );

  const filteredRecentOrders = useMemo(() => {
    if (!searchQuery.trim()) return recentOrders;
    const q = searchQuery.trim().toLowerCase();
    return recentOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.fullName.toLowerCase().includes(q) ||
        formatCurrency(o.totalAmount).toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <SellerNavBar searchValue={searchQuery} onSearchChange={setSearchQuery} />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-amber-200 text-amber-700 text-xs font-medium mb-4 shadow-sm">
          <Store size={14} />
          SÀN / NHIỀU SHOP
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Người bán</h1>
        <p className="text-slate-600 max-w-xl mb-6 hidden">
          Quản lý sản phẩm, tạo khuyến mãi, xử lý đơn hàng, xem doanh thu shop.
        </p>

        {/* 4 feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {features.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className={`shrink-0 w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-105 transition-transform ${item.iconColor}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight size={20} className="shrink-0 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </>
            );
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex items-center gap-4 transition-all duration-300 ${item.hoverBorder} hover:shadow-lg hover:-translate-y-0.5 cursor-pointer`}
              >
                {content}
              </Link>
            );
          })}
        </div>

        {/* Thống kê doanh thu */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
            <BarChart3 size={22} className="text-amber-600" />
            Thống kê doanh thu
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Sản phẩm', value: String(sellerProductIds.length), sub: 'Đang bán' },
              { label: 'Đơn (14 ngày)', value: String(orders14d), sub: 'Đơn hàng' },
              { label: 'Doanh thu (14 ngày)', value: formatCurrency(totalRevenue14d), sub: 'Tổng' },
              { label: 'Khuyến mãi', value: String(activePromos), sub: 'Đang áp dụng' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/90 border border-slate-100 p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-lg font-bold text-slate-900 mt-1 truncate" title={stat.value}>{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Biểu đồ: Cột + Đường + Tròn */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
                <BarChart3 size={20} className="text-amber-600" />
                Doanh thu theo ngày (cột)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="dateShort" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `${v / 1e6}M`} />
                    <Tooltip
                      formatter={(value: number | undefined) => [value != null ? formatCurrency(value) : '—', 'Doanh thu']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Doanh thu" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
                <LineChart size={20} className="text-emerald-600" />
                Xu hướng doanh thu (đường)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLine data={lineChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="dateShort" tick={{ fontSize: 11 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `${v / 1e6}M`} />
                    <Tooltip
                      formatter={(value: number | undefined) => [value != null ? formatCurrency(value) : '—', 'Doanh thu']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="Doanh thu" />
                  </RechartsLine>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6 lg:col-span-2">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
                <PieChart size={20} className="text-violet-600" />
                Phân bố đơn hàng theo trạng thái (tròn)
              </h3>
              <div className="h-64 flex justify-center">
                {orderStatusPieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={orderStatusPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine
                      >
                        {orderStatusPieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number | undefined) => [value ?? 0, 'Số đơn']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-slate-500 self-center">Chưa có dữ liệu đơn hàng.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Báo cáo */}
        <section className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <ClipboardList size={22} className="text-amber-600" />
            <h2 className="font-semibold text-slate-900">Báo cáo nhanh</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-slate-500 mb-1">Tổng doanh thu 14 ngày</p>
              <p className="font-bold text-slate-900 text-lg">{formatCurrency(totalRevenue14d)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-slate-500 mb-1">Tổng đơn hàng</p>
              <p className="font-bold text-slate-900 text-lg">{sellerOrders.length} đơn</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-slate-500 mb-1">Đơn trung bình</p>
              <p className="font-bold text-slate-900 text-lg">
                {sellerOrders.length ? formatCurrency(Math.round(totalRevenue14d / sellerOrders.length)) : '—'}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-slate-500 mb-1">Khuyến mãi đang chạy</p>
              <p className="font-bold text-slate-900 text-lg">{activePromos} chương trình</p>
            </div>
          </div>
        </section>

        {/* Đơn hàng gần đây + Search */}
        <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-slate-900">Đơn hàng gần đây</h2>
              <p className="text-sm text-slate-500 mt-0.5">5 đơn mới nhất · Tìm kiếm phía trên nav</p>
            </div>
            <Link to="/ecommerce/seller/orders" className="text-sm font-medium text-amber-600 hover:text-amber-700">
              Xem tất cả →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-2 text-left font-semibold text-slate-900">Mã đơn</th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900">Khách hàng</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Tổng tiền</th>
                  <th className="px-4 py-2 text-center font-semibold text-slate-900">Trạng thái</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-2 font-mono text-slate-900">{order.id}</td>
                    <td className="px-4 py-2 text-slate-700">{order.fullName}</td>
                    <td className="px-4 py-2 text-right font-medium text-slate-900">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700">
                        {statusLabel[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right text-slate-500">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRecentOrders.length === 0 && (
            <p className="p-6 text-center text-slate-500">
              {searchQuery.trim() ? 'Không tìm thấy đơn phù hợp.' : 'Chưa có đơn hàng.'}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Tổng quan</h2>
            <p className="text-sm text-slate-500 mt-0.5">Sản phẩm, đơn hàng, khuyến mãi và doanh thu — truy cập nhanh từ thanh điều hướng hoặc thẻ phía trên.</p>
          </div>
          <div className="p-8 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/ecommerce/seller/products" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors">
                <Package size={18} />
                Sản phẩm
              </Link>
              <Link to="/ecommerce/seller/orders" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                Đơn hàng
              </Link>
              <Link to="/ecommerce/seller/revenue" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                Doanh thu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
