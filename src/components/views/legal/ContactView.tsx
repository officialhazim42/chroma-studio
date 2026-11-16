import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import {
  Mail,
  Bug,
  Lightbulb,
  ShieldCheck,
  Code,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { SOCIAL_PROFILES } from '../../../utils/socialProfiles';
import { DEVELOPER_LOGO_SRC, DEVELOPER_LOGO_ALT } from '../../../utils/developerAssets';

interface ContactViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenDevModal?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenDevModal }) => {
  const toc: TocItem[] = [
    { id: 'sec-overview', title: '1. Developer Identity' },
    { id: 'sec-channels', title: '2. Communication Channels' },
    { id: 'sec-topics', title: '3. What You Can Contact Us About' },
    { id: 'sec-social', title: '4. Verified Channels' },
    { id: 'sec-transparency', title: '5. Direct Communication Policy' },
  ];

  const contactTopics = [
    {
      icon: <Bug className="w-5 h-5 text-rose-500" />,
      title: 'Bug Reports & Technical Glitches',
      description: 'Discovered an inaccurate color conversion, calculation issue, or rendering glitch? Send us the details and device specs.',
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      title: 'Feature Suggestions & Color Tools',
      description: 'Have ideas for new color space matrices, design export formats, or palette harmonizers? We welcome your input.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Privacy & Architecture Inquiries',
      description: 'Questions regarding our client-side computing architecture, local storage usage, or compliance statements.',
    },
    {
      icon: <Code className="w-5 h-5 text-indigo-500" />,
      title: 'Developer & Open-Source Collaboration',
      description: 'Technical inquiries from software engineers integrating Chroma Studio exported color models into apps and games.',
    },
  ];

  return (
    <LegalDocumentLayout
      title="Contact &amp; Support"
      badge="Direct Developer Support"
      lastUpdated="November 15, 2026"
      summary="Chroma Studio values transparent, direct communication. We do not use non-functional forms requiring backend servers. Connect directly with software creator Hazim Bashir Faqeer for bug reports, feature suggestions, and inquiries."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. Developer Identity Card */}
      <section id="sec-overview" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Developer Identity &amp; Creator Profile
        </h2>

        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-md shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={DEVELOPER_LOGO_SRC}
                  alt={DEVELOPER_LOGO_ALT}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  HAZIM BASHIR FAQEER
                </h3>
                <span className="text-sm font-arabic font-medium text-indigo-600 dark:text-indigo-400" dir="rtl">
                  حازم بشیر
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                Android Developer &amp; Software Creator
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Ganderbal, Jammu &amp; Kashmir, India</span>
              </div>
            </div>
          </div>

          {onOpenDevModal && (
            <button
              type="button"
              onClick={onOpenDevModal}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>View Full Bio</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. Direct Communication Channels */}
      <section id="sec-channels" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-500" />
          <span>2. Direct Communication Channels</span>
        </h2>
        <p>
          We do not employ non-functional web forms that silently fail or send spam to unmonitored databases. For the fastest response, send an email directly to our official inbox:
        </p>

        <div className="p-6 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Primary Verified Email
            </p>
            <p className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white mt-0.5">
              hazimbashir.dev@gmail.com
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Monitored regularly for technical feedback, bug reports, and project collaborations.
            </p>
          </div>

          <a
            href="mailto:hazimbashir.dev@gmail.com"
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Email</span>
          </a>
        </div>
      </section>

      {/* 3. What You Can Contact Us About */}
      <section id="sec-topics" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-500" />
          <span>3. Topics You Can Contact Us About</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactTopics.map((topic) => (
            <div
              key={topic.title}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                {topic.icon}
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {topic.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Verified Channels */}
      <section id="sec-social" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Verified Social Channels
        </h2>
        <p>
          Connect across approved digital channels maintained under the official handle <code>@officialhazim42</code>:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {SOCIAL_PROFILES.map((profile) => {
            const IconComp = profile.Icon;
            return (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/5 transition-all text-xs"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white mb-1.5 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${profile.color}25`, color: profile.color }}
                >
                  <IconComp size={15} />
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1">
                  <span>{profile.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="font-mono text-[10px] text-slate-400 truncate max-w-full">
                  {profile.username}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. Direct Communication Policy */}
      <section id="sec-transparency" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Direct Communication Policy
        </h2>
        <p>
          We respect your time and digital footprint. When you contact us by email:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
          <li>Your email address is used solely to respond to your inquiry and will never be added to marketing newsletters or sold to third parties.</li>
          <li>We aim to review and reply to legitimate bug reports and technical queries within 48 to 72 hours.</li>
          <li>For security bug disclosures, please include reproducible steps and browser/OS versions.</li>
        </ul>
      </section>
    </LegalDocumentLayout>
  );
};
