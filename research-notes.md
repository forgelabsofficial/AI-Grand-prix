# Model Grand Prix — research and product brief

**Research snapshot:** 23 July 2026 (Africa/Lagos)  
**Scope:** public model releases and capability evidence from 23 July 2021 through 23 July 2026  
**Companies:** Anthropic (Claude), OpenAI, Moonshot AI (Kimi)

## 1. Product interpretation

The requested experience is best treated as two connected views of the same evidence:

1. **Graph / inspection mode** — compare the companies' current flagship models by default, while allowing any researched model from the five-year period to be selected. Selecting a model recalculates its evidence-backed score and rank.
2. **Race / playback mode** — replay the five-year timeline. Each company is represented by a car. A car remains in the garage until that company has a public model in the researched period. Once active, every car follows forward-only race physics tied to the season clock. Evidence scores affect forward catch-up speed and the timing order, but can never pull a car backward or stop it. Camera cuts are rigid viewpoint changes and do not touch race positions. This is a capability race, not literal API throughput.

The graph itself is the transition surface: clicking its background transforms the experience into the race. Controls also provide explicit Graph and Race buttons for accessibility.

## 2. Naming decision

The race uses company names, not product names:

- **Anthropic**, whose model family is Claude
- **OpenAI**, whose model families include GPT and the o-series
- **Moonshot AI**, whose model/product family is Kimi

“Claude” is therefore not displayed as the company name.

## 3. Current flagship snapshot

For the default graph, “latest” means **current general flagship**, not simply the most recently dated SKU or a small/specialized variant.

| Company | Default current flagship | Release | Independent overall evidence |
|---|---|---:|---:|
| Anthropic | Claude Fable 5 | 9 Jun 2026; redeployed 1 Jul | Artificial Analysis Intelligence Index ≈ 60 |
| OpenAI | GPT-5.6 Sol | 9 Jul 2026 | Artificial Analysis Intelligence Index ≈ 59 |
| Moonshot AI | Kimi K3 | 16 Jul 2026 | Artificial Analysis Intelligence Index ≈ 57 |

The current ordering is therefore a close race, not a landslide. Kimi K3 is particularly notable because independent testing places it near the proprietary frontier; Moonshot stated that full weights were planned for 27 July 2026, which was still in the future on the research snapshot date.

Primary current comparison: https://artificialanalysis.ai/models/

## 4. Why one raw benchmark cannot power a five-year race

There is no single unchanged benchmark that fairly covers all three companies from 2021 to 2026:

- Moonshot AI did not exist until 2023.
- Claude was not publicly launched until 2023.
- Benchmarks changed as older tests saturated: MMLU/HumanEval were gradually supplemented by GPQA, AIME, SWE-bench, Terminal-Bench, Humanity’s Last Exam, BrowseComp and agentic evaluations.
- Vendor test harnesses, prompting, tool access and token budgets differ.
- Context-window size and multimodality are capabilities, but they are not directly interchangeable with reasoning accuracy.

A single vendor-reported number would create false precision. The implementation therefore distinguishes:

- **Raw independent score** — shown where Artificial Analysis has a current, directly comparable result.
- **Frontier Pace (0–100)** — a transparent visualization index used for longitudinal animation.

## 5. Frontier Pace methodology

Frontier Pace is a display index, not a scientific claim of absolute intelligence.

### Overall profile

- Current flagships are anchored to the independent Artificial Analysis snapshot and normalized to the current leader: Fable 5 = 100, GPT-5.6 Sol ≈ 98, Kimi K3 ≈ 95.
- Historical releases are mapped from contemporary evidence: common benchmark results where available, the release’s position relative to peers, and demonstrated capability changes such as reasoning, tool use and multimodality.
- Scores are monotonic only when evidence supports a genuine general upgrade. Specialized models may score below a company’s earlier general flagship.

### Specialization profiles

The race can switch among four evidence lenses:

1. **Overall** — broad capability and independent composite evidence
2. **Reasoning** — math, science and difficult reasoning evidence (AIME, GPQA, MATH, HLE and successors)
3. **Coding & agents** — HumanEval, SWE-bench, Terminal-Bench, tool use and long-horizon coding evidence
4. **Long context** — usable context scale and demonstrated long-context/product capability

Switching profiles can change the leader. This is intentional: there is no universally best model for every task.

### Confidence labels

- **High:** independent current composite or multiple directly comparable results
- **Medium:** strong official/contemporary benchmark evidence, but mixed harnesses
- **Low:** early product milestone with limited comparable public evaluation

The app exposes this caveat in the Method drawer and on model details.

## 6. Researched release spine

The UI includes the following main milestones. Minor snapshots and non-general models are intentionally omitted unless they materially changed a specialization.

### OpenAI

