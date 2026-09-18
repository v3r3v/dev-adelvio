# Accepted lab integration — dev preview

The public dev app now combines **Secuencia x Giro v2**, **Aperture v1.2**, and **Gota**. The original isolated experiments remain under the parent workspace's `outputs/ui-lab/` directory. This integration does not authorize a production release.

## Implementation

- `app/components/FusionHome.tsx`: concept reel, rotating service wheel, interactive desktop/mobile showcase and project CTA. The showcased interfaces are explicitly labeled original concepts, not completed client work. No homepage prices or packages.
- `app/components/SiteHeader.tsx`: seamless initial header, frosted floating state, then one shell collapsing into the logo. Existing directional scroll thresholds are retained. The fan reflows for short/zoomed windows rather than introducing an internal scrollbar; Escape returns focus to the trigger.
- `app/components/QuoteBubble.tsx`: Gota, with bounded pointer response and damped scroll deformation. Its link opens the real project inquiry route.
- `app/fusion-home.css`: scoped styles from the accepted main-layout study, with self-hosted fonts. `scripts/import-lab-styles.mjs` is an optional local import helper requiring the original parent-workspace lab; deployment does not run it.
- `app/integrated-chrome.css`: shared navigation/quote material, responsive menu, public-route clearance and integration theme overrides.
- Existing language/theme providers, contact page and inquiry form remain in use. The inquiry form prepares an email draft; it does not submit to a database. The portal and local SQL work are separate.

## Local preview

PowerShell, from this repository:

```powershell
$env:PAGES_REPOSITORY = 'v3r3v/dev-adelvio'
npm run build:pages
npm run preview:pages -- --host 127.0.0.1 --port 4191
```

Open `http://127.0.0.1:4191/dev-adelvio/?lang=es`. The Pages workflow must be dispatched with `publish_preview=true` to publish; a push alone only runs checks. Use the `development` remote, never the production `github` remote for this iteration.

## Verification

- Build, TypeScript, targeted ESLint, icon checks, Spanish dictionary coverage, header-scroll tests and public-route tests pass.
- Existing deployment-safety and portal regression checks pass.
- Chrome inspection covered desktop, 768px tablet, 390px mobile and 320×480 short viewport. No horizontal document overflow was observed. The short menu fits without an internal scroll region; quote-page heading clears the fixed header.
- Exercised language/theme changes, service selection, expanded navigation and Gota's real inquiry link. Existing route content and form requirements remain intact.
- Reduced-motion paths disable CSS travel and Gota's animation loop; this was reviewed in source, not on a physical device. No physical iPhone/Safari verification is claimed.
- Impeccable's detector reported two width-transition warnings in Aperture. These intentionally animate the isolated fixed shell and logo hit area to preserve the accepted single-surface morph; they do not reflow document content. Other motion uses transforms/opacity, with event/observer/frame cleanup.
