export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function rubric({objective=false,reason=false,verified=false,artifact=false}) {
 const details={objective:objective?25:0,reason:reason?25:0,verified:verified?25:0,artifact:artifact?25:0};
 return {score:Object.values(details).reduce((a,b)=>a+b,0),details,passed:objective&&reason&&verified&&artifact};
}
export function promptAudit(text){
 const t=text.trim(); const signals={goal:/\b(hãy|tạo|viết|phân tích|lập|thiết kế|giải thích|kiểm tra|soạn|xây dựng)\b/i.test(t),context:/\b(cho|dành cho|đối tượng|bối cảnh|vì|trong|mục tiêu)\b/i.test(t),format:/\b(bảng|danh sách|đoạn|bước|slide|json|mục|tiêu đề)\b/i.test(t),check:/\b(kiểm chứng|nguồn|đối chiếu|không bịa|giả định|kiểm tra|nếu thiếu)\b/i.test(t)};
 return {signals,score:Object.values(signals).filter(Boolean).length*25,advice:Object.entries(signals).filter(([,v])=>!v).map(([k])=>({goal:'Nêu hành động cụ thể AI cần làm.',context:'Cho biết người đọc, mục tiêu hoặc bối cảnh.',format:'Nêu định dạng đầu ra mong muốn.',check:'Yêu cầu kiểm chứng và nêu điều chưa chắc chắn.'}[k]))};
}
export function inspectClaim(choice){return choice==='verify'?{score:100,message:'Đúng: đối chiếu với nguồn gốc và thời điểm.'}:{score:25,message:'Chưa đủ: câu trả lời trôi chảy không chứng minh tính đúng đắn.'};}
export const safeAgentSteps=['input','validate','plan','review','output'];
export function inspectAgentFlow(steps){const unique=new Set(steps);const missing=safeAgentSteps.filter(x=>!unique.has(x));const order=steps.join('|')===safeAgentSteps.join('|');return {score:missing.length?Math.max(0,60-missing.length*15):order?100:65,missing,order,passed:missing.length===0&&order};}
export function photoScore(x,y){const d=Math.hypot(x-.66,y-.4);return Math.round(clamp(100-d*170,0,100));}
export function nextDifficulty(history){const last=history.slice(-3);if(last.length<2)return 'Khám phá';const avg=last.reduce((a,b)=>a+b,0)/last.length;return avg>=85?'Thử thách':avg<50?'Luyện tập':'Khám phá';}
