// Head Masters Dashboard Component
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Users, Award, TrendingUp, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

// Mock data for Head Masters Dashboard
const teacherPerformanceData = [
  { name: 'Nguyễn Văn A', subject: 'Toán', students: 120, avgScore: 8.5, excellent: 45 },
  { name: 'Trần Thị B', subject: 'Văn', students: 115, avgScore: 8.2, excellent: 38 },
  { name: 'Lê Văn C', subject: 'Anh', students: 110, avgScore: 8.7, excellent: 52 },
  { name: 'Phạm Thị D', subject: 'Lý', students: 105, avgScore: 8.3, excellent: 42 },
  { name: 'Hoàng Văn E', subject: 'Hóa', students: 100, avgScore: 8.6, excellent: 48 },
];

const studentAchievementData = [
  { month: 'T9', excellent: 85, good: 120, average: 95 },
  { month: 'T10', excellent: 92, good: 125, average: 88 },
  { month: 'T11', excellent: 98, good: 130, average: 85 },
  { month: 'T12', excellent: 105, good: 135, average: 80 },
];

const classPerformanceData = [
  { class: '10A1', students: 45, avgScore: 8.5, excellent: 20 },
  { class: '10A2', students: 44, avgScore: 8.3, excellent: 18 },
  { class: '11A1', students: 43, avgScore: 8.6, excellent: 22 },
  { class: '11A2', students: 42, avgScore: 8.4, excellent: 19 },
  { class: '12A1', students: 41, avgScore: 8.7, excellent: 24 },
];

const subjectDistributionData = [
  { name: 'Toán', value: 25, color: '#3b82f6' },
  { name: 'Văn', value: 20, color: '#10b981' },
  { name: 'Anh', value: 18, color: '#f59e0b' },
  { name: 'Lý', value: 15, color: '#8b5cf6' },
  { name: 'Hóa', value: 12, color: '#ec4899' },
  { name: 'Khác', value: 10, color: '#6b7280' },
];

const HeadMastersDashboard = () => {
  const totalTeachers = 45;
  const totalStudents = 1250;
  const excellentAchievements = 320;
  const avgSchoolScore = 8.4;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Tổng quan trường học</h2>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Năm học 2024–2025
          </span>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Giáo viên</span>
            </div>
            <p className="text-3xl font-bold text-blue-900">{totalTeachers}</p>
            <p className="mt-1 text-xs text-blue-700">Tổng số giáo viên</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Học sinh</span>
            </div>
            <p className="text-3xl font-bold text-emerald-900">{totalStudents.toLocaleString('vi-VN')}</p>
            <p className="mt-1 text-xs text-emerald-700">Tổng số học sinh</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-amber-600" size={24} />
              <span className="text-xs font-semibold text-amber-700">Thành tích</span>
            </div>
            <p className="text-3xl font-bold text-amber-900">{excellentAchievements}</p>
            <p className="mt-1 text-xs text-amber-700">Thành tích xuất sắc</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Điểm TB</span>
            </div>
            <p className="text-3xl font-bold text-purple-900">{avgSchoolScore}</p>
            <p className="mt-1 text-xs text-purple-700">Điểm trung bình toàn trường</p>
          </div>
        </div>
      </section>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Student Achievement Trend */}
        <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Xu hướng thành tích học sinh</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studentAchievementData}>
                <defs>
                  <linearGradient id="colorExcellent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorGood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="excellent"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorExcellent)"
                  name="Xuất sắc"
                />
                <Area
                  type="monotone"
                  dataKey="good"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorGood)"
                  name="Khá"
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="#fef3c7"
                  name="Trung bình"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Subject Distribution */}
        <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Phân bố môn học</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: { name?: string; percent?: number }) => {
                    const { name = '', percent = 0 } = props;
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  dataKey="value"
                >
                  {subjectDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Teacher Performance */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-600" />
          Thành tích giáo viên
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Giáo viên
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Môn học
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Số HS
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Điểm TB
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Xuất sắc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {teacherPerformanceData.map((teacher, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{teacher.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{teacher.subject}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{teacher.students}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
                      {teacher.avgScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 size={12} />
                      {teacher.excellent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Class Performance */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <GraduationCap size={20} className="text-purple-600" />
          Thành tích theo lớp
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="class" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="avgScore" fill="#8b5cf6" name="Điểm trung bình" radius={[8, 8, 0, 0]} />
              <Bar dataKey="excellent" fill="#10b981" name="Số HS xuất sắc" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default HeadMastersDashboard;
