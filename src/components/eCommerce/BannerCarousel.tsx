import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Banner } from '../../types/ecommerce';

interface BannerCarouselProps {
  banners: Banner[];
  autoPlayMs?: number;
}

const BannerCarousel = ({ banners, autoPlayMs = 5000 }: BannerCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, autoPlayMs);
    return () => clearInterval(t);
  }, [banners.length, autoPlayMs]);

  if (!banners.length) return null;

  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-slate-200">
      <div className="relative aspect-[3/1] min-h-[180px] sm:min-h-[240px] md:min-h-[320px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Link to={banner.link} className="block h-full w-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                <div className="max-w-2xl px-6 sm:px-8 md:px-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="mt-2 text-white/90 text-sm sm:text-base md:text-lg">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.linkText && (
                    <span className="mt-4 inline-block px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                      {banner.linkText}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors"
            aria-label="Trước"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors"
            aria-label="Sau"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BannerCarousel;
