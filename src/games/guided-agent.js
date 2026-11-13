// Interactive pieces for guided lessons about AI agents (Claude Cowork):
//  - claudeScreen: simplified picture of the Claude app that circles the part to use
//  - chatPicture: a short simulated conversation
//  - mountSortLab: put each task into the right group (chat / Cowork / do it yourself)
//  - mountBriefLab: write a task brief; the simulated Claude asks about whatever is missing
//  - mountPlanLab: review a proposed plan step by step (keep / ask / remove)

const h = (tag, cls = '', text = '') => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
const button = (label, fn, cls = '') => { const b = h('button', cls, label); b.type = 'button'; b.addEventListener('click', fn); return b; };

// highlight: 'mode' | 'plus' | 'folder' | 'scheduled' | 'plan' | 'send' | 'new'
export function claudeScreen({highlight, caption, plan}) {
  const fig = h('figure', 'claude-pic');
  fig.setAttribute('role', 'img');
  fig.setAttribute('aria-label', `Minh họa màn hình Claude${caption ? ': ' + caption : ''}`);
  const side = h('div', 'cp-side');
  for (const [k, label] of [['new', '＋ Việc mới'], ['projects', '📁 Projects'], ['scheduled', '⏰ Scheduled (Lịch)'], ['customize', '🧩 Customize']]) side.append(h('span', `cp-side-item${highlight === k ? ' hl' : ''}`, label));
  const main = h('div', 'cp-main');
  if (plan) {
    const p = h('div', `cp-plan${highlight === 'plan' ? ' hl' : ''}`);
    p.append(h('strong', '', 'Kế hoạch của Claude'));
    const ol = h('ol');
    plan.forEach(t => ol.append(h('li', '', t)));
    p.append(ol, h('div', 'cp-plan-actions', 'Duyệt · Sửa · Hủy'));
    main.append(p);
  } else main.append(h('div', 'cp-empty', 'Hôm nay em muốn giao việc gì?'));
  const box = h('div', 'cp-box');
  box.append(h('span', 'cp-input', 'Mô tả việc cần làm…'));
  const tools = h('div', 'cp-tools');
  tools.append(
    h('span', `cp-chip${highlight === 'plus' ? ' hl' : ''}`, '＋ Kết nối, skills'),
    h('span', `cp-chip${highlight === 'folder' ? ' hl' : ''}`, '📂 Thư mục: CLB-Sach'),
    h('span', `cp-chip${highlight === 'mode' ? ' hl' : ''}`, '🛡️ Chế độ: Manual'),
    h('span', `cp-chip send${highlight === 'send' ? ' hl' : ''}`, '➤'));
  box.append(tools);
  main.append(box);
  const frame = h('div', 'cp-frame');
  frame.append(side, main);
  fig.append(frame, h('figcaption', 'ribbon-cap', `${caption || ''} (Hình minh họa đơn giản; giao diện thật có thể khác một chút.)`));
  return fig;
}

// lines: [{who: 'you' | 'claude', text}]
export function chatPicture(lines) {
  const box = h('div', 'chat-pic');
  for (const l of lines) box.append(h('p', `chat-bubble ${l.who}`, `${l.who === 'you' ? 'Em' : 'Claude'}: ${l.text}`));
  return box;
}

function choiceRows(list, items, options, picks, label) {
  items.forEach((it, i) => {
    const row = h('div', 'sort-row');
    const why = h('p', 'quiz-why');
    const btns = h('div', 'sort-btns');
    for (const [value, text] of options) {
      const b = button(text, () => {
        picks[i] = value;
        [...btns.children].forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
        why.textContent = '';
      }, `sort-btn v-${value}`);
      b.setAttribute('aria-pressed', 'false');
      btns.append(b);
    }
    row.append(h('p', 'sort-text', label(it, i)), btns, why);
    row._why = why;
    list.append(row);
  });
}

// spec: {groups: ['…', …], items: [{text, group, why}]}
export function mountSortLab(parent, spec, {onPass} = {}) {
  const box = h('div', 'sort-lab');
  const picks = spec.items.map(() => null);
  const list = h('div', 'sort-items');
  choiceRows(list, spec.items, spec.groups.map(g => [g, g]), picks, (it, i) => `${i + 1}. ${it.text}`);
  const status = h('div', 'feedback', 'Chọn nhóm cho từng việc rồi bấm Kiểm tra.');
  const check = button('Kiểm tra', () => {
    if (picks.some(p => !p)) { status.textContent = 'Hãy chọn nhóm cho tất cả các việc.'; return; }
    let right = 0;
    spec.items.forEach((it, i) => {
      const ok = picks[i] === it.group;
      if (ok) right++;
      const w = list.children[i]._why;
      w.textContent = `${ok ? '✓' : `✗ Nên là “${it.group}”.`} ${it.why}`;
      w.className = 'quiz-why ' + (ok ? 'ok' : 'bad');
    });
    if (right === spec.items.length) { status.textContent = `✓ Đúng cả ${right}/${right} việc.`; onPass?.(); }
    else status.textContent = `Đúng ${right}/${spec.items.length}. Đọc giải thích dưới từng việc rồi chọn lại.`;
  }, 'primary');
  box.append(list, check, status);
  parent.append(box);
  return box;
}

