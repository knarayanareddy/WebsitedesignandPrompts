# Acceptance matrix template

Each row is a requirement-to-evidence contract, not a pre-filled success claim.

| ID | Requirement | Approved input/state | Evidence | Result | Limitation/owner |
|---|---|---|---|---|---|
| V1 | Actual approved photograph/shadow, no unapproved substitutes | About first fold | Decode plus visual review | Pending | Asset owner |
| V2 | Correct stationary desktop geometry | Fixed viewport/DPR/font readiness | Matched image plus DOM measurements | Pending | Design owner |
| V3 | Approved independent mobile composition | Phone viewport | Matched image and no unwanted overflow | Pending | Design owner |
| B1 | Navigation/direct link/Back | Five views | Real browser flow | Pending | Frontend owner |
| B2 | Filters and overlays reflect approved data | Projects/Archive | Selection/count/close/focus assertions | Pending | Frontend owner |
| B3 | Viewer renders and responds to input | Object overlay | Visible rendered object plus real drag/wheel | Pending | Scene owner |
| B4 | Gallery input preserves intended behavior | Focused scrubber/drag/wheel | Selected item/caption assertions | Pending | Gallery owner |
| M1 | Reverse/interrupted motion and cleanup | Normal motion | Real wheel/navigation/input sequence | Pending | Motion owner |
| A1 | Provenance and public release scope | Every included asset | Manifest/release review | Pending | Asset owner |
| I1 | Complete path/byte integrity, if required | Source/local/build/served output | Programmatic path sets and hashes | Pending | Integration owner |
| P1 | Public artifact contains only approved files | New folder | Included-file audit and remote readback | Pending | Publication owner |

Use `Not applicable` with a reason where a gate does not belong to the chosen lane. Do not convert pending or unknown to pass because a helper returned exit 0.
