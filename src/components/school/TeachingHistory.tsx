// Teaching History Component for Teachers
import { History, Calendar, BookOpen, Users, Award } from 'lucide-react';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  homeroomHistory: [
    { class: '10A1', year: '2024-2025', startDate: '2024-08-01', endDate: null },
    { class: '11A1', year: '2023-2024', startDate: '2023-08-01', endDate: '2024-07-31' },
    { class: '10A1', year: '2022-2023', startDate: '2022-08-01', endDate: '2023-07-31' },
  ],
  teachingHistory: [
    {
      year: '2024-2025',
      classes: ['10A1', '10A2', '11A1'],
      subject: 'Toán',
      students: 120,
      avgScore: 8.5,
      status: 'Đang dạy',
    },
    {
      year: '2023-2024',
      classes: ['10A1', '10A2', '11A1'],
      subject: 'Toán',
      students: 118,
      avgScore: 8.4,
      status: 'Đã hoàn thành',
    },
    {
      year: '2022-2023',
      classes: ['10A1', '11A1'],
      subject: 'Toán',
      students: 88,
      avgScore: 8.3,
      status: 'Đã hoàn thành',
    },
  ],
};

const TeachingHistory = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <History size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Thống kê lịch sử dạy học</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Năm học</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{currentTeacher.teachingHistory.length}</p>
            <p className="text-xs text-blue-700 mt-1">đã dạy</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Tổng học sinh</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {currentTeacher.teachingHistory.reduce((sum, h) => sum + h.students, 0)}
            </p>
            <p className="text-xs text-emerald-700 mt-1">đã dạy</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-purple-700 mb-1">Điểm TB</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">
              {(
                currentTeacher.teachingHistory.reduce((sum, h) => sum + h.avgScore, 0) /
                currentTeacher.teachingHistory.length
              ).toFixed(1)}
            </p>
            <p className="text-xs text-purple-700 mt-1">qua các năm</p>
          </div>
        </div>
      </section>

      {/* Teaching History */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Lịch sử dạy học</span>
        </h2>
        <div className="space-y-4">
          {currentTeacher.teachingHistory.map((history, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{history.year}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                      {history.subject}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        history.status === 'Đang dạy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {history.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-600">Lớp dạy</p>
                    <p className="text-sm font-semibold text-slate-900">{history.classes.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-600">Số học sinh</p>
                    <p className="text-sm font-semibold text-slate-900">{history.students} học sinh</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-600">Điểm trung bình</p>
                    <p className="text-sm font-semibold text-indigo-600">{history.avgScore}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Homeroom History */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Users size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Lịch sử chủ nhiệm</span>
        </h2>
        <div className="space-y-3">
          {currentTeacher.homeroomHistory.map((history, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-indigo-100 p-3">
                  <Users size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Lớp {history.class} - Năm học {history.year}
                  </p>
                  <p className="text-sm text-slate-600">
                    Từ {formatDate(history.startDate)}
                    {history.endDate ? ` đến ${formatDate(history.endDate)}` : ' (Hiện tại)'}
                  </p>
                </div>
              </div>
              {!history.endDate && (
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Đang chủ nhiệm
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeachingHistory;
