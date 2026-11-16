import React from 'react';
import { COLOR_DATASET } from '../../utils/colorDataset';
import { ColorSwatch } from '../ui/ColorSwatch';
import { ActiveTab } from '../../types/color';
import { ArrowRight } from 'lucide-react';

interface PopularColorsProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  isColorFavorited: (hex: string) => boolean;
  onToggleFavorite: (hex: string) => void;
}

export const PopularColors: React.FC<PopularColorsProps> = ({
  onNavigate,
  isColorFavorited,
  onToggleFavorite,
}) => {
  // Select top popular curated colors
  const popular = COLOR_DATASET.filter((c) => c.popular).slice(0, 8);

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-white/5 bg-slate-50/60 dark:bg-[#08090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
              TIMELESS RECOGNITION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Popular Color Codes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View all named colors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {popular.map((color) => (
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
      </div>
    </section>
  );
};
