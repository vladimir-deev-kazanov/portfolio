#!/usr/bin/env node
/*
 * Renders the 1200x630 link-preview cards in public/og/ from the case hero
 * images, on the paper background, using the self-hosted fonts.
 *   npm i --no-save playwright-core   (then, from the repo root)
 *   node scripts/og-cards.mjs
 */
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const req = createRequire(process.env.QA_NODE_MODULES ? path.join(process.env.QA_NODE_MODULES, "_") : import.meta.url);
const { chromium } = req("playwright-core");
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const b64 = (file, mime) => `data:${mime};base64,${readFileSync(path.join(root, file)).toString("base64")}`;
const cards = [
  { slug: "ai-agent", label: "Case study · Semrush · 2025", title: "I designed an AI agent’s first release in a week, then what owners needed after launch.", image: "assets/originals/ai-agent/dashboard-mvp-clean.png", fit: "width" },
  { slug: "raiffeisen-mobile", label: "Case study · Raiffeisen Bank · 2023", title: "I turned technical QR types into merchant tasks and gave cashiers their own limited access.", image: "assets/originals/raiffeisen-mobile/screens/one-type-en.jpg", fit: "phone" },
  { slug: "semrush-locations", label: "Case study · Semrush · 2025", title: "I turned one-at-a-time location setup into a single bulk action.", image: "assets/originals/semrush-locations/hero.png", fit: "width" },
];

const fonts = `
@font-face{font-family:Manrope;src:url(${b64("public/fonts/manrope-latin.woff2", "font/woff2")});font-weight:200 800}
@font-face{font-family:Oswald;src:url(${b64("public/fonts/oswald-700-latin.woff2", "font/woff2")});font-weight:700}
`;

const browser = await chromium.launch({ executablePath: chrome });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
mkdirSync(path.join(root, "public/og"), { recursive: true });
for (const c of cards) {
  const mime = c.image.endsWith(".png") ? "image/png" : "image/jpeg";
  await page.setContent(`<style>${fonts}
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#f2eee3;color:#241b17;font-family:Manrope;position:relative;overflow:hidden}
  .l{position:absolute;left:64px;top:56px;font:600 22px Manrope;letter-spacing:.01em;color:#5f584f}
  h1{position:absolute;left:64px;top:128px;width:600px;font:700 58px/0.98 Oswald;letter-spacing:-.02em}
  .n{position:absolute;left:64px;bottom:56px;font-weight:600;font-size:26px}
  .n span{display:block;font-weight:400;font-size:22px;color:#5f584f;margin-top:4px}
  .i{position:absolute;right:64px;top:64px;width:440px;height:502px;border-radius:8px;overflow:hidden;background:color-mix(in srgb,#a55f49 8%,#f2eee3);outline:1px solid rgb(36 27 23/10%);outline-offset:-1px}
  .i img{position:absolute;border-radius:8px;outline:1px solid rgb(36 27 23/10%)}
  .w img{left:20px;top:20px;width:400px}
  .p img{left:80px;top:40px;width:280px}
  </style><div class="l">${c.label}</div><h1>${c.title}</h1><div class="n">Vladimir Deev-Kazanov<span>Senior Product Designer</span></div>
  <div class="i ${c.fit === "phone" ? "p" : "w"}"><img src="${b64(c.image, mime)}"></div>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, `public/og/${c.slug}.png`) });
  console.log("wrote public/og/" + c.slug + ".png");
}
await browser.close();
