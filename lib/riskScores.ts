/**
 * Clinical Risk Scores Suite
 * Pure calculation functions for evidence-based clinical risk stratification.
 */

// ==========================================
// 1. WELLS DVT SCORE (Deep Vein Thrombosis)
// ==========================================
export interface WellsDvtInput {
  activeCancer?: boolean; // +1
  paralysisOrImmobilization?: boolean; // +1
  bedriddenOrMajorSurgery?: boolean; // +1
  localizedTenderness?: boolean; // +1
  entireLegSwollen?: boolean; // +1
  calfSwellingGt3cm?: boolean; // +1 (measured 10 cm below tibial tuberosity)
  pittingEdemaConfined?: boolean; // +1
  collateralSuperficialVeins?: boolean; // +1
  previousDvt?: boolean; // +1
  alternativeDiagnosisLikely?: boolean; // -2
}

export interface WellsDvtResult {
  score: number;
  riskTierThree: 'Low' | 'Moderate' | 'High';
  riskTierTwo: 'Unlikely' | 'Likely';
  dvtProbability: string;
  clinicalAction: string;
}

export function calculateWellsDvt(input: WellsDvtInput): WellsDvtResult {
  let score = 0;
  if (input.activeCancer) score += 1;
  if (input.paralysisOrImmobilization) score += 1;
  if (input.bedriddenOrMajorSurgery) score += 1;
  if (input.localizedTenderness) score += 1;
  if (input.entireLegSwollen) score += 1;
  if (input.calfSwellingGt3cm) score += 1;
  if (input.pittingEdemaConfined) score += 1;
  if (input.collateralSuperficialVeins) score += 1;
  if (input.previousDvt) score += 1;
  if (input.alternativeDiagnosisLikely) score -= 2;

  const riskTierTwo = score >= 2 ? 'Likely' : 'Unlikely';

  let riskTierThree: 'Low' | 'Moderate' | 'High' = 'Low';
  let dvtProbability = '~5% (low pretest probability)';
  let clinicalAction = 'High-sensitivity D-dimer testing recommended. If negative, DVT safely ruled out without ultrasound.';

  if (score >= 3) {
    riskTierThree = 'High';
    dvtProbability = '~53-75% (high pretest probability)';
    clinicalAction = 'Perform proximal venous compression ultrasonography (CUS) directly. Do not rely solely on D-dimer.';
  } else if (score >= 1) {
    riskTierThree = 'Moderate';
    dvtProbability = '~17% (moderate pretest probability)';
    clinicalAction = 'High-sensitivity D-dimer or venous ultrasound indicated. If D-dimer is positive, perform ultrasound.';
  }

  return {
    score,
    riskTierThree,
    riskTierTwo,
    dvtProbability,
    clinicalAction,
  };
}

// ==========================================
// 2. WELLS PE SCORE & PERC RULE-OUT
// ==========================================
export interface PercInput {
  ageGte50?: boolean;
  heartRateGte100?: boolean;
  spo2Lt95?: boolean;
  unilateralLegSwelling?: boolean;
  hemoptysis?: boolean;
  recentSurgeryOrTrauma?: boolean;
  priorDvtPe?: boolean;
  hormoneUse?: boolean;
}

export interface WellsPeInput {
  clinicalSignsDvt?: boolean; // +3.0
  alternativeDiagnosisLessLikely?: boolean; // +3.0
  heartRateGt100?: boolean; // +1.5
  immobilizationOrSurgery?: boolean; // +1.5
  previousDvtPe?: boolean; // +1.5
  hemoptysis?: boolean; // +1.0
  malignancy?: boolean; // +1.0
  percCriteria?: PercInput;
}

export interface WellsPeResult {
  score: number;
  threeTierRisk: 'Low' | 'Moderate' | 'High';
  twoTierRisk: 'Unlikely' | 'Likely';
  peProbability: string;
  percApplicable: boolean;
  percRuleOut: boolean;
  clinicalAction: string;
}

