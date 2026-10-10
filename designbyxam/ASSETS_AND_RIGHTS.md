# Assets, Photography, Shadows and Publication Scope

> **Deployment follow-up:** the later request adds an actual Pages rendition in `site/`; see [DEPLOYMENT.md](DEPLOYMENT.md). Statements below describing a documentation-only publication or private-copy scope refer to the earlier recorded stage, not the new deployment. Third-party ownership/rights are not changed by publishing this reference rendition.

Read the repository-wide [asset policy](../ASSETS.md) and [license](../LICENSE) as well as this chapter. A code/prompt license does not automatically cover photographs, posters, personal gallery media, a vendor bundle or a commercial typeface.

## 1. Photography is the design, not a replaceable garnish

This visual system depends on a real subject's proportions, face, pose, clothing folds, tonal detail and alpha edge. Replacing that information with circles, trapezoids, linear gradients or a generic silhouette produces a different art direction even when headline coordinates match.

The first case-study prototype made exactly that mistake. It could pass controls/responsive checks and still look like a caricature. The corrected result used the actual original cut-outs/shadow files within the agreed private-copy scope. For a fresh public portfolio, prepare equivalently strong **owned/licensed** photography instead of borrowing the author's identity or pretending a vector placeholder is photographic.

## 2. Plan the shoot or supplied-image package

A useful brief for the photographer/asset owner includes:

- full-body primary standing pose, including complete feet/shoes;
- alternative poses that support the long editorial composition;
- enough empty margin to mask without cutting off important edges;
- consistent resolution, exposure and color treatment;
- stable camera height/focal perspective across related poses;
- garment detail that remains readable at target display size;
- controllable lighting and a clean separation from the background;
- permission for the actual subject and intended portfolio/release context;
- both editable master and web-delivery versions.

Do not guess a universal camera focal length or lighting rig from the screenshot. The purpose of the brief is consistency and a controllable asset, not an invented reconstruction of the original shoot. If the supplied photograph already achieves the intended pose/crop, do not reshoot or regenerate it as a creative liberty in an exact lane.

## 3. Cut-out preparation

Work non-destructively. Keep a full-resolution master and editable mask. Inspect alpha edges at high magnification and again at the real display size on both white and black canvases.

Check:

1. hair/ear/hand/clothing contour detail;
2. fringe from the removed background;
3. natural fabric highlights/shadows rather than smoothed plastic texture;
4. correct shoe and garment hems;
5. retained body proportions, not accidental scale/warp;
6. alpha coverage and transparent padding;
7. matching export color profile/treatment;
8. enough pixel density at the chosen rendered size/DPR;
9. format decode and file-size tradeoffs;
10. coherent filenames and asset-version provenance.

The CSS box is not the visible silhouette. Record both image dimensions and subject bounds so positioning logic does not inadvertently center transparent padding rather than the person. `object-fit` preserves/crops the **image rectangle**; it does not recover missing feet or invent a good mask.

WebP/AVIF/PNG may all be suitable depending on the source/target support. In an unchanged copy, keep the original formats/bytes; do not re-encode merely because a different format is fashionable. In a new site, compare candidate encodings visually before reducing resolution or quality.

## 4. Cast-shadow preparation

A shadow asset must relate to the pose, ground contact and scene composition. A generic oblong gray blob cannot substitute for the reference's person-shaped cast shadow.

For a new original asset package, possible legitimate workflows include a separately photographed shadow plate, a carefully prepared mask from the owned cut-out, or a real 3D/lighting render based on an approved model. Whichever method is chosen, evaluate:

- attachment/contact near the feet;
- direction consistent across related layers;
- recognizability of the pose in the projected silhouette;
- projection/foreshortening along the ground plane;
- relative scale versus the photographic subject;
- edge/penumbra treatment and opacity;
- compositing on the intended white/black background;
- absence of rectangular alpha bounds;
- appropriate z-order behind/through the editorial words;
- response to responsive layout without an implausible stretch.

Do not apply `drop-shadow` and claim it reconstructs a long cast shadow: a drop-shadow follows screen-space alpha and is not automatically a ground-plane projection. A manually transformed mask may be appropriate for a designed graphic shadow, but its geometry must be approved and tested.

In this case the original used separate shadow image files paired with the portrait poses. The successful unchanged copy preserved those image bytes and placements. Their simplified gray appearance is part of the original art direction; it differs from the rejected unrelated SVG shadow.

## 5. Font provenance and metrics

Typography must be both visually correct and permitted for the intended release. Record font family, weight/style files, source, license and fallback behavior. A commercial/local font observed in a reference is not automatically licensed for a new website.

