import React from 'react';
import {
  MapPin,
  Mail,
  ShieldCheck,
  Cpu,
  Layers,
  Palette,
  Eye,
  WifiOff,
  Code2,
  ExternalLink,
} from 'lucide-react';
import { SOCIAL_PROFILES } from '../../utils/socialProfiles';
import { DEVELOPER_LOGO_SRC, DEVELOPER_LOGO_ALT } from '../../utils/developerAssets';

export const AboutView: React.FC = () => {
  const developmentFocus = [
    {
      title: 'Frontend Engineering',
      icon: <Cpu className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      desc: 'Modular, strictly typed component architecture built with React and TypeScript for maximum maintainability and zero runtime overhead.',
    },
    {
      title: 'Color Science',
      icon: <Palette className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      desc: 'Accurate color math covering HEX, RGB, HSL, HSV, and CMYK bidirectional matrix conversions, WCAG 2.1 AA/AAA contrast ratios, and harmonic models.',
    },
    {
      title: 'Responsive UI Design',
      icon: <Layers className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      desc: 'Fluid layouts, ergonomic touch targets, and balanced typography tested across mobile, tablet, and desktop viewports.',
    },
    {
      title: 'Browser-Based Processing',
      icon: <Eye className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      desc: '100% client-side computing with zero remote servers, zero external API keys, zero user tracking, and absolute data privacy.',
    },
    {
      title: 'Offline-First Experience',
      icon: <WifiOff className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
      desc: 'Full Progressive Web App capabilities powered by service-worker precaching, local image extraction, and resilient LocalStorage.',
    },
  ];

  const projectTechnologies = [
    { name: 'React', category: 'UI Library' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Tailwind CSS', category: 'Styling System' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'HTML5 Canvas API', category: 'Image Extraction' },
    { name: 'Service Worker', category: 'PWA & Offline' },
    { name: 'LocalStorage', category: 'Client Persistence' },
    { name: 'Color Conversion Math', category: 'Matrix Calculations' },
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Profile Header */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-200 dark:border-white/10 relative">
          <div className="relative group shrink-0">
            <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-[14px] sm:rounded-[22px] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={DEVELOPER_LOGO_SRC}
                  alt={DEVELOPER_LOGO_ALT}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white dark:border-[#12131A] shadow-xs"
              title="Active Creator"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                HAZIM BASHIR FAQEER
              </h1>
              <span className="text-xl font-arabic font-medium text-indigo-600 dark:text-indigo-400" dir="rtl">
                حازم بشیر
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 mt-1">
              Android Developer &amp; Software Creator
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 px-2.5 py-1 rounded-lg font-semibold">
                Designed and Developed by @officialhazim42
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Ganderbal, Jammu &amp; Kashmir, India
              </span>
              <a
                href="mailto:hazimbashir.dev@gmail.com"
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                hazimbashir.dev@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* About This Project */}
        <div className="py-8 border-b border-slate-200 dark:border-white/10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            About Chroma Studio
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
            Chroma Studio is a browser-based color intelligence and design toolkit created to help users explore colors, convert color formats, generate palettes, create gradients, and work with professional color systems.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-3 font-normal">
            Engineered with a strict privacy-first and offline-first ethos: all pixel extraction, mathematical conversions, and palette harmonizations execute directly inside the user&apos;s browser with zero external analytics, zero remote API calls, and zero tracking.
          </p>
        </div>

        {/* Development Focus */}
        <div className="py-8 border-b border-slate-200 dark:border-white/10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Development Focus
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {developmentFocus.map((focus) => (
              <div
                key={focus.title}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
              >
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 dark:text-white">
                  {focus.icon}
                  <h3>{focus.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {focus.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Technologies */}
        <div className="py-8 border-b border-slate-200 dark:border-white/10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Core Technologies Powering This Project
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {projectTechnologies.map((tech) => (
              <div
                key={tech.name}
                className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
              >
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  {tech.name}
                </p>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  {tech.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Verified Social Channels */}
        <div className="pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Verified Social Channels
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Connect with Hazim Bashir Faqeer across approved platforms
              </p>
            </div>
            <a
              href="mailto:hazimbashir.dev@gmail.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Direct Email
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {SOCIAL_PROFILES.map((profile) => {
              const IconComp = profile.Icon;
              return (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.ariaLabel}
                  className="group flex flex-col items-center text-center p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-white/[0.02] dark:hover:bg-white/[0.08] dark:border-white/5 dark:hover:border-white/20 transition-all duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-2 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: `${profile.color}25`, color: profile.color }}
                  >
                    <IconComp size={20} />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-white flex items-center gap-1">
                    {profile.name}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full mt-0.5">
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
