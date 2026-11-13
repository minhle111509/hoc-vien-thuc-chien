"""Build the downloadable curriculum PDF (tai-lieu/chuong-trinh-hoc-vien-thuc-chien.pdf).

Usage (from the academy folder):  python scripts/build-pdf.py
Needs: Node.js 22+, Python 3 with reportlab, and a Unicode TTF font with Vietnamese
(Segoe UI / Arial on Windows, DejaVu Sans on Linux).
"""
import json
import os
import re
import subprocess
import sys
from datetime import date

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'tai-lieu')
OUT = os.path.join(OUT_DIR, 'chuong-trinh-hoc-vien-thuc-chien.pdf')

FONT_CANDIDATES = [
    ('C:/Windows/Fonts/segoeui.ttf', 'C:/Windows/Fonts/segoeuib.ttf'),
    ('C:/Windows/Fonts/arial.ttf', 'C:/Windows/Fonts/arialbd.ttf'),
    ('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'),
]
for regular, bold in FONT_CANDIDATES:
    if os.path.exists(regular) and os.path.exists(bold):
        pdfmetrics.registerFont(TTFont('Body', regular))
        pdfmetrics.registerFont(TTFont('Body-Bold', bold))
        pdfmetrics.registerFontFamily('Body', normal='Body', bold='Body-Bold', italic='Body', boldItalic='Body-Bold')
        break
else:
    sys.exit('Không tìm thấy phông chữ hỗ trợ tiếng Việt.')
MONO = 'Body'
for mono in ('C:/Windows/Fonts/consola.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'):
    if os.path.exists(mono):
        pdfmetrics.registerFont(TTFont('Mono', mono))
        MONO = 'Mono'
        break
GUIDE = os.path.join(ROOT, 'HUONG-DAN-GITHUB-VA-HOSTINGER.md')

WINE = colors.HexColor('#7b1e3a')
BROWN = colors.HexColor('#8a5a3b')
SAGE = colors.HexColor('#edf5e8')
BLUE = colors.HexColor('#2e6fa7')
SOFT = colors.HexColor('#f7f1ea')
LINE = colors.HexColor('#dccbbb')
TEXT = colors.HexColor('#3a2a20')

S = {
    'title': ParagraphStyle('title', fontName='Body-Bold', fontSize=26, leading=32, textColor=WINE, alignment=TA_CENTER),
    'subtitle': ParagraphStyle('subtitle', fontName='Body', fontSize=13, leading=18, textColor=BROWN, alignment=TA_CENTER),
    'h1': ParagraphStyle('h1', fontName='Body-Bold', fontSize=18, leading=23, textColor=WINE, spaceAfter=6),
    'h2': ParagraphStyle('h2', fontName='Body-Bold', fontSize=12.5, leading=16, textColor=BROWN, spaceBefore=10, spaceAfter=4),
    'body': ParagraphStyle('body', fontName='Body', fontSize=9.5, leading=13.5, textColor=TEXT),
    'small': ParagraphStyle('small', fontName='Body', fontSize=8.5, leading=11.5, textColor=TEXT),
    'cell': ParagraphStyle('cell', fontName='Body', fontSize=8.5, leading=11.2, textColor=TEXT),
    'cellb': ParagraphStyle('cellb', fontName='Body-Bold', fontSize=8.8, leading=11.4, textColor=TEXT),
    'head': ParagraphStyle('head', fontName='Body-Bold', fontSize=8.8, leading=11, textColor=colors.white),
    'note': ParagraphStyle('note', fontName='Body', fontSize=8.5, leading=11.5, textColor=BLUE),
}

EMOJI = re.compile('[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u200d]')


def clean(text):
    text = EMOJI.sub('', text).strip()
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


# Suggested learning paths shown on the overview page.
TRACKS = [
    ('Lộ trình AI & AI Agent', ['aibasics', 'claude', 'chatgpt', 'gemini', 'mcp', 'cowork', 'automation', 'claudedesign', 'agent', 'aicode', 'agentdev', 'localai']),
    ('Kỹ năng số, truyền thông & xuất bản web', ['office', 'photo', 'design', 'webdeploy']),
]


