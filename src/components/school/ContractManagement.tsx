// Contract Management Component
import { FileText, Calendar, CheckCircle, XCircle, Plus } from 'lucide-react';
import { contracts } from '../../data';

const ContractManagement = () => {

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Thông tin Ký kết</h3>
          <p className="text-slate-600 text-sm md:text-base">
            Quản lý các hợp đồng và thỏa thuận hợp tác với các trường
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
          <Plus size={18} />
          Thêm hợp đồng mới
        </button>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white border-2 border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <FileText size={24} />
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  contract.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {contract.status === 'active' ? (
                  <>
                    <CheckCircle size={14} />
                    Đang hiệu lực
                  </>
                ) : (
                  <>
                    <XCircle size={14} />
                    Hết hạn
                  </>
                )}
              </span>
            </div>

            {/* School Name */}
            <h4 className="text-lg font-bold text-slate-800 mb-2">{contract.school}</h4>

            {/* Contract Type */}
            <p className="text-sm text-slate-600 mb-4">{contract.type}</p>

            {/* Contract Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <Calendar size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Ngày bắt đầu:</span>
                  <span className="font-medium text-slate-700">{contract.startDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Calendar size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Ngày kết thúc:</span>
                  <span className="font-medium text-slate-700">{contract.endDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <FileText size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Giá trị:</span>
                  <span className="font-semibold text-blue-600">{contract.value}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-transparent text-blue-600 rounded-lg font-medium text-sm border border-blue-200 hover:bg-blue-50 transition-all duration-300">
                Xem chi tiết
              </button>
              <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300">
                Chỉnh sửa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractManagement;
