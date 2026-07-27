# Model Grand Prix - Reusable Framework

A complete, production-ready framework for creating interactive AI model race visualizations. One framework, multiple race configurations.

## 📦 What You Get

- **Interactive Timeline Graph** - Visualize model releases and capabilities
- **3D WebGL Race** - Cinematic race visualization with predictive overtakes
- **Broadcast Camera System** - 10+ camera angles with smart auto-director
- **Audio System** - BGM, SFX, crowd reactions, engine sounds
- **Stunt System** - Visual representations of model capabilities
- **Replay System** - Instant replay of key moments
- **Colorblind Modes** - Accessibility support
- **Race Presets** - Quick, Standard, Extended, Cinematic modes

## 🎯 Quick Start

### Run the Default Race (Anthropic vs OpenAI vs Moonshot)

```bash
cd model-grand-prix
python3 -m http.server 8080
# Open http://localhost:8080
```

### Run Gemini vs DeepSeek Race

```bash
cd model-grand-prix
python3 -m http.server 8080
# Open http://localhost:8080/gemini-vs-deepseek.html
```

## 🔧 Creating Your Own Race

### Step 1: Create Config File

Create a new config file in `configs/` directory:

```javascript
// configs/my-race.js
window.RACE_CONFIG = {
  name: "My Custom Race",
  companyOrder: ["company1", "company2"],
  companies: {
    company1: {
      name: "Company One",
      family: "Model Family",
      color: "#ff0000",
      number: "01",
      current: "model-latest"
    },
    company2: {
      name: "Company Two",
      family: "Model Family",
      color: "#0000ff",
      number: "02",
      current: "model-latest"
    }
  },
  sources: [
    { id: 1, group: "Official", title: "Source Title", url: "https://..." }
  ],
  stuntEvents: {
    "model-id": {
      type: "logic-leap",
      metric: "reasoning",
      sourceIds: [1],
      name: "STUNT NAME",
      category: "CATEGORY",
      description: "Description"
    }
  },
  models: [
    {
      company: "company1",
      id: "model-1",
      name: "Model 1",
      date: "2024-01-15",
      scores: { overall: 85, reasoning: 90, coding: 80, context: 88 },
      confidence: "high",
      summary: "Brief description",
      evidence: "Detailed evidence",
      sources: [1]
    }
  ]
};
```

### Step 2: Create HTML File

