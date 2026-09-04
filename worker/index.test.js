import assert from 'node:assert/strict';
import test from 'node:test';

import worker, { handleContact, validateContact } from './index.js';

function formRequest(fields, headers = {}) {
  return new Request('https://portfolio.example/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://portfolio.example',
      ...headers,
    },
    body: new URLSearchParams(fields),
  });
}

function createEnv({ databaseFails = false, rateLimitAllows = true } = {}) {
  const saved = [];
  return {
    saved,
    env: {
      CONTACT_RATE_LIMITER: {
        limit: async () => ({ success: rateLimitAllows }),
      },
      CONTACT_DB: {
        prepare: () => ({
          bind: (...values) => ({
            run: async () => {
              if (databaseFails) throw new Error('D1 unavailable');
              saved.push(values);
            },
          }),
        }),
      },
      ASSETS: {
        fetch: async () => new Response('asset'),
      },
    },
  };
}

test('validates and normalizes valid contact details', () => {
  const values = new URLSearchParams({
    name: '  Ada Lovelace ',
    email: ' ADA@EXAMPLE.COM ',
    message: ' I would like to discuss a role. ',
  });

  assert.deepEqual(validateContact(values), {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to discuss a role.',
  });
});

test('rejects missing or invalid contact details', () => {
  assert.equal(validateContact(new URLSearchParams()), null);
  assert.equal(validateContact(new URLSearchParams({ name: 'A', email: 'bad', message: 'short' })), null);
});

test('stores a valid message and redirects to the thank-you page', async () => {
  const { env, saved } = createEnv();
  const response = await handleContact(formRequest({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to discuss a role.',
  }), env);

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), 'https://portfolio.example/thanks');
  assert.equal(saved.length, 1);
  assert.equal(saved[0][1], 'Ada Lovelace');
  assert.equal(saved[0][2], 'ada@example.com');
});

test('silently accepts honeypot submissions without storing them', async () => {
  const { env, saved } = createEnv();
  const response = await handleContact(formRequest({
    name: 'Spam Bot',
    email: 'spam@example.com',
    message: 'This looks valid but is automated.',
    'company-website': 'https://spam.example',
  }), env);

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), 'https://portfolio.example/thanks');
  assert.equal(saved.length, 0);
});

test('rejects cross-origin submissions', async () => {
  const { env } = createEnv();
  const response = await handleContact(formRequest({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to discuss a role.',
  }, { Origin: 'https://attacker.example' }), env);

  assert.equal(response.status, 403);
});

test('returns a retry response when the sender exceeds the rate limit', async () => {
  const { env } = createEnv({ rateLimitAllows: false });
  const response = await handleContact(formRequest({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to discuss a role.',
  }), env);

  assert.equal(response.status, 429);
});

test('rejects an oversized submission before storing it', async () => {
  const { env, saved } = createEnv();
  const response = await handleContact(formRequest({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'x'.repeat(17_000),
  }), env);

  assert.equal(response.status, 413);
  assert.equal(saved.length, 0);
});

test('redirects to a safe error page when D1 storage fails', async () => {
  const { env } = createEnv({ databaseFails: true });
  const originalConsoleError = console.error;
  console.error = () => {};
  let response;
  try {
    response = await handleContact(formRequest({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I would like to discuss a role.',
    }), env);
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), 'https://portfolio.example/contact-error');
});

test('serves static assets for non-contact requests', async () => {
  const { env } = createEnv();
  const response = await worker.fetch(new Request('https://portfolio.example/'), env);

  assert.equal(await response.text(), 'asset');
});

test('rejects non-POST requests to the contact endpoint', async () => {
  const { env } = createEnv();
  const response = await worker.fetch(new Request('https://portfolio.example/contact'), env);

  assert.equal(response.status, 405);
});
