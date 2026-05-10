import { generateAISearchResponse, type AISearchSource } from './ai';
import db, { type ICD10Record, type GuidelineRecord } from './db';
import type { Drug } from './drugs';

export interface SyncResult<T> {
  entries: T[];
  sources: AISearchSource[];
  hasGrounding: boolean;
}

/** Extract JSON from AI response text, handling markdown fences */
function extractJSON(text: string): string {
  let t = text.trim();
  // Strip markdown code fences
  const fenceMatch = t.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) t = fenceMatch[1].trim();
  return t;
}

function parseResponse<T>(text: string, sources: AISearchSource[], hasGrounding: boolean): SyncResult<T> {
  try {
    const parsed = JSON.parse(extractJSON(text));
    const entries: T[] = Array.isArray(parsed.entries) ? parsed.entries : Array.isArray(parsed) ? parsed : [];
    return { entries, sources, hasGrounding };
  } catch (e) {
    console.error('Failed to parse sync response:', e, '\nRaw text:', text);
    return { entries: [], sources, hasGrounding };
  }
}

// ─── ICD-10 Sync ────────────────────────────────────────────────────────────────

export async function syncICD10(): Promise<SyncResult<ICD10Record>> {
  const existing = await db.icd10.toArray();
  const existingCodes = existing.map(e => e.code);

  const prompt = `You are a medical coding expert. Search for ICD-10-CM codes commonly used in primary care and clinical practice, especially those relevant to Indonesian healthcare settings.

Current codes already in the database (DO NOT include these):
${existingCodes.join(', ')}

Find 15-20 NEW ICD-10 codes NOT in the list above. Focus on:
- Common conditions in primary care and anesthesiology
- Conditions prevalent in Southeast Asian / Indonesian populations
- Important surgical and perioperative diagnoses

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "entries": [
    { "code": "X00.0", "name": "English condition name", "indonesian": "Nama kondisi dalam Bahasa Indonesia" }
  ]
}`;

  const response = await generateAISearchResponse(prompt);
  return parseResponse<ICD10Record>(response.text, response.sources, response.hasGrounding);
}

// ─── Drug Formulary Sync ────────────────────────────────────────────────────────

export async function syncDrugs(): Promise<SyncResult<Drug>> {
  const existing = await db.drugs.toArray();
  const existingIds = existing.map(e => e.id);

  const prompt = `You are a clinical pharmacology expert. Search for drugs commonly prescribed in Indonesian clinical practice.

Current drugs already in the database (DO NOT include these):
${existingIds.join(', ')}

Find 5-8 NEW drugs NOT in the list above. Focus on:
- Commonly prescribed medications in Indonesian primary care
- Anesthesia-related medications (propofol, ketamine, fentanyl, etc.)
- Available generic drugs in Indonesian pharmacies

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "entries": [
    {
      "id": "drug_name_lowercase",
      "genericName": "Generic Drug Name",
      "brandNames": ["Brand1", "Brand2"],
      "drugClass": "Drug Class",
      "indications": { "en": "English indications", "id": "Indikasi Bahasa Indonesia" },
      "contraindications": { "en": "English contraindications", "id": "Kontraindikasi Bahasa Indonesia" },
      "dosing": {
        "dosePerKg": 10,
        "unit": "mg",
        "maxDose": 500,
        "frequency": "q8h",
        "notes": { "en": "English dosing notes", "id": "Catatan dosis Bahasa Indonesia" }
      }
    }
  ]
}`;

  const response = await generateAISearchResponse(prompt);
  return parseResponse<Drug>(response.text, response.sources, response.hasGrounding);
}

// ─── Clinical Guidelines Sync ───────────────────────────────────────────────────

export async function syncGuidelines(): Promise<SyncResult<GuidelineRecord>> {
  const existing = await db.guidelines.toArray();
  const existingTitles = existing.map(e => e.title.en);

  const prompt = `You are a clinical guidelines expert. Search for the latest clinical practice guidelines (2023-2026) from major medical organizations (WHO, ESC, AHA, ACC, GOLD, GINA, KDIGO, NICE, etc).

Current guidelines already in the database (DO NOT include these):
${existingTitles.join('; ')}

Find 5-8 NEW guidelines NOT in the list above. Focus on:
- Recently published or updated evidence-based guidelines
- Guidelines relevant to anesthesiology, critical care, internal medicine, cardiology, pulmonology
- International or WHO guidelines applicable in Southeast Asia

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "entries": [
    {
      "title": { "en": "English title", "id": "Judul Bahasa Indonesia" },
      "category": "Medical Specialty",
      "content": { "en": "Brief English summary of the guideline and key recommendations", "id": "Ringkasan singkat pedoman dan rekomendasi utama dalam Bahasa Indonesia" }
    }
  ]
}`;

  const response = await generateAISearchResponse(prompt);
  return parseResponse<GuidelineRecord>(response.text, response.sources, response.hasGrounding);
}
