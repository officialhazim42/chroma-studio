import React, { useState, useMemo, useRef } from 'react';
import {
  Heart,
  Search,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { SavedItem, ActiveTab, ColorData, Palette as PaletteType, Gradient as GradientType } from '../../types/color';
import { exportFavoritesJson, importFavoritesJson } from '../../utils/storage';
import { CopyButton } from '../ui/CopyButton';

interface FavoritesViewProps {
  favorites: SavedItem[];
  onRemoveFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  onReloadFavorites: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAllFavorites,
  onNavigate,
  onCopySuccess,
  onReloadFavorites,
}) => {
  const [activeTabType, setActiveTabType] = useState<'all' | 'color' | 'palette' | 'gradient'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return favorites.filter((item) => {
      if (activeTabType !== 'all' && item.type !== activeTabType) return false;
      if (q) {
        const matchName = item.name.toLowerCase().includes(q);
        let matchContent = false;
        if (item.type === 'color') {
          matchContent = (item.data as ColorData).hex?.toLowerCase().includes(q);
        } else if (item.type === 'palette') {
          matchContent = (item.data as PaletteType).colors?.some((c) => c.toLowerCase().includes(q));
        }
        if (!matchName && !matchContent) return false;
      }
      return true;
    });
  }, [favorites, activeTabType, searchQuery]);

  const handleExportJson = () => {
    const jsonStr = exportFavoritesJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chroma-favorites-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onCopySuccess('Exported favorites JSON file!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      const res = importFavoritesJson(content);
      if (res.success) {
        onReloadFavorites();
        onCopySuccess(`Successfully imported ${res.count} items!`);
      } else {
        alert(res.error || 'Failed to import JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-600 dark:text-rose-300 mb-3 font-mono">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>LOCAL VAULT &middot; PRIVACY-FIRST STORAGE</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Saved Favorites &amp; Collections
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              All your favorited colors, palettes, and gradients are stored securely inside your browser&rsquo;s local storage. Zero telemetry, zero tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportJson}
              disabled={favorites.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 disabled:opacity-40 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Import JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />

            {favorites.length > 0 && (
              <button
                onClick={() => setConfirmClearOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Control & Search Bar */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-xl mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved colors, palettes, or gradients..."
            className="w-full bg-slate-50 dark:bg-[#181A24] border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white"
          />
        </div>

        {/* Filter Type Pills */}
        <div className="flex gap-1 bg-slate-100 dark:bg-[#181A24] p-1 rounded-xl border border-slate-200 dark:border-white/5">
          {[
            { id: 'all', label: `All (${favorites.length})` },
            { id: 'color', label: 'Colors' },
            { id: 'palette', label: 'Palettes' },
            { id: 'gradient', label: 'Gradients' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabType(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTabType === tab.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 active:text-rose-700 dark:active:text-rose-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites List / Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            if (item.type === 'color') {
              const colorData = item.data as ColorData;
              return (
                <div
                  key={item.id}
                  className="group p-4 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-md dark:shadow-xl flex flex-col justify-between"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('color-detail', colorData.hex)}
                    className="w-full h-36 rounded-2xl mb-3 shadow-inner border border-slate-200 dark:border-white/10 cursor-pointer transition-transform group-hover:scale-102 flex flex-col justify-between p-3 text-left"
                    style={{ backgroundColor: colorData.hex }}
                    title={`Inspect ${colorData.name || colorData.hex}`}
                    aria-label={`Inspect ${colorData.name || colorData.hex}`}
                  >
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md self-start text-white bg-black/30">
                      COLOR
                    </span>
                    <span className="text-sm font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-md self-end">
                      {colorData.hex}
                    </span>
                  </button>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {colorData.name || item.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                      {colorData.cssRgb}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-white/5">
                    <CopyButton textToCopy={colorData.hex} size="sm" variant="ghost" onCopySuccess={onCopySuccess} />
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            }

            if (item.type === 'palette') {
              const pal = item.data as PaletteType;
              return (
                <div
                  key={item.id}
                  className="group p-4 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-md dark:shadow-xl flex flex-col justify-between"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('tool-palette', pal.colors?.[0])}
                    className="w-full h-36 rounded-2xl overflow-hidden flex shadow-inner border border-slate-200 dark:border-white/10 mb-3 cursor-pointer text-left p-0"
                    title={`Open ${pal.name || item.name} in Palette Generator`}
                    aria-label={`Open ${pal.name || item.name} in Palette Generator`}
                  >
                    {pal.colors?.map((c, idx) => (
                      <div key={`${c}-${idx}`} className="flex-1 min-w-0 h-full" style={{ backgroundColor: c }} />
                    ))}
                  </button>

                  <div>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider font-semibold">
                      PALETTE &middot; {pal.colors?.length} Colors
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {pal.name || item.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-white/5">
                    <CopyButton textToCopy={pal.colors?.join(', ') || ''} label="Copy HEX" size="sm" variant="ghost" onCopySuccess={onCopySuccess} />
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            }

            if (item.type === 'gradient') {
              const grad = item.data as GradientType;
              return (
                <div
                  key={item.id}
                  className="group p-4 rounded-3xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-md dark:shadow-xl flex flex-col justify-between"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('tool-gradient')}
                    className="w-full h-36 rounded-2xl shadow-inner border border-slate-200 dark:border-white/10 mb-3 cursor-pointer text-left p-0"
                    style={{ background: grad.css || '' }}
                    title={`Open ${grad.name || item.name} in Gradient Generator`}
                    aria-label={`Open ${grad.name || item.name} in Gradient Generator`}
                  />

                  <div>
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider font-semibold">
                      GRADIENT
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {grad.name || item.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-white/5">
                    <CopyButton textToCopy={grad.css || ''} label="Copy CSS" size="sm" variant="ghost" onCopySuccess={onCopySuccess} />
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-[#12131A] rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
          <Heart className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No saved favorites found</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No saved items match "${searchQuery}".`
              : 'You haven’t saved any colors, palettes, or gradients yet. Click the heart icon on any color or palette to keep it here.'}
          </p>
          <button
            onClick={() => onNavigate('explore')}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm"
          >
            Explore Colors
          </button>
        </div>
      )}

      {/* Confirmation Modal to Clear All */}
      {confirmClearOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Clear All Favorites?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              This action will permanently remove all {favorites.length} saved colors, palettes, and gradients from your browser&rsquo;s local storage. This cannot be undone unless you have exported a JSON backup.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmClearOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAllFavorites();
                  setConfirmClearOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
