// Staff Admins Dashboard Component
import { useState } from 'react';
import { Users, FileText, Search, Building2, Mail, Phone, Plus, Edit, Eye } from 'lucide-react';

// Mock data
const staffData = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    position: 'Nhân viên hành chính',
    department: 'Phòng Hành chính',
    email: 'nguyenvana@school.edu.vn',
    phone: '0901234567',
    status: 'active',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    position: 'Nhân viên kế toán',
    department: 'Phòng Kế toán',
    email: 'tranthib@school.edu.vn',
    phone: '0902345678',
    status: 'active',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    position: 'Nhân viên thư viện',
    department: 'Phòng Thư viện',
    email: 'levanc@school.edu.vn',
    phone: '0903456789',
    status: 'active',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    position: 'Nhân viên y tế',
    department: 'Phòng Y tế',
    email: 'phamthid@school.edu.vn',
    phone: '0904567890',
    status: 'active',
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    position: 'Nhân viên bảo vệ',
    department: 'Phòng Bảo vệ',
    email: 'hoangvane@school.edu.vn',
    phone: '0905678901',
    status: 'active',
  },
];

const departments = [
  { name: 'Phòng Hành chính', count: 15 },
  { name: 'Phòng Kế toán', count: 8 },
  { name: 'Phòng Thư viện', count: 5 },
  { name: 'Phòng Y tế', count: 4 },
  { name: 'Phòng Bảo vệ', count: 12 },
  { name: 'Phòng IT', count: 6 },
  { name: 'Phòng Vệ sinh', count: 20 },
  { name: 'Phòng Khác', count: 15 },
];

const documents = [
  { id: 1, title: 'Quy định nội bộ trường học', category: 'Quy định', date: '01/12/2024', status: 'active' },
  { id: 2, title: 'Hướng dẫn sử dụng hệ thống', category: 'Hướng dẫn', date: '15/11/2024', status: 'active' },
  { id: 3, title: 'Báo cáo tháng 12/2024', category: 'Báo cáo', date: '30/12/2024', status: 'pending' },
];

const StaffAdminsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const filteredStaff = staffData.filter(
    (staff) =>
      (!departmentFilter || departmentFilter === 'all' || staff.department === departmentFilter) &&
      (!searchQuery || staff.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Tổng quan nhân viên</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={24} />
              <span className="text-xs font-semibold text-blue-700">Nhân viên</span>
            </div>
            <p className="text-3xl font-bold text-blue-900">{staffData.length}</p>
            <p className="mt-1 text-xs text-blue-700">Tổng số nhân viên</p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="text-emerald-600" size={24} />
              <span className="text-xs font-semibold text-emerald-700">Phòng ban</span>
            </div>
            <p className="text-3xl font-bold text-emerald-900">{departments.length}</p>
            <p className="mt-1 text-xs text-emerald-700">Số phòng ban</p>
          </div>
          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-purple-600" size={24} />
              <span className="text-xs font-semibold text-purple-700">Tài liệu</span>
            </div>
            <p className="text-3xl font-bold text-purple-900">{documents.length}</p>
            <p className="mt-1 text-xs text-purple-700">Tài liệu quản lý</p>
          </div>
        </div>
      </section>

      {/* Department Distribution */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-indigo-600" />
          Phân bố theo phòng ban
        </h2>
        <div className="grid gap-3 md:grid-cols-4">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <p className="text-sm font-semibold text-slate-900 mb-1">{dept.name}</p>
              <p className="text-2xl font-bold text-indigo-600">{dept.count}</p>
              <p className="text-xs text-slate-500 mt-1">nhân viên</p>
            </div>
          ))}
        </div>
      </section>

      {/* Staff List */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            Danh sách nhân viên
          </h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
            >
              <option value="all">Tất cả phòng ban</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={16} />
              Thêm nhân viên
            </button>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Nhân viên
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Chức vụ
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Phòng ban
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Liên hệ
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{staff.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{staff.position}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{staff.department}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Mail size={12} />
                        <span className="text-xs">{staff.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Phone size={12} />
                        <span className="text-xs">{staff.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      {staff.status === 'active' ? 'Đang làm việc' : 'Nghỉ việc'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Documents */}
      <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-purple-600" />
          Tài liệu quản lý
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <FileText className="text-indigo-600 flex-shrink-0" size={20} />
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    doc.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {doc.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{doc.title}</h3>
              <p className="text-xs text-slate-500 mb-2">{doc.category}</p>
              <p className="text-xs text-slate-400">{doc.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaffAdminsDashboard;
