# HỌC VIỆN THỰC CHIẾN — BẢN 1.0 (Phaser + giáo trình chuyên sâu)

## Chạy nhanh (Windows PowerShell, trong thư mục `academy`)
- Node.js 22+ (kiểm tra: `node --version`).
- `npm run serve` → mở http://localhost:8080. **Các game HTML vẫn chạy ngay.**
- Để kích hoạt phòng game 2D Phaser: `npm run setup:phaser` (cần Internet tải Phaser 3 lần đầu), sau đó tải lại trang. Không đặt API key trong trình duyệt.
- `npm test` kiểm tra logic và dữ liệu giáo trình.

## Nội dung
- 112 bài / 4 môn, mỗi bài có: kiến thức cốt lõi, tình huống, dụng cụ, 4 bước thực hành, 3 tiêu chí, lỗi thường gặp, an toàn và chuyển giao.
- Phaser 3 là game engine 2D thực (canvas/WebGL) cho 5 nhóm bài: ánh sáng, bố cục, phơi sáng, màu, Agent; các bài còn lại giữ 10 cơ chế DOM hiện có. **Chưa có 112 cảnh độc nhất**.
- AI phản hồi và chấm điểm cần OPENAI_API_KEY trên máy chủ; không có khóa thì không tạo kết quả giả.

## Giới hạn minh bạch
- Các tình huống chuyên sâu được sinh từ bộ khung theo môn và xoay vòng 7 tình huống, chưa phải 112 giáo án chuyên gia viết riêng hoặc được thẩm định. Điểm Phaser phản ánh thao tác vị trí mô phỏng, **không** mô phỏng chính xác vật lý ánh sáng/khẩu độ/ISO hoặc độ an toàn của AI Agent. Không dùng để cấp chứng chỉ.
- Chưa kiểm thử trên thiết bị iOS/Android vật lý hoặc khảo sát học viên thật. Cần kiểm thử thực địa trước khi triển khai.
- Chưa có đăng nhập/DB nhiều người dùng, rate limit API, hoặc kiểm soát chi phí đầy đủ. Chỉ phù hợp demo nội bộ.
- Phaser là phần mềm bên thứ ba: tuân thủ giấy phép và giữ thông báo bản quyền khi phân phối.


## Cải tiến kiểm tra chất lượng bản 1.0
- Có 5 phòng mô phỏng Canvas 2D hoạt động **ngoại tuyến** khi Phaser chưa cài; Phaser 3 vẫn được ưu tiên nếu đã chạy `npm run setup:phaser`.
- Trình duyệt phải được mở qua `npm run serve`; mặc định máy chủ chỉ lắng nghe `127.0.0.1`.
- API AI tối đa 6 yêu cầu/phút/IP (giới hạn bộ nhớ, chỉ phù hợp thử nghiệm nội bộ). Chưa có xác thực, thanh toán, cơ sở dữ liệu hoặc kiểm duyệt sản phẩm: **không triển khai công khai**.
- Điểm mô phỏng không thay thế giáo viên hoặc chứng nhận năng lực.
- Chưa có kết quả thử nghiệm người học thật; tài liệu RESEARCH-AND-PILOT.md là kế hoạch nghiên cứu, không phải báo cáo kết quả.

## Nâng cấp nhiệm vụ và đo lường (Bản 1.0)
- `src/games/missions.js`: bốn tuyến nhiệm vụ theo môn, mỗi tuyến gồm ba chặng quyết định, minh chứng bàn giao và giải thích kiểm chứng; mỗi bài sử dụng bối cảnh chủ đề của bài.
- `src/core/pilot.js`: ngân hàng kiểm tra đầu vào/đầu ra, chấm điểm thuần hàm, so sánh trước/sau, xuất CSV không định danh.
- Trong giao diện, chọn **Kiểm tra đầu vào / đầu ra & nghiên cứu học tập** để chủ động lưu khảo sát cục bộ; người học có thể xóa dữ liệu.
- Tài liệu `PILOT-THUC-TE.md` mô tả cách tổ chức thử nghiệm thực tế và các giới hạn đo lường.
- Mô phỏng 2D và 10 mini-game cũ vẫn tồn tại; điều kiện hoàn thành bài nay yêu cầu thêm nhiệm vụ 3 chặng đạt chuẩn. Điều này làm bài học dài hơn, cần thử với học viên để cân đối thời lượng.
- **Chưa thực hiện nghiên cứu với học viên thật**; các kiểm thử Node.js không thay thế kiểm thử thiết bị thật.


