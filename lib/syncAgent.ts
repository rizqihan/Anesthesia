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

CRITICAL: The "dosing" object is MANDATORY for every drug. ALL fields inside "dosing" must be present and filled with real clinical values. The app uses these values for a dosage calculator — missing dosing data makes the drug unusable.

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
  let entries = parseEntries<Drug>(response.text);

  // Validate: reject any drug without complete dosing data
  entries = entries.filter(d =>
    d.id && d.genericName && d.dosing &&
    typeof d.dosing.dosePerKg === 'number' && d.dosing.dosePerKg > 0 &&
    typeof d.dosing.maxDose === 'number' && d.dosing.maxDose > 0 &&
    d.dosing.unit && d.dosing.frequency &&
    d.dosing.notes?.en && d.dosing.notes?.id
  );

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

  const prompt = `You are a clinical practice guidelines (CPG) expert. Search for the latest clinical practice guidelines (2023-2026) from major medical organizations (WHO, ESC, AHA, ACC, GOLD, GINA, KDIGO, NICE, etc).

Current guidelines already in the database:
${[...existingMap.keys()].join('; ')}

Find 3-5 guidelines. You MAY include guidelines from the list above if you have UPDATED or MORE ACCURATE information, and you SHOULD also include NEW guidelines not in the list. Focus on:
- Recently published or updated evidence-based guidelines
- Guidelines relevant to anesthesiology, critical care, internal medicine, cardiology, pulmonology
- International or WHO guidelines applicable in Southeast Asia

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "entries": [
    {
      "title": { "en": "English CPG Name", "id": "Nama PPK Bahasa Indonesia" },
      "category": "Medical Specialty",
      "isStructured": true,
      "definition": { "en": "Detailed definition in English", "id": "Definisi detail dalam Bahasa Indonesia" },
      "symptoms": { "en": "Key symptoms and presentations in English", "id": "Gejala klinis dalam Bahasa Indonesia" },
      "physicalExamination": { "en": "Physical exam findings and signs in English", "id": "Temuan pemeriksaan fisik dalam Bahasa Indonesia" },
      "labFindings": { "en": "Lab findings and key investigations in English", "id": "Temuan laboratorium dalam Bahasa Indonesia" },
      "differentialDiagnosis": { "en": "Differential diagnosis list in English", "id": "Diagnosis banding dalam Bahasa Indonesia" },
      "dangerSigns": { "en": "Critical danger signs and red flags requiring immediate medical attention in English", "id": "Tanda bahaya kritis dan red flag yang memerlukan perhatian medis segera dalam Bahasa Indonesia" },
      "management": {
        "initialTreatment": { "en": "Initial treatment and stabilization in English", "id": "Penanganan awal dalam Bahasa Indonesia" },
        "definitiveTreatment": { "en": "Definitive medical/surgical treatment in English", "id": "Terapi definitif dalam Bahasa Indonesia" },
        "rehab": { "en": "Rehabilitation in English", "id": "Rehabilitasi dalam Bahasa Indonesia" },
        "referral": { "en": "Referral criteria in English", "id": "Kriteria rujukan dalam Bahasa Indonesia" },
        "workup": { "en": "Diagnostic workup in English", "id": "Pemeriksaan penunjang dalam Bahasa Indonesia" },
        "other": { "en": "Other therapies in English", "id": "Tata laksana lainnya dalam Bahasa Indonesia" }
      },
      "followUp": { "en": "Follow-up guidelines in English", "id": "Tindak lanjut dalam Bahasa Indonesia" },
      "prevention": {
        "pharmacological": { "en": "Pharmacological prevention/prophylaxis in English", "id": "Pencegahan farmakologi dalam Bahasa Indonesia" },
        "nonPharmacological": { "en": "Non-pharmacological prevention in English", "id": "Pencegahan non-farmakologi dalam Bahasa Indonesia" }
      },
      "caseExample": { "en": "Clinical case example for learning in English", "id": "Contoh kasus klinis untuk pembelajaran dalam Bahasa Indonesia" },
      "references": { "en": "Guideline source references in English (e.g., • Organization Year URL)", "id": "Referensi sumber pedoman dalam Bahasa Indonesia (misal: • Organisasi Tahun URL)" }
    }
  ]
}`;

  const response = await generateAISearchResponse(prompt);
  const entries = parseEntries<GuidelineRecord>(response.text);

  const newEntries: GuidelineRecord[] = [];
  const updatedEntries: UpdatedEntry<GuidelineRecord>[] = [];

  for (const entry of entries) {
    entry.content = entry.definition; // for legacy fallback
    entry.isStructured = true;
    entry.lastGenerated = new Date().toISOString();

    const old = existingMap.get(entry.title?.en?.toLowerCase());
    if (!old) {
      newEntries.push(entry);
    } else if (
      old.definition?.en !== entry.definition?.en ||
      old.definition?.id !== entry.definition?.id ||
      JSON.stringify(old.management) !== JSON.stringify(entry.management) ||
      JSON.stringify(old.references) !== JSON.stringify(entry.references)
    ) {
      // Preserve the DB id for updates
      entry.id = old.id;
      updatedEntries.push({ old, new: entry });
    }
  }

  return { newEntries, updatedEntries, sources: response.sources, hasGrounding: response.hasGrounding };
}

