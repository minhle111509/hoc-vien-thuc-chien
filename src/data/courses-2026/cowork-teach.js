// Guided (beginner) version of three Claude Cowork lessons — same trial format as the Office lessons.
// Facts from the Claude Help Center (Cowork, approval modes, scheduled tasks), November 2026.
// Learners without a paid plan practise in the simulations on the page.

const PLAN_EXAMPLE = ['Đọc 20 tệp Word trong thư mục DangKy', 'Lấy họ tên, lớp, môn ngoại khóa của từng bạn', 'Tạo bảng Excel DangKy_NgoaiKhoa.xlsx', 'Kiểm tra trùng tên và ô còn trống', 'Báo lại kết quả và những chỗ chưa chắc chắn'];

export const COWORK_TEACH = {
  1: {
    minutes: '25–35 phút',
    steps: ['Phân biệt hỏi–đáp (chat) với giao trọn việc (Cowork).', 'Biết Cowork làm theo 4 bước: hiểu việc, lập kế hoạch, làm, trả kết quả.', 'Nhận ra các phần trên màn hình: ô mô tả, nút +, thư mục, chế độ duyệt.', 'Chọn đúng việc nên giao cho Cowork.'],
    guided: {
      outcome: 'Hiểu Claude Cowork khác trò chuyện thường ở đâu, và biết việc nào nên giao cho Cowork, việc nào nên tự làm.',
      analogy: 'Trò chuyện với Claude giống hỏi bài một bạn giỏi: em hỏi câu nào, bạn trả lời câu đó. Cowork giống nhờ một bạn trợ lý làm hộ cả một việc: em dặn rõ, bạn tự lên kế hoạch, làm từng bước và mang kết quả về cho em kiểm tra.',
      walkthrough: [
        {title: 'Hỏi–đáp và giao việc khác nhau thế nào?', text: ['Khi trò chuyện (chat), em hỏi một câu, Claude trả lời một câu. Muốn làm tiếp, em phải hỏi tiếp.', 'Với Cowork, em giao một việc trọn gói. Claude tự chia thành nhiều bước, tự đọc tệp, tự tạo tệp kết quả và báo lại khi xong.'], chat: [{who: 'you', text: 'Tổng hợp 20 phiếu đăng ký trong thư mục DangKy thành một bảng Excel giúp mình.'}, {who: 'claude', text: 'Tôi sẽ đọc 20 tệp, lấy họ tên, lớp, môn đăng ký, tạo bảng Excel và kiểm tra trùng tên. Đây là kế hoạch, em duyệt nhé?'}], terms: {'Chat': 'trò chuyện hỏi–đáp từng câu', 'Cowork': 'chế độ để Claude nhận cả một việc và tự làm nhiều bước', 'Tác tử (agent)': 'AI tự lập kế hoạch và tự thực hiện nhiều bước để đạt mục tiêu'}},
        {title: 'Cowork làm việc qua 4 bước', text: ['1) Hiểu việc em giao. 2) Lập kế hoạch và cho em xem. 3) Làm: đọc tệp, chạy chương trình trong một “máy ảo” riêng, dùng các ứng dụng đã kết nối. 4) Trả kết quả vào thư mục và báo lại.', 'Trong lúc Claude làm, em vẫn xem được tiến độ, trả lời câu hỏi và dừng lại nếu thấy sai hướng.'], terms: {'Kế hoạch': 'danh sách các bước Claude định làm, em được xem và sửa trước', 'Máy ảo (VM)': 'một “phòng riêng” tách khỏi máy tính của em, nơi Claude chạy chương trình', 'Kết nối (connector)': 'cầu nối để Claude dùng Gmail, Lịch, Drive… khi em cho phép'}},
        {title: 'Màn hình Cowork gồm những gì?', text: ['Ô mô tả: nơi em viết việc cần làm. Nút ＋: thêm kết nối và skills. Ô thư mục: chọn thư mục Claude được làm việc. Ô chế độ: chọn khi nào Claude phải hỏi em trước.', 'Cột bên trái có Việc mới, Projects (nhóm việc theo dự án) và Scheduled (việc chạy theo lịch).'], screen: {highlight: 'new', caption: 'Bấm “＋ Việc mới”, mô tả việc ở ô giữa, chọn thư mục và chế độ ở hàng dưới.'}},
        {title: 'Ai chịu trách nhiệm?', text: ['Claude có thể hiểu sai hoặc làm sai. Vì vậy em luôn đọc kế hoạch trước khi duyệt và kiểm tra kết quả trước khi dùng.', 'Cowork cần gói Claude trả phí (Pro trở lên). Nếu chưa có, em vẫn học được đầy đủ bằng các phần mô phỏng trong bài.'], tip: 'Coi Claude như một bạn trợ lý mới vào: giỏi, nhanh, nhưng em vẫn phải dặn rõ và kiểm tra lại.'},
        {title: 'Việc nào nên giao cho Cowork?', text: ['Nên giao: việc nhiều bước, nhiều tệp, mất thời gian, có kết quả kiểm tra được. Ví dụ gộp nhiều tệp thành một bảng, soạn báo cáo từ nhiều nguồn.', 'Không nên giao: câu hỏi nhanh (dùng chat là đủ), việc em cần tự làm để học, việc có dữ liệu cá nhân nhạy cảm, việc gửi hay xóa thứ quan trọng mà chưa ai duyệt.']},
      ],
      lab: {type: 'sort', intro: 'Xếp mỗi việc dưới đây vào nhóm phù hợp: hỏi nhanh bằng Chat, giao cho Cowork, hay em tự làm.',
        groups: ['Hỏi nhanh (Chat)', 'Giao việc (Cowork)', 'Tự làm'],
        items: [
          {text: 'Hỏi “quang hợp là gì?” để ôn bài.', group: 'Hỏi nhanh (Chat)', why: 'Một câu hỏi, một câu trả lời: chat là đủ.'},
          {text: 'Gộp 20 phiếu đăng ký Word thành một bảng Excel và kiểm tra trùng tên.', group: 'Giao việc (Cowork)', why: 'Nhiều tệp, nhiều bước, kết quả kiểm tra được.'},
          {text: 'Viết bài văn nghị luận để nộp kiểm tra.', group: 'Tự làm', why: 'Bài kiểm tra là để em luyện kỹ năng; nhờ AI làm hộ là gian lận.'},
          {text: 'Mỗi sáng thứ Hai tóm tắt lịch tuần và việc còn tồn của CLB.', group: 'Giao việc (Cowork)', why: 'Việc lặp lại, nhiều nguồn, hợp để giao (và có thể đặt lịch).'},
          {text: 'Giải thích nghĩa của một từ tiếng Anh.', group: 'Hỏi nhanh (Chat)', why: 'Hỏi nhanh, không cần tác tử làm nhiều bước.'},
          {text: 'Viết thư xin lỗi thầy chủ nhiệm.', group: 'Tự làm', why: 'Lời xin lỗi cần thật lòng, bằng lời của chính em.'},
        ]},
    },
    quiz: [
      {q: 'Điểm khác chính giữa Cowork và trò chuyện thường?', options: ['Cowork viết chữ đẹp hơn', 'Cowork nhận trọn một việc, tự lập kế hoạch và làm nhiều bước', 'Cowork không cần Internet'], answer: 1, why: 'Chat trả lời từng câu; Cowork là tác tử làm cả việc.'},
      {q: 'Trước khi Claude bắt đầu làm, em nên làm gì?', options: ['Đọc và duyệt kế hoạch Claude đề xuất', 'Tắt máy tính', 'Không cần làm gì'], answer: 0, why: 'Kế hoạch cho em biết Claude định làm gì để sửa kịp thời.'},
      {q: 'Việc nào KHÔNG nên giao cho Cowork?', options: ['Gộp nhiều tệp thành một bảng', 'Tổng hợp báo cáo từ nhiều nguồn', 'Làm bài kiểm tra mà giáo viên yêu cầu tự làm'], answer: 2, why: 'Việc cần tự làm để học thì không giao cho AI.'},
    ],
  },
  3: {
    minutes: '30–40 phút',
    steps: ['Viết mục tiêu: để làm gì, cho ai.', 'Nêu đầu vào: tệp, thư mục nào.', 'Nêu đầu ra: định dạng, nơi lưu.', 'Ghi điều không được làm và khi nào là xong.'],
    guided: {
      outcome: 'Viết được một bản giao việc rõ ràng để Claude làm đúng ngay lần đầu, không phải hỏi lại nhiều lần.',
      analogy: 'Giao việc cho Claude giống nhờ một bạn mới vào CLB. Nếu chỉ nói “làm cái báo cáo đi”, bạn ấy sẽ hỏi lại: báo cáo gì, lấy số liệu ở đâu, nộp kiểu gì, khi nào xong? Nói rõ ngay từ đầu thì bạn làm đúng luôn.',
      walkthrough: [
        {title: 'Giao việc mơ hồ thì sao?', text: ['Nếu em chỉ viết một câu ngắn, Claude phải đoán rất nhiều thứ. Đoán sai thì kết quả lệch ý em, hoặc Claude làm cả những việc em không muốn.'], chat: [{who: 'you', text: 'Làm báo cáo đăng ký ngoại khóa.'}, {who: 'claude', text: 'Báo cáo này cho ai đọc? Dữ liệu nằm ở thư mục nào? Em muốn bảng Excel hay văn bản Word? Tôi có được gửi cho ai không?'}]},
        {title: '5 phần của một bản giao việc', text: ['1) Mục tiêu: làm việc này để làm gì, cho ai. 2) Đầu vào: dữ liệu ở tệp, thư mục nào. 3) Đầu ra: em muốn nhận cái gì, định dạng gì, lưu ở đâu. 4) Điều không được làm. 5) Khi nào là xong.', 'Không cần viết dài. Mỗi phần một hai câu là đủ.'], terms: {'Đầu vào': 'những gì Claude dùng để làm việc: tệp, thư mục, thông tin em đưa', 'Đầu ra': 'thứ em nhận lại: bảng, báo cáo, slide…', 'Tiêu chí xong': 'dấu hiệu để biết việc đã làm đủ và đúng'}},
        {title: 'Ví dụ tốt và chưa tốt', text: ['Chưa tốt: “Tổng hợp phiếu đăng ký.”', 'Tốt: “Mục tiêu: cô chủ nhiệm cần danh sách đăng ký ngoại khóa. Đầu vào: 20 tệp Word trong thư mục DangKy. Đầu ra: bảng Excel gồm họ tên, lớp, môn, lưu trong thư mục KetQua. Không xóa hay sửa tệp gốc, không gửi cho ai. Xong khi đủ 20 bạn và đã đánh dấu bạn nào đăng ký trùng.”']},
        {title: 'Chọn đúng thư mục', text: ['Trong Cowork, em chọn thư mục Claude được làm việc ở ô thư mục dưới khung mô tả. Chỉ chọn thư mục cần cho việc này, đừng chọn cả ổ đĩa.', 'Nên sao lưu thư mục trước khi giao việc, phòng khi có gì sai.'], screen: {highlight: 'folder', caption: 'Ô “📂 Thư mục”: chọn đúng thư mục chứa dữ liệu của việc này.'}, tip: 'Thư mục có giấy tờ cá nhân (căn cước, học bạ…) thì không chọn.'},
        {title: 'Dặn Claude khi nào phải hỏi lại', text: ['Thêm một câu như: “Nếu thiếu dữ liệu hoặc không chắc, hãy hỏi tôi trước, đừng tự đoán.”', 'Câu này giúp Claude dừng lại đúng lúc thay vì tự bịa thông tin cho đủ.']},
      ],
      lab: {type: 'brief', intro: 'Tình huống: cô chủ nhiệm nhờ em dùng Cowork tổng hợp phiếu đăng ký ngoại khóa của lớp (các tệp Word trong thư mục DangKy). Viết bản giao việc gồm 5 phần, rồi gửi cho Claude mô phỏng. Nếu thiếu, Claude sẽ hỏi lại.',
        fields: [
          {key: 'goal', label: '1. Mục tiêu (để làm gì, cho ai)', placeholder: 'Ví dụ: cô chủ nhiệm cần danh sách…', minLen: 15, ask: 'Kết quả này dùng để làm gì, ai sẽ đọc?'},
          {key: 'input', label: '2. Đầu vào (tệp, thư mục nào)', placeholder: 'Ví dụ: các tệp Word trong thư mục…', minLen: 8, any: ['thư mục', 'tệp', 'file', 'folder', 'phiếu', '.docx', 'word'], ask: 'Tôi lấy dữ liệu ở đâu? Thư mục hay tệp nào?'},
          {key: 'output', label: '3. Đầu ra (làm ra cái gì, định dạng, lưu ở đâu)', placeholder: 'Ví dụ: bảng Excel gồm các cột…, lưu trong thư mục…', minLen: 10, any: ['excel', 'word', 'pdf', 'slide', 'bảng', 'báo cáo', '.xlsx', '.docx', 'danh sách', 'tệp'], ask: 'Em muốn nhận kết quả dạng gì: bảng Excel, văn bản Word hay slide? Lưu ở đâu?'},
          {key: 'limits', label: '4. Điều không được làm', placeholder: 'Ví dụ: không xóa tệp gốc, không gửi cho ai…', minLen: 8, any: ['không', 'đừng', 'cấm', 'chỉ được'], ask: 'Có việc gì tôi không được làm không? Ví dụ xóa tệp gốc, gửi cho người khác?'},
          {key: 'done', label: '5. Khi nào là xong', placeholder: 'Ví dụ: đủ 20 bạn, đã kiểm tra trùng tên…', minLen: 8, any: ['khi', 'đủ', 'khớp', 'đúng', 'tất cả', 'mỗi', 'kiểm tra', '1', '2', '3', '4', '5', '6', '7', '8', '9'], ask: 'Làm sao tôi biết là đã xong? Ví dụ: đủ bao nhiêu bạn, cần kiểm tra gì?'},
        ],
        example: {goal: 'Ban cán sự cần bảng điểm thi đua tháng 11 để báo cáo cô chủ nhiệm.', input: '4 tệp Excel điểm thi đua từng tuần trong thư mục ThiDua.', output: 'Một bảng Excel ThiDua_Thang11.xlsx: mỗi lớp một dòng, có điểm 4 tuần và tổng, lưu trong thư mục KetQua.', limits: 'Không sửa hay xóa 4 tệp gốc, không gửi cho ai, không tự thêm nhận xét về lớp.', done: 'Đủ 12 lớp, tổng mỗi tuần khớp tệp gốc, có ghi chú chỗ nào thiếu dữ liệu.'},
        plan: v => [`Đọc dữ liệu: ${v.input}`, `Mục tiêu: ${v.goal}`, `Tạo kết quả: ${v.output}`, `Tự kiểm tra trước khi báo xong: ${v.done}`, `Tuân thủ giới hạn: ${v.limits}`, 'Báo lại cho em kèm danh sách chỗ chưa chắc chắn'],
      },
    },
    quiz: [
      {q: 'Bản giao việc nào giúp Claude làm đúng ngay?', options: ['“Làm báo cáo đi.”', '“Làm nhanh giúp mình nhé.”', '“Từ 20 tệp Word trong DangKy, tạo bảng Excel họ tên–lớp–môn, lưu ở KetQua, không xóa tệp gốc, xong khi đủ 20 bạn.”'], answer: 2, why: 'Có đủ mục tiêu, đầu vào, đầu ra, giới hạn, tiêu chí xong.'},
      {q: '“Không xóa tệp gốc, không gửi cho ai” thuộc phần nào?', options: ['Đầu vào', 'Điều không được làm', 'Mục tiêu'], answer: 1, why: 'Đây là giới hạn để Claude không làm việc ngoài ý em.'},
      {q: 'Nên chọn thư mục nào cho Cowork?', options: ['Chỉ thư mục chứa dữ liệu của việc này, đã sao lưu', 'Cả ổ đĩa C cho tiện', 'Thư mục có giấy tờ cá nhân'], answer: 0, why: 'Cho quyền vừa đủ giúp hạn chế thiệt hại nếu có sai sót.'},
    ],
  },
  4: {
    minutes: '30–40 phút',
    steps: ['Đọc kế hoạch Claude đề xuất trước khi duyệt.', 'Tìm “đèn đỏ”: gửi, xóa, đăng, chia sẻ, ghi đè.', 'Bỏ bước thừa so với yêu cầu, hỏi lại bước chưa rõ.', 'Theo dõi khi Claude làm và kiểm tra kết quả.'],
    guided: {
      outcome: 'Đọc kế hoạch Claude đưa ra, giữ bước cần thiết, chặn bước nguy hiểm hoặc thừa trước khi cho Claude làm.',
      analogy: 'Duyệt kế hoạch giống xem lộ trình trên bản đồ trước khi lên xe. Thấy đường đi vòng hay đi qua chỗ nguy hiểm thì sửa ngay từ đầu, đừng đợi đến nơi mới biết.',
      walkthrough: [
        {title: 'Kế hoạch nằm ở đâu?', text: ['Sau khi em giao việc, Claude trình bày kế hoạch: danh sách các bước định làm. Em có thể Duyệt, Sửa hoặc Hủy.', 'Đây là lúc rẻ nhất để sửa sai: chưa có gì bị thay đổi.'], screen: {highlight: 'plan', plan: PLAN_EXAMPLE, caption: 'Khung “Kế hoạch của Claude” hiện ra trước khi Claude bắt đầu làm.'}, terms: {'Duyệt': 'đồng ý cho Claude làm theo kế hoạch'}},
        {title: 'Tìm “đèn đỏ” và “đèn xanh”', text: ['Đèn đỏ là các bước có hậu quả khó quay lại: gửi (thư, tin nhắn), xóa, đăng lên mạng, chia sẻ, ghi đè tệp gốc, mua, thanh toán.', 'Đèn xanh là các bước an toàn: đọc tệp, tạo tệp mới, lưu bản nháp, tự kiểm tra.'], terms: {'Ghi đè': 'lưu đè lên tệp cũ, làm mất nội dung cũ'}, tip: 'Đọc động từ đầu mỗi bước: “Đọc…”, “Tạo…” thường an toàn; “Gửi…”, “Xóa…” phải dừng lại nghĩ.'},
        {title: 'Ba lựa chọn cho mỗi bước', text: ['✓ Giữ: bước cần thiết và an toàn.', '? Hỏi lại: bước chưa rõ, ví dụ “gửi cho ai?”.', '✗ Bỏ: bước nguy hiểm hoặc em không hề yêu cầu.']},
        {title: 'Bước thừa cũng là vấn đề', text: ['Có khi Claude thêm việc “cho chu đáo” mà em không yêu cầu, như tự viết nhận xét về một lớp hay tự gửi kết quả đi. Bước thừa có thể gây hiểu lầm hoặc làm tổn thương người khác.', 'Nguyên tắc: kế hoạch chỉ nên có những bước phục vụ đúng việc em giao.']},
        {title: 'Duyệt xong vẫn phải theo dõi', text: ['Trong lúc Claude làm, em xem được tiến độ và có thể dừng bất cứ lúc nào. Khi xong, mở tệp kết quả kiểm tra vài con số với tệp gốc.', 'Claude báo “đã xong” chưa có nghĩa là đúng hoàn toàn.']},
      ],
      lab: {type: 'plan', intro: 'Claude đề xuất kế hoạch dưới đây. Với mỗi bước, chọn Giữ, Hỏi lại hoặc Bỏ, rồi bấm Duyệt kế hoạch.',
        task: 'Tổng hợp 4 tệp điểm thi đua tuần (thư mục ThiDua) thành một bảng Excel, lưu vào thư mục KetQua.',
        steps: [
          {text: 'Đọc 4 tệp Excel trong thư mục ThiDua.', ok: ['keep'], why: 'Cần đọc dữ liệu để làm việc, và chỉ đọc nên an toàn.'},
          {text: 'Gộp dữ liệu vào một bảng mới, tính tổng điểm 4 tuần của mỗi lớp.', ok: ['keep'], why: 'Đúng việc em giao.'},
          {text: 'Xóa 4 tệp gốc cho thư mục gọn gàng.', ok: ['remove'], why: 'Xóa tệp gốc là “đèn đỏ” và em không yêu cầu; mất tệp gốc thì không đối chiếu được nữa.'},
          {text: 'Lưu bảng mới thành ThiDua_Thang11.xlsx trong thư mục KetQua.', ok: ['keep'], why: 'Đúng đầu ra em yêu cầu, tạo tệp mới nên an toàn.'},
          {text: 'Gửi email bảng kết quả cho toàn bộ giáo viên chủ nhiệm.', ok: ['remove', 'ask'], why: 'Gửi đi là “đèn đỏ”, em không yêu cầu; việc gửi để người phụ trách quyết định.'},
          {text: 'Tô đỏ lớp thấp điểm nhất và ghi nhận xét “lớp yếu kém”.', ok: ['remove', 'ask'], why: 'Bước thừa, mang tính phán xét và có thể làm tổn thương lớp đó.'},
          {text: 'Đối chiếu tổng mỗi tuần với tệp gốc, báo chỗ không khớp.', ok: ['keep'], why: 'Bước tự kiểm tra giúp phát hiện sai sót.'},
        ],
        result: 'Đã tạo ThiDua_Thang11.xlsx trong KetQua. Tổng 4 tuần khớp tệp gốc, trừ lớp 10A3 tuần 2 bị thiếu dữ liệu, em kiểm tra giúp. 4 tệp gốc giữ nguyên, chưa gửi cho ai.'},
    },
    quiz: [
      {q: 'Bước nào trong kế hoạch là “đèn đỏ”?', options: ['Đọc các tệp trong thư mục', 'Gửi email kết quả cho toàn trường', 'Tạo bảng Excel mới'], answer: 1, why: 'Gửi đi thì không lấy lại được; cần người có trách nhiệm quyết định.'},
      {q: 'Claude thêm bước “viết nhận xét về từng lớp” dù em không yêu cầu. Em nên?', options: ['Bỏ bước đó hoặc hỏi lại', 'Giữ vì càng nhiều càng tốt', 'Hủy cả việc'], answer: 0, why: 'Kế hoạch chỉ nên có bước phục vụ đúng việc em giao.'},
      {q: 'Claude báo “đã xong”. Việc tiếp theo?', options: ['Gửi kết quả đi ngay', 'Xóa tệp gốc', 'Mở kết quả và đối chiếu vài con số với tệp gốc'], answer: 2, why: 'Báo xong chưa chắc đã đúng hoàn toàn.'},
    ],
  },
};
