export const repositoryUrl = "https://github.com/traust-security/traust";
export const docsUrl = "/docs/";
export const quickstartUrl = "/docs/getting-started/";

export const githubIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.4 11.4 0 0 0 12 .8Z"/>
  </svg>`;

// `home` is where the wordmark and in-page anchors resolve: "" on the landing page, "/" elsewhere.
export const navHtml = ({ logo, home = "", current = "" }) => `
  <nav class="site-nav" aria-label="Primary navigation">
    <a class="wordmark" href="${home || "#top"}" aria-label="Traust home">
      <img class="wordmark-logo" src="${logo}" alt="" />
      <span>traust</span>
    </a>
    <div class="nav-links">
      <a href="${home}#workflow">Workflow</a>
      <a href="${home}#platform">Platform</a>
      <a href="${docsUrl}"${current === "docs" ? ' aria-current="page"' : ""}>Docs</a>
    </div>
    <a class="github-link" href="${repositoryUrl}" aria-label="Traust on GitHub">
      ${githubIcon}<span>GitHub</span>
    </a>
  </nav>`;

export const footerHtml = ({ logo, home = "" }) => `
  <footer class="site-footer">
    <a class="wordmark footer-wordmark" href="${home || "#top"}"><img class="wordmark-logo" src="${logo}" alt="" /><span>traust</span></a>
    <p>Security assessment as a continuous, evidence-led workflow.</p>
    <div><a href="${docsUrl}">Docs</a><a href="${repositoryUrl}">GitHub</a><span>Apache 2.0</span><span>v0.1.1</span></div>
  </footer>`;
