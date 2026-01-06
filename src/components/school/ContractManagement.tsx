// Contract Management Component
import { FileText, Calendar, CheckCircle, XCircle, Plus } from 'lucide-react';

const ContractManagement = () => {
  const contracts = [
    {
      id: 1,
      school: 'Trường THPT Trần Hưng Đạo',
      type: 'Hợp tác giáo dục',
      startDate: '01/01/2024',
      endDate: '31/12/2024',
      status: 'active',
      value: '500,000,000 VNĐ',
    },
    {
      id: 2,
      school: 'Trường THCS Lê Lợi',
      type: 'Hợp tác đào tạo',
      startDate: '15/03/2024',
      endDate: '14/03/2025',
      status: 'active',
      value: '300,000,000 VNĐ',
    },
    {
      id: 3,
      school: 'Trường Tiểu học Nguyễn Du',
      type: 'Hợp tác giáo dục',
      startDate: '01/09/2023',
      endDate: '31/08/2024',
      status: 'expired',
      value: '250,000,000 VNĐ',
    },
  ];

  return (
    <div className="admin-management">
      <div className="admin-management__header">
        <div className="admin-management__title-group">
          <h3>Thông tin Ký kết</h3>
          <p>Quản lý các hợp đồng và thỏa thuận hợp tác với các trường</p>
        </div>
        <button className="admin-button admin-button--primary">
          <Plus size={18} />
          Thêm hợp đồng mới
        </button>
      </div>

      <div className="admin-contracts-grid">
        {contracts.map((contract) => (
          <div key={contract.id} className="admin-contract-card">
            <div className="admin-contract-card__header">
              <div className="admin-contract-card__icon">
                <FileText size={24} />
              </div>
              <span
                className={`admin-status admin-status--${contract.status === 'active' ? 'active' : 'expired'}`}
              >
                {contract.status === 'active' ? (
                  <>
                    <CheckCircle size={14} />
                    Đang hiệu lực
                  </>
                ) : (
                  <>
                    <XCircle size={14} />
                    Hết hạn
                  </>
                )}
              </span>
            </div>
            <h4>{contract.school}</h4>
            <p className="admin-contract-card__type">{contract.type}</p>
            <div className="admin-contract-card__details">
              <div className="admin-contract-card__detail">
                <Calendar size={16} />
                <div>
                  <span className="admin-contract-card__label">Ngày bắt đầu:</span>
                  <span>{contract.startDate}</span>
                </div>
              </div>
              <div className="admin-contract-card__detail">
                <Calendar size={16} />
                <div>
                  <span className="admin-contract-card__label">Ngày kết thúc:</span>
                  <span>{contract.endDate}</span>
                </div>
              </div>
              <div className="admin-contract-card__detail">
                <FileText size={16} />
                <div>
                  <span className="admin-contract-card__label">Giá trị:</span>
                  <span className="admin-contract-card__value">{contract.value}</span>
                </div>
              </div>
            </div>
            <div className="admin-contract-card__actions">
              <button className="admin-button admin-button--ghost">Xem chi tiết</button>
              <button className="admin-button admin-button--primary">Chỉnh sửa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractManagement;

