import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Watch, Package, Tablet } from 'lucide-react';
import type { Category } from '../../types/ecommerce';

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'dien-thoai': Smartphone,
  laptop: Laptop,
  'tai-nghe': Headphones,
  'dong-ho': Watch,
  'phu-kien': Package,
  tablet: Tablet,
};

const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Danh mục</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.slug] || Package;
          return (
            <Link
              key={cat.id}
              to={`/ecommerce/store/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                <Icon size={24} />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-violet-700 text-center line-clamp-2">
                {cat.name}
              </span>
              {cat.productCount != null && (
                <span className="text-xs text-slate-500">{cat.productCount} SP</span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryList;
