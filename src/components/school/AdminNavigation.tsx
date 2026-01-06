// Admin Navigation Component
import { LayoutDashboard, School, Database, FileText, Settings, Users, LogIn, LogOut, User } from 'lucide-react';

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoggedIn: boolean;
  username?: string;
  onLoginClick: () => void;
  onLogout: () => void;
}

const AdminNavigation = ({
  activeTab,
  onTabChange,
  isLoggedIn,
  username,
  onLoginClick,
  onLogout,
}: AdminNavigationProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schools', label: 'Quản lý Trường học', icon: School },
    { id: 'data', label: 'Quản lý Dữ liệu', icon: Database },
    { id: 'contracts', label: 'Thông tin Ký kết', icon: FileText },
    { id: 'accounts', label: 'Tài khoản Admin', icon: Users },
    { id: 'config', label: 'Cấu hình', icon: Settings },
  ];

  return (
    <nav className="admin-navigation">
      <div className="admin-navigation__tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`admin-navigation__tab ${isActive ? 'admin-navigation__tab--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="admin-navigation__auth">
        {isLoggedIn ? (
          <div className="admin-navigation__user">
            <div className="admin-navigation__user-info">
              <User size={16} />
              <span>{username}</span>
            </div>
            <button className="admin-navigation__logout" onClick={onLogout}>
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        ) : (
          <button className="admin-navigation__login" onClick={onLoginClick}>
            <LogIn size={18} />
            Đăng nhập
          </button>
        )}
      </div>
    </nav>
  );
};

export default AdminNavigation;

