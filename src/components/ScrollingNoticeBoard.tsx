import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Calendar,
  ChevronRight,
  Pause,
  Play,
  FileText,
  Sparkles,
  X,
  ExternalLink,
  AlertCircle,
  Clock,
  MapPin,
  Building,
} from 'lucide-react';
import { NOTICES, Notice } from '../data/schoolData';

interface ScrollingNoticeBoardProps {
  onNavigate?: (pageId: string) => void;
  className?: string;
}

export const ScrollingNoticeBoard: React.FC<ScrollingNoticeBoardProps> = ({
  onNavigate,
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Auto-scroll mechanism
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const scrollSpeed = 0.5; // pixels per frame at 60fps

    const step = (currentTime: number) => {
      if (!isPaused && !isHoveredRef.current && container) {
        const delta = (currentTime - lastTime) / 16.67; // normalize to ~60fps
        container.scrollTop += scrollSpeed * delta;

        // When reached the bottom, smoothly loop back to top
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
          container.scrollTop = 0;
        }
      }
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const handleTouchStart = () => {
    isHoveredRef.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isHoveredRef.current = false;
    }, 1500);
  };

  const handleViewAllClick = () => {
    if (onNavigate) {
      onNavigate('notices');
    }
  };

  return (
    <>
      <div
        id="homepage-notice-board"
        style={{ width: '12cm', height: '14cm' }}
        className={`w-full sm:w-[12cm] h-[14cm] max-w-full bg-white rounded-xl shadow-lg border-2 border-[#183648]/15 flex flex-col overflow-hidden shrink-0 transition-all hover:shadow-xl ${className}`}
        aria-label="School Notice Board"
      >
        {/* Notice Board Header with Military Navy & Coral Theme */}
        <div className="bg-[#183648] text-white px-3 py-2.5 flex items-center justify-between shrink-0 border-b-2 border-[#f3b745] select-none">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#ef5a5a] text-white flex items-center justify-center shadow-xs">
                <Bell className="w-3.5 h-3.5 animate-bounce" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  Notice Board
                </h3>
                <span className="bg-[#ef5a5a] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full text-white uppercase tracking-wider shadow-xs">
                  Live
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium leading-none mt-0.5">
                Circulars &amp; Updates
              </p>
            </div>
          </div>

          {/* Pause / Play Toggle Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center gap-1 px-1.5 cursor-pointer"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span className="text-[9px] font-bold text-emerald-400">Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span className="text-[9px] font-bold text-amber-300">Pause</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Notice Area */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2.5 bg-slate-50/70 select-text scroll-smooth focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Scrolling Notices List"
        >
          {/* Duplicate list to enable continuous loop without jumping */}
          {[...NOTICES, ...NOTICES].map((notice, idx) => {
            const isNew = idx < 2 || notice.isUrgent;
            return (
              <div
                key={`${notice.id}-${idx}`}
                onClick={() => setSelectedNotice(notice)}
                className="group relative p-2.5 bg-white rounded-lg border border-slate-200 hover:border-[#38b6d8] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                {/* Notice Top Meta: Category + Date */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm ${
                        notice.isUrgent
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-[#38b6d8]/15 text-[#1b7e9b] border border-[#38b6d8]/30'
                      }`}
                    >
                      {notice.category}
                    </span>
                    {isNew && (
                      <span className="text-[8px] font-black uppercase px-1 py-0.2 rounded-xs bg-[#f3b745] text-slate-900 animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>

                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium shrink-0">
                    <Calendar className="w-2.5 h-2.5 text-slate-400" />
                    <span>{notice.date}</span>
                  </span>
                </div>

                {/* Notice Title */}
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#ef5a5a] transition-colors leading-snug line-clamp-2">
                  {notice.title}
                </h4>

                {/* Short Snippet */}
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {notice.description}
                </p>

                {/* Footer read prompt */}
                <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium truncate max-w-[150px]">
                    {notice.department}
                  </span>
                  <span className="text-[#38b6d8] font-bold group-hover:underline flex items-center gap-0.5 shrink-0">
                    Details
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice Board Footer */}
        <div className="p-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] shrink-0">
          <span className="text-slate-500 font-semibold text-[10px]">
            {NOTICES.length} Active Circulars
          </span>
          <button
            onClick={handleViewAllClick}
            className="text-[11px] font-extrabold text-[#ef5a5a] hover:text-[#c43636] flex items-center gap-1 group transition cursor-pointer"
          >
            <span>View All Notices</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border-t-4 border-[#ef5a5a] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close Notice Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                  selectedNotice.isUrgent
                    ? 'bg-red-100 text-red-800'
                    : 'bg-[#38b6d8]/20 text-[#1b7e9b]'
                }`}
              >
                {selectedNotice.category}
              </span>
              {selectedNotice.isUrgent && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Urgent Notice
                </span>
              )}
            </div>

            {/* Modal Title */}
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {selectedNotice.title}
            </h3>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-2 my-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Date: <strong>{selectedNotice.date}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Dept: <strong>{selectedNotice.department}</strong></span>
              </div>
              {selectedNotice.location && (
                <div className="flex items-center gap-1.5 col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Venue / Office: <strong>{selectedNotice.location}</strong></span>
                </div>
              )}
            </div>

            {/* Notice Full Description */}
            <div className="text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
              <p>{selectedNotice.description}</p>
              <p className="text-xs text-slate-500 italic">
                Note: For further queries or verification, students and guardians are advised to contact the administrative desk during official working hours (8:00 AM – 2:00 PM).
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedNotice(null);
                  if (onNavigate) onNavigate('notices');
                }}
                className="px-4 py-2 text-xs font-bold bg-[#38b6d8] hover:bg-[#2fa3c3] text-white rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Open Notice Archive</span>
              </button>

              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
