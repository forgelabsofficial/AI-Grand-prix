# Model Grand Prix — Full Project Documentation

**Documentation date:** 24 July 2026  
**Research freeze:** 23 July 2026 (Africa/Lagos)  
**Current implementation status:** Phases 1–5 complete; final Phase 6 validation work remains  
**Companies represented:** Anthropic, OpenAI and Moonshot AI

---

## 1. Executive summary

Model Grand Prix is a standalone, research-backed web application that turns a five-year AI-model comparison into two connected experiences:

1. **Graph mode** — inspect and compare model releases, evidence categories, operational metrics and championship presets.
2. **Race mode** — replay model progress as a live WebGL 3D motorsport broadcast with forward-only cars, automatic camera direction, model labels, overtakes, sounds and evidence-triggered stunts.

The project was deliberately designed to avoid a false “one number tells the whole story” comparison. It separates reasoning, coding, agents, multimodality, context, throughput, latency, cost and openness. When comparable data does not exist, it shows **N/A** instead of inventing a score.

The current build includes:

- Five-year model-release graph
- Ten judging categories
- Five championship presets
- Current Skills Circuit for operational metrics
- Three 3D cars and a full race circuit
- Predictive overtake camera direction
- Persistent model labels above cars
- BGM and race SFX controls
- Research-backed stunt cards and source IDs
- Four core hero stunts
- Six advanced spectacle events
- Fixed-anchor normalization and metric-level audit metadata
- Complete local operation without an API key or build process

---

## 2. Original product goals

The requested product evolved into the following requirements:

- Compare Anthropic, OpenAI and Moonshot AI as companies.
- Use their latest flagship models by default.
- Allow selection of researched historical models.
- Let the user edit the graph title.
- Transform the graph into a playable/cinematic race.
- Replay approximately five years of model progress.
- Use research-backed scoring rather than arbitrary manual values.
- Show which model is active above each car.
- Use cinematic 3D camera cuts that follow leaders, challengers and overtakes.
- Keep cars moving forward without camera-dependent rubber-banding.
- Add race speed and cinematic intensity controls.
- Add optional BGM and race sound effects.
- Add research-backed stunts that can be disabled.
- Add broader judging categories and championships.
- Preserve evidence integrity: visual spectacle must never award invented points.

---

## 3. How to run the project

Open:

`model-grand-prix/index.html`

in a current desktop or mobile browser.

No installation, server, framework, API key, account or build process is required. Three.js is bundled locally in `vendor/three.min.js`.

For the most consistent browser behavior, the project may also be served with any static server, for example:

```bash
cd model-grand-prix
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/index.html`.

---

## 4. Technology architecture

### 4.1 Front end

- Semantic HTML in `index.html`
- Custom responsive CSS in `styles.css`
- No framework or build system
- Local browser storage for the editable graph title

### 4.2 Research and application state

- `app.js` contains companies, releases, research summaries, source links, graph rendering, timeline playback, rankings, milestones, dialogs and interaction state.
- `metrics.js` contains the Phase 1 judging categories, operational records, fixed anchors, openness rubric, championship formulas and per-metric metadata.

### 4.3 3D engine

- `race3d.js` runs the circuit, cars, forward-only race physics, camera director, overtakes, labels, lighting and stunt lifecycle.
- `stunt-framework.js` contains pooled reusable 3D stunt geometry and path-offset samplers.
- `vendor/three.min.js` is the locally bundled Three.js runtime.

### 4.4 Audio

- `audio.js` uses Web Audio API synthesis.
- No external audio assets are required.
- BGM and SFX are independently controlled and both default to off.

### 4.5 Data policy

The application is static and does not call a live model API. All scores and metadata are a dated research snapshot. Operational measurements can change after the research freeze.

---

## 5. Research scope and methodology

### 5.1 Time range

The historical graph and race cover:

- Start: 23 July 2021
- End/research snapshot: 23 July 2026

### 5.2 Company naming

The race uses company names:

- Anthropic — Claude family
- OpenAI — GPT and o-series families
- Moonshot AI — Kimi family

### 5.3 Default current flagships

At the research snapshot:

- Anthropic: Claude Fable 5
- OpenAI: GPT-5.6 Sol
- Moonshot AI: Kimi K3

### 5.4 Why no single historical benchmark is used

No unchanged benchmark fairly spans the full period:

