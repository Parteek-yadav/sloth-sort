# Sloth Sort test report

## Public staging checks

The clean staging runs 17 pure-logic tests with synthetic vectors: parsing, duplicates, explicit limits, normalization/cosine, invalid embeddings, dimensions/counts, threshold bounds, anti-chaining, singleton retention, deterministic output and safe export. These are distinct from model inference. The public staging test result is recorded below after execution.

## Saved real-model smoke evidence

Actual local inference on 2026-10-21: Transformers.js 3.7.2 browser bundle, Xenova/all-MiniLM-L6-v2 revision 751bff37182d3f1213fa05d7196b954e230abad9, q8 WASM, one thread. 15 synthetic notes yielded 384-dimensional finite embeddings. Norm range 0.9999997655907444–1.000000357158479; token counts 11, 11, 9, 13, 11, 12, 9, 9, 11, 10, 8, 8, 10, 9, 16. Saved run 1674 ms is a single development measurement, not a speed or minutes-saved claim.

Assertions passed for item count, finite dimensions, unit norms, complete assignment, minimum cosine threshold and token limits. See evaluation.json and sample-embeddings.json. Existing local assets were reused; the q8 model hash matched the immutable upstream LFS hash. This is real inference but synthetic input, **not accuracy validation**. The published script now requires explicit asset environment variables; it contains no developer-machine paths. The saved inference is historical evidence, not a claim of re-running inference during public staging.

## Illustrative labelled pair analysis

Manually specified, AI-assisted categories cover four three-note topics and three distinct singleton topics. Labels were formalized after output inspection, not blind or held out. All 105 unordered pairs: 12 same-topic and 93 different-topic pairs. Default 0.60 remained unchanged; no tuning-and-reporting on this sample is called validation.

| Threshold | Total groups | Multi-note nests | Singletons | TP | FP | FN | TN |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0.45 | 9 | 4 | 5 | 8 | 0 | 4 | 93 |
| 0.55 | 11 | 3 | 8 | 5 | 0 | 7 | 93 |
| 0.60 | 12 | 3 | 9 | 3 | 0 | 9 | 93 |
| 0.65 | 13 | 2 | 11 | 2 | 0 | 10 | 93 |
| 0.75 | 14 | 1 | 13 | 1 | 0 | 11 | 93 |

TP = same-category pair grouped, FP = different-category pair grouped, FN = same-category pair apart, TN = different-category pair apart. At 0.60, sourdough notes remain separate, showing conservative false negatives. Threshold sensitivity is illustrative, not a benchmark or independent validation.

## Other evidence and limits

Four earlier local HTTP checks passed (http-smoke.json): app HTML, JS and CSS return 200 with expected MIME; missing route returns 404. Model inference here uses the browser WASM bundle in Node, not the in-page download flow. This report does not establish live deployment availability or substitute for desktop/mobile, accessibility, interaction or network QA. Planned Pages URL is pending verification. No minutes-saved or real-user claims are supported.

## Clean staging execution result

Executed 2026-10-22: **17 tests passed, 0 failed, 0 skipped**. Pair-evaluation reproduction exited 0. Final syntax checks passed for app, engine, server, real-model smoke and pair-evaluation modules. With both asset variables absent, real-model smoke exited 1 with the documented setup-required message before creating a cache or attempting a model/runtime download. No fresh real inference was run in staging.
