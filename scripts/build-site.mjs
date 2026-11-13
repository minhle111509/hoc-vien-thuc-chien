// Builds a static copy of the website in dist/ for any static host (GitHub Pages, Netlify,
// Cloudflare Pages, a claude.ai artifact). The AI feedback API is not included: without the
// Node server the site still works fully offline and says the AI is unavailable.
// Usage: npm run build:site
import {cp, mkdir, readFile, rm, writeFile, access} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const exists = p => access(p).then(() => true, () => false);

await rm(dist, {recursive: true, force: true});
await mkdir(dist, {recursive: true});
await cp(join(root, 'src'), join(dist, 'src'), {recursive: true});
for (const dir of ['vendor', 'tai-lieu']) if (await exists(join(root, dir))) await cp(join(root, dir), join(dist, dir), {recursive: true});

const html = await readFile(join(root, 'index.html'), 'utf8');
await writeFile(join(dist, 'index.html'), html);
// Body-only variant: the claude.ai artifact host adds its own <html>/<head>/<body> skeleton.
const inner = html
  .replace(/<!doctype html>/i, '')
  .replace(/<\/?html[^>]*>/gi, '')
  .replace(/<\/?head>/gi, '')
  .replace(/<\/?body>/gi, '')
  .replace(/<meta charset="utf-8">/i, '')
  .replace(/<meta name="viewport"[^>]*>/i, '');
await writeFile(join(dist, 'artifact-page.html'), inner.trim() + '\n');
await writeFile(join(dist, '404.html'), html);
console.log('Đã tạo bản web tĩnh trong dist/');
