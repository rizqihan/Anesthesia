/**
 * Pediatric Growth Standards, Neonatal Vital Sign Norms & Scoring Engines
 * Grounded in World Health Organization (WHO) Child Growth Standards,
 * American Academy of Pediatrics (AAP), and Neonatal Resuscitation Program (NRP).
 */

export interface WhoGrowthResult {
  zScore: number;
  percentile: number;
  classification: string;
  color: string;
}

// Representative WHO LMS Median and SD references for 0–60 months
// Simplified piecewise linear interpolation for boys and girls
const WHO_MEDIANS = {
  weightBoys: [
    { m: 0, med: 3.3, sd: 0.5 },
    { m: 6, med: 7.9, sd: 0.8 },
    { m: 12, med: 9.6, sd: 1.0 },
    { m: 24, med: 12.2, sd: 1.3 },
    { m: 36, med: 14.3, sd: 1.6 },
    { m: 48, med: 16.3, sd: 1.9 },
    { m: 60, med: 18.3, sd: 2.2 },
  ],
  weightGirls: [
    { m: 0, med: 3.2, sd: 0.5 },
    { m: 6, med: 7.3, sd: 0.8 },
    { m: 12, med: 8.9, sd: 1.0 },
    { m: 24, med: 11.5, sd: 1.3 },
    { m: 36, med: 13.9, sd: 1.6 },
    { m: 48, med: 16.1, sd: 1.9 },
    { m: 60, med: 18.2, sd: 2.2 },
  ],
  heightBoys: [
    { m: 0, med: 49.9, sd: 1.9 },
    { m: 6, med: 67.6, sd: 2.3 },
    { m: 12, med: 75.7, sd: 2.6 },
    { m: 24, med: 87.1, sd: 3.2 },
    { m: 36, med: 96.1, sd: 3.6 },
    { m: 48, med: 103.3, sd: 4.0 },
    { m: 60, med: 110.0, sd: 4.4 },
  ],
  heightGirls: [
    { m: 0, med: 49.1, sd: 1.9 },
    { m: 6, med: 65.7, sd: 2.3 },
    { m: 12, med: 74.0, sd: 2.6 },
    { m: 24, med: 85.7, sd: 3.2 },
    { m: 36, med: 95.1, sd: 3.6 },
    { m: 48, med: 102.7, sd: 4.0 },
    { m: 60, med: 109.4, sd: 4.4 },
  ],
  bmiBoys: [
    { m: 0, med: 13.4, sd: 1.1 },
    { m: 6, med: 17.3, sd: 1.2 },
    { m: 12, med: 16.8, sd: 1.1 },
    { m: 24, med: 16.0, sd: 1.0 },
    { m: 36, med: 15.6, sd: 1.0 },
    { m: 48, med: 15.3, sd: 1.0 },
    { m: 60, med: 15.2, sd: 1.1 },
  ],
  bmiGirls: [
    { m: 0, med: 13.3, sd: 1.1 },
    { m: 6, med: 16.9, sd: 1.2 },
    { m: 12, med: 16.3, sd: 1.1 },
    { m: 24, med: 15.7, sd: 1.0 },
    { m: 36, med: 15.4, sd: 1.0 },
    { m: 48, med: 15.2, sd: 1.0 },
    { m: 60, med: 15.2, sd: 1.1 },
  ],
};

function interpolateMedianSd(
  table: { m: number; med: number; sd: number }[],
  ageMonths: number
): { med: number; sd: number } {
  const m = Math.max(0, Math.min(60, ageMonths));
  for (let i = 0; i < table.length - 1; i++) {
    if (m >= table[i].m && m <= table[i + 1].m) {
      const frac = (m - table[i].m) / (table[i + 1].m - table[i].m);
      const med = table[i].med + frac * (table[i + 1].med - table[i].med);
      const sd = table[i].sd + frac * (table[i + 1].sd - table[i].sd);
      return { med, sd };
    }
  }
  return table[table.length - 1];
}

function zScoreToPercentile(z: number): number {
  // Approximate standard normal CDF using error function approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  return +(p * 100).toFixed(1);
}

