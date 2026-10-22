import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateWellsDvt,
  calculateWellsPe,
  calculateCha2ds2Vasc,
  calculateCurb65,
  calculatePsi,
  calculateQsofa,
  calculateSofa,
  calculateGcs,
  calculateNihss,
  calculateMeldNa,
  calculateChildPugh,
  calculateCkdEpi2021,
} from '../lib/riskScores.ts';
import {
  analyzeAbg,
  calculateCorrectedSodium,
  calculateFreeWaterDeficit,
  calculatePotassiumRepletion,
} from '../lib/labFormulas.ts';

test('Wells DVT Calculation', () => {
  // Empty input -> score 0 (Low, Unlikely)
  const low = calculateWellsDvt({});
  assert.equal(low.score, 0);
  assert.equal(low.riskTierTwo, 'Unlikely');
  assert.equal(low.riskTierThree, 'Low');

  // Moderate risk (score 1 or 2)
  const mod = calculateWellsDvt({ activeCancer: true, pittingEdemaConfined: true });
  assert.equal(mod.score, 2);
  assert.equal(mod.riskTierTwo, 'Likely');
  assert.equal(mod.riskTierThree, 'Moderate');

  // High risk (score >= 3)
  const high = calculateWellsDvt({
    activeCancer: true,
    bedriddenOrMajorSurgery: true,
    calfSwellingGt3cm: true,
    localizedTenderness: true,
  });
  assert.equal(high.score, 4);
  assert.equal(high.riskTierTwo, 'Likely');
  assert.equal(high.riskTierThree, 'High');

  // Alternative diagnosis likely gives -2
  const discounted = calculateWellsDvt({
    previousDvt: true,
    alternativeDiagnosisLikely: true,
  });
  assert.equal(discounted.score, -1);
  assert.equal(discounted.riskTierTwo, 'Unlikely');
});

test('Wells PE and PERC Calculation', () => {
  // Score 0 with all PERC negative -> ruled out
  const percNegative = calculateWellsPe({
    percCriteria: {
      ageGte50: false,
      heartRateGte100: false,
      spo2Lt95: false,
      unilateralLegSwelling: false,
      hemoptysis: false,
      recentSurgeryOrTrauma: false,
      priorDvtPe: false,
      hormoneUse: false,
    },
  });
  assert.equal(percNegative.score, 0);
  assert.equal(percNegative.twoTierRisk, 'Unlikely');
  assert.equal(percNegative.threeTierRisk, 'Low');
  assert.equal(percNegative.percApplicable, true);
  assert.equal(percNegative.percRuleOut, true);

  // High risk PE
  const peHigh = calculateWellsPe({
    clinicalSignsDvt: true, // +3
    alternativeDiagnosisLessLikely: true, // +3
    heartRateGt100: true, // +1.5
  });
  assert.equal(peHigh.score, 7.5);
  assert.equal(peHigh.twoTierRisk, 'Likely');
  assert.equal(peHigh.threeTierRisk, 'High');
});

test('CHA2DS2-VASc Calculation', () => {
  // 66yo male with HTN and Diabetes -> Age 65-74 (+1), HTN (+1), DM (+1) = 3
  const res1 = calculateCha2ds2Vasc({
    age: 66,
    sex: 'M',
    hypertension: true,
    diabetes: true,
  });
  assert.equal(res1.score, 3);
  assert.equal(res1.annualStrokeRiskPercent, 3.2);
  assert.equal(res1.riskLevel, 'High');

  // 76yo female without comorbidities -> Age >=75 (+2), Female (+1) = 3
  const res2 = calculateCha2ds2Vasc({
    age: 76,
    sex: 'F',
  });
  assert.equal(res2.score, 3);
  assert.equal(res2.riskLevel, 'High');

  // 45yo female healthy -> 1 (from sex only) -> Low risk
  const res3 = calculateCha2ds2Vasc({
    age: 45,
    sex: 'F',
  });
  assert.equal(res3.score, 1);
  assert.equal(res3.riskLevel, 'Low');
});

