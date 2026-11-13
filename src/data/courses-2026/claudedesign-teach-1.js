// Guided Claude Design lessons 1–14 (part 3 of the Claude learning path). Beginner format.
// Facts: Claude Help Center, Claude Academy and Anthropic posts on Claude Design, November 2026.

const q = (text, options, answer, why) => ({q: text, options, answer, why});

const VAGUE = {label: 'Yêu cầu mơ hồ', bg: '#ffffff', fg: '#555', title: 'POSTER', titleSize: 1.1, lines: ['Lorem ipsum dolor sit amet', 'Nội dung ở đây', 'Ngày… Giờ…']};
const CLEAR = {label: 'Yêu cầu rõ ràng', bg: '#fdf6ec', fg: '#3a2a20', accent: '#7b1e3a', title: 'NGÀY HỘI ĐỌC SÁCH', titleSize: 1.15, sub: 'Đổi sách cũ – nhận sách mới', lines: ['8h–11h · Thứ Bảy 29/11', 'Thư viện trường', 'Đăng ký: quét mã QR']};

export const CLAUDEDESIGN_TEACH_1 = {
  1: {
    minutes: '20–30 phút',
    steps: ['Biết Claude Design làm được gì.', 'Mở Claude Design ngay trong cuộc trò chuyện.', 'Biết các phần của màn hình.', 'Biết việc nào hợp, việc nào không.'],
    guided: {
      outcome: 'Hiểu Claude Design dùng để làm gì và tạo được bản thiết kế đầu tiên bằng cách mô tả.',
      analogy: 'Claude Design giống một bạn họa sĩ ngồi cạnh: em tả “anh vẽ cho em tấm poster thế này”, bạn ấy vẽ ngay bản phác, rồi em chỉ chỗ nào sửa.',
      walkthrough: [
        {title: 'Claude Design là gì?', text: ['Claude Design (ra mắt 4/2026) tạo sản phẩm hình ảnh bằng cách mô tả: poster, one-pager, trang web, giao diện ứng dụng, nguyên mẫu bấm thử, slide.', 'Từ cuối 2026, em yêu cầu thiết kế ngay trong cuộc trò chuyện với Claude (cả trong Claude Code và tab Artifacts), trên mọi gói kể cả gói miễn phí.'], terms: {'Thiết kế (design)': 'sản phẩm hình ảnh: poster, trang web, giao diện…', 'Artifact': 'sản phẩm Claude tạo, xem và chia sẻ được'}},
        {title: 'Màn hình Claude Design', text: ['Bên trái: khung trò chuyện để nhắn yêu cầu. Bên phải: khung vẽ (canvas) có bản thiết kế. Trên cùng: hệ thống thiết kế đang dùng, nút Chia sẻ, Xuất.'], design: {highlight: 'canvas', caption: 'Khung vẽ (canvas) hiện bản thiết kế; khung trò chuyện bên trái.'}},
        {title: 'Bắt đầu thế nào?', text: ['Trong cuộc trò chuyện, gõ: “Thiết kế poster khổ A4 cho Ngày hội đọc sách…”. Claude tạo bản đầu, em sửa dần.'], tip: 'Đưa nội dung thật (ngày, giờ, địa điểm) ngay từ đầu để không phải sửa chữ giả.'},
      ],
      lab: {type: 'sort', intro: 'Việc nào hợp với Claude Design, việc nào không?', groups: ['Hợp với Claude Design', 'Không hợp / không nên'],
        items: [
          {text: 'Poster tuyển thành viên CLB.', group: 'Hợp với Claude Design', why: 'Sản phẩm hình ảnh, đúng việc.'},
          {text: 'Nguyên mẫu ứng dụng đặt phòng tự học để bấm thử.', group: 'Hợp với Claude Design', why: 'Claude Design làm nguyên mẫu tương tác.'},
          {text: 'Làm giả thông báo của nhà trường có logo y hệt.', group: 'Không hợp / không nên', why: 'Giả mạo tổ chức là sai.'},
          {text: 'Trang giới thiệu (landing page) cho dự án khởi nghiệp.', group: 'Hợp với Claude Design', why: 'Trang web là việc hợp.'},
          {text: 'Bài văn giáo viên yêu cầu tự viết tay.', group: 'Không hợp / không nên', why: 'Không phải thiết kế, và là bài em phải tự làm.'},
          {text: 'Bộ slide thuyết trình dự án.', group: 'Hợp với Claude Design', why: 'Slide làm được (có cả Claude Slides).'},
        ]},
    },
    quiz: [
      q('Claude Design tạo được gì?', ['Poster, trang web, nguyên mẫu, slide', 'Chỉ văn bản thuần', 'Chỉ bảng tính'], 0, 'Sản phẩm hình ảnh đủ loại.'),
      q('Dùng Claude Design ở đâu?', ['Ngay trong cuộc trò chuyện với Claude', 'Chỉ trên máy in', 'Không dùng được'], 0, 'Đã có trong cuộc trò chuyện, Claude Code, tab Artifacts.'),
      q('Để bản đầu tốt hơn, nên đưa?', ['Nội dung thật: ngày, giờ, địa điểm', 'Chữ giả lorem ipsum', 'Không cần gì'], 0, 'Nội dung thật từ đầu.'),
    ],
  },
  2: {
    minutes: '25–35 phút',
    steps: ['Nói sản phẩm, người xem, mục đích.', 'Đưa nội dung thật.', 'Nói phong cách, kích thước.', 'Nói điều cần tránh.'],
    guided: {
      outcome: 'Viết yêu cầu thiết kế để bản đầu tiên đã gần đúng ý, có nội dung thật, đúng kích thước.',
      analogy: 'Yêu cầu thiết kế giống đặt bánh sinh nhật: nói rõ bánh cho ai, mấy người ăn, chữ gì trên bánh, màu gì. Chỉ nói “làm cái bánh đẹp” thì thợ đoán đủ thứ.',
      walkthrough: [
        {title: 'Mơ hồ và rõ ràng khác nhau thế nào?', text: ['Bên trái: “làm poster đẹp” → chữ giả, thiếu thông tin. Bên phải: có tên sự kiện, thời gian, địa điểm, cách đăng ký.'], posters: [VAGUE, CLEAR]},
        {title: '6 điều nên có trong yêu cầu', text: ['1) Sản phẩm gì (poster, trang web). 2) Ai xem. 3) Mục đích: người xem cần làm gì. 4) Nội dung thật. 5) Phong cách, màu, kích thước. 6) Điều cần tránh.']},
        {title: 'Ví dụ yêu cầu tốt', text: ['Đọc yêu cầu mẫu có đủ 6 điều dưới đây.'], code: '“Thiết kế poster A4 dọc cho Ngày hội đọc sách, người xem là học sinh THPT. Mục đích: đăng ký tham gia. Nội dung: 8h–11h thứ Bảy 29/11, thư viện trường, quét mã QR để đăng ký. Phong cách ấm áp, màu kem và đỏ rượu. Tránh hình hoạt hình trẻ con.”'},
      ],
      lab: {type: 'brief', intro: 'Viết yêu cầu thiết kế poster tuyển thành viên cho CLB Tiếng Anh.', sendLabel: '🎨 Gửi yêu cầu (mô phỏng)', exampleLabel: 'Xem yêu cầu mẫu', resultTitle: 'Claude: “Tôi sẽ thiết kế theo các điểm sau:”', doneText: '✓ Yêu cầu đủ rõ để bản đầu gần đúng ý.',
        fields: [
          {key: 'what', label: '1. Sản phẩm, kích thước', placeholder: 'Ví dụ: poster A4 dọc', minLen: 6, any: ['poster', 'a4', 'trang', 'bài đăng', 'banner', 'slide', 'vuông'], ask: 'Em cần sản phẩm gì, kích thước nào?'},
          {key: 'who', label: '2. Ai xem, để làm gì', placeholder: 'Ví dụ: học sinh khối 10, để đăng ký tham gia', minLen: 12, any: ['học sinh', 'bạn', 'người', 'phụ huynh', 'để'], ask: 'Ai sẽ xem, và em muốn họ làm gì sau khi xem?'},
          {key: 'content', label: '3. Nội dung thật', placeholder: 'Ví dụ: sinh hoạt 15h thứ Tư, phòng 204, hạn đăng ký 25/11', minLen: 15, any: ['h', 'thứ', 'ngày', 'phòng', 'hạn', '/'], ask: 'Nội dung thật là gì: thời gian, địa điểm, hạn đăng ký?'},
          {key: 'style', label: '4. Phong cách và điều cần tránh', placeholder: 'Ví dụ: trẻ trung, xanh dương; tránh quá nhiều chữ', minLen: 10, any: ['tránh', 'không', 'màu', 'phong cách', 'trẻ', 'ấm'], ask: 'Em muốn phong cách thế nào, có gì cần tránh?'},
        ],
        example: {what: 'Bài đăng vuông cho mạng xã hội của trường.', who: 'Học sinh khối 11, để đăng ký giải bóng đá.', content: 'Giải bóng đá khối 11, đăng ký trước 20/11, thi đấu chiều thứ Bảy tại sân trường.', style: 'Năng động, màu xanh lá; tránh dùng ảnh cầu thủ nổi tiếng.'},
        plan: v => [`Sản phẩm: ${v.what}`, `Người xem: ${v.who}`, `Nội dung: ${v.content}`, `Phong cách: ${v.style}`]},
    },
    quiz: [
      q('Yêu cầu nào giúp bản thiết kế đầu tiên tốt nhất?', ['“Làm poster đẹp”', '“Poster A4 cho học sinh THPT, Ngày hội đọc sách 8h–11h 29/11 ở thư viện, màu kem–đỏ rượu”', '“Gì cũng được”'], 1, 'Đủ sản phẩm, người xem, nội dung, phong cách.'),
      q('Vì sao nên đưa nội dung thật ngay từ đầu?', ['Tránh chữ giả bị in nhầm và đỡ sửa', 'Cho dài', 'Không cần'], 0, 'Chữ giả dễ bị quên sửa.'),
      q('“Tránh hình hoạt hình trẻ con” thuộc phần nào?', ['Điều cần tránh', 'Kích thước', 'Người xem'], 0, 'Nói rõ giới hạn phong cách.'),
    ],
  },
  3: {
    minutes: '25–35 phút',
    steps: ['Sửa trực tiếp trên canvas cho thay đổi nhỏ.', 'Bình luận vào phần tử cho góp ý cụ thể.', 'Nhắn yêu cầu khi đổi cả thiết kế.', 'Dùng thanh trượt Claude tạo.'],
    guided: {
      outcome: 'Chọn đúng cách chỉnh sửa cho từng loại thay đổi để sửa nhanh mà không tốn lượt dùng.',
      analogy: 'Sửa thiết kế giống sửa nhà: thay bóng đèn thì tự làm (sửa trực tiếp), muốn thợ sơn lại một bức tường thì chỉ vào tường đó (bình luận), muốn đổi màu cả nhà thì dặn thợ một lần (nhắn yêu cầu).',
      walkthrough: [
        {title: 'Sửa trực tiếp trên canvas', text: ['Kéo, đổi kích thước, căn chỉnh, sửa chữ ngay trên bản thiết kế. Nhanh nhất cho thay đổi nhỏ.'], design: {highlight: 'edit', caption: 'Nút “✋ Sửa trực tiếp”: kéo, đổi cỡ, sửa chữ.'}},
        {title: 'Bình luận vào một phần tử', text: ['Bấm vào nút, tiêu đề hay ảnh và viết góp ý: “nút này to hơn, màu đỏ rượu”. Claude sửa đúng phần đó.'], design: {highlight: 'comment', caption: 'Nút “💬 Bình luận”: góp ý cho đúng một phần tử.'}},
        {title: 'Nhắn yêu cầu và thanh trượt', text: ['Đổi cả thiết kế (“áp màu mới cho cả 3 phương án”) thì nhắn trong khung trò chuyện. Claude có thể tạo thanh trượt tùy chỉnh (ví dụ độ đậm màu, khoảng cách) để em kéo thử.'], design: {highlight: 'sliders', caption: 'Nút “🎚 Thanh trượt”: chỉnh thử bằng cách kéo.'}, tip: 'Tạo lại cả bản chỉ để đổi một chi tiết vừa tốn lượt, vừa mất các chỉnh sửa tốt trước đó.'},
      ],
      lab: {type: 'sort', intro: 'Với mỗi thay đổi, cách chỉnh nào phù hợp nhất?', groups: ['Sửa trực tiếp trên canvas', 'Bình luận vào phần tử', 'Nhắn yêu cầu cho cả thiết kế'],
        items: [
          {text: 'Sửa lỗi chính tả trong tiêu đề.', group: 'Sửa trực tiếp trên canvas', why: 'Thay đổi nhỏ, tự sửa nhanh nhất.'},
          {text: 'Nút “Đăng ký” cần nổi bật hơn.', group: 'Bình luận vào phần tử', why: 'Góp ý cho đúng một phần tử.'},
          {text: 'Đổi tông màu cho cả 3 phương án.', group: 'Nhắn yêu cầu cho cả thiết kế', why: 'Thay đổi trên toàn bộ.'},
          {text: 'Kéo logo sang góc phải.', group: 'Sửa trực tiếp trên canvas', why: 'Kéo thả là xong.'},
          {text: 'Ảnh minh họa chưa hợp chủ đề, cần ảnh khác.', group: 'Bình luận vào phần tử', why: 'Góp ý cho riêng ảnh đó.'},
          {text: 'Chuyển cả bản sang phong cách tối giản hơn.', group: 'Nhắn yêu cầu cho cả thiết kế', why: 'Ảnh hưởng toàn bộ thiết kế.'},
        ]},
    },
    quiz: [
      q('Sửa lỗi chính tả trên poster nhanh nhất là?', ['Sửa trực tiếp trên canvas', 'Nhờ Claude tạo lại cả bản', 'Xuất ra rồi sửa'], 0, 'Thay đổi nhỏ thì tự sửa.'),
      q('Muốn đổi màu cho cả thiết kế nên?', ['Nhắn yêu cầu trong khung trò chuyện', 'Sửa từng chữ', 'Bỏ thiết kế'], 0, 'Thay đổi toàn bộ thì dặn một lần.'),
      q('Bình luận vào phần tử dùng khi?', ['Góp ý cho đúng một phần (nút, ảnh, tiêu đề)', 'Muốn xóa cả bản', 'Muốn xuất PDF'], 0, 'Claude sửa đúng chỗ.'),
    ],
  },
  4: {
    minutes: '30–40 phút',
    steps: ['Yêu cầu 3 phương án khác biệt rõ.', 'Đặt tiêu chí chọn trước.', 'Hỏi ý kiến người xem thật.', 'Chọn một hướng rồi mới tinh chỉnh.'],
    guided: {
      outcome: 'Tạo nhiều phương án thiết kế rồi chọn đúng phương án bằng tiêu chí, không phải bằng cảm giác.',
      analogy: 'Giống thử áo trước khi mua: thử 3 kiểu khác nhau, hỏi bạn bè, rồi chọn cái hợp dịp nhất, chứ không mua cái đầu tiên.',
      walkthrough: [
        {title: 'Xin 3 phương án khác biệt', text: ['“Tạo 3 phương án khác nhau rõ: một trang trọng, một vui nhộn, một tối giản.” Ba bản na ná nhau thì không có gì để chọn.'], posters: [{label: 'Phương án A – trang trọng', bg: '#1f2a44', fg: '#f4ece6', accent: '#e8c27a', title: 'THƯ MỜI', sub: 'Lễ tổng kết năm học', lines: ['16h · 25/5 · Hội trường']}, {label: 'Phương án B – vui nhộn', bg: '#ffe066', fg: '#3a2a20', accent: '#d6336c', title: 'TỔNG KẾT RỒI!', sub: 'Cùng nhìn lại một năm', lines: ['16h · 25/5 · Hội trường']}, {label: 'Phương án C – tối giản', bg: '#ffffff', fg: '#222', title: 'Lễ tổng kết', sub: '25/5 · 16h', lines: ['Hội trường']}]},
        {title: 'Tiêu chí trước, chọn sau', text: ['Đặt 3–4 tiêu chí: hợp dịp, đọc được thông tin trong 3 giây, đúng nhận diện, người xem thích. Chấm từng phương án.']},
        {title: 'Hỏi người xem thật', text: ['Cho 5 bạn xem 3 giây, hỏi họ nhớ thông tin gì. Phương án được nhớ đúng nhiều nhất thường là phương án tốt.']},
      ],
      lab: {type: 'sort', intro: 'Khi khám phá nhiều phương án, điều nào nên làm, điều nào nên tránh?', groups: ['Nên làm', 'Nên tránh'],
        items: [
          {text: 'Yêu cầu 3 phương án khác biệt rõ về phong cách.', group: 'Nên làm', why: 'Có lựa chọn thật sự.'},
          {text: 'Tạo 20 phương án rồi chọn theo cảm giác.', group: 'Nên tránh', why: 'Nhiều mà không có tiêu chí thì khó quyết.'},
          {text: 'Chấm các phương án theo cùng tiêu chí.', group: 'Nên làm', why: 'Chọn công bằng.'},
          {text: 'Hỏi 5 người xem thật họ nhớ thông tin gì.', group: 'Nên làm', why: 'Người xem mới cho biết thông điệp có rõ không.'},
          {text: 'Tinh chỉnh cả 3 phương án cùng lúc đến từng chi tiết.', group: 'Nên tránh', why: 'Chọn một hướng trước rồi mới tinh chỉnh.'},
        ]},
    },
    quiz: [
      q('Ba phương án nên?', ['Khác biệt rõ', 'Gần giống nhau', 'Chỉ khác màu chữ'], 0, 'Có khác biệt mới có lựa chọn.'),
      q('Chọn phương án bằng?', ['Tiêu chí và ý kiến người xem', 'Cảm giác', 'Bản đầu tiên'], 0, 'Có căn cứ.'),
      q('Khi nào tinh chỉnh chi tiết?', ['Sau khi đã chọn một hướng', 'Ngay từ đầu cho mọi phương án', 'Không bao giờ'], 0, 'Đỡ tốn công cho hướng bị bỏ.'),
    ],
  },
  5: {
    minutes: '25–35 phút',
    steps: ['Đưa tệp có sẵn: Word, PowerPoint, Excel, ảnh.', 'Nói rõ muốn biến thành sản phẩm gì.', 'Đối chiếu số liệu với tài liệu gốc.', 'Chỉ đưa tài liệu em có quyền dùng.'],
    guided: {
      outcome: 'Biến tài liệu có sẵn (báo cáo Word, bảng Excel, ảnh) thành sản phẩm thiết kế như one-pager, mà số liệu vẫn đúng.',
      analogy: 'Giống nhờ thợ làm khung ảnh từ ảnh em đưa: thợ làm đẹp, nhưng ảnh phải là ảnh của em và không được bị cắt mất phần quan trọng.',
      walkthrough: [
        {title: 'Đưa tài liệu vào', text: ['Claude Design nhận văn bản, ảnh, ảnh chụp màn hình, tệp DOCX, PPTX, XLSX và cả mã nguồn. Bấm ＋ để đính kèm.'], screen: {highlight: 'plus', caption: 'Nút “＋” để đính kèm tài liệu.'}},
        {title: 'Nói rõ đích đến', text: ['“Từ báo cáo này, làm one-pager A4 gửi phụ huynh: 3 con số chính, 1 biểu đồ, lời cảm ơn.”'], terms: {'One-pager': 'tờ tóm tắt một trang'}},
        {title: 'Rút gọn dễ mất ngữ cảnh', text: ['Rút 6 trang thành 1 trang có thể làm sai ý số liệu (ví dụ bỏ mất “dự kiến”). Đối chiếu từng con số với tài liệu gốc.'], tip: 'Không đưa tài liệu có dữ liệu cá nhân hoặc tài liệu em không có quyền dùng.'},
      ],
      lab: {type: 'sort', intro: 'Tài liệu nào nên đưa vào Claude Design để làm one-pager gửi phụ huynh?', groups: ['Được đưa vào', 'Không nên đưa vào'],
        items: [
          {text: 'Báo cáo kết quả phong trào của lớp (không có tên, số điện thoại).', group: 'Được đưa vào', why: 'Đúng nội dung, không có dữ liệu cá nhân.'},
          {text: 'Bảng điểm có họ tên và số điện thoại phụ huynh.', group: 'Không nên đưa vào', why: 'Dữ liệu cá nhân.'},
          {text: 'Ảnh hoạt động lớp đã được các bạn đồng ý.', group: 'Được đưa vào', why: 'Có sự đồng ý.'},
          {text: 'Logo của một công ty lạ tải trên mạng.', group: 'Không nên đưa vào', why: 'Không có quyền sử dụng.'},
          {text: 'Bộ nhận diện của trường (đã được phép dùng).', group: 'Được đưa vào', why: 'Đúng thương hiệu, được phép.'},
        ]},
    },
    quiz: [
      q('Claude Design nhận được loại tệp nào?', ['DOCX, PPTX, XLSX, ảnh, mã nguồn', 'Chỉ ảnh', 'Không nhận tệp'], 0, 'Nhiều loại tệp.'),
      q('Rút báo cáo 6 trang thành 1 trang cần?', ['Đối chiếu từng con số với bản gốc', 'Tin ngay', 'Bỏ số liệu'], 0, 'Rút gọn dễ làm sai ý.'),
      q('Tài liệu có số điện thoại phụ huynh thì?', ['Không đưa vào', 'Đưa vào bình thường', 'Đưa nhưng chữ nhỏ'], 0, 'Dữ liệu cá nhân.'),
    ],
  },
  6: {
    minutes: '25–35 phút',
    steps: ['Đủ tương phản giữa chữ và nền.', 'Cỡ chữ đủ lớn.', 'Không chỉ dùng màu để truyền thông tin.', 'Xem thử trên điện thoại.'],
    guided: {
      outcome: 'Làm thiết kế ai cũng đọc được: đủ tương phản, chữ đủ to, xem tốt trên điện thoại.',
      analogy: 'Chữ vàng nhạt trên nền trắng giống nói thì thầm giữa sân trường: có nói nhưng không ai nghe được.',
      walkthrough: [
        {title: 'Tương phản chữ và nền', text: ['Chữ phải nổi rõ trên nền. Bên trái khó đọc (vàng nhạt trên trắng), bên phải dễ đọc (đỏ rượu đậm trên kem).'], posters: [{label: 'Chưa tốt – tương phản thấp', bg: '#ffffff', fg: '#f3e3a0', accent: '#f5e6a3', title: 'NGÀY HỘI', sub: 'Thứ Bảy 29/11', lines: ['Thư viện trường']}, {label: 'Tốt – tương phản cao', bg: '#fdf6ec', fg: '#3a2a20', accent: '#7b1e3a', title: 'NGÀY HỘI', sub: 'Thứ Bảy 29/11', lines: ['Thư viện trường']}], terms: {'Tương phản': 'độ khác biệt sáng–tối giữa chữ và nền; chữ thường nên đạt tỉ lệ khoảng 4,5:1'}},
        {title: 'Chữ to, ít chữ', text: ['Poster đọc từ xa: tiêu đề thật to, chỉ giữ thông tin chính. Nhồi chữ nhỏ kín trang thì không ai đọc.'], posters: [{label: 'Chưa tốt – nhồi chữ', bg: '#ffffff', fg: '#333', title: 'Ngày hội đọc sách năm 2026 của trường THPT', titleSize: 0.85, crowded: true, lines: ['Thời gian: 8h–11h thứ Bảy ngày 29 tháng 11 năm 2026', 'Địa điểm: thư viện trường tầng 2 dãy B', 'Nội dung: đổi sách, gặp tác giả, trò chơi, quà tặng, chụp ảnh, ăn nhẹ, văn nghệ, giao lưu…']}, CLEAR]},
        {title: 'Đừng chỉ dùng màu', text: ['Người khó phân biệt màu sẽ không thấy “ô màu đỏ là hết chỗ”. Thêm chữ hoặc biểu tượng: “Hết chỗ ✗”. Nhờ Claude: “kiểm tra độ tương phản và hiển thị trên điện thoại”.']},
      ],
      lab: {type: 'sort', intro: 'Cặp chữ/nền hoặc cách trình bày nào dễ đọc, cái nào phải sửa?', groups: ['Dễ đọc', 'Khó đọc – phải sửa'],
        items: [
          {text: 'Chữ đen trên nền trắng.', group: 'Dễ đọc', why: 'Tương phản rất cao.'},
          {text: 'Chữ vàng nhạt trên nền trắng.', group: 'Khó đọc – phải sửa', why: 'Tương phản quá thấp.'},
          {text: 'Chữ trắng trên nền xanh đậm.', group: 'Dễ đọc', why: 'Tương phản cao.'},
          {text: 'Chữ xám nhạt cỡ 8 cho thông tin quan trọng.', group: 'Khó đọc – phải sửa', why: 'Vừa nhạt vừa nhỏ.'},
          {text: 'Chỉ dùng màu đỏ/xanh để báo hết chỗ/còn chỗ, không có chữ.', group: 'Khó đọc – phải sửa', why: 'Người khó phân biệt màu không hiểu.'},
          {text: 'Tiêu đề to, 3 dòng thông tin chính.', group: 'Dễ đọc', why: 'Đọc được từ xa.'},
        ]},
    },
    quiz: [
      q('Chữ vàng nhạt trên nền trắng?', ['Khó đọc vì tương phản thấp', 'Rất dễ đọc', 'Bắt buộc dùng'], 0, 'Cần tương phản cao.'),
      q('Chỉ dùng màu để báo trạng thái thì?', ['Người khó phân biệt màu không hiểu', 'Luôn tốt', 'Không ảnh hưởng'], 0, 'Thêm chữ hoặc biểu tượng.'),
      q('Kiểm tra thiết kế trên đâu trước khi chia sẻ?', ['Cả máy tính và điện thoại', 'Chỉ máy người làm', 'Không cần'], 0, 'Nhiều người xem trên điện thoại.'),
    ],
  },
  7: {
    minutes: '1–2 buổi',
    steps: ['Viết yêu cầu có nội dung thật.', 'Tạo 3 phương án, chọn theo tiêu chí.', 'Chỉnh sửa có chủ đích.', 'Kiểm tra dễ đọc và thông tin.'],
    guided: {
      outcome: 'Làm trọn bộ ấn phẩm cho một sự kiện (poster, bài đăng, trang đăng ký) với Claude Design, đúng thông tin và dễ đọc.',
      analogy: 'Giống chuẩn bị trang phục cho cả đội văn nghệ: mỗi người một bộ nhưng cùng một màu, cùng một phong cách.',
      walkthrough: [
        {title: 'Ghép kỹ năng bài 1–6', text: ['Yêu cầu rõ (bài 2), sửa đúng cách (bài 3), nhiều phương án (bài 4), tài liệu có sẵn (bài 5), dễ đọc (bài 6).']},
        {title: 'Một phong cách cho cả bộ', text: ['Sau khi chọn phương án poster, nhắn: “Dùng đúng phong cách này làm thêm bài đăng vuông và trang đăng ký.”']},
        {title: 'Người duyệt cuối là em', text: ['Sai ngày giờ trên poster là lỗi của người duyệt, không phải của AI. Đọc lại từng thông tin trước khi in, đăng.']},
      ],
      lab: {type: 'plan', intro: 'Nhóm lên kế hoạch làm bộ ấn phẩm Ngày hội Khoa học với Claude Design. Duyệt từng việc.', labels: {taskLabel: 'Bộ ấn phẩm', item: 'Việc', approve: 'Chốt kế hoạch', hint: 'Giữ, hỏi lại hoặc bỏ từng việc.', success: '✓ Kế hoạch đúng thông tin, dễ đọc, trung thực.'}, task: 'Ngày hội Khoa học cho 600 học sinh',
        steps: [
          {text: 'Đưa nội dung thật (ngày, giờ, địa điểm, cách đăng ký) vào yêu cầu.', ok: ['keep'], why: 'Tránh chữ giả và sai thông tin.'},
          {text: 'Tạo 3 phương án, chấm theo tiêu chí, hỏi 5 bạn.', ok: ['keep'], why: 'Chọn có căn cứ.'},
          {text: 'Thêm dòng “có 2.000 người tham gia năm ngoái” cho hoành tráng (chưa có số liệu).', ok: ['remove'], why: 'Không đưa số liệu không có thật.'},
          {text: 'Kiểm tra tương phản và xem trên điện thoại.', ok: ['keep'], why: 'Ai cũng đọc được.'},
          {text: 'Dùng logo của một hãng công nghệ nổi tiếng làm “nhà tài trợ”.', ok: ['remove', 'ask'], why: 'Không có quyền và không phải sự thật.'},
        ]},
    },
    quiz: [
      q('Sai ngày giờ trên poster là trách nhiệm của?', ['Người duyệt', 'Chỉ AI', 'Máy in'], 0, 'Người duyệt kiểm tra cuối cùng.'),
      q('Làm bài đăng và trang đăng ký cùng phong cách poster bằng cách?', ['Nhắn Claude dùng đúng phong cách đã chọn', 'Làm mỗi cái một kiểu', 'Chụp màn hình poster'], 0, 'Giữ bộ ấn phẩm thống nhất.'),
      q('Thêm số liệu chưa có thật cho hoành tráng là?', ['Không trung thực', 'Sáng tạo', 'Bắt buộc'], 0, 'Chỉ đưa thông tin thật.'),
    ],
  },
  8: {
    minutes: '25–30 phút',
    steps: ['Biết hệ thống thiết kế gồm gì.', 'Phân biệt màu, kiểu chữ, thành phần, bố cục.', 'Hiểu vì sao cần thống nhất.', 'Biết hệ thống không làm mọi thứ giống hệt.'],
    guided: {
      outcome: 'Hiểu hệ thống thiết kế là gì và vì sao nó giúp mọi ấn phẩm của trường, CLB trông “cùng một nhà”.',
      analogy: 'Hệ thống thiết kế giống đồng phục trường: mỗi bạn một khuôn mặt, một kiểu tóc, nhưng nhìn áo là biết cùng trường.',
      walkthrough: [
        {title: 'Hệ thống thiết kế gồm gì?', text: ['Màu sắc, kiểu chữ, thành phần (nút, thẻ, biểu mẫu), quy tắc bố cục (lề, khoảng cách, lưới). Claude áp hệ thống này cho mọi thiết kế và slide mới.'], terms: {'Hệ thống thiết kế (design system)': 'bộ quy tắc màu, chữ, thành phần, bố cục dùng chung', 'Thành phần (component)': 'phần tử dùng lại nhiều lần: nút, thẻ, ô nhập'}},
        {title: 'Có và không có hệ thống', text: ['Không có: mỗi lớp làm poster một kiểu. Có: màu, chữ, logo thống nhất dù nội dung khác nhau.'], posters: [{label: 'Không có hệ thống – mỗi bản một kiểu', bg: '#e8f4ff', fg: '#0b3d91', accent: '#ff5722', title: 'Hội trại', lines: ['Font Comic, màu cam']}, {label: 'Có hệ thống – cùng một nhà', bg: '#fdf6ec', fg: '#3a2a20', accent: '#7b1e3a', title: 'HỘI TRẠI', sub: 'Đoàn trường', lines: ['Màu đỏ rượu – kem, cùng phông']}]},
        {title: 'Không phải khuôn đúc', text: ['Hệ thống là quy tắc chung, không bắt mọi thứ giống hệt. Poster văn nghệ và poster thể thao vẫn khác nhau nhưng cùng nhận diện.']},
      ],
      lab: {type: 'sort', intro: 'Mỗi mục dưới đây thuộc phần nào của hệ thống thiết kế?', groups: ['Màu sắc', 'Kiểu chữ', 'Thành phần', 'Quy tắc bố cục'],
        items: [
          {text: 'Đỏ rượu #7B1E3A là màu chủ đạo.', group: 'Màu sắc', why: 'Mã màu thương hiệu.'},
          {text: 'Tiêu đề dùng phông Be Vietnam Pro đậm.', group: 'Kiểu chữ', why: 'Quy định phông chữ.'},
          {text: 'Nút “Đăng ký” bo góc, nền đỏ rượu, chữ trắng.', group: 'Thành phần', why: 'Phần tử dùng lại.'},
          {text: 'Lề trang 16px, khoảng cách giữa các khối 24px.', group: 'Quy tắc bố cục', why: 'Quy định khoảng cách.'},
          {text: 'Thẻ sự kiện gồm ảnh, tiêu đề, ngày giờ.', group: 'Thành phần', why: 'Khối dùng lại cho mọi sự kiện.'},
          {text: 'Màu phụ: kem #FDF6EC cho nền.', group: 'Màu sắc', why: 'Mã màu phụ.'},
        ]},
    },
    quiz: [
      q('Hệ thống thiết kế giúp gì?', ['Mọi ấn phẩm thống nhất nhận diện', 'Làm mọi thứ giống hệt', 'Thay người duyệt'], 0, 'Cùng một nhà.'),
      q('Nút bấm dùng lại nhiều lần là?', ['Thành phần (component)', 'Màu sắc', 'Bố cục'], 0, 'Phần tử dùng lại.'),
      q('Có hệ thống thiết kế thì poster văn nghệ và thể thao?', ['Vẫn khác nhau nhưng cùng nhận diện', 'Phải giống hệt', 'Không làm được'], 0, 'Quy tắc chung, nội dung riêng.'),
    ],
  },
  9: {
    minutes: '30–40 phút',
    steps: ['Thu thập nguồn: bộ nhận diện PDF, slide, ảnh giao diện, kho GitHub.', 'Đưa vào Claude Design để tạo hệ thống.', 'Đối chiếu mã màu, phông với bản gốc.', 'Sửa chỗ sai rồi lưu.'],
    guided: {
      outcome: 'Tạo hệ thống thiết kế từ tài liệu thương hiệu có sẵn và kiểm tra Claude đọc đúng màu, phông.',
      analogy: 'Giống nhờ người chép lại công thức món ăn từ cuốn sổ của bà: chép nhanh, nhưng phải dò lại từng lượng gia vị.',
      walkthrough: [
        {title: 'Nguồn để tạo hệ thống', text: ['Kho GitHub có mã giao diện, tệp thiết kế, slide hay PDF mang thương hiệu, ảnh chụp giao diện. Nhà phát triển có thể chạy /design-sync trong Claude Code để đọc màu, component React trực tiếp.'], terms: {'/design-sync': 'lệnh trong Claude Code đọc hệ thống thiết kế từ mã nguồn'}},
        {title: 'Kiểm tra kết quả', text: ['Claude đọc màu từ ảnh có thể lệch (ví dụ #7B1E3A thành #7A2040). So từng mã màu, tên phông với tài liệu gốc.'], design: {highlight: 'system', caption: 'Hệ thống thiết kế đang dùng hiện ở trên cùng.'}},
        {title: 'Sửa và lưu', text: ['Sửa chỗ sai, rồi thử tạo một poster mẫu để xem hệ thống áp đúng chưa.']},
      ],
      lab: {type: 'order', intro: 'Sắp xếp các bước tạo hệ thống thiết kế từ bộ nhận diện PDF của trường.', items: ['Thu thập bộ nhận diện PDF và ảnh logo đã được phép dùng', 'Đưa tài liệu vào Claude Design để tạo hệ thống', 'Đối chiếu mã màu và phông với tài liệu gốc', 'Sửa các chỗ Claude đọc sai', 'Tạo thử một poster để kiểm tra'], explain: 'Có nguồn đúng → tạo → kiểm tra → sửa → thử.'},
    },
    quiz: [
      q('Lệnh nào trong Claude Code đọc hệ thống thiết kế từ mã nguồn?', ['/design-sync', '/delete', '/print'], 0, 'Đọc token và component.'),
      q('Claude đọc mã màu từ ảnh có thể?', ['Lệch so với mã gốc', 'Luôn chính xác', 'Không đọc được gì'], 0, 'Phải đối chiếu.'),
      q('Sau khi tạo hệ thống, nên?', ['Thử làm một poster để kiểm tra', 'Xóa tài liệu gốc', 'Không làm gì'], 0, 'Thử để thấy áp đúng chưa.'),
    ],
  },
  10: {
    minutes: '25–35 phút',
    steps: ['Lập checklist thương hiệu.', 'Kiểm tra màu, phông, logo, khoảng cách.', 'Ghi lỗi cụ thể.', 'Yêu cầu sửa từng lỗi.'],
    guided: {
      outcome: 'Kiểm tra một thiết kế có đúng thương hiệu không bằng checklist, và yêu cầu sửa đúng chỗ.',
      analogy: 'Giống kiểm tra đồng phục đầu giờ: áo đúng màu chưa, có phù hiệu chưa, đeo đúng chỗ chưa.',
      walkthrough: [
        {title: 'Claude tự kiểm tra, em kiểm tra lại', text: ['Claude dựng thiết kế bằng thành phần của hệ thống và tự soát trước khi đưa em. Nhưng em vẫn là lớp kiểm tra cuối.']},
        {title: 'Lỗi thương hiệu hay gặp', text: ['Logo bị kéo méo, dùng phông ngoài bộ nhận diện, màu gần giống nhưng sai mã, logo đặt sát mép.'], posters: [{label: 'Chưa đúng – logo méo, sai phông', bg: '#fdf6ec', fg: '#3a2a20', accent: '#a83a5a', title: 'CLB SÁCH', sub: '(logo bị kéo dẹt)', lines: ['Phông chữ nghệ thuật lạ']}, {label: 'Đúng thương hiệu', bg: '#fdf6ec', fg: '#3a2a20', accent: '#7b1e3a', title: 'CLB SÁCH', sub: 'Logo đúng tỉ lệ', lines: ['Phông và màu theo bộ nhận diện']}]},
        {title: 'Checklist mẫu', text: ['Đánh dấu từng mục khi kiểm tra một thiết kế.'], code: '☐ Màu đúng mã (#7B1E3A, #FDF6EC)\n☐ Chỉ dùng 2 phông trong bộ nhận diện\n☐ Logo đúng tỉ lệ, cách mép ≥ 16px\n☐ Nút dùng đúng thành phần chuẩn\n☐ Không thêm hiệu ứng ngoài quy định'},
      ],
      lab: {type: 'sort', intro: 'Kiểm tra one-pager mới theo bộ nhận diện CLB Sách. Mục nào đúng, mục nào phải sửa?', groups: ['Đúng thương hiệu', 'Sai – phải sửa'],
        items: [
          {text: 'Màu tiêu đề #7B1E3A.', group: 'Đúng thương hiệu', why: 'Đúng mã màu chủ đạo.'},
          {text: 'Logo bị kéo dẹt cho vừa khung.', group: 'Sai – phải sửa', why: 'Logo phải giữ đúng tỉ lệ.'},
          {text: 'Tiêu đề dùng phông viết tay không có trong bộ nhận diện.', group: 'Sai – phải sửa', why: 'Chỉ dùng phông quy định.'},
          {text: 'Nút “Đăng ký” dùng đúng thành phần chuẩn.', group: 'Đúng thương hiệu', why: 'Đúng thành phần.'},
          {text: 'Logo đặt sát mép giấy.', group: 'Sai – phải sửa', why: 'Cần khoảng cách tối thiểu với mép.'},
        ]},
    },
    quiz: [
      q('Có hệ thống thiết kế rồi, có cần kiểm tra không?', ['Có, người duyệt vẫn là lớp kiểm tra cuối', 'Không cần', 'Chỉ kiểm tra chính tả'], 0, 'Claude có thể sót.'),
      q('Logo bị kéo méo là lỗi?', ['Sai thương hiệu', 'Không sao', 'Sáng tạo'], 0, 'Logo phải đúng tỉ lệ.'),
      q('Checklist thương hiệu giúp gì?', ['Kiểm tra đủ mục, không bỏ sót', 'Thay thiết kế', 'Làm thiết kế lâu hơn'], 0, 'Kiểm tra có hệ thống.'),
    ],
  },
  11: {
    minutes: '25–30 phút',
    steps: ['Hoàn thiện và duyệt hệ thống.', 'Bật Published.', 'Thông báo cho nhóm.', 'Có kênh góp ý thay đổi.'],
    guided: {
      outcome: 'Chia sẻ hệ thống thiết kế cho cả nhóm để mọi thành viên tự làm ấn phẩm đúng nhận diện.',
      analogy: 'Giống in bảng nội quy và dán ở phòng CLB: ai mới vào cũng đọc và làm theo, khỏi phải hỏi từng người.',
      walkthrough: [
        {title: 'Bật Published', text: ['Khi hệ thống đã ổn, bật công tắc Published. Các dự án mới trong tổ chức sẽ dùng hệ thống này thay cho mặc định.'], design: {highlight: 'system', caption: 'Hệ thống thiết kế đang dùng; bật Published để cả tổ chức dùng.'}, terms: {'Published': 'trạng thái đã xuất bản, cả tổ chức dùng được'}},
        {title: 'Quản trị cho nhóm lớn', text: ['Gói Team/Enterprise có vai trò quản trị duyệt một hệ thống chuẩn và khóa chỉnh sửa, để mọi người làm đúng hướng dẫn.']},
        {title: 'Đừng khóa cứng mà không cho góp ý', text: ['Có cách để thành viên đề xuất thay đổi (biểu mẫu, người phụ trách). Không thì mọi người sẽ làm ngoài hệ thống.']},
      ],
      lab: {type: 'order', intro: 'Sắp xếp quy trình đưa hệ thống thiết kế của CLB vào sử dụng.', items: ['Hoàn thiện hệ thống thiết kế', 'Trưởng ban truyền thông duyệt', 'Bật Published', 'Thông báo và hướng dẫn thành viên', 'Thu thập góp ý và cập nhật định kỳ'], explain: 'Duyệt trước khi xuất bản; xuất bản rồi vẫn nhận góp ý.'},
    },
    quiz: [
      q('Bật Published để?', ['Dự án mới trong tổ chức dùng hệ thống này', 'Xóa hệ thống', 'In ra giấy'], 0, 'Dùng làm mặc định.'),
      q('Khóa chặt hệ thống mà không cho góp ý thì?', ['Mọi người dễ làm ngoài hệ thống', 'Tốt nhất', 'Không ảnh hưởng'], 0, 'Cần kênh góp ý.'),
      q('Ai nên duyệt hệ thống trước khi xuất bản?', ['Người phụ trách thương hiệu', 'Bất kỳ ai', 'Không cần duyệt'], 0, 'Có người chịu trách nhiệm.'),
    ],
  },
  12: {
    minutes: '25–30 phút',
    steps: ['Cập nhật hệ thống khi thương hiệu đổi.', 'Đặt tên phiên bản rõ.', 'Ghi thay đổi.', 'Rà và làm lại ấn phẩm còn dùng.'],
    guided: {
      outcome: 'Quản lý phiên bản thiết kế để luôn biết bản nào mới nhất và quay lại được bản cũ.',
      analogy: 'Giống ghi ngày trên hộp sữa: nhìn là biết hộp nào mới, hộp nào cũ, không uống nhầm.',
      walkthrough: [
        {title: 'Lịch sử phiên bản', text: ['Artifact giữ lịch sử phiên bản. Đặt tên rõ cho bản đã chốt để tìm lại.'], code: 'v1 – bản nháp đầu\nv2 – đổi màu chủ đạo theo kỷ niệm 30 năm\nv3 (chốt 20/11) – sửa logo theo góp ý thầy'},
        {title: 'Khi thương hiệu thay đổi', text: ['Cập nhật hệ thống trong Claude Design. Các tệp đã xuất trước đó (PDF, PNG) KHÔNG tự đổi; lập danh sách ấn phẩm còn dùng để làm lại.']},
        {title: 'Tên dễ hiểu', text: ['Tên như “final”, “final2”, “final-thật-sự” sau một tháng không ai biết bản nào đúng.']},
      ],
      lab: {type: 'sort', intro: 'Tên phiên bản nào dễ hiểu, tên nào gây nhầm?', groups: ['Tên rõ ràng', 'Gây nhầm lẫn'],
        items: [
          {text: 'v3 (chốt 20/11) – sửa logo theo góp ý', group: 'Tên rõ ràng', why: 'Có số, ngày, nội dung thay đổi.'},
          {text: 'final_final_moi', group: 'Gây nhầm lẫn', why: 'Không biết bản nào mới.'},
          {text: 'v2 – đổi màu chủ đạo kỷ niệm 30 năm', group: 'Tên rõ ràng', why: 'Biết thay đổi gì.'},
          {text: 'ban sua lan nua', group: 'Gây nhầm lẫn', why: 'Không có thông tin.'},
          {text: 'poster (1) (2)', group: 'Gây nhầm lẫn', why: 'Tên mặc định, không có nghĩa.'},
        ]},
    },
    quiz: [
      q('Đổi hệ thống thiết kế thì các tệp PDF đã xuất?', ['Không tự đổi, phải làm lại tệp còn dùng', 'Tự đổi theo', 'Bị xóa'], 0, 'Tệp đã xuất là bản cố định.'),
      q('Tên phiên bản tốt có?', ['Số phiên bản, ngày, thay đổi gì', 'Chữ “final”', 'Ký tự ngẫu nhiên'], 0, 'Tìm lại dễ.'),
      q('Lịch sử phiên bản giúp?', ['Quay lại bản cũ khi cần', 'Làm tệp nặng', 'Không giúp gì'], 0, 'Có đường lui.'),
    ],
  },
  13: {
    minutes: '25–35 phút',
    steps: ['Kiểm tra giấy phép phông, ảnh, biểu tượng.', 'Không dùng logo tổ chức khác tùy tiện.', 'Ghi chú ảnh AI tạo.', 'Lập bảng nguồn tài nguyên.'],
    guided: {
      outcome: 'Dùng phông chữ, ảnh, logo đúng quyền, để ấn phẩm không vi phạm bản quyền hay gây hiểu lầm.',
      analogy: 'Giống mượn đồ: đồ của người khác thì phải xin phép, và có món chỉ được mượn dùng ở nhà, không được mang đi bán.',
      walkthrough: [
        {title: 'Mỗi tài nguyên có giấy phép', text: ['Phông, ảnh, biểu tượng đều có điều kiện dùng: miễn phí cho cá nhân, phải ghi nguồn, không dùng thương mại…'], terms: {'Giấy phép': 'điều kiện người sở hữu cho phép em dùng'}},
        {title: 'Logo và ảnh người thật', text: ['Logo nhãn hàng, tổ chức khác: không dùng khi chưa có thỏa thuận (ví dụ tài trợ thật). Ảnh có người: cần sự đồng ý.']},
        {title: 'Ghi chú và bảng nguồn', text: ['Ảnh AI tạo dùng cho truyền thông: ghi chú “ảnh do AI tạo”. Lập bảng nguồn: tên, tác giả, giấy phép.']},
      ],
      lab: {type: 'sort', intro: 'Tài nguyên nào dùng được cho poster của CLB, tài nguyên nào không được hoặc cần xin phép?', groups: ['Dùng được', 'Không được / cần xin phép'],
        items: [
          {text: 'Phông chữ miễn phí có giấy phép mở (OFL).', group: 'Dùng được', why: 'Giấy phép cho phép dùng.'},
          {text: 'Logo nhãn hàng nước ngọt, chưa có tài trợ.', group: 'Không được / cần xin phép', why: 'Không có quyền, gây hiểu lầm là nhà tài trợ.'},
          {text: 'Ảnh hoạt động CLB, các bạn trong ảnh đã đồng ý.', group: 'Dùng được', why: 'Có sự đồng ý.'},
          {text: 'Ảnh tải từ trang báo, không rõ giấy phép.', group: 'Không được / cần xin phép', why: 'Ảnh có bản quyền.'},
          {text: 'Ảnh minh họa AI tạo, có ghi chú “ảnh AI”.', group: 'Dùng được', why: 'Dùng được khi minh bạch và không mô tả sai sự thật.'},
        ]},
    },
    quiz: [
      q('Chèn được ảnh vào thiết kế nghĩa là?', ['Chưa chắc được phép dùng', 'Chắc chắn được dùng', 'Không phải lo'], 0, 'Công cụ không kiểm tra quyền thay em.'),
      q('Dùng logo nhãn hàng khi chưa tài trợ thì?', ['Sai, gây hiểu lầm', 'Được, cho chuyên nghiệp', 'Không sao nếu nhỏ'], 0, 'Không có quyền.'),
      q('Bảng nguồn tài nguyên ghi?', ['Tên, tác giả, giấy phép', 'Chỉ tên tệp', 'Không cần'], 0, 'Minh bạch nguồn gốc.'),
    ],
  },
  14: {
    minutes: '1–2 buổi',
    steps: ['Xây hệ thống thiết kế cho CLB.', 'Áp cho 3 sản phẩm.', 'Chấm checklist thương hiệu.', 'Viết hướng dẫn cho thành viên.'],
    guided: {
      outcome: 'Xây bộ nhận diện số cho CLB, áp thử vào 3 sản phẩm và viết hướng dẫn để thành viên mới dùng được ngay.',
      analogy: 'Giống thiết kế đồng phục cho CLB: chọn màu, in logo, may thử 3 bộ, rồi dán bảng hướng dẫn cách mặc.',
      walkthrough: [
        {title: 'Ghép kỹ năng bài 8–13', text: ['Hệ thống (bài 8–9), kiểm tra (bài 10), chia sẻ (bài 11), phiên bản (bài 12), bản quyền (bài 13).']},
        {title: 'Hướng dẫn 1 trang', text: ['Màu, phông, cách dùng logo, 2 ví dụ đúng, 2 ví dụ sai. Ngắn để ai cũng đọc.']},
        {title: 'Thành công là khi', text: ['Thành viên mới làm được ấn phẩm đúng nhận diện mà không cần hỏi.']},
      ],
      lab: {type: 'plan', intro: 'Duyệt kế hoạch xây bộ nhận diện số cho CLB Nhiếp ảnh.', labels: {taskLabel: 'Đồ án', item: 'Việc', approve: 'Chốt kế hoạch', hint: 'Giữ, hỏi lại hoặc bỏ từng việc.', success: '✓ Bộ nhận diện dùng được lâu dài.'}, task: 'Bộ nhận diện số dùng lâu dài cho CLB Nhiếp ảnh',
        steps: [
          {text: 'Chọn 3 màu, 2 phông có giấy phép rõ ràng.', ok: ['keep'], why: 'Đúng quyền, đủ dùng.'},
          {text: 'Lấy logo của một hãng máy ảnh nổi tiếng làm logo CLB.', ok: ['remove'], why: 'Vi phạm nhãn hiệu.'},
          {text: 'Áp thử cho poster, bài đăng, thẻ thành viên.', ok: ['keep'], why: 'Thử nghiệm thực tế.'},
          {text: 'Viết hướng dẫn 1 trang có ví dụ đúng và sai.', ok: ['keep'], why: 'Thành viên mới dùng được.'},
          {text: 'Khóa hệ thống, không cho ai góp ý.', ok: ['remove', 'ask'], why: 'Cần kênh góp ý để hệ thống sống được lâu.'},
        ]},
    },
    quiz: [
      q('Bộ nhận diện thành công khi?', ['Thành viên mới tự dùng đúng mà không cần hỏi', 'Có nhiều quy tắc nhất', 'Chỉ người làm hiểu'], 0, 'Dễ dùng mới bền.'),
      q('Hướng dẫn nhận diện nên có?', ['Ví dụ đúng và ví dụ sai', 'Chỉ mã màu', 'Không cần ví dụ'], 0, 'Ví dụ giúp hiểu nhanh.'),
      q('Dùng logo hãng máy ảnh làm logo CLB là?', ['Vi phạm nhãn hiệu', 'Sáng tạo', 'Được nếu ghi nguồn'], 0, 'Không có quyền dùng.'),
    ],
  },
};
