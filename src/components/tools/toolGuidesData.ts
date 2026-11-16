import { ToolGuideProps } from './ToolGuideSection';

export const TOOL_GUIDES: Record<string, Omit<ToolGuideProps, 'onNavigate'>> = {
  'tool-picker': {
    toolId: 'tool-picker',
    title: 'Mastering the Online Color Picker',
    subtitle: 'Interactive 2D saturation/value canvas, 360° hue spectrum slider, alpha opacity channel, and instant cross-format code inspector.',
    overview: 'Chroma Studio\'s Online Color Picker provides professional-grade color selection powered by pure client-side mathematical algorithms. It calculates 2D HSV coordinates, evaluates perceptual luminance, and maps to standard hexadecimal, RGB, and HSL formats in real time without network latency or external tracking.',
    howToSteps: [
      'Drag the circular indicator on the 2D gradient canvas to select your desired saturation and brightness.',
      'Slide the 360° hue bar horizontally to navigate across all primary, secondary, and tertiary color families.',
      'Fine-tune transparency with the alpha opacity slider if semi-transparent RGBA or HSLA values are needed.',
      'Click any format copy button to instantly copy the normalized HEX, RGB, or HSL code to your clipboard.',
    ],
    supportedFormats: [
      { name: 'HEX / HEXA', desc: '#6366F1 or #6366F1CC with optional 8-digit alpha transparency.' },
      { name: 'RGB / RGBA', desc: 'rgb(99, 102, 241) or rgba(99, 102, 241, 0.8) standard 0-255 channel values.' },
      { name: 'HSL / HSLA', desc: 'hsl(239, 84%, 67%) cylindrical coordinates for intuitive tint adjustments.' },
      { name: 'HSV / HSB', desc: 'hsv(239, 59%, 95%) hue, saturation, and brightness for digital graphics.' },
    ],
    useCases: [
      { title: 'UI/UX Interface Design', desc: 'Select harmonious brand, background, and accent colors for web and mobile interfaces.' },
      { title: 'Front-End Development', desc: 'Inspect exact CSS color definitions and copy production-ready code with one click.' },
      { title: 'Brand Identity Systems', desc: 'Standardize primary and secondary brand codes across digital and marketing assets.' },
    ],
    examples: [
      { input: '#6366F1', output: 'rgb(99, 102, 241)', note: 'Modern Indigo UI brand color' },
      { input: '#EC4899', output: 'hsl(330, 81%, 60%)', note: 'Vibrant Pink accent' },
      { input: '#10B981', output: 'rgb(16, 185, 129)', note: 'Accessible Emerald status green' },
    ],
    relatedTools: [
      { id: 'tool-converter', label: 'Color Converter', desc: 'Convert to CMYK, HSV, and OKLCH color spaces.' },
      { id: 'tool-contrast', label: 'Contrast Checker', desc: 'Test WCAG 2.2 AA/AAA readability against surfaces.' },
      { id: 'tool-palette', label: 'Palette Generator', desc: 'Generate harmonic color schemes from this hue.' },
    ],
  },

  'tool-converter': {
    toolId: 'tool-converter',
    title: 'Bidirectional Color Code Converter',
    subtitle: 'Instantly convert between HEX, RGB, HSL, HSV, and CMYK formats with mathematical precision and bidirectional live updates.',
    overview: 'Chroma Studio\'s Color Code Converter transforms color values across digital (sRGB, HEX), cylindrical (HSL, HSV), and print (CMYK) color spaces. All calculations use floating-point color science formulas, accounting for roundoff normalization and gamut clipping without external API dependencies.',
    howToSteps: [
      'Type or paste any valid color code into the HEX, RGB, HSL, HSV, or CMYK input field.',
      'Watch all complementary color models update simultaneously in real time as you type.',
      'Use the quick presets to immediately test primary, secondary, and pastel spectrum colors.',
      'Click the copy icon on any converted value to copy the normalized CSS or print code.',
    ],
    supportedFormats: [
      { name: 'HEX (#RRGGBB)', desc: 'Standard 6-digit or 3-digit shorthand hexadecimal web color codes.' },
      { name: 'RGB (0-255)', desc: 'Additive primary red, green, and blue integers used by computer displays.' },
      { name: 'HSL (0-360°, %)', desc: 'Cylindrical model expressing hue angle, saturation percent, and lightness.' },
      { name: 'HSV / HSB', desc: 'Hue, saturation, and value model commonly used in Photoshop and Illustrator.' },
      { name: 'CMYK (0-100%)', desc: 'Cyan, Magenta, Yellow, Key (Black) four-color subtractive print approximation.' },
    ],
    useCases: [
      { title: 'Web to Print Workflow', desc: 'Convert digital web HEX codes into CMYK print approximations for marketing collateral.' },
      { title: 'CSS Modernization', desc: 'Migrate legacy HEX values into modern CSS HSL or RGB custom properties.' },
      { title: 'Cross-Platform Specs', desc: 'Translate CSS colors into iOS UIColor floats or Android Color integers.' },
    ],
    examples: [
      { input: '#3B82F6', output: 'rgb(59, 130, 246)', note: 'Tailwind Blue 500 equivalent' },
      { input: 'rgb(245, 158, 11)', output: '#F59E0B', note: 'Amber 500 status warning color' },
      { input: '#10B981', output: 'cmyk(91%, 0%, 30%, 27%)', note: 'Emerald green print estimate' },
    ],
    relatedTools: [
      { id: 'tool-picker', label: 'Color Picker', desc: 'Visually select colors on an interactive spectrum.' },
      { id: 'tool-shades', label: 'Shades & Tints', desc: 'Generate 10-step monochromatic shade scales.' },
      { id: 'tool-exporter', label: 'CSS Exporter', desc: 'Export full palette variables for CSS and Tailwind.' },
    ],
  },

  'tool-image': {
    toolId: 'tool-image',
    title: 'Image Color Palette Extractor & Pixel Inspector',
    subtitle: 'Upload any photo or graphic to extract prominent color palettes and sample precision pixels with an interactive 9x9 zoom loupe.',
    overview: 'Chroma Studio\'s Image Color Picker uses HTML5 Canvas image processing to analyze RGB pixel arrays entirely inside your browser. No files are uploaded to any server. It extracts prominent harmonic palettes and provides high-precision pixel sampling with loupe magnification.',
    howToSteps: [
      'Drag and drop any image or click to select a PNG, JPG, WebP, SVG, or AVIF file from your device.',
      'Inspect the automatically extracted prominent color palette displayed below the image canvas.',
      'Hover over any area of the photo to activate the real-time 9x9 magnified pixel inspector loupe.',
      'Click directly on any pixel to capture and copy its exact HEX and RGB coordinates.',
    ],
    supportedFormats: [
      { name: 'Supported File Types', desc: 'PNG, JPG, JPEG, WebP, SVG, AVIF, and GIF graphic formats.' },
      { name: 'Extracted Color Codes', desc: 'Dominant swatches with instant HEX, RGB, and HSL copy formats.' },
      { name: 'Export Options', desc: 'Save entire extracted palettes directly to your private local favorites.' },
    ],
    useCases: [
      { title: 'Photo-Inspired Palettes', desc: 'Generate organic, cohesive color palettes inspired by nature, travel, or architectural photography.' },
      { title: 'Asset Color Verification', desc: 'Sample exact pixels from client logos, icons, and banners to verify brand accuracy.' },
      { title: 'Moodboard Development', desc: 'Extract harmonious accent hues from conceptual reference artwork and moodboards.' },
    ],
    examples: [
      { input: 'Nature Landscape Photo', output: '5-Color Earth Tone Palette', note: 'Extracted forest green, slate gray, and sunburst gold' },
      { input: 'Application UI Screenshot', output: 'Primary & Secondary HEX', note: 'Exact extraction of button, card, and background tokens' },
    ],
    relatedTools: [
      { id: 'tool-palette', label: 'Palette Generator', desc: 'Expand extracted colors into full harmonic schemes.' },
      { id: 'tool-contrast', label: 'Contrast Checker', desc: 'Test text readability over extracted background hues.' },
      { id: 'tool-mixer', label: 'Color Mixer', desc: 'Blend two extracted colors together.' },
    ],
  },

  'tool-palette': {
    toolId: 'tool-palette',
    title: 'Harmonic Color Palette Generator',
    subtitle: 'Generate cohesive, professional color schemes based on classical color wheel geometric harmonies and color theory algorithms.',
    overview: 'Builds harmonious color palettes using established color wheel geometric algorithms. Whether you need high-contrast complementary pairings or calm analogous blends, each palette is computed from the base hue\'s angular offset on the 360° color circle.',
    howToSteps: [
      'Select a base seed color using the color swatch, input field, or quick preset palette buttons.',
      'Choose a harmony rule: Complementary, Analogous, Triadic, Tetradic, Monochromatic, or Split-Complementary.',
      'Click \'Randomize\' to generate fresh, unexpected creative combinations across the color spectrum.',
      'Save favorite palettes to your local collection or copy individual HEX codes in one click.',
    ],
    supportedFormats: [
      { name: 'Complementary', desc: 'Colors directly opposite on the wheel (180° offset) for high-contrast impact.' },
      { name: 'Analogous', desc: 'Colors adjacent on the wheel (±30° offset) for serene, unified visual themes.' },
      { name: 'Triadic', desc: 'Three colors equidistant on the wheel (120° offsets) for vibrant, balanced diversity.' },
      { name: 'Tetradic (Square)', desc: 'Four colors forming two complementary pairs (90° offsets) for rich palettes.' },
    ],
    useCases: [
      { title: 'Website Theme Design', desc: 'Establish primary brand, secondary accent, and neutral background color combinations.' },
      { title: 'Digital Illustration', desc: 'Choose harmonious shadow, midtone, and highlight palettes for character and scene art.' },
      { title: 'Design Token Creation', desc: 'Generate foundational color sets for component libraries and design systems.' },
    ],
    examples: [
      { input: '#6366F1 (Indigo)', output: '#F59E0B (Amber)', note: 'Complementary pairing for vibrant call-to-action buttons' },
      { input: '#EC4899 (Pink)', output: '#8B5CF6 & #F43F5E', note: 'Analogous harmony creating warm, energetic gradients' },
    ],
    relatedTools: [
      { id: 'tool-contrast', label: 'Contrast Checker', desc: 'Verify readability between your generated palette colors.' },
      { id: 'tool-shades', label: 'Shades & Tints', desc: 'Generate complete 10-step scales for each palette color.' },
      { id: 'tool-exporter', label: 'CSS Exporter', desc: 'Export full palette variables for CSS and Tailwind.' },
    ],
  },

  'tool-contrast': {
    toolId: 'tool-contrast',
    title: 'WCAG 2.2 Color Contrast Checker',
    subtitle: 'Test text and user interface color combinations for accessibility compliance according to W3C WCAG 2.2 AA and AAA standards.',
    overview: 'Calculates the relative luminance contrast ratio between foreground and background colors according to the official W3C Web Content Accessibility Guidelines (WCAG) 2.2 formula: (L1 + 0.05) / (L2 + 0.05). It provides instant compliance pass/fail ratings across normal text, large text, and interactive UI components.',
    howToSteps: [
      'Enter the foreground text color (using HEX, RGB, or the visual color picker).',
      'Enter the background surface color to test against.',
      'Review the calculated contrast ratio (from 1:1 up to 21:1) and the compliance scorecards.',
      'Check live interactive previews for body paragraphs, headings, buttons, and alert cards.',
    ],
    supportedFormats: [
      { name: 'WCAG AA (Normal Text)', desc: 'Requires minimum contrast ratio of 4.5:1 for body copy under 18pt (or under 14pt bold).' },
      { name: 'WCAG AA (Large Text)', desc: 'Requires minimum contrast ratio of 3.0:1 for headings 18pt+ (or 14pt+ bold).' },
      { name: 'WCAG AAA (Enhanced)', desc: 'Requires 7.0:1 for normal text and 4.5:1 for large text for maximum inclusive readability.' },
      { name: 'UI Components (AA)', desc: 'Requires 3.0:1 for form inputs, borders, icons, and interactive button states.' },
    ],
    useCases: [
      { title: 'Accessibility Audits', desc: 'Ensure web applications comply with legal accessibility standards (ADA, Section 508, EAA).' },
      { title: 'Design System Validation', desc: 'Validate button text, badge colors, and notification alerts before handoff to engineering.' },
      { title: 'Dark Mode Optimization', desc: 'Ensure dark theme typography maintains adequate contrast against low-light dark surfaces.' },
    ],
    examples: [
      { input: '#0F172A on #FFFFFF', output: '16.0:1 Ratio', note: 'WCAG AAA Passed (Exceptional legibility for long-form reading)' },
      { input: '#FFFFFF on #6366F1', output: '4.6:1 Ratio', note: 'WCAG AA Passed for body copy, AAA Passed for large headings' },
      { input: '#94A3B8 on #090A0F', output: '6.8:1 Ratio', note: 'WCAG AA Passed for secondary captions and metadata' },
    ],
    relatedTools: [
      { id: 'tool-blindness', label: 'Blindness Simulator', desc: 'Test how your colors look to users with color vision deficiency.' },
      { id: 'tool-picker', label: 'Color Picker', desc: 'Adjust hue and brightness to achieve higher contrast ratios.' },
      { id: 'tool-converter', label: 'Color Converter', desc: 'Convert accessible colors to CSS and print formats.' },
    ],
  },

  'tool-gradient': {
    toolId: 'tool-gradient',
    title: 'CSS Gradient Generator & Visual Maker',
    subtitle: 'Design multi-stop linear and radial CSS gradients with real-time angle controls and copy-ready CSS code export.',
    overview: 'Constructs CSS3 linear and radial gradients with precise angular orientation, radial geometry, and arbitrary color stop percentages. Previews render live with zero latency, generating standard cross-browser compliant CSS `background: linear-gradient(...)` declarations.',
    howToSteps: [
      'Select gradient type: Linear (directional angle) or Radial (circular/elliptical from center).',
      'Use the circular angle knob or slider to orient the gradient direction from 0° to 360°.',
      'Click on the color stop track to add new stops, or drag existing stops to adjust blending positions.',
      'Click \'Copy CSS\' to instantly paste the production-ready gradient rule into your stylesheets.',
    ],
    supportedFormats: [
      { name: 'Linear Gradients', desc: 'Directional gradients oriented by degrees (e.g., 90deg, 135deg, 180deg).' },
      { name: 'Radial Gradients', desc: 'Circular and elliptical gradients expanding outward from a defined center.' },
      { name: 'Multi-Stop Syntax', desc: 'Custom stop percentages (e.g. 0%, 35%, 70%, 100%) for complex multi-color fades.' },
    ],
    useCases: [
      { title: 'Hero Background Banners', desc: 'Create luminous, modern background gradients for landing page headers and hero sections.' },
      { title: 'Call-to-Action Buttons', desc: 'Style attractive, high-converting buttons with subtle multi-stop depth and illumination.' },
      { title: 'Card Borders & Glows', desc: 'Implement modern glassmorphic card borders, text gradients, and ambient glow accents.' },
    ],
    examples: [
      { input: '#6366F1 (0%) to #EC4899 (100%) at 135deg', output: 'linear-gradient(135deg, #6366F1, #EC4899)', note: 'Vibrant modern tech gradient' },
      { input: '#0F172A (0%) to #090A0F (100%) at 180deg', output: 'linear-gradient(180deg, #0F172A, #090A0F)', note: 'Deep dark-mode surface backdrop' },
    ],
    relatedTools: [
      { id: 'tool-palette', label: 'Palette Generator', desc: 'Pick harmonic color pairs to use as gradient stops.' },
      { id: 'tool-exporter', label: 'CSS Exporter', desc: 'Export full palette variables for stylesheets.' },
      { id: 'tool-picker', label: 'Color Picker', desc: 'Fine-tune stop colors using the interactive picker.' },
    ],
  },

  'tool-shades': {
    toolId: 'tool-shades',
    title: 'Color Shades & Tints Generator',
    subtitle: 'Generate a complete 10-step monochromatic scale of tints, shades, and tones for consistent design systems and UI states.',
    overview: 'Computes systematic variations of any base color: Tints (blending with pure white #FFFFFF for lightness), Shades (blending with pure black #000000 for darkness), and Tones (blending with neutral gray #808080 for reduced saturation). It automatically formats tokens compatible with Tailwind and CSS.',
    howToSteps: [
      'Enter any base seed color using HEX or select from the preset palette chips.',
      'Inspect the generated 10-step scales for tints (lightening), shades (darkening), and tones (desaturating).',
      'Check the calculated relative luminance and WCAG rating for each individual step.',
      'Copy individual step codes or export the full 50-950 scale for your CSS or Tailwind theme.',
    ],
    supportedFormats: [
      { name: 'Tints Scale', desc: 'Interpolates base color toward #FFFFFF in 10% increments for soft pastel surfaces.' },
      { name: 'Shades Scale', desc: 'Interpolates base color toward #000000 in 10% increments for deep shadows and dark themes.' },
      { name: 'Tailwind 50-950', desc: 'Standard 10-step scale mapping to 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.' },
    ],
    useCases: [
      { title: 'Interactive UI States', desc: 'Create hover, active, focused, and disabled states from a single primary brand color.' },
      { title: 'Surface Hierarchies', desc: 'Build elevated card backgrounds and modal layers in dark and light modes.' },
      { title: 'Typography Tiers', desc: 'Generate high-contrast headings down to subtle muted captions and borders.' },
    ],
    examples: [
      { input: '#6366F1 at 50% Tint', output: '#B1B3F8', note: 'Soft pastel background for active badge containers' },
      { input: '#6366F1 at 50% Shade', output: '#313378', note: 'Deep indigo container for dark mode components' },
    ],
    relatedTools: [
      { id: 'tool-palette', label: 'Palette Generator', desc: 'Generate complementary palettes for your shades.' },
      { id: 'tool-exporter', label: 'CSS Exporter', desc: 'Export full shade scales as CSS custom properties.' },
      { id: 'tool-converter', label: 'Color Converter', desc: 'Convert shade codes into RGB and HSL values.' },
    ],
  },

  'tool-mixer': {
    toolId: 'tool-mixer',
    title: 'Two-Color Mixer & Blending Calculator',
    subtitle: 'Blend two colors together in variable percentage ratios across RGB, HSL, and perceptual color spaces with live transition steps.',
    overview: 'Simulates digital and physical color mixing by interpolating channels between Color 1 and Color 2. The slider provides continuous ratio control from 0% to 100% with intermediate step previews and mathematical channel analysis.',
    howToSteps: [
      'Select Color 1 and Color 2 using the visual pickers or by entering hex values.',
      'Drag the ratio slider to adjust the blending balance (e.g. 70% Color 1 + 30% Color 2).',
      'Inspect the resulting blend swatch and its exact HEX, RGB, and HSL values.',
      'Review the 9-step progression gradient connecting both input colors.',
    ],
    supportedFormats: [
      { name: 'Linear RGB Blend', desc: 'Direct channel interpolation simulating digital screen blending.' },
      { name: 'Continuous Ratio Slider', desc: 'Fine-grained 1% step control for precise hybrid color creation.' },
      { name: 'Intermediate Step Ramps', desc: '9-color discrete transition strip between Color 1 and Color 2.' },
    ],
    useCases: [
      { title: 'Data Visualization Ramps', desc: 'Build smooth diverging and sequential color scales between two metric thresholds.' },
      { title: 'Brand Harmonization', desc: 'Create neutral bridge colors between two distinct partner or sub-brand identities.' },
      { title: 'Digital Illustration', desc: 'Calculate realistic shadow and highlight colors by blending surface hue with ambient light.' },
    ],
    examples: [
      { input: '#3B82F6 (Blue) + #EF4444 (Red) @ 50%', output: '#95639D', note: 'Balanced violet-purple hybrid blend' },
      { input: '#F59E0B (Amber) + #10B981 (Emerald) @ 50%', output: '#82AB46', note: 'Warm olive-green transition color' },
    ],
    relatedTools: [
      { id: 'tool-gradient', label: 'Gradient Generator', desc: 'Turn your two mixed colors into a CSS gradient.' },
      { id: 'tool-palette', label: 'Palette Generator', desc: 'Generate harmonic color sets from your blend.' },
      { id: 'tool-picker', label: 'Color Picker', desc: 'Fine-tune input colors before mixing.' },
    ],
  },

  'tool-blindness': {
    toolId: 'tool-blindness',
    title: 'Color Blindness Vision Simulator',
    subtitle: 'Simulate 8 types of Color Vision Deficiency (CVD) to verify inclusive design accessibility and visual clarity.',
    overview: 'Simulates how people with color vision deficiencies perceive colors. Powered by the Vienot and Brettel LMS color matrix transformations, it accurately simulates red-weak (Protanopia), green-weak (Deuteranopia), blue-weak (Tritanopia), and total color blindness (Achromatopsia) in real time.',
    howToSteps: [
      'Enter any color using the HEX input or select from preset spectrum swatches.',
      'Review the simulated appearance across all 8 deficiency modes simultaneously.',
      'Compare normal trichromatic vision against dichromatic and monochromatic simulations.',
      'Verify that critical status colors (success, warning, error) remain distinguishable without color alone.',
    ],
    supportedFormats: [
      { name: 'Protanopia / Protanomaly', desc: 'Red-blind and red-weak vision (~1% of males), caused by missing L-cones.' },
      { name: 'Deuteranopia / Deuteranomaly', desc: 'Green-blind and green-weak vision (~5% of males), caused by missing M-cones.' },
      { name: 'Tritanopia / Tritanomaly', desc: 'Blue-blind and blue-weak vision (rare, <0.01%), caused by missing S-cones.' },
      { name: 'Achromatopsia / Achromatomaly', desc: 'Complete rod monochromacy (total absence of color vision, grayscale perception).' },
    ],
    useCases: [
      { title: 'Accessible UI Validation', desc: 'Ensure form errors, success messages, and badges do not rely solely on red/green distinctions.' },
      { title: 'Chart & Graph Design', desc: 'Verify that multiple data series in bar, pie, and line charts remain easily identifiable.' },
      { title: 'Inclusive Brand Guidelines', desc: 'Test corporate identity palettes to ensure equal visual impact for all users.' },
    ],
    examples: [
      { input: '#EF4444 (Alert Red) under Deuteranopia', output: 'Perceived as muted brownish-yellow', note: 'Always pair red errors with an icon' },
      { input: '#10B981 (Success Green) under Protanopia', output: 'Perceived as soft desaturated brown', note: 'Add checkmark icons for clear status' },
    ],
    relatedTools: [
      { id: 'tool-contrast', label: 'Contrast Checker', desc: 'Ensure sufficient luminance contrast for low-vision users.' },
      { id: 'tool-picker', label: 'Color Picker', desc: 'Pick alternative hues that remain distinct under CVD.' },
      { id: 'learn', label: 'Color Theory Guide', desc: 'Learn more about human color perception and cones.' },
    ],
  },

  'tool-exporter': {
    toolId: 'tool-exporter',
    title: 'CSS Color Generator & Palette Code Exporter',
    subtitle: 'Export color palettes into production-ready CSS Custom Properties, Tailwind CSS, SCSS, JSON tokens, and Swift.',
    overview: 'Converts color palettes into production-ready code snippets formatted for modern web and mobile frameworks. Choose from CSS custom properties, Tailwind CSS v3 / v4 theme config, SCSS variables, JSON design tokens, or Apple Swift with custom variable naming conventions.',
    howToSteps: [
      'Select your palette from saved favorites or load the current active workspace colors.',
      'Choose your target format: CSS Variables, Tailwind Config, SCSS, JSON Tokens, or Swift.',
      'Toggle syntax options: Hexadecimal, RGB, or HSL color representation.',
      'Click \'Copy Code\' to copy formatted code directly into your stylesheet or config file.',
    ],
    supportedFormats: [
      { name: 'CSS3 Custom Properties', desc: ':root { --color-primary: #6366f1; } for modern vanilla CSS.' },
      { name: 'Tailwind CSS Theme', desc: 'module.exports = { theme: { colors: ... } } for Tailwind 3 and 4.' },
      { name: 'SCSS / SASS Variables', desc: '$color-primary: #6366f1; for Sass preprocessor workflows.' },
      { name: 'JSON Design Tokens', desc: 'W3C Community Group design token format for Figma-to-code pipelines.' },
      { name: 'Apple Swift (iOS)', desc: 'UIColor / Color definitions ready for iOS and macOS Xcode projects.' },
    ],
    useCases: [
      { title: 'Design Token Handoff', desc: 'Streamline collaboration between UI designers and engineering teams with standardized tokens.' },
      { title: 'Tailwind Theme Setup', desc: 'Quickly populate tailwind.config.js with consistent, harmonized brand color definitions.' },
      { title: 'Multi-Platform Consistency', desc: 'Export identical palette values simultaneously for Web (CSS), iOS (Swift), and Android.' },
    ],
    examples: [
      { input: 'CSS Variables Format', output: ':root { --primary: #6366f1; --accent: #ec4899; }', note: 'Drop-in stylesheet integration' },
      { input: 'Tailwind Config Format', output: 'colors: { primary: \'#6366f1\', accent: \'#ec4899\' }', note: 'Ready for tailwind.config.js' },
    ],
    relatedTools: [
      { id: 'tool-palette', label: 'Palette Generator', desc: 'Generate new harmonic palettes before exporting.' },
      { id: 'tool-shades', label: 'Shades & Tints', desc: 'Generate 10-step scales to export complete themes.' },
      { id: 'tool-converter', label: 'Color Converter', desc: 'Convert exported colors into different color spaces.' },
    ],
  },
};
