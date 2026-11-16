import React, { useEffect } from 'react';
import {
  X,
  MapPin,
  Mail,
  ShieldCheck,
  Cpu,
  Layers,
  Palette,
  Eye,
  WifiOff,
  ExternalLink,
} from 'lucide-react';
import { SOCIAL_PROFILES } from '../../utils/socialProfiles';
import { DEVELOPER_LOGO_SRC, DEVELOPER_LOGO_ALT } from '../../utils/developerAssets';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const developmentFocus = [
    {
      title: 'Frontend Engineering',
      icon: <Cpu className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
      desc: 'Modular, type-safe architecture powered by React and modern frontend systems.',
    },
    {
      title: 'Color Science',
      icon: <Palette className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
      desc: 'Bidirectional mathematical models, WCAG 2.1 contrast formulas, and harmonic algorithms.',
    },
    {
      title: 'Responsive UI Design',
      icon: <Layers className="w-4 h-4 text-purple-500 dark:text-purple-400" />,
      desc: 'Pixel-balanced, ergonomic interfaces crafted for mobile, tablet, and desktop viewports.',
    },
    {
      title: 'Browser-Based Processing',
      icon: <Eye className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
      desc: '100% client-side computations with zero server telemetry and strict privacy by design.',
    },
    {
      title: 'Offline-First Experience',
      icon: <WifiOff className="w-4 h-4 text-sky-500 dark:text-sky-400" />,
      desc: 'Progressive Web App with resilient service-worker caching and local storage persistence.',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dev-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/60 dark:bg-black/75 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F1017] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-800 dark:text-slate-200 my-auto custom-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
          aria-label="Close Developer Profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Developer Identity & Project Attribution */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-md overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={DEVELOPER_LOGO_SRC}
                  alt={DEVELOPER_LOGO_ALT}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white dark:border-[#0F1017]"
              title="Active Creator"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2
                id="dev-modal-title"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
              >
                HAZIM BASHIR FAQEER
              </h2>
              <span
                className="text-base font-arabic font-medium text-indigo-600 dark:text-indigo-400"
                dir="rtl"
              >
                حازم بشیر
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
              Android Developer &amp; Software Creator
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-500/20">
                Designed and Developed by @officialhazim42
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Ganderbal, Jammu &amp; Kashmir, India
              </span>
            </div>
          </div>
        </div>

        {/* 2. About This Project */}
        <div className="py-5 border-b border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            About This Project
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Chroma Studio is a browser-based color intelligence and design toolkit created to help users explore colors, convert color formats, generate palettes, create gradients, and work with professional color systems. Engineered to run completely client-side without any backend, external tracking, or third-party API dependencies.
          </p>
        </div>

        {/* 3. Development Focus */}
        <div className="py-5 border-b border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Development Focus
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {developmentFocus.map((focus) => (
              <div
                key={focus.title}
                className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                  {focus.icon}
                  <h4>{focus.title}</h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {focus.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Contact & 10 Verified Social Links */}
        <div className="pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Social Channels
            </h3>
            <a
              href="mailto:hazimbashir.dev@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Mail className="w-3 h-3" />
              hazimbashir.dev@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SOCIAL_PROFILES.map((profile) => {
              const IconComp = profile.Icon;
              return (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.ariaLabel}
                  className="group flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/5 dark:hover:border-white/20 transition-all duration-150"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white mb-1.5 transition-transform duration-150 group-hover:scale-105"
                    style={{ backgroundColor: `${profile.color}25`, color: profile.color }}
                  >
                    <IconComp size={16} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-white flex items-center gap-0.5">
                    {profile.name}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full">
                    {profile.username}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
