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
                <a
                  href="/explore"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('explore');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Explore Colors
                </a>
              </li>
              <li>
                <a
                  href="/tools/picker"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool-picker');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Color Tools
                </a>
              </li>
              <li>
                <a
                  href="/palettes"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('palettes');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Palettes
                </a>
              </li>
              <li>
                <a
                  href="/gradients"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('gradients');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Gradients
                </a>
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
                <a
                  href="/learn"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('learn');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Learn &amp; Theory
                </a>
              </li>
              <li>
                <a
                  href="/developer"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('developer');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Developer Code Hub
                </a>
              </li>
              <li>
                <a
                  href="/learn"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('learn', 'contrast');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Color Guides
                </a>
              </li>
              <li>
                <a
                  href="/legal"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('legal');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left font-medium block"
                >
                  Legal &amp; Info Center
                </a>
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
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('terms');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('privacy');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('cookies');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('disclaimer');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="/accessibility"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('accessibility');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a
                  href="/acceptable-use"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('acceptable-use');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Acceptable Use
                </a>
              </li>
              <li>
                <a
                  href="/intellectual-property"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('intellectual-property');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Intellectual Property
                </a>
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
                <a
                  href="/about-chroma-studio"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about-chroma-studio');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  About Chroma Studio
                </a>
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
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Contact &amp; Support
                </a>
              </li>
              <li>
                <a
                  href="/licenses"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('licenses');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 transition-colors cursor-pointer text-left block"
                >
                  Licenses &amp; Credits
                </a>
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
