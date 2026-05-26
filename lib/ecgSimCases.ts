// 12-Lead ECG Simulation Cases & Path Generator
// Highly realistic clinical data and waveform configurations for 15 cardiac cases.

export interface LeadConfig {
  pAmp?: number;          // Normal: -2 to -4 (negative is upward in SVG where y increases downward)
  prLength?: number;      // Normal: 30 px
  qDepth?: number;        // Normal: 2 to 4 px (positive is downward)
  rAmp?: number;          // Normal: -30 to -50 px (negative is upward)
  sDepth?: number;        // Normal: 6 to 12 px (positive is downward)
  qrsWidthMultiplier?: number; // Normal: 1.0 (LBBB/RBBB/VT/Hyperkalemia will increase this)
  stElevation?: number;   // Normal: 0. Positive is ST elevation (curves upward), negative is depression
  tAmp?: number;          // Normal: -6 to -10 px (negative is upward)
  tWidth?: number;        // Normal: 12 to 18 px
  isNotchedR?: boolean;   // LBBB Notch
  deltaWave?: boolean;    // WPW slurred upstroke
  rSRPrime?: boolean;     // RBBB bunny ears
  s1q3t3?: 'S1' | 'Q3' | 'T3' | 'none'; // Pulmonary embolism specific markers
}

export interface ECGSimCase {
  id: string;
  title: { en: string; id: string };
  clinicalScenario: { en: string; id: string };
  diagnosis: { en: string; id: string };
  keyFindings: { en: string[]; id: string[] };
  heartRate: number;
  rhythm: { en: string; id: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'acs' | 'arrhythmia' | 'conduction' | 'emergency' | 'structural';
  leadConfigs: { [leadName: string]: LeadConfig };
}

// ─── Programmatic Static Waveform Path Generator ───
// Generates a highly accurate SVG path 'd' string representing 2.5 seconds of ECG trace.
// Baseline is mid-height, Calibration pulse (1mV high, 0.2s wide) is rendered on the left.
export function generateECGPath(
  width: number,
  height: number,
  caseItem: ECGSimCase,
  leadName: string
): string {
  const mid = height / 2;
  const config: LeadConfig = caseItem.leadConfigs[leadName] || {};
  const HR = caseItem.heartRate;
  
  // Default values
  const pAmp = config.pAmp !== undefined ? config.pAmp : -3;
  const prLength = config.prLength !== undefined ? config.prLength : 30;
  const qDepth = config.qDepth !== undefined ? config.qDepth : 2;
  const rAmp = config.rAmp !== undefined ? config.rAmp : -35;
  const sDepth = config.sDepth !== undefined ? config.sDepth : 8;
  const qrsWidthMult = config.qrsWidthMultiplier !== undefined ? config.qrsWidthMultiplier : 1.0;
  const stElevation = config.stElevation !== undefined ? config.stElevation : 0;
  const tAmp = config.tAmp !== undefined ? config.tAmp : -8;
  const tWidth = config.tWidth !== undefined ? config.tWidth : 14;

  // Calibration pulse parameters at the start
  const calStart = 15;
  const calWidth = 20;
  const calHeight = -30; // 10mm = 1mV calibration

  // Plot variables
  let d = `M 0 ${mid}`;
  const points: { x: number; y: number }[] = [];

  // 1. Generate PQRST cycle centers
  let qrsPositions: number[] = [];
  const startX = 55; // Leave space for calibration pulse
  const usableWidth = width - startX;

  if (caseItem.id === 'atrial_fibrillation') {
    // Irregular spacing for AFib
    qrsPositions = [startX + 30, startX + 95, startX + 135, startX + 210, startX + 255, startX + 335, startX + 380];
  } else if (caseItem.id === 'complete_heart_block') {
    // Escape rhythm is slow and regular: ~40 bpm
    qrsPositions = [startX + 60, startX + 220, startX + 380];
  } else if (caseItem.id === 'ventricular_tachycardia' || caseItem.id === 'svt') {
    // Tachycardias have many closely spaced cycles
    const step = caseItem.id === 'ventricular_tachycardia' ? 38 : 34;
    for (let x = startX + 20; x < width - 10; x += step) {
      qrsPositions.push(x);
    }
  } else {
    // Regular rhythm based on HR
    // Spacing formula: approx cycle width in pixels
    const cycleSpacing = Math.max(40, (60 / HR) * 180);
    for (let x = startX + 30; x < width - 10; x += cycleSpacing) {
      qrsPositions.push(x);
    }
  }

  // Pre-calculate CHB independent P-wave positions
  const chbPPositions: number[] = [];
  if (caseItem.id === 'complete_heart_block') {
    // P waves march regularly at ~75 bpm (independent of QRS)
    for (let x = startX + 15; x < width; x += 65) {
      chbPPositions.push(x);
    }
  }

  // 2. Compute y-value for each x-coordinate
  for (let x = 0; x < width; x++) {
    let y = mid;

    // A. Calibration Pulse
    if (x >= calStart && x < calStart + calWidth) {
      y += calHeight;
    } else if (x === calStart || x === calStart + calWidth) {
      // Draw vertical line for square pulse
      y = mid;
    } 
    // B. ECG Waveform Tracing
    else if (x >= startX) {
      // Global baseline noise / arrhythmia oscillations
      if (caseItem.id === 'atrial_fibrillation') {
        // Chaotic baseline
        y += Math.sin(x * 0.9) * 2.0 + Math.cos(x * 1.8) * 1.0;
      } else if (caseItem.id === 'atrial_flutter') {
        // Continuous sawtooth waves: 24 pixels period, 6 px amplitude
        const fPeriod = 24;
        const phase = x % fPeriod;
        const sawtooth = (phase / fPeriod) * 10 - 5;
        // Sawtooth flutter is prominent in inferior leads & V1, less so elsewhere
        const scale = ['II', 'III', 'aVF', 'V1'].includes(leadName) ? 1.2 : 0.4;
        y += sawtooth * scale;
      }

      // Add independent P waves for Complete Heart Block
      if (caseItem.id === 'complete_heart_block') {
        for (const pPos of chbPPositions) {
          if (x >= pPos - 12 && x <= pPos + 12) {
            const dx = x - pPos;
            y += pAmp * Math.exp(-Math.pow(dx / 5, 2));
          }
        }
      }

      // Process each P-QRS-T complex
      for (const qPos of qrsPositions) {
        // 1. P Wave (skip in AFib, AFlutter, VT, SVT, and CHB because CHB is handled separately)
        const hasNormalP = !['atrial_fibrillation', 'atrial_flutter', 'ventricular_tachycardia', 'svt', 'complete_heart_block'].includes(caseItem.id);
        if (hasNormalP) {
          const pPos = qPos - prLength;
          if (x >= pPos - 12 && x <= pPos + 12) {
            const dx = x - pPos;
            y += pAmp * Math.exp(-Math.pow(dx / 5.5, 2));
          }
        }

        // 2. QRS Complex
        const qrsHalfWidth = 12 * qrsWidthMult;
        if (x >= qPos - qrsHalfWidth && x <= qPos + qrsHalfWidth) {
          const dx = x - qPos;

          if (config.rSRPrime) {
            // RBBB bunny ears (rSR' pattern)
            if (dx >= -8 && dx < -4) {
              y += (dx + 8) * -2; // small r
            } else if (dx >= -4 && dx < 0) {
              y += 12 + dx * 3; // S wave dip
            } else if (dx >= 0 && dx <= 5) {
              y += (dx - 0) * (rAmp / 4); // tall R'
            } else {
              y += 8 - dx * 1.5;
            }
          } else if (config.isNotchedR) {
            // LBBB notched broad QRS
            const notch = 1 - 0.25 * Math.exp(-Math.pow(dx / 2.5, 2));
            y += rAmp * Math.exp(-Math.pow(dx / (7 * qrsWidthMult), 2)) * notch;
          } else if (config.deltaWave) {
            // WPW Delta wave slurred upstroke
            if (dx >= -15 && dx < -5) {
              const fraction = (dx + 15) / 10;
              y += (rAmp * 0.3) * fraction;
            } else if (dx >= -5 && dx <= 5) {
              y += rAmp * Math.exp(-Math.pow(dx / 3.5, 2)) + (rAmp * 0.1);
            }
          } else {
            // Standard QRS
            // Q wave
            if (dx >= -6 && dx < -2) {
              const frac = (dx + 6) / 4;
              y += qDepth * frac;
            }
            // R wave
            else if (dx >= -2 && dx <= 2) {
              y += rAmp * Math.exp(-Math.pow(dx / 1.5, 2));
            }
            // S wave
            else if (dx > 2 && dx <= 8) {
              const frac = (8 - dx) / 6;
              y += sDepth * frac;
            }
          }
        }

        // 3. ST Segment Elevation/Depression & T Wave
        // ST/T starts around qPos + 10 and ends at qPos + 75
        const stStart = qPos + 8;
        const tPos = qPos + 44 * (caseItem.id === 'long_qt' ? 1.6 : 1.0); // Prolonged QT shifts T wave late

        if (x >= stStart && x <= qPos + 85) {
          const dxT = x - tPos;
          const dxST = x - stStart;

          // A. ST Segment baseline deviation
          let stOffset = 0;
          if (x < tPos - 10) {
            // Linear transition from J-point elevation to T wave baseline
            const progress = dxST / (tPos - 10 - stStart);
            stOffset = stElevation * (1 - progress * 0.4);
          } else {
            // Fade out ST offset as we go through T wave
            const progress = Math.min(1, (x - (tPos - 10)) / 40);
            stOffset = stElevation * 0.6 * (1 - progress);
          }

          // B. T Wave
          let currentTWidth = tWidth;
          if (caseItem.id === 'long_qt') {
            currentTWidth = tWidth * 2.2; // Broad flat T wave
          } else if (caseItem.id === 'hyperkalemia_severe') {
            currentTWidth = tWidth * 0.7; // Peaked narrow-based T wave
          }

          const tWaveVal = tAmp * Math.exp(-Math.pow(dxT / currentTWidth, 2));

          y += stOffset + tWaveVal;
        }
      }
    }

    points.push({ x, y });
  }

  // Convert points array to SVG path
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    // Clamp Y to prevent clipping issues, although pink grid takes full height
    const clampedY = Math.max(2, Math.min(height - 2, pt.y));
    if (i === 0) {
      d = `M ${pt.x} ${clampedY}`;
    } else {
      // Connect vertical lines at calibration boundaries cleanly
      if (pt.x === calStart || pt.x === calStart + calWidth) {
        d += ` L ${pt.x} ${clampedY}`;
      } else {
        d += ` L ${pt.x} ${clampedY}`;
      }
    }
  }

