import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingDeveloperButton } from './components/layout/FloatingDeveloperButton';
import { BackToTopButton } from './components/layout/BackToTopButton';
import { Breadcrumb, BreadcrumbItem } from './components/layout/Breadcrumb';
import { ToastContainer, ToastMessage } from './components/ui/Toast';

// Modals - Lazy loaded on user interaction
const DeveloperModal = lazy(() => import('./components/layout/DeveloperModal').then((m) => ({ default: m.DeveloperModal })));
const QuickSearchModal = lazy(() => import('./components/layout/QuickSearchModal').then((m) => ({ default: m.QuickSearchModal })));

// Homepage Components - Kept synchronous for instant first paint
import { Hero } from './components/home/Hero';
import { QuickAccess } from './components/home/QuickAccess';
import { FamilyBrowser } from './components/home/FamilyBrowser';
import { FeaturedPalettes } from './components/home/FeaturedPalettes';
import { PopularColors } from './components/home/PopularColors';
import { FeaturedTools } from './components/home/FeaturedTools';

// Views - Lazy loaded
const ExploreView = lazy(() => import('./components/views/ExploreView').then((m) => ({ default: m.ExploreView })));
const ColorDetailView = lazy(() => import('./components/views/ColorDetailView').then((m) => ({ default: m.ColorDetailView })));
const PalettesView = lazy(() => import('./components/views/PalettesView').then((m) => ({ default: m.PalettesView })));
const GradientsView = lazy(() => import('./components/views/GradientsView').then((m) => ({ default: m.GradientsView })));
const FavoritesView = lazy(() => import('./components/views/FavoritesView').then((m) => ({ default: m.FavoritesView })));
const LearnView = lazy(() => import('./components/views/LearnView').then((m) => ({ default: m.LearnView })));
const DeveloperView = lazy(() => import('./components/views/DeveloperView').then((m) => ({ default: m.DeveloperView })));
const AboutView = lazy(() => import('./components/views/AboutView').then((m) => ({ default: m.AboutView })));
const AboutChromaStudioView = lazy(() => import('./components/views/AboutChromaStudioView').then((m) => ({ default: m.AboutChromaStudioView })));
const LegalCenterView = lazy(() => import('./components/views/LegalCenterView').then((m) => ({ default: m.LegalCenterView })));
const TermsView = lazy(() => import('./components/views/legal/TermsView').then((m) => ({ default: m.TermsView })));
const PrivacyView = lazy(() => import('./components/views/legal/PrivacyView').then((m) => ({ default: m.PrivacyView })));
const CookiePolicyView = lazy(() => import('./components/views/legal/CookiePolicyView').then((m) => ({ default: m.CookiePolicyView })));
const DisclaimerView = lazy(() => import('./components/views/legal/DisclaimerView').then((m) => ({ default: m.DisclaimerView })));
const AcceptableUseView = lazy(() => import('./components/views/legal/AcceptableUseView').then((m) => ({ default: m.AcceptableUseView })));
const IntellectualPropertyView = lazy(() => import('./components/views/legal/IntellectualPropertyView').then((m) => ({ default: m.IntellectualPropertyView })));
const AccessibilityView = lazy(() => import('./components/views/legal/AccessibilityView').then((m) => ({ default: m.AccessibilityView })));
const LicensesView = lazy(() => import('./components/views/legal/LicensesView').then((m) => ({ default: m.LicensesView })));
const ContactView = lazy(() => import('./components/views/legal/ContactView').then((m) => ({ default: m.ContactView })));

