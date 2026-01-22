// Learning History Component for Students and Parents
import { useState, useMemo } from 'react';
import { History, BookOpen, Calendar, Clock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { headMasterSchoolStudents, headMasterSchoolSchedule } from '../../data';
import { Pagination } from 'antd';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

// Mock data - Lịch sử học tập
interface LearningHistoryItem {
  id: number;
  date: string;
  day: string;
  period: number;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  topic: string;
  notes?: string;
}

const mockLearningHistory: LearningHistoryItem[] = [
  {
    id: 1,
    date: '2024-12-15',
    day: 'Thứ 2',
    period: 1,
    subject: 'Toán',
    teacher: 'Nguyễn Văn A',
    room: 'P101',
    time: '7:00 - 7:45',
    topic: 'Đạo hàm và ứng dụng',
    notes: 'Hoàn thành bài tập về nhà',
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
    topic: 'Phân tích tác phẩm văn học',
    notes: 'Thuyết trình nhóm',
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
    topic: 'Tích phân',
    notes: 'Kiểm tra 15 phút',
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
    topic: 'Điện trường',
    notes: 'Thực hành thí nghiệm',
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
    topic: 'Phản ứng hóa học',
    notes: 'Làm bài tập nhóm',
  },
];

type SortField = 'date' | 'subject' | 'period' | 'teacher' | null;
type SortDirection = 'asc' | 'desc' | null;

const LearningHistory = () => {
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
      return <ArrowUpDown size={14} className="text-slate-400" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp size={14} className="text-purple-600" />;
    }
    return <ArrowDown size={14} className="text-purple-600" />;
  };

  const filteredHistory = useMemo(() => {
    let result = [...mockLearningHistory];

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
          case 'subject':
            comparison = a.subject.localeCompare(b.subject);
            break;
          case 'period':
            comparison = a.period - b.period;
            break;
          case 'teacher':
            comparison = a.teacher.localeCompare(b.teacher);
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
  }, [selectedSubject, selectedDate, sortField, sortDirection]);

  const paginatedHistory = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const uniqueDates = Array.from(new Set(mockLearningHistory.map((item) => item.date))).sort().reverse();

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Toán: 'bg-indigo-100 text-indigo-800',
      Văn: 'bg-emerald-100 text-emerald-800',
      Anh: 'bg-amber-100 text-amber-800',
      Lý: 'bg-purple-100 text-purple-800',
      Hóa: 'bg-pink-100 text-pink-800',
      Sinh: 'bg-green-100 text-green-800',
    };
    return colors[subject] || 'bg-slate-100 text-slate-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <History size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thống kê lịch sử học tập</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{mockLearningHistory.length}</p>
            <p className="text-xs text-blue-700 mt-1">tiết học</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Số môn</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{subjects.length}</p>
            <p className="text-xs text-emerald-700 mt-1">môn học</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-purple-700 mb-1">Số ngày</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{uniqueDates.length}</p>
            <p className="text-xs text-purple-700 mt-1">ngày học</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-amber-700 mb-1">Lớp</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">{student?.class || '—'}</p>
            <p className="text-xs text-amber-700 mt-1">hiện tại</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
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
                {new Date(date).toLocaleDateString('vi-VN')}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Learning History List */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Lịch sử học tập</span>
        </h2>
        {/* Sort Buttons - Mobile */}
        <div className="mb-4 sm:hidden flex flex-wrap gap-2">
          <button
            onClick={() => handleSort('date')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              sortField === 'date' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Ngày {getSortIcon('date')}
          </button>
          <button
            onClick={() => handleSort('subject')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              sortField === 'subject' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Môn {getSortIcon('subject')}
          </button>
          <button
            onClick={() => handleSort('period')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              sortField === 'period' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tiết {getSortIcon('period')}
          </button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {paginatedHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calendar className="text-purple-600" size={20} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">{item.topic}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(item.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {item.day} - Tiết {item.period}
                        </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.time}
                          </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getSubjectColor(item.subject)}`}>
                      {item.subject}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 mb-2">
                    <div>
                      <span className="font-semibold">Giáo viên:</span> {item.teacher}
                    </div>
                    <div>
                      <span className="font-semibold">Phòng:</span> {item.room}
                    </div>
                  </div>
                  {item.notes && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs sm:text-sm text-blue-800">
                      <span className="font-semibold">Ghi chú:</span> {item.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredHistory.length}
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

export default LearningHistory;
