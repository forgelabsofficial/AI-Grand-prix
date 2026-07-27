# Tools & Test Pages

Developer/debug pages used while building Model Grand Prix. Not part of the
production race experience (`index.html`, `gemini-vs-deepseek.html`,
`race-selector.html` at the repo root) but kept here for regression testing.

- `test-framework.html` — sanity-checks a race config against the framework
- `test-garage.html`, `test-gemini.html` — garage/camera sequence test harnesses
- `test-fullscreen.html`, `test-isolated-fullscreen.html`, `test-simple-fullscreen.html`, `test-buttons-work.html` — fullscreen/UI behavior tests
- `capture-garage.html` — records/exports garage sequence video via jszip
- `phase6-test.js` — Node-based automated assertion suite (`node tools/phase6-test.js` from the repo root, or `node phase6-test.js` from inside `tools/`)

All HTML pages here load shared assets (`styles.css`, `app.js`, `configs/*`,
`vendor/*`, etc.) from the parent directory via `../` relative paths.
