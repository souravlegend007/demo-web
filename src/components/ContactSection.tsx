import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-800 bg-red-100 px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Contact &amp; Campus Location
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Reach out to our administrative office for admission guidance, document verification, or visit our green cantonment campus in Kunjaban, Agartala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/30">
              <h3 className="text-lg font-bold font-crest text-amber-300 pb-3 border-b border-slate-800">
                School Contact Information
              </h3>
              <div className="mt-6 space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-900/60 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Campus Address</strong>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {SCHOOL_INFO.address}
                    </p>
                    <span className="text-[11px] text-amber-400 font-mono">PIN: 799006</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-900/60 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Telephone &amp; Office</strong>
                    <a
                      href={`tel:${SCHOOL_INFO.phone}`}
                      className="text-slate-300 hover:text-amber-300 transition font-mono mt-0.5 block"
                    >
                      {SCHOOL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-900/60 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Official Email</strong>
                    <a
                      href={`mailto:${SCHOOL_INFO.email}`}
                      className="text-amber-300 hover:underline font-mono mt-0.5 block"
                    >
                      {SCHOOL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-900/60 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Visiting Hours</strong>
                    <p className="text-slate-300 mt-0.5">
                      {SCHOOL_INFO.timings}
                    </p>
                    <p className="text-[11px] text-slate-400">Sunday Closed</p>
                  </div>
                </div>
              </div>

              {/* Affiliation Bar */}
              <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>CBSE Affil. No: <strong className="text-white">2030013</strong></span>
                <span>School Code: <strong className="text-white">35274</strong></span>
              </div>
            </div>

            {/* Interactive Location Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-emerald-700" />
                  <span>How to Reach ARPS Agartala</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Tripura West</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Located inside the secure Assam Rifles Military Garrison, Kunjaban, near Circuit House &amp; Governor House. Accessible via VIP Road and Airport Road (approx. 8 km from MBB Airport Agartala).
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold font-crest text-slate-900 mb-1">
              Send Official Communication / Grievance
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our administrative secretariat responds to parent queries within 24–48 business hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-8 text-center text-emerald-900">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-base font-crest">Message Successfully Dispatched!</h4>
                <p className="text-xs text-emerald-700 mt-2 max-w-md mx-auto">
                  Thank you for writing to Assam Rifles Public School, Agartala. Your submission has been logged and forwarded to the appropriate school branch.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Admission Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-5 px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-900 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Subhashish Debbarma"
                      className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile Contact *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91-9876543210"
                      className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Inquiry Category *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Admission Inquiry">Admission Inquiry (2025-26)</option>
                      <option value="Fee Structure & Verification">Fee Structure &amp; Verification</option>
                      <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                      <option value="Recruitment & Vacancy">Recruitment &amp; Vacancy</option>
                      <option value="General Grievance">General Grievance / Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message Content *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your student grade, transfer date, or query..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Administrative Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
