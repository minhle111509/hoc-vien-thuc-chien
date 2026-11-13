import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {server} from '../server/ai.js';

let base;
before(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(r => server.close(r)));

test('serves index.html with security headers', async () => {
  const r = await fetch(base + '/');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type'), /text\/html/);
  assert.match(r.headers.get('content-security-policy'), /default-src 'self'/);
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.match(await r.text(), /HỌC VIỆN THỰC CHIẾN/);
});

test('serves app modules as JavaScript', async () => {
  const r = await fetch(base + '/src/ui/app.js');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type'), /text\/javascript/);
});

test('blocks server source, tests, dotfiles and traversal', async () => {
  for (const path of ['/server/ai.js', '/tests/engine.test.js', '/scripts/install-phaser.mjs', '/.env', '/package.json', '/%2e%2e/%2e%2e/windows/win.ini', '/src/%2e%2e/server/ai.js']) {
    const r = await fetch(base + path);
    assert.ok([403, 404].includes(r.status), `${path} returned ${r.status}`);
  }
});

test('rejects malformed URL encoding', async () => {
  const r = await fetch(base + '/%E0%A4%A');
  assert.equal(r.status, 400);
});

test('health reports AI configuration', async () => {
  const r = await fetch(base + '/api/health');
  const body = await r.json();
  assert.equal(body.ok, true);
  assert.equal(typeof body.aiConfigured, 'boolean');
});

test('evaluate validates method, content type, JSON and size', async () => {
  assert.equal((await fetch(base + '/api/evaluate')).status, 405);
  assert.equal((await fetch(base + '/api/evaluate', {method: 'POST', body: '{}', headers: {'Content-Type': 'text/plain'}})).status, 415);
  const post = body => fetch(base + '/api/evaluate', {method: 'POST', headers: {'Content-Type': 'application/json'}, body});
  assert.equal((await post('not json')).status, 400);
  assert.equal((await post(JSON.stringify({type: 'hack', lesson: '', artifact: 'x'.repeat(30), reflection: ''}))).status, 400);
  assert.equal((await post(JSON.stringify({type: 'grade', lesson: '', artifact: 'short', reflection: ''}))).status, 400);
  const big = await post(JSON.stringify({type: 'grade', lesson: '', artifact: 'x'.repeat(20000), reflection: ''})).catch(() => ({status: 413}));
  assert.equal(big.status, 413);
});

test('valid request without API key reports unavailable, never a fake score', async (t) => {
  if (process.env.OPENAI_API_KEY) return t.skip('real key configured');
  const r = await fetch(base + '/api/evaluate', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({type: 'grade', lesson: 'Bài 1', artifact: 'Sản phẩm thử nghiệm đủ dài để chấm.', reflection: ''})});
  assert.equal(r.status, 200);
  const body = await r.json();
  assert.equal(body.mode, 'unavailable');
  assert.equal(body.result, undefined);
});
