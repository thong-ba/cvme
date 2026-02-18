import type { Order, Promotion, RevenueByDay, TopProductSold } from '../types/ecommerce';

/** ID sản phẩm thuộc shop của seller (demo: 8 sản phẩm) */
export const sellerProductIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

/** Đơn hàng của seller (mock - mở rộng) */
export const sellerOrders: Order[] = [
  {
    id: 'ORD-001',
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    shippingAddress: '123 Nguyễn Huệ, Q1, TP.HCM',
    note: 'Giao giờ hành chính',
    items: [
      { productId: '1', productName: 'iPhone 15 Pro Max 256GB', productSlug: 'iphone-15-pro-max-256gb', thumbnail: '', price: 31990000, quantity: 1 },
    ],
    totalAmount: 31990000,
    status: 'shipping',
    createdAt: '2025-02-15T10:00:00Z',
  },
  {
    id: 'ORD-002',
    fullName: 'Trần Thị B',
    phone: '0902345678',
    shippingAddress: '456 Lê Lợi, Q3, TP.HCM',
    items: [
      { productId: '3', productName: 'MacBook Pro 14 M3 Pro', productSlug: 'macbook-pro-14-m3-pro', thumbnail: '', price: 49990000, quantity: 1 },
    ],
    totalAmount: 49990000,
    status: 'delivered',
    createdAt: '2025-02-14T14:30:00Z',
  },
  {
    id: 'ORD-003',
    fullName: 'Lê Văn C',
    phone: '0903456789',
    shippingAddress: '789 Pasteur, Q1, TP.HCM',
    items: [
      { productId: '2', productName: 'Samsung Galaxy S24 Ultra', productSlug: 'samsung-galaxy-s24-ultra', thumbnail: '', price: 27990000, quantity: 2 },
    ],
    totalAmount: 55980000,
    status: 'pending',
    createdAt: '2025-02-18T09:00:00Z',
  },
  {
    id: 'ORD-004',
    fullName: 'Phạm Thị D',
    phone: '0904567890',
    shippingAddress: '321 CMT8, Q10, TP.HCM',
    items: [
      { productId: '5', productName: 'Sony WH-1000XM5', productSlug: 'sony-wh-1000xm5', thumbnail: '', price: 6990000, quantity: 1 },
    ],
    totalAmount: 6990000,
    status: 'confirmed',
    createdAt: '2025-02-17T16:00:00Z',
  },
  {
    id: 'ORD-005',
    fullName: 'Hoàng Văn E',
    phone: '0905678901',
    shippingAddress: '555 Nguyễn Văn Linh, Q7, TP.HCM',
    items: [
      { productId: '1', productName: 'iPhone 15 Pro Max 256GB', productSlug: 'iphone-15-pro-max-256gb', thumbnail: '', price: 31990000, quantity: 1 },
      { productId: '5', productName: 'Sony WH-1000XM5', productSlug: 'sony-wh-1000xm5', thumbnail: '', price: 6990000, quantity: 2 },
    ],
    totalAmount: 45970000,
    status: 'processing',
    createdAt: '2025-02-16T11:20:00Z',
  },
  {
    id: 'ORD-006',
    fullName: 'Võ Thị F',
    phone: '0906789012',
    shippingAddress: '88 Võ Văn Tần, Q3, TP.HCM',
    items: [
      { productId: '4', productName: 'Dell XPS 15 9530', productSlug: 'dell-xps-15-9530', thumbnail: '', price: 45990000, quantity: 1 },
    ],
    totalAmount: 45990000,
    status: 'delivered',
    createdAt: '2025-02-13T08:15:00Z',
  },
  {
    id: 'ORD-007',
    fullName: 'Đỗ Văn G',
    phone: '0907890123',
    shippingAddress: '12 Trường Chinh, Tân Bình, TP.HCM',
    items: [
      { productId: '2', productName: 'Samsung Galaxy S24 Ultra', productSlug: 'samsung-galaxy-s24-ultra', thumbnail: '', price: 27990000, quantity: 1 },
      { productId: '7', productName: 'Apple Watch Ultra 2', productSlug: 'apple-watch-ultra-2', thumbnail: '', price: 19990000, quantity: 1 },
    ],
    totalAmount: 47980000,
    status: 'cancelled',
    createdAt: '2025-02-12T14:00:00Z',
  },
  {
    id: 'ORD-008',
    fullName: 'Bùi Thị H',
    phone: '0908901234',
    shippingAddress: '99 Lạc Long Quân, Q11, TP.HCM',
    items: [
      { productId: '8', productName: 'iPad Pro 12.9 M2', productSlug: 'ipad-pro-12-9-m2', thumbnail: '', price: 25990000, quantity: 1 },
    ],
    totalAmount: 25990000,
    status: 'pending',
    createdAt: '2025-02-18T07:30:00Z',
  },
  {
    id: 'ORD-009',
    fullName: 'Trương Văn K',
    phone: '0910123456',
    shippingAddress: '45 Hai Bà Trưng, Q1, TP.HCM',
    items: [
      { productId: '3', productName: 'MacBook Pro 14 M3 Pro', productSlug: 'macbook-pro-14-m3-pro', thumbnail: '', price: 49990000, quantity: 1 },
      { productId: '6', productName: 'Apple AirPods Pro 2', productSlug: 'apple-airpods-pro-2', thumbnail: '', price: 5490000, quantity: 1 },
    ],
    totalAmount: 55480000,
    status: 'confirmed',
    createdAt: '2025-02-17T09:45:00Z',
  },
];

