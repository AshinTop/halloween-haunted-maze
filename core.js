export const DIRECTIONS = Object.freeze([{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}]);
export const NIGHTS=Object.freeze([
  {seed:331,size:7,en:'A Candle at the Gate',zh:'门前一盏小灯',theme:0},
  {seed:701,size:9,en:'The Ivy Courtyard',zh:'常春藤庭院',theme:1},
  {seed:1731,size:9,en:'A Very Shy Ghost',zh:'害羞的小幽灵',theme:2},
  {seed:2707,size:9,en:'The Copper Passage',zh:'铜色回廊',theme:0},
  {seed:4201,size:11,en:'Whispers in the Walls',zh:'墙后的悄悄话',theme:1},
  {seed:5179,size:11,en:'The Violet Stair',zh:'紫罗兰石阶',theme:2},
  {seed:6311,size:11,en:'Three Little Promises',zh:'三个小约定',theme:0},
  {seed:7907,size:13,en:'The Forgotten Garden',zh:'被遗忘的花园',theme:1},
  {seed:8719,size:13,en:'Velvet & Moonlight',zh:'丝绒与月光',theme:2},
  {seed:9901,size:13,en:'The Lantern Keeper',zh:'提灯守夜人',theme:0},
  {seed:11071,size:15,en:'A Door Before Dawn',zh:'黎明前的那扇门',theme:1},
  {seed:12037,size:15,en:'Everybody Home',zh:'一起回家',theme:2}
]);

