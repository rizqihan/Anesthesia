import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateCockcroftGault,
  calculatePatientRenalMetrics,
  getDrugRenalAdjustment,
  calculateVancomycinRegimen,
  calculateHartfordAminoglycoside,
  generateBedsideRoundsSbarHtml,
  SYNDROMIC_CATEGORIES,
  PATHOGEN_SPECTRUM_LIST,
  DRUG_RENAL_PROFILES,
} from '../lib/antimicrobialData.ts';

test('Cockcroft-Gault Renal Clearance Calculations', () => {
  // 1. Male: 50 years, 70 kg, SCr 1.0 mg/dL
  // CrCl = [(140 - 50) * 70] / (72 * 1.0) = 6300 / 72 = 87.5 mL/min
  const maleNormal = calculateCockcroftGault(50, 70, 1.0, 'M');
  assert.equal(maleNormal.crcl, 87.5);
  assert.equal(maleNormal.stage, 'mild');
  assert.equal(maleNormal.isAdjustedRequired, false);

  // 2. Female: 50 years, 70 kg, SCr 1.0 mg/dL
  // CrCl = 87.5 * 0.85 = 74.375 -> 74.4 mL/min
  const femaleNormal = calculateCockcroftGault(50, 70, 1.0, 'F');
  assert.equal(femaleNormal.crcl, 74.4);
  assert.equal(femaleNormal.stage, 'mild');

  // 3. Normal clearance >= 90 mL/min: 30y, 80kg, SCr 0.8 mg/dL Male
  // CrCl = [(140 - 30) * 80] / (72 * 0.8) = 8800 / 57.6 = 152.8 mL/min
  const maleYoung = calculateCockcroftGault(30, 80, 0.8, 'M');
  assert.equal(maleYoung.crcl, 152.8);
  assert.equal(maleYoung.stage, 'normal');

  // 4. Moderate renal impairment (CrCl 30–59 mL/min): 65y, 65kg, SCr 1.5 mg/dL Male
  // CrCl = [(140 - 65) * 65] / (72 * 1.5) = 4875 / 108 = 45.1 mL/min
  const maleMod = calculateCockcroftGault(65, 65, 1.5, 'M');
  assert.equal(maleMod.crcl, 45.1);
  assert.equal(maleMod.stage, 'moderate');
  assert.equal(maleMod.isAdjustedRequired, true);

  // 5. Severe renal impairment (CrCl 15–29 mL/min): 75y, 60kg, SCr 2.8 mg/dL Male
  // CrCl = [(140 - 75) * 60] / (72 * 2.8) = 3900 / 201.6 = 19.3 mL/min
  const maleSevere = calculateCockcroftGault(75, 60, 2.8, 'M');
  assert.equal(maleSevere.crcl, 19.3);
  assert.equal(maleSevere.stage, 'severe');
  assert.equal(maleSevere.isAdjustedRequired, true);

  // 6. Kidney failure / ESRD (CrCl < 15 mL/min): 80y, 50kg, SCr 4.5 mg/dL Female
  // CrCl = [(140 - 80) * 50] / (72 * 4.5) * 0.85 = (3000 / 324) * 0.85 = 9.259 * 0.85 = 7.9 mL/min
  const femaleEsrd = calculateCockcroftGault(80, 50, 4.5, 'F');
  assert.equal(femaleEsrd.crcl, 7.9);
  assert.equal(femaleEsrd.stage, 'esrd');
  assert.equal(femaleEsrd.isAdjustedRequired, true);

  // 7. Sanitization boundaries (zero / negative protection)
  const fallback = calculateCockcroftGault(0, 0, 0, 'M');
  assert.ok(fallback.crcl > 0);
});

