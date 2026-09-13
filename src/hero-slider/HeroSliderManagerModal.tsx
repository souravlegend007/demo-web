import React, { useState, useRef } from 'react';
import { X, Upload, RotateCcw, Check, ImageIcon, Info, Plus } from 'lucide-react';
import { HeroSlideItem } from './types';
import { getAllHeroSlides, saveCustomHeroSlides, resetHeroSlidesToDefault } from './index';

interface HeroSliderManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSlidesUpdated: () => void;
}

export const HeroSliderManagerModal: React.FC<HeroSliderManagerModalProps> = ({
  isOpen,
  onClose,
  onSlidesUpdated,
}) => {
  const [slides, setSlides] = useState<HeroSlideItem[]>(() => getAllHeroSlides());
  const [selectedSlideId, setSelectedSlideId] = useState<string>(slides[0]?.id || 'slide-1');
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const activeSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetSlideId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read as Base64 Data URL
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const resultDataUrl = uploadEvent.target?.result as string;
      if (!resultDataUrl) return;

      const updated = slides.map((slide) => {
        if (slide.id === targetSlideId) {
          return {
            ...slide,
            image: resultDataUrl,
            fallbackImage: resultDataUrl,
          };
        }
        return slide;
      });

      setSlides(updated);
      saveCustomHeroSlides(updated);
      onSlidesUpdated();
      setNotification(`Uploaded new photo for "${activeSlide.title || targetSlideId}" successfully!`);
      setTimeout(() => setNotification(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (field: 'title' | 'category' | 'description', val: string) => {
    const updated = slides.map((slide) => {
      if (slide.id === selectedSlideId) {
        return {
          ...slide,
          [field]: val,
        };
      }
      return slide;
    });
    setSlides(updated);
    saveCustomHeroSlides(updated);
    onSlidesUpdated();
  };

  const handleToggleActive = (id: string) => {
    const updated = slides.map((slide) => {
      if (slide.id === id) {
        return {
          ...slide,
          active: slide.active === false ? true : false,
        };
      }
      return slide;
    });
    setSlides(updated);
    saveCustomHeroSlides(updated);
    onSlidesUpdated();
  };

  const handleReset = () => {
    if (window.confirm('Reset all slider photos and captions back to factory defaults?')) {
      resetHeroSlidesToDefault();
      const fresh = getAllHeroSlides();
      setSlides(fresh);
      onSlidesUpdated();
      setNotification('Reset slider to default photos and captions.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Hero Slider Image & Content Manager</h2>
              <p className="text-xs text-slate-400">
                Upload new photos, change titles, or manage slides on the homepage slider
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification banner */}
        {notification && (
          <div className="px-6 py-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border-b border-emerald-100">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick instructions pill */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Two Easy Ways to Update Slider Photos:</p>
              <ul className="list-disc list-inside space-y-0.5 text-blue-800">
                <li>
                  <strong>Web Browser:</strong> Click &quot;Upload Photo File&quot; below to choose any JPG/PNG from your computer. It saves instantly!
                </li>
                <li>
                  <strong>Server Hosting (Plesk/cPanel/FTP):</strong> Drop your image file directly into <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-[11px]">public/hero-slider/slide-1.jpg</code>.
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Slide List */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Slide to Edit ({slides.length} Available)
              </label>
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {slides.map((s, idx) => {
                  const isSel = s.id === selectedSlideId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSlideId(s.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left border transition-all text-xs ${
                        isSel
                          ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="w-12 h-8 rounded-md overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (s.fallbackImage && e.currentTarget.src !== s.fallbackImage) {
                              e.currentTarget.src = s.fallbackImage;
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${
                            isSel ? 'bg-amber-400 text-slate-900 font-bold' : 'bg-slate-200 text-slate-700'
                          }`}>
                            #{idx + 1}
                          </span>
                          <span className="truncate font-semibold">{s.title}</span>
                        </div>
                        <span className={`text-[10px] block truncate ${isSel ? 'text-slate-300' : 'text-slate-500'}`}>
                          {s.category} &bull; {s.id}.jpg
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        s.active !== false
                          ? isSel ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {s.active !== false ? 'Live' : 'Hidden'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Slide Editor & Upload */}
            <div className="lg:col-span-7 bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
              {activeSlide && (
                <>
                  {/* Image Preview & Upload Button */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Slide Image Preview
                    </label>
                    <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shadow-inner group">
                      <img
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (activeSlide.fallbackImage && e.currentTarget.src !== activeSlide.fallbackImage) {
                            e.currentTarget.src = activeSlide.fallbackImage;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                        >
                          <Upload className="w-4 h-4" />
                          Upload New Photo for This Slide
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, activeSlide.id)}
                  />

                  {/* Direct upload action button */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      Browse & Upload Photo File
                    </button>
                    <button
                      onClick={() => handleToggleActive(activeSlide.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                        activeSlide.active !== false
                          ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {activeSlide.active !== false ? 'Hide from Slider' : 'Make Slide Active'}
                    </button>
                    <span className="text-[11px] text-slate-500 ml-auto font-mono">
                      File: public/hero-slider/{activeSlide.id}.jpg
                    </span>
                  </div>

                  {/* Text Edit Fields */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Slide Headline
                      </label>
                      <input
                        type="text"
                        value={activeSlide.title}
                        onChange={(e) => handleTextChange('title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="e.g. Morning Assembly & Solemn School Pledge"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Category Badge
                        </label>
                        <input
                          type="text"
                          value={activeSlide.category}
                          onChange={(e) => handleTextChange('category', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          placeholder="e.g. Assembly & Discipline"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Slide Description
                        </label>
                        <input
                          type="text"
                          value={activeSlide.description || ''}
                          onChange={(e) => handleTextChange('description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          placeholder="Brief description..."
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-rose-600 hover:text-rose-800 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Slides to Default
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
          >
            Done & Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
