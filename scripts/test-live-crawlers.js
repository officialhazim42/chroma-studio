import https from 'https';

const userAgents = {
  'Normal Browser': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'facebookexternalhit/1.1': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  'Facebot': 'Facebot',
  'WhatsApp': 'WhatsApp/2.21.12.21 A',
  'Twitterbot': 'Twitterbot/1.0',
  'Googlebot': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'curl': 'curl/7.88.1'
};

const urls = [
  'https://chroma-studio.surge.sh/',
  'https://chroma-studio.surge.sh/robots.txt',
  'https://chroma-studio.surge.sh/sitemap.xml',
  'https://chroma-studio.surge.sh/og-image.png'
];

async function checkUrl(url, uaName, ua) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': ua } }, (res) => {
      let data = '';
      res.on('data', chunk => { if (data.length < 500) data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          uaName,
          status: res.statusCode,
          headers: res.headers,
          contentType: res.headers['content-type'],
          preview: data.substring(0, 150).replace(/\r?\n|\r/g, ' ')
        });
      });
    });
    req.on('error', (err) => resolve({ url, uaName, error: err.message }));
  });
}

async function run() {
  for (const url of urls) {
    console.log(`\n=== Testing: ${url} ===`);
    for (const [name, ua] of Object.entries(userAgents)) {
      const res = await checkUrl(url, name, ua);
      console.log(`[${res.status || 'ERR'}] ${name.padEnd(25)} -> ${res.contentType || res.error || ''}`);
      if (res.status === 403 || res.status >= 400) {
        console.log(`     Response headers:`, JSON.stringify(res.headers));
        console.log(`     Body preview:`, res.preview);
      }
    }
  }
}

run();
