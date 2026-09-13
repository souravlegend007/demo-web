import React, { useState, useMemo } from 'react';
import { Search, Bell, Download, ChevronDown, ChevronUp, Calendar, MapPin, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { NOTICES } from '../data/schoolData';
import { Notice } from '../types';

interface NoticeBoardProps {
  onOpenAdmissionModal: () => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ onOpenAdmissionModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('n-1');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = ['All', 'Admissions', 'Recruitment', 'Examinations', 'Academics', 'Notice'];

  const filteredNotices = useMemo(() => {
    return NOTICES.filter((notice) => {
      const matchesCategory =
        selectedCategory === 'All' || notice.category === selectedCategory;
      const matchesSearch =
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = (notice: Notice, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadSuccess(notice.id);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <section id="notices-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5 text-amber-700" />
            <span>Official Circulars &amp; Recruitment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900">
            Notice Board &amp; Vacancies
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600 font-sans">
            Stay updated with school circulars, examination schedules, recruitment notices, and academic announcements.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          {/* Search Input (Replicating reference site's searchInput) */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="searchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars, teaching jobs, exams, or departments..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-amber-500 rounded-full text-sm text-slate-900 focus:outline-none transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-amber-400 shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">No notices found matching your criteria</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-xs text-amber-600 font-bold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredNotices.map((notice) => {
              const isExpanded = expandedId === notice.id;
              return (
                <div
                  key={notice.id}
                  className={`bg-white border rounded-xl transition shadow-sm overflow-hidden ${
                    notice.isUrgent
                      ? 'border-amber-300 ring-1 ring-amber-200/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Notice Title Header (Accordion Trigger) */}
                  <div
                    onClick={() => toggleAccordion(notice.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition select-none"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          notice.category === 'Recruitment'
                            ? 'bg-purple-100 text-purple-700'
                            : notice.category === 'Admissions'
                            ? 'bg-emerald-100 text-emerald-700'
                            : notice.category === 'Examinations'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {notice.category === 'Recruitment' ? (
                          <Briefcase className="w-4 h-4" />
                        ) : (
                          <Bell className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {notice.category}
                          </span>
                          {notice.isUrgent && (
                            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-700 animate-pulse">
                              New / Urgent
                            </span>
                          )}
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {notice.date}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-600 transition">
                          {notice.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-400 p-1">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-700" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Notice Accordion Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <strong className="text-slate-700">Department:</strong>
                          <span>{notice.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <strong className="text-slate-700">Location:</strong>
                          <span>{notice.location}</span>
                        </div>
                      </div>

                      <p className="text-slate-700 leading-relaxed font-sans">{notice.description}</p>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        {notice.category === 'Recruitment' ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleDownload(notice, e)}
                              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition"
                            >
                              <Download className="w-3.5 h-3.5 text-amber-400" />
                              <span>Download Application Form</span>
                            </button>
                            <button
                              onClick={onOpenAdmissionModal}
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md text-xs font-bold transition"
                            >
                              Online Submission
                            </button>
                          </div>
                        ) : notice.category === 'Admissions' ? (
                          <button
                            onClick={onOpenAdmissionModal}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-md text-xs font-bold transition"
                          >
                            Proceed to Online Admission Form
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleDownload(notice, e)}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md text-xs font-semibold flex items-center gap-1.5 transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Circular (PDF)</span>
                          </button>
                        )}

                        {downloadSuccess === notice.id && (
                          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-fade-in">
                            <CheckCircle className="w-4 h-4" />
                            <span>Document downloaded successfully!</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
