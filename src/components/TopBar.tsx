import React from 'react';

interface TopBarProps {
  onOpenTcModal?: () => void;
  onOpenDisclosureModal?: () => void;
  onOpenAdmissionModal?: () => void;
  onNavigate?: (pageId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = () => {
  return (
    <header className="text-xs">
      {/* Running Marquee Alert in Warm Golden Yellow (#f3b745) */}
      <div className="bg-[#f3b745] text-slate-900 font-semibold py-1.5 px-4 overflow-hidden flex items-center border-b border-[#e5a832]">
        <div className="bg-[#ef5a5a] text-white uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full mr-3 shrink-0 font-extrabold flex items-center gap-1 shadow-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-0.5"></span>
          Flash Alert
        </div>
        <div className="relative overflow-hidden w-full whitespace-nowrap">
          <div className="animate-marquee inline-flex gap-8 text-xs font-semibold text-slate-900 tracking-wide">
            <span>★ MOTTO: <strong className="text-[#ef5a5a]">COME TO LEARN, GO TO SERVE</strong></span>
            <span className="text-slate-500">•</span>
            <span>★ ADMISSIONS OPEN (2025-26) FOR NURSERY TO CLASS IX &amp; CLASS XI</span>
            <span className="text-slate-500">•</span>
            <span>★ INTRODUCING GEOGRAPHY &amp; PSYCHOLOGY IN SENIOR SECONDARY</span>
            <span className="text-slate-500">•</span>
            <span>★ NO DONATION &amp; NO CAPITATION FEE</span>
            <span className="text-slate-500">•</span>
            <span>★ CBSE AFFILIATION NO: 2030013 | SCHOOL CODE: 35274</span>
            <span className="text-slate-500">•</span>
            <span>★ TEACHING &amp; ADMINISTRATIVE VACANCIES OPEN - APPLY BEFORE DUE DATE</span>
            <span className="text-slate-500">•</span>
            <span>★ MOTTO: <strong className="text-[#ef5a5a]">COME TO LEARN, GO TO SERVE</strong></span>
            <span className="text-slate-500">•</span>
            <span>★ ADMISSIONS OPEN (2025-26) FOR NURSERY TO CLASS IX &amp; CLASS XI</span>
          </div>
        </div>
      </div>
    </header>
  );
};