// 10 Color Tools - Lazy loaded
const ColorPickerTool = lazy(() => import('./components/tools/ColorPickerTool').then((m) => ({ default: m.ColorPickerTool })));
const ColorConverterTool = lazy(() => import('./components/tools/ColorConverterTool').then((m) => ({ default: m.ColorConverterTool })));
const ImagePickerTool = lazy(() => import('./components/tools/ImagePickerTool').then((m) => ({ default: m.ImagePickerTool })));
const PaletteGeneratorTool = lazy(() => import('./components/tools/PaletteGeneratorTool').then((m) => ({ default: m.PaletteGeneratorTool })));
const ContrastCheckerTool = lazy(() => import('./components/tools/ContrastCheckerTool').then((m) => ({ default: m.ContrastCheckerTool })));
const GradientGeneratorTool = lazy(() => import('./components/tools/GradientGeneratorTool').then((m) => ({ default: m.GradientGeneratorTool })));
const ShadesTintsTool = lazy(() => import('./components/tools/ShadesTintsTool').then((m) => ({ default: m.ShadesTintsTool })));
const ColorMixerTool = lazy(() => import('./components/tools/ColorMixerTool').then((m) => ({ default: m.ColorMixerTool })));
const BlindnessSimulatorTool = lazy(() => import('./components/tools/BlindnessSimulatorTool').then((m) => ({ default: m.BlindnessSimulatorTool })));
const CssExporterTool = lazy(() => import('./components/tools/CssExporterTool').then((m) => ({ default: m.CssExporterTool })));
const ToolGuideSection = lazy(() => import('./components/tools/ToolGuideSection').then((m) => ({ default: m.ToolGuideSection })));
import { TOOL_GUIDES } from './components/tools/toolGuidesData';

// PWA Components
import { InstallModal } from './components/pwa/InstallModal';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';
import { UpdateBanner } from './components/pwa/UpdateBanner';