export function calculateWellsPe(input: WellsPeInput): WellsPeResult {
  let score = 0;
  if (input.clinicalSignsDvt) score += 3.0;
  if (input.alternativeDiagnosisLessLikely) score += 3.0;
  if (input.heartRateGt100) score += 1.5;
  if (input.immobilizationOrSurgery) score += 1.5;
  if (input.previousDvtPe) score += 1.5;
  if (input.hemoptysis) score += 1.0;
  if (input.malignancy) score += 1.0;

  const twoTierRisk = score > 4.0 ? 'Likely' : 'Unlikely';

  let threeTierRisk: 'Low' | 'Moderate' | 'High' = 'Low';
  let peProbability = '~1.3-3.6% (low risk)';
  let clinicalAction = 'Consider PERC criteria or high-sensitivity D-dimer testing.';

  if (score > 6.0) {
    threeTierRisk = 'High';
    peProbability = '~38-65% (high risk)';
    clinicalAction = 'CTA chest (CT pulmonary angiogram) indicated immediately. Initiate therapeutic anticoagulation if no contraindications.';
  } else if (score >= 2.0) {
    threeTierRisk = 'Moderate';
    peProbability = '~16-28% (moderate risk)';
    clinicalAction = 'High-sensitivity D-dimer testing indicated. If elevated, obtain urgent CTA chest.';
  }

  // PERC Rule-Out evaluation (applicable when low risk or PE unlikely)
  const percApplicable = score < 2.0 || twoTierRisk === 'Unlikely';
  let percRuleOut = false;

  if (percApplicable && input.percCriteria) {
    const {
      ageGte50,
      heartRateGte100,
      spo2Lt95,
      unilateralLegSwelling,
      hemoptysis,
      recentSurgeryOrTrauma,
      priorDvtPe,
      hormoneUse,
    } = input.percCriteria;

    const hasAnyPercRisk = !!(
      ageGte50 ||
      heartRateGte100 ||
      spo2Lt95 ||
      unilateralLegSwelling ||
      hemoptysis ||
      recentSurgeryOrTrauma ||
      priorDvtPe ||
      hormoneUse
    );

    if (!hasAnyPercRisk) {
      percRuleOut = true;
      clinicalAction = 'PERC negative in low-risk patient: Pulmonary embolism ruled out clinically (<1.8% risk). No D-dimer or imaging required.';
    }
  }

  return {
    score,
    threeTierRisk,
    twoTierRisk,
    peProbability,
    percApplicable,
    percRuleOut,
    clinicalAction,
  };
}

// ==========================================
// 3. CHA2DS2-VASc SCORE
// ==========================================
export interface Cha2ds2VascInput {
  chf?: boolean; // +1
  hypertension?: boolean; // +1
  age: number; // >=75 -> +2; 65-74 -> +1
  diabetes?: boolean; // +1
  strokeOrTiaOrVte?: boolean; // +2
  vascularDisease?: boolean; // +1 (prior MI, PAD, aortic plaque)
  sex: 'M' | 'F'; // Female -> +1
}

export interface Cha2ds2VascResult {
  score: number;
  annualStrokeRiskPercent: number;
  anticoagulationRecommendation: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
}

export function calculateCha2ds2Vasc(input: Cha2ds2VascInput): Cha2ds2VascResult {
  let score = 0;
  if (input.chf) score += 1;
  if (input.hypertension) score += 1;

  if (input.age >= 75) {
    score += 2;
  } else if (input.age >= 65) {
    score += 1;
  }

  if (input.diabetes) score += 1;
  if (input.strokeOrTiaOrVte) score += 2;
  if (input.vascularDisease) score += 1;
  if (input.sex === 'F') score += 1;

  // Annual adjusted stroke risk rate (% per year) based on Lip et al. / ESC
  const strokeRiskTable = [0.2, 0.6, 2.2, 3.2, 4.8, 7.2, 9.7, 11.2, 10.8, 15.2];
  const annualStrokeRiskPercent = strokeRiskTable[Math.min(score, 9)];

  let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
  let anticoagulationRecommendation = '';

  if (input.sex === 'M') {
    if (score === 0) {
      riskLevel = 'Low';
      anticoagulationRecommendation = 'Score 0: Truly low risk. No antithrombotic or antiplatelet therapy recommended.';
    } else if (score === 1) {
      riskLevel = 'Moderate';
      anticoagulationRecommendation = 'Score 1: Moderate risk. Oral anticoagulation (DOAC preferred over Warfarin) should be considered (Class IIa).';
    } else {
      riskLevel = 'High';
      anticoagulationRecommendation = 'Score ≥ 2: High risk. Oral anticoagulation (DOAC: Apixaban, Rivaroxaban, Dabigatran, or Edoxaban) strongly recommended (Class I).';
    }
  } else {
    // Female
    if (score === 1) {
      riskLevel = 'Low';
      anticoagulationRecommendation = 'Score 1 (female sex alone): Low risk. No antithrombotic therapy indicated.';
    } else if (score === 2) {
      riskLevel = 'Moderate';
      anticoagulationRecommendation = 'Score 2: Moderate risk. Oral anticoagulation (DOAC preferred) should be considered (Class IIa).';
    } else {
      riskLevel = 'High';
      anticoagulationRecommendation = 'Score ≥ 3: High risk. Oral anticoagulation (DOAC preferred over Warfarin) strongly recommended (Class I).';
    }
  }

  return {
    score,
    annualStrokeRiskPercent,
    anticoagulationRecommendation,
    riskLevel,
  };
}

