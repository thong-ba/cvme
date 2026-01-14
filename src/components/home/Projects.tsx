// Projects section
import { useState, useEffect } from 'react';
import { FolderGit2, Github, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const projects = [
    {
      name: 'Hệ thống Quản lý Trường học',
      description:
        'Hệ thống quản lý toàn diện cho trường học với đầy đủ tính năng: quản lý học sinh, giáo viên, lớp học, điểm số và thời khóa biểu. Dashboard admin với biểu đồ thống kê, quản lý hợp đồng và tài khoản. Giao diện trực quan, responsive, hỗ trợ dark mode.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Router'],
      demo: '/school-project',
      github: 'https://github.com/thong-ba',
      featured: true,
      highlights: ['Dashboard với charts', 'Quản lý đa vai trò', 'Dark mode', 'Responsive design'],
    },
    {
      name: 'Nền tảng Quản lý Bán hàng',
      description:
        'Hệ thống quản lý bán hàng online với đầy đủ tính năng: quản lý sản phẩm, đơn hàng, khách hàng, tồn kho và báo cáo doanh thu. Dashboard trực quan với biểu đồ thống kê real-time, quản lý inventory và order processing.',
      stack: ['React', 'TypeScript', 'Vite', 'React Query', 'REST API'],
      demo: '#',
      github: '#',
      featured: false,
      highlights: ['Real-time updates', 'Inventory management', 'Order processing'],
    },
    {
      name: 'Hệ thống Quản lý Công ty',
      description:
        'Platform quản lý nội bộ công ty: quản lý nhân sự, dự án, công việc, phòng ban và báo cáo. Tối ưu workflow, tăng hiệu quả làm việc của team với kanban board, task management và team collaboration tools.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'REST API'],
      demo: '#',
      github: '#',
      featured: false,
      highlights: ['Kanban board', 'Task management', 'Team collaboration'],
    },
  ];

  return (
    <section id="projects" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Projects</h2>
          </div>
        </div>

        <div className={`grid gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {projects.map((project, index) => (
            <article
              key={project.name}
              className={`group relative flex flex-col rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900/50 ${
                project.featured ? 'md:col-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {project.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white">
                  <Sparkles size={12} />
                  Featured
                </div>
              )}

              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
                    <FolderGit2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{project.name}</h3>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-base leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

              {/* Highlights */}
              {project.highlights && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              {/* Stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-all duration-300 hover:bg-slate-200 hover:scale-105 dark:bg-slate-700 dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto flex items-center gap-4">
                {project.name === 'Hệ thống Quản lý Trường học' ? (
                  <Link
                    to={project.demo}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Xem dự án
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-500 dark:border-slate-600 dark:text-slate-400">
                    Coming soon
                  </span>
                )}
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Github size={16} />
                    Code
                  </a>
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

