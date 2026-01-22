// Schedule Management Component
import { useState, useMemo, useEffect } from 'react';
import { Calendar, Search, Clock, Plus, Edit, Trash2, User, MapPin, X, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Pagination } from 'antd';
import { headMasterSchoolSchedule } from '../../data';
import AddScheduleModal from './AddScheduleModal';

type SortOption = 'default' | 'class-asc' | 'class-desc' | 'day-asc' | 'day-desc' | 'period-asc' | 'period-desc' | 'subject-asc' | 'subject-desc' | 'teacher-asc' | 'teacher-desc' | 'time-asc' | 'time-desc';

const ScheduleManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [schedules, setSchedules] = useState(headMasterSchoolSchedule);
  
  const itemsPerPage = 10;

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Các tiết học trong ngày
  
  // Get unique classes, teachers, subjects from schedule data
  const classes = Array.from(new Set(schedules.map((s) => s.class))).sort();
  const teachers = Array.from(new Set(schedules.map((s) => s.teacher))).sort();
  const subjects = Array.from(new Set(schedules.map((s) => s.subject))).sort();
  
  // Auto-select first class if none selected
  useEffect(() => {
    if (!selectedClass && classes.length > 0 && viewMode === 'calendar') {
      setSelectedClass(classes[0]);
    }
  }, [selectedClass, classes, viewMode]);

  // Filter and sort schedule
  const filteredAndSortedSchedule = useMemo(() => {
    let result = [...schedules];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.subject.toLowerCase().includes(query) ||
          item.teacher.toLowerCase().includes(query) ||
          item.class.toLowerCase().includes(query) ||
          item.room.toLowerCase().includes(query)
      );
    }

    // Day filter
    if (dayFilter !== 'all') {
      result = result.filter((item) => item.day === dayFilter);
    }

    // Class filter
    if (classFilter !== 'all') {
      result = result.filter((item) => item.class === classFilter);
    }

    // Sort
    if (sortOption !== 'default') {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'class-asc':
            return a.class.localeCompare(b.class, 'vi');
          case 'class-desc':
            return b.class.localeCompare(a.class, 'vi');
          case 'day-asc':
            return days.indexOf(a.day) - days.indexOf(b.day);
          case 'day-desc':
            return days.indexOf(b.day) - days.indexOf(a.day);
          case 'period-asc':
            return a.period - b.period;
          case 'period-desc':
            return b.period - a.period;
          case 'subject-asc':
            return a.subject.localeCompare(b.subject, 'vi');
          case 'subject-desc':
            return b.subject.localeCompare(a.subject, 'vi');
          case 'teacher-asc':
            return a.teacher.localeCompare(b.teacher, 'vi');
          case 'teacher-desc':
            return b.teacher.localeCompare(a.teacher, 'vi');
          case 'time-asc':
            return a.time.localeCompare(b.time, 'vi');
          case 'time-desc':
            return b.time.localeCompare(a.time, 'vi');
          default:
            return 0;
        }
      });
    }

    return result;
  }, [schedules, searchQuery, dayFilter, classFilter, sortOption]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSchedule = filteredAndSortedSchedule.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, dayFilter, classFilter, sortOption]);

  const handleAddSchedule = (newSchedule: Omit<typeof schedules[0], 'id'>) => {
    const maxId = Math.max(...schedules.map((s) => s.id), 0);
    const scheduleToAdd = {
      ...newSchedule,
      id: maxId + 1,
    };
    setSchedules([...schedules, scheduleToAdd]);
  };

  const handleDeleteSchedule = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch học này?')) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
  };

  // Get schedule for selected class in calendar view
  const selectedClassSchedule = useMemo(() => {
    if (!selectedClass) return {};
    const classSchedule = filteredAndSortedSchedule.filter((s) => s.class === selectedClass);
    const scheduleMap: Record<string, Record<number, typeof schedules[0]>> = {};
    
    days.forEach((day) => {
      scheduleMap[day] = {};
      classSchedule
        .filter((s) => s.day === day)
        .forEach((item) => {
          scheduleMap[day][item.period] = item;
        });
    });
    
    return scheduleMap;
  }, [selectedClass, filteredAndSortedSchedule]);

  const getSortIcon = (column: SortOption) => {
    if (sortOption === column) {
      return <ArrowUp size={14} className="text-indigo-600" />;
    }
    if (sortOption === column.replace('-asc', '-desc') || sortOption === column.replace('-desc', '-asc')) {
      return <ArrowDown size={14} className="text-indigo-600" />;
    }
    return <ArrowUpDown size={14} className="text-slate-400" />;
  };

  const handleSort = (column: SortOption) => {
    if (sortOption === column) {
      // Toggle to desc
      setSortOption(column.replace('-asc', '-desc') as SortOption);
    } else if (sortOption === column.replace('-asc', '-desc')) {
      // Toggle to default
      setSortOption('default');
    } else {
      // Set to asc
      setSortOption(column);
    }
  };

  // Get subject colors for visual distinction
  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Toán': 'bg-blue-100 text-blue-800 border-blue-200',
      'Văn': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Anh': 'bg-amber-100 text-amber-800 border-amber-200',
      'Lý': 'bg-purple-100 text-purple-800 border-purple-200',
      'Hóa': 'bg-pink-100 text-pink-800 border-pink-200',
      'Sinh': 'bg-green-100 text-green-800 border-green-200',
      'Sử': 'bg-orange-100 text-orange-800 border-orange-200',
      'Địa': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'GDCD': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Thể dục': 'bg-red-100 text-red-800 border-red-200',
      'Tin học': 'bg-slate-100 text-slate-800 border-slate-200',
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

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
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            <Plus size={16} />
            <span>Thêm lịch</span>
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span>
            Hiển thị <span className="font-semibold text-slate-800">{filteredAndSortedSchedule.length}</span> tiết học
            {filteredAndSortedSchedule.length !== schedules.length && (
              <span className="ml-2 text-slate-500">
                (tổng: {schedules.length})
              </span>
            )}
          </span>
          {(searchQuery || dayFilter !== 'all' || classFilter !== 'all' || sortOption !== 'default') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDayFilter('all');
                setClassFilter('all');
                setSortOption('default');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
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
                      <button
                        onClick={() => handleSort('class-asc')}
                        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                      >
                        Lớp
                        {getSortIcon('class-asc')}
                      </button>
                    </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    <button
                      onClick={() => handleSort('day-asc')}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                      Ngày
                      {getSortIcon('day-asc')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    <button
                      onClick={() => handleSort('period-asc')}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                      Tiết
                      {getSortIcon('period-asc')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    <button
                      onClick={() => handleSort('subject-asc')}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                      Môn học
                      {getSortIcon('subject-asc')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    <button
                      onClick={() => handleSort('teacher-asc')}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                      Giáo viên
                      {getSortIcon('teacher-asc')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Phòng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    <button
                      onClick={() => handleSort('time-asc')}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                      Thời gian
                      {getSortIcon('time-asc')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedSchedule.length > 0 ? (
                    paginatedSchedule.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{item.class}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.day}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{item.period}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getSubjectColor(item.subject)}`}>
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
                            <button
                              onClick={() => handleDeleteSchedule(item.id)}
                              className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              aria-label="Xóa"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                        Không tìm thấy lịch học nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        {filteredAndSortedSchedule.length > itemsPerPage && (
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              current={currentPage}
              total={filteredAndSortedSchedule.length}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} tiết học`}
            />
          </div>
        )}
        </section>
      ) : (
        <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          {/* Class Selector */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Lịch học theo lớp</h3>
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600 font-medium">Chọn lớp:</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white font-medium"
                >
                  <option value="">-- Chọn lớp --</option>
                  {classes.map((cls) => {
                    const classSchedule = filteredAndSortedSchedule.filter((s) => s.class === cls);
                    return (
                      <option key={cls} value={cls}>
                        {cls} ({classSchedule.length} tiết)
                      </option>
                    );
                  })}
                </select>
                {selectedClass && (
                  <button
                    onClick={() => setSelectedClass('')}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Xóa lựa chọn"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Calendar View */}
          {selectedClass ? (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 bg-slate-50 border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-700 text-left min-w-[80px]">
                        Tiết
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="border border-slate-200 px-2 py-3 text-xs font-semibold text-slate-700 text-center bg-slate-50 min-w-[180px]"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map((period) => (
                      <tr key={period} className="hover:bg-slate-50/50 transition-colors">
                        <td className="sticky left-0 z-10 bg-white border border-slate-200 px-3 py-4 text-sm font-bold text-slate-900 text-center">
                          {period}
                        </td>
                        {days.map((day) => {
                          const scheduleItem = selectedClassSchedule[day]?.[period];
                          return (
                            <td
                              key={`${day}-${period}`}
                              className="border border-slate-200 px-2 py-2 align-top"
                            >
                              {scheduleItem ? (
                                <div
                                  className={`rounded-lg border-2 p-2.5 transition-all hover:shadow-lg cursor-pointer ${getSubjectColor(scheduleItem.subject)}`}
                                >
                                  <div className="flex items-start justify-between mb-1.5">
                                    <span className="text-xs font-bold">{scheduleItem.subject}</span>
                                    <span className="text-[10px] font-semibold opacity-75">T{scheduleItem.period}</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-[10px] opacity-90">
                                      <Clock size={10} />
                                      <span className="font-medium">{scheduleItem.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] opacity-90">
                                      <User size={10} />
                                      <span className="truncate" title={scheduleItem.teacher}>
                                        {scheduleItem.teacher}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] opacity-90">
                                      <MapPin size={10} />
                                      <span className="font-medium">{scheduleItem.room}</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full min-h-[80px] flex items-center justify-center">
                                  <span className="text-xs text-slate-300">—</span>
                                </div>
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
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Vui lòng chọn lớp để xem lịch học</p>
            </div>
          )}
        </section>
      )}

      {/* Add Schedule Modal */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSchedule}
        classes={classes}
        teachers={teachers}
        subjects={subjects}
      />
    </div>
  );
};

export default ScheduleManagement;
