// Beginner-friendly interactive pieces for guided lessons:
//  - mountWalkthrough: one step at a time, with plain-language terms and an optional picture
//  - ribbonPicture: a drawn Word/Excel menu bar that circles the button to press
//  - mountSheet: a small spreadsheet where learners type real formulas and see results
//  - mountStyleLab: a mini Word page to practise Heading styles and the Navigation Pane
import {evalFormula, shiftFormula, referencedCells, formatValue, isErr, parseRef, refName} from '../core/formula.js';
import {claudeScreen, chatPicture} from './guided-agent.js';

const h = (tag, cls = '', text = '') => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
const button = (label, fn, cls = '') => { const b = h('button', cls, label); b.type = 'button'; b.addEventListener('click', fn); return b; };

// ---------- Menu bar picture ----------
const TABS = {
  word: ['File', 'Home', 'Insert', 'Design', 'Layout', 'References', 'Mailings', 'Review', 'View'],
  excel: ['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'],
  powerpoint: ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Review', 'View'],
  outlook: ['File', 'Home', 'Send / Receive', 'View', 'Help'],
};
const APP_NAME = {word: 'Word', excel: 'Excel', powerpoint: 'PowerPoint', outlook: 'Outlook'};
const TAB_VI = {Mailings: 'Gửi thư', Design: 'Thiết kế', Transitions: 'Chuyển tiếp', Animations: 'Hoạt hình', 'Slide Show': 'Trình chiếu', 'Send / Receive': 'Gửi / Nhận', Help: 'Trợ giúp', Home: 'Trang đầu', Insert: 'Chèn', Layout: 'Bố trí', 'Page Layout': 'Bố trí trang', References: 'Tham chiếu', Review: 'Xem lại', View: 'Dạng xem', Formulas: 'Công thức', Data: 'Dữ liệu', File: 'Tệp'};

export function ribbonPicture({app = 'word', tab, group, buttons = [], press}) {
  const wrap = h('figure', 'ribbon-pic');
  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', `Thanh menu ${APP_NAME[app]}: thẻ ${tab}${group ? `, nhóm ${group}` : ''}${press ? `, bấm ${press}` : ''}`);
  const bar = h('div', `ribbon-tabs ribbon-${app}`);
  for (const t of TABS[app]) { const s = h('span', t === tab ? 'ribbon-tab on' : 'ribbon-tab', t); bar.append(s); }
  const body = h('div', 'ribbon-body');
  if (group) {
    const g = h('div', 'ribbon-group');
    const row = h('div', 'ribbon-buttons');
    for (const b of buttons) row.append(h('span', b === press ? 'ribbon-btn press' : 'ribbon-btn', b));
    g.append(row, h('div', 'ribbon-group-name', group));
    body.append(g);
  }
  const cap = h('figcaption', 'ribbon-cap', `Thẻ “${tab}”${TAB_VI[tab] ? ` (${TAB_VI[tab]})` : ''}${group ? ` › nhóm “${group}”` : ''}${press ? ` › bấm “${press}”` : ''}`);
  wrap.append(bar, body, cap);
  return wrap;
}

