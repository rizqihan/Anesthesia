import Dexie, { type EntityTable } from 'dexie';
import type { Drug } from './drugs';
import type { ECGDiagnosisRecord } from './ecgData';

export interface ICD10Record {
  code: string;
  name: string;
  indonesian: string;
}

export interface CPGManagement {
  initialTreatment: { en: string; id: string };
  definitiveTreatment: { en: string; id: string };
  rehab: { en: string; id: string };
  referral: { en: string; id: string };
  workup: { en: string; id: string };
  other?: { en: string; id: string };
}

export interface CPGPrevention {
  pharmacological: { en: string; id: string };
  nonPharmacological: { en: string; id: string };
}

export interface GuidelineRecord {
  id?: number;
  title: { en: string; id: string };
  category: string;
  content?: { en: string; id: string }; // Legacy/unstructured content
  definition?: { en: string; id: string };
  symptoms?: { en: string; id: string };
  physicalExamination?: { en: string; id: string };
  labFindings?: { en: string; id: string };
  differentialDiagnosis?: { en: string; id: string };
  dangerSigns?: { en: string; id: string };
  management?: CPGManagement;
  followUp?: { en: string; id: string };
  prevention?: CPGPrevention;
  caseExample?: { en: string; id: string };
  references?: { en: string; id: string };
  isStructured: boolean;
  lastGenerated?: string;
  pdfUrl?: string;
}

export interface PhysicalExamStep {
  stepNumber: number;
  instruction: { en: string; id: string };
  bodyPartId: string; // e.g. 'head', 'neck', 'chest', 'abdomen', 'arms', 'legs'
  normalFindings: { en: string; id: string };
  abnormalFindings: { en: string; id: string };
}

export interface PhysicalExamRecord {
  id?: number;
  title: { en: string; id: string };
  category: string; // e.g. "Cranial Nerves", "General"
  definition: { en: string; id: string };
  preparation?: { en: string; id: string };
  steps: PhysicalExamStep[];
  lastGenerated?: string;
}

const db = new Dexie('ClinicalAppDB') as Dexie & {
  drugs: EntityTable<Drug, 'id'>;
  icd10: EntityTable<ICD10Record, 'code'>;
  guidelines: EntityTable<GuidelineRecord, 'id'>;
  physicalExams: EntityTable<PhysicalExamRecord, 'id'>;
  ecgDiagnoses: EntityTable<ECGDiagnosisRecord, 'id'>;
};

// Schema declaration
db.version(1).stores({
  drugs: 'id, genericName, drugClass, *brandNames',
  icd10: 'code, name, indonesian',
  guidelines: '++id, title.en, title.id, category'
});

db.version(2).stores({
  drugs: 'id, genericName, drugClass, *brandNames',
  icd10: 'code, name, indonesian',
  guidelines: '++id, title.en, title.id, category, isStructured'
}).upgrade(tx => {
  return tx.table('guidelines').toCollection().modify((guideline: any) => {
    if (guideline.isStructured === undefined) {
      guideline.isStructured = false;
    }
    if (guideline.content && !guideline.definition) {
      guideline.definition = guideline.content;
    }
  });
});

db.version(3).stores({
  drugs: 'id, genericName, drugClass, *brandNames',
  icd10: 'code, name, indonesian',
  guidelines: '++id, title.en, title.id, category, isStructured',
  physicalExams: '++id, title.en, title.id, category'
});

db.version(4).stores({
  drugs: 'id, genericName, drugClass, *brandNames',
  icd10: 'code, name, indonesian',
  guidelines: '++id, title.en, title.id, category, isStructured',
  physicalExams: '++id, title.en, title.id, category',
  ecgDiagnoses: 'id, title.en, title.id, category'
});

export default db;

