export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  highlight?: boolean;
  features: string[];
}

export const APP_VERSION = '2.7.2';
export const BUILD_DATE = '2026-10-25';
export const DB_SCHEMA_VERSION = 9;
export const RELEASE_NAME = 'Push-Dose Epinephrine Multi-Method Stock Precision & Overdose Protection';

export const APP_CHANGELOG: ReleaseNote[] = [
  {
    version: '2.7.0',
    date: '2026-10-25',
    title: 'Argon-Audited Dual-Theme Contrast Precision, Solid Button Protection & Medical Monitor Isolation',
    highlight: true,
    features: [
      'Argon Architectural Overhaul: Comprehensive codebase-wide audit by Gemini-4-Argon eliminating all dark-on-dark, white-on-white, and Frankenstein container regressions across all 14 clinical views',
      'Solid-Accent & Button Contrast Immunity: Guaranteed pure #ffffff text and vector stroke on all solid action buttons (bg-blue-600, bg-rose-600, bg-emerald-600, bg-cyan-600, bg-purple-600), badges, and gradient icon boxes in both Light and Dark modes',
      'Medical Monitor Isolation (data-preserve-dark): Dedicated scotopic black viewport isolation (#030712) for ECG 12-lead rhythm strips, real-time telemetry simulators, POCUS ultrasound cine-loops, and ACLS defibrillator countdown timers',
      'High-Luminance Dual-Theme Dashboard & Emergency Suite: Re-engineered Clinical Command Strip, Active Patient Quick HUD, Crisis Resuscitation Banner, Syringe Pump Titrator, and Antimicrobial Stewardship panels with native light/dark utility pairs',
      'Tailwind v4 @custom-variant dark Binding: Deterministic class-driven theme activation synchronized with user preference across all devices and screen sizes',
    ],
  },
  {
    version: '2.6.1',
    date: '2026-10-24',
    title: 'Clinical Dosage Safety Capping, Reactive State Sync & Pristine Dual-Theme Light Mode',
    highlight: true,
    features: [
      'Strict Clinical Dosage Safety Capping: Enforced hard upper-bound capping at drug.dosing.maxDose across all 163 medications in the pharmacopeia, eliminating overdose risks for extreme patient weights',
      'Reactive Calculation Engine: Real-time dynamic recalculation whenever switching drugs or editing weight, preventing stale calculation carryover from previous medications',
      'Clinical Safety Alert & Formula Breakdown: High-visibility amber warning banner and transparent mathematical step-by-step formula breakdown (Weight × Dose/kg → Capped at Max Dose) when ceiling limits are applied',
      'Pristine Dual-Theme Light Mode Overhaul: Full daylight compatibility across Global App Navigation, Top Header, Patient HUD, Sidebar, Mobile Bottom Bar, Quick Action cards, and all 5 Modal Dialogs (Active Case, Release Notes, SOAP Notes, Command Palette, Result Modal)',
      'Preserved Dark Monitors: Uncompromised clinical authenticity for ECG rhythm strips, simulated telemetry waveforms, and POCUS ultrasound cine-loops via dedicated medical monitor isolation',
      'Dexie Schema v9 Auto-Migration: Seamless client-side IndexedDB auto-migration guaranteeing instantaneous formulary safety parity on all connected devices',
    ],
  },
  {
    version: '2.6.0',
    date: '2026-10-23',
    title: 'Hospital Pharmacopeia Expansion: 163 Multi-Specialty Clinical Drugs',
    highlight: true,
    features: [
      'Comprehensive 163-Drug Hospital Pharmacopeia: Expanded from perioperative anesthesia to full inpatient, outpatient, ICU, and emergency medicine formulary',
      'Cardiovascular & Hypertension Suite: ACE inhibitors (captopril, ramipril, lisinopril), ARBs (losartan, valsartan, candesartan), beta-blockers (propranolol, bisoprolol, carvedilol, metoprolol succinate), CCBs (amlodipine, diltiazem, verapamil), loop/thiazide diuretics (furosemide, spironolactone), ARNI (sacubitril/valsartan), and statins (atorvastatin)',
      'Antithrombotic & Anticoagulant Suite: Antiplatelets (aspirin, clopidogrel, ticagrelor), DOACs (rivaroxaban, apixaban, dabigatran), warfarin, and specific reversal antidotes (phytomenadione/Vit K, idarucizumab)',
      'Endocrine, Diabetes & Thyroid: Insulins (regular, glargine), oral hypoglycemics (metformin, glimepiride, empagliflozin, semaglutide), thyroid management (levothyroxine, propylthiouracil), and systemic glucocorticoids (prednisone)',
      'Broad-Spectrum Antimicrobial Suite: Inpatient and outpatient penicillins, 3rd/4th gen cephalosporins (cefixime, ceftriaxone), fluoroquinolones (ciprofloxacin), macrolides (azithromycin), tetracyclines (doxycycline), antifungals (fluconazole), and antivirals (acyclovir)',
      'Neurology, Psych & Gastroenterology: Anticonvulsants (levetiracetam, valproate, phenytoin, carbamazepine), neuropathic agents (gabapentin), atypical antipsychotics (quetiapine, haloperidol), analgesics (celecoxib, tramadol), PPIs (omeprazole, lansoprazole), cytoprotectives (sucralfate), prokinetics, antispasmodics, and antidotes (N-acetylcysteine)',
      'Multi-Specialty Formulary Filtering & Dexie v8: 17 specialty filter categories with automated client-side IndexedDB migration',
    ],
  },
  {
    version: '2.5.0',
    date: '2026-10-23',
    title: 'Real USG Pathology Atlas, Mannequin Previews & 104-Drug Anesthesia Formulary',
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
