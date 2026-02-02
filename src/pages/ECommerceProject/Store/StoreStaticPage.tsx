import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface StoreStaticPageProps {
  title: string;
  children: React.ReactNode;
}

export default function StoreStaticPage({ title, children }: StoreStaticPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/ecommerce/store"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-6"
      >
        <ArrowLeft size={18} />
        Về trang chủ
      </Link>
      <article className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">{title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
          {children}
        </div>
      </article>
    </div>
  );
}
