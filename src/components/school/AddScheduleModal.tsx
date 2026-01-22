// Add Schedule Modal Component
import { useState } from 'react';
import { X, Calendar, Clock, User, MapPin, BookOpen, GraduationCap } from 'lucide-react';

interface ScheduleItem {
  id: number;
  class: string;
  day: string;
  period: number;
  subject: string;
  teacher: string;
  room: string;
  time: string;
}

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (schedule: Omit<ScheduleItem, 'id'>) => void;
  classes: string[];
  teachers: string[];
  subjects: string[];
}

const AddScheduleModal = ({ isOpen, onClose, onAdd, classes, teachers, subjects }: AddScheduleModalProps) => {
  const [formData, setFormData] = useState({
    class: '',
    day: 'Thứ 2',
    period: 1,
    subject: '',
    teacher: '',
    room: '',
    time: '',
  });

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const timeSlots = [
    '7:00 - 7:45',
    '7:50 - 8:35',
    '8:40 - 9:25',
    '9:30 - 10:15',
    '10:30 - 11:15',
    '11:20 - 12:05',
    '13:30 - 14:15',
    '14:20 - 15:05',
    '15:10 - 15:55',
    '16:00 - 16:45',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.class && formData.subject && formData.teacher && formData.room && formData.time) {
      onAdd(formData);
      // Reset form
      setFormData({
        class: '',
        day: 'Thứ 2',
        period: 1,
        subject: '',
        teacher: '',
        room: '',
        time: '',
      });
      onClose();
    }
  };

  const handleTimeChange = (period: number) => {
    setFormData({
      ...formData,
      period,
      time: timeSlots[period - 1] || '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="text-indigo-600" size={24} />
              <span>Thêm lịch học mới</span>
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
            {/* Class Selection */}
            <div>
              <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                <GraduationCap size={16} className="text-indigo-600" />
                Lớp học <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
              >
                <option value="">-- Chọn lớp --</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Day and Period */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Calendar size={16} className="text-indigo-600" />
                  Ngày <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Clock size={16} className="text-indigo-600" />
                  Tiết học <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.period}
                  onChange={(e) => handleTimeChange(Number(e.target.value))}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
                >
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      Tiết {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
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

            {/* Teacher */}
            <div>
              <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                <User size={16} className="text-indigo-600" />
                Giáo viên <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
              >
                <option value="">-- Chọn giáo viên --</option>
                {teachers.map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>

            {/* Room and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <MapPin size={16} className="text-indigo-600" />
                  Phòng học <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  required
                  placeholder="VD: P101, P201..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
                />
              </div>
              <div>
                <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
                  <Clock size={16} className="text-indigo-600" />
                  Thời gian <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  placeholder="VD: 7:00 - 7:45"
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
                Thêm lịch học
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleModal;
