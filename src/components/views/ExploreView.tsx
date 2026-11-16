import React, { useState, useMemo } from 'react';
import { COLOR_DATASET } from '../../utils/colorDataset';
import { ColorFamily, ActiveTab } from '../../types/color';
import { ColorSwatch } from '../ui/ColorSwatch';
import { hexToRgb, rgbToHsl } from '../../utils/colorEngine';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Palette,
} from 'lucide-react';

interface ExploreViewProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  isColorFavorited: (hex: string) => boolean;
  onToggleFavorite: (hex: string) => void;
  initialFamily?: ColorFamily | null;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onNavigate,
  isColorFavorited,
  onToggleFavorite,
  initialFamily = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily | 'all'>(
    initialFamily || 'all'
  );
  const [minLightness, setMinLightness] = useState(0);
  const [maxLightness, setMaxLightness] = useState(100);
  const [minSaturation, setMinSaturation] = useState(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'name-asc' | 'name-desc' | 'hue' | 'lightness'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const families: (ColorFamily | 'all')[] = [
    'all',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'brown',
    'gray',
    'black',
    'white',
  ];

  // Pre-calculate HSL for fast filtering
  const enrichedColors = useMemo(() => {
    return COLOR_DATASET.map((c) => {
      const rgb = hexToRgb(c.hex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return {
        ...c,
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
    });
  }, []);

  const filteredColors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return enrichedColors
      .filter((color) => {
        // Family match
        if (selectedFamily !== 'all' && color.family !== selectedFamily) {
          return false;
        }

        // Query match
        if (q) {
          const matchName = color.name.toLowerCase().includes(q);
          const matchHex = color.hex.toLowerCase().includes(q);
          const matchRgb = `rgb(${color.r},${color.g},${color.b})`.includes(q.replace(/\s+/g, ''));
          if (!matchName && !matchHex && !matchRgb) return false;
        }

        // Lightness match
        if (color.l < minLightness || color.l > maxLightness) return false;

        // Saturation match
        if (color.s < minSaturation) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'hue') return a.h - b.h;
        if (sortBy === 'lightness') return a.l - b.l;
        return 0;
      });
  }, [enrichedColors, searchQuery, selectedFamily, minLightness, maxLightness, minSaturation, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('all');
    setMinLightness(0);
    setMaxLightness(100);
    setMinSaturation(0);
    setSortBy('popularity');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-300 mb-3 font-mono">
          <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>COLOR REPOSITORY &middot; DYNAMIC SEARCH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Color Spectrum
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Search over standard named colors, filter across families, sort by optical properties, and inspect deep color metrics.
        </p>
      </div>

      {/* Main Search & Control Bar */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-xl mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by color name, HEX code (e.g. #DC143C), or RGB..."
              className="w-full bg-slate-50 dark:bg-[#181A24] border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-white dark:bg-[#181A24] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="name-asc">Sort: Name (A &rarr; Z)</option>
              <option value="name-desc">Sort: Name (Z &rarr; A)</option>
              <option value="hue">Sort: Hue Angle (0&deg; &rarr; 360&deg;)</option>
              <option value="lightness">Sort: Lightness</option>
            </select>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                showFilters
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Color Family Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {families.map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedFamily(fam)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                selectedFamily === fam
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:border-white/5'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Expandable Advanced Filters (Hue, Lightness, Saturation) */}
        {showFilters && (
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Min Saturation ({minSaturation}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={minSaturation}
                onChange={(e) => setMinSaturation(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Min Lightness ({minLightness}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={minLightness}
                onChange={(e) => setMinLightness(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Max Lightness ({maxLightness}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={maxLightness}
                onChange={(e) => setMaxLightness(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline font-medium"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{filteredColors.length}</strong> colors
        </span>
        {selectedFamily !== 'all' && (
          <span className="capitalize">Family: {selectedFamily}</span>
        )}
      </div>

      {/* Colors Grid */}
      {filteredColors.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredColors.map((color) => (
            <ColorSwatch
              key={color.hex + color.name}
              hex={color.hex}
              name={color.name}
              size="md"
              onSelect={(h) => onNavigate('color-detail', h)}
              isFavorited={isColorFavorited(color.hex)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-[#12131A] rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
          <Filter className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No colors match your filters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, family filter, or slider thresholds.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
