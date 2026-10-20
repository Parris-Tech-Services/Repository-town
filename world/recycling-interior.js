import { createKit } from './interior-kit.js';

// P8: regional NSW resource recovery and recycling facility.
// The public drop-off and staff desk face the street. Visitor circulation
// is separate from conveyor, compacting, loading and battery quarantine.
// Based on NSW EPA, FRNSW and SafeWork NSW guidance (see docs/RECYCLING_INTERIOR.md).
// Educational low-poly design only, NOT a certified facility or an instruction
// to process lithium batteries. No hazardous plant can be operated by players.
export const RECYCLING_LAYOUT=Object.freeze({
 site:'P8',publicDoor:{x:0,z:6},walkway:{x0:-1.3,x1:1.3,z0:-11.8,z1:5.9},
 staff:{pos:{x:-4.75,z:2.10},use:{x:-3.25,z:3.38}},
 zones:['Public reception and supervised drop-off','Pedestrian inspection route',
   'Conveyor and guarded sorting line','Covered e-waste triage',
   'Separated metals and paper bays','Quarantined batteries and hazardous items',
   'Outbound bale storage and loading']
});

export function buildRecyclingInterior(site,makeLabel,life=null){
 const k=createKit(site,makeLabel,'Recycling Centre · resource recovery');
 const {box,solid,blocker,cyl,torus,text,add,group,THREE}=k;
 const C={floor:0x919b94,plaster:0xb2c2bc,steel:0x4e656f,frame:0x38454c,
   yellow:0xe4b54a,green:0x578b64,blue:0x4a7895,orange:0xc4823e,
   red:0xa84e41,glass:0xaecac5,card:0xc3a66b,ink:0x24393c};
 const num=v=>Math.max(0,Math.floor(Number(v)||0));
 const stock=site.stock||{},out=site.out||{};
 const entryStock={unsorted:num(stock.recyclables),scrap:num(stock.scrap),
   outboundScrap:num(out.scrap),processedToday:num(life?.stats?.recycled)};
 k.shell({wall:C.plaster,floor:C.floor,ceiling:0xc8d4cc,frontSill:1.0,sideSill:1.25});
 group.add(new THREE.HemisphereLight(0xedfff4,0x627474,1.6));
 // Bounded public entrance and central safe pedestrian aisle.
 box(2.65,.014,17.65,0,.024,-2.73,0x668077);
 for(const x of [-1.30,1.30])box(.065,.018,17.5,x,.04,-2.75,C.yellow);
 for(let z=5.0;z>-11;z-=1.5)box(.35,.017,.08,0,.042,z,0xdce2d4);
 for(const z of [-4.9,-8.3]) {
   for(const x of [-1.48,1.48])box(.10,.022,.75,x,.057,z,C.orange);
 }
 text('EXIT · VISITOR WALKWAY',0,3.48,5.52);
 text('STAFF / INDUSTRIAL ZONES',0,3.16,-4.5);
 // Industrial roof beams with lights, not a copy of a retail interior.
 for(const z of [-10.8,-7.5,-4.2,-.9,2.4,5.15]){
   box(13.5,.18,.23,0,4.33,z,C.steel);
   for(const x of [-4.1,0,4.1]){
     box(1.5,.085,.28,x,4.12,z,C.frame);
     box(1.36,.025,.22,x,4.065,z,0xe3efe9,{e:0x536d63});
   }
 }
 // Transparent barriers facing industrial equipment. Metal posts are visible
 // but collision blocks cover the actual guarded plant footprints.
 const barrier=(x,z,d,c=C.yellow)=>{
   for(const zz of [z-d/2,z+d/2])box(.09,1.7,.09,x,.85,zz,C.steel);
   box(.055,.10,d,x,1.55,z,c);
   box(.07,.10,d,x,.46,z,c);
   box(.028,.8,d,x,1.0,z,C.glass,{a:.28});
 };
 // Reception/admin zone with drop-off forms, scale and a realistic trolley.
 text('PUBLIC DROP-OFF',-4.3,3.1,5.15);
 solid(3.15,.95,.95,-4.7,.475,2.6,C.frame);
 box(3.28,.09,1.02,-4.7,1.00,2.6,0xd4d3c4);
 box(.65,.40,.075,-5.3,1.38,2.40,C.ink);
 box(.56,.30,.025,-5.3,1.40,2.45,0x8eb4ae,{e:0x254e4d});
 box(.72,.025,.31,-5.3,1.05,3.15,C.ink); // keyboard
 box(.44,.31,.36,-3.65,1.23,2.60,C.blue); // receipt printer
 box(.32,.045,.40,-3.65,1.46,2.60,0xdcd8c8); // paper slip
 solid(.78,.75,.72,-6.14,.375,4.73,C.steel); // scales
 box(.67,.09,.65,-6.14,.79,4.73,0xbbc0b8);
 solid(1.15,.49,.57,-3.68,.245,4.77,0x8a775e); // drop-off bench
 box(.95,.12,.46,-3.68,.55,4.77,C.card);
 for(let j=0;j<4;j++)box(.18,.025,.31,-4.00+j*.22,.62,4.77,0xd7c0a0);
 add('checkin','Drop-off and material acceptance','recycling-status',
   'Check accepted materials, record deliveries and see the town collection totals. Batteries and hazardous materials must be separately assessed, never placed on the conveyor.',-3.27,3.48);
 add('scales','Receiving scales and material register','recycling-status',
   'The platform scale and goods-in sheet record incoming loads. This is a fictional accounting view, not measured real-world weight.',-2.18,4.82);
 // Customer waiting and PPE briefing, separately from moving plant.
 text('SAFETY INDUCTION',4.3,3.05,5.18);
 solid(2.05,1.5,.46,5.68,.75,4.1,C.steel); // notice cabinet
 box(1.91,1.26,.03,5.68,1.61,4.38,0xe8e0c7);
 for(let j=0;j<5;j++)box(1.49,.05,.026,5.68,2.01-j*.22,4.42,j===0?C.red:C.ink);
 solid(2.15,.44,.70,4.12,.22,1.74,0x668074);
 box(2.11,.62,.10,4.12,.78,1.42,0x7a8e81);
 cyl(.16,.16,.65,6.5,.32,1.25,C.red);
 box(.13,.19,.14,6.5,.76,1.25,C.frame);
 text('NO PUBLIC ACCESS · PLANT',4.5,2.85,.45);
 add('safety','Read visitor safety induction','recycling-status',
   'Stay on marked walkways and out of moving plant zones. Operators isolate equipment before maintenance. Staff manage excluded hazardous items; never touch suspect batteries.',2.58,3.28);
 // Left: sorting and picking line, guarded off from the walkway.
 text('SORTING LINE',-4.45,3.10,-.58);
 barrier(-1.72,-2.35,5.95);
 solid(3.45,.68,4.20,-4.52,.60,-2.75,C.frame);
 box(3.17,.10,3.96,-4.52,.99,-2.75,0x758b8d);
 for(let j=0;j<5;j++){
   const z=-4.47+j*.80;
   for(const x of [-5.81,-3.22])cyl(.15,.15,.18,x,.91,z,C.steel,{rz:Math.PI/2});
   box(2.9,.055,.08,-4.52,1.06,z,C.orange);
 }
 // Fixed guarded emergency stop and safety interlock representation.
 box(.38,.50,.24,-2.22,1.48,-.72,C.steel);
 cyl(.16,.16,.18,-2.22,1.78,-.56,C.red);
 box(.24,.045,.12,-2.22,1.12,-.56,C.yellow);
 for(const z of [-3.95,-2.65,-1.35])
   for(const x of [-5.35,-4.50,-3.60])box(.45,.13,.34,x,1.11,z,[C.blue,C.card,C.green][Math.round((x+5.35)/.85)]);
 add('sorting','Guarded sorting conveyor','recycling-status',
   'Recycling is collected from homes and sorted by trained staff when the Recycling Centre is staffed. The moving conveyor has guards and an emergency stop, not player controls.',-.05,-2.05);
 // Right: screened electronics assessment bench, segregated from metal intake.
 text('E-WASTE TRIAGE',4.2,3.1,-.58);
 barrier(1.72,-2.35,5.8,C.blue);
 solid(2.7,.82,1.05,4.75,.41,-2.6,C.steel);
 box(2.78,.08,1.12,4.75,.86,-2.6,0xc9cfcb);
 box(.9,.09,.62,4.0,.97,-2.6,C.frame); // laptop
 box(.86,.48,.045,4.0,1.29,-2.91,C.blue); // display
 box(.77,.41,.013,4.0,1.30,-2.88,0x8fa7ab);
 box(.62,.25,.48,5.50,1.00,-2.6,C.ink); // small device
 box(.46,.65,.14,6.23,1.23,-2.6,0xb5bbad); // document tray
 for(const z of [-4.3,-3.7]) {
   solid(.96,.74,.68,5.95,.37,z,C.green);
   box(.74,.1,.52,5.95,.79,z,C.glass);
 }
 add('ewaste','Inspect electronics reuse bench','recycling-status',
   'A staff triage bench separates devices that might be repaired from items for licensed downstream recycling. Data-bearing equipment needs authorised data-sanitisation and chain-of-custody controls, not just a visual sticker.',2.10,-2.25);
 // Rear left: distinct metal, paper and plastics bunkers with bales on pallets.
 barrier(-1.72,-8.6,5.8,C.orange);
 text('MATERIAL BAYS',-4.4,3.1,-6.27);
 for(const [x,z,color] of [[-5.60,-7.3,0xa8b5b2],[-3.50,-7.3,C.blue],[-5.60,-9.70,C.card],[-3.5,-9.7,0x7c9393]]){
   solid(1.43,.20,1.13,x,.10,z,0x7a6650);
   box(1.20,.55,.9,x,.47,z,color);
   for(let j=0;j<3;j++)box(.05,.038,.91,x-.42+j*.42,.76,z,C.frame);
 }
 // A static baler behind rail guards; never player-operable.
 solid(1.45,2.2,1.00,-6.0,1.1,-10.9,C.steel);
 box(1.30,.85,.07,-6.0,1.55,-10.35,C.yellow);
 box(.62,.72,.08,-6.0,.63,-10.33,C.frame);
 box(.28,.08,.06,-6.0,1.06,-10.29,C.red);
 add('baler','Baler and recovered-material stock','recycling-status',
   'Separated paper, plastic and metal loads are prepared for dispatch. Balers, compactors and forklift aisles are kept behind barriers and cannot be operated by visitors.',-.13,-8.75);
 // Rear right: battery isolation; sealed caged store, no public access.
 barrier(1.72,-8.65,5.9,C.red);
 text('BATTERY HOLD · RESTRICTED',4.2,3.12,-6.55);
 solid(4.05,.22,4.15,4.62,.11,-9.05,C.steel); // bund tray
 for(const x of [2.64,6.60]){
   for(const z of [-11.03,-7.09])box(.11,2.85,.11,x,1.42,z,C.frame);
   box(.06,2.75,3.88,x,1.43,-9.05,C.glass,{a:.20});
 }
 for(const z of [-11.04,-7.07])box(4.05,2.75,.045,4.62,1.43,z,C.glass,{a:.20});
 for(const [x,z] of [[3.68,-8.25],[5.62,-8.25],[3.68,-10.01]]){
   box(.77,.57,.75,x,.30,z,0x7c8987);
   box(.70,.055,.70,x,.64,z,C.yellow);
   box(.26,.19,.02,x,.47,z+.39,C.red);
 }
 box(1.90,.83,.052,4.7,2.30,-7.0,C.red);
 text('NO ENTRY · BATTERY QUARANTINE',4.5,3.42,-7.02);
 add('batteries','Read quarantined-battery safety guidance','recycling-status',
   'Loose, embedded, damaged and swollen batteries are screened and isolated from general recyclables. Do not handle or attempt to discharge or dismantle them in this game. Actual storage and disposal require approved site procedures.',2.12,-8.75);
 // Outbound shutter is NOT a walkable exit. Real loads remain in an outdoor yard.
 box(2.9,2.5,.07,0,1.3,-11.84,C.frame);
 for(let j=0;j<11;j++)box(2.84,.03,.09,0,.25+j*.21,-11.75,0xa4b0aa);
 text('DISPATCH SHUTTER · CLOSED',0,3.17,-11.55);
 add('dispatch','Outbound scrap and recovered material register','recycling-status',
   'The town simulation tracks unsorted recycling, scrap waiting in the centre, and outbound scrap ready for the Foundry. Industrial dispatch uses the separate outside vehicle yard.',-.18,-10.65);
 const details=[
   'The centre is part of a fictional high-street complex, not a licensed real-world recycling depot.',
   'Staff-only areas, forklift routes, separated battery quarantine and fire controls are educational placeholders.',
   'No player action can open a locked battery store, operate a baler or control a live conveyor.'
 ];
 return k.finish({
   recyclingLayout:true,layout:RECYCLING_LAYOUT,
   stockAtEntry:entryStock,
   staff:RECYCLING_LAYOUT.staff,
   safetyNotes:details,
   zones:RECYCLING_LAYOUT.zones,
   industrialEquipmentGuarded:true
 });
}
