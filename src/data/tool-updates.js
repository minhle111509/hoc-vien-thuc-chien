// Current product features (checked November 2026 against Anthropic, OpenAI, Google and Microsoft
// help centres / release notes). Shown as a separate box so the hand-written lesson stays stable.
// Features change often and depend on plan, age and region: review this file every few months.
export const TOOLS_CHECKED = '11/2026';
export const TOOL_UPDATES = {
  'claude-1': 'Claude dùng trên web, máy tính và điện thoại. Bản mới gộp trò chuyện và Cowork: có thể hỏi nhanh hoặc giao việc lớn (báo cáo, bảng tính, slide) trong cùng cuộc trò chuyện. Có Projects, artifacts (tài liệu, slide, bảng tính, bảng trắng), bộ nhớ, kết nối ứng dụng (connectors) và skills.',
  'claude-12': 'Projects cho phép lưu tài liệu nền và hướng dẫn riêng cho một dự án; Claude có thể tìm lại các cuộc trò chuyện cũ khi bộ nhớ được bật. Vẫn cần chỉ rõ trang/đoạn khi hỏi về tài liệu dài.',
  'claude-16': 'Claude Code chạy trong terminal, ứng dụng máy tính và web để đọc, sửa và chạy mã trong dự án; có lệnh /security-review để rà lỗ hổng. Mọi thay đổi mã vẫn cần người xem lại và chạy kiểm thử.',
  'claude-18': 'Skills đóng gói một quy trình lặp lại (hướng dẫn, mẫu, script) để Claude dùng khi phù hợp; Agent Skills là chuẩn mở dùng được trên nhiều nền tảng AI. Plugins gom connectors, skills và lệnh thành một gói.',
  'claude-22': 'Có thể bật/tắt bộ nhớ, dùng trò chuyện ẩn danh, và duyệt từng công cụ khi một connector hoặc artifact muốn truy cập ứng dụng của em. Không cấp quyền ghi (gửi thư, sửa tệp) khi chưa cần.',
  'claude-26': 'Projects gom tài liệu, hướng dẫn và cuộc trò chuyện theo dự án; artifacts lưu lịch sử phiên bản và có thể chia sẻ với quyền xem hoặc sửa. Đặt tên phiên bản và ghi thay đổi như với tài liệu thường.',
  'chatgpt-1': 'ChatGPT có Projects, bộ nhớ, tìm kiếm web, deep research, tạo ảnh (Images), Sites (tạo trang web nhỏ, bản thử nghiệm) và ChatGPT Work — tác tử làm việc dài nhiều bước, hỏi duyệt trước hành động quan trọng.',
  'chatgpt-3': 'Chế độ học (gõ @study hoặc chọn Study) hướng dẫn từng bước bằng câu hỏi gợi mở thay vì đưa đáp án ngay; không dùng được trong trò chuyện tạm thời, GPTs hay Projects.',
  'chatgpt-6': 'ChatGPT có thể tạo bài trắc nghiệm tương tác ngay trong cuộc trò chuyện (“quiz me on…”), thẻ ghi nhớ và đề cương ôn tập từ tài liệu em tải lên.',
  'chatgpt-15': 'ChatGPT Sites (bản thử nghiệm công khai) biến ý tưởng thành trang web hoặc ứng dụng nhỏ ngay trong ChatGPT; Codex hỗ trợ viết mã. Ứng dụng tạo nhanh vẫn cần kiểm tra nội dung, quyền riêng tư và lỗi.',
  'chatgpt-18': 'ChatGPT Work làm việc dài: nghiên cứu, dùng ứng dụng kết nối, tạo tài liệu/bảng tính/slide, có thể chạy theo lịch. Em theo dõi tiến độ, trả lời câu hỏi và duyệt các hành động quan trọng.',
  'chatgpt-22': 'Có trò chuyện tạm thời, cài đặt bộ nhớ (kể cả bộ nhớ riêng cho từng Project), xem và đăng xuất các phiên đăng nhập (Active sessions) và Lockdown Mode hạn chế duyệt web, deep research, agent để giảm rủi ro rò dữ liệu.',
  'chatgpt-23': 'Deep research (gõ /Deepresearch) tạo báo cáo có trích dẫn; có thể giới hạn hoặc ưu tiên một số trang web làm nguồn và dừng giữa chừng để chỉnh hướng. Trích dẫn vẫn phải mở ra đọc.',
  'chatgpt-26': 'ChatGPT Images tạo và sửa ảnh, tạo ảnh động GIF và lưu ảnh tham chiếu để dùng lại. Chỉ dùng ảnh người thật khi có sự đồng ý; ghi chú nội dung do AI tạo.',
  'agent-9': 'Connectors theo chuẩn MCP (Model Context Protocol) cho AI gọi công cụ bên ngoài: Claude, ChatGPT, Gemini và Microsoft 365 Copilot đều hỗ trợ. Ứng dụng có thể mở ngay trong cửa sổ AI và AI xin duyệt trước khi thao tác.',
  'agent-15': 'Trợ lý trình duyệt (Claude in Chrome, Gemini trong Chrome, tác tử ChatGPT) đọc trang web có thể chứa chỉ dẫn ẩn. Các hãng thêm lớp bảo vệ như Lockdown Mode, xin xác nhận trước hành động nhạy cảm — nhưng không chặn được hết.',
  'agent-24': 'Quản trị viên có thể giới hạn từng connector và từng công cụ trong connector theo vai trò; người dùng có thể tắt công cụ không cần. Nguyên tắc: chỉ bật quyền đọc trước, quyền ghi khi thật sự cần.',
};
