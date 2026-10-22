/**
 * Vasoactive & Anesthetic Continuous Infusion Syringe Pump Titrator Engine
 * Benchmarked against Vargo Anesthesia and ICU/OR Standard 50 mL Syringe Formularies.
 * Computes bidirectional rate conversions between mcg/kg/min (or native unit) and pump mL/hr.
 */

export type DoseUnit = 'mcg/kg/min' | 'mcg/min' | 'units/min' | 'mg/hr' | 'mcg/kg/hr';

export interface SyringeConcentration {
  label: string;
  drugAmount: number;
  drugUnit: 'mg' | 'mcg' | 'units';
  totalVolumeMl: number;
  concentrationMcgPerMl: number; // Normalized to mcg/mL (or native unit/mL)
}

export interface InfusionProtocol {
  id: string;
  name: string;
  category: 'Vasopressor' | 'Inotrope' | 'Antihypertensive' | 'Sedative / TIVA' | 'Opioid TIVA';
  indications: string;
  doseUnit: DoseUnit;
  isWeightBased: boolean;
  minDose: number;
  maxDose: number;
  defaultDose: number;
  step: number;
  syringePresets: SyringeConcentration[];
  titrationGoals: string;
  clinicalPearls: string;
}

export const INFUSION_PROTOCOLS: InfusionProtocol[] = [
  {
    id: 'norepinephrine',
    name: 'Norepinephrine (Levophed)',
    category: 'Vasopressor',
    indications: 'Septic, cardiogenic, or vasodilatory shock; post-induction hypotension',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 0.01,
    maxDose: 0.5,
    defaultDose: 0.05,
    step: 0.01,
    syringePresets: [
      {
        label: 'Standard Syringe (4 mg / 50 mL)',
        drugAmount: 4,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 80, // 4000 mcg / 50 mL = 80 mcg/mL
      },
      {
        label: 'Double Strength (8 mg / 50 mL)',
        drugAmount: 8,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 160,
      },
      {
        label: 'Peripheral / Floor Drip (4 mg / 250 mL)',
        drugAmount: 4,
        drugUnit: 'mg',
        totalVolumeMl: 250,
        concentrationMcgPerMl: 16,
      },
    ],
    titrationGoals: 'Titrate to MAP ≥ 65 mmHg (or individualized goal). Check peripheral perfusion.',
    clinicalPearls: 'First-line vasopressor in septic shock (Surviving Sepsis Campaign). Potent alpha-1 vasoconstriction with modest beta-1 chronotropy.',
  },
  {
    id: 'epinephrine_infusion',
    name: 'Epinephrine Infusion',
    category: 'Inotrope',
    indications: 'Severe anaphylaxis, post-arrest myocardial dysfunction, refractory cardiogenic shock',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 0.01,
    maxDose: 0.3,
    defaultDose: 0.05,
    step: 0.01,
    syringePresets: [
      {
        label: 'Standard Syringe (4 mg / 50 mL)',
        drugAmount: 4,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 80,
      },
      {
        label: 'Double Strength (8 mg / 50 mL)',
        drugAmount: 8,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 160,
      },
    ],
    titrationGoals: 'Titrate to cardiac output, urine output > 0.5 mL/kg/h, and MAP ≥ 65 mmHg.',
    clinicalPearls: 'Lower doses (0.01-0.05) are predominantly beta-1/beta-2 (inotropic/bronchodilatory); higher doses (>0.1) recruit marked alpha-1 vasoconstriction.',
  },
  {
    id: 'vasopressin',
    name: 'Vasopressin (Argipressin)',
    category: 'Vasopressor',
    indications: 'Vasodilatory shock, refractory septic shock, ACE-inhibitor vasoplegia',
    doseUnit: 'units/min',
    isWeightBased: false,
    minDose: 0.01,
    maxDose: 0.04,
    defaultDose: 0.03,
    step: 0.01,
    syringePresets: [
      {
        label: 'Standard Syringe (20 units / 50 mL)',
        drugAmount: 20,
        drugUnit: 'units',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 0.4, // 0.4 units/mL
      },
      {
        label: 'High Concentration (40 units / 50 mL)',
        drugAmount: 4,
        drugUnit: 'units',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 0.8,
      },
    ],
    titrationGoals: 'Fixed dose 0.03 units/min as adjunct to reduce norepinephrine requirements.',
    clinicalPearls: 'Non-titrated fixed physiological replacement. Acts on V1 receptors; works in acidotic environments where adrenergic receptors are down-regulated.',
  },
  {
    id: 'phenylephrine_infusion',
    name: 'Phenylephrine (Neo-Synephrine)',
    category: 'Vasopressor',
    indications: 'Spinal anesthesia-induced vasodilation, tachyarrhythmic hypotension, aortic stenosis',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 0.1,
    maxDose: 2.0,
    defaultDose: 0.3,
    step: 0.1,
    syringePresets: [
      {
        label: 'Standard Syringe (10 mg / 100 mL)',
        drugAmount: 10,
        drugUnit: 'mg',
        totalVolumeMl: 100,
        concentrationMcgPerMl: 100, // 10,000 mcg / 100 mL = 100 mcg/mL
      },
      {
        label: 'High Concentration (10 mg / 50 mL)',
        drugAmount: 10,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 200,
      },
    ],
    titrationGoals: 'Maintain baseline MAP without triggering profound reflex bradycardia.',
    clinicalPearls: 'Pure alpha-1 agonist with no direct cardiac inotropic effect. Increases SVR; causes reflex vagal bradycardia.',
  },
  {
    id: 'nicardipine_infusion',
    name: 'Nicardipine (Cardene)',
    category: 'Antihypertensive',
    indications: 'Hypertensive emergency, acute stroke, perioperative emergence hypertension',
    doseUnit: 'mg/hr',
    isWeightBased: false,
    minDose: 2.5,
    maxDose: 15.0,
    defaultDose: 5.0,
    step: 2.5,
    syringePresets: [
      {
        label: 'Standard Syringe (25 mg / 50 mL)',
        drugAmount: 25,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 0.5, // 0.5 mg/mL
      },
      {
        label: 'Infusion Bag (25 mg / 250 mL)',
        drugAmount: 25,
        drugUnit: 'mg',
        totalVolumeMl: 250,
        concentrationMcgPerMl: 0.1, // 0.1 mg/mL
      },
    ],
    titrationGoals: 'Start 5 mg/hr; increase by 2.5 mg/hr q15m up to 15 mg/hr until target BP achieved.',
    clinicalPearls: 'Dihydropyridine calcium channel blocker. Selective for vascular smooth muscle with minimal negative inotropic cardiac depression.',
  },
  {
    id: 'propofol_tiva',
    name: 'Propofol 1% (TIVA / Sedation)',
    category: 'Sedative / TIVA',
    indications: 'Total Intravenous Anesthesia (TIVA), procedural ICU sedation',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 25,
    maxDose: 200,
    defaultDose: 100,
    step: 10,
    syringePresets: [
      {
        label: 'Neat 1% Syringe (500 mg / 50 mL)',
        drugAmount: 500,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 10000, // 10 mg/mL = 10,000 mcg/mL
      },
      {
        label: 'Neat 2% Syringe (1000 mg / 50 mL)',
        drugAmount: 1000,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 20000,
      },
    ],
    titrationGoals: 'Titrate to Bispectral Index (BIS) 40-60 for surgical anesthesia or RASS -2 for ICU.',
    clinicalPearls: 'Watch for Propofol Infusion Syndrome (PRIS) if dose > 4-5 mg/kg/h (>67-83 mcg/kg/min) for > 48 hours.',
  },
  {
    id: 'remifentanil_tiva',
    name: 'Remifentanil (Ultiva TIVA)',
    category: 'Opioid TIVA',
    indications: 'Surgical analgesia, rapid emergence TIVA, controlled hypotension',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 0.05,
    maxDose: 0.5,
    defaultDose: 0.15,
    step: 0.05,
    syringePresets: [
      {
        label: 'Standard Syringe (1 mg / 50 mL)',
        drugAmount: 1,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 20, // 1000 mcg / 50 mL = 20 mcg/mL
      },
      {
        label: 'Double Strength (2 mg / 50 mL)',
        drugAmount: 2,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 40,
      },
    ],
    titrationGoals: 'Titrate to hemodynamic stability during surgical stimulation; offset in 5-10 minutes.',
    clinicalPearls: 'Esterase-metabolized ultra-short-acting opioid. Context-sensitive half-time remains 3-5 min regardless of infusion duration. Transition to longer-acting opioid prior to emergence.',
  },
  {
    id: 'dexmedetomidine',
    name: 'Dexmedetomidine (Precedex)',
    category: 'Sedative / TIVA',
    indications: 'Non-intubated procedural sedation, awake fiberoptic intubation, ICU weaning',
    doseUnit: 'mcg/kg/hr',
    isWeightBased: true,
    minDose: 0.2,
    maxDose: 1.4,
    defaultDose: 0.5,
    step: 0.1,
    syringePresets: [
      {
        label: 'Standard Syringe (200 mcg / 50 mL)',
        drugAmount: 200,
        drugUnit: 'mcg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 4, // 4 mcg/mL
      },
      {
        label: 'Double Strength (400 mcg / 50 mL)',
        drugAmount: 400,
        drugUnit: 'mcg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 8,
      },
    ],
    titrationGoals: 'Cooperative sedation with preserved spontaneous respiratory drive.',
    clinicalPearls: 'Alpha-2 adrenergic agonist. Produces "cooperative sedation" without respiratory depression. High doses cause bradycardia and biphasic blood pressure changes.',
  },
  {
    id: 'dopamine_infusion',
    name: 'Dopamine Infusion',
    category: 'Inotrope',
    indications: 'Symptomatic bradycardia refractory to atropine, cardiogenic shock with bradycardia',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 2.0,
    maxDose: 20.0,
    defaultDose: 5.0,
    step: 1.0,
    syringePresets: [
      {
        label: 'Standard Syringe (200 mg / 50 mL)',
        drugAmount: 200,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 4000, // 200,000 mcg / 50 mL = 4,000 mcg/mL
      },
    ],
    titrationGoals: 'Low dose (2-5) dopaminergic; Medium (5-10) beta-1 inotropic; High (10-20) alpha-1.',
    clinicalPearls: 'ACLS second-line agent for unstable bradycardia (2-20 mcg/kg/min) after atropine.',
  },
  {
    id: 'dobutamine_infusion',
    name: 'Dobutamine Infusion',
    category: 'Inotrope',
    indications: 'Acute decompensated heart failure, low-output cardiogenic shock, stress echo',
    doseUnit: 'mcg/kg/min',
    isWeightBased: true,
    minDose: 2.5,
    maxDose: 20.0,
    defaultDose: 5.0,
    step: 2.5,
    syringePresets: [
      {
        label: 'Standard Syringe (250 mg / 50 mL)',
        drugAmount: 250,
        drugUnit: 'mg',
        totalVolumeMl: 50,
        concentrationMcgPerMl: 5000, // 250,000 mcg / 50 mL = 5,000 mcg/mL
      },
    ],
    titrationGoals: 'Increase cardiac index > 2.2 L/min/m² without precipitating severe tachycardia.',
    clinicalPearls: 'Synthetic catecholamine with predominantly beta-1 and mild beta-2 agonism. Potent inotrope with mild vasodilation (inodilator).',
  },
];

