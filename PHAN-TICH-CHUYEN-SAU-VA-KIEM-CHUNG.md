# HỌC VIỆN THỰC CHIẾN 1.0 — Phân tích vấn đề và lộ trình kiểm chứng

## 1. Những nguyên nhân gốc (không che giấu)

| Vấn đề | Nguyên nhân gốc | Tác hại | Đã làm trong gói này | Chưa hoàn thành |
|---|---|---|---|---|
| Trò chơi giống nhau | Thiết kế nhiệm vụ theo 3 thanh điều chỉnh | Học thuộc thao tác, không hình thành kỹ năng | Thêm 4 Phaser Scene riêng với tương tác kéo/thả, bàn phím, trạng thái | Chưa có đủ 12 scene với cơ chế chơi độc lập; thư viện Phaser chưa đóng gói do môi trường không tải được npm |
| Phản hồi AI không thể kiểm chứng | Mô hình chỉ nhìn văn bản do học viên tự khai | Chấm cao bài viết dài nhưng sai | Hồ sơ minh chứng gồm mục tiêu, sản phẩm, lần thử, phép thử, giới hạn; đối chiếu chênh lệch AI–người chấm | Chưa có bộ đáp án chuyên gia chuẩn, chưa kiểm tra AI thực qua API |
| Không có dữ liệu hiệu quả | Kiểm tra trước/sau dùng cùng câu hỏi; không có nhóm đối chứng | Hiệu ứng ghi nhớ làm sai lệch kết luận | Hàm thống kê chỉ nhận bản ghi có đồng ý; thiết kế quy trình kiểm chứng | Chưa có người tham gia thật; chưa thể tuyên bố cải thiện |
| Không thể kết luận chạy tốt trên điện thoại | Kiểm thử logic không phải kiểm thử UI | Tràn màn hình, lỗi cảm ứng, hiệu suất | CSS co giãn cho Phaser, kiểm thử HTTP và JavaScript | Chưa kiểm thử thiết bị thật; chạy Chromium headless trong môi trường này chưa thành công |

## 2. Bốn hệ thống game nên phát triển sâu

- **Nhiếp ảnh:** Di chuyển đèn/máy/chủ thể, chụp A/B, xem biểu đồ sáng, giải thích sự đánh đổi. Tránh khẳng định mô phỏng phản ánh vật lý ánh sáng thực.
- **Claude AI:** Mỗi tuyên bố phải liên kết được nguồn, phân biệt trích dẫn / suy luận / chưa rõ, yêu cầu người học sửa prompt và đối chiếu kết quả.
- **ChatGPT:** Xây cây câu hỏi–bằng chứng–kết luận, kiểm tra sự phù hợp của nguồn và phát hiện khi chưa đủ căn cứ.
- **AI Agent:** Lắp ghép bước, mô phỏng dữ liệu sai và chỉ dẫn giả mạo, bắt buộc có phê duyệt trước thao tác thay đổi dữ liệu.

Các Phaser Scene hiện là **nguyên mẫu hoạt cảnh**, không thay thế những bài thực hành chuyên biệt DOM/Canvas đã có. Nếu không có `vendor/phaser.min.js`, ứng dụng hiển thị thông báo và các bài thực hành khác vẫn dùng được.

## 3. Chấm sản phẩm theo bằng chứng, không theo số ký tự

1. Người học nộp **mục tiêu đo được**, **sản phẩm**, **ít nhất một lần thử**, **phép kiểm chứng**, **giới hạn**.
2. Máy kiểm tra **đủ thành phần**; không được suy ra điểm chuyên môn chỉ vì văn bản dài.
3. AI phản hồi theo tiêu chí và nêu rõ thiếu bằng chứng. Không được tự nhận đã mở file, xem ảnh hoặc chạy Agent nếu không có công cụ xác thực.
4. Giáo viên chấm độc lập 4 tiêu chí. Chênh lệch tổng điểm AI–giáo viên trên 15 điểm phải được xem xét lần hai.
5. Cả điểm AI và phiếu tự khai người chấm đều **không phải chứng nhận năng lực**. Muốn cấp chứng nhận cần xác thực người chấm, quy trình khiếu nại và chuẩn hóa rubrics.

