// Schedule Management Component
import { useState } from 'react';
import { Calendar, Search, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { headMasterSchoolSchedule } from '../../data';

const ScheduleManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  const scheduleData = headMasterSchoolSchedule;

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  // Get unique classes from schedule data
  const classes = Array.from(new Set(scheduleData.map((s) => s.class))).sort();

  const filteredSchedule = scheduleData.filter(
    (item) =>
      (!searchQuery ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.class.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (dayFilter === 'all' || item.day === dayFilter) &&
      (classFilter === 'all' || item.class === classFilter)
  );

  // Group by class and day for calendar view
  const scheduleByClassAndDay = filteredSchedule.reduce((acc, item) => {
    const key = `${item.class}-${item.day}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof scheduleData>);

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats and Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Calendar size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
            <span>Quản lý lịch học</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bảng
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Lịch
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
          <div className="relative flex-1 w-full sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm (môn, giáo viên, lớp)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
            />
          </div>
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
          >
            <option value="all">Tất cả ngày</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
          >
            <option value="all">Tất cả lớp</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base">
            <Plus size={16} />
            <span>Thêm lịch</span>
          </button>
        </div>
        <div className="mt-3 text-sm text-slate-600">
          Hiển thị <span className="font-semibold text-slate-800">{filteredSchedule.length}</span> tiết học
        </div>
      </section>

      {/* Schedule Content */}
      {viewMode === 'table' ? (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                      Lớp
                    </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Tiết
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Môn học
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Giáo viên
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Phòng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Thời gian
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredSchedule.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{item.class}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.day}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.period}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
                          {item.subject}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.teacher}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.room}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.time}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button className="p-1 sm:p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" aria-label="Chỉnh sửa">
                            <Edit size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" aria-label="Xóa">
                            <Trash2 size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </section>
      ) : (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Lịch học theo lớp</h3>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {classes.map((cls) => (
              <div key={cls} className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
                <h4 className="text-lg font-bold text-slate-900 mb-3">{cls}</h4>
                <div className="space-y-2">
                  {days.map((day) => {
                    const key = `${cls}-${day}`;
                    const daySchedule = scheduleByClassAndDay[key] || [];
                    return (
                      <div key={day} className="border-b border-slate-200 pb-2 last:border-0">
                        <p className="text-sm font-semibold text-slate-700 mb-1">{day}</p>
                        {daySchedule.length > 0 ? (
                          <div className="space-y-1">
                            {daySchedule
                              .sort((a, b) => a.period - b.period)
                              .map((item) => (
                                <div key={item.id} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} className="text-slate-400" />
                                    <span className="font-medium">Tiết {item.period}:</span>
                                    <span className="text-slate-600">{item.subject}</span>
                                  </div>
                                  <span className="text-slate-500">{item.room}</span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">Không có lịch</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ScheduleManagement;
