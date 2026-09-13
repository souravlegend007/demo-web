import React, { useState } from 'react';
import { Flag, X } from 'lucide-react';
import { HOUSES_INFO } from '../data/schoolData';

export const InstitutionOverview: React.FC = () => {
  const [selectedHouse, setSelectedHouse] = useState<(typeof HOUSES_INFO)[0] | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Institution Overview Card matching reference screenshot */}
      <div className="bg-gradient-to-b from-[#0e1e38] via-[#0b172a] to-[#1f1019] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-amber-500/20">
        <h3 className="text-lg sm:text-xl font-crest font-bold text-amber-400 tracking-wide uppercase pb-3 border-b border-slate-700/80">
          Institution Overview
        </h3>

        <dl className="mt-4 space-y-3.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
            <dt className="text-slate-400 font-medium">Date of Establishment</dt>
            <dd className="font-bold text-slate-100">01 July 1987 (38 Years)</dd>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
            <dt className="text-slate-400 font-medium">CBSE Affiliation No.</dt>
            <dd className="font-mono font-bold text-amber-300">2030013</dd>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
            <dt className="text-slate-400 font-medium">School Code</dt>
            <dd className="font-mono font-bold text-amber-300">35274</dd>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
            <dt className="text-slate-400 font-medium">Class Range</dt>
            <dd className="font-bold text-slate-100">Nursery to Class XII</dd>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
            <dt className="text-slate-400 font-medium">Total Campus Area</dt>
            <dd className="font-bold text-emerald-400">23,876 sq. meters</dd>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-800/80">
            <dt className="text-slate-400 font-medium">Medium of Instruction</dt>
            <dd className="font-bold text-slate-100">English (CBSE)</dd>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <dt className="text-slate-400 font-medium">Managing Society</dt>
            <dd className="font-bold text-slate-100 text-right text-xs sm:text-sm">ARWES, HQ DGAR Shillong</dd>
          </div>
        </dl>

        {/* House System Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              The Four School Houses
            </span>
            <span className="text-[10px] text-slate-400">Click to explore</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {HOUSES_INFO.map((house) => {
              let styleClasses = '';
              let dotColor = '';
              if (house.name === 'Gandhi') {
                styleClasses = 'bg-red-950/70 border-red-500/50 text-red-200 hover:bg-red-900/80';
                dotColor = 'bg-red-500';
              } else if (house.name === 'Nehru') {
                styleClasses = 'bg-blue-950/70 border-blue-500/50 text-blue-200 hover:bg-blue-900/80';
                dotColor = 'bg-blue-500';
              } else if (house.name === 'Subhash') {
                styleClasses = 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200 hover:bg-emerald-900/80';
                dotColor = 'bg-emerald-500';
              } else {
                styleClasses = 'bg-amber-950/70 border-yellow-500/50 text-amber-200 hover:bg-amber-900/80';
                dotColor = 'bg-amber-400';
              }

              return (
                <button
                  key={house.name}
                  type="button"
                  onClick={() => setSelectedHouse(house)}
                  className={`border px-3 py-2 rounded-lg text-center font-semibold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer ${styleClasses}`}
                  title={`Click to view ${house.name} House details`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                  <span>
                    {house.name} ({house.name === 'Gandhi' ? 'Red' : house.name === 'Nehru' ? 'Blue' : house.name === 'Subhash' ? 'Green' : 'Yellow'})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* House Details Modal */}
      {selectedHouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header with house color banner */}
            <div
              className="p-5 text-white relative"
              style={{ backgroundColor: selectedHouse.color }}
            >
              <button
                type="button"
                onClick={() => setSelectedHouse(null)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
                aria-label="Close house details"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs mb-1.5">
                <Flag className="w-3 h-3" />
                <span>School House</span>
              </div>
              <h3 className="text-2xl font-extrabold font-display">
                {selectedHouse.name} House
              </h3>
              <p className="text-xs text-white/90 font-medium mt-0.5">
                Official Color: {selectedHouse.colorName} ({selectedHouse.name === 'Gandhi' ? 'Red' : selectedHouse.name === 'Nehru' ? 'Blue' : selectedHouse.name === 'Subhash' ? 'Green' : 'Yellow'})
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-3.5 text-sm text-slate-700">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patron &amp; Inspiration</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{selectedHouse.patron}</div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">House Motto</div>
                <div className="font-serif italic text-slate-800 font-semibold text-base mt-0.5">
                  "{selectedHouse.motto}"
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Core Values</div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{selectedHouse.values}</p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Focus &amp; Spirit</div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{selectedHouse.description}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedHouse(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
