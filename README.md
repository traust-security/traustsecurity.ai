# Traust website

The landing page for [Traust](https://github.com/traust-security/traust), an open source security workflow that connects discovery, triage, validation, remediation, verification, and continuous operation.

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer
- npm 10 or newer
- GNU Make, optional but recommended

## Get started

Clone the repository, install the locked dependencies, and start the development server:

```bash
git clone git@github.com:gurnben/traust-website.git
cd traust-website
make dev
```

The site will be available at <http://localhost:5173>. The development server listens on all interfaces and reloads when source files change.

Without Make, run:

```bash
npm ci
npm run dev
```

## Common commands

| Command | Purpose |
| --- | --- |
| `make install` | Install the exact dependencies from `package-lock.json` |
| `make dev` | Install dependencies and start the development server |
| `make test` | Run content and structure tests |
| `make build` | Create the production site in `dist/` |
| `make preview` | Build and serve the production output locally |
| `make check` | Run the tests and production build used to verify changes |
| `make clean` | Remove generated output and installed dependencies |
| `make help` | List available Make targets |

Set a different port when needed:

```bash
make dev PORT=4173
```

## Project structure

```text
index.html             Page metadata and application mount point
src/main.js            Page content, workflow data, SVG illustrations, and behavior
src/styles.css         Layout, visual system, responsive styles, and motion
src/chrome.js          Shared nav and footer markup (landing page and docs)
src/docs/              Markdown documentation, rendered to /docs/ at build time
src/docs.css, src/docs-entry.js  Docs page styles and entry script
tools/docs-plugin.js   Vite plugin: markdown to static HTML, sidebar, sitemap, robots.txt
src/logo.svg           Adapted Traust brand mark
tests/content.test.js  Content and structural regression checks
tests/docs.test.js     Docs build, link and anchor checks
dist/                  Generated production output
```

## Contributing

1. Create a branch from `main`.
2. Keep product claims consistent with the current Traust implementation.
3. Preserve keyboard navigation, responsive layouts, and reduced-motion behavior.
4. Run `make check` before opening a pull request.
5. Do not commit `node_modules/`, `dist/`, or browser test artifacts.

The site uses plain JavaScript and CSS with [Vite](https://vite.dev/) for development and production builds. Fonts are bundled through Fontsource, so production pages do not depend on Google Fonts.

## License

Licensed under the [Apache License 2.0](LICENSE).
