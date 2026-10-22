/**
 * Emergency Protocols & Acute Resuscitation Library
 * Comprehensive evidence-based data, formulas, and clinical algorithms for:
 * - ACLS 2-Minute Resuscitation Cycle & Drug Escalation
 * - Pediatric Broselow Color Zones, Equipment Sizing & Drug Dosages
 * - Status Epilepticus 4-Phase Escalation Protocol
 * - Hypertensive Crisis (Emergency vs Urgency, MAP Titration, Infusions)
 */

export interface BroselowZone {
  id: string;
  colorName: string;
  colorHex: string;
  textColorHex: string;
  weightRange: string;
  weightMin: number;
  weightMax: number;
  weightDefault: number;
  lengthRangeCm: string;
  approxAge: string;
  equipment: {
    ettCuffed: string;
    ettUncuffed: string;
    ettDepthCm: string;
    bladeTypeAndSize: string;
    lmaSize: string;
    suctionFr: string;
    foleyFr: string;
    chestTubeFr: string;
    ngOgFr: string;
    bvmSize: string;
    bpCuff: string;
    ivGauge: string;
    ioNeedle: string;
    paddles: string;
  };
}

export const BROSELOW_ZONES: BroselowZone[] = [
  {
    id: 'grey',
    colorName: 'Grey',
    colorHex: '#64748b',
    textColorHex: '#f8fafc',
    weightRange: '3–5 kg',
    weightMin: 3,
    weightMax: 5,
    weightDefault: 4,
    lengthRangeCm: 'Up to 60 cm',
    approxAge: '0–3 months',
    equipment: {
      ettCuffed: '2.5–3.0 mm',
      ettUncuffed: '3.0 mm',
      ettDepthCm: '9–10 cm at lips',
      bladeTypeAndSize: 'Miller 0 (straight)',
      lmaSize: 'Size 1 (< 5 kg)',
      suctionFr: '6–8 Fr',
      foleyFr: '6 Fr (feeding tube)',
      chestTubeFr: '10–12 Fr',
      ngOgFr: '5–8 Fr',
      bvmSize: 'Infant',
      bpCuff: 'Neonatal / Infant (4–6 cm)',
      ivGauge: '24G',
      ioNeedle: '15 mm (Pink / Infant)',
      paddles: 'Infant (< 10 kg)',
    },
  },
  {
    id: 'pink',
    colorName: 'Pink',
    colorHex: '#f43f5e',
    textColorHex: '#ffffff',
    weightRange: '6–7 kg',
    weightMin: 6,
    weightMax: 7,
    weightDefault: 6.5,
    lengthRangeCm: '60–67 cm',
    approxAge: '3–6 months',
    equipment: {
      ettCuffed: '3.0 mm',
      ettUncuffed: '3.5 mm',
      ettDepthCm: '10–10.5 cm at lips',
      bladeTypeAndSize: 'Miller 0–1 (straight)',
      lmaSize: 'Size 1.5 (5–10 kg)',
      suctionFr: '8 Fr',
      foleyFr: '6–8 Fr',
      chestTubeFr: '12–14 Fr',
      ngOgFr: '8 Fr',
      bvmSize: 'Infant',
      bpCuff: 'Infant (6–9 cm)',
      ivGauge: '22G–24G',
      ioNeedle: '15 mm (Pink / Infant)',
      paddles: 'Infant (< 10 kg)',
    },
  },
  {
    id: 'red',
    colorName: 'Red',
    colorHex: '#ef4444',
    textColorHex: '#ffffff',
    weightRange: '8–9 kg',
    weightMin: 8,
    weightMax: 9,
    weightDefault: 8.5,
    lengthRangeCm: '67–75 cm',
    approxAge: '6–12 months',
    equipment: {
      ettCuffed: '3.5 mm',
      ettUncuffed: '4.0 mm',
      ettDepthCm: '10.5–11 cm at lips',
      bladeTypeAndSize: 'Miller 1 (straight)',
      lmaSize: 'Size 1.5 (5–10 kg)',
      suctionFr: '8 Fr',
      foleyFr: '8 Fr',
      chestTubeFr: '14–16 Fr',
      ngOgFr: '8–10 Fr',
      bvmSize: 'Pediatric (Child)',
      bpCuff: 'Infant / Child (7–10 cm)',
      ivGauge: '22G',
      ioNeedle: '15 mm (Pink) or 25 mm (Blue)',
      paddles: 'Infant (< 10 kg)',
    },
  },
  {
    id: 'purple',
    colorName: 'Purple',
    colorHex: '#a855f7',
    textColorHex: '#ffffff',
    weightRange: '10–11 kg',
    weightMin: 10,
    weightMax: 11,
    weightDefault: 10.5,
    lengthRangeCm: '75–85 cm',
    approxAge: '1–2 years',
    equipment: {
      ettCuffed: '3.5–4.0 mm',
      ettUncuffed: '4.0–4.5 mm',
      ettDepthCm: '11–12 cm at lips',
      bladeTypeAndSize: 'Miller 1–2 / Mac 2',
      lmaSize: 'Size 2 (10–20 kg)',
      suctionFr: '8–10 Fr',
      foleyFr: '8–10 Fr',
      chestTubeFr: '16–20 Fr',
      ngOgFr: '10 Fr',
      bvmSize: 'Pediatric',
      bpCuff: 'Child (9–14 cm)',
      ivGauge: '20G–22G',
      ioNeedle: '25 mm (Blue / Pediatric)',
      paddles: 'Adult (>= 10 kg)',
    },
  },
  {
    id: 'yellow',
    colorName: 'Yellow',
    colorHex: '#eab308',
    textColorHex: '#0f172a',
    weightRange: '12–14 kg',
    weightMin: 12,
    weightMax: 14,
    weightDefault: 13,
    lengthRangeCm: '85–97 cm',
    approxAge: '2–3 years',
    equipment: {
      ettCuffed: '4.0 mm',
      ettUncuffed: '4.5 mm',
      ettDepthCm: '12.5–13 cm at lips',
      bladeTypeAndSize: 'Miller 2 / Mac 2',
      lmaSize: 'Size 2 (10–20 kg)',
      suctionFr: '10 Fr',
      foleyFr: '10 Fr',
      chestTubeFr: '18–20 Fr',
      ngOgFr: '10 Fr',
      bvmSize: 'Pediatric',
      bpCuff: 'Child (10–15 cm)',
      ivGauge: '20G–22G',
      ioNeedle: '25 mm (Blue / Pediatric)',
      paddles: 'Adult (>= 10 kg)',
    },
  },
  {
    id: 'white',
    colorName: 'White',
    colorHex: '#f1f5f9',
    textColorHex: '#0f172a',
    weightRange: '15–18 kg',
    weightMin: 15,
    weightMax: 18,
    weightDefault: 16.5,
    lengthRangeCm: '97–110 cm',
    approxAge: '3–4 years',
    equipment: {
      ettCuffed: '4.5 mm',
      ettUncuffed: '5.0 mm',
      ettDepthCm: '13.5–14 cm at lips',
      bladeTypeAndSize: 'Miller 2 / Mac 2',
      lmaSize: 'Size 2 (10–20 kg)',
      suctionFr: '10 Fr',
      foleyFr: '10 Fr',
      chestTubeFr: '20–24 Fr',
      ngOgFr: '10–12 Fr',
      bvmSize: 'Pediatric',
      bpCuff: 'Child (12–19 cm)',
      ivGauge: '20G',
      ioNeedle: '25 mm (Blue / Pediatric)',
      paddles: 'Adult (>= 10 kg)',
    },
  },
  {
    id: 'blue',
    colorName: 'Blue',
    colorHex: '#3b82f6',
    textColorHex: '#ffffff',
    weightRange: '19–23 kg',
    weightMin: 19,
    weightMax: 23,
    weightDefault: 21,
    lengthRangeCm: '110–122 cm',
    approxAge: '4–6 years',
    equipment: {
      ettCuffed: '5.0 mm',
      ettUncuffed: '5.5 mm',
      ettDepthCm: '15–16 cm at lips',
      bladeTypeAndSize: 'Miller 2 / Mac 2–3',
      lmaSize: 'Size 2.5 (20–30 kg)',
      suctionFr: '10 Fr',
      foleyFr: '10–12 Fr',
      chestTubeFr: '20–24 Fr',
      ngOgFr: '12 Fr',
      bvmSize: 'Pediatric',
      bpCuff: 'Child / Small Adult',
      ivGauge: '18G–20G',
      ioNeedle: '25 mm (Blue / Pediatric)',
      paddles: 'Adult (>= 10 kg)',
    },
  },
  {
    id: 'orange',
    colorName: 'Orange',
    colorHex: '#f97316',
    textColorHex: '#ffffff',
    weightRange: '24–29 kg',
    weightMin: 24,
    weightMax: 29,
    weightDefault: 26.5,
    lengthRangeCm: '122–137 cm',
    approxAge: '7–9 years',
    equipment: {
      ettCuffed: '5.5 mm',
      ettUncuffed: '6.0 mm',
      ettDepthCm: '16.5–17.5 cm at lips',
      bladeTypeAndSize: 'Miller 2–3 / Mac 3',
      lmaSize: 'Size 2.5–3 (25–35 kg)',
      suctionFr: '12 Fr',
      foleyFr: '12 Fr',
      chestTubeFr: '24–28 Fr',
      ngOgFr: '12–14 Fr',
      bvmSize: 'Adult (Small)',
      bpCuff: 'Child / Small Adult',
      ivGauge: '18G–20G',
      ioNeedle: '25 mm (Blue / Pediatric)',
      paddles: 'Adult (>= 10 kg)',
    },
  },
  {
    id: 'green',
    colorName: 'Green',
    colorHex: '#22c55e',
    textColorHex: '#ffffff',
    weightRange: '30–36 kg',
    weightMin: 30,
    weightMax: 36,
    weightDefault: 33,
    lengthRangeCm: '137–150 cm',
    approxAge: '10–12 years',
    equipment: {
      ettCuffed: '6.0 mm',
      ettUncuffed: '6.5 mm',
      ettDepthCm: '18–19 cm at lips',
      bladeTypeAndSize: 'Miller 3 / Mac 3',
      lmaSize: 'Size 3 (30–50 kg)',
      suctionFr: '12–14 Fr',
      foleyFr: '12–14 Fr',
      chestTubeFr: '28–32 Fr',
      ngOgFr: '14–16 Fr',
      bvmSize: 'Adult',
      bpCuff: 'Small Adult / Adult',
      ivGauge: '18G–20G',
      ioNeedle: '25 mm (Blue) or 45 mm (Yellow)',
      paddles: 'Adult (>= 10 kg)',
    },
  },
];

