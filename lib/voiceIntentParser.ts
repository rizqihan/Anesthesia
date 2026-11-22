import { DRUG_DB, Drug } from './drugs';

export type VoiceIntentType =
  | 'EMERGENCY'
  | 'DRUG_DOSAGE'
  | 'CALCULATOR'
  | 'ACTIVE_CASE'
  | 'NAVIGATION'
  | 'THEME'
  | 'UNKNOWN';

export interface SoundAlikeAlert {
  primaryDrug: string;
  confusedWith: string;
  warningEn: string;
  warningId: string;
}

export interface ParsedVoiceIntent {
  rawQuery: string;
  type: VoiceIntentType;
  titleEn: string;
  titleId: string;
  subtitleEn: string;
  subtitleId: string;
  speakTextEn: string;
  speakTextId: string;
  soundAlikeAlert?: SoundAlikeAlert;
  badge: {
    label: string;
    color: 'rose' | 'amber' | 'emerald' | 'cyan' | 'blue' | 'purple';
  };
  details?: {
    doseValue?: number;
    doseUnit?: string;
    maxDose?: number;
    route?: string;
    preparation?: string;
    frequency?: string;
    clinicalPearls?: { en: string; id: string };
    extractedWeightKg?: number;
    extractedHeightCm?: number;
    extractedAgeYears?: number;
    extractedSex?: 'M' | 'F';
    actionHref?: string;
    actionPayload?: Record<string, any>;
    isCapped?: boolean;
  };
}

/**
 * High-alert Look-Alike / Sound-Alike (LASA) clinical safety protections
 */
const LASA_PAIRS: Array<{
  keywords: string[];
  primary: string;
  confusedWith: string;
  warningEn: string;
  warningId: string;
}> = [
  {
    keywords: ['epinephrine', 'ephedrine', 'adrenalin', 'efedrin', 'epi'],
    primary: 'Epinephrine (Adrenaline)',
    confusedWith: 'Ephedrine',
    warningEn: 'CRITICAL LASA: Epinephrine (potent catecholamine, 10–20 mcg push or 1 mg arrest) sounds like Ephedrine (indirect sympathomimetic, 5–10 mg bolus). Verify concentration & ampule!',
    warningId: 'PERINGATAN LASA: Epinefrin (katekolamin poten, 10–20 mcg push / 1 mg henti jantung) mirip bunyi Efedrin (5–10 mg). Verifikasi sediaan dan ampul dengan teliti!'
  },
  {
    keywords: ['hydralazine', 'hydroxyzine', 'hidralazin', 'hidroksizin'],
    primary: 'Hydralazine',
    confusedWith: 'Hydroxyzine',
    warningEn: 'LASA WARNING: Hydralazine (IV antihypertensive vasodilator) sounds like Hydroxyzine (antihistamine/sedative).',
    warningId: 'PERINGATAN LASA: Hidralazin (antihipertensi vasodilator) mirip bunyi Hidroksizin (antihistamin/sedatif).'
  },
  {
    keywords: ['cefazolin', 'ceftriaxone', 'sefazolin', 'seftriakson'],
    primary: 'Cefazolin',
    confusedWith: 'Ceftriaxone',
    warningEn: 'LASA WARNING: Cefazolin (1st gen cephalosporin for surgical prophylaxis) sounds like Ceftriaxone (3rd gen cephalosporin).',
    warningId: 'PERINGATAN LASA: Sefazolin (profilaksis bedah) mirip bunyi Seftriakson (generasi ke-3).'
  },
  {
    keywords: ['dopamine', 'dobutamine', 'dopamin', 'dobutamin'],
    primary: 'Dopamine',
    confusedWith: 'Dobutamine',
    warningEn: 'LASA WARNING: Dopamine (vasopressor & inotrope) sounds like Dobutamine (inodilator). Verify hemodynamic target.',
    warningId: 'PERINGATAN LASA: Dopamin (vasopresor & inotropik) mirip bunyi Dobutamin (inodilator). Verifikasi target hemodinamik.'
  },
  {
    keywords: ['morphine', 'hydromorphone', 'morfin', 'hidromorfon'],
    primary: 'Morphine',
    confusedWith: 'Hydromorphone (Dilaudid)',
    warningEn: 'POTENCY WARNING: Hydromorphone is ~5–7x more potent than Morphine. Overdose risk!',
    warningId: 'PERINGATAN POTENSI: Hidromorfon ~5–7x lebih kuat dibanding Morfin. Risiko overdosis fatal!'
  }
];

/**
 * Check if the transcript contains a Look-Alike / Sound-Alike drug
 */
export function checkSoundAlike(cleanText: string): SoundAlikeAlert | undefined {
  const lower = cleanText.toLowerCase();
  for (const pair of LASA_PAIRS) {
    if (pair.keywords.some((kw) => lower.includes(kw))) {
      return {
        primaryDrug: pair.primary,
        confusedWith: pair.confusedWith,
        warningEn: pair.warningEn,
        warningId: pair.warningId
      };
    }
  }
  return undefined;
}

/**
 * Extract weight in kg from voice query string
 */
export function extractWeight(text: string): number | null {
  const patterns = [
    /(?:for|berat|weight|bb|bobot)?\s*(\d+(?:\.\d+)?)\s*(?:kg|kilos?|kilograms?|kilo)\b/i,
    /(?:weight|berat|bb)\s*(?:is|adalah|sebesar|=|:)?\s*(\d+(?:\.\d+)?)\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:kg|kilos?|kilograms?|kilo)\b/i
  ];
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      if (val >= 0.5 && val <= 300) return val;
    }
  }
  return null;
}

/**
 * Extract height in cm from voice query string
 */
