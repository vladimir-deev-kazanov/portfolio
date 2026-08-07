# Portfolio — working notes

Personal portfolio of Vladimir Deev-Kazanov, Product Designer. The site exists to
get interviews at top product companies. Every change is judged by one question:
does a hiring manager reading this for three minutes understand the decision and
believe the evidence?

## Stack

Next.js 16 App Router with React Server Components, built by `vinext` on Vite 8,
served by a Cloudflare Worker. Tailwind v4 is installed but only supplies
preflight — there is not a single utility class in the markup. All styling is
semantic classes in one stylesheet.

```
app/
  layout.tsx              Root shell: header, SiteNav, footer, metadata
  SiteNav.tsx             The ONLY client component ("use client")
  globals.css             Every style in the project (~240 lines, minified-ish)
  page.tsx                Homepage
  about/page.tsx
  cv/page.tsx
  work/ai-agent/page.tsx           Case study 1 (Semrush, Local SEO AI Agent)
  work/raiffeisen-mobile/page.tsx  Case study 2 (Raiffeisen, QR payments)
public/work/<case>/       Case imagery
worker/index.ts           Cloudflare entry, image optimization
tests/rendered-html.test.mjs  Route smoke tests against the built worker
```

## Rules that matter here

### Server components by default

Only `SiteNav.tsx` is a client component. Case study pages are server components:
no `useState`, no `useEffect`, no event handlers. Before adding `"use client"` to
a page, try a CSS-only pattern — hidden radio inputs plus `:checked` sibling
selectors handle toggles, steppers and reveals without shipping hydration, and
give keyboard support for free. Reach for a client component only when state must
survive interaction or come from the browser.

### globals.css — formatted and deduplicated (2026-08), keep it that way

The file used to be appended-to in minified passes, so the same selector got
redefined many times across the file (`.case-stage` 8 times, `.product-evidence`
6, `.qr-hero-stage` 4) with only the last occurrence taking effect. It has been
mechanically deduplicated (`postcss-combine-duplicated-selectors`, cascade
verified with a `getComputedStyle` diff across all routes/breakpoints before
and after) and reformatted to multi-line, one selector block per rule.

Consequence for future edits: don't reintroduce the old pattern. Before adding a
rule for a selector, `grep -n` for it — if it already has a block, edit that
block instead of appending a new one at the bottom. Cross-cutting overrides
(different selector, same target element, e.g. the `.qr-case` theme layer) are
still legitimate and stay separate; the deduplication only merged rules with
*identical* selector text.

`:root` holds the tokens:

```
--ink #171717   --paper #f7f6f2   --line #d6d4cd
--violet / --acid #5640d8   --soft-violet #e8e3ff   --max 1440px
```

Use them. Do not introduce new hex values for anything that maps to an existing
token. Fonts come from `next/font/google` (Geist, Geist Mono) exposed as
`--font-geist` and `--font-mono`.

### Case study page anatomy

Both cases share a vocabulary. Reuse it instead of inventing new blocks:

| Class | Purpose |
|---|---|
| `case-hero` | Title, meta chips, lede, opening visual |
| `snapshot-section` | Scope and ownership definition list |
| `case-punch` | Full-bleed violet band with the one-sentence argument |
| `decision-section` + `Decision` component | One decision: challenge, alternatives, trade-off, evidence |
| `compare` / `Alternatives` | Rejected vs chosen, side by side |
| `case-stage` | Framed product screenshot |
| `screen-flow` | Three-step flow strip (Raiffeisen) |
| `measure` | Outcome with its stated limits |
| `appendix` | Collapsible evidence boundaries |
| `next-case` | Link to the other case |

Each page defines its small components inline at the bottom of the file. Keep
that pattern — no shared component library, no premature abstraction.

### Content discipline — the part that is easy to get wrong

Never invent research, metrics, interviews, experiments or results. If a number
lacks a baseline, timeframe, denominator and method, it does not go on the site,
or it goes on with those limits stated next to it. Existing examples to imitate:
the `8%` figure is published together with "no baseline, no target, GA4 plus a
SQL query I ran myself", and the Raiffeisen case explicitly says post-launch
effect was not preserved in the available evidence.

Do not silently upgrade a reconstruction into a production screenshot. If an
artefact was rebuilt because the original is lost, label it.

The private source-of-truth documents — evidence maps, fact gaps, ownership
boundaries — live outside this repo in
`~/Documents/Design/Portfolio/github-portfolio-package/project-docs/`. Check a
claim against them before writing it. Never copy them into this repository.

## Images

Plain `<img>` with an eslint-disable at the top of the AI Agent page; the Sites
image runtime was unreliable in local preview. Always set `width` and `height`
to prevent layout shift, and `loading="lazy"` for anything below the fold.

Assets are uncompressed and some are heavy: `landing-page.png` is 770 KB at
1025×4522, `og.png` is 1.1 MB, five Raiffeisen JPEGs are 280–434 KB. Compressing
these is a real pending task, not a nitpick — case study pages are image-dense
and recruiters open them on conference wifi.

## Build, test, deploy

```
npm run dev     vinext dev
npm run build   vinext build
npm test        build, then route smoke tests
npm run lint
```

The smoke test asserts each of `/`, `/cv`, `/work/ai-agent`,
`/work/raiffeisen-mobile` returns 200, has a title containing the name, and has
exactly one `<h1>`. Adding a second `<h1>` to a page will fail the suite.

Two constraints worth knowing:

- **Homebrew is not installed.** Node *is* available at `~/.local/node/bin`
  (installed 2026-08-07 as an official nodejs.org tarball, no sudo/Homebrew
  needed) — it's not on `PATH` by default, so prefix commands with
  `PATH="$HOME/.local/node/bin:$PATH"`. `pnpm` works via `corepack enable`.
  `node_modules` was originally placed by the tooling that scaffolded this
  project; `pnpm install` now works locally too.
- **Deployment does not happen through git.** The site is published by the
  OpenAI Sites tooling (`.openai/hosting.json`, project `appgprj_6a72…`) to
  `vladimir-deev-kazanov.vladimirdeev0.chatgpt.site`. Pushing to GitHub stores
  code; it does not update the live site.

## Git

Remote `origin` is `github.com/vladimir-deev-kazanov/portfolio`, branch `main`.
**Nothing has been pushed yet** — the remote is empty. `.gitignore` already
excludes `node_modules`, `dist`, `.wrangler` and `.env*`; tracked content is
about 6 MB.

## Known open items

1. `metadataBase` in `layout.tsx` still points at the temporary chatgpt.site
   host. It drives canonical and OpenGraph URLs — change it when hosting moves.
2. The AI Agent flow list names seven steps but the page shows three. Profile
   analysis and personalised audit — the moments that make the agent legible —
   are named and never shown. Assets exist in
   `~/Documents/Design/Portfolio/AI Agent mock-ups/` and `Semrush 2025/`.
3. Raiffeisen has no "before" image. Decisions 01 and 02 both argue against the
   old dynamic/static model, and no screenshot of it survives in any folder. The
   argument currently rests entirely on text cards.
4. `landing-hero.png` sits in `public/` but is not referenced anywhere.
5. Image weights, above.
6. Two lockfiles are tracked (`package-lock.json` and `pnpm-lock.yaml`) even
   though every script uses `pnpm`. Nobody has confirmed whether the OpenAI
   Sites deploy tooling depends on the npm one, so it hasn't been removed —
   check that before deleting it.
