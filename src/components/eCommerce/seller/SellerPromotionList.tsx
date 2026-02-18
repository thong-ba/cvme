import type { Promotion } from '../../../types/ecommerce';
import { formatCurrency } from '../../../utils';

interface SellerPromotionListProps {
  promotions: Promotion[];
  productNames?: Record<string, string>;
  onEdit?: (promo: Promotion) => void;
}

function formatPromoValue(p: Promotion): string {
  if (p.type === 'percent') return `Giảm ${p.value}%`;
  return p.value === 0 ? 'Miễn phí ship' : `Giảm ${formatCurrency(p.value)}`;
}

export default function SellerPromotionList({ promotions, productNames = {}, onEdit }: SellerPromotionListProps) {
  if (promotions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Chưa có khuyến mãi. Tạo khuyến mãi để thu hút khách hàng.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {promotions.map((p) => (
        <div
          key={p.id}
          className="rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900">{p.name}</p>
            <p className="text-sm text-slate-600 mt-0.5">
              {formatPromoValue(p)} {p.minOrderAmount ? `· Đơn tối thiểu ${formatCurrency(p.minOrderAmount)}` : ''}
            </p>
            {p.productIds && p.productIds.length > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                Áp dụng: {p.productIds.map((id) => productNames[id] ?? id).join(', ')}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              {p.startDate} → {p.endDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : p.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {p.status === 'active' ? 'Đang áp dụng' : p.status === 'scheduled' ? 'Sắp diễn ra' : 'Đã kết thúc'}
            </span>
            {onEdit && (
              <button type="button" onClick={() => onEdit(p)} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                Sửa
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
