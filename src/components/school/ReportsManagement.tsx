// Reports Management Component
import { useState, useMemo } from 'react';
import { FileText, Search, Download, Calendar, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Pagination } from 'antd';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Report {
  id: number;
  title: string;
  type: 'academic' | 'attendance' | 'performance' | 'financial' | 'general';
  period: string;
  date: string;
  status: 'completed' | 'pending' | 'draft';
  description: string;
}

// Mock reports data
const reportsData: Report[] = [
  {
    id: 1,
    title: 'Báo cáo kết quả học tập học kỳ I',
    type: 'academic',
    period: 'Học kỳ I - 2024-2025',
    date: '2024-12-15',
    status: 'completed',
    description: 'Báo cáo tổng hợp kết quả học tập của tất cả học sinh trong học kỳ I',
  },
  {
    id: 2,
    title: 'Báo cáo tỷ lệ chuyên cần',
    type: 'attendance',
    period: 'Tháng 12/2024',
    date: '2024-12-10',
    status: 'completed',
    description: 'Báo cáo tỷ lệ chuyên cần của học sinh theo từng lớp',
  },
  {
    id: 3,
    title: 'Báo cáo thành tích giáo viên',
    type: 'performance',
    period: 'Năm học 2024-2025',
    date: '2024-12-20',
    status: 'completed',
    description: 'Báo cáo đánh giá thành tích giảng dạy của giáo viên',
  },
  {
    id: 4,
    title: 'Báo cáo tài chính quý IV',
    type: 'financial',
    period: 'Quý IV/2024',
    date: '2024-12-25',
    status: 'pending',
    description: 'Báo cáo tài chính quý IV năm 2024',
  },
  {
    id: 5,
    title: 'Báo cáo tổng kết năm học',
    type: 'general',
    period: 'Năm học 2024-2025',
    date: '2025-05-30',
    status: 'draft',
    description: 'Báo cáo tổng kết toàn bộ hoạt động trong năm học',
  },
  {
    id: 6,
    title: 'Báo cáo kết quả thi học sinh giỏi',
    type: 'academic',
    period: 'Học kỳ I - 2024-2025',
    date: '2024-12-05',
    status: 'completed',
    description: 'Báo cáo kết quả thi học sinh giỏi các cấp',
  },
  {
    id: 7,
    title: 'Báo cáo hoạt động ngoại khóa',
    type: 'general',
    period: 'Tháng 12/2024',
    date: '2024-12-18',
    status: 'completed',
    description: 'Báo cáo các hoạt động ngoại khóa đã tổ chức',
  },
  {
    id: 8,
    title: 'Báo cáo đánh giá chất lượng giáo dục',
    type: 'performance',
    period: 'Học kỳ I - 2024-2025',
    date: '2024-12-22',
    status: 'completed',
    description: 'Báo cáo đánh giá chất lượng giáo dục toàn trường',
  },
];

// Mock chart data
const academicPerformanceData = [
  { month: 'T9', excellent: 85, good: 120, average: 95 },
  { month: 'T10', excellent: 92, good: 125, average: 88 },
  { month: 'T11', excellent: 98, good: 130, average: 85 },
  { month: 'T12', excellent: 105, good: 135, average: 80 },
];

const attendanceData = [
  { class: '10A1', attendance: 98.5, absent: 1.5 },
  { class: '10A2', attendance: 97.8, absent: 2.2 },
  { class: '11A1', attendance: 99.2, absent: 0.8 },
  { class: '11A2', attendance: 98.0, absent: 2.0 },
  { class: '12A1', attendance: 99.5, absent: 0.5 },
];

const ReportsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const types = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'academic', label: 'Học tập' },
    { value: 'attendance', label: 'Chuyên cần' },
    { value: 'performance', label: 'Thành tích' },
    { value: 'financial', label: 'Tài chính' },
    { value: 'general', label: 'Tổng hợp' },
  ];

  const statuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'pending', label: 'Đang xử lý' },
    { value: 'draft', label: 'Nháp' },
  ];

  const filteredReports = useMemo(() => {
    let result = [...reportsData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.period.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((item) => item.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }

    return result;
  }, [searchQuery, typeFilter, statusFilter]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, statusFilter]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      academic: 'Học tập',
      attendance: 'Chuyên cần',
      performance: 'Thành tích',
      financial: 'Tài chính',
      general: 'Tổng hợp',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      academic: 'bg-blue-100 text-blue-800 border-blue-200',
      attendance: 'bg-green-100 text-green-800 border-green-200',
      performance: 'bg-purple-100 text-purple-800 border-purple-200',
      financial: 'bg-amber-100 text-amber-800 border-amber-200',
      general: 'bg-slate-100 text-slate-800 border-slate-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: 'Hoàn thành',
      pending: 'Đang xử lý',
      draft: 'Nháp',
    };
    return labels[status] || status;
  };

  const stats = {
    total: reportsData.length,
    completed: reportsData.filter((r) => r.status === 'completed').length,
    pending: reportsData.filter((r) => r.status === 'pending').length,
    draft: reportsData.filter((r) => r.status === 'draft').length,
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng báo cáo</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FileText className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Nháp</p>
              <p className="text-2xl font-bold text-slate-600">{stats.draft}</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <FileText className="text-slate-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-600" />
            Kết quả học tập theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={academicPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="excellent" stackId="1" stroke="#10b981" fill="#10b981" name="Giỏi" />
              <Area type="monotone" dataKey="good" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Khá" />
              <Area type="monotone" dataKey="average" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Trung bình" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Users size={18} className="text-indigo-600" />
            Tỷ lệ chuyên cần theo lớp
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#10b981" name="Có mặt (%)" />
              <Bar dataKey="absent" fill="#ef4444" name="Vắng (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center mb-4">
          <div className="relative flex-1 w-full sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm (tiêu đề, mô tả, kỳ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 bg-white"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            Hiển thị <span className="font-semibold text-slate-800">{filteredReports.length}</span> báo cáo
            {filteredReports.length !== reportsData.length && (
              <span className="ml-2 text-slate-500">(tổng: {reportsData.length})</span>
            )}
          </span>
          {(searchQuery || typeFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setStatusFilter('all');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </section>

      {/* Reports Table */}
      <section className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md ring-1 ring-slate-100">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Tiêu đề
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Kỳ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Ngày
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedReports.length > 0 ? (
                    paginatedReports.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-900">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-xs text-slate-500 mt-1 max-w-md truncate">{item.description}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(
                              item.type
                            )}`}
                          >
                            {getTypeLabel(item.type)}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                          {item.period}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(item.date).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              title="Tải xuống"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              className="p-1.5 text-slate-600 hover:bg-slate-50 rounded transition-colors"
                              title="Xem chi tiết"
                            >
                              <FileText size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        Không tìm thấy báo cáo nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredReports.length > itemsPerPage && (
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              current={currentPage}
              total={filteredReports.length}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} báo cáo`}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default ReportsManagement;
