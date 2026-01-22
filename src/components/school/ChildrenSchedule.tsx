// Children Schedule Component for Parents
import { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { headMasterSchoolSchedule, headMasterSchoolStudents } from '../../data';

// Mock data - Giả sử phụ huynh đang đăng nhập có con là học sinh đầu tiên
const currentParent = {
  id: 1,
  name: 'Nguyễn Văn Phụ Huynh',
  children: [1], // ID của học sinh
};

const ChildrenSchedule = () => {
  const [selectedChildId, setSelectedChildId] = useState<number>(currentParent.children[0]);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Lấy thông tin con
  const children = headMasterSchoolStudents.filter((student) => currentParent.children.includes(student.id));
  const selectedChild = children.find((c) => c.id === selectedChildId) || children[0];

  // Lọc lịch học của con
  const childSchedule = useMemo(() => {
    if (!selectedChild) return [];
    return headMasterSchoolSchedule.filter((schedule) => schedule.class === selectedChild.class);
  }, [selectedChild]);

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  const periods = Array.from({ length: 10 }, (_, i) => i + 1);

  const scheduleByDayAndPeriod = useMemo(() => {
    const result: Record<string, Record<number, typeof childSchedule[0]>> = {};
    days.forEach((day) => {
      result[day] = {};
      periods.forEach((period) => {
        const schedule = childSchedule.find((s) => s.day === day && s.period === period);
        if (schedule) {
          result[day][period] = schedule;
        }
      });
    });
    return result;
  }, [childSchedule]);

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
      {/* Child Selector */}
      {children.length > 1 && (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Chọn con</h2>
          <div className="flex flex-wrap gap-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedChildId === child.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {child.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* View Mode Toggle */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Calendar size={18} className="sm:w-5 sm:h-5 text-pink-600" />
            <span>Lịch học - {selectedChild?.name} ({selectedChild?.class})</span>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bảng
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-pink-600 text-white'
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
                {childSchedule.map((schedule) => (
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
                              <div className="p-2 rounded-lg bg-pink-50 border border-pink-200">
                                <p className="text-xs font-semibold text-pink-900 mb-1">{schedule.subject}</p>
                                <div className="flex items-center gap-1 text-xs text-pink-700">
                                  <MapPin size={10} />
                                  <span>{schedule.room}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-pink-700 mt-1">
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

export default ChildrenSchedule;
