import React, { useState, useMemo } from 'react';
import {
  FileCode2,
  Search,
  Smartphone,
  Layers,
  Terminal,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

// 140 standard named CSS colors
const STANDARD_CSS_COLORS = [
  { name: 'aliceblue', hex: '#F0F8FF' },
  { name: 'antiquewhite', hex: '#FAEBD7' },
  { name: 'aqua', hex: '#00FFFF' },
  { name: 'aquamarine', hex: '#7FFFD4' },
  { name: 'azure', hex: '#F0FFFF' },
  { name: 'beige', hex: '#F5F5DC' },
  { name: 'bisque', hex: '#FFE4C4' },
  { name: 'black', hex: '#000000' },
  { name: 'blanchedalmond', hex: '#FFEBCD' },
  { name: 'blue', hex: '#0000FF' },
  { name: 'blueviolet', hex: '#8A2BE2' },
  { name: 'brown', hex: '#A52A2A' },
  { name: 'burlywood', hex: '#DEB887' },
  { name: 'cadetblue', hex: '#5F9EA0' },
  { name: 'chartreuse', hex: '#7FFF00' },
  { name: 'chocolate', hex: '#D2691E' },
  { name: 'coral', hex: '#FF7F50' },
  { name: 'cornflowerblue', hex: '#6495ED' },
  { name: 'cornsilk', hex: '#FFF8DC' },
  { name: 'crimson', hex: '#DC143C' },
  { name: 'cyan', hex: '#00FFFF' },
  { name: 'darkblue', hex: '#00008B' },
  { name: 'darkcyan', hex: '#008B8B' },
  { name: 'darkgoldenrod', hex: '#B8860B' },
  { name: 'darkgray', hex: '#A9A9A9' },
  { name: 'darkgreen', hex: '#006400' },
  { name: 'darkkhaki', hex: '#BDB76B' },
  { name: 'darkmagenta', hex: '#8B008B' },
  { name: 'darkolivegreen', hex: '#556B2F' },
  { name: 'darkorange', hex: '#FF8C00' },
  { name: 'darkorchid', hex: '#9932CC' },
  { name: 'darkred', hex: '#8B0000' },
  { name: 'darksalmon', hex: '#E9967A' },
  { name: 'darkseagreen', hex: '#8FBC8F' },
  { name: 'darkslateblue', hex: '#483D8B' },
  { name: 'darkslategray', hex: '#2F4F4F' },
  { name: 'darkturquoise', hex: '#00CED1' },
  { name: 'darkviolet', hex: '#9400D3' },
  { name: 'deeppink', hex: '#FF1493' },
  { name: 'deepskyblue', hex: '#00BFFF' },
  { name: 'dimgray', hex: '#696969' },
  { name: 'dodgerblue', hex: '#1E90FF' },
  { name: 'firebrick', hex: '#B22222' },
  { name: 'floralwhite', hex: '#FFFAF0' },
  { name: 'forestgreen', hex: '#228B22' },
  { name: 'fuchsia', hex: '#FF00FF' },
  { name: 'gainsboro', hex: '#DCDCDC' },
  { name: 'ghostwhite', hex: '#F8F8FF' },
  { name: 'gold', hex: '#FFD700' },
  { name: 'goldenrod', hex: '#DAA520' },
  { name: 'gray', hex: '#808080' },
  { name: 'green', hex: '#008000' },
  { name: 'greenyellow', hex: '#ADFF2F' },
  { name: 'honeydew', hex: '#F0FFF0' },
  { name: 'hotpink', hex: '#FF69B4' },
  { name: 'indianred', hex: '#CD5C5C' },
  { name: 'indigo', hex: '#4B0082' },
  { name: 'ivory', hex: '#FFFFF0' },
  { name: 'khaki', hex: '#F0E68C' },
  { name: 'lavender', hex: '#E6E6FA' },
  { name: 'lavenderblush', hex: '#FFF0F5' },
  { name: 'lawngreen', hex: '#7CFC00' },
  { name: 'lemonchiffon', hex: '#FFFACD' },
  { name: 'lightblue', hex: '#ADD8E6' },
  { name: 'lightcoral', hex: '#F08080' },
  { name: 'lightcyan', hex: '#E0FFFF' },
  { name: 'lightgoldenrodyellow', hex: '#FAFAD2' },
  { name: 'lightgray', hex: '#D3D3D3' },
  { name: 'lightgreen', hex: '#90EE90' },
  { name: 'lightpink', hex: '#FFB6C1' },
  { name: 'lightsalmon', hex: '#FFA07A' },
  { name: 'lightseagreen', hex: '#20B2AA' },
  { name: 'lightskyblue', hex: '#87CEFA' },
  { name: 'lightslategray', hex: '#778899' },
  { name: 'lightsteelblue', hex: '#B0C4DE' },
  { name: 'lightyellow', hex: '#FFFFE0' },
  { name: 'lime', hex: '#00FF00' },
  { name: 'limegreen', hex: '#32CD32' },
  { name: 'linen', hex: '#FAF0E6' },
  { name: 'magenta', hex: '#FF00FF' },
  { name: 'maroon', hex: '#800000' },
  { name: 'mediumaquamarine', hex: '#66CDAA' },
  { name: 'mediumblue', hex: '#0000CD' },
  { name: 'mediumorchid', hex: '#BA55D3' },
  { name: 'mediumpurple', hex: '#9370DB' },
  { name: 'mediumseagreen', hex: '#3CB371' },
  { name: 'mediumslateblue', hex: '#7B68EE' },
  { name: 'mediumspringgreen', hex: '#00FA9A' },
  { name: 'mediumturquoise', hex: '#48D1CC' },
  { name: 'mediumvioletred', hex: '#C71585' },
  { name: 'midnightblue', hex: '#191970' },
  { name: 'mintcream', hex: '#F5FFFA' },
  { name: 'mistyrose', hex: '#FFE4E1' },
  { name: 'moccasin', hex: '#FFE4B5' },
  { name: 'navajowhite', hex: '#FFDEAD' },
  { name: 'navy', hex: '#000080' },
  { name: 'oldlace', hex: '#FDF5E6' },
  { name: 'olive', hex: '#808000' },
  { name: 'olivedrab', hex: '#6B8E23' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'orangered', hex: '#FF4500' },
  { name: 'orchid', hex: '#DA70D6' },
  { name: 'palegoldenrod', hex: '#EEE8AA' },
  { name: 'palegreen', hex: '#98FB98' },
  { name: 'paleturquoise', hex: '#AFEEEE' },
  { name: 'palevioletred', hex: '#DB7093' },
  { name: 'papayawhip', hex: '#FFEFD5' },
  { name: 'peachpuff', hex: '#FFDAB9' },
  { name: 'peru', hex: '#CD853F' },
  { name: 'pink', hex: '#FFC0CB' },
  { name: 'plum', hex: '#DDA0DD' },
  { name: 'powderblue', hex: '#B0E0E6' },
  { name: 'purple', hex: '#800080' },
  { name: 'rebeccapurple', hex: '#663399' },
  { name: 'red', hex: '#FF0000' },
  { name: 'rosybrown', hex: '#BC8F8F' },
  { name: 'royalblue', hex: '#4169E1' },
  { name: 'saddlebrown', hex: '#8B4513' },
  { name: 'salmon', hex: '#FA8072' },
  { name: 'sandybrown', hex: '#F4A460' },
  { name: 'seagreen', hex: '#2E8B57' },
  { name: 'seashell', hex: '#FFF5EE' },
  { name: 'sienna', hex: '#A0522D' },
  { name: 'silver', hex: '#C0C0C0' },
  { name: 'skyblue', hex: '#87CEEB' },
  { name: 'slateblue', hex: '#6A5ACD' },
  { name: 'slategray', hex: '#708090' },
  { name: 'snow', hex: '#FFFAFA' },
  { name: 'springgreen', hex: '#00FF7F' },
  { name: 'steelblue', hex: '#4682B4' },
  { name: 'tan', hex: '#D2B48C' },
  { name: 'teal', hex: '#008080' },
  { name: 'thistle', hex: '#D8BFD8' },
  { name: 'tomato', hex: '#FF6347' },
  { name: 'turquoise', hex: '#40E0D0' },
  { name: 'violet', hex: '#EE82EE' },
  { name: 'wheat', hex: '#F5DEB3' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'whitesmoke', hex: '#F5F5F5' },
  { name: 'yellow', hex: '#FFFF00' },
  { name: 'yellowgreen', hex: '#9ACD32' },
];

interface DeveloperViewProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
}

