// Guided Claude basics, lessons 1–14 (part 1 of the Claude learning path). Beginner format.
// Product facts from the Claude Help Center / release notes, November 2026.

const q = (text, options, answer, why) => ({q: text, options, answer, why});

const SCORES = [['An', 8.5], ['Bình', 6], ['Chi', 9.5], ['Dũng', 7], ['Em', 8], ['Giang', 5.5], ['Hà', 7.5], ['Khoa', 9]];
const scoreCells = () => {
  const c = {A1: 'Họ tên', B1: 'Điểm', D1: 'Trung bình', E1: 'Cao nhất', F1: 'Số bạn ≥ 8'};
  SCORES.forEach(([n, d], i) => { c['A' + (i + 2)] = n; c['B' + (i + 2)] = d; });
  return c;
};
const avg = SCORES.reduce((s, [, d]) => s + d, 0) / SCORES.length;

export const CLAUDE_TEACH_1 = {
  1: {
    minutes: '20–30 phút',
    steps: ['Mở Claude trên web, máy tính hoặc điện thoại.', 'Gõ yêu cầu, đọc trả lời, hỏi tiếp.', 'Biết Claude làm được gì và không nên làm gì.', 'Không đưa thông tin nhạy cảm.'],
    guided: {
      outcome: 'Mở Claude, hỏi được câu đầu tiên và biết Claude giúp tốt việc gì, việc gì không nên nhờ.',
      analogy: 'Claude giống một người bạn học giỏi, đọc rất nhiều, trả lời nhanh và kiên nhẫn. Nhưng bạn ấy đôi khi nhớ nhầm, nên chuyện quan trọng em vẫn phải kiểm tra lại.',
      walkthrough: [
        {title: 'Claude ở đâu?', text: ['Claude dùng trên web (claude.ai), ứng dụng máy tính và điện thoại. Đăng nhập bằng email; gói miễn phí đã dùng được phần lớn bài trong khóa.', 'Màn hình chính có ô để gõ yêu cầu và cột bên trái chứa các cuộc trò chuyện, Projects.'], screen: {highlight: 'new', caption: 'Bấm “＋ Việc mới” (hoặc New chat) rồi gõ yêu cầu ở ô giữa.'}},
        {title: 'Hỏi câu đầu tiên', text: ['Gõ yêu cầu bằng tiếng Việt như nói chuyện bình thường. Đọc trả lời, rồi hỏi tiếp để làm rõ: “giải thích đơn giản hơn”, “cho ví dụ”.'], chat: [{who: 'you', text: 'Giải thích quang hợp cho học sinh lớp 6, kèm một ví dụ đời thường.'}, {who: 'claude', text: 'Quang hợp là cách cây “nấu ăn” bằng ánh nắng… Ví dụ: cây rau muống ngoài nắng xanh tốt hơn cây để trong bóng râm.'}]},
        {title: 'Claude giỏi gì, cần cẩn thận gì?', text: ['Giỏi: giải thích, gợi ý ý tưởng, viết nháp, tóm tắt, sửa câu, lập kế hoạch.', 'Cẩn thận: Claude có thể sai số liệu, ngày tháng, nguồn trích dẫn. Không đưa mật khẩu, giấy tờ, thông tin riêng của người khác.'], terms: {'Trả lời sai nhưng tự tin': 'AI có thể viết trôi chảy cả khi thông tin sai, gọi là “ảo giác”'}},
      ],
      lab: {type: 'sort', intro: 'Việc nào Claude hỗ trợ tốt, việc nào không nên nhờ Claude?', groups: ['Claude hỗ trợ tốt', 'Không nên nhờ Claude'],
        items: [
          {text: 'Giải thích lại một khái niệm khó trong sách Lý.', group: 'Claude hỗ trợ tốt', why: 'Giải thích là thế mạnh của Claude.'},
          {text: 'Dán mật khẩu email để Claude “kiểm tra giúp”.', group: 'Không nên nhờ Claude', why: 'Không bao giờ đưa mật khẩu cho AI.'},
          {text: 'Gợi ý 5 ý tưởng cho buổi sinh hoạt lớp.', group: 'Claude hỗ trợ tốt', why: 'Gợi ý ý tưởng là việc hợp.'},
          {text: 'Viết hộ bài kiểm tra giáo viên yêu cầu tự làm.', group: 'Không nên nhờ Claude', why: 'Đó là gian lận, em không học được gì.'},
          {text: 'Sửa lỗi chính tả trong đoạn văn của em.', group: 'Claude hỗ trợ tốt', why: 'Em vẫn là người viết, Claude chỉ hỗ trợ sửa.'},
          {text: 'Gửi ảnh căn cước của bạn để Claude điền đơn.', group: 'Không nên nhờ Claude', why: 'Giấy tờ cá nhân của người khác, không được đưa vào AI.'},
        ]},
    },
    quiz: [
      q('Claude có thể trả lời sai không?', ['Có, kể cả khi viết rất tự tin', 'Không bao giờ', 'Chỉ khi mất mạng'], 0, 'Luôn kiểm tra thông tin quan trọng.'),
      q('Thông tin nào KHÔNG được đưa vào Claude?', ['Câu hỏi bài học', 'Mật khẩu và giấy tờ cá nhân', 'Đoạn văn em tự viết'], 1, 'Bảo vệ dữ liệu cá nhân.'),
      q('Claude chưa trả lời đúng ý. Em nên?', ['Bỏ cuộc', 'Hỏi tiếp, nói rõ hơn em cần gì', 'Gõ lại y hệt'], 1, 'Hỏi tiếp để làm rõ là cách dùng đúng.'),
    ],
  },
  2: {
    minutes: '25–35 phút',
    steps: ['Nói rõ mục tiêu: làm gì, cho ai.', 'Đưa bối cảnh cần thiết.', 'Nói rõ đầu ra: dạng gì, dài bao nhiêu.', 'Nêu giới hạn và tiêu chí.'],
    guided: {
      outcome: 'Viết yêu cầu để Claude trả lời đúng ý ngay lần đầu, không phải sửa đi sửa lại.',
      analogy: 'Nhờ Claude giống nhờ thợ may: chỉ nói “may cái áo” thì thợ đoán đủ thứ. Nói rõ áo gì, cho ai, cỡ nào, màu gì thì may một lần là vừa.',
      walkthrough: [
        {title: 'Yêu cầu mơ hồ thì sao?', text: ['“Viết bài về môi trường” → Claude phải đoán: bài cho ai, dài bao nhiêu, để làm gì. Kết quả thường chung chung.'], chat: [{who: 'you', text: 'Viết bài về môi trường.'}, {who: 'claude', text: '(Một bài dài 800 chữ, giọng sách giáo khoa, không hợp để đọc trong giờ sinh hoạt 3 phút.)'}]},
        {title: '4 phần của một yêu cầu tốt', text: ['1) Mục tiêu: làm gì, cho ai. 2) Bối cảnh: hoàn cảnh, thông tin Claude cần biết. 3) Đầu ra: dạng gì (đoạn văn, bảng, gạch đầu dòng), dài bao nhiêu. 4) Giới hạn: điều cần tránh, tiêu chí đạt.'], terms: {'Prompt': 'câu yêu cầu em gửi cho AI'}},
        {title: 'Ví dụ trước và sau', text: ['Yêu cầu tốt không cần dài, chỉ cần đủ.'], code: 'Kém: “Viết bài về môi trường.”\nTốt: “Viết bài nói 3 phút cho học sinh lớp 10 trong giờ sinh hoạt, chủ đề giảm rác nhựa ở căng tin. Giọng gần gũi, có 1 số liệu và 1 lời kêu gọi cụ thể. Tránh từ ngữ chuyên môn.”'},
      ],
      lab: {type: 'brief', intro: 'Viết yêu cầu nhờ Claude soạn thông báo tuyển thành viên cho CLB Tiếng Anh.', sendLabel: '➤ Gửi yêu cầu (mô phỏng)', exampleLabel: 'Xem yêu cầu mẫu', resultTitle: 'Claude: “Tôi đã hiểu. Tôi sẽ viết theo các điểm sau:”', doneText: '✓ Yêu cầu đủ rõ: Claude không phải đoán.',
        fields: [
          {key: 'goal', label: '1. Mục tiêu (làm gì, cho ai đọc)', placeholder: 'Ví dụ: thông báo tuyển thành viên cho học sinh khối 10…', minLen: 15, any: ['cho', 'học sinh', 'bạn', 'người'], ask: 'Thông báo này dành cho ai đọc?'},
          {key: 'context', label: '2. Bối cảnh', placeholder: 'Ví dụ: CLB sinh hoạt thứ Tư, có 25 thành viên…', minLen: 15, ask: 'Tôi cần biết gì về CLB: sinh hoạt khi nào, làm gì?'},
          {key: 'output', label: '3. Đầu ra (dạng gì, dài bao nhiêu)', placeholder: 'Ví dụ: một đoạn 120 chữ, kèm 3 gạch đầu dòng…', minLen: 10, any: ['chữ', 'câu', 'đoạn', 'dòng', 'bảng', 'trang'], ask: 'Em muốn thông báo dài bao nhiêu, trình bày thế nào?'},
          {key: 'limits', label: '4. Giới hạn và tiêu chí', placeholder: 'Ví dụ: giọng vui, không dùng tiếng lóng, có hạn đăng ký…', minLen: 10, any: ['không', 'tránh', 'phải', 'có', 'giọng'], ask: 'Có điều gì cần tránh hay bắt buộc phải có không?'},
        ],
        example: {goal: 'Viết bài đăng mời học sinh khối 11 tham gia Ngày hội đọc sách.', context: 'Ngày hội tổ chức 8h–11h thứ Bảy 29/11 tại thư viện, có đổi sách cũ lấy sách mới và gặp gỡ tác giả.', output: 'Một đoạn khoảng 100 chữ và 3 gạch đầu dòng thông tin chính.', limits: 'Giọng thân thiện, không dùng tiếng lóng, phải có thời gian, địa điểm và cách đăng ký.'},
        plan: v => [`Viết cho: ${v.goal}`, `Dựa trên: ${v.context}`, `Trình bày: ${v.output}`, `Lưu ý: ${v.limits}`]},
    },
    quiz: [
      q('Yêu cầu nào giúp Claude trả lời đúng ý nhất?', ['“Viết hay vào”', '“Viết thông báo 100 chữ cho học sinh khối 10 về buổi tuyển thành viên thứ Tư, giọng vui, có hạn đăng ký”', '“Làm nhanh nhé”'], 1, 'Có mục tiêu, đối tượng, độ dài, giọng văn, thông tin bắt buộc.'),
      q('“Dài khoảng 100 chữ, 3 gạch đầu dòng” thuộc phần nào?', ['Đầu ra', 'Bối cảnh', 'Mục tiêu'], 0, 'Nói rõ hình thức kết quả.'),
      q('Yêu cầu tốt có cần thật dài không?', ['Có, càng dài càng tốt', 'Không, chỉ cần đủ mục tiêu, bối cảnh, đầu ra, giới hạn', 'Chỉ cần một từ'], 1, 'Đủ quan trọng hơn dài.'),
    ],
  },
  3: {
    minutes: '25–35 phút',
    steps: ['Chia prompt thành các phần có tiêu đề.', 'Đặt vai trò cho Claude khi cần.', 'Đưa ví dụ mẫu.', 'Dùng thẻ hoặc dấu phân cách cho tài liệu.'],
    guided: {
      outcome: 'Viết prompt có cấu trúc rõ ràng (vai trò, bối cảnh, nhiệm vụ, định dạng, ví dụ) để Claude làm việc phức tạp hơn mà vẫn đúng ý.',
      analogy: 'Prompt có cấu trúc giống đơn đặt bánh có từng ô: loại bánh, cỡ, chữ viết trên bánh, giờ lấy. Thợ đọc từng ô là biết làm gì, không bỏ sót.',
      walkthrough: [
        {title: 'Các phần của prompt có cấu trúc', text: ['Vai trò: Claude đóng vai ai (giáo viên, biên tập viên). Bối cảnh: hoàn cảnh. Nhiệm vụ: việc cần làm. Định dạng: cách trình bày. Ví dụ: mẫu em muốn.'], terms: {'Vai trò': 'góc nhìn em muốn Claude đứng vào khi trả lời'}},
        {title: 'Ví dụ prompt có cấu trúc', text: ['Đặt tiêu đề cho từng phần giúp cả em và Claude không bỏ sót.'], code: 'Vai trò: Em là giáo viên Sinh học dạy học sinh lớp 10.\nBối cảnh: Lớp sắp kiểm tra chương Tế bào, nhiều bạn nhầm ti thể và lục lạp.\nNhiệm vụ: Soạn 5 câu hỏi trắc nghiệm phân biệt ti thể và lục lạp.\nĐịnh dạng: Mỗi câu 3 lựa chọn, ghi đáp án và một câu giải thích.\nVí dụ: “Bào quan nào có ở tế bào thực vật mà không có ở tế bào động vật? A… B… C…”'},
        {title: 'Tách tài liệu khỏi lời dặn', text: ['Khi dán tài liệu dài, đặt nó giữa dấu phân cách hoặc thẻ như <tai_lieu>…</tai_lieu>, rồi mới ghi yêu cầu. Claude không nhầm nội dung tài liệu với lời dặn của em.']},
      ],
      lab: {type: 'sort', intro: 'Mỗi câu dưới đây thuộc phần nào trong một prompt có cấu trúc?', groups: ['Vai trò', 'Bối cảnh', 'Nhiệm vụ', 'Định dạng'],
        items: [
          {text: '“Em là biên tập viên bản tin của trường.”', group: 'Vai trò', why: 'Nói Claude đóng vai ai.'},
          {text: '“Bản tin phát hành mỗi thứ Hai, người đọc là học sinh và phụ huynh.”', group: 'Bối cảnh', why: 'Mô tả hoàn cảnh.'},
          {text: '“Viết bài tóm tắt Ngày hội tái chế từ ghi chú dưới đây.”', group: 'Nhiệm vụ', why: 'Việc cần làm.'},
          {text: '“Một tiêu đề, 3 đoạn ngắn, tối đa 200 chữ.”', group: 'Định dạng', why: 'Cách trình bày kết quả.'},
          {text: '“Trả lời bằng bảng 3 cột: Hoạt động, Kết quả, Bài học.”', group: 'Định dạng', why: 'Quy định hình thức đầu ra.'},
        ]},
    },
    quiz: [
      q('Phần “Vai trò” trong prompt dùng để?', ['Cho Claude biết đứng ở góc nhìn nào', 'Ghi độ dài', 'Ghi tên tệp'], 0, 'Ví dụ: giáo viên, biên tập viên.'),
      q('Dán tài liệu dài vào prompt nên?', ['Trộn lẫn với lời dặn', 'Đặt trong dấu phân cách hoặc thẻ riêng', 'Bỏ hết dấu câu'], 1, 'Tránh Claude nhầm tài liệu với yêu cầu.'),
      q('Đưa một ví dụ mẫu vào prompt giúp gì?', ['Claude bắt chước đúng kiểu em muốn', 'Không có tác dụng', 'Làm Claude chậm hơn'], 0, 'Ví dụ là cách mô tả nhanh nhất.'),
    ],
  },
  4: {
    minutes: '25–30 phút',
    steps: ['Viết tiêu chí đo được thay vì “hay”, “tốt”.', 'Đưa tiêu chí vào yêu cầu.', 'Nhờ Claude tự kiểm tra theo tiêu chí.', 'Tự chấm lại kết quả.'],
    guided: {
      outcome: 'Đặt tiêu chí chất lượng rõ ràng để vừa giúp Claude làm đúng, vừa giúp em chấm được kết quả.',
      analogy: 'Tiêu chí giống vạch đích trong cuộc chạy: không có vạch thì không biết khi nào là xong, ai về đúng.',
      walkthrough: [
        {title: '“Hay” là bao nhiêu?', text: ['“Viết cho hay” mỗi người hiểu một kiểu. “Dưới 150 chữ, có 1 số liệu, kết thúc bằng câu kêu gọi” thì ai cũng kiểm tra được.'], terms: {'Tiêu chí đo được': 'điều kiểm tra được là có hay không, đúng hay sai'}},
        {title: 'Đưa tiêu chí vào yêu cầu', text: ['Ghi cuối prompt: “Tiêu chí: …”. Sau khi Claude trả lời, hỏi thêm: “Hãy tự kiểm tra bài theo từng tiêu chí, chỗ nào chưa đạt thì sửa.”'], code: 'Tiêu chí:\n- Tối đa 150 chữ\n- Có ít nhất 1 số liệu kèm nguồn\n- Không dùng từ tiếng Anh\n- Kết thúc bằng 1 lời kêu gọi cụ thể'},
        {title: 'Em vẫn chấm lại', text: ['Claude tự kiểm tra có thể bỏ sót. Đếm chữ, xem nguồn, đọc lại một lần theo đúng danh sách tiêu chí.']},
      ],
      lab: {type: 'sort', intro: 'Tiêu chí nào đo được, tiêu chí nào còn mơ hồ?', groups: ['Đo được', 'Còn mơ hồ'],
        items: [
          {text: 'Tối đa 150 chữ.', group: 'Đo được', why: 'Đếm được.'},
          {text: 'Viết thật hay.', group: 'Còn mơ hồ', why: 'Mỗi người hiểu một kiểu.'},
          {text: 'Có ít nhất 1 số liệu kèm nguồn.', group: 'Đo được', why: 'Kiểm tra có hay không.'},
          {text: 'Hấp dẫn người đọc.', group: 'Còn mơ hồ', why: 'Cần nói hấp dẫn bằng cách nào.'},
          {text: 'Kết thúc bằng một lời kêu gọi cụ thể.', group: 'Đo được', why: 'Xem câu cuối là biết.'},
          {text: 'Chuyên nghiệp hơn.', group: 'Còn mơ hồ', why: 'Không rõ thế nào là chuyên nghiệp.'},
        ]},
    },
    quiz: [
      q('Tiêu chí nào tốt nhất?', ['“Viết tốt”', '“Dưới 150 chữ, có 1 số liệu kèm nguồn”', '“Làm sao cho ổn”'], 1, 'Đo được, kiểm tra được.'),
      q('Sau khi Claude viết, có thể nhờ Claude?', ['Tự kiểm tra theo từng tiêu chí và sửa', 'Xóa cuộc trò chuyện', 'Viết dài gấp đôi'], 0, 'Claude tự rà lại theo danh sách.'),
      q('Claude nói đã đạt mọi tiêu chí. Em nên?', ['Tin ngay', 'Tự chấm lại theo danh sách', 'Bỏ tiêu chí'], 1, 'Tự kiểm tra có thể bỏ sót.'),
    ],
  },
  5: {
    minutes: '20–30 phút',
    steps: ['Dặn Claude hỏi lại khi thiếu thông tin.', 'Trả lời câu hỏi của Claude.', 'Dùng câu “hỏi tôi tối đa 3 câu trước khi làm”.', 'Biết khi nào nên tự cung cấp đủ thông tin.'],
    guided: {
      outcome: 'Dặn Claude hỏi lại em khi chưa rõ, thay vì tự đoán và làm sai.',
      analogy: 'Giống bác sĩ giỏi: hỏi em vài câu trước khi kê đơn, chứ không đoán bệnh rồi kê luôn.',
      walkthrough: [
        {title: 'Claude thường tự đoán', text: ['Nếu thiếu thông tin, Claude thường đoán cho đủ rồi làm luôn. Đoán sai thì em phải sửa nhiều.']},
        {title: 'Dặn Claude hỏi trước', text: ['Thêm một câu vào cuối yêu cầu.'], code: '“Trước khi làm, hãy hỏi tôi tối đa 3 câu về những gì còn chưa rõ.”', chat: [{who: 'you', text: 'Lập kế hoạch ôn thi Toán cho tôi. Trước khi làm, hỏi tôi tối đa 3 câu.'}, {who: 'claude', text: 'Bạn thi khi nào? Mỗi ngày ôn được bao lâu? Phần nào bạn thấy yếu nhất?'}]},
        {title: 'Trả lời rồi mới để Claude làm', text: ['Trả lời ngắn từng câu. Claude dùng câu trả lời của em để làm đúng ý.'], tip: 'Với việc nhỏ, rõ ràng thì không cần dặn hỏi lại, đỡ mất thời gian.'},
      ],
      lab: {type: 'sort', intro: 'Với mỗi yêu cầu, Claude nên hỏi lại trước hay đã đủ thông tin để làm?', groups: ['Nên hỏi lại trước', 'Đủ thông tin, làm luôn'],
        items: [
          {text: '“Lập kế hoạch ôn thi cho tôi.”', group: 'Nên hỏi lại trước', why: 'Thiếu: môn gì, thi khi nào, mỗi ngày bao lâu.'},
          {text: '“Sửa lỗi chính tả đoạn văn dưới đây.”', group: 'Đủ thông tin, làm luôn', why: 'Việc rõ ràng.'},
          {text: '“Viết bài phát biểu cho tôi.”', group: 'Nên hỏi lại trước', why: 'Phát biểu ở đâu, cho ai, bao lâu?'},
          {text: '“Dịch câu này sang tiếng Anh: Hôm nay trời đẹp.”', group: 'Đủ thông tin, làm luôn', why: 'Rõ ràng.'},
          {text: '“Gợi ý quà sinh nhật.”', group: 'Nên hỏi lại trước', why: 'Quà cho ai, bao nhiêu tiền, sở thích gì?'},
        ]},
    },
    quiz: [
      q('Câu nào giúp Claude hỏi lại trước khi làm?', ['“Làm luôn đi”', '“Trước khi làm, hỏi tôi tối đa 3 câu về điều chưa rõ”', '“Đừng hỏi gì”'], 1, 'Mời Claude hỏi thay vì đoán.'),
      q('Vì sao nên để Claude hỏi lại?', ['Tránh Claude đoán sai rồi phải sửa nhiều', 'Cho vui', 'Để chậm hơn'], 0, 'Hỏi trước đỡ sửa sau.'),
      q('Việc nào KHÔNG cần dặn hỏi lại?', ['Lập kế hoạch học cả học kỳ', 'Sửa lỗi chính tả một đoạn văn', 'Viết bài phát biểu'], 1, 'Việc nhỏ, rõ ràng thì làm luôn.'),
    ],
  },
  6: {
    minutes: '25–35 phút',
    steps: ['Đưa tài liệu và nói rõ tóm tắt cho ai, để làm gì.', 'Yêu cầu độ dài và các ý bắt buộc.', 'Yêu cầu chỉ dùng thông tin trong tài liệu.', 'Đối chiếu tóm tắt với tài liệu gốc.'],
    guided: {
      outcome: 'Nhờ Claude tóm tắt tài liệu đúng mục đích, và kiểm tra được bản tóm tắt có thêm hay bỏ sót gì không.',
      analogy: 'Tóm tắt giống kể lại bộ phim cho bạn trong 1 phút: phải giữ đúng những cảnh chính, không được bịa thêm cảnh không có trong phim.',
      walkthrough: [
        {title: 'Đưa tài liệu cho Claude', text: ['Dán văn bản, hoặc bấm ＋ để tải tệp (PDF, Word). Nói rõ tóm tắt để làm gì: “để ôn thi”, “để báo cáo cô chủ nhiệm”.'], screen: {highlight: 'plus', caption: 'Nút “＋” để đính kèm tệp cần tóm tắt.'}},
        {title: 'Yêu cầu tóm tắt tốt', text: ['Nói độ dài, các ý bắt buộc, và giới hạn nguồn.'], code: '“Tóm tắt biên bản họp dưới đây trong 5 gạch đầu dòng cho cô chủ nhiệm: các quyết định, người phụ trách, hạn chót. Chỉ dùng thông tin trong biên bản; chỗ nào không rõ thì ghi [chưa rõ].”'},
        {title: 'Đối chiếu với bản gốc', text: ['Đọc từng ý tóm tắt, tìm đúng chỗ đó trong tài liệu. Ý nào không tìm thấy là Claude tự thêm; ý quan trọng trong tài liệu mà tóm tắt không có là bỏ sót.']},
      ],
      lab: {type: 'sort', intro: 'Biên bản gốc: “Họp ngày 15/11. Quyết định: tổ chức Ngày hội tái chế ngày 30/11; Lan phụ trách truyền thông, hạn 22/11; Minh phụ trách hậu cần; kinh phí dự kiến 1,5 triệu, chờ thầy duyệt.” Claude tóm tắt các ý sau. Ý nào đúng, ý nào sai hoặc tự thêm?', groups: ['Đúng với biên bản', 'Sai hoặc tự thêm'],
        items: [
          {text: 'Ngày hội tái chế tổ chức ngày 30/11.', group: 'Đúng với biên bản', why: 'Có trong biên bản.'},
          {text: 'Lan phụ trách truyền thông, hạn 22/11.', group: 'Đúng với biên bản', why: 'Đúng.'},
          {text: 'Kinh phí 1,5 triệu đã được thầy duyệt.', group: 'Sai hoặc tự thêm', why: 'Biên bản ghi “chờ thầy duyệt”.'},
          {text: 'Minh phụ trách hậu cần, hạn 25/11.', group: 'Sai hoặc tự thêm', why: 'Biên bản không ghi hạn cho Minh; Claude tự thêm.'},
          {text: 'Ngày hội có 200 học sinh tham gia.', group: 'Sai hoặc tự thêm', why: 'Không có trong biên bản.'},
        ]},
    },
    quiz: [
      q('Câu nào giúp tóm tắt không bị bịa thêm?', ['“Chỉ dùng thông tin trong tài liệu, chỗ không rõ ghi [chưa rõ]”', '“Viết cho hay”', '“Thêm chi tiết cho sinh động”'], 0, 'Giới hạn nguồn và đánh dấu chỗ thiếu.'),
      q('Kiểm tra bản tóm tắt bằng cách?', ['Đối chiếu từng ý với tài liệu gốc', 'Đếm số chữ', 'Đọc tiêu đề'], 0, 'Tìm từng ý trong bản gốc.'),
      q('Tóm tắt ghi “đã duyệt” nhưng biên bản ghi “chờ duyệt”. Đây là?', ['Lỗi sai cần sửa', 'Chi tiết không quan trọng', 'Đúng'], 0, 'Thay đổi ý nghĩa quan trọng.'),
    ],
  },
  7: {
    minutes: '1 buổi',
    steps: ['Đánh dấu khẳng định cần kiểm chứng: số liệu, ngày, tên, trích dẫn.', 'Tìm nguồn chính thức, độc lập.', 'Ghi mức chắc chắn.', 'Sửa hoặc bỏ thông tin không kiểm chứng được.'],
    guided: {
      outcome: 'Biết thông tin nào trong câu trả lời của Claude phải kiểm chứng, và kiểm chứng bằng cách nào.',
      analogy: 'Kiểm chứng giống soát vé: không phải ai lên xe cũng sai, nhưng ai cũng phải đưa vé ra xem.',
      walkthrough: [
        {title: 'Cái gì cần kiểm chứng?', text: ['Số liệu, ngày tháng, tên người, tên sách, trích dẫn, quy định, thông tin sức khỏe, pháp luật. Những thứ này AI hay nhầm nhất.']},
        {title: 'Kiểm chứng thế nào?', text: ['Tìm trang chính thức (cơ quan nhà nước, trường, tổ chức uy tín) hoặc sách giáo khoa. Hỏi Claude nguồn, rồi tự mở nguồn đó xem có đúng không.'], tip: 'Claude có thể bịa cả tên sách và đường dẫn. Mở nguồn ra mới biết.'},
        {title: 'Ghi lại kết quả', text: ['Mỗi khẳng định: đúng / sai / chưa kiểm chứng được. Thông tin không kiểm chứng được thì bỏ, hoặc ghi rõ “chưa chắc chắn”.']},
      ],
      lab: {type: 'sort', intro: 'Claude trả lời về lịch sử trường em. Câu nào phải kiểm chứng trước khi đưa vào bài thuyết trình?', groups: ['Phải kiểm chứng', 'Có thể dùng ngay'],
        items: [
          {text: '“Trường thành lập năm 1975.”', group: 'Phải kiểm chứng', why: 'Năm tháng cụ thể, AI hay nhầm.'},
          {text: '“Thầy Nguyễn Văn A là hiệu trưởng đầu tiên.”', group: 'Phải kiểm chứng', why: 'Tên người cụ thể.'},
          {text: '“Một bài thuyết trình nên có mở đầu, thân bài, kết luận.”', group: 'Có thể dùng ngay', why: 'Lời khuyên chung, không phải dữ kiện.'},
          {text: '“Trường đạt giải nhất toàn quốc năm 2019.”', group: 'Phải kiểm chứng', why: 'Thành tích cụ thể cần nguồn.'},
          {text: '“Nên luyện nói trước gương.”', group: 'Có thể dùng ngay', why: 'Gợi ý chung.'},
        ]},
    },
    quiz: [
      q('Loại thông tin nào AI hay nhầm nhất?', ['Số liệu, ngày tháng, tên, trích dẫn', 'Lời chào', 'Dấu chấm câu'], 0, 'Luôn kiểm chứng những thứ này.'),
      q('Claude đưa tên một cuốn sách làm nguồn. Em nên?', ['Tìm xem sách có thật và có nội dung đó không', 'Ghi ngay vào bài', 'Bỏ qua'], 0, 'AI có thể bịa nguồn.'),
      q('Thông tin không kiểm chứng được thì?', ['Bỏ hoặc ghi rõ chưa chắc chắn', 'Ghi như sự thật', 'Đổi thành số tròn'], 0, 'Trung thực về mức chắc chắn.'),
    ],
  },
  8: {
    minutes: '25–35 phút',
    steps: ['Nói rõ người nhận và mục đích.', 'Đưa các thông tin bắt buộc.', 'Chọn giọng văn phù hợp.', 'Đọc lại, sửa bằng lời của em trước khi gửi.'],
    guided: {
      outcome: 'Nhờ Claude soạn email, thông báo đúng người nhận, đủ thông tin, rồi tự sửa lại trước khi gửi.',
      analogy: 'Claude giống người viết nháp giúp em: viết nhanh, câu chữ gọn, nhưng người ký tên và chịu trách nhiệm là em.',
      walkthrough: [
        {title: 'Cho Claude biết người nhận', text: ['Viết cho thầy hiệu trưởng khác viết cho bạn cùng lớp. Nói rõ người nhận, quan hệ, mục đích.']},
        {title: 'Đưa thông tin bắt buộc', text: ['Thời gian, địa điểm, việc cần người nhận làm, hạn chót. Claude không biết những thứ em không nói.'], code: '“Soạn thông báo gửi phụ huynh lớp 10A1: họp phụ huynh 8h thứ Bảy 22/11 tại phòng 204, nội dung kết quả giữa kỳ. Giọng lịch sự, dưới 120 chữ, có câu xin xác nhận tham dự.”'},
        {title: 'Đọc lại trước khi gửi', text: ['Kiểm tra ngày giờ, tên người, cách xưng hô. Sửa câu chữ cho giống cách em nói. Không gửi nguyên văn khi chưa đọc.']},
      ],
      lab: {type: 'brief', intro: 'Nhờ Claude soạn thông báo gửi các bạn trong CLB Môi trường về buổi thu gom giấy vụn.', sendLabel: '➤ Gửi yêu cầu (mô phỏng)', exampleLabel: 'Xem yêu cầu mẫu', resultTitle: 'Claude sẽ soạn thông báo gồm:', doneText: '✓ Đủ thông tin để Claude soạn đúng; nhớ đọc lại trước khi gửi.',
        fields: [
          {key: 'to', label: 'Gửi cho ai', placeholder: 'Ví dụ: các thành viên CLB Môi trường', minLen: 6, ask: 'Thông báo gửi cho ai?'},
          {key: 'info', label: 'Thông tin bắt buộc (thời gian, địa điểm, việc cần làm)', placeholder: 'Ví dụ: 7h sáng Chủ nhật 23/11, sân trường, mang giấy vụn…', minLen: 20, any: ['giờ', 'h', 'ngày', 'thứ', 'chủ nhật'], ask: 'Buổi thu gom diễn ra khi nào, ở đâu, mọi người cần làm gì?'},
          {key: 'tone', label: 'Giọng văn và độ dài', placeholder: 'Ví dụ: vui vẻ, dưới 100 chữ', minLen: 6, any: ['giọng', 'vui', 'lịch sự', 'thân', 'chữ', 'ngắn'], ask: 'Em muốn giọng thế nào, dài bao nhiêu?'},
          {key: 'cta', label: 'Em muốn người đọc làm gì', placeholder: 'Ví dụ: xác nhận tham gia trước thứ Sáu', minLen: 8, ask: 'Sau khi đọc, các bạn cần làm gì?'},
        ],
        example: {to: 'Các bạn khối 11 trong CLB Sách', info: '14h thứ Tư 26/11 tại thư viện, mang 1 cuốn sách muốn đổi.', tone: 'Giọng thân thiện, dưới 100 chữ.', cta: 'Bình luận “Tham gia” trước tối thứ Hai.'},
        plan: v => [`Gửi: ${v.to}`, `Thông tin: ${v.info}`, `Giọng văn: ${v.tone}`, `Kêu gọi: ${v.cta}`]},
    },
    quiz: [
      q('Viết thông báo cho phụ huynh, cần cho Claude biết?', ['Người nhận, thời gian, địa điểm, việc cần làm', 'Chỉ chủ đề', 'Không cần gì'], 0, 'Claude không biết điều em không nói.'),
      q('Trước khi gửi email Claude soạn, em nên?', ['Đọc lại, kiểm tra ngày giờ, tên, xưng hô', 'Gửi ngay', 'Gửi cho cả trường'], 0, 'Em chịu trách nhiệm nội dung gửi đi.'),
      q('Viết cho thầy hiệu trưởng và cho bạn cùng lớp thì?', ['Giọng văn khác nhau', 'Giống hệt nhau', 'Không quan trọng'], 0, 'Giọng văn theo người nhận.'),
    ],
  },
  9: {
    minutes: '30–40 phút',
    steps: ['Nhờ Claude gợi ý dàn ý, không viết hộ cả bài.', 'Sắp xếp ý theo trình tự hợp lý.', 'Tự chọn dẫn chứng của em.', 'Tự viết bài từ dàn ý.'],
    guided: {
      outcome: 'Dùng Claude để lập dàn ý cho bài viết, rồi tự viết bài bằng ý của em.',
      analogy: 'Dàn ý giống khung nhà: Claude có thể giúp dựng khung, nhưng tường, cửa, đồ đạc (ý tưởng, dẫn chứng, giọng văn) là của em.',
      walkthrough: [
        {title: 'Xin dàn ý, không xin cả bài', text: ['Bài viết để học thì em cần tự viết. Nhờ Claude gợi ý cấu trúc, câu hỏi gợi mở, còn nội dung em tự làm.'], code: '“Đề: Suy nghĩ về thói quen đọc sách của học sinh. Hãy gợi ý dàn ý 3 phần và 3 câu hỏi giúp tôi tìm dẫn chứng. KHÔNG viết thành bài.”'},
        {title: 'Sắp xếp ý', text: ['Mở bài: nêu vấn đề. Thân bài: thực trạng → nguyên nhân → hậu quả → giải pháp. Kết bài: bài học, liên hệ bản thân.']},
        {title: 'Dẫn chứng của em', text: ['Dẫn chứng từ trải nghiệm thật và nguồn em đã kiểm chứng làm bài có giá trị. Ghi chú phần nào có Claude hỗ trợ nếu giáo viên yêu cầu.']},
      ],
      lab: {type: 'order', intro: 'Sắp xếp các ý của dàn ý bài nghị luận “Thói quen đọc sách của học sinh” theo trình tự hợp lý.', items: ['Mở bài: nêu vấn đề đọc sách của học sinh hiện nay', 'Thực trạng: số giờ đọc sách ít, chủ yếu đọc trên mạng', 'Nguyên nhân: điện thoại, áp lực học thêm', 'Hậu quả: vốn từ nghèo, khó tập trung', 'Giải pháp: góc đọc lớp, 15 phút đọc mỗi ngày', 'Kết bài: bài học và liên hệ bản thân'], explain: 'Nêu vấn đề → thực trạng → nguyên nhân → hậu quả → giải pháp → kết luận.'},
    },
    quiz: [
      q('Khi viết bài để học, nên nhờ Claude?', ['Viết hộ cả bài', 'Gợi ý dàn ý và câu hỏi gợi mở', 'Chép bài mẫu'], 1, 'Em vẫn tự viết để học.'),
      q('Phần “Nguyên nhân” nên đứng ở đâu?', ['Sau thực trạng, trước hậu quả', 'Đầu tiên', 'Cuối bài'], 0, 'Trình tự lập luận hợp lý.'),
      q('Dẫn chứng tốt nhất là?', ['Trải nghiệm thật và nguồn đã kiểm chứng', 'Số liệu Claude bịa', 'Không cần dẫn chứng'], 0, 'Dẫn chứng phải có thật.'),
    ],
  },
  10: {
    minutes: '30–40 phút',
    steps: ['Phân biệt dữ kiện, nhận định, giả định.', 'Nhờ Claude phản biện ý kiến.', 'Yêu cầu quan điểm đối lập.', 'Tự kết luận bằng lý lẽ của em.'],
    guided: {
      outcome: 'Dùng Claude để soi một lập luận: đâu là dữ kiện, đâu là ý kiến, giả định nào chưa được chứng minh.',
      analogy: 'Phản biện giống thử tải một cây cầu: đặt thêm sức nặng ở nhiều chỗ để xem chỗ nào yếu, trước khi cho người đi qua.',
      walkthrough: [
        {title: 'Ba loại câu', text: ['Dữ kiện: kiểm chứng được (“Lớp có 40 học sinh”). Nhận định: ý kiến, đánh giá (“Học sinh lười đọc sách”). Giả định: điều được coi là đúng mà chưa chứng minh (“Ai dùng điện thoại nhiều đều đọc ít”).'], terms: {'Dữ kiện': 'điều kiểm chứng được', 'Nhận định': 'ý kiến, đánh giá của người nói', 'Giả định': 'điều được ngầm coi là đúng'}},
        {title: 'Nhờ Claude phản biện', text: ['“Hãy chỉ ra 3 giả định chưa được chứng minh trong lập luận sau và đưa một quan điểm đối lập có lý lẽ.”']},
        {title: 'Em là người kết luận', text: ['Claude đưa nhiều góc nhìn; em cân nhắc bằng chứng và tự viết kết luận của mình.']},
      ],
      lab: {type: 'sort', intro: 'Lập luận: “Lớp 10A1 có 40 học sinh. Khảo sát cho thấy 25 bạn đọc dưới 1 giờ mỗi tuần. Rõ ràng học sinh bây giờ lười. Ai dùng điện thoại nhiều thì đều đọc ít.” Xếp từng câu.', groups: ['Dữ kiện', 'Nhận định', 'Giả định chưa chứng minh'],
        items: [
          {text: '“Lớp 10A1 có 40 học sinh.”', group: 'Dữ kiện', why: 'Kiểm chứng được.'},
          {text: '“25 bạn đọc dưới 1 giờ mỗi tuần (theo khảo sát).”', group: 'Dữ kiện', why: 'Có số liệu khảo sát.'},
          {text: '“Học sinh bây giờ lười.”', group: 'Nhận định', why: 'Đánh giá, và chỉ dựa trên một lớp.'},
          {text: '“Ai dùng điện thoại nhiều thì đều đọc ít.”', group: 'Giả định chưa chứng minh', why: 'Chưa có bằng chứng, có thể đọc trên điện thoại.'},
          {text: '“Một lớp đại diện cho cả học sinh cả nước.”', group: 'Giả định chưa chứng minh', why: 'Ngầm coi là đúng nhưng chưa chứng minh.'},
        ]},
    },
    quiz: [
      q('“Học sinh bây giờ lười” là?', ['Dữ kiện', 'Nhận định', 'Số liệu'], 1, 'Là đánh giá, không phải dữ kiện.'),
      q('Nhờ Claude phản biện nên hỏi?', ['“Chỉ ra giả định chưa chứng minh và một quan điểm đối lập”', '“Khen bài tôi”', '“Viết dài hơn”'], 0, 'Tìm chỗ yếu của lập luận.'),
      q('Ai đưa ra kết luận cuối cùng?', ['Claude', 'Em, sau khi cân nhắc bằng chứng', 'Người viết dài nhất'], 1, 'AI đưa góc nhìn, em quyết định.'),
    ],
  },
  11: {
    minutes: '30–40 phút',
    steps: ['Nêu mục tiêu, thời hạn, nguồn lực.', 'Nhờ Claude chia việc, mốc thời gian.', 'Kiểm tra mỗi việc có người phụ trách và hạn.', 'Điều chỉnh cho thực tế.'],
    guided: {
      outcome: 'Cùng Claude lập kế hoạch cho một hoạt động: có việc cụ thể, người phụ trách, hạn chót và làm được thật.',
      analogy: 'Kế hoạch giống lịch tàu: không chỉ ghi “đi Hà Nội”, mà ghi rõ tàu nào, giờ nào, ai lái, dừng ở đâu.',
      walkthrough: [
        {title: 'Đưa đủ thông tin', text: ['Mục tiêu, ngày tổ chức, số người, kinh phí, những ai tham gia. Thiếu thông tin thì kế hoạch chung chung.'], code: '“Lập kế hoạch Ngày hội đọc sách ngày 29/11 cho 150 học sinh, kinh phí 1 triệu, ban tổ chức 6 bạn. Bảng gồm: việc, người phụ trách, hạn chót, cách kiểm tra đã xong.”'},
        {title: 'Kiểm tra kế hoạch', text: ['Mỗi việc phải có người phụ trách và hạn. Việc phụ thuộc nhau (in giấy mời cần chốt ngày giờ) phải đúng thứ tự. Tổng chi không vượt kinh phí.']},
        {title: 'Sửa cho thực tế', text: ['Claude không biết lịch học của các bạn. Em điều chỉnh hạn chót, người phụ trách cho hợp.']},
      ],
      lab: {type: 'plan', intro: 'Claude đề xuất kế hoạch Ngày hội đọc sách. Duyệt từng dòng.', labels: {taskLabel: 'Hoạt động', item: 'Dòng', approve: 'Chốt kế hoạch', hint: 'Giữ dòng hợp lý, hỏi lại dòng còn thiếu, bỏ dòng không thực tế.', success: '✓ Kế hoạch rõ ràng, làm được thật.'}, task: 'Ngày hội đọc sách 29/11, 150 học sinh, kinh phí 1 triệu, ban tổ chức 6 bạn',
        steps: [
          {text: 'Làm poster – Lan – hạn 20/11.', ok: ['keep'], why: 'Có người phụ trách và hạn.'},
          {text: 'Mời tác giả nổi tiếng – hạn 28/11 – chi phí 5 triệu.', ok: ['remove', 'ask'], why: 'Vượt kinh phí 1 triệu và hạn quá sát ngày.'},
          {text: 'Chuẩn bị gian đổi sách – (chưa có người phụ trách).', ok: ['ask'], why: 'Thiếu người phụ trách; hỏi lại để phân công.'},
          {text: 'In giấy mời – Minh – hạn 18/11 (sau khi chốt ngày giờ 15/11).', ok: ['keep'], why: 'Đúng thứ tự, có người và hạn.'},
          {text: 'Tổng kết, đếm số người tham gia – Hà – hạn 30/11.', ok: ['keep'], why: 'Có cách kiểm tra kết quả.'},
        ]},
    },
    quiz: [
      q('Mỗi việc trong kế hoạch cần có?', ['Người phụ trách và hạn chót', 'Hình minh họa', 'Chữ in đậm'], 0, 'Không có người và hạn thì không ai làm.'),
      q('Claude đề xuất việc tốn 5 triệu khi kinh phí 1 triệu. Em nên?', ['Giữ nguyên', 'Bỏ hoặc hỏi lại phương án rẻ hơn', 'Tăng kinh phí tùy ý'], 1, 'Kế hoạch phải làm được thật.'),
      q('Vì sao em phải chỉnh lại kế hoạch Claude lập?', ['Claude không biết lịch và hoàn cảnh thật của nhóm', 'Claude luôn sai', 'Cho đẹp'], 0, 'Em hiểu thực tế hơn.'),
    ],
  },
  12: {
    minutes: '30–40 phút',
    steps: ['Dùng Projects để lưu tài liệu nền và hướng dẫn.', 'Hỏi cụ thể, chỉ rõ phần của tài liệu.', 'Yêu cầu trích đúng đoạn làm căn cứ.', 'Kiểm tra đoạn trích trong tài liệu gốc.'],
    guided: {
      outcome: 'Làm việc với tài liệu dài (sách, quy chế, đề cương) mà Claude vẫn trả lời đúng chỗ, có trích dẫn kiểm tra được.',
      analogy: 'Hỏi về tài liệu dài giống hỏi thủ thư: “sách ở đâu?” thì khó trả lời; “chương 3 nói gì về quang hợp, đọc giúp tôi đoạn đó” thì trả lời ngay và chính xác.',
      walkthrough: [
        {title: 'Projects: chỗ để tài liệu nền', text: ['Tạo một Project, thêm tài liệu (đề cương, sách, quy chế) và hướng dẫn riêng. Mọi cuộc trò chuyện trong Project đều dùng các tài liệu này.'], screen: {highlight: 'projects', caption: 'Mục “📁 Projects” ở cột trái.'}, terms: {'Project': 'nơi gom tài liệu, hướng dẫn và các cuộc trò chuyện của một việc'}},
        {title: 'Hỏi cụ thể, đòi trích dẫn', text: ['Chỉ rõ chương, mục. Yêu cầu Claude trích nguyên văn đoạn làm căn cứ.'], code: 'Mơ hồ: “Tài liệu nói gì?”\nCụ thể: “Theo quy chế, mục 3, học sinh vắng bao nhiêu buổi thì bị nhắc nhở? Trích nguyên văn câu trong quy chế.”'},
        {title: 'Kiểm tra đoạn trích', text: ['Tìm đúng câu trích trong tài liệu gốc (Ctrl+F). Không tìm thấy thì câu trả lời chưa đáng tin.']},
      ],
      lab: {type: 'sort', intro: 'Em có quy chế học sinh 40 trang trong Project. Câu hỏi nào tốt, câu nào mơ hồ?', groups: ['Câu hỏi tốt', 'Câu hỏi mơ hồ'],
        items: [
          {text: '“Mục 3.2 quy định gì về đồng phục? Trích nguyên văn.”', group: 'Câu hỏi tốt', why: 'Chỉ rõ mục và đòi trích dẫn.'},
          {text: '“Tóm tắt hết đi.”', group: 'Câu hỏi mơ hồ', why: 'Không rõ để làm gì, dài bao nhiêu.'},
          {text: '“Vắng bao nhiêu buổi thì bị nhắc nhở? Ghi rõ số mục.”', group: 'Câu hỏi tốt', why: 'Cụ thể, kiểm tra được.'},
          {text: '“Quy chế có gì hay?”', group: 'Câu hỏi mơ hồ', why: 'Không rõ cần thông tin gì.'},
          {text: '“Liệt kê 5 hành vi bị cấm và số mục tương ứng.”', group: 'Câu hỏi tốt', why: 'Rõ số lượng và nguồn.'},
        ]},
    },
    quiz: [
      q('Projects trong Claude dùng để?', ['Lưu tài liệu nền và hướng dẫn cho một việc', 'Xóa tài liệu', 'Gửi email'], 0, 'Mọi cuộc trò chuyện trong Project dùng chung tài liệu.'),
      q('Câu hỏi nào tốt với tài liệu dài?', ['“Nói gì?”', '“Mục 3 quy định gì về đồng phục? Trích nguyên văn.”', '“Có hay không?”'], 1, 'Cụ thể và có trích dẫn.'),
      q('Claude trích một câu nhưng em tìm không thấy trong tài liệu. Kết luận?', ['Câu trả lời chưa đáng tin', 'Tài liệu sai', 'Không sao'], 0, 'Có thể là trích sai hoặc bịa.'),
    ],
  },
  13: {
    minutes: '30–40 phút',
    steps: ['Liệt kê tiêu chí chấm.', 'Mô tả từng mức (chưa đạt, đạt, tốt).', 'Nhờ Claude đề xuất, em chỉnh lại.', 'Thử chấm 2 bài mẫu.'],
    guided: {
      outcome: 'Cùng Claude tạo bảng tiêu chí (rubric) để tự chấm bài hoặc chấm chéo trong nhóm cho công bằng.',
      analogy: 'Rubric giống thang điểm của ban giám khảo: ai chấm cũng nhìn cùng một bảng, nên kết quả công bằng hơn “thấy hay thì cho điểm cao”.',
      walkthrough: [
        {title: 'Rubric là gì?', text: ['Bảng gồm các tiêu chí (nội dung, trình bày, dẫn chứng…) và mô tả từng mức điểm. Người chấm so bài với mô tả để cho điểm.'], terms: {'Rubric': 'bảng tiêu chí chấm, có mô tả từng mức'}},
        {title: 'Nhờ Claude soạn', text: ['“Tạo rubric chấm bài thuyết trình 5 phút của học sinh lớp 10: 4 tiêu chí, mỗi tiêu chí 3 mức, mô tả ngắn, đo được.” Sau đó em sửa cho hợp yêu cầu của cô.']},
        {title: 'Thử chấm', text: ['Chấm 2 bài mẫu bằng rubric, so điểm với bạn. Lệch nhiều thì sửa mô tả cho rõ.']},
      ],
      lab: {type: 'brief', intro: 'Soạn rubric chấm bài thuyết trình nhóm. Mỗi ô là một tiêu chí, ghi mô tả mức “Đạt”.', sendLabel: '📋 Tạo rubric (mô phỏng)', exampleLabel: 'Xem rubric mẫu', resultTitle: 'Rubric (mức Đạt):', doneText: '✓ Rubric có tiêu chí đo được, chấm công bằng hơn.',
        fields: [
          {key: 'content', label: 'Tiêu chí 1 – Nội dung', placeholder: 'Ví dụ: nêu đủ vấn đề, nguyên nhân, giải pháp…', minLen: 15, ask: 'Nội dung thế nào thì đạt?'},
          {key: 'evidence', label: 'Tiêu chí 2 – Dẫn chứng', placeholder: 'Ví dụ: ít nhất 2 số liệu có nguồn…', minLen: 12, any: ['nguồn', 'số liệu', 'dẫn chứng', 'ví dụ', '1', '2', '3'], ask: 'Cần bao nhiêu dẫn chứng, có nguồn không?'},
          {key: 'delivery', label: 'Tiêu chí 3 – Trình bày', placeholder: 'Ví dụ: đúng 5 phút, không đọc slide…', minLen: 12, any: ['phút', 'slide', 'nói', 'giọng'], ask: 'Trình bày thế nào thì đạt: thời gian, cách nói?'},
          {key: 'team', label: 'Tiêu chí 4 – Làm việc nhóm', placeholder: 'Ví dụ: mỗi bạn trình bày một phần…', minLen: 12, ask: 'Làm việc nhóm thế nào thì đạt?'},
        ],
        example: {content: 'Bài viết nêu rõ luận điểm chính và có kết luận gắn với đề.', evidence: 'Có ít nhất 2 dẫn chứng, 1 số liệu có nguồn.', delivery: 'Trình bày trong 3 phút, nói rõ, không đọc nguyên văn slide.', team: 'Mỗi thành viên phụ trách và trình bày một phần.'},
        plan: v => [`Nội dung: ${v.content}`, `Dẫn chứng: ${v.evidence}`, `Trình bày: ${v.delivery}`, `Làm việc nhóm: ${v.team}`]},
    },
    quiz: [
      q('Rubric giúp gì?', ['Chấm công bằng, ai cũng dùng cùng tiêu chí', 'Làm bài dài hơn', 'Thay giáo viên'], 0, 'Cùng một thang đo.'),
      q('Mô tả mức điểm tốt là?', ['“Bài hay”', '“Có ít nhất 2 số liệu có nguồn”', '“Cố gắng”'], 1, 'Đo được.'),
      q('Hai bạn chấm cùng bài lệch nhiều điểm. Nên?', ['Sửa mô tả tiêu chí cho rõ hơn', 'Lấy điểm cao hơn', 'Bỏ rubric'], 0, 'Mô tả mơ hồ gây lệch điểm.'),
    ],
  },
  14: {
    minutes: '30–40 phút',
    steps: ['Đưa dữ liệu cho Claude, hỏi câu cụ thể.', 'Đọc nhận xét của Claude.', 'Kiểm tra lại con số bằng công thức.', 'Ghi kết luận có giới hạn.'],
    guided: {
      outcome: 'Nhờ Claude đọc bảng số liệu và nhận xét, rồi tự kiểm tra lại các con số bằng công thức.',
      analogy: 'Claude đọc số liệu giống bạn đọc nhanh bảng điểm rồi nói “trung bình tầm 7,5”. Nghe hợp lý, nhưng muốn chắc thì phải bấm máy tính.',
      walkthrough: [
        {title: 'Nhờ Claude phân tích', text: ['Dán bảng hoặc tải tệp Excel, hỏi cụ thể: “Điểm trung bình bao nhiêu? Bạn nào cao nhất? Có bao nhiêu bạn từ 8 trở lên?”'], sheet: {cols: 6, rows: 9, cells: scoreCells(), caption: 'Bảng điểm 8 bạn (giả lập).'}},
        {title: 'Claude có thể tính nhầm', text: ['Claude trả lời: “Trung bình 7,8; cao nhất 9,5 (Chi); 3 bạn từ 8 trở lên.” Nghe hợp lý, nhưng có câu sai. Hãy tự tính lại ở phần Thực hành.'], chat: [{who: 'claude', text: 'Điểm trung bình khoảng 7,8. Cao nhất là Chi với 9,5. Có 3 bạn từ 8 điểm trở lên.'}]},
        {title: 'Kết luận có giới hạn', text: ['8 bạn là mẫu nhỏ; số liệu giả lập. Ghi rõ giới hạn khi kết luận.'], tip: 'Với phép tính, tin công thức Excel hơn tin lời AI.'},
      ],
      lab: {type: 'sheet', intro: 'Kiểm tra lại nhận xét của Claude bằng công thức. Câu nào của Claude sai?',
        sheet: {cols: 6, rows: 9, cells: scoreCells(), tasks: [
          {cell: 'D2', answer: '=AVERAGE(B2:B9)', prompt: 'Ở D2, tính điểm trung bình thật.', mustUse: ['AVERAGE'], expect: avg, hint: '=AVERAGE(B2:B9)', explain: 'Trung bình là 7,625 chứ không phải 7,8 như Claude nói.'},
          {cell: 'E2', answer: '=MAX(B2:B9)', prompt: 'Ở E2, tìm điểm cao nhất.', mustUse: ['MAX'], expect: 9.5, hint: '=MAX(B2:B9)', explain: 'Cao nhất 9,5: Claude nói đúng câu này.'},
          {cell: 'F2', answer: '=COUNTIF(B2:B9,">=8")', prompt: 'Ở F2, đếm số bạn từ 8 điểm trở lên.', mustUse: ['COUNTIF'], expect: 4, hint: '=COUNTIF(B2:B9,">=8")', explain: 'Có 4 bạn (An, Chi, Em, Khoa), Claude nói 3 là sai.'},
        ]}},
    },
    quiz: [
      q('Claude nói “trung bình 7,8”. Cách chắc chắn nhất để kiểm tra?', ['Tính lại bằng công thức', 'Hỏi lại Claude lần nữa', 'Tin luôn'], 0, 'Công thức cho kết quả chính xác.'),
      q('Kết luận từ 8 bạn nên?', ['Ghi rõ đây là mẫu nhỏ', 'Áp dụng cho cả trường', 'Bỏ số liệu'], 0, 'Nêu giới hạn của dữ liệu.'),
      q('Với phép tính trên bảng số liệu, nên tin?', ['Công thức Excel', 'Lời đoán nhanh của AI', 'Số tròn cho đẹp'], 0, 'AI có thể tính nhầm.'),
    ],
  },
};
