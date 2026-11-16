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
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer(port = 4175) {
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

const VIEWPORTS = [
  { width: 320, height: 568, name: '320px' },
  { width: 360, height: 740, name: '360px' },
  { width: 375, height: 667, name: '375px' },
  { width: 390, height: 844, name: '390px' },
  { width: 414, height: 896, name: '414px' },
  { width: 430, height: 932, name: '430px' },
];

const ROUTES = [
  '/',
  '/#/tools/picker',
  '/#/tools/converter',
  '/#/tools/image',
  '/#/tools/palette',
  '/#/tools/contrast',
  '/#/tools/gradient',
  '/#/tools/shades',
  '/#/tools/mixer',
  '/#/tools/blindness',
  '/#/tools/exporter',
  '/#/explore',
  '/#/palettes',
  '/#/gradients',
  '/#/learn',
  '/#/developer',
  '/#/favorites',
  '/#/about',
  '/#/about-chroma-studio',
  '/#/legal',
];

async function runMobileAudit() {
  const PORT = 4175;
  const server = await startServer(PORT);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  console.log('=== Chroma Studio Mobile Viewport Audit ===\n');
  const issues = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(300);

        const overflow = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const windowWidth = window.innerWidth;
          const bodyScrollWidth = document.body.scrollWidth;

          const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
          const hasOverflow = maxScroll > windowWidth + 1;

          let overflowingElements = [];
          if (hasOverflow) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const rect = el.getBoundingClientRect();
              if (rect.right > windowWidth + 2) {
                overflowingElements.push({
                  tag: el.tagName,
                  className: (el.className || '').toString().slice(0, 60),
                  rectRight: Math.round(rect.right),
                  windowWidth,
                });
              }
            }
          }

          return {
            windowWidth,
            maxScroll,
            hasOverflow,
            overflowingElements: overflowingElements.slice(0, 5),
          };
        });

        if (overflow.hasOverflow) {
          issues.push({
            viewport: vp.name,
            route,
            maxScroll: overflow.maxScroll,
            elements: overflow.overflowingElements,
          });
          console.log(`❌ Overflow on ${vp.name} at ${route}: maxScroll=${overflow.maxScroll} > width=${vp.width}`);
          overflow.overflowingElements.forEach(el => {
            console.log(`   Element <${el.tag}> (class: ${el.className}) right edge: ${el.rectRight}px`);
          });
        }
      } catch (e) {
        console.error(`Error checking ${route} on ${vp.name}:`, e.message);
      }
    }
    await page.close();
  }

  // Check specific mobile layout details:
  // 1. Floating controls overlapping or covering content
  console.log('\nChecking floating controls positioning on 320px...');
  const page320 = await browser.newPage({ viewport: { width: 320, height: 568 } });
  await page320.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
  await page320.waitForTimeout(300);

  const floatingCheck = await page320.evaluate(() => {
    const devBtn = document.querySelector('button[aria-label="About Developer - Hazim Bashir"]');
    const bttBtn = document.querySelector('button[aria-label="Back to top"]');
    const devRect = devBtn ? devBtn.getBoundingClientRect() : null;
    const bttRect = bttBtn ? bttBtn.getBoundingClientRect() : null;

    let overlap = false;
    if (devRect && bttRect) {
      overlap = !(
        devRect.right < bttRect.left ||
        devRect.left > bttRect.right ||
        devRect.bottom < bttRect.top ||
        devRect.top > bttRect.bottom
      );
    }
    return { devRect, bttRect, overlap };
  });

  console.log('Floating buttons overlap on 320px:', floatingCheck.overlap);

  // 2. Check Navbar controls & layout on 320px
  const navbarCheck = await page320.evaluate(() => {
    const nav = document.querySelector('header');
    const headerContainer = nav ? nav.querySelector('div') : null;
    return {
      navHeight: nav?.offsetHeight,
      containerWidth: headerContainer?.offsetWidth,
      scrollWidth: headerContainer?.scrollWidth,
    };
  });
  console.log('Navbar container at 320px:', navbarCheck);

  // 3. Check footer at 320px
  const footerCheck = await page320.evaluate(() => {
    const footer = document.querySelector('footer');
    return {
      footerWidth: footer?.offsetWidth,
      footerScrollWidth: footer?.scrollWidth,
    };
  });
  console.log('Footer at 320px:', footerCheck);

  await browser.close();
  server.close();

  if (issues.length === 0) {
    console.log('\n✓ No horizontal scroll/overflow found on any tested route at 320px-430px!');
  } else {
    console.log(`\nFound ${issues.length} viewport/route overflow occurrences.`);
  }
}

runMobileAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
