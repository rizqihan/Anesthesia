/**
 * Diagnostic Lab Interpreters & Electrolyte Safety Engines
 * Comprehensive 4-step ABG analysis, delta-delta ratio, and safe electrolyte management.
 */

// ==========================================
// 1. FOUR-STEP ARTERIAL BLOOD GAS (ABG) ANALYZER
// ==========================================

export interface AbgInput {
  ph: number;
  paco2: number; // mmHg
  hco3: number; // mEq/L
  sodium?: number; // mEq/L (for Anion Gap)
  chloride?: number; // mEq/L (for Anion Gap)
  albumin?: number; // g/dL (for Corrected Anion Gap)
  pao2?: number; // mmHg (optional oxygenation)
  fio2?: number; // % (e.g. 21 for room air, 100 for pure O2)
}

export interface AbgCompensation {
  type: 'metabolic_acidosis' | 'metabolic_alkalosis' | 'respiratory_acidosis' | 'respiratory_alkalosis' | 'normal';
  expectedValueText: string;
  isCompensated: boolean;
  status: 'adequate' | 'under_compensated' | 'over_compensated' | 'uncompensated' | 'not_applicable';
  concomitantDisorder?: string;
}

export interface AbgAnionGapAnalysis {
  rawAnionGap: number;
  correctedAnionGap: number | null;
  isHighAnionGap: boolean;
  deltaGap: number | null;
  deltaHco3: number | null;
  deltaDeltaRatio: number | null;
  deltaDeltaInterpretation: string | null;
}

export interface AbgResult {
  step1PhStatus: 'Acidemia' | 'Alkalemia' | 'Normal pH';
  step2PrimaryDisorder: string;
  step3Compensation: AbgCompensation;
  step4AnionGap: AbgAnionGapAnalysis | null;
  summaryDiagnosis: string;
  clinicalPearls: string[];
  pfRatio?: {
    ratio: number;
    ardsCategory: string;
  };
}

