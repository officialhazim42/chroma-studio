import React from 'react';
import {
  Pipette,
  Repeat,
  Palette,
  Image as ImageIcon,
  CheckCircle,
  Sparkles,
  Layers,
  Sliders,
  Eye,
  FileCode2,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';

interface FeaturedToolsProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const FeaturedTools: React.FC<FeaturedToolsProps> = ({ onNavigate }) => {
  const allTenTools = [
    {
      id: 'tool-picker' as ActiveTab,
      name: 'Color Picker',
      desc: 'Interactive visual gradient picker with HEX, RGB, HSL inputs, live preview, and random generation.',
      icon: <Pipette className="w-5 h-5 text-indigo-400" />,
      tag: 'Tool 01',
    },
    {
      id: 'tool-converter' as ActiveTab,
      name: 'Color Converter',
      desc: 'Bidirectional instant calculation across HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK formats.',
      icon: <Repeat className="w-5 h-5 text-sky-400" />,
      tag: 'Tool 02',
    },
    {
      id: 'tool-image' as ActiveTab,
      name: 'Image Color Picker',
      desc: 'Drag, drop, and paste images. Magnifying loupe pixel sampler with local dominant palette extraction.',
      icon: <ImageIcon className="w-5 h-5 text-emerald-400" />,
      tag: 'Tool 03',
    },
    {
      id: 'tool-palette' as ActiveTab,
      name: 'Palette Generator',
      desc: 'Generate complementary, analogous, triadic, tetradic schemes. Lock colors, randomize, export CSS/JSON.',
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      tag: 'Tool 04',
    },
    {
      id: 'tool-contrast' as ActiveTab,
      name: 'Contrast Checker',
      desc: 'Accurate WCAG 2.1 relative luminance calculation. AA/AAA compliance for normal, large text, and UI components.',
      icon: <CheckCircle className="w-5 h-5 text-teal-400" />,
      tag: 'Tool 05',
    },
    {
      id: 'tool-gradient' as ActiveTab,
      name: 'Gradient Generator',
      desc: 'Linear, radial, and conic gradient designer with multi-stop color controls and copyable CSS syntax.',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      tag: 'Tool 06',
    },
    {
      id: 'tool-shades' as ActiveTab,
      name: 'Shades & Tints Generator',
      desc: 'Generate complete tint (white mix), shade (black mix), and tone (gray mix) color steps for UI design systems.',
      icon: <Layers className="w-5 h-5 text-pink-400" />,
      tag: 'Tool 07',
    },
    {
      id: 'tool-mixer' as ActiveTab,
      name: 'Color Mixer',
      desc: 'Blend two colors with a responsive ratio slider, linear intermediate swatches, and hex/rgb results.',
      icon: <Sliders className="w-5 h-5 text-orange-400" />,
      tag: 'Tool 08',
    },
    {
      id: 'tool-blindness' as ActiveTab,
      name: 'Color Blindness Simulator',
      desc: 'Real-time Machado/Brettel LMS simulation for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia.',
      icon: <Eye className="w-5 h-5 text-rose-400" />,
      tag: 'Tool 09',
    },
    {
      id: 'tool-exporter' as ActiveTab,
      name: 'CSS Color Exporter',
      desc: 'Export production code: CSS variables, SCSS variables, Tailwind config, JSON, and Android colors.xml.',
      icon: <FileCode2 className="w-5 h-5 text-blue-400" />,
      tag: 'Tool 10',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
            COMPLETE CREATIVE TOOLKIT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Featured Tools Collection
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Every utility engineered for immediate browser execution with zero external requests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {allTenTools.map((tool) => (
            <button
              type="button"
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group p-5 rounded-2xl bg-white dark:bg-[#12131A] hover:bg-slate-50 dark:hover:bg-[#161822] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 transition-all flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-lg hover:-translate-y-1 text-left w-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 mt-4 transition-colors pt-3 border-t border-slate-100 dark:border-white/5">
                <span>Open tool</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
