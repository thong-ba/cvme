// Students Dashboard Component
import { useMemo } from 'react';
import { Award, Calendar, BookOpen, TrendingUp, FileText, Clock } from 'lucide-react';
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
import { headMasterSchoolStudents, headMasterSchoolSchedule, headMasterSchoolTeachers } from '../../data';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

const StudentsDashboard = () => {
  // Lấy thông tin học sinh
  const student = headMasterSchoolStudents.find((s) => s.id === currentStudent.id);

  // Lấy điểm số theo tháng
  const myScores = useMemo(() => {
    if (!student) return [];
    const currentYear = student.gradeHistory?.find((gh) => gh.year === '2024-2025');
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
  }, [student]);

  const subjectDetails = useMemo(() => {
    if (!student) return [];
    const currentYear = student.gradeHistory?.find((gh) => gh.year === '2024-2025');
    if (!currentYear?.semester1) return [];

    return currentYear.semester1.subjects.map((subject) => {
      const teacher = headMasterSchoolTeachers.find((t) => t.subject === subject.name);
      return {
        subject: subject.name,
        score: subject.avg,
        rank: Math.floor(Math.random() * student.totalStudents) + 1, // Mock rank
        teacher: teacher?.name || '—',
      };
    });
  }, [student]);

  const achievements = [
    { title: 'Học sinh giỏi học kỳ I', date: '12/2024', type: 'excellent' },
    { title: 'Giải nhất môn Toán cấp trường', date: '11/2024', type: 'award' },
    { title: 'Tham gia đội tuyển học sinh giỏi', date: '10/2024', type: 'participation' },
  ];

  // Lấy lịch học
  const schedule = useMemo(() => {
    if (!student) return [];
    const mySchedule = headMasterSchoolSchedule.filter((s) => s.class === student.class);
    const scheduleByDay: Record<string, { morning: string[]; afternoon: string[] }> = {};

    mySchedule.forEach((s) => {
      if (!scheduleByDay[s.day]) {
        scheduleByDay[s.day] = { morning: [], afternoon: [] };
      }
      if (s.period <= 4) {
        scheduleByDay[s.day].morning.push(s.subject);
      } else {
        scheduleByDay[s.day].afternoon.push(s.subject);
      }
    });

    return Object.entries(scheduleByDay).map(([day, subjects]) => ({
      day,
      morning: subjects.morning.join(', '),
      afternoon: subjects.afternoon.join(', '),
    }));
  }, [student]);

  if (!student) return null;
  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* My Info Cards */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Thông tin của tôi</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Lớp học</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{student.class}</p>
            <p className="mt-1 text-xs text-blue-700">{student.name}</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Điểm TB</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{student.avgScore}</p>
            <p className="mt-1 text-xs text-emerald-700">Trung bình học kỳ</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Xếp hạng</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">
              {student.rank}/{student.totalStudents}
            </p>
            <p className="mt-1 text-xs text-purple-700">Trong lớp</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-amber-600" size={24} />
              <span className="text-xs font-semibold text-amber-700">Mã HS</span>
            </div>
            <p className="text-sm font-bold text-amber-900">{student.studentId}</p>
            <p className="mt-1 text-xs text-amber-700">Mã học sinh</p>
          </div>
        </div>
      </section>

      {/* Score Trend */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Xu hướng điểm số của tôi</h2>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={myScores}>
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

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Subject Details */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Điểm số chi tiết</h2>
          <div className="space-y-3">
            {subjectDetails.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold text-slate-900">{item.subject}</p>
                  <p className="text-xs text-slate-500">GV: {item.teacher} | Xếp hạng: {item.rank}/{student.totalStudents}</p>
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

        {/* Achievements */}
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Award size={18} className="sm:w-5 sm:h-5 text-amber-600" />
            <span>Thành tích</span>
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.type === 'excellent'
                      ? 'bg-emerald-100 text-emerald-600'
                      : achievement.type === 'award'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <Award size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{achievement.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Schedule */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thời khóa biểu</span>
        </h2>
        <div className="grid gap-3 md:grid-cols-5">
          {schedule.map((item, index) => (
            <div key={index} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
              <p className="text-sm font-semibold text-slate-900 mb-2">{item.day}</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-1.5">
                  <Clock size={12} className="text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-700">Sáng:</p>
                    <p className="text-slate-600">{item.morning}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock size={12} className="text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-700">Chiều:</p>
                    <p className="text-slate-600">{item.afternoon}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentsDashboard;
