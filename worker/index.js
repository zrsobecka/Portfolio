const MAX_BODY_BYTES = 16_384;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function redirect(request, pathname) {
  return Response.redirect(new URL(pathname, request.url), 303);
}

function textResponse(message, status) {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export function validateContact(values) {
  const name = values.get('name')?.trim() ?? '';
  const email = values.get('email')?.trim().toLowerCase() ?? '';
  const message = values.get('message')?.trim() ?? '';

  if (name.length < 2 || name.length > 100) return null;
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  if (message.length < 10 || message.length > 4000) return null;

  return { name, email, message };
}

export async function handleContact(request, env) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (origin !== requestUrl.origin) {
    return textResponse('Invalid form origin.', 403);
  }

  const contentType = request.headers.get('Content-Type') ?? '';
  if (!contentType.startsWith('application/x-www-form-urlencoded')) {
    return textResponse('Unsupported form format.', 415);
  }

  const declaredLength = Number(request.headers.get('Content-Length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return textResponse('Form submission is too large.', 413);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    return textResponse('Form submission is too large.', 413);
  }

  const values = new URLSearchParams(body);
  if (values.get('company-website')) {
    return redirect(request, '/thanks');
  }

  const contact = validateContact(values);
  if (!contact) {
    return textResponse('Please provide a valid name, email and message.', 400);
  }

  const rateLimit = await env.CONTACT_RATE_LIMITER.limit({ key: contact.email });
  if (!rateLimit.success) {
    return textResponse('Too many messages. Please try again in a minute.', 429);
  }

  try {
    await env.CONTACT_DB.prepare(
      `INSERT INTO contact_messages (id, name, email, message, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(crypto.randomUUID(), contact.name, contact.email, contact.message, new Date().toISOString())
      .run();
  } catch (error) {
    console.error('Contact form storage failed', error);
    return redirect(request, '/contact-error');
  }

  return redirect(request, '/thanks');
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/contact') {
      if (request.method !== 'POST') {
        return textResponse('Method not allowed.', 405);
      }
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
