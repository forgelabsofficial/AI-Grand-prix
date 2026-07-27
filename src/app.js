(() => {
  "use strict";

  const DAY = 86_400_000;
  let START = Date.UTC(2021, 6, 23);
  let END = Date.UTC(2026, 6, 23);
  const RACE_DURATION = 31_000;

  const PHASE1 = window.MGPPhase1;
  const PROFILE_LABELS = Object.fromEntries([
    ...Object.entries(PHASE1.CATEGORY_DEFINITIONS).map(([key, value]) => [key, value.short || value.label]),
    ...Object.entries(PHASE1.CHAMPIONSHIPS).map(([key, value]) => [key, value.short || value.label])
  ]);
  const KEYBOARD_PROFILES = ["overall", "reasoning", "coding", "agents"];
  const SPEED_LEVELS = [0.5, 1, 1.5, 2];

  let COMPANY_ORDER = ["anthropic", "openai", "moonshot"];
  let companies = {
    anthropic: {
      name: "Anthropic",
      family: "Claude",
      color: "#ff6b45",
      number: "01",
      current: "claude-fable-5"
    },
    openai: {
      name: "OpenAI",
      family: "GPT / o-series",
      color: "#f4f6f1",
      number: "02",
      current: "gpt-5-6-sol"
    },
    moonshot: {
      name: "Moonshot AI",
      family: "Kimi",
      color: "#a88cff",
      number: "03",
      current: "kimi-k3"
    }
  };

  let STUNT_EVENTS = {
    "gpt-4o": { type: "prism-roll", metric: "multimodal", sourceIds: [18], name: "PRISM FLIP", category: "MULTIMODAL", description: "GPT-4o's text, audio and vision milestone is visualized as a controlled aerial roll through a prism field." },
    "o1-preview": { type: "logic-leap", metric: "reasoning", sourceIds: [19], name: "LOGIC LEAP", category: "REASONING", description: "o1-preview's major AIME, GPQA and Codeforces reasoning jump becomes a precision ramp leap." },
    "gpt-4-1": { type: "memory-helix", metric: "context", sourceIds: [20], name: "MEMORY TUNNEL", category: "LONG CONTEXT", description: "GPT-4.1's million-token context and coding upgrade becomes a twelve-beacon memory tunnel with a recall exit." },
    "o3": { type: "tool-swarm", metric: "agents", sourceIds: [20], name: "TOOL GAUNTLET", category: "AGENTS", description: "o3's ability to combine web, Python, files and visual tools deploys a coordinated tool-drone formation." },
    "gpt-5-2": { type: "endurance-night", metric: "agents", sourceIds: [22], name: "ENDURANCE NIGHT STAGE", category: "LONG-RUNNING AGENTS", description: "GPT-5.2's professional work and long-running agent improvements become a sustained night-stage run without intervention." },
    "claude-3-opus": { type: "prism-roll", metric: "multimodal", sourceIds: [5], name: "VISION PRISM", category: "MULTIMODAL", description: "Claude 3 Opus's vision and broad reasoning release is shown as a stabilized prism roll." },
    "claude-3-5-sonnet-v2": { type: "code-drift", metric: "coding", sourceIds: [7], name: "CODE CHICANE", category: "CODING", description: "The upgraded Claude 3.5 Sonnet's computer-use debut and SWE-bench gain becomes a precision code drift." },
    "claude-3-7-sonnet": { type: "logic-leap", metric: "reasoning", sourceIds: [8], name: "HYBRID LEAP", category: "REASONING", description: "Claude 3.7's hybrid reasoning milestone is visualized as a controlled long-gap jump." },
    "claude-opus-4": { type: "tool-swarm", metric: "agents", sourceIds: [9], name: "TOOL GAUNTLET", category: "AGENTS", description: "Claude Opus 4's extended thinking with tools becomes a coordinated search, code and file gate challenge." },
    "claude-opus-4-5": { type: "agent-swarm", metric: "agents", sourceIds: [11], name: "AGENT SWARM SPLIT", category: "MULTI-AGENT", description: "Claude Opus 4.5's documented subagent management launches parallel support racers before a synchronized merge." },
    "kimi-2m": { type: "memory-helix", metric: "context", sourceIds: [34], name: "2M MEMORY TUNNEL", category: "LONG CONTEXT", description: "Kimi's two-million-Chinese-character context beta becomes an extended memory tunnel with sequential recall beacons." },
    "kimi-k1-5": { type: "logic-leap", metric: "reasoning", sourceIds: [28], name: "K1.5 LOGIC LEAP", category: "REASONING", description: "Kimi K1.5's reported o1-level math, code and multimodal reasoning becomes a high-difficulty leap." },
    "kimi-k2": { type: "open-gate", metric: "openness", sourceIds: [29], name: "OPEN GARAGE", category: "OPEN WEIGHTS", description: "Kimi K2's released model weights and Modified MIT license open a transparent research gate." },
    "kimi-k2-5": { type: "agent-swarm", metric: "agents", sourceIds: [30], name: "AGENT SWARM SPLIT", category: "MULTI-AGENT", description: "Kimi K2.5's documented Agent Swarm capability splits into coordinated parallel racers and rejoins the main line." },
    "kimi-k2-6": { type: "endurance-night", metric: "agents", sourceIds: [31], name: "ENDURANCE NIGHT STAGE", category: "LONG-HORIZON AGENTS", description: "Kimi K2.6's long-horizon coding and thousands of tool steps become a day-to-night autonomous endurance run." },
    "kimi-k3": { type: "prism-roll", metric: "multimodal", sourceIds: [33], name: "K3 FRONTIER FLIP", category: "VISION + CODE", description: "Kimi K3's native vision, million-token context and long-horizon engineering release becomes a frontier prism flip." }
  };

  const CURRENT_SKILLS_SPECTACLES = {
    throughput: [
      { at: 0.08, type: "drag-strip", metric: "throughput", all: true, name: "OUTPUT DRAG STRIP", category: "THROUGHPUT", description: "A measured straight-line event converts independently observed output tokens per second into sustained top speed." }
    ],
    latency: [
      { at: 0.08, type: "drag-strip", metric: "latency", all: true, name: "REACTION DRAG", category: "ANSWER LATENCY", description: "A reaction-light sprint visualizes independently measured time to first answer token under the named configuration." }
    ],
    cost: [
      { at: 0.12, type: "fuel-strategy", metric: "cost", all: true, name: "FUEL STRATEGY", category: "COST EFFICIENCY", description: "Tokens become fuel; lower blended API cost produces a shorter measured pit-energy cycle." }
    ],
    developerCup: [
      { at: 0.18, type: "agent-swarm", metric: "agents", winnerOnly: true, name: "DEVELOPER SWARM", category: "DEVELOPER CUP", description: "The leading developer configuration deploys parallel coding and tool-use support racers." }
    ],
    valueCup: [
      { at: 0.08, type: "drag-strip", metric: "throughput", winnerOnly: true, name: "VALUE DRAG", category: "VALUE CUP", description: "The leading value configuration demonstrates its measured performance-per-dollar balance on the straight." },
      { at: 0.48, type: "fuel-strategy", metric: "cost", winnerOnly: true, name: "VALUE PIT STOP", category: "VALUE CUP", description: "The value leader converts its measured blended token cost into a compact energy stop." }
    ],
    openCup: [
      { at: 0.16, type: "open-gate", metric: "openness", openOnly: true, name: "OPEN GARAGE", category: "OPEN ECOSYSTEM", description: "Only a model with released weights and a usable license receives the transparent self-hosting gate." }
    ]
  };

  let sources = [
    { id: 1, group: "Independent comparison", title: "Artificial Analysis — model comparison", url: "https://artificialanalysis.ai/models/" },
    { id: 2, group: "Independent comparison", title: "Artificial Analysis — Kimi K3 model page", url: "https://artificialanalysis.ai/models/kimi-k3" },
    { id: 3, group: "Independent comparison", title: "Artificial Analysis — Kimi K3 independent evaluation", url: "https://artificialanalysis.ai/articles/kimi-k3-achieves-3-in-the-artificial-analysis-intelligence-index-comparable-to-opus-4-8-and-gpt-5-5" },
    { id: 4, group: "Anthropic · official", title: "Claude 2", url: "https://www.anthropic.com/news/claude-2" },
    { id: 5, group: "Anthropic · official", title: "Claude 3 family", url: "https://www.anthropic.com/news/claude-3-family" },
    { id: 6, group: "Anthropic · official", title: "Claude 3.5 Sonnet", url: "https://www.anthropic.com/news/claude-3-5-sonnet" },
    { id: 7, group: "Anthropic · official", title: "Upgraded Claude 3.5 and computer use", url: "https://www.anthropic.com/news/3-5-models-and-computer-use" },
    { id: 8, group: "Anthropic · official", title: "Claude 3.7 Sonnet", url: "https://www.anthropic.com/news/claude-3-7-sonnet" },
    { id: 9, group: "Anthropic · official", title: "Claude 4", url: "https://www.anthropic.com/news/claude-4" },
    { id: 10, group: "Anthropic · official", title: "Claude Opus 4.1", url: "https://www.anthropic.com/news/claude-opus-4-1" },
    { id: 11, group: "Anthropic · official", title: "Claude Opus 4.5", url: "https://www.anthropic.com/news/claude-opus-4-5" },
    { id: 12, group: "Anthropic · official", title: "Claude Opus 4.8", url: "https://www.anthropic.com/news/claude-opus-4-8" },
    { id: 13, group: "Anthropic · official", title: "Claude Fable 5 and Mythos 5", url: "https://www.anthropic.com/news/claude-fable-5-mythos-5" },
    { id: 14, group: "Anthropic · official", title: "Claude Sonnet 5", url: "https://www.anthropic.com/news/claude-sonnet-5" },
    { id: 15, group: "OpenAI · official", title: "Aligning language models to follow instructions", url: "https://openai.com/index/instruction-following/" },
    { id: 16, group: "OpenAI · official", title: "GPT-4 research release", url: "https://openai.com/index/gpt-4-research/" },
    { id: 17, group: "OpenAI · official", title: "GPT-4 Turbo and DevDay models", url: "https://openai.com/index/new-models-and-developer-products-announced-at-devday/" },
    { id: 18, group: "OpenAI · official", title: "GPT-4o", url: "https://openai.com/index/hello-gpt-4o/" },
    { id: 19, group: "OpenAI · official", title: "Learning to reason with o1", url: "https://openai.com/index/learning-to-reason-with-llms/" },
    { id: 20, group: "OpenAI · official", title: "OpenAI o3 and o4-mini", url: "https://openai.com/index/introducing-o3-and-o4-mini/" },
    { id: 21, group: "OpenAI · official", title: "GPT-5", url: "https://openai.com/index/introducing-gpt-5/" },
    { id: 22, group: "OpenAI · official", title: "GPT-5.2", url: "https://openai.com/index/introducing-gpt-5-2/" },
    { id: 23, group: "OpenAI · official", title: "GPT-5.4", url: "https://openai.com/index/introducing-gpt-5-4/" },
    { id: 24, group: "OpenAI · official", title: "GPT-5.5", url: "https://openai.com/index/introducing-gpt-5-5/" },
    { id: 25, group: "OpenAI · official", title: "GPT-5.6", url: "https://openai.com/index/gpt-5-6/" },
    { id: 26, group: "Moonshot AI / Kimi", title: "Moonshot AI release index", url: "https://www.moonshot.ai/" },
    { id: 27, group: "Moonshot AI / Kimi", title: "Kimi API platform", url: "https://platform.moonshot.ai/" },
    { id: 28, group: "Moonshot AI / Kimi", title: "Kimi K1.5 repository and report", url: "https://github.com/MoonshotAI/kimi-k1.5" },
    { id: 29, group: "Moonshot AI / Kimi", title: "Kimi K2 repository and evaluations", url: "https://github.com/MoonshotAI/Kimi-K2" },
    { id: 30, group: "Moonshot AI / Kimi", title: "Kimi K2.5 repository and evaluations", url: "https://github.com/MoonshotAI/Kimi-K2.5" },
    { id: 31, group: "Moonshot AI / Kimi", title: "Kimi K2.6 model card", url: "https://huggingface.co/moonshotai/Kimi-K2.6" },
    { id: 32, group: "Moonshot AI / Kimi", title: "Kimi K2.7 Code model card", url: "https://huggingface.co/moonshotai/Kimi-K2.7-Code" },
    { id: 33, group: "Moonshot AI / Kimi", title: "Kimi K3 official announcement", url: "https://forum.moonshot.ai/t/kimi-k3-is-here-our-most-capable-model/480" },
    { id: 34, group: "Moonshot AI / Kimi", title: "Kimi 2M-character context announcement coverage", url: "https://www.scmp.com/tech/big-tech/article/3256109/alibaba-backed-moonshot-ai-claims-breakthrough-expanded-chinese-character-prompt-kimi-chatbot" },
    { id: 35, group: "Independent operations", title: "Claude Fable 5 — intelligence, speed, latency and price", url: "https://artificialanalysis.ai/models/claude-fable-5" },
    { id: 36, group: "Independent operations", title: "GPT-5.6 Sol — intelligence, speed, latency and price", url: "https://artificialanalysis.ai/models/gpt-5-6-sol" },
    { id: 37, group: "Independent operations", title: "Kimi K3 vs Kimi K2.5 operational comparison", url: "https://artificialanalysis.ai/models/comparisons/kimi-k3-vs-kimi-k2-5" },
    { id: 38, group: "Methodology", title: "Artificial Analysis Coding Agent Index methodology", url: "https://artificialanalysis.ai/methodology/coding-agents-benchmarking" },
    { id: 39, group: "Independent operations", title: "Kimi K2.6 — intelligence, speed, latency and price", url: "https://artificialanalysis.ai/models/kimi-k2-6" },
    { id: 40, group: "Methodology", title: "Benchmark categories and cautions", url: "https://www.tonic.ai/ai-model-benchmarks" }
  ];

  const d = (iso) => Date.parse(`${iso}T00:00:00Z`);
  const model = (company, id, name, date, scores, confidence, summary, evidence, sourceIds, extra = {}) => ({
    company, id, name, date: d(date), scores, confidence, summary, evidence, sources: sourceIds, ...extra
  });

  let models = [
    // Anthropic
    model("anthropic", "claude-1", "Claude 1", "2023-03-14", { overall: 46, reasoning: 48, coding: 42, context: 58 }, "low", "Anthropic enters the public assistant race.", "Early Claude established the helpful, honest and harmless assistant line. Comparable public cross-vendor evaluation was still limited.", [4]),
    model("anthropic", "claude-2", "Claude 2", "2023-07-11", { overall: 58, reasoning: 61, coding: 55, context: 68 }, "medium", "A larger jump in reasoning, coding and long responses.", "Anthropic reported 76.5% on the multiple-choice bar exam section, up from 73.0% for Claude 1.3, alongside improvements in coding, math and reasoning.", [4]),
    model("anthropic", "claude-2-1", "Claude 2.1", "2023-11-21", { overall: 60, reasoning: 62, coding: 57, context: 75 }, "medium", "The Claude line reaches a 200K context class.", "The release materially extended the context profile. Overall and reasoning pace move modestly because context size is not itself a general-intelligence score.", [4]),
    model("anthropic", "claude-3-opus", "Claude 3 Opus", "2024-03-04", { overall: 73, reasoning: 76, coding: 72, context: 76 }, "medium", "Claude reaches the 2024 frontier on broad reasoning.", "Anthropic reported leading results across MMLU, GPQA, GSM8K and related evaluations, plus near-perfect recall in its long-context needle test.", [5]),
    model("anthropic", "claude-3-5-sonnet", "Claude 3.5 Sonnet", "2024-06-20", { overall: 79, reasoning: 81, coding: 84, context: 76 }, "medium", "A smaller Sonnet model overtakes the prior Opus on many tasks.", "Anthropic reported new company highs for graduate reasoning, undergraduate knowledge and HumanEval coding while improving speed and cost.", [6]),
    model("anthropic", "claude-3-5-sonnet-v2", "Claude 3.5 Sonnet v2", "2024-10-22", { overall: 82, reasoning: 83, coding: 88, context: 77 }, "medium", "Computer use arrives with a major coding upgrade.", "Anthropic reported SWE-bench Verified rising from 33.4% to 49.0%, plus gains on agentic tool-use evaluations.", [7]),
    model("anthropic", "claude-3-7-sonnet", "Claude 3.7 Sonnet", "2025-02-24", { overall: 85, reasoning: 89, coding: 91, context: 78 }, "medium", "Claude becomes a hybrid reasoning model.", "Claude 3.7 introduced a combined near-instant and extended-thinking design and strengthened agentic coding.", [8]),
    model("anthropic", "claude-opus-4", "Claude Opus 4", "2025-05-22", { overall: 89, reasoning: 92, coding: 95, context: 80 }, "medium", "Long-running coding moves to the foreground.", "Anthropic reported 72.5% on SWE-bench and 43.2% on Terminal-bench, with sustained multi-hour task performance.", [9]),
    model("anthropic", "claude-opus-4-1", "Claude Opus 4.1", "2025-08-05", { overall: 90, reasoning: 93, coding: 96, context: 80 }, "medium", "A focused agentic and coding upgrade.", "Anthropic reported 74.5% on SWE-bench Verified and improvements in multi-file refactoring and detailed research.", [10]),
    model("anthropic", "claude-sonnet-4-5", "Claude Sonnet 4.5", "2025-09-29", { overall: 92, reasoning: 93, coding: 97, context: 82 }, "medium", "Sonnet pushes complex agents and computer use.", "The release emphasized long-horizon agents, coding and stronger defenses for computer-use workflows.", [11]),
    model("anthropic", "claude-opus-4-5", "Claude Opus 4.5", "2025-11-24", { overall: 94, reasoning: 96, coding: 98, context: 84 }, "medium", "Opus improves coding, agents and computer use.", "Anthropic positioned Opus 4.5 as its strongest model for coding, agents and computer use at release.", [11]),
    model("anthropic", "claude-opus-4-8", "Claude Opus 4.8", "2026-05-28", { overall: 94, reasoning: 97, coding: 99, context: 96 }, "high", "A consistent, million-context Opus for long-running work.", "Anthropic reported benchmark gains over Opus 4.7 and stronger performance across coding, agentic tasks and professional work.", [12], { rawAA: 56 }),
    model("anthropic", "claude-fable-5", "Claude Fable 5", "2026-06-09", { overall: 100, reasoning: 100, coding: 99, context: 96 }, "high", "The current broad-capability leader in the independent snapshot.", "Artificial Analysis placed Fable 5 at roughly 60 on its Intelligence Index, narrowly ahead of GPT-5.6 Sol. Anthropic also reported major gains in long-horizon coding and knowledge work. Safeguard-triggered requests can fall back to Opus 4.8.", [1, 13], { rawAA: 60, flagship: true }),
    model("anthropic", "claude-sonnet-5", "Claude Sonnet 5", "2026-06-30", { overall: 93, reasoning: 93, coding: 97, context: 96 }, "high", "The newest Sonnet release; efficient, but not the general flagship.", "Anthropic positioned Sonnet 5 as an agentic, cost-efficient Sonnet that can match Opus 4.8 on some tasks at high effort. Fable 5 remains the stronger broad flagship.", [14]),

    // OpenAI
    model("openai", "gpt-3-api", "GPT-3 API", "2021-11-18", { overall: 25, reasoning: 25, coding: 28, context: 35 }, "low", "OpenAI is first onto this five-year circuit.", "GPT-3 predates the window, but broad API availability in November 2021 is the period’s relevant public milestone. Its role here is a baseline, not a fresh model-release claim.", [15]),
    model("openai", "instructgpt", "InstructGPT", "2022-01-27", { overall: 32, reasoning: 33, coding: 31, context: 35 }, "medium", "Human-feedback instruction following becomes the default.", "OpenAI reported that labelers preferred a 1.3B InstructGPT model over 175B GPT-3 outputs, with better instruction following and fewer fabrications.", [15]),
    model("openai", "gpt-3-5", "GPT-3.5 / ChatGPT", "2022-11-30", { overall: 44, reasoning: 46, coding: 48, context: 40 }, "medium", "Conversational AI reaches a mass audience.", "The research preview made a GPT-3.5-class dialogue model broadly usable. Pace reflects the capability jump, not ChatGPT’s extraordinary adoption.", [15, 16]),
    model("openai", "gpt-4", "GPT-4", "2023-03-14", { overall: 68, reasoning: 74, coding: 72, context: 55 }, "medium", "A major leap in professional and academic task performance.", "OpenAI reported human-level performance on many professional and academic benchmarks and much stronger multilingual MMLU performance than GPT-3.5.", [16]),
    model("openai", "gpt-4-turbo", "GPT-4 Turbo", "2023-11-06", { overall: 72, reasoning: 77, coding: 77, context: 69 }, "medium", "128K context and a lower-cost GPT-4-class model.", "The DevDay release expanded context to 128K, improved recency and introduced a stronger platform for tool-based assistants.", [17]),
    model("openai", "gpt-4o", "GPT-4o", "2024-05-13", { overall: 77, reasoning: 81, coding: 83, context: 79 }, "medium", "The omni model unifies text, vision and audio direction.", "GPT-4o moved GPT-4-level capability toward lower latency and broader multimodal interaction.", [18]),
    model("openai", "o1-preview", "o1-preview", "2024-09-12", { overall: 83, reasoning: 91, coding: 87, context: 66 }, "medium", "Test-time reasoning changes the shape of the race.", "OpenAI reported 56.7 on AIME 2024 for o1-preview versus 13.4 for GPT-4o, plus large gains on Codeforces and GPQA.", [19]),
    model("openai", "o1", "OpenAI o1", "2024-12-17", { overall: 85, reasoning: 95, coding: 89, context: 67 }, "medium", "The production o1 model improves difficult reasoning.", "OpenAI reported 96.4 on MATH, 75.7 on GPQA Diamond and 48.9 on SWE-bench Verified for the December snapshot.", [19]),
    model("openai", "gpt-4-5", "GPT-4.5", "2025-02-27", { overall: 82, reasoning: 83, coding: 85, context: 77 }, "medium", "A broad chat-quality model, not a reasoning replacement for o1.", "The research preview emphasized world knowledge, intent understanding and lower hallucination. The company frontier envelope therefore remains with o1 on hard reasoning.", [20]),
    model("openai", "gpt-4-1", "GPT-4.1", "2025-04-14", { overall: 86, reasoning: 88, coding: 93, context: 96 }, "medium", "Coding, instruction following and a 1M context class.", "OpenAI’s April 2025 model family pushed coding and long-context API work ahead of GPT-4o.", [20]),
    model("openai", "o3", "OpenAI o3", "2025-04-16", { overall: 90, reasoning: 96, coding: 96, context: 91 }, "medium", "Reasoning models gain full tool use.", "OpenAI described o3 as its smartest model to date, able to combine search, Python, file analysis and visual reasoning inside its reasoning process.", [20]),
    model("openai", "gpt-5", "GPT-5", "2025-08-07", { overall: 93, reasoning: 97, coding: 97, context: 94 }, "medium", "Reasoning and fast response are routed as one default system.", "GPT-5 replaced several prior ChatGPT choices and automatically applied reasoning when useful.", [21]),
    model("openai", "gpt-5-2", "GPT-5.2", "2025-12-11", { overall: 95, reasoning: 98, coding: 98, context: 96 }, "high", "Professional knowledge work and long-running agents advance.", "OpenAI reported gains in general intelligence, long-context understanding, tool calling and vision over earlier GPT-5 variants.", [22]),
    model("openai", "gpt-5-4", "GPT-5.4", "2026-03-05", { overall: 96, reasoning: 99, coding: 99, context: 96 }, "high", "Mainline reasoning absorbs frontier Codex capability.", "GPT-5.4 unified advances in reasoning, coding, computer use and professional artifact creation.", [23]),
    model("openai", "gpt-5-5", "GPT-5.5", "2026-04-23", { overall: 97, reasoning: 99, coding: 99, context: 97 }, "high", "A stronger autonomous work model.", "The release emphasized agentic coding, computer use, knowledge work and scientific research, including the ability to carry ambiguous multi-part tasks further.", [24]),
    model("openai", "gpt-5-6-sol", "GPT-5.6 Sol", "2026-07-09", { overall: 98, reasoning: 100, coding: 100, context: 98 }, "high", "One point behind the independent overall leader; strongest on several agentic tests.", "Artificial Analysis placed GPT-5.6 Sol at roughly 59, one point behind Fable 5. OpenAI reported state-of-the-art BrowseComp, OSWorld and coding-agent results, with major performance-per-dollar gains.", [1, 25], { rawAA: 59, flagship: true }),

    // Moonshot AI
    model("moonshot", "kimi-chat", "Kimi Chat", "2023-10-09", { overall: 41, reasoning: 42, coding: 39, context: 80 }, "low", "Moonshot enters with long context as its signature.", "Kimi launched with support for about 200,000 Chinese characters, commonly described as a 128K-token-class context product. Broad independent capability evidence was limited.", [26, 34]),
    model("moonshot", "kimi-public", "Kimi public release", "2023-11-16", { overall: 43, reasoning: 43, coding: 40, context: 82 }, "low", "Kimi opens to the public.", "Public availability turned Moonshot’s long-context model into a user-facing competitor. The modest overall increase avoids confusing reach with intelligence.", [26, 34]),
    model("moonshot", "kimi-2m", "Kimi 2M context", "2024-03-18", { overall: 46, reasoning: 45, coding: 42, context: 100 }, "low", "A 2M-Chinese-character beta creates a context lead.", "Moonshot said the updated Kimi could handle up to two million Chinese characters in one prompt, a tenfold increase over the earlier 200,000-character product.", [34]),
    model("moonshot", "kimi-explore", "Kimi Explore", "2024-10-11", { overall: 50, reasoning: 49, coding: 45, context: 100 }, "low", "Autonomous search broadens Kimi beyond document reading.", "Explore Edition added deeper autonomous search and large-document synthesis. Comparable independent model scores remained sparse.", [26, 34]),
    model("moonshot", "kimi-k1-5", "Kimi K1.5", "2025-01-20", { overall: 83, reasoning: 93, coding: 83, context: 83 }, "medium", "Moonshot makes a sudden reasoning leap.", "The technical report reported 77.5 on AIME 2024, 96.2 on MATH-500 and a 94th-percentile Codeforces result in long-CoT mode, broadly comparable to o1 on several tests.", [28]),
    model("moonshot", "kimi-vl", "Kimi-VL", "2025-04-17", { overall: 70, reasoning: 73, coding: 67, context: 83 }, "medium", "An open, compact vision-language branch.", "Kimi-VL added an open multimodal MoE. As a specialized compact model it does not replace K1.5 as Moonshot’s broad frontier.", [27, 28]),
    model("moonshot", "kimi-k2", "Kimi K2", "2025-07-11", { overall: 87, reasoning: 89, coding: 91, context: 85 }, "medium", "A 1T-total, 32B-active open-weight MoE arrives.", "Moonshot’s model card reported 75.1 GPQA Diamond, 89.5 MMLU, 81.1 MMLU-Pro and strong tool/coding results versus contemporary models.", [29]),
    model("moonshot", "kimi-k2-0905", "Kimi K2 0905", "2025-09-09", { overall: 89, reasoning: 90, coding: 94, context: 91 }, "medium", "Coding improves and context doubles to 256K.", "The K2 update strengthened agentic coding and doubled the context window from 128K to 256K.", [29]),
    model("moonshot", "kimi-k2-thinking", "Kimi K2 Thinking", "2025-11-06", { overall: 92, reasoning: 96, coding: 95, context: 91 }, "medium", "Interleaved reasoning and tool use reach hundreds of steps.", "Moonshot positioned K2 Thinking for complex reasoning and agentic work, with long tool-call chains and strong HLE, BrowseComp and SWE-bench results.", [27, 29]),
    model("moonshot", "kimi-k2-5", "Kimi K2.5", "2026-01-27", { overall: 93, reasoning: 97, coding: 96, context: 95 }, "high", "Native multimodality and Agent Swarm expand the K2 line.", "The model card reported 50.2 HLE with tools, 96.1 AIME 2025, 87.6 GPQA Diamond, 76.8 SWE-bench Verified and broad visual-document gains.", [30]),
    model("moonshot", "kimi-k2-6", "Kimi K2.6", "2026-04-20", { overall: 95, reasoning: 98, coding: 98, context: 95 }, "high", "Long-horizon agents and coding move near the closed frontier.", "Moonshot reported 54.0 HLE with tools, 58.6 SWE-bench Pro, 80.2 SWE-bench Verified, 66.7 Terminal-Bench 2.0 and 90.5 GPQA Diamond.", [31]),
    model("moonshot", "kimi-k2-7-code", "Kimi K2.7 Code", "2026-06-12", { overall: 94, reasoning: 96, coding: 99, context: 95 }, "high", "A specialized, more efficient coding racer.", "The model card reported gains over K2.6 on Kimi Code Bench v2, Program Bench and MCP evaluations. It is a coding specialist, not a broad K2.6 replacement.", [32]),
    model("moonshot", "kimi-k3", "Kimi K3", "2026-07-16", { overall: 95, reasoning: 98, coding: 99, context: 100 }, "high", "Moonshot closes to within five points of the overall leader.", "Independent Artificial Analysis testing scored K3 at roughly 57, near Opus 4.8 and behind Fable 5 and GPT-5.6 Sol. K3 has 2.8T total parameters, native vision and a 1M-token context. Full weights were promised for 27 July 2026—after this research snapshot.", [2, 3, 33], { rawAA: 57, flagship: true })
  ].sort((a, b) => a.date - b.date);

  // ═══════════════════════════════════════════════════════════
  // RACE CONFIG OVERRIDE
  // If window.RACE_CONFIG is defined, use it to override defaults
  // ═══════════════════════════════════════════════════════════
  
  if (window.RACE_CONFIG) {
    const cfg = window.RACE_CONFIG;
    console.log('[Model GP] Loading race config:', cfg.name || 'unnamed');
    
    if (cfg.companies) companies = cfg.companies;
    if (cfg.companyOrder) COMPANY_ORDER = cfg.companyOrder;
    if (cfg.stuntEvents) STUNT_EVENTS = cfg.stuntEvents;
    if (cfg.sources) sources = cfg.sources;
    
    if (cfg.models) {
      // Transform models: convert string dates to timestamps
      models = cfg.models.map(m => ({
        ...m,
        date: typeof m.date === 'string' ? Date.parse(m.date + 'T00:00:00Z') : m.date
      })).sort((a, b) => a.date - b.date);
    }
    
    // Recalculate timeline based on actual model dates
    if (models.length > 0) {
      START = Math.min(...models.map(m => m.date));
      END = Math.max(...models.map(m => m.date));
      console.log('[Model GP] Timeline:', new Date(START).toISOString().split('T')[0], 'to', new Date(END).toISOString().split('T')[0]);
    }
  }

  PHASE1.enrichModels(models);

  const modelById = new Map(models.map((m) => [m.id, m]));
  const modelsByCompany = Object.fromEntries(COMPANY_ORDER.map((key) => [key, models.filter((m) => m.company === key)]));
  const savedTitle = (() => {
    try { return localStorage.getItem("mgp-title"); }
    catch { return null; }
  })();

  const state = {
    profile: "overall",
    selected: Object.fromEntries(COMPANY_ORDER.map((key) => [key, companies[key].current])),
    title: savedTitle || "THE MODEL GRAND PRIX",
    view: "graph",
    raceProgress: 0,
    raceRunning: false,
    raceSpeed: 1,
    raceStarted: false,
    raceFinished: false,
    raceRaf: null,
    lastFrame: 0,
    lastRaceTime: START,
    currentMilestone: null,
    milestoneTimer: null,
    countdownTimers: [],
    skillsSpectaclesTriggered: new Set(),
    replayResume: false,
    toastTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const fmtDate = (time, long = false) => new Intl.DateTimeFormat("en-GB", long
    ? { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }
    : { month: "short", year: "numeric", timeZone: "UTC" }
  ).format(new Date(time)).toUpperCase();
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const scoreText = (score) => score == null || Number.isNaN(score) ? "N/A" : Number.isInteger(score) ? String(score) : score.toFixed(1);
  const scoreOf = (model, profile = state.profile) => PHASE1.scoreFor(model, profile);
  const profileMeta = (profile = state.profile) => PHASE1.profileMeta(profile);
  const CURRENT_SKILLS_PROFILES = ["throughput", "latency", "cost", "developerCup", "valueCup", "openCup"];
  const isCurrentSkillsProfile = (profile = state.profile) => CURRENT_SKILLS_PROFILES.includes(profile);

  function getSelectedModels() {
    return COMPANY_ORDER.map((key) => modelById.get(state.selected[key]));
  }

  function rankedSelected() {
    return getSelectedModels().sort((a, b) => {
      const as = scoreOf(a);
      const bs = scoreOf(b);
      if (as == null && bs == null) return b.date - a.date;
      if (as == null) return 1;
      if (bs == null) return -1;
      return bs - as || b.date - a.date;
    });
  }

  function getReleased(company, time) {
    return modelsByCompany[company].filter((m) => m.date <= time);
  }

  function getBestAt(company, time, profile = state.profile) {
    const released = getReleased(company, time).filter((candidate) => scoreOf(candidate, profile) != null);
    if (!released.length) return null;
    return released.reduce((best, candidate) => {
      const candidateScore = scoreOf(candidate, profile);
      const bestScore = best ? scoreOf(best, profile) : null;
      if (!best || candidateScore > bestScore) return candidate;
      if (candidateScore === bestScore && candidate.date > best.date) return candidate;
      return best;
    }, null);
  }

  function getRankingsAt(time, profile = state.profile) {
    return COMPANY_ORDER.map((company) => ({ company, model: getBestAt(company, time, profile) }))
      .sort((a, b) => {
        const as = a.model ? scoreOf(a.model, profile) : null;
        const bs = b.model ? scoreOf(b.model, profile) : null;
        if (as == null && bs == null) return COMPANY_ORDER.indexOf(a.company) - COMPANY_ORDER.indexOf(b.company);
        if (as == null) return 1;
        if (bs == null) return -1;
        return bs - as || COMPANY_ORDER.indexOf(a.company) - COMPANY_ORDER.indexOf(b.company);
      });
  }

  function competitionRanks(items, scoreGetter, keyGetter) {
    const result = new Map();
    let lastScore = null;
    let currentRank = 0;
    items.forEach((item, index) => {
      const score = scoreGetter(item);
      if (score == null) return;
      if (lastScore == null || Math.abs(score - lastScore) > 0.05) currentRank = index + 1;
      result.set(keyGetter(item), { rank: currentRank, score });
      lastScore = score;
    });
    const counts = {};
    result.forEach(({ rank }) => { counts[rank] = (counts[rank] || 0) + 1; });
    result.forEach((value) => { value.tied = counts[value.rank] > 1; });
    return result;
  }

  function renderModelGrid() {
    const grid = $("#modelGrid");
    const ranking = rankedSelected();
    const scoredRanking = ranking.filter((model) => scoreOf(model) != null);
    const rankMap = competitionRanks(scoredRanking, (model) => scoreOf(model), (model) => model.company);

    grid.innerHTML = COMPANY_ORDER.map((companyKey) => {
      const company = companies[companyKey];
      const selected = modelById.get(state.selected[companyKey]);
      const selectedScore = scoreOf(selected);
      const meta = profileMeta();
      const metric = meta?.type === "category" ? PHASE1.getMetric(selected, state.profile) : null;
      const options = [...modelsByCompany[companyKey]].sort((a, b) => b.date - a.date).map((m) =>
        `<option value="${m.id}" ${m.id === selected.id ? "selected" : ""}>${escapeHtml(m.name)} · ${new Date(m.date).getUTCFullYear()}</option>`
      ).join("");
      const raw = meta?.type === "championship" ? "Weighted preset" : PHASE1.metricDisplay(metric);
      const confidence = metric?.confidence || (selectedScore == null ? "no data" : selected.confidence);
      return `
        <article class="model-card ${selectedScore == null ? "is-unscored" : ""}" style="--company:${company.color}">
          <div class="model-card-top">
            <i class="company-dot"></i>
            <span class="company-name">${company.name}</span>
            <span class="rank-chip">${rankMap.has(companyKey) ? `${rankMap.get(companyKey).tied ? "=" : ""}P${rankMap.get(companyKey).rank}` : "N/A"}</span>
          </div>
          <div class="model-select-row">
            <label class="select-shell" aria-label="Choose ${company.name} model">
              <select data-model-select="${companyKey}">${options}</select>
            </label>
            <div class="model-score"><b>${scoreText(selectedScore)}</b><small>${selectedScore == null ? "NO MEASUREMENT" : "SCORE / 100"}</small></div>
          </div>
          <div class="model-meta">
            <span>${fmtDate(selected.date)}</span><span>·</span><span title="${escapeHtml(raw)}">${escapeHtml(raw)}</span>
            <button data-inspect="${selected.id}">Evidence</button>
            <span class="confidence">${confidence}</span>
          </div>
        </article>`;
    }).join("");

    $$('[data-model-select]', grid).forEach((select) => {
      select.addEventListener("change", (event) => {
        state.selected[event.target.dataset.modelSelect] = event.target.value;
        renderGraphUI();
      });
    });
    $$('[data-inspect]', grid).forEach((button) => button.addEventListener("click", () => openModelDialog(button.dataset.inspect)));
  }

  function renderRankSummary() {
    const ranked = rankedSelected();
    const rankMap = competitionRanks(ranked.filter((m) => scoreOf(m) != null), (m) => scoreOf(m), (m) => m.company);
    $("#rankSummary").innerHTML = ranked.map((m) => {
      const score = scoreOf(m);
      const rank = rankMap.get(m.company);
      return `<div class="rank-stat" style="--company:${companies[m.company].color}">
        <small>${rank ? `${rank.tied ? "=" : ""}P${rank.rank} · ${scoreText(score)}` : "N/A · NOT MEASURED"}</small>
        <b>${escapeHtml(companies[m.company].name)}</b>
      </div>`;
    }).join("");
  }

  function renderLegend() {
    $("#chartLegend").innerHTML = COMPANY_ORDER.map((key) => `
      <span class="legend-item" style="--company:${companies[key].color}"><i></i>${companies[key].name}</span>`).join("");
  }

  function svgEl(tag, attrs = {}, text = "") {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    if (text) node.textContent = text;
    return node;
  }

  function renderChart() {
    const svg = $("#historyChart");
    const title = svg.querySelector("title");
    const desc = svg.querySelector("desc");
    svg.replaceChildren(title, desc);

    const W = 1000, H = 560;
    const margin = { left: 58, right: 74, top: 32, bottom: 66 };
    const plotW = W - margin.left - margin.right;
    const plotH = H - margin.top - margin.bottom;
    const x = (time) => margin.left + ((time - START) / (END - START)) * plotW;
    const y = (score) => margin.top + (1 - score / 100) * plotH;

    const defs = svgEl("defs");
    COMPANY_ORDER.forEach((key) => {
      const gradient = svgEl("linearGradient", { id: `fill-${key}`, x1: "0", y1: "0", x2: "0", y2: "1" });
      gradient.append(svgEl("stop", { offset: "0%", "stop-color": companies[key].color, "stop-opacity": ".7" }));
      gradient.append(svgEl("stop", { offset: "100%", "stop-color": companies[key].color, "stop-opacity": "0" }));
      defs.append(gradient);
    });
    svg.append(defs);

    [0, 25, 50, 75, 100].forEach((score) => {
      svg.append(svgEl("line", { x1: margin.left, x2: W - margin.right, y1: y(score), y2: y(score), class: `chart-grid ${score === 0 || score === 100 ? "major" : ""}` }));
      svg.append(svgEl("text", { x: margin.left - 14, y: y(score) + 4, "text-anchor": "end", class: "chart-tick" }, String(score)));
    });

    // Dynamic year grid based on actual timeline
    const startYear = new Date(START).getUTCFullYear();
    const endYear = new Date(END).getUTCFullYear();
    for (let year = startYear + 1; year <= endYear; year++) {
      const time = Date.UTC(year, 0, 1);
      const xpos = x(time);
      svg.append(svgEl("line", { x1: xpos, x2: xpos, y1: margin.top, y2: H - margin.bottom, class: "chart-grid" }));
      svg.append(svgEl("text", { x: xpos, y: H - margin.bottom + 25, "text-anchor": "middle", class: "chart-tick year" }, String(year)));
    }
    // Dynamic axis labels
    const startDate = new Date(START);
    const endDate = new Date(END);
    const startLabel = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() + " '" + String(startDate.getUTCFullYear()).slice(-2);
    const endLabel = endDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() + " '" + String(endDate.getUTCFullYear()).slice(-2);
    svg.append(svgEl("text", { x: margin.left, y: H - margin.bottom + 25, "text-anchor": "start", class: "chart-tick year" }, startLabel));
    svg.append(svgEl("text", { x: W - margin.right, y: H - margin.bottom + 25, "text-anchor": "end", class: "chart-tick year" }, endLabel));

    COMPANY_ORDER.forEach((key) => {
      const company = companies[key];
      const list = modelsByCompany[key];
      let bestScore = -1;
      const frontierPoints = [];
      list.forEach((m) => {
        const s = scoreOf(m);
        if (s == null) return;
        if (s >= bestScore) {
          bestScore = s;
          frontierPoints.push({ time: m.date, score: s, model: m });
        }
      });
      if (!frontierPoints.length) return;

      let path = `M ${x(frontierPoints[0].time)} ${y(frontierPoints[0].score)}`;
      for (let i = 1; i < frontierPoints.length; i++) {
        path += ` H ${x(frontierPoints[i].time)} V ${y(frontierPoints[i].score)}`;
      }
      path += ` H ${x(END)}`;
      const area = `${path} L ${x(END)} ${y(0)} L ${x(frontierPoints[0].time)} ${y(0)} Z`;
      svg.append(svgEl("path", { d: area, fill: `url(#fill-${key})`, class: "chart-area" }));
      svg.append(svgEl("path", { d: path, stroke: company.color, class: "chart-path-halo" }));
      const line = svgEl("path", { d: path, stroke: company.color, class: `chart-path ${state.profile === "context" ? "context-path" : ""}` });
      line.style.color = company.color;
      svg.append(line);

      list.forEach((m) => {
        const modelScore = scoreOf(m);
        if (modelScore == null) return;
        const selected = state.selected[key] === m.id;
        const latest = m.id === company.current;
        const px = x(m.date), py = y(modelScore);
        const g = svgEl("g", { "data-model-point": m.id, tabindex: "0", role: "button", "aria-label": `${company.name} ${m.name}, ${scoreText(modelScore)} ${PROFILE_LABELS[state.profile]} score` });
        g.style.color = company.color;
        g.append(svgEl("circle", { cx: px, cy: py, r: selected ? 7 : 4.2, stroke: company.color, class: `chart-point ${latest ? "latest" : ""}` }));
        g.append(svgEl("circle", { cx: px, cy: py, r: 13, class: "chart-point-hit" }));
        if (selected) g.append(svgEl("circle", { cx: px, cy: py, r: 12, fill: "none", stroke: company.color, "stroke-opacity": ".35", "stroke-width": "1", "stroke-dasharray": "2 3" }));
        svg.append(g);
      });

      const selected = modelById.get(state.selected[key]);
      const selectedScore = scoreOf(selected);
      if (selectedScore != null) {
        const px = x(selected.date), py = y(selectedScore);
        const boxW = 150, boxH = 43;
        const bx = clamp(px + 12, margin.left + 4, W - margin.right - boxW);
        const by = clamp(py - 50, margin.top + 4, H - margin.bottom - boxH - 3);
        const label = svgEl("g", { "pointer-events": "none" });
        label.append(svgEl("rect", { x: bx, y: by, width: boxW, height: boxH, rx: 6, stroke: company.color, "stroke-opacity": ".28", class: "chart-label-bg" }));
        label.append(svgEl("text", { x: bx + 10, y: by + 15, fill: company.color, class: "chart-label-company" }, company.name.toUpperCase()));
        label.append(svgEl("text", { x: bx + 10, y: by + 31, class: "chart-label-model" }, selected.name.length > 19 ? `${selected.name.slice(0, 18)}…` : selected.name));
        label.append(svgEl("text", { x: bx + boxW - 10, y: by + 28, fill: company.color, "text-anchor": "end", class: "chart-label-score" }, scoreText(selectedScore)));
        svg.append(label);
      }
    });

    $$('[data-model-point]', svg).forEach((point) => {
      const show = (event) => showChartTooltip(event, modelById.get(point.dataset.modelPoint));
      point.addEventListener("pointerenter", show);
      point.addEventListener("pointermove", show);
      point.addEventListener("pointerleave", hideChartTooltip);
      point.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openModelDialog(point.dataset.modelPoint);
      });
      point.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          openModelDialog(point.dataset.modelPoint);
        }
      });
    });
  }

  function showChartTooltip(event, m) {
    const tooltip = $("#chartTooltip");
    const company = companies[m.company];
    tooltip.style.setProperty("--tt-color", company.color);
    const score = scoreOf(m);
    const meta = profileMeta();
    const metric = meta?.type === "category" ? PHASE1.getMetric(m, state.profile) : null;
    tooltip.innerHTML = `
      <div class="tt-top"><span>${company.name}</span><span>${fmtDate(m.date)}</span></div>
      <h3>${escapeHtml(m.name)}</h3>
      <p>${escapeHtml(m.summary)}</p>
      ${metric ? `<p class="tt-raw">${escapeHtml(PHASE1.metricDisplay(metric))} · ${escapeHtml(metric.confidence)} confidence</p>` : ""}
      <div class="tt-score"><span>${PROFILE_LABELS[state.profile]}</span><b>${scoreText(score)}${score == null ? "" : " / 100"}</b></div>`;
    tooltip.hidden = false;
    const pad = 14;
    const rect = tooltip.getBoundingClientRect();
    const left = clamp(event.clientX + 14, pad, window.innerWidth - rect.width - pad);
    const top = clamp(event.clientY + 14, pad, window.innerHeight - rect.height - pad);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function hideChartTooltip() {
    $("#chartTooltip").hidden = true;
  }

  function renderGraphUI() {
    const options = PHASE1.profileOptionsHtml(state.profile);
    if ($("#graphProfile")) {
      $("#graphProfile").innerHTML = options;
      $("#graphProfile").value = state.profile;
    }
    if ($("#raceProfile") && !$("#raceProfile").options.length) $("#raceProfile").innerHTML = options;
    const meta = profileMeta();
    if ($("#profileDescription")) {
      $("#profileDescription").textContent = meta?.type === "championship"
        ? `${meta.description}. Requires all weighted metrics; incomplete models show N/A.`
        : `${meta?.anchor || "Fixed-anchor score"}. ${meta?.availability === "measured" ? "Current measured records only." : "Historical evidence available."}`;
    }
    renderModelGrid();
    renderRankSummary();
    renderChart();
    renderLegend();
  }

  function buildRaceLanes() {
    const laneHost = $("#raceLanes");
    if (!laneHost) return;
    laneHost.innerHTML = COMPANY_ORDER.map((key) => {
      const company = companies[key];
      return `
        <div class="race-lane" data-lane="${key}" style="--company:${company.color}">
          <span class="lane-company">${company.name.toUpperCase()}</span>
          <span class="lane-model-tag" data-lane-model>IN THE GARAGE</span>
          <div class="lane-car-wrap is-garaged" data-car="${key}">
            <div class="race-car" role="button" tabindex="0" aria-label="Inspect ${company.name}'s current race model">
              <span class="car-pace-badge" data-car-score>PIT</span>
              <i class="car-flame"></i><i class="car-shadow"></i><i class="car-wing"></i><i class="car-cabin"></i><i class="car-body"></i><i class="car-nose"></i>
              <i class="car-wheel back"></i><i class="car-wheel front"></i><b class="car-number">${company.number}</b>
            </div>
          </div>
        </div>`;
    }).join("");

    $$('[data-car]').forEach((wrap) => {
      const inspect = () => {
        const m = getBestAt(wrap.dataset.car, raceTime(), state.profile);
        if (m) openModelDialog(m.id);
        else showToast(`${companies[wrap.dataset.car].name} has not entered the circuit yet.`);
      };
      $(".race-car", wrap).addEventListener("click", inspect);
      $(".race-car", wrap).addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); inspect(); }
      });
    });
  }

  function raceTime() {
    return START + state.raceProgress * (END - START);
  }

  function setRaceProgress(progress, { checkMilestones = false } = {}) {
    const oldTime = state.lastRaceTime;
    const oldProgress = state.raceProgress;
    state.raceProgress = clamp(progress, 0, 1);
    const newTime = raceTime();
    if (checkMilestones && isCurrentSkillsProfile()) triggerCurrentSkillsSpectacles(oldProgress, state.raceProgress);
    if (checkMilestones && !isCurrentSkillsProfile() && newTime > oldTime) triggerCrossedMilestones(oldTime, newTime);
    state.lastRaceTime = newTime;
    updateRaceUI();
    if (state.raceProgress >= 1 && !state.raceFinished) finishRace();
  }

  function updateRaceUI() {
    const time = raceTime();
    const skillsMode = isCurrentSkillsProfile();
    const judgingTime = skillsMode ? END : time;
    const dateObj = new Date(judgingTime);
    $("#raceDate").textContent = skillsMode ? "23 JUL 2026 · CURRENT" : fmtDate(time, true);
    $("#raceYearBig").textContent = skillsMode ? "SKILL" : String(dateObj.getUTCFullYear());
    $("#raceMonthBig").textContent = skillsMode ? "CUP" : dateObj.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }).toUpperCase();
    $("#raceModeKicker").textContent = skillsMode ? "CURRENT SKILLS CIRCUIT · ALL ENTRANTS ON GRID" : "EVIDENCE CIRCUIT · FIVE-YEAR PLAYBACK";
    // Dynamic timeline labels based on actual START/END
    const startLabel = fmtDate(START, true);
    const endLabel = fmtDate(END, true);
    $("#timelineStartLabel").textContent = skillsMode ? "START GRID" : startLabel;
    $("#timelineEndLabel").textContent = skillsMode ? "CHEQUERED FLAG" : endLabel;
    // Dynamic year ticks
    const sYear = new Date(START).getUTCFullYear();
    const eYear = new Date(END).getUTCFullYear();
    const yearTicks = [];
    for (let y = sYear; y <= eYear; y++) yearTicks.push(String(y));
    const tickLabels = skillsMode ? ["GRID", "SECTOR 1", "SECTOR 2", "SECTOR 3", "SECTOR 4", "FLAG"] : yearTicks;
    // Dynamically populate year ticks
    const tickContainer = $("#timelineTicks");
    tickContainer.innerHTML = tickLabels.map(label => `<span>${label}</span>`).join("");
    $("#raceScrubber").value = Math.round(state.raceProgress * 1000);
    $("#raceScrubber").style.setProperty("--progress", `${state.raceProgress * 100}%`);
    $("#raceProfileLabel").textContent = PROFILE_LABELS[state.profile].toUpperCase();
    $("#raceProfile").value = state.profile;
    $("#raceSpeed").value = String(state.raceSpeed);
    $("#raceRuleNote").textContent = skillsMode
      ? "Current Skills Circuit: every company starts with its best comparable measured model. No empty historical sectors or invented backfill."
      : "Forward-only race physics: cars never reverse or pause for a score change. Camera cuts never alter position.";

    const rankings = getRankingsAt(judgingTime, state.profile);
    const active = rankings.filter((r) => r.model);
    const physicalLeader = window.mgp3d?.getPhysicalLeader?.();
    const leaderKey = physicalLeader || active[0]?.company || null;
    $("#raceLeader").textContent = leaderKey ? companies[leaderKey].name.toUpperCase() : "IN THE PITS";

    COMPANY_ORDER.forEach((key) => {
      const best = getBestAt(key, judgingTime, state.profile);
      const car = $(`[data-car="${key}"]`);
      const lane = $(`[data-lane="${key}"]`);
      const leader = active[0]?.company === key;
      if (!car || !lane) return;
      car.classList.toggle("is-garaged", !best);
      car.classList.toggle("is-leading", leader && Boolean(best));
      if (best) {
        const bestScore = scoreOf(best);
        const position = 5.5 + bestScore * .82;
        car.style.left = `${position}%`;
        $("[data-car-score]", car).textContent = `${scoreText(bestScore)} SCORE`;
        $("[data-lane-model]", lane).textContent = best.name.toUpperCase();
      } else {
        car.style.left = "1%";
        $("[data-car-score]", car).textContent = "PIT";
        $("[data-lane-model]", lane).textContent = "IN THE GARAGE";
      }
    });

    const evidenceRankMap = competitionRanks(rankings.filter((r) => r.model), (r) => scoreOf(r.model), (r) => r.company);
    $("#raceLeaderboard").innerHTML = rankings.map((r) => {
      const company = companies[r.company];
      const evidenceRank = evidenceRankMap.get(r.company);
      return `<div class="race-rank" style="--company:${company.color}">
        <div class="race-rank-top"><span class="race-rank-position">${evidenceRank ? `${evidenceRank.tied ? "=" : ""}${evidenceRank.rank}` : "—"}</span><span class="race-rank-company">${company.name}</span><span class="race-rank-score">${r.model ? scoreText(scoreOf(r.model)) : "N/A"}</span></div>
        <p class="race-rank-model">${r.model ? escapeHtml(r.model.name) : "Not yet on track"}</p>
      </div>`;
    }).join("");

    const racePayload = {
      time: judgingTime,
      mode: skillsMode ? "current-skills" : "history",
      progress: state.raceProgress,
      running: state.raceRunning,
      speed: state.raceSpeed,
      profile: state.profile,
      leader: active[0]?.company || null,
      racers: COMPANY_ORDER.map((key) => {
        const best = getBestAt(key, judgingTime, state.profile);
        return {
          key,
          name: companies[key].name,
          color: companies[key].color,
          active: Boolean(best),
          score: best ? scoreOf(best) : 0,
          model: best ? best.name : "In the garage"
        };
      })
    };
    window.mgp3d?.updateRace(racePayload);
    window.mgpAudio?.updateRace(racePayload);
  }

  function triggerCurrentSkillsSpectacles(oldProgress, newProgress) {
    const events = CURRENT_SKILLS_SPECTACLES[state.profile] || [];
    if (!events.length || !window.mgp3d) return;
    const profileRankings = getRankingsAt(END, state.profile).filter((entry) => entry.model);
    events.forEach((event, eventIndex) => {
      if (!(oldProgress < event.at && newProgress >= event.at) && !(oldProgress === 0 && newProgress >= event.at)) return;
      let entrants = event.all ? profileRankings : event.winnerOnly ? profileRankings.slice(0, 1) : profileRankings;
      if (event.openOnly) entrants = profileRankings.filter((entry) => (scoreOf(entry.model, "openness") || 0) >= 80);
      entrants.forEach((entry, entrantIndex) => {
        const triggerKey = `${state.profile}:${eventIndex}:${entry.company}:${entry.model.id}`;
        if (state.skillsSpectaclesTriggered.has(triggerKey)) return;
        state.skillsSpectaclesTriggered.add(triggerKey);
        const metric = PHASE1.getMetric(entry.model, event.metric);
        window.mgp3d.performStunt(entry.company, {
          type: event.type,
          modelId: `skills:${triggerKey}`,
          model: entry.model.name,
          name: event.name,
          category: event.category,
          categoryScore: scoreOf(entry.model, event.metric) ?? scoreOf(entry.model, state.profile),
          rawEvidence: metric ? PHASE1.metricDisplay(metric) : `${PROFILE_LABELS[state.profile]} ${scoreText(scoreOf(entry.model, state.profile))}/100`,
          sourceIds: metric?.sourceIds || entry.model.sources,
          description: event.description,
          priority: 80 - entrantIndex,
          expiresAfterProgress: 0.55
        });
      });
    });
  }

  function triggerCrossedMilestones(oldTime, newTime) {
    const crossed = models.filter((m) => m.date > oldTime && m.date <= newTime).sort((a, b) => a.date - b.date);
    if (!crossed.length) return;
    crossed.forEach((model) => triggerMilestone(model));
  }

  function previousBestBefore(m, profile = state.profile) {
    return getBestAt(m.company, m.date - DAY, profile);
  }

  function triggerMilestone(m) {
    const company = companies[m.company];
    const currentScore = scoreOf(m);
    if (currentScore == null) return;
    const previous = previousBestBefore(m);
    const before = previous ? scoreOf(previous) : 0;
    const after = Math.max(before, currentScore);
    const delta = after - before;
    const car = $(`[data-car="${m.company}"]`);
    if (car) {
      car.classList.remove("is-boosting");
      void car.offsetWidth;
      car.classList.add("is-boosting");
      window.setTimeout(() => car.classList.remove("is-boosting"), 950);
    }
    const boostDetail = { model: m.name, delta, score: after };
    window.mgp3d?.boost(m.company, boostDetail);
    window.mgpAudio?.boost(m.company, boostDetail);
    const stunt = STUNT_EVENTS[m.id];
    if (stunt) {
      const stuntMetric = PHASE1.getMetric(m, stunt.metric);
      window.mgp3d?.performStunt(m.company, {
        ...stunt,
        model: m.name,
        modelId: m.id,
        categoryScore: scoreOf(m, stunt.metric),
        rawEvidence: PHASE1.metricDisplay(stuntMetric)
      });
    }

    state.currentMilestone = m.id;
    const card = $("#milestoneCard");
    const majorUpgrade = !previous || delta >= 3;
    if (!majorUpgrade) {
      card.hidden = true;
      return;
    }
    card.style.setProperty("--milestone-color", company.color);
    $("#milestoneBrand").textContent = company.name.toUpperCase();
    $("#milestoneDate").textContent = fmtDate(m.date);
    $("#milestoneModel").textContent = m.name;
    $("#milestoneText").textContent = m.summary;
    $("#milestoneDelta").textContent = `+${scoreText(delta)}`;
    card.hidden = false;
    clearTimeout(state.milestoneTimer);
    state.milestoneTimer = window.setTimeout(() => { card.hidden = true; }, 2400 / state.raceSpeed);
  }

  function raceFrame(timestamp) {
    if (!state.raceRunning) return;
    if (!state.lastFrame) state.lastFrame = timestamp;
    // Cap simulation catch-up so a busy GPU slows the clock instead of making cars jump.
    const delta = Math.min(timestamp - state.lastFrame, 64);
    state.lastFrame = timestamp;
    setRaceProgress(state.raceProgress + delta / (RACE_DURATION / state.raceSpeed), { checkMilestones: true });
    if (state.raceRunning && state.raceProgress < 1) state.raceRaf = requestAnimationFrame(raceFrame);
  }

  function playRace({ skipCountdown = false } = {}) {
    if (state.raceFinished) resetRace();
    if (state.raceRunning) return;
    
    // Only start garage sequence on fresh race (not when resuming from pause, mid-race, or after countdown)
    const shouldPlayGarageSequence = !skipCountdown && !state.raceStarted && state.raceProgress === 0 && window.mgp3d?.startGarageSequence;
    
    if (shouldPlayGarageSequence) {
      window.mgp3d.startGarageSequence();
    }
    
    // Wait for garage sequence to finish before countdown
    const sequenceDelay = shouldPlayGarageSequence ? 23000 : 0; // 23 seconds for full garage sequence
    
    setTimeout(() => {
      if (!state.raceStarted && state.raceProgress === 0 && !skipCountdown) {
        runCountdown();
        return;
      }
      state.raceStarted = true;
      state.raceRunning = true;
      if (isCurrentSkillsProfile() && state.raceProgress > 0) triggerCurrentSkillsSpectacles(0, state.raceProgress);
      state.lastFrame = 0;
      $("#raceView").classList.add("race-running");
      $("#playRace").setAttribute("aria-label", "Pause race");
      window.mgp3d?.setRunning(true);
      window.mgpAudio?.setRunning(true);
      state.raceRaf = requestAnimationFrame(raceFrame);
    }, skipCountdown ? 0 : sequenceDelay);
  }

  function pauseRace() {
    state.raceRunning = false;
    cancelAnimationFrame(state.raceRaf);
    $("#raceView").classList.remove("race-running");
    $("#playRace").setAttribute("aria-label", "Play race");
    window.mgp3d?.setRunning(false);
    window.mgpAudio?.setRunning(false);
  }

  function toggleRace() {
    if (state.raceRunning) pauseRace(); else playRace();
  }

  function runCountdown() {
    clearCountdown();
    const box = $("#raceCountdown");
    box.hidden = false;
    const sequence = ["3", "2", "1", "GO"];
    sequence.forEach((value, index) => {
      const timer = window.setTimeout(() => {
        box.textContent = value;
        window.mgpAudio?.countdown(value);
        if (value === "GO") {
          const done = window.setTimeout(() => { box.hidden = true; playRace({ skipCountdown: true }); }, 450);
          state.countdownTimers.push(done);
        }
      }, index * 580);
      state.countdownTimers.push(timer);
    });
  }

  function clearCountdown() {
    state.countdownTimers.forEach(clearTimeout);
    state.countdownTimers = [];
    $("#raceCountdown").hidden = true;
  }

  function resetRace() {
    pauseRace();
    clearCountdown();
    state.raceStarted = false;
    state.raceFinished = false;
    state.currentMilestone = null;
    state.skillsSpectaclesTriggered.clear();
    state.lastRaceTime = START;
    $("#raceFinish").hidden = true;
    $("#milestoneCard").hidden = true;
    window.mgp3d?.reset();
    window.mgpAudio?.reset();
    setRaceProgress(0);
  }

  function finishRace() {
    pauseRace();
    state.raceFinished = true;
    const rankings = getRankingsAt(END, state.profile);
    const scored = rankings.filter((r) => r.model && scoreOf(r.model) != null);
    const winner = scored[0];
    const topScore = scoreOf(winner.model);
    const coWinners = scored.filter((r) => Math.abs(scoreOf(r.model) - topScore) <= 0.05);
    const podiumRanks = competitionRanks(scored, (r) => scoreOf(r.model), (r) => r.company);
    if (coWinners.length > 1) {
      $("#winnerName").textContent = `DEAD HEAT · ${coWinners.map((r) => companies[r.company].name.toUpperCase()).join(" / ")}`;
      $("#winnerModel").textContent = `${coWinners.map((r) => r.model.name).join(" · ")} · ${scoreText(topScore)} ${PROFILE_LABELS[state.profile]} score`;
    } else {
      $("#winnerName").textContent = `${companies[winner.company].name.toUpperCase()} TAKES THE FLAG`;
      $("#winnerModel").textContent = `${winner.model.name} · ${scoreText(topScore)} ${PROFILE_LABELS[state.profile]} score`;
    }
    $("#podium").innerHTML = rankings.map((r) => {
      const rank = podiumRanks.get(r.company);
      return `<div class="podium-step" style="--company:${companies[r.company].color}">
        <b>${rank ? `${rank.tied ? "=" : ""}P${rank.rank}` : "N/A"} · ${companies[r.company].name}</b>
        <small>${r.model ? `${r.model.name} · ${scoreText(scoreOf(r.model))}` : "No comparable data"}</small>
      </div>`;
    }).join("");
    const winnerKeys = coWinners.map((r) => r.company);
    window.mgp3d?.finish(winnerKeys);
    window.mgpAudio?.finish(winnerKeys[0]);
    window.setTimeout(() => { $("#raceFinish").hidden = false; }, 2200);
  }

  function goToRace({ autoplay = false } = {}) {
    if (state.view === "race") { window.mgp3d?.activate(); window.mgpAudio?.activate(); if (autoplay) playRace(); return; }
    hideChartTooltip();
    state.view = "race";
    $("#app").classList.add("switching");
    window.setTimeout(() => {
      $("#graphView").classList.remove("is-active");
      $("#graphView").setAttribute("aria-hidden", "true");
      $("#raceView").classList.add("is-active");
      $("#raceView").setAttribute("aria-hidden", "false");
      $("#graphTab").classList.remove("is-active");
      $("#graphTab").setAttribute("aria-selected", "false");
      $("#raceTab").classList.add("is-active");
      $("#raceTab").setAttribute("aria-selected", "true");
      $("#app").classList.remove("switching");
      $("#raceTitle").textContent = state.title;
      window.mgp3d?.activate();
      window.mgpAudio?.activate();
      updateRaceUI();
      if (autoplay) window.setTimeout(() => playRace(), 350);
    }, 470);
  }

  function goToGraph() {
    if (state.view === "graph") return;
    pauseRace();
    clearCountdown();
    window.mgp3d?.deactivate();
    window.mgpAudio?.deactivate();
    state.view = "graph";
    $("#raceView").classList.remove("is-active");
    $("#raceView").setAttribute("aria-hidden", "true");
    $("#graphView").classList.add("is-active");
    $("#graphView").removeAttribute("aria-hidden");
    $("#raceTab").classList.remove("is-active");
    $("#raceTab").setAttribute("aria-selected", "false");
    $("#graphTab").classList.add("is-active");
    $("#graphTab").setAttribute("aria-selected", "true");
  }

  function openModelDialog(modelId) {
    const m = modelById.get(modelId);
    if (!m) return;
    const company = companies[m.company];
    const activeMeta = profileMeta();
    const activeMetric = activeMeta?.type === "category" ? PHASE1.getMetric(m, state.profile) : null;
    const categoryCards = Object.entries(PHASE1.CATEGORY_DEFINITIONS).map(([key, definition]) => {
      const record = PHASE1.getMetric(m, key);
      const score = scoreOf(m, key);
      return `<div class="detail-score ${score == null ? "is-missing" : ""}" title="${record ? escapeHtml(PHASE1.metricDisplay(record)) : "No comparable measurement"}"><small>${escapeHtml(definition.short)}</small><b>${scoreText(score)}</b></div>`;
    }).join("");
    const cupCards = Object.entries(PHASE1.CHAMPIONSHIPS).map(([key, cup]) => `<div class="detail-score cup ${scoreOf(m, key) == null ? "is-missing" : ""}"><small>${escapeHtml(cup.short)}</small><b>${scoreText(scoreOf(m, key))}</b></div>`).join("");

    let auditHtml = "";
    let activeSourceIds = [];
    if (activeMetric) {
      activeSourceIds = activeMetric.sourceIds || [];
      auditHtml = `<div class="metric-audit">
        <div class="metric-audit-head"><span>${escapeHtml(activeMeta.label)}</span><b>${scoreText(activeMetric.score)} / 100</b></div>
        <dl>
          <div><dt>Raw evidence</dt><dd>${escapeHtml(PHASE1.metricDisplay(activeMetric))}</dd></div>
          <div><dt>Source type</dt><dd>${escapeHtml(activeMetric.sourceType)}</dd></div>
          <div><dt>Configuration</dt><dd>${escapeHtml(activeMetric.config)}</dd></div>
          <div><dt>Measured / released</dt><dd>${escapeHtml(activeMetric.measuredAt)}</dd></div>
          <div><dt>Confidence</dt><dd>${escapeHtml(activeMetric.confidence)}</dd></div>
        </dl>
        <p>${escapeHtml(activeMetric.note || "")}</p>
      </div>`;
    } else if (activeMeta?.type === "championship") {
      const rows = Object.entries(activeMeta.weights).map(([key, weight]) => `<div><span>${escapeHtml(PROFILE_LABELS[key])} · ${weight}%</span><b>${scoreText(scoreOf(m, key))}</b></div>`).join("");
      auditHtml = `<div class="metric-audit"><div class="metric-audit-head"><span>${escapeHtml(activeMeta.label)}</span><b>${scoreText(scoreOf(m, state.profile))} / 100</b></div><div class="cup-breakdown">${rows}</div><p>${escapeHtml(activeMeta.description)}. All weighted metrics are required; missing evidence produces N/A.</p></div>`;
    } else {
      auditHtml = `<div class="metric-audit is-missing"><div class="metric-audit-head"><span>${escapeHtml(activeMeta?.label || "Metric")}</span><b>N/A</b></div><p>No comparable measurement is stored for this model and configuration. The system does not infer one.</p></div>`;
    }

    const sourceIds = [...new Set([...(m.sources || []), ...activeSourceIds])];
    const links = sourceIds.map((id) => sources.find((s) => s.id === id)).filter(Boolean).map((s) => `<a href="${s.url}" target="_blank" rel="noopener">Source ${s.id} ↗</a>`).join("");
    $("#modelDialogBody").innerHTML = `
      <div class="model-detail-hero" style="--detail-color:${company.color}">
        <span class="detail-company">${company.name.toUpperCase()} · ${fmtDate(m.date)}</span>
        <h2>${escapeHtml(m.name)}</h2>
        <p>${escapeHtml(m.summary)}</p>
        <div class="detail-score-grid phase1-grid">${categoryCards}</div>
      </div>
      <div class="model-detail-body" style="--detail-color:${company.color}">
        <h3>Active judging audit</h3>
        ${auditHtml}
        <h3 class="section-gap">Championship presets</h3>
        <div class="detail-score-grid cup-grid">${cupCards}</div>
        <h3 class="section-gap">Research note</h3>
        <p>${escapeHtml(m.evidence)}</p>
        <div class="detail-evidence">
          <div class="detail-evidence-top"><span>Phase 1 evidence record</span><span class="confidence-badge">${m.confidence} base confidence</span></div>
          <p>Scores use fixed anchors. Operational records retain raw values, configuration, measurement date and source type. N/A means no comparable record—not zero performance.</p>
        </div>
        <div class="detail-source-links">${links}</div>
      </div>`;
    const dialog = $("#modelDialog");
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  function closeModelDialog() {
    const dialog = $("#modelDialog");
    if (dialog.open) dialog.close();
  }

  function renderSources() {
    if ($("#sourceCount")) $("#sourceCount").textContent = String(sources.length);
    const grouped = sources.reduce((acc, source) => {
      (acc[source.group] ||= []).push(source);
      return acc;
    }, {});
    $("#sourceList").innerHTML = Object.entries(grouped).map(([group, items]) => `
      <section class="source-group">
        <h3>${escapeHtml(group)}</h3>
        ${items.map((source) => `
          <a class="source-item" href="${source.url}" target="_blank" rel="noopener">
            <span class="source-number">${String(source.id).padStart(2, "0")}</span>
            <span><b>${escapeHtml(source.title)}</b><small>${escapeHtml(source.url.replace(/^https?:\/\//, ""))}</small></span>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 13 14 6m-5 0h5v5M13 11v4H5V7h4"/></svg>
          </a>`).join("")}
      </section>`).join("");
  }

  function openDrawer(id) {
    closeDrawers();
    const drawer = $(id);
    $("#scrim").hidden = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    window.setTimeout(() => $("[data-close-drawer]", drawer)?.focus(), 200);
  }

  function closeDrawers() {
    $$(".drawer.is-open").forEach((drawer) => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    });
    $("#scrim").hidden = true;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  function setRaceSpeed(speed, announce = true) {
    const value = SPEED_LEVELS.includes(Number(speed)) ? Number(speed) : 1;
    state.raceSpeed = value;
    if ($("#raceSpeed")) $("#raceSpeed").value = String(value);
    if ($("#raceView").classList.contains("is-active")) updateRaceUI();
    if (announce) showToast(`Race speed ${value}×`);
  }

  function stepRaceSpeed(direction) {
    const index = SPEED_LEVELS.indexOf(state.raceSpeed);
    const next = SPEED_LEVELS[clamp(index + direction, 0, SPEED_LEVELS.length - 1)];
    setRaceSpeed(next);
  }

  function setProfile(profile, source = "graph") {
    if (!PROFILE_LABELS[profile]) return;
    if (state.profile !== profile) state.skillsSpectaclesTriggered.clear();
    state.profile = profile;
    renderGraphUI();
    updateRaceUI();
    if (state.raceFinished) {
      state.raceFinished = false;
      $("#raceFinish").hidden = true;
      if (state.raceProgress >= 1) finishRace();
    }
    if (source === "keyboard") showToast(`Track profile: ${PROFILE_LABELS[profile]}`);
  }

  function bindEvents() {
    $("#graphTitle").value = state.title;
    $("#stageTitle").textContent = state.title;
    $("#raceTitle").textContent = state.title;
    $("#graphTitle").addEventListener("input", (event) => {
      state.title = event.target.value.trim() || "UNTITLED MODEL RACE";
      $("#stageTitle").textContent = state.title;
      $("#raceTitle").textContent = state.title;
      document.title = `${state.title} — Model Grand Prix`;
      try { localStorage.setItem("mgp-title", state.title); } catch { /* storage is optional */ }
    });

    $("#graphProfile").addEventListener("change", (event) => setProfile(event.target.value));

    $("#resetModels").addEventListener("click", () => {
      COMPANY_ORDER.forEach((key) => { state.selected[key] = companies[key].current; });
      renderGraphUI();
      showToast("Current flagship grid restored.");
    });

    $("#chartShell").addEventListener("click", (event) => {
      if (event.target.closest("[data-model-point]")) return;
      goToRace({ autoplay: true });
    });
    $("#chartShell").addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !event.target.closest("[data-model-point]")) {
        event.preventDefault();
        goToRace({ autoplay: true });
      }
    });

    $("#graphTab").addEventListener("click", goToGraph);
    $("#raceTab").addEventListener("click", () => goToRace());
    $("#backToGraph").addEventListener("click", goToGraph);
    $("#finishToGraph").addEventListener("click", goToGraph);
    $("#brandHome").addEventListener("click", (event) => { event.preventDefault(); goToGraph(); });

    $("#playRace").addEventListener("click", toggleRace);
    $("#replayRace").addEventListener("click", () => { resetRace(); playRace(); });
    $("#raceScrubber").addEventListener("input", (event) => {
      pauseRace();
      clearCountdown();
      state.raceStarted = Number(event.target.value) > 0;
      state.raceFinished = false;
      $("#raceFinish").hidden = true;
      state.lastRaceTime = raceTime();
      setRaceProgress(Number(event.target.value) / 1000);
    });

    $("#raceSpeed").addEventListener("change", (event) => setRaceSpeed(event.target.value));
    $("#raceProfile").addEventListener("change", (event) => setProfile(event.target.value));
    $("#inspectMilestone").addEventListener("click", () => state.currentMilestone && openModelDialog(state.currentMilestone));

    $("#sourcesButton").addEventListener("click", () => openDrawer("#sourcesDrawer"));
    $("#methodButton").addEventListener("click", () => openDrawer("#methodDrawer"));
    $$('[data-open-method]').forEach((button) => button.addEventListener("click", () => openDrawer("#methodDrawer")));
    $$('[data-close-drawer]').forEach((button) => button.addEventListener("click", closeDrawers));
    $("#scrim").addEventListener("click", closeDrawers);
    $("#openResearchNotes").addEventListener("click", () => window.open("research-notes.md", "_blank", "noopener"));

    $("#closeModelDialog").addEventListener("click", closeModelDialog);
    $("#shortcutButton").addEventListener("click", () => $("#shortcutDialog").showModal());
    $("#closeShortcuts").addEventListener("click", () => $("#shortcutDialog").close());

    // Fullscreen mode toggle
    const fullscreenToggle = $("#fullscreenToggle");
    if (fullscreenToggle) {
      fullscreenToggle.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().then(() => {
            document.body.classList.add("fullscreen-mode");
            fullscreenToggle.classList.add("is-active");
            showToast("Fullscreen mode enabled");
          }).catch((err) => {
            console.error("Fullscreen error:", err);
            showToast("Could not enable fullscreen");
          });
        } else {
          document.exitFullscreen().then(() => {
            document.body.classList.remove("fullscreen-mode");
            fullscreenToggle.classList.remove("is-active");
            showToast("Fullscreen mode disabled");
          });
        }
      });

      // Listen for fullscreen changes
      document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
          document.body.classList.remove("fullscreen-mode");
          fullscreenToggle.classList.remove("is-active");
        }
      });
    }

    // Theater mode toggle
    const theaterToggle = $("#theaterToggle");
    if (theaterToggle) {
      theaterToggle.addEventListener("click", () => {
        document.body.classList.toggle("theater-mode");
        theaterToggle.classList.toggle("is-active");
        const isTheater = document.body.classList.contains("theater-mode");
        showToast(isTheater ? "Theater mode enabled" : "Theater mode disabled");
      });
    }

    window.addEventListener("keydown", (event) => {
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
      if (event.key === "Escape") { closeDrawers(); closeModelDialog(); if ($("#shortcutDialog").open) $("#shortcutDialog").close(); return; }
      
      // F11 for fullscreen (works even when typing)
      if (event.key === "F11") {
        event.preventDefault();
        const fullscreenToggle = $("#fullscreenToggle");
        if (fullscreenToggle) fullscreenToggle.click();
        return;
      }
      
      if (typing || state.view !== "race") return;
      if (event.code === "Space") { event.preventDefault(); toggleRace(); }
      if (event.key === "ArrowLeft") { pauseRace(); setRaceProgress(state.raceProgress - (90 * DAY) / (END - START)); }
      if (event.key === "ArrowRight") { pauseRace(); setRaceProgress(state.raceProgress + (90 * DAY) / (END - START)); }
      if (["1", "2", "3", "4"].includes(event.key)) setProfile(KEYBOARD_PROFILES[Number(event.key) - 1], "keyboard");
      if (event.key.toLowerCase() === "c") window.mgp3d?.cycleCamera();
      if (event.key.toLowerCase() === "v") window.mgp3d?.toggleDirector();
      if (event.key.toLowerCase() === "f") window.mgp3d?.cycleFocus();
      if (event.key === "[") stepRaceSpeed(-1);
      if (event.key === "]") stepRaceSpeed(1);
      if (event.key.toLowerCase() === "m") window.mgpAudio?.toggleBgm();
      if (event.key.toLowerCase() === "n") window.mgpAudio?.toggleSfx();
      if (event.key.toLowerCase() === "t") {
        if (event.shiftKey) {
          // Shift+T for theater mode
          const theaterToggle = $("#theaterToggle");
          if (theaterToggle) theaterToggle.click();
        } else {
          // T for stunts
          window.mgp3d?.toggleStunts();
        }
      }
      if (event.key.toLowerCase() === "y") window.mgp3d?.toggleReplay();
      if (event.key.toLowerCase() === "r") { resetRace(); playRace(); }
      if (event.key.toLowerCase() === "g") goToGraph();
      if (event.key === "?") $("#shortcutDialog").showModal();
    });

    window.addEventListener("mgp3d-ready", () => {
      if (state.view === "race") window.mgp3d?.activate();
      updateRaceUI();
    });
    window.addEventListener("mgp-audio-ready", () => {
      if (state.view === "race") window.mgpAudio?.activate();
      updateRaceUI();
    });
    window.addEventListener("mgp-replay-start", (event) => {
      state.replayResume = Boolean(event.detail?.resume && state.raceRunning);
      if (state.raceRunning) pauseRace();
    });
    window.addEventListener("mgp-replay-ended", (event) => {
      const shouldResume = Boolean(event.detail?.resume && state.replayResume && state.view === "race" && !state.raceFinished);
      state.replayResume = false;
      if (shouldResume) playRace({ skipCountdown: true });
    });
    window.addEventListener("resize", hideChartTooltip);
  }

  function init() {
    renderSources();
    buildRaceLanes();
    bindEvents();
    renderGraphUI();
    updateRaceUI();
  }

  init();
})();
