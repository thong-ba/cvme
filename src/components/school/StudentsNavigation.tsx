// Students Navigation Component
import { LayoutDashboard, Award, Calendar, FileText, User, History, CheckCircle, Bell } from 'lucide-react';

interface StudentsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const StudentsNavigation = ({ activeTab, onTabChange, orientation = 'vertical' }: StudentsNavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'achievements', label: 'Thành tích', icon: Award },
    { id: 'schedule', label: 'Thời khóa biểu', icon: Calendar },
    { id: 'grades', label: 'Điểm số', icon: FileText },
    { id: 'detailed-grades', label: 'Điểm chi tiết', icon: FileText },
    { id: 'learning-history', label: 'Lịch sử học tập', icon: History },
    { id: 'attendance', label: 'Điểm danh', icon: CheckCircle },
    { id: 'exam-schedule', label: 'Lịch thi', icon: Calendar },
    { id: 'exam-scores', label: 'Điểm thi', icon: Award },
    { id: 'profile', label: 'Thông tin cá nhân', icon: User },
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
                  ? 'bg-purple-600 text-white'
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
                    ? 'bg-purple-600 text-white shadow-md'
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

export default StudentsNavigation;
