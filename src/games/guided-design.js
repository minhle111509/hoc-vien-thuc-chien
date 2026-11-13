// Pictures for the Claude Design lessons:
//  - designScreen: simplified Claude Design canvas that circles the tool to use
//  - posterPicture: small posters side by side ("chưa tốt" / "tốt") so learners SEE the difference
// Posters use their own fixed colours on purpose (they are artwork samples), with labels in theme colours.

const h = (tag, cls = '', text = '') => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

// highlight: 'comment' | 'edit' | 'sliders' | 'share' | 'export' | 'chat' | 'system' | 'canvas'
export function designScreen({highlight, caption}) {
  const fig = h('figure', 'claude-pic design-pic');
  fig.setAttribute('role', 'img');
  fig.setAttribute('aria-label', `Minh họa Claude Design${caption ? ': ' + caption : ''}`);
  const top = h('div', 'dp-top');
  for (const [k, label] of [['system', '🎨 Hệ thống thiết kế: CLB-Sach'], ['share', '🔗 Chia sẻ'], ['export', '⬇ Xuất']]) top.append(h('span', `cp-chip${highlight === k ? ' hl' : ''}`, label));
  const body = h('div', 'dp-body');
  const chat = h('div', `dp-chat${highlight === 'chat' ? ' hl' : ''}`);
  chat.append(h('p', 'dp-msg', 'Em: Làm poster Ngày hội đọc sách, khổ A4…'), h('p', 'dp-msg', 'Claude: Đây là bản đầu, em xem nhé.'), h('span', 'cp-input', 'Nhắn yêu cầu sửa…'));
  const canvas = h('div', `dp-canvas${highlight === 'canvas' ? ' hl' : ''}`);
  const board = h('div', 'dp-board');
  board.append(h('div', 'dp-board-title', 'NGÀY HỘI ĐỌC SÁCH'), h('div', 'dp-board-sub', '8h–11h · Thứ Bảy 29/11 · Thư viện'), h('div', 'dp-board-btn', 'Đăng ký ngay'));
  const tools = h('div', 'dp-tools');
  for (const [k, label] of [['edit', '✋ Sửa trực tiếp'], ['comment', '💬 Bình luận'], ['sliders', '🎚 Thanh trượt']]) tools.append(h('span', `cp-chip${highlight === k ? ' hl' : ''}`, label));
  canvas.append(tools, board);
  body.append(chat, canvas);
  fig.append(top, body, h('figcaption', 'ribbon-cap', `${caption || ''} (Hình minh họa đơn giản; giao diện thật có thể khác một chút.)`));
  return fig;
}

// variants: [{label, bg, fg, accent, title, sub, lines:[...], titleSize, align, crowded}]
export function posterPicture(variants) {
  const row = h('div', 'poster-row');
  for (const v of variants) {
    const fig = h('figure', 'poster-fig');
    const p = h('div', `poster${v.crowded ? ' crowded' : ''}`);
    p.style.background = v.bg;
    p.style.color = v.fg;
    p.style.textAlign = v.align || 'left';
    p.setAttribute('role', 'img');
    p.setAttribute('aria-label', `${v.label}: ${v.title}. ${v.sub || ''} ${(v.lines || []).join('. ')}`);
    const t = h('div', 'poster-title', v.title);
    t.style.fontSize = `${v.titleSize || 1.2}rem`;
    if (v.accent) t.style.color = v.accent;
    p.append(t);
    if (v.sub) p.append(h('div', 'poster-sub', v.sub));
    for (const line of v.lines || []) p.append(h('div', 'poster-line', line));
    fig.append(p, h('figcaption', `poster-label ${/chưa|kém|sai/i.test(v.label) ? 'bad' : 'good'}`, v.label));
    row.append(fig);
  }
  return row;
}