export interface InfusionCalculationResult {
  protocol: InfusionProtocol;
  syringe: SyringeConcentration;
  dose: number;
  rateMlHr: number;
  weightKg: number;
  calculationFormula: string;
  titrationSteps: { dose: number; rateMlHr: number }[];
}

export function calculateInfusionRate(
  protocolId: string,
  dose: number,
  weightKg: number,
  syringeIndex = 0
): InfusionCalculationResult {
  const protocol = INFUSION_PROTOCOLS.find((p) => p.id === protocolId) || INFUSION_PROTOCOLS[0];
  const syringe = protocol.syringePresets[syringeIndex] || protocol.syringePresets[0];

  const w = Math.max(1, weightKg);
  let rateMlHr = 0;
  let calculationFormula = '';

  if (protocol.doseUnit === 'mcg/kg/min') {
    // Rate (mL/hr) = [Dose (mcg/kg/min) * Weight (kg) * 60 min/hr] / Concentration (mcg/mL)
    rateMlHr = (dose * w * 60) / syringe.concentrationMcgPerMl;
    calculationFormula = `(${dose} mcg/kg/min × ${w} kg × 60) ÷ ${syringe.concentrationMcgPerMl} mcg/mL = ${rateMlHr.toFixed(2)} mL/hr`;
  } else if (protocol.doseUnit === 'mcg/kg/hr') {
    // Rate (mL/hr) = [Dose (mcg/kg/hr) * Weight (kg)] / Concentration (mcg/mL)
    rateMlHr = (dose * w) / syringe.concentrationMcgPerMl;
    calculationFormula = `(${dose} mcg/kg/hr × ${w} kg) ÷ ${syringe.concentrationMcgPerMl} mcg/mL = ${rateMlHr.toFixed(2)} mL/hr`;
  } else if (protocol.doseUnit === 'units/min') {
    // Rate (mL/hr) = [Dose (units/min) * 60 min/hr] / Concentration (units/mL)
    rateMlHr = (dose * 60) / syringe.concentrationMcgPerMl;
    calculationFormula = `(${dose} units/min × 60) ÷ ${syringe.concentrationMcgPerMl} units/mL = ${rateMlHr.toFixed(2)} mL/hr`;
  } else if (protocol.doseUnit === 'mg/hr') {
    // Rate (mL/hr) = Dose (mg/hr) / Concentration (mg/mL)
    rateMlHr = dose / syringe.concentrationMcgPerMl;
    calculationFormula = `${dose} mg/hr ÷ ${syringe.concentrationMcgPerMl} mg/mL = ${rateMlHr.toFixed(2)} mL/hr`;
  }

  // Generate 6-step titration table across dose range
  const numSteps = 6;
  const stepSize = (protocol.maxDose - protocol.minDose) / (numSteps - 1);
  const titrationSteps: { dose: number; rateMlHr: number }[] = [];

  for (let i = 0; i < numSteps; i++) {
    const stepDose = parseFloat((protocol.minDose + i * stepSize).toFixed(3));
    let stepRate = 0;
    if (protocol.doseUnit === 'mcg/kg/min') {
      stepRate = (stepDose * w * 60) / syringe.concentrationMcgPerMl;
    } else if (protocol.doseUnit === 'mcg/kg/hr') {
      stepRate = (stepDose * w) / syringe.concentrationMcgPerMl;
    } else if (protocol.doseUnit === 'units/min') {
      stepRate = (stepDose * 60) / syringe.concentrationMcgPerMl;
    } else if (protocol.doseUnit === 'mg/hr') {
      stepRate = stepDose / syringe.concentrationMcgPerMl;
    }
    titrationSteps.push({
      dose: stepDose,
      rateMlHr: parseFloat(stepRate.toFixed(2)),
    });
  }

  return {
    protocol,
    syringe,
    dose,
    rateMlHr: parseFloat(rateMlHr.toFixed(2)),
    weightKg: w,
    calculationFormula,
    titrationSteps,
  };
}

export function calculateDoseFromRate(
  protocolId: string,
  rateMlHr: number,
  weightKg: number,
  syringeIndex = 0
): number {
  const protocol = INFUSION_PROTOCOLS.find((p) => p.id === protocolId) || INFUSION_PROTOCOLS[0];
  const syringe = protocol.syringePresets[syringeIndex] || protocol.syringePresets[0];
  const w = Math.max(1, weightKg);

  if (protocol.doseUnit === 'mcg/kg/min') {
    // Dose = [Rate (mL/hr) * Concentration (mcg/mL)] / [Weight (kg) * 60]
    return parseFloat(((rateMlHr * syringe.concentrationMcgPerMl) / (w * 60)).toFixed(3));
  } else if (protocol.doseUnit === 'mcg/kg/hr') {
    return parseFloat(((rateMlHr * syringe.concentrationMcgPerMl) / w).toFixed(2));
  } else if (protocol.doseUnit === 'units/min') {
    return parseFloat(((rateMlHr * syringe.concentrationMcgPerMl) / 60).toFixed(3));
  } else if (protocol.doseUnit === 'mg/hr') {
    return parseFloat((rateMlHr * syringe.concentrationMcgPerMl).toFixed(2));
  }
  return 0;
}
