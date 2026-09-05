# Zuzanna Sobecka — AI Product Portfolio

Portfolio presenting selected AI products through decisions, trade-offs and verified evidence rather than screenshots alone. It is built for hiring teams, collaborators and clients—not as a production interface for the featured products.

[View the live portfolio](https://zuzanna-sobecka-ai.zusobecka.workers.dev).

## Featured work

- **Menma** — a local AI storytelling system for persistent multi-character worlds.
- **Vile** — a local-first founder intelligence and relationship workspace.
- **Orion** — a desktop mission-control workspace for resuming complex AI projects.
- Supporting systems: Vile for LinkedIn, Raptor and Akasha.

## Technology

Next.js 16, React 19, TypeScript and Tailwind CSS, statically exported to Cloudflare Static Assets. A small Cloudflare Worker validates contact messages, stores them privately in D1 and delivers them through Resend.

## Local development

Requires Node.js 22.13–22.x. The current Next.js ESLint toolchain can stall on Windows under Node 24.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run check
```

This runs strict ESLint validation, Worker tests, TypeScript validation and a production build. GitHub Actions also runs `npm audit` for every pull request and push to `main`.

## Deployment

Releases are manual. From an up-to-date `main`, run:

```bash
npm run cf:deploy
```

The command runs all checks, applies pending D1 migrations, then deploys the Worker and generated `out` assets. Review unread messages with `npm run cf:messages` or in Cloudflare.

Before the first deployment, configure the private recipient and Resend API key:

```bash
npx wrangler secret put CONTACT_RECIPIENT
npx wrangler secret put RESEND_API_KEY
```

The Worker sends from `Zuzanna Sobecka Portfolio <onboarding@resend.dev>` to `CONTACT_RECIPIENT`, with the visitor's address as `Reply-To`. Resend's testing sender can deliver only to the address associated with its account.

The Workers URL is the default base for social-preview metadata. Set `SITE_URL` at build time only when using another domain.

## Privacy

The site has no analytics, application cookies or exposed private email address. Contact submissions are stored privately in D1, forwarded through Resend and deleted by a daily Cron Trigger after 90 days. The public privacy notice explains this processing.

Secrets, message contents, environment files, exports and private product data must remain outside Git; `.gitignore` excludes the relevant local paths and file types.

## Scope and limitations

- Project descriptions summarize selected work; they are not source releases of the featured private products.
- Contact delivery requires the D1 binding, applied migrations and both Worker secrets. With `onboarding@resend.dev`, the recipient must match the Resend account address.
- The only server-side surface is the contact Worker; there are no user accounts, public database access or committed runtime secrets.

See [CODEBASE.md](CODEBASE.md) for the structure, [WORKFLOW-DIAGRAM.md](WORKFLOW-DIAGRAM.md) for the release flow and [AGENTS.md](AGENTS.md) for contribution safeguards.

## Licence

Released under the [MIT Licence](LICENCE.md).
