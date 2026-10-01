import "@fontsource/red-hat-display/latin-400.css";
import "@fontsource/red-hat-display/latin-500.css";
import "@fontsource/red-hat-display/latin-700.css";
import "@fontsource/red-hat-text/latin-400.css";
import "@fontsource/red-hat-text/latin-500.css";
import "@fontsource/red-hat-mono/latin-400.css";
import "@fontsource/red-hat-mono/latin-500.css";
import logoUrl from "./logo.svg";
import "./styles.css";
import { footerHtml, githubIcon, navHtml, quickstartUrl, repositoryUrl } from "./chrome.js";

const arrowIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const stageIcons = {
  inventory: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g class="icon-muted" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="28" y="31" width="72" height="51" rx="3"/><path d="M40 44h21M40 55h38M40 66h29"/>
        <rect x="140" y="98" width="72" height="51" rx="3"/><path d="M152 111h21M152 122h38M152 133h29"/>
        <rect x="28" y="111" width="72" height="38" rx="3"/><path d="M40 124h31M40 135h19"/>
      </g>
      <g class="icon-accent" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="157" cy="51" r="25"/><path d="m174 69 17 17M147 43h20M147 52h13M147 61h16"/>
        <path d="M100 56h30M91 99l25-21 23 24" stroke-dasharray="4 5"/>
      </g>
    </svg>`,
  threat: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <circle cx="120" cy="90" r="58"/><circle cx="120" cy="90" r="34"/><circle cx="120" cy="90" r="10"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2" class="icon-accent">
        <path d="M29 132 120 90l-41-76M120 90l79-44M120 90l49 68"/>
        <circle cx="29" cy="132" r="5" fill="currentColor"/><circle cx="79" cy="14" r="5" fill="currentColor"/><circle cx="199" cy="46" r="5" fill="currentColor"/><circle cx="169" cy="158" r="5" fill="currentColor"/>
      </g>
    </svg>`,
  audit: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <path d="M48 27h112l31 31v96H48z"/><path d="M160 27v31h31M70 79h76M70 96h99M70 113h82M70 130h53"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.2" class="icon-accent">
        <circle cx="154" cy="119" r="28"/><path d="m174 139 19 19M145 119l7 7 14-18"/>
      </g>
    </svg>`,
  triage: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <path d="M33 35h174M33 78h174M33 121h174"/><circle cx="67" cy="35" r="17"/><circle cx="151" cy="78" r="17"/><circle cx="102" cy="121" r="17"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.2" class="icon-accent">
        <path d="m60 35 5 5 10-12M144 78l5 5 10-12M95 121l5 5 10-12"/><path d="M37 151h117" stroke-dasharray="3 5"/><path d="m148 145 10 6-10 6"/>
      </g>
    </svg>`,
  validate: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <path d="M120 19 193 51v48c0 39-29 57-73 68-44-11-73-29-73-68V51z"/>
        <path d="M76 77h88M76 96h53M76 115h73"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.4" class="icon-accent">
        <path d="m93 89 19 19 39-44"/><circle cx="120" cy="91" r="52" stroke-dasharray="3 6"/>
      </g>
    </svg>`,
  remediate: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <path d="M35 42h76v96H35zM129 42h76v96h-76z"/><path d="M49 61h47M49 76h32M49 91h41M143 61h47M143 76h25M143 91h41"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.2" class="icon-accent">
        <path d="M93 118h54M137 108l10 10-10 10M72 113l8 8 19-24M157 113l8 8 19-24"/>
      </g>
    </svg>`,
  deliver: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <path d="M31 52h178v99H31zM31 52l89 61 89-61"/><path d="m31 151 62-56M209 151l-62-56"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.2" class="icon-accent">
        <path d="M120 18v70M105 72l15 16 15-16"/><circle cx="120" cy="18" r="5" fill="currentColor"/>
      </g>
    </svg>`,
  continuous: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <circle cx="120" cy="90" r="60"/><circle cx="120" cy="90" r="34"/><path d="M120 56v34l25 15"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.3" class="icon-accent">
        <path d="M59 80a62 62 0 0 1 108-32M181 99a62 62 0 0 1-108 32"/><path d="m164 32 5 18-19-2M76 147l-5-18 19 2"/>
      </g>
    </svg>`,
  fuzz: `
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.5" class="icon-muted">
        <path d="M84 54h72M70 75h100M64 99h112M76 123h88"/><circle cx="120" cy="91" r="52"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="2.3" class="icon-accent">
        <path d="M102 62v-17m36 17v-17M88 80 72 69m80 11 16-11M91 112l-18 12m76-12 18 12M103 119v18m34-18v18"/>
        <path d="M97 79c0-15 10-24 23-24s23 9 23 24v28c0 16-10 27-23 27s-23-11-23-27zM97 92h46M120 55v79"/>
      </g>
    </svg>`,
};

