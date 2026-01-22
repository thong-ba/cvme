// Head Masters Page
import { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  HeadMastersDashboard,
  HeadMastersNavigation,
  SchoolManagementForHeadMasters,
  TeacherManagement,
  StudentManagement,
  ClassManagement,
  ScheduleManagement,
  AchievementsManagement,
  ReportsManagement,
} from '../../../components/school';

const HeadMastersPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HeadMastersDashboard />;
      case 'schools':
        return <SchoolManagementForHeadMasters />;
      case 'teachers':
        return <TeacherManagement />;
      case 'students':
        return <StudentManagement />;
      case 'classes':
        return <ClassManagement />;
      case 'schedule':
        return <ScheduleManagement />;
      case 'achievements':
        return <AchievementsManagement />;
      case 'reports':
        return <ReportsManagement />;
      default:
        return <HeadMastersDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        <Link
          to="/school-project"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-600 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Về giới thiệu dự án</span>
        </Link>
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Hiệu trưởng (Head Masters)</h1>
              <p className="text-sm sm:text-base text-slate-600">Xem và theo dõi thành tích giáo viên và học sinh</p>
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
            <HeadMastersNavigation activeTab={activeTab} onTabChange={setActiveTab} orientation="vertical" />
          </aside>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <aside className="lg:hidden mb-4">
              <HeadMastersNavigation
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
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

export default HeadMastersPage;