## Bổ sung kịch bản và chấm chuyên môn
- `src/data/scenarios.js`: 112 hồ sơ nhiệm vụ theo tiêu đề bài, ba quyết định với thứ tự đáp án thay đổi. Đây là kịch bản theo mẫu biến thiên, chưa phải 112 câu chuyện biên kịch thủ công.
- `src/core/professional-rubric.js`: 4 tiêu chí chuyên ngành, thang mô tả 0–3; phiếu người đánh giá lưu cục bộ, **không** xác thực danh tính.
- `THU-NGHIEM-HOC-VIEN.md`: kế hoạch pilot; chưa có dữ liệu học viên thực.

## Bổ sung 12 nhiệm vụ mẫu chuyên sâu (bản 1.0)
- `src/data/showcase-quests.js`: 12 kịch bản viết riêng, ba nhiệm vụ đầu của mỗi môn, tiêu chí kỹ thuật và rubric theo tình huống.
- `src/games/showcase.js`: cảnh Canvas 2D có phản hồi theo điều chỉnh, lưu hồ sơ, phiếu đánh giá người hướng dẫn.
- `tests/showcase.test.js`: kiểm tra số lượng, cấu trúc và logic nhiệm vụ.
- `12-NHIEM-VU-DAC-BIET.md`: danh mục và giới hạn mô phỏng.
- `THU-NGHIEM-12-NHIEM-VU.md`: quy trình thử nghiệm học viên chưa triển khai.

**Kết quả xác minh:** 34/34 kiểm thử Node.js đạt, các module mới qua kiểm tra cú pháp và endpoint HTTP được kiểm tra bằng curl. Chưa kiểm thử hoàn chỉnh bằng trình duyệt tự động hoặc trên thiết bị thật; chưa có học viên thực nghiệm, chưa xác minh hiệu quả học tập. API AI cần khóa và cấu hình máy chủ; không có AI thật khi thiếu khóa. Phaser là thành phần tùy chọn từ các phiên bản trước; 12 nhiệm vụ mới sử dụng Canvas 2D để hoạt động không phụ thuộc Phaser.

## Bổ sung 1.0 — 4 ưu tiên nâng cao
- `src/games/mastery-labs.js`: 4 cơ chế thực hành riêng cho 12 bài mẫu: máy ảnh với khung ảnh Canvas, xưởng biên tập có truy nguồn, điều tra tuyên bố, lắp ráp Agent và chạy ca lỗi. Không thay thế 112 bài và nhiệm vụ cũ.
- Mô phỏng phản hồi theo quy tắc; **không khẳng định mô phỏng ánh sáng chính xác về vật lý** hoặc xác thực chất lượng sản phẩm ngoài đời. Điểm sản phẩm được người hướng dẫn đánh giá riêng bằng rubric.
- Phòng Phaser có sẵn trong `src/games/phaser/` được giữ lại. Cơ chế chuyên biệt mới là các module DOM/Canvas độc lập để hỗ trợ cảm ứng và bàn phím; **chưa phải bốn Phaser Scene riêng**.
- API AI có giới hạn phút, giới hạn ngày (`ACADEMY_DAILY_AI_LIMIT`, mặc định 30 lượt/IP) và chặn truy cập công khai khi không có `ACADEMY_API_TOKEN`. Triển khai nhiều người dùng cần xác thực tài khoản thật, quota theo tài khoản và ngân sách dịch vụ.
- `KE-HOACH-KIEM-THU-THUC-TE.md`: kịch bản kiểm thử thiết bị thật và thử nghiệm học viên có sự đồng ý phù hợp. Chưa thu thập dữ liệu thực nghiệm.
- Chạy `npm test` để kiểm tra logic; `npm run serve` để chạy website tại `http://localhost:8080`.


