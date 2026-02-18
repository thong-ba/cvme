import { useState, useMemo, Fragment } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Order, OrderStatus } from '../../../types/ecommerce';
import { formatCurrency, formatDate } from '../../../utils';
import { toastSuccess } from '../../../utils/toast';

const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

const statusClass: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-violet-100 text-violet-700',
  shipping: 'bg-sky-100 text-sky-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-slate-100 text-slate-600',
};

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'];

interface SellerOrderTableProps {
  orders: Order[];
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

export default function SellerOrderTable({ orders, onStatusChange }: SellerOrderTableProps) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOrderId, setModalOrderId] = useState<string | null>(null);
  const [modalStatus, setModalStatus] = useState<OrderStatus>('pending');

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const handleOpenModal = (order: Order) => {
    setModalOrderId(order.id);
    setModalStatus(order.status);
  };

  const handleSaveStatus = () => {
    if (!modalOrderId || !onStatusChange) return;
    onStatusChange(modalOrderId, modalStatus);
    toastSuccess('Đã cập nhật trạng thái đơn hàng.');
    setModalOrderId(null);
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['all', ...STATUS_OPTIONS] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === key
                ? 'bg-amber-500 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {key === 'all' ? 'Tất cả' : statusLabel[key]}
          </button>
        ))}
        <span className="self-center text-sm text-slate-500 ml-2">{filtered.length} đơn</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-8 px-2 py-3" />
              <th className="px-4 py-3 font-semibold text-slate-900">Mã đơn</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Khách hàng</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Tổng tiền</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Trạng thái</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Ngày đặt</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const isExpanded = expandedId === order.id;
              return (
                <Fragment key={order.id}>
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 hover:bg-slate-50/50"
                  >
                    <td className="px-2 py-2">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : order.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600"
                        aria-label={isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                      >
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-900">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{order.fullName}</p>
                      <p className="text-xs text-slate-500">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[order.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {statusLabel[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => handleOpenModal(order)}
                          className="text-amber-600 hover:text-amber-700 font-medium text-xs"
                        >
                          Xử lý
                        </button>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="rounded-lg bg-white border border-slate-100 p-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Chi tiết đơn · {order.items.length} sản phẩm</p>
                          <ul className="space-y-2">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between text-sm">
                                <span className="text-slate-700">{item.productName} × {item.quantity}</span>
                                <span className="font-medium text-slate-900">{formatCurrency((item.salePrice ?? item.price) * item.quantity)}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-slate-500 mt-2">Địa chỉ: {order.shippingAddress}</p>
                          {order.note && <p className="text-xs text-slate-500">Ghi chú: {order.note}</p>}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModalOrderId(null)}>
          <div className="rounded-2xl bg-white shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-slate-900 mb-4">Cập nhật trạng thái đơn {modalOrderId}</h3>
            <select
              value={modalStatus}
              onChange={(e) => setModalStatus(e.target.value as OrderStatus)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none mb-4"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{statusLabel[s]}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button type="button" onClick={() => setModalOrderId(null)} className="flex-1 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
                Hủy
              </button>
              <button type="button" onClick={handleSaveStatus} className="flex-1 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
