import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  Palette,
  Wrench,
  BookOpen,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { COLOR_DATASET } from '../../utils/colorDataset';
import { isValidHex, normalizeHex } from '../../utils/colorEngine';
import { ActiveTab } from '../../types/color';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab, param?: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) handleClose();
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // 1. Direct hex or color math search
  const isDirectHex = isValidHex(q);
  const directHexFormatted = isDirectHex ? normalizeHex(q) : null;

  // 2. Named colors filter
  const matchedColors = q
    ? COLOR_DATASET.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.hex.toLowerCase().includes(q) ||
          c.family.toLowerCase().includes(q)
      ).slice(0, 8)
    : COLOR_DATASET.filter((c) => c.popular).slice(0, 6);

  // 3. Tools match
  const tools = [
    { id: 'tool-picker' as ActiveTab, name: 'Color Picker', desc: 'Interactive visual picker & format exporter' },
    { id: 'tool-converter' as ActiveTab, name: 'Color Converter', desc: 'HEX, RGB, HSL, HSV, CMYK reactive converter' },
    { id: 'tool-image' as ActiveTab, name: 'Image Color Picker', desc: 'Sample pixels & extract dominant palettes locally' },
    { id: 'tool-palette' as ActiveTab, name: 'Palette Generator', desc: 'Create harmonious palettes with lock & export' },
    { id: 'tool-contrast' as ActiveTab, name: 'Contrast Checker', desc: 'WCAG 2.1 AA/AAA accessibility score validator' },
    { id: 'tool-gradient' as ActiveTab, name: 'Gradient Generator', desc: 'Multi-stop linear, radial, and conic CSS gradients' },
    { id: 'tool-shades' as ActiveTab, name: 'Shades & Tints', desc: 'Calculate tint, shade, and tone progression scales' },
    { id: 'tool-mixer' as ActiveTab, name: 'Color Mixer', desc: 'Blend two colors with step-by-step ratio preview' },
    { id: 'tool-blindness' as ActiveTab, name: 'Color Blindness Simulator', desc: 'Protanopia, Deuteranopia, Tritanopia test' },
    { id: 'tool-exporter' as ActiveTab, name: 'CSS & Dev Exporter', desc: 'Export Tailwind, CSS Variables, SCSS, Android XML' },
  ];

  const matchedTools = q
    ? tools.filter(
        (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
      )
    : tools.slice(0, 4);

  // 4. Learning guides match
  const guides = [
    { topic: 'hex', title: 'Understanding HEX Codes', desc: 'How hexadecimal numbers represent RGB byte channels' },
    { topic: 'rgb', title: 'Understanding RGB & Light', desc: 'Additive digital displays, gamuts, and color depth' },
    { topic: 'cmyk', title: 'Understanding CMYK & Print', desc: 'Subtractive inks, printing processes, and gamut mapping' },
    { topic: 'hsl', title: 'Understanding HSL & HSV', desc: 'Cylindrical color models for modern design systems' },
    { topic: 'theory', title: 'Color Theory & The Color Wheel', desc: 'Primary, secondary, and tertiary relationships' },
    { topic: 'contrast', title: 'Understanding WCAG Contrast', desc: 'Relative luminance mathematics and accessibility' },
  ];

  const matchedGuides = q
    ? guides.filter(
        (g) => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
      )
    : guides.slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#151620]">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search colors, HEX, RGB, tools, guides... (e.g. #3B82F6, Emerald, Contrast)"
            aria-label="Search colors, tools, and guides"
            maxLength={100}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-white/5 px-2 py-0.5 rounded border border-slate-300 dark:border-white/10">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scroll">
          {/* Direct Hex preview match */}
          {directHexFormatted && (
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Custom Color Match
              </p>
              <button
                onClick={() => {
                  onNavigate('color-detail', directHexFormatted);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-indigo-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-indigo-500/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg border border-slate-300 dark:border-white/20 shadow-sm shrink-0"
                    style={{ backgroundColor: directHexFormatted }}
                  />
                  <div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                      {directHexFormatted}
                    </span>
                    <p className="text-xs text-indigo-600 dark:text-indigo-300">
                      Click to open deep color inspection &amp; conversions
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Matched Colors */}
          {matchedColors.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Colors ({matchedColors.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedColors.map((color) => (
                  <button
                    key={color.name + color.hex}
                    onClick={() => {
                      onNavigate('color-detail', color.hex);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/5 dark:hover:border-white/15 transition-all text-left group"
                  >
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 border border-slate-300 dark:border-white/15 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                        {color.name}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {color.hex} &middot; {color.family}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Tools */}
          {matchedTools.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Color Tools ({matchedTools.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onNavigate(tool.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/5 dark:hover:border-white/15 transition-all text-left group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                        {tool.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {tool.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Guides */}
          {matchedGuides.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Color Theory &amp; Learn ({matchedGuides.length})
              </p>
              <div className="space-y-1.5">
                {matchedGuides.map((guide) => (
                  <button
                    key={guide.topic}
                    onClick={() => {
                      onNavigate('learn', guide.topic);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/5 transition-all text-left group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300">
                        {guide.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {guide.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedColors.length === 0 && matchedTools.length === 0 && matchedGuides.length === 0 && (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No exact matches found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for standard names like &ldquo;Crimson&rdquo; or a hex like &ldquo;#6366F1&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0F1017] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <span>CHROMA STUDIO v1.0</span>
        </div>
      </div>
    </div>
  );
};
