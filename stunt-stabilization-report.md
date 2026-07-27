# Stunt Timing & Path Stabilization Report

**Completed:** 24 July 2026

## Confirmed causes

The reported behavior was real and came from several independent timing systems:

1. Stunt progress was based on renderer elapsed time while car movement was tied to race progress.
2. Renderer elapsed time continued while the race was paused.
3. Stunt duration stayed constant while race speed changed how far the car travelled.
4. Ramps, rings, gates and cones used fixed offsets rather than the stunt’s actual start/end distance.
5. Five camera cuts inside a roughly three-second stunt made continuous motion look like repeated resets.
6. An overtake interruption requeued the stunt from 0%, creating a genuine restart.
7. Ring/cone animation overwrote track-alignment rotation with Euler rotation.
8. Cars could continue forward catch-up movement while the race was paused.

## Corrections

### Distance-locked stunt progress

Stunt progress now uses:

`(carDistance - stuntStartDistance) / stuntPathLength`

The race-distance value is monotonic and is the only clock used for path completion. Renderer performance and camera changes cannot reset progress.

### Pause behavior

When paused:

- Car distance is frozen.
- Stunt progress is frozen.
- Stunt visual animation is frozen.
- Queue expiration and cooldown clocks are frozen.
- Camera switching changes only the view.

### Variable race speed

Each stunt owns a fixed path length. A faster race traverses the stunt faster because the car genuinely covers distance faster; the car and track geometry remain aligned.

### Resume after overtake

Chosen behavior: **resume remaining path**.

When an overtake interrupts a stunt:

- Current percentage is saved.
- Remaining path distance is calculated.
- The event waits behind the pass director lock.
- Primitives are repositioned ahead of the car.
- The card returns with `RESUMED` and the saved percentage.
- A short blend-in prevents an abrupt vertical/lateral teleport.

The stunt does not restart from zero.

### Adaptive hero cameras

Chosen behavior: **adaptive 2–4 shots**.

- Calm: two hero shots
- Broadcast: three hero shots
- Cinematic+: four hero shots

Five phase labels still update for data clarity, but not every phase forces a camera cut.

### Speed-independent scheduling

Stunt expiry, cooldowns, director locks, pass timeouts and scheduled cuts now use normalized race progress rather than wall-clock time. The same race profile therefore triggers the same stunt and camera-shot sequence at 0.5×, 1×, 1.5× and 2×; only real-world playback duration changes.

Crossed release milestones are dispatched immediately in chronological order instead of using wall-clock delays.

### Tie-aware winners

Equal judging scores now produce a declared dead heat instead of falling through to the fixed company ordering. Evidence ranks use `=P1`, and the finish card/3D banner lists every co-winner.

Returning from a manual camera to Auto during a stunt restores the camera for the current phase rather than selecting an unrelated scheduled shot.

### Geometry alignment

All primitives are distributed over the stunt’s real start/end interval:

- Launch and landing ramps use separate curve-aligned anchors.
- Tunnel rings are evenly distributed over remaining path distance.
- Gates and cones use the same interval as the car.
- Ring spin preserves its base track quaternion.
- Cone animation preserves track alignment.

## Remaining behavior by design

- A hard camera cut changes screen composition instantly, as in a real broadcast.
- A faster race speed makes the stunt finish sooner in wall-clock time, but not in track distance.
- Physical overtakes and finish sequences still override stunt direction.
- Advanced Phase 4 stunts have not yet received the same hero-level environment treatment.
