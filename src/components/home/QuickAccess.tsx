import React from 'react';
import {
  Pipette,
  Repeat,
  Palette,
  Image as ImageIcon,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';

interface QuickAccessProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  const tools = [
    {
      id: 'tool-picker' as ActiveTab,
      name: 'Color Picker',
      desc: 'Precision visual color wheel, eye-dropper, and live format outputs.',
      icon: <Pipette className="w-5 h-5 text-indigo-400" />,
      accent: 'from-indigo-500/20 to-purple-500/10',
      badge: 'Interactive',
    },
    {
      id: 'tool-converter' as ActiveTab,
      name: 'Color Converter',
      desc: 'Instant bidirectional conversion across HEX, RGB, HSL, HSV, and CMYK.',
      icon: <Repeat className="w-5 h-5 text-sky-400" />,
      accent: 'from-sky-500/20 to-blue-500/10',
      badge: 'Reactive Math',
    },
    {
      id: 'tool-palette' as ActiveTab,
      name: 'Palette Generator',
      desc: 'Create harmonious schemes with color locking, spacebar generator, and JSON export.',
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      accent: 'from-amber-500/20 to-orange-500/10',
      badge: 'Color Harmonies',
    },
    {
      id: 'tool-image' as ActiveTab,
      name: 'Image Color Picker',
      desc: 'Local browser canvas pixel sampler with magnifying loupe and dominant palette extraction.',
      icon: <ImageIcon className="w-5 h-5 text-emerald-400" />,
      accent: 'from-emerald-500/20 to-teal-500/10',
      badge: '100% Private',
    },
    {
      id: 'tool-contrast' as ActiveTab,
      name: 'Contrast Checker',
      desc: 'Verify WCAG 2.1 AA/AAA compliance for text legibility and accessible design.',
      icon: <CheckCircle className="w-5 h-5 text-teal-400" />,
      accent: 'from-teal-500/20 to-cyan-500/10',
      badge: 'WCAG 2.1',
    },
    {
      id: 'tool-gradient' as ActiveTab,
      name: 'Gradient Generator',
      desc: 'Design linear, radial, and conic multi-stop gradients with instant CSS code export.',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      accent: 'from-purple-500/20 to-pink-500/10',
      badge: 'CSS Exporter',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
              SUITE CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Quick Access Tools
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Production-grade color calculators running entirely inside your browser with zero latency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool) => (
            <button
              type="button"
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group relative p-6 rounded-3xl bg-white dark:bg-[#12131A] hover:bg-slate-50 dark:hover:bg-[#161822] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl hover:-translate-y-1 text-left w-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.accent} border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner`}
                  >
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 mt-6 transition-colors">
                <span>Launch tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
