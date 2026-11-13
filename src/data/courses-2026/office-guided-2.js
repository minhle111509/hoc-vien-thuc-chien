// Guided Office lessons 1, 3–8, 11–14 (Word and Excel). Same beginner format as office-guided.js.
// Menu names in English with the Vietnamese interface name in brackets.

const TRACK = {taskLabel: 'Văn bản', keep: '✓ Chấp nhận', ask: '💬 Hỏi lại', remove: '✗ Từ chối', item: 'Thay đổi', approve: 'Hoàn tất duyệt', hint: 'Bạn cùng nhóm đã sửa bài bằng Track Changes. Với mỗi thay đổi, chọn Chấp nhận, Hỏi lại hoặc Từ chối.', success: '✓ Em duyệt đúng: giữ chỗ sửa tốt, từ chối chỗ làm sai nội dung.'};

const fundCells = (withText = false) => {
  const c = {A1: 'Ngày', B1: 'Nội dung', C1: 'Thu', D1: 'Chi', F1: 'Tổng thu', G1: 'Số dư'};
  const rows = [['02/11', 'Thu quỹ tháng 11', 400000, ''], ['05/11', 'Mua bóng đá', '', 150000], ['08/11', 'Bạn An nộp bù', withText ? 'năm chục' : 50000, ''], ['12/11', 'In giấy khen', '', 60000], ['15/11', 'Bán đồ tái chế', 120000, ''], ['20/11', 'Mua nước uống', '', 80000]];
  rows.forEach(([a, b, t, ch], i) => { const r = i + 2; c['A' + r] = a; c['B' + r] = b; if (t !== '') c['C' + r] = t; if (ch !== '') c['D' + r] = ch; });
  return c;
};
const BOOKS = [['S01', 'Dế Mèn phiêu lưu ký'], ['S02', 'Tắt đèn'], ['S03', 'Số đỏ'], ['S04', 'Lão Hạc'], ['S05', 'Chí Phèo']];
const bookCells = () => {
  const c = {A1: 'Mã', B1: 'Tên sách', D1: 'Mã mượn', E1: 'Tên sách'};
  BOOKS.forEach(([m, t], i) => { c['A' + (i + 2)] = m; c['B' + (i + 2)] = t; });
  ['S03', 'S01', 'S09', 'S05'].forEach((m, i) => { c['D' + (i + 2)] = m; });
  return c;
};
const lookupBook = code => (BOOKS.find(([m]) => m.toLowerCase() === String(code).toLowerCase()) || [null, 'Chưa có'])[1];
const SALES = [['Bánh mì', 'Tuần 1', 820], ['Sữa chua', 'Tuần 1', 400], ['Nước cam', 'Tuần 1', 300], ['Bánh mì', 'Tuần 2', 910], ['Sữa chua', 'Tuần 2', 380], ['Nước cam', 'Tuần 2', 350], ['Bánh mì', 'Tuần 3', 760], ['Sữa chua', 'Tuần 3', 420], ['Nước cam', 'Tuần 3', 290]];
const salesCells = () => {
  const c = {A1: 'Món', B1: 'Tuần', C1: 'Tiền (nghìn)', E1: 'Kiểm tra', F1: 'Bánh mì', G1: 'Sữa chua'};
  SALES.forEach(([m, w, t], i) => { const r = i + 2; c['A' + r] = m; c['B' + r] = w; c['C' + r] = t; });
  return c;
};
const salesTotal = name => SALES.filter(([m]) => m === name).reduce((s, [, , t]) => s + t, 0);

