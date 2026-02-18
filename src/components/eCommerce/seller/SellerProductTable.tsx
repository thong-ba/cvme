import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, EyeOff } from 'lucide-react';
import type { Product } from '../../../types/ecommerce';
import type { Category, Brand } from '../../../types/ecommerce';
import { formatCurrency } from '../../../utils';
import { toastSuccess } from '../../../utils/toast';

interface SellerProductTableProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
}

export default function SellerProductTable({ products, categories, brands }: SellerProductTableProps) {
  const [search, setSearch] = useState('');
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        categories.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(q) ||
        brands.find((b) => b.id === p.brandId)?.name.toLowerCase().includes(q)
    );
  }, [products, search, categories, brands]);

  const toggleVisible = (id: string, name: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toastSuccess(`Đã hiển thị lại "${name}"`);
      } else {
        next.add(id);
        toastSuccess(`Đã ẩn "${name}" khỏi gian hàng`);
      }
      return next;
    });
  };

  const getCategoryName = (categoryId: string) => categories.find((c) => c.id === categoryId)?.name ?? '—';
  const getBrandName = (brandId: string) => brands.find((b) => b.id === brandId)?.name ?? '—';

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Chưa có sản phẩm nào. Thêm sản phẩm từ cửa hàng để bắt đầu bán.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, danh mục, thương hiệu..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
          />
        </div>
        <p className="text-sm text-slate-500 self-center">
          {filtered.length} / {products.length} sản phẩm
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-900">Sản phẩm</th>
              <th className="px-4 py-3 font-semibold text-slate-900 hidden md:table-cell">Danh mục</th>
              <th className="px-4 py-3 font-semibold text-slate-900 hidden lg:table-cell">Thương hiệu</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Giá</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Tồn kho</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Trạng thái</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const stock = p.variants ? p.variants.reduce((s, v) => s + v.stock, 0) : (p.inStock ? 1 : 0);
              const isHidden = hiddenIds.has(p.id);
              return (
                <tr key={p.id} className={`border-b border-slate-100 hover:bg-slate-50/50 ${isHidden ? 'opacity-60 bg-slate-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.thumbnail} alt={p.name} className="h-12 w-12 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="font-medium text-slate-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.reviewCount} đánh giá · {p.rating}★</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-600">{getCategoryName(p.categoryId)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{getBrandName(p.brandId)}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-900">{formatCurrency(p.salePrice ?? p.price)}</span>
                    {p.salePrice && (
                      <span className="ml-1 text-xs text-slate-400 line-through">{formatCurrency(p.price)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={stock > 0 ? 'text-emerald-600 font-medium' : 'text-red-600'}>{stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    {isHidden ? (
                      <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-slate-200 text-slate-600">Đã ẩn</span>
                    ) : (
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {p.inStock ? 'Đang bán' : 'Hết hàng'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleVisible(p.id, p.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                        title={isHidden ? 'Hiện lại' : 'Ẩn khỏi gian hàng'}
                      >
                        {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <Link
                        to={`/ecommerce/store/product/${p.slug}`}
                        className="text-amber-600 hover:text-amber-700 font-medium text-xs"
                      >
                        Xem
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-6">Không tìm thấy sản phẩm phù hợp.</p>
      )}
    </div>
  );
}
