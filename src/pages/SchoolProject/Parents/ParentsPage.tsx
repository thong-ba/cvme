// Parents Page
import { ArrowLeft, Users, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParentsPage = () => {
  return (
    <div className="school-project-page">
      <div className="school-project-header">
        <Link to="/school-project" className="school-project-back">
          <ArrowLeft size={20} />
          Về giới thiệu dự án
        </Link>
        <h1 className="school-project-title">
          <Users size={32} />
          Phụ huynh (Parents)
        </h1>
        <p className="school-project-subtitle">Xem thông tin học tập của con em</p>
      </div>

      <div className="school-project-content">
        <section className="school-project-section">
          <h2>Thông tin học sinh</h2>
          <div className="school-project-dashboard">
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <BookOpen size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Lớp học</h3>
                <p className="school-project-stat-value">10A1</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Award size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Điểm trung bình</h3>
                <p className="school-project-stat-value">8.5</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Users size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Xếp hạng</h3>
                <p className="school-project-stat-value">15/45</p>
              </div>
            </div>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Điểm số chi tiết</h2>
          <div className="school-project-placeholder">
            <p>Bảng điểm số chi tiết sẽ được hiển thị ở đây</p>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Lịch học</h2>
          <div className="school-project-placeholder">
            <p>Thời khóa biểu sẽ được hiển thị ở đây</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParentsPage;

