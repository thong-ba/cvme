import { Filter, FolderOpen, Tag, DollarSign, Star, ArrowUpDown, X } from 'lucide-react';
import type { Category, Brand } from '../../types/ecommerce';
import type { SortOption } from '../../types/ecommerce';

export interface FilterState {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: SortOption;
}

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  filter: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'popular', label: 'Bán chạy' },
];

const PRICE_CHIPS: { label: string; minPrice?: number; maxPrice?: number }[] = [
  { label: 'Dưới 5tr', maxPrice: 5_000_000 },
  { label: '5–10tr', minPrice: 5_000_000, maxPrice: 10_000_000 },
  { label: '10–20tr', minPrice: 10_000_000, maxPrice: 20_000_000 },
  { label: '20tr+', minPrice: 20_000_000 },
];

const hasActiveFilters = (f: FilterState) =>
  !!f.category || !!f.brand || f.minPrice != null || f.maxPrice != null || f.rating != null;

const FilterSidebar = ({ categories, brands, filter, onFilterChange }: FilterSidebarProps) => {
  const clearAll = () => {
    onFilterChange({
      category: undefined,
      brand: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
    });
  };

  const setPriceChip = (min?: number, max?: number) => {
    onFilterChange({ minPrice: min, maxPrice: max });
  };

  const isChipActive = (min?: number, max?: number) => {
    const a = filter.minPrice === (min ?? undefined);
    const b = filter.maxPrice === (max ?? undefined);
    return a && b;
  };

  return (
    <aside className="rounded-xl bg-white p-4 shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Filter size={18} className="text-violet-600" />
          Bộ lọc
        </h3>
        {hasActiveFilters(filter) && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-violet-600 transition-colors"
          >
            <X size={14} />
            Xóa bộ lọc
          </button>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <FolderOpen size={14} className="text-slate-500" />
          Danh mục
        </p>
        <select
          value={filter.category ?? ''}
          onChange={(e) => onFilterChange({ category: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          <option value="">Tất cả</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <Tag size={14} className="text-slate-500" />
          Thương hiệu
        </p>
        <select
          value={filter.brand ?? ''}
          onChange={(e) => onFilterChange({ brand: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          <option value="">Tất cả</option>
          {brands.map((b) => (
            <option key={b.id} value={b.slug}>{b.name}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <DollarSign size={14} className="text-slate-500" />
          Khoảng giá (VNĐ)
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {PRICE_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setPriceChip(chip.minPrice, chip.maxPrice)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isChipActive(chip.minPrice, chip.maxPrice)
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-violet-100 hover:text-violet-700'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Từ"
            value={filter.minPrice ?? ''}
            onChange={(e) => onFilterChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
            min={0}
          />
          <input
            type="number"
            placeholder="Đến"
            value={filter.maxPrice ?? ''}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
            min={0}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <Star size={14} className="text-slate-500" />
          Đánh giá
        </p>
        <select
          value={filter.rating ?? ''}
          onChange={(e) => onFilterChange({ rating: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          <option value="">Tất cả</option>
          {[5, 4, 3].map((r) => (
            <option key={r} value={r}>Từ {r} sao trở lên</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <ArrowUpDown size={14} className="text-slate-500" />
          Sắp xếp
        </p>
        <select
          value={filter.sort ?? 'newest'}
          onChange={(e) => onFilterChange({ sort: e.target.value as SortOption })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
