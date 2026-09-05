# Codebase guide

## Structure

- `app/` — portfolio page, metadata, styles and static form outcome/privacy pages.
- `worker/` — the Cloudflare Worker endpoint and its behavior tests.
- `migrations/` — the versioned D1 schema for private contact messages.
- `public/` — intentionally public artwork, the social-preview image and security headers.
- `next.config.ts` — static-export configuration.
- `wrangler.jsonc` — Worker, Static Assets, D1, Cron and rate-limit configuration.

## Runtime and data flow

Next.js exports the frontend to `out/`; Cloudflare serves it as Static Assets. Only `POST /api/contact` enters the Worker, which validates and rate-limits the request, writes it to private D1, then calls Resend. Writing first preserves the message if delivery fails. Valid requests redirect to `/thanks`; storage or delivery failures redirect to `/contact-error`. A daily Cron Trigger removes submissions older than 90 days. No application secret reaches the browser.

## Quality gates

`npm run check` runs ESLint, Worker tests, TypeScript validation and the production build. `npm audit` checks installed dependencies. GitHub Actions enforces both on pull requests and pushes to `main`; Dependabot proposes weekly updates.
