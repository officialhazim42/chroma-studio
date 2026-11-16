import React from 'react';
import {
  Palette,
  RefreshCw,
  Image as ImageIcon,
  Sliders,
  CheckCircle,
  Eye,
  Layers,
  Sparkles,
  FileCode2,
  Compass,
  ShieldCheck,
  ServerOff,
  UserCheck,
  HardDrive,
  WifiOff,
  Code2,
  Users,
  Layout,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';

interface AboutChromaStudioViewProps {
  onNavigate: (tab: ActiveTab, param?: string) => void;
}

export const AboutChromaStudioView: React.FC<AboutChromaStudioViewProps> = ({ onNavigate }) => {
  const tools = [
    {
      id: 'explore' as ActiveTab,
      name: 'Color Explorer',
      category: 'Browse & Discover',
      icon: <Compass className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      description:
        'Explore comprehensive color libraries organized by spectral families. Search named shades, inspect tints, and examine harmonic variations with one click.',
    },
    {
      id: 'tool-converter' as ActiveTab,
      name: 'Advanced Color Conversion',
      category: 'Format Transformation',
      icon: <RefreshCw className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
      description:
        'Bidirectional mathematical matrix conversions between HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK with live CSS code outputs.',
    },
    {
      id: 'tool-image' as ActiveTab,
      name: 'Image Color Extraction',
      category: 'Visual Sampling',
      icon: <ImageIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      description:
        'High-precision pixel sampling powered by in-browser HTML5 Canvas. Includes an interactive loupe magnifier, drag-and-drop, and dominant palette extraction.',
    },
    {
      id: 'tool-palette' as ActiveTab,
      name: 'Color Palette Generator',
      category: 'Harmonic Schemes',
      icon: <Palette className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      description:
        'Generate balanced palettes using classical color harmony models: Complementary, Analogous, Triadic, Tetradic, Split-Complementary, and Monochromatic.',
    },
    {
      id: 'tool-gradient' as ActiveTab,
      name: 'Gradient Generator',
      category: 'CSS Gradient Studio',
      icon: <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      description:
        'Visual designer for Linear, Radial, and Conic CSS gradients. Adjust angles, color stops, and positions with instant copy-paste CSS generation.',
    },
    {
      id: 'tool-contrast' as ActiveTab,
      name: 'WCAG Contrast Checker',
      category: 'Accessibility Compliance',
      icon: <CheckCircle className="w-5 h-5 text-teal-500 dark:text-teal-400" />,
      description:
        'Accurate relative luminance contrast ratios (1:1 to 21:1) adhering strictly to WCAG 2.1 Level AA and AAA standards for normal, large text, and UI components.',
    },
    {
      id: 'tool-blindness' as ActiveTab,
      name: 'Color Blindness Simulation',
      category: 'Inclusive Design',
      icon: <Eye className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
      description:
        'Simulate Protanopia, Deuteranopia, Tritanopia, and Achromatopsia in real time to verify that critical interface elements remain visually distinct.',
    },
    {
      id: 'tool-shades' as ActiveTab,
      name: 'Shades, Tints and Tones',
      category: 'Color Variations',
      icon: <Layers className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
      description:
        'Systematic color scaling towards pure white (tints), pure black (shades), and mid-gray (tones) to construct cohesive design system color ramps.',
    },
    {
      id: 'tool-mixer' as ActiveTab,
      name: 'Color Mixing',
      category: 'Color Blending',
      icon: <Sliders className="w-5 h-5 text-orange-500 dark:text-orange-400" />,
      description:
        'Blend any two colors together with granular ratio sliders, visualizing the exact intermediate steps and composite color values.',
    },
    {
      id: 'tool-exporter' as ActiveTab,
      name: 'Developer Color Export Tools',
      category: 'Code Generation',
      icon: <FileCode2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
      description:
        'Export color data directly into production formats: Tailwind CSS config objects, CSS custom properties (:root), SCSS variables, JSON tokens, and Android XML.',
    },
  ];

  const architecturePillars = [
    {
      title: '100% Client-Side Processing',
      icon: <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      desc: 'All mathematical matrix conversions, harmony models, and UI rendering execute directly in your browser. Calculations occur in milliseconds with zero network delay.',
    },
    {
      title: 'No Mandatory Account or Login',
      icon: <UserCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      desc: 'Chroma Studio requires no sign-up, no email registration, and no password. Every tool, generator, and exporter is completely unlocked and accessible immediately.',
    },
    {
      title: 'Zero Backend or Cloud Database',
      icon: <ServerOff className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
      desc: 'There are no backend servers or remote databases storing your activities, palettes, or browsing habits. Your color decisions remain entirely your own.',
    },
    {
      title: 'Local Storage for Favorites',
      icon: <HardDrive className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      desc: 'Saved colors, custom palettes, gradients, and theme settings persist locally on your computer via HTML5 Web Storage (localStorage), remaining private to your device.',
    },
    {
      title: 'Private In-Browser Image Processing',
      icon: <ShieldCheck className="w-5 h-5 text-teal-500 dark:text-teal-400" />,
      desc: 'Images loaded into the Image Extractor are processed entirely in-memory using the browser HTML5 Canvas API. No image files are ever uploaded to remote servers.',
    },
    {
      title: 'PWA Installation & Offline Support',
      icon: <WifiOff className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      desc: 'Equipped with a registered Service Worker and Web App Manifest. Install Chroma Studio to your desktop or mobile home screen and work reliably without an active internet connection.',
    },
  ];

  const targetAudiences = [
    {
      role: 'Web Developers',
      icon: <Code2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      benefit:
        'Instant generation of Tailwind CSS configs, CSS variables, and JSON design tokens with zero context-switching.',
    },
    {
      role: 'UI/UX Designers',
      icon: <Layout className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      benefit:
        'Validate WCAG 2.1 contrast ratios and simulate color vision deficiencies to craft accessible digital experiences.',
    },
    {
      role: 'Graphic Designers',
      icon: <Palette className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
      benefit:
        'Explore harmonic schemes, calculate precise shades and tints, and inspect CMYK approximations for physical print planning.',
    },
    {
      role: 'Digital Creators',
      icon: <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      benefit:
        'Extract stunning color palettes directly from reference photography, artwork, and screenshots using the local image picker.',
    },
    {
      role: 'Students & Learners',
      icon: <Compass className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      benefit:
        'Understand foundational color theory, harmonic angles, relative luminance, and color space mathematical foundations.',
    },
    {
      role: 'Anyone Working with Colors',
      icon: <Users className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
      benefit:
        'A clean, ad-free, clutter-free utility workspace that makes finding, testing, and saving colors effortless.',
    },
  ];

  const technologies = [
    {
      name: 'React 19 & TypeScript',
      role: 'Component Architecture & Type Safety',
      desc: 'Modular, strictly typed frontend application ensuring robust state management and mathematical precision.',
    },
    {
      name: 'Tailwind CSS',
      role: 'Utility-First Styling System',
      desc: 'Seamless Light and Dark theme styling with responsive layouts tested from 320px mobile screens to large desktop viewports.',
    },
    {
      name: 'Vite',
      role: 'Fast Build Infrastructure',
      desc: 'Optimized production bundling with sub-second tree-shaking and efficient code-splitting.',
    },
    {
      name: 'HTML5 Canvas API',
      role: 'Local Pixel Reading Engine',
      desc: 'High-speed, client-side pixel extraction and loupe magnification with zero external server dependencies.',
    },
    {
      name: 'Service Worker & Cache API',
      role: 'PWA & Offline Reliability',
      desc: 'Pre-caches static application assets to provide full offline capabilities and standalone installation.',
    },
    {
      name: 'Web Storage API',
      role: 'Client-Side Persistence',
      desc: 'Reliable, private persistence for saved favorite colors, bespoke palettes, and theme preferences via localStorage.',
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 p-8 sm:p-14 shadow-sm dark:shadow-2xl overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs font-semibold font-mono text-indigo-700 dark:text-indigo-300 mb-6 shadow-2xs">
            <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>PRODUCT OVERVIEW &middot; COLOR INTELLIGENCE WORKSPACE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            About Chroma Studio
          </h1>

          <p className="text-lg sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-3 leading-snug">
            A Smarter Way to Explore, Understand and Work with Colors.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-6 leading-relaxed">
            Chroma Studio is a modern, browser-based color intelligence and design toolkit designed to make working with colors simpler, faster, and more accessible.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            From exploring color collections and converting color formats to generating professional palettes, creating gradients, and extracting colors from images, Chroma Studio brings essential color utilities together in one integrated workspace.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={() => onNavigate('tool-picker')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Color Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Browse Color Library
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('architecture-privacy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs sm:text-sm transition-colors cursor-pointer"
            >
              View Architecture &amp; Privacy ↓
            </button>
          </div>
        </div>
      </div>

      {/* What Chroma Studio Offers */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2">
            INTEGRATED SUITE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Chroma Studio Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Ten specialized color intelligence tools, precision utilities, and export helpers engineered for speed, accuracy, and workflow efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  Instant Launch
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy & Architecture */}
      <section id="architecture-privacy" className="mb-20 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
            PRIVACY BY DESIGN
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy &amp; Technical Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Chroma Studio is engineered on a strictly client-side paradigm. Your creative assets, images, and color palettes stay in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architecturePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-xs"
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Want to inspect our full technical disclosures? Read our comprehensive legal and privacy documents.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('privacy')}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('legal')}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Legal &amp; Info Center
            </button>
          </div>
        </div>
      </section>

      {/* Designed for Everyone */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2">
            UNIVERSAL UTILITY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for Everyone
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Whether you are building web applications, designing brand identities, or studying color science, Chroma Studio adapts to your creative workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetAudiences.map((aud, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-xs"
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                {aud.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {aud.role}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {aud.benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology & Product Approach */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2">
            ENGINEERING FOUNDATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technology &amp; Product Approach
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Chroma Studio is crafted with modern, standard web technologies prioritizing zero-bloat performance, robust accessibility, and offline durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-xs"
            >
              <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                {tech.role}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {tech.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200/60 dark:border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1">
            READY TO CREATE?
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Start Exploring Color Intelligence
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            Choose from 10 specialized color tools, browse hundreds of curated palettes, or generate cohesive gradient styles right inside your browser.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('palettes')}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            Curated Palettes
          </button>
          <button
            onClick={() => onNavigate('tool-picker')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <span>Launch Color Picker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
