// Parents Page
import { useEffect, useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ParentsDashboard,
  ParentsNavigation,
  ChildrenInfo,
  ChildrenGrades,
  ChildrenSchedule,
  DetailedGrades,
  LearningHistory,
  AttendanceRecord,
  ExamSchedule,
  ExamScores,
  Notifications,
} from '../../../components/school';

const ParentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync tab from query (?tab=...)
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setTab = (tab: string) => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      return next;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ParentsDashboard />;
      case 'notifications':
        return <Notifications />;
      case 'children-info':
        return <ChildrenInfo />;
      case 'children-grades':
        return <ChildrenGrades />;
      case 'children-schedule':
        return <ChildrenSchedule />;
      case 'children-detailed-grades':
        return <DetailedGrades />;
      case 'children-learning-history':
        return <LearningHistory />;
      case 'children-attendance':
        return <AttendanceRecord />;
      case 'children-exam-schedule':
        return <ExamSchedule />;
      case 'children-exam-scores':
        return <ExamScores />;
      default:
        return <ParentsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        <Link
          to="/school-project"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-pink-600 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Về giới thiệu dự án</span>
        </Link>
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Phụ huynh (Parents)</h1>
              <p className="text-sm sm:text-base text-slate-600">Xem thông tin học tập của con em, theo dõi điểm số và lịch học</p>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white shadow-md hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Navigation - Desktop */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <ParentsNavigation activeTab={activeTab} onTabChange={setTab} orientation="vertical" />
          </aside>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <aside className="lg:hidden mb-4">
              <ParentsNavigation
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setTab(tab);
                  setIsMobileMenuOpen(false);
                }}
                orientation="vertical"
              />
            </aside>
          )}
          {/* Main Content */}
          <main className="flex-1 min-w-0 w-full">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParentsPage;

