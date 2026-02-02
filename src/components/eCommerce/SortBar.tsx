import type { SortOption } from '../../types/ecommerce';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'popular', label: 'Bán chạy' },
];

interface SortBarProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  total: number;
}

const SortBar = ({ sort, onSortChange, total }: SortBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-900">{total}</span> sản phẩm
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 whitespace-nowrap">Sắp xếp:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortBar;
