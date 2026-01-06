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
    <section className="cv-section" id="projects">
      <div className="cv-section__header">
        <h2>Projects</h2>
        <p>3–6 project tiêu biểu chứng minh năng lực thật.</p>
      </div>
      <div className="cv-projects">
        {projects.map((project) => (
          <article key={project.name} className="cv-project-card">
            <h3>
              <FolderGit2 size={16} /> {project.name}
            </h3>
            <p className="cv-project-card__desc">{project.description}</p>
            <div className="cv-tag-list">
              {project.stack.map((tech) => (
                <span key={tech} className="cv-tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="cv-project-card__links">
              {project.name === 'Hệ thống Quản lý Trường học' ? (
                <Link to={project.demo}>
                  Xem dự án <ExternalLink size={14} />
                </Link>
              ) : (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Live demo <ExternalLink size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;

