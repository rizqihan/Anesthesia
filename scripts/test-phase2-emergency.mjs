import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BROSELOW_ZONES,
  getBroselowZoneByWeight,
  calculatePediatricDoses,
  calculateStatusEpilepticusDoses,
  evaluateHypertensiveCrisis,
  calculateNicardipineInfusion,
  calculateNitroprussideInfusion,
  calculateLabetalolDosing,
  HS_AND_TS_LIST,
} from '../lib/emergencyProtocols.ts';

test('Broselow Tape Zones and Boundary Selection', () => {
  // Test all 9 zones exist
  assert.equal(BROSELOW_ZONES.length, 9);
  assert.equal(BROSELOW_ZONES[0].id, 'grey');
  assert.equal(BROSELOW_ZONES[1].id, 'pink');
  assert.equal(BROSELOW_ZONES[2].id, 'red');
  assert.equal(BROSELOW_ZONES[3].id, 'purple');
  assert.equal(BROSELOW_ZONES[4].id, 'yellow');
  assert.equal(BROSELOW_ZONES[5].id, 'white');
  assert.equal(BROSELOW_ZONES[6].id, 'blue');
  assert.equal(BROSELOW_ZONES[7].id, 'orange');
  assert.equal(BROSELOW_ZONES[8].id, 'green');

  // Boundary testing
  const zone3kg = getBroselowZoneByWeight(3);
  assert.equal(zone3kg.id, 'grey');

  const zone6kg = getBroselowZoneByWeight(6.5);
  assert.equal(zone6kg.id, 'pink');

  const zone8kg = getBroselowZoneByWeight(8.5);
  assert.equal(zone8kg.id, 'red');

  const zone10kg = getBroselowZoneByWeight(10.5);
  assert.equal(zone10kg.id, 'purple');

  const zone13kg = getBroselowZoneByWeight(13);
  assert.equal(zone13kg.id, 'yellow');

  const zone16kg = getBroselowZoneByWeight(16.5);
  assert.equal(zone16kg.id, 'white');

  const zone21kg = getBroselowZoneByWeight(21);
  assert.equal(zone21kg.id, 'blue');

  const zone26kg = getBroselowZoneByWeight(26.5);
  assert.equal(zone26kg.id, 'orange');

  const zone33kg = getBroselowZoneByWeight(33);
  assert.equal(zone33kg.id, 'green');

  // Below and above limits
  const zoneUnder = getBroselowZoneByWeight(2);
  assert.equal(zoneUnder.id, 'grey');

  const zoneOver = getBroselowZoneByWeight(45);
  assert.equal(zoneOver.id, 'green');
});

test('Pediatric Resuscitation Calculations', () => {
  // 10 kg infant
  const d10kg = calculatePediatricDoses(10);
  assert.equal(d10kg.epiArrestMg, 0.1); // 0.01 mg/kg
  assert.equal(d10kg.epiArrestMl, 1.0); // 1:10,000 solution
  assert.equal(d10kg.atropineMg, 0.2); // 0.02 mg/kg
  assert.equal(d10kg.amiodaroneArrestMg, 50); // 5 mg/kg
  assert.equal(d10kg.defibrillationInitialJ, 20); // 2 J/kg
  assert.equal(d10kg.defibrillationSubsequentJ, 40); // 4 J/kg
  assert.equal(d10kg.d10wBolusMl, 50); // 5 mL/kg
  assert.equal(d10kg.crystalloidBolusMl, 200); // 20 mL/kg
  assert.equal(d10kg.adenosineFirstMg, 1.0); // 0.1 mg/kg
  assert.equal(d10kg.succinylcholineIvMg, 20); // 2 mg/kg
  assert.equal(d10kg.rocuroniumIvMg, 10); // 1 mg/kg

  // 3 kg neonate with minimum Atropine safety limit (0.1 mg)
  const d3kg = calculatePediatricDoses(3);
  assert.equal(d3kg.atropineMg, 0.1); // Minimum 0.1 mg to prevent paradoxical bradycardia
  assert.equal(d3kg.defibrillationInitialJ, 6); // 2 J/kg
  assert.equal(d3kg.d10wBolusMl, 15); // 5 mL/kg

  // 30 kg child with maximum caps
  const d30kg = calculatePediatricDoses(30);
  assert.equal(d30kg.epiArrestMg, 0.3);
  assert.equal(d30kg.amiodaroneArrestMg, 150);
  assert.equal(d30kg.defibrillationInitialJ, 60);
  assert.equal(d30kg.defibrillationSubsequentJ, 120);
});

