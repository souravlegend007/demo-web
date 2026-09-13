import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  CheckCircle,
  Download,
  Clock,
  Shield,
  BookOpen,
  Shirt,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AdmissionSectionProps {
  onOpenAdmissionModal: () => void;
  onOpenTcModal: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  onOpenAdmissionModal,
  onOpenTcModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'process' | 'uniform' | 'rules' | 'syllabus'>('process');

  const steps = [
    {
      num: '01',
      title: 'Obtain Application Form',
      desc: 'Available at School Administrative Office between 8:00 AM – 1:30 PM on working days, or register directly online.',
    },
    {
      num: '02',
      title: 'Document Submission',
      desc: 'Submit attested Birth Certificate, previous school Transfer Certificate (TC), report card, immunization card, and defense/civilian identity proofs.',
    },
    {
      num: '03',
      title: 'Written Assessment & Interaction',
      desc: 'Age-appropriate basic diagnostic evaluation for Classes I–IX and Class XI stream aptitude assessment (English, Maths, Science).',
    },
    {
      num: '04',
      title: 'Merit List & Fee Deposit',
      desc: 'Admission offer letter issued. Complete one-time admission fee and quarterly tuition fee deposit to confirm student seat.',
    },
  ];

  const uniformGuide = [
    {
      type: 'Regular Uniform (Mon, Tue, Thu, Fri)',
      boys: 'Navy blue trousers, half/full sleeve sky blue shirt with ARPS monogram crest, school tie, black leather shoes with laces, navy blue socks with sky blue bands.',
      girls: 'Sky blue shirt, navy blue pleated skirt (or salwar suit for classes IX–XII), school tie, black ballerinas, navy blue socks with sky blue bands.',
    },
    {
      type: 'Wednesday & Saturday Sports Uniform',
      boys: 'House colour polo T-shirt (Red - Gandhi, Blue - Nehru, Green - Subhash, Yellow - Tagore), white trousers, white canvas shoes, and white socks.',
      girls: 'House colour polo T-shirt, white divided skirt / track pants, white canvas shoes, and white socks.',
    },
    {
      type: 'Winter Uniform (November to February)',
      boys: 'Navy blue blazer with gold embroidered school crest or navy blue V-neck woolen pullover with sky blue stripe on collar.',
      girls: 'Navy blue blazer with school crest or navy blue V-neck woolen sweater.',
    },
  ];

  const schoolRules = [
    'Punctuality: Students must reach the school premises by 7:45 AM. Late arrivals beyond 8:00 AM will not be permitted.',
    'Attendance: Mandatory 75% attendance is required as per CBSE norms to appear in Annual and Board examinations.',
    'Discipline: Zero tolerance for bullying, indiscipline, or damage to school property. Military-grade decorum expected.',
    'Smart Gadgets: Mobile phones and electronic smart watches are strictly prohibited inside classroom hours.',
    'Campus Cleanliness: ARPS Agartala maintains a strict plastic-free and litter-free cantonment campus.',
  ];

  return (
    <section id="admission-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Session 2025-26
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Admissions, Guidelines &amp; Code of Conduct
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Comprehensive admission procedure, age eligibility criteria, uniform specifications, and institutional code of conduct.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-200 rounded-xl text-xs font-bold flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveSubTab('process')}
              className={`px-4 py-2 rounded-lg transition ${
                activeSubTab === 'process'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Admission Process
            </button>
            <button
              onClick={() => setActiveSubTab('uniform')}
              className={`px-4 py-2 rounded-lg transition ${
                activeSubTab === 'uniform'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Uniform Specifications
            </button>
            <button
              onClick={() => setActiveSubTab('rules')}
              className={`px-4 py-2 rounded-lg transition ${
                activeSubTab === 'rules'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Rules &amp; Regulations
            </button>
            <button
              onClick={() => setActiveSubTab('syllabus')}
              className={`px-4 py-2 rounded-lg transition ${
                activeSubTab === 'syllabus'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Syllabus &amp; Examinations
            </button>
          </div>
        </div>

        {/* Tab 1: Admission Process */}
        {activeSubTab === 'process' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black font-crest text-amber-600 mb-2 block">
                      {step.num}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 font-crest">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Age Criteria & CTA Callout */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold font-crest text-amber-400">
                  Ready to Enroll Your Child?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Admissions are strictly transparent with zero donation or capitation fees. Defense wards and civilian students can apply directly.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span>Nursery: 3+ years</span>
                  <span>•</span>
                  <span>LKG: 4+ years</span>
                  <span>•</span>
                  <span>UKG: 5+ years</span>
                  <span>•</span>
                  <span>Class I: 6+ years as on 31st March</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs shadow-lg transition"
                >
                  Open Online Admission Form
                </button>
                <button
                  onClick={onOpenTcModal}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
                >
                  Verify Existing TC
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Uniform Specifications */}
        {activeSubTab === 'uniform' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                <Shirt className="w-5 h-5 text-red-800" />
                <h3 className="text-lg font-bold font-crest text-slate-900">
                  Prescribed School Uniform Guidelines
                </h3>
              </div>
              <div className="space-y-6">
                {uniformGuide.map((ug, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 mb-2">
                      {ug.type}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                      <div>
                        <strong className="text-slate-900 block mb-1">Boys:</strong>
                        <p className="leading-relaxed">{ug.boys}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">Girls:</strong>
                        <p className="leading-relaxed">{ug.girls}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Rules & Code of Conduct */}
        {activeSubTab === 'rules' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
              <Shield className="w-5 h-5 text-red-800" />
              <h3 className="text-lg font-bold font-crest text-slate-900">
                School Rules, Discipline &amp; General Regulations
              </h3>
            </div>
            <div className="space-y-3">
              {schoolRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Syllabus & Examinations */}
        {activeSubTab === 'syllabus' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold font-crest text-slate-900">
                CBSE Curriculum, Stream Offerings &amp; Exam Scheme
              </h3>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Senior Secondary Streams (Classes XI &amp; XII):</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>Science Stream:</strong> English Core, Physics, Chemistry, Mathematics / Biology, Computer Science / Physical Education.</li>
                  <li><strong>Humanities / Arts:</strong> English Core, Political Science, History, Economics, <strong>Geography</strong>, <strong>Psychology</strong>.</li>
                  <li><strong>Commerce Stream:</strong> English Core, Accountancy, Business Studies, Economics, Mathematics / Informatics Practices.</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Evaluation &amp; Examination Pattern:</h4>
                <p className="leading-relaxed text-slate-600">
                  Conducted in accordance with CBSE Continuous &amp; Comprehensive Evaluation framework: Periodic Test 1 (July), Half-Yearly / Mid-Term (September), Periodic Test 2 (December), and Annual / Pre-Board Examinations (February/March).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
