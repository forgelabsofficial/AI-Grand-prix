# Garage Sequence - Camera & Movement Fixes

## Issues Identified

### 1. Shot 3 (Drone View) - Confusing Angle
**Problem:** Camera was inside the garage at y: 8, z: 35, looking at z: 25
- Camera was INSIDE the garage structure (garage spans z: 17.5 to z: 42.5)
- Looking at the back wall instead of showing an overhead view
- Not a proper drone perspective

**Fix:** Moved camera to proper overhead position
- Camera now at y: 25, z: 30 (high above garage)
- Looking straight down at z: 30 (garage center)
- Shows complete garage layout with cars visible from above

### 2. Shot 4 (Car Exit) - Strange Movement
**Problem:** Cars were teleporting during black screen transition
- During "CUT TO BLACK" (11-12s), cars were moved to z: 40
- Then Shot 4 started them at z: 38
- This created a visual jump/discontinuity

**Fix:** Aligned car positions across transition
- Cars now repositioned to z: 38 during black screen (matching Shot 4 start)
- Smooth continuous movement from z: 38 → z: 15
- Camera at z: 10 looking at door (z: 17.5) sees cars exiting naturally

### 3. Shot 6 (Starting Line) - Empty/Nothing Visible
**Problem:** Camera was looking in wrong direction
- Camera at z: 3 looking at z: 6.25 (starting line)
- Cars approaching from z: 8 to z: 6.25
- Cars were BEHIND the starting line from camera's perspective
- Track geometry might not be visible at that angle

**Fix:** Repositioned camera to see cars arriving
- Camera now at x: -135, y: 3, z: 2 (behind starting line)
- Looking at z: 8 (where cars are coming from)
- Cars visible as they approach from z: 8 to z: 6.25
- Camera sees cars arriving at starting line

## Updated Camera Positions

### Shot 3 (8-11s): DRONE VIEW
```
Position: { x: -120, y: 25, z: 30 }
LookAt:   { x: -125, y: 0.5, z: 30 }
FOV: 55°
Effect: High overhead view showing entire garage layout
```

### Shot 4 (12-15s): GARAGE EXTERIOR
```
Position: { x: -105, y: 6, z: 10 }
LookAt:   { x: -125, y: 2, z: 17.5 }
FOV: 60°
Cars: z=38 → z=15 (exit through door)
Effect: Side view of cars emerging through garage door
```

### Shot 5 (15-17s): CARS DRIVE PAST
```
Position: { x: -115, y: 2, z: 12 }
LookAt:   { x: -125, y: 1, z: 8 }
FOV: 65°
Cars: z=15 → z=8 (drive toward starting line)
Effect: Side view of cars driving past camera
```

### Shot 6 (17-20s): ARRIVE AT STARTING LINE
```
Position: { x: -135, y: 3, z: 2 }
LookAt:   { x: -125, y: 1, z: 8 }
FOV: 65°
Cars: z=8 → z=6.25 (arrive at starting line)
Effect: Front-side view of cars arriving at starting line
```

## Complete Spatial Layout

```
Z: 42.5 |==== Back Wall ====|
      |    Garage          |
Z: 38 |    🚗 Cars Start   |
      |                    |
Z: 30 |    GARAGE CENTER   |
      |    📹 Shot 3 Cam   | (y: 25, looking down)
      |                    |
Z: 17.5 |==== Door ====    |  ← Cars exit here
      |                    |
Z: 15 |    🚗 Shot 4 End   |
      |                    |
Z: 12 |    📹 Shot 5 Cam   |
      |                    |
Z: 10 |    📹 Shot 4 Cam   |
      |                    |
Z: 8  |    🚗 Shot 5 End   |
      |    📹 Shot 6 LookAt|
Z: 6.25 |== Starting Line ==|  ← Final destination
      |                    |
Z: 2  |    📹 Shot 6 Cam   |
      |                    |
```

## Car Journey (Final)

1. **Inside Garage** (z=38) - Shots 1-3
2. **Exit Through Door** (z=17.5) - Shot 4
3. **Stop Past Door** (z=15) - Shot 4 end
4. **Drive Toward Line** (z=15 → z=8) - Shot 5
5. **Pass Camera** (z=12) - Shot 5
6. **Arrive at Line** (z=6.25) - Shot 6
7. **Racing Begins** - Shot 7

## Files Modified

- `race3d.js` - Fixed Shot 3, Shot 4, Shot 5, Shot 6 camera positions and car movements
- `test-garage.html` - Video recording with download functionality

All syntax validated and ready to test! 🏁
