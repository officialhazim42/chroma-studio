import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import {
  rgbToHex,
  hslToRgb,
  hsvToRgb,
  cmykToRgb,
  isValidHex,
  normalizeHex,
  getColorData,
} from '../../utils/colorEngine';
import { CopyButton } from '../ui/CopyButton';
import { ActiveTab } from '../../types/color';

interface ColorConverterToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  initialHex?: string;
}

export const ColorConverterTool: React.FC<ColorConverterToolProps> = ({
  onNavigate,
  onCopySuccess,
  initialHex = '#3B82F6',
}) => {
  const [hexInput, setHexInput] = useState(
    isValidHex(initialHex) ? normalizeHex(initialHex) : '#3B82F6'
  );

  // Parse color data reactive to hex
  const activeHex = isValidHex(hexInput) ? normalizeHex(hexInput) : '#3B82F6';
  const colorData = getColorData(activeHex);

  // Handlers for bidirectional instant updating
  const handleHexChange = (val: string) => {
    setHexInput(val);
  };

  const handleRgbFieldChange = (r: number, g: number, b: number) => {
    const nextHex = rgbToHex(r, g, b);
    setHexInput(nextHex);
  };

  const handleHslFieldChange = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    setHexInput(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const handleHsvFieldChange = (h: number, s: number, v: number) => {
    const rgb = hsvToRgb(h, s, v);
    setHexInput(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const handleCmykFieldChange = (c: number, m: number, y: number, k: number) => {
    const rgb = cmykToRgb(c, m, y, k);
    setHexInput(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const presets = [
    '#6366F1',
    '#EC4899',
    '#10B981',
    '#3B82F6',
    '#F59E0B',
    '#8B5CF6',
    '#14B8A6',
    '#EF4444',
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-300 mb-3 font-mono">
          <Repeat className="w-3.5 h-3.5 text-sky-400" />
          <span>TOOL 02 &middot; BIDIRECTIONAL ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Color Converter
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Instantly convert color values between HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK formats with real-time recalculations.
        </p>
      </div>

      {/* Main Converter Card */}
      <div className="bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Top Preview Banner & Quick Presets */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-[#161822] border border-white/5">
          <div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-xl shrink-0 border border-white/10 flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: activeHex }}
          >
            <span
              className="text-xs font-mono font-bold px-2 py-1 rounded backdrop-blur-md"
              style={{
                backgroundColor: colorData.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                color: colorData.isDark ? '#FFF' : '#000',
              }}
            >
              {activeHex}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span>{colorData.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              {colorData.cssRgb} &bull; {colorData.cssHsl}
            </p>

            {/* Presets Strip */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Presets:</span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setHexInput(preset)}
                  className="w-6 h-6 rounded-lg border border-white/20 transition-transform hover:scale-110 active:scale-95 shadow-sm"
                  style={{ backgroundColor: preset }}
                  title={preset}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('color-detail', activeHex)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold shrink-0 transition-colors"
          >
            Deep Inspection &rarr;
          </button>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. HEX Input */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                HEX (Hexadecimal)
              </label>
              <CopyButton textToCopy={colorData.hex} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
            </div>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#3B82F6"
              className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3.5 py-2.5 font-mono text-base font-bold text-white focus:outline-none focus:border-sky-500"
            />
            <p className="text-[11px] text-slate-400">
              Valid formats: #RGB, #RRGGBB
            </p>
          </div>

          {/* 2. RGB Inputs */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                RGB (Red, Green, Blue)
              </label>
              <CopyButton textToCopy={colorData.cssRgb} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">R (0-255)</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={colorData.rgb.r}
                  onChange={(e) =>
                    handleRgbFieldChange(
                      parseInt(e.target.value) || 0,
                      colorData.rgb.g,
                      colorData.rgb.b
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">G (0-255)</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={colorData.rgb.g}
                  onChange={(e) =>
                    handleRgbFieldChange(
                      colorData.rgb.r,
                      parseInt(e.target.value) || 0,
                      colorData.rgb.b
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">B (0-255)</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={colorData.rgb.b}
                  onChange={(e) =>
                    handleRgbFieldChange(
                      colorData.rgb.r,
                      colorData.rgb.g,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400">{colorData.cssRgb}</p>
          </div>

          {/* 3. HSL Inputs */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                HSL (Hue, Saturation, Lightness)
              </label>
              <CopyButton textToCopy={colorData.cssHsl} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">H (0-360&deg;)</span>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={colorData.hsl.h}
                  onChange={(e) =>
                    handleHslFieldChange(
                      parseInt(e.target.value) || 0,
                      colorData.hsl.s,
                      colorData.hsl.l
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">S (0-100%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.hsl.s}
                  onChange={(e) =>
                    handleHslFieldChange(
                      colorData.hsl.h,
                      parseInt(e.target.value) || 0,
                      colorData.hsl.l
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">L (0-100%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.hsl.l}
                  onChange={(e) =>
                    handleHslFieldChange(
                      colorData.hsl.h,
                      colorData.hsl.s,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400">{colorData.cssHsl}</p>
          </div>

          {/* 4. HSV Inputs */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                HSV / HSB (Hue, Saturation, Value)
              </label>
              <CopyButton
                textToCopy={`hsv(${colorData.hsv.h}, ${colorData.hsv.s}%, ${colorData.hsv.v}%)`}
                size="sm"
                showIconOnly
                onCopySuccess={onCopySuccess}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">H (0-360&deg;)</span>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={colorData.hsv.h}
                  onChange={(e) =>
                    handleHsvFieldChange(
                      parseInt(e.target.value) || 0,
                      colorData.hsv.s,
                      colorData.hsv.v
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">S (0-100%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.hsv.s}
                  onChange={(e) =>
                    handleHsvFieldChange(
                      colorData.hsv.h,
                      parseInt(e.target.value) || 0,
                      colorData.hsv.v
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">V (0-100%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.hsv.v}
                  onChange={(e) =>
                    handleHsvFieldChange(
                      colorData.hsv.h,
                      colorData.hsv.s,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              hsv({colorData.hsv.h}, {colorData.hsv.s}%, {colorData.hsv.v}%)
            </p>
          </div>

          {/* 5. CMYK Inputs */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                CMYK (Cyan, Magenta, Yellow, Key/Black &mdash; Offset Print)
              </label>
              <CopyButton
                textToCopy={`cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)`}
                size="sm"
                showIconOnly
                onCopySuccess={onCopySuccess}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">C ({colorData.cmyk.c}%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.cmyk.c}
                  onChange={(e) =>
                    handleCmykFieldChange(
                      parseInt(e.target.value) || 0,
                      colorData.cmyk.m,
                      colorData.cmyk.y,
                      colorData.cmyk.k
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">M ({colorData.cmyk.m}%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.cmyk.m}
                  onChange={(e) =>
                    handleCmykFieldChange(
                      colorData.cmyk.c,
                      parseInt(e.target.value) || 0,
                      colorData.cmyk.y,
                      colorData.cmyk.k
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Y ({colorData.cmyk.y}%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.cmyk.y}
                  onChange={(e) =>
                    handleCmykFieldChange(
                      colorData.cmyk.c,
                      colorData.cmyk.m,
                      parseInt(e.target.value) || 0,
                      colorData.cmyk.k
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">K ({colorData.cmyk.k}%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={colorData.cmyk.k}
                  onChange={(e) =>
                    handleCmykFieldChange(
                      colorData.cmyk.c,
                      colorData.cmyk.m,
                      colorData.cmyk.y,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
