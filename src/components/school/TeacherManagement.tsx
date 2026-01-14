// Teacher Management Component
import { useState, useMemo, useEffect } from 'react';
import { Users, Search, Mail, Phone, Eye, Edit } from 'lucide-react';
import { Pagination } from 'antd';
import { headMasterSchoolTeachers } from '../../data';
import TeacherDetailModal from './TeacherDetailModal';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'subject-asc' | 'subject-desc' | 'students-asc' | 'students-desc' | 'score-asc' | 'score-desc';

const TeacherManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedTeacher, setSelectedTeacher] = useState<typeof headMasterSchoolTeachers[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const teachersData = headMasterSchoolTeachers;

  // Get unique subjects from teachers data
  const subjects = Array.from(new Set(teachersData.map((t) => t.subject))).sort();

  // Get unique years from homeroom history
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    teachersData.forEach((teacher) => {
      if (teacher.homeroomHistory) {
        teacher.homeroomHistory.forEach((history) => {
          yearSet.add(history.year);
        });
      }
    });
    return Array.from(yearSet).sort().reverse();
  }, [teachersData]);

  const filteredAndSortedTeachers = useMemo(() => {
    let result = [...teachersData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.subject.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query)
      );
    }

    // Subject filter
    if (subjectFilter !== 'all') {
      result = result.filter((teacher) => teacher.subject === subjectFilter);
    }

    // Year filter (filter by teachers who were homeroom in that year)
    if (yearFilter !== 'all') {
      result = result.filter((teacher) =>
        teacher.homeroomHistory?.some((history) => history.year === yearFilter)
      );
    }

    // Sort
    if (sortOption !== 'default') {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'name-asc':
            return a.name.localeCompare(b.name, 'vi');
          case 'name-desc':
            return b.name.localeCompare(a.name, 'vi');
          case 'subject-asc':
            return a.subject.localeCompare(b.subject, 'vi');
          case 'subject-desc':
            return b.subject.localeCompare(a.subject, 'vi');
          case 'students-asc':
            return a.students - b.students;
          case 'students-desc':
            return b.students - a.students;
          case 'score-asc':
            return a.avgScore - b.avgScore;
          case 'score-desc':
            return b.avgScore - a.avgScore;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [searchQuery, subjectFilter, yearFilter, sortOption, teachersData]);

  const stats = {
    total: teachersData.length,
    active: teachersData.filter((t) => t.status === 'active').length,
    totalStudents: filteredAndSortedTeachers.reduce((sum, t) => sum + t.students, 0),
    avgScore: (
      filteredAndSortedTeachers.reduce((sum, t) => sum + t.avgScore * t.students, 0) /
      (filteredAndSortedTeachers.reduce((sum, t) => sum + t.students, 0) || 1)
    ).toFixed(1),
  };

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeachers = filteredAndSortedTeachers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, subjectFilter, yearFilter, sortOption]);

  const clearFilters = () => {
    setSearchQuery('');
    setSubjectFilter('all');
    setYearFilter('all');
    setSortOption('default');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || subjectFilter !== 'all' || yearFilter !== 'all' || sortOption !== 'default';

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        {/* Stats Cards */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thống kê giáo viên</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-700 mt-1">giáo viên</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Đang dạy</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-900">{stats.active}</p>
              <p className="text-xs text-emerald-700 mt-1">giáo viên</p>
            </div>
            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-purple-700 mb-1">Tổng HS</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-900">{stats.totalStudents}</p>
              <p className="text-xs text-purple-700 mt-1">học sinh</p>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
              <p className="text-xs font-semibold text-amber-700 mb-1">Điểm TB</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-900">{stats.avgScore}</p>
              <p className="text-xs text-amber-700 mt-1">toàn trường</p>
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
                  placeholder="Tìm kiếm giáo viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 text-sm sm:text-base"
                />
              </div>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
              >
                <option value="all">Tất cả môn học</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
              >
                <option value="all">Tất cả năm học</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
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
                <option value="subject-asc">Môn học A-Z</option>
                <option value="subject-desc">Môn học Z-A</option>
                <option value="students-asc">Số HS tăng dần</option>
                <option value="students-desc">Số HS giảm dần</option>
                <option value="score-asc">Điểm TB tăng dần</option>
                <option value="score-desc">Điểm TB giảm dần</option>
              </select>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs sm:text-sm text-slate-600">
                Tìm thấy <span className="font-semibold text-slate-800">{filteredAndSortedTeachers.length}</span> / {teachersData.length} giáo viên
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

        {/* Teachers Table */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Users size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
            <span>Danh sách giáo viên</span>
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Giáo viên
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Môn học
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Lớp dạy
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Số HS
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        Điểm TB
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
                    {paginatedTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{teacher.name}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
                            {teacher.subject}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {teacher.classes.map((cls, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-blue-50 px-1.5 sm:px-2 py-0.5 text-xs font-medium text-blue-700"
                              >
                                {cls}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{teacher.students}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                            {teacher.avgScore}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">
                          <div className="space-y-1 min-w-[140px]">
                            <div className="flex items-center gap-1 text-slate-600">
                              <Mail size={12} className="flex-shrink-0" />
                              <span className="text-xs truncate">{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600">
                              <Phone size={12} className="flex-shrink-0" />
                              <span className="text-xs">{teacher.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => setSelectedTeacher(teacher)}
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
              total={filteredAndSortedTeachers.length}
              pageSize={itemsPerPage}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} giáo viên`}
            />
          </div>
        </section>
    </div>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <TeacherDetailModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
      )}
    </>
  );
};

export default TeacherManagement;