- Anthropic and Moonshot entered after the start date.
- Older tests such as MMLU and HumanEval became saturated.
- Newer releases use GPQA, AIME, HLE, SWE-bench, Terminal-Bench, BrowseComp, OSWorld and agentic evaluations.
- Tool access, prompting, reasoning budgets and harnesses differ.
- Context length, multimodality and general intelligence are different dimensions.

Historical capability scores are therefore documented visualization indices built from release-era evidence. Current overall scores use independent Artificial Analysis anchors where available. Operational metrics remain N/A when no comparable record exists.

---

## 6. Phase 1 — judging engine — completed

### 6.1 Ten judging categories

1. Overall intelligence
2. Reasoning
3. Coding
4. Agents and tool use
5. Multimodal
6. Long context
7. Output throughput
8. Answer latency
9. Cost efficiency
10. Openness and deployability

Coding and agents were intentionally separated because agent performance depends on planning, tools, browsing, terminal access and scaffolding—not only code generation.

### 6.2 Fixed anchors

The project avoids three-model min–max normalization, which can exaggerate small differences.

- **Context:** logarithmic scale, 8K tokens = 0 and 1M tokens = 100
- **Throughput:** logarithmic scale, 20 tokens/sec = 0 and 200 tokens/sec = 100
- **Latency:** inverse logarithmic scale, 1 second = 100 and 180 seconds = 0
- **Cost:** inverse logarithmic scale, $0.10/M = 100 and $10/M = 0
- **Openness:** visible rubric covering released weights, license/commercial use, self-hosting and portability/documentation

### 6.3 Championship presets

#### Frontier Cup

- Overall: 35%
- Reasoning: 20%
- Coding: 15%
- Agents: 15%
- Multimodal: 10%
- Context: 5%

#### Developer Cup

- Coding: 30%
- Agents: 25%
- Throughput: 10%
- Latency: 10%
- Cost: 10%
- Context: 10%
- Openness: 5%

#### Research Cup

- Reasoning: 35%
- Context: 25%
- Multimodal: 20%
- Agents: 15%
- Overall: 5%

#### Value Cup

- Cost: 35%
- Throughput: 25%
- Latency: 20%
- Overall: 20%

#### Open Ecosystem Cup

- Openness: 40%
- Cost: 20%
- Context: 15%
- Overall: 15%
- Agents: 10%

Every championship currently requires all weighted metrics. If one is missing, that model’s championship result is N/A.

### 6.4 Metric audit metadata

Each metric record can store:

- Normalized score
- Raw value and unit
- Raw display label
- Source IDs
- Source type
- Configuration/reasoning effort
- Measurement or release date
- Confidence
- Methodological note

The Evidence dialog exposes these fields.

### 6.5 Tie handling

Exact ties no longer default to fixed company order. They display:

- `=P1`, `=P2`, etc.
- DEAD HEAT result announcement
- Every co-winner on the result card
- Co-winner finish effects

---

## 7. Current Skills Circuit — completed

Operational metrics have little honest historical coverage. Originally, Throughput, Latency, Cost, Developer Cup and Value Cup produced almost-empty historical races until 2026.

The following profiles now automatically use Current Skills Circuit:

- Throughput
- Latency
- Cost
- Developer Cup
- Value Cup
- Open Ecosystem Cup

Behavior:

- All three companies start immediately.
- Each company uses its best model with complete comparable evidence.
- The timeline changes to Grid, Sector 1–4 and Flag.
- The display reads `23 JUL 2026 · CURRENT`.
- Historical milestones are not fabricated.
- Race movement, overtakes, cameras and judging still operate normally.

Historical playback remains for capability categories, Openness, Frontier Cup and Research Cup.

---

## 8. Graph mode — completed

Graph mode includes:

- Editable title saved in local browser storage
- Grouped judging-category/championship selector
- Full researched model selectors by company
- Automatic category ranking
- N/A display for missing operational records
- Five-year SVG release graph
- Clickable release points
- Model Evidence dialog
- Source and Method drawers
- Current flagship reset
- Responsive layout

The chart transforms into Race mode when its background is clicked.

---

## 9. 3D race system — completed

### 9.1 Circuit and cars

- Full S-curve road
- Curbs, barriers and lane markers
- Start/finish gantry
- Trees, buildings, grandstands and light pylons
- Three open-wheel cars
- Company-colored liveries:
  - Anthropic: orange
  - OpenAI: white
  - Moonshot: purple

### 9.2 Forward-only physics

