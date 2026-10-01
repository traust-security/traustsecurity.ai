import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Marked } from "marked";
import { footerHtml, navHtml } from "../src/chrome.js";
import { gfmHeadingId, getHeadingList, resetHeadings } from "marked-gfm-heading-id";

const REPO_BLOB = "https://github.com/traust-security/traust/blob/main/";
const SITE = "https://traustsecurity.ai";
const ENTRY = "src/docs-entry.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripMd = (s) => s.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*]/g, "").trim();

function rewriteHref(href) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [path, hash = ""] = href.split("#");
  const suffix = hash ? `#${hash}` : "";
  if (path.startsWith("../")) return `${REPO_BLOB}${path.replace(/^(\.\.\/)+/, "")}${suffix}`;
  const m = path.match(/^(?:\.\/)?([\w-]+)\.md$/);
  if (m) return m[1] === "README" ? `/docs/${suffix}` : `/docs/${m[1]}/${suffix}`;
  return href;
}

function loadDocs(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const slug = file.slice(0, -3);
      const src = readFileSync(resolve(dir, file), "utf8");
      const title = stripMd((src.match(/^#\s+(.+)$/m) || [, slug])[1]);
      const lead = src.replace(/^```[\s\S]*?^```/gm, "").split("\n").find((l, i) => i > 0 && l.trim() && !/^[#|>\-`!]/.test(l.trim()));
      return { slug, file, src, title, description: stripMd(lead || title).slice(0, 200) };
    });
}

function renderMarkdown(src) {
  const marked = new Marked(gfmHeadingId());
  let hasMermaid = false;
  marked.use({
    renderer: {
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const out = rewriteHref(href);
        const ext = /^https?:/.test(out) ? ' rel="noopener"' : "";
        return `<a href="${esc(out)}"${title ? ` title="${esc(title)}"` : ""}${ext}>${text}</a>`;
      },
      code({ text, lang }) {
        if (lang === "mermaid") {
          hasMermaid = true;
          return `<pre class="mermaid">${esc(text)}</pre>\n`;
        }
        return `<pre><code${lang ? ` class="language-${esc(lang)}"` : ""}>${esc(text)}</code></pre>\n`;
      },
      table(token) {
        const head = token.header
          .map((c, i) => `<th${token.align[i] ? ` align="${token.align[i]}"` : ""}>${this.parser.parseInline(c.tokens)}</th>`)
          .join("");
        const rows = token.rows
          .map((r) => `<tr>${r.map((c, i) => `<td${token.align[i] ? ` align="${token.align[i]}"` : ""}>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table-wrap" tabindex="0" role="region" aria-label="Table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  resetHeadings();
  const html = marked.parse(src);
  const toc = getHeadingList().filter((h) => h.level === 2);
  return { html, toc, hasMermaid };
}

// Sidebar groups come from the "## Section" + table-of-links layout in README.md.
function sidebarGroups(docs) {
  const readme = docs.find((d) => d.slug === "README");
  const known = new Map(docs.map((d) => [d.slug, d]));
  const groups = [];
  let current = null;
  for (const line of readme.src.split("\n")) {
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      current = { name: stripMd(h[1]).replace(/\s+—.*$/, ""), items: [] };
      groups.push(current);
      continue;
    }
    const l = line.match(/^\|\s*\[[^\]]+\]\(([\w-]+)\.md\)/);
    if (l && current && known.has(l[1]) && l[1] !== "README") current.items.push(known.get(l[1]));
  }
  return groups.filter((g) => g.items.length);
}

function page({ doc, docs, groups, logo, assets, rendered }) {
  const isIndex = doc.slug === "README";
  const url = isIndex ? "/docs/" : `/docs/${doc.slug}/`;
  const nav = groups
    .map(
      (g) => `<div class="docs-nav-group"><h2>${esc(g.name)}</h2><ul>${g.items
        .map((d) => `<li><a href="/docs/${d.slug}/"${d.slug === doc.slug ? ' aria-current="page"' : ""}>${esc(d.title)}</a></li>`)
        .join("")}</ul></div>`
    )
    .join("");
  const ordered = groups.flatMap((g) => g.items);
  const i = ordered.findIndex((d) => d.slug === doc.slug);
  const prev = i > 0 ? ordered[i - 1] : null;
  const next = i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : null;
  const pager =
    prev || next
      ? `<nav class="docs-pager" aria-label="Pager">${prev ? `<a rel="prev" href="/docs/${prev.slug}/"><span>Previous</span>${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a rel="next" href="/docs/${next.slug}/"><span>Next</span>${esc(next.title)}</a>` : ""}</nav>`
      : "";
  const toc = rendered.toc.length > 2
    ? `<aside class="docs-toc" aria-label="On this page"><h2>On this page</h2><ul>${rendered.toc.map((h) => `<li><a href="#${h.id}">${esc(stripMd(h.text))}</a></li>`).join("")}</ul></aside>`
    : "";
  const css = assets.css.map((h) => `<link rel="stylesheet" href="${h}" />`).join("\n    ");
  const mermaid = rendered.hasMermaid
    ? `<script type="module">import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"; mermaid.initialize({ startOnLoad: true, theme: "neutral" });</script>`
    : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(doc.title)} — Traust docs</title>
    <meta name="description" content="${esc(doc.description)}" />
    <meta name="theme-color" content="#151515" />
    <link rel="canonical" href="${SITE}${url}" />
    <link rel="icon" href="${logo}" type="image/svg+xml" />
    ${css}
    <script type="module" src="${assets.js}"></script>
  </head>
  <body class="docs-page">
    <a class="skip-link" href="#main">Skip to content</a>
    ${navHtml({ logo, home: "/", current: "docs" })}
    <div class="docs-layout">
      <details class="docs-menu" open><summary>Documentation</summary>${nav}</details>
      <main id="main" class="docs-content" tabindex="-1">
        <article class="prose">${rendered.html}</article>
        ${pager}
      </main>
      ${toc}
    </div>
    ${footerHtml({ logo, home: "/" })}
    ${mermaid}
  </body>
</html>
`;
}

function collectCss(chunk, bundle, seen = new Set()) {
  if (seen.has(chunk.fileName)) return [];
  seen.add(chunk.fileName);
  const own = [...(chunk.viteMetadata?.importedCss ?? [])];
  const deps = chunk.imports.flatMap((f) => (bundle[f] ? collectCss(bundle[f], bundle, seen) : []));
  return [...new Set([...deps, ...own])].map((f) => (f.startsWith("/") ? f : `/${f}`));
}

export default function docsPlugin() {
  let root;
  const build = (assets, logo) => {
    const dir = resolve(root, "src/docs");
    const docs = loadDocs(dir);
    const groups = sidebarGroups(docs);
    const pages = new Map();
    for (const doc of docs) {
      let src = doc.src;
      if (doc.slug === "continuous-scanning") {
        // Redirect stub: keep the old URL alive.
        const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><title>Moved — Traust docs</title><meta http-equiv="refresh" content="0; url=/docs/continuous-operations/" /><link rel="canonical" href="${SITE}/docs/continuous-operations/" /></head><body><p>Moved to <a href="/docs/continuous-operations/">continuous-operations</a>.</p></body></html>`;
        pages.set("/docs/continuous-scanning/", { html, doc, redirect: true });
        continue;
      }
      const rendered = renderMarkdown(src);
      const key = doc.slug === "README" ? "/docs/" : `/docs/${doc.slug}/`;
      pages.set(key, { html: page({ doc, docs, groups, logo, assets, rendered }), doc });
    }
    return pages;
  };

  return {
    name: "traust-docs",
    configResolved(c) {
      root = c.root;
    },
    config() {
      return { build: { rollupOptions: { input: { main: resolve("index.html"), docs: resolve(ENTRY) } } } };
    },
    configureServer(server) {
      server.watcher.add(resolve(root, "src/docs"));
      server.watcher.on("change", (f) => {
        if (f.includes("/src/docs/") && f.endsWith(".md")) server.ws.send({ type: "full-reload" });
      });
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url || "").split("?")[0];
        if (!path.startsWith("/docs")) return next();
        const key = path.endsWith("/") ? path : `${path}/`;
        const pages = build({ css: [], js: `/${ENTRY}` }, "/src/logo.svg");
        const hit = pages.get(key);
        if (!hit) return next();
        const html = await server.transformIndexHtml(req.url, hit.html);
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      });
    },
    generateBundle(_, bundle) {
      const entry = Object.values(bundle).find((c) => c.type === "chunk" && c.isEntry && c.facadeModuleId?.endsWith(ENTRY));
      if (!entry) throw new Error("docs entry chunk not found");
      const assets = {
        js: `/${entry.fileName}`,
        css: collectCss(entry, bundle),
      };
      this.emitFile({ type: "asset", fileName: "logo.svg", source: readFileSync(resolve(root, "src/logo.svg")) });
      const pages = build(assets, "/logo.svg");
      for (const [key, { html }] of pages) {
        this.emitFile({ type: "asset", fileName: `${key.slice(1)}index.html`, source: html });
      }
      const urls = ["/", ...[...pages].filter(([, p]) => !p.redirect).map(([k]) => k)];
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join("\n")}\n</urlset>\n`,
      });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n` });
    },
  };
}
