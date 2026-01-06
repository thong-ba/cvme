// Experience / Timeline section
import { Building2, CircleDot } from 'lucide-react';

const Experience = () => {
  const items = [
    {
      company: 'FSI – Data System',
      role: 'Frontend Intern',
      time: '06/2025 – 09/2025',
      description: [
        'Tham gia dự án số hoá dữ liệu địa chỉ cư dân cho các tỉnh miền Tây, phục vụ hệ thống quản lý dữ liệu điện tử quy mô lớn.',
        'Thực hiện nhập liệu, chuẩn hoá và kiểm tra tính hợp lệ của dữ liệu (format, logic, tính nhất quán) trước khi đưa vào hệ thống.',
        'Phối hợp với team quản lý trong việc kiểm duyệt, đối soát và xử lý dữ liệu sai lệch, đảm bảo dữ liệu đầu vào chính xác cho hệ thống hiển thị và báo cáo.',
        'Hiểu và tuân thủ luồng dữ liệu (data flow), yêu cầu nghiệp vụ và quy trình vận hành của hệ thống thực tế.',
      ],
      keywords: ['Data Validation', 'Data Flow', 'System Logic', 'Digital Transformation', 'Team Collaboration'],
    },
    {
      company: 'Amazing Tech – Internal System',
      role: 'Frontend Support Intern',
      time: '11/2024 – 03/2025',
      description: [
        'Hỗ trợ mảng quản lý nhân sự, làm việc với dữ liệu và tài liệu phục vụ các quy trình nội bộ của doanh nghiệp.',
        'Tham gia biên soạn, tổng hợp tài liệu và chuẩn bị dữ liệu cho các cuộc họp, giúp cải thiện luồng trao đổi thông tin nội bộ.',
        'Phối hợp xây dựng và lập trình dự án giáo dục nội bộ, hỗ trợ triển khai các chức năng phục vụ đào tạo trong công ty.',
        'Làm việc với yêu cầu nghiệp vụ (business requirements) và tư duy hệ thống, tạo nền tảng cho việc phát triển giao diện và trải nghiệm người dùng.',
      ],
      keywords: ['Internal System', 'Business Requirements', 'Basic Development', 'Data Handling', 'UX Awareness'],
    },
  ];

  return (
    <section className="cv-section" id="experience">
      <div className="cv-section__header">
        <h2>Experience</h2>
        <p>Kinh nghiệm thực tế liên quan trực tiếp tới vị trí bạn apply.</p>
      </div>
      <div className="cv-timeline">
        {items.map((item) => (
          <div key={item.company + item.time} className="cv-timeline__item cv-card">
            <div className="cv-timeline__meta">
              <h3>
                <Building2 size={16} /> {item.company}
              </h3>
              <span className="cv-timeline__role">{item.role}</span>
              <span className="cv-timeline__time">
                <CircleDot size={12} /> {item.time}
              </span>
            </div>
            <div className="cv-timeline__description">
              <ul className="cv-timeline__list">
                {item.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
            <div className="cv-timeline__keywords">
              <span className="cv-timeline__keywords-label">FE / Technical Keywords:</span>
              <div className="cv-tag-list">
                {item.keywords.map((keyword) => (
                  <span key={keyword} className="cv-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

