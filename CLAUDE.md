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
  SiteNav.tsx  AnalyticsClient.tsx   Client components (plus QrPrototype, Lightbox, VideoPlayer)
  work/case-parts.tsx        Shared server parts: Tldr, Decision, Alternatives, Media, Fig, PhoneRow, Clip, FlowGallery, Evidence, NextCase, EndContact
  work/Pic.tsx               <picture> with AVIF, WebP, srcset; CROPS (CSS crops of bad exports) and SIZES
  work/Lightbox.tsx          On-page <dialog> viewer for every a.media, mounted once in layout.tsx
  work/VideoPlayer.tsx       Recording with its own play/pause button and progress line
  work/ai-agent/page.tsx  work/raiffeisen-mobile/{page,QrPrototype}.tsx  work/semrush-locations/page.tsx
assets/originals/            Source PNG/JPG for every site image (not served)
public/img/                  Generated AVIF + WebP, content-hashed names (immutable cache)
public/fonts/                Self-hosted latin woff2: Manrope (variable), Oswald 700. No monospace face.
public/og/                   1200x630 link cards, one per case (scripts/og-cards.mjs)
public/work/raiffeisen-mobile/prototypes/   The interactive prototype (static HTML)
scripts/optimize-images.py   assets/originals -> public/img + app/work/image-manifest.json
scripts/qa/browser-checks.mjs  Heading hierarchy, no Google Fonts, axe, focus, overflow
tests/rendered-html.test.mjs   Route smoke tests plus static rules, run against the built worker
```

There is no `/home-alt` and no About page. Routes: `/`, `/cv`, `/privacy`, and `/work/{ai-agent,raiffeisen-mobile,semrush-locations}`.

## Rules that matter

### Server components by default
Only `SiteNav`, `AnalyticsClient`, `QrPrototype`, `Lightbox` and `VideoPlayer` are client components. The prototype is click-to-start: its iframe has no `src` and `tabindex="-1"` until the visitor presses "Try the prototype". Do not add `autofocus` or `.focus()` inside `public/work/raiffeisen-mobile/prototypes/*.html`; one autofocus input once moved focus into the iframe on load and broke Space and PageDown for the whole page.

### CSS
- One block per selector. `grep -n` the selector before adding a rule and edit the existing block.
- No hex values in `globals.css` or `home.css`. Add a token to the `:root` block of `globals-quiet-weight.css` first.
- Type scale, six sizes and one label: `--fs-display` (home and case H1 only, Oswald 700), `--fs-h2` (every section, decision, reflection, evidence and contact heading), `--fs-h3`, `--fs-lead`, `--fs-body`, `--fs-small`, `--fs-label` (Manrope 600, 13px, sentence case, 0.01em, muted). Card meta lines use `--fs-meta` (Manrope 400, 14px). Oswald 700 sets only the H1s and the V/DK mark; there is no monospace font anywhere, including fallback stacks. No heading may be larger than its page H1; `scripts/qa/browser-checks.mjs` and a static test enforce it. Do not set `font-size` on an `h2`/`h3` rule.
- Space: `--space-block` 64, `--space-section` 120, `--space-chapter` 160 (40/72/88 below 800px). Radii: 0, 8px, 999px only. Transitions 160ms at most. No shadows on screenshots; use the `--hairline` outline.
- Left-border callouts are gone. A trade-off is a bold run-in "Trade-off:" inside body text.
- Fonts: `@font-face` in `globals.css`, fallbacks metric-matched. Never add a font from a third party. Zero requests to fonts.googleapis.com or gstatic.com.

### Case study anatomy
Names, summaries, outcomes and live-product links live in `app/work/cases.ts`; `<title>`, OG, the home cards and next-case rows read from it. Hero: context line, H1, lede (at most ~120 words before the first image), hero figure, `Tldr` (live product link and status, Role / Team / Timeline / Outcome, the Semrush UI-kit note via `kit`, a short `notMine`), then `SectionNav`. Then decisions, one `Evidence` block (Method, Result, What it doesn't show), a short reflection with the gap to close first, a `FullFlow` of real screens (`FlowGallery`, grid on desktop, horizontal scroll under 800px), `EndContact` and `NextCase`.
- Layout: one centred 680px column. The case H1 starts at the column's left edge and runs to the shell's right edge; `wide` figures span the whole shell content width, centred.
- Only each case's main decision uses the full `Alternatives` scaffold ("We could have" / "We did" / Trade-off). Show a real rejected variant or earlier iteration where one exists.
- Figures have three widths only: `text` (the 680px column, default), `wide` (the page container, ~1085px at 1440, centred on the column) and equal-column grids inside `wide` (`fig-pair`, `option-row`). One frame: `--fig-stage` background, 8px radius, hairline, no shadow. Caption under the frame: a 13px label (at most 24 characters) and one sentence stating the claim.
- Every image is a `Media` (inside `Fig`, `PhoneRow` or `FlowGallery`): clicking opens the lightbox; images with the same `gallery` page with ←/→. Recordings use `Clip` (custom play/pause, autoplay in view unless reduced motion). Phones use `PhoneRow`: no device frame, one screen height (`PHONE`), up to three per row.
- Crop in CSS, never by editing pixels: a `ratio` on the figure, or a `CROPS` entry in `Pic.tsx` for an export with a baked frame. Interface text should render at 11–14px. On the AI Agent and Raiffeisen cases (`.fit-case`) every large screenshot, recording, phone row and the prototype fits the screen height below the header, caption included, and is centred. AI Agent has no Full flow section.
- The source of every interface image is a Figma frame export (the frame itself, PNG 2x, no wrapper). The Semrush Locations case is frozen: change only shared figure styles there. Say each limitation once, in the Evidence block.
- Semrush screens are built from the Semrush UI kit's base components: never credit new components or Semrush's visual language to the designer.

### Content discipline
Never invent research, metrics, interviews, experiments or results. A number needs a baseline, timeframe, denominator and method, or its limits stated beside it. Check every claim against the project-docs and FACT-GAPS before writing it. Do not upgrade a reconstruction into a production screenshot. Mark gaps for the owner; do not write TODO into published copy.

## Images
Put originals in `assets/originals/<case>/` and run `python3 scripts/optimize-images.py` (Pillow with AVIF and WebP). It writes `public/img/**` and `app/work/image-manifest.json`; reference images by manifest name through `Fig`, `Media` or `Pic`. Every image gets the same width ladder (`LADDER`), so `srcset` covers 2x at each figure width; transparent corners flatten to white. `public/_headers` sets a one-year immutable cache on `/img`, `/fonts` and `/assets`.

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
1. The portrait source is 240×240 and shows at 168×210. A 480×600 portrait export is needed.
2. Raiffeisen `cashier-*` and `reusable-*` screens are 376 px wide; 750 px exports are needed. `round1-*` (Before round 1 and Before) and `after-main` are Figma exports from «Case-study-presentation» (nodes 162:21342, 162:22331, 162:22414, 162:24988), clipped to their parent Screen frame radius. The `states/*` screens are Figma exports (file «Прием платежей по QR», nodes 9047:19651, 9047:131584, 9047:35477, 9047:130732, 16706:191775).
3. `dashboard-mvp-clean` has a baked noise shadow (cropped in CSS) and is a 1x export; `onboarding-posts` (node 2:107031) and `actions-later` (node 2:94323) are Figma exports from «Fundraise-Up-cases». Re-export from Figma at 2x and delete their `CROPS` entries. The AI Agent payment step and a publishing-failure status screen are missing from the full flow.
4. The Locations chart is a cropped Tableau PNG. Replace it with an inline SVG once the weekly values are exported.
5. Screenshots have no numbered annotation markers yet.
6. `.openai/`, this file and the source repo may be public. Decide whether to make `portfolio` private.
7. Two lockfiles are tracked (`package-lock.json`, `pnpm-lock.yaml`). Confirm the Cloudflare build before removing one.