export function getBroselowZoneByWeight(weightKg: number): BroselowZone {
  const w = Number(weightKg) || 0;
  if (w < 6) return BROSELOW_ZONES[0]; // Grey (3–5 kg)
  if (w < 8) return BROSELOW_ZONES[1]; // Pink (6–7 kg)
  if (w < 10) return BROSELOW_ZONES[2]; // Red (8–9 kg)
  if (w < 12) return BROSELOW_ZONES[3]; // Purple (10–11 kg)
  if (w < 15) return BROSELOW_ZONES[4]; // Yellow (12–14 kg)
  if (w < 19) return BROSELOW_ZONES[5]; // White (15–18 kg)
  if (w < 24) return BROSELOW_ZONES[6]; // Blue (19–23 kg)
  if (w < 30) return BROSELOW_ZONES[7]; // Orange (24–29 kg)
  return BROSELOW_ZONES[8]; // Green (30–36 kg)
}

export interface PediatricResuscitationDoses {
  weightKg: number;
  epiArrestMg: number;
  epiArrestMl: number; // 1:10,000 (0.1 mg/mL)
  epiAnaphylaxisMg: number;
  epiAnaphylaxisMl: number; // 1:1,000 (1.0 mg/mL)
  atropineMg: number;
  atropineMl: number; // 0.1 mg/mL
  amiodaroneArrestMg: number;
  defibrillationInitialJ: number; // 2 J/kg
  defibrillationSubsequentJ: number; // 4 J/kg
  cardioversionInitialJ: number; // 0.5–1 J/kg
  cardioversionSubsequentJ: number; // 2 J/kg
  d10wBolusMl: number; // 5 mL/kg
  crystalloidBolusMl: number; // 20 mL/kg
  adenosineFirstMg: number; // 0.1 mg/kg
  adenosineSecondMg: number; // 0.2 mg/kg
  midazolamIvMg: number; // 0.1 mg/kg
  fentanylIvMcg: number; // 1.5 mcg/kg
  succinylcholineIvMg: number; // 2 mg/kg
  rocuroniumIvMg: number; // 1 mg/kg
  sodiumBicarbonateMeq: number; // 1 mEq/kg
}

