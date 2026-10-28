import {lanternCount} from './core.js';

export const FOV = Math.PI/3;
export function castRay(level,x,y,dx,dy){
  let mx=Math.floor(x),my=Math.floor(y),side=0;
  const deltaX=dx===0?Infinity:Math.abs(1/dx),deltaY=dy===0?Infinity:Math.abs(1/dy),stepX=dx<0?-1:1,stepY=dy<0?-1:1;
  let sideX=(dx<0?x-mx:mx+1-x)*deltaX,sideY=(dy<0?y-my:my+1-y)*deltaY;
  for(let n=0;n<level.cells.length*2;n++){
    if(sideX<sideY){sideX+=deltaX;mx+=stepX;side=0;}else{sideY+=deltaY;my+=stepY;side=1;}
    if(mx<0||my<0||mx>=level.size||my>=level.size||level.cells[my*level.size+mx]){
      const distance=Math.max(.0001,side===0?sideX-deltaX:sideY-deltaY);
      let u=(side===0?y+distance*dy:x+distance*dx)%1;if(u<0)u+=1;
      return {distance,u,side,x:mx,y:my};
    }
  }
  return {distance:level.size,u:0,side:0,x:mx,y:my};
}

export function projectPoint(camera,x,y,width,height,fov=FOV){
  const dx=x-camera.x,dy=y-camera.y,forward=dx*Math.cos(camera.angle)+dy*Math.sin(camera.angle),side=-dx*Math.sin(camera.angle)+dy*Math.cos(camera.angle);
  if(forward<=.03)return null;
  const scale=width/(2*Math.tan(fov/2));
  return {x:width/2+side*scale/forward,y:height*.49,scale:scale/forward,depth:forward};
}

