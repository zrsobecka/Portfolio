# Contributor instructions

- Keep the frontend statically exported; expand the contact Worker or add tracking only after an explicit product decision.
- Never commit secrets, env files, private contact/customer data, exports, local deployment state, or personal emails.
- Assume `public/`, page copy and Git history are public.
- Preserve keyboard focus, semantic headings, readable contrast and 44 px touch targets.
- Keep changes small and evidence-focused.
- Before commit, inspect staged files; run `npm audit`, `npm run check` and `git diff --check`.
- Use a GitHub noreply email for commits.