// ==========================================
// 4. CURB-65 & PSI (Pneumonia Triage)
// ==========================================
export interface Curb65Input {
  confusion?: boolean; // +1
  bunGt19?: boolean; // +1 (BUN > 19 mg/dL or > 7 mmol/L)
  rrGte30?: boolean; // +1 (RR >= 30 bpm)
  bpLow?: boolean; // +1 (SBP < 90 mmHg or DBP <= 60 mmHg)
  ageGte65?: boolean; // +1
}

export interface Curb65Result {
  score: number;
  mortalityPercent: string;
  triageGroup: 'Outpatient' | 'Inpatient Ward' | 'Severe / ICU Assessment';
  recommendation: string;
}

export function calculateCurb65(input: Curb65Input): Curb65Result {
  let score = 0;
  if (input.confusion) score += 1;
  if (input.bunGt19) score += 1;
  if (input.rrGte30) score += 1;
  if (input.bpLow) score += 1;
  if (input.ageGte65) score += 1;

  let mortalityPercent = '0.6%';
  let triageGroup: 'Outpatient' | 'Inpatient Ward' | 'Severe / ICU Assessment' = 'Outpatient';
  let recommendation = 'Low risk: Suitable for outpatient treatment with oral antibiotics and close follow-up.';

  if (score === 1) {
    mortalityPercent = '2.7%';
    triageGroup = 'Outpatient';
    recommendation = 'Low risk: Outpatient treatment usually feasible. Evaluate social support and home oxygenation.';
  } else if (score === 2) {
    mortalityPercent = '6.8%';
    triageGroup = 'Inpatient Ward';
    recommendation = 'Moderate risk: Inpatient admission or monitored outpatient observation unit recommended.';
  } else if (score === 3) {
    mortalityPercent = '14.0%';
    triageGroup = 'Inpatient Ward';
    recommendation = 'Severe pneumonia: Urgent hospital admission with consideration for intensive monitoring.';
  } else if (score >= 4) {
    mortalityPercent = '27.8%';
    triageGroup = 'Severe / ICU Assessment';
    recommendation = 'Critical severity: Urgent hospital admission with mandatory assessment for ICU admission and mechanical/vasopressor support.';
  }

  return {
    score,
    mortalityPercent,
    triageGroup,
    recommendation,
  };
}

export interface PsiInput {
  age: number;
  sex: 'M' | 'F';
  nursingHomeResident?: boolean; // +10
  neoplasticDisease?: boolean; // +30
  liverDisease?: boolean; // +20
  chf?: boolean; // +10
  cerebrovascularDisease?: boolean; // +10
  renalDisease?: boolean; // +10
  alteredMentalStatus?: boolean; // +20
  rrGte30?: boolean; // +20
  sbpLt90?: boolean; // +20
  tempAbnormal?: boolean; // +15 (<35°C or >=40°C)
  pulseGte125?: boolean; // +10
  arterialPhLt735?: boolean; // +30
  bunGte30?: boolean; // +20 (>=10.7 mmol/L)
  sodiumLt130?: boolean; // +20
  glucoseGte250?: boolean; // +10 (>=14 mmol/L)
  hematocritLt30?: boolean; // +10
  pao2Lt60orSpo2Lt90?: boolean; // +10
  pleuralEffusion?: boolean; // +10
}

