import React from 'react';
import { Trophy, Award, Medal, Star, Flame, Flag, Target } from 'lucide-react';

export const AchievementsSports: React.FC = () => {
  const academicAchievements = [
    {
      metric: '100%',
      title: 'CBSE Class X & XII Pass Rate',
      desc: 'Consistent centum pass percentage with over 45% students securing distinctions and 90%+ marks.',
    },
    {
      metric: '97.4%',
      title: 'School Highest Aggregate',
      desc: 'Science & Commerce stream top marks achieved in All India Senior School Certificate Examination.',
    },
    {
      metric: '42+',
      title: 'State Merit Scholars',
      desc: 'Students qualifying for national Olympiads, NTSE, and prestigious engineering & medical portals.',
    },
  ];

  const sportsHighlights = [
    {
      icon: Trophy,
      title: 'Tripura State Inter-School Football Championship',
      badge: 'Gold Medalists',
      desc: 'Senior Boys team clinched the championship trophy at Swami Vivekananda Stadium, Agartala.',
    },
    {
      icon: Medal,
      title: 'Inter-ARPS Athletic Meet Champion Trophy',
      badge: 'Overall Champions',
      desc: 'Sweeping 14 gold, 8 silver, and 6 bronze medals across 100m, 400m relay, long jump, and shot put.',
    },
    {
      icon: Target,
      title: 'CBSE East Zone Shooting & Archery Meet',
      badge: 'State Representation',
      desc: 'Cadets representing Tripura state at the CBSE National Games in 10m Air Rifle and Archery events.',
    },
    {
      icon: Star,
      title: 'National Karate & Taekwondo Open',
      badge: 'Black Belts & Trophies',
      desc: 'Student martial artists bagging podium finishes in junior open state championship.',
    },
  ];

  return (
    <section id="achievements-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Hall of Laurels
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-crest text-slate-900 mt-2">
            Academic &amp; Sporting Achievements
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            Celebrating our students' triumphs in CBSE Board Examinations, State Level Championships, and military cadet drills.
          </p>
        </div>

        {/* Academic Highlights */}
        <div className="mb-12">
          <h3 className="text-lg font-bold font-crest text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Academic Distinction (CBSE Board Records)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicAchievements.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-xl border border-amber-200 p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl sm:text-4xl font-black font-crest text-amber-900">
                  {item.metric}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-2 font-crest">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sports & State Level Laurels (arpsAnnualsports.aspx & arpsstatelevelsport.aspx) */}
        <div id="sports-section">
          <h3 className="text-lg font-bold font-crest text-slate-900 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <span>Sports, Athletics &amp; State Level Meets</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sportsHighlights.map((sport, idx) => {
              const Icon = sport.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md hover:border-amber-400/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-red-900/60 text-amber-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                        {sport.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold font-crest text-white mb-2">
                      {sport.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {sport.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                    <Flag className="w-3 h-3" />
                    <span>State &amp; National Representation</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
