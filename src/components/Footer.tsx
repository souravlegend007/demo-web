import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin, ExternalLink, Shield, FolderOpen } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const logoImg = '/arps-logo.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTcModal: () => void;
  onOpenMandatoryDisclosure: () => void;
  onOpenAdmissionModal: () => void;
  onOpenMediaManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTcModal,
  onOpenMandatoryDisclosure,
  onOpenAdmissionModal,
  onOpenMediaManager,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [logoSrc, setLogoSrc] = useState<string>(logoImg || './arps-logo.png');

  return (
    <footer className="bg-[#183648] text-slate-300 pt-16 pb-8 border-t-4 border-[#38b6d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-700/60">
          {/* Col 1: School Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border-2 border-[#38b6d8] overflow-hidden p-0.5">
                <img
                  src={logoSrc}
                  alt="ARPS Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (logoSrc.endsWith('.png')) {
                      setLogoSrc('./arps-logo.jpg');
                    }
                  }}
                />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white leading-tight">
                  <span className="text-[#38b6d8]">Assam Rifles</span> Public School
                </h3>
                <p className="text-xs text-[#f3b745] font-semibold">Agartala, Tripura</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Established in 1987 under the aegis of Assam Rifles Welfare Education Society (ARWES), Shillong. Affiliated to CBSE New Delhi (Affiliation No. 2030013, School Code: 35274).
            </p>
            <div className="text-xs italic text-[#f3b745] border-l-2 border-[#ef5a5a] pl-3 py-0.5">
              "Come to Learn, Go to Serve"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#38b6d8] font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about-vision')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  About School &amp; Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-leadership')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Chairman &amp; Principal Messages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admission-process')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Admission Guidelines 2025-26
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admission-fees')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Fee Structure &amp; Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facilities-labs')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Laboratories &amp; Campus Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('staff')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Faculty &amp; Staff Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alumni')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Alumni Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#38b6d8] font-display">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('admission-tc')}
                  className="hover:text-emerald-400 transition text-left font-semibold text-emerald-400"
                >
                  Transfer Certificate (TC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-disclosure')}
                  className="hover:text-[#f3b745] transition text-left font-semibold text-[#f3b745]"
                >
                  Mandatory Public Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-[#ef5a5a] transition text-left"
                >
                  Vacancies &amp; Notice Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admission-apply')}
                  className="hover:text-white text-[#ef5a5a] font-bold transition text-left"
                >
                  Online Admission Application
                </button>
              </li>
              <li>
                <a
                  href="https://cbse.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1 text-slate-400"
                >
                  <span>CBSE Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://assamrifles.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1 text-slate-400"
                >
                  <span>HQ Assam Rifles</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#38b6d8] font-display">
              School Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ef5a5a] shrink-0 mt-0.5" />
                <span>Kunjaban, Agartala, Tripura - 799006</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#38b6d8] shrink-0" />
                <a href="tel:0381-2350702" className="hover:text-white transition font-mono">
                  0381-2350702
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f3b745] shrink-0" />
                <a href="mailto:arps.agartala@gmail.com" className="hover:text-white transition font-mono">
                  arps.agartala@gmail.com
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Office Hours: Mon–Sat 8:00 AM – 2:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>&copy; {new Date().getFullYear()} Assam Rifles Public School, Agartala. Managed by ARWES.</span>
            {onOpenMediaManager && (
              <>
                <span className="text-slate-600 hidden sm:inline">&bull;</span>
                <button
                  onClick={onOpenMediaManager}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-[#38b6d8] transition-colors cursor-pointer text-[11px]"
                  title="Dedicated Media & Files Manager (/public/media/)"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#38b6d8]" />
                  <span>Media &amp; Files Manager</span>
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              CBSE Affiliation: <strong className="text-white">2030013</strong> | School Code: <strong className="text-white">35274</strong>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#ef5a5a] hover:bg-[#df4747] text-white transition shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
