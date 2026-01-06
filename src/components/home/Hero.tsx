// Hero section
import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Send, X } from 'lucide-react';
import avatarImage from '../../assets/avtcv.png';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="cv-section cv-hero" id="hero">
        <div className="cv-hero__content">
          <div className="cv-hero__text">
            <p className="cv-hero__eyebrow">
              <Sparkles size={14} />
              Frontend Developer
            </p>
            <h1 className="cv-hero__title">
              Xây giao diện web
              <span className="cv-hero__highlight"> sạch</span>,<span className="cv-hero__highlight"> nhanh</span>, dễ
              mở rộng.
            </h1>
            <p className="cv-hero__subtitle">
              Tập trung vào UX, performance và code maintainable. Ưu tiên rõ ràng, đơn giản, dễ scale cho team.
            </p>
            <div className="cv-hero__actions">
              <a href="#projects" className="cv-button cv-button--primary">
                View Projects
                <ArrowRight size={14} />
              </a>
              <a href="#contact" className="cv-button cv-button--ghost">
                Contact Me
                <Send size={14} />
              </a>
            </div>
          </div>
          <div className="cv-hero__avatar">
            <div className="cv-avatar-circle" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
              <img src={avatarImage} alt="Thong Ly Ngoc" className="cv-avatar-image" />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="cv-image-modal" onClick={() => setIsModalOpen(false)}>
          <button
            className="cv-image-modal__close"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div className="cv-image-modal__content" onClick={(e) => e.stopPropagation()}>
            <img src={avatarImage} alt="Thong Ly Ngoc" className="cv-image-modal__image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

