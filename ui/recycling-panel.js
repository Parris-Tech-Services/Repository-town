import { workingAt } from '../world/shop-attendance.js';
// Snapshot on click: counts are read from the existing TownLife model, not
// invented visual exhibits. E-waste and battery display areas are not separate
// mass-flow categories in the current game and must never claim that they are.
const safe=n=>Math.max(0,Math.floor(Number(n)||0));
const names={
 checkin:'Public receiving and materials acceptance',
 scales:'Receiving scale and dispatch book',
 safety:'Visitor induction and pedestrian routes',
 sorting:'Guarded material sorting conveyor',
 ewaste:'Electronic equipment assessment',
 baler:'Baled materials and guarded press',
 batteries:'Restricted battery quarantine',
 dispatch:'Outbound recovered scrap to Foundry'
};
const notes={
 checkin:'Waste from town households reaches this site on scheduled collections. Material type, load condition and destination should be recorded. Actual weighbridge weights are not simulated.',
 scales:'Incoming weights are not measured in the game. These numbers represent simulation units, not tonnes, kilograms or verified compliance reports.',
 safety:'NSW SafeWork guidance calls for suitable guarding, vehicle-pedestrian separation, isolation and signage. Remain in the marked walkway; machinery and mobile plant are staff-only.',
 sorting:'Staff process recyclables in hourly town simulation batches when present. The visible sorting line is illustrative and has no visitor start switch.',
 ewaste:'Potentially reusable computers and electronics are kept away from residual material. Real data-bearing devices require custody records and approved sanitisation; the current game does not track serial numbers or erasure certificates.',
 baler:'Paper, metal and plastics require separate material streams. A baler is dangerous powered plant: guard, isolate and permit staff-only operation. The game does not model its individual hydraulic cycles.',
 batteries:'Batteries must be separated from ordinary recycling. Suspect or damaged lithium batteries are a fire hazard. This is a locked educational quarantine area, not interactive battery processing.',
 dispatch:'Recovered scrap leaves the centre as a separate outbound stock. Other town freight systems may move it to the Foundry; the displayed units are the game model’s real stock balances.'
};
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export function recyclingPanel(life,station='checkin'){
 const site=life.place('recycling');
 if(!site)return {title:'Recycling Centre',body:'Facility not found.',actions:[]};
 const floor=v=>safe(v).toLocaleString('en-AU');
 const awaiting=safe(site.stock?.recyclables);
 const scrap=safe(site.stock?.scrap);
 const outbound=safe(site.out?.scrap);
 const household=safe(life.civic?.homes?.recyclables);
 const recovered=safe(life.stats?.recycled);
 const workers=life.villagers.filter(v=>v.work==='recycling');
 const onShift=workers.filter(v=>workingAt(v,'recycling'));
 const available=life.open(site);
 return {
  title:'♻ '+(names[station]||'Recycling Centre'),
  body:'<p>'+esc(notes[station]||notes.checkin)+'</p>'+
   '<h3>Actual current town simulation</h3>'+
   '<p><b>Unsorted recyclables on site:</b> '+floor(awaiting)+' units · <b>Scrap awaiting dispatch:</b> '+floor(scrap)+
   ' units · <b>Scrap in outbound store:</b> '+floor(outbound)+' units.</p>'+
   '<p><b>Household collection queue:</b> '+floor(household)+' units · <b>Material processed today:</b> '+floor(recovered)+' units.</p>'+
   '<p><b>Facility:</b> '+(available?'Open':'Closed')+' · <b>Staff currently working:</b> '+onShift.length+
   ' · <b>Assigned workers:</b> '+esc(workers.map(v=>v.name).join(', ')||'None')+'.</p>'+
   '<p class="dim">Counts are read at the time you open this panel. The game currently combines incoming recycling into an aggregate material stream; it does not separately track e-waste, batteries, baled cardboard or kilograms. Industrial equipment here is visual and cannot be operated by visitors.</p>',
  actions:[{label:'Refresh actual recycling stock',run:()=>recyclingPanel(life,station)}]
 };
}
