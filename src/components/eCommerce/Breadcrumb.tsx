import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4 flex-wrap">
      <Link to="/ecommerce/store" className="hover:text-violet-600 transition-colors">
        Trang chủ
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          {item.href ? (
            <Link to={item.href} className="hover:text-violet-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
