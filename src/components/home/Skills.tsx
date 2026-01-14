// Skills section
import { LayoutPanelTop, Wrench, CheckCircle2 } from 'lucide-react';

const Skills = () => {
  const coreSkills = ['React', 'TypeScript', 'Vite', 'Tailwind CSS'];
  const tools = ['Git', 'Figma', 'REST API', 'React Query / SWR'];

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Skills</h2>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400 hidden">
            Những thứ bạn làm tốt nhất, recruiter scan nhanh trong vài giây.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              <LayoutPanelTop size={18} /> Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                >
                  <CheckCircle2 size={14} /> {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              <Wrench size={18} /> Tools &amp; Others
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  <CheckCircle2 size={14} /> {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

