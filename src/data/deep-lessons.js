import {courses} from './courses.js';
import {LESSON_CASES} from './lesson-cases.js';
import {EXTRA_FRAMEWORKS} from './courses-2026/index.js';
import {TOOLS_CHECKED} from './tool-updates.js';
// Nội dung được thiết kế cho từng chủ đề; phần lý thuyết ngắn là gợi ý sư phạm, không thay thế tài liệu gốc.
const frameworks={
photo:{principle:'Đọc ánh sáng, quan sát chủ thể, thử một thay đổi tại một thời điểm và so sánh hai ảnh trong cùng điều kiện.',tools:'Điện thoại/máy ảnh; nguồn sáng an toàn; vật thể quen thuộc; nền đơn giản.',quality:['Chủ thể rõ ràng','Ánh sáng và màu sắc phục vụ ý đồ','Giải thích được một lựa chọn kỹ thuật'],safety:'Xin phép trước khi chụp người khác; không đăng ảnh hoặc vị trí của trẻ em; không nhìn thẳng nguồn sáng mạnh.'},
claude:{principle:'Giao mục tiêu rõ, cung cấp ngữ cảnh vừa đủ, quy định định dạng đầu ra và kiểm tra bằng nguồn độc lập.',tools:'Mẫu prompt, tài liệu giả lập, bảng tiêu chí; tài khoản AI chỉ khi được phép.',quality:['Đúng yêu cầu','Nêu rõ giả định và giới hạn','Có bước đối chiếu nguồn'],safety:'Không đưa dữ liệu cá nhân, mật khẩu hay tài liệu nội bộ vào công cụ AI.'},
chatgpt:{principle:'Xác định vấn đề trước khi hỏi AI; yêu cầu lý do và bằng chứng; kiểm tra lại trước khi sử dụng.',tools:'Mẫu hội thoại giả lập, bảng so sánh, danh sách nguồn đáng tin.',quality:['Đặt câu hỏi cụ thể','Đánh giá tính đúng đắn','Cải tiến dựa trên phản hồi'],safety:'Không sử dụng AI để gian lận học tập; không tin tuyệt đối vào trích dẫn AI tạo.'},
agent:{principle:'Tách mục tiêu thành các bước nhỏ, xác định đầu vào/đầu ra, quyền công cụ, điều kiện dừng và điểm phê duyệt.',tools:'Sơ đồ khối, dữ liệu giả lập, bộ kiểm thử tình huống.',quality:['Luồng đúng thứ tự','Có xử lý dữ liệu lỗi','Có giới hạn quyền và phê duyệt'],safety:'Chỉ mô phỏng; không tự động gửi dữ liệu, mua hàng, nhắn tin hoặc thay đổi tài khoản thật.'}
};
const cases={
photo:[['Chân dung cạnh cửa sổ','Tạo hai bản phác thảo ánh sáng: một bên và hai bên; giải thích vùng sáng/tối.'],['Xóa phông cho đồ vật','So sánh hai bố cục với chủ thể cách nền khác nhau; ghi nhận độ tách nền.'],['Chuyển động của quả bóng','Dự đoán ảnh với tốc độ nhanh/chậm rồi giải thích vì sao nét hoặc nhòe.'],['Cảnh tối trong nhà','So sánh ảnh sáng và ảnh ít nhiễu; giải thích đánh đổi ISO.'],['Ánh sáng vàng và trắng','Chọn điểm trắng tham chiếu; mô tả vì sao màu bị lệch.'],['Bố cục quà tặng','Đặt sản phẩm tại giao điểm một phần ba và thử bố cục trung tâm.'],['Góc máy sản phẩm','Chọn ba góc chụp cùng sản phẩm, ghi nhận góc nào cho thấy hình dạng rõ nhất.']],
claude:[['Viết lời giao việc','Tạo prompt có vai trò, mục tiêu, ngữ cảnh, ràng buộc và tiêu chí nghiệm thu.'],['Sửa yêu cầu mơ hồ','Biến câu “viết hay hơn” thành yêu cầu có đối tượng, mục đích và độ dài.'],['Kiểm tra câu trả lời','Đánh dấu một thông tin cần dẫn nguồn và đề xuất cách xác minh.'],['Phân tích tài liệu','Tách nhận định có căn cứ và suy luận chưa được chứng minh.'],['Thiết kế đầu ra','Định nghĩa mẫu bảng gồm trường dữ liệu và ví dụ một hàng.'],['Phản biện phương án','Yêu cầu AI đưa ra hai giải pháp và ba rủi ro cho mỗi giải pháp.'],['Lặp lại có chủ đích','So sánh prompt trước/sau và nêu thay đổi tác động lớn nhất.']],
chatgpt:[['Đặt câu hỏi đúng','Viết một câu hỏi cụ thể và ba thông tin nền cần thiết.'],['Giải thích cho người mới','Yêu cầu hai cách giải thích, chọn cách dễ hiểu hơn và lý giải.'],['Học chủ động','Biến câu trả lời thành ba câu hỏi tự kiểm tra.'],['Kiểm chứng nguồn','Chọn một tuyên bố và mô tả nơi kiểm chứng độc lập.'],['Tổ chức ý tưởng','Lập dàn ý có mở đầu, bằng chứng và kết luận.'],['Sửa lỗi lập luận','Tìm giả định chưa được chứng minh trong một câu trả lời mẫu.'],['Tạo sản phẩm','Viết bản nháp và bộ tiêu chí để tự chỉnh sửa.']],
agent:[['Chia nhiệm vụ','Vẽ đầu vào, xử lý và đầu ra của một trợ lý giả lập.'],['Chọn công cụ','Chọn công cụ tối thiểu cho tác vụ; nêu quyền không cần cấp.'],['Xử lý lỗi','Tạo một trường hợp dữ liệu rỗng và nhánh khôi phục.'],['Kiểm tra trước hành động','Thêm bước xác nhận trước khi gửi hay thay đổi dữ liệu.'],['Quản lý trạng thái','Chỉ ra thông tin nào cần lưu và khi nào phải xóa.'],['Chống lệnh không tin cậy','Phân biệt dữ liệu người dùng và chỉ thị hệ thống.'],['Kiểm thử Agent','Thiết kế ba test: bình thường, sai dữ liệu và thiếu quyền.']]
};
Object.assign(frameworks,EXTRA_FRAMEWORKS);
export function deepLesson(courseId,index){const c=courses.find(c=>c.id===courseId);const lesson=c?.lessons[index];if(!lesson)return null;const f=frameworks[courseId],own=LESSON_CASES[lesson.id];
// Prefer the hand-written case for this lesson; fall back to the rotating course template.
const caseInfo=own?[own.situation,own.task]:cases[courseId][index%7];const title=lesson.title;return {
concept:own?own.concept:`${title}: ${f.principle}`,
scenario:own?`${own.situation} Nhiệm vụ: ${own.task}`:`${caseInfo[0]}. Nhiệm vụ: ${caseInfo[1]}`,
materials:f.tools,
steps:[`Dự đoán: ghi một kết quả mong đợi liên quan đến “${title}”.`,`Thử nghiệm: ${caseInfo[1]}`,`Đối chiếu: thay đổi đúng một yếu tố, ghi lại điều khác biệt.`,`Giải thích: chỉ ra bằng chứng và một giới hạn của kết quả.`],
assessment:f.quality,
misconception:own?own.misconception:courseId==='photo'?'Ảnh sáng hơn không phải lúc nào cũng tốt hơn; phải xét mục đích và chi tiết.':courseId==='agent'?'Quy trình chạy hết không có nghĩa là an toàn; cần thử dữ liệu lỗi và quyền hạn.':'Câu trả lời nghe hợp lý không đồng nghĩa với đúng; cần kiểm chứng.',
safety:f.safety,
tools:own?.tools||'',toolsChecked:TOOLS_CHECKED,
transfer:`Thử áp dụng “${title}” trong một tình huống khác; ghi lại điểm cần thay đổi.`,
sourceType:'Khung bài tập do học viện biên soạn; cần giáo viên chuyên môn thẩm định trước khi dùng chính thức.'
}}
