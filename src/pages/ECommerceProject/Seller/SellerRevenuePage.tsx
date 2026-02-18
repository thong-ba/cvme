import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, ShoppingBag, Package, FileText } from 'lucide-react';
import { SellerNavBar, SellerRevenueChart } from '../../../components/eCommerce';
import { sellerRevenueByDay, sellerOrders, sellerTopProducts } from '../../../data/seller';
import { formatCurrency } from '../../../utils';

export default function SellerRevenuePage() {
  const totalRevenue = useMemo(
    () => sellerRevenueByDay.reduce((s, d) => s + d.revenue, 0),
    []
  );
  const totalOrders = useMemo(
    () => sellerRevenueByDay.reduce((s, d) => s + d.orders, 0),
    []
  );
  const pendingOrders = useMemo(
    () => sellerOrders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length,
    []
  );

  const recentOrders = useMemo(
    () => [...sellerOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SellerNavBar />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <TrendingUp size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Doanh thu</h1>
            <p className="text-sm text-slate-500">Theo dõi doanh thu và đơn hàng</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Tổng doanh thu (14 ngày)</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Tổng đơn (14 ngày)</p>
              <p className="text-lg font-bold text-slate-900">{totalOrders}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Đơn chờ xử lý</p>
              <p className="text-lg font-bold text-slate-900">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <SellerRevenueChart data={sellerRevenueByDay} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <Package size={20} className="text-amber-600" />
              <h3 className="font-semibold text-slate-900">Top sản phẩm bán chạy</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-4 py-2 text-left font-semibold text-slate-900">#</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900">Sản phẩm</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-900">SL bán</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-900">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerTopProducts.slice(0, 8).map((row, idx) => (
                    <tr key={row.productId} className="border-b border-slate-50">
                      <td className="px-4 py-2 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-2">
                        <Link to={`/ecommerce/store/product/${row.productSlug}`} className="font-medium text-slate-900 hover:text-amber-600 line-clamp-2">
                          {row.productName}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-right font-medium text-slate-700">{row.quantitySold}</td>
                      <td className="px-4 py-2 text-right font-medium text-amber-600">{formatCurrency(row.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-violet-600" />
                <h3 className="font-semibold text-slate-900">Đơn hàng gần đây</h3>
              </div>
              <Link to="/ecommerce/seller/orders" className="text-sm font-medium text-amber-600 hover:text-amber-700">
                Xem tất cả
              </Link>
            </div>
            <ul className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <li key={order.id} className="px-4 py-3 hover:bg-slate-50/50">
                  <Link to="/ecommerce/seller/orders" className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-900">{order.id}</p>
                      <p className="text-xs text-slate-500">{order.fullName} · {order.items.length} SP</p>
                    </div>
                    <span className="font-medium text-slate-900">{formatCurrency(order.totalAmount)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {recentOrders.length === 0 && (
              <p className="px-4 py-6 text-center text-slate-500 text-sm">Chưa có đơn hàng.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
