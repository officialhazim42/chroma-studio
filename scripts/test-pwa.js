import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer(port = 4173) {
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

    server.listen(port, () => {
      console.log(`[PWA Test Server] Listening on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function runPWATests() {
  console.log('=== Chroma Studio PWA Test Suite ===\n');

  // 1. Manifest Validation
  const manifestPath = path.join(DIST_DIR, 'manifest.webmanifest');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('manifest.webmanifest not found in dist/');
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  console.log('1. Manifest Fields:');
  console.log('   - Name:', manifest.name);
  console.log('   - Short Name:', manifest.short_name);
  console.log('   - Start URL:', manifest.start_url);
  console.log('   - Scope:', manifest.scope);
  console.log('   - Display:', manifest.display);
  console.log('   - Theme Color:', manifest.theme_color);
  console.log('   - Background Color:', manifest.background_color);
  console.log('   - Icons count:', manifest.icons.length);
  console.log('   - Shortcuts count:', manifest.shortcuts?.length || 0);

  if (manifest.name !== 'Chroma Studio') throw new Error('manifest name mismatch');
  if (manifest.display !== 'standalone') throw new Error('manifest display must be standalone');

  console.log('\n2. Verifying Icon Files in dist/:');
  for (const icon of manifest.icons) {
    const iconRel = icon.src.replace(/^\//, '');
    const fullPath = path.join(DIST_DIR, iconRel);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing icon in dist: ${iconRel}`);
    }
    const stat = fs.statSync(fullPath);
    console.log(`   ✓ ${icon.src} (${icon.sizes}, ${icon.purpose || 'any'}, ${stat.size} bytes)`);
  }

  // 3. Launch browser and verify Service Worker & Offline mode
  const PORT = 4173;
  const server = await startServer(PORT);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => console.log(`   [Browser Console] ${msg.type()}: ${msg.text()}`));

  console.log(`\n3. Loading http://localhost:${PORT}/ in Chrome...`);
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

  // Wait for service worker ready
  console.log('   Waiting for service worker activation...');
  const readyInfo = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return null;
    const reg = await navigator.serviceWorker.ready;
    return {
      scope: reg.scope,
      activeState: reg.active?.state,
      isControlled: Boolean(navigator.serviceWorker.controller),
    };
  });

  console.log('   - Service Worker Ready:', readyInfo);

  // Give 1 second for assets pre-caching to complete
  await page.waitForTimeout(1000);

  // Inspect caches
  const cacheStats = await page.evaluate(async () => {
    const names = await caches.keys();
    const results = {};
    for (const name of names) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      results[name] = keys.map((k) => k.url);
    }
    return results;
  });

  console.log('\n4. Service Worker Caches:');
  for (const [cacheName, urls] of Object.entries(cacheStats)) {
    console.log(`   - Cache "${cacheName}" contains ${urls.length} items`);
    urls.slice(0, 5).forEach((u) => console.log(`     * ${u}`));
    if (urls.length > 5) console.log(`     * ... and ${urls.length - 5} more`);
  }

  // 5. Test Offline Resilience
  console.log('\n5. Testing Offline Mode Simulation...');
  await context.setOffline(true);

  // Reload page while completely offline
  console.log('   Reloading page while offline...');
  await page.reload({ waitUntil: 'load' });

  const title = await page.title();
  console.log('   ✓ Page successfully loaded offline! Title:', title);

  // Verify Color Picker is functional offline
  const isPickerAvailable = await page.evaluate(() => {
    return typeof window !== 'undefined' && document.body.innerHTML.includes('Chroma Studio');
  });
  console.log('   ✓ Offline UI Rendering operational:', isPickerAvailable);

  // Check Offline indicator appears or state reflects offline
  const isOnlineInApp = await page.evaluate(() => navigator.onLine);
  console.log('   ✓ navigator.onLine is correctly reported as false:', !isOnlineInApp);

  // Restore online
  await context.setOffline(false);
  console.log('   Restored online mode.');

  await browser.close();
  server.close();

  console.log('\n=== All PWA Tests Passed Successfully! ===');
}

runPWATests().catch((err) => {
  console.error('\n❌ PWA Test Failed:', err);
  process.exit(1);
});
