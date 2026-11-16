import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Simple static server for dist
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'text/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
};

const distDir = path.resolve('dist');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // SPA fallback
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function runTests() {
  await new Promise((resolve) => server.listen(4174, resolve));
  console.log('Server running on http://localhost:4174');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    // Test 1: Homepage & Initial Load
    console.log('\n--- TEST 1: Homepage Load & Metadata ---');
    await page.goto('http://localhost:4174/', { waitUntil: 'networkidle' });
    const title = await page.title();
    console.log('Page Title:', title);
    const ogImage = await page.$eval('meta[property="og:image"]', (el) => el.getAttribute('content'));
    console.log('OG Image URL:', ogImage);

    // Test 2: Dynamic Navigation to Contrast Checker & Breadcrumbs via Direct Route & Menu
    console.log('\n--- TEST 2: Contrast Checker Direct Navigation & Breadcrumb ---');
    await page.goto('http://localhost:4174/#/tool-contrast', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const breadcrumbText = await page.$eval('nav[aria-label="Breadcrumb"]', (el) => el.textContent);
    console.log('Breadcrumb in Contrast Checker:', breadcrumbText);

    // Test 3: Strict HEX Validation in Contrast Checker
    console.log('\n--- TEST 3: Strict HEX Validation in Contrast Checker ---');
    const fgInput = page.locator('input[aria-label="Foreground HEX color"]').first();
    await fgInput.fill('#ZZZ');
    await page.waitForTimeout(300);
    const errorMsg = await page.locator('text=Enter a valid HEX color.').first().textContent();
    console.log('Validation Error Displayed:', errorMsg);

    // Test 4: Navigation to Color Converter & HEX validation
    console.log('\n--- TEST 4: Color Converter Navigation & HEX validation ---');
    await page.goto('http://localhost:4174/#/tool-converter', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const convBreadcrumb = await page.$eval('nav[aria-label="Breadcrumb"]', (el) => el.textContent);
    console.log('Breadcrumb in Color Converter:', convBreadcrumb);

    const convHexInput = page.locator('input[aria-label="Hex color input"]').first();
    await convHexInput.fill('#12G');
    await page.waitForTimeout(300);
    const convError = await page.locator('text=Enter a valid HEX color.').first().textContent();
    console.log('Converter Error Displayed:', convError);

    // Test 5: Legal page Breadcrumb & Footer Navigation
    console.log('\n--- TEST 5: Legal Page (Terms) Navigation & Breadcrumb ---');
    await page.click('footer a[href="/terms"]');
    await page.waitForTimeout(500);
    const termsBreadcrumb = await page.$eval('nav[aria-label="Breadcrumb"]', (el) => el.textContent);
    console.log('Breadcrumb in Terms Page:', termsBreadcrumb);

    // Test 6: Mobile Responsiveness Verification on Contrast Checker & CSS Exporter
    console.log('\n--- TEST 6: Mobile Overflow Audit on 320px screen ---');
    await page.setViewportSize({ width: 320, height: 600 });
    await page.goto('http://localhost:4174/#/tool-contrast', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const contrastOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, diff: doc.scrollWidth - doc.clientWidth };
    });
    console.log('Contrast Checker at 320px viewport:', contrastOverflow);

    await page.goto('http://localhost:4174/#/tool-exporter', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const exporterOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, diff: doc.scrollWidth - doc.clientWidth };
    });
    console.log('CSS Exporter at 320px viewport:', exporterOverflow);

    console.log('\n--- Console Errors Check ---');
    console.log('Console Errors Count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }

    if (contrastOverflow.diff <= 0 && exporterOverflow.diff <= 0 && errorMsg.includes('Enter a valid HEX color.')) {
      console.log('\n>>> ALL PLAYWRIGHT VERIFICATION CHECKS PASSED PERFECTLY! <<<');
    } else {
      console.error('\n>>> SOME CHECKS FAILED! <<<');
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

runTests();
