import React, { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Play, Film, Image as ImageIcon } from 'lucide-react';
import { getLivePhotos, getLiveVideos, MEDIA_UPDATED_EVENT } from '../media/liveMediaStore';
import { PhotoItem, VideoItem } from '../media/mediaTypes';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => getLivePhotos());
  const [videos, setVideos] = useState<VideoItem[]>(() => getLiveVideos());
  const [mediaType, setMediaType] = useState<'photos' | 'videos'>('photos');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPhotos(getLivePhotos());
      setVideos(getLiveVideos());
    };
    window.addEventListener(MEDIA_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(MEDIA_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const categories = ['All', 'Campus', 'Sports', 'Laboratories', 'Events', 'Activities', 'Ceremonial'];

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  const filteredVideos =
    activeCategory === 'All'
      ? videos
      : videos.filter((item) => item.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38b6d8] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            Moments &amp; Memories
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            School Photo &amp; Activity Gallery
          </h2>
          <div className="w-20 h-1 bg-[#ef5a5a] mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Explore live photo highlights, sports meets, military parade drills, and lab innovations across Assam Rifles Public School Agartala.
          </p>
        </div>

        {/* Media Type Switcher: Photos vs Videos */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
            <button
              onClick={() => {
                setMediaType('photos');
                setActiveCategory('All');
              }}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                mediaType === 'photos'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photographs ({photos.length})</span>
            </button>
            <button
              onClick={() => {
                setMediaType('videos');
                setActiveCategory('All');
              }}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                mediaType === 'videos'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Video Highlights ({videos.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-2xs cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-amber-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {mediaType === 'photos' ? (
          filteredPhotos.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No photos found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative rounded-xl overflow-hidden shadow-2xs hover:shadow-xl cursor-pointer bg-slate-100 aspect-[4/3] border border-slate-200"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <span className="text-[10px] uppercase font-bold text-amber-300 bg-slate-950/70 self-start px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">{item.title}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          filteredVideos.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No videos found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="group rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition bg-white cursor-pointer"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#ef5a5a] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                    {vid.duration && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-black/80 text-white rounded">
                        {vid.duration}
                      </span>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-black/60 text-amber-300 rounded uppercase">
                      {vid.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#38b6d8] transition-colors line-clamp-1">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {vid.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 text-white/80 hover:text-white rounded-full bg-slate-900/80 transition z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-slate-900/80 transition z-50 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-slate-900/80 transition z-50 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden max-h-[70vh] shadow-2xl bg-black">
              <img
                src={filteredPhotos[selectedPhotoIndex].imageUrl}
                alt={filteredPhotos[selectedPhotoIndex].title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
            <div className="bg-slate-900/95 text-white p-4 rounded-b-lg w-full text-center border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                {filteredPhotos[selectedPhotoIndex].category} • Assam Rifles Public School Agartala
              </span>
              <h3 className="text-base font-bold font-crest mt-0.5">
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl mx-auto">
                {filteredPhotos[selectedPhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#38b6d8]" />
                <h3 className="text-sm font-bold text-white line-clamp-1">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-slate-900 text-xs text-slate-300">
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
