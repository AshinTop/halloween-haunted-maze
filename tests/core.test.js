import test from 'node:test';
import assert from 'node:assert/strict';
import {NIGHTS,makeLevel,newGame,act,distances,neighbors,optimalRoute,routeActions,pathBetween,nextHint,useHint,selectFromHash,validDate,cleanPreferences,generateMaze} from '../core.js';

test('all twelve authored seeds create fully connected mazes with sealed boundaries',()=>{
  for(let i=0;i<NIGHTS.length;i++){
    const level=makeLevel(i),d=distances(level,level.start).dist;
    for(let p=0;p<level.cells.length;p++){if(!level.cells[p])assert.ok(d[p]>=0);const x=p%level.size,y=Math.floor(p/level.size);if(!x||!y||x===level.size-1||y===level.size-1)assert.equal(level.cells[p],1);}
    assert.equal(new Set([level.start,level.exit,...level.items.map(i=>i.cell)]).size,6);assert.equal(level.items.filter(i=>i.kind==='lantern').length,3);assert.equal(level.items.filter(i=>i.kind==='key').length,1);
  }
});

test('complete playable action witnesses rescue every spirit and finish all 12 levels',()=>{
  const expected=[16,32,34,40,60,54,48,94,76,84,102,104];
  for(let i=0;i<NIGHTS.length;i++){const level=makeLevel(i);let state=newGame(level);const route=optimalRoute(level),actions=routeActions(level,route,state.dir);for(const action of actions){state=act(state,action);assert.notEqual(state.event,'wall');}assert.equal(state.won,true);assert.equal(state.key,true);assert.equal(state.lanterns,7);assert.equal(state.steps,expected[i]);assert.equal(level.par,expected[i]);}
});

test('shortest-walk par agrees with an independent inventory-state breadth-first search',()=>{
  for(let index=0;index<12;index++){
    const level=makeLevel(index),queue=[[level.start,0,0]],seen=new Set([`${level.start}:0`]);let result=-1;
    for(let head=0;head<queue.length;head++){const [cell,mask,steps]=queue[head];if(cell===level.exit&&mask===15){result=steps;break;}for(const n of neighbors(level,cell)){let m=mask;for(const item of level.items)if(item.cell===n)m|=1<<item.id;const key=`${n}:${m}`;if(!seen.has(key)){seen.add(key);queue.push([n,m,steps+1]);}}}
    assert.equal(level.par,result);
  }
});

test('walls block movement, turns are free, and exit requires all collectibles',()=>{
  const level=makeLevel(1);let state=newGame(level);state={...state,dir:0};assert.equal(act(state,'forward').cell,state.cell);assert.equal(act(state,'forward').steps,0);
  const turned=act(state,'left');assert.equal(turned.dir,3);assert.equal(turned.steps,0);assert.equal(turned.turns,1);
  const adjacent=neighbors(level,level.exit)[0],route=[adjacent,level.exit];state={...state,cell:adjacent,dir:0};for(const a of routeActions(level,route,state.dir))state=act(state,a);assert.equal(state.cell,level.exit);assert.equal(state.won,false);assert.equal(state.event,'locked');
});

test('collecting a lantern twice does not create extra spirits and completed games are stable',()=>{
  const level=makeLevel(0);let state=newGame(level);const target=level.items[0].cell;for(const a of routeActions(level,pathBetween(level,state.cell,target),state.dir))state=act(state,a);const mask=state.lanterns;
  state=act(state,'back');state=act(state,'forward');assert.equal(state.lanterns,mask);
  state=newGame(level);for(const a of routeActions(level,optimalRoute(level),state.dir))state=act(state,a);assert.strictEqual(act(state,'forward'),state);assert.strictEqual(act(state,'left'),state);
});

test('the ghost guide provides legal moves and can finish every level from a fresh start',()=>{
  for(let i=0;i<12;i++){let state=newGame(makeLevel(i));for(let n=0;n<1000&&!state.won;n++){const hint=nextHint(state);assert.ok(hint?.action);state=act(state,hint.action);assert.notEqual(state.event,'wall');}assert.equal(state.won,true);assert.equal(useHint(state).assists,state.assists+1);}
});

test('daily mazes are reproducible and valid dates cannot normalize into a different day',()=>{
  const a=makeLevel(0,'2026-10-31'),b=makeLevel(0,'2026-10-31'),c=makeLevel(0,'2026-11-01');assert.deepEqual(a.cells,b.cells);assert.deepEqual(a.items,b.items);assert.notDeepEqual(a.cells,c.cells);
  assert.equal(validDate('2026-02-30'),false);assert.equal(validDate('2024-02-29'),true);assert.equal(validDate('2026-1-1'),false);assert.equal(validDate(null),false);
  assert.deepEqual(selectFromHash('#night=1.5'),{index:0,date:null});assert.deepEqual(selectFromHash('#night=12'),{index:11,date:null});assert.deepEqual(selectFromHash('#daily=2026-02-30&night=3'),{index:2,date:null});assert.deepEqual(selectFromHash('#daily=2026-10-31'),{index:0,date:'2026-10-31'});
});

test('saved records are validated and malformed preferences fall back safely',()=>{
  for(const bad of [null,undefined,7,[],true,'bad'])assert.deepEqual(cleanPreferences(bad),{lang:'en',sound:true,best:{}});
  const p=cleanPreferences({lang:'zh',sound:false,best:{'night-1':{steps:16,assists:0},'night-99':{steps:10,assists:0},'night-2':{steps:-3,assists:1},'daily-2026-02-30':{steps:50,assists:2}}});assert.deepEqual(p,{lang:'zh',sound:false,best:{'night-1':{steps:16,assists:0}}});
  assert.throws(()=>generateMaze(6,2));assert.throws(()=>generateMaze(100,2));
});
