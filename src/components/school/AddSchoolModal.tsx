// Add School Modal Component
import { useState } from 'react';
import { X, School, Save, Loader2 } from 'lucide-react';

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (school: {
    name: string;
    type: 'Tiểu học' | 'THCS' | 'THPT';
    level: 'Đạt chuẩn' | 'Chưa đạt';
    students: number;
    status: 'active' | 'inactive';
  }) => void;
}

const AddSchoolModal = ({ isOpen, onClose, onAdd }: AddSchoolModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Tiểu học' as 'Tiểu học' | 'THCS' | 'THPT',
    level: 'Đạt chuẩn' as 'Đạt chuẩn' | 'Chưa đạt',
    students: '',
    status: 'active' as 'active' | 'inactive',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên trường';
    }

    if (!formData.students || isNaN(Number(formData.students)) || Number(formData.students) <= 0) {
      newErrors.students = 'Vui lòng nhập số học sinh hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onAdd({
        name: formData.name.trim(),
        type: formData.type,
        level: formData.level,
        students: Number(formData.students),
        status: formData.status,
      });

      // Reset form
      setFormData({
        name: '',
        type: 'Tiểu học',
        level: 'Đạt chuẩn',
        students: '',
        status: 'active',
      });
      setErrors({});
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        type: 'Tiểu học',
        level: 'Đạt chuẩn',
        students: '',
        status: 'active',
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg">
            <School size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Thêm trường mới</h2>
          <p className="text-sm text-slate-600 text-center">Điền thông tin để thêm trường mới vào hệ thống</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* School Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Tên trường <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nhập tên trường"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              disabled={isSubmitting}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
              } disabled:bg-slate-100 disabled:cursor-not-allowed`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* School Type and Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-slate-700">
                Loại trường <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="Tiểu học">Tiểu học</option>
                <option value="THCS">THCS</option>
                <option value="THPT">THPT</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-slate-700">
                Chuẩn đánh giá <span className="text-red-500">*</span>
              </label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as typeof formData.level })}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="Đạt chuẩn">Đạt chuẩn</option>
                <option value="Chưa đạt">Chưa đạt</option>
              </select>
            </div>
          </div>

          {/* Students and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="students" className="block text-sm font-medium text-slate-700">
                Số học sinh <span className="text-red-500">*</span>
              </label>
              <input
                id="students"
                type="number"
                min="1"
                placeholder="Nhập số học sinh"
                value={formData.students}
                onChange={(e) => {
                  setFormData({ ...formData, students: e.target.value });
                  if (errors.students) setErrors({ ...errors, students: '' });
                }}
                disabled={isSubmitting}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.students
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                } disabled:bg-slate-100 disabled:cursor-not-allowed`}
              />
              {errors.students && <p className="text-xs text-red-600 mt-1">{errors.students}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                Trạng thái <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Đang thêm...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Thêm trường
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal;
