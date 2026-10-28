import test from 'node:test';
import assert from 'node:assert/strict';
import {makeLevel,openAt} from '../core.js';
import {castRay,projectPoint} from '../renderer.js';

test('raycasting every open cell in 12 mazes hits a finite solid wall in all directions',()=>{
  for(let i=0;i<12;i++){const l=makeLevel(i);for(let cell=0;cell<l.cells.length;cell++){if(l.cells[cell])continue;for(let angle=0;angle<Math.PI*2;angle+=Math.PI/8){const hit=castRay(l,cell%l.size+.5,Math.floor(cell/l.size)+.5,Math.cos(angle),Math.sin(angle));assert.ok(Number.isFinite(hit.distance)&&hit.distance>0);assert.ok(hit.u>=0&&hit.u<=1);assert.equal(openAt(l,hit.x,hit.y),false);}}}
});

test('sprite perspective handles behind-camera points and scales with distance',()=>{
  const camera={x:1.5,y:1.5,angle:0};assert.equal(projectPoint(camera,.5,1.5,960,540),null);const near=projectPoint(camera,2.5,1.5,960,540),far=projectPoint(camera,4.5,1.5,960,540);assert.equal(near.x,480);assert.equal(far.x,480);assert.ok(Math.abs(near.scale/far.scale-3)<1e-10);
  for(const [width,height] of [[960,540],[390,460],[390,300],[844,340]]){const p=projectPoint(camera,3.5,1.5,width,height);assert.equal(p.x,width/2);assert.ok(Number.isFinite(p.y)&&p.y>=0&&p.y<=height);assert.ok(p.depth>0);}
});