export function calculateWhoGrowth(
  metric: 'weight' | 'height' | 'bmi',
  ageMonths: number,
  value: number,
  sex: 'M' | 'F'
): WhoGrowthResult {
  let table: { m: number; med: number; sd: number }[];

  if (metric === 'weight') {
    table = sex === 'M' ? WHO_MEDIANS.weightBoys : WHO_MEDIANS.weightGirls;
  } else if (metric === 'height') {
    table = sex === 'M' ? WHO_MEDIANS.heightBoys : WHO_MEDIANS.heightGirls;
  } else {
    table = sex === 'M' ? WHO_MEDIANS.bmiBoys : WHO_MEDIANS.bmiGirls;
  }

  const { med, sd } = interpolateMedianSd(table, ageMonths);
  const zScore = +((value - med) / sd).toFixed(2);
  const percentile = zScoreToPercentile(zScore);

  let classification = 'Normal growth';
  let color = '#34d399'; // Emerald

  if (zScore < -3) {
    classification = metric === 'height' ? 'Severely stunted' : 'Severely wasted / underweight (< -3 SD)';
    color = '#f43f5e'; // Rose
  } else if (zScore < -2) {
    classification = metric === 'height' ? 'Stunted' : 'Underweight / Wasted (-2 to -3 SD)';
    color = '#fbbf24'; // Amber
  } else if (zScore > 3) {
    classification = metric === 'height' ? 'Very tall' : 'Obese (> +3 SD)';
    color = '#f43f5e';
  } else if (zScore > 2) {
    classification = metric === 'height' ? 'Tall' : 'Overweight (+2 to +3 SD)';
    color = '#fbbf24';
  } else if (zScore > 1) {
    classification = metric === 'height' ? 'Above average' : 'Possible risk of overweight (+1 to +2 SD)';
    color = '#38bdf8';
  }

  return { zScore, percentile, classification, color };
}

// =========================================================================
// 2. AGE-STRATIFIED PEDIATRIC & NEONATAL VITAL SIGN NORMS
// =========================================================================

export interface VitalSignNorm {
  id: string;
  stageName: string;
  ageRange: string;
  hrAwake: string;
  hrSleep: string;
  rrRange: string;
  sbpRange: string;
  dbpRange: string;
  hypotensionThresholdSbp: string;
  temperatureRange: string;
}

export const PEDIATRIC_VITAL_NORMS: VitalSignNorm[] = [
  {
    id: 'preterm',
    stageName: 'Preterm Neonate',
    ageRange: '< 37 weeks gestational age',
    hrAwake: '120–170 bpm',
    hrSleep: '100–160 bpm',
    rrRange: '40–70 breaths/min',
    sbpRange: '45–60 mmHg',
    dbpRange: '25–35 mmHg',
    hypotensionThresholdSbp: 'MAP < Gestational age (weeks) or SBP < 45',
    temperatureRange: '36.5–37.5 °C',
  },
  {
    id: 'term_neonate',
    stageName: 'Term Neonate',
    ageRange: '0–28 days',
    hrAwake: '100–180 bpm',
    hrSleep: '80–160 bpm',
    rrRange: '30–60 breaths/min',
    sbpRange: '60–90 mmHg',
    dbpRange: '30–60 mmHg',
    hypotensionThresholdSbp: 'SBP < 60 mmHg',
    temperatureRange: '36.5–37.5 °C',
  },
  {
    id: 'infant',
    stageName: 'Infant',
    ageRange: '1–12 months',
    hrAwake: '100–160 bpm',
    hrSleep: '75–150 bpm',
    rrRange: '30–50 breaths/min',
    sbpRange: '70–100 mmHg',
    dbpRange: '45–65 mmHg',
    hypotensionThresholdSbp: 'SBP < 70 mmHg',
    temperatureRange: '36.5–37.5 °C',
  },
  {
    id: 'toddler',
    stageName: 'Toddler',
    ageRange: '1–3 years',
    hrAwake: '90–150 bpm',
    hrSleep: '70–140 bpm',
    rrRange: '24–40 breaths/min',
    sbpRange: '80–105 mmHg',
    dbpRange: '50–70 mmHg',
    hypotensionThresholdSbp: 'SBP < 70 + (2 × age in years) mmHg',
    temperatureRange: '36.5–37.5 °C',
  },
  {
    id: 'preschool',
    stageName: 'Preschooler',
    ageRange: '3–5 years',
    hrAwake: '80–140 bpm',
    hrSleep: '60–120 bpm',
    rrRange: '20–30 breaths/min',
    sbpRange: '85–110 mmHg',
    dbpRange: '55–75 mmHg',
    hypotensionThresholdSbp: 'SBP < 70 + (2 × age in years) mmHg',
    temperatureRange: '36.5–37.5 °C',
  },
  {
    id: 'school_age',
    stageName: 'School-Age Child',
    ageRange: '6–11 years',
    hrAwake: '70–120 bpm',
    hrSleep: '60–100 bpm',
    rrRange: '18–25 breaths/min',
    sbpRange: '95–120 mmHg',
    dbpRange: '60–80 mmHg',
    hypotensionThresholdSbp: 'SBP < 70 + (2 × age in years) mmHg',
    temperatureRange: '36.5–37.5 °C',
  },
  {
    id: 'adolescent',
    stageName: 'Adolescent',
    ageRange: '12–18 years',
    hrAwake: '60–100 bpm',
    hrSleep: '50–90 bpm',
    rrRange: '12–20 breaths/min',
    sbpRange: '110–135 mmHg',
    dbpRange: '65–85 mmHg',
    hypotensionThresholdSbp: 'SBP < 90 mmHg',
    temperatureRange: '36.5–37.5 °C',
  },
];

