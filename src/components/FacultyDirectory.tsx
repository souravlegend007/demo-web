import React, { useState } from 'react';
import { Users, GraduationCap, Briefcase, Mail, Award, CheckCircle } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/schoolData';

export const FacultyDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Teaching' | 'Administration'>('All');

  const filteredMembers =
    activeTab === 'All'
      ? FACULTY_MEMBERS
      : FACULTY_MEMBERS.filter((m) => m.category === activeTab);

  return (
    <section id="staff-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red-800 bg-red-100 px-3 py-1 rounded-full">
            Educators &amp; Administration
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Faculty &amp; Staff Directory
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Meet our dedicated team of mentors, department heads, physical training instructors, and administrative leaders.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-200 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('All')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'All'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              All Personnel ({FACULTY_MEMBERS.length})
            </button>
            <button
              onClick={() => setActiveTab('Teaching')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'Teaching'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Teaching Faculty
            </button>
            <button
              onClick={() => setActiveTab('Administration')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'Administration'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Office Administration
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition text-center flex flex-col items-center justify-between"
            >
              <div className="w-full flex flex-col items-center">
                {/* Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md mb-3 bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badge */}
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mb-1">
                  {member.category}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-crest">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-red-800 mt-0.5">
                  {member.role}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {member.department}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 w-full text-[11px] text-slate-600 space-y-1">
                  <div>
                    <strong className="text-slate-700">Qual:</strong> {member.qualification}
                  </div>
                  <div>
                    <strong className="text-slate-700">Experience:</strong> {member.experience}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 w-full">
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Faculty</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
