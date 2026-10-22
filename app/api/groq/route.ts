import { NextRequest, NextResponse } from 'next/server';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const ALLOWED_MODELS = new Set([
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
  'llama-3.1-70b-versatile',
  'mixtral-8x7b-32768',
  'gemma2-9b-it',
]);

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: { message: 'GROQ_API_KEY is not configured on the server.' } },
      { status: 500 }
    );
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
    if (body.messages.length > 20) {
      return NextResponse.json(
        { error: { message: 'Invalid payload: messages array exceeds maximum allowed length.' } },
        { status: 400 }
      );
    }

    // Validate each message structure and character bound
    for (const msg of body.messages) {
      if (!msg || typeof msg !== 'object' || typeof msg.content !== 'string' || msg.content.length > 10000) {
        return NextResponse.json(
          { error: { message: 'Invalid message object or message content exceeds length limit.' } },
          { status: 400 }
        );
      }
    }

    // Model validation (fall back safely if not in allowed set)
    const model = typeof body.model === 'string' && ALLOWED_MODELS.has(body.model)
      ? body.model
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
