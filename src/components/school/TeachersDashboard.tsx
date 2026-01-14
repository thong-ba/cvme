// Teachers Dashboard Component
import { useState } from 'react';
import { BookOpen, Users, ClipboardList, Search, Edit, Eye } from 'lucide-react';

// Mock data
const myClasses = [
  { id: 1, name: '10A1', subject: 'Toán', students: 45, avgScore: 8.5 },
  { id: 2, name: '10A2', subject: 'Toán', students: 44, avgScore: 8.3 },
  { id: 3, name: '11A1', subject: 'Toán', students: 43, avgScore: 8.6 },
];

const studentsData = [
  { id: 1, name: 'Nguyễn Văn A', class: '10A1', math: 9.0, physics: 8.5, chemistry: 8.8, avg: 8.8 },
  { id: 2, name: 'Trần Thị B', class: '10A1', math: 8.5, physics: 8.0, chemistry: 8.2, avg: 8.2 },
  { id: 3, name: 'Lê Văn C', class: '10A1', math: 7.5, physics: 7.8, chemistry: 7.6, avg: 7.6 },
  { id: 4, name: 'Phạm Thị D', class: '10A2', math: 9.2, physics: 9.0, chemistry: 9.1, avg: 9.1 },
  { id: 5, name: 'Hoàng Văn E', class: '10A2', math: 8.0, physics: 8.2, chemistry: 8.1, avg: 8.1 },
];

const TeachersDashboard = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = studentsData.filter(
    (student) =>
      (!selectedClass || student.class === selectedClass) &&
      (!searchQuery || student.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Tổng quan lớp học</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Lớp dạy</span>
            </div>
            <p className="text-3xl font-bold text-blue-900">{myClasses.length}</p>
            <p className="mt-1 text-xs text-blue-700">Số lớp đang dạy</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Học sinh</span>
            </div>
            <p className="text-3xl font-bold text-emerald-900">
              {myClasses.reduce((sum, cls) => sum + cls.students, 0)}
            </p>
            <p className="mt-1 text-xs text-emerald-700">Tổng số học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <ClipboardList className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Điểm TB</span>
            </div>
            <p className="text-3xl font-bold text-purple-900">
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
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-600" />
            Lớp học của tôi
          </h2>
        </header>
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
                  {cls.subject}
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
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Users size={20} className="text-emerald-600" />
            Danh sách học sinh
          </h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm học sinh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
              />
            </div>
            <select
              value={selectedClass || 'all'}
              onChange={(e) => setSelectedClass(e.target.value === 'all' ? null : e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
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
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Học sinh
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Lớp
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Toán
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Lý
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Hóa
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  ĐTB
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.class}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.math}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.physics}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.chemistry}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        student.avg >= 8.0
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.avg >= 6.5
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.avg}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TeachersDashboard;
