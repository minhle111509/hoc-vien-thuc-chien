/** Phaser 3 interactive mission scenes. Real engine is optional: offline fallback remains available. */
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
export const PRO_TYPES=['photo','claude','chatgpt','agent'];
export function missionSceneSpec(type){if(!PRO_TYPES.includes(type))throw Error('Unknown mission');return {type,objective:{photo:'Điều khiển máy ảnh và quan sát độ sáng',claude:'Xác minh từng tuyên bố trong tài liệu',chatgpt:'Thu thập bằng chứng trước khi kết luận',agent:'Thiết kế luồng có cổng phê duyệt'}[type]};}
export function mountProScene(parent,{type,onScore=()=>{}}){
 const Phaser=globalThis.Phaser;if(!Phaser)throw Error('Phaser 3 chưa được cài đặt');
 const spec=missionSceneSpec(type);let game,disposed=false;
 const scene={
 create(){this.cameras.main.setBackgroundColor('#0c2035');this.add.text(24,20,spec.objective,{font:'bold 21px Arial',color:'#eafaff'});this.add.text(24,54,'Chạm/kéo đối tượng hoặc dùng phím mũi tên • Phản hồi chỉ là mô phỏng',{font:'14px Arial',color:'#bbd9ea'});
  this.items=[];this.markers=[];this.score=0;this.caption=this.add.text(25,410,'Hãy thử một hành động.',{font:'16px Arial',color:'#d6f9ef',wordWrap:{width:740}});
  this.add.rectangle(400,355,790,80,0x173a51);
  const defs=type==='photo'?[['ĐÈN',150,190,0xf9bf73],['MẪU',400,190,0x66b6ce],['MÁY',650,190,0x88d2ad]]:type==='agent'?[['NHẬN',100,185,0x2c94a4],['XÁC THỰC',245,185,0x2c94a4],['RÀ SOÁT',390,185,0x2c94a4],['DUYỆT',535,185,0x2c94a4],['XUẤT',680,185,0x2c94a4]]:type==='claude'?[['KHẲNG ĐỊNH',170,180,0xc8847b],['NGUỒN',400,180,0x8cc0ac],['KIỂM TRA',625,180,0x79a3dc]]:[['CÂU HỎI',170,180,0x9a9cda],['BẰNG CHỨNG',400,180,0x75c2ad],['KẾT LUẬN',625,180,0xd8b477]];
  defs.forEach(([label,x,y,color],i)=>{const item=this.add.container(x,y);const rect=this.add.rectangle(0,0,type==='agent'?120:170,72,color).setStrokeStyle(3,0xe7faff);item.add([rect,this.add.text(0,0,label,{font:'bold 16px Arial',color:'#0d2430'}).setOrigin(.5)]);item.setSize(type==='agent'?120:170,72).setInteractive({draggable:true,useHandCursor:true});this.input.setDraggable(item);item.slot=i;this.items.push(item);this.markers.push({x,y});});
  this.input.on('drag',(pointer,obj,x,y)=>{obj.x=clamp(x,60,740);obj.y=clamp(y,125,310);this.evaluate()});
  this.keys=this.input.keyboard?.addKeys('LEFT,RIGHT,UP,DOWN,TAB');this.activeIndex=0;
  this.add.text(25,365,'Đối tượng đang chọn: '+defs[0][0],{font:'14px Arial',color:'#bce3f4'}).setName('selected');
  this.tweens.add({targets:this.items,scaleX:{from:1,to:1.03},scaleY:{from:1,to:1.03},duration:1300,yoyo:true,repeat:-1});
  this.evaluate();
 },
 evaluate(){const slots=this.items.map(item=>this.markers.reduce((best,p,i)=>Math.abs(item.x-p.x)<Math.abs(item.x-this.markers[best].x)?i:best,0));let score=0,tip='';
  if(type==='agent'){const unique=new Set(slots).size===slots.length;const order=slots.every((v,i)=>v===i);score=order?100:unique?50:20;tip=order?'Luồng đúng thứ tự. Còn cần thử tình huống dữ liệu lỗi và phê duyệt thật.':'Kiểm tra thứ tự và vị trí khối, không bỏ qua phê duyệt.';}
  else if(type==='photo'){const distance=Math.abs(this.items[0].x-this.items[1].x);score=Math.round(clamp(100-Math.abs(distance-230)/3,0,100));tip='Khoảng cách là minh họa. Ánh sáng thật còn phụ thuộc công suất, kích thước nguồn và chất liệu.';}
  else {const aligned=slots.every((v,i)=>v===i);score=aligned?90:Math.round(30+slots.filter((v,i)=>v===i).length*20);tip='Đúng trình tự chưa đủ: cần bằng chứng nguồn và giải thích bằng văn bản.';}
  this.score=score;this.caption.setText(`Mô phỏng ${score}/100. ${tip}`);onScore(score,tip);
 },
 update(){if(!this.keys)return;if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){this.activeIndex=(this.activeIndex+1)%this.items.length;this.children.getByName('selected')?.setText('Đối tượng đang chọn: '+(this.activeIndex+1))}const item=this.items[this.activeIndex];let changed=false;for(const [k,dx,dy] of [['LEFT',-3,0],['RIGHT',3,0],['UP',0,-3],['DOWN',0,3]])if(this.keys[k]?.isDown){item.x=clamp(item.x+dx,60,740);item.y=clamp(item.y+dy,125,310);changed=true}if(changed)this.evaluate()}
 };
 game=new Phaser.Game({type:Phaser.AUTO,parent,width:800,height:460,scene,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true},audio:{noAudio:true}});
 return ()=>{if(!disposed){disposed=true;game.destroy(true)}};
}
