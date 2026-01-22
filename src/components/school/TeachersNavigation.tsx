// Teachers Navigation Component
import { LayoutDashboard, BookOpen, Users, History, Calendar, FileText, Edit, Send } from 'lucide-react';

interface TeachersNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const TeachersNavigation = ({ activeTab, onTabChange, orientation = 'vertical' }: TeachersNavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'Môn học', icon: BookOpen },
    { id: 'classes', label: 'Lớp học', icon: BookOpen },
    { id: 'students', label: 'Học sinh', icon: Users },
    { id: 'history', label: 'Lịch sử dạy học', icon: History },
    { id: 'schedule', label: 'Lịch học', icon: Calendar },
    { id: 'grade-reports', label: 'Báo cáo điểm', icon: FileText },
    { id: 'grade-entry', label: 'Nhập điểm', icon: Edit },
    { id: 'grade-submission', label: 'Nộp điểm', icon: Send },
  ];

  if (orientation === 'horizontal') {
    return (
      <nav className="flex flex-wrap gap-2 p-4 bg-white rounded-xl shadow-md ring-1 ring-slate-100">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="bg-white rounded-xl shadow-md ring-1 ring-slate-100 p-4">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm sm:text-base">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TeachersNavigation;
