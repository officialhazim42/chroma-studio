import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateMaskableIcon() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  // Maskable icon: 512x512 with full bleed #090A0F background and the logo contained within 75% safe area (approx 384x384 centered)
  const maskableSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
    <defs>
      <linearGradient id="maskable-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A" />
        <stop offset="100%" stop-color="#090A0F" />
      </linearGradient>
      <linearGradient id="spectrum" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366F1" />
        <stop offset="35%" stop-color="#A855F7" />
        <stop offset="70%" stop-color="#EC4899" />
        <stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
    </defs>
    <!-- Full-bleed background with no rounded corners for maskable safe-zone compliance -->
    <rect width="512" height="512" fill="url(#maskable-bg)" />

    <!-- Centered Chroma Studio logo scaled to 76% (388px) to guarantee 100% safe zone clearance -->
    <g transform="translate(62, 62) scale(0.7578)">
      <!-- Outer Spectrum Ring -->
      <circle cx="256" cy="256" r="160" stroke="url(#spectrum)" stroke-width="36" stroke-linecap="round" />
      
      <!-- Chromatic petals -->
      <circle cx="256" cy="180" r="44" fill="#6366F1" opacity="0.95" />
      <circle cx="322" cy="256" r="44" fill="#A855F7" opacity="0.95" />
      <circle cx="256" cy="332" r="44" fill="#EC4899" opacity="0.95" />
      <circle cx="190" cy="256" r="44" fill="#06B6D4" opacity="0.95" />
      
      <!-- Center Core -->
      <circle cx="256" cy="256" r="28" fill="#FFFFFF" />
      <circle cx="256" cy="256" r="16" fill="#090A0F" />
    </g>
  </svg>
  `;

  await page.setViewportSize({ width: 512, height: 512 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:#090A0F;">${maskableSvg}</body></html>`);

  const outPath = path.join(__dirname, '../public/maskable-icon-512x512.png');
  await page.screenshot({ path: outPath, type: 'png' });
  console.log(`Successfully generated maskable icon at: ${outPath}`);

  await browser.close();
}

generateMaskableIcon().catch(err => {
  console.error(err);
  process.exit(1);
});
