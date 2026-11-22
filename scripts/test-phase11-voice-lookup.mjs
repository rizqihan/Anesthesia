import assert from 'node:assert/strict';
import test from 'node:test';
import {
  parseVoiceIntent,
  extractWeight,
  extractHeight,
  extractAge,
  checkSoundAlike
} from '../lib/voiceIntentParser.ts';

test('Voice Parameter Extraction (Weight, Height, Age)', () => {
  assert.equal(extractWeight('propofol for 70 kg'), 70);
  assert.equal(extractWeight('dosis rocuronium berat 65 kg'), 65);
  assert.equal(extractWeight('patient 12.5 kilos'), 12.5);
  assert.equal(extractWeight('no weight mentioned'), null);

  assert.equal(extractHeight('height 175 cm'), 175);
  assert.equal(extractHeight('tinggi badan 160 sentimeter'), 160);
  assert.equal(extractHeight('tinggi 180'), 180);

  assert.equal(extractAge('patient age 45 years'), 45);
  assert.equal(extractAge('umur 5 tahun'), 5);
  assert.equal(extractAge('usia 12 thn'), 12);
});

test('Look-Alike / Sound-Alike (LASA) High-Alert Safeguards', () => {
  const epiAlert = checkSoundAlike('push dose epinephrine');
  assert.ok(epiAlert);
  assert.match(epiAlert.primaryDrug, /Epinephrine/);
  assert.match(epiAlert.confusedWith, /Ephedrine/);

  const hydralazineAlert = checkSoundAlike('hydralazine iv');
  assert.ok(hydralazineAlert);
  assert.match(hydralazineAlert.confusedWith, /Hydroxyzine/);

  const cefazolinAlert = checkSoundAlike('cefazolin pre-op');
  assert.ok(cefazolinAlert);
  assert.match(cefazolinAlert.confusedWith, /Ceftriaxone/);

  const safeDrug = checkSoundAlike('propofol induction');
  assert.equal(safeDrug, undefined);
});

test('Emergency Push-Dose & Crisis Intent Recognition', () => {
  // Push-Dose Epinephrine
  const pushEpi = parseVoiceIntent('push dose epi', 70, 'en');
  assert.equal(pushEpi.type, 'EMERGENCY');
  assert.equal(pushEpi.details.doseValue, 10);
  assert.equal(pushEpi.details.doseUnit, 'mcg');
  assert.match(pushEpi.speakTextEn, /10 to 20 micrograms/);

  // Cardiac Arrest Epinephrine
  const arrestEpi = parseVoiceIntent('cardiac arrest epi', 70, 'en');
  assert.equal(arrestEpi.type, 'EMERGENCY');
  assert.equal(arrestEpi.details.doseValue, 1);
  assert.equal(arrestEpi.details.doseUnit, 'mg');

  // LAST Intralipid
  const lastProtocol = parseVoiceIntent('last protocol 80 kg', 80, 'en');
  assert.equal(lastProtocol.type, 'EMERGENCY');
  assert.equal(lastProtocol.details.doseValue, 120); // 80 * 1.5 = 120 mL
  assert.equal(lastProtocol.details.doseUnit, 'mL');

  // Malignant Hyperthermia Dantrolene
  const mh = parseVoiceIntent('malignant hyperthermia dantrolene 60 kg', 60, 'en');
  assert.equal(mh.type, 'EMERGENCY');
  assert.equal(mh.details.doseValue, 150); // 60 * 2.5 = 150 mg
  assert.equal(mh.details.doseUnit, 'mg');

  // Anaphylaxis IM Epinephrine
  const anaphylaxis = parseVoiceIntent('anaphylaxis adult 70 kg', 70, 'en');
  assert.equal(anaphylaxis.type, 'EMERGENCY');
  assert.equal(anaphylaxis.details.doseValue, 0.5);
  assert.equal(anaphylaxis.details.doseUnit, 'mg');
  assert.match(anaphylaxis.details.route, /Intramuscular/);

  // Status Epilepticus
  const seizure = parseVoiceIntent('status epilepticus 50 kg', 50, 'en');
  assert.equal(seizure.type, 'EMERGENCY');
  assert.equal(seizure.details.doseValue, 10); // 50 * 0.2 = 10 mg
});

test('Weight-Based Drug Dosage & Safety Capping from Pharmacopeia', () => {
  // Propofol 2 mg/kg
  const propofol = parseVoiceIntent('propofol dose for 70 kg', 70, 'en');
  assert.equal(propofol.type, 'DRUG_DOSAGE');
  assert.match(propofol.titleEn, /Propofol/);
  assert.ok(propofol.details.doseValue > 0);

  // Capped drug (e.g. Fentanyl or Paracetamol if large weight)
  const paracetamol = parseVoiceIntent('paracetamol for 120 kg', 120, 'en');
  assert.equal(paracetamol.type, 'DRUG_DOSAGE');
  if (paracetamol.details.maxDose) {
    assert.ok(paracetamol.details.doseValue <= paracetamol.details.maxDose);
  }
});

test('Active Clinical Case Mutation Intents', () => {
  const setWeight = parseVoiceIntent('set patient weight to 68 kg', 70, 'en');
  assert.equal(setWeight.type, 'ACTIVE_CASE');
  assert.equal(setWeight.details.extractedWeightKg, 68);
  assert.equal(setWeight.details.actionPayload.patientWeight, '68');

  const setHeight = parseVoiceIntent('ubah tinggi badan 165 cm', 70, 'id');
  assert.equal(setHeight.type, 'ACTIVE_CASE');
  assert.equal(setHeight.details.extractedHeightCm, 165);

  const setAge = parseVoiceIntent('set patient age 8 years', 70, 'en');
  assert.equal(setAge.type, 'ACTIVE_CASE');
  assert.equal(setAge.details.extractedAgeYears, 8);

  const setSex = parseVoiceIntent('patient gender female', 70, 'en');
  assert.equal(setSex.type, 'ACTIVE_CASE');
  assert.equal(setSex.details.extractedSex, 'F');
});

test('Navigation & Calculator Voice Intents', () => {
  const pocusNav = parseVoiceIntent('open ultrasound pocus', 70, 'en');
  assert.equal(pocusNav.type, 'NAVIGATION');
  assert.equal(pocusNav.details.actionHref, '/pocus');

  const calcCrCl = parseVoiceIntent('calculate crcl clearance', 70, 'en');
  assert.equal(calcCrCl.type, 'CALCULATOR');
  assert.match(calcCrCl.titleEn, /Cockcroft-Gault/);

  const calcAbg = parseVoiceIntent('abg blood gas analyzer', 70, 'en');
  assert.equal(calcAbg.type, 'CALCULATOR');
  assert.match(calcAbg.titleEn, /ABG/);
});

test('Indonesian Localization & Voice Translations', () => {
  const crisisId = parseVoiceIntent('buka kartu krisis', 70, 'id');
  assert.equal(crisisId.type, 'NAVIGATION');
  assert.equal(crisisId.details.actionHref, '/emergency');
  assert.match(crisisId.speakTextId, /kartu krisis/);

  const intralipidId = parseVoiceIntent('dosis intralipid 60 kg', 60, 'id');
  assert.equal(intralipidId.type, 'EMERGENCY');
  assert.equal(intralipidId.details.doseValue, 90); // 60 * 1.5 = 90 mL
  assert.match(intralipidId.speakTextId, /90 mililiter/);

  const lightMode = parseVoiceIntent('mode terang', 70, 'id');
  assert.equal(lightMode.type, 'THEME');
  assert.equal(lightMode.details.actionPayload.theme, 'light');
});
