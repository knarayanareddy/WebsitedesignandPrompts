# WebsitedesignandPrompts remediation plan

## 1) Phased roadmap with entry/exit criteria

### Phase 1 — baseline inventory and boundary map
**Entry:** top-level docs and sampled manifests already show this is a multi-template collection.  
**Exit:** every catalog row has a folder path, template class, and owner note.

### Phase 2 — provenance and safe consumption
**Entry:** at least one template already carries an explicit attribution note, but not all sampled docs normalize provenance.  
**Exit:** every template has source/origin/licensing notes and any external demo link is labeled as such.

### Phase 3 — per-template validation matrix
**Entry:** nested apps use different toolchains and different validation expectations.  
**Exit:** each template has an explicit validation path appropriate to its type (static, Vite/React, Three.js/WebGL, Playwright-backed, etc.).

### Phase 4 — release and rollback policy
**Entry:** the README claims a GitHub Pages deployment flow.  
**Exit:** release, rollback, and owner-approval rules are written down for catalog updates and publish events, and the plan requires a future observed negative-control publish plus isolated restore/recovery verification on a representative template or staging copy.

## 2) Task list

### T-01 — Catalog boundary map
- **Linked finding:** OD-01
- **Prereqs:** none
- **Observed path:** `README.md` and the nested template folders already sampled
- **Steps:**
  1. Inventory every top-level template folder and classify it as static, app, or hybrid.
  2. Record the owning demo URL, prompt/spec path, and whether the folder has a build step.
  3. Mark which entries are reference-only versus intended for reuse/adaptation.
- **Expected deliverable:** a single catalog map that makes the repo boundary obvious.
- **Verification:** compare the map against the README table and the sampled `package.json` files.
- **DoD:**
  - [ ] Every catalog entry has a type label.
  - [ ] Every catalog entry has a folder path.
  - [ ] Every catalog entry has a demo or provenance note.

### T-02 — Provenance and attribution matrix
- **Linked finding:** R-01
- **Prereqs:** T-01
- **Observed path:** `README.md` catalog entries; any future per-template metadata file
- **Steps:**
  1. Capture original inspiration/source for each template.
  2. Record asset provenance and reuse permissions for media, fonts, and copied design references.
  3. Add a normalized note for any entry that is intentionally a recreation or adaptation.
- **Expected deliverable:** a provenance table that can be read without opening every subfolder.
- **Verification:** every catalog row has a provenance field and no external asset is left uncited.
- **DoD:**
  - [ ] Every template has source/origin text.
  - [ ] Every external asset has a note.
  - [ ] Recreated/reference entries are explicitly labeled.

### T-03 — Validation matrix by template class
- **Linked finding:** owner decision / preventive requirement
- **Prereqs:** T-01
- **Observed path:** sampled `package.json` manifests plus any future validation doc
- **Steps:**
  1. Define the minimum check set for each template class: build-only, build+typecheck, build+lint, or testable app.
  2. Assign each nested app its own verification mode and failure signal.
  3. Call out templates that require manual review because they are static or intentionally nonstandard.
- **Expected deliverable:** a validation matrix that distinguishes app-level checks from collection-level checks.
- **Verification:** the matrix covers the sampled patterns (`vite`, `typecheck`, `lint`, `Playwright`, and static serve/build scripts).
- **DoD:**
  - [ ] Each template class has a validation rule.
  - [ ] Negative checks are defined where applicable.
  - [ ] No template is forced into the wrong build/test bucket.

### T-04 — Release, rollback, and owner-approval policy
- **Linked finding:** DEV-OPS preventive requirement
- **Prereqs:** T-01 and T-03
- **Observed path:** top-level docs and deployment workflow documentation
- **Steps:**
  1. Document the supported publish path and the artifact that is considered authoritative for the collection, not for a fictitious single app.
  2. Define a future observed negative-control release check on one representative template or isolated staging tree: introduce a deliberately broken condition, confirm the publish gate fails, and record the exact failure signal.
  3. Define an isolated restore/recovery observation on the prior published artifact for that same representative template or staging copy, and require the recovered state to be observed before declaring rollback complete.
  4. Require owner approval for adding/removing templates, changing live URLs, or changing attribution language.
- **Expected deliverable:** a release policy that covers publish, revert, and approval boundaries.
- **Verification:** the policy explicitly names the rollback target, the approval triggers, the negative-control failure, and the isolated recovery observation.
- **DoD:**
  - [ ] Release path is written down.
  - [ ] Rollback path is written down.
  - [ ] Owner-approval changes are enumerated.
  - [ ] One future observed negative-control publish is defined for a representative template or staging copy.
  - [ ] One isolated restore/recovery observation is defined for that same representative template or staging copy.

## 3) Dependency map

| Task | Depends on | Output |
|---|---|---|
| T-01 | — | Collection boundary map |
| T-02 | T-01 | Provenance matrix |
| T-03 | T-01 | Validation matrix |
| T-04 | T-01, T-03 | Release/rollback policy |

## 4) Production acceptance checklist

- [ ] README says this is a collection/template catalog, not a single app.
- [ ] Every entry has a folder, class, and provenance note.
- [ ] Every nested app has an explicit validation path.
- [ ] External inspirations and live demos are labeled as such.
- [ ] Rollback instructions exist for publish mistakes.

## 5) Changes requiring owner approval

- Adding a new template folder or removing an existing one
- Renaming or re-pointing a live demo URL
- Changing attribution or provenance language
- Promoting a reference/demo into a canonical template
- Altering the publish flow for GitHub Pages or any other release target

## 6) Rollback and release policy

- Treat docs updates as reversible until the catalog map and provenance table are complete.
- If a publish breaks, roll back to the previous known-good published artifact rather than trying to patch the live output in place.
- Do not mark an entry “validated” unless its own validation path is written down for its template class.
