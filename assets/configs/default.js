// Default Race Config - Anthropic vs OpenAI vs Moonshot AI
// This is the original 5-year AI model race

window.RACE_CONFIG = {
  name: "AI Model Grand Prix 2021-2026",
  description: "Five-year comparison of leading AI companies",
  
  companyOrder: ["anthropic", "openai", "moonshot"],
  
  companies: {
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
  },

  sources: [
    { id: 1, group: "Independent comparison", title: "Artificial Analysis — model comparison", url: "https://artificialanalysis.ai/models/" },
    { id: 2, group: "Independent comparison", title: "Artificial Analysis — Kimi K3", url: "https://artificialanalysis.ai/models/kimi-k3" },
    { id: 3, group: "Independent comparison", title: "Artificial Analysis — Kimi K3 evaluation", url: "https://artificialanalysis.ai/articles/kimi-k3-achieves-3-in-the-artificial-analysis-intelligence-index-comparable-to-opus-4-8-and-gpt-5-5" },
    { id: 4, group: "Anthropic · official", title: "Claude 2", url: "https://www.anthropic.com/news/claude-2" },
    { id: 5, group: "Anthropic · official", title: "Claude 3 family", url: "https://www.anthropic.com/news/claude-3-family" },
    { id: 6, group: "Anthropic · official", title: "Claude 3.5 Sonnet", url: "https://www.anthropic.com/news/claude-3-5-sonnet" },
    { id: 7, group: "Anthropic · official", title: "Upgraded Claude 3.5", url: "https://www.anthropic.com/news/3-5-models-and-computer-use" },
    { id: 8, group: "Anthropic · official", title: "Claude 3.7 Sonnet", url: "https://www.anthropic.com/news/claude-3-7-sonnet" },
    { id: 9, group: "Anthropic · official", title: "Claude 4", url: "https://www.anthropic.com/news/claude-4" },
    { id: 10, group: "Anthropic · official", title: "Claude Opus 4.1", url: "https://www.anthropic.com/news/claude-opus-4-1" },
    { id: 11, group: "Anthropic · official", title: "Claude Opus 4.5", url: "https://www.anthropic.com/news/claude-opus-4-5" },
    { id: 12, group: "Anthropic · official", title: "Claude Opus 4.8", url: "https://www.anthropic.com/news/claude-opus-4-8" },
    { id: 13, group: "Anthropic · official", title: "Claude Fable 5", url: "https://www.anthropic.com/news/claude-fable-5-mythos-5" },
    { id: 14, group: "Anthropic · official", title: "Claude Sonnet 5", url: "https://www.anthropic.com/news/claude-sonnet-5" },
    { id: 15, group: "OpenAI · official", title: "InstructGPT", url: "https://openai.com/index/instruction-following/" },
    { id: 16, group: "OpenAI · official", title: "GPT-4", url: "https://openai.com/index/gpt-4-research/" },
    { id: 17, group: "OpenAI · official", title: "GPT-4 Turbo", url: "https://openai.com/index/new-models-and-developer-products-announced-at-devday/" },
    { id: 18, group: "OpenAI · official", title: "GPT-4o", url: "https://openai.com/index/hello-gpt-4o/" },
    { id: 19, group: "OpenAI · official", title: "o1", url: "https://openai.com/index/learning-to-reason-with-llms/" },
    { id: 20, group: "OpenAI · official", title: "o3", url: "https://openai.com/index/introducing-o3-and-o4-mini/" },
    { id: 21, group: "OpenAI · official", title: "GPT-5", url: "https://openai.com/index/introducing-gpt-5/" },
    { id: 22, group: "OpenAI · official", title: "GPT-5.2", url: "https://openai.com/index/introducing-gpt-5-2/" },
    { id: 23, group: "OpenAI · official", title: "GPT-5.4", url: "https://openai.com/index/introducing-gpt-5-4/" },
    { id: 24, group: "OpenAI · official", title: "GPT-5.5", url: "https://openai.com/index/introducing-gpt-5-5/" },
    { id: 25, group: "OpenAI · official", title: "GPT-5.6", url: "https://openai.com/index/gpt-5-6/" },
    { id: 26, group: "Moonshot AI", title: "Moonshot AI", url: "https://www.moonshot.ai/" },
    { id: 27, group: "Moonshot AI", title: "Kimi API", url: "https://platform.moonshot.ai/" },
    { id: 28, group: "Moonshot AI", title: "Kimi K1.5", url: "https://github.com/MoonshotAI/kimi-k1.5" },
    { id: 29, group: "Moonshot AI", title: "Kimi K2", url: "https://github.com/MoonshotAI/Kimi-K2" },
    { id: 30, group: "Moonshot AI", title: "Kimi K2.5", url: "https://github.com/MoonshotAI/Kimi-K2.5" },
    { id: 31, group: "Moonshot AI", title: "Kimi K2.6", url: "https://huggingface.co/moonshotai/Kimi-K2.6" },
    { id: 32, group: "Moonshot AI", title: "Kimi K2.7 Code", url: "https://huggingface.co/moonshotai/Kimi-K2.7-Code" },
    { id: 33, group: "Moonshot AI", title: "Kimi K3", url: "https://forum.moonshot.ai/t/kimi-k3-is-here-our-most-capable-model/480" },
    { id: 34, group: "Moonshot AI", title: "Kimi 2M context", url: "https://www.scmp.com/tech/big-tech/article/3256109/alibaba-backed-moonshot-ai-claims-breakthrough-expanded-chinese-character-prompt-kimi-chatbot" },
    { id: 35, group: "Independent", title: "Claude Fable 5 analysis", url: "https://artificialanalysis.ai/models/claude-fable-5" },
    { id: 36, group: "Independent", title: "GPT-5.6 Sol analysis", url: "https://artificialanalysis.ai/models/gpt-5-6-sol" },
    { id: 37, group: "Independent", title: "Kimi K3 vs K2.5", url: "https://artificialanalysis.ai/models/comparisons/kimi-k3-vs-kimi-k2-5" },
    { id: 38, group: "Methodology", title: "Coding Agents Index", url: "https://artificialanalysis.ai/methodology/coding-agents-benchmarking" },
    { id: 39, group: "Independent", title: "Kimi K2.6 analysis", url: "https://artificialanalysis.ai/models/kimi-k2-6" },
    { id: 40, group: "Methodology", title: "Benchmark guide", url: "https://www.tonic.ai/ai-model-benchmarks" }
  ],

  stuntEvents: {
    "gpt-4o": { type: "prism-roll", metric: "multimodal", sourceIds: [18], name: "PRISM FLIP", category: "MULTIMODAL", description: "GPT-4o's text, audio and vision milestone." },
    "o1-preview": { type: "logic-leap", metric: "reasoning", sourceIds: [19], name: "LOGIC LEAP", category: "REASONING", description: "o1-preview's major reasoning jump." },
    "gpt-4-1": { type: "memory-helix", metric: "context", sourceIds: [20], name: "MEMORY TUNNEL", category: "LONG CONTEXT", description: "GPT-4.1's million-token context." },
    "o3": { type: "tool-swarm", metric: "agents", sourceIds: [20], name: "TOOL GAUNTLET", category: "AGENTS", description: "o3's combined tool use." },
    "gpt-5-2": { type: "endurance-night", metric: "agents", sourceIds: [22], name: "ENDURANCE NIGHT", category: "LONG-RUNNING AGENTS", description: "GPT-5.2's professional agent work." },
    "claude-3-opus": { type: "prism-roll", metric: "multimodal", sourceIds: [5], name: "VISION PRISM", category: "MULTIMODAL", description: "Claude 3 Opus's vision capability." },
    "claude-3-5-sonnet-v2": { type: "code-drift", metric: "coding", sourceIds: [7], name: "CODE CHICANE", category: "CODING", description: "Claude 3.5 Sonnet v2's SWE-bench gains." },
    "claude-3-7-sonnet": { type: "logic-leap", metric: "reasoning", sourceIds: [8], name: "HYBRID LEAP", category: "REASONING", description: "Claude 3.7's hybrid reasoning." },
    "claude-opus-4": { type: "tool-swarm", metric: "agents", sourceIds: [9], name: "TOOL GAUNTLET", category: "AGENTS", description: "Claude Opus 4's extended thinking with tools." },
    "claude-opus-4-5": { type: "agent-swarm", metric: "agents", sourceIds: [11], name: "AGENT SWARM", category: "MULTI-AGENT", description: "Claude Opus 4.5's subagent management." },
    "kimi-2m": { type: "memory-helix", metric: "context", sourceIds: [34], name: "2M MEMORY TUNNEL", category: "LONG CONTEXT", description: "Kimi's 2M character context." },
    "kimi-k1-5": { type: "logic-leap", metric: "reasoning", sourceIds: [28], name: "K1.5 LOGIC LEAP", category: "REASONING", description: "Kimi K1.5's reasoning leap." },
    "kimi-k2": { type: "open-gate", metric: "openness", sourceIds: [29], name: "OPEN GARAGE", category: "OPEN WEIGHTS", description: "Kimi K2's open weights." },
    "kimi-k2-5": { type: "agent-swarm", metric: "agents", sourceIds: [30], name: "AGENT SWARM", category: "MULTI-AGENT", description: "Kimi K2.5's Agent Swarm." },
    "kimi-k2-6": { type: "endurance-night", metric: "agents", sourceIds: [31], name: "ENDURANCE NIGHT", category: "LONG-HORIZON AGENTS", description: "Kimi K2.6's long-horizon work." },
    "kimi-k3": { type: "prism-roll", metric: "multimodal", sourceIds: [33], name: "K3 FRONTIER FLIP", category: "VISION + CODE", description: "Kimi K3's frontier capability." }
  },

  models: [
    // Anthropic
    { company: "anthropic", id: "claude-1", name: "Claude 1", date: "2023-03-14", scores: { overall: 46, reasoning: 48, coding: 42, context: 58 }, confidence: "low", summary: "Anthropic enters the public assistant race.", evidence: "Early Claude with limited cross-vendor evaluation.", sources: [4] },
    { company: "anthropic", id: "claude-2", name: "Claude 2", date: "2023-07-11", scores: { overall: 58, reasoning: 61, coding: 55, context: 68 }, confidence: "medium", summary: "A larger jump in reasoning and coding.", evidence: "76.5% on bar exam section, improvements in coding and math.", sources: [4] },
    { company: "anthropic", id: "claude-2-1", name: "Claude 2.1", date: "2023-11-21", scores: { overall: 60, reasoning: 62, coding: 57, context: 75 }, confidence: "medium", summary: "Claude reaches 200K context class.", evidence: "Extended context profile with modest capability gains.", sources: [4] },
    { company: "anthropic", id: "claude-3-opus", name: "Claude 3 Opus", date: "2024-03-04", scores: { overall: 73, reasoning: 76, coding: 72, context: 76 }, confidence: "medium", summary: "Claude reaches the 2024 frontier.", evidence: "Leading results across MMLU, GPQA, GSM8K and long-context tests.", sources: [5] },
    { company: "anthropic", id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", date: "2024-06-20", scores: { overall: 79, reasoning: 81, coding: 84, context: 76 }, confidence: "medium", summary: "A smaller Sonnet overtakes Opus.", evidence: "New highs in graduate reasoning and coding.", sources: [6] },
    { company: "anthropic", id: "claude-3-5-sonnet-v2", name: "Claude 3.5 Sonnet v2", date: "2024-10-22", scores: { overall: 82, reasoning: 83, coding: 88, context: 77 }, confidence: "medium", summary: "Computer use with major coding upgrade.", evidence: "SWE-bench Verified from 33.4% to 49.0%.", sources: [7] },
    { company: "anthropic", id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", date: "2025-02-24", scores: { overall: 85, reasoning: 89, coding: 91, context: 78 }, confidence: "medium", summary: "Claude becomes a hybrid reasoning model.", evidence: "Combined near-instant and extended thinking.", sources: [8] },
    { company: "anthropic", id: "claude-opus-4", name: "Claude Opus 4", date: "2025-05-22", scores: { overall: 89, reasoning: 92, coding: 95, context: 80 }, confidence: "medium", summary: "Long-running coding moves to the foreground.", evidence: "72.5% SWE-bench, 43.2% Terminal-bench.", sources: [9] },
    { company: "anthropic", id: "claude-opus-4-1", name: "Claude Opus 4.1", date: "2025-08-05", scores: { overall: 90, reasoning: 93, coding: 96, context: 80 }, confidence: "medium", summary: "A focused agentic and coding upgrade.", evidence: "74.5% SWE-bench Verified.", sources: [10] },
    { company: "anthropic", id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", date: "2025-09-29", scores: { overall: 92, reasoning: 93, coding: 97, context: 82 }, confidence: "medium", summary: "Sonnet pushes complex agents and computer use.", evidence: "Long-horizon agents and coding emphasis.", sources: [11] },
    { company: "anthropic", id: "claude-opus-4-5", name: "Claude Opus 4.5", date: "2025-11-24", scores: { overall: 94, reasoning: 96, coding: 98, context: 84 }, confidence: "medium", summary: "Opus improves coding, agents and computer use.", evidence: "Strongest for coding and agents at release.", sources: [11] },
    { company: "anthropic", id: "claude-opus-4-8", name: "Claude Opus 4.8", date: "2026-05-28", scores: { overall: 94, reasoning: 97, coding: 99, context: 96 }, confidence: "high", summary: "A consistent, million-context Opus.", evidence: "Gains in coding, agentic tasks, professional work.", sources: [12] },
    { company: "anthropic", id: "claude-fable-5", name: "Claude Fable 5", date: "2026-06-09", scores: { overall: 100, reasoning: 100, coding: 99, context: 96 }, confidence: "high", summary: "The current broad-capability leader.", evidence: "AA Intelligence Index ~60, leading independent testing.", sources: [1, 13] },
    { company: "anthropic", id: "claude-sonnet-5", name: "Claude Sonnet 5", date: "2026-06-30", scores: { overall: 93, reasoning: 93, coding: 97, context: 96 }, confidence: "high", summary: "Efficient Sonnet, not the general flagship.", evidence: "Agentic, cost-efficient, can match Opus 4.8 at high effort.", sources: [14] },

    // OpenAI
    { company: "openai", id: "gpt-3-api", name: "GPT-3 API", date: "2021-11-18", scores: { overall: 25, reasoning: 25, coding: 28, context: 35 }, confidence: "low", summary: "OpenAI is first onto the circuit.", evidence: "Broad API availability as a baseline.", sources: [15] },
    { company: "openai", id: "instructgpt", name: "InstructGPT", date: "2022-01-27", scores: { overall: 32, reasoning: 33, coding: 31, context: 35 }, confidence: "medium", summary: "Human-feedback instruction following.", evidence: "Labelers preferred InstructGPT over GPT-3.", sources: [15] },
    { company: "openai", id: "gpt-3-5", name: "GPT-3.5 / ChatGPT", date: "2022-11-30", scores: { overall: 44, reasoning: 46, coding: 48, context: 40 }, confidence: "medium", summary: "Conversational AI reaches a mass audience.", evidence: "GPT-3.5-class dialogue model.", sources: [15, 16] },
    { company: "openai", id: "gpt-4", name: "GPT-4", date: "2023-03-14", scores: { overall: 68, reasoning: 74, coding: 72, context: 55 }, confidence: "medium", summary: "A major leap in professional tasks.", evidence: "Human-level performance on many benchmarks.", sources: [16] },
    { company: "openai", id: "gpt-4-turbo", name: "GPT-4 Turbo", date: "2023-11-06", scores: { overall: 72, reasoning: 77, coding: 77, context: 69 }, confidence: "medium", summary: "128K context and lower cost.", evidence: "Expanded context, improved recency.", sources: [17] },
    { company: "openai", id: "gpt-4o", name: "GPT-4o", date: "2024-05-13", scores: { overall: 77, reasoning: 81, coding: 83, context: 79 }, confidence: "medium", summary: "The omni model unifies modalities.", evidence: "GPT-4-level capability with lower latency.", sources: [18] },
    { company: "openai", id: "o1-preview", name: "o1-preview", date: "2024-09-12", scores: { overall: 83, reasoning: 91, coding: 87, context: 66 }, confidence: "medium", summary: "Test-time reasoning changes the race.", evidence: "56.7 AIME 2024 vs 13.4 for GPT-4o.", sources: [19] },
    { company: "openai", id: "o1", name: "OpenAI o1", date: "2024-12-17", scores: { overall: 85, reasoning: 95, coding: 89, context: 67 }, confidence: "medium", summary: "Production o1 improves reasoning.", evidence: "96.4 MATH, 75.7 GPQA Diamond, 48.9 SWE-bench.", sources: [19] },
    { company: "openai", id: "gpt-4-5", name: "GPT-4.5", date: "2025-02-27", scores: { overall: 82, reasoning: 83, coding: 85, context: 77 }, confidence: "medium", summary: "Broad chat-quality model.", evidence: "World knowledge, lower hallucination.", sources: [20] },
    { company: "openai", id: "gpt-4-1", name: "GPT-4.1", date: "2025-04-14", scores: { overall: 86, reasoning: 88, coding: 93, context: 96 }, confidence: "medium", summary: "Coding, instruction following, 1M context.", evidence: "Pushed coding and long-context work ahead.", sources: [20] },
    { company: "openai", id: "o3", name: "OpenAI o3", date: "2025-04-16", scores: { overall: 90, reasoning: 96, coding: 96, context: 91 }, confidence: "medium", summary: "Reasoning models gain full tool use.", evidence: "Combine search, Python, files, vision.", sources: [20] },
    { company: "openai", id: "gpt-5", name: "GPT-5", date: "2025-08-07", scores: { overall: 93, reasoning: 97, coding: 97, context: 94 }, confidence: "medium", summary: "Reasoning and fast response as one system.", evidence: "Automatic reasoning when useful.", sources: [21] },
    { company: "openai", id: "gpt-5-2", name: "GPT-5.2", date: "2025-12-11", scores: { overall: 95, reasoning: 98, coding: 98, context: 96 }, confidence: "high", summary: "Professional work and long-running agents.", evidence: "Gains in general intelligence and tool calling.", sources: [22] },
    { company: "openai", id: "gpt-5-4", name: "GPT-5.4", date: "2026-03-05", scores: { overall: 96, reasoning: 99, coding: 99, context: 96 }, confidence: "high", summary: "Mainline reasoning absorbs Codex.", evidence: "Unified reasoning, coding, computer use.", sources: [23] },
    { company: "openai", id: "gpt-5-5", name: "GPT-5.5", date: "2026-04-23", scores: { overall: 97, reasoning: 99, coding: 99, context: 97 }, confidence: "high", summary: "A stronger autonomous work model.", evidence: "Agentic coding, computer use, multi-part tasks.", sources: [24] },
    { company: "openai", id: "gpt-5-6-sol", name: "GPT-5.6 Sol", date: "2026-07-09", scores: { overall: 98, reasoning: 100, coding: 100, context: 98 }, confidence: "high", summary: "One point behind the independent leader.", evidence: "AA Index ~59, state-of-the-art BrowseComp and OSWorld.", sources: [1, 25] },

    // Moonshot AI
    { company: "moonshot", id: "kimi-chat", name: "Kimi Chat", date: "2023-10-09", scores: { overall: 41, reasoning: 42, coding: 39, context: 80 }, confidence: "low", summary: "Moonshot enters with long context.", evidence: "200K Chinese characters, 128K-token class.", sources: [26, 34] },
    { company: "moonshot", id: "kimi-public", name: "Kimi public release", date: "2023-11-16", scores: { overall: 43, reasoning: 43, coding: 40, context: 82 }, confidence: "low", summary: "Kimi opens to the public.", evidence: "User-facing competitor with modest gains.", sources: [26, 34] },
    { company: "moonshot", id: "kimi-2m", name: "Kimi 2M context", date: "2024-03-18", scores: { overall: 46, reasoning: 45, coding: 42, context: 100 }, confidence: "low", summary: "2M Chinese character beta.", evidence: "Tenfold increase over 200K character product.", sources: [34] },
    { company: "moonshot", id: "kimi-explore", name: "Kimi Explore", date: "2024-10-11", scores: { overall: 50, reasoning: 49, coding: 45, context: 100 }, confidence: "low", summary: "Autonomous search broadens Kimi.", evidence: "Deeper search and large-document synthesis.", sources: [26, 34] },
    { company: "moonshot", id: "kimi-k1-5", name: "Kimi K1.5", date: "2025-01-20", scores: { overall: 83, reasoning: 93, coding: 83, context: 83 }, confidence: "medium", summary: "Moonshot makes a sudden reasoning leap.", evidence: "77.5 AIME 2024, 96.2 MATH-500, 94th percentile Codeforces.", sources: [28] },
    { company: "moonshot", id: "kimi-vl", name: "Kimi-VL", date: "2025-04-17", scores: { overall: 70, reasoning: 73, coding: 67, context: 83 }, confidence: "medium", summary: "An open, compact vision-language branch.", evidence: "Open multimodal MoE.", sources: [27, 28] },
    { company: "moonshot", id: "kimi-k2", name: "Kimi K2", date: "2025-07-11", scores: { overall: 87, reasoning: 89, coding: 91, context: 85 }, confidence: "medium", summary: "A 1T-total, 32B-active open-weight MoE.", evidence: "75.1 GPQA Diamond, 89.5 MMLU, strong tool/coding.", sources: [29] },
    { company: "moonshot", id: "kimi-k2-0905", name: "Kimi K2 0905", date: "2025-09-09", scores: { overall: 89, reasoning: 90, coding: 94, context: 91 }, confidence: "medium", summary: "Coding improves, context doubles to 256K.", evidence: "Strengthened agentic coding.", sources: [29] },
    { company: "moonshot", id: "kimi-k2-thinking", name: "Kimi K2 Thinking", date: "2025-11-06", scores: { overall: 92, reasoning: 96, coding: 95, context: 91 }, confidence: "medium", summary: "Interleaved reasoning and tool use.", evidence: "Hundreds of tool steps, strong HLE and SWE-bench.", sources: [27, 29] },
    { company: "moonshot", id: "kimi-k2-5", name: "Kimi K2.5", date: "2026-01-27", scores: { overall: 93, reasoning: 97, coding: 96, context: 95 }, confidence: "high", summary: "Native multimodality and Agent Swarm.", evidence: "50.2 HLE with tools, 96.1 AIME 2025, 87.6 GPQA Diamond.", sources: [30] },
    { company: "moonshot", id: "kimi-k2-6", name: "Kimi K2.6", date: "2026-04-20", scores: { overall: 95, reasoning: 98, coding: 98, context: 95 }, confidence: "high", summary: "Long-horizon agents near closed frontier.", evidence: "54.0 HLE with tools, 58.6 SWE-bench Pro, 90.5 GPQA Diamond.", sources: [31] },
    { company: "moonshot", id: "kimi-k2-7-code", name: "Kimi K2.7 Code", date: "2026-06-12", scores: { overall: 94, reasoning: 96, coding: 99, context: 95 }, confidence: "high", summary: "A specialized, more efficient coding racer.", evidence: "Gains on Kimi Code Bench v2, Program Bench.", sources: [32] },
    { company: "moonshot", id: "kimi-k3", name: "Kimi K3", date: "2026-07-16", scores: { overall: 95, reasoning: 98, coding: 99, context: 100 }, confidence: "high", summary: "Moonshot closes to within five points of the leader.", evidence: "AA Index ~57, 2.8T params, native vision, 1M context.", sources: [2, 3, 33] }
  ]
};

console.log('[Default Config] Loaded:', window.RACE_CONFIG.name);
