# Model Grand Prix — Stunts & Expanded Judging Plan

**Research freeze:** 23 July 2026 (Africa/Lagos)  
**Status:** Phases 1–5 completed; final Phase 6 validation/device/accessibility work remains  
**Scope:** Anthropic, OpenAI and Moonshot AI; historical race from 23 July 2021 to 23 July 2026; current-model skill events use the latest general flagships.

---

## 1. Executive decision

The next version should add spectacle without turning evidence into an arcade bonus system.

### Recommended rule

**Stunts visualize documented capabilities; they do not create capability points.**

A model gets a stunt only when a release has evidence for the represented capability. The category score controls the difficulty, speed, line, or execution of the stunt. It does not grant invented points or reverse the sourced ranking.

This distinction protects the project from three problems:

1. A visually dramatic stunt must not be mistaken for stronger intelligence.
2. A company must not receive a stunt for a capability it had only announced but not released.
3. A category with sparse historical evidence must not be filled with made-up precision.

---

## 2. What the current data says

For the current overall flagships, the independent Artificial Analysis snapshot is close:

| Company | Current flagship used | Intelligence Index | Approx. output speed at max configuration | Approx. TTFA/TTFT at max configuration | Blended price | Context |
|---|---|---:|---:|---:|---:|---:|
| Anthropic | Claude Fable 5 with fallback | 60 | ~72 tok/s | ~125 s | $7.70/M | 1M |
| OpenAI | GPT-5.6 Sol max | 59 | ~63 tok/s | ~151 s | $4.35/M | 1M |
| Moonshot AI | Kimi K3 | 57 | ~34–35 tok/s | ~4.5–5.5 s | $2.31/M | ~1.05M |

Important caveats:

- Speed and latency vary over time, by provider and by effort level.
- For extended-reasoning models, “time to first answer token” includes substantial reasoning time and is not equivalent to ordinary chat latency.
- Price above uses Artificial Analysis’s 7:2:1 cache-hit/input/output blend.
- Capability uses max-effort variants, but a speed event should not silently compare one model at max effort with another at a lighter effort.
- Kimi K3 weights were promised for 27 July 2026. On the 23 July research freeze, that future promise does **not** count as an open-weight release. Kimi K2/K2.5/K2.6 do count where their weights are already public.

Primary operational sources:

- Artificial Analysis current model comparison: https://artificialanalysis.ai/models/
- Claude Fable 5: https://artificialanalysis.ai/models/claude-fable-5
- GPT-5.6 Sol: https://artificialanalysis.ai/models/gpt-5-6-sol
- Kimi K3: https://artificialanalysis.ai/models/kimi-k3
- Kimi K3 vs GPT-5.6 Sol: https://artificialanalysis.ai/models/comparisons/kimi-k3-vs-gpt-5-6-sol
- Kimi K3 vs Claude Fable 5: https://artificialanalysis.ai/models/comparisons/kimi-k3-vs-claude-fable-5

---

## 3. New judging architecture

The existing four lenses are useful but too compressed. “Code + agents” should be split, and operational categories should be separated from capability categories.

### Tier A — strong enough to score now

These categories have usable public evidence and clear visual metaphors.

| Category | What it means | Primary evidence | Race representation |
|---|---|---|---|
| Overall intelligence | Broad frontier capability | Independent composite index + contemporary release evidence | Normal race pace |
| Reasoning | Math, science and difficult multi-step reasoning | AIME, GPQA, HLE, MATH and related tests | Logic Leap ramp |
| Coding | Repository-level software engineering | SWE-bench Pro/Verified, LiveCodeBench, Terminal-Bench | Code Chicane / precision drift |
| Agents & tool use | Planning, tools, browsing, terminal/computer use | Agentic Index, GAIA, BrowseComp, Terminal-Bench, OSWorld, τ-bench | Tool Gauntlet |
| Multimodal | Vision, charts, documents and video where available | MMMU/MMMU-Pro, MathVista, product modality evidence | Prism Flip / night-vision stage |
| Long context | Context capacity plus demonstrated retention | Context window, RULER/long-context evidence, document tasks | Memory Tunnel |
| Output throughput | Tokens generated after response begins | Independently measured tokens/sec | Drag strip |
| Response latency | Time to first answer token under a named effort level | Independent TTFA/TTFT | Launch reaction gate |
| Cost efficiency | Capability delivered per dollar/token | API price + task cost where available | Fuel-economy pit challenge |
| Openness/deployability | Public weights, license and self-hostability | Released weights and license—not promises | Open Garage shortcut |

