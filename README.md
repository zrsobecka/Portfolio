# Zuzanna Sobecka — AI Product Portfolio

Personal portfolio presenting selected AI products through product decisions, trade-offs and verified evidence rather than screenshots alone.

Its audience is hiring teams, collaborators and clients who want a concise, evidence-based view of the work. It is a presentation site, not a production interface for the featured products.

## Featured work

- **Menma** — a local AI storytelling system for persistent multi-character worlds.
- **Vile** — a local-first founder intelligence and relationship workspace.
- **Orion** — a desktop mission-control workspace for resuming complex AI projects.
- Supporting systems: Vile for LinkedIn, Raptor and Akasha.

## Technology

Next.js 16, React 19, TypeScript and Tailwind CSS. The site is statically exported and configured for Netlify.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run check
```

This runs the strict ESLint check followed by the production build and TypeScript validation. GitHub Actions runs `npm audit` and the same code check for every pull request and push to `main`.

## Deployment

Pushes to `main` trigger GitHub CI and an automatic Netlify build. Netlify publishes the generated `out` directory only after `npm audit` and the full code check pass. The contact form uses Netlify Forms and redirects successful submissions to `/thanks`.

The production URL is intentionally not hard-coded. Netlify provides it through the `URL` build variable, which is also used to generate absolute social-preview metadata.

## Privacy

The site displays only portfolio copy, project artwork and intentionally public GitHub and LinkedIn links. It does not expose a private email address, use analytics or place application cookies. A submitted contact message is handled by Netlify Forms under the deployment owner's Netlify account.

Do not commit environment files, credentials, lead exports or private product data; relevant paths and file types are excluded in `.gitignore`. Run `npm audit` and `npm run check` before a public release.

## Scope and limitations

- Project descriptions summarize selected work; they are not source releases of the featured private products.
- Contact-form delivery depends on Netlify Forms being enabled for the deployed site.
- The repository contains no backend, user accounts, database or secret runtime configuration.

See [CODEBASE.md](CODEBASE.md) for the structure, [WORKFLOW-DIAGRAM.md](WORKFLOW-DIAGRAM.md) for the release flow and [AGENTS.md](AGENTS.md) for contribution safeguards.

## Licence

Released under the [MIT Licence](LICENCE.md).