const stages = [
  {
    number: "01",
    label: "Inventory",
    phase: "Understand",
    title: "Map the estate.",
    command: "/inventory-repositories",
    description:
      "Start with the whole system, not an isolated repository. Traust discovers source, images, packages, services, ownership, and the product relationships between them.",
    output: "A living inventory and portfolio graph define what exists, who owns it, and what must be assessed.",
    icon: "inventory",
  },
  {
    number: "02",
    label: "Threat model",
    phase: "Model",
    title: "Know what can go wrong.",
    command: "/threat-model",
    description:
      "Your model reads architecture and code to identify trust boundaries, attacker goals, exposed surfaces, and controls before it starts hunting for individual bugs.",
    output: "A threat model becomes shared context for audit, triage, validation, and future change reviews.",
    icon: "threat",
  },
  {
    number: "03",
    label: "Audit",
    phase: "Discover",
    title: "Combine breadth with judgment.",
    command: "/secure-code-audit",
    description:
      "Deterministic scanners enumerate facts. Your models reason over code, configuration, and threat context across industry security frameworks. Each method strengthens the other.",
    output: "Schema-valid findings carry evidence, locations, severity, remediation, and exact workflow provenance.",
    icon: "audit",
  },
  {
    number: "04",
    label: "Triage",
    phase: "Decide",
    title: "Turn alerts into decisions.",
    command: "/triage",
    description:
      "Traust adversarially checks every claim, collapses duplicates, ranks exploitability, and routes uncertain conclusions to human review instead of quietly discarding them.",
    output: "Engineering receives a prioritized, cited set of findings rather than another undifferentiated scanner backlog.",
    icon: "triage",
  },
  {
    number: "05",
    label: "Validate",
    phase: "Prove",
    title: "Test reality, safely.",
    command: "/validate-findings",
    description:
      "On targets you authorize, scope guards and positive controls govern live probes. Traust can confirm exploit paths, expose attack chains, or mark weak refutations inconclusive.",
    output: "Execution evidence outranks static opinion, while human review governs consequential dismissals and overrides.",
    icon: "validate",
  },
  {
    number: "06",
    label: "Fuzz",
    phase: "Explore",
    title: "Turn uncertainty into a test.",
    command: "/create-fuzzing",
    description:
      "Traust generates offline fuzz harnesses for parser, decoder, and templating surfaces, including claims previously dismissed as false positives. Crashers re-enter the same evidence pipeline.",
    output: "Repeatable harnesses and follow-up findings make refutations falsifiable instead of final by assumption.",
    icon: "fuzz",
  },
  {
    number: "07",
    label: "Remediate",
    phase: "Close",
    title: "Remediate. Then verify.",
    command: "/remediate-finding → /verify-remediation",
    description:
      "Generate reviewable patches, run the repository’s own checks in containment, and re-audit the original claim against patched code. Fleet transforms address repeated patterns at scale.",
    output: "A fix closes only when evidence says the weakness is resolved without introducing a regression.",
    icon: "remediate",
  },
  {
    number: "08",
    label: "Package",
    phase: "Explain",
    title: "Make the evidence usable.",
    command: "/generate-team-report",
    description:
      "Traust assembles component reports, cumulative dispositions, and executive views into self-contained packages. Standards-based SARIF carries results into existing security tooling.",
    output: "Every audience gets the right projection while the underlying contracts remain consistent and traceable.",
    icon: "audit",
  },
  {
    number: "09",
    label: "Deliver",
    phase: "Route",
    title: "Put findings where work happens.",
    command: "owners · notifications · defects",
    description:
      "Route findings to accountable owners and connect the evidence to the collaboration and defect systems teams already use. Delivery stays downstream of validated, packaged results.",
    output: "Clear ownership turns security evidence into prioritized engineering work, while change-driven scans keep the answer current.",
    icon: "deliver",
  },
];

