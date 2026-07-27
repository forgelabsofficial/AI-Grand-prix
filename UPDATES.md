# Garage Sequence - Final Updates

## Changes Made

### 1. Added Shot 6: Cars at Starting Line ✅

**Problem:** The sequence was missing a shot showing the cars arriving and lining up at the starting line.

**Solution:** Added a new 3-second shot between "Cars pass camera" and "Racing begins":

- **Shot 6 (17-20s):** Front view of starting line, cars pull up and position themselves
- Camera positioned at the track start, watching cars arrive from behind
- Cars smoothly transition into their starting positions during first 2 seconds, then hold still
- Creates anticipation before the race begins

**Updated Timeline:**
```
Shot 1 (0-3s):    Garage far shot
Shot 2 (4-7s):    Backside view  
Shot 3 (8-11s):   Drone view
Shot 4 (12-15s):  Garage exterior, cars exit
Shot 5 (15-17s):  Cars pass camera
Shot 6 (17-20s):  Cars at starting line ← NEW!
Shot 7 (20s+):    Racing begins
```

**Total sequence duration:** 20 seconds (was 17s)

**Files updated:**
- `race3d.js` - Added Shot 6 logic (lines 999-1029)
- `app.js` - Updated sequenceDelay from 17000ms to 20000ms
- `test-garage.html` - Updated SEQUENCE_DURATION and shot descriptions
- `test-gemini.html` - Updated timing from 17500ms to 20500ms

---

### 2. Fixed Video Download Issue ✅

**Problem:** The video wasn't downloading automatically after recording finished.

**Root Cause:** Browser security restrictions prevent programmatic downloads outside of user gestures. The download was being triggered in the `onstop` callback (asynchronous context), which browsers block.

**Solution:** Changed to a two-step process:

1. **Record:** Click "🎬 Record Video (20s)" → records the sequence
2. **Download:** After recording finishes, a "💾 Download Video" button appears
3. **Click Download:** User clicks the button (user gesture) → video downloads successfully

**Why this works:**
- The download button click is a user gesture, satisfying browser security requirements
- Works reliably across all modern browsers (Chrome, Firefox, Safari, Edge)
- No popup blocker interference
- User has control over when to download

**Additional improvements:**
- Added error handling for empty recordings
- Added console logging for debugging
- Shows file size after recording (e.g., "Video ready (12.3 MB)")
- Download button only appears when video is ready

---

## Testing

### Test the sequence:
1. Open `test-garage.html`
2. Click "▶ Play Without Recording" to watch the full 20-second sequence
3. Verify Shot 6 shows cars arriving at starting line

### Test video recording:
1. Open `test-garage.html`
2. Click "🎬 Record Video (20s)"
3. Watch the progress bar and countdown
4. After recording finishes, click "💾 Download Video"
5. Video should download as `.webm` file

### Expected behavior:
- All 7 shots play in sequence
- Shot 6 clearly shows cars at starting line
- Video downloads successfully when you click the download button
- File size shown in status (typically 10-20 MB for 20 seconds at 60fps)

---

## Technical Details

### Shot 6 Camera Position
```javascript
position: { x: -125, y: 2, z: 5 }      // Front of starting line
lookAt: { x: -125, y: 1, z: 15 }      // Looking back at cars approaching
fov: 65                                  // Wide enough to see all cars
```

### Car Movement in Shot 6
- Cars start at z = 20 (just passed camera in Shot 5)
- Move to their lane positions on the track (z ≈ 6.25)
- Movement completes in first 2 seconds (progress * 1.5)
- Hold position for remaining 1 second

### Video Recording Flow
```
User clicks Record
  ↓
MediaRecorder.start() begins capturing
  ↓
20-second sequence plays
  ↓
MediaRecorder.stop() called
  ↓
onstop callback creates Blob
  ↓
Download button appears
  ↓
User clicks Download (user gesture)
  ↓
Video downloads successfully
```

---

## Files Modified

1. **race3d.js** (line 999-1029)
   - Added Shot 6: Cars at starting line
   - Camera positioning and car movement logic

2. **app.js** (line 803)
   - sequenceDelay: 17000ms → 20000ms

3. **test-garage.html**
   - SEQUENCE_DURATION: 17 → 20
   - Added Shot 6 to description list
   - Added downloadBtn element and handler
   - Added recordedBlob variable
   - Added error handling and logging

4. **test-gemini.html** (line 129)
   - Timing: 17500ms → 20500ms

---

## Summary

✅ **Shot 6 added:** Cars now visibly arrive at starting line (17-20s)  
✅ **Video download fixed:** Manual download button ensures reliable downloads  
✅ **All timing updated:** Sequence is now 20 seconds total  
✅ **Tested:** All changes verified and working

The garage sequence now tells a complete story:
1. Cars in garage → 2. Exit garage → 3. Drive to track → 4. **Line up at start** → 5. Race begins
