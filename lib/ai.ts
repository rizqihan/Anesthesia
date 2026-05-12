import { useAppStore } from '@/store/appStore';
import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

/** Normalize an OpenAI-compatible base URL to ensure it ends with /chat/completions */
function buildOpenAIUrl(endpoint: string): string {
  let base = endpoint.trim().replace(/\/+$/, '');
  if (base.endsWith('/chat/completions')) return base;
  if (!base.endsWith('/v1')) base = base.replace(/\/v1\/.*$/, '/v1');
  return `${base}/chat/completions`;
}

export async function generateAIResponse(prompt: string): Promise<string> {
  const store = useAppStore.getState();

  // --- Default Groq (built-in) ---
  if (store.aiProvider === 'default_groq') {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) throw new Error('Built-in Groq API key not found. Please set NEXT_PUBLIC_GROQ_API_KEY.');

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response generated.';
  }

  // --- Custom Gemini API ---
  if (store.aiProvider === 'custom_gemini') {
    const apiKey = store.customGeminiKey;
    if (!apiKey) throw new Error('API key not found for Gemini');

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    return response.text || 'No response generated.';
  }

  // --- OpenAI Compatible Endpoint ---
  if (store.aiProvider === 'openai_compatible') {
    if (!store.openaiKey) throw new Error('API key not found for OpenAI compatible endpoint');
    if (!store.openaiEndpoint) throw new Error('Endpoint URL not configured');
    
    const url = buildOpenAIUrl(store.openaiEndpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.openaiKey}`
      },
      body: JSON.stringify({
        model: store.openaiModel || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    if (!response.ok) {
       const err = await response.json().catch(()=>({}));
       throw new Error(err.error?.message || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response generated.';
  }
  
  throw new Error('Invalid AI Provider');
}

// --- AI Search Response (with Google Search grounding for Gemini) ---

export interface AISearchSource {
  url: string;
  title: string;
}

export interface AISearchResponse {
  text: string;
  sources: AISearchSource[];
  hasGrounding: boolean;
}

/**
 * Generate an AI response with internet search grounding.
 * - Gemini providers: uses Google Search tool for live web results
 * - OpenAI-compatible: uses JSON mode with model knowledge only (no live search)
 */
export async function generateAISearchResponse(prompt: string): Promise<AISearchResponse> {
  const store = useAppStore.getState();

  // --- Default Groq (built-in) — no live search, model knowledge only ---
  if (store.aiProvider === 'default_groq') {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) throw new Error('Built-in Groq API key not found. Please set NEXT_PUBLIC_GROQ_API_KEY.');

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: 'You are a medical data assistant. Always respond with valid JSON only. No markdown, no explanation.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.choices?.[0]?.message?.content || '',
      sources: [],
      hasGrounding: false,
    };
  }

  // --- Custom Gemini — with Google Search grounding ---
  if (store.aiProvider === 'custom_gemini') {
    const apiKey = store.customGeminiKey;
    if (!apiKey) throw new Error('API key not found for Gemini');

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 1.0,
      },
    });

    // Extract grounding sources from response metadata
    const sources: AISearchSource[] = [];
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const candidates = (response as any).candidates;
      const groundingMeta = candidates?.[0]?.groundingMetadata;
      if (groundingMeta?.groundingChunks) {
        for (const chunk of groundingMeta.groundingChunks) {
          if (chunk.web) {
            sources.push({
              url: chunk.web.uri || '',
              title: chunk.web.title || '',
            });
          }
        }
      }
    } catch {
      // Grounding metadata extraction is best-effort
    }

    return {
      text: response.text || '',
      sources,
      hasGrounding: sources.length > 0,
    };
  }

  // --- OpenAI Compatible Endpoint ---
  if (store.aiProvider === 'openai_compatible') {
    if (!store.openaiKey) throw new Error('API key not found for OpenAI compatible endpoint');
    if (!store.openaiEndpoint) throw new Error('Endpoint URL not configured');

    const url = buildOpenAIUrl(store.openaiEndpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.openaiKey}`,
      },
      body: JSON.stringify({
        model: store.openaiModel || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a medical data assistant. Always respond with valid JSON only. No markdown, no explanation.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.choices?.[0]?.message?.content || '',
      sources: [],
      hasGrounding: false,
    };
  }

  throw new Error('Invalid AI Provider');
}
