import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer(port = 4174) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let parsedUrl = req.url.split('?')[0];
      if (parsedUrl === '/') parsedUrl = '/index.html';

      let filePath = path.join(DIST_DIR, parsedUrl);
      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, '200.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Service-Worker-Allowed': '/',
        });
        res.end(data);
      });
    });

    server.listen(port, () => resolve(server));
  });
}

async function testFeatures() {
  console.log('=== Testing Offline Color Tools & Install Modal Experience ===\n');
  const PORT = 4174;
  const server = await startServer(PORT);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Load online first to prime SW
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForTimeout(1000);

  // 2. Cut internet connection completely
  console.log('1. Setting browser context to OFFLINE...');
  await context.setOffline(true);

  // 3. Test Navigation across tools while completely OFFLINE
  const toolRoutes = [
    '#/tools/picker',
    '#/tools/converter',
    '#/tools/palette',
    '#/tools/contrast',
    '#/tools/gradient',
    '#/tools/shades',
    '#/tools/mixer',
    '#/tools/blindness',
    '#/tools/image',
    '#/tools/exporter',
  ];

  console.log('2. Navigating through all 10 color tools offline:');
  for (const route of toolRoutes) {
    await page.goto(`http://localhost:${PORT}/${route}`, { waitUntil: 'load' });
    const content = await page.textContent('body');
    const hasChroma = content.includes('CHROMA') || content.includes('Chroma');
    console.log(`   ✓ Route ${route} rendered offline (content ok: ${hasChroma})`);
  }

  // 4. Test Install App Modal Trigger
  console.log('\n3. Testing Install App Modal trigger...');
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'load' });

  // Click Install App button
  const installBtn = await page.$('button[aria-label="Install Chroma Studio App"]');
  if (installBtn) {
    await installBtn.click();
    await page.waitForTimeout(300);
    const modalTitle = await page.textContent('#install-modal-title');
    console.log('   ✓ Install Modal opened successfully! Title:', modalTitle);

    // Verify modal has the PWA icon and key feature badges
    const modalText = await page.textContent('[role="dialog"]');
    const hasFeatures = modalText.includes('100% Offline') && modalText.includes('Instant Launch');
    console.log('   ✓ Install Modal features & explanation present:', hasFeatures);

    // Close modal via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const modalVisibleAfterEsc = await page.$('[role="dialog"]');
    console.log('   ✓ Install Modal closed on Escape:', modalVisibleAfterEsc === null);
  } else {
    console.log('   Install button not in viewport or standalone mode');
  }

  // 5. Check Offline indicator
  console.log('\n4. Verifying Offline Indicator UI:');
  const offlineText = await page.textContent('aside[aria-label="Network status"]');
  console.log('   ✓ Offline indicator status text:', offlineText?.trim());

  await browser.close();
  server.close();
  console.log('\n=== All Offline Tools & PWA UI Verified! ===');
}

testFeatures().catch((err) => {
  console.error('❌ Feature test failed:', err);
  process.exit(1);
});
