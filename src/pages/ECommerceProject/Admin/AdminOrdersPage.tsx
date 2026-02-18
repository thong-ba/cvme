import { FileText } from 'lucide-react';
import { sellerOrders } from '../../../data/seller';
import { formatCurrency, formatDate } from '../../../utils';

const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function AdminOrdersPage() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
          <FileText size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quản lý đơn hàng</h1>
          <p className="text-sm text-slate-500">Toàn bộ đơn hàng hệ thống</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Mã đơn</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Khách hàng</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Tổng tiền</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-900">Trạng thái</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Ngày đặt</th>
            </tr>
          </thead>
          <tbody>
            {sellerOrders.map((order) => (
              <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono font-medium text-slate-900">{order.id}</td>
                <td className="px-4 py-3 text-slate-700">{order.fullName}</td>
                <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(order.totalAmount)}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700">{statusLabel[order.status] ?? order.status}</span>
                </td>
                <td className="px-4 py-3 text-right text-slate-500">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
