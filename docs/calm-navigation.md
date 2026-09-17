# Navigation and editorial refinement

Reference review: [Dribbble floating navigation](https://dribbble.com/search/floating-navbar), including the supplied minimal landing-page reference. Used for proportion, restrained materials and hierarchy; no third-party artwork or template code was copied. Tailwind Plus navigation examples redirected to sign-in and were not used.

The old header dismissed in 180ms on any downward delta beyond its threshold. The revised behavior has a 420ms minimum floating hold, 48px of deliberate downward travel, and a 520ms eased exit. Upward movement changes state immediately with a 360ms entrance. Keyboard focus reveals navigation without delay; an open menu remains available. Timers, animation frames and observers clean up on unmount, and reduced motion removes transitions.

The homepage now leads with one description and two device previews. Repeated hero labels, the third overlay, duplicate introduction strip and decorative progress line were removed. Systems stages are controlled by the visitor instead of scroll position. Copy was shortened in both languages; packages, prices, ownership and scope disclosures remain intact. Hover movement was reduced while action feedback remains.

Checks: header regression tests (fast flings, direction reversal, small scroll changes, overscroll); language dictionary checks including dynamically selected story copy; icon check; TypeScript; targeted ESLint; Pages build. Chrome inspection at 320, 390, 768 and 1440px covered navigation fit, hide/reveal states and timings, light/dark appearance, artwork/caption spacing, menu/Escape behavior and manual stage selection. Corrected mobile artwork overlap and a Spanish story translation during review. Physical iPhone/Safari and OS reduced-motion emulation were not performed.

Publication target: dev-adelvio only.

## Retained focus regression

Reproduced after clicking the theme toggle and scrolling: `data-hidden` correctly became `true`, but `:focus-within` kept the transform at zero. The clicked button retained DOM focus. This also affected language controls. A `:focus-visible`-only fix was insufficient when switching from keyboard navigation to clicking the already-focused button.

The header now tracks keyboard versus pointer input and protects focused controls only during keyboard interaction. Native focus is preserved; no forced blur is used. Document and header listeners are removed on unmount. The separate open-menu protection remains.

Verified in Chrome: light-to-dark and dark-to-light followed by scrolling without reloading; 390px mobile layout; language clicking after Tab navigation; Tab revealing a hidden header immediately; open menu staying visible during downward scroll; Escape closing the menu and restoring keyboard focus. Header state tests, Pages build, TypeScript and targeted ESLint pass. Physical touch-device testing remains pending.
