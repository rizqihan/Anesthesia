import assert from 'node:assert/strict';
import test from 'node:test';
import {
  POCUS_PROTOCOLS,
  POCUS_CASES,
  calculateIvcCollapsibility,
  calculateIvcDistensibility,
  calculateBladderVolume,
  calculateEllipseArea
} from '../lib/pocusData.ts';
import fs from 'node:fs';
import path from 'node:path';

test('POCUS Protocols Metadata and Core Set Coverage', () => {
  assert.equal(POCUS_PROTOCOLS.length, 4, 'Should contain 4 core clinical protocols');
  const protoIds = POCUS_PROTOCOLS.map((p) => p.id);
  assert.ok(protoIds.includes('efast'), 'Should include eFAST');
  assert.ok(protoIds.includes('blue'), 'Should include BLUE protocol');
  assert.ok(protoIds.includes('focus'), 'Should include FOCUS cardiac protocol');
  assert.ok(protoIds.includes('vascular'), 'Should include Vascular access protocol');

  POCUS_PROTOCOLS.forEach((proto) => {
    assert.ok(proto.title.length > 0);
    assert.ok(proto.clinicalObjective.length > 0);
    assert.ok(proto.caseIds.length > 0);
    proto.caseIds.forEach((caseId) => {
      assert.ok(POCUS_CASES[caseId], `Case ID ${caseId} in protocol ${proto.id} must exist in POCUS_CASES`);
    });
  });
});

test('POCUS Cases Clinical Data Completeness and Bounds', () => {
  const cases = Object.values(POCUS_CASES);
  assert.ok(cases.length >= 15, 'Should have at least 15 comprehensive clinical windows');

  cases.forEach((c) => {
    assert.ok(c.id, 'Case must have an ID');
    assert.ok(['efast', 'blue', 'focus', 'vascular'].includes(c.protocol), `Valid protocol for ${c.id}`);
    assert.ok(['Curvilinear', 'Phased Array', 'Linear'].includes(c.probeType), `Valid probe for ${c.id}`);
    assert.ok(c.probeOrientation.length > 10, `Detailed probe orientation rules for ${c.id}`);
    assert.ok(c.title.length > 0);
    assert.ok(c.subtitle.length > 0);

    // Mannequin target coordinates
    assert.ok(c.mannequinPosition.x >= 0 && c.mannequinPosition.x <= 100, `Mannequin X in bounds for ${c.id}`);
    assert.ok(c.mannequinPosition.y >= 0 && c.mannequinPosition.y <= 100, `Mannequin Y in bounds for ${c.id}`);
    assert.ok(typeof c.mannequinPosition.angleDeg === 'number', `Angle defined for ${c.id}`);
    assert.ok((c.mannequinPosition.lockRadiusPx ?? 18) >= 15, `Lock radius at least 15px for ${c.id}`);

    // Acoustic landmarks
    assert.ok(c.acousticLandmarks.length >= 2, `At least 2 landmarks for ${c.id}`);
    c.acousticLandmarks.forEach((lm) => {
      assert.ok(lm.id.length > 0);
      assert.ok(lm.name.length > 0);
      assert.ok(lm.x >= 0 && lm.x <= 100, `Landmark X in bounds: ${lm.name} in ${c.id}`);
      assert.ok(lm.y >= 0 && lm.y <= 100, `Landmark Y in bounds: ${lm.name} in ${c.id}`);
      assert.ok(
        ['anechoic', 'hypoechoic', 'isoechoic', 'hyperechoic'].includes(lm.echogenicity),
        `Valid echogenicity for ${lm.name}`
      );
    });

    // Normal & pathology clinical descriptions
    assert.ok(c.normalFindings.length >= 1, `Normal findings for ${c.id}`);
    assert.ok(c.pathologyTitle.length > 0);
    assert.ok(c.pathologySignName.length > 0);
    assert.ok(c.pathologyFindings.length >= 1, `Pathology findings for ${c.id}`);

    // Pearls, pitfalls, and procedure
    assert.ok(c.clinicalPearls.length >= 2, `At least 2 clinical pearls for ${c.id}`);
    assert.ok(c.proceduralSteps.length >= 2, `At least 2 procedural steps for ${c.id}`);

    // Branching decision tree
    assert.ok(c.decisionTree.question.length > 0);
    assert.ok(c.decisionTree.positiveFinding.length > 0);
    assert.ok(c.decisionTree.positiveAction.length > 0);
    assert.ok(c.decisionTree.negativeFinding.length > 0);
    assert.ok(c.decisionTree.negativeAction.length > 0);
  });
});

