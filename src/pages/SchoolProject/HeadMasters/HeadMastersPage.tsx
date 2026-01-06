// Head Masters Page
import { ArrowLeft, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeadMastersPage = () => {
  return (
    <div className="school-project-page">
      <div className="school-project-header">
        <Link to="/school-project" className="school-project-back">
          <ArrowLeft size={20} />
          Về giới thiệu dự án
        </Link>
        <h1 className="school-project-title">
          <Award size={32} />
          Hiệu trưởng (Head Masters)
        </h1>
        <p className="school-project-subtitle">Xem và theo dõi thành tích giáo viên và học sinh</p>
      </div>

      <div className="school-project-content">
        <section className="school-project-section">
          <h2>Thống kê tổng quan</h2>
          <div className="school-project-dashboard">
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Users size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Tổng số giáo viên</h3>
                <p className="school-project-stat-value">45</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Users size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Tổng số học sinh</h3>
                <p className="school-project-stat-value">1,250</p>
              </div>
            </div>
            <div className="school-project-stat-card">
              <div className="school-project-stat-icon">
                <Award size={24} />
              </div>
              <div className="school-project-stat-info">
                <h3>Thành tích xuất sắc</h3>
                <p className="school-project-stat-value">320</p>
              </div>
            </div>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Thành tích giáo viên</h2>
          <div className="school-project-placeholder">
            <p>Bảng thành tích giáo viên sẽ được hiển thị ở đây</p>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Thành tích học sinh</h2>
          <div className="school-project-placeholder">
            <p>Bảng thành tích học sinh sẽ được hiển thị ở đây</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeadMastersPage;