  return d;
}

// ─── 15 Detailed Case Databases ───
export const ECG_SIM_CASES: ECGSimCase[] = [
  {
    id: 'anterior_stemi',
    title: {
      en: 'Case 1: Severe Crushing Chest Pain',
      id: 'Kasus 1: Nyeri Dada Berat Menekan'
    },
    difficulty: 'beginner',
    category: 'acs',
    heartRate: 85,
    rhythm: { en: 'Sinus Rhythm', id: 'Irama Sinus' },
    clinicalScenario: {
      en: 'A 55-year-old male with history of hypertension and heavy smoking presents to the ED with 45 minutes of acute, crushing sub-sternal chest pain radiating to his left shoulder and jaw. He is diaphoretic, anxious, and holds his fist to his chest (Levine\'s sign). Vitals: BP 142/90 mmHg, RR 20 bpm, SpO2 94% on room air.',
      id: 'Pria 55 tahun dengan riwayat hipertensi dan perokok berat datang ke UGD dengan nyeri dada sub-sternal akut yang menjalar ke bahu kiri dan rahang sejak 45 menit lalu. Dia tampak berkeringat dingin, cemas, dan mengepalkan tangan di dada (tanda Levine). Tanda vital: TD 142/90 mmHg, RR 20x/menit, SpO2 94% udara bebas.'
    },
    diagnosis: {
      en: 'Acute Anterior STEMI (LAD Occlusion)',
      id: 'STEMI Anterior Akut (Oklusi LAD)'
    },
    keyFindings: {
      en: [
        'Significant J-point ST-segment elevation in precordial leads V1-V4 (Tombstone pattern in V2-V3).',
        'Reciprocal ST-segment depression in inferior leads II, III, and aVF (most prominent in III).',
        'Hyperacute T waves in leads V2-V4 indicating early, acute occlusion.',
        'Loss of precordial R-wave progression.'
      ],
      id: [
        'Elevasi segmen ST titik J yang signifikan di sadapan prekordial V1-V4 (pola Tombstone di V2-V3).',
        'Depresi segmen ST resiprokal di sadapan inferior II, III, dan aVF (paling menonjol di III).',
        'Gelombang T hiperakut di sadapan V2-V4 menandakan oklusi akut awal.',
        'Hilangnya progresi gelombang R prekordial.'
      ]
    },
    leadConfigs: {
      // Precordial leads show STEMI ST elevation
      V1: { stElevation: -8, tAmp: -12 },
      V2: { stElevation: -24, tAmp: -20, rAmp: -20, sDepth: 18 },
      V3: { stElevation: -22, tAmp: -18, rAmp: -22, sDepth: 16 },
      V4: { stElevation: -12, tAmp: -14 },
      V5: { stElevation: -2, tAmp: -8 },
      V6: { stElevation: 0, tAmp: -6 },
      // Inferior leads show reciprocal depression
      II: { stElevation: 6, tAmp: 4 },
      III: { stElevation: 12, tAmp: 6, rAmp: -15, sDepth: 12 },
      aVF: { stElevation: 8, tAmp: 4, rAmp: -18, sDepth: 10 },
      // Lateral leads
      I: { stElevation: 0, tAmp: -5 },
      aVL: { stElevation: -2, tAmp: -6 },
      aVR: { stElevation: 3, tAmp: 3 }
    }
  },
  {
    id: 'inferior_stemi',
    title: {
      en: 'Case 2: Nausea and Epigastric Burning',
      id: 'Kasus 2: Mual dan Nyeri Epigastrium Terbakar'
    },
    difficulty: 'beginner',
    category: 'acs',
    heartRate: 58,
    rhythm: { en: 'Sinus Bradycardia', id: 'Bradikardia Sinus' },
    clinicalScenario: {
      en: 'A 68-year-old female presents with acute epigastric burning pain, severe nausea, and vomiting starting 2 hours ago. She initially mistook it for "indigestion" and took antacids, which did not help. She appears pale and cold. Vitals: BP 90/58 mmHg, HR 58 bpm, RR 16 bpm, SpO2 96%.',
      id: 'Wanita 68 tahun datang dengan nyeri ulu hati terbakar akut, mual hebat, dan muntah sejak 2 jam lalu. Dia mengira itu "salah cerna" dan meminum antasida yang tidak meredakan keluhan. Dia tampak pucat dan dingin. Tanda vital: TD 90/58 mmHg, Nadi 58x/menit, RR 16x/menit, SpO2 96%.'
    },
    diagnosis: {
      en: 'Acute Inferior STEMI (RCA Occlusion) with Right Ventricular Involvement',
      id: 'STEMI Inferior Akut (Oklusi RCA) dengan Keterlibatan Ventrikel Kanan'
    },
    keyFindings: {
      en: [
        'Significant ST elevation in inferior leads II, III, and aVF.',
        'ST elevation in III > II, strongly suggestive of Right Coronary Artery (RCA) occlusion.',
        'Reciprocal ST depression in lateral leads I and aVL (classic reciprocal mirror image).',
        'Sinus bradycardia and borderline hypotension due to increased vagal tone (common in RCA/inferior infarction).'
      ],
      id: [
        'Elevasi ST yang signifikan di sadapan inferior II, III, dan aVF.',
        'Elevasi ST di III > II, sangat mendukung diagnosis oklusi Arteri Koroner Kanan (RCA).',
        'Depresi ST resiprokal di sadapan lateral I dan aVL (gambaran cermin resiprokal klasik).',
        'Bradikardia sinus dan hipotensi ambang batas akibat peningkatan tonus vagal (sering pada infark inferior/RCA).'
      ]
    },
    leadConfigs: {
      // Inferior leads show STEMI ST elevation
      II: { stElevation: -10, tAmp: -12, rAmp: -30 },
      III: { stElevation: -18, tAmp: -14, rAmp: -20 },
      aVF: { stElevation: -14, tAmp: -13, rAmp: -25 },
      // Lateral leads show reciprocal depression
      I: { stElevation: 8, tAmp: 6, rAmp: -40 },
      aVL: { stElevation: 12, tAmp: 8, rAmp: -25 },
      // Precordial leads
      V1: { stElevation: -2, tAmp: -4 }, // Can indicate RV infarction
      V2: { stElevation: 4, tAmp: 4 },
      V3: { stElevation: 3, tAmp: 3 },
      V4: { stElevation: 0, tAmp: -6 },
      V5: { stElevation: 0, tAmp: -8 },
      V6: { stElevation: 0, tAmp: -8 },
      aVR: { stElevation: 4, tAmp: 4 }
    }
  },
  {
    id: 'lateral_nstemi',
    title: {
      en: 'Case 3: Intermittent Exertional Tightness',
      id: 'Kasus 3: Nyeri Dada Tertekan Saat Aktivitas'
    },
    difficulty: 'intermediate',
    category: 'acs',
    heartRate: 92,
    rhythm: { en: 'Sinus Rhythm', id: 'Irama Sinus' },
    clinicalScenario: {
      en: 'A 62-year-old male diabetic patient describes recurring episodes of retrosternal chest tightness over the past 3 days, precipitated by walking up stairs and relieved by rest. However, today the pressure has persisted for over an hour even while resting. Vitals: BP 155/95 mmHg, HR 92 bpm, RR 18 bpm, SpO2 95%.',
      id: 'Pria diabetisi 62 tahun mengeluhkan dada terasa tertekan di belakang tulang dada yang berulang sejak 3 hari lalu, dipicu saat naik tangga dan membaik dengan istirahat. Namun hari ini dada tertekan menetap >1 jam meski sedang istirahat. Tanda vital: TD 155/95 mmHg, Nadi 92x/menit, RR 18x/menit, SpO2 95%.'
    },
    diagnosis: {
      en: 'Acute Lateral NSTEMI (Circumflex or Diagonal branch ischemia)',
      id: 'NSTEMI Lateral Akut (Iskemia cabang Sirkumfleksa atau Diagonal)'
    },
    keyFindings: {
      en: [
        'Horizontal to downsloping ST-segment depression ≥1 mm in lateral leads I, aVL, V5, and V6.',
        'Symmetrical T-wave inversion in leads V4-V6.',
        'No diagnostic ST-segment elevation in any lead.',
        'Elevated serial high-sensitivity Cardiac Troponins (cTnT) confirm myocardial necrosis.'
      ],
      id: [
        'Depresi segmen ST horizontal atau downsloping ≥1 mm di sadapan lateral I, aVL, V5, dan V6.',
        'Inversi gelombang T simetris di sadapan V4-V6.',
        'Tidak ada elevasi segmen ST yang bersifat diagnostik di semua sadapan.',
        'Troponin Jantung sensitivitas tinggi (cTnT) serial yang meningkat mengonfirmasi adanya nekrosis miokard.'
      ]
    },
    leadConfigs: {
      // Lateral depression
      I: { stElevation: 5, tAmp: 4 },
      aVL: { stElevation: 6, tAmp: 5 },
      V5: { stElevation: 8, tAmp: 6 },
      V6: { stElevation: 7, tAmp: 5 },
      V4: { stElevation: 3, tAmp: 4 },
      // Reciprocal or normal elsewhere
      II: { stElevation: 0, tAmp: -6 },
      III: { stElevation: -2, tAmp: -4 },
      aVF: { stElevation: 0, tAmp: -5 },
      V1: { stElevation: 0, tAmp: -3 },
      V2: { stElevation: -2, tAmp: -2 },
      V3: { stElevation: -1, tAmp: -3 },
      aVR: { stElevation: -3, tAmp: -2 }
    }
  },
  {
    id: 'posterior_mi',
    title: {
      en: 'Case 4: Severe Back Pain and Dyspnea',
      id: 'Kasus 4: Nyeri Punggung Hebat dan Sesak Napas'
    },
    difficulty: 'advanced',
    category: 'acs',
    heartRate: 78,
    rhythm: { en: 'Sinus Rhythm', id: 'Irama Sinus' },
    clinicalScenario: {
      en: 'A 59-year-old male presents with sudden onset of severe dull chest pressure radiating straight to his back, accompanied by acute shortness of breath and diaphoresis. Standard 12-lead ECG is initially read by the triage nurse as "non-specific ST changes". Vitals: BP 118/72 mmHg, HR 78 bpm, SpO2 93% on room air.',
      id: 'Pria 59 tahun datang dengan rasa tertekan dada tumpul hebat yang menjalar langsung ke punggung, disertai sesak napas akut dan keringat dingin. EKG 12-sadapan standar awalnya dinilai oleh perawat triase sebagai "perubahan ST non-spesifik". Tanda vital: TD 118/72 mmHg, Nadi 78x/menit, SpO2 93%.'
    },
    diagnosis: {
      en: 'Acute Isolated Posterior STEMI (LCx occlusion)',
      id: 'STEMI Posterior Terisolasi Akut (Oklusi LCx)'
    },
    keyFindings: {
      en: [
        'Horizontal ST-segment depression in anterior leads V1-V3 (the "mirror image" of posterior ST elevation).',
        'Prominent, tall R waves in leads V1-V3 with R/S ratio >1 in V2.',
        'Tall, upright, symmetrical T waves in leads V1-V3.',
        'Requires V7-V9 posterior leads to show direct ST elevation ≥0.5 mm to confirm posterior infarct.'
      ],
      id: [
        'Depresi segmen ST horizontal di sadapan anterior V1-V3 (gambaran cermin dari elevasi ST posterior).',
        'Gelombang R yang menonjol dan tinggi di sadapan V1-V3 dengan rasio R/S >1 di V2.',
        'Gelombang T yang tinggi, tegak, dan simetris di sadapan V1-V3.',
        'Memerlukan sadapan posterior V7-V9 untuk menunjukkan elevasi ST langsung ≥0.5 mm guna mengonfirmasi infark posterior.'
      ]
    },
    leadConfigs: {
      // Anterior leads show horizontal ST depression + tall R + upright T (Mirror of posterior STEMI)
      V1: { stElevation: 8, tAmp: -14, rAmp: -20, sDepth: 18 },
      V2: { stElevation: 12, tAmp: -16, rAmp: -45, sDepth: 15 },
      V3: { stElevation: 10, tAmp: -14, rAmp: -40, sDepth: 18 },
      // Other leads normal or mild changes
      V4: { stElevation: 3, tAmp: -8 },
      V5: { stElevation: 0, tAmp: -6 },
      V6: { stElevation: 0, tAmp: -5 },
      II: { stElevation: 0, tAmp: -6 },
      III: { stElevation: -1, tAmp: -4 },
      aVF: { stElevation: 0, tAmp: -5 },
      I: { stElevation: 0, tAmp: -5 },
      aVL: { stElevation: 0, tAmp: -4 },
      aVR: { stElevation: -2, tAmp: -3 }
    }
  },
  {
    id: 'atrial_fibrillation',
    title: {
      en: 'Case 5: Sudden Palpitations and Fatigue',
      id: 'Kasus 5: Berdebar-debar Tiba-tiba dan Lemas'
    },
    difficulty: 'beginner',
    category: 'arrhythmia',
    heartRate: 135,
    rhythm: { en: 'Atrial Fibrillation with Rapid Ventricular Response', id: 'Fibrilasi Atrium dengan Respons Ventrikel Cepat' },
    clinicalScenario: {
      en: 'A 74-year-old female presents with sudden onset of "fluttering in the chest" and moderate fatigue starting 4 hours ago. She feels slightly lightheaded when standing. History of mitral valve disease. Vitals: BP 115/70 mmHg, irregular pulse at 135 bpm, RR 18 bpm, SpO2 96%.',
      id: 'Wanita 74 tahun datang dengan keluhan "dada berdebar-debar" mendadak dan lemas sejak 4 jam lalu. Dia merasa agak kliyengan saat berdiri. Riwayat penyakit katup mitral. Tanda vital: TD 115/70 mmHg, nadi tidak teratur ~135x/menit, RR 18x/menit, SpO2 96%.'
    },
    diagnosis: {
      en: 'Atrial Fibrillation (AFib) with Rapid Ventricular Response (RVR)',
      id: 'Fibrilasi Atrium (AFib) dengan Respons Ventrikel Cepat (RVR)'
    },
    keyFindings: {
      en: [
        'Absence of distinct P waves in all leads.',
        'Irregularly irregular RR intervals (chaotic cycle spacing).',
        'Fibrillatory waves (fine chaotic baseline fluctuations, most prominent in lead V1).',
        'Narrow QRS complexes (conduction through standard bundle branches).'
      ],
      id: [
        'Tidak adanya gelombang P yang jelas di semua sadapan.',
        'Interval RR yang tidak teratur secara tidak teratur (jarak siklus kacau).',
        'Gelombang fibrilasi (fluktuasi baseline kacau yang halus, paling menonjol di V1).',
        'Kompleks QRS sempit (konduksi melalui berkas cabang standar).'
      ]
    },
    leadConfigs: {
      I: { rAmp: -30, sDepth: 6, tAmp: -6 },
      II: { rAmp: -35, sDepth: 8, tAmp: -7 },
      III: { rAmp: -15, sDepth: 10, tAmp: -4 },
      aVR: { rAmp: 20, sDepth: 4, tAmp: 4 },
      aVL: { rAmp: -25, sDepth: 5, tAmp: -5 },
      aVF: { rAmp: -28, sDepth: 8, tAmp: -6 },
      V1: { rAmp: -10, sDepth: 20, tAmp: -3 }, // Fibrillation waves highly visible here
      V2: { rAmp: -22, sDepth: 25, tAmp: -6 },
      V3: { rAmp: -35, sDepth: 18, tAmp: -8 },
      V4: { rAmp: -45, sDepth: 10, tAmp: -9 },
      V5: { rAmp: -38, sDepth: 6, tAmp: -8 },
      V6: { rAmp: -30, sDepth: 5, tAmp: -7 }
    }
  },
  {
    id: 'atrial_flutter',
    title: {
      en: 'Case 6: Fast Racing Heartbeat',
      id: 'Kasus 6: Jantung Berdetak Sangat Cepat'
    },
    difficulty: 'intermediate',
    category: 'arrhythmia',
    heartRate: 75,
    rhythm: { en: 'Atrial Flutter with 4:1 AV Block', id: 'Flutter Atrium dengan Blok AV 4:1' },
    clinicalScenario: {
      en: 'A 71-year-old male with COPD describes palpitations and mild shortness of breath during his morning walk. He denies chest pain. Pulse is regular at 75 bpm. Vitals: BP 130/80 mmHg, RR 18 bpm, SpO2 92% on room air (normal baseline for him).',
      id: 'Pria 71 tahun dengan PPOK mengeluhkan berdebar-debar dan sesak napas ringan saat jalan pagi. Nyeri dada disangkal. Nadi teratur 75x/menit. Tanda vital: TD 130/80 mmHg, RR 18x/menit, SpO2 92% (baseline normal untuk pasien).'
    },
    diagnosis: {
      en: 'Atrial Flutter with 4:1 AV Block',
      id: 'Flutter Atrium dengan Blok AV 4:1'
    },
    keyFindings: {
      en: [
        'Classic "sawtooth" flutter waves (F-waves) running continuously at ~300 bpm.',
        'Flutter waves are best visualized in inferior leads II, III, and aVF, and lead V1.',
        'Regular RR intervals with an ventricular rate of exactly 75 bpm (4:1 conduction ratio).',
        'Narrow QRS complexes.'
      ],
      id: [
        'Gelombang flutter klasik berbentuk "gigi gergaji" (gelombang F) berjalan terus menerus pada kecepatan ~300x/menit.',
        'Gelombang flutter paling baik terlihat di sadapan inferior II, III, dan aVF, serta sadapan V1.',
        'Interval RR reguler dengan laju ventrikel tepat 75x/menit (rasio konduksi 4:1).',
        'Kompleks QRS sempit.'
      ]
    },
    leadConfigs: {
      II: { rAmp: -35, sDepth: 8, tAmp: 0 }, // Sawtooth baseline will dominate
      III: { rAmp: -18, sDepth: 10, tAmp: 0 },
      aVF: { rAmp: -28, sDepth: 8, tAmp: 0 },
      I: { rAmp: -30, sDepth: 5, tAmp: -6 }, // Flat baseline on I
      aVL: { rAmp: -20, sDepth: 6, tAmp: -5 },
      aVR: { rAmp: 22, sDepth: 4, tAmp: 4 },
      V1: { rAmp: -8, sDepth: 18, tAmp: 0 },
      V2: { rAmp: -20, sDepth: 22, tAmp: -6 },
      V3: { rAmp: -35, sDepth: 15, tAmp: -8 },
      V4: { rAmp: -40, sDepth: 8, tAmp: -8 },
      V5: { rAmp: -36, sDepth: 5, tAmp: -8 },
      V6: { rAmp: -28, sDepth: 4, tAmp: -7 }
    }
  },
  {
    id: 'ventricular_tachycardia',
    title: {
      en: 'Case 7: Syncope and Extreme Dizziness',
      id: 'Kasus 7: Pingsan dan Pusing Berputar Hebat'
    },
    difficulty: 'advanced',
    category: 'arrhythmia',
    heartRate: 160,
    rhythm: { en: 'Monomorphic Ventricular Tachycardia', id: 'Takikardia Ventrikel Monomorfik' },
    clinicalScenario: {
      en: 'A 65-year-old male with a history of prior myocardial infarction collapsed in his kitchen. He regained consciousness after 20 seconds but is extremely dizzy, pale, and diaphoretic. Vitals: BP 85/50 mmHg (hemodynamically unstable), HR 160 bpm, RR 24 bpm, SpO2 91%. Emergency defibrillator is brought to the bedside.',
      id: 'Pria 65 tahun dengan riwayat infark miokard sebelumnya mendadak kolaps di dapur. Dia sadar kembali setelah 20 detik tetapi merasa sangat pusing, pucat, dan berkeringat dingin. Tanda vital: TD 85/50 mmHg (hemodinamik tidak stabil), Nadi 160x/menit, RR 24x/menit, SpO2 91%. Defibrilator darurat disiapkan di samping tempat tidur.'
    },
    diagnosis: {
      en: 'Monomorphic Ventricular Tachycardia (VT)',
      id: 'Takikardia Ventrikel Monomorfik (VT)'
    },
    keyFindings: {
      en: [
        'Widespread, regular, very wide QRS complexes (>160 ms).',
        'Extreme tachycardia (ventricular rate ~160 bpm).',
        'No visible P waves (hidden within the QRS complexes) due to AV dissociation.',
        'Concordance (QRS complexes are all positive or all negative) across precordial leads V1-V6.',
        'Secondary ST-segment and T-wave changes opposite in direction to QRS complexes.'
      ],
      id: [
        'Kompleks QRS yang sangat lebar (>160 ms) dan reguler di semua sadapan.',
        'Takikardia ekstrem (laju ventrikel ~160x/menit).',
        'Tidak terlihat gelombang P (tersembunyi dalam kompleks QRS) akibat disosiasi AV.',
        'Konkordansi (kompleks QRS semuanya positif atau semuanya negatif) di semua sadapan prekordial V1-V6.',
        'Perubahan sekunder segmen ST dan gelombang T dengan arah berlawanan dari kompleks QRS.'
      ]
    },
    leadConfigs: {
      // Wide QRS, large discordant T waves, no P waves
      I: { rAmp: -40, qrsWidthMultiplier: 2.2, tAmp: 16, tWidth: 20 },
      II: { rAmp: -45, qrsWidthMultiplier: 2.2, tAmp: 18, tWidth: 20 },
      III: { rAmp: -15, qrsWidthMultiplier: 2.2, tAmp: 10, tWidth: 20 },
      aVR: { rAmp: 40, qrsWidthMultiplier: 2.2, tAmp: -15, tWidth: 20 },
      aVL: { rAmp: -30, qrsWidthMultiplier: 2.2, tAmp: 12, tWidth: 20 },
      aVF: { rAmp: -35, qrsWidthMultiplier: 2.2, tAmp: 14, tWidth: 20 },
      V1: { rAmp: 35, sDepth: 0, qrsWidthMultiplier: 2.2, tAmp: -15, tWidth: 20 }, // Positive concordance in V1-V6
      V2: { rAmp: 45, sDepth: 0, qrsWidthMultiplier: 2.2, tAmp: -18, tWidth: 20 },
      V3: { rAmp: 50, sDepth: 0, qrsWidthMultiplier: 2.2, tAmp: -20, tWidth: 20 },
      V4: { rAmp: 45, sDepth: 0, qrsWidthMultiplier: 2.2, tAmp: -18, tWidth: 20 },
      V5: { rAmp: 40, sDepth: 0, qrsWidthMultiplier: 2.2, tAmp: -16, tWidth: 20 },
      V6: { rAmp: 30, sDepth: 0, qrsWidthMultiplier: 2.2, tAmp: -12, tWidth: 20 }
    }
  },
  {
    id: 'svt',
    title: {
      en: 'Case 8: Sudden Chest Fluttering in Young Adult',
      id: 'Kasus 8: Berdebar-debar Tiba-tiba pada Dewasa Muda'
    },
    difficulty: 'intermediate',
    category: 'arrhythmia',
    heartRate: 180,
    rhythm: { en: 'Regular Narrow-Complex Tachycardia', id: 'Takikardia Kompleks Sempit Reguler' },
    clinicalScenario: {
      en: 'A healthy 28-year-old female presents with sudden onset of severe heart racing that started while she was sitting at her desk. She feels anxious and has mild shortness of breath, but denies chest pain or syncope. Vitals: BP 120/75 mmHg, HR 180 bpm (regular), RR 18 bpm, SpO2 98%.',
      id: 'Wanita sehat 28 tahun datang dengan keluhan jantung berdetak sangat cepat mendadak yang dimulai saat sedang duduk di mejanya. Dia merasa cemas dan sesak napas ringan, tetapi menyangkal nyeri dada atau pingsan. Tanda vital: TD 120/75 mmHg, Nadi 180x/menit (reguler), RR 18x/menit, SpO2 98%.'
    },
    diagnosis: {
      en: 'Supraventricular Tachycardia (SVT) - AVNRT',
      id: 'Takikardia Supraventrikular (SVT) - AVNRT'
    },
    keyFindings: {
      en: [
        'Regular, extremely rapid heart rate (~180 bpm).',
        'Narrow QRS complexes (<100 ms) indicating conduction through standard paths.',
        'Absence of normal P waves (often buried within the QRS or visible as a "pseudo-S" wave in inferior leads or "pseudo-R\'" in V1).',
        'Flat, stable ST segments without acute ischemic deviation.'
      ],
      id: [
        'Laju jantung reguler yang sangat cepat (~180x/menit).',
        'Kompleks QRS sempit (<100 ms) menandakan konduksi melalui jalur standar.',
        'Absennya gelombang P normal (sering terkubur dalam QRS atau terlihat sebagai gelombang "pseudo-S" di sadapan inferior atau "pseudo-R\'" di V1).',
        'Segmen ST datar dan stabil tanpa deviasi iskemik akut.'
      ]
    },
    leadConfigs: {
      // Fast, regular, narrow QRS, pseudo-waves
      I: { rAmp: -35, sDepth: 6, tAmp: -8 },
      II: { rAmp: -38, sDepth: 12, tAmp: -9, prLength: 0 }, // Pseudo-S in inferior leads
      III: { rAmp: -16, sDepth: 14, tAmp: -5 },
      aVR: { rAmp: 20, sDepth: 4, tAmp: 4 },
      aVL: { rAmp: -25, sDepth: 5, tAmp: -6 },
      aVF: { rAmp: -30, sDepth: 12, tAmp: -7 },
      V1: { rAmp: -8, sDepth: 18, rSRPrime: true, tAmp: -3 }, // Pseudo-R' wave
      V2: { rAmp: -22, sDepth: 24, tAmp: -7 },
      V3: { rAmp: -36, sDepth: 16, tAmp: -8 },
      V4: { rAmp: -40, sDepth: 8, tAmp: -8 },
      V5: { rAmp: -35, sDepth: 5, tAmp: -8 },
      V6: { rAmp: -28, sDepth: 4, tAmp: -7 }
    }
  },
  {
    id: 'complete_heart_block',
    title: {
      en: 'Case 9: Dizziness and Recurrent Near-Syncope',
      id: 'Kasus 9: Pusing Berputar dan Hampir Pingsan Berulang'
    },
    difficulty: 'intermediate',
    category: 'conduction',
    heartRate: 38,
    rhythm: { en: 'AV Dissociation with Ventricular Escape Rhythm', id: 'Disosiasi AV dengan Irama Lolos Ventrikel' },
    clinicalScenario: {
      en: 'An 82-year-old male is brought by family due to worsening weakness, confusion, and three episodes of near-syncope (feeling "about to pass out") over the past 24 hours. He is currently resting in bed. Vitals: BP 96/50 mmHg (hypotensive), HR 38 bpm, RR 14 bpm, SpO2 95% on room air.',
      id: 'Pria 82 tahun dibawa keluarga karena makin lemas, bingung, dan 3 kali hampir pingsan dalam 24 jam terakhir. Saat ini pasien berbaring di tempat tidur. Tanda vital: TD 96/50 mmHg (hipotensi), Nadi 38x/menit, RR 14x/menit, SpO2 95%.'
    },
    diagnosis: {
      en: 'Third-Degree (Complete) AV Block with Ventricular Escape Rhythm',
      id: 'Blok AV Derajat Tiga (Lengkap) dengan Irama Lolos Ventrikel'
    },
    keyFindings: {
      en: [
        'Complete AV Dissociation: P-waves and QRS complexes march regularly but independently of each other.',
        'Atrial rate (~75 bpm, regular P-P) is much faster than the ventricular rate (~38 bpm, regular R-R).',
        'Ventricular escape rhythm has wide QRS complexes (>120 ms) due to ventricular origin.',
        'No constant or fixed PR intervals.'
      ],
      id: [
        'Disosiasi AV Lengkap: Gelombang P dan kompleks QRS berjalan reguler tetapi terpisah satu sama lain.',
        'Laju atrium (~75x/menit, P-P reguler) jauh lebih cepat daripada laju ventrikel (~38x/menit, R-R reguler).',
        'Irama lolos ventrikel memiliki kompleks QRS lebar (>120 ms) karena berasal dari ventrikel.',
        'Tidak ada interval PR yang konstan atau tetap.'
      ]
    },
    leadConfigs: {
      // Escape rhythm: slow rate, wide QRS, independent P waves
      I: { rAmp: -25, sDepth: 14, qrsWidthMultiplier: 1.6, tAmp: -10, tWidth: 16 },
      II: { rAmp: -28, sDepth: 16, qrsWidthMultiplier: 1.6, tAmp: -12, tWidth: 16 },
      III: { rAmp: 12, sDepth: 2, qrsWidthMultiplier: 1.6, tAmp: 8, tWidth: 16 },
      aVR: { rAmp: 25, sDepth: 4, qrsWidthMultiplier: 1.6, tAmp: 10, tWidth: 16 },
      aVL: { rAmp: -20, sDepth: 12, qrsWidthMultiplier: 1.6, tAmp: -9, tWidth: 16 },
      aVF: { rAmp: -15, sDepth: 18, qrsWidthMultiplier: 1.6, tAmp: -10, tWidth: 16 },
      V1: { rAmp: 28, sDepth: 0, qrsWidthMultiplier: 1.6, tAmp: -8, tWidth: 16 },
      V2: { rAmp: 35, sDepth: 0, qrsWidthMultiplier: 1.6, tAmp: -10, tWidth: 16 },
      V3: { rAmp: 40, sDepth: 0, qrsWidthMultiplier: 1.6, tAmp: -12, tWidth: 16 },
      V4: { rAmp: -28, sDepth: 14, qrsWidthMultiplier: 1.6, tAmp: 12, tWidth: 16 },
      V5: { rAmp: -30, sDepth: 12, qrsWidthMultiplier: 1.6, tAmp: 14, tWidth: 16 },
      V6: { rAmp: -25, sDepth: 10, qrsWidthMultiplier: 1.6, tAmp: 10, tWidth: 16 }
    }
  },
  {
    id: 'wpw_syndrome',
    title: {
      en: 'Case 10: Palpitations and Chest Pressure',
      id: 'Kasus 10: Dada Berdebar disertai Tertekan'
    },
    difficulty: 'advanced',
    category: 'conduction',
    heartRate: 82,
    rhythm: { en: 'Sinus Rhythm with Delta Waves', id: 'Irama Sinus dengan Gelombang Delta' },
    clinicalScenario: {
      en: 'A 24-year-old male college athlete presents with recurring episodes of palpitations associated with mild chest pressure and shortness of breath during heavy training. Today, his symptoms persisted longer than usual. Vitals: BP 122/78 mmHg, HR 82 bpm, RR 16 bpm, SpO2 99%.',
      id: 'Pria atlet mahasiswa 24 tahun datang dengan keluhan berdebar-debar berulang disertai rasa tertekan dada ringan dan sesak napas saat latihan berat. Hari ini, gejalanya menetap lebih lama dari biasanya. Tanda vital: TD 122/78 mmHg, Nadi 82x/menit, RR 16x/menit, SpO2 99%.'
    },
    diagnosis: {
      en: 'Wolff-Parkinson-White (WPW) Syndrome (Pre-excitation)',
      id: 'Sindrom Wolff-Parkinson-White (WPW) (Pre-eksitasi)'
    },
    keyFindings: {
      en: [
        'Short PR interval (<120 ms) due to bypass of the normal AV node delay.',
        'Delta wave: a slurred, slow upstroke at the beginning of the QRS complex.',
        'Widened QRS complex (>110 ms) representing a fusion of pre-excitation and normal conduction.',
        'Secondary ST-segment and T-wave changes opposite in direction to major QRS deflection.'
      ],
      id: [
        'Interval PR pendek (<120 ms) karena pintasan penundaan nodus AV normal.',
        'Gelombang Delta: peningkatan awal QRS yang lambat dan landai.',
        'Pelebaran kompleks QRS (>110 ms) mewakili fusi dari pre-eksitasi dan konduksi normal.',
        'Perubahan sekunder segmen ST dan gelombang T berlawanan dengan arah defleksi QRS utama.'
      ]
    },
    leadConfigs: {
      // Short PR, Delta waves, slightly wide QRS
      I: { rAmp: -38, deltaWave: true, prLength: 10, tAmp: 8 },
      II: { rAmp: -40, deltaWave: true, prLength: 10, tAmp: 9 },
      III: { rAmp: 18, deltaWave: true, prLength: 10, tAmp: -6 }, // Negative delta wave mimics Q wave (Pseudo-infarction pattern)
      aVR: { rAmp: 25, deltaWave: true, prLength: 10, tAmp: -6 },
      aVL: { rAmp: -25, deltaWave: true, prLength: 10, tAmp: 6 },
      aVF: { rAmp: -30, deltaWave: true, prLength: 10, tAmp: 7 },
      V1: { rAmp: 28, deltaWave: true, prLength: 10, tAmp: -8 }, // Tall R in V1 (Type A WPW)
      V2: { rAmp: 38, deltaWave: true, prLength: 10, tAmp: -10 },
      V3: { rAmp: 42, deltaWave: true, prLength: 10, tAmp: -11 },
      V4: { rAmp: -38, deltaWave: true, prLength: 10, tAmp: 10 },
      V5: { rAmp: -35, deltaWave: true, prLength: 10, tAmp: 9 },
      V6: { rAmp: -28, deltaWave: true, prLength: 10, tAmp: 7 }
    }
  },
  {
    id: 'lbbb',
    title: {
      en: 'Case 11: New Shortness of Breath and Hypertension',
      id: 'Kasus 11: Sesak Napas Baru dan Hipertensi'
    },
    difficulty: 'intermediate',
    category: 'conduction',
    heartRate: 72,
    rhythm: { en: 'Sinus Rhythm with LBBB', id: 'Irama Sinus dengan LBBB' },
    clinicalScenario: {
      en: 'A 73-year-old female with long-standing poorly controlled hypertension presents to the clinic complaining of new, progressive shortness of breath when walking short distances. She denies chest pain or pressure. Vitals: BP 178/95 mmHg, HR 72 bpm, SpO2 94% on room air.',
      id: 'Wanita 73 tahun dengan riwayat hipertensi tidak terkontrol lama datang ke klinik mengeluhkan sesak napas baru yang makin berat saat berjalan jarak dekat. Nyeri dada disangkal. Tanda vital: TD 178/95 mmHg, Nadi 72x/menit, SpO2 94%.'
    },
    diagnosis: {
      en: 'Left Bundle Branch Block (LBBB)',
      id: 'Left Bundle Branch Block (LBBB)'
    },
    keyFindings: {
      en: [
        'Prolonged QRS duration ≥120 ms.',
        'Broad, notched, or slurred R waves in lateral leads I, aVL, V5, and V6 ("M" shape pattern).',
        'Deep S waves in right precordial leads V1-V3.',
        'Discordant ST-segment and T-wave changes (ST elevation / upright T in leads with deep S; ST depression / inverted T in leads with tall R).'
      ],
      id: [
        'Durasi QRS memanjang ≥120 ms.',
        'Gelombang R lebar, bertakik, atau landai di sadapan lateral I, aVL, V5, dan V6 (pola "M-shape").',
        'Gelombang S yang dalam di sadapan prekordial kanan V1-V3.',
        'Perubahan segmen ST dan gelombang T diskordan (elevasi ST / T tegak di sadapan dengan S dalam; depresi ST / T inversi di sadapan dengan R tinggi).'
      ]
    },
    leadConfigs: {
      // Wide QRS, notched lateral R, deep right precordial S
      I: { rAmp: -38, isNotchedR: true, qrsWidthMultiplier: 1.5, stElevation: 3, tAmp: 8 },
      aVL: { rAmp: -28, isNotchedR: true, qrsWidthMultiplier: 1.5, stElevation: 2, tAmp: 7 },
      V5: { rAmp: -40, isNotchedR: true, qrsWidthMultiplier: 1.5, stElevation: 3, tAmp: 8 },
      V6: { rAmp: -35, isNotchedR: true, qrsWidthMultiplier: 1.5, stElevation: 3, tAmp: 7 },
      // Deep S + discordant elevation in V1-V3 (This STEMI mimic is normal in LBBB!)
      V1: { rAmp: 0, sDepth: 35, qrsWidthMultiplier: 1.5, stElevation: -6, tAmp: -12 },
      V2: { rAmp: 0, sDepth: 42, qrsWidthMultiplier: 1.5, stElevation: -8, tAmp: -14 },
      V3: { rAmp: 0, sDepth: 40, qrsWidthMultiplier: 1.5, stElevation: -7, tAmp: -13 },
      V4: { rAmp: -15, sDepth: 18, qrsWidthMultiplier: 1.5, stElevation: -2, tAmp: -6 },
      II: { rAmp: -25, sDepth: 8, qrsWidthMultiplier: 1.5, tAmp: -6 },
      III: { rAmp: 18, qrsWidthMultiplier: 1.5, tAmp: -5 },
      aVF: { rAmp: -12, sDepth: 14, qrsWidthMultiplier: 1.5, tAmp: -5 },
      aVR: { rAmp: 25, qrsWidthMultiplier: 1.5, tAmp: -5 }
    }
  },
  {
    id: 'massive_pe',
    title: {
      en: 'Case 12: Sudden Sharp Chest Pain after Travel',
      id: 'Kasus 12: Nyeri Dada Tajam Mendadak Pasca Perjalanan'
    },
    difficulty: 'advanced',
    category: 'emergency',
    heartRate: 115,
    rhythm: { en: 'Sinus Tachycardia', id: 'Takikardia Sinus' },
    clinicalScenario: {
      en: 'A 42-year-old female presents to the triage desk with sudden onset of sharp, pleuritic right-sided chest pain and intense dyspnea starting 30 minutes ago. She recently returned from a 14-hour trans-Pacific flight. Vitals: BP 100/60 mmHg, HR 115 bpm (tachycardia), RR 26 bpm, SpO2 89% on room air.',
      id: 'Wanita 42 tahun datang ke triase dengan keluhan nyeri dada kanan tajam pleuritik mendadak dan sesak napas hebat sejak 30 menit lalu. Baru kembali dari penerbangan trans-Pasifik 14 jam. Tanda vital: TD 100/60 mmHg, Nadi 115x/menit, RR 26x/menit, SpO2 89%.'
    },
    diagnosis: {
      en: 'Massive Pulmonary Embolism (PE) causing Acute Cor Pulmonale',
      id: 'Emboli Paru (PE) Masif menyebabkan Kor Pulmonale Akut'
    },
    keyFindings: {
      en: [
        'Sinus tachycardia (most common ECG finding in PE).',
        'Classic S1Q3T3 Right Heart Strain Pattern (deep S in lead I, pathological Q in lead III, inverted T in lead III).',
        'Right Axis Deviation (~110 degrees) due to right ventricular pressure overload.',
        'T-wave inversions in right precordial leads V1-V4 indicating acute RV strain.',
        'Incomplete or complete Right Bundle Branch Block (RBBB) pattern.'
      ],
      id: [
        'Takikardia sinus (temuan EKG paling umum pada PE).',
        'Pola Regangan Jantung Kanan S1Q3T3 Klasik (S dalam di sadapan I, Q patologis di sadapan III, T terbalik di sadapan III).',
        'Deviasi Aksis Kanan (~110 derajat) akibat beban tekanan ventrikel kanan.',
        'Inversi gelombang T di sadapan prekordial kanan V1-V4 menandakan regangan RV akut.',
        'Pola Right Bundle Branch Block (RBBB) inkomplit atau komplit.'
      ]
    },
    leadConfigs: {
      // Sinus tach, S1Q3T3 pattern, V1-V4 T inversion
      I: { rAmp: -30, sDepth: 18, s1q3t3: 'S1' }, // Deep S in I
      II: { rAmp: -35, sDepth: 6, tAmp: -6 },
      III: { rAmp: -10, qDepth: 8, tAmp: 8, s1q3t3: 'Q3' }, // Q wave and inverted T in III (T3)
      aVR: { rAmp: 25, tAmp: 4 },
      aVL: { rAmp: -15, sDepth: 12, tAmp: -4 },
      aVF: { rAmp: -20, sDepth: 8, tAmp: -5 },
      // Right precordial strain (V1-V4 T inversion)
      V1: { rAmp: -5, sDepth: 15, rSRPrime: true, tAmp: 8 }, // Incomplete RBBB
      V2: { rAmp: -15, sDepth: 25, tAmp: 10 }, // Deep T inversion
      V3: { rAmp: -28, sDepth: 18, tAmp: 8 },  // Deep T inversion
      V4: { rAmp: -35, sDepth: 10, tAmp: 6 },  // T inversion
      V5: { rAmp: -38, sDepth: 5, tAmp: -6 },
      V6: { rAmp: -30, sDepth: 4, tAmp: -7 }
    }
  },
  {
    id: 'hyperkalemia_severe',
    title: {
      en: 'Case 13: End-Stage Renal Disease with Weakness',
      id: 'Kasus 13: Penyakit Ginjal Stadium Akhir disertai Lemas'
    },
    difficulty: 'intermediate',
    category: 'emergency',
    heartRate: 54,
    rhythm: { en: 'Sinuventricular Rhythm (Hyperkalemia)', id: 'Irama Sinuventrikular (Hiperkalemia)' },
    clinicalScenario: {
      en: 'A 58-year-old male with end-stage renal disease (ESRD) missed his last two hemodialysis sessions. He presents with severe generalized muscle weakness, difficulty raising his arms, and a "fluttering" sensation in his chest. Vitals: BP 105/58 mmHg, HR 54 bpm, RR 18 bpm, SpO2 96%.',
      id: 'Pria 58 tahun dengan penyakit ginjal stadium akhir (ESRD) melewatkan dua sesi hemodialisis terakhirnya. Datang dengan keluhan otot lemas berat di seluruh tubuh, kesulitan mengangkat lengan, dan dada terasa berdebar halus. Tanda vital: TD 105/58 mmHg, Nadi 54x/menit, RR 18x/menit, SpO2 96%.'
    },
    diagnosis: {
      en: 'Severe Hyperkalemia (Potassium K⁺ > 7.2 mEq/L) - Medical Emergency',
      id: 'Hiperkalemia Berat (Kalium K⁺ > 7.2 mEq/L) - Kedaruratan Medis'
    },
    keyFindings: {
      en: [
        'Classic tall, narrow-based, symmetrically "peaked" or "tented" T waves in almost all leads.',
        'Widespread widening of the QRS complexes (>120 ms).',
        'Flattening and eventual disappearance of P waves (sinuventricular conduction).',
        'Prolonged PR interval and gradual merging of QRS and T wave into a sine-wave appearance.'
      ],
      id: [
        'Gelombang T tinggi klasik dengan basis sempit yang "memuncak" (peaked/tented) simetris di hampir semua sadapan.',
        'Pelebaran kompleks QRS yang merata di semua sadapan (>120 ms).',
        'Mendatarnya dan akhirnya menghilangnya gelombang P (konduksi sinuventrikular).',
        'Interval PR memanjang dan penggabungan bertahap QRS dan gelombang T menjadi gambaran sine-wave.'
      ]
    },
    leadConfigs: {
      // Sinuventricular: flat P, wide QRS, massive peaked/narrow T waves
      I: { pAmp: 0, rAmp: -30, qrsWidthMultiplier: 1.6, tAmp: -16, tWidth: 8 },
      II: { pAmp: 0, rAmp: -35, qrsWidthMultiplier: 1.6, tAmp: -20, tWidth: 8 },
      III: { pAmp: 0, rAmp: -12, qrsWidthMultiplier: 1.6, tAmp: -14, tWidth: 8 },
      aVR: { pAmp: 0, rAmp: 25, qrsWidthMultiplier: 1.6, tAmp: 12, tWidth: 8 },
      aVL: { pAmp: 0, rAmp: -22, qrsWidthMultiplier: 1.6, tAmp: -15, tWidth: 8 },
      aVF: { pAmp: 0, rAmp: -25, qrsWidthMultiplier: 1.6, tAmp: -18, tWidth: 8 },
      V1: { pAmp: 0, rAmp: -5, sDepth: 25, qrsWidthMultiplier: 1.6, tAmp: -14, tWidth: 8 },
      V2: { pAmp: 0, rAmp: -15, sDepth: 35, qrsWidthMultiplier: 1.6, tAmp: -26, tWidth: 8 },
      V3: { pAmp: 0, rAmp: -28, sDepth: 30, qrsWidthMultiplier: 1.6, tAmp: -28, tWidth: 8 },
      V4: { pAmp: 0, rAmp: -35, sDepth: 18, qrsWidthMultiplier: 1.6, tAmp: -26, tWidth: 8 },
      V5: { pAmp: 0, rAmp: -38, sDepth: 10, qrsWidthMultiplier: 1.6, tAmp: -22, tWidth: 8 },
      V6: { pAmp: 0, rAmp: -30, sDepth: 8, qrsWidthMultiplier: 1.6, tAmp: -18, tWidth: 8 }
    }
  },
  {
    id: 'lvh',
    title: {
      en: 'Case 14: Regular Follow-up of Hypertension',
      id: 'Kasus 14: Kontrol Rutin Hipertensi Lama'
    },
    difficulty: 'beginner',
    category: 'structural',
    heartRate: 68,
    rhythm: { en: 'Sinus Rhythm with LVH', id: 'Irama Sinus dengan LVH' },
    clinicalScenario: {
      en: 'A 56-year-old male with a 15-year history of severe hypertension presents for his routine follow-up. He admits to poor medication compliance and describes occasional mild shortness of breath on exertion, but denies chest pain. Vitals: BP 168/102 mmHg, HR 68 bpm, SpO2 96%.',
      id: 'Pria 56 tahun dengan riwayat hipertensi berat selama 15 tahun datang untuk kontrol rutin. Dia mengaku tidak patuh minum obat dan mengeluhkan sesak napas ringan sesekali saat aktivitas, tetapi menyangkal nyeri dada. Tanda vital: TD 168/102 mmHg, Nadi 68x/menit, SpO2 96%.'
    },
    diagnosis: {
      en: 'Left Ventricular Hypertrophy (LVH) with Strain Pattern',
      id: 'Hipertrofi Ventrikel Kiri (LVH) dengan Pola Strain'
    },
    keyFindings: {
      en: [
        'Sokolow-Lyon voltage criteria met: S wave depth in V1 + R wave height in V5 or V6 ≥ 35 mm (renders as very tall R and very deep S).',
        'Asymmetrical ST-segment depression and T-wave inversion (Strain pattern) in lateral leads I, aVL, V5, and V6.',
        'Left Axis Deviation (~ -30 degrees) due to increased left ventricular muscle mass.',
        'Prominent P mitrale (notched P wave) in lead II indicating left atrial enlargement.'
      ],
      id: [
        'Kriteria voltase Sokolow-Lyon terpenuhi: kedalaman gelombang S di V1 + tinggi gelombang R di V5 atau V6 ≥ 35 mm (terlihat sebagai R sangat tinggi dan S sangat dalam).',
        'Depresi ST asimetris dan inversi gelombang T (pola Strain) di sadapan lateral I, aVL, V5, dan V6.',
        'Deviasi Aksis Kiri (~ -30 derajat) akibat peningkatan massa otot ventrikel kiri.',
        'P mitrale menonjol (gelombang P bertakik) di sadapan II menandakan pembesaran atrium kiri.'
      ]
    },
    leadConfigs: {
      // LVH Sokolow Lyon: Deep S in V1/V2, extremely tall R in V5/V6, strain pattern in V5/V6
      V1: { rAmp: 0, sDepth: 32, tAmp: -4 },
      V2: { rAmp: 0, sDepth: 40, tAmp: -3 },
      V3: { rAmp: -15, sDepth: 35, tAmp: -5 },
      V4: { rAmp: -35, sDepth: 18, tAmp: -6 },
      V5: { rAmp: -58, sDepth: 4, stElevation: 8, tAmp: 10, tWidth: 16 }, // Tall R + ST depression & T inversion (Strain)
      V6: { rAmp: -52, sDepth: 0, stElevation: 7, tAmp: 8, tWidth: 16 },
      I: { rAmp: -38, stElevation: 4, tAmp: 6 },
      aVL: { rAmp: -28, stElevation: 3, tAmp: 5 },
      II: { pAmp: -5, rAmp: -30, sDepth: 8, tAmp: -6 }, // Prominent notched P wave
      III: { rAmp: 12, sDepth: 18, tAmp: -4 },
      aVF: { rAmp: -12, sDepth: 14, tAmp: -5 },
      aVR: { rAmp: 25, tAmp: 4 }
    }
  },
  {
    id: 'pericarditis',
    title: {
      en: 'Case 15: Sharp Chest Pain Relieved by Leaning Forward',
      id: 'Kasus 15: Nyeri Dada Tajam Membaik saat Membungkuk'
    },
    difficulty: 'intermediate',
    category: 'structural',
    heartRate: 96,
    rhythm: { en: 'Sinus Tachycardia', id: 'Takikardia Sinus' },
    clinicalScenario: {
      en: 'A 34-year-old male presents with sharp, stabbing sub-sternal chest pain that began yesterday. The pain is severe, worsens when lying flat on his back or taking a deep breath, and is significantly relieved when he sits up and leans forward. He had a mild flu-like illness 10 days ago. Vitals: Temp 37.9°C, BP 120/75 mmHg, HR 96 bpm, SpO2 99%.',
      id: 'Pria 34 tahun datang dengan nyeri dada sub-sternal tajam seperti ditusuk yang dimulai kemarin. Nyeri dirasa berat, memburuk saat berbaring telentang atau menarik napas dalam, dan membaik signifikan saat duduk membungkuk ke depan. Pasien mengalami flu ringan 10 hari lalu. Tanda vital: Suhu 37.9°C, TD 120/75 mmHg, Nadi 96x/menit, SpO2 99%.'
    },
    diagnosis: {
      en: 'Acute Pericarditis',
      id: 'Perikarditis Akut'
    },
    keyFindings: {
      en: [
        'Diffuse, widespread concave (upward-curving) ST-segment elevation in almost all leads (except aVR and V1).',
        'Diffuse PR-segment depression (especially in leads II, aVF, and V4-V6).',
        'PR-segment elevation in lead aVR (and sometimes V1) representing atrial injury.',
        'Absence of reciprocal ST depression (except in aVR and V1, which show ST depression).',
        'Sinus tachycardia due to pain and mild fever.'
      ],
      id: [
        'Elevasi segmen ST konkaf (melengkung ke atas) yang difus dan meluas di hampir semua sadapan (kecuali aVR dan V1).',
        'Depresi segmen PR difus (terutama di sadapan II, aVF, dan V4-V6).',
        'Elevasi segmen PR di sadapan aVR (dan terkadang V1) mewakili cedera atrium.',
        'Tidak adanya depresi ST resiprokal (kecuali di aVR dan V1, yang menunjukkan depresi ST).',
        'Takikardia sinus akibat nyeri dan demam ringan.'
      ]
    },
    leadConfigs: {
      // Diffuse concave ST elevation, PR depression
      I: { stElevation: -6, tAmp: -10, prLength: 30, pAmp: -3 },
      II: { stElevation: -8, tAmp: -12, prLength: 30, pAmp: -3 }, // PR depression visible
      III: { stElevation: -5, tAmp: -8, prLength: 30 },
      aVF: { stElevation: -7, tAmp: -10, prLength: 30 },
      aVL: { stElevation: -4, tAmp: -8, prLength: 30 },
      // aVR has reciprocal ST depression and PR elevation
      aVR: { stElevation: 6, tAmp: 4, prLength: 30, pAmp: 3 }, // PR elevation
      V1: { stElevation: 2, tAmp: -4 },
      // Precordial concave ST elevation
      V2: { stElevation: -10, tAmp: -14 },
      V3: { stElevation: -12, tAmp: -15 },
      V4: { stElevation: -10, tAmp: -14, prLength: 30 },
      V5: { stElevation: -8, tAmp: -12, prLength: 30 },
      V6: { stElevation: -6, tAmp: -10, prLength: 30 }
    }
  }
];