export function calculatePediatricDoses(weightKg: number): PediatricResuscitationDoses {
  const w = Math.max(1, Math.min(100, weightKg));

  // Epinephrine Arrest: 0.01 mg/kg IV/IO (max 1.0 mg) -> 0.1 mL/kg of 1:10,000 (0.1 mg/mL)
  const rawEpiArrestMg = +(w * 0.01).toFixed(3);
  const epiArrestMg = Math.min(1.0, rawEpiArrestMg);
  const epiArrestMl = +(epiArrestMg * 10).toFixed(2);

  // Epinephrine Anaphylaxis: 0.01 mg/kg IM (max 0.3-0.5 mg) -> 1:1,000 (1 mg/mL)
  const epiAnaphylaxisMg = Math.min(0.5, +(w * 0.01).toFixed(3));
  const epiAnaphylaxisMl = +epiAnaphylaxisMg.toFixed(3);

  // Atropine: 0.02 mg/kg IV/IO (min 0.1 mg, max 0.5 mg single dose) -> 0.1 mg/mL solution
  const rawAtropine = +(w * 0.02).toFixed(2);
  const atropineMg = Math.max(0.1, Math.min(0.5, rawAtropine));
  const atropineMl = +(atropineMg / 0.1).toFixed(1);

  // Amiodarone pulseless arrest: 5 mg/kg IV/IO rapid bolus (max 300 mg)
  const amiodaroneArrestMg = Math.min(300, +(w * 5).toFixed(0));

  // Defibrillation: Initial 2 J/kg, subsequent 4 J/kg (max 200 J)
  const defibrillationInitialJ = Math.min(200, Math.round(w * 2));
  const defibrillationSubsequentJ = Math.min(200, Math.round(w * 4));

  // Cardioversion: Initial 0.5–1 J/kg, subsequent 2 J/kg
  const cardioversionInitialJ = Math.min(100, Math.round(w * 1));
  const cardioversionSubsequentJ = Math.min(200, Math.round(w * 2));

  // D10W bolus: 5 mL/kg (0.5 g/kg)
  const d10wBolusMl = +(w * 5).toFixed(0);

  // Crystalloid bolus: 20 mL/kg
  const crystalloidBolusMl = +(w * 20).toFixed(0);

  // Adenosine: 0.1 mg/kg (max 6 mg), 0.2 mg/kg (max 12 mg)
  const adenosineFirstMg = Math.min(6, +(w * 0.1).toFixed(2));
  const adenosineSecondMg = Math.min(12, +(w * 0.2).toFixed(2));

  // Midazolam: 0.1 mg/kg IV (max 5 mg)
  const midazolamIvMg = Math.min(5, +(w * 0.1).toFixed(2));

  // Fentanyl: 1.5 mcg/kg IV (max 100 mcg)
  const fentanylIvMcg = Math.min(100, +(w * 1.5).toFixed(1));

  // Succinylcholine: 2 mg/kg IV (max 150 mg)
  const succinylcholineIvMg = Math.min(150, +(w * 2).toFixed(0));

  // Rocuronium: 1 mg/kg IV (max 100 mg)
  const rocuroniumIvMg = Math.min(100, +(w * 1).toFixed(0));

  // Sodium Bicarbonate: 1 mEq/kg IV (max 50 mEq)
  const sodiumBicarbonateMeq = Math.min(50, +(w * 1).toFixed(0));

  return {
    weightKg: w,
    epiArrestMg,
    epiArrestMl,
    epiAnaphylaxisMg,
    epiAnaphylaxisMl,
    atropineMg,
    atropineMl,
    amiodaroneArrestMg,
    defibrillationInitialJ,
    defibrillationSubsequentJ,
    cardioversionInitialJ,
    cardioversionSubsequentJ,
    d10wBolusMl,
    crystalloidBolusMl,
    adenosineFirstMg,
    adenosineSecondMg,
    midazolamIvMg,
    fentanylIvMcg,
    succinylcholineIvMg,
    rocuroniumIvMg,
    sodiumBicarbonateMeq,
  };
}

