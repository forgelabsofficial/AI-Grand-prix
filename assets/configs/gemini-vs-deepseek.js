// Gemini vs DeepSeek Race Config
// A focused comparison between Google's Gemini and DeepSeek models

window.RACE_CONFIG = {
  name: "Gemini vs DeepSeek",
  description: "Head-to-head comparison of Google Gemini and DeepSeek AI models (2023-2026)",
  
  companyOrder: ["gemini", "deepseek"],
  
  companies: {
    gemini: {
      name: "Google Gemini",
      family: "Gemini",
      color: "#4285f4",
      number: "01",
      current: "gemini-2.0-flash"
    },
    deepseek: {
      name: "DeepSeek",
      family: "DeepSeek",
      color: "#6e56cf",
      number: "02",
      current: "deepseek-r1"
    }
  },

  sources: [
    { id: 1, group: "Google", title: "Gemini 1.0 Announcement", url: "https://blog.google/technology/ai/google-gemini-ai/" },
    { id: 2, group: "Google", title: "Gemini 1.5 Pro", url: "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/" },
    { id: 3, group: "Google", title: "Gemini 1.5 Flash", url: "https://blog.google/technology/developers/gemini-models-updates-developers/" },
    { id: 4, group: "Google", title: "Gemini 2.0 Flash", url: "https://blog.google/technology/google-deepmind/2024-12-gemini-2-0/" },
    { id: 5, group: "DeepSeek", title: "DeepSeek-V2", url: "https://www.deepseek.com/" },
    { id: 6, group: "DeepSeek", title: "DeepSeek-V3", url: "https://www.deepseek.com/" },
    { id: 7, group: "DeepSeek", title: "DeepSeek-R1", url: "https://www.deepseek.com/" },
    { id: 8, group: "Independent", title: "Artificial Analysis - Gemini", url: "https://artificialanalysis.ai/models/gemini-1-5-pro" },
    { id: 9, group: "Independent", title: "Artificial Analysis - DeepSeek", url: "https://artificialanalysis.ai/models/deepseek-v3" }
  ],

  stuntEvents: {
    "gemini-1.5-pro": { type: "memory-helix", metric: "context", sourceIds: [2], name: "1M CONTEXT TUNNEL", category: "LONG CONTEXT", description: "Gemini 1.5 Pro's 1M token context window breakthrough." },
    "gemini-1.5-flash": { type: "tool-swarm", metric: "agents", sourceIds: [3], name: "FLASH TOOL GAUNTLET", category: "AGENTS", description: "Gemini 1.5 Flash's fast agentic capabilities." },
    "gemini-2.0-flash": { type: "agent-swarm", metric: "agents", sourceIds: [4], name: "2.0 AGENT SWARM", category: "MULTI-AGENT", description: "Gemini 2.0 Flash's advanced multi-agent reasoning." },
    "deepseek-v2": { type: "code-drift", metric: "coding", sourceIds: [5], name: "V2 CODE CHICANE", category: "CODING", description: "DeepSeek-V2's strong coding performance." },
    "deepseek-v3": { type: "logic-leap", metric: "reasoning", sourceIds: [6], name: "V3 LOGIC LEAP", category: "REASONING", description: "DeepSeek-V3's major reasoning improvements." },
    "deepseek-r1": { type: "prism-roll", metric: "reasoning", sourceIds: [7], name: "R1 REASONING PRISM", category: "REASONING", description: "DeepSeek-R1's state-of-the-art reasoning capabilities." }
  },

  models: [
    // Google Gemini
    { company: "gemini", id: "gemini-1.0", name: "Gemini 1.0", date: "2023-12-06", scores: { overall: 82, reasoning: 85, coding: 80, context: 88 }, confidence: "high", summary: "Google's first multimodal AI model", evidence: "Strong performance across text, code, and multimodal tasks", sources: [1, 8] },
    { company: "gemini", id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", date: "2024-02-15", scores: { overall: 88, reasoning: 89, coding: 86, context: 98 }, confidence: "high", summary: "Breakthrough 1M token context window", evidence: "World's first 1M token context, strong reasoning and coding", sources: [2, 8] },
    { company: "gemini", id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", date: "2024-05-14", scores: { overall: 85, reasoning: 86, coding: 84, context: 95 }, confidence: "high", summary: "Fast and efficient model", evidence: "Optimized for speed while maintaining strong performance", sources: [3, 8] },
    { company: "gemini", id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", date: "2024-12-11", scores: { overall: 92, reasoning: 93, coding: 91, context: 96 }, confidence: "high", summary: "Next generation with advanced agentic capabilities", evidence: "Enhanced reasoning, multimodal understanding, and multi-agent support", sources: [4, 8] },

    // DeepSeek
    { company: "deepseek", id: "deepseek-v2", name: "DeepSeek-V2", date: "2024-05-16", scores: { overall: 78, reasoning: 79, coding: 85, context: 82 }, confidence: "high", summary: "Strong coding-focused model", evidence: "Excellent code generation and understanding capabilities", sources: [5, 9] },
    { company: "deepseek", id: "deepseek-v3", name: "DeepSeek-V3", date: "2024-12-26", scores: { overall: 86, reasoning: 88, coding: 89, context: 84 }, confidence: "high", summary: "Major reasoning improvements", evidence: "Significant gains in reasoning and coding benchmarks", sources: [6, 9] },
    { company: "deepseek", id: "deepseek-r1", name: "DeepSeek-R1", date: "2025-01-20", scores: { overall: 90, reasoning: 94, coding: 90, context: 85 }, confidence: "high", summary: "State-of-the-art reasoning model", evidence: "Leading performance on complex reasoning tasks, comparable to top models", sources: [7, 9] }
  ]
};

console.log('[Gemini vs DeepSeek Config] Loaded:', window.RACE_CONFIG.name);
