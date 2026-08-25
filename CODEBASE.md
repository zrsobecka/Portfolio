# Codebase guide

## Structure

- `app/page.tsx` — the single portfolio page, project case studies and Netlify contact form.
- `app/layout.tsx` — document metadata and social-preview configuration.
- `app/globals.css` — visual system, responsive layout and interaction states.
- `app/thanks/` — static confirmation page shown after a successful form submission.
- `public/` — intentionally public project artwork and the social-preview image.
- `next.config.ts` — static-export configuration.
- `netlify.toml` — Netlify build and publish settings.

## Runtime and data flow

Next.js renders the site to static files in `out/`. The browser receives no application secrets and calls no custom backend. Netlify detects the HTML form during deployment, stores submitted form data in the site owner's Netlify account and redirects the visitor to `/thanks`.

## Quality gates

`npm run check` runs strict ESLint validation and a production build, which also validates TypeScript. `npm audit` checks installed dependency versions against npm's vulnerability database.
