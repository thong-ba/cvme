import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import Breadcrumb, { type BreadcrumbItem } from '../../../components/eCommerce/Breadcrumb';
import FilterSidebar, { type FilterState } from '../../../components/eCommerce/FilterSidebar';
import SortBar from '../../../components/eCommerce/SortBar';
import ProductGrid from '../../../components/eCommerce/ProductGrid';
import ProductListPagination from '../../../components/eCommerce/ProductListPagination';
import { categories, brands, products } from '../../../data/ecommerce';
import type { SortOption } from '../../../types/ecommerce';

const PAGE_SIZE = 12;

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug: paramCategorySlug } = useParams<{ categorySlug?: string }>();
  const categorySlug = paramCategorySlug ?? searchParams.get('category') ?? undefined;
  const brandSlug = searchParams.get('brand') ?? undefined;
  const q = searchParams.get('q') ?? undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined;
  const sort = (searchParams.get('sort') as SortOption) ?? 'newest';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const [filter, setFilter] = useState<FilterState>({
    category: categorySlug,
    brand: brandSlug,
    minPrice,
    maxPrice,
    rating,
    sort,
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      category: categorySlug,
      brand: brandSlug,
      minPrice,
      maxPrice,
      rating,
      sort,
    }));
  }, [categorySlug, brandSlug, minPrice, maxPrice, rating, sort]);

  const category = useMemo(
    () => categories.find((c) => c.slug === categorySlug),
    [categorySlug]
  );

  const filteredAndSorted = useMemo(() => {
    let list = [...products];
    if (q) {
      const lower = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.shortDescription.toLowerCase().includes(lower)
      );
    }
    if (categorySlug) {
      list = list.filter((p) => {
        const c = categories.find((cat) => cat.slug === categorySlug);
        return c && p.categoryId === c.id;
      });
    }
    if (brandSlug) {
      list = list.filter((p) => {
        const b = brands.find((br) => br.slug === brandSlug);
        return b && p.brandId === b.id;
      });
    }
    if (minPrice != null) list = list.filter((p) => (p.salePrice ?? p.price) >= minPrice);
    if (maxPrice != null) list = list.filter((p) => (p.salePrice ?? p.price) <= maxPrice);
    if (rating != null) list = list.filter((p) => p.rating >= rating);
    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price_desc':
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [q, categorySlug, brandSlug, minPrice, maxPrice, rating, sort]);

  const total = filteredAndSorted.length;
  const paginated = useMemo(
    () =>
      filteredAndSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredAndSorted, page]
  );

  const breadcrumbItems: BreadcrumbItem[] = [];
  if (category) breadcrumbItems.push({ label: category.name, href: undefined });
  if (q) breadcrumbItems.push({ label: `Tìm: "${q}"`, href: undefined });

  const updateParams = (updates: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(searchParams);
    (Object.keys(updates) as (keyof typeof updates)[]).forEach((key) => {
      const v = updates[key];
      if (v === undefined || v === '') next.delete(key);
      else next.set(key, String(v));
    });
    next.delete('page'); // reset page when filter changes
    setSearchParams(next);
  };

  const handleFilterChange = (next: Partial<FilterState>) => {
    const merged = { ...filter, ...next };
    setFilter(merged);
    const params: Record<string, string | number | undefined> = {
      category: merged.category,
      brand: merged.brand,
      minPrice: merged.minPrice,
      maxPrice: merged.maxPrice,
      rating: merged.rating,
      sort: merged.sort,
    };
    const query = new URLSearchParams();
    (Object.keys(params) as (keyof typeof params)[]).forEach((key) => {
      const v = params[key];
      if (v !== undefined && v !== '') query.set(key, String(v));
    });
    const queryStr = query.toString();
    if (merged.category != null && paramCategorySlug !== merged.category) {
      navigate(`/ecommerce/store/category/${merged.category}${queryStr ? `?${queryStr}` : ''}`, { replace: true });
      return;
    }
    if (merged.category == null && paramCategorySlug) {
      navigate(`/ecommerce/store/products${queryStr ? `?${queryStr}` : ''}`, { replace: true });
      return;
    }
    updateParams(params);
  };

  const handleSortChange = (s: SortOption) => {
    setFilter((prev) => ({ ...prev, sort: s }));
    updateParams({ sort: s });
  };

  const handlePageChange = (p: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(p));
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 shrink-0">
          <FilterSidebar
            categories={categories}
            brands={brands}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="flex-1 min-w-0">
          <SortBar sort={filter.sort ?? 'newest'} onSortChange={handleSortChange} total={total} />
          <ProductGrid products={paginated} />
          <ProductListPagination
            current={page}
            total={total}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
