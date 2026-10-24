# Harish A — Developer Portfolio

A premium, interactive single-page portfolio for **Harish A**, Junior Software Developer (Puducherry, India).
Built with **React + Vite**, self-hosted variable fonts, hand-crafted CSS art, a CSS-only marquee,
an auto-playing project carousel, and a signature **mini-cat navigation companion**.

Every fact on the site is sourced from Harish's résumé or verified public sources —
see [Docs: content sources](#content-sources--verification) below.

---

## Quick start

```bash
npm install       # install dependencies (React 18, Vite 5)
npm run dev       # start the dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally → http://localhost:4173
```

Node 18+ recommended. No environment variables, no API keys, no backend required.

---

## Project structure

```
harish-portfolio/
├── index.html                  # meta, SEO, Open Graph, favicon
├── vite.config.js
├── public/
│   ├── favicon.svg             # "HA" wordmark icon
│   ├── apple-touch-icon.png    # generated from the real portrait
│   ├── og-image.jpg            # 1200×630 social card
│   ├── Harish_A_Resume.pdf     # downloadable résumé (from the uploaded file)
│   └── robots.txt
└── src/
    ├── main.jsx                # entry — adds `html.js` gate before render
    ├── App.jsx                 # section composition
    ├── data/content.js         # ⭐ single source of truth for all content
    ├── hooks/
    │   ├── useActiveSection.js        # scroll-spy for nav + cat
    │   ├── useRevealOnScroll.js       # IntersectionObserver reveals
    │   └── usePrefersReducedMotion.js
    ├── components/
    │   ├── Nav.jsx             # sticky nav, scroll-spy, mobile menu
    │   ├── Hero.jsx            # portrait tilt, code panel, orbit ring
    │   ├── Marquee.jsx         # seamless CSS marquee (a11y-safe duplicate)
    │   ├── About.jsx / Skills.jsx / Experience.jsx
    │   ├── Education.jsx       # timeline + certifications + achievement
    │   ├── Projects.jsx        # accessible carousel (tabs, dots, touch, keys)
    │   ├── projectArt/         # KnowledgeOS / PRICI / Data / Keerthana artwork
    │   ├── Contact.jsx / Footer.jsx
    │   ├── MiniCat.jsx         # 🐈 signature navigation companion
    │   ├── SectionHeader.jsx / Icons.jsx
    └── styles/                 # fonts, global design system, per-section CSS
```

## Design system

| Token | Value | Use |
|---|---|---|
| Background | `#06090f` → `#0d1424` | layered midnight navy |
| Text | `#edf1f9` / `#93a1b8` | warm off-white + muted |
| Accent | `#e0486e` | wine red (CTAs, highlights) |
| Accent 2 | `#6fd3e7` | muted cyan (secondary art) |
| Display | Space Grotesk (variable) | headings |
| Body | Inter (variable) | paragraphs |
| Technical | JetBrains Mono (variable) | labels, code, chips |

All fonts are **self-hosted** (latin subset, ~100 KB total) — no external font requests.
Motion is gated behind `html.js` **and** `@media (prefers-reduced-motion: no-preference)`,
so the site is fully readable with JavaScript disabled or motion reduced.

## Accessibility & responsiveness

- Semantic landmarks, skip-link, single `h1`, logical heading order
- Carousel: `region` + `aria-roledescription`, arrow-key support, focus/hover pause,
  touch swipe, hidden slides removed from tab order
- Mini-cat: `aria-expanded` button, Escape/outside-click close, focus return, no focus trap,
  panel links are real anchors
- Zero horizontal overflow at **320 / 375 / 390 / 768 / 1024 / 1366 / 1440** px (verified)
- `prefers-reduced-motion` disables autoplay, marquee, cat motion, parallax/tilt and reveals

## Deployment

**Vercel / Netlify** — import the repo, framework preset *Vite*, build `npm run build`,
output `dist/`. No env vars needed.

**GitHub Pages (project site)** — set `base: '/<repo-name>/'` in `vite.config.js`,
run `npm run build`, publish `dist/` (e.g. with `gh-pages` or via Actions).

> A deploy-ready `Caddyfile`/`nginx` config isn't required — `dist/` is fully static.

## Content sources & verification

| Content | Source |
|---|---|
| Name, title, contact, education, CGPAs, skills, certifications, achievement, project facts | Uploaded résumé PDF (`uploads/Harish_A_Junior_Software_Developer_Resume-1.pdf`) |
| Portrait | Uploaded `harish.jpeg` (cropped 4:5, WebP 70 KB, no face alteration) |
| Keerthana Associates live link + description | Fetched from `harish-antony.github.io/keerthana-associates` |
| KnowledgeOS / PRICI WEB GitHub links | `github.com/Harish-antony/*` (verified to exist) |

**Known limitations (honest disclosure):**
- No live URLs exist for KnowledgeOS, PRICI WEB, or the data-analysis project — the site
  links to their GitHub repositories and labels all interface visuals as *illustrations*.
- No deployment/backend is claimed for any personal project.
- Project visuals are hand-built CSS/SVG compositions, clearly marked
  “Interface illustration — not a deployed product screenshot.”

Full QA log: [`docs/TESTING.md`](docs/TESTING.md).
