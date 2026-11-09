import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const route of ["/", "/cv", "/privacy", "/work/ai-agent", "/work/raiffeisen-mobile", "/work/semrush-locations"]) {
  test(`${route} renders the portfolio shell`, async () => {
    const response = await render(route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /<title>[^<]*Vladimir Deev-Kazanov[^<]*<\/title>/i);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
    assert.match(html, /<nav[^>]+aria-label="Primary navigation"/i);
    assert.match(html, /href="#main-content"[^>]*>Skip to content</i);
    assert.match(html, /<main[^>]+id="main-content"/i);
    assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
  });
}

test("AI Agent product evidence exists locally", async () => {
  await Promise.all(["dashboard-mvp.png", "dashboard-mvp-full.png", "actions-later.png", "post-editor-crop.png", "settings-enabled.png"].map((name) =>
    access(new URL(`public/work/ai-agent/${name}`, projectRoot)),
  ));
});

test("the home page requests no third-party fonts", async () => {
  const html = await (await render("/")).text();
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/i);
});

test("no heading size token can exceed the H1 size", async () => {
  const css = await readFile(new URL("app/globals-quiet-weight.css", projectRoot), "utf8");
  const clamp = (name) => {
    const match = css.match(new RegExp(`--${name}:\\s*clamp\\((\\d+)px,[^,]+,\\s*(\\d+)px\\)`));
    assert.ok(match, `--${name} should be a px clamp()`);
    return { min: Number(match[1]), max: Number(match[2]) };
  };
  const display = clamp("fs-display");
  for (const name of ["fs-h2", "fs-h3", "fs-lead", "fs-body"]) {
    assert.ok(clamp(name).max < display.min, `--${name} max must stay below the smallest H1 (${display.min}px)`);
  }
});

test("case studies keep a single evidence block and no inline validation notes", async () => {
  for (const route of ["/work/ai-agent", "/work/raiffeisen-mobile", "/work/semrush-locations"]) {
    const html = await (await render(route)).text();
    assert.equal((html.match(/id="evidence-title"/g) ?? []).length, 1, `${route} evidence block`);
    assert.doesNotMatch(html, /Validation status|Visual boundary|Credible alternative/i, route);
  }
});
