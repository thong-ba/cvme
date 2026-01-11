// Administrators Page
import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, LogIn, LogOut, User, Menu, X } from 'lucide-react';
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
  AddSchoolModal,
} from '../../../components/school';

const AdministratorsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [schoolTypeFilter, setSchoolTypeFilter] = useState<'all' | 'tiểu học' | 'thcs' | 'thpt' | undefined>(undefined);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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

  const handleSchoolTypeSelect = (schoolType: 'tiểu học' | 'thcs' | 'thpt') => {
    setSchoolTypeFilter(schoolType);
    setActiveTab('schools');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset filter when switching away from schools tab
    if (tab !== 'schools') {
      setSchoolTypeFilter(undefined);
    }
  };

  const handleAddSchool = (schoolData: {
    name: string;
    type: 'Tiểu học' | 'THCS' | 'THPT';
    level: 'Đạt chuẩn' | 'Chưa đạt';
    students: number;
    status: 'active' | 'inactive';
  }) => {
    // In a real app, this would make an API call to add the school
    // For now, we'll just show an alert and close the modal
    console.log('Adding school:', schoolData);
    alert(`Đã thêm trường: ${schoolData.name}\nLoại: ${schoolData.type}\nSố học sinh: ${schoolData.students}`);
    // You can also update the schoolList here if needed
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'schools':
        return (
          <SchoolManagement
            initialTypeFilter={schoolTypeFilter}
            onAddSchoolClick={() => setIsAddSchoolModalOpen(true)}
          />
        );
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
      <div className="relative z-10 w-full bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-8 shadow-lg md:px-6 lg:px-8 xl:px-12">
        <div className="w-full">
          {/* Header Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Link
              to="/school-project"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-white/30 backdrop-blur-md border border-white/20"
            >
              <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Về giới thiệu dự án</span>
              <span className="sm:hidden">Về dự án</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-md border border-white/20">
                    <User size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{username}</span>
                    <span className="sm:hidden">User</span>
                  </div>
                  <button
                    className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-600 shadow-md transition hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Đăng xuất</span>
                    <span className="sm:hidden">Thoát</span>
                  </button>
                </>
              ) : (
                <button
                  className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 shadow-md transition hover:bg-blue-50"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <LogIn size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                  <span className="sm:hidden">Đăng nhập</span>
                </button>
              )}
            </div>
          </div>

          {/* Hero Content */}
          <div className="mt-6 sm:mt-8 text-center pb-6 sm:pb-8">
            <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/20 text-white ring-2 ring-white/40 backdrop-blur-md mb-4 sm:mb-6">
              <Shield size={32} className="sm:w-10 sm:h-10" />
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-2 sm:mb-3">
              Super Admin
            </h1>
            <p className="mx-auto mt-2 max-w-3xl text-sm sm:text-base text-white md:text-lg px-2">
              Quản lý toàn bộ hệ thống nhiều trường - Hệ thống / Sở / Phòng GD
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full flex flex-col gap-4 sm:gap-6 px-4 pb-12 pt-4 sm:pt-6 md:flex-row md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-24 left-4 z-40 flex items-center justify-center h-10 w-10 rounded-lg bg-white shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <aside
              className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <AdminNavigation
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    handleTabChange(tab);
                    setIsMobileMenuOpen(false);
                  }}
                  onSchoolTypeSelect={handleSchoolTypeSelect}
                  onAddSchoolClick={() => {
                    setIsAddSchoolModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  orientation="vertical"
                />
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-full md:w-64 lg:w-72 xl:w-80 shrink-0">
          <AdminNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onSchoolTypeSelect={handleSchoolTypeSelect}
            onAddSchoolClick={() => setIsAddSchoolModalOpen(true)}
            orientation="vertical"
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 rounded-2xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-slate-200 lg:p-8 xl:p-10">
          <div className="w-full overflow-x-auto">{renderContent()}</div>
        </main>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <AddSchoolModal
        isOpen={isAddSchoolModalOpen}
        onClose={() => setIsAddSchoolModalOpen(false)}
        onAdd={handleAddSchool}
      />
    </div>
  );
};

export default AdministratorsPage;

