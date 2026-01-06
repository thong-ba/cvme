// Data Management Component
import { Database, Download, Upload, RefreshCw, FileText, BarChart3 } from 'lucide-react';

const DataManagement = () => {
  return (
    <div className="admin-management">
      <div className="admin-management__header">
        <div className="admin-management__title-group">
          <h3>Quản lý Dữ liệu</h3>
          <p>Quản lý, xuất nhập và đồng bộ dữ liệu hệ thống</p>
        </div>
        <div className="admin-management__actions">
          <button className="admin-button admin-button--secondary">
            <Upload size={18} />
            Nhập dữ liệu
          </button>
          <button className="admin-button admin-button--primary">
            <Download size={18} />
            Xuất dữ liệu
          </button>
        </div>
      </div>

      <div className="admin-data-grid">
        <div className="admin-data-card">
          <div className="admin-data-card__icon admin-data-card__icon--blue">
            <Database size={24} />
          </div>
          <h4>Tổng dữ liệu</h4>
          <p className="admin-data-card__value">2.5M</p>
          <p className="admin-data-card__label">Bản ghi</p>
        </div>

        <div className="admin-data-card">
          <div className="admin-data-card__icon admin-data-card__icon--green">
            <FileText size={24} />
          </div>
          <h4>Dữ liệu đã đồng bộ</h4>
          <p className="admin-data-card__value">2.3M</p>
          <p className="admin-data-card__label">Bản ghi</p>
        </div>

        <div className="admin-data-card">
          <div className="admin-data-card__icon admin-data-card__icon--orange">
            <RefreshCw size={24} />
          </div>
          <h4>Lần đồng bộ cuối</h4>
          <p className="admin-data-card__value">2 giờ trước</p>
          <p className="admin-data-card__label">Đồng bộ tự động</p>
        </div>

        <div className="admin-data-card">
          <div className="admin-data-card__icon admin-data-card__icon--purple">
            <BarChart3 size={24} />
          </div>
          <h4>Tỷ lệ chính xác</h4>
          <p className="admin-data-card__value">98.5%</p>
          <p className="admin-data-card__label">Dữ liệu hợp lệ</p>
        </div>
      </div>

      <div className="admin-section">
        <h4>Thao tác dữ liệu</h4>
        <div className="admin-actions-grid">
          <button className="admin-action-card">
            <Upload size={24} />
            <span>Nhập dữ liệu từ Excel</span>
          </button>
          <button className="admin-action-card">
            <Download size={24} />
            <span>Xuất báo cáo PDF</span>
          </button>
          <button className="admin-action-card">
            <RefreshCw size={24} />
            <span>Đồng bộ dữ liệu</span>
          </button>
          <button className="admin-action-card">
            <Database size={24} />
            <span>Sao lưu dữ liệu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;