// =========================================================================
// 3. NEONATAL APGAR SCORE (1 & 5 Minutes)
// =========================================================================

export interface ApgarScoreInput {
  appearance: 0 | 1 | 2; // Color
  pulse: 0 | 1 | 2; // Heart rate
  grimace: 0 | 1 | 2; // Reflex irritability
  activity: 0 | 1 | 2; // Muscle tone
  respiration: 0 | 1 | 2; // Respiratory effort
}

export interface ApgarScoreResult {
  totalScore: number;
  category: 'normal' | 'moderate_depression' | 'severe_depression';
  interpretation: string;
  actionGuidance: string;
  color: string;
}

export function calculateApgarScore(input: ApgarScoreInput): ApgarScoreResult {
  const totalScore =
    input.appearance + input.pulse + input.grimace + input.activity + input.respiration;

  if (totalScore >= 7) {
    return {
      totalScore,
      category: 'normal',
      interpretation: 'Normal vigorous neonate (Score 7–10)',
      actionGuidance: 'Routine supportive care, warm, clear airway as needed, promote skin-to-skin contact.',
      color: '#34d399',
    };
  } else if (totalScore >= 4) {
    return {
      totalScore,
      category: 'moderate_depression',
      interpretation: 'Moderately depressed (Score 4–6)',
      actionGuidance: 'Provide warmth, stimulate, position airway, consider supplemental O2 or CPAP if persistent cyanosis/grunting. Re-evaluate closely at 5 and 10 minutes.',
      color: '#fbbf24',
    };
  } else {
    return {
      totalScore,
      category: 'severe_depression',
      interpretation: 'Severely depressed / Imminent asphyxia (Score 0–3)',
      actionGuidance: 'IMMEDIATE RESUSCITATION (NRP protocol): Positive pressure ventilation (PPV), heart rate check. If HR < 60 bpm after 30s effective PPV, initiate chest compressions and IV epinephrine.',
      color: '#f43f5e',
    };
  }
}

// =========================================================================
// 4. SILVERMAN-ANDERSON RESPIRATORY DISTRESS INDEX
// =========================================================================

export interface SilvermanScoreInput {
  upperChest: 0 | 1 | 2; // Synchronized, lag on inspiration, see-saw
  lowerChest: 0 | 1 | 2; // None, just visible, marked
  xiphoidRetraction: 0 | 1 | 2; // None, just visible, marked
  naresDilatation: 0 | 1 | 2; // None, minimal, marked
  expiratoryGrunt: 0 | 1 | 2; // None, audible with stethoscope, audible with naked ear
}

export interface SilvermanScoreResult {
  totalScore: number;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  interpretation: string;
  clinicalAction: string;
  color: string;
}

export function calculateSilvermanScore(input: SilvermanScoreInput): SilvermanScoreResult {
  const totalScore =
    input.upperChest +
    input.lowerChest +
    input.xiphoidRetraction +
    input.naresDilatation +
    input.expiratoryGrunt;

  if (totalScore === 0) {
    return {
      totalScore,
      severity: 'none',
      interpretation: 'No respiratory distress (Score 0)',
      clinicalAction: 'Routine observation; no ventilatory support required.',
      color: '#34d399',
    };
  } else if (totalScore <= 3) {
    return {
      totalScore,
      severity: 'mild',
      interpretation: 'Mild respiratory distress (Score 1–3)',
      clinicalAction: 'Provide supplemental humidified oxygen; monitor SpO2 continuously. Consider early nasal CPAP if work of breathing increases.',
      color: '#38bdf8',
    };
  } else if (totalScore <= 6) {
    return {
      totalScore,
      severity: 'moderate',
      interpretation: 'Moderate respiratory distress (Score 4–6)',
      clinicalAction: 'Initiate Bubble CPAP / High-Flow Nasal Cannula (HFNC). Check blood gas (capillary/arterial). Prepare for surfactant administration if preterm RDS.',
      color: '#fbbf24',
    };
  } else {
    return {
      totalScore,
      severity: 'severe',
      interpretation: 'Severe respiratory distress / Impending respiratory failure (Score 7–10)',
      clinicalAction: 'URGENT INTUBATION and invasive mechanical ventilation indicated. Assess for tension pneumothorax or congenital diaphragmatic hernia.',
      color: '#f43f5e',
    };
  }
}
