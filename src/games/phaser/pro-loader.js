import {mountProScene} from './pro-scenes.js';
import {loadPhaser} from './loader.js';
export async function mountProLab(root,lesson,onScore){
 const type=lesson.id.split('-')[0];if(!['photo','claude','chatgpt','agent'].includes(type)||!['1','2','3'].includes(lesson.id.split('-')[1]))return ()=>{};
 const box=document.createElement('section');box.className='card';const title=document.createElement('h3');title.textContent='🎮 Phòng Phaser 2D · '+type;const status=document.createElement('p');status.className='muted';status.textContent='Đang kiểm tra Game Engine Phaser…';const mount=document.createElement('div');mount.className='phaser-pro';box.append(title,status,mount);root.append(box);
 let dispose=()=>{},cancelled=false;
 const cleanup=()=>{cancelled=true;try{dispose()}catch{}box.remove()};
 try{await loadPhaser();
 // The learner may have left the lesson while the library was loading.
 if(cancelled||!document.contains(box))return cleanup;dispose=mountProScene(mount,{type,onScore});status.textContent='Phaser 3: kéo thả đối tượng, TAB đổi đối tượng, phím mũi tên di chuyển. Điểm chỉ là mô phỏng.';
 }catch{status.textContent='Chưa có thư viện Phaser ngoại tuyến. Phòng thực hành Canvas/DOM phía trên vẫn hoạt động. Chạy npm run setup:phaser khi có mạng.';}
 return cleanup;
}
