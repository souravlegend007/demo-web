import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Shield, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

interface AnnouncementTickerProps {
  onOpenAdmissionModal: () => void;
  onNavigateToFees: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({
  onOpenAdmissionModal,
  onNavigateToFees,
  onNavigate,
}) => {
  return (
    <section className="bg-white py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* The 3 Signature Feature Cards (Directly matching IMG_0001.jpeg: Coral Red, Sunny Yellow, and Sky Cyan cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 sm:-mt-12 relative z-20">
          {/* Card 1: Coral Red (#ef5a5a) with Cyan CTA Button */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col transition hover:-translate-y-1">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
                alt="Academic Excellence"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 text-[#ef5a5a] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                Academics
              </div>
            </div>
            <div className="bg-[#ef5a5a] text-white p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold font-display text-white mb-2">
                  Academic Excellence
                </h4>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  Comprehensive CBSE curriculum with newly introduced Geography &amp; Psychology electives and consistent 100% board results.
                </p>
              </div>
              <div>
                <button
                  onClick={() => onNavigate ? onNavigate('admission-syllabus') : onNavigateToFees()}
                  className="px-4 py-2 bg-[#38b6d8] hover:bg-[#28a3c4] text-white text-xs font-bold rounded-lg shadow-sm transition inline-flex items-center gap-1.5"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Sunny Yellow (#f3b745) with Cyan CTA Button */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col transition hover:-translate-y-1">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
                alt="Defense Discipline & Values"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 text-[#c2840c] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                ARWES Patronage
              </div>
            </div>
            <div className="bg-[#f3b745] text-white p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold font-display text-white mb-2">
                  Discipline &amp; Leadership
                </h4>
                <p className="text-white/95 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  Nurtured under Assam Rifles military heritage with active NCC training, sportsmanship, and character development.
                </p>
              </div>
              <div>
                <button
                  onClick={() => onNavigate ? onNavigate('about-leadership') : onOpenAdmissionModal()}
                  className="px-4 py-2 bg-[#38b6d8] hover:bg-[#28a3c4] text-white text-xs font-bold rounded-lg shadow-sm transition inline-flex items-center gap-1.5"
                >
                  <span>Leadership Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Sky Blue / Cyan (#38b6d8) with Coral Red CTA Button */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col transition hover:-translate-y-1">
            <div className="h-44 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800"
                alt="Admissions Open 2025-26"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 text-[#38b6d8] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                Admissions Open
              </div>
            </div>
            <div className="bg-[#38b6d8] text-white p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold font-display text-white mb-2">
                  Admissions 2025-26
                </h4>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  Transparent merit admissions from Nursery to Class IX &amp; XI with zero capitation fee and affordable subsidized slabs.
                </p>
              </div>
              <div>
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-4 py-2 bg-[#ef5a5a] hover:bg-[#df4747] text-white text-xs font-bold rounded-lg shadow-sm transition inline-flex items-center gap-1.5"
                >
                  <span>Apply Online Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