test('Status Epilepticus 4-Phase Protocol Dosing', () => {
  // 70 kg adult
  const se70kg = calculateStatusEpilepticusDoses(70);
  assert.equal(se70kg.phase2FirstLine.lorazepamIv.doseMg, 4); // Max 4 mg cap
  assert.equal(se70kg.phase2FirstLine.lorazepamIv.volumeMl, 2);
  assert.equal(se70kg.phase2FirstLine.diazepamIv.doseMg, 10); // Max 10 mg cap
  assert.equal(se70kg.phase2FirstLine.midazolamIm.doseMg, 10); // > 40kg gets 10 mg IM
  assert.equal(se70kg.phase3SecondLine.keppra.doseMg, 4200); // 70 * 60 = 4200 mg (capped at 4500)
  assert.equal(se70kg.phase3SecondLine.fosphenytoin.doseMgPe, 1400); // 70 * 20 = 1400 mg PE
  assert.equal(se70kg.phase3SecondLine.valproate.doseMg, 2800); // 70 * 40 = 2800 mg
  assert.equal(se70kg.phase4Refractory.propofolBolusMg, 105); // 1.5 mg/kg

  // 15 kg child
  const se15kg = calculateStatusEpilepticusDoses(15);
  assert.equal(se15kg.phase2FirstLine.lorazepamIv.doseMg, 1.5); // 0.1 mg/kg
  assert.equal(se2ChildMidazolam(se15kg), 5); // 13-40kg gets 5 mg IM
  assert.equal(se15kg.phase3SecondLine.keppra.doseMg, 900); // 15 * 60 = 900 mg
});

function se2ChildMidazolam(se) {
  return se.phase2FirstLine.midazolamIm.doseMg;
}

test('Hypertensive Crisis Evaluation & Reduction Boundaries', () => {
  // Severe BP 220/120 mmHg with target organ damage (Emergency)
  const crisis = evaluateHypertensiveCrisis(220, 120, true, false);
  // MAP = (220 + 2*120)/3 = (220 + 240)/3 = 460/3 = 153.33 -> 153
  assert.equal(crisis.map, 153);
  assert.equal(crisis.isEmergency, true);
  // 20% reduction = 153 * 0.80 = 122.4 -> 122
  assert.equal(crisis.targetMapHour1Max, 122);
  // 25% reduction = 153 * 0.75 = 114.75 -> 115
  assert.equal(crisis.targetMapHour1Min, 115);

  // Aortic Dissection Exception
  const dissection = evaluateHypertensiveCrisis(190, 110, true, true);
  assert.equal(dissection.isAorticDissection, true);
  assert.equal(dissection.aorticDissectionTargetSbp.includes('< 120'), true);
  assert.equal(dissection.aorticDissectionTargetHr.includes('< 60'), true);
  assert.equal(dissection.aorticDissectionBetaBlockerRule.includes('Beta-Blocker'), true);
});

test('Antihypertensive Infusion Calculators', () => {
  // Nicardipine: 5 mg/hr starting -> 50 mL/hr (25mg/250mL = 0.1 mg/mL)
  const nic5 = calculateNicardipineInfusion(5);
  assert.equal(nic5.rateMlPerHr, 50);

  const nic15 = calculateNicardipineInfusion(15);
  assert.equal(nic15.rateMlPerHr, 150);

  // Nitroprusside: 70 kg patient at 1.0 mcg/kg/min -> 70 mcg/min
  // Concentration 200 mcg/mL (50mg in 250mL) -> (70 * 60) / 200 = 4200 / 200 = 21 mL/hr
  const nip70 = calculateNitroprussideInfusion(70, 1.0);
  assert.equal(nip70.totalMcgPerMin, 70);
  assert.equal(nip70.rateMlPerHr, 21.0);

  // Labetalol: 2 mg/min -> 120 mg/hr
  const lab = calculateLabetalolDosing(2);
  assert.equal(lab.infusionMgPerHr, 120);
  assert.equal(lab.rateMlPerHrNeat, 24); // 120 / 5 mg/mL
  assert.equal(lab.rateMlPerHrDilute, 120); // 120 / 1 mg/mL
});

test('ACLS Hs and Ts Completeness', () => {
  assert.equal(HS_AND_TS_LIST.length, 10);
  const hs = HS_AND_TS_LIST.filter((i) => i.category === 'H');
  const ts = HS_AND_TS_LIST.filter((i) => i.category === 'T');
  assert.equal(hs.length, 5);
  assert.equal(ts.length, 5);

  const ids = HS_AND_TS_LIST.map((i) => i.id);
  assert.ok(ids.includes('hypovolemia'));
  assert.ok(ids.includes('hypoxia'));
  assert.ok(ids.includes('hydrogen_ion'));
  assert.ok(ids.includes('hypo_hyper_kalemia'));
  assert.ok(ids.includes('hypothermia'));
  assert.ok(ids.includes('tension_pneumothorax'));
  assert.ok(ids.includes('tamponade_cardiac'));
  assert.ok(ids.includes('toxins'));
  assert.ok(ids.includes('thrombosis_pulmonary'));
  assert.ok(ids.includes('thrombosis_coronary'));
});
