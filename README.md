# Zuzanna Sobecka — AI Product Portfolio

Personal portfolio presenting selected AI products through product decisions, trade-offs and verified evidence rather than screenshots alone.

Its audience is hiring teams, collaborators and clients who want a concise, evidence-based view of the work. It is a presentation site, not a production interface for the featured products.

## Featured work

- **Menma** — a local AI storytelling system for persistent multi-character worlds.
- **Vile** — a local-first founder intelligence and relationship workspace.
- **Orion** — a desktop mission-control workspace for resuming complex AI projects.
- Supporting systems: Vile for LinkedIn, Raptor and Akasha.

## Technology

Next.js 16, React 19, TypeScript, Tailwind CSS and a small Cloudflare Worker. The site is statically exported to Cloudflare Static Assets; contact messages are validated by the Worker and stored privately in D1.

## Local development

Requirements: Node.js 22.13–22.x. Node 24 is not used because the current Next.js ESLint toolchain can stall while loading its configuration on Windows.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run check
```

This runs the strict ESLint check, Worker behavior tests, production build and TypeScript validation. GitHub Actions runs `npm audit` and the same code check for every pull request and push to `main`.

## Deployment

Cloudflare Workers publishes the generated `out` directory as Static Assets. Deploy with:

```bash
npm run cf:deploy
```

The command runs the complete quality check, applies pending D1 migrations and deploys the Worker with its static assets. Successful form submissions redirect to `/thanks`; messages can be reviewed with `npm run cf:messages` or in the Cloudflare dashboard.

The deployed Workers address is the default base for absolute social-preview metadata. Set `SITE_URL` while building only when deploying the portfolio under a different custom domain.

## Privacy

The site displays only portfolio copy, project artwork and intentionally public GitHub and LinkedIn links. It does not expose a private email address, use analytics or place application cookies. A submitted contact message is stored in a private Cloudflare D1 database and is never committed to this repository.

Do not commit environment files, credentials, lead exports or private product data; relevant paths and file types are excluded in `.gitignore`. Run `npm audit` and `npm run check` before a public release.

## Scope and limitations

- Project descriptions summarize selected work; they are not source releases of the featured private products.
- Contact-form delivery depends on the Cloudflare D1 binding and migration being present in the deployed Worker.
- The repository contains only the small contact endpoint described above—no user accounts, public database access or secret runtime configuration.

See [CODEBASE.md](CODEBASE.md) for the structure, [WORKFLOW-DIAGRAM.md](WORKFLOW-DIAGRAM.md) for the release flow and [AGENTS.md](AGENTS.md) for contribution safeguards.

## Licence

Released under the [MIT Licence](LICENCE.md).
