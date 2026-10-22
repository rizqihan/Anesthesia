/**
 * Antimicrobial Stewardship & Renal Clearance Guidance Engine
 * Evidence-based syndromic regimens, pathogen spectrum coverage,
 * Cockcroft-Gault & CKD-EPI renal cutoff adjustments, and high-contrast safety alerts.
 */

export interface CkdEpi2021Input {
  creatinine: number;
  age: number;
  sex: 'M' | 'F';
}

export interface CkdEpi2021Result {
  egfr: number;
  stage: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
  description: string;
  dosingRecommendation: string;
}

export function calculateCkdEpi2021(input: CkdEpi2021Input): CkdEpi2021Result {
  const creatinine = typeof input.creatinine === 'number' && !isNaN(input.creatinine) && input.creatinine > 0 ? Math.max(0.1, input.creatinine) : 0.1;
  const age = typeof input.age === 'number' && !isNaN(input.age) && input.age > 0 ? Math.max(18, input.age) : 50;
  const sex = input.sex === 'F' ? 'F' : 'M';
  const isFemale = sex === 'F';
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;

  const scrOverKappa = creatinine / kappa;
  const minRatio = Math.min(scrOverKappa, 1);
  const maxRatio = Math.max(scrOverKappa, 1);

  const egfrRaw =
    142 *
    Math.pow(minRatio, alpha) *
    Math.pow(maxRatio, -1.2) *
    Math.pow(0.9938, age) *
    (isFemale ? 1.012 : 1.0);

  const egfr = Math.round(egfrRaw);

  let stage: CkdEpi2021Result['stage'] = 'G1';
  let description = 'Normal or high kidney function';
  let dosingRecommendation = 'Standard dosing for renally excreted drugs and volatile anesthetics.';

  if (egfr < 15) {
    stage = 'G5';
    description = 'Kidney failure (ESKD)';
    dosingRecommendation = 'Severely impaired renal clearance. Avoid renally cleared neuromuscular blockers (Pancuronium). Reduce maintenance rocuronium/vecuronium doses. Avoid NSAIDs. High risk of morphine-6-glucuronide toxicity.';
  } else if (egfr < 30) {
    stage = 'G4';
    description = 'Severely decreased kidney function';
    dosingRecommendation = 'Adjust doses of renally cleared antibiotics (Vancomycin, Aminoglycosides), anticoagulants, and sedatives. Strict fluid stewardship.';
  } else if (egfr < 45) {
    stage = 'G3b';
    description = 'Moderately to severely decreased function';
    dosingRecommendation = 'Dose adjustments required for drugs with narrow therapeutic windows and predominant renal clearance.';
  } else if (egfr < 60) {
    stage = 'G3a';
    description = 'Mildly to moderately decreased function';
    dosingRecommendation = 'Mild dose caution with renally cleared drugs. Maintain hemodynamic stability (MAP >= 65).';
  } else if (egfr < 90) {
    stage = 'G2';
    description = 'Mildly decreased kidney function';
    dosingRecommendation = 'Normal anesthetic agent handling. Ensure normovolemia.';
  }

  return {
    egfr,
    stage,
    description,
    dosingRecommendation,
  };
}

export interface ActiveCaseInput {
  patientWeight: string;
  patientHeight?: string;
  patientAge: string;
  patientSex: 'M' | 'F';
  asaClass?: string;
  mallampati?: string;
}

export interface PatientLabsInput {
  serumCreatinine?: string;
  bloodUreaNitrogen?: string;
  sodium?: string;
  potassium?: string;
  chloride?: string;
  bicarbonate?: string;
  glucose?: string;
  albumin?: string;
  totalBilirubin?: string;
  platelets?: string;
  inr?: string;
}

// ==========================================
// 1. PATHOGEN COVERAGE SPECTRUM
// ==========================================

export type PathogenSpectrum =
  | 'gram_positive'
  | 'gram_negative'
  | 'anaerobes'
  | 'mrsa'
  | 'pseudomonas'
  | 'atypicals';

export interface SpectrumBadge {
  id: PathogenSpectrum;
  label: string;
  shortLabel: string;
  badgeClass: string;
  bgHex: string;
  textHex: string;
}

export const PATHOGEN_SPECTRUM_LIST: SpectrumBadge[] = [
  {
    id: 'gram_positive',
    label: 'Gram-Positive',
    shortLabel: 'Gram+',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    bgHex: '#6366f1',
    textHex: '#c7d2fe',
  },
  {
    id: 'gram_negative',
    label: 'Gram-Negative',
    shortLabel: 'Gram-',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    bgHex: '#06b6d4',
    textHex: '#a5f3fc',
  },
  {
    id: 'anaerobes',
    label: 'Anaerobes',
    shortLabel: 'Anaerobes',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    bgHex: '#10b981',
    textHex: '#a7f3d0',
  },
  {
    id: 'mrsa',
    label: 'Methicillin-Resistant S. aureus',
    shortLabel: 'MRSA',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold',
    bgHex: '#f43f5e',
    textHex: '#fecdd3',
  },
  {
    id: 'pseudomonas',
    label: 'Pseudomonas aeruginosa',
    shortLabel: 'Pseudomonas',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold',
    bgHex: '#f59e0b',
    textHex: '#fde68a',
  },
  {
    id: 'atypicals',
    label: 'Atypical Organisms',
    shortLabel: 'Atypicals',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    bgHex: '#a855f7',
    textHex: '#e9d5ff',
  },
];

// ==========================================
// 2. RENAL ADJUSTMENT RULES & CUTOFFS
// ==========================================

export interface RenalCutoffTier {
  crclMin?: number;
  crclMax?: number;
  recommendedDose: string;
  interval: string;
  action: 'standard' | 'dose_reduction' | 'interval_extension' | 'contraindicated' | 'level_guided';
  warningLevel: 'normal' | 'moderate' | 'high' | 'critical';
  clinicalNote?: string;
}

export interface DrugRenalProfile {
  drugId: string;
  drugName: string;
  standardDose: string;
  standardInterval: string;
  standardRoute: string;
  targetTrough?: string;
  aucTarget?: string;
  dialysisGuideline: string;
  tiers: RenalCutoffTier[];
  neurotoxicityAlert?: {
    thresholdCrCl: number;
    title: string;
    description: string;
  };
  synergyNephrotoxicityAlert?: {
    interactingDrug: string;
    description: string;
  };
  contraindicationCrClThreshold?: number;
}

