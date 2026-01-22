// Exam Schedule Component for Students and Parents
import { useState, useMemo } from 'react';
import { Calendar, Clock, BookOpen, MapPin, AlertCircle, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Pagination } from 'antd';

// Mock data - Lịch thi
interface ExamSchedule {
  id: number;
  examType: 'midterm' | 'final' | 'test' | 'quiz';
  subject: string;
  date: string;
  time: string;
  duration: number; // phút
  room: string;
  teacher: string;
  notes?: string;
}

const mockExamSchedule: ExamSchedule[] = [
  {
    id: 1,
    examType: 'midterm',
    subject: 'Toán',
    date: '2024-12-20',
    time: '7:00',
    duration: 90,
    room: 'P101',
    teacher: 'Nguyễn Văn A',
    notes: 'Thi giữa kỳ học kỳ 1',
  },
  {
    id: 2,
    examType: 'midterm',
    subject: 'Văn',
    date: '2024-12-21',
    time: '7:00',
    duration: 90,
    room: 'P102',
    teacher: 'Trần Thị B',
    notes: 'Thi giữa kỳ học kỳ 1',
  },
  {
    id: 3,
    examType: 'final',
    subject: 'Toán',
    date: '2025-01-15',
    time: '7:00',
    duration: 120,
    room: 'P101',
    teacher: 'Nguyễn Văn A',
    notes: 'Thi học kỳ 1',
  },
  {
    id: 4,
    examType: 'final',
    subject: 'Lý',
    date: '2025-01-16',
    time: '7:00',
    duration: 90,
    room: 'P201',
    teacher: 'Phạm Thị D',
    notes: 'Thi học kỳ 1',
  },
  {
    id: 5,
    examType: 'test',
    subject: 'Hóa',
    date: '2024-12-18',
    time: '13:30',
    duration: 45,
    room: 'P202',
    teacher: 'Hoàng Văn E',
    notes: 'Kiểm tra 1 tiết',
  },
  {
    id: 6,
    examType: 'quiz',
    subject: 'Anh',
    date: '2024-12-19',
    time: '7:50',
    duration: 15,
    room: 'P103',
    teacher: 'Lê Văn C',
    notes: 'Kiểm tra 15 phút',
  },
];

type SortField = 'date' | 'subject' | 'type' | null;
type SortDirection = 'asc' | 'desc' | null;

const ExamSchedule = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const subjects = Array.from(new Set(mockExamSchedule.map((exam) => exam.subject))).sort();

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

  const filteredExams = useMemo(() => {
    let result = [...mockExamSchedule];

    if (selectedType !== 'all') {
      result = result.filter((exam) => exam.examType === selectedType);
    }

    if (selectedSubject !== 'all') {
      result = result.filter((exam) => exam.subject === selectedSubject);
    }

    if (selectedDate !== 'all') {
      result = result.filter((exam) => exam.date === selectedDate);
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
          case 'type':
            comparison = a.examType.localeCompare(b.examType);
            break;
          default:
            return 0;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else {
      // Default sort by date ascending
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return result;
  }, [selectedType, selectedSubject, selectedDate, sortField, sortDirection]);

  const paginatedExams = filteredExams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const uniqueDates = Array.from(new Set(mockExamSchedule.map((exam) => exam.date))).sort();

  const getExamTypeLabel = (type: string) => {
    switch (type) {
      case 'midterm':
        return 'Giữa kỳ';
      case 'final':
        return 'Cuối kỳ';
      case 'test':
        return 'Kiểm tra';
      case 'quiz':
        return '15 phút';
      default:
        return '—';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'midterm':
        return 'bg-blue-100 text-blue-800';
      case 'final':
        return 'bg-red-100 text-red-800';
      case 'test':
        return 'bg-amber-100 text-amber-800';
      case 'quiz':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isUpcoming = (dateString: string) => {
    const examDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);
    return examDate >= today;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thống kê lịch thi</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{mockExamSchedule.length}</p>
            <p className="text-xs text-blue-700 mt-1">kỳ thi</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Sắp tới</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">
              {mockExamSchedule.filter((exam) => isUpcoming(exam.date)).length}
            </p>
            <p className="text-xs text-emerald-700 mt-1">kỳ thi</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">Giữa kỳ</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">
              {mockExamSchedule.filter((exam) => exam.examType === 'midterm').length}
            </p>
            <p className="text-xs text-amber-700 mt-1">kỳ thi</p>
          </div>
          <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-red-700 mb-1">Cuối kỳ</p>
            <p className="text-xl sm:text-2xl font-bold text-red-900">
              {mockExamSchedule.filter((exam) => exam.examType === 'final').length}
            </p>
            <p className="text-xs text-red-700 mt-1">kỳ thi</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả loại thi</option>
            <option value="midterm">Giữa kỳ</option>
            <option value="final">Cuối kỳ</option>
            <option value="test">Kiểm tra</option>
            <option value="quiz">15 phút</option>
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
                {new Date(date).toLocaleDateString('vi-VN')}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Exam Schedule List */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Lịch thi</span>
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {paginatedExams.map((exam) => {
            const upcoming = isUpcoming(exam.date);
            return (
              <div
                key={exam.id}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  upcoming
                    ? 'border-purple-200 bg-purple-50 hover:bg-purple-100'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center ${upcoming ? 'bg-purple-100' : 'bg-slate-100'}`}>
                      <Calendar className={upcoming ? 'text-purple-600' : 'text-slate-600'} size={20} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">{exam.subject}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(exam.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {exam.time} ({exam.duration} phút)
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {exam.room}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getExamTypeColor(exam.examType)}`}>
                          {getExamTypeLabel(exam.examType)}
                        </span>
                        {upcoming && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                            <AlertCircle size={12} />
                            Sắp tới
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 mb-2">
                      <div>
                        <span className="font-semibold">Giáo viên:</span> {exam.teacher}
                      </div>
                      <div>
                        <span className="font-semibold">Thời gian:</span> {exam.time} - {exam.duration} phút
                      </div>
                    </div>
                    {exam.notes && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs sm:text-sm text-blue-800">
                        <span className="font-semibold">Ghi chú:</span> {exam.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
            onClick={() => handleSort('type')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              sortField === 'type' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Loại {getSortIcon('type')}
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredExams.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} kỳ thi`}
            responsive
            size="small"
            className="sm:!size-default"
          />
        </div>
      </section>
    </div>
  );
};

export default ExamSchedule;
