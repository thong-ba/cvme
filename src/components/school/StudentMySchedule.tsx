// Student My Schedule Component
import { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { headMasterSchoolSchedule, headMasterSchoolStudents } from '../../data';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

const StudentMySchedule = () => {
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Lấy thông tin học sinh
  const student = headMasterSchoolStudents.find((s) => s.id === currentStudent.id);

  // Lọc lịch học của học sinh
  const mySchedule = useMemo(() => {
    if (!student) return [];
    return headMasterSchoolSchedule.filter((schedule) => schedule.class === student.class);
  }, [student]);

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  const periods = Array.from({ length: 10 }, (_, i) => i + 1);

  const scheduleByDayAndPeriod = useMemo(() => {
    const result: Record<string, Record<number, typeof mySchedule[0]>> = {};
    days.forEach((day) => {
      result[day] = {};
      periods.forEach((period) => {
        const schedule = mySchedule.find((s) => s.day === day && s.period === period);
        if (schedule) {
          result[day][period] = schedule;
        }
      });
    });
    return result;
  }, [mySchedule]);

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Toán: 'bg-indigo-100 text-indigo-800',
      Văn: 'bg-emerald-100 text-emerald-800',
      Anh: 'bg-amber-100 text-amber-800',
      Lý: 'bg-purple-100 text-purple-800',
      Hóa: 'bg-pink-100 text-pink-800',
      Sinh: 'bg-green-100 text-green-800',
      Sử: 'bg-orange-100 text-orange-800',
      Địa: 'bg-cyan-100 text-cyan-800',
    };
    return colors[subject] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* View Mode Toggle */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Calendar size={18} className="sm:w-5 sm:h-5 text-purple-600" />
            <span>Thời khóa biểu - {student?.class}</span>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bảng
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Lịch
            </button>
          </div>
        </div>
      </section>

      {/* Schedule Table */}
      {viewMode === 'table' && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Ngày
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Tiết
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Môn học
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Giáo viên
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Phòng
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mySchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-900 whitespace-nowrap">{schedule.day}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.period}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getSubjectColor(schedule.subject)}`}>
                        {schedule.subject}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.teacher}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.room}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.time}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 border border-slate-200">
                      Tiết
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 border border-slate-200 bg-slate-50"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period) => (
                    <tr key={period}>
                      <td className="sticky left-0 z-10 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-900 border border-slate-200 text-center">
                        {period}
                      </td>
                      {days.map((day) => {
                        const schedule = scheduleByDayAndPeriod[day]?.[period];
                        return (
                          <td
                            key={day}
                            className="px-2 py-2 border border-slate-200 min-w-[120px] bg-white"
                          >
                            {schedule ? (
                              <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                                <p className="text-xs font-semibold text-purple-900 mb-1">{schedule.subject}</p>
                                <div className="flex items-center gap-1 text-xs text-purple-700">
                                  <MapPin size={10} />
                                  <span>{schedule.room}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-purple-700 mt-1">
                                  <Clock size={10} />
                                  <span>{schedule.time}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="p-2 text-center text-xs text-slate-400">—</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default StudentMySchedule;