## Cấu hình AI bằng file `.env` (tùy chọn)
1. Sao chép mẫu: `Copy-Item .env.example .env`
2. Mở `.env`, điền `OPENAI_API_KEY=...` (khóa chỉ nằm trên máy chủ, không bao giờ đưa vào trình duyệt).
3. Chạy: `npm run serve:env`
- `.env` đã nằm trong `.gitignore`. Nếu lỡ commit/chia sẻ khóa, hãy **thu hồi và tạo khóa mới** trên trang OpenAI; xóa file thôi là chưa đủ.
- Khi đặt `HOST` khác `127.0.0.1`/`localhost`, bắt buộc có `ACADEMY_API_TOKEN`; giao diện sẽ hiện ô nhập "Mã truy cập AI" (lưu trong sessionStorage, mất khi đóng tab).
- Chi phí: mỗi lượt AI tốn phí theo bảng giá OpenAI. Mặc định giới hạn 6 lượt/phút và 30 lượt/ngày cho mỗi IP; nên đặt thêm giới hạn ngân sách (usage limit) trong tài khoản OpenAI.

## Bản rà soát 2026-11-08
- Máy chủ phục vụ file theo thư mục dự án (chạy được cả khi gọi `node academy/server/ai.js` từ thư mục cha); chặn `package.json`, mã máy chủ, test, dotfile, URL mã hóa lỗi; trả 413/415 đúng; giới hạn lượt chỉ tính cho yêu cầu hợp lệ; dọn bộ đếm ngày cũ; lọc kết quả AI trước khi trả về trình duyệt; báo rõ khi cổng 8080 bị chiếm.
- `npm run setup:phaser` chạy được trên Windows (trước đây lỗi do gọi `npm` không qua shell).
- Hai bộ nạp Phaser dùng chung một lần tải; phòng Phaser không còn gắn vào trang khi học viên đã rời bài.
- Giao diện gửi mã truy cập AI khi máy chủ yêu cầu; báo lỗi khi trình duyệt chặn/đầy bộ nhớ thay vì im lặng mất tiến độ.
- Thêm `tests/server-http.test.js` (7 kiểm thử HTTP). Tổng: 56/56 đạt; đã duyệt thử 112 bài trong trình duyệt, không lỗi JavaScript.
- Còn thiếu: `package-lock.json` (cần mạng: chạy `npm install` một lần rồi giữ lại file lock); bản sao lưu JSON chưa gồm phiếu đánh giá và dữ liệu kiểm tra đầu vào/ra.

## Nội dung riêng từng bài (2026-11-08)
- `src/data/lesson-cases.js`: 112 bài đều có kiến thức cốt lõi, tình huống, nhiệm vụ và ngộ nhận thường gặp viết riêng (trước đây 112 bài dùng chung 28 tình huống xoay vòng). Phần "Giáo trình chuyên sâu" ưu tiên dữ liệu này.
- Câu hỏi 3 chặng (`src/data/scenarios.js`): đáp án sai là lỗi thường gặp có thật, độ dài đáp án được trộn để không đoán được bằng mẹo "chọn câu dài nhất".
- Bài claude-24 đổi tên thành "Đối chiếu nhiều tài liệu" (trước trùng tên với claude-12); mã bài giữ nguyên nên tiến độ đã lưu không bị ảnh hưởng.
- Nội dung do AI hỗ trợ biên soạn, **cần giáo viên chuyên môn duyệt** trước khi dùng chính thức.

## Hoàn thiện 2026-11-13
- Trang bài học chia thành **4 bước hiện lần lượt**: 📖 Tìm hiểu → 🎮 Thực hành → 🧭 Nhiệm vụ 3 chặng → 📝 Nộp sản phẩm. Thanh bước dính trên đầu trang, đánh dấu ✓ khi xong game, khi đạt nhiệm vụ và khi lưu hoàn thành. Trang dài khoảng 1.900–2.500px thay vì ~7.000px.
- Bỏ khối "Học theo 6 bước" dùng câu mẫu lặp cho 112 bài; phần Tìm hiểu nay lấy mục tiêu, tình huống, kiến thức cốt lõi và ngộ nhận viết riêng cho từng bài (`lesson-cases.js`). Các trường mẫu cũ trong `courses.js` (warmup/practice/verification…) vẫn còn trong dữ liệu nhưng không hiển thị.
- Nút Phaser chuyên biệt chỉ hiện ở 3 bài đầu mỗi môn (những bài có phòng Phaser thật).
- Mô tả khóa học sửa "21 nhiệm vụ" → "28 nhiệm vụ" (đúng số bài).
- Sao lưu JSON nay gồm cả **phiếu đánh giá chuyên môn** và **dữ liệu kiểm tra đầu vào/ra**; khi khôi phục, dữ liệu được kiểm tra lại (điểm phiếu tính lại từ mức đánh giá, dữ liệu kiểm tra phải có đồng ý). File sao lưu cũ vẫn khôi phục được.
- Đã có `package-lock.json` và `vendor/phaser.min.js` (đã chạy `npm install` và `npm run setup:phaser`).
- Kiểm thử: 69/69 đạt (thêm `tests/backup.test.js`); đã duyệt 112 bài trong trình duyệt, không lỗi JavaScript; đã chạy trọn một bài từ game → nhiệm vụ → lưu hoàn thành, và thử sao lưu → xóa → khôi phục.
- Vẫn cần: giáo viên chuyên môn duyệt nội dung; thử trên điện thoại thật và với học viên thật.

