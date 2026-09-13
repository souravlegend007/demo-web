import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getActiveHeroSlides, HeroSlideItem } from '../hero-slider';

export type PhotoSlideItem = HeroSlideItem;

interface HeroSliderProps {
  onNavigate?: (sectionId: string) => void;
  onOpenAdmissionModal?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = () => {
  const [slides, setSlides] = useState<HeroSlideItem[]>(() => getActiveHeroSlides());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Sync slides when updated in storage or manager
  const reloadSlides = useCallback(() => {
    const updated = getActiveHeroSlides();
    setSlides(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleUpdated = () => reloadSlides();
    window.addEventListener('arps_hero_slides_updated', handleUpdated);
    return () => window.removeEventListener('arps_hero_slides_updated', handleUpdated);
  }, [reloadSlides]);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    if (total === 0) return;
    setCurrentIndex((index + total) % total);
  };

  // Auto slide
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      className="w-full bg-slate-100/90"
      style={{ padding: '1cm' }}
    >
      <section
        id="photo-slider"
        className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] xl:h-[660px] overflow-hidden select-none rounded-2xl shadow-2xl bg-slate-950 border border-slate-300/80"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Campus Photo Slider"
      >
        {/* Full-bleed Slides: Images fit the entire slider area */}
        {slides.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={photo.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              {/* Image fitting 100% of the slider container with fallback */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (photo.fallbackImage && e.currentTarget.src !== photo.fallbackImage) {
                    e.currentTarget.src = photo.fallbackImage;
                  }
                }}
              />

              {/* Bottom Gradient Overlay for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Slide Caption Overlay */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-20 pointer-events-none text-white">
                {photo.category && (
                  <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 mb-2 shadow-xs backdrop-blur-xs">
                    {photo.category}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-crest tracking-wide drop-shadow-md text-white">
                  {photo.title}
                </h3>
              </div>
            </div>
          );
        })}

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full text-white bg-black/40 hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 backdrop-blur-sm cursor-pointer shadow-lg hover:scale-105"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.2]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full text-white bg-black/40 hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 backdrop-blur-sm cursor-pointer shadow-lg hover:scale-105"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.2]" />
        </button>

        {/* Top-right Counter Badge */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 px-3 py-1 rounded-full bg-black/50 text-white/90 text-xs sm:text-sm font-mono font-medium backdrop-blur-sm border border-white/20">
          {currentIndex + 1} / {total}
        </div>

        {/* Pagination Dot Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-12 z-30 flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 sm:w-9 h-2 sm:h-2.5 bg-amber-400 shadow-md'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/90'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
