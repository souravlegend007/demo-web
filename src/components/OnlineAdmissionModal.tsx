import React, { useState } from 'react';
import { X, CheckCircle, Send, FileText, AlertCircle } from 'lucide-react';
import { UserCategory } from '../types';

interface OnlineAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnlineAdmissionModal: React.FC<OnlineAdmissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    studentName: '',
    dob: '',
    gender: 'Male',
    classApplying: 'Class I',
    category: 'Civilians' as UserCategory,
    parentName: '',
    parentOccupation: '',
    parentRank: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="inline-block bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">
            Academic Session 2025-26
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-crest text-slate-900">
            Online Admission Registration
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Fill the preliminary registration details. You will receive an application reference number for document verification.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-8 text-center text-emerald-900">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="font-bold text-lg font-crest">Application Submitted Successfully!</h4>
            <div className="my-3 p-3 bg-white rounded-lg border border-emerald-200 inline-block">
              <span className="text-xs text-slate-500 block">Your Provisional Reference Number:</span>
              <strong className="text-base text-slate-900 font-mono">
                ARPS/ADM/2025/{Math.floor(1000 + Math.random() * 9000)}
              </strong>
            </div>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              We have dispatched confirmation details to <strong>{form.email || 'your email'}</strong>. Please visit the school office with required certificates within 7 working days.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Student Info */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Student Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.studentName}
                    onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                    placeholder="Candidate name"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class Applying For *</label>
                  <select
                    value={form.classApplying}
                    onChange={(e) => setForm({ ...form, classApplying: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class I">Class I</option>
                    <option value="Class II">Class II</option>
                    <option value="Class III">Class III</option>
                    <option value="Class IV">Class IV</option>
                    <option value="Class V">Class V</option>
                    <option value="Class VI">Class VI</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                    <option value="Class IX">Class IX</option>
                    <option value="Class XI - Science">Class XI - Science</option>
                    <option value="Class XI - Commerce">Class XI - Commerce</option>
                    <option value="Class XI - Humanities">Class XI - Humanities</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as UserCategory })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Civilians">Civilians</option>
                    <option value="OR">Other Ranks (OR)</option>
                    <option value="JCOs/WOs">JCOs / WOs</option>
                    <option value="Officers">Officers</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Parent / Guardian Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Father / Mother / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    placeholder="Full name of parent"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service / Occupation</label>
                  <input
                    type="text"
                    value={form.parentOccupation}
                    onChange={(e) => setForm({ ...form, parentOccupation: e.target.value })}
                    placeholder="e.g. Assam Rifles / State Govt / Business"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91-9876543210"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Address *</label>
                <textarea
                  rows={2}
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House number, colony/barracks, Agartala, Tripura PIN..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-md transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application Form</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
