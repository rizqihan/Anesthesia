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
  },
  {
    id: 'propofol',
    genericName: 'Propofol',
    brandNames: ['Diprivan', 'Recofol'],
    drugClass: 'General Anesthetic',
    indications: {
      en: 'Induction and maintenance of general anesthesia, sedation.',
      id: 'Induksi dan pemeliharaan anestesi umum, sedasi.'
    },
    contraindications: {
      en: 'Hypersensitivity to propofol, egg, or soy products.',
      id: 'Hipersensitivitas terhadap propofol, produk telur, atau kedelai.'
    },
    dosing: {
      dosePerKg: 2,
      unit: 'mg',
      maxDose: 200,
      frequency: 'single dose for induction',
      notes: {
        en: 'Induction 1.5-2.5 mg/kg IV. Adjust in elderly/compromised.',
        id: 'Induksi 1.5-2.5 mg/kg IV. Sesuaikan pada lansia/kondisi lemah.'
      }
    }
  },
  {
    id: 'ketamine',
    genericName: 'Ketamine',
    brandNames: ['Ketalar', 'Ivanes'],
    drugClass: 'Dissociative Anesthetic',
    indications: {
      en: 'Induction and maintenance of general anesthesia, acute pain.',
      id: 'Induksi dan pemeliharaan anestesi umum, nyeri akut.'
    },
    contraindications: {
      en: 'Conditions where an increase in blood pressure would be hazardous.',
      id: 'Kondisi di mana peningkatan tekanan darah dapat berbahaya.'
    },
    dosing: {
      dosePerKg: 1.5,
      unit: 'mg',
      maxDose: 150,
      frequency: 'single dose for induction',
      notes: {
        en: 'Induction 1-2 mg/kg IV or 4-10 mg/kg IM. Can cause emergence delirium.',
        id: 'Induksi 1-2 mg/kg IV atau 4-10 mg/kg IM. Dapat menyebabkan delirium siuman.'
      }
    }
  },
  {
    id: 'fentanyl',
    genericName: 'Fentanyl',
    brandNames: ['Sublimaze', 'Durogesic'],
    drugClass: 'Opioid Analgesic',
    indications: {
      en: 'Analgesia during anesthesia, severe pain.',
      id: 'Analgesia selama anestesi, nyeri hebat.'
    },
    contraindications: {
      en: 'Significant respiratory depression, acute/severe asthma.',
      id: 'Depresi pernapasan signifikan, asma akut/berat.'
    },
    dosing: {
      dosePerKg: 0.002,
      unit: 'mg',
      maxDose: 0.1,
      frequency: 'PRN',
      notes: {
        en: '1-2 mcg/kg IV for analgesia. High doses cause chest wall rigidity.',
        id: '1-2 mcg/kg IV untuk analgesia. Dosis tinggi menyebabkan kekakuan dinding dada.'
      }
    }
  },
  {
    id: 'midazolam',
    genericName: 'Midazolam',
    brandNames: ['Versed', 'Dormicum', 'Miloz'],
    drugClass: 'Benzodiazepine',
    indications: {
      en: 'Preoperative sedation, anxiolysis, amnesia.',
      id: 'Sedasi prabedah, ansiolisis, amnesia.'
    },
    contraindications: {
      en: 'Acute narrow-angle glaucoma, severe respiratory insufficiency.',
      id: 'Glaukoma sudut sempit akut, insufisiensi pernapasan berat.'
    },
    dosing: {
      dosePerKg: 0.05,
      unit: 'mg',
      maxDose: 5,
      frequency: 'single dose',
      notes: {
        en: '0.02-0.05 mg/kg IV for premedication. Reduce dose in elderly.',
        id: '0.02-0.05 mg/kg IV untuk premedikasi. Kurangi dosis pada lansia.'
      }
    }
  },
  {
    id: 'ephedrine',
    genericName: 'Ephedrine',
    brandNames: ['Akovaz', 'Corphedrine'],
    drugClass: 'Vasopressor',
    indications: {
      en: 'Treatment of anesthesia-induced hypotension.',
      id: 'Pengobatan hipotensi yang diinduksi anestesi.'
    },
    contraindications: {
      en: 'Closed-angle glaucoma, non-anaphylactic shock.',
      id: 'Glaukoma sudut tertutup, syok non-anafilaksis.'
    },
    dosing: {
      dosePerKg: 0.1,
      unit: 'mg',
      maxDose: 10,
      frequency: 'PRN',
      notes: {
        en: '5-10 mg IV bolus. Tachyphylaxis can occur with repeated doses.',
        id: 'Bolus IV 5-10 mg. Takifilaksis dapat terjadi dengan dosis berulang.'
      }
    }
  },
  {
    id: 'ondansetron',
    genericName: 'Ondansetron',
    brandNames: ['Zofran', 'Narfoz', 'Vomceran'],
    drugClass: 'Antiemetic',
    indications: {
      en: 'Prevention of postoperative nausea and vomiting (PONV).',
      id: 'Pencegahan mual dan muntah pascaoperasi (PONV).'
    },
    contraindications: {
      en: 'Concomitant use with apomorphine.',
      id: 'Penggunaan bersamaan dengan apomorfin.'
    },
    dosing: {
      dosePerKg: 0.1,
      unit: 'mg',
      maxDose: 8,
      frequency: 'q8h',
      notes: {
        en: '4-8 mg IV/PO for PONV prophylaxis. Can prolong QT interval.',
        id: '4-8 mg IV/PO untuk profilaksis PONV. Dapat memperpanjang interval QT.'
      }
    }
  },
  {
    id: 'amlodipine',
    genericName: 'Amlodipine',
    brandNames: ['Norvasc', 'Amlodipine OGB', 'Tensivask'],
    drugClass: 'Calcium Channel Blocker',
    indications: {
      en: 'Hypertension, chronic stable angina.',
      id: 'Hipertensi, angina stabil kronis.'
    },
    contraindications: {
      en: 'Severe hypotension, shock.',
      id: 'Hipotensi berat, syok.'
    },
    dosing: {
      dosePerKg: 0.1,
      unit: 'mg',
      maxDose: 10,
      frequency: 'q24h',
      notes: {
        en: 'Adult dose 5-10 mg once daily. May cause peripheral edema.',
        id: 'Dosis dewasa 5-10 mg sekali sehari. Dapat menyebabkan edema perifer.'
      }
    }
  },
  {
    id: 'metformin',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Gludepatic', 'Metformin OGB'],
    drugClass: 'Biguanide Antidiabetic',
    indications: {
      en: 'Type 2 Diabetes Mellitus.',
      id: 'Diabetes Melitus Tipe 2.'
    },
    contraindications: {
      en: 'Severe renal impairment (eGFR <30), metabolic acidosis.',
      id: 'Gangguan ginjal berat (eGFR <30), asidosis metabolik.'
    },
    dosing: {
      dosePerKg: 10,
      unit: 'mg',
      maxDose: 2000,
      frequency: 'q12h or q8h',
      notes: {
        en: 'Take with meals to reduce GI upset. Monitor B12 and renal function.',
        id: 'Konsumsi saat makan untuk mengurangi gangguan GI. Pantau B12 dan fungsi ginjal.'
      }
    }
  },
  {
    id: 'omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Losec', 'Pumpitor'],
    drugClass: 'Proton Pump Inhibitor (PPI)',
    indications: {
      en: 'GERD, peptic ulcer disease, H. pylori eradication.',
      id: 'GERD, penyakit ulkus peptikum, eradikasi H. pylori.'
    },
    contraindications: {
      en: 'Hypersensitivity to substituted benzimidazoles.',
      id: 'Hipersensitivitas terhadap benzimidazol tersubstitusi.'
    },
    dosing: {
      dosePerKg: 0.5,
      unit: 'mg',
      maxDose: 40,
      frequency: 'q24h',
      notes: {
        en: '20-40 mg PO/IV daily. Give 30-60 min before a meal.',
        id: '20-40 mg PO/IV per hari. Berikan 30-60 menit sebelum makan.'
      }
    }
  },
  {
    id: 'simvastatin',
    genericName: 'Simvastatin',
    brandNames: ['Zocor', 'Simvastatin OGB', 'Detrovel'],
    drugClass: 'HMG-CoA Reductase Inhibitor',
    indications: {
      en: 'Hyperlipidemia, cardiovascular event risk reduction.',
      id: 'Hiperlipidemia, pengurangan risiko kejadian kardiovaskular.'
    },
    contraindications: {
      en: 'Active liver disease, pregnancy.',
      id: 'Penyakit hati aktif, kehamilan.'
    },
    dosing: {
      dosePerKg: 0.5,
      unit: 'mg',
      maxDose: 40,
      frequency: 'q24h',
      notes: {
        en: '10-40 mg taken in the evening. Risk of myopathy increases at 80 mg.',
        id: '10-40 mg diminum pada malam hari. Risiko miopati meningkat pada dosis 80 mg.'
      }
    }
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    brandNames: ['Ventolin', 'Lasal', 'Fartolin'],
    drugClass: 'Short-acting Beta2 Agonist (SABA)',
    indications: {
      en: 'Bronchospasm in asthma and COPD.',
      id: 'Bronkospasme pada asma dan PPOK.'
    },
    contraindications: {
      en: 'Severe hypersensitivity to the drug or formulation components.',
      id: 'Hipersensitivitas berat terhadap obat atau komponen formulasi.'
    },
    dosing: {
      dosePerKg: 0.15,
      unit: 'mg',
      maxDose: 5,
      frequency: 'PRN',
      notes: {
        en: 'Nebulization: 2.5 - 5 mg PRN for acute attacks. May cause tachycardia.',
        id: 'Nebulisasi: 2.5 - 5 mg PRN untuk serangan akut. Dapat menyebabkan takikardia.'
      }
    }
  },
  {
    id: 'ciprofloxacin',
    genericName: 'Ciprofloxacin',
    brandNames: ['Cipro', 'Baquinor', 'Ciprofloxacin OGB'],
    drugClass: 'Fluoroquinolone Antibiotic',
    indications: {
      en: 'UTI, typhoid fever, severe gastroenteritis, respiratory infections.',
      id: 'ISK, demam tifoid, gastroenteritis berat, infeksi pernapasan.'
    },
    contraindications: {
      en: 'Concurrent tizanidine administration, history of myasthenia gravis.',
      id: 'Pemberian bersamaan tizanidine, riwayat miastenia gravis.'
    },
    dosing: {
      dosePerKg: 10,
      unit: 'mg',
      maxDose: 1500,
      frequency: 'q12h',
      notes: {
        en: 'Adults: 500 mg PO BID. Risk of tendon rupture and QT prolongation.',
        id: 'Dewasa: 500 mg PO dua kali sehari. Risiko ruptur tendon dan perpanjangan QT.'
      }
    }
  },
  {
    id: 'dexamethasone',
    genericName: 'Dexamethasone',
    brandNames: ['Decadron', 'Kalmethasone', 'Dexa-M'],
    drugClass: 'Corticosteroid',
    indications: {
      en: 'Inflammatory conditions, severe allergic reactions, PONV prophylaxis.',
      id: 'Kondisi inflamasi, reaksi alergi berat, profilaksis PONV.'
    },
    contraindications: {
      en: 'Systemic fungal infections, cerebral malaria.',
      id: 'Infeksi jamur sistemik, malaria serebral.'
    },
    dosing: {
      dosePerKg: 0.1,
      unit: 'mg',
      maxDose: 10,
      frequency: 'q24h or single dose',
      notes: {
        en: '4-8 mg IV/PO. Tapering required for prolonged use.',
        id: '4-8 mg IV/PO. Penurunan dosis bertahap (tapering) diperlukan untuk penggunaan jangka panjang.'
      }
    }
  },
  {
    id: 'losartan',
    genericName: 'Losartan',
    brandNames: ['Cozaar', 'Acetensa', 'Losartan OGB'],
    drugClass: 'Angiotensin II Receptor Blocker (ARB)',
    indications: {
      en: 'Hypertension, diabetic nephropathy.',
      id: 'Hipertensi, nefropati diabetik.'
    },
    contraindications: {
      en: 'Pregnancy (2nd and 3rd trimesters), concurrent aliskiren in diabetes.',
      id: 'Kehamilan (trimester ke-2 dan ke-3), penggunaan bersamaan aliskiren pada diabetes.'
    },
    dosing: {
      dosePerKg: 0.7,
      unit: 'mg',
      maxDose: 100,
      frequency: 'q24h',
      notes: {
        en: 'Starting dose 50 mg daily. Monitor potassium and renal function.',
        id: 'Dosis awal 50 mg per hari. Pantau kalium dan fungsi ginjal.'
      }
    }
  },
  {
    id: 'aspirin',
    genericName: 'Aspirin',
    brandNames: ['Aspilets', 'Cardio Aspirin', 'Bayer'],
    drugClass: 'Antiplatelet / NSAID',
    indications: {
      en: 'Secondary prevention of MI and stroke, mild pain.',
      id: 'Pencegahan sekunder infark miokard dan stroke, nyeri ringan.'
    },
    contraindications: {
      en: 'Active bleeding, hemophilia, asthma exacerbated by NSAIDs.',
      id: 'Pendarahan aktif, hemofilia, asma yang diperburuk oleh NSAID.'
    },
    dosing: {
      dosePerKg: 1,
      unit: 'mg',
      maxDose: 320,
      frequency: 'q24h',
      notes: {
        en: '80-160 mg daily for cardioprotection. 300-320 mg for acute MI.',
        id: '80-160 mg per hari untuk kardioproteksi. 300-320 mg untuk infark miokard akut.'
      }
    }
  }
];
