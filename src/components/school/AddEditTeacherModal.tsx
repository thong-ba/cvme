// Add/Edit Teacher Modal Component
import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, BookOpen, Calendar, GraduationCap, Image as ImageIcon } from 'lucide-react';

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
  avatar?: string;
  classes: string[];
  students: number;
  avgScore: number;
  status: string;
  yearsOfExperience: number;
  joinDate: string;
  homeroomHistory: HomeroomHistory[];
}

interface AddEditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacher: Teacher | Omit<Teacher, 'id'>) => void;
  teacher?: Teacher | null;
  availableClasses: string[];
  subjects: string[];
}

const AddEditTeacherModal = ({
  isOpen,
  onClose,
  onSave,
  teacher,
  availableClasses,
  subjects,
}: AddEditTeacherModalProps) => {
  const isEditMode = !!teacher;
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    classes: [] as string[],
    students: 0,
    avgScore: 0,
    status: 'active',
    yearsOfExperience: 0,
    joinDate: new Date().toISOString().split('T')[0],
    homeroomHistory: [] as HomeroomHistory[],
  });

  // Generate avatar URL from name if not provided
  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=6366f1&color=fff&bold=true`;
  };

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        subject: teacher.subject,
        email: teacher.email,
        phone: teacher.phone,
        address: teacher.address || '',
        avatar: teacher.avatar || generateAvatarUrl(teacher.name),
        classes: teacher.classes,
        students: teacher.students,
        avgScore: teacher.avgScore,
        status: teacher.status,
        yearsOfExperience: teacher.yearsOfExperience,
        joinDate: teacher.joinDate,
        homeroomHistory: teacher.homeroomHistory,
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        classes: [],
        students: 0,
        avgScore: 0,
        status: 'active',
        yearsOfExperience: 0,
        joinDate: new Date().toISOString().split('T')[0],
        homeroomHistory: [],
      });
    }
  }, [teacher]);

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      avatar: formData.avatar || generateAvatarUrl(name),
    });
  };

  const handleClassToggle = (className: string) => {
    setFormData({
      ...formData,
      classes: formData.classes.includes(className)
        ? formData.classes.filter((c) => c !== className)
        : [...formData.classes, className],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.subject && formData.email && formData.phone) {
      const baseData = {
        name: formData.name,
        subject: formData.subject,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || undefined,
        avatar: formData.avatar || generateAvatarUrl(formData.name),
        classes: formData.classes,
        students: formData.students,
        avgScore: formData.avgScore,
        status: formData.status,
        yearsOfExperience: formData.yearsOfExperience,
        joinDate: formData.joinDate,
        homeroomHistory: formData.homeroomHistory,
      };
      if (isEditMode && teacher) {
        onSave({ ...baseData, id: teacher.id } as Teacher);
      } else {
        onSave(baseData as Omit<Teacher, 'id'>);
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
              <User className="text-indigo-600" size={24} />
              <span>{isEditMode ? 'Chỉnh sửa giáo viên' : 'Thêm giáo viên mới'}</span>
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
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = generateAvatarUrl(formData.name || 'User');
                  }}
                />
                <div className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
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
                  <User size={16} className="text-indigo-600" />
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
                  <BookOpen size={16} className="text-indigo-600" />
                  Môn học <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
                >
                  <option value="">-- Chọn môn học --</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
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

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <GraduationCap size={16} className="text-indigo-600" />
                  Số năm kinh nghiệm
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  Số học sinh
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
            </div>

            {/* Classes */}
            <div>
              <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                <BookOpen size={16} className="text-indigo-600" />
                Lớp dạy
              </label>
              <div className="flex flex-wrap gap-2 p-4 border border-slate-300 rounded-lg min-h-[80px]">
                {availableClasses.length > 0 ? (
                  availableClasses.map((className) => (
                    <label
                      key={className}
                      className={`inline-flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        formData.classes.includes(className)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.classes.includes(className)}
                        onChange={() => handleClassToggle(className)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{className}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Không có lớp nào</p>
                )}
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
                {isEditMode ? 'Cập nhật' : 'Thêm giáo viên'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTeacherModal;
