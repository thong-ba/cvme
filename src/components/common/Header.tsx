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
  Menu,
  X,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('cv-theme', next);
      return next;
    });
  };

  const navItems = [
    { href: '#about', icon: User, label: 'About' },
    { href: '#experience', icon: Briefcase, label: 'Experience' },
    { href: '#projects', icon: FolderGit2, label: 'Projects' },
    { href: '#skills', icon: Code2, label: 'Skills' },
    { href: '#contact', icon: Mail, label: 'Contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm">
              TLN
            </span>
            <span className="text-sm tracking-tight text-slate-800 dark:text-slate-100">Thong Ly Ngoc</span>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-slate-500 md:flex dark:text-slate-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </a>
              );
            })}
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
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={handleNavClick}>
          <nav
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={handleNavClick}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;

