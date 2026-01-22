// My Schedule Component for Teachers
import { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { headMasterSchoolSchedule } from '../../data';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

const MySchedule = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Lọc lịch học của giáo viên
  const mySchedule = useMemo(() => {
    return headMasterSchoolSchedule.filter(
      (schedule) =>
        schedule.teacher === currentTeacher.name && schedule.subject === currentTeacher.subject
    );
  }, []);

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  const periods = Array.from({ length: 10 }, (_, i) => i + 1);

  const filteredSchedule = selectedDay
    ? mySchedule.filter((s) => s.day === selectedDay)
    : mySchedule;

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
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Thống kê lịch học</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng tiết</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{mySchedule.length}</p>
            <p className="text-xs text-blue-700 mt-1">tiết/tuần</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Số lớp</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{currentTeacher.classes.length}</p>
            <p className="text-xs text-emerald-700 mt-1">lớp đang dạy</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-purple-700 mb-1">Môn học</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{currentTeacher.subject}</p>
            <p className="text-xs text-purple-700 mt-1">đang dạy</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bảng
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Lịch
            </button>
          </div>
          <select
            value={selectedDay || 'all'}
            onChange={(e) => setSelectedDay(e.target.value === 'all' ? null : e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả các ngày</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Schedule Table */}
      {viewMode === 'table' && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Lịch học</h2>
          <div className="overflow-x-auto">
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
                    Lớp
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Môn học
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
                {filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-900 whitespace-nowrap">{schedule.day}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.period}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {schedule.class}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getSubjectColor(schedule.subject)}`}>
                        {schedule.subject}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.room}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{schedule.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Lịch học theo tuần</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 border border-slate-200">
                      Tiết
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 border border-slate-200 ${
                          selectedDay === day ? 'bg-indigo-50' : 'bg-slate-50'
                        }`}
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
                              <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200">
                                <p className="text-xs font-semibold text-indigo-900 mb-1">{schedule.class}</p>
                                <p className="text-xs text-indigo-700 mb-1">{schedule.subject}</p>
                                <div className="flex items-center gap-1 text-xs text-indigo-600">
                                  <MapPin size={10} />
                                  <span>{schedule.room}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-indigo-600 mt-1">
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

export default MySchedule;
