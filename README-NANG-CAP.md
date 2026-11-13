# Bản 1.0 — Gói nâng cấp nghiên cứu chuyên sâu

## Thay đổi có mã nguồn

- `src/games/phaser/pro-scenes.js`: bốn scene Phaser 3 khác nhau, kéo/thả, phím điều khiển, phản hồi theo thao tác.
- `src/games/phaser/pro-loader.js`: tải Phaser tại `/vendor/phaser.min.js`; báo rõ khi chưa có thư viện.
- `src/core/evidence-audit.js`: kiểm tra hồ sơ minh chứng, phát hiện bất đồng điểm AI–người chấm, thống kê dữ liệu pilot có đồng ý.
- `src/games/showcase.js`: mẫu hồ sơ minh chứng có cấu trúc, lưu cục bộ.
- `tests/evidence-advanced.test.js`: 6 kiểm thử bổ sung.
- `PHAN-TICH-CHUYEN-SAU-VA-KIEM-CHUNG.md`: phân tích nguyên nhân, ma trận kiểm thử, tiêu chí nghiệm thu.

## Cài đặt

```sh
npm install
npm run setup:phaser
npm test
npm run serve
```

Mở http://localhost:8080. Nếu không có mạng hoặc không cài được Phaser, phần tương tác Canvas/DOM vẫn hoạt động; **không được gọi đó là đã chạy Phaser**. AI chỉ hoạt động khi máy chủ được cấu hình hợp lệ.

## Đã xác minh

- Kiểm thử Node: 46/46 đạt tại thời điểm đóng gói.
- Máy chủ HTTP: trang chủ, mã nguồn và health endpoint trả HTTP 200 trên cổng thử nghiệm 8793.

## Chưa xác minh

- Không tải được thư viện Phaser từ npm trong môi trường đóng gói nên chưa có `vendor/phaser.min.js`; Phaser Scene đã viết nhưng chưa chạy kiểm thử rendering.
- Chromium headless không hoàn tất trong môi trường này; chưa kiểm thử giao diện trên thiết bị thật.
- Chưa gọi API AI thật, chưa có giáo viên chấm độc lập và chưa có học viên tham gia thử nghiệm.
