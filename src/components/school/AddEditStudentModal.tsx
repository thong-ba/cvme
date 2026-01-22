// Add/Edit Student Modal Component
import { useState, useEffect } from 'react';
import { X, GraduationCap, Mail, Phone, MapPin, Calendar, Image as ImageIcon, Hash } from 'lucide-react';

interface SubjectScore {
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
  avatar?: string;
  dateOfBirth?: string;
  joinDate?: string;
  avgScore: number;
  rank: number;
  totalStudents: number;
  rankInGrade?: number;
  totalStudentsInGrade?: number;
  rankInSchool?: number;
  totalStudentsInSchool?: number;
  status: string;
  gradeHistory?: GradeHistory[];
}

interface AddEditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student | Omit<Student, 'id'>) => void;
  student?: Student | null;
  availableClasses: string[];
}

const AddEditStudentModal = ({ isOpen, onClose, onSave, student, availableClasses }: AddEditStudentModalProps) => {
  const isEditMode = !!student;
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    class: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    dateOfBirth: '',
    joinDate: new Date().toISOString().split('T')[0],
    avgScore: 0,
    rank: 1,
    totalStudents: 0,
    rankInGrade: 0,
    totalStudentsInGrade: 0,
    rankInSchool: 0,
    totalStudentsInSchool: 0,
    status: 'active',
    gradeHistory: [] as GradeHistory[],
  });

  // Generate avatar URL from name if not provided
  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=10b981&color=fff&bold=true`;
  };

  // Generate student ID
  const generateStudentId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `HS${year}${random}`;
  };

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        studentId: student.studentId,
        class: student.class,
        email: student.email,
        phone: student.phone,
        address: student.address || '',
        avatar: student.avatar || generateAvatarUrl(student.name),
        dateOfBirth: student.dateOfBirth || '',
        joinDate: student.joinDate || new Date().toISOString().split('T')[0],
        avgScore: student.avgScore,
        rank: student.rank,
        totalStudents: student.totalStudents,
        rankInGrade: student.rankInGrade || 0,
        totalStudentsInGrade: student.totalStudentsInGrade || 0,
        rankInSchool: student.rankInSchool || 0,
        totalStudentsInSchool: student.totalStudentsInSchool || 0,
        status: student.status,
        gradeHistory: student.gradeHistory || [],
      });
    } else {
      setFormData({
        name: '',
        studentId: generateStudentId(),
        class: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        dateOfBirth: '',
        joinDate: new Date().toISOString().split('T')[0],
        avgScore: 0,
        rank: 1,
        totalStudents: 0,
        rankInGrade: 0,
        totalStudentsInGrade: 0,
        rankInSchool: 0,
        totalStudentsInSchool: 0,
        status: 'active',
        gradeHistory: [],
      });
    }
  }, [student]);

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      avatar: formData.avatar || generateAvatarUrl(name),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.studentId && formData.class && formData.email && formData.phone) {
      const baseData = {
        name: formData.name,
        studentId: formData.studentId,
        class: formData.class,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || undefined,
        avatar: formData.avatar || generateAvatarUrl(formData.name),
        dateOfBirth: formData.dateOfBirth || undefined,
        joinDate: formData.joinDate || undefined,
        avgScore: formData.avgScore,
        rank: formData.rank,
        totalStudents: formData.totalStudents,
        rankInGrade: formData.rankInGrade || undefined,
        totalStudentsInGrade: formData.totalStudentsInGrade || undefined,
        rankInSchool: formData.rankInSchool || undefined,
        totalStudentsInSchool: formData.totalStudentsInSchool || undefined,
        status: formData.status,
        gradeHistory: formData.gradeHistory,
      };
      if (isEditMode && student) {
        onSave({ ...baseData, id: student.id } as Student);
      } else {
        onSave(baseData as Omit<Student, 'id'>);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="text-indigo-600" size={24} />
              <span>{isEditMode ? 'Chỉnh sửa học sinh' : 'Thêm học sinh mới'}</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Đóng"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={formData.avatar || generateAvatarUrl(formData.name)}
                  alt={formData.name || 'Avatar'}
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = generateAvatarUrl(formData.name || 'Student');
                  }}
                />
                <div className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
                  <ImageIcon size={16} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <ImageIcon size={16} className="text-indigo-600" />
                  URL ảnh đại diện
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="Nhập URL ảnh hoặc để trống để tự động tạo"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Để trống để tự động tạo ảnh từ tên</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <GraduationCap size={16} className="text-indigo-600" />
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Hash size={16} className="text-indigo-600" />
                  Mã học sinh <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                  />
                  {!isEditMode && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, studentId: generateStudentId() })}
                      className="px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                      title="Tạo mã mới"
                    >
                      Tạo mới
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Class and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <GraduationCap size={16} className="text-indigo-600" />
                  Lớp <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
                >
                  <option value="">-- Chọn lớp --</option>
                  {availableClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Calendar size={16} className="text-indigo-600" />
                  Ngày sinh
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Calendar size={16} className="text-indigo-600" />
                  Ngày vào trường
                </label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Mail size={16} className="text-indigo-600" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Phone size={16} className="text-indigo-600" />
                  Điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                <MapPin size={16} className="text-indigo-600" />
                Địa chỉ
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
              />
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Điểm TB</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.avgScore}
                  onChange={(e) => setFormData({ ...formData, avgScore: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Xếp hạng lớp</label>
                <input
                  type="number"
                  min="1"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Tổng HS lớp</label>
                <input
                  type="number"
                  min="0"
                  value={formData.totalStudents}
                  onChange={(e) => setFormData({ ...formData, totalStudents: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
                >
                  <option value="active">Đang học</option>
                  <option value="inactive">Nghỉ học</option>
                  <option value="graduated">Đã tốt nghiệp</option>
                </select>
              </div>
            </div>

            {/* Ranking Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Xếp hạng khối</label>
                <input
                  type="number"
                  min="0"
                  value={formData.rankInGrade}
                  onChange={(e) => setFormData({ ...formData, rankInGrade: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Tổng HS khối</label>
                <input
                  type="number"
                  min="0"
                  value={formData.totalStudentsInGrade}
                  onChange={(e) => setFormData({ ...formData, totalStudentsInGrade: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Xếp hạng trường</label>
                <input
                  type="number"
                  min="0"
                  value={formData.rankInSchool}
                  onChange={(e) => setFormData({ ...formData, rankInSchool: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2">Tổng HS trường</label>
                <input
                  type="number"
                  min="0"
                  value={formData.totalStudentsInSchool}
                  onChange={(e) => setFormData({ ...formData, totalStudentsInSchool: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {isEditMode ? 'Cập nhật' : 'Thêm học sinh'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditStudentModal;
