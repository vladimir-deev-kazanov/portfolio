# Portfolio: working notes

Personal portfolio of Vladimir Deev-Kazanov, Senior Product Designer. The site exists to get interviews. Every change is judged by one question: does a hiring manager reading this for three minutes understand the decision and believe the evidence?

Design system source of truth (outside this repo): `~/Documents/Design/Portfolio/design-system/QUIET-WEIGHT.md` and `SELECTED-SITE-SYSTEM.md`. Facts and metrics: `~/Documents/Design/Portfolio/github-portfolio-package/project-docs/` and `~/Documents/Design/Portfolio/case-studies/ai-agent-FACT-GAPS.md`. Never copy those into this repo.

## Stack

Next.js 16 App Router with React Server Components, built by `vinext` on Vite 8, served by a Cloudflare Worker. Tailwind v4 supplies preflight only; there are no utility classes in the markup. Styling is semantic classes in two files.

```
app/
  layout.tsx                 Shell, metadata, Person JSON-LD, font preloads
  globals-quiet-weight.css   TOKENS: every colour, type size, space step, font stack
  globals.css                @font-face, base, and every component rule. No hex values.
  home.css                   Homepage hero only (.hsd-*)
  page.tsx                   Home: hero, three project cards, How I work, contact
  cv/page.tsx  privacy/page.tsx  not-found.tsx
  SiteNav.tsx  AnalyticsClient.tsx   Client components (plus QrPrototype)
  work/case-parts.tsx        Shared server parts: Tldr, Scope, Decision, Alternatives, Fig, Evidence, NextCase, EndContact
  work/Pic.tsx               <picture> with AVIF, WebP, srcset, from image-manifest.json
  work/ai-agent/page.tsx  work/raiffeisen-mobile/{page,QrPrototype}.tsx  work/semrush-locations/page.tsx
assets/originals/            Source PNG/JPG for every site image (not served)
public/img/                  Generated AVIF + WebP, content-hashed names (immutable cache)
public/fonts/                Self-hosted latin woff2: Manrope (variable), Oswald 700, Plex Mono 400/500
public/og/                   1200x630 link cards, one per case (scripts/og-cards.mjs)
public/work/raiffeisen-mobile/prototypes/   The interactive prototype (static HTML)
scripts/optimize-images.py   assets/originals -> public/img + app/work/image-manifest.json
scripts/qa/browser-checks.mjs  Heading hierarchy, no Google Fonts, axe, focus, overflow
tests/rendered-html.test.mjs   Route smoke tests plus static rules, run against the built worker
```

There is no `/home-alt` and no About page. Routes: `/`, `/cv`, `/privacy`, and `/work/{ai-agent,raiffeisen-mobile,semrush-locations}`.

## Rules that matter

### Server components by default
Only `SiteNav`, `AnalyticsClient` and `QrPrototype` are client components. The prototype is click-to-start: its iframe has no `src` and `tabindex="-1"` until the visitor presses "Try the prototype". Do not add `autofocus` or `.focus()` inside `public/work/raiffeisen-mobile/prototypes/*.html`; one autofocus input once moved focus into the iframe on load and broke Space and PageDown for the whole page.

### CSS
- One block per selector. `grep -n` the selector before adding a rule and edit the existing block.
- No hex values in `globals.css` or `home.css`. Add a token to the `:root` block of `globals-quiet-weight.css` first.
- Type scale, six sizes and one label: `--fs-display` (home and case H1 only, Oswald 700), `--fs-h2` (every section, decision, reflection, evidence and contact heading), `--fs-h3`, `--fs-lead`, `--fs-body`, `--fs-small`, `--fs-label` (Plex Mono 500, sentence case, 0.06em). No heading may be larger than its page H1; `scripts/qa/browser-checks.mjs` and a static test enforce it. Do not set `font-size` on an `h2`/`h3` rule.
- Space: `--space-block` 64, `--space-section` 120, `--space-chapter` 160 (40/72/88 below 800px). Radii: 0, 8px, 999px only. Transitions 160ms at most. No shadows on screenshots; use the `--hairline` outline.
- Left-border callouts are gone. A trade-off is a bold run-in "Trade-off:" inside body text.
- Fonts: `@font-face` in `globals.css`, fallbacks metric-matched. Never add a font from a third party. Zero requests to fonts.googleapis.com or gstatic.com.

### Case study anatomy
Hero (context sentence, H1, lede, `Tldr` with the one gap to fix first, hero `Fig`), then decisions, with `Scope` (four rows: Role, Team, Timeline, Not mine) placed after the first decision, one `Evidence` block (Method, Result, What it doesn't show), a short reflection, `EndContact`, and a full-width `NextCase` row.
- Only each case's main decision uses the full `Alternatives` scaffold ("We could have" / "We did" / Trade-off). Others are two or three paragraphs and at most one figure.
- Every image is a `Fig`: image linked to its full-size file, then a 13px mono label (at most 24 characters) and one sentence stating the claim. Phone strips use the Raiffeisen `ScreenFlow`, same caption pattern. Two-up figure rows only from 1200px.
- Crop screenshots to the part that proves the claim and show them at their natural CSS size (`maxWidth` on `Fig`); interface text should be 12px or more.
- Keep each case near 900 words. Say each limitation once, in the Evidence block.

### Content discipline
Never invent research, metrics, interviews, experiments or results. A number needs a baseline, timeframe, denominator and method, or its limits stated beside it. Check every claim against the project-docs and FACT-GAPS before writing it. Do not upgrade a reconstruction into a production screenshot. Mark gaps for the owner; do not write TODO into published copy.

## Images
Put originals in `assets/originals/<case>/` and run `python3 scripts/optimize-images.py` (Pillow with AVIF and WebP). It writes `public/img/**` and `app/work/image-manifest.json`; reference images by manifest name through `Fig` or `Pic`. Add a display width for new images in the `DISPLAY` table. `public/_headers` sets a one-year immutable cache on `/img`, `/fonts` and `/assets`.

## Build, test, deploy
```
npm run dev     vinext dev
npm run build   vinext build
npm test        build, then smoke tests and static rules
npm run lint
```
Browser checks (not project dependencies): `npm i --no-save playwright-core axe-core`, `npx vinext start -p 4173`, then `QA_URL=http://localhost:4173 node scripts/qa/browser-checks.mjs`.

Node is at `~/.local/node/bin` (not on PATH by default). Deploy with `npm run deploy` only: it runs the tests, pushes `main`, mirrors HEAD into the private `portfolio-site` repo (which has its own Cloudflare `vite.config.ts` and `pnpm-workspace.yaml`; `KEEP_OUT` in `scripts/deploy.sh` lists files that never ship) and waits for the live homepage to change. Commit first; only HEAD ships.

## Git
Remote `origin` is `github.com/vladimir-deev-kazanov/portfolio`, branch `main`. `portfolio-site` is a deploy mirror with its own history. `.gitignore` excludes `node_modules`, `dist`, `.wrangler`, `.env*` and `audit-shots/`.

## Open items
1. The portrait source is 240×240 and shows at up to 240px. A 480×600 portrait export is needed for a sharper hero.
2. Nine of twelve Raiffeisen flow screens are 376 px wide; 750 px exports would be sharper.
3. The Locations chart is a cropped Tableau PNG. Replace it with an inline SVG once the weekly values are exported.
4. Screenshots have no numbered annotation markers yet.
5. `.openai/`, this file and the source repo may be public. Decide whether to make `portfolio` private.
6. Two lockfiles are tracked (`package-lock.json`, `pnpm-lock.yaml`). Confirm the Cloudflare build before removing one.
