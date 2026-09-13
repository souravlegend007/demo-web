import React, { useState } from 'react';
import { Quote, User, Award, X, BookOpen } from 'lucide-react';
import { InstitutionOverview } from './InstitutionOverview';

export const LeadershipMessages: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'chairman' | 'principal' | null>(null);

  return (
    <section id="leadership" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Words of Inspiration
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Messages from Leadership
          </h2>
          <div className="w-20 h-1 bg-red-800 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-sm text-slate-600 font-quote">
            Guiding the pedagogical vision and moral compass of Assam Rifles Public School, Agartala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chairman Card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 text-center sm:text-left">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-red-800 shadow-md bg-slate-100 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
                      alt="Brig. Nishant Chandel"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-1 bg-red-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
                    Chairman
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-crest text-slate-900">
                    Brig. Nishant Chandel
                  </h3>
                  <p className="text-xs font-bold text-red-800 uppercase tracking-wider">
                    Chairman, ARPS Agartala
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Assam Rifles – ARWES Governing Body
                  </p>
                  <div className="mt-2 text-xs italic font-quote text-rose-700 bg-rose-50 px-3 py-1.5 rounded border border-rose-100 inline-block">
                    "The Great Aim of Education is not knowledge but action" – Herbert Spencer
                  </div>
                </div>
              </div>

              {/* Message Excerpt */}
              <div className="relative text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 font-sans">
                <Quote className="w-8 h-8 text-amber-500/20 absolute -top-1 -left-2 -z-10" />
                <p className="text-justify line-clamp-4">
                  It is with great pleasure that I welcome you to our school's website. As the Chairman of this esteemed institution, I am honored to extend my warmest greetings to each member of our vibrant community. Our website serves as a digital gateway to the heart and soul of our school. Here, you will find a treasure trove of information about our academic programs, extracurricular activities, and the rich tapestry of experiences that define our educational journey...
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Official Communiqué</span>
              <button
                onClick={() => setActiveModal('chairman')}
                className="text-xs font-bold text-red-800 hover:text-red-900 underline underline-offset-4 flex items-center gap-1"
              >
                <span>Read Full Address</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Principal Card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 text-center sm:text-left">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-800 shadow-md bg-slate-100 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Mr. Animesh Acharya"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-1 bg-slate-900 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
                    Principal
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-crest text-slate-900">
                    Mr. Animesh Acharya
                  </h3>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Principal, ARPS Agartala
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    M.Sc, M.Ed – Association with ARPS since 2002
                  </p>
                  <div className="mt-2 text-xs italic font-quote text-slate-700 bg-slate-100 px-3 py-1.5 rounded border border-slate-200 inline-block">
                    "Building future leaders with discipline, intellect, and empathy"
                  </div>
                </div>
              </div>

              {/* Message Excerpt */}
              <div className="relative text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 font-sans">
                <Quote className="w-8 h-8 text-blue-500/20 absolute -top-1 -left-2 -z-10" />
                <p className="text-justify line-clamp-4">
                  My association with Assam Rifles Public School, Agartala started in the year 2002 and I have come across several profound transformations in this reputed Organization. Now, as the Principal of the School, I have been handed over the sacred task of building the future of our scholars as well as attending to the scholastic, sports, and socio-emotional needs of every child entrusted to our care...
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Principal's Desk</span>
              <button
                onClick={() => setActiveModal('principal')}
                className="text-xs font-bold text-slate-900 hover:text-amber-600 underline underline-offset-4 flex items-center gap-1"
              >
                <span>Read Full Address</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Institution Overview below Principal & Chairman messages */}
        <div className="mt-12 sm:mt-16">
          <InstitutionOverview />
        </div>
      </div>

      {/* Leadership Message Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              aria-label="Close message modal"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'chairman' ? (
              <div>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-800 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
                      alt="Brig. Nishant Chandel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-crest text-slate-900">
                      Brig. Nishant Chandel
                    </h3>
                    <p className="text-xs font-bold text-red-800 uppercase">
                      Chairman, Assam Rifles Public School, Agartala
                    </p>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-800 text-xs italic font-quote text-red-950">
                  "The Great Aim of Education is not knowledge but action" – Herbert Spencer
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans text-justify">
                  <p>
                    It is with great pleasure that I welcome you to our school's official digital portal. As the Chairman of this esteemed institution, I am honored to extend my warmest greetings to each member of our vibrant community – students, respected teachers, proud parents, and well-wishers.
                  </p>
                  <p>
                    Our website serves as a digital gateway to the heart and soul of Assam Rifles Public School, Agartala. Here, you will find a treasure trove of information about our academic programs, extracurricular activities, NCC initiatives, and the rich tapestry of experiences that define our educational journey.
                  </p>
                  <p>
                    Education at ARPS is not limited to textbook mastery or examination percentages. True to the military traditions of the Assam Rifles – the Sentinels of the North East – we endeavor to forge characters of grit, honour, discipline, empathy, and patriotism. We want our pupils to step into the world not just equipped with certificates, but with the courage to lead and the readiness to serve society.
                  </p>
                  <p>
                    I urge parents and guardians to walk hand-in-hand with our faculty. Together, we can ensure that every child who passes through these gates emerges ready to conquer the challenges of tomorrow.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-800 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Mr. Animesh Acharya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-crest text-slate-900">
                      Mr. Animesh Acharya
                    </h3>
                    <p className="text-xs font-bold text-slate-700 uppercase">
                      Principal, Assam Rifles Public School, Agartala
                    </p>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-slate-100 border-l-4 border-slate-800 text-xs italic font-quote text-slate-900">
                  "Guiding intellect, sportsmanship, and moral courage since 2002"
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans text-justify">
                  <p>
                    My association with Assam Rifles Public School, Agartala started in the year 2002 and I have come across several monumental milestones in this reputed Organization. Now, as the Principal of the School, I have been handed over the privilege and responsibility of building the future of our school as well as taking care of the educational and social needs of our students.
                  </p>
                  <p>
                    Under the visionary guidance of our Chairman and the Assam Rifles Welfare Education Society, we have upgraded laboratories, introduced multidisciplinary subjects including Geography and Psychology, and provided our students with unparalleled opportunities in sports, NCC drill, and state-level science symposiums.
                  </p>
                  <p>
                    Our experienced teaching faculty works with tireless passion. In a world of rapid digital disruption, we ensure our curriculum balances modern scientific enquiry with grounded moral grounding.
                  </p>
                  <p>
                    I invite prospective students and parents to visit our campus, observe our classrooms, and join the glorious ARPS family.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