// ---------- Walkthrough ----------
// steps: [{title, text, terms?: {word: meaning}, ribbon?: {...}, sheet?: spec (demo only), tip?}]
export function mountWalkthrough(parent, steps, {onFinish} = {}) {
  const card = h('section', 'card walk');
  const head = h('div', 'walk-head');
  const counter = h('span', 'walk-count');
  const dots = h('div', 'walk-dots');
  head.append(h('h3', '', '🧭 Học từng bước'), counter);
  const body = h('div', 'walk-body');
  const nav = h('div', 'walk-nav');
  let i = 0;
  const prev = button('← Bước trước', () => { if (i > 0) { i--; render(); } });
  const next = button('Bước tiếp →', () => { if (i < steps.length - 1) { i++; render(); } else onFinish?.(); }, 'primary');
  nav.append(prev, next);
  steps.forEach((_, k) => dots.append(button('', () => { i = k; render(); }, 'walk-dot')));
  card.append(head, dots, body, nav);
  parent.append(card);
  function render() {
    const s = steps[i];
    counter.textContent = `Bước ${i + 1}/${steps.length}`;
    [...dots.children].forEach((d, k) => { d.classList.toggle('on', k === i); d.setAttribute('aria-label', `Bước ${k + 1}: ${steps[k].title}`); if (k === i) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current'); });
    body.replaceChildren();
    body.append(h('h4', 'walk-title', s.title));
    for (const para of [].concat(s.text)) body.append(h('p', 'walk-text', para));
    if (s.ribbon) body.append(ribbonPicture(s.ribbon));
    if (s.screen) body.append(claudeScreen(s.screen));
    if (s.chat) body.append(chatPicture(s.chat));
    if (s.sheet) mountSheet(body, s.sheet);
    if (s.terms) {
      const box = h('dl', 'walk-terms');
      for (const [w, m] of Object.entries(s.terms)) box.append(h('dt', '', w), h('dd', '', m));
      body.append(h('p', 'walk-terms-title', '📘 Từ mới trong bước này'), box);
    }
    if (s.code) body.append(h('pre', 'teach-example', s.code));
    if (s.tip) body.append(h('p', 'walk-tip', `💡 ${s.tip}`));
    prev.disabled = i === 0;
    next.textContent = i === steps.length - 1 ? 'Xong, sang phần Thực hành →' : 'Bước tiếp →';
  }
  render();
  return card;
}

// ---------- Mini spreadsheet ----------
// spec: {cells: {A1: ...}, cols, rows, tasks?: [...], demo?: {cell, formula, fillTo?}, caption?}
// task: {cell, prompt, fillTo?, expect: number|string | (grid,row)=>value, mustUse?: ['COUNTIF'], mutate?: {cell, value}, hint, explain}
export function mountSheet(parent, spec, {onPass} = {}) {
  const box = h('div', 'mini-sheet');
  const grid = {...spec.cells};
  const formulas = {};
  const cols = spec.cols, rows = spec.rows;
  const bar = h('div', 'fx-bar');
  const nameBox = h('span', 'fx-name');
  const fx = h('span', 'fx-label', 'fx');
  const input = h('input', 'fx-input');
  input.type = 'text';
  input.spellcheck = false;
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Thanh công thức');
  const runBtn = button('▶ Chạy', () => run(), 'primary');
  bar.append(nameBox, fx, input, runBtn);
  const tableWrap = h('div', 'sheet-scroll');
  const table = h('table', 'sheet');
  tableWrap.append(table);
  const status = h('div', 'feedback sheet-status');
  const taskBox = h('div', 'sheet-task');
  const formulaList = h('div', 'sheet-formulas');
  if (spec.caption) box.append(h('p', 'muted sheet-caption', spec.caption));
  box.append(taskBox, bar, tableWrap, formulaList, status);
  parent.append(box);

  const tasks = spec.tasks || [];
  let t = 0;
  let active = tasks[0]?.cell || spec.demo?.cell || 'A1';
  let highlight = new Set();

  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); run(); } });
  input.addEventListener('input', () => { highlight = referencedCells(input.value); draw(); });

  function draw() {
    table.replaceChildren();
    const head = h('tr');
    head.append(h('th', 'corner', ''));
    for (let c = 1; c <= cols; c++) head.append(h('th', '', refName(c, 1).replace(/\d+/, '')));
    table.append(head);
    for (let r = 1; r <= rows; r++) {
      const tr = h('tr');
      tr.append(h('th', '', String(r)));
      for (let c = 1; c <= cols; c++) {
        const name = refName(c, r);
        const v = grid[name];
        const td = h('td', '', v === undefined ? '' : formatValue(v));
        if (typeof v === 'number' || isErr(v)) td.classList.add('num');
        if (isErr(v)) td.classList.add('err');
        if (r === 1 && spec.headerRow !== false) td.classList.add('hdr');
        if (highlight.has(name)) td.classList.add('ref');
        if (name === active) td.classList.add('active');
        if (formulas[name]) td.title = formulas[name];
        tr.append(td);
      }
      table.append(tr);
    }
    nameBox.textContent = active;
  }

  function fillTargets(task) {
    const start = parseRef(task.cell);
    const last = task.fillTo || start.row;
    const out = [];
    for (let r = start.row; r <= last; r++) out.push(refName(start.col, r));
    return out;
  }

  function apply(task, formula) {
    const targets = fillTargets(task);
    targets.forEach((name, k) => { formulas[name] = shiftFormula(formula, k); });
    // Evaluate in order so later cells can read earlier ones.
    for (const name of targets) {
      const r = evalFormula(formulas[name], grid);
      grid[name] = r.value;
      if (r.message) return {message: r.message};
    }
    return {targets};
  }

  function expected(task, g, row) { return typeof task.expect === 'function' ? task.expect(g, row) : task.expect; }
  const same = (a, b) => typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) < 1e-9 : String(a).toLowerCase() === String(b).toLowerCase();

  function run() {
    const task = tasks[t];
    const formula = input.value.trim();
    if (!formula) { status.textContent = 'Gõ công thức vào thanh fx rồi bấm Chạy (hoặc Enter).'; return; }
    if (!task) { // free play
      const r = evalFormula(formula, grid);
      grid[active] = r.value;
      formulas[active] = formula;
      status.textContent = r.message ? `⚠️ ${r.message}` : `Ô ${active} = ${formatValue(r.value)}`;
      draw();
      return;
    }
    const res = apply(task, formula);
    highlight = referencedCells(formula);
    showFormulas(task);
    draw();
    if (res.message) { status.textContent = `⚠️ Công thức chưa đúng cú pháp: ${res.message}`; return; }
    const targets = res.targets;
    const fnUsed = (formula.toUpperCase().match(/[A-Z]+(?=\s*\()/g) || []);
    if (task.mustUse && !task.mustUse.every(f => fnUsed.includes(f))) { status.textContent = `Kết quả ra ${formatValue(grid[targets[0]])}, nhưng bài này cần dùng hàm ${task.mustUse.join(', ')}. ${task.hint || ''}`; return; }
    const wrong = targets.find(name => !same(grid[name], expected(task, grid, parseRef(name).row)));
    if (wrong) {
      const v = grid[wrong];
      status.textContent = `✗ Ô ${wrong} ra ${formatValue(v)}${isErr(v) ? ' (lỗi)' : ''}, chưa đúng. ${task.hint || ''}`;
      return;
    }
    if (task.mutate) {
      // Change an input and recompute: catches answers typed as fixed numbers.
      const old = grid[task.mutate.cell];
      grid[task.mutate.cell] = task.mutate.value;
      apply(task, formula);
      const broken = targets.find(name => !same(grid[name], expected(task, grid, parseRef(name).row)));
      grid[task.mutate.cell] = old;
      apply(task, formula);
      draw();
      if (broken) { status.textContent = `✗ Kết quả đúng với giá hiện tại, nhưng khi đổi ô ${task.mutate.cell} thì ô ${broken} không đổi theo. Đừng gõ thẳng con số; hãy trỏ tới ô ${task.mutate.cell}.`; return; }
    }
    status.textContent = `✓ Đúng rồi! ${task.explain || ''}`;
    t++;
    if (t < tasks.length) { setTimeout(() => { input.value = ''; showTask(); }, 50); }
    else { taskBox.replaceChildren(h('p', 'sheet-done', '🎉 Em đã làm xong tất cả việc trong bảng tính này.')); onPass?.(); }
  }

  function showFormulas(task) {
    const targets = fillTargets(task);
    if (targets.length < 2) { formulaList.replaceChildren(); return; }
    const list = h('ol', 'fill-list');
    list.start = parseRef(targets[0]).row;
    for (const name of targets) {
      const li = h('li', '', '');
      li.append(h('code', '', `${name}: ${formulas[name]}`), document.createTextNode(` → ${formatValue(grid[name])}`));
      list.append(li);
    }
    formulaList.replaceChildren(h('p', 'muted', 'Khi kéo công thức xuống, mỗi ô nhận một công thức như sau:'), list);
  }

  function showTask() {
    const task = tasks[t];
    if (!task) { taskBox.replaceChildren(); return; }
    active = task.cell;
    highlight = new Set();
    taskBox.replaceChildren(h('p', 'sheet-task-text', `Việc ${t + 1}/${tasks.length}: ${task.prompt}`));
    if (task.hint) { const d = h('details', 'hint'); d.append(h('summary', '', 'Gợi ý'), h('p', '', task.hint)); taskBox.append(d); }
    formulaList.replaceChildren();
    draw();
  }

  if (spec.demo) {
    const task = {cell: spec.demo.cell, fillTo: spec.demo.fillTo};
    input.value = spec.demo.formula;
    apply(task, spec.demo.formula);
    highlight = referencedCells(spec.demo.formula);
    active = spec.demo.cell;
    showFormulas(task);
    input.readOnly = true;
    runBtn.hidden = true;
    status.textContent = spec.demo.note || '';
    draw();
  } else showTask();
  if (!tasks.length && !spec.demo) draw();
  return box;
}