Cars use monotonic race distance. They cannot reverse because of:

- Score changes
- Camera cuts
- Stunts
- Playback speed
- Director changes

Evidence scores affect catch-up behavior and physical gaps, not backward movement.

### 9.3 Model plates

Every active car carries a persistent label showing:

- Company
- Model currently running
- Current score

Labels update at release milestones.

### 9.4 Predictive overtakes

The director evaluates:

- Physical distance
- Relative velocity
- Evidence target order
- Expected forward convergence

Overtake sequence:

1. OVERTAKE PREDICTED
2. Camera follows accelerating challenger
3. Two-car battle view when side by side
4. Pass announced only after physical crossing
5. New physical leader shown in the HUD

The side panel is explicitly labeled Evidence Order; the top leader display follows physical position.

---

## 10. Camera director — completed

### 10.1 Manual cameras

- Chase
- Cockpit
- Drone
- Trackside
- Helicopter orbit

Additional automatic shots:

- Battle
- Kerb/low
- Reverse chase/front
- Crane
- Finish line

### 10.2 Cinematic levels

- Calm — longer shots and fewer cuts
- Broadcast — balanced pacing
- Cinematic+ — faster cuts and subtle vibration

### 10.3 Adaptive hero direction

- Calm: 2 hero shots
- Broadcast: 3 hero shots
- Cinematic+: 4 hero shots

Five data phases can still update without forcing five camera cuts.

### 10.4 Priority lock

Camera priority is explicit:

1. Finish — 120
2. Physical pass — 100
3. Stunt — 60
4. Milestone — 35
5. Scheduled broadcast shot — 10

Lower-priority events cannot interrupt higher-priority sequences.

### 10.5 Speed-independent scheduling

Stunt thresholds, director locks, pass timeouts and scheduled cuts use normalized race progress. Playback speed changes wall-clock duration but not the event sequence.

---

## 11. Audio and replay system — completed

### 11.1 Controls

- BGM button / M key
- SFX button / N key
- Both default off

### 11.2 BGM

Procedural electronic racing music includes:

- Kick/snare
- Hi-hats
- Bass
- Arpeggio
- Atmospheric pad
- Tempo response to race speed

### 11.3 Engine and race sounds

- Generated combustion-pulse engine loops
- RPM-linked playback
- Stereo placement by company
- Throttle revs
- Gear-shift drops and clunks
- Exhaust pops
- Boost whooshes
- Countdown/start cues
- Finish fanfare and crowd burst

### 11.4 Horn semantics

Horns are reserved for overtake intent. A trailing model must close to within the configured pace range after an upgrade. Horns are not reused for generic upgrades, start or finish.

### 11.5 Stunt audio

Implemented cues include:

- Logic Leap launch plus suspension-compression landing impact
- Code Chicane tire squeal layered with surface scrub
- Tool-gate motor and latch mechanisms
- Memory encode/recall tones through generated convolution reverb
- Prism tones
- Swarm deploy/merge
- Endurance night cues
- Drag reaction/launch/top speed
- Fuel loading
- Open Garage/license stages

### 11.6 Instant replay

- Rolling seven-second replay buffer
- Up to 20 captured frames per second
- Car, wheel, camera, environment and stunt metadata capture
- Manual Replay button and Y shortcut
- 0.6× interpolated playback
- Live race pause, exact scene restoration and conditional resume
- Replay overlay, reason label and progress bar
- Cinematic+ automatic replay hooks for completed overtakes and hero stunts
- BGM ducking and reduced SFX replay mix
- Replay disabled for reduced-motion and compact/low-memory modes

---

## 12. Phase 2 — stunt framework — completed

### 12.1 Scheduler

Each event contains:

- Company/model
- Type/category
- Source IDs
- Priority
- Sequence
- Queue timestamp
- Expiry threshold
- Cooldown
- Unique duplicate-prevention signature

Interrupted stunts can resume from their saved percentage.

### 12.2 Forward-only spline extensions

Visual stunt paths return only:

- Height
- Lateral offset
- Pitch
- Roll
- Yaw

They never change underlying race distance.

### 12.3 Reusable primitive pools

- Ramp
- Tunnel
- Gate gauntlet
- Drift course
- Prism field
- Agent swarm
- Night pylons
- Drag gantries
- Fuel station
- Open Garage

### 12.4 Stunt status card

Displays:

- Company
- Active model
- Category
- Stunt name
- Description
- Phase
- Progress
- Difficulty score
- Raw evidence
- Source IDs
- NO BONUS POINTS

Stunts can be toggled with the STUNTS button or T key.

---

## 13. Phase 3 — four hero stunts — completed

### 13.1 Logic Leap

Category: Reasoning

Difficulty affects:

- Ramp angle
- Jump height
- Gap length
- Landing pitch

Phases: Approach, Launch, Airborne, Landing, Clean Exit.

### 13.2 Code Chicane

Category: Coding

Difficulty affects:

- Cone spacing
- Course width
- Drift amplitude
- Yaw and body roll

Phases: Chicane Entry, Patch Drift, Switchback, Tests Pass, Clean Exit.

### 13.3 Tool Gauntlet

Category: Agents and tool use

Difficulty affects:

- Gate count
- Spacing
- Drone coordination

Phases: Tool Scan, Gate One, Parallel Tools, Final Gate, Task Complete.

### 13.4 Memory Tunnel

Category: Long context

Difficulty affects:

- Six to twelve rings
- Spacing
- Helix height
- Lateral amplitude

Phases: Encode, Memory Tunnel, Long Recall, Beacon Found, Context Retained.

---

## 14. Phase 4 — advanced spectacle — completed

### 14.1 Prism Flip

- Seven track-aligned triangular frames
- Multimodal category trigger
- Active-frame highlighting
- Controlled aerial roll
- Text, vision, fusion and exit phases

Historical triggers include GPT-4o, Claude 3 Opus and Kimi K3.

### 14.2 Agent Swarm Split

- Twelve parallel swarm units
- Four local support drones
- Role separation and synchronized merge
- Restricted to documented multi-agent/subagent releases

Historical triggers include Claude Opus 4.5 and Kimi K2.5.

### 14.3 Endurance Night Stage

- Ten illuminated pylons
- Day/night/dawn world transition
- Dynamic fog and exposure
- Long-horizon agent evidence

Historical triggers include GPT-5.2 and Kimi K2.6.

### 14.4 Drag Strip

- Five timing gantries
- Reaction-light sequence
- Throughput and latency Current Skills integration
- Value Cup leader event

### 14.5 Fuel Strategy

- Token-energy pit structure
- Eight animated energy cells
- Cost and Value Cup integration
- Visual pit offset without changing race distance

### 14.6 Open Garage

- Transparent opening doors
- Rotating license/weights frame
- Requires openness score >=80 in Open Ecosystem Cup
- Promised future weights do not qualify before publication

---

## 15. Stabilization work completed

The project received multiple stabilization passes after user testing.

### Fixed issues

- Camera cuts no longer alter car physics.
- Camera rigs no longer ease in a way that creates rubber-band perception.
- Cars cannot move backward after score changes.
- Pausing freezes car movement and stunt progression.
- Stunt progress is based on car distance, not renderer time.
- Playback speed does not change which stunt/camera events appear.
- Manual camera switching does not reset stunt percentage.
- Returning to Auto restores the current stunt phase.
- Pass interruption resumes the remaining stunt path instead of restarting.
- Primitives are redistributed over the remaining path.
- Ring and cone animation preserve track alignment.
- Exact evidence ties are shown as dead heats.
- Operational races no longer begin with an empty track.

---

## 16. Accessibility and responsive behavior

Implemented:

- Keyboard controls
- Buttons with labels and pressed states
- Dialogs for details and shortcuts
- Reduced-motion CSS support
- Responsive graph and race layout
- Mobile camera-control compaction
- N/A and evidence labels rather than color-only meaning

Keyboard controls:

- Space: play/pause
- Left/Right: timeline movement
- 1–4: Overall/Reasoning/Coding/Agents
- C: cycle cameras
- V: toggle automatic director
- F: cycle followed company
- [ / ]: race speed
- M: BGM
- N: SFX
- T: stunts
- R: replay race
- G: return to graph
- Escape: close dialogs/panels

---

## 17. Validation already performed

The build has been checked with:

- JavaScript syntax validation for all project scripts
- HTML parsing
- ZIP integrity checks
- Headless Chromium/WebGL runtime tests
- Graph and Race mode smoke tests
- Camera selector tests
- Model-label tests
- Audio default/off and independent-toggle tests
- Horn semantic tests
- Monotonic car-position tests
- Camera-cut position-drift tests
- Predictive overtake tests
- Phase 1 category/championship tests
- Current Skills three-entrant tests
- Core stunt primitive tests
- Advanced primitive isolated tests
- Drag Strip Current Skills scheduling test
- Manual replay pause/overlay/interpolation/restore/resume test
- Replay audio-mode and mix-state test
- Landing, drift, gate and tunnel audio runtime test

