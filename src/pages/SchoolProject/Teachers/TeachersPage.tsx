// Teachers Page
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TeachersDashboard } from '../../../components/school';

const TeachersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Link
          to="/school-project"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Về giới thiệu dự án</span>
        </Link>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Giáo viên (Teachers)</h1>
          <p className="text-slate-600">Quản lý lớp học, học sinh và điểm số</p>
        </div>
        <TeachersDashboard />
      </div>
    </div>
  );
};

export default TeachersPage;

