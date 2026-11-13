// Order lab: the learner clicks the steps in the right order. Shuffled deterministically so it never
// starts solved; wrong orders show which position is the first mistake.
import {shuffledOrder} from '../core/teach.js';

const h = (tag, cls = '', text = '') => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
const button = (label, fn, cls = '') => { const b = h('button', cls, label); b.type = 'button'; b.addEventListener('click', fn); return b; };

// spec: {items: [...in correct order], explain, seed?}
export function mountOrderLab(parent, spec, {onPass} = {}) {
  const box = h('div', 'order-lab');
  const picked = [];
  const pool = h('div', 'order-pool');
  const line = h('ol', 'order-line');
  const status = h('div', 'feedback', 'Bấm các bước theo đúng thứ tự từ trên xuống.');
  const shown = shuffledOrder(spec.items, spec.seed || spec.items.length);
  function render() {
    pool.replaceChildren(...shown.filter(x => !picked.includes(x)).map(x => button(x, () => { picked.push(x); render(); }, 'order-item')));
    line.replaceChildren(...picked.map(x => h('li', '', x)));
  }
  const check = button('Kiểm tra thứ tự', () => {
    if (picked.length < spec.items.length) { status.textContent = `Còn ${spec.items.length - picked.length} bước chưa xếp.`; return; }
    const wrongAt = picked.findIndex((x, i) => x !== spec.items[i]);
    if (wrongAt < 0) { status.textContent = `✓ Đúng thứ tự! ${spec.explain || ''}`; onPass?.(); return; }
    status.textContent = `Chưa đúng từ bước ${wrongAt + 1}. Bước ${wrongAt + 1} nên là: “${spec.items[wrongAt]}”. Bấm “Làm lại” để xếp lại.`;
  }, 'primary');
  const reset = button('↺ Làm lại', () => { picked.length = 0; render(); status.textContent = 'Bấm các bước theo đúng thứ tự từ trên xuống.'; });
  const actions = h('div', 'brief-actions');
  actions.append(check, reset);
  render();
  box.append(h('p', 'muted', 'Các bước (đã xáo trộn):'), pool, h('p', 'muted', 'Thứ tự của em:'), line, actions, status);
  parent.append(box);
  return box;
}
