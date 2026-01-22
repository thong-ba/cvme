// Exam Scores Component for Students and Parents
import { useState, useMemo } from 'react';
import { Award, FileText, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Pagination } from 'antd';

// Mock data - Điểm thi
interface ExamScore {
  id: number;
  examType: 'midterm' | 'final' | 'test' | 'quiz';
  subject: string;
  examDate: string;
  score: number;
  maxScore: number;
  teacher: string;
  notes?: string;
}

const mockExamScores: ExamScore[] = [
  {
    id: 1,
    examType: 'midterm',
    subject: 'Toán',
    examDate: '2024-12-20',
    score: 8.5,
    maxScore: 10,
    teacher: 'Nguyễn Văn A',
    notes: 'Thi giữa kỳ học kỳ 1',
  },
  {
    id: 2,
    examType: 'midterm',
    subject: 'Văn',
    examDate: '2024-12-21',
    score: 8.0,
    maxScore: 10,
    teacher: 'Trần Thị B',
    notes: 'Thi giữa kỳ học kỳ 1',
  },
  {
    id: 3,
    examType: 'final',
    subject: 'Toán',
    examDate: '2025-01-15',
    score: 9.0,
    maxScore: 10,
    teacher: 'Nguyễn Văn A',
    notes: 'Thi học kỳ 1',
  },
  {
    id: 4,
    examType: 'final',
    subject: 'Lý',
    examDate: '2025-01-16',
    score: 8.5,
    maxScore: 10,
    teacher: 'Phạm Thị D',
    notes: 'Thi học kỳ 1',
  },
  {
    id: 5,
    examType: 'test',
    subject: 'Hóa',
    examDate: '2024-12-18',
    score: 8.5,
    maxScore: 10,
    teacher: 'Hoàng Văn E',
    notes: 'Kiểm tra 1 tiết',
  },
  {
    id: 6,
    examType: 'quiz',
    subject: 'Anh',
    examDate: '2024-12-19',
    score: 9.0,
    maxScore: 10,
    teacher: 'Lê Văn C',
    notes: 'Kiểm tra 15 phút',
  },
];

type SortField = 'date' | 'subject' | 'score' | 'type' | null;
type SortDirection = 'asc' | 'desc' | null;

const ExamScores = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const subjects = Array.from(new Set(mockExamScores.map((exam) => exam.subject))).sort();

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

  const filteredScores = useMemo(() => {
    let result = [...mockExamScores];

    if (selectedType !== 'all') {
      result = result.filter((exam) => exam.examType === selectedType);
    }

    if (selectedSubject !== 'all') {
      result = result.filter((exam) => exam.subject === selectedSubject);
    }

    // Sort
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'date':
            comparison = new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
            break;
          case 'subject':
            comparison = a.subject.localeCompare(b.subject);
            break;
          case 'score':
            comparison = a.score - b.score;
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
      // Default sort by date descending
      result.sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime());
    }

    return result;
  }, [selectedType, selectedSubject, sortField, sortDirection]);

  const paginatedScores = filteredScores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    const total = mockExamScores.length;
    const avgScore = mockExamScores.reduce((sum, exam) => sum + exam.score, 0) / total;
    const excellent = mockExamScores.filter((exam) => exam.score >= 8.5).length;
    const good = mockExamScores.filter((exam) => exam.score >= 7.0 && exam.score < 8.5).length;
    return { total, avgScore, excellent, good };
  }, []);

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
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Award size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Thống kê điểm thi</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Tổng số</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">{stats.total}</p>
            <p className="text-xs text-blue-700 mt-1">kỳ thi</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Điểm TB</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-900">{stats.avgScore.toFixed(1)}</p>
            <p className="text-xs text-emerald-700 mt-1">tất cả kỳ thi</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4">
            <p className="text-xs font-semibold text-purple-700 mb-1">Xuất sắc</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">{stats.excellent}</p>
            <p className="text-xs text-purple-700 mt-1">kỳ thi</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-amber-700 mb-1">Khá</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-900">{stats.good}</p>
            <p className="text-xs text-amber-700 mt-1">kỳ thi</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
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
        </div>
      </section>

      {/* Exam Scores Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <FileText size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Bảng điểm thi</span>
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
            onClick={() => handleSort('score')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              sortField === 'score' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Điểm {getSortIcon('score')}
          </button>
        </div>
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
                      Ngày thi {getSortIcon('date')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Loại thi {getSortIcon('type')}
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
                    Giáo viên
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('score')}
                      className="flex items-center justify-center gap-1 hover:text-purple-600 transition-colors mx-auto"
                    >
                      Điểm {getSortIcon('score')}
                    </button>
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Tỷ lệ
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    Ghi chú
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
              {paginatedScores.map((exam) => {
                const percentage = (exam.score / exam.maxScore) * 100;
                return (
                  <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-900 whitespace-nowrap">{formatDate(exam.examDate)}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${getExamTypeColor(exam.examType)}`}>
                        {getExamTypeLabel(exam.examType)}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                        {exam.subject}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{exam.teacher}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${
                          exam.score >= 8.5
                            ? 'bg-emerald-100 text-emerald-800'
                            : exam.score >= 7.0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {exam.score}/{exam.maxScore}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center whitespace-nowrap">
                      <span className="text-slate-600">{percentage.toFixed(0)}%</span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600">{exam.notes || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredScores.length}
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

export default ExamScores;
