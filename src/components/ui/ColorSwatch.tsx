import React from 'react';
import { Heart } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { getRelativeLuminance, hexToRgb } from '../../utils/colorEngine';

interface ColorSwatchProps {
  hex: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  onSelect?: (hex: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (hex: string) => void;
  className?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  hex,
  name,
  size = 'md',
  showDetails = true,
  onSelect,
  isFavorited = false,
  onToggleFavorite,
  className = '',
}) => {
  const rgb = hexToRgb(hex);
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  const isDark = luminance < 0.25;
  const textColor = isDark ? '#FFFFFF' : '#0F172A';

  const heightClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-36',
    xl: 'h-48',
  };

  return (
    <div
      onClick={() => onSelect && onSelect(hex)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onSelect) {
          e.preventDefault();
          onSelect(hex);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Select color ${name || hex}`}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12131A] shadow-md hover:shadow-xl hover:border-indigo-300 dark:hover:border-white/25 transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
    >
      {/* Color Display Block */}
      <div
        className={`w-full ${heightClasses[size]} relative transition-transform duration-300 group-hover:scale-[1.02] flex items-end justify-between p-3`}
        style={{ backgroundColor: hex }}
      >
        {/* Subtle inner shadow highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

        {/* Favorite button on top right of swatch */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(hex);
            }}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all duration-200 ${
              isFavorited
                ? 'bg-rose-500/90 text-white shadow-sm'
                : 'bg-black/30 hover:bg-black/50 text-white/80 hover:text-white opacity-0 group-hover:opacity-100'
            }`}
            title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Favorite color"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Quick HEX tag overlaid on the color */}
        <span
          className="relative text-xs font-mono font-semibold px-2 py-0.5 rounded-md backdrop-blur-md transition-opacity duration-200"
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            color: textColor,
          }}
        >
          {hex.toUpperCase()}
        </span>
      </div>

      {/* Info & Copy Strip */}
      {showDetails && (
        <div className="flex items-center justify-between p-3 gap-2 bg-slate-50 dark:bg-[#151620] border-t border-slate-200 dark:border-white/5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              {name || hex}
            </p>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
              {rgb.r}, {rgb.g}, {rgb.b}
            </p>
          </div>
          <div className="shrink-0">
            <CopyButton textToCopy={hex} showIconOnly size="sm" variant="ghost" />
          </div>
        </div>
      )}
    </div>
  );
};
