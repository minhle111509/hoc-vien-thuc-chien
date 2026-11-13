// Guided Claude basics, lessons 15–28 (part 1 of the Claude learning path). Beginner format.
// Product facts from the Claude Help Center / release notes, November 2026.

const q = (text, options, answer, why) => ({q: text, options, answer, why});

export const CLAUDE_TEACH_2 = {
  15: {
    minutes: '30–40 phút',
    steps: ['Nêu vấn đề, người hưởng lợi, mục tiêu đo được.', 'Nhờ Claude chia giai đoạn và rủi ro.', 'Bỏ phần không làm được.', 'Chốt kế hoạch có người và hạn.'],
    guided: {
      outcome: 'Cùng Claude biến một ý tưởng thành dự án nhỏ có mục tiêu đo được, các giai đoạn và rủi ro.',
      analogy: 'Thiết kế dự án giống vẽ bản đồ trước chuyến đi: điểm đến (mục tiêu), các chặng dừng (giai đoạn), chỗ dễ lạc (rủi ro).',
      walkthrough: [
        {title: 'Từ ý tưởng đến mục tiêu đo được', text: ['“Làm trường xanh hơn” là ý tưởng. “Giảm 30% ly nhựa ở căng tin trong 4 tuần” là mục tiêu đo được.'], terms: {'Mục tiêu đo được': 'mục tiêu có con số và thời hạn để biết đã đạt chưa'}},
        {title: 'Nhờ Claude chia giai đoạn', text: ['“Chia dự án thành 3 giai đoạn, mỗi giai đoạn có việc chính, sản phẩm, rủi ro và cách phòng.”'], code: 'Giai đoạn 1: Khảo sát (tuần 1) – sản phẩm: số liệu ly nhựa/ngày\nGiai đoạn 2: Thử nghiệm (tuần 2–3) – sản phẩm: góc ly cá nhân\nGiai đoạn 3: Đo lại (tuần 4) – sản phẩm: báo cáo so sánh'},
        {title: 'Giữ phần làm được', text: ['Claude hay đề xuất nhiều việc. Bỏ việc vượt sức (kinh phí, thời gian, quyền hạn của học sinh).']},
      ],
      lab: {type: 'plan', intro: 'Claude đề xuất các hạng mục cho dự án. Duyệt từng hạng mục.', labels: {taskLabel: 'Dự án', item: 'Hạng mục', approve: 'Chốt dự án', hint: 'Giữ hạng mục hợp lý, hỏi lại hạng mục chưa rõ, bỏ hạng mục không làm được.', success: '✓ Dự án rõ mục tiêu, làm được trong sức của nhóm.'}, task: 'Giảm 30% ly nhựa ở căng tin trong 4 tuần (nhóm 5 bạn, kinh phí 500.000đ)',
        steps: [
          {text: 'Đếm số ly nhựa bán mỗi ngày trong tuần 1.', ok: ['keep'], why: 'Cần số liệu ban đầu để so sánh.'},
          {text: 'Xây hệ thống máy rửa ly tự động cho căng tin.', ok: ['remove'], why: 'Vượt kinh phí và quyền hạn của nhóm.'},
          {text: 'Làm góc khuyến khích mang ly cá nhân.', ok: ['keep'], why: 'Làm được, đúng mục tiêu.'},
          {text: 'Tuyên truyền trên loa trường (chưa hỏi Đoàn trường).', ok: ['ask'], why: 'Cần xin phép trước.'},
          {text: 'Đo lại số ly nhựa tuần 4 và so sánh.', ok: ['keep'], why: 'Biết mục tiêu có đạt không.'},
        ]},
    },
    quiz: [
      q('Mục tiêu nào đo được?', ['“Làm trường xanh hơn”', '“Giảm 30% ly nhựa ở căng tin trong 4 tuần”', '“Cố gắng bảo vệ môi trường”'], 1, 'Có con số và thời hạn.'),
      q('Claude đề xuất việc vượt kinh phí. Em nên?', ['Bỏ hoặc tìm phương án vừa sức', 'Giữ cho hoành tráng', 'Tăng kinh phí'], 0, 'Dự án phải làm được.'),
      q('Vì sao cần đo số liệu ở đầu dự án?', ['Để so sánh trước – sau', 'Để trang trí', 'Không cần'], 0, 'Có điểm xuất phát mới biết tiến bộ.'),
    ],
  },
  16: {
    minutes: '30–40 phút',
    steps: ['Nhờ Claude giải thích code, không chép mù quáng.', 'Mô tả rõ ngôn ngữ, mục tiêu, lỗi.', 'Chạy thử và hiểu từng dòng.', 'Tuân thủ quy định dùng AI của môn học.'],
    guided: {
      outcome: 'Dùng Claude như gia sư lập trình: hỏi giải thích, xin gợi ý, nhưng tự hiểu và tự chạy code.',
      analogy: 'Claude như huấn luyện viên bơi: chỉ cách đạp chân, sửa tư thế. Nhưng muốn biết bơi, em phải tự xuống nước.',
      walkthrough: [
        {title: 'Hỏi để hiểu', text: ['Dán đoạn code và hỏi: “Giải thích từng dòng cho người mới học Python.”'], code: 'diem = [8, 6, 9]\ntb = sum(diem) / len(diem)\nprint(tb)\n→ “Dòng 2: cộng các điểm rồi chia cho số lượng điểm để ra trung bình.”'},
        {title: 'Xin gợi ý, không xin lời giải', text: ['Khi làm bài tập: “Đừng viết code hoàn chỉnh. Gợi ý bước tiếp theo và hỏi lại tôi.” Em tự viết, Claude kiểm tra.']},
        {title: 'Học sâu hơn ở Phần 4', text: ['Phần 4 của lộ trình (Claude Code) dạy cách để Claude làm việc trực tiếp trong dự án code. Ở đây em tập làm quen với việc hỏi và hiểu.']},
      ],
      lab: {type: 'sort', intro: 'Cách dùng Claude nào giúp em học lập trình, cách nào không?', groups: ['Giúp em học', 'Không giúp em học'],
        items: [
          {text: 'Nhờ giải thích từng dòng của một đoạn code.', group: 'Giúp em học', why: 'Em hiểu cách code chạy.'},
          {text: 'Chép nguyên lời giải bài kiểm tra rồi nộp.', group: 'Không giúp em học', why: 'Gian lận, em không học được gì.'},
          {text: 'Xin gợi ý bước tiếp theo, tự viết code.', group: 'Giúp em học', why: 'Em vẫn là người viết.'},
          {text: 'Hỏi vì sao code của em báo lỗi.', group: 'Giúp em học', why: 'Học cách đọc lỗi.'},
          {text: 'Dán code chạy được mà không đọc hiểu.', group: 'Không giúp em học', why: 'Lần sau gặp lỗi em sẽ không tự sửa được.'},
        ]},
    },
    quiz: [
      q('Khi làm bài tập lập trình, nên nhờ Claude?', ['Viết hộ toàn bộ', 'Gợi ý bước tiếp theo, em tự viết', 'Không hỏi gì'], 1, 'Học bằng cách tự làm.'),
      q('Câu hỏi nào giúp hiểu code nhất?', ['“Giải thích từng dòng cho người mới học”', '“Viết lại cho ngắn”', '“Code đúng không?”'], 0, 'Hiểu từng dòng.'),
      q('Code Claude đưa chạy được, em nên?', ['Đọc hiểu và chạy thử với ví dụ khác', 'Nộp ngay', 'Xóa đi'], 0, 'Hiểu mới tự sửa được khi lỗi.'),
    ],
  },
  17: {
    minutes: '30–40 phút',
    steps: ['Tái hiện lỗi.', 'Đọc thông báo lỗi.', 'Đưa Claude đủ ngữ cảnh.', 'Thử giả thuyết và kiểm tra lại.'],
    guided: {
      outcome: 'Tìm và sửa lỗi code cùng Claude theo trình tự, thay vì dán lỗi và bảo “sửa đi”.',
      analogy: 'Sửa lỗi giống bác sĩ khám bệnh: hỏi triệu chứng, xem kết quả xét nghiệm, đoán bệnh, rồi mới kê thuốc và theo dõi.',
      walkthrough: [
        {title: 'Đọc thông báo lỗi', text: ['Thông báo lỗi cho biết loại lỗi và dòng bị lỗi. Ví dụ: “ZeroDivisionError: division by zero” ở dòng 2 nghĩa là chia cho 0.'], code: 'diem = []\ntb = sum(diem) / len(diem)   ← dòng 2\nZeroDivisionError: division by zero', terms: {'Thông báo lỗi': 'dòng chữ máy báo khi code chạy sai, có tên lỗi và vị trí'}},
        {title: 'Đưa Claude đủ ngữ cảnh', text: ['Dán: đoạn code, thông báo lỗi đầy đủ, em đã thử gì, kết quả mong muốn. Hỏi: “Giải thích nguyên nhân trước, rồi mới gợi ý cách sửa.”']},
        {title: 'Kiểm tra cách sửa', text: ['Chạy lại với trường hợp gây lỗi và trường hợp bình thường. Sửa xong chỗ này mà hỏng chỗ khác thì chưa xong.']},
      ],
      lab: {type: 'order', intro: 'Sắp xếp các bước sửa lỗi cùng Claude.', items: ['Chạy lại để tái hiện lỗi', 'Đọc thông báo lỗi: loại lỗi, dòng nào', 'Gửi Claude code, lỗi đầy đủ và điều đã thử', 'Hỏi nguyên nhân trước khi xin cách sửa', 'Sửa và chạy lại cả trường hợp lỗi lẫn bình thường'], explain: 'Hiểu nguyên nhân trước, sửa sau, kiểm tra cuối.'},
    },
    quiz: [
      q('“ZeroDivisionError” nghĩa là?', ['Chia cho 0', 'Thiếu dấu chấm phẩy', 'Hết bộ nhớ'], 0, 'Đọc tên lỗi để đoán nguyên nhân.'),
      q('Gửi Claude để nhờ sửa lỗi nên có?', ['Code, thông báo lỗi đầy đủ, điều đã thử', 'Chỉ chữ “lỗi rồi”', 'Ảnh màn hình mờ'], 0, 'Đủ ngữ cảnh mới chẩn đoán đúng.'),
      q('Sửa xong, cần kiểm tra?', ['Cả trường hợp gây lỗi và trường hợp bình thường', 'Không cần', 'Chỉ đọc lại code'], 0, 'Tránh sửa chỗ này hỏng chỗ khác.'),
    ],
  },
  18: {
    minutes: '30–40 phút',
    steps: ['Chọn việc lặp lại.', 'Viết quy trình: khi nào dùng, các bước, mẫu, điều cấm.', 'Lưu thành hướng dẫn Project hoặc skill.', 'Thử và chỉnh.'],
    guided: {
      outcome: 'Biến một việc em hay nhờ Claude thành quy trình viết sẵn, để lần sau gọi là dùng được ngay, kết quả đều tay.',
      analogy: 'Quy trình viết sẵn giống công thức pha chế ở quán: ai pha theo công thức thì ly nào cũng cùng vị.',
      walkthrough: [
        {title: 'Lưu quy trình ở đâu?', text: ['Hướng dẫn của Project: áp dụng cho mọi cuộc trò chuyện trong Project đó. Skill: gói quy trình gọi được ở mọi nơi bằng dấu “/” (học kỹ ở Phần 2).'], terms: {'Skill': 'gói hướng dẫn và mẫu cho một việc lặp lại'}},
        {title: 'Một quy trình tốt gồm', text: ['Khi nào dùng, các bước, mẫu đầu ra, điều không được làm.'], code: 'Tên: Biên bản họp CLB\nKhi nào: khi tôi dán ghi chú buổi họp\nCác bước: 1) Thời gian 2) Thành phần 3) Nội dung 4) Kết luận (ai, hạn) 5) Người ghi\nKhông được: tự thêm kết luận không có trong ghi chú'},
        {title: 'Thử và chỉnh', text: ['Thử với 2 ghi chú thật. Thấy lỗi lặp lại thì sửa quy trình, không chỉ sửa kết quả.']},
      ],
      lab: {type: 'brief', intro: 'Viết quy trình “Tóm tắt bài học để ôn thi” để dùng lại mỗi tuần.', sendLabel: '💾 Lưu quy trình (mô phỏng)', exampleLabel: 'Xem quy trình mẫu', resultTitle: 'Quy trình đã lưu:', doneText: '✓ Quy trình đủ rõ để dùng lại.',
        fields: [
          {key: 'name', label: 'Tên quy trình', placeholder: 'Ví dụ: Tóm tắt bài học', minLen: 5, ask: 'Quy trình này tên gì?'},
          {key: 'when', label: 'Khi nào dùng', placeholder: 'Ví dụ: khi tôi dán nội dung một bài trong sách…', minLen: 12, any: ['khi', 'mỗi', 'nếu'], ask: 'Khi nào tôi dùng quy trình này?'},
          {key: 'steps', label: 'Các bước / mẫu đầu ra', placeholder: 'Ví dụ: 1) 5 ý chính 2) 3 từ khóa 3) 3 câu hỏi tự kiểm tra', minLen: 20, any: ['1', 'bước', 'gồm', 'ý'], ask: 'Kết quả gồm những phần nào?'},
          {key: 'forbid', label: 'Điều không được làm', placeholder: 'Ví dụ: không thêm kiến thức ngoài bài…', minLen: 8, any: ['không', 'đừng'], ask: 'Có điều gì tôi không được làm?'},
        ],
        example: {name: 'Biên bản họp CLB', when: 'Khi tôi dán ghi chú buổi họp của CLB.', steps: 'Gồm 1) thời gian 2) thành phần 3) nội dung 4) kết luận kèm người phụ trách và hạn 5) người ghi.', forbid: 'Không tự thêm kết luận không có trong ghi chú.'},
        plan: v => [`Tên: ${v.name}`, `Dùng khi: ${v.when}`, `Cách làm: ${v.steps}`, `Không được: ${v.forbid}`]},
    },
    quiz: [
      q('Hướng dẫn trong Project áp dụng cho?', ['Mọi cuộc trò chuyện trong Project đó', 'Mọi người trên thế giới', 'Chỉ một tin nhắn'], 0, 'Dùng chung trong Project.'),
      q('Quy trình bị lỗi lặp lại. Nên?', ['Sửa quy trình', 'Sửa từng kết quả mãi', 'Bỏ không dùng'], 0, 'Sửa gốc thì hết lỗi lặp.'),
      q('Phần “Không được làm” giúp gì?', ['Tránh Claude tự thêm nội dung sai', 'Làm quy trình dài hơn', 'Không có tác dụng'], 0, 'Đặt giới hạn rõ ràng.'),
    ],
  },
  19: {
    minutes: '25–35 phút',
    steps: ['Thống nhất quy tắc dùng AI trong nhóm.', 'Chia việc rõ, AI chỉ hỗ trợ.', 'Chia sẻ đúng cách (Project, artifact).', 'Ghi rõ phần AI hỗ trợ.'],
    guided: {
      outcome: 'Làm bài nhóm có Claude hỗ trợ mà công bằng, minh bạch và ai cũng học được.',
      analogy: 'AI trong nhóm giống máy tính bỏ túi trong giờ Toán: ai cũng được dùng theo luật chung, và không ai được để máy làm thay phần mình.',
      walkthrough: [
        {title: 'Quy tắc chung của nhóm', text: ['Thống nhất trước: dùng AI cho việc gì (gợi ý, sửa lỗi), không dùng cho việc gì (viết hộ phần của mình), ghi chú thế nào.']},
        {title: 'Chia sẻ trong Claude', text: ['Project chia sẻ được tài liệu và hướng dẫn cho nhóm (tùy gói). Artifact (tài liệu, slide, bảng) chia sẻ được bằng link với quyền xem hoặc sửa.'], terms: {'Artifact': 'sản phẩm Claude tạo, xem và chia sẻ bằng link'}},
        {title: 'Minh bạch', text: ['Ghi trong bài: phần nào có AI hỗ trợ, hỗ trợ thế nào. Mỗi người tự giải thích được phần mình làm.']},
      ],
      lab: {type: 'sort', intro: 'Cách làm nào nên áp dụng khi làm bài nhóm có Claude?', groups: ['Nên làm', 'Nên tránh'],
        items: [
          {text: 'Thống nhất quy tắc dùng AI trước khi bắt đầu.', group: 'Nên làm', why: 'Công bằng, rõ ràng.'},
          {text: 'Một bạn nhờ AI viết hết, các bạn khác ký tên.', group: 'Nên tránh', why: 'Không ai học được, không trung thực.'},
          {text: 'Ghi chú phần nào có AI hỗ trợ.', group: 'Nên làm', why: 'Minh bạch với giáo viên.'},
          {text: 'Chia sẻ link artifact với quyền sửa cho cả lớp 40 người.', group: 'Nên tránh', why: 'Chỉ chia sẻ cho thành viên nhóm, đúng quyền.'},
          {text: 'Mỗi bạn tự giải thích được phần mình làm.', group: 'Nên làm', why: 'Bằng chứng em hiểu bài.'},
        ]},
    },
    quiz: [
      q('Trước khi làm bài nhóm có AI, nên?', ['Thống nhất quy tắc dùng AI', 'Để mỗi người làm tùy ý', 'Cấm hoàn toàn'], 0, 'Luật chung giúp công bằng.'),
      q('Chia sẻ artifact của nhóm nên?', ['Đúng thành viên, đúng quyền', 'Công khai cho mọi người sửa', 'Không chia sẻ'], 0, 'Quyền tối thiểu.'),
      q('Minh bạch khi dùng AI nghĩa là?', ['Ghi rõ phần AI hỗ trợ', 'Giấu đi', 'Ghi tên AI là tác giả'], 0, 'Nói rõ AI giúp gì.'),
    ],
  },
  20: {
    minutes: '25–35 phút',
    steps: ['Chấm nội dung trước, hình thức sau.', 'Tìm lỗi nội dung: sai, thiếu, lạc đề.', 'Tìm lỗi hình thức: dài, rối, sai định dạng.', 'Yêu cầu sửa cụ thể từng lỗi.'],
    guided: {
      outcome: 'Đánh giá câu trả lời của Claude: phân biệt lỗi nội dung (nghiêm trọng) với lỗi hình thức (dễ sửa), rồi yêu cầu sửa đúng chỗ.',
      analogy: 'Kiểm tra món ăn: món nấu sai (mặn quá, sống) quan trọng hơn món bày chưa đẹp.',
      walkthrough: [
        {title: 'Lỗi nội dung', text: ['Sai sự thật, thiếu ý quan trọng, lạc đề, mâu thuẫn. Đây là lỗi phải sửa trước.']},
        {title: 'Lỗi hình thức', text: ['Quá dài, khó đọc, sai định dạng yêu cầu, giọng văn không hợp. Dễ sửa, nhưng sửa sau.']},
        {title: 'Yêu cầu sửa cụ thể', text: ['Không nói “viết lại cho hay hơn”. Nói rõ: “Đoạn 2 ghi sai năm, sửa thành 2024. Rút cả bài còn 150 chữ.”'], code: 'Kém: “Viết lại cho hay hơn.”\nTốt: “Đoạn 2 sai năm thành lập (đúng là 2024). Bỏ đoạn 4 vì lạc đề. Rút còn 150 chữ.”'},
      ],
      lab: {type: 'sort', intro: 'Câu trả lời của Claude có các vấn đề sau. Đâu là lỗi nội dung, đâu là lỗi hình thức?', groups: ['Lỗi nội dung', 'Lỗi hình thức'],
        items: [
          {text: 'Ghi sai năm thành lập CLB.', group: 'Lỗi nội dung', why: 'Sai sự thật.'},
          {text: 'Dài 400 chữ trong khi yêu cầu 150 chữ.', group: 'Lỗi hình thức', why: 'Sai độ dài, nội dung vẫn có thể đúng.'},
          {text: 'Thiếu thời gian và địa điểm của sự kiện.', group: 'Lỗi nội dung', why: 'Thiếu thông tin quan trọng.'},
          {text: 'Dùng gạch đầu dòng thay vì đoạn văn.', group: 'Lỗi hình thức', why: 'Sai cách trình bày.'},
          {text: 'Đoạn 3 nói về chủ đề khác.', group: 'Lỗi nội dung', why: 'Lạc đề.'},
        ]},
    },
    quiz: [
      q('Nên sửa loại lỗi nào trước?', ['Lỗi nội dung', 'Lỗi hình thức', 'Không cần sửa'], 0, 'Nội dung sai thì đẹp mấy cũng vô ích.'),
      q('Yêu cầu sửa nào tốt?', ['“Viết lại hay hơn”', '“Đoạn 2 sai năm, sửa thành 2024; rút còn 150 chữ”', '“Làm lại đi”'], 1, 'Chỉ rõ chỗ và cách sửa.'),
      q('Bài dài gấp đôi yêu cầu là?', ['Lỗi hình thức', 'Lỗi nội dung', 'Không phải lỗi'], 0, 'Sai độ dài là lỗi hình thức.'),
    ],
  },
  21: {
    minutes: '2–3 buổi',
    steps: ['Chọn vấn đề thật.', 'Giao việc, kiểm chứng, sửa.', 'Ghi nhật ký dùng Claude.', 'Trình bày và tự đánh giá.'],
    guided: {
      outcome: 'Làm trọn một sản phẩm thật với Claude hỗ trợ, có kiểm chứng và nhật ký minh bạch.',
      analogy: 'Đồ án giống bài thực hành nấu ăn cuối khóa: dùng mọi kỹ năng đã học, nấu một món hoàn chỉnh và tự chấm theo tiêu chí.',
      walkthrough: [
        {title: 'Ghép các kỹ năng đã học', text: ['Yêu cầu rõ (bài 2–3), tiêu chí (bài 4), kiểm chứng (bài 7), tài liệu dài (bài 12), đánh giá câu trả lời (bài 20).']},
        {title: 'Nhật ký dùng Claude', text: ['Ghi: yêu cầu, kết quả, em đã sửa gì, kiểm chứng thế nào.'], code: 'Lần 2: “Tóm tắt 3 bài báo về rác nhựa, mỗi bài 3 ý, có nguồn.”\nKết quả: 9 ý, 1 ý sai số liệu (ghi 80%, bài gốc 68%)\nĐã sửa: 68%, ghi nguồn bài báo'},
        {title: 'Tự đánh giá', text: ['Dùng rubric (bài 13) chấm sản phẩm, ghi 2 điểm mạnh và 2 điểm cần cải thiện.']},
      ],
      lab: {type: 'plan', intro: 'Nhóm lên kế hoạch đồ án “Bản tin môi trường của lớp” với Claude. Duyệt từng việc.', labels: {taskLabel: 'Đồ án', item: 'Việc', approve: 'Chốt kế hoạch đồ án', hint: 'Giữ, hỏi lại hoặc bỏ từng việc.', success: '✓ Kế hoạch đồ án trung thực, có kiểm chứng.'}, task: 'Bản tin môi trường 1 trang của lớp 10A1',
        steps: [
          {text: 'Nhờ Claude gợi ý 5 chủ đề, nhóm chọn 1.', ok: ['keep'], why: 'Claude gợi ý, nhóm quyết định.'},
          {text: 'Claude viết hết bản tin, nhóm chỉ đổi tên.', ok: ['remove'], why: 'Không phải sản phẩm của nhóm.'},
          {text: 'Kiểm chứng mọi số liệu bằng nguồn chính thức.', ok: ['keep'], why: 'Bản tin phải đúng.'},
          {text: 'Dùng ảnh của bạn trong lớp mà chưa hỏi.', ok: ['remove', 'ask'], why: 'Cần sự đồng ý.'},
          {text: 'Ghi nhật ký các lần dùng Claude.', ok: ['keep'], why: 'Minh bạch.'},
        ]},
    },
    quiz: [
      q('Nhật ký dùng Claude ghi gì?', ['Yêu cầu, kết quả, chỗ đã sửa, cách kiểm chứng', 'Chỉ ngày giờ', 'Không cần'], 0, 'Minh bạch và rút kinh nghiệm.'),
      q('Claude viết hết, nhóm đổi tên. Đó là?', ['Không trung thực', 'Làm việc nhóm tốt', 'Đúng quy định'], 0, 'Sản phẩm không phải của nhóm.'),
      q('Tự đánh giá đồ án bằng?', ['Rubric và ghi điểm mạnh, điểm cần cải thiện', 'Cảm giác', 'Số chữ'], 0, 'Có tiêu chí rõ.'),
    ],
  },
  22: {
    minutes: '25–35 phút',
    steps: ['Biết dữ liệu nào không đưa vào Claude.', 'Dùng trò chuyện ẩn danh khi cần.', 'Quản lý bộ nhớ (memory).', 'Hiểu giới hạn của AI.'],
    guided: {
      outcome: 'Bảo vệ dữ liệu của em và người khác khi dùng Claude, và biết các giới hạn của AI.',
      analogy: 'Trò chuyện với AI giống nói chuyện ở nơi công cộng: chuyện thường thì thoải mái, chuyện riêng tư thì không nói ra.',
      walkthrough: [
        {title: 'Không đưa vào Claude', text: ['Mật khẩu, mã OTP, giấy tờ tùy thân, số tài khoản, thông tin sức khỏe, thông tin cá nhân của bạn bè, thầy cô, phụ huynh.']},
        {title: 'Cài đặt quyền riêng tư', text: ['Bộ nhớ (memory): bật thì Claude nhớ thông tin giữa các cuộc trò chuyện; có thể xem, sửa, tắt. Trò chuyện ẩn danh (incognito): không lưu vào lịch sử, không dùng bộ nhớ.'], terms: {'Memory': 'Claude ghi nhớ thông tin giữa các cuộc trò chuyện', 'Incognito': 'trò chuyện ẩn danh, không lưu lịch sử'}},
        {title: 'Giới hạn của AI', text: ['Có thể sai, có thể lỗi thời, không thay bác sĩ, luật sư, giáo viên. Khi buồn hay gặp chuyện khó, hãy nói với người thật em tin tưởng.']},
      ],
      lab: {type: 'sort', intro: 'Thông tin nào được đưa vào Claude, thông tin nào không?', groups: ['Được đưa vào', 'Không được đưa vào'],
        items: [
          {text: 'Đoạn văn em tự viết để nhờ sửa lỗi.', group: 'Được đưa vào', why: 'Nội dung của em, không nhạy cảm.'},
          {text: 'Số điện thoại và địa chỉ nhà của bạn cùng lớp.', group: 'Không được đưa vào', why: 'Thông tin cá nhân của người khác.'},
          {text: 'Câu hỏi về bài Lịch sử.', group: 'Được đưa vào', why: 'Câu hỏi học tập.'},
          {text: 'Mã OTP ngân hàng.', group: 'Không được đưa vào', why: 'Thông tin bảo mật tuyệt đối.'},
          {text: 'Ảnh chụp sổ khám bệnh của mẹ.', group: 'Không được đưa vào', why: 'Thông tin sức khỏe của người khác.'},
        ]},
    },
    quiz: [
      q('Trò chuyện ẩn danh (incognito) trong Claude?', ['Không lưu vào lịch sử', 'Gửi cho bạn bè', 'Làm Claude thông minh hơn'], 0, 'Dùng khi không muốn lưu cuộc trò chuyện.'),
      q('Bộ nhớ (memory) của Claude có thể?', ['Xem, sửa, tắt', 'Không bao giờ tắt được', 'Đọc tin nhắn điện thoại'], 0, 'Em kiểm soát bộ nhớ.'),
      q('Khi buồn hoặc gặp chuyện khó, nên?', ['Nói với người thật em tin tưởng', 'Chỉ nói với AI', 'Giữ trong lòng'], 0, 'AI không thay được người thật.'),
    ],
  },
  23: {
    minutes: '25–35 phút',
    steps: ['Hỏi Claude nguồn của từng khẳng định.', 'Phân biệt câu có nguồn và câu suy đoán.', 'Yêu cầu Claude tự đánh dấu mức chắc chắn.', 'Kiểm tra nguồn.'],
    guided: {
      outcome: 'Tách được thông tin có nguồn với phần Claude suy đoán, để biết tin đến đâu.',
      analogy: 'Giống nghe bạn kể chuyện: “mình đọc trên báo Tuổi Trẻ” khác “mình đoán là vậy”. Em cần biết câu nào là câu nào.',
      walkthrough: [
        {title: 'Hai loại câu', text: ['Có nguồn: dẫn từ tài liệu, trang web cụ thể, kiểm tra được. Suy đoán: Claude tự suy luận, nghe hợp lý nhưng chưa có căn cứ.']},
        {title: 'Yêu cầu Claude đánh dấu', text: ['“Với mỗi ý, ghi [nguồn: …] nếu có nguồn, ghi [suy đoán] nếu là suy luận của bạn.”'], code: '- Năm 2023 Việt Nam thải khoảng 1,8 triệu tấn nhựa [nguồn: báo cáo …]\n- Có thể con số năm nay cao hơn [suy đoán]'},
        {title: 'Dùng thông tin đúng mức', text: ['Câu có nguồn: kiểm tra nguồn rồi dùng. Câu suy đoán: ghi rõ “có thể”, hoặc tìm nguồn trước khi dùng.']},
      ],
      lab: {type: 'sort', intro: 'Claude trả lời về rác thải ở trường. Câu nào có nguồn, câu nào là suy đoán?', groups: ['Có nguồn', 'Suy đoán của AI'],
        items: [
          {text: '“Theo khảo sát của Đoàn trường tháng 10, căng tin thải 40 kg nhựa/tuần.”', group: 'Có nguồn', why: 'Chỉ rõ nguồn và thời gian.'},
          {text: '“Có lẽ phần lớn học sinh không quan tâm đến môi trường.”', group: 'Suy đoán của AI', why: '“Có lẽ”, không có số liệu.'},
          {text: '“Báo cáo của Sở GD năm 2025 ghi 60% trường đã phân loại rác.”', group: 'Có nguồn', why: 'Có nguồn cụ thể (vẫn phải kiểm tra).'},
          {text: '“Nếu có thùng phân loại, rác sẽ giảm một nửa.”', group: 'Suy đoán của AI', why: 'Dự đoán, chưa có bằng chứng.'},
          {text: '“Chắc các trường khác cũng như vậy.”', group: 'Suy đoán của AI', why: 'Khái quát không căn cứ.'},
        ]},
    },
    quiz: [
      q('Câu có chữ “có lẽ”, “chắc là” thường là?', ['Suy đoán', 'Sự thật đã kiểm chứng', 'Số liệu chính thức'], 0, 'Dấu hiệu suy luận.'),
      q('Câu “có nguồn” rồi thì?', ['Vẫn mở nguồn kiểm tra', 'Dùng ngay không cần xem', 'Bỏ đi'], 0, 'Nguồn có thể bị trích sai.'),
      q('Yêu cầu nào giúp tách nguồn và suy đoán?', ['“Ghi [nguồn] hoặc [suy đoán] cho mỗi ý”', '“Viết hay hơn”', '“Ngắn lại”'], 0, 'Claude tự đánh dấu.'),
    ],
  },
  24: {
    minutes: '30–40 phút',
    steps: ['Đưa nhiều tài liệu, đặt tên rõ.', 'Nhờ Claude lập bảng so sánh.', 'Ghi rõ chỗ mâu thuẫn, không gộp bừa.', 'Kiểm tra lại từng chỗ mâu thuẫn.'],
    guided: {
      outcome: 'Dùng Claude so sánh nhiều tài liệu, tìm chỗ thống nhất và chỗ mâu thuẫn mà không bị gộp thành một kết luận sai.',
      analogy: 'Giống nghe 3 nhân chứng kể lại một vụ việc: chỗ cả 3 cùng kể thì đáng tin hơn; chỗ mỗi người kể một kiểu thì phải hỏi thêm.',
      walkthrough: [
        {title: 'Đặt tên tài liệu', text: ['Tải 3 tài liệu, đặt tên rõ (TL1: báo cáo trường, TL2: bài báo, TL3: khảo sát CLB) để Claude trích đúng.']},
        {title: 'Bảng so sánh', text: ['“Lập bảng: vấn đề | TL1 nói | TL2 nói | TL3 nói | thống nhất hay mâu thuẫn.”'], code: 'Vấn đề        | TL1   | TL2   | TL3   | Kết luận\nSố HS tham gia | 120   | 120   | 150   | Mâu thuẫn – cần hỏi lại\nNgày tổ chức   | 30/11 | 30/11 | 30/11 | Thống nhất'},
        {title: 'Không gộp bừa', text: ['Claude có thể “trung bình hóa” hoặc chọn một số. Yêu cầu ghi rõ mâu thuẫn và em tự kiểm tra lại.']},
      ],
      lab: {type: 'sort', intro: 'Ba tài liệu về Ngày hội tái chế. Mỗi thông tin dưới đây các tài liệu thống nhất hay mâu thuẫn?', groups: ['Thống nhất', 'Mâu thuẫn – cần kiểm tra'],
        items: [
          {text: 'Ngày tổ chức: cả 3 tài liệu ghi 30/11.', group: 'Thống nhất', why: 'Cả 3 giống nhau.'},
          {text: 'Số người tham gia: TL1 ghi 120, TL3 ghi 150.', group: 'Mâu thuẫn – cần kiểm tra', why: 'Hai con số khác nhau.'},
          {text: 'Địa điểm: cả 3 ghi sân trường.', group: 'Thống nhất', why: 'Giống nhau.'},
          {text: 'Lượng giấy thu được: TL1 ghi 120 kg, TL2 ghi 1,2 tấn.', group: 'Mâu thuẫn – cần kiểm tra', why: 'Chênh 10 lần, có thể ghi nhầm đơn vị.'},
          {text: 'Đơn vị tổ chức: cả 3 ghi Đoàn trường.', group: 'Thống nhất', why: 'Giống nhau.'},
        ]},
    },
    quiz: [
      q('Hai tài liệu ghi hai con số khác nhau. Nên?', ['Ghi rõ mâu thuẫn và kiểm tra lại', 'Lấy trung bình', 'Chọn số lớn'], 0, 'Không gộp bừa.'),
      q('Đặt tên tài liệu (TL1, TL2…) giúp gì?', ['Claude trích đúng tài liệu nào nói gì', 'Không tác dụng', 'Làm tệp nhẹ hơn'], 0, 'Truy được nguồn của từng ý.'),
      q('Thông tin cả 3 tài liệu cùng ghi thì?', ['Đáng tin hơn', 'Chắc chắn sai', 'Không quan trọng'], 0, 'Nhiều nguồn độc lập thống nhất.'),
    ],
  },
  25: {
    minutes: '25–35 phút',
    steps: ['Viết tiêu chí trước khi xem câu trả lời.', 'Chấm từng câu trả lời theo từng tiêu chí.', 'So sánh, chọn câu tốt hơn có lý do.', 'Ghép ưu điểm nếu cần.'],
    guided: {
      outcome: 'So sánh hai câu trả lời của Claude bằng tiêu chí rõ ràng, thay vì chọn theo cảm giác “nghe hay hơn”.',
      analogy: 'Giống chấm thi văn nghệ: giám khảo chấm từng mục (giọng hát, trang phục, sáng tạo) chứ không chỉ “thích tiết mục nào hơn”.',
      walkthrough: [
        {title: 'Tiêu chí trước, đọc sau', text: ['Viết tiêu chí trước khi đọc để không bị câu trả lời dài, trôi chảy làm “lóa mắt”.']},
        {title: 'Chấm theo từng tiêu chí', text: ['Mỗi tiêu chí xem câu nào tốt hơn. Câu dài hơn chưa chắc đúng hơn.'], code: 'Tiêu chí      | A          | B\nĐúng số liệu  | ✓          | ✗ (sai năm)\nĐủ ý          | ✗ thiếu hạn | ✓\nĐúng độ dài   | ✓ 150 chữ   | ✗ 400 chữ'},
        {title: 'Chọn và ghép', text: ['Chọn câu tốt hơn ở tiêu chí quan trọng nhất (thường là đúng nội dung), rồi nhờ Claude bổ sung phần còn thiếu.']},
      ],
      lab: {type: 'sort', intro: 'Câu trả lời A: 150 chữ, số liệu đúng, thiếu hạn đăng ký, giọng thân thiện. Câu trả lời B: 400 chữ, sai năm tổ chức, có đủ hạn đăng ký, giọng cứng nhắc. Với mỗi tiêu chí, câu nào tốt hơn?', groups: ['A tốt hơn', 'B tốt hơn'],
        items: [
          {text: 'Đúng số liệu, năm tháng', group: 'A tốt hơn', why: 'B sai năm tổ chức.'},
          {text: 'Có đủ thông tin hạn đăng ký', group: 'B tốt hơn', why: 'A thiếu hạn đăng ký.'},
          {text: 'Đúng độ dài yêu cầu (dưới 200 chữ)', group: 'A tốt hơn', why: 'B dài 400 chữ.'},
          {text: 'Giọng văn hợp với học sinh', group: 'A tốt hơn', why: 'A thân thiện, B cứng nhắc.'},
        ]},
    },
    quiz: [
      q('Vì sao viết tiêu chí trước khi đọc câu trả lời?', ['Tránh bị câu dài, trôi chảy đánh lừa', 'Cho mất thời gian', 'Không cần'], 0, 'Chấm khách quan hơn.'),
      q('Câu trả lời dài hơn thì?', ['Chưa chắc tốt hơn', 'Luôn tốt hơn', 'Luôn sai'], 0, 'Chấm theo tiêu chí, không theo độ dài.'),
      q('Tiêu chí quan trọng nhất thường là?', ['Đúng nội dung', 'Màu chữ', 'Số đoạn'], 0, 'Sai nội dung thì các mặt khác vô ích.'),
    ],
  },
  26: {
    minutes: '25–35 phút',
    steps: ['Tạo Project cho mỗi việc lớn.', 'Thêm tài liệu và hướng dẫn.', 'Đặt tên cuộc trò chuyện, phiên bản rõ ràng.', 'Lưu bản tốt, ghi thay đổi.'],
    guided: {
      outcome: 'Sắp xếp công việc với Claude theo dự án, để không lạc giữa hàng chục cuộc trò chuyện và luôn tìm lại được bản tốt nhất.',
      analogy: 'Giống sắp cặp sách theo môn: mỗi môn một ngăn, vở nào bài nào ghi rõ ngày. Cần là lấy ra ngay.',
      walkthrough: [
        {title: 'Mỗi việc lớn một Project', text: ['“Ôn thi Sinh”, “Báo cáo CLB”: mỗi việc một Project, có tài liệu và hướng dẫn riêng.'], screen: {highlight: 'projects', caption: 'Mục “📁 Projects”: tạo mới cho mỗi việc lớn.'}},
        {title: 'Đặt tên rõ ràng', text: ['Đổi tên cuộc trò chuyện theo việc: “2026-11 Dàn ý bài nghị luận”. Artifact (tài liệu, slide) có lịch sử phiên bản; đặt tên bản đã chốt.']},
        {title: 'Ghi thay đổi', text: ['Bản 2 khác bản 1 ở đâu, vì sao. Khi cần quay lại, em biết bản nào tốt.'], code: 'v1 – bản nháp đầu\nv2 – thêm số liệu khảo sát, rút còn 1 trang\nv3 (chốt) – sửa theo góp ý của cô'},
      ],
      lab: {type: 'order', intro: 'Sắp xếp các bước tổ chức dự án “Báo cáo CLB tháng 11” với Claude.', items: ['Tạo Project “Báo cáo CLB”', 'Thêm tài liệu nền (biên bản, số liệu)', 'Viết hướng dẫn cho Project (giọng văn, định dạng)', 'Làm việc trong các cuộc trò chuyện đặt tên rõ', 'Chốt phiên bản cuối và ghi thay đổi'], explain: 'Chuẩn bị chỗ làm việc trước, làm việc sau, chốt bản cuối.'},
    },
    quiz: [
      q('Project trong Claude giúp gì?', ['Gom tài liệu, hướng dẫn, cuộc trò chuyện của một việc', 'Xóa lịch sử', 'Tăng tốc máy'], 0, 'Tổ chức theo việc.'),
      q('Tên cuộc trò chuyện tốt là?', ['“2026-11 Dàn ý bài nghị luận”', '“Mới”', '“abc”'], 0, 'Tìm lại dễ dàng.'),
      q('Ghi chú thay đổi giữa các phiên bản để?', ['Biết bản nào tốt và quay lại được', 'Trang trí', 'Không cần'], 0, 'Quản lý phiên bản.'),
    ],
  },
  27: {
    minutes: '30–40 phút',
    steps: ['Giữ nguyên mọi thứ, chỉ đổi một điểm trong prompt.', 'Chạy cả hai bản với cùng đầu vào.', 'Chấm bằng cùng tiêu chí.', 'Chạy vài lần trước khi kết luận.'],
    guided: {
      outcome: 'Thử hai cách viết prompt một cách công bằng để biết cách nào thật sự tốt hơn.',
      analogy: 'Giống thử hai loại phân bón: hai chậu cùng giống cây, cùng đất, cùng nắng, chỉ khác phân. Đổi nhiều thứ một lúc thì không biết cái gì làm cây tốt.',
      walkthrough: [
        {title: 'Chỉ đổi một điểm', text: ['Bản A và bản B giống hệt nhau, chỉ khác một điểm (ví dụ: có hay không có ví dụ mẫu). Như vậy mới biết điểm đó có tác dụng không.'], terms: {'Thử nghiệm A/B': 'so sánh hai phiên bản chỉ khác nhau một điểm'}},
        {title: 'Cùng đầu vào, cùng tiêu chí', text: ['Dùng cùng tài liệu, cùng câu hỏi, chấm cùng bảng tiêu chí (bài 25).'], code: 'A: “Tóm tắt bài sau trong 5 ý.”\nB: “Tóm tắt bài sau trong 5 ý. Ví dụ một ý tốt: ‘Quang hợp cần ánh sáng, nước, CO2’.”\n→ Chỉ khác: có ví dụ mẫu'},
        {title: 'Chạy vài lần', text: ['AI mỗi lần trả lời hơi khác. Chạy mỗi bản 3 lần rồi mới kết luận.']},
      ],
      lab: {type: 'sort', intro: 'Cách thử nào công bằng, cách nào không?', groups: ['Thử công bằng', 'Không công bằng'],
        items: [
          {text: 'Hai prompt chỉ khác nhau ở việc có ví dụ mẫu.', group: 'Thử công bằng', why: 'Chỉ đổi một điểm.'},
          {text: 'Bản A dùng tài liệu 1, bản B dùng tài liệu 2.', group: 'Không công bằng', why: 'Đầu vào khác nhau.'},
          {text: 'Chấm cả hai bằng cùng một bảng tiêu chí.', group: 'Thử công bằng', why: 'Cùng thước đo.'},
          {text: 'Chạy mỗi bản một lần rồi kết luận ngay.', group: 'Không công bằng', why: 'Mỗi lần trả lời hơi khác, cần vài lần.'},
          {text: 'Bản B vừa thêm ví dụ, vừa đổi vai trò, vừa đổi độ dài.', group: 'Không công bằng', why: 'Đổi nhiều thứ, không biết cái nào có tác dụng.'},
        ]},
    },
    quiz: [
      q('Thử nghiệm A/B công bằng khi?', ['Hai bản chỉ khác một điểm', 'Hai bản khác mọi thứ', 'Chỉ chạy một bản'], 0, 'Mới biết điểm nào tạo khác biệt.'),
      q('Vì sao chạy mỗi bản vài lần?', ['AI mỗi lần trả lời hơi khác', 'Cho tốn hạn mức', 'Không cần'], 0, 'Tránh kết luận do may rủi.'),
      q('Chấm hai bản nên dùng?', ['Cùng một bảng tiêu chí', 'Cảm giác', 'Độ dài'], 0, 'Cùng thước đo.'),
    ],
  },
  28: {
    minutes: '2–3 buổi',
    steps: ['Lập Project nghiên cứu với tài liệu đáng tin.', 'Hỏi có trích dẫn, đánh dấu suy đoán.', 'Đối chiếu nhiều nguồn, ghi mâu thuẫn.', 'Viết báo cáo có nguồn và giới hạn.'],
    guided: {
      outcome: 'Dùng Claude làm trợ lý nghiên cứu cho một câu hỏi thật: có nguồn, có kiểm chứng, nói rõ điều chưa chắc chắn.',
      analogy: 'Trợ lý nghiên cứu giống người phụ việc trong thư viện: tìm và đọc giúp em rất nhanh, nhưng em là người viết kết luận và chịu trách nhiệm.',
      walkthrough: [
        {title: 'Ghép kỹ năng của cả Phần 1', text: ['Project và tài liệu (bài 12, 26), nguồn và suy đoán (bài 23), đối chiếu nhiều tài liệu (bài 24), kiểm chứng (bài 7), tiêu chí (bài 4, 25).']},
        {title: 'Báo cáo nghiên cứu gồm', text: ['Câu hỏi, nguồn đã dùng, phát hiện chính (có trích dẫn), chỗ mâu thuẫn, giới hạn, kết luận của em.']},
        {title: 'Tiếp theo: Phần 2', text: ['Ở Phần 2 (Claude Cowork), em sẽ học giao cho Claude làm cả việc nhiều bước như tổng hợp nhiều tệp, chạy theo lịch.']},
      ],
      lab: {type: 'plan', intro: 'Claude đề xuất cách làm báo cáo nghiên cứu “Học sinh dùng điện thoại bao nhiêu giờ mỗi ngày?”. Duyệt từng bước.', labels: {taskLabel: 'Câu hỏi nghiên cứu', item: 'Bước', approve: 'Chốt cách làm', hint: 'Giữ, hỏi lại hoặc bỏ từng bước.', success: '✓ Cách làm có nguồn, có kiểm chứng, trung thực về giới hạn.'}, task: 'Học sinh THPT dùng điện thoại bao nhiêu giờ mỗi ngày?',
        steps: [
          {text: 'Tạo Project, thêm 3 nghiên cứu đã kiểm tra nguồn.', ok: ['keep'], why: 'Nguồn đáng tin làm nền.'},
          {text: 'Khi thiếu số liệu, tự ước lượng cho đủ bảng.', ok: ['remove'], why: 'Không bịa số liệu; ghi rõ chỗ thiếu.'},
          {text: 'Ghi [nguồn] hoặc [suy đoán] cho mỗi ý.', ok: ['keep'], why: 'Biết tin đến đâu.'},
          {text: 'Lập bảng so sánh 3 nghiên cứu, ghi chỗ mâu thuẫn.', ok: ['keep'], why: 'Không gộp bừa.'},
          {text: 'Kết luận chắc chắn cho mọi học sinh Việt Nam.', ok: ['remove', 'ask'], why: 'Vượt quá phạm vi dữ liệu; phải nêu giới hạn.'},
        ]},
    },
    quiz: [
      q('Báo cáo nghiên cứu cần có?', ['Nguồn, phát hiện có trích dẫn, giới hạn', 'Chỉ kết luận', 'Nhiều hình ảnh'], 0, 'Người đọc kiểm chứng được.'),
      q('Thiếu số liệu thì?', ['Ghi rõ chỗ thiếu', 'Tự ước lượng', 'Bỏ cả câu hỏi'], 0, 'Không bịa số liệu.'),
      q('Ai chịu trách nhiệm kết luận?', ['Em', 'Claude', 'Không ai'], 0, 'AI hỗ trợ, em kết luận.'),
    ],
  },
};
