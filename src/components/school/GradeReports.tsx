// Grade Reports Component for Teachers
import { useState, useMemo } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { headMasterSchoolStudents } from '../../data';
import { Pagination } from 'antd';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

const GradeReports = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lọc học sinh trong các lớp mà giáo viên đang dạy
  const myStudents = useMemo(() => {
    return headMasterSchoolStudents.filter((student) => currentTeacher.classes.includes(student.class));
  }, []);

  const filteredStudents = useMemo(() => {
    let result = [...myStudents];

    if (selectedClass !== 'all') {
      result = result.filter((student) => student.class === selectedClass);
    }

    return result;
  }, [selectedClass, myStudents]);

  const classes = Array.from(new Set(myStudents.map((s) => s.class))).sort();

  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Lấy điểm môn học của học sinh
  const getSubjectScore = (student: typeof headMasterSchoolStudents[0], semester: 'semester1' | 'semester2' = 'semester1') => {
    const currentYear = student.gradeHistory?.find((gh) => gh.year === '2024-2025');
    if (!currentYear?.[semester]) return null;
    const subject = currentYear[semester]?.subjects.find((s) => s.name === currentTeacher.subject);
    return subject || null;
  };

  const stats = {
    total: filteredStudents.length,
    excellent: filteredStudents.filter((s) => {
      const score = getSubjectScore(s);
      return score && score.avg >= 8.5;
    }).length,
    good: filteredStudents.filter((s) => {
      const score = getSubjectScore(s);
      return score && score.avg >= 7.0 && score.avg < 8.5;
    }).length,
    average: filteredStudents.filter((s) => {
      const score = getSubjectScore(s);
      return score && score.avg < 7.0;
    }).length,
    avgScore: (
      filteredStudents.reduce((sum, s) => {
        const score = getSubjectScore(s);
        return sum + (score?.avg || 0);
      }, 0) / filteredStudents.length
    ).toFixed(1),
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <FileText size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Thống kê báo cáo điểm</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.total}</p>
            <p className="text-xs text-blue-700 mt-1">học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Xuất sắc</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{stats.excellent}</p>
            <p className="text-xs text-emerald-700 mt-1">học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">Khá</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">{stats.good}</p>
            <p className="text-xs text-amber-700 mt-1">học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-purple-700 mb-1">Điểm TB</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{stats.avgScore}</p>
            <p className="text-xs text-purple-700 mt-1">môn {currentTeacher.subject}</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
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
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả học kỳ</option>
            <option value="semester1">Học kỳ 1</option>
            <option value="semester2">Học kỳ 2</option>
          </select>
        </div>
      </section>

      {/* Reports Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <FileText size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Báo cáo điểm môn {currentTeacher.subject}</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Học sinh
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Lớp
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  M
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  15'
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  45'
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  HKI
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  HKII
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  ĐTB
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedStudents.map((student) => {
                const score = getSubjectScore(student);
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{student.name}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                      {score?.mieng !== null && score?.mieng !== undefined ? score.mieng : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                      {score?.fifteen1 !== null && score?.fifteen1 !== undefined
                        ? `${score.fifteen1}, ${score.fifteen2 || '—'}, ${score.fifteen3 || '—'}`
                        : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                      {score?.fortyfive1 !== null && score?.fortyfive1 !== undefined
                        ? `${score.fortyfive1}, ${score.fortyfive2 || '—'}`
                        : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                      {score?.hki !== null && score?.hki !== undefined ? score.hki : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                      {score?.hkii !== null && score?.hkii !== undefined ? score.hkii : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {score ? (
                        <span
                          className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${
                            score.avg >= 8.5
                              ? 'bg-emerald-100 text-emerald-800'
                              : score.avg >= 7.0
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {score.avg}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          className="p-1 sm:p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          aria-label="Xem chi tiết"
                        >
                          <Eye size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          className="p-1 sm:p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                          aria-label="Tải xuống"
                        >
                          <Download size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
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
    </div>
  );
};

export default GradeReports;
