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
    <div className="school-project-page">
      <div className="school-project-hero school-project-hero--admin">
        <div className="admin-hero-header">
          <Link to="/school-project" className="school-project-back">
            <ArrowLeft size={20} />
            Về giới thiệu dự án
          </Link>
          <div className="admin-hero-auth">
            {isLoggedIn ? (
              <>
                <div className="admin-hero-user">
                  <User size={18} />
                  <span>{username}</span>
                </div>
                <button className="admin-hero-auth__button admin-hero-auth__button--logout" onClick={handleLogout}>
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <button
                className="admin-hero-auth__button admin-hero-auth__button--login"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <LogIn size={16} />
                Đăng nhập
              </button>
            )}
          </div>
        </div>
        <div className="school-project-hero-content">
          <div className="school-project-hero-icon">
            <Shield size={48} />
          </div>
          <h1 className="school-project-title">Super Admin</h1>
          <p className="school-project-subtitle">
            Quản lý toàn bộ hệ thống nhiều trường - Hệ thống / Sở / Phòng GD
          </p>
        </div>
      </div>

      <div className="admin-page-container">
        <div className="admin-layout">
          <aside className="admin-layout__sidebar">
            <AdminNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              orientation="vertical"
            />
          </aside>
          <main className="admin-layout__content">
            <div className="admin-content">{renderContent()}</div>
          </main>
        </div>
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

