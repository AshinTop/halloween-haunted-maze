import {NIGHTS,makeLevel,newGame,act,lanternCount,nextHint,useHint,selectFromHash,cleanPreferences} from './core.js';
import {MazeRenderer} from './renderer.js';

const $=s=>document.querySelector(s),key='ghostkeeper-maze-v1';let raw;try{raw=JSON.parse(localStorage.getItem(key)||'null');}catch{}
const prefs=cleanPreferences(raw),initial=selectFromHash(location.hash);let lang=prefs.lang,levelIndex=initial.index,dailyDate=initial.date,level=makeLevel(levelIndex,dailyDate),state=newGame(level),mapOpen=false,mapUsed=false,guidance=null;
let frame=0,lastRender=0,lastAction=0,holdTimer=null,repeatTimer=null,winTimer=null,toastTimer=null,audioContext=null;
const renderer=new MazeRenderer($('#view'));const tr=(en,zh)=>lang==='zh'?zh:en;
const ghost=(color='#c4d7ca')=>`<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="40" cy="91" rx="24" ry="5" fill="#092434" opacity=".3"/><path d="M18 40c0-35 44-35 44 0l6 39-15-8-13 12-13-12-15 8Z" fill="${color}"/><ellipse cx="31" cy="38" rx="3" ry="5" fill="#405c66"/><ellipse cx="49" cy="38" rx="3" ry="5" fill="#405c66"/><path d="M34 51q6 6 12 0" fill="none" stroke="#405c66" stroke-width="2" stroke-linecap="round"/><path d="M40 66q-4-8 3-12" fill="none" stroke="#9eae86" stroke-width="3"/><ellipse cx="40" cy="78" rx="15" ry="12" fill="#e6ad69"/><ellipse cx="40" cy="78" rx="8" ry="12" fill="#f0c58c"/><path d="M31 76l5-3v6Z M49 76l-5-3v6Z M35 82q5 4 10 0" fill="#6e5847"/></svg>`;
const littleGhost='<svg viewBox="0 0 18 22" aria-hidden="true"><path d="M2 9a7 7 0 0 1 14 0l1 11-4-2-4 3-4-3-4 2Z" fill="currentColor"/><path d="M6 8v3m6-3v3" stroke="#294953" stroke-width="1.7" stroke-linecap="round"/></svg>';
const littleKey='<svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="m10 10 9 9m-5-5 3-3m0 6 3-3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';
$('#journal-art').innerHTML=ghost();$('#win-art').innerHTML=[ghost('#c1d9d3'),ghost('#e0c7da'),ghost('#c5d8e3')].join('');
function save(){try{localStorage.setItem(key,JSON.stringify({...prefs,lang}));}catch{}}
function title(){return lang==='zh'?level.zh:level.en;}
function renderTexts(){
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=tr('Ghostkeeper Maze 3D · Halloween','幽灵巡夜迷宫 3D · 万圣节');
  $('#title').innerHTML=tr('Ghostkeeper <em>Maze</em> <small>3D</small>','幽灵<em>巡夜迷宫</em> <small>3D</small>');$('#language').textContent=tr('中文','EN');
  $('#levels').ariaLabel=tr('Choose a night','选择关卡');$('#help').ariaLabel=tr('How to play','玩法说明');$('#sound').ariaLabel=prefs.sound?tr('Mute sound','关闭声音'):tr('Enable sound','开启声音');$('#sound').textContent=prefs.sound?'♪':'♩';
  $('#restart').ariaLabel=tr('Restart this maze','重置迷宫');$('#share').ariaLabel=tr('Share this maze','分享迷宫');$('#hint').ariaLabel=tr('Ask the ghost guide','请幽灵指路');$('#map').ariaLabel=mapOpen?tr('Close map','关闭地图'):tr('Open map','打开地图');
  $('#view').ariaLabel=tr('First-person maze. Use the arrow keys or the four movement buttons.','第一人称迷宫。使用方向键，或下方四个移动按钮。');
  $('#steps-label').textContent=tr('STEPS','步数');$('#assists-label').textContent=tr('GUIDES','帮助');$('#turn-left-label').textContent=tr('TURN','左转');$('#turn-right-label').textContent=tr('TURN','右转');$('#forward-label').textContent=tr('FORWARD','前进');$('#back-label').textContent=tr('BACK','后退');
  const names={left:tr('Turn left','向左转'),right:tr('Turn right','向右转'),forward:tr('Move forward','向前走'),back:tr('Move backward','向后走')};document.querySelectorAll('[data-action]').forEach(b=>b.ariaLabel=names[b.dataset.action]);
  $('#journal-kicker').textContent=tr('A LANTERN KEEPER’S JOURNAL','提灯守夜人的小手记');$('#journal-title').innerHTML=tr('Nobody stays<br>lost tonight.','今夜，<br>谁也不会迷路。');$('#journal-copy').textContent=tr('Three small spirits have wandered into the old corridors. Bring a little light, find the key, and walk them home.','三个小幽灵走进了古老的回廊。带上一点灯光，找到钥匙，一起送它们回家。');
  $('#journal-note').textContent=tr('The map and ghost guide are always here to help. There’s no timer and nothing chasing you.','地图和幽灵向导随时愿意帮忙。这里没有倒计时，也没有追赶你的人。');$('#record-label').textContent=tr('YOUR BEST WALK','你的最佳巡夜');$('#footer-copy').textContent=tr('A little light. A little courage. Everybody home.','一点灯火，一点勇气，一起回家。');$('#keyboard-hint').textContent=tr('W A S D / ARROW KEYS','W A S D / 方向键');
  $('#levels-title').textContent=tr('Where shall we wander?','今夜，去哪里逛逛？');$('#daily-title').textContent=tr('Tonight’s lost lanterns','今夜的迷路灯火');$('#daily-date').textContent=new Date().toISOString().slice(0,10)+' · UTC';$('#daily-note').textContent=tr('A different maze each UTC day. Shared links keep the same date.','每天按 UTC 日期更换迷宫；分享链接会保留所选日期。');
  $('#help-title').textContent=tr('Follow a little light.','跟着一点点灯光走。');$('#help-done').textContent=tr('Let’s wander','出发吧');
  $('#help-copy').innerHTML=tr('<p><b>Bring everybody home.</b> Walk over the three pumpkin lanterns to rescue their spirits, collect the brass key, then step into the moon gate. The gate opens only when all four are with you.</p><p><b>Walk, turn, look.</b> W / ↑ moves forward, S / ↓ steps back. A / ← turns left and D / → turns right. Each turn is 90°. The four buttons work on touch screens; holding a button repeats it.</p><p><b>A friendly little guide.</b> The small map reveals itself as you explore. The map button opens the full atlas. The ghost button guides you toward the nearest missing lantern or key. Using either is recorded as help, and never blocks completion.</p><p><b>A peaceful night.</b> There are 12 adventures plus a daily maze, with no timer or enemies. Try a return visit without the atlas, or find the shortest walk.</p>','<p><b>一起带回家。</b> 走到三盏南瓜灯处，接回它们的小幽灵，再拿到铜钥匙，最后进入月亮门。三个幽灵和钥匙到齐，门才会打开。</p><p><b>走一走，转一转。</b> W / ↑ 前进，S / ↓ 后退，A / ← 左转，D / → 右转，每次转身 90°。也可以用下方四个触摸按钮；长按能连续走动。</p><p><b>有人愿意指路。</b> 小地图会随着探索逐渐展开。地图按钮可打开完整地图，幽灵按钮会带你寻找最近的灯或钥匙。这些会记为帮助次数，不影响通关。</p><p><b>慢慢走也很好。</b> 共 12 个巡夜关卡，还有每日迷宫。没有倒计时，也没有敌人。熟悉后，可以试试不用地图，或走出更短的路线。</p>');
  $('#win-kicker').textContent=tr('ALL LITTLE SOULS ACCOUNTED FOR','所有小幽灵都到齐了');$('#win-title').textContent=tr('Everybody home.','大家都到家了。');$('#replay').textContent=tr('Walk again','再走一次');$('#next').textContent=dailyDate?tr('Choose a night ↗','选择关卡 ↗'):levelIndex===11?tr('Back to the nights ↗','回到关卡 ↗'):tr('Next night ↗','下一夜 ↗');
  $('#share-title').textContent=tr('Leave a light on.','为朋友留一盏灯。');$('#share-copy').textContent=tr('Send a friend the same maze, starting at the gate.','把这座迷宫送给朋友，一起从门口开始。');$('#copy-link').textContent=tr('Copy link','复制链接');
  $('#map-caption').textContent=tr('MOONLIGHT ATLAS · GUIDED','月光地图 · 已使用帮助');renderLevels();renderState();
}
function renderLevels(){
  $('#level-picker').innerHTML=NIGHTS.map((n,i)=>`<button class="level-button${!dailyDate&&i===levelIndex?' current':''}${prefs.best['night-'+(i+1)]?' done':''}" data-night="${i}" aria-label="${tr('Night','第')} ${i+1}${tr('',' 夜')} · ${lang==='zh'?n.zh:n.en}"><strong>${String(i+1).padStart(2,'0')}</strong><small>${prefs.best['night-'+(i+1)]?'✦':`${n.size} × ${n.size}`}</small></button>`).join('');
}
function renderState(){
  $('#night-number').textContent=dailyDate?tr('DAILY','每日'):tr(`NIGHT ${String(levelIndex+1).padStart(2,'0')}`,`第 ${String(levelIndex+1).padStart(2,'0')} 夜`);$('#level-title').textContent=title();
  $('#steps').textContent=String(state.steps);$('#assists').textContent=String(state.assists);$('#compass').textContent=tr(['N','E','S','W'][state.dir],['北','东','南','西'][state.dir]);
  $('#inventory').innerHTML=[0,1,2].map(i=>`<span class="spirit${state.lanterns&(1<<i)?' found':''}">${littleGhost}</span>`).join('')+`<span class="count">${lanternCount(state)} / 3</span><span class="key${state.key?' found':''}">${littleKey}</span>`;
  $('#inventory').ariaLabel=tr(`${lanternCount(state)} of 3 lanterns. Key ${state.key?'found':'missing'}.`,`已找到 ${lanternCount(state)} / 3 盏灯，钥匙${state.key?'已找到':'未找到'}。`);
  $('#quest').textContent=state.won?tr('Everyone is home. Thank you, little keeper.','大家都到家了。谢谢你，小守夜人。'):state.lanterns===7&&state.key?tr('The moon gate is open. Bring everybody home.','月亮门开了，一起回家吧。'):state.lanterns===7?tr('Three friends found. Now, the brass key.','三个伙伴都找到了，还差铜钥匙。'):state.key?tr('Key found. Let’s find the remaining lantern spirits.','钥匙找到了，继续寻找小幽灵们。'):tr('Find three lantern spirits and the brass key.','找到三盏幽灵灯和铜钥匙。');
  $('#objective-list').innerHTML=`<div><span>${tr('Lantern spirits','幽灵伙伴')}</span><strong>${lanternCount(state)} / 3</strong></div><div><span>${tr('Brass key','铜钥匙')}</span><strong>${state.key?tr('Found ✦','已找到 ✦'):tr('Still out there','等待发现')}</strong></div><div><span>${tr('Moon gate','月亮门')}</span><strong>${state.key&&state.lanterns===7?tr('Open','已开启'):tr('Waiting','等待伙伴')}</strong></div>`;
  const b=prefs.best[level.id];$('#record').textContent=b?tr(`${b.steps} steps · ${b.assists} guides`,`${b.steps} 步 · ${b.assists} 次帮助`):tr('Your first adventure awaits.','第一次小冒险，等你出发。');
  $('#map').setAttribute('aria-pressed',String(mapOpen));$('#map').ariaLabel=mapOpen?tr('Close map','关闭地图'):tr('Open map','打开地图');$('#map-caption').hidden=!mapOpen;$('#scene').classList.toggle('map-open',mapOpen);renderer.mapOpen=mapOpen;
  if(guidance){
    const next=nextHint(state);guidance=next;renderer.hint=next;$('#hint-banner').hidden=!next;
    if(next){const action={forward:tr('Forward ↑','向前 ↑'),back:tr('Back ↓','后退 ↓'),left:tr('Turn left ↶','左转 ↶'),right:tr('Turn right ↷','右转 ↷')}[next.action]||tr('This way','就在这里');const target={lantern:tr('lantern','幽灵灯'),key:tr('key','钥匙'),exit:tr('moon gate','月亮门')}[next.target];$('#hint-banner').textContent=`${action} · ${target}`;}
  }else{$('#hint-banner').hidden=true;renderer.hint=null;}
  const scene=$('#scene');scene.dataset.renderer='canvas-raycaster';scene.dataset.night=level.id;scene.dataset.cell=String(state.cell);scene.dataset.direction=String(state.dir);scene.dataset.lanterns=String(lanternCount(state));scene.dataset.key=String(state.key);scene.dataset.won=String(state.won);
}
function load(index,date=null){
  clearTimeout(winTimer);endHold();levelIndex=index;dailyDate=date;level=makeLevel(index,date);state=newGame(level);mapOpen=false;mapUsed=false;guidance=null;lastAction=0;
  $('#win-dialog').close();$('#levels-dialog').close();renderer.setState(state,true);renderTexts();
  try{history.replaceState(null,'',date?`#daily=${date}`:`#night=${index+1}`);}catch{}
}
function move(action){
  if(state.won||document.querySelector('dialog[open]'))return;
  const now=performance.now();if(now-lastAction<125)return;lastAction=now;
  state=act(state,action);renderer.setState(state);renderState();
  if(state.event==='wall'){$('#scene').classList.remove('bump');void $('#scene').offsetWidth;$('#scene').classList.add('bump');return;}
  if(state.event==='lantern'){sound('lantern');toast(tr(`A little friend found. ${lanternCount(state)} / 3.`,`接到一个小伙伴，${lanternCount(state)} / 3。`));guidance=null;renderer.hint=null;$('#hint-banner').hidden=true;}
  if(state.event==='key'){sound('key');toast(tr('The brass key is yours.','铜钥匙找到了。'));guidance=null;renderer.hint=null;$('#hint-banner').hidden=true;}
  if(state.event==='locked')toast(tr('The gate waits for three lanterns and the key.','月亮门在等三位伙伴和铜钥匙。'));
  if(state.won){endHold();sound('win');complete();}
}
function complete(){
  const old=prefs.best[level.id];if(!old||state.assists<old.assists||state.assists===old.assists&&state.steps<old.steps){prefs.best[level.id]={steps:state.steps,assists:state.assists};save();}
  $('#win-copy').textContent=tr(`${title()} · three little friends, one lovely walk.`,`${title()} · 三个小伙伴，一段好时光。`);
  $('#win-stats').innerHTML=`<div><b>${state.steps}</b><span>${tr('YOUR STEPS','你的步数')}</span></div><div><b>${level.par}</b><span>${tr('SHORTEST WALK','最短步数')}</span></div><div><b>${state.assists}</b><span>${tr('GUIDES USED','使用帮助')}</span></div>`;
  $('#win-note').textContent=state.steps===level.par?tr('A perfectly planned little journey. Every step counted.','恰到好处的小旅程，每一步都刚刚好。'):tr('The shortest walk visits all four treasures and the gate. Turns do not count as steps.','最短路线会经过三盏灯、钥匙和出口；原地转身不计入步数。');
  renderTexts();$('#screen-status').textContent=tr(`Maze completed in ${state.steps} steps.`,`迷宫完成，共 ${state.steps} 步。`);winTimer=setTimeout(()=>$('#win-dialog').showModal(),260);
}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2300);}
function sound(kind){
  if(!prefs.sound)return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!audioContext||audioContext.state==='closed')audioContext=new AC();if(audioContext.state!=='running')audioContext.resume().catch(()=>{});
    const notes=kind==='win'?[72,76,79,84]:kind==='key'?[79,84]:[72,79],c=audioContext;
    notes.forEach((m,i)=>{const t=c.currentTime+.015+i*.1,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=440*2**((m-69)/12);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.08,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.38);o.onended=()=>{o.disconnect();g.disconnect();};});
  }catch{}
}
function endHold(){clearTimeout(holdTimer);clearInterval(repeatTimer);holdTimer=null;repeatTimer=null;document.querySelectorAll('[data-action]').forEach(b=>b.classList.remove('active'));}
function openDialog(id){endHold();$(id).showModal();}
$('#language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';save();renderTexts();});$('#sound').addEventListener('click',()=>{prefs.sound=!prefs.sound;save();renderTexts();if(prefs.sound)sound('key');});
$('#levels').addEventListener('click',()=>{renderLevels();openDialog('#levels-dialog');});$('#help').addEventListener('click',()=>openDialog('#help-dialog'));
$('#restart').addEventListener('click',()=>load(levelIndex,dailyDate));$('#replay').addEventListener('click',()=>load(levelIndex,dailyDate));
$('#next').addEventListener('click',()=>{if(dailyDate||levelIndex===11){$('#win-dialog').close();openDialog('#levels-dialog');}else load(levelIndex+1);});
$('#level-picker').addEventListener('click',e=>{const b=e.target.closest('[data-night]');if(b){const n=Number(b.dataset.night);if(Number.isInteger(n)&&n>=0&&n<NIGHTS.length)load(n);}});
$('#daily').addEventListener('click',()=>load(0,new Date().toISOString().slice(0,10)));
$('#map').addEventListener('click',()=>{if(state.won)return;mapOpen=!mapOpen;if(mapOpen&&!mapUsed){state=useHint(state);mapUsed=true;}renderer.setState(state);renderState();});
$('#hint').addEventListener('click',()=>{if(state.won)return;state=useHint(state);guidance=nextHint(state);renderer.setState(state);renderState();toast(tr('Follow the little blue guide.','跟着蓝色小向导走。'));});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('#share').addEventListener('click',()=>{const u=new URL(location.href);u.hash=dailyDate?`daily=${dailyDate}`:`night=${levelIndex+1}`;$('#share-link').value=u.href;openDialog('#share-dialog');});
$('#copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#share-link').value);toast(tr('Link copied.','链接已复制。'));}catch{$('#share-link').focus();$('#share-link').select();toast(tr('Select and copy this link.','请选中并复制链接。'));}});
document.querySelectorAll('[data-action]').forEach(b=>{
  b.addEventListener('pointerdown',e=>{e.preventDefault();endHold();b.setPointerCapture(e.pointerId);b.classList.add('active');move(b.dataset.action);holdTimer=setTimeout(()=>{repeatTimer=setInterval(()=>move(b.dataset.action),165);},300);});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,endHold);
  // Space / Enter activation on a focused button uses its normal click event.
  b.addEventListener('click',e=>{if(e.detail===0)move(b.dataset.action);});
});
const keyActions={ArrowUp:'forward',ArrowDown:'back',ArrowLeft:'left',ArrowRight:'right',w:'forward',s:'back',a:'left',d:'right'};
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))return;
  const action=keyActions[e.key]||keyActions[e.key.toLowerCase()];if(action){e.preventDefault();move(action);}else if(e.key.toLowerCase()==='m'){e.preventDefault();if(!e.repeat)$('#map').click();}else if(e.key.toLowerCase()==='h'){e.preventDefault();if(!e.repeat)$('#hint').click();}
});
window.addEventListener('blur',endHold);document.addEventListener('visibilitychange',()=>{if(document.hidden){endHold();audioContext?.suspend().catch(()=>{});}});window.addEventListener('pagehide',()=>{endHold();cancelAnimationFrame(frame);audioContext?.close().catch(()=>{});});window.addEventListener('pageshow',e=>{if(e.persisted)frame=requestAnimationFrame(tick);});
new ResizeObserver(()=>renderer.resize()).observe($('#view'));renderer.resize();renderer.setState(state,true);
function tick(stamp){frame=requestAnimationFrame(tick);if(document.hidden)return;if(stamp-lastRender>1000/30){renderer.render(stamp);lastRender=stamp;}}
renderTexts();frame=requestAnimationFrame(tick);