export interface PsiResult {
  score: number;
  classTier: 'Class I' | 'Class II' | 'Class III' | 'Class IV' | 'Class V';
  mortalityPercent: string;
  triageRecommendation: string;
}

export function calculatePsi(input: PsiInput): PsiResult {
  // Base demographic points
  let score = input.sex === 'M' ? input.age : Math.max(0, input.age - 10);

  if (input.nursingHomeResident) score += 10;
  if (input.neoplasticDisease) score += 30;
  if (input.liverDisease) score += 20;
  if (input.chf) score += 10;
  if (input.cerebrovascularDisease) score += 10;
  if (input.renalDisease) score += 10;

  if (input.alteredMentalStatus) score += 20;
  if (input.rrGte30) score += 20;
  if (input.sbpLt90) score += 20;
  if (input.tempAbnormal) score += 15;
  if (input.pulseGte125) score += 10;

  if (input.arterialPhLt735) score += 30;
  if (input.bunGte30) score += 20;
  if (input.sodiumLt130) score += 20;
  if (input.glucoseGte250) score += 10;
  if (input.hematocritLt30) score += 10;
  if (input.pao2Lt60orSpo2Lt90) score += 10;
  if (input.pleuralEffusion) score += 10;

  // Class assignment
  // Class I: Age <= 50 without any comorbidities, altered mental status, or abnormal vitals
  const hasComorbidities = !!(
    input.neoplasticDisease ||
    input.liverDisease ||
    input.chf ||
    input.cerebrovascularDisease ||
    input.renalDisease ||
    input.nursingHomeResident
  );
  const hasVitalsAbnormality = !!(
    input.alteredMentalStatus ||
    input.rrGte30 ||
    input.sbpLt90 ||
    input.tempAbnormal ||
    input.pulseGte125
  );

  let classTier: PsiResult['classTier'] = 'Class II';
  let mortalityPercent = '0.6%';
  let triageRecommendation = 'Class II: Outpatient care safe.';

  if (input.age <= 50 && !hasComorbidities && !hasVitalsAbnormality) {
    classTier = 'Class I';
    mortalityPercent = '0.1%';
    triageRecommendation = 'Class I: Very low risk. Outpatient management recommended.';
  } else if (score <= 70) {
    classTier = 'Class II';
    mortalityPercent = '0.6%';
    triageRecommendation = 'Class II: Low risk. Outpatient management safe and cost-effective.';
  } else if (score <= 90) {
    classTier = 'Class III';
    mortalityPercent = '0.9 - 2.8%';
    triageRecommendation = 'Class III: Low/intermediate risk. Consider brief observation unit stay or outpatient with close follow-up.';
  } else if (score <= 130) {
    classTier = 'Class IV';
    mortalityPercent = '8.2 - 9.3%';
    triageRecommendation = 'Class IV: Moderate risk. Inpatient hospital admission required.';
  } else {
    classTier = 'Class V';
    mortalityPercent = '27.0 - 31.1%';
    triageRecommendation = 'Class V: High risk. Inpatient admission mandatory; prompt evaluation for ICU admission.';
  }

  return {
    score,
    classTier,
    mortalityPercent,
    triageRecommendation,
  };
}

// ==========================================
// 5. qSOFA & SOFA (Sepsis-3)
// ==========================================
export interface QsofaInput {
  alteredMentalStatus?: boolean; // GCS < 15 (+1)
  rrGte22?: boolean; // RR >= 22 (+1)
  sbpLte100?: boolean; // SBP <= 100 mmHg (+1)
}

export interface QsofaResult {
  score: number;
  isHighRisk: boolean;
  clinicalAction: string;
}