/** Create or update a complete structured CPG for a specific condition on demand */
export async function generateSingleCPG(conditionName: string): Promise<GuidelineRecord> {
  const prompt = `You are a clinical practice guideline (CPG) expert. Create a complete, detailed, evidence-based Clinical Practice Guideline (CPG) / Pedoman Praktik Klinis (PPK) for the condition: "${conditionName}".
  
You must output a single JSON object (no markdown, no explanations) containing exactly this structure:
{
  "title": { "en": "${conditionName} Clinical Practice Guideline", "id": "Pedoman Praktik Klinis ${conditionName}" },
  "category": "Medical Specialty (e.g., Cardiology, Anesthesiology, Pulmonology, Nephrology, Surgery, etc.)",
  "isStructured": true,
  "definition": { "en": "Detailed definition, etiology, and pathophysiology summary in English", "id": "Definisi detail, etiologi, dan ringkasan patofisiologi dalam Bahasa Indonesia" },
  "symptoms": { "en": "Key clinical symptoms, chief complaints, and patient presentations in English", "id": "Gejala klinis utama, keluhan utama, dan presentasi pasien dalam Bahasa Indonesia" },
  "physicalExamination": { "en": "Physical examination findings, clinical signs, and pathognomonic physical markers in English", "id": "Temuan pemeriksaan fisik, tanda klinis, dan penanda fisik patognomonis dalam Bahasa Indonesia" },
  "labFindings": { "en": "Laboratory findings, biochemical changes, and key diagnostic investigations in English", "id": "Temuan laboratorium, perubahan biokimia, dan investigasi diagnostik utama dalam Bahasa Indonesia" },
  "differentialDiagnosis": { "en": "Differential diagnosis list with brief distinguishing features in English", "id": "Daftar diagnosis banding dengan ciri pembeda singkat dalam Bahasa Indonesia" },
  "dangerSigns": { "en": "Critical danger signs, red flags, and warning symptoms requiring immediate emergency medical intervention. Include signs of clinical deterioration, life-threatening complications, and criteria for emergency department presentation in English", "id": "Tanda bahaya kritis, red flag, dan gejala peringatan yang memerlukan intervensi medis darurat segera. Sertakan tanda perburukan klinis, komplikasi mengancam jiwa, dan kriteria presentasi ke unit gawat darurat dalam Bahasa Indonesia" },
  "management": {
    "initialTreatment": { "en": "Initial stabilization, emergency interventions, and immediate treatments in English", "id": "Penstabilan awal, intervensi darurat, dan penanganan segera dalam Bahasa Indonesia" },
    "definitiveTreatment": { "en": "Definitive/long-term medical, pharmacological, and surgical treatments in English", "id": "Terapi definitif/jangka panjang medis, farmakologis, dan bedah dalam Bahasa Indonesia" },
    "rehab": { "en": "Rehabilitation guidelines, physiotherapy, and recovery care in English", "id": "Pedoman rehabilitasi, fisioterapi, dan pemulihan dalam Bahasa Indonesia" },
    "referral": { "en": "Criteria for specialist referral, tertiary care transfer, or ICU admission in English", "id": "Kriteria rujukan spesialis, transfer perawatan tersier, atau rawat ICU dalam Bahasa Indonesia" },
    "workup": { "en": "Diagnostic workup, advanced imaging, and active monitoring protocols in English", "id": "Pemeriksaan penunjang, pencitraan lanjut, dan protokol pemantauan aktif dalam Bahasa Indonesia" },
    "other": { "en": "Other supportive measures, patient education, or adjacent therapies in English", "id": "Tindakan suportif lainnya, edukasi pasien, atau terapi tambahan lainnya dalam Bahasa Indonesia" }
  },
  "followUp": { "en": "Outpatient monitoring, clinic check-up schedules, and follow-up guidelines in English", "id": "Pemantauan rawat jalan, jadwal kontrol klinis, dan pedoman tindak lanjut dalam Bahasa Indonesia" },
  "prevention": {
    "pharmacological": { "en": "Pharmacological prevention, chemoprophylaxis, vaccines, or drug-based prophylaxis in English", "id": "Pencegahan farmakologi, kemoprofilaksis, vaksin, atau profilaksis berbasis obat dalam Bahasa Indonesia" },
    "nonPharmacological": { "en": "Non-pharmacological prevention, lifestyle adjustments, dietary changes, and avoidance measures in English", "id": "Pencegahan non-farmakologi, penyesuaian gaya hidup, perubahan pola makan, dan tindakan pencegahan dalam Bahasa Indonesia" }
  },
  "caseExample": { "en": "A highly realistic, detailed clinical case example for learning: patient demographics, clinical presentation, step-by-step diagnostic process, treatment instituted, and clinical outcome/follow-up in English.", "id": "Contoh kasus klinis yang sangat realistis dan detail untuk pembelajaran: demografi pasien, presentasi klinis, proses diagnosis langkah demi langkah, penanganan yang diberikan, dan hasil akhir klinis/tindak lanjut dalam Bahasa Indonesia." },
  "references": { "en": "Key source guideline citations, organizations, years, and optional URLs. List each reference on a new line prefixed with '• ' in English", "id": "Kutipan referensi pedoman sumber utama, organisasi, tahun, dan URL opsional. Cantumkan setiap referensi pada baris baru diawali dengan '• ' dalam Bahasa Indonesia" }
}

CRITICAL FORMATTING RULES (follow exactly):
1. For any lists of symptoms, exam findings, lab findings, differential diagnoses, management steps, prevention measures, and references:
   - Prefix EACH list item with a bullet point and space: "• "
   - Use "**text**" (double asterisks) to highlight key medical terms, drug names, precise dosages (e.g., "**Epinephrine 0.3 mg IM**"), lab thresholds, and alert criteria.
   - Do NOT use markdown headers (e.g. #, ##, ###), dashes (-), bullet asterisks (*), or numbered lists (1, 2, 3).
   - Write management steps as clear, actionable list items starting with "• ", not long narrative paragraphs.
   - Separate list items with a single newline character (\n) inside the string so they display as separate bullets.
2. Ensure all texts are highly detailed, comprehensive, professionally written, and scientifically accurate. Avoid placeholders. Do not wrap in backticks or markdown formatting outside the raw JSON.`;

  const response = await generateAISearchResponse(prompt);
  try {
    const data = JSON.parse(extractJSON(response.text));
    
    if (!data.title?.en || !data.title?.id || !data.category) {
      throw new Error("Invalid CPG JSON response from AI");
    }

    const record: GuidelineRecord = {
      title: data.title,
      category: data.category,
      isStructured: true,
      content: data.definition, // compatibility
      definition: data.definition,
      symptoms: data.symptoms,
      physicalExamination: data.physicalExamination,
      labFindings: data.labFindings,
      differentialDiagnosis: data.differentialDiagnosis,
      dangerSigns: data.dangerSigns,
      management: {
        initialTreatment: data.management?.initialTreatment || { en: '', id: '' },
        definitiveTreatment: data.management?.definitiveTreatment || { en: '', id: '' },
        rehab: data.management?.rehab || { en: '', id: '' },
        referral: data.management?.referral || { en: '', id: '' },
        workup: data.management?.workup || { en: '', id: '' },
        other: data.management?.other
      },
      followUp: data.followUp,
      prevention: {
        pharmacological: data.prevention?.pharmacological || { en: '', id: '' },
        nonPharmacological: data.prevention?.nonPharmacological || { en: '', id: '' }
      },
      caseExample: data.caseExample,
      references: data.references,
      lastGenerated: new Date().toISOString()
    };

    return record;
  } catch (err) {
    console.error("AI CPG parsing error:", err, "\nResponse text:", response.text);
    throw err;
  }
}