const renderPipelineNode = (stage, index) => `
  <button
    class="pipeline-stage${index === 0 ? " is-active" : ""}"
    type="button"
    role="tab"
    id="pipeline-stage-${index}"
    aria-controls="workflow-stage-panel"
    aria-selected="${index === 0}"
    tabindex="${index === 0 ? 0 : -1}"
    data-stage-index="${index}"
  >
    <span class="pipeline-number">${stage.number}</span>
    <span class="pipeline-node" aria-hidden="true"><i></i></span>
    <span class="pipeline-label">${stage.label}</span>
  </button>`;

const renderStageDetail = (stage) => `
  <div class="pipeline-detail-copy">
    <div class="stage-kicker"><span>${stage.number}</span>${stage.phase}</div>
    <h3>${stage.title}</h3>
    <p>${stage.description}</p>
    <p class="stage-output"><span>Output</span>${stage.output}</p>
    <code>${stage.command}</code>
  </div>
  <div class="pipeline-detail-visual" aria-hidden="true">
    <div class="visual-grid"></div>
    ${stageIcons[stage.icon]}
    <span class="visual-label">${stage.label.toLowerCase()} / ${stage.number}</span>
  </div>`;

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="noise" aria-hidden="true"></div>
  ${navHtml({ logo: logoUrl })}

  <main id="main">
    <header class="hero" id="top">
      <div class="hero-eyebrow reveal">Open source · Apache 2.0 · built for the full security lifecycle</div>
      <h1 class="hero-title reveal">
        <span>Traust is</span>
        <span class="flip-window" aria-live="polite">
          <span class="flip-text">skills</span>
        </span>
      </h1>
      <p class="hero-deck reveal">
        A security workflow your models can run, from understanding the estate to proving the fix.
        Bring your agents, scanners, and engineering systems. Traust connects the work and preserves the evidence.
      </p>
      <div class="hero-actions reveal">
        <a class="button button-primary" href="${quickstartUrl}">Start the quickstart ${arrowIcon}</a>
        <a class="button button-secondary" href="#workflow">Explore the workflow <span aria-hidden="true">↓</span></a>
      </div>
      <div class="hero-facts reveal" aria-label="Traust highlights">
        <div><strong>51</strong><span>composable skills</span></div>
        <div><strong>09</strong><span>connected stages</span></div>
        <div><strong>01</strong><span>evidence stream</span></div>
        <div><strong>∞</strong><span>model possibilities</span></div>
      </div>
    </header>

    <section class="workflow-section" id="workflow" aria-labelledby="workflow-heading">
      <div class="workflow-intro">
        <span class="section-label reveal">The Traust workflow</span>
        <h2 id="workflow-heading" class="reveal">Security is not a scan.<br /><em>It is a chain of decisions.</em></h2>
        <p class="reveal">Select a stage to follow the evidence from portfolio inventory to accountable delivery.</p>
      </div>
      <div class="pipeline-shell reveal">
        <div class="pipeline-scroll" aria-label="Nine-stage Traust workflow">
          <div class="pipeline-tabs" role="tablist" aria-label="Workflow stages">
            ${stages.map(renderPipelineNode).join("")}
          </div>
        </div>
        <div
          class="pipeline-detail"
          id="workflow-stage-panel"
          role="tabpanel"
          aria-labelledby="pipeline-stage-0"
          tabindex="0"
        >
          ${renderStageDetail(stages[0])}
        </div>
        <div class="pipeline-hint"><span>Click a node to inspect the stage</span><span>Arrow keys move through the pipeline</span></div>
        <aside class="evidence-spine reveal" aria-labelledby="evidence-spine-heading">
          <div class="evidence-spine-copy">
            <span class="section-label">One continuous record</span>
            <h3 id="evidence-spine-heading">The workflow remembers.</h3>
            <p>Every judgment adds evidence without erasing what came before.</p>
          </div>
          <ol class="evidence-rail" aria-label="Example finding event history">
            <li>
              <span class="evidence-node dot-open" aria-hidden="true"></span>
              <strong>Finding created</strong>
              <span>static analysis</span>
              <small>open</small>
            </li>
            <li>
              <span class="evidence-node dot-warn" aria-hidden="true"></span>
              <strong>Claim triaged</strong>
              <span>cited review</span>
              <small>confirmed</small>
            </li>
            <li>
              <span class="evidence-node dot-live" aria-hidden="true"></span>
              <strong>Exploit reproduced</strong>
              <span>execution</span>
              <small>confirmed</small>
            </li>
            <li>
              <span class="evidence-node dot-fix" aria-hidden="true"></span>
              <strong>Patch verified</strong>
              <span>re-audit</span>
              <small>resolved</small>
            </li>
          </ol>
        </aside>
      </div>
    </section>

    <section class="platform" id="platform" aria-labelledby="platform-heading">
      <div class="platform-heading reveal">
        <span class="section-label">More than a harness</span>
        <h2 id="platform-heading">A workflow needs connective tissue.</h2>
        <p>Use the full system or integrate only the surfaces you need. Each component is separately versioned and built around the same security lifecycle.</p>
      </div>

      <div class="platform-accordion reveal">
        <article class="platform-item is-open">
          <h3 class="platform-trigger-heading">
            <button
              class="platform-trigger"
              id="platform-trigger-sdk"
              type="button"
              aria-expanded="true"
              aria-controls="platform-panel-sdk"
              aria-label="01 / SDK: Bring Traust into your systems"
            >
              <span class="platform-number">01</span>
              <span class="platform-name">SDK</span>
              <span class="platform-summary">Bring Traust into your systems.</span>
              <span class="platform-toggle" aria-hidden="true"><i></i></span>
            </button>
          </h3>
          <div class="platform-panel" id="platform-panel-sdk" role="region" aria-labelledby="platform-trigger-sdk">
            <div class="platform-panel-inner">
              <div class="platform-copy">
                <p>A typed Go SDK for invoking skills, dispatching asynchronous work, submitting human and machine decisions, and querying findings and integrity.</p>
                <a href="https://github.com/traust-security/traust-sdk">Explore the SDK ${arrowIcon}</a>
              </div>
              <div class="code-card" aria-label="Go SDK example">
                <div class="code-card-bar"><span>audit.go</span><span>Go</span></div>
                <pre><code><span class="code-key">report</span>, err := skills.Scan.Run(
  ctx, provider,
  skills.ScanInput{
    Repo: <span class="code-string">"github.com/acme/payments"</span>,
    Ref:  <span class="code-string">"main"</span>,
  },
)

