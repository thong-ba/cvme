// Teacher Detail Modal Component
import { X, Mail, Phone, MapPin, BookOpen, Calendar, Award, Users, GraduationCap } from 'lucide-react';

interface HomeroomHistory {
  class: string;
  year: string;
  startDate: string;
  endDate: string | null;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  address?: string;
  classes: string[];
  students: number;
  avgScore: number;
  status: string;
  yearsOfExperience: number;
  joinDate: string;
  homeroomHistory: HomeroomHistory[];
}

interface TeacherDetailModalProps {
  teacher: Teacher | null;
  onClose: () => void;
}

const TeacherDetailModal = ({ teacher, onClose }: TeacherDetailModalProps) => {
  if (!teacher) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-slate-900">Chi tiết giáo viên</h2>
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
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
                  <Users size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{teacher.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800">
                      {teacher.subject}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                      {teacher.yearsOfExperience} năm kinh nghiệm
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      {teacher.students} học sinh
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award size={16} />
                    <span className="text-sm">Điểm trung bình: <span className="font-semibold text-slate-900">{teacher.avgScore}</span></span>
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
                    <p className="text-sm text-slate-600 break-all">{teacher.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">Điện thoại</p>
                    <p className="text-sm text-slate-600">{teacher.phone}</p>
                  </div>
                </div>
                {teacher.address && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-1">Địa chỉ</p>
                      <p className="text-sm text-slate-600">{teacher.address}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Calendar className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">Ngày vào trường</p>
                    <p className="text-sm text-slate-600">{formatDate(teacher.joinDate)}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Classes */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-indigo-600" />
                Lớp đang dạy
              </h4>
              <div className="flex flex-wrap gap-2">
                {teacher.classes.map((cls, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200"
                  >
                    {cls}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Tổng số lớp: <span className="font-semibold text-slate-900">{teacher.classes.length}</span> lớp
              </p>
            </section>

            {/* Homeroom History */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <GraduationCap size={20} className="text-indigo-600" />
                Lịch sử chủ nhiệm
              </h4>
              {teacher.homeroomHistory && teacher.homeroomHistory.length > 0 ? (
                <div className="space-y-3">
                  {teacher.homeroomHistory.map((history, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-indigo-100 p-3">
                          <GraduationCap size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            Lớp {history.class} - Năm học {history.year}
                          </p>
                          <p className="text-sm text-slate-600">
                            Từ {formatDate(history.startDate)}
                            {history.endDate ? ` đến ${formatDate(history.endDate)}` : ' (Hiện tại)'}
                          </p>
                        </div>
                      </div>
                      {!history.endDate && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                          Đang chủ nhiệm
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-600 text-center py-4">Chưa có lịch sử chủ nhiệm</p>
              )}
            </section>
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

export default TeacherDetailModal;
