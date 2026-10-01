import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const logo = await readFile(new URL("../src/logo.svg", import.meta.url), "utf8");
const chrome = await readFile(new URL("../src/chrome.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

const requiredStages = [
  "Map the estate.",
  "Know what can go wrong.",
  "Combine breadth with judgment.",
  "Turn alerts into decisions.",
  "Test reality, safely.",
  "Turn uncertainty into a test.",
  "Remediate. Then verify.",
  "Make the evidence usable.",
  "Put findings where work happens.",
];

const flipSequence = ["skills", "agents", "scripts", "scanners", "more than a harness"];

test("hero contains the requested flip sequence in order", () => {
  assert.match(source, /<span>Traust is<\/span>/);
  assert.doesNotMatch(source, /Traust am/);
  let cursor = -1;
  for (const word of flipSequence) {
    const next = source.indexOf(`"${word}"`, cursor + 1);
    assert.ok(next > cursor, `${word} is present in sequence`);
    cursor = next;
  }
});

test("workflow includes each lifecycle stage", () => {
  for (const title of requiredStages) {
    assert.match(source, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("workflow uses an accessible interactive pipeline followed by its record", () => {
  assert.match(source, /class="pipeline-tabs" role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /aria-selected/);
  assert.match(source, /ArrowRight/);
  assert.doesNotMatch(source, /class="workflow-path"/);
  assert.match(source, /class="evidence-spine reveal"/);
  assert.match(source, /class="evidence-rail"/);
  assert.doesNotMatch(source, /class="continuity"/);
  assert.ok(source.indexOf('class="pipeline-detail"') < source.indexOf('class="evidence-spine reveal"'));
  assert.ok(source.indexOf('class="evidence-spine reveal"') < source.indexOf('class="platform"'));
  assert.doesNotMatch(source, /class="terminal-section"/);
  assert.doesNotMatch(source, /class="quickstart-band"/);
  assert.doesNotMatch(source, /Agent-native by design/);
  assert.doesNotMatch(source, /Start small/);
  assert.match(styles, /\.workflow-section \{[^}]*color: var\(--paper\);[^}]*background: var\(--dark\);/s);
  assert.match(styles, /\.pipeline-detail \{[^}]*background: var\(--dark-raised\);/s);
});

test("differentiator sections and model-neutral language are present", () => {
  assert.match(source, /your models/i);
  assert.match(source, /platform-number">01/);
  assert.match(source, /platform-name">SDK/);
  assert.match(source, /platform-number">02/);
  assert.match(source, /platform-name">Contracts/);
  assert.match(source, /platform-number">03/);
  assert.match(source, /platform-name">Ledger/);
});

test("platform differentiators use an accessible single-open accordion", () => {
  assert.equal(source.match(/class="platform-trigger"/g)?.length, 3);
  assert.equal(source.match(/class="platform-panel"/g)?.length, 3);
  assert.match(source, /aria-expanded="true"/);
  assert.match(source, /aria-expanded="false"/);
  assert.match(source, /aria-controls="platform-panel-sdk"/);
  assert.match(source, /platformItems\.forEach/);
  assert.match(source, /setPlatformItem/);
  assert.doesNotMatch(source, /class="platform-row/);
});

test("document includes essential metadata and skip navigation", () => {
  assert.match(html, /name="description"/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /id="app"/);
});

test("adapted shield mark is used for visible branding without a hero watermark", () => {
  assert.match(logo, /viewBox="0 0 180 210"/);
  assert.match(source, /import logoUrl from "\.\/logo\.svg"/);
  assert.match(chrome, /class="wordmark-logo"/);
  assert.doesNotMatch(source, /class="hero-logo"/);
  assert.doesNotMatch(styles, /\.hero-logo/);
  assert.match(html, /rel="icon" href="\/src\/logo\.svg"/);
});

test("visual system uses accessible Red Hat UX foundations without branding", () => {
  assert.match(source, /@fontsource\/red-hat-display/);
  assert.match(source, /@fontsource\/red-hat-text/);
  assert.match(source, /@fontsource\/red-hat-mono/);
  assert.doesNotMatch(source, /@fontsource\/(?:manrope|newsreader|dm-mono)/);
  assert.doesNotMatch(source, /Red Hat/i);
  assert.doesNotMatch(logo, /Red Hat/i);
  assert.match(styles, /--ink: #151515/);
  assert.match(styles, /--paper: #ffffff/);
  assert.match(styles, /--link: #0066cc/);
  assert.match(styles, /--accent: #ee0000/);
  assert.match(styles, /--accent-hover: #a60000/);
  assert.match(styles, /--accent-light: #f9a8a8/);
  assert.match(styles, /--accent-dark: #5f0000/);
  assert.match(styles, /--link-dark: #92c5f9/);
  assert.match(styles, /--success: #63993d/);
  assert.match(styles, /--warning: #ffcc17/);
  assert.match(styles, /\.site-nav \{[^}]*height: 80px;/s);
  assert.match(styles, /\.wordmark-logo \{[^}]*width: 40px;[^}]*height: 48px;/s);
  assert.match(styles, /text-decoration: underline/);
  assert.match(styles, /outline: 3px solid var\(--link\)/);
  assert.match(html, /name="theme-color" content="#151515"/);
});
