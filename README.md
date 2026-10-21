# Sloth Sort

A local-first browser app for your saved-for-later pile. Built for **Slow and Steady**: paste notes, get conservative similarity nests, then keep or change them.

Source repository: https://github.com/Parteek-yadav/sloth-sort

Planned GitHub Pages address: https://parteek-yadav.github.io/sloth-sort/ — **pending deployment verification; not yet claimed as a working demo**.

## Run locally

Node 20+; no npm install required. Run `node server.mjs`, then open http://127.0.0.1:4175. Use a modern browser supporting WebAssembly. Click **Load AI** explicitly, then **Find their cozy corners**. A 15-note synthetic sample is included.

## Why complete-link?

Normalized MiniLM embeddings represent pasted text. Deterministic complete-link agglomeration merges the highest minimum cross-pair cosine that meets your threshold. A chain of similar neighboring notes cannot force a merge when the weakest cross-pair is below that threshold. Every automatic nest displays its weakest pair similarity; unmatched notes stay singletons. These are cosine similarities, not confidence probabilities or guaranteed topic labels.

The threshold slider spans 0.30–0.90 (default 0.60). Changing it recalculates groups and resets edited names/moves; the UI warns about this. Rename nests or use a select to move notes, including leaving one ungrouped. Human overrides recalculate the displayed minimum and flag below-threshold groups. Markdown export escapes active Markdown and HTML.

Limits reject the whole new operation rather than silently truncate: 80 non-empty notes, 600 characters each, 24,000 input characters total, and 256 AI tokens per note. Duplicates are retained. Language coverage, bare URLs, ambiguity and model bias can still produce poor results.

## Model, privacy and downloads

Transformers.js **3.7.2**, **Xenova/all-MiniLM-L6-v2** revision **751bff37182d3f1213fa05d7196b954e230abad9**, mean pooling, normalized embeddings, **q8 WASM**, one thread. No fake AI fallback is supplied if loading fails.

Only the text you paste is embedded. Pasted URLs remain inert text; the app never fetches their pages or understands linked-page content. Add your own description. Notes/vectors live in page memory; there is no account, telemetry, cookies, service worker or app persistence. Refreshing loses the pile unless you export it.

**Load AI** requests roughly **46 MB** of model/runtime assets from Hugging Face and jsDelivr; transfer size varies. Those providers receive ordinary download/network metadata, not your notes. Transformers browser caching is disabled, but normal HTTP caching may still apply. The initial page uses only its own static files and system fonts/CSS artwork.

## Tests and illustrative evidence

- `node --test engine.test.mjs`: 17 synthetic-vector logic/safety tests. These do not test a real model.
- `node evaluate-pairs.mjs`: reproduces pair-evaluation.json from saved inference output and sample-labels.json without downloads.
- `node real-model-smoke.mjs`: optional real-model smoke; requires explicit local assets as described below.

Saved real-WASM inference evidence covers 15 synthetic notes with 384-dimensional normalized embeddings. At the unchanged default 0.60: **12 total groups = three two-note nests + nine singletons**. Against AI-assisted manually specified categories: 3 same-category pairs grouped, no cross-category pairs grouped, 9 same-category pairs left apart, 93 different-category pairs left apart. Labels were formalized after inspecting outputs, not blind or held out. This is **illustrative, not accuracy validation**; no threshold was tuned and reported against the same data as validation. Other thresholds document sensitivity only. No real-user or minutes-saved claim is made. See TEST-REPORT.md, evaluation.json, sample-embeddings.json and pair-evaluation.json.

## Optional real-model smoke setup

The script never downloads a large runtime or model for you. It fails clearly unless **both SLOTH_RUNTIME and SLOTH_MODEL_CACHE** explicitly name local folders. Keep downloaded assets outside the repository.

SLOTH_RUNTIME must contain:

| Local filename | Pinned source |
| --- | --- |
| transformers.mjs | Download https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js and save under this filename |
| ort-wasm-simd-threaded.jsep.mjs | https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0-dev.20250409-89f8206ba4/dist/ort-wasm-simd-threaded.jsep.mjs |
| ort-wasm-simd-threaded.jsep.wasm | https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0-dev.20250409-89f8206ba4/dist/ort-wasm-simd-threaded.jsep.wasm |

SLOTH_MODEL_CACHE must contain:

| Local filename | Pinned source |
| --- | --- |
| model.onnx | Download https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/751bff37182d3f1213fa05d7196b954e230abad9/onnx/model_quantized.onnx and save under this filename |
| tokenizer.json | https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/751bff37182d3f1213fa05d7196b954e230abad9/tokenizer.json |

The q8 model should be 22,972,370 bytes with SHA-256 `afdb6f1a0e45b715d0bb9b11772f032c399babd23bfc31fed1c170afc848bdb1`. This matches the pinned upstream LFS metadata checked during development.

PowerShell example (replace the two example paths with your own asset locations):

```powershell
$env:SLOTH_RUNTIME = 'C:\your-assets\runtime'
$env:SLOTH_MODEL_CACHE = 'C:\your-assets\model'
node real-model-smoke.mjs
```

POSIX example:

```sh
SLOTH_RUNTIME=/your-assets/runtime SLOTH_MODEL_CACHE=/your-assets/model node real-model-smoke.mjs
```

Only small pinned model metadata may be fetched by the script (config.json, tokenizer_config.json, optional special_tokens_map.json); generated test-assets/ caches are gitignored. A run rewrites evaluation.json and sample-embeddings.json; rerun evaluate-pairs.mjs to refresh pair evidence. It exercises the browser WASM bundle in Node, not the browser UI or its CDN loading path.

## License and attribution

Original app, styling, CSS character and documents: MIT (LICENSE). Model/library licenses remain separate. THIRD-PARTY.md links upstream sources and the full included Apache-2.0, MIT and ONNX Runtime third-party notice texts. MODEL-CARD-XENOVA.md preserves the pinned model card. No model or runtime binaries are bundled.

All source, tests, samples, evidence and documentation are flat root-level files. Generated caches are ignored; do not select them for manual web upload. The app is static and can be served from a subpath without a build step.

## AI-assistance disclosure

An AI coding companion substantially assisted with interface design, original implementation, tests, documentation and local smoke execution. The in-app embedding model represents text; it does not invent titles or decide that a human reassignment is correct. The included synthetic evidence is not real-user research.
