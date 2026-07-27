# 📝 How to Create a Custom Race

## Quick Start (3 Steps)

### Step 1: Copy the Project

```bash
cp -r model-grand-prix my-custom-race
cd my-custom-race
```

### Step 2: Edit the Data in src/app.js

Open `src/app.js` and find these sections:

#### 1. Companies (around line 28)

```javascript
const companies = {
  anthropic: {
    name: "Anthropic",
    family: "Claude",
    color: "#ff6b45",
    number: "01",
    current: "claude-fable-5"
  },
  openai: {
    name: "OpenAI",
    family: "GPT / o-series",
    color: "#f4f6f1",
    number: "02",
    current: "gpt-5-6-sol"
  },
  moonshot: {
    name: "Moonshot AI",
    family: "Kimi",
    color: "#a88cff",
    number: "03",
    current: "kimi-k3"
  }
};
```

**Change to your companies:**

```javascript
const companies = {
  google: {
    name: "Google",
    family: "Gemini",
    color: "#4285f4",
    number: "01",
    current: "gemini-2.0-flash"
  },
  deepseek: {
    name: "DeepSeek",
    family: "DeepSeek",
    color: "#4D6BFE",
    number: "02",
    current: "deepseek-v3"
  }
};
```

#### 2. Models (around line 139)

Find the `models` array and replace all entries with your models:

```javascript
const models = [
  {
    company: "google",
    id: "gemini-1.0",
    name: "Gemini 1.0",
    date: Date.parse("2023-12-06T00:00:00Z"),
    scores: {
      overall: 82,
      reasoning: 82,
      coding: 80,
      agents: 78,
      multimodal: 88,
      context: 88
    },
    confidence: "high",
    summary: "First Gemini release",
    evidence: "Strong multimodal capabilities",
    sources: [1]
  },
  {
    company: "deepseek",
    id: "deepseek-v1",
    name: "DeepSeek V1",
    date: Date.parse("2023-11-01T00:00:00Z"),
    scores: {
      overall: 75,
      reasoning: 75,
      coding: 78,
      agents: 72,
      multimodal: 65,
      context: 82
    },
    confidence: "medium",
    summary: "Initial DeepSeek release",
    evidence: "Strong coding performance",
    sources: [1]
  },
  // Add more models...
].sort((a, b) => a.date - b.date);
```

#### 3. Sources (around line 108)

Update the sources array with your references:

```javascript
const sources = [
  { 
    id: 1, 
    group: "Official", 
    title: "Google Gemini Announcement", 
    url: "https://blog.google/technology/ai/google-gemini-ai/" 
  },
  // Add more sources...
];
```

### Step 3: Update HTML Content

Edit your race page (e.g. `races/default.html`) and change:

1. **Page title** (line 6):
```html
<title>Google vs DeepSeek - AI Model Race</title>
```

2. **Header text** (around line 60):
```html
<span class="kicker">AI MODEL EVOLUTION · 2023 — 2024</span>
<h1 id="stageTitle">GOOGLE VS DEEPSEEK</h1>
```

3. **Chart description** (around line 85):
```html
<desc id="chartDesc">Lines show the evidence-backed performance for Google and DeepSeek from 2023 to 2024.</desc>
```

---

## Required Data Structure

### Company Object

```javascript
{
  name: "Display Name",        // Shown in UI
  family: "Model Family",      // Optional
  color: "#hex_color",         // Any hex color
  number: "01",                // Car number (2 digits)
  current: "model-id"          // ID of current flagship model
}
```

### Model Object

```javascript
{
  company: "company_key",      // Must match a company key
  id: "unique-id",             // Unique identifier
  name: "Model Name",          // Display name
  date: Date.parse("YYYY-MM-DDT00:00:00Z"),  // Release date
  scores: {
    overall: 85,              // 0-100 (required)
    reasoning: 88,            // 0-100
    coding: 82,               // 0-100
    agents: 78,               // 0-100
    multimodal: 88,           // 0-100
    context: 88               // 0-100
  },
  confidence: "high",          // "low", "medium", or "high"
  summary: "Brief description",
  evidence: "Detailed evidence",
  sources: [1, 2]              // Array of source IDs
}
```

### Source Object

```javascript
{
  id: 1,
  group: "Category Name",
  title: "Source Title",
  url: "https://example.com"
}
```

---

## Example: Smartphone Race

### Companies (src/app.js)

```javascript
const companies = {
  apple: {
    name: "Apple",
    family: "iPhone",
    color: "#999999",
    number: "01",
    current: "iphone-15-pro"
  },
  samsung: {
    name: "Samsung",
    family: "Galaxy",
    color: "#1428a0",
    number: "02",
    current: "galaxy-s24-ultra"
  }
};
```

### Models (src/app.js)

```javascript
const models = [
  {
    company: "apple",
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    date: Date.parse("2023-09-22T00:00:00Z"),
    scores: {
      overall: 92,
      reasoning: 90,
      coding: 85,
      agents: 88,
      multimodal: 95,
      context: 90
    },
    confidence: "high",
    summary: "Latest iPhone with A17 Pro chip",
    evidence: "Industry-leading performance",
    sources: [1]
  },
  {
    company: "samsung",
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    date: Date.parse("2024-01-31T00:00:00Z"),
    scores: {
      overall: 94,
      reasoning: 92,
      coding: 88,
      agents: 90,
      multimodal: 93,
      context: 92
    },
    confidence: "high",
    summary: "AI-powered flagship",
    evidence: "Advanced AI features",
    sources: [2]
  }
].sort((a, b) => a.date - b.date);
```

---

## Tips

### Choosing Colors

Use contrasting colors for different companies:
- Good: `#ff6b45`, `#4285f4`, `#51cf66`, `#ffd93d`
- Avoid: Colors too similar to each other

### Score Ranges

All scores must be 0-100:
- `overall`: Main score (determines race position)
- `reasoning`, `coding`, etc.: Category scores

### Date Format

Always use ISO format with timezone:
```javascript
Date.parse("2024-01-15T00:00:00Z")
```

### Sorting Models

Always sort models by date:
```javascript
].sort((a, b) => a.date - b.date);
```

---

## Testing Your Custom Race

1. Start the server:
```bash
python3 -m http.server 8080
```

2. Open in browser:
```
http://localhost:8080
```

3. Check:
   - Graph renders with your data
   - Lines show correct colors
   - Clicking graph switches to race mode
   - Cars show correct colors and numbers

---

## Troubleshooting

### Graph Not Rendering

- Check browser console (F12) for JavaScript errors
- Verify all scores are numbers (not strings)
- Check that company keys match between companies and models
- Ensure dates are valid

### Race Mode Not Switching

- Check that `.chart-shell` element exists
- Verify click event listeners are bound
- Check browser console for errors

### Wrong Colors

- Ensure hex colors are valid (include #)
- Check that company keys match
- Verify CSS is loading

---

## That's It!

Just edit the data in `src/app.js` and update the HTML content. The framework handles everything else automatically.

**Happy Racing!** 🏁
