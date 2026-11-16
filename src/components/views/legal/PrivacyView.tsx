import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { ShieldCheck, EyeOff, ServerOff } from 'lucide-react';

interface PrivacyViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-overview', title: '1. Privacy-First Architecture' },
    { id: 'sec-collection', title: '2. Information We Collect' },
    { id: 'sec-localstorage', title: '3. Browser LocalStorage Usage' },
    { id: 'sec-images', title: '4. Image Privacy & Local Canvas' },
    { id: 'sec-thirdparty', title: '5. Third-Party & Hosting Services' },
    { id: 'sec-retention', title: '6. Data Retention & Control' },
    { id: 'sec-children', title: '7. Children’s Privacy' },
    { id: 'sec-security', title: '8. Security Measures' },
    { id: 'sec-updates', title: '9. Policy Modifications' },
    { id: 'sec-contact', title: '10. Contact & Inquiries' },
  ];

  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      badge="Privacy &amp; Data Architecture"
      lastUpdated="November 15, 2026"
      summary="Chroma Studio is built upon a strict privacy-first foundation. The application operates entirely client-side without user registration, backend databases, remote analytics trackers, or external image-processing servers. Your colors and images remain exclusively on your device."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. Privacy-First Architecture */}
      <section id="sec-overview" className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Privacy-First Architecture
        </h2>
        <p>
          At Chroma Studio, we believe software utilities should treat user privacy as a fundamental architectural requirement rather than an afterthought. Chroma Studio was deliberately designed from the ground up to operate as a completely standalone, client-side web application.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-start gap-3">
            <ServerOff className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">No Backend Database</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                We maintain no remote databases, user accounts, password stores, or cloud servers storing your personal data.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Zero Behavioral Tracking</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                No Google Analytics, Meta Pixels, fingerprinting scripts, or third-party marketing tags are embedded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Information We Collect */}
      <section id="sec-collection" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Information We Collect
        </h2>
        <p>
          To maintain transparency, we distinguish between information handled intentionally by Chroma Studio and information collected automatically by standard web hosting infrastructure:
        </p>
        <div className="space-y-3 text-slate-700 dark:text-slate-300">
          <p>
            <strong>A. Application-Level Data: None.</strong> Chroma Studio does not prompt for your name, email address, physical location, phone number, or payment details. You do not need to register an account or log in to use any tool.
          </p>
          <p>
            <strong>B. Web Hosting Provider Server Logs:</strong> When you access any website on the internet, the static hosting provider&rsquo;s servers (such as GitHub Pages or a static CDN) automatically log standard technical requests to ensure uptime and DDoS protection. These ephemeral server access logs typically include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Your Internet Protocol (IP) address.</li>
            <li>Browser type and version (User-Agent string).</li>
            <li>Referring URL and requested page asset paths.</li>
            <li>Date and time of request.</li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Chroma Studio does not combine or correlate hosting access logs with individual identities.
          </p>
        </div>
      </section>

      {/* 3. Browser LocalStorage Usage */}
      <section id="sec-localstorage" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          3. Browser LocalStorage Usage
        </h2>
        <p>
          Chroma Studio utilizes the browser&rsquo;s built-in <code>localStorage</code> API to persist user settings locally across sessions. Specifically, only two data keys are stored:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-white/5 font-semibold text-slate-900 dark:text-white">
              <tr>
                <th className="p-3">Storage Key</th>
                <th className="p-3">Content Stored</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-mono">
              <tr>
                <td className="p-3 text-indigo-600 dark:text-indigo-400">chroma_theme_mode</td>
                <td className="p-3">&ldquo;light&rdquo; | &ldquo;dark&rdquo; | &ldquo;system&rdquo;</td>
                <td className="p-3 font-sans">Preserves your visual interface theme preference.</td>
              </tr>
              <tr>
                <td className="p-3 text-indigo-600 dark:text-indigo-400">chroma_studio_favorites</td>
                <td className="p-3">JSON array of saved color items</td>
                <td className="p-3 font-sans">Stores colors, palettes, and gradients you click to save.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This data remains strictly on your device and is never transmitted over the internet to any server.
        </p>
      </section>

      {/* 4. Image Privacy & Local Canvas */}
      <section id="sec-images" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Image Privacy &amp; Local Canvas Processing
        </h2>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wider text-xs">
              Absolute Local Image Processing Guarantee
            </p>
            <p className="leading-relaxed">
              When you drag, drop, upload, or paste an image into the Image Color Picker tool, the image is loaded into your browser&rsquo;s memory via the HTML5 Canvas API. The image bytes are NEVER sent or uploaded to any remote server or third-party AI service.
            </p>
          </div>
        </div>

        <p>
          Pixel inspection, color quantization, loupe magnification, and dominant palette extractions are computed entirely by your device&rsquo;s central processing unit (CPU/GPU). When you replace an image or close the browser tab, the object URLs and canvas memory allocations are released by the browser runtime.
        </p>
      </section>

      {/* 5. Third-Party & Hosting Services */}
      <section id="sec-thirdparty" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Third-Party &amp; Hosting Services
        </h2>
        <p>
          Chroma Studio does not integrate third-party advertising networks, marketing pixels, social tracker widgets, or behavioral analysis tools.
        </p>
        <p>
          The static compiled files (HTML, JavaScript, CSS, and SVG assets) are hosted on standard web infrastructure. Any technical request to retrieve these assets is governed by the hosting provider&rsquo;s operational security policies.
        </p>
      </section>

      {/* 6. Data Retention & Control */}
      <section id="sec-retention" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          6. Data Retention &amp; User Control
        </h2>
        <p>
          Because all persisted data resides strictly on your local device, you retain total control over your information at all times:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li><strong>In-App Clearing:</strong> You can purge all saved favorites and custom palettes anytime by navigating to the <button type="button" onClick={() => onNavigate('favorites')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Saved Favorites</button> page and clicking &ldquo;Clear All&rdquo;.</li>
          <li><strong>Browser Clearing:</strong> You can clear all website storage via your browser settings under <em>Privacy &amp; Security &rarr; Clear Site Data &rarr; LocalStorage / Cookies</em>.</li>
          <li><strong>JSON Backup:</strong> You can export your entire collection as a portable JSON file to back up your favorites prior to clearing your browser.</li>
        </ul>
      </section>

      {/* 7. Children's Privacy */}
      <section id="sec-children" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          7. Children&rsquo;s Privacy
        </h2>
        <p>
          Chroma Studio is an educational and professional color science tool accessible to users of all ages. Because we do not collect personal data, require user registration, or maintain user databases, we do not knowingly solicit or collect personally identifiable information from children under the age of 13 (or under 16 in applicable jurisdictions).
        </p>
      </section>

      {/* 8. Security Measures */}
      <section id="sec-security" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          8. Security Measures
        </h2>
        <p>
          All communications between your browser and Chroma Studio are encrypted using modern Transport Layer Security (TLS/HTTPS). Furthermore, because Chroma Studio does not operate a backend database or user authentication service, there is no centralized database vulnerable to remote credential stuffing or SQL injection exploits.
        </p>
      </section>

      {/* 9. Policy Modifications */}
      <section id="sec-updates" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          9. Changes &amp; Updates to this Policy
        </h2>
        <p>
          Should any future architectural changes occur (e.g. adding opt-in cloud sync features), this Privacy Policy will be revised transparently, and the &ldquo;Last Updated&rdquo; date will be adjusted accordingly. Continued use of Chroma Studio signifies acceptance of our ongoing privacy-by-design standards.
        </p>
      </section>

      {/* 10. Contact & Inquiries */}
      <section id="sec-contact" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          10. Contact &amp; Privacy Inquiries
        </h2>
        <p>
          If you have any questions or require technical clarification regarding our privacy architecture, please contact:
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