test('CURB-65 & PSI Calculation', () => {
  const curb = calculateCurb65({
    confusion: true,
    bunGt19: true,
    rrGte30: true,
    bpLow: false,
    ageGte65: true,
  });
  assert.equal(curb.score, 4);
  assert.equal(curb.triageGroup, 'Severe / ICU Assessment');

  // PSI Class I
  const psi1 = calculatePsi({
    age: 40,
    sex: 'M',
  });
  assert.equal(psi1.classTier, 'Class I');

  // PSI Class IV
  const psi4 = calculatePsi({
    age: 75,
    sex: 'M',
    chf: true, // +10
    bunGte30: true, // +20
  });
  // 75 + 10 + 20 = 105 -> Class IV (91-130)
  assert.equal(psi4.score, 105);
  assert.equal(psi4.classTier, 'Class IV');
});

test('qSOFA & SOFA Sepsis Calculation', () => {
  const qsofa = calculateQsofa({
    alteredMentalStatus: true,
    rrGte22: true,
    sbpLte100: false,
  });
  assert.equal(qsofa.score, 2);
  assert.equal(qsofa.isHighRisk, true);

  const sofa = calculateSofa({
    pao2Fio2: 250, // 2 pts
    platelets: 80, // 2 pts
    bilirubin: 2.5, // 2 pts
    cardiovascular: {
      map: 65,
      norepinephrineDose: 0.15, // 4 pts (>0.1)
    },
    gcs: 11, // 2 pts (10-12)
    creatinine: 2.2, // 2 pts (2.0-3.4)
  });
  assert.equal(sofa.totalScore, 14);
  assert.equal(sofa.respirationScore, 2);
  assert.equal(sofa.coagulationScore, 2);
  assert.equal(sofa.liverScore, 2);
  assert.equal(sofa.cardiovascularScore, 4);
  assert.equal(sofa.cnsScore, 2);
  assert.equal(sofa.renalScore, 2);
});

test('GCS & GCS-P Calculation', () => {
  // E3 V4 M5 with 1 unreactive pupil
  const gcs = calculateGcs({
    eyeOpening: 3,
    verbalResponse: 4,
    motorResponse: 5,
    unreactivePupils: 1,
  });
  assert.equal(gcs.gcs, 12);
  assert.equal(gcs.prs, 1);
  assert.equal(gcs.gcsp, 11);
  assert.equal(gcs.severity, 'Moderate');

  // Intubated / coma: E1 V1 M2, both pupils fixed (PRS=2)
  const gcsSevere = calculateGcs({
    eyeOpening: 1,
    verbalResponse: 1,
    motorResponse: 2,
    unreactivePupils: 2,
  });
  assert.equal(gcsSevere.gcs, 4);
  assert.equal(gcsSevere.gcsp, 2);
  assert.equal(gcsSevere.severity, 'Severe');
});

test('NIHSS & Thrombolysis Checklist', () => {
  const nihss = calculateNihss({
    loc1a: 1,
    loc1bQuestions: 1,
    loc1cCommands: 0,
    bestGaze: 1,
    visualFields: 0,
    facialPalsy: 2,
    motorArmLeft: 3,
    motorArmRight: 0,
    motorLegLeft: 2,
    motorLegRight: 0,
    limbAtaxia: 0,
    sensory: 1,
    bestLanguage: 1,
    dysarthria: 1,
    extinctionInattention: 0,
  }, {
    timeFromLknHours: 2.5,
    noIntracranialHemorrhage: true,
    sbpLt185AndDbpLt110: true,
    glucoseGt50: true,
    plateletsGte100k: true,
    inrLte17AndNoDoac: true,
    noRecentTraumaSurgeryOrStroke: true,
  });
  assert.equal(nihss.score, 13);
  assert.equal(nihss.severityTier, 'Moderate Stroke');
  assert.equal(nihss.thrombolysisEligible, true);
});

