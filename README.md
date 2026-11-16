# CHROMA STUDIO
> **Every Color. Every Code. One Creative Workspace.**

Chroma Studio is a modern, high-performance, privacy-first color intelligence platform and design engineering toolkit. Built strictly client-side with zero external API dependencies, it runs 100% inside your browser with full offline PWA capabilities.

---

## 🌟 Key Capabilities & Architecture

### 1. Privacy-First & Zero-Backend Architecture
- **Zero Server Processing:** All color conversions, image pixel samplings, and contrast calculations occur directly in your browser's V8 engine and Canvas API.
- **Zero Remote Uploads:** Images dropped or pasted into the Image Color Picker remain strictly in local browser memory and are never transmitted to any external server.
- **Offline PWA Ready:** Registered Service Worker caches app assets, enabling offline execution.
- **Persistent Local Storage:** Saved color favorites, custom palettes, and user preferences are preserved in `localStorage` without requiring accounts or cloud databases.

---

## 🛠️ The 10 Integrated Color Tools

1. **Color Picker (`TOOL 01`):**
   - Interactive chromatic picker with real-time RGB (Red, Green, Blue) and HSL (Hue, Saturation, Lightness) channel sliders.
   - Native eye-dropper integration and one-click "Copy All Formats" capability.
   - Instant random color generation with dynamic contrast luminance calculation.

2. **Color Converter (`TOOL 02`):**
   - Bidirectional real-time conversion between:
     - **HEX** (`#RRGGBB`, `#RGB`)
     - **RGB** (`rgb(r, g, b)`)
     - **RGBA** (`rgba(r, g, b, a)`)
     - **HSL** (`hsl(h, s%, l%)`)
     - **HSLA** (`hsla(h, s%, l%, a)`)
     - **HSV / HSB** (`hsv(h, s%, v%)`)
     - **CMYK** (`cmyk(c%, m%, y%, k%)`)
   - Any modification to one format instantly recalculates all other values.

3. **Image Color Picker & Dominant Extractor (`TOOL 03`):**
   - Drag & drop, file upload, or clipboard paste (`Ctrl+V`) for any visual asset.
   - Interactive magnifying loupe pixel sampler on HTML5 Canvas.
   - Dominant color extraction algorithm based on frequency quantization bucketing.
   - Download extracted palette as JSON or open in the studio.

4. **Harmonic Palette Generator (`TOOL 04`):**
   - Generate color harmonies based on standard color wheel mathematics:
     - **Complementary** (+180°)
     - **Analogous** (±30°)
     - **Triadic** (+120°, +240°)
     - **Tetradic / Rectangle** (+60°, +180°, +240°)
     - **Split Complementary** (+150°, +210°)
     - **Monochromatic**
     - **Creative Random**
   - Adjustable palette size (3 to 8 colors).
   - Spacebar shortcut to randomize unlocked colors while locking selected favorites.
   - Export to CSS Custom Properties, Tailwind configuration, or JSON.

5. **WCAG Contrast Checker (`TOOL 05`):**
   - Strict adherence to W3C Web Content Accessibility Guidelines (WCAG 2.1).
   - Relative optical luminance calculation using gamma expansion formulas.
   - Evaluates compliance for:
     - **WCAG AA Normal Text** (≥ 4.5:1)
     - **WCAG AA Large Text** (≥ 3.0:1)
     - **WCAG AAA Normal Text** (≥ 7.0:1)
     - **WCAG AAA Large Text** (≥ 4.5:1)
     - **Graphical Objects & UI Components** (≥ 3.0:1)
   - Live interactive UI preview card displaying typography, buttons, and badges.

6. **Gradient Generator (`TOOL 06`):**
   - Support for **Linear**, **Radial**, and **Conic** gradients.
   - 360-degree interactive angle dial and angle preset shortcuts.
   - Multi-stop color timeline with position slider (0% to 100%).
   - Direct CSS declaration export (`background: linear-gradient(...);`).
   - Gallery of curated gradient presets.

7. **Shades, Tints & Tones Generator (`TOOL 07`):**
   - **Tints:** Base color mixed with pure white (`#FFFFFF`) in 5% to 20% steps.
   - **Shades:** Base color mixed with pure black (`#000000`) in 5% to 20% steps.
   - **Tones:** Base color mixed with neutral 50% gray (`#808080`) in 5% to 20% steps.
   - One-click export to full design system CSS scales and Tailwind 50–950 scales.

8. **Color Mixer (`TOOL 08`):**
   - Blend any two input colors with a continuous mix ratio slider (0% to 100%).
   - Choice of color space interpolation: linear RGB averaging vs. cylindrical HSL polar interpolation.
   - 11-step visual progression strip.

9. **Color Blindness Simulator (`TOOL 09`):**
   - Real-time Machado/Brettel LMS photoreceptor cone simulation:
     - **Protanopia** (Red-blind, L-cone deficiency — ~1% of males)
     - **Deuteranopia** (Green-blind, M-cone deficiency — ~5% of males)
     - **Tritanopia** (Blue-blind, S-cone deficiency — ~0.003% of population)
     - **Achromatopsia** (Monochromacy / Complete color blindness)
   - Side-by-side comparison against normal trichromatic vision.

