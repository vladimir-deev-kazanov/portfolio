# vladimirdeev.com

Portfolio of Vladimir Deev-Kazanov, Senior Product Designer: three case studies, a CV, and a short privacy note.

**Stack.** Next.js 16 App Router (server components; one small client nav), built with vinext on Vite and served by a Cloudflare Worker. Plain semantic CSS with design tokens, no utility classes. Plausible analytics, cookieless.

**Run it.** Node 22.13 or newer.

```bash
npm install
npm run dev     # local dev server
npm run lint
npm test        # builds, then smoke-tests every route against the built worker
```

**Budget.** WCAG 2.1 AA, no horizontal scroll at 390 and 1440 px, one `<h1>` per page, and no third-party font requests. Case pages should load under 1 MB of images.

Designed and directed by me; built with an AI coding agent.
