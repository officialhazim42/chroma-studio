import React from 'react';
import { CURATED_PALETTES } from '../../utils/paletteDataset';
import { Palette, ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface FeaturedPalettesProps {
  onNavigate: (tab: ActiveTab, param?: string) => void;
  onCopySuccess: (text: string) => void;
  isFavorited: (id: string) => boolean;
  onToggleFavorite: (palette: Palette) => void;
}

export const FeaturedPalettes: React.FC<FeaturedPalettesProps> = ({
  onNavigate,
  onCopySuccess,
  isFavorited,
  onToggleFavorite,
}) => {
  // Show 6 curated spotlight palettes
  const spotlight = CURATED_PALETTES.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
              INSPIRATION &amp; HARMONY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Featured Palettes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('palettes')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Explore all palettes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlight.map((palette) => {
            const fav = isFavorited(palette.id);
            const hexList = palette.colors.join(', ');

            return (
              <div
                key={palette.id}
                className="group p-5 rounded-3xl bg-white dark:bg-[#12131A] hover:bg-slate-50 dark:hover:bg-[#161822] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Swatches Strip */}
                  <div className="h-28 w-full rounded-2xl overflow-hidden flex shadow-inner border border-slate-200 dark:border-white/10 mb-4 cursor-pointer">
                    {palette.colors.map((color, idx) => (
                      <button
                        type="button"
                        key={`${color}-${idx}`}
                        onClick={() => onNavigate('color-detail', color)}
                        className="flex-1 min-w-0 h-full relative group/swatch transition-transform duration-200 hover:scale-105 hover:z-10 flex flex-col justify-end p-1 sm:p-2 cursor-pointer border-0 text-left"
                        style={{ backgroundColor: color }}
                        title={`${color} (Click to inspect)`}
                        aria-label={`Inspect ${color}`}
                      >
                        <span className="text-[10px] font-mono font-bold text-white bg-black/40 px-1 py-0.5 rounded opacity-0 group-hover/swatch:opacity-100 transition-opacity truncate hidden sm:inline">
                          {color}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Header & Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                      {palette.category}
                    </span>
                    <button
                      onClick={() => onToggleFavorite(palette)}
                      className={`p-1.5 rounded-full transition-colors ${
                        fav
                          ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10'
                          : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-slate-100 dark:bg-white/5'
                      }`}
                      title={fav ? 'Remove from favorites' : 'Save palette'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {palette.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {palette.colors.map((c, idx) => (
                      <button
                        type="button"
                        key={`${c}-${idx}`}
                        onClick={() => onNavigate('color-detail', c)}
                        className="text-[11px] font-mono text-slate-600 hover:text-indigo-600 active:text-indigo-700 dark:text-slate-400 dark:hover:text-indigo-300 dark:active:text-indigo-200 cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors border-0"
                        title={`Inspect color ${c}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/5">
                  <CopyButton
                    textToCopy={hexList}
                    label="Copy HEX"
                    size="sm"
                    variant="ghost"
                    onCopySuccess={onCopySuccess}
                  />

                  <button
                    onClick={() => onNavigate('tool-palette', palette.colors[0])}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open in Tool</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
