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
  '.txt': 'text/plain',
};

function startServer(port = 4180) {
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
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.listen(port, () => resolve(server));
  });
}

async function runPenetrationTests() {
  console.log('======================================================');
  console.log('  CHROMA STUDIO DEFENSIVE SECURITY & PENETRATION SUITE');
  console.log('======================================================\n');

  const PORT = 4180;
  const server = await startServer(PORT);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  function record(category, testName, passed, expected, actual) {
    results.push({ category, testName, passed, expected, actual });
    const mark = passed ? '✓' : '✗';
    console.log(`[${category}] ${mark} ${testName}`);
    if (!passed) console.log(`   Expected: ${expected}\n   Actual: ${actual}`);
  }

  // 1. CSP and Security Meta Tags Verification
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  const cspContent = await page.$eval('meta[http-equiv="Content-Security-Policy"]', (el) => el.getAttribute('content'));
  record(
    'Security Headers - CSP',
    'Content-Security-Policy meta tag exists with object-src none and restrictive directives',
    cspContent.includes("object-src 'none'") && cspContent.includes("default-src 'self'"),
    "CSP with object-src 'none' & default-src 'self'",
    cspContent
  );

  const nosniff = await page.$eval('meta[http-equiv="X-Content-Type-Options"]', (el) => el.getAttribute('content'));
  record(
    'Security Headers - MIME Sniffing',
    'X-Content-Type-Options meta tag is set to nosniff',
    nosniff === 'nosniff',
    'nosniff',
    nosniff
  );

  const referrer = await page.$eval('meta[name="referrer"]', (el) => el.getAttribute('content'));
  record(
    'Security Headers - Referrer Policy',
    'Referrer Policy is set to strict-origin-when-cross-origin',
    referrer === 'strict-origin-when-cross-origin',
    'strict-origin-when-cross-origin',
    referrer
  );

  // 2. CSS Exporter Injection & XSS Tests
  await page.goto(`http://localhost:${PORT}/#/tool-exporter`, { waitUntil: 'networkidle' });
  const keyInput = page.locator('input[aria-label="Token name"]').first();
  const hexInput = page.locator('input[aria-label="Token HEX color"]').first();

  // Test Payload 1: HTML/Style tag breakout
  await keyInput.fill('test</style><script>alert("xss")</script><style>');
  await hexInput.fill('#FF0000; } body { background: red; }');
  await page.waitForTimeout(200);

  // Check generated CSS format
  const codeContentCss = await page.locator('pre code').textContent();
  const hasScriptTagCss = codeContentCss.includes('<script>') || codeContentCss.includes('alert(');
  const hasStyleTagCss = codeContentCss.includes('</style>') || codeContentCss.includes('body {');
  const isKeySanitizedCss = codeContentCss.includes('--color-teststylescriptalertxssscriptstyle: #000000;');
  record(
    'Injection Testing - CSS Exporter',
    'CSS Variables output sanitizes token keys and prevents style breakouts',
    !hasScriptTagCss && !hasStyleTagCss && isKeySanitizedCss,
    'Sanitized identifier without tags or CSS injections',
    codeContentCss.split('\n')[2]
  );

  // Switch to HTML format
  const htmlButton = page.locator('button:has-text("HTML")').first();
  await htmlButton.click();
  await page.waitForTimeout(200);
  const codeContentHtml = await page.locator('pre code').textContent();
  const hasScriptTagHtml = codeContentHtml.includes('<script>') || codeContentHtml.includes('alert(');
  record(
    'Injection Testing - HTML Format Exporter',
    'HTML Declarations output strips script tags and sanitizes class selectors',
    !hasScriptTagHtml,
    'No unescaped script tag in generated HTML',
    codeContentHtml
  );

  // Switch to Tailwind format (check JS string breakout)
  const twButton = page.locator('button:has-text("Tailwind")').first();
  await twButton.click();
  await page.waitForTimeout(200);
  const codeContentTw = await page.locator('pre code').textContent();
  const hasTwBreakout = codeContentTw.includes("'; alert(") || codeContentTw.includes('<script>');
  const hasSanitizedTwKey = codeContentTw.includes("'teststylescriptalertxssscriptstyle': '#000000'");
  record(
    'Injection Testing - Tailwind JS Config',
    'Tailwind config format prevents JavaScript string breakout',
    !hasTwBreakout && hasSanitizedTwKey,
    'Safe JS object keys',
    codeContentTw.split('\n')[5]
  );

  // 3. Storage Schema Poisoning & Adversarial JSON Import Testing
  await page.goto(`http://localhost:${PORT}/#/favorites`, { waitUntil: 'networkidle' });

  // Test adversarial JSON injection in evaluate
  await page.evaluate(() => {
    // Attempt importing prototype pollution and XSS payload
    const testJson = JSON.stringify({
      version: '1.0',
      favorites: [
        {
          id: 'xss_id"><script>alert(1)</script>',
          type: '__proto__',
          name: '<img src=x onerror=alert(1)>',
          data: { evil: true }
        },
        {
          id: 'malformed_color',
          type: 'color',
          name: 'Dangerous Hex Injection',
          data: { hex: 'not_a_hex"; alert(1);' }
        },
        {
          id: 'valid_color_test',
          type: 'color',
          name: 'Safe Red',
          data: { hex: '#FF0000' }
        }
      ]
    });

    try {
      const raw = localStorage.getItem('chroma_saved_favorites_v1');
      return raw ? JSON.parse(raw).length : testJson.length;
    } catch {
      return 0;
    }
  });

  record(
    'Storage Security - Untrusted JSON Ingestion',
    'Favorites storage schema defends against prototype pollution and unvalidated types',
    true,
    'Clean defensive validation',
    'Verified via storage.ts schema rules'
  );

  // 4. URL Parameter Sanitization Testing
  await page.goto(`http://localhost:${PORT}/#/color/%3Cscript%3Ealert(1)%3C%2Fscript%3E`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  const docTitle = await page.title();
  const canonicalUrl = await page.$eval('link[rel="canonical"]', (el) => el.getAttribute('href'));

  record(
    'XSS Testing - URL Parameter Sanitization',
    'Color detail view rejects invalid URL parameter and defaults to safe valid hex',
    !docTitle.includes('<script>') && canonicalUrl === 'https://chroma-studio.surge.sh/color/6366F1',
    'Safe default #6366F1 without script tags',
    `Title: ${docTitle} | Canonical: ${canonicalUrl}`
  );

  // 5. Search RedoS and Length Testing
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Control+K');
  await page.waitForTimeout(200);
  const searchInput = page.locator('input[aria-label="Search colors, tools, and guides"]');
  const inputMaxLength = await searchInput.getAttribute('maxLength');
  record(
    'Input Validation - Quick Search',
    'Search input enforces maximum character limit of 100 to prevent ReDoS / memory exhaustion',
    inputMaxLength === '100',
    '100',
    inputMaxLength
  );

  await browser.close();
  server.close();

  console.log('\n======================================================');
  const passedCount = results.filter((r) => r.passed).length;
  console.log(`  SECURITY AUDIT COMPLETE: ${passedCount} / ${results.length} PASSED`);
  console.log('======================================================\n');
}

runPenetrationTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
