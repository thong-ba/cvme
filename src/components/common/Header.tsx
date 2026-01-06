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
    <header className="cv-header">
      <div className="cv-header__inner">
        <div className="cv-header__brand">
          <span className="cv-header__logo">TLN</span>
          <span className="cv-header__name">Thong Ly Ngoc</span>
        </div>
        <nav className="cv-header__nav">
          <a href="#about">
            <User size={16} /> About
          </a>
          <a href="#skills">
            <Code2 size={16} /> Skills
          </a>
          <a href="#experience">
            <Briefcase size={16} /> Experience
          </a>
          <a href="#projects">
            <FolderGit2 size={16} /> Projects
          </a>
          <a href="#contact">
            <Mail size={16} /> Contact
          </a>
        </nav>
        <div className="cv-header__cta">
          <button type="button" className="cv-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>
          <a href="#contact" className="cv-button cv-button--outline">
            <Download size={14} />
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

