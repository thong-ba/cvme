// School Management Component
import { useMemo, useState } from 'react';
import { Pagination } from 'antd';
import { School, Search, Plus, Filter, MoreVertical } from 'lucide-react';
import { schoolList } from '../../data';

const SchoolManagement = () => {
  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'tiểu học' | 'thcs' | 'thpt'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Đạt chuẩn' | 'Chưa đạt'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;

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

  return (
    <div className="admin-management">
      <div className="admin-management__header">
        <div className="admin-management__title-group">
          <h3>Danh sách Trường học</h3>
          <p>Quản lý toàn bộ trường Tiểu học, THCS và THPT trong hệ thống</p>
        </div>
        <div className="admin-management__actions">
          <div className="admin-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm trường..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <button className="admin-button admin-button--primary">
            <Plus size={18} />
            Thêm trường mới
          </button>
        </div>
      </div>

      <div className="admin-filters">
        <button className="admin-filter-tag active">
          <Filter size={14} />
          Tất cả
        </button>
        <select
          className="admin-filter-tag"
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
          className="admin-filter-tag"
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

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên trường</th>
              <th>Loại trường</th>
              <th>Chuẩn đánh giá</th>
              <th>Số học sinh</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {pagedSchools.map((school, index) => (
              <tr key={school.id}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>
                  <div className="admin-table__school">
                    <School size={20} />
                    <span>{school.name}</span>
                  </div>
                </td>
                <td>
                  <span className={`admin-badge admin-badge--${school.type.toLowerCase()}`}>{school.type}</span>
                </td>
                <td>
                  <span
                    className={`admin-badge ${school.level === 'Đạt chuẩn' ? 'admin-badge--success' : 'admin-badge--warning'}`}
                  >
                    {school.level}
                  </span>
                </td>
                <td>{school.students.toLocaleString()}</td>
                <td>
                  <span className={`admin-status admin-status--${school.status}`}>
                    {school.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </td>
                <td>
                  <button className="admin-action-button">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-slate-600 md:flex-row">
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