export async function generatePhysicalExamGuideline(examName: string): Promise<any> {
  const prompt = `You are a clinical physical examination expert and educator. Create a complete, detailed, evidence-based physical exam guideline for: "${examName}".
  
You must output a single JSON object (no markdown, no explanations) containing exactly this structure:
{
  "title": { "en": "${examName} Physical Exam Guideline", "id": "Pedoman Pemeriksaan Fisik ${examName}" },
  "category": "Medical Specialty (e.g., Neurology, Cardiology, Pulmonology, Gastroenterology, General, etc.)",
  "definition": { "en": "Clinical purpose, importance, and basic anatomy/physiology summary of this exam in English", "id": "Tujuan klinis, pentingnya, dan ringkasan anatomi/fisiologi dasar pemeriksaan ini dalam Bahasa Indonesia" },
  "preparation": { "en": "Patient position, necessary instruments (e.g., stethoscope, penlight), sanitization, and consent instructions in English", "id": "Posisi pasien, instrumen yang diperlukan (misal: stetoskop, penlight), sanitasi, dan instruksi persetujuan dalam Bahasa Indonesia" },
  "steps": [
    {
      "stepNumber": 1,
      "instruction": { "en": "Clear step-by-step instruction on how to perform this specific step of the exam in English", "id": "Instruksi langkah-demi-langkah yang jelas tentang cara melakukan langkah pemeriksaan khusus ini dalam Bahasa Indonesia" },
      "bodyPartId": "One of these exact body part IDs corresponding to the region examined: head | neck | chest | abdomen | arms | legs",
      "normalFindings": { "en": "What a normal, healthy finding looks like for this step in English", "id": "Seperti apa temuan normal dan sehat untuk langkah ini dalam Bahasa Indonesia" },
      "abnormalFindings": { "en": "What abnormal, pathological findings look like, including specific signs or names of positive tests in English", "id": "Seperti apa temuan abnormal dan patologis, termasuk tanda-tanda spesifik atau nama tes positif dalam Bahasa Indonesia" }
    }
  ]
}

CRITICAL RULES (follow exactly):
1. The "bodyPartId" for each step MUST be exactly one of: "head", "neck", "chest", "abdomen", "arms", "legs". No other values are allowed.
2. In instruction, normalFindings, and abnormalFindings:
   - Use "**text**" (double asterisks) to highlight key physical signs, anatomical landmarks, medical terms, or named tests (e.g., "**Murphy sign**", "**McBurney's point**", "**vesicular breath sounds**").
   - Do NOT use markdown headers (e.g. #, ##, ###), dashes (-), bullet asterisks (*), or numbered lists.
3. Ensure all fields are highly detailed, comprehensive, professionally written, and scientifically accurate. Avoid placeholders. Do not wrap in backticks or markdown formatting outside the raw JSON.`;

  const response = await generateAISearchResponse(prompt);
  try {
    const data = JSON.parse(extractJSON(response.text));
    
    if (!data.title?.en || !data.title?.id || !data.category || !Array.isArray(data.steps)) {
      throw new Error("Invalid Physical Exam JSON response from AI");
    }

    // Sanitize bodyPartId for all steps to ensure they are valid SVG ids
    const validParts = ["head", "neck", "chest", "abdomen", "arms", "legs"];
    const sanitizedSteps = data.steps.map((step: any) => {
      let part = (step.bodyPartId || "head").toLowerCase();
      if (!validParts.includes(part)) {
        if (part.includes("brain") || part.includes("face") || part.includes("eye") || part.includes("ear") || part.includes("nose") || part.includes("mouth")) {
          part = "head";
        } else if (part.includes("lung") || part.includes("heart") || part.includes("breast") || part.includes("thorax")) {
          part = "chest";
        } else if (part.includes("stomach") || part.includes("flank") || part.includes("pelvis")) {
          part = "abdomen";
        } else if (part.includes("shoulder") || part.includes("hand") || part.includes("finger") || part.includes("elbow")) {
          part = "arms";
        } else if (part.includes("hip") || part.includes("foot") || part.includes("toe") || part.includes("knee")) {
          part = "legs";
        } else if (part.includes("throat")) {
          part = "neck";
        } else {
          part = "head"; // fallback
        }
      }
      return {
        ...step,
        bodyPartId: part
      };
    });

    const record = {
      title: data.title,
      category: data.category,
      definition: data.definition,
      preparation: data.preparation,
      steps: sanitizedSteps,
      lastGenerated: new Date().toISOString()
    };

    return record;
  } catch (err) {
    console.error("AI Physical Exam parsing error:", err, "\nResponse text:", response.text);
    throw err;
  }
}

