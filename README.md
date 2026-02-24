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
| **Trang chủ** | CV: Hero, About, Experience, Skills, Projects, Contact |
| **School Project** | Giới thiệu, Administrators (Tiểu học / THCS / THPT), Hiệu trưởng, Giáo viên, Học sinh, Phụ huynh, Staff Admin |
| **E-Commerce** | Cửa hàng (sản phẩm, giỏ hàng, đăng nhập), Customer, Seller (sản phẩm, khuyến mãi, đơn hàng, doanh thu), Admin (users, products, orders, permissions, content), Staff, Kho |

---

## 🛠 Tech stack

- **Build:** Vite 7
- **UI:** React 19, React Router 7, Ant Design, Tailwind CSS, Lucide React
- **Charts:** Recharts
- **Ngôn ngữ:** TypeScript 5.9
- **Lint:** ESLint 9

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
| `npm run build` | Build production (`tsc` + `vite build`) |
| `npm run preview` | Xem bản build locally |
| `npm run lint` | Chạy ESLint |

---

## 📁 Cấu trúc thư mục (tóm tắt)

```
src/
├── main.tsx              # Entry, RouterProvider
├── App.tsx                # Root layout
├── routes/                # Định nghĩa toàn bộ route
├── components/            # common, home, school, eCommerce
├── pages/                 # HomePage, SchoolProject/*, ECommerceProject/*
├── contexts/              # CartContext, StoreAuthContext
├── data/                  # Mock data (school, ecommerce, admin, seller)
├── types/                 # TypeScript interfaces
├── config/                # app.config, storeInfo
├── utils/                 # formatCurrency, formatDate, toast, ...
├── hooks/                 # useGeolocation, useVietnamTime
└── services/              # api.service, geocoding.service
```

---

## 📜 License

Private project.

---

## 🔧 Ghi chú cho developer

<details>
<summary><strong>Mở rộng cấu hình ESLint (type-aware)</strong></summary>

Có thể bật type-aware lint bằng cách dùng `tseslint.configs.recommendedTypeChecked` (hoặc `strictTypeChecked` / `stylisticTypeChecked`) và cấu hình `parserOptions.project` trỏ tới `tsconfig.node.json` và `tsconfig.app.json`.

</details>

<details>
<summary><strong>React Compiler</strong></summary>

React Compiler chưa bật trong template (ảnh hưởng dev/build). Cách thêm: [React Compiler – Installation](https://react.dev/learn/react-compiler/installation).

</details>
