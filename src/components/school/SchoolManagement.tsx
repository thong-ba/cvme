// School Management Component
import { useMemo, useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { School, Search, Plus, Filter, MoreVertical } from 'lucide-react';
import { schoolList } from '../../data';

interface SchoolManagementProps {
  initialTypeFilter?: 'all' | 'tiểu học' | 'thcs' | 'thpt';
  onAddSchoolClick?: () => void;
}

const SchoolManagement: React.FC<SchoolManagementProps> = ({ initialTypeFilter, onAddSchoolClick }) => {
  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'tiểu học' | 'thcs' | 'thpt'>(initialTypeFilter || 'all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Đạt chuẩn' | 'Chưa đạt'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Update typeFilter when initialTypeFilter changes
  useEffect(() => {
    if (initialTypeFilter !== undefined) {
      setTypeFilter(initialTypeFilter);
      setPage(1); // Reset to first page when filter changes
    }
  }, [initialTypeFilter]);

  const filteredSchools = useMemo(() => {
    return schoolList.filter((school) => {
      const matchKeyword = school.name.toLowerCase().includes(keyword.toLowerCase());
      const matchType = typeFilter === 'all' || school.type.toLowerCase() === typeFilter;
      const matchLevel = levelFilter === 'all' || school.level === levelFilter;
      return matchKeyword && matchType && matchLevel;
    });
  }, [keyword, typeFilter, levelFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSchools.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedSchools = filteredSchools.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Helper function to get badge colors based on school type
  const getTypeBadgeClass = (type: string) => {
    const typeLower = type.toLowerCase();
    if (typeLower === 'tiểu học') {
      return 'bg-blue-100 text-blue-800';
    } else if (typeLower === 'thcs') {
      return 'bg-emerald-100 text-emerald-800';
    } else if (typeLower === 'thpt') {
      return 'bg-pink-100 text-pink-800';
    }
    return 'bg-slate-100 text-slate-800';
  };

  // Helper function to get level badge colors
  const getLevelBadgeClass = (level: string) => {
    if (level === 'Đạt chuẩn') {
      return 'bg-emerald-100 text-emerald-800';
    } else if (level === 'Chưa đạt') {
      return 'bg-amber-100 text-amber-800';
    }
    return 'bg-slate-100 text-slate-800';
  };

  // Helper function to get status badge colors
  const getStatusBadgeClass = (status: string) => {
    if (status === 'active') {
      return 'bg-emerald-100 text-emerald-800';
    } else if (status === 'inactive') {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-slate-100 text-slate-800';
  };

  const isAllFiltersActive = typeFilter === 'all' && levelFilter === 'all' && keyword === '';

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Danh sách Trường học</h3>
          <p className="text-slate-600 text-sm md:text-base">
            Quản lý toàn bộ trường Tiểu học, THCS và THPT trong hệ thống
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
            <Search size={18} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm trường..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 min-w-[200px]"
            />
          </div>
          {/* Add Button */}
          <button
            onClick={onAddSchoolClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
          >
            <Plus size={18} />
            Thêm trường mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isAllFiltersActive
              ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white border-transparent'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-500 hover:text-blue-600'
          }`}
          onClick={() => {
            setTypeFilter('all');
            setLevelFilter('all');
            setKeyword('');
            setPage(1);
          }}
        >
          <Filter size={14} />
          Tất cả
        </button>
        <select
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-blue-200"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value as typeof typeFilter);
            setPage(1);
          }}
        >
          <option value="all">Tất cả cấp</option>
          <option value="tiểu học">Tiểu học</option>
          <option value="thcs">THCS</option>
          <option value="thpt">THPT</option>
        </select>
        <select
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-blue-200"
          value={levelFilter}
          onChange={(e) => {
            setLevelFilter(e.target.value as typeof levelFilter);
            setPage(1);
          }}
        >
          <option value="all">Tất cả chuẩn</option>
          <option value="Đạt chuẩn">Đạt chuẩn</option>
          <option value="Chưa đạt">Chưa đạt</option>
        </select>
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
                  Tên trường
                </th>
                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                  Loại trường
                </th>
                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                  Chuẩn đánh giá
                </th>
                <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider border-b-2 border-slate-200 whitespace-nowrap">
                  Số học sinh
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
              {pagedSchools.map((school, index) => (
                <tr
                  key={school.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-slate-600 whitespace-nowrap">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <School size={18} className="text-blue-600 flex-shrink-0 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">{school.name}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getTypeBadgeClass(
                        school.type
                      )}`}
                    >
                      {school.type}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadgeClass(
                        school.level
                      )}`}
                    >
                      {school.level}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 whitespace-nowrap">
                    {school.students.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        school.status
                      )}`}
                    >
                      {school.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <button className="p-1.5 sm:p-2 border border-slate-200 bg-white rounded-lg text-slate-600 hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
                      <MoreVertical size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-slate-600 md:flex-row">
        <span>
          Hiển thị {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, filteredSchools.length)} / {filteredSchools.length} trường
        </span>
        <Pagination
          current={currentPage}
          total={filteredSchools.length}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
          className="!mb-0"
        />
      </div>
    </div>
  );
};

export default SchoolManagement;