export function randomSource(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
export const cellIndex=(level,x,y)=>y*level.size+x;
export function openAt(level,x,y){return x>=0&&y>=0&&x<level.size&&y<level.size&&level.cells[y*level.size+x]===0;}
export function neighbors(level,index){const x=index%level.size,y=Math.floor(index/level.size);return DIRECTIONS.map(d=>({x:x+d.x,y:y+d.y})).filter(p=>openAt(level,p.x,p.y)).map(p=>cellIndex(level,p.x,p.y));}

export function distances(level,start){
  const dist=new Array(level.cells.length).fill(-1),previous=new Array(level.cells.length).fill(-1),queue=[start];dist[start]=0;
  for(let head=0;head<queue.length;head++)for(const next of neighbors(level,queue[head]))if(dist[next]===-1){dist[next]=dist[queue[head]]+1;previous[next]=queue[head];queue.push(next);}
  return {dist,previous};
}
export function pathBetween(level,start,target){
  const {dist,previous}=distances(level,start);if(dist[target]===-1)return [];
  const path=[];for(let p=target;p!==-1;p=previous[p]){path.push(p);if(p===start)break;}return path.reverse();
}

export function generateMaze(size,seed){
  if(!Number.isInteger(size)||size<5||size>31||size%2!==1)throw new Error('Maze size must be odd and between 5 and 31.');
  const rand=randomSource(seed),cells=new Array(size*size).fill(1),stack=[{x:1,y:1}];cells[size+1]=0;
  while(stack.length){
    const p=stack.at(-1),options=DIRECTIONS.map(d=>({x:p.x+d.x*2,y:p.y+d.y*2,d})).filter(n=>n.x>0&&n.y>0&&n.x<size-1&&n.y<size-1&&cells[n.y*size+n.x]);
    if(!options.length){stack.pop();continue;}
    const next=options[Math.floor(rand()*options.length)];cells[(p.y+next.d.y)*size+p.x+next.d.x]=0;cells[next.y*size+next.x]=0;stack.push(next);
  }
  return {size,cells,start:size+1};
}

export function makeLevel(index=0,dailyDate=null){
  const validIndex=Number.isInteger(index)&&index>=0&&index<NIGHTS.length?index:0;
  const spec=dailyDate?{seed:hashDate(dailyDate),size:11,theme:hashDate(dailyDate)%3,en:'Tonight’s Lost Lanterns',zh:'今夜的迷路灯火'}:NIGHTS[validIndex];
  const level={...generateMaze(spec.size,spec.seed),...spec,index:dailyDate?-1:validIndex,id:dailyDate?`daily-${dailyDate}`:`night-${validIndex+1}`,date:dailyDate};
  const fromStart=distances(level,level.start).dist;
  level.exit=fromStart.reduce((best,d,i)=>d>fromStart[best]?i:best,level.start);
  const chosen=[level.start,level.exit],items=[];
  // Spread the four collectibles around separate corners of the connected maze.
  for(let n=0;n<4;n++){
    const allDistances=chosen.map(p=>distances(level,p).dist);let candidate=-1,best=-1;
    for(let p=0;p<level.cells.length;p++){
      if(level.cells[p]||chosen.includes(p))continue;
      const separation=Math.min(...allDistances.map(d=>d[p])),deadEnd=neighbors(level,p).length===1?1.5:0;
      const value=separation+deadEnd+fromStart[p]*.035;
      if(value>best){candidate=p;best=value;}
    }
    chosen.push(candidate);items.push({id:n,kind:n<3?'lantern':'key',cell:candidate});
  }
  level.items=items;level.par=optimalRoute(level).length-1;return level;
}

export function optimalRoute(level){
  const targets=level.items.map(i=>i.cell);let bestPath=null;
  function search(current,left,path){
    if(bestPath&&path.length>=bestPath.length)return;
    if(!left.length){const finish=pathBetween(level,current,level.exit);const complete=path.concat(finish.slice(1));if(!bestPath||complete.length<bestPath.length)bestPath=complete;return;}
    for(const target of left){const next=pathBetween(level,current,target);search(target,left.filter(x=>x!==target),path.concat(next.slice(1)));}
  }
  search(level.start,targets,[level.start]);return bestPath||[];
}

export function reveal(level,visited,cell,radius=2){
  const out=[...visited],x=cell%level.size,y=Math.floor(cell/level.size);
  for(let yy=y-radius;yy<=y+radius;yy++)for(let xx=x-radius;xx<=x+radius;xx++)if(xx>=0&&yy>=0&&xx<level.size&&yy<level.size&&Math.abs(xx-x)+Math.abs(yy-y)<=radius)out[yy*level.size+xx]=true;
  return out;
}
export function newGame(level){
  const options=neighbors(level,level.start),first=options[0],dx=first%level.size-level.start%level.size,dy=Math.floor(first/level.size)-Math.floor(level.start/level.size),dir=DIRECTIONS.findIndex(d=>d.x===dx&&d.y===dy);
  return {level,cell:level.start,dir:Math.max(0,dir),steps:0,turns:0,lanterns:0,key:false,won:false,assists:0,visited:reveal(level,new Array(level.cells.length).fill(false),level.start),event:'ready'};
}
export const lanternCount=state=>Number(!!(state.lanterns&1))+Number(!!(state.lanterns&2))+Number(!!(state.lanterns&4));
export function act(state,action){
  if(state.won)return state;
  if(action==='left'||action==='right')return {...state,dir:(state.dir+(action==='left'?3:1))%4,turns:state.turns+1,event:'turn'};
  if(!['forward','back'].includes(action))return state;
  const dir=DIRECTIONS[(state.dir+(action==='back'?2:0))%4],level=state.level,x=state.cell%level.size+dir.x,y=Math.floor(state.cell/level.size)+dir.y;
  if(!openAt(level,x,y))return {...state,event:'wall'};
  const cell=cellIndex(level,x,y),next={...state,cell,steps:state.steps+1,event:'walk'};
  for(const item of level.items)if(item.cell===cell){
    if(item.kind==='key'&&!next.key){next.key=true;next.event='key';}
    if(item.kind==='lantern'&&!(next.lanterns&(1<<item.id))){next.lanterns|=1<<item.id;next.event='lantern';}
  }
  next.visited=reveal(level,state.visited,cell,2+(lanternCount(next)>=2?1:0));
  if(cell===level.exit){if(next.key&&next.lanterns===7){next.won=true;next.event='win';}else next.event='locked';}
  return next;
}

export function routeActions(level,path,initialDir){
  const actions=[];let facing=initialDir;
  for(let i=1;i<path.length;i++){
    const dx=path[i]%level.size-path[i-1]%level.size,dy=Math.floor(path[i]/level.size)-Math.floor(path[i-1]/level.size),target=DIRECTIONS.findIndex(d=>d.x===dx&&d.y===dy);
    if(target<0)throw new Error('Route contains non-adjacent cells.');
    const delta=(target-facing+4)%4;
    if(delta===3)actions.push('left');else for(let n=0;n<delta;n++)actions.push('right');
    actions.push('forward');facing=target;
  }
  return actions;
}
export function nextHint(state){
  if(state.won)return null;
  const remaining=state.level.items.filter(i=>i.kind==='key'?!state.key:!(state.lanterns&(1<<i.id)));
  let path,target;if(remaining.length){
    const options=remaining.map(item=>({item,path:pathBetween(state.level,state.cell,item.cell)})).sort((a,b)=>a.path.length-b.path.length||a.item.id-b.item.id);
    path=options[0].path;target=options[0].item.kind;
  }else{path=pathBetween(state.level,state.cell,state.level.exit);target='exit';}
  return {action:routeActions(state.level,path,state.dir)[0]||null,path,target};
}
export function useHint(state){return {...state,assists:state.assists+1};}
export function hashDate(date){let h=2166136261;for(const char of date)h=Math.imul(h^char.charCodeAt(0),16777619);return h>>>0;}
export function validDate(value){if(typeof value!=='string'||!/^20\d\d-\d\d-\d\d$/.test(value))return false;const date=new Date(value+'T00:00:00.000Z');return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value;}
export function selectFromHash(hash){
  const p=new URLSearchParams(String(hash||'').replace(/^#/,''));const daily=p.get('daily');if(validDate(daily))return {index:0,date:daily};
  const value=p.get('night');const number=value&&/^\d+$/.test(value)?Number(value):1;return {index:Number.isInteger(number)&&number>=1&&number<=NIGHTS.length?number-1:0,date:null};
}
export function cleanPreferences(raw){
  const p=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{},best={};
  if(p.best&&typeof p.best==='object'&&!Array.isArray(p.best))for(const [id,value] of Object.entries(p.best)){
    if(!/^night-([1-9]|1[0-2])$/.test(id)&&!(id.startsWith('daily-')&&validDate(id.slice(6))))continue;
    if(value&&typeof value==='object'&&Number.isInteger(value.steps)&&value.steps>=1&&value.steps<=20000&&Number.isInteger(value.assists)&&value.assists>=0&&value.assists<=20000)best[id]={steps:value.steps,assists:value.assists};
  }
  return {lang:['en','zh'].includes(p.lang)?p.lang:'en',sound:p.sound!==false,best};
}
