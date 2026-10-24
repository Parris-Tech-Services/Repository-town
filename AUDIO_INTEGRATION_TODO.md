# ElevenLabs integration — numbered outstanding tasks

**Status:** OPEN / NOT YET VERIFIED. **Last inventoried:** 2026-10-24. This document is a task tracker, not evidence that the changes or playtests are done.

**Global tracker:** https://github.com/Parris-Tech-Services/ParrisVoiceBank/blob/main/AUDIO_INTEGRATION_MASTER_TODO.md

**Rules:** Global numbers are stable (001–048); check a task off only after recording the passing tests and real production verification. Reuse existing ElevenLabs assets rather than regenerating paid speech. Manual workflows are preferred to save GitHub Actions usage. Do not play audio automatically or mislabel generic TTS as a recording.

## Tasks relevant to this repository (17)

- [x] **006** [P1] Check all 100 Game300 dialogue lines play for their intended NPCs
- [ ] **007** [P1] Move suitable lines from the optional dialogue gallery into relevant conversations and game events
- [ ] **008** [P1] Ensure generated dialogue never falsely announces completed repairs, quests, purchases or journeys
- [ ] **009** [P1] Match every recorded line to the right character voice and exact caption
- [ ] **010** [P1] Test NPC opening, closing, switching, replay, stopping and rapid repeated taps
- [ ] **011** [P1] Test audio while walking, entering buildings, exploring the town and interacting with objects
- [ ] **012** [P1] Test on Android and desktop, including poor connectivity and unavailable recordings
- [ ] **013** [P1] Verify the canonical Repository Town production deployment, not just its GitHub Pages mirror
- [ ] **040** [P2] Audit voice consistency, pronunciation, volume, pauses and audio quality across all characters
- [ ] **041** [P2] Check integrity, captions, wrong-file matches and broken URLs for each recording
- [ ] **042** [P2] Verify no overlapping audio, autoplay problems, stuck players or missing stop controls
- [ ] **043** [P2] Check loading performance and avoid unnecessarily downloading hundreds of recordings on mobile data
- [ ] **044** [P2] Test fallback and retry behaviour without unexpected ElevenLabs API calls or costs
- [ ] **045** [P2] Check accessibility, keyboard controls, reduced-motion preferences and screen-reader labels
- [ ] **046** [P2] Run project builds, automated tests, real-browser journeys and production smoke tests
- [ ] **047** [P2] Confirm save/load, offline support and core gameplay remain unchanged where audio was added
- [ ] **048** [P2] Publish a central audit showing clip ID, voice, source, destination, gameplay trigger, review status and test outcome

### 006 — VERIFIED COMPLETE (100 Town Game300 character recordings)
- Live Town: https://repository-town-claude-complete.vercel.app (canonical joshualparris/JoshMemory). All Game300 clips served from https://parris-voicebank.vercel.app.
- Reproducible QA: https://github.com/joshualparris/JoshMemory/blob/main/repository-town/tests/game300-live-playback.cjs and https://github.com/Parris-Tech-Services/Repository-town/blob/main/tests/game300-live-playback.cjs.
- Fetched the committed test from GitHub and executed it in headless Google Chrome 156 at 390×844 on the actual production origin: exit code 0, JSON PASS.
- All 100/100 recordings (10 each: Rowan, Pip, Circuit, Wren, Sol, Sage, Spark, Lyra, Nova, Kit) successfully started with the production game300 WebAudio player and decoder.
- Actual production makeTownRecordedLines Listen / Next line / Stop / Close UI controls passed for all 10 characters. Correct/different captions, zero browser page errors and zero paid ElevenLabs API calls.
- This completes playback availability and actor assignment task 006, NOT automatic transaction/quest/dialogue suitability nor complete 3D walking gameplay. Those remain tasks 007–013 and 040–047. Full 3D Chrome run had exhausted memory; final test used lightweight live page of the same Town origin to run live production UI module without 3D rendering. No new paid TTS.

