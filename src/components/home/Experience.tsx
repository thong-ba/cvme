// Experience / Timeline section
import { useState, useEffect } from 'react';
import { Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { homeTranslations } from '../../locales/home';

const Experience = () => {
  const { locale } = useLanguage();
  const t = homeTranslations[locale].experience;
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

    const element = document.getElementById('experience');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
      indigo: {
        bg: 'from-indigo-50 to-blue-50',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        dot: 'bg-indigo-500',
      },
      purple: {
        bg: 'from-purple-50 to-pink-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        dot: 'bg-purple-500',
      },
    };
    return colors[color] || colors.indigo;
  };

  return (
    <section id="experience" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">{t.title}</h2>
          </div>
        </div>

        <div className={`relative space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-transparent dark:from-indigo-600 dark:via-purple-600"></div>

          {t.items.map((item, index) => {
            const color = index === 0 ? 'indigo' : 'purple';
            const colors = getColorClasses(color);
            return (
              <article
                key={item.company + item.time}
                className={`relative ml-12 rounded-2xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900/50`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[3.5rem] top-6 flex h-8 w-8 items-center justify-center rounded-full ${colors.dot} shadow-lg ring-4 ring-white dark:ring-slate-900`}>
                  <Building2 size={16} className="text-white" />
                </div>

                {/* Header */}
                <div className="mb-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.company}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Calendar size={14} />
                      <span className="font-medium">{item.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <p className={`text-sm font-semibold uppercase tracking-wide ${colors.text} ${color === 'indigo' ? 'dark:text-indigo-400' : 'dark:text-purple-400'}`}>
                      {item.role}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={12} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-3 mb-4">
                  {item.description.map((desc, descIndex) => (
                    <li key={descIndex} className="flex items-start gap-3 text-base leading-7 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={18} className={`${colors.text} flex-shrink-0 mt-1`} />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Keywords */}
                <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.technicalKeywords}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:bg-slate-800 dark:text-slate-200"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
