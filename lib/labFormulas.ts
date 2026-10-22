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
  const ph = typeof input.ph === 'number' && !isNaN(input.ph) && input.ph > 0 ? input.ph : 7.4;
  const paco2 = typeof input.paco2 === 'number' && !isNaN(input.paco2) && input.paco2 > 0 ? input.paco2 : 40;
  const hco3 = typeof input.hco3 === 'number' && !isNaN(input.hco3) && input.hco3 > 0 ? input.hco3 : 24;
  const sodium = typeof input.sodium === 'number' && !isNaN(input.sodium) ? input.sodium : undefined;
  const chloride = typeof input.chloride === 'number' && !isNaN(input.chloride) ? input.chloride : undefined;
  const albumin = typeof input.albumin === 'number' && !isNaN(input.albumin) && input.albumin > 0 ? input.albumin : undefined;
  const pao2 = typeof input.pao2 === 'number' && !isNaN(input.pao2) && input.pao2 > 0 ? input.pao2 : undefined;
  const fio2 = typeof input.fio2 === 'number' && !isNaN(input.fio2) && input.fio2 > 0 ? input.fio2 : undefined;

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
      // PaCO2 has risen beyond expected compensatory hypoventilation -> excess CO2 retention / respiratory acidosis
      compensation = {
        type: 'metabolic_alkalosis',
        expectedValueText,
        isCompensated: false,
        status: 'over_compensated',
        concomitantDisorder: 'Concomitant Respiratory Acidosis (excess CO₂ retention / hypoventilation)',
      };
      clinicalPearls.push('PaCO2 is higher than expected for metabolic alkalosis compensation: Concomitant respiratory acidosis present.');
    } else if (paco2 < lowerPaco2) {
      // PaCO2 has not risen to expected level -> insufficient hypoventilation / hyperventilation
      compensation = {
        type: 'metabolic_alkalosis',
        expectedValueText,
        isCompensated: false,
        status: 'under_compensated',
        concomitantDisorder: 'Concomitant Respiratory Alkalosis (inadequate hypoventilation / hyperventilation)',
      };
      clinicalPearls.push('PaCO2 is lower than expected for metabolic alkalosis compensation: Concomitant respiratory alkalosis present.');
    } else {
      compensation = {
        type: 'metabolic_alkalosis',
        expectedValueText,
        isCompensated: true,
        status: 'adequate',
      };
      clinicalPearls.push('Respiratory compensation for metabolic alkalosis is adequate.');
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
    } else if (isMetAcid) {
      deltaDeltaInterpretation = 'Normal Anion Gap Metabolic Acidosis (NAGMA / Hyperchloremic Acidosis): Anion gap is normal (≤12 mEq/L). Typical etiologies include gastrointestinal HCO3⁻ loss (severe diarrhea), Renal Tubular Acidosis (RTA), or rapid normal saline (0.9% NaCl) volume resuscitation.';
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

  // Summary diagnosis builder: Avoid duplicate text when primary is already combined
  const disorderParts: string[] = [primaryDisorder];
  if (compensation.concomitantDisorder && !primaryDisorder.startsWith('Combined (Mixed)')) {
    disorderParts.push(`with ${compensation.concomitantDisorder}`);
  }
  if (anionGapAnalysis) {
    if (anionGapAnalysis.isHighAnionGap) {
      const agVal = anionGapAnalysis.correctedAnionGap ?? anionGapAnalysis.rawAnionGap;
      disorderParts.push(`(High Anion Gap: ${agVal} mEq/L${anionGapAnalysis.correctedAnionGap !== null ? ' [Albumin-corrected]' : ''})`);
    } else if (isMetAcid) {
      disorderParts.push(`(Normal Anion Gap: ${anionGapAnalysis.correctedAnionGap ?? anionGapAnalysis.rawAnionGap} mEq/L [NAGMA])`);
    }
  }
  const summaryDiagnosis = disorderParts.join(' ');

  // Optional P/F Ratio for ARDS
  let pfRatio: AbgResult['pfRatio'] | undefined = undefined;
  if (pao2 !== undefined && fio2 !== undefined && fio2 > 0 && !isNaN(pao2) && !isNaN(fio2)) {
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
  const na = typeof measuredNa === 'number' && !isNaN(measuredNa) ? measuredNa : 140;
  const glu = typeof glucose === 'number' && !isNaN(glucose) ? glucose : 100;
  const glucoseDelta = Math.max(0, glu - 100);
  const factor100 = glucoseDelta / 100;

  // Katz: +1.6 mEq/L per 100 mg/dL glucose over 100
  const katzSodium = +(na + 1.6 * factor100).toFixed(1);

  // Hillier et al. (1999): +2.4 mEq/L per 100 mg/dL glucose over 100
  const hillierSodium = +(na + 2.4 * factor100).toFixed(1);

  let clinicalGuidance = 'Hillier formula is the modern standard, especially for Glucose > 400 mg/dL (DKA/HHS).';
  if (glu > 400) {
    clinicalGuidance = 'Severe Hyperglycemia (>400 mg/dL): Hillier formula (+2.4) prevents underestimation of hypernatremia. Use Hillier value for fluid tonicity selection.';
  } else if (glu <= 100) {
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

  const wt = typeof input.weightKg === 'number' && !isNaN(input.weightKg) && input.weightKg > 0 ? input.weightKg : 70;
  const na = typeof input.serumSodium === 'number' && !isNaN(input.serumSodium) && input.serumSodium > 0 ? input.serumSodium : 140;

  const factor = factors[input.category] ?? 0.60;
  const tbw = +(wt * factor).toFixed(1);

  // Deficit = TBW * ((Serum Na / 140) - 1)
  const deficitRaw = tbw * (na / 140 - 1);
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
  hyperkalemiaAlert?: string;
  isHyperkalemic: boolean;
}

export function calculatePotassiumRepletion(input: PotassiumRepletionInput): PotassiumRepletionResult {
  const currentK = typeof input.currentPotassium === 'number' && !isNaN(input.currentPotassium) ? input.currentPotassium : 4.0;
  const target = input.targetPotassium !== undefined && !isNaN(input.targetPotassium) ? input.targetPotassium : 4.0;
  const isHyperkalemic = currentK > 5.0;

  let hyperkalemiaAlert: string | undefined = undefined;
  if (isHyperkalemic) {
    hyperkalemiaAlert = '🚨 CRITICAL HYPERKALEMIA ALERT (K⁺ > 5.0 mEq/L): Do NOT administer potassium! Immediately obtain 12-lead ECG. If peaked T waves, PR prolongation, or QRS widening: give IV Calcium Gluconate (10 mL 10% over 2-3 min) to stabilize myocardium, followed by Regular Insulin 10U IV + 50 mL D50W, nebulized Albuterol (10-20 mg), and loop diuretics / emergent hemodialysis.';
  }

  const drop = Math.max(0, +(target - currentK).toFixed(2));

  // General rule: 0.1 mEq/L decrement below 4.0 ~ 10-20 mEq body deficit (use 10 mEq per 0.1 mEq/L baseline)
  let estimatedDeficit = Math.round((drop / 0.1) * 10);
  if (input.hasRenalFailure) {
    // In renal impairment, potassium excretion is blocked; lower initial repletion by 50%
    estimatedDeficit = Math.round(estimatedDeficit * 0.5);
  }

  const recommendedDoseMeq = isHyperkalemic ? 0 : estimatedDeficit;

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
    hyperkalemiaAlert,
    isHyperkalemic,
  };
}
