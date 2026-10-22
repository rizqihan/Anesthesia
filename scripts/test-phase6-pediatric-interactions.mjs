import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateDrugInteractions, DRUG_INTERACTION_RULES } from '../lib/drugInteractions.ts';
import {
  calculateWhoGrowth,
  PEDIATRIC_VITAL_NORMS,
  calculateApgarScore,
  calculateSilvermanScore,
} from '../lib/pediatricData.ts';
import { generateStructuredSoapNote } from '../lib/soapGenerator.ts';

test('Drug Interaction Matrix - Rule Completeness & Severity Structure', () => {
  assert.ok(DRUG_INTERACTION_RULES.length >= 12);
  const severities = new Set(DRUG_INTERACTION_RULES.map((r) => r.severity));
  assert.ok(severities.has('contraindicated'));
  assert.ok(severities.has('major'));
  assert.ok(severities.has('moderate'));
});

test('Drug Interaction Matrix - Fatal & Contraindicated Combinations', () => {
  // Linezolid + Tramadol (Fatal Serotonin Syndrome)
  const res1 = evaluateDrugInteractions(['Linezolid', 'Tramadol']);
  assert.equal(res1.length >= 1, true);
  assert.equal(res1[0].severity, 'contraindicated');
  assert.equal(res1[0].ruleId, 'fatal_serotonin_linezolid_opioid');

  // Dual Anticoagulation (Warfarin + Enoxaparin)
  const res2 = evaluateDrugInteractions(['Warfarin', 'Enoxaparin']);
  assert.equal(res2.length >= 1, true);
  assert.equal(res2[0].severity, 'contraindicated');
  assert.equal(res2[0].category, 'hemorrhage');
});

test('Drug Interaction Matrix - High-Risk Anesthesia & Bedside Combinations', () => {
  // Fentanyl + Midazolam (FDA Black Box Respiratory Depression)
  const res1 = evaluateDrugInteractions(['Fentanyl', 'Midazolam']);
  assert.equal(res1.length >= 1, true);
  assert.equal(res1[0].severity, 'major');
  assert.equal(res1[0].category, 'respiratory_depression');

  // Amiodarone + Ondansetron (Additive QTc Prolongation)
  const res2 = evaluateDrugInteractions(['Amiodarone', 'Ondansetron']);
  assert.equal(res2.length >= 1, true);
  assert.equal(res2[0].severity, 'major');
  assert.equal(res2[0].category, 'qt_prolongation');

  // Triple Whammy (Lisinopril + Ketorolac)
  const res3 = evaluateDrugInteractions(['Lisinopril', 'Ketorolac']);
  assert.equal(res3.length >= 1, true);
  assert.equal(res3[0].severity, 'major');
  assert.equal(res3[0].category, 'nephrotoxicity');

  // Multi-drug Regimen (4 drugs: Fentanyl + Midazolam + Lisinopril + Ketorolac)
  const res4 = evaluateDrugInteractions(['Fentanyl', 'Midazolam', 'Lisinopril', 'Ketorolac']);
  assert.ok(res4.length >= 2);
  // Safe combination with no alerts
  const resSafe = evaluateDrugInteractions(['Paracetamol', 'Amoxicillin']);
  assert.equal(resSafe.length, 0);
});

test('WHO Child Growth Z-Scores & Percentiles', () => {
  // 24-month-old boy at 12.2 kg (median weight -> Z ~ 0)
  const b24 = calculateWhoGrowth('weight', 24, 12.2, 'M');
  assert.equal(Math.abs(b24.zScore) <= 0.1, true);
  assert.equal(b24.classification, 'Normal growth');
  assert.ok(b24.percentile >= 45 && b24.percentile <= 55);

  // 24-month-old girl at 7.0 kg (severe wasting, Z < -3)
  const g24Wasted = calculateWhoGrowth('weight', 24, 7.0, 'F');
  assert.equal(g24Wasted.zScore < -3, true);
  assert.equal(g24Wasted.classification.includes('Severely'), true);

  // Height-for-age 36-month-old girl at 95.1 cm (median height)
  const g36H = calculateWhoGrowth('height', 36, 95.1, 'F');
  assert.equal(Math.abs(g36H.zScore) <= 0.1, true);
  assert.equal(g36H.classification, 'Normal growth');
});

