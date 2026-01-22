// My Students Management Component for Teachers
import { useState, useMemo } from 'react';
import { GraduationCap, Search, Eye } from 'lucide-react';
import { Pagination } from 'antd';
import { headMasterSchoolStudents } from '../../data';
import StudentDetailModal from './StudentDetailModal';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

const MyStudentsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<typeof headMasterSchoolStudents[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lọc học sinh trong các lớp mà giáo viên đang dạy
  const myStudents = useMemo(() => {
    return headMasterSchoolStudents.filter((student) => currentTeacher.classes.includes(student.class));
  }, []);

  const filteredStudents = useMemo(() => {
    let result = [...myStudents];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      );
    }

    if (classFilter !== 'all') {
      result = result.filter((student) => student.class === classFilter);
    }

    return result;
  }, [searchQuery, classFilter, myStudents]);

  const classes = Array.from(new Set(myStudents.map((s) => s.class))).sort();

  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getAvatarUrl = (name: string, avatar?: string) => {
    if (avatar) return avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true`;
  };

  // Lấy điểm môn học của học sinh
  const getSubjectScore = (student: typeof headMasterSchoolStudents[0]) => {
    const currentYear = student.gradeHistory?.find((gh) => gh.year === '2024-2025');
    if (!currentYear?.semester1) return null;
    const subject = currentYear.semester1.subjects.find((s) => s.name === currentTeacher.subject);
    return subject?.avg || null;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thống kê học sinh</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{myStudents.length}</p>
            <p className="text-xs text-blue-700 mt-1">học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Điểm TB môn {currentTeacher.subject}</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {(
                myStudents.reduce((sum, s) => {
                  const score = getSubjectScore(s);
                  return sum + (score || 0);
                }, 0) / myStudents.length
              ).toFixed(1)}
            </p>
            <p className="text-xs text-emerald-700 mt-1">toàn bộ học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-purple-700 mb-1">Số lớp</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{classes.length}</p>
            <p className="text-xs text-purple-700 mt-1">lớp đang dạy</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 w-full sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh..."
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
        </div>
        <div className="mt-3 text-xs sm:text-sm text-slate-600">
          Tìm thấy <span className="font-semibold text-slate-800">{filteredStudents.length}</span> / {myStudents.length} học sinh
        </div>
      </section>

      {/* Students Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <GraduationCap size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Danh sách học sinh</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Ảnh
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Học sinh
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Lớp
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  {currentTeacher.subject}
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Điểm TB
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedStudents.map((student) => {
                const subjectScore = getSubjectScore(student);
                return (
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
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {subjectScore !== null ? (
                        <span
                          className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${
                            subjectScore >= 8.5
                              ? 'bg-emerald-100 text-emerald-800'
                              : subjectScore >= 7.0
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {subjectScore}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
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
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="p-1 sm:p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        aria-label="Xem chi tiết"
                      >
                        <Eye size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredStudents.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} học sinh`}
          />
        </div>
      </section>

      {/* Student Detail Modal */}
      {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  );
};

export default MyStudentsManagement;
