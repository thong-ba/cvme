// Administrators Page
import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, LogIn, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AdminNavigation,
  AdminDashboard,
  SchoolManagement,
  DataManagement,
  ContractManagement,
  AccountManagement,
  ConfigManagement,
  LoginModal,
} from '../../../components/school';

const AdministratorsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('admin_username') || '';
  });

  useEffect(() => {
    if (isLoggedIn) {
      document.body.classList.add('admin-logged-in');
    } else {
      document.body.classList.remove('admin-logged-in');
    }
  }, [isLoggedIn]);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('admin_logged_in', 'true');
    localStorage.setItem('admin_username', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'schools':
        return <SchoolManagement />;
      case 'data':
        return <DataManagement />;
      case 'contracts':
        return <ContractManagement />;
      case 'accounts':
        return <AccountManagement />;
      case 'config':
        return <ConfigManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 relative overflow-x-hidden">
      {/* Hero Section with Gradient Background */}
      <div className="relative z-10 w-full bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-8 shadow-lg md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/school-project"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/30 backdrop-blur-md border border-white/20"
            >
              <ArrowLeft size={18} />
              Về giới thiệu dự án
            </Link>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md border border-white/20">
                    <User size={16} />
                    <span>{username}</span>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-md transition hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-md transition hover:bg-blue-50"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <LogIn size={16} />
                  Đăng nhập
                </button>
              )}
            </div>
          </div>

          {/* Hero Content */}
          <div className="mt-8 text-center pb-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white ring-2 ring-white/40 backdrop-blur-md mb-6">
              <Shield size={40} />
            </div>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-3">
              Super Admin
            </h1>
            <p className="mx-auto mt-2 max-w-3xl text-base text-white md:text-lg">
              Quản lý toàn bộ hệ thống nhiều trường - Hệ thống / Sở / Phòng GD
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-12 pt-6 md:flex-row lg:px-8">
        <aside className="md:w-64 lg:w-72 shrink-0">
          <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} orientation="vertical" />
        </aside>
        <main className="flex-1 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 lg:p-8">
          <div>{renderContent()}</div>
        </main>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default AdministratorsPage;