export const DeveloperView: React.FC<DeveloperViewProps> = ({
  onNavigate,
  onCopySuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'android' | 'scss' | 'html-reference'>('html-reference');
  const [referenceSearch, setReferenceSearch] = useState('');

  const filteredStandardColors = useMemo(() => {
    const q = referenceSearch.trim().toLowerCase();
    if (!q) return STANDARD_CSS_COLORS;
    return STANDARD_CSS_COLORS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q)
    );
  }, [referenceSearch]);

  const sampleThemeVariables = `:root {
  /* Chroma Studio Design System */
  --color-primary: #6366F1;
  --color-primary-hover: #4F46E5;
  --color-secondary: #EC4899;
  --color-accent: #10B981;
  --color-background: #090A0F;
  --color-surface: #12131A;
  --color-surface-hover: #161822;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-text-primary: #F8FAFC;
  --color-text-muted: #94A3B8;
}`;

  const sampleAndroidColors = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generated Android Color Resource for colors.xml -->
<resources>
    <color name="primary">#FF6366F1</color>
    <color name="primary_variant">#FF4F46E5</color>
    <color name="secondary">#FFEC4899</color>
    <color name="accent">#FF10B981</color>
    <color name="background">#FF090A0F</color>
    <color name="surface">#FF12131A</color>
    <color name="on_primary">#FFFFFFFF</color>
    <color name="on_background">#FFF8FAFC</color>
