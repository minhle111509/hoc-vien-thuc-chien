// Guided (beginner) version of three Office lessons — trial before rolling out to the whole course.
// Written for someone who has never opened Word or Excel: one idea per step, everyday comparisons,
// new words explained where they appear, and practice in a mini Word page / mini spreadsheet in the browser.

const STUDENTS = [
  ['An', 'Tổ 1', 8.5, 50], ['Bình', 'Tổ 2', 7, 40], ['Chi', 'Tổ 1', 9, 50], ['Dũng', 'Tổ 2', 6.5, 30],
  ['Em', 'Tổ 1', 8, 50], ['Giang', 'Tổ 2', 7.5, 50], ['Hà', 'Tổ 1', 5, 20], ['Khoa', 'Tổ 2', 9.5, 40],
];
const gradeCells = () => {
  const cells = {A1: 'Họ tên', B1: 'Tổ', C1: 'Điểm', D1: 'Quỹ (nghìn)', E1: 'Xếp loại', G1: 'Số bạn ≥ 8', H1: 'Quỹ Tổ 1'};
  STUDENTS.forEach(([n, t, d, q], i) => { const r = i + 2; cells['A' + r] = n; cells['B' + r] = t; cells['C' + r] = d; cells['D' + r] = q; });
  return cells;
};
const SHIRTS = [['An', 2], ['Bình', 1], ['Chi', 3], ['Dũng', 2], ['Em', 4], ['Giang', 1]];
const shirtCells = () => {
  const cells = {A1: 'Giá 1 áo', B1: 85000, A2: 'Họ tên', B2: 'Số áo', C2: 'Thành tiền'};
  SHIRTS.forEach(([n, q], i) => { const r = i + 3; cells['A' + r] = n; cells['B' + r] = q; });
  return cells;
};

