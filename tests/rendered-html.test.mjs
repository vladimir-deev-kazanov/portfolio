import assert from "node:assert/strict";
import { access } from "node:fs/promises";
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

for (const route of ["/", "/about", "/cv", "/privacy", "/work/ai-agent", "/work/raiffeisen-mobile"]) {
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
  await Promise.all(["dashboard-mvp.png", "dashboard-later.png", "post-editor.png", "settings.png"].map((name) =>
    access(new URL(`public/work/ai-agent/${name}`, projectRoot)),
  ));
});
