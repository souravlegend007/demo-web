import React from 'react';
import { Shield, Users, TreePine, BookMarked } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="vision" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-800 bg-red-100 px-3 py-1 rounded-full">
            Legacy Since 1987
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            About Our School &amp; Heritage
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed font-quote">
            "Come to Learn, Go to Serve" – Shaping young character, discipline, and intellect in the heart of Tripura.
          </p>
        </div>

        {/* Main Narrative */}
        <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
          <p className="text-justify font-sans">
            <strong>Assam Rifles Public School, Agartala</strong> was established on{' '}
            <span className="text-red-800 font-semibold">01 July 1987</span>. It was initially christened as{' '}
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

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
              <Shield className="w-6 h-6 text-red-800 shrink-0 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">Military Discipline</h4>
              <p className="text-xs text-slate-600 mt-1">Integrity, punctuality, and pride instilled through NCC and daily morning assembly.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
              <BookMarked className="w-6 h-6 text-amber-600 shrink-0 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">CBSE Curriculum</h4>
              <p className="text-xs text-slate-600 mt-1">Contemporary pedagogy incorporating Science, Commerce, and Arts with Geography &amp; Psychology.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
              <TreePine className="w-6 h-6 text-emerald-700 shrink-0 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">Lush Green Campus</h4>
              <p className="text-xs text-slate-600 mt-1">Secure, pollution-free atmosphere with extensive playgrounds and botanical gardens.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
              <Users className="w-6 h-6 text-blue-700 shrink-0 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">Inclusive Community</h4>
              <p className="text-xs text-slate-600 mt-1">Welcoming defense personnel wards and civilian students with equitable care and mentorship.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
