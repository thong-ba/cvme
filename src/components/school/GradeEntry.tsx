// Grade Entry Component for Teachers
import { useState, useMemo } from 'react';
import { Edit, Save, X, Search } from 'lucide-react';
import { headMasterSchoolStudents } from '../../data';
import { Pagination } from 'antd';

// Mock data - Giả sử giáo viên đang đăng nhập là Nguyễn Văn A (Toán)
const currentTeacher = {
  id: 1,
  name: 'Nguyễn Văn A',
  subject: 'Toán',
  classes: ['10A1', '10A2', '11A1'],
};

interface GradeFormData {
  mieng: number | null;
  fifteen1: number | null;
  fifteen2: number | null;
  fifteen3: number | null;
  fortyfive1: number | null;
  fortyfive2: number | null;
  hki: number | null;
  hkii: number | null;
}

const GradeEntry = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [gradeForms, setGradeForms] = useState<Record<number, GradeFormData>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lọc học sinh trong các lớp mà giáo viên đang dạy
  const myStudents = useMemo(() => {
    return headMasterSchoolStudents.filter((student) => currentTeacher.classes.includes(student.class));
  }, []);

  const filteredStudents = useMemo(() => {
    let result = [...myStudents];

    if (selectedClass !== 'all') {
      result = result.filter((student) => student.class === selectedClass);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedClass, searchQuery, myStudents]);

  const classes = Array.from(new Set(myStudents.map((s) => s.class))).sort();

  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Lấy điểm hiện tại của học sinh
  const getCurrentScore = (student: typeof headMasterSchoolStudents[0]) => {
    const currentYear = student.gradeHistory?.find((gh) => gh.year === '2024-2025');
    if (!currentYear?.semester1) return null;
    const subject = currentYear.semester1.subjects.find((s) => s.name === currentTeacher.subject);
    return subject || null;
  };

  const handleStartEdit = (studentId: number) => {
    const student = myStudents.find((s) => s.id === studentId);
    if (student) {
      const currentScore = getCurrentScore(student);
      setGradeForms({
        ...gradeForms,
        [studentId]: {
          mieng: currentScore?.mieng || null,
          fifteen1: currentScore?.fifteen1 || null,
          fifteen2: currentScore?.fifteen2 || null,
          fifteen3: currentScore?.fifteen3 || null,
          fortyfive1: currentScore?.fortyfive1 || null,
          fortyfive2: currentScore?.fortyfive2 || null,
          hki: currentScore?.hki || null,
          hkii: currentScore?.hkii || null,
        },
      });
      setEditingStudentId(studentId);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
  };

  const handleSaveGrade = (studentId: number) => {
    // TODO: Lưu điểm vào database
    console.log('Saving grade for student', studentId, gradeForms[studentId]);
    setEditingStudentId(null);
    alert('Đã lưu điểm thành công!');
  };

  const handleGradeChange = (studentId: number, field: keyof GradeFormData, value: string) => {
    setGradeForms({
      ...gradeForms,
      [studentId]: {
        ...gradeForms[studentId],
        [field]: value === '' ? null : Number(value),
      },
    });
  };

  const getAvatarUrl = (name: string, avatar?: string) => {
    if (avatar) return avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Edit size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
          <span>Nhập điểm môn {currentTeacher.subject}</span>
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Hướng dẫn:</strong> Hệ số điểm - Miệng và 15 phút: hệ số 1, 45 phút: hệ số 2, HKI và HKII: hệ số 3
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 w-full sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 text-sm sm:text-base"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white text-sm sm:text-base"
          >
            <option value="all">Tất cả lớp</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 text-xs sm:text-sm text-slate-600">
          Tìm thấy <span className="font-semibold text-slate-800">{filteredStudents.length}</span> / {myStudents.length} học sinh
        </div>
      </section>

      {/* Grade Entry Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Ảnh
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Học sinh
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Lớp
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
                  HKI
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  HKII
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedStudents.map((student) => {
                const isEditing = editingStudentId === student.id;
                const currentScore = getCurrentScore(student);
                const formData = gradeForms[student.id] || {
                  mieng: currentScore?.mieng || null,
                  fifteen1: currentScore?.fifteen1 || null,
                  fifteen2: currentScore?.fifteen2 || null,
                  fifteen3: currentScore?.fifteen3 || null,
                  fortyfive1: currentScore?.fortyfive1 || null,
                  fortyfive2: currentScore?.fortyfive2 || null,
                  hki: currentScore?.hki || null,
                  hkii: currentScore?.hkii || null,
                };

                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <img
                        src={getAvatarUrl(student.name, student.avatar)}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getAvatarUrl(student.name);
                        }}
                      />
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{student.name}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.mieng || ''}
                          onChange={(e) => handleGradeChange(student.id, 'mieng', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.mieng !== null ? formData.mieng : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.fifteen1 || ''}
                          onChange={(e) => handleGradeChange(student.id, 'fifteen1', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.fifteen1 !== null ? formData.fifteen1 : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.fifteen2 || ''}
                          onChange={(e) => handleGradeChange(student.id, 'fifteen2', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.fifteen2 !== null ? formData.fifteen2 : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.fifteen3 || ''}
                          onChange={(e) => handleGradeChange(student.id, 'fifteen3', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.fifteen3 !== null ? formData.fifteen3 : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.fortyfive1 || ''}
                          onChange={(e) => handleGradeChange(student.id, 'fortyfive1', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.fortyfive1 !== null ? formData.fortyfive1 : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.fortyfive2 || ''}
                          onChange={(e) => handleGradeChange(student.id, 'fortyfive2', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.fortyfive2 !== null ? formData.fortyfive2 : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.hki || ''}
                          onChange={(e) => handleGradeChange(student.id, 'hki', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.hki !== null ? formData.hki : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.hkii || ''}
                          onChange={(e) => handleGradeChange(student.id, 'hkii', e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-sm"
                        />
                      ) : (
                        <span className="text-slate-600">{formData.hkii !== null ? formData.hkii : '—'}</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSaveGrade(student.id)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            aria-label="Lưu"
                          >
                            <Save size={14} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            aria-label="Hủy"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(student.id)}
                          className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          aria-label="Chỉnh sửa"
                        >
                          <Edit size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredStudents.length}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} học sinh`}
          />
        </div>
      </section>
    </div>
  );
};

export default GradeEntry;
