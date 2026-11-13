/* Four distinct, accessible mastery mechanics. All assessments are formative,
   deterministic, and explicitly separate from verified portfolio review. */
import {questById} from '../data/showcase-quests.js';
const E=(tag,text='',cls='')=>{const n=document.createElement(tag);n.textContent=text;n.className=cls;return n};
const add=(p,...xs)=>(p.append(...xs),p);
export const LAB_KINDS=Object.freeze({photo:'camera',claude:'editor',chatgpt:'investigator',agent:'pipeline'});
export const labKind=id=>LAB_KINDS[id.split('-')[0]]||null;
export function scoreCamera({aperture,shutter,iso},target='portrait'){
 const a=Number(aperture),s=Number(shutter),i=Number(iso);
 if(![a,s,i].every(Number.isFinite))return 0;
 const ranges=target==='motion'?[[4,11],[500,2000],[100,1600]]:target==='product'?[[5.6,13],[60,500],[100,800]]:[[1.8,5.6],[125,1000],[100,800]];
 return Math.round(100*[a,s,i].filter((v,j)=>v>=ranges[j][0]&&v<=ranges[j][1]).length/3);
}
export function inspectEditorial(text,source){const t=String(text).toLowerCase(),s=String(source).toLowerCase();return {source:t.includes('nguồn')||t.includes('trích'),uncertainty:t.includes('chưa xác minh')||t.includes('cần kiểm chứng')||t.includes('không đủ'),scope:t.includes('giới hạn')||t.includes('phạm vi'),sourceQuoted:s.length>15};}
export function verifyInvestigation(selected){const key=['A','C'];return {correct:key.every(x=>selected.includes(x))&&selected.length===key.length,expected:key};}
export function simulatePipeline(nodes,scenario='normal'){
 const steps=['receive','validate','review','approve','deliver'];const order=nodes.join('|');const valid=steps.every((s,i)=>nodes[i]===s)&&nodes.length===steps.length;
 if(!valid)return {ok:false,trace:['Luồng sai thứ tự hoặc thiếu bước. Cần: tiếp nhận → xác thực → rà soát → phê duyệt → bàn giao.']};
 const trace=['Tiếp nhận yêu cầu','Xác thực cấu trúc dữ liệu'];
 if(scenario==='invalid')return {ok:true,blocked:true,trace:[...trace,'Phát hiện dữ liệu thiếu: dừng và yêu cầu bổ sung. Không bàn giao.']};
 if(scenario==='untrusted')return {ok:true,blocked:true,trace:[...trace,'Phát hiện chỉ dẫn không đáng tin: bỏ qua, chuyển người phụ trách.']};
 return {ok:true,blocked:false,trace:[...trace,'Rà soát kết quả','Chờ người phụ trách phê duyệt','Bàn giao kết quả giả lập']};
}
const scenes={photo:{title:'📸 Studio thử nghiệm máy ảnh',story:'Khách hàng cần bộ ảnh đúng mục đích. Chọn thông số, chụp thử, đọc phản hồi kỹ thuật và lý giải lựa chọn.'},claude:{title:'🟠 Xưởng biên tập bằng chứng',story:'Một bản tóm tắt AI có khẳng định chưa kiểm chứng. Hãy viết yêu cầu sửa bản thảo, chỉ rõ nguồn và giới hạn.'},chatgpt:{title:'🟢 Phòng điều tra thông tin',story:'AI trả lời rất tự tin. Hãy xác định những tuyên bố cần đối chiếu nguồn trước khi sử dụng.'},agent:{title:'🔵 Nhà máy Agent an toàn',story:'Xếp các khối quy trình theo đúng thứ tự. Chạy ba bộ dữ liệu giả lập để tìm lỗi và điều kiện dừng.'}};
const sampleClaims=[['A','Một bài viết không ghi nguồn tuyên bố 92% học sinh đồng ý.','Chưa có phương pháp khảo sát và nguồn xác minh.'],['B','Bảng dữ liệu do giáo viên cung cấp ghi 12 quyển sách đã được mượn.','Có thể kiểm tra trực tiếp bảng dữ liệu nguồn.'],['C','AI nói chắc chắn mọi trường đều áp dụng một quy định.','Khẳng định tuyệt đối cần đối chiếu văn bản chính thức.']];
export function mountMasteryLab(root,lesson,{onScore=()=>{}}={}){
 const q=questById(lesson.id);if(!q)return null;
 const kind=labKind(lesson.id);if(!kind)return null;
 const group=lesson.id.split('-')[0];const card=E('section','','card mastery-lab');const desc=scenes[group];add(card,E('h2',desc.title),E('p',desc.story),E('p','Bài thực hành bổ sung: điểm là phản hồi trong mô phỏng, không phải chứng nhận năng lực.','muted'));
 const stage=E('div','','mastery-stage');card.append(stage);const output=E('div','Thử nghiệm để xem nhật ký kết quả.','feedback');output.setAttribute('role','status');
 const evidence=E('textarea');evidence.placeholder='Ghi bằng chứng thực hành: em đã thử gì, quan sát gì, cần sửa gì? (không nhập dữ liệu cá nhân)';evidence.setAttribute('aria-label','Nhật ký minh chứng');
 const save=E('button','Lưu nhật ký thử nghiệm','primary');save.addEventListener('click',()=>{if(evidence.value.trim().length<50){output.textContent='Nhật ký cần ít nhất 50 ký tự để mô tả thử nghiệm và điều chỉnh.';return}try{localStorage.setItem('academy_mastery_'+lesson.id,JSON.stringify({note:evidence.value.slice(0,3000),date:new Date().toISOString()}));output.textContent='Đã lưu nhật ký trên thiết bị này. Chưa được chuyên gia xác thực.'}catch{output.textContent='Không lưu được. Hãy kiểm tra dung lượng bộ nhớ trình duyệt.'}});
 const record=(score,notes)=>{output.replaceChildren(E('strong',`Kết quả mô phỏng ${score}/100`),...notes.map(x=>E('p',x)));onScore(score,`Phòng thực hành chuyên biệt: ${notes[0]||''}`)};
 if(kind==='camera'){
  const canvas=E('canvas');canvas.width=720;canvas.height=300;canvas.setAttribute('aria-label','Khung ảnh mô phỏng mức sáng, độ sâu trường ảnh và chuyển động');stage.append(canvas);
  const target=lesson.id.endsWith('-3')?'motion':lesson.id.endsWith('-1')?'product':'portrait';const values={aperture:4,shutter:250,iso:200};const controls=E('div','','mastery-controls');
  for(const [key,label,min,max,step] of [['aperture','Khẩu độ f/',1.8,16,.2],['shutter','Tốc độ 1/',30,2000,10],['iso','ISO',100,3200,100]]){const wrap=E('label',label);const range=E('input');range.type='range';range.min=min;range.max=max;range.step=step;range.value=values[key];const val=E('strong',String(values[key]));range.addEventListener('input',()=>{values[key]=Number(range.value);val.textContent=range.value;draw()});add(wrap,range,val);controls.append(wrap)}stage.append(controls);
  function draw(){const ctx=canvas.getContext('2d');if(!ctx)return;const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);const ev=Math.log2(values.iso/100)+Math.log2(250/values.shutter)-2*Math.log2(values.aperture/4);const lum=Math.max(.12,Math.min(.95,.48+ev*.10));ctx.fillStyle=`hsl(212 35% ${Math.round(lum*60)}%)`;ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffffff55';for(const x of [w/3,2*w/3]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}const blur=Math.max(0,7-values.aperture*.5);ctx.filter=`blur(${blur}px)`;for(let x=70;x<680;x+=130){ctx.fillStyle='#5fa18a';ctx.beginPath();ctx.arc(x,100,26,0,Math.PI*2);ctx.fill()}ctx.filter='none';ctx.fillStyle='#e9aa75';ctx.beginPath();ctx.roundRect(295,110,130,145,20);ctx.fill();if(target==='motion'){ctx.filter=`blur(${Math.max(0,14-values.shutter/80)}px)`;ctx.fillStyle='#ffcf76';ctx.beginPath();ctx.arc(560,180,35,0,Math.PI*2);ctx.fill();ctx.filter='none'}ctx.fillStyle='#ffffff';ctx.font='16px sans-serif';ctx.fillText(`f/${values.aperture} · 1/${values.shutter}s · ISO ${values.iso}`,18,28)}draw();
  const shoot=E('button','📷 Chụp thử và phân tích','primary');shoot.addEventListener('click',()=>{const score=scoreCamera(values,target);record(score,[`Độ sáng và hiệu ứng là mô phỏng định tính. Mục tiêu: ${target==='motion'?'đóng băng chuyển động':target==='product'?'chụp sản phẩm':'chân dung'}.`,'So sánh ít nhất hai cấu hình và giải thích đánh đổi giữa khẩu độ, tốc độ và ISO.'])});stage.append(shoot);
 }else if(kind==='editor'){
  const sample=E('blockquote','“Tất cả học sinh học bằng AI đều đạt kết quả tốt hơn 80%.” — bản nháp không có nguồn.');stage.append(sample);
  const source=E('textarea');source.placeholder='Ghi nguồn giả định hoặc dữ liệu cần yêu cầu đối chiếu (không tự bịa trích dẫn).';source.setAttribute('aria-label','Nguồn cần đối chiếu');const edit=E('textarea');edit.placeholder='Viết hướng dẫn cho Claude: yêu cầu nêu nguồn, mức độ chắc chắn, phạm vi và phần chưa xác minh.';edit.setAttribute('aria-label','Yêu cầu biên tập');add(stage,source,edit);
  const run=E('button','🔍 Kiểm tra yêu cầu biên tập','primary');run.addEventListener('click',()=>{const r=inspectEditorial(edit.value,source.value);const labels={source:'Yêu cầu trích nguồn',uncertainty:'Nêu thông tin chưa xác minh',scope:'Xác định phạm vi/giới hạn',sourceQuoted:'Có thông tin nguồn để đối chiếu'};const passed=Object.values(r).filter(Boolean).length;record(passed*25,Object.entries(r).map(([k,v])=>`${v?'✓':'↻'} ${labels[k]}`));});stage.append(run);
 }else if(kind==='investigator'){
  const checks=[];for(const [id,claim] of sampleClaims){const label=E('label',`${id}. ${claim}`,'claim-row');const input=E('input');input.type='checkbox';input.value=id;label.prepend(input);checks.push(input);stage.append(label)}
  const run=E('button','🕵️ Kiểm tra lựa chọn và lý do','primary');run.addEventListener('click',()=>{const selected=checks.filter(x=>x.checked).map(x=>x.value);const r=verifyInvestigation(selected);record(r.correct?100:40,sampleClaims.map(([id,,why])=>`${r.expected.includes(id)?'Cần kiểm chứng':'Có thể đối chiếu dữ liệu gốc'} (${id}): ${why}`))});stage.append(run);
 }else if(kind==='pipeline'){
  const catalog=[['receive','📥 Tiếp nhận'],['validate','🔎 Xác thực'],['review','🧪 Rà soát'],['approve','👤 Phê duyệt'],['deliver','📤 Bàn giao']];let flow=[];const lane=E('div','','pipeline-lane');const refresh=()=>{lane.replaceChildren(...flow.map((x,i)=>{const b=E('button',`${i+1}. ${catalog.find(y=>y[0]===x)[1]} ×`,'pipeline-node');b.addEventListener('click',()=>{flow.splice(i,1);refresh()});return b}))};const palette=E('div','','pipeline-palette');for(const [id,name] of catalog){const b=E('button',name,'pipeline-node');b.addEventListener('click',()=>{if(!flow.includes(id)){flow.push(id);refresh()}});palette.append(b)}add(stage,E('p','Chạm các khối theo thứ tự để xây quy trình; chạm khối đã chọn để bỏ.'),palette,lane);refresh();
  const scenario=E('select');for(const [id,name] of [['normal','Dữ liệu hợp lệ'],['invalid','Thiếu thông tin'],['untrusted','Chỉ dẫn không đáng tin']])scenario.add(new Option(name,id));scenario.setAttribute('aria-label','Tình huống kiểm thử');stage.append(scenario);
  const run=E('button','▶ Chạy thử Agent giả lập','primary');run.addEventListener('click',()=>{const r=simulatePipeline(flow,scenario.value);record(r.ok?100:20,r.trace.map((x,i)=>`${i+1}. ${x}`))});stage.append(run);
 }
 add(card,output,E('h3','🧾 Nhật ký thực hành'),evidence,save);root.append(card);return ()=>card.remove();
}
