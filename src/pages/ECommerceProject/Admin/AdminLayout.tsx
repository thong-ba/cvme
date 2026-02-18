import { Outlet } from 'react-router-dom';
import { AdminNavBar } from '../../../components/eCommerce';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <AdminNavBar />
        <Outlet />
      </div>
    </div>
  );
}
