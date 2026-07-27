# Model Grand Prix - Reusable Framework

A complete, production-ready framework for creating interactive AI model race visualizations. **One framework, multiple race configurations.**

## 🎯 What Was Built

The original Model Grand Prix has been transformed into a **reusable framework** where:
- ✅ Core framework code (`src/app.js`, `src/race3d.js`, etc.) is **shared across all races**
- ✅ Race-specific data lives in **separate config files** (`assets/configs/*.js`)
- ✅ Each race has its own HTML page in `races/` that loads its config
- ✅ **No code duplication** - one framework, many races

## 📦 Project Structure

```
model-grand-prix/
├── index.html                     # Race picker / landing page
├── 📁 races/
│   ├── default.html               # Anthropic vs OpenAI vs Moonshot
│   └── gemini-vs-deepseek.html    # Gemini vs DeepSeek
├── 📁 src/
│   ├── app.js                     # Core framework (shared)
│   ├── race3d.js                  # 3D engine (shared)
│   ├── metrics.js                 # Scoring system (shared)
│   ├── stunt-framework.js         # Stunt system (shared)
│   └── audio.js                   # Audio system (shared)
├── 📁 styles/
│   └── styles.css                 # Styles (shared)
├── 📁 assets/
│   ├── configs/                   # Race configurations
│   │   ├── default.js             # Anthropic vs OpenAI vs Moonshot
│   │   └── gemini-vs-deepseek.js  # Gemini vs DeepSeek
│   └── vendor/
│       └── three.min.js           # Three.js library
├── 📁 tools/
│   ├── test-framework.html        # Framework test page
│   └── phase6-test.js             # Automated assertion suite
├── 📁 docs/                       # Build history & design docs
│   └── guides/
│       ├── QUICKSTART.md          # This file
│       └── HOW-TO-CREATE-CUSTOM-RACE.md
├── 📁 archive/                    # Superseded file backups
└── README.md                      # Documentation
```

## 🚀 Quick Start

### Run the Race Picker
```bash
cd /home/user/model-grand-prix
python3 -m http.server 8080
# Open http://localhost:8080
```

### Run Default Race (3 Companies) directly
```bash
# Open http://localhost:8080/races/default.html
```

### Run Gemini vs DeepSeek directly
```bash
# Open http://localhost:8080/races/gemini-vs-deepseek.html
```

### Test Framework
```bash
# Open http://localhost:8080/tools/test-framework.html
```

## 🔧 Creating Your Own Race

### Step 1: Create Config File

Create `assets/configs/my-race.js`:

```javascript
window.RACE_CONFIG = {
  name: "My Race",
  companyOrder: ["company1", "company2"],
  companies: {
    company1: {
      name: "Company One",
      color: "#ff0000",
      number: "01",
      current: "model-latest"
    }
  },
  sources: [
    { id: 1, group: "Official", title: "Source", url: "https://..." }
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
      scores: { overall: 85, reasoning: 90, coding: 80 },
      confidence: "high",
      summary: "Summary",
      evidence: "Evidence",
      sources: [1]
    }
  ]
};
```

### Step 2: Create HTML File

Copy `races/gemini-vs-deepseek.html` to `races/my-race.html` and change:
```html
<script src="../assets/configs/gemini-vs-deepseek.js"></script>
```
to:
```html
<script src="../assets/configs/my-race.js"></script>
```

### Step 3: Run It
```bash
python3 -m http.server 8080
# Open http://localhost:8080/races/my-race.html
```

Optionally add a card for it in the root `index.html` race picker.

## 📊 Available Races

### 1. Default Race (Anthropic vs OpenAI vs Moonshot)
- **File:** `races/default.html`
- **Config:** `assets/configs/default.js`
- **Models:** 40+ models across 3 companies
- **Timeline:** 2021-2026

### 2. Gemini vs DeepSeek
- **File:** `races/gemini-vs-deepseek.html`
- **Config:** `assets/configs/gemini-vs-deepseek.js`
- **Models:** 7 models across 2 companies
- **Timeline:** 2023-2025

## 🎮 Framework Features

### Visual Effects
- Post-processing overlays (vignette, grain, DOF)
- Weather effects (rain, fog, heat shimmer)
- Lens flare
- Camera shake

### Camera System
- Auto Director (10+ camera angles)
- Manual cameras (Chase, Cockpit, Drone, etc.)
- Cinematic levels (Calm, Broadcast, Cinematic+)

### Audio System
- Background music
- Engine sounds
- Crowd reactions
- Overtake horns

### Race Presets
- Quick (major milestones only)
- Standard (balanced)
- Extended (detailed)
- Cinematic (maximum detail)

### Accessibility
- Colorblind modes
- Keyboard navigation
- Screen reader support

## 📖 Documentation

- **README.md** - Complete framework documentation (repo root)
- **HOW-TO-CREATE-CUSTOM-RACE.md** - Step-by-step guide (same folder as this file)
- **docs/FULL-PROJECT-DOCUMENTATION.md** - Original project docs
- **docs/phase*-completion.md** - Development phase reports

## 🧪 Testing

Test the framework with:
```bash
python3 -m http.server 8080
# Open http://localhost:8080/tools/test-framework.html
```

This verifies:
- Config loading
- Company definitions
- Model definitions
- Stunt events
- Source references

There is also a Node-based automated assertion suite:
```bash
node tools/phase6-test.js
```

## ✨ Key Benefits

1. **Single Codebase** - One framework works with any config
2. **Easy to Create Races** - Just write a config file
3. **No Duplication** - All framework code is shared
4. **Production Ready** - Tested and working
5. **Extensible** - Easy to add new features

## 🎯 Use Cases

- Compare AI companies (OpenAI vs Anthropic vs Google)
- Compare AI models (GPT-4 vs Claude vs Gemini)
- Product launches (iPhone vs Samsung vs Pixel)
- Competitive analysis (any time-series data)
- Educational visualizations

## 📝 Example Config Structure

```javascript
window.RACE_CONFIG = {
  name: "Race Name",
  companyOrder: ["key1", "key2"],
  companies: { /* company definitions */ },
  sources: [ /* source definitions */ ],
  stuntEvents: { /* stunt definitions */ },
  models: [ /* model definitions */ ]
};
```

## 🔧 Technical Details

- **Framework:** Vanilla JavaScript + Three.js
- **Rendering:** WebGL (3D) + SVG (2D graph)
- **Audio:** Web Audio API
- **Storage:** LocalStorage for preferences
- **Compatibility:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

## 🎉 Ready to Use

The framework is complete and production-ready. Create your own race configs and start visualizing!

---

**Framework Version:** 1.0
**Created:** 2026-07-24
**Status:** Production Ready ✅