- 18 Nov 2021 — GPT-3 API broadly available
- 27 Jan 2022 — InstructGPT becomes the API default; human-feedback instruction following
- 30 Nov 2022 — ChatGPT / GPT-3.5 public research preview
- 14 Mar 2023 — GPT-4
- 6 Nov 2023 — GPT-4 Turbo, 128K context
- 13 May 2024 — GPT-4o, native multimodal direction
- 12 Sep 2024 — o1-preview, test-time reasoning
- 17 Dec 2024 — o1
- 27 Feb 2025 — GPT-4.5 research preview
- 14 Apr 2025 — GPT-4.1, strong coding/instruction following and 1M context
- 16 Apr 2025 — o3
- 7 Aug 2025 — GPT-5
- 11 Dec 2025 — GPT-5.2
- 5 Mar 2026 — GPT-5.4
- 23 Apr 2026 — GPT-5.5
- 9 Jul 2026 — GPT-5.6 Sol

### Anthropic

- Mar 2023 — Claude 1 public launch period
- 11 Jul 2023 — Claude 2
- 21 Nov 2023 — Claude 2.1, 200K context
- 4 Mar 2024 — Claude 3 Opus
- 20 Jun 2024 — Claude 3.5 Sonnet
- 22 Oct 2024 — upgraded Claude 3.5 Sonnet; SWE-bench Verified improvement from 33.4% to 49.0% in Anthropic’s report
- 24 Feb 2025 — Claude 3.7 Sonnet, hybrid reasoning
- 22 May 2025 — Claude Opus 4 / Sonnet 4; Anthropic reported 72.5% SWE-bench for Opus 4
- 5 Aug 2025 — Claude Opus 4.1; Anthropic reported 74.5% SWE-bench Verified
- 29 Sep 2025 — Claude Sonnet 4.5
- 24 Nov 2025 — Claude Opus 4.5
- 28 May 2026 — Claude Opus 4.8
- 9 Jun 2026 — Claude Fable 5 (availability was interrupted and then restored)
- 30 Jun 2026 — Claude Sonnet 5, newer but positioned below Fable 5 as a general flagship

### Moonshot AI

- Mar/Apr 2023 — company founded; no car on track before this point
- 9 Oct 2023 — Kimi announced with support for about 200,000 Chinese characters / 128K-token class context
- 16 Nov 2023 — Kimi opened to the public
- 18 Mar 2024 — Kimi 2M-character context beta
- 11 Oct 2024 — Kimi Explore Edition with autonomous search
- 20 Jan 2025 — Kimi K1.5; Moonshot reported reasoning performance comparable to OpenAI o1 on several math/coding evaluations
- Apr 2025 — Kimi-VL, open vision-language MoE
- 11 Jul 2025 — Kimi K2, 1T-total/32B-active MoE, open weights
- 9 Sep 2025 — K2-Instruct-0905, 256K context and coding upgrade
- 6 Nov 2025 — Kimi K2 Thinking; interleaved reasoning/tool use
- 27 Jan 2026 — Kimi K2.5, native multimodality and Agent Swarm
- 20 Apr 2026 — Kimi K2.6, stronger agentic/coding performance
- 12 Jun 2026 — Kimi K2.7 Code, specialized coding release
- 16 Jul 2026 — Kimi K3, 2.8T parameters, 1M context, independent Intelligence Index ≈ 57

## 7. Phase 1 judging engine

- Coding and agents/tool use are separate historical categories.
- Capability categories: overall, reasoning, coding, agents, multimodal and long context.
- Operational/economic categories: output throughput, answer latency, cost efficiency and openness/deployability.
- Championship presets: Frontier Cup, Developer Cup, Research Cup, Value Cup and Open Ecosystem Cup.
- Context uses a fixed logarithmic 8K→1M-token anchor; throughput uses 20→200 tok/s; latency uses an inverse 1→180-second anchor; cost uses an inverse $0.10→$10/M anchor.
- Openness is a visible weights/license/self-hosting/portability rubric. A promised future weight release does not score before publication.
- Each metric stores source IDs, source type, configuration, measurement/release date, confidence, raw value and normalized score.
- Missing operational evidence is represented as N/A and disqualifies a model from a championship that requires it; it is never converted to zero or guessed.
- Throughput, latency, cost, Developer Cup, Value Cup and Open Ecosystem Cup automatically use a Current Skills Circuit where every company starts with its best comparable measured model. This avoids an empty historical track without fabricating historical operations data.

## 8. Phase 2 stunt framework