</resources>`;

  const sampleTailwindConfig = `// tailwind.config.js - Modern Color Palette
module.exports = {
  theme: {
    extend: {
      colors: {
        chroma: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // Primary Brand
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
      },
    },
  },
};`;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-300 mb-3 font-mono">
          <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>DEVELOPER HUB &middot; PRODUCTION CODE GENERATORS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Developer Color Workspace
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Everything developers need to integrate colors cleanly into web frameworks, Android Jetpack Compose, CSS architectures, and Tailwind configurations.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-[#12131A] p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 w-fit">
        {[
          { id: 'html-reference', label: '140 HTML CSS Colors' },
          { id: 'css', label: 'CSS Variables System' },
          { id: 'android', label: 'Android XML (colors.xml)' },
          { id: 'tailwind', label: 'Tailwind Config' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:text-blue-700 dark:active:text-blue-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: HTML CSS 140 Reference */}
      {activeTab === 'html-reference' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-xl flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={referenceSearch}
                onChange={(e) => setReferenceSearch(e.target.value)}
                placeholder="Search standard 140 CSS colors (e.g. crimson, dodgerblue)..."
                className="w-full bg-slate-50 dark:bg-[#181A24] border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Showing {filteredStandardColors.length} standard colors
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredStandardColors.map((item) => (
              <div
                key={item.name}
                className="group p-3 rounded-2xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col justify-between shadow-2xs dark:shadow-none"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onNavigate('color-detail', item.hex)}
                    className="w-full h-14 rounded-xl shadow-inner border border-slate-200 dark:border-white/10 mb-2 cursor-pointer transition-transform group-hover:scale-102 block"
                    style={{ backgroundColor: item.hex }}
                    title={`Inspect ${item.name} (${item.hex})`}
                    aria-label={`Inspect ${item.name} (${item.hex})`}
                  />
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{item.hex}</p>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <CopyButton textToCopy={item.hex} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
                  <button
                    onClick={() => onNavigate('color-detail', item.hex)}
                    className="text-[10px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                  >
                    Inspect &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: CSS Variables */}
      {activeTab === 'css' && (
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Production CSS Custom Properties
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Standard CSS tokens for consistent design token implementation.
              </p>
            </div>
            <CopyButton textToCopy={sampleThemeVariables} label="Copy CSS" size="sm" variant="filled" onCopySuccess={onCopySuccess} />
          </div>

          <pre className="p-5 rounded-2xl bg-[#090A0F] border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-200 overflow-auto max-h-[420px] custom-scroll">
            <code>{sampleThemeVariables}</code>
          </pre>
        </div>
      )}

      {/* Tab 3: Android XML */}
      {activeTab === 'android' && (
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Android Color Resources (res/values/colors.xml)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Standard Android 8-digit ARGB hex declarations for native Kotlin and Jetpack Compose apps.
              </p>
            </div>
            <CopyButton textToCopy={sampleAndroidColors} label="Copy XML" size="sm" variant="filled" onCopySuccess={onCopySuccess} />
          </div>

          <pre className="p-5 rounded-2xl bg-[#090A0F] border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-200 overflow-auto max-h-[420px] custom-scroll">
            <code>{sampleAndroidColors}</code>
          </pre>
        </div>
      )}

      {/* Tab 4: Tailwind Config */}
      {activeTab === 'tailwind' && (
        <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Tailwind CSS Extended Theme Configuration
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Clean 50-to-950 color scale object for tailwind.config.js or Tailwind v4 theme definitions.
              </p>
            </div>
            <CopyButton textToCopy={sampleTailwindConfig} label="Copy Config" size="sm" variant="filled" onCopySuccess={onCopySuccess} />
          </div>

          <pre className="p-5 rounded-2xl bg-[#090A0F] border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-200 overflow-auto max-h-[420px] custom-scroll">
            <code>{sampleTailwindConfig}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
