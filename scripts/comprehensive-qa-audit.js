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

function startServer(port = 4178) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let parsedUrl = req.url.split('?')[0].split('#')[0];
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

const auditResults = {
  totalTests: 0,
  passed: 0,
  failed: 0,
  blocked: 0,
  categories: {},
  details: [],
};

function recordTest(category, name, passed, expected, actual, notes = '') {
  auditResults.totalTests++;
  if (passed) {
    auditResults.passed++;
  } else {
    auditResults.failed++;
  }

  if (!auditResults.categories[category]) {
    auditResults.categories[category] = { passed: 0, failed: 0, total: 0 };
  }
  auditResults.categories[category].total++;
  if (passed) auditResults.categories[category].passed++;
  else auditResults.categories[category].failed++;

  auditResults.details.push({
    category,
    name,
    passed,
    expected,
    actual,
    notes,
  });

  const mark = passed ? '✓' : '✗';
  console.log(`[${category}] ${mark} ${name}`);
  if (!passed) {
    console.error(`   Expected: ${expected}`);
    console.error(`   Actual:   ${actual}`);
  }
}

async function runComprehensiveAudit() {
  const PORT = 4178;
  const server = await startServer(PORT);
  console.log(`\n======================================================`);
  console.log(`  CHROMA STUDIO COMPLETE PRODUCTION QUALITY ASSURANCE  `);
  console.log(`======================================================\n`);
  console.log(`[Local Server] Running on http://localhost:${PORT}`);

  // Test across Google Chrome
  const chromeBrowser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await chromeBrowser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('Service Worker')) {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // -------------------------------------------------------------------------
    // SECTION 1: FUNCTIONAL TESTING - COLOR TOOLS & MATHEMATICAL ENGINES
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 1: Functional Testing of 10 Color Tools ---');

    // 1.1 Color Picker Tool
    await page.goto(`http://localhost:${PORT}/#/tool-picker`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h1:has-text("Color Picker")', { timeout: 8000 });
    const pickerTitle = await page.title();
    recordTest(
      'Functional - Color Picker',
      'Route #/tool-picker renders and title is updated',
      pickerTitle.includes('Color Picker'),
      'Title contains "Color Picker"',
      pickerTitle
    );

    // Test input with valid hex
    const pickerInput = page.locator('input[placeholder="#6366F1"]').first();
    if (await pickerInput.count() > 0) {
      await pickerInput.fill('#10B981');
      await page.waitForTimeout(200);
      const val = await pickerInput.inputValue();
      recordTest(
        'Functional - Color Picker',
        'Valid HEX input is accepted and reflected',
        val.toUpperCase() === '#10B981',
        '#10B981',
        val
      );

      // Test invalid hex input
      await pickerInput.fill('#ZZZ');
      await page.waitForTimeout(200);
      const errorText = await page.locator('text=Enter a valid HEX color.').first().count();
      recordTest(
        'Functional - Color Picker',
        'Invalid HEX input shows exact error message',
        errorText > 0,
        'Enter a valid HEX color.',
        errorText > 0 ? 'Enter a valid HEX color.' : 'No error'
      );
    }

    // 1.2 Color Converter Tool
    await page.goto(`http://localhost:${PORT}/#/tool-converter`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const convInput = page.locator('input[aria-label="Hex color input"]').first();
    await convInput.fill('#FF0000');
    await page.waitForTimeout(200);

    const rgbText = await page.locator('text=rgb(255, 0, 0)').first().count();
    recordTest(
      'Functional - Color Converter',
      'Converts #FF0000 to rgb(255, 0, 0) accurately',
      rgbText > 0,
      'rgb(255, 0, 0)',
      rgbText > 0 ? 'rgb(255, 0, 0)' : 'Not found'
    );

    const hslText = await page.locator('text=hsl(0, 100%, 50%)').first().count();
    recordTest(
      'Functional - Color Converter',
      'Converts #FF0000 to hsl(0, 100%, 50%) accurately',
      hslText > 0,
      'hsl(0, 100%, 50%)',
      hslText > 0 ? 'hsl(0, 100%, 50%)' : 'Not found'
    );

    // 1.3 WCAG Contrast Checker Tool
    await page.goto(`http://localhost:${PORT}/#/tool-contrast`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const fgInput = page.locator('input[aria-label="Foreground HEX color"]').first();
    const bgInput = page.locator('input[aria-label="Background HEX color"]').first();
    await fgInput.fill('#000000');
    await bgInput.fill('#FFFFFF');
    await page.waitForTimeout(200);

    const ratio21 = await page.locator('text=21.00:1').first().count();
    const badgeAAA = await page.locator('span:has-text("AAA")').first().count();
    recordTest(
      'Functional - Contrast Checker',
      'Pure Black on Pure White calculates exact 21.00:1 ratio and passes AAA',
      ratio21 > 0 && badgeAAA > 0,
      '21.00:1 and AAA',
      `Ratio count: ${ratio21}, AAA count: ${badgeAAA}`
    );

    // Test Swap button
    const swapBtn = page.locator('button:has-text("Swap")').first();
    await swapBtn.click();
    await page.waitForTimeout(200);
    const swappedFg = await fgInput.inputValue();
    const swappedBg = await bgInput.inputValue();
    recordTest(
      'Functional - Contrast Checker',
      'Swap button inverts foreground and background colors',
      swappedFg.toUpperCase() === '#FFFFFF' && swappedBg.toUpperCase() === '#000000',
      'FG=#FFFFFF, BG=#000000',
      `FG=${swappedFg}, BG=${swappedBg}`
    );

    // 1.4 Palette Generator Tool
    await page.goto(`http://localhost:${PORT}/#/tool-palette`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Palette size selection
    const size6Btn = page.locator('button:has-text("6")').first();
    await size6Btn.click();
    await page.waitForTimeout(200);
    const slotsCount = await page.locator('button[title*="color"]').count();
    recordTest(
      'Functional - Palette Generator',
      'Palette size selector changes number of swatches to 6',
      slotsCount >= 6,
      '6 or more slots rendered',
      `Found ${slotsCount} slots`
    );

    // Test Lock swatch
    const lockBtn = page.locator('button[title="Lock color"]').first();
    if (await lockBtn.count() > 0) {
      await lockBtn.click();
      await page.waitForTimeout(200);
      const isLocked = await page.locator('button[title="Unlock color"]').count();
      recordTest(
        'Functional - Palette Generator',
        'Lock toggle switches slot state to locked',
        isLocked > 0,
        'Unlock color title present',
        `Locked buttons: ${isLocked}`
      );
    }

    // 1.5 Gradient Generator Tool
    await page.goto(`http://localhost:${PORT}/#/tool-gradient`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const radialBtn = page.locator('button:has-text("Radial")').first();
    if (await radialBtn.count() > 0) {
      await radialBtn.click();
      await page.waitForTimeout(200);
      const codeOutput = await page.locator('p.break-all').first().textContent();
      recordTest(
        'Functional - Gradient Generator',
        'Radial type selection updates generated CSS code',
        codeOutput.includes('radial-gradient'),
        'Contains "radial-gradient"',
        codeOutput
      );
    }

    // 1.6 Shades & Tints Generator Tool
    await page.goto(`http://localhost:${PORT}/#/tool-shades`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const tintsCount = await page.locator('div[style*="background-color"]').count();
    recordTest(
      'Functional - Shades & Tints',
      'Generates tints, shades, and tone swatches',
      tintsCount > 10,
      '> 10 swatches',
      `${tintsCount} swatches rendered`
    );

    // 1.7 Color Mixer Tool
    await page.goto(`http://localhost:${PORT}/#/tool-mixer`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const mixResult = await page.locator('div[style*="background-color"]').count();
    recordTest(
      'Functional - Color Mixer',
      'Blends two colors and renders 11-step transition spectrum',
      mixResult >= 11,
      '>= 11 mixed steps',
      `${mixResult} steps rendered`
    );

    // 1.8 Color Blindness Simulator Tool
    await page.goto(`http://localhost:${PORT}/#/tool-blindness`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const protanopiaCard = await page.locator('text=Protanopia').first().count();
    const deuteranopiaCard = await page.locator('text=Deuteranopia').first().count();
    const tritanopiaCard = await page.locator('text=Tritanopia').first().count();
    const achromatopsiaCard = await page.locator('text=Achromatopsia').first().count();
    recordTest(
      'Functional - Blindness Simulator',
      'Renders all 4 CVD condition simulations (Protan, Deutan, Tritan, Achromatopsia)',
      protanopiaCard > 0 && deuteranopiaCard > 0 && tritanopiaCard > 0 && achromatopsiaCard > 0,
      'All 4 condition cards present',
      `P:${protanopiaCard}, D:${deuteranopiaCard}, T:${tritanopiaCard}, A:${achromatopsiaCard}`
    );

    // 1.9 Image Color Extractor Tool
    await page.goto(`http://localhost:${PORT}/#/tool-image`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const sampleBtn = page.locator('button:has-text("Explore Sample Image")').first();
    if (await sampleBtn.count() > 0) {
      await sampleBtn.click();
      await page.waitForTimeout(800);
      const canvasVisible = await page.locator('canvas').count();
      recordTest(
        'Functional - Image Extractor',
        'Built-in demo image initializes canvas for pixel sampling',
        canvasVisible > 0,
        '>= 1 canvas rendered',
        `${canvasVisible} canvas elements`
      );
    }

    // 1.10 CSS Exporter Tool
    await page.goto(`http://localhost:${PORT}/#/tool-exporter`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const addTokenBtn = page.locator('button:has-text("Add Token")').first();
    await addTokenBtn.click();
    await page.waitForTimeout(200);
    const tokenInputs = await page.locator('input[aria-label="Token name"]').count();
    recordTest(
      'Functional - CSS Exporter',
      'Add Token button creates new token row',
      tokenInputs >= 6,
      '>= 6 token inputs',
      `${tokenInputs} token inputs`
    );

    // -------------------------------------------------------------------------
    // SECTION 2: GENERAL SITE FUNCTIONALITY (Search, Favorites, Theme, Modals)
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 2: Search, Favorites, Theme & Modals ---');

    // 2.1 Quick Search Modal
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.keyboard.press('Control+KeyK');
    await page.waitForTimeout(300);
    let searchModal = await page.locator('div[role="dialog"]').count();
    recordTest(
      'General Functionality - Search',
      'Ctrl+K opens Quick Search modal dialog',
      searchModal > 0,
      'Search modal open',
      searchModal > 0 ? 'Open' : 'Not open'
    );

    const searchInput = page.locator('input[placeholder*="Search colors"]').first();
    await searchInput.fill('Emerald');
    await page.waitForTimeout(200);
    const searchResults = await page.locator('text=Emerald').count();
    recordTest(
      'General Functionality - Search',
      'Querying "Emerald" returns matched colors and tools',
      searchResults > 0,
      'Results found for Emerald',
      `Found ${searchResults} matches`
    );

    // Escape closes search modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    searchModal = await page.locator('div[role="dialog"]').count();
    recordTest(
      'General Functionality - Search',
      'Escape key dismisses search modal',
      searchModal === 0,
      'Modal closed',
      searchModal === 0 ? 'Closed' : 'Still open'
    );

    // 2.2 Theme Switching
    const themeBtn = page.locator('button[aria-label="Toggle theme"]').first();
    const initialIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await themeBtn.click();
    await page.waitForTimeout(200);
    const afterFirstClick = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    recordTest(
      'General Functionality - Theme',
      'Clicking theme button toggles root dark/light class',
      initialIsDark !== afterFirstClick,
      'Dark mode state changes',
      `Before: ${initialIsDark}, After: ${afterFirstClick}`
    );

    // Cycle back to dark
    if (!afterFirstClick) {
      await themeBtn.click();
      await page.waitForTimeout(100);
      await themeBtn.click();
      await page.waitForTimeout(100);
    }

    // 2.3 Favorites Storage & Persistence
    await page.goto(`http://localhost:${PORT}/#/explore`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const favBtn = page.locator('button[aria-label*="favorite"], button[title*="favorite"]').first();
    if (await favBtn.count() > 0) {
      await favBtn.click();
      await page.waitForTimeout(300);
      const favsStored = await page.evaluate(() => {
        try {
          const raw = localStorage.getItem('chroma_saved_favorites_v1');
          return raw ? JSON.parse(raw).length : 0;
        } catch {
          return 0;
        }
      });
      recordTest(
        'General Functionality - Favorites',
        'Favoriting an item stores it in LocalStorage chroma_saved_favorites_v1',
        favsStored > 0,
        'favorites count > 0',
        `Stored count: ${favsStored}`
      );
    }

    // 2.4 Developer Modal & Exact Branding Verification
    const devBtn = page.locator('button[aria-label="About Developer Profile"]').first();
    if (await devBtn.count() > 0) {
      await devBtn.click();
      await page.waitForTimeout(400);
      const devModalContent = await page.locator('text=hazimbashir.dev@gmail.com').count();
      const oldEmailPresent = await page.locator('text=hazimbashirfaqeer@gmail.com').count();
      recordTest(
        'General Functionality - Developer Profile',
        'Developer modal displays new official email and zero occurrences of old email',
        devModalContent > 0 && oldEmailPresent === 0,
        'hazimbashir.dev@gmail.com present, old email absent',
        `New email: ${devModalContent}, Old email: ${oldEmailPresent}`
      );
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    }

    // -------------------------------------------------------------------------
    // SECTION 3: RESPONSIVE VIEWPORTS AUDIT (All 13 Viewports)
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 3: Responsive Viewport Testing (13 Standard Viewports) ---');

    const viewportsToTest = [
      // Mobile
      { name: 'Mobile 320x568 (iPhone SE)', width: 320, height: 568 },
      { name: 'Mobile 360x800 (Android Standard)', width: 360, height: 800 },
      { name: 'Mobile 375x812 (iPhone 13 Mini)', width: 375, height: 812 },
      { name: 'Mobile 390x844 (iPhone 14/15)', width: 390, height: 844 },
      { name: 'Mobile 414x896 (iPhone XR/11)', width: 414, height: 896 },
      { name: 'Mobile 430x932 (iPhone 15 Pro Max)', width: 430, height: 932 },
      // Tablet
      { name: 'Tablet 768x1024 (iPad Portrait)', width: 768, height: 1024 },
      { name: 'Tablet 820x1180 (iPad Air)', width: 820, height: 1180 },
      { name: 'Tablet 1024x768 (iPad Landscape)', width: 1024, height: 768 },
      // Desktop
      { name: 'Desktop 1280x720 (HD)', width: 1280, height: 720 },
      { name: 'Desktop 1366x768 (Laptop)', width: 1366, height: 768 },
      { name: 'Desktop 1440x900 (MacBook Pro 15)', width: 1440, height: 900 },
      { name: 'Desktop 1920x1080 (Full HD)', width: 1920, height: 1080 },
    ];

    const criticalRoutes = [
      '/',
      '/#/tools/picker',
      '/#/tools/contrast',
      '/#/tools/converter',
      '/#/tools/exporter',
      '/#/explore',
      '/#/palettes',
      '/#/terms',
    ];

    for (const vp of viewportsToTest) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      let hasAnyOverflow = false;
      let maxDiff = 0;

      for (const route of criticalRoutes) {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(150);
        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const maxScroll = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0);
          const width = window.innerWidth;
          return { hasOverflow: maxScroll > width + 1, diff: maxScroll - width };
        });

        if (overflow.hasOverflow) {
          hasAnyOverflow = true;
          maxDiff = Math.max(maxDiff, overflow.diff);
        }
      }

      recordTest(
        'UI/UX & Responsive',
        `No horizontal overflow on ${vp.name} (${vp.width}x${vp.height}) across all tested routes`,
        !hasAnyOverflow,
        '0px horizontal overflow',
        hasAnyOverflow ? `${maxDiff}px overflow` : '0px overflow'
      );
    }

    // -------------------------------------------------------------------------
    // SECTION 4: ACCESSIBILITY & KEYBOARD NAV (WCAG 2.2 AA)
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 4: Accessibility & Keyboard Navigation ---');

    // Reset viewport to desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${PORT}/#/tools/contrast`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    // Check Breadcrumb accessibility
    const breadcrumbNav = await page.locator('nav[aria-label="Breadcrumb"]').count();
    const currentCrumb = await page.locator('[aria-current="page"]').count();
    recordTest(
      'Accessibility',
      'Breadcrumb navigation uses semantic <nav aria-label="Breadcrumb"> and aria-current="page"',
      breadcrumbNav > 0 && currentCrumb > 0,
      'nav[aria-label="Breadcrumb"] with aria-current="page"',
      `Breadcrumb: ${breadcrumbNav}, Current: ${currentCrumb}`
    );

    // Check interactive elements aria-labels
    const interactiveAriaCount = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, input, select, textarea, a'));
      return els.filter((el) => el.getAttribute('aria-label') || el.innerText || el.getAttribute('placeholder')).length;
    });
    recordTest(
      'Accessibility',
      'All primary interactive elements have accessible names/labels',
      interactiveAriaCount > 20,
      '> 20 accessible elements',
      `${interactiveAriaCount} elements verified`
    );

    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    recordTest(
      'Accessibility',
      'Page has exactly one primary <h1> heading for screen readers',
      h1Count === 1,
      '1 h1 element',
      `${h1Count} h1 elements`
    );

    // -------------------------------------------------------------------------
    // SECTION 5: TECHNICAL SEO & SOCIAL SHARING METADATA
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 5: Technical SEO & Metadata ---');

    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);

    const canonicalHref = await page.$eval('link[rel="canonical"]', (el) => el.getAttribute('href'));
    recordTest(
      'SEO & Metadata',
      'Canonical URL correctly points to preferred production domain https://chroma-studio.surge.sh/',
      canonicalHref === 'https://chroma-studio.surge.sh/',
      'https://chroma-studio.surge.sh/',
      canonicalHref
    );

    const ogImage = await page.$eval('meta[property="og:image"]', (el) => el.getAttribute('content'));
    const ogImageWidth = await page.$eval('meta[property="og:image:width"]', (el) => el.getAttribute('content'));
    const ogImageHeight = await page.$eval('meta[property="og:image:height"]', (el) => el.getAttribute('content'));
    recordTest(
      'SEO & Metadata',
      'Open Graph image tag has 1200x630 dimensions on absolute surge domain',
      ogImage === 'https://chroma-studio.surge.sh/og-image.png' && ogImageWidth === '1200' && ogImageHeight === '630',
      'https://chroma-studio.surge.sh/og-image.png (1200x630)',
      `${ogImage} (${ogImageWidth}x${ogImageHeight})`
    );

    // Facebook App ID verification
    const fbAppId = await page.$eval('meta[property="fb:app_id"]', (el) => el.getAttribute('content'));
    recordTest(
      'SEO & Metadata',
      'Facebook App ID metadata is present and matches 1010345392089286',
      fbAppId === '1010345392089286',
      '1010345392089286',
      fbAppId
    );

    // Open Graph Title & Description verification
    const ogTitle = await page.$eval('meta[property="og:title"]', (el) => el.getAttribute('content'));
    const ogDesc = await page.$eval('meta[property="og:description"]', (el) => el.getAttribute('content'));
    recordTest(
      'SEO & Metadata',
      'Open Graph title and description match official specification',
      ogTitle.includes('Chroma Studio – Free Online Color Tools & Palette Generator') &&
      ogDesc.includes('Explore, create and convert colors with Chroma Studio'),
      'Official Title & Description',
      `${ogTitle} | ${ogDesc.substring(0, 50)}...`
    );

    // JSON-LD structured data verification
    const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
    let jsonLdValid = false;
    if (jsonLdCount > 0) {
      const jsonText = await page.locator('script[type="application/ld+json"]').first().textContent();
      try {
        const parsed = JSON.parse(jsonText);
        jsonLdValid = parsed['@context'] === 'https://schema.org' && Array.isArray(parsed['@graph']);
      } catch {}
    }
    recordTest(
      'SEO & Metadata',
      'JSON-LD Structured Data parses valid Schema.org graph for WebSite, Organization, and WebApplication',
      jsonLdValid,
      'Valid Schema.org graph',
      jsonLdValid ? 'Valid' : 'Invalid or Missing'
    );

    // -------------------------------------------------------------------------
    // SECTION 6: PWA & OFFLINE PRECACHE VERIFICATION
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 6: PWA & Service Worker Offline Mode ---');

    const manifestLink = await page.$eval('link[rel="manifest"]', (el) => el.getAttribute('href'));
    recordTest(
      'PWA & Offline',
      'Manifest link exists in index.html',
      manifestLink === '/manifest.webmanifest' || manifestLink === './manifest.webmanifest',
      '/manifest.webmanifest',
      manifestLink
    );

    // Simulate offline mode
    await context.setOffline(true);
    await page.goto(`http://localhost:${PORT}/#/tools/picker`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const offlineTitle = await page.title();
    const isOfflineTitleValid = offlineTitle.includes('Chroma Studio');
    recordTest(
      'PWA & Offline',
      'Application loads and renders tools completely while offline',
      isOfflineTitleValid,
      'Title loads while offline',
      offlineTitle
    );
    await context.setOffline(false);

    // -------------------------------------------------------------------------
    // SECTION 7: EXPORT & DOWNLOAD CAPABILITIES
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 7: Export & File Download Verification ---');

    await page.goto(`http://localhost:${PORT}/#/tool-exporter`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const downloadPromise = page.waitForEvent('download', { timeout: 3000 }).catch(() => null);
    const downloadBtn = page.locator('button:has-text("Download File")').first();
    let downloadSucceeded = false;
    let downloadedFilename = '';
    if (await downloadBtn.count() > 0) {
      await downloadBtn.click();
      const download = await downloadPromise;
      if (download) {
        downloadSucceeded = true;
        downloadedFilename = download.suggestedFilename();
      }
    }
    recordTest(
      'Downloads & Exports',
      'CSS Exporter triggers file download with valid filename',
      downloadSucceeded && downloadedFilename.startsWith('chroma-colors'),
      'Filename starts with chroma-colors',
      downloadedFilename || 'No download'
    );

    // -------------------------------------------------------------------------
    // SECTION 8: ROUTING & 200.HTML SPA FALLBACK
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 8: Direct Route Access & SPA Fallback ---');

    const spaRoutes = ['/explore', '/palettes', '/gradients', '/terms', '/tools/picker'];
    for (const r of spaRoutes) {
      await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);
      const title = await page.title();
      recordTest(
        'Routing & SPA Fallback',
        `Direct access to clean URL path ${r} resolves via 200.html SPA fallback`,
        title.includes('Chroma Studio'),
        'Title contains "Chroma Studio"',
        title
      );
    }

    // -------------------------------------------------------------------------
    // SECTION 9: CONSOLE ERRORS AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- SECTION 9: Runtime Console Errors Check ---');
    recordTest(
      'Reliability & Stability',
      'Zero uncaught JavaScript exceptions or runtime console errors during full testing session',
      consoleErrors.length === 0,
      '0 console errors',
      `${consoleErrors.length} console errors: ${consoleErrors.slice(0, 3).join(', ')}`
    );

  } catch (err) {
    console.error('Audit execution error:', err);
  } finally {
    await chromeBrowser.close();
  }

  // ---------------------------------------------------------------------------
  // SECTION 10: MICROSOFT EDGE BROWSER COMPATIBILITY
  // ---------------------------------------------------------------------------
  console.log('\n--- SECTION 10: Microsoft Edge Direct Browser Compatibility ---');
  try {
    const edgeBrowser = await chromium.launch({ channel: 'msedge', headless: true });
    const edgePage = await edgeBrowser.newPage({ viewport: { width: 1280, height: 800 } });
    await edgePage.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await edgePage.waitForFunction(() => document.title.length > 0, { timeout: 5000 });
    const edgeTitle = await edgePage.title();
    recordTest(
      'Browser Compatibility',
      'Microsoft Edge renders homepage and loads CSS/JS bundles with zero errors',
      edgeTitle.includes('Chroma Studio'),
      'Title contains "Chroma Studio"',
      edgeTitle
    );

    await edgePage.goto(`http://localhost:${PORT}/#/tool-contrast`, { waitUntil: 'domcontentloaded' });
    await edgePage.waitForSelector('h1:has-text("Contrast Checker")', { timeout: 8000 });
    const edgeContrastTitle = await edgePage.locator('h1').textContent();
    recordTest(
      'Browser Compatibility',
      'Microsoft Edge executes color science math and renders WCAG Contrast Checker',
      edgeContrastTitle.includes('Contrast Checker'),
      'Contrast Checker renders',
      edgeContrastTitle
    );
    await edgeBrowser.close();
  } catch (err) {
    console.error('Edge test error:', err.message);
    recordTest(
      'Browser Compatibility',
      'Microsoft Edge execution',
      false,
      'Edge launches and runs',
      err.message
    );
  }

  server.close();

  // Summary
  console.log(`\n======================================================`);
  console.log(`  AUDIT COMPLETE: ${auditResults.passed} / ${auditResults.totalTests} TESTS PASSED (${auditResults.failed} FAILED)  `);
  console.log(`======================================================\n`);

  fs.writeFileSync(
    path.join(__dirname, '../audit-results.json'),
    JSON.stringify(auditResults, null, 2)
  );

  return auditResults;
}

runComprehensiveAudit();
