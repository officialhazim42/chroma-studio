import React, { useState } from 'react';
import {
  Pipette,
  Shuffle,
  Eye,
  Sliders,
  Sparkles,
  Heart,
} from 'lucide-react';
import {
  getColorData,
  getRandomHex,
  isValidHex,
  normalizeHex,
  hslToRgb,
  rgbToHex,
} from '../../utils/colorEngine';
import { ColorData, ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface ColorPickerToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  isColorFavorited: (hex: string) => boolean;
  onToggleFavorite: (hex: string) => void;
  initialHex?: string;
}

export const ColorPickerTool: React.FC<ColorPickerToolProps> = ({
  onNavigate,
  onCopySuccess,
  isColorFavorited,
  onToggleFavorite,
  initialHex = '#6366F1',
}) => {
  const [currentHex, setCurrentHex] = useState(
    isValidHex(initialHex) ? normalizeHex(initialHex) : '#6366F1'
  );
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'checkered'>('dark');

  const colorData: ColorData = getColorData(currentHex);
  const favorited = isColorFavorited(currentHex);

  const handleRandomize = () => {
    const next = getRandomHex();
    setCurrentHex(next);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isValidHex(val)) {
      setCurrentHex(normalizeHex(val));
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const nextRgb = { ...colorData.rgb, [channel]: Math.max(0, Math.min(255, val)) };
    setCurrentHex(rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b));
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', val: number) => {
    const maxVal = channel === 'h' ? 360 : 100;
    const clamped = Math.max(0, Math.min(maxVal, val));
    const nextHsl = { ...colorData.hsl, [channel]: clamped };
    const rgb = hslToRgb(nextHsl.h, nextHsl.s, nextHsl.l);
    setCurrentHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const copyAllFormats = () => {
    const all = `HEX: ${colorData.hex}
RGB: ${colorData.cssRgb}
HSL: ${colorData.cssHsl}
CMYK: cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)
CSS: color: ${colorData.hex};`;
    navigator.clipboard.writeText(all);
    onCopySuccess('All color formats copied!');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-300 mb-3 font-mono">
          <Pipette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>TOOL 01 &middot; PRECISION SELECTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Color Picker
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Visual chromatic picker, continuous channel sliders, native eyedropper, and instant format copying.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Picker Canvas & Sliders */}
        <div className="lg:col-span-7 bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6">
          {/* Main Visual Swatch Banner */}
          <div
            className={`w-full h-64 rounded-2xl relative p-6 flex flex-col justify-between overflow-hidden shadow-inner border border-slate-200 dark:border-white/10 transition-colors ${
              previewBg === 'checkered' ? 'checkered-bg' : previewBg === 'light' ? 'bg-slate-100' : 'bg-[#090A0F]'
            }`}
          >
            <div
              className="absolute inset-0 transition-colors duration-200"
              style={{ backgroundColor: currentHex }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

            <div className="relative flex items-center justify-between">
              <span
                className="text-xs font-bold font-mono px-3 py-1 rounded-md backdrop-blur-md"
                style={{
                  backgroundColor: colorData.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  color: colorData.isDark ? '#FFF' : '#000',
                }}
              >
                {colorData.name}
              </span>

              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-xl">
                <button
                  onClick={() => setPreviewBg('dark')}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${previewBg === 'dark' ? 'bg-white/20 text-white' : 'text-slate-400'}`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setPreviewBg('light')}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${previewBg === 'light' ? 'bg-white/20 text-white' : 'text-slate-400'}`}
                >
                  Light
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-between">
              <div>
                <span
                  className="text-3xl sm:text-4xl font-mono font-black tracking-wider"
                  style={{ color: colorData.isDark ? '#FFF' : '#0F172A' }}
                >
                  {currentHex}
                </span>
                <p
                  className="text-xs font-mono opacity-80"
                  style={{ color: colorData.isDark ? '#FFF' : '#0F172A' }}
                >
                  {colorData.cssRgb}
                </p>
              </div>

              <button
                onClick={() => onToggleFavorite(currentHex)}
                className={`p-2.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-md transition-all ${
                  favorited ? 'bg-rose-500 text-white' : 'bg-black/30 hover:bg-black/50 text-white'
                }`}
                title={favorited ? 'Favorited' : 'Save color'}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Controls: Native Eyedropper, Randomizer, Inspect */}
          <div className="flex flex-wrap items-center gap-3">
            <label
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md transition-all active:scale-95"
            >
              <Pipette className="w-4 h-4" />
              <span>Native Eyedropper / Palette</span>
              <input
                type="color"
                value={currentHex}
                onChange={(e) => setCurrentHex(normalizeHex(e.target.value))}
                className="opacity-0 w-0 h-0 absolute pointer-events-none"
              />
            </label>

            <button
              onClick={handleRandomize}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white text-xs font-semibold transition-all active:scale-95"
            >
              <Shuffle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Generate Random</span>
            </button>

            <button
              onClick={() => onNavigate('color-detail', currentHex)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-slate-300 dark:hover:text-white text-xs font-semibold transition-all ml-auto"
            >
              <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Deep Inspection</span>
            </button>
          </div>

          {/* RGB Sliders Section */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-white/[0.02] dark:border-white/5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              RGB Channel Sliders
            </h3>

            {/* Red */}
            <div className="flex items-center gap-3">
              <span className="w-6 text-xs font-mono font-bold text-rose-500">R</span>
              <input
                type="range"
                min="0"
                max="255"
                value={colorData.rgb.r}
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                className="flex-1 accent-rose-500 cursor-pointer"
              />
              <span className="w-10 text-right font-mono text-xs text-slate-900 dark:text-white font-bold">
                {colorData.rgb.r}
              </span>
            </div>

            {/* Green */}
            <div className="flex items-center gap-3">
              <span className="w-6 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">G</span>
              <input
                type="range"
                min="0"
                max="255"
                value={colorData.rgb.g}
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                className="flex-1 accent-emerald-500 cursor-pointer"
              />
              <span className="w-10 text-right font-mono text-xs text-slate-900 dark:text-white font-bold">
                {colorData.rgb.g}
              </span>
            </div>

            {/* Blue */}
            <div className="flex items-center gap-3">
              <span className="w-6 text-xs font-mono font-bold text-sky-600 dark:text-sky-400">B</span>
              <input
                type="range"
                min="0"
                max="255"
                value={colorData.rgb.b}
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                className="flex-1 accent-sky-500 cursor-pointer"
              />
              <span className="w-10 text-right font-mono text-xs text-slate-900 dark:text-white font-bold">
                {colorData.rgb.b}
              </span>
            </div>
          </div>

          {/* HSL Sliders Section */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-white/[0.02] dark:border-white/5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              HSL (Hue, Saturation, Lightness)
            </h3>

            {/* Hue */}
            <div className="flex items-center gap-3">
              <span className="w-6 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">H</span>
              <input
                type="range"
                min="0"
                max="360"
                value={colorData.hsl.h}
                onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
                className="flex-1 cursor-pointer"
                style={{
                  background:
                    'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
                }}
              />
              <span className="w-10 text-right font-mono text-xs text-slate-900 dark:text-white font-bold">
                {colorData.hsl.h}&deg;
              </span>
            </div>

            {/* Saturation */}
            <div className="flex items-center gap-3">
              <span className="w-6 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">S</span>
              <input
                type="range"
                min="0"
                max="100"
                value={colorData.hsl.s}
                onChange={(e) => handleHslChange('s', parseInt(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer"
              />
              <span className="w-10 text-right font-mono text-xs text-slate-900 dark:text-white font-bold">
                {colorData.hsl.s}%
              </span>
            </div>

            {/* Lightness */}
            <div className="flex items-center gap-3">
              <span className="w-6 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">L</span>
              <input
                type="range"
                min="0"
                max="100"
                value={colorData.hsl.l}
                onChange={(e) => handleHslChange('l', parseInt(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer"
              />
              <span className="w-10 text-right font-mono text-xs text-slate-900 dark:text-white font-bold">
                {colorData.hsl.l}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Exact Field Inputs & Copyable Formats */}
        <div className="lg:col-span-5 bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Direct Code Inputs
              </h2>
              <button
                onClick={copyAllFormats}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold"
              >
                Copy All Formats
              </button>
            </div>

            <div className="space-y-3">
              {/* HEX Input */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/10">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Hex Code
                </span>
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={currentHex}
                    onChange={handleHexChange}
                    className="bg-transparent font-mono font-bold text-base text-slate-900 dark:text-white focus:outline-none flex-1"
                  />
                  <CopyButton textToCopy={colorData.hex} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
                </div>
              </div>

              {/* RGB Input */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/10">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  RGB Standard
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {colorData.cssRgb}
                  </span>
                  <CopyButton textToCopy={colorData.cssRgb} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
                </div>
              </div>

              {/* HSL Input */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/10">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  HSL
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {colorData.cssHsl}
                  </span>
                  <CopyButton textToCopy={colorData.cssHsl} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
                </div>
              </div>

              {/* CMYK Input */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/10">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  CMYK (Print)
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    cmyk({colorData.cmyk.c}%, {colorData.cmyk.m}%, {colorData.cmyk.y}%, {colorData.cmyk.k}%)
                  </span>
                  <CopyButton
                    textToCopy={`cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)`}
                    size="sm"
                    showIconOnly
                    onCopySuccess={onCopySuccess}
                  />
                </div>
              </div>

              {/* CSS Variable */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/10">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  CSS Variable
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-800 dark:text-slate-200 truncate">
                    --color-primary: {colorData.hex};
                  </span>
                  <CopyButton
                    textToCopy={`--color-primary: ${colorData.hex};`}
                    size="sm"
                    showIconOnly
                    onCopySuccess={onCopySuccess}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/5">
            <button
              onClick={() => onNavigate('tool-palette', currentHex)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Palette from this Color</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
