import { ActiveTab } from '../types/color';

export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
}

export const ROUTE_SEO: Record<ActiveTab, RouteMeta> = {
  home: {
    title: 'Chroma Studio — Free Online Color Tools, Palette Generator & HEX Converter',
    description: 'Free online color tools for designers and developers. Generate harmonic color palettes, convert HEX, RGB, HSL, CMYK, test WCAG contrast, extract colors from images, and simulate color blindness 100% locally in your browser.',
    canonicalPath: '',
  },
  'tool-picker': {
    title: 'Online Color Picker — Visual Palette Selector & Code Inspector | Chroma Studio',
    description: 'Free visual online color picker. Inspect HEX, RGB, HSL, and HSV color values in real time with alpha transparency control and one-click clipboard copying.',
    canonicalPath: 'tools/picker',
  },
  'tool-converter': {
    title: 'HEX to RGB Converter — Free Color Code Format Converter | Chroma Studio',
    description: 'Free instant color code converter. Convert HEX to RGB, RGB to HEX, HSL, HSV, CMYK, and OKLCH color spaces with mathematical precision.',
    canonicalPath: 'tools/converter',
  },
  'tool-image': {
    title: 'Image Color Picker — Extract Harmonic Color Palettes from Images | Chroma Studio',
    description: 'Upload any photo or graphic to extract prominent color palettes and sample precision pixels with zoom loupe. 100% private, client-side in-browser processing.',
    canonicalPath: 'tools/image',
  },
  'tool-palette': {
    title: 'Color Palette Generator — Create Harmonic Color Schemes | Chroma Studio',
    description: 'Generate professional color palettes with complementary, analogous, triadic, tetradic, split-complementary, and monochromatic harmony algorithms.',
    canonicalPath: 'tools/palette',
  },
  'tool-contrast': {
    title: 'Color Contrast Checker — WCAG 2.2 Accessibility Compliance | Chroma Studio',
    description: 'Test foreground and background color contrast ratios for WCAG 2.2 AA and AAA compliance. Verify text and UI component accessibility instantly.',
    canonicalPath: 'tools/contrast',
  },
  'tool-gradient': {
    title: 'CSS Gradient Generator — Linear & Radial CSS Gradient Maker | Chroma Studio',
    description: 'Create custom linear and radial CSS gradients with multi-stop color controls, angle adjustments, and instant copy-paste CSS code export.',
    canonicalPath: 'tools/gradient',
  },
  'tool-shades': {
    title: 'Color Shades Generator — Monochromatic Tints, Tones & Shades | Chroma Studio',
    description: 'Generate monochromatic tint and shade variations from any base color. Export 10-step design system scale ready for CSS and Tailwind.',
    canonicalPath: 'tools/shades',
  },
  'tool-mixer': {
    title: 'Color Mixer Online — Two-Color Subtractive & Additive Blending | Chroma Studio',
    description: 'Blend and mix two colors online with variable percentage ratios. Calculate intermediate color transitions in RGB, HSL, and LAB color spaces.',
    canonicalPath: 'tools/mixer',
  },
  'tool-blindness': {
    title: 'Color Blindness Simulator — 8-Mode CVD Vision Accessibility Test | Chroma Studio',
    description: 'Simulate 8 forms of color vision deficiency (Protanopia, Deuteranopia, Tritanopia, Achromatopsia) to verify inclusive design accessibility.',
    canonicalPath: 'tools/blindness',
  },
  'tool-exporter': {
    title: 'CSS Color Generator & Palette Code Exporter | Chroma Studio',
    description: 'Export color palettes to CSS variables, Tailwind CSS config, SCSS, JSON, and Swift with custom naming conventions and one-click clipboard copy.',
    canonicalPath: 'tools/exporter',
  },
  tools: {
    title: 'Free Online Color Tools — Professional Design & Conversion Suite | Chroma Studio',
    description: 'Explore Chroma Studio\'s 10 color utilities: Color Picker, Converter, Image Extractor, Palette Generator, Contrast Checker, Gradient Maker, and Blindness Simulator.',
    canonicalPath: 'tools/picker',
  },
  explore: {
    title: 'Explore Colors — Curated Color Families & Shades Browser | Chroma Studio',
    description: 'Explore curated color families including reds, blues, greens, yellows, purples, and neutrals with names, shades, and conversion metrics.',
    canonicalPath: 'explore',
  },
  palettes: {
    title: 'Curated Color Palettes — Trending Design Schemes & Combinations | Chroma Studio',
    description: 'Browse curated, professionally designed color palettes across modern UI, pastel, vintage, vibrant, and dark-mode themes.',
    canonicalPath: 'palettes',
  },
  gradients: {
    title: 'Gradients Library — Trending CSS & Web Color Gradients | Chroma Studio',
    description: 'Explore hand-crafted linear and radial gradients for websites, mobile apps, and graphic designs. Copy CSS gradients in one click.',
    canonicalPath: 'gradients',
  },
  learn: {
    title: 'Color Theory & Science Guide — Understand Color Models & Gamuts | Chroma Studio',
    description: 'Master color theory fundamentals: RGB additive, CMYK subtractive, HSL cylinders, WCAG luminance contrast, and modern wide-gamut display profiles.',
    canonicalPath: 'learn',
  },
  favorites: {
    title: 'Saved Favorites — Your Custom Colors, Palettes & Gradients | Chroma Studio',
    description: 'Access your saved custom colors, curated palettes, and bespoke gradients stored privately in your browser\'s local storage.',
    canonicalPath: 'favorites',
  },
  developer: {
    title: 'Developer Portfolio — Hazim Bashir | Android & Software Creator | Chroma Studio',
    description: 'Meet Hazim Bashir, creator of Chroma Studio. Android developer and software engineer specializing in offline-first utilities and modern frontends.',
    canonicalPath: 'developer',
  },
  about: {
    title: 'About Developer — Hazim Bashir | Chroma Studio Creator',
    description: 'Learn about the developer behind Chroma Studio, engineering philosophy, technology stack, and contact information.',
    canonicalPath: 'about',
  },
  'about-chroma-studio': {
    title: 'About Chroma Studio — Browser-Based Color Intelligence & Toolkit',
    description: 'Discover Chroma Studio: a 100% private, browser-based color utility platform built for designers, developers, and digital creators.',
    canonicalPath: 'about-chroma-studio',
  },
  'color-detail': {
    title: 'Color Details — In-Depth Analysis & Harmonies | Chroma Studio',
    description: 'Deep-dive color analysis: conversions, complementary harmonies, triadic schemes, accessibility contrast ratings, and CSS variables.',
    canonicalPath: 'color',
  },
  legal: {
    title: 'Legal & Information Center — Policies & Compliance | Chroma Studio',
    description: 'Official legal documentation, policies, terms of service, privacy practices, and compliance commitments for Chroma Studio.',
    canonicalPath: 'legal',
  },
  terms: {
    title: 'Terms & Conditions of Service | Chroma Studio',
    description: 'Terms of service and usage conditions governing the Chroma Studio web application, free tools, and intellectual property.',
    canonicalPath: 'terms',
  },
  privacy: {
    title: 'Privacy Policy — Zero Tracking & Local Processing | Chroma Studio',
    description: 'Chroma Studio privacy policy: 100% local browser processing, zero cookies, zero analytics trackers, and zero image uploads.',
    canonicalPath: 'privacy',
  },
  cookies: {
    title: 'Cookie Policy — Zero Tracking Cookies Stored | Chroma Studio',
    description: 'Chroma Studio cookie policy explaining our zero-tracking architecture and minimal local storage usage for theme and favorites preferences.',
    canonicalPath: 'cookies',
  },
  disclaimer: {
    title: 'Disclaimer & Accuracy Notice | Chroma Studio',
    description: 'General disclaimer regarding mathematical color approximations, display color profiles (sRGB vs Display P3), and print gamut variances.',
    canonicalPath: 'disclaimer',
  },
  'acceptable-use': {
    title: 'Acceptable Use Policy | Chroma Studio',
    description: 'Guidelines on permitted and prohibited uses of Chroma Studio tools, software, and public infrastructure.',
    canonicalPath: 'acceptable-use',
  },
  'intellectual-property': {
    title: 'Intellectual Property & Copyright Policy | Chroma Studio',
    description: 'Ownership rights, open-source component licenses, and user palette generation ownership terms for Chroma Studio.',
    canonicalPath: 'intellectual-property',
  },
  accessibility: {
    title: 'Accessibility Statement — WCAG 2.2 AA/AAA Commitment | Chroma Studio',
    description: 'Our ongoing commitment to digital accessibility, keyboard navigability, high-contrast UI, and WCAG 2.2 compliance.',
    canonicalPath: 'accessibility',
  },
  licenses: {
    title: 'Open Source Licenses & Attribution | Chroma Studio',
    description: 'Third-party open-source libraries, MIT licenses, Lucide icons attribution, and technology stack disclosures for Chroma Studio.',
    canonicalPath: 'licenses',
  },
  contact: {
    title: 'Contact & Support — Get in Touch with Developer | Chroma Studio',
    description: 'Official support and contact channels for bug reports, feature suggestions, color science feedback, and general inquiries.',
    canonicalPath: 'contact',
  },
};

const BASE_URL = 'https://chroma-studio.surge.sh';

export function updateRouteSEO(tab: ActiveTab, param?: string): void {
  const meta = ROUTE_SEO[tab] || ROUTE_SEO.home;

  let title = meta.title;
  let description = meta.description;
  let canonicalUrl = meta.canonicalPath ? `${BASE_URL}/${meta.canonicalPath}` : `${BASE_URL}/`;

  if (tab === 'color-detail' && param) {
    const hex = param.startsWith('#') ? param : `#${param}`;
    title = `${hex} Color Information, Conversions & Harmonies | Chroma Studio`;
    description = `Detailed color analysis for ${hex}: RGB, HSL, HSV, CMYK conversions, shades, tints, triadic harmonies, and WCAG contrast ratios.`;
    canonicalUrl = `${BASE_URL}/color/${hex.replace('#', '')}`;
  }

  // 1. Update Document Title
  document.title = title;

  // 2. Update Primary Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', description);
  }

  // 3. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl);
  }

  // 4. Update Open Graph Tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  // 5. Update Twitter Tags
  let twTitle = document.querySelector('meta[property="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  let twDesc = document.querySelector('meta[property="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);
}
