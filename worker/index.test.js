import assert from 'node:assert/strict';
import test from 'node:test';

import worker, { deleteExpiredMessages, handleContact, validateContact } from './index.js';

function formRequest(fields, headers = {}) {
  return new Request('https://portfolio.example/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://portfolio.example',
      ...headers,
    },
    body: new URLSearchParams(fields),
  });
}

function createEnv({ databaseFails = false, emailFails = false, rateLimitAllows = true } = {}) {
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
      CONTACT_RECIPIENT: 'owner@example.com',
      RESEND_API_KEY: 're_test_key',
      RESEND_FETCH: async (url, options) => {
        if (emailFails) return new Response('Email service unavailable', { status: 503 });
        saved.push({ email: { url, options, body: JSON.parse(options.body) } });
        return new Response(JSON.stringify({ id: 'email-id' }), { status: 200 });
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
  assert.equal(saved.length, 2);
  assert.equal(saved[0][1], 'Ada Lovelace');
  assert.equal(saved[0][2], 'ada@example.com');
  assert.equal(saved[1].email.body.reply_to, 'ada@example.com');
  assert.equal(saved[1].email.body.from, 'Zuzanna Sobecka Portfolio <onboarding@resend.dev>');
  assert.deepEqual(saved[1].email.body.to, ['owner@example.com']);
  assert.match(saved[1].email.body.text, /I would like to discuss a role/);
  assert.equal(saved[1].email.options.headers.Authorization, 'Bearer re_test_key');
});

test('returns a safe error page when email delivery fails', async () => {
  const { env, saved } = createEnv({ emailFails: true });
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
  assert.equal(saved.length, 1);
});

test('returns a safe error page when Resend is not configured', async () => {
  const { env } = createEnv();
  delete env.RESEND_API_KEY;
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
  const response = await worker.fetch(new Request('https://portfolio.example/api/contact'), env);

  assert.equal(response.status, 405);
});

test('scheduled cleanup deletes messages older than 90 days', async () => {
  const calls = [];
  const env = {
    CONTACT_DB: {
      prepare: (query) => ({
        bind: (...values) => ({
          run: async () => {
            calls.push({ query, values });
            return { success: true };
          },
        }),
      }),
    },
  };

  await deleteExpiredMessages(env, new Date('2026-09-04T12:00:00.000Z'));

  assert.deepEqual(calls, [{
    query: 'DELETE FROM contact_messages WHERE created_at < ?',
    values: ['2026-06-06T12:00:00.000Z'],
  }]);
});

test('scheduled handler uses the Cloudflare event time for cleanup', async () => {
  const cutoffs = [];
  const env = {
    CONTACT_DB: {
      prepare: () => ({
        bind: (cutoff) => ({
          run: async () => cutoffs.push(cutoff),
        }),
      }),
    },
  };

  await worker.scheduled({ scheduledTime: Date.parse('2026-09-04T12:00:00.000Z') }, env);

  assert.deepEqual(cutoffs, ['2026-06-06T12:00:00.000Z']);
});
