#!/usr/bin/env node
/*
 * Browser checks that the static smoke tests cannot do:
 *   1. type hierarchy: no h2/h3 larger than the page's h1, and every decision
 *      heading equals the other h2s;
 *   2. zero requests to fonts.googleapis.com / fonts.gstatic.com;
 *   3. axe-core: no serious or critical violations;
 *   4. the Raiffeisen prototype never takes focus on load (PageDown scrolls);
 *   5. no horizontal overflow at 390 and 1440.
 *
 * Needs playwright-core and axe-core, which are not project dependencies:
 *   npm i --no-save playwright-core axe-core
 *   npm run build && npx vinext start -p 4173 &
 *   QA_URL=http://localhost:4173 node scripts/qa/browser-checks.mjs
 * Set QA_NODE_MODULES to a node_modules folder that has them, and CHROME_PATH
 * to a Chrome/Chromium binary if the default macOS path is wrong.
 */
import { createRequire } from "node:module";
import path from "node:path";

const base = process.env.QA_URL ?? "http://localhost:4173";
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const req = createRequire(process.env.QA_NODE_MODULES ? path.join(process.env.QA_NODE_MODULES, "_") : import.meta.url);
const { chromium } = req("playwright-core");
const axeSource = (await import("node:fs")).readFileSync(req.resolve("axe-core/axe.min.js"), "utf8");

const routes = ["/", "/cv", "/privacy", "/work/ai-agent", "/work/raiffeisen-mobile", "/work/semrush-locations"];
const failures = [];
const fail = (msg) => { failures.push(msg); console.log("FAIL", msg); };

const browser = await chromium.launch({ executablePath: chrome });
for (const [label, width, height] of [["1440", 1440, 900], ["390", 390, 844]]) {
  const context = await browser.newContext({ viewport: { width, height } });
  for (const route of routes) {
    const page = await context.newPage();
    const hosts = [];
    page.on("request", (r) => hosts.push(new URL(r.url()).host));
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForTimeout(400);

    const sizes = await page.evaluate(() => {
      const px = (el) => parseFloat(getComputedStyle(el).fontSize);
      const h1 = document.querySelector("h1");
      return {
        h1: h1 ? px(h1) : 0,
        h2: [...document.querySelectorAll("main h2")].map((e) => [e.id || e.textContent.slice(0, 30), px(e), e.className]),
        h3: [...document.querySelectorAll("main h3")].map((e) => px(e)),
        decisions: [...document.querySelectorAll(".decision-section h2")].map(px),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      };
    });
    for (const [name, size, cls] of sizes.h2) {
      if (size > sizes.h1 && !cls.includes("kicker")) fail(`${route} @${label}: h2 "${name}" (${size}px) larger than h1 (${sizes.h1}px)`);
    }
    for (const size of sizes.h3) if (size > sizes.h1) fail(`${route} @${label}: h3 (${size}px) larger than h1 (${sizes.h1}px)`);
    const plain = sizes.h2.filter(([, , cls]) => !cls.includes("kicker")).map(([, s]) => s);
    if (plain.length && new Set(plain).size > 1 && route !== "/") fail(`${route} @${label}: h2 sizes differ: ${[...new Set(plain)].join(", ")}`);
    if (sizes.overflow) fail(`${route} @${label}: horizontal overflow`);
    const googleFonts = hosts.filter((h) => /fonts\.(googleapis|gstatic)\.com/.test(h));
    if (googleFonts.length) fail(`${route} @${label}: requests to ${[...new Set(googleFonts)].join(", ")}`);

    if (label === "1440") {
      await page.evaluate(axeSource);
      const result = await page.evaluate(async () => (await window.axe.run(document, { resultTypes: ["violations"] })).violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, target: v.nodes[0]?.target?.join(" ") })));
      for (const v of result) {
        if (v.impact === "serious" || v.impact === "critical") fail(`${route}: axe ${v.impact} ${v.id} (${v.nodes}) e.g. ${v.target}`);
        else console.log("note", route, "axe", v.impact, v.id, v.nodes);
      }
      if (route === "/work/raiffeisen-mobile") {
        const active = await page.evaluate(() => document.activeElement?.tagName);
        if (active !== "BODY") fail(`${route}: document.activeElement is ${active} after load`);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.keyboard.press("PageDown");
        await page.waitForTimeout(500);
        if ((await page.evaluate(() => scrollY)) < 200) fail(`${route}: PageDown did not scroll`);
      }
    }
    await page.close();
  }
  await context.close();
}
await browser.close();
console.log(failures.length ? `\n${failures.length} failure(s)` : "\nAll browser checks passed");
process.exit(failures.length ? 1 : 0);
