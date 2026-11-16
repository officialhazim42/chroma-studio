import { ColorData, Palette, Gradient, SavedItem } from '../types/color';

const STORAGE_KEYS = {
  THEME: 'chroma_theme_preference',
  FAVORITES: 'chroma_saved_favorites_v1',
  RECENT_COLORS: 'chroma_recent_colors',
};

export type ThemeMode = 'light' | 'dark' | 'system';

export function getStoredTheme(): ThemeMode {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.THEME);
    if (item === 'light' || item === 'dark' || item === 'system') {
      return item;
    }
  } catch (e) {
    console.error('LocalStorage error reading theme:', e);
  }
  return 'dark'; // Default premium dark theme
}

export function setStoredTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, mode);
  } catch (e) {
    console.error('LocalStorage error writing theme:', e);
  }
}

export function getStoredFavorites(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('LocalStorage error reading favorites:', e);
  }
  return [];
}

export function saveFavorites(items: SavedItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(items));
  } catch (e) {
    console.error('LocalStorage error saving favorites:', e);
  }
}

export function addFavorite(type: 'color' | 'palette' | 'gradient', name: string, data: ColorData | Palette | Gradient): SavedItem[] {
  const current = getStoredFavorites();
  const id = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const newItem: SavedItem = {
    id,
    type,
    name,
    data,
    createdAt: Date.now(),
  };
  const updated = [newItem, ...current];
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(id: string): SavedItem[] {
  const current = getStoredFavorites();
  const updated = current.filter((item) => item.id !== id);
  saveFavorites(updated);
  return updated;
}

export function isColorFavorited(hex: string): boolean {
  const current = getStoredFavorites();
  return current.some(
    (item) => item.type === 'color' && (item.data as ColorData).hex?.toLowerCase() === hex.toLowerCase()
  );
}

export function isPaletteFavorited(paletteIdOrName: string): boolean {
  const current = getStoredFavorites();
  return current.some(
    (item) =>
      item.type === 'palette' &&
      ((item.data as Palette).id === paletteIdOrName || (item.data as Palette).name === paletteIdOrName)
  );
}

export function getRecentColors(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_COLORS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('LocalStorage error reading recent colors:', e);
  }
  return ['#6366F1', '#EC4899', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'];
}

export function addRecentColor(hex: string): string[] {
  try {
    const clean = hex.toUpperCase();
    const current = getRecentColors();
    const filtered = current.filter((c) => c !== clean);
    const updated = [clean, ...filtered].slice(0, 16);
    localStorage.setItem(STORAGE_KEYS.RECENT_COLORS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('LocalStorage error updating recent colors:', e);
    return [];
  }
}

export function exportFavoritesJson(): string {
  const favorites = getStoredFavorites();
  return JSON.stringify(
    {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      generator: 'Chroma Studio (chroma-studio.local)',
      favorites,
    },
    null,
    2
  );
}

export function importFavoritesJson(jsonStr: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    const items = parsed.favorites || parsed;
    if (!Array.isArray(items)) {
      return { success: false, count: 0, error: 'Invalid JSON format: missing array of favorites.' };
    }

    const current = getStoredFavorites();
    const existingIds = new Set(current.map((i) => i.id));
    const toAdd: SavedItem[] = [];

    for (const item of items) {
      if (item && item.type && item.name && item.data) {
        if (!existingIds.has(item.id)) {
          toAdd.push({
            id: item.id || `imp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            type: item.type,
            name: item.name,
            data: item.data,
            createdAt: item.createdAt || Date.now(),
          });
        }
      }
    }

    const updated = [...toAdd, ...current];
    saveFavorites(updated);
    return { success: true, count: toAdd.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || 'Failed to parse JSON file' };
  }
}

export function clearAllFavorites(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
  } catch (e) {
    console.error('LocalStorage error clearing favorites:', e);
  }
}