test('Age-Stratified Pediatric Vital Sign Reference Norms', () => {
  assert.equal(PEDIATRIC_VITAL_NORMS.length, 7);
  const ids = PEDIATRIC_VITAL_NORMS.map((n) => n.id);
  assert.ok(ids.includes('preterm'));
  assert.ok(ids.includes('term_neonate'));
  assert.ok(ids.includes('infant'));
  assert.ok(ids.includes('toddler'));
  assert.ok(ids.includes('preschool'));
  assert.ok(ids.includes('school_age'));
  assert.ok(ids.includes('adolescent'));

  const neonate = PEDIATRIC_VITAL_NORMS.find((n) => n.id === 'term_neonate');
  assert.equal(neonate.hypotensionThresholdSbp, 'SBP < 60 mmHg');
});

test('Neonatal APGAR Score Calculation', () => {
  // Vigorous neonate (10/10)
  const perfect = calculateApgarScore({
    appearance: 2,
    pulse: 2,
    grimace: 2,
    activity: 2,
    respiration: 2,
  });
  assert.equal(perfect.totalScore, 10);
  assert.equal(perfect.category, 'normal');

  // Moderately depressed (5/10)
  const moderate = calculateApgarScore({
    appearance: 1,
    pulse: 1,
    grimace: 1,
    activity: 1,
    respiration: 1,
  });
  assert.equal(moderate.totalScore, 5);
  assert.equal(moderate.category, 'moderate_depression');

  // Severely depressed (2/10) -> Immediate NRP Resuscitation
  const severe = calculateApgarScore({
    appearance: 0,
    pulse: 1,
    grimace: 0,
    activity: 1,
    respiration: 0,
  });
  assert.equal(severe.totalScore, 2);
  assert.equal(severe.category, 'severe_depression');
  assert.ok(severe.actionGuidance.includes('IMMEDIATE RESUSCITATION'));
});

test('Silverman-Anderson Respiratory Distress Index', () => {
  // No distress (0/10)
  const normal = calculateSilvermanScore({
    upperChest: 0,
    lowerChest: 0,
    xiphoidRetraction: 0,
    naresDilatation: 0,
    expiratoryGrunt: 0,
  });
  assert.equal(normal.totalScore, 0);
  assert.equal(normal.severity, 'none');

  // Moderate distress (4/10) -> CPAP trigger
  const mod = calculateSilvermanScore({
    upperChest: 1,
    lowerChest: 1,
    xiphoidRetraction: 1,
    naresDilatation: 1,
    expiratoryGrunt: 0,
  });
  assert.equal(mod.totalScore, 4);
  assert.equal(mod.severity, 'moderate');
  assert.ok(mod.clinicalAction.includes('CPAP'));

  // Severe distress (8/10) -> Intubation trigger
  const sev = calculateSilvermanScore({
    upperChest: 2,
    lowerChest: 2,
    xiphoidRetraction: 2,
    naresDilatation: 1,
    expiratoryGrunt: 1,
  });
  assert.equal(sev.totalScore, 8);
  assert.equal(sev.severity, 'severe');
  assert.ok(sev.clinicalAction.includes('URGENT INTUBATION'));
});

test('Structured Clinical SOAP Note Synthesis', () => {
  const note = generateStructuredSoapNote({
    activeCase: {
      patientAge: '68',
      patientSex: 'M',
      patientWeight: '75',
      patientHeight: '172',
      asaClass: 'III',
    },
    patientLabs: {
      sodium: '136',
      potassium: '4.2',
      creatinine: '1.4',
      glucose: '160',
    },
    additionalDiagnosis: 'Septic Shock secondary to Acute Cholecystitis',
    planNotes: 'Start Norepinephrine infusion, Blood cultures drawn',
  });

  assert.ok(note.plainText.includes('[SUBJECTIVE]'));
  assert.ok(note.plainText.includes('[OBJECTIVE]'));
  assert.ok(note.plainText.includes('[ASSESSMENT]'));
  assert.ok(note.plainText.includes('[PLAN]'));
  assert.ok(note.plainText.includes('75 kg'));
  assert.ok(note.plainText.includes('Cr: 1.4 mg/dL'));
  assert.ok(note.plainText.includes('Septic Shock'));
  assert.ok(note.plainText.includes('Start Norepinephrine'));
});
