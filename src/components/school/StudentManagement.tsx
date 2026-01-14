// Student Management Component
import { useState, useMemo, useEffect } from 'react';
import { GraduationCap, Search, Mail, Phone, Eye, Edit } from 'lucide-react';
import { Pagination } from 'antd';
import { headMasterSchoolStudents } from '../../data';
import StudentDetailModal from './StudentDetailModal';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'class-asc' | 'class-desc' | 'score-asc' | 'score-desc' | 'rank-asc' | 'rank-desc';

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedStudent, setSelectedStudent] = useState<typeof headMasterSchoolStudents[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const studentsData = headMasterSchoolStudents;

  // Get unique classes from students data
  const classes = Array.from(new Set(studentsData.map((s) => s.class))).sort();

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...studentsData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      );
    }

    // Class filter
    if (classFilter !== 'all') {
      result = result.filter((student) => student.class === classFilter);
    }

    // Sort
    if (sortOption !== 'default') {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'name-asc':
            return a.name.localeCompare(b.name, 'vi');
          case 'name-desc':
            return b.name.localeCompare(a.name, 'vi');
          case 'class-asc':
            return a.class.localeCompare(b.class, 'vi');
          case 'class-desc':
            return b.class.localeCompare(a.class, 'vi');
          case 'score-asc':
            return a.avgScore - b.avgScore;
          case 'score-desc':
            return b.avgScore - a.avgScore;
          case 'rank-asc':
            return a.rank - b.rank;
          case 'rank-desc':
            return b.rank - a.rank;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [searchQuery, classFilter, sortOption, studentsData]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredAndSortedStudents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, classFilter, sortOption]);

  const stats = {
    total: studentsData.length,
    active: studentsData.filter((s) => s.status === 'active').length,
    avgScore: (studentsData.reduce((sum, s) => sum + s.avgScore, 0) / studentsData.length).toFixed(1),
    excellent: studentsData.filter((s) => s.avgScore >= 8.5).length,
  };

  const clearFilters = () => {
    setSearchQuery('');
    setClassFilter('all');
    setSortOption('default');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || classFilter !== 'all' || sortOption !== 'default';

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        {/* Stats Cards */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thống kê học sinh</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-700 mt-1">học sinh</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Đang học</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-900">{stats.active}</p>
              <p className="text-xs text-emerald-700 mt-1">học sinh</p>
            </div>
            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-purple-700 mb-1">Điểm TB</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-900">{stats.avgScore}</p>
              <p className="text-xs text-purple-700 mt-1">toàn trường</p>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-amber-700 mb-1">Xuất sắc</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-900">{stats.excellent}</p>
              <p className="text-xs text-amber-700 mt-1">học sinh</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
              <div className="relative flex-1 w-full sm:min-w-[250px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm học sinh (tên hoặc mã HS)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 text-sm sm:text-base"
                />
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
              >
                <option value="all">Tất cả lớp</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
              >
                <option value="default">Sắp xếp mặc định</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
                <option value="class-asc">Lớp A-Z</option>
                <option value="class-desc">Lớp Z-A</option>
                <option value="score-asc">Điểm TB tăng dần</option>
                <option value="score-desc">Điểm TB giảm dần</option>
                <option value="rank-asc">Xếp hạng tăng dần</option>
                <option value="rank-desc">Xếp hạng giảm dần</option>
              </select>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs sm:text-sm text-slate-600">
                Tìm thấy <span className="font-semibold text-slate-800">{filteredAndSortedStudents.length}</span> / {studentsData.length} học sinh
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium underline"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Students Table */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <GraduationCap size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
            <span>Danh sách học sinh</span>
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Học sinh
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Mã HS
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Lớp
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Điểm TB
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Xếp hạng
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Xếp hạng khối
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Xếp hạng trường
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Liên hệ
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {paginatedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{student.name}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{student.studentId}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                            {student.class}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${
                              student.avgScore >= 8.5
                                ? 'bg-emerald-100 text-emerald-800'
                                : student.avgScore >= 7.0
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {student.avgScore}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">{student.rank}/{student.totalStudents}</span>
                            <span className="text-xs text-slate-500">Trong lớp</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">
                              {(student as any).rankInGrade || '-'}/{(student as any).totalStudentsInGrade || '-'}
                            </span>
                            <span className="text-xs text-slate-500">Trong khối</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">
                              {(student as any).rankInSchool || '-'}/{(student as any).totalStudentsInSchool || '-'}
                            </span>
                            <span className="text-xs text-slate-500">Trong trường</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">
                          <div className="space-y-1 min-w-[140px]">
                            <div className="flex items-center gap-1 text-slate-600">
                              <Mail size={12} className="flex-shrink-0" />
                              <span className="text-xs truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600">
                              <Phone size={12} className="flex-shrink-0" />
                              <span className="text-xs">{student.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => setSelectedStudent(student)}
                              className="p-1 sm:p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              aria-label="Xem chi tiết"
                            >
                              <Eye size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-1 sm:p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors" aria-label="Chỉnh sửa">
                              <Edit size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              total={filteredAndSortedStudents.length}
              pageSize={itemsPerPage}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} học sinh`}
            />
          </div>
        </section>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </>
  );
};

export default StudentManagement;
