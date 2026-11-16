import React from 'react';
import { ColorFamily, ActiveTab } from '../../types/color';
import { COLOR_DATASET } from '../../utils/colorDataset';
import { ArrowRight } from 'lucide-react';

interface FamilyBrowserProps {
  onSelectFamily: (family: ColorFamily) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const FamilyBrowser: React.FC<FamilyBrowserProps> = ({
  onSelectFamily,
  onNavigate,
}) => {
  const families: {
    id: ColorFamily;
    name: string;
    hex: string;
    description: string;
  }[] = [
    { id: 'red', name: 'Red', hex: '#DC143C', description: 'Passionate, energetic, vivid' },
    { id: 'orange', name: 'Orange', hex: '#F28500', description: 'Warm, playful, inviting' },
    { id: 'yellow', name: 'Yellow', hex: '#FFD700', description: 'Luminous, cheerful, radiant' },
    { id: 'green', name: 'Green', hex: '#50C878', description: 'Natural, organic, fresh' },
    { id: 'blue', name: 'Blue', hex: '#0047AB', description: 'Serene, trustworthy, expansive' },
    { id: 'purple', name: 'Purple', hex: '#8F00FF', description: 'Regal, mysterious, inventive' },
    { id: 'pink', name: 'Pink', hex: '#FF007F', description: 'Vibrant, delicate, romantic' },
    { id: 'brown', name: 'Brown', hex: '#7B3F00', description: 'Earthy, grounded, textured' },
    { id: 'gray', name: 'Gray', hex: '#708090', description: 'Neutral, balanced, timeless' },
    { id: 'black', name: 'Black', hex: '#0B0B0C', description: 'Deep, dramatic, powerful' },
    { id: 'white', name: 'White', hex: '#FFFFFF', description: 'Pure, crisp, minimalist' },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-white/5 bg-slate-50/60 dark:bg-[#08090E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
              CURATED SPECTRUM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Browse by Color Family
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <span>View full color catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {families.map((fam) => {
            const count = COLOR_DATASET.filter((c) => c.family === fam.id).length;
            const isLightColor = fam.id === 'white' || fam.id === 'yellow';

            return (
              <button
                key={fam.id}
                onClick={() => onSelectFamily(fam.id)}
                className="group p-4 rounded-2xl bg-white dark:bg-[#12131A] hover:bg-slate-50 dark:hover:bg-[#161822] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 transition-all text-left flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Family Color Pill Swatch */}
                <div
                  className="w-full h-12 rounded-xl mb-3 shadow-inner border border-slate-200/60 dark:border-white/10 transition-transform duration-200 group-hover:scale-102 flex items-end justify-between p-2"
                  style={{ backgroundColor: fam.hex }}
                >
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-md"
                    style={{
                      backgroundColor: isLightColor ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                      color: isLightColor ? '#000' : '#FFF',
                    }}
                  >
                    {fam.hex}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {fam.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {count} colors
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 truncate">
                    {fam.description}
                  </p>
                </div>
              </button>
            );
          })}

          {/* 12th Card: Full Spectrum Explorer (completes 2x6 grid) */}
          <button
            onClick={() => onNavigate('explore')}
            className="group p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 dark:from-indigo-950/40 dark:via-[#12131A] dark:to-purple-950/40 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 border border-indigo-200 hover:border-indigo-300 dark:border-indigo-500/30 dark:hover:border-indigo-500/60 transition-all text-left flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="w-full h-12 rounded-xl mb-3 shadow-inner bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-indigo-500 flex items-center justify-center p-2 transition-transform duration-200 group-hover:scale-102">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md bg-black/40 text-white">
                ALL SPECTRUM
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  All Spectrum
                </h3>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {COLOR_DATASET.length} colors
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 truncate">
                Search, filter &amp; sort catalog
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
