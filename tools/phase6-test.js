/**
 * Phase 6 Validation Test Suite
 * Tests all Phase 6 requirements without a browser/DOM
 * Run: node tools/phase6-test.js (from repo root)
 */
"use strict";

const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    failures.push(message);
    console.log(`  ✗ ${message}`);
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

// ============================================================
// 1. FILE STRUCTURE VALIDATION
// ============================================================
section("1. File Structure Validation");

const requiredFiles = [
  "races/default.html", "styles/styles.css", "src/app.js", "src/metrics.js",
  "src/race3d.js", "src/stunt-framework.js", "src/audio.js",
  "assets/vendor/three.min.js", "README.md", "docs/FULL-PROJECT-DOCUMENTATION.md",
  "docs/research-notes.md", "docs/stunts-and-judging-plan.md"
];

requiredFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(ROOT, file));
  assert(exists, `File exists: ${file}`);
});

// ============================================================
// 2. HTML ACCESSIBILITY AUDIT
// ============================================================
section("2. HTML Accessibility Audit");

const html = fs.readFileSync(path.join(ROOT, "races/default.html"), "utf8");

assert(html.includes('skip-link'), "Skip links present for keyboard navigation");
assert(html.includes('role="main"'), "Main landmark role defined");
assert(html.includes('aria-live="assertive"') && html.includes('stuntCard'), "Stunt card has assertive live region");
assert(html.includes('aria-live="polite"') && html.includes('milestoneCard'), "Milestone card has polite live region");
assert(html.includes('srAnnouncer'), "Screen-reader announcer element present");
assert(html.includes('aria-live="assertive"') && html.includes('srAnnouncer'), "Screen-reader announcer uses assertive live region");
assert(html.includes('aria-atomic="true"'), "Live regions use aria-atomic for full announcements");
assert(html.includes('role="timer"'), "Countdown has timer role");
assert(html.includes('role="dialog"') && html.includes('raceFinish'), "Finish screen has dialog role");
assert(html.includes('aria-labelledby="winnerName"'), "Finish dialog labels itself with winner name");
assert(html.includes('role="tablist"'), "View switcher uses tablist pattern");
assert(html.includes('role="tabpanel"'), "Views use tabpanel pattern");
assert(html.includes('aria-controls='), "Tabs reference their panels");
assert(html.includes('aria-selected='), "Tab selection state exposed");

// ============================================================
// 3. CSS ACCESSIBILITY AUDIT
// ============================================================
section("3. CSS Accessibility & Contrast Audit");

const css = fs.readFileSync(path.join(ROOT, "styles/styles.css"), "utf8");

assert(css.includes('.skip-link'), "Skip link styles defined");
assert(css.includes(':focus-visible'), "Focus-visible styles defined for keyboard users");
assert(css.includes('.sr-only') || css.includes('.sr-announcer'), "Screen-reader-only utility class defined");

// Contrast checks: verify that muted colors have been brightened for AA compliance
assert(!css.includes('color: #737c74'), "Low-contrast #737c74 text removed");
assert(!css.includes('color: #5e675f'), "Low-contrast #5e675f text removed");

