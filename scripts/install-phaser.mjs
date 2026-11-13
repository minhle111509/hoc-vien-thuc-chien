import {mkdir, copyFile, access} from 'node:fs/promises';
import {execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

// Always work inside the project folder, whatever directory the command is run from.
const root = fileURLToPath(new URL('..', import.meta.url));
const source = join(root, 'node_modules', 'phaser', 'dist', 'phaser.min.js');
const target = join(root, 'vendor', 'phaser.min.js');

const exists = p => access(p).then(() => true, () => false);

try {
  if (!(await exists(source))) {
    // execSync runs through the shell, which is required for npm.cmd on Windows.
    execSync('npm install --no-audit --no-fund', {cwd: root, stdio: 'inherit'});
  }
  if (!(await exists(source))) throw Error('Không tìm thấy node_modules/phaser/dist/phaser.min.js sau khi cài.');
  await mkdir(join(root, 'vendor'), {recursive: true});
  await copyFile(source, target);
  console.log('Phaser 3 đã sẵn sàng trong vendor/phaser.min.js');
} catch (e) {
  console.error('Cài Phaser thất bại:', e.message);
  console.error('Kiểm tra kết nối mạng, sau đó chạy lại: npm run setup:phaser');
  process.exit(1);
}
