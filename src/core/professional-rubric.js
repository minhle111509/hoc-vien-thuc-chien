import {courses} from '../data/courses.js';
export const CRITERIA={
 photo:[['Kỹ thuật','Thông số hoặc sơ đồ phù hợp mục tiêu'],['Ánh sáng/bố cục','Có thử nghiệm và giải thích lựa chọn'],['Kiểm soát chất lượng','Có kiểm tra độ nét, màu, sai sót'],['Quyền và an toàn','Có quyền sử dụng hình và bảo vệ người được chụp']],
 claude:[['Đặc tả yêu cầu','Prompt có mục tiêu, đầu vào, giới hạn, định dạng'],['Chất lượng lập luận','Có bản nháp và cải tiến dựa trên nhận xét'],['Kiểm chứng','Phân biệt dữ kiện, suy luận và nguồn'],['Bảo mật','Không tiết lộ dữ liệu nhạy cảm']],
 chatgpt:[['Xác định vấn đề','Mục tiêu, đối tượng và điều kiện rõ'],['Chất lượng giải pháp','Có phương án khả thi và bản sửa'],['Kiểm chứng','Có nguồn hoặc phép thử xác thực'],['Trách nhiệm','Không sao chép mù quáng, bảo vệ riêng tư']],
 agent:[['Thiết kế luồng','Có bước, trạng thái và đầu ra rõ'],['Giới hạn quyền','Phân quyền tối thiểu và phê duyệt'],['Kiểm thử','Có ca lỗi, phục hồi và chống lệnh giả'],['Đánh giá vận hành','Có tiêu chí đúng, an toàn và chi phí']]
};
import {EXTRA_RUBRIC} from '../data/courses-2026/index.js';
Object.assign(CRITERIA,EXTRA_RUBRIC);
export const LEVELS=['Chưa có minh chứng','Đang hình thành','Đạt yêu cầu','Vượt yêu cầu'];
export function rubricFor(course,lessonId){const lesson=courses.find(c=>c.id===course)?.lessons.find(l=>l.id===lessonId);if(!lesson)throw Error('Bài học không tồn tại');return {lessonId,topic:lesson.title,criteria:CRITERIA[course].map(([name,indicator])=>({name,indicator:`${indicator}; áp dụng cho “${lesson.title}”.`,max:25}))};}
export function gradeWithReviewer(course,lessonId,ratings,notes){const rubric=rubricFor(course,lessonId);if(!Array.isArray(ratings)||ratings.length!==4||ratings.some(n=>!Number.isInteger(n)||n<0||n>3))throw Error('Mức đánh giá không hợp lệ');if(typeof notes!=='string'||notes.trim().length<30)throw Error('Cần nhận xét và dẫn chứng cụ thể (ít nhất 30 ký tự)');const score=ratings.reduce((sum,n)=>sum+[0,10,20,25][n],0);return {lessonId,score,ratings,notes:notes.trim().slice(0,2000),reviewerType:'human',reviewedAt:new Date().toISOString(),status:score>=70?'Đạt theo người đánh giá':'Cần cải thiện'};}
