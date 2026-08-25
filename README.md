# Zuzanna Sobecka — AI Product Portfolio

Personal portfolio presenting selected AI products through product decisions, trade-offs and verified evidence rather than screenshots alone.

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

This runs the strict ESLint check followed by the production build and TypeScript validation.

## Deployment

Netlify builds the site with `npm run build` and publishes the generated `out` directory. The contact form uses Netlify Forms and redirects successful submissions to `/thanks`.

The production URL is intentionally not hard-coded. Netlify provides it through the `URL` build variable, which is also used to generate absolute social-preview metadata.

## Privacy

The public site does not expose a private email address. Do not commit environment files, credentials, lead exports or private product data; relevant paths and file types are excluded in `.gitignore`.
