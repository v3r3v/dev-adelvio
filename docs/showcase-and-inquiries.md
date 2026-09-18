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

After the stationary-to-floating transition, downward scroll travel beyond 180px closes the visible header height, one pixel per scroll pixel. Upward travel restores the same height immediately. A centered clip closes to a flat line without distorting the logo or text. No timed hide tween continues after scrolling stops, and document layout remains stable.

Open menus and keyboard navigation keep the header visible. Pointer interaction, including theme switching, does not pin it. Reduced-motion preferences keep the header visible. Scroll listeners, animation frames, resize observation, and focus listeners are cleaned up on unmount.

## Verification

- TypeScript, targeted lint, icon/language checks, Pages build, scroll-state tests, and prerendered-route tests.
- Chrome visual inspection at desktop, tablet, and mobile widths; 320px overflow checks across all three routes.
- Quote and menu navigation; Spanish/English links; light/dark styling; native required-field validation; downloaded inquiry using demo data.
- Measured a partial close of 45px at scroll position 225px. Scrolling upward 27px restored 27px (18px remained closed), with no further change at rest. Full closure and keyboard reveal were verified.
- No email was sent. Physical iPhone/Safari and Android testing were not performed. No new Lighthouse score is claimed.
