import { Outlet } from 'react-router-dom';
import { CartProvider } from '../../contexts/CartContext';
import { StoreAuthProvider } from '../../contexts/StoreAuthContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import FloatingContactBar from './FloatingContactBar';

const StoreLayout = () => {
  return (
    <StoreAuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 store-theme-tet">
          <StoreHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <StoreFooter />
          <FloatingContactBar />
        </div>
      </CartProvider>
    </StoreAuthProvider>
  );
};

export default StoreLayout;
