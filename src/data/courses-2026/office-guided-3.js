// Guided Office lessons 15–28 (PowerPoint, Outlook, sharing, Copilot, Python in Excel, security, final project).
// Copilot facts from Microsoft Support / Learn, November 2026; every lesson works without a Copilot licence.

const STUDY = [[1, 5.5], [2, 6], [3, 6.5], [2.5, 7], [4, 7.5], [5, 8], [3.5, 7], [6, 8.5], [1.5, 5], [4.5, 8]];
const studyCells = () => {
  const c = {A1: 'Giờ tự học/tuần', B1: 'Điểm', D1: 'TB điểm', E1: 'Tương quan'};
  STUDY.forEach(([h, d], i) => { c['A' + (i + 2)] = h; c['B' + (i + 2)] = d; });
  return c;
};
const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
const correl = () => {
  const xs = STUDY.map(r => r[0]), ys = STUDY.map(r => r[1]), mx = mean(xs), my = mean(ys);
  let sxy = 0, sxx = 0, syy = 0;
  xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2; });
  return sxy / Math.sqrt(sxx * syy);
};

export const OFFICE_GUIDED_3 = {
  15: {
    outcome: 'Làm cho cả bài trình bày cùng một kiểu chữ, màu và logo chỉ bằng một lần sửa ở Slide Master.',
    analogy: 'Slide Master giống khuôn bánh: đổ bột vào khuôn nào thì bánh ra hình khuôn đó. Sửa khuôn một lần, mọi chiếc bánh sau đều đổi theo.',
    walkthrough: [
      {title: 'Vấn đề: mỗi slide một kiểu', text: ['Bài ghép từ 4 người: slide phông Arial, slide phông Times, màu nền mỗi chỗ một khác. Sửa tay từng slide rất mất công.']},
      {title: 'Mở Slide Master', text: ['View › Slide Master (Dạng xem › Trang chiếu cái). Slide trên cùng bên trái là slide cái: đặt phông, màu, logo ở đây thì mọi slide nhận theo.'], ribbon: {app: 'powerpoint', tab: 'View', group: 'Master Views', buttons: ['Slide Master', 'Handout Master', 'Notes Master'], press: 'Slide Master'}, terms: {'Slide Master': 'slide gốc quy định kiểu cho mọi slide'}},
      {title: 'Áp lại cho slide cũ', text: ['Close Master View, chọn mọi slide (Ctrl+A ở cột trái) › Home › Reset (Đặt lại). Slide đã chỉnh tay sẽ nhận kiểu mới.'], ribbon: {app: 'powerpoint', tab: 'Home', group: 'Slides', buttons: ['New Slide', 'Layout', 'Reset'], press: 'Reset'}},
      {title: 'Tiêu đề là câu kết luận', text: ['Mỗi slide một ý. Tiêu đề nói kết luận, không chỉ nói chủ đề.'], code: 'Chủ đề: “Kết quả khảo sát”\nKết luận: “68% học sinh muốn có thùng rác phân loại ở căng tin”'},
    ],
    lab: {type: 'order', intro: 'Sắp xếp các bước thống nhất giao diện cho bài trình bày ghép từ 4 người.', items: ['View › Slide Master', 'Đặt phông, màu, logo ở slide cái', 'Close Master View', 'Chọn mọi slide', 'Home › Reset'], explain: 'Sửa khuôn trước, rồi áp lại cho các slide cũ.'},
  },
  16: {
    outcome: 'Biến bảng số liệu khô khan thành 1–2 slide khiến người nghe nhớ ngay con số quan trọng.',
    analogy: 'Kể chuyện bằng số liệu giống chỉ đường: không đọc cả bản đồ cho người hỏi, chỉ nói “đi thẳng, thấy cây xăng thì rẽ phải”.',
    walkthrough: [
      {title: 'Một slide, một kết luận', text: ['Viết một câu kết luận trước, rồi chọn biểu đồ chứng minh câu đó. Bảng chi tiết để phụ lục.']},
      {title: 'Một điểm nhấn màu', text: ['Tô màu nổi cho cột hay điểm quan trọng nhất, các phần còn lại màu xám. Mắt người xem đi thẳng tới đó.']},
      {title: 'Ghi nguồn, rồi đề xuất', text: ['Ghi nguồn và thời điểm số liệu ở chân slide. Slide tiếp theo: làm gì, chi phí, khi nào, đo kết quả bằng gì.'], code: 'Slide 1: “Căng tin thải 40 kg rác nhựa mỗi tuần, ly nhựa chiếm 55%”\n         Nguồn: khảo sát Đoàn trường 10/2026\nSlide 2: “Đề xuất: 6 thùng phân loại, 1,8 triệu đồng, đo lại sau 4 tuần”'},
    ],
    lab: {type: 'sort', intro: 'Tiêu đề slide nào đã nói rõ kết luận, tiêu đề nào còn chung chung?', groups: ['Kết luận rõ', 'Còn chung chung'],
      items: [
        {text: '“Kết quả khảo sát”', group: 'Còn chung chung', why: 'Chỉ nói chủ đề, không nói kết luận.'},
        {text: '“68% học sinh muốn có thùng rác phân loại”', group: 'Kết luận rõ', why: 'Người xem nhớ ngay con số.'},
        {text: '“Số liệu”', group: 'Còn chung chung', why: 'Không có thông tin.'},
        {text: '“Ly nhựa chiếm hơn một nửa rác căng tin”', group: 'Kết luận rõ', why: 'Nói thẳng phát hiện chính.'},
        {text: '“Biểu đồ rác thải”', group: 'Còn chung chung', why: 'Tên biểu đồ, chưa phải kết luận.'},
      ]},
  },
  17: {
    outcome: 'Luyện thuyết trình với Speaker Coach và tự sửa được tốc độ nói, từ đệm, thói quen đọc slide.',
    analogy: 'Speaker Coach giống huấn luyện viên đứng bên cạnh bấm giờ và ghi chú: “nói nhanh quá”, “lại nói ‘ờ’ rồi”.',
    walkthrough: [
      {title: 'Ghi chú người nói', text: ['Ô Notes dưới mỗi slide: 2–4 ý chính, không viết nguyên văn cả bài.'], code: '• 40 kg/tuần, ly nhựa 55%\n• Hỏi: “Hôm nay bạn dùng mấy ly nhựa?”\n• Chuyển: “Vậy giải pháp là gì?”'},
      {title: 'Luyện với Speaker Coach', text: ['Slide Show › Rehearse with Coach (Trình chiếu › Diễn tập với huấn luyện viên). Nói như thật; cuối buổi xem báo cáo tốc độ, từ đệm, đọc nguyên văn slide.'], ribbon: {app: 'powerpoint', tab: 'Slide Show', group: 'Set Up', buttons: ['Rehearse with Coach', 'Rehearse Timings', 'Record'], press: 'Rehearse with Coach'}},
      {title: 'Khi trình bày thật', text: ['Dùng Presenter View (Alt+F5): em thấy ghi chú và slide kế tiếp, khán giả chỉ thấy slide hiện tại.'], terms: {'Presenter View': 'màn hình riêng cho người trình bày'}},
    ],
    lab: {type: 'sort', intro: 'Điều nào nên làm, điều nào nên tránh khi thuyết trình?', groups: ['Nên làm', 'Nên tránh'],
      items: [
        {text: 'Ngắt nghỉ ở cuối mỗi ý thay vì nói “ờ”.', group: 'Nên làm', why: 'Giúp người nghe theo kịp, giảm từ đệm.'},
        {text: 'Đọc nguyên văn chữ trên slide.', group: 'Nên tránh', why: 'Người nghe đọc nhanh hơn em nói; bài nói thành nhàm.'},
        {text: 'Hiệu ứng bay chữ cho mọi dòng.', group: 'Nên tránh', why: 'Làm chậm và gây xao nhãng.'},
        {text: 'Luyện 2 lần, so sánh báo cáo của Speaker Coach.', group: 'Nên làm', why: 'Thấy rõ tiến bộ.'},
        {text: 'Nói 190 từ/phút cho kịp giờ.', group: 'Nên tránh', why: 'Quá nhanh; nên cắt bớt nội dung thay vì nói nhanh.'},
      ]},
  },
  18: {
    outcome: 'Viết email xin phép, thông báo đúng phép lịch sự và người nhận đọc một lần là hiểu cần làm gì.',
    analogy: 'Email tốt giống phong bì có ghi rõ người gửi, việc gì ngay ngoài bìa: người nhận chưa mở đã biết thư nói gì.',
    walkthrough: [
      {title: 'Tiêu đề nói rõ việc', text: ['Tiêu đề có: việc gì, khi nào, ai gửi.'], code: 'Kém: “Thầy ơi”\nTốt: “Xin mượn phòng TN Hóa 14h–16h thứ Sáu 21/11 – CLB Khoa học”'},
      {title: 'Ba đoạn ngắn', text: ['Lời chào đúng người nhận. Đoạn 1: yêu cầu chính. Đoạn 2: chi tiết (giờ, số người, mục đích). Đoạn 3: cam kết và lời cảm ơn, ký tên.']},
      {title: 'To, CC, BCC và hẹn giờ gửi', text: ['To: người xử lý. CC: người cần biết. BCC: khi gửi nhiều người không quen nhau, để không lộ địa chỉ của nhau.', 'Hẹn giờ: Send › Schedule Send (Outlook mới) hoặc Options › Delay Delivery (Outlook cổ điển).'], ribbon: {app: 'outlook', tab: 'Home', group: 'New', buttons: ['New Email', 'Reply', 'Reply All', 'Forward'], press: 'New Email'}, terms: {'BCC': 'người nhận ẩn, người khác không thấy địa chỉ này'}},
    ],
    lab: {type: 'brief', intro: 'Viết email xin thầy Minh mượn phòng thí nghiệm Hóa cho CLB Khoa học chiều thứ Sáu.', sendLabel: '✉️ Xem trước email', exampleLabel: 'Xem email mẫu', resultTitle: 'Bản xem trước email:', doneText: '✓ Email đủ phần, rõ ràng và lịch sự.',
      fields: [
        {key: 'subject', label: 'Tiêu đề', placeholder: 'Ví dụ: Xin mượn phòng… – CLB…', minLen: 15, any: ['xin', 'đề nghị', 'mượn', 'thông báo'], ask: 'Tiêu đề chưa nói rõ việc gì. Hãy ghi việc, thời gian và tên CLB.'},
        {key: 'greet', label: 'Lời chào', placeholder: 'Ví dụ: Kính gửi thầy Minh,', minLen: 6, any: ['kính', 'thưa', 'gửi', 'chào'], ask: 'Thiếu lời chào đúng người nhận.'},
        {key: 'ask', label: 'Yêu cầu chính và chi tiết', placeholder: 'Ví dụ: Em xin phép mượn… từ… đến… cho… bạn…', minLen: 30, any: ['xin', 'mượn', 'đề nghị'], ask: 'Chưa rõ em xin điều gì, lúc nào, cho bao nhiêu người.'},
        {key: 'close', label: 'Cam kết, cảm ơn, ký tên', placeholder: 'Ví dụ: CLB cam kết… Em cảm ơn thầy. Lan – 11A2', minLen: 15, any: ['cảm ơn', 'cám ơn'], ask: 'Thiếu lời cảm ơn và tên người gửi.'},
      ],
      example: {subject: 'Đề nghị mượn sân bóng chiều thứ Bảy 22/11 – CLB Bóng đá', greet: 'Kính gửi thầy Tuấn,', ask: 'Em là Nam, lớp 10A3, đội trưởng CLB Bóng đá. Em xin phép mượn sân bóng từ 15h đến 17h thứ Bảy 22/11 cho 20 thành viên luyện tập.', close: 'CLB cam kết giữ vệ sinh và trả sân đúng giờ. Em cảm ơn thầy ạ. Nam – 10A3'},
      plan: v => [`Tiêu đề: ${v.subject}`, v.greet, v.ask, v.close]},
  },
  19: {
    outcome: 'Tạo lời mời họp mà mọi người đều đến được, biết trước nội dung và cùng sửa một bản tài liệu.',
    analogy: 'Lời mời họp tốt giống thiệp mời sinh nhật: có giờ, địa điểm, và ghi rõ “mang gì theo”.',
    walkthrough: [
      {title: 'Tạo cuộc họp', text: ['Calendar › New Meeting (Lịch › Cuộc họp mới). Thêm người được mời, tiêu đề, địa điểm hoặc bật Teams meeting.'], ribbon: {app: 'outlook', tab: 'Home', group: 'New', buttons: ['New Event', 'New Meeting', 'New Teams Meeting'], press: 'New Meeting'}},
      {title: 'Chọn giờ mọi người rảnh', text: ['Mở Scheduling Assistant (Trợ lý lập lịch): thấy giờ bận/rảnh của người trong cùng trường/tổ chức, chọn khung trống.'], terms: {'Scheduling Assistant': 'bảng xem giờ rảnh của mọi người'}},
      {title: 'Chương trình và tài liệu', text: ['Ghi chương trình 3 mục kèm thời lượng. Gắn tài liệu bằng liên kết OneDrive thay vì tệp đính kèm, để mọi người cùng sửa một bản.'], code: 'Chương trình: 1) Phân công (10′) 2) Ngân sách (10′) 3) Việc tuần tới (10′)\nTài liệu: liên kết OneDrive “KeHoach_HoiTrai.docx”'},
    ],
    lab: {type: 'order', intro: 'Sắp xếp các bước tạo lời mời họp ban cán sự.', items: ['Calendar › New Meeting', 'Thêm người được mời', 'Chọn giờ bằng Scheduling Assistant', 'Viết chương trình và gắn liên kết tài liệu', 'Send'], explain: 'Có người được mời thì mới xem được giờ rảnh của họ.'},
  },
  20: {
    outcome: 'Chia sẻ tệp đúng người, đúng quyền, và thu hồi được khi không cần nữa.',
    analogy: 'Chia sẻ tệp giống đưa chìa khóa: đưa chìa xem (Can view) cho người chỉ cần đọc, chìa sửa (Can edit) cho người cùng làm, không đưa chìa cho người không liên quan.',
    walkthrough: [
      {title: 'Chia sẻ người cụ thể', text: ['Share › chọn Specific people (Người cụ thể), gõ email từng người. Tránh “Anyone with the link” với tài liệu có thông tin cá nhân.'], terms: {'Can view': 'chỉ xem, không sửa', 'Can edit': 'được sửa'}},
      {title: 'Quyền và ngày hết hạn', text: ['Đặt Can view hoặc Can edit cho từng người. Nếu tài khoản hỗ trợ, đặt ngày hết hạn liên kết.']},
      {title: 'Thu hồi quyền', text: ['Manage Access (Quản lý quyền truy cập) liệt kê ai đang có quyền; bấm để bỏ quyền. Xóa tin nhắn chứa liên kết không thu hồi được quyền.'], tip: 'Lỡ chia sẻ liên kết “ai cũng sửa được” vào nhóm chat: vào Manage Access tắt liên kết ngay.'},
    ],
    lab: {type: 'sort', intro: 'Tệp “Bảng điểm lớp 10A1” có điểm kèm họ tên. Mỗi người sau nên có quyền gì?', groups: ['Can edit', 'Can view', 'Không chia sẻ'],
      items: [
        {text: 'Cô giáo chủ nhiệm (người nhập điểm)', group: 'Can edit', why: 'Cô là người cập nhật bảng điểm.'},
        {text: 'Lớp trưởng (cần xem để nhắc các bạn)', group: 'Can view', why: 'Chỉ cần xem.'},
        {text: 'Cả nhóm chat lớp 40 người', group: 'Không chia sẻ', why: 'Điểm cá nhân không công khai cho cả lớp.'},
        {text: 'Thầy hiệu phó (xem báo cáo)', group: 'Can view', why: 'Cần xem, không cần sửa.'},
        {text: 'Bạn ở trường khác hỏi xin tham khảo', group: 'Không chia sẻ', why: 'Không liên quan, có dữ liệu cá nhân.'},
      ]},
  },
  21: {
    outcome: 'Hoàn thành một bộ hồ sơ thuyết trình xin kinh phí: slide, biểu đồ, email và lời mời buổi trình bày.',
    analogy: 'Hồ sơ xin kinh phí giống đơn xin việc: không chỉ đẹp mà phải trả lời được “cần bao nhiêu, làm gì, đo kết quả thế nào”.',
    walkthrough: [
      {title: 'Khung 8 slide', text: ['Vấn đề › Số liệu › Mục tiêu › Giải pháp › Kế hoạch và mốc thời gian › Ngân sách chi tiết › Cách đo kết quả › Đề nghị hội đồng.']},
      {title: 'Ghép các kỹ năng', text: ['Slide Master (bài 15), kể chuyện bằng số liệu (bài 16), luyện nói (bài 17), email (bài 18), lời mời họp (bài 19).']},
      {title: 'Luyện dưới thời gian cho phép', text: ['Nếu được 7 phút, luyện xong trong 6 phút. Vượt giờ thường bị cắt phần cuối, mà phần cuối là đề nghị quan trọng nhất.']},
    ],
    lab: {type: 'plan', intro: 'Nhóm đề xuất các việc để hoàn thành hồ sơ xin 3 triệu đồng cho cuộc thi robot. Duyệt từng việc.', labels: {taskLabel: 'Hồ sơ', item: 'Việc', approve: 'Chốt danh sách việc', hint: 'Chọn Giữ, Hỏi lại hoặc Bỏ cho từng việc.', success: '✓ Danh sách việc giúp hồ sơ thuyết phục và trung thực.'}, task: 'Hồ sơ xin kinh phí cuộc thi robot cấp trường',
      steps: [
        {text: 'Thêm slide ngân sách ghi chi tiết từng khoản.', ok: ['keep'], why: 'Hội đồng cần biết tiền dùng vào đâu.'},
        {text: 'Thêm slide “Cách đo kết quả” có chỉ số cụ thể.', ok: ['keep'], why: 'Trả lời “làm sao biết thành công”.'},
        {text: 'Ghi “đã có 3 nhà tài trợ” dù chưa liên hệ ai.', ok: ['remove'], why: 'Thông tin sai sự thật.'},
        {text: 'Dán biểu đồ từ Excel và ghi nguồn số liệu.', ok: ['keep'], why: 'Có nguồn để kiểm chứng.'},
        {text: 'Thêm 6 slide ảnh robot nổi tiếng trên mạng cho ấn tượng.', ok: ['remove', 'ask'], why: 'Không liên quan đề xuất, có thể vi phạm bản quyền ảnh.'},
        {text: 'Luyện trình bày dưới 7 phút với Speaker Coach.', ok: ['keep'], why: 'Đúng giờ, không bị cắt phần đề nghị.'},
      ]},
  },
  22: {
    outcome: 'Nhờ Copilot trong Word viết bản nháp từ ghi chép của em, rồi tìm ra mọi chỗ Copilot tự thêm hoặc viết sai.',
    analogy: 'Copilot giống một bạn viết nhanh nhưng hay “thêm mắm thêm muối”: bài trôi chảy, nhưng em phải dò lại từng chi tiết với ghi chép gốc.',
    walkthrough: [
      {title: 'Mở Copilot trong Word', text: ['Bấm nút Copilot (hoặc Word Agent ở khung chat bên phải) nếu gói Microsoft 365 có hỗ trợ. Không có thì làm cùng các bước với một AI khác được phép dùng.'], ribbon: {app: 'word', tab: 'Home', group: 'Copilot', buttons: ['Copilot'], press: 'Copilot'}},
      {title: 'Yêu cầu tốt', text: ['Nói rõ: mục đích, người đọc, độ dài, giọng văn, tệp tham chiếu, và “chỉ dùng thông tin trong tệp; thiếu thì ghi [CẦN BỔ SUNG]”.'], code: '“Dựa trên tệp GhiChep_ThamQuan.docx, viết bài 600 chữ cho bản tin trường, người đọc là học sinh, giọng vui nhưng chính xác. Chỉ dùng thông tin trong tệp; thiếu thì ghi [CẦN BỔ SUNG].”'},
      {title: 'Dò lại với ghi chép', text: ['Đọc bản nháp, đánh dấu mọi chi tiết không có trong ghi chép gốc: con số, tên người, sự kiện. Sửa hoặc xóa. Ghi chú phần nào AI hỗ trợ.']},
    ],
    lab: {type: 'sort', intro: 'Ghi chép của em: “Ngày 8/11, 38 bạn lớp 10A1 tham quan nhà máy tái chế ở Bình Dương, đi xe buýt của trường, cô Hạnh dẫn đoàn.” Copilot viết các câu sau. Câu nào khớp ghi chép, câu nào Copilot tự thêm hoặc viết sai?', groups: ['Khớp ghi chép', 'Tự thêm / sai – phải sửa'],
      items: [
        {text: '“Ngày 8/11, lớp 10A1 đã tham quan nhà máy tái chế ở Bình Dương.”', group: 'Khớp ghi chép', why: 'Đúng ngày, lớp, địa điểm.'},
        {text: '“Đoàn gồm 45 học sinh.”', group: 'Tự thêm / sai – phải sửa', why: 'Ghi chép là 38 bạn.'},
        {text: '“Cô Hạnh dẫn đoàn.”', group: 'Khớp ghi chép', why: 'Có trong ghi chép.'},
        {text: '“Giám đốc nhà máy đã tặng mỗi bạn một chậu cây.”', group: 'Tự thêm / sai – phải sửa', why: 'Không có trong ghi chép, Copilot tự thêm.'},
        {text: '“Đoàn đi bằng xe buýt của trường.”', group: 'Khớp ghi chép', why: 'Đúng.'},
      ]},
  },
  23: {
    outcome: 'Chọn đúng chế độ Copilot trong Excel: chỉ hỏi (Chat), xem kế hoạch (Plan) hay cho sửa thẳng (Edit).',
    analogy: 'Ba chế độ giống ba cách nhờ bạn giúp làm bài: hỏi bạn (Chat), nhờ bạn nói cách làm trước (Plan), hay đưa vở cho bạn viết vào (Edit). Đưa vở thì phải chụp lại bản cũ trước.',
    walkthrough: [
      {title: 'Ba chế độ', text: ['Chat: phân tích và trả lời, không sửa tệp. Plan: lập kế hoạch các bước trước khi làm. Edit: trực tiếp tạo công thức, bảng, biểu đồ, PivotTable trong sổ làm việc (trước đây gọi là Agent Mode).'], terms: {'Chat': 'chỉ trả lời, không đổi tệp', 'Plan': 'cho xem kế hoạch trước', 'Edit': 'sửa thẳng vào tệp'}},
      {title: 'Làm trên bản sao', text: ['Trước khi dùng Edit, sao chép tệp. Có gì sai còn bản gốc.']},
      {title: 'Kiểm tra công thức Copilot tạo', text: ['Bấm vào ô Copilot tạo: thấy công thức là tốt; chỉ có số là số gõ cứng. Tự kiểm tra 3 dòng bằng công thức của em.'], code: 'Copilot tạo: =[@Diem_Ky2]-[@Diem_Ky1]\nTự kiểm tra dòng 5: 7,5 − 6,0 = 1,5 ✓'},
    ],
    lab: {type: 'sort', intro: 'Với mỗi yêu cầu, chọn chế độ Copilot phù hợp nhất.', groups: ['Chat', 'Plan', 'Edit'],
      items: [
        {text: '“Lớp nào tăng điểm nhiều nhất?” (chỉ muốn biết, không đổi tệp)', group: 'Chat', why: 'Chỉ hỏi, không cần sửa tệp.'},
        {text: '“Thêm cột chênh lệch điểm và vẽ biểu đồ” (đã sao lưu tệp)', group: 'Edit', why: 'Cần tạo nội dung trong tệp.'},
        {text: '“Em muốn làm bảng tổng hợp phức tạp, cho xem các bước trước đã”', group: 'Plan', why: 'Xem kế hoạch trước khi làm.'},
        {text: '“Giải thích công thức ở ô F3 làm gì”', group: 'Chat', why: 'Hỏi giải thích.'},
        {text: '“Tạo PivotTable doanh thu theo tháng” (làm trên bản sao)', group: 'Edit', why: 'Tạo PivotTable trong tệp.'},
      ]},
  },
  24: {
    outcome: 'Dùng Copilot tạo nhanh bản nháp slide từ báo cáo, rồi biên tập thành bài trình bày gọn, đúng, của chính em.',
    analogy: 'Bản nháp Copilot giống khối đất sét đã nặn sơ: có hình dáng, nhưng em phải gọt, sửa thì mới thành tác phẩm.',
    walkthrough: [
      {title: 'Tạo slide từ tài liệu', text: ['PowerPoint › Copilot (hoặc PowerPoint Agent) › tạo bài trình bày từ tệp, đính kèm báo cáo Word. Nêu số slide, người nghe, mẫu muốn dùng.'], ribbon: {app: 'powerpoint', tab: 'Home', group: 'Copilot', buttons: ['Copilot'], press: 'Copilot'}},
      {title: 'Biên tập bản nháp', text: ['Gộp slide trùng ý, rút chữ, đổi tiêu đề thành câu kết luận, kiểm tra từng số liệu với báo cáo gốc.']},
      {title: 'Ảnh và quyền', text: ['Ảnh AI tạo hay ảnh chung chung nên thay bằng ảnh thật của CLB (có xin phép người trong ảnh). Không trình bày nguyên bản nháp AI.']},
    ],
    lab: {type: 'plan', intro: 'Copilot tạo bản nháp 15 slide từ báo cáo dự án. Duyệt các đề xuất chỉnh sửa.', labels: {taskLabel: 'Bài trình bày', item: 'Đề xuất', approve: 'Chốt chỉnh sửa', hint: 'Chọn Giữ, Hỏi lại hoặc Bỏ cho từng đề xuất.', success: '✓ Bài trình bày gọn, đúng và là của em.'}, task: 'Bảo vệ dự án “Thùng rác phân loại ở căng tin” trước hội đồng giáo viên',
      steps: [
        {text: 'Cắt từ 15 còn 8 slide, gộp các slide trùng ý.', ok: ['keep'], why: 'Gọn, đúng thời gian.'},
        {text: 'Giữ nguyên slide ghi “85% học sinh” dù báo cáo ghi 68%.', ok: ['remove'], why: 'Phải sửa theo báo cáo gốc.'},
        {text: 'Thay ảnh AI tạo “học sinh nhặt rác” bằng ảnh thật của CLB (đã xin phép).', ok: ['keep'], why: 'Ảnh thật, trung thực.'},
        {text: 'Đổi tiêu đề thành câu kết luận.', ok: ['keep'], why: 'Người nghe nắm ý chính.'},
        {text: 'Trình bày nguyên bản nháp, không luyện nói.', ok: ['remove'], why: 'Dễ lộ việc chưa hiểu nội dung.'},
      ]},
  },
  25: {
    outcome: 'Dùng Copilot tóm tắt chuỗi email dài, rồi kiểm tra để không bỏ sót thay đổi mới nhất.',
    analogy: 'Bản tóm tắt giống lời kể lại của một người bạn: nhanh và tiện, nhưng có khi bạn quên chi tiết “à, giờ đón đã đổi rồi”.',
    walkthrough: [
      {title: 'Tóm tắt chuỗi thư', text: ['Mở chuỗi thư dài › Summarize (Tóm tắt) bằng Copilot nếu có. Không có Copilot: tự đọc và lập bảng.'], ribbon: {app: 'outlook', tab: 'Home', group: 'Copilot', buttons: ['Summarize', 'Draft with Copilot'], press: 'Summarize'}},
      {title: 'Bảng quyết định cuối cùng', text: ['Ghi: giờ, địa điểm, chi phí, người phụ trách, kèm ngày của thư gốc chứa quyết định đó. Ưu tiên thư mới nhất.'], code: 'Giờ đón: 6h30 (thư 12/11 sửa từ 7h00)\nTập trung: cổng phụ (thư 10/11)\nChi phí: 250.000đ (thư 9/11)'},
      {title: 'Soạn thư trả lời', text: ['Copilot gợi ý thư (Draft with Copilot); em đọc kỹ, sửa, rồi mới gửi. Copilot không tự gửi thay em.']},
    ],
    lab: {type: 'sort', intro: 'Chuỗi thư về chuyến dã ngoại: thư 5/11 hẹn đón 7h00 ở cổng chính; thư 10/11 đổi chỗ tập trung sang cổng phụ; thư 12/11 đổi giờ đón thành 6h30; chi phí 250.000đ không đổi. Bản tóm tắt ghi các câu sau. Câu nào đúng theo thư mới nhất?', groups: ['Đúng theo thư mới nhất', 'Đã cũ – phải sửa'],
      items: [
        {text: 'Giờ đón: 7h00.', group: 'Đã cũ – phải sửa', why: 'Thư 12/11 đã đổi thành 6h30.'},
        {text: 'Chi phí: 250.000đ mỗi bạn.', group: 'Đúng theo thư mới nhất', why: 'Không thay đổi.'},
        {text: 'Tập trung ở cổng chính.', group: 'Đã cũ – phải sửa', why: 'Thư 10/11 đổi sang cổng phụ.'},
        {text: 'Tập trung ở cổng phụ.', group: 'Đúng theo thư mới nhất', why: 'Theo thư 10/11.'},
        {text: 'Giờ đón: 6h30.', group: 'Đúng theo thư mới nhất', why: 'Theo thư 12/11.'},
      ]},
  },
  26: {
    outcome: 'Tính được mức độ liên hệ giữa thời gian tự học và điểm số, và nói đúng ý nghĩa của con số đó.',
    analogy: 'Hệ số tương quan giống thước đo “hai thứ có hay đi cùng nhau không”: trời nắng và bán kem thường đi cùng nhau, nhưng không có nghĩa bán kem làm trời nắng.',
    walkthrough: [
      {title: 'Dữ liệu khảo sát', text: ['10 bạn khai số giờ tự học mỗi tuần (cột A) và điểm kiểm tra (cột B).'], sheet: {cols: 5, rows: 11, cells: studyCells(), caption: 'Khảo sát giả lập 10 bạn.'}},
      {title: 'CORREL: hệ số tương quan', text: ['=CORREL(A2:A11,B2:B11) cho số từ −1 đến 1. Gần 1: cùng tăng; gần 0: không liên hệ rõ; gần −1: cái này tăng thì cái kia giảm.'], sheet: {cols: 5, rows: 11, cells: studyCells(), demo: {cell: 'E2', formula: '=CORREL(A2:A11,B2:B11)', note: 'Kết quả gần 1: giờ tự học và điểm thường cùng tăng.'}}, terms: {'Tương quan': 'mức độ hai đại lượng thay đổi cùng nhau'}},
      {title: 'Python trong Excel (nếu có)', text: ['Gõ =PY( vào ô, nhập mã, bấm Ctrl+Enter.'], code: 'df = xl("A1:B11", headers=True)\ndf.describe()\ndf.iloc[:,0].corr(df.iloc[:,1])'},
      {title: 'Nói đúng ý nghĩa', text: ['Tương quan cao chưa chứng minh học nhiều làm điểm cao: còn sức khỏe, học thêm, độ khó đề… Mẫu 10 bạn tự khai còn nhỏ và có sai số.'], tip: 'Luôn viết kèm một câu về giới hạn của dữ liệu.'},
    ],
    lab: {type: 'sheet', intro: 'Gõ công thức để phân tích khảo sát.',
      sheet: {cols: 5, rows: 11, cells: studyCells(), tasks: [
        {cell: 'D2', answer: '=AVERAGE(B2:B11)', prompt: 'Ở D2, tính điểm trung bình của 10 bạn.', mustUse: ['AVERAGE'], expect: mean(STUDY.map(r => r[1])), hint: '=AVERAGE(B2:B11)', explain: 'Điểm trung bình là 6,9.'},
        {cell: 'E2', answer: '=CORREL(A2:A11,B2:B11)', prompt: 'Ở E2, tính hệ số tương quan giữa giờ tự học và điểm.', mustUse: ['CORREL'], expect: correl(), hint: '=CORREL(A2:A11,B2:B11)', explain: 'Hệ số gần 1: có liên hệ cùng chiều mạnh trong mẫu này, nhưng chưa chứng minh nguyên nhân.'},
      ]}},
  },
  27: {
    outcome: 'Phân loại được tài liệu công khai, nội bộ, nhạy cảm và biết xử lý từng loại khi dùng Office và Copilot.',
    analogy: 'Phân loại dữ liệu giống phân loại thư: thư mời (ai đọc cũng được), thư nội bộ CLB (chỉ thành viên), thư riêng (chỉ người nhận).',
    walkthrough: [
      {title: 'Ba mức dữ liệu', text: ['Công khai: lịch sinh hoạt CLB. Nội bộ: biên bản họp ban cán sự. Nhạy cảm: điểm kèm họ tên, số điện thoại phụ huynh, thông tin sức khỏe.'], terms: {'Dữ liệu nhạy cảm': 'thông tin cá nhân có thể gây hại nếu bị lộ'}},
      {title: 'Nhãn và kiểm tra tài liệu', text: ['Nếu trường có: Home › Sensitivity (Độ nhạy cảm) gắn nhãn cho tệp. Trước khi chia sẻ: File › Info › Check for Issues › Inspect Document để xóa thông tin ẩn, nhận xét, tên tác giả.'], ribbon: {app: 'word', tab: 'File', group: 'Info', buttons: ['Protect Document', 'Check for Issues', 'Version History'], press: 'Check for Issues'}},
      {title: 'Với Copilot và AI', text: ['Copilot chỉ đọc tệp em có quyền. Nhưng công cụ an toàn hơn không có nghĩa đưa gì vào cũng được: dữ liệu nhạy cảm không đưa vào AI, thay tên bằng mã khi phân tích.']},
    ],
    lab: {type: 'sort', intro: 'Xếp từng tài liệu vào mức phù hợp.', groups: ['Công khai', 'Nội bộ', 'Nhạy cảm'],
      items: [
        {text: 'Lịch sinh hoạt CLB tháng 11', group: 'Công khai', why: 'Ai cũng có thể xem.'},
        {text: 'Biên bản họp ban cán sự', group: 'Nội bộ', why: 'Chỉ thành viên ban cán sự.'},
        {text: 'Bảng điểm kèm họ tên học sinh', group: 'Nhạy cảm', why: 'Dữ liệu cá nhân.'},
        {text: 'Danh sách số điện thoại phụ huynh', group: 'Nhạy cảm', why: 'Thông tin liên lạc cá nhân.'},
        {text: 'Kế hoạch ngân sách hội trại (chưa duyệt)', group: 'Nội bộ', why: 'Chưa công bố, chỉ người phụ trách.'},
        {text: 'Poster tuyển thành viên', group: 'Công khai', why: 'Làm ra để công bố.'},
      ]},
  },
  28: {
    outcome: 'Tự làm trọn bộ báo cáo tháng (Excel, Word, PowerPoint, email) có Copilot hỗ trợ, số liệu đã kiểm chứng và nhật ký AI rõ ràng.',
    analogy: 'Đồ án cuối giống nấu một bữa cơm hoàn chỉnh: có người phụ giúp (Copilot), nhưng em là đầu bếp chính, nếm từng món trước khi dọn ra.',
    walkthrough: [
      {title: 'Thứ tự làm', text: ['Dữ liệu sạch trước (Excel), tính và kiểm chứng số liệu, rồi mới viết báo cáo (Word), làm slide (PowerPoint), cuối cùng gửi email chia sẻ quyền Xem.']},
      {title: 'Nhật ký AI', text: ['Mỗi lần nhờ Copilot: ghi yêu cầu, kết quả, chỗ đã sửa, cách kiểm chứng.'], code: 'Lần 3 — Excel Copilot (Chat): “Thể loại nào được mượn nhiều nhất?”\nKết quả: “Truyện tranh, 142 lượt”\nKiểm chứng: PivotTable → 138 (Copilot tính cả 4 dòng trùng)\nĐã sửa: Remove Duplicates, số đúng 138'},
      {title: 'Khi hai con số lệch nhau', text: ['Tìm nguyên nhân (dòng trùng, thiếu Refresh, sai vùng), dùng số đã kiểm chứng, ghi lại trong nhật ký.']},
    ],
    lab: {type: 'order', intro: 'Sắp xếp quy trình làm báo cáo tháng của thư viện.', items: ['Chuẩn hóa dữ liệu mượn sách thành bảng Excel', 'Tính số liệu và kiểm chứng (PivotTable, SUMIF)', 'Viết báo cáo Word có bảng và biểu đồ', 'Làm 5 slide tóm tắt', 'Gửi email kèm liên kết quyền Xem'], explain: 'Số liệu đúng trước, trình bày sau, chia sẻ cuối cùng.'},
  },
};
