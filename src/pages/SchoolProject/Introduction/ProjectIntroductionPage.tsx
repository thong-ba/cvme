// Project Introduction Page
import { ArrowLeft, School, Users, BookOpen, Award, Shield, UserCheck, GraduationCap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectIntroductionPage = () => {
  return (
    <div className="school-project-page">
      <div className="school-project-hero">
        <Link to="/" className="school-project-back">
          <ArrowLeft size={20} />
          Về trang chủ
        </Link>
        <div className="school-project-hero-content">
          <div className="school-project-hero-icon">
            <School size={48} />
            <div className="school-project-hero-badge">
              <Sparkles size={16} />
            </div>
          </div>
          <h1 className="school-project-title">
            Hệ thống Quản lý Trường học
          </h1>
          <p className="school-project-subtitle">
            Platform quản lý toàn diện với đầy đủ tính năng cho từng vai trò trong trường học
          </p>
          <div className="school-project-features">
            <span className="school-project-feature-badge">
              <GraduationCap size={14} />
              Quản lý học sinh
            </span>
            <span className="school-project-feature-badge">
              <BookOpen size={14} />
              Quản lý lớp học
            </span>
            <span className="school-project-feature-badge">
              <Award size={14} />
              Theo dõi thành tích
            </span>
          </div>
        </div>
      </div>

      <div className="school-project-content">
        <section className="school-project-section">
          <h2>Giới thiệu dự án</h2>
          <p>
            Hệ thống Quản lý Trường học là một platform quản lý toàn diện được thiết kế để hỗ trợ quản lý và vận hành
            trường học một cách hiệu quả. Hệ thống cung cấp các tính năng chuyên biệt cho từng vai trò trong trường
            học, từ quản trị viên đến học sinh.
          </p>
        </section>

        <section className="school-project-section">
          <h2>Tính năng theo vai trò</h2>
          <div className="school-project-roles">
            <div className="school-project-role-card school-project-role-card--admin">
              <div className="school-project-role-icon school-project-role-icon--admin">
                <Shield size={24} />
              </div>
              <div className="school-project-role-badge">Quản trị</div>
              <h3>Quản trị viên</h3>
              <p className="school-project-role-english">Administrators</p>
              <p>Kiểm tra và đánh giá chất lượng các trường hợp tác, quản lý hệ thống tổng thể.</p>
              <ul className="school-project-role-features">
                <li>✓ Kiểm tra chất lượng trường hợp tác</li>
                <li>✓ Quản lý hệ thống tổng thể</li>
                <li>✓ Báo cáo và phân tích</li>
              </ul>
              <Link to="/school-project/administrators" className="school-project-role-link">
                Khám phá ngay →
              </Link>
            </div>

            <div className="school-project-role-card school-project-role-card--headmaster">
              <div className="school-project-role-icon school-project-role-icon--headmaster">
                <Award size={24} />
              </div>
              <div className="school-project-role-badge">Lãnh đạo</div>
              <h3>Hiệu trưởng</h3>
              <p className="school-project-role-english">Head Masters</p>
              <p>Xem và theo dõi thành tích của giáo viên và học sinh, báo cáo tổng hợp.</p>
              <ul className="school-project-role-features">
                <li>✓ Theo dõi thành tích giáo viên</li>
                <li>✓ Theo dõi thành tích học sinh</li>
                <li>✓ Báo cáo tổng hợp</li>
              </ul>
              <Link to="/school-project/head-masters" className="school-project-role-link">
                Khám phá ngay →
              </Link>
            </div>

            <div className="school-project-role-card school-project-role-card--teacher">
              <div className="school-project-role-icon school-project-role-icon--teacher">
                <BookOpen size={24} />
              </div>
              <div className="school-project-role-badge">Giảng dạy</div>
              <h3>Giáo viên</h3>
              <p className="school-project-role-english">Teachers</p>
              <p>Quản lý lớp học, xem danh sách học sinh, nhập và quản lý điểm số.</p>
              <ul className="school-project-role-features">
                <li>✓ Quản lý lớp học</li>
                <li>✓ Xem danh sách học sinh</li>
                <li>✓ Nhập và quản lý điểm số</li>
              </ul>
              <Link to="/school-project/teachers" className="school-project-role-link">
                Khám phá ngay →
              </Link>
            </div>

            <div className="school-project-role-card school-project-role-card--parent">
              <div className="school-project-role-icon school-project-role-icon--parent">
                <Users size={24} />
              </div>
              <div className="school-project-role-badge">Phụ huynh</div>
              <h3>Phụ huynh</h3>
              <p className="school-project-role-english">Parents</p>
              <p>Xem thông tin học tập của con em, theo dõi điểm số và lịch học.</p>
              <ul className="school-project-role-features">
                <li>✓ Xem thông tin học tập</li>
                <li>✓ Theo dõi điểm số</li>
                <li>✓ Xem lịch học</li>
              </ul>
              <Link to="/school-project/parents" className="school-project-role-link">
                Khám phá ngay →
              </Link>
            </div>

            <div className="school-project-role-card school-project-role-card--student">
              <div className="school-project-role-icon school-project-role-icon--student">
                <GraduationCap size={24} />
              </div>
              <div className="school-project-role-badge">Học sinh</div>
              <h3>Học sinh</h3>
              <p className="school-project-role-english">Students</p>
              <p>Xem thành tích học tập, thời khóa biểu, điểm số và thông tin cá nhân.</p>
              <ul className="school-project-role-features">
                <li>✓ Xem thành tích học tập</li>
                <li>✓ Thời khóa biểu</li>
                <li>✓ Điểm số và thông tin cá nhân</li>
              </ul>
              <Link to="/school-project/students" className="school-project-role-link">
                Khám phá ngay →
              </Link>
            </div>

            <div className="school-project-role-card school-project-role-card--staff">
              <div className="school-project-role-icon school-project-role-icon--staff">
                <UserCheck size={24} />
              </div>
              <div className="school-project-role-badge">Nhân viên</div>
              <h3>Nhân viên</h3>
              <p className="school-project-role-english">Staff Admins</p>
              <p>Quản lý thông tin nhân viên, hỗ trợ vận hành hệ thống.</p>
              <ul className="school-project-role-features">
                <li>✓ Quản lý thông tin nhân viên</li>
                <li>✓ Hỗ trợ vận hành hệ thống</li>
                <li>✓ Quản lý tài liệu</li>
              </ul>
              <Link to="/school-project/staff-admins" className="school-project-role-link">
                Khám phá ngay →
              </Link>
            </div>
          </div>
        </section>

        <section className="school-project-section">
          <h2>Tech Stack</h2>
          <div className="school-project-tech">
            <span className="cv-tag">React</span>
            <span className="cv-tag">TypeScript</span>
            <span className="cv-tag">Tailwind CSS</span>
            <span className="cv-tag">REST API</span>
            <span className="cv-tag">Chart.js</span>
            <span className="cv-tag">React Router</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectIntroductionPage;

