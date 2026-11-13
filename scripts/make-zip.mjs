// Zips dist/ into hoc-vien-web-hostinger.zip with forward-slash paths (so it extracts correctly on
// Hostinger's Linux servers). Windows: uses the built-in bsdtar (System32\tar.exe), not Git's GNU tar.
import {execFileSync} from 'node:child_process';
import {rmSync, statSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'hoc-vien-web-hostinger.zip');
const items = ['index.html', '404.html', 'src', 'vendor', 'tai-lieu'];
rmSync(out, {force: true});
if (process.platform === 'win32') {
  const tar = join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
  execFileSync(tar, ['-a', '-cf', out, '-C', join(root, 'dist'), ...items], {stdio: 'inherit'});
} else {
  execFileSync('zip', ['-qr', out, ...items], {cwd: join(root, 'dist'), stdio: 'inherit'});
}
console.log(`Đã tạo ${out} (${Math.round(statSync(out).size / 1024)} KB)`);