test('IVC Collapsibility Index (Spontaneous Breathing)', () => {
  // 1. Normal caliber & high collapsibility (fluid responsive)
  // Max = 1.8 cm, Min = 0.6 cm -> ((1.8 - 0.6) / 1.8) * 100 = 66.7%
  const responsive = calculateIvcCollapsibility(1.8, 0.6);
  assert.equal(responsive.isValid, true);
  assert.equal(responsive.indexPct, 66.7);
  assert.ok(responsive.cvpEstimate.includes('0 - 5 mmHg'));
  assert.ok(responsive.volumeResponsiveness.includes('High Likelihood'));

  // 2. Plethoric non-collapsing IVC (fluid overload / elevated CVP)
  // Max = 2.4 cm, Min = 2.0 cm -> ((2.4 - 2.0) / 2.4) * 100 = 16.7%
  const overload = calculateIvcCollapsibility(2.4, 2.0);
  assert.equal(overload.isValid, true);
  assert.equal(overload.indexPct, 16.7);
  assert.ok(overload.cvpEstimate.includes('10 - 20 mmHg'));
  assert.ok(overload.volumeResponsiveness.includes('Low Likelihood'));

  // 3. Intermediate parameters
  // Max = 2.0 cm, Min = 1.3 cm -> ((2.0 - 1.3) / 2.0) * 100 = 35.0%
  const intermediate = calculateIvcCollapsibility(2.0, 1.3);
  assert.equal(intermediate.isValid, true);
  assert.equal(intermediate.indexPct, 35.0);
  assert.ok(intermediate.cvpEstimate.includes('5 - 10 mmHg'));

  // 4. Invalid input handling
  const invalid1 = calculateIvcCollapsibility(-1, 0.5);
  assert.equal(invalid1.isValid, false);
  const invalid2 = calculateIvcCollapsibility(1.5, 2.0); // min > max
  assert.equal(invalid2.isValid, false);
  const invalid3 = calculateIvcCollapsibility(0, 0);
  assert.equal(invalid3.isValid, false);
  const invalid4 = calculateIvcCollapsibility(NaN, 1);
  assert.equal(invalid4.isValid, false);
});

test('IVC Distensibility Index (Mechanical Ventilation)', () => {
  // Formula: ((Max - Min) / Min) * 100%
  // 1. Fluid responsive (dIVC >= 18%)
  // Max = 2.0 cm, Min = 1.5 cm -> ((2.0 - 1.5) / 1.5) * 100 = 33.3%
  const responsive = calculateIvcDistensibility(2.0, 1.5);
  assert.equal(responsive.isValid, true);
  assert.equal(responsive.indexPct, 33.3);
  assert.ok(responsive.volumeResponsiveness.includes('Fluid Responsive'));

  // 2. Non-responsive (dIVC < 18%)
  // Max = 2.1 cm, Min = 1.9 cm -> ((2.1 - 1.9) / 1.9) * 100 = 10.5%
  const nonResponsive = calculateIvcDistensibility(2.1, 1.9);
  assert.equal(nonResponsive.isValid, true);
  assert.equal(nonResponsive.indexPct, 10.5);
  assert.ok(nonResponsive.volumeResponsiveness.includes('Unlikely Fluid Responsive'));

  // 3. Invalid inputs
  const invalid1 = calculateIvcDistensibility(0, 1.5);
  assert.equal(invalid1.isValid, false);
  const invalid2 = calculateIvcDistensibility(1.5, 0);
  assert.equal(invalid2.isValid, false);
  const invalid3 = calculateIvcDistensibility(1.2, 1.8); // min > max
  assert.equal(invalid3.isValid, false);
});

test('3-Axis Bladder Volume Calculations & Retention Thresholds', () => {
  // Formula: Length * Width * Height * 0.523
  // 1. Normal residual: L=6cm, W=5cm, H=4cm -> 120 * 0.523 = 62.76 -> 62.8 mL
  const normal = calculateBladderVolume(6, 5, 4);
  assert.equal(normal.isValid, true);
  assert.equal(normal.volumeMl, 62.8);
  assert.equal(normal.isRetention, false);
  assert.ok(normal.clinicalRecommendation.includes('Normal'));

  // 2. Moderate retention (250-399 mL): L=10cm, W=8cm, H=6cm -> 480 * 0.523 = 251.04 -> 251.0 mL
  const mod = calculateBladderVolume(10, 8, 6);
  assert.equal(mod.isValid, true);
  assert.equal(mod.volumeMl, 251.0);
  assert.equal(mod.isRetention, false);
  assert.ok(mod.clinicalRecommendation.includes('250 - 399 mL'));

  // 3. Severe acute retention (>= 400 mL): L=12cm, W=10cm, H=8cm -> 960 * 0.523 = 502.08 -> 502.1 mL
  const retention = calculateBladderVolume(12, 10, 8);
  assert.equal(retention.isValid, true);
  assert.equal(retention.volumeMl, 502.1);
  assert.equal(retention.isRetention, true);
  assert.ok(retention.clinicalRecommendation.includes('Acute urinary retention'));

  // 4. Invalid boundaries
  const invalid = calculateBladderVolume(0, 10, 8);
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.volumeMl, 0);
});

