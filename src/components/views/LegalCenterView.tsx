import React, { useState } from 'react';
import {
  FileText,
  EyeOff,
  Cookie,
  AlertTriangle,
  Scale,
  Compass,
  Award,
  Mail,
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';

interface LegalCenterViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const LegalCenterView: React.FC<LegalCenterViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Documents' },
    { id: 'legal', label: 'Legal & Terms' },
    { id: 'privacy', label: 'Privacy & Cookies' },
    { id: 'technical', label: 'Color Science' },
    { id: 'compliance', label: 'Compliance & Trust' },
    { id: 'support', label: 'Support & Credits' },
  ];

  const documents: {
    id: ActiveTab;
    title: string;
    category: string;
    filterGroup: string;
    description: string;
    icon: React.ReactNode;
    lastUpdated: string;
    keywords: string[];
  }[] = [
    {
      id: 'terms',
      title: 'Terms & Conditions',
      category: 'Legal Agreement',
      filterGroup: 'legal',
      description: 'Comprehensive rules governing website usage, permitted and prohibited activities, tool accuracy limitations, and user responsibilities.',
      icon: <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['terms', 'conditions', 'rules', 'agreement', 'limitations', 'usage', 'liability'],
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      category: 'Privacy & Security',
      filterGroup: 'privacy',
      description: 'Transparent disclosure of our client-side architecture: zero server tracking, zero remote databases, no account creation, and local-only computation.',
      icon: <EyeOff className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['privacy', 'client-side', 'zero data collection', 'localStorage', 'security', 'cache'],
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      category: 'Tracking & Storage',
      filterGroup: 'privacy',
      description: 'Confirmation that Chroma Studio uses zero HTTP tracking cookies or advertising pixels. Details on local storage and PWA cache mechanics.',
      icon: <Cookie className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['cookies', 'localstorage', 'cache', 'tracking', 'no cookies', 'gdpr', 'ccpa'],
    },
    {
      id: 'disclaimer',
      title: 'Technical & Color Disclaimer',
      category: 'Color Science',
      filterGroup: 'technical',
      description: 'Essential physical printing and screen variance disclaimers: additive RGB vs subtractive CMYK gamut differences, metamerism, and display calibrations.',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['disclaimer', 'cmyk', 'rgb', 'gamut', 'printing', 'screen calibration', 'accuracy'],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      category: 'Legal Agreement',
      filterGroup: 'legal',
      description: 'Rules for fair and responsible usage of Chroma Studio client-side tools, preventing automated abuse, malicious payloads, and unauthorized scraping.',
      icon: <CheckCircle2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['acceptable use', 'fair use', 'abuse', 'prohibited', 'safety', 'guidelines'],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Policy',
      category: 'Copyright & IP',
      filterGroup: 'legal',
      description: 'Confirmation of creator ownership rights, clarifying that all palettes, gradients, and schemes you export are 100% royalty-free and owned by you.',
      icon: <Scale className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['intellectual property', 'copyright', 'palettes', 'ownership', 'license', 'trademarks'],
    },
    {
      id: 'accessibility',
      title: 'Accessibility Statement',
      category: 'Compliance',
      filterGroup: 'compliance',
      description: 'Our ongoing dedication to WCAG 2.1 Level AA conformance, keyboard operability, color vision deficiency simulators, and assistive technology support.',
      icon: <Compass className="w-5 h-5 text-teal-500 dark:text-teal-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['accessibility', 'wcag', 'keyboard', 'contrast', 'screen reader', 'blindness', 'a11y'],
    },
    {
      id: 'licenses',
      title: 'Open Source Licenses & Credits',
      category: 'Attribution & Software',
      filterGroup: 'support',
      description: 'Complete inventory of trusted third-party open-source libraries, packages, fonts, and frameworks powering Chroma Studio, with corresponding licenses.',
      icon: <Award className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['licenses', 'credits', 'open source', 'react', 'tailwind', 'dependencies', 'mit'],
    },
    {
      id: 'contact',
      title: 'Contact & Support',
      category: 'Direct Developer Support',
      filterGroup: 'support',
      description: 'Official direct communication channels for general inquiries, bug submissions, feature requests, accessibility feedback, and privacy questions.',
      icon: <Mail className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      lastUpdated: 'November 15, 2026',
      keywords: ['contact', 'support', 'developer', 'email', 'bug report', 'help', 'feedback'],
    },
  ];

  const q = searchQuery.trim().toLowerCase();
  const filtered = documents.filter((doc) => {
    const matchesFilter = selectedFilter === 'all' || doc.filterGroup === selectedFilter;
    const matchesSearch =
      !q ||
      doc.title.toLowerCase().includes(q) ||
      doc.description.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q) ||
      doc.keywords.some((k) => k.includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs font-semibold font-mono text-indigo-700 dark:text-indigo-300 mb-4 shadow-2xs">
          <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>CHROMA STUDIO &middot; LEGAL &amp; INFORMATION CENTER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Trust, Transparency &amp; Compliance
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          Explore complete documentation regarding our privacy-by-design architecture, terms of service, cookie practices, color science limitations, and open-source licensing.
        </p>

        {/* Search Input Bar */}
        <div className="relative mt-8 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal documents, policies, licenses, cookies..."
            className="w-full bg-white dark:bg-[#12131A] border border-slate-300 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Architecture Guarantee Highlight Banner */}
      <div className="mb-10 p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              100% Client-Side In-Browser Architecture
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Chroma Studio requires no account registration, utilizes no server database, and never sends your uploaded images or palettes to remote endpoints.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('privacy')}
          className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 shadow-2xs cursor-pointer flex items-center gap-1.5"
        >
          <span>Read Privacy Architecture</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onNavigate(doc.id)}
            className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
                  {doc.icon}
                </div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                  {doc.category}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {doc.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {doc.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-slate-400">
                {doc.lastUpdated}
              </span>

              <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                <span>Read Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl">
          <p className="text-slate-500 text-sm">No legal or policy documents found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('all');
            }}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Direct Contact Card */}
      <div className="mt-12 p-8 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1">
            NEED ASSISTANCE OR HAVE FEEDBACK?
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Direct Developer &amp; Accessibility Support
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Have questions about color conversions, privacy, or accessibility? Reach out directly to Hazim Bashir Faqeer.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <span>Open Support Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