## Mở rộng lên 7 môn / 196 bài (2026-11-13)
**Đánh giá môn còn thiếu:** học viện có Nhiếp ảnh, Claude, ChatGPT, AI Agent nhưng thiếu (1) tin học văn phòng — kỹ năng dùng hằng ngày ở trường và nơi làm việc; (2) Gemini/Google Workspace — nhiều trường dùng tài khoản Google; (3) thiết kế và video ngắn — bước tiếp theo sau Nhiếp ảnh để làm truyền thông. Đã bổ sung cả ba, mỗi môn 28 bài, 4 chặng:
- `office` 📊 **Microsoft Office & Copilot**: Word (Styles, mục lục, Track Changes, Mail Merge), Excel (bảng, tham chiếu tuyệt đối, IF/COUNTIF/SUMIF, XLOOKUP, kiểm soát nhập liệu, PivotTable, dashboard), PowerPoint & Outlook (Slide Master, kể chuyện bằng dữ liệu, Speaker Coach, email, lịch họp, phân quyền), Copilot (Word, Excel chế độ Chat/Plan/Edit, PowerPoint, Outlook, Python trong Excel, bảo mật).
- `gemini` ✨ **Gemini & Google Workspace**: prompt, đọc ảnh, kiểm tra lại bằng Google, Gemini Live, quyền riêng tư; Deep Research, Gemini Notebook (NotebookLM), thẻ ghi nhớ, Canvas, học có hướng dẫn; Gemini trong Gmail/Docs/Sheets/Slides/Meet/Drive; Gems → Skills, tạo ảnh/video có SynthID, Gemini Agent, Gemini trong Chrome, so sánh 3 trợ lý AI, nhận diện nội dung AI.
- `design` 🎨 **Thiết kế & Video ngắn**: phân cấp, phông chữ, màu và tương phản, lưới, poster, nhận diện; mẫu thiết kế, đa kích thước, tạo/chỉnh ảnh AI, bản quyền, thiết kế dễ tiếp cận; kịch bản, quay, dựng, phụ đề, âm thanh, video AI và dán nhãn; đo hiệu quả, quy trình duyệt, deepfake, infographic, xuất tệp, lưu trữ.
- Mỗi môn mới có đủ: tình huống riêng từng bài, nhiệm vụ 3 chặng, câu hỏi kiểm tra đầu vào/ra, phiếu đánh giá 4 tiêu chí, trò chơi phù hợp (không dùng trò chơi chỉ dành cho AI Agent). Dữ liệu nằm trong `src/data/courses-2026/`.

**Cập nhật tính năng mới cho bài cũ:** `src/data/tool-updates.js` thêm hộp “🆕 Tính năng hiện hành (cập nhật 11/2026)” cho 17 bài Claude/ChatGPT/Agent (Claude Cowork, Projects, Skills, Claude Code; ChatGPT Work, chế độ học, deep research, Sites, Lockdown Mode, Images; chuẩn MCP, phân quyền connector). Thông tin tra cứu ngày 13/11/2026 từ trang trợ giúp và ghi chú phát hành chính thức của Anthropic, OpenAI, Google, Microsoft. **Tính năng đổi nhanh theo gói, độ tuổi, khu vực — nên rà lại file này vài tháng một lần.**

- Kiểm thử: 80/80 đạt (thêm `tests/new-courses.test.js`); đã mở cả 196 bài trong trình duyệt, không lỗi JavaScript.
- Nội dung 84 bài mới do AI hỗ trợ biên soạn, **cần giáo viên chuyên môn duyệt**. Chưa có phòng Phaser/phòng mô phỏng chuyên sâu riêng cho 3 môn mới (12 nhiệm vụ đặc biệt vẫn chỉ thuộc 4 môn cũ).

