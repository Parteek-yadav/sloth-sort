# Third-party attribution

Sloth Sort original work is MIT licensed (LICENSE). That license does not relicense the following works. Dependencies are loaded remotely only after an explicit Load AI click; optional model tests require explicitly configured local assets outside this project. Do not vendor upstream binaries without carrying the applicable full licenses and notices.

| Work | Use | License and source |
| --- | --- | --- |
| Hugging Face Transformers.js 3.7.2 | Browser embedding pipeline | Apache-2.0: https://github.com/huggingface/transformers.js/blob/3.7.2/LICENSE ; source https://github.com/huggingface/transformers.js/tree/3.7.2 ; loaded bundle https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js |
| Xenova/all-MiniLM-L6-v2 | ONNX q8 sentence embeddings, pinned revision 751bff37182d3f1213fa05d7196b954e230abad9 | Apache-2.0 per pinned model card https://huggingface.co/Xenova/all-MiniLM-L6-v2/blob/751bff37182d3f1213fa05d7196b954e230abad9/README.md ; files https://huggingface.co/Xenova/all-MiniLM-L6-v2/tree/751bff37182d3f1213fa05d7196b954e230abad9 |
| sentence-transformers/all-MiniLM-L6-v2 | Upstream model credited by Xenova card | Model card https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2 |
| ONNX Runtime Web (Microsoft and contributors) | WASM backend used by Transformers.js | MIT: https://github.com/microsoft/onnxruntime/blob/89f8206ba4/LICENSE ; source https://github.com/microsoft/onnxruntime |

Pinned Xenova card and Transformers.js 3.7.2 license were read directly from their source endpoints on 2026-10-21. ONNX Runtime license and full third-party notices were subsequently obtained from commit 89f8206ba4 for public staging; this is not a legal audit of every transitive component. No third-party visual assets or external fonts are used. This app does not imply endorsement by the model or library authors.

## Full included upstream texts

- LICENSE-TRANSFORMERS-APACHE-2.0.txt — complete Apache-2.0 license from Transformers.js 3.7.2; the model card also declares Apache-2.0.
- LICENSE-ONNXRUNTIME-MIT.txt — complete ONNX Runtime MIT license at commit 89f8206ba4, corresponding to the declared web-runtime dependency.
- NOTICE-ONNXRUNTIME-THIRD-PARTY.txt — complete upstream ThirdPartyNotices.txt at that commit, retained without selective shortening.
- LICENSE-JINJA.txt — complete MIT license for Hugging Face Jinja 0.5.1 (Transformers.js declares ^0.5.1). This is supplemental attribution, not a claim that every bundled component version was independently audited.
- MODEL-CARD-XENOVA.md — complete pinned Xenova model card, crediting the original sentence-transformers model.

UPSTREAM-SOURCES.json records exact successful sources and attempted notice locations. Transformers.js 3.7.2 root NOTICE and dist/transformers.min.js.LICENSE.txt were not available at the checked endpoints; the complete library license is included instead. Upstream runtime notices may mention components beyond this browser path; retaining the full file does not mean all are used. These notices do not relicense the original Sloth Sort code.
