import React from 'react';
import { Home, ChevronRight, LucideIcon } from 'lucide-react';

export interface SiblingTab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  parentMenu: string;
  currentPageId: string;
  icon?: LucideIcon;
  badge?: string;
  siblingTabs?: SiblingTab[];
  onNavigate: (pageId: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  parentMenu,
  currentPageId,
  icon: Icon,
  badge,
  siblingTabs,
  onNavigate,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#e8f7fb] via-[#f3fafd] to-white text-slate-800 border-b-2 border-[#38b6d8] py-8 lg:py-10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-[#38b6d8] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#38b6d8]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-500">{parentMenu}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#ef5a5a] font-bold">{title}</span>
        </nav>

        {/* Title and Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {badge && (
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#f3b745] text-slate-900 shadow-2xs">
                  {badge}
                </span>
              )}
              <span className="text-[11px] text-slate-500 font-medium">
                ARPS AGARTALA • CBSE AFFIL. 2030013
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 flex items-center gap-3">
              {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#38b6d8] shrink-0" />}
              <span>{title}</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Quick Action Buttons: Coral Red & Cyan (Kidspro style) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('admission-apply')}
              className="px-4 py-2 bg-[#ef5a5a] hover:bg-[#df4747] text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition"
            >
              Apply Online
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 bg-[#38b6d8] hover:bg-[#28a3c4] text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition"
            >
              Contact Desk
            </button>
          </div>
        </div>

        {/* Sibling Menu Dropdown Tabs */}
        {siblingTabs && siblingTabs.length > 1 && (
          <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-[#38b6d8] uppercase tracking-wider shrink-0 mr-1">
              Explore {parentMenu}:
            </span>
            {siblingTabs.map((tab) => {
              const active = tab.id === currentPageId;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#ef5a5a] text-white font-bold shadow-sm'
                      : 'bg-white text-slate-700 hover:text-[#38b6d8] hover:border-[#38b6d8] border border-slate-200 shadow-2xs'
                  }`}
                >
                  {TabIcon && <TabIcon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
