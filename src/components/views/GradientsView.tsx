import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { ActiveTab, GradientStop } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface GradientsViewProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  onSaveGradient: (name: string, css: string, stops: GradientStop[]) => void;
}

export const GradientsView: React.FC<GradientsViewProps> = ({
  onNavigate,
  onCopySuccess,
  onSaveGradient,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'linear' | 'radial' | 'conic'>('all');

  const gradientsList = [
    {
      id: 'grad-1',
      name: 'Cosmic Violet',
      type: 'linear' as const,
      css: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 50%, #EC4899 100%)',
      stops: [{ color: '#4F46E5', position: 0 }, { color: '#9333EA', position: 50 }, { color: '#EC4899', position: 100 }],
    },
    {
      id: 'grad-2',
      name: 'Cyberpunk Sunset',
      type: 'linear' as const,
      css: 'linear-gradient(45deg, #FF007F 0%, #FF7700 50%, #FFDD00 100%)',
      stops: [{ color: '#FF007F', position: 0 }, { color: '#FF7700', position: 50 }, { color: '#FFDD00', position: 100 }],
    },
    {
      id: 'grad-3',
      name: 'Emerald Lagoon',
      type: 'linear' as const,
      css: 'linear-gradient(90deg, #059669 0%, #10B981 50%, #06B6D4 100%)',
      stops: [{ color: '#059669', position: 0 }, { color: '#10B981', position: 50 }, { color: '#06B6D4', position: 100 }],
    },
    {
      id: 'grad-4',
      name: 'Midnight Abyss',
      type: 'radial' as const,
      css: 'radial-gradient(circle at center, #38BDF8 0%, #1E1B4B 60%, #030712 100%)',
      stops: [{ color: '#38BDF8', position: 0 }, { color: '#1E1B4B', position: 60 }, { color: '#030712', position: 100 }],
    },
    {
      id: 'grad-5',
      name: 'Conic Prism Spectrum',
      type: 'conic' as const,
      css: 'conic-gradient(from 0deg at 50% 50%, #EF4444 0%, #F59E0B 25%, #10B981 50%, #3B82F6 75%, #EF4444 100%)',
      stops: [{ color: '#EF4444', position: 0 }, { color: '#F59E0B', position: 25 }, { color: '#10B981', position: 50 }, { color: '#3B82F6', position: 75 }, { color: '#EF4444', position: 100 }],
    },
    {
      id: 'grad-6',
      name: 'Nordic Frost',
      type: 'linear' as const,
      css: 'linear-gradient(180deg, #E0E7FF 0%, #C7D2FE 50%, #818CF8 100%)',
      stops: [{ color: '#E0E7FF', position: 0 }, { color: '#C7D2FE', position: 50 }, { color: '#818CF8', position: 100 }],
    },
    {
      id: 'grad-7',
      name: 'Warm Terracotta',
      type: 'linear' as const,
      css: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #FDBA74 100%)',
      stops: [{ color: '#7C2D12', position: 0 }, { color: '#C2410C', position: 50 }, { color: '#FDBA74', position: 100 }],
    },
    {
      id: 'grad-8',
      name: 'Neon Laser Glow',
      type: 'radial' as const,
      css: 'radial-gradient(circle at 50% 50%, #00F5D4 0%, #0D0221 80%)',
      stops: [{ color: '#00F5D4', position: 0 }, { color: '#0D0221', position: 80 }],
    },
  ];

  const filtered = filterType === 'all' ? gradientsList : gradientsList.filter((g) => g.type === filterType);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-300 mb-3 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>CHROMATIC GRADIENT GALLERY</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Curated Gradients
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Explore multi-stop linear, radial, and conic gradients designed for heroes, cards, buttons, and visual overlays.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tool-gradient')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all self-start sm:self-auto"
          >
            <span>Open Gradient Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 bg-slate-100 dark:bg-[#12131A] p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 w-fit">
        {(['all', 'linear', 'radial', 'conic'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              filterType === type
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 active:text-purple-700 dark:active:text-purple-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Gradients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((grad) => (
          <div
            key={grad.id}
            className="group rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 p-4 shadow-sm dark:shadow-xl flex flex-col justify-between transition-all"
          >
            <div>
              <button
                type="button"
                onClick={() => onNavigate('tool-gradient')}
                className="w-full h-44 rounded-2xl shadow-inner border border-slate-200 dark:border-white/10 mb-4 transition-transform group-hover:scale-102 flex items-end p-3 cursor-pointer text-left"
                style={{ background: grad.css }}
                title={`Open ${grad.name} in Gradient Generator`}
                aria-label={`Open ${grad.name} in Gradient Generator`}
              >
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-md">
                  {grad.type.toUpperCase()}
                </span>
              </button>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                {grad.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-white/5">
              <CopyButton
                textToCopy={`background: ${grad.css};`}
                label="Copy CSS"
                size="sm"
                variant="ghost"
                onCopySuccess={onCopySuccess}
              />
              <button
                onClick={() => onSaveGradient(grad.name, `background: ${grad.css};`, grad.stops)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-rose-500 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
                title="Save gradient"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
