import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  Users,
  Image as ImageIcon,
  Film,
  Layers,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  Upload,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  GraduationCap,
  Briefcase,
  BookOpen,
  Sparkles,
  RefreshCw,
  FolderOpen,
  Play,
} from 'lucide-react';
import { FacultyMember } from '../types';
import {
  getLiveStaffList,
  saveStaffMember,
  updateStaffMember,
  deleteStaffMember,
  resetStaffToDefaults,
} from '../data/staffManager';
import {
  getLivePhotos,
  saveLivePhoto,
  updateLivePhoto,
  deleteLivePhoto,
  getLiveVideos,
  saveLiveVideo,
  updateLiveVideo,
  deleteLiveVideo,
} from '../media/liveMediaStore';
import { PhotoItem, VideoItem, PhotoCategory, VideoCategory } from '../media/mediaTypes';
import {
  isAdminAuthenticated,
  loginAdminWithCredentials,
  logoutAdmin,
} from '../hero-slider/adminAuth';
import {
  HeroSlideItem,
  getAllHeroSlides,
  saveCustomHeroSlides,
  resetHeroSlidesToDefault,
} from '../hero-slider';

interface AdminPanelProps {
  onBackToHome: () => void;
  onNavigateToStaff?: () => void;
  onNavigateToGallery?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToHome,
  onNavigateToStaff,
  onNavigateToGallery,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [userIdInput, setUserIdInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'staff' | 'media' | 'slides'>('staff');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ------------------ STAFF MANAGEMENT STATE ------------------
  const [staffList, setStaffList] = useState<FacultyMember[]>(() => getLiveStaffList());
  const [staffSearch, setStaffSearch] = useState<string>('');
  const [staffCategoryFilter, setStaffCategoryFilter] = useState<string>('All');

  // Modal / Form state for Staff
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: '',
    designation: '',
    dateOfJoining: '',
    qualification: '',
    subjectTaught: '',
    category: 'Teaching',
    image: '',
  });

  // ------------------ MEDIA MANAGEMENT STATE ------------------
  const [mediaSubTab, setMediaSubTab] = useState<'photos' | 'videos'>('photos');
  const [photosList, setPhotosList] = useState<PhotoItem[]>(() => getLivePhotos());
  const [videosList, setVideosList] = useState<VideoItem[]>(() => getLiveVideos());

  // Modal / Form state for Photos
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'Campus',
    imageUrl: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Modal / Form state for Videos
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'Events',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '5:00',
    description: '',
  });

  // ------------------ HERO SLIDES STATE ------------------
  const [slides, setSlides] = useState<HeroSlideItem[]>(() => getAllHeroSlides());

  // Handle Login Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const success = loginAdminWithCredentials(userIdInput, passwordInput, rememberMe);
    if (success) {
      setIsAuthenticated(true);
      showToast('Admin login successful! Welcome to ARPS Portal.');
    } else {
      setAuthError('Invalid credentials. Please enter userid: admin and password: admin');
    }
  };

  const handleFillDemoCredentials = () => {
    setUserIdInput('admin');
    setPasswordInput('admin');
    setAuthError(null);
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setUserIdInput('');
    setPasswordInput('');
    showToast('You have been logged out of the Admin Panel.');
  };

  // ------------------ STAFF CRUD ACTIONS ------------------
  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffForm({
      name: '',
      designation: '',
      dateOfJoining: new Date().toISOString().split('T')[0],
      qualification: '',
      subjectTaught: '',
      category: 'Teaching',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });
    setIsStaffModalOpen(true);
  };

  const handleOpenEditStaff = (member: FacultyMember) => {
    setEditingStaffId(member.id);
    setStaffForm({
      name: member.name,
      designation: member.designation || member.role || '',
      dateOfJoining: member.dateOfJoining || '2020-01-01',
      qualification: member.qualification,
      subjectTaught: member.subjectTaught || member.department || '',
      category: member.category,
      image: member.image,
    });
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.designation.trim()) {
      alert('Please provide at least Name and Designation.');
      return;
    }

    if (editingStaffId) {
      // Update existing
      const updated = updateStaffMember({
        id: editingStaffId,
        name: staffForm.name.trim(),
        role: staffForm.designation.trim(),
        designation: staffForm.designation.trim(),
        dateOfJoining: staffForm.dateOfJoining,
        qualification: staffForm.qualification.trim(),
        subjectTaught: staffForm.subjectTaught.trim(),
        department: staffForm.subjectTaught.trim(),
        category: staffForm.category,
        image: staffForm.image.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      });
      setStaffList(updated);
      showToast('Staff member updated successfully! Effect is live on website.');
    } else {
      // Create new
      const updated = saveStaffMember({
        name: staffForm.name.trim(),
        role: staffForm.designation.trim(),
        designation: staffForm.designation.trim(),
        dateOfJoining: staffForm.dateOfJoining,
        qualification: staffForm.qualification.trim(),
        subjectTaught: staffForm.subjectTaught.trim(),
        department: staffForm.subjectTaught.trim(),
        category: staffForm.category,
        image: staffForm.image.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      });
      setStaffList(updated);
      showToast('New staff member added! Immediately visible in Faculty Directory.');
    }
    setIsStaffModalOpen(false);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the school staff directory?`)) {
      const updated = deleteStaffMember(id);
      setStaffList(updated);
      showToast(`Removed "${name}" from live website directory.`);
    }
  };

  const handleResetStaff = () => {
    if (window.confirm('Reset the staff directory to official default members?')) {
      const updated = resetStaffToDefaults();
      setStaffList(updated);
      showToast('Staff directory reset to default records.');
    }
  };

  // Staff photo file upload
  const handleStaffPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setStaffForm((prev) => ({ ...prev, image: ev.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ------------------ MEDIA CRUD ACTIONS ------------------
  // Photos
  const handleOpenAddPhoto = () => {
    setEditingPhotoId(null);
    setPhotoForm({
      title: '',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsPhotoModalOpen(true);
  };

  const handleOpenEditPhoto = (photo: PhotoItem) => {
    setEditingPhotoId(photo.id);
    setPhotoForm({
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      description: photo.description,
      date: photo.date || new Date().toISOString().split('T')[0],
    });
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.title.trim() || !photoForm.imageUrl.trim()) {
      alert('Please provide at least Title and Image URL.');
      return;
    }

    if (editingPhotoId) {
      const updated = updateLivePhoto({
        id: editingPhotoId,
        title: photoForm.title.trim(),
        category: photoForm.category as PhotoCategory,
        imageUrl: photoForm.imageUrl.trim(),
        description: photoForm.description.trim(),
        date: photoForm.date,
      });
      setPhotosList(updated);
      showToast('Photo updated! Changes are live in Photo Gallery.');
    } else {
      const updated = saveLivePhoto({
        title: photoForm.title.trim(),
        category: photoForm.category as PhotoCategory,
        imageUrl: photoForm.imageUrl.trim(),
        description: photoForm.description.trim(),
        date: photoForm.date,
      });
      setPhotosList(updated);
      showToast('New photo added to live gallery!');
    }
    setIsPhotoModalOpen(false);
  };

  const handleDeletePhoto = (id: string, title: string) => {
    if (window.confirm(`Delete photo "${title}" from the website gallery?`)) {
      const updated = deleteLivePhoto(id);
      setPhotosList(updated);
      showToast('Photo deleted from live website.');
    }
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('File size exceeds 3MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPhotoForm((prev) => ({ ...prev, imageUrl: ev.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Videos
  const handleOpenAddVideo = () => {
    setEditingVideoId(null);
    setVideoForm({
      title: '',
      category: 'Events',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      duration: '4:30',
      description: '',
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (video: VideoItem) => {
    setEditingVideoId(video.id);
    setVideoForm({
      title: video.title,
      category: video.category,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration || '4:00',
      description: video.description,
    });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title.trim() || !videoForm.videoUrl.trim()) {
      alert('Please provide Title and Video Embed URL.');
      return;
    }

    if (editingVideoId) {
      const updated = updateLiveVideo({
        id: editingVideoId,
        title: videoForm.title.trim(),
        category: videoForm.category as VideoCategory,
        videoUrl: videoForm.videoUrl.trim(),
        thumbnailUrl: videoForm.thumbnailUrl.trim(),
        duration: videoForm.duration.trim(),
        date: new Date().toISOString().split('T')[0],
        description: videoForm.description.trim(),
        type: 'youtube',
      });
      setVideosList(updated);
      showToast('Video updated! Live website refreshed.');
    } else {
      const updated = saveLiveVideo({
        title: videoForm.title.trim(),
        category: videoForm.category as VideoCategory,
        videoUrl: videoForm.videoUrl.trim(),
        thumbnailUrl: videoForm.thumbnailUrl.trim(),
        duration: videoForm.duration.trim(),
        date: new Date().toISOString().split('T')[0],
        description: videoForm.description.trim(),
        type: 'youtube',
      });
      setVideosList(updated);
      showToast('New video added to live website!');
    }
    setIsVideoModalOpen(false);
  };

  const handleDeleteVideo = (id: string, title: string) => {
    if (window.confirm(`Delete video "${title}"?`)) {
      const updated = deleteLiveVideo(id);
      setVideosList(updated);
      showToast('Video deleted from live website.');
    }
  };

  // ------------------ HERO SLIDES ACTIONS ------------------
  const handleToggleSlideActive = (id: string) => {
    const updated = slides.map((s) => (s.id === id ? { ...s, active: !s.active } : s));
    setSlides(updated);
    saveCustomHeroSlides(updated);
    showToast('Slide visibility updated on live homepage!');
  };

  const handleDeleteSlide = (id: string) => {
    if (slides.length <= 1) {
      alert('You must have at least one hero slide.');
      return;
    }
    if (window.confirm('Delete this hero slide from the homepage?')) {
      const updated = slides.filter((s) => s.id !== id);
      setSlides(updated);
      saveCustomHeroSlides(updated);
      showToast('Slide deleted from live homepage.');
    }
  };

  const handleResetSlides = () => {
    if (window.confirm('Reset homepage hero slider to official defaults?')) {
      resetHeroSlidesToDefault();
      setSlides(getAllHeroSlides());
      showToast('Hero slides reset to default.');
    }
  };

  // ------------------ LOGIN SCREEN (WHEN NOT AUTHENTICATED) ------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-[#ef5a5a] selection:text-white">
        {/* Top Header */}
        <header className="bg-slate-950/80 border-b border-slate-800 px-4 sm:px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border-2 border-[#38b6d8] shadow-md">
                <img src="/arps-logo.png" alt="ARPS Crest" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#38b6d8] uppercase tracking-wider">
                  Assam Rifles Public School, Agartala
                </div>
                <div className="text-sm font-extrabold text-white">
                  Administration &amp; Content Management Portal
                </div>
              </div>
            </div>
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#38b6d8]" />
              <span>Back to Website</span>
            </button>
          </div>
        </header>

        {/* Login Form Center Box */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ef5a5a] to-[#38b6d8] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white font-crest">
                Admin Panel Login
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Authorized Personnel Portal for Live Staff &amp; Media Management
              </p>
            </div>

            {/* MANDATORY CREDENTIALS CALLOUT BOX */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 mb-6 text-xs text-slate-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Admin Credentials:</span>
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                  System Default
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-slate-950/70 p-2.5 rounded-lg font-mono text-xs border border-slate-800">
                <div>
                  <span className="text-slate-400">userid: </span>
                  <strong className="text-white">admin</strong>
                </div>
                <div>
                  <span className="text-slate-400">password: </span>
                  <strong className="text-white">admin</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={handleFillDemoCredentials}
                className="w-full mt-2.5 py-1.5 text-[11px] font-semibold text-[#38b6d8] hover:text-white bg-[#38b6d8]/10 hover:bg-[#38b6d8]/25 rounded border border-[#38b6d8]/30 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Click to Auto-Fill Credentials (admin / admin)</span>
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  User ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={userIdInput}
                    onChange={(e) => setUserIdInput(e.target.value)}
                    placeholder="Enter userid (admin)"
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38b6d8] focus:ring-1 focus:ring-[#38b6d8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (admin)"
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38b6d8] focus:ring-1 focus:ring-[#38b6d8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-[#ef5a5a] focus:ring-0"
                  />
                  <span>Keep me logged in</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ef5a5a] hover:bg-[#df4747] text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Admin Panel</span>
              </button>
            </form>
          </div>
        </main>

        <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-800">
          Assam Rifles Public School, Agartala • Secure System Administrator Portal
        </footer>
      </div>
    );
  }

  // ------------------ AUTHENTICATED ADMIN PORTAL VIEW ------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#183648] text-white sticky top-0 z-40 shadow-md border-b-4 border-[#38b6d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border-2 border-[#38b6d8] shadow-sm">
              <img src="/arps-logo.png" alt="ARPS Crest" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold font-crest">ARPS Admin Panel</span>
                <span className="text-[10px] font-bold bg-[#ef5a5a] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live Control
                </span>
              </div>
              <div className="text-[11px] text-slate-300">
                Logged in as <strong className="text-amber-300">admin</strong> (Full Website Control)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#38b6d8]" />
              <span>View Public Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg bg-[#ef5a5a] hover:bg-[#df4747] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('staff')}
            className={`py-3.5 px-5 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'staff'
                ? 'border-[#ef5a5a] text-[#ef5a5a] bg-red-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Staff &amp; Faculty Management ({staffList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`py-3.5 px-5 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'media'
                ? 'border-[#38b6d8] text-[#38b6d8] bg-sky-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Files &amp; Media Management ({photosList.length + videosList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`py-3.5 px-5 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'slides'
                ? 'border-amber-500 text-amber-600 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Homepage Hero Slides ({slides.length})</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ==================== TAB 1: STAFF & FACULTY ==================== */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-crest">
                  Staff &amp; Faculty Directory Control
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Insert, update, and delete staff details across all categories. All modifications take effect immediately on the live website.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleResetStaff}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  title="Reset staff list to default database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  onClick={handleOpenAddStaff}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#ef5a5a] hover:bg-[#df4747] rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer ml-auto sm:ml-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert New Staff</span>
                </button>
              </div>
            </div>

            {/* Search and Category Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search staff by name, designation, subject taught, or qualification..."
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#38b6d8]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={staffCategoryFilter}
                  onChange={(e) => setStaffCategoryFilter(e.target.value)}
                  className="text-xs py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#38b6d8]"
                >
                  <option value="All">All Categories</option>
                  <option value="Teaching">Teaching Faculty</option>
                  <option value="Administration">Administration</option>
                  <option value="PGT">PGT</option>
                  <option value="TGT">TGT</option>
                  <option value="PRT">PRT</option>
                  <option value="Activity & Sports">Activity &amp; Sports</option>
                </select>
              </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {staffList
                .filter((member) => {
                  const matchesCat =
                    staffCategoryFilter === 'All'
                      ? true
                      : staffCategoryFilter === 'Teaching'
                      ? member.category === 'Teaching' || member.category === 'PGT' || member.category === 'TGT' || member.category === 'PRT'
                      : member.category.toLowerCase().includes(staffCategoryFilter.toLowerCase());

                  if (!staffSearch.trim()) return matchesCat;
                  const q = staffSearch.toLowerCase();
                  return (
                    matchesCat &&
                    (member.name.toLowerCase().includes(q) ||
                      (member.designation || member.role || '').toLowerCase().includes(q) ||
                      (member.subjectTaught || member.subject || member.department || '').toLowerCase().includes(q) ||
                      member.qualification.toLowerCase().includes(q))
                  );
                })
                .map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Photo + Badges */}
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/80 bg-slate-100 shrink-0 shadow-sm">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {member.category}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">
                            {member.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#ef5a5a] truncate">
                            {member.designation || member.role}
                          </p>
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate">
                            <strong>Subject: </strong>
                            {member.subjectTaught || member.department || 'General'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            <strong>Qual: </strong>
                            {member.qualification}
                          </span>
                        </div>
                        {member.dateOfJoining && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>
                              <strong>Joined: </strong>
                              {member.dateOfJoining}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditStaff(member)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(member.id, member.name)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: FILES & MEDIA ==================== */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-crest">
                  Live Media &amp; Files Control
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full control over gallery photos, activity videos, campus documentation, and banners. Changes immediately take effect on the live website.
                </p>
              </div>

              {/* Sub-tab Switcher & Add Button */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setMediaSubTab('photos')}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                      mediaSubTab === 'photos'
                        ? 'bg-slate-900 text-amber-300 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photos ({photosList.length})</span>
                  </button>
                  <button
                    onClick={() => setMediaSubTab('videos')}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                      mediaSubTab === 'videos'
                        ? 'bg-slate-900 text-amber-300 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Videos ({videosList.length})</span>
                  </button>
                </div>

                {mediaSubTab === 'photos' ? (
                  <button
                    onClick={handleOpenAddPhoto}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#38b6d8] hover:bg-[#2ba5c7] rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Photo</span>
                  </button>
                ) : (
                  <button
                    onClick={handleOpenAddVideo}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#ef5a5a] hover:bg-[#df4747] rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* Photos Sub-tab Content */}
            {mediaSubTab === 'photos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {photosList.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-bold bg-slate-950/80 text-amber-300 px-2 py-0.5 rounded uppercase">
                          {photo.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{photo.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{photo.description}</p>
                        {photo.date && (
                          <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{photo.date}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditPhoto(photo)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePhoto(photo.id, photo.title)}
                        className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 rounded-md transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Videos Sub-tab Content */}
            {mediaSubTab === 'videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videosList.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-90"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#ef5a5a] text-white flex items-center justify-center shadow-md">
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          </div>
                        </div>
                        <span className="absolute top-2 left-2 text-[10px] font-bold bg-black/70 text-amber-300 px-2 py-0.5 rounded uppercase">
                          {video.category}
                        </span>
                        {video.duration && (
                          <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 text-white px-1.5 py-0.5 rounded">
                            {video.duration}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{video.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{video.description}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditVideo(video)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(video.id, video.title)}
                        className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 rounded-md transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: HERO SLIDES ==================== */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-crest">
                  Homepage Carousel Slides
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Re-order, toggle active visibility, or manage hero slides shown on the public front page.
                </p>
              </div>
              <button
                onClick={handleResetSlides}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Slides to Default</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`bg-white rounded-2xl border ${slide.active ? 'border-slate-200' : 'border-slate-300 opacity-60'} overflow-hidden shadow-2xs flex flex-col justify-between`}
                >
                  <div>
                    <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-[#38b6d8] text-white rounded">
                        Slide #{index + 1}
                      </span>
                      <span className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded ${slide.active ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-white'}`}>
                        {slide.active ? 'Active on Live' : 'Hidden'}
                      </span>
                    </div>

                    <div className="p-4">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                        {slide.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{slide.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{slide.description}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleSlideActive(slide.id)}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                    >
                      {slide.active ? 'Hide from Live' : 'Show on Live'}
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODALS ==================== */}

      {/* 1. Staff Insert/Update Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ef5a5a]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-crest">
                  {editingStaffId ? 'Update Staff Details' : 'Insert New Staff Member'}
                </h3>
              </div>
              <button
                onClick={() => setIsStaffModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-4 text-xs">
              {/* Photo Preview & Upload */}
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-200 shrink-0">
                  <img
                    src={staffForm.image}
                    alt="Staff preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block font-bold text-slate-700">Staff Image (URL or Upload)</label>
                  <input
                    type="url"
                    value={staffForm.image}
                    onChange={(e) => setStaffForm({ ...staffForm, image: e.target.value })}
                    placeholder="https://... or choose photo below"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold cursor-pointer text-[11px] transition">
                      <Upload className="w-3 h-3 text-slate-600" />
                      <span>Upload Photo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleStaffPhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-slate-500">Max 2MB (JPG/PNG)</span>
                  </div>
                </div>
              </div>

              {/* Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Bhattacharya"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#38b6d8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.designation}
                    onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })}
                    placeholder="e.g. PGT Physics & Science HOD"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#38b6d8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Date of Joining & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Joining</label>
                  <input
                    type="date"
                    value={staffForm.dateOfJoining}
                    onChange={(e) => setStaffForm({ ...staffForm, dateOfJoining: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#38b6d8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={staffForm.category}
                    onChange={(e) => setStaffForm({ ...staffForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#38b6d8] focus:outline-none"
                  >
                    <option value="PGT">PGT (Post Graduate Teacher)</option>
                    <option value="TGT">TGT (Trained Graduate Teacher)</option>
                    <option value="PRT">PRT (Primary Teacher)</option>
                    <option value="Teaching">General Teaching</option>
                    <option value="Administration">Office Administration</option>
                    <option value="Activity & Sports">Activity &amp; Sports / NCC</option>
                    <option value="Support Staff">Support Staff</option>
                  </select>
                </div>
              </div>

              {/* Qualification & Subject Taught */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={staffForm.qualification}
                    onChange={(e) => setStaffForm({ ...staffForm, qualification: e.target.value })}
                    placeholder="e.g. M.Sc (Physics), Ph.D, B.Ed"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#38b6d8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject Taught</label>
                  <input
                    type="text"
                    value={staffForm.subjectTaught}
                    onChange={(e) => setStaffForm({ ...staffForm, subjectTaught: e.target.value })}
                    placeholder="e.g. Physics (Class XI & XII)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#38b6d8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#ef5a5a] hover:bg-[#df4747] rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingStaffId ? 'Save Changes' : 'Insert Staff Member'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#38b6d8]" />
                <h3 className="text-base font-bold text-slate-900 font-crest">
                  {editingPhotoId ? 'Update Photo' : 'Add New Photo to Live Gallery'}
                </h3>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4 text-xs">
              <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative">
                <img
                  src={photoForm.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL or Upload</label>
                <input
                  type="url"
                  required
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
                <div className="mt-1.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold cursor-pointer text-[11px] border border-slate-200">
                    <Upload className="w-3 h-3" />
                    <span>Upload Local Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g. Annual Sports Meet 2025"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Campus">Campus</option>
                    <option value="Sports">Sports</option>
                    <option value="Laboratories">Laboratories</option>
                    <option value="Events">Events</option>
                    <option value="Activities">Activities</option>
                    <option value="Ceremonial">Ceremonial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={photoForm.date}
                    onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  placeholder="Brief description of the photograph..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#38b6d8] hover:bg-[#2ba5c7] rounded-xl shadow-xs transition cursor-pointer"
                >
                  {editingPhotoId ? 'Save Photo Changes' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#ef5a5a]" />
                <h3 className="text-base font-bold text-slate-900 font-crest">
                  {editingVideoId ? 'Update Video' : 'Add New Video to Live Website'}
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g. Independence Day Parade 2025"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Video Embed URL (YouTube or MP4) *</label>
                <input
                  type="url"
                  required
                  value={videoForm.videoUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={videoForm.thumbnailUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Campus Tour">Campus Tour</option>
                    <option value="Ceremonial">Ceremonial</option>
                    <option value="Events">Events</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="e.g. 5:20"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Brief description of video highlights..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#ef5a5a] hover:bg-[#df4747] rounded-xl shadow-xs transition cursor-pointer"
                >
                  {editingVideoId ? 'Save Video Changes' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
