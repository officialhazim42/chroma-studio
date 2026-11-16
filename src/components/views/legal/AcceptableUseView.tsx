import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { ShieldAlert, Cpu, HeartHandshake } from 'lucide-react';

interface AcceptableUseViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AcceptableUseView: React.FC<AcceptableUseViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-purpose', title: '1. Purpose & Scope' },
    { id: 'sec-permitted', title: '2. Lawful & Permitted Use' },
    { id: 'sec-prohibited', title: '3. Prohibited Misuse & Activities' },
    { id: 'sec-tool-integrity', title: '4. Computational & Platform Integrity' },
    { id: 'sec-ip-respect', title: '5. Intellectual Property Respect' },
    { id: 'sec-enforcement', title: '6. Enforcement & Security Protections' },
    { id: 'sec-contact', title: '7. Reporting Violations & Inquiries' },
  ];

  return (
    <LegalDocumentLayout
      title="Acceptable Use Policy"
      badge="Platform Conduct"
      lastUpdated="November 15, 2026"
      summary="This Acceptable Use Policy defines standards of lawful, fair, and responsible interaction with Chroma Studio. It ensures our open, privacy-first web utilities remain stable, accessible, and safe for digital creators worldwide."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. Purpose & Scope */}
      <section id="sec-purpose" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Purpose &amp; Scope
        </h2>
        <p>
          Chroma Studio is engineered to provide high-performance, client-side color intelligence freely accessible to developers, artists, and creators globally. This Acceptable Use Policy (&ldquo;AUP&rdquo;) outlines the standards expected of all visitors accessing our web platform.
        </p>
      </section>

      {/* 2. Lawful & Permitted Use */}
      <section id="sec-permitted" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-emerald-500" />
          <span>2. Lawful &amp; Permitted Use</span>
        </h2>
        <p>
          You are welcome to use Chroma Studio for legitimate creative, educational, personal, and professional workflows, including:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>Inspecting, converting, harmonizing, and creating digital color schemes for apps, websites, branding, and games.</li>
          <li>Sampling pixel values from your own images or assets you have legal permission to utilize.</li>
          <li>Exporting palettes, CSS variables, Android XML structures, and JSON definitions for integration into client or personal software.</li>
          <li>Utilizing Chroma Studio in classroom settings, design workshops, and educational tutorials.</li>
        </ul>
      </section>

      {/* 3. Prohibited Misuse */}
      <section id="sec-prohibited" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <span>3. Prohibited Misuse &amp; Harmful Activities</span>
        </h2>
        <p>
          You agree not to engage in any of the following prohibited behaviors:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Denial of Service Attacks:</strong> Launching automated request loops, high-volume stress testing, or DDoS scripts targeting our hosting infrastructure.
          </li>
          <li>
            <strong>Malicious Payload Delivery:</strong> Dragging, uploading, or attempting to execute corrupted files, buffer-overflow exploits, or malicious code designed to compromise client browser sessions.
          </li>
          <li>
            <strong>Aggressive Scraping:</strong> Deploying abusive bot crawlers that hammer static asset CDNs or degrade service for legitimate human visitors.
          </li>
          <li>
            <strong>Impersonation &amp; Deception:</strong> Removing attribution headers to falsely claim sole authorship of the underlying Chroma Studio software engine.
          </li>
          <li>
            <strong>Illegal Workflows:</strong> Using the platform in connection with unlawful activities under applicable regional laws.
          </li>
        </ul>
      </section>

      {/* 4. Computational & Platform Integrity */}
      <section id="sec-tool-integrity" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>4. Computational &amp; Platform Integrity</span>
        </h2>
        <p>
          Because Chroma Studio executes intensive operations (such as color space matrix transformations and image pixel quantization) locally on your device&rsquo;s CPU, users should ensure their hardware is equipped to handle large images responsibly. While our software incorporates canvas downscaling to prevent system lockups, uploading abnormally large image files (&gt;25 MB) may cause high memory consumption on constrained mobile devices.
        </p>
      </section>

      {/* 5. Intellectual Property Respect */}
      <section id="sec-ip-respect" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Respect for Intellectual Property
        </h2>
        <p>
          Users must respect the copyright and intellectual property rights of others. When using the Image Color Picker tool, only upload images that you own, have licensed, or are authorized to sample for creative extraction.
        </p>
      </section>

      {/* 6. Enforcement & Security Protections */}
      <section id="sec-enforcement" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          6. Enforcement &amp; Security Protections
        </h2>
        <p>
          Our static web hosting providers employ automated firewall protections and rate limiting to repel malicious automated traffic. We reserve the right to block abusive IP addresses or subnets that demonstrate sustained denial-of-service attempts.
        </p>
      </section>

      {/* 7. Contact */}
      <section id="sec-contact" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          7. Reporting Violations &amp; Contact
        </h2>
        <p>
          To report security vulnerabilities or violations of this policy, please reach out directly:
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
