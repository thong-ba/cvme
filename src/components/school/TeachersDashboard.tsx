// Teachers Dashboard Component
import { useState, useMemo } from 'react';
import { BookOpen, Users, ClipboardList, Search, Eye } from 'lucide-react';
import { headMasterSchoolClasses, headMasterSchoolStudents } from '../../data';
import StudentDetailModal from './StudentDetailModal';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

const TeachersDashboard = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof headMasterSchoolStudents[0] | null>(null);

  // Lọc các lớp mà giáo viên đang dạy
  const myClasses = useMemo(() => {
    return headMasterSchoolClasses.filter((cls) => currentTeacher.classes.includes(cls.name));
  }, []);

  // Lọc học sinh trong các lớp mà giáo viên đang dạy
  const myStudents = useMemo(() => {
    return headMasterSchoolStudents.filter((student) => currentTeacher.classes.includes(student.class));
  }, []);

  const filteredStudents = useMemo(() => {
    return myStudents.filter(
      (student) =>
        (!selectedClass || student.class === selectedClass) &&
        (!searchQuery || student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedClass, searchQuery, myStudents]);

  // Lấy điểm môn học của học sinh
  const getSubjectScore = (student: typeof headMasterSchoolStudents[0]) => {
    const currentYear = student.gradeHistory?.find((gh) => gh.year === '2024-2025');
    if (!currentYear?.semester1) return null;
    const subject = currentYear.semester1.subjects.find((s) => s.name === currentTeacher.subject);
    return subject?.avg || null;
  };


  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats Cards */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Tổng quan lớp học</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Lớp dạy</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{myClasses.length}</p>
            <p className="mt-1 text-xs text-blue-700">Số lớp đang dạy</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Học sinh</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {myClasses.reduce((sum, cls) => sum + cls.students, 0)}
            </p>
            <p className="mt-1 text-xs text-emerald-700">Tổng số học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <ClipboardList className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Điểm TB</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">
              {(
                myClasses.reduce((sum, cls) => sum + cls.avgScore * cls.students, 0) /
                myClasses.reduce((sum, cls) => sum + cls.students, 0)
              ).toFixed(1)}
            </p>
            <p className="mt-1 text-xs text-purple-700">Điểm trung bình chung</p>
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
              className="group rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg cursor-pointer"
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Students List */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Users size={18} className="sm:w-5 sm:h-5 text-emerald-600" />
            <span>Danh sách học sinh</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
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
              value={selectedClass || 'all'}
              onChange={(e) => setSelectedClass(e.target.value === 'all' ? null : e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
            >
              <option value="all">Tất cả lớp</option>
              {myClasses.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Học sinh
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Lớp
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  {currentTeacher.subject}
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  ĐTB
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredStudents.slice(0, 10).map((student) => {
                const subjectScore = getSubjectScore(student);
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900">{student.name}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600">{student.class}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">
                      {subjectScore !== null ? (
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        aria-label="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Student Detail Modal */}
      {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  );
};

export default TeachersDashboard;
