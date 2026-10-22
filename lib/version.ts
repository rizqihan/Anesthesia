export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  highlight?: boolean;
  features: string[];
}

export const APP_VERSION = '2.4.0';
export const BUILD_DATE = '2026-10-22';
export const DB_SCHEMA_VERSION = 6;
export const RELEASE_NAME = 'Clinical Precision & Emergency Resilience';

export const APP_CHANGELOG: ReleaseNote[] = [
  {
    version: '2.4.0',
    date: '2026-10-22',
    title: 'Dynamic Groq Hub, ASRA Coags & Syringe Pump Titrator',
    highlight: true,
    features: [
      'Dynamic Groq Model Browser: Support for all Groq models including DeepSeek R1 Distill 70B & Qwen 2.5',
      'ASRA Coags 2024 Regional Anticoagulation Decision Matrix with real-time washout checks',
      'Syringe Pump Infusion Titrator: Bidirectional mcg/kg/min ↔ mL/hr rate calculations',
      'POCUS Live Feed Permissions-Policy integration for USB & handheld ultrasound probes',
      'Hardened security: rehype-sanitize XSS protection and IP rate limiting',
    ],
  },
  {
    version: '2.3.0',
    date: '2026-10-22',
    title: 'Pediatric Emergency Suite & Drug Interaction Engine',
    features: [
      'Broselow 9-Zone Pediatric Emergency Resuscitation Tape & Equipment Formulary',
      'WHO Child Growth Standards Z-scores & Percentile Calculations (Weight-for-Age, Height-for-Age, BMI-for-Age)',
      'Neonatal APGAR Score & Silverman-Anderson Respiratory Distress Index',
      'Evidence-based Multimodal Drug Interaction Matrix with Fatal/Contraindicated warnings',
      'Automated Hospital SOAP Progress Note Synthesizer with Clipboard Export',
    ],
  },
  {
    version: '2.2.0',
    date: '2026-10-22',
    title: 'POCUS Ultrasound Atlas & Bedside Calipers',
    features: [
      '14 High-Yield Clinical POCUS Emergency Cases with interactive ultrasound sonograms',
      'Integrated Bedside Caliper: IVC Collapsibility/Distensibility & 3-Axis Bladder Volume retention calc',
      'Dexie IndexedDB v6 Schema: Offline local ultrasound capture & cine loop storage',
    ],
  },
  {
    version: '2.1.0',
    date: '2026-10-22',
    title: 'Syndromic Antimicrobial Formulary & SBAR Rounds',
    features: [
      'Cockcroft-Gault & CKD-EPI 2021 Race-Free Renal Clearance Dosage Adjustments',
      'Hospital-Grade SBAR Bedside Rounds HTML & PDF Print Generator with Attending Sign-Off',
      'Hartford Nomogram Once-Daily Aminoglycosides & Vancomycin Target Troughs',
      'Pathogen Coverage Spectrum Matrix for Empiric Sepsis Coverage',
    ],
  },
  {
    version: '2.0.0',
    date: '2026-10-22',
    title: '15 High-Yield Clinical Risk Assessment Engines',
    features: [
      'Comprehensive clinical calculator suite: Wells DVT/PE, PERC, CHA2DS2-VASc, CURB-65, qSOFA/SOFA',
      'Neurological & Hepatic Scoring: GCS-P, NIHSS 11-item with tPA checklist, MELD-Na, Child-Pugh',
      '4-Step Arterial Blood Gas (ABG) Acid-Base Interpreter with Winter formula & Delta-Delta Ratio',
      'Rapid Bedside Vitals: Shock Index, Modified Shock Index, HEART Score, HAS-BLED',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-05-15',
    title: 'Offline Anesthesia Reference Suite Foundation',
    features: [
      '100% Offline-capable Dexie IndexedDB core with ICD-10 dictionary',
      'Interactive Anesthesia Drug Formulary & Emergency Protocols',
      '12-Lead ECG Waveform Simulator & Clinical Decision Support Guidelines',
    ],
  },
];
