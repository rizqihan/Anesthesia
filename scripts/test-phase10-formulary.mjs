import assert from 'node:assert/strict';
import test from 'node:test';
import { DRUG_DB } from '../lib/drugs.ts';
import db from '../lib/db.ts';

test('Formulary Database Size and Overall Completeness', () => {
  assert.ok(Array.isArray(DRUG_DB), 'DRUG_DB must be an array');
  assert.ok(DRUG_DB.length >= 100, `Expected at least 100 drugs, got ${DRUG_DB.length}`);

  const ids = new Set();
  for (const drug of DRUG_DB) {
    // Unique ID
    assert.ok(drug.id && typeof drug.id === 'string', `Drug missing valid id: ${JSON.stringify(drug)}`);
    assert.ok(!ids.has(drug.id), `Duplicate drug ID detected: ${drug.id}`);
    ids.add(drug.id);

    // Generic name & brand names
    assert.ok(drug.genericName && drug.genericName.length > 2, `Drug ${drug.id} missing genericName`);
    assert.ok(Array.isArray(drug.brandNames) && drug.brandNames.length >= 1, `Drug ${drug.id} missing brandNames`);

    // Class
    assert.ok(drug.drugClass && drug.drugClass.length > 2, `Drug ${drug.id} missing drugClass`);

    // Bilingual Indications & Contraindications
    assert.ok(drug.indications?.en && drug.indications?.id, `Drug ${drug.id} missing bilingual indications`);
    assert.ok(drug.contraindications?.en && drug.contraindications?.id, `Drug ${drug.id} missing bilingual contraindications`);

    // Dosing specification
    assert.ok(drug.dosing, `Drug ${drug.id} missing dosing object`);
    assert.ok(typeof drug.dosing.dosePerKg === 'number' && drug.dosing.dosePerKg > 0, `Drug ${drug.id} invalid dosePerKg: ${drug.dosing.dosePerKg}`);
    assert.ok(typeof drug.dosing.maxDose === 'number' && drug.dosing.maxDose > 0, `Drug ${drug.id} invalid maxDose: ${drug.dosing.maxDose}`);
    assert.ok(drug.dosing.unit && typeof drug.dosing.unit === 'string', `Drug ${drug.id} missing dosing unit`);
    assert.ok(drug.dosing.frequency && typeof drug.dosing.frequency === 'string', `Drug ${drug.id} missing frequency`);
    assert.ok(drug.dosing.notes?.en && drug.dosing.notes?.id, `Drug ${drug.id} missing bilingual dosing notes`);

    // Clinical pharmacology
    assert.ok(drug.onset, `Drug ${drug.id} missing onset description`);
    assert.ok(drug.duration, `Drug ${drug.id} missing duration description`);
    assert.ok(drug.metabolism, `Drug ${drug.id} missing metabolism description`);
    assert.ok(drug.clinicalPearls?.en && drug.clinicalPearls?.id, `Drug ${drug.id} missing clinical pearls`);

    // High risk flag
    assert.equal(typeof drug.highRisk, 'boolean', `Drug ${drug.id} missing highRisk boolean`);
  }
});