export function calculateQsofa(input: QsofaInput): QsofaResult {
  let score = 0;
  if (input.alteredMentalStatus) score += 1;
  if (input.rrGte22) score += 1;
  if (input.sbpLte100) score += 1;

  const isHighRisk = score >= 2;
  const clinicalAction = isHighRisk
    ? '🚨 High risk for in-hospital mortality / prolonged ICU stay (≥2 points). Promptly assess for organ dysfunction, calculate full SOFA score, draw blood cultures, check lactate, and administer sepsis bundle.'
    : 'qSOFA < 2: Lower risk of poor sepsis outcome at bedside screen. Maintain vigilance and repeat if condition deteriorates.';

  return {
    score,
    isHighRisk,
    clinicalAction,
  };
}

export interface SofaInput {
  pao2Fio2: number; // PaO2 in mmHg / (FiO2 as fraction 0.21 - 1.0)
  mechanicallyVentilated?: boolean;
  platelets: number; // x10^3/µL
  bilirubin: number; // mg/dL
  cardiovascular: {
    map: number;
    dopamineDose?: number; // mcg/kg/min
    dobutamineDose?: number; // mcg/kg/min
    epinephrineDose?: number; // mcg/kg/min
    norepinephrineDose?: number; // mcg/kg/min
  };
  gcs: number; // 3 - 15
  creatinine: number; // mg/dL
  urineOutput24h?: number; // mL/day
}

export interface SofaResult {
  respirationScore: number;
  coagulationScore: number;
  liverScore: number;
  cardiovascularScore: number;
  cnsScore: number;
  renalScore: number;
  totalScore: number;
  mortalityEstimate: string;
  sepsisSignificance: string;
}

export function calculateSofa(input: SofaInput): SofaResult {
  // 1. Respiration
  let respirationScore = 0;
  if (input.pao2Fio2 < 100 && input.mechanicallyVentilated) {
    respirationScore = 4;
  } else if (input.pao2Fio2 < 200 && input.mechanicallyVentilated) {
    respirationScore = 3;
  } else if (input.pao2Fio2 < 300) {
    respirationScore = 2;
  } else if (input.pao2Fio2 < 400) {
    respirationScore = 1;
  }

  // 2. Coagulation (Platelets)
  let coagulationScore = 0;
  if (input.platelets < 20) {
    coagulationScore = 4;
  } else if (input.platelets < 50) {
    coagulationScore = 3;
  } else if (input.platelets < 100) {
    coagulationScore = 2;
  } else if (input.platelets < 150) {
    coagulationScore = 1;
  }

  // 3. Liver (Bilirubin mg/dL)
  let liverScore = 0;
  if (input.bilirubin >= 12.0) {
    liverScore = 4;
  } else if (input.bilirubin >= 6.0) {
    liverScore = 3;
  } else if (input.bilirubin >= 2.0) {
    liverScore = 2;
  } else if (input.bilirubin >= 1.2) {
    liverScore = 1;
  }

  // 4. Cardiovascular
  let cardiovascularScore = 0;
  const { map, dopamineDose = 0, dobutamineDose = 0, epinephrineDose = 0, norepinephrineDose = 0 } = input.cardiovascular;
  if (dopamineDose > 15 || epinephrineDose > 0.1 || norepinephrineDose > 0.1) {
    cardiovascularScore = 4;
  } else if (dopamineDose > 5 || (epinephrineDose > 0 && epinephrineDose <= 0.1) || (norepinephrineDose > 0 && norepinephrineDose <= 0.1)) {
    cardiovascularScore = 3;
  } else if (dopamineDose > 0 || dobutamineDose > 0) {
    cardiovascularScore = 2;
  } else if (map < 70) {
    cardiovascularScore = 1;
  }

  // 5. CNS (GCS)
  let cnsScore = 0;
  if (input.gcs < 6) {
    cnsScore = 4;
  } else if (input.gcs <= 9) {
    cnsScore = 3;
  } else if (input.gcs <= 12) {
    cnsScore = 2;
  } else if (input.gcs <= 14) {
    cnsScore = 1;
  }

  // 6. Renal (Creatinine mg/dL or Urine Output)
  let renalScore = 0;
  const uo = input.urineOutput24h;
  if (input.creatinine >= 5.0 || (uo !== undefined && uo < 200)) {
    renalScore = 4;
  } else if (input.creatinine >= 3.5 || (uo !== undefined && uo < 500)) {
    renalScore = 3;
  } else if (input.creatinine >= 2.0) {
    renalScore = 2;
  } else if (input.creatinine >= 1.2) {
    renalScore = 1;
  }

  const totalScore = respirationScore + coagulationScore + liverScore + cardiovascularScore + cnsScore + renalScore;

  let mortalityEstimate = '<10%';
  if (totalScore >= 15) {
    mortalityEstimate = '>80-90%';
  } else if (totalScore >= 12) {
    mortalityEstimate = '50-60%';
  } else if (totalScore >= 9) {
    mortalityEstimate = '33-40%';
  } else if (totalScore >= 6) {
    mortalityEstimate = '15-20%';
  } else if (totalScore >= 2) {
    mortalityEstimate = '10-15%';
  }

  const sepsisSignificance = totalScore >= 2
    ? 'An acute change of ≥2 points from baseline defines sepsis-associated organ failure according to Sepsis-3 consensus.'
    : 'Score < 2: Organ failure thresholds not yet met. Continue monitoring trajectory.';

  return {
    respirationScore,
    coagulationScore,
    liverScore,
    cardiovascularScore,
    cnsScore,
    renalScore,
    totalScore,
    mortalityEstimate,
    sepsisSignificance,
  };
}

