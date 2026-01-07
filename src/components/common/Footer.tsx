// Footer
import { Github, Facebook } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/80 px-4 py-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-400">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <span>© Thong Ly Ngoc – {year}</span>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thong-ba"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.facebook.com/thonglnse/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Facebook size={16} />
            <span className="hidden sm:inline">Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