test('Required Core Anesthesia, Critical Care & Emergency Formularies', () => {
  const drugMap = new Map(DRUG_DB.map(d => [d.id, d]));

  // 1. IV Hypnotics / Induction
  const hypnotics = ['propofol', 'etomidate', 'ketamine', 'methohexital', 'thiopental'];
  for (const id of hypnotics) {
    assert.ok(drugMap.has(id), `Missing required IV hypnotic: ${id}`);
    const d = drugMap.get(id);
    assert.equal(d.highRisk, true, `${id} must be flagged as highRisk`);
  }

  // 2. Neuromuscular Blockers & Reversal
  const nmbaAndReversal = [
    'succinylcholine', 'rocuronium', 'vecuronium', 'cisatracurium',
    'pancuronium', 'sugammadex', 'neostigmine', 'glycopyrrolate', 'atropine'
  ];
  for (const id of nmbaAndReversal) {
    assert.ok(drugMap.has(id), `Missing required NMBA/Reversal agent: ${id}`);
  }
  // Paralytics must be high risk
  ['succinylcholine', 'rocuronium', 'vecuronium', 'cisatracurium', 'pancuronium'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Paralytic ${id} must be highRisk`);
  });

  // 3. Volatiles / Inhalational
  const volatiles = ['sevoflurane', 'desflurane', 'isoflurane', 'nitrous-oxide'];
  for (const id of volatiles) {
    assert.ok(drugMap.has(id), `Missing volatile agent: ${id}`);
    assert.equal(drugMap.get(id).highRisk, true, `Volatile ${id} must be highRisk`);
  }

  // 4. Opioids & Non-Opioid Analgesics
  const analgesics = [
    'fentanyl', 'remifentanil', 'sufentanil', 'morphine',
    'hydromorphone', 'alfentanil', 'naloxone', 'ketorolac',
    'paracetamol-iv', 'ibuprofen-iv'
  ];
  for (const id of analgesics) {
    assert.ok(drugMap.has(id), `Missing analgesic agent: ${id}`);
  }
  ['fentanyl', 'remifentanil', 'sufentanil', 'morphine', 'hydromorphone', 'alfentanil', 'naloxone'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Opioid/Antagonist ${id} must be highRisk`);
  });

  // 5. Local Anesthetics & Rescue
  const localAnesthetics = ['lidocaine', 'bupivacaine', 'ropivacaine', 'levobupivacaine', 'mepivacaine', 'lipid-emulsion-20'];
  for (const id of localAnesthetics) {
    assert.ok(drugMap.has(id), `Missing local anesthetic / rescue agent: ${id}`);
  }
  ['bupivacaine', 'ropivacaine', 'levobupivacaine', 'lipid-emulsion-20'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Cardiotoxic LA or LAST antidote ${id} must be highRisk`);
  });

  // 6. Vasopressors & Inotropes
  const vasoactives = ['norepinephrine', 'epinephrine', 'vasopressin', 'phenylephrine', 'ephedrine', 'dopamine', 'dobutamine', 'milrinone'];
  for (const id of vasoactives) {
    assert.ok(drugMap.has(id), `Missing vasoactive agent: ${id}`);
  }
  ['norepinephrine', 'epinephrine', 'vasopressin', 'phenylephrine', 'dopamine', 'dobutamine', 'milrinone'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Potent vasoactive ${id} must be highRisk`);
  });

  // 7. Antihypertensives & Antiarrhythmics
  const cardiovascular = ['nicardipine', 'labetalol', 'esmolol', 'hydralazine', 'nitroglycerin', 'nitroprusside', 'amiodarone', 'adenosine'];
  for (const id of cardiovascular) {
    assert.ok(drugMap.has(id), `Missing cardiovascular drug: ${id}`);
  }
  ['nicardipine', 'esmolol', 'nitroglycerin', 'nitroprusside', 'amiodarone', 'adenosine'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Acute cardiovascular agent ${id} must be highRisk`);
  });

  // 8. Emergency & Critical Care
  const emergencyElectrolytes = ['calcium-chloride', 'calcium-gluconate', 'magnesium-sulfate', 'sodium-bicarbonate', 'dextrose-50'];
  for (const id of emergencyElectrolytes) {
    assert.ok(drugMap.has(id), `Missing emergency electrolyte: ${id}`);
  }
  ['calcium-chloride', 'magnesium-sulfate', 'sodium-bicarbonate'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Concentrated electrolyte ${id} must be highRisk`);
  });

  // 9. Sedatives & Anxiolytics
  const sedatives = ['midazolam', 'lorazepam', 'dexmedetomidine', 'flumazenil'];
  for (const id of sedatives) {
    assert.ok(drugMap.has(id), `Missing sedative agent: ${id}`);
    assert.equal(drugMap.get(id).highRisk, true, `Sedative ${id} must be highRisk`);
  }

  // 10. PONV & GI Prophylaxis
  const ponvAndGI = ['ondansetron', 'dexamethasone', 'droperidol', 'metoclopramide', 'pantoprazole'];
  for (const id of ponvAndGI) {
    assert.ok(drugMap.has(id), `Missing PONV/GI drug: ${id}`);
  }

  // 11. Hemostasis & Blood Conservation
  const hemostasis = ['tranexamic-acid', 'protamine-sulfate', 'desmopressin', 'prothrombin-complex-concentrate'];
  for (const id of hemostasis) {
    assert.ok(drugMap.has(id), `Missing hemostatic drug: ${id}`);
  }
  ['tranexamic-acid', 'protamine-sulfate', 'prothrombin-complex-concentrate'].forEach(id => {
    assert.equal(drugMap.get(id).highRisk, true, `Hemostatic / antidote ${id} must be highRisk`);
  });

  // 12. Perioperative Antimicrobials
  const antimicrobials = ['cefazolin', 'cefuroxime', 'vancomycin', 'clindamycin', 'metronidazole', 'gentamicin', 'ampicillin-sulbactam'];
  for (const id of antimicrobials) {
    assert.ok(drugMap.has(id), `Missing perioperative antimicrobial: ${id}`);
  }
});

