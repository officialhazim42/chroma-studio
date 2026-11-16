import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  Pipette,
  Eye,
} from 'lucide-react';
import {
  getWCAGScore,
  isValidHex,
  normalizeHex,
  getColorData,
} from '../../utils/colorEngine';
import { ActiveTab, WCAGScore } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

interface ContrastCheckerToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  initialFg?: string;
  initialBg?: string;
}

export const ContrastCheckerTool: React.FC<ContrastCheckerToolProps> = ({
  onNavigate,
  onCopySuccess,
  initialFg = '#FFFFFF',
  initialBg = '#4F46E5',
}) => {
  const [fgColor, setFgColor] = useState(
    isValidHex(initialFg) ? normalizeHex(initialFg) : '#FFFFFF'
  );
  const [bgColor, setBgColor] = useState(
    isValidHex(initialBg) ? normalizeHex(initialBg) : '#4F46E5'
  );

  const fgHex = isValidHex(fgColor) ? normalizeHex(fgColor) : '#FFFFFF';
  const bgHex = isValidHex(bgColor) ? normalizeHex(bgColor) : '#4F46E5';

  const score: WCAGScore = getWCAGScore(fgHex, bgHex);
  const fgData = getColorData(fgHex);
  const bgData = getColorData(bgHex);

  const swapColors = () => {
    const temp = fgHex;
    setFgColor(bgHex);
    setBgColor(temp);
  };

  const samplePresets = [
    { name: 'Dark SaaS', fg: '#F8FAFC', bg: '#0F172A' },
    { name: 'Indigo Accent', fg: '#FFFFFF', bg: '#4F46E5' },
    { name: 'Light Editorial', fg: '#1E293B', bg: '#FFFFFF' },
    { name: 'Emerald Nature', fg: '#FFFFFF', bg: '#065F46' },
    { name: 'Cyber Neon', fg: '#00F5D4', bg: '#0D0221' },
    { name: 'Warning Yellow', fg: '#1C1917', bg: '#FBBF24' },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-300 mb-3 font-mono">
          <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
          <span>TOOL 05 &middot; ACCESSIBILITY AUDITOR</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              WCAG Contrast Checker
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Evaluate optical contrast ratios under W3C Web Content Accessibility Guidelines (WCAG 2.1). Ensure seamless readability for all human vision capabilities.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <CopyButton
              textToCopy={`WCAG 2.1 Contrast Audit\nRatio: ${score.ratioFormatted}\nGrade: ${score.level}\nForeground: ${fgHex}\nBackground: ${bgHex}\nAA Normal: ${score.aaNormal ? 'PASS' : 'FAIL'}\nAA Large: ${score.aaLarge ? 'PASS' : 'FAIL'}\nAAA Normal: ${score.aaaNormal ? 'PASS' : 'FAIL'}`}
              label="Copy Report"
              size="md"
              variant="filled"
              onCopySuccess={onCopySuccess}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Color Selectors & Score Summary */}
        <div className="lg:col-span-5 bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Color Inputs
            </h2>
            <button
              onClick={swapColors}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all active:scale-95"
              title="Swap Foreground & Background"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Swap</span>
            </button>
          </div>

          {/* Foreground Input */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Text / Foreground Color
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {fgData.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label
                className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0 cursor-pointer flex items-center justify-center"
                style={{ backgroundColor: fgHex }}
                title="Pick foreground color"
              >
                <Pipette className="w-4 h-4 text-black mix-blend-difference" />
                <input
                  type="color"
                  value={fgHex}
                  onChange={(e) => setFgColor(normalizeHex(e.target.value))}
                  className="opacity-0 w-0 h-0 absolute pointer-events-none"
                />
              </label>
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="flex-1 bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-bold text-white focus:outline-none focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => onNavigate('color-detail', fgHex)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                title={`Inspect ${fgHex}`}
                aria-label={`Inspect ${fgHex}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Background Input */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Background Surface Color
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {bgData.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label
                className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0 cursor-pointer flex items-center justify-center"
                style={{ backgroundColor: bgHex }}
                title="Pick background color"
              >
                <Pipette className="w-4 h-4 text-black mix-blend-difference" />
                <input
                  type="color"
                  value={bgHex}
                  onChange={(e) => setBgColor(normalizeHex(e.target.value))}
                  className="opacity-0 w-0 h-0 absolute pointer-events-none"
                />
              </label>
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 bg-[#181A24] border border-white/10 rounded-xl px-3 py-2 font-mono text-sm font-bold text-white focus:outline-none focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => onNavigate('color-detail', bgHex)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                title={`Inspect ${bgHex}`}
                aria-label={`Inspect ${bgHex}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contrast Score Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-teal-950/30 border border-teal-500/30 text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              Calculated Contrast Ratio
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight">
              {score.ratioFormatted}
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide mt-2"
              style={{
                backgroundColor: score.aaNormal ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                color: score.aaNormal ? '#34D399' : '#FB7185',
              }}
            >
              Overall Grade: {score.level}
            </div>
          </div>

          {/* Presets */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Accessible Presets
            </span>
            <div className="grid grid-cols-2 gap-2">
              {samplePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setFgColor(preset.fg);
                    setBgColor(preset.bg);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-left"
                >
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shrink-0 flex items-center justify-center font-bold text-[9px]"
                    style={{ backgroundColor: preset.bg, color: preset.fg }}
                  >
                    Aa
                  </div>
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live UI Component Preview & Pass/Fail Matrix */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Preview Canvas */}
          <div
            className="w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 transition-colors duration-200"
            style={{ backgroundColor: bgHex }}
          >
            <div className="space-y-4">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md inline-block"
                style={{
                  backgroundColor: fgHex,
                  color: bgHex,
                }}
              >
                LIVE PREVIEW INTERFACE
              </span>

              <h3
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: fgHex }}
              >
                Good design begins with human accessibility.
              </h3>

              <p
                className="text-sm leading-relaxed max-w-lg"
                style={{ color: fgHex, opacity: 0.9 }}
              >
                According to the World Health Organization, over 2.2 billion people have vision impairments. Designing with accessible contrast ensures that your content remains legible across diverse lighting conditions and screen qualities.
              </p>

              {/* Sample Buttons / Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold shadow-md"
                  style={{ backgroundColor: fgHex, color: bgHex }}
                >
                  Primary Action
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-semibold border"
                  style={{ borderColor: fgHex, color: fgHex }}
                >
                  Secondary Outline
                </button>
              </div>
            </div>
          </div>

          {/* Pass / Fail Compliance Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WCAG AA Normal Text */}
            <div className="p-4 rounded-2xl bg-[#12131A] border border-white/10 flex items-start gap-3">
              {score.aaNormal ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">WCAG AA Normal Text</h4>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${score.aaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {score.aaNormal ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Requires at least <strong>4.5 : 1</strong> for body text under 18pt or 14pt bold.
                </p>
              </div>
            </div>

            {/* WCAG AA Large Text */}
            <div className="p-4 rounded-2xl bg-[#12131A] border border-white/10 flex items-start gap-3">
              {score.aaLarge ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">WCAG AA Large Text</h4>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${score.aaLarge ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {score.aaLarge ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Requires at least <strong>3.0 : 1</strong> for headings (&ge;18pt or 14pt bold).
                </p>
              </div>
            </div>

            {/* WCAG AAA Normal Text */}
            <div className="p-4 rounded-2xl bg-[#12131A] border border-white/10 flex items-start gap-3">
              {score.aaaNormal ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">WCAG AAA Normal Text</h4>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${score.aaaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {score.aaaNormal ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Enhanced standard requiring <strong>7.0 : 1</strong> for normal body text.
                </p>
              </div>
            </div>

            {/* WCAG AAA Large Text & UI Components */}
            <div className="p-4 rounded-2xl bg-[#12131A] border border-white/10 flex items-start gap-3">
              {score.uiComponents ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">UI Components &amp; Borders</h4>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${score.uiComponents ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {score.uiComponents ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Requires at least <strong>3.0 : 1</strong> for form borders and visual icons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
