import React, { useState } from 'react';
import {
  BookOpen,
  Sliders,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';

interface LearnViewProps {
  onNavigate: (tab: ActiveTab, param?: string) => void;
  initialTopic?: string;
}

export const LearnView: React.FC<LearnViewProps> = ({ onNavigate, initialTopic }) => {
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic || 'hex');

  // Interactive mini widgets inside the learn view
  const [rgbR, setRgbR] = useState(79);
  const [rgbG, setRgbG] = useState(70);
  const [rgbB, setRgbB] = useState(229);

  const interactiveHex = `#${rgbR.toString(16).padStart(2, '0')}${rgbG
    .toString(16)
    .padStart(2, '0')}${rgbB.toString(16).padStart(2, '0')}`.toUpperCase();

  const topicTools: Record<string, { tab: ActiveTab; label: string; desc: string }> = {
    hex: { tab: 'tool-picker', label: 'Color Picker & Loupe', desc: 'Inspect precise HEX values with slider and canvas tools' },
    rgb: { tab: 'tool-mixer', label: 'Color Mixer Studio', desc: 'Mix additive RGB light channels and spectral blends dynamically' },
    cmyk: { tab: 'tool-converter', label: 'Color Converter', desc: 'Convert live between HEX, RGB, CMYK, HSL, and HSV' },
    hsl: { tab: 'tool-shades', label: 'Tints & Shades Studio', desc: 'Step across lightness and saturation curves systematically' },
    theory: { tab: 'tool-palette', label: 'Harmonic Palette Generator', desc: 'Explore color wheels and mathematical relationships' },
    harmonies: { tab: 'tool-palette', label: 'Harmonic Palette Studio', desc: 'Generate complementary, triadic, and analogous palettes' },
    contrast: { tab: 'tool-contrast', label: 'WCAG Contrast Checker', desc: 'Test real foreground and background pairs against AA/AAA compliance' },
    accessibility: { tab: 'tool-blindness', label: 'Color Blindness Simulator', desc: 'Simulate 8 visual spectrum deficiencies in real time' },
    'digital-print': { tab: 'tool-converter', label: 'Multi-Format Converter', desc: 'Inspect digital sRGB vs print CMYK ink breakdown' },
  };

  const topics = [
    { id: 'hex', title: 'Understanding HEX', icon: '#', desc: 'Base-16 byte mapping in digital code' },
    { id: 'rgb', title: 'Understanding RGB', icon: 'RGB', desc: 'Additive primary colors for digital displays' },
    { id: 'cmyk', title: 'Understanding CMYK', icon: 'CMYK', desc: 'Subtractive ink physics for physical printing' },
    { id: 'hsl', title: 'Understanding HSL & HSV', icon: 'HSL', desc: 'Cylindrical models tailored for intuitive design' },
    { id: 'theory', title: 'Color Theory', icon: '✦', desc: 'Primary, secondary, and tertiary foundations' },
    { id: 'harmonies', title: 'Color Harmonies', icon: '✿', desc: 'Complementary, triadic, and geometric schemes' },
    { id: 'contrast', title: 'Understanding Contrast', icon: 'WCAG', desc: 'Relative optical luminance and accessibility' },
    { id: 'accessibility', title: 'Accessible Color Design', icon: '♿', desc: 'Designing for color deficiency and high readability' },
    { id: 'digital-print', title: 'Digital vs. Print Colors', icon: '⇄', desc: 'sRGB, Display P3, and CMYK gamut disparities' },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-300 mb-3 font-mono">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>COLOR SCIENCE &middot; ACADEMIC &amp; DESIGN FOUNDATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Color Theory &amp; Intelligence Guide
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Deep-dive tutorials, color space physics, WCAG accessibility mathematics, and practical design principles written for software engineers and digital designers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-3 shadow-sm dark:shadow-xl space-y-1">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                  activeTopic === t.id
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300'
                }`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                  activeTopic === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white'
                }`}>
                  {t.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-tight">{t.title}</p>
                  <p className={`text-[11px] truncate mt-0.5 ${activeTopic === t.id ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>{t.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive RGB Explorer Widget */}
          <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-sm dark:shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Live Interactive Mixer
            </h3>

            <div
              className="w-full h-20 rounded-xl shadow-inner border border-slate-200 dark:border-white/10 flex items-center justify-center"
              style={{ backgroundColor: interactiveHex }}
            >
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-md">
                {interactiveHex}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-rose-500 font-bold w-4">R</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbR}
                  onChange={(e) => setRgbR(parseInt(e.target.value))}
                  className="flex-1 accent-rose-500 cursor-pointer h-1.5"
                />
                <span className="font-mono text-slate-700 dark:text-slate-300 w-8 text-right">{rgbR}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold w-4">G</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbG}
                  onChange={(e) => setRgbG(parseInt(e.target.value))}
                  className="flex-1 accent-emerald-500 cursor-pointer h-1.5"
                />
                <span className="font-mono text-slate-700 dark:text-slate-300 w-8 text-right">{rgbG}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sky-600 dark:text-sky-400 font-bold w-4">B</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbB}
                  onChange={(e) => setRgbB(parseInt(e.target.value))}
                  className="flex-1 accent-sky-500 cursor-pointer h-1.5"
                />
                <span className="font-mono text-slate-700 dark:text-slate-300 w-8 text-right">{rgbB}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm dark:shadow-xl prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
          {activeTopic === 'hex' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 01 &middot; DIGITAL NOTATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Understanding HEX Color Codes
              </h2>
              <p>
                A hexadecimal color code is a 6-digit (or 8-digit with alpha), base-16 representation of the primary red, green, and blue light components emitted by computer monitors and smartphone screens.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-xs text-indigo-700 dark:text-indigo-300 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white"># R R G G B B [ A A ]</p>
                <p>&bull; Red Byte: 00 to FF (0 to 255 in base 10)</p>
                <p>&bull; Green Byte: 00 to FF (0 to 255 in base 10)</p>
                <p>&bull; Blue Byte: 00 to FF (0 to 255 in base 10)</p>
                <p>&bull; Optional Alpha Byte: 00 (0% transparent) to FF (100% opaque)</p>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Why Hexadecimal?</h3>
              <p>
                Computers store data in bytes (8 bits). An 8-bit integer holds exactly 256 values (0 through 255). Because two hexadecimal digits represent exactly 1 byte (from `00` to `FF`), a 24-bit TrueColor image can be cleanly encoded into exactly six hexadecimal characters without requiring cumbersome delimiter characters.
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Shorthand 3-Digit Notation</h3>
              <p>
                In CSS, when both nibbles of each color byte are identical, the code can be abbreviated to three digits: `#F0A` is identical to `#FF00AA`.
              </p>
            </div>
          )}

          {activeTopic === 'rgb' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 02 &middot; ADDITIVE LIGHT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Understanding RGB (Additive Color Model)
              </h2>
              <p>
                The RGB color model is an <strong>additive</strong> color system based on the physics of human eye trichromacy and digital light emission. In additive systems, darkness is the default starting point (black), and color channels are added together by exciting red, green, and blue sub-pixels.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/20 text-xs">
                  <strong className="text-rose-600 dark:text-rose-400 block mb-1">Red Primary</strong>
                  Stimulates L-cones in the retina. Longest visible wavelengths (~620–750 nm).
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs">
                  <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Green Primary</strong>
                  Stimulates M-cones. Human perception has the highest sensitivity to green luminance.
                </div>
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/20 text-xs">
                  <strong className="text-sky-700 dark:text-sky-400 block mb-1">Blue Primary</strong>
                  Stimulates S-cones. Shortest visible wavelengths (~450–495 nm).
                </div>
              </div>
              <p>
                When all three primaries are combined at full intensity (`rgb(255, 255, 255)`), they create pure white light. Conversely, when all three channels are zero (`rgb(0, 0, 0)`), no photons are emitted, producing black.
              </p>
            </div>
          )}

          {activeTopic === 'cmyk' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 03 &middot; SUBTRACTIVE PRINT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Understanding CMYK (Subtractive Printing)
              </h2>
              <p>
                Unlike computer monitors that emit light directly, printed materials reflect ambient light off physical paper. CMYK is a <strong>subtractive</strong> color model using four ink pigments: <strong>Cyan</strong>, <strong>Magenta</strong>, <strong>Yellow</strong>, and <strong>Key (Black)</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <p><strong>&bull; Cyan ink</strong> absorbs red wavelengths and reflects green and blue.</p>
                <p><strong>&bull; Magenta ink</strong> absorbs green wavelengths and reflects red and blue.</p>
                <p><strong>&bull; Yellow ink</strong> absorbs blue wavelengths and reflects red and green.</p>
                <p><strong>&bull; Key (Black) ink</strong> absorbs all visible wavelengths efficiently and saves expensive colored inks.</p>
              </div>
              <p>
                Because CMYK dyes absorb portions of the incoming light spectrum, combining 100% Cyan, Magenta, and Yellow theoretically produces black, although in commercial printing, physical pigment impurities yield a murky brown. The dedicated &ldquo;Key&rdquo; black ink is therefore used to achieve rich deep blacks and sharp typography.
              </p>
            </div>
          )}

          {activeTopic === 'hsl' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 04 &middot; CYLINDRICAL MODELS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Understanding HSL &amp; HSV
              </h2>
              <p>
                While RGB and HEX are optimal for digital hardware, humans do not naturally conceptualize colors as numerical mixtures of red, green, and blue photons. HSL (Hue, Saturation, Lightness) maps RGB into an intuitive cylindrical coordinate system.
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white">Hue (0&deg; to 360&deg;):</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    The radial position on the color wheel: 0&deg; = Red, 60&deg; = Yellow, 120&deg; = Green, 180&deg; = Cyan, 240&deg; = Blue, 300&deg; = Magenta.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white">Saturation (0% to 100%):</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    The chroma purity of the color: 0% is completely desaturated neutral gray, while 100% is full vivid saturation.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white">Lightness (0% to 100%):</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    The perceived brightness: 0% is absolute black, 50% is normal pure hue, and 100% is pure white.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'theory' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 05 &middot; VISUAL HIERARCHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Classical Color Theory &amp; The Color Wheel
              </h2>
              <p>
                Color theory originated in 1666 when Sir Isaac Newton passed white sunlight through a prism, uncovering the visible spectrum and bending it into the first circular color wheel.
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">The Three Tiers of Color:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Primary Colors:</strong> Fundamental hues that cannot be formed by combining others. In additive light: Red, Green, Blue. In traditional art pigment: Red, Yellow, Blue.</li>
                <li><strong>Secondary Colors:</strong> Formed by mixing equal parts of two primaries (e.g. Red + Yellow = Orange, Yellow + Blue = Green, Blue + Red = Purple).</li>
                <li><strong>Tertiary Colors:</strong> Formed by mixing a primary with its adjacent secondary color (e.g. Red-Orange, Yellow-Green, Blue-Violet).</li>
              </ul>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Color Temperature &amp; Emotion:</h3>
              <p>
                Colors on the warm side of the spectrum (Reds, Oranges, Yellows) visually advance towards the viewer, conveying urgency, energy, and warmth. Cool colors (Blues, Greens, Purples) recede into the background, communicating calmness, stability, and structure.
              </p>
            </div>
          )}

          {activeTopic === 'harmonies' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 06 &middot; GEOMETRIC SCHEMES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Color Harmonies &amp; Palette Construction
              </h2>
              <p>
                Color harmony describes mathematical formulas that evoke balanced, aesthetically pleasing sensory reactions when presented together.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block">Complementary (+180&deg;)</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Two hues directly opposite each other on the 360&deg; wheel (e.g. Blue and Orange). Delivers maximum visual contrast and dynamic energy.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block">Analogous (&plusmn;30&deg;)</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Hues positioned adjacent to each other on the wheel. Creates calm, unified, serene visual themes inspired by nature.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block">Triadic (+120&deg;, +240&deg;)</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Three equidistant points forming an equilateral triangle. Offers high vibrant contrast while retaining optical balance.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block">Tetradic (Rectangle +60&deg;, +180&deg;, +240&deg;)</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Four colors organized as two complementary pairs. Offers rich diversity, best applied when one color dominates and others accent.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'contrast' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 07 &middot; WCAG ACCESSIBILITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Understanding WCAG Contrast Mathematics
              </h2>
              <p>
                The World Wide Web Consortium (W3C) establishes accessibility standards under WCAG 2.1. The foundation of color accessibility is <strong>Relative Luminance</strong> &mdash; the normalized brightness of any point in a color space.
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">The Relative Luminance Formula:</h3>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-xs">
                L = 0.2126 &times; R<sub>lin</sub> + 0.7152 &times; G<sub>lin</sub> + 0.0722 &times; B<sub>lin</sub>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Notice that Green accounts for over 71.5% of human perceived luminance, while Blue accounts for only 7.2%. This matches human biology, where green photoreceptors dominate the fovea.
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Contrast Ratio Formula:</h3>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-xs">
                Contrast Ratio = (L<sub>lighter</sub> + 0.05) / (L<sub>darker</sub> + 0.05)
              </div>
              <p>
                The resulting ratio ranges from `1:1` (identical colors, zero contrast) to `21:1` (pure black on pure white).
              </p>
            </div>
          )}

          {activeTopic === 'accessibility' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 08 &middot; INCLUSIVE DESIGN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Designing for Inclusivity &amp; Color Vision Deficiency
              </h2>
              <p>
                Approximately 8% of men and 0.5% of women worldwide experience some form of Color Vision Deficiency (CVD). Designing accessible software is a critical engineering requirement, not an afterthought.
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Golden Rules for Inclusive Design:</h3>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li><strong>Supplement Color with Geometry:</strong> Never use color as the sole indicator of state (e.g. pair red error text with an alert icon and explicit text message).</li>
                <li><strong>Mind Red-Green Adjacency:</strong> Protanopia and Deuteranopia cause red and green to appear almost identical. Avoid placing red buttons directly beside green buttons without secondary distinction.</li>
                <li><strong>Verify In Grayscale:</strong> If your UI is completely understandable in pure black and white, it will remain legible for every category of human vision.</li>
              </ul>
            </div>
          )}

          {activeTopic === 'digital-print' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                CHAPTER 09 &middot; COLOR GAMUTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Digital Screens vs. Physical Print: Gamut Mapping
              </h2>
              <p>
                A <strong>color gamut</strong> represents the complete range of colors a specific device can produce or capture. Because digital screens emit photons while print inks absorb light, their gamuts differ fundamentally.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                <p><strong>&bull; sRGB (Standard Web):</strong> The ubiquitous color space for the web since 1996. Every browser and monitor supports it reliably.</p>
                <p><strong>&bull; Display P3:</strong> Wide-gamut color space introduced by modern Apple and Android devices, displaying 25% more vivid reds and greens than sRGB.</p>
                <p><strong>&bull; CMYK (SWOP/FOGRA):</strong> Significantly smaller gamut than sRGB. Highly saturated neon blues, vibrant greens, and luminous purples simply cannot be printed with standard CMYK inks.</p>
              </div>
              <p>
                When moving designs from Figma or Photoshop to physical print, always utilize gamut-warning proofs to avoid disappointed clients seeing vibrant monitor colors print as desaturated tones.
              </p>
            </div>
          )}

          {/* Interactive Related Tool CTA */}
          {topicTools[activeTopic] && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-white/[0.02] p-5 rounded-2xl">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">PRACTICAL APPLICATION</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{topicTools[activeTopic].label}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{topicTools[activeTopic].desc}</p>
              </div>
              <button
                onClick={() => onNavigate(topicTools[activeTopic].tab)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                Launch Tool <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
