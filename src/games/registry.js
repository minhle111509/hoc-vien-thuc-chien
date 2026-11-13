import {EXTRA_GAMES} from '../data/courses-2026/index.js';
export function gameType(course,number){
 if(EXTRA_GAMES[course])return EXTRA_GAMES[course][(number-1)%7];
 if(course==='photo')return ['lighting','composition','exposure','color','composition','lighting','sequence'][((number-1)%7)];
 if(course==='agent')return ['agent','debug','sequence','agent','detective','debug','sequence'][((number-1)%7)];
 if(course==='claude')return ['prompt','compare','detective','prompt','sequence','compare','debug'][((number-1)%7)];
 return ['prompt','detective','compare','prompt','debug','detective','sequence'][((number-1)%7)];
}
export const descriptions={prompt:'Xưởng Prompt',detective:'Thám tử dữ kiện',agent:'Lắp ráp AI Agent',composition:'Bố cục tương tác',lighting:'Phòng ánh sáng',exposure:'Máy ảnh mô phỏng',color:'Phòng chỉnh màu',sequence:'Xếp quy trình',compare:'So sánh đầu ra AI',debug:'Săn lỗi AI Agent'};
