import {courses} from './courses.js';
import {EXTRA_SCENARIOS} from './courses-2026/index.js';
// One authored scenario object per lesson, generated deterministically from the course curriculum.
// Scenario prompts are tied to each skill; choice positions vary to avoid answer-position memorization.
const contexts={
 photo:['Một cửa hàng thủ công chuẩn bị bộ ảnh giới thiệu sản phẩm','Một câu lạc bộ trường cần ảnh cho triển lãm','Một nhóm bạn làm album ghi lại hoạt động cộng đồng','Một thư viện muốn chụp ảnh vật phẩm để lưu trữ'],
 claude:['Nhóm biên tập cần tài liệu hướng dẫn rõ nguồn','Câu lạc bộ khoa học cần bản giải thích dễ hiểu','Nhóm dự án cần soát lỗi một bản nháp','Một nhóm học sinh cần đối chiếu hai phương án'],
 chatgpt:['Câu lạc bộ cần kế hoạch khả thi','Một nhóm học tập cần bài trình bày chính xác','Đội tình nguyện cần phân chia công việc','Nhóm sáng tạo cần cải tiến sản phẩm'],
 agent:['Thư viện muốn xây trợ lý tra cứu có kiểm soát','Câu lạc bộ muốn tự động phân loại yêu cầu','Nhóm dự án muốn theo dõi công việc bằng Agent','Đội hỗ trợ muốn xây quy trình xử lý ngoại lệ']
};
const operations={
 photo:['Thử thiết lập và ghi thông số chụp','So sánh hai cách bố trí và giải thích sự khác biệt','Chụp thử hoặc phác sơ đồ bố cục','Đánh giá chất lượng và quyền sử dụng hình ảnh'],
 claude:['Viết prompt có đầu vào, mục tiêu và định dạng','Đối chiếu phát biểu với nguồn gốc','Tạo bản nháp và phiên bản đã sửa','Ghi lại giới hạn, bằng chứng và quyết định biên tập'],
 chatgpt:['Đặt mục tiêu, đối tượng và ràng buộc','Tạo hai phương án rồi so sánh','Phát hiện thông tin thiếu căn cứ','Thử lại prompt và ghi thay đổi'],
 agent:['Vẽ sơ đồ tác nhân, công cụ và dữ liệu','Xác định quyền hạn tối thiểu','Thử tình huống lỗi và cách khôi phục','Bổ sung bước phê duyệt trước hành động ngoài hệ thống']
};
const deliverables={photo:'ảnh thử hoặc sơ đồ có chú thích thông số và lý do chọn',claude:'prompt, đầu ra mẫu và bản chỉnh sửa có dấu vết kiểm chứng',chatgpt:'bản nháp, prompt sửa đổi và sản phẩm cuối có kiểm chứng',agent:'sơ đồ luồng, bảng quyền hạn, kịch bản thử lỗi và kết quả mong đợi'};
// Each option has a short [0] and a long [1] wording. Wrong options are tempting real-world mistakes
// (copying a sample, changing everything at once, polishing instead of verifying), not absurd ones,
// and option length is varied so "pick the longest/most careful-sounding answer" does not work.
const traps={
 photo:[`Giữ ảnh, sửa mạnh bằng hậu kỳ`,`Giữ nguyên ảnh đã chụp rồi tăng mạnh độ sáng, độ bão hòa và độ nét bằng phần mềm hậu kỳ`,'Sửa mạnh bằng hậu kỳ không chữa được ánh sáng hay bố cục sai lúc chụp'],
 claude:[`Bảo AI “viết lại cho hay hơn”`,`Yêu cầu AI “viết lại cho hay hơn” vài lần rồi chọn bản đọc trôi chảy, tự tin nhất`,'Bản trôi chảy, tự tin hơn chưa chắc đúng hơn nếu không nói rõ chỗ nào chưa đạt'],
 chatgpt:[`Hỏi lại cùng câu đến khi ưng ý`,`Hỏi lại đúng câu cũ nhiều lần cho đến khi ChatGPT đưa ra câu trả lời nghe hợp lý nhất`,'Hỏi lại cùng một câu chỉ là chọn ngẫu nhiên, không tìm ra nguyên nhân'],
 agent:[`Cấp thêm quyền để Agent tự sửa`,`Cấp thêm quyền và cho Agent tự thử lại không giới hạn đến khi chạy được, không dừng lại hỏi`,'Thêm quyền và thử lại vô hạn làm tăng rủi ro và chi phí mà không chỉ ra lỗi']
};
// Length patterns [correct, wrongA, wrongB]: 0 = short, 1 = long. Mixed so the right answer is sometimes
// the longest, sometimes the shortest, sometimes in between.
for(const [id,s] of Object.entries(EXTRA_SCENARIOS)){contexts[id]=s.contexts;operations[id]=s.operations;deliverables[id]=s.deliverable;traps[id]=s.trap;}
const PATTERNS=[[1,1,0],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[0,0,1]];
function stage(title,prompt,correctV,wrongAV,wrongBV,explain,seed,patternSeed){const p=PATTERNS[patternSeed%PATTERNS.length];const correct=correctV[p[0]];const choices=[correct,wrongAV[p[1]],wrongBV[p[2]]];const offset=seed%3;const rotated=choices.slice(offset).concat(choices.slice(0,offset));return {title,prompt,choices:rotated,correct:rotated.indexOf(correct),explain};}
export function scenarioFor(course,lesson){if(!contexts[course]||!lesson?.id)throw Error('Bài học không hợp lệ');const n=Number(lesson.id.split('-').at(-1));if(!Number.isInteger(n)||n<1)throw Error('Mã bài học không hợp lệ');const topic=lesson.title;const context=contexts[course][(n-1)%4];const op=operations[course][n%4];const trap=traps[course];const stages=[
 stage('Nhận đề bài',`${context}. Để thực hiện kỹ năng “${topic}”, em cần làm gì đầu tiên?`,
  [`Làm rõ mục tiêu, điều kiện và tiêu chí đạt của “${topic}”`,`Hỏi người giao việc về mục tiêu, người dùng, điều kiện thực hiện và thế nào là đạt cho “${topic}”`],
  [`Tìm một mẫu “${topic}” nổi tiếng và làm giống hệt`,`Tìm một mẫu “${topic}” được nhiều người khen trên mạng rồi làm giống hệt để chắc chắn đẹp`],
  [`Bắt tay làm “${topic}” ngay, xong mới hỏi lại`,`Bắt tay làm “${topic}” theo cách quen thuộc nhất, làm xong mới hỏi lại người giao việc có đúng ý không`],
  `Cần biết thế nào là “đạt” trước khi làm. Chép một mẫu nổi tiếng hoặc làm theo thói quen dễ đẹp theo ý mình nhưng lệch yêu cầu thật.`,n,n),
 stage('Thử nghiệm và so sánh',`Kết quả đầu tiên của “${topic}” chưa đáp ứng yêu cầu. Em chọn hướng nào?`,
  [`Chỉ đổi một yếu tố mỗi lần và so sánh trước/sau`,`${op}, mỗi lần chỉ đổi một yếu tố và ghi lại trước/sau`],
  [`Đổi cùng lúc nhiều yếu tố để nhanh có bản tốt`,`Đổi cùng lúc tất cả yếu tố có thể đổi để nhanh tìm ra phiên bản tốt, không cần ghi lại từng lần`],
  [trap[0],trap[1]],
  `Đổi một yếu tố mỗi lần và ghi trước/sau mới biết thay đổi nào có tác dụng. Đổi nhiều thứ cùng lúc che mất nguyên nhân; ${trap[2].charAt(0).toLowerCase()+trap[2].slice(1)}.`,n+1,n+2),
 stage('Bàn giao và trách nhiệm',`Trước khi bàn giao sản phẩm liên quan đến “${topic}”, em kiểm tra gì?`,
  [`Đối chiếu tiêu chí, kiểm chứng kết quả và nêu giới hạn`,`Đối chiếu từng tiêu chí, kiểm chứng kết quả, bảo vệ dữ liệu cá nhân và ghi rõ giới hạn còn lại`],
  [`Soát chính tả, bố cục và định dạng`,`Soát kỹ chính tả, bố cục, màu sắc và định dạng để sản phẩm trông thật chuyên nghiệp rồi gửi ngay`],
  [`Nhờ một bạn xem, thấy ổn là gửi`,`Nhờ một bạn cùng nhóm xem qua, nếu bạn thấy ổn thì bàn giao luôn mà không cần đối chiếu lại`],
  `Hình thức đẹp hoặc một người thấy “ổn” chưa chứng minh sản phẩm đúng yêu cầu. Cần đối chiếu tiêu chí, kiểm chứng và nêu rõ giới hạn.`,n+2,n+4)
 ];return {name:`Hồ sơ ${String(n).padStart(2,'0')}: ${topic}`,brief:`${context}. Vai trò của em: thực hiện “${topic}” và bàn giao ${deliverables[course]}.`,lesson:lesson.id,deliverable:deliverables[course],stages};}
export const SCENARIOS=Object.fromEntries(courses.flatMap(c=>c.lessons.map(l=>[l.id,scenarioFor(c.id,l)])));
