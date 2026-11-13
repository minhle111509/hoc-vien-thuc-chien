# Hướng dẫn: đưa code lên GitHub, cài lại bằng Claude và đưa web lên Hostinger

Tài liệu cho người mới. Làm theo thứ tự. Các lệnh chạy trong **PowerShell** (Windows), mở tại thư mục `academy`.

---

## Phần 1. Chuẩn bị máy (làm một lần)

1. Cài **Node.js 22** trở lên: tải bản LTS ở nodejs.org. Kiểm tra: `node --version`.
2. Cài **Git**: tải ở git-scm.com. Kiểm tra: `git --version`.
3. Tạo tài khoản **GitHub** (github.com) nếu chưa có.
4. (Tùy chọn) Cài **Python 3** và `pip install reportlab` nếu muốn tạo lại file PDF.

---

## Phần 2. Đưa code lên GitHub

### Cách A — Nhờ Claude Code làm giúp (dễ nhất)
Mở Claude Code tại thư mục `academy` (ứng dụng Claude trên máy tính → tab Code, hoặc gõ `claude` trong terminal) rồi gõ:

> Khởi tạo git cho thư mục này, kiểm tra .gitignore không để lộ .env và node_modules, tạo commit đầu tiên, rồi hướng dẫn tôi tạo repository trên GitHub và đẩy code lên.

Claude Code sẽ chạy từng lệnh và **hỏi em trước** khi làm việc quan trọng. Em vẫn tự đăng nhập GitHub — không đưa mật khẩu hay token cho AI.

### Cách B — Tự làm bằng lệnh
1. Trên github.com bấm **New repository**, đặt tên ví dụ `hoc-vien-thuc-chien`, chọn **Private** (riêng tư), **không** tick “Add a README”. Bấm **Create repository**.
2. Trong PowerShell tại thư mục `academy`:
   ```
   git init
   git add .
   git commit -m "Hoc vien thuc chien: 14 khoa hoc"
   git branch -M main
   git remote add origin https://github.com/TEN-CUA-EM/hoc-vien-thuc-chien.git
   git push -u origin main
   ```
   Lần đầu `git push` sẽ mở cửa sổ đăng nhập GitHub trên trình duyệt.
3. Kiểm tra trên GitHub: phải **không** thấy file `.env`, thư mục `node_modules`, `dist`. (Đã có sẵn trong `.gitignore`.)

> ⚠️ Nếu lỡ đẩy file `.env` có khóa OpenAI: vào trang OpenAI **thu hồi khóa và tạo khóa mới** ngay. Xóa file khỏi GitHub thôi là chưa đủ.

### Cập nhật về sau
```
git add .
git commit -m "Mo ta thay doi"
git push
```

---

## Phần 3. Tải code về máy khác và cài lại (cho Claude hoặc tự làm)

### Nhờ Claude Code
Mở Claude Code ở một thư mục trống và gõ:

> Tải repository https://github.com/TEN-CUA-EM/hoc-vien-thuc-chien về, cài đặt theo README (npm install, npm run setup:phaser), chạy npm test, rồi chạy web và cho tôi xem.

### Tự làm
```
git clone https://github.com/TEN-CUA-EM/hoc-vien-thuc-chien.git
cd hoc-vien-thuc-chien
npm install
npm run setup:phaser
npm test
npm run serve
```
Mở trình duyệt tại `http://localhost:8080`.

Các lệnh có sẵn:

| Lệnh | Việc |
|---|---|
| `npm run serve` | Chạy web trên máy (cổng 8080) |
| `npm run serve:env` | Chạy web có AI (đọc khóa từ file `.env`) |
| `npm test` | Chạy kiểm thử |
| `npm run setup:phaser` | Cài phòng game 2D Phaser |
| `npm run build:site` | Tạo bản web tĩnh trong `dist/` để đưa lên hosting |
| `npm run build:zip` | Tạo bản web tĩnh và nén thành `hoc-vien-web-hostinger.zip` để tải lên Hostinger |
| `npm run build:pdf` | Tạo lại file PDF chương trình học |

---

## Phần 4. Đưa web lên Hostinger

