// Parents Dashboard Component
import { BookOpen, Award, TrendingUp, Calendar, FileText, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const studentInfo = {
  name: 'Nguyễn Văn A',
  class: '10A1',
  studentId: 'HS2024001',
  avgScore: 8.5,
  rank: 15,
  totalStudents: 45,
};

const scoreHistory = [
  { month: 'T9', math: 8.5, physics: 8.0, chemistry: 8.8, avg: 8.4 },
  { month: 'T10', math: 8.7, physics: 8.2, chemistry: 9.0, avg: 8.6 },
  { month: 'T11', math: 8.6, physics: 8.5, chemistry: 8.9, avg: 8.7 },
  { month: 'T12', math: 9.0, physics: 8.8, chemistry: 9.2, avg: 8.9 },
];

const subjectScores = [
  { subject: 'Toán', score: 9.0, rank: 5 },
  { subject: 'Văn', score: 8.2, rank: 12 },
  { subject: 'Anh', score: 8.5, rank: 8 },
  { subject: 'Lý', score: 8.8, rank: 6 },
  { subject: 'Hóa', score: 9.2, rank: 3 },
  { subject: 'Sinh', score: 8.0, rank: 15 },
];

const schedule = [
  { day: 'Thứ 2', morning: 'Toán, Văn', afternoon: 'Anh, Lý' },
  { day: 'Thứ 3', morning: 'Hóa, Sinh', afternoon: 'Toán, Văn' },
  { day: 'Thứ 4', morning: 'Anh, Lý', afternoon: 'Hóa, Sinh' },
  { day: 'Thứ 5', morning: 'Toán, Văn', afternoon: 'Anh, Lý' },
  { day: 'Thứ 6', morning: 'Hóa, Sinh', afternoon: 'Toán, Văn' },
];

const ParentsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Student Info Cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Thông tin học sinh</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Lớp học</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{studentInfo.class}</p>
            <p className="mt-1 text-xs text-blue-700">{studentInfo.name}</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Điểm TB</span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">{studentInfo.avgScore}</p>
            <p className="mt-1 text-xs text-emerald-700">Trung bình học kỳ</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Xếp hạng</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">
              {studentInfo.rank}/{studentInfo.totalStudents}
            </p>
            <p className="mt-1 text-xs text-purple-700">Trong lớp</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-amber-600" size={24} />
              <span className="text-xs font-semibold text-amber-700">Mã HS</span>
            </div>
            <p className="text-sm font-bold text-amber-900">{studentInfo.studentId}</p>
            <p className="mt-1 text-xs text-amber-700">Mã học sinh</p>
          </div>
        </div>
      </section>

      {/* Score Trend */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Xu hướng điểm số</h2>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreHistory}>
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
              <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={2} name="Toán" />
              <Line type="monotone" dataKey="physics" stroke="#10b981" strokeWidth={2} name="Lý" />
              <Line type="monotone" dataKey="chemistry" stroke="#f59e0b" strokeWidth={2} name="Hóa" />
              <Line type="monotone" dataKey="avg" stroke="#8b5cf6" strokeWidth={3} name="ĐTB" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject Scores */}
        <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Điểm số theo môn</h2>
          <div className="space-y-3">
            {subjectScores.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{item.subject}</p>
                  <p className="text-xs text-slate-500">Xếp hạng: {item.rank}/{studentInfo.totalStudents}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-indigo-600">{item.score}</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.score >= 8.5
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.score >= 7.0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.score >= 8.5 ? 'Xuất sắc' : item.score >= 7.0 ? 'Khá' : 'Trung bình'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-indigo-600" />
            Thời khóa biểu
          </h2>
          <div className="space-y-2">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                <div className="flex-shrink-0 w-20">
                  <p className="text-sm font-semibold text-slate-900">{item.day}</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock size={12} />
                    <span className="font-medium">Sáng:</span>
                    <span>{item.morning}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock size={12} />
                    <span className="font-medium">Chiều:</span>
                    <span>{item.afternoon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParentsDashboard;
