import { useAppStore } from '@/store/appStore';
import { GoogleGenAI } from '@google/genai';

export async function generateAIResponse(prompt: string): Promise<string> {
  const store = useAppStore.getState();
  
  if (store.aiProvider === 'default_gemini' || store.aiProvider === 'custom_gemini') {
    const apiKey = store.aiProvider === 'custom_gemini' && store.customGeminiKey 
      ? store.customGeminiKey 
      : process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
    if (!apiKey) throw new Error('API key not found for Gemini');
    
    // Fallback to older SDK usage if 1.17.0 style is needed
    // The GoogleGenAI is from @google/genai package which is the official new SDK
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash',
      contents: prompt,
    });
    
    return response.text || 'No response generated.';
  } else if (store.aiProvider === 'openai_compatible') {
    if (!store.openaiKey) throw new Error('API key not found for OpenAI compatible endpoint');
    if (!store.openaiEndpoint) throw new Error('Endpoint URL not configured');
    
    const url = store.openaiEndpoint.endsWith('/') 
      ? `${store.openaiEndpoint}chat/completions` 
      : `${store.openaiEndpoint}/chat/completions`;

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