Có 2 cách. **Cách 1 đủ cho hầu hết trường hợp** (web chạy đầy đủ, chỉ thiếu tính năng “AI chấm bài” vốn cần máy chủ và khóa OpenAI).

### Cách 1 — Web tĩnh (mọi gói Hostinger có hPanel)
1. Trên máy, tạo gói web tĩnh đã nén (đường dẫn trong tệp nén dùng dấu `/` nên giải nén đúng trên máy chủ Linux của Hostinger):
   ```
   npm run build:zip
   ```
2. Đăng nhập **hPanel** → **Websites** → chọn tên miền → **Files → File Manager** → mở thư mục **public_html**.
3. Xóa trang mặc định của Hostinger (thường là `default.php` / `index.php`) nếu có.
4. Bấm **Upload**, chọn `hoc-vien-web-hostinger.zip` (vừa tạo trong thư mục `academy`), sau đó bấm chuột phải vào file zip → **Extract** ngay trong `public_html`.
   Kết quả đúng: `public_html/index.html`, `public_html/src/...`, `public_html/vendor/...`, `public_html/tai-lieu/...`
5. Mở tên miền của em để kiểm tra. Bật **SSL** (hPanel → Security → SSL) để web chạy `https://`.

**Tự cập nhật từ GitHub (tùy chọn):** hPanel → website → **Advanced → Git** → kết nối GitHub, chọn repository, nhánh `main`, thư mục `public_html`. Mỗi lần `git push`, Hostinger tự cập nhật. Lưu ý: cách này đưa cả mã nguồn lên; phòng Phaser chỉ có nếu em commit thêm `vendor/phaser.min.js` (mặc định bị bỏ qua), nếu không web dùng phòng mô phỏng dự phòng.

### Cách 2 — Ứng dụng Node.js có AI (gói Business Web Hosting, Cloud hoặc Web Apps)
1. Đẩy code lên GitHub (Phần 2).
2. hPanel → **Websites → Add Website / Create site → Node.js web app (Web App)** → **Import Git repository** → **Connect with GitHub** → chọn repository.
3. Cài đặt build:
   - Build command: `npm install && npm run setup:phaser`
   - Start command: `npm start`
   - Node.js: 22 trở lên
4. Thêm **biến môi trường** (Environment variables) trong trang quản lý ứng dụng:
   - `HOST` = `0.0.0.0`
   - `OPENAI_API_KEY` = khóa của em (chỉ đặt ở đây, **không** đưa vào code)
   - `ACADEMY_API_TOKEN` = một mã dài, ngẫu nhiên — học viên phải nhập mã này mới dùng được AI. **Bắt buộc**: thiếu mã này máy chủ sẽ từ chối AI khi chạy công khai.
   - `ACADEMY_DAILY_AI_LIMIT` = `30` (số lượt AI mỗi ngày cho mỗi địa chỉ IP)
5. Bấm **Deploy**, chờ “Deployment completed”, mở tên miền tạm để kiểm tra.
6. Đặt **giới hạn chi tiêu** (usage limit) trong tài khoản OpenAI để tránh hóa đơn bất ngờ.

> Không dùng `PORT` cố định: Hostinger tự đặt cổng, máy chủ của web đã đọc biến `PORT`.

### Kiểm tra sau khi đưa lên
- Trang chủ hiện **14 khóa học · 392 nhiệm vụ**.
- Mở vài bài, chơi thử trò chơi, nút **Tải chương trình học (PDF)** hoạt động.
- Tiến độ lưu trên trình duyệt của từng người (không có tài khoản, không có cơ sở dữ liệu chung).

---

## Phần 5. Giới hạn cần biết trước khi mở cho nhiều người
- Chưa có đăng nhập và cơ sở dữ liệu chung: mỗi học viên tự lưu tiến độ trên máy mình, nên dùng nút **Sao lưu**.
- Nội dung bài học do AI hỗ trợ biên soạn, **cần giáo viên duyệt** trước khi dùng chính thức.
- Tính năng của các công cụ AI thay đổi nhanh: rà lại `src/data/tool-updates.js` và các môn AI vài tháng một lần.
