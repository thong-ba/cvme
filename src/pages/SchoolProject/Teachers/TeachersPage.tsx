// Teachers Page
import { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  TeachersDashboard,
  TeachersNavigation,
  SubjectManagement,
  MyClassesManagement,
  MyStudentsManagement,
  TeachingHistory,
  MySchedule,
  GradeReports,
  GradeEntry,
  GradeSubmission,
} from '../../../components/school';

const TeachersPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TeachersDashboard />;
      case 'subjects':
        return <SubjectManagement />;
      case 'classes':
        return <MyClassesManagement />;
      case 'students':
        return <MyStudentsManagement />;
      case 'history':
        return <TeachingHistory />;
      case 'schedule':
        return <MySchedule />;
      case 'grade-reports':
        return <GradeReports />;
      case 'grade-entry':
        return <GradeEntry />;
      case 'grade-submission':
        return <GradeSubmission />;
      default:
        return <TeachersDashboard />;
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Giáo viên (Teachers)</h1>
              <p className="text-sm sm:text-base text-slate-600">Quản lý lớp học, học sinh và điểm số</p>
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
            <TeachersNavigation activeTab={activeTab} onTabChange={setActiveTab} orientation="vertical" />
          </aside>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <aside className="lg:hidden mb-4">
              <TeachersNavigation
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

export default TeachersPage;

