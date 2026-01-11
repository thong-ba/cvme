// Admin Navigation Component
import {
  LayoutDashboard,
  School,
  Database,
  FileText,
  Settings,
  Users,
  ShieldCheck,
  Activity,
  Cloud,
  Plug,
  FileSearch2,
  ListTree,
  PlusCircle,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
  onSchoolTypeSelect?: (schoolType: 'tiểu học' | 'thcs' | 'thpt') => void;
  onAddSchoolClick?: () => void;
}

const AdminNavigation = ({
  activeTab,
  onTabChange,
  orientation = 'horizontal',
  onSchoolTypeSelect,
  onAddSchoolClick,
}: AdminNavigationProps) => {
  const [isSchoolOpen, setIsSchoolOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schools', label: 'Quản lý Trường học', icon: School },
    { id: 'data', label: 'Quản lý Dữ liệu', icon: Database },
    { id: 'contracts', label: 'Thông tin Ký kết', icon: FileText },
    { id: 'accounts', label: 'Tài khoản Admin', icon: Users },
    { id: 'config', label: 'Cấu hình', icon: Settings },
  ];

  const exploreItems = [
    { label: 'Phân quyền & bảo mật', icon: ShieldCheck },
    { label: 'Giám sát hoạt động', icon: Activity },
    { label: 'Sao lưu & khôi phục', icon: Cloud },
    { label: 'Tích hợp API / SSO', icon: Plug },
    { label: 'Tài liệu & quy trình', icon: FileSearch2 },
  ];

  const schoolChildren = [
    { label: 'Tiểu học', icon: ListTree, type: 'tiểu học' as const },
    { label: 'THCS', icon: ListTree, type: 'thcs' as const },
    { label: 'THPT', icon: ListTree, type: 'thpt' as const },
    { label: 'Thêm trường', icon: PlusCircle, type: null },
  ];

  const handleSchoolTypeClick = (schoolType: 'tiểu học' | 'thcs' | 'thpt' | null) => {
    if (schoolType && onSchoolTypeSelect) {
      onSchoolTypeSelect(schoolType);
      onTabChange('schools');
    }
  };

  return (
    <nav
      className={
        orientation === 'vertical'
          ? 'flex h-full flex-col gap-4 bg-white/95 shadow-lg rounded-2xl p-4'
          : 'flex items-center justify-between gap-4 bg-white shadow-lg rounded-2xl p-2'
      }
    >
      <div
        className={
          orientation === 'vertical'
            ? 'flex flex-col gap-2'
            : 'flex flex-row gap-2 overflow-x-auto scrollbar-hide flex-1'
        }
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isSchool = tab.id === 'schools';

          if (orientation === 'vertical' && isSchool) {
            return (
              <div key={tab.id} className="flex flex-col gap-2">
                <button
                  className={`flex items-center justify-between gap-2 rounded-xl px-4 py-2 text-sm font-medium transition
                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                  }`}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsSchoolOpen((prev) => !prev);
                  }}
                  aria-expanded={isSchoolOpen}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform text-slate-400 ${isSchoolOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isSchoolOpen && (
                  <div className="ml-2 rounded-2xl border border-slate-100 bg-slate-50 p-2 shadow-sm">
                    <div className="space-y-1">
                      {schoolChildren.map((item, index) => {
                        const ItemIcon = item.icon;
                        if (item.type) {
                          return (
                            <button
                              key={`${item.type}-${index}`}
                              onClick={() => handleSchoolTypeClick(item.type)}
                              className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-white hover:shadow-sm text-left"
                            >
                              <ItemIcon size={16} className="text-blue-500" />
                              <span>{item.label}</span>
                            </button>
                          );
                        } else {
                          return (
                            <button
                              key={`add-school-${index}`}
                              onClick={() => {
                                if (onAddSchoolClick) {
                                  onAddSchoolClick();
                                }
                              }}
                              className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-white hover:shadow-sm text-left"
                            >
                              <ItemIcon size={16} className="text-blue-500" />
                              <span>{item.label}</span>
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition
              ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {orientation === 'vertical' && (
        <div className="border-t pt-3">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Tìm hiểu thêm
          </p>
          <div className="space-y-2">
            {exploreItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
                >
                  <Icon size={16} className="text-slate-400" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavigation;

