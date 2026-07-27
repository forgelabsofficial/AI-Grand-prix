# Current Skills Circuit Fix

**Completed:** 24 July 2026

## Problem

Operational categories and championships had no comparable historical measurements for most model releases. The five-year race correctly treated those records as N/A, but the result was a nearly empty circuit until 2026.

Affected profiles:

- Output Throughput
- Answer Latency
- Cost Efficiency
- Developer Cup
- Value Cup
- Open Ecosystem Cup

## Solution

These profiles now automatically use **Current Skills Circuit** mode instead of the five-year historical playback.

### Current Skills behavior

- Every company is placed on the starting grid immediately.
- Each company uses its best comparable measured model for the chosen category/preset.
- The race begins at `START GRID`, not July 2021.
- Timeline sectors are GRID, SECTOR 1–4 and FLAG.
- Date display becomes `23 JUL 2026 · CURRENT`.
- Historical model milestones are not triggered.
- No operational history is invented or interpolated.
- Physical race motion, overtakes, cameras and result scoring continue normally.

### Profiles that remain historical

- Overall Intelligence
- Reasoning
- Coding
- Agents & Tool Use
- Multimodal
- Long Context
- Openness & Deployability
- Frontier Cup
- Research Cup

Openness remains historical because release/license status is stored for the historical model line. Developer, Value and Open Ecosystem Cups use Current Skills mode because their weighted formulas require current operational measurements.

## Outcome

Developer Cup, Value Cup, Cost Efficiency, Throughput, Latency and Open Ecosystem Cup no longer show an empty track at the start. All three companies are active from progress zero.
