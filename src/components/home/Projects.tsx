// Projects section
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      name: 'Hệ thống Quản lý Trường học',
      description:
        'Hệ thống quản lý toàn diện cho trường học: quản lý học sinh, giáo viên, lớp học, điểm số và thời khóa biểu. Giao diện trực quan, dễ sử dụng cho admin và giáo viên.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Chart.js'],
      demo: '/school-project',
    },
    {
      name: 'Nền tảng Quản lý Bán hàng',
      description:
        'Hệ thống quản lý bán hàng online với đầy đủ tính năng: quản lý sản phẩm, đơn hàng, khách hàng, tồn kho và báo cáo doanh thu. Dashboard trực quan với biểu đồ thống kê.',
      stack: ['React', 'TypeScript', 'Vite', 'React Query', 'REST API'],
      demo: '#',
    },
    {
      name: 'Hệ thống Quản lý Công ty',
      description:
        'Platform quản lý nội bộ công ty: quản lý nhân sự, dự án, công việc, phòng ban và báo cáo. Tối ưu workflow, tăng hiệu quả làm việc của team.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'REST API'],
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Projects</h2>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400 hidden">3–6 project tiêu biểu chứng minh năng lực.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white/80 p-5 text-base shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
            >
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                <FolderGit2 size={18} /> {project.name}
              </h3>
              <p className="mb-3 line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="mb-3 flex flex-wrap gap-1.5 text-sm">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                {project.name === 'Hệ thống Quản lý Trường học' ? (
                  <Link
                    to={project.demo}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
                  >
                    Xem dự án <ExternalLink size={14} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-400">
                    Live demo <ExternalLink size={14} />
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

