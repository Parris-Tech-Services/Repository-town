# Q8 Waste Depot interior: regional NSW transfer station

## Scope
Q8 on the south side of Main Street formerly used the **generic shop interior**. Its replacement `world/waste-depot-interior.js` is an enclosed residual-waste transfer/receival facility, distinct from the P8 Recycling Centre next door. It is a small educational model, **not** a real landfill, a licensed transfer station or a regulatory-compliant design.

## Research

- NSW EPA, [Handbook for Design and Operation of Rural and Regional Transfer Stations](https://www.epa.nsw.gov.au/sites/default/files/060362-transferstation1.pdf): sheltered handling, stormwater and leachate containment, bunded areas for problematic waste, site layout, safe operations.
- [SafeWork NSW, waste management and recycling](https://www.safework.nsw.gov.au/your-industry/waste-management-and-recycling): plant guarding, emergency stops, training and separate pedestrian/vehicle traffic.
- [SafeWork NSW: forklifts](https://www.safework.nsw.gov.au/hazards-a-z/forklifts): pedestrian exclusion routes, barriers and traffic safety.
- [SafeWork NSW: road freight transport risks](https://www.safework.nsw.gov.au/print-guide?source=1023785): separated loading zones and signage.
- [NSW EPA: waste facilities](https://www.epa.nsw.gov.au/Your-environment/Waste/waste-facilities): environmental protection licensing, reporting and waste-facility fire-safety requirements.

These sources supply high-level design principles only; actual facility approvals, fire engineering and spatial clearances require site-specific professional assessment.

## Dedicated zones and gameplay

1. **Weigh-in and administration**: service desk, manifests, computer, ticket printer, scales and visitor bench.
2. **Public safety gallery**: marked centre pedestrian route with bright boundaries, roof beams, ventilation and emergency displays.
3. **Load inspection**: covered nonconforming-waste screen with separate identified material trays.
4. **Guarded tipping apron**: heavy-vehicle skip and controlled loading bay; not accessible to visitors.
5. **Restricted compaction area**: static hydraulic machine enclosure, guarded red controls and safety rails. No visitor operation.
6. **Quarantine and containment**: secure problem-waste store, roof cover, spill kit, sump and contained floor drain.
7. **Outbound transfer**: shutter marked CLOSED and dispatch documentation; no false walkable exit into the outdoor truck route.

**Nine inspection points** open documented information or the existing Town Ledger. The Q8 panel reads real `life.place('landfill').stock.rubbish`, `life.civic.homes.rubbish` and `life.stats.landfill` each time it opens or refreshes. These are simulation **units**, not tonnes or compliant weighbridge measurements. The model does *not* track actual licensed final disposal, hazardous material mass, truck tipping cycles, compacting mechanisms, off-site transport contracts or chain-of-custody certificates.

The site currently has no dedicated `landfill` worker in the town's employment roster. The model does not fabricate a permanent shopkeeper: if the town later assigns one, `populateShopStaff()` can use the reserved office coordinates.

## Quality gates

`node tests/waste-depot-interior.mjs` validates that the generic layout was replaced; Q8 uses nine distinct inspections; no hotspot or player start point is inside a collider; the centre corridor remains clear; all inspections are reachable by a path from the front door; dangerous equipment has no visitor controls; and waste counts are read from TownLife.

The separate P8 Recycling Centre, the farmhouse, the many existing NPC houses, current town economics and the previous Paul Roe memorial work must remain unchanged.

## Remaining
Actual staff/vehicle shift roster, simulated weighbridge weights, waste load manifests, moving trucks in a separate exterior yard, dust and odour state, a reliable residual-waste export ledger and weather-dependent drainage. These are future improvements and are **not** claimed as implemented.
