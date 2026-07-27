# Garage Sequence Bug Fixes - Complete ✅

## Issues Fixed

### 1. ❌ Cars not positioned inside garage
**Problem:** Cars were placed at world coordinates `(xPos, 0.5, -10)` but the garage is at world position `(-50, 0, 0)`, so cars appeared near the track instead of inside the garage.

**Fix:** Updated `createGarage()` to position cars at `(-50 + xPos, 0.5, -10)` - accounting for the garage's world position.

```javascript
// Before (WRONG):
car.position.set(xPos, 0.5, -10);

// After (CORRECT):
const worldX = GARAGE_X + localX; // GARAGE_X = -50
car.position.set(worldX, 0.5, -10);
```

### 2. ❌ Cars hidden by updateCars() every frame
**Problem:** `updateCars()` checks `if (!car.userData.active)` and sets `car.visible = false`, overriding the garage's `car.visible = true`.

**Fix:** Added garage sequence check in `updateCars()` to skip visibility and position updates during the sequence:

```javascript
const inGarageSequence = raceSequencePhase !== 'racing' && sequenceStartTime > 0;
if (inGarageSequence) {
  car.visible = true;
  car.userData.inGarage = true;
  return; // Skip normal updates
}
```

### 3. ❌ Phase 3 car movement calculation wrong
**Problem:** `startX = garagePosition.x - 50` double-counted the garage offset since `garagePosition.x` already included `-50`.

**Fix:** Interpolate directly from `garagePosition` (world coords) to track position using `circuitCurve.getPointAt()`:

```javascript
// Get track start position
const trackPoint = circuitCurve.getPointAt(trackStartT);
const trackTangent = circuitCurve.getTangentAt(trackStartT).normalize();
const trackSide = new THREE.Vector3(-trackTangent.z, 0, trackTangent.x).normalize();
const trackPos = trackPoint.clone().addScaledVector(trackSide, targetLane);

// Interpolate from garage to track
const garagePos = car.userData.garagePosition;
car.position.x = garagePos.x + (trackPos.x - garagePos.x) * eased;
car.position.y = garagePos.y + (trackPos.y - garagePos.y) * eased;
car.position.z = garagePos.z + (trackPos.z - garagePos.z) * eased;
```

### 4. ❌ startGarageSequence() setTimeout conflicted with animateGarageSequence()
**Problem:** `startGarageSequence()` used `setTimeout()` to set `raceSequencePhase = 'racing'` after 8s, but `animateGarageSequence()` also manages phase transitions independently, causing conflicts.

**Fix:** Removed the `setTimeout()` from `startGarageSequence()`. Now `animateGarageSequence()` handles ALL phase transitions including the final transition to `'racing'` phase.

### 5. ❌ Camera started before sequence began
**Problem:** `sequenceStartTime = 0` meant the camera code ran with `sequenceElapsed = elapsed - 0 = elapsed`, which grows from page load. After 8s, the camera would fall through all garage phases to normal racing camera.

**Fix:** Added `sequenceStartTime > 0` check in `updateCamera()` to only use garage camera logic when the sequence has actually started:

```javascript
if (raceSequencePhase !== 'racing' && garageGroup && sequenceStartTime > 0) {
  // Garage camera logic
}
```

### 6. ❌ reset() double-counted garage offset
**Problem:** `car.position.set(car.userData.garagePosition.x - 50, ...)` subtracted 50 again when `garagePosition.x` already included the offset.

**Fix:** Use `garagePosition` directly without subtracting 50:

```javascript
// Before (WRONG):
car.position.set(car.userData.garagePosition.x - 50, ...);

// After (CORRECT):
car.position.set(car.userData.garagePosition.x, ...);
```

### 7. ❌ updateRace() overrode garage visibility/positions
**Problem:** `updateRace()` set `car.visible = racer.active` and updated car positions even during the garage sequence, conflicting with garage animation.

**Fix:** Added `inGarageSequence` check to skip visibility and position overrides:

```javascript
if (!inGarageSequence) {
  car.visible = racer.active || (car.userData.boost > 0 && wasActive);
}
// ... later ...
if (!inGarageSequence) {
  car.userData.currentT = clamp(seasonPosition - car.userData.currentGap, 0.012, 0.976);
}
```

### 8. ❌ Scene not rendered during garage sequence
**Problem:** `renderer.render(scene, camera)` only ran when `active = true`, so the garage sequence wasn't visible until the race view was fully activated.

**Fix:** Render during garage sequence even before `active` is true:

```javascript
if (active || (raceSequencePhase !== 'racing' && sequenceStartTime > 0)) {
  renderer.render(scene, camera);
}
```

### 9. ✅ Added getGarageState() API
**New:** Exposed garage sequence state for test pages to monitor:

```javascript
window.mgp3d.getGarageState()
// Returns: { phase, sequenceStartTime, elapsed, garageVisible, carsInGarage }
```

## New Phase Timings

The garage sequence now has cleaner phase boundaries:

| Phase | Time | Description |
|-------|------|-------------|
| 1 | 0-2s | Garage door opens |
| 2 | 2-3s | Fade to black |
| 3 | 3-5.5s | Cars move from garage to track start positions |
| 4 | 5.5-7s | Fade back from black |
| 5 | 7-8s | Scene restored to normal colors |
| 6 | 8s+ | Racing phase begins |

## Test Pages Updated

### test-gemini.html
- ✅ Calls `activate()` before `startGarageSequence()`
- ✅ Waits 8.5s for garage sequence to complete before starting race
- ✅ Calls `updateRace()` only after sequence finishes

### test-garage.html
- ✅ Uses `getGarageState()` to monitor phase in real-time
- ✅ Displays current phase and elapsed time
- ✅ Updated phase descriptions to match new timings

## Files Modified

1. ✅ `race3d.js` - All core fixes
2. ✅ `test-gemini.html` - Updated to trigger garage sequence properly
3. ✅ `test-garage.html` - Updated phase monitoring and descriptions

## Backups Created

- `race3d.js.backup-before-garage-fix2`
- `race3d.js.backup-before-label-fix`
- `race3d.js.backup-before-mgp3d-fix`

## Testing

Open `test-garage.html` in a browser:
1. Click "▶ Start Race" button
2. Watch the garage sequence play out
3. Monitor phase changes in real-time
4. After 8 seconds, cars should be on track and racing should begin

Expected visual flow:
- Black screen → garage interior with cars visible
- Garage door opens (0-2s)
- Fade to black (2-3s)
- Cars move from garage to track (3-5.5s)
- Fade back from black (5.5-7s)
- Scene restored (7-8s)
- Racing begins (8s+)