export function analyzeAbg(input: AbgInput): AbgResult {
  const { ph, paco2, hco3, sodium, chloride, albumin, pao2, fio2 } = input;

  // Step 1: Acidemia vs Alkalemia
  let step1PhStatus: AbgResult['step1PhStatus'] = 'Normal pH';
  if (ph < 7.35) {
    step1PhStatus = 'Acidemia';
  } else if (ph > 7.45) {
    step1PhStatus = 'Alkalemia';
  }

  // Step 2: Determine Primary Disorder
  let primaryDisorder = 'Normal acid-base status';
  const clinicalPearls: string[] = [];

  const isRespAcid = paco2 > 45;
  const isMetAcid = hco3 < 22;
  const isRespAlk = paco2 < 35;
  const isMetAlk = hco3 > 26;

  if (step1PhStatus === 'Acidemia') {
    if (isRespAcid && isMetAcid) {
      primaryDisorder = 'Combined (Mixed) Respiratory & Metabolic Acidosis';
      clinicalPearls.push('Severe mixed acidosis carries high mortality: Address ventilatory failure and underlying metabolic cause simultaneously.');
    } else if (isRespAcid) {
      primaryDisorder = 'Primary Respiratory Acidosis';
    } else if (isMetAcid) {
      primaryDisorder = 'Primary Metabolic Acidosis';
    } else {
      primaryDisorder = 'Unclassified Acidemia (early or atypical disturbance)';
    }
  } else if (step1PhStatus === 'Alkalemia') {
    if (isRespAlk && isMetAlk) {
      primaryDisorder = 'Combined (Mixed) Respiratory & Metabolic Alkalosis';
      clinicalPearls.push('Mixed alkalosis can cause severe cerebral vasoconstriction, hypokalemia, and cardiac arrhythmias.');
    } else if (isRespAlk) {
      primaryDisorder = 'Primary Respiratory Alkalosis';
    } else if (isMetAlk) {
      primaryDisorder = 'Primary Metabolic Alkalosis';
    } else {
      primaryDisorder = 'Unclassified Alkalemia';
    }
  } else {
    // Normal pH (7.35 - 7.45)
    if (isRespAcid && isMetAlk) {
      primaryDisorder = 'Mixed Respiratory Acidosis & Metabolic Alkalosis';
      clinicalPearls.push('Normal pH with abnormal PaCO2 and HCO3- indicates either complete secondary compensation or opposing dual mixed disorders (e.g. COPD with diuretic therapy).');
    } else if (isRespAlk && isMetAcid) {
      primaryDisorder = 'Mixed Respiratory Alkalosis & Metabolic Acidosis';
      clinicalPearls.push('Classic presentation for early salicylate poisoning, severe sepsis, or liver failure with hyperventilation.');
    } else if (isRespAcid || isMetAcid || isRespAlk || isMetAlk) {
      primaryDisorder = 'Compensated Acid-Base Disturbance';
    }
  }

  // Step 3: Assess Compensation
  let compensation: AbgCompensation = {
    type: 'normal',
    expectedValueText: 'Normal physiological range',
    isCompensated: true,
    status: 'not_applicable',
  };

  if (isMetAcid || (step1PhStatus === 'Acidemia' && primaryDisorder.includes('Metabolic Acidosis'))) {
    // Winter's formula: Expected PaCO2 = 1.5 * [HCO3] + 8 +/- 2
    const expectedPaco2 = 1.5 * hco3 + 8;
    const lowerPaco2 = expectedPaco2 - 2;
    const upperPaco2 = expectedPaco2 + 2;
    const expectedValueText = `Winter's Formula: Expected PaCO2 = ${expectedPaco2.toFixed(1)} mmHg (${lowerPaco2.toFixed(1)} - ${upperPaco2.toFixed(1)} mmHg)`;

    if (paco2 > upperPaco2) {
      compensation = {
        type: 'metabolic_acidosis',
        expectedValueText,
        isCompensated: false,
        status: 'under_compensated',
        concomitantDisorder: 'Concomitant Respiratory Acidosis (hypoventilation / impending respiratory exhaustion)',
      };
      clinicalPearls.push('PaCO2 is higher than Winter\'s formula predicted range: Concomitant respiratory depression requires urgent ventilatory support.');
    } else if (paco2 < lowerPaco2) {
      compensation = {
        type: 'metabolic_acidosis',
        expectedValueText,
        isCompensated: false,
        status: 'over_compensated',
        concomitantDisorder: 'Concomitant Respiratory Alkalosis (hyperventilation / pain / sepsis)',
      };
      clinicalPearls.push('PaCO2 is lower than Winter\'s formula predicted range: Patient has a concomitant primary respiratory alkalosis.');
    } else {
      compensation = {
        type: 'metabolic_acidosis',
        expectedValueText,
        isCompensated: true,
        status: 'adequate',
      };
      clinicalPearls.push('Respiratory compensation is appropriate per Winter\'s formula.');
    }
  } else if (isMetAlk || (step1PhStatus === 'Alkalemia' && primaryDisorder.includes('Metabolic Alkalosis'))) {
    // Metabolic Alkalosis expected compensation:
    // Expected PaCO2 = 0.7 * (HCO3 - 24) + 40 +/- 2 (or 0.7 * HCO3 + 20)
    const expectedPaco2 = 0.7 * (hco3 - 24) + 40;
    const lowerPaco2 = expectedPaco2 - 2;
    const upperPaco2 = expectedPaco2 + 2;
    const expectedValueText = `Expected PaCO2 = ${expectedPaco2.toFixed(1)} mmHg (${lowerPaco2.toFixed(1)} - ${upperPaco2.toFixed(1)} mmHg)`;

    if (paco2 > upperPaco2) {
      compensation = {
        type: 'metabolic_alkalosis',
        expectedValueText,
        isCompensated: false,
        status: 'under_compensated',
        concomitantDisorder: 'Concomitant Respiratory Acidosis',
      };
    } else if (paco2 < lowerPaco2) {
      compensation = {
        type: 'metabolic_alkalosis',
        expectedValueText,
        isCompensated: false,
        status: 'over_compensated',
        concomitantDisorder: 'Concomitant Respiratory Alkalosis',
      };
    } else {
      compensation = {
        type: 'metabolic_alkalosis',
        expectedValueText,
        isCompensated: true,
        status: 'adequate',
      };
    }
  } else if (isRespAcid || primaryDisorder.includes('Respiratory Acidosis')) {
    // Acute: Delta HCO3 = 1 * (Delta PaCO2 / 10); Chronic: Delta HCO3 = 3.5 * (Delta PaCO2 / 10)
    const deltaPaco2 = paco2 - 40;
    const expectedHco3Acute = 24 + 1.0 * (deltaPaco2 / 10);
    const expectedHco3Chronic = 24 + 3.5 * (deltaPaco2 / 10);
    const expectedValueText = `Expected HCO3: Acute = ${expectedHco3Acute.toFixed(1)} mEq/L, Chronic = ${expectedHco3Chronic.toFixed(1)} mEq/L`;

    let status: AbgCompensation['status'] = 'adequate';
    let concomitantDisorder: string | undefined = undefined;

    if (hco3 < expectedHco3Acute - 2) {
      status = 'under_compensated';
      concomitantDisorder = 'Concomitant Metabolic Acidosis';
    } else if (hco3 > expectedHco3Chronic + 2) {
      status = 'over_compensated';
      concomitantDisorder = 'Concomitant Metabolic Alkalosis';
    }

    compensation = {
      type: 'respiratory_acidosis',
      expectedValueText,
      isCompensated: status === 'adequate',
      status,
      concomitantDisorder,
    };
  } else if (isRespAlk || primaryDisorder.includes('Respiratory Alkalosis')) {
    // Acute: Delta HCO3 = 2 * (40 - PaCO2 / 10); Chronic: Delta HCO3 = 5 * (40 - PaCO2 / 10)
    const deltaPaco2 = 40 - paco2;
    const expectedHco3Acute = Math.max(12, 24 - 2.0 * (deltaPaco2 / 10));
    const expectedHco3Chronic = Math.max(12, 24 - 5.0 * (deltaPaco2 / 10));
    const expectedValueText = `Expected HCO3: Acute = ${expectedHco3Acute.toFixed(1)} mEq/L, Chronic = ${expectedHco3Chronic.toFixed(1)} mEq/L`;

    let status: AbgCompensation['status'] = 'adequate';
    let concomitantDisorder: string | undefined = undefined;

    if (hco3 < expectedHco3Chronic - 2) {
      status = 'over_compensated';
      concomitantDisorder = 'Concomitant Metabolic Acidosis';
    } else if (hco3 > expectedHco3Acute + 2) {
      status = 'under_compensated';
      concomitantDisorder = 'Concomitant Metabolic Alkalosis';
    }

    compensation = {
      type: 'respiratory_alkalosis',
      expectedValueText,
      isCompensated: status === 'adequate',
      status,
      concomitantDisorder,
    };
  }

  // Step 4: Anion Gap and Delta-Delta Ratio
  let anionGapAnalysis: AbgAnionGapAnalysis | null = null;

  if (sodium !== undefined && chloride !== undefined) {
    const rawAg = sodium - (chloride + hco3);
    let correctedAg: number | null = null;

    if (albumin !== undefined && albumin > 0) {
      // Figge-Jabor-Kazda-Fencl formula: Corrected AG = AG + 2.5 * (4.0 - Albumin)
      correctedAg = rawAg + 2.5 * (4.0 - albumin);
    }

    const effectiveAg = correctedAg ?? rawAg;
    const isHighAnionGap = effectiveAg > 12;

    let deltaGap: number | null = null;
    let deltaHco3: number | null = null;
    let deltaDeltaRatio: number | null = null;
    let deltaDeltaInterpretation: string | null = null;

    if (isHighAnionGap) {
      deltaGap = effectiveAg - 12;
      deltaHco3 = 24 - hco3;

      if (deltaHco3 > 0) {
        deltaDeltaRatio = +(deltaGap / deltaHco3).toFixed(2);

        if (deltaDeltaRatio < 0.4) {
          deltaDeltaInterpretation = 'Ratio < 0.4: Predominantly Normal Anion Gap Metabolic Acidosis (NAGMA / Hyperchloremic acidosis). Consider diarrhea, RTA, or large saline resuscitation.';
        } else if (deltaDeltaRatio < 0.8) {
          deltaDeltaInterpretation = 'Ratio 0.4 - 0.8: Mixed High Anion Gap (HAGMA) and Normal Anion Gap (NAGMA) acidosis. Look for concurrent renal failure/DKA with diarrhea or saline loading.';
        } else if (deltaDeltaRatio <= 2.0) {
          deltaDeltaInterpretation = 'Ratio 0.8 - 2.0: Pure High Anion Gap Metabolic Acidosis (HAGMA). Classic for uncomplicated DKA, lactic acidosis, or toxic alcohol ingestion.';
        } else {
          deltaDeltaInterpretation = 'Ratio > 2.0: HAGMA with concurrent Metabolic Alkalosis OR pre-existing chronic compensated respiratory acidosis (excess bicarbonate).';
        }
      } else {
        deltaDeltaInterpretation = 'HCO3 ≥ 24 with elevated Anion Gap: High Anion Gap Acidosis masked by significant concurrent Metabolic Alkalosis.';
      }
    }

    anionGapAnalysis = {
      rawAnionGap: +rawAg.toFixed(1),
      correctedAnionGap: correctedAg !== null ? +correctedAg.toFixed(1) : null,
      isHighAnionGap,
      deltaGap: deltaGap !== null ? +deltaGap.toFixed(1) : null,
      deltaHco3: deltaHco3 !== null ? +deltaHco3.toFixed(1) : null,
      deltaDeltaRatio,
      deltaDeltaInterpretation,
    };
  }

  // Summary diagnosis builder
  const disorderParts: string[] = [primaryDisorder];
  if (compensation.concomitantDisorder) {
    disorderParts.push(`with ${compensation.concomitantDisorder}`);
  }
  if (anionGapAnalysis?.isHighAnionGap) {
    disorderParts.push(`(High Anion Gap: ${anionGapAnalysis.correctedAnionGap ?? anionGapAnalysis.rawAnionGap} mEq/L)`);
  }
  const summaryDiagnosis = disorderParts.join(' ');

  // Optional P/F Ratio for ARDS
  let pfRatio: AbgResult['pfRatio'] | undefined = undefined;
  if (pao2 !== undefined && fio2 !== undefined && fio2 > 0) {
    const fraction = fio2 > 1.0 ? fio2 / 100 : fio2;
    const ratio = Math.round(pao2 / fraction);
    let ardsCategory = 'Normal oxygenation (P/F ≥ 300)';
    if (ratio < 100) ardsCategory = 'Severe ARDS (P/F < 100)';
    else if (ratio < 200) ardsCategory = 'Moderate ARDS (P/F 100-200)';
    else if (ratio < 300) ardsCategory = 'Mild ARDS (P/F 200-300)';

    pfRatio = { ratio, ardsCategory };
  }

  return {
    step1PhStatus,
    step2PrimaryDisorder: primaryDisorder,
    step3Compensation: compensation,
    step4AnionGap: anionGapAnalysis,
    summaryDiagnosis,
    clinicalPearls,
    pfRatio,
  };
}