test('MELD-Na and Child-Pugh Calculation', () => {
  // Baseline MELD
  const meldRes = calculateMeldNa({
    creatinine: 2.0,
    bilirubin: 2.5,
    inr: 1.8,
    sodium: 130,
  });
  assert.ok(meldRes.meld >= 15);
  assert.ok(meldRes.meldNa >= meldRes.meld); // Hyponatremia adds points

  // Child-Pugh: bili 2.2 (2), alb 2.5 (3), inr 2.0 (2), ascites slight (2), encephalopathy grade 1-2 (2) = 11 -> Class C
  const cp = calculateChildPugh({
    bilirubin: 2.2,
    albumin: 2.5,
    inr: 2.0,
    ascites: 'slight_moderate',
    encephalopathy: 'grade_1_2',
  });
  assert.equal(cp.score, 11);
  assert.equal(cp.classGroup, 'Class C');
});

test('CKD-EPI 2021 Race-Free Calculation', () => {
  const ckdMale = calculateCkdEpi2021({
    creatinine: 1.0,
    age: 50,
    sex: 'M',
  });
  assert.ok(ckdMale.egfr > 80);

  const ckdSevere = calculateCkdEpi2021({
    creatinine: 4.5,
    age: 65,
    sex: 'F',
  });
  assert.ok(ckdSevere.egfr < 15);
  assert.equal(ckdSevere.stage, 'G5');
});

test('4-Step ABG Analyzer & Delta-Delta Ratio', () => {
  // Classic DKA: pH 7.15, PaCO2 20, HCO3 7, Na 135, Cl 98, Alb 4.0
  // Expected PaCO2 = 1.5*7 + 8 = 18.5 +/- 2 (16.5 - 20.5) -> PaCO2 20 is adequate compensation!
  // AG = 135 - (98 + 7) = 30 (High AG)
  // Delta AG = 30 - 12 = 18
  // Delta HCO3 = 24 - 7 = 17
  // Delta/Delta = 18 / 17 = 1.06 (Pure HAGMA)
  const dka = analyzeAbg({
    ph: 7.15,
    paco2: 20,
    hco3: 7,
    sodium: 135,
    chloride: 98,
    albumin: 4.0,
  });
  assert.equal(dka.step1PhStatus, 'Acidemia');
  assert.equal(dka.step2PrimaryDisorder, 'Primary Metabolic Acidosis');
  assert.equal(dka.step3Compensation.isCompensated, true);
  assert.equal(dka.step4AnionGap?.isHighAnionGap, true);
  assert.equal(dka.step4AnionGap?.rawAnionGap, 30);
  assert.equal(dka.step4AnionGap?.deltaDeltaRatio, 1.06);

  // Respiratory Acidosis with inadequate compensation (hypoventilation)
  const respAcid = analyzeAbg({
    ph: 7.22,
    paco2: 65,
    hco3: 26,
  });
  assert.equal(respAcid.step1PhStatus, 'Acidemia');
  assert.equal(respAcid.step2PrimaryDisorder, 'Primary Respiratory Acidosis');
});

test('Electrolyte Safety Engines', () => {
  // Corrected Sodium (Measured Na 130, Glucose 600)
  // Delta glucose = 500
  // Katz: 130 + 1.6*5 = 138.0
  // Hillier: 130 + 2.4*5 = 142.0
  const corrNa = calculateCorrectedSodium(130, 600);
  assert.equal(corrNa.katzSodium, 138.0);
  assert.equal(corrNa.hillierSodium, 142.0);

  // Free Water Deficit (70kg adult male, Na 160)
  // TBW = 70 * 0.6 = 42.0 L
  // Deficit = 42 * (160/140 - 1) = 42 * (20/140) = 6.00 L
  const fwd = calculateFreeWaterDeficit({
    weightKg: 70,
    serumSodium: 160,
    category: 'adult_male',
  });
  assert.equal(fwd.totalBodyWaterLiters, 42);
  assert.equal(fwd.freeWaterDeficitLiters, 6.0);

  // Potassium Repletion (K+ 3.2 mEq/L, target 4.0)
  // Drop = 0.8 -> estimated 80 mEq
  const kRepletion = calculatePotassiumRepletion({
    currentPotassium: 3.2,
  });
  assert.equal(kRepletion.estimatedDeficitMeq, 80);
});
