import React from 'react';
import { LegalDocumentLayout, TocItem } from './LegalDocumentLayout';
import { ActiveTab } from '../../../types/color';
import { AlertTriangle, Printer, Monitor, Eye, ShieldAlert } from 'lucide-react';

interface DisclaimerViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const DisclaimerView: React.FC<DisclaimerViewProps> = ({ onNavigate }) => {
  const toc: TocItem[] = [
    { id: 'sec-general', title: '1. General Informational Nature' },
    { id: 'sec-conversion', title: '2. Color Conversion Limitations' },
    { id: 'sec-cmyk', title: '3. Digital vs Physical CMYK Printing' },
    { id: 'sec-display', title: '4. Display Calibration & Gamut Variances' },
    { id: 'sec-wcag', title: '5. WCAG Accessibility Evaluation Limitations' },
    { id: 'sec-no-guarantee', title: '6. No Professional Design Guarantee' },
    { id: 'sec-thirdparty', title: '7. Third-Party Dependencies & Tools' },
    { id: 'sec-contact', title: '8. Contact Information' },
  ];

  return (
    <LegalDocumentLayout
      title="Technical &amp; Color Disclaimer"
      badge="Technical Scope &amp; Limitations"
      lastUpdated="November 15, 2026"
      summary="Chroma Studio provides color intelligence, conversions, and harmonic palettes for digital software design and educational exploration. Important technical limitations exist between additive digital RGB screens and physical subtractive CMYK printing. Always verify critical colors before commercial production."
      toc={toc}
      onNavigate={onNavigate}
    >
      {/* 1. General Informational Nature */}
      <section id="sec-general" className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. General Informational &amp; Educational Nature
        </h2>
        <p>
          The color tools, converters, contrast evaluators, palette generators, and simulations on Chroma Studio are offered strictly for educational, informational, and digital software development purposes.
        </p>
        <p>
          While every algorithm is implemented according to recognized digital color science standards (such as IEC 61966-2-1 for sRGB and W3C WCAG 2.1 relative luminance formulas), digital representations of color can never provide an absolute 1:1 match across all physical hardware, manufacturing systems, and ambient lighting conditions.
        </p>
      </section>

      {/* 2. Color Conversion Limitations */}
      <section id="sec-conversion" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Mathematical Color Conversion Limitations
        </h2>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wider text-xs">
              Color Space Boundary Differences
            </p>
            <p className="leading-relaxed">
              RGB, HSL, HSV, and CMYK models describe fundamentally different physical realities. Moving values between them in software involves algorithmic approximations and gamut clipping when target gamuts cannot reproduce source colors.
            </p>
          </div>
        </div>

        <p>
          - <strong>RGB &amp; HEX:</strong> Represent additive 8-bit digital color channels (256 discrete values per channel, spanning 16.7 million total colors).<br />
          - <strong>HSL &amp; HSV:</strong> Cylindrical geometric transforms of the RGB cube designed for human intuition rather than perceptual uniformity.<br />
          - <strong>CMYK:</strong> Idealized subtractive ink percentage calculations. Software calculations cannot account for press ink density curve calibrations without specific ICC printer profiles.
        </p>
      </section>

      {/* 3. Digital vs Physical CMYK Printing */}
      <section id="sec-cmyk" className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Printer className="w-5 h-5 text-indigo-500" />
          <span>3. Digital Screen vs. Physical CMYK Printing Discrepancies</span>
        </h2>
        <p>
          One of the most common pitfalls in visual design is assuming that a color visible on an illuminated glass smartphone screen or computer monitor will look identical when printed on physical paper. In reality, actual printed results diverge significantly due to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Subtractive Pigment Physics:</strong> Digital monitors emit light directly into your eyes; printed inks reflect ambient light after absorbing certain wavelengths. Many vibrant digital colors (such as electric cyan, neon magenta, and bright lime green) simply lie outside the reproducible physical CMYK color gamut.
          </li>
          <li>
            <strong>Paper Stock &amp; Porosity:</strong> Uncoated offset paper absorbs liquid ink deeply, causing colors to appear darker and less saturated than on coated gloss paper or synthetic plastic substrates.
          </li>
          <li>
            <strong>Printer ICC Profiles &amp; Dot Gain:</strong> Commercial offset presses, flexographic machines, digital toner printers, and home inkjet devices all apply custom RIP color curves and experience mechanical dot gain during ink transfer.
          </li>
          <li>
            <strong>Metamerism:</strong> Colors that appear to match under daylight may look noticeably mismatched under incandescent or fluorescent lighting.
          </li>
        </ul>
        <p className="text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 p-3 rounded-xl">
          Conclusion: Always order a calibrated physical press proof or match against a certified spot-color swatch book (such as Pantone) prior to approving commercial printing production.
        </p>
      </section>

      {/* 4. Display Calibration & Gamut Variances */}
      <section id="sec-display" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-sky-500" />
          <span>4. Display Calibration &amp; Screen Gamut Differences</span>
        </h2>
        <p>
          Colors viewed on Chroma Studio will vary naturally across different user devices. Key factors influencing screen color reproduction include:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
          <li><strong>Panel Hardware:</strong> OLED, Mini-LED, IPS, and TN displays exhibit distinct contrast ratios, black levels, and gamut coverages.</li>
          <li><strong>Operating System Color Profiles:</strong> Apple Display P3 profiles render broader red and green gamuts than standard baseline sRGB monitors.</li>
          <li><strong>Night Light &amp; Ambient Adapters:</strong> Features like Apple True Tone, Windows Night Light, and Android Eye Comfort Shift modify the color temperature of your entire screen in real time.</li>
        </ul>
      </section>

      {/* 5. WCAG Accessibility Evaluation Limitations */}
      <section id="sec-wcag" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-teal-500" />
          <span>5. WCAG Accessibility Evaluation Limitations</span>
        </h2>
        <p>
          The Contrast Checker tool implements the mathematical relative luminance formula defined by W3C WCAG 2.1:
        </p>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 font-mono text-xs text-indigo-700 dark:text-indigo-300">
          Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
        </div>
        <p>
          While these mathematical ratios determine formal legal compliance criteria, actual human visual acuity varies based on font weight, font size, glare, ambient room brightness, and individual ocular conditions. A mathematical pass of 4.5:1 does not guarantee effortless readability for all users if typography is excessively thin or small.
        </p>
      </section>

      {/* 6. No Professional Design Guarantee */}
      <section id="sec-no-guarantee" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <span>6. No Professional Design or Manufacturing Guarantee</span>
        </h2>
        <p>
          Chroma Studio is a software calculation tool, not a certified color laboratory or commercial prepress consultancy. No representation or warranty, express or implied, is made that the color codes, palettes, or calculations will satisfy specific industrial, architectural, automotive, or textile standards.
        </p>
      </section>

      {/* 7. Third-Party Dependencies */}
      <section id="sec-thirdparty" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          7. Third-Party Dependencies &amp; External Links
        </h2>
        <p>
          Chroma Studio may reference external standards (such as W3C, ISO, and standard CSS documentation). We do not control or endorse external third-party documentation and assume no responsibility for external content.
        </p>
      </section>

      {/* 8. Contact */}
      <section id="sec-contact" className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          8. Inquiries &amp; Technical Clarifications
        </h2>
        <p>
          If you have questions regarding this Technical &amp; Color Disclaimer, please contact:
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
