import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { Award, Code2 } from 'lucide-react';

interface LicensesViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const LicensesView: React.FC<LicensesViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-overview', title: '1. Open-Source Philosophy' },
    { id: 'sec-runtime', title: '2. Runtime Dependencies & Packages' },
    { id: 'sec-dev', title: '3. Build & Tooling Infrastructure' },
    { id: 'sec-fonts', title: '4. Native System Typography' },
    { id: 'sec-attribution', title: '5. Attribution & Disclaimers' },
    { id: 'sec-contact', title: '6. Inquiries' },
  ];

  const runtimePackages = [
    {
      name: 'React & React-DOM',
      version: 'v19.3.1',
      license: 'MIT License',
      author: 'Meta Platforms, Inc. and affiliates',
      purpose: 'Core declarative component architecture and virtual DOM rendering.',
    },
    {
      name: 'Lucide React',
      version: 'v1.73.0',
      license: 'ISC License',
      author: 'Lucide Contributors (based on Feather Icons by Cole Bemis)',
      purpose: 'Clean, accessible, lightweight SVG iconography across the entire application.',
    },
    {
      name: 'Canvas Confetti',
      version: 'v1.9.4',
      license: 'ISC License',
      author: 'Kiril Vatev',
      purpose: 'Lightweight HTML5 canvas micro-animations for export and copy delight.',
    },
    {
      name: 'clsx & tailwind-merge',
      version: 'v2.1.1 / v3.7.0',
      license: 'MIT License',
      author: 'Luke Edwards / Dany Dyson',
      purpose: 'Dynamic conditional class name construction and conflicting Tailwind class resolution.',
    },
  ];

  const buildPackages = [
    {
      name: 'Vite & @vitejs/plugin-react',
      version: 'v8.3.6',
      license: 'MIT License',
      author: 'Evan You and Vite Contributors',
      purpose: 'Next-generation ESM frontend bundler and blazing-fast development server.',
    },
    {
      name: 'Tailwind CSS & @tailwindcss/vite',
      version: 'v4.3.5',
      license: 'MIT License',
      author: 'Tailwind Labs, Inc.',
      purpose: 'Modern utility-first CSS engine powering responsive layouts and themes.',
    },
    {
      name: 'TypeScript',
      version: 'v7.0.2',
      license: 'Apache License 2.0',
      author: 'Microsoft Corporation',
      purpose: 'Strict static type checking and code consistency verification.',
    },
    {
      name: 'Oxlint',
      version: 'v1.90.0',
      license: 'MIT License',
      author: 'Boshen and Oxlint Contributors',
      purpose: 'High-performance Rust-based static code linter.',
    },
    {
      name: 'Playwright',
      version: 'v1.65.1',
      license: 'Apache License 2.0',
      author: 'Microsoft Corporation',
      purpose: 'End-to-end browser verification and cross-viewport responsive testing.',
    },
  ];

  return (
    <LegalDocumentLayout
      title="Open Source Licenses &amp; Credits"
      badge="Attribution &amp; Packages"
      lastUpdated="November 15, 2026"
      summary="Chroma Studio is built upon the shoulders of remarkable open-source engineering. This page provides full attribution and transparent licensing disclosure for all production runtime packages and build-time tooling utilized across the application."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. Overview */}
      <section id="sec-overview" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Open-Source Philosophy &amp; Attribution
        </h2>
        <p>
          We believe in giving credit where credit is due. Chroma Studio leverages well-maintained, battle-tested open-source libraries that enable us to deliver a high-performance, private, client-side application.
        </p>
        <p>
          All dependencies are licensed under permissive open-source licenses (MIT, ISC, and Apache 2.0). We adhere strictly to the terms, copyright notices, and warranty disclaimers of these respective authors.
        </p>
      </section>

      {/* 2. Runtime Dependencies */}
      <section id="sec-runtime" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          <span>2. Production Runtime Dependencies</span>
        </h2>
        <p>
          These packages are bundled into the client-side distribution executing inside your browser:
        </p>

        <div className="space-y-3">
          {runtimePackages.map((pkg) => (
            <div
              key={pkg.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {pkg.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {pkg.version}
                  </span>
                  <span className="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-500/20">
                    {pkg.license}
                  </span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{pkg.purpose}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-500">Copyright &copy; {pkg.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Build & Tooling Infrastructure */}
      <section id="sec-dev" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-500" />
          <span>3. Development &amp; Build-Time Tooling</span>
        </h2>
        <p>
          These development frameworks ensure rigorous type safety, bundling, and automated testing:
        </p>

        <div className="space-y-3">
          {buildPackages.map((pkg) => (
            <div
              key={pkg.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {pkg.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {pkg.version}
                  </span>
                  <span className="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-500/20">
                    {pkg.license}
                  </span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{pkg.purpose}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-500">Copyright &copy; {pkg.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Native System Typography */}
      <section id="sec-fonts" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Native System Typography (Zero Remote Font Tracking)
        </h2>
        <p>
          Unlike websites that load web fonts from third-party CDNs (which can leak IP addresses and font request metadata), Chroma Studio renders exclusively using native system font stacks:
        </p>
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
          font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif;
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This delivers optimal sub-millisecond rendering speed, zero network layout shifts, and absolute privacy.
        </p>
      </section>

      {/* 5. Attribution & Disclaimers */}
      <section id="sec-attribution" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Licensing Disclaimers
        </h2>
        <p>
          The third-party software packages listed above are provided by their respective copyright holders &ldquo;as is&rdquo;, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement.
        </p>
      </section>

      {/* 6. Contact */}
      <section id="sec-contact" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          6. Licensing Inquiries
        </h2>
        <p>
          If you have questions regarding package attribution or licenses, please contact:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1 font-mono text-xs">
          <p className="font-bold text-slate-900 dark:text-white">HAZIM BASHIR FAQEER</p>
          <p className="text-slate-600 dark:text-slate-400">Android Developer &amp; Software Creator</p>
          <p className="text-indigo-600 dark:text-indigo-400">
            Email: <a href="mailto:hazimbashir.dev@gmail.com" className="hover:underline">hazimbashir.dev@gmail.com</a>
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
};
