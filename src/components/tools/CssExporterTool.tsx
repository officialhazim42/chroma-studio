import React, { useState } from 'react';
import {
  FileCode2,
  Plus,
  Trash2,
  Download,
  Eye,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';
import { normalizeHex, getRandomHex } from '../../utils/colorEngine';

interface ExportColorItem {
  key: string;
  hex: string;
}

interface CssExporterToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
}

export const CssExporterTool: React.FC<CssExporterToolProps> = ({
  onNavigate,
  onCopySuccess,
}) => {
  const [format, setFormat] = useState<
    'css' | 'scss' | 'tailwind' | 'json' | 'html' | 'android'
  >('css');

  const [paletteColors, setPaletteColors] = useState<ExportColorItem[]>([
    { key: 'primary', hex: '#6366F1' },
    { key: 'secondary', hex: '#EC4899' },
    { key: 'accent', hex: '#10B981' },
    { key: 'surface', hex: '#12131A' },
    { key: 'background', hex: '#090A0F' },
  ]);

  const addColor = () => {
    const nextHex = getRandomHex();
    setPaletteColors([
      ...paletteColors,
      { key: `color-${paletteColors.length + 1}`, hex: nextHex },
    ]);
  };

  const removeColor = (idx: number) => {
    if (paletteColors.length <= 1) return;
    setPaletteColors(paletteColors.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, key: string, hex: string) => {
    setPaletteColors(
      paletteColors.map((item, i) => (i === idx ? { key, hex: normalizeHex(hex) } : item))
    );
  };

  // Generate code according to selected format
  let generatedCode = '';

  switch (format) {
    case 'css':
      generatedCode = `/* CSS Custom Properties (Variables) */
:root {
${paletteColors.map((c) => `  --color-${c.key}: ${c.hex};`).join('\n')}
}`;
      break;

    case 'scss':
      generatedCode = `// SCSS Variables
${paletteColors.map((c) => `$color-${c.key}: ${c.hex};`).join('\n')}`;
      break;

    case 'tailwind':
      generatedCode = `// Tailwind CSS Config (tailwind.config.js)
module.exports = {
  theme: {
    extend: {
      colors: {
${paletteColors.map((c) => `        '${c.key}': '${c.hex}',`).join('\n')}
      },
    },
  },
};`;
      break;

    case 'json':
      const jsonObj: { [k: string]: string } = {};
      paletteColors.forEach((c) => {
        jsonObj[c.key] = c.hex;
      });
      generatedCode = JSON.stringify({ colors: jsonObj }, null, 2);
      break;

    case 'html':
      generatedCode = `<!-- HTML Color Declarations -->
<meta name="theme-color" content="${paletteColors[0]?.hex || '#6366F1'}" />

<style>
${paletteColors.map((c) => `  .bg-${c.key} { background-color: ${c.hex}; }
  .text-${c.key} { color: ${c.hex}; }`).join('\n')}
</style>`;
      break;

    case 'android':
      generatedCode = `<?xml version="1.0" encoding="utf-8"?>
<!-- Android Resource: res/values/colors.xml -->
<resources>
${paletteColors
  .map((c) => {
    const cleanHex = c.hex.replace('#', '');
    return `    <color name="${c.key}">#FF${cleanHex}</color>`;
  })
  .join('\n')}
</resources>`;
      break;
  }

  const downloadFile = () => {
    const extensions: { [k: string]: string } = {
      css: 'css',
      scss: 'scss',
      tailwind: 'js',
      json: 'json',
      html: 'html',
      android: 'xml',
    };
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chroma-colors.${extensions[format]}`;
    a.click();
    URL.revokeObjectURL(url);
    onCopySuccess(`Downloaded chroma-colors.${extensions[format]}`);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 mb-3 font-mono">
          <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
          <span>TOOL 10 &middot; PRODUCTION CODE GENERATOR</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              CSS Color Exporter &amp; Developer Suite
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Generate production-ready code tokens for CSS, SCSS, Tailwind CSS, JSON tokens, HTML headers, and Android XML resources.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download File</span>
            </button>
            <CopyButton
              textToCopy={generatedCode}
              label="Copy Code"
              size="md"
              variant="filled"
              onCopySuccess={onCopySuccess}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Manage Color Tokens */}
        <div className="lg:col-span-5 bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Color Token List
            </h2>
            <button
              onClick={addColor}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Token</span>
            </button>
          </div>

          {/* Token inputs */}
          <div className="space-y-3">
            {paletteColors.map((colorItem, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <label
                  className="w-8 h-8 rounded-lg border border-white/20 shrink-0 shadow-sm cursor-pointer"
                  style={{ backgroundColor: colorItem.hex }}
                >
                  <input
                    type="color"
                    value={colorItem.hex}
                    onChange={(e) => updateItem(idx, colorItem.key, e.target.value)}
                    className="opacity-0 w-0 h-0 absolute pointer-events-none"
                  />
                </label>

                <input
                  type="text"
                  value={colorItem.key}
                  onChange={(e) => updateItem(idx, e.target.value, colorItem.hex)}
                  placeholder="token-name"
                  className="flex-1 bg-[#181A24] border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                />

                <input
                  type="text"
                  value={colorItem.hex}
                  onChange={(e) => updateItem(idx, colorItem.key, e.target.value)}
                  className="w-20 bg-[#181A24] border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => onNavigate('color-detail', colorItem.hex)}
                  className="p-1 text-slate-500 hover:text-indigo-400 rounded"
                  title={`Inspect ${colorItem.hex}`}
                  aria-label={`Inspect ${colorItem.hex}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {paletteColors.length > 1 && (
                  <button
                    onClick={() => removeColor(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded"
                    title="Remove token"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code Generator Preview */}
        <div className="lg:col-span-7 bg-[#12131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            {/* Format Selection Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#181A24] border border-white/5 mb-4">
              {[
                { id: 'css', label: 'CSS Variables' },
                { id: 'scss', label: 'SCSS' },
                { id: 'tailwind', label: 'Tailwind Config' },
                { id: 'json', label: 'JSON Tokens' },
                { id: 'html', label: 'HTML Meta' },
                { id: 'android', label: 'Android XML' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormat(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    format === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Output Block */}
            <div className="relative rounded-2xl bg-[#090A0F] border border-white/10 p-5 overflow-auto max-h-[380px] custom-scroll">
              <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
            <span>Validated syntactically for production bundling</span>
            <CopyButton textToCopy={generatedCode} label="Copy Output" size="sm" variant="outline" onCopySuccess={onCopySuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};
