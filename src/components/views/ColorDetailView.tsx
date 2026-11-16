import React, { useState } from 'react';
import {
  getColorData,
  getColorFamily,
  generateHarmonies,
  generateTints,
  generateShades,
  generateTones,
  getWCAGScore,
  normalizeHex,
  isValidHex,
} from '../../utils/colorEngine';
import { COLOR_DATASET } from '../../utils/colorDataset';
import { ActiveTab, HarmonyType } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';
import {
  Heart,
  ArrowLeft,
  Sliders,
  CheckCircle,
  XCircle,
  FileCode,
} from 'lucide-react';

interface ColorDetailViewProps {
  hex: string;
  onNavigate: (tab: ActiveTab, param?: string) => void;
  isColorFavorited: (hex: string) => boolean;
  onToggleFavorite: (hex: string) => void;
  onCopySuccess: (text: string) => void;
}

export const ColorDetailView: React.FC<ColorDetailViewProps> = ({
  hex: rawHex,
  onNavigate,
  isColorFavorited,
  onToggleFavorite,
  onCopySuccess,
}) => {
  const [alpha, setAlpha] = useState(1);
  const [activeHarmony, setActiveHarmony] = useState<HarmonyType>('complementary');

  const hex = isValidHex(rawHex) ? normalizeHex(rawHex) : '#6366F1';
  const colorData = getColorData(hex, alpha);
  const favorited = isColorFavorited(hex);

  // WCAG evaluations
  const wcagWhite = getWCAGScore('#FFFFFF', hex);
  const wcagBlack = getWCAGScore('#000000', hex);

  // Scales
  const tints = generateTints(hex, 10);
  const shades = generateShades(hex, 10);
  const tones = generateTones(hex, 10);

  // Harmonies
  const harmonyColors = generateHarmonies(hex, activeHarmony);

  // Similar colors from dataset within same family
  const family = getColorFamily(
    colorData.rgb.r,
    colorData.rgb.g,
    colorData.rgb.b,
    colorData.hsl.h,
    colorData.hsl.s,
    colorData.hsl.l
  );
  const matchedInFamily = COLOR_DATASET.filter(
    (c) => c.family === family && c.hex.toLowerCase() !== hex.toLowerCase()
  );
  const similarColors = (
    matchedInFamily.length >= 6
      ? matchedInFamily
      : [...matchedInFamily, ...COLOR_DATASET.filter((c) => c.hex.toLowerCase() !== hex.toLowerCase())]
  ).slice(0, 6);

  const harmonyTypes: { type: HarmonyType; label: string }[] = [
    { type: 'complementary', label: 'Complementary' },
    { type: 'analogous', label: 'Analogous' },
    { type: 'triadic', label: 'Triadic' },
    { type: 'tetradic', label: 'Tetradic' },
    { type: 'split-complementary', label: 'Split Comp' },
    { type: 'monochromatic', label: 'Monochromatic' },
  ];

  const codeSnippets = [
    { label: 'HEX', value: colorData.hex },
    { label: 'RGB', value: colorData.cssRgb },
    { label: 'RGBA', value: colorData.cssRgba },
    { label: 'HSL', value: colorData.cssHsl },
    { label: 'HSLA', value: colorData.cssHsla },
    { label: 'HSV', value: `hsv(${colorData.hsv.h}, ${colorData.hsv.s}%, ${colorData.hsv.v}%)` },
    { label: 'CMYK', value: `cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)` },
    { label: 'CSS Color', value: `color: ${colorData.hex};` },
    { label: 'CSS Background', value: `background-color: ${colorData.hex};` },
    { label: 'CSS Variable', value: `--color-${colorData.name.toLowerCase().replace(/\s+/g, '-')}: ${colorData.hex};` },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation Back & Favorite Action */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('explore')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(hex)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              favorited
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:border-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-rose-500' : ''}`} />
            <span>{favorited ? 'Favorited' : 'Save Color'}</span>
          </button>
        </div>
      </div>

      {/* Hero Color Swatch Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-7">
          <div
            className="w-full h-80 sm:h-96 rounded-3xl relative p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden border border-white/10 transition-colors"
            style={{ backgroundColor: colorData.hex }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15 pointer-events-none" />

            <div className="relative flex items-center justify-between">
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md backdrop-blur-md"
                style={{
                  backgroundColor: colorData.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                  color: colorData.isDark ? '#FFF' : '#000',
                }}
              >
                Color Intelligence Analysis
              </span>

              <span
                className="text-xs font-mono font-bold px-3 py-1 rounded-md backdrop-blur-md"
                style={{
                  backgroundColor: colorData.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                  color: colorData.isDark ? '#FFF' : '#000',
                }}
              >
                Luminance: {colorData.luminance}
              </span>
            </div>

            <div className="relative">
              <p
                className="text-3xl sm:text-5xl font-black tracking-tight"
                style={{ color: colorData.isDark ? '#FFF' : '#0F172A' }}
              >
                {colorData.name}
              </p>
              <p
                className="text-xl sm:text-2xl font-mono font-bold mt-1 tracking-wider opacity-90"
                style={{ color: colorData.isDark ? '#FFF' : '#0F172A' }}
              >
                {colorData.hex}
              </p>
            </div>
          </div>

          {/* Interactive Alpha slider */}
          <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-4">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                <span>Alpha Transparency</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{Math.round(alpha * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Formats and Code Declarations List */}
        <div className="lg:col-span-5 bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm dark:shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Color Formats &amp; Codes
              </h2>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">1-Click Copy</span>
            </div>

            <div className="space-y-2">
              {codeSnippets.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:border-white/5 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate block mt-0.5">
                      {item.value}
                    </span>
                  </div>
                  <CopyButton
                    textToCopy={item.value}
                    size="sm"
                    variant="ghost"
                    showIconOnly
                    onCopySuccess={onCopySuccess}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex gap-2">
            <button
              onClick={() => onNavigate('tool-converter', hex)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white text-xs font-semibold text-center transition-colors"
            >
              Open in Converter
            </button>
            <button
              onClick={() => onNavigate('tool-contrast')}
              className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition-colors shadow-sm"
            >
              Check WCAG Contrast
            </button>
          </div>
        </div>
      </div>

      {/* WCAG Contrast Ratio Evaluation Matrix */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm dark:shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          WCAG 2.1 Accessibility &amp; Contrast Matrix
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
          Calculates relative optical luminance ratios against pure white and black under W3C standard formulas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Against White */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Against Pure White (#FFFFFF)
              </span>
              <span className="text-base font-mono font-extrabold text-slate-900">
                {wcagWhite.ratioFormatted}
              </span>
            </div>

            <div
              className="p-4 rounded-xl mb-4 font-medium text-sm"
              style={{ backgroundColor: '#FFFFFF', color: hex }}
            >
              The quick brown fox jumps over the lazy dog.
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                {wcagWhite.aaNormal ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>AA Normal Text (&ge; 4.5:1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {wcagWhite.aaLarge ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>AA Large Text (&ge; 3.0:1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {wcagWhite.aaaNormal ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>AAA Normal (&ge; 7.0:1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {wcagWhite.uiComponents ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>UI Icons &amp; Borders (&ge; 3.0:1)</span>
              </div>
            </div>
          </div>

          {/* Against Black */}
          <div className="p-5 rounded-2xl bg-[#090A0F] border border-white/10 text-white shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Against Pure Black (#000000)
              </span>
              <span className="text-base font-mono font-extrabold text-white">
                {wcagBlack.ratioFormatted}
              </span>
            </div>

            <div
              className="p-4 rounded-xl mb-4 font-medium text-sm"
              style={{ backgroundColor: '#000000', color: hex }}
            >
              The quick brown fox jumps over the lazy dog.
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                {wcagBlack.aaNormal ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>AA Normal Text (&ge; 4.5:1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {wcagBlack.aaLarge ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>AA Large Text (&ge; 3.0:1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {wcagBlack.aaaNormal ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>AAA Normal (&ge; 7.0:1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                {wcagBlack.uiComponents ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>UI Icons &amp; Borders (&ge; 3.0:1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Harmonies */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm dark:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Color Harmonies</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Geometric relationships around the standard 360-degree color wheel.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-[#181A24] p-1 rounded-xl border border-slate-200 dark:border-white/5">
            {harmonyTypes.map((h) => (
              <button
                key={h.type}
                onClick={() => setActiveHarmony(h.type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeHarmony === h.type
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Harmony Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {harmonyColors.map((hColor, idx) => (
            <div
              key={hColor + idx}
              onClick={() => onNavigate('color-detail', hColor)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('color-detail', hColor);
                }
              }}
              className="group p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/5 dark:hover:border-white/20 transition-all cursor-pointer text-left w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <div
                className="w-full h-24 rounded-xl shadow-inner border border-slate-200 dark:border-white/10 mb-2 transition-transform group-hover:scale-102"
                style={{ backgroundColor: hColor }}
              />
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">{hColor}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Step {idx + 1}</span>
                <div onClick={(e) => e.stopPropagation()}>
                  <CopyButton textToCopy={hColor} size="sm" showIconOnly variant="ghost" onCopySuccess={onCopySuccess} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tints, Shades, and Tones Scales */}
      <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm dark:shadow-xl space-y-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tints, Shades &amp; Tones</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Graduated variations created by blending with white, black, and neutral 50% gray.
          </p>
        </div>

        {/* Tints */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
            Tints (Blended with White)
          </span>
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
            {tints.map((t) => (
              <button
                type="button"
                key={t.hex + t.percent}
                onClick={() => onNavigate('color-detail', t.hex)}
                className="group cursor-pointer text-center border-0 p-0 bg-transparent"
                title={`${t.hex} (${t.percent}% White)`}
              >
                <div
                  className="w-full h-12 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm transition-transform group-hover:scale-105"
                  style={{ backgroundColor: t.hex }}
                />
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-1">
                  {t.percent}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Shades */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
            Shades (Blended with Black)
          </span>
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
            {shades.map((s) => (
              <button
                type="button"
                key={s.hex + s.percent}
                onClick={() => onNavigate('color-detail', s.hex)}
                className="group cursor-pointer text-center border-0 p-0 bg-transparent"
                title={`${s.hex} (${s.percent}% Black)`}
              >
                <div
                  className="w-full h-12 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm transition-transform group-hover:scale-105"
                  style={{ backgroundColor: s.hex }}
                />
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-1">
                  {s.percent}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tones */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
            Tones (Blended with 50% Gray)
          </span>
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
            {tones.map((tone) => (
              <button
                type="button"
                key={tone.hex + tone.percent}
                onClick={() => onNavigate('color-detail', tone.hex)}
                className="group cursor-pointer text-center border-0 p-0 bg-transparent"
                title={`${tone.hex} (${tone.percent}% Gray)`}
              >
                <div
                  className="w-full h-12 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tone.hex }}
                />
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-1">
                  {tone.percent}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Similar Named Swatches in Spectrum */}
        {similarColors.length > 0 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              Similar {family} Hues in Catalog
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {similarColors.map((sc) => (
                <button
                  type="button"
                  key={sc.hex}
                  onClick={() => onNavigate('color-detail', sc.hex)}
                  className="group p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/5 dark:hover:border-white/20 transition-all cursor-pointer text-center"
                >
                  <div
                    className="w-full h-12 rounded-lg mb-1.5 shadow-inner border border-slate-200 dark:border-white/10 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: sc.hex }}
                  />
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{sc.name}</p>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">
                    {sc.hex}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