test('Patient Renal Metrics Context Compilation', () => {
  const activeCase = {
    patientWeight: '70',
    patientHeight: '175',
    patientAge: '55',
    patientSex: 'M',
    asaClass: 'II',
    mallampati: 'I',
  };

  const patientLabs = {
    serumCreatinine: '1.4',
    bloodUreaNitrogen: '22',
    sodium: '138',
    potassium: '4.2',
    chloride: '102',
    bicarbonate: '24',
    glucose: '110',
    albumin: '3.8',
    totalBilirubin: '0.9',
    platelets: '220',
    inr: '1.0',
  };

  const metrics = calculatePatientRenalMetrics(activeCase, patientLabs);
  // Male, 55y, 70kg, SCr 1.4 -> (85 * 70) / (72 * 1.4) = 5950 / 100.8 = 59.0 mL/min
  assert.equal(metrics.crcl, 59.0);
  assert.equal(metrics.hasRenalImpairment, true);
  assert.equal(metrics.isCreatinineAvailable, true);
  assert.ok(metrics.egfr > 0);
  assert.ok(metrics.ckdStage);
});

test('Syndromic Antibiotic Regimens Data Integrity', () => {
  assert.equal(SYNDROMIC_CATEGORIES.length, 6);
  const catIds = SYNDROMIC_CATEGORIES.map((c) => c.id);
  assert.ok(catIds.includes('pneumonia'));
  assert.ok(catIds.includes('uti'));
  assert.ok(catIds.includes('sepsis'));
  assert.ok(catIds.includes('ssti'));
  assert.ok(catIds.includes('iai'));
  assert.ok(catIds.includes('meningitis'));

  // 1. CAP: verify healthy, comorbid, ward, ICU scenarios
  const pna = SYNDROMIC_CATEGORIES.find((c) => c.id === 'pneumonia');
  assert.ok(pna);
  const pnaScenarios = pna.scenarios.map((s) => s.id);
  assert.ok(pnaScenarios.includes('cap_outpatient_healthy'));
  assert.ok(pnaScenarios.includes('cap_outpatient_comorbid'));
  assert.ok(pnaScenarios.includes('cap_inpatient_ward'));
  assert.ok(pnaScenarios.includes('cap_severe_icu'));

  // Verify severe ICU pneumonia has MRSA & Pseudomonas guidance
  const capIcu = pna.scenarios.find((s) => s.id === 'cap_severe_icu');
  assert.ok(capIcu);
  assert.ok(capIcu.firstLineRegimen.notes.includes('MRSA'));
  assert.ok(capIcu.firstLineRegimen.notes.includes('Pseudomonas'));
  assert.ok(capIcu.clinicalPearls.some((p) => p.includes('nasal MRSA PCR')));

  // 2. UTI: verify cystitis, pyelonephritis, CAUTI
  const uti = SYNDROMIC_CATEGORIES.find((c) => c.id === 'uti');
  assert.ok(uti);
  const utiScenarios = uti.scenarios.map((s) => s.id);
  assert.ok(utiScenarios.includes('uti_uncomplicated_cystitis'));
  assert.ok(utiScenarios.includes('uti_acute_pyelonephritis'));
  assert.ok(utiScenarios.includes('uti_cauti_complicated'));

  const cystitis = uti.scenarios.find((s) => s.id === 'uti_uncomplicated_cystitis');
  assert.ok(cystitis);
  assert.ok(cystitis.firstLineRegimen.notes.includes('CrCl < 30'));

  const cauti = uti.scenarios.find((s) => s.id === 'uti_cauti_complicated');
  assert.ok(cauti);
  assert.ok(cauti.firstLineRegimen.notes.includes('catheter'));

  // 3. Sepsis: broad-spectrum within 1 hour
  const sepsis = SYNDROMIC_CATEGORIES.find((c) => c.id === 'sepsis');
  assert.ok(sepsis);
  const sepsisBroad = sepsis.scenarios[0];
  assert.ok(sepsisBroad.firstLineRegimen.drugs.some((d) => d.drugId === 'vancomycin'));
  assert.ok(sepsisBroad.firstLineRegimen.drugs.some((d) => d.drugId === 'cefepime'));

  // 4. SSTI: verify necrotizing fasciitis has clindamycin for toxin suppression
  const ssti = SYNDROMIC_CATEGORIES.find((c) => c.id === 'ssti');
  assert.ok(ssti);
  const necFasc = ssti.scenarios.find((s) => s.id === 'ssti_necrotizing_fasciitis');
  assert.ok(necFasc);
  assert.ok(necFasc.firstLineRegimen.drugs.some((d) => d.drugId === 'clindamycin'));
  assert.ok(necFasc.firstLineRegimen.drugs.some((d) => d.drugId === 'piperacillin_tazobactam'));
  assert.ok(necFasc.firstLineRegimen.drugs.some((d) => d.drugId === 'vancomycin'));

  // 5. IAI: verify STOP-IT 4-day duration pearl
  const iai = SYNDROMIC_CATEGORIES.find((c) => c.id === 'iai');
  assert.ok(iai);
  const iaiMild = iai.scenarios.find((s) => s.id === 'iai_community_mild_moderate');
  assert.ok(iaiMild);
  assert.ok(iaiMild.duration.includes('4 days'));
  assert.ok(iaiMild.clinicalPearls.some((p) => p.includes('STOP-IT')));

  // 6. Meningitis: age < 50 vs >= 50 with Ampicillin for Listeria + Dexamethasone timing
  const men = SYNDROMIC_CATEGORIES.find((c) => c.id === 'meningitis');
  assert.ok(men);
  const menOver50 = men.scenarios.find((s) => s.id === 'meningitis_age_over_50_immunocompromised');
  assert.ok(menOver50);
  assert.ok(menOver50.firstLineRegimen.drugs.some((d) => d.drugId === 'ampicillin'));
  assert.ok(menOver50.riskFactorsAlert.includes('Listeria monocytogenes'));
  assert.ok(menOver50.firstLineRegimen.notes.includes('Dexamethasone'));
});