// ---------- Mini Word: styles and Navigation Pane ----------
// spec: {paragraphs: [{text, want: 'Heading 1'|'Heading 2'|'Normal', manualBold?}], modifyColor}
export function mountStyleLab(parent, spec, {onPass} = {}) {
  const box = h('div', 'style-lab');
  const paras = spec.paragraphs.map(p => ({...p, style: 'Normal'}));
  let selected = -1;
  let h1Color = null;
  const ribbon = h('div', 'ribbon-pic');
  const tabs = h('div', 'ribbon-tabs ribbon-word');
  for (const t of TABS.word) tabs.append(h('span', t === 'Home' ? 'ribbon-tab on' : 'ribbon-tab', t));
  const group = h('div', 'ribbon-group');
  const styleRow = h('div', 'ribbon-buttons');
  const styleButtons = ['Normal', 'Heading 1', 'Heading 2'].map(s => { const b = button(s, () => setStyle(s), 'ribbon-btn live'); styleRow.append(b); return b; });
  group.append(styleRow, h('div', 'ribbon-group-name', 'Styles (Kiểu)'));
  const body = h('div', 'ribbon-body');
  body.append(group);
  ribbon.append(tabs, body);
  const layout = h('div', 'word-layout');
  const navPane = h('aside', 'nav-pane');
  const page = h('div', 'word-page');
  layout.append(navPane, page);
  const status = h('div', 'feedback', 'Bấm chọn một dòng trên trang, rồi bấm Style trên thanh menu.');
  const modify = button('✏️ Sửa kiểu Heading 1 (Modify): đổi màu đỏ', () => { h1Color = h1Color ? null : (spec.modifyColor || 'var(--wine-text)'); draw(); status.textContent = h1Color ? 'Mọi dòng Heading 1 đổi màu cùng lúc. Đó là lợi ích của Styles.' : 'Đã trả lại màu cũ.'; }, '');
  box.append(ribbon, layout, modify, status);
  parent.append(box);

  function setStyle(s) {
    if (selected < 0) { status.textContent = 'Hãy bấm chọn một dòng trên trang trước.'; return; }
    paras[selected].style = s;
    draw();
    check();
  }
  function check() {
    const ok = paras.every(p => p.style === p.want);
    if (ok) { status.textContent = '✓ Ngăn dẫn hướng bên trái đã hiện đủ dàn ý 2 cấp. Em làm đúng rồi!'; onPass?.(); }
    else {
      const left = paras.filter(p => p.style !== p.want).length;
      status.textContent = `Còn ${left} dòng chưa đúng kiểu. Dòng “Chương…” là Heading 1, dòng “1.1, 1.2…” là Heading 2, đoạn văn thường là Normal.`;
    }
  }
  function draw() {
    page.replaceChildren();
    paras.forEach((p, k) => {
      const line = button(p.text, () => { selected = k; draw(); status.textContent = `Đang chọn: “${p.text.slice(0, 40)}…” (kiểu hiện tại: ${p.style}). Bấm Style trên thanh menu.`; }, `word-line st-${p.style.replace(' ', '').toLowerCase()}`);
      if (p.manualBold && p.style === 'Normal') line.classList.add('manual-bold');
      if (p.style === 'Heading 1' && h1Color) line.style.color = h1Color;
      if (k === selected) line.classList.add('sel');
      line.setAttribute('aria-pressed', k === selected ? 'true' : 'false');
      page.append(line);
    });
    navPane.replaceChildren(h('p', 'nav-title', 'Navigation Pane (Ngăn dẫn hướng)'));
    const heads = paras.filter(p => p.style.startsWith('Heading'));
    if (!heads.length) navPane.append(h('p', 'muted', 'Chưa có tiêu đề nào. Word chỉ hiện các dòng đã gán Heading.'));
    for (const p of heads) navPane.append(h('p', p.style === 'Heading 1' ? 'nav-h1' : 'nav-h2', p.text));
    styleButtons.forEach(b => b.classList.toggle('on', selected >= 0 && paras[selected].style === b.textContent));
  }
  draw();
  return box;
}
