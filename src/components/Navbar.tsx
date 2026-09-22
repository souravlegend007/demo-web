import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  GraduationCap,
  Building2,
  Bell,
  Trophy,
  Activity,
  Image,
  Users,
  UserCheck,
  Mail,
  FileCheck,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenTcModal?: () => void;
  onOpenDisclosureModal?: () => void;
  onOpenAdmissionModal?: () => void;
  activeSection?: string;
  currentPage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenTcModal,
  onOpenDisclosureModal,
  onOpenAdmissionModal,
  activeSection = 'home',
  currentPage = 'home',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    about: false,
    admission: false,
    facilities: false,
  });

  const handleNavClick = (pageOrSectionId: string) => {
    onNavigate(pageOrSectionId);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileAccordion = (menu: string) => {
    setMobileExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isAboutActive = currentPage.startsWith('about-');
  const isAdmissionActive = currentPage.startsWith('admission-');
  const isFacilitiesActive = currentPage.startsWith('facilities-');

  return (
    <nav className="sticky top-0 z-40 bg-[#ef5a5a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Mobile brand badge */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNavClick('home')}
              className="font-display font-extrabold text-white text-base tracking-wide text-left"
            >
              ARPS AGARTALA
            </button>
          </div>

          {/* Desktop Navigation (Matching IMG_0001.jpeg: Coral Red background with white text and Cyan active pill) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-xs lg:text-sm font-semibold">
            {/* Home (Active Cyan pill matching the screenshot) */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                currentPage === 'home'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                  isAboutActive
                    ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                    : 'text-white hover:bg-white/15'
                }`}
                onClick={() => handleNavClick('about-vision')}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              <div className="absolute left-0 top-full mt-0.5 w-60 bg-white border border-slate-200 shadow-xl rounded-xl py-2 hidden group-hover:block z-50 text-slate-800">
                <button
                  onClick={() => handleNavClick('about-vision')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'about-vision'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Vision &amp; Heritage
                </button>
                <button
                  onClick={() => handleNavClick('about-leadership')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'about-leadership'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Chairman &amp; Principal Desk
                </button>
                <button
                  onClick={() => handleNavClick('about-disclosure')}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold transition flex items-center justify-between ${
                    currentPage === 'about-disclosure'
                      ? 'bg-[#ef5a5a]/15 text-[#ef5a5a] font-bold'
                      : 'text-[#ef5a5a] hover:bg-[#ef5a5a]/10'
                  }`}
                >
                  <span>Mandatory Public Disclosure</span>
                  <FileCheck className="w-3.5 h-3.5 text-[#ef5a5a]" />
                </button>
                <button
                  onClick={() => handleNavClick('about-rules')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'about-rules'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  School Rules &amp; Code of Conduct
                </button>
              </div>
            </div>

            {/* Admission Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                  isAdmissionActive
                    ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                    : 'text-white hover:bg-white/15'
                }`}
                onClick={() => handleNavClick('admission-process')}
              >
                <span>Admission</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              <div className="absolute left-0 top-full mt-0.5 w-64 bg-white border border-slate-200 shadow-xl rounded-xl py-2 hidden group-hover:block z-50 text-slate-800">
                <button
                  onClick={() => handleNavClick('admission-process')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'admission-process'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Admission Process &amp; Eligibility
                </button>
                <button
                  onClick={() => handleNavClick('admission-fees')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'admission-fees'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Fee Structure &amp; Calculator
                </button>
                <button
                  onClick={() => handleNavClick('admission-syllabus')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'admission-syllabus'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Syllabus &amp; Exam Schedule
                </button>
                <button
                  onClick={() => handleNavClick('admission-uniform')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'admission-uniform'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Uniform Code
                </button>
                <button
                  onClick={() => handleNavClick('admission-tc')}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold transition ${
                    currentPage === 'admission-tc'
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Transfer Certificate (TC) Verification
                </button>
                <div className="p-2 border-t border-slate-100">
                  <button
                    onClick={() => handleNavClick('admission-apply')}
                    className="w-full py-1.5 px-3 bg-[#ef5a5a] hover:bg-[#df4747] text-white font-bold rounded-lg text-xs text-center transition shadow-xs"
                  >
                    Online Admission Form 2025-26
                  </button>
                </div>
              </div>
            </div>

            {/* Facilities Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                  isFacilitiesActive
                    ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                    : 'text-white hover:bg-white/15'
                }`}
                onClick={() => handleNavClick('facilities-labs')}
              >
                <span>Facilities</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              <div className="absolute left-0 top-full mt-0.5 w-60 bg-white border border-slate-200 shadow-xl rounded-xl py-2 hidden group-hover:block z-50 text-slate-800">
                <button
                  onClick={() => handleNavClick('facilities-labs')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'facilities-labs'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Classrooms &amp; Science Labs
                </button>
                <button
                  onClick={() => handleNavClick('facilities-computer')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'facilities-computer'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Computer &amp; AI Technology Lab
                </button>
                <button
                  onClick={() => handleNavClick('facilities-library')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'facilities-library'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Central Knowledge Library
                </button>
                <button
                  onClick={() => handleNavClick('facilities-sports')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'facilities-sports'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Sports Complex &amp; Grounds
                </button>
                <button
                  onClick={() => handleNavClick('facilities-ncc')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'facilities-ncc'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  NCC Wing (13 Tripura Bn)
                </button>
                <button
                  onClick={() => handleNavClick('facilities-medical')}
                  className={`w-full text-left px-4 py-2 text-xs transition ${
                    currentPage === 'facilities-medical'
                      ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold'
                      : 'text-slate-700 hover:bg-[#38b6d8]/10 hover:text-[#38b6d8]'
                  }`}
                >
                  Health Center &amp; Infirmary
                </button>
              </div>
            </div>

            {/* Notifications / Vacancies */}
            <button
              onClick={() => handleNavClick('notices')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                currentPage === 'notices' || currentPage === 'notices-jobs'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notices &amp; Jobs</span>
            </button>

            {/* Achievements & Sports */}
            <button
              onClick={() => handleNavClick('achievements')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                currentPage === 'achievements'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </button>

            {/* Gallery */}
            <button
              onClick={() => handleNavClick('gallery')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                currentPage === 'gallery'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Gallery</span>
            </button>

            {/* Staff */}
            <button
              onClick={() => handleNavClick('staff')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                currentPage === 'staff'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Staff</span>
            </button>

            {/* Alumni */}
            <button
              onClick={() => handleNavClick('alumni')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                currentPage === 'alumni'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Alumni</span>
            </button>

            {/* Contact Us */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                currentPage === 'contact'
                  ? 'bg-[#38b6d8] text-white font-bold shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </div>

          {/* Admin Panel CTA on Desktop in place of Apply Now */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('admin-portal')}
              className="px-4 py-2 text-xs sm:text-sm font-bold bg-[#ef5a5a] hover:bg-[#df4747] text-white rounded-md shadow-sm transition flex items-center gap-1.5 cursor-pointer border border-red-400/30"
              title="ARPS Administration & Content Management Portal"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('admin-portal')}
              className="px-2.5 py-1 text-xs font-bold bg-[#ef5a5a] hover:bg-[#df4747] text-white rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
              title="Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-white hover:bg-white/20 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Accordion Sub-menus */}
      {mobileOpen && (
        <div className="md:hidden bg-white text-slate-800 border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 text-sm max-h-[80vh] overflow-y-auto shadow-xl">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'home' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4 text-[#ef5a5a]" />
            <span>Home</span>
          </button>

          {/* Mobile About Us Accordion */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('about')}
              className="w-full text-left py-2.5 px-3 bg-slate-50 text-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Info className="w-4 h-4 text-[#ef5a5a]" />
                <span>About Us</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition ${mobileExpanded.about ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded.about && (
              <div className="bg-white py-1 px-3 space-y-1 text-xs border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('about-vision')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Vision &amp; Heritage
                </button>
                <button
                  onClick={() => handleNavClick('about-leadership')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Chairman &amp; Principal Desk
                </button>
                <button
                  onClick={() => handleNavClick('about-disclosure')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#ef5a5a]/10 text-[#ef5a5a] font-semibold"
                >
                  Mandatory Public Disclosure
                </button>
                <button
                  onClick={() => handleNavClick('about-rules')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Rules &amp; Code of Conduct
                </button>
              </div>
            )}
          </div>

          {/* Mobile Admission Accordion */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('admission')}
              className="w-full text-left py-2.5 px-3 bg-slate-50 text-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold">
                <GraduationCap className="w-4 h-4 text-[#ef5a5a]" />
                <span>Admission</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition ${mobileExpanded.admission ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded.admission && (
              <div className="bg-white py-1 px-3 space-y-1 text-xs border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('admission-process')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Admission Guidelines &amp; Process
                </button>
                <button
                  onClick={() => handleNavClick('admission-fees')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Fee Structure &amp; Calculator
                </button>
                <button
                  onClick={() => handleNavClick('admission-syllabus')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Syllabus &amp; Curriculum
                </button>
                <button
                  onClick={() => handleNavClick('admission-uniform')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Uniform Code
                </button>
                <button
                  onClick={() => handleNavClick('admission-tc')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-emerald-50 text-emerald-800 font-semibold"
                >
                  Transfer Certificate Verification
                </button>
                <button
                  onClick={() => handleNavClick('admission-apply')}
                  className="w-full text-left py-1.5 px-2 rounded bg-[#ef5a5a]/10 text-[#ef5a5a] font-bold"
                >
                  Online Admission Form
                </button>
              </div>
            )}
          </div>

          {/* Mobile Facilities Accordion */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleMobileAccordion('facilities')}
              className="w-full text-left py-2.5 px-3 bg-slate-50 text-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Building2 className="w-4 h-4 text-[#ef5a5a]" />
                <span>Facilities</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition ${mobileExpanded.facilities ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded.facilities && (
              <div className="bg-white py-1 px-3 space-y-1 text-xs border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('facilities-labs')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Science &amp; Smart Classrooms
                </button>
                <button
                  onClick={() => handleNavClick('facilities-computer')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Computer &amp; AI Tech Lab
                </button>
                <button
                  onClick={() => handleNavClick('facilities-library')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Central Knowledge Library
                </button>
                <button
                  onClick={() => handleNavClick('facilities-sports')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Sports Complex &amp; Grounds
                </button>
                <button
                  onClick={() => handleNavClick('facilities-ncc')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  NCC Wing (13 Tripura Bn)
                </button>
                <button
                  onClick={() => handleNavClick('facilities-medical')}
                  className="w-full text-left py-1.5 px-2 rounded hover:bg-[#38b6d8]/10 text-slate-700"
                >
                  Health Center &amp; Infirmary
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('notices')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'notices' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4 h-4 text-[#ef5a5a]" />
            <span>Notices &amp; Recruitment</span>
          </button>

          <button
            onClick={() => handleNavClick('achievements')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'achievements' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#f3b745]" />
            <span>Achievements &amp; Sports</span>
          </button>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'gallery' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Image className="w-4 h-4 text-[#38b6d8]" />
            <span>Photo &amp; Activity Gallery</span>
          </button>

          <button
            onClick={() => handleNavClick('staff')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'staff' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Faculty &amp; Staff Directory</span>
          </button>

          <button
            onClick={() => handleNavClick('alumni')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'alumni' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>Alumni Network</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left py-2 px-3 rounded-md flex items-center gap-2 ${
              currentPage === 'contact' ? 'bg-[#38b6d8]/15 text-[#38b6d8] font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-slate-500" />
            <span>Contact &amp; Campus Map</span>
          </button>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <button
              onClick={() => handleNavClick('admin-portal')}
              className="w-full py-2.5 bg-[#ef5a5a] hover:bg-[#df4747] text-white font-bold rounded-lg text-center shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Panel (Files &amp; Staff)</span>
            </button>
            <button
              onClick={() => handleNavClick('admission-apply')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-center text-xs"
            >
              Online Admission Form (2025-26)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
