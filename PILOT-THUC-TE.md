# Quy trình thử nghiệm thực tế – Học viện Thực chiến 1.0

## Tình trạng bằng chứng
Chưa tuyển người tham gia, chưa đo dữ liệu thực tế và chưa thể khẳng định mức độ hứng thú hoặc hiệu quả đào tạo. Chức năng đo trong ứng dụng chỉ ghi nhận dữ liệu **cục bộ** khi người học chủ động đồng ý; không tự gửi thông tin đến máy chủ.

## Thiết kế thử nghiệm đề xuất
- 12–20 học viên tình nguyện, chia nhóm tuổi phù hợp; có sự đồng ý của phụ huynh/người giám hộ khi cần.
- 4 khóa học, thử nghiệm theo từng nhóm môn; không bắt buộc học hết 112 bài trong một đợt.
- Tuần 0: bài kiểm tra đầu vào, một nhiệm vụ thực hành chưa hướng dẫn; ghi nhận điểm theo rubric bởi hai người chấm độc lập nếu có điều kiện.
- Tuần 1–2: mỗi học viên học 3–5 nhiệm vụ, thời lượng hợp lý; quan sát lỗi thao tác, thời gian, số lần thử, khả năng giải thích, không thu thập tên hay thông tin riêng tư.
- Tuần 2: bài kiểm tra đầu ra và nhiệm vụ chuyển giao tương đương nhưng khác tình huống; phỏng vấn ngắn về mức độ dễ hiểu, hứng thú, quá tải và mong muốn quay lại.
- Sau 7 ngày: bài kiểm tra ghi nhớ/chuyển giao mới, không cho xem đáp án trước.

## Các chỉ số và cách đọc
1. **Tiến bộ kiến thức**: điểm sau – điểm trước, báo cáo số người tham gia, trung vị và phân bố, không chỉ báo cáo trung bình.
2. **Năng lực vận dụng**: rubric 0–4 cho (a) xác định mục tiêu, (b) lựa chọn giải pháp, (c) kiểm chứng, (d) an toàn, (e) sản phẩm; hai người chấm độc lập và đối chiếu khác biệt.
3. **Hứng thú tự nguyện**: thang 1–5 sau buổi, câu hỏi mở về điều thú vị và khó hiểu; không thiết kế phần thưởng ép quay lại.
4. **Khả dụng**: tỷ lệ hoàn thành nhiệm vụ, lỗi giao diện, số lần cần người hỗ trợ, thời gian thực hiện; tách theo thiết bị.
5. **Duy trì**: tỷ lệ tự nguyện tham gia buổi tiếp theo trong 7/14 ngày, chỉ khi đã được phép ghi nhận; không coi tỷ lệ quay lại là bằng chứng duy nhất của hiệu quả học tập.

## Hạn chế của đo lường tích hợp
Bộ 4 câu trước/sau hiện dùng cùng câu hỏi, có nguy cơ hiệu ứng ghi nhớ; cỡ mẫu nhỏ; dữ liệu tự khai có sai lệch; không có nhóm đối chứng. Vì vậy, chỉ dùng để **khảo sát ban đầu**, không được quảng bá như bằng chứng khoa học về hiệu quả.

## Quyền riêng tư và đạo đức
- Không thu thập tên, email, địa chỉ, ảnh mặt, vị trí, mật khẩu, khóa API hay bài làm chứa dữ liệu nhạy cảm.
- Học viên có quyền bỏ qua khảo sát, xóa dữ liệu cục bộ hoặc dừng bất kỳ lúc nào.
- Chỉ xuất CSV sau khi người dùng chủ động thao tác. Trước khi chia sẻ CSV, cần rà soát lại quyền đồng ý và thông tin định danh gián tiếp.
- Không công khai bảng xếp hạng cá nhân hoặc hồ sơ học viên theo mặc định.

## Kiểm thử thiết bị thật cần thực hiện
Chrome/Edge trên Windows; Safari trên iPhone/iPad; Chrome trên Android; thao tác cảm ứng, bàn phím, giảm chuyển động, mất mạng, khôi phục dữ liệu, không cấu hình AI, quyền truy cập màn hình nhỏ. Chưa có kết quả kiểm thử thực tế trên những thiết bị này.
