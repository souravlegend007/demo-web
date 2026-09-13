import React, { useState } from 'react';
import { UserCheck, Award, HeartHandshake, CheckCircle2, GraduationCap } from 'lucide-react';

export const AlumniSection: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    passoutYear: '2022',
    stream: 'Science',
    currentOccupation: '',
    email: '',
    phone: '',
  });

  const batches = [
    {
      year: 'Batch of 2022',
      studentsCount: 94,
      notable: 'Admitted to IIT Guwahati, NIT Agartala, Armed Forces Medical College, and National Law Universities.',
    },
    {
      year: 'Batch of 2021',
      studentsCount: 88,
      notable: 'Commissions into Indian Army, Assam Rifles, Central Armed Police Forces, and corporate engineering roles.',
    },
    {
      year: 'Batch of 2020',
      studentsCount: 82,
      notable: 'Civil services aspirants, medical interns, software developers, and research scholars.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <section id="alumni-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
            Sentinels of Tomorrow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            ARPS Agartala Alumni Network
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Connecting generations of graduates who have served our nation with pride, courage, and distinction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Batches Overview */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold font-crest text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-red-800" />
              <span>Graduating Batches</span>
            </h3>
            <div className="space-y-3">
              {batches.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900 font-crest">{b.year}</h4>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {b.studentsCount} Graduates
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{b.notable}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-900 to-slate-900 text-white shadow text-xs">
              <div className="font-bold text-amber-300 mb-1">Annual Alumni Reunion:</div>
              <p className="text-slate-200">
                Join us every December for the Grand Homecoming Ceremony, interacting with former faculty, mentors, and current students.
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold font-crest text-slate-900 mb-1">
              Alumni Registration Portal
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Keep your contact information up-to-date and receive institutional newsletters and reunion invites.
            </p>

            {registered ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center text-emerald-900">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm">Thank You for Connecting!</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Your alumni details have been recorded in the ARPS Agartala Alumni Database. We will reach out for the upcoming winter reunion.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Passing Year</label>
                    <select
                      value={formData.passoutYear}
                      onChange={(e) => setFormData({ ...formData, passoutYear: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="Earlier">Earlier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stream</label>
                    <select
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Humanities / Arts</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Current Occupation / University
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.currentOccupation}
                    onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                    placeholder="e.g. Software Engineer / MBBS Student / Defense Officer"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91-"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg transition mt-2"
                >
                  Register in Alumni Directory
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
