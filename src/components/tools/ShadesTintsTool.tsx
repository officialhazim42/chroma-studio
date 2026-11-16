import React, { useState } from 'react';
import {
  Layers,
  Copy,
  FileCode,
  Pipette,
} from 'lucide-react';
import {
  generateTints,
  generateShades,
  generateTones,
  getColorData,
  isValidHex,
  normalizeHex,
} from '../../utils/colorEngine';
import { ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface ShadesTintsToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  initialHex?: string;
}

export const ShadesTintsTool: React.FC<ShadesTintsToolProps> = ({
  onNavigate,
  onCopySuccess,
  initialHex = '#6366F1',
}) => {
  const [baseHex, setBaseHex] = useState(
    isValidHex(initialHex) ? normalizeHex(initialHex) : '#6366F1'
  );
  const [steps, setSteps] = useState<number>(10);

  const hex = isValidHex(baseHex) ? normalizeHex(baseHex) : '#6366F1';
  const colorData = getColorData(hex);

  const tints = generateTints(hex, steps);
  const shades = generateShades(hex, steps);
  const tones = generateTones(hex, steps);

  const exportCssVars = () => {
    let css = `/* Generated Color Scales for ${colorData.name} (${hex}) */\n:root {\n`;
    shades.forEach((s, idx) => {
      css += `  --color-shade-${idx * 10}: ${s.hex};\n`;
    });
    tints.forEach((t, idx) => {
      css += `  --color-tint-${idx * 10}: ${t.hex};\n`;
    });
    css += `}`;
    navigator.clipboard.writeText(css);
    onCopySuccess('Exported full CSS scale to clipboard!');
  };

  const exportTailwind = () => {
    let output = `// Tailwind Color Scale: ${colorData.name}\n{\n  'brand': {\n`;
    const tailwindSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    tints.slice(0, 5).reverse().forEach((t, i) => {
      output += `    ${tailwindSteps[i]}: '${t.hex}',\n`;
    });
    output += `    500: '${hex}',\n`;
    shades.slice(1, 6).forEach((s, i) => {
      output += `    ${tailwindSteps[6 + i]}: '${s.hex}',\n`;
    });
    output += `  }\n}`;
    navigator.clipboard.writeText(output);
    onCopySuccess('Exported Tailwind scale config!');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 mb-3 font-mono">
          <Layers className="w-3.5 h-3.5 text-pink-400" />
          <span>TOOL 07 &middot; DESIGN SYSTEM SCALES</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Shades, Tints &amp; Tones Generator
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Calculate graduated color variations for UI systems, typography hierarchy, hover states, and surface depths.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportTailwind}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span>Tailwind Scale</span>
            </button>
            <button
              onClick={exportCssVars}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Export CSS Vars</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Base Color & Step Count */}
      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 shadow-xl mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Base Color Picker */}
        <div className="flex items-center gap-3">
          <label
            className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0 cursor-pointer flex items-center justify-center"
            style={{ backgroundColor: hex }}
          >
            <Pipette className="w-4 h-4 text-white mix-blend-difference" />
            <input
              type="color"
              value={hex}
              onChange={(e) => setBaseHex(normalizeHex(e.target.value))}
              className="opacity-0 w-0 h-0 absolute pointer-events-none"
            />
          </label>

          <div>
            <input
              type="text"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="bg-[#181A24] border border-white/10 rounded-xl px-3 py-1.5 font-mono text-sm font-bold text-white focus:outline-none focus:border-pink-500 w-32"
            />
            <span className="text-[11px] text-slate-400 block ml-1 mt-0.5">
              {colorData.name}
            </span>
          </div>
        </div>

        {/* Step Count Buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Steps:
          </span>
          {[5, 10, 15, 20].map((s) => (
            <button
              key={s}
              onClick={() => setSteps(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                steps === s
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Scales Display Sections */}
      <div className="space-y-8">
        {/* 1. TINTS SCALE */}
        <div className="bg-[#12131A] border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                Tints (Lightness Progression &mdash; Mixed with Pure White)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ideal for soft badges, secondary surface backgrounds, and pill tags.
              </p>
            </div>
            <CopyButton
              textToCopy={tints.map((t) => t.hex).join(', ')}
              label="Copy Tints"
              size="sm"
              variant="outline"
              onCopySuccess={onCopySuccess}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
            {tints.map((tint, i) => (
              <button
                type="button"
                key={tint.hex + i}
                onClick={() => onNavigate('color-detail', tint.hex)}
                className="group p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all cursor-pointer text-center"
                title={`${tint.hex} (${tint.percent}% White)`}
                aria-label={`Inspect ${tint.hex}`}
              >
                <div
                  className="w-full h-16 rounded-lg mb-2 shadow-inner border border-white/10 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tint.hex }}
                />
                <span className="text-[11px] font-mono font-bold text-white block">
                  {tint.hex}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {tint.percent}% White
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. SHADES SCALE */}
        <div className="bg-[#12131A] border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/20" />
                Shades (Depth Progression &mdash; Mixed with Pure Black)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ideal for button active states, dark mode borders, and deep accents.
              </p>
            </div>
            <CopyButton
              textToCopy={shades.map((s) => s.hex).join(', ')}
              label="Copy Shades"
              size="sm"
              variant="outline"
              onCopySuccess={onCopySuccess}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
            {shades.map((shade, i) => (
              <button
                type="button"
                key={shade.hex + i}
                onClick={() => onNavigate('color-detail', shade.hex)}
                className="group p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all cursor-pointer text-center"
                title={`${shade.hex} (${shade.percent}% Black)`}
                aria-label={`Inspect ${shade.hex}`}
              >
                <div
                  className="w-full h-16 rounded-lg mb-2 shadow-inner border border-white/10 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: shade.hex }}
                />
                <span className="text-[11px] font-mono font-bold text-white block">
                  {shade.hex}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {shade.percent}% Black
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. TONES SCALE */}
        <div className="bg-[#12131A] border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                Tones (Subdued Progression &mdash; Mixed with 50% Neutral Gray)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ideal for muted secondary text, subtle iconography, and desaturated states.
              </p>
            </div>
            <CopyButton
              textToCopy={tones.map((t) => t.hex).join(', ')}
              label="Copy Tones"
              size="sm"
              variant="outline"
              onCopySuccess={onCopySuccess}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
            {tones.map((tone, i) => (
              <button
                type="button"
                key={tone.hex + i}
                onClick={() => onNavigate('color-detail', tone.hex)}
                className="group p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all cursor-pointer text-center"
                title={`${tone.hex} (${tone.percent}% Gray)`}
                aria-label={`Inspect ${tone.hex}`}
              >
                <div
                  className="w-full h-16 rounded-lg mb-2 shadow-inner border border-white/10 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tone.hex }}
                />
                <span className="text-[11px] font-mono font-bold text-white block">
                  {tone.hex}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {tone.percent}% Gray
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
