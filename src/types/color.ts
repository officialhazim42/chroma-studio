export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLA extends HSL {
  a: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorData {
  hex: string;
  rgb: RGB;
  rgba: RGBA;
  hsl: HSL;
  hsla: HSLA;
  hsv: HSV;
  cmyk: CMYK;
  cssRgb: string;
  cssRgba: string;
  cssHsl: string;
  cssHsla: string;
  name: string;
  luminance: number;
  isDark: boolean;
  contrastWhite: number;
  contrastBlack: number;
}

export interface WCAGScore {
  ratio: number;
  ratioFormatted: string;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  uiComponents: boolean;
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
}

export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'tetradic'
  | 'split-complementary'
  | 'monochromatic';

export interface Palette {
  id: string;
  name: string;
  category: string;
  colors: string[];
  tags?: string[];
  likes?: number;
}

export interface GradientStop {
  color: string;
  position: number; // 0 to 100
}

export interface Gradient {
  id: string;
  name: string;
  type: 'linear' | 'radial' | 'conic';
  angle: number; // degrees for linear/conic
  radialShape?: 'circle' | 'ellipse';
  radialPosition?: string;
  stops: GradientStop[];
  css: string;
}

export type ColorBlindnessType =
  | 'normal'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia';

export interface SavedItem {
  id: string;
  type: 'color' | 'palette' | 'gradient';
  name: string;
  data: ColorData | Palette | Gradient;
  createdAt: number;
}

export type ActiveTab =
  | 'home'
  | 'explore'
  | 'color-detail'
  | 'tools'
  | 'tool-picker'
  | 'tool-converter'
  | 'tool-image'
  | 'tool-palette'
  | 'tool-contrast'
  | 'tool-gradient'
  | 'tool-shades'
  | 'tool-mixer'
  | 'tool-blindness'
  | 'tool-exporter'
  | 'palettes'
  | 'gradients'
  | 'learn'
  | 'developer'
  | 'favorites'
  | 'about'
  | 'about-chroma-studio'
  | 'legal'
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'disclaimer'
  | 'acceptable-use'
  | 'intellectual-property'
  | 'accessibility'
  | 'licenses'
  | 'contact';

export type ColorFamily =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'gray'
  | 'black'
  | 'white';
