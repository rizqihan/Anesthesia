import { NextRequest, NextResponse } from 'next/server';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

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

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
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
