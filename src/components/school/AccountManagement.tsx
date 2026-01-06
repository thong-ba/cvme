// Account Management Component
import { Plus, Shield, Mail, Phone, Search } from 'lucide-react';

const AccountManagement = () => {
  const accounts = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@school.edu.vn',
      phone: '0901234567',
      school: 'Trường THPT Trần Hưng Đạo',
      role: 'Admin trường',
      status: 'active',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@school.edu.vn',
      phone: '0902345678',
      school: 'Trường THCS Lê Lợi',
      role: 'Admin trường',
      status: 'active',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@school.edu.vn',
      phone: '0903456789',
      school: 'Trường Tiểu học Nguyễn Du',
      role: 'Admin trường',
      status: 'inactive',
    },
  ];

  return (
    <div className="admin-management">
      <div className="admin-management__header">
        <div className="admin-management__title-group">
          <h3>Quản lý Tài khoản Admin</h3>
          <p>Quản lý tài khoản quản trị viên của các trường trong hệ thống</p>
        </div>
        <div className="admin-management__actions">
          <div className="admin-search">
            <Search size={18} />
            <input type="text" placeholder="Tìm kiếm tài khoản..." />
          </div>
          <button className="admin-button admin-button--primary">
            <Plus size={18} />
            Tạo tài khoản mới
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Trường</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="admin-table__user">
                    <div className="admin-table__avatar">
                      <Shield size={16} />
                    </div>
                    <span>{account.name}</span>
                  </div>
                </td>
                <td>
                  <div className="admin-table__contact">
                    <Mail size={14} />
                    <span>{account.email}</span>
                  </div>
                </td>
                <td>
                  <div className="admin-table__contact">
                    <Phone size={14} />
                    <span>{account.phone}</span>
                  </div>
                </td>
                <td>{account.school}</td>
                <td>
                  <span className="admin-badge admin-badge--role">{account.role}</span>
                </td>
                <td>
                  <span className={`admin-status admin-status--${account.status}`}>
                    {account.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <button className="admin-action-button">Chỉnh sửa</button>
                    <button className="admin-action-button admin-action-button--danger">Khóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;

