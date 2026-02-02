import { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import type { Product } from '../../types/ecommerce';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFlashSale?: boolean;
  enableQuickView?: boolean;
}

const ProductGrid = ({ products, title, showFlashSale, enableQuickView = true }: ProductGridProps) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (!products.length) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center">
        <p className="text-slate-500">Chưa có sản phẩm nào.</p>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
        {title && (
          <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFlashSale={showFlashSale}
              onQuickView={enableQuickView ? (p) => setQuickViewProduct(p) : undefined}
            />
          ))}
        </div>
      </section>
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default ProductGrid;
