# 🐛 Bug Fix: Cars Not Showing in Custom Races

## Problem

When using custom race configurations (like Gemini vs DeepSeek), the 3D race track would show but **no cars would appear**. The default race (Anthropic vs OpenAI vs Moonshot) worked fine.

## Root Cause

In `race3d.js`, the company configuration was hardcoded:

```javascript
const COMPANY_ORDER = ["anthropic", "openai", "moonshot"];
const COMPANY_META = {
  anthropic: { name: "Anthropic", color: "#ff6b45", lane: -3.6 },
  openai: { name: "OpenAI", color: "#f4f6f1", lane: 0 },
  moonshot: { name: "Moonshot AI", color: "#a88cff", lane: 3.6 }
};
```

When using a custom config with companies like `gemini` and `deepseek`, the `createCars()` function would only create cars for the hardcoded companies (anthropic, openai, moonshot). Since the race payload contained different company keys, no cars would be visible.

## Solution

Made `COMPANY_ORDER` and `COMPANY_META` dynamic by checking for `window.RACE_CONFIG`:

```javascript
let COMPANY_ORDER = ["anthropic", "openai", "moonshot"];
let COMPANY_META = {
  anthropic: { name: "Anthropic", color: "#ff6b45", lane: -3.6 },
  openai: { name: "OpenAI", color: "#f4f6f1", lane: 0 },
  moonshot: { name: "Moonshot AI", color: "#a88cff", lane: 3.6 }
};

// Override with custom config if provided
if (window.RACE_CONFIG && window.RACE_CONFIG.companies) {
  COMPANY_ORDER = window.RACE_CONFIG.companyOrder || Object.keys(window.RACE_CONFIG.companies);
  const laneWidth = 3.6;
  const totalCompanies = COMPANY_ORDER.length;
  COMPANY_META = {};
  
  COMPANY_ORDER.forEach((key, index) => {
    const company = window.RACE_CONFIG.companies[key];
    COMPANY_META[key] = {
      name: company.name,
      color: company.color,
      lane: (index - (totalCompanies - 1) / 2) * laneWidth
    };
  });
  
  console.log('[Race3D] Using custom config:', COMPANY_ORDER.join(', '));
}
```

## Key Changes

1. **Changed `const` to `let`**: Allows reassignment of variables
2. **Added config check**: Looks for `window.RACE_CONFIG` before using defaults
3. **Dynamic lane calculation**: Automatically centers cars regardless of count
4. **Logging**: Added console log to confirm custom config is loaded

## How It Works

### Default Race (3 companies)
```
COMPANY_ORDER = ["anthropic", "openai", "moonshot"]
Lanes: -3.6, 0, 3.6
```

### Gemini vs DeepSeek (2 companies)
```
COMPANY_ORDER = ["gemini", "deepseek"]
Lanes: -1.8, 1.8
```

### Custom Race (N companies)
```
COMPANY_ORDER = ["company1", "company2", "company3", ...]
Lanes: centered around 0, spaced 3.6 units apart
```

## Testing

1. **Test with Gemini vs DeepSeek:**
   ```bash
   cd /home/user/model-grand-prix
   python3 -m http.server 8080
   # Open http://localhost:8080/gemini-vs-deepseek.html
   ```

2. **Check browser console:**
   ```
   [Race3D] Using custom config: gemini, deepseek
   ```

3. **Verify cars appear:**
   - 2 cars should be visible
   - Each car should have the correct color
   - Cars should be centered on the track

## Script Loading Order

Important: The config must load before `race3d.js`:

```html
<script src="vendor/three.min.js"></script>
<script src="configs/gemini-vs-deepseek.js"></script>  <!-- Sets window.RACE_CONFIG -->
<script src="race3d.js"></script>  <!-- Reads window.RACE_CONFIG -->
<script src="app.js"></script>
```

## Backward Compatibility

✅ **Fully backward compatible**
- Default race still works without any changes
- No config file needed for default race
- Existing races continue to work as before

## Files Modified

- `race3d.js`: Added dynamic company configuration (15 lines)

## Related

- Framework transformation: `README.md`
- Config format: `HOW-TO-CREATE-CUSTOM-RACE.md`
- Test page: `test-gemini.html`

---

**Status:** ✅ Fixed and tested
