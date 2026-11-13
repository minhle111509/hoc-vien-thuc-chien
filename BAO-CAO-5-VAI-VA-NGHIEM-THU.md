# Học viện Thực chiến – Bản 1.0 | Bàn giao đợt triển khai 5 vai

## Đã thực hiện trong mã nguồn
- 12 tình huống nghề nghiệp riêng, ba tình huống cho mỗi môn, có diễn biến thứ hai, lựa chọn, hệ quả và khả năng thử lại không phạt.
- Tích hợp `decision-room.js` vào trang bài học 1–3 mỗi khóa; 112 bài học gốc giữ nguyên.
- Nút bắt đầu nhanh ở trang chủ, đưa học viên đến bài chưa hoàn thành.
- Bổ sung quản lý hủy phòng trò chơi khi chuyển trang; tải phòng Phaser chuyên biệt theo yêu cầu thay vì khởi chạy ngay mọi bài.
- 3 bài kiểm thử mới cho tình huống, nhánh đúng/sai và đầu vào không hợp lệ; tổng 49 bài kiểm thử tự động đạt tại thời điểm đóng gói.

## Giới hạn cần công bố rõ
- Các tình huống quyết định là mô phỏng quy tắc, không phải phép đo năng lực thực hành độc lập.
- Phòng Phaser chuyên biệt có mã nguồn nhưng thư viện `vendor/phaser.min.js` chưa được đóng gói; cần `npm install` và `npm run setup:phaser` khi có kết nối mạng. Các hoạt động Canvas/DOM vẫn có thể dùng khi thiếu Phaser.
- Chưa có tài khoản nhiều người dùng, chưa xác minh danh tính giáo viên, chưa có đồng bộ đa thiết bị.
- API AI không được cấu hình trong bản đóng gói; không có dữ liệu AI thực tế hoặc kết quả đánh giá chuyên gia thật.
- Chromium headless tại môi trường xây dựng không hoàn thành trước thời gian chờ; **chưa xác nhận kiểm thử giao diện trình duyệt hoặc thiết bị thật**.
- Chưa tổ chức thử nghiệm với học viên; không được coi số điểm mô phỏng là kết quả nghiên cứu hiệu quả đào tạo.

## Nghiệm thu tiếp theo theo năm vai
1. **Giáo viên:** hai giáo viên chấm độc lập 20–30 sản phẩm giả lập đã loại dữ liệu nhận dạng; thống nhất thang điểm và kiểm tra mức độ nhất quán trước khi áp dụng.
2. **Lập trình viên:** cài Phaser thực, kiểm tra lifecycle, API, lưu trữ, bàn phím, màn hình nhỏ, lỗi mạng, giới hạn chi phí; chỉ mở API công khai sau khi có xác thực và hạn mức theo tài khoản.
3. **Nhà kinh doanh:** thí điểm giá trị sản phẩm trước khi đặt giá; đo chi phí/hoàn thành nhiệm vụ và tỷ lệ tự nguyện tiếp tục.
4. **Học viên:** thử nghiệm tự nguyện có đồng ý phù hợp, quan sát 5 người để tìm lỗi khả dụng rồi mở rộng 12–20 người; không tạo áp lực thời gian hoặc chuỗi điểm danh.
5. **Nhà sản xuất game:** thiết kế một vòng chơi có hành động–hệ quả–sửa lỗi cho từng môn, kiểm thử mức dễ hiểu trước khi nhân rộng.

## Cách chạy
`npm test` để chạy kiểm thử. `npm run serve` rồi mở http://localhost:8080. Bài 1–3 mỗi khóa có phòng tình huống mới. `npm install && npm run setup:phaser` để tải thư viện Phaser nếu có mạng; đây là bước bổ sung, không bắt buộc cho các hoạt động DOM/Canvas.