test('Renal Cutoff Rules & High-Contrast Safety Warnings', () => {
  // 1. Cefepime: Normal vs CrCl 45 vs CrCl 20 vs CrCl 8
  const cefNormal = getDrugRenalAdjustment('cefepime', 80);
  assert.equal(cefNormal.recommendedDose, '2g');
  assert.equal(cefNormal.isAdjusted, false);
  assert.equal(cefNormal.neurotoxicityAlert, undefined);

  const cefMod = getDrugRenalAdjustment('cefepime', 45);
  assert.equal(cefMod.recommendedDose, '2g');
  assert.equal(cefMod.recommendedInterval, 'q12h');
  assert.equal(cefMod.isAdjusted, true);
  assert.equal(cefMod.neurotoxicityAlert, undefined);

  const cefSevere = getDrugRenalAdjustment('cefepime', 20);
  assert.equal(cefSevere.recommendedDose, '1g');
  assert.equal(cefSevere.recommendedInterval, 'q24h');
  assert.equal(cefSevere.isAdjusted, true);
  assert.ok(cefSevere.neurotoxicityAlert);
  assert.ok(cefSevere.neurotoxicityAlert.includes('Neurotoxicity'));

  const cefEsrd = getDrugRenalAdjustment('cefepime', 8);
  assert.equal(cefEsrd.recommendedDose, '500mg');
  assert.equal(cefEsrd.warningLevel, 'critical');

  // 2. Piperacillin-Tazobactam: Normal vs CrCl 35 vs CrCl 15
  const zosynNormal = getDrugRenalAdjustment('piperacillin_tazobactam', 70);
  assert.equal(zosynNormal.isAdjusted, false);
  assert.ok(zosynNormal.synergyNephrotoxicityAlert);
  assert.ok(zosynNormal.synergyNephrotoxicityAlert.includes('Vancomycin'));

  const zosynMod = getDrugRenalAdjustment('piperacillin_tazobactam', 35);
  assert.equal(zosynMod.recommendedDose, '3.375g');
  assert.equal(zosynMod.recommendedInterval, 'q6h');

  const zosynSevere = getDrugRenalAdjustment('piperacillin_tazobactam', 15);
  assert.equal(zosynSevere.recommendedDose, '2.25g');
  assert.equal(zosynSevere.recommendedInterval, 'q6h');

  // 3. Meropenem: Normal vs CrCl 35 vs CrCl 18 vs CrCl 8
  const meroNormal = getDrugRenalAdjustment('meropenem', 75);
  assert.equal(meroNormal.recommendedInterval, 'q8h');

  const mero35 = getDrugRenalAdjustment('meropenem', 35);
  assert.equal(mero35.recommendedDose, '1g');
  assert.equal(mero35.recommendedInterval, 'q12h');

  const mero18 = getDrugRenalAdjustment('meropenem', 18);
  assert.equal(mero18.recommendedDose, '500mg');
  assert.equal(mero18.recommendedInterval, 'q12h');

  const mero8 = getDrugRenalAdjustment('meropenem', 8);
  assert.equal(mero8.recommendedDose, '500mg');
  assert.equal(mero8.recommendedInterval, 'q24h');

  // 4. Nitrofurantoin Contraindication Cutoff
  const nitroNormal = getDrugRenalAdjustment('nitrofurantoin', 45);
  assert.equal(nitroNormal.isContraindicated, false);
  assert.equal(nitroNormal.recommendedDose, '100mg');

  const nitroLow = getDrugRenalAdjustment('nitrofurantoin', 28);
  assert.equal(nitroLow.isContraindicated, true);
  assert.equal(nitroLow.action, 'contraindicated');
  assert.equal(nitroLow.warningLevel, 'critical');
  assert.ok(nitroLow.clinicalNote.includes('CONTRAINDICATED'));

  // 5. Ceftriaxone: No renal adjustment required across all cutoffs
  const ceftriaxone0 = getDrugRenalAdjustment('ceftriaxone', 5);
  assert.equal(ceftriaxone0.isAdjusted, false);
  assert.ok(ceftriaxone0.clinicalNote.includes('No renal dose adjustment'));
});

