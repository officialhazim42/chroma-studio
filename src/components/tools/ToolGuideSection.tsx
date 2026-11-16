import React from 'react';
import { BookOpen, HelpCircle, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types/color';

export interface ToolGuideProps {
  toolId: string;
  title: string;
  subtitle: string;
  overview: string;
  howToSteps: string[];
  supportedFormats: { name: string; desc: string }[];
  useCases: { title: string; desc: string }[];
  examples: { input: string; output: string; note: string }[];
  relatedTools: { id: ActiveTab; label: string; desc: string }[];
  onNavigate: (tab: ActiveTab) => void;
}

export const ToolGuideSection: React.FC<ToolGuideProps> = ({
  title,
  subtitle,
  overview,
  howToSteps,
  supportedFormats,
  useCases,
  examples,
  relatedTools,
  onNavigate,
}) => {
  return (
    <section
      aria-labelledby="guide-heading"
      className="mt-14 pt-10 border-t border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        <span>Documentation &amp; User Guide</span>
      </div>
      <h2
        id="guide-heading"
        className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2"
      >
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
        {subtitle}
      </p>

      {/* Grid: Overview & How to Use */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Overview Box */}
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            What This Tool Does
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {overview}
          </p>
        </div>

        {/* How to Use Box */}
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            How to Use
          </h3>
          <ol className="space-y-2.5 text-sm">
            {howToSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Formats & Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Supported Color Formats */}
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Supported Color Formats</h3>
          <div className="space-y-3">
            {supportedFormats.map((fmt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5"
              >
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-300 block mb-0.5">
                  {fmt.name}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Use Cases */}
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Practical Use Cases</h3>
          <div className="space-y-3">
            {useCases.map((uc, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">{uc.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Examples Section */}
      {examples && examples.length > 0 && (
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-xl mb-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
            Practical Conversion &amp; Code Examples
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161822] border border-slate-200/70 dark:border-white/5"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-600 dark:text-slate-400">
                    Input: <strong className="text-slate-900 dark:text-white">{ex.input}</strong>
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400">&rarr;</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    Output: <strong className="text-indigo-600 dark:text-indigo-300">{ex.output}</strong>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{ex.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools Internal Navigation */}
      {relatedTools && relatedTools.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl p-6 shadow-sm dark:shadow-xl">
          <h3 className="text-xs font-bold text-indigo-700 dark:text-indigo-200 uppercase tracking-wider mb-3">
            Explore Related Color Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="text-left p-3.5 rounded-xl bg-white/80 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-indigo-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-400/50 transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between font-semibold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 mb-1">
                  <span>{tool.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{tool.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