<span class="code-key">for</span> _, finding := <span class="code-key">range</span> report.Findings {
  queue.Submit(finding)
}</code></pre>
              </div>
            </div>
          </div>
        </article>

        <article class="platform-item">
          <h3 class="platform-trigger-heading">
            <button
              class="platform-trigger"
              id="platform-trigger-contracts"
              type="button"
              aria-expanded="false"
              aria-controls="platform-panel-contracts"
              aria-label="02 / Contracts: Keep every handoff understood"
            >
              <span class="platform-number">02</span>
              <span class="platform-name">Contracts</span>
              <span class="platform-summary">Keep every handoff understood.</span>
              <span class="platform-toggle" aria-hidden="true"><i></i></span>
            </button>
          </h3>
          <div class="platform-panel" id="platform-panel-contracts" role="region" aria-labelledby="platform-trigger-contracts" hidden>
            <div class="platform-panel-inner">
              <div class="platform-copy">
                <p>Versioned schemas, controlled vocabularies, and typed models define findings from discovery through remediation. Add your own tooling without inventing another translation layer.</p>
                <a href="https://github.com/traust-security/traust-contracts">Explore Contracts ${arrowIcon}</a>
              </div>
              <div class="schema-card" aria-label="Contract relationship diagram">
                <div class="schema-node schema-source">scanner<span>adapter result</span></div>
                <div class="schema-arrow">→</div>
                <div class="schema-node schema-core">finding<span>contract v1</span></div>
                <div class="schema-arrow">→</div>
                <div class="schema-stack"><span>triage</span><span>validation</span><span>remediation</span></div>
              </div>
            </div>
          </div>
        </article>

        <article class="platform-item">
          <h3 class="platform-trigger-heading">
            <button
              class="platform-trigger"
              id="platform-trigger-ledger"
              type="button"
              aria-expanded="false"
              aria-controls="platform-panel-ledger"
              aria-label="03 / Ledger: Preserve why the answer changed"
            >
              <span class="platform-number">03</span>
              <span class="platform-name">Ledger</span>
              <span class="platform-summary">Preserve why the answer changed.</span>
              <span class="platform-toggle" aria-hidden="true"><i></i></span>
            </button>
          </h3>
          <div class="platform-panel" id="platform-panel-ledger" role="region" aria-labelledby="platform-trigger-ledger" hidden>
            <div class="platform-panel-inner">
              <div class="platform-copy">
                <p>An authenticated, append-oriented finding decision ledger with deterministic correlation, replayable state, Merkle tamper detection, and optional Cosign or Sigstore attestation.</p>
                <a href="https://github.com/traust-security/traust-ledger">Explore the Ledger ${arrowIcon}</a>
              </div>
              <div class="ledger-card" aria-label="Ledger chain illustration">
                <div class="ledger-root"><span>MERKLE ROOT</span><strong>5c82…9af1</strong></div>
                <div class="ledger-chain">
                  <span><i>01</i>audit</span><span><i>02</i>triage</span><span><i>03</i>proof</span><span><i>04</i>fix</span>
                </div>
                <div class="ledger-proof"><span>✓</span> event sequence verified</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="final-cta" aria-labelledby="final-heading">
      <div class="final-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
      <img class="final-logo" src="${logoUrl}" alt="" aria-hidden="true" />
      <span class="section-label reveal">The workflow is open</span>
      <h2 id="final-heading" class="reveal">Give your models<br /><em>something to trust.</em></h2>
      <p class="reveal">Start with one repository. Keep the evidence for every one after it.</p>
      <div class="hero-actions reveal">
        <a class="button button-primary" href="${quickstartUrl}">Start the quickstart ${arrowIcon}</a>
        <a class="button button-secondary-light" href="${repositoryUrl}">${githubIcon} View on GitHub</a>
      </div>
    </section>
  </main>

  ${footerHtml({ logo: logoUrl })}