export const DRUG_RENAL_PROFILES: Record<string, DrugRenalProfile> = {
  cefepime: {
    drugId: 'cefepime',
    drugName: 'Cefepime (Maxipime)',
    standardDose: '2g',
    standardInterval: 'q8h',
    standardRoute: 'IV',
    dialysisGuideline: '1g IV loading dose, then 500mg IV q24h; administer post-hemodialysis on HD days.',
    neurotoxicityAlert: {
      thresholdCrCl: 30,
      title: 'CRITICAL: Cefepime Neurotoxicity Warning',
      description:
        'Cefepime crosses the blood-brain barrier. When CrCl < 30 mL/min, failure to adjust dose results in drug neuroaccumulation, causing non-convulsive status epilepticus, myoclonus, severe encephalopathy, and coma.',
    },
    tiers: [
      {
        crclMin: 60,
        recommendedDose: '2g',
        interval: 'q8h (severe) or 1–2g q12h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 30,
        crclMax: 59.9,
        recommendedDose: '2g',
        interval: 'q12h',
        action: 'interval_extension',
        warningLevel: 'moderate',
        clinicalNote: 'Moderate renal impairment: extend interval to q12h.',
      },
      {
        crclMin: 11,
        crclMax: 29.9,
        recommendedDose: '1g',
        interval: 'q24h',
        action: 'dose_reduction',
        warningLevel: 'high',
        clinicalNote: 'Severe impairment: reduce to 1g q24h to prevent neurotoxicity.',
      },
      {
        crclMax: 10.9,
        recommendedDose: '500mg',
        interval: 'q24h (1g loading)',
        action: 'dose_reduction',
        warningLevel: 'critical',
        clinicalNote: 'End-stage renal disease: 1g loading dose, then 500mg q24h post-HD.',
      },
    ],
  },

  piperacillin_tazobactam: {
    drugId: 'piperacillin_tazobactam',
    drugName: 'Piperacillin-Tazobactam (Zosyn)',
    standardDose: '4.5g (or 3.375g over 4h)',
    standardInterval: 'q6h (standard) or q8h (extended infusion)',
    standardRoute: 'IV',
    dialysisGuideline: '2.25g IV q8h; give supplemental 0.75g post-HD on dialysis days.',
    synergyNephrotoxicityAlert: {
      interactingDrug: 'Vancomycin',
      description:
        'Concurrent Piperacillin-Tazobactam + Vancomycin carries significantly elevated risk of synergistic acute kidney injury (AKI) compared to Cefepime + Vancomycin. Monitor daily SCr/CrCl.',
    },
    tiers: [
      {
        crclMin: 50,
        recommendedDose: '4.5g q6h (or 3.375g over 4h q8h)',
        interval: 'q6h standard / q8h extended',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 20,
        crclMax: 49.9,
        recommendedDose: '3.375g',
        interval: 'q6h',
        action: 'dose_reduction',
        warningLevel: 'moderate',
        clinicalNote: 'Reduce dose to 3.375g q6h for moderate impairment.',
      },
      {
        crclMax: 19.9,
        recommendedDose: '2.25g',
        interval: 'q6h',
        action: 'dose_reduction',
        warningLevel: 'high',
        clinicalNote: 'Severe renal impairment: reduce to 2.25g q6h (or 2.25g q8h in hemodialysis + 0.75g post-HD).',
      },
    ],
  },

  meropenem: {
    drugId: 'meropenem',
    drugName: 'Meropenem (Merrem)',
    standardDose: '1g (2g in meningitis)',
    standardInterval: 'q8h',
    standardRoute: 'IV',
    dialysisGuideline: '500mg IV q24h; administer dose after hemodialysis session.',
    tiers: [
      {
        crclMin: 50,
        recommendedDose: '1g (2g for CNS/meningitis)',
        interval: 'q8h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 26,
        crclMax: 49.9,
        recommendedDose: '1g',
        interval: 'q12h',
        action: 'interval_extension',
        warningLevel: 'moderate',
        clinicalNote: 'CrCl 26–50 mL/min: extend interval to q12h.',
      },
      {
        crclMin: 10,
        crclMax: 25.9,
        recommendedDose: '500mg',
        interval: 'q12h',
        action: 'dose_reduction',
        warningLevel: 'high',
        clinicalNote: 'CrCl 10–25 mL/min: reduce dose to 500mg and extend interval to q12h.',
      },
      {
        crclMax: 9.9,
        recommendedDose: '500mg',
        interval: 'q24h',
        action: 'dose_reduction',
        warningLevel: 'critical',
        clinicalNote: 'CrCl < 10 mL/min: reduce dose to 500mg q24h.',
      },
    ],
  },

  nitrofurantoin: {
    drugId: 'nitrofurantoin',
    drugName: 'Nitrofurantoin (Macrobid)',
    standardDose: '100mg',
    standardInterval: 'q12h (BID)',
    standardRoute: 'PO',
    contraindicationCrClThreshold: 30,
    dialysisGuideline: 'Strictly contraindicated in hemodialysis and peritoneal dialysis.',
    tiers: [
      {
        crclMin: 30,
        recommendedDose: '100mg',
        interval: 'q12h x 5 days',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMax: 29.9,
        recommendedDose: 'CONTRAINDICATED',
        interval: 'Do NOT use',
        action: 'contraindicated',
        warningLevel: 'critical',
        clinicalNote:
          'CONTRAINDICATED: When CrCl < 30 mL/min, nitrofurantoin fails to achieve adequate urinary bactericidal concentrations and causes toxic systemic accumulation, risking peripheral neuropathy and pulmonary fibrosis.',
      },
    ],
  },

  vancomycin: {
    drugId: 'vancomycin',
    drugName: 'Vancomycin (Vancocin)',
    standardDose: 'Loading 25–30 mg/kg, then 15–20 mg/kg',
    standardInterval: 'q8–12h',
    standardRoute: 'IV',
    targetTrough: '15–20 mcg/mL (severe/sepsis/meningitis/HAP); 10–15 mcg/mL (mild UTI/cellulitis)',
    aucTarget: 'AUC24/MIC 400–600 mg·h/L',
    dialysisGuideline:
      'Loading dose 25 mg/kg. Maintenance: 500–1000 mg IV post-dialysis, redosed only when pre-dialysis serum level is < 15–20 mcg/mL.',
    tiers: [
      {
        crclMin: 90,
        recommendedDose: '15–20 mg/kg (loading 25–30 mg/kg)',
        interval: 'q8–12h',
        action: 'standard',
        warningLevel: 'normal',
        clinicalNote: 'Normal clearance: measure trough 30 min before 4th dose. Target 15–20 mcg/mL.',
      },
      {
        crclMin: 50,
        crclMax: 89.9,
        recommendedDose: '15–20 mg/kg',
        interval: 'q12h',
        action: 'standard',
        warningLevel: 'normal',
        clinicalNote: 'Mild impairment: standard q12h dosing with trough monitoring.',
      },
      {
        crclMin: 20,
        crclMax: 49.9,
        recommendedDose: '15–20 mg/kg',
        interval: 'q24h',
        action: 'interval_extension',
        warningLevel: 'high',
        clinicalNote: 'Moderate impairment: extend interval to q24h. Monitor trough closely.',
      },
      {
        crclMax: 19.9,
        recommendedDose: '15–20 mg/kg loading once',
        interval: 'Redose by level (<15–20 mcg/mL)',
        action: 'level_guided',
        warningLevel: 'critical',
        clinicalNote: 'Severe impairment / Dialysis: single weight-based load; redose strictly based on random drug levels.',
      },
    ],
  },

  gentamicin_tobramycin: {
    drugId: 'gentamicin_tobramycin',
    drugName: 'Gentamicin / Tobramycin (Hartford Extended-Interval)',
    standardDose: '5–7 mg/kg (ideal/adjusted body weight)',
    standardInterval: 'q24h (Hartford nomogram)',
    standardRoute: 'IV',
    targetTrough: '< 1.0 mcg/mL (extended interval) or < 2.0 mcg/mL (conventional)',
    dialysisGuideline: 'Avoid extended interval; dose 1.5–2 mg/kg post-dialysis only.',
    tiers: [
      {
        crclMin: 60,
        recommendedDose: '5–7 mg/kg IV',
        interval: 'q24h',
        action: 'standard',
        warningLevel: 'normal',
        clinicalNote: 'CrCl >= 60 mL/min: q24h dosing. Check random level 6–14h post-dose on Hartford nomogram.',
      },
      {
        crclMin: 40,
        crclMax: 59.9,
        recommendedDose: '5–7 mg/kg IV',
        interval: 'q36h',
        action: 'interval_extension',
        warningLevel: 'moderate',
        clinicalNote: 'CrCl 40–59 mL/min: extend interval to q36h.',
      },
      {
        crclMin: 20,
        crclMax: 39.9,
        recommendedDose: '5–7 mg/kg IV',
        interval: 'q48h',
        action: 'interval_extension',
        warningLevel: 'high',
        clinicalNote: 'CrCl 20–39 mL/min: extend interval to q48h. Verify trough < 1 mcg/mL before redosing.',
      },
      {
        crclMax: 19.9,
        recommendedDose: 'AVOID extended interval',
        interval: 'Conventional 1.5–2 mg/kg initial, then by levels',
        action: 'level_guided',
        warningLevel: 'critical',
        clinicalNote: 'CrCl < 20 mL/min: Extended interval contraindicated. Use conventional dosing with pre-dose troughs.',
      },
    ],
  },

  amikacin: {
    drugId: 'amikacin',
    drugName: 'Amikacin',
    standardDose: '15–20 mg/kg IV',
    standardInterval: 'q24h',
    standardRoute: 'IV',
    targetTrough: '< 4–5 mcg/mL (extended interval) or < 10 mcg/mL (conventional)',
    dialysisGuideline: 'Conventional dosing 7.5 mg/kg post-dialysis.',
    tiers: [
      {
        crclMin: 60,
        recommendedDose: '15–20 mg/kg',
        interval: 'q24h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 40,
        crclMax: 59.9,
        recommendedDose: '15 mg/kg',
        interval: 'q36h',
        action: 'interval_extension',
        warningLevel: 'moderate',
      },
      {
        crclMin: 20,
        crclMax: 39.9,
        recommendedDose: '15 mg/kg',
        interval: 'q48h',
        action: 'interval_extension',
        warningLevel: 'high',
      },
      {
        crclMax: 19.9,
        recommendedDose: '7.5 mg/kg loading, redose by level',
        interval: 'Level-guided',
        action: 'level_guided',
        warningLevel: 'critical',
      },
    ],
  },

  levofloxacin: {
    drugId: 'levofloxacin',
    drugName: 'Levofloxacin (Levaquin)',
    standardDose: '750mg',
    standardInterval: 'q24h',
    standardRoute: 'IV/PO',
    dialysisGuideline: '750mg initial, then 500mg q48h; give post-dialysis.',
    tiers: [
      {
        crclMin: 50,
        recommendedDose: '750mg',
        interval: 'q24h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 20,
        crclMax: 49.9,
        recommendedDose: '750mg',
        interval: 'q48h (or 500mg initial then 250mg q24h)',
        action: 'interval_extension',
        warningLevel: 'moderate',
        clinicalNote: 'Extend 750mg interval to q48h or switch to 250mg q24h after load.',
      },
      {
        crclMax: 19.9,
        recommendedDose: '750mg initial, then 500mg',
        interval: 'q48h',
        action: 'dose_reduction',
        warningLevel: 'high',
        clinicalNote: 'Severe renal impairment: 750mg load, then 500mg q48h.',
      },
    ],
  },

  ceftriaxone: {
    drugId: 'ceftriaxone',
    drugName: 'Ceftriaxone (Rocephin)',
    standardDose: '1–2g (2g for meningitis)',
    standardInterval: 'q24h (q12h in meningitis)',
    standardRoute: 'IV',
    dialysisGuideline: 'No dosage adjustment required for renal impairment or hemodialysis.',
    tiers: [
      {
        crclMin: 0,
        recommendedDose: '1–2g (2g q12h in meningitis)',
        interval: 'q24h (q12h meningitis)',
        action: 'standard',
        warningLevel: 'normal',
        clinicalNote:
          'No renal dose adjustment required! Dual elimination via biliary and renal routes makes Ceftriaxone an ideal choice in acute kidney injury or dialysis.',
      },
    ],
  },

  ampicillin_sulbactam: {
    drugId: 'ampicillin_sulbactam',
    drugName: 'Ampicillin-Sulbactam (Unasyn)',
    standardDose: '1.5–3g',
    standardInterval: 'q6h',
    standardRoute: 'IV',
    dialysisGuideline: '1.5–3g IV q24h; administer post-dialysis.',
    tiers: [
      {
        crclMin: 50,
        recommendedDose: '1.5–3g',
        interval: 'q6h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 15,
        crclMax: 49.9,
        recommendedDose: '1.5–3g',
        interval: 'q12h',
        action: 'interval_extension',
        warningLevel: 'moderate',
      },
      {
        crclMax: 14.9,
        recommendedDose: '1.5–3g',
        interval: 'q24h',
        action: 'interval_extension',
        warningLevel: 'high',
      },
    ],
  },

  ampicillin: {
    drugId: 'ampicillin',
    drugName: 'Ampicillin',
    standardDose: '2g',
    standardInterval: 'q4h (meningitis)',
    standardRoute: 'IV',
    dialysisGuideline: '2g IV q12h; dose after hemodialysis.',
    tiers: [
      {
        crclMin: 50,
        recommendedDose: '2g',
        interval: 'q4h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 15,
        crclMax: 49.9,
        recommendedDose: '2g',
        interval: 'q6h',
        action: 'interval_extension',
        warningLevel: 'moderate',
      },
      {
        crclMax: 14.9,
        recommendedDose: '2g',
        interval: 'q12h',
        action: 'interval_extension',
        warningLevel: 'high',
      },
    ],
  },

  daptomycin: {
    drugId: 'daptomycin',
    drugName: 'Daptomycin (Cubicin)',
    standardDose: '6–8 mg/kg',
    standardInterval: 'q24h',
    standardRoute: 'IV',
    dialysisGuideline: '6–8 mg/kg IV q48h; administer after hemodialysis session.',
    tiers: [
      {
        crclMin: 30,
        recommendedDose: '6–8 mg/kg',
        interval: 'q24h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMax: 29.9,
        recommendedDose: '6–8 mg/kg',
        interval: 'q48h',
        action: 'interval_extension',
        warningLevel: 'high',
        clinicalNote: 'CrCl < 30 mL/min or HD: extend interval to q48h. Check baseline and weekly serum CPK for myopathy.',
      },
    ],
  },

  linezolid: {
    drugId: 'linezolid',
    drugName: 'Linezolid (Zyvox)',
    standardDose: '600mg',
    standardInterval: 'q12h',
    standardRoute: 'IV/PO',
    dialysisGuideline: 'No dosage adjustment required. Give after hemodialysis (HD removes ~30% of dose).',
    tiers: [
      {
        crclMin: 0,
        recommendedDose: '600mg',
        interval: 'q12h',
        action: 'standard',
        warningLevel: 'normal',
        clinicalNote:
          'No renal dose adjustment needed. Safe alternative to Vancomycin in severe renal failure or when avoiding nephrotoxicity.',
      },
    ],
  },

  metronidazole: {
    drugId: 'metronidazole',
    drugName: 'Metronidazole (Flagyl)',
    standardDose: '500mg',
    standardInterval: 'q8h',
    standardRoute: 'IV/PO',
    dialysisGuideline: 'Give 500mg q12h; supplemental 500mg post-hemodialysis.',
    tiers: [
      {
        crclMin: 15,
        recommendedDose: '500mg',
        interval: 'q8h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMax: 14.9,
        recommendedDose: '500mg',
        interval: 'q12h (or 50% dose)',
        action: 'dose_reduction',
        warningLevel: 'moderate',
        clinicalNote: 'Severe ESKD: reduce dose by 50% or extend to q12h.',
      },
    ],
  },

  ertapenem: {
    drugId: 'ertapenem',
    drugName: 'Ertapenem (Invanz)',
    standardDose: '1g',
    standardInterval: 'q24h',
    standardRoute: 'IV',
    dialysisGuideline: '500mg IV q24h; give 150mg supplement if dose given within 6h before HD.',
    tiers: [
      {
        crclMin: 30,
        recommendedDose: '1g',
        interval: 'q24h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMax: 29.9,
        recommendedDose: '500mg',
        interval: 'q24h',
        action: 'dose_reduction',
        warningLevel: 'high',
        clinicalNote: 'CrCl <= 30 mL/min: reduce dose by 50% to 500mg q24h.',
      },
    ],
  },

  ciprofloxacin: {
    drugId: 'ciprofloxacin',
    drugName: 'Ciprofloxacin (Cipro)',
    standardDose: '400mg IV / 500mg PO',
    standardInterval: 'q8–12h (IV) / q12h (PO)',
    standardRoute: 'IV/PO',
    dialysisGuideline: '250–500mg PO q24h or 200–400mg IV q24h post-dialysis.',
    tiers: [
      {
        crclMin: 30,
        recommendedDose: '400mg IV / 500mg PO',
        interval: 'q8–12h (IV) / q12h (PO)',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMax: 29.9,
        recommendedDose: '400mg IV / 250–500mg PO',
        interval: 'q18–24h',
        action: 'interval_extension',
        warningLevel: 'moderate',
        clinicalNote: 'CrCl < 30 mL/min: extend interval to q18–24h.',
      },
    ],
  },

  clindamycin: {
    drugId: 'clindamycin',
    drugName: 'Clindamycin (Cleocin)',
    standardDose: '600–900mg',
    standardInterval: 'q8h',
    standardRoute: 'IV',
    dialysisGuideline: 'No dosage adjustment required for renal impairment or dialysis.',
    tiers: [
      {
        crclMin: 0,
        recommendedDose: '600–900mg',
        interval: 'q8h',
        action: 'standard',
        warningLevel: 'normal',
        clinicalNote:
          'Hepatic elimination — no renal adjustment needed. Crucial in necrotizing fasciitis for suppression of Streptococcal toxin production (TSST-1/SPEA).',
      },
    ],
  },

  tmp_smx: {
    drugId: 'tmp_smx',
    drugName: 'Trimethoprim-Sulfamethoxazole (Bactrim)',
    standardDose: '1–2 DS tabs PO / 5–10 mg/kg/day IV (TMP)',
    standardInterval: 'q12h',
    standardRoute: 'IV/PO',
    dialysisGuideline: '50% dose post-hemodialysis.',
    tiers: [
      {
        crclMin: 30,
        recommendedDose: '1–2 DS tabs PO / standard IV',
        interval: 'q12h',
        action: 'standard',
        warningLevel: 'normal',
      },
      {
        crclMin: 15,
        crclMax: 29.9,
        recommendedDose: '50% of standard dose (1 DS tab)',
        interval: 'q12–24h',
        action: 'dose_reduction',
        warningLevel: 'moderate',
        clinicalNote: 'CrCl 15–30 mL/min: reduce dose by 50%. Monitor for hyperkalemia.',
      },
      {
        crclMax: 14.9,
        recommendedDose: 'NOT recommended / 50% with extreme caution',
        interval: 'q24h post-HD',
        action: 'dose_reduction',
        warningLevel: 'critical',
        clinicalNote: 'Avoid if CrCl < 15 mL/min unless no alternative. High risk of crystalluria and severe hyperkalemia.',
      },
    ],
  },
};

