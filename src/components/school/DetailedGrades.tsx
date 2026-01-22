// Detailed Grades Component for Students and Parents
import { useState, useMemo } from 'react';
import { Award, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { headMasterSchoolStudents, headMasterSchoolTeachers } from '../../data';
import { Pagination } from 'antd';

// Mock data - Giả sử học sinh đang đăng nhập là học sinh đầu tiên
const currentStudent = {
  id: 1,
  name: 'Nguyễn Văn An',
  studentId: 'HS2024001',
  class: '10A1',
};

type SortField = 'subject' | 'avg' | 'teacher' | null;
type SortDirection = 'asc' | 'desc' | null;

const DetailedGrades = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024-2025');
  const [selectedSemester, setSelectedSemester] = useState<'semester1' | 'semester2'>('semester1');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lấy thông tin học sinh
  const student = headMasterSchoolStudents.find((s) => s.id === currentStudent.id);

  const gradeData = useMemo(() => {
    if (!student) return null;
    const currentYear = student.gradeHistory?.find((gh) => gh.year === selectedYear);
    if (!currentYear) return null;

    const semester = selectedSemester === 'semester1' ? currentYear.semester1 : currentYear.semester2;
    if (!semester) return null;

    let subjects = [...semester.subjects];

    if (selectedSubject !== 'all') {
      subjects = subjects.filter((s) => s.name === selectedSubject);
    }

    return {
      year: currentYear.year,
      class: currentYear.class,
      semester: selectedSemester,
      subjects: subjects.map((subject) => {
        const teacher = headMasterSchoolTeachers.find((t) => t.subject === subject.name);
        return {
          name: subject.name,
          mieng: subject.mieng,
          fifteen1: subject.fifteen1,
          fifteen2: subject.fifteen2,
          fifteen3: subject.fifteen3,
          fortyfive1: subject.fortyfive1,
          fortyfive2: subject.fortyfive2,
          hki: subject.hki,
          hkii: subject.hkii,
          avg: subject.avg,
          teacher: teacher?.name || '—',
        };
      }) as Array<{
        name: string;
        mieng: number | null;
        fifteen1: number | null;
        fifteen2: number | null;
        fifteen3: number | null;
        fortyfive1: number | null;
        fortyfive2: number | null;
        hki: number | null;
        hkii: number | null;
        avg: number;
        teacher: string;
      }>,
      avgScore: semester.avgScore,
    };
  }, [student, selectedYear, selectedSemester, selectedSubject]);

  const subjects = useMemo(() => {
    if (!student) return [];
    const currentYear = student.gradeHistory?.find((gh) => gh.year === selectedYear);
    if (!currentYear) return [];
    const semester = selectedSemester === 'semester1' ? currentYear.semester1 : currentYear.semester2;
    if (!semester) return [];
    return semester.subjects.map((s) => s.name);
  }, [student, selectedYear, selectedSemester]);

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

  const sortedSubjects = useMemo(() => {
    if (!gradeData) return [];
    let result = [...gradeData.subjects];

    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'subject':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'avg':
            comparison = calculateTotalScore(a) - calculateTotalScore(b);
            break;
          case 'teacher':
            comparison = a.teacher.localeCompare(b.teacher);
            break;
          default:
            return 0;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [gradeData, sortField, sortDirection]);

  const paginatedSubjects = sortedSubjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const calculateTotalScore = (subject: { mieng: number | null; fifteen1: number | null; fifteen2: number | null; fifteen3: number | null; fortyfive1: number | null; fortyfive2: number | null; hki: number | null; hkii: number | null }) => {
    const scores = [
      { value: subject.mieng, coefficient: 1 },
      { value: subject.fifteen1, coefficient: 1 },
      { value: subject.fifteen2, coefficient: 1 },
      { value: subject.fifteen3, coefficient: 1 },
      { value: subject.fortyfive1, coefficient: 2 },
      { value: subject.fortyfive2, coefficient: 2 },
      { value: selectedSemester === 'semester1' ? subject.hki : subject.hkii, coefficient: 3 },
    ];

    let total = 0;
    let totalCoefficient = 0;

    scores.forEach(({ value, coefficient }) => {
      if (value !== null && value !== undefined) {
        total += value * coefficient;
        totalCoefficient += coefficient;
      }
    });

    return totalCoefficient > 0 ? total / totalCoefficient : 0;
  };

  if (!student || !gradeData) return null;

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Award size={18} className="sm:w-5 sm:h-5 text-purple-600" />
          <span>Điểm chi tiết - Điểm thành phần - Điểm tổng kết</span>
        </h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-800">
            <strong>Hệ số điểm:</strong> Miệng và 15 phút (hệ số 1), 45 phút (hệ số 2), HKI/HKII (hệ số 3)
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {student.gradeHistory && student.gradeHistory.length > 0 && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
            >
              {student.gradeHistory.map((year) => (
                <option key={year.year} value={year.year}>
                  {year.year}
                </option>
              ))}
            </select>
          )}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value as 'semester1' | 'semester2')}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="semester1">Học kỳ 1</option>
            <option value="semester2">Học kỳ 2</option>
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

      {/* Detailed Grades Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Năm học {gradeData.year} - {selectedSemester === 'semester1' ? 'Học kỳ 1' : 'Học kỳ 2'} - Lớp {gradeData.class}
          </h3>
          <div className="text-sm text-slate-600">
            Điểm TB: <span className="font-bold text-purple-600">{gradeData.avgScore}</span>
          </div>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                    <button
                      onClick={() => handleSort('subject')}
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      Môn học {getSortIcon('subject')}
                    </button>
                  </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  M
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  15' (1)
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  15' (2)
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  15' (3)
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  45' (1)
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  45' (2)
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  {selectedSemester === 'semester1' ? 'HKI' : 'HKII'}
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  <button
                    onClick={() => handleSort('avg')}
                    className="flex items-center justify-center gap-1 hover:text-purple-600 transition-colors mx-auto"
                  >
                    ĐTB {getSortIcon('avg')}
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedSubjects.map((subject, index) => {
                const totalScore = calculateTotalScore(subject);
                return (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">
                      {subject.name}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {subject.mieng !== null && subject.mieng !== undefined ? subject.mieng : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {subject.fifteen1 !== null && subject.fifteen1 !== undefined ? subject.fifteen1 : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {subject.fifteen2 !== null && subject.fifteen2 !== undefined ? subject.fifteen2 : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {subject.fifteen3 !== null && subject.fifteen3 !== undefined ? subject.fifteen3 : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {subject.fortyfive1 !== null && subject.fortyfive1 !== undefined ? subject.fortyfive1 : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {subject.fortyfive2 !== null && subject.fortyfive2 !== undefined ? subject.fortyfive2 : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center text-slate-600 whitespace-nowrap">
                      {(selectedSemester === 'semester1' ? subject.hki : subject.hkii) !== null &&
                      (selectedSemester === 'semester1' ? subject.hki : subject.hkii) !== undefined
                        ? selectedSemester === 'semester1'
                          ? subject.hki
                          : subject.hkii
                        : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${
                          totalScore >= 8.5
                            ? 'bg-emerald-100 text-emerald-800'
                            : totalScore >= 7.0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {totalScore.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">{subject.teacher}</td>
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
            total={sortedSubjects.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} môn học`}
            responsive
            size="small"
            className="sm:!size-default"
          />
        </div>
      </section>
    </div>
  );
};

export default DetailedGrades;
