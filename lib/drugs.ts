export interface DrugDosingInfo {
  dosePerKg: number;
  unit: string;
  maxDose: number;
  frequency: string;
  notes: {
    en: string;
    id: string;
  };
}

export interface Drug {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  indications: {
    en: string;
    id: string;
  };
  contraindications: {
    en: string;
    id: string;
  };
  dosing: DrugDosingInfo;
}

export const DRUG_DB: Drug[] = [
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNames: ['Panadol', 'Tylenol', 'Sanmol', 'Biogesic'],
    drugClass: 'Analgesic / Antipyretic',
    indications: {
      en: 'Mild to moderate pain, fever.',
      id: 'Nyeri ringan hingga sedang, demam.'
    },
    contraindications: {
      en: 'Severe hepatic impairment.',
      id: 'Gangguan hati berat.'
    },
    dosing: {
      dosePerKg: 15,
      unit: 'mg',
      maxDose: 1000,
      frequency: 'q4-6h PRN',
      notes: {
        en: 'Max 75 mg/kg/day or 4g/day. For fever/pain.',
        id: 'Maks. 75 mg/kg/hari atau 4g/hari. Untuk demam/nyeri.'
      }
    }
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin', 'Proris', 'Farsifen'],
    drugClass: 'NSAID',
    indications: {
      en: 'Mild to moderate pain, inflammation, fever.',
      id: 'Nyeri ringan hingga sedang, peradangan, demam.'
    },
    contraindications: {
      en: 'Active GI bleeding, history of asthma triggered by NSAIDs.',
      id: 'Pendarahan GI aktif, riwayat asma yang dipicu NSAID.'
    },
    dosing: {
      dosePerKg: 10,
      unit: 'mg',
      maxDose: 800,
      frequency: 'q6-8h PRN',
      notes: {
        en: 'Max 40 mg/kg/day or 3.2g/day. Take with food.',
        id: 'Maks. 40 mg/kg/hari atau 3.2g/hari. Konsumsi saat makan.'
      }
    }
  },
  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Amoxsan', 'Lapimox'],
    drugClass: 'Antibiotic',
    indications: {
      en: 'Bacterial infections (e.g., otitis media, strep throat).',
      id: 'Infeksi bakteri (misal: otitis media, radang tenggorokan).'
    },
    contraindications: {
      en: 'Hypersensitivity to penicillins.',
      id: 'Hipersensitivitas terhadap penisilin.'
    },
    dosing: {
      dosePerKg: 40,
      unit: 'mg',
      maxDose: 1000,
      frequency: 'q8h or q12h',
      notes: {
        en: 'Dosing ranges from 40-90 mg/kg/day divided. Check local guidelines.',
        id: 'Dosis berkisar antara 40-90 mg/kg/hari terbagi. Cek pedoman lokal.'
      }
    }
  },
  {
    id: 'cetirizine',
    genericName: 'Cetirizine',
    brandNames: ['Zyrtec', 'Incidal', 'Cetirizine OGB'],
    drugClass: 'Antihistamine',
    indications: {
      en: 'Allergic rhinitis, urticaria.',
      id: 'Rinitis alergi, urtikaria (biduran).'
    },
    contraindications: {
      en: 'Severe renal impairment.',
      id: 'Gangguan ginjal berat.'
    },
    dosing: {
      dosePerKg: 0.25,
      unit: 'mg',
      maxDose: 10,
      frequency: 'q24h',
      notes: {
        en: 'Usually given once daily. Adjust in renal failure.',
        id: 'Biasanya diberikan sekali sehari. Sesuaikan pada gagal ginjal.'
      }
    }
  }
];