// ==========================================
// STATUS EPILEPTICUS 4-PHASE PROTOCOL
// ==========================================

export interface StatusEpilepticusDoses {
  weightKg: number;
  phase1: {
    dextroseBolus: string;
    thiamineAdult: string;
  };
  phase2FirstLine: {
    lorazepamIv: { doseMg: number; volumeMl: number; instruction: string };
    diazepamIv: { doseMg: number; instruction: string };
    midazolamIm: { doseMg: number; volumeMl: number; instruction: string };
  };
  phase3SecondLine: {
    keppra: { doseMg: number; rate: string; instruction: string };
    fosphenytoin: { doseMgPe: number; maxRate: string; instruction: string };
    valproate: { doseMg: number; rate: string; instruction: string };
  };
  phase4Refractory: {
    propofolBolusMg: number;
    propofolInfusionRange: string;
    midazolamBolusMg: number;
    midazolamInfusionRange: string;
    ketamineBolusMg: number;
    ketamineInfusionRange: string;
  };
}

export function calculateStatusEpilepticusDoses(weightKg: number): StatusEpilepticusDoses {
  const w = Math.max(3, Math.min(200, weightKg));
  const isPediatric = w < 40;

  // Phase 1: Glucose check & rescue
  const dextroseBolus = isPediatric
    ? `${(w * 5).toFixed(0)} mL of D10W IV (0.5 g/kg)`
    : '50 mL of D50W IV (25 g dextrose) push';
  const thiamineAdult = isPediatric
    ? 'Not routinely indicated in pediatric resuscitation unless metabolic disorder'
    : '100 mg IV before or with D50W to prevent Wernicke encephalopathy';

  // Phase 2: First-line benzos
  // Lorazepam: 0.1 mg/kg IV (max 4 mg single dose)
  const lorazepamMg = Math.min(4, +(w * 0.1).toFixed(1));
  const lorazepamVolume = +(lorazepamMg / 2).toFixed(1); // 2 mg/mL concentration

  // Diazepam: 0.15–0.2 mg/kg IV (max 10 mg single dose)
  const diazepamMg = Math.min(10, +(w * 0.2).toFixed(1));

  // Midazolam IM: 10 mg IM if > 40kg, 5 mg IM if 13-40kg, 0.2 mg/kg if < 13kg (max 10 mg)
  const midazolamImMg = w > 40 ? 10 : w >= 13 ? 5 : Math.min(5, +(w * 0.2).toFixed(1));
  const midazolamImVolumeMl = +(midazolamImMg / 5).toFixed(1); // 5 mg/mL solution

  // Phase 3: Second-line IV AEDs
  // Keppra (Levetiracetam): 60 mg/kg IV (max 4,500 mg) over 10 min
  const keppraMg = Math.min(4500, Math.round(w * 60));

  // Fosphenytoin: 20 mg PE/kg IV (max 1,500 mg PE)
  const fosphenytoinMgPe = Math.min(1500, Math.round(w * 20));

  // Valproate sodium: 40 mg/kg IV (max 3,000 mg)
  const valproateMg = Math.min(3000, Math.round(w * 40));

  // Phase 4: Refractory RSI and Anesthetic Infusions
  const propofolBolusMg = Math.round(w * 1.5); // 1.5 mg/kg bolus
  const propofolInfusionRange = `${(w * 2).toFixed(0)}–${(w * 10).toFixed(0)} mg/hr (30–150 mcg/kg/min)`;

  const midazolamBolusMg = +(w * 0.2).toFixed(1);
  const midazolamInfusionRange = `${(w * 0.05).toFixed(1)}–${(w * 2).toFixed(1)} mg/hr`;

  const ketamineBolusMg = Math.round(w * 2);
  const ketamineInfusionRange = `${(w * 1.2).toFixed(0)}–${(w * 7.5).toFixed(0)} mg/hr`;

  return {
    weightKg: w,
    phase1: {
      dextroseBolus,
      thiamineAdult,
    },
    phase2FirstLine: {
      lorazepamIv: {
        doseMg: lorazepamMg,
        volumeMl: lorazepamVolume,
        instruction: 'Inject IV over 2 min. If seizure persists after 5–10 min, repeat once.',
      },
      diazepamIv: {
        doseMg: diazepamMg,
        instruction: 'Inject IV over 2 min. Repeat once at 5–10 min if seizures persist.',
      },
      midazolamIm: {
        doseMg: midazolamImMg,
        volumeMl: midazolamImVolumeMl,
        instruction: 'Autoinjector or needle into mid-outer thigh. Best when no IV access.',
      },
    },
    phase3SecondLine: {
      keppra: {
        doseMg: keppraMg,
        rate: 'Infuse in 100 mL NS over 10 minutes',
        instruction: 'First choice in many centers: low hemodynamic risk, no drug interactions.',
      },
      fosphenytoin: {
        doseMgPe: fosphenytoinMgPe,
        maxRate: 'Max 150 mg PE/min IV (Cardiac & ECG monitoring mandatory)',
        instruction: 'Prodrug of phenytoin. Less risk of phlebitis / purple glove syndrome.',
      },
      valproate: {
        doseMg: valproateMg,
        rate: 'Infuse IV over 5–10 minutes',
        instruction: 'Avoid in suspected mitochondrial/urea cycle disease or pregnancy.',
      },
    },
    phase4Refractory: {
      propofolBolusMg,
      propofolInfusionRange,
      midazolamBolusMg,
      midazolamInfusionRange,
      ketamineBolusMg,
      ketamineInfusionRange,
    },
  };
}