// ==========================================
// 6. GCS & GCS-P (Glasgow Coma Scale & Pupils)
// ==========================================
export interface GcsInput {
  eyeOpening: 1 | 2 | 3 | 4;
  verbalResponse: 1 | 2 | 3 | 4 | 5;
  motorResponse: 1 | 2 | 3 | 4 | 5 | 6;
  unreactivePupils?: 0 | 1 | 2; // Pupil Reactivity Score (PRS): 0=both react, 1=one unreactive, 2=neither react
}

export interface GcsResult {
  gcs: number; // 3 - 15
  prs: number; // 0 - 2
  gcsp: number; // 1 - 15
  severity: 'Mild' | 'Moderate' | 'Severe';
  airwayImplication: string;
}

export function calculateGcs(input: GcsInput): GcsResult {
  const gcs = input.eyeOpening + input.verbalResponse + input.motorResponse;
  const prs = input.unreactivePupils ?? 0;
  const gcsp = Math.max(1, gcs - prs);

  let severity: 'Mild' | 'Moderate' | 'Severe' = 'Mild';
  let airwayImplication = 'Intact airway protective reflexes generally present. Routine airway monitoring.';

  if (gcs <= 8 || gcsp <= 8) {
    severity = 'Severe';
    airwayImplication = '⚠️ GCS ≤ 8 (Severe Brain Injury): Loss of airway reflexes likely. Strongly consider endotracheal intubation for airway protection.';
  } else if (gcs <= 12) {
    severity = 'Moderate';
    airwayImplication = 'Moderate Brain Injury: Frequent neurological checks required. Airway reflexes may quickly degrade if deteriorating.';
  }

  return {
    gcs,
    prs,
    gcsp,
    severity,
    airwayImplication,
  };
}

// ==========================================
// 7. NIHSS & THROMBOLYSIS CHECKLIST
// ==========================================
export interface NihssInput {
  loc1a: number; // 0-3
  loc1bQuestions: number; // 0-2
  loc1cCommands: number; // 0-2
  bestGaze: number; // 0-2
  visualFields: number; // 0-3
  facialPalsy: number; // 0-3
  motorArmLeft: number; // 0-4
  motorArmRight: number; // 0-4
  motorLegLeft: number; // 0-4
  motorLegRight: number; // 0-4
  limbAtaxia: number; // 0-2
  sensory: number; // 0-2
  bestLanguage: number; // 0-3
  dysarthria: number; // 0-2
  extinctionInattention: number; // 0-2
}

export interface ThrombolysisChecklist {
  timeFromLknHours: number; // <= 4.5
  noIntracranialHemorrhage: boolean;
  sbpLt185AndDbpLt110: boolean;
  glucoseGt50: boolean;
  plateletsGte100k: boolean;
  inrLte17AndNoDoac: boolean;
  noRecentTraumaSurgeryOrStroke: boolean;
}

export interface NihssResult {
  score: number;
  severityTier: 'No Stroke Symptoms' | 'Minor Stroke' | 'Moderate Stroke' | 'Moderate to Severe Stroke' | 'Severe Stroke';
  thrombolysisEligible?: boolean;
  thrombolysisRemarks?: string;
}

