// Parents Navigation Component
import { LayoutDashboard, Users, Award, Calendar, FileText, History, CheckCircle, Bell } from 'lucide-react';

interface ParentsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const ParentsNavigation = ({ activeTab, onTabChange, orientation = 'vertical' }: ParentsNavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'children-info', label: 'Thông tin con', icon: Users },
    { id: 'children-grades', label: 'Theo dõi điểm số', icon: Award },
    { id: 'children-schedule', label: 'Lịch học', icon: Calendar },
    { id: 'children-detailed-grades', label: 'Điểm chi tiết', icon: FileText },
    { id: 'children-learning-history', label: 'Lịch sử học tập', icon: History },
    { id: 'children-attendance', label: 'Điểm danh', icon: CheckCircle },
    { id: 'children-exam-schedule', label: 'Lịch thi', icon: Calendar },
    { id: 'children-exam-scores', label: 'Điểm thi', icon: Award },
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
                  ? 'bg-pink-600 text-white'
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
                    ? 'bg-pink-600 text-white shadow-md'
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

export default ParentsNavigation;