export async function syncPhysicalExams(): Promise<SyncResult<any>> {
  const existing = await db.physicalExams.toArray();
  const existingMap = new Map(existing.map(e => [e.title.en.toLowerCase(), e]));

  const prompt = `You are a clinical physical examination expert. Search for the most common and essential physical examination guides used in primary care, anesthesiology, or general medical practice.

Current physical exam guides already in the database:
${[...existingMap.keys()].join('; ')}

Find 2-3 physical exam guides. You MAY include guides from the list above if you have UPDATED or MORE ACCURATE information, and you SHOULD also include NEW guides not in the list. Focus on:
- Assessment steps, anatomical focus, normal vs abnormal findings.
- Common exams like: cardiovascular exam, respiratory exam, abdominal exam, neurological checks.

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "entries": [
    {
      "title": { "en": "Exam Name", "id": "Nama Pemeriksaan" },
      "category": "Medical Specialty",
      "definition": { "en": "Clinical purpose", "id": "Tujuan klinis" },
      "preparation": { "en": "Preparation and setup", "id": "Persiapan" },
      "steps": [
        {
          "stepNumber": 1,
          "instruction": { "en": "Step instruction", "id": "Instruksi langkah" },
          "bodyPartId": "head | neck | chest | abdomen | arms | legs",
          "normalFindings": { "en": "Normal details", "id": "Temuan normal" },
          "abnormalFindings": { "en": "Abnormal details", "id": "Temuan abnormal" }
        }
      ]
    }
  ]
}`;

  const response = await generateAISearchResponse(prompt);
  const entries = parseEntries<any>(response.text);

  const newEntries: any[] = [];
  const updatedEntries: UpdatedEntry<any>[] = [];

  const validParts = ["head", "neck", "chest", "abdomen", "arms", "legs"];

  for (const entry of entries) {
    if (!entry.steps || !Array.isArray(entry.steps)) continue;

    // Sanitize steps bodyPartId
    entry.steps = entry.steps.map((step: any) => {
      let part = (step.bodyPartId || "head").toLowerCase();
      if (!validParts.includes(part)) {
        part = "head";
      }
      return { ...step, bodyPartId: part };
    });

    entry.lastGenerated = new Date().toISOString();

    const old = existingMap.get(entry.title?.en?.toLowerCase());
    if (!old) {
      newEntries.push(entry);
    } else if (
      JSON.stringify(old.steps) !== JSON.stringify(entry.steps) ||
      old.definition?.en !== entry.definition?.en
    ) {
      entry.id = old.id;
      updatedEntries.push({ old, new: entry });
    }
  }

  return { newEntries, updatedEntries, sources: response.sources, hasGrounding: response.hasGrounding };
}


