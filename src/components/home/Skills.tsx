// Skills section
import { LayoutPanelTop, Wrench, CheckCircle2 } from 'lucide-react';

const Skills = () => {
  const coreSkills = ['React', 'TypeScript', 'Vite', 'Tailwind CSS'];
  const tools = ['Git', 'Figma', 'REST API', 'React Query / SWR'];

  return (
    <section className="cv-section" id="skills">
      <div className="cv-section__header">
        <h2>Skills</h2>
        <p>Những thứ bạn làm tốt nhất, recruiter scan nhanh trong vài giây.</p>
      </div>
      <div className="cv-skills">
        <div className="cv-card">
          <h3>
            <LayoutPanelTop size={16} /> Frontend
          </h3>
          <div className="cv-tag-list">
            {coreSkills.map((skill) => (
              <span key={skill} className="cv-tag">
                <CheckCircle2 size={12} /> {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="cv-card">
          <h3>
            <Wrench size={16} /> Tools & Others
          </h3>
          <div className="cv-tag-list">
            {tools.map((tool) => (
              <span key={tool} className="cv-tag">
                <CheckCircle2 size={12} /> {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

