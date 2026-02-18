import { Package } from 'lucide-react';
import { SellerNavBar, SellerProductTable } from '../../../components/eCommerce';
import { products, categories, brands } from '../../../data/ecommerce';
import { sellerProductIds } from '../../../data/seller';

const sellerProducts = products.filter((p) => sellerProductIds.includes(p.id));

export default function SellerProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SellerNavBar />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Quản lý sản phẩm</h1>
            <p className="text-sm text-slate-500">{sellerProducts.length} sản phẩm của shop</p>
          </div>
        </div>
        <SellerProductTable products={sellerProducts} categories={categories} brands={brands} />
      </div>
    </div>
  );
}
