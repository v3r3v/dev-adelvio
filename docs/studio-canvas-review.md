# Adelvio — studio canvas refinement

Development target: `v3r3v/dev-adelvio`. Production is not part of this release.

## Audit and direction

The production homepage was inspected in Chrome, including its Spanish mobile layout. The local implementation already contains newer improvements than production: explicit website positioning, a project CTA, concept rationale, cost explanations, and a payment breakdown. These are preserved. The implementation is React 19, Vite static/prerendered Pages builds, an alternative Cloudflare build, shared bilingual content, and native CSS/IntersectionObserver/requestAnimationFrame motion. The SQL API and portal work are independent and were not included in this design commit.

Five highest-impact opportunities:

1. **First impression:** the original headline establishes mood but the primary business action and website demonstration compete with vertical space. Put the offer, project action, and interface canvas together on desktop; provide a deliberate mobile reading sequence.
2. **Hierarchy:** establish a consistent headline size across both languages and align the offer beneath it. Keep editorial serif accents selective. Use ink, warm paper, cobalt, and restrained slate surfaces around the supplied blue/cyan/violet symbol.
3. **Inspectable work:** preserve truthful concept labeling and readable HTML interfaces. Add keyboard-operable desktop/mobile focus controls, without pretending the studies are client engagements.
4. **Story:** give the three-stage demonstration distinct website, booking, and connected-workflow states. Keep direct controls, native scrolling, offscreen suspension, cleanup, and reduced-motion fallbacks.
5. **Inquiry:** preserve actual package prices and provider exclusions; highlight the selected package and retain its value, payment breakdown, and focus transfer into the project brief. Keep email and download behavior explicit.

## Research shortlist

Sources inspected September 17, 2026. Patterns below are design judgments, not copied components. No third-party animation code was incorporated.

| Source | Pattern worth adapting / application | Compatibility, upkeep, accessibility and cost |
| --- | --- | --- |
| [Instrument](https://www.instrument.com/) | Work-led positioning and direct service explanation; put a substantial product composition alongside the offer. | Composition reference only. No imagery, clients, claims, or proprietary implementation reused. |
| [ustwo](https://ustwo.com/) | Human-centered product framing and demonstrable interfaces; connect website interest to a useful next step. | Composition/content-structure reference only; original Adelvio copy and studies. |
| [Motion](https://motion.dev/docs/react-use-reduced-motion), [repository](https://github.com/motiondivision/motion) | Reduced-motion policy and React transitions; appropriate if future layout choreography gets more complex. | React compatible; MIT core. Maintained documentation and repository. Extra runtime is not justified for this pass. A library never replaces semantic controls or testing. |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [license](https://gsap.com/community/standard-license/), [repository](https://github.com/greensock/GSAP) | Coordinated scroll timelines and pinning for the connected scene. | Framework-independent; standard license allows commercial use, not MIT. Requires lifecycle cleanup and breakpoint/reduced-motion planning. The existing small hook already covers this scene. |
| [React Bits](https://reactbits.dev/), [repository](https://github.com/DavidHDev/react-bits) | Restrained entrance and content reveals rather than background effects. | React/TypeScript/CSS variants; MIT + Commons Clause, not plain MIT. Copy-in components require local maintenance and per-component accessibility/performance review. No component imported. |
| [Magic UI Animated Beam](https://magicui.design/docs/components/animated-beam), [repository](https://github.com/magicuidesign/magicui) | Visual relationship between workflow nodes. | MIT repository; React/Tailwind ecosystem. Avoid perpetual beams and extra dependencies here; existing CSS connection lines remain static between stage transitions. |
| [Rive runtime](https://github.com/rive-app/rive-wasm), [license](https://github.com/rive-app/rive-wasm/blob/master/LICENSE) | Potential future interactive brand artwork. | MIT runtime; authoring/export workflow and asset terms separate. Canvas/WASM adds download, lifecycle and semantic-fallback obligations. No authored Rive asset makes it worthwhile here. |

**Primary motion approach:** native CSS transitions/keyframes plus the existing `useScrollScene` hook. Small feedback uses 200 ms; stage and showcase transitions use 600–700 ms. No new runtime dependency, scroll hijacking, or continuous decorative loop. The reduced-motion rule disables animation/transitions; the hook's media query disables pinning/parallax while direct controls remain.

## Assets

- `public/adelvio-new-logo.png`: original user-supplied transparent symbol, preserved without AI recreation. Used in the public site's header, footer, favicon/touch icon, and interface compositions. The textual wordmark remains accessible if the image fails. Its original 668,187-byte PNG is shared/cached across placements; a properly exported SVG or smaller approved WebP would reduce transfer further.
- `public/profile_image.jpg`: existing portrait, retained with lazy loading.
- Hero, workflow, booking, desktop/mobile studies: HTML/CSS/SVG, not screenshot textures. Aspect ratios and layout change at breakpoints; no image generation is necessary for readable interface artwork. The static HTML composition is the fallback with animation disabled.
- No stock assets, generated client work, invented results, or testimonial material were added.

## Release scope

Keep all existing URLs, Spanish/English preference resolution, package data, care plans, optional extras, mailto/tel links and portal entry behavior. Publish only the development Pages workflow after verification. Promote to production only through a separate approved release.

Verification results are recorded in `studio-canvas-verification.md`.
