// Student My Grades Component
import { Award, TrendingUp, BookOpen, FileText } from 'lucide-react';
import { headMasterSchoolStudents } from '../../data';
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
import { useState, useMemo } from 'react';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

const StudentMyGrades = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024-2025');

  // Lấy thông tin học sinh
  const student = headMasterSchoolStudents.find((s) => s.id === currentStudent.id);

  // Lấy điểm số theo tháng (mock data)
  const scoreHistory = useMemo(() => {
    if (!student) return [];
    const currentYear = student.gradeHistory?.find((gh) => gh.year === selectedYear);
    if (!currentYear?.semester1) return [];

    const subjects = currentYear.semester1.subjects;
    return [
      {
        month: 'T9',
        math: subjects.find((s) => s.name === 'Toán')?.avg || 0,
        physics: subjects.find((s) => s.name === 'Lý')?.avg || 0,
        chemistry: subjects.find((s) => s.name === 'Hóa')?.avg || 0,
        avg: currentYear.semester1.avgScore,
      },
      {
        month: 'T10',
        math: (subjects.find((s) => s.name === 'Toán')?.avg || 0) + 0.2,
        physics: (subjects.find((s) => s.name === 'Lý')?.avg || 0) + 0.2,
        chemistry: (subjects.find((s) => s.name === 'Hóa')?.avg || 0) + 0.2,
        avg: currentYear.semester1.avgScore + 0.2,
      },
      {
        month: 'T11',
        math: (subjects.find((s) => s.name === 'Toán')?.avg || 0) + 0.1,
        physics: (subjects.find((s) => s.name === 'Lý')?.avg || 0) + 0.3,
        chemistry: (subjects.find((s) => s.name === 'Hóa')?.avg || 0) + 0.1,
        avg: currentYear.semester1.avgScore + 0.2,
      },
      {
        month: 'T12',
        math: (subjects.find((s) => s.name === 'Toán')?.avg || 0) + 0.4,
        physics: (subjects.find((s) => s.name === 'Lý')?.avg || 0) + 0.3,
        chemistry: (subjects.find((s) => s.name === 'Hóa')?.avg || 0) + 0.4,
        avg: currentYear.semester1.avgScore + 0.4,
      },
    ];
  }, [student, selectedYear]);

  const subjectScores = useMemo(() => {
    if (!student) return [];
    const currentYear = student.gradeHistory?.find((gh) => gh.year === selectedYear);
    if (!currentYear?.semester1) return [];

    return currentYear.semester1.subjects.map((subject) => ({
      subject: subject.name,
      score: subject.avg,
    }));
  }, [student, selectedYear]);

  if (!student) return null;

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Award size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thống kê điểm số</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Lớp</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{student.class}</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Điểm TB</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{student.avgScore}</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Xếp hạng</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">
              {student.rank}/{student.totalStudents}
            </p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-amber-600" size={24} />
              <span className="text-xs font-semibold text-amber-700">Mã HS</span>
            </div>
            <p className="text-sm font-bold text-amber-900">{student.studentId}</p>
          </div>
        </div>
      </section>

      {/* Year Selector */}
      {student.gradeHistory && student.gradeHistory.length > 1 && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Chọn năm học</h2>
          <div className="flex flex-wrap gap-2">
            {student.gradeHistory.map((year) => (
              <button
                key={year.year}
                onClick={() => setSelectedYear(year.year)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedYear === year.year
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {year.year}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Score Trend */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Xu hướng điểm số</h2>
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

      {/* Subject Scores */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Điểm số theo môn</h2>
        <div className="space-y-3">
          {subjectScores.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold text-slate-900">{item.subject}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg sm:text-xl font-bold text-purple-600">{item.score}</span>
                <span
                  className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${
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

      {/* View Full Details Note */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="text-center">
          <p className="text-sm text-slate-600">Xem chi tiết đầy đủ điểm số theo từng loại điểm trong Dashboard</p>
        </div>
      </section>
    </div>
  );
};

export default StudentMyGrades;
