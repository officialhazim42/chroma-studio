import React from 'react';
import { Sparkles, RefreshCw, X } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const UpdateBanner: React.FC = () => {
  const { updateAvailable, applyUpdate, dismissUpdate } = usePWA();

  if (!updateAvailable) return null;

  return (
    <aside
      aria-label="Application update"
      className="fixed top-20 right-4 z-40 max-w-md w-[calc(100%-2rem)] p-4 rounded-2xl bg-white dark:bg-[#12141F] border border-indigo-500/30 shadow-2xl backdrop-blur-xl text-slate-800 dark:text-slate-200 transition-all animate-slide-down"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1 pr-6">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Update Available
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
            A new version of Chroma Studio is ready with improvements and latest color tool updates.
          </p>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={applyUpdate}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update Now</span>
            </button>
            <button
              onClick={dismissUpdate}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors"
            >
              Later
            </button>
          </div>
        </div>

        <button
          onClick={dismissUpdate}
          className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          aria-label="Dismiss update notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
