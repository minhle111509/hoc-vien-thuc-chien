import {promptAudit,inspectAgentFlow,photoScore} from '../core/engine.js';
const E=(tag,text='',cls='')=>{const n=document.createElement(tag);n.textContent=text;n.className=cls;return n};
const B=(text,fn,cls='')=>{const b=E('button',text,cls);b.type='button';b.addEventListener('click',fn);return b};
const P=(root,text)=>root.append(E('p',text));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const slider=(root,label,min,max,value,step,change)=>{const wrap=E('label');const name=E('span',`${label}: ${value}`);const input=document.createElement('input');Object.assign(input,{type:'range',min,max,value,step});input.addEventListener('input',()=>{name.textContent=`${label}: ${input.value}`;change(Number(input.value))});wrap.append(name,input);root.append(wrap);return input};
const taskNumber=(lesson)=>Number(lesson?.id?.match(/(\d+)$/)?.[1]||1);
export function mountChallenge(root,{type,lesson,onScore}){
 const stage=E('div','','challenge-stage');root.append(stage);
 const report=(score,reason)=>onScore(clamp(Math.round(score),0,100),reason);
 const number=taskNumber(lesson);
 if(type==='prompt'){
  P(stage,'Bạn là người điều phối dự án. Soạn yêu cầu AI rõ mục tiêu, người nhận, định dạng đầu ra và cách kiểm chứng.');
  const sample=E('div','Yêu cầu ban đầu: “Viết giúp tôi một bài.”','sample');stage.append(sample);
  const input=E('textarea');input.placeholder='Hãy... dành cho... trình bày thành... kiểm chứng...';input.setAttribute('aria-label','Prompt cần cải thiện');stage.append(input);
  const chips=E('div','','toolbar');[['🎯 Mục tiêu','Hãy tạo '],['👥 Đối tượng',' dành cho học sinh '],['📋 Định dạng',' trình bày dạng bảng 5 bước '],['🔎 Kiểm chứng',' nêu nguồn và đánh dấu thông tin cần kiểm chứng ']].forEach(([label,part])=>chips.append(B(label,()=>{input.value+=part;input.focus()})));stage.append(chips);
  stage.append(B('Kiểm tra prompt',()=>{const r=promptAudit(input.value);report(r.score,r.advice.join(' ')||'Đủ bốn thành phần. Đây là kiểm tra cấu trúc, chưa phải AI đánh giá chất lượng nội dung.');},'primary'));
 }else if(type==='detective'){
  const cases=[['AI khẳng định: “97% học sinh học nhanh gấp đôi với AI” nhưng không có nguồn khảo sát.','Kiểm tra nguồn gốc, cỡ mẫu và thời điểm','Chia sẻ ngay vì con số cụ thể','Dùng làm bằng chứng mà không ghi nguồn'],['AI trích dẫn một tên sách và số trang không thể tra cứu.','Tra cứu bản gốc và đối chiếu trích dẫn','Giữ nguyên vì AI rất tự tin','Tự bịa đường dẫn cho đẹp'],['Một bản tin AI viết có ngày tháng mâu thuẫn với tài liệu gốc.','So sánh tài liệu gốc và sửa thông tin','Chỉ chỉnh lỗi chính tả','Bỏ qua vì văn phong hay']];
  const [claim,correct,...wrong]=cases[(number-1)%cases.length];P(stage,claim);
  const options=[...wrong,correct].sort((a,b)=>a.localeCompare(b,'vi'));options.forEach(t=>stage.append(B(t,()=>report(t===correct?100:20,t===correct?'Đúng: luôn xác minh bằng nguồn đáng tin cậy.':'Cần kiểm chứng trước khi sử dụng hoặc công bố.'))));
 }else if(type==='agent'||type==='sequence'){
  const agent=type==='agent';const steps=agent?['Nhận yêu cầu','Kiểm tra dữ liệu','Lập kế hoạch','Xin phê duyệt','Trả kết quả']:['Xác định mục tiêu','Thu thập đầu vào','Thực hiện','Kiểm tra kết quả','Rút kinh nghiệm'];
  P(stage,agent?'Lắp ghép luồng xử lý an toàn. Đây là Agent mô phỏng, không thực thi hành động thật.':'Sắp xếp quy trình để hoàn thành nhiệm vụ hiệu quả.');
  const chosen=[];const output=E('div','Chưa chọn bước nào.','sample');const opts=E('div','','toolbar');const order=[2,4,0,3,1];order.forEach(i=>opts.append(B(steps[i],()=>{if(chosen.includes(i))return;chosen.push(i);output.textContent=chosen.map(j=>steps[j]).join(' → ')})));
  stage.append(opts,output,B('↶ Hoàn tác',()=>{chosen.pop();output.textContent=chosen.map(j=>steps[j]).join(' → ')||'Chưa chọn bước nào.'}),B('▶ Chạy thử quy trình',()=>{const correct=chosen.filter((v,i)=>v===i).length;const score=chosen.length===5&&correct===5?100:Math.max(0,correct*20-(5-chosen.length)*5);report(score,score===100?'Quy trình hợp lý và đầy đủ.':'Quan sát bước nào cần làm trước. Kiểm tra và phê duyệt phải diễn ra trước khi xuất kết quả.');},'primary'));
 }else if(type==='compare'){
  P(stage,'Khách hàng cần bản hướng dẫn 5 bước rõ ràng và có cảnh báo về thông tin chưa chắc chắn. Chọn đầu ra phù hợp nhất và giải thích.');
  const options=[['A','“Đây là mọi điều bạn cần biết. Chắc chắn đúng 100%.”'],['B','“Bước 1–5: …; mục tiêu từng bước; giả định cần xác minh; đề nghị đối chiếu nguồn.”'],['C','“Rất tuyệt! Hãy tin tôi và bắt đầu ngay.”']];
  const why=E('textarea');why.placeholder='Vì sao em chọn phương án này?';why.setAttribute('aria-label','Lý do lựa chọn');stage.append(why);
  options.forEach(([id,t])=>stage.append(B(`${id}. ${t}`,()=>{const reason=why.value.trim();report((id==='B'?75:10)+(reason.length>=25?25:0),id==='B'?'Đầu ra B có cấu trúc và thể hiện giới hạn. Hãy tự kiểm chứng nội dung.':'Đầu ra quá chắc chắn hoặc thiếu cấu trúc. Hãy xem xét tính kiểm chứng.');})))
 }else if(type==='debug'){
  P(stage,'Một Agent nhận yêu cầu, lập kế hoạch rồi tự động công khai dữ liệu trước khi kiểm tra. Hãy tìm lỗi nguy hiểm nhất.');
  const candidates=[['Thiếu bước kiểm tra và phê duyệt trước khi công khai',100],['Tên bước chưa đủ đẹp',15],['Chưa thêm biểu tượng cảm xúc',10]];
  candidates.forEach(([label,score])=>stage.append(B(label,()=>report(score,score===100?'Đúng. Không công khai dữ liệu khi chưa kiểm tra và chưa được phép.':'Ưu tiên an toàn dữ liệu và quyền phê duyệt.'))));
  P(stage,'Mô phỏng chỉ dùng dữ liệu giả; không có quyền truy cập dịch vụ bên ngoài.');
 }else if(type==='composition'){
  P(stage,'Chọn vị trí chủ thể để kể câu chuyện. Thử nhiều bố cục khác nhau trước khi chụp.');const scene=E('div','','scene');const grid=E('div','','thirds');const subject=E('div','📷','subject');scene.append(grid,subject);stage.append(scene);let x=.5,y=.5;
  const draw=()=>{subject.style.left=`${x*100}%`;subject.style.top=`${y*100}%`};draw();const move=(dx,dy)=>{x=clamp(x+dx,.05,.95);y=clamp(y+dy,.05,.95);draw()};
  const position=e=>{const r=scene.getBoundingClientRect();x=clamp((e.clientX-r.left)/r.width,.05,.95);y=clamp((e.clientY-r.top)/r.height,.05,.95);draw()};let dragging=false;scene.addEventListener('pointerdown',e=>{dragging=true;scene.setPointerCapture(e.pointerId);position(e)});scene.addEventListener('pointermove',e=>{if(dragging)position(e)});scene.addEventListener('pointerup',()=>dragging=false);scene.addEventListener('pointercancel',()=>dragging=false);
  const controls=E('div','','toolbar');[['←',-.04,0],['→',.04,0],['↑',0,-.04],['↓',0,.04]].forEach(([t,dx,dy])=>controls.append(B(t,()=>move(dx,dy))));stage.append(controls,B('📸 Chụp thử',()=>{const s=photoScore(x,y);report(s,s>=80?'Đã đạt mục tiêu bố cục của tình huống. Có thể thử lựa chọn sáng tạo khác.':'Hãy thử gần giao điểm đường một phần ba. Đây là một gợi ý bố cục, không phải quy tắc bắt buộc.');},'primary'));
 }else if(type==='lighting'){
  P(stage,'Đơn hàng: chụp một sản phẩm có vùng sáng rõ và bóng đổ vừa phải. Điều chỉnh hai đèn, quan sát thay đổi.');const scene=E('div','','light-scene');const obj=E('div','📦','light-object');scene.append(obj);stage.append(scene);let key=50,fill=50;
  const draw=()=>{scene.style.background=`linear-gradient(115deg,rgba(255,241,185,${key/110}),rgba(10,25,53,${1-fill/150}))`;obj.style.filter=`brightness(${.45+key/100+fill/250}) drop-shadow(${Math.round((100-fill)/8)}px 12px ${Math.round((100-fill)/6)}px #050b17)`};draw();slider(stage,'Đèn chính',0,100,key,5,v=>{key=v;draw()});slider(stage,'Đèn phụ',0,100,fill,5,v=>{fill=v;draw()});stage.append(B('📸 Chụp thử',()=>{const score=100-Math.abs(key-75)*1.2-Math.abs(fill-40)*.8;report(score,score>=80?'Ánh sáng phù hợp yêu cầu của khách hàng giả định.':'Thử tăng đèn chính vừa phải, giữ đèn phụ thấp hơn để còn chiều sâu.');},'primary'));
 }else if(type==='exposure'){
  P(stage,'Thử nghiệm tam giác phơi sáng: khẩu độ, tốc độ và ISO tác động đồng thời đến độ sáng. Đây là mô hình giản lược.');const scene=E('div','🏃','exposure-scene');stage.append(scene);let aperture=4,shutter=125,iso=200;
  const draw=()=>{const ev=Math.log2((aperture*aperture/shutter)/(4*4/125))-Math.log2(iso/200);const brightness=clamp(1-ev*.2,.35,1.9);scene.style.filter=`brightness(${brightness})`;scene.style.textShadow=`${Math.max(0,250/shutter-1)*5}px 0 8px #fff`};draw();slider(stage,'Khẩu độ f/',2,16,4,1,v=>{aperture=v;draw()});slider(stage,'Mẫu số tốc độ 1/',30,500,125,5,v=>{shutter=v;draw()});slider(stage,'ISO',100,1600,200,100,v=>{iso=v;draw()});stage.append(B('📷 Kiểm tra ảnh',()=>{const ev=Math.log2((aperture*aperture/shutter)/(16/125))-Math.log2(iso/200);const score=clamp(100-Math.abs(ev)*24,0,100);report(score,score>=80?'Độ sáng gần mục tiêu; hãy quan sát cả chuyển động và nhiễu.':'Độ sáng chưa cân bằng. Thử thay đổi một thông số rồi quan sát.');},'primary'));
 }else if(type==='color'){
  P(stage,'Một bức ảnh bị ám màu và hơi tối. Hãy cân chỉnh nhiệt độ màu và độ sáng để chủ thể tự nhiên hơn.');const scene=E('div','🌻','color-scene');stage.append(scene);let temp=30,bright=65;const draw=()=>{scene.style.background=`linear-gradient(110deg,rgba(255,165,55,${temp/100}),rgba(75,150,255,${1-temp/100}))`;scene.style.filter=`brightness(${bright/65})`};draw();slider(stage,'Độ ấm màu',0,100,temp,5,v=>{temp=v;draw()});slider(stage,'Độ sáng',20,100,bright,5,v=>{bright=v;draw()});stage.append(B('🎨 So sánh kết quả',()=>{const score=100-Math.abs(temp-50)*1.5-Math.abs(bright-70);report(score,score>=80?'Màu và độ sáng gần mục tiêu trung tính.':'Thử cân bằng màu về giữa và tăng độ sáng vừa phải.');},'primary'));
 }
 return ()=>stage.replaceChildren();
}
