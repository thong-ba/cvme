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
      <section className="py-14 sm:py-20" id="hero">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
              <Sparkles size={14} />
              Frontend Developer
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-[3.1rem] dark:text-slate-50">
              Xây giao diện web
              <span className="text-indigo-500"> sạch</span>,<span className="text-indigo-500"> nhanh</span>, dễ mở rộng.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              Tập trung vào UX, performance và code maintainable. Ưu tiên rõ ràng, đơn giản, dễ scale cho team.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500 hover:shadow-lg"
              >
                View Projects
                <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Contact Me
                <Send size={14} />
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div
              className="flex h-36 w-36 cursor-pointer items-center justify-center rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#6366f1,#0f172a,#6366f1)] p-[3px] shadow-lg transition hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={avatarImage}
                alt="Thong Ly Ngoc"
                className="h-full w-full rounded-full object-cover bg-slate-900/80"
              />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <img
              src={avatarImage}
              alt="Thong Ly Ngoc"
              className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

