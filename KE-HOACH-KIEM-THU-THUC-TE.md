# Kế hoạch kiểm thử thực tế — Học viện Thực chiến 1.0

## 1. Mục tiêu và phạm vi
- Kiểm thử **12 nhiệm vụ mẫu**, trên 4 nhóm kỹ năng: nhiếp ảnh, Claude, ChatGPT, AI Agent.
- Kiểm tra giao diện bằng trình duyệt Chromium ở kích thước máy tính và điện thoại mô phỏng; **không thay thế thiết bị thật**.
- Thiết bị thật cần có: iPhone Safari, Android Chrome, Windows Chrome/Edge, máy tính bảng; thử thao tác chạm, bàn phím, chế độ giảm chuyển động, mạng chậm, mất mạng.
- Không khẳng định hiệu quả đào tạo trước khi có dữ liệu thu thập thực tế.

## 2. Thử nghiệm với học viên
- 12–20 học viên tự nguyện, có sự đồng ý phù hợp của phụ huynh/người giám hộ, có người hướng dẫn trực tiếp.
- Trước buổi học: một nhiệm vụ đánh giá đầu vào **khác câu hỏi** với đầu ra; ghi thời gian và độ chính xác.
- Trong buổi học: học viên thực hiện một nhiệm vụ/game, quan sát lỗi, số lần thử, điểm khó hiểu, yêu cầu trợ giúp. Không thu thông tin định danh không cần thiết.
- Sau buổi học: tạo sản phẩm, chấm bằng rubric chuyên môn; hai người chấm độc lập ít nhất 20% sản phẩm và đối chiếu bất đồng.
- Sau 7 ngày: bài vận dụng mới không trùng bài đã luyện; đo khả năng chuyển giao kỹ năng.
- Khảo sát tự nguyện mức dễ hiểu, hữu ích, hứng thú 1–5; không sử dụng cơ chế gây áp lực quay lại.
- Ghi nhận tỷ lệ hoàn thành, thời gian, lỗi nghiêm trọng, tỷ lệ tự giải quyết, chênh lệch điểm và mức nhất quán giữa người chấm. Báo cáo cỡ mẫu và giới hạn.

## 3. Quy tắc bảo vệ dữ liệu
- Dùng mã học viên ngẫu nhiên do người tổ chức quản lý ngoài website; không thu tên thật, ảnh mặt, địa chỉ, API key.
- Không tải ảnh người khác nếu chưa có sự đồng ý. Mặc định lưu cục bộ; trước khi xuất dữ liệu phải kiểm tra nội dung nhạy cảm.
- Có thể rút khỏi nghiên cứu bất kỳ lúc nào, không ảnh hưởng việc học.

## 4. Tiêu chí quyết định trước khi phát hành
- Không có lỗi JavaScript nghiêm trọng trong 12 luồng mẫu trên các trình duyệt mục tiêu.
- 100% luồng có phản hồi giải thích khi thất bại và cho phép thử lại.
- Đánh giá sản phẩm không được dựa duy nhất vào điểm mô phỏng.
- AI API không được công khai nếu chưa có xác thực, giới hạn ngân sách và giám sát chi phí.
- Các chỉ số hiệu quả học tập cần dữ liệu thật; không tự đặt kết quả giả.
