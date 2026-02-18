// Mock data cho Admin E-Commerce

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'seller' | 'staff' | 'customer';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AdminRole {
  id: string;
  name: string;
  permissions: string[];
}

export const adminUsers: AdminUser[] = [
  { id: '1', email: 'admin@site.com', fullName: 'Admin Hệ thống', role: 'admin', status: 'active', createdAt: '2024-01-01' },
  { id: '2', email: 'seller1@site.com', fullName: 'Nguyễn Seller', role: 'seller', status: 'active', createdAt: '2024-06-15' },
  { id: '3', email: 'staff@site.com', fullName: 'Nhân viên Kho', role: 'staff', status: 'active', createdAt: '2024-08-20' },
  { id: '4', email: 'user1@gmail.com', fullName: 'Khách A', role: 'customer', status: 'active', createdAt: '2025-01-10' },
  { id: '5', email: 'user2@gmail.com', fullName: 'Khách B', role: 'customer', status: 'inactive', createdAt: '2025-02-01' },
];

export const adminRoles: AdminRole[] = [
  { id: 'admin', name: 'Admin', permissions: ['users', 'products', 'orders', 'permissions', 'content'] },
  { id: 'seller', name: 'Người bán', permissions: ['products', 'orders', 'promotions', 'revenue'] },
  { id: 'staff', name: 'Nhân viên', permissions: ['orders', 'warehouse'] },
  { id: 'customer', name: 'Khách hàng', permissions: ['order_own', 'profile'] },
];

/** Thống kê theo ngày cho chart (dùng chung từ seller hoặc mở rộng) */
export const adminStatsByDay = [
  { date: '2025-02-05', revenue: 8190000, orders: 1, users: 2 },
  { date: '2025-02-06', revenue: 0, orders: 0, users: 0 },
  { date: '2025-02-07', revenue: 27990000, orders: 1, users: 1 },
  { date: '2025-02-08', revenue: 18990000, orders: 1, users: 0 },
  { date: '2025-02-09', revenue: 0, orders: 0, users: 1 },
  { date: '2025-02-10', revenue: 31990000, orders: 1, users: 2 },
  { date: '2025-02-11', revenue: 6990000, orders: 1, users: 0 },
  { date: '2025-02-12', revenue: 46980000, orders: 2, users: 1 },
  { date: '2025-02-13', revenue: 45990000, orders: 1, users: 0 },
  { date: '2025-02-14', revenue: 49990000, orders: 1, users: 1 },
  { date: '2025-02-15', revenue: 31990000, orders: 1, users: 0 },
  { date: '2025-02-16', revenue: 45970000, orders: 1, users: 2 },
  { date: '2025-02-17', revenue: 6990000, orders: 1, users: 0 },
  { date: '2025-02-18', revenue: 88970000, orders: 2, users: 1 },
];
