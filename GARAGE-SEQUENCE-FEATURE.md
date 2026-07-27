# 🏎️ Garage Sequence Feature

## Overview

The garage sequence is a cinematic intro that plays before the race countdown begins. It shows:

1. **Phase 1 (0-2s)**: Cars parked in a garage with the door opening
2. **Phase 2 (2-4s)**: Scene fades to black
3. **Phase 3 (4-6s)**: Cars drive out of the garage and position at the start line
4. **Phase 4 (6-8s)**: Scene fades back to normal
5. **Phase 5 (8s+)**: Race countdown begins

This creates a more immersive and professional racing experience.

## Implementation Details

### Files Modified

1. **race3d.js**
   - Added `createGarage()` function to build the garage scene
   - Added `animateGarageSequence()` function to handle the 5-phase animation
   - Added camera positioning for each phase
   - Added `startGarageSequence()` to trigger the sequence
   - Modified `reset()` to reset garage state
   - Modified `updateCamera()` to handle garage sequence camera positions

2. **app.js**
   - Modified `playRace()` to start the garage sequence before countdown
   - Added 8-second delay before countdown begins

### New Functions

#### `createGarage()`
Creates the garage environment:
- Floor with dark material
- Back wall, side walls, and ceiling
- Animated garage door (moves upward when opening)
- Interior lighting (2 point lights)
- Positions all cars in parking spots inside the garage

#### `animateGarageSequence(elapsed)`
Handles the 5-phase animation sequence:
```javascript
Phase 1 (0-2s):   Open garage door
Phase 2 (2-4s):   Fade to black
Phase 3 (4-6s):   Move cars to start positions
Phase 4 (6-8s):   Fade back to normal
Phase 5 (8s+):    Complete - ready for countdown
```

#### `startGarageSequence()`
Entry point to start the sequence:
```javascript
window.mgp3d.startGarageSequence();
```

#### `easeInOutCubic(t)`
Easing function for smooth transitions during car movement phase.

### Camera Behavior

The camera follows different positions for each phase:

**Phase 1-2**: Inside garage, looking at cars
```javascript
position: (-50, 5, 10)
lookAt: (-50, 2, -5)
```

**Phase 3**: Camera moves with cars (interpolated)
```javascript
position: lerp from (-50, 5, 10) to (0, 5, 10)
lookAt: lerp from (-50, 2, -5) to (0, 2, -5)
```

**Phase 4-5**: At start line, looking at cars
```javascript
position: (0, 5, 10)
lookAt: (0, 2, -5)
```

## Testing

### Test Page

A test page has been created at `model-grand-prix/test-garage-sequence.html`

To test:
```bash
cd /home/user/model-grand-prix
python3 -m http.server 8080
# Open http://localhost:8080/test-garage-sequence.html
```

The test page shows:
- Visual phase indicators (active phase highlighted in green)
- Completed phases (dimmed)
- Status messages
- Start/Restart button

### Expected Behavior

1. Click "Start Garage Sequence"
2. Watch the garage door open (0-2s)
3. Scene fades to black (2-4s)
4. Cars drive out to start line (4-6s)
5. Scene fades back (6-8s)
6. Status shows "Complete"

### Reset Behavior

When you call `window.mgp3d.reset()`:
- Cars return to garage positions
- Garage becomes visible again
- Sequence phase resets to 'garage'
- You can run the sequence again

## Integration with Existing Code

### playRace() Flow

```javascript
function playRace() {
  1. Start garage sequence
  2. Wait 8 seconds for sequence to complete
  3. Run countdown (3, 2, 1, GO)
  4. Start race
}
```

### Backward Compatibility

- Default race (Anthropic vs OpenAI vs Moonshot) works as before
- Custom races (Gemini vs DeepSeek) also work
- No breaking changes to existing functionality

## Technical Notes

### Garage Position

The garage is positioned at `(-50, 0, 0)` in world space, which is:
- 50 units to the left of the start line
- At ground level (y = 0)
- Centered on the Z axis

### Car Storage

Cars store their garage position in `car.userData.garagePosition`:
```javascript
{
  x: lane position,
  y: 0.5,
  z: -10  // Inside garage
}
```

### Lighting

Garage has 2 point lights:
- Position 1: `(-60, 8, 0)` (left side)
- Position 2: `(-40, 8, 0)` (right side)
- Both: white, intensity 2, range 20

### Garage Door

The door is identified by `userData.isDoor = true` and moves upward during Phase 1:
```javascript
door.position.y = 5 + (elapsed / 2) * 10;  // Moves from y=5 to y=15
```

## Customization Options

### Timing

To change sequence timing, modify these values in `animateGarageSequence()`:

```javascript
const doorOpenTime = 2;      // Phase 1 duration
const transitionTime = 4;    // Phase 1+2 duration
const carsOutTime = 6;       // Phase 1+2+3 duration
const finishTime = 8;        // Total sequence duration
```

### Camera Positions

To change camera angles, modify the position/lookAt values in `updateCamera()`:

```javascript
// Phase 1-2 (inside garage)
desiredCamera.set(-50, 5, 10);
desiredLook.set(-50, 2, -5);

// Phase 4-5 (at start line)
desiredCamera.set(0, 5, 10);
desiredLook.set(0, 2, -5);
```

### Skip Sequence

To skip the garage sequence and go straight to countdown:

```javascript
function playRace() {
  // Skip garage sequence
  state.raceStarted = true;
  state.raceRunning = true;
  window.mgp3d?.setRunning(true);
  window.mgpAudio?.setRunning(true);
  state.raceRaf = requestAnimationFrame(raceFrame);
}
```

## Known Limitations

1. **Sequence Duration**: Currently fixed at 8 seconds
2. **Camera Path**: Linear interpolation during Phase 3
3. **Lighting**: Static point lights (no dynamic lighting effects)
4. **Car Movement**: All cars move simultaneously (no staggered exits)

## Future Enhancements

Possible improvements:
- Staggered car exits from garage
- Dynamic lighting (headlights turning on)
- Engine sounds during car movement
- Smoke/dust effects
- Configurable sequence duration
- Multiple camera angle options
- Replay sequence button

## Files Reference

- `race3d.js` - Main implementation (garage scene + animation)
- `app.js` - Integration with playRace()
- `test-garage-sequence.html` - Test page
- `GARAGE-SEQUENCE-FEATURE.md` - This documentation

---

**Status**: ✅ Implemented and tested
**Version**: 1.0
**Date**: 2026-07-24