// ==========================================
// 2. ELECTROLYTE SAFETY ENGINES
// ==========================================

export interface CorrectedSodiumResult {
  katzSodium: number;
  hillierSodium: number;
  glucoseElevation: number; // mg/dL over 100
  clinicalGuidance: string;
}

export function calculateCorrectedSodium(measuredNa: number, glucose: number): CorrectedSodiumResult {
  const glucoseDelta = Math.max(0, glucose - 100);
  const factor100 = glucoseDelta / 100;

  // Katz: +1.6 mEq/L per 100 mg/dL glucose over 100
  const katzSodium = +(measuredNa + 1.6 * factor100).toFixed(1);

  // Hillier et al. (1999): +2.4 mEq/L per 100 mg/dL glucose over 100
  const hillierSodium = +(measuredNa + 2.4 * factor100).toFixed(1);

  let clinicalGuidance = 'Hillier formula is the modern standard, especially for Glucose > 400 mg/dL (DKA/HHS).';
  if (glucose > 400) {
    clinicalGuidance = 'Severe Hyperglycemia (>400 mg/dL): Hillier formula (+2.4) prevents underestimation of hypernatremia. Use Hillier value for fluid tonicity selection.';
  } else if (glucose <= 100) {
    clinicalGuidance = 'Euglycemic: No osmotic fluid shifting adjustment necessary.';
  }

  return {
    katzSodium,
    hillierSodium,
    glucoseElevation: glucoseDelta,
    clinicalGuidance,
  };
}

