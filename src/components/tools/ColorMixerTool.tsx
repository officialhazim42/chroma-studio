import React, { useState } from 'react';
import {
  Sliders,
  ArrowRightLeft,
  Pipette,
  Eye,
} from 'lucide-react';
import {
  mixColors,
  getColorData,
  isValidHex,
  normalizeHex,
} from '../../utils/colorEngine';
import { ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface ColorMixerToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  initialColor1?: string;
  initialColor2?: string;
}

export const ColorMixerTool: React.FC<ColorMixerToolProps> = ({
  onNavigate,
  onCopySuccess,
  initialColor1 = '#3B82F6',
  initialColor2 = '#EC4899',
}) => {
  const [color1, setColor1] = useState(
    isValidHex(initialColor1) ? normalizeHex(initialColor1) : '#3B82F6'
  );
  const [color2, setColor2] = useState(
    isValidHex(initialColor2) ? normalizeHex(initialColor2) : '#EC4899'
  );
  const [ratio, setRatio] = useState<number>(0.5);
  const [mixMode, setMixMode] = useState<'rgb' | 'hsl'>('rgb');

  const c1 = isValidHex(color1) ? normalizeHex(color1) : '#3B82F6';
  const c2 = isValidHex(color2) ? normalizeHex(color2) : '#EC4899';

  const mixedHex = mixColors(c1, c2, ratio, mixMode);
  const mixedData = getColorData(mixedHex);

  const swapColors = () => {
    const temp = c1;
    setColor1(c2);
    setColor2(temp);
  };

  // Generate 11 step progression (0% to 100% in 10% steps)
  const steps = Array.from({ length: 11 }).map((_, idx) => {
    const w = idx / 10;
    const hex = mixColors(c1, c2, w, mixMode);
    return {
      weight: Math.round(w * 100),
      hex,
    };
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-300 mb-3 font-mono">
          <Sliders className="w-3.5 h-3.5 text-orange-400" />
          <span>TOOL 08 &middot; CHROMA BLENDER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Color Mixer &amp; Interpolator
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Blend two colors with a continuous ratio slider. Compare linear RGB averaging with cylindrical HSL hue interpolation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Mixer Controls */}
        <div className="lg:col-span-5 bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Input Colors
            </h2>
            <button
              onClick={swapColors}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-orange-400" />
              <span>Swap</span>
            </button>
          </div>

          {/* Color 1 Input */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="text-xs font-semibold text-slate-300">
              Primary Base Color (Color A)
            </span>
            <div className="flex items-center gap-3">
              <label
                className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0 cursor-pointer flex items-center justify-center"
                style={{ backgroundColor: c1 }}
              >
                <Pipette className="w-4 h-4 text-white mix-blend-difference" />
                <input
                  type="color"
                  value={c1}
                  onChange={(e) => setColor1(normalizeHex(e.target.value))}
                  className="opacity-0 w-0 h-0 absolute pointer-events-none"
                />
              </label>
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-bold text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Color 2 Input */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="text-xs font-semibold text-slate-300">
              Secondary Blend Color (Color B)
            </span>
            <div className="flex items-center gap-3">
              <label
                className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0 cursor-pointer flex items-center justify-center"
                style={{ backgroundColor: c2 }}
              >
                <Pipette className="w-4 h-4 text-white mix-blend-difference" />
                <input
                  type="color"
                  value={c2}
                  onChange={(e) => setColor2(normalizeHex(e.target.value))}
                  className="opacity-0 w-0 h-0 absolute pointer-events-none"
                />
              </label>
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-bold text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Mixing Mode (RGB vs HSL) */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Color Space Interpolation
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMixMode('rgb')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  mixMode === 'rgb'
                    ? 'bg-orange-500 text-slate-950 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
                }`}
              >
                RGB Linear Space
              </button>
              <button
                onClick={() => setMixMode('hsl')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  mixMode === 'hsl'
                    ? 'bg-orange-500 text-slate-950 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
                }`}
              >
                HSL Polar Space
              </button>
            </div>
          </div>

          {/* Ratio Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">
                Mix Ratio: {Math.round((1 - ratio) * 100)}% A / {Math.round(ratio * 100)}% B
              </span>
              <span className="font-mono text-orange-400 font-bold">
                {Math.round(ratio * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ratio}
              onChange={(e) => setRatio(parseFloat(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>100% Color A</span>
              <span>50 / 50</span>
              <span>100% Color B</span>
            </div>
          </div>
        </div>

        {/* Right Column: Blended Output & Progression Strip */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Mixed Result Swatch */}
          <div
            className="w-full h-64 sm:h-72 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative flex flex-col justify-between overflow-hidden transition-colors"
            style={{ backgroundColor: mixedHex }}
          >
            <div className="relative flex items-center justify-between">
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md backdrop-blur-md"
                style={{
                  backgroundColor: mixedData.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                  color: mixedData.isDark ? '#FFF' : '#000',
                }}
              >
                Mixed Chroma Result
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('color-detail', mixedHex)}
                  className="px-2.5 py-1 rounded-lg backdrop-blur-md bg-black/30 hover:bg-black/50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  title="Inspect mixed color in detail"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
                <CopyButton
                  textToCopy={mixedHex}
                  size="sm"
                  variant="outline"
                  onCopySuccess={onCopySuccess}
                />
              </div>
            </div>

            <div className="relative">
              <h3
                className="text-2xl sm:text-4xl font-black tracking-tight"
                style={{ color: mixedData.isDark ? '#FFF' : '#0F172A' }}
              >
                {mixedData.name}
              </h3>
              <p
                className="text-xl font-mono font-bold mt-1 tracking-wider"
                style={{ color: mixedData.isDark ? '#FFF' : '#0F172A' }}
              >
                {mixedHex} &middot; {mixedData.cssRgb}
              </p>
            </div>
          </div>

          {/* Step-by-step intermediate progression strip */}
          <div className="bg-[#12131A] border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3">
              Intermediate Progression (0% to 100%)
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-11 gap-1.5">
              {steps.map((st) => (
                <button
                  type="button"
                  key={st.weight}
                  onClick={() => onNavigate('color-detail', st.hex)}
                  className="group cursor-pointer text-center border-0 p-0 bg-transparent"
                  title={`${st.hex} (${st.weight}%)`}
                  aria-label={`Inspect ${st.hex} at ${st.weight}% blend`}
                >
                  <div
                    className="w-full h-16 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm transition-transform group-hover:scale-105"
                    style={{ backgroundColor: st.hex }}
                  />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-1">
                    {st.weight}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