`;

const flipWords = ["skills", "agents", "scripts", "scanners", "more than a harness"];
const flipText = document.querySelector(".flip-text");
let flipIndex = 0;

const advanceFlip = () => {
  if (flipIndex >= flipWords.length - 1) {
    flipText.closest(".flip-window").classList.add("flip-settled");
    return;
  }

  flipText.classList.add("flip-out");
  window.setTimeout(() => {
    flipIndex += 1;
    flipText.textContent = flipWords[flipIndex];
    flipText.classList.remove("flip-out");
    flipText.classList.add("flip-in");
    window.setTimeout(() => flipText.classList.remove("flip-in"), 250);
    window.setTimeout(advanceFlip, flipIndex === flipWords.length - 1 ? 900 : 430);
  }, 210);
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (reduceMotion.matches) {
  flipText.textContent = flipWords.at(-1);
  flipText.closest(".flip-window").classList.add("flip-settled");
} else {
  window.setTimeout(advanceFlip, 700);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const pipelineTabs = [...document.querySelectorAll(".pipeline-stage")];
const pipelinePanel = document.querySelector("#workflow-stage-panel");
let stageTransitionTimer;

const activateStage = (index, focus = false) => {
  const nextIndex = (index + stages.length) % stages.length;
  const nextTab = pipelineTabs[nextIndex];

  for (const [tabIndex, tab] of pipelineTabs.entries()) {
    const isActive = tabIndex === nextIndex;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  }

  window.clearTimeout(stageTransitionTimer);
  pipelinePanel.classList.add("is-changing");
  stageTransitionTimer = window.setTimeout(() => {
    pipelinePanel.innerHTML = renderStageDetail(stages[nextIndex]);
    pipelinePanel.setAttribute("aria-labelledby", nextTab.id);
    pipelinePanel.classList.remove("is-changing");
  }, reduceMotion.matches ? 0 : 120);

  nextTab.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
  if (focus) nextTab.focus();
};

pipelineTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateStage(index));
  tab.addEventListener("keydown", (event) => {
    const keyTargets = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: stages.length - 1,
    };

    if (Object.hasOwn(keyTargets, event.key)) {
      event.preventDefault();
      activateStage(keyTargets[event.key], true);
    }
  });
});

const platformItems = [...document.querySelectorAll(".platform-item")];

const setPlatformItem = (item, open) => {
  const trigger = item.querySelector(".platform-trigger");
  const panel = item.querySelector(".platform-panel");
  item.classList.toggle("is-open", open);
  trigger.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
};

platformItems.forEach((item) => {
  const trigger = item.querySelector(".platform-trigger");
  trigger.addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");
    platformItems.forEach((candidate) => setPlatformItem(candidate, candidate === item && willOpen));
  });
});

const nav = document.querySelector(".site-nav");
const updateNav = () => nav.classList.toggle("nav-scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();
