// Data Management Component
import { Database, Download, Upload, RefreshCw, FileText, BarChart3 } from 'lucide-react';

const DataManagement = () => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Quản lý Dữ liệu</h3>
          <p className="text-slate-600 text-sm md:text-base">
            Quản lý, xuất nhập và đồng bộ dữ liệu hệ thống
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold text-sm border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 whitespace-nowrap">
            <Upload size={18} />
            Nhập dữ liệu
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
            <Download size={18} />
            Xuất dữ liệu
          </button>
        </div>
      </div>

      {/* Data Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <Database size={24} />
          </div>
          <h4 className="text-sm font-medium text-slate-600 mb-2">Tổng dữ liệu</h4>
          <p className="text-3xl font-bold text-slate-800 mb-1">2.5M</p>
          <p className="text-xs text-slate-500">Bản ghi</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <FileText size={24} />
          </div>
          <h4 className="text-sm font-medium text-slate-600 mb-2">Dữ liệu đã đồng bộ</h4>
          <p className="text-3xl font-bold text-slate-800 mb-1">2.3M</p>
          <p className="text-xs text-slate-500">Bản ghi</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <RefreshCw size={24} />
          </div>
          <h4 className="text-sm font-medium text-slate-600 mb-2">Lần đồng bộ cuối</h4>
          <p className="text-3xl font-bold text-slate-800 mb-1">2 giờ</p>
          <p className="text-xs text-slate-500">Đồng bộ tự động</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-500">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <BarChart3 size={24} />
          </div>
          <h4 className="text-sm font-medium text-slate-600 mb-2">Tỷ lệ chính xác</h4>
          <p className="text-3xl font-bold text-slate-800 mb-1">98.5%</p>
          <p className="text-xs text-slate-500">Dữ liệu hợp lệ</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Thao tác dữ liệu</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-emerald-50 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Upload size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700">Nhập dữ liệu từ Excel</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-emerald-50 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Download size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700">Xuất báo cáo PDF</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-emerald-50 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <RefreshCw size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700">Đồng bộ dữ liệu</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-slate-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-emerald-50 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Database size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700">Sao lưu dữ liệu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