### Tier B — score only when the historical data pass is complete

| Category | Why it is useful | Why it needs care |
|---|---|---|
| Factuality / grounding | Important for research and real work | SimpleQA, FACTS and browsing harnesses differ; web access can dominate |
| Instruction following | Measures constraint adherence | IFEval is useful but does not cover all practical instruction quality |
| Multilingual | Important beyond English-centric tests | Locale coverage is uneven and many old releases lack comparable results |
| Knowledge work | Finance, legal, spreadsheets, presentations | Vendor and partner tests are often domain-specific and not directly comparable |
| Reliability / consistency | Whether repeated runs succeed | Requires pass^k or repeated-run data under the same harness |

### Tier C — show as information, not a winner-producing score

| Category | Decision |
|---|---|
| Safety | Show system-card badges and safeguards, but do not create one cross-vendor “safety score.” Definitions, threat models and access restrictions differ too much. |
| Popularity / adoption | Keep outside model capability. User count is a product/distribution metric, not model quality. |
| Parameter count | Display as technical information only. Larger is not automatically better. |
| Energy efficiency | Do not score until audited, comparable inference-energy data exists. |
| Benchmark marketing claims | Label vendor-reported and independent results separately. |

Benchmark cautions:

- Original MMLU and HumanEval are saturated for frontier models.
- SWE-bench and agent benchmarks depend strongly on scaffolding, prompts, tools and time limits.
- Human preference measures what users like, not necessarily what is correct.
- Safety evaluations from different vendors cannot be collapsed honestly into a single number.

Methodology references:

- Artificial Analysis Coding Agent methodology: https://artificialanalysis.ai/methodology/coding-agents-benchmarking
- Benchmark field guide: https://www.tonic.ai/ai-model-benchmarks
- Agent-evaluation survey: https://arxiv.org/html/2507.21504v1
- Real-world benchmark limitations: https://arxiv.org/html/2505.08253v1

---

## 4. Proposed championship presets

A user should be able to select one category or a preset championship. Custom weighting comes later.

### 4.1 Frontier Cup

- Overall intelligence: 35%
- Reasoning: 20%
- Coding: 15%
- Agents: 15%
- Multimodal: 10%
- Context: 5%

Purpose: best broad flagship.

### 4.2 Developer Cup

- Coding: 30%
- Agents/tool use: 25%
- Instruction following: 10%
- Output throughput: 10%
- Latency: 10%
- Cost efficiency: 10%
- Context: 5%

Purpose: best practical model for building and operating software agents.

### 4.3 Research Cup

- Reasoning: 30%
- Factuality/grounding: 20%
- Long context: 20%
- Multimodal: 15%
- Agents/search: 15%

Purpose: research, synthesis and difficult scientific work.

### 4.4 Value Cup

- Cost efficiency: 35%
- Output throughput: 25%
- Response latency: 20%
- Overall intelligence: 20%

Purpose: useful work per dollar and unit of time.

### 4.5 Open Ecosystem Cup

- Released open weights and license: 40%
- Self-hosting/deployability: 20%
- Cost efficiency: 15%
- Overall capability: 15%
- Context: 10%

Purpose: models a user can actually download, adapt and operate.

This preset must use a dated snapshot. A promised future weight release earns no points until the files and license are public.

---

## 5. Scoring rules

### 5.1 Do not use three-model min–max normalization

With only three companies, min–max scoring exaggerates tiny differences. A one-point lead can look like a 100-to-0 gap.

Use fixed, public anchors instead:

- Overall capability: current leader = 100, other scores proportional to the independent index.
- Throughput: logarithmic scale with fixed anchors such as 20, 50, 100 and 200 tok/s.
- Latency: inverse logarithmic scale with named effort configuration.
- Cost: inverse logarithmic price or task-cost scale.
- Context: logarithmic scale from 8K through 1M+ tokens.
- Openness: ordinal rubric with visible components—weights, license, commercial use, self-hosting—not a hidden subjective score.

### 5.2 Every value carries metadata

Each score record should include:

- Source type: independent, vendor-reported, technical report or editorial mapping
- Benchmark/harness
- Model configuration and reasoning effort
- Date measured
- Confidence: high, medium or low
- Whether tools, browsing or multi-agent scaffolding were enabled

### 5.3 Two kinds of competition

Do not force operational metrics into the five-year historical line when historical measurements do not exist.

1. **History Race:** capability profiles and release milestones over five years.
2. **Current Skills Circuit:** latest models compete in throughput, latency, price, context, openness and current benchmark events.

---

## 6. Research-backed stunt system

### Core rule

A stunt is a visual test corresponding to a documented capability. Its execution style reflects the category score. The stunt never creates points by itself.

### 6.1 Logic Leap — reasoning

**Visual:** a ramp jump over a segmented “reasoning chasm.” Harder reasoning releases receive a longer gap and cleaner landing line.

**Triggers:** a major reasoning-score improvement, not every version number.

Evidence-backed examples:

- OpenAI o1: large AIME, Codeforces and GPQA gains over GPT-4o.
- Moonshot Kimi K1.5: reported o1-level long-CoT results across AIME, MATH, Codeforces and multimodal reasoning.
- Claude 3.7: hybrid reasoning milestone.
- Claude Fable 5: stronger long-horizon reasoning and scientific work.

Sources:

- https://openai.com/index/learning-to-reason-with-llms/
- https://github.com/MoonshotAI/kimi-k1.5
- https://www.anthropic.com/news/claude-3-7-sonnet
- https://www.anthropic.com/news/claude-fable-5-mythos-5

### 6.2 Code Chicane — software engineering

**Visual:** barriers reconfigure like a codebase. Cars execute a controlled drift through the correct patch path. Wrong or lower-confidence data does not cause a crash; it produces a wider, slower line.

**Evidence:** SWE-bench, LiveCodeBench, Terminal-Bench and agentic coding results.

Examples:

- Claude 3.5 Sonnet and Opus 4 coding jumps.
- OpenAI GPT-4.1, o3 and GPT-5.6 coding-agent gains.
- Kimi K2/K2.6/K3 coding and long-horizon engineering.

### 6.3 Tool Gauntlet — agents and tool use

**Visual:** moving gates require search, terminal, Python, files and visual tools. The car deploys mechanical arms or a pit drone to open the correct gate.

Evidence-backed examples:

- OpenAI o3 can combine every ChatGPT tool inside its reasoning process.
- Claude 4 alternates extended thinking with tool use and supports sustained agent workflows.
- Kimi K2 Thinking/K2.6/K3 support long tool-call chains and long-horizon work.

Sources:

- https://openai.com/index/introducing-o3-and-o4-mini/
- https://www.anthropic.com/news/claude-4
- https://platform.moonshot.ai/

### 6.4 Memory Tunnel — long context

**Visual:** a tunnel containing numbered memory beacons. The car must emerge with the opening beacon still illuminated. Tunnel length is logarithmic, not linear, so 1M context does not make the environment unusably long.

Evidence-backed milestones:

- Kimi’s 200K-character launch and 2M-character beta.
- GPT-4 Turbo 128K and GPT-4.1/5.6 1M-class context.
- Claude 2.1 200K and current 1M-class flagships.
- Kimi K3 1M context.

### 6.5 Prism Flip — multimodal

**Visual:** a banked half-loop through text, image, chart and video holograms. The car changes lighting mode as the modality changes.

Evidence-backed examples:

- GPT-4o’s text/audio/vision direction and stronger audio/vision performance.
- Kimi K1.5 multimodal reasoning, K2.5 native multimodality and K3 native vision.
- Claude 3 vision and later Fable vision/knowledge-work improvements.

Sources:

- https://openai.com/index/hello-gpt-4o/
- https://github.com/MoonshotAI/kimi-k1.5
- https://github.com/MoonshotAI/Kimi-K2.5
- https://www.anthropic.com/news/claude-3-family

### 6.6 Agent Swarm Split — documented multi-agent capability

**Visual:** the main car briefly launches coordinated mini-drones or ghost cars that solve parallel gates, then rejoin.

Use only when a documented product/model system uses subagents or multi-agent workflows. It must not imply that every base-model request is multi-agent.

Candidates:

- Kimi K2.5/K2.6 Agent Swarm.
- Claude Opus 4.5/Fable multi-agent workflows.
- GPT-5.6 ultra/subagent mode where the selected configuration explicitly enables it.

### 6.7 Drag Strip — output throughput

**Visual:** a straight measured section. After a reaction gate, sustained top speed is driven by independently measured output tokens per second.

This belongs in the **Current Skills Circuit**, not the historical race.

Separate:

- Reaction time = TTFA/TTFT under a named effort configuration.
- Top speed = output tokens per second after generation begins.

Do not combine them into one unlabeled “speed” number.

### 6.8 Fuel Strategy — cost efficiency

**Visual:** tokens are fuel. The car with lower measured task cost can run a shorter fuel stop or carry a smaller tank.

Rules:

- Use published API price and, where possible, measured tokens per task.
- Do not let cheap price increase capability pace in the Frontier Cup.
- Show both price per token and estimated task cost.

### 6.9 Open Garage — openness

**Visual:** a transparent garage/shortcut opens only when downloadable weights and a license are publicly available.

Rules:

- Public API access is not open weights.
- An announcement of future weights is not a release.
- License restrictions are displayed visibly.

Historical example: Kimi K2/K2.5/K2.6 qualify; Kimi K3 does not qualify on the 23 July snapshot if its promised 27 July weights are not yet public.

### 6.10 Endurance Night Stage — sustained autonomous work

**Visual:** time-lapse from daylight into night while the car continues without a pit intervention.

Evidence-backed examples:

- Claude Opus 4 sustained multi-hour agent work.
- Kimi K2.6 long-horizon execution and thousands of tool steps.
- Kimi K3 long engineering sessions.
- GPT-5.6 long-horizon professional and coding workflows.

---

## 7. Stunt choreography and camera rules

The stunt system should integrate with the director rather than fight it.

### Event sequence

1. **Data pre-roll — 1.0 s:** category, source and model appear.
2. **Setup shot — 1.5 s:** director frames the obstacle and car.
3. **Execution — 2–3 s:** forward-only stunt; no teleporting or reverse pull.
4. **Landing/result — 1.0 s:** score and benchmark note.
5. **Optional replay — Showcase mode only:** one slow-motion angle, max 2 s.
6. **Return to live race:** preserve physical position and evidence order.

### Priority order

1. Physical overtake already in progress
2. Finish sequence
3. Hero stunt
4. Major release upgrade
5. Scheduled cinematic cut

A stunt never interrupts a side-by-side pass.

### Frequency control

The existing 31-second race is too short for every stunt.

Add three presentation modes:

- **Data Race:** 31 seconds; subtle stunt cues only.
- **Showcase Race:** 75–90 seconds; hero stunts and one replay per major era.
- **Current Skills Circuit:** event-based latest-model competition; no five-year timeline constraint.

Recommended default remains Data Race. Showcase is opt-in.

---

## 8. UI plan

### Graph mode

- Replace the four fixed lenses with a categorized selector:
  - Capability
  - Practical performance
  - Economics/deployment
- Keep current flagships as default.
- Add a “Current Skills” tab beside “Five-year history.”
- Show benchmark source, configuration, date and confidence on hover.

### Race mode

- Add **Championship** selector: Frontier, Developer, Research, Value, Open Ecosystem.
- Add **Event Mode** selector: Data Race, Showcase, Current Skills.
- Add a small category ribbon during each stunt.
- Keep model plates above all cars.
- Label the side panel **Evidence Order** and the top position **Physical Leader**.

### Post-race result

- Overall podium
- Category medals
- “Why this result?” expandable audit
- Source links
- Confidence and configuration notes
- No false single winner when categories disagree

