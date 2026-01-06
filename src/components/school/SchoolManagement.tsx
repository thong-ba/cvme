// School Management Component
import { School, Search, Plus, Filter, MoreVertical } from 'lucide-react';

const SchoolManagement = () => {
  const schools = [
    { id: 1, name: 'Trường Tiểu học Nguyễn Du', type: 'Tiểu học', level: 'Đạt chuẩn', students: 450, status: 'active' },
    { id: 2, name: 'Trường THCS Lê Lợi', type: 'THCS', level: 'Đạt chuẩn', students: 680, status: 'active' },
    { id: 3, name: 'Trường THPT Trần Hưng Đạo', type: 'THPT', level: 'Chưa đạt', students: 920, status: 'active' },
    { id: 4, name: 'Trường Tiểu học Hoàng Diệu', type: 'Tiểu học', level: 'Đạt chuẩn', students: 380, status: 'active' },
    { id: 5, name: 'Trường THCS Nguyễn Trãi', type: 'THCS', level: 'Đạt chuẩn', students: 750, status: 'active' },
  ];

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
            <input type="text" placeholder="Tìm kiếm trường..." />
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
        <button className="admin-filter-tag">Tiểu học</button>
        <button className="admin-filter-tag">THCS</button>
        <button className="admin-filter-tag">THPT</button>
        <button className="admin-filter-tag">Đạt chuẩn</button>
        <button className="admin-filter-tag">Chưa đạt</button>
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
            {schools.map((school, index) => (
              <tr key={school.id}>
                <td>{index + 1}</td>
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
    </div>
  );
};

export default SchoolManagement;

