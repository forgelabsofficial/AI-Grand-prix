(() => {
  "use strict";

  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
  const rounded = (value) => Math.round(value * 10) / 10;

  const CATEGORY_DEFINITIONS = {
    overall: { label: "Overall intelligence", short: "Overall", group: "Capability", availability: "historical", anchor: "Current independent leader = 100" },
    reasoning: { label: "Reasoning", short: "Reasoning", group: "Capability", availability: "historical", anchor: "Longitudinal frontier pace, 0–100" },
    coding: { label: "Coding", short: "Coding", group: "Capability", availability: "historical", anchor: "Longitudinal coding frontier, 0–100" },
    agents: { label: "Agents & tool use", short: "Agents", group: "Capability", availability: "historical", anchor: "Longitudinal agentic frontier, 0–100" },
    multimodal: { label: "Multimodal", short: "Multimodal", group: "Capability", availability: "historical", anchor: "Documented modality capability, 0–100" },
    context: { label: "Long context", short: "Context", group: "Capability", availability: "historical", anchor: "Log scale: 8K = 0, 1M = 100" },
    throughput: { label: "Output throughput", short: "Throughput", group: "Operations", availability: "measured", anchor: "Log scale: 20 = 0, 200 tok/s = 100", unit: "tok/s" },
    latency: { label: "Answer latency", short: "Latency", group: "Operations", availability: "measured", anchor: "Inverse log: 1 s = 100, 180 s = 0", unit: "s" },
    cost: { label: "Cost efficiency", short: "Cost", group: "Economics & deployment", availability: "measured", anchor: "Inverse log: $0.10 = 100, $10/M = 0", unit: "$/M" },
    openness: { label: "Openness & deployability", short: "Openness", group: "Economics & deployment", availability: "release", anchor: "Published weights/license rubric, 0–100" }
  };

  const CHAMPIONSHIPS = {
    frontierCup: {
      label: "Frontier Cup",
      short: "Frontier Cup",
      group: "Championships",
      description: "Broad flagship capability",
      requireAll: true,
      weights: { overall: 35, reasoning: 20, coding: 15, agents: 15, multimodal: 10, context: 5 }
    },
    developerCup: {
      label: "Developer Cup",
      short: "Developer Cup",
      group: "Championships",
      description: "Coding, agents and practical operation",
      requireAll: true,
      weights: { coding: 30, agents: 25, throughput: 10, latency: 10, cost: 10, context: 10, openness: 5 }
    },
    researchCup: {
      label: "Research Cup",
      short: "Research Cup",
      group: "Championships",
      description: "Reasoning, context and multimodal research",
      requireAll: true,
      weights: { reasoning: 35, context: 25, multimodal: 20, agents: 15, overall: 5 }
    },
    valueCup: {
      label: "Value Cup",
      short: "Value Cup",
      group: "Championships",
      description: "Useful capability per dollar and second",
      requireAll: true,
      weights: { cost: 35, throughput: 25, latency: 20, overall: 20 }
    },
    openCup: {
      label: "Open Ecosystem Cup",
      short: "Open Cup",
      group: "Championships",
      description: "Released weights, deployment and value",
      requireAll: true,
      weights: { openness: 40, cost: 20, context: 15, overall: 15, agents: 10 }
    }
  };

  const AGENT_SCORES = {
    "claude-1": 34, "claude-2": 45, "claude-2-1": 48, "claude-3-opus": 65,
    "claude-3-5-sonnet": 76, "claude-3-5-sonnet-v2": 86, "claude-3-7-sonnet": 90,
    "claude-opus-4": 96, "claude-opus-4-1": 96, "claude-sonnet-4-5": 97,
    "claude-opus-4-5": 99, "claude-opus-4-8": 99, "claude-fable-5": 100, "claude-sonnet-5": 97,
    "gpt-3-api": 20, "instructgpt": 24, "gpt-3-5": 35, "gpt-4": 55, "gpt-4-turbo": 68,
    "gpt-4o": 75, "o1-preview": 74, "o1": 79, "gpt-4-5": 73, "gpt-4-1": 88,
    "o3": 97, "gpt-5": 97, "gpt-5-2": 98, "gpt-5-4": 99, "gpt-5-5": 99, "gpt-5-6-sol": 100,
    "kimi-chat": 36, "kimi-public": 38, "kimi-2m": 40, "kimi-explore": 57, "kimi-k1-5": 75,
    "kimi-vl": 68, "kimi-k2": 88, "kimi-k2-0905": 92, "kimi-k2-thinking": 96,
    "kimi-k2-5": 98, "kimi-k2-6": 99, "kimi-k2-7-code": 98, "kimi-k3": 99
  };

  const MULTIMODAL_SCORES = {
    "claude-1": 8, "claude-2": 10, "claude-2-1": 10, "claude-3-opus": 78,
    "claude-3-5-sonnet": 84, "claude-3-5-sonnet-v2": 87, "claude-3-7-sonnet": 88,
    "claude-opus-4": 91, "claude-opus-4-1": 92, "claude-sonnet-4-5": 94,
    "claude-opus-4-5": 96, "claude-opus-4-8": 98, "claude-fable-5": 100, "claude-sonnet-5": 96,
    "gpt-3-api": 5, "instructgpt": 5, "gpt-3-5": 7, "gpt-4": 70, "gpt-4-turbo": 78,
    "gpt-4o": 94, "o1-preview": 45, "o1": 78, "gpt-4-5": 82, "gpt-4-1": 88,
    "o3": 96, "gpt-5": 97, "gpt-5-2": 98, "gpt-5-4": 99, "gpt-5-5": 99, "gpt-5-6-sol": 100,
    "kimi-chat": 8, "kimi-public": 8, "kimi-2m": 8, "kimi-explore": 12, "kimi-k1-5": 89,
    "kimi-vl": 91, "kimi-k2": 38, "kimi-k2-0905": 42, "kimi-k2-thinking": 50,
    "kimi-k2-5": 97, "kimi-k2-6": 99, "kimi-k2-7-code": 72, "kimi-k3": 100
  };

  const CONTEXT_DATA = {
    "claude-1": [100000, "tokens"], "claude-2": [100000, "tokens"], "claude-2-1": [200000, "tokens"],
    "claude-3-opus": [200000, "tokens"], "claude-3-5-sonnet": [200000, "tokens"], "claude-3-5-sonnet-v2": [200000, "tokens"],
    "claude-3-7-sonnet": [200000, "tokens"], "claude-opus-4": [200000, "tokens"], "claude-opus-4-1": [200000, "tokens"],
    "claude-sonnet-4-5": [200000, "tokens"], "claude-opus-4-5": [200000, "tokens"], "claude-opus-4-8": [1000000, "tokens"],
    "claude-fable-5": [1000000, "tokens"], "claude-sonnet-5": [1000000, "tokens"],
    "gpt-3-api": [2048, "tokens"], "instructgpt": [4096, "tokens"], "gpt-3-5": [16384, "tokens"], "gpt-4": [32768, "tokens"],
    "gpt-4-turbo": [128000, "tokens"], "gpt-4o": [128000, "tokens"], "o1-preview": [128000, "tokens"], "o1": [200000, "tokens"],
    "gpt-4-5": [128000, "tokens"], "gpt-4-1": [1000000, "tokens"], "o3": [200000, "tokens"], "gpt-5": [400000, "tokens"],
    "gpt-5-2": [400000, "tokens"], "gpt-5-4": [1000000, "tokens"], "gpt-5-5": [922000, "tokens"], "gpt-5-6-sol": [1000000, "tokens"],
    "kimi-chat": [128000, "tokens"], "kimi-public": [128000, "tokens"], "kimi-2m": [2000000, "Chinese characters", 100],
    "kimi-explore": [128000, "tokens"], "kimi-k1-5": [128000, "tokens"], "kimi-vl": [128000, "tokens"], "kimi-k2": [128000, "tokens"],
    "kimi-k2-0905": [256000, "tokens"], "kimi-k2-thinking": [256000, "tokens"], "kimi-k2-5": [256000, "tokens"],
    "kimi-k2-6": [256000, "tokens"], "kimi-k2-7-code": [256000, "tokens"], "kimi-k3": [1048576, "tokens"]
  };

  const OPERATIONAL_DATA = {
    "claude-fable-5": {
      throughput: { raw: 72.4, sourceIds: [35], config: "Anthropic API; adaptive reasoning, max effort, Opus 4.8 fallback", measuredAt: "2026-07-23" },
      latency: { raw: 125.36, sourceIds: [35], config: "Time to first answer token; max effort", measuredAt: "2026-07-23" },
      cost: { raw: 7.70, sourceIds: [35], config: "7:2:1 cache-hit/input/output blended API price", measuredAt: "2026-07-23" }
    },
    "gpt-5-6-sol": {
      throughput: { raw: 63.3, sourceIds: [36], config: "OpenAI API; max reasoning", measuredAt: "2026-07-23" },
      latency: { raw: 151.08, sourceIds: [36], config: "Time to first answer token; max reasoning", measuredAt: "2026-07-23" },
      cost: { raw: 4.35, sourceIds: [36], config: "7:2:1 cache-hit/input/output blended API price", measuredAt: "2026-07-23" }
    },
    "kimi-k3": {
      throughput: { raw: 35.2, sourceIds: [2], config: "Moonshot first-party API; reasoning model", measuredAt: "2026-07-23" },
      latency: { raw: 4.54, sourceIds: [2], config: "Time to first answer token", measuredAt: "2026-07-23" },
      cost: { raw: 2.31, sourceIds: [2], config: "7:2:1 cache-hit/input/output blended API price", measuredAt: "2026-07-23" }
    },
    "kimi-k2-6": {
      throughput: { raw: 31.8, sourceIds: [39], config: "Moonshot first-party API", measuredAt: "2026-07-23" },
      latency: { raw: 2.81, sourceIds: [39], config: "Time to first answer token", measuredAt: "2026-07-23" },
      cost: { raw: 0.70, sourceIds: [39], config: "7:2:1 cache-hit/input/output blended API price", measuredAt: "2026-07-23" }
    },
    "kimi-k2-5": {
      throughput: { raw: 44.2, sourceIds: [37], config: "Median current provider measurement", measuredAt: "2026-07-23" },
      latency: { raw: 2.85, sourceIds: [37], config: "Time to first answer token", measuredAt: "2026-07-23" },
      cost: { raw: 0.49, sourceIds: [37], config: "7:2:1 blended provider price", measuredAt: "2026-07-23" }
    }
  };

  const OPENNESS_OVERRIDES = {
    "kimi-k1-5": { score: 18, rawLabel: "Technical report; no released weights", note: "Research disclosure without a public checkpoint" },
    "kimi-vl": { score: 92, rawLabel: "Open weights", note: "Public model weights and code" },
    "kimi-k2": { score: 100, rawLabel: "Open weights · Modified MIT", note: "Weights, commercial use and self-hosting" },
    "kimi-k2-0905": { score: 100, rawLabel: "Open weights · Modified MIT", note: "Weights, commercial use and self-hosting" },
    "kimi-k2-thinking": { score: 100, rawLabel: "Open weights · Modified MIT", note: "Weights, commercial use and self-hosting" },
    "kimi-k2-5": { score: 100, rawLabel: "Open weights · Modified MIT", note: "Weights, commercial use and self-hosting" },
    "kimi-k2-6": { score: 100, rawLabel: "Open weights · Modified MIT", note: "Weights, commercial use and self-hosting" },
    "kimi-k2-7-code": { score: 100, rawLabel: "Open weights · Modified MIT", note: "Weights, commercial use and self-hosting" },
    "kimi-k3": { score: 12, rawLabel: "Hosted model on 23 Jul 2026", note: "Promised future weights do not count before release" }
  };

  function logScore(value, low, high) {
    if (!(value > 0)) return null;
    return rounded(clamp((Math.log(value) - Math.log(low)) / (Math.log(high) - Math.log(low)) * 100));
  }

  function inverseLogScore(value, low, high) {
    const score = logScore(value, low, high);
    return score == null ? null : rounded(100 - score);
  }

  function normalizeMetric(key, raw, override) {
    if (override != null) return override;
    if (key === "context") return logScore(raw, 8192, 1000000);
    if (key === "throughput") return logScore(raw, 20, 200);
    if (key === "latency") return inverseLogScore(raw, 1, 180);
    if (key === "cost") return inverseLogScore(raw, 0.1, 10);
    return raw;
  }

  function capabilityRecord(model, key, score, sourceType = "editorial mapping") {
    return {
      key,
      score: score == null ? null : rounded(score),
      raw: key === "overall" && model.rawAA ? model.rawAA : null,
      rawUnit: key === "overall" && model.rawAA ? "AA Index" : null,
      rawLabel: key === "overall" && model.rawAA ? `AA ${model.rawAA}` : "Frontier Pace",
      sourceIds: model.sources,
      sourceType: key === "overall" && model.rawAA ? "independent anchor" : sourceType,
      config: key === "agents" ? "Tool use, planning and long-horizon evidence" : key === "multimodal" ? "Documented text/vision/audio/video capability evidence" : "Release-era capability mapping",
      measuredAt: new Date(model.date).toISOString().slice(0, 10),
      confidence: model.confidence,
      note: model.evidence
    };
  }

  function opennessRecord(model) {
    const override = OPENNESS_OVERRIDES[model.id];
    const base = override || {
      score: 8,
      rawLabel: "Proprietary API/model",
      note: "No public weights for this release on the research snapshot"
    };
    return {
      key: "openness",
      score: base.score,
      raw: base.score,
      rawUnit: "rubric",
      rawLabel: base.rawLabel,
      sourceIds: model.company === "moonshot" ? model.sources : model.sources,
      sourceType: "release/license rubric",
      config: "Weights 40 · commercial license 20 · self-hosting 20 · portability/docs 20",
      measuredAt: "2026-07-23",
      confidence: override ? "high" : "high",
      note: base.note
    };
  }

  function operationalRecord(model, key, datum) {
    if (!datum) return null;
    const rawUnit = key === "throughput" ? "tok/s" : key === "latency" ? "s" : "$/M";
    return {
      key,
      score: normalizeMetric(key, datum.raw),
      raw: datum.raw,
      rawUnit,
      rawLabel: `${datum.raw} ${rawUnit}`,
      sourceIds: datum.sourceIds,
      sourceType: "independent measurement",
      config: datum.config,
      measuredAt: datum.measuredAt,
      confidence: "high",
      note: key === "latency" ? "Reasoning effort materially changes this measurement." : "Operational measurements can vary by provider and over time."
    };
  }

  function enrichModels(models) {
    models.forEach((model) => {
      model.scores.agents = AGENT_SCORES[model.id] ?? rounded(model.scores.coding * 0.55 + model.scores.overall * 0.45 - 8);
      model.scores.multimodal = MULTIMODAL_SCORES[model.id] ?? rounded(model.scores.overall * 0.65);
      model.metrics = {};
      ["overall", "reasoning", "coding", "agents", "multimodal"].forEach((key) => {
        model.metrics[key] = capabilityRecord(model, key, model.scores[key]);
      });

      const context = CONTEXT_DATA[model.id];
      if (context) {
        const [raw, rawUnit, override] = context;
        const score = normalizeMetric("context", raw, override);
        model.scores.context = score;
        model.metrics.context = {
          key: "context", score, raw, rawUnit,
          rawLabel: `${Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(raw)} ${rawUnit}`,
          sourceIds: model.sources,
          sourceType: rawUnit === "tokens" ? "release specification" : "product claim; non-token unit",
          config: rawUnit === "tokens" ? "Log anchor: 8K tokens = 0; 1M tokens = 100" : "Claim reported in Chinese characters; score capped at 100",
          measuredAt: new Date(model.date).toISOString().slice(0, 10),
          confidence: rawUnit === "tokens" ? model.confidence : "low",
          note: rawUnit === "tokens" ? "Maximum advertised context; retention quality is a separate concern." : "Characters and tokens are not directly interchangeable."
        };
      } else {
        model.metrics.context = capabilityRecord(model, "context", model.scores.context);
      }

      const operational = OPERATIONAL_DATA[model.id] || {};
      ["throughput", "latency", "cost"].forEach((key) => {
        const record = operationalRecord(model, key, operational[key]);
        model.metrics[key] = record;
        model.scores[key] = record?.score ?? null;
      });
      model.metrics.openness = opennessRecord(model);
      model.scores.openness = model.metrics.openness.score;
    });
    return models;
  }

  function getMetric(model, key) {
    return model?.metrics?.[key] || null;
  }

  function scoreFor(model, profile) {
    if (!model) return null;
    if (CATEGORY_DEFINITIONS[profile]) return model.metrics?.[profile]?.score ?? model.scores?.[profile] ?? null;
    const championship = CHAMPIONSHIPS[profile];
    if (!championship) return null;
    let weighted = 0;
    let availableWeight = 0;
    for (const [key, weight] of Object.entries(championship.weights)) {
      const score = scoreFor(model, key);
      if (score == null) {
        if (championship.requireAll) return null;
        continue;
      }
      weighted += score * weight;
      availableWeight += weight;
    }
    return availableWeight ? rounded(weighted / availableWeight) : null;
  }

  function profileMeta(profile) {
    if (CATEGORY_DEFINITIONS[profile]) return { ...CATEGORY_DEFINITIONS[profile], type: "category", key: profile };
    if (CHAMPIONSHIPS[profile]) return { ...CHAMPIONSHIPS[profile], type: "championship", key: profile };
    return null;
  }

  function profileOptionsHtml(selected = "overall") {
    const groups = {};
    Object.entries(CATEGORY_DEFINITIONS).forEach(([key, value]) => (groups[value.group] ||= []).push([key, value]));
    (groups.Championships ||= []).push(...Object.entries(CHAMPIONSHIPS));
    return Object.entries(groups).map(([group, entries]) => `<optgroup label="${group}">${entries.map(([key, item]) => `<option value="${key}" ${key === selected ? "selected" : ""}>${item.label}</option>`).join("")}</optgroup>`).join("");
  }

  function metricDisplay(record) {
    if (!record) return "Not measured";
    return record.rawLabel || (record.raw != null ? `${record.raw}${record.rawUnit ? ` ${record.rawUnit}` : ""}` : `${record.score} / 100`);
  }

  window.MGPPhase1 = {
    CATEGORY_DEFINITIONS,
    CHAMPIONSHIPS,
    enrichModels,
    getMetric,
    scoreFor,
    profileMeta,
    profileOptionsHtml,
    metricDisplay,
    normalizeMetric,
    anchors: {
      context: "log(8K → 1M tokens)",
      throughput: "log(20 → 200 tok/s)",
      latency: "inverse log(1 → 180 s)",
      cost: "inverse log($0.10 → $10/M)",
      openness: "weights/license/deployment rubric"
    }
  };
})();