// ==========================================
// HYPERTENSIVE CRISIS & INFUSION TITRATIONS
// ==========================================

export interface HypertensiveCrisisAssessment {
  sbp: number;
  dbp: number;
  map: number;
  isEmergency: boolean;
  hasOrganDamage: boolean;
  isAorticDissection: boolean;
  // Hour 1 Targets (General Emergency)
  targetMapHour1Min: number; // 25% reduction
  targetMapHour1Max: number; // 20% reduction
  targetSbpEstimatedHour1Min: number;
  targetSbpEstimatedHour1Max: number;
  // Aortic Dissection Targets
  aorticDissectionTargetSbp: string;
  aorticDissectionTargetHr: string;
  aorticDissectionTimeframe: string;
  aorticDissectionBetaBlockerRule: string;
  // Hours 2-6 Target
  targetHours2to6: string;
}

export function evaluateHypertensiveCrisis(
  sbp: number,
  dbp: number,
  hasOrganDamage: boolean,
  isAorticDissection: boolean
): HypertensiveCrisisAssessment {
  const safeSbp = Math.max(60, Math.min(300, sbp || 180));
  const safeDbp = Math.max(30, Math.min(200, dbp || 110));
  
  // MAP = (SBP + 2 * DBP) / 3
  const map = Math.round((safeSbp + 2 * safeDbp) / 3);

  // 20% to 25% reduction in Hour 1
  const targetMapHour1Max = Math.round(map * 0.80); // 20% reduction
  const targetMapHour1Min = Math.round(map * 0.75); // 25% reduction

  // Approximate SBP bounds corresponding to 20-25% reduction
  const targetSbpEstimatedHour1Max = Math.round(safeSbp * 0.80);
  const targetSbpEstimatedHour1Min = Math.round(safeSbp * 0.75);

  const isEmergency = hasOrganDamage || isAorticDissection;

  return {
    sbp: safeSbp,
    dbp: safeDbp,
    map,
    isEmergency,
    hasOrganDamage,
    isAorticDissection,
    targetMapHour1Min,
    targetMapHour1Max,
    targetSbpEstimatedHour1Min,
    targetSbpEstimatedHour1Max,
    aorticDissectionTargetSbp: '< 120 mmHg (typically 100–120 mmHg)',
    aorticDissectionTargetHr: '< 60 bpm',
    aorticDissectionTimeframe: 'Rapid reduction within 15–20 minutes',
    aorticDissectionBetaBlockerRule:
      'CRITICAL: Give IV Beta-Blocker (Esmolol / Labetalol) FIRST to suppress cardiac contractility and shear stress (dP/dt) before adding vasodilators!',
    targetHours2to6: 'Gradually lower BP toward 160/100 mmHg over next 2–6 hours if stable.',
  };
}

