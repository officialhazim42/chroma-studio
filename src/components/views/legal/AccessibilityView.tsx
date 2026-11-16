import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { Eye, CheckCircle2, Keyboard, Contrast, Layout, MessageSquare } from 'lucide-react';

interface AccessibilityViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AccessibilityView: React.FC<AccessibilityViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-commitment', title: '1. Our Inclusivity Commitment' },
    { id: 'sec-standards', title: '2. Standards & Framework' },
    { id: 'sec-implemented', title: '3. Implemented Accessibility Features' },
    { id: 'sec-colorblindness', title: '4. Color Blindness & Visual Assistance' },
    { id: 'sec-limitations', title: '5. Known Limitations & Roadmap' },
    { id: 'sec-feedback', title: '6. Accessibility Feedback' },
  ];

  return (
    <LegalDocumentLayout
      title="Accessibility Statement"
      badge="Universal Usability"
      lastUpdated="November 15, 2026"
      summary="Chroma Studio is committed to ensuring digital accessibility for all users, including individuals with motor, visual, and cognitive impairments. We engineer our interfaces adhering to W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level AA principles."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. Commitment */}
      <section id="sec-commitment" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Our Inclusivity Commitment
        </h2>
        <p>
          We believe that color intelligence and creative tools should be open and accessible to everyone. Digital accessibility is an essential engineering discipline woven into our component design, keyboard navigation support, and contrast hierarchies.
        </p>
      </section>

      {/* 2. Standards & Framework */}
      <section id="sec-standards" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Standards &amp; Conformance Status
        </h2>
        <p>
          Chroma Studio aims to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These guidelines define four core principles of web accessibility:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">1. Perceivable</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Information and user interface components must be presentable to users in ways they can perceive.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">2. Operable</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">User interface components and navigation must be fully operable using keyboard and assistive devices.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">3. Understandable</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Information and the operation of the user interface must be intuitive and predictable.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">4. Robust</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Content must be robust enough to be reliably interpreted by a wide variety of user agents, including assistive tech.</p>
          </div>
        </div>
      </section>

      {/* 3. Implemented Accessibility Features */}
      <section id="sec-implemented" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>3. Implemented Accessibility Features</span>
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-indigo-500" />
              <span>Full Keyboard Navigation &amp; Focus Indicators</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every interactive element &mdash; including navigation links, tool triggers, color swatch cards, and copy buttons &mdash; is keyboard-focusable using <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-[11px]">Tab</kbd> and actionable via <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-[11px]">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-[11px]">Space</kbd>. High-visibility <code>:focus-visible</code> focus rings with 2px offset ensure keyboard users always know their active position.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Contrast className="w-4 h-4 text-amber-500" />
              <span>Text Contrast Ratios Across Light &amp; Dark Themes</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All UI typography adheres to minimum contrast ratios (&ge; 4.5:1 for body copy and &ge; 3.0:1 for large headings) against backgrounds in both Light Theme and Dark Theme. Dynamic color swatch text automatically calculates underlying luminance to render either crisp `#0F172A` or pure `#FFFFFF` for guaranteed legibility.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-teal-500" />
              <span>Responsive Viewports &amp; Non-Overflowing Layouts</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tested rigorously from ultra-compact 320px mobile viewports up to 4K displays. Content reflows fluidly without horizontal scrollbars, and touch targets meet minimum 44×44px ergonomic standards.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Color Blindness Assistance */}
      <section id="sec-colorblindness" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-sky-500" />
          <span>4. Color Blindness &amp; Assistive Tools</span>
        </h2>
        <p>
          To help creators build accessible digital products, Chroma Studio includes two dedicated accessibility utilities:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>
            <strong><button type="button" onClick={() => onNavigate('tool-contrast')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">WCAG Contrast Checker:</button></strong> Validates any foreground and background color combination against AA and AAA guidelines for normal text, large text, and graphical UI components.
          </li>
          <li>
            <strong><button type="button" onClick={() => onNavigate('tool-blindness')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Color Blindness Simulator:</button></strong> Accurately models color perception under Protanopia, Deuteranopia, Tritanopia, and Achromatopsia using established Brettel/Machado LMS matrix transforms.
          </li>
        </ul>
      </section>

      {/* 5. Known Limitations */}
      <section id="sec-limitations" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Known Limitations &amp; Ongoing Roadmap
        </h2>
        <p>
          While we strive for comprehensive coverage, certain limitations are currently being addressed:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
          <li><strong>Complex HTML5 Canvas Sampling:</strong> The Image Color Picker loupe requires mouse or touch coordinates on a canvas, which cannot be fully replicated with standard screen-reader auditory readout. To mitigate this, dominant color palettes are presented in standard, accessible text lists.</li>
          <li><strong>Advanced Data Visualizations:</strong> Multi-stop gradient conic previews represent visual CSS syntax; text representations are always provided alongside visual graphics.</li>
        </ul>
      </section>

      {/* 6. Feedback Contact */}
      <section id="sec-feedback" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          <span>6. Accessibility Feedback &amp; Contact</span>
        </h2>
        <p>
          We welcome your feedback on the accessibility of Chroma Studio. If you encounter accessibility barriers, have difficulty operating any tool with assistive technology, or have recommendations for improvement, please contact us:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1 font-mono text-xs">
          <p className="font-bold text-slate-900 dark:text-white">HAZIM BASHIR FAQEER</p>
          <p className="text-slate-600 dark:text-slate-400">Accessibility Lead &amp; Software Creator</p>
          <p className="text-indigo-600 dark:text-indigo-400">
            Email: <a href="mailto:hazimbashir.dev@gmail.com" className="hover:underline">hazimbashir.dev@gmail.com</a>
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
};