- Stunts use a priority/expiry/cooldown scheduler with duplicate prevention and an eight-event queue cap.
- Path extensions return only height, lateral, pitch, roll and yaw offsets; they never modify the monotonic race-distance value.
- Reusable spline-positioned primitives include launch/landing ramps, a twelve-ring tunnel, transparent tool gates and an alternating-cone drift course.
- Director priority is explicit: finish (120), physical pass (100), stunt (60), milestone (35), scheduled shot (10).
- A lower-priority camera event cannot replace an active higher-priority lock.
- Every stunt card carries company, active model, category, description, source IDs and a visible no-bonus-points disclosure.
- Physical overtakes interrupt stunts. A stunt interrupted before 65% completion is requeued with a new expiration window.

## 9. Phase 3 hero stunts

- Logic Leap uses the reasoning score to scale ramp angle, jump height, gap length and landing pitch.
- Code Chicane uses the coding score to scale cone spacing, drift width, yaw and roll.
- Tool Gauntlet uses the agents/tool-use score to scale active gates, gate spacing and coordinated drone behavior.
- Memory Tunnel uses the fixed-anchor context score to scale six-to-twelve tunnel rings, spacing and helix amplitude.
- Each hero has five named phases, matching director shots, progress reporting and category-specific audio cues.
- Raw evidence and normalized category difficulty are visible on the stunt card.
- Hero execution remains visual-only and cannot modify sourced points or race distance.
- Stunt progress is derived from forward car distance, not renderer time; pause freezes the stunt and camera switching cannot reset it.
- Pass interruptions preserve percentage and resume only the remaining path. Calm/Broadcast/Cinematic+ use 2/3/4 hero camera shots respectively.
- Stunt scheduling, director locks and pass timeouts use normalized race progress, so playback speed changes duration—not which events appear.
- Exact score ties are shown as dead heats and co-winners rather than resolved by company array order.

## 10. Phase 4 advanced spectacle

- Prism Flip maps multimodal evidence to seven modality frames, a controlled roll and a fusion exit.
- Agent Swarm Split is limited to releases/configurations with documented subagent or multi-agent behavior.
- Endurance Night Stage maps long-horizon agent evidence to a day/night/dawn autonomous run.
- Drag Strip is restricted to Current Skills Throughput/Latency using measured operational records.
- Fuel Strategy is restricted to Current Skills Cost/Value events using measured blended price.
- Open Garage requires an openness score of at least 80; hosted access or promised future weights do not qualify.
- Current Skills spectacle thresholds use normalized race progress, preserving the same event sequence at every playback speed.

## 11. Phase 5 audio and replay

- A rolling seven-second replay buffer captures cars, camera, world lighting/fog/exposure and reconstructable stunt metadata.
- Manual Replay/Y plays the recent action at 0.6×, pauses live progression, restores exact live state and resumes only if the race was previously running.
- Cinematic+ can automatically replay completed overtakes and completed hero stunts when the stunt queue is empty.
- Reduced-motion and compact/low-memory modes disable replay.
- Landing audio combines suspension thud, mechanical clunk, rebound and exhaust impact.
- Drifts layer tire squeal with surface scrub; gate phases use motor/latch mechanisms; Memory Tunnel tones use generated convolution reverb.
- BGM ducks during stunts, finish announcements and replay; BGM/SFX remain optional and default off.

## 12. Interaction decisions

- The title is editable and saved locally.
- Current flagships are preselected; all researched models remain selectable.
- Rank is recalculated from research data, rather than manually invented by the user.
- Clicking a graph point inspects that release; clicking the graph background launches the race.
- Race controls: play/pause, scrub, four playback speeds, evidence profile, replay, keyboard shortcuts and clickable racers.
- Three cinematic levels tune the automatic director: Calm uses long shots and event graphics only; Broadcast balances information and spectacle; Cinematic+ uses shorter dramatic cuts and subtle camera vibration.
- A predictive WebGL broadcast director compares desired evidence order with physical track order, forward velocity and target distance. When a higher-ranked car is physically behind but certain to pass, it cuts to that car during acceleration, moves to a two-car battle shot when the gap closes, and announces the new position only after the car physically crosses ahead.
- Every active car carries a persistent, vertically staggered model plate showing company, currently running model and pace score; the plate updates at the exact release milestone.
- Research-backed stunts are visual-only and enabled by default. A status card names the company, active model, judging category, stunt and evidence description. The STUNTS button or T key disables them instantly; physical overtakes interrupt stunts and remain the director’s highest priority.
- Audio is opt-in and split into two controls, both off by default: procedural electronic BGM, and synthesized race SFX. Engines use a generated combustion-pulse loop with RPM-linked playback, throttle rises, gear-shift drops, exhaust pops and boost air. Horns are semantically reserved for overtake intent when a trailing model closes to within 4.5 pace points; starts, generic upgrades and the finish use distinct non-horn cues.
- Broadcast lower-thirds state who leads, who is chasing, the active model and the score gap so the visual story remains legible even as cameras switch.
- Model releases trigger a “boost” animation, but the boost is visual: it does not falsify the score.
- The timeline is deterministic and can be replayed exactly.
- Reduced-motion preferences disable nonessential motion and use immediate state changes.
- No framework, account, server or API key is required; the deliverable is a standalone static web app.