10. **CSS Color Exporter & Developer Suite (`TOOL 10`):**
    - Production code generators for:
      - **CSS Custom Properties** (`:root { ... }`)
      - **SCSS / SASS Variables** (`$color-primary: ...;`)
      - **Tailwind CSS Config** (`module.exports = { theme: ... }`)
      - **JSON Tokens** (`{ "colors": { ... } }`)
      - **HTML Theme Meta Tags** (`<meta name="theme-color">`)
      - **Android Color Resources** (`<resources><color name="...">#FF...</color></resources>`)
    - Direct file download with proper extensions (`.css`, `.scss`, `.js`, `.json`, `.html`, `.xml`).

---

## 🎨 Exploration & Design Library

- **Color Explorer (`/#/explore`):**
  - Search across standard named colors.
  - Filter across 11 primary color families (Red, Orange, Yellow, Green, Blue, Purple, Pink, Brown, Gray, Black, White).
  - Fine-tune by Hue, Lightness, and Saturation thresholds.
  - Sort alphabetically, by hue angle, lightness, or popularity.
- **Curated Palettes (`/#/palettes`):**
  - 80+ curated palettes organized into 12 distinct categories:
    - *Minimal, Modern, Pastel, Vintage, Nature, Luxury, Dark, Neon, Warm, Cool, Monochromatic, Professional*.
- **Color Theory & Learn (`/#/learn`):**
  - 9 educational modules covering HEX byte notation, additive RGB displays, subtractive CMYK inks, HSL cylindrical geometry, classical 12-spoke color wheel harmonies, WCAG relative luminance math, inclusive design, and gamut boundaries.
- **Developer Hub (`/#/developer`):**
  - Standard reference table of all 140 named W3C CSS colors with one-click copy.
  - Android Jetpack Compose and `colors.xml` resources.

---

## 💾 Local Vault & Favorites System

- Save individual colors, palettes, and multi-stop gradients with a single click.
- Filter, search, and manage your local collection.
- **Data Portability:** Export your entire collection as `chroma-favorites.json` or import previously exported collections.
- Clear all local data with safety confirmation modal.

---

## 👨‍💻 Software Creator & Developer Attribution

- **Developer:** HAZIM BASHIR FAQEER (Urdu: **حازم بشیر**)
- **Professional Role:** Android Developer & Software Creator
- **Location:** Ganderbal, Jammu & Kashmir, India
- **Email:** [hazimbashir.dev@gmail.com](mailto:hazimbashir.dev@gmail.com)
- **Developer Handle:** `@officialhazim42`

### Professional Biography
> "I am Hazim Bashir, an Android Developer and Software Creator passionate about building privacy-focused digital products, modern web experiences, and practical software solutions.
> My development journey focuses on Kotlin, Jetpack Compose, modern frontend technologies, and thoughtful product engineering.
> I believe software should be simple to use, reliable, accessible, and designed with privacy at its core. I enjoy transforming ideas into functional digital products with clean interfaces, efficient architecture, and attention to detail.
> My goal is to create meaningful technology that solves real-world problems while delivering a seamless user experience."

### 10 Verified Social Media Platforms
1. **Instagram:** [instagram.com/officialhazim42](https://instagram.com/officialhazim42)
2. **GitHub:** [github.com/officialhazim42](https://github.com/officialhazim42)
3. **YouTube:** [youtube.com/@officialhazim42](https://youtube.com/@officialhazim42)
4. **X (Twitter):** [x.com/officialhazim42](https://x.com/officialhazim42)
5. **LinkedIn:** [linkedin.com/in/hazim-bashir-faqeer](https://www.linkedin.com/in/hazim-bashir-faqeer)
6. **Telegram:** [t.me/officialhazim42](https://t.me/officialhazim42)
7. **Threads:** [threads.net/@officialhazim42](https://www.threads.net/@officialhazim42)
8. **Snapchat:** [snapchat.com/add/officialhazim42](https://www.snapchat.com/add/officialhazim42)
9. **Reddit:** [reddit.com/user/officialhazim42](https://www.reddit.com/user/officialhazim42)
10. **Discord:** [discord.com/users/officialhazim42](https://discord.com/users/officialhazim42)

---

## 🚀 Local Development & Build

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Quickstart
```bash
# Clone or navigate to the project directory
cd chroma-studio

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Production Deployment

Chroma Studio generates a completely static, zero-runtime distribution in `dist/`.

### Automated GitHub Actions Deployment (Surge.sh)
- **Live URL**: [https://chroma-studio.surge.sh](https://chroma-studio.surge.sh)
- **CI/CD Workflow**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Trigger**: Every push to the `main` branch automatically builds the production bundle and deploys to Surge.sh using the official Surge CLI with the `SURGE_TOKEN` GitHub repository secret.
- **Client-Side Routing**: SPA fallback is managed automatically by generating `200.html` during the deployment workflow.

---

## 🔒 Privacy Architecture
- **No Cookies:** Zero tracking or advertising cookies.
- **No Analytics SDKs:** Zero Google Analytics, Facebook Pixel, or third-party trackers.
- **No Remote Telemetry:** The app makes zero external network requests during runtime.
- **Canvas Sandboxing:** All image data stays within the local browser sandbox.

---

## 📄 License
Designed and Developed with precision by **Hazim Bashir Faqeer** ([@officialhazim42](https://github.com/officialhazim42)).
Open for creative and educational use.
