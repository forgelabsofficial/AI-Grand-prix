# 🚀 Model Grand Prix - START HERE

## ✅ Framework Complete!

Your Model Grand Prix has been successfully transformed into a **reusable framework**.

## 🎯 What You Have

### Two Working Races

1. **Default Race** (Anthropic vs OpenAI vs Moonshot)
   - 40+ models across 3 companies
   - Timeline: 2021-2026
   - Open: `http://localhost:8080`

2. **Gemini vs DeepSeek**
   - 7 models across 2 companies
   - Timeline: 2023-2025
   - Open: `http://localhost:8080/gemini-vs-deepseek.html`

## 🚀 Quick Start

```bash
cd /home/user/model-grand-prix
python3 -m http.server 8080
```

Then open in your browser:
- Default race: http://localhost:8080
- Gemini vs DeepSeek: http://localhost:8080/gemini-vs-deepseek.html

## 🎨 How It Works

### The Magic

One framework (`app.js`) works with any race config:

```javascript
// app.js checks for custom config
if (window.RACE_CONFIG) {
  // Use custom data instead of defaults
  companies = window.RACE_CONFIG.companies;
  models = window.RACE_CONFIG.models;
  // ... etc
}
```

### Each Race Has Its Own Config

```
configs/
├── default.js              → Used by index.html
└── gemini-vs-deepseek.js   → Used by gemini-vs-deepseek.html
```

## 🔧 Create Your Own Race

### Step 1: Create Config

```bash
cp configs/gemini-vs-deepseek.js configs/my-race.js
```

Edit `configs/my-race.js` with your data.

### Step 2: Create HTML

```bash
cp gemini-vs-deepseek.html my-race.html
```

Change line 516 in `my-race.html`:
```html
<script src="configs/gemini-vs-deepseek.js"></script>
```
to:
```html
<script src="configs/my-race.js"></script>
```

### Step 3: Run

```bash
python3 -m http.server 8080
# Open http://localhost:8080/my-race.html
```

## 📖 Documentation

- **README.md** - Complete framework documentation
- **HOW-TO-CREATE-CUSTOM-RACE.md** - Step-by-step guide
- **QUICKSTART.md** - Quick start guide
- **test-framework.html** - Test your config

## ✨ Features Preserved

All original features work:
- ✅ Interactive timeline graph
- ✅ 3D WebGL race visualization
- ✅ Predictive overtakes
- ✅ 10+ camera angles
- ✅ Audio system (BGM, SFX, crowd)
- ✅ Stunt animations
- ✅ Replay system
- ✅ Colorblind modes
- ✅ Race presets
- ✅ Full accessibility

## 🎉 You're Ready!

The framework is complete, tested, and production-ready.

**Enjoy creating your own races!** 🏁

---

**Questions?** Check the README.md or HOW-TO-CREATE-CUSTOM-RACE.md