export function calculateNihss(input: NihssInput, checklist?: ThrombolysisChecklist): NihssResult {
  const score =
    input.loc1a +
    input.loc1bQuestions +
    input.loc1cCommands +
    input.bestGaze +
    input.visualFields +
    input.facialPalsy +
    input.motorArmLeft +
    input.motorArmRight +
    input.motorLegLeft +
    input.motorLegRight +
    input.limbAtaxia +
    input.sensory +
    input.bestLanguage +
    input.dysarthria +
    input.extinctionInattention;

  let severityTier: NihssResult['severityTier'] = 'No Stroke Symptoms';
  if (score >= 21) {
    severityTier = 'Severe Stroke';
  } else if (score >= 16) {
    severityTier = 'Moderate to Severe Stroke';
  } else if (score >= 5) {
    severityTier = 'Moderate Stroke';
  } else if (score >= 1) {
    severityTier = 'Minor Stroke';
  }

  let thrombolysisEligible: boolean | undefined = undefined;
  let thrombolysisRemarks: string | undefined = undefined;

  if (checklist) {
    const timeOk = checklist.timeFromLknHours <= 4.5;
    const meetsCriteria =
      timeOk &&
      checklist.noIntracranialHemorrhage &&
      checklist.sbpLt185AndDbpLt110 &&
      checklist.glucoseGt50 &&
      checklist.plateletsGte100k &&
      checklist.inrLte17AndNoDoac &&
      checklist.noRecentTraumaSurgeryOrStroke;

    thrombolysisEligible = meetsCriteria;
    if (meetsCriteria) {
      thrombolysisRemarks = 'Candidate for IV Thrombolysis (Alteplase 0.9 mg/kg max 90 mg or Tenecteplase 0.25 mg/kg max 25 mg) within the 4.5-hour window.';
    } else {
      const contraindications: string[] = [];
      if (!timeOk) contraindications.push('Window exceeded >4.5h');
      if (!checklist.noIntracranialHemorrhage) contraindications.push('Intracranial hemorrhage confirmed/suspected');
      if (!checklist.sbpLt185AndDbpLt110) contraindications.push('Uncontrolled hypertension (BP ≥ 185/110)');
      if (!checklist.glucoseGt50) contraindications.push('Severe hypoglycemia (<50 mg/dL)');
      if (!checklist.plateletsGte100k) contraindications.push('Thrombocytopenia (<100k)');
      if (!checklist.inrLte17AndNoDoac) contraindications.push('Coagulopathy / active DOAC');
      if (!checklist.noRecentTraumaSurgeryOrStroke) contraindications.push('Recent trauma, surgery, or stroke <3 mo');

      thrombolysisRemarks = `IV Thrombolysis contraindicated: ${contraindications.join(', ')}. Evaluate for endovascular thrombectomy (EVT) if large vessel occlusion present.`;
    }
  }

  return {
    score,
    severityTier,
    thrombolysisEligible,
    thrombolysisRemarks,
  };
}

// ==========================================
// 8. MELD-Na & CHILD-PUGH
// ==========================================
export interface MeldNaInput {
  creatinine: number; // mg/dL
  bilirubin: number; // mg/dL
  inr: number;
  sodium: number; // mEq/L
  onDialysisTwicePastWeek?: boolean;
}

export interface MeldNaResult {
  meld: number;
  meldNa: number;
  mortality90Day: string;
  allocationCategory: string;
}

