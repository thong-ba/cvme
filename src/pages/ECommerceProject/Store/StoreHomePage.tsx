import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BannerCarousel from '../../../components/eCommerce/BannerCarousel';
import CategoryList from '../../../components/eCommerce/CategoryList';
import FlashSale from '../../../components/eCommerce/FlashSale';
import ProductGrid from '../../../components/eCommerce/ProductGrid';
import FeaturedBrands from '../../../components/eCommerce/FeaturedBrands';
import {
  banners,
  categories,
  brands,
  products,
  flashSaleProductIds,
  flashSaleEndAt,
  bestSellerIds,
  featuredBrandSlugs,
} from '../../../data/ecommerce';

const StoreHomePage = () => {
  const flashSaleProducts = useMemo(
    () => products.filter((p) => flashSaleProductIds.includes(p.id)),
    []
  );
  const bestSellerProducts = useMemo(
    () => products.filter((p) => bestSellerIds.includes(p.id)),
    []
  );
  const suggestedProducts = useMemo(
    () => products.filter((p) => !flashSaleProductIds.includes(p.id)).slice(0, 10),
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <BannerCarousel banners={banners} autoPlayMs={5000} />
      <div className="mt-6 sm:mt-8">
        <CategoryList categories={categories} />
      </div>
      <div className="mt-6 sm:mt-8">
        <FlashSale products={flashSaleProducts} endAt={flashSaleEndAt} />
      </div>
      <div className="mt-6 sm:mt-8">
        <ProductGrid products={bestSellerProducts} title="Bán chạy nhất" showFlashSale />
      </div>
      <div className="mt-6 sm:mt-8">
        <FeaturedBrands brands={brands} featuredSlugs={featuredBrandSlugs} />
      </div>
      <div className="mt-6 sm:mt-8">
        <ProductGrid products={suggestedProducts} title="Gợi ý mua hàng" />
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/ecommerce/store/products"
          className="inline-flex items-center px-5 py-2.5 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default StoreHomePage;
