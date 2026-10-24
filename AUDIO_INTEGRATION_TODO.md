# ElevenLabs integration — numbered outstanding tasks

**Status:** OPEN / NOT YET VERIFIED. **Last inventoried:** 2026-10-24. This document is a task tracker, not evidence that the changes or playtests are done.

**Global tracker:** https://github.com/Parris-Tech-Services/ParrisVoiceBank/blob/main/AUDIO_INTEGRATION_MASTER_TODO.md

**Rules:** Global numbers are stable (001–048); check a task off only after recording the passing tests and real production verification. Reuse existing ElevenLabs assets rather than regenerating paid speech. Manual workflows are preferred to save GitHub Actions usage. Do not play audio automatically or mislabel generic TTS as a recording.

## Tasks relevant to this repository (17)

- [x] **006** [P1] Check all 100 Game300 dialogue lines play for their intended NPCs
  - [x] [AI] Verify 100/100 Town recordings via real production Web Audio decoding.
  - [x] [AI] Test ten characters' Listen/Next/Stop/Close controls at 390×844 in Chrome; commit and run the test.
- [ ] **007** [P1] Move suitable lines from the optional dialogue gallery into relevant conversations and game events
  - [x] [AI] Implement accurate optional recorded greeting/help cues in Town PR #165; avoid claiming unearned quests or matching arbitrary AI text.
  - [x] [AI] Verify the latest PR SHA has all eight GitHub check jobs passing (confirmed 2026-10-24).
  - [ ] [AI] Review latest PR diff for mobile overflow, cancel/re-entry, speech overlap, XSS and correct caption text.
  - [ ] [AI] Use a single release, not repeated deployments: first prefer the current Vercel Hobby daily quota resetting (no purchase); consider Cloudflare Pages only after an independent compatibility/privacy/asset review.
  - [ ] [AI] Merge PR #165 when production release is feasible; re-test actual NPC conversations, switching, mute and recorded speech on the final public URL.
  - [ ] [AI] Attach tested production commit/URL, browser trace and regression results, then tick task 007.
- [ ] **008** [P1] Ensure generated dialogue never falsely announces completed repairs, quests, purchases or journeys
  - [ ] [AI] Inventory all Game300 phrases that imply achievements, repairs, purchases, travel or completed quests.
  - [ ] [AI] Map achievement-related audio only to authoritative game-state transitions, not keyword guesses in chat.
  - [ ] [AI] Add negative tests for failed purchases, missing inventory, cancelled quests and random AI replies.
  - [ ] [AI] Playtest each verified event before allowing its recorded success line in production.
- [ ] **009** [P1] Match every recorded line to the right character voice and exact caption
  - [ ] [AI] Export clip→speaker→event→text→SHA-256 manifest for all ten Town residents.
  - [ ] [AI] Compare Town NPC IDs to VoiceBank voice IDs; flag every mismatched or duplicate speaker/caption.
  - [ ] [AI] Assert caption equals recording transcript and the actual decoded asset is the advertised character.
  - [ ] [AI] Test gallery and contextual chat on production with at least one full pass per speaker.
- [ ] **010** [P1] Test NPC opening, closing, switching, replay, stopping and rapid repeated taps
  - [ ] [AI] Automate open/close/reopen, NPC switch, ten rapid taps, replay and stop in Playwright on desktop and mobile-sized Chrome.
  - [ ] [AI] Confirm playback cancels on modal dismissal, leaving an NPC and switching residents.
  - [ ] [AI] Check no stale promise re-enables the wrong button or starts duplicate WebAudio sources.
  - [ ] [AI] Attach browser logs and preserve source/e2e tests as regression protection.
- [ ] **011** [P1] Test audio while walking, entering buildings, exploring the town and interacting with objects
  - [ ] [AI] Use canonical live Town, not the audio module alone, for walk→chat→walk→building→object paths.
  - [ ] [AI] Verify pressing Listen does not trap pointer/keyboard movement, impair WebGL or trigger while a modal is gone.
  - [ ] [AI] Test route transitions, buildings with residents, and simultaneous ambient/game effects.
  - [ ] [AI] Capture browser test evidence and repair any obstruction or audio leakage.
- [ ] **012** [P1] Test on Android and desktop, including poor connectivity and unavailable recordings
  - [ ] [AI] Test desktop Chromium and Android emulation in narrow/landscape viewports, including touch controls and network throttling/offline.
  - [ ] [AI] Simulate ZIP 404, CORS rejection, broken MP3, slow CDN and context suspension.
  - [ ] [AI] Show honest 'recording unavailable' state, retry and control recovery without covert device TTS.
  - [ ] [YOU, optional final acceptance] Try a brief real Android listen/stop only if device-only bugs remain after automated testing.
- [ ] **013** [P1] Verify the canonical Repository Town production deployment, not just its GitHub Pages mirror
  - [ ] [AI] Identify canonical Town source as `joshualparris/JoshMemory/repository-town`, not the similarly named mirror.
  - [ ] [AI] Confirm canonical production Vercel deployment SHA and alias, and keep publication errors distinct from mirror status.
  - [ ] [AI] Validate release assets, CSP/CORS, mobile page, and live NPC audio at the canonical URL.
  - [ ] [AI] Compare tested source SHA with deployed SHA after PR #165 lands; save proof before closing.
- [ ] **040** [P2] Audit voice consistency, pronunciation, volume, pauses and audio quality across all characters
  - [ ] [AI] Measure loudness, peak, duration and leading/trailing silence for every approved clip using open-source tools.
  - [ ] [AI] Flag speaker changes, clipped audio, pronunciation errors and long pauses for listening review.
  - [ ] [AI] Apply non-destructive free gain/trim normalisation only with before/after hashes and source preserved.
  - [ ] [AI] Test representative character clips in the actual app/game playback mix.
