import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const findings = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');

  // 1. Target blank without rel="noopener noreferrer"
  const targetBlankRegex = /<a\s+[^>]*target=["']_blank["'][^>]*>/gi;
  let match;
  while ((match = targetBlankRegex.exec(content)) !== null) {
    const tag = match[0];
    if (!tag.includes('rel=') || (!tag.includes('noopener') && !tag.includes('noreferrer'))) {
      findings.push({
        type: 'Reverse Tabnabbing',
        file: relPath,
        detail: tag,
        severity: 'Medium',
      });
    }
  }

  // 2. Hardcoded secrets or tokens
  const secretRegex = /(api[_-]?key|secret|password|token|bearer|auth[_-]?key)\s*[:=]\s*["'][a-zA-Z0-9_-]{16,}["']/gi;
  while ((match = secretRegex.exec(content)) !== null) {
    if (!match[0].includes('SURGE_TOKEN') && !match[0].includes('dummy') && !match[0].includes('example')) {
      findings.push({
        type: 'Potential Secret',
        file: relPath,
        detail: match[0].substring(0, 30) + '...',
        severity: 'High',
      });
    }
  }

  // 3. Unsafe eval or Function constructor
  if (/\beval\s*\(/.test(content)) {
    findings.push({
      type: 'Unsafe Eval',
      file: relPath,
      detail: 'eval() invocation detected',
      severity: 'Critical',
    });
  }
  if (/new\s+Function\s*\(/.test(content)) {
    findings.push({
      type: 'Function Constructor',
      file: relPath,
      detail: 'new Function() invocation detected',
      severity: 'High',
    });
  }
}

function scanDir(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'dist'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(item)) {
      checkFile(full);
    }
  }
}

scanDir(path.join(rootDir, 'src'));
scanDir(path.join(rootDir, 'public'));
checkFile(path.join(rootDir, 'index.html'));

console.log(JSON.stringify(findings, null, 2));
