import React from 'react';
import { Shield, Users, TreePine, BookMarked } from 'lucide-react';
import { ScrollingNoticeBoard } from './ScrollingNoticeBoard';

interface AboutSectionProps {
  onNavigate?: (pageId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section id="vision" className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ef5a5a] bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Legacy Since 1987
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            About Our School &amp; Heritage
          </h2>
          <div className="w-20 h-1 bg-[#f3b745] mx-auto mt-3 rounded-full"></div>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed font-quote">
            "Come to Learn, Go to Serve" – Shaping young character, discipline, and intellect in the heart of Tripura.
          </p>
        </div>

        {/* Main Content Layout: Story & Pillars on Left, Scrolling Notice Board on Right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10">
          {/* Left Side: About Narrative & Core Pillars */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p className="text-justify font-sans">
                <strong>Assam Rifles Public School, Agartala</strong> was established on{' '}
                <span className="text-[#ef5a5a] font-semibold">01 July 1987</span>. It was initially christened as{' '}
                <em>Suryodya Public School</em>, serving the children of the valiant Assam Rifles personnel stationed in Tripura and the surrounding civilian populace.
              </p>
              <p className="text-justify font-sans">
                Reflecting its unwavering commitment to scholastic standards, the institution received formal affiliation with the{' '}
                <strong>Central Board of Secondary Education (CBSE), New Delhi</strong> in the year <strong>2002</strong> and was subsequently upgraded to the Senior Secondary level (Class XII) in <strong>2003</strong>.
              </p>
              <p className="text-justify font-sans">
                Administered under the stewardship of the{' '}
                <strong>Assam Rifles Welfare Education Society (ARWES)</strong>, HQ DGAR Shillong, the school provides an idyllic learning ecosystem spanning across{' '}
                <strong className="text-slate-900">23,876 square meters</strong> of peaceful cantonment terrain in Kunjaban, Agartala.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs hover:border-[#38b6d8] transition">
                <Shield className="w-5 h-5 text-[#ef5a5a] shrink-0 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">Military Discipline</h4>
                <p className="text-xs text-slate-600 mt-1">Integrity, punctuality, and pride instilled through NCC and daily morning assembly.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs hover:border-[#38b6d8] transition">
                <BookMarked className="w-5 h-5 text-amber-600 shrink-0 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">CBSE Curriculum</h4>
                <p className="text-xs text-slate-600 mt-1">Contemporary pedagogy incorporating Science, Commerce, and Arts with Geography &amp; Psychology.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs hover:border-[#38b6d8] transition">
                <TreePine className="w-5 h-5 text-emerald-700 shrink-0 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">Lush Green Campus</h4>
                <p className="text-xs text-slate-600 mt-1">Secure, pollution-free atmosphere with extensive playgrounds and botanical gardens.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs hover:border-[#38b6d8] transition">
                <Users className="w-5 h-5 text-blue-700 shrink-0 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">Inclusive Community</h4>
                <p className="text-xs text-slate-600 mt-1">Welcoming defense personnel wards and civilian students with equitable care and mentorship.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Scrolling Notice Board (14cm height x 12cm width) */}
          <div className="w-full lg:w-auto flex flex-col items-center justify-center shrink-0">
            <ScrollingNoticeBoard onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </section>
  );
};