- [ ] **041** [P2] Check integrity, captions, wrong-file matches and broken URLs for each recording
  - [ ] [AI] Generate a canonical ID→speaker→caption→URL→SHA-256 matrix with no duplicates.
  - [ ] [AI] Validate all manifest references and content type/length, and audit caption versus text metadata.
  - [ ] [AI] Test fail-fast behaviour for swapped voice files, 404, CORS and corrupt ZIP; store report.
  - [ ] [AI] Do not close until all required clips in the specified scope pass.
- [ ] **042** [P2] Verify no overlapping audio, autoplay problems, stuck players or missing stop controls
  - [ ] [AI] Enumerate distinct media engines per app and document precedence, pause and stop rules.
  - [ ] [AI] Add a repeat-tap/switch/close stress test that detects overlapping voices or hanging player state.
  - [ ] [AI] Verify no autoplay without user gesture and stop when leaving game/dialogue.
  - [ ] [AI] Confirm screen-reader announcements remain clear when an audio error occurs.
- [ ] **043** [P2] Check loading performance and avoid unnecessarily downloading hundreds of recordings on mobile data
  - [ ] [AI] Record startup/network bytes and lazy-load timing on a throttled simulated mobile connection.
  - [ ] [AI] Ensure packs download on explicit interaction, cache selectively and respect audio settings.
  - [ ] [AI] Verify bundles do not fetch all 300 clips on every page load or exhaust storage.
  - [ ] [AI] Add performance budgets and compare measurements after optimisation.
- [ ] **044** [P2] Test fallback and retry behaviour without unexpected ElevenLabs API calls or costs
  - [ ] [AI] Simulate offline, rate limits, 404, timeout, CORS denial and decode failure for every playback API.
  - [ ] [AI] Assert graceful retry/disabled control with accurate voice source label.
  - [ ] [AI] Log outbound request domains and prove no unplanned ElevenLabs/paid API calls.
  - [ ] [AI] Preserve working offline alternatives only where approved, with no disguised device TTS.
- [ ] **045** [P2] Check accessibility, keyboard controls, reduced-motion preferences and screen-reader labels
  - [ ] [AI] Run automated accessibility assertions for labels, focus, aria-pressed/status and heading structure.
  - [ ] [AI] Test keyboard-only controls and switch to reduced-motion mode where relevant.
  - [ ] [AI] Inspect mobile hit targets and long translated/recorded captions for overflow.
  - [ ] [AI] Retest screen-reader relevant semantics after fixes.
- [ ] **046** [P2] Run project builds, automated tests, real-browser journeys and production smoke tests
  - [ ] [AI] Record per-app build, unit, integration, browser and deployed smoke commands in a single evidence matrix.
  - [ ] [AI] Run lowest-cost tests first, then real browser journeys (Chrome mobile/desktop) without generating speech.
  - [ ] [AI] Gate deployment on the relevant tests; attach SHA, exit logs, network/audio proof and URL.
  - [ ] [AI] Distinguish an independent test from GitHub Actions execution and never claim CI green when runner was blocked.
- [ ] **047** [P2] Confirm save/load, offline support and core gameplay remain unchanged where audio was added
  - [ ] [AI] Snapshot test saves/progress before audio features and verify backwards-compatible restores.
  - [ ] [AI] Test offline startup and cached/missing audio without breaking gameplay, exercise tracking or school-safe app features.
  - [ ] [AI] Check changing voice settings does not change game data, achievements or scores.
  - [ ] [AI] Perform a production upgrade/reload regression on each affected app.
- [ ] **048** [P2] Publish a central audit showing clip ID, voice, source, destination, gameplay trigger, review status and test outcome
  - [ ] [AI] Consolidate all accessible audio manifests into one versioned inventory with ID, source, speaker, text, hash, game, trigger and deployed URL.
  - [ ] [AI] Link QA evidence (CI/build/browser/devices), confidence level, review status and unresolved blockers per clip.
  - [ ] [AI] Publish a machine-readable CSV/JSON and human audit in VoiceBank with source references.
  - [ ] [AI] Reconcile all 48 task checkboxes from actual proof; leave missing/private/inaccessible items explicitly OPEN.

### 006 — VERIFIED COMPLETE (100 Town Game300 character recordings)
- Live Town: https://repository-town-claude-complete.vercel.app (canonical joshualparris/JoshMemory). All Game300 clips served from https://parris-voicebank.vercel.app.
- Reproducible QA: https://github.com/joshualparris/JoshMemory/blob/main/repository-town/tests/game300-live-playback.cjs and https://github.com/Parris-Tech-Services/Repository-town/blob/main/tests/game300-live-playback.cjs.
- Fetched the committed test from GitHub and executed it in headless Google Chrome 156 at 390×844 on the actual production origin: exit code 0, JSON PASS.
- All 100/100 recordings (10 each: Rowan, Pip, Circuit, Wren, Sol, Sage, Spark, Lyra, Nova, Kit) successfully started with the production game300 WebAudio player and decoder.
- Actual production makeTownRecordedLines Listen / Next line / Stop / Close UI controls passed for all 10 characters. Correct/different captions, zero browser page errors and zero paid ElevenLabs API calls.
- This completes playback availability and actor assignment task 006, NOT automatic transaction/quest/dialogue suitability nor complete 3D walking gameplay. Those remain tasks 007–013 and 040–047. Full 3D Chrome run had exhausted memory; final test used lightweight live page of the same Town origin to run live production UI module without 3D rendering. No new paid TTS.


<!-- NO_COST_SUBTASKS_V1 -->

**Ownership:** `[AI]` = connected-tool implementation and testing; `[YOU]` = only essential account/device work. No paid services. See the master task checklist for global policy and evidence.
