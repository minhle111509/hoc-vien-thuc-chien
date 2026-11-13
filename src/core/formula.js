// A tiny spreadsheet formula engine for beginner lessons. Supports numbers, text, cell references
// (A1, $A$1), ranges (A1:B5), + - * / &, comparisons, and SUM, AVERAGE, COUNT, MIN, MAX, IF,
// COUNTIF, SUMIF. Arguments may be separated by "," or ";" (Vietnamese Excel). Pure functions only.

export const ERR = code => ({error: code});
export const isErr = v => v && typeof v === 'object' && 'error' in v;

const colToNum = c => [...c].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
const numToCol = n => { let s = ''; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
export const parseRef = ref => { const m = /^\$?([A-Z]+)\$?(\d+)$/.exec(ref.toUpperCase()); return m ? {col: colToNum(m[1]), row: Number(m[2])} : null; };
export const refName = (col, row) => numToCol(col) + row;

function tokenize(src) {
  const tokens = [];
  let i = 0;
  const s = src.replace(/[“”„]/g, '"');
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === '"') { let j = i + 1; while (j < s.length && s[j] !== '"') j++; if (j >= s.length) throw Error('Thiếu dấu " đóng chuỗi'); tokens.push({t: 'str', v: s.slice(i + 1, j)}); i = j + 1; continue; }
    // Only "." is a decimal point; "," and ";" always separate arguments.
    const dec = /^\d+(?:\.\d+)?/.exec(s.slice(i));
    if (dec && !/^[A-Za-z$]/.test(s.slice(i + dec[0].length))) { tokens.push({t: 'num', v: Number(dec[0])}); i += dec[0].length; continue; }
    const ref = /^\$?[A-Za-z]{1,2}\$?\d+(?::\$?[A-Za-z]{1,2}\$?\d+)?/.exec(s.slice(i));
    if (ref) { tokens.push({t: ref[0].includes(':') ? 'range' : 'ref', v: ref[0].toUpperCase()}); i += ref[0].length; continue; }
    const id = /^[A-Za-zÀ-ỹ_][A-Za-zÀ-ỹ0-9_.]*/.exec(s.slice(i));
    if (id) { tokens.push({t: 'id', v: id[0].toUpperCase()}); i += id[0].length; continue; }
    const op = /^(>=|<=|<>|[-+*/&=<>(),;:])/.exec(s.slice(i));
    if (op) { tokens.push({t: 'op', v: op[0] === ';' ? ',' : op[0]}); i += op[0].length; continue; }
    throw Error(`Ký tự lạ: ${ch}`);
  }
  return tokens;
}

function parse(tokens) {
  let p = 0;
  const peek = () => tokens[p];
  const eat = v => { const t = tokens[p]; if (!t || (v && t.v !== v)) throw Error(v ? `Thiếu “${v}”` : 'Công thức chưa xong'); p++; return t; };
  const isOp = (...vs) => peek()?.t === 'op' && vs.includes(peek().v);
  function comparison() { let a = concat(); if (isOp('=', '<>', '>', '<', '>=', '<=')) { const op = eat().v; a = {k: 'bin', op, a, b: concat()}; } return a; }
  function concat() { let a = additive(); while (isOp('&')) { eat(); a = {k: 'bin', op: '&', a, b: additive()}; } return a; }
  function additive() { let a = term(); while (isOp('+', '-')) { const op = eat().v; a = {k: 'bin', op, a, b: term()}; } return a; }
  function term() { let a = unary(); while (isOp('*', '/')) { const op = eat().v; a = {k: 'bin', op, a, b: unary()}; } return a; }
  function unary() { if (isOp('-')) { eat(); return {k: 'neg', a: unary()}; } if (isOp('+')) { eat(); return unary(); } return primary(); }
  function primary() {
    const t = peek();
    if (!t) throw Error('Công thức chưa xong');
    if (t.t === 'num') { p++; return {k: 'num', v: t.v}; }
    if (t.t === 'str') { p++; return {k: 'str', v: t.v}; }
    if (t.t === 'ref') { p++; return {k: 'ref', v: t.v}; }
    if (t.t === 'range') { p++; return {k: 'range', v: t.v}; }
    if (t.t === 'id') {
      p++;
      if (t.v === 'TRUE' || t.v === 'FALSE') return {k: 'bool', v: t.v === 'TRUE'};
      eat('(');
      const args = [];
      if (!isOp(')')) { args.push(comparison()); while (isOp(',')) { eat(); args.push(comparison()); } }
      eat(')');
      return {k: 'fn', name: t.v, args};
    }
    if (isOp('(')) { eat('('); const e = comparison(); eat(')'); return e; }
    throw Error(`Không hiểu “${t.v}”`);
  }
  const tree = comparison();
  if (p < tokens.length) throw Error(`Thừa “${tokens[p].v}”`);
  return tree;
}

