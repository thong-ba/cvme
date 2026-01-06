// Footer
import { Github, Facebook } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="cv-footer">
      <div className="cv-footer__inner">
        <span>© Thong Ly Ngoc – {year}</span>
        <div className="cv-footer__links">
          <a href="https://github.com/thong-ba" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} />
            GitHub
          </a>
          <a href="https://www.facebook.com/thonglnse/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook size={16} />
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

