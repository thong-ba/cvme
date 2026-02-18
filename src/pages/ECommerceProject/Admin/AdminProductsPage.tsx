import { useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import { products, categories, brands } from '../../../data/ecommerce';

const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;
const getBrandName = (id: string) => brands.find((b) => b.id === id)?.name ?? id;

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        getCategoryName(p.categoryId).toLowerCase().includes(q) ||
        getBrandName(p.brandId).toLowerCase().includes(q)
    );
  }, [search]);

  const formatPrice = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
          <Package size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quản lý sản phẩm</h1>
          <p className="text-sm text-slate-500">Sản phẩm hệ thống</p>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, danh mục, thương hiệu..."
          className="flex-1 max-w-md px-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
        />
        <span className="text-sm text-slate-500">{filtered.length}/{products.length} sản phẩm</span>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Sản phẩm</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Danh mục</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Thương hiệu</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Giá</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-900">Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900 line-clamp-2">{p.name}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{getCategoryName(p.categoryId)}</td>
                <td className="px-4 py-3 text-slate-600">{getBrandName(p.brandId)}</td>
                <td className="px-4 py-3 text-right font-medium text-slate-900">{formatPrice(p.salePrice ?? p.price)}</td>
                <td className="px-4 py-3 text-center text-slate-600">{p.rating} ★ ({p.reviewCount})</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-6 text-center text-slate-500">Không tìm thấy sản phẩm.</p>
        )}
      </div>
    </div>
  );
}
