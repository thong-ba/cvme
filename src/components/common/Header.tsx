// Header / Navbar
import { useEffect, useState } from 'react';
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Mail,
  SunMedium,
  MoonStar,
  Download,
} from 'lucide-react';

const Header = () => {
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('cv-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      window.localStorage.setItem('cv-theme', next);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm">
            TLN
          </span>
          <span className="text-sm tracking-tight text-slate-800 dark:text-slate-100">Thong Ly Ngoc</span>
        </div>

        <nav className="hidden items-center gap-5 text-sm text-slate-500 md:flex dark:text-slate-300">
          <a href="#about" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
            <User size={16} />
            <span>About</span>
          </a>
          <a href="#skills" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
            <Code2 size={16} />
            <span>Skills</span>
          </a>
          <a href="#experience" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
            <Briefcase size={16} />
            <span>Experience</span>
          </a>
          <a href="#projects" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
            <FolderGit2 size={16} />
            <span>Projects</span>
          </a>
          <a href="#contact" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
            <Mail size={16} />
            <span>Contact</span>
          </a>
        </nav>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-1 rounded-full border border-indigo-500 px-3 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white md:inline-flex dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-500"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

