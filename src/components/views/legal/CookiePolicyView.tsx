import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { Cookie, CheckCircle2, HardDrive } from 'lucide-react';

interface CookiePolicyViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const CookiePolicyView: React.FC<CookiePolicyViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-summary', title: '1. No Cookies Used Summary' },
    { id: 'sec-cookies-vs-storage', title: '2. HTTP Cookies vs Web Storage' },
    { id: 'sec-actual-tech', title: '3. Actual Storage Technologies in Use' },
    { id: 'sec-banner', title: '4. Why We Have No Cookie Banner' },
    { id: 'sec-manage', title: '5. Managing & Clearing Storage' },
    { id: 'sec-contact', title: '6. Inquiries' },
  ];

  return (
    <LegalDocumentLayout
      title="Cookie Policy"
      badge="Storage Disclosure"
      lastUpdated="November 15, 2026"
      summary="Chroma Studio does not use, create, or read any HTTP cookies. We use modern Web Storage (LocalStorage) and Service Worker asset caching strictly on your device to remember your theme preference, keep saved favorites, and enable offline PWA functionality. No consent banner is required."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. No Cookies Used Summary */}
      <section id="sec-summary" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Does Chroma Studio Use Cookies?
        </h2>

        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wider text-xs">
              Clear &amp; Direct Answer: No HTTP Cookies
            </p>
            <p className="leading-relaxed">
              Chroma Studio does NOT place, set, or transmit any HTTP cookies on your browser or device. There are zero tracking cookies, zero advertising cookies, zero analytics cookies, and zero third-party cross-site cookies embedded anywhere on this website.
            </p>
          </div>
        </div>

        <p>
          Many websites use the term &ldquo;cookie&rdquo; loosely to refer to all forms of browser storage. Under technical and legal standards, however, HTTP cookies and client-side Web Storage are fundamentally distinct technologies with vastly different privacy implications.
        </p>
      </section>

      {/* 2. HTTP Cookies vs Web Storage */}
      <section id="sec-cookies-vs-storage" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Understanding HTTP Cookies vs. Browser Web Storage
        </h2>
        <p>
          To maintain transparency, it is essential to clarify the technical distinctions between cookies and the Web Storage used by Chroma Studio:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                HTTP Cookies (NOT Used)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Small text strings stored by the browser that are <strong>automatically sent back to web servers with every single network request</strong> via HTTP headers. Commonly used for session tracking, user profiling, and third-party ad retargeting.
            </p>
            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
              &times; Not implemented in Chroma Studio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-indigo-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Web Storage / LocalStorage (Used)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Client-side key-value storage residing strictly in the browser&rsquo;s local sandbox. <strong>Never transmitted over network headers</strong> to any server. Stays 100% on your machine.
            </p>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              &check; Used only for your theme and saved colors.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Actual Storage Technologies in Use */}
      <section id="sec-actual-tech" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          3. Actual Client-Side Technologies in Use
        </h2>
        <p>
          Chroma Studio utilizes two specific browser mechanisms to deliver a seamless, offline-capable experience:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">
              A. window.localStorage (Web Storage API)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Used solely to store two preferences:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <li><code>chroma_theme_mode</code>: Saves your visual theme choice (&ldquo;light&rdquo; or &ldquo;dark&rdquo;).</li>
              <li><code>chroma_studio_favorites</code>: Holds color items, palettes, or gradients you click to save into your vault.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">
              B. CacheStorage &amp; Service Worker (PWA)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              As an installable Progressive Web App (PWA), Chroma Studio registers a Service Worker that caches static HTML, JavaScript bundle, and CSS assets locally in your browser&rsquo;s <code>CacheStorage</code>. This enables Chroma Studio to load instantly even without an active internet connection. It does not store user data or track browsing activity.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why We Have No Cookie Banner */}
      <section id="sec-banner" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Why You Do Not See a Cookie Consent Banner
        </h2>
        <p>
          Regulations such as the European Union ePrivacy Directive and GDPR require websites to obtain explicit prior consent via &ldquo;cookie banners&rdquo; when utilizing non-essential tracking cookies, cross-site analytics, or marketing pixels.
        </p>
        <p>
          Because Chroma Studio uses <strong>zero HTTP cookies</strong>, zero advertising trackers, and only uses client-side storage for features explicitly initiated by you (saving favorites and remembering your theme), <strong>no cookie consent pop-up is legally required</strong>. We believe in providing a clean, distraction-free creative workspace.
        </p>
      </section>

      {/* 5. Managing & Clearing Storage */}
      <section id="sec-manage" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. How to Manage or Clear Browser Storage
        </h2>
        <p>
          If you wish to delete your locally stored preferences or saved color collections, you can do so at any time:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li><strong>Direct In-App Clear:</strong> Visit <button type="button" onClick={() => onNavigate('favorites')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Saved Favorites</button> and click the &ldquo;Clear All&rdquo; button.</li>
          <li><strong>Chrome / Brave / Edge:</strong> Open <em>Settings &rarr; Privacy &amp; Security &rarr; Clear Browsing Data &rarr; Select &ldquo;Cookies and other site data&rdquo;</em>.</li>
          <li><strong>Firefox:</strong> Open <em>Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data &rarr; Clear Data</em>.</li>
          <li><strong>Safari:</strong> Open <em>Preferences &rarr; Privacy &rarr; Manage Website Data</em>, search for this domain and click &ldquo;Remove&rdquo;.</li>
        </ul>
      </section>

      {/* 6. Contact */}
      <section id="sec-contact" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          6. Technical Questions &amp; Inquiries
        </h2>
        <p>
          If you have technical questions regarding our browser storage implementation, please reach out to:
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