const THEMES=[['#816367','#6d535d','#a58478'],['#527879','#436467','#86a6a0'],['#726e98','#5b5b80','#a49ac0']];
function makeTexture(theme,variant){
  const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;const c=canvas.getContext('2d'),colors=THEMES[theme];
  c.fillStyle=colors[1];c.fillRect(0,0,128,128);
  for(let row=0;row<4;row++)for(let column=-1;column<3;column++){
    const x=column*64+(row%2?32:0),y=row*32;c.fillStyle=colors[0];c.fillRect(x+2,y+2,60,28);
    c.fillStyle='#e5dac710';c.fillRect(x+3,y+3,58,2);c.fillStyle='#161a2830';c.fillRect(x+3,y+28,58,2);
    c.fillStyle='#171c2910';for(let i=0;i<8;i++){const px=x+5+(i*19+row*7+variant*11)%53,py=y+5+(i*11+column*3+30)%21;c.fillRect(px,py,2,1);}
  }
  if(variant===1){c.strokeStyle='#161e283d';c.lineWidth=2;c.beginPath();c.moveTo(37,0);c.lineTo(42,21);c.lineTo(32,32);c.lineTo(38,46);c.stroke();}
  if(variant===2){c.fillStyle='#a9b39223';for(let i=0;i<8;i++){c.beginPath();c.ellipse(14+i*12,121-(i%3)*3,13,5,-.4,0,Math.PI*2);c.fill();}}
  return canvas;
}
function sprite(kind,color='#b7d6cc'){
  const canvas=document.createElement('canvas');canvas.width=160;canvas.height=192;const c=canvas.getContext('2d');
  if(kind==='lantern'){
    const glow=c.createRadialGradient(80,121,4,80,121,76);glow.addColorStop(0,'#f2bf7455');glow.addColorStop(1,'#efb86c00');c.fillStyle=glow;c.fillRect(0,35,160,157);
    c.fillStyle='#16263344';c.beginPath();c.ellipse(80,173,39,10,0,0,Math.PI*2);c.fill();
    c.strokeStyle='#b2ba91';c.lineWidth=5;c.beginPath();c.moveTo(80,116);c.quadraticCurveTo(69,96,82,90);c.stroke();
    c.fillStyle='#e8ac66';c.beginPath();c.ellipse(80,139,34,29,0,0,Math.PI*2);c.fill();c.fillStyle='#f2c28a';c.beginPath();c.ellipse(80,139,18,29,0,0,Math.PI*2);c.fill();
    c.fillStyle='#795440';c.beginPath();c.moveTo(60,134);c.lineTo(72,127);c.lineTo(72,141);c.closePath();c.fill();c.beginPath();c.moveTo(100,134);c.lineTo(88,127);c.lineTo(88,141);c.closePath();c.fill();c.strokeStyle='#795440';c.lineWidth=3;c.beginPath();c.arc(80,144,12,.2,Math.PI-.2);c.stroke();
    c.fillStyle=color;c.globalAlpha=.9;c.beginPath();c.moveTo(57,62);c.bezierCurveTo(55,21,106,22,104,62);c.lineTo(110,94);c.lineTo(96,86);c.lineTo(80,97);c.lineTo(66,86);c.lineTo(53,95);c.closePath();c.fill();c.globalAlpha=1;
    c.fillStyle='#405765';c.beginPath();c.ellipse(71,60,3,5,0,0,Math.PI*2);c.ellipse(89,60,3,5,0,0,Math.PI*2);c.fill();c.strokeStyle='#405765';c.lineWidth=2;c.beginPath();c.moveTo(76,73);c.quadraticCurveTo(81,78,86,73);c.stroke();
  }else if(kind==='key'){
    const glow=c.createRadialGradient(80,105,3,80,105,68);glow.addColorStop(0,'#edca8666');glow.addColorStop(1,'#edca8600');c.fillStyle=glow;c.fillRect(0,20,160,160);c.save();c.translate(80,101);c.rotate(-.5);
    c.strokeStyle='#efcb85';c.lineWidth=11;c.lineCap='round';c.beginPath();c.arc(0,-26,21,0,Math.PI*2);c.moveTo(0,-4);c.lineTo(0,47);c.lineTo(22,47);c.moveTo(0,28);c.lineTo(14,28);c.stroke();c.strokeStyle='#fff0ba';c.lineWidth=2;c.beginPath();c.arc(0,-26,16,Math.PI,Math.PI*1.8);c.stroke();c.restore();
    c.fillStyle='#e8d9b7';for(const [x,y] of [[39,74],[120,132],[110,42]]){c.beginPath();c.moveTo(x,y-5);c.lineTo(x+2,y-1);c.lineTo(x+6,y);c.lineTo(x+2,y+2);c.lineTo(x,y+6);c.lineTo(x-2,y+2);c.lineTo(x-5,y);c.lineTo(x-2,y-1);c.fill();}
  }else if(kind==='exit'||kind==='locked'){
    c.fillStyle='#15242eaa';c.beginPath();c.roundRect(26,12,108,171,[51,51,2,2]);c.fill();c.strokeStyle=kind==='exit'?'#d2dcbd':'#a49e99';c.lineWidth=9;c.beginPath();c.roundRect(26,12,108,171,[51,51,2,2]);c.stroke();
    c.strokeStyle=kind==='exit'?'#dce7bf88':'#8f92922e';c.lineWidth=2;c.beginPath();c.roundRect(37,24,86,157,[42,42,2,2]);c.stroke();
    const glow=c.createRadialGradient(80,76,2,80,76,52);glow.addColorStop(0,kind==='exit'?'#e7ddaa55':'#b4bec31e');glow.addColorStop(1,'#eee5b000');c.fillStyle=glow;c.fillRect(29,20,102,124);
    c.fillStyle=kind==='exit'?'#e8deae':'#a6acaa';c.beginPath();c.arc(80,68,20,0,Math.PI*2);c.fill();c.fillStyle='#213039';c.beginPath();c.arc(89,62,18,0,Math.PI*2);c.fill();
    if(kind==='locked'){c.strokeStyle='#99917f';c.lineWidth=4;c.beginPath();c.arc(80,128,9,Math.PI,0);c.stroke();c.fillStyle='#a59476';c.beginPath();c.roundRect(67,128,26,23,4);c.fill();c.fillStyle='#343a3e';c.fillRect(78,135,4,8);}
    else{c.strokeStyle='#dbc38f';c.lineWidth=2;c.beginPath();c.moveTo(67,136);c.lineTo(93,136);c.moveTo(83,126);c.lineTo(93,136);c.lineTo(83,146);c.stroke();}
  }else if(kind==='guide'){
    c.globalAlpha=.75;c.fillStyle='#b1dbe6';c.beginPath();c.moveTo(51,84);c.bezierCurveTo(51,28,109,28,109,84);c.lineTo(116,130);c.lineTo(97,117);c.lineTo(80,133);c.lineTo(63,117);c.lineTo(44,130);c.fill();c.fillStyle='#496c7c';c.beginPath();c.ellipse(69,80,4,6,0,0,Math.PI*2);c.ellipse(91,80,4,6,0,0,Math.PI*2);c.fill();
    c.strokeStyle='#fff2bb';c.lineWidth=3;c.beginPath();c.moveTo(66,151);c.lineTo(94,151);c.moveTo(84,142);c.lineTo(94,151);c.lineTo(84,160);c.stroke();
  }
  return canvas;
}

