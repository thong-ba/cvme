// Admin Navigation Component
import { LayoutDashboard, School, Database, FileText, Settings, Users } from 'lucide-react';

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const AdminNavigation = ({
  activeTab,
  onTabChange,
  orientation = 'horizontal',
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
    <nav className={`admin-navigation admin-navigation--${orientation}`}>
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
    </nav>
  );
};

export default AdminNavigation;

