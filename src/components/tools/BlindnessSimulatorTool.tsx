import React, { useState } from 'react';
import {
  Eye,
  Pipette,
  Info,
} from 'lucide-react';
import {
  simulateColorBlindness,
  hexToRgb,
  rgbToHex,
  isValidHex,
  normalizeHex,
  getColorData,
} from '../../utils/colorEngine';
import { ColorBlindnessType, ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface BlindnessSimulatorToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  initialHex?: string;
}

export const BlindnessSimulatorTool: React.FC<BlindnessSimulatorToolProps> = ({
  onNavigate,
  onCopySuccess,
  initialHex = '#DC143C',
}) => {
  const [baseHex, setBaseHex] = useState(
    isValidHex(initialHex) ? normalizeHex(initialHex) : '#DC143C'
  );

  const hex = isValidHex(baseHex) ? normalizeHex(baseHex) : '#DC143C';
  const rgb = hexToRgb(hex);
  const colorData = getColorData(hex);

  // Compute all 4 simulated conditions
  const conditions: {
    type: ColorBlindnessType;
    name: string;
    prevalence: string;
    desc: string;
    coneAffected: string;
  }[] = [
    {
      type: 'protanopia',
      name: 'Protanopia',
      prevalence: '~1% of males',
      desc: 'Absence of long-wavelength L-cones (red photoreceptors). Reds appear dark or brownish-gray.',
      coneAffected: 'L-Cone (Red)',
    },
    {
      type: 'deuteranopia',
      name: 'Deuteranopia',
      prevalence: '~5% of males',
      desc: 'Absence of medium-wavelength M-cones (green photoreceptors). Common red-green confusion.',
      coneAffected: 'M-Cone (Green)',
    },
    {
      type: 'tritanopia',
      name: 'Tritanopia',
      prevalence: '~0.003% of population',
      desc: 'Absence of short-wavelength S-cones (blue photoreceptors). Blues appear greenish, yellows pinkish.',
      coneAffected: 'S-Cone (Blue)',
    },
    {
      type: 'achromatopsia',
      name: 'Achromatopsia',
      prevalence: '~0.003% (1 in 33,000)',
      desc: 'Total color blindness. Vision is rendered strictly in grayscale / monochrome relative luminance.',
      coneAffected: 'All Cones Absent',
    },
  ];

  const presets = ['#DC143C', '#228B22', '#0047AB', '#FF7F50', '#8A2BE2', '#FFD700'];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-300 mb-3 font-mono">
          <Eye className="w-3.5 h-3.5 text-rose-400" />
          <span>TOOL 09 &middot; VISION ACCESSIBILITY SIMULATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Color Blindness Simulator
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Simulate how individuals with various color vision deficiencies perceive your color choices using scientifically verified Machado/Brettel LMS cone matrices.
        </p>
      </div>

      {/* Input Selection Bar */}
      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 shadow-xl mb-8 flex flex-wrap items-center justify-between gap-4">
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
              className="bg-[#181A24] border border-white/10 rounded-xl px-3 py-1.5 font-mono text-sm font-bold text-white focus:outline-none focus:border-rose-500 w-32"
            />
            <span className="text-[11px] text-slate-400 block ml-1 mt-0.5">
              {colorData.name} (Normal Trichromatic Vision)
            </span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Test Colors:</span>
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setBaseHex(p)}
              className="w-7 h-7 rounded-lg border border-white/20 transition-transform hover:scale-110 active:scale-95 shadow-sm"
              style={{ backgroundColor: p }}
              title={p}
            />
          ))}
        </div>
      </div>

      {/* Side-by-side Normal vs 4 Simulated Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {/* Normal Vision Reference Card */}
        <div className="p-5 rounded-3xl bg-[#12131A] border border-indigo-500/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">
                Normal Vision
              </span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                Standard
              </span>
            </div>

            <div
              className="w-full h-32 rounded-2xl shadow-inner border border-white/10 mb-3"
              style={{ backgroundColor: hex }}
            />

            <h3 className="text-sm font-bold text-white">Trichromatic</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Standard trichromatic perception with fully functional L, M, and S photoreceptor cones.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">{hex}</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onNavigate('color-detail', hex)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Inspect in Color Detail"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <CopyButton textToCopy={hex} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
            </div>
          </div>
        </div>

        {/* Simulated Conditions */}
        {conditions.map((cond) => {
          const simRgb = simulateColorBlindness(rgb.r, rgb.g, rgb.b, cond.type);
          const simHex = rgbToHex(simRgb.r, simRgb.g, simRgb.b);

          return (
            <div
              key={cond.type}
              className="p-5 rounded-3xl bg-[#12131A] border border-white/10 hover:border-white/25 shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">
                    {cond.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {cond.prevalence}
                  </span>
                </div>

                <div
                  className="w-full h-32 rounded-2xl shadow-inner border border-white/10 mb-3 transition-colors"
                  style={{ backgroundColor: simHex }}
                />

                <h3 className="text-sm font-bold text-white">{cond.coneAffected}</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {cond.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">{simHex}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onNavigate('color-detail', simHex)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Inspect in Color Detail"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <CopyButton textToCopy={simHex} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accessible Design Insight */}
      <div className="bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex items-start gap-4">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
          <p className="font-bold text-white">
            Accessibility Best Practice: Never convey meaning through color alone.
          </p>
          <p className="text-slate-400">
            When designing alert badges, form validation errors, charts, or navigation states, always supplement color cues with icons, clear text labels, underlines, or distinctive border treatments.
          </p>
        </div>
      </div>
    </div>
  );
};
