// Teaching layer for the Office course (pilot): how-to steps, a worked example, an auto-checked
// exercise and three lesson-specific questions per lesson. Menu names are given in English with the
// Vietnamese interface name in brackets. Excel in Vietnamese regional settings uses ";" instead of ","
// between arguments; the exercise checker accepts both.
//
// exercise.type: 'formula' (typed answer, compared after normalising spaces, case, quotes and ;/,),
//                'choice' (pick one option), 'order' (put steps in the right order).
export const OFFICE_TEACH = {
  1: {minutes: '20–30 phút',
    steps: ['Đăng nhập office.com bằng tài khoản Microsoft (của trường nếu có).', 'Mở OneDrive, bấm New › Folder (Mới › Thư mục), đặt tên “HocTap”.', 'Trong thư mục, bấm New › Word document; đặt tên tệp rõ ràng, ví dụ “2026-11_BaoCao_CLB”.', 'Kiểm tra công tắc AutoSave (Tự động lưu) ở góc trên bên trái đang Bật.', 'Sửa tệp vài lần, sau đó mở File › Info › Version History (Tệp › Thông tin › Lịch sử phiên bản) để xem và khôi phục bản cũ.'],
    example: {title: 'Cấu trúc thư mục gọn gàng', body: 'OneDrive\n└─ HocTap\n   ├─ Van\n   │  └─ 2026-11_NghiLuan_BanNhap.docx\n   └─ CLB-MoiTruong\n      └─ 2026-11_BaoCao_ThangMuoi.docx'},
    exercise: {type: 'order', prompt: 'Sắp xếp các bước khôi phục một bản cũ của tệp Word trên OneDrive.', items: ['Mở tệp Word', 'Vào File › Info (Tệp › Thông tin)', 'Chọn Version History (Lịch sử phiên bản)', 'Chọn bản cần lấy lại và bấm Restore (Khôi phục)'], explain: 'Lịch sử phiên bản chỉ có khi tệp được lưu trên OneDrive/SharePoint.'},
    quiz: [
      {q: 'AutoSave chỉ hoạt động khi nào?', options: ['Khi tệp lưu trên OneDrive hoặc SharePoint', 'Khi máy có ổ cứng lớn', 'Khi tắt Internet'], answer: 0, why: 'AutoSave lưu liên tục lên đám mây nên cần tệp nằm trên OneDrive/SharePoint.'},
      {q: 'Tên tệp nào dễ tìm lại nhất?', options: ['baocao moi (2).docx', 'final_final.docx', '2026-11_BaoCao_CLB.docx'], answer: 2, why: 'Năm-tháng + nội dung giúp sắp xếp theo thời gian và nhận ra ngay.'},
      {q: 'Lưu tệp lên OneDrive thì ai xem được?', options: ['Mọi người trên Internet', 'Chỉ em, cho đến khi em chủ động chia sẻ', 'Mọi học sinh cùng trường'], answer: 1, why: 'Tệp riêng tư mặc định; chỉ khi chia sẻ người khác mới mở được.'}]},
  2: {minutes: '20–30 phút',
    steps: ['Đặt con trỏ vào dòng tiêu đề chương, chọn Heading 1 trong Home › Styles (Trang đầu › Kiểu).', 'Với mục con, chọn Heading 2; đoạn thường để Normal.', 'Muốn đổi mọi tiêu đề chương: chuột phải Heading 1 › Modify (Sửa đổi), chọn phông, cỡ, màu › OK.', 'Bật View › Navigation Pane (Dạng xem › Ngăn dẫn hướng) hoặc Ctrl+F để xem dàn ý; tiêu đề nào không hiện là chưa gán Style.'],
    example: {title: 'Văn bản trước và sau khi dùng Styles', body: 'Trước: “CHƯƠNG 1. MỞ ĐẦU” — tự bôi đậm, cỡ 16 (Word coi là đoạn thường)\nSau:   “CHƯƠNG 1. MỞ ĐẦU” — Style: Heading 1\n       “1.1 Lý do chọn đề tài” — Style: Heading 2\n→ Navigation Pane hiện đủ 2 cấp; mục lục tự động lấy được cả hai.'},
    exercise: {type: 'choice', prompt: 'Báo cáo có 12 tiêu đề chương đang cỡ 14, cô yêu cầu đổi tất cả sang cỡ 16 màu đỏ. Cách nhanh và đúng nhất?', options: ['Bôi đen từng tiêu đề rồi chỉnh tay 12 lần', 'Chuột phải Style Heading 1 › Modify, đổi cỡ 16 màu đỏ một lần', 'Dùng Format Painter cho từng tiêu đề'], answer: 1, explain: 'Sửa Style một lần, mọi đoạn gán Style đó đổi theo.'},
    quiz: [
      {q: 'Vì sao tiêu đề tự bôi đậm không hiện trong mục lục tự động?', options: ['Vì chữ chưa đủ to', 'Vì Word không biết đó là tiêu đề nếu chưa gán Heading', 'Vì phải dùng phông Times New Roman'], answer: 1, why: 'Mục lục và Navigation Pane đọc Style Heading, không đọc định dạng tay.'},
      {q: 'Phím tắt mở nhanh Navigation Pane?', options: ['Ctrl+F', 'Ctrl+P', 'Ctrl+S'], answer: 0, why: 'Ctrl+F mở ngăn tìm kiếm cũng là Navigation Pane.'},
      {q: 'Mục con trong chương nên gán Style nào?', options: ['Title', 'Heading 2', 'Normal'], answer: 1, why: 'Heading 2 là cấp dưới Heading 1.'}]},
  3: {minutes: '30–40 phút',
    steps: ['Gán Heading 1/2 cho các tiêu đề (bài trước).', 'Đặt con trỏ cuối trang bìa, chọn Layout › Breaks › Next Page (Bố trí › Ngắt › Trang tiếp theo).', 'Nhấp đúp chân trang phần 2, tắt Link to Previous (Nối kết đến trước).', 'Insert › Page Number (Chèn › Số trang), rồi Format Page Numbers › Start at 1 (Bắt đầu từ 1).', 'Đặt con trỏ trang 2, chọn References › Table of Contents (Tham chiếu › Mục lục) › mẫu tự động.', 'Khi sửa nội dung, bấm Update Table › Update entire table (Cập nhật toàn bộ).'],
    example: {title: 'Bố cục đề án', body: 'Trang bìa (phần 1, không số)\n──── Section Break (Next Page) ────\nMục lục ........................ 1\nChương 1. Mở đầu ............... 2\n  1.1 Lý do chọn đề tài ........ 2\nChương 2. Kết quả .............. 4'},
    exercise: {type: 'order', prompt: 'Sắp xếp các bước để trang bìa không có số và nội dung đánh số từ 1.', items: ['Chèn Section Break (Next Page) sau trang bìa', 'Tắt Link to Previous ở chân trang phần 2', 'Chèn số trang ở phần 2', 'Format Page Numbers › Start at 1'], explain: 'Phải tách phần và cắt liên kết trước, nếu không số trang vẫn chạy từ trang bìa.'},
    quiz: [
      {q: 'Thêm một mục mới, mục lục chưa đổi. Em làm gì?', options: ['Gõ thêm dòng vào mục lục', 'Bấm Update Table › Update entire table', 'Xóa mục lục làm lại từ đầu'], answer: 1, why: 'Mục lục tự động chỉ cập nhật khi bấm Update Table.'},
      {q: 'Muốn trang bìa không có số trang cần dùng gì?', options: ['Section Break và tắt Link to Previous', 'Xóa số trang bằng phím Delete', 'Đổi màu số trang thành trắng'], answer: 0, why: 'Tách phần cho phép mỗi phần có cách đánh số riêng.'},
      {q: 'Mục lục tự động lấy nội dung từ đâu?', options: ['Từ các đoạn in đậm', 'Từ các đoạn gán Style Heading', 'Từ tên tệp'], answer: 1, why: 'TOC đọc Heading 1, 2, 3.'}]},
  4: {minutes: '25–35 phút',
    steps: ['Insert › Table (Chèn › Bảng), chọn số cột/hàng; gõ hàng tiêu đề.', 'Bôi đen hàng tiêu đề › Table Layout › Repeat Header Rows (Lặp lại hàng tiêu đề).', 'Chèn ảnh, chọn Wrap Text › In Line with Text (Cùng dòng với văn bản) để ảnh đi theo đoạn văn.', 'Chuột phải ảnh/bảng › Insert Caption (Chèn chú thích) › chọn nhãn Hình hoặc Bảng.', 'Chuột phải ảnh › View/Edit Alt Text (Chữ thay thế), mô tả thông tin ảnh truyền tải.'],
    example: {title: 'Chú thích và chữ thay thế', body: 'Hình 1. Lượng rác thu gom theo tuần (kg), tháng 10/2026\nAlt text: “Biểu đồ cột: rác thu gom tăng từ 12 kg tuần 1 lên 30 kg tuần 4.”\n\nBảng 1. Kết quả khảo sát 120 học sinh — hàng tiêu đề lặp lại khi bảng sang trang.'},
    exercise: {type: 'choice', prompt: 'Thêm một đoạn văn phía trên, ảnh của em bị nhảy lung tung sang trang khác. Nên chọn kiểu Wrap Text nào?', options: ['In Front of Text', 'Behind Text', 'In Line with Text'], answer: 2, explain: 'In Line with Text coi ảnh như một ký tự trong đoạn, nên ảnh đi theo văn bản.'},
    quiz: [
      {q: 'Chú thích “Hình 1, Hình 2…” tự đánh số nhờ?', options: ['Insert Caption', 'Gõ tay số', 'Đặt tên tệp ảnh'], answer: 0, why: 'Insert Caption tự đánh số và tạo được danh mục hình.'},
      {q: 'Alt text tốt cho biểu đồ là?', options: ['“Ảnh minh họa”', 'Mô tả xu hướng/số liệu chính của biểu đồ', 'Để trống'], answer: 1, why: 'Người dùng trình đọc màn hình cần biết thông tin, không chỉ biết có ảnh.'},
      {q: 'Bảng dài sang trang mà vẫn thấy tiêu đề cột nhờ?', options: ['Repeat Header Rows', 'Merge Cells', 'Autofit'], answer: 0, why: 'Repeat Header Rows lặp hàng tiêu đề ở đầu mỗi trang.'}]},
  5: {minutes: '25–35 phút',
    steps: ['Review › Track Changes (Xem lại › Theo dõi thay đổi) hoặc Ctrl+Shift+E để bật.', 'Sửa văn bản: chữ thêm có gạch chân màu, chữ xóa bị gạch ngang.', 'Bôi đen đoạn cần góp ý › New Comment (Chú thích mới), ghi rõ lý do; gõ @tên để nhắc bạn cùng nhóm.', 'Người chủ bài dùng Accept/Reject (Chấp nhận/Từ chối) cho từng thay đổi.', 'Trước khi gửi bản cuối: Accept All hoặc Reject All cho phần còn lại và xóa hết nhận xét đã xử lý.'],
    example: {title: 'Một góp ý tốt', body: 'Thay đổi: “rất nhiều học sinh” → “68% học sinh (82/120)”\nNhận xét: “@Lan: thay ‘rất nhiều’ bằng số liệu khảo sát trang 3 để thuyết phục hơn.”'},
    exercise: {type: 'choice', prompt: 'Em tắt Track Changes rồi gửi bản cuối, nhưng thầy vẫn thấy chữ gạch ngang màu đỏ. Vì sao?', options: ['Tắt Track Changes không xử lý các thay đổi đang chờ; phải Accept/Reject hết', 'Máy thầy bị lỗi phông', 'Do chưa lưu tệp'], answer: 0, explain: 'Tắt chỉ ngừng ghi thay đổi mới; thay đổi cũ vẫn chờ duyệt.'},
    quiz: [
      {q: 'Phím tắt bật/tắt Track Changes?', options: ['Ctrl+Shift+E', 'Ctrl+E', 'Ctrl+T'], answer: 0, why: 'Ctrl+Shift+E bật hoặc tắt theo dõi thay đổi.'},
      {q: 'Khi muốn góp ý mà không sửa trực tiếp, dùng?', options: ['Comment (Chú thích)', 'Xóa đoạn đó', 'Đổi màu chữ'], answer: 0, why: 'Comment để hỏi và góp ý, người chủ bài tự quyết.'},
      {q: 'Trước khi gửi bản cuối cần?', options: ['Giữ nguyên mọi thay đổi chờ duyệt', 'Accept/Reject hết và xóa nhận xét đã xử lý', 'Chỉ đổi tên tệp'], answer: 1, why: 'Bản cuối không nên còn dấu sửa và nhận xét nội bộ.'}]},
  6: {minutes: '35–45 phút',
    steps: ['Chuẩn bị Excel: hàng 1 là tiêu đề cột (HoTen, Lop, PhuHuynh), mỗi dòng một người, không dòng trống.', 'Trong Word: Mailings › Start Mail Merge › Letters (Gửi thư › Bắt đầu phối thư › Thư).', 'Select Recipients › Use an Existing List (Dùng danh sách có sẵn), chọn tệp Excel và trang tính.', 'Đặt con trỏ chỗ cần tên, Insert Merge Field (Chèn trường phối) › HoTen; làm tương tự với Lop.', 'Preview Results (Xem trước kết quả), bấm mũi tên xem từng bản, tìm dòng lỗi.', 'Finish & Merge › Edit Individual Documents (Hoàn tất › Sửa từng tài liệu) để tạo các thư.'],
    example: {title: 'Mẫu giấy mời có trường trộn', body: 'Kính gửi phụ huynh em «HoTen», lớp «Lop»,\nLiên đội trân trọng kính mời Quý phụ huynh dự buổi họp lúc 8 giờ, thứ Bảy 21/11/2026.\n\n(Excel: HoTen | Lop  →  “Nguyễn Văn An | 10A1”)'},
    exercise: {type: 'order', prompt: 'Sắp xếp quy trình Mail Merge.', items: ['Start Mail Merge › Letters', 'Select Recipients › Use an Existing List', 'Insert Merge Field', 'Preview Results', 'Finish & Merge'], explain: 'Phải có danh sách trước khi chèn trường; xem trước rồi mới hoàn tất.'},
    quiz: [
      {q: 'Hàng đầu tiên của bảng Excel dùng cho Mail Merge nên là?', options: ['Tiêu đề cột', 'Dòng trống', 'Tên trường học'], answer: 0, why: 'Word lấy tên trường từ hàng tiêu đề.'},
      {q: 'Vì sao phải Preview Results trước khi in?', options: ['Để phát hiện ô trống, sai chính tả trong dữ liệu', 'Để đổi phông chữ', 'Không cần thiết'], answer: 0, why: 'Lỗi dữ liệu sẽ lặp lại trong mọi thư tương ứng.'},
      {q: 'Dữ liệu dùng để luyện tập nên là?', options: ['Danh sách phụ huynh thật', 'Dữ liệu giả lập', 'Danh sách tải từ mạng'], answer: 1, why: 'Không dùng dữ liệu cá nhân thật để luyện tập.'}]},
  7: {minutes: '2–3 buổi',
    steps: ['Lập dàn ý: bìa, mục lục, 3–4 phần nội dung, kết luận.', 'Gán Styles cho mọi tiêu đề, chèn Section Break sau bìa và đánh số trang từ 1.', 'Chèn bảng số liệu (có hàng tiêu đề lặp lại) và 2 hình có chú thích, alt text.', 'Chạy Review › Check Accessibility (Kiểm tra trợ năng) và sửa cảnh báo.', 'Đối chiếu mọi số liệu với sổ ghi chép của CLB, rồi File › Save As › PDF.'],
    example: {title: 'Danh sách kiểm tra trước khi nộp', body: '☐ Mục lục đã Update  ☐ Bìa không số trang\n☐ Bảng có tiêu đề lặp lại  ☐ Hình có chú thích + alt text\n☐ Check Accessibility không còn lỗi  ☐ Số liệu khớp sổ CLB\n☐ Xuất PDF và mở lại kiểm tra'},
    exercise: {type: 'choice', prompt: 'Báo cáo đã đẹp, mục lục đúng. Việc nào bắt buộc trước khi gửi Ban giám hiệu?', options: ['Đổi sang phông chữ trang trí', 'Đối chiếu số liệu với sổ ghi chép và xuất PDF', 'Thêm hiệu ứng chữ nghệ thuật'], answer: 1, explain: 'Hình thức đẹp không thay được số liệu đúng; PDF giữ đúng bố cục.'},
    quiz: [
      {q: 'Xuất PDF để làm gì?', options: ['Người nhận xem đúng bố cục, khó sửa nhầm', 'Tệp nặng hơn', 'Để in màu'], answer: 0, why: 'PDF giữ nguyên phông và bố cục trên mọi máy.'},
      {q: 'Check Accessibility giúp phát hiện?', options: ['Ảnh thiếu alt text, bảng thiếu tiêu đề', 'Lỗi chính tả', 'Virus'], answer: 0, why: 'Công cụ kiểm tra trợ năng tìm các rào cản cho người đọc.'},
      {q: 'Phần nào quyết định báo cáo có giá trị?', options: ['Màu sắc', 'Số liệu đúng và kiểm chứng được', 'Số trang nhiều'], answer: 1, why: 'Báo cáo dùng để ra quyết định nên phải đúng.'}]},
  8: {minutes: '25–35 phút',
    steps: ['Mỗi cột một loại dữ liệu: Ngày, Nội dung, Thu, Chi; không gộp ô trong vùng dữ liệu.', 'Đổi chữ số viết bằng chữ (“năm chục”) thành số (50000).', 'Chọn một ô trong vùng › Ctrl+T › tick My table has headers (Bảng có tiêu đề).', 'Table Design › Table Name (Thiết kế bảng › Tên bảng): đặt tblQuyLop.', 'Bôi cột tiền › định dạng Number/Currency; tiêu đề trên cùng dùng Center Across Selection thay cho Merge.'],
    example: {title: 'Sổ quỹ chuẩn hóa', body: 'Ngày       | Nội dung        | Thu    | Chi\n02/11/2026 | Thu quỹ tháng 11 | 400000 |\n05/11/2026 | Mua bóng đá      |        | 150000\n→ Tổng thu: =SUM(tblQuyLop[Thu])'},
    exercise: {type: 'formula', prompt: 'Bảng tên tblQuyLop có cột Thu. Viết công thức tính tổng cột Thu.', answers: ['=SUM(tblQuyLop[Thu])'], hint: 'Dùng SUM với tên bảng và tên cột trong ngoặc vuông.', explain: 'Tham chiếu theo tên bảng tự mở rộng khi thêm dòng mới.'},
    quiz: [
      {q: 'Phím tắt tạo bảng (Format as Table)?', options: ['Ctrl+T', 'Ctrl+B', 'Ctrl+M'], answer: 0, why: 'Ctrl+T tạo bảng có bộ lọc và tự mở rộng.'},
      {q: 'Vì sao không nên gộp ô (Merge) trong vùng dữ liệu?', options: ['Làm hỏng sắp xếp, lọc, PivotTable', 'Tốn mực in', 'Excel không cho phép'], answer: 0, why: 'Ô gộp làm dữ liệu không còn dạng hàng–cột chuẩn.'},
      {q: 'Ô ghi “năm chục” trong cột Thu sẽ?', options: ['Được cộng bình thường', 'Bị bỏ qua khi tính tổng vì là chữ', 'Tự đổi thành 50'], answer: 1, why: 'SUM bỏ qua giá trị dạng chữ, tổng sẽ sai.'}]},
  9: {minutes: '25–35 phút',
    steps: ['Gõ đơn giá vào B1 (ví dụ 85000).', 'Ở C3 gõ =B3*$B$1 (B3 là số lượng); bấm F4 khi con trỏ ở B1 để thêm dấu $.', 'Kéo chốt điền (ô vuông nhỏ góc dưới phải) xuống các dòng.', 'Bấm vào vài ô bên dưới để thấy B3 đổi thành B4, B5… còn $B$1 giữ nguyên.', 'Đổi giá ở B1 và quan sát mọi thành tiền tự cập nhật.'],
    example: {title: 'Tương đối và tuyệt đối', body: 'C3: =B3*$B$1\nC4: =B4*$B$1   ← B3 đổi thành B4, $B$1 giữ nguyên\nSai: C3 =B3*B1 → kéo xuống thành =B4*B2 (B2 trống) → kết quả 0'},
    exercise: {type: 'formula', prompt: 'Số lượng ở B3, đơn giá cố định ở ô B1. Viết công thức thành tiền ở C3 để kéo xuống vẫn đúng.', answers: ['=B3*$B$1', '=$B$1*B3'], hint: 'Ô đơn giá cần khóa cả cột lẫn hàng bằng dấu $.', explain: '$B$1 là tham chiếu tuyệt đối nên không đổi khi kéo công thức.'},
    quiz: [
      {q: 'Phím nào chuyển nhanh B1 thành $B$1?', options: ['F4', 'F2', 'F9'], answer: 0, why: 'F4 xoay vòng các kiểu tham chiếu.'},
      {q: 'Kéo =B3*B1 xuống một dòng sẽ thành?', options: ['=B4*B1', '=B4*B2', '=B3*B1'], answer: 1, why: 'Tham chiếu tương đối dịch theo hướng kéo.'},
      {q: 'Vì sao không gõ thẳng =B3*85000?', options: ['Giá đổi thì phải sửa từng ô', 'Excel không nhận số lớn', 'Chạy chậm hơn'], answer: 0, why: 'Để giá ở một ô giúp đổi một lần cập nhật tất cả.'}]},
  10: {minutes: '30–40 phút',
    steps: ['Điểm ở cột C (C2:C31), tổ ở cột B, tiền quỹ ở cột D.', 'Xếp loại: ở E2 gõ =IF(C2>=8,"Đạt","Chưa đạt") rồi kéo xuống.', 'Đếm số bạn từ 8 điểm: =COUNTIF(C2:C31,">=8").', 'Tổng quỹ của Tổ 1: =SUMIF(B2:B31,"Tổ 1",D2:D31).', 'Kiểm tra: lọc cột C ≥ 8 và đếm tay, so với kết quả COUNTIF.'],
    example: {title: 'Ba công thức mẫu', body: '=IF(C2>=8,"Đạt","Chưa đạt")\n=COUNTIF(C2:C31,">=8")\n=SUMIF(B2:B31,"Tổ 1",D2:D31)\n\nLưu ý: máy cài định dạng Việt Nam dùng dấu ; thay cho dấu ,\n=IF(C2>=8;"Đạt";"Chưa đạt")'},
    exercise: {type: 'formula', prompt: 'Điểm nằm ở C2:C31. Viết công thức đếm số bạn có điểm từ 8 trở lên.', answers: ['=COUNTIF(C2:C31,">=8")', '=COUNTIF($C$2:$C$31,">=8")'], hint: 'COUNTIF(vùng, điều kiện); điều kiện so sánh đặt trong dấu ngoặc kép.', explain: 'COUNTIF đếm các ô thỏa điều kiện ">=8".'},
    quiz: [
      {q: 'Công thức nào ghi “Đạt” khi C2 từ 8 trở lên?', options: ['=IF(C2>=8,"Đạt","Chưa đạt")', '=IF(C2>8,"Đạt")', '=COUNTIF(C2,"Đạt")'], answer: 0, why: '>=8 gồm cả điểm 8; có đủ giá trị khi đúng và khi sai.'},
      {q: 'Tính tổng quỹ chỉ của Tổ 1 dùng hàm?', options: ['SUM', 'SUMIF', 'COUNT'], answer: 1, why: 'SUMIF cộng có điều kiện.'},
      {q: 'Excel báo lỗi khi gõ dấu phẩy giữa các đối số. Có thể do?', options: ['Máy dùng định dạng Việt Nam, cần dấu chấm phẩy', 'Hàm IF không còn dùng được', 'Thiếu Internet'], answer: 0, why: 'Định dạng vùng Việt Nam dùng ; làm dấu phân cách.'}]},
  11: {minutes: '30–40 phút',
    steps: ['Tạo bảng danh mục DanhMuc với cột Mã, Tên, Tác giả.', 'Ở phiếu mượn, ô B2 gõ =XLOOKUP(A2,DanhMuc[Mã],DanhMuc[Tên],"Chưa có trong danh mục").', 'Kéo xuống các dòng; làm tương tự cho cột Tác giả.', 'Nếu kết quả “Chưa có” dù mã đúng: kiểm tra dấu cách thừa (dùng TRIM) và kiểu số/chữ.', 'Excel cũ không có XLOOKUP thì dùng VLOOKUP(A2,DanhMuc,2,FALSE).'],
    example: {title: 'Tra tên sách theo mã', body: 'Phiếu mượn: A2 = “S015”\n=XLOOKUP(A2,DanhMuc[Mã],DanhMuc[Tên],"Chưa có trong danh mục")\n→ “Dế Mèn phiêu lưu ký”\nMã “S015 ” (thừa dấu cách) → “Chưa có trong danh mục” → sửa bằng TRIM.'},
    exercise: {type: 'formula', prompt: 'Mã sách ở A2. Bảng DanhMuc có cột [Mã] và [Tên]. Viết công thức XLOOKUP lấy tên sách, nếu không thấy ghi "Chưa có".', answers: ['=XLOOKUP(A2,DanhMuc[Mã],DanhMuc[Tên],"Chưa có")'], hint: 'XLOOKUP(giá trị tìm, cột tìm, cột trả về, giá trị khi không thấy).', explain: 'Tham số thứ 4 thay lỗi #N/A bằng thông báo dễ hiểu.'},
    quiz: [
      {q: 'XLOOKUP hơn VLOOKUP ở điểm nào?', options: ['Tìm được cả cột bên trái, có tham số khi không thấy', 'Chạy được trên giấy', 'Không cần dữ liệu'], answer: 0, why: 'XLOOKUP linh hoạt hướng tìm và xử lý không tìm thấy.'},
      {q: 'Mã đúng mà vẫn “không tìm thấy”, nghi ngờ đầu tiên?', options: ['Dấu cách thừa hoặc khác kiểu số/chữ', 'Hết pin máy', 'Sai phông chữ'], answer: 0, why: '“S015 ” và “S015” là hai giá trị khác nhau.'},
      {q: 'Tham số thứ 4 của XLOOKUP dùng để?', options: ['Ghi thông báo khi không tìm thấy', 'Đổi màu ô', 'Sắp xếp'], answer: 0, why: 'Thay #N/A bằng thông báo dễ hiểu.'}]},
  12: {minutes: '30–40 phút',
    steps: ['Chọn cột Lớp › Data › Data Validation (Dữ liệu › Xác thực dữ liệu).', 'Allow: List, Source: 10A1,10A2,10A3 (hoặc trỏ tới vùng danh sách lớp).', 'Cột điểm: Allow: Decimal, between 0 and 10; thêm Error Alert (Cảnh báo lỗi).', 'Làm sạch dữ liệu cũ: cột phụ =TRIM(B2), rồi Data › Remove Duplicates (Loại bỏ trùng lặp).', 'Khi đã lọc, dùng =SUBTOTAL(109,D2:D200) để chỉ cộng các dòng đang hiện.'],
    example: {title: 'Danh sách thả xuống', body: 'Cột Lớp: Data Validation › List › “10A1,10A2,10A3”\nNgười nhập chọn từ danh sách → không còn “10a1”, “lớp 10A1”.\nTổng dòng đang lọc: =SUBTOTAL(109,D2:D200)'},
    exercise: {type: 'formula', prompt: 'Cột D (D2:D200) đang bị lọc. Viết công thức chỉ cộng các dòng đang hiện.', answers: ['=SUBTOTAL(109,D2:D200)', '=SUBTOTAL(9,D2:D200)'], hint: 'SUBTOTAL với mã 109 (hoặc 9) để cộng.', explain: 'SUM vẫn cộng cả dòng bị ẩn; SUBTOTAL bỏ qua dòng bị lọc.'},
    quiz: [
      {q: 'Muốn người nhập chỉ chọn lớp từ danh sách, dùng?', options: ['Data Validation › List', 'Merge Cells', 'Conditional Formatting'], answer: 0, why: 'Danh sách thả xuống chặn cách gõ khác nhau.'},
      {q: 'Filter làm gì với dòng không khớp?', options: ['Xóa vĩnh viễn', 'Ẩn tạm thời', 'Chuyển sang trang khác'], answer: 1, why: 'Lọc chỉ ẩn; bỏ lọc dòng hiện lại.'},
      {q: 'Hàm loại dấu cách thừa đầu/cuối chuỗi?', options: ['TRIM', 'LEN', 'UPPER'], answer: 0, why: 'TRIM xóa khoảng trắng thừa.'}]},
  13: {minutes: '30–40 phút',
    steps: ['Đảm bảo dữ liệu là bảng (Ctrl+T) có cột Ngày, Tuần, Món, Khối, Tiền.', 'Insert › PivotTable (Chèn › PivotTable) › New Worksheet.', 'Kéo Món vào Rows, Tuần vào Columns, Tiền vào Values (Sum).', 'Chuột phải một số › Sort › Largest to Smallest để thấy món bán chạy.', 'PivotTable Analyze › Insert Slicer › Khối để lọc nhanh.', 'Thêm dữ liệu mới vào bảng nguồn rồi bấm Refresh (Alt+F5).'],
    example: {title: 'Bố trí PivotTable', body: 'Rows: Món | Columns: Tuần | Values: Sum of Tiền | Slicer: Khối\n\nMón        Tuần 1   Tuần 2   Tổng\nBánh mì    820k     910k     1.730k\nSữa chua   400k     380k     780k'},
    exercise: {type: 'choice', prompt: 'Em vừa thêm 200 dòng bán hàng tuần 5 vào bảng nguồn nhưng PivotTable chưa có tuần 5. Làm gì?', options: ['Tạo PivotTable mới', 'Bấm Refresh (Alt+F5)', 'Gõ tay số liệu tuần 5'], answer: 1, explain: 'PivotTable không tự cập nhật; Refresh đọc lại nguồn (nguồn là bảng nên tự mở rộng).'},
    quiz: [
      {q: 'Muốn mỗi món là một hàng, kéo trường Món vào?', options: ['Rows', 'Values', 'Filters'], answer: 0, why: 'Rows tạo nhãn hàng.'},
      {q: 'Slicer dùng để?', options: ['Lọc PivotTable bằng nút bấm', 'Tính trung bình', 'In ấn'], answer: 0, why: 'Slicer là bộ lọc trực quan.'},
      {q: 'Cách kiểm tra một ô PivotTable đúng?', options: ['Đối chiếu bằng SUMIFS trên dữ liệu gốc', 'Tin vì Excel tính', 'Xem màu ô'], answer: 0, why: 'Một phép tính độc lập giúp phát hiện sai nguồn hoặc thiếu Refresh.'}]},
  14: {minutes: '40–60 phút',
    steps: ['Xác định câu hỏi chính: so sánh lớp? xu hướng theo tuần?', 'Chọn dữ liệu › Insert › Recommended Charts (Biểu đồ được đề xuất).', 'So sánh lớp: biểu đồ cột; xu hướng theo thời gian: biểu đồ đường.', 'Đặt tiêu đề là câu kết luận, ví dụ “10A2 thu gom nhiều nhất: 86 kg”.', 'Kiểm tra trục tung bắt đầu từ 0, bỏ hiệu ứng 3D, ghi nguồn dữ liệu.', 'Gom 2 biểu đồ và 3 ô chỉ số (tổng, trung bình, lớp dẫn đầu) lên một trang tính “Dashboard”.'],
    example: {title: 'Tiêu đề biểu đồ tốt và kém', body: 'Kém: “Biểu đồ 1”\nTốt: “Lượng giấy thu gom tăng đều, tuần 4 gấp đôi tuần 1”\nÔ chỉ số: Tổng =SUM(...) | Trung bình =AVERAGE(...) | Dẫn đầu =XLOOKUP(MAX(...),...)'},
    exercise: {type: 'choice', prompt: 'Muốn thể hiện lượng giấy thu gom thay đổi qua 12 tuần, chọn biểu đồ nào?', options: ['Biểu đồ tròn', 'Biểu đồ đường', 'Biểu đồ 3D xoay'], answer: 1, explain: 'Biểu đồ đường thể hiện xu hướng theo thời gian.'},
    quiz: [
      {q: 'So sánh 12 lớp nên dùng?', options: ['Biểu đồ cột', 'Biểu đồ tròn 12 phần', 'Bảng màu'], answer: 0, why: 'Cột giúp so sánh độ lớn giữa các nhóm.'},
      {q: 'Trục tung không bắt đầu từ 0 có thể?', options: ['Phóng đại chênh lệch nhỏ', 'Làm biểu đồ chính xác hơn', 'Không ảnh hưởng'], answer: 0, why: 'Cắt trục làm khác biệt trông lớn hơn thực tế.'},
      {q: 'Tiêu đề biểu đồ nên là?', options: ['Câu kết luận người xem cần nhớ', '“Biểu đồ 1”', 'Tên tệp'], answer: 0, why: 'Tiêu đề kết luận giúp người xem hiểu ngay.'}]},
  15: {minutes: '30–40 phút',
    steps: ['View › Slide Master (Dạng xem › Trang chiếu cái).', 'Chọn slide cái trên cùng: đặt phông tiêu đề/nội dung, màu, logo.', 'Chỉnh 2 bố cục hay dùng (Tiêu đề + nội dung, Tiêu đề + hình).', 'Close Master View; chọn các slide › Home › Reset (Đặt lại) để áp kiểu mới.', 'Viết lại tiêu đề mỗi slide thành câu kết luận; giữ tối đa khoảng 6 dòng chữ.'],
    example: {title: 'Tiêu đề chủ đề và tiêu đề kết luận', body: 'Chủ đề: “Kết quả khảo sát”\nKết luận: “68% học sinh muốn có thùng rác phân loại ở căng tin”'},
    exercise: {type: 'order', prompt: 'Sắp xếp các bước thống nhất giao diện cho bài trình bày ghép từ 4 người.', items: ['Mở View › Slide Master', 'Đặt phông, màu, logo ở slide cái', 'Close Master View', 'Chọn mọi slide › Home › Reset'], explain: 'Reset áp lại bố cục và định dạng từ Slide Master.'},
    quiz: [
      {q: 'Muốn đổi phông mọi slide một lần, sửa ở?', options: ['Slide Master', 'Từng slide', 'Ghi chú'], answer: 0, why: 'Slide Master quy định kiểu chung.'},
      {q: 'Tiêu đề slide nên là?', options: ['Câu kết luận', 'Một từ chung chung', 'Để trống'], answer: 0, why: 'Người nghe nắm ngay ý chính.'},
      {q: 'Slide đã chỉnh tay không nhận kiểu Master mới. Bấm?', options: ['Home › Reset', 'Ctrl+Z', 'Xóa slide'], answer: 0, why: 'Reset bỏ định dạng tay, áp lại bố cục Master.'}]},
  16: {minutes: '30–40 phút',
    steps: ['Viết 1 câu kết luận chính từ bảng số liệu.', 'Chọn 1 biểu đồ thể hiện đúng câu đó, bỏ bớt lưới, chú giải thừa.', 'Tô màu nhấn duy nhất cho cột/điểm quan trọng, các phần khác màu xám.', 'Ghi nguồn và thời điểm dữ liệu ở chân slide.', 'Slide tiếp theo: đề xuất cụ thể (làm gì, chi phí, khi nào, đo kết quả bằng gì).'],
    example: {title: 'Hai slide thuyết phục', body: 'Slide 1 — “Căng tin thải 40 kg rác nhựa mỗi tuần, nhiều nhất là ly nhựa (55%)”\n   [biểu đồ cột, cột ly nhựa màu đỏ, còn lại xám]  Nguồn: khảo sát Đoàn trường 10/2026\nSlide 2 — “Đề xuất: 6 thùng phân loại, 1,8 triệu đồng, đo lại sau 4 tuần”'},
    exercise: {type: 'choice', prompt: 'Slide có bảng 5 cột × 12 dòng số liệu. Cách trình bày tốt nhất?', options: ['Giữ nguyên bảng cho đầy đủ', 'Một biểu đồ nhấn vào con số chính, bảng chi tiết để phụ lục', 'Đọc to từng con số'], answer: 1, explain: 'Người nghe chỉ nhớ được một vài con số; chi tiết để phụ lục.'},
    quiz: [
      {q: 'Màu nhấn trên biểu đồ nên dùng?', options: ['Cho một điểm quan trọng nhất', 'Mỗi cột một màu', 'Không dùng màu'], answer: 0, why: 'Một điểm nhấn dẫn mắt người xem.'},
      {q: 'Nguồn dữ liệu nên ghi ở đâu?', options: ['Chân slide', 'Không cần ghi', 'Trong ghi chú riêng'], answer: 0, why: 'Người xem cần biết số liệu từ đâu, khi nào.'},
      {q: 'Slide đề xuất cần có?', options: ['Việc làm, chi phí, thời gian, cách đo kết quả', 'Chỉ khẩu hiệu', 'Ảnh đẹp'], answer: 0, why: 'Đề xuất cụ thể mới được duyệt.'}]},
  17: {minutes: '30–45 phút',
    steps: ['Viết ghi chú người nói (Notes) dưới mỗi slide: 2–4 ý chính, không viết nguyên văn.', 'Slide Show › Rehearse with Coach (Trình chiếu › Diễn tập với huấn luyện viên).', 'Nói như thật; xem báo cáo cuối: tốc độ, từ đệm, đọc nguyên văn slide.', 'Sửa 1–2 điểm yếu nhất rồi diễn tập lần 2, so sánh báo cáo.', 'Khi trình bày thật dùng Presenter View (Alt+F5) để xem ghi chú và slide kế tiếp.'],
    example: {title: 'Ghi chú tốt', body: 'Slide 3 — ghi chú:\n• 40 kg/tuần, ly nhựa 55%\n• Hỏi khán giả: “Hôm nay bạn dùng mấy ly nhựa?”\n• Chuyển: “Vậy giải pháp là gì?”'},
    exercise: {type: 'choice', prompt: 'Speaker Coach báo em nói 190 từ/phút và hay nói “ờ”. Ưu tiên sửa gì trước?', options: ['Thêm hiệu ứng chuyển cảnh', 'Chậm lại, ngắt nghỉ ở cuối mỗi ý thay cho “ờ”', 'Viết thêm chữ lên slide'], answer: 1, explain: 'Tốc độ vừa phải và ngắt nghỉ giúp người nghe theo kịp và giảm từ đệm.'},
    quiz: [
      {q: 'Presenter View cho người trình bày thấy?', options: ['Ghi chú và slide kế tiếp', 'Bình luận của khán giả', 'Mạng xã hội'], answer: 0, why: 'Khán giả chỉ thấy slide hiện tại.'},
      {q: 'Ghi chú người nói nên viết?', options: ['Ý chính ngắn', 'Nguyên văn cả bài', 'Không cần'], answer: 0, why: 'Đọc nguyên văn làm bài nói đơn điệu.'},
      {q: 'Hiệu ứng bay chữ ở mọi dòng thường?', options: ['Làm chậm và gây xao nhãng', 'Luôn hấp dẫn hơn', 'Bắt buộc phải có'], answer: 0, why: 'Hiệu ứng nên dùng ít và có mục đích.'}]},
  18: {minutes: '20–30 phút',
    steps: ['Tiêu đề nêu rõ việc: “Xin mượn phòng TN Hóa chiều thứ Sáu 21/11 – CLB Khoa học”.', 'Lời chào đúng người nhận (“Kính gửi thầy Minh,”).', 'Đoạn 1 nói yêu cầu chính; đoạn 2 chi tiết (giờ, số người, mục đích); đoạn 3 cam kết và lời cảm ơn.', 'Kiểm tra người nhận: To cho người xử lý, CC cho người cần biết.', 'Hẹn giờ gửi: Send › Schedule Send (Outlook mới) hoặc Options › Delay Delivery (Outlook cổ điển).'],
    example: {title: 'Email xin mượn phòng', body: 'Tiêu đề: Xin mượn phòng TN Hóa 14h–16h thứ Sáu 21/11 – CLB Khoa học\n\nKính gửi thầy Minh,\nEm là Lan, lớp 11A2, chủ nhiệm CLB Khoa học. Em xin phép mượn phòng thí nghiệm Hóa từ 14h đến 16h thứ Sáu 21/11 cho 15 thành viên làm thí nghiệm pha dung dịch muối.\nCLB cam kết có cô Hạnh giám sát, giữ vệ sinh và trả phòng đúng giờ.\nEm cảm ơn thầy ạ.\nLan – 11A2'},
    exercise: {type: 'choice', prompt: 'Tiêu đề email nào tốt nhất?', options: ['“Thầy ơi”', '“Xin mượn phòng TN Hóa 14h–16h thứ Sáu 21/11 – CLB Khoa học”', '“Gấp!!!”'], answer: 1, explain: 'Tiêu đề nêu việc, thời gian, người gửi giúp người nhận xử lý nhanh.'},
    quiz: [
      {q: 'Gửi cho 40 phụ huynh không quen nhau, đặt địa chỉ ở?', options: ['BCC', 'To', 'CC'], answer: 0, why: 'BCC không để lộ địa chỉ của người khác.'},
      {q: 'Yêu cầu chính nên ở đâu?', options: ['Đoạn đầu', 'Cuối thư', 'Tệp đính kèm'], answer: 0, why: 'Người nhận nắm ngay việc cần làm.'},
      {q: 'Reply All khi chỉ cần trả lời một người sẽ?', options: ['Làm phiền cả nhóm và có thể lộ thông tin', 'Gửi nhanh hơn', 'Không ảnh hưởng'], answer: 0, why: 'Chọn đúng người nhận là phép lịch sự và an toàn.'}]},
  19: {minutes: '20–30 phút',
    steps: ['Calendar › New Meeting (Lịch › Cuộc họp mới).', 'Thêm người được mời; mở Scheduling Assistant (Trợ lý lập lịch) để chọn giờ mọi người rảnh.', 'Đặt tiêu đề, địa điểm hoặc bật Teams meeting.', 'Viết chương trình 3 mục và thời lượng từng mục trong nội dung.', 'Đính kèm tài liệu bằng liên kết OneDrive (Share link) thay cho tệp đính kèm, rồi Send.'],
    example: {title: 'Lời mời họp', body: 'Tiêu đề: Họp ban cán sự – chuẩn bị Hội trại (30 phút)\nThời gian: 16h30–17h00 thứ Ba 18/11 | Phòng 204\nChương trình: 1) Phân công (10′) 2) Ngân sách (10′) 3) Việc tuần tới (10′)\nTài liệu: liên kết OneDrive “KeHoach_HoiTrai.docx”'},
    exercise: {type: 'order', prompt: 'Sắp xếp các bước tạo lời mời họp.', items: ['New Meeting', 'Thêm người được mời', 'Chọn giờ bằng Scheduling Assistant', 'Viết chương trình họp và gắn liên kết tài liệu', 'Send'], explain: 'Có người được mời thì Scheduling Assistant mới hiện giờ rảnh.'},
    quiz: [
      {q: 'Vì sao nên gắn liên kết OneDrive thay vì đính kèm tệp?', options: ['Mọi người cùng sửa một bản', 'Tệp nhẹ hơn khi in', 'Không có lý do'], answer: 0, why: 'Đính kèm tạo nhiều bản sao khác nhau.'},
      {q: 'Scheduling Assistant giúp?', options: ['Thấy giờ rảnh của người trong tổ chức', 'Viết chương trình họp', 'Ghi âm cuộc họp'], answer: 0, why: 'Nó hiển thị lịch bận/rảnh.'},
      {q: 'Lời mời họp tốt cần có?', options: ['Chương trình và thời lượng', 'Chỉ giờ họp', 'Ảnh đại diện'], answer: 0, why: 'Người dự biết chuẩn bị gì.'}]},
  20: {minutes: '20–30 phút',
    steps: ['Mở tệp trên OneDrive › Share (Chia sẻ).', 'Chọn người cụ thể (Specific people) thay vì “Anyone with the link”.', 'Đặt quyền Can view (Chỉ xem) hoặc Can edit (Có thể sửa) cho từng người.', 'Trong cài đặt liên kết, đặt ngày hết hạn nếu tài khoản hỗ trợ.', 'Mở Manage Access (Quản lý quyền truy cập) để xem ai có quyền và thu hồi khi không cần.'],
    example: {title: 'Phân quyền bảng điểm lớp', body: 'Cô chủ nhiệm: Can edit\nLớp trưởng:   Can view, hết hạn 30/11\nCả lớp:       không chia sẻ (bảng có điểm cá nhân)'},
    exercise: {type: 'choice', prompt: 'Bạn em đã chia sẻ bảng điểm bằng liên kết “ai cũng sửa được” lên nhóm chat. Việc đầu tiên?', options: ['Xóa tin nhắn trong nhóm', 'Vào Manage Access tắt liên kết đó', 'Đổi tên tệp'], answer: 1, explain: 'Xóa tin nhắn không thu hồi quyền; phải tắt liên kết trong phần quản lý quyền.'},
    quiz: [
      {q: 'Chia sẻ tài liệu có dữ liệu cá nhân nên chọn?', options: ['Người cụ thể, quyền tối thiểu', 'Anyone with the link', 'Đăng lên mạng xã hội'], answer: 0, why: 'Quyền tối thiểu giảm rủi ro lộ dữ liệu.'},
      {q: 'Can view nghĩa là?', options: ['Chỉ xem, không sửa', 'Sửa được', 'Xóa được'], answer: 0, why: 'Người xem không thay đổi được nội dung.'},
      {q: 'Muốn biết ai đang có quyền vào tệp, mở?', options: ['Manage Access', 'Version History', 'Print'], answer: 0, why: 'Manage Access liệt kê và cho thu hồi quyền.'}]},
  21: {minutes: '2–3 buổi',
    steps: ['Viết 1 câu thông điệp chính của đề xuất xin kinh phí.', 'Làm 8–10 slide bằng Slide Master; tiêu đề là câu kết luận.', 'Tạo biểu đồ trong Excel, dán vào PowerPoint, ghi nguồn.', 'Viết ghi chú người nói và luyện với Speaker Coach dưới 7 phút.', 'Gửi email kèm liên kết tài liệu cho hội đồng và tạo lời mời buổi trình bày.'],
    example: {title: 'Khung 8 slide', body: '1 Vấn đề | 2 Số liệu | 3 Mục tiêu | 4 Giải pháp | 5 Kế hoạch & mốc thời gian\n6 Ngân sách 3 triệu (chi tiết) | 7 Cách đo kết quả | 8 Đề nghị hội đồng'},
    exercise: {type: 'choice', prompt: 'Hội đồng hỏi: “Làm sao biết dự án thành công?”. Slide nào trả lời câu này?', options: ['Slide giới thiệu thành viên', 'Slide “Cách đo kết quả” có chỉ số cụ thể', 'Slide cảm ơn'], answer: 1, explain: 'Đề xuất được duyệt khi có tiêu chí đo kết quả rõ ràng.'},
    quiz: [
      {q: 'Ngân sách trong đề xuất nên?', options: ['Ghi chi tiết từng khoản', 'Chỉ ghi tổng', 'Không cần'], answer: 0, why: 'Chi tiết giúp hội đồng tin tưởng.'},
      {q: 'Biểu đồ dán từ Excel cần?', options: ['Ghi nguồn số liệu', 'Hiệu ứng 3D', 'Nhiều màu'], answer: 0, why: 'Nguồn giúp kiểm chứng.'},
      {q: 'Thời lượng luyện tập mục tiêu?', options: ['Dưới thời gian cho phép', 'Càng dài càng tốt', 'Không cần luyện'], answer: 0, why: 'Vượt giờ thường bị cắt phần quan trọng nhất ở cuối.'}]},
  22: {minutes: '30–40 phút',
    steps: ['Mở Word, bấm nút Copilot (hoặc Word Agent trong khung chat bên phải) nếu gói có hỗ trợ.', 'Viết yêu cầu có: mục đích, người đọc, độ dài, giọng văn và tệp tham chiếu (ghi chép của em).', 'Đọc bản nháp, đánh dấu mọi chi tiết không có trong ghi chép gốc.', 'Yêu cầu sửa từng đoạn cụ thể (“rút đoạn 2 còn 3 câu, giữ số liệu”).', 'Tự sửa giọng văn lần cuối và ghi chú phần nào AI hỗ trợ. Không có Copilot: làm cùng các bước với AI khác được phép.'],
    example: {title: 'Yêu cầu tốt cho Copilot', body: '“Dựa trên tệp GhiChep_ThamQuan.docx, viết bài 600 chữ cho bản tin trường, người đọc là học sinh THCS–THPT, giọng vui tươi nhưng chính xác. Chỉ dùng thông tin trong tệp, chỗ nào thiếu thì ghi [CẦN BỔ SUNG].”'},
    exercise: {type: 'choice', prompt: 'Copilot viết “đoàn có 45 học sinh tham gia” nhưng ghi chép của em ghi 38. Em làm gì?', options: ['Giữ vì Copilot đọc tài liệu rồi', 'Sửa thành 38 và rà lại mọi con số khác', 'Xóa cả bài'], answer: 1, explain: 'AI có thể thêm chi tiết sai; mọi con số phải đối chiếu với nguồn.'},
    quiz: [
      {q: 'Câu nào giúp hạn chế Copilot bịa thông tin?', options: ['“Chỉ dùng thông tin trong tệp, thiếu thì ghi [CẦN BỔ SUNG]”', '“Viết thật hay”', '“Thêm chi tiết cho sinh động”'], answer: 0, why: 'Giới hạn nguồn và cách đánh dấu chỗ thiếu.'},
      {q: 'Sau khi Copilot soạn nháp, bước bắt buộc?', options: ['Đối chiếu từng sự kiện với ghi chép gốc', 'Gửi ngay', 'Đổi phông chữ'], answer: 0, why: 'Người viết chịu trách nhiệm nội dung.'},
      {q: 'Không có Copilot trong gói Microsoft 365 thì?', options: ['Vẫn học được bằng AI khác được phép theo cùng quy trình', 'Không học được bài này', 'Phải mua ngay'], answer: 0, why: 'Kỹ năng giao việc và kiểm chứng dùng được với mọi công cụ.'}]},
  23: {minutes: '35–45 phút',
    steps: ['Sao chép tệp gốc, làm việc trên bản sao.', 'Mở Copilot trong Excel, chọn chế độ Chat để hỏi: “Lớp nào tăng điểm nhiều nhất giữa hai kỳ?”.', 'Chuyển sang Plan để xem Copilot định làm gì; bỏ bước không cần.', 'Cho Edit thực hiện: tạo cột chênh lệch và biểu đồ.', 'Bấm vào ô Copilot tạo để đọc công thức; tự kiểm tra 3 dòng bằng công thức của em.'],
    example: {title: 'Kiểm tra cột Copilot tạo', body: 'Copilot tạo cột Chênh lệch: =[@Diem_Ky2]-[@Diem_Ky1]\nEm kiểm tra dòng 5: 7,5 − 6,0 = 1,5 ✓\nNếu ô chỉ chứa số (không có công thức) → yêu cầu tạo lại bằng công thức.'},
    exercise: {type: 'choice', prompt: 'Em chỉ muốn Copilot phân tích và trả lời, không được thay đổi tệp. Chọn chế độ nào?', options: ['Edit', 'Chat', 'Plan rồi Edit'], answer: 1, explain: 'Chat chỉ trả lời trong khung chat, không sửa sổ làm việc.'},
    quiz: [
      {q: 'Chế độ nào cho Copilot sửa trực tiếp sổ làm việc?', options: ['Edit', 'Chat', 'View'], answer: 0, why: 'Edit (trước gọi là Agent Mode) tạo và sửa nội dung trong tệp.'},
      {q: 'Trước khi cho Copilot sửa nên?', options: ['Làm trên bản sao', 'Xóa dữ liệu cũ', 'Tắt AutoSave'], answer: 0, why: 'Bản sao giúp quay lại khi có lỗi.'},
      {q: 'Ô do Copilot tạo chỉ có số, không có công thức. Vấn đề?', options: ['Không cập nhật khi dữ liệu đổi và khó kiểm tra', 'Không vấn đề gì', 'Tốt hơn công thức'], answer: 0, why: 'Công thức thật mới tự cập nhật và kiểm chứng được.'}]},
  24: {minutes: '35–45 phút',
    steps: ['Mở PowerPoint › Copilot (hoặc PowerPoint Agent), chọn tạo bài trình bày từ tệp và đính kèm báo cáo Word.', 'Yêu cầu số slide, đối tượng người nghe và mẫu (thương hiệu) muốn dùng.', 'Cắt còn 8 slide: gộp slide trùng ý, rút chữ, đổi tiêu đề thành câu kết luận.', 'Đối chiếu từng số liệu với báo cáo gốc; thay ảnh minh họa chung chung bằng ảnh thật của CLB (có xin phép).', 'Luyện nói với ghi chú; không trình bày nguyên bản nháp AI.'],
    example: {title: 'Yêu cầu tạo slide', body: '“Từ tệp BaoCao_DuAn.docx, tạo 10 slide cho hội đồng giáo viên, mỗi slide tối đa 5 dòng, tiêu đề là câu kết luận, có 1 slide ngân sách và 1 slide cách đo kết quả.”'},
    exercise: {type: 'choice', prompt: 'Copilot tạo 15 slide nhiều chữ với ảnh minh họa không liên quan. Bước tiếp theo đúng nhất?', options: ['Trình bày luôn cho kịp', 'Cắt còn 8 slide, rút chữ, kiểm số liệu, thay ảnh thật', 'Thêm hiệu ứng cho sinh động'], answer: 1, explain: 'Bản AI là nháp; người trình bày phải biên tập và kiểm chứng.'},
    quiz: [
      {q: 'Slide AI tạo thường gặp vấn đề nào?', options: ['Nhiều chữ, ảnh chung chung', 'Quá ít slide', 'Không có tiêu đề'], answer: 0, why: 'Cần biên tập lại cho gọn và đúng.'},
      {q: 'Ảnh có người thật trong CLB cần?', options: ['Xin phép người trong ảnh', 'Không cần gì', 'Làm mờ toàn bộ'], answer: 0, why: 'Tôn trọng quyền hình ảnh.'},
      {q: 'Số liệu trên slide AI tạo phải?', options: ['Đối chiếu với báo cáo gốc', 'Tin tưởng hoàn toàn', 'Làm tròn cho đẹp'], answer: 0, why: 'AI có thể rút gọn hoặc đổi số sai.'}]},
  25: {minutes: '25–35 phút',
    steps: ['Mở chuỗi thư dài › Summarize (Tóm tắt) bằng Copilot nếu có.', 'Lập bảng các quyết định cuối cùng: giờ đón, địa điểm, chi phí, người phụ trách.', 'Mở lại thư gốc chứa từng quyết định để kiểm tra, đặc biệt các thư sửa đổi gần nhất.', 'Dùng Copilot soạn thư xác nhận (hoặc tự viết), chọn giọng lịch sự.', 'Đọc kỹ và sửa trước khi gửi; Copilot không tự gửi thay em.'],
    example: {title: 'Bảng quyết định từ chuỗi 25 thư', body: 'Giờ đón: 6h30 (thư ngày 12/11 sửa từ 7h00)\nĐịa điểm tập trung: cổng phụ\nChi phí: 250.000đ/học sinh\nNgười phụ trách: cô Hạnh'},
    exercise: {type: 'choice', prompt: 'Bản tóm tắt ghi giờ đón 7h00, nhưng em nhớ có thư đổi giờ. Em làm gì?', options: ['Tin bản tóm tắt', 'Tìm thư sửa đổi gần nhất và lấy giờ trong đó', 'Hỏi ngẫu nhiên một bạn'], answer: 1, explain: 'Tóm tắt có thể bỏ sót thư sửa đổi; quyết định quan trọng phải đọc từ thư gốc.'},
    quiz: [
      {q: 'Tóm tắt chuỗi thư bằng AI có thể?', options: ['Bỏ sót thư sửa đổi cuối cùng', 'Luôn chính xác', 'Tự gửi thư'], answer: 0, why: 'Luôn kiểm tra quyết định quan trọng ở thư gốc.'},
      {q: 'Thư trả lời Copilot gợi ý cần?', options: ['Đọc và sửa trước khi gửi', 'Gửi ngay', 'Chuyển tiếp cho mọi người'], answer: 0, why: 'Người gửi chịu trách nhiệm nội dung.'},
      {q: 'Cách ghi kết quả từ chuỗi thư dễ dùng nhất?', options: ['Bảng quyết định kèm ngày thư gốc', 'Chép lại cả 25 thư', 'Nhớ trong đầu'], answer: 0, why: 'Bảng giúp tra lại và kiểm chứng.'}]},
  26: {minutes: '40–60 phút',
    steps: ['Dữ liệu khảo sát ở A1:B61 với tiêu đề GioTuHoc, Diem.', 'Cách không cần Python: =CORREL(A2:A61,B2:B61) và Insert › Scatter (Biểu đồ phân tán).', 'Với Python trong Excel: gõ =PY( vào ô, nhập mã, bấm Ctrl+Enter để chạy.', 'Mã mẫu: df = xl("A1:B61", headers=True) rồi df.describe() để xem thống kê.', 'Viết 3 câu kết luận và 1 giới hạn (mẫu nhỏ, tự khai, tương quan không phải nhân quả).'],
    example: {title: 'Hai cách tính mối liên hệ', body: 'Công thức thường:\n=CORREL(A2:A61,B2:B61)   → 0,52 (liên hệ vừa)\n\nPython trong Excel (ô =PY):\ndf = xl("A1:B61", headers=True)\ndf["GioTuHoc"].corr(df["Diem"])'},
    exercise: {type: 'formula', prompt: 'Giờ tự học ở A2:A61, điểm ở B2:B61. Viết công thức Excel (không Python) tính hệ số tương quan.', answers: ['=CORREL(A2:A61,B2:B61)', '=CORREL(B2:B61,A2:A61)', '=PEARSON(A2:A61,B2:B61)'], hint: 'Hàm CORREL(vùng 1, vùng 2).', explain: 'CORREL trả về hệ số từ −1 đến 1; gần 0 là liên hệ yếu.'},
    quiz: [
      {q: 'Hệ số tương quan 0,52 nghĩa là?', options: ['Có liên hệ cùng chiều mức vừa', 'Học nhiều chắc chắn điểm cao', 'Không liên quan'], answer: 0, why: 'Tương quan vừa, chưa chứng minh nhân quả.'},
      {q: 'Chạy ô Python trong Excel bấm?', options: ['Ctrl+Enter', 'Alt+F4', 'F1'], answer: 0, why: 'Ctrl+Enter xác nhận và chạy ô =PY.'},
      {q: 'Giới hạn quan trọng của khảo sát 60 bạn tự khai?', options: ['Mẫu nhỏ, có sai số tự khai', 'Quá nhiều dữ liệu', 'Không có giới hạn'], answer: 0, why: 'Cần nói rõ giới hạn khi kết luận.'}]},
  27: {minutes: '30–40 phút',
    steps: ['Phân loại dữ liệu: công khai, nội bộ, nhạy cảm (điểm có tên, số điện thoại, sức khỏe).', 'Nếu tổ chức có: Home › Sensitivity (Trang đầu › Độ nhạy cảm) để gắn nhãn cho tệp.', 'Trước khi chia sẻ: File › Info › Check for Issues › Inspect Document (Kiểm tra tài liệu) để xóa thông tin ẩn, nhận xét, tên tác giả.', 'Thay tên thật bằng mã khi phân tích; không dán dữ liệu nhạy cảm vào AI.', 'Chia sẻ người cụ thể, quyền tối thiểu (bài 20).'],
    example: {title: 'Bảng phân loại dữ liệu', body: 'Công khai: lịch sinh hoạt CLB\nNội bộ: biên bản họp ban cán sự\nNhạy cảm: điểm kèm họ tên, số điện thoại phụ huynh, thông tin sức khỏe\n→ Nhạy cảm: không đưa vào AI, không chia sẻ liên kết công khai.'},
    exercise: {type: 'choice', prompt: 'Một bạn định dán danh sách số điện thoại phụ huynh vào AI để soạn tin nhắn hàng loạt. Cách đúng?', options: ['Dán vào cho nhanh', 'Chỉ nhờ AI soạn mẫu tin nhắn, ghép số điện thoại bằng Mail Merge trên máy', 'Đăng danh sách lên nhóm lớp'], answer: 1, explain: 'AI chỉ cần mẫu; dữ liệu cá nhân xử lý tại chỗ bằng công cụ được phép.'},
    quiz: [
      {q: 'Inspect Document dùng để?', options: ['Xóa thông tin ẩn trước khi chia sẻ', 'Kiểm tra chính tả', 'Đếm chữ'], answer: 0, why: 'Tệp có thể chứa nhận xét, tên tác giả, dữ liệu ẩn.'},
      {q: 'Dữ liệu nào là nhạy cảm?', options: ['Điểm kèm họ tên học sinh', 'Lịch sinh hoạt CLB', 'Tên trường'], answer: 0, why: 'Dữ liệu cá nhân gắn với người cụ thể.'},
      {q: 'Copilot của tổ chức thì?', options: ['Vẫn chỉ đưa dữ liệu đúng mục đích và tối thiểu', 'Được đưa mọi dữ liệu', 'Không cần quan tâm'], answer: 0, why: 'Công cụ an toàn hơn không có nghĩa được dùng tùy ý.'}]},
  28: {minutes: '3–4 buổi',
    steps: ['Chuẩn hóa dữ liệu mượn sách thành bảng Excel; tính số lượt bằng COUNTIF/PivotTable.', 'Dùng Copilot (hoặc tự làm) gợi ý nhận xét; tự kiểm tra 5 con số.', 'Viết báo cáo Word có Styles, mục lục, bảng, biểu đồ, chú thích.', 'Tạo 5 slide tóm tắt và email gửi thầy Hiệu phó kèm liên kết tệp quyền Xem.', 'Ghi nhật ký AI: yêu cầu, kết quả, chỗ đã sửa, cách kiểm chứng.'],
    example: {title: 'Nhật ký AI mẫu', body: 'Lần 3 — Excel Copilot (Chat): “Thể loại nào được mượn nhiều nhất tháng 10?”\nKết quả: “Truyện tranh, 142 lượt”\nKiểm chứng: PivotTable → 138 lượt (Copilot tính cả 4 dòng trùng)\nĐã sửa: loại trùng bằng Remove Duplicates, số đúng 138.'},
    exercise: {type: 'order', prompt: 'Sắp xếp quy trình làm báo cáo tháng.', items: ['Chuẩn hóa dữ liệu thành bảng', 'Tính số liệu và kiểm chứng', 'Viết báo cáo Word', 'Làm slide tóm tắt', 'Gửi email kèm liên kết quyền Xem'], explain: 'Số liệu đúng trước, trình bày sau, chia sẻ cuối cùng.'},
    quiz: [
      {q: 'Nhật ký AI dùng để?', options: ['Ghi yêu cầu, kết quả, chỗ sửa và cách kiểm chứng', 'Trang trí báo cáo', 'Thay báo cáo'], answer: 0, why: 'Minh bạch phần AI hỗ trợ và chứng minh đã kiểm tra.'},
      {q: 'Copilot nói 142 lượt, PivotTable ra 138. Tin số nào?', options: ['Kiểm tra nguyên nhân rồi dùng số đã kiểm chứng', 'Lấy số lớn hơn', 'Lấy trung bình'], answer: 0, why: 'Tìm nguyên nhân chênh lệch (ở đây là dòng trùng).'},
      {q: 'Gửi báo cáo cho thầy Hiệu phó nên chia sẻ quyền?', options: ['Can view', 'Anyone can edit', 'Không chia sẻ, gửi ảnh chụp'], answer: 0, why: 'Người nhận cần xem, không cần sửa.'}]},
};

// Authors tend to write the right answer first. Rotate each question's options deterministically so
// the correct answer lands in every position about equally often (the explanation stays attached).
function rotate(item, target, key) {
  const n = item.options.length;
  const shift = (target - item[key] + n) % n;
  item.options = item.options.map((_, i) => item.options[(i - shift + n) % n]);
  item[key] = target;
}
for (const [n, lesson] of Object.entries(OFFICE_TEACH)) {
  lesson.quiz.forEach((q, k) => rotate(q, (Number(n) + k) % 3, 'answer'));
  if (lesson.exercise.type === 'choice') rotate(lesson.exercise, (Number(n) * 2) % lesson.exercise.options.length, 'answer');
}
