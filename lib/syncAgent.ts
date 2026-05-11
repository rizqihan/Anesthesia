import { generateAISearchResponse, type AISearchSource } from './ai';
import db, { type ICD10Record, type GuidelineRecord } from './db';
import type { Drug } from './drugs';

export interface UpdatedEntry<T> {
  old: T;
  new: T;
}

export interface SyncResult<T> {
  newEntries: T[];
  updatedEntries: UpdatedEntry<T>[];
  sources: AISearchSource[];
  hasGrounding: boolean;
}

/** Extract JSON from AI response text, handling markdown fences */
function extractJSON(text: string): string {
  let t = text.trim();
  const fenceMatch = t.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) t = fenceMatch[1].trim();
  return t;
}

function parseEntries<T>(text: string): T[] {
  try {
    const parsed = JSON.parse(extractJSON(text));
    return Array.isArray(parsed.entries) ? parsed.entries : Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse sync response:', e, '\nRaw text:', text);
    return [];
  }
}

// ─── ICD-10 Sync ────────────────────────────────────────────────────────────────

export async function syncICD10(): Promise<SyncResult<ICD10Record>> {
  const existing = await db.icd10.toArray();
  const existingMap = new Map(existing.map(e => [e.code, e]));

  const prompt = `You are a medical coding expert. Search for ICD-10-CM codes commonly used in primary care and clinical practice, especially those relevant to Indonesian healthcare settings.

Current codes already in the database:
${[...existingMap.keys()].join(', ')}

Find 15-20 ICD-10 codes. You MAY include codes from the list above if you have UPDATED or MORE ACCURATE information for them, and you SHOULD also include NEW codes not in the list. Focus on:
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
  const entries = parseEntries<ICD10Record>(response.text);

  const newEntries: ICD10Record[] = [];
  const updatedEntries: UpdatedEntry<ICD10Record>[] = [];

  for (const entry of entries) {
    const old = existingMap.get(entry.code);
    if (!old) {
      newEntries.push(entry);
    } else if (old.name !== entry.name || old.indonesian !== entry.indonesian) {
      updatedEntries.push({ old, new: entry });
    }
  }

  return { newEntries, updatedEntries, sources: response.sources, hasGrounding: response.hasGrounding };
}

// ─── Drug Formulary Sync ────────────────────────────────────────────────────────

export async function syncDrugs(): Promise<SyncResult<Drug>> {
  const existing = await db.drugs.toArray();
  const existingMap = new Map(existing.map(e => [e.id, e]));

  const prompt = `You are a clinical pharmacology expert. Search for drugs commonly prescribed in Indonesian clinical practice.

Current drugs already in the database:
${[...existingMap.keys()].join(', ')}

Find 5-8 drugs. You MAY include drugs from the list above if you have UPDATED or MORE ACCURATE information, and you SHOULD also include NEW drugs not in the list. Focus on:
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
  const entries = parseEntries<Drug>(response.text);

  const newEntries: Drug[] = [];
  const updatedEntries: UpdatedEntry<Drug>[] = [];

  for (const entry of entries) {
    const old = existingMap.get(entry.id);
    if (!old) {
      newEntries.push(entry);
    } else if (JSON.stringify(old) !== JSON.stringify(entry)) {
      updatedEntries.push({ old, new: entry });
    }
  }

  return { newEntries, updatedEntries, sources: response.sources, hasGrounding: response.hasGrounding };
}

// ─── Clinical Guidelines Sync ───────────────────────────────────────────────────

export async function syncGuidelines(): Promise<SyncResult<GuidelineRecord>> {
  const existing = await db.guidelines.toArray();
  const existingMap = new Map(existing.map(e => [e.title.en.toLowerCase(), e]));

  const prompt = `You are a clinical guidelines expert. Search for the latest clinical practice guidelines (2023-2026) from major medical organizations (WHO, ESC, AHA, ACC, GOLD, GINA, KDIGO, NICE, etc).

Current guidelines already in the database:
${[...existingMap.keys()].join('; ')}

Find 5-8 guidelines. You MAY include guidelines from the list above if you have UPDATED or MORE ACCURATE information, and you SHOULD also include NEW guidelines not in the list. Focus on:
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
  const entries = parseEntries<GuidelineRecord>(response.text);

  const newEntries: GuidelineRecord[] = [];
  const updatedEntries: UpdatedEntry<GuidelineRecord>[] = [];

  for (const entry of entries) {
    const old = existingMap.get(entry.title?.en?.toLowerCase());
    if (!old) {
      newEntries.push(entry);
    } else if (old.content?.en !== entry.content?.en || old.content?.id !== entry.content?.id) {
      // Preserve the DB id for updates
      entry.id = old.id;
      updatedEntries.push({ old, new: entry });
    }
  }

  return { newEntries, updatedEntries, sources: response.sources, hasGrounding: response.hasGrounding };
}
