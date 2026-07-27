# Model Grand Prix - Custom Race Framework

## What Is This?

A complete, working framework for creating interactive 3D AI model races with:
- Interactive timeline graphs
- 3D race visualization
- Cinematic camera system
- Full audio system

## Quick Start

### 1. Copy the Project

```bash
cp -r model-grand-prix my-custom-race
cd my-custom-race
```

### 2. Edit Your Data

Open `app.js` and edit:
- `companies` object (line ~28)
- `models` array (line ~139)
- `sources` array (line ~108)

### 3. Run It

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Documentation

- **[HOW-TO-CREATE-CUSTOM-RACE.md](../HOW-TO-CREATE-CUSTOM-RACE.md)** - Complete guide with examples
- **[FULL-PROJECT-DOCUMENTATION.md](FULL-PROJECT-DOCUMENTATION.md)** - Technical documentation

## Example: Gemini vs DeepSeek

See `HOW-TO-CREATE-CUSTOM-RACE.md` for a complete example showing how to create a race between Google Gemini and DeepSeek models.

## Features

✅ Interactive SVG graph with timeline
✅ 3D race with WebGL (Three.js)
✅ Cinematic camera system (10+ camera types)
✅ Full audio system (BGM, SFX, crowd reactions)
✅ Stunt animations for model releases
✅ Instant replay system
✅ Responsive design

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local server, optional)

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Files

```
model-grand-prix/
├── app.js                    # Main application logic + YOUR DATA
├── metrics.js                # Scoring system
├── race3d.js                 # 3D race engine
├── audio.js                  # Audio system
├── stunt-framework.js        # Stunt animations
├── vendor/
│   └── three.min.js          # Three.js library
├── styles.css                # All styles
├── index.html                # Main page
├── HOW-TO-CREATE-CUSTOM-RACE.md  # Your guide
└── FULL-PROJECT-DOCUMENTATION.md # Technical docs
```

## Need Help?

1. Read [HOW-TO-CREATE-CUSTOM-RACE.md](../HOW-TO-CREATE-CUSTOM-RACE.md)
2. Check browser console (F12) for errors
3. Compare your code with the examples in the guide

## License

MIT License

---

**Start by reading [HOW-TO-CREATE-CUSTOM-RACE.md](../HOW-TO-CREATE-CUSTOM-RACE.md)**
