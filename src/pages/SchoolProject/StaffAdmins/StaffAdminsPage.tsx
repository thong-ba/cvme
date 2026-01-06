// Staff Admins Page
import { ArrowLeft, Users, Settings, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaffAdminsPage = () => {
  return (
    <div className="school-project-page">
      <div className="school-project-header">
        <Link to="/school-project" className="school-project-back">
          <ArrowLeft size={20} />
          Về giới thiệu dự án
        </Link>
        <h1 className="school-project-title">
          <Users size={32} />
          Nhân viên (Staff Admins)
        </h1>
        <p className="school-project-subtitle">Quản lý thông tin nhân viên và vận hành hệ thống</p>
      </div>

      <div className="school-project-content">
        <section className="school-project-section">
          <h2>Thống kê nhân viên</h2>
          <div className="school-project-dashboard">
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Users size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Tổng nhân viên</h3>
                <p className="school-project-stat-value">85</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Settings size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Phòng ban</h3>
                <p className="school-project-stat-value">8</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <FileText size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Tài liệu</h3>
                <p className="school-project-stat-value">120</p>
              </div>
            </div>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Danh sách nhân viên</h2>
          <div className="school-project-placeholder">
            <p>Bảng danh sách nhân viên sẽ được hiển thị ở đây</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaffAdminsPage;

