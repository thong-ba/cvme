// Head Masters Navigation Component
import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  FileText,
} from 'lucide-react';

interface HeadMastersNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const HeadMastersNavigation = ({
  activeTab,
  onTabChange,
  orientation = 'vertical',
}: HeadMastersNavigationProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schools', label: 'Quản lý Trường học', icon: School },
    { id: 'teachers', label: 'Quản lý Giáo viên', icon: Users },
    { id: 'students', label: 'Quản lý Học sinh', icon: GraduationCap },
    { id: 'classes', label: 'Quản lý Lớp học', icon: BookOpen },
    { id: 'schedule', label: 'Lịch học', icon: Calendar },
    { id: 'achievements', label: 'Thành tích', icon: Award },
    { id: 'reports', label: 'Báo cáo', icon: FileText },
  ];

  return (
    <nav
      className={
        orientation === 'vertical'
          ? 'flex h-fit flex-col gap-2 bg-white/95 shadow-lg rounded-2xl p-4 sticky top-6'
          : 'flex items-center justify-between gap-4 bg-white shadow-lg rounded-2xl p-2'
      }
    >
      <div
        className={
          orientation === 'vertical'
            ? 'flex flex-col gap-1'
            : 'flex flex-row gap-2 overflow-x-auto scrollbar-hide flex-1'
        }
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition
              ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                  : 'text-slate-600 hover:text-indigo-700 hover:bg-slate-50'
              }`}
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

export default HeadMastersNavigation;