## 4. Thiết kế pilot có thể kiểm chứng

- Mẫu thăm dò usability: 12–20 học viên tình nguyện, không dùng để khẳng định hiệu quả đào tạo.
- Pilot đánh giá hiệu quả: có nhóm so sánh phù hợp và bài kiểm tra trước/sau **tương đương nhưng không trùng câu**, chấm sản phẩm ẩn danh bởi ít nhất 2 người chấm độc lập; thử lại sau 7 ngày.
- Chỉ số: hoàn thành nhiệm vụ, thời gian tới khi hoàn thành, số lần sửa lỗi, điểm sản phẩm, chênh lệch điểm trước/sau, điểm sau 7 ngày, lỗi kỹ thuật, mức độ hài lòng.
- Không tự tạo dữ liệu học viên. Cần sự đồng ý tự nguyện; nếu người tham gia chưa thành niên, thực hiện thủ tục đồng ý phù hợp của người giám hộ và bảo vệ thông tin cá nhân.
- Báo cáo tách **mô tả** (điểm trung bình, tỷ lệ) và **suy luận nhân quả** (chỉ khi có thiết kế nghiên cứu đủ mạnh).

## 5. Ma trận kiểm thử thiết bị thật (CHƯA CHẠY)

| Thiết bị | Trình duyệt | Kiểm tra | Điều kiện đạt |
|---|---|---|---|
| iPhone Safari | iOS Safari | Chạm, kéo, cuộn, bàn phím ảo, lưu | Không mất thao tác, không tràn ngang |
| Android Chrome | Android Chrome | Cảm ứng, đổi hướng màn hình, lưu | Không vỡ bố cục, không mất tiến độ |
| Windows | Chrome/Edge | Bàn phím, tab, zoom 200% | Tương tác được không dùng chuột |
| macOS | Safari | Phông chữ, âm thanh, canvas, lưu | Không có lỗi chặn nhiệm vụ |
| Mạng chậm/offline | Trình duyệt hỗ trợ | Phaser vắng mặt, AI không khả dụng | Có fallback và thông báo rõ |

## 6. Kiểm soát chi phí và an toàn API

- Mặc định API AI không có khóa thì **không gọi mô hình**, không tạo điểm giả.
- Không nhúng khóa nhà cung cấp vào JavaScript trình duyệt.
- Trước khi mở công khai: tài khoản và phiên đăng nhập, quota theo người dùng, giới hạn token/chi phí, nhật ký lỗi không chứa dữ liệu nhạy cảm, chính sách lưu/xóa, kiểm thử bảo mật và tải.
- `ACADEMY_API_TOKEN` hiện chỉ phù hợp thử nghiệm máy chủ được kiểm soát; không đưa token chung vào mã frontend. Khi triển khai công khai cần thay bằng phiên đăng nhập phía máy chủ.

## 7. Điều kiện nghiệm thu trước khi thương mại hóa

- Phaser chạy từ file thư viện được đóng gói hợp lệ, 12 nhiệm vụ có kịch bản/cơ chế tương tác riêng và xử lý thoát cảnh không rò rỉ bộ nhớ.
- Rubric được hai chuyên gia hiệu chỉnh trên ít nhất một bộ sản phẩm mẫu, công bố mức đồng thuận.
- Kiểm thử thiết bị thật có biên bản và lỗi nghiêm trọng đã xử lý.
- Pilot người học có đồng ý tham gia và dữ liệu phân tích thực, không thay bằng dữ liệu giả.
- Hệ thống đăng nhập, quota AI, bảo vệ dữ liệu, khả năng khôi phục và giám sát chi phí đã được triển khai.