export interface NicardipineInfusion {
  doseMgPerHr: number;
  concentrationMgPerMl: number; // 0.1 mg/mL (25mg in 250mL)
  rateMlPerHr: number;
  titrationAdvice: string;
}

export function calculateNicardipineInfusion(doseMgPerHr: number): NicardipineInfusion {
  const dose = Math.max(3, Math.min(15, doseMgPerHr));
  const concentration = 0.1; // 25 mg in 250 mL
  const rateMlPerHr = Math.round(dose / concentration);

  let titrationAdvice = '';
  if (dose === 5) {
    titrationAdvice = 'Initial starting rate: 5 mg/hr (50 mL/hr). Check BP every 5 minutes.';
  } else if (dose > 5 && dose < 15) {
    titrationAdvice = `Titrating rate: ${dose} mg/hr (${rateMlPerHr} mL/hr). Increase by 2.5 mg/hr q5-15m until target MAP achieved.`;
  } else if (dose === 15) {
    titrationAdvice = 'Maximum rate: 15 mg/hr (150 mL/hr). If target BP not reached, consider switching or adding second agent.';
  } else if (dose < 5) {
    titrationAdvice = `Maintenance rate: ${dose} mg/hr (${rateMlPerHr} mL/hr) once target BP has been stabilized.`;
  }

  return {
    doseMgPerHr: dose,
    concentrationMgPerMl: concentration,
    rateMlPerHr,
    titrationAdvice,
  };
}

export interface NitroprussideInfusion {
  weightKg: number;
  doseMcgPerKgPerMin: number;
  totalMcgPerMin: number;
  concentrationMcgPerMl: number; // 200 mcg/mL (50mg in 250mL)
  rateMlPerHr: number;
  warningNotice: string;
}

export function calculateNitroprussideInfusion(
  weightKg: number,
  doseMcgPerKgPerMin: number
): NitroprussideInfusion {
  const w = Math.max(30, Math.min(200, weightKg || 70));
  const dose = Math.max(0.2, Math.min(10, doseMcgPerKgPerMin));
  const concentration = 200; // 50 mg in 250 mL = 200 mcg/mL

  const totalMcgPerMin = +(dose * w).toFixed(1);
  const rateMlPerHr = +((totalMcgPerMin * 60) / concentration).toFixed(1);

  let warningNotice = '';
  if (dose > 2) {
    warningNotice =
      'WARNING: Dose > 2.0 mcg/kg/min carries elevated risk of cyanide and thiocyanate toxicity, especially if maintained for > 24–48 hours or in renal/hepatic dysfunction.';
  } else {
    warningNotice =
      'Protect solution from light (opaque sleeve). Continuous arterial line monitoring mandatory.';
  }

  return {
    weightKg: w,
    doseMcgPerKgPerMin: dose,
    totalMcgPerMin,
    concentrationMcgPerMl: concentration,
    rateMlPerHr,
    warningNotice,
  };
}

