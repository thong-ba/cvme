import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Package } from 'lucide-react';
import type { Brand } from '../../types/ecommerce';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  apple: Laptop,
  samsung: Smartphone,
  sony: Headphones,
  xiaomi: Smartphone,
  dell: Laptop,
  hp: Laptop,
};

const defaultIcon = Package;

interface FeaturedBrandsProps {
  brands: Brand[];
  featuredSlugs: string[];
}

const FeaturedBrands = ({ brands, featuredSlugs }: FeaturedBrandsProps) => {
  const featured = brands.filter((b) => featuredSlugs.includes(b.slug));

  return (
    <section className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Package size={20} className="text-violet-600" />
        Thương hiệu nổi bật
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {featured.map((brand) => {
          const Icon = CATEGORY_ICONS[brand.slug] ?? defaultIcon;
          return (
            <Link
              key={brand.id}
              to={`/ecommerce/store/products?brand=${brand.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-full bg-white shadow-sm text-violet-600 group-hover:bg-violet-100 transition-colors">
                <Icon size={28} />
              </div>
              <span className="font-medium text-slate-800 text-sm group-hover:text-violet-700 transition-colors">
                {brand.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedBrands;
