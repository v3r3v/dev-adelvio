# Visitor appearance

The public homepage defaults to light, independent of device appearance. The header's SVG moon/sun button switches themes; its accessible name and tooltip follow the selected Spanish/English language.

`public/theme-init.js` reads the optional `adelvio-theme` local preference before paint in both entrypoints. It intentionally remains a small synchronous public asset (Vite reports that it is not bundled). `ThemeToggle` uses a hydration-safe external store, supports same-origin tab synchronization, and removes listeners on unmount. Storage being unavailable does not prevent switching during a visit.

`app/theme.css` contains the appearance layer. Product concepts keep their authored palettes. On screens up to 360px the header uses the brand symbol to retain comfortable 44px controls; its home link keeps the accessible brand name.

Validation: TypeScript, targeted ESLint, icon and language checks, and the GitHub Pages build. Chrome responsive checks at 320, 390, 768, 1150 and 1440 CSS pixels covered header fit, both themes, keyboard switching, Spanish labels, reload persistence and dark portfolio/package contrast. No physical Safari/iPhone test was performed. This change targets the dev preview; the client portal retains its separate design.