Create a new HTML file (copy from `gemini-vs-deepseek.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Race - Model Grand Prix</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Copy all content from gemini-vs-deepseek.html -->
  <!-- Just change the config script tag: -->
  <script src="configs/my-race.js"></script>
  <script src="app.js"></script>
  <!-- ... rest of scripts -->
</body>
</html>
```

### Step 3: Run It

```bash
python3 -m http.server 8080
# Open http://localhost:8080/my-race.html
```

## 📁 Project Structure

```
model-grand-prix/
├── app.js                      # Main application logic
├── race3d.js                   # 3D race engine (WebGL)
├── metrics.js                  # Scoring system
├── stunt-framework.js          # Stunt animation system
├── audio.js                    # Audio system
├── styles.css                  # Styles
├── configs/
│   ├── default.js              # Default race config
│   └── gemini-vs-deepseek.js   # Gemini vs DeepSeek config
├── vendor/
│   └── three.min.js            # Three.js library
├── index.html                  # Default race page
├── gemini-vs-deepseek.html     # Gemini vs DeepSeek page
├── race-selector.html          # Race picker landing page
├── docs/                       # Build history, phase reports, design docs
├── archive/                    # Superseded pre-refactor file backups
└── tools/
    ├── test-framework.html     # Framework test page
    ├── capture-garage.html     # Garage capture/recording tool
    └── ...                     # Other dev/debug test pages
```

## 🎮 Race Config Format

### Required Fields

```javascript
window.RACE_CONFIG = {
  name: "Race Name",
  companyOrder: ["company1", "company2"],  // Order in leaderboard
  companies: { /* company definitions */ },
  sources: [ /* source definitions */ ],
  stuntEvents: { /* stunt definitions */ },
  models: [ /* model definitions */ ]
};
```

### Company Definition

```javascript
companies: {
  companyKey: {
    name: "Display Name",      // Shown in UI
    family: "Model Family",    // Optional description
    color: "#hex_color",       // Company color
    number: "01",              // Car number (2 digits)
    current: "model-id"        // ID of current flagship model
  }
}
```

### Model Definition

```javascript
models: [
  {
    company: "companyKey",     // Must match company key
    id: "unique-model-id",     // Unique identifier
    name: "Model Name",        // Display name
    date: "YYYY-MM-DD",        // Release date
    scores: {                  // Performance scores (0-100)
      overall: 85,
      reasoning: 90,
      coding: 80,
      context: 88
    },
    confidence: "high",        // "low", "medium", or "high"
    summary: "Brief summary",
    evidence: "Detailed evidence",
    sources: [1, 2]            // Source IDs
  }
]
```

### Stunt Event Definition

```javascript
stuntEvents: {
  "model-id": {
    type: "logic-leap",        // Stunt type (see below)
    metric: "reasoning",       // Metric to use for difficulty
    sourceIds: [1],            // Source references
    name: "STUNT NAME",        // Display name
    category: "CATEGORY",      // Category label
    description: "Description"
  }
}
```

**Available Stunt Types:**
- `logic-leap` - Reasoning capability (ramp jump)
- `code-drift` - Coding capability (drift through cones)
- `tool-swarm` - Agent/tool use (navigate gates)
- `memory-helix` - Context window (tunnel with beacons)
- `prism-roll` - Multimodal capability (prism flip)
- `agent-swarm` - Multi-agent systems (swarm split)
- `endurance-night` - Long-horizon agents (night stage)
- `open-gate` - Openness/deployability (garage)

## 🎨 Features

### Visual Effects
- Post-processing overlays (vignette, grain, DOF)
- Weather effects (rain, fog, heat shimmer)
- Lens flare
- Cinema bars
- Camera shake

### Camera System
- **Auto Director** - Smart camera switching
- **Manual Cameras** - Chase, Cockpit, Drone, Trackside, Orbit
- **Special Shots** - Battle, Kerb, Reverse, Crane, Finish Line
- **Cinematic Levels** - Calm, Broadcast, Cinematic+

### Audio System
- **BGM** - Background music
- **SFX** - Engine sounds, gear shifts, boosts
- **Crowd** - Cheers, gasps
- **Horns** - Overtake signals

### Race Presets
- **Quick** - Major milestones only, fast pace
- **Standard** - Balanced coverage
- **Extended** - Detailed milestone coverage
- **Cinematic** - Maximum detail, longer duration

### Accessibility
- Colorblind modes (Protanopia, Deuteranopia, Tritanopia)
- Keyboard navigation
- Screen reader support
- Reduced motion support

## 🧪 Testing

Test the framework with:

```bash
python3 -m http.server 8080
# Open http://localhost:8080/tools/test-framework.html
```

This will verify:
- Config loading
- Company definitions
- Model definitions
- Stunt events
- Sources

## 📝 Example Configs

### Default Race (3 Companies)

See `configs/default.js` - Anthropic, OpenAI, Moonshot AI with 40+ models

### Gemini vs DeepSeek (2 Companies)

See `configs/gemini-vs-deepseek.js` - Focused comparison with 7 models

## 🔧 Technical Details

### Framework Features

- **Single Codebase** - One `app.js` works with any config
- **Dynamic Timeline** - Automatically adjusts to model date range
- **Config Override** - `window.RACE_CONFIG` overrides defaults
- **Backward Compatible** - Works without config (uses defaults)

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Requirements

- WebGL support
- Modern JavaScript (ES6+)
- Three.js (included in `vendor/`)

## 📖 Documentation

- **Full Documentation** - See `docs/FULL-PROJECT-DOCUMENTATION.md`
- **Phase Reports** - See `phase*-completion.md` files
- **Research Notes** - See `docs/research-notes.md`

## 🎯 Use Cases

1. **AI Model Comparison** - Compare different AI companies
2. **Product Launches** - Visualize product evolution
3. **Competitive Analysis** - Track competitors over time
4. **Historical Data** - Any time-series data with events
5. **Educational** - Teach about AI model development

## 🤝 Contributing

1. Create a new config in `configs/`
2. Create corresponding HTML file
3. Test with `tools/test-framework.html`
4. Update this README

## 📄 License

MIT License - See original project for details

## 🎉 Ready to Use

The framework is complete and production-ready. Create your own race configs and start visualizing!

---

**Framework Version:** 1.0  
**Last Updated:** 2026-07-24  
**Status:** Production Ready ✅
