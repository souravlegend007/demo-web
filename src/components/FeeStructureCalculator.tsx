import React, { useState } from 'react';
import { Calculator, Check, Info, ShieldCheck, Download } from 'lucide-react';
import { ADMISSION_FEES, TUITION_FEES } from '../data/schoolData';
import { UserCategory } from '../types';

interface FeeStructureCalculatorProps {
  onOpenAdmissionModal: () => void;
}

export const FeeStructureCalculator: React.FC<FeeStructureCalculatorProps> = ({
  onOpenAdmissionModal,
}) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'calculator'>('calculator');
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>('Civilians');
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(0);
  const [paymentPeriod, setPaymentPeriod] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');

  const currentClass = TUITION_FEES[selectedClassIndex];
  const admissionFee =
    ADMISSION_FEES.find((item) => item.category === selectedCategory)?.amount || 0;

  const monthlyTuition = currentClass.categoryFees[selectedCategory];

  const calculatedTuition =
    paymentPeriod === 'monthly'
      ? monthlyTuition
      : paymentPeriod === 'quarterly'
      ? monthlyTuition * 3
      : monthlyTuition * 12;

  const totalFirstPayment =
    admissionFee +
    calculatedTuition +
    (paymentPeriod === 'annually'
      ? currentClass.annualCharges + currentClass.examFee
      : Math.round(currentClass.annualCharges / 4));

  return (
    <section id="fees-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
            Transparent Subsidized Education
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Fee Structure &amp; Interactive Calculator
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Official ARWES prescribed fee schedules for Defense/Assam Rifles categories and Civilians.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-200 rounded-xl shadow-inner text-xs font-bold">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-5 py-2 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Interactive Fee Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={`px-5 py-2 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'tables'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <span>Full Fee Schedule Tables</span>
            </button>
          </div>
        </div>

        {activeTab === 'calculator' ? (
          /* Modern Interactive Fee Calculator Plugin */
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="md:col-span-7 space-y-6">
                {/* Step 1: Category Selection */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    1. Select Parent Category / Defense Status
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Civilians', 'OR', 'JCOs/WOs', 'Officers'] as UserCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition text-center ${
                          selectedCategory === cat
                            ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-md ring-2 ring-amber-400/50'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-amber-600" />
                    <span>Defense/Assam Rifles wards receive subsidized government tuition.</span>
                  </p>
                </div>

                {/* Step 2: Class Selection */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    2. Select Grade / Class
                  </label>
                  <select
                    value={selectedClassIndex}
                    onChange={(e) => setSelectedClassIndex(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    {TUITION_FEES.map((fee, idx) => (
                      <option key={idx} value={idx}>
                        {fee.classLevel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Payment Frequency */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    3. Fee Frequency
                  </label>
                  <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50 text-xs font-semibold">
                    <button
                      onClick={() => setPaymentPeriod('monthly')}
                      className={`flex-1 py-1.5 rounded transition ${
                        paymentPeriod === 'monthly'
                          ? 'bg-white shadow text-slate-900 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setPaymentPeriod('quarterly')}
                      className={`flex-1 py-1.5 rounded transition ${
                        paymentPeriod === 'quarterly'
                          ? 'bg-white shadow text-slate-900 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Quarterly (3 Mo)
                    </button>
                    <button
                      onClick={() => setPaymentPeriod('annually')}
                      className={`flex-1 py-1.5 rounded transition ${
                        paymentPeriod === 'annually'
                          ? 'bg-white shadow text-slate-900 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Annual (Full Year)
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Summary Column */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl p-5 sm:p-6 border border-amber-500/30 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Fee Breakdown
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                    {selectedCategory}
                  </span>
                </div>

                <div className="space-y-3 my-4 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>One-time Admission Fee:</span>
                    <span className="font-bold text-white">₹{admissionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Tuition Fee ({paymentPeriod}):</span>
                    <span className="font-bold text-white">₹{calculatedTuition.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Annual Charges (Pro-rated):</span>
                    <span className="font-bold text-white">
                      ₹
                      {(paymentPeriod === 'annually'
                        ? currentClass.annualCharges
                        : Math.round(currentClass.annualCharges / 4)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Examination Fee:</span>
                    <span className="font-bold text-white">₹{currentClass.examFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-extrabold uppercase text-amber-300">
                      Estimated Initial Due:
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-crest text-amber-400">
                      ₹{totalFirstPayment.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    *Excludes textbook sets, uniform kits, and optional bus conveyance.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={onOpenAdmissionModal}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-lg text-xs shadow transition text-center"
                  >
                    Proceed with Admission Form
                  </button>
                  <a
                    href="#contact-section"
                    className="block text-center text-[11px] text-slate-400 hover:text-white transition"
                  >
                    Have questions? Contact Accounts Office
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Authentic Tables matching reference site */
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Admission Fees Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
                <h3 className="text-sm font-bold font-crest text-amber-300">
                  Admission Fees (One Time at Admission)
                </h3>
                <span className="text-xs text-slate-400">Official ARPS Agartala Rates</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Officers</th>
                      <th className="py-3 px-4">JCOs / WOs</th>
                      <th className="py-3 px-4">Other Ranks (OR)</th>
                      <th className="py-3 px-4">Civilians</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 font-semibold">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-mono">₹2,100</td>
                      <td className="py-3.5 px-4 font-mono">₹1,600</td>
                      <td className="py-3.5 px-4 font-mono">₹1,250</td>
                      <td className="py-3.5 px-4 font-mono text-amber-800 font-bold">₹3,200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tuition Fees Monthly Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
                <h3 className="text-sm font-bold font-crest text-amber-300">
                  Monthly Tuition Fees by Class
                </h3>
                <span className="text-xs text-slate-400">Nursery to Senior Secondary (Class XII)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Class Range</th>
                      <th className="py-3 px-4">Offr / JCOs / WOs / ORs</th>
                      <th className="py-3 px-4">Civilians</th>
                      <th className="py-3 px-4">Annual Charges</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {TUITION_FEES.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.classLevel}</td>
                        <td className="py-3 px-4 font-mono font-medium">
                          ₹{row.categoryFees['OR'].toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-amber-900">
                          ₹{row.categoryFees['Civilians'].toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          ₹{row.annualCharges.toLocaleString()} / year
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
