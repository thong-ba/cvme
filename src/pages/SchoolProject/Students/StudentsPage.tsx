// Students Page
import { useEffect, useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  StudentsDashboard,
  StudentsNavigation,
  MyAchievements,
  StudentMySchedule,
  StudentMyGrades,
  StudentMyProfile,
  DetailedGrades,
  LearningHistory,
  AttendanceRecord,
  ExamSchedule,
  ExamScores,
  Notifications,
} from '../../../components/school';

const StudentsPage = () => {
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
        return <StudentsDashboard />;
      case 'notifications':
        return <Notifications />;
      case 'achievements':
        return <MyAchievements />;
      case 'schedule':
        return <StudentMySchedule />;
      case 'grades':
        return <StudentMyGrades />;
      case 'detailed-grades':
        return <DetailedGrades />;
      case 'learning-history':
        return <LearningHistory />;
      case 'attendance':
        return <AttendanceRecord />;
      case 'exam-schedule':
        return <ExamSchedule />;
      case 'exam-scores':
        return <ExamScores />;
      case 'profile':
        return <StudentMyProfile />;
      default:
        return <StudentsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        <Link
          to="/school-project"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-purple-600 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Về giới thiệu dự án</span>
        </Link>
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Học sinh (Students)</h1>
              <p className="text-sm sm:text-base text-slate-600">Xem thành tích học tập, thời khóa biểu, điểm số và thông tin cá nhân</p>
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
            <StudentsNavigation activeTab={activeTab} onTabChange={setTab} orientation="vertical" />
          </aside>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <aside className="lg:hidden mb-4">
              <StudentsNavigation
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

export default StudentsPage;