All six Phase 4 advanced primitives constructed and activated successfully in isolated WebGL tests.

---

## 18. Known limitations and work still remaining

### Phase 5 — audio and replay — completed

Completed:

- Rolling replay state capture
- 0.6× replay playback and overlay
- Manual replay and Cinematic+ automatic replay hooks
- Live pause/restore/resume integration
- Stunt environment reconstruction during replay
- Suspension-compression landing sound
- Layered tire and surface drift sound
- Mechanical tool-gate movement
- Memory Tunnel convolution reverb
- Replay/stunt/finish BGM ducking
- Reduced-motion and low-power replay disablement

### Phase 6 — final validation — incomplete

Required:

1. Formal test matrix across all 15 judging modes
2. Full race test at every speed and cinematic level
3. Mobile Safari and Android Chrome testing
4. Desktop Safari/Firefox testing
5. Reduced-motion stunt substitutions, not only shortened animations
6. Simplified low-power stunt geometry
7. Performance profiling and memory-leak checks
8. Camera obstruction audit—trees/buildings can still occasionally obstruct a shot
9. Screen-reader flow and focus-order audit
10. Color-contrast audit
11. Final source audit for every metric and stunt trigger
12. Determinism test across complete races
13. Validate replay buffer memory usage and automatic replay behavior across supported browsers

### Data limitations

- Operational metrics are a dated snapshot and may change.
- Historical throughput, latency and price are intentionally sparse.
- Vendor-reported benchmark configurations differ.
- Safety is not reduced to a single cross-vendor winner score.
- Parameter count and adoption are informational, not capability points.
- Context size does not guarantee retention quality.

---

## 19. Recommended next implementation order

1. Create reduced-motion stunt alternatives.
2. Add a fully simplified low-power geometry mode.
3. Run the full Phase 6 device/category/speed/replay test matrix.
4. Profile replay-buffer memory and long-session cleanup.
5. Perform screen-reader, focus-order and contrast audits.
6. Audit camera obstruction and visual clipping.
7. Perform final evidence/source audit.
8. Freeze a production release archive.

---

## 20. Project file inventory

- `index.html` — application structure
- `styles.css` — complete visual and responsive design
- `app.js` — research data, state, graph, timeline and UI
- `metrics.js` — Phase 1 metrics, anchors and championships
- `race3d.js` — 3D race, director, overtakes and stunt orchestration
- `stunt-framework.js` — reusable stunt geometry and path samplers
- `audio.js` — procedural BGM and SFX
- `vendor/three.min.js` — local Three.js runtime
- `README.md` — usage and feature summary
- `research-notes.md` — research methodology and sources
- `stunts-and-judging-plan.md` — master implementation plan/status
- `phase1-completion.md` — Phase 1 report
- `phase2-completion.md` — Phase 2 report
- `phase3-completion.md` — Phase 3 report
- `phase4-completion.md` — Phase 4 report
- `phase5-completion.md` — Phase 5 audio/replay report
- `stunt-stabilization-report.md` — timing/path diagnosis and fixes
- `current-skills-circuit-report.md` — operational-race solution
- `FULL-PROJECT-DOCUMENTATION.md` — this document

---

## 21. Version archives created during development

- Pre-stunts backup
- Pre-Phase-1 backup
- Phase-1 complete
- Pre-Phase-2 backup
- Phase-2 complete
- Pre-Phase-3 backup
- Phase-3 complete
- Pre-stunt-stabilization backup
- Stunt-stabilized build
- Pre-Current-Skills fix backup
- Current-Skills fixed build
- Pre-Phase-4 backup
- Phase-4 complete
- Pre-Phase-5 backup
- Phase-5 complete

The final complete archive includes the current project and all available version archives.

---

## 22. Final status statement

The project is a functional, research-backed Graph + 3D Race application with Phases 1–5 complete. It has a mature judging engine, current operational circuits, predictive overtakes, cinematic direction, optional synthesized audio, instant replay and ten evidence-driven stunt/spectacle types.

It is not yet a final production release because comprehensive Phase 6 validation, device coverage and accessibility/performance audits remain. The current build should be treated as the **Phase 5 complete development release**.
