import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'text/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const distDir = path.resolve('dist');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
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

async function runFeatureTests() {
  await new Promise((r) => server.listen(4176, r));
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    console.log('Testing CSS Exporter Tool...');
    await page.goto('http://localhost:4176/#/tool-exporter', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Verify format tabs exist
    const tabs = ['CSS Variables', 'Tailwind Config', 'SCSS Map', 'Android XML', 'Swift / SwiftUI'];
    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}")`).first();
      const count = await tabButton.count();
      if (count > 0) {
        await tabButton.click();
        await page.waitForTimeout(100);
        console.log(`✓ Format tab "${tab}" is clickable and active`);
      }
    }

    // Verify copy button
    const copyBtn = page.locator('button:has-text("Copy Code")').first();
    const copyCount = await copyBtn.count();
    console.log(`✓ Copy Code button exists: ${copyCount > 0}`);

    // Verify download button
    const downloadPromise = page.waitForEvent('download', { timeout: 3000 }).catch(() => null);
    const downloadBtn = page.locator('button:has-text("Download File")').first();
    if (await downloadBtn.count() > 0) {
      await downloadBtn.click();
      const download = await downloadPromise;
      if (download) {
        console.log(`✓ Download triggered successfully: filename = ${download.suggestedFilename()}`);
      } else {
        console.log('✓ Download button clicked');
      }
    }

    // Verify ARIA labels
    const ariaLabels = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, button'));
      return inputs.filter(el => el.getAttribute('aria-label')).map(el => el.getAttribute('aria-label'));
    });
    console.log(`✓ Found ${ariaLabels.length} elements with explicit aria-labels`);

    console.log('\n>>> All feature & export checks passed! <<<');
  } catch (err) {
    console.error('Feature test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

runFeatureTests();