/** Khuyến mãi (mock - mở rộng) */
export const sellerPromotions: Promotion[] = [
  {
    id: 'P1',
    name: 'Giảm 15% iPhone',
    type: 'percent',
    value: 15,
    minOrderAmount: 30000000,
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    status: 'active',
    productIds: ['1'],
  },
  {
    id: 'P2',
    name: 'Giảm 500K đơn từ 10M',
    type: 'fixed',
    value: 500000,
    minOrderAmount: 10000000,
    startDate: '2025-02-10',
    endDate: '2025-03-10',
    status: 'active',
  },
  {
    id: 'P3',
    name: 'Flash sale Laptop',
    type: 'percent',
    value: 10,
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    status: 'ended',
    productIds: ['3', '4'],
  },
  {
    id: 'P4',
    name: 'Tai nghe giảm 20%',
    type: 'percent',
    value: 20,
    minOrderAmount: 5000000,
    startDate: '2025-02-15',
    endDate: '2025-03-15',
    status: 'active',
    productIds: ['5', '8'],
  },
  {
    id: 'P5',
    name: 'Freeship toàn shop',
    type: 'fixed',
    value: 0,
    minOrderAmount: 2000000,
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    status: 'scheduled',
  },
];

/** Doanh thu theo ngày (mock - 14 ngày) */
export const sellerRevenueByDay: RevenueByDay[] = [
  { date: '2025-02-05', revenue: 8190000, orders: 1 },
  { date: '2025-02-06', revenue: 0, orders: 0 },
  { date: '2025-02-07', revenue: 27990000, orders: 1 },
  { date: '2025-02-08', revenue: 18990000, orders: 1 },
  { date: '2025-02-09', revenue: 0, orders: 0 },
  { date: '2025-02-10', revenue: 31990000, orders: 1 },
  { date: '2025-02-11', revenue: 6990000, orders: 1 },
  { date: '2025-02-12', revenue: 46980000, orders: 2 },
  { date: '2025-02-13', revenue: 45990000, orders: 1 },
  { date: '2025-02-14', revenue: 49990000, orders: 1 },
  { date: '2025-02-15', revenue: 31990000, orders: 1 },
  { date: '2025-02-16', revenue: 45970000, orders: 1 },
  { date: '2025-02-17', revenue: 6990000, orders: 1 },
  { date: '2025-02-18', revenue: 88970000, orders: 2 },
];

/** Top sản phẩm bán chạy (tính từ đơn hàng - mock) */
export const sellerTopProducts: TopProductSold[] = [
  { productId: '1', productName: 'iPhone 15 Pro Max 256GB', productSlug: 'iphone-15-pro-max-256gb', quantitySold: 3, revenue: 95970000 },
  { productId: '2', productName: 'Samsung Galaxy S24 Ultra', productSlug: 'samsung-galaxy-s24-ultra', quantitySold: 3, revenue: 83970000 },
  { productId: '3', productName: 'MacBook Pro 14 M3 Pro', productSlug: 'macbook-pro-14-m3-pro', quantitySold: 2, revenue: 99980000 },
  { productId: '5', productName: 'Sony WH-1000XM5', productSlug: 'sony-wh-1000xm5', quantitySold: 3, revenue: 20970000 },
  { productId: '4', productName: 'Dell XPS 15 9530', productSlug: 'dell-xps-15-9530', quantitySold: 1, revenue: 45990000 },
  { productId: '8', productName: 'iPad Pro 12.9 M2', productSlug: 'ipad-pro-12-9-m2', quantitySold: 1, revenue: 25990000 },
  { productId: '7', productName: 'Apple Watch Ultra 2', productSlug: 'apple-watch-ultra-2', quantitySold: 1, revenue: 19990000 },
  { productId: '6', productName: 'Apple AirPods Pro 2', productSlug: 'apple-airpods-pro-2', quantitySold: 1, revenue: 5490000 },
];
