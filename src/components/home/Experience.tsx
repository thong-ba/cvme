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
    <section id="experience" className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Experience</h2>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            Kinh nghiệm thực tế liên quan trực tiếp tới vị trí bạn apply.
          </p>
        </div>
        <div className="space-y-6 border-l border-slate-200 pl-4 dark:border-slate-700">
          {items.map((item) => (
            <article
              key={item.company + item.time}
              className="relative rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
            >
              <span className="absolute -left-[9px] top-5 flex h-4 w-4 items-center justify-center rounded-full border border-indigo-400 bg-white text-indigo-500 shadow-sm dark:border-indigo-300 dark:bg-slate-900">
                <CircleDot size={10} />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                  <Building2 size={18} /> {item.company}
                </h3>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.time}</span>
              </div>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                {item.role}
              </p>
              <ul className="mt-3 space-y-2 text-base leading-7 text-slate-700 dark:text-slate-300">
                {item.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  FE / Technical Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