const toNum = v => { if (isErr(v)) return v; if (v === '' || v === null || v === undefined) return 0; if (typeof v === 'boolean') return v ? 1 : 0; if (typeof v === 'number') return v; const n = Number(String(v).replace(',', '.')); return Number.isFinite(n) ? n : ERR('#VALUE!'); };
const flat = vs => vs.flatMap(v => Array.isArray(v) ? v : [v]);

function criteria(c) {
  if (typeof c === 'number') return v => v === c;
  const m = /^(>=|<=|<>|>|<|=)?(.*)$/.exec(String(c));
  const op = m[1] || '=';
  const raw = m[2];
  const n = Number(raw.replace(',', '.'));
  const numeric = raw !== '' && Number.isFinite(n);
  return v => {
    if (numeric && typeof v === 'number') return ({'=': v === n, '<>': v !== n, '>': v > n, '<': v < n, '>=': v >= n, '<=': v <= n})[op];
    const a = String(v ?? '').toLowerCase(), b = raw.toLowerCase();
    return op === '<>' ? a !== b : op === '=' ? a === b : false;
  };
}

const FN = {
  SUM: args => { const ns = flat(args).filter(v => typeof v === 'number'); return ns.reduce((a, b) => a + b, 0); },
  AVERAGE: args => { const ns = flat(args).filter(v => typeof v === 'number'); return ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERR('#DIV/0!'); },
  COUNT: args => flat(args).filter(v => typeof v === 'number').length,
  MIN: args => Math.min(...flat(args).filter(v => typeof v === 'number')),
  MAX: args => Math.max(...flat(args).filter(v => typeof v === 'number')),
  IF: args => { if (args.length < 2) return ERR('#N/A'); const c = args[0]; if (isErr(c)) return c; return (typeof c === 'boolean' ? c : toNum(c) !== 0) ? args[1] : (args.length > 2 ? args[2] : false); },
  COUNTIF: args => { if (args.length !== 2 || !Array.isArray(args[0])) return ERR('#N/A'); const f = criteria(args[1]); return args[0].filter(f).length; },
  SUMIF: args => { if (args.length < 2 || !Array.isArray(args[0])) return ERR('#N/A'); const f = criteria(args[1]); const sumR = Array.isArray(args[2]) ? args[2] : args[0]; return args[0].reduce((s, v, i) => s + (f(v) && typeof sumR[i] === 'number' ? sumR[i] : 0), 0); },
  // XLOOKUP(lookup, lookup_range, return_range, [if_not_found]) — exact match, case-insensitive like Excel.
  // Spaces are NOT trimmed, as in Excel: "S015 " does not match "S015" (a lesson point).
  XLOOKUP: args => {
    if (args.length < 3 || !Array.isArray(args[1]) || !Array.isArray(args[2])) return ERR('#VALUE!');
    const norm = v => (typeof v === 'string' ? v.toLowerCase() : v);
    const key = norm(args[0]);
    const i = args[1].findIndex(v => norm(v) === key);
    return i >= 0 ? args[2][i] : (args.length > 3 ? args[3] : ERR('#N/A'));
  },
  CORREL: args => {
    if (args.length !== 2 || !Array.isArray(args[0]) || !Array.isArray(args[1]) || args[0].length !== args[1].length) return ERR('#N/A');
    const pairs = args[0].map((x, i) => [x, args[1][i]]).filter(([x, y]) => typeof x === 'number' && typeof y === 'number');
    if (pairs.length < 2) return ERR('#DIV/0!');
    const mx = pairs.reduce((s, [x]) => s + x, 0) / pairs.length, my = pairs.reduce((s, [, y]) => s + y, 0) / pairs.length;
    let sxy = 0, sxx = 0, syy = 0;
    for (const [x, y] of pairs) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2; }
    return sxx && syy ? sxy / Math.sqrt(sxx * syy) : ERR('#DIV/0!');
  },
  ROUND: args => { const x = toNum(args[0]), d = toNum(args[1] ?? 0); if (isErr(x)) return x; const f = 10 ** d; return Math.round(x * f) / f; },
};
FN.PEARSON = FN.CORREL;
FN.TRIM = args => String(args[0] ?? '').trim().replace(/\s+/g, ' ');

