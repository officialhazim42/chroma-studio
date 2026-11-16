import React, { useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Monitor,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Pipette,
  Repeat,
  Image as ImageIcon,
  Palette as PaletteIcon,
  CheckCircle,
  Layers,
  Sliders,
  Eye,
  FileCode2,
  Download,
} from 'lucide-react';
import { ActiveTab } from '../../types/color';
import { ThemeMode } from '../../utils/storage';
import { usePWA } from '../../hooks/usePWA';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab, param?: string) => void;
  favoritesCount: number;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenSearch: () => void;
  onOpenDevModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  favoritesCount,
  theme,
  onThemeChange,
  onOpenSearch,
  onOpenDevModal,
}) => {
  const { isInstalled, setInstallModalOpen } = usePWA();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const toolsList: { id: ActiveTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'tool-picker', label: 'Color Picker', icon: <Pipette className="w-4 h-4 text-indigo-400" />, desc: 'Interactive picker & code copy' },
    { id: 'tool-converter', label: 'Color Converter', icon: <Repeat className="w-4 h-4 text-sky-400" />, desc: 'Bidirectional reactive math' },
    { id: 'tool-image', label: 'Image Color Picker', icon: <ImageIcon className="w-4 h-4 text-emerald-400" />, desc: 'Local pixel extraction & loupe' },
    { id: 'tool-palette', label: 'Palette Generator', icon: <PaletteIcon className="w-4 h-4 text-amber-400" />, desc: 'Harmonious color schemes' },
    { id: 'tool-contrast', label: 'Contrast Checker', icon: <CheckCircle className="w-4 h-4 text-teal-400" />, desc: 'WCAG 2.1 AA/AAA compliance' },
    { id: 'tool-gradient', label: 'Gradient Generator', icon: <Sparkles className="w-4 h-4 text-purple-400" />, desc: 'Linear, radial & conic CSS' },
    { id: 'tool-shades', label: 'Shades & Tints', icon: <Layers className="w-4 h-4 text-pink-400" />, desc: 'Scale tints, shades, tones' },
    { id: 'tool-mixer', label: 'Color Mixer', icon: <Sliders className="w-4 h-4 text-orange-400" />, desc: 'Blend 2 colors by ratio' },
    { id: 'tool-blindness', label: 'Blindness Simulator', icon: <Eye className="w-4 h-4 text-rose-400" />, desc: 'Test vision deficiencies' },
    { id: 'tool-exporter', label: 'CSS & Dev Exporter', icon: <FileCode2 className="w-4 h-4 text-blue-400" />, desc: 'Tailwind, CSS vars, Android' },
  ];

  const handleNavClick = (tab: ActiveTab, param?: string) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const cycleTheme = () => {
    if (theme === 'dark') onThemeChange('light');
    else if (theme === 'light') onThemeChange('system');
    else onThemeChange('dark');
  };

  const isToolActive = activeTab.startsWith('tool-');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090A0F]/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 sm:gap-2.5 text-left group focus:outline-none"
            aria-label="Chroma Studio Home"
          >
            {/* Logo Mark: Stylized geometric color wheel icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#090A0F] flex items-center justify-center relative overflow-hidden">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 animate-spin [animation-duration:8s]" />
                <div className="absolute inset-1 rounded-full bg-white/60 dark:bg-[#090A0F]/60 backdrop-blur-xs flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                CHROMA<span className="text-indigo-600 dark:text-indigo-400 font-extrabold ml-0.5 sm:ml-1">STUDIO</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400 -mt-1 hidden sm:inline">
                COLOR INTELLIGENCE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('explore')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                activeTab === 'explore'
                  ? 'bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Explore Colors
            </button>

            {/* Tools Dropdown Menu */}
            <div className="relative" onMouseLeave={() => setToolsDropdownOpen(false)}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  isToolActive
                    ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <span>Color Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {toolsDropdownOpen && (
                <div
                  className="absolute top-full left-0 w-80 p-2 mt-1 rounded-2xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-1 gap-1"
                >
                  {toolsList.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleNavClick(tool.id)}
                      className={`flex items-start gap-3 p-2 rounded-xl text-left transition-all ${
                        activeTab === tool.id
                          ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-900 dark:text-white border border-indigo-200 dark:border-indigo-500/30'
                          : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 group'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 shrink-0 mt-0.5">
                        {tool.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-active:text-indigo-700 dark:group-active:text-indigo-300 transition-colors">
                          {tool.label}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {tool.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('palettes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                activeTab === 'palettes'
                  ? 'bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Palettes
            </button>

            <button
              onClick={() => handleNavClick('gradients')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                activeTab === 'gradients'
                  ? 'bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Gradients
            </button>

            <button
              onClick={() => handleNavClick('learn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                activeTab === 'learn'
                  ? 'bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Learn
            </button>

            <button
              onClick={() => handleNavClick('developer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                activeTab === 'developer'
                  ? 'bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Developer
            </button>
          </nav>
        </div>

        {/* Right Action Icons: Search, Favorites, Theme, Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Install App Button (Desktop) */}
          {!isInstalled && (
            <button
              onClick={() => setInstallModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-all cursor-pointer group"
              aria-label="Install Chroma Studio App"
              title="Install Chroma Studio as a standalone app"
            >
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Install App</span>
            </button>
          )}

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs transition-all cursor-pointer group"
            aria-label="Quick Search"
          >
            <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400 font-sans">Quick search...</span>
            <span className="hidden md:inline font-mono text-[10px] bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
              ⌘K
            </span>
          </button>

          {/* Favorites Button with Badge */}
          <button
            onClick={() => handleNavClick('favorites')}
            className={`relative p-1.5 sm:p-2 rounded-xl transition-all border ${
              activeTab === 'favorites'
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10'
            }`}
            title="Saved Favorites"
            aria-label="View Saved Colors & Palettes"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={cycleTheme}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
            title={`Current theme: ${theme}. Click to switch.`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
            {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {theme === 'system' && <Monitor className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F1017] p-4 max-h-[85vh] overflow-y-auto space-y-3 custom-scroll shadow-xl">
          {!isInstalled && (
            <button
              onClick={() => {
                setInstallModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install Chroma Studio App</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
            <button
              onClick={() => handleNavClick('explore')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${
                activeTab === 'explore' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200'
              }`}
            >
              Explore Colors
            </button>
            <button
              onClick={() => handleNavClick('palettes')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${
                activeTab === 'palettes' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200'
              }`}
            >
              Palettes
            </button>
            <button
              onClick={() => handleNavClick('gradients')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${
                activeTab === 'gradients' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200'
              }`}
            >
              Gradients
            </button>
            <button
              onClick={() => handleNavClick('learn')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${
                activeTab === 'learn' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200'
              }`}
            >
              Color Theory
            </button>
            <button
              onClick={() => handleNavClick('developer')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left ${
                activeTab === 'developer' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200'
              }`}
            >
              Developer Tools
            </button>
            <button
              onClick={() => handleNavClick('favorites')}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between ${
                activeTab === 'favorites' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200'
              }`}
            >
              <span>Favorites</span>
              <span className="font-mono text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full">
                {favoritesCount}
              </span>
            </button>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Color Tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {toolsList.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleNavClick(tool.id)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-colors ${
                    activeTab === tool.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:text-indigo-700 dark:active:text-indigo-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="p-1 rounded bg-slate-100 dark:bg-white/5 shrink-0">{tool.icon}</div>
                  <span>{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDevModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md"
            >
              About Developer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
