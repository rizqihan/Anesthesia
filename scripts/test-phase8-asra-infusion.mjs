import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ASRA_DRUG_DATABASE,
  evaluateAsraSafety,
} from '../lib/asraCoagsData.ts';
import {
  INFUSION_PROTOCOLS,
  calculateInfusionRate,
  calculateDoseFromRate,
} from '../lib/infusionData.ts';

test('ASRA Coags Database Completeness', () => {
  assert.ok(ASRA_DRUG_DATABASE.length >= 13, 'Expected at least 13 antithrombotic drugs');

  const enoxaparin = ASRA_DRUG_DATABASE.find(d => d.id === 'enoxaparin_prophylactic');
  assert.ok(enoxaparin);
  assert.equal(enoxaparin.preProcedureHoldHours, 12);
  assert.equal(enoxaparin.catheterRemovalHoldHours, 12);
  assert.equal(enoxaparin.postCatheterRestartHours, 4);

  const warfarin = ASRA_DRUG_DATABASE.find(d => d.id === 'warfarin');
  assert.ok(warfarin);
  assert.equal(warfarin.preProcedureHoldHours, 120); // 5 days

  const aspirin = ASRA_DRUG_DATABASE.find(d => d.id === 'aspirin_low_dose');
  assert.ok(aspirin);
  assert.equal(aspirin.preProcedureHoldHours, 0); // Monotherapy safe
});

test('ASRA Safety Evaluation - Time Washout & Catheter Rules', () => {
  // Enoxaparin prophylactic: 12h required
  // 6 hours elapsed -> UNSAFE
  const unsafeEnox = evaluateAsraSafety('enoxaparin_prophylactic', 'neuraxial', 6);
  assert.equal(unsafeEnox.isSafeForProcedure, false);
  assert.equal(unsafeEnox.remainingWaitHours, 6);
  assert.match(unsafeEnox.safetyWarnings[0], /INSUFFICIENT WASHOUT/);

  // 14 hours elapsed -> SAFE
  const safeEnox = evaluateAsraSafety('enoxaparin_prophylactic', 'neuraxial', 14);
  assert.equal(safeEnox.isSafeForProcedure, true);
  assert.equal(safeEnox.remainingWaitHours, 0);

  // Enoxaparin therapeutic -> Catheter strictly contraindicated
  const therEnox = evaluateAsraSafety('enoxaparin_therapeutic', 'neuraxial', 24);
  assert.equal(therEnox.catheterPermitted, false);
  assert.ok(therEnox.safetyWarnings.some(w => w.includes('CATHETER CONTRAINDICATED')));

  // Superficial block reduction (compressible site)
  const superficEnox = evaluateAsraSafety('enoxaparin_prophylactic', 'superficial', 6);
  assert.equal(superficEnox.requiredPreOpWaitHours, 6);
  assert.equal(superficEnox.isSafeForProcedure, true);
});

test('ASRA Safety Evaluation - Warfarin INR and Dabigatran CrCl', () => {
  // Warfarin: 5 days elapsed (120h), but INR is 1.8 -> UNSAFE
  const highInrWarfarin = evaluateAsraSafety('warfarin', 'neuraxial', 120, 1.8);
  assert.equal(highInrWarfarin.isSafeForProcedure, false);
  assert.ok(highInrWarfarin.safetyWarnings.some(w => w.includes('INR ELEVATED')));

  // Warfarin: 120h elapsed AND INR 1.2 -> SAFE
  const safeWarfarin = evaluateAsraSafety('warfarin', 'neuraxial', 120, 1.2);
  assert.equal(safeWarfarin.isSafeForProcedure, true);

  // Dabigatran CrCl 40 mL/min -> Requires 96 hours hold
  const dabigImpaired = evaluateAsraSafety('dabigatran', 'neuraxial', 80, undefined, 40);
  assert.equal(dabigImpaired.requiredPreOpWaitHours, 96);
  assert.equal(dabigImpaired.isSafeForProcedure, false);
});

test('Vasoactive Syringe Pump Infusion Formularies Completeness', () => {
  assert.ok(INFUSION_PROTOCOLS.length >= 10, 'Expected at least 10 infusion protocols');
  const norad = INFUSION_PROTOCOLS.find(p => p.id === 'norepinephrine');
  assert.ok(norad);
  assert.equal(norad.syringePresets[0].concentrationMcgPerMl, 80);

  const propofol = INFUSION_PROTOCOLS.find(p => p.id === 'propofol_tiva');
  assert.ok(propofol);
  assert.equal(propofol.syringePresets[0].concentrationMcgPerMl, 10000);
});

test('Vasoactive Infusion Rate Calculations (Weight-Based & Fixed)', () => {
  // Norepinephrine (80 mcg/mL): 70 kg patient at 0.05 mcg/kg/min
  // Rate = (0.05 * 70 * 60) / 80 = 210 / 80 = 2.625 -> 2.63 mL/hr
  const noradRes = calculateInfusionRate('norepinephrine', 0.05, 70, 0);
  assert.equal(noradRes.rateMlHr, 2.63);

  // Bidirectional inverse check: 2.625 mL/hr -> 0.05 mcg/kg/min
  const backDose = calculateDoseFromRate('norepinephrine', 2.625, 70, 0);
  assert.equal(backDose, 0.05);

  // Vasopressin (0.4 units/mL): 0.03 units/min fixed
  // Rate = (0.03 * 60) / 0.4 = 1.8 / 0.4 = 4.5 mL/hr
  const vasoRes = calculateInfusionRate('vasopressin', 0.03, 80, 0);
  assert.equal(vasoRes.rateMlHr, 4.5);

  // Nicardipine (0.5 mg/mL): 5.0 mg/hr fixed
  // Rate = 5.0 / 0.5 = 10.0 mL/hr
  const nicardRes = calculateInfusionRate('nicardipine_infusion', 5.0, 70, 0);
  assert.equal(nicardRes.rateMlHr, 10.0);

  // Propofol TIVA 1% (10,000 mcg/mL): 70 kg at 100 mcg/kg/min
  // Rate = (100 * 70 * 60) / 10,000 = 420,000 / 10,000 = 42 mL/hr
  const propRes = calculateInfusionRate('propofol_tiva', 100, 70, 0);
  assert.equal(propRes.rateMlHr, 42.0);

  // Titration steps verification
  assert.equal(noradRes.titrationSteps.length, 6);
  assert.equal(noradRes.titrationSteps[0].dose, noradRes.protocol.minDose);
});
