import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, resolve, sep} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '127.0.0.1';
const KEY = process.env.OPENAI_API_KEY || '';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const API_TOKEN = process.env.ACADEMY_API_TOKEN || '';
const MAX_DAILY = Math.max(1, Number(process.env.ACADEMY_DAILY_AI_LIMIT || 30));
const MAX_PER_MINUTE = 6;
const MAX_BODY_BYTES = 15000;
const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost', '::1']);

// Serve files relative to the project folder, not the shell's current directory,
// so `node academy/server/ai.js` from a parent folder still serves the right site.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

const types = new Set(['feedback', 'grade']);
const quotas = new Map();
const daily = new Map();

export function allowDaily(key, now = Date.now()) {
  const day = new Date(now).toISOString().slice(0, 10);
  // Drop records from previous days so the map cannot grow forever.
  for (const [k, v] of daily) if (v.day !== day) daily.delete(k);
  const record = daily.get(key);
  if (!record) {
    daily.set(key, {day, count: 1});
    return true;
  }
  if (record.count >= MAX_DAILY) return false;
  record.count++;
  return true;
}

export function allowRequest(key, now = Date.now()) {
  for (const [k, v] of quotas) if (now - v.start > 60000) quotas.delete(k);
  const q = quotas.get(key);
  if (!q) {
    quotas.set(key, {start: now, count: 1});
    return true;
  }
  if (q.count >= MAX_PER_MINUTE) return false;
  q.count++;
  return true;
}

const clean = s => String(s || '').slice(0, 5000);

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function send(res, status, obj) {
  if (res.headersSent) return;
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(obj));
}

