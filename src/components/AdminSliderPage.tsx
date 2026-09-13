import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Upload,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  RotateCcw,
  Check,
  AlertCircle,
  Image as ImageIcon,
  ArrowLeft,
  Copy,
  ExternalLink,
  ShieldCheck,
  LogOut,
  FolderOpen,
  Info,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import {
  HeroSlideItem,
  getAllHeroSlides,
  saveCustomHeroSlides,
  resetHeroSlidesToDefault,
} from '../hero-slider';
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  setCustomAdminPasscode,
  getStoredAdminPasscode,
} from '../hero-slider/adminAuth';
import { optimizeSlideImage } from '../hero-slider/imageOptimizer';

interface AdminSliderPageProps {
  onBackToHome: () => void;
}

export const AdminSliderPage: React.FC<AdminSliderPageProps> = ({ onBackToHome }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [passcode, setPasscode] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Password change modal state
  const [isChangingPasscode, setIsChangingPasscode] = useState<boolean>(false);
  const [newPasscode, setNewPasscode] = useState<string>('');
  const [confirmPasscode, setConfirmPasscode] = useState<string>('');
  const [passcodeMsg, setPasscodeMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Slides management state
  const [slides, setSlides] = useState<HeroSlideItem[]>(() => getAllHeroSlides());
  const [selectedSlideId, setSelectedSlideId] = useState<string>(slides[0]?.id || 'slide-1');
  const [notification, setNotification] = useState<string | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // New slide creation form state
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newSlideTitle, setNewSlideTitle] = useState<string>('');
  const [newSlideCategory, setNewSlideCategory] = useState<string>('Campus Highlights');
  const [newSlideDesc, setNewSlideDesc] = useState<string>('');
  const [newSlideImageData, setNewSlideImageData] = useState<string | null>(null);

  const newFileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Ensure slides are kept in sync
  const reloadFromStorage = () => {
    const list = getAllHeroSlides();
    setSlides(list);
    if (!list.some((s) => s.id === selectedSlideId) && list.length > 0) {
      setSelectedSlideId(list[0].id);
    }
  };

  useEffect(() => {
    reloadFromStorage();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!passcode) {
      setAuthError('Please enter the administrative passcode.');
      return;
    }

    const success = loginAdmin(passcode, rememberMe);
    if (success) {
      setIsAuthenticated(true);
      setPasscode('');
      setNotification('Authenticated successfully. Welcome to ARPS Slider Studio.');
      setTimeout(() => setNotification(null), 3000);
    } else {
      setAuthError('Invalid passcode. Access denied. Viewers do not have permission.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setNotification(null);
  };

  const handleSavePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeMsg(null);
    if (newPasscode.length < 4) {
      setPasscodeMsg({ text: 'Passcode must be at least 4 characters long.', isError: true });
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setPasscodeMsg({ text: 'Passcodes do not match.', isError: true });
      return;
    }

    const ok = setCustomAdminPasscode(newPasscode);
    if (ok) {
      setPasscodeMsg({ text: 'Administrative passcode updated successfully!', isError: false });
      setTimeout(() => {
        setIsChangingPasscode(false);
        setPasscodeMsg(null);
        setNewPasscode('');
        setConfirmPasscode('');
      }, 1500);
    } else {
      setPasscodeMsg({ text: 'Failed to update passcode.', isError: true });
    }
  };

  // Replace image for an existing slide
  const handleReplaceImageFile = async (e: React.ChangeEvent<HTMLInputElement>, slideId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    try {
      const optimizedDataUrl = await optimizeSlideImage(file, 1920, 1080, 0.84);

      const updated = slides.map((slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            image: optimizedDataUrl,
            fallbackImage: optimizedDataUrl,
          };
        }
        return slide;
      });

      setSlides(updated);
      saveCustomHeroSlides(updated);
      setNotification(`Uploaded new photo for "${slides.find((s) => s.id === slideId)?.title || slideId}" successfully!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error(err);
      alert('Error optimizing image. Please choose another JPG or PNG file.');
    } finally {
      setIsProcessingUpload(false);
      if (replaceFileInputRef.current) {
        replaceFileInputRef.current.value = '';
      }
    }
  };

  // Handle uploading image for new slide draft
  const handleNewSlideImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    try {
      const optimizedDataUrl = await optimizeSlideImage(file, 1920, 1080, 0.84);
      setNewSlideImageData(optimizedDataUrl);
    } catch (err) {
      console.error(err);
      alert('Error processing image. Please choose another JPG or PNG file.');
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleAddNewSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideImageData) {
      alert('Please select or upload a photo for the new slide.');
      return;
    }
    if (!newSlideTitle.trim()) {
      alert('Please enter a headline/title for this slide.');
      return;
    }

    const newId = `custom-slide-${Date.now()}`;
    const newSlide: HeroSlideItem = {
      id: newId,
      title: newSlideTitle.trim(),
      category: newSlideCategory.trim() || 'Campus Highlights',
      description: newSlideDesc.trim() || 'Assam Rifles Public School Agartala',
      image: newSlideImageData,
      fallbackImage: newSlideImageData,
      active: true,
      order: slides.length + 1,
    };

    const updated = [...slides, newSlide];
    setSlides(updated);
    saveCustomHeroSlides(updated);
    setSelectedSlideId(newId);

    // Reset new slide form
    setNewSlideTitle('');
    setNewSlideCategory('Campus Highlights');
    setNewSlideDesc('');
    setNewSlideImageData(null);
    setIsAddingNew(false);

    setNotification(`New slide "${newSlide.title}" added to the homepage slider!`);
    setTimeout(() => setNotification(null), 4000);
  };

  // Update text field of selected slide
  const handleUpdateSlideField = (
    slideId: string,
    field: 'title' | 'category' | 'description',
    val: string
  ) => {
    const updated = slides.map((slide) => {
      if (slide.id === slideId) {
        return {
          ...slide,
          [field]: val,
        };
      }
      return slide;
    });
    setSlides(updated);
    saveCustomHeroSlides(updated);
  };

  // Toggle active / hidden status
  const handleToggleActive = (slideId: string) => {
    const updated = slides.map((slide) => {
      if (slide.id === slideId) {
        return {
          ...slide,
          active: slide.active === false ? true : false,
        };
      }
      return slide;
    });
    setSlides(updated);
    saveCustomHeroSlides(updated);
  };

  // Reorder slides
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === slides.length - 1) return;

    const newIdx = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...slides];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIdx, 0, moved);

    // Re-assign order numbers
    const updated = reordered.map((slide, i) => ({
      ...slide,
      order: i + 1,
    }));

    setSlides(updated);
    saveCustomHeroSlides(updated);
  };

  // Delete slide
  const handleDeleteSlide = (slideId: string) => {
    if (slides.length <= 1) {
      alert('You cannot delete the last remaining slide. The slider must have at least one photo.');
      return;
    }
    const target = slides.find((s) => s.id === slideId);
    if (!window.confirm(`Are you sure you want to remove slide "${target?.title || slideId}" from the hero banner?`)) {
      return;
    }

    const updated = slides.filter((s) => s.id !== slideId);
    setSlides(updated);
    saveCustomHeroSlides(updated);
    setSelectedSlideId(updated[0]?.id || '');
    setNotification('Slide removed from homepage slider.');
    setTimeout(() => setNotification(null), 3000);
  };

  // Factory reset
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'Reset all slider photos and captions back to factory defaults? This will restore the original 8 school slides.'
      )
    ) {
      resetHeroSlidesToDefault();
      const fresh = getAllHeroSlides();
      setSlides(fresh);
      setSelectedSlideId(fresh[0]?.id || 'slide-1');
      setNotification('Reset slider to default school photos and captions.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const copyAdminLink = () => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#/admin/slider`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // -------------------------------------------------------------
  // VIEW 1: UNAUTHENTICATED LOCK SCREEN (VIEWERS CANNOT PROCEED)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 p-6 sm:p-8 text-white relative">
          {/* Back button */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#38b6d8]" />
            <span>Return to School Portal</span>
          </button>

          {/* School Crest / Shield Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/60 mb-1.5">
              Restricted Staff Access
            </span>
            <h1 className="text-xl font-bold font-display uppercase tracking-wide text-white">
              ARPS Slider Management
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Authorised school personnel only. General visitors and students do not have access to manage or upload slider photos.
            </p>
          </div>

          {/* Error message */}
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Administrative Passcode</span>
                <span className="text-[10px] text-slate-500 font-normal">ARPS Staff Key</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter administrative passcode"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-400"
                />
                <span>Remember session on this computer</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Slider Manager</span>
            </button>
          </form>

          {/* Help box for the school administrator */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#38b6d8] shrink-0 mt-0.5" />
            <div>
              <p>
                <strong>Initial Setup Passcode:</strong> <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold">arps@2025</code>
              </p>
              <p className="text-slate-500 mt-0.5">
                You can change this passcode at any time after logging in.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN STUDIO
  // -------------------------------------------------------------
  const activeSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-display text-white">
                  ARPS Slider Image Studio
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase rounded-full">
                  Admin Authorized
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Assam Rifles Public School, Agartala &bull; Hero Banner Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct link copy button */}
            <button
              onClick={copyAdminLink}
              className="px-2.5 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy private URL to manage slider"
            >
              <Copy className="w-3.5 h-3.5 text-[#38b6d8]" />
              <span className="hidden md:inline">{copiedLink ? 'Link Copied!' : 'Copy Admin Link'}</span>
            </button>

            {/* Change passcode button */}
            <button
              onClick={() => setIsChangingPasscode(true)}
              className="px-2.5 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Update admin login passcode"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Change Passcode</span>
            </button>

            {/* Return to website */}
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 text-xs bg-[#183648] hover:bg-[#204961] border border-[#38b6d8]/40 text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#38b6d8]" />
              <span>Live Website</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 text-xs bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="End admin session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification toast */}
      {notification && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-inner">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Studio Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* Top Info Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ef5a5a]" />
              <span>Manage Slider Banners & Upload Photos</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Changes you make here are automatically published to the homepage slider. Viewers only see the finished banner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-3.5 py-2 bg-[#ef5a5a] hover:bg-[#df4747] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Slide</span>
            </button>

            <button
              onClick={handleResetToDefaults}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-slate-300 transition-all cursor-pointer"
              title="Restore original 8 school slides"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Factory Defaults</span>
            </button>
          </div>
        </div>

        {/* Add New Slide Form Modal / Card */}
        {isAddingNew && (
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-lg relative animate-fade-in">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">Add New Slide to Homepage Banner</h3>
              </div>
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddNewSlideSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Selection / Dropzone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Slide Photo (JPG, PNG, WebP) *
                  </label>
                  <div
                    onClick={() => newFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-amber-50/50 transition-colors h-48 flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {newSlideImageData ? (
                      <div className="relative w-full h-full">
                        <img
                          src={newSlideImageData}
                          alt="New preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg text-white text-xs font-semibold gap-1.5">
                          <Upload className="w-4 h-4" />
                          <span>Click to change photo</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-semibold text-slate-700">
                          {isProcessingUpload ? 'Optimizing photo...' : 'Click to choose image file'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Automatic high-res web compression applied
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={newFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleNewSlideImageSelect}
                  />
                </div>

                {/* Captions & Category */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Headline / Title *
                    </label>
                    <input
                      type="text"
                      value={newSlideTitle}
                      onChange={(e) => setNewSlideTitle(e.target.value)}
                      placeholder="e.g. Science Exhibition & Innovation Fair"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Badge Category
                    </label>
                    <input
                      type="text"
                      value={newSlideCategory}
                      onChange={(e) => setNewSlideCategory(e.target.value)}
                      placeholder="e.g. Campus Life, Sports, Academic Wing"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subtitle / Description
                    </label>
                    <textarea
                      rows={2}
                      value={newSlideDesc}
                      onChange={(e) => setNewSlideDesc(e.target.value)}
                      placeholder="Brief note about the event or campus facility"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newSlideImageData || !newSlideTitle.trim() || isProcessingUpload}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Publish to Slider</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 2-Column Manager: Slides List + Active Slide Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Slide List & Sorting */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Current Slider Photos</h3>
                <p className="text-[11px] text-slate-500">
                  {slides.filter((s) => s.active !== false).length} Active of {slides.length} Total
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">
                Drag or order
              </span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {slides.map((s, idx) => {
                const isSel = s.id === selectedSlideId;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSlideId(s.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSel
                        ? 'bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="w-16 h-11 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (s.fallbackImage && e.currentTarget.src !== s.fallbackImage) {
                            e.currentTarget.src = s.fallbackImage;
                          }
                        }}
                      />
                      {s.active === false && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[9px] font-bold">
                          Hidden
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            isSel ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <span className="text-xs font-bold truncate">{s.title}</span>
                      </div>
                      <span
                        className={`text-[11px] block truncate mt-0.5 ${
                          isSel ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {s.category}
                      </span>
                    </div>

                    {/* Order buttons */}
                    <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleMoveSlide(idx, 'up')}
                        disabled={idx === 0}
                        className={`p-1 rounded transition ${
                          isSel
                            ? 'hover:bg-slate-800 text-slate-300 disabled:opacity-20'
                            : 'hover:bg-slate-200 text-slate-500 disabled:opacity-20'
                        }`}
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveSlide(idx, 'down')}
                        disabled={idx === slides.length - 1}
                        className={`p-1 rounded transition ${
                          isSel
                            ? 'hover:bg-slate-800 text-slate-300 disabled:opacity-20'
                            : 'hover:bg-slate-200 text-slate-500 disabled:opacity-20'
                        }`}
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Slide Editor for Active Slide */}
          <div className="lg:col-span-7 space-y-6">
            {activeSlide ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      Editing Slide #{slides.findIndex((s) => s.id === activeSlide.id) + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 truncate max-w-sm">
                      {activeSlide.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle Active/Hidden */}
                    <button
                      onClick={() => handleToggleActive(activeSlide.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                        activeSlide.active !== false
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                      }`}
                      title="Hide or show on public slider"
                    >
                      {activeSlide.active !== false ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Visible Live</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteSlide(activeSlide.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                      title="Delete this slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Big Preview with Replace Button */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (activeSlide.fallbackImage && e.currentTarget.src !== activeSlide.fallbackImage) {
                        e.currentTarget.src = activeSlide.fallbackImage;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded w-max mb-1">
                      {activeSlide.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold">{activeSlide.title}</h4>
                    {activeSlide.description && (
                      <p className="text-xs text-slate-300 line-clamp-1">{activeSlide.description}</p>
                    )}
                  </div>

                  {/* Upload Overlay Button */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => replaceFileInputRef.current?.click()}
                      disabled={isProcessingUpload}
                      className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-950 text-white text-xs font-semibold backdrop-blur-sm border border-white/30 flex items-center gap-1.5 shadow-lg transition hover:scale-105 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isProcessingUpload ? 'Optimizing...' : 'Upload New Photo'}</span>
                    </button>
                    <input
                      ref={replaceFileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleReplaceImageFile(e, activeSlide.id)}
                    />
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Slide Title / Headline
                    </label>
                    <input
                      type="text"
                      value={activeSlide.title}
                      onChange={(e) => handleUpdateSlideField(activeSlide.id, 'title', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category Tag / Badge
                      </label>
                      <input
                        type="text"
                        value={activeSlide.category || ''}
                        onChange={(e) => handleUpdateSlideField(activeSlide.id, 'category', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Slide Identifier
                      </label>
                      <input
                        type="text"
                        value={activeSlide.id}
                        disabled
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 text-slate-500 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Description / Caption
                    </label>
                    <textarea
                      rows={2}
                      value={activeSlide.description || ''}
                      onChange={(e) =>
                        handleUpdateSlideField(activeSlide.id, 'description', e.target.value)
                      }
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Server Hosting Guide (Plesk/cPanel/FTP) */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <FolderOpen className="w-4 h-4 text-[#38b6d8]" />
                    <span>Permanent Server Hosting (Plesk / IIS / cPanel)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Photos uploaded directly in this browser are stored instantly in client storage. If you want permanent files on your Plesk Windows server, you can also drop images into the hosting folder:
                  </p>
                  <code className="block p-2 bg-slate-900 text-amber-300 rounded font-mono text-[11px]">
                    httpdocs/hero-slider/{activeSlide.id}.jpg
                  </code>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      {/* Change Passcode Modal */}
      {isChangingPasscode && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-1">Change Administrative Passcode</h3>
            <p className="text-xs text-slate-500 mb-4">
              Set a private password known only to school administrators.
            </p>

            {passcodeMsg && (
              <div
                className={`p-2.5 rounded-lg text-xs mb-4 ${
                  passcodeMsg.isError
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {passcodeMsg.text}
              </div>
            )}

            <form onSubmit={handleSavePasscode} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Passcode (min. 4 characters)
                </label>
                <input
                  type="password"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Enter new passcode"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm New Passcode
                </label>
                <input
                  type="password"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  placeholder="Re-enter new passcode"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsChangingPasscode(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition shadow"
                >
                  Update Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
