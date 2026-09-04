# Codebase guide

## Structure

- `app/page.tsx` — the single portfolio page, project case studies and contact form.
- `app/layout.tsx` — document metadata and social-preview configuration.
- `app/globals.css` — visual system, responsive layout and interaction states.
- `app/thanks/` — static confirmation page shown after a successful form submission.
- `app/contact-error/` — static recovery page shown if a message cannot be stored.
- `worker/` — the Cloudflare Worker endpoint and its behavior tests.
- `migrations/` — the versioned D1 schema for private contact messages.
- `public/` — intentionally public artwork, the social-preview image and security headers.
- `next.config.ts` — static-export configuration.
- `wrangler.jsonc` — Cloudflare Workers, Static Assets, D1 and rate-limit bindings.

## Runtime and data flow

Next.js renders the site to static files in `out/`, which Cloudflare serves as Static Assets. A `POST /contact` request runs the Worker, validates and rate-limits the submission, and stores accepted messages in the private D1 database. The browser receives no application secrets. Valid submissions redirect to `/thanks`; storage failures redirect to `/contact-error`.

## Quality gates

`npm run check` runs strict ESLint validation, Worker behavior tests and a production build, which also validates TypeScript. `npm audit` checks installed dependency versions against npm's vulnerability database. GitHub Actions enforces both checks for pull requests and pushes to `main`; and Dependabot proposes weekly dependency updates.