export async function evaluate({type, lesson, artifact, reflection}) {
  if (!types.has(type)) throw Error('Invalid evaluation type');
  if (!KEY) return {mode: 'unavailable', message: 'Chưa cấu hình AI máy chủ. Bài vẫn có thể học ngoại tuyến; không có điểm AI độc lập.'};
  const system = type === 'grade'
    ? 'Bạn là giám khảo độc lập cho bài thực hành của học viên. Chấm đúng năng lực, không chấm theo độ dài. Trả về JSON với score (0-100), criteria (object gồm relevance,reasoning,verification,originality mỗi mục 0-25), strengths (array), improvements (array), confidence (low|medium|high). Không tự suy đoán đã kiểm chứng sản phẩm ngoài đời. Nếu thiếu minh chứng, chấm thấp và nói rõ.'
    : 'Bạn là giáo viên hướng dẫn học viên tuổi teen. Đưa phản hồi thực tế, cụ thể, xây dựng, không khen quá mức. Trả về JSON với feedback (string), nextSteps (array), questions (array). Không khẳng định điều chưa kiểm chứng.';
  const body = {
    model: MODEL,
    temperature: 0.2,
    response_format: {type: 'json_object'},
    messages: [
      {role: 'system', content: system},
      {role: 'user', content: JSON.stringify({lesson: clean(lesson), artifact: clean(artifact), reflection: clean(reflection)})},
    ],
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${KEY}`},
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!r.ok) throw Error('AI provider error ' + r.status);
    const d = await r.json();
    const result = JSON.parse(d.choices?.[0]?.message?.content || '{}');
    if (!result || typeof result !== 'object' || Array.isArray(result)) throw Error('Invalid AI result');
    const strings = v => (Array.isArray(v) ? v.filter(x => typeof x === 'string').slice(0, 10) : []);
    if (type === 'grade') {
      const v = result.criteria || {};
      const keys = ['relevance', 'reasoning', 'verification', 'originality'];
      const vals = keys.map(k => Number(v[k]));
      if (vals.some(n => !Number.isFinite(n) || n < 0 || n > 25)) throw Error('Invalid AI rubric');
      return {mode: 'live', type, result: {
        score: vals.reduce((a, b) => a + b, 0),
        criteria: Object.fromEntries(keys.map((k, i) => [k, vals[i]])),
        strengths: strings(result.strengths),
        improvements: strings(result.improvements),
        confidence: ['low', 'medium', 'high'].includes(result.confidence) ? result.confidence : 'low',
      }};
    }
    if (typeof result.feedback !== 'string') throw Error('Invalid AI feedback');
    return {mode: 'live', type, result: {feedback: result.feedback, nextSteps: strings(result.nextSteps), questions: strings(result.questions)}};
  } finally {
    clearTimeout(timeout);
  }
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};
const BLOCKED_PREFIXES = ['/server/', '/tests/', '/scripts/', '/node_modules/', '/.', '/package.json', '/package-lock.json'];

async function readBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function handleEvaluate(req, res) {
  if (API_TOKEN && req.headers['x-academy-token'] !== API_TOKEN) return send(res, 401, {error: 'Yêu cầu mã truy cập AI (ACADEMY_API_TOKEN).'});
  if (!LOCAL_HOSTS.has(HOST) && !API_TOKEN) return send(res, 503, {error: 'AI API chưa được bảo vệ. Cần ACADEMY_API_TOKEN trước khi triển khai công khai.'});
  if (!String(req.headers['content-type'] || '').includes('application/json')) return send(res, 415, {error: 'Cần Content-Type: application/json'});
  const ip = req.socket.remoteAddress || 'local';
  const input = await readBody(req);
  if (input === null) {
    send(res, 413, {error: 'Payload too large'});
    req.destroy();
    return;
  }
  let body;
  try { body = JSON.parse(input); } catch { return send(res, 400, {error: 'Invalid JSON'}); }
  if (!body || !types.has(body.type)) return send(res, 400, {error: 'Invalid type'});
  if (typeof body.artifact !== 'string' || typeof body.lesson !== 'string' || typeof body.reflection !== 'string') return send(res, 400, {error: 'Invalid payload'});
  if (body.artifact.trim().length < 20) return send(res, 400, {error: 'Bài thực hành quá ngắn'});
  // Quotas are counted only for well-formed requests, so typos do not burn the daily allowance.
  if (!allowRequest(ip)) return send(res, 429, {error: `Đã đạt giới hạn ${MAX_PER_MINUTE} yêu cầu/phút. Vui lòng thử lại sau.`});
  if (!allowDaily(ip)) return send(res, 429, {error: 'Đã đạt hạn mức AI trong ngày.'});
  try {
    return send(res, 200, await evaluate(body));
  } catch (e) {
    console.error('[ai] evaluate failed:', e.name === 'AbortError' ? 'timeout' : e.message);
    return send(res, 502, {error: 'AI không phản hồi. Hãy thử lại sau.'});
  }
}

async function handleStatic(req, res) {
  let path;
  try { path = decodeURIComponent((req.url || '/').split('?')[0]); } catch { return send(res, 400, {error: 'Bad request'}); }
  if (path.includes('\0')) return send(res, 400, {error: 'Bad request'});
  const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
  if (file !== root && !file.startsWith(root + sep)) return send(res, 403, {error: 'Forbidden'});
  const rel = '/' + file.slice(root.length + 1).split(sep).join('/');
  const ext = extname(file).toLowerCase();
  if (!mime[ext] || BLOCKED_PREFIXES.some(p => rel.startsWith(p)) || rel.includes('/node_modules/') || rel.includes('/.')) return send(res, 404, {error: 'Not found'});
  try {
    const bytes = await readFile(file);
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      'Content-Type': mime[ext],
      'Cache-Control': 'no-cache',
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; img-src 'self' data: blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {
    return send(res, 404, {error: 'Not found'});
  }
}

export const server = createServer(async (req, res) => {
  try {
    const url = (req.url || '/').split('?')[0];
    if (url === '/api/health') return send(res, 200, {ok: true, aiConfigured: !!KEY, tokenRequired: !!API_TOKEN});
    if (url === '/api/evaluate') {
      if (req.method !== 'POST') return send(res, 405, {error: 'Method not allowed'});
      return await handleEvaluate(req, res);
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, {error: 'Method not allowed'});
    return await handleStatic(req, res);
  } catch (e) {
    console.error('[server] unexpected error:', e);
    return send(res, 500, {error: 'Internal error'});
  }
});

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  server.on('error', e => {
    if (e.code === 'EADDRINUSE') console.error(`Cổng ${PORT} đang được dùng. Tắt chương trình khác hoặc đặt PORT khác, ví dụ: $env:PORT=8081; npm run serve`);
    else console.error(e);
    process.exit(1);
  });
  server.listen(PORT, HOST, () => console.log(`Học viện 1.0: http://localhost:${PORT} • AI ${KEY ? 'đã cấu hình' : 'chưa cấu hình'}${API_TOKEN ? ' • cần mã truy cập' : ''}`));
}
