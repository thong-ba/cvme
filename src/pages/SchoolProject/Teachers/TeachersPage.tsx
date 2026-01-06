// Teachers Page
import { ArrowLeft, BookOpen, Users, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeachersPage = () => {
  return (
    <div className="school-project-page">
      <div className="school-project-header">
        <Link to="/school-project" className="school-project-back">
          <ArrowLeft size={20} />
          Về giới thiệu dự án
        </Link>
        <h1 className="school-project-title">
          <BookOpen size={32} />
          Giáo viên (Teachers)
        </h1>
        <p className="school-project-subtitle">Quản lý lớp học, học sinh và điểm số</p>
      </div>

      <div className="school-project-content">
        <section className="school-project-section">
          <h2>Lớp học của tôi</h2>
          <div className="school-project-dashboard">
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <BookOpen size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Số lớp dạy</h3>
                <p className="school-project-stat-value">5</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Users size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Tổng học sinh</h3>
                <p className="school-project-stat-value">150</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <ClipboardList size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Bài kiểm tra</h3>
                <p className="school-project-stat-value">12</p>
              </div>
            </div>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Danh sách lớp học</h2>
          <div className="school-project-placeholder">
            <p>Danh sách lớp học sẽ được hiển thị ở đây</p>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Quản lý điểm số</h2>
          <div className="school-project-placeholder">
            <p>Bảng quản lý điểm số sẽ được hiển thị ở đây</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeachersPage;

