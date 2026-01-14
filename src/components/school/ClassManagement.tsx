// Class Management Component
import { useState } from 'react';
import { BookOpen, Search, Eye, Edit, Plus } from 'lucide-react';
import { headMasterSchoolClasses } from '../../data';

const ClassManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  const classesData = headMasterSchoolClasses;

  const filteredClasses = classesData.filter(
    (cls) =>
      (!searchQuery || cls.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (gradeFilter === 'all' || cls.grade === gradeFilter)
  );

  const stats = {
    total: classesData.length,
    totalStudents: classesData.reduce((sum, cls) => sum + cls.students, 0),
    avgScore: (
      classesData.reduce((sum, cls) => sum + cls.avgScore * cls.students, 0) /
      classesData.reduce((sum, cls) => sum + cls.students, 0)
    ).toFixed(1),
    excellent: classesData.reduce((sum, cls) => sum + cls.excellent, 0),
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats Cards */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thống kê lớp học</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số lớp</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            <p className="text-xs text-blue-700 mt-1">lớp học</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Tổng học sinh</p>
            <p className="text-2xl font-bold text-emerald-900">{stats.totalStudents}</p>
            <p className="text-xs text-emerald-700 mt-1">học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4">
            <p className="text-xs font-semibold text-purple-700 mb-1">Điểm TB</p>
            <p className="text-2xl font-bold text-purple-900">{stats.avgScore}</p>
            <p className="text-xs text-purple-700 mt-1">toàn trường</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">Xuất sắc</p>
            <p className="text-2xl font-bold text-amber-900">{stats.excellent}</p>
            <p className="text-xs text-amber-700 mt-1">học sinh</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center flex-1">
            <div className="relative flex-1 w-full sm:min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm lớp học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
              />
            </div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
            >
              <option value="all">Tất cả khối</option>
              <option value="10">Khối 10</option>
              <option value="11">Khối 11</option>
              <option value="12">Khối 12</option>
            </select>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base">
            <Plus size={16} />
            <span>Thêm lớp mới</span>
          </button>
        </div>
        <div className="mt-3 text-sm text-slate-600">
          Hiển thị <span className="font-semibold text-slate-800">{filteredClasses.length}</span> / {classesData.length} lớp học
        </div>
      </section>

      {/* Classes Grid */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Danh sách lớp học</span>
        </h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="group rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{cls.name}</h3>
                  <p className="text-sm text-slate-600">GVCN: {cls.homeroomTeacher}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                  Khối {cls.grade}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Số học sinh:</span>
                  <span className="font-semibold text-slate-900">{cls.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Điểm trung bình:</span>
                  <span className="font-semibold text-indigo-600">{cls.avgScore}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-600">Xuất sắc: {cls.excellent}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-slate-600">Khá: {cls.good}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-slate-600">TB: {cls.average}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium text-sm hover:bg-indigo-100 transition-colors">
                  <Eye size={16} />
                  Xem chi tiết
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors">
                  <Edit size={16} />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClassManagement;
