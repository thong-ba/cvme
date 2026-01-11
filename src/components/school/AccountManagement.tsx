// Account Management Component
import { Plus, Shield, Mail, Phone, Search } from 'lucide-react';
import { accounts } from '../../data';

const AccountManagement = () => {

  // Helper function to get status badge colors
  const getStatusBadgeClass = (status: string) => {
    if (status === 'active') {
      return 'bg-emerald-100 text-emerald-800';
    } else if (status === 'inactive') {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Quản lý Tài khoản Admin</h3>
          <p className="text-slate-600 text-sm md:text-base">
            Quản lý tài khoản quản trị viên của các trường trong hệ thống
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
            <Search size={18} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 min-w-[200px]"
            />
          </div>
          {/* Add Button */}
          <button className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
            <Plus size={18} />
            Tạo tài khoản mới
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-emerald-50">
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                STT
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Tên
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Email
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Số điện thoại
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Trường
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Vai trò
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Trạng thái
              </th>
              <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                Thao tác
              </th>
            </tr>
          </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr
                  key={account.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 whitespace-nowrap">{index + 1}</td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                        <Shield size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 truncate max-w-[120px] sm:max-w-none">{account.name}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                      <Mail size={12} className="text-slate-400 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                      <span className="text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{account.email}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                      <Phone size={12} className="text-slate-400 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                      <span className="text-xs sm:text-sm">{account.phone}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 whitespace-nowrap truncate max-w-[150px] sm:max-w-none">{account.school}</td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-600">
                      {account.role}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        account.status
                      )}`}
                    >
                      {account.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex gap-1.5 sm:gap-2">
                      <button className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 whitespace-nowrap">
                        <span className="hidden sm:inline">Chỉnh sửa</span>
                        <span className="sm:hidden">Sửa</span>
                      </button>
                      <button className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-medium text-slate-600 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all duration-200 whitespace-nowrap">
                        Khóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
