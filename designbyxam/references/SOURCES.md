# Sources and Evidence Boundaries

## Case/reference sources

| Source | What it established | What it did not establish |
|---|---|---|
| [Supplied X post](https://x.com/designbyxam/status/2107519830521720984/video/1) | The user-specified demonstration/reference identity | Full video decode, soundtrack analysis or historical implementation recovery |
| [Samuel Idowu's live portfolio](https://samuelidowu.com/) | Current rendered pages, visible/public frontend mechanics and linked assets | Ownership/reuse license for an unrelated public release; unseen backend |
| [Apogee documentation](../../apogee/README.md) | Repository documentation shape: overview, adapted prompt and build log | A requirement to use React/Vite/Tailwind for this different reference |
| [Recorded case results](../evidence/case-results.json) | The snapshot's file count/bytes, final test count, matched PNG hashes and preserved gallery behavior | A freshly repeated benchmark or universal quality/performance score |
| [Repository media policy](../../ASSETS.md) | Code/prompt licensing does not cover every displayed third-party asset | Permission to redistribute this author's media |

The public evidence JSON is a compact transcription of previously recorded private verification outputs. It is not a replacement for the excluded original media/source or screenshots. The documentation explains the checks and their limits so the result can be evaluated without publishing that asset tree.

## Primary technical references

These links are for verifying APIs/concepts when implementing a fresh site. They are not claims that every integration or newest version was installed in the recorded case.

- [Three.js manual](https://threejs.org/manual/): scene/camera/rendering, loading, responsive scenes and debugging.
- [Three.js color-management guidance](https://threejs.org/manual/en/color-management.html): texture/output color-space distinctions.
- [Three.js responsive guidance](https://threejs.org/manual/en/responsive.html): canvas sizing, camera aspect and render resolution.
- [Three.js cleanup guidance](https://threejs.org/manual/en/cleanup.html): resources need explicit disposal.
- [Playwright best practices](https://playwright.dev/docs/best-practices): user-visible tests, isolation and resilient locators.
- [Playwright screenshots](https://playwright.dev/docs/screenshots): page/element captures and screenshot options.
- [Playwright input actions](https://playwright.dev/docs/input): mouse, keyboard and input behavior.
- [Playwright emulation](https://playwright.dev/docs/emulation): viewport, mobile/touch and motion settings.
- [MDN: `HTMLImageElement.decode()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode): image decode readiness.
- [MDN: `Document.fonts`](https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts): font-loading state.
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): threshold/viewport-related reveal conditions.
- [MDN: Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API): background/hidden page behavior.
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): user motion preference.
- [MDN: Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events): multi-input pointer behavior and capture.
- [MDN: HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests): media byte ranges and response semantics.
- [Python `hashlib`](https://docs.python.org/3/library/hashlib.html): byte-hash computation.
- [Python `html.parser`](https://docs.python.org/3/library/html.parser.html): offline HTML attribute inspection.

## Claim taxonomy

- **Observed:** seen/measured in the unmodified live state or recorded browser output.
- **Source-confirmed:** inspected in permitted public frontend code/configuration, without claiming a recovered backend.
- **Recorded verification:** actual local checks with stored outputs, scoped to that snapshot/environment.
- **Recommended fresh implementation:** newly written architecture/pseudocode/prompt guidance, not a statement about the author's exact internals.
- **Unverified:** video/audio timing, untested browser/hardware, unknown rights or unavailable backend behavior.

Do not upgrade one category into another by fluent wording. A video still cannot uniquely identify a shader, camera FOV or easing curve. A fetched source file does not prove it rendered correctly. A screenshot match does not prove focus/hit-testing. A test pass does not confer asset rights.
