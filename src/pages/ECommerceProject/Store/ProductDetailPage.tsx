import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Breadcrumb, { type BreadcrumbItem } from '../../../components/eCommerce/Breadcrumb';
import ProductImageGallery from '../../../components/eCommerce/ProductImageGallery';
import ProductInfo from '../../../components/eCommerce/ProductInfo';
import ProductDescription from '../../../components/eCommerce/ProductDescription';
import ProductReviews from '../../../components/eCommerce/ProductReviews';
import { products, categories, reviews } from '../../../data/ecommerce';

const ProductDetailPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = products.find((p) => p.slug === productSlug);
  const category = product ? categories.find((c) => c.id === product.categoryId) : null;
  const productReviews = product ? reviews.filter((r) => r.productId === product.id) : [];

  const breadcrumbItems: BreadcrumbItem[] = [];
  if (category) breadcrumbItems.push({ label: category.name, href: `/ecommerce/store/category/${category.slug}` });
  if (product) breadcrumbItems.push({ label: product.name, href: undefined });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 text-center">
        <p className="text-slate-600 mb-4">Không tìm thấy sản phẩm.</p>
        <Link to="/ecommerce/store" className="text-violet-600 hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <ProductImageGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className="mt-8">
        <ProductDescription description={product.description} />
      </div>
      <div className="mt-8">
        <ProductReviews
          reviews={productReviews}
          productName={product.name}
          averageRating={product.rating}
          totalCount={product.reviewCount}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
