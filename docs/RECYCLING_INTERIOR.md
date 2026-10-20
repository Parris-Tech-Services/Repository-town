# P8 Recycling Centre — dedicated resource-recovery interior

Site: **P8, south side of Main Street**, opposite the shops.

## Audit and redesign

**Before:** The Recycling Centre used the same 14 m × 18 m room as generic retail sites: one long counter, two sets of shelves, decorative bins and three generic text prompts. It had no real segregation of visitors, conveyors, sorting operations, e-waste or battery hazards.

**Now:** `world/recycling-interior.js` replaces that fallback using the existing tested `createKit()` shell, entry and exit zones. The seven work zones are:

1. **Public intake** with accessible reception, record screen, parcel platform, scales and intake desk.
2. **Marked pedestrian spine** from the front door, with yellow boundary markings and industrial exclusion barriers.
3. **Guarded sorting conveyor** with rollers, picking stations, coloured material fractions, static emergency-stop assembly and no user-operated power switch.
4. **Covered e-waste inspection** with a bench, laptop, small electronics, documentation tray and labelled small-component collection.
5. **Paper, plastics and metal separation** with coloured staged bales and a guarded press/baler.
6. **Battery and problem-waste quarantine** behind a high-visibility barrier and closed translucent cage, not a player-accessible storage bay.
7. **Outbound goods shutter and staged reclaimed material** with dispatch checking that refers to the town’s actual `stock` and `out` totals.

The named recycler uses the existing staffing and schedule system and has a reserved receiving-desk spot. The custom room uses 8 inspection points. Industrial equipment is static/educational and cannot be started by the visitor.

## Live game systems versus educational details

`world/life.js` already models:
- household recyclables awaiting twice-daily collection;
- collection stock arriving at the Recycling Centre;
- staff-dependent hourly processing;
- scrap in `site.stock.scrap`;
- scrap prepared for outbound freight in `site.out.scrap`;
- `life.stats.recycled` for the day.

`ui/recycling-panel.js` reads all these values **when the player opens or refreshes** an inspection point. It uses `workingAt()` to count staff on duty. No independent material quantities are invented.

**Not simulated:** serialised e-waste intake, battery mass or location, e-waste sanitisation certificates, true baler operation, actual weighing, fire suppression, approved waste sorting procedures, licensed hazardous-waste processing, or a separate e-waste production account. Labels must never suggest these are present.

## Source research and realism decisions

- NSW EPA, [Waste facilities](https://www.epa.nsw.gov.au/Your-environment/Waste/waste-facilities): licences and tracking of waste quantities where required, plus fire-safety guidance.
- NSW Planning Portal, [resource recovery facility design example](https://www.planningportal.nsw.gov.au/planning-panel/designatedintegrated-waste-management-facility-resource-recovery-facility-rpp): segregated tipping/sorting, dedicated material bays, offices, workshop and heavy/light parking.
- [SafeWork NSW: waste management and recycling](https://www.safework.nsw.gov.au/your-industry/waste-management-and-recycling): guarding, emergency stops, traffic control, worker training and separation of people from plant.
- [SafeWork NSW: forklifts](https://www.safework.nsw.gov.au/hazards-a-z/forklifts): fenced walkways, exclusion zones and separate driver/loading paths.
- [Fire and Rescue NSW, fire safety in waste facilities](https://www.epa.nsw.gov.au/sites/default/files/guidelines_fire_safety_in_waste_facilities.pdf): fire risk, storage configuration, access and separation; facility-specific engineering is not reproduced in game.
- [NSW Government lithium-ion battery recycling advice](https://www.nsw.gov.au/energy/shop-charge-and-recycle-lithium-ion-batteries-safely): keep batteries out of general recycling and warn of damaged battery fire hazards.
- [NSW EPA community recycling centres](https://www.epa.nsw.gov.au/Your-environment/Recycling-and-reuse/household-recycling-overview/find-crcs-or-hcco): special materials require appropriate drop-off streams. Business waste is not treated as ordinary household CRC disposal.

**The P8 facility is fictional, and no dimensions, clearances, fire systems or storage enclosures portrayed here constitute a facility approval or technical design.** The safe layout is a stylised educational interpretation of the operational separation principles, not an approved NSW waste-site specification.

## Tests and acceptance

Run `node tests/recycling-interior.mjs` to check: no duplicate generic rendering, eight unique interaction points, valid spawn and exit, centre pedestrian access with player collision radius, no buried hotspots, no visitor access to hazardous controls and live town stock wiring.

Before publishing: verify GitHub Pages on an Android-size browser viewport, the receiving staff’s identity, the live resource-recovery panel, interaction prompt reachability and exit to Main Street. Check for frame-rate regression.

## Remaining work

Actual in-game material conveyance animations and item-level tracking; distinct aluminium, paper, plastics and glass inventories; verified e-waste data-sanitisation outcomes; explicit battery risk classification; recycler actions that consume real inputs and produce real output without duplicating stock. None of these is claimed finished.
