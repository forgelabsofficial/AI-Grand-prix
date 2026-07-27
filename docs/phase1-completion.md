# Phase 1 Completion Report

**Completed:** 24 July 2026  
**Backup before work:** `model-grand-prix-backup-2026-07-24-pre-phase1.zip`

## Completed requirements

- ✅ Coding split from agents/tool use
- ✅ Multimodal category added
- ✅ Throughput, answer latency, cost efficiency and openness/deployability records added
- ✅ Metric-level source IDs, source type, configuration, date, confidence, raw value and note
- ✅ Fixed-anchor normalization
- ✅ Five championship presets
- ✅ Honest N/A behavior for missing operational evidence
- ✅ Graph, comparison cards, model audit dialog and 3D race integrated with all categories/presets

## Categories

1. Overall intelligence
2. Reasoning
3. Coding
4. Agents & tool use
5. Multimodal
6. Long context
7. Output throughput
8. Answer latency
9. Cost efficiency
10. Openness & deployability

## Championships

- Frontier Cup
- Developer Cup
- Research Cup
- Value Cup
- Open Ecosystem Cup

## Fixed anchors

| Metric | Anchor |
|---|---|
| Context | Logarithmic: 8K tokens = 0, 1M tokens = 100 |
| Throughput | Logarithmic: 20 tok/s = 0, 200 tok/s = 100 |
| Latency | Inverse logarithmic: 1 s = 100, 180 s = 0 |
| Cost | Inverse logarithmic: $0.10/M = 100, $10/M = 0 |
| Openness | Published weights/license/self-hosting/portability rubric |

Capability categories continue to use the documented longitudinal Frontier Pace scale. Overall current flagships retain the independent Artificial Analysis anchor.

## N/A rules

- N/A means no comparable stored record.
- N/A is not converted to zero.
- A championship marked `requireAll` returns N/A if any weighted metric is missing.
- Operational races only admit a car once the required measured record exists.
- A promised future weight release receives no openness credit before publication.

## UI changes

- Grouped judging selector replaces the old four-button lens control.
- Race selector exposes the same 15 category/championship choices.
- Cards display N/A and no rank when evidence is missing.
- Model detail dialog shows all 10 category scores and five cup scores.
- Active audit displays raw value, source type, configuration, date and confidence.
- Source register expanded from 34 to 40 references.
- Operational race note explains why a car may enter late.

## Validation performed

- 15 judging options render in both Graph and Race selectors.
- Agents are separate from coding.
- Current throughput records score all three current flagships.
- Selecting GPT-4 for throughput correctly displays N/A rather than an inferred value.
- Model audit renders 10 metric cards, five championship cards and configuration metadata.
- Value Cup runs in the 3D race with all three companies at the final snapshot.
- No browser runtime errors were observed in the Phase 1 graph or race tests.
