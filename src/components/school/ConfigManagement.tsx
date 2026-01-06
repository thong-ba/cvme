// Config Management Component
import { Settings, Calendar, BookOpen, GraduationCap } from 'lucide-react';

const ConfigManagement = () => {
  return (
    <div className="admin-management">
      <div className="admin-management__header">
        <div className="admin-management__title-group">
          <h3>Cấu hình Hệ thống</h3>
          <p>Cấu hình năm học, học kỳ, quy chế và các thiết lập hệ thống</p>
        </div>
      </div>

      <div className="admin-config-grid">
        <div className="admin-config-card">
          <div className="admin-config-card__icon">
            <Calendar size={24} />
          </div>
          <h4>Năm học</h4>
          <div className="admin-config-card__content">
            <div className="admin-config-item">
              <span className="admin-config-label">Năm học hiện tại:</span>
              <span className="admin-config-value">2024 - 2025</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Ngày bắt đầu:</span>
              <span className="admin-config-value">01/09/2024</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Ngày kết thúc:</span>
              <span className="admin-config-value">31/05/2025</span>
            </div>
          </div>
          <button className="admin-button admin-button--primary">Chỉnh sửa</button>
        </div>

        <div className="admin-config-card">
          <div className="admin-config-card__icon">
            <BookOpen size={24} />
          </div>
          <h4>Học kỳ</h4>
          <div className="admin-config-card__content">
            <div className="admin-config-item">
              <span className="admin-config-label">Học kỳ 1:</span>
              <span className="admin-config-value">01/09 - 31/12/2024</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Học kỳ 2:</span>
              <span className="admin-config-value">01/01 - 31/05/2025</span>
            </div>
          </div>
          <button className="admin-button admin-button--primary">Chỉnh sửa</button>
        </div>

        <div className="admin-config-card">
          <div className="admin-config-card__icon">
            <GraduationCap size={24} />
          </div>
          <h4>Quy chế</h4>
          <div className="admin-config-card__content">
            <div className="admin-config-item">
              <span className="admin-config-label">Điểm tối thiểu:</span>
              <span className="admin-config-value">5.0</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Điểm đạt:</span>
              <span className="admin-config-value">≥ 5.0</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Điểm xuất sắc:</span>
              <span className="admin-config-value">≥ 8.5</span>
            </div>
          </div>
          <button className="admin-button admin-button--primary">Chỉnh sửa</button>
        </div>

        <div className="admin-config-card">
          <div className="admin-config-card__icon">
            <Settings size={24} />
          </div>
          <h4>Thiết lập hệ thống</h4>
          <div className="admin-config-card__content">
            <div className="admin-config-item">
              <span className="admin-config-label">Thời gian làm việc:</span>
              <span className="admin-config-value">7:00 - 17:00</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Thời gian nghỉ:</span>
              <span className="admin-config-value">11:30 - 13:30</span>
            </div>
            <div className="admin-config-item">
              <span className="admin-config-label">Số tiết/ngày:</span>
              <span className="admin-config-value">5 tiết</span>
            </div>
          </div>
          <button className="admin-button admin-button--primary">Chỉnh sửa</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigManagement;

