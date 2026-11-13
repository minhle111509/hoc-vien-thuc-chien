// Phaser 3 2D lab. Phaser is loaded as an optional runtime from a pinned CDN version.
// Fallback in the UI retains the original DOM-based game when offline.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function supportsScene(type){return ['lighting','composition','exposure','color','agent'].includes(type)}
export function mountPhaserScene(container,{type,onScore}){
 if(!globalThis.Phaser)throw new Error('Phaser chưa tải');
 const Phaser=globalThis.Phaser;let sceneRef;let score=0;
 const scene={
 create(){sceneRef=this;this.cameras.main.setBackgroundColor('#10273e');
  this.add.rectangle(400,350,800,180,0x193c4c);this.add.rectangle(400,410,800,65,0x12313e);
  const heading={lighting:'STUDIO ÁNH SÁNG',composition:'BỐ CỤC KHUNG HÌNH',exposure:'PHƠI SÁNG',color:'CÂN BẰNG MÀU',agent:'NHÀ MÁY AI AGENT'}[type];
  this.add.text(24,18,heading,{font:'bold 24px Arial',color:'#eaf9ff'});
  this.add.text(24,53,'Kéo đối tượng hoặc dùng phím ← → để thử. Quan sát phản hồi.',{font:'15px Arial',color:'#b7d8e9'});
  this.info=this.add.text(24,410,'',{font:'16px Arial',color:'#d8fff4'});
  this.glow=this.add.circle(400,220,110,0x78d8f5,.18);
  this.subject=this.add.container(400,225);
  if(type==='agent'){
   this.subject.add(this.add.rectangle(0,0,130,95,0x1f8e9a).setStrokeStyle(4,0x9cf4e6));
   this.subject.add(this.add.text(-43,-13,'AGENT',{font:'bold 21px Arial',color:'#ffffff'}));
   this.add.text(40,100,'Đầu vào → Kiểm tra → Phê duyệt → Đầu ra',{font:'18px Arial',color:'#c8e8fa'});
  }else{
   this.subject.add(this.add.ellipse(0,55,170,25,0x081420,.45));
   this.subject.add(this.add.rectangle(0,0,125,115,0xf5a56a).setStrokeStyle(5,0xffd6a0));
   this.subject.add(this.add.circle(-23,-10,9,0x263b4b));this.subject.add(this.add.circle(23,-10,9,0x263b4b));
  }
  this.subject.setSize(140,125).setInteractive({draggable:true,useHandCursor:true});this.input.setDraggable(this.subject);
  this.input.on('drag',(pointer,obj,x,y)=>{obj.x=clamp(x,90,710);obj.y=clamp(y,145,330);update()});
  this.keys=this.input.keyboard?.addKeys('LEFT,RIGHT,UP,DOWN');
  this.add.rectangle(400,95,720,3,0x5ac5c6,.5);
  this.tweens.add({targets:this.glow,alpha:{from:.35,to:.85},scale:{from:.88,to:1.12},duration:1200,yoyo:true,repeat:-1});
  if(type==='composition'){this.add.line(0,0,266,90,266,390,0x9cc9de,.35).setOrigin(0);this.add.line(0,0,533,90,533,390,0x9cc9de,.35).setOrigin(0);}
  function update(){const x=sceneRef.subject.x,y=sceneRef.subject.y;const distance=Math.abs(x-533);score=type==='composition'?Math.round(clamp(100-distance/3,0,100)):type==='agent'?Math.round(clamp(100-Math.abs(x-400)/5,0,100)):Math.round(clamp(100-Math.abs(x-420)/5-Math.abs(y-215)/5,0,100));sceneRef.glow.setPosition(x,y);sceneRef.info.setText('Điểm mô phỏng: '+score+'/100 • '+(score>=75?'Tốt! Hãy giải thích lựa chọn.':'Thử thay đổi vị trí để quan sát.'));onScore(score,`Mô phỏng 2D: ${heading}. Đây là điểm thao tác, không thay thế đánh giá sản phẩm thực tế.`)}
  update();
 },
 update(){if(!this.keys||!this.subject)return;let changed=false;for(const [key,dx,dy] of [['LEFT',-3,0],['RIGHT',3,0],['UP',0,-3],['DOWN',0,3]])if(this.keys[key]?.isDown){this.subject.x=clamp(this.subject.x+dx,90,710);this.subject.y=clamp(this.subject.y+dy,145,330);changed=true}if(changed){const x=this.subject.x,y=this.subject.y;score=type==='composition'?Math.round(clamp(100-Math.abs(x-533)/3,0,100)):type==='agent'?Math.round(clamp(100-Math.abs(x-400)/5,0,100)):Math.round(clamp(100-Math.abs(x-420)/5-Math.abs(y-215)/5,0,100));this.glow.setPosition(x,y);this.info.setText('Điểm mô phỏng: '+score+'/100');onScore(score,'Điều chỉnh vị trí và giải thích kết quả.')}}
 };
 const game=new Phaser.Game({type:Phaser.AUTO,width:800,height:460,parent:container,transparent:false,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true},scene, audio:{noAudio:true}});
 return ()=>game.destroy(true);
}
