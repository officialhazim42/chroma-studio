import {
  RGB,
  RGBA,
  HSL,
  HSLA,
  HSV,
  CMYK,
  ColorData,
  WCAGScore,
  HarmonyType,
  ColorBlindnessType,
  ColorFamily,
} from '../types/color';
import { findNearestColorName } from './colorDataset';

/**
 * Normalizes any hex string into standard 6-character hex with '#'
 */
export function normalizeHex(hex: string): string {
  let clean = hex.replace(/[^0-9a-fA-F]/g, '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  } else if (clean.length > 6) {
    clean = clean.substring(0, 6);
  } else if (clean.length < 6) {
    clean = clean.padEnd(6, '0');
  }
  return `#${clean.toUpperCase()}`;
}

export function isValidHex(hex: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hex.trim());
}

/**
 * Strict standard HEX color validation (3 or 6 hex characters with optional '#')
 * Supports: #FFF, #FFFFFF, 000000, #12ABEF
 * Rejects: #ZZZ, #12G, #12345, empty strings
 */
export function isValidHexColor(hex: string): boolean {
  if (!hex) return false;
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim());
}

export const HEX_VALIDATION_ERROR = 'Enter a valid HEX color.';

export function hexToRgb(hex: string): RGB {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(clean.substring(0, 6), 16);
  if (isNaN(num)) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const baseHex = rgbToHex(r, g, b);
  const alphaVal = Math.min(255, Math.max(0, Math.round(a * 255)));
  const alphaHex = alphaVal.toString(16).padStart(2, '0').toUpperCase();
  return `${baseHex}${alphaHex}`;
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

export function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  v = Math.max(0, Math.min(100, v)) / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const k = 1 - Math.max(r1, g1, b1);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - r1 - k) / (1 - k);
  const m = (1 - g1 - k) / (1 - k);
  const y = (1 - b1 - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb(c: number, m: number, y: number, k: number): RGB {
  c = Math.max(0, Math.min(100, c)) / 100;
  m = Math.max(0, Math.min(100, m)) / 100;
  y = Math.max(0, Math.min(100, y)) / 100;
  k = Math.max(0, Math.min(100, k)) / 100;

  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

/**
 * Calculates WCAG 2.1 relative luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates WCAG contrast ratio between two colors
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getWCAGScore(fgHex: string, bgHex: string): WCAGScore {
  const ratio = getContrastRatio(fgHex, bgHex);
  const rounded = Math.round(ratio * 100) / 100;

  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;
  const aaaLarge = ratio >= 4.5;
  const uiComponents = ratio >= 3.0;

  let level: 'AAA' | 'AA' | 'AA Large' | 'Fail' = 'Fail';
  if (aaaNormal) {
    level = 'AAA';
  } else if (aaNormal) {
    level = 'AA';
  } else if (aaLarge) {
    level = 'AA Large';
  }

  return {
    ratio: rounded,
    ratioFormatted: `${rounded.toFixed(2)}:1`,
    aaNormal,
    aaLarge,
    aaaNormal,
    aaaLarge,
    uiComponents,
    level,
  };
}

/**
 * Generates color harmonies based on standard color wheel relations
 */
export function generateHarmonies(hex: string, type: HarmonyType): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const rotate = (angle: number): string => {
    const newH = (hsl.h + angle + 360) % 360;
    const newRgb = hslToRgb(newH, hsl.s, hsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  };

  switch (type) {
    case 'complementary':
      return [normalizeHex(hex), rotate(180)];
    case 'analogous':
      return [rotate(-30), normalizeHex(hex), rotate(30)];
    case 'triadic':
      return [normalizeHex(hex), rotate(120), rotate(240)];
    case 'tetradic':
      return [normalizeHex(hex), rotate(60), rotate(180), rotate(240)];
    case 'split-complementary':
      return [normalizeHex(hex), rotate(150), rotate(210)];
    case 'monochromatic': {
      const results: string[] = [];
      const lightnessSteps = [
        Math.max(10, hsl.l - 30),
        Math.max(15, hsl.l - 15),
        hsl.l,
        Math.min(85, hsl.l + 15),
        Math.min(95, hsl.l + 30),
      ];
      lightnessSteps.forEach((l) => {
        const c = hslToRgb(hsl.h, hsl.s, l);
        results.push(rgbToHex(c.r, c.g, c.b));
      });
      return results;
    }
    default:
      return [normalizeHex(hex)];
  }
}

/**
 * Generates Tints (mixing with pure white #ffffff)
 */
export function generateTints(hex: string, steps: number = 10): { hex: string; percent: number }[] {
  const base = hexToRgb(hex);
  const result: { hex: string; percent: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const factor = i / steps; // 0 = base, 1 = white
    const r = Math.round(base.r + (255 - base.r) * factor);
    const g = Math.round(base.g + (255 - base.g) * factor);
    const b = Math.round(base.b + (255 - base.b) * factor);
    result.push({
      hex: rgbToHex(r, g, b),
      percent: Math.round(factor * 100),
    });
  }
  return result;
}

/**
 * Generates Shades (mixing with pure black #000000)
 */
export function generateShades(hex: string, steps: number = 10): { hex: string; percent: number }[] {
  const base = hexToRgb(hex);
  const result: { hex: string; percent: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const factor = i / steps; // 0 = base, 1 = black
    const r = Math.round(base.r * (1 - factor));
    const g = Math.round(base.g * (1 - factor));
    const b = Math.round(base.b * (1 - factor));
    result.push({
      hex: rgbToHex(r, g, b),
      percent: Math.round(factor * 100),
    });
  }
  return result;
}

/**
 * Generates Tones (mixing with neutral 50% gray #808080)
 */
export function generateTones(hex: string, steps: number = 10): { hex: string; percent: number }[] {
  const base = hexToRgb(hex);
  const gray = 128;
  const result: { hex: string; percent: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const factor = i / steps; // 0 = base, 1 = gray
    const r = Math.round(base.r + (gray - base.r) * factor);
    const g = Math.round(base.g + (gray - base.g) * factor);
    const b = Math.round(base.b + (gray - base.b) * factor);
    result.push({
      hex: rgbToHex(r, g, b),
      percent: Math.round(factor * 100),
    });
  }
  return result;
}

/**
 * Mixes two colors by weight (0 = 100% c1, 1 = 100% c2)
 */
export function mixColors(
  hex1: string,
  hex2: string,
  weight: number = 0.5,
  mode: 'rgb' | 'hsl' = 'rgb'
): string {
  const w = Math.max(0, Math.min(1, weight));
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (mode === 'rgb') {
    const r = Math.round(rgb1.r * (1 - w) + rgb2.r * w);
    const g = Math.round(rgb1.g * (1 - w) + rgb2.g * w);
    const b = Math.round(rgb1.b * (1 - w) + rgb2.b * w);
    return rgbToHex(r, g, b);
  } else {
    const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
    const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);

    // Hue circular interpolation
    let dH = hsl2.h - hsl1.h;
    if (dH > 180) dH -= 360;
    if (dH < -180) dH += 360;
    const h = (hsl1.h + dH * w + 360) % 360;

    const s = hsl1.s * (1 - w) + hsl2.s * w;
    const l = hsl1.l * (1 - w) + hsl2.l * w;

    const res = hslToRgb(h, s, l);
    return rgbToHex(res.r, res.g, res.b);
  }
}

/**
 * Simulates color vision deficiency using standard LMS color transformation matrices
 */
export function simulateColorBlindness(
  r: number,
  g: number,
  b: number,
  type: ColorBlindnessType
): RGB {
  if (type === 'normal') return { r, g, b };

  // Convert sRGB to linear RGB
  const linearize = (val: number) => {
    const v = val / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const delinearize = (val: number) => {
    const v = Math.max(0, Math.min(1, val));
    const s = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    return Math.round(Math.max(0, Math.min(255, s * 255)));
  };

  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  let rSim = lr;
  let gSim = lg;
  let bSim = lb;

  switch (type) {
    case 'protanopia':
      rSim = 0.56667 * lr + 0.43333 * lg;
      gSim = 0.55833 * lr + 0.44167 * lg;
      bSim = 0.24167 * lg + 0.75833 * lb;
      break;
    case 'deuteranopia':
      rSim = 0.625 * lr + 0.375 * lg;
      gSim = 0.7 * lr + 0.3 * lg;
      bSim = 0.3 * lg + 0.7 * lb;
      break;
    case 'tritanopia':
      rSim = 0.95 * lr + 0.05 * lg;
      gSim = 0.43333 * lg + 0.56667 * lb;
      bSim = 0.475 * lg + 0.525 * lb;
      break;
    case 'achromatopsia': {
      const gray = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
      rSim = gray;
      gSim = gray;
      bSim = gray;
      break;
    }
  }

  return {
    r: delinearize(rSim),
    g: delinearize(gSim),
    b: delinearize(bSim),
  };
}

/**
 * Categorizes a color into its primary color family
 */
export function getColorFamily(r: number, g: number, b: number, h: number, s: number, l: number): ColorFamily {
  // Grayscale & luminance checks
  if (l <= 8) return 'black';
  if (l >= 94 && s <= 15) return 'white';
  if (s <= 12) return 'gray';

  // Brown check: low lightness, low-to-mid saturation, warm hues
  if (h >= 10 && h <= 45 && l <= 40 && s <= 65) return 'brown';

  // Pink check: red/purple hue with high lightness
  if ((h >= 320 || h <= 15) && l > 65 && s > 30) return 'pink';

  // Standard hue wheel ranges
  if (h >= 345 || h < 15) return 'red';
  if (h >= 15 && h < 45) return 'orange';
  if (h >= 45 && h < 70) return 'yellow';
  if (h >= 70 && h < 165) return 'green';
  if (h >= 165 && h < 260) return 'blue';
  if (h >= 260 && h < 320) return 'purple';
  if (h >= 320 && h < 345) return 'pink';

  return 'blue';
}

/**
 * Generates a full comprehensive ColorData object
 */
export function getColorData(hexInput: string, alpha: number = 1): ColorData {
  const hex = normalizeHex(hexInput);
  const rgb = hexToRgb(hex);
  const rgba: RGBA = { ...rgb, a: alpha };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsla: HSLA = { ...hsl, a: alpha };
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  const isDark = luminance < 0.2;
  const contrastWhite = getContrastRatio(hex, '#FFFFFF');
  const contrastBlack = getContrastRatio(hex, '#000000');
  const name = findNearestColorName(hex);

  return {
    hex,
    rgb,
    rgba,
    hsl,
    hsla,
    hsv,
    cmyk,
    cssRgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    cssRgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`,
    cssHsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    cssHsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha.toFixed(2)})`,
    name,
    luminance: Math.round(luminance * 1000) / 1000,
    isDark,
    contrastWhite: Math.round(contrastWhite * 100) / 100,
    contrastBlack: Math.round(contrastBlack * 100) / 100,
  };
}

/**
 * Generates a random vibrant color hex
 */
export function getRandomHex(): string {
  const h = Math.floor(Math.random() * 360);
  const s = 65 + Math.floor(Math.random() * 30); // 65-95%
  const l = 45 + Math.floor(Math.random() * 25); // 45-70%
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}
