import React, { useState } from 'react';
import { X, FileText, CheckCircle, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { MANDATORY_DISCLOSURE } from '../data/schoolData';

interface MandatoryDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MandatoryDisclosureModal: React.FC<MandatoryDisclosureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (docName: string) => {
    setDownloadedDoc(docName);
    setTimeout(() => setDownloadedDoc(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>CBSE Statutory Compliance</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-crest text-slate-900">
            Mandatory Public Disclosure (SARAS)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            In compliance with Appendix IX of CBSE Affiliation Bye-Laws 2018 for public transparency.
          </p>
        </div>

        {/* Section A: General Information */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-800 mb-3 pb-1 border-b border-slate-200">
            A. General School Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Name of School:</span>
              <strong className="text-slate-900">{MANDATORY_DISCLOSURE.schoolName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">CBSE Affiliation Number:</span>
              <strong className="text-slate-900 font-mono">{MANDATORY_DISCLOSURE.affiliationNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">School Code:</span>
              <strong className="text-slate-900 font-mono">{MANDATORY_DISCLOSURE.schoolCode}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Principal Name &amp; Qualification:</span>
              <strong className="text-slate-900">{MANDATORY_DISCLOSURE.principalName} ({MANDATORY_DISCLOSURE.principalQualification})</strong>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 block">Complete Postal Address:</span>
              <strong className="text-slate-900">{MANDATORY_DISCLOSURE.address}</strong>
            </div>
          </div>
        </div>

        {/* Section B: Mandatory Documents & Certificates */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-800 mb-3 pb-1 border-b border-slate-200">
            B. Documents and Certificates
          </h4>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-xs">
            {MANDATORY_DISCLOSURE.documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{doc.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(doc.title)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3 h-3 text-amber-400" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {downloadedDoc && (
            <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg flex items-center gap-2 border border-emerald-300 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Simulated verification: <strong>{downloadedDoc}</strong> verified and ready for audit inspection.
              </span>
            </div>
          )}
        </div>

        {/* Section C: Academic Metrics */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-800 mb-3 pb-1 border-b border-slate-200">
            C. Result and Academics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Class X Board Pass %</span>
              <strong className="text-base text-emerald-700 font-bold">100%</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Class XII Board Pass %</span>
              <strong className="text-base text-emerald-700 font-bold">100%</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Teacher-Student Ratio</span>
              <strong className="text-base text-slate-900 font-bold">1 : 22</strong>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
          >
            Close Disclosure
          </button>
        </div>
      </div>
    </div>
  );
};