export interface LabetalolInfusion {
  bolusDoseMg: number;
  infusionMgPerMin: number;
  infusionMgPerHr: number;
  rateMlPerHrNeat: number; // 5 mg/mL neat
  rateMlPerHrDilute: number; // 1 mg/mL dilute (200mg in 200mL)
  contraindications: string[];
}

export function calculateLabetalolDosing(infusionMgPerMin: number): LabetalolInfusion {
  const rateMgMin = Math.max(0.5, Math.min(8, infusionMgPerMin));
  const infusionMgPerHr = Math.round(rateMgMin * 60);
  const rateMlPerHrNeat = +(infusionMgPerHr / 5).toFixed(1); // 5 mg/mL
  const rateMlPerHrDilute = Math.round(infusionMgPerHr); // 1 mg/mL

  return {
    bolusDoseMg: 20,
    infusionMgPerMin: rateMgMin,
    infusionMgPerHr,
    rateMlPerHrNeat,
    rateMlPerHrDilute,
    contraindications: [
      'Severe bradycardia (HR < 60 bpm)',
      'Second- or third-degree AV block without pacemaker',
      'Decompensated heart failure / cardiogenic shock',
      'Severe active bronchospasm / asthma exacerbation',
    ],
  };
}

// ==========================================
// ACLS HS & TS CHECKLIST & ACTIONS
// ==========================================

export interface HsAndTsItem {
  id: string;
  category: 'H' | 'T';
  name: string;
  clinicalSign: string;
  keyInterventions: string[];
  bedsideTips: string;
}