---

## 9. Implementation phases

### Phase 1 — data model and judging engine — **COMPLETED 24 JUL 2026**

- ✅ Split coding from agents.
- ✅ Added multimodal, throughput, latency, cost and openness records.
- ✅ Added source/configuration/date/confidence/raw-value metadata per metric.
- ✅ Implemented fixed-anchor normalization with honest N/A handling.
- ✅ Added Frontier, Developer, Research, Value and Open Ecosystem championship presets.

### Phase 2 — stunt framework — **COMPLETED 24 JUL 2026**

- ✅ Priority/expiry/cooldown stunt event scheduler
- ✅ Forward-only spline-extension sampler that never changes race distance
- ✅ Explicit director priority lock: finish > physical pass > stunt > milestone > scheduled shot
- ✅ Auditable stunt data card with company, model, category, description and source IDs
- ✅ Reusable ramp, tunnel, gate and drift primitive pools positioned along the live track spline

### Phase 3 — first four hero stunts — **COMPLETED 24 JUL 2026**

1. ✅ Logic Leap — difficulty-scaled ramp, launch/airborne/landing choreography
2. ✅ Code Chicane — difficulty-scaled cone course, two-stage drift and test-pass exit
3. ✅ Tool Gauntlet — sequential scanning gates, tool drones and gate-opening choreography
4. ✅ Memory Tunnel — difficulty-scaled ring count, sequential recall beacon and retained-context exit

All four use category scores from the Phase 1 engine, multi-phase director shots, live phase/progress cards and category-specific audio cues.

**Phase 3 stabilization completed:** progress is distance-locked, pause-safe, aligned to primitive start/end distance, resumable after passes, and uses adaptive 2–4 shot direction.

### Phase 4 — advanced spectacle — **COMPLETED 24 JUL 2026**

- ✅ Prism Flip — multimodal prism field and controlled roll
- ✅ Agent Swarm Split — parallel support units and synchronized merge
- ✅ Endurance Night Stage — day/night/dawn world transition and illuminated course
- ✅ Drag Strip — measured throughput/latency Current Skills event
- ✅ Fuel Strategy — measured cost-efficiency token-energy pit event
- ✅ Open Garage — released-weights/license gate with Open Cup qualification

### Phase 5 — audio and replay — **COMPLETED 24 JUL 2026**

- ✅ Category-specific audio cues
- ✅ Jump/landing suspension-compression sound
- ✅ Drift tire and surface sound
- ✅ Tool-gate mechanical motor/latch sound
- ✅ Memory-tunnel convolution reverb
- ✅ Rolling replay camera/state buffer and 0.6× slow motion
- ✅ Manual Replay button/Y shortcut and Cinematic+ automatic replay hooks
- ✅ Live-state restoration, pause/resume integration and replay audio ducking

### Phase 6 — validation

- No car moves backward.
- Camera cuts never alter physics.
- Stunts never change sourced points.
- Overtakes remain higher priority than stunts.
- Reduced-motion mode substitutes simpler camera and effects.
- Low-power devices use simplified geometry and no replay.
- Every stunt has a visible source and capability trigger.

---

## 10. Recommended first build after approval

Build in this order:

1. Expanded categories and championship selector
2. Current Skills Circuit with throughput, latency, cost and context
3. Logic Leap and Memory Tunnel
4. Code Chicane and Tool Gauntlet
5. Showcase mode and replay
6. Advanced stunts

This order proves the judging system before investing in spectacle.

---

## 11. Approval decisions

Recommended defaults are in bold.

1. **Stunts are visual evidence events and never add points** — alternative: arcade bonus scoring.
2. **Add all Tier A categories** — alternative: start only with Agents, Multimodal and Cost.
3. **Keep the 31-second Data Race and add a separate 75–90 second Showcase mode** — alternative: lengthen the only race.
4. **Do not rank safety until a defensible cross-vendor methodology exists** — alternative: display vendor-specific safety cards only, which is already included in the recommendation.
5. **Build judging/data first, then four core stunts** — alternative: build visual stunts first.
