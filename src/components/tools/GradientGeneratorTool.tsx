import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Heart,
  Eye,
} from 'lucide-react';
import { GradientStop, ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';
import { getRandomHex, normalizeHex } from '../../utils/colorEngine';

interface GradientGeneratorToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  onSaveGradient: (name: string, css: string, stops: GradientStop[]) => void;
}

export const GradientGeneratorTool: React.FC<GradientGeneratorToolProps> = ({
  onNavigate,
  onCopySuccess,
  onSaveGradient,
}) => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#4F46E5', position: 0 },
    { color: '#9333EA', position: 50 },
    { color: '#EC4899', position: 100 },
  ]);

  // Construct CSS string
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');

  let cssCode = '';
  if (gradientType === 'linear') {
    cssCode = `linear-gradient(${angle}deg, ${stopsStr})`;
  } else if (gradientType === 'radial') {
    cssCode = `radial-gradient(circle at center, ${stopsStr})`;
  } else {
    cssCode = `conic-gradient(from ${angle}deg at 50% 50%, ${stopsStr})`;
  }

  const fullCssDeclaration = `background: ${cssCode};`;

  const addStop = () => {
    if (stops.length >= 7) return;
    const newColor = getRandomHex();
    const newPos = Math.round(Math.random() * 80) + 10;
    setStops([...stops, { color: newColor, position: newPos }]);
  };

  const removeStop = (idx: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
  };

  const updateStopColor = (idx: number, color: string) => {
    setStops(stops.map((s, i) => (i === idx ? { ...s, color: normalizeHex(color) } : s)));
  };

  const updateStopPos = (idx: number, pos: number) => {
    setStops(stops.map((s, i) => (i === idx ? { ...s, position: Math.max(0, Math.min(100, pos)) } : s)));
  };

  const presets = [
    { name: 'Cosmic Violet', type: 'linear' as const, angle: 135, stops: [{ color: '#4F46E5', position: 0 }, { color: '#9333EA', position: 50 }, { color: '#EC4899', position: 100 }] },
    { name: 'Aurora Borealis', type: 'linear' as const, angle: 90, stops: [{ color: '#059669', position: 0 }, { color: '#10B981', position: 40 }, { color: '#06B6D4', position: 100 }] },
    { name: 'Cyber Sunset', type: 'linear' as const, angle: 45, stops: [{ color: '#FF007F', position: 0 }, { color: '#FF7700', position: 50 }, { color: '#FFDD00', position: 100 }] },
    { name: 'Radial Dark Hole', type: 'radial' as const, angle: 0, stops: [{ color: '#38BDF8', position: 0 }, { color: '#1E1B4B', position: 60 }, { color: '#030712', position: 100 }] },
    { name: 'Conic Spectrum', type: 'conic' as const, angle: 0, stops: [{ color: '#EF4444', position: 0 }, { color: '#F59E0B', position: 25 }, { color: '#10B981', position: 50 }, { color: '#3B82F6', position: 75 }, { color: '#EF4444', position: 100 }] },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops);
  };

  const handleSaveGradient = () => {
    onSaveGradient(`${gradientType} Gradient`, fullCssDeclaration, stops);
    onCopySuccess('Saved gradient to local favorites!');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>TOOL 06 &middot; ADVANCED CSS STOPS</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gradient Generator
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Design multi-stop linear, radial, and conic gradients with exact angle rotation, custom color stops, and direct CSS code export.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveGradient}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Save Gradient</span>
            </button>
            <CopyButton
              textToCopy={fullCssDeclaration}
              label="Copy CSS"
              size="md"
              variant="filled"
              onCopySuccess={onCopySuccess}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Canvas Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className="w-full h-80 sm:h-96 rounded-3xl shadow-2xl border border-white/10 relative p-6 flex flex-col justify-between overflow-hidden transition-all duration-300"
            style={{ background: cssCode }}
          >
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-black/40 text-white backdrop-blur-md self-start">
              {gradientType.toUpperCase()} {gradientType !== 'radial' ? `${angle}°` : ''}
            </span>

            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-white">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Generated CSS
              </span>
              <p className="font-mono text-xs text-slate-200 break-all select-all">
                {fullCssDeclaration}
              </p>
            </div>
          </div>

          {/* Preset Gradients Strip */}
          <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
              Curated Inspiration Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={`p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-left group ${
                    idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-lg mb-1.5 shadow-sm border border-white/10"
                    style={{
                      background:
                        preset.type === 'linear'
                          ? `linear-gradient(${preset.angle}deg, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(', ')})`
                          : preset.type === 'radial'
                          ? `radial-gradient(circle, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(', ')})`
                          : `conic-gradient(${preset.stops.map((s) => `${s.color} ${s.position}%`).join(', ')})`,
                    }}
                  />
                  <p className="text-[11px] font-semibold text-slate-200 group-hover:text-purple-300 truncate">
                    {preset.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Color Stops */}
        <div className="lg:col-span-5 bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Gradient Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              Gradient Geometry
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['linear', 'radial', 'conic'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all ${
                    gradientType === type
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Angle / Direction Control (for linear & conic) */}
          {gradientType !== 'radial' && (
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Angle Direction</span>
                <span className="font-mono text-purple-400 font-bold">{angle}&deg;</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between gap-1 mt-2">
                {[0, 45, 90, 135, 180, 270].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`px-2 py-1 rounded text-[10px] font-mono ${
                      angle === a ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {a}&deg;
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Stops Manager */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Color Stops ({stops.length}/7)
              </span>
              {stops.length < 7 && (
                <button
                  onClick={addStop}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Stop</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {stops.map((stop, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <label
                    className="w-8 h-8 rounded-lg border border-white/20 shrink-0 shadow-sm cursor-pointer"
                    style={{ backgroundColor: stop.color }}
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStopColor(idx, e.target.value)}
                      className="opacity-0 w-0 h-0 absolute pointer-events-none"
                    />
                  </label>

                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                      <span>{stop.color}</span>
                      <span>{stop.position}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateStopPos(idx, parseInt(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5"
                    />
                  </div>

                  <button
                    onClick={() => onNavigate('color-detail', stop.color)}
                    className="p-1 rounded text-slate-500 hover:text-purple-300"
                    title={`Inspect ${stop.color}`}
                    aria-label={`Inspect color ${stop.color}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(idx)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400"
                      title="Remove color stop"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
