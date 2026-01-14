// Student Detail Modal Component
import { X, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen } from 'lucide-react';

interface SubjectScore {
  name: string;
  mieng: number | null; // Hệ số 1
  fifteen1: number | null; // 15 phút 1 - Hệ số 1
  fifteen2: number | null; // 15 phút 2 - Hệ số 1
  fifteen3: number | null; // 15 phút 3 - Hệ số 1
  fortyfive1: number | null; // 45 phút 1 - Hệ số 2
  fortyfive2: number | null; // 45 phút 2 - Hệ số 2
  hki: number | null; // Học kỳ 1 - Hệ số 3
  hkii: number | null; // Học kỳ 2 - Hệ số 3
  avg: number;
}

interface Semester {
  subjects: SubjectScore[];
  avgScore: number;
}

interface GradeHistory {
  year: string;
  class: string;
  rankInClass?: number;
  rankInGrade?: number;
  rankInSchool?: number;
  semester1: Semester | null;
  semester2: Semester | null;
}

interface Student {
  id: number;
  name: string;
  studentId: string;
  class: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  joinDate?: string;
  avgScore: number;
  rank: number;
  totalStudents: number;
  status: string;
  gradeHistory?: GradeHistory[];
}

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
}

const StudentDetailModal = ({ student, onClose }: StudentDetailModalProps) => {
  if (!student) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-emerald-700 bg-emerald-100';
    if (score >= 7.0) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  };

  // Calculate average score with coefficients
  const calculateSubjectAvg = (subject: SubjectScore): number => {
    const scores = [
      { value: subject.mieng, coefficient: 1 },
      { value: subject.fifteen1, coefficient: 1 },
      { value: subject.fifteen2, coefficient: 1 },
      { value: subject.fifteen3, coefficient: 1 },
      { value: subject.fortyfive1, coefficient: 2 },
      { value: subject.fortyfive2, coefficient: 2 },
      { value: subject.hki, coefficient: 3 },
      { value: subject.hkii, coefficient: 3 },
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-slate-900">Chi tiết học sinh</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Đóng"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
                  <GraduationCap size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{student.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      {student.studentId}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800">
                      {student.class}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getScoreColor(student.avgScore)}`}>
                      Điểm TB: {student.avgScore}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                      Xếp hạng: {student.rank}/{student.totalStudents}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Mail size={20} className="text-indigo-600" />
                Thông tin liên hệ
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Mail className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">Email</p>
                    <p className="text-sm text-slate-600 break-all">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">Điện thoại</p>
                    <p className="text-sm text-slate-600">{student.phone}</p>
                  </div>
                </div>
                {student.address && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-1">Địa chỉ</p>
                      <p className="text-sm text-slate-600">{student.address}</p>
                    </div>
                  </div>
                )}
                {student.dateOfBirth && (
                  <div className="flex items-start gap-3">
                    <Calendar className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-1">Ngày sinh</p>
                      <p className="text-sm text-slate-600">{formatDate(student.dateOfBirth)}</p>
                    </div>
                  </div>
                )}
                {student.joinDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-1">Ngày nhập học</p>
                      <p className="text-sm text-slate-600">{formatDate(student.joinDate)}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Grade History */}
            {student.gradeHistory && student.gradeHistory.length > 0 && (
              <section className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" />
                  Lịch sử điểm theo năm học
                </h4>
                <div className="space-y-6">
                  {student.gradeHistory.map((history, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-base font-semibold text-slate-900">
                          Năm học {history.year} - Lớp {history.class}
                        </h5>
                        <div className="flex items-center gap-3 text-sm">
                          {history.rankInClass && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                              Xếp hạng lớp: {history.rankInClass}
                            </span>
                          )}
                          {history.rankInGrade && (
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                              Xếp hạng khối: {history.rankInGrade}
                            </span>
                          )}
                          {history.rankInSchool && (
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                              Xếp hạng trường: {history.rankInSchool}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        {history.semester1 && (
                          <div>
                            <h6 className="text-sm font-semibold text-slate-700 mb-3">Học kỳ 1</h6>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-slate-200 bg-white rounded-lg">
                                <thead className="bg-slate-100">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Môn học</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">M</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">15'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">15'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">15'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 2">45'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 2">45'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 3">HKI</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 3">HKII</th>
                                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap">TB môn</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                  {history.semester1.subjects.map((subject, subIndex) => {
                                    const calculatedAvg = calculateSubjectAvg(subject);
                                    return (
                                      <tr key={subIndex}>
                                        <td className="px-3 py-2 text-sm font-medium text-slate-900">{subject.name}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.mieng !== null ? subject.mieng : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fifteen1 !== null ? subject.fifteen1 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fifteen2 !== null ? subject.fifteen2 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fifteen3 !== null ? subject.fifteen3 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fortyfive1 !== null ? subject.fortyfive1 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fortyfive2 !== null ? subject.fortyfive2 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center">
                                          {subject.hki !== null ? (
                                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                                              {subject.hki}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">-</span>
                                          )}
                                        </td>
                                        <td className="px-2 py-2 text-sm text-center">
                                          {subject.hkii !== null ? (
                                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                                              {subject.hkii}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">-</span>
                                          )}
                                        </td>
                                        <td className="px-3 py-2 text-sm text-center">
                                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getScoreColor(calculatedAvg)}`}>
                                            {calculatedAvg.toFixed(2)}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  <tr className="bg-indigo-50 font-semibold">
                                    <td className="px-3 py-2 text-sm text-slate-900">Trung bình HK1</td>
                                    <td colSpan={8} className="px-2 py-2 text-sm text-center text-slate-600"></td>
                                    <td className="px-3 py-2 text-sm text-center">
                                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getScoreColor(history.semester1.avgScore)}`}>
                                        {history.semester1.avgScore.toFixed(2)}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        {history.semester2 && (
                          <div>
                            <h6 className="text-sm font-semibold text-slate-700 mb-3">Học kỳ 2</h6>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-slate-200 bg-white rounded-lg">
                                <thead className="bg-slate-100">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 whitespace-nowrap">Môn học</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">M</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">15'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">15'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 1">15'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 2">45'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 2">45'</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 3">HKI</th>
                                    <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap" title="Hệ số 3">HKII</th>
                                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-700 whitespace-nowrap">TB môn</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                  {history.semester2.subjects.map((subject, subIndex) => {
                                    const calculatedAvg = calculateSubjectAvg(subject);
                                    return (
                                      <tr key={subIndex}>
                                        <td className="px-3 py-2 text-sm font-medium text-slate-900">{subject.name}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.mieng !== null ? subject.mieng : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fifteen1 !== null ? subject.fifteen1 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fifteen2 !== null ? subject.fifteen2 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fifteen3 !== null ? subject.fifteen3 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fortyfive1 !== null ? subject.fortyfive1 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center text-slate-600">{subject.fortyfive2 !== null ? subject.fortyfive2 : '-'}</td>
                                        <td className="px-2 py-2 text-sm text-center">
                                          {subject.hki !== null ? (
                                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                                              {subject.hki}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">-</span>
                                          )}
                                        </td>
                                        <td className="px-2 py-2 text-sm text-center">
                                          {subject.hkii !== null ? (
                                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                                              {subject.hkii}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">-</span>
                                          )}
                                        </td>
                                        <td className="px-3 py-2 text-sm text-center">
                                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getScoreColor(calculatedAvg)}`}>
                                            {calculatedAvg.toFixed(2)}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  <tr className="bg-indigo-50 font-semibold">
                                    <td className="px-3 py-2 text-sm text-slate-900">Trung bình HK2</td>
                                    <td colSpan={8} className="px-2 py-2 text-sm text-center text-slate-600"></td>
                                    <td className="px-3 py-2 text-sm text-center">
                                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getScoreColor(history.semester2.avgScore)}`}>
                                        {history.semester2.avgScore.toFixed(2)}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        {history.semester1 && history.semester2 && (
                          <div className="pt-3 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-700">Trung bình cả năm:</span>
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getScoreColor((history.semester1.avgScore + history.semester2.avgScore) / 2)}`}>
                                {((history.semester1.avgScore + history.semester2.avgScore) / 2).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
