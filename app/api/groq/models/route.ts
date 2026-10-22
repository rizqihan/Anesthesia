import { NextResponse } from 'next/server';

let cachedModelsResponse: unknown = null;
let cacheExpiresAt = 0;

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: { message: 'GROQ_API_KEY is not configured on the server.' } },
      { status: 500 }
    );
  }

  // Return cached model response if still fresh (1 hour TTL)
  const now = Date.now();
  if (cachedModelsResponse && now < cacheExpiresAt) {
    return NextResponse.json(cachedModelsResponse);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    cachedModelsResponse = data;
    cacheExpiresAt = now + 3600000; // 1 hour cache

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: { message: e instanceof Error ? e.message : 'Failed to fetch models' } },
      { status: 500 }
    );
  }
}
