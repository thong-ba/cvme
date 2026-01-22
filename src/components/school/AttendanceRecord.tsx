// Attendance Record Component for Students and Parents
import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, Calendar, Clock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { headMasterSchoolStudents, headMasterSchoolSchedule } from '../../data';
import { Pagination } from 'antd';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

// Mock data - Điểm danh
interface AttendanceRecord {
  id: number;
  date: string;
  day: string;
  period: number;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: 1,
    date: '2024-12-15',
    day: 'Thứ 2',
    period: 1,
    subject: 'Toán',
    teacher: 'Nguyễn Văn A',
    room: 'P101',
    time: '7:00 - 7:45',
    status: 'present',
  },
  {
    id: 2,
    date: '2024-12-15',
    day: 'Thứ 2',
    period: 2,
    subject: 'Văn',
    teacher: 'Trần Thị B',
    room: 'P102',
    time: '7:50 - 8:35',
    status: 'present',
  },
  {
    id: 3,
    date: '2024-12-14',
    day: 'Thứ 6',
    period: 1,
    subject: 'Toán',
    teacher: 'Nguyễn Văn A',
    room: 'P101',
    time: '7:00 - 7:45',
    status: 'late',
    notes: 'Đến muộn 10 phút',
  },
  {
    id: 4,
    date: '2024-12-13',
    day: 'Thứ 5',
    period: 3,
    subject: 'Lý',
    teacher: 'Phạm Thị D',
    room: 'P201',
    time: '8:40 - 9:25',
    status: 'absent',
    notes: 'Có phép',
  },
  {
    id: 5,
    date: '2024-12-12',
    day: 'Thứ 4',
    period: 2,
    subject: 'Hóa',
    teacher: 'Hoàng Văn E',
    room: 'P202',
    time: '7:50 - 8:35',
    status: 'present',
  },
  {
    id: 6,
    date: '2024-12-11',
    day: 'Thứ 3',
    period: 1,
    subject: 'Anh',
    teacher: 'Lê Văn C',
    room: 'P103',
    time: '7:00 - 7:45',
    status: 'excused',
    notes: 'Nghỉ có phép',
  },
];

type SortField = 'date' | 'period' | 'subject' | 'teacher' | 'status' | null;
type SortDirection = 'asc' | 'desc' | null;

const AttendanceRecord = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lấy thông tin học sinh
  const student = headMasterSchoolStudents.find((s) => s.id === currentStudent.id);

  // Lấy danh sách môn học từ lịch học
  const subjects = useMemo(() => {
    if (!student) return [];
    const schedule = headMasterSchoolSchedule.filter((s) => s.class === student.class);
    return Array.from(new Set(schedule.map((s) => s.subject))).sort();
  }, [student]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={12} className="text-slate-400" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp size={12} className="text-purple-600" />;
    }
    return <ArrowDown size={12} className="text-purple-600" />;
  };

  const filteredAttendance = useMemo(() => {
    let result = [...mockAttendance];

    if (selectedStatus !== 'all') {
      result = result.filter((item) => item.status === selectedStatus);
    }

    if (selectedSubject !== 'all') {
      result = result.filter((item) => item.subject === selectedSubject);
    }

    if (selectedDate !== 'all') {
      result = result.filter((item) => item.date === selectedDate);
    }

    // Sort
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'date':
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            break;
          case 'period':
            comparison = a.period - b.period;
            break;
          case 'subject':
            comparison = a.subject.localeCompare(b.subject);
            break;
          case 'teacher':
            comparison = a.teacher.localeCompare(b.teacher);
            break;
          case 'status':
            comparison = a.status.localeCompare(b.status);
            break;
          default:
            return 0;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else {
      // Default sort by date descending
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [selectedStatus, selectedSubject, selectedDate, sortField, sortDirection]);

  const paginatedAttendance = filteredAttendance.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const uniqueDates = Array.from(new Set(mockAttendance.map((item) => item.date))).sort().reverse();

  const stats = useMemo(() => {
    const total = mockAttendance.length;
    const present = mockAttendance.filter((a) => a.status === 'present').length;
    const absent = mockAttendance.filter((a) => a.status === 'absent').length;
    const late = mockAttendance.filter((a) => a.status === 'late').length;
    const excused = mockAttendance.filter((a) => a.status === 'excused').length;
    return { total, present, absent, late, excused };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-100 text-emerald-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-amber-100 text-amber-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Có mặt';
      case 'absent':
        return 'Vắng mặt';
      case 'late':
        return 'Đi muộn';
      case 'excused':
        return 'Nghỉ có phép';
      default:
        return '—';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'absent':
        return <XCircle size={16} className="text-red-600" />;
      case 'late':
        return <Clock size={16} className="text-amber-600" />;
      case 'excused':
        return <CheckCircle size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thống kê điểm danh</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.total}</p>
            <p className="text-xs text-blue-700 mt-1">tiết học</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Có mặt</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{stats.present}</p>
            <p className="text-xs text-emerald-700 mt-1">tiết</p>
          </div>
          <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-red-700 mb-1">Vắng mặt</p>
            <p className="text-xl sm:text-2xl font-bold text-red-900">{stats.absent}</p>
            <p className="text-xs text-red-700 mt-1">tiết</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">Đi muộn</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">{stats.late}</p>
            <p className="text-xs text-amber-700 mt-1">tiết</p>
          </div>
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-blue-700 mb-1">Nghỉ có phép</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.excused}</p>
            <p className="text-xs text-blue-700 mt-1">tiết</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs sm:text-sm text-slate-600">
            Tỷ lệ có mặt: <span className="font-semibold text-slate-900">{((stats.present / stats.total) * 100).toFixed(1)}%</span>
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="present">Có mặt</option>
            <option value="absent">Vắng mặt</option>
            <option value="late">Đi muộn</option>
            <option value="excused">Nghỉ có phép</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả môn học</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả ngày</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Attendance Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Bảng điểm danh</span>
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Ngày {getSortIcon('date')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('period')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Tiết {getSortIcon('period')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('subject')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Môn học {getSortIcon('subject')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('teacher')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Giáo viên {getSortIcon('teacher')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Phòng
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Thời gian
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Trạng thái {getSortIcon('status')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Ghi chú
                  </th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-900 whitespace-nowrap">{formatDate(record.date)}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{record.period}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                      {record.subject}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{record.teacher}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{record.room}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{record.time}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {getStatusLabel(record.status)}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600">{record.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredAttendance.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`}
            responsive
            size="small"
            className="sm:!size-default"
          />
        </div>
      </section>
    </div>
  );
};

export default AttendanceRecord;
