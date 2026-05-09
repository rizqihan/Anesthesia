import Dexie, { type EntityTable } from 'dexie';
import type { Drug } from './drugs';

export interface ICD10Record {
  code: string;
  name: string;
  indonesian: string;
}

export interface GuidelineRecord {
  id?: number;
  title: { en: string; id: string };
  category: string;
  content: { en: string; id: string };
}

const db = new Dexie('ClinicalAppDB') as Dexie & {
  drugs: EntityTable<Drug, 'id'>;
  icd10: EntityTable<ICD10Record, 'code'>;
  guidelines: EntityTable<GuidelineRecord, 'id'>;
};

// Schema declaration
db.version(1).stores({
  drugs: 'id, genericName, drugClass, *brandNames', // Primary key and indexed props
  icd10: 'code, name, indonesian',
  guidelines: '++id, title.en, title.id, category'
});

export default db;
