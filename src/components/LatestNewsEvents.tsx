import React, { useState } from 'react';
import { Calendar, ArrowRight, Video, Sparkles, MessageSquare } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/schoolData';

interface LatestNewsEventsProps {
  onOpenAdmissionModal: () => void;
  onNavigateToGallery: () => void;
}

export const LatestNewsEvents: React.FC<LatestNewsEventsProps> = ({
  onOpenAdmissionModal,
  onNavigateToGallery,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const newsItems = [
    {
      id: 'news-1',
      title: 'Admissions Open for Session 2025-26',
      date: '10 Feb 2025',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      summary: 'Admission for academic session 2025-26 is now open. Parents can collect forms from the school administrative office between 8:00 AM and 1:30 PM on all working days or register online.',
      tag: 'Admissions',
      actionText: 'Apply Online',
      action: () => onOpenAdmissionModal(),
    },
    {
      id: 'news-2',
      title: 'Celebration of 78th Independence Day',
      date: '15 Aug 2024',
      image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80',
      summary: 'Assam Rifles Public School celebrated the 78th Independence Day with ceremonial guard of honour by the NCC troop, patriotic dance presentations, and Chairman address.',
      tag: 'Patriotic Celebrations',
      actionText: 'View Gallery',
      action: () => onNavigateToGallery(),
    },
    {
      id: 'news-3',
      title: 'School Activity & Digital Classroom Showcase',
      date: '20 Nov 2024',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      summary: 'ARPS Agartala produces weekly video showcases highlighting student debate clubs, robotics lab work, athletic tournaments, and art workshops on our official social channels.',
      tag: 'Activity Video',
      actionText: 'Watch Activities',
      action: () => onNavigateToGallery(),
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Latest News Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Campus Chronicle</span>
                <h3 className="text-2xl font-extrabold font-crest text-slate-900">Latest News</h3>
              </div>
              <button
                onClick={() => onNavigateToGallery()}
                className="text-xs font-bold text-slate-700 hover:text-amber-600 transition flex items-center gap-1"
              >
                <span>News Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-6">
              {newsItems.map((news) => (
                <article
                  key={news.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="sm:w-44 h-32 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          {news.tag}
                        </span>
                        <span className="text-[11px] text-slate-500">{news.date}</span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={news.action}
                        className="text-xs font-bold text-red-800 hover:text-red-950 flex items-center gap-1"
                      >
                        <span>{news.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Upcoming Events Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">Calendar 2025</span>
                <h3 className="text-2xl font-extrabold font-crest text-slate-900">Upcoming Events</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Official Schedule</span>
            </div>

            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(selectedEventId === event.id ? null : event.id)}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex items-start gap-4 cursor-pointer"
                >
                  {/* Event Date Block (Replicating reference site's calendar badge) */}
                  <div className="w-14 h-16 rounded-lg bg-gradient-to-b from-red-800 to-slate-900 text-white flex flex-col items-center justify-center shrink-0 shadow">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                      {event.month}
                    </span>
                    <span className="text-xl font-extrabold font-crest leading-none mt-0.5">
                      {event.day}
                    </span>
                    <span className="text-[9px] text-slate-300">{event.year}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {event.category} • {event.time}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {event.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="text-[10px] text-amber-800 font-semibold mt-1">
                      📍 {event.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Request Information Banner (Replicating reference site's .info-request) */}
            <div
              onClick={onOpenAdmissionModal}
              className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-lg cursor-pointer hover:shadow-xl transition flex items-center justify-between gap-4 border border-blue-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-full shrink-0">
                  <MessageSquare className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-amber-300 font-crest">
                    Request Information
                  </h4>
                  <p className="text-xs text-blue-100">
                    Have questions regarding admissions, fees, or academics? Submit an inquiry!
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
