import { ColorFamily } from '../types/color';

export interface NamedColor {
  name: string;
  hex: string;
  family: ColorFamily;
  popular?: boolean;
}

export const COLOR_DATASET: NamedColor[] = [
  // RED FAMILY
  { name: 'Crimson', hex: '#DC143C', family: 'red', popular: true },
  { name: 'Scarlet', hex: '#FF2400', family: 'red', popular: true },
  { name: 'Ruby Red', hex: '#E0115F', family: 'red', popular: true },
  { name: 'Carmine', hex: '#960018', family: 'red' },
  { name: 'Firebrick', hex: '#B22222', family: 'red' },
  { name: 'Cherry Red', hex: '#D2042D', family: 'red' },
  { name: 'Maroon', hex: '#800000', family: 'red', popular: true },
  { name: 'Blood Orange', hex: '#D9381E', family: 'red' },
  { name: 'Burgundy', hex: '#800020', family: 'red', popular: true },
  { name: 'Wine Red', hex: '#722F37', family: 'red' },
  { name: 'Garnet', hex: '#733635', family: 'red' },
  { name: 'Imperial Red', hex: '#ED2939', family: 'red' },
  { name: 'Cardinal Red', hex: '#C41E3A', family: 'red' },
  { name: 'Chili Pepper', hex: '#C11B17', family: 'red' },
  { name: 'Rosewood', hex: '#65000B', family: 'red' },
  { name: 'Mahogany', hex: '#C04000', family: 'red' },
  { name: 'Vermilion', hex: '#E34234', family: 'red' },
  { name: 'Persian Red', hex: '#CC3333', family: 'red' },
  { name: 'Dark Red', hex: '#8B0000', family: 'red' },
  { name: 'Indian Red', hex: '#CD5C5C', family: 'red' },

  // ORANGE FAMILY
  { name: 'Tangerine', hex: '#F28500', family: 'orange', popular: true },
  { name: 'Coral', hex: '#FF7F50', family: 'orange', popular: true },
  { name: 'Burnt Orange', hex: '#CC5500', family: 'orange', popular: true },
  { name: 'Apricot', hex: '#FBCEB1', family: 'orange' },
  { name: 'Peach', hex: '#FFE5B4', family: 'orange', popular: true },
  { name: 'Amber', hex: '#FFBF00', family: 'orange', popular: true },
  { name: 'Safety Orange', hex: '#FF5F1F', family: 'orange' },
  { name: 'Papaya Whip', hex: '#FFEFD5', family: 'orange' },
  { name: 'Rust', hex: '#B7410E', family: 'orange' },
  { name: 'Tiger Lily', hex: '#E2583E', family: 'orange' },
  { name: 'Terracotta', hex: '#E2725B', family: 'orange', popular: true },
  { name: 'Carrot Orange', hex: '#ED9121', family: 'orange' },
  { name: 'Persimmon', hex: '#EC5800', family: 'orange' },
  { name: 'Cadmium Orange', hex: '#ED872D', family: 'orange' },
  { name: 'Dark Orange', hex: '#FF8C00', family: 'orange' },

  // YELLOW FAMILY
  { name: 'Electric Yellow', hex: '#FFFF00', family: 'yellow', popular: true },
  { name: 'Canary Yellow', hex: '#FFEF00', family: 'yellow', popular: true },
  { name: 'Gold', hex: '#FFD700', family: 'yellow', popular: true },
  { name: 'Lemon Chiffon', hex: '#FFFACD', family: 'yellow' },
  { name: 'Mustard', hex: '#FFDB58', family: 'yellow', popular: true },
  { name: 'Buttercup', hex: '#F3E5AB', family: 'yellow' },
  { name: 'Chartreuse Yellow', hex: '#DFFF00', family: 'yellow' },
  { name: 'Flax', hex: '#EEDC82', family: 'yellow' },
  { name: 'Goldenrod', hex: '#DAA520', family: 'yellow' },
  { name: 'Saffron', hex: '#F4C430', family: 'yellow', popular: true },
  { name: 'Daffodil', hex: '#FFFF31', family: 'yellow' },
  { name: 'Cornsilk', hex: '#FFF8DC', family: 'yellow' },
  { name: 'Moccasin', hex: '#FFE4B5', family: 'yellow' },

  // GREEN FAMILY
  { name: 'Emerald', hex: '#50C878', family: 'green', popular: true },
  { name: 'Mint Green', hex: '#98FF98', family: 'green', popular: true },
  { name: 'Forest Green', hex: '#228B22', family: 'green', popular: true },
  { name: 'Olive Green', hex: '#808000', family: 'green', popular: true },
  { name: 'Sage Green', hex: '#87A96B', family: 'green', popular: true },
  { name: 'Jade', hex: '#00A86B', family: 'green', popular: true },
  { name: 'Seafoam Green', hex: '#2E8B57', family: 'green' },
  { name: 'Lime Green', hex: '#32CD32', family: 'green' },
  { name: 'Kelly Green', hex: '#4CBB17', family: 'green' },
  { name: 'Pistachio', hex: '#93C572', family: 'green' },
  { name: 'Hunter Green', hex: '#355E3B', family: 'green' },
  { name: 'Moss Green', hex: '#8A9A5B', family: 'green' },
  { name: 'Pine Green', hex: '#01796F', family: 'green' },
  { name: 'Spring Green', hex: '#00FF7F', family: 'green' },
  { name: 'Chartreuse', hex: '#7FFF00', family: 'green' },
  { name: 'Viridian', hex: '#40826D', family: 'green' },
  { name: 'Army Green', hex: '#4B5320', family: 'green' },

  // BLUE FAMILY
  { name: 'Classic Cobalt', hex: '#0047AB', family: 'blue', popular: true },
  { name: 'Sapphire Blue', hex: '#0F52BA', family: 'blue', popular: true },
  { name: 'Sky Blue', hex: '#87CEEB', family: 'blue', popular: true },
  { name: 'Navy Blue', hex: '#000080', family: 'blue', popular: true },
  { name: 'Cyan Blue', hex: '#00FFFF', family: 'blue', popular: true },
  { name: 'Teal', hex: '#008080', family: 'blue', popular: true },
  { name: 'Midnight Blue', hex: '#191970', family: 'blue', popular: true },
  { name: 'Royal Blue', hex: '#4169E1', family: 'blue', popular: true },
  { name: 'Cerulean', hex: '#007BA7', family: 'blue' },
  { name: 'Baby Blue', hex: '#89CFF0', family: 'blue' },
  { name: 'Periwinkle', hex: '#CCCCFF', family: 'blue' },
  { name: 'Steel Blue', hex: '#4682B4', family: 'blue' },
  { name: 'Electric Indigo', hex: '#4B0082', family: 'blue', popular: true },
  { name: 'Aquamarine', hex: '#7FFFD4', family: 'blue' },
  { name: 'Turquoise', hex: '#40E0D0', family: 'blue', popular: true },
  { name: 'Ultramarine', hex: '#120A8F', family: 'blue' },
  { name: 'Deep Sky Blue', hex: '#00BFFF', family: 'blue' },
  { name: 'Prussian Blue', hex: '#003153', family: 'blue' },
  { name: 'Cornflower Blue', hex: '#6495ED', family: 'blue' },
  { name: 'Dodger Blue', hex: '#1E90FF', family: 'blue' },

  // PURPLE FAMILY
  { name: 'Amethyst', hex: '#9966CC', family: 'purple', popular: true },
  { name: 'Lavender', hex: '#E6E6FA', family: 'purple', popular: true },
  { name: 'Violet', hex: '#8F00FF', family: 'purple', popular: true },
  { name: 'Plum', hex: '#8E4585', family: 'purple', popular: true },
  { name: 'Mauve', hex: '#E0B0FF', family: 'purple' },
  { name: 'Orchid', hex: '#DA70D6', family: 'purple' },
  { name: 'Royal Purple', hex: '#7851A9', family: 'purple', popular: true },
  { name: 'Byzantium', hex: '#702963', family: 'purple' },
  { name: 'Wisteria', hex: '#C9A0DC', family: 'purple' },
  { name: 'Mulberry', hex: '#C54B8C', family: 'purple' },
  { name: 'Indigo Dye', hex: '#2E5894', family: 'purple' },
  { name: 'Eggplant', hex: '#614051', family: 'purple' },
  { name: 'Iris', hex: '#5A4FCF', family: 'purple' },
  { name: 'Thistle', hex: '#D8BFD8', family: 'purple' },

  // PINK FAMILY
  { name: 'Rose Pink', hex: '#FF007F', family: 'pink', popular: true },
  { name: 'Hot Pink', hex: '#FF69B4', family: 'pink', popular: true },
  { name: 'Blush', hex: '#DE5D83', family: 'pink', popular: true },
  { name: 'Salmon Pink', hex: '#FF91A4', family: 'pink' },
  { name: 'Bubblegum', hex: '#FFC1CC', family: 'pink' },
  { name: 'Carnation Pink', hex: '#FFA6C9', family: 'pink' },
  { name: 'Flamingo', hex: '#FC8EAC', family: 'pink' },
  { name: 'Fuchsia', hex: '#FF00FF', family: 'pink', popular: true },
  { name: 'Magenta', hex: '#CA1F7B', family: 'pink', popular: true },
  { name: 'Coral Pink', hex: '#F88379', family: 'pink' },
  { name: 'Pastel Pink', hex: '#FFD1DC', family: 'pink' },
  { name: 'Watermelon', hex: '#FC6C85', family: 'pink' },

  // BROWN FAMILY
  { name: 'Chocolate', hex: '#7B3F00', family: 'brown', popular: true },
  { name: 'Caramel', hex: '#AF6E4D', family: 'brown', popular: true },
  { name: 'Coffee', hex: '#6F4E37', family: 'brown', popular: true },
  { name: 'Chestnut', hex: '#954535', family: 'brown' },
  { name: 'Cinnamon', hex: '#D2691E', family: 'brown', popular: true },
  { name: 'Bronze', hex: '#CD7F32', family: 'brown', popular: true },
  { name: 'Sepia', hex: '#704214', family: 'brown' },
  { name: 'Beige', hex: '#F5F5DC', family: 'brown', popular: true },
  { name: 'Khaki', hex: '#C3B091', family: 'brown' },
  { name: 'Taupe', hex: '#483C32', family: 'brown' },
  { name: 'Sandstone', hex: '#D6C6B2', family: 'brown' },
  { name: 'Sienna', hex: '#A0522D', family: 'brown' },
  { name: 'Walnut', hex: '#773F1A', family: 'brown' },

  // GRAY FAMILY
  { name: 'Slate Gray', hex: '#708090', family: 'gray', popular: true },
  { name: 'Charcoal', hex: '#36454F', family: 'gray', popular: true },
  { name: 'Silver', hex: '#C0C0C0', family: 'gray', popular: true },
  { name: 'Pewter', hex: '#899499', family: 'gray' },
  { name: 'Ash Gray', hex: '#B2BEB5', family: 'gray' },
  { name: 'Cool Gray', hex: '#8C92AC', family: 'gray', popular: true },
  { name: 'Gunmetal', hex: '#2A3439', family: 'gray' },
  { name: 'Steel Gray', hex: '#71797E', family: 'gray' },
  { name: 'Dim Gray', hex: '#696969', family: 'gray' },
  { name: 'Light Slate', hex: '#778899', family: 'gray' },

  // BLACK FAMILY
  { name: 'Obsidian', hex: '#0B0B0C', family: 'black', popular: true },
  { name: 'Jet Black', hex: '#0A0A0A', family: 'black', popular: true },
  { name: 'Onyx', hex: '#353839', family: 'black', popular: true },
  { name: 'Ebony', hex: '#555D50', family: 'black' },
  { name: 'Midnight', hex: '#040720', family: 'black' },
  { name: 'Pitch Black', hex: '#000000', family: 'black', popular: true },
  { name: 'Vantablack', hex: '#050505', family: 'black' },
  { name: 'Licorice', hex: '#1A1110', family: 'black' },

  // WHITE FAMILY
  { name: 'Pure White', hex: '#FFFFFF', family: 'white', popular: true },
  { name: 'Ivory', hex: '#FFFFF0', family: 'white', popular: true },
  { name: 'Ghost White', hex: '#F8F8FF', family: 'white' },
  { name: 'Snow', hex: '#FFFAFA', family: 'white', popular: true },
  { name: 'Floral White', hex: '#FFFAF0', family: 'white' },
  { name: 'Alabaster', hex: '#F2F0EB', family: 'white' },
  { name: 'Pearl', hex: '#EAE0C8', family: 'white', popular: true },
  { name: 'Eggshell', hex: '#F0EAD6', family: 'white' },
  { name: 'Sea Salt', hex: '#F5F5F5', family: 'white' },
  { name: 'Chalk White', hex: '#F7F7F7', family: 'white' },
];

/**
 * Finds nearest color name in dataset using Euclidean distance in RGB color space
 */
export function findNearestColorName(hex: string): string {
  const clean = hex.replace('#', '').trim();
  const r1 = parseInt(clean.substring(0, 2), 16) || 0;
  const g1 = parseInt(clean.substring(2, 4), 16) || 0;
  const b1 = parseInt(clean.substring(4, 6), 16) || 0;

  let minDistance = Infinity;
  let nearestName = 'Custom Chroma';

  for (const c of COLOR_DATASET) {
    const targetClean = c.hex.replace('#', '');
    const r2 = parseInt(targetClean.substring(0, 2), 16);
    const g2 = parseInt(targetClean.substring(2, 4), 16);
    const b2 = parseInt(targetClean.substring(4, 6), 16);

    // Weighted Euclidean distance matching human perception
    const rMean = (r1 + r2) / 2;
    const dR = r1 - r2;
    const dG = g1 - g2;
    const dB = b1 - b2;
    const distance = Math.sqrt(
      (2 + rMean / 256) * dR * dR +
      4 * dG * dG +
      (2 + (255 - rMean) / 256) * dB * dB
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestName = c.name;
      if (distance === 0) break;
    }
  }

  return nearestName;
}
