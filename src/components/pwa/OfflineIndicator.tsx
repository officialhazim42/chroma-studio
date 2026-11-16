import React, { useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, checkConnection } = usePWA();
  const [checking, setChecking] = useState<boolean>(false);
  const [justReconnected, setJustReconnected] = useState<boolean>(false);

  // If online and not recently reconnected, don't show
  if (isOnline && !justReconnected) return null;

  const handleRetry = async () => {
    setChecking(true);
    const restored = await checkConnection();
    setChecking(false);
    if (restored) {
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 3000);
    }
  };

  return (
    <aside
      aria-label="Network status"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[calc(100%-2rem)] px-4 py-3 rounded-2xl bg-white dark:bg-[#151722] border border-amber-500/40 dark:border-amber-500/30 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-slate-800 dark:text-slate-200 transition-all animate-bounce-subtle"
    >
      <div className="flex items-center gap-3">
        {justReconnected ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        ) : (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <WifiOff className="w-4 h-4 text-amber-500" />
          </div>
        )}
        <div className="text-left">
          <p className="text-xs font-bold leading-tight text-slate-900 dark:text-white">
            {justReconnected ? 'Back Online!' : 'Offline Mode Active'}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
            {justReconnected
              ? 'Internet connectivity has been restored.'
              : 'All 10 color tools and saved palettes remain 100% operational.'}
          </p>
        </div>
      </div>

      {!justReconnected && (
        <button
          onClick={handleRetry}
          disabled={checking}
          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Retry</span>
        </button>
      )}
    </aside>
  );
};
