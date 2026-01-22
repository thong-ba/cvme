// My Classes Management Component for Teachers
import { useState } from 'react';
import { BookOpen, Users, Award } from 'lucide-react';
import { headMasterSchoolClasses } from '../../data';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

const MyClassesManagement = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Lọc các lớp mà giáo viên đang dạy
  const myClasses = headMasterSchoolClasses.filter((cls) => currentTeacher.classes.includes(cls.name));

  const stats = {
    totalClasses: myClasses.length,
    totalStudents: myClasses.reduce((sum, cls) => sum + cls.students, 0),
    avgScore: (
      myClasses.reduce((sum, cls) => sum + cls.avgScore * cls.students, 0) /
      myClasses.reduce((sum, cls) => sum + cls.students, 0)
    ).toFixed(1),
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats Cards */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Tổng quan lớp học</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Lớp dạy</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.totalClasses}</p>
            <p className="text-xs text-blue-700 mt-1">Số lớp đang dạy</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Học sinh</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{stats.totalStudents}</p>
            <p className="text-xs text-emerald-700 mt-1">Tổng số học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Điểm TB</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{stats.avgScore}</p>
            <p className="text-xs text-purple-700 mt-1">Điểm trung bình chung</p>
          </div>
        </div>
      </section>

      {/* My Classes */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Lớp học của tôi</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {myClasses.map((cls) => (
            <div
              key={cls.id}
              className={`group rounded-xl border-2 p-5 transition-all duration-300 cursor-pointer ${
                selectedClass === cls.name
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg'
                  : 'border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-indigo-300 hover:shadow-lg'
              }`}
              onClick={() => setSelectedClass(selectedClass === cls.name ? null : cls.name)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900">{cls.name}</h3>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    selectedClass === cls.name
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {currentTeacher.subject}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Số học sinh:</span>
                  <span className="font-semibold text-slate-900">{cls.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Điểm trung bình:</span>
                  <span className="font-semibold text-indigo-600">{cls.avgScore}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Giáo viên chủ nhiệm:</span>
                  <span className="font-semibold text-slate-900">{cls.homeroomTeacher}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-xs text-slate-600">Xuất sắc</p>
                    <p className="text-sm font-bold text-emerald-600">{cls.excellent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600">Khá</p>
                    <p className="text-sm font-bold text-amber-600">{cls.good}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600">Trung bình</p>
                    <p className="text-sm font-bold text-slate-600">{cls.average}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyClassesManagement;