## 13. Source register

### Independent comparison

1. Artificial Analysis model comparison and methodology — https://artificialanalysis.ai/models/
2. Kimi K3 independent model page — https://artificialanalysis.ai/models/kimi-k3
3. Kimi K3 independent evaluation article — https://artificialanalysis.ai/articles/kimi-k3-achieves-3-in-the-artificial-analysis-intelligence-index-comparable-to-opus-4-8-and-gpt-5-5

### Anthropic official sources

4. Claude 2 — https://www.anthropic.com/news/claude-2
5. Claude 3 family — https://www.anthropic.com/news/claude-3-family
6. Claude 3.5 Sonnet — https://www.anthropic.com/news/claude-3-5-sonnet
7. Upgraded Claude 3.5 / computer use — https://www.anthropic.com/news/3-5-models-and-computer-use
8. Claude 3.7 Sonnet — https://www.anthropic.com/news/claude-3-7-sonnet
9. Claude 4 — https://www.anthropic.com/news/claude-4
10. Claude Opus 4.1 — https://www.anthropic.com/news/claude-opus-4-1
11. Claude Opus 4.5 — https://www.anthropic.com/news/claude-opus-4-5
12. Claude Opus 4.8 — https://www.anthropic.com/news/claude-opus-4-8
13. Claude Fable 5 / Mythos 5 — https://www.anthropic.com/news/claude-fable-5-mythos-5
14. Claude Sonnet 5 — https://www.anthropic.com/news/claude-sonnet-5

### OpenAI official sources

15. InstructGPT — https://openai.com/index/instruction-following/
16. GPT-4 — https://openai.com/index/gpt-4-research/
17. GPT-4 Turbo / DevDay — https://openai.com/index/new-models-and-developer-products-announced-at-devday/
18. GPT-4o — https://openai.com/index/hello-gpt-4o/
19. o1 reasoning — https://openai.com/index/learning-to-reason-with-llms/
20. o3 and o4-mini — https://openai.com/index/introducing-o3-and-o4-mini/
21. GPT-5 — https://openai.com/index/introducing-gpt-5/
22. GPT-5.2 — https://openai.com/index/introducing-gpt-5-2/
23. GPT-5.4 — https://openai.com/index/introducing-gpt-5-4/
24. GPT-5.5 — https://openai.com/index/introducing-gpt-5-5/
25. GPT-5.6 — https://openai.com/index/gpt-5-6/

### Moonshot AI / Kimi sources

26. Moonshot AI current release index — https://www.moonshot.ai/
27. Kimi platform — https://platform.moonshot.ai/
28. Kimi K1.5 repository and technical report link — https://github.com/MoonshotAI/kimi-k1.5
29. Kimi K2 repository and evaluation table — https://github.com/MoonshotAI/Kimi-K2
30. Kimi K2.5 repository and evaluation table — https://github.com/MoonshotAI/Kimi-K2.5
31. Kimi K2.6 model card — https://huggingface.co/moonshotai/Kimi-K2.6
32. Kimi K2.7 Code model card — https://huggingface.co/moonshotai/Kimi-K2.7-Code
33. Kimi K3 official announcement — https://forum.moonshot.ai/t/kimi-k3-is-here-our-most-capable-model/480
34. 2024 2M-character Kimi context report quoting Moonshot’s statement — https://www.scmp.com/tech/big-tech/article/3256109/alibaba-backed-moonshot-ai-claims-breakthrough-expanded-chinese-character-prompt-kimi-chatbot

### Independent operations and methodology

35. Claude Fable 5 operational analysis — https://artificialanalysis.ai/models/claude-fable-5
36. GPT-5.6 Sol operational analysis — https://artificialanalysis.ai/models/gpt-5-6-sol
37. Kimi K3 versus Kimi K2.5 operational comparison — https://artificialanalysis.ai/models/comparisons/kimi-k3-vs-kimi-k2-5
38. Coding Agent Index methodology — https://artificialanalysis.ai/methodology/coding-agents-benchmarking
39. Kimi K2.6 operational analysis — https://artificialanalysis.ai/models/kimi-k2-6
40. Benchmark category field guide — https://www.tonic.ai/ai-model-benchmarks

## 14. Important caveat

The release facts and cited raw results are sourced. The longitudinal Frontier Pace mapping is an editorial visualization built from those facts because no honest, unchanged five-year cross-company benchmark exists. The application states this clearly, shows confidence levels and keeps source links one click away.
