import { NextRequest, NextResponse } from 'next/server';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

// Model identifier format: alphanumeric, dots, dashes, underscores, slashes (1-100 chars)
// Supports all available models on Groq dynamically (e.g. Llama 3.3, DeepSeek R1 Distill, Qwen, GPT-OSS)
const SAFE_MODEL_REGEX = /^[a-zA-Z0-9._\-/]{1,100}$/;
const ALLOWED_ROLES = new Set(['user', 'assistant', 'system']);

// In-memory sliding window rate limiter (max 20 requests/min per IP)
const ipRequestTracker = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: { message: 'GROQ_API_KEY is not configured on the server.' } },
      { status: 500 }
    );
  }

  // Rate Limiting by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const rateRecord = ipRequestTracker.get(ip);

  if (rateRecord && now < rateRecord.resetTime) {
    if (rateRecord.count >= 20) {
      return NextResponse.json(
        { error: { message: 'Rate limit reached: maximum 20 clinical queries per minute. Please wait.' } },
        { status: 429 }
      );
    }
    rateRecord.count += 1;
  } else {
    ipRequestTracker.set(ip, { count: 1, resetTime: now + 60000 });
  }

  // Periodic map cleanup
  if (ipRequestTracker.size > 1000) {
    for (const [key, val] of ipRequestTracker.entries()) {
      if (now > val.resetTime) ipRequestTracker.delete(key);
    }
  }

  try {
    const body = await req.json();

    // Input validation: ensure body is an object and messages is a non-empty array
    if (!body || typeof body !== 'object' || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: { message: 'Invalid payload: messages array is required and must not be empty.' } },
        { status: 400 }
      );
    }

    // Guard against excessive message arrays (DoS / quota exhaustion)
    if (body.messages.length > 10) {
      return NextResponse.json(
        { error: { message: 'Invalid payload: messages array exceeds maximum allowed length of 10.' } },
        { status: 400 }
      );
    }

    // Validate each message structure, role, and character bounds
    for (const msg of body.messages) {
      if (!msg || typeof msg !== 'object' || typeof msg.content !== 'string' || msg.content.length > 4000) {
        return NextResponse.json(
          { error: { message: 'Invalid message object or message content exceeds 4,000 character limit.' } },
          { status: 400 }
        );
      }
      if (msg.role && !ALLOWED_ROLES.has(msg.role)) {
        return NextResponse.json(
          { error: { message: `Invalid message role: '${msg.role}'. Allowed roles: user, assistant, system.` } },
          { status: 400 }
        );
      }
    }

    // Model validation: allow any model browsed or configured by the user matching safe identifier pattern
    const model = typeof body.model === 'string' && SAFE_MODEL_REGEX.test(body.model.trim())
      ? body.model.trim()
      : 'llama-3.1-8b-instant';

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: body.messages,
        temperature: typeof body.temperature === 'number' ? Math.max(0, Math.min(2, body.temperature)) : 0.7,
        max_tokens: typeof body.max_tokens === 'number' ? Math.min(4096, body.max_tokens) : 2048,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: { message: e instanceof Error ? e.message : 'Internal server error' } },
      { status: 500 }
    );
  }
}