// spec: {fields: [{key, label, placeholder, minLen, any: [...], ask}], example: {key: text}, plan: values => [steps]}
export function mountBriefLab(parent, spec, {onPass} = {}) {
  const box = h('div', 'brief-lab');
  const inputs = {};
  const form = h('div', 'brief-fields');
  for (const f of spec.fields) {
    const lab = h('label', 'brief-field');
    lab.append(h('span', 'brief-label', f.label));
    const ta = h('textarea', 'brief-input');
    ta.rows = 2;
    ta.id = `brief-${f.key}`;
    ta.placeholder = f.placeholder;
    lab.append(ta);
    inputs[f.key] = ta;
    form.append(lab);
  }
  const reply = h('div', 'brief-reply');
  const missingFields = () => spec.fields.filter(f => {
    const v = inputs[f.key].value.trim().toLowerCase();
    return v.length < (f.minLen || 8) || (f.any && !f.any.some(k => v.includes(k)));
  });
  const send = button('➤ Gửi cho Claude (mô phỏng)', () => {
    const missing = missingFields();
    if (missing.length) {
      reply.replaceChildren(chatPicture(missing.map(f => ({who: 'claude', text: f.ask}))), h('p', 'muted', `Claude còn ${missing.length} câu hỏi. Trả lời bằng cách bổ sung vào ô tương ứng rồi gửi lại.`));
      return;
    }
    const values = Object.fromEntries(spec.fields.map(f => [f.key, inputs[f.key].value.trim()]));
    const plan = h('div', 'cp-plan');
    const ol = h('ol');
    spec.plan(values).forEach(t => ol.append(h('li', '', t)));
    plan.append(h('strong', '', 'Claude: “Tôi đã hiểu. Đây là kế hoạch, em duyệt nhé?”'), ol);
    reply.replaceChildren(plan, h('p', 'sheet-done', '✓ Bản giao việc đủ rõ: Claude không cần hỏi lại và lập được kế hoạch.'));
    onPass?.();
  }, 'primary');
  const example = button('Xem bản giao việc mẫu', () => {
    reply.replaceChildren(h('p', 'muted', 'Bản mẫu (cho một việc khác). Đọc xong, em tự viết cho việc của em:'), ...spec.fields.map(f => { const p = h('p', 'brief-example'); p.append(h('strong', '', f.label + ': '), document.createTextNode(spec.example[f.key])); return p; }));
  });
  const actions = h('div', 'brief-actions');
  actions.append(send, example);
  box.append(form, actions, reply);
  parent.append(box);
  return box;
}

// spec: {task, steps: [{text, ok: ['keep'] | ['remove'] | ['ask', 'remove'], why}], result}
export function mountPlanLab(parent, spec, {onPass} = {}) {
  const box = h('div', 'plan-lab');
  const picks = spec.steps.map(() => null);
  box.append(h('p', 'plan-task', `Việc em đã giao: ${spec.task}`));
  const list = h('div', 'sort-items');
  choiceRows(list, spec.steps, [['keep', '✓ Giữ'], ['ask', '? Hỏi lại'], ['remove', '✗ Bỏ bước này']], picks, (st, i) => `Bước ${i + 1}. ${st.text}`);
  const status = h('div', 'feedback', 'Quyết định cho từng bước trong kế hoạch Claude đề xuất, rồi bấm Duyệt kế hoạch.');
  const run = h('div', 'plan-run');
  const approve = button('Duyệt kế hoạch', () => {
    if (picks.some(p => !p)) { status.textContent = 'Hãy quyết định cho tất cả các bước.'; return; }
    let right = 0;
    spec.steps.forEach((st, i) => {
      const ok = st.ok.includes(picks[i]);
      if (ok) right++;
      const w = list.children[i]._why;
      w.textContent = `${ok ? '✓' : '✗'} ${st.why}`;
      w.className = 'quiz-why ' + (ok ? 'ok' : 'bad');
    });
    if (right === spec.steps.length) { status.textContent = '✓ Em duyệt đúng: giữ bước cần thiết, chặn bước nguy hiểm.'; run.replaceChildren(chatPicture([{who: 'claude', text: spec.result}])); onPass?.(); }
    else { status.textContent = `Đúng ${right}/${spec.steps.length} bước. Đọc giải thích rồi chọn lại.`; run.replaceChildren(); }
  }, 'primary');
  box.append(list, approve, status, run);
  parent.append(box);
  return box;
}
