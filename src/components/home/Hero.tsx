import React, { useState } from 'react';
import {
  Sparkles,
  Shuffle,
  Pipette,
  Check,
  ArrowRight,
  Palette,
  Eye,
  Copy,
} from 'lucide-react';
import {
  getRandomHex,
  getColorData,
  isValidHex,
  normalizeHex,
} from '../../utils/colorEngine';
import { ActiveTab, ColorData } from '../../types/color';

interface HeroProps {
  onNavigate: (tab: ActiveTab, param?: string) => void;
  onCopySuccess: (text: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onCopySuccess }) => {
  const [currentColorHex, setCurrentColorHex] = useState('#6366F1');
  const [inputValue, setInputValue] = useState('#6366F1');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const colorData: ColorData = getColorData(currentColorHex);

  const handleRandomize = () => {
    const random = getRandomHex();
    setCurrentColorHex(random);
    setInputValue(random);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (isValidHex(val)) {
      setCurrentColorHex(normalizeHex(val));
    }
  };

  const copyWithFeedback = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    onCopySuccess(text);
    setTimeout(() => setCopiedFormat(null), 1600);
  };

  const textColor = colorData.isDark ? '#FFFFFF' : '#0F172A';
  const secondaryTextColor = colorData.isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(15, 23, 42, 0.75)';

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/90 dark:border-white/5 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0B0C14] dark:via-[#090A0F] dark:to-[#07080C] transition-colors">
      {/* Background ambient color glow responding to current color */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] h-[350px] rounded-full blur-[140px] opacity-15 dark:opacity-25 pointer-events-none transition-colors duration-700 ease-out"
        style={{ backgroundColor: currentColorHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-white/5 border border-indigo-200/80 dark:border-white/10 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Chroma Studio &middot; Premium Color Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.12]">
            Discover. Create.{' '}
            <span
              className="bg-clip-text text-transparent transition-colors duration-500"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentColorHex}, #A855F7, #EC4899)`,
              }}
            >
              Understand Color.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore millions of colors, convert color formats, build beautiful palettes, and create production-ready color systems &mdash; all in one workspace.
          </p>
        </div>

        {/* Interactive Hero Color Playground Box */}
        <div className="max-w-4xl mx-auto bg-white/95 dark:bg-[#12131A]/90 border border-slate-200/90 dark:border-white/10 rounded-3xl p-5 sm:p-7 shadow-xl dark:shadow-2xl backdrop-blur-2xl transition-colors">
          {/* Top Control Bar: Hex Input, Picker, Randomizer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="relative flex-1 flex items-center">
              {/* Live Color Dot Button (triggers native color picker) */}
              <label
                className="absolute left-3 w-8 h-8 rounded-xl cursor-pointer border border-slate-300/80 dark:border-white/20 shadow-xs flex items-center justify-center transition-transform hover:scale-105"
                style={{ backgroundColor: currentColorHex }}
                title="Open native color picker"
              >
                <Pipette
                  className="w-4 h-4"
                  style={{ color: colorData.isDark ? '#FFF' : '#000' }}
                />
                <input
                  type="color"
                  value={currentColorHex}
                  onChange={(e) => {
                    setCurrentColorHex(e.target.value);
                    setInputValue(e.target.value.toUpperCase());
                  }}
                  className="opacity-0 w-0 h-0 absolute pointer-events-none"
                />
              </label>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter HEX (e.g. #6366F1, #FF007F)..."
                className="w-full bg-slate-50 dark:bg-[#181A24] border border-slate-200 dark:border-white/10 rounded-2xl pl-14 pr-4 py-3 font-mono text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-500/60 dark:focus:ring-indigo-500/40 transition-colors"
              />
            </div>

            <button
              onClick={handleRandomize}
              type="button"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold transition-all hover:border-slate-300 dark:hover:border-white/20 active:scale-95 shrink-0 cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Random Color</span>
            </button>
          </div>

          {/* Large Live Color Swatch Banner */}
          <div
            className="w-full h-44 sm:h-52 rounded-2xl relative p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-inner transition-colors duration-300"
            style={{ backgroundColor: currentColorHex }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

            <div className="relative flex items-center justify-between">
              <div>
                <span
                  className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-md backdrop-blur-md"
                  style={{
                    backgroundColor: colorData.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                    color: textColor,
                  }}
                >
                  Nearest Named Color
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight"
                  style={{ color: textColor }}
                >
                  {colorData.name}
                </h3>
              </div>

              <div
                className="text-right text-xs font-mono px-3 py-1.5 rounded-lg backdrop-blur-md"
                style={{
                  backgroundColor: colorData.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                  color: secondaryTextColor,
                }}
              >
                <span>Contrast vs White: </span>
                <strong style={{ color: textColor }}>{colorData.contrastWhite}:1</strong>
              </div>
            </div>

            {/* Quick Actions Row on Swatch */}
            <div className="relative flex flex-wrap items-center justify-between gap-2 pt-4">
              <span
                className="text-xl sm:text-2xl font-mono font-black tracking-wider"
                style={{ color: textColor }}
              >
                {currentColorHex}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigate('color-detail', currentColorHex)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: colorData.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    color: textColor,
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Color</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('tool-palette')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: colorData.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    color: textColor,
                  }}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Palettes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Format Chips (HEX, RGB, HSL, CMYK, CSS) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
            {[
              { label: 'HEX', value: colorData.hex },
              { label: 'RGB', value: colorData.cssRgb },
              { label: 'HSL', value: colorData.cssHsl },
              { label: 'CMYK', value: `${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%` },
              { label: 'CSS', value: `color: ${colorData.hex};` },
            ].map((chip) => {
              const isCopied = copiedFormat === chip.label;
              const isFullOnMobile = chip.label === 'CSS';
              return (
                <button
                  key={chip.label}
                  onClick={() => copyWithFeedback(chip.value, chip.label)}
                  className={`flex flex-col items-start p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-slate-200 hover:border-slate-300 dark:border-white/5 dark:hover:border-white/15 transition-all text-left group cursor-pointer ${
                    isFullOnMobile ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                  title={`Click to copy ${chip.label}`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {chip.label}
                    </span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    )}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200 truncate max-w-full">
                    {chip.value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
