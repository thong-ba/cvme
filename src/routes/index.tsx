// Cấu hình router
import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage/index.tsx';
import NotFoundPage from '../pages/NotFoundPage';
import RouteErrorPage from '../pages/RouteErrorPage';
import ProjectIntroductionPage from '../pages/SchoolProject/Introduction';
import AdministratorsPage from '../pages/SchoolProject/Administrators';
import PrimarySchoolsPage from '../pages/SchoolProject/Administrators/PrimarySchoolsPage';
import LowerSecondarySchoolsPage from '../pages/SchoolProject/Administrators/LowerSecondarySchoolsPage';
import HighSchoolsPage from '../pages/SchoolProject/Administrators/HighSchoolsPage';
import CreateSchoolPage from '../pages/SchoolProject/Administrators/CreateSchoolPage';
import HeadMastersPage from '../pages/SchoolProject/HeadMasters';
import TeachersPage from '../pages/SchoolProject/Teachers';
import ParentsPage from '../pages/SchoolProject/Parents';
import StudentsPage from '../pages/SchoolProject/Students';
import StaffAdminsPage from '../pages/SchoolProject/StaffAdmins';
import { ProjectIntroductionPage as ECommerceIntroductionPage } from '../pages/ECommerceProject/Introduction';
import StoreLayout from '../components/eCommerce/StoreLayout';
import StoreHomePage from '../pages/ECommerceProject/Store/StoreHomePage';
import ProductListingPage from '../pages/ECommerceProject/Store/ProductListingPage';
import ProductDetailPage from '../pages/ECommerceProject/Store/ProductDetailPage';
import CartPage from '../pages/ECommerceProject/Store/CartPage';
import StoreLoginPage from '../pages/ECommerceProject/Store/StoreLoginPage';
import StoreRegisterPage from '../pages/ECommerceProject/Store/StoreRegisterPage';
import StoreForgotPasswordPage from '../pages/ECommerceProject/Store/StoreForgotPasswordPage';
import StoreAboutPage from '../pages/ECommerceProject/Store/StoreAboutPage';
import StorePrivacyPolicyPage from '../pages/ECommerceProject/Store/StorePrivacyPolicyPage';
import StoreReturnPolicyPage from '../pages/ECommerceProject/Store/StoreReturnPolicyPage';
import StoreTermsPage from '../pages/ECommerceProject/Store/StoreTermsPage';
import { CustomerPage, CustomerOrderPage } from '../pages/ECommerceProject/Customer';
import {
  SellerPage,
  SellerProductsPage,
  SellerPromotionsPage,
  SellerOrdersPage,
  SellerRevenuePage,
} from '../pages/ECommerceProject/Seller';
import {
  AdminPage as AdminECommercePage,
  AdminLayout as AdminECommerceLayout,
  AdminUsersPage,
  AdminProductsPage,
  AdminOrdersPage,
  AdminPermissionsPage,
  AdminContentPage,
} from '../pages/ECommerceProject/Admin';
import { StaffPage as StaffECommercePage } from '../pages/ECommerceProject/Staff';
import { WarehousePage } from '../pages/ECommerceProject/Warehouse';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'school-project',
        element: <ProjectIntroductionPage />,
      },
      {
        path: 'school-project/administrators',
        element: <AdministratorsPage />,
      },
      {
        path: 'school-project/administrators/tieu-hoc',
        element: <PrimarySchoolsPage />,
      },
      {
        path: 'school-project/administrators/thcs',
        element: <LowerSecondarySchoolsPage />,
      },
      {
        path: 'school-project/administrators/thpt',
        element: <HighSchoolsPage />,
      },
      {
        path: 'school-project/administrators/them-truong',
        element: <CreateSchoolPage />,
      },
      {
        path: 'school-project/head-masters',
        element: <HeadMastersPage />,
      },
      {
        path: 'school-project/teachers',
        element: <TeachersPage />,
      },
      {
        path: 'school-project/parents',
        element: <ParentsPage />,
      },
      {
        path: 'school-project/students',
        element: <StudentsPage />,
      },
      {
        path: 'school-project/staff-admins',
        element: <StaffAdminsPage />,
      },
      // E-Commerce Project
      {
        path: 'ecommerce',
        element: <ECommerceIntroductionPage />,
      },
      {
        path: 'ecommerce/store',
        element: <StoreLayout />,
        children: [
          { index: true, element: <StoreHomePage /> },
          { path: 'products', element: <ProductListingPage /> },
          { path: 'category/:categorySlug', element: <ProductListingPage /> },
          { path: 'product/:productSlug', element: <ProductDetailPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'login', element: <StoreLoginPage /> },
          { path: 'register', element: <StoreRegisterPage /> },
          { path: 'forgot-password', element: <StoreForgotPasswordPage /> },
          { path: 'about', element: <StoreAboutPage /> },
          { path: 'privacy', element: <StorePrivacyPolicyPage /> },
          { path: 'return-policy', element: <StoreReturnPolicyPage /> },
          { path: 'terms', element: <StoreTermsPage /> },
        ],
      },
      {
        path: 'ecommerce/customer',
        element: <Outlet />,
        children: [
          { index: true, element: <CustomerPage /> },
          { path: 'order', element: <CustomerOrderPage /> },
        ],
      },
      {
        path: 'ecommerce/seller',
        element: <Outlet />,
        children: [
          { index: true, element: <SellerPage /> },
          { path: 'products', element: <SellerProductsPage /> },
          { path: 'promotions', element: <SellerPromotionsPage /> },
          { path: 'orders', element: <SellerOrdersPage /> },
          { path: 'revenue', element: <SellerRevenuePage /> },
        ],
      },
      {
        path: 'ecommerce/admin',
        element: <AdminECommerceLayout />,
        children: [
          { index: true, element: <AdminECommercePage /> },
          { path: 'users', element: <AdminUsersPage /> },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'orders', element: <AdminOrdersPage /> },
          { path: 'permissions', element: <AdminPermissionsPage /> },
          { path: 'content', element: <AdminContentPage /> },
        ],
      },
      {
        path: 'ecommerce/staff',
        element: <StaffECommercePage />,
      },
      {
        path: 'ecommerce/warehouse',
        element: <WarehousePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

