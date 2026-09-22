import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { LeadershipMessages } from './components/LeadershipMessages';
import { AdmissionSection } from './components/AdmissionSection';
import { FeeStructureCalculator } from './components/FeeStructureCalculator';
import { FacilitiesSection } from './components/FacilitiesSection';
import { FacultyDirectory } from './components/FacultyDirectory';
import { AchievementsSports } from './components/AchievementsSports';
import { NoticeBoard } from './components/NoticeBoard';
import { LatestNewsEvents } from './components/LatestNewsEvents';
import { GallerySection } from './components/GallerySection';
import { AlumniSection } from './components/AlumniSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminSliderPage } from './components/AdminSliderPage';
import { AdminPanel } from './components/AdminPanel';

// Modals
import { TcVerificationModal } from './components/TcVerificationModal';
import { MandatoryDisclosureModal } from './components/MandatoryDisclosureModal';
import { OnlineAdmissionModal } from './components/OnlineAdmissionModal';
import { MediaFileManagerModal } from './components/MediaFileManagerModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.includes('admin')
      ) {
        return 'admin-portal';
      }
      const search = window.location.search.toLowerCase();
      if (search.includes('admin')) {
        return 'admin-portal';
      }
    }
    return 'home';
  });

  const [isTcModalOpen, setIsTcModalOpen] = useState<boolean>(false);
  const [isDisclosureModalOpen, setIsDisclosureModalOpen] = useState<boolean>(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState<boolean>(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      return hash.includes('media-manager') || hash.includes('#media') || hash.includes('#files');
    }
    return false;
  });

  // Sync hash routing for admin page and media manager
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.includes('admin')
      ) {
        setCurrentPage('admin-portal');
      } else if (hash.includes('media-manager') || hash.includes('#media') || hash.includes('#files')) {
        setIsMediaManagerOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (pageOrSectionId: string) => {
    // Admin Portal direct link handling
    if (pageOrSectionId === 'admin-portal' || pageOrSectionId === 'admin' || pageOrSectionId === 'admin-slider') {
      setCurrentPage('admin-portal');
      window.location.hash = '#/admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pageOrSectionId === 'home') {
      setCurrentPage('home');
      if (window.location.hash.includes('admin')) {
        try {
          history.replaceState(null, '', window.location.pathname);
        } catch {
          window.location.hash = '';
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Check special modal triggers
    if (pageOrSectionId === 'admission-apply' || pageOrSectionId === 'apply') {
      setIsAdmissionModalOpen(true);
      return;
    }
    if (pageOrSectionId === 'admission-tc' || pageOrSectionId === 'tc') {
      setIsTcModalOpen(true);
      return;
    }
    if (pageOrSectionId === 'about-disclosure' || pageOrSectionId === 'disclosure') {
      setIsDisclosureModalOpen(true);
      return;
    }

    if (pageOrSectionId === 'about-leadership') {
      if (currentPage === 'home') {
        const leadershipEl = document.getElementById('leadership');
        if (leadershipEl) {
          leadershipEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      setCurrentPage('about-leadership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pageOrSectionId === 'about-vision' && currentPage === 'home') {
      const visionEl = document.getElementById('vision');
      if (visionEl) {
        visionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    setCurrentPage(pageOrSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = (page: string) => {
    if (page === 'admission-fees') return 'Fee Structure & Calculator';
    if (page.startsWith('admission')) return 'Admissions 2025-26';
    if (page.startsWith('facilities')) return 'Campus & Facilities';
    if (page.startsWith('notices')) return 'Notices & Announcements';
    if (page.startsWith('achievements') || page === 'sports') return 'Achievements & Laurels';
    if (page === 'gallery') return 'Photo & Activity Gallery';
    if (page === 'staff' || page === 'faculty') return 'Faculty & Staff Directory';
    if (page === 'alumni') return 'Alumni Network';
    if (page === 'contact') return 'Contact & Location';
    if (page === 'about-leadership') return 'Leadership Messages';
    if (page.startsWith('about')) return 'About Our School & Heritage';
    return 'School Portal';
  };

  // Dedicated Admin Panel View (Credentials: userid admin / password admin)
  if (currentPage === 'admin-portal' || currentPage === 'admin' || currentPage === 'admin-slider') {
    return (
      <AdminPanel
        onBackToHome={() => handleNavigate('home')}
        onNavigateToStaff={() => handleNavigate('staff')}
        onNavigateToGallery={() => handleNavigate('gallery')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-[#ef5a5a] selection:text-white">
      {/* 6. Menu bar and header will not change */}
      <TopBar
        onOpenTcModal={() => setIsTcModalOpen(true)}
        onOpenDisclosureModal={() => setIsDisclosureModalOpen(true)}
        onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
        onNavigate={handleNavigate}
      />

      <Header onNavigate={handleNavigate} />

      <Navbar
        currentPage={currentPage}
        activeSection={currentPage}
        onNavigate={handleNavigate}
        onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
        onOpenTcModal={() => setIsTcModalOpen(true)}
        onOpenDisclosureModal={() => setIsDisclosureModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* HOMEPAGE VIEW:
            Only contains:
            1. Photo slider
            2. Information about our school
            3. Chairman message
            4. Principal message
        */}
        {currentPage === 'home' && (
          <>
            {/* 1. Photo slider */}
            <HeroSlider
              onNavigate={handleNavigate}
              onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            />

            {/* 2. Information about our school */}
            <AboutSection />

            {/* 3. Chairman message & 4. Principal message */}
            <LeadershipMessages />
          </>
        )}

        {/* INDIVIDUAL PAGES VIEW: Shown only when user navigates to an individual page */}
        {currentPage !== 'home' && (
          <div>
            {/* Page Breadcrumb / Navigation Bar */}
            <div className="bg-[#183648] text-white py-5 px-4 sm:px-6 border-b-4 border-[#38b6d8]">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wide">
                    {getPageTitle(currentPage)}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                    <button
                      onClick={() => handleNavigate('home')}
                      className="hover:text-[#38b6d8] transition underline flex items-center gap-1"
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Home</span>
                    </button>
                    <span>/</span>
                    <span className="text-[#38b6d8] font-semibold">{getPageTitle(currentPage)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigate('home')}
                  className="text-xs px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition flex items-center gap-1.5 font-medium border border-white/20 shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#38b6d8]" />
                  <span>Back to Homepage</span>
                </button>
              </div>
            </div>

            {/* Render selected individual page content */}
            {(currentPage === 'about-vision' || currentPage === 'about-rules' || currentPage === 'about') && (
              <AboutSection />
            )}

            {currentPage === 'about-leadership' && (
              <LeadershipMessages />
            )}

            {(currentPage === 'admission-process' ||
              currentPage === 'admission' ||
              currentPage === 'admission-rules' ||
              currentPage === 'admission-syllabus' ||
              currentPage === 'admission-uniform') && (
              <AdmissionSection
                onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
                onOpenTcModal={() => setIsTcModalOpen(true)}
              />
            )}

            {currentPage === 'admission-fees' && (
              <FeeStructureCalculator
                onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
              />
            )}

            {currentPage.startsWith('facilities') && (
              <FacilitiesSection />
            )}

            {(currentPage === 'notices' || currentPage === 'notices-jobs') && (
              <>
                <NoticeBoard
                  onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
                />
                <LatestNewsEvents
                  onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
                  onNavigateToGallery={() => handleNavigate('gallery')}
                />
              </>
            )}

            {(currentPage === 'achievements' || currentPage === 'sports') && (
              <AchievementsSports />
            )}

            {currentPage === 'gallery' && (
              <GallerySection />
            )}

            {(currentPage === 'staff' || currentPage === 'faculty') && (
              <FacultyDirectory />
            )}

            {currentPage === 'alumni' && (
              <AlumniSection />
            )}

            {currentPage === 'contact' && (
              <ContactSection />
            )}
          </div>
        )}
      </main>

      {/* 5. Official Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTcModal={() => setIsTcModalOpen(true)}
        onOpenMandatoryDisclosure={() => setIsDisclosureModalOpen(true)}
        onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
        onOpenMediaManager={() => setIsMediaManagerOpen(true)}
      />

      {/* Interactive Modals */}
      <TcVerificationModal
        isOpen={isTcModalOpen}
        onClose={() => setIsTcModalOpen(false)}
      />

      <MandatoryDisclosureModal
        isOpen={isDisclosureModalOpen}
        onClose={() => setIsDisclosureModalOpen(false)}
      />

      <OnlineAdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
      />

      <MediaFileManagerModal
        isOpen={isMediaManagerOpen}
        onClose={() => setIsMediaManagerOpen(false)}
      />
    </div>
  );
}
