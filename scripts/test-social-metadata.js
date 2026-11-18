import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('======================================================');
console.log('  CHROMA STUDIO SOCIAL METADATA & CRAWLER VERIFICATION');
console.log('======================================================\n');

let allPassed = true;
function assert(desc, condition, actual) {
  if (condition) {
    console.log(`[PASS] ${desc}`);
  } else {
    console.error(`[FAIL] ${desc} (Actual: ${actual})`);
    allPassed = false;
  }
}

// 1. Verify robots.txt rules
const publicRobots = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
const distRobots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');

assert('public/robots.txt allows facebookexternalhit', publicRobots.includes('User-agent: facebookexternalhit\nAllow: /'), 'Missing');
assert('public/robots.txt allows Facebot', publicRobots.includes('User-agent: Facebot\nAllow: /'), 'Missing');
assert('public/robots.txt allows Twitterbot', publicRobots.includes('User-agent: Twitterbot\nAllow: /'), 'Missing');
assert('dist/robots.txt allows facebookexternalhit', distRobots.includes('User-agent: facebookexternalhit\nAllow: /'), 'Missing');
assert('dist/robots.txt has Sitemap', distRobots.includes('Sitemap: https://chroma-studio.surge.sh/sitemap.xml'), 'Missing');

// 2. Verify og-image.png exists and dimensions in both public and dist
function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), size: buf.length };
}

const publicImg = getPngDimensions(path.join(rootDir, 'public/og-image.png'));
const distImg = getPngDimensions(path.join(distDir, 'og-image.png'));

assert('public/og-image.png is 1200x630', publicImg.width === 1200 && publicImg.height === 630, `${publicImg.width}x${publicImg.height}`);
assert('dist/og-image.png is 1200x630', distImg.width === 1200 && distImg.height === 630, `${distImg.width}x${distImg.height}`);
assert('og-image.png file size is healthy (>50KB)', distImg.size > 50000, `${distImg.size} bytes`);

// 3. Verify HTML Document Metadata in dist/index.html and dist/200.html
const htmlFiles = [path.join(distDir, 'index.html'), path.join(distDir, '200.html')];

for (const file of htmlFiles) {
  const fileName = path.basename(file);
  const html = fs.readFileSync(file, 'utf8');

  assert(`${fileName} contains fb:app_id = 1010345392089286`, html.includes('content="1010345392089286"'), 'Missing');
  assert(`${fileName} contains og:type = website`, html.includes('property="og:type" content="website"'), 'Missing');
  assert(`${fileName} contains og:site_name = Chroma Studio`, html.includes('property="og:site_name" content="Chroma Studio"'), 'Missing');
  assert(`${fileName} contains og:title matching requirement`, html.includes('property="og:title" content="Chroma Studio – Free Online Color Tools &amp; Palette Generator"'), 'Missing or mismatch');
  assert(`${fileName} contains og:description matching requirement`, html.includes('Explore, create and convert colors with Chroma Studio. Generate beautiful color palettes, gradients, shades and tints, extract colors from images, and use professional color tools for free.'), 'Missing or mismatch');
  assert(`${fileName} contains og:url = https://chroma-studio.surge.sh/`, html.includes('property="og:url" content="https://chroma-studio.surge.sh/"'), 'Missing');
  assert(`${fileName} contains og:image = https://chroma-studio.surge.sh/og-image.png`, html.includes('property="og:image" content="https://chroma-studio.surge.sh/og-image.png"'), 'Missing');
  assert(`${fileName} contains og:image:width = 1200`, html.includes('property="og:image:width" content="1200"'), 'Missing');
  assert(`${fileName} contains og:image:height = 630`, html.includes('property="og:image:height" content="630"'), 'Missing');
  assert(`${fileName} contains og:image:alt`, html.includes('property="og:image:alt" content="Chroma Studio – Professional Free Online Color Tools"'), 'Missing');
  assert(`${fileName} contains twitter:card = summary_large_image`, html.includes('name="twitter:card" content="summary_large_image"'), 'Missing');
  assert(`${fileName} contains twitter:title`, html.includes('name="twitter:title" content="Chroma Studio – Free Online Color Tools &amp; Palette Generator"'), 'Missing');
  assert(`${fileName} contains twitter:image = https://chroma-studio.surge.sh/og-image.png`, html.includes('name="twitter:image" content="https://chroma-studio.surge.sh/og-image.png"'), 'Missing');
}

// 4. Test Local Crawler Simulation
const PORT = 4185;
const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const filePath = path.join(distDir, p);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html; charset=UTF-8' : ext === '.png' ? 'image/png' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  const testUas = [
    { name: 'facebookexternalhit/1.1', ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' },
    { name: 'Facebot', ua: 'Facebot' },
    { name: 'WhatsApp/2.21', ua: 'WhatsApp/2.21.12.21 A' },
    { name: 'Twitterbot/1.0', ua: 'Twitterbot/1.0' },
  ];

  for (const crawler of testUas) {
    await new Promise((resolve) => {
      http.get(`http://localhost:${PORT}/`, { headers: { 'User-Agent': crawler.ua } }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          assert(`Crawler ${crawler.name} receives HTTP 200 on /`, res.statusCode === 200, res.statusCode);
          assert(`Crawler ${crawler.name} extracts og:title`, body.includes('Chroma Studio – Free Online Color Tools &amp; Palette Generator'), 'Missing title');
          assert(`Crawler ${crawler.name} extracts og:image`, body.includes('https://chroma-studio.surge.sh/og-image.png'), 'Missing image');
          assert(`Crawler ${crawler.name} extracts fb:app_id`, body.includes('1010345392089286'), 'Missing fb:app_id');
          resolve();
        });
      });
    });

    await new Promise((resolve) => {
      http.get(`http://localhost:${PORT}/robots.txt`, { headers: { 'User-Agent': crawler.ua } }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          assert(`Crawler ${crawler.name} receives HTTP 200 on /robots.txt`, res.statusCode === 200, res.statusCode);
          assert(`Crawler ${crawler.name} robots.txt allows access`, body.includes('Allow: /'), 'No Allow');
          resolve();
        });
      });
    });

    await new Promise((resolve) => {
      http.get(`http://localhost:${PORT}/og-image.png`, { headers: { 'User-Agent': crawler.ua } }, (res) => {
        assert(`Crawler ${crawler.name} receives HTTP 200 on /og-image.png`, res.statusCode === 200, res.statusCode);
        assert(`Crawler ${crawler.name} receives image/png content type`, res.headers['content-type'] === 'image/png', res.headers['content-type']);
        resolve();
      });
    });
  }

  server.close(() => {
    console.log('\n======================================================');
    console.log(`  SOCIAL METADATA VERIFICATION: ${allPassed ? 'ALL PASSED' : 'SOME FAILED'}`);
    console.log('======================================================\n');
    process.exit(allPassed ? 0 : 1);
  });
});