export function extractHeight(text: string): number | null {
  const patterns = [
    /(?:height|tinggi|tb)\s*(?:is|adalah|sebesar|=|:)?\s*(\d+(?:\.\d+)?)\s*(?:cm|centimeter|sentimeter)?\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:cm|centimeter|sentimeter)\b/i
  ];
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      if (val >= 30 && val <= 250) return val;
    }
  }
  return null;
}

/**
 * Extract age in years from voice query string
 */
export function extractAge(text: string): number | null {
  const patterns = [
    /(?:age|umur|usia)\s*(?:is|adalah|sebesar|=|:)?\s*(\d+(?:\.\d+)?)\s*(?:years?|thn|tahun|yo)?\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:years?|thn|tahun|yo)\b/i
  ];
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      if (val >= 0 && val <= 130) return val;
    }
  }
  return null;
}

/**
 * Core clinical voice intent parser
 */
export function parseVoiceIntent(
  rawTranscript: string,
  activeWeightKg: number = 70,
  language: 'en' | 'id' = 'en'
): ParsedVoiceIntent {
  const query = rawTranscript.trim();
  const lower = query.toLowerCase();
  const soundAlike = checkSoundAlike(lower);

  // 1. ACTIVE CASE PARAMETER MUTATION
  // Weight update
  if (
    /(?:set|ubah|ganti|update|atur)\s+(?:patient\s+)?(?:weight|berat|bb)/i.test(lower) ||
    /(?:berat|weight)\s+(?:pasien|patient)?\s*(?:menjadi|to|jadikan)?\s*\d+/i.test(lower)
  ) {
    const extractedW = extractWeight(lower);
    if (extractedW !== null) {
      return {
        rawQuery: query,
        type: 'ACTIVE_CASE',
        titleEn: `Update Patient Weight: ${extractedW} kg`,
        titleId: `Perbarui Berat Pasien: ${extractedW} kg`,
        subtitleEn: `Sets active clinical case weight to ${extractedW} kg across all calculators & syringe infusions.`,
        subtitleId: `Mengatur berat pasien aktif menjadi ${extractedW} kg untuk semua kalkulator & infus siring.`,
        speakTextEn: `Patient weight updated to ${extractedW} kilograms.`,
        speakTextId: `Berat badan pasien diatur menjadi ${extractedW} kilogram.`,
        soundAlikeAlert: soundAlike,
        badge: { label: 'CASE UPDATE', color: 'emerald' },
        details: {
          extractedWeightKg: extractedW,
          actionPayload: { patientWeight: extractedW.toString() }
        }
      };
    }
  }

  // Height update
  if (
    /(?:set|ubah|ganti|update|atur)\s+(?:patient\s+)?(?:height|tinggi|tb)/i.test(lower) ||
    /(?:tinggi|height)\s+(?:pasien|patient)?\s*(?:menjadi|to|jadikan)?\s*\d+/i.test(lower)
  ) {
    const extractedH = extractHeight(lower);
    if (extractedH !== null) {
      return {
        rawQuery: query,
        type: 'ACTIVE_CASE',
        titleEn: `Update Patient Height: ${extractedH} cm`,
        titleId: `Perbarui Tinggi Pasien: ${extractedH} cm`,
        subtitleEn: `Sets active patient height to ${extractedH} cm for IBW, ABW, and ventilator tidal volumes.`,
        subtitleId: `Mengatur tinggi badan pasien aktif menjadi ${extractedH} cm untuk kalkulasi IBW & volume tidal.`,
        speakTextEn: `Patient height updated to ${extractedH} centimeters.`,
        speakTextId: `Tinggi badan pasien diatur menjadi ${extractedH} sentimeter.`,
        badge: { label: 'CASE UPDATE', color: 'emerald' },
        details: {
          extractedHeightCm: extractedH,
          actionPayload: { patientHeight: extractedH.toString() }
        }
      };
    }
  }

  // Age update
  if (
    /(?:set|ubah|ganti|update|atur)\s+(?:patient\s+)?(?:age|umur|usia)/i.test(lower) ||
    /(?:umur|usia|age)\s+(?:pasien|patient)?\s*(?:menjadi|to|jadikan)?\s*\d+/i.test(lower)
  ) {
    const extractedA = extractAge(lower);
    if (extractedA !== null) {
      return {
        rawQuery: query,
        type: 'ACTIVE_CASE',
        titleEn: `Update Patient Age: ${extractedA} Years`,
        titleId: `Perbarui Umur Pasien: ${extractedA} Tahun`,
        subtitleEn: `Sets patient age to ${extractedA} years for pediatric Broselow & renal equations.`,
        subtitleId: `Mengatur umur pasien menjadi ${extractedA} tahun untuk Broselow & klirens ginjal.`,
        speakTextEn: `Patient age updated to ${extractedA} years.`,
        speakTextId: `Usia pasien diatur menjadi ${extractedA} tahun.`,
        badge: { label: 'CASE UPDATE', color: 'emerald' },
        details: {
          extractedAgeYears: extractedA,
          actionPayload: { patientAge: extractedA.toString() }
        }
      };
    }
  }

  // Sex update
  if (/\b(?:set|ubah)?\s*(?:patient\s+)?(?:gender|sex|jenis kelamin)\s*(?:to|ke|jadikan)?\s*(male|female|pria|wanita|laki|perempuan)\b/i.test(lower)) {
    const isFemale = /\bfemale\b|\bwanita\b|\bperempuan\b/i.test(lower);
    const isMale = !isFemale && (/\bmale\b|\bpria\b|\blaki\b/i.test(lower));
    const sexCode: 'M' | 'F' = isMale ? 'M' : 'F';
    return {
      rawQuery: query,
      type: 'ACTIVE_CASE',
      titleEn: `Update Patient Sex: ${isMale ? 'Male (M)' : 'Female (F)'}`,
      titleId: `Perbarui Jenis Kelamin: ${isMale ? 'Laki-laki (M)' : 'Perempuan (F)'}`,
      subtitleEn: `Updates biological sex for IBW and Cockcroft-Gault / CKD-EPI equations.`,
      subtitleId: `Memperbarui jenis kelamin untuk rumus IBW & Cockcroft-Gault.`,
      speakTextEn: `Patient sex updated to ${isMale ? 'male' : 'female'}.`,
      speakTextId: `Jenis kelamin pasien diatur ke ${isMale ? 'laki-laki' : 'perempuan'}.`,
      badge: { label: 'CASE UPDATE', color: 'emerald' },
      details: {
        extractedSex: sexCode,
        actionPayload: { patientSex: sexCode }
      }
    };
  }

  // 2. THEME SWITCH INTENTS
  if (/\b(?:switch to|ganti ke|mode)?\s*(?:light mode|mode terang|tema terang)\b/i.test(lower)) {
    return {
      rawQuery: query,
      type: 'THEME',
      titleEn: 'Switch to Light Mode',
      titleId: 'Beralih ke Mode Terang',
      subtitleEn: 'High-contrast appearance for outpatient clinics & bright rooms.',
      subtitleId: 'Tampilan kontras tinggi untuk poliklinik & ruangan terang.',
      speakTextEn: 'Switching to light mode.',
      speakTextId: 'Beralih ke mode terang.',
      badge: { label: 'THEME', color: 'cyan' },
      details: { actionPayload: { theme: 'light' } }
    };
  }

  if (/\b(?:switch to|ganti ke|mode)?\s*(?:dark mode|mode gelap|tema gelap)\b/i.test(lower)) {
    return {
      rawQuery: query,
      type: 'THEME',
      titleEn: 'Switch to Dark Mode',
      titleId: 'Beralih ke Mode Gelap',
      subtitleEn: 'Dimmed appearance for Operating Rooms & night calls.',
      subtitleId: 'Tampilan redup untuk Kamar Operasi & jaga malam.',
      speakTextEn: 'Switching to dark mode.',
      speakTextId: 'Beralih ke mode gelap.',
      badge: { label: 'THEME', color: 'cyan' },
      details: { actionPayload: { theme: 'dark' } }
    };
  }

  // 3. EMERGENCY CRISIS CARD PROTOCOLS
  // Push-Dose Epinephrine
  if (
    /(?:push\s*dose\s*epi|push\s*dose\s*epinephrine|dosis\s*push\s*epi|dosis\s*epinefrin\s*push)/i.test(lower) ||
    (/(?:epinephrine|epinefrin)/i.test(lower) && /(?:push|bolus|hipotensi|hypotension)/i.test(lower))
  ) {
    return {
      rawQuery: query,
      type: 'EMERGENCY',
      titleEn: 'Push-Dose Epinephrine (10 mcg/mL)',
      titleId: 'Push-Dose Epinefrin (10 mcg/mL)',
      subtitleEn: 'Dose: 10–20 mcg (1–2 mL) IV bolus every 2–5 min. Max single bolus: 20 mcg.',
      subtitleId: 'Dosis: 10–20 mcg (1–2 mL) IV bolus tiap 2–5 mnt. Batas maksimal bolus: 20 mcg.',
      speakTextEn: 'Push dose epinephrine: 10 to 20 micrograms IV every 2 to 5 minutes. Concentration is 10 micrograms per milliliter.',
      speakTextId: 'Push dose epinefrin: 10 hingga 20 mikrogram IV tiap 2 sampai 5 menit. Konsentrasi 10 mikrogram per mililiter.',
      soundAlikeAlert: soundAlike,
      badge: { label: 'CRISIS PROTOCOL', color: 'rose' },
      details: {
        doseValue: 10,
        doseUnit: 'mcg',
        maxDose: 20,
        route: 'IV Bolus',
        preparation: 'Dilute 1 mL of 1:10,000 (0.1 mg/mL) cardiac epi in 9 mL saline to yield 10 mcg/mL, OR 1 mL of 1:1,000 ampule in 100 mL NS bag.',
        frequency: 'Every 2–5 minutes titrated to MAP ≥ 65 mmHg',
        actionHref: '/emergency?tab=push_doses'
      }
    };
  }

  // Cardiac Arrest Epinephrine
  if (
    /(?:arrest\s*epi|cardiac\s*arrest\s*epinephrine|henti\s*jantung\s*epi|acls\s*epi|dosis\s*henti\s*jantung)/i.test(lower)
  ) {
    return {
      rawQuery: query,
      type: 'EMERGENCY',
      titleEn: 'ACLS Cardiac Arrest Epinephrine',
      titleId: 'Epinefrin Resusitasi Henti Jantung (ACLS)',
      subtitleEn: 'Dose: 1 mg IV/IO push (10 mL of 1:10,000) every 3–5 minutes. Flush with 20 mL NS.',
      subtitleId: 'Dosis: 1 mg IV/IO bolus (10 mL sediaan 1:10.000) tiap 3–5 menit. Bilas dengan 20 mL saline.',
      speakTextEn: 'Cardiac arrest epinephrine: 1 milligram IV push every 3 to 5 minutes, followed by 20 mL saline flush.',
      speakTextId: 'Epinefrin henti jantung: 1 miligram IV bolus tiap 3 sampai 5 menit, disusul bilas 20 mL cairan salin.',
      soundAlikeAlert: soundAlike,
      badge: { label: 'CODE BLUE', color: 'rose' },
      details: {
        doseValue: 1,
        doseUnit: 'mg',
        route: 'IV/IO Rapid Push',
        preparation: '1:10,000 prefilled syringe (0.1 mg/mL) or dilute 1:1,000 ampule',
        frequency: 'Every 3–5 minutes during active CPR cycles',
        actionHref: '/emergency?tab=acls_cpr'
      }
    };
  }

  // LAST (Local Anesthetic Systemic Toxicity) - 20% Lipid Emulsion
  if (
    /(?:last\s*protocol|intralipid|lipid\s*emulsion|keracunan\s*anestesi|toksisitas\s*lokal|dosis\s*intralipid)/i.test(lower)
  ) {
    const w = extractWeight(lower) || activeWeightKg;
    const bolusMl = Math.round(w * 1.5);
    const infusionRateMlHr = Math.round(w * 0.25 * 60);

    return {
      rawQuery: query,
      type: 'EMERGENCY',
      titleEn: `LAST Protocol: 20% Lipid Emulsion (${w} kg)`,
      titleId: `Protokol LAST: Emulsi Lipid 20% (${w} kg)`,
      subtitleEn: `Bolus: ${bolusMl} mL IV over 2–3 min. Infusion: ${infusionRateMlHr} mL/hr (0.25 mL/kg/min).`,
      subtitleId: `Bolus: ${bolusMl} mL IV dlm 2–3 mnt. Infus: ${infusionRateMlHr} mL/jam (0.25 mL/kg/mnt).`,
      speakTextEn: `Local Anesthetic Toxicity protocol for ${w} kilograms: Give 20 percent lipid emulsion bolus of ${bolusMl} milliliters IV over 2 to 3 minutes, then infuse at ${infusionRateMlHr} milliliters per hour.`,
      speakTextId: `Protokol toksisitas anestesi lokal untuk ${w} kilogram: Berikan bolus emulsi lipid 20 persen sebesar ${bolusMl} mililiter IV dalam 2 sampai 3 menit, lalu infus ${infusionRateMlHr} mililiter per jam.`,
      badge: { label: 'CRISIS: LAST', color: 'rose' },
      details: {
        doseValue: bolusMl,
        doseUnit: 'mL',
        route: 'IV Bolus + Continuous Infusion',
        preparation: '20% Lipid Emulsion (Intralipid / Lipovenös)',
        clinicalPearls: {
          en: 'Repeat bolus once or twice for persistent cardiovascular collapse; double infusion to 0.5 mL/kg/min. Max total dose: 12 mL/kg.',
          id: 'Ulangi bolus 1–2 kali jika kolaps sirkulasi berlanjut; tingkatkan infus ke 0.5 mL/kg/mnt. Batas maksimal: 12 mL/kg.'
        },
        actionHref: '/emergency?tab=push_doses'
      }
    };
  }

  // Malignant Hyperthermia - Dantrolene
  if (
    /(?:malignant\s*hyperthermia|hipertermia\s*maligna|dantrolene|dantrolen|ryanodex)/i.test(lower)
  ) {
    const w = extractWeight(lower) || activeWeightKg;
    const initialDoseMg = Math.round(w * 2.5);
    const maxDoseMg = Math.round(w * 10);

    return {
      rawQuery: query,
      type: 'EMERGENCY',
      titleEn: `Malignant Hyperthermia: Dantrolene (${w} kg)`,
      titleId: `Hipertermia Maligna: Dantrolen (${w} kg)`,
      subtitleEn: `Initial: ${initialDoseMg} mg IV push (2.5 mg/kg). Repeat up to ${maxDoseMg} mg (10 mg/kg max).`,
      subtitleId: `Dosis awal: ${initialDoseMg} mg IV bolus cepat (2.5 mg/kg). Ulangi hingga maksimal ${maxDoseMg} mg (10 mg/kg).`,
      speakTextEn: `Malignant Hyperthermia protocol: Immediately give Dantrolene ${initialDoseMg} milligrams IV push for ${w} kilograms. Turn off volatile agents and hyperventilate with 100% oxygen.`,
      speakTextId: `Protokol Hipertermia Maligna: Segera berikan Dantrolen ${initialDoseMg} miligram IV bolus cepat untuk ${w} kilogram. Hentikan gas anestesi dan hiperventilasi oksigen 100 persen.`,
      badge: { label: 'CRISIS: MH', color: 'rose' },
      details: {
        doseValue: initialDoseMg,
        doseUnit: 'mg',
        maxDose: maxDoseMg,
        route: 'IV Rapid Bolus',
        preparation: 'Reconstitute each 20 mg vial with 60 mL sterile water (without bacteriostatic agent). Ryanodex: 250 mg in 5 mL.',
        clinicalPearls: {
          en: 'Call for help. Halt volatiles and succinylcholine. Switch to activated charcoal filters or change anesthesia circuit.',
          id: 'Panggil bantuan. Hentikan gas volatil dan suksinilkolin. Pasang filter karbon aktif atau ganti sirkuit pernapasan.'
        },
        actionHref: '/emergency?tab=push_doses'
      }
    };
  }

  // Anaphylaxis Epinephrine Protocol
  if (
    /(?:anaphylaxis|anafilaksis|anaphylactic|syok\s*anafilaktik)/i.test(lower)
  ) {
    const w = extractWeight(lower) || activeWeightKg;
    const isPediatric = w < 30;
    const imDoseMg = isPediatric ? Math.min(0.3, Math.round(w * 0.01 * 100) / 100) : 0.5;

    return {
      rawQuery: query,
      type: 'EMERGENCY',
      titleEn: `Anaphylaxis: Epinephrine 1:1,000 IM (${w} kg)`,
      titleId: `Anafilaksis: Epinefrin 1:1.000 IM (${w} kg)`,
      subtitleEn: `First-line IM Dose: ${imDoseMg} mg (${imDoseMg} mL of 1:1,000) mid-anterolateral thigh. Repeat in 5–15 min.`,
      subtitleId: `Dosis IM Lini Pertama: ${imDoseMg} mg (${imDoseMg} mL sediaan 1:1.000) paha anterolateral. Ulangi tiap 5–15 mnt.`,
      speakTextEn: `Anaphylaxis first-line treatment: Epinephrine ${imDoseMg} milligrams intramuscular into the anterolateral thigh. Do not delay for IV access.`,
      speakTextId: `Tatalaksana lini pertama anafilaksis: Berikan Epinefrin ${imDoseMg} miligram intramuskular di paha anterolateral. Jangan menunda untuk akses infus.`,
      soundAlikeAlert: soundAlike,
      badge: { label: 'CRISIS: ANAPHYLAXIS', color: 'rose' },
      details: {
        doseValue: imDoseMg,
        doseUnit: 'mg',
        route: 'Intramuscular (IM) Anterolateral Thigh',
        preparation: '1:1,000 ampule (1 mg/mL). Use undiluted for IM.',
        frequency: 'Every 5–15 minutes as needed for refractory hypotension/bronchospasm',
        actionHref: '/emergency?tab=push_doses'
      }
    };
  }

  // Status Epilepticus Protocol
  if (
    /(?:status\s*epilepticus|kejang|seizure\s*protocol|midazolam\s*seizure|dosis\s*kejang)/i.test(lower)
  ) {
    const w = extractWeight(lower) || activeWeightKg;
    const midazDose = Math.min(10, Math.round(w * 0.2 * 10) / 10);
    const lorazDose = Math.min(4, Math.round(w * 0.1 * 10) / 10);

    return {
      rawQuery: query,
      type: 'EMERGENCY',
      titleEn: `Status Epilepticus First-Line Protocol (${w} kg)`,
      titleId: `Protokol Lini Pertama Status Epileptikus (${w} kg)`,
      subtitleEn: `Midazolam ${midazDose} mg IM/IV (0.2 mg/kg, max 10 mg) OR Lorazepam ${lorazDose} mg IV (0.1 mg/kg, max 4 mg).`,
      subtitleId: `Midazolam ${midazDose} mg IM/IV (0.2 mg/kg, maks 10 mg) ATAU Lorazepam ${lorazDose} mg IV (0.1 mg/kg, maks 4 mg).`,
      speakTextEn: `Status Epilepticus: First-line Midazolam ${midazDose} milligrams IM or IV, or Lorazepam ${lorazDose} milligrams IV. Prepare second-line Levetiracetam 60 mg per kg if seizure exceeds 5 minutes.`,
      speakTextId: `Status Epileptikus: Lini pertama Midazolam ${midazDose} miligram IM atau IV, atau Lorazepam ${lorazDose} miligram IV. Siapkan Levetiracetam 60 mg per kg jika kejang melebihi 5 menit.`,
      badge: { label: 'CRISIS: SEIZURE', color: 'rose' },
      details: {
        doseValue: midazDose,
        doseUnit: 'mg',
        maxDose: 10,
        route: 'IM or Slow IV Push',
        preparation: 'Midazolam 5 mg/mL or Lorazepam 2 mg/mL',
        actionHref: '/emergency?tab=status_epilepticus'
      }
    };
  }

  // 4. NAVIGATION INTENTS
  const navRules: Array<{
    patterns: RegExp[];
    href: string;
    titleEn: string;
    titleId: string;
    subEn: string;
    subId: string;
    speakEn: string;
    speakId: string;
  }> = [
    {
      patterns: [/open\s+(?:or\s+)?crisis/i, /kartu\s*krisis/i, /buka\s*emergency/i, /resuscitation\s*suite/i],
      href: '/emergency',
      titleEn: 'Open Emergency / OR Crisis Card',
      titleId: 'Buka Kartu Krisis Anestesi / Resusitasi',
      subEn: 'Immediate access to push doses, ACLS cycles, and Broselow tape.',
      subId: 'Akses cepat dosis push krisis, ACLS, dan pita Broselow.',
      speakEn: 'Opening emergency crisis card.',
      speakId: 'Membuka kartu krisis resusitasi.'
    },
    {
      patterns: [/pocus/i, /ultrasound/i, /usg/i, /efast/i, /blue\s*protocol/i],
      href: '/pocus',
      titleEn: 'Open POCUS Ultrasound Suite',
      titleId: 'Buka Modul USG POCUS Bedside',
      subEn: 'eFAST, BLUE protocol, FOCUS cardiac views, and vascular access.',
      subId: 'eFAST trauma, protokol BLUE, fokus jantung FOCUS, & akses vaskular.',
      speakEn: 'Opening point-of-care ultrasound suite.',
      speakId: 'Membuka modul USG POCUS bedside.'
    },
    {
      patterns: [/antimicrobial/i, /antimikroba/i, /antibiotic/i, /sbar/i, /stewardship/i],
      href: '/antimicrobial',
      titleEn: 'Open Antimicrobial Stewardship & SBAR',
      titleId: 'Buka Penatagunaan Antimikroba & SBAR',
      subEn: 'Empiric syndromic antibiotic therapy, renal clearance & SBAR PDF export.',
      subId: 'Terapi antibiotik empiris, penyesuaian ginjal & ekspor PDF SBAR.',
      speakEn: 'Opening antimicrobial stewardship suite.',
      speakId: 'Membuka modul penatagunaan antimikroba dan ekspor SBAR.'
    },
    {
      patterns: [/calculators?/i, /kalkulator/i, /risk\s*scores?/i],
      href: '/calculators',
      titleEn: 'Open Medical Calculators',
      titleId: 'Buka Kalkulator Medis',
      subEn: 'CrCl, eGFR, ABG acid-base, Wells, GCS, CURB-65, MELD-Na, and SOFA.',
      subId: 'Klirens ginjal, analisis BGA, Wells, GCS, CURB-65, MELD, dan SOFA.',
      speakEn: 'Opening medical calculators.',
      speakId: 'Membuka kalkulator medis dan skor risiko klinis.'
    },
    {
      patterns: [/dosage/i, /dosing\s*calculator/i, /hitung\s*dosis/i],
      href: '/dosage',
      titleEn: 'Open Weight-Based Dosage Calculator',
      titleId: 'Buka Kalkulator Dosis Berbasis Berat',
      subEn: 'Interactive pediatric & adult dosage calculations with safety caps.',
      subId: 'Kalkulasi dosis interaktif pediatrik & dewasa dengan batas aman.',
      speakEn: 'Opening dosage calculator.',
      speakId: 'Membuka kalkulator dosis obat.'
    },
    {
      patterns: [/ecg/i, /ekg/i, /simulator\s*ekg/i, /stemi/i],
      href: '/ecg',
      titleEn: 'Open 12-Lead ECG Simulator',
      titleId: 'Buka Simulator EKG 12-Lead',
      subEn: 'Interactive rhythm strips, STEMI patterns, and diagnostic drills.',
      subId: 'Gelombang EKG interaktif, pola STEMI, dan latihan interpretasi.',
      speakEn: 'Opening 12-lead ECG module.',
      speakId: 'Membuka modul EKG 12-lead.'
    },
    {
      patterns: [/formulary/i, /formularium/i, /drug\s*database/i, /daftar\s*obat/i],
      href: '/formulary',
      titleEn: 'Open Clinical Pharmacopeia & Formulary',
      titleId: 'Buka Formularium & Farmakope Klinis',
      subEn: '163 general hospital drugs with dosing, routes, and clinical pearls.',
      subId: '163 obat rumah sakit umum dengan dosis, rute, dan catatan klinis.',
      speakEn: 'Opening drug formulary.',
      speakId: 'Membuka formularium obat.'
    },
    {
      patterns: [/interactions?/i, /interaksi/i, /drug\s*safety/i],
      href: '/interactions',
      titleEn: 'Open Drug Interaction Checker',
      titleId: 'Buka Pemeriksa Interaksi Obat',
      subEn: 'Multi-drug contraindicated combinations & high-risk sedation matrices.',
      subId: 'Pemeriksaan kombinasi obat kontraindikasi & matriks sedasi berisiko.',
      speakEn: 'Opening drug interaction checker.',
      speakId: 'Membuka pemeriksa interaksi obat.'
    },
    {
      patterns: [/physical\s*exam/i, /pemeriksaan\s*fisik/i, /body\s*map/i, /peta\s*tubuh/i],
      href: '/physical-exam',
      titleEn: 'Open Physical Exam Guidelines & Body Map',
      titleId: 'Buka Panduan Pemeriksaan Fisik & Peta Tubuh',
      subEn: '2D anatomical body map with step-by-step examination techniques.',
      subId: 'Peta anatomi 2D dengan panduan langkah-langkah pemeriksaan fisik.',
      speakEn: 'Opening physical exam guidelines.',
      speakId: 'Membuka panduan pemeriksaan fisik.'
    },
    {
      patterns: [/guidelines?/i, /panduan\s*klinis/i, /ppk/i, /cpg/i],
      href: '/guidelines',
      titleEn: 'Open Clinical Practice Guidelines (CPGs)',
      titleId: 'Buka Panduan Praktik Klinis (PPK)',
      subEn: 'Evidence-based specialty guidelines for perioperative care.',
      subId: 'Panduan praktik klinis terstruktur untuk perawatan perioperatif.',
      speakEn: 'Opening clinical guidelines.',
      speakId: 'Membuka panduan praktik klinis.'
    },
    {
      patterns: [/icd\s*10/i, /diagnosis\s*code/i, /kode\s*icd/i, /cari\s*icd/i],
      href: '/icd10',
      titleEn: 'Open ICD-10 Diagnostic Search',
      titleId: 'Buka Pencarian Kode ICD-10',
      subEn: '14,000+ codes indexed for zero-latency offline diagnostic lookup.',
      subId: '14.000+ kode ICD-10 terindeks untuk pencarian offline cepat.',
      speakEn: 'Opening ICD-10 diagnostic search.',
      speakId: 'Membuka pencarian kode diagnosis ICD-10.'
    },
    {
      patterns: [/settings?/i, /pengaturan/i, /offline\s*sync/i, /sinkronisasi/i],
      href: '/settings',
      titleEn: 'Open Settings & Offline Sync',
      titleId: 'Buka Pengaturan & Sinkronisasi Offline',
      subEn: 'Manage offline datasets, API keys, and cache storage.',
      subId: 'Kelola data offline, kunci API, dan penyimpanan lokal.',
      speakEn: 'Opening settings.',
      speakId: 'Membuka menu pengaturan aplikasi.'
    },
    {
      patterns: [/dashboard/i, /dasbor/i, /home/i, /beranda/i],
      href: '/dashboard',
      titleEn: 'Open Clinical Dashboard',
      titleId: 'Buka Dasbor Klinis',
      subEn: 'Command center with quick bedside tool launchers.',
      subId: 'Pusat komando dengan pintasan alat klinis bedside.',
      speakEn: 'Opening clinical dashboard.',
      speakId: 'Membuka dasbor utama klinis.'
    }
  ];

  for (const nav of navRules) {
    if (nav.patterns.some((p) => p.test(lower))) {
      return {
        rawQuery: query,
        type: 'NAVIGATION',
        titleEn: nav.titleEn,
        titleId: nav.titleId,
        subtitleEn: nav.subEn,
        subtitleId: nav.subId,
        speakTextEn: nav.speakEn,
        speakTextId: nav.speakId,
        badge: { label: 'NAVIGATION', color: 'cyan' },
        details: { actionHref: nav.href }
      };
    }
  }

  // 5. SPECIFIC MEDICAL CALCULATORS
  const calcRules: Array<{
    patterns: RegExp[];
    titleEn: string;
    titleId: string;
    subEn: string;
    subId: string;
    speakEn: string;
    speakId: string;
    href: string;
  }> = [
    {
      patterns: [/(?:crcl|cockcroft|klirens\s*ginjal|creatinine\s*clearance|klirens\s*kreatinin)/i],
      titleEn: 'Creatinine Clearance (Cockcroft-Gault)',
      titleId: 'Klirens Kreatinin (Cockcroft-Gault)',
      subEn: 'Calculate renal drug clearance from active weight, age, and serum Cr.',
      subId: 'Hitung klirens ginjal dari berat badan, usia, dan kreatinin serum.',
      speakEn: 'Opening Cockcroft-Gault creatinine clearance calculator.',
      speakId: 'Membuka kalkulator klirens kreatinin Cockcroft-Gault.',
      href: '/antimicrobial'
    },
    {
      patterns: [/(?:abg|bga|arterial\s*blood\s*gas|analisis\s*gas\s*darah|acid\s*base)/i],
      titleEn: '4-Step ABG Acid-Base Analyzer',
      titleId: 'Analisis Gas Darah (BGA) 4-Langkah',
      subEn: 'Metabolic/respiratory disorder, Anion Gap, Winter formula, and Delta-Delta.',
      subId: 'Gangguan metabolik/respiratorik, Anion Gap, rumus Winter, dan Delta-Delta.',
      speakEn: 'Opening arterial blood gas acid-base analyzer.',
      speakId: 'Membuka kalkulator analisis gas darah dan gangguan asam basa.',
      href: '/calculators'
    },
    {
      patterns: [/(?:wells\s*dvt|wells\s*pe|wells\s*score|skor\s*wells)/i],
      titleEn: 'Wells Score for DVT & Pulmonary Embolism',
      titleId: 'Skor Wells untuk DVT & Emboli Paru',
      subEn: 'Evidence-based clinical pre-test probability scoring with PERC criteria.',
      subId: 'Skor probabilitas klinis pra-tes DVT & PE terintegrasi kriteria PERC.',
      speakEn: 'Opening Wells score for thromboembolism.',
      speakId: 'Membuka skor Wells untuk DVT dan emboli paru.',
      href: '/calculators'
    },
    {
      patterns: [/(?:glasgow\s*coma|gcs)/i],
      titleEn: 'Glasgow Coma Scale (GCS & GCS-P)',
      titleId: 'Glasgow Coma Scale (GCS & GCS-P)',
      subEn: 'Eye, Verbal, Motor scoring with pupillary reactivity evaluation.',
      subId: 'Skoring Mata, Verbal, Motorik disertai evaluasi reaktivitas pupil.',
      speakEn: 'Opening Glasgow Coma Scale calculator.',
      speakId: 'Membuka kalkulator Glasgow Coma Scale.',
      href: '/calculators'
    },
    {
      patterns: [/(?:curb\s*65|curb|pneumonia\s*score)/i],
      titleEn: 'CURB-65 Pneumonia Severity Score',
      titleId: 'Skor Tingkat Keparahan Pneumonia CURB-65',
      subEn: 'Admission triage and 30-day mortality risk for community-acquired pneumonia.',
      subId: 'Triase rawat inap dan risiko mortalitas 30 hari pneumonia komunitas.',
      speakEn: 'Opening CURB-65 pneumonia severity score.',
      speakId: 'Membuka skor CURB-65 pneumonia.',
      href: '/calculators'
    },
    {
      patterns: [/(?:qsofa|sofa\s*score|skor\s*sofa|sepsis\s*criteria)/i],
      titleEn: 'qSOFA & SOFA Sepsis Criteria',
      titleId: 'Kriteria Sepsis qSOFA & SOFA',
      subEn: 'Rapid bedside screening and multi-organ dysfunction tracking in sepsis.',
      subId: 'Skrining cepat bedside dan pemantauan disfungsi organ pada sepsis.',
      speakEn: 'Opening SOFA and quick SOFA sepsis scoring.',
      speakId: 'Membuka kriteria sepsis SOFA dan quick SOFA.',
      href: '/calculators'
    },
    {
      patterns: [/(?:meld|child\s*pugh|liver\s*score|sirosis)/i],
      titleEn: 'MELD-Na & Child-Pugh Score',
      titleId: 'Skor MELD-Na & Child-Pugh',
      subEn: 'End-stage liver disease mortality risk and perioperative hepatic risk assessment.',
      subId: 'Risiko mortalitas penyakit hati stadium akhir & evaluasi risiko perioperatif.',
      speakEn: 'Opening MELD-Na and Child-Pugh liver score.',
      speakId: 'Membuka skor penyakit hati MELD-Na dan Child-Pugh.',
      href: '/calculators'
    },
    {
      patterns: [/(?:heart\s*score|chest\s*pain\s*score)/i],
      titleEn: 'HEART Score for Chest Pain',
      titleId: 'Skor HEART untuk Nyeri Dada Akut',
      subEn: 'Risk stratification for major adverse cardiac events (MACE) in the ED.',
      subId: 'Stratifikasi risiko kejadian kardiovaskular mayor di instalasi gawat darurat.',
      speakEn: 'Opening HEART score for emergency chest pain risk stratification.',
      speakId: 'Membuka skor HEART untuk stratifikasi risiko nyeri dada.',
      href: '/calculators'
    },
    {
      patterns: [/(?:ett\s*size|ett\s*depth|endotracheal\s*tube|kedalaman\s*ett|ukuran\s*ett)/i],
      titleEn: 'Endotracheal Tube (ETT) Size & Depth Guide',
      titleId: 'Panduan Ukuran & Kedalaman Pipa Endotrakeal (ETT)',
      subEn: 'Pediatric age-based cuffed/uncuffed formulas and lip insertion depths.',
      subId: 'Rumus pipa ETT bertali / tanpa tali berbasis usia pediatrik dan kedalaman insersi.',
      speakEn: 'Opening endotracheal tube sizing and depth guidelines.',
      speakId: 'Membuka panduan ukuran dan kedalaman ETT.',
      href: '/calculators'
    },
    {
      patterns: [/(?:mean\s*arterial\s*pressure|hitung\s*map|map\s*calculator)/i],
      titleEn: 'Mean Arterial Pressure (MAP) Calculator',
      titleId: 'Kalkulator Tekanan Arteri Rata-rata (MAP)',
      subEn: 'MAP = [SBP + (2 × DBP)] / 3. Vital organ perfusion threshold: 65 mmHg.',
      subId: 'MAP = [TDS + (2 × TDD)] / 3. Batas perfusi organ vital: 65 mmHg.',
      speakEn: 'Opening Mean Arterial Pressure calculator.',
      speakId: 'Membuka kalkulator MAP tekanan arteri rata-rata.',
      href: '/calculators'
    }
  ];

  for (const c of calcRules) {
    if (c.patterns.some((p) => p.test(lower))) {
      return {
        rawQuery: query,
        type: 'CALCULATOR',
        titleEn: c.titleEn,
        titleId: c.titleId,
        subtitleEn: c.subEn,
        subtitleId: c.subId,
        speakTextEn: c.speakEn,
        speakTextId: c.speakId,
        badge: { label: 'CALCULATOR', color: 'blue' },
        details: { actionHref: c.href }
      };
    }
  }

  // 6. PHARMACOPEIA & DRUG DOSAGE LOOKUP (163 DRUGS)
  // Match drug name in query
  const extractedWeightKg = extractWeight(lower) || activeWeightKg;

  // Find best matching drug from DRUG_DB
  let matchedDrug: Drug | null = null;

  // Normalize search tokens
  // Strip common filler words
  const cleanTokens = lower
    .replace(/(?:dosis|dose|give|berikan|hitung|calculate|for|untuk|patient|pasien|mg|kg|kilo|kilos|kilogram|mcg|bolus|infusion|infus|iv|im)/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 2);

  for (const drug of DRUG_DB) {
    const genericLower = drug.genericName.toLowerCase();
    const idLower = drug.id.toLowerCase();
    const brandLowers = (drug.brandNames || []).map((b) => b.toLowerCase());

    // Check direct substring
    if (cleanTokens.some((tok) => genericLower.includes(tok) || idLower.includes(tok) || brandLowers.some((b) => b.includes(tok)))) {
      matchedDrug = drug;
      break;
    }
  }

  if (matchedDrug) {
    const dosePerKg = matchedDrug.dosing.dosePerKg || 0;
    const unit = matchedDrug.dosing.unit || 'mg';
    let rawTotalDose = dosePerKg * extractedWeightKg;
    let isCapped = false;
    let finalDose = rawTotalDose;

    if (matchedDrug.dosing.maxDose && finalDose > matchedDrug.dosing.maxDose) {
      finalDose = matchedDrug.dosing.maxDose;
      isCapped = true;
    }

    // Rounding nicely for clinical use
    const roundedDose = finalDose >= 10 ? Math.round(finalDose) : Math.round(finalDose * 100) / 100;
    const drugName = matchedDrug.genericName;
    const route = matchedDrug.dosing.bolusDose || 'IV';
    const frequency = matchedDrug.dosing.frequency || 'Once';

    const titleEn = `${drugName} Dose (${extractedWeightKg} kg)`;
    const titleId = `Dosis ${drugName} (${extractedWeightKg} kg)`;
    const subEn = `Calculated: ${roundedDose} ${unit} (${dosePerKg} ${unit}/kg). ${isCapped ? `⚠️ Capped at max ${matchedDrug.dosing.maxDose} ${unit}.` : ''} Route: ${route}.`;
    const subId = `Dosis: ${roundedDose} ${unit} (${dosePerKg} ${unit}/kg). ${isCapped ? `⚠️ Dibatasi dosis maksimal ${matchedDrug.dosing.maxDose} ${unit}.` : ''} Rute: ${route}.`;

    const speakEn = `${drugName} calculated dose is ${roundedDose} ${unit} for ${extractedWeightKg} kilograms. ${isCapped ? 'Capped at clinical maximum dose.' : ''}`;
    const speakId = `Dosis terhitung ${drugName} adalah ${roundedDose} ${unit} untuk ${extractedWeightKg} kilogram. ${isCapped ? 'Dibatasi pada batas maksimal aman.' : ''}`;

    return {
      rawQuery: query,
      type: 'DRUG_DOSAGE',
      titleEn,
      titleId,
      subtitleEn: subEn,
      subtitleId: subId,
      speakTextEn: speakEn,
      speakTextId: speakId,
      soundAlikeAlert: soundAlike,
      badge: { label: isCapped ? 'CAPPED DOSE' : 'DRUG DOSAGE', color: isCapped ? 'amber' : 'purple' },
      details: {
        doseValue: roundedDose,
        doseUnit: unit,
        maxDose: matchedDrug.dosing.maxDose,
        route,
        frequency,
        clinicalPearls: matchedDrug.clinicalPearls,
        extractedWeightKg,
        isCapped,
        actionHref: `/dosage?search=${encodeURIComponent(matchedDrug.genericName)}`
      }
    };
  }

  // 7. UNKNOWN / FALLBACK QUERY
  return {
    rawQuery: query,
    type: 'UNKNOWN',
    titleEn: `Query: "${query}"`,
    titleId: `Pencarian: "${query}"`,
    subtitleEn: 'Voice command not recognized. Tap to search all clinical tools and calculators.',
    subtitleId: 'Perintah suara tidak dikenali. Ketuk untuk mencari semua alat klinis & kalkulator.',
    speakTextEn: `I did not recognize the clinical command "${query}". Try saying a drug name, emergency protocol, or calculator.`,
    speakTextId: `Perintah klinis "${query}" belum dikenali. Coba sebutkan nama obat, protokol darurat, atau nama kalkulator.`,
    soundAlikeAlert: soundAlike,
    badge: { label: 'UNRECOGNIZED', color: 'amber' },
    details: {
      actionHref: `/calculators`
    }
  };
}
