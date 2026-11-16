import React from 'react';
import { Shield } from 'lucide-react';
import { ActiveTab } from '../../types/color';

interface FooterProps {
  onNavigate: (tab: ActiveTab, param?: string) => void;
  onOpenDevModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDevModal }) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#07080C] text-slate-600 dark:text-slate-400 text-xs transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand & Mission Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-slate-200 dark:border-white/5">
          <div className="space-y-3 max-w-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                CHROMA<span className="text-indigo-600 dark:text-indigo-400">STUDIO</span>
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Every Color. Every Code. One Creative Workspace. High-performance, offline-capable color intelligence suite engineered for designers, engineers, and creators.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-2 rounded-xl shrink-0">
            <Shield className="w-4 h-4 shrink-0" />
            <span className="font-medium">100% Client-Side &amp; Privacy-First Architecture</span>
          </div>
        </div>

        {/* 4 Clean Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-slate-200 dark:border-white/5">
          {/* COLUMN 1: EXPLORE */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Explore Colors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tool-picker')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Color Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('palettes')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Palettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gradients')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Gradients
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: RESOURCES */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Learn &amp; Theory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('developer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Developer Code Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learn', 'contrast')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Color Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Legal &amp; Info Center
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: LEGAL */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accessibility')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Accessibility Statement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('acceptable-use')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Acceptable Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intellectual-property')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Intellectual Property
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: PROJECT */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-4">
              Project
            </h4>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about-chroma-studio')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  About Chroma Studio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDevModal}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  About Developer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('licenses')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left"
                >
                  Licenses &amp; Credits
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 dark:text-slate-400 text-xs">
          <p className="flex items-center gap-1">
            Designed and Developed by{' '}
            <button
              onClick={onOpenDevModal}
              className="text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold font-mono underline decoration-dotted underline-offset-4 ml-1 cursor-pointer"
            >
              @officialhazim42
            </button>
          </p>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Browser-Based Color Intelligence • 100% Client-Side &amp; Private
          </span>
        </div>
      </div>
    </footer>
  );
};
