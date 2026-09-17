import React, { useState } from 'react';
import { Award, BookOpen, Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const logoImg = '/arps-logo.png';

interface HeaderProps {
  onNavigate?: (pageId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const handleHomeClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const [logoSrc, setLogoSrc] = useState<string>(logoImg || './arps-logo.png');

  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & School Identity (Kidspro styling: Clean white background with multi-color branding) */}
        <div
          onClick={handleHomeClick}
          className="flex items-center gap-4 text-center md:text-left cursor-pointer group"
          title="Return to Home"
        >
          {/* Insignia Crest */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#38b6d8] via-[#ef5a5a] to-[#f3b745] p-1 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1 relative overflow-hidden">
                <img
                  src={logoSrc}
                  alt="Assam Rifles Public School Crest"
                  className="w-full h-full object-contain p-0.5"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (logoSrc.endsWith('.png')) {
                      setLogoSrc('./arps-logo.jpg');
                    }
                  }}
                />
              </div>
            </div>
            {/* Small CBSE Badge on crest */}
            <div className="absolute -bottom-1 -right-1 bg-[#38b6d8] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
              CBSE
            </div>
          </div>

          {/* School Titles */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#ef5a5a] font-bold text-xs sm:text-sm tracking-wide">
                {SCHOOL_INFO.hindiName}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f3b745]/20 text-[#c2840c] border border-[#f3b745]/40">
                Estd. 1987
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display tracking-tight text-slate-900 uppercase">
              <span className="text-[#38b6d8]">Assam</span>{' '}
              <span className="text-[#ef5a5a]">Rifles</span>{' '}
              <span className="text-slate-800">Public School</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 text-xs font-medium text-slate-600 mt-0.5">
              <span className="text-[#ef5a5a] font-bold uppercase tracking-wider">Agartala, Tripura</span>
              <span className="text-slate-300">•</span>
              <span>CBSE Affiliation: <strong className="text-slate-900">2030013</strong></span>
              <span className="text-slate-300">•</span>
              <span>School Code: <strong className="text-slate-900">35274</strong></span>
            </div>
          </div>
        </div>

        {/* Right Callouts (Matching IMG_0001.jpeg: Phone callout with Cyan circle & Clock callout with Coral circle) */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-5">
          {/* Call Us Today (Cyan circle icon badge) */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#38b6d8] text-white flex items-center justify-center shadow-sm shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                CALL US TODAY!
              </div>
              <a
                href={`tel:${SCHOOL_INFO.primaryPhone}`}
                className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#38b6d8] transition-colors"
              >
                {SCHOOL_INFO.primaryPhone}
              </a>
            </div>
          </div>

          {/* We Are Open (Coral Red circle icon badge) */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#ef5a5a] text-white flex items-center justify-center shadow-sm shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                WE ARE OPEN!
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                Mon-Sat 8:00-14:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