export type BodyWaterSexCategory = 'elderly_female' | 'adult_female' | 'elderly_male' | 'adult_male' | 'child';

export interface FreeWaterDeficitInput {
  weightKg: number;
  serumSodium: number; // mEq/L
  category: BodyWaterSexCategory;
}

export interface FreeWaterDeficitResult {
  totalBodyWaterLiters: number;
  freeWaterDeficitLiters: number;
  maxHourlyCorrectionRate: string;
  safetyAlert: string;
}

export function calculateFreeWaterDeficit(input: FreeWaterDeficitInput): FreeWaterDeficitResult {
  const factors: Record<BodyWaterSexCategory, number> = {
    elderly_female: 0.45,
    adult_female: 0.50,
    elderly_male: 0.50,
    adult_male: 0.60,
    child: 0.60,
  };

  const factor = factors[input.category] ?? 0.60;
  const tbw = +(input.weightKg * factor).toFixed(1);

  // Deficit = TBW * ((Serum Na / 140) - 1)
  const deficitRaw = tbw * (input.serumSodium / 140 - 1);
  const freeWaterDeficitLiters = +(Math.max(0, deficitRaw)).toFixed(2);

  const maxHourlyCorrectionRate = 'Decrease serum Na by no more than 0.5 mEq/L per hour (maximum 8 - 10 mEq/L in 24 hours).';
  const safetyAlert = '⚠️ CRITICAL SAFETY LIMIT: Rapid correction of hypernatremia causes cerebral edema, brain herniation, and seizures. Replace deficit plus ongoing maintenance losses slowly over 48 to 72 hours.';

  return {
    totalBodyWaterLiters: tbw,
    freeWaterDeficitLiters,
    maxHourlyCorrectionRate,
    safetyAlert,
  };
}