// ==========================================
// 3. EVIDENCE-BASED SYNDROMIC REGIMENS
// ==========================================

export interface SyndromeDrugItem {
  drugId: string;
  name: string;
  standardDoseText: string;
  route: string;
  spectrum: PathogenSpectrum[];
  rationale?: string;
}

export interface SyndromeScenario {
  id: string;
  title: string;
  subtitle: string;
  severity: 'outpatient' | 'inpatient_ward' | 'severe_icu' | 'septic_shock';
  patientCriteria: string;
  firstLineRegimen: {
    title: string;
    drugs: SyndromeDrugItem[];
    notes: string;
  };
  alternativeRegimen?: {
    title: string;
    drugs: SyndromeDrugItem[];
    notes: string;
  };
  duration: string;
  riskFactorsAlert?: string;
  clinicalPearls: string[];
}

export interface SyndromicCategory {
  id: 'pneumonia' | 'uti' | 'sepsis' | 'ssti' | 'iai' | 'meningitis';
  name: string;
  shortName: string;
  iconName: string;
  description: string;
  scenarios: SyndromeScenario[];
}

export const SYNDROMIC_CATEGORIES: SyndromicCategory[] = [
  // ──────────────────────────────────────────
  // 1. COMMUNITY-ACQUIRED PNEUMONIA (CAP)
  // ──────────────────────────────────────────
  {
    id: 'pneumonia',
    name: 'Community-Acquired Pneumonia (CAP)',
    shortName: 'Pneumonia',
    iconName: 'Activity',
    description: 'ATS/IDSA evidence-based guideline regimens for outpatient, medical ward, and severe ICU pneumonia.',
    scenarios: [
      {
        id: 'cap_outpatient_healthy',
        title: 'CAP: Outpatient (Healthy, No Comorbidities)',
        subtitle: 'No chronic cardiopulmonary disease, prior antibiotics, or immunosuppression',
        severity: 'outpatient',
        patientCriteria: 'No comorbidities (COPD, diabetes, CHF, CKD, liver disease, malignancy) and no antibiotics in past 90 days.',
        firstLineRegimen: {
          title: 'High-Dose Amoxicillin OR Doxycycline Monotherapy',
          drugs: [
            {
              drugId: 'amoxicillin',
              name: 'Amoxicillin',
              standardDoseText: '1g PO TID',
              route: 'PO',
              spectrum: ['gram_positive'],
              rationale: 'Overcomes intermediate penicillin-resistant S. pneumoniae.',
            },
          ],
          notes: 'Doxycycline 100mg PO BID is an equivalent first-line option. Macrolide monotherapy only if local pneumococcal resistance < 25%.',
        },
        alternativeRegimen: {
          title: 'Doxycycline Monotherapy',
          drugs: [
            {
              drugId: 'doxycycline',
              name: 'Doxycycline',
              standardDoseText: '100mg PO BID',
              route: 'PO',
              spectrum: ['gram_positive', 'atypicals'],
              rationale: 'Covers S. pneumoniae, M. pneumoniae, and C. pneumoniae.',
            },
          ],
          notes: 'Azithromycin 500mg day 1, then 250mg PO daily x 4 days only if local macrolide resistance < 25%.',
        },
        duration: '5 days (must be afebrile for >= 48 hours and clinically stable before discontinuing).',
        clinicalPearls: [
          'Procalcitonin and chest X-ray help differentiate viral versus bacterial etiology.',
          'Macrolide resistance in S. pneumoniae exceeds 30-40% across many regions; monotherapy is discouraged unless susceptibility is documented.',
        ],
      },
      {
        id: 'cap_outpatient_comorbid',
        title: 'CAP: Outpatient (With Comorbidities)',
        subtitle: 'COPD, Diabetes, CHF, CKD, Malignancy, Alcoholism, or Recent Antibiotics',
        severity: 'outpatient',
        patientCriteria: 'Chronic heart, lung, liver, or renal disease; diabetes; alcoholism; malignancy; or antibiotic use in past 90 days.',
        firstLineRegimen: {
          title: 'Combination Beta-Lactam + Macrolide / Doxycycline',
          drugs: [
            {
              drugId: 'amoxicillin_clavulanate',
              name: 'Amoxicillin-Clavulanate (Augmentin)',
              standardDoseText: '875/125mg PO BID or 2000/125mg PO BID',
              route: 'PO',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes'],
              rationale: 'Covers beta-lactamase producing H. influenzae and M. catarrhalis.',
            },
            {
              drugId: 'azithromycin',
              name: 'Azithromycin (or Doxycycline 100mg BID)',
              standardDoseText: '500mg day 1, then 250mg PO daily',
              route: 'PO',
              spectrum: ['atypicals'],
              rationale: 'Essential coverage for atypical pathogens (Legionella, Mycoplasma).',
            },
          ],
          notes: 'Alternative beta-lactams: Cefuroxime 500mg PO BID or Cefpodoxime 200mg PO BID.',
        },
        alternativeRegimen: {
          title: 'Respiratory Fluoroquinolone Monotherapy',
          drugs: [
            {
              drugId: 'levofloxacin',
              name: 'Levofloxacin',
              standardDoseText: '750mg PO daily',
              route: 'PO',
              spectrum: ['gram_positive', 'gram_negative', 'atypicals'],
              rationale: 'Monotherapy option with potent atypical and pneumococcal coverage.',
            },
          ],
          notes: 'Moxifloxacin 400mg PO daily is an equivalent option. Reserve fluoroquinolones for patients with severe beta-lactam allergies.',
        },
        duration: '5–7 days based on clinical stability and resolution of vital sign abnormalities.',
        clinicalPearls: [
          'Fluoroquinolones carry FDA black-box warnings for tendonitis, aortic aneurysm, QT prolongation, and CNS disturbances.',
        ],
      },
      {
        id: 'cap_inpatient_ward',
        title: 'CAP: Inpatient Medical Ward (Non-Severe)',
        subtitle: 'Admitted to general medical floor without shock or invasive ventilation',
        severity: 'inpatient_ward',
        patientCriteria: 'CURB-65 score >= 2 or PSI Class III–IV requiring hospital admission.',
        firstLineRegimen: {
          title: 'Ceftriaxone + Macrolide (Azithromycin)',
          drugs: [
            {
              drugId: 'ceftriaxone',
              name: 'Ceftriaxone',
              standardDoseText: '1–2g IV q24h',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'High bactericidal activity against Streptococcus pneumoniae.',
            },
            {
              drugId: 'azithromycin',
              name: 'Azithromycin',
              standardDoseText: '500mg IV/PO q24h',
              route: 'IV/PO',
              spectrum: ['atypicals'],
              rationale: 'Covers Legionella pneumophila and provides immunomodulatory benefits.',
            },
          ],
          notes: 'Alternative beta-lactam: Ampicillin-Sulbactam 1.5–3g IV q6h. If macrolide contraindicated, substitute Doxycycline 100mg IV/PO BID.',
        },
        alternativeRegimen: {
          title: 'Respiratory Fluoroquinolone Monotherapy',
          drugs: [
            {
              drugId: 'levofloxacin',
              name: 'Levofloxacin',
              standardDoseText: '750mg IV q24h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'atypicals'],
              rationale: 'Complete single-agent coverage for beta-lactam allergic patients.',
            },
          ],
          notes: 'Moxifloxacin 400mg IV q24h is an acceptable alternative (does not require renal adjustment).',
        },
        duration: '5 days minimum (step down to oral therapy once clinically improving, tolerating PO, afebrile 48h).',
        clinicalPearls: [
          'Routine addition of anaerobic coverage for aspiration pneumonia is NO LONGER recommended unless empyema or lung abscess is present.',
        ],
      },
      {
        id: 'cap_severe_icu',
        title: 'CAP: Severe Inpatient (ICU) ± MRSA / Pseudomonas',
        subtitle: 'Requiring mechanical ventilation or vasopressors, or with specific risk factors',
        severity: 'severe_icu',
        patientCriteria:
          'Major ATS criteria: Septic shock requiring vasopressors or acute respiratory failure requiring mechanical ventilation. Or 3+ minor criteria.',
        firstLineRegimen: {
          title: 'Beta-Lactam + Macrolide/FQ ± MRSA/Pseudomonas Coverage',
          drugs: [
            {
              drugId: 'ceftriaxone',
              name: 'Ceftriaxone (or Cefepime if Pseudomonas risk)',
              standardDoseText: '2g IV q24h',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'High-dose broad coverage.',
            },
            {
              drugId: 'azithromycin',
              name: 'Azithromycin (or Levofloxacin 750mg IV)',
              standardDoseText: '500mg IV q24h',
              route: 'IV',
              spectrum: ['atypicals'],
              rationale: 'Atypical and Legionella coverage.',
            },
          ],
          notes:
            'If MRSA risk present (prior isolation, hospitalization + IV abx in 90d): ADD Vancomycin (loading 25-30 mg/kg, target trough 15-20 mcg/mL) or Linezolid 600mg IV q12h. If Pseudomonas risk present: USE Cefepime 2g IV q8h or Piperacillin-Tazobactam 4.5g IV q6h or Meropenem 1g IV q8h PLUS Levofloxacin 750mg IV q24h.',
        },
        alternativeRegimen: {
          title: 'Full Antipseudomonal & Anti-MRSA Empiric Regimen',
          drugs: [
            {
              drugId: 'cefepime',
              name: 'Cefepime',
              standardDoseText: '2g IV q8h (adjust if CrCl < 30)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'pseudomonas'],
              rationale: 'Antipseudomonal beta-lactam.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Target trough 15–20 mcg/mL.',
            },
            {
              drugId: 'levofloxacin',
              name: 'Levofloxacin',
              standardDoseText: '750mg IV q24h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'pseudomonas', 'atypicals'],
              rationale: 'Double antipseudomonal coverage + atypical.',
            },
          ],
          notes: 'Obtain sputum/blood cultures and nasal MRSA PCR immediately to rapidly de-escalate within 48 hours.',
        },
        duration: '7 days minimum (guided by procalcitonin and clinical response).',
        riskFactorsAlert:
          'MRSA & Pseudomonas Risk Factors: Prior respiratory isolation, recent IV antibiotics within 90 days, bronchiectasis, or structural lung disease.',
        clinicalPearls: [
          'Negative nasal MRSA PCR has a 96–99% negative predictive value for MRSA pneumonia; discontinue Vancomycin if negative.',
          'Monitor Cefepime dosing strictly in renal impairment: neurotoxicity triggers confusion, myoclonus, and non-convulsive status epilepticus.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // 2. URINARY TRACT INFECTIONS (UTI)
  // ──────────────────────────────────────────
  {
    id: 'uti',
    name: 'Urinary Tract Infections (UTI & Pyelonephritis)',
    shortName: 'UTI',
    iconName: 'Droplet',
    description: 'Evidence-based antimicrobial regimens for acute cystitis, pyelonephritis, and catheter-associated urosepsis.',
    scenarios: [
      {
        id: 'uti_uncomplicated_cystitis',
        title: 'Acute Uncomplicated Cystitis (Female)',
        subtitle: 'Dysuria, frequency, urgency in non-pregnant, immunocompetent female without systemic symptoms',
        severity: 'outpatient',
        patientCriteria: 'Premenopausal, non-pregnant adult female; absence of fever, flank pain, or systemic signs of toxicity.',
        firstLineRegimen: {
          title: 'Nitrofurantoin (Macrobid) OR TMP-SMX DS',
          drugs: [
            {
              drugId: 'nitrofurantoin',
              name: 'Nitrofurantoin (Macrobid)',
              standardDoseText: '100mg PO BID x 5 days (CrCl >= 30 required)',
              route: 'PO',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'Minimal collateral damage to gut flora; high urinary concentration.',
            },
          ],
          notes: 'CONTRAINDICATED if CrCl < 30 mL/min! Alternative first-line: TMP-SMX 1 DS tab PO BID x 3 days (if local E. coli resistance < 20%) or Fosfomycin 3g PO single dose.',
        },
        alternativeRegimen: {
          title: 'TMP-SMX (Bactrim DS) or Fosfomycin Trometamol',
          drugs: [
            {
              drugId: 'tmp_smx',
              name: 'TMP-SMX (Bactrim DS)',
              standardDoseText: '1 DS tablet (160/800mg) PO BID x 3 days',
              route: 'PO',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'Use only if local E. coli resistance is known to be < 20%.',
            },
          ],
          notes: 'Second-line oral beta-lactams (if above unavailable): Cephalexin 500mg PO TID x 5–7 days or Amoxicillin-Clavulanate 500/125mg PO BID x 5–7 days.',
        },
        duration: 'Nitrofurantoin 5 days; TMP-SMX 3 days; Fosfomycin single dose.',
        clinicalPearls: [
          'Fluoroquinolones (Ciprofloxacin) should NOT be used for uncomplicated cystitis due to adverse effect profile and collateral resistance.',
          'Nitrofurantoin is strictly ineffective in pyelonephritis due to negligible renal tissue and blood concentrations.',
        ],
      },
      {
        id: 'uti_acute_pyelonephritis',
        title: 'Acute Uncomplicated Pyelonephritis',
        subtitle: 'Fever, flank pain, costovertebral angle tenderness, nausea/vomiting',
        severity: 'inpatient_ward',
        patientCriteria: 'Systemic signs of upper tract infection; outpatient candidate if tolerating oral fluids and non-toxic.',
        firstLineRegimen: {
          title: 'Ceftriaxone IV (Initial) followed by Oral Ciprofloxacin or TMP-SMX',
          drugs: [
            {
              drugId: 'ceftriaxone',
              name: 'Ceftriaxone',
              standardDoseText: '1–2g IV q24h (initial dose)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'High renal parenchymal concentrations; no renal adjustment needed.',
            },
          ],
          notes: 'Outpatient transition: Ciprofloxacin 500mg PO BID x 7 days or Levofloxacin 750mg PO daily x 5 days (if local FQ resistance < 10%). If resistance high, give Ceftriaxone 1g IV once then oral stepdown based on urine culture.',
        },
        alternativeRegimen: {
          title: 'Oral Fluoroquinolone (Ciprofloxacin / Levofloxacin)',
          drugs: [
            {
              drugId: 'ciprofloxacin',
              name: 'Ciprofloxacin',
              standardDoseText: '500mg PO BID x 7 days',
              route: 'PO',
              spectrum: ['gram_negative', 'pseudomonas'],
              rationale: 'High tissue and urinary bioavailability.',
            },
          ],
          notes: 'Levofloxacin 750mg PO daily x 5 days is an acceptable alternative.',
        },
        duration: '7 days for fluoroquinolones; 10–14 days for beta-lactams or TMP-SMX.',
        clinicalPearls: [
          'Always obtain urine and blood cultures prior to initiating antimicrobial therapy in pyelonephritis.',
          'If fever persists beyond 72 hours of appropriate therapy, perform renal ultrasound or CT to rule out perinephric abscess or obstruction (nephrolithiasis).',
        ],
      },
      {
        id: 'uti_cauti_complicated',
        title: 'Complicated UTI / Catheter-Associated UTI (CAUTI) & Urosepsis',
        subtitle: 'Indwelling Foley catheter, anatomical obstruction, male patient, or systemic urosepsis',
        severity: 'severe_icu',
        patientCriteria: 'Inpatient with Foley catheter in place, neurogenic bladder, urinary stone obstruction, or signs of septic shock.',
        firstLineRegimen: {
          title: 'Broad-Spectrum IV Antipseudomonal / Gram-Negative Regimen',
          drugs: [
            {
              drugId: 'cefepime',
              name: 'Cefepime',
              standardDoseText: '2g IV q8h (adjust if CrCl < 30)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'pseudomonas'],
              rationale: 'High urinary excretion and antipseudomonal efficacy.',
            },
          ],
          notes:
            'Alternatives: Piperacillin-Tazobactam 4.5g IV q6h OR Ceftriaxone 2g IV q24h (if low Pseudomonas risk). If high risk of Extended-Spectrum Beta-Lactamase (ESBL) producing Enterobacterales: USE Meropenem 1g IV q8h or Ertapenem 1g IV q24h. MANDATORY: Remove or exchange catheter if present > 2 weeks.',
        },
        alternativeRegimen: {
          title: 'Carbapenem (Meropenem) for ESBL Risk / Septic Shock',
          drugs: [
            {
              drugId: 'meropenem',
              name: 'Meropenem',
              standardDoseText: '1g IV q8h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes', 'pseudomonas'],
              rationale: 'Gold standard agent for ESBL-producing organisms and uroseptic shock.',
            },
          ],
          notes: 'If severe urosepsis with shock, add single-dose Aminoglycoside (Amikacin 15mg/kg or Gentamicin 5mg/kg) for rapid bactericidal synergy.',
        },
        duration: '7–14 days depending on promptness of defervescence and resolution of obstruction.',
        riskFactorsAlert:
          'ESBL Risk Factors: Prior colonization or infection with ESBL, recurrent UTIs, recent fluoroquinolone or 3rd-gen cephalosporin use in past 90 days, nursing home residence.',
        clinicalPearls: [
          'Do NOT treat asymptomatic bacteriuria in catheterized patients (except in pregnancy or prior to urologic instrumentation).',
          'Catheter exchange removes the bacterial biofilm and accelerates clinical cure.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // 3. SEPSIS & SEPTIC SHOCK
  // ──────────────────────────────────────────
  {
    id: 'sepsis',
    name: 'Sepsis & Septic Shock (Surviving Sepsis Campaign)',
    shortName: 'Sepsis',
    iconName: 'AlertOctagon',
    description: 'Immediate empiric broad-spectrum antimicrobial regimens within 1 hour of recognition with organ support.',
    scenarios: [
      {
        id: 'sepsis_broad_spectrum_empiric',
        title: 'Empiric Sepsis / Septic Shock (Immediate 1-Hour Bundle)',
        subtitle: 'Acute organ dysfunction (SOFA increase >= 2, lactate > 2 mmol/L, or vasopressor requirement)',
        severity: 'septic_shock',
        patientCriteria: 'Refractory hypotension (MAP < 65 despite 30 mL/kg crystalloids), hyperlactatemia, suspected acute systemic infection.',
        firstLineRegimen: {
          title: 'Vancomycin + Cefepime (or Piperacillin-Tazobactam / Meropenem)',
          drugs: [
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg IV (max 3000mg), then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Empiric MRSA coverage. Loading dose given regardless of renal function.',
            },
            {
              drugId: 'cefepime',
              name: 'Cefepime',
              standardDoseText: '2g IV q8h (adjust if CrCl < 30)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'pseudomonas'],
              rationale: 'Broad antipseudomonal Gram-negative coverage.',
            },
          ],
          notes:
            'Alternative Gram-negative agents: Piperacillin-Tazobactam 4.5g IV q6h (or 3.375g over 4h q8h) OR Meropenem 1g IV q8h (preferred if septic shock with multi-organ failure, severe neutropenia, or ESBL risk).',
        },
        alternativeRegimen: {
          title: 'Carbapenem Regimen (Meropenem + Vancomycin)',
          drugs: [
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Loading dose critical to rapidly achieve target AUC/MIC.',
            },
            {
              drugId: 'meropenem',
              name: 'Meropenem',
              standardDoseText: '1g IV q8h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes', 'pseudomonas'],
              rationale: 'Covers ESBL, Pseudomonas, and anaerobic intra-abdominal sources.',
            },
          ],
          notes:
            'If refractory septic shock with escalating vasopressors, consider double Gram-negative coverage: ADD single dose Amikacin 15-20 mg/kg IV or Tobramycin 5-7 mg/kg IV.',
        },
        duration: '7–10 days; daily re-evaluation for de-escalation based on culture results and procalcitonin trajectory.',
        riskFactorsAlert:
          'Nephrotoxicity Warning: Concomitant Vancomycin + Piperacillin-Tazobactam significantly increases acute kidney injury rate. Cefepime + Vancomycin or Meropenem + Vancomycin is safer in pre-existing renal impairment.',
        clinicalPearls: [
          'Administer antimicrobials within ONE HOUR of recognition of septic shock or sepsis (Surviving Sepsis Campaign Grade 1B).',
          'Vancomycin loading dose (25-30 mg/kg actual body weight) must NOT be reduced for renal impairment; only maintenance intervals are adjusted!',
          'Source control (abscess drainage, infected catheter removal, debridement) must be pursued within 6-12 hours.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // 4. SKIN & SOFT TISSUE INFECTIONS (SSTI)
  // ──────────────────────────────────────────
  {
    id: 'ssti',
    name: 'Skin & Soft Tissue Infections (SSTI)',
    shortName: 'SSTI',
    iconName: 'ShieldAlert',
    description: 'Cellulitis, purulent abscess, and life-threatening necrotizing fasciitis emergency protocols.',
    scenarios: [
      {
        id: 'ssti_nonpurulent_cellulitis',
        title: 'Non-Purulent Cellulitis / Erysipelas',
        subtitle: 'Spreading erythema, edema, warmth without fluctuant abscess or purulent drainage',
        severity: 'outpatient',
        patientCriteria: 'Predominantly caused by beta-hemolytic Streptococci (Streptococcus pyogenes) and MSSA.',
        firstLineRegimen: {
          title: 'Cefazolin IV (Inpatient) OR Cephalexin PO (Outpatient)',
          drugs: [
            {
              drugId: 'cefazolin',
              name: 'Cefazolin (or Cephalexin 500mg PO QID)',
              standardDoseText: '1–2g IV q8h (adjust if CrCl < 50)',
              route: 'IV',
              spectrum: ['gram_positive'],
              rationale: 'Potent bactericidal activity against MSSA and Streptococcus.',
            },
          ],
          notes: 'Outpatient: Cephalexin 500mg PO QID x 5 days. Severe penicillin allergy: Clindamycin 600mg IV q8h or 300–450mg PO TID.',
        },
        alternativeRegimen: {
          title: 'Clindamycin (Penicillin-Allergic)',
          drugs: [
            {
              drugId: 'clindamycin',
              name: 'Clindamycin',
              standardDoseText: '600mg IV q8h or 300–450mg PO TID',
              route: 'IV/PO',
              spectrum: ['gram_positive', 'anaerobes'],
              rationale: 'Alternative for severe beta-lactam allergic patients.',
            },
          ],
          notes: 'Verify local D-test or erythromycin-clindamycin cross-resistance.',
        },
        duration: '5 days (extend if no improvement, but erythema often expands during first 24-48 hours due to bacterial lysis).',
        clinicalPearls: [
          'Routine MRSA coverage is NOT necessary for typical non-purulent cellulitis in the absence of purulence, trauma, or MRSA colonization.',
          'Elevation of the affected extremity is critical to accelerate resolution of dependent edema.',
        ],
      },
      {
        id: 'ssti_purulent_mrsa_abscess',
        title: 'Purulent Abscess / Severe MRSA Cellulitis',
        subtitle: 'Fluctuant tender mass with purulent drainage, induration, or systemic toxicity',
        severity: 'inpatient_ward',
        patientCriteria: 'Incision and drainage is PRIMARY definitive treatment. Antibiotics indicated if systemic toxicity, severe cellulitis, or immunocompromise.',
        firstLineRegimen: {
          title: 'Vancomycin IV (Inpatient) OR TMP-SMX / Doxycycline (Outpatient)',
          drugs: [
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: '15–20 mg/kg IV q8–12h (target trough 10–15 mcg/mL)',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Standard inpatient bactericidal coverage for MRSA.',
            },
          ],
          notes: 'Alternative inpatient: Daptomycin 6–8 mg/kg IV q24h (or Linezolid 600mg IV/PO q12h). Outpatient oral options: TMP-SMX 1–2 DS tabs PO BID x 5–7 days OR Doxycycline 100mg PO BID x 5–7 days.',
        },
        alternativeRegimen: {
          title: 'Daptomycin (Vancomycin Alternative)',
          drugs: [
            {
              drugId: 'daptomycin',
              name: 'Daptomycin',
              standardDoseText: '6–8 mg/kg IV q24h (adjust if CrCl < 30)',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Rapid bactericidal activity against MRSA without nephrotoxicity.',
            },
          ],
          notes: 'Do NOT use Daptomycin for pulmonary infections (inactivated by pulmonary surfactant).',
        },
        duration: '5–7 days following adequate incision and drainage.',
        clinicalPearls: [
          'Simple uncomplicated abscesses < 2 cm without surrounding cellulitis or fever can be cured with Incision & Drainage alone.',
        ],
      },
      {
        id: 'ssti_necrotizing_fasciitis',
        title: 'Necrotizing Fasciitis (Surgical Emergency)',
        subtitle: 'Pain out of proportion, dishwater fluid, crepitus, hemorrhagic bullae, rapid progression',
        severity: 'septic_shock',
        patientCriteria: 'Type I polymicrobial (aerobes + anaerobes) or Type II monomicrobial (Group A Streptococcus / GAS). Immediate surgery consultation mandatory!',
        firstLineRegimen: {
          title: 'Vancomycin + Piperacillin-Tazobactam + Clindamycin (Antitoxin)',
          drugs: [
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Empiric MRSA coverage.',
            },
            {
              drugId: 'piperacillin_tazobactam',
              name: 'Piperacillin-Tazobactam (or Meropenem 1g q8h)',
              standardDoseText: '4.5g IV q6h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes', 'pseudomonas'],
              rationale: 'Broad Gram-negative and anaerobic coverage for polymicrobial necrotizing infection.',
            },
            {
              drugId: 'clindamycin',
              name: 'Clindamycin (Crucial Antitoxin Effect)',
              standardDoseText: '900mg IV q8h',
              route: 'IV',
              spectrum: ['gram_positive', 'anaerobes'],
              rationale:
                'CRUCIAL: Ribosomal protein synthesis inhibition (50S) halts bacterial production of Streptococcal toxic shock toxins (SPEA, SPEB, SPEC) and staphylococcal PVL!',
            },
          ],
          notes:
            'If salt-water exposure (Vibrio vulnificus suspicion): Add Doxycycline 100mg IV q12h. If fresh-water exposure (Aeromonas hydrophila): Ciprofloxacin or Cefepime.',
        },
        alternativeRegimen: {
          title: 'Meropenem + Vancomycin + Clindamycin',
          drugs: [
            {
              drugId: 'meropenem',
              name: 'Meropenem',
              standardDoseText: '1g IV q8h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes', 'pseudomonas'],
              rationale: 'Carbapenem broad coverage in septic shock.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Anti-MRSA coverage.',
            },
            {
              drugId: 'clindamycin',
              name: 'Clindamycin',
              standardDoseText: '900mg IV q8h',
              route: 'IV',
              spectrum: ['gram_positive', 'anaerobes'],
              rationale: 'Suppresses toxin synthesis (Eagle phenomenon antidote).',
            },
          ],
          notes: 'Immediate operative debridement within hours is the only definitive intervention that prevents mortality.',
        },
        duration: 'Until no further surgical debridement is needed, fever has resolved >= 48 hours, and hemodynamics are restored.',
        riskFactorsAlert:
          'SURGICAL EMERGENCY: Medical therapy without emergency surgical exploration and wide radical debridement carries a near 100% mortality rate. Do not delay operating room transfer for imaging.',
        clinicalPearls: [
          'Clindamycin is required because beta-lactams lose efficacy at high bacterial concentrations (the "Eagle effect"), whereas ribosomal protein synthesis inhibitors remain fully active.',
          'Gas on plain X-ray or CT has high specificity but low sensitivity (present in < 30% of early cases).',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // 5. INTRA-ABDOMINAL INFECTIONS (IAI)
  // ──────────────────────────────────────────
  {
    id: 'iai',
    name: 'Intra-Abdominal Infections (IAI & Peritonitis)',
    shortName: 'Intra-Abdominal',
    iconName: 'Activity',
    description: 'Empiric coverage for complicated community-acquired, high-risk, and postoperative healthcare peritonitis.',
    scenarios: [
      {
        id: 'iai_community_mild_moderate',
        title: 'Community-Acquired IAI (Mild-to-Moderate)',
        subtitle: 'Perforated appendicitis, localized diverticulitis, cholecystitis in stable patient',
        severity: 'inpatient_ward',
        patientCriteria: 'Non-critically ill, physiologically stable community-acquired peritonitis or intra-abdominal abscess.',
        firstLineRegimen: {
          title: 'Ceftriaxone + Metronidazole (or Ertapenem)',
          drugs: [
            {
              drugId: 'ceftriaxone',
              name: 'Ceftriaxone',
              standardDoseText: '1–2g IV q24h',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'Covers Enterobacterales and Streptococci.',
            },
            {
              drugId: 'metronidazole',
              name: 'Metronidazole',
              standardDoseText: '500mg IV/PO q8h',
              route: 'IV',
              spectrum: ['anaerobes'],
              rationale: 'Essential coverage for Bacteroides fragilis and colonic anaerobes.',
            },
          ],
          notes: 'Single-agent alternative: Ertapenem 1g IV q24h (convenient once-daily dosing with excellent anaerobic coverage; no pseudomonal coverage).',
        },
        alternativeRegimen: {
          title: 'Ertapenem Monotherapy',
          drugs: [
            {
              drugId: 'ertapenem',
              name: 'Ertapenem',
              standardDoseText: '1g IV q24h (500mg if CrCl <= 30)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes'],
              rationale: 'Complete single-agent coverage for community-acquired IAI.',
            },
          ],
          notes: 'Penicillin-allergic alternative: Ciprofloxacin 400mg IV q12h + Metronidazole 500mg IV q8h.',
        },
        duration: '4 days if adequate source control achieved (STOP-IT trial demonstrated 4 days is equivalent to 8 days).',
        clinicalPearls: [
          'Routine coverage for Enterococcus is NOT indicated in community-acquired mild-to-moderate IAI.',
          'STOP-IT Trial (NEJM 2015): In patients with adequate surgical/interventional source control, antibiotic therapy should be limited to 4 days.',
        ],
      },
      {
        id: 'iai_severe_healthcare_associated',
        title: 'Severe / Healthcare-Associated & Postoperative Peritonitis',
        subtitle: 'Postoperative anastomotic leak, prolonged ICU stay, or septic shock with peritonitis',
        severity: 'severe_icu',
        patientCriteria: 'Hospital-acquired or tertiary peritonitis, APACHE II >= 15, immunosuppressed, or failure of prior therapy.',
        firstLineRegimen: {
          title: 'Meropenem + Vancomycin ± Antifungal (Fluconazole/Echinocandin)',
          drugs: [
            {
              drugId: 'meropenem',
              name: 'Meropenem (or Pip-Tazo 4.5g q6h)',
              standardDoseText: '1g IV q8h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes', 'pseudomonas'],
              rationale: 'Broad coverage against ESBL Enterobacterales, Pseudomonas, and anaerobes.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Covers Enterococcus faecalis and MRSA.',
            },
          ],
          notes:
            'ADD Antifungal coverage (Fluconazole 400mg IV q24h or Caspofungin 70mg then 50mg IV daily) if: upper GI perforation, recurrent bowel perforation, heavy Candida colonization, or prolonged hospitalization.',
        },
        alternativeRegimen: {
          title: 'Piperacillin-Tazobactam + Vancomycin',
          drugs: [
            {
              drugId: 'piperacillin_tazobactam',
              name: 'Piperacillin-Tazobactam',
              standardDoseText: '4.5g IV q6h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'anaerobes', 'pseudomonas'],
              rationale: 'Antipseudomonal and anaerobic coverage with enterococcal activity.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'MRSA and ampicillin-resistant enterococci.',
            },
          ],
          notes: 'Monitor for synergistic nephrotoxicity with concurrent Vancomycin + Zosyn.',
        },
        duration: '7–10 days depending on ongoing source control and clinical resolution.',
        riskFactorsAlert:
          'Candida Risk Factors: Upper GI perforations (stomach/duodenum), necrotizing pancreatitis, prolonged ICU stay (>48h), broad-spectrum antibiotics, or recurrent bowel leak.',
        clinicalPearls: [
          'Immediate re-laparotomy or CT-guided drainage is paramount; antibiotics cannot sterilize necrotic tissue or persistent anastomotic leaks.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // 6. CNS / BACTERIAL MENINGITIS
  // ──────────────────────────────────────────
  {
    id: 'meningitis',
    name: 'Acute Bacterial Meningitis & CNS Infections',
    shortName: 'Meningitis',
    iconName: 'ShieldAlert',
    description: 'Empiric age-based regimens, Listeria monocytogenes coverage, and critical Dexamethasone timing.',
    scenarios: [
      {
        id: 'meningitis_age_under_50',
        title: 'Bacterial Meningitis: Age < 50 Years (Immunocompetent)',
        subtitle: 'Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae',
        severity: 'severe_icu',
        patientCriteria: 'Community-acquired meningitis in adults aged 18–49 without immunocompromising conditions.',
        firstLineRegimen: {
          title: 'Ceftriaxone 2g IV q12h + Vancomycin 15–20 mg/kg q8–12h + Dexamethasone',
          drugs: [
            {
              drugId: 'ceftriaxone',
              name: 'Ceftriaxone (High-Dose Meningeal)',
              standardDoseText: '2g IV q12h (Total 4g/day)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'Achieves high CSF concentrations against S. pneumoniae and N. meningitidis.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Essential for penicillin- and cephalosporin-resistant S. pneumoniae. Target trough 15–20 mcg/mL.',
            },
          ],
          notes:
            'CRITICAL DEXAMETHASONE TIMING: Administer Dexamethasone 10 mg IV (or 0.15 mg/kg) 10–20 minutes BEFORE or CONCURRENTLY WITH the first dose of antibiotics. Continue 10mg q6h x 4 days if S. pneumoniae is confirmed; discontinue if other pathogen identified.',
        },
        alternativeRegimen: {
          title: 'Penicillin / Cephalosporin Severe Allergy Regimen',
          drugs: [
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Target trough 15–20 mcg/mL.',
            },
            {
              drugId: 'moxifloxacin',
              name: 'Moxifloxacin (or Meropenem 2g q8h if non-IgE allergy)',
              standardDoseText: '400mg IV q24h',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'Excellent CSF penetration for S. pneumoniae and N. meningitidis.',
            },
          ],
          notes: 'If severe beta-lactam anaphylaxis, Chloramphenicol 25 mg/kg IV q6h is an alternative where available.',
        },
        duration: 'S. pneumoniae: 10–14 days; N. meningitidis: 7 days; H. influenzae: 7 days.',
        riskFactorsAlert:
          'Dexamethasone Benefit: Reduces mortality by ~50% and severe sensorineural hearing loss in Streptococcus pneumoniae meningitis. Giving steroids after antibiotics offers no benefit.',
        clinicalPearls: [
          'NEVER delay antibiotics for a lumbar puncture or CT scan! If imaging is required prior to LP, draw blood cultures and start antibiotics + dexamethasone immediately.',
          'Vancomycin CSF penetration is reduced by dexamethasone; maintain target trough at 15–20 mcg/mL.',
        ],
      },
      {
        id: 'meningitis_age_over_50_immunocompromised',
        title: 'Bacterial Meningitis: Age >= 50 or Immunocompromised',
        subtitle: 'S. pneumoniae, N. meningitidis, plus LISTERIA MONOCYTOGENES',
        severity: 'severe_icu',
        patientCriteria: 'Age >= 50 years, immunocompromise (corticosteroids, chemotherapy, biologicals, HIV), alcoholism, or pregnancy.',
        firstLineRegimen: {
          title: 'Ceftriaxone 2g q12h + Vancomycin + AMPICILLIN 2g IV q4h + Dexamethasone',
          drugs: [
            {
              drugId: 'ceftriaxone',
              name: 'Ceftriaxone',
              standardDoseText: '2g IV q12h',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative'],
              rationale: 'High CSF bactericidal activity.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: '15–20 mg/kg q8–12h (target trough 15–20)',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Coverage for penicillin-resistant S. pneumoniae.',
            },
            {
              drugId: 'ampicillin',
              name: 'Ampicillin (MANDATORY for Listeria)',
              standardDoseText: '2g IV q4h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive'],
              rationale:
                'MANDATORY: Cephalosporins have ZERO activity against Listeria monocytogenes due to lack of PBP3 affinity! Ampicillin is essential.',
            },
          ],
          notes:
            'If penicillin-allergic: substitute TMP-SMX (5 mg/kg trimethoprim IV q6–8h) for Listeria coverage! Administer Dexamethasone 10mg IV prior to or with first antibiotic dose.',
        },
        alternativeRegimen: {
          title: 'Penicillin-Allergic Listeria Regimen (TMP-SMX + Vancomycin + Moxifloxacin)',
          drugs: [
            {
              drugId: 'tmp_smx',
              name: 'TMP-SMX (for Listeria monocytogenes)',
              standardDoseText: '5 mg/kg (TMP component) IV q6–8h',
              route: 'IV',
              spectrum: ['gram_positive'],
              rationale: 'First-line alternative for Listeria in penicillin-allergic patients.',
            },
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: '15–20 mg/kg IV q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Covers resistant pneumococcus.',
            },
          ],
          notes: 'Add Moxifloxacin 400mg IV q24h for Gram-negative and Neisseria coverage.',
        },
        duration: 'Listeria monocytogenes: 21 days minimum (long course required to clear intracellular pathogen); S. pneumoniae: 10–14 days.',
        riskFactorsAlert:
          'Listeria Danger: Listeria monocytogenes is intrinsically resistant to ALL cephalosporins. Omitting Ampicillin in patients >= 50 years or immunocompromised carries fatal consequences.',
        clinicalPearls: [
          'Discontinue Dexamethasone if Listeria monocytogenes is confirmed on CSF Gram stain/culture (steroids have not shown benefit and may impair intracellular clearance).',
          'Listeria causes rhombencephalitis (brainstem encephalitis) with ataxia, cranial nerve palsies, and altered sensorium.',
        ],
      },
      {
        id: 'meningitis_post_neurosurgical',
        title: 'Healthcare-Associated / Post-Neurosurgical Meningitis',
        subtitle: 'Post-craniotomy, external ventricular drain (EVD), ventriculoperitoneal (VP) shunt, penetrating trauma',
        severity: 'severe_icu',
        patientCriteria: 'Meningitis occurring within 1 year of neurosurgical intervention or in patients with indwelling CSF catheters/shunts.',
        firstLineRegimen: {
          title: 'Vancomycin + Meropenem 2g IV q8h (or Cefepime 2g IV q8h)',
          drugs: [
            {
              drugId: 'vancomycin',
              name: 'Vancomycin',
              standardDoseText: 'Loading 25–30 mg/kg, then 15–20 mg/kg q8–12h',
              route: 'IV',
              spectrum: ['gram_positive', 'mrsa'],
              rationale: 'Covers MRSA, MRSE (Staphylococcus epidermidis), and Corynebacterium.',
            },
            {
              drugId: 'meropenem',
              name: 'Meropenem (High-Dose CNS)',
              standardDoseText: '2g IV q8h (adjust for CrCl)',
              route: 'IV',
              spectrum: ['gram_positive', 'gram_negative', 'pseudomonas'],
              rationale: 'High meningeal penetration for Pseudomonas aeruginosa and Acinetobacter baumannii.',
            },
          ],
          notes: 'Alternative Gram-negative agent: Cefepime 2g IV q8h. If infected hardware (shunt/EVD) present, surgical hardware removal or externalization is required for cure.',
        },
        duration: '10–14 days for coagulase-negative staphylococci; 21 days for Gram-negative bacilli (Pseudomonas).',
        clinicalPearls: [
          'Intraventricular antimicrobials (Vancomycin 10–20 mg/day or Colistin) may be considered if CSF remains culture-positive despite intravenous therapy.',
        ],
      },
    ],
  },
];

// ==========================================
// 4. COMPUTED RENAL CALCULATION FUNCTIONS
// ==========================================

export interface CockcroftGaultResult {
  crcl: number;
  stage: 'normal' | 'mild' | 'moderate' | 'severe' | 'esrd';
  stageDescription: string;
  isAdjustedRequired: boolean;
}

/**
 * Calculates Cockcroft-Gault Creatinine Clearance (CrCl) in mL/min.
 * Formula: [(140 - Age) * Weight (kg)] / [72 * Serum Creatinine (mg/dL)] * (0.85 if Female)
 */
export function calculateCockcroftGault(
  age: number,
  weightKg: number,
  serumCrMgDl: number,
  sex: 'M' | 'F'
): CockcroftGaultResult {
  const safeAge = Math.max(18, Math.min(120, age || 50));
  const safeWeight = Math.max(10, Math.min(300, weightKg || 70));
  const safeCr = Math.max(0.1, Math.min(25, serumCrMgDl || 1.0));

  let crclRaw = ((140 - safeAge) * safeWeight) / (72 * safeCr);
  if (sex === 'F') {
    crclRaw *= 0.85;
  }

  const crcl = Math.round(crclRaw * 10) / 10;

  let stage: CockcroftGaultResult['stage'] = 'normal';
  let stageDescription = 'Normal Renal Function (CrCl >= 90 mL/min)';
  let isAdjustedRequired = false;

  if (crcl < 15) {
    stage = 'esrd';
    stageDescription = 'Kidney Failure / ESRD (CrCl < 15 mL/min)';
    isAdjustedRequired = true;
  } else if (crcl < 30) {
    stage = 'severe';
    stageDescription = 'Severe Renal Impairment (CrCl 15–29 mL/min)';
    isAdjustedRequired = true;
  } else if (crcl < 60) {
    stage = 'moderate';
    stageDescription = 'Moderate Renal Impairment (CrCl 30–59 mL/min)';
    isAdjustedRequired = true;
  } else if (crcl < 90) {
    stage = 'mild';
    stageDescription = 'Mild Renal Impairment (CrCl 60–89 mL/min)';
    isAdjustedRequired = false;
  }

  return {
    crcl,
    stage,
    stageDescription,
    isAdjustedRequired,
  };
}

export interface PatientRenalMetrics {
  crcl: number;
  egfr: number;
  ckdStage: string;
  crclStage: CockcroftGaultResult['stage'];
  stageDescription: string;
  hasRenalImpairment: boolean;
  isCreatinineAvailable: boolean;
  age: number;
  weight: number;
  sex: 'M' | 'F';
  serumCr: number;
}

/**
 * Computes live active patient renal clearance HUD metrics from App Store context.
 */
export function calculatePatientRenalMetrics(
  activeCase: ActiveCaseInput,
  patientLabs?: PatientLabsInput
): PatientRenalMetrics {
  const age = parseFloat(activeCase.patientAge) || 45;
  const weight = parseFloat(activeCase.patientWeight) || 70;
  const sex = activeCase.patientSex === 'F' ? 'F' : 'M';
  const rawCr = patientLabs?.serumCreatinine;
  const serumCr = rawCr && parseFloat(rawCr) > 0 ? parseFloat(rawCr) : 1.0;
  const isCreatinineAvailable = Boolean(rawCr && parseFloat(rawCr) > 0);

  const cg = calculateCockcroftGault(age, weight, serumCr, sex);
  const ckd = calculateCkdEpi2021({ creatinine: serumCr, age, sex });

  return {
    crcl: cg.crcl,
    egfr: ckd.egfr,
    ckdStage: ckd.stage,
    crclStage: cg.stage,
    stageDescription: cg.stageDescription,
    hasRenalImpairment: cg.isAdjustedRequired,
    isCreatinineAvailable,
    age,
    weight,
    sex,
    serumCr,
  };
}

// ==========================================
// 5. DRUG RENAL ADJUSTMENT CALCULATOR
// ==========================================

export interface DrugAdjustmentOutput {
  drugId: string;
  drugName: string;
  standardDose: string;
  standardInterval: string;
  standardRoute: string;
  recommendedDose: string;
  recommendedInterval: string;
  action: RenalCutoffTier['action'];
  warningLevel: RenalCutoffTier['warningLevel'];
  clinicalNote?: string;
  isAdjusted: boolean;
  isContraindicated: boolean;
  neurotoxicityAlert?: string;
  synergyNephrotoxicityAlert?: string;
  targetTrough?: string;
  aucTarget?: string;
}

/**
 * Evaluates the patient CrCl against the specific drug renal profile
 * and outputs the recommended adjusted dosage and warnings.
 */
export function getDrugRenalAdjustment(drugId: string, crcl: number): DrugAdjustmentOutput {
  const profile = DRUG_RENAL_PROFILES[drugId];

  if (!profile) {
    return {
      drugId,
      drugName: drugId,
      standardDose: 'Standard dose',
      standardInterval: 'Standard interval',
      standardRoute: 'IV/PO',
      recommendedDose: 'Standard dose',
      recommendedInterval: 'Standard interval',
      action: 'standard',
      warningLevel: 'normal',
      isAdjusted: false,
      isContraindicated: false,
    };
  }

  // Find matching tier based on CrCl
  let matchedTier: RenalCutoffTier = profile.tiers[0];

  for (const tier of profile.tiers) {
    const minPass = tier.crclMin === undefined || crcl >= tier.crclMin;
    const maxPass = tier.crclMax === undefined || crcl <= tier.crclMax;
    if (minPass && maxPass) {
      matchedTier = tier;
      break;
    }
  }

  const isAdjusted = matchedTier.action !== 'standard';
  const isContraindicated = matchedTier.action === 'contraindicated';

  // Check neurotoxicity alert
  let neurotoxicityAlert: string | undefined = undefined;
  if (profile.neurotoxicityAlert && crcl < profile.neurotoxicityAlert.thresholdCrCl) {
    neurotoxicityAlert = `${profile.neurotoxicityAlert.title}: ${profile.neurotoxicityAlert.description}`;
  }

  // Check synergy alert
  let synergyNephrotoxicityAlert: string | undefined = undefined;
  if (profile.synergyNephrotoxicityAlert) {
    synergyNephrotoxicityAlert = `NEPHROTOXICITY SYNERGY with ${profile.synergyNephrotoxicityAlert.interactingDrug}: ${profile.synergyNephrotoxicityAlert.description}`;
  }

  return {
    drugId: profile.drugId,
    drugName: profile.drugName,
    standardDose: profile.standardDose,
    standardInterval: profile.standardInterval,
    standardRoute: profile.standardRoute,
    recommendedDose: matchedTier.recommendedDose,
    recommendedInterval: matchedTier.interval,
    action: matchedTier.action,
    warningLevel: matchedTier.warningLevel,
    clinicalNote: matchedTier.clinicalNote,
    isAdjusted,
    isContraindicated,
    neurotoxicityAlert,
    synergyNephrotoxicityAlert,
    targetTrough: profile.targetTrough,
    aucTarget: profile.aucTarget,
  };
}

// ==========================================
// 6. VANCOMYCIN & AMINOGLYCOSIDE NOMOGRAMS
// ==========================================

export interface VancomycinDosingRegimen {
  patientWeight: number;
  crcl: number;
  loadingDoseMg: number;
  loadingDoseText: string;
  maintenanceDoseMg: number;
  maintenanceInterval: string;
  maintenanceDoseText: string;
  targetTroughText: string;
  targetAucText: string;
  monitoringPearls: string[];
}

export function calculateVancomycinRegimen(weightKg: number, crcl: number): VancomycinDosingRegimen {
  const safeWeight = Math.max(20, Math.min(250, weightKg || 70));
  // 25-30 mg/kg loading capped at 3000 mg
  const rawLoad = safeWeight * 25;
  const loadMg = Math.min(3000, Math.round(rawLoad / 250) * 250);

  // 15-20 mg/kg maintenance
  const rawMaint = safeWeight * 15;
  const maintMg = Math.min(2000, Math.round(rawMaint / 250) * 250);

  let interval = 'q12h';
  if (crcl >= 90) {
    interval = 'q8–12h';
  } else if (crcl >= 50) {
    interval = 'q12h';
  } else if (crcl >= 20) {
    interval = 'q24h';
  } else {
    interval = 'Single dose, redose by level (<15–20 mcg/mL)';
  }

  return {
    patientWeight: safeWeight,
    crcl,
    loadingDoseMg: loadMg,
    loadingDoseText: `${loadMg} mg IV once over 120 min (25–30 mg/kg actual body weight)`,
    maintenanceDoseMg: maintMg,
    maintenanceInterval: interval,
    maintenanceDoseText: crcl >= 20 ? `${maintMg} mg IV ${interval}` : `Redose by serum level (<15–20 mcg/mL)`,
    targetTroughText: '15–20 mcg/mL for Sepsis, Meningitis, HAP/VAP, Bacteremia; 10–15 mcg/mL for mild cellulitis/UTI.',
    targetAucText: 'Target AUC24/MIC = 400–600 mg·h/L (preferred over trough alone to prevent acute nephrotoxicity).',
    monitoringPearls: [
      'Loading dose is given regardless of renal function to achieve rapid therapeutic levels.',
      'Measure trough within 30 minutes prior to the 4th dose (at steady state).',
      'Infusion rate must not exceed 1000 mg/hour (10 mg/min) to prevent Red Man Syndrome (histaminoid flushing).',
      'If CrCl < 20 mL/min, check random daily serum level and redose only when level falls below 15–20 mcg/mL.',
    ],
  };
}

export interface AminoglycosideNomogramResult {
  drug: 'Gentamicin' | 'Tobramycin' | 'Amikacin';
  doseMgKg: number;
  totalDoseMg: number;
  intervalHours: number | string;
  intervalText: string;
  targetPeak: string;
  targetTrough: string;
  nomogramRecommendation: string;
  isExtendedIntervalAllowed: boolean;
}

export function calculateHartfordAminoglycoside(
  drug: 'Gentamicin' | 'Tobramycin' | 'Amikacin',
  weightKg: number,
  crcl: number
): AminoglycosideNomogramResult {
  const safeWeight = Math.max(20, Math.min(250, weightKg || 70));
  const isAmikacin = drug === 'Amikacin';

  const doseMgKg = isAmikacin ? 15 : 7;
  const rawTotal = safeWeight * doseMgKg;
  const totalDoseMg = Math.round(rawTotal / 10) * 10;

  if (crcl < 20) {
    return {
      drug,
      doseMgKg: isAmikacin ? 7.5 : 2.0,
      totalDoseMg: Math.round((safeWeight * (isAmikacin ? 7.5 : 2.0)) / 10) * 10,
      intervalHours: 'Individualized by levels',
      intervalText: 'Conventional multiple-daily dosing with pre-dose troughs',
      targetPeak: isAmikacin ? '20–30 mcg/mL' : '5–10 mcg/mL',
      targetTrough: isAmikacin ? '< 5 mcg/mL' : '< 2 mcg/mL',
      nomogramRecommendation:
        'Extended-interval once-daily dosing is CONTRAINDICATED when CrCl < 20 mL/min. Use conventional dosing with pre-dose trough levels before each dose.',
      isExtendedIntervalAllowed: false,
    };
  }

  let intervalHours: number = 24;
  let intervalText = 'Every 24 hours (q24h)';

  if (crcl >= 60) {
    intervalHours = 24;
    intervalText = 'Every 24 hours (q24h)';
  } else if (crcl >= 40) {
    intervalHours = 36;
    intervalText = 'Every 36 hours (q36h)';
  } else {
    intervalHours = 48;
    intervalText = 'Every 48 hours (q48h)';
  }

  return {
    drug,
    doseMgKg,
    totalDoseMg,
    intervalHours,
    intervalText,
    targetPeak: isAmikacin ? '> 56–64 mcg/mL' : '> 16–24 mcg/mL',
    targetTrough: isAmikacin ? '< 4–5 mcg/mL' : '< 1.0 mcg/mL (undetectable preferred)',
    nomogramRecommendation: `Hartford Extended-Interval Nomogram: Draw a random serum level between 6 and 14 hours after the start of the first infusion to verify the proper interval.`,
    isExtendedIntervalAllowed: true,
  };
}

// ==========================================
// 7. BEDSIDE ROUNDS SBAR CLINICAL HANDOFF HTML
// ==========================================

export interface BedsideRoundsSbarInput {
  activeCase: ActiveCaseInput;
  patientLabs?: PatientLabsInput;
  customNotes?: string;
  antimicrobialRegimen?: {
    syndromeTitle: string;
    scenarioTitle: string;
    drugs: Array<{
      name: string;
      standardDose: string;
      recommendedDose: string;
      interval: string;
      route: string;
      renalAlert?: string;
    }>;
  };
  riskAssessments?: {
    wellsDvt?: { score: number; riskTier: string };
    wellsPe?: { score: number; riskTier: string };
    cha2ds2Vasc?: { score: number; strokeRisk: string };
    curb65?: { score: number; riskTier: string; mortality: string };
    qsofa?: { score: number; sepsisRisk: string };
    gcs?: { score: number; interpretation: string };
    nihss?: { score: number; severity: string };
    meldNa?: { score: number; mortality3Month: string };
  };
  abgInterpretation?: {
    ph: number;
    paco2: number;
    hco3: number;
    diagnosis: string;
    compensation: string;
    anionGap?: string;
  };
  language?: 'en' | 'id';
}

/**
 * Compiles a high-contrast, hospital-grade SBAR clinical handoff sheet HTML.
 */
export function generateBedsideRoundsSbarHtml(data: BedsideRoundsSbarInput): string {
  const { activeCase, patientLabs, customNotes, antimicrobialRegimen, riskAssessments, abgInterpretation } = data;

  const escapeHtml = (str: string) =>
    str.replace(/[<>&"']/g, (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;',
    }[c] || c));

  const weight = parseFloat(activeCase.patientWeight) || 70;
  const height = parseFloat(activeCase.patientHeight || '170') || 170;
  const age = parseFloat(activeCase.patientAge) || 45;
  const sex = activeCase.patientSex || 'M';
  const asa = activeCase.asaClass || 'I';
  const mallampati = activeCase.mallampati || 'I';

  // Derived anthropometrics
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const bsa = Math.sqrt((height * weight) / 3600).toFixed(2);

  // Renal Clearance
  const renal = calculatePatientRenalMetrics(activeCase, patientLabs);
  const crcl = renal.crcl;
  const egfr = renal.egfr;
  const ckdStage = renal.ckdStage;

  // Crisis Push Doses (weight calculated)
  const isPediatric = weight < 40;
  const epiArrestDose = isPediatric
    ? `${(weight * 0.01).toFixed(2)} mg (${(weight * 0.1).toFixed(1)} mL of 1:10,000)`
    : '1 mg (10 mL of 1:10,000 IV push q3–5m)';

  const amiodarone1 = isPediatric ? `${Math.round(weight * 5)} mg IV (5 mg/kg)` : '300 mg IV push';
  const amiodarone2 = isPediatric ? `${Math.round(weight * 5)} mg IV (5 mg/kg)` : '150 mg IV push';

  const epiAnaphylaxis = isPediatric
    ? `${Math.min(0.3, +(weight * 0.01).toFixed(2))} mg IM (1:1,000)`
    : '0.5 mg IM anterolateral thigh (1:1,000)';

  const propofolRsi = `${Math.round(weight * 2.0)} mg IV (2.0 mg/kg)`;
  const succinylcholineRsi = `${Math.round(weight * 1.5)} mg IV (1.5 mg/kg)`;
  const rocuroniumRsi = `${Math.round(weight * 1.2)} mg IV (1.2 mg/kg)`;
  const sugammadexRescue = `${Math.round(weight * 16)} mg IV (16 mg/kg immediate rescue)`;

  const dantroleneBolus = Math.round(weight * 2.5);
  const dantroleneVials = Math.ceil(dantroleneBolus / 20);

  const lipidBolusMl = Math.round(weight * 1.5);
  const lipidInfusionMlMin = +(weight * 0.25).toFixed(1);

  // Empiric Antimicrobial Plan compilation
  let abxSection = antimicrobialRegimen;
  if (!abxSection) {
    // Default empiric sepsis regimen adjusted for active patient CrCl
    const vanco = calculateVancomycinRegimen(weight, crcl);
    const cefepimeAdj = getDrugRenalAdjustment('cefepime', crcl);
    const zosynAdj = getDrugRenalAdjustment('piperacillin_tazobactam', crcl);
    const meroAdj = getDrugRenalAdjustment('meropenem', crcl);

    abxSection = {
      syndromeTitle: 'Sepsis & Septic Shock (Surviving Sepsis Campaign)',
      scenarioTitle: 'Immediate Broad-Spectrum Empiric Coverage',
      drugs: [
        {
          name: 'Vancomycin IV',
          standardDose: 'Load 25–30 mg/kg, then 15–20 mg/kg q8–12h',
          recommendedDose: `${vanco.loadingDoseMg} mg load, then ${vanco.maintenanceDoseText}`,
          interval: vanco.maintenanceInterval,
          route: 'IV',
          renalAlert: vanco.targetTroughText,
        },
        {
          name: 'Cefepime IV',
          standardDose: '2g IV q8h',
          recommendedDose: `${cefepimeAdj.recommendedDose} IV`,
          interval: cefepimeAdj.recommendedInterval,
          route: 'IV',
          renalAlert: cefepimeAdj.neurotoxicityAlert || cefepimeAdj.clinicalNote,
        },
        {
          name: 'Piperacillin-Tazobactam (Alternative)',
          standardDose: '4.5g IV q6h',
          recommendedDose: `${zosynAdj.recommendedDose} IV`,
          interval: zosynAdj.recommendedInterval,
          route: 'IV',
          renalAlert: zosynAdj.synergyNephrotoxicityAlert || zosynAdj.clinicalNote,
        },
        {
          name: 'Meropenem (ESBL / Severe Shock)',
          standardDose: '1g IV q8h',
          recommendedDose: `${meroAdj.recommendedDose} IV`,
          interval: meroAdj.recommendedInterval,
          route: 'IV',
          renalAlert: meroAdj.clinicalNote,
        },
      ],
    };
  }

  // Active risk scores
  const dvt = riskAssessments?.wellsDvt || { score: 0, riskTier: 'Low / Unlikely' };
  const pe = riskAssessments?.wellsPe || { score: 0, riskTier: 'Low / Unlikely' };
  const cha = riskAssessments?.cha2ds2Vasc || { score: 0, strokeRisk: '0.2% / year' };
  const curb = riskAssessments?.curb65 || { score: 0, riskTier: 'Low Risk', mortality: '0.7%' };
  const qsofa = riskAssessments?.qsofa || { score: 0, sepsisRisk: 'Low Sepsis Risk' };
  const gcs = riskAssessments?.gcs || { score: 15, interpretation: 'Normal consciousness' };

  // ABG
  let abg = abgInterpretation;
  if (!abg && patientLabs?.bicarbonate) {
    const na = patientLabs.sodium ? parseFloat(patientLabs.sodium) : 140;
    const cl = patientLabs.chloride ? parseFloat(patientLabs.chloride) : 100;
    const hco3 = parseFloat(patientLabs.bicarbonate) || 24;
    const rawAg = Math.round(na - (cl + hco3));

    abg = {
      ph: 7.4,
      paco2: 40,
      hco3: hco3,
      diagnosis: hco3 < 22 ? 'Metabolic Acidosis' : hco3 > 26 ? 'Metabolic Alkalosis' : 'Normal Acid-Base Status',
      compensation: 'Standard respiratory compensation',
      anionGap: `${rawAg} mEq/L`,
    };
  }

  const isIndonesian = data.language === 'id';

  const currentDate = new Date().toLocaleString(isIndonesian ? 'id-ID' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const headerTitle = isIndonesian ? 'HANDOFF SBAR ANESTESI & PERAWATAN KRITIS' : 'ANESTHESIA & CRITICAL CARE SBAR HANDOFF';
  const headerSubtitle = isIndonesian ? 'Lembar Protokol Klinis Ronde Pasien & Resusitasi Akut' : 'Bedside Rounds & Acute Resuscitation Clinical Protocol Sheet';
  const labelSituation = isIndonesian ? '[S] SITUASI — DEMOGRAFI PASIEN & KONTEKS KLINIS' : '[S] SITUATION — PATIENT DEMOGRAPHICS & CLINICAL CONTEXT';
  const labelBackground = isIndonesian ? '[B] LATAR BELAKANG — KLIRENS GINJAL & PROFIL LABORATORIUM' : '[B] BACKGROUND — RENAL CLEARANCE HUD & LABORATORY INDICES';
  const labelAssessment = isIndonesian ? '[A] ASESMEN — SKOR RISIKO KLINIS & ANALISIS BGA' : '[A] ASSESSMENT — CLINICAL RISK STRATIFICATION & ABG ANALYSIS';
  const labelRecommendation = isIndonesian ? '[R] REKOMENDASI — DOSIS KRISIS BERDASARKAN BERAT & REGIMEN OBAT' : '[R] RECOMMENDATION — WEIGHT-CALCULATED CRISIS DOSES & ANTIMICROBIAL PLAN';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #080c15; background: #ffffff; padding: 24px; max-width: 900px; margin: 0 auto; line-height: 1.45; font-size: 12px;">
      
      <!-- HEADER BANNER -->
      <div style="border-bottom: 3px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div style="font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #020617; text-transform: uppercase;">
            ${headerTitle}
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #2563eb; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 2px;">
            ${headerSubtitle}
          </div>
        </div>
        <div style="text-align: right; font-size: 11px; color: #475569;">
          <div style="font-weight: 700; font-family: ui-monospace, monospace;">TIMESTAMP: ${currentDate}</div>
          <div style="font-size: 10px; color: #64748b;">OFFLINE VERIFIED • HOSPITAL GRADE</div>
        </div>
      </div>

      <!-- S: SITUATION -->
      <div style="margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
        <div style="background: #0f172a; color: #f8fafc; padding: 6px 12px; font-weight: 800; font-size: 13px; display: flex; justify-content: space-between;">
          <span>${labelSituation}</span>
          <span style="font-family: ui-monospace, monospace; font-size: 11px; color: #93c5fd;">ACTIVE SESSION</span>
        </div>
        <div style="padding: 12px; background: #f8fafc;">
          <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 12px;">
            <tr>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; width: 25%;"><strong>Age / Sex:</strong> <span style="font-family: ui-monospace, monospace;">${age}y / ${sex}</span></td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; width: 25%;"><strong>Weight:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700; color: #1d4ed8;">${weight} kg</span></td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; width: 25%;"><strong>Height:</strong> <span style="font-family: ui-monospace, monospace;">${height} cm</span></td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; width: 25%;"><strong>BMI / BSA:</strong> <span style="font-family: ui-monospace, monospace;">${bmi} kg/m² (${bsa} m²)</span></td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;"><strong>ASA Class:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 800; color: #b45309;">ASA ${asa}</span></td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;"><strong>Mallampati:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">Class ${mallampati}</span></td>
              <td colspan="2" style="padding: 4px 8px; border: 1px solid #e2e8f0;"><strong>Clinical Service:</strong> Operating Room / Surgical ICU Bedside Handoff</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- B: BACKGROUND -->
      <div style="margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
        <div style="background: #1e293b; color: #f8fafc; padding: 6px 12px; font-weight: 800; font-size: 13px; display: flex; justify-content: space-between;">
          <span>${labelBackground}</span>
          <span style="font-family: ui-monospace, monospace; font-size: 11px; color: ${crcl < 60 ? '#fca5a5' : '#86efac'};">
            ${renal.stageDescription}
          </span>
        </div>
        <div style="padding: 12px; background: #ffffff;">
          <!-- Renal Clearance Highlight Box -->
          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <div style="flex: 1; padding: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;">
              <div style="font-size: 10px; font-weight: 800; color: #1e40af; text-transform: uppercase;">Cockcroft-Gault CrCl</div>
              <div style="font-size: 20px; font-weight: 900; font-family: ui-monospace, monospace; color: #1d4ed8;">${crcl} <span style="font-size: 12px; font-weight: 600;">mL/min</span></div>
              <div style="font-size: 10px; color: #475569;">Key cutoff for antibiotic dose & interval adjustments</div>
            </div>
            <div style="flex: 1; padding: 10px; background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 6px;">
              <div style="font-size: 10px; font-weight: 800; color: #5b21b6; text-transform: uppercase;">CKD-EPI 2021 eGFR</div>
              <div style="font-size: 20px; font-weight: 900; font-family: ui-monospace, monospace; color: #6d28d9;">${egfr} <span style="font-size: 12px; font-weight: 600;">mL/min/1.73m²</span></div>
              <div style="font-size: 10px; color: #475569;">Stage ${ckdStage} (Race-free standardized equation)</div>
            </div>
            <div style="flex: 1; padding: 10px; background: ${crcl < 30 ? '#fff1f2' : crcl < 60 ? '#fffbeb' : '#f0fdf4'}; border: 1px solid ${crcl < 30 ? '#fecdd3' : crcl < 60 ? '#fef3c7' : '#bbf7d0'}; border-radius: 6px;">
              <div style="font-size: 10px; font-weight: 800; color: ${crcl < 30 ? '#9f1239' : crcl < 60 ? '#92400e' : '#166534'}; text-transform: uppercase;">Renal Dose Status</div>
              <div style="font-size: 15px; font-weight: 800; margin-top: 3px; color: ${crcl < 30 ? '#be123c' : crcl < 60 ? '#b45309' : '#15803d'};">
                ${crcl < 30 ? 'CRITICAL ADJUST' : crcl < 60 ? 'DOSE ADJUSTED' : 'STANDARD DOSING'}
              </div>
              <div style="font-size: 10px; color: #475569;">${crcl < 30 ? 'High neuro/nephrotoxicity risk' : crcl < 60 ? 'Extended intervals active' : 'Normal clearance'}</div>
            </div>
          </div>

          <!-- Complete Lab Profile Table -->
          <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 11px;">
            <tr style="background: #f1f5f9;">
              <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left;">Lab Parameter</th>
              <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right;">Value</th>
              <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left;">Lab Parameter</th>
              <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right;">Value</th>
              <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left;">Lab Parameter</th>
              <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right;">Value</th>
            </tr>
            <tr>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Serum Creatinine</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace; font-weight: 700;">${patientLabs?.serumCreatinine || '1.0'} mg/dL</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Sodium (Na⁺)</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.sodium ? `${patientLabs.sodium} mEq/L` : '140 mEq/L'}</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Albumin</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.albumin ? `${patientLabs.albumin} g/dL` : '4.0 g/dL'}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Blood Urea Nitrogen</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.bloodUreaNitrogen ? `${patientLabs.bloodUreaNitrogen} mg/dL` : '15 mg/dL'}</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Potassium (K⁺)</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.potassium ? `${patientLabs.potassium} mEq/L` : '4.0 mEq/L'}</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Total Bilirubin</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.totalBilirubin ? `${patientLabs.totalBilirubin} mg/dL` : '0.8 mg/dL'}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Glucose</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.glucose ? `${patientLabs.glucose} mg/dL` : '100 mg/dL'}</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Bicarbonate (HCO₃⁻)</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.bicarbonate ? `${patientLabs.bicarbonate} mEq/L` : '24 mEq/L'}</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Platelets / INR</td>
              <td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: right; font-family: ui-monospace, monospace;">${patientLabs?.platelets ? `${patientLabs.platelets}k` : '250k'} / ${patientLabs?.inr || '1.0'}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- A: ASSESSMENT -->
      <div style="margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
        <div style="background: #334155; color: #f8fafc; padding: 6px 12px; font-weight: 800; font-size: 13px; display: flex; justify-content: space-between;">
          <span>${labelAssessment}</span>
          <span style="font-size: 10px; color: #cbd5e1;">EVIDENCE-BASED RISK ENGINES</span>
        </div>
        <div style="padding: 12px; background: #ffffff;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div style="border: 1px solid #e2e8f0; padding: 8px; border-radius: 6px; background: #f8fafc;">
              <div style="font-weight: 700; color: #0f172a; font-size: 11px;">Thrombosis & Vascular Risk</div>
              <div style="font-size: 11px; margin-top: 4px;">• <strong>Wells DVT:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${dvt.score} pts</span> (${dvt.riskTier})</div>
              <div style="font-size: 11px;">• <strong>Wells PE:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${pe.score} pts</span> (${pe.riskTier})</div>
              <div style="font-size: 11px;">• <strong>CHA₂DS₂-VASc:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${cha.score} pts</span> (Stroke risk: ${cha.strokeRisk})</div>
            </div>
            <div style="border: 1px solid #e2e8f0; padding: 8px; border-radius: 6px; background: #f8fafc;">
              <div style="font-weight: 700; color: #0f172a; font-size: 11px;">Infection Severity & Neurological</div>
              <div style="font-size: 11px; margin-top: 4px;">• <strong>CURB-65 Pneumonia:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${curb.score} pts</span> (${curb.riskTier}, Mort: ${curb.mortality})</div>
              <div style="font-size: 11px;">• <strong>qSOFA Score:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${qsofa.score} pts</span> (${qsofa.sepsisRisk})</div>
              <div style="font-size: 11px;">• <strong>Glasgow Coma Scale:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${gcs.score}/15</span> (${gcs.interpretation})</div>
            </div>
          </div>

          <!-- 4-Step ABG Interpretation -->
          <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; background: #fafafa;">
            <div style="font-weight: 800; font-size: 11px; color: #020617; margin-bottom: 4px; text-transform: uppercase;">
              Arterial Blood Gas (ABG) 4-Step Diagnostic Summary
            </div>
            ${
              abg
                ? `
              <div style="display: flex; gap: 16px; font-size: 11px; margin-bottom: 4px;">
                <span><strong>pH:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${abg.ph}</span></span>
                <span><strong>PaCO₂:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${abg.paco2} mmHg</span></span>
                <span><strong>HCO₃⁻:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${abg.hco3} mEq/L</span></span>
                ${abg.anionGap ? `<span><strong>Anion Gap:</strong> <span style="font-family: ui-monospace, monospace; font-weight: 700;">${abg.anionGap}</span></span>` : ''}
              </div>
              <div style="font-size: 11px; color: #1e293b;">
                <strong>Primary Diagnosis:</strong> <span style="font-weight: 700; color: #1d4ed8;">${abg.diagnosis}</span>
              </div>
              <div style="font-size: 10px; color: #64748b; margin-top: 2px;">
                Compensation Rule: ${abg.compensation}
              </div>
            `
                : `<div style="font-size: 11px; color: #64748b; font-style: italic;">No acute blood gas analyzed in this session. Default reference values applied.</div>`
            }
          </div>
        </div>
      </div>

      <!-- R: RECOMMENDATION -->
      <div style="border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
        <div style="background: #020617; color: #f8fafc; padding: 6px 12px; font-weight: 800; font-size: 13px; display: flex; justify-content: space-between;">
          <span>${labelRecommendation}</span>
          <span style="font-size: 10px; color: #f87171; font-weight: 800;">CRITICAL CARE ACTION PLAN</span>
        </div>
        <div style="padding: 12px; background: #ffffff;">

          <!-- Crisis Push Doses Table -->
          <div style="font-size: 11px; font-weight: 800; color: #991b1b; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            <span>🚨 Immediate Weight-Calculated Crisis Push Doses (${weight} kg)</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 11px;">
            <tr style="background: #fef2f2; color: #991b1b;">
              <th style="padding: 6px 8px; border: 1px solid #fecaca; text-align: left;">Clinical Crisis Scenario</th>
              <th style="padding: 6px 8px; border: 1px solid #fecaca; text-align: left;">Drug & Weight Calculation</th>
              <th style="padding: 6px 8px; border: 1px solid #fecaca; text-align: left;">Recommended Push Dose</th>
              <th style="padding: 6px 8px; border: 1px solid #fecaca; text-align: left;">Administration Instructions</th>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Cardiac Arrest (ACLS)</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Epinephrine 1:10,000</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700; color: #dc2626;">${epiArrestDose}</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Flush 20 mL NS; repeat every 3–5 min. Amiodarone: 1st ${amiodarone1}, 2nd ${amiodarone2}.</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Acute Hypotension Push</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Phenylephrine / Ephedrine</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700;">100 mcg / 5–10 mg IV</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Phenylephrine 100 mcg/mL (1 mL); Ephedrine 5 mg/mL (1–2 mL); titrate to MAP > 65.</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Severe Anaphylaxis</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Epi 1:1,000 IM + Adjuncts</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700; color: #dc2626;">${epiAnaphylaxis}</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Give anterolateral thigh IM immediately; repeat q5–15m. Add Diphenhydramine 50mg, Hydrocortisone 100mg.</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Airway / Emergency RSI</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Propofol / SCh / Roc</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700;">${propofolRsi} + ${rocuroniumRsi}</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Succinylcholine alternative: ${succinylcholineRsi}. Sugammadex rescue reversal: ${sugammadexRescue}.</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Malignant Hyperthermia (MH)</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Dantrolene (2.5 mg/kg)</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700; color: #b45309;">${dantroleneBolus} mg IV bolus</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Mix ${dantroleneVials} vials (20 mg each) in sterile water; push rapidly; repeat q5–10m up to 10 mg/kg.</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">LAST (Local Anesthetic Toxicity)</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">20% Intralipid Rescue</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700;">Bolus: ${lipidBolusMl} mL over 2m</td>
              <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Follow with infusion at ${lipidInfusionMlMin} mL/min (15 mL/kg/hr). Repeat bolus 1–2x for persistent arrest.</td>
            </tr>
          </table>

          <!-- Antimicrobial Stewardship Section -->
          <div style="font-size: 11px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 6px;">
            💊 Empiric Antimicrobial Plan with Renal Clearance Adjustments (CrCl: ${crcl} mL/min)
          </div>
          <div style="font-size: 11px; margin-bottom: 4px; color: #334155;">
            <strong>Indication:</strong> ${abxSection.syndromeTitle} — <em>${abxSection.scenarioTitle}</em>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 11px;">
            <tr style="background: #eff6ff; color: #1e40af;">
              <th style="padding: 5px 8px; border: 1px solid #bfdbfe; text-align: left;">Antimicrobial Agent</th>
              <th style="padding: 5px 8px; border: 1px solid #bfdbfe; text-align: left;">Standard Unadjusted Dose</th>
              <th style="padding: 5px 8px; border: 1px solid #bfdbfe; text-align: left;">Patient-Adjusted Dose & Interval</th>
              <th style="padding: 5px 8px; border: 1px solid #bfdbfe; text-align: left;">Renal Warning & Target Trough</th>
            </tr>
            ${abxSection.drugs
              .map(
                (d) => `
              <tr>
                <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: 700;">${d.name} (${d.route})</td>
                <td style="padding: 5px 8px; border: 1px solid #e2e8f0; color: #64748b; font-family: ui-monospace, monospace;">${d.standardDose}</td>
                <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: ui-monospace, monospace; font-weight: 700; color: #1d4ed8;">${d.recommendedDose}</td>
                <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-size: 10px; color: ${d.renalAlert?.includes('CRITICAL') || d.renalAlert?.includes('CONTRAINDICATED') ? '#dc2626; font-weight: 700;' : '#475569;'}">${d.renalAlert || 'Standard monitoring'}</td>
              </tr>
            `
              )
              .join('')}
          </table>

          <!-- Bedside Rounds Notes & Signoff -->
          <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #f8fafc;">
            <div style="font-size: 10px; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 4px;">
              Bedside Rounds & Attending Physician Directives:
            </div>
            <div style="min-height: 48px; font-size: 11px; color: #0f172a; border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px; margin-bottom: 8px;">
              ${customNotes ? escapeHtml(customNotes) : 'Fluid Balance: Net neutral target. Maintain MAP > 65 mmHg. Check repeat lactate & ABG q4h. Renal dose re-evaluation on morning labs.'}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #64748b;">
              <span><strong>Attending Physician:</strong> ___________________________</span>
              <span><strong>Fellow / Resident:</strong> ___________________________</span>
              <span><strong>Critical Care RN:</strong> ___________________________</span>
            </div>
          </div>

        </div>
      </div>

      <!-- FOOTER NOTE -->
      <div style="margin-top: 12px; text-align: center; font-size: 9px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 6px;">
        Anesthesia Acute Care Suite • Phase 3 SBAR Bedside Rounds Sheet • Offline Computational Engine • Verify all dosages against institutional clinical protocols
      </div>

    </div>
  `;
}