test('Vancomycin Dosing Protocol and Target Troughs', () => {
  // 70 kg patient with normal renal function (CrCl 95)
  const vancoNormal = calculateVancomycinRegimen(70, 95);
  assert.equal(vancoNormal.loadingDoseMg, 1750); // 70 * 25 = 1750 rounded to 250
  assert.equal(vancoNormal.maintenanceDoseMg, 1000); // 70 * 15 = 1050 rounded to 1000
  assert.equal(vancoNormal.maintenanceInterval, 'q8–12h');
  assert.ok(vancoNormal.targetTroughText.includes('15–20 mcg/mL'));

  // 100 kg patient with CrCl 35
  const vancoMod = calculateVancomycinRegimen(100, 35);
  assert.equal(vancoMod.loadingDoseMg, 2500); // 100 * 25 = 2500
  assert.equal(vancoMod.maintenanceDoseMg, 1500); // 100 * 15 = 1500
  assert.equal(vancoMod.maintenanceInterval, 'q24h');

  // CrCl < 20
  const vancoSevere = calculateVancomycinRegimen(80, 15);
  assert.ok(vancoSevere.maintenanceDoseText.includes('serum level'));
});

test('Hartford Aminoglycoside Once-Daily Nomogram', () => {
  // Gentamicin 70 kg patient
  // Normal CrCl 85 -> 70 * 7 = 490 mg q24h
  const gentNormal = calculateHartfordAminoglycoside('Gentamicin', 70, 85);
  assert.equal(gentNormal.doseMgKg, 7);
  assert.equal(gentNormal.totalDoseMg, 490);
  assert.equal(gentNormal.intervalHours, 24);
  assert.equal(gentNormal.isExtendedIntervalAllowed, true);

  // Moderate CrCl 45 -> q36h
  const gentMod = calculateHartfordAminoglycoside('Gentamicin', 70, 45);
  assert.equal(gentMod.intervalHours, 36);

  // Severe CrCl 30 -> q48h
  const gentSevere = calculateHartfordAminoglycoside('Gentamicin', 70, 30);
  assert.equal(gentSevere.intervalHours, 48);

  // ESRD CrCl 15 -> Contraindicated extended interval
  const gentEsrd = calculateHartfordAminoglycoside('Gentamicin', 70, 15);
  assert.equal(gentEsrd.isExtendedIntervalAllowed, false);
  assert.ok(gentEsrd.nomogramRecommendation.includes('CONTRAINDICATED'));

  // Amikacin 70 kg patient: 70 * 15 = 1050 mg
  const amikNormal = calculateHartfordAminoglycoside('Amikacin', 70, 75);
  assert.equal(amikNormal.doseMgKg, 15);
  assert.equal(amikNormal.totalDoseMg, 1050);
  assert.equal(amikNormal.intervalHours, 24);
});

