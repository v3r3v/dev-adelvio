# Showcase and project inquiries

This dev-preview revision supersedes the public package and navigation descriptions in earlier design notes.

- `/` is a visual showcase: interactive system stages, original editorial concepts, and the sample booking interface. Pricing, packages, care plans, and the embedded contact/inquiry sections are no longer displayed here.
- `/contact/` contains Jose's profile and existing contact links.
- `/start-project/` collects name, email, optional phone, business, optional website/social link, project idea, and optional timing. The fixed SVG quote bubble links here from the other two pages.
- Existing offering data is retained for internal/demo references, without adding or changing any commercial terms.

All links respect the deployment base and Spanish/English selection. Both additional routes are prerendered as directories for direct access and refresh on GitHub Pages. Equivalent app routes exist for the production architecture, but this release targets **dev-adelvio only**.

## Inquiry behavior

The form prepares an email draft addressed to Jose. The visitor must review and send it through their email application. It does not submit to an API or persist personal information to a database. Required fields and email syntax use native validation. A text download provides an alternative when a mail application is unavailable. UI text explicitly describes both behaviors; there is no simulated submission success.

## Header motion

After the stationary-to-floating transition, continued downward travel separates the header. Only the Adelvio symbol remains in a circular home-link badge near the left edge; the name fades out and the controls slide upward independently. Upward travel reunites the header. This replaces the previous proportional height/flat-line animation.

The scroll model waits for 56px of downward intent beyond 180px, and reveals after 4px upward to ignore tiny wheel/touch jitter. Reversible CSS transitions use transforms and opacity (520ms departure, 420ms return). The header retains its layout footprint. Brand docking geometry is measured on resize, not in the scroll handler.

Open menus and keyboard navigation keep the header visible. Pointer interaction, including theme switching, does not pin it. Changing from keyboard to pointer resets directional intent so controls cannot move between pointerdown and click. Reduced-motion preferences keep the full header visible. Scroll listeners, animation frames, resize observation, and focus listeners are cleaned up on unmount.

## Verification

- TypeScript, targeted lint, icon/language checks, Pages build, scroll-state tests, and prerendered-route tests.
- Chrome visual inspection at desktop, tablet, and mobile widths; 320px overflow checks across all three routes.
- Quote and menu navigation; Spanish/English links; light/dark styling; native required-field validation; downloaded inquiry using demo data.
- Split-header follow-up: directional intent, reversal and overscroll unit tests; desktop and 390px Chrome review; detached symbol/name visibility, restored controls, theme switching, menu scrolling and Escape-to-pointer interaction verified. The detached symbol docks at 32px on desktop and retains the 20px mobile gutter.
- No email was sent. Physical iPhone/Safari and Android testing were not performed. No new Lighthouse score is claimed.