test('Dosage Calculator Engine Compatibility Across All Drugs', () => {
  const testWeights = [10, 50, 70, 100, 150];

  for (const drug of DRUG_DB) {
    for (const w of testWeights) {
      let dose = w * drug.dosing.dosePerKg;
      let maxReached = false;
      if (dose > drug.dosing.maxDose) {
        dose = drug.dosing.maxDose;
        maxReached = true;
      }

      assert.ok(!Number.isNaN(dose), `Calculated dose is NaN for ${drug.id} at ${w} kg`);
      assert.ok(Number.isFinite(dose), `Calculated dose is infinite for ${drug.id} at ${w} kg`);
      assert.ok(dose > 0, `Calculated dose must be > 0 for ${drug.id} at ${w} kg`);
      assert.ok(dose <= drug.dosing.maxDose, `Calculated dose ${dose} exceeds maxDose ${drug.dosing.maxDose} for ${drug.id}`);
    }
  }
});

test('Dexie Version Schema Integrity for Formulary Upgrades', () => {
  // Check that db is instantiated and schema version exists
  const dexieDb = db?.verno ? db : (db?.default ?? db);
  assert.ok(dexieDb, 'Dexie db instance must exist');
  assert.ok(dexieDb.verno >= 7, `Dexie database must be on schema version >= 7, got ${dexieDb.verno}`);
  assert.ok(dexieDb.tables.some(t => t.name === 'drugs'), 'drugs table must exist in schema');
});

test('General Hospital & Clinical Pharmacopeia Completeness', () => {
  const drugMap = new Map(DRUG_DB.map(d => [d.id, d]));

  // Required general medicine, cardiology, endocrine, neurology, GI, and antimicrobial drugs
  const requiredGeneralDrugs = [
    'captopril', 'ramipril', 'lisinopril', 'losartan', 'valsartan', 'candesartan',
    'amlodipine', 'bisoprolol', 'carvedilol', 'spironolactone', 'furosemide_oral',
    'digoxin', 'atorvastatin', 'propranolol', 'metoprolol_succinate', 'diltiazem_oral',
    'verapamil_oral', 'isosorbide_dinitrate', 'sacubitril_valsartan',
    'aspirin_cardio', 'clopidogrel', 'warfarin', 'rivaroxaban', 'apixaban', 'ticagrelor',
    'dabigatran', 'phytomenadione',
    'metformin', 'glimepiride', 'empagliflozin', 'insulin_regular', 'insulin_glargine',
    'levothyroxine', 'propylthiouracil', 'semaglutide', 'prednisone',
    'amoxicillin_oral', 'amoxicillin_clavulanate', 'cefixime', 'ceftriaxone_extended',
    'ciprofloxacin_oral', 'azithromycin', 'doxycycline', 'fluconazole', 'acyclovir_oral',
    'levetiracetam', 'sodium_valproate', 'gabapentin', 'haloperidol_oral', 'celecoxib',
    'phenytoin', 'carbamazepine', 'quetiapine', 'tramadol',
    'salbutamol_inhaler', 'budesonide_inhaler', 'cetirizine',
    'omeprazole', 'sucralfate', 'loperamide', 'lactulose', 'lansoprazole', 'domperidone',
    'ursodeoxycholic_acid', 'hyoscine_butylbromide',
    'oxytocin', 'misoprostol', 'acetylcysteine'
  ];

  for (const id of requiredGeneralDrugs) {
    assert.ok(drugMap.has(id), `Missing required general medical drug: ${id}`);
    const d = drugMap.get(id);
    assert.ok(d.indications?.en && d.indications?.id, `${id} missing bilingual indications`);
    assert.ok(d.dosing?.dosePerKg > 0, `${id} must have valid dosePerKg`);
  }
});
