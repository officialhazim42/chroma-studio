import { Palette } from '../types/color';

export const PALETTE_CATEGORIES = [
  'All',
  'Minimal',
  'Modern',
  'Pastel',
  'Vintage',
  'Nature',
  'Luxury',
  'Dark',
  'Neon',
  'Warm',
  'Cool',
  'Monochromatic',
  'Professional',
] as const;

export const CURATED_PALETTES: Palette[] = [
  // MINIMAL
  {
    id: 'min-1',
    name: 'Nordic Cleanse',
    category: 'Minimal',
    colors: ['#F8F9FA', '#E9ECEF', '#CED4DA', '#6C757D', '#212529'],
    tags: ['clean', 'scandinavian', 'neutral'],
    likes: 428,
  },
  {
    id: 'min-2',
    name: 'Alabaster & Charcoal',
    category: 'Minimal',
    colors: ['#FFFFFF', '#F3F4F6', '#D1D5DB', '#4B5563', '#111827'],
    tags: ['simple', 'monochrome', 'editorial'],
    likes: 352,
  },
  {
    id: 'min-3',
    name: 'Muted Architectural',
    category: 'Minimal',
    colors: ['#EFEFEF', '#D8D8D8', '#B0B0B0', '#5E5E5E', '#1C1C1C'],
    tags: ['concrete', 'slate', 'structure'],
    likes: 290,
  },

  // MODERN
  {
    id: 'mod-1',
    name: 'SaaS Precision',
    category: 'Modern',
    colors: ['#0F172A', '#1E293B', '#3B82F6', '#60A5FA', '#F8FAFC'],
    tags: ['tech', 'dashboard', 'interface'],
    likes: 612,
  },
  {
    id: 'mod-2',
    name: 'Indigo Pulse',
    category: 'Modern',
    colors: ['#18181B', '#3F3F46', '#6366F1', '#A5B4FC', '#FAFAFA'],
    tags: ['fintech', 'bold', 'app'],
    likes: 543,
  },
  {
    id: 'mod-3',
    name: 'Violet Horizon',
    category: 'Modern',
    colors: ['#0B0F19', '#1E1B4B', '#7C3AED', '#C084FC', '#F5F3FF'],
    tags: ['ai', 'creative', 'gradient'],
    likes: 489,
  },

  // PASTEL
  {
    id: 'pas-1',
    name: 'Cotton Candy Sunset',
    category: 'Pastel',
    colors: ['#FFD1DC', '#FFE4E1', '#E6E6FA', '#B0E0E6', '#FFF0F5'],
    tags: ['soft', 'dreamy', 'gentle'],
    likes: 520,
  },
  {
    id: 'pas-2',
    name: 'Mint & Macaron',
    category: 'Pastel',
    colors: ['#D8F3DC', '#B7E4C7', '#95D5B2', '#FDE2E4', '#FFCAD4'],
    tags: ['bakery', 'refreshing', 'delicate'],
    likes: 431,
  },
  {
    id: 'pas-3',
    name: 'Mellow Meadow',
    category: 'Pastel',
    colors: ['#FEF9E7', '#FADBD8', '#D4EFDF', '#E8DAEF', '#FCF3CF'],
    tags: ['spring', 'watercolor', 'light'],
    likes: 377,
  },

  // VINTAGE
  {
    id: 'vin-1',
    name: '1970s Kodachrome',
    category: 'Vintage',
    colors: ['#2E4057', '#048A81', '#F4D35E', '#EE964B', '#F95738'],
    tags: ['retro', 'warm', 'film'],
    likes: 482,
  },
  {
    id: 'vin-2',
    name: 'Old Library Parchment',
    category: 'Vintage',
    colors: ['#3E2723', '#5D4037', '#8D6E63', '#D7CCC8', '#F5F5DC'],
    tags: ['leather', 'books', 'antique'],
    likes: 395,
  },
  {
    id: 'vin-3',
    name: 'Mid-Century Modernist',
    category: 'Vintage',
    colors: ['#1B4965', '#62B6CB', '#BEE9E8', '#F6BD60', '#F28482'],
    tags: ['50s', 'furniture', 'bauhaus'],
    likes: 412,
  },

  // NATURE
  {
    id: 'nat-1',
    name: 'Pacific Redwood Forest',
    category: 'Nature',
    colors: ['#132A13', '#31572C', '#4F772D', '#90A955', '#ECF39E'],
    tags: ['botanical', 'earthy', 'organic'],
    likes: 574,
  },
  {
    id: 'nat-2',
    name: 'Oceanic Trench',
    category: 'Nature',
    colors: ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#48CAE4'],
    tags: ['sea', 'water', 'deep'],
    likes: 638,
  },
  {
    id: 'nat-3',
    name: 'Sahara Dune Oasis',
    category: 'Nature',
    colors: ['#283618', '#606C38', '#DDA15E', '#BC6C25', '#FEFAE0'],
    tags: ['desert', 'sand', 'sun'],
    likes: 462,
  },

  // LUXURY
  {
    id: 'lux-1',
    name: 'Midnight Gold Royale',
    category: 'Luxury',
    colors: ['#0A0A0A', '#1F1F1F', '#B38B3F', '#D4AF37', '#F3E5AB'],
    tags: ['gold', 'prestige', 'black-tie'],
    likes: 712,
  },
  {
    id: 'lux-2',
    name: 'Champagne & Marble',
    category: 'Luxury',
    colors: ['#1C1917', '#44403C', '#A8A29E', '#E7E5E4', '#FAF7F2'],
    tags: ['stone', 'minimal-luxury', 'fragrance'],
    likes: 519,
  },
  {
    id: 'lux-3',
    name: 'Emerald Heritage',
    category: 'Luxury',
    colors: ['#051F20', '#0B2B26', '#163832', '#235347', '#8EB69B'],
    tags: ['jewel', 'regal', 'timeless'],
    likes: 488,
  },

  // DARK
  {
    id: 'drk-1',
    name: 'Cyberpunk Cyberdeck',
    category: 'Dark',
    colors: ['#050505', '#121217', '#1E1E28', '#8B5CF6', '#06B6D4'],
    tags: ['hacker', 'neon-dark', 'terminal'],
    likes: 689,
  },
  {
    id: 'drk-2',
    name: 'Obsidian Velvet',
    category: 'Dark',
    colors: ['#09090B', '#18181B', '#27272A', '#3F3F46', '#71717A'],
    tags: ['dark-mode', 'zinc', 'sleek'],
    likes: 577,
  },
  {
    id: 'drk-3',
    name: 'Deep Abyss',
    category: 'Dark',
    colors: ['#020817', '#0F172A', '#1E293B', '#334155', '#38BDF8'],
    tags: ['night', 'blue-dark', 'galaxy'],
    likes: 494,
  },

  // NEON
  {
    id: 'neo-1',
    name: 'Tokyo Arcade Night',
    category: 'Neon',
    colors: ['#0D0221', '#0F084B', '#26408B', '#00F5D4', '#F72585'],
    tags: ['vibrant', 'laser', 'electric'],
    likes: 641,
  },
  {
    id: 'neo-2',
    name: 'Acid Glitch',
    category: 'Neon',
    colors: ['#10002B', '#240046', '#5A189A', '#9D4EDD', '#00FF66'],
    tags: ['party', 'rave', 'fluorescent'],
    likes: 532,
  },
  {
    id: 'neo-3',
    name: 'Hyperdrive',
    category: 'Neon',
    colors: ['#FF007F', '#FF7700', '#FFDD00', '#00FFCC', '#0066FF'],
    tags: ['spectrum', 'intense', 'glow'],
    likes: 476,
  },

  // WARM
  {
    id: 'wrm-1',
    name: 'Tuscan Sunset',
    category: 'Warm',
    colors: ['#581845', '#900C3F', '#C70039', '#FF5733', '#FFC30F'],
    tags: ['cozy', 'sun', 'autumn'],
    likes: 554,
  },
  {
    id: 'wrm-2',
    name: 'Spiced Chai & Cinnamon',
    category: 'Warm',
    colors: ['#3A1F18', '#63321C', '#994D25', '#CC7738', '#F2C18D'],
    tags: ['rustic', 'coffee', 'warmth'],
    likes: 491,
  },

  // COOL
  {
    id: 'col-1',
    name: 'Alpine Glacier',
    category: 'Cool',
    colors: ['#1A365D', '#2B6CB0', '#4299E1', '#90CDF4', '#EBF8FF'],
    tags: ['frost', 'ice', 'crisp'],
    likes: 518,
  },
  {
    id: 'col-2',
    name: 'Nordic Winter Sky',
    category: 'Cool',
    colors: ['#0B192C', '#1E3E62', '#000000', '#F1F6F9', '#399918'],
    tags: ['aurora', 'clear', 'winter'],
    likes: 410,
  },

  // MONOCHROMATIC
  {
    id: 'mono-1',
    name: 'Cobalt Scale',
    category: 'Monochromatic',
    colors: ['#0A192F', '#172A45', '#233554', '#304B78', '#64B5F6'],
    tags: ['blues', 'gradation', 'hierarchy'],
    likes: 479,
  },
  {
    id: 'mono-2',
    name: 'Emerald Progression',
    category: 'Monochromatic',
    colors: ['#064E3B', '#047857', '#10B981', '#34D399', '#A7F3D0'],
    tags: ['greens', 'success', 'tint'],
    likes: 435,
  },

  // PROFESSIONAL
  {
    id: 'pro-1',
    name: 'Enterprise Corporate',
    category: 'Professional',
    colors: ['#0A2540', '#425466', '#635BFF', '#00D4B2', '#F6F9FC'],
    tags: ['stripe-vibe', 'clean', 'finance'],
    likes: 742,
  },
  {
    id: 'pro-2',
    name: 'Medical BioTech',
    category: 'Professional',
    colors: ['#0B3B60', '#1C6E8C', '#279AF1', '#DDF0FF', '#FFFFFF'],
    tags: ['clinical', 'trust', 'science'],
    likes: 421,
  },
  {
    id: 'pro-3',
    name: 'Editorial Monograph',
    category: 'Professional',
    colors: ['#1A1A1A', '#333333', '#8C8C8C', '#E5E5E5', '#C2410C'],
    tags: ['publishing', 'focus', 'sharp'],
    likes: 388,
  },
];
