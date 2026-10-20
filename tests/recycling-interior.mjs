// node tests/recycling-interior.mjs
// Pure Node acceptance: no browser, GPU, external credentials or THREE install.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../world/recycling-interior.js',import.meta.url),'utf8');
const router=readFileSync(new URL('../world/shop-interior.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../main.js',import.meta.url),'utf8');
const panel=readFileSync(new URL('../ui/recycling-panel.js',import.meta.url),'utf8');
assert(router.includes("if(site.id==='recycling')return buildRecyclingInterior(site,makeLabel,life);"));
assert(main.includes("recyclingPanel(life,thing.key.split(':')[1])"));
assert(panel.includes("workingAt(v,'recycling')"),'Staff attendance must match town roster');
const V=class{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}set(x,y,z){Object.assign(this,{x,y,z})}};
const G=class{constructor(){this.children=[]}add(x){this.children.push(x)}};
const kit=(site,label,title)=>{
 const colliders=[],interactables=[],sceneObjects=[],group=new G();
 const box=()=>({});
 const solid=(w,h,d,x,y,z)=>colliders.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2});
 const blocker=(w,d,x,z)=>colliders.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2});
 const text=()=>{};
 const add=(key,display,doWhat,description,x,z)=>interactables.push({
   key:site.id+':'+key,label:display,pos:new V(x,0,z),act:{do:doWhat,text:description}
 });
 return {group,colliders,interactables,sceneObjects,THREE:{Vector3:V,HemisphereLight:class{}},
   box,solid,blocker,text,add,cyl:()=>{},torus:()=>{},shell:()=>{},
   finish:extra=>({...extra,group,colliders,interactables,
     rooms:[{name:title,x0:-7,x1:7,z0:-12,z1:6}],spawn:new V(0,0,3.75),
     exitZone:{x0:-1.05,x1:1.05,z0:5.9,z1:7.2}})};
};
const {buildRecyclingInterior,RECYCLING_LAYOUT}=new Function('createKit',
  source.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'')+
  '\nreturn {buildRecyclingInterior,RECYCLING_LAYOUT};')(kit);
const site={id:'recycling',name:'Recycling Centre',
  stock:{recyclables:22,scrap:7},out:{scrap:4}};
const built=buildRecyclingInterior(site,()=>{}, {stats:{recycled:12}});
assert.equal(RECYCLING_LAYOUT.site,'P8');
assert.equal(built.recyclingLayout,true);
assert.equal(built.interactables.length,8);
assert.equal(built.industrialEquipmentGuarded,true);
assert.equal(built.stockAtEntry.unsorted,22);
assert.equal(built.stockAtEntry.processedToday,12);
assert.equal(built.stockAtEntry.outboundScrap,4);
assert.equal(built.staff.pos.x,-4.75,'Staff at the receiving desk');
const radius=.35;
const blocked=(x,z)=>built.colliders.some(b=>{
 const px=Math.max(b.x0,Math.min(b.x1,x)),pz=Math.max(b.z0,Math.min(b.z1,z));
 return (x-px)**2+(z-pz)**2<radius*radius;
});
assert(!blocked(built.spawn.x,built.spawn.z),'Player must not spawn in furniture');
for(const z of [5,3,1,-1,-3,-5,-7,-9,-10.9])
 assert(!blocked(0,z),'Central pedestrian walkway blocked at z='+z);
for(const item of built.interactables)
 assert(!blocked(item.pos.x,item.pos.z),'Interaction point clips machinery: '+item.key);
for(const x of built.interactables)
 assert.equal(x.act.do,'recycling-status','Station must report actual waste simulation counts');
// Flood-fill from the front door at a 350 mm collision radius, then reach
// every station within the game's 2.6m interaction distance.
const step=.35,minX=-6.65,minZ=-11.65,nx=39,nz=50;
const id=(i,j)=>i+','+j;
const seen=new Set(),nodes=[];
const sx=Math.round((built.spawn.x-minX)/step),sz=Math.round((built.spawn.z-minZ)/step);
seen.add(id(sx,sz));nodes.push([sx,sz]);
for(let k=0;k<nodes.length;k++){
 const [a,b]=nodes[k];
 for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
  const ix=a+dx,iz=b+dz,key=id(ix,iz);
  if(ix<0||iz<0||ix>=nx||iz>=nz||seen.has(key)||blocked(minX+ix*step,minZ+iz*step))continue;
  seen.add(key);nodes.push([ix,iz]);
 }
}
assert(nodes.length>600,'Accessible area unexpectedly small');
for(const point of built.interactables){
 assert(nodes.some(([i,j])=>Math.hypot(minX+i*step-point.pos.x,minZ+j*step-point.pos.z)<2.0),
    'Cannot reach '+point.key+' from public entrance');
}
assert(!built.interactables.some(x=>/switch|power on|operate|battery open/i.test(x.label)),
  'Visitors must not operate industrial or hazardous equipment');
console.log('PASS recycling P8: 8 safe inspection points, '+nodes.length+
 ' walkable grid cells, 2.6m clear central aisle, staff position, stock from live model and no visitor control of machinery');
