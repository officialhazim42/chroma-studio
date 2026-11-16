import React from 'react';
import { ArrowLeft, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { ActiveTab } from '../../../types/color';

export interface TocItem {
  id: string;
  title: string;
}

interface LegalDocumentLayoutProps {
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  toc: TocItem[];
  onNavigate: (tab: ActiveTab) => void;
  children: React.ReactNode;
}

export const LegalDocumentLayout: React.FC<LegalDocumentLayoutProps> = ({
  title,
  badge,
  lastUpdated,
  summary,
  toc,
  onNavigate,
  children,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            type="button"
            onClick={() => onNavigate('legal')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Legal &amp; Information
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('legal')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Legal Center</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs font-semibold font-mono text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
            {badge}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Last Updated: {lastUpdated}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {title}
        </h1>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Executive Summary
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Content on Left, Table of Contents on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document Content */}
        <div className="lg:col-span-8 bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm dark:shadow-xl space-y-8 legal-content text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
          {children}

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('legal')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Legal &amp; Information Center</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <span>Questions or concerns? Contact Support</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table of Contents Sticky Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-sm dark:shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {toc.map((item, idx) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left text-xs font-medium py-1.5 px-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-2"
                >
                  <span className="font-mono text-[10px] text-slate-400 shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Privacy & Architecture Guarantee Pill */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Client-Side Integrity</span>
            </p>
            <p className="text-[11px] leading-relaxed text-emerald-700/90 dark:text-emerald-300/80">
              Chroma Studio processes all color mathematical transformations directly within your browser runtime. No backend accounts, user databases, or tracking trackers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