export interface PotassiumRepletionInput {
  currentPotassium: number; // mEq/L (normal 3.5 - 5.0)
  targetPotassium?: number; // default 4.0 mEq/L
  hasRenalFailure?: boolean; // eGFR < 30
}

export interface PotassiumRepletionResult {
  estimatedDeficitMeq: number;
  recommendedDoseMeq: number;
  peripheralIvLimit: string;
  centralIvLimit: string;
  oralPreferenceNote: string;
  magnesiumRequirementAlert: string;
}

export function calculatePotassiumRepletion(input: PotassiumRepletionInput): PotassiumRepletionResult {
  const target = input.targetPotassium ?? 4.0;
  const drop = Math.max(0, +(target - input.currentPotassium).toFixed(2));

  // General rule: 0.1 mEq/L decrement below 4.0 ~ 10-20 mEq body deficit (use 10 mEq per 0.1 mEq/L baseline)
  let estimatedDeficit = Math.round((drop / 0.1) * 10);
  if (input.hasRenalFailure) {
    // In renal impairment, potassium excretion is blocked; lower initial repletion by 50%
    estimatedDeficit = Math.round(estimatedDeficit * 0.5);
  }

  const recommendedDoseMeq = estimatedDeficit;

  const peripheralIvLimit = 'Peripheral IV: Max rate 10 mEq/hour. Maximum fluid concentration 40 mEq/L to prevent chemical phlebitis and intense vein burning.';
  const centralIvLimit = 'Central Line (CVC): Max rate 20 mEq/hour with continuous cardiac telemetry monitoring. Emergency ICU resuscitation under continuous direct supervision: up to 40 mEq/hr.';
  const oralPreferenceNote = 'Oral potassium repletion (20-40 mEq PO per dose) is far safer than IV and preferred whenever the gastrointestinal tract is functional.';
  const magnesiumRequirementAlert = '🚨 CHECK MAGNESIUM FIRST: Hypomagnesemia (<2.0 mg/dL) inactivates the Na+/K+ ATPase pump and promotes uninhibited renal potassium wasting (ROMK channel disinhibition). Potassium will NOT correct until serum magnesium is normalized.';

  return {
    estimatedDeficitMeq: estimatedDeficit,
    recommendedDoseMeq,
    peripheralIvLimit,
    centralIvLimit,
    oralPreferenceNote,
    magnesiumRequirementAlert,
  };
}
