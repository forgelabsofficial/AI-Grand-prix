# Garage Sequence Implementation

## Overview
The garage sequence is a cinematic intro that plays before the race begins. It shows the cars starting in a garage, then exiting and transitioning to the race track.

## Sequence Structure

The sequence runs for **17 seconds total** and consists of 6 shots with fade transitions:

### Shot 1: Garage Far Shot (0-3s)
- **Camera**: Wide shot showing entire garage interior
- **Cars**: Visible in starting positions inside garage
- **Action**: Garage door begins to open slightly
- **Fade**: Ends with fade to black (3-4s)

### Shot 2: Backside View (4-7s)
- **Camera**: Behind the cars, looking forward through the garage
- **Cars**: Visible from behind, garage door opening more
- **Action**: Door continues opening
- **Fade**: Fade in from black, then fade to black (7-8s)

### Shot 3: Drone View (8-11s)
- **Camera**: Top-down overhead view of garage
- **Cars**: Visible from above
- **Action**: Garage door fully open
- **Fade**: Fade in from black, then cut to black (11-12s)

### Shot 4: Garage Exterior (12-15s)
- **Camera**: Outside garage, facing the front (door)
- **Cars**: Exit garage and drive toward camera
- **Action**: Cars emerge from garage interior to exterior
- **Transition**: Continuous (no fade)

### Shot 5: Cars Pass Camera (15-17s)
- **Camera**: Side view as cars pass by
- **Cars**: Drive past camera toward track
- **Action**: Cars transition from garage area to track entrance
- **Transition**: Continuous (no fade)

### Shot 6: Racing Begins (17s+)
- **Camera**: Track camera view
- **Cars**: Positioned on starting line
- **Action**: Race countdown and start
- **Transition**: Sequence complete

## Camera Positions

All positions are relative to `GARAGE_POS` which is calculated dynamically:
```javascript
GARAGE_POS = { x: -130, y: 0, z: 0 }
```

### Shot 1: Garage Far Shot
- **Position**: `(GARAGE_POS.x, 2.5, GARAGE_POS.z + 18)`
- **LookAt**: `(GARAGE_POS.x, 1, GARAGE_POS.z - 5)`
- **FOV**: 70°
- **Description**: Wide angle view from far back in garage

### Shot 2: Backside View
- **Position**: `(GARAGE_POS.x, 1.8, GARAGE_POS.z - 8)`
- **LookAt**: `(GARAGE_POS.x, 1, GARAGE_POS.z + 10)`
- **FOV**: 65°
- **Description**: Low angle from behind cars

### Shot 3: Drone View
- **Position**: `(GARAGE_POS.x, 12, GARAGE_POS.z)`
- **LookAt**: `(GARAGE_POS.x, 0, GARAGE_POS.z)`
- **FOV**: 50°
- **Description**: Directly overhead, looking down

### Shot 4: Garage Exterior
- **Position**: `(GARAGE_POS.x, 3, GARAGE_POS.z + 35)`
- **LookAt**: `(GARAGE_POS.x, 1.5, GARAGE_POS.z + 20)`
- **FOV**: 60°
- **Description**: Outside garage, cars approaching

### Shot 5: Cars Pass Camera
- **Position**: `(GARAGE_POS.x + 8, 2, GARAGE_POS.z + 40)`
- **LookAt**: `(GARAGE_POS.x, 1, GARAGE_POS.z + 35 + progress * 10)`
- **FOV**: 58°
- **Description**: Side view as cars pass

## Technical Implementation

### Key Functions
- `startGarageSequence()` - Initiates the sequence
- `animateGarageSequence(sequenceElapsed)` - Main animation loop
- `updateGarageSequence()` - Updates camera and car positions each frame
- `completeGarageSequence()` - Finalizes sequence, transitions to race

### State Variables
```javascript
let garageSequenceCamera = null;  // Current camera configuration
let garageSequenceStarted = false;  // Sequence active flag
let sequenceStartTime = 0;  // Timestamp when sequence began
```

### Camera Management
The sequence uses a state machine pattern where `garageSequenceCamera` holds the current camera configuration. The main `updateCamera()` function checks this variable and overrides normal camera behavior when a sequence is active.

```javascript
if (garageSequenceCamera) {
  camera.position.set(garageSequenceCamera.position.x, ...);
  camera.lookAt(garageSequenceCamera.lookAt.x, ...);
  camera.fov = garageSequenceCamera.fov;
  camera.updateProjectionMatrix();
  return; // Skip normal camera logic
}
```

### Fade Transitions
Fades use an HTML overlay div with CSS opacity transitions:
```javascript
fadeOverlay.style.opacity = targetOpacity; // 0 = clear, 1 = black
```

Fade timing is controlled by checking `sequenceElapsed` against thresholds and applying easing functions for smooth transitions.

### Car Positioning
Cars start in garage positions and are animated along a path:
1. Initial positions inside garage (Shot 1-3)
2. Exit garage through door (Shot 4)
3. Drive past camera (Shot 5)
4. Arrive at track start positions (Shot 6)

Car positions are interpolated using easing functions for smooth motion:
```javascript
const progress = easeInOutCubic(elapsed / duration);
car.position.z = startZ + (endZ - startZ) * progress;
```

## Integration

### Starting the Sequence
The sequence is triggered automatically when the page loads:
```javascript
if (state.view === 'race' && autoplay) {
  mgp3d.activate();
  mgp3d.startGarageSequence();
}
```

Or manually via API:
```javascript
window.mgp3d.startGarageSequence();
```

### Sequence Completion
After 17 seconds, `completeGarageSequence()` is called which:
1. Hides the garage structure
2. Positions cars on the track starting line
3. Transitions camera to track view
4. Starts the race countdown

### API Access
```javascript
// Get current sequence state
window.mgp3d.getGarageState()
// Returns: { phase, sequenceStartTime, elapsed, garageVisible, carsInGarage }
```

## Customization

### Adjusting Timing
Modify the time thresholds in `animateGarageSequence()`:
```javascript
if (sequenceElapsed < 3) { /* Shot 1 */ }
else if (sequenceElapsed < 4) { /* Fade 1 */ }
// etc.
```

### Adjusting Camera Angles
Modify the camera position objects in `animateGarageSequence()`:
```javascript
garageSequenceCamera = {
  position: { x, y, z },
  lookAt: { x, y, z },
  fov: number
};
```

### Adjusting Car Speed
Modify the progress calculation in car animation:
```javascript
const progress = easeInOutCubic(elapsed / duration);
// Increase duration for slower movement, decrease for faster
```

## Troubleshooting

### Cars Not Visible
- Check that garage lights are enabled
- Verify car visibility flags are set to true
- Ensure camera is not inside a wall

### Sequence Not Starting
- Verify `startGarageSequence()` is being called
- Check that `garageSequenceStarted` flag is set
- Ensure no JavaScript errors in console

### Camera Not Moving
- Check that `garageSequenceCamera` is being set
- Verify `updateGarageSequence()` is being called in animation loop
- Ensure camera update logic is not being skipped

### Fade Not Working
- Check that `fadeOverlay` element exists
- Verify CSS has `transition: opacity 1s ease`
- Ensure opacity values are 0-1 range

## Files Modified
- `race3d.js` - Main sequence implementation
- `app.js` - Sequence delay timing (17000ms)
- `test-garage.html` - Test page with phase indicators
- `test-gemini.html` - Test page timing (17500ms)
