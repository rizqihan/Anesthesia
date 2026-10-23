import assert from 'node:assert/strict';
import test from 'node:test';
import { PHYSICAL_EXAMS_DB } from '../lib/physicalExamsData.ts';

test('Physical Exam Guidelines Database Completeness and Bilingual Structure', () => {
  assert.ok(Array.isArray(PHYSICAL_EXAMS_DB), 'PHYSICAL_EXAMS_DB must be an array');
  assert.ok(PHYSICAL_EXAMS_DB.length >= 12, `Must contain at least 12 guidelines, found ${PHYSICAL_EXAMS_DB.length}`);

  const ids = new Set();
  const requiredCategories = [
    'Neurology',
    'General Medicine',
    'Orthopedics',
    'Cardiology',
    'Pulmonology',
    'Anesthesiology',
    'Gastroenterology',
    'Endocrinology',
    'Pediatrics'
  ];

  const presentCategories = new Set();

  PHYSICAL_EXAMS_DB.forEach((exam, idx) => {
    // Unique ID validation
    assert.ok(Number.isInteger(exam.id) && exam.id > 0, `Record ${idx} must have positive integer id`);
    assert.ok(!ids.has(exam.id), `Duplicate ID found: ${exam.id}`);
    ids.add(exam.id);

    // Category
    assert.ok(exam.category && exam.category.length > 2, `Record ${exam.id} must have valid category`);
    presentCategories.add(exam.category);

    // Bilingual title
    assert.ok(exam.title?.en && exam.title.en.trim().length > 5, `Record ${exam.id} missing English title`);
    assert.ok(exam.title?.id && exam.title.id.trim().length > 5, `Record ${exam.id} missing Indonesian title`);

    // Bilingual definition
    assert.ok(exam.definition?.en && exam.definition.en.trim().length > 15, `Record ${exam.id} missing English definition`);
    assert.ok(exam.definition?.id && exam.definition.id.trim().length > 15, `Record ${exam.id} missing Indonesian definition`);

    // Bilingual preparation
    assert.ok(exam.preparation?.en && exam.preparation.en.trim().length > 10, `Record ${exam.id} missing English preparation`);
    assert.ok(exam.preparation?.id && exam.preparation.id.trim().length > 10, `Record ${exam.id} missing Indonesian preparation`);

    // Clinical Steps
    assert.ok(Array.isArray(exam.steps) && exam.steps.length >= 3, `Record ${exam.id} must have >= 3 steps`);
    exam.steps.forEach((step, sIdx) => {
      assert.equal(step.stepNumber, sIdx + 1, `Step numbers must be 1-indexed sequential in record ${exam.id}`);
      assert.ok(step.bodyPartId && step.bodyPartId.length > 0, `Step ${sIdx + 1} in record ${exam.id} must have bodyPartId`);

      // Bilingual instruction
      assert.ok(step.instruction?.en && step.instruction.en.length > 10, `Step ${sIdx + 1} in record ${exam.id} missing EN instruction`);
      assert.ok(step.instruction?.id && step.instruction.id.length > 10, `Step ${sIdx + 1} in record ${exam.id} missing ID instruction`);

      // Bilingual normal findings
      assert.ok(step.normalFindings?.en && step.normalFindings.en.length > 5, `Step ${sIdx + 1} in record ${exam.id} missing EN normal findings`);
      assert.ok(step.normalFindings?.id && step.normalFindings.id.length > 5, `Step ${sIdx + 1} in record ${exam.id} missing ID normal findings`);

      // Bilingual abnormal findings
      assert.ok(step.abnormalFindings?.en && step.abnormalFindings.en.length > 5, `Step ${sIdx + 1} in record ${exam.id} missing EN abnormal findings`);
      assert.ok(step.abnormalFindings?.id && step.abnormalFindings.id.length > 5, `Step ${sIdx + 1} in record ${exam.id} missing ID abnormal findings`);
    });
  });

  // Check required clinical disciplines
  requiredCategories.forEach((cat) => {
    assert.ok(presentCategories.has(cat), `Required clinical category missing: ${cat}`);
  });
});

test('Preoperative Airway Assessment Guideline Anesthetic Specifics', () => {
  const airwayExam = PHYSICAL_EXAMS_DB.find((e) => e.category === 'Anesthesiology');
  assert.ok(airwayExam, 'Must have a dedicated Anesthesiology category guideline');
  assert.ok(airwayExam.title.en.toLowerCase().includes('airway'), 'Must be Airway Assessment');

  const stepInstructions = airwayExam.steps.map((s) => s.instruction.en.toLowerCase()).join(' ');
  assert.ok(stepInstructions.includes('mallampati'), 'Airway exam must assess Mallampati score');
  assert.ok(stepInstructions.includes('thyromental'), 'Airway exam must assess Thyromental distance');
  assert.ok(stepInstructions.includes('atlanto-occipital') || stepInstructions.includes('neck mobility'), 'Airway exam must assess neck extension/mobility');
  assert.ok(stepInstructions.includes('incisor') || stepInstructions.includes('mouth opening'), 'Airway exam must assess mouth opening');
});