def load_catalog():
    node = subprocess.run(['node', os.path.join('scripts', 'export-catalog.mjs')], cwd=ROOT,
                          capture_output=True, text=True, encoding='utf-8', check=True)
    return json.loads(node.stdout)


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(WINE)
    canvas.setLineWidth(2)
    canvas.line(15 * mm, A4[1] - 12 * mm, A4[0] - 15 * mm, A4[1] - 12 * mm)
    canvas.setFont('Body', 8)
    canvas.setFillColor(BROWN)
    canvas.drawString(15 * mm, 9 * mm, 'Học viện Thực chiến · Chương trình học')
    canvas.drawRightString(A4[0] - 15 * mm, 9 * mm, f'Trang {doc.page}')
    canvas.restoreState()


def table(rows, widths, header_bg=WINE, zebra=True):
    t = Table(rows, colWidths=widths, repeatRows=1)
    style = [
        ('BACKGROUND', (0, 0), (-1, 0), header_bg),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.4, LINE),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]
    if zebra:
        style += [('BACKGROUND', (0, i), (-1, i), SOFT) for i in range(2, len(rows), 2)]
    t.setStyle(TableStyle(style))
    return t


def inline(text):
    text = clean(text)
    text = re.sub(r'\*\*(.+?)\*\*', lambda m: '<b>' + m.group(1) + '</b>', text)
    return re.sub(r'`([^`]+)`', lambda m: f'<font name="{MONO}" color="#7b1e3a">{m.group(1)}</font>', text)


def guide_story():
    """Render the GitHub/Hostinger guide (a small Markdown subset) as an appendix."""
    if not os.path.exists(GUIDE):
        return []
    code_style = ParagraphStyle('code', fontName=MONO, fontSize=8.3, leading=11, textColor=TEXT, backColor=SOFT,
                                borderPadding=5, leftIndent=6, spaceBefore=4, spaceAfter=6)
    out, code, table_rows = [PageBreak()], None, []

    def flush_table():
        if table_rows:
            head, *body = table_rows
            rows = [[Paragraph(inline(c), S['head']) for c in head]] + [[Paragraph(inline(c), S['cell']) for c in r] for r in body]
            out.append(table(rows, [60 * mm, 120 * mm][:len(head)] if len(head) == 2 else None))
            table_rows.clear()

    for line in open(GUIDE, encoding='utf-8').read().splitlines():
        if line.strip().startswith('```'):
            if code is None:
                code = []
            else:
                out.append(Paragraph('<br/>'.join(clean(c) for c in code), code_style))
                code = None
            continue
        if code is not None:
            code.append(line.strip())
            continue
        if line.startswith('|'):
            cells = [c.strip() for c in line.strip('|').split('|')]
            if not all(set(c) <= set('-: ') for c in cells):
                table_rows.append(cells)
            continue
        flush_table()
        stripped = line.strip()
        if not stripped or stripped == '---':
            continue
        if line.startswith('# '):
            out.append(Paragraph(inline(line[2:]), S['h1']))
        elif line.startswith('## ') or line.startswith('### '):
            out.append(Paragraph(inline(line.lstrip('#').strip()), S['h2']))
        elif stripped.startswith('> '):
            out.append(Paragraph(inline(stripped[2:]), S['note']))
        elif re.match(r'^(-|\d+\.)\s', stripped):
            indent = 14 if line.startswith('   ') else 6
            out.append(Paragraph(inline(stripped), ParagraphStyle('li', parent=S['body'], leftIndent=indent, spaceAfter=2)))
        else:
            out.append(Paragraph(inline(stripped), S['body']))
    flush_table()
    return out


