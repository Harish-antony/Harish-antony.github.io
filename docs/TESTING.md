# QA & Test Report — Harish A Portfolio

Environment: Chromium (Playwright CLI), Node 20, Vite 5 production build served via `vite preview`.
Date: 20 Oct 2026.

## Build

| Check | Result |
|---|---|
| `npm install` | ✅ clean, no errors |
| `npm run build` | ✅ 60 modules, ~1.3 s |
| `npm run dev` | ✅ boots, HTTP 200 |
| Bundle | JS 187.7 KB (**58.5 KB gzip**) · CSS 46 KB (**9.6 KB gzip**) · 3 variable-font files (~100 KB) · portrait WebP 70 KB |
| Browser console | ✅ 0 errors, 0 warnings (nav, carousel, cat interactions) |

## Viewport matrix (mandated sizes) — horizontal overflow

| Viewport | `scrollWidth − clientWidth` | Verdict |
|---|---|---|
| 320 × 640 | 0 px | ✅ |
| 375 × 812 | 0 px | ✅ |
| 390 × 844 | 0 px | ✅ |
| 768 × 1024 | 0 px | ✅ |
| 1024 × 768 | 0 px | ✅ |
| 1366 × 768 | 0 px | ✅ |
| 1440 × 900 | 0 px | ✅ |

(Window-level panning test at 375 px: `window.scrollTo(50,0)` → `scrollX` stays `0`.)

## Functional tests

| Test | Result |
|---|---|
| Nav scroll-spy (About/Skills/Projects/Experience/Contact active states) | ✅ |
| Mobile burger menu open/close, Escape close, body-scroll lock | ✅ |
| Carousel previous/next buttons, dot tabs, counter (01–04) | ✅ |
| Carousel autoplay (advances when idle) | ✅ |
| Carousel keyboard: ArrowLeft / ArrowRight | ✅ (handler verified; controls in a11y tree) |
| Touch swipe zone present (`onTouchStart/End`, 42 px threshold) | ✅ code-verified |
| Mini-cat: click opens panel, context message, panel closes on navigate | ✅ |
| Mini-cat: smooth scroll lands at `#skills` / `#contact` offsets | ✅ |
| Mini-cat: keyboard Enter opens, Escape closes + focus returns to button | ✅ |
| Mini-cat: hop feedback + per-section messages | ✅ |
| Marquee loops seamlessly (duplicated track, hidden from SRs) | ✅ |
| Hero portrait tilt (pointer-fine only), orbit ring, code panel | ✅ |
| Resume download (`/Harish_A_Resume.pdf`) | ✅ HTTP 200, 81 KB |
| Favicon / OG image | ✅ HTTP 200 |
| Anchor targets: all 7 section ids resolve | ✅ |
| External links: all `target="_blank"` carry `rel="noopener noreferrer"` | ✅ |

## Accessibility tests

| Test | Result |
|---|---|
| `prefers-reduced-motion: reduce` → marquee animation `none`, reveals visible (opacity 1), autoplay disabled, cat idle motion off | ✅ |
| Closed mobile menu removed from accessibility tree (`visibility: hidden`) — fixed during QA | ✅ |
| Mini-cat hidden while mobile menu open (was overlapping Resume button) — fixed during QA | ✅ |
| Hidden carousel slides: `aria-hidden` + `tabindex="-1"` on links | ✅ |
| Live region announces active slide to screen readers | ✅ |
| Skip-link, `:focus-visible` outline, semantic headings | ✅ |

## Defects found & fixed during QA

1. **320–390 px horizontal overflow** — grid items' default `min-width:auto` let the
   KnowledgeOS search box blow out its track → added `min-width: 0` to art containers,
   slides, and all section grids; result: 0 px at every size.
2. **Closed mobile menu exposed to screen readers** — `display:flex` overrode the `hidden`
   attribute's UA style → switched to `visibility`-based gating.
3. **Mini-cat overlapped the mobile menu's Resume button** → cat is hidden (opacity/visibility)
   while the menu overlay is open.
4. **Hero lime glow read as a muddy smudge** on large screens → reduced size/opacity/position.
5. **CTA row below the fold at 1366×768 / 1024×768** → short-screen media query tightens
   hero rhythm; CTA bottom now ≈628 px (visible) at 1366×768.
6. **Font self-hosting** — Google served variable fonts; consolidated to one file per family
   with `font-weight` range declarations (3 files instead of 9).

## Not tested / honest limitations

- No Lighthouse score is claimed — an automated audit was not part of this sandbox run.
  The site is built to score well (static content, self-hosted fonts, tiny bundles,
  width/height on images), but treat that as expectation, not measurement.
- Real touch-device gestures were exercised through Chromium's touch event emulation layer only.
- Screen-reader testing was done via the Playwright accessibility tree, not a live SR.