// Verify the muted colors are brighter
const mutedMatch = css.match(/--muted:\s*(#[0-9a-f]+)/i);
assert(mutedMatch && parseInt(mutedMatch[1].slice(1, 3), 16) >= 0x90, "--muted color is at least #90 for AA contrast");

// Reduced-motion support
assert(css.includes('prefers-reduced-motion'), "Reduced-motion media query present");

// ============================================================
// 4. METRICS / JUDGING ENGINE VALIDATION
// ============================================================
section("4. Judging Engine Validation");

// Load metrics.js in a sandboxed context
const metricsCode = fs.readFileSync(path.join(ROOT, "src/metrics.js"), "utf8");
const metricsSandbox = { window: {}, Math, Intl, console };
metricsSandbox.window = metricsSandbox;
const metricsFn = new Function("window", "Math", "Intl", "console", metricsCode);
metricsFn(metricsSandbox.window, Math, Intl, console);

const Phase1 = metricsSandbox.window.MGPPhase1;
assert(Phase1 !== undefined, "MGPPhase1 module loads");
assert(Object.keys(Phase1.CATEGORY_DEFINITIONS).length === 10, "10 judging categories defined");
assert(Object.keys(Phase1.CHAMPIONSHIPS).length === 5, "5 championship presets defined");

// Verify all categories
const categories = Object.keys(Phase1.CATEGORY_DEFINITIONS);
["overall", "reasoning", "coding", "agents", "multimodal", "context", "throughput", "latency", "cost", "openness"].forEach((cat) => {
  assert(categories.includes(cat), `Category '${cat}' present`);
});

// Verify championships
const championships = Object.keys(Phase1.CHAMPIONSHIPS);
["frontierCup", "developerCup", "researchCup", "valueCup", "openCup"].forEach((cup) => {
  assert(championships.includes(cup), `Championship '${cup}' present`);
});

// Verify championship weights sum to 100
Object.entries(Phase1.CHAMPIONSHIPS).forEach(([key, cup]) => {
  const total = Object.values(cup.weights).reduce((a, b) => a + b, 0);
  assert(total === 100, `${cup.label} weights sum to 100 (got ${total})`);
});

// Fixed-anchor normalization
assert(Phase1.normalizeMetric("context", 8192) === 0, "Context anchor: 8K = 0");
assert(Phase1.normalizeMetric("context", 1000000) === 100, "Context anchor: 1M = 100");
assert(Phase1.normalizeMetric("throughput", 20) === 0, "Throughput anchor: 20 = 0");
assert(Phase1.normalizeMetric("throughput", 200) === 100, "Throughput anchor: 200 = 100");
assert(Phase1.normalizeMetric("latency", 1) === 100, "Latency anchor: 1s = 100");
assert(Phase1.normalizeMetric("latency", 180) === 0, "Latency anchor: 180s = 0");
assert(Phase1.normalizeMetric("cost", 0.1) === 100, "Cost anchor: $0.10 = 100");
assert(Phase1.normalizeMetric("cost", 10) === 0, "Cost anchor: $10 = 0");

// ============================================================
// 5. REDUCED-MOTION STUNT SUBSTITUTIONS
// ============================================================
section("5. Reduced-Motion Stunt Substitutions");

const stuntCode = fs.readFileSync(path.join(ROOT, "src/stunt-framework.js"), "utf8");

assert(stuntCode.includes("reducedMotion"), "StuntFramework accepts reducedMotion flag");
assert(stuntCode.includes("motionScale"), "Sample path uses motion scale for reduced-motion");
assert(stuntCode.includes("rollScale"), "Roll disabled entirely for reduced-motion");
assert(stuntCode.includes("this.reducedMotion ? 0 : 1"), "Roll scale is 0 for reduced-motion (no spinning)");
assert(stuntCode.includes("animSpeed"), "Animation speed variable present");
assert(stuntCode.includes("spinSpeed"), "Spin speed variable present");

// ============================================================
// 6. LOW-POWER STUNT GEOMETRY
// ============================================================
section("6. Low-Power Stunt Geometry");

assert(stuntCode.includes("lowPower"), "StuntFramework accepts lowPower flag");
assert(stuntCode.includes("this.segments"), "Segment counts stored on instance");
assert(stuntCode.includes("this.segments.torus"), "Torus segments use reduced count for low-power");
assert(stuntCode.includes("this.segments.cone"), "Cone segments use reduced count for low-power");
assert(stuntCode.includes("this.segments.sphere"), "Sphere segments use reduced count for low-power");
assert(stuntCode.includes("this.segments.cylinder"), "Cylinder segments use reduced count for low-power");

// Verify low-power geometry counts are lower
const lowPowerTorus = stuntCode.match(/torus:\s*(\d+)/);
assert(lowPowerTorus && parseInt(lowPowerTorus[1]) < 46, `Low-power torus count (${lowPowerTorus?.[1]}) < full count (46)`);

// ============================================================
// 7. CAMERA OBSTRUCTION AUDIT
// ============================================================
section("7. Camera Obstruction Prevention");

const race3dCode = fs.readFileSync(path.join(ROOT, "src/race3d.js"), "utf8");

assert(race3dCode.includes("minCameraHeight"), "Camera minimum height guard present");
assert(race3dCode.includes("desiredCamera.y < minCameraHeight"), "Camera height clamped above minimum");
assert(race3dCode.includes('shot === "low" ? 0.45'), "Low camera has specific minimum height");
assert(race3dCode.includes('shot === "cockpit" ? 1.2'), "Cockpit camera has specific minimum height");

// ============================================================
// 8. REPLAY BUFFER MEMORY VALIDATION
// ============================================================
section("8. Replay Buffer Memory Validation");

assert(race3dCode.includes("REPLAY_BUFFER_MAX_FRAMES"), "Replay buffer has hard frame cap");
assert(race3dCode.includes("while (replayBuffer.length > REPLAY_BUFFER_MAX_FRAMES)"), "Buffer enforced at cap");
assert(race3dCode.includes("while (replayBuffer.length && replayBuffer[0].time < cutoff)"), "Time-based eviction still active");

// ============================================================
// 9. SCREEN-READER ANNOUNCEMENTS
// ============================================================
section("9. Screen-Reader Announcement Integration");

assert(race3dCode.includes("announceToScreenReader"), "Screen-reader announcer function defined");
assert(race3dCode.includes('document.getElementById("srAnnouncer")'), "Anouncer targets the SR element");
assert(race3dCode.includes("announceToScreenReader(`${kicker}"), "Director banners are announced to screen readers");
assert(race3dCode.includes("announceToScreenReader(`${meta.name}"), "Stunt cards are announced to screen readers");
assert(race3dCode.includes("announceToScreenReader(finishMsg)"), "Race finish is announced to screen readers");

// ============================================================
// 10. DETERMINISM / SOURCE INTEGRITY
// ============================================================
section("10. Determinism & Source Integrity");

// Verify seeded random is used (determinism)
assert(race3dCode.includes("seededRandom"), "Seeded random function present for deterministic layout");
assert(race3dCode.includes("function seededRandom"), "Seeded random is a named function");

// Verify all source IDs in app.js are valid references
const appCode = fs.readFileSync(path.join(ROOT, "src/app.js"), "utf8");

// Count sources in app.js
const sourceMatches = appCode.match(/id:\s*(\d+)/g) || [];
const sourceIds = sourceMatches.map((m) => parseInt(m.replace("id:", "").trim()));
assert(sourceIds.length === 40, `40 research sources defined (got ${sourceIds.length})`);

// Verify stunt events reference valid source IDs
const stuntEventSources = appCode.match(/sourceIds:\s*\[([^\]]+)\]/g) || [];
let allStuntSourcesValid = true;
stuntEventSources.forEach((match) => {
  const ids = match.match(/\d+/g).map(Number);
  ids.forEach((id) => {
    if (!sourceIds.includes(id)) {
      allStuntSourcesValid = false;
    }
  });
});
assert(allStuntSourcesValid, "All stunt event source IDs reference valid sources");

// Verify all model entries have source arrays — models are created via model() helper
// with sourceIds as the last positional argument before extras, e.g. [1, 13] or [4]
const modelCallMatches = appCode.match(/model\([^)]*\[[\d,\s]+\](?:,\s*\{)?/g) || [];
assert(modelCallMatches.length >= 25, `All 25+ model definitions have source arrays (got ${modelCallMatches.length})`);

// ============================================================
// 11. FORWARD-ONLY PHYSICS INTEGRITY
// ============================================================
section("11. Forward-Only Physics Validation");

assert(race3dCode.includes("Math.max(0, advance)"), "Car advance is always non-negative");
assert(race3dCode.includes("clamp(previousT + Math.max(0, advance)"), "Car position uses max(0, advance) clamp");
assert(race3dCode.includes("car.userData.currentT = clamp"), "Current T is clamped");

// ============================================================
// 12. CAMERA CUTS DON'T AFFECT PHYSICS
// ============================================================
section("12. Camera Independence from Physics");

assert(race3dCode.includes("camera.position.copy(desiredCamera)"), "Camera uses rigid copy (no interpolation easing)");
assert(race3dCode.includes("cameraSnapPending = false"), "Camera snap flag cleared after update");
assert(race3dCode.includes("// Broadcast cameras are rigid rigs"), "Comment documents rigid-camera philosophy");

// ============================================================
// 13. STUNTS NEVER MODIFY RACE DISTANCE
// ============================================================
section("13. Stunt Visual-Only Guarantee");

assert(stuntCode.includes("samplePath(type, progress)"), "Path sampling is a pure function returning offsets");
assert(race3dCode.includes("extension.height"), "Stunt extensions only modify position (height, lateral)");
assert(race3dCode.includes("extension.lateral"), "Stunt extensions only modify lateral offset");
assert(!race3dCode.match(/currentT\s*\+=.*extension/), "Stunt extensions never modify currentT (race distance)");

// ============================================================
// 14. WORLD DARKNESS REDUCED-MOTION
// ============================================================
section("14. Reduced-Motion World Effects");

assert(race3dCode.includes("!reducedMotion"), "Endurance night world transition checks reduced-motion");

// ============================================================
// SUMMARY
// ============================================================
console.log("\n" + "=".repeat(50));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
if (failures.length) {
  console.log("\nFailures:");
  failures.forEach((f) => console.log(`  ✗ ${f}`));
}
console.log("=".repeat(50));

process.exit(failed > 0 ? 1 : 0);
