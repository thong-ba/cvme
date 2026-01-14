// Hero section
import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Send, X, Download, MapPin, Calendar, Briefcase } from 'lucide-react';
import avatarImage from '../../assets/avtcv.png';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <section className="relative py-14 sm:py-20 overflow-hidden" id="hero">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 animate-fade-in">
                  <Sparkles size={14} className="animate-pulse" />
                  Frontend Developer
                </p>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 animate-fade-in">
                  <Briefcase size={14} />
                  Job Apply
                </p>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-[3.5rem] dark:text-slate-50">
                Xây giao diện web
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  sạch, nhanh, dễ mở rộng
                </span>
                .
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300 max-w-2xl">
                Tập trung vào <span className="font-semibold text-indigo-600 dark:text-indigo-400">UX</span>,{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">performance</span> và{' '}
                <span className="font-semibold text-pink-600 dark:text-pink-400">code maintainable</span>. Ưu tiên rõ ràng, đơn giản, dễ scale cho team.
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-indigo-500" />
                <span>Hóc Môn, Thành phố Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-500" />
                <span>Available for opportunities</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50"
              >
                View Projects
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/20"
              >
                Contact Me
                <Send size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/cv.pdf"
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </div>
          <div className={`flex justify-center md:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div
              className="group relative flex h-48 w-48 cursor-pointer items-center justify-center rounded-full transition-all duration-500 hover:scale-110"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[3px] animate-spin-slow">
                <div className="h-full w-full rounded-full bg-white dark:bg-slate-900"></div>
              </div>
              <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-900"></div>
              <img
                src={avatarImage}
                alt="Thong Ly Ngoc"
                className="relative z-10 h-full w-full rounded-full object-cover p-1 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 backdrop-blur transition-all duration-300 hover:bg-white/20 hover:scale-110"
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

