import {CASES,decide} from '../core/decision-engine.js';
const make=(tag,txt,cls)=>{const e=document.createElement(tag);if(txt)e.textContent=txt;if(cls)e.className=cls;return e};
const KEY='academy_decisions_v1';
export function mountDecisionRoom(root,id){const c=CASES[id];if(!c)return ()=>{};const panel=make('section',null,'card decision-room');panel.setAttribute('aria-label','Phòng tình huống nghề nghiệp');root.append(panel);
 panel.append(make('h2','🧩 Tình huống nghề nghiệp · '+c.title),make('p',c.setup));
 const choices=make('div',null,'decision-choices');const feedback=make('div','Chọn một phương án để thấy hệ quả.','feedback');feedback.setAttribute('role','status');const next=make('div',null,'decision-next');let first=null,second=null;
 const store=()=>{try{const all=JSON.parse(localStorage.getItem(KEY)||'{}');all[id]={first,second,date:new Date().toISOString().slice(0,10)};localStorage.setItem(KEY,JSON.stringify(all))}catch{feedback.append(make('p','Không thể lưu tiến độ trên trình duyệt này.'))}};
 const finish=()=>{const r=decide(id,first,second);feedback.textContent=`Hai quyết định: ${r.score}/100 điểm mô phỏng. ${r.firstFeedback} ${r.secondCorrect?'Phương án xử lý tình huống mới phù hợp.':'Hãy xem xét lại tình huống phát sinh.'} Điểm này KHÔNG chứng nhận năng lực thực tế.`;store()};
 c.choices.forEach((label,i)=>{const b=make('button',label,'decision-option');b.addEventListener('click',()=>{first=i;second=null;const r=decide(id,i);feedback.textContent=`Hệ quả: ${r.firstFeedback} ${r.firstCorrect?'✓ Phương án có cơ sở.':'↻ Có rủi ro cần cân nhắc.'}`;next.replaceChildren(make('h3','⚡ Diễn biến mới'),make('p',c.twist));c.follow.forEach((follow,j)=>{const btn=make('button',follow,'decision-option');btn.addEventListener('click',()=>{second=j;finish()});next.append(btn)});store()});choices.append(b)});
 panel.append(choices,feedback,next,make('p','Bạn có thể thử lại mà không bị trừ điểm. Mỗi tình huống có nhiều yếu tố ngoài đời chưa thể mô phỏng.','muted'));
 return ()=>panel.remove();}
