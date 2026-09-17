# Studio canvas verification

Date: September 17, 2026. Target: development GitHub Pages only.

## Automated checks

- Pages build succeeds with `PAGES_REPOSITORY=v3r3v/dev-adelvio`.
- TypeScript: `npx tsc --noEmit` passes.
- Targeted ESLint passes for changed React/translation files.
- Icon check: no platform-dependent UI glyphs.
- Language check: 335 dictionary entries, preference priority, interpolation, all three unchanged package prices ($750/$1,250/$1,900), and care prices verified. Extended coverage includes the new work-view controls.
- Production deployment guard: 5 tests pass.
- Portal regression suite: 37 checks pass. SQL changes are not included in the design commit.

## Chrome inspection and interactions

- Inspected production before editing, then local development and static builds.
- Responsive dimensions measured from `innerWidth`: 390, 768 and 1440 px. Windows/browser scaling required compensating the viewport override and checking actual dimensions. No document horizontal overflow at these widths.
- Spanish and English hero copy inspected; corrected the older Spanish heading rule that overrode the new scale.
- Refined mobile/tablet phone position and size after screenshots revealed overlap.
- Inspected the dark connected scene and its booking stage. Direct stage selection and keyboard Enter on the third stage change the selected state correctly.
- Work-view buttons change `data-device` and `aria-pressed`; mobile focus enlarges the original HTML phone study. Reduced its scale after checking the caption clearance.
- Mobile menu opens, and navigation closes it.
- Header hides after downward scrolling and reveals on upward scrolling; verified DOM state changes.
- Sample calendar changes to day 16 / 2:30 PM and updates its live summary. No appointment is created.
- FAQ expands by keyboard Enter and exposes the ownership answer.
- Appointments selection updates the Spanish brief to $1,900 and $950/$950; Business updates the English brief to $1,250 and $625/$625. Focus transfers to the business field.
- Required business/goal fields remain invalid when empty. A filled Spanish brief triggers the download and confirms nothing was sent. Email/tel targets were inspected; no email, phone call or client message was sent.
- Image scan found no failed loaded images.
- Corrected inherited light text on the newly light process background and inherited dark text on the booking annotation. New process body color is #516176 against #e8edf3.
- Reduced-motion source path reviewed: CSS disables transitions/animations and shows reveal content; the hook's media query removes pinning/parallax, retains direct controls, and cleans up observers/listeners. OS-level reduced-motion emulation was not performed.

## Measured build size and limits

Final local Pages build, Vite 8.0.13 on Windows, no network/CPU throttling:

| Asset | Raw | Gzip reported by Vite |
| --- | ---: | ---: |
| Prerendered homepage | 60.33 kB | 11.31 kB |
| Homepage CSS | 91.61 kB | 19.44 kB |
| Homepage JS | 80.62 kB | 23.50 kB |
| Shared React/icon chunk | 192.13 kB | 60.70 kB |

No animation dependency was added. The supplied PNG is 668,187 bytes; it is reused from one URL. No Lighthouse score, LCP/INP/CLS measurement, real-user Core Web Vitals, or physical iPhone/Safari validation is claimed. These remain release-review checks before production promotion. Two browser connection-error log entries appeared during tooling interactions without an application stack; interaction and build checks above were completed separately.

The unchanged portal still has its previous brand assets; this pass updates the public studio homepage and its favicon while keeping the pending SQL/portal work separate.
