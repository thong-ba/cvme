import { useState } from 'react';
import { Tag } from 'lucide-react';
import { SellerNavBar, SellerPromotionList } from '../../../components/eCommerce';
import { sellerPromotions as initialPromotions } from '../../../data/seller';
import { products } from '../../../data/ecommerce';
import type { Promotion } from '../../../types/ecommerce';
import { toastSuccess } from '../../../utils/toast';

const productNames: Record<string, string> = {};
products.forEach((p) => { productNames[p.id] = p.name; });

export default function SellerPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [form, setForm] = useState({
    name: '',
    type: 'percent' as 'percent' | 'fixed',
    value: 0,
    minOrderAmount: 0,
    startDate: '',
    endDate: '',
    status: 'active' as Promotion['status'],
  });

  const openCreate = () => {
    setForm({
      name: '',
      type: 'percent',
      value: 15,
      minOrderAmount: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      status: 'active',
    });
    setEditingPromo(null);
    setShowModal(true);
  };

  const openEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setForm({
      name: promo.name,
      type: promo.type,
      value: promo.value,
      minOrderAmount: promo.minOrderAmount ?? 0,
      startDate: promo.startDate,
      endDate: promo.endDate,
      status: promo.status,
    });
    setShowModal(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (editingPromo) {
      setPromotions((prev) =>
        prev.map((p) => (p.id === editingPromo.id ? { ...p, ...form, minOrderAmount: form.minOrderAmount || undefined } : p))
      );
      toastSuccess('Đã cập nhật khuyến mãi.');
    } else {
      setPromotions((prev) => [
        ...prev,
        {
          id: 'P-' + Date.now(),
          ...form,
          minOrderAmount: form.minOrderAmount || undefined,
        },
      ]);
      toastSuccess('Đã tạo khuyến mãi mới.');
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SellerNavBar />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Tag size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Khuyến mãi</h1>
            <p className="text-sm text-slate-500">Tạo & quản lý mã giảm giá, flash sale</p>
          </div>
        </div>
        <SellerPromotionList promotions={promotions} productNames={productNames} onEdit={openEdit} />
        <div className="mt-6">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            <Tag size={18} />
            Tạo khuyến mãi mới
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowModal(false)}>
          <div className="rounded-2xl bg-white shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-slate-900 mb-4">{editingPromo ? 'Chỉnh sửa khuyến mãi' : 'Tạo khuyến mãi mới'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Tên khuyến mãi</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  placeholder="VD: Giảm 20% đơn từ 5M"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Loại</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'percent' | 'fixed' }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  >
                    <option value="percent">Theo %</option>
                    <option value="fixed">Số tiền cố định</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Giá trị</label>
                  <input
                    type="number"
                    value={form.value || ''}
                    onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    placeholder={form.type === 'percent' ? '15' : '500000'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Đơn tối thiểu (VNĐ, tùy chọn)</label>
                <input
                  type="number"
                  value={form.minOrderAmount || ''}
                  onChange={(e) => setForm((f) => ({ ...f, minOrderAmount: Number(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Từ ngày</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Đến ngày</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
                Hủy
              </button>
              <button type="button" onClick={save} className="flex-1 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600">
                {editingPromo ? 'Lưu' : 'Tạo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