test('Elliptical Area Calculations', () => {
  // Area = (PI * axis1 * axis2) / 4
  // axis1 = 4 cm, axis2 = 2 cm -> (PI * 8) / 4 = 2 * PI = 6.28 cm²
  const ellipse = calculateEllipseArea(4, 2);
  assert.equal(ellipse.isValid, true);
  assert.equal(ellipse.areaCm2, 6.28);

  const circular = calculateEllipseArea(2, 2);
  assert.equal(circular.isValid, true);
  assert.equal(circular.areaCm2, 3.14);

  // Invalid input
  const invalid = calculateEllipseArea(-1, 2);
  assert.equal(invalid.isValid, false);
});

test('Dexie Version 6 Schema Integrity for POCUS Captures', () => {
  const dbPath = path.resolve(process.cwd(), 'lib/db.ts');
  const dbContent = fs.readFileSync(dbPath, 'utf8');

  // Verify version(6) exists
  assert.ok(dbContent.includes('db.version(6).stores({'), 'db.ts must declare version 6 stores');
  // Verify pocusCaptures store declaration
  assert.ok(
    dbContent.includes("pocusCaptures: '++id, timestamp, protocol, windowId, diagnosis'"),
    'pocusCaptures schema must match exact specification'
  );
  // Verify typing interface
  assert.ok(dbContent.includes('export interface POCUSCaptureRecord'), 'POCUSCaptureRecord must be exported');
  assert.ok(dbContent.includes('pocusCaptures: EntityTable<POCUSCaptureRecord, \'id\'>'), 'Dexie table must be typed');
});

test('POCUS Photos & Assets Integrity Across All Cases', () => {
  const cases = Object.values(POCUS_CASES);
  assert.equal(cases.length, 20, 'Should have exactly 20 comprehensive POCUS cases across 4 protocols');

  for (const c of cases) {
    // 1. Verify normalPhoto
    assert.ok(c.normalPhoto, `Case ${c.id} must have normalPhoto`);
    assert.ok(c.normalPhoto.url && c.normalPhoto.url.startsWith('/images/pocus/'), `Case ${c.id} normalPhoto url must point to /images/pocus/`);
    assert.ok(c.normalPhoto.caption && c.normalPhoto.caption.length > 10, `Case ${c.id} normalPhoto caption must be descriptive`);
    assert.ok(c.normalPhoto.modality, `Case ${c.id} normalPhoto must have modality`);

    const normalFilePath = path.resolve(process.cwd(), 'public', c.normalPhoto.url.replace(/^\//, ''));
    assert.ok(fs.existsSync(normalFilePath), `Normal photo asset must exist at ${normalFilePath}`);
    assert.ok(fs.statSync(normalFilePath).size > 100, `Normal photo asset must not be empty at ${normalFilePath}`);

    // 2. Verify pathologyPhoto
    assert.ok(c.pathologyPhoto, `Case ${c.id} must have pathologyPhoto`);
    assert.ok(c.pathologyPhoto.url && c.pathologyPhoto.url.startsWith('/images/pocus/'), `Case ${c.id} pathologyPhoto url must point to /images/pocus/`);
    assert.ok(c.pathologyPhoto.caption && c.pathologyPhoto.caption.length > 10, `Case ${c.id} pathologyPhoto caption must be descriptive`);
    assert.ok(c.pathologyPhoto.modality, `Case ${c.id} pathologyPhoto must have modality`);

    const pathologyFilePath = path.resolve(process.cwd(), 'public', c.pathologyPhoto.url.replace(/^\//, ''));
    assert.ok(fs.existsSync(pathologyFilePath), `Pathology photo asset must exist at ${pathologyFilePath}`);
    assert.ok(fs.statSync(pathologyFilePath).size > 100, `Pathology photo asset must not be empty at ${pathologyFilePath}`);
  }
});