test('Pathogen Coverage Spectrum Definitions', () => {
  assert.equal(PATHOGEN_SPECTRUM_LIST.length, 6);
  const ids = PATHOGEN_SPECTRUM_LIST.map((s) => s.id);
  assert.ok(ids.includes('gram_positive'));
  assert.ok(ids.includes('gram_negative'));
  assert.ok(ids.includes('anaerobes'));
  assert.ok(ids.includes('mrsa'));
  assert.ok(ids.includes('pseudomonas'));
  assert.ok(ids.includes('atypicals'));
});

test('Bedside Rounds SBAR HTML Compilation & Data Synthesis', () => {
  const activeCase = {
    patientWeight: '75',
    patientHeight: '172',
    patientAge: '62',
    patientSex: 'M',
    asaClass: 'III',
    mallampati: 'II',
  };

  const patientLabs = {
    serumCreatinine: '2.1',
    bloodUreaNitrogen: '32',
    sodium: '136',
    potassium: '4.8',
    chloride: '98',
    bicarbonate: '18',
    glucose: '160',
    albumin: '3.2',
    totalBilirubin: '1.2',
    platelets: '180',
    inr: '1.2',
  };

  const html = generateBedsideRoundsSbarHtml({
    activeCase,
    patientLabs,
    customNotes: 'Post-op laparotomy day 1. Stable on minimal norepinephrine.',
  });

  // Verify S (Situation) elements
  assert.ok(html.includes('[S] SITUATION'));
  assert.ok(html.includes('75 kg'));
  assert.ok(html.includes('172 cm'));
  assert.ok(html.includes('ASA III'));
  assert.ok(html.includes('Class II'));

  // Verify B (Background) elements
  assert.ok(html.includes('[B] BACKGROUND'));
  assert.ok(html.includes('Cockcroft-Gault CrCl'));
  assert.ok(html.includes('CKD-EPI 2021 eGFR'));
  assert.ok(html.includes('Serum Creatinine'));
  assert.ok(html.includes('2.1 mg/dL'));

  // Verify A (Assessment) elements
  assert.ok(html.includes('[A] ASSESSMENT'));
  assert.ok(html.includes('Wells DVT'));
  assert.ok(html.includes('Wells PE'));
  assert.ok(html.includes('CURB-65 Pneumonia'));
  assert.ok(html.includes('Arterial Blood Gas (ABG) 4-Step Diagnostic Summary'));

  // Verify R (Recommendation) elements
  assert.ok(html.includes('[R] RECOMMENDATION'));
  assert.ok(html.includes('Immediate Weight-Calculated Crisis Push Doses (75 kg)'));
  assert.ok(html.includes('Epinephrine 1:10,000'));
  assert.ok(html.includes('Dantrolene (2.5 mg/kg)'));
  assert.ok(html.includes('20% Intralipid Rescue'));
  assert.ok(html.includes('Empiric Antimicrobial Plan with Renal Clearance Adjustments'));
  assert.ok(html.includes('Post-op laparotomy day 1'));
  assert.ok(html.includes('Attending Physician:'));
});
