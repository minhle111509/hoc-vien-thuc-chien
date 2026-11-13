/** Evidence-oriented assessment. Never infer real-world quality from text length. */
export const DIMENSIONS=['accuracy','process','verification','safety'];
export function validateEvidence(input){
 if(!input||typeof input!=='object')throw Error('Thiếu hồ sơ minh chứng');
 const {goal,artifact,iterations,tests,limitations}=input;
 if([goal,artifact,limitations].some(x=>typeof x!=='string'))throw Error('Thiếu mục tiêu, sản phẩm hoặc giới hạn');
 if(!Array.isArray(iterations)||!Array.isArray(tests)||iterations.length>12||tests.length>12)throw Error('Nhật ký thử nghiệm không hợp lệ');
 if(iterations.some(x=>typeof x!=='string')||tests.some(x=>typeof x!=='string'))throw Error('Minh chứng phải là văn bản');
 const completeness={goal:goal.trim().length>=20,artifact:artifact.trim().length>=60,iteration:iterations.some(x=>x.trim().length>=30),test:tests.some(x=>x.trim().length>=30),limitations:limitations.trim().length>=25};
 return {completeness,ready:Object.values(completeness).every(Boolean),missing:Object.entries(completeness).filter(([,ok])=>!ok).map(([k])=>k)};
}
export function reconcileReviews(ai,human){
 if(!human||!Array.isArray(human.ratings)||human.ratings.length!==4||human.ratings.some(n=>!Number.isInteger(n)||n<0||n>3))return {status:'awaiting-human',certified:false};
 const humanScore=human.ratings.reduce((s,n)=>s+[0,10,20,25][n],0);
 if(!ai||!ai.criteria)return {status:'human-only',humanScore,certified:false};
 const vals=Object.values(ai.criteria);
 if(vals.length!==4||vals.some(n=>typeof n!=='number'||n<0||n>25))return {status:'invalid-ai',humanScore,certified:false};
 const aiScore=vals.reduce((a,b)=>a+b,0),gap=Math.abs(aiScore-humanScore);
 return {status:gap>15?'needs-second-review':'aligned-provisional',aiScore,humanScore,gap,certified:false};
}
export function cohortMetrics(rows){
 if(!Array.isArray(rows))throw Error('Dữ liệu nhóm không hợp lệ');
 const valid=rows.filter(r=>r?.consent===true&&Number.isFinite(r.pre)&&Number.isFinite(r.post)&&r.pre>=0&&r.pre<=100&&r.post>=0&&r.post<=100);
 const mean=xs=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:null;
 const deltas=valid.map(r=>r.post-r.pre);
 const delayed=valid.filter(r=>Number.isFinite(r.delayed)).map(r=>r.delayed);
 return {eligible:valid.length,meanPre:mean(valid.map(r=>r.pre)),meanPost:mean(valid.map(r=>r.post)),meanChange:mean(deltas),meanDelayed:mean(delayed),note:'Mô tả nhóm tự nguyện, không chứng minh quan hệ nhân quả; cần bài kiểm tra tương đương và đối chứng.'};
}
