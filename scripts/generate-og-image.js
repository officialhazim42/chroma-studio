import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, '../public/og-image.png');

async function generateOgImage() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      width: 1200px;
      height: 630px;
      background-color: #090A0F;
      color: #FFFFFF;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 64px;
    }

    /* Ambient Background Lighting */
    .glow-1 {
      position: absolute;
      top: -120px;
      left: 100px;
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
    }
    .glow-2 {
      position: absolute;
      bottom: -100px;
      right: 120px;
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0) 70%);
      filter: blur(70px);
      pointer-events: none;
    }
    .glow-3 {
      position: absolute;
      top: 180px;
      right: 420px;
      width: 380px;
      height: 380px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
    }

    /* Header & Badge */
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 10;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 18px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #A5B4FC;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #6366F1;
      box-shadow: 0 0 10px #6366F1;
    }
    .domain-pill {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 14px;
      color: #94A3B8;
      background: rgba(255, 255, 255, 0.03);
      padding: 6px 14px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    /* Main Content */
    .main-content {
      position: relative;
      z-index: 10;
      margin-top: 16px;
    }
    .title {
      font-size: 58px;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.1;
      background: linear-gradient(135deg, #FFFFFF 30%, #C7D2FE 70%, #818CF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 14px;
    }
    .subtitle {
      font-size: 21px;
      font-weight: 400;
      color: #94A3B8;
      max-width: 840px;
      line-height: 1.45;
    }

    /* Visual Showcase Card */
    .showcase-card {
      position: relative;
      z-index: 10;
      background: rgba(18, 19, 26, 0.75);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 24px;
      padding: 20px 24px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
    }
    .palette-row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }
    .swatch {
      flex: 1;
      height: 76px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .swatch-name {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    .swatch-hex {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      font-weight: 800;
      color: #FFFFFF;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    /* Tools Pill Bar */
    .tools-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tool-chip {
      font-size: 12px;
      font-weight: 600;
      color: #CBD5E1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 6px 12px;
      border-radius: 10px;
    }
    .tool-chip.highlight {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.35);
      color: #A5B4FC;
    }
  </style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="glow-3"></div>

  <!-- Header -->
  <div class="header-row">
    <div class="badge">
      <div class="badge-dot"></div>
      <span>Chroma Studio &middot; Professional Color Suite</span>
    </div>
    <div class="domain-pill">chroma-studio.surge.sh</div>
  </div>

  <!-- Main Headline -->
  <div class="main-content">
    <h1 class="title">Every Color. Every Code.<br>One Creative Workspace.</h1>
    <p class="subtitle">Free online color tools: Harmonic Palette Generator, HEX to RGB Converter, WCAG 2.2 Contrast Checker, CSS Gradients, and Local Image Color Extractor.</p>
  </div>

  <!-- Visual Swatch Card -->
  <div class="showcase-card">
    <div class="palette-row">
      <div class="swatch" style="background: #6366F1;">
        <span class="swatch-name">Indigo Glow</span>
        <span class="swatch-hex">#6366F1</span>
      </div>
      <div class="swatch" style="background: #EC4899;">
        <span class="swatch-name">Electric Pink</span>
        <span class="swatch-hex">#EC4899</span>
      </div>
      <div class="swatch" style="background: #10B981;">
        <span class="swatch-name">Emerald Mint</span>
        <span class="swatch-hex">#10B981</span>
      </div>
      <div class="swatch" style="background: #F59E0B;">
        <span class="swatch-name">Amber Flame</span>
        <span class="swatch-hex">#F59E0B</span>
      </div>
      <div class="swatch" style="background: #3B82F6;">
        <span class="swatch-name">Ocean Blue</span>
        <span class="swatch-hex">#3B82F6</span>
      </div>
      <div class="swatch" style="background: #8B5CF6;">
        <span class="swatch-name">Violet Dream</span>
        <span class="swatch-hex">#8B5CF6</span>
      </div>
    </div>

    <!-- Tools Bar -->
    <div class="tools-bar">
      <span class="tool-chip highlight">&#10003; 10 Pro Color Tools</span>
      <span class="tool-chip">Palette Generator</span>
      <span class="tool-chip">HEX / RGB / HSL</span>
      <span class="tool-chip">WCAG 2.2 AAA Contrast</span>
      <span class="tool-chip">CSS Gradients</span>
      <span class="tool-chip">Color Mixer</span>
      <span class="tool-chip">Blindness Simulator</span>
      <span class="tool-chip">100% Client-Side &amp; Private</span>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  console.log(`Successfully generated high-resolution 1200x630 OG image at: ${outputPath}`);
  await browser.close();
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
