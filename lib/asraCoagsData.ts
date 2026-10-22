/**
 * ASRA Coagulation & Regional Anesthesia Antithrombotic Matrix
 * Benchmarked against American Society of Regional Anesthesia and Pain Medicine (ASRA)
 * 4th & 5th Edition Consensus Guidelines for Neuraxial & Deep Regional Nerve Blocks.
 */

export type BlockType = 
  | 'neuraxial' // Spinal, Epidural, CSE (Highest risk of compressive hematoma)
  | 'deep_plexus' // Lumbar Plexus, Paravertebral, Sciatic (Non-compressible)
  | 'superficial' // Axillary, Femoral, Interscalene, TAP block (Compressible)
  | 'catheter_removal'; // Removal of indwelling epidural/perineural catheter

export interface AsraDrugGuideline {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: 'LMWH' | 'UFH' | 'DOAC' | 'VKA' | 'Antiplatelet' | 'Thrombolytic' | 'Factor_Xa_Direct';
  regimen: string;
  preProcedureHoldHours: number;
  preProcedureHoldDisplay: string;
  catheterRemovalHoldHours: number;
  catheterRemovalHoldDisplay: string;
  postProcedureRestartHours: number;
  postProcedureRestartDisplay: string;
  postCatheterRestartHours: number;
  postCatheterRestartDisplay: string;
  labMonitoringRequirements: string[];
  contraindicationsWithCatheter: boolean;
  clinicalPearls: string;
  asraEvidenceLevel: string;
}

