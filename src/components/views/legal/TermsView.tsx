import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { AlertTriangle } from 'lucide-react';

interface TermsViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-intro', title: '1. Introduction & Acceptance' },
    { id: 'sec-permitted', title: '2. Permitted Use & Creative Scope' },
    { id: 'sec-accuracy', title: '3. Color Accuracy & Production Notice' },
    { id: 'sec-user-resp', title: '4. User Responsibilities & Storage' },
    { id: 'sec-prohibited', title: '5. Prohibited Activities' },
    { id: 'sec-ip', title: '6. Intellectual Property' },
    { id: 'sec-dependencies', title: '7. Third-Party Resources' },
    { id: 'sec-availability', title: '8. Service Availability & PWA' },
    { id: 'sec-liability', title: '9. Limitation of Liability' },
    { id: 'sec-modifications', title: '10. Changes to Terms' },
    { id: 'sec-contact', title: '11. Contact & Communications' },
  ];

  return (
    <LegalDocumentLayout
      title="Terms &amp; Conditions"
      badge="Legal Agreement"
      lastUpdated="November 15, 2026"
      summary="These Terms &amp; Conditions govern your access to and use of Chroma Studio. Chroma Studio is a frontend-based color intelligence tool engineered to process calculations locally. By accessing the website, you agree to these terms, including important limitations regarding digital-to-physical color conversion."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. Introduction & Acceptance */}
      <section id="sec-intro" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Introduction &amp; Acceptance of Terms
        </h2>
        <p>
          Welcome to Chroma Studio. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) represent a binding legal agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and Chroma Studio (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;), engineered and maintained by software creator Hazim Bashir Faqeer.
        </p>
        <p>
          By visiting, browsing, opening tools, or utilizing features available on Chroma Studio, you explicitly acknowledge that you have read, understood, and agreed to be bound by these Terms and our companion Privacy Policy. If you do not agree with any provision of these Terms, you must discontinue using Chroma Studio immediately.
        </p>
      </section>

      {/* 2. Permitted Use & Creative Scope */}
      <section id="sec-permitted" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Permitted Use &amp; Creative Workflows
        </h2>
        <p>
          Chroma Studio is designed to empower software developers, UI/UX designers, digital illustrators, researchers, students, and creative professionals. You are granted a worldwide, non-exclusive, revocable license to use the tools for:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>Interactive color exploration, format conversion (HEX, RGB, HSL, HSV, CMYK), and mathematical inspection.</li>
          <li>Generating, modifying, harmonizing, and exporting color palettes for personal, educational, or commercial creative projects.</li>
          <li>Extracting dominant color swatches locally from images uploaded via your device.</li>
          <li>Testing relative optical luminance and contrast scores under WCAG 2.1 criteria.</li>
          <li>Exporting and integrating generated CSS code, Tailwind configurations, SCSS variables, and JSON structures into your digital products without royalties.</li>
        </ul>
      </section>

      {/* 3. Color Accuracy & Production Notice */}
      <section id="sec-accuracy" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          3. Color Accuracy &amp; Production Limitations Notice
        </h2>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wider text-xs">
              Critical Notice for Professional &amp; Print Workflows
            </p>
            <p className="leading-relaxed">
              You must always verify critical color values using calibrated spectrophotometers, certified physical color proof sheets, or press-ready ICC color profiles before committing color codes to commercial printing runs, textile dyes, injection molding, architectural coatings, or mass manufacturing.
            </p>
          </div>
        </div>

        <p>
          Digital color systems operate on additive optical physics (RGB digital light arrays), whereas physical printing relies on subtractive chemical pigments (CMYK inks). The conversion formulas provided across Chroma Studio are calculated using standard digital color science algorithms. However, actual physical perception may vary due to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li><strong>Display Hardware Variance:</strong> Differences between standard sRGB, Display P3, and Adobe RGB color spaces across monitors, smartphones, and operating system color management profiles.</li>
          <li><strong>Substrate &amp; Paper Finish:</strong> Coated, uncoated, matte, gloss, or synthetic media absorb and reflect physical light differently.</li>
          <li><strong>Ambient Lighting Conditions:</strong> Metamerism and optical perception shift between D50 print proofing light booths and ambient domestic lighting.</li>
        </ul>
      </section>

      {/* 4. User Responsibilities & Storage */}
      <section id="sec-user-resp" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. User Responsibilities &amp; Local Storage Persistence
        </h2>
        <p>
          Because Chroma Studio operates on an entirely client-side architecture without a central database, all saved favorites, custom palettes, and preferences are stored exclusively in your browser&rsquo;s <code>LocalStorage</code>.
        </p>
        <p>
          You are solely responsible for exporting your saved collections (via our built-in JSON export feature) before clearing your browser cookies, resetting website storage, or changing devices. Chroma Studio does not possess server-side backups of your saved color vaults.
        </p>
      </section>

      {/* 5. Prohibited Activities */}
      <section id="sec-prohibited" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Prohibited Activities
        </h2>
        <p>
          When accessing or utilizing Chroma Studio, you explicitly agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>Engage in automated denial-of-service (DoS/DDoS) attempts or actions intended to degrade website delivery.</li>
          <li>Transmit or drop malicious scripts, exploit payloads, or malicious executables disguised as image files into the client canvas processor.</li>
          <li>Attempt to misrepresent yourself as the creator or owner of Chroma Studio software.</li>
          <li>Use automated scrapers in an abusive manner that violates standard web delivery practices.</li>
        </ul>
      </section>

      {/* 6. Intellectual Property */}
      <section id="sec-ip" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          6. Intellectual Property &amp; Branding
        </h2>
        <p>
          The Chroma Studio name, logo mark, visual design interface, custom typography styling, component implementations, and original documentation are the intellectual property of Hazim Bashir Faqeer.
        </p>
        <p>
          Universal mathematical color models (RGB, HEX, HSL, HSV, CMYK), standard W3C CSS color names (such as &ldquo;Crimson&rdquo; or &ldquo;DodgerBlue&rdquo;), and public mathematical constants belong to the public domain and are not claimed as proprietary by Chroma Studio. You retain complete ownership of palettes created by you.
        </p>
      </section>

      {/* 7. Third-Party Resources */}
      <section id="sec-dependencies" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          7. Third-Party Resources &amp; Open Source
        </h2>
        <p>
          Chroma Studio is built with modern, battle-tested open-source software libraries, including React, TypeScript, Tailwind CSS, and Lucide Icons. These components are distributed under their respective licenses (MIT, ISC, Apache 2.0). A complete breakdown is documented on our <button type="button" onClick={() => onNavigate('licenses')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Licenses &amp; Credits</button> page.
        </p>
      </section>

      {/* 8. Service Availability & PWA */}
      <section id="sec-availability" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          8. Service Availability &amp; Offline Operation
        </h2>
        <p>
          Chroma Studio includes Progressive Web App (PWA) capabilities and Service Worker precaching, allowing it to launch and operate offline once initially loaded. While we strive to maintain uninterrupted service, we do not warrant that hosting infrastructure will be completely error-free or accessible at all times.
        </p>
      </section>

      {/* 9. Limitation of Liability */}
      <section id="sec-liability" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          9. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, Chroma Studio, its software creator, and contributors provide the software &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, either express or implied.
        </p>
        <p>
          Under no circumstances shall Chroma Studio be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of: (a) physical manufacturing or printing errors caused by unverified color codes; (b) accidental data loss in browser local storage; (c) incompatibility with specific hardware or operating systems.
        </p>
      </section>

      {/* 10. Modifications to Terms */}
      <section id="sec-modifications" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          10. Changes &amp; Modifications to Terms
        </h2>
        <p>
          We reserve the right to modify these Terms at our discretion as new color utilities or web capabilities are introduced. Any amendments will be reflected on this page with an updated &ldquo;Last Updated&rdquo; timestamp. Continued use of Chroma Studio after modifications constitutes acceptance of the amended Terms.
        </p>
      </section>

      {/* 11. Contact & Communications */}
      <section id="sec-contact" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          11. Contact Information
        </h2>
        <p>
          If you have questions, feedback, or legal inquiries concerning these Terms &amp; Conditions, please contact:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1 font-mono text-xs">
          <p className="font-bold text-slate-900 dark:text-white">HAZIM BASHIR FAQEER</p>
          <p className="text-slate-600 dark:text-slate-400">Android Developer &amp; Software Creator</p>
          <p className="text-slate-600 dark:text-slate-400">Ganderbal, Jammu &amp; Kashmir, India</p>
          <p className="text-indigo-600 dark:text-indigo-400">
            Email: <a href="mailto:hazimbashir.dev@gmail.com" className="hover:underline">hazimbashir.dev@gmail.com</a>
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
};
