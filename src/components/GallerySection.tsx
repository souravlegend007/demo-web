import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Sports', 'Laboratories', 'Events', 'Activities'];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Moments &amp; Memories
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            School Photo &amp; Activity Gallery
          </h2>
          <div className="w-20 h-1 bg-red-800 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Click on any photograph to view high-resolution imagery and event commentary.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
                activeCategory === cat
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-slate-100 aspect-[4/3] border border-slate-200"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold text-amber-300 bg-slate-950/60 self-start px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">{item.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 text-white/80 hover:text-white rounded-full bg-slate-900/80 transition z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-slate-900/80 transition z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-slate-900/80 transition z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden max-h-[70vh] shadow-2xl bg-black">
              <img
                src={filteredItems[selectedPhotoIndex].imageUrl}
                alt={filteredItems[selectedPhotoIndex].title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
            <div className="bg-slate-900/90 text-white p-4 rounded-b-lg w-full text-center border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                {filteredItems[selectedPhotoIndex].category} • Assam Rifles Public School Agartala
              </span>
              <h3 className="text-base font-bold font-crest mt-0.5">
                {filteredItems[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl mx-auto">
                {filteredItems[selectedPhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
