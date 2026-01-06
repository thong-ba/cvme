// Students Page
import { ArrowLeft, Award, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentsPage = () => {
  return (
    <div className="school-project-page">
      <div className="school-project-header">
        <Link to="/school-project" className="school-project-back">
          <ArrowLeft size={20} />
          Về giới thiệu dự án
        </Link>
        <h1 className="school-project-title">
          <Award size={32} />
          Học sinh (Students)
        </h1>
        <p className="school-project-subtitle">Xem thành tích, thời khóa biểu và điểm số</p>
      </div>

      <div className="school-project-content">
        <section className="school-project-section">
          <h2>Thành tích của tôi</h2>
          <div className="school-project-dashboard">
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
                <BookOpen size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Xếp hạng</h3>
                <p className="school-project-stat-value">15/45</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Award size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Thành tích</h3>
                <p className="school-project-stat-value">12</p>
              </div>
            </div>
          </div>
        </section>

        <section className="school-project-section">
          <h2>
            <Calendar size={20} /> Thời khóa biểu
          </h2>
          <div className="school-project-placeholder">
            <p>Thời khóa biểu sẽ được hiển thị ở đây</p>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Điểm số</h2>
          <div className="school-project-placeholder">
            <p>Bảng điểm số sẽ được hiển thị ở đây</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentsPage;