export function calculateMeldNa(input: MeldNaInput): MeldNaResult {
  // UNOS / OPTN Rules:
  // Values < 1.0 set to 1.0
  let cr = Math.max(1.0, input.creatinine);
  const bili = Math.max(1.0, input.bilirubin);
  const inr = Math.max(1.0, input.inr);

  // If dialyzed twice in prior 7 days or CVVH 24h, Cr set to 4.0
  if (input.onDialysisTwicePastWeek || cr > 4.0) {
    cr = 4.0;
  }

  // Original MELD equation: 9.57*ln(Cr) + 3.78*ln(Bili) + 11.2*ln(INR) + 6.43
  const rawMeld = 9.57 * Math.log(cr) + 3.78 * Math.log(bili) + 11.2 * Math.log(inr) + 6.43;
  const meld = Math.round(rawMeld);

  // MELD-Na calculation (UNOS formula):
  // If MELD > 11, adjust for Sodium bounded between 125 and 137
  let meldNa = meld;
  if (meld > 11) {
    const boundedNa = Math.min(137, Math.max(125, input.sodium));
    const rawMeldNa = meld + 1.32 * (137 - boundedNa) - 0.033 * meld * (137 - boundedNa);
    meldNa = Math.round(rawMeldNa);
  }

  // Bound MELD-Na between 6 and 40
  meldNa = Math.max(6, Math.min(40, meldNa));

  let mortality90Day = '1.9%';
  if (meldNa >= 40) mortality90Day = '71.3%';
  else if (meldNa >= 30) mortality90Day = '52.6%';
  else if (meldNa >= 20) mortality90Day = '19.6%';
  else if (meldNa >= 10) mortality90Day = '6.0%';

  const allocationCategory = meldNa >= 30
    ? 'Critical: Priority Tier 1 candidate for urgent liver transplantation.'
    : meldNa >= 20
    ? 'High Priority: Substantial waitlist mortality risk.'
    : meldNa >= 15
    ? 'Moderate: Transplant evaluation indicated.'
    : 'Low: Stable outpatient hepatic monitoring.';

  return {
    meld,
    meldNa,
    mortality90Day,
    allocationCategory,
  };
}

export interface ChildPughInput {
  bilirubin: number; // mg/dL
  albumin: number; // g/dL
  inr: number;
  ascites: 'none' | 'slight_moderate' | 'severe_refractory';
  encephalopathy: 'none' | 'grade_1_2' | 'grade_3_4';
}

export interface ChildPughResult {
  score: number;
  classGroup: 'Class A' | 'Class B' | 'Class C';
  oneYearSurvival: string;
  perioperativeMortality: string;
}

export function calculateChildPugh(input: ChildPughInput): ChildPughResult {
  let score = 0;

  // 1. Bilirubin
  if (input.bilirubin > 3.0) score += 3;
  else if (input.bilirubin >= 2.0) score += 2;
  else score += 1;

  // 2. Albumin
  if (input.albumin < 2.8) score += 3;
  else if (input.albumin <= 3.5) score += 2;
  else score += 1;

  // 3. INR
  if (input.inr > 2.3) score += 3;
  else if (input.inr >= 1.7) score += 2;
  else score += 1;

  // 4. Ascites
  if (input.ascites === 'severe_refractory') score += 3;
  else if (input.ascites === 'slight_moderate') score += 2;
  else score += 1;

  // 5. Encephalopathy
  if (input.encephalopathy === 'grade_3_4') score += 3;
  else if (input.encephalopathy === 'grade_1_2') score += 2;
  else score += 1;

  let classGroup: 'Class A' | 'Class B' | 'Class C' = 'Class A';
  let oneYearSurvival = '100%';
  let perioperativeMortality = '~10% (well compensated)';

  if (score >= 10) {
    classGroup = 'Class C';
    oneYearSurvival = '45%';
    perioperativeMortality = '70-80% (decompensated cirrhosis, surgery contraindicated except emergencies)';
  } else if (score >= 7) {
    classGroup = 'Class B';
    oneYearSurvival = '80%';
    perioperativeMortality = '~30% (moderate perioperative risk, extensive optimization required)';
  }

  return {
    score,
    classGroup,
    oneYearSurvival,
    perioperativeMortality,
  };
}

// ==========================================
// 9. CKD-EPI 2021 (Race-Free eGFR)
// ==========================================
export interface CkdEpi2021Input {
  creatinine: number; // mg/dL
  age: number; // years
  sex: 'M' | 'F';
}

export interface CkdEpi2021Result {
  egfr: number;
  stage: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
  description: string;
  dosingRecommendation: string;
}

export function calculateCkdEpi2021(input: CkdEpi2021Input): CkdEpi2021Result {
  const { creatinine, age, sex } = input;
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
    dosingRecommendation = 'Mild dose caution with renally cleared drugs. Maintain hemodynamic stability (MAP ≥ 65).';
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
