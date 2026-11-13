// Guided Claude Design lessons 15–28 (part 3 of the Claude learning path). Beginner format.
// Facts: Claude Help Center, Claude Academy and Anthropic posts on Claude Design, November 2026.

const q = (text, options, answer, why) => ({q: text, options, answer, why});

export const CLAUDEDESIGN_TEACH_2 = {
  15: {
    minutes: '30–40 phút',
    steps: ['Xác định việc chính người dùng cần làm.', 'Vẽ các màn hình theo thứ tự.', 'Nối nút bấm giữa các màn hình.', 'Bấm thử từ đầu đến cuối.'],
    guided: {
      outcome: 'Tạo nguyên mẫu bấm thử được (ví dụ ứng dụng đặt phòng tự học) để kiểm tra ý tưởng trước khi viết mã.',
      analogy: 'Nguyên mẫu giống nhà mẫu ở khu chung cư: chưa ai ở thật, nhưng bước vào là biết phòng nào ở đâu, đi lại có tiện không.',
      walkthrough: [
        {title: 'Nguyên mẫu là gì?', text: ['Bản thiết kế bấm được: chạm nút “Đặt phòng” là sang màn hình chọn giờ. Chưa có dữ liệu thật, chưa lưu gì cả.'], terms: {'Nguyên mẫu (prototype)': 'bản thử bấm được để kiểm tra luồng sử dụng', 'Luồng (flow)': 'chuỗi màn hình người dùng đi qua để làm xong một việc'}},
        {title: 'Yêu cầu theo luồng', text: ['Nói rõ việc chính và các màn hình.'], code: '“Tạo nguyên mẫu điện thoại cho ứng dụng đặt phòng tự học của trường:\n1) Trang chủ: danh sách phòng còn trống\n2) Chi tiết phòng: chọn khung giờ\n3) Xác nhận: tên lớp, nút Đặt\n4) Thành công: mã đặt phòng\nCác nút phải bấm chuyển màn hình được.”'},
        {title: 'Bấm thử', text: ['Bấm từ màn hình đầu đến cuối như người dùng thật. Chỗ nào bế tắc (không có nút quay lại, không biết bấm gì) là chỗ cần sửa.'], design: {highlight: 'canvas', caption: 'Bấm thử trực tiếp trên khung vẽ như dùng ứng dụng thật.'}},
      ],
      lab: {type: 'order', intro: 'Sắp xếp các màn hình của nguyên mẫu đặt phòng tự học theo đúng luồng người dùng đi.', items: ['Trang chủ: danh sách phòng còn trống', 'Chi tiết phòng: chọn khung giờ', 'Xác nhận: nhập tên lớp, bấm Đặt', 'Thành công: hiện mã đặt phòng'], explain: 'Xem → chọn → xác nhận → kết quả. Thiếu bước xác nhận dễ đặt nhầm.'},
    },
    quiz: [
      q('Nguyên mẫu dùng để?', ['Kiểm tra luồng sử dụng trước khi viết mã', 'Thay ứng dụng thật', 'Lưu dữ liệu người dùng'], 0, 'Thử ý tưởng rẻ và nhanh.'),
      q('Khi bấm thử thấy không có nút quay lại thì?', ['Đó là chỗ cần sửa', 'Bình thường', 'Bỏ qua'], 0, 'Người dùng sẽ bế tắc.'),
      q('Yêu cầu nguyên mẫu tốt nên?', ['Liệt kê các màn hình và việc của từng màn hình', 'Chỉ nói “làm app”', 'Chỉ nói màu'], 0, 'Claude biết dựng luồng nào.'),
    ],
  },
  16: {
    minutes: '30–40 phút',
    steps: ['Viết 3 nhiệm vụ cho người thử.', 'Để họ tự làm, không gợi ý.', 'Ghi lại chỗ họ lúng túng.', 'Sửa rồi thử lại.'],
    guided: {
      outcome: 'Cho 3–5 bạn thử nguyên mẫu, quan sát đúng cách và biết chỗ nào cần sửa.',
      analogy: 'Giống cho bạn ăn thử món mới: em không giải thích “món này phải ăn với nước chấm”, mà xem bạn tự ăn thế nào. Bạn lúng túng chỗ nào là món còn thiếu chỗ đó.',
      walkthrough: [
        {title: 'Giao nhiệm vụ, không chỉ đường', text: ['Nói “Hãy đặt phòng tự học lúc 15h thứ Năm”, KHÔNG nói “bấm nút xanh bên phải”.']},
        {title: 'Quan sát và ghi chép', text: ['Ghi: bạn ấy dừng ở đâu, bấm nhầm gì, nói gì. Không cãi lại, không giải thích trong lúc thử.'], code: 'Người thử 2 – Nhiệm vụ 1: đặt phòng 15h thứ Năm\n• Dừng 10 giây ở trang chủ, không thấy nút lọc theo ngày\n• Bấm nhầm “Chi tiết” hai lần\n• Nói: “Mình không biết đã đặt xong chưa”'},
        {title: '5 người là đủ thấy lỗi chính', text: ['Thường 5 người đã chỉ ra phần lớn lỗi lớn. Sửa, rồi thử lại với người mới.']},
      ],
      lab: {type: 'sort', intro: 'Khi cho bạn thử nguyên mẫu, việc nào nên làm, việc nào nên tránh?', groups: ['Nên làm', 'Nên tránh'],
        items: [
          {text: 'Giao nhiệm vụ: “Hãy đặt phòng lúc 15h thứ Năm”.', group: 'Nên làm', why: 'Nhiệm vụ thật, không chỉ đường.'},
          {text: 'Nói trước: “Bấm nút xanh góc phải nhé”.', group: 'Nên tránh', why: 'Gợi ý làm mất tác dụng của bài thử.'},
          {text: 'Ghi lại chỗ bạn ấy dừng lâu hoặc bấm nhầm.', group: 'Nên làm', why: 'Đó là chỗ cần sửa.'},
          {text: 'Giải thích, bào chữa khi bạn ấy không hiểu.', group: 'Nên tránh', why: 'Người dùng thật không có em ngồi cạnh.'},
          {text: 'Chỉ hỏi “Đẹp không?”.', group: 'Nên tránh', why: 'Câu hỏi chung chung, không thấy được vấn đề.'},
          {text: 'Sửa rồi thử lại với người mới.', group: 'Nên làm', why: 'Kiểm tra cách sửa có hiệu quả.'},
        ]},
    },
    quiz: [
      q('Khi người thử lúng túng, em nên?', ['Ghi lại, không giải thích', 'Chỉ ngay chỗ bấm', 'Kết thúc bài thử'], 0, 'Lúng túng là dữ liệu quý.'),
      q('Nhiệm vụ cho người thử nên giống?', ['“Đặt phòng lúc 15h thứ Năm”', '“Bấm nút xanh”', '“Xem có đẹp không”'], 0, 'Nhiệm vụ thật, không chỉ đường.'),
      q('Khoảng bao nhiêu người thử là thấy phần lớn lỗi lớn?', ['Khoảng 5', '1', '500'], 0, 'Nhỏ mà hiệu quả.'),
    ],
  },
  17: {
    minutes: '25–35 phút',
    steps: ['Nói chủ đề, người nghe, thời lượng.', 'Nêu số slide và ý mỗi slide.', 'Áp hệ thống thiết kế.', 'Xuất PPTX hoặc PDF.'],
    guided: {
      outcome: 'Dùng Claude Slides tạo bộ slide thuyết trình rõ ràng, ít chữ, đúng thời lượng.',
      analogy: 'Slide giống biển chỉ đường khi em dẫn đoàn tham quan: biển chỉ hướng ngắn gọn, còn em là người giải thích. Biển viết cả đoạn văn thì không ai đọc kịp.',
      walkthrough: [
        {title: 'Claude Slides', text: ['Claude tạo bộ slide theo hệ thống thiết kế của em, tải về được dạng PowerPoint (PPTX) hoặc PDF, hoặc gửi sang Canva, Gamma.'], terms: {'PPTX': 'tệp PowerPoint, mở và sửa tiếp được'}},
        {title: 'Mỗi slide một ý', text: ['Tiêu đề là câu kết luận, thân slide là bằng chứng (số liệu, hình). Chữ còn lại để em nói.'], posters: [{label: 'Chưa tốt – đọc chữ trên slide', bg: '#ffffff', fg: '#333', title: 'Kết quả khảo sát', titleSize: 0.9, crowded: true, lines: ['Chúng em đã khảo sát 120 bạn ở 4 lớp trong 2 tuần và thấy rằng phần lớn các bạn muốn có thêm phòng tự học vào buổi chiều, đặc biệt là…']}, {label: 'Tốt – một ý rõ', bg: '#fdf6ec', fg: '#3a2a20', accent: '#7b1e3a', title: '7/10 bạn cần phòng tự học buổi chiều', titleSize: 0.95, lines: ['Khảo sát 120 bạn, 4 lớp']}]},
        {title: 'Đúng thời lượng', text: ['Khoảng 1 slide cho mỗi 1 phút nói. Thuyết trình 5 phút: 5–6 slide.']},
      ],
      lab: {type: 'brief', intro: 'Viết yêu cầu Claude Slides cho bài thuyết trình dự án “Góc đọc sách xanh”.', sendLabel: '📊 Gửi yêu cầu (mô phỏng)', exampleLabel: 'Xem yêu cầu mẫu', resultTitle: 'Claude: “Tôi sẽ dựng bộ slide như sau:”', doneText: '✓ Yêu cầu đủ để bộ slide gọn và đúng giờ.',
        fields: [
          {key: 'topic', label: '1. Chủ đề và người nghe', placeholder: 'Ví dụ: dự án Góc đọc sách xanh, trình bày với ban giám hiệu', minLen: 15, any: ['dự án', 'trình bày', 'thầy', 'cô', 'ban', 'lớp', 'hội đồng'], ask: 'Thuyết trình về gì, cho ai nghe?'},
          {key: 'time', label: '2. Thời lượng và số slide', placeholder: 'Ví dụ: 5 phút, 6 slide', minLen: 5, any: ['phút', 'slide', 'trang'], ask: 'Em nói bao nhiêu phút, khoảng mấy slide?'},
          {key: 'ideas', label: '3. Ý chính của các slide', placeholder: 'Ví dụ: vấn đề, khảo sát, giải pháp, chi phí, kế hoạch, lời kêu gọi', minLen: 20, any: [',', ';', '1', 'vấn đề', 'giải pháp'], ask: 'Các slide nói những ý gì, theo thứ tự nào?'},
          {key: 'look', label: '4. Giao diện và định dạng tải về', placeholder: 'Ví dụ: dùng hệ thống thiết kế của trường, xuất PPTX', minLen: 8, any: ['pptx', 'pdf', 'hệ thống', 'màu', 'canva'], ask: 'Dùng giao diện nào, cần tải về dạng gì?'},
        ],
        example: {topic: 'Dự án Góc đọc sách xanh, trình bày với hội đồng nhà trường.', time: '5 phút, 6 slide.', ideas: '1 vấn đề, 2 khảo sát 120 bạn, 3 giải pháp, 4 chi phí, 5 kế hoạch, 6 lời đề nghị.', look: 'Dùng hệ thống thiết kế của trường, xuất PPTX để sửa tiếp.'},
        plan: v => [`Chủ đề: ${v.topic}`, `Thời lượng: ${v.time}`, `Bố cục: ${v.ideas}`, `Giao diện: ${v.look}`]},
    },
    quiz: [
      q('Thuyết trình 5 phút nên có khoảng?', ['5–6 slide', '30 slide', '1 slide'], 0, 'Khoảng 1 slide mỗi phút.'),
      q('Tiêu đề slide tốt là?', ['Câu kết luận ngắn', 'Chữ “Kết quả”', 'Một đoạn văn'], 0, 'Người nghe nắm ý ngay.'),
      q('Muốn sửa tiếp slide trong PowerPoint thì tải?', ['PPTX', 'PNG', 'Ảnh chụp màn hình'], 0, 'PPTX sửa tiếp được.'),
    ],
  },
  18: {
    minutes: '25–30 phút',
    steps: ['Biết Claude Docs dùng khi nào.', 'Phân biệt Docs, Slides, Design.', 'Cùng sửa và bình luận.', 'Xuất Google Docs hoặc .docx.'],
    guided: {
      outcome: 'Chọn đúng công cụ: Claude Docs cho tài liệu chữ cùng sửa, Claude Slides cho thuyết trình, Claude Design cho sản phẩm hình ảnh.',
      analogy: 'Giống chọn đồ dùng học tập: viết bài thì dùng vở, thuyết trình thì dùng bảng, vẽ tranh thì dùng giấy vẽ. Dùng nhầm vẫn được nhưng vất vả.',
      walkthrough: [
        {title: 'Claude Docs – tài liệu sống', text: ['Tài liệu chữ mà cả nhóm cùng sửa, bình luận: kế hoạch, biên bản, báo cáo. Xuất sang Google Docs hoặc Word (.docx).'], terms: {'Tài liệu sống': 'tài liệu luôn được cập nhật, mọi người xem bản mới nhất qua một đường liên kết'}},
        {title: 'Ba công cụ, ba việc', text: ['Docs: nhiều chữ, cần sửa và góp ý. Slides: trình chiếu từng trang. Design: poster, trang web, nguyên mẫu, sản phẩm hình ảnh.']},
        {title: 'Một dự án dùng cả ba', text: ['Kế hoạch dự án (Docs) → bài thuyết trình (Slides) → poster kêu gọi (Design). Cùng hệ thống thiết kế nên trông thống nhất.']},
      ],
      lab: {type: 'sort', intro: 'Mỗi sản phẩm nên làm bằng công cụ nào?', groups: ['Claude Docs', 'Claude Slides', 'Claude Design'],
        items: [
          {text: 'Biên bản họp lớp để cả lớp góp ý.', group: 'Claude Docs', why: 'Tài liệu chữ, cùng sửa.'},
          {text: 'Bài thuyết trình 5 phút trước hội đồng.', group: 'Claude Slides', why: 'Trình chiếu.'},
          {text: 'Poster Ngày hội Khoa học.', group: 'Claude Design', why: 'Sản phẩm hình ảnh.'},
          {text: 'Kế hoạch dự án 3 trang có bảng phân công.', group: 'Claude Docs', why: 'Nhiều chữ, cần cập nhật.'},
          {text: 'Nguyên mẫu ứng dụng đặt phòng.', group: 'Claude Design', why: 'Thiết kế tương tác.'},
          {text: 'Slide báo cáo kết quả cuối kỳ.', group: 'Claude Slides', why: 'Trình bày từng trang.'},
        ]},
    },
    quiz: [
      q('Biên bản họp cả nhóm cùng sửa nên dùng?', ['Claude Docs', 'Claude Slides', 'Ảnh PNG'], 0, 'Tài liệu chữ sống.'),
      q('Claude Docs xuất được sang?', ['Google Docs hoặc .docx', 'Chỉ ảnh', 'Không xuất được'], 0, 'Hai định dạng phổ biến.'),
      q('Poster kêu gọi nên làm bằng?', ['Claude Design', 'Claude Docs', 'Bảng tính'], 0, 'Sản phẩm hình ảnh.'),
    ],
  },
  19: {
    minutes: '30–40 phút',
    steps: ['Xác định một việc trang muốn người xem làm.', 'Sắp xếp các phần theo câu hỏi người xem.', 'Xem trên điện thoại.', 'Kiểm tra mọi thông tin.'],
    guided: {
      outcome: 'Thiết kế trang giới thiệu (landing page) có bố cục dẫn người xem đến một hành động, ví dụ đăng ký.',
      analogy: 'Landing page giống người bán hàng giỏi: chào hỏi, nói sản phẩm giúp gì, đưa bằng chứng, trả lời thắc mắc, rồi mời mua. Không mời mua ngay câu đầu, cũng không nói mãi không mời.',
      walkthrough: [
        {title: 'Một trang, một hành động', text: ['Trang đăng ký CLB chỉ cần một nút chính: “Đăng ký”. Thêm nhiều nút khác nhau làm người xem phân vân.'], terms: {'Landing page': 'trang đích, một trang web với một mục tiêu chính', 'Kêu gọi hành động (CTA)': 'nút hoặc câu mời người xem làm một việc'}},
        {title: 'Thứ tự các phần', text: ['Theo câu hỏi trong đầu người xem: Đây là gì? → Được lợi gì? → Có thật không? → Còn thắc mắc? → Đăng ký thế nào?'], code: '1. Phần mở đầu (hero): tên CLB + 1 câu lợi ích + nút Đăng ký\n2. Lợi ích: 3 điều em nhận được\n3. Bằng chứng: ảnh hoạt động, lời bạn đã tham gia\n4. Câu hỏi thường gặp\n5. Kêu gọi đăng ký lần cuối'},
        {title: 'Xem trên điện thoại', text: ['Phần lớn học sinh mở trên điện thoại. Nhờ Claude: “hiển thị bản điện thoại” và kiểm tra nút có dễ bấm không.']},
      ],
      lab: {type: 'order', intro: 'Sắp xếp các phần của landing page đăng ký CLB Robot từ trên xuống.', items: ['Mở đầu: tên CLB, một câu lợi ích, nút Đăng ký', 'Lợi ích: 3 điều thành viên nhận được', 'Bằng chứng: ảnh hoạt động và lời các bạn đã tham gia', 'Câu hỏi thường gặp', 'Kêu gọi đăng ký lần cuối'], explain: 'Đi theo câu hỏi của người xem: là gì → lợi gì → có thật không → thắc mắc → hành động.'},
    },
    quiz: [
      q('Landing page tốt có mấy hành động chính?', ['Một', 'Mười', 'Không có'], 0, 'Một mục tiêu rõ ràng.'),
      q('Phần mở đầu (hero) nên có?', ['Tên, một câu lợi ích, nút hành động', 'Cả bài giới thiệu dài', 'Chỉ ảnh'], 0, 'Người xem hiểu ngay trong vài giây.'),
      q('Vì sao cần xem trên điện thoại?', ['Phần lớn người xem dùng điện thoại', 'Không cần', 'Cho đẹp'], 0, 'Nút phải dễ bấm trên màn nhỏ.'),
    ],
  },
  20: {
    minutes: '30–40 phút',
    steps: ['Chọn loại biểu đồ đúng.', 'Trục bắt đầu từ 0 với biểu đồ cột.', 'Ghi nguồn và thời điểm số liệu.', 'Đối chiếu từng số với dữ liệu gốc.'],
    guided: {
      outcome: 'Làm biểu đồ, infographic từ số liệu mà không làm người xem hiểu sai.',
      analogy: 'Biểu đồ cắt trục giống chụp ảnh từ dưới lên cho người trông cao hơn: ảnh thật, nhưng người xem hiểu sai chiều cao.',
      walkthrough: [
        {title: 'Chọn đúng loại', text: ['So sánh nhóm: biểu đồ cột. Thay đổi theo thời gian: biểu đồ đường. Tỉ lệ của một tổng (ít phần): biểu đồ tròn.']},
        {title: 'Cắt trục làm phóng đại', text: ['Bên trái trục bắt đầu từ 80 nên 82 và 86 trông chênh gấp ba. Bên phải trục từ 0, thấy đúng chênh lệch nhỏ.'], posters: [{label: 'Chưa tốt – trục bắt đầu từ 80', bg: '#ffffff', fg: '#333', accent: '#c0392b', title: '▁ ▇', titleSize: 1.6, sub: 'Lớp A 82 · Lớp B 86', lines: ['Trục: 80 → 90']}, {label: 'Tốt – trục bắt đầu từ 0', bg: '#ffffff', fg: '#333', accent: '#2e7d32', title: '▆ ▇', titleSize: 1.6, sub: 'Lớp A 82 · Lớp B 86', lines: ['Trục: 0 → 100']}]},
        {title: 'Nguồn và kiểm tra', text: ['Ghi “Nguồn: khảo sát 120 học sinh, tháng 11/2026”. Claude có thể đọc nhầm số từ ảnh hoặc bảng; dò lại từng con số với tệp gốc.']},
      ],
      lab: {type: 'sort', intro: 'Biểu đồ nào trình bày trung thực, biểu đồ nào dễ gây hiểu sai?', groups: ['Trình bày trung thực', 'Dễ gây hiểu sai'],
        items: [
          {text: 'Biểu đồ cột, trục bắt đầu từ 0, có ghi nguồn.', group: 'Trình bày trung thực', why: 'Đúng tỉ lệ, có nguồn.'},
          {text: 'Biểu đồ cột cắt trục từ 80 để chênh lệch trông lớn.', group: 'Dễ gây hiểu sai', why: 'Phóng đại khác biệt.'},
          {text: 'Biểu đồ tròn có 12 phần nhỏ li ti.', group: 'Dễ gây hiểu sai', why: 'Quá nhiều phần, không đọc được.'},
          {text: 'Biểu đồ đường thể hiện số sách mượn theo tháng.', group: 'Trình bày trung thực', why: 'Đúng loại cho dữ liệu theo thời gian.'},
          {text: 'Số liệu không ghi nguồn, không ghi thời gian.', group: 'Dễ gây hiểu sai', why: 'Người xem không kiểm tra được.'},
        ]},
    },
    quiz: [
      q('Biểu đồ cột nên có trục bắt đầu từ?', ['0', 'Số nhỏ nhất trong dữ liệu', 'Tùy thích'], 0, 'Tránh phóng đại chênh lệch.'),
      q('Thể hiện thay đổi theo tháng nên dùng?', ['Biểu đồ đường', 'Biểu đồ tròn', 'Không dùng biểu đồ'], 0, 'Đường cho xu hướng thời gian.'),
      q('Sau khi Claude làm biểu đồ từ bảng số, em cần?', ['Dò lại từng số với dữ liệu gốc', 'Tin ngay', 'Xóa nguồn'], 0, 'Có thể đọc nhầm số.'),
    ],
  },
  21: {
    minutes: '1–2 buổi',
    steps: ['Làm nguyên mẫu cho dự án.', 'Thử với 5 người, sửa lỗi.', 'Làm slide kể lại quá trình.', 'Tập thuyết trình đúng giờ.'],
    guided: {
      outcome: 'Hoàn thành nguyên mẫu đã thử với người dùng và bộ slide trình bày dự án, kể đúng điều đã học được.',
      analogy: 'Giống đi thi nấu ăn: mang món đã nấu thử, kể giám khảo em đã nêm lại thế nào sau khi bạn bè nếm, không chỉ khoe món đẹp.',
      walkthrough: [
        {title: 'Ghép kỹ năng bài 15–20', text: ['Nguyên mẫu (15), thử nghiệm (16), slide (17), tài liệu (18), trang web (19), biểu đồ (20).']},
        {title: 'Kể cả điều chưa ổn', text: ['Slide nên có “Người thử lúng túng ở đâu, chúng em đã sửa gì”. Giám khảo đánh giá cao quá trình trung thực.']},
        {title: 'Thử trước khi trình bày', text: ['Bấm lại toàn bộ nguyên mẫu trên máy dùng để trình bày, tập nói đúng thời gian.']},
      ],
      lab: {type: 'plan', intro: 'Duyệt kế hoạch đồ án “Ứng dụng đặt phòng tự học”.', labels: {taskLabel: 'Đồ án', item: 'Việc', approve: 'Chốt kế hoạch', hint: 'Giữ, hỏi lại hoặc bỏ từng việc.', success: '✓ Kế hoạch trung thực, đã thử với người dùng.'}, task: 'Nguyên mẫu và bài trình bày 7 phút',
        steps: [
          {text: 'Làm nguyên mẫu 4 màn hình theo luồng đặt phòng.', ok: ['keep'], why: 'Cốt lõi của đồ án.'},
          {text: 'Cho 5 bạn thử, ghi chỗ lúng túng, sửa.', ok: ['keep'], why: 'Có bằng chứng thật.'},
          {text: 'Ghi trong slide “100% người dùng hài lòng” dù mới hỏi 2 bạn.', ok: ['remove'], why: 'Số liệu phóng đại, không trung thực.'},
          {text: 'Slide có phần “đã sửa gì sau khi thử”.', ok: ['keep'], why: 'Thể hiện quá trình.'},
          {text: 'Không bấm thử lại trên máy trình bày.', ok: ['remove'], why: 'Dễ hỏng khi trình bày.'},
        ]},
    },
    quiz: [
      q('Slide đồ án nên kể?', ['Cả chỗ người thử lúng túng và cách đã sửa', 'Chỉ phần đẹp', 'Không cần nói quá trình'], 0, 'Quá trình trung thực.'),
      q('Ghi “100% hài lòng” khi mới hỏi 2 bạn là?', ['Phóng đại, không trung thực', 'Chuẩn', 'Bắt buộc'], 0, 'Số liệu phải đúng.'),
      q('Trước khi trình bày cần?', ['Bấm thử lại trên máy trình bày', 'Không cần thử', 'Đổi hết thiết kế'], 0, 'Tránh sự cố.'),
    ],
  },
  22: {
    minutes: '20–30 phút',
    steps: ['Biết 3 mức chia sẻ.', 'Chọn mức nhỏ nhất đủ dùng.', 'Mời góp ý bằng bình luận.', 'Thu hồi quyền khi xong việc.'],
    guided: {
      outcome: 'Chia sẻ thiết kế đúng mức: riêng tư, cho tổ chức xem, hoặc cho quyền sửa, và nhận góp ý gọn gàng.',
      analogy: 'Chia sẻ giống đưa chìa khóa nhà: cho xem ảnh nhà thì ai cũng được, cho vào nhà thì chọn người, đưa chìa khóa để sửa nhà thì chỉ người tin cậy.',
      walkthrough: [
        {title: '3 mức chia sẻ', text: ['Riêng tư (chỉ em). Trong tổ chức xem được. Trong tổ chức sửa được. Bấm Chia sẻ để chọn.'], design: {highlight: 'share', caption: 'Nút “🔗 Chia sẻ” để chọn ai xem, ai sửa.'}},
        {title: 'Mức nhỏ nhất đủ dùng', text: ['Bạn chỉ cần xem và góp ý thì cho quyền xem. Chỉ người cùng làm mới cần quyền sửa.']},
        {title: 'Góp ý bằng bình luận', text: ['Mời bạn bình luận vào đúng phần tử thay vì nhắn “chỗ đó hơi xấu” qua tin nhắn. Xong việc thì thu hồi quyền sửa.']},
      ],
      lab: {type: 'sort', intro: 'Mỗi người nên được chia sẻ ở mức nào?', groups: ['Giữ riêng tư', 'Cho xem', 'Cho sửa'],
        items: [
          {text: 'Bản nháp đầu, còn chữ giả, chưa muốn ai thấy.', group: 'Giữ riêng tư', why: 'Chưa sẵn sàng.'},
          {text: 'Cô giáo chủ nhiệm cần xem để duyệt.', group: 'Cho xem', why: 'Duyệt không cần sửa.'},
          {text: 'Bạn cùng nhóm phụ trách phần trang đăng ký.', group: 'Cho sửa', why: 'Cùng làm thiết kế.'},
          {text: 'Các bạn trong lớp góp ý thiết kế.', group: 'Cho xem', why: 'Góp ý bằng bình luận là đủ.'},
          {text: 'Thiết kế có thông tin chưa được công bố.', group: 'Giữ riêng tư', why: 'Chưa được phép công khai.'},
        ]},
    },
    quiz: [
      q('Cô giáo chỉ cần duyệt thì nên cho quyền?', ['Xem', 'Sửa', 'Không chia sẻ'], 0, 'Mức nhỏ nhất đủ dùng.'),
      q('Góp ý thiết kế gọn nhất là?', ['Bình luận vào đúng phần tử', 'Nhắn tin chung chung', 'Gọi điện'], 0, 'Đúng chỗ, dễ sửa.'),
      q('Xong việc với bạn cùng sửa thì?', ['Thu hồi quyền sửa nếu không cần', 'Cho cả trường quyền sửa', 'Xóa thiết kế'], 0, 'Giữ an toàn bản thiết kế.'),
    ],
  },
  23: {
    minutes: '20–30 phút',
    steps: ['Biết các định dạng xuất.', 'Chọn theo nơi dùng.', 'Gửi sang Canva, Gamma, Adobe khi cần.', 'Kiểm tra tệp sau khi xuất.'],
    guided: {
      outcome: 'Xuất thiết kế đúng định dạng cho từng nơi dùng: in ấn, đăng mạng, thuyết trình, trang web.',
      analogy: 'Giống đóng gói quà: gửi bưu điện thì hộp cứng, tặng tận tay thì giấy gói đẹp, gửi qua mạng thì ảnh chụp. Cùng món quà, cách gói theo nơi đến.',
      walkthrough: [
        {title: 'Các định dạng', text: ['PNG (ảnh), PDF (in, gửi giữ nguyên bố cục), PPTX (PowerPoint sửa tiếp), HTML (trang web), .zip (cả thư mục). Có thể gửi sang Canva, Gamma, Adobe.'], design: {highlight: 'export', caption: 'Nút “⬇ Xuất” để chọn định dạng tải về.'}},
        {title: 'Chọn theo nơi dùng', text: ['In poster: PDF. Đăng Facebook/Zalo: PNG. Thuyết trình cần sửa: PPTX. Trang web: HTML.']},
        {title: 'Kiểm tra sau khi xuất', text: ['Mở tệp vừa xuất: phông có bị đổi, chữ có bị tràn, ảnh có bị mờ không.']},
      ],
      lab: {type: 'sort', intro: 'Mỗi nơi dùng nên xuất định dạng nào?', groups: ['PDF', 'PNG', 'PPTX', 'HTML'],
        items: [
          {text: 'In poster A3 dán ở bảng tin.', group: 'PDF', why: 'Giữ nguyên bố cục khi in.'},
          {text: 'Đăng bài lên trang Facebook của CLB.', group: 'PNG', why: 'Ảnh đăng mạng.'},
          {text: 'Thầy cần sửa tiếp bộ slide trong PowerPoint.', group: 'PPTX', why: 'Mở và sửa trong PowerPoint.'},
          {text: 'Đưa trang đăng ký lên mạng.', group: 'HTML', why: 'Định dạng trang web.'},
          {text: 'Gửi tờ tóm tắt cho phụ huynh qua email, giữ nguyên bố cục.', group: 'PDF', why: 'Mở máy nào cũng giống nhau.'},
        ]},
    },
    quiz: [
      q('In poster nên xuất?', ['PDF', 'HTML', 'Văn bản thuần'], 0, 'PDF giữ bố cục khi in.'),
      q('Muốn sửa slide tiếp trong PowerPoint thì xuất?', ['PPTX', 'PNG', 'PDF'], 0, 'PPTX sửa được.'),
      q('Sau khi xuất tệp nên?', ['Mở kiểm tra phông, chữ, ảnh', 'Gửi ngay không xem', 'Xóa bản gốc'], 0, 'Xuất có thể lỗi.'),
    ],
  },
  24: {
    minutes: '25–35 phút',
    steps: ['Thiết kế đã được duyệt.', 'Tạo gói bàn giao cho Claude Code.', 'Ghi chú hành vi và dữ liệu.', 'So bản dựng với thiết kế.'],
    guided: {
      outcome: 'Bàn giao thiết kế cho Claude Code để dựng thành ứng dụng thật, kèm ghi chú đủ rõ để không ai phải đoán.',
      analogy: 'Giống giao bản vẽ nhà cho thợ xây: bản vẽ đẹp chưa đủ, phải ghi cửa mở vào hay ra, ổ điện cao bao nhiêu. Thợ không phải đoán thì xây mới đúng.',
      walkthrough: [
        {title: 'Gói bàn giao', text: ['Khi thiết kế sẵn sàng, Claude đóng gói (handoff bundle) để chuyển sang Claude Code chỉ bằng một chỉ thị. Claude Code dựng thành mã thật.'], terms: {'Bàn giao (handoff)': 'chuyển thiết kế cho người hoặc công cụ dựng sản phẩm thật', 'Trạng thái': 'các tình huống màn hình: đang tải, lỗi, trống'}},
        {title: 'Ghi chú điều thiết kế không thể hiện', text: ['Bấm nút thì sao? Không có mạng thì sao? Danh sách trống hiện gì? Dữ liệu lấy từ đâu?'], code: 'Ghi chú bàn giao – Ứng dụng đặt phòng tự học\n• Nút Đặt: kiểm tra phòng còn trống rồi mới xác nhận\n• Khi phòng đã kín: hiện “Đã kín, chọn giờ khác”\n• Danh sách trống: hiện “Hôm nay chưa có phòng trống”\n• Không lưu tên học sinh, chỉ lưu tên lớp'},
        {title: 'So bản dựng với thiết kế', text: ['Mở ứng dụng Claude Code dựng, đặt cạnh thiết kế, so từng màn hình và từng trạng thái.']},
      ],
      lab: {type: 'brief', intro: 'Viết ghi chú bàn giao thiết kế “Trang đăng ký CLB” cho Claude Code.', sendLabel: '📦 Gửi gói bàn giao (mô phỏng)', exampleLabel: 'Xem ghi chú mẫu', resultTitle: 'Claude Code: “Tôi sẽ dựng theo các điểm sau:”', doneText: '✓ Ghi chú đủ rõ, Claude Code không phải đoán.',
        fields: [
          {key: 'goal', label: '1. Trang làm gì', placeholder: 'Ví dụ: cho học sinh đăng ký vào CLB Robot', minLen: 12, any: ['đăng ký', 'cho', 'học sinh', 'trang'], ask: 'Trang này giúp người dùng làm gì?'},
          {key: 'action', label: '2. Khi bấm nút chính', placeholder: 'Ví dụ: kiểm tra đủ tên lớp rồi hiện “Đăng ký thành công”', minLen: 15, any: ['bấm', 'khi', 'hiện', 'kiểm tra', 'gửi'], ask: 'Bấm nút chính thì điều gì xảy ra?'},
          {key: 'states', label: '3. Lỗi, trống, hết chỗ', placeholder: 'Ví dụ: hết chỗ thì hiện “Đã đủ thành viên”, lỗi mạng thì báo thử lại', minLen: 15, any: ['lỗi', 'hết', 'trống', 'không', 'khi'], ask: 'Khi lỗi, hết chỗ hoặc trống thì hiện gì?'},
          {key: 'data', label: '4. Dữ liệu và giới hạn', placeholder: 'Ví dụ: chỉ lưu tên lớp, không lưu số điện thoại', minLen: 10, any: ['lưu', 'không', 'dữ liệu', 'chỉ'], ask: 'Lưu dữ liệu gì, không được lưu gì?'},
        ],
        example: {goal: 'Trang cho học sinh đăng ký tham gia CLB Robot.', action: 'Khi bấm Đăng ký: kiểm tra đã chọn lớp rồi hiện “Đăng ký thành công”.', states: 'Hết chỗ thì hiện “Đã đủ 30 thành viên”; lỗi mạng thì báo “Thử lại sau”.', data: 'Chỉ lưu tên lớp và khối, không lưu số điện thoại.'},
        plan: v => [`Mục tiêu: ${v.goal}`, `Nút chính: ${v.action}`, `Trạng thái: ${v.states}`, `Dữ liệu: ${v.data}`]},
    },
    quiz: [
      q('Gói bàn giao chuyển thiết kế sang đâu để dựng thật?', ['Claude Code', 'Máy in', 'Thùng rác'], 0, 'Claude Code dựng thành mã.'),
      q('Ghi chú bàn giao nên nói thêm?', ['Bấm nút thì sao, khi lỗi, khi trống hiện gì', 'Chỉ màu sắc', 'Không cần ghi chú'], 0, 'Thiết kế không tự thể hiện hành vi.'),
      q('Sau khi Claude Code dựng xong nên?', ['So từng màn hình và trạng thái với thiết kế', 'Đăng ngay', 'Xóa thiết kế'], 0, 'Kiểm tra đúng thiết kế.'),
    ],
  },
  25: {
    minutes: '20–25 phút',
    steps: ['Biết mỗi yêu cầu tốn lượt dùng.', 'Viết yêu cầu đủ ý từ đầu.', 'Sửa nhỏ thì tự sửa.', 'Dùng hệ thống thiết kế để khỏi nhắc lại.'],
    guided: {
      outcome: 'Làm thiết kế hiệu quả trong hạn mức sử dụng: ít lượt mà vẫn ra kết quả tốt.',
      analogy: 'Hạn mức giống thẻ xe buýt có số lượt: đi đúng tuyến một lần thì tiết kiệm, lên nhầm xe rồi xuống đổi liên tục thì hết thẻ sớm.',
      walkthrough: [
        {title: 'Hạn mức là gì?', text: ['Claude Design dùng hạn mức theo gói (Free, Pro, Max, Team, Enterprise). Tạo lại cả thiết kế tốn nhiều hơn một chỉnh sửa nhỏ. Khi gần hết, Claude báo trước.'], terms: {'Hạn mức (usage limit)': 'lượng sử dụng tối đa trong một khoảng thời gian'}},
        {title: 'Mẹo tiết kiệm', text: ['Yêu cầu đủ 6 điều ngay từ đầu (bài 2). Sửa chữ, kéo vị trí thì tự sửa trên canvas. Gộp nhiều góp ý vào một tin nhắn.']},
        {title: 'Hệ thống thiết kế giúp đỡ tốn lượt', text: ['Có hệ thống thì không phải lần nào cũng nhắc “màu đỏ rượu, phông này”, và bản đầu thường đúng hơn.']},
      ],
      lab: {type: 'sort', intro: 'Thói quen nào tiết kiệm lượt dùng, thói quen nào lãng phí?', groups: ['Tiết kiệm', 'Lãng phí'],
        items: [
          {text: 'Viết yêu cầu đủ ý, có nội dung thật ngay từ đầu.', group: 'Tiết kiệm', why: 'Bản đầu gần đúng, ít phải sửa.'},
          {text: 'Nhờ tạo lại cả poster chỉ để sửa một lỗi chính tả.', group: 'Lãng phí', why: 'Tự sửa trên canvas nhanh hơn.'},
          {text: 'Gộp 5 góp ý vào một tin nhắn.', group: 'Tiết kiệm', why: 'Một lượt thay vì năm.'},
          {text: 'Gửi từng góp ý nhỏ thành tin nhắn riêng.', group: 'Lãng phí', why: 'Tốn nhiều lượt.'},
          {text: 'Dùng hệ thống thiết kế đã xuất bản.', group: 'Tiết kiệm', why: 'Không phải nhắc lại phong cách.'},
          {text: 'Xin 20 phương án mà không có tiêu chí chọn.', group: 'Lãng phí', why: 'Tốn lượt, khó chọn.'},
        ]},
    },
    quiz: [
      q('Sửa một lỗi chính tả nên?', ['Tự sửa trên canvas', 'Tạo lại cả thiết kế', 'Xin 3 phương án mới'], 0, 'Không tốn lượt.'),
      q('Có 5 góp ý thì?', ['Gộp vào một tin nhắn', 'Gửi 5 tin riêng', 'Bỏ qua'], 0, 'Tiết kiệm lượt.'),
      q('Hệ thống thiết kế giúp tiết kiệm vì?', ['Không phải nhắc lại phong cách mỗi lần', 'Làm thiết kế chậm hơn', 'Không liên quan'], 0, 'Bản đầu đúng hơn.'),
    ],
  },
  26: {
    minutes: '25–35 phút',
    steps: ['Không giả mạo người hay tổ chức.', 'Không tạo thông tin sai sự thật.', 'Minh bạch khi dùng ảnh AI.', 'Tôn trọng người trong ảnh.'],
    guided: {
      outcome: 'Biết việc nào được và không được làm khi thiết kế với AI, để sản phẩm trung thực và không làm hại ai.',
      analogy: 'AI giống chiếc máy photocopy siêu xịn: photo bài của mình thì tốt, photo giấy tờ của người khác để giả mạo thì sai, dù máy làm được.',
      walkthrough: [
        {title: 'Làm được không có nghĩa là nên làm', text: ['Claude Design làm rất nhanh, nhưng trách nhiệm về sản phẩm là của người đăng. Hỏi: sản phẩm này có làm ai hiểu sai hay bị tổn hại không?']},
        {title: 'Những việc không được làm', text: ['Giả mạo thông báo, logo của trường hay tổ chức khác. Ảnh “sự kiện” không có thật. Ghép mặt bạn khác vào ảnh khi chưa được đồng ý. Số liệu bịa.']},
        {title: 'Minh bạch', text: ['Ảnh minh họa AI tạo: ghi “ảnh minh họa do AI tạo”. Không để người xem nghĩ đó là ảnh chụp thật.']},
      ],
      lab: {type: 'sort', intro: 'Việc nào được làm, việc nào không được làm khi thiết kế với AI?', groups: ['Được làm', 'Không được làm'],
        items: [
          {text: 'Ảnh minh họa AI cho poster, có ghi chú “ảnh AI”.', group: 'Được làm', why: 'Minh bạch.'},
          {text: 'Làm giả thông báo nghỉ học có logo trường.', group: 'Không được làm', why: 'Giả mạo, gây hiểu lầm.'},
          {text: 'Ghép mặt bạn cùng lớp vào ảnh chế khi chưa hỏi.', group: 'Không được làm', why: 'Xúc phạm, vi phạm quyền hình ảnh.'},
          {text: 'Poster dùng ảnh thật của sự kiện, các bạn đã đồng ý.', group: 'Được làm', why: 'Thật và có đồng ý.'},
          {text: 'Ghi “được Bộ Giáo dục bảo trợ” khi không có.', group: 'Không được làm', why: 'Thông tin sai sự thật.'},
        ]},
    },
    quiz: [
      q('Ai chịu trách nhiệm về sản phẩm AI làm ra?', ['Người tạo và người đăng', 'Chỉ AI', 'Không ai'], 0, 'Người đăng chịu trách nhiệm.'),
      q('Ảnh minh họa AI nên?', ['Ghi chú “ảnh do AI tạo”', 'Giả làm ảnh chụp', 'Giấu nguồn'], 0, 'Minh bạch.'),
      q('Làm thông báo giả có logo trường là?', ['Giả mạo, không được làm', 'Đùa vui được', 'Sáng tạo'], 0, 'Gây hiểu lầm và có thể vi phạm quy định.'),
    ],
  },
  27: {
    minutes: '20–30 phút',
    steps: ['Biết AI làm nhanh việc gì.', 'Biết việc nào người phải làm.', 'Luyện mắt thẩm mỹ và hiểu người dùng.', 'Xây hồ sơ có quá trình.'],
    guided: {
      outcome: 'Hiểu vai trò người thiết kế khi có AI: AI làm nhanh bản nháp, người quyết định đúng sai, hay dở, có ích cho ai.',
      analogy: 'AI giống chiếc máy khoan điện: khoan nhanh hơn tay rất nhiều, nhưng khoan ở đâu, có nên khoan không là việc của người thợ.',
      walkthrough: [
        {title: 'AI làm tốt', text: ['Tạo nhanh nhiều phương án, dựng bố cục, đổi màu hàng loạt, chuyển thiết kế thành slide, trang web.']},
        {title: 'Người phải làm', text: ['Hiểu người dùng thật, chọn phương án đúng mục tiêu, kiểm tra sự thật và bản quyền, chịu trách nhiệm khi đăng.']},
        {title: 'Hồ sơ năng lực', text: ['Thể hiện quá trình: vấn đề, các phương án, người thử nói gì, em đã quyết định gì và vì sao. Ai cũng có thể bấm nút tạo ảnh, nhưng không phải ai cũng biết vì sao chọn.']},
      ],
      lab: {type: 'sort', intro: 'Việc nào AI làm tốt, việc nào người thiết kế phải làm?', groups: ['AI làm tốt', 'Người phải làm'],
        items: [
          {text: 'Tạo nhanh 3 phương án bố cục.', group: 'AI làm tốt', why: 'Nhanh, nhiều.'},
          {text: 'Quyết định phương án nào hợp người xem.', group: 'Người phải làm', why: 'Cần hiểu người dùng.'},
          {text: 'Đổi màu cho cả bộ ấn phẩm.', group: 'AI làm tốt', why: 'Việc lặp lại.'},
          {text: 'Kiểm tra thông tin có đúng sự thật không.', group: 'Người phải làm', why: 'Trách nhiệm của người đăng.'},
          {text: 'Phỏng vấn người dùng để hiểu nhu cầu.', group: 'Người phải làm', why: 'Cần con người thật.'},
          {text: 'Chuyển thiết kế thành slide.', group: 'AI làm tốt', why: 'Claude Slides làm nhanh.'},
        ]},
    },
    quiz: [
      q('Khi có AI, việc quan trọng của người thiết kế là?', ['Hiểu người dùng và quyết định đúng', 'Bấm nút nhanh hơn', 'Không còn việc gì'], 0, 'Người quyết định.'),
      q('Hồ sơ năng lực tốt thể hiện?', ['Quá trình và lý do quyết định', 'Chỉ ảnh đẹp', 'Số lượng ảnh AI'], 0, 'Lý do mới là năng lực.'),
      q('Việc nào AI làm tốt?', ['Tạo nhanh nhiều phương án', 'Chịu trách nhiệm khi đăng', 'Phỏng vấn người dùng thật'], 0, 'Nhanh và nhiều.'),
    ],
  },
  28: {
    minutes: '2–3 buổi',
    steps: ['Viết bản tóm tắt chiến dịch.', 'Xây hệ thống thiết kế.', 'Làm bộ sản phẩm: poster, landing page, slide.', 'Kiểm tra, thử với người dùng, bàn giao.'],
    guided: {
      outcome: 'Làm trọn một chiến dịch thiết kế từ ý tưởng đến bàn giao, trung thực, đúng thương hiệu, đã thử với người dùng.',
      analogy: 'Giống tổ chức một buổi văn nghệ trọn vẹn: lên ý tưởng, may trang phục cùng màu, tập thử, mời khán giả, rồi tổng kết điều làm tốt và chưa tốt.',
      walkthrough: [
        {title: 'Ghép toàn bộ phần 3', text: ['Yêu cầu (bài 2), phương án (4), dễ đọc (6), hệ thống (8–11), bản quyền (13), nguyên mẫu (15–16), slide (17), landing page (19), biểu đồ (20), chia sẻ (22), xuất (23), bàn giao (24), đạo đức (26).']},
        {title: 'Bản tóm tắt chiến dịch', text: ['Viết bản tóm tắt theo mẫu dưới đây trước khi thiết kế.'], code: 'Chiến dịch: “Tuần lễ Sống xanh” của trường\nMục tiêu: 300 học sinh đăng ký đổi pin, rác tái chế\nNgười xem: học sinh THPT, phụ huynh\nSản phẩm: poster A3, bài đăng vuông, landing page, slide 5 phút\nThành công khi: 5 bạn thử hiểu thông tin trong 5 giây; số đăng ký đạt mục tiêu'},
        {title: 'Báo cáo cuối', text: ['Kể lại: làm gì, người thử nói gì, sửa gì, điều chưa làm được. Trung thực quan trọng hơn hoàn hảo.']},
      ],
      lab: {type: 'plan', intro: 'Duyệt kế hoạch đồ án cuối khóa “Tuần lễ Sống xanh”.', labels: {taskLabel: 'Đồ án cuối khóa', item: 'Việc', approve: 'Chốt kế hoạch', hint: 'Giữ, hỏi lại hoặc bỏ từng việc.', success: '✓ Chiến dịch trọn vẹn, trung thực, đúng thương hiệu.'}, task: 'Chiến dịch Tuần lễ Sống xanh: poster, landing page, slide',
        steps: [
          {text: 'Viết bản tóm tắt chiến dịch có mục tiêu đo được.', ok: ['keep'], why: 'Biết thế nào là thành công.'},
          {text: 'Xây hệ thống thiết kế, áp cho cả bộ sản phẩm.', ok: ['keep'], why: 'Thống nhất nhận diện.'},
          {text: 'Dùng ảnh rừng cháy lấy từ báo, không rõ bản quyền.', ok: ['remove', 'ask'], why: 'Chưa có quyền dùng ảnh.'},
          {text: 'Cho 5 bạn thử landing page, sửa theo góp ý.', ok: ['keep'], why: 'Kiểm chứng với người dùng.'},
          {text: 'Ghi “đã giảm 50% rác thải toàn tỉnh” để gây ấn tượng.', ok: ['remove'], why: 'Số liệu bịa.'},
          {text: 'Kiểm tra tương phản, xuất PDF để in, bàn giao landing page cho Claude Code.', ok: ['keep'], why: 'Hoàn thiện và chuyển giao đúng cách.'},
        ]},
    },
    quiz: [
      q('Bản tóm tắt chiến dịch cần có?', ['Mục tiêu đo được và người xem', 'Chỉ tên chiến dịch', 'Chỉ màu sắc'], 0, 'Biết thế nào là thành công.'),
      q('Báo cáo cuối nên?', ['Kể cả điều chưa làm được', 'Chỉ khoe điểm tốt', 'Bịa thêm số liệu'], 0, 'Trung thực quan trọng hơn hoàn hảo.'),
      q('Ảnh lấy từ báo không rõ bản quyền thì?', ['Không dùng hoặc xin phép trước', 'Dùng luôn', 'Cắt logo báo rồi dùng'], 0, 'Phải có quyền.'),
    ],
  },
};