export const OFFICE_GUIDED_2 = {
  1: {
    outcome: 'Lưu bài trên OneDrive để không bao giờ mất bài, mở được ở máy khác và lấy lại bản cũ khi lỡ sửa hỏng.',
    analogy: 'OneDrive giống một chiếc tủ có khóa ở trên mạng: bài để trong tủ thì máy hỏng vẫn còn, đi đâu cũng mở được, và tủ còn tự giữ lại các bản cũ cho em.',
    walkthrough: [
      {title: 'Vì sao mất bài?', text: ['Bài lưu trên máy phòng tin học sẽ mất khi máy bị khởi động lại hoặc bị xóa. Bài lưu trên OneDrive thì nằm trên mạng, máy nào đăng nhập cũng mở được.'], terms: {'OneDrive': 'chỗ lưu tệp trên mạng đi kèm tài khoản Microsoft', 'Đăng nhập': 'vào tài khoản bằng email và mật khẩu của em'}},
      {title: 'AutoSave: tự động lưu', text: ['Khi tệp nằm trên OneDrive, góc trên bên trái Word có công tắc AutoSave (Tự động lưu). Bật lên thì mỗi chữ em gõ đều được lưu ngay, không cần bấm Lưu.'], tip: 'Công tắc AutoSave xám, không bật được? Tệp đang nằm trên máy, chưa lên OneDrive.'},
      {title: 'Lấy lại bản cũ', text: ['Lỡ xóa mất một đoạn? Vào File › Info › Version History (Tệp › Thông tin › Lịch sử phiên bản), chọn bản cũ và bấm Restore (Khôi phục).'], ribbon: {app: 'word', tab: 'File', group: 'Info', buttons: ['Protect Document', 'Inspect Document', 'Version History'], press: 'Version History'}},
      {title: 'Đặt tên tệp dễ tìm', text: ['Mẫu đặt tên: Năm-Tháng_NộiDung, ví dụ 2026-11_BaoCao_CLB. Tên như “final”, “moi (2)” sau một tháng không ai biết là gì.']},
    ],
    lab: {type: 'sort', intro: 'Thư mục OneDrive của lớp có các tệp dưới đây. Tên nào đã tốt, tên nào nên đổi?', groups: ['Tên tốt', 'Nên đổi tên'],
      items: [
        {text: '2026-11_BaoCao_CLB-MoiTruong.docx', group: 'Tên tốt', why: 'Có thời gian và nội dung rõ.'},
        {text: 'final_final_moi.docx', group: 'Nên đổi tên', why: 'Không biết là bài gì, bản nào.'},
        {text: 'Document1 (2).docx', group: 'Nên đổi tên', why: 'Tên mặc định, không có nghĩa.'},
        {text: '2026-10_BienBan_HopPhuHuynh.docx', group: 'Tên tốt', why: 'Rõ ngày và nội dung.'},
        {text: 'baitap.docx', group: 'Nên đổi tên', why: 'Bài tập gì, môn nào, khi nào?'},
        {text: '2026-11_SoQuy_Lop10A1.xlsx', group: 'Tên tốt', why: 'Tìm và sắp xếp theo thời gian dễ dàng.'},
      ]},
  },
  3: {
    outcome: 'Tạo mục lục tự cập nhật và đánh số trang đúng chuẩn: trang bìa không có số, nội dung bắt đầu từ trang 1.',
    analogy: 'Mục lục tự động giống danh bạ điện thoại tự cập nhật: thêm một người là danh bạ tự có, không phải chép tay lại cả cuốn.',
    walkthrough: [
      {title: 'Mục lục tự động lấy từ đâu?', text: ['Word đọc các dòng em đã gán Heading 1, Heading 2 (bài 2) để làm mục lục. Vì vậy phải gán Style trước.', 'Chèn mục lục: References › Table of Contents (Tham chiếu › Mục lục), chọn mẫu tự động.'], ribbon: {app: 'word', tab: 'References', group: 'Table of Contents', buttons: ['Table of Contents', 'Add Text', 'Update Table'], press: 'Table of Contents'}},
      {title: 'Cập nhật mục lục', text: ['Thêm hay sửa nội dung thì số trang thay đổi. Bấm Update Table › Update entire table (Cập nhật toàn bộ) để mục lục đúng lại.'], ribbon: {app: 'word', tab: 'References', group: 'Table of Contents', buttons: ['Table of Contents', 'Add Text', 'Update Table'], press: 'Update Table'}},
      {title: 'Tách trang bìa bằng Section Break', text: ['Section Break (Ngắt phần) chia văn bản thành các phần có cách đánh số riêng. Đặt con trỏ cuối trang bìa, chọn Layout › Breaks › Next Page (Bố trí › Ngắt › Trang tiếp theo).'], ribbon: {app: 'word', tab: 'Layout', group: 'Page Setup', buttons: ['Margins', 'Orientation', 'Size', 'Breaks'], press: 'Breaks'}, terms: {'Section Break': 'dấu chia văn bản thành các phần, mỗi phần có số trang, chân trang riêng'}},
      {title: 'Đánh số từ 1 cho phần nội dung', text: ['Nhấp đúp vào chân trang của phần 2, tắt Link to Previous (Nối kết đến trước). Chèn số trang, rồi Format Page Numbers › Start at 1 (Bắt đầu từ 1).'], tip: 'Quên tắt Link to Previous thì trang bìa vẫn hiện số.'},
    ],
    lab: {type: 'order', intro: 'Sắp xếp các bước để đề án có trang bìa không số, nội dung đánh số từ 1 và có mục lục.', items: ['Gán Heading 1, Heading 2 cho các tiêu đề', 'Chèn Section Break (Next Page) sau trang bìa', 'Tắt Link to Previous ở chân trang phần 2', 'Chèn số trang và chọn Start at 1', 'Chèn Table of Contents ở trang 2'], explain: 'Heading trước để mục lục có nội dung; tách phần trước rồi mới đánh số.'},
  },
  4: {
    outcome: 'Chèn bảng và hình vào Word mà bố cục không bị nhảy lung tung, có chú thích tự đánh số và chữ thay thế cho người khiếm thị.',
    analogy: 'Ảnh “In Line with Text” giống một chữ to nằm trong câu: câu chạy đến đâu, ảnh đi theo đến đó. Ảnh “In Front of Text” giống tờ giấy dán đè lên trang: chữ chạy đi mà tờ giấy vẫn đứng yên.',
    walkthrough: [
      {title: 'Ảnh không bị nhảy: Wrap Text', text: ['Bấm vào ảnh, chọn Wrap Text (Ngắt dòng văn bản) › In Line with Text. Ảnh đi theo đoạn văn khi em thêm bớt chữ.'], terms: {'Wrap Text': 'cách chữ nằm quanh ảnh'}},
      {title: 'Bảng dài sang trang', text: ['Bôi đen hàng tiêu đề của bảng › Table Layout › Repeat Header Rows (Lặp lại hàng tiêu đề). Trang nào cũng thấy tên cột.']},
      {title: 'Chú thích tự đánh số', text: ['Chuột phải ảnh hoặc bảng › Insert Caption (Chèn chú thích), chọn nhãn Hình hoặc Bảng. Word tự đánh Hình 1, Hình 2… và tự đánh lại khi thêm hình mới.'], ribbon: {app: 'word', tab: 'References', group: 'Captions', buttons: ['Insert Caption', 'Insert Table of Figures'], press: 'Insert Caption'}},
      {title: 'Chữ thay thế (Alt Text)', text: ['Chuột phải ảnh › View/Edit Alt Text, viết thông tin ảnh truyền tải. Người khiếm thị dùng phần mềm đọc màn hình sẽ nghe được nội dung này.'], code: 'Kém: “Ảnh minh họa”\nTốt: “Biểu đồ cột: rác thu gom tăng từ 12 kg tuần 1 lên 30 kg tuần 4.”'},
    ],
    lab: {type: 'sort', intro: 'Với mỗi tình huống, em dùng chức năng nào?', groups: ['In Line with Text', 'Repeat Header Rows', 'Insert Caption', 'Alt Text'],
      items: [
        {text: 'Thêm một đoạn ở trên, ảnh bị nhảy sang trang khác.', group: 'In Line with Text', why: 'Ảnh đi theo đoạn văn.'},
        {text: 'Bảng 3 trang, trang 2 và 3 không thấy tên cột.', group: 'Repeat Header Rows', why: 'Lặp hàng tiêu đề ở mỗi trang.'},
        {text: 'Muốn hình tự đánh số Hình 1, Hình 2…', group: 'Insert Caption', why: 'Chú thích tự đánh số.'},
        {text: 'Bạn khiếm thị cần biết biểu đồ nói gì.', group: 'Alt Text', why: 'Phần mềm đọc màn hình đọc Alt Text.'},
        {text: 'Chèn thêm hình giữa Hình 2 và Hình 3, muốn số tự đổi.', group: 'Insert Caption', why: 'Caption tự đánh số lại.'},
      ]},
  },
  5: {
    outcome: 'Sửa bài cùng bạn mà ai cũng thấy chỗ nào bị sửa, vì sao sửa, và người viết tự quyết giữ hay bỏ.',
    analogy: 'Track Changes giống cô giáo sửa bài bằng bút đỏ: chữ gạch đi vẫn đọc được, chữ thêm vào thấy rõ, và em quyết định nghe theo hay không.',
    walkthrough: [
      {title: 'Bật Track Changes', text: ['Review › Track Changes (Xem lại › Theo dõi thay đổi), hoặc Ctrl+Shift+E. Từ lúc bật, chữ thêm vào có gạch chân màu, chữ xóa bị gạch ngang.'], ribbon: {app: 'word', tab: 'Review', group: 'Tracking', buttons: ['Track Changes', 'Simple Markup', 'Reviewing Pane'], press: 'Track Changes'}},
      {title: 'Góp ý bằng Comment', text: ['Muốn hỏi hoặc góp ý mà không sửa thẳng: bôi đen đoạn, bấm New Comment (Chú thích mới). Gõ @tên để nhắc bạn cùng nhóm.']},
      {title: 'Chấp nhận hay từ chối', text: ['Người viết dùng Accept (Chấp nhận) hoặc Reject (Từ chối) cho từng thay đổi. Chỗ sửa làm sai nội dung thì từ chối.'], ribbon: {app: 'word', tab: 'Review', group: 'Changes', buttons: ['Accept', 'Reject', 'Previous', 'Next'], press: 'Accept'}},
      {title: 'Trước khi gửi bản cuối', text: ['Tắt Track Changes không xóa các thay đổi đang chờ. Phải Accept hoặc Reject hết, xóa các nhận xét đã xử lý, rồi mới gửi.']},
    ],
    lab: {type: 'plan', intro: 'Bạn Lan đã sửa bài tham luận của em. Duyệt từng thay đổi.', labels: TRACK, task: 'Bài tham luận “Giảm rác nhựa ở căng tin”',
      steps: [
        {text: '“rất nhiều học sinh” → “68% học sinh (82/120)”', ok: ['keep'], why: 'Có số liệu khảo sát, thuyết phục hơn.'},
        {text: 'Sửa lỗi chính tả “rát thải” → “rác thải”', ok: ['keep'], why: 'Sửa lỗi đúng.'},
        {text: '“40 kg mỗi tuần” → “400 kg mỗi tuần”', ok: ['remove', 'ask'], why: 'Số liệu khảo sát là 40 kg; sửa này làm sai nội dung.'},
        {text: 'Xóa cả đoạn đề xuất giải pháp', ok: ['ask', 'remove'], why: 'Đoạn quan trọng; hỏi lại lý do trước khi đồng ý xóa.'},
        {text: 'Gộp hai câu ngắn thành một câu cho mạch lạc', ok: ['keep'], why: 'Cải thiện văn phong, không đổi nội dung.'},
      ]},
  },
  6: {
    outcome: 'Tạo hàng chục giấy mời, mỗi giấy đúng tên từng bạn, chỉ trong vài phút bằng Mail Merge.',
    analogy: 'Mail Merge giống con dấu có chỗ trống: một mẫu giấy mời, máy tự điền tên từng người vào chỗ trống, in ra 120 tờ khác tên nhau.',
    walkthrough: [
      {title: 'Chuẩn bị danh sách Excel', text: ['Hàng 1 là tiêu đề cột (HoTen, Lop), mỗi dòng một người, không có dòng trống. Dùng dữ liệu giả để luyện tập.'], code: 'HoTen          | Lop\nNguyễn Văn An  | 10A1\nTrần Thị Bình  | 10A2'},
      {title: 'Nối Word với danh sách', text: ['Mailings › Start Mail Merge › Letters (Gửi thư › Bắt đầu phối thư › Thư). Rồi Select Recipients › Use an Existing List (Dùng danh sách có sẵn), chọn tệp Excel.'], ribbon: {app: 'word', tab: 'Mailings', group: 'Start Mail Merge', buttons: ['Start Mail Merge', 'Select Recipients', 'Edit Recipient List'], press: 'Select Recipients'}},
      {title: 'Chèn chỗ trống', text: ['Đặt con trỏ chỗ cần tên › Insert Merge Field › HoTen. Trên trang hiện «HoTen».'], code: 'Kính gửi phụ huynh em «HoTen», lớp «Lop»,\nLiên đội trân trọng kính mời Quý phụ huynh…'},
      {title: 'Xem trước rồi mới in', text: ['Preview Results (Xem trước kết quả), bấm mũi tên xem từng thư. Thấy ô trống hay sai tên thì sửa trong Excel. Xong bấm Finish & Merge.'], tip: 'Lỗi trong danh sách sẽ xuất hiện trong mọi thư tương ứng.'},
    ],
    lab: {type: 'order', intro: 'Sắp xếp quy trình Mail Merge.', items: ['Chuẩn bị danh sách Excel có hàng tiêu đề', 'Start Mail Merge › Letters', 'Select Recipients › Use an Existing List', 'Insert Merge Field cho tên và lớp', 'Preview Results để kiểm tra', 'Finish & Merge'], explain: 'Có danh sách mới chèn được trường; xem trước rồi mới hoàn tất.'},
  },
  7: {
    outcome: 'Tự hoàn thiện một báo cáo Word chuẩn: có bìa, mục lục, bảng, hình, số liệu đúng và xuất PDF gửi đi.',
    analogy: 'Hoàn thiện báo cáo giống chuẩn bị đi thi: quần áo chỉnh tề (định dạng) là cần, nhưng quan trọng nhất là bài làm đúng (số liệu).',
    walkthrough: [
      {title: 'Ghép các kỹ năng đã học', text: ['Styles (bài 2), mục lục và số trang (bài 3), bảng và hình (bài 4), sửa cùng bạn (bài 5).']},
      {title: 'Kiểm tra trợ năng', text: ['Review › Check Accessibility (Kiểm tra trợ năng) tìm ảnh thiếu Alt Text, bảng thiếu tiêu đề. Sửa hết cảnh báo.'], ribbon: {app: 'word', tab: 'Review', group: 'Accessibility', buttons: ['Check Accessibility'], press: 'Check Accessibility'}},
      {title: 'Đối chiếu số liệu và xuất PDF', text: ['So mọi con số trong bảng với sổ ghi chép của CLB. Xong: File › Save As › PDF. Mở lại tệp PDF kiểm tra lần cuối.'], tip: 'PDF giữ nguyên phông và bố cục trên mọi máy.'},
    ],
    lab: {type: 'plan', intro: 'Bạn cùng nhóm đề xuất các việc để hoàn thiện báo cáo trước khi gửi Ban giám hiệu. Duyệt từng việc.', labels: {taskLabel: 'Báo cáo', item: 'Việc', approve: 'Chốt danh sách việc', hint: 'Chọn Giữ, Hỏi lại hoặc Bỏ cho từng việc, rồi bấm Chốt.', success: '✓ Danh sách việc hợp lý: tập trung vào đúng và rõ.'}, task: 'Báo cáo tổng kết học kỳ của CLB Môi trường',
      steps: [
        {text: 'Update Table cho mục lục sau khi sửa nội dung.', ok: ['keep'], why: 'Mục lục phải khớp số trang mới.'},
        {text: 'Làm tròn 38 bạn tham gia thành 50 cho đẹp.', ok: ['remove'], why: 'Sửa số liệu là sai sự thật.'},
        {text: 'Chạy Check Accessibility và thêm Alt Text còn thiếu.', ok: ['keep'], why: 'Báo cáo dễ tiếp cận hơn.'},
        {text: 'Đối chiếu số liệu bảng với sổ ghi chép CLB.', ok: ['keep'], why: 'Bảo đảm báo cáo đúng.'},
        {text: 'Thêm chữ nghệ thuật 3D nhiều màu cho tiêu đề.', ok: ['remove', 'ask'], why: 'Không giúp nội dung, khó đọc khi in.'},
        {text: 'Xuất PDF và mở lại kiểm tra.', ok: ['keep'], why: 'Người nhận xem đúng bố cục.'},
      ]},
  },
  8: {
    outcome: 'Biến một sổ ghi chép lộn xộn thành bảng Excel tính được tổng thu, tổng chi, số dư.',
    analogy: 'Bảng Excel chuẩn giống tủ thuốc có ngăn dán nhãn: mỗi ngăn một loại. Để lẫn thuốc vào nhau (chữ lẫn với số, ô gộp) thì không ai tìm được.',
    walkthrough: [
      {title: 'Mỗi cột một loại dữ liệu', text: ['Cột Ngày chỉ có ngày, cột Thu chỉ có số tiền. Không gõ “năm chục” vào cột tiền, không gộp ô (Merge) trong vùng dữ liệu.'], sheet: {cols: 7, rows: 7, cells: fundCells(true), demo: {cell: 'F2', formula: '=SUM(C2:C7)', note: 'Ô C4 ghi chữ “năm chục” nên bị bỏ qua: tổng thu ra 520.000 thay vì 570.000.'}}, terms: {'SUM': 'hàm cộng tất cả số trong một vùng'}},
      {title: 'Biến vùng thành bảng: Ctrl+T', text: ['Bấm một ô trong vùng dữ liệu, nhấn Ctrl+T, tick My table has headers. Bảng có bộ lọc, tự mở rộng khi thêm dòng. Đặt tên bảng ở Table Design › Table Name.'], ribbon: {app: 'excel', tab: 'Home', group: 'Styles', buttons: ['Conditional Formatting', 'Format as Table', 'Cell Styles'], press: 'Format as Table'}},
      {title: 'Tính tổng và số dư', text: ['Tổng thu: =SUM(C2:C7). Số dư = tổng thu − tổng chi: =SUM(C2:C7)-SUM(D2:D7).'], code: '=SUM(C2:C7)\n=SUM(C2:C7)-SUM(D2:D7)'},
    ],
    lab: {type: 'sheet', intro: 'Sổ quỹ đã được sửa đúng dạng số. Gõ công thức vào thanh fx rồi bấm Chạy.',
      sheet: {cols: 7, rows: 7, cells: fundCells(false), tasks: [
        {cell: 'F2', answer: '=SUM(C2:C7)', prompt: 'Ở F2, tính tổng thu (cột C, từ C2 đến C7).', mustUse: ['SUM'], expect: 570000, hint: '=SUM(C2:C7)', explain: 'Tổng thu 570.000đ.'},
        {cell: 'G2', answer: '=SUM(C2:C7)-SUM(D2:D7)', prompt: 'Ở G2, tính số dư = tổng thu − tổng chi.', mustUse: ['SUM'], expect: 280000, hint: '=SUM(C2:C7)-SUM(D2:D7)', explain: 'Còn 280.000đ.'},
      ]}},
  },
  11: {
    outcome: 'Gõ mã sách là Excel tự điền tên sách từ danh mục, và báo “Chưa có” nếu mã không tồn tại.',
    analogy: 'XLOOKUP giống tra danh bạ: biết tên (mã sách), dò trong cột tên, đọc ra số điện thoại (tên sách) cùng dòng.',
    walkthrough: [
      {title: 'Bài toán tra cứu', text: ['Danh mục sách ở cột A–B. Phiếu mượn ở cột D chỉ có mã. Cần cột E tự hiện tên sách.'], sheet: {cols: 5, rows: 6, cells: bookCells(), caption: 'Danh mục bên trái, phiếu mượn bên phải.'}},
      {title: 'Cấu trúc XLOOKUP', text: ['=XLOOKUP(mã cần tìm, cột mã, cột tên, "khi không thấy").', 'Ví dụ: =XLOOKUP(D2,$A$2:$A$6,$B$2:$B$6,"Chưa có"). Dấu $ ghim danh mục để kéo xuống không bị trượt (bài 9).'], sheet: {cols: 5, rows: 6, cells: bookCells(), demo: {cell: 'E2', fillTo: 5, formula: '=XLOOKUP(D2,$A$2:$A$6,$B$2:$B$6,"Chưa có")', note: 'Mã S09 không có trong danh mục nên hiện “Chưa có”.'}}, terms: {'Tra cứu': 'tìm một giá trị trong bảng và lấy thông tin cùng dòng'}},
      {title: 'Khi mã đúng mà vẫn “Chưa có”', text: ['Thường do dấu cách thừa: “S03 ” khác “S03”. Dùng hàm TRIM để bỏ dấu cách thừa, hoặc sửa dữ liệu.', 'Excel cũ không có XLOOKUP thì dùng VLOOKUP(D2,$A$2:$B$6,2,FALSE).'], tip: 'Quên dấu $ ở vùng danh mục thì kéo xuống vùng bị trượt và tra sai.'},
    ],
    lab: {type: 'sheet', intro: 'Gõ công thức ở E2 để tra tên sách; bảng sẽ tự kéo xuống E5.',
      sheet: {cols: 5, rows: 6, cells: bookCells(), tasks: [
        {cell: 'E2', answer: '=XLOOKUP(D2,$A$2:$A$6,$B$2:$B$6,"Chưa có")', fillTo: 5, prompt: 'Ở E2, dùng XLOOKUP tra tên sách theo mã ở D2; nếu không thấy ghi "Chưa có". Kéo xuống vẫn phải đúng.', mustUse: ['XLOOKUP'], expect: (g, row) => lookupBook(g['D' + row]), hint: '=XLOOKUP(D2,$A$2:$A$6,$B$2:$B$6,"Chưa có") — nhớ dấu $ cho vùng danh mục.', explain: 'Mọi mã đều tra đúng, mã S09 báo “Chưa có”.'},
      ]}},
  },
  12: {
    outcome: 'Giữ dữ liệu sạch: người nhập chỉ chọn được giá trị hợp lệ, và em nhận ra dữ liệu nào cần sửa.',
    analogy: 'Data Validation giống ô khóa số: chỉ bấm được số 0–9, muốn gõ chữ cũng không vào. Dữ liệu sai bị chặn ngay từ cửa.',
    walkthrough: [
      {title: 'Vì sao thống kê bị sai?', text: ['Người gõ “10A1”, người gõ “10a1”, người gõ “lớp 10A1”. Máy coi là 3 lớp khác nhau.']},
      {title: 'Danh sách thả xuống', text: ['Chọn cột Lớp › Data › Data Validation (Dữ liệu › Xác thực dữ liệu) › Allow: List, Source: 10A1,10A2,10A3. Người nhập chỉ chọn được trong danh sách.'], ribbon: {app: 'excel', tab: 'Data', group: 'Data Tools', buttons: ['Text to Columns', 'Remove Duplicates', 'Data Validation'], press: 'Data Validation'}},
      {title: 'Giới hạn điểm 0–10', text: ['Cột điểm: Allow: Decimal, between 0 and 10, thêm Error Alert (Cảnh báo lỗi). Gõ 12 sẽ bị chặn.'], terms: {'Data Validation': 'quy tắc chỉ cho nhập giá trị hợp lệ'}},
      {title: 'Lọc và làm sạch', text: ['Filter chỉ ẩn dòng, không xóa. Remove Duplicates (Loại bỏ trùng lặp) xóa dòng trùng; TRIM bỏ dấu cách thừa.']},
    ],
    lab: {type: 'sort', intro: 'Quy tắc: Lớp chỉ được là 10A1, 10A2, 10A3; Điểm là số từ 0 đến 10. Mỗi dòng nhập sau đây hợp lệ hay cần sửa?', groups: ['Hợp lệ', 'Cần sửa'],
      items: [
        {text: 'Lớp: 10A2 · Điểm: 8.5', group: 'Hợp lệ', why: 'Đúng danh sách lớp, điểm trong khoảng 0–10.'},
        {text: 'Lớp: 10a1 · Điểm: 7', group: 'Cần sửa', why: 'Viết thường “10a1” khác “10A1” trong danh sách thả xuống.'},
        {text: 'Lớp: lớp 10A3 · Điểm: 9', group: 'Cần sửa', why: 'Thêm chữ “lớp” làm sai giá trị.'},
        {text: 'Lớp: 10A1 · Điểm: 12', group: 'Cần sửa', why: 'Điểm vượt quá 10.'},
        {text: 'Lớp: 10A3 · Điểm: 0', group: 'Hợp lệ', why: '0 vẫn nằm trong khoảng 0–10.'},
        {text: 'Lớp: 10A2 · Điểm: tám', group: 'Cần sửa', why: 'Điểm phải là số.'},
      ]},
  },
  13: {
    outcome: 'Dùng PivotTable tóm tắt hàng trăm dòng bán hàng thành bảng gọn theo món và tuần, rồi tự kiểm tra con số.',
    analogy: 'PivotTable giống đổ một túi kẹo lẫn lộn ra bàn rồi xếp thành từng đống theo màu: đếm từng đống dễ hơn nhiều.',
    walkthrough: [
      {title: 'Dữ liệu gốc', text: ['Mỗi dòng là một lần bán: Món, Tuần, Tiền. Hàng trăm dòng như vậy rất khó đọc.'], sheet: {cols: 3, rows: 10, cells: salesCells(), caption: 'Dữ liệu bán hàng căng tin (nghìn đồng).'}},
      {title: 'Tạo PivotTable', text: ['Insert › PivotTable › New Worksheet. Kéo Món vào Rows, Tuần vào Columns, Tiền vào Values.'], ribbon: {app: 'excel', tab: 'Insert', group: 'Tables', buttons: ['PivotTable', 'Recommended PivotTables', 'Table'], press: 'PivotTable'}, code: 'Món       Tuần 1  Tuần 2  Tuần 3  Tổng\nBánh mì   820     910     760     2490\nSữa chua  400     380     420     1200\nNước cam  300     350     290     940', terms: {'Rows': 'nhãn hàng của bảng tóm tắt', 'Values': 'con số được cộng'}},
      {title: 'Refresh và kiểm tra', text: ['Thêm dữ liệu mới vào bảng nguồn thì bấm Refresh (Alt+F5). Kiểm tra một ô PivotTable bằng SUMIF trên dữ liệu gốc.'], tip: 'PivotTable không tự cập nhật; quên Refresh là số liệu cũ.'},
    ],
    lab: {type: 'sheet', intro: 'Kiểm tra lại PivotTable bằng SUMIF: tổng tiền của từng món phải khớp cột Tổng.',
      sheet: {cols: 7, rows: 10, cells: salesCells(), tasks: [
        {cell: 'F2', answer: '=SUMIF(A2:A10,"Bánh mì",C2:C10)', prompt: 'Ở F2, dùng SUMIF tính tổng tiền món Bánh mì.', mustUse: ['SUMIF'], expect: salesTotal('Bánh mì'), hint: '=SUMIF(A2:A10,"Bánh mì",C2:C10)', explain: 'Khớp cột Tổng của PivotTable: 2.490.'},
        {cell: 'G2', answer: '=SUMIF(A2:A10,"Sữa chua",C2:C10)', prompt: 'Ở G2, tính tổng tiền món Sữa chua.', mustUse: ['SUMIF'], expect: salesTotal('Sữa chua'), hint: '=SUMIF(A2:A10,"Sữa chua",C2:C10)', explain: 'Khớp: 1.200.'},
      ]}},
  },
  14: {
    outcome: 'Chọn đúng loại biểu đồ cho câu hỏi cần trả lời và đặt tiêu đề nói rõ kết luận.',
    analogy: 'Chọn biểu đồ giống chọn dụng cụ: so ai cao hơn thì dùng thước (cột), xem tăng giảm theo thời gian thì dùng nhiệt kế qua từng ngày (đường), chia một chiếc bánh thì dùng hình tròn.',
    walkthrough: [
      {title: 'Ba loại biểu đồ hay dùng', text: ['Cột: so sánh các nhóm (12 lớp). Đường: thay đổi theo thời gian (12 tuần). Tròn: một tổng chia thành ít phần (dưới 5 phần), cộng lại 100%.'], ribbon: {app: 'excel', tab: 'Insert', group: 'Charts', buttons: ['Recommended Charts', 'Column', 'Line', 'Pie'], press: 'Recommended Charts'}},
      {title: 'Tiêu đề là kết luận', text: ['Thay “Biểu đồ 1” bằng câu người xem cần nhớ.'], code: 'Kém: “Biểu đồ 1”\nTốt: “Giấy thu gom tăng đều, tuần 4 gấp đôi tuần 1”'},
      {title: 'Tránh làm người xem hiểu sai', text: ['Trục tung bắt đầu từ 0, không dùng 3D, ghi nguồn dữ liệu.']},
    ],
    lab: {type: 'sort', intro: 'Với mỗi câu hỏi, chọn loại biểu đồ phù hợp nhất.', groups: ['Biểu đồ cột', 'Biểu đồ đường', 'Biểu đồ tròn'],
      items: [
        {text: 'Lớp nào thu gom nhiều giấy nhất trong 12 lớp?', group: 'Biểu đồ cột', why: 'So sánh các nhóm.'},
        {text: 'Lượng giấy thu gom thay đổi thế nào qua 12 tuần?', group: 'Biểu đồ đường', why: 'Xu hướng theo thời gian.'},
        {text: 'Rác của căng tin gồm bao nhiêu phần nhựa, giấy, thức ăn?', group: 'Biểu đồ tròn', why: 'Một tổng chia thành ít phần.'},
        {text: 'So sánh điểm trung bình 4 tổ.', group: 'Biểu đồ cột', why: 'So sánh nhóm.'},
        {text: 'Nhiệt độ phòng học từ 7 giờ đến 17 giờ.', group: 'Biểu đồ đường', why: 'Thay đổi theo thời gian.'},
      ]},
  },
};