export const HS_AND_TS_LIST: HsAndTsItem[] = [
  {
    id: 'hypovolemia',
    category: 'H',
    name: 'Hypovolemia',
    clinicalSign: 'Flat neck veins, rapid narrow QRS complex, history of bleeding, trauma, or fluid loss',
    keyInterventions: [
      'Rapid crystalloid infusion (Normal Saline or Plasmalyte) 1–2 L IV/IO',
      'Initiate massive transfusion protocol (MTP 1:1:1 pRBC:FFP:Platelets) if bleeding suspected',
      'Obtain large-bore peripheral IV access (16G/14G) or humeral/tibial IO',
    ],
    bedsideTips: 'Bedside ultrasound: Collapsing IVC (< 1.0 cm) on subcostal view, kissing LV walls.',
  },
  {
    id: 'hypoxia',
    category: 'H',
    name: 'Hypoxia',
    clinicalSign: 'Cyanosis, low pre-arrest SpO2, airway obstruction, bronchoaspiration, apnea',
    keyInterventions: [
      'High-flow 100% FiO2 with bag-valve-mask with PEEP valve',
      'Confirm endotracheal tube placement with continuous waveform capnography (EtCO2)',
      'Suction large secretions, vomit, or blood from pharynx and trachea',
    ],
    bedsideTips: 'Look for chest rise; verify bilateral equal breath sounds; check EtCO2 waveform.',
  },
  {
    id: 'hydrogen_ion',
    category: 'H',
    name: 'Hydrogen Ion (Acidosis)',
    clinicalSign: 'Severe metabolic acidosis (pH < 7.10), high anion gap, diabetic ketoacidosis, prolonged CPR',
    keyInterventions: [
      'Optimize chest compressions & ventilation to eliminate respiratory CO2',
      'Sodium Bicarbonate 1 mEq/kg IV push (50–100 mEq) for severe known metabolic acidosis or hyperkalemia',
      'Verify adequate tidal volume without hyperventilating',
    ],
    bedsideTips: 'Hyperventilation increases intrathoracic pressure and decreases coronary perfusion pressure; ventilate at 10 breaths/min.',
  },
  {
    id: 'hypo_hyper_kalemia',
    category: 'H',
    name: 'Hypo / Hyperkalemia',
    clinicalSign: 'HyperK: Peaked T waves, wide QRS, sine-wave ECG, ESRD/dialysis patient. HypoK: Flat T waves, U waves, prolonged QT',
    keyInterventions: [
      'Hyperkalemia: Calcium Chloride 10% 10 mL IV (or Calcium Gluconate 30 mL) over 2–5 min to stabilize myocardium',
      'Hyperkalemia: Regular Insulin 10 units IV + D50W 50 mL IV bolus; Sodium Bicarbonate 50 mEq IV',
      'Hypokalemia: Rapid KCl infusion via central line with Magnesium Sulfate 2 g IV push',
    ],
    bedsideTips: 'Calcium works in 1–3 minutes to narrow widened QRS; repeat if ECG remains sine wave.',
  },
  {
    id: 'hypothermia',
    category: 'H',
    name: 'Hypothermia',
    clinicalSign: 'Core body temperature < 30°C (86°F), cold exposure, submersion, Osborn (J) waves',
    keyInterventions: [
      'Core active rewarming: Warm IV fluids (40–42°C), warm humidified O2',
      'Peritoneal or thoracic lavage with warm saline if refractory',
      'Consider ECMO / cardiopulmonary bypass for severe accidental hypothermia',
    ],
    bedsideTips: '"Patient is not dead until warm and dead" (warm core temp to >= 35°C before terminating CPR).',
  },
  {
    id: 'tension_pneumothorax',
    category: 'T',
    name: 'Tension Pneumothorax',
    clinicalSign: 'Unilateral absent breath sounds, tracheal deviation, distended neck veins, high peak airway pressures',
    keyInterventions: [
      'Immediate needle decompression: 14G/16G angiocatheter at 2nd ICS midclavicular or 4th/5th ICS anterior axillary line',
      'Finger thoracostomy (rapid rush of air confirms diagnosis)',
      'Place definitive large-bore chest tube (28–32 Fr)',
    ],
    bedsideTips: 'Do not wait for chest X-ray! Bedside lung ultrasound: absent lung sliding + barcode sign on M-mode.',
  },
  {
    id: 'tamponade_cardiac',
    category: 'T',
    name: 'Tamponade (Cardiac)',
    clinicalSign: 'Beck triad (muffled heart tones, JVD, hypotension), electrical alternans, narrow pulse pressure',
    keyInterventions: [
      'Point-of-care cardiac ultrasound (POCUS) subcostal window',
      'Emergent pericardiocentesis under ultrasound guidance (subxiphoid needle angled toward left shoulder)',
      'Emergent ED thoracotomy if penetrating trauma or postcardiotomy',
    ],
    bedsideTips: 'Even 50 mL fluid aspiration can restore cardiac filling and spontaneous circulation.',
  },
  {
    id: 'toxins',
    category: 'T',
    name: 'Toxins (Overdose / Poisoning)',
    clinicalSign: 'Pupil changes (pinpoint=opioids), history of ingestion, local anesthetic toxicity (LAST)',
    keyInterventions: [
      'Opioid overdose: Naloxone 0.4–2.0 mg IV/IO/IM/IN, repeat q2-3m',
      'Local Anesthetic Toxicity (LAST): 20% Lipid Emulsion 1.5 mL/kg bolus, then 0.25 mL/kg/min infusion',
      'Beta-blocker toxicity: Glucagon 5–10 mg IV push, High-Dose Insulin Euglycemic Therapy (HIET)',
      'Calcium Channel Blocker toxicity: Calcium chloride 1g IV, Glucagon, High-Dose Insulin',
      'Digoxin toxicity: Digoxin Immune Fab (Digibind) 10–20 vials',
    ],
    bedsideTips: 'Contact Poison Control / Medical Toxicology early during prolonged resuscitation.',
  },
  {
    id: 'thrombosis_pulmonary',
    category: 'T',
    name: 'Thrombosis, Pulmonary (PE)',
    clinicalSign: 'Sudden arrest, history of DVT/PE, severe hypoxia, dilated RV with D-shaped left ventricle on echo',
    keyInterventions: [
      'Thrombolytic therapy: Alteplase (tPA) 50 mg IV bolus push over 2 min, repeat 50 mg at 15 min if needed',
      'Continue CPR for at least 15–30 minutes after thrombolytic administration',
      'Consider percutaneous mechanical thrombectomy or emergent surgical embolectomy',
    ],
    bedsideTips: 'McConnell sign on echo (hypokinesis of RV free wall with normal RV apex contractility).',
  },
  {
    id: 'thrombosis_coronary',
    category: 'T',
    name: 'Thrombosis, Coronary (ACS / STEMI)',
    clinicalSign: 'Arrest preceded by chest pain, VF/pVT arrest, ECG with STEMI pattern post-ROSC',
    keyInterventions: [
      'Immediate coronary angiography & PCI activation post-ROSC regardless of comatose status',
      'Mechanical CPR (e.g. Lucas device) to facilitate transfer to Cardiac Catheterization Lab',
      'Aspirin 325 mg rectally or crushed NG tube, Heparin bolus once ROSC stabilized',
    ],
    bedsideTips: 'Over 70% of out-of-hospital VF arrests have underlying acute coronary plaque rupture.',
  },
];
