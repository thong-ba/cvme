// E-Commerce types

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "M", "Đỏ"
  type: 'size' | 'color';
  value: string;
  sku?: string;
  priceOffset?: number; // chênh lệch giá so với base
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  brandId: string;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  description: string;
  variants?: ProductVariant[];
  inStock: boolean;
  inFlashSale?: boolean;
  flashSaleEndAt?: string;
  flashSaleDiscount?: number; // %
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  linkText?: string;
  order: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  avatar?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  quantity: number;
  variant?: { type: string; value: string };
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';

export interface ProductFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
  q?: string;
}