export class MazeRenderer {
  constructor(canvas){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.width=640;this.height=360;this.dpr=1;this.camera=null;this.state=null;this.mapOpen=false;this.hint=null;this.cameraStart=null;this.cameraTarget=null;this.started=0;
    this.textures=THEMES.map((_,theme)=>[0,1,2].map(v=>makeTexture(theme,v)));
    this.sprites={lantern0:sprite('lantern','#c8ddcb'),lantern1:sprite('lantern','#d8c6df'),lantern2:sprite('lantern','#c3d8e3'),key:sprite('key'),exit:sprite('exit'),locked:sprite('locked'),guide:sprite('guide')};
    this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  resize(){const r=this.canvas.getBoundingClientRect();this.width=Math.max(1,r.width);this.height=Math.max(1,r.height);this.dpr=Math.min(1.5,devicePixelRatio||1);this.canvas.width=Math.round(this.width*this.dpr);this.canvas.height=Math.round(this.height*this.dpr);}
  setState(state,snap=false){
    const target={x:state.cell%state.level.size+.5,y:Math.floor(state.cell/state.level.size)+.5,angle:state.dir*Math.PI/2-Math.PI/2};
    if(!this.camera||snap||this.reduced){this.camera={...target};this.cameraStart={...target};this.cameraTarget={...target};}
    else{this.cameraStart={...this.camera};let delta=(target.angle-this.camera.angle+Math.PI*3)%(Math.PI*2)-Math.PI;target.angle=this.camera.angle+delta;this.cameraTarget=target;}
    this.started=performance.now();this.state=state;
  }
  render(stamp){
    if(!this.state||!this.ctx)return;const c=this.ctx,w=this.width,h=this.height;
    if(this.cameraTarget){const t=this.reduced?1:Math.min(1,(stamp-this.started)/165),e=1-(1-t)**3;for(const k of ['x','y','angle'])this.camera[k]=this.cameraStart[k]+(this.cameraTarget[k]-this.cameraStart[k])*e;}
    c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,w,h);
    const sky=c.createLinearGradient(0,0,0,h*.55);sky.addColorStop(0,'#182b3d');sky.addColorStop(1,'#4b5360');c.fillStyle=sky;c.fillRect(0,0,w,h*.51);
    const floor=c.createLinearGradient(0,h*.49,0,h);floor.addColorStop(0,'#24333d');floor.addColorStop(1,'#3c4447');c.fillStyle=floor;c.fillRect(0,h*.49,w,h*.51);
    const moonX=w*.72-(Math.sin(this.camera.angle)*w*.15),moonY=h*.18,moonR=Math.min(32,h*.12);c.fillStyle='#e0dfbc';c.beginPath();c.arc(moonX,moonY,moonR,0,Math.PI*2);c.fill();c.fillStyle='#b9c9c322';c.beginPath();c.arc(moonX,moonY,moonR*1.7,0,Math.PI*2);c.fill();
    c.fillStyle='#d4d7c166';for(let i=0;i<32;i++){const x=(((i*137+83)%997)/997*w+this.camera.angle*35+w*10)%w,y=((i*67+29)%193)/193*h*.43;c.fillRect(x,y,i%5===0?1.5:1,i%5===0?1.5:1);}
    // Receding floor lines provide depth before the first corridor turn.
    c.strokeStyle='#aeb69b0d';c.lineWidth=1;for(let i=1;i<9;i++){const y=h*.49+h*.52*(i/9)**2;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
    const dirX=Math.cos(this.camera.angle),dirY=Math.sin(this.camera.angle),plane=Math.tan(FOV/2),strip=w>800?2.5:2,zbuffer=new Float64Array(Math.ceil(w/strip));
    const projection=w/(2*plane),light=lanternCount(this.state),level=this.state.level;
    for(let col=0;col<zbuffer.length;col++){
      const x=col*strip,cameraX=2*(x+strip*.5)/w-1,dx=dirX-dirY*plane*cameraX,dy=dirY+dirX*plane*cameraX,hit=castRay(level,this.camera.x,this.camera.y,dx,dy);
      zbuffer[col]=hit.distance;const wallHeight=projection/hit.distance,top=h*.49-wallHeight*.5;
      const texture=this.textures[level.theme][Math.abs(hit.x*3+hit.y)%3];let texX=Math.floor(hit.u*128);if((hit.side===0&&dx>0)||(hit.side===1&&dy<0))texX=127-texX;
      c.drawImage(texture,texX,0,1,128,x,top,strip+.3,wallHeight);
      const shade=Math.min(.87,.12+(hit.side?.13:0)+hit.distance/(12+light*2));c.fillStyle=`rgba(15,29,42,${shade})`;c.fillRect(x,top,strip+.4,wallHeight);
      c.fillStyle='#09172150';c.fillRect(x,top+wallHeight-2,strip+.4,3);
    }
    const objects=level.items.filter(item=>item.kind==='key'?!this.state.key:!(this.state.lanterns&(1<<item.id))).map(item=>({cell:item.cell,kind:item.kind==='key'?'key':`lantern${item.id}`,height:item.kind==='key'?.55:.8,worldOffset:item.kind==='key'?.08:0}));
    objects.push({cell:level.exit,kind:this.state.key&&this.state.lanterns===7?'exit':'locked',height:1.05,worldOffset:0});
    if(this.hint?.path.length>1)objects.push({cell:this.hint.path[Math.min(2,this.hint.path.length-1)],kind:'guide',height:.65,worldOffset:.1});
    objects.forEach(o=>{o.x=o.cell%level.size+.5;o.y=Math.floor(o.cell/level.size)+.5;o.projected=projectPoint(this.camera,o.x,o.y,w,h);});
    objects.filter(o=>o.projected).sort((a,b)=>b.projected.depth-a.projected.depth).forEach(o=>{
      const p=o.projected,image=this.sprites[o.kind],sh=p.scale*o.height,sw=sh*(image.width/image.height),bob=this.reduced||o.kind==='exit'||o.kind==='locked'?0:Math.sin(stamp/520+o.cell)*Math.min(3,p.scale*.015),left=p.x-sw/2,top=h*.49+p.scale*.5-sh-p.scale*o.worldOffset+bob;
      if(left>w||left+sw<0||sh<2)return;
      for(let col=Math.max(0,Math.floor(left/strip));col<Math.min(zbuffer.length,Math.ceil((left+sw)/strip));col++)if(p.depth<zbuffer[col]+.01){const x=col*strip,src=(x-left)/sw*image.width;c.drawImage(image,Math.max(0,src),0,Math.min(image.width-Math.max(0,src),strip/sw*image.width+1),image.height,x,top,strip+1,sh);}
    });
    // A hand-held light pools at the bottom of the view, growing with the rescue.
    const glow=c.createRadialGradient(w*.5,h*.94,0,w*.5,h*.94,Math.max(w,h)*.7);glow.addColorStop(0,`rgba(239,196,129,${.08+light*.015})`);glow.addColorStop(1,'rgba(239,196,129,0)');c.fillStyle=glow;c.fillRect(0,0,w,h);
    const vignette=c.createRadialGradient(w/2,h*.5,Math.min(w,h)*.2,w/2,h*.5,Math.max(w,h)*.7);vignette.addColorStop(0,'#07142200');vignette.addColorStop(1,'#07142288');c.fillStyle=vignette;c.fillRect(0,0,w,h);
    this.drawMap(false);
    if(this.mapOpen)this.drawMap(true);
  }
  drawMap(full){
    const c=this.ctx,w=this.width,h=this.height,s=this.state,level=s.level,dimension=full?Math.min(h*.86,w*.75,430):Math.min(115,w*.25,h*.38),unit=dimension/level.size;
    const x=full?(w-dimension)/2:12,y=full?(h-dimension)/2:12;
    if(full){c.fillStyle='#0d1d2ac9';c.fillRect(0,0,w,h);}
    c.fillStyle=full?'#1b303e':'#112635b0';c.strokeStyle='#d0d7bd33';c.lineWidth=1;c.beginPath();c.roundRect(x-7,y-7,dimension+14,dimension+14,8);c.fill();c.stroke();
    for(let p=0;p<level.cells.length;p++){
      if(!full&&!s.visited[p])continue;
      const xx=x+p%level.size*unit,yy=y+Math.floor(p/level.size)*unit;
      c.fillStyle=level.cells[p]?'#49616b':'#a7b6aa';c.globalAlpha=level.cells[p]?.45:full?.5:.6;c.fillRect(xx+.4,yy+.4,unit-.8,unit-.8);c.globalAlpha=1;
    }
    if(this.hint)for(const p of this.hint.path.slice(1)){if(!full&&!s.visited[p])continue;c.fillStyle='#b7d8d58c';c.beginPath();c.arc(x+(p%level.size+.5)*unit,y+(Math.floor(p/level.size)+.5)*unit,Math.max(1,unit*.14),0,Math.PI*2);c.fill();}
    for(const item of level.items){if((item.kind==='key'&&s.key)||(item.kind==='lantern'&&(s.lanterns&(1<<item.id))))continue;if(!full&&!s.visited[item.cell])continue;c.fillStyle=item.kind==='key'?'#edce85':'#e7b075';c.beginPath();c.arc(x+(item.cell%level.size+.5)*unit,y+(Math.floor(item.cell/level.size)+.5)*unit,Math.max(1.5,unit*.24),0,Math.PI*2);c.fill();}
    if(full||s.visited[level.exit]){c.strokeStyle=s.key&&s.lanterns===7?'#e4e8c4':'#b8a7c3';c.lineWidth=Math.max(1,unit*.11);c.strokeRect(x+(level.exit%level.size+.2)*unit,y+(Math.floor(level.exit/level.size)+.2)*unit,unit*.6,unit*.6);}
    const px=x+(s.cell%level.size+.5)*unit,py=y+(Math.floor(s.cell/level.size)+.5)*unit;c.save();c.translate(px,py);c.rotate(s.dir*Math.PI/2);c.fillStyle='#f6e4b8';const r=Math.max(3,unit*.4);c.beginPath();c.moveTo(0,-r);c.lineTo(r*.8,r*.7);c.lineTo(0,r*.35);c.lineTo(-r*.8,r*.7);c.closePath();c.fill();c.restore();
  }
}