Main Inter Tight typography was observed in the case. A local Butler font was used by a secondary hover effect. This public documentation folder does not include either the copied local font file or a claim that every observed font is cleared by the repository's license.

For a fresh public build, obtain the appropriate webfont license or choose an approved open alternative and acknowledge the resulting fidelity change. Do not silently change the typeface, because font metrics alter word width, tracking, cap-height and overlap. Test after actual font readiness rather than comparing a temporary system fallback.

## 6. Work covers, posters and high-resolution assets

A believable portfolio cannot be completed with invented work. Establish the approved dataset and ordering first. Each thumbnail should map to its actual full-resolution image and the correct title/category/case-study or “coming soon” behavior.

Record both `srcset` candidates and lightbox/HQ paths. A current browser may request only one resolution while a later viewport/DPR or lightbox needs the other. Public data may replace an image and remove/override stale `srcset`; inspect that behavior before assuming the base HTML is the visible final page.

For a new implementation, artwork rights belong in the asset manifest. If a project is under embargo or has client confidentiality restrictions, do not publish a fake replacement while implying it is that project. Use an approved case study, visible redaction/coming-soon state or resolve the release dependency.

## 7. Personal-object textures and gallery media

An optional 3D book/laptop viewer may use a real cover/screen image as a texture. Verify rights, crop, resolution, color space and loader/CORS compatibility independently of the model geometry. A stock cube with an arbitrary title is not the same object.

A personal gallery also requires deliberate privacy/release scope. Public visibility is not a blanket redistribution license. Do not copy personal portraits or moving clips into an unrelated public template merely because they loaded in a local inspection. Keep source credits and intended-use conditions explicit.

The source-derived MP4 poster naming pattern in this case was verified against the actual origin. Do not assume every `.mp4` has a `-poster.jpg` sibling. The offline inventory helper marks that optional derivation as unverified metadata, not an acquired fact.

## 8. Asset manifest and readiness status

Use [the example manifest](templates/asset-manifest.example.json) and expand it for the approved project. Suggested fields:

| Field | Why it matters |
|---|---|
| Relative path | Stable loader/build/hosting contract |
| Role and paired asset | Portrait/shadow or thumbnail/HQ relationship |
| Source URL or supplied-owner record | Provenance, not permission by itself |
| Ownership/license/release status | Whether the intended use is allowed |
| Local-only/public/commercial scope | Avoids promoting a private study into a release |
| Content type and byte size | Finds HTML masquerading as media and budget issues |
| Pixel dimensions/color/alpha notes | Explains display and mask behavior |
| SHA-256 | Detects source/build/serve drift |
| Acquisition/verification status | Unknown, discovered, acquired, decoded, approved are different |
| Replacement approval | Makes changes explicit rather than silent |

If rights are unresolved, the final gate remains unresolved. That does not justify inventing a caricature and declaring success. Temporary fixtures can support engineering, but their status must not be confused with the final visual asset.

## 9. Separate local-use and public-folder decisions

The final experiment copied a published front end into a private local working tree at the user's explicit as-is direction. No ownership or public redistribution license was inferred. The subsequent request was to **document the process** in a public repository.

This folder therefore includes newly authored analysis/prompt text and helper programs, not the copied site. It is not a mechanism to smuggle the local asset tree into the public repository under a documentation label.

### Included here

- newly authored process/technical/validation documentation;
- reusable prompts and portable contract/manifest templates;
- original offline helper code and synthetic tests;
- compact factual verification results and reference links.

### Excluded here

- the author's original HTML/CSS/JS document;
- photographic portraits and cast-shadow files;
- project/poster artwork and personal gallery media;
- copied webfont/vendor-library files;
- screenshots reproducing the third-party artwork;
- credentials, cookies, private storage, signed URLs or auth headers;
- local dependency/build/cache trees or unrelated repository changes.

## 10. Release checklist for a new public implementation

- [ ] Owner identity/copy belongs to the intended portfolio.
- [ ] Every photograph and artwork has documented intended-use permission.
- [ ] Subject/client/privacy releases are resolved where required.
- [ ] Shadow/model/texture derivations are covered by the source permission.
- [ ] Font and vendor licenses are reviewed and notices retained as appropriate.
- [ ] External hot-links have a clear availability/reuse policy.
- [ ] Public included-file set excludes private/source-only assets and secrets.
- [ ] Hosting/base-path/caching changes are separately reviewed.
- [ ] Contact/data flows are truthful and do not impersonate another person's services.
- [ ] Attribution is honest; no third-party site is represented as independently authored.

This is an engineering/provenance checklist, not a legal opinion or a grant of permission. Obtain the appropriate release/license advice for the actual jurisdiction and use case.
