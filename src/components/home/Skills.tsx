// Skills section
import { useState, useEffect } from 'react';
import { LayoutPanelTop, Wrench, CheckCircle2, Palette, Zap } from 'lucide-react';

const Skills = () => {
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

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const coreSkills = ['React', 'TypeScript', 'JavaScript', 'HTML/CSS'];

  const frameworks = ['Vite', 'Tailwind CSS', 'React Router', 'Next.js'];

  const tools = ['Git', 'Figma', 'REST API', 'React Query'];

  const otherSkills = ['Redux', 'Zustand', 'Jest', 'Testing Library', 'Webpack', 'ESLint', 'Prettier'];

  return (
    <section id="skills" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Skills</h2>
          </div>
        </div>

        <div className={`grid gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Core Skills */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-lg dark:border-slate-700 dark:from-slate-800 dark:to-slate-900/50">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              <LayoutPanelTop size={20} className="text-indigo-600" /> Core Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill, index) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 size={14} /> {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Frameworks & Libraries */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                <Zap size={18} className="text-purple-600" /> Frameworks & Libraries
              </h3>
              <div className="flex flex-wrap gap-2">
                {frameworks.map((framework) => (
                  <span
                    key={framework}
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300"
                  >
                    <CheckCircle2 size={14} /> {framework}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                <Wrench size={18} className="text-emerald-600" /> Tools & Others
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300"
                  >
                    <CheckCircle2 size={14} /> {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Other Skills */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              <Palette size={18} className="text-pink-600" /> Additional Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-200 hover:scale-105 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {skill}
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