export const ASRA_DRUG_DATABASE: AsraDrugGuideline[] = [
  {
    id: 'enoxaparin_prophylactic',
    genericName: 'Enoxaparin (Prophylactic Dose)',
    brandNames: ['Lovenox', 'Clexane'],
    drugClass: 'LMWH',
    regimen: '30 mg BID or 40 mg once daily SC',
    preProcedureHoldHours: 12,
    preProcedureHoldDisplay: '12 hours',
    catheterRemovalHoldHours: 12,
    catheterRemovalHoldDisplay: '12 hours after previous dose',
    postProcedureRestartHours: 12,
    postProcedureRestartDisplay: '12 hours post-puncture (if twice-daily dosing) or 6-8h (if once-daily)',
    postCatheterRestartHours: 4,
    postCatheterRestartDisplay: 'Wait at least 4 hours after catheter pull before next dose',
    labMonitoringRequirements: ['Normal renal function (CrCl ≥ 30 mL/min)', 'Baseline platelet count'],
    contraindicationsWithCatheter: false,
    clinicalPearls: 'Twice-daily prophylactic dosing carries higher risk of hematoma than once-daily. Catheter removal must wait at least 12h post-dose.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'enoxaparin_therapeutic',
    genericName: 'Enoxaparin (Therapeutic / Treatment Dose)',
    brandNames: ['Lovenox', 'Clexane'],
    drugClass: 'LMWH',
    regimen: '1 mg/kg BID or 1.5 mg/kg once daily SC',
    preProcedureHoldHours: 24,
    preProcedureHoldDisplay: '24 hours',
    catheterRemovalHoldHours: 24,
    catheterRemovalHoldDisplay: '24 hours',
    postProcedureRestartHours: 24,
    postProcedureRestartDisplay: '24 hours post-block (delay if traumatic puncture)',
    postCatheterRestartHours: 4,
    postCatheterRestartDisplay: 'Wait at least 4 hours after catheter pull',
    labMonitoringRequirements: ['Normal renal clearance', 'Anti-Xa activity monitoring in severe renal impairment or obesity'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Indwelling neuraxial catheters are strictly CONTRAINDICATED with therapeutic LMWH due to high risk of epidural hematoma.',
    asraEvidenceLevel: 'Class I, Level A',
  },
  {
    id: 'ufh_prophylactic',
    genericName: 'Unfractionated Heparin (Prophylactic SC)',
    brandNames: ['Heparin'],
    drugClass: 'UFH',
    regimen: '5,000 units SC BID or TID (≤ 10,000 units/day)',
    preProcedureHoldHours: 4,
    preProcedureHoldDisplay: '4 – 6 hours (or check normal aPTT)',
    catheterRemovalHoldHours: 4,
    catheterRemovalHoldDisplay: '4 – 6 hours',
    postProcedureRestartHours: 1,
    postProcedureRestartDisplay: '1 hour post-puncture',
    postCatheterRestartHours: 1,
    postCatheterRestartDisplay: '1 hour post-catheter pull',
    labMonitoringRequirements: ['Platelet count if heparin exposure > 4 days (screen for HIT)'],
    contraindicationsWithCatheter: false,
    clinicalPearls: 'Safety of TID dosing (15,000 U/day) with neuraxial catheters remains controversial; assess benefit vs risk carefully.',
    asraEvidenceLevel: 'Class IIa, Level B',
  },
  {
    id: 'ufh_therapeutic_iv',
    genericName: 'Unfractionated Heparin (Therapeutic IV Infusion)',
    brandNames: ['Heparin IV'],
    drugClass: 'UFH',
    regimen: 'Continuous IV titration to aPTT 1.5–2.5× control',
    preProcedureHoldHours: 4,
    preProcedureHoldDisplay: '4 – 6 hours AND verified normal aPTT',
    catheterRemovalHoldHours: 4,
    catheterRemovalHoldDisplay: '4 – 6 hours AND verified normal aPTT',
    postProcedureRestartHours: 1,
    postProcedureRestartDisplay: 'Wait 1 hour post-needle placement',
    postCatheterRestartHours: 1,
    postCatheterRestartDisplay: 'Wait 1 hour post-catheter removal',
    labMonitoringRequirements: ['Documented normal aPTT prior to instrumentation or pull', 'Platelet count (HIT surveillance)'],
    contraindicationsWithCatheter: false,
    clinicalPearls: 'If heparin is administered intraoperatively during vascular surgery, wait at least 60 minutes after neuraxial puncture before dosing heparin.',
    asraEvidenceLevel: 'Class I, Level A',
  },
  {
    id: 'apixaban_prophylactic',
    genericName: 'Apixaban (Prophylactic Dose)',
    brandNames: ['Eliquis'],
    drugClass: 'DOAC',
    regimen: '2.5 mg PO BID (orthopedic VTE prophylaxis)',
    preProcedureHoldHours: 48,
    preProcedureHoldDisplay: '48 hours (2 days)',
    catheterRemovalHoldHours: 48,
    catheterRemovalHoldDisplay: '48 hours before pull',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 hours post-procedure or catheter pull',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: 'Wait at least 6 hours after catheter pull',
    labMonitoringRequirements: ['Normal renal function (CrCl ≥ 30 mL/min)'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Indwelling neuraxial catheters are NOT recommended during DOAC therapy. Remove before initiating apixaban.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'apixaban_therapeutic',
    genericName: 'Apixaban (Therapeutic / Atrial Fibrillation)',
    brandNames: ['Eliquis'],
    drugClass: 'DOAC',
    regimen: '5 mg PO BID (or 2.5 mg BID dose-adjusted)',
    preProcedureHoldHours: 72,
    preProcedureHoldDisplay: '72 hours (3 days)',
    catheterRemovalHoldHours: 72,
    catheterRemovalHoldDisplay: '72 hours',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 hours post-procedure (if low bleed risk) or 24h if high risk',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: '6 hours after catheter removal',
    labMonitoringRequirements: ['Renal function (extend to 96h if CrCl < 30 mL/min)'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'High-risk bleeding procedures like neuraxial anesthesia require 72 hours hold for full pharmacodynamic clearance.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'rivaroxaban_therapeutic',
    genericName: 'Rivaroxaban (Therapeutic Dose)',
    brandNames: ['Xarelto'],
    drugClass: 'DOAC',
    regimen: '15 mg or 20 mg PO daily',
    preProcedureHoldHours: 72,
    preProcedureHoldDisplay: '72 hours (3 days)',
    catheterRemovalHoldHours: 72,
    catheterRemovalHoldDisplay: '72 hours',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 hours post-procedure',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: 'Wait at least 6 hours post-removal',
    labMonitoringRequirements: ['Renal clearance evaluation (CrCl)'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Prophylactic 10 mg daily requires 24-48h hold; therapeutic 20 mg requires full 72h hold before neuraxial access.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'dabigatran',
    genericName: 'Dabigatran (Direct Thrombin Inhibitor)',
    brandNames: ['Pradaxa'],
    drugClass: 'DOAC',
    regimen: '110 mg or 150 mg PO BID',
    preProcedureHoldHours: 72,
    preProcedureHoldDisplay: '72 – 120 hours (CrCl dependent)',
    catheterRemovalHoldHours: 72,
    catheterRemovalHoldDisplay: '72 hours (up to 120h if renal impairment)',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 hours post-procedure',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: 'Wait at least 6 hours after pull',
    labMonitoringRequirements: ['Baseline CrCl: 72h if CrCl ≥ 80; 96h if CrCl 50-79; 120h if CrCl 30-49 mL/min'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Idarucizumab (Praxbind) is the specific reversal agent (5g IV) in emergency life-threatening bleeding or urgent surgery.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'warfarin',
    genericName: 'Warfarin',
    brandNames: ['Coumadin'],
    drugClass: 'VKA',
    regimen: 'Oral dose titrated to INR 2.0 – 3.0',
    preProcedureHoldHours: 120,
    preProcedureHoldDisplay: '5 days (120 hours) AND documented INR ≤ 1.4',
    catheterRemovalHoldHours: 120,
    catheterRemovalHoldDisplay: 'INR must be ≤ 1.4 prior to catheter pull',
    postProcedureRestartHours: 0,
    postProcedureRestartDisplay: 'May resume oral Warfarin evening of surgery after catheter pull',
    postCatheterRestartHours: 0,
    postCatheterRestartDisplay: 'Resume evening of surgery once catheter removed',
    labMonitoringRequirements: ['Documented INR ≤ 1.4 prior to needle placement or catheter removal'],
    contraindicationsWithCatheter: false,
    clinicalPearls: 'If catheter remains in place while restarting warfarin, monitor daily INR. Remove catheter when INR < 1.5; neurological checks every 2-4 hours if INR > 1.5 with catheter.',
    asraEvidenceLevel: 'Class I, Level A',
  },
  {
    id: 'clopidogrel',
    genericName: 'Clopidogrel (P2Y12 Inhibitor)',
    brandNames: ['Plavix'],
    drugClass: 'Antiplatelet',
    regimen: '75 mg PO daily',
    preProcedureHoldHours: 120,
    preProcedureHoldDisplay: '5 – 7 days (120 – 168 hours)',
    catheterRemovalHoldHours: 120,
    catheterRemovalHoldDisplay: 'Avoid maintaining catheters on Clopidogrel',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: 'Immediate post-op if needed, but DO NOT give loading dose (300/600mg)',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: '6 hours post-removal',
    labMonitoringRequirements: ['Platelet count', 'P2Y12 platelet function assay if urgent surgery'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'If urgent surgery requires surgery prior to 5 days, platelet transfusion may be required if severe bleeding occurs.',
    asraEvidenceLevel: 'Class I, Level A',
  },
  {
    id: 'ticagrelor',
    genericName: 'Ticagrelor (Reversible P2Y12)',
    brandNames: ['Brilinta'],
    drugClass: 'Antiplatelet',
    regimen: '90 mg PO BID',
    preProcedureHoldHours: 72,
    preProcedureHoldDisplay: '3 – 5 days (72 – 120 hours)',
    catheterRemovalHoldHours: 72,
    catheterRemovalHoldDisplay: '3 – 5 days',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 hours post-procedure (avoid loading dose with indwelling catheter)',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: '6 hours post-removal',
    labMonitoringRequirements: ['Platelet count'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Reversible binding; platelet function recovers faster than clopidogrel or prasugrel.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'prasugrel',
    genericName: 'Prasugrel (Potent P2Y12)',
    brandNames: ['Effient'],
    drugClass: 'Antiplatelet',
    regimen: '10 mg PO daily',
    preProcedureHoldHours: 168,
    preProcedureHoldDisplay: '7 – 10 days (168 – 240 hours)',
    catheterRemovalHoldHours: 168,
    catheterRemovalHoldDisplay: '7 – 10 days',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 hours post-procedure',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: '6 hours post-removal',
    labMonitoringRequirements: ['Platelet count'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Highest potency irreversible platelet inhibition; requires longest pre-procedure washout.',
    asraEvidenceLevel: 'Class I, Level B',
  },
  {
    id: 'aspirin_low_dose',
    genericName: 'Aspirin (Low Dose Monotherapy)',
    brandNames: ['Aspilets', 'Bayer', 'Cardioaspirin'],
    drugClass: 'Antiplatelet',
    regimen: '81 mg – 100 mg PO daily',
    preProcedureHoldHours: 0,
    preProcedureHoldDisplay: '0 hours (No hold required as monotherapy)',
    catheterRemovalHoldHours: 0,
    catheterRemovalHoldDisplay: '0 hours (Safe to pull catheter on low-dose ASA)',
    postProcedureRestartHours: 0,
    postProcedureRestartDisplay: 'Continue regular daily schedule',
    postCatheterRestartHours: 0,
    postCatheterRestartDisplay: 'Continue regular daily schedule',
    labMonitoringRequirements: ['Verify patient is NOT taking other antiplatelets, NSAIDs, or anticoagulants'],
    contraindicationsWithCatheter: false,
    clinicalPearls: 'ASRA consensus states low-dose aspirin monotherapy does NOT confer significant added risk of spinal hematoma. High dose (>325mg) or combination therapy requires individual assessment.',
    asraEvidenceLevel: 'Class I, Level A',
  },
  {
    id: 'fondaparinux',
    genericName: 'Fondaparinux (Factor Xa Inhibitor)',
    brandNames: ['Arixtra'],
    drugClass: 'Factor_Xa_Direct',
    regimen: '2.5 mg SC daily (prophylactic) or 7.5 mg daily (treatment)',
    preProcedureHoldHours: 36,
    preProcedureHoldDisplay: '36 – 42 hours (prophylactic) or 4 days (treatment)',
    catheterRemovalHoldHours: 36,
    catheterRemovalHoldDisplay: 'Strictly avoid neuraxial catheters',
    postProcedureRestartHours: 6,
    postProcedureRestartDisplay: '6 – 12 hours post-procedure',
    postCatheterRestartHours: 6,
    postCatheterRestartDisplay: 'Not applicable (catheters contraindicated)',
    labMonitoringRequirements: ['Strict renal function surveillance; half-life markedly prolonged in renal failure'],
    contraindicationsWithCatheter: true,
    clinicalPearls: 'Indwelling neuraxial catheters are strictly contraindicated with fondaparinux due to prolonged 17-21 hour half-life.',
    asraEvidenceLevel: 'Class I, Level C',
  },
];

export interface AsraEvaluationResult {
  drug: AsraDrugGuideline;
  blockType: BlockType;
  isSafeForProcedure: boolean;
  requiredPreOpWaitHours: number;
  remainingWaitHours: number;
  postOpRestartWaitHours: number;
  catheterPermitted: boolean;
  actionSummary: string;
  laboratoryRequirements: string[];
  safetyWarnings: string[];
}

export function evaluateAsraSafety(
  drugId: string,
  blockType: BlockType,
  hoursSinceLastDose: number,
  currentInr?: number,
  crClMlMin?: number
): AsraEvaluationResult {
  const drug = ASRA_DRUG_DATABASE.find((d) => d.id === drugId) || ASRA_DRUG_DATABASE[0];

  let requiredPreOpWaitHours = drug.preProcedureHoldHours;

  // Dabigatran CrCl adjustments
  if (drug.id === 'dabigatran' && crClMlMin !== undefined) {
    if (crClMlMin < 30) requiredPreOpWaitHours = 120;
    else if (crClMlMin < 50) requiredPreOpWaitHours = 96;
    else if (crClMlMin < 80) requiredPreOpWaitHours = 72;
  }

  // Superficial peripheral block modifier: compressible sites carry lower hematoma risk
  if (blockType === 'superficial') {
    // ASRA permits superficial nerve blocks with reduced intervals if benefits outweigh risks
    requiredPreOpWaitHours = Math.round(requiredPreOpWaitHours * 0.5);
  }

  const remainingWaitHours = Math.max(0, requiredPreOpWaitHours - hoursSinceLastDose);
  const isTimeSafe = remainingWaitHours === 0;

  // INR check for Warfarin
  let inrSafe = true;
  if (drug.id === 'warfarin') {
    if (currentInr !== undefined && currentInr > 1.4) {
      inrSafe = false;
    }
  }

  const isSafeForProcedure = isTimeSafe && inrSafe;
  const catheterPermitted = !drug.contraindicationsWithCatheter && blockType !== 'superficial';

  const safetyWarnings: string[] = [];

  if (!isTimeSafe) {
    safetyWarnings.push(
      `INSUFFICIENT WASHOUT: Last dose was ${hoursSinceLastDose}h ago. Mandatory ASRA hold time is ${requiredPreOpWaitHours}h (Wait another ${remainingWaitHours}h). High risk of spinal epidural hematoma.`
    );
  }

  if (drug.id === 'warfarin' && currentInr !== undefined && currentInr > 1.4) {
    safetyWarnings.push(
      `INR ELEVATED (${currentInr}): Target INR must be ≤ 1.4 prior to needle placement or catheter removal.`
    );
  }

  if (drug.contraindicationsWithCatheter && blockType === 'neuraxial') {
    safetyWarnings.push(
      `CATHETER CONTRAINDICATED: Maintaining indwelling neuraxial catheters on ${drug.genericName} is contraindicated by ASRA.`
    );
  }

  if (blockType === 'catheter_removal') {
    safetyWarnings.push(
      `CATHETER REMOVAL TIMING: Ensure at least ${drug.catheterRemovalHoldDisplay} have elapsed since previous dose. Wait at least ${drug.postCatheterRestartDisplay} after pull before next dose.`
    );
  }

  let actionSummary = '';
  if (isSafeForProcedure) {
    actionSummary = `SAFE TO PROCEED with ${blockType.replace('_', ' ').toUpperCase()}. Adequate washout interval (${hoursSinceLastDose}h elapsed vs ${requiredPreOpWaitHours}h required).`;
  } else {
    actionSummary = `DELAY PROCEDURE by ${remainingWaitHours} hours to achieve safe hemostatic competence per ASRA consensus guidelines.`;
  }

  return {
    drug,
    blockType,
    isSafeForProcedure,
    requiredPreOpWaitHours,
    remainingWaitHours,
    postOpRestartWaitHours: drug.postProcedureRestartHours,
    catheterPermitted,
    actionSummary,
    laboratoryRequirements: drug.labMonitoringRequirements,
    safetyWarnings,
  };
}