// Utilities & Storage
import {
  ActiveTab,
  ColorFamily,
  Palette as PaletteType,
  GradientStop,
  SavedItem,
} from './types/color';
import {
  getStoredTheme,
  setStoredTheme,
  ThemeMode,
  getStoredFavorites,
  addFavorite,
  removeFavorite,
  clearAllFavorites,
  isColorFavorited,
  isPaletteFavorited,
} from './utils/storage';
import { getColorData } from './utils/colorEngine';
import { updateRouteSEO } from './utils/seo';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedHex, setSelectedHex] = useState<string>('#6366F1');
  const [exploreFamily, setExploreFamily] = useState<ColorFamily | null>(null);
  const [learnTopic, setLearnTopic] = useState<string>('hex');

  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());
  const [favorites, setFavorites] = useState<SavedItem[]>(() => getStoredFavorites());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [devModalOpen, setDevModalOpen] = useState(false);

  // Dynamic Route SEO (Document title, meta description, canonical, OG tags)
  useEffect(() => {
    updateRouteSEO(activeTab, selectedHex);
  }, [activeTab, selectedHex]);

  // Hybrid Hash & Path SPA routing synchronization
  useEffect(() => {
    const parseRoute = () => {
      // 1. Inspect hash first (e.g. #/about-chroma-studio or #palettes)
      let rawRoute = window.location.hash.replace(/^#\/?/, '');

      // 2. Fall back to pathname for direct navigation & page refresh (e.g. /about-chroma-studio)
      if (!rawRoute && window.location.pathname && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        rawRoute = window.location.pathname.replace(/^\/+/, '');
      }

      if (!rawRoute) {
        setActiveTab('home');
        return;
      }

      const parts = rawRoute.split('/');
      const section = parts[0].toLowerCase();
      const param = parts[1];

      if (section === 'color' && param) {
        setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('color-detail');
      } else if (section === 'explore') {
        setActiveTab('explore');
      } else if (section === 'tools') {
        if (param === 'converter' || param === 'tool-converter') setActiveTab('tool-converter');
        else if (param === 'image' || param === 'tool-image' || param === 'image-picker') setActiveTab('tool-image');
        else if (param === 'palette' || param === 'tool-palette' || param === 'palette-generator') setActiveTab('tool-palette');
        else if (param === 'contrast' || param === 'tool-contrast' || param === 'contrast-checker') setActiveTab('tool-contrast');
        else if (param === 'gradient' || param === 'tool-gradient' || param === 'gradient-generator') setActiveTab('tool-gradient');
        else if (param === 'shades' || param === 'tool-shades' || param === 'shades-tints') setActiveTab('tool-shades');
        else if (param === 'mixer' || param === 'tool-mixer' || param === 'color-mixer') setActiveTab('tool-mixer');
        else if (param === 'blindness' || param === 'tool-blindness' || param === 'blindness-simulator') setActiveTab('tool-blindness');
        else if (param === 'exporter' || param === 'tool-exporter' || param === 'css-exporter') setActiveTab('tool-exporter');
        else setActiveTab('tool-picker');
      } else if (section === 'palettes') {
        setActiveTab('palettes');
      } else if (section === 'gradients') {
        setActiveTab('gradients');
      } else if (section === 'learn') {
        if (param) setLearnTopic(param);
        setActiveTab('learn');
      } else if (section === 'developer' || section === 'about-developer') {
        setActiveTab('developer');
      } else if (section === 'favorites') {
        setActiveTab('favorites');
      } else if (section === 'about') {
        setActiveTab('about');
      } else if (section === 'about-chroma-studio') {
        setActiveTab('about-chroma-studio');
      } else if (section === 'legal' || section === 'legal-center') {
        if (param === 'terms') setActiveTab('terms');
        else if (param === 'privacy') setActiveTab('privacy');
        else if (param === 'cookies') setActiveTab('cookies');
        else if (param === 'disclaimer') setActiveTab('disclaimer');
        else if (param === 'acceptable-use') setActiveTab('acceptable-use');
        else if (param === 'intellectual-property') setActiveTab('intellectual-property');
        else if (param === 'accessibility') setActiveTab('accessibility');
        else if (param === 'licenses') setActiveTab('licenses');
        else if (param === 'contact') setActiveTab('contact');
        else setActiveTab('legal');
      } else if (section === 'terms') {
        setActiveTab('terms');
      } else if (section === 'privacy') {
        setActiveTab('privacy');
      } else if (section === 'cookies') {
        setActiveTab('cookies');
      } else if (section === 'disclaimer') {
        setActiveTab('disclaimer');
      } else if (section === 'acceptable-use') {
        setActiveTab('acceptable-use');
      } else if (section === 'intellectual-property') {
        setActiveTab('intellectual-property');
      } else if (section === 'accessibility') {
        setActiveTab('accessibility');
      } else if (section === 'licenses') {
        setActiveTab('licenses');
      } else if (section === 'contact') {
        setActiveTab('contact');
      } else if (section === 'tool-picker' || section === 'picker') {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('tool-picker');
      } else if (section === 'tool-converter' || section === 'converter') {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('tool-converter');
      } else if (section === 'tool-image' || section === 'tool-image-picker' || section === 'image-picker') {
        setActiveTab('tool-image');
      } else if (section === 'tool-palette' || section === 'tool-palette-generator' || section === 'palette-generator') {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('tool-palette');
      } else if (section === 'tool-contrast' || section === 'tool-contrast-checker' || section === 'contrast-checker') {
        setActiveTab('tool-contrast');
      } else if (section === 'tool-gradient' || section === 'tool-gradient-generator' || section === 'gradient-generator') {
        setActiveTab('tool-gradient');
      } else if (section === 'tool-shades' || section === 'tool-shades-tints' || section === 'shades-tints') {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('tool-shades');
      } else if (section === 'tool-mixer' || section === 'tool-color-mixer' || section === 'color-mixer') {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('tool-mixer');
      } else if (section === 'tool-blindness' || section === 'tool-blindness-simulator' || section === 'blindness-simulator') {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab('tool-blindness');
      } else if (section === 'tool-exporter' || section === 'tool-css-exporter' || section === 'css-exporter') {
        setActiveTab('tool-exporter');
      } else if (section.startsWith('tool-')) {
        if (param) setSelectedHex(param.startsWith('#') ? param : `#${param}`);
        setActiveTab(section as ActiveTab);
      } else {
        setActiveTab('home');
      }
    };

    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    window.addEventListener('popstate', parseRoute);
    return () => {
      window.removeEventListener('hashchange', parseRoute);
      window.removeEventListener('popstate', parseRoute);
    };
  }, []);

  const navigateTo = useCallback((tab: ActiveTab, param?: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let hash = '';
    if (tab === 'home') hash = '';
    else if (tab === 'color-detail') {
      const hex = param ? (param.startsWith('#') ? param.slice(1) : param) : selectedHex.slice(1);
      if (param) setSelectedHex(param);
      hash = `color/${hex}`;
    } else if (tab === 'explore') {
      hash = 'explore';
    } else if (tab === 'tools') {
      hash = 'tool-picker';
    } else if (tab === 'palettes') {
      hash = 'palettes';
    } else if (tab === 'gradients') {
      hash = 'gradients';
    } else if (tab === 'learn') {
      if (param) setLearnTopic(param);
      hash = param ? `learn/${param}` : 'learn';
    } else if (tab === 'developer') {
      hash = 'developer';
    } else if (tab === 'favorites') {
      hash = 'favorites';
    } else if (tab === 'about') {
      hash = 'about';
    } else if (tab === 'about-chroma-studio') {
      hash = 'about-chroma-studio';
    } else if (tab === 'legal') {
      hash = 'legal';
    } else if (tab === 'terms') {
      hash = 'terms';
    } else if (tab === 'privacy') {
      hash = 'privacy';
    } else if (tab === 'cookies') {
      hash = 'cookies';
    } else if (tab === 'disclaimer') {
      hash = 'disclaimer';
    } else if (tab === 'acceptable-use') {
      hash = 'acceptable-use';
    } else if (tab === 'intellectual-property') {
      hash = 'intellectual-property';
    } else if (tab === 'accessibility') {
      hash = 'accessibility';
    } else if (tab === 'licenses') {
      hash = 'licenses';
    } else if (tab === 'contact') {
      hash = 'contact';
    } else if (tab.startsWith('tool-')) {
      if (param) {
        setSelectedHex(param);
        hash = `${tab}/${param.replace('#', '')}`;
      } else {
        hash = tab;
      }
    }

    window.history.pushState(null, '', `#/${hash}`);
  }, [selectedHex]);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K for Quick Search)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Theme application
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isSystemDark) {
        root.classList.remove('light');
        root.classList.add('dark');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  // Dynamic Document Title based on active route
  useEffect(() => {
    const titles: Record<ActiveTab, string> = {
      'home': 'Chroma Studio - Color Intelligence Suite & Palette Workspace',
      'explore': 'Explore Colors - Chroma Studio',
      'color-detail': `Color ${selectedHex.toUpperCase()} - Chroma Studio`,
      'tools': 'Color Tools & Utilities - Chroma Studio',
      'palettes': 'Curated Palettes - Chroma Studio',
      'gradients': 'Gradient Library - Chroma Studio',
      'favorites': 'Saved Favorites - Chroma Studio',
      'learn': 'Color Theory & Guide - Chroma Studio',
      'developer': 'Developer Code Hub - Chroma Studio',
      'about': 'About Developer - Chroma Studio',
      'about-chroma-studio': 'About Chroma Studio - Color Intelligence Suite',
      'tool-picker': 'Color Picker - Chroma Studio',
      'tool-converter': 'Color Converter - Chroma Studio',
      'tool-image': 'Image Color Extractor - Chroma Studio',
      'tool-palette': 'Palette Generator - Chroma Studio',
      'tool-contrast': 'WCAG Contrast Checker - Chroma Studio',
      'tool-gradient': 'Gradient Generator - Chroma Studio',
      'tool-shades': 'Shades & Tints Generator - Chroma Studio',
      'tool-mixer': 'Color Mixer - Chroma Studio',
      'tool-blindness': 'Color Blindness Simulator - Chroma Studio',
      'tool-exporter': 'CSS & Code Exporter - Chroma Studio',
      'legal': 'Legal & Information Center - Chroma Studio',
      'terms': 'Terms & Conditions - Chroma Studio',
      'privacy': 'Privacy Policy - Chroma Studio',
      'cookies': 'Cookie Policy - Chroma Studio',
      'disclaimer': 'Technical & Color Disclaimer - Chroma Studio',
      'acceptable-use': 'Acceptable Use Policy - Chroma Studio',
      'intellectual-property': 'Intellectual Property Policy - Chroma Studio',
      'accessibility': 'Accessibility Statement - Chroma Studio',
      'licenses': 'Open Source Licenses & Credits - Chroma Studio',
      'contact': 'Contact & Support - Chroma Studio',
    };

    document.title = titles[activeTab] || 'Chroma Studio - Color Intelligence Suite';
  }, [activeTab, selectedHex]);

  // Toast notifications
  const showToast = useCallback((title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Favorites Handlers
  const handleToggleColorFavorited = useCallback((hex: string) => {
    const colorData = getColorData(hex);
    if (isColorFavorited(hex)) {
      const existing = favorites.find(
        (f) => f.type === 'color' && (f.data as any).hex?.toLowerCase() === hex.toLowerCase()
      );
      if (existing) {
        const updated = removeFavorite(existing.id);
        setFavorites(updated);
        showToast('Removed from favorites', hex, 'info');
      }
    } else {
      const updated = addFavorite('color', colorData.name, colorData);
      setFavorites(updated);
      showToast('Saved to favorites!', hex, 'success');
    }
  }, [favorites, showToast]);

  const handleTogglePaletteFavorited = useCallback((palette: PaletteType) => {
    if (isPaletteFavorited(palette.id) || isPaletteFavorited(palette.name)) {
      const existing = favorites.find(
        (f) =>
          f.type === 'palette' &&
          ((f.data as any).id === palette.id || (f.data as any).name === palette.name)
      );
      if (existing) {
        const updated = removeFavorite(existing.id);
        setFavorites(updated);
        showToast('Removed palette from favorites', palette.name, 'info');
      }
    } else {
      const updated = addFavorite('palette', palette.name, palette);
      setFavorites(updated);
      showToast('Saved palette to favorites!', palette.name, 'success');
    }
  }, [favorites, showToast]);

  const handleSaveGradient = useCallback((name: string, css: string, stops: GradientStop[]) => {
    const gradData = { id: `grad_${Date.now()}`, name, type: 'linear' as const, angle: 135, stops, css };
    const updated = addFavorite('gradient', name, gradData);
    setFavorites(updated);
    showToast('Saved gradient to favorites!', name, 'success');
  }, [showToast]);

  const handleSaveCustomPalette = useCallback((name: string, colors: string[]) => {
    const paletteData: PaletteType = {
      id: `custom_${Date.now()}`,
      name,
      category: 'Bespoke',
      colors,
    };
    const updated = addFavorite('palette', name, paletteData);
    setFavorites(updated);
    showToast('Saved custom palette!', name, 'success');
  }, [showToast]);

  const handleRemoveFavorite = useCallback((id: string) => {
    const updated = removeFavorite(id);
    setFavorites(updated);
    showToast('Removed item', undefined, 'info');
  }, [showToast]);

  const handleClearAllFavorites = useCallback(() => {
    clearAllFavorites();
    setFavorites([]);
    showToast('Cleared all favorites', undefined, 'info');
  }, [showToast]);

  const handleReloadFavorites = useCallback(() => {
    setFavorites(getStoredFavorites());
  }, []);

  const getBreadcrumbItems = (tab: ActiveTab, hex?: string): BreadcrumbItem[] => {
    const toolNames: Record<string, string> = {
      'tool-picker': 'Color Picker',
      'tool-converter': 'Color Converter',
      'tool-image': 'Image Color Extractor',
      'tool-palette': 'Palette Generator',
      'tool-contrast': 'WCAG Contrast Checker',
      'tool-gradient': 'Gradient Generator',
      'tool-shades': 'Shades & Tints',
      'tool-mixer': 'Color Mixer',
      'tool-blindness': 'Blindness Simulator',
      'tool-exporter': 'CSS Exporter',
    };

    const legalNames: Record<string, string> = {
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      disclaimer: 'Technical Disclaimer',
      'acceptable-use': 'Acceptable Use Policy',
      'intellectual-property': 'Intellectual Property',
      accessibility: 'Accessibility Statement',
      licenses: 'Open Source Licenses',
      contact: 'Contact & Support',
    };

    if (tab.startsWith('tool-') && toolNames[tab]) {
      return [
        { label: 'Tools', tab: 'tool-picker', href: '/tools/picker' },
        { label: toolNames[tab] },
      ];
    }

    if (legalNames[tab]) {
      return [
        { label: 'Legal Center', tab: 'legal', href: '/legal' },
        { label: legalNames[tab] },
      ];
    }

    if (tab === 'legal') return [{ label: 'Legal Center' }];
    if (tab === 'color-detail') {
      return [
        { label: 'Explore Colors', tab: 'explore', href: '/explore' },
        { label: hex ? hex.toUpperCase() : 'Color Details' },
      ];
    }
    if (tab === 'explore') return [{ label: 'Explore Colors' }];
    if (tab === 'palettes') return [{ label: 'Curated Palettes' }];
    if (tab === 'gradients') return [{ label: 'Gradients' }];
    if (tab === 'learn') return [{ label: 'Color Theory & Guide' }];
    if (tab === 'developer') return [{ label: 'Developer Code Hub' }];
    if (tab === 'about') return [{ label: 'About Developer' }];
    if (tab === 'about-chroma-studio') return [{ label: 'About Chroma Studio' }];
    if (tab === 'favorites') return [{ label: 'Saved Favorites' }];

    return [];
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={navigateTo}
        favoritesCount={favorites.length}
        theme={theme}
        onThemeChange={handleThemeChange}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenDevModal={() => setDevModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* Semantic Breadcrumbs for deep navigation */}
        {activeTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Breadcrumb items={getBreadcrumbItems(activeTab, selectedHex)} onNavigate={navigateTo} />
          </div>
        )}

        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              <span className="text-xs text-slate-500 font-mono">Loading Chroma Studio...</span>
            </div>
          }
        >
          {/* 1. HOMEPAGE */}
          {activeTab === 'home' && (
            <>
              <Hero
                onNavigate={navigateTo}
                onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              />
              <QuickAccess onNavigate={navigateTo} />
              <FamilyBrowser
                onSelectFamily={(fam) => {
                  setExploreFamily(fam);
                  navigateTo('explore');
                }}
                onNavigate={navigateTo}
              />
              <FeaturedPalettes
                onNavigate={navigateTo}
                onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
                isFavorited={(id) => isPaletteFavorited(id)}
                onToggleFavorite={handleTogglePaletteFavorited}
              />
              <PopularColors
                onNavigate={navigateTo}
                isColorFavorited={isColorFavorited}
                onToggleFavorite={handleToggleColorFavorited}
              />
              <FeaturedTools onNavigate={navigateTo} />
            </>
          )}

          {/* 2. EXPLORE VIEW */}
          {activeTab === 'explore' && (
            <ExploreView
              onNavigate={navigateTo}
              isColorFavorited={isColorFavorited}
              onToggleFavorite={handleToggleColorFavorited}
              initialFamily={exploreFamily}
            />
          )}

          {/* 3. COLOR DETAIL VIEW */}
          {activeTab === 'color-detail' && (
            <ColorDetailView
              hex={selectedHex}
              onNavigate={navigateTo}
              isColorFavorited={isColorFavorited}
              onToggleFavorite={handleToggleColorFavorited}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
            />
          )}

          {/* 4. PALETTES VIEW */}
          {activeTab === 'palettes' && (
            <PalettesView
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              isFavorited={(id) => isPaletteFavorited(id)}
              onToggleFavorite={handleTogglePaletteFavorited}
            />
          )}

          {/* 5. GRADIENTS VIEW */}
          {activeTab === 'gradients' && (
            <GradientsView
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              onSaveGradient={handleSaveGradient}
            />
          )}

          {/* 6. FAVORITES VIEW */}
          {activeTab === 'favorites' && (
            <FavoritesView
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
              onClearAllFavorites={handleClearAllFavorites}
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              onReloadFavorites={handleReloadFavorites}
            />
          )}

          {/* 7. LEARN VIEW */}
          {activeTab === 'learn' && (
            <LearnView onNavigate={navigateTo} initialTopic={learnTopic} />
          )}

          {/* 8. DEVELOPER VIEW */}
          {activeTab === 'developer' && (
            <DeveloperView
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
            />
          )}

          {/* 9. ABOUT DEVELOPER VIEW */}
          {activeTab === 'about' && <AboutView />}

          {/* 10. ABOUT CHROMA STUDIO VIEW */}
          {activeTab === 'about-chroma-studio' && (
            <AboutChromaStudioView onNavigate={navigateTo} />
          )}

          {/* 10 TOOLS */}
          {activeTab === 'tool-picker' && (
            <ColorPickerTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              isColorFavorited={isColorFavorited}
              onToggleFavorite={handleToggleColorFavorited}
              initialHex={selectedHex}
            />
          )}

          {activeTab === 'tool-converter' && (
            <ColorConverterTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              initialHex={selectedHex}
            />
          )}

          {activeTab === 'tool-image' && (
            <ImagePickerTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              onToggleFavorite={handleToggleColorFavorited}
              isColorFavorited={isColorFavorited}
              onSavePalette={handleSaveCustomPalette}
            />
          )}

          {activeTab === 'tool-palette' && (
            <PaletteGeneratorTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              onSavePalette={handleSaveCustomPalette}
              initialHex={selectedHex}
            />
          )}

          {activeTab === 'tool-contrast' && (
            <ContrastCheckerTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              initialFg="#FFFFFF"
              initialBg={selectedHex}
            />
          )}

          {activeTab === 'tool-gradient' && (
            <GradientGeneratorTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              onSaveGradient={handleSaveGradient}
            />
          )}

          {activeTab === 'tool-shades' && (
            <ShadesTintsTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              initialHex={selectedHex}
            />
          )}

          {activeTab === 'tool-mixer' && (
            <ColorMixerTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              initialColor1={selectedHex}
            />
          )}

          {activeTab === 'tool-blindness' && (
            <BlindnessSimulatorTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
              initialHex={selectedHex}
            />
          )}

          {activeTab === 'tool-exporter' && (
            <CssExporterTool
              onNavigate={navigateTo}
              onCopySuccess={(text) => showToast('Copied to clipboard!', text)}
            />
          )}

          {/* Rich SEO & Educational Guide for the 10 Color Tools */}
          {activeTab.startsWith('tool-') && TOOL_GUIDES[activeTab] && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <ToolGuideSection {...TOOL_GUIDES[activeTab]} onNavigate={navigateTo} />
            </div>
          )}

          {/* Legal & Information Center Views */}
          {activeTab === 'legal' && <LegalCenterView onNavigate={navigateTo} />}
          {activeTab === 'terms' && <TermsView onNavigate={navigateTo} />}
          {activeTab === 'privacy' && <PrivacyView onNavigate={navigateTo} />}
          {activeTab === 'cookies' && <CookiePolicyView onNavigate={navigateTo} />}
          {activeTab === 'disclaimer' && <DisclaimerView onNavigate={navigateTo} />}
          {activeTab === 'acceptable-use' && <AcceptableUseView onNavigate={navigateTo} />}
          {activeTab === 'intellectual-property' && <IntellectualPropertyView onNavigate={navigateTo} />}
          {activeTab === 'accessibility' && <AccessibilityView onNavigate={navigateTo} />}
          {activeTab === 'licenses' && <LicensesView onNavigate={navigateTo} />}
          {activeTab === 'contact' && <ContactView onNavigate={navigateTo} />}
        </Suspense>
      </main>

      {/* Footer with subtle attribution & 10 social links */}
      <Footer
        onNavigate={navigateTo}
        onOpenDevModal={() => setDevModalOpen(true)}
      />

      {/* Floating Developer Button (Bottom Left) */}
      <FloatingDeveloperButton
        onClick={() => setDevModalOpen(true)}
        isModalOpen={devModalOpen}
      />

      {/* Floating Back to Top Button (Bottom Right) */}
      <BackToTopButton />

      {/* Developer Profile Modal */}
      <Suspense fallback={null}>
        {devModalOpen && (
          <DeveloperModal
            isOpen={devModalOpen}
            onClose={() => setDevModalOpen(false)}
          />
        )}
      </Suspense>

      {/* Global Quick Search Modal (Ctrl/Cmd + K) */}
      <Suspense fallback={null}>
        {searchModalOpen && (
          <QuickSearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNavigate={navigateTo}
          />
        )}
      </Suspense>

      {/* PWA Lifecycle & Installation Experience */}
      <InstallModal />
      <OfflineIndicator />
      <UpdateBanner />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