def build():
    catalog = load_catalog()
    courses = catalog['courses']
    by_id = {c['id']: c for c in courses}
    total = sum(len(c['lessons']) for c in courses)
    story = []

    # Cover and overview
    story += [Spacer(1, 30 * mm), Paragraph('HỌC VIỆN THỰC CHIẾN', S['title']), Spacer(1, 4 * mm),
              Paragraph('Chương trình học bằng trải nghiệm · AI, AI Agent và kỹ năng số', S['subtitle']), Spacer(1, 3 * mm),
              Paragraph(f'{len(courses)} khóa học · {total} nhiệm vụ · cập nhật {date.today().strftime("%d/%m/%Y")}', S['subtitle']),
              Spacer(1, 14 * mm)]
    intro = ('Mỗi khóa gồm 28 nhiệm vụ chia 4 chặng, mỗi chặng kết thúc bằng một đồ án. Mỗi nhiệm vụ có kiến thức cốt lõi, '
             'tình huống thực tế, bài thực hành, ngộ nhận thường gặp, trò chơi mô phỏng, nhiệm vụ ba chặng ra quyết định '
             'và phiếu đánh giá của giáo viên. Học viên học trên website, tiến độ lưu trên thiết bị của mình.')
    story += [Paragraph(intro, S['body']), Spacer(1, 6 * mm)]

    for track_name, ids in TRACKS:
        story.append(Paragraph(track_name, S['h2']))
        rows = [[Paragraph('Thứ tự', S['head']), Paragraph('Khóa học', S['head']), Paragraph('Bốn chặng', S['head'])]]
        for n, cid in enumerate(ids, 1):
            c = by_id.get(cid)
            if not c:
                continue
            stages = []
            for l in c['lessons']:
                name = re.sub(r'\s*·\s*7 nhiệm vụ$', '', l['stage'])
                if name not in stages:
                    stages.append(name)
            rows.append([Paragraph(str(n), S['cell']), Paragraph(clean(c['name']), S['cellb']),
                         Paragraph(' → '.join(clean(s) for s in stages), S['cell'])])
        story.append(table(rows, [14 * mm, 70 * mm, 96 * mm]))

    story += [Spacer(1, 6 * mm), Paragraph(
        f'Ghi chú: các tính năng của Claude, ChatGPT, Gemini, Microsoft 365, Cursor, VS Code được tra cứu từ trang chính thức '
        f'tháng {catalog["toolsChecked"]}; tính năng thay đổi theo gói dịch vụ, độ tuổi và khu vực. Nội dung do AI hỗ trợ biên soạn, '
        f'cần giáo viên chuyên môn thẩm định trước khi dùng chính thức. Điểm mô phỏng không thay thế đánh giá của giáo viên.', S['note'])]

    # One section per course
    order = [cid for _, ids in TRACKS for cid in ids] + [c['id'] for c in courses]
    seen = set()
    for cid in order:
        if cid in seen or cid not in by_id:
            continue
        seen.add(cid)
        c = by_id[cid]
        story.append(PageBreak())
        story.append(Paragraph(clean(c['name']), S['h1']))
        info = [
            [Paragraph('Dụng cụ', S['cellb']), Paragraph(clean(c['materials']), S['cell'])],
            [Paragraph('Tiêu chí sản phẩm', S['cellb']), Paragraph(' · '.join(clean(q) for q in c['quality']), S['cell'])],
            [Paragraph('An toàn', S['cellb']), Paragraph(clean(c['safety']), S['cell'])],
        ]
        t = Table(info, colWidths=[32 * mm, 148 * mm])
        t.setStyle(TableStyle([('BACKGROUND', (0, 0), (0, -1), SAGE), ('GRID', (0, 0), (-1, -1), 0.4, LINE),
                               ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('TOPPADDING', (0, 0), (-1, -1), 3),
                               ('BOTTOMPADDING', (0, 0), (-1, -1), 3)]))
        story += [t, Spacer(1, 2 * mm)]

        stage_names = []
        for l in c['lessons']:
            if l['stage'] not in stage_names:
                stage_names.append(l['stage'])
        for stage in stage_names:
            rows = [[Paragraph('#', S['head']), Paragraph('Nhiệm vụ', S['head']), Paragraph('Bài thực hành', S['head'])]]
            for l in c['lessons']:
                if l['stage'] != stage:
                    continue
                num = l['id'].split('-')[-1]
                title = clean(l['title']) + (' <font color="#7b1e3a">[Đồ án]</font>' if l['checkpoint'] else '')
                task = clean(l['task'])
                if l['tools']:
                    task += f'<br/><font color="#2e6fa7">Tính năng hiện hành: {clean(l["tools"])}</font>'
                rows.append([Paragraph(num, S['cell']), Paragraph(title, S['cellb']), Paragraph(task, S['cell'])])
            story.append(KeepTogether([Paragraph(clean(stage), S['h2'])]))
            story.append(table(rows, [9 * mm, 52 * mm, 119 * mm], header_bg=BROWN))
        story.append(Paragraph('[Đồ án] = đồ án cuối chặng, tổng hợp kỹ năng của 7 nhiệm vụ.', S['small']))

    story += guide_story()
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm, topMargin=17 * mm,
                            bottomMargin=16 * mm, title='Chương trình Học viện Thực chiến',
                            author='Học viện Thực chiến', subject='Chương trình học AI, AI Agent và kỹ năng số')
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f'Đã tạo {OUT}')


if __name__ == '__main__':
    build()
