export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  highlight?: boolean;
  features: string[];
}

export const APP_VERSION = '2.5.0';
export const BUILD_DATE = '2026-10-23';
export const DB_SCHEMA_VERSION = 7;
export const RELEASE_NAME = 'Real POCUS Ultrasound Atlas & Comprehensive 104-Drug Formulary';

export const APP_CHANGELOG: ReleaseNote[] = [
  {
    version: '2.5.0',
    date: '2026-10-23',
    title: 'Real USG Pathology Atlas, Mannequin Previews & 104-Drug Anesthesia Formulary',
    highlight: true,
    features: [
      'Real USG Pathology Atlas & Lightbox: Clinical high-resolution ultrasound captures across eFAST (Morison pouch hemoperitoneum, splenorenal, cardiac tamponade), BLUE (lung sliding vs barcode sign, B-lines, consolidation), FOCUS (tamponade, RV strain), vascular & gastric ultrasound (Perlas classification)',
      'Side-by-Side USG vs Schematic View: Instant toggle comparing real ultrasound scans with labeled anatomical schematics and probe acoustic windows',
      'Massive 104-Drug Formulary Expansion: Expanded from 15 to 104 evidence-based medications spanning intravenous induction, volatiles, paralytics & reversal, opioids, local anesthetics, vasoactives, emergency ACLS, and antiemetics',
      'Enhanced Dosage Calculator & High-Risk Indicators: Integrated dosing parameters (bolus, infusion, max dose) across all 104 drugs with safety alerts and black-box warnings',
      'Physical Exam Atlas Expansion: 12 comprehensive preoperative clinical guides including airway, cardiovascular, neurologic, and regional exams with Dexie v7 auto-migration',
    ],
  },
  {
    version: '2.4.2',
    date: '2026-10-23',
    title: 'Clinical Light Mode, 3-Way Theme Switcher & Daylight Accessibility',
    features: [
      'Comprehensive Light Mode: Hospital-grade, high-contrast daylight theme (#f8fafc slate background, #ffffff elevated cards, #0f172a deep typography) for pre-op clinics, wards, and documentation',
      'Preserved Medical Displays: Authentic black monitor screens (#030712) for real-time ECG rhythm strips, simulated monitors, and POCUS ultrasound cine-loops',
      '3-Mode Segmented Selector: Quick-toggle between Dark (OR/ICU), Light (Clinic/Wards), and System Auto from Top Navigation, Settings Hub, and Command Palette (Cmd+K)',
      'Anti-Flicker Pre-Hydration: Instant zero-flash CSS injection matching user theme preference before DOM rendering',
    ],
  },
  {
    version: '2.4.1',
    date: '2026-10-22',
    title: 'Mobile Persistent HUD & Indonesian (id) SOAP/CPPT Localization',
    features: [
      'Mobile Persistent Clinical HUD: Fixed header sub-bar on phones keeping Patient Parameters, SOAP Note, SBAR PDF, and Crisis buttons visible at all times across all scroll positions',
      'Indonesian SOAP / CPPT Generator: Full bilingual clinical localization ([SUBJEKTIF], [OBJEKTIF], [ASESMEN], [RENCANA / TATALAKSANA]) with PERDATIN/IDI terminology',
      'Bilingual SBAR Handoff PDF: Indonesian localization for Bedside Rounds SBAR Clinical Handoff Sheet ([S] SITUASI, [B] LATAR BELAKANG, [A] ASESMEN, [R] REKOMENDASI)',
      'Command Palette & Settings Hub: Instant 1-tap SOAP and SBAR access in Cmd+K search and Settings documentation section',
    ],
  },
  {
    version: '2.4.0',
    date: '2026-10-22',
    title: 'Dynamic Groq Hub, ASRA Coags & Syringe Pump Titrator',
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
