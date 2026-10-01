import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { before } from "node:test";
import { build } from "vite";

const out = await mkdtemp(join(tmpdir(), "traust-docs-"));
const slugs = readdirSync(new URL("../src/docs", import.meta.url))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.slice(0, -3));
const pagePath = (slug) => join(out, "docs", slug === "README" ? "" : slug, "index.html");

before(async () => {
  await build({ logLevel: "silent", build: { outDir: out, emptyOutDir: true } });
});

test("every markdown doc is rendered to a page", () => {
  for (const slug of slugs) assert.ok(existsSync(pagePath(slug)), `${slug} page exists`);
  assert.ok(existsSync(join(out, "sitemap.xml")));
  assert.ok(existsSync(join(out, "robots.txt")));
});

test("no markdown or out-of-tree relative links remain", () => {
  for (const slug of slugs) {
    const html = readFileSync(pagePath(slug), "utf8");
    assert.doesNotMatch(html, /href="(?!https?:)[^"#]*\.md(#[^"]*)?"/, `${slug}: .md href`);
    assert.doesNotMatch(html, /href="\.\.\//, `${slug}: ../ href`);
  }
});

test("internal doc links and anchors resolve", () => {
  for (const slug of slugs) {
    const html = readFileSync(pagePath(slug), "utf8");
    for (const [, target, hash] of html.matchAll(/href="\/docs\/([\w-]*)\/?(?:#([^"]*))?"/g)) {
      const dest = pagePath(target || "README");
      assert.ok(existsSync(dest), `${slug} -> ${target}`);
      if (hash && target !== "continuous-scanning") {
        assert.match(readFileSync(dest, "utf8"), new RegExp(`id="${hash}"`), `${slug} -> ${target}#${hash}`);
      }
    }
  }
});

test("docs pages link back to the site", () => {
  const html = readFileSync(pagePath("README"), "utf8");
  assert.match(html, /href="\/#workflow"/);
  assert.match(html, /class="site-nav"/);
  assert.match(html, /<link rel="stylesheet" href="\/assets\//);
});
