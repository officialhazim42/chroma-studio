import React, { useState, useMemo } from 'react';
import { CURATED_PALETTES, PALETTE_CATEGORIES } from '../../utils/paletteDataset';
import { Palette, ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';
import {
  Palette as PaletteIcon,
  Search,
  Heart,
  Sparkles,
  Download,
  FileCode,
} from 'lucide-react';

interface PalettesViewProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  isFavorited: (id: string) => boolean;
  onToggleFavorite: (palette: Palette) => void;
}

export const PalettesView: React.FC<PalettesViewProps> = ({
  onNavigate,
  onCopySuccess,
  isFavorited,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPalettes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CURATED_PALETTES.filter((palette) => {
      if (selectedCategory !== 'All' && palette.category !== selectedCategory) {
        return false;
      }
      if (q) {
        const matchName = palette.name.toLowerCase().includes(q);
        const matchCategory = palette.category.toLowerCase().includes(q);
        const matchHex = palette.colors.some((c) => c.toLowerCase().includes(q));
        const matchTag = palette.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCategory && !matchHex && !matchTag) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const exportPaletteCss = (palette: Palette) => {
    const lines = palette.colors
      .map((c, i) => `  --${palette.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}: ${c};`)
      .join('\n');
    const css = `:root {\n${lines}\n}`;
    navigator.clipboard.writeText(css);
    onCopySuccess(`Copied CSS variables for "${palette.name}"!`);
  };

  const exportPaletteJson = (palette: Palette) => {
    const jsonStr = JSON.stringify(
      {
        paletteName: palette.name,
        category: palette.category,
        colors: palette.colors,
        tags: palette.tags,
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onCopySuccess(`Downloaded "${palette.name}" JSON!`);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-300 mb-3 font-mono">
          <PaletteIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>CURATED HARMONIC COLLECTIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Color Palettes
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Discover hand-crafted color palettes categorized across 12 distinct aesthetic styles. Copy codes, save locally, or open directly in the Palette Generator.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-xl mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search palettes by name, color HEX, or vibe (e.g. Nordic, Cyberpunk, Luxury)..."
            className="w-full bg-slate-50 dark:bg-[#181A24] border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PALETTE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-amber-600 dark:hover:text-amber-400 active:text-amber-700 dark:active:text-amber-300 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Palettes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPalettes.map((palette) => {
          const fav = isFavorited(palette.id);
          const hexList = palette.colors.join(', ');

          return (
            <div
              key={palette.id}
              className="group p-5 rounded-3xl bg-white dark:bg-[#12131A] hover:bg-slate-50 dark:hover:bg-[#161822] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Swatch Strip */}
                <div className="h-32 w-full rounded-2xl overflow-hidden flex shadow-inner border border-slate-200 dark:border-white/10 mb-4 cursor-pointer">
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

                {/* Header & Category Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
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

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                  {palette.name}
                </h3>

                {/* HEX chips */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {palette.colors.map((c, idx) => (
                    <button
                      type="button"
                      key={`${c}-${idx}`}
                      onClick={() => onNavigate('color-detail', c)}
                      className="text-[11px] font-mono text-slate-600 hover:text-indigo-600 active:text-indigo-700 dark:text-slate-400 dark:hover:text-indigo-300 dark:active:text-indigo-200 cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 px-2 py-0.5 rounded transition-colors border-0"
                      title={`Inspect color ${c}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-xs">
                <CopyButton
                  textToCopy={hexList}
                  label="Copy All HEX"
                  size="sm"
                  variant="ghost"
                  onCopySuccess={onCopySuccess}
                />

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => exportPaletteCss(palette)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-white"
                    title="Copy CSS variables"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => exportPaletteJson(palette)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-white"
                    title="Download JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('tool-palette', palette.colors[0])}
                    className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-300 font-semibold flex items-center gap-1"
                    title="Open in Palette Generator"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
