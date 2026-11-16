import React, { useState, useEffect, useCallback } from 'react';
import {
  Palette,
  Shuffle,
  Lock,
  Unlock,
  Download,
  Heart,
  FileCode,
} from 'lucide-react';
import {
  getRandomHex,
  getColorData,
  generateHarmonies,
  hslToRgb,
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  isValidHex,
  normalizeHex,
} from '../../utils/colorEngine';
import { ActiveTab, HarmonyType } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface ColorSlot {
  id: string;
  hex: string;
  isLocked: boolean;
}

interface PaletteGeneratorToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  onSavePalette: (name: string, colors: string[]) => void;
  initialHex?: string;
}

export const PaletteGeneratorTool: React.FC<PaletteGeneratorToolProps> = ({
  onNavigate,
  onCopySuccess,
  onSavePalette,
  initialHex,
}) => {
  const [paletteSize, setPaletteSize] = useState<number>(5);
  const [harmonyMode, setHarmonyMode] = useState<HarmonyType | 'random'>('random');
  const [paletteName, setPaletteName] = useState<string>('Bespoke Chroma');
  const [slots, setSlots] = useState<ColorSlot[]>(() => {
    const base = isValidHex(initialHex || '') ? normalizeHex(initialHex!) : getRandomHex();
    const arr: ColorSlot[] = [];
    for (let i = 0; i < 5; i++) {
      arr.push({
        id: `slot_${i}`,
        hex: i === 0 ? base : getRandomHex(),
        isLocked: false,
      });
    }
    return arr;
  });

  // Generate harmonious or randomized colors
  const generatePalette = useCallback(() => {
    setSlots((prev) => {
      // Find base color (either first locked or first slot)
      const baseSlot = prev.find((s) => s.isLocked) || prev[0];
      const baseHex = baseSlot ? baseSlot.hex : getRandomHex();
      const rgb = hexToRgb(baseHex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

      let harmonyColors: string[] = [];
      if (harmonyMode !== 'random') {
        const raw = generateHarmonies(baseHex, harmonyMode);
        // Fill up to paletteSize
        harmonyColors = [...raw];
        while (harmonyColors.length < paletteSize) {
          const shift = (harmonyColors.length * 45) % 360;
          const shiftedRgb = hslToRgb((hsl.h + shift) % 360, hsl.s, hsl.l);
          harmonyColors.push(rgbToHex(shiftedRgb.r, shiftedRgb.g, shiftedRgb.b));
        }
      }

      return Array.from({ length: paletteSize }).map((_, idx) => {
        const existing = prev[idx];
        if (existing && existing.isLocked) {
          return existing;
        }
        const color =
          harmonyMode === 'random'
            ? getRandomHex()
            : harmonyColors[idx % harmonyColors.length] || getRandomHex();

        return {
          id: existing?.id || `slot_${idx}_${Date.now()}`,
          hex: color,
          isLocked: false,
        };
      });
    });
  }, [paletteSize, harmonyMode]);

  // Spacebar hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only when not typing in an input
      if (
        e.code === 'Space' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette]);

  // Handle slot size adjustment
  const handleSizeChange = (newSize: number) => {
    setPaletteSize(newSize);
    setSlots((prev) => {
      if (newSize > prev.length) {
        const additional = Array.from({ length: newSize - prev.length }).map((_, i) => ({
          id: `slot_${prev.length + i}_${Date.now()}`,
          hex: getRandomHex(),
          isLocked: false,
        }));
        return [...prev, ...additional];
      } else {
        return prev.slice(0, newSize);
      }
    });
  };

  const toggleLock = (index: number) => {
    setSlots((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, isLocked: !s.isLocked } : s))
    );
  };

  const updateColor = (index: number, newHex: string) => {
    setSlots((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, hex: newHex } : s))
    );
  };

  const allHexList = slots.map((s) => s.hex).join(', ');

  const exportCssVars = () => {
    const lines = slots.map((s, idx) => `  --color-${idx + 1}: ${s.hex};`).join('\n');
    const css = `:root {\n${lines}\n}`;
    navigator.clipboard.writeText(css);
    onCopySuccess('Exported CSS variables to clipboard!');
  };

  const exportJson = () => {
    const obj = {
      paletteName,
      colors: slots.map((s) => s.hex),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paletteName.toLowerCase().replace(/\s+/g, '-')}-palette.json`;
    a.click();
    URL.revokeObjectURL(url);
    onCopySuccess('Downloaded palette JSON!');
  };

  const handleSaveToFavorites = () => {
    onSavePalette(paletteName, slots.map((s) => s.hex));
    onCopySuccess(`Saved "${paletteName}" to local favorites!`);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3 font-mono">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>TOOL 04 &middot; HARMONIC GENERATOR</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Palette Generator
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Generate cohesive schemes using color harmony rules or random inspiration. Lock your favorite swatches and press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white text-xs border border-white/20">
                Spacebar
              </kbd>{' '}
              to generate.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToFavorites}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Save Palette</span>
            </button>
            <button
              onClick={generatePalette}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Shuffle className="w-4 h-4" />
              <span>Generate (Space)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Mode, Count, Palette Name */}
      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 shadow-xl mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Palette Name Input */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Name:
          </span>
          <input
            type="text"
            value={paletteName}
            onChange={(e) => setPaletteName(e.target.value)}
            placeholder="Palette Name"
            aria-label="Palette Name"
            className="bg-[#181A24] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 w-36 sm:w-44 font-medium"
          />
        </div>

        {/* Harmony Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Harmony:
          </span>
          <select
            value={harmonyMode}
            onChange={(e: any) => setHarmonyMode(e.target.value)}
            className="bg-[#181A24] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="random">Creative Random</option>
            <option value="analogous">Analogous</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="tetradic">Tetradic</option>
            <option value="split-complementary">Split Complementary</option>
            <option value="monochromatic">Monochromatic</option>
          </select>
        </div>

        {/* Palette Size Buttons (3 to 8) */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Colors:
          </span>
          {[3, 4, 5, 6, 7, 8].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                paletteSize === size
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Exports */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={exportCssVars}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>CSS Vars</span>
          </button>
          <button
            onClick={exportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>JSON</span>
          </button>
          <CopyButton textToCopy={allHexList} label="Copy All HEX" size="sm" variant="outline" onCopySuccess={onCopySuccess} />
        </div>
      </div>

      {/* Main Interactive Swatches Strip */}
      <div className="w-full h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col sm:flex-row transition-all duration-300">
        {slots.map((slot, index) => {
          const data = getColorData(slot.hex);
          const textColor = data.isDark ? '#FFFFFF' : '#0F172A';

          return (
            <div
              key={slot.id}
              className="flex-1 relative group flex flex-row sm:flex-col justify-between items-center sm:items-stretch p-4 sm:p-6 transition-all duration-300 select-none overflow-hidden"
              style={{ backgroundColor: slot.hex }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15 pointer-events-none" />

              {/* Top controls in slot (Lock button, Native color input) */}
              <div className="relative flex sm:justify-between items-center w-full z-10">
                <button
                  onClick={() => toggleLock(index)}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                    slot.isLocked
                      ? 'bg-amber-400 text-slate-950 font-bold scale-105'
                      : 'bg-black/30 hover:bg-black/50 text-white opacity-80 group-hover:opacity-100'
                  }`}
                  title={slot.isLocked ? 'Unlock color' : 'Lock color'}
                >
                  {slot.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>

                <label
                  className="hidden sm:flex p-2 rounded-xl bg-black/30 hover:bg-black/50 backdrop-blur-md cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Pick custom color for this slot"
                >
                  <Palette className="w-4 h-4" />
                  <input
                    type="color"
                    value={slot.hex}
                    onChange={(e) => updateColor(index, normalizeHex(e.target.value))}
                    className="opacity-0 w-0 h-0 absolute pointer-events-none"
                  />
                </label>
              </div>

              {/* Bottom Info in slot (HEX, Name, Quick Copy) */}
              <div className="relative z-10 text-right sm:text-center">
                <button
                  onClick={() => onNavigate('color-detail', slot.hex)}
                  className="text-xs font-semibold px-2 py-0.5 rounded backdrop-blur-md mb-1 inline-block truncate max-w-[120px]"
                  style={{
                    backgroundColor: data.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                    color: textColor,
                  }}
                  title="Inspect this color"
                >
                  {data.name}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <span
                    className="text-lg sm:text-2xl font-mono font-black tracking-wider block"
                    style={{ color: textColor }}
                  >
                    {slot.hex}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    <CopyButton textToCopy={slot.hex} size="sm" showIconOnly variant="ghost" onCopySuccess={onCopySuccess} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
