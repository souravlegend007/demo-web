import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Calendar,
  CheckCircle,
  Search,
  User,
  Users
} from 'lucide-react';
import { FacultyMember } from '../types';
import { getLiveStaffList, STAFF_UPDATED_EVENT } from '../data/staffManager';

export const FacultyDirectory: React.FC = () => {
  const [staffList, setStaffList] = useState<FacultyMember[]>(() => getLiveStaffList());
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const refreshStaff = () => {
      setStaffList(getLiveStaffList());
    };

    window.addEventListener(STAFF_UPDATED_EVENT, refreshStaff);
    window.addEventListener('storage', refreshStaff);

    return () => {
      window.removeEventListener(STAFF_UPDATED_EVENT, refreshStaff);
      window.removeEventListener('storage', refreshStaff);
    };
  }, []);

  // Compute unique categories
  const categories = ['All', 'Teaching', 'Administration', 'PGT', 'TGT', 'PRT', 'Activity & Sports'];

  const filteredMembers = staffList.filter((member) => {
    // Category match
    const categoryMatch =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Teaching'
        ? member.category === 'Teaching' || member.category === 'PGT' || member.category === 'TGT' || member.category === 'PRT'
        : member.category.toLowerCase().includes(activeCategory.toLowerCase());

    // Search query match
    if (!searchQuery.trim()) return categoryMatch;
    const q = searchQuery.toLowerCase();
    const nameMatch = member.name.toLowerCase().includes(q);
    const desigMatch = (member.designation || member.role || '').toLowerCase().includes(q);
    const subjMatch = (member.subjectTaught || member.subject || member.department || '').toLowerCase().includes(q);
    const qualMatch = (member.qualification || '').toLowerCase().includes(q);

    return categoryMatch && (nameMatch || desigMatch || subjMatch || qualMatch);
  });

  return (
    <section id="staff-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ef5a5a] bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Educators &amp; Administration
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Faculty &amp; Staff Directory
          </h2>
          <div className="w-20 h-1 bg-[#38b6d8] mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Meet our dedicated mentors, post-graduate educators, sports instructors, and administrative leaders at Assam Rifles Public School, Agartala.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty by name, designation, subject taught, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b6d8] focus:border-transparent shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? staffList.length
                  : cat === 'Teaching'
                  ? staffList.filter((m) => m.category === 'Teaching' || m.category === 'PGT' || m.category === 'TGT' || m.category === 'PRT').length
                  : staffList.filter((m) => m.category.toLowerCase().includes(cat.toLowerCase())).length;

              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-amber-300 shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-400/20 text-amber-200' : 'bg-slate-100 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-sm">No staff members found</p>
            <p className="text-slate-500 text-xs mt-1">Try selecting another category or clearing your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition text-center flex flex-col justify-between group"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Photo with fallbacks */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md mb-3 bg-slate-100 relative shrink-0">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to placeholder if image fails
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                        <User className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  {/* Category Badge */}
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 mb-1.5 border border-slate-200">
                    {member.category}
                  </span>

                  {/* Name */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-crest">
                    {member.name}
                  </h3>

                  {/* Designation */}
                  <p className="text-xs font-semibold text-[#ef5a5a] mt-0.5">
                    {member.designation || member.role}
                  </p>

                  {/* Subject Taught */}
                  <div className="mt-2 text-xs font-medium text-slate-700 flex items-center gap-1.5 justify-center bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-md w-full">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate" title={member.subjectTaught || member.department || 'General'}>
                      {member.subjectTaught || member.department || 'General'}
                    </span>
                  </div>

                  {/* Qualification & Date of Joining */}
                  <div className="mt-3 pt-3 border-t border-slate-100 w-full text-[11px] text-slate-600 space-y-1.5 text-left">
                    <div className="flex items-start gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-700 font-semibold">Qual: </strong>
                        <span>{member.qualification}</span>
                      </div>
                    </div>
                    {member.dateOfJoining && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <div>
                          <strong className="text-slate-700 font-semibold">Joined: </strong>
                          <span>{member.dateOfJoining}</span>
                        </div>
                      </div>
                    )}
                    {member.experience && !member.dateOfJoining && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <div>
                          <strong className="text-slate-700 font-semibold">Exp: </strong>
                          <span>{member.experience}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 w-full">
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified ARPS Staff</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
