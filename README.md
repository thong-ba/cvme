# Thong Ly Ngoc CV

> Portfolio & demo projects: CV trang chủ, **School Management** (quản lý trường học) và **E-Commerce** (cửa hàng, seller, admin).

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-6.x-0170FE?logo=antdesign)](https://ant.design/)

---

## ✨ Nội dung dự án

| Phần | Mô tả |
|------|--------|
| **Trang chủ** | CV: Hero, About, Experience, Skills, Projects, Contact. Hỗ trợ đa ngôn ngữ (vi/en) qua `LanguageContext`. |
| **School Project** | Giới thiệu, Administrators (Tiểu học / THCS / THPT, thêm trường), Hiệu trưởng, Giáo viên, Học sinh, Phụ huynh, Staff Admin. Mock data trong `data/index.ts` (trường, giáo viên, học sinh, lịch, điểm, hợp đồng, tài khoản…). |
| **E-Commerce** | Cửa hàng (sản phẩm, giỏ hàng, đăng nhập/đăng ký/quên mật khẩu, About, Privacy, Return policy, Terms), Customer (trang cá nhân, đơn hàng), Seller (sản phẩm, khuyến mãi, đơn hàng, doanh thu), Admin (users, products, orders, permissions, content), Staff, Kho. |

### Đường dẫn (routes)

Toàn bộ route được định nghĩa trong **một file**: `src/routes/index.tsx`.

| Path | Mô tả |
|------|--------|
| `/` | Trang chủ (HomePage) |
| `/school-project` | Giới thiệu School Project |
| `/school-project/administrators` | Trang tổng quan Administrators |
| `/school-project/administrators/tieu-hoc` | Danh sách trường Tiểu học |
| `/school-project/administrators/thcs` | Danh sách trường THCS |
| `/school-project/administrators/thpt` | Danh sách trường THPT |
| `/school-project/administrators/them-truong` | Thêm trường mới |
| `/school-project/head-masters` | Giao diện Hiệu trưởng |
| `/school-project/teachers` | Giao diện Giáo viên |
| `/school-project/parents` | Giao diện Phụ huynh |
| `/school-project/students` | Giao diện Học sinh |
| `/school-project/staff-admins` | Giao diện Staff Admin |
| `/ecommerce` | Giới thiệu E-Commerce |
| `/ecommerce/store` | Layout cửa hàng (con: `/`, `/products`, `/category/:slug`, `/product/:slug`, `/cart`, `/login`, `/register`, `/forgot-password`, `/about`, `/privacy`, `/return-policy`, `/terms`) |
| `/ecommerce/customer` | Trang khách hàng (con: `/`, `/order`) |
| `/ecommerce/seller` | Trang seller (con: `/`, `/products`, `/promotions`, `/orders`, `/revenue`) |
| `/ecommerce/admin` | Layout admin (con: `/`, `/users`, `/products`, `/orders`, `/permissions`, `/content`) |
| `/ecommerce/staff` | Trang nhân viên |
| `/ecommerce/warehouse` | Trang kho |
| `*` | NotFoundPage |

---

## 🛠 Tech stack

| Loại | Công nghệ |
|------|-----------|
| **Build** | Vite 7.x |
| **Framework** | React 19.x, React Router 7.x |
| **UI** | Ant Design 6.x, Tailwind CSS 3.x, Lucide React |
| **Biểu đồ** | Recharts 3.x |
| **Ngôn ngữ** | TypeScript 5.9 (strict, `verbatimModuleSyntax`) |
| **Lint** | ESLint 9, eslint-plugin-react-hooks, react-refresh, typescript-eslint |

---

## 🚀 Chạy dự án

### Yêu cầu

- Node.js (khuyến nghị LTS)
- npm / pnpm / yarn

### Cài đặt & chạy

```bash
# Clone repo (nếu chưa có)
git clone <repo-url>
cd thonglyngocCV

# Cài dependency
npm install

# Chạy dev server
npm run dev
```

Mở [http://localhost:5173](http://localhost:5173) trên trình duyệt.

### Các lệnh khác

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy dev server (HMR) |
| `npm run build` | Build production: `tsc -b` rồi `vite build` |
| `npm run preview` | Xem bản build locally |
| `npm run lint` | Chạy ESLint |

### Biến môi trường (tuỳ chọn)

- `VITE_API_BASE_URL`: Base URL API (mặc định `http://localhost:3000/api`). Dùng trong `config/app.config.ts`.

---

## 📁 Cấu trúc thư mục

```
src/
├── main.tsx                 # Entry: RouterProvider + router
├── App.tsx                  # Root: LanguageProvider → Layout (Outlet)
├── index.css                # Global styles (Tailwind)
├── App.css
│
├── routes/
│   └── index.tsx            # Toàn bộ route (createBrowserRouter)
│
├── components/
│   ├── index.ts             # Re-export: common, home, school (không export eCommerce)
│   ├── common/              # Layout, Header, Footer
│   ├── home/                # Hero, About, Skills, Experience, Projects, Contact
│   ├── school/              # Nhiều component: Admin*, HeadMasters*, Teacher*, Student*, Parents*, Schedule, Grades, ...
│   └── eCommerce/           # StoreLayout, StoreHeader/Footer, Product*, Cart UI, Breadcrumb, Filter, Sort, ...
│       ├── seller/          # SellerProductTable, SellerOrderTable, SellerRevenueChart, SellerPromotionList, SellerNavBar
│       └── admin/           # AdminNavBar
│
├── pages/
│   ├── index.ts             # Export HomePage
│   ├── HomePage/
│   ├── NotFoundPage.tsx, RouteErrorPage.tsx
│   ├── SchoolProject/       # Introduction, Administrators, HeadMasters, Teachers, Parents, Students, StaffAdmins
│   └── ECommerceProject/    # Introduction, Store, Customer, Seller, Admin, Staff, Warehouse
│
├── contexts/
│   ├── LanguageContext.tsx  # vi/en, localStorage key: cv-locale. Bọc toàn app (App.tsx).
│   ├── CartContext.tsx     # Giỏ hàng (localStorage). Bọc trong StoreLayout.
│   └── StoreAuthContext.tsx # Đăng nhập/đăng ký store (demo, localStorage). Dùng trong eCommerce.
│
├── data/                    # Mock / static data
│   ├── index.ts             # School: schoolList, accounts, contracts, dashboard, headMaster*, ...
│   ├── admin.ts             # Admin E-Commerce: adminUsers, adminRoles, adminStatsByDay
│   └── seller.ts            # Seller: sellerProductIds, sellerOrders, sellerPromotions, sellerRevenueByDay, topProductsSold
│
├── types/
│   ├── index.ts             # User, ApiResponse, PaginationParams, PaginatedResponse
│   └── ecommerce.ts         # Category, Product, Order, CartItem, Promotion, RevenueByDay, ...
│
├── config/
│   ├── app.config.ts        # app name, api.baseURL, api.timeout
│   └── storeInfo.ts         # Thông tin cửa hàng: contact, address, openingHours (dùng cho Footer, About, FloatingContactBar)
│
├── utils/
│   └── index.ts             # formatCurrency, formatDate, getStoredCart, clearStoredCart, debounce, sleep
│
├── hooks/
│   └── index.ts             # useGeolocation, useVietnamTime
│
└── services/
    ├── api.service.ts      # Class ApiService (get/post/put/delete), base từ appConfig
    └── geocoding.service.ts # Geocoding (nếu dùng)
```

---

## 📜 License

Private project.

---

## 🔧 Ghi chú cho developer

- **Route:** Chỉ thêm/sửa route trong `src/routes/index.tsx` để tránh lệch cấu hình.
- **Components eCommerce:** Import trực tiếp từ `components/eCommerce/...` hoặc `components/eCommerce/seller`, `components/eCommerce/admin`; không re-export qua `components/index.ts`.
- **Types:** Dùng `types/index.ts` cho type chung; `types/ecommerce.ts` cho E-Commerce.
- **Context:** `LanguageProvider` bọc toàn app; `CartProvider` chỉ bọc StoreLayout; `StoreAuthProvider` dùng trong phạm vi eCommerce.

<details>
<summary><strong>Mở rộng cấu hình ESLint (type-aware)</strong></summary>

Có thể bật type-aware lint bằng cách dùng `tseslint.configs.recommendedTypeChecked` (hoặc `strictTypeChecked` / `stylisticTypeChecked`) và cấu hình `parserOptions.project` trỏ tới `tsconfig.node.json` và `tsconfig.app.json`.

</details>

<details>
<summary><strong>React Compiler</strong></summary>

React Compiler chưa bật trong template (ảnh hưởng dev/build). Cách thêm: [React Compiler – Installation](https://react.dev/learn/react-compiler/installation).

</details>
