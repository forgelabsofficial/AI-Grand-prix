# Phase 2 Completion Report

**Completed:** 24 July 2026  
**Backup before work:** `model-grand-prix-backup-2026-07-24-pre-phase2.zip`

## Completed requirements

- ✅ Stunt event scheduler
- ✅ Forward-only spline extensions
- ✅ Director priority lock
- ✅ Stunt data card
- ✅ Reusable ramp primitive
- ✅ Reusable tunnel primitive
- ✅ Reusable gate primitive
- ✅ Reusable drift-course primitive

## Scheduler

Each stunt event now carries:

- Company and model
- Stunt type and judging category
- Evidence source IDs
- Priority
- Queue sequence
- Queue timestamp
- Expiration timestamp
- Company/type cooldown
- Unique signature to prevent duplicates

The scheduler sorts by priority and original queue sequence, rejects duplicate events, discards expired events, enforces cooldowns and limits the queue to eight events.

If a physical pass interrupts a stunt before 65% completion, the event is requeued with a new expiration window.

## Forward-only spline extensions

`stunt-framework.js` provides a reusable path sampler returning only visual offsets:

- Height
- Lateral offset
- Pitch
- Roll
- Yaw

The car’s underlying race distance (`currentT`) is never changed by a stunt. Ramp jumps, drifts, rolls and helices are recomputed from the immutable forward race position every frame.

Supported path extensions:

- Logic Leap
- Code Drift
- Prism Roll
- Tool Swarm
- Memory Helix
- Open Gate

## Director priority lock

Explicit priorities are now enforced:

1. Finish sequence — 120
2. Physical overtake — 100
3. Stunt — 60
4. Milestone/upgrade — 35
5. Scheduled broadcast shot — 10

A lower-priority camera event cannot replace a higher-priority locked sequence. Locks expire automatically and are released when a stunt/pass ends or is cancelled.

## Reusable 3D primitives

### Ramp

- Launch and landing ramps
- Illuminated edge rails
- Company-color material reuse
- Positioned and oriented from the live track spline

### Tunnel

- Twelve reusable torus gates
- Curvature-aware placement along the circuit
- Pulsing additive materials
- Used by Memory Helix and Prism Roll

### Gate gauntlet

- Four reusable transparent gates
- Animated scan planes
- Company-color framing
- Used by Tool Swarm and Open Garage

### Drift course

- Fourteen reusable alternating cones
- Curvature-aware placement
- Animated emissive markers
- Used by Code Chicane

## Stunt card audit

The live card now includes:

- Company
- Active model
- Judging category
- Stunt name
- Research description
- Visible source IDs
- `NO BONUS POINTS` disclosure

## Validation

- Priority sorting was verified: a higher-priority Logic Leap started before an earlier queued Code Drift.
- Ramp primitive activated for Logic Leap.
- Tunnel primitive activated for Memory Helix.
- Stunt director lock reported owner `stunt` at priority 60.
- Card displayed active model and `SOURCE #19`.
- Underlying car race position remained unchanged while the visual ramp jump ran.
- Toggle-off removed the active primitive and card; toggle-on restored future stunt scheduling.
- No JavaScript syntax or browser runtime errors were observed.
