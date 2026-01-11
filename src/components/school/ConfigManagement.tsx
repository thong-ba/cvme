// Config Management Component
import { Settings, Calendar, BookOpen, GraduationCap } from 'lucide-react';

const ConfigManagement = () => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Cấu hình Hệ thống</h3>
        <p className="text-slate-600 text-sm md:text-base">
          Cấu hình năm học, học kỳ, quy chế và các thiết lập hệ thống
        </p>
      </div>

      {/* Config Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Academic Year Card */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-xl flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white mb-4 shadow-md">
            <Calendar size={24} />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">Năm học</h4>
          <div className="flex-1 space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Năm học hiện tại:</span>
              <span className="text-sm font-semibold text-slate-800">2024 - 2025</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Ngày bắt đầu:</span>
              <span className="text-sm font-semibold text-slate-800">01/09/2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Ngày kết thúc:</span>
              <span className="text-sm font-semibold text-slate-800">31/05/2025</span>
            </div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 mt-auto">
            Chỉnh sửa
          </button>
        </div>

        {/* Semester Card */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-xl flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white mb-4 shadow-md">
            <BookOpen size={24} />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">Học kỳ</h4>
          <div className="flex-1 space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Học kỳ 1:</span>
              <span className="text-sm font-semibold text-slate-800">01/09 - 31/12/2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Học kỳ 2:</span>
              <span className="text-sm font-semibold text-slate-800">01/01 - 31/05/2025</span>
            </div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 mt-auto">
            Chỉnh sửa
          </button>
        </div>

        {/* Regulations Card */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-xl flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white mb-4 shadow-md">
            <GraduationCap size={24} />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">Quy chế</h4>
          <div className="flex-1 space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Điểm tối thiểu:</span>
              <span className="text-sm font-semibold text-slate-800">5.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Điểm đạt:</span>
              <span className="text-sm font-semibold text-slate-800">≥ 5.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Điểm xuất sắc:</span>
              <span className="text-sm font-semibold text-slate-800">≥ 8.5</span>
            </div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 mt-auto">
            Chỉnh sửa
          </button>
        </div>

        {/* System Settings Card */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-xl flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white mb-4 shadow-md">
            <Settings size={24} />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">Thiết lập hệ thống</h4>
          <div className="flex-1 space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Thời gian làm việc:</span>
              <span className="text-sm font-semibold text-slate-800">7:00 - 17:00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Thời gian nghỉ:</span>
              <span className="text-sm font-semibold text-slate-800">11:30 - 13:30</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm text-slate-600">Số tiết/ngày:</span>
              <span className="text-sm font-semibold text-slate-800">5 tiết</span>
            </div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 mt-auto">
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigManagement;
