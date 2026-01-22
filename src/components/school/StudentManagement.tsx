// Student Management Component
import { useState, useMemo, useEffect } from 'react';
import { GraduationCap, Search, Mail, Phone, Eye, Edit, Plus, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Pagination } from 'antd';
import { headMasterSchoolStudents } from '../../data';
import StudentDetailModal from './StudentDetailModal';
import AddEditStudentModal from './AddEditStudentModal';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'class-asc' | 'class-desc' | 'score-asc' | 'score-desc' | 'rank-asc' | 'rank-desc';
type ColumnSortKey = 'name' | 'studentId' | 'class' | 'avgScore' | 'rank' | 'rankInGrade' | 'rankInSchool' | null;
type SortDirection = 'asc' | 'desc' | null;

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [columnSort, setColumnSort] = useState<{ key: ColumnSortKey; direction: SortDirection }>({ key: null, direction: null });
  const [selectedStudent, setSelectedStudent] = useState<typeof headMasterSchoolStudents[0] | null>(null);
  const [editingStudent, setEditingStudent] = useState<typeof headMasterSchoolStudents[0] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [studentsData, setStudentsData] = useState(headMasterSchoolStudents);

  // Get unique classes from students data
  const classes = Array.from(new Set(studentsData.map((s) => s.class))).sort();

  // Get available classes
  const availableClasses = ['10A1', '10A2', '11A1', '11A2', '12A1'];

  // Generate avatar URL helper
  const getAvatarUrl = (name: string, avatar?: string) => {
    if (avatar) return avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true`;
  };

  const handleAddStudent = (studentData: Omit<typeof studentsData[0], 'id'> | typeof studentsData[0]) => {
    if ('id' in studentData) return; // Should not happen for add
    const maxId = Math.max(...studentsData.map((s) => s.id), 0);
    const newStudent: typeof studentsData[0] = {
      ...studentData,
      id: maxId + 1,
      avatar: getAvatarUrl(studentData.name, studentData.avatar),
    } as typeof studentsData[0];
    setStudentsData([...studentsData, newStudent]);
  };

  const handleEditStudent = (studentData: typeof studentsData[0] | Omit<typeof studentsData[0], 'id'>) => {
    if ('id' in studentData) {
      const updatedStudent: typeof studentsData[0] = {
        ...studentData,
        avatar: getAvatarUrl(studentData.name, studentData.avatar),
      } as typeof studentsData[0];
      setStudentsData(studentsData.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
      setEditingStudent(null);
    }
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
      setStudentsData(studentsData.filter((s) => s.id !== id));
    }
  };

  const handleColumnSort = (key: ColumnSortKey) => {
    if (columnSort.key === key) {
      // Toggle direction: null -> asc -> desc -> null
      if (columnSort.direction === null) {
        setColumnSort({ key, direction: 'asc' });
      } else if (columnSort.direction === 'asc') {
        setColumnSort({ key, direction: 'desc' });
      } else {
        setColumnSort({ key: null, direction: null });
      }
    } else {
      setColumnSort({ key, direction: 'asc' });
    }
    // Reset dropdown sort when using column sort
    setSortOption('default');
  };

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

    // Column sort (priority over dropdown sort)
    if (columnSort.key && columnSort.direction) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (columnSort.key) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            return columnSort.direction === 'asc'
              ? aValue.localeCompare(bValue, 'vi')
              : bValue.localeCompare(aValue, 'vi');
          case 'studentId':
            aValue = a.studentId;
            bValue = b.studentId;
            return columnSort.direction === 'asc'
              ? aValue.localeCompare(bValue, 'vi')
              : bValue.localeCompare(aValue, 'vi');
          case 'class':
            aValue = a.class;
            bValue = b.class;
            return columnSort.direction === 'asc'
              ? aValue.localeCompare(bValue, 'vi')
              : bValue.localeCompare(aValue, 'vi');
          case 'avgScore':
            aValue = a.avgScore;
            bValue = b.avgScore;
            return columnSort.direction === 'asc' ? aValue - bValue : bValue - aValue;
          case 'rank':
            aValue = a.rank;
            bValue = b.rank;
            return columnSort.direction === 'asc' ? aValue - bValue : bValue - aValue;
          case 'rankInGrade':
            aValue = (a as any).rankInGrade || 0;
            bValue = (b as any).rankInGrade || 0;
            return columnSort.direction === 'asc' ? aValue - bValue : bValue - aValue;
          case 'rankInSchool':
            aValue = (a as any).rankInSchool || 0;
            bValue = (b as any).rankInSchool || 0;
            return columnSort.direction === 'asc' ? aValue - bValue : bValue - aValue;
          default:
            return 0;
        }
      });
    } else if (sortOption !== 'default') {
      // Fallback to dropdown sort
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
  }, [searchQuery, classFilter, sortOption, columnSort, studentsData]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredAndSortedStudents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, classFilter, sortOption, columnSort]);

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
    setColumnSort({ key: null, direction: null });
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || classFilter !== 'all' || sortOption !== 'default' || columnSort.key !== null;

  const getSortIcon = (key: ColumnSortKey) => {
    if (columnSort.key !== key) {
      return <ArrowUpDown size={14} className="text-slate-400" />;
    }
    if (columnSort.direction === 'asc') {
      return <ArrowUp size={14} className="text-indigo-600" />;
    }
    if (columnSort.direction === 'desc') {
      return <ArrowDown size={14} className="text-indigo-600" />;
    }
    return <ArrowUpDown size={14} className="text-slate-400" />;
  };

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
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                <Plus size={16} />
                <span>Thêm học sinh</span>
              </button>
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
                        Ảnh
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Học sinh</span>
                          {getSortIcon('name')}
                        </div>
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('studentId')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Mã HS</span>
                          {getSortIcon('studentId')}
                        </div>
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('class')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Lớp</span>
                          {getSortIcon('class')}
                        </div>
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('avgScore')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Điểm TB</span>
                          {getSortIcon('avgScore')}
                        </div>
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('rank')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Xếp hạng</span>
                          {getSortIcon('rank')}
                        </div>
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('rankInGrade')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Xếp hạng khối</span>
                          {getSortIcon('rankInGrade')}
                        </div>
                      </th>
                      <th
                        className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                        onClick={() => handleColumnSort('rankInSchool')}
                      >
                        <div className="flex items-center gap-1">
                          <span>Xếp hạng trường</span>
                          {getSortIcon('rankInSchool')}
                        </div>
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
                        <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                          <img
                            src={getAvatarUrl(student.name, student.avatar)}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-100"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = getAvatarUrl(student.name);
                            }}
                          />
                        </td>
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
                            <button
                              onClick={() => setEditingStudent(student)}
                              className="p-1 sm:p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                              aria-label="Chỉnh sửa"
                            >
                              <Edit size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              aria-label="Xóa"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
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

      {/* Add/Edit Student Modal */}
      <AddEditStudentModal
        isOpen={isAddModalOpen || !!editingStudent}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={(studentData) => {
          if (editingStudent && 'id' in studentData) {
            handleEditStudent(studentData as typeof studentsData[0]);
          } else if (!editingStudent && !('id' in studentData)) {
            handleAddStudent(studentData as Omit<typeof studentsData[0], 'id'>);
          }
        }}
        student={editingStudent}
        availableClasses={availableClasses}
      />
    </>
  );
};

export default StudentManagement;