function evaluate(node, get) {
  switch (node.k) {
    case 'num': case 'str': case 'bool': return node.v;
    case 'ref': return get(parseRef(node.v));
    case 'range': {
      const [a, b] = node.v.split(':').map(parseRef);
      const out = [];
      for (let r = Math.min(a.row, b.row); r <= Math.max(a.row, b.row); r++) for (let c = Math.min(a.col, b.col); c <= Math.max(a.col, b.col); c++) out.push(get({col: c, row: r}));
      return out;
    }
    case 'neg': { const v = toNum(evaluate(node.a, get)); return isErr(v) ? v : -v; }
    case 'fn': { const f = FN[node.name]; if (!f) return ERR('#NAME?'); const args = node.args.map(a => evaluate(a, get)); const bad = args.find(isErr); return bad || f(args); }
    case 'bin': {
      const a = evaluate(node.a, get), b = evaluate(node.b, get);
      if (isErr(a)) return a; if (isErr(b)) return b;
      if (Array.isArray(a) || Array.isArray(b)) return ERR('#VALUE!');
      if (node.op === '&') return String(a ?? '') + String(b ?? '');
      if (['=', '<>', '>', '<', '>=', '<='].includes(node.op)) {
        const both = typeof a === 'number' && typeof b === 'number';
        const x = both ? a : String(a ?? '').toLowerCase(), y = both ? b : String(b ?? '').toLowerCase();
        return ({'=': x === y, '<>': x !== y, '>': x > y, '<': x < y, '>=': x >= y, '<=': x <= y})[node.op];
      }
      const x = toNum(a), y = toNum(b);
      if (isErr(x)) return x; if (isErr(y)) return y;
      if (node.op === '/' && y === 0) return ERR('#DIV/0!');
      return ({'+': x + y, '-': x - y, '*': x * y, '/': x / y})[node.op];
    }
  }
  return ERR('#VALUE!');
}

// grid: {A1: value, ...}. Returns {value} or {value: ERR, message} for syntax problems.
export function evalFormula(formula, grid) {
  const text = String(formula ?? '').trim();
  if (!text.startsWith('=')) return {value: ERR('#ERROR'), message: 'Công thức phải bắt đầu bằng dấu ='};
  try {
    const tree = parse(tokenize(text.slice(1)));
    const get = pos => { const v = grid[refName(pos.col, pos.row)]; return v === undefined ? '' : v; };
    return {value: evaluate(tree, get), functions: [...text.toUpperCase().matchAll(/([A-Z]+)\s*\(/g)].map(m => m[1])};
  } catch (e) {
    return {value: ERR('#ERROR'), message: e.message};
  }
}

// Copy a formula down by `rows`, shifting row numbers that are not locked with $ (like Excel's fill handle).
export function shiftFormula(formula, rows) {
  let out = '', inStr = false;
  for (let i = 0; i < formula.length; i++) {
    const ch = formula[i];
    if (ch === '"') { inStr = !inStr; out += ch; continue; }
    if (inStr) { out += ch; continue; }
    const m = /^(\$?)([A-Za-z]{1,2})(\$?)(\d+)/.exec(formula.slice(i));
    const prev = formula[i - 1] || '';
    if (m && !/[A-Za-z0-9_]/.test(prev)) {
      const row = m[3] ? Number(m[4]) : Number(m[4]) + rows;
      out += `${m[1]}${m[2].toUpperCase()}${m[3]}${row}`;
      i += m[0].length - 1;
      continue;
    }
    out += ch;
  }
  return out;
}

// Cells a formula reads (for highlighting on the mini sheet).
export function referencedCells(formula) {
  const cells = new Set();
  for (const m of String(formula ?? '').toUpperCase().matchAll(/\$?([A-Z]{1,2})\$?(\d+)(?::\$?([A-Z]{1,2})\$?(\d+))?/g)) {
    const a = parseRef(m[1] + m[2]);
    const b = m[3] ? parseRef(m[3] + m[4]) : a;
    for (let r = Math.min(a.row, b.row); r <= Math.max(a.row, b.row); r++) for (let c = Math.min(a.col, b.col); c <= Math.max(a.col, b.col); c++) cells.add(refName(c, r));
  }
  return cells;
}

export function formatValue(v) {
  if (isErr(v)) return v.error;
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  if (typeof v === 'number') return Number.isInteger(v) ? v.toLocaleString('vi-VN') : v.toLocaleString('vi-VN', {maximumFractionDigits: 2});
  return String(v ?? '');
}
