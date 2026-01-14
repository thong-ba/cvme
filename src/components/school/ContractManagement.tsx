// Contract Management Component
import { useState, useMemo } from 'react';
import { FileText, Calendar, CheckCircle, XCircle, Plus, Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { contracts } from '../../data';

type SortOption = 'default' | 'startDate-asc' | 'startDate-desc' | 'endDate-asc' | 'endDate-desc' | 'value-asc' | 'value-desc' | 'school-asc' | 'school-desc';

const ContractManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Hợp tác giáo dục' | 'Hợp tác đào tạo'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Filter and sort contracts
  const filteredAndSortedContracts = useMemo(() => {
    let result = [...contracts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (contract) =>
          contract.school.toLowerCase().includes(query) ||
          contract.type.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((contract) => contract.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((contract) => contract.type === typeFilter);
    }

    // Sort
    if (sortOption !== 'default') {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'startDate-asc':
            return new Date(a.startDate.split('/').reverse().join('-')).getTime() - new Date(b.startDate.split('/').reverse().join('-')).getTime();
          case 'startDate-desc':
            return new Date(b.startDate.split('/').reverse().join('-')).getTime() - new Date(a.startDate.split('/').reverse().join('-')).getTime();
          case 'endDate-asc':
            return new Date(a.endDate.split('/').reverse().join('-')).getTime() - new Date(b.endDate.split('/').reverse().join('-')).getTime();
          case 'endDate-desc':
            return new Date(b.endDate.split('/').reverse().join('-')).getTime() - new Date(a.endDate.split('/').reverse().join('-')).getTime();
          case 'value-asc': {
            const valueA = parseInt(a.value.replace(/[^\d]/g, ''));
            const valueB = parseInt(b.value.replace(/[^\d]/g, ''));
            return valueA - valueB;
          }
          case 'value-desc': {
            const valueA = parseInt(a.value.replace(/[^\d]/g, ''));
            const valueB = parseInt(b.value.replace(/[^\d]/g, ''));
            return valueB - valueA;
          }
          case 'school-asc':
            return a.school.localeCompare(b.school, 'vi');
          case 'school-desc':
            return b.school.localeCompare(a.school, 'vi');
          default:
            return 0;
        }
      });
    }

    return result;
  }, [searchQuery, statusFilter, typeFilter, sortOption]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setSortOption('default');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || sortOption !== 'default';

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

      {/* Search, Filter, and Sort Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên trường hoặc loại hợp đồng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter and Sort Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'expired')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hiệu lực</option>
              <option value="expired">Hết hạn</option>
            </select>
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'Hợp tác giáo dục' | 'Hợp tác đào tạo')}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white"
          >
            <option value="all">Tất cả loại hợp đồng</option>
            <option value="Hợp tác giáo dục">Hợp tác giáo dục</option>
            <option value="Hợp tác đào tạo">Hợp tác đào tạo</option>
          </select>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={18} className="text-slate-600" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white"
            >
              <option value="default">Sắp xếp mặc định</option>
              <option value="startDate-asc">Ngày bắt đầu: Tăng dần</option>
              <option value="startDate-desc">Ngày bắt đầu: Giảm dần</option>
              <option value="endDate-asc">Ngày kết thúc: Tăng dần</option>
              <option value="endDate-desc">Ngày kết thúc: Giảm dần</option>
              <option value="value-asc">Giá trị: Tăng dần</option>
              <option value="value-desc">Giá trị: Giảm dần</option>
              <option value="school-asc">Tên trường: A-Z</option>
              <option value="school-desc">Tên trường: Z-A</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600">
          Hiển thị <span className="font-semibold text-slate-800">{filteredAndSortedContracts.length}</span> / {contracts.length} hợp đồng
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedContracts.length > 0 ? (
          filteredAndSortedContracts.map((contract) => (
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
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <FileText className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-lg font-medium text-slate-600 mb-2">Không tìm thấy hợp đồng nào</p>
            <p className="text-sm text-slate-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractManagement;