## Mở rộng lên 14 môn / 392 bài, PDF và triển khai (2026-11-13)
- Thêm 7 môn AI: 🧠 Nền tảng AI & Đạo đức, 🔌 MCP (cấu hình thật cho Claude Desktop, Claude Code, VS Code, Cursor, ChatGPT/Gemini/Copilot; tự xây MCP server), 🤝 Claude Cowork, ⚙️ Tự động hóa quy trình với AI (n8n, Make, Zapier, Power Automate), 💻 Lập trình cùng AI (Claude Code, VS Code + Copilot, Cursor), 🛠️ Xây dựng AI Agent (API, tool use, RAG, Agent SDK, eval), 🖥️ AI mã nguồn mở chạy trên máy (Ollama, LM Studio, Hugging Face). Thông tin tra cứu ngày 13/11/2026 từ tài liệu chính thức.
- **PDF chương trình học**: `tai-lieu/chuong-trinh-hoc-vien-thuc-chien.pdf` (33 trang: lộ trình, 14 môn × 28 bài, phụ lục hướng dẫn GitHub/Hostinger). Tạo lại: `npm run build:pdf` (cần Python + reportlab). Trang chủ có nút tải PDF.
- **Hướng dẫn GitHub, cài lại bằng Claude và đưa lên Hostinger**: `HUONG-DAN-GITHUB-VA-HOSTINGER.md`.
- **Bản web tĩnh**: `npm run build:site` → `dist/`; `npm run build:zip` → `hoc-vien-web-hostinger.zip` để tải lên `public_html` của Hostinger. `npm start` chạy máy chủ Node (cho gói Node.js của Hostinger).
- Đã đăng bản web lên claude.ai (riêng tư, chia sẻ từ menu Share của trang). Trong bản này không có AI chấm bài (cần máy chủ Node + khóa OpenAI); tải PDF/sao lưu dùng chức năng tải xuống của Claude; hộp xác nhận làm ngay trong trang (thay `confirm()`).
- Kiểm thử: 96/96 đạt; đã duyệt cả 392 bài trong trình duyệt, không lỗi JavaScript.

## Thêm Claude Design và Xuất bản web (2026-11-13)
- 🎨 **Claude Design**: viết yêu cầu thiết kế, chỉnh trên canvas, hệ thống thiết kế, nguyên mẫu tương tác, Claude Slides, Claude Docs, chia sẻ, xuất tệp, bàn giao sang Claude Code (tra cứu Help Center và Claude Academy 11/2026).
- 🌐 **Xuất bản web – Git, GitHub và Hostinger**: Git, nhánh, hoàn tác, GitHub, pull request, GitHub Pages, tên miền/DNS, hPanel, tải web lên public_html, tự triển khai từ GitHub, Node.js trên Hostinger, HTTPS, sao lưu, bảo mật. Đây là nội dung bài học; học viên có thể thực hành bằng GitHub Pages miễn phí.
- Tổng: 16 môn / 448 bài; PDF 37 trang; 100/100 kiểm thử đạt.

## Mẫu “dạy thật” cho môn Office (2026-11-13)
- Mỗi bài trong 28 bài Office có thêm (tệp `src/data/courses-2026/office-teach.js`): **Làm từng bước** (4–6 bước, tên menu tiếng Anh kèm tiếng Việt), **Ví dụ mẫu** (công thức/mẫu hoàn chỉnh), **Bài luyện tự chấm** (gõ công thức, chọn đáp án hoặc sắp xếp bước) và **3 câu hỏi riêng của bài** kèm giải thích; thời lượng gợi ý thực tế.
- Bài có phần này: bước Thực hành tính điểm bằng bài luyện (trò chơi chung chuyển thành “Luyện thêm, không tính điểm”); bước 3 là “Kiểm tra hiểu bài” (đúng 3/3 mới qua, được làm lại) thay cho nhiệm vụ 3 chặng chung.
- Đáp án đúng được xoay đều 3 vị trí (trước đó 70/84 câu đáp án nằm ở vị trí đầu).
- Ô công thức chấp nhận cả dấu `;` (Excel tiếng Việt) và `,`, không phân biệt hoa thường và khoảng trắng.
- Sửa chung: mục tiêu giữ chữ viết tắt (XLOOKUP, AI, MCP); nút AI chỉ hiện khi máy chủ có cấu hình AI.
- Kiểm thử: 106/106 (thêm `tests/teach.test.js`). Các môn khác chưa có lớp này.