export const OFFICE_GUIDED = {
  2: {
    outcome: 'Làm cho mọi tiêu đề trong bài Word cùng một kiểu chỉ bằng vài cú bấm, và đổi kiểu cho tất cả cùng lúc.',
    analogy: 'Style (Kiểu) giống như đồng phục. Mọi tiêu đề chương mặc “đồng phục Heading 1”. Muốn đổi màu áo cả lớp, chỉ cần đổi mẫu đồng phục một lần, không phải nhuộm từng chiếc áo.',
    walkthrough: [
      {title: 'Vấn đề: tiêu đề mỗi chỗ một kiểu', text: ['Bài báo cáo dài, mỗi lần em tự bôi đậm, tự tăng cỡ chữ cho tiêu đề. Kết quả: chỗ cỡ 14, chỗ cỡ 16, chỗ màu xanh, chỗ màu đen.', 'Muốn sửa cho đều, em phải đi tìm và sửa từng tiêu đề. Bài này dạy cách làm một lần là xong.']},
      {title: 'Style là gì?', text: ['Style là một “mẫu định dạng” có tên. Word có sẵn: Normal cho đoạn văn thường, Heading 1 cho tiêu đề lớn (chương), Heading 2 cho tiêu đề nhỏ hơn (mục 1.1, 1.2).', 'Khi em gán Heading 1 cho một dòng, Word hiểu “đây là tiêu đề chương”, chứ không chỉ thấy chữ to và đậm.'], terms: {'Style (Kiểu)': 'mẫu định dạng có tên, dùng lại được nhiều lần', 'Heading 1': 'kiểu cho tiêu đề cấp lớn nhất, ví dụ “Chương 1”', 'Heading 2': 'kiểu cho tiêu đề cấp nhỏ hơn, ví dụ “1.1”', 'Normal': 'kiểu của đoạn văn thường'}},
      {title: 'Nút Style nằm ở đâu?', text: ['Trên cùng màn hình Word là thanh menu (gọi là Ribbon). Bấm thẻ Home (Trang đầu), nhìn sang phải sẽ thấy nhóm Styles với các ô Normal, Heading 1, Heading 2.', 'Cách dùng: bấm chuột vào dòng tiêu đề trên trang, rồi bấm ô Heading 1.'], ribbon: {app: 'word', tab: 'Home', group: 'Styles', buttons: ['Normal', 'No Spacing', 'Heading 1', 'Heading 2', 'Title'], press: 'Heading 1'}, terms: {'Ribbon': 'thanh menu nằm ngang trên cùng, chia thành các thẻ (Home, Insert…)'}},
      {title: 'Kiểm tra bằng Navigation Pane', text: ['Navigation Pane (Ngăn dẫn hướng) là cột bên trái liệt kê mọi tiêu đề đã gán Heading. Dòng nào em chỉ tự bôi đậm sẽ không hiện ở đây.', 'Mở nhanh bằng phím Ctrl+F, hoặc thẻ View (Dạng xem) › tick ô Navigation Pane.'], ribbon: {app: 'word', tab: 'View', group: 'Show', buttons: ['Ruler', 'Gridlines', 'Navigation Pane'], press: 'Navigation Pane'}, tip: 'Nếu một tiêu đề không hiện trong Navigation Pane, nghĩa là em chưa gán Heading cho nó.'},
      {title: 'Đổi kiểu cho tất cả cùng lúc', text: ['Muốn mọi tiêu đề chương thành màu đỏ, cỡ 16: bấm chuột phải vào ô Heading 1 trong nhóm Styles › chọn Modify (Sửa đổi) › chọn cỡ chữ, màu › OK.', 'Mọi dòng đang dùng Heading 1 đổi theo ngay. Ở phần Thực hành em sẽ thử điều này trên trang Word mini.'], ribbon: {app: 'word', tab: 'Home', group: 'Styles', buttons: ['Normal', 'Heading 1', 'Heading 2'], press: 'Heading 1'}, tip: 'Bấm chuột PHẢI vào Heading 1, không phải chuột trái.'},
    ],
    lab: {type: 'styles', intro: 'Trang Word mini dưới đây có tiêu đề đang được “tự bôi đậm”, nên Navigation Pane bên trái còn trống. Bấm chọn từng dòng rồi bấm Style đúng trên thanh menu.',
      paragraphs: [
        {text: 'Chương 1. Giới thiệu CLB Môi trường', want: 'Heading 1', manualBold: true},
        {text: '1.1 Mục tiêu', want: 'Heading 2', manualBold: true},
        {text: 'CLB thành lập năm 2024, mục tiêu giảm rác nhựa trong trường.', want: 'Normal'},
        {text: '1.2 Thành viên', want: 'Heading 2', manualBold: true},
        {text: 'Hiện có 32 thành viên đến từ 9 lớp.', want: 'Normal'},
        {text: 'Chương 2. Hoạt động nổi bật', want: 'Heading 1', manualBold: true},
        {text: '2.1 Ngày hội tái chế', want: 'Heading 2', manualBold: true},
        {text: 'Thu gom 120 kg giấy vụn, đổi được 60 cây xanh.', want: 'Normal'},
      ]},
  },
  9: {
    outcome: 'Viết một công thức tính tiền cho dòng đầu, kéo xuống cho cả danh sách mà không bị sai, kể cả khi đổi giá.',
    analogy: 'Dấu $ giống cái ghim. Khi em kéo công thức xuống, Excel tự “trượt” các ô theo; ô nào được ghim bằng $ thì đứng yên tại chỗ.',
    walkthrough: [
      {title: 'Bài toán', text: ['Lớp đặt áo đồng phục, giá 1 áo ghi ở ô B1 (85.000đ). Cột B là số áo mỗi bạn đặt. Cần tính cột C “Thành tiền” = số áo × giá 1 áo.', 'Nhìn bảng: ô B1 nằm ở cột B, hàng 1. Ô B3 là số áo của An.'], sheet: {cols: 3, rows: 8, cells: shirtCells(), headerRow: false, caption: 'Bảng của lớp. Chữ A, B, C trên cùng là tên cột; số 1, 2, 3 bên trái là số hàng.'}, terms: {'Ô': 'một hộp trong bảng, gọi tên bằng cột + hàng, ví dụ B1', 'Cột': 'dãy dọc, đặt tên bằng chữ A, B, C…', 'Hàng': 'dãy ngang, đánh số 1, 2, 3…'}},
      {title: 'Công thức bắt đầu bằng dấu =', text: ['Gõ dấu = vào ô là nói với Excel: “hãy tính”. Ví dụ =B3*B1 nghĩa là lấy số trong ô B3 nhân với số trong ô B1 (dấu * là phép nhân).', 'Thành tiền của An: 2 × 85.000 = 170.000.'], sheet: {cols: 3, rows: 8, cells: shirtCells(), headerRow: false, demo: {cell: 'C3', formula: '=B3*B1', note: 'Ô C3 tính đúng: 170.000. Các ô được tô màu là các ô công thức đang đọc.'}}},
      {title: 'Kéo công thức xuống và chuyện bị lệch', text: ['Thay vì gõ lại cho từng bạn, em kéo công thức từ C3 xuống C8. Excel tự đổi số hàng: B3 thành B4, B5… Rất tiện, nhưng B1 cũng bị đổi thành B2, B3…', 'Xem bảng bên dưới: ô C4 thành =B4*B2, mà B2 là chữ “Số áo” nên ra lỗi #VALUE!.'], sheet: {cols: 3, rows: 8, cells: shirtCells(), headerRow: false, demo: {cell: 'C3', fillTo: 8, formula: '=B3*B1', note: 'Kéo xuống bằng công thức thiếu dấu $: các dòng dưới bị sai.'}}, terms: {'#VALUE!': 'lỗi khi công thức tính với dữ liệu không phải số (ví dụ nhân với chữ)'}},
      {title: 'Ghim ô giá bằng dấu $', text: ['Viết $B$1 thay cho B1: dấu $ trước B ghim cột, dấu $ trước 1 ghim hàng. Khi kéo xuống, $B$1 đứng yên.', 'Mẹo: gõ B1 rồi bấm phím F4, Excel tự thêm dấu $ thành $B$1.'], sheet: {cols: 3, rows: 8, cells: shirtCells(), headerRow: false, demo: {cell: 'C3', fillTo: 8, formula: '=B3*$B$1', note: 'Mọi dòng đều đúng: B3 trượt thành B4, B5…, còn $B$1 đứng yên.'}}, terms: {'Tham chiếu tương đối': 'kiểu B3, tự đổi khi kéo công thức', 'Tham chiếu tuyệt đối': 'kiểu $B$1, giữ nguyên khi kéo công thức'}},
      {title: 'Làm trong Excel thật', text: ['1) Bấm chọn ô C3. 2) Gõ =B3*$B$1 rồi bấm Enter. 3) Bấm lại ô C3, đưa chuột tới ô vuông nhỏ ở góc dưới bên phải ô (gọi là chốt điền), con trỏ thành dấu +. 4) Giữ chuột và kéo xuống C8.', 'Máy cài tiếng Việt vẫn dùng dấu * và $ như trên.'], tip: 'Đừng gõ thẳng =B3*85000. Khi giá đổi, em sẽ phải sửa từng ô.'},
    ],
    lab: {type: 'sheet', intro: 'Đến lượt em. Gõ công thức vào thanh fx rồi bấm Chạy. Bảng sẽ tự kéo công thức xuống cho cả lớp để em xem kết quả.',
      sheet: {cols: 3, rows: 8, cells: shirtCells(), headerRow: false, tasks: [
        {cell: 'C3', fillTo: 8, prompt: 'Viết công thức ở C3 tính thành tiền của An, sao cho kéo xuống C8 vẫn đúng cho mọi bạn.', expect: (g, row) => g['B' + row] * g.B1, mutate: {cell: 'B1', value: 90000}, hint: 'Số áo ở B3, giá ở B1. Ô giá cần được ghim bằng dấu $.', explain: '$B$1 đứng yên khi kéo, nên mọi dòng đều nhân đúng với giá áo.'},
      ]}},
  },
  10: {
    outcome: 'Cho Excel tự ghi “Đạt/Chưa đạt”, tự đếm số bạn đạt từ 8 điểm và tự cộng tiền quỹ của một tổ.',
    analogy: 'IF giống câu nói hằng ngày: “NẾU trời mưa THÌ mang áo mưa, KHÔNG THÌ đội mũ.” COUNTIF giống đếm số bạn giơ tay khi cô hỏi “ai được từ 8 điểm?”. SUMIF giống chỉ cộng tiền quỹ của Tổ 1.',
    walkthrough: [
      {title: 'Bảng điểm của lớp', text: ['Bảng có 8 bạn. Cột C là điểm, cột B là tổ, cột D là tiền quỹ đã nộp (nghìn đồng).', 'Vùng C2:C9 nghĩa là “từ ô C2 đến ô C9”, tức là toàn bộ 8 ô điểm (các ô được tô màu).'], sheet: {cols: 8, rows: 9, cells: gradeCells(), demo: {cell: 'G2', formula: '=COUNT(C2:C9)', note: 'Vùng C2:C9 được tô màu: 8 ô điểm.'}}, terms: {'Vùng': 'nhiều ô liền nhau, viết ô đầu:ô cuối, ví dụ C2:C9', 'Hàm': 'công cụ có sẵn của Excel, viết TÊN(…) như SUM, IF'}},
      {title: 'IF: nếu… thì… không thì…', text: ['Cấu trúc: =IF(điều kiện, "khi đúng", "khi sai").', 'Ví dụ =IF(C2>=8,"Đạt","Chưa đạt") đọc là: NẾU điểm ở C2 từ 8 trở lên THÌ ghi Đạt, KHÔNG THÌ ghi Chưa đạt. Dấu >= nghĩa là “lớn hơn hoặc bằng”. Chữ phải đặt trong dấu ngoặc kép.'], sheet: {cols: 8, rows: 9, cells: gradeCells(), demo: {cell: 'E2', fillTo: 9, formula: '=IF(C2>=8,"Đạt","Chưa đạt")', note: 'Kéo xuống, mỗi bạn được xếp loại tự động.'}}, terms: {'>=': 'lớn hơn hoặc bằng', '<': 'nhỏ hơn', '"…"': 'chữ trong công thức phải nằm trong ngoặc kép'}},
      {title: 'COUNTIF: đếm có điều kiện', text: ['Cấu trúc: =COUNTIF(vùng, "điều kiện").', 'Ví dụ =COUNTIF(C2:C9,">=8") đếm trong 8 ô điểm có bao nhiêu ô từ 8 trở lên.'], sheet: {cols: 8, rows: 9, cells: gradeCells(), demo: {cell: 'G2', formula: '=COUNTIF(C2:C9,">=8")', note: 'Có 4 bạn từ 8 điểm trở lên: An, Chi, Em, Khoa.'}}},
      {title: 'SUMIF: cộng có điều kiện', text: ['Cấu trúc: =SUMIF(vùng để xét, "điều kiện", vùng để cộng).', 'Ví dụ =SUMIF(B2:B9,"Tổ 1",D2:D9): xem cột tổ B2:B9, dòng nào là “Tổ 1” thì cộng số tiền ở cột D của dòng đó.'], sheet: {cols: 8, rows: 9, cells: gradeCells(), demo: {cell: 'H2', formula: '=SUMIF(B2:B9,"Tổ 1",D2:D9)', note: 'Tổ 1 nộp 50 + 50 + 50 + 20 = 170 (nghìn đồng).'}}},
      {title: 'Trong Excel thật cần nhớ', text: ['Bấm vào ô, gõ công thức bắt đầu bằng dấu =, bấm Enter. Muốn áp cho cả cột thì kéo chốt điền (ô vuông nhỏ góc dưới phải) xuống.', 'Máy cài định dạng Việt Nam dùng dấu chấm phẩy: =IF(C2>=8;"Đạt";"Chưa đạt"). Nếu Excel báo lỗi khi gõ dấu phẩy, hãy đổi sang dấu chấm phẩy.'], tip: 'Luôn tự kiểm tra một kết quả bằng cách đếm tay: lọc các bạn ≥ 8 và đếm xem có khớp không.'},
    ],
    lab: {type: 'sheet', intro: 'Đến lượt em làm 3 việc trên bảng điểm. Gõ công thức vào thanh fx, bấm Chạy (hoặc Enter). Dùng dấu phẩy hay chấm phẩy đều được.',
      sheet: {cols: 8, rows: 9, cells: gradeCells(), tasks: [
        {cell: 'E2', fillTo: 9, prompt: 'Ở E2, dùng IF ghi “Đạt” nếu điểm từ 8 trở lên, không thì “Chưa đạt”. Bảng sẽ tự kéo xuống E9.', mustUse: ['IF'], expect: (g, row) => (g['C' + row] >= 8 ? 'Đạt' : 'Chưa đạt'), hint: '=IF(C2>=8,"Đạt","Chưa đạt") — chữ trong ngoặc kép.', explain: 'Mỗi bạn được xếp loại đúng.'},
        {cell: 'G2', prompt: 'Ở G2, dùng COUNTIF đếm số bạn có điểm từ 8 trở lên.', mustUse: ['COUNTIF'], expect: 4, hint: '=COUNTIF(vùng điểm, ">=8"). Vùng điểm là C2:C9.', explain: 'Có 4 bạn: An, Chi, Em, Khoa.'},
        {cell: 'H2', prompt: 'Ở H2, dùng SUMIF tính tổng tiền quỹ của Tổ 1.', mustUse: ['SUMIF'], expect: 170, hint: '=SUMIF(cột tổ, "Tổ 1", cột quỹ) → =SUMIF(B2:B9,"Tổ 1",D2:D9)', explain: 'Tổ 1 nộp 170 nghìn đồng.'},
      ]}},
  },
};
