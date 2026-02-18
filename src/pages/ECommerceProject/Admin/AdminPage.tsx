// Admin Dashboard: thống kê, chart, quick links
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, FileText, Key, FileCode, ChevronRight, BarChart3, Shield } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { adminUsers, adminStatsByDay, adminRoles } from '../../../data/admin';
import { sellerOrders } from '../../../data/seller';
import { products } from '../../../data/ecommerce';
import { formatCurrency, formatDate } from '../../../utils';

const features = [
  { icon: Users, label: 'Quản lý user', desc: 'User & tài khoản', to: '/ecommerce/admin/users', bg: 'bg-red-50', iconColor: 'text-red-600' },
  { icon: Package, label: 'Sản phẩm', desc: 'Quản lý sản phẩm hệ thống', to: '/ecommerce/admin/products', bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { icon: FileText, label: 'Đơn hàng', desc: 'Quản lý đơn hàng', to: '/ecommerce/admin/orders', bg: 'bg-fuchsia-50', iconColor: 'text-fuchsia-600' },
  { icon: Key, label: 'Phân quyền', desc: 'Phân quyền vai trò', to: '/ecommerce/admin/permissions', bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { icon: FileCode, label: 'Nội dung', desc: 'Quản lý nội dung', to: '/ecommerce/admin/content', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
];

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

const AdminPage = () => {
  const totalRevenue = useMemo(() => adminStatsByDay.reduce((s, d) => s + d.revenue, 0), []);
  const totalOrders = useMemo(() => adminStatsByDay.reduce((s, d) => s + d.orders, 0), []);
  //const newUsers = useMemo(() => adminStatsByDay.reduce((s, d) => s + d.users, 0), []);

  const barData = useMemo(
    () =>
      adminStatsByDay.map((d) => ({
        ...d,
        dateShort: formatDate(d.date).replace(/\/\d{4}$/, ''),
      })),
    []
  );

  const rolePieData = useMemo(() => {
    const count: Record<string, number> = {};
    adminUsers.forEach((u) => {
      count[u.role] = (count[u.role] ?? 0) + 1;
    });
    return Object.entries(count).map(([name, value]) => ({ name, value }));
  }, []);

  const orderStatusData = useMemo(() => {
    const count: Record<string, number> = {};
    sellerOrders.forEach((o) => {
      count[o.status] = (count[o.status] ?? 0) + 1;
    });
    const labels: Record<string, string> = {
      pending: 'Chờ xử lý',
      confirmed: 'Đã xác nhận',
      processing: 'Đang xử lý',
      shipping: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy',
    };
    return Object.entries(count).map(([k, value]) => ({ name: labels[k] ?? k, value }));
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Admin</h1>
        <p className="text-sm sm:text-base text-slate-600 hidden">
          Quản lý user, sản phẩm, đơn hàng, phân quyền, nội dung. LUÔN CÓ.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className="group rounded-xl bg-white p-4 shadow-md border border-slate-100 flex items-center gap-3 hover:shadow-lg hover:border-violet-200 transition-all"
            >
              <div className={`p-2 rounded-lg ${item.bg} ${item.iconColor}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-violet-500 shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Stats */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
          <BarChart3 size={22} className="text-violet-600" />
          Thống kê tổng quan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'User', value: String(adminUsers.length), sub: 'Tài khoản' },
            { label: 'Sản phẩm', value: String(products.length), sub: 'Trong hệ thống' },
            { label: 'Đơn hàng (14 ngày)', value: String(totalOrders), sub: 'Đơn' },
            { label: 'Doanh thu (14 ngày)', value: formatCurrency(totalRevenue), sub: 'Tổng' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white border border-slate-100 p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <p className="text-lg font-bold text-slate-900 mt-1 truncate" title={stat.value}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Doanh thu theo ngày (cột)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dateShort" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `${v / 1e6}M`} />
                <Tooltip
                  formatter={(value: number | undefined) => [value != null ? formatCurrency(value) : '—', 'Doanh thu']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Xu hướng doanh thu (đường)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dateShort" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `${v / 1e6}M`} />
                <Tooltip
                  formatter={(value: number | undefined) => [value != null ? formatCurrency(value) : '—', 'Doanh thu']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899' }} name="Doanh thu" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-4">User theo vai trò (tròn)</h3>
          <div className="h-64">
            {rolePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rolePieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine
                  >
                    {rolePieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | undefined) => [value ?? 0, 'Số user']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-500 flex items-center justify-center h-full">Chưa có dữ liệu</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Đơn hàng theo trạng thái (tròn)</h3>
          <div className="h-64">
            {orderStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine
                  >
                    {orderStatusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | undefined) => [value ?? 0, 'Số đơn']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-500 flex items-center justify-center h-full">Chưa có dữ liệu</p>
            )}
          </div>
        </div>
      </div>

      {/* Báo cáo nhanh */}
      <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Shield size={22} className="text-violet-600" />
          <h2 className="font-semibold text-slate-900">Báo cáo nhanh</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-slate-500 mb-1">Tổng doanh thu 14 ngày</p>
            <p className="font-bold text-slate-900 text-lg">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-slate-500 mb-1">Tổng đơn hàng</p>
            <p className="font-bold text-slate-900 text-lg">{sellerOrders.length} đơn</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-slate-500 mb-1">Vai trò trong hệ thống</p>
            <p className="font-bold text-slate-900 text-lg">{adminRoles.length} vai trò</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-slate-500 mb-1">User đang hoạt động</p>
            <p className="font-bold text-slate-900 text-lg">{adminUsers.filter((u) => u.status === 'active').length} user</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
