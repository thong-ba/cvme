import { useState } from 'react';
import { FileText } from 'lucide-react';
import { SellerNavBar, SellerOrderTable } from '../../../components/eCommerce';
import { sellerOrders as initialOrders } from '../../../data/seller';
import type { Order, OrderStatus } from '../../../types/ecommerce';

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SellerNavBar />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Đơn hàng</h1>
            <p className="text-sm text-slate-500">Xử lý và theo dõi đơn hàng của shop</p>
          </div>
        </div>
        <SellerOrderTable orders={orders} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
