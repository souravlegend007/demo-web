import React, { useState } from 'react';
import { Building2, Microscope, BookOpen, Trophy, Shield, HeartPulse, Music, CheckCircle2, ZoomIn, X } from 'lucide-react';
import { FACILITIES } from '../data/schoolData';
import { Facility } from '../types';

export const FacilitiesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const categories = [
    { label: 'All Facilities', value: 'All', icon: Building2 },
    { label: 'Laboratories', value: 'Laboratories', icon: Microscope },
    { label: 'Library', value: 'Library', icon: BookOpen },
    { label: 'Sports & Ground', value: 'Sports', icon: Trophy },
    { label: 'NCC Cadet Wing', value: 'NCC', icon: Shield },
    { label: 'Medical Infirmary', value: 'Medical', icon: HeartPulse },
    { label: 'Music & Arts', value: 'Music & Arts', icon: Music },
  ];

  const filteredFacilities =
    activeCategory === 'All'
      ? FACILITIES
      : FACILITIES.filter((f) => f.category === activeCategory);

  return (
    <section id="facilities-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Infrastructure &amp; Campus Life
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            World-Class School Facilities
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Click on any facility or photo to view detailed specifications, lab equipment, and sports amenities.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 ring-2 ring-amber-400/50'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Zoom hint */}
              <div
                onClick={() => setSelectedFacility(facility)}
                className="relative h-52 overflow-hidden cursor-pointer bg-slate-100"
              >
                <img
                  src={facility.imageUrl}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition"></div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-950/80 text-amber-300 backdrop-blur-sm shadow">
                    {facility.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition bg-slate-950/80 text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ZoomIn className="w-3 h-3 text-amber-400" />
                  <span>Enlarge</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-crest text-slate-900 mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                    {facility.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {facility.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-amber-800 font-semibold italic">
                    {facility.highlights}
                  </span>
                  <button
                    onClick={() => setSelectedFacility(facility)}
                    className="text-xs font-bold text-slate-900 hover:text-amber-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Detailed Modal Lightbox */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-80 w-full overflow-hidden shrink-0 bg-slate-950">
              <img
                src={selectedFacility.imageUrl}
                alt={selectedFacility.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-amber-100 text-amber-900">
                  {selectedFacility.category}
                </span>
                <span className="text-xs text-slate-500">Assam Rifles Public School, Agartala</span>
              </div>
              <h3 className="text-xl font-bold font-crest text-slate-900 mb-2">
                {selectedFacility.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {selectedFacility.description}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Specifications &amp; Amenities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedFacility.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
