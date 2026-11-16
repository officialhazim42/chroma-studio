import React, { useEffect, useState } from 'react';
import {
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  X,
  Zap,
  WifiOff,
  ShieldCheck,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const InstallModal: React.FC = () => {
  const {
    installModalOpen,
    setInstallModalOpen,
    isInstalled,
    canInstall,
    platform,
    promptInstall,
  } = usePWA();

  const [installState, setInstallState] = useState<'idle' | 'installing' | 'success'>('idle');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && installModalOpen) {
        setInstallModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [installModalOpen, setInstallModalOpen]);

  if (!installModalOpen) return null;

  const handleInstallClick = async () => {
    setInstallState('installing');
    const outcome = await promptInstall();
    if (outcome === 'accepted') {
      setInstallState('success');
      setTimeout(() => {
        setInstallModalOpen(false);
      }, 1500);
    } else {
      setInstallState('idle');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#11131C] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setInstallModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Chroma Studio App Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#090A0F] flex items-center justify-center overflow-hidden">
              <img
                src="/favicon.svg"
                alt="Chroma Studio App Icon"
                className="w-11 h-11 object-contain"
                width="44"
                height="44"
              />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <span>STANDALONE PWA</span>
            </div>
            <h2 id="install-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
              Install Chroma Studio
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Every Color. Every Code. One Creative Workspace.
            </p>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex items-start gap-2.5">
            <WifiOff className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Offline</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                All 10 color tools work without internet connection.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Instant Launch</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Standalone window with zero browser tab clutter.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Local Privacy</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Palettes &amp; images processed purely on device.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex items-start gap-2.5">
            <Smartphone className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Cross-Platform</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Seamless on Android, iOS, Windows, and macOS.
              </p>
            </div>
          </div>
        </div>

        {/* Platform-Specific Installation Flow */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-500/20 mb-6">
          {isInstalled ? (
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Chroma Studio is already installed and running on this device!</span>
            </div>
          ) : platform === 'ios' ? (
            <div>
              <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                <Laptop className="w-4 h-4" />
                <span>How to Install on iPhone &amp; iPad</span>
              </div>
              <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/60 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-indigo-600 dark:text-indigo-400" /> in Safari's bottom toolbar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/60 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>
                    Scroll down and choose <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-indigo-600 dark:text-indigo-400" />.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/60 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>
                    Tap <strong>Add</strong> in the top-right corner to place Chroma Studio on your Home Screen.
                  </span>
                </li>
              </ol>
            </div>
          ) : canInstall ? (
            <div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Click the button below to add Chroma Studio to your desktop or application drawer with 1-click native installation.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1 font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                <span>Installation Guidance</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                To install Chroma Studio on your computer, open this page in Chrome, Edge, or Brave, and click the install icon (
                <Download className="w-3.5 h-3.5 inline text-indigo-600 dark:text-indigo-400" />) located in the browser's address bar.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setInstallModalOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>

          {canInstall && !isInstalled && (
            <button
              onClick={handleInstallClick}
              disabled={installState === 'installing'}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{installState === 'installing' ? 'Installing...' : 'Install Chroma Studio'}</span>
            </button>
          )}

          {isInstalled && (
            <button
              onClick={() => setInstallModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
