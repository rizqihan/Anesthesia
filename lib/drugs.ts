export interface DrugDosingInfo {
  dosePerKg: number;
  unit: string;
  maxDose: number;
  frequency: string;
  bolusDose?: string;
  infusionDose?: string;
  notes: {
    en: string;
    id: string;
  };
}

export interface DrugPharmacology {
  onset?: string;
  peak?: string;
  duration?: string;
  metabolism?: string;
  eliminationHalfLife?: string;
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
  onset?: string;
  peak?: string;
  duration?: string;
  metabolism?: string;
  clinicalPearls?: {
    en: string;
    id: string;
  };
  highRisk?: boolean;
  blackBoxWarning?: {
    en: string;
    id: string;
  };
  pharmacology?: DrugPharmacology;
}

export const DRUG_DB: Drug[] = [
  {
    "id": "propofol",
    "genericName": "Propofol (Diprivan)",
    "brandNames": [
      "Diprivan",
      "Recofol",
      "Fresofol",
      "Proanes",
      "Pofol"
    ],
    "drugClass": "IV Hypnotic / General Anesthetic",
    "indications": {
      "en": "Induction and maintenance of general anesthesia, procedural sedation, ICU sedation.",
      "id": "Induksi dan pemeliharaan anestesi umum, sedasi prosedural, sedasi ICU."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to propofol, egg, soy or peanut; severe hemodynamic instability, uncorrected shock.",
      "id": "Hipersensitivitas terhadap propofol, telur, kedelai atau kacang; syok atau instabilitas hemodinamik berat."
    },
    "dosing": {
      "dosePerKg": 2,
      "unit": "mg",
      "maxDose": 250,
      "frequency": "Single IV bolus / Continuous infusion",
      "bolusDose": "Induction: 1.5 - 2.5 mg/kg IV (elderly/ASA III-IV: 1.0 - 1.5 mg/kg)",
      "infusionDose": "TIVA: 50 - 200 mcg/kg/min; ICU sedation: 25 - 75 mcg/kg/min",
      "notes": {
        "en": "Reduce induction dose in elderly and hypovolemic patients. Inject into large vein to minimize burning.",
        "id": "Kurangi dosis induksi pada lansia dan pasien hipovolemik. Suntikkan ke vena besar untuk meminimalkan nyeri suntik."
      }
    },
    "onset": "30 - 45 seconds (1 arm-brain circulation time)",
    "peak": "1 - 2 minutes",
    "duration": "5 - 10 minutes (rapid redistribution)",
    "metabolism": "Rapid hepatic glucuronidation (CYP2B6) & extrahepatic pulmonary/renal clearance. Rapid context-sensitive half-time.",
    "clinicalPearls": {
      "en": "Causes dose-dependent decrease in SVR, MAP, and myocardial contractility. Antiemetic and antipruritic. Risk of PRIS (Propofol Infusion Syndrome) with >4-5 mg/kg/h for >48h.",
      "id": "Menyebabkan penurunan SVR, MAP, dan kontraktilitas miokard. Bersifat antiemetik dan antipruritus. Waspadai PRIS jika infus >4-5 mg/kg/jam selama >48 jam."
    },
    "highRisk": true
  },
  {
    "id": "etomidate",
    "genericName": "Etomidate",
    "brandNames": [
      "Hypnomidate",
      "Etomidate-Lipuro",
      "Amidate"
    ],
    "drugClass": "IV Hypnotic / Imidazole Derivative",
    "indications": {
      "en": "Induction of general anesthesia, especially in hemodynamically unstable, cardiac, or hypovolemic patients.",
      "id": "Induksi anestesi umum, terutama pada pasien dengan instabilitas hemodinamik, penyakit jantung, atau syok hipovolemik."
    },
    "contraindications": {
      "en": "Porphyria, known hypersensitivity to etomidate, severe sepsis where adrenocortical suppression may be lethal without steroid support.",
      "id": "Porfiria, hipersensitivitas, sepsis berat di mana supresi adrenokortikal berbahaya tanpa substitusi kortikosteroid."
    },
    "dosing": {
      "dosePerKg": 0.3,
      "unit": "mg",
      "maxDose": 30,
      "frequency": "Single IV induction dose",
      "bolusDose": "0.2 - 0.3 mg/kg IV slow push over 30-60 seconds",
      "infusionDose": "NOT recommended for maintenance due to prolonged adrenocortical suppression",
      "notes": {
        "en": "Induction dose 0.2 - 0.3 mg/kg IV. Pre-treat with small dose opioid/benzodiazepine to reduce myoclonus.",
        "id": "Dosis induksi 0.2 - 0.3 mg/kg IV. Berikan premedikasi opioid/benzodiazepin untuk mengurangi mioklonus."
      }
    },
    "onset": "15 - 30 seconds",
    "peak": "1 minute",
    "duration": "5 - 15 minutes",
    "metabolism": "Rapid ester hydrolysis by hepatic esterases and plasma cholinesterases into inactive carboxylic acid.",
    "clinicalPearls": {
      "en": "Gold standard induction agent for cardiovascular stability; preserves MAP, cardiac output, and coronary perfusion. Inhibits 11-beta-hydroxylase, suppressing cortisol synthesis for 6-24h after a single dose.",
      "id": "Obat induksi pilihan untuk stabilitas kardiovaskular; mempertahankan MAP dan curah jantung. Menghambat 11-beta-hidroksilase, menekan sintesis kortisol selama 6-24 jam."
    },
    "highRisk": true
  },
  {
    "id": "ketamine",
    "genericName": "Ketamine HCl",
    "brandNames": [
      "Ketalar",
      "Ivanes",
      "KTM",
      "Ketamin Hameln"
    ],
    "drugClass": "Dissociative Anesthetic / NMDA Receptor Antagonist",
    "indications": {
      "en": "Induction/maintenance of anesthesia, acute procedural analgesia, bronchospasm, refractory pain, hemodynamically unstable shock.",
      "id": "Induksi/pemeliharaan anestesi, analgesia prosedural akut, bronkospasme berat, nyeri refrakter, syok hemodinamik."
    },
    "contraindications": {
      "en": "Severe uncontrolled hypertension, aortic dissection, active coronary artery disease, elevated ICP with hypoventilation, open globe injury.",
      "id": "Hipertensi tidak terkontrol berat, diseksi aorta, PJK aktif, peningkatan TIK dengan hipoventilasi, cedera bola mata terbuka."
    },
    "dosing": {
      "dosePerKg": 1.5,
      "unit": "mg",
      "maxDose": 200,
      "frequency": "Single IV/IM dose or titrated infusion",
      "bolusDose": "Induction: 1 - 2 mg/kg IV (or 4 - 6 mg/kg IM); Analgesia: 0.2 - 0.5 mg/kg IV",
      "infusionDose": "Subanesthetic analgesia: 1 - 3 mcg/kg/min; TIVA adjunct: 15 - 45 mcg/kg/min",
      "notes": {
        "en": "Preserves airway reflexes and spontaneous respiration. Causes bronchodilation and sympathetic activation.",
        "id": "Mempertahankan refleks jalan napas dan ventilasi spontan. Menyebabkan bronkodilatasi dan stimulasi simpatis."
      }
    },
    "onset": "IV: 30 - 60 seconds; IM: 3 - 5 minutes",
    "peak": "1 - 3 minutes",
    "duration": "15 - 30 minutes",
    "metabolism": "Hepatic CYP3A4 & CYP2B6 N-demethylation to active norketamine (1/3rd potency), then glucuronidated and renally cleared.",
    "clinicalPearls": {
      "en": "Potent bronchodilator of choice for acute status asthmaticus. Increases HR, BP, and CO via central sympathetic stimulation, but is a direct myocardial depressant in catecholamine-depleted patients. Co-administer midazolam to attenuate emergence delirium.",
      "id": "Bronkodilator poten pilihan untuk asma akut berat. Meningkatkan TD dan HR lewat stimulasi simpatis sentral. Berikan midazolam untuk mencegah delirium pasca-anestesi."
    },
    "highRisk": true
  },
  {
    "id": "methohexital",
    "genericName": "Methohexital Sodium",
    "brandNames": [
      "Brevital Sodium",
      "Brietal"
    ],
    "drugClass": "Ultra-Short-Acting Barbiturate (Oxybarbiturate)",
    "indications": {
      "en": "Induction of anesthesia, short procedural anesthesia, electroconvulsive therapy (ECT).",
      "id": "Induksi anestesi, anestesi tindakan singkat, terapi kejang listrik (ECT)."
    },
    "contraindications": {
      "en": "Acute intermittent porphyria, known barbiturate hypersensitivity, severe asthma.",
      "id": "Porfiria intermiten akut, hipersensitivitas barbiturat, asma berat."
    },
    "dosing": {
      "dosePerKg": 1.5,
      "unit": "mg",
      "maxDose": 150,
      "frequency": "Single IV dose for induction",
      "bolusDose": "1.0 - 1.5 mg/kg IV over 20-30 seconds",
      "infusionDose": "Rarely infused; 0.5 - 2 mg/kg/h",
      "notes": {
        "en": "Lowers seizure threshold, making it the preferred induction agent for ECT.",
        "id": "Menurunkan ambang kejang, menjadikannya agen induksi pilihan untuk ECT."
      }
    },
    "onset": "20 - 30 seconds",
    "peak": "45 - 60 seconds",
    "duration": "5 - 10 minutes",
    "metabolism": "Extensive hepatic oxidation (clearance 3-4x faster than thiopental).",
    "clinicalPearls": {
      "en": "Gold standard for ECT because it produces longer and more robust therapeutic seizure activity than propofol or etomidate. May cause involuntary myoclonic twitches, hiccups, and localized injection pain.",
      "id": "Standar emas untuk terapi ECT karena menghasilkan durasi kejang terapeutik yang lebih baik dibanding propofol. Dapat menyebabkan mioklonus dan cegukan."
    },
    "highRisk": true
  },
  {
    "id": "thiopental",
    "genericName": "Thiopental Sodium",
    "brandNames": [
      "Pentothal",
      "Tiopol",
      "Thiopentone"
    ],
    "drugClass": "Ultra-Short-Acting Barbiturate (Thiobarbiturate)",
    "indications": {
      "en": "Induction of general anesthesia, neuroprotection / burst suppression, refractory status epilepticus.",
      "id": "Induksi anestesi umum, proteksi serebral / burst suppression, status epileptikus refrakter."
    },
    "contraindications": {
      "en": "Acute intermittent porphyria or variegate porphyria, severe status asthmaticus, severe shock / uncorrected hypovolemia.",
      "id": "Porfiria intermiten akut atau variegate, status asmatikus berat, syok hipovolemik berat."
    },
    "dosing": {
      "dosePerKg": 4,
      "unit": "mg",
      "maxDose": 500,
      "frequency": "Single IV bolus / Titrated infusion for EEG burst suppression",
      "bolusDose": "Induction: 3 - 5 mg/kg IV (reduce to 1.5 - 2.5 mg/kg in shock/elderly)",
      "infusionDose": "Neuroprotection / Refractory status epilepticus: 1.5 - 5 mg/kg/h",
      "notes": {
        "en": "Extremely alkaline (pH ~10.5). Accidental intra-arterial or extravascular injection causes severe chemical endarteritis, vasospasm, and gangrene.",
        "id": "Sangat basa (pH ~10.5). Injeksi intra-arteri atau ekstravasasi tidak sengaja memicu endarteritis kimiawi, vasospasme hebat, dan gangren."
      }
    },
    "onset": "30 - 45 seconds",
    "peak": "1 minute",
    "duration": "5 - 10 minutes (single dose; long accumulation on repeat dosing)",
    "metabolism": "Hepatic oxidation to hydroxythiopental and carboxylic acids. High context-sensitive half-time due to extensive fat redistribution.",
    "clinicalPearls": {
      "en": "Potent cerebral vasoconstrictor; markedly reduces CMRO2, cerebral blood flow (CBF), and ICP. Potent myocardial depressant and venodilator. Accidental intra-arterial injection must be treated immediately with papaverine, lidocaine, heparin, and sympathetic block.",
      "id": "Vasokonstriktor serebral poten; sangat menurunkan CMRO2 dan TIK. Depresan miokard kuat. Jika terjadi injeksi intra-arteri, segera berikan papaverin, lidokain, dan heparin."
    },
    "highRisk": true
  },
  {
    "id": "succinylcholine",
    "genericName": "Succinylcholine (Suxamethonium)",
    "brandNames": [
      "Quelicin",
      "Scoline",
      "Anectine",
      "Midarine"
    ],
    "drugClass": "Depolarizing Neuromuscular Blocker",
    "indications": {
      "en": "Rapid sequence intubation (RSI), full stomach intubation, emergency airway securing.",
      "id": "Intubasi sekuens cepat (RSI), intubasi lambung penuh, penanganan jalan napas darurat."
    },
    "contraindications": {
      "en": "Personal or family history of Malignant Hyperthermia, denervation injuries (>24-48h post burn, spinal cord injury, stroke), severe hyperkalemia (>5.5 mEq/L), muscular dystrophy (Duchenne), atypical pseudocholinesterase.",
      "id": "Riwayat hipertermia maligna (MH), cedera denervasi saraf/luka bakar >24-48 jam, hiperkalemia berat, distrofi otot Duchenne, defisiensi kolinesterase plasma."
    },
    "dosing": {
      "dosePerKg": 1.5,
      "unit": "mg",
      "maxDose": 150,
      "frequency": "Single IV/IM dose for intubation",
      "bolusDose": "Adult RSI: 1.0 - 1.5 mg/kg IV; Pediatric: 1.5 - 2.0 mg/kg IV; IM: 3 - 4 mg/kg",
      "notes": {
        "en": "Produces muscle fasciculations followed by flaccid paralysis within 45-60 seconds. Causes transient K+ rise of 0.5-1.0 mEq/L.",
        "id": "Menimbulkan fasikulasi otot diikuti paralisis flaksid dalam 45-60 detik. Meningkatkan kalium serum sebesar 0.5-1.0 mEq/L."
      }
    },
    "onset": "30 - 60 seconds",
    "peak": "1 - 2 minutes",
    "duration": "5 - 10 minutes",
    "metabolism": "Rapid hydrolysis by plasma butyrylcholinesterase (pseudocholinesterase) into succinylmonocholine and choline.",
    "clinicalPearls": {
      "en": "Trigger for Malignant Hyperthermia! Can trigger cardiac arrest in children with undiagnosed myopathies. Repeat dosing or pediatric first dose causes severe vagal bradycardia (pre-treat with atropine). Do NOT give neostigmine for Phase I block.",
      "id": "Pemicu Hipertermia Maligna (MH)! Dapat memicu henti jantung hiperkalemik pada distrofi otot anak. Dosis ulang memicu bradikardia hebat (berikan atropin). Jangan berikan neostigmin pada blok Fase I."
    },
    "highRisk": true
  },
  {
    "id": "rocuronium",
    "genericName": "Rocuronium Bromide",
    "brandNames": [
      "Esmeron",
      "Roculax",
      "Zemuron"
    ],
    "drugClass": "Non-Depolarizing NMB (Amino-steroid)",
    "indications": {
      "en": "Endotracheal intubation, rapid sequence induction (RSI), surgical muscle relaxation.",
      "id": "Intubasi endotrakeal, induksi sekuens cepat (RSI), relaksasi otot durante operasi."
    },
    "contraindications": {
      "en": "Known hypersensitivity to rocuronium or bromide salts.",
      "id": "Hipersensitivitas terhadap rokuronium atau ion bromida."
    },
    "dosing": {
      "dosePerKg": 0.6,
      "unit": "mg",
      "maxDose": 100,
      "frequency": "Initial intubation bolus; maintenance 0.1 - 0.2 mg/kg PRN",
      "bolusDose": "Standard intubation: 0.6 mg/kg IV; RSI intubation: 1.0 - 1.2 mg/kg IV",
      "infusionDose": "Continuous infusion: 5 - 12 mcg/kg/min",
      "notes": {
        "en": "At 1.2 mg/kg, provides intubating conditions in 60 seconds (succinylcholine equivalent) without hyperkalemic or MH risks.",
        "id": "Pada dosis 1.2 mg/kg, menghasilkan kondisi intubasi dalam 60 detik (setara suksinilkolin) tanpa risiko hiperkalemia atau MH."
      }
    },
    "onset": "Standard: 90 sec; RSI (1.2 mg/kg): 60 seconds",
    "peak": "2 - 3 minutes",
    "duration": "30 - 60 minutes (RSI dose up to 75-90 minutes)",
    "metabolism": "Primarily hepatic uptake and biliary excretion (~70%); renal excretion (~20-30%). No active metabolites.",
    "clinicalPearls": {
      "en": "Fastest onset of all non-depolarizing agents. Highly selective and specific reversal with Sugammadex (2, 4, or 16 mg/kg for immediate rescue). Prolonged block duration in hepatic cirrhosis and severe renal impairment.",
      "id": "Onset tercepat di antara pelemas otot non-depolarisasi. Dapat dibalikkan seketika oleh Sugammadex (2, 4, atau 16 mg/kg). Durasi memanjang pada sirosis hepatis."
    },
    "highRisk": true
  },
  {
    "id": "vecuronium",
    "genericName": "Vecuronium Bromide",
    "brandNames": [
      "Norcuron",
      "Ecron",
      "Vecuron"
    ],
    "drugClass": "Non-Depolarizing NMB (Amino-steroid)",
    "indications": {
      "en": "Surgical muscle relaxation, endotracheal intubation, ICU paralysis.",
      "id": "Relaksasi otot operasi, intubasi endotrakeal, paralisis ICU."
    },
    "contraindications": {
      "en": "Hypersensitivity to vecuronium or bromides.",
      "id": "Hipersensitivitas terhadap vekuronium atau bromida."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Initial bolus; maintenance 0.015 - 0.02 mg/kg q20-30m",
      "bolusDose": "Intubation: 0.08 - 0.1 mg/kg IV; Maintenance: 0.015 - 0.02 mg/kg IV",
      "infusionDose": "Continuous infusion: 0.8 - 1.2 mcg/kg/min",
      "notes": {
        "en": "Remarkable cardiovascular stability with zero histamine release and no vagolytic tachycardia.",
        "id": "Stabilitas kardiovaskular luar biasa tanpa pelepasan histamin dan tanpa takikardia vagolitik."
      }
    },
    "onset": "2.5 - 3 minutes",
    "peak": "3 - 5 minutes",
    "duration": "30 - 45 minutes",
    "metabolism": "Hepatic deacetylation (3-desacetylvecuronium has 50% potency); 40% biliary and 40% renal elimination.",
    "clinicalPearls": {
      "en": "Zero hemodynamic alteration (no change in HR or BP). Active metabolite (3-desacetyl) can accumulate in prolonged ICU infusions with renal failure, causing prolonged quadriplegia. Reversible with Sugammadex or Neostigmine.",
      "id": "Stabilitas hemodinamik tanpa perubahan TD/HR. Metabolit aktif dapat terakumulasi pada gagal ginjal di ICU. Dapat dinetralkan dengan Sugammadex atau Neostigmin."
    },
    "highRisk": true
  },
  {
    "id": "cisatracurium",
    "genericName": "Cisatracurium Besylate",
    "brandNames": [
      "Nimbex",
      "Cisatracurium Hameln"
    ],
    "drugClass": "Non-Depolarizing NMB (Benzylisoquinolinium)",
    "indications": {
      "en": "Neuromuscular blockade in patients with renal or hepatic failure; ARDS ICU paralysis.",
      "id": "Relaksasi neuromuskular pada pasien gagal ginjal atau hati berat; paralisis ARDS di ICU."
    },
    "contraindications": {
      "en": "Known hypersensitivity to cisatracurium or besylate.",
      "id": "Hipersensitivitas terhadap cisatrakurium atau garam besilat."
    },
    "dosing": {
      "dosePerKg": 0.15,
      "unit": "mg",
      "maxDose": 20,
      "frequency": "Initial intubation bolus; maintenance 0.03 mg/kg",
      "bolusDose": "Intubation: 0.15 - 0.2 mg/kg IV; Maintenance: 0.03 mg/kg IV",
      "infusionDose": "ICU ARDS / OR infusion: 1 - 3 mcg/kg/min",
      "notes": {
        "en": "Undergoes organ-independent Hofmann elimination. Safe in end-stage renal and liver failure.",
        "id": "Mengalami eliminasi Hofmann yang tidak bergantung pada organ. Aman untuk gagal ginjal dan hati terminal."
      }
    },
    "onset": "2 - 3 minutes",
    "peak": "3 - 5 minutes",
    "duration": "40 - 60 minutes",
    "metabolism": "Organ-independent Hofmann degradation (spontaneous chemical breakdown at physiologic temperature and pH) and plasma esterases.",
    "clinicalPearls": {
      "en": "Agent of choice in renal or hepatic impairment. Produces minimal laudanosine and no clinically significant histamine release (unlike atracurium). NOT reversible with Sugammadex (requires neostigmine/glycopyrrolate).",
      "id": "Pilihan utama pada gagal ginjal atau hati berat. Tidak melepaskan histamin. TIDAK DAPAT dinetralkan oleh Sugammadex (harus memakai neostigmin)."
    },
    "highRisk": true
  },
  {
    "id": "pancuronium",
    "genericName": "Pancuronium Bromide",
    "brandNames": [
      "Pavulon"
    ],
    "drugClass": "Long-Acting Non-Depolarizing NMB (Amino-steroid)",
    "indications": {
      "en": "Long-duration surgical neuromuscular blockade (e.g. major cardiac or thoracic cases).",
      "id": "Relaksasi neuromuskular durasi panjang (misal bedah toraks atau jantung lama)."
    },
    "contraindications": {
      "en": "Renal failure, coronary artery disease where tachycardia is harmful, bromide allergy.",
      "id": "Gagal ginjal, penyakit arteri koroner di mana takikardia berbahaya, alergi bromida."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Bolus for intubation / maintenance 0.02 mg/kg q60-90m",
      "bolusDose": "0.08 - 0.1 mg/kg IV",
      "notes": {
        "en": "Long-acting agent (60-100 min). Causes vagolytic tachycardia and moderate rise in MAP.",
        "id": "Pelemas otot kerja panjang (60-100 menit). Menyebabkan takikardia vagolitik dan peningkatan MAP."
      }
    },
    "onset": "3 - 5 minutes",
    "peak": "5 minutes",
    "duration": "60 - 100+ minutes",
    "metabolism": "80% eliminated unchanged via renal excretion; 10-20% hepatic.",
    "clinicalPearls": {
      "en": "Vagolytic property causes tachycardia and sympathetic release; beneficial in pediatric cardiac surgery to offset bradycardia, but hazardous in adults with ischemic heart disease. Severely accumulates in renal insufficiency.",
      "id": "Menghambat reseptor muskarinik SA node sehingga memicu takikardia. Berbahaya bagi pasien penyakit jantung koroner. Terakumulasi berat pada gagal ginjal."
    },
    "highRisk": true
  },
  {
    "id": "sugammadex",
    "genericName": "Sugammadex Sodium",
    "brandNames": [
      "Bridion"
    ],
    "drugClass": "Selective Relaxant Binding Agent (Modified Gamma-Cyclodextrin)",
    "indications": {
      "en": "Rapid reversal of neuromuscular blockade induced by rocuronium or vecuronium.",
      "id": "Pemulihan cepat blokade neuromuskular yang diinduksi rokuronium atau vekuronium."
    },
    "contraindications": {
      "en": "Severe renal impairment (CrCl < 30 mL/min or dialysis), known hypersensitivity.",
      "id": "Gangguan ginjal berat (CrCl < 30 mL/menit atau dialisis), hipersensitivitas."
    },
    "dosing": {
      "dosePerKg": 2,
      "unit": "mg",
      "maxDose": 1500,
      "frequency": "Single IV bolus based on twitch depth",
      "bolusDose": "Moderate block (T2 reappearance): 2 mg/kg IV; Deep block (PTC 1-2): 4 mg/kg IV; Immediate rescue after 1.2 mg/kg rocuronium: 16 mg/kg IV",
      "notes": {
        "en": "Directly encapsulates rocuronium/vecuronium molecules in a 1:1 ratio. No cholinergic side effects.",
        "id": "Mengenkapsulasi molekul rokuronium/vekuronium 1:1. Tidak memiliki efek samping kolinergik."
      }
    },
    "onset": "< 2 minutes (immediate encapsulation)",
    "peak": "2 - 3 minutes",
    "duration": "Permanent encapsulation complex excreted renally",
    "metabolism": "Excreted unchanged in urine as 1:1 guest-host cyclodextrin inclusion complex.",
    "clinicalPearls": {
      "en": "Only works for rocuronium and vecuronium (zero effect on cisatracurium or succinylcholine). Inactivates hormonal contraceptives—counsel female patients to use backup barrier contraception for 7 days. Can cause transient bradycardia.",
      "id": "Hanya bekerja pada rokuronium dan vekuronium (tidak berpengaruh pada cisatrakurium). Menetralkan kontrasepsi hormonal oral—sarankan kontrasepsi mekanik selama 7 hari."
    },
    "highRisk": false
  },
  {
    "id": "neostigmine",
    "genericName": "Neostigmine Methylsulfate",
    "brandNames": [
      "Prostigmin",
      "Neostigmine Hameln"
    ],
    "drugClass": "Anticholinesterase / NMB Reversal Agent",
    "indications": {
      "en": "Reversal of non-depolarizing neuromuscular blockade (only when minimum 4 twitches with fade or TOF > 0.2 present).",
      "id": "Pembalikan relaksasi otot non-depolarisasi (hanya bila minimal 4 kedutan TOF atau TOF > 0.2 terdeteksi)."
    },
    "contraindications": {
      "en": "Mechanical GI or urinary obstruction, peritonitis, complete absence of twitches (TOF 0), succinylcholine block.",
      "id": "Obstruksi mekanik saluran cerna/kemih, peritonitis, ketiadaan kedutan (TOF 0), blok suksinilkolin."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "mg",
      "maxDose": 5,
      "frequency": "Single IV dose ALWAYS co-administered with glycopyrrolate or atropine",
      "bolusDose": "0.03 - 0.07 mg/kg IV (max 5 mg) paired with Glycopyrrolate 0.2 mg per 1 mg neostigmine",
      "notes": {
        "en": "Must NEVER be administered without an antimuscarinic (glycopyrrolate or atropine) to prevent life-threatening bradycardia.",
        "id": "JANGAN PERNAH diberikan tanpa antimuskarinik (glikopirolat atau atropin) untuk mencegah henti jantung akibat bradikardia berat."
      }
    },
    "onset": "3 - 5 minutes",
    "peak": "7 - 10 minutes",
    "duration": "60 - 90 minutes",
    "metabolism": "Plasma esterases and 50% renal excretion.",
    "clinicalPearls": {
      "en": "Inhibits acetylcholinesterase, flooding synaptic cleft with ACh. Has a ceiling effect; cannot reverse deep/dense neuromuscular block (administering at TOF 0 causes paradoxical depolarizing weakness). Co-administer glycopyrrolate or atropine.",
      "id": "Menghambat asetilkolinesterase. Memiliki ceiling effect; tidak dapat memulihkan blok dalam (TOF 0). Wajib diberikan bersama glikopirolat atau atropin."
    },
    "highRisk": true
  },
  {
    "id": "glycopyrrolate",
    "genericName": "Glycopyrrolate",
    "brandNames": [
      "Robinul",
      "Glyco Hameln"
    ],
    "drugClass": "Synthetic Quaternary Anticholinergic / Antimuscarinic",
    "indications": {
      "en": "Co-administration with neostigmine to prevent muscarinic bradycardia; antisialagogue; intraoperative bradycardia.",
      "id": "Diberikan bersama neostigmin untuk mencegah bradikardia; mengurangi sekresi ludah; bradikardia intraoperatif."
    },
    "contraindications": {
      "en": "Narrow-angle glaucoma, severe tachycardia, obstructive uropathy, toxic megacolon.",
      "id": "Glaukoma sudut sempit, takikardia berat, uropati obstruktif, megakolon toksik."
    },
    "dosing": {
      "dosePerKg": 0.01,
      "unit": "mg",
      "maxDose": 1,
      "frequency": "IV bolus with neostigmine or PRN bradycardia",
      "bolusDose": "0.2 mg IV for every 1.0 mg of Neostigmine; Bradycardia/secretions: 0.1 - 0.2 mg IV",
      "notes": {
        "en": "Quaternary amine that DOES NOT cross the blood-brain barrier or placenta, preventing central anticholinergic delirium.",
        "id": "Amina kuaterner yang TIDAK menembus sawar darah otak atau plasenta, mencegah delirium antikolinergik sentral."
      }
    },
    "onset": "1 minute IV",
    "peak": "3 - 5 minutes",
    "duration": "2 - 4 hours (antisialagogue effect up to 6-8h)",
    "metabolism": "Excreted mostly unchanged in urine and bile.",
    "clinicalPearls": {
      "en": "Matches neostigmine onset and duration far better than atropine, resulting in smoother heart rate control without violent tachycardia. Safe in pregnancy and elderly (no central confusion).",
      "id": "Profil onset dan durasi sangat cocok dengan neostigmin dibanding atropin, menghasilkan stabilitas laju jantung yang mulus tanpa takikardia liar."
    },
    "highRisk": false
  },
  {
    "id": "atropine",
    "genericName": "Atropine Sulfate",
    "brandNames": [
      "Atropine Sulfate OGB",
      "Atropin Ethica"
    ],
    "drugClass": "Natural Tertiary Anticholinergic / Antimuscarinic",
    "indications": {
      "en": "Hemodynamically unstable sinus bradycardia, organophosphate poisoning antidote, reversal pairing with neostigmine.",
      "id": "Sinus bradikardia simptomatis tidak stabil, antidotum keracunan organofosfat, pembalikan NMB bersama neostigmin."
    },
    "contraindications": {
      "en": "Acute narrow-angle glaucoma, severe obstructive GI disease, thyrotoxicosis.",
      "id": "Glaukoma sudut sempit akut, penyakit obstruktif saluran cerna berat, tirotoksikosis."
    },
    "dosing": {
      "dosePerKg": 0.02,
      "unit": "mg",
      "maxDose": 3,
      "frequency": "IV bolus q3-5min PRN (max 3 mg total in bradycardia)",
      "bolusDose": "Bradycardia: 0.5 - 1.0 mg IV q3-5min (max 3 mg); Pediatric: 0.02 mg/kg (min dose 0.1 mg)",
      "notes": {
        "en": "Doses <0.1 mg in pediatrics or <0.5 mg in adults can cause paradoxical bradycardia via central medullary stimulation.",
        "id": "Dosis <0.1 mg pada anak atau <0.5 mg pada dewasa dapat memicu bradikardia paradoksikal akibat stimulasi vagal meduler sentral."
      }
    },
    "onset": "45 - 60 seconds IV",
    "peak": "2 - 4 minutes",
    "duration": "1 - 2 hours",
    "metabolism": "Hepatic hydrolysis (50%), remaining 50% excreted unchanged in urine.",
    "clinicalPearls": {
      "en": "Tertiary amine that easily penetrates blood-brain barrier and placenta; can induce Central Anticholinergic Syndrome (agitation, hallucination, dry mouth, mydriasis, hyperthermia)—treated with Physostigmine. Drug of choice for ACLS symptomatic bradycardia.",
      "id": "Amina tersier yang menembus sawar darah otak; dapat memicu sindrom antikolinergik sentral (antidotum: Fisostigmin). Obat pilihan pertama ACLS untuk bradikardia simptomatis."
    },
    "highRisk": true
  },
  {
    "id": "sevoflurane",
    "genericName": "Sevoflurane",
    "brandNames": [
      "Sevorane",
      "Sojourn",
      "Sevoflurane Baxter"
    ],
    "drugClass": "Volatile Inhalation Anesthetic (Fluorinated Ether)",
    "indications": {
      "en": "Inhalation induction and maintenance of general anesthesia in adults and pediatrics.",
      "id": "Induksi inhalasi dan pemeliharaan anestesi umum pada pasien dewasa dan anak."
    },
    "contraindications": {
      "en": "Personal or family history of Malignant Hyperthermia, known halogenated hepatitis.",
      "id": "Riwayat pribadi atau keluarga mengalami Hipertermia Maligna (MH), hepatitis anestesi halogen."
    },
    "dosing": {
      "dosePerKg": 1,
      "unit": "vol%",
      "maxDose": 8,
      "frequency": "Continuous inhalation titration via calibrated vaporizer",
      "bolusDose": "Inhalation induction: 4.0 - 8.0 vol% with O2/air; Maintenance: 1.0 - 3.0 vol%",
      "notes": {
        "en": "Adult MAC ~2.05% in 100% O2 (~1.1% in 60% N2O). Minimum fresh gas flow 1-2 L/min to prevent Compound A accumulation.",
        "id": "MAC dewasa ~2.05% dalam 100% O2 (~1.1% dalam 60% N2O). Pertahankan aliran gas segar (FGF) minimal 1-2 L/menit."
      }
    },
    "onset": "1 - 2 minutes (blood:gas partition coefficient 0.65)",
    "peak": "Rapid alveolar-brain equilibration",
    "duration": "Emergence within 5 - 10 minutes after cessation",
    "metabolism": "Hepatic CYP2E1 (2-5%) to hexafluoroisopropanol (HFIP) and inorganic fluoride. Reacts with desiccated CO2 absorbents to form Compound A.",
    "clinicalPearls": {
      "en": "Sweet, non-pungent odor makes it the undisputed gold standard for mask induction in pediatric patients. Minimal airway irritation. Potent trigger of Malignant Hyperthermia! Treat acute MH crisis immediately with Dantrolene 2.5 mg/kg IV.",
      "id": "Aroma harum dan tidak menyengat menjadikannya standar emas induksi masker pada anak. Pemicu poten Hipertermia Maligna (MH)! Jika terjadi krisis MH, segera beri Dantrolene 2.5 mg/kg IV."
    },
    "highRisk": true
  },
  {
    "id": "desflurane",
    "genericName": "Desflurane",
    "brandNames": [
      "Suprane"
    ],
    "drugClass": "Volatile Inhalation Anesthetic (Methyl Ethyl Ether)",
    "indications": {
      "en": "Maintenance of general anesthesia; ultra-rapid emergence in prolonged or bariatric surgery.",
      "id": "Pemeliharaan anestesi umum; pemulihan ultra-cepat pada bedah lama atau bariatrik."
    },
    "contraindications": {
      "en": "Malignant Hyperthermia susceptibility, inhalation mask induction in pediatrics/adults, severe reactive airway disease.",
      "id": "Kerentanan Hipertermia Maligna (MH), induksi masker inhalasi, penyakit saluran napas reaktif berat."
    },
    "dosing": {
      "dosePerKg": 1,
      "unit": "vol%",
      "maxDose": 12,
      "frequency": "Continuous inhalation titration via heated Tec 6 vaporizer",
      "bolusDose": "Maintenance: 3.0 - 8.5 vol% (Adult MAC ~6.0% in O2, ~2.8% in 60% N2O)",
      "notes": {
        "en": "High vapor pressure (boils at 22.8°C at 1 atm); requires special heated, pressurized vaporizer.",
        "id": "Tekanan uap tinggi (mendidih pada 22.8°C); memerlukan vaporizer khusus berpemanas dan bertekanan (Tec 6)."
      }
    },
    "onset": "1 - 2 minutes (lowest blood:gas partition coefficient 0.42)",
    "peak": "Near-instantaneous alveolar-brain equilibrium",
    "duration": "Emergence in 3 - 5 minutes, independent of surgical duration",
    "metabolism": "Extremely minimal hepatic metabolism (<0.02%).",
    "clinicalPearls": {
      "en": "Ultra-low solubility enables rapid titration and exceptionally fast emergence even after 10+ hour cases. Highly pungent; strictly contraindicated for mask induction (triggers coughing, breath-holding, laryngospasm). Rapid concentration increases cause sympathetic tachycardia and hypertension. MH trigger.",
      "id": "Kelarutan darah sangat rendah menghasilkan siuman super cepat pasca bedah lama. Sangat menyengat; jangan dipakai untuk induksi masker (memicu laringospasme). Pemicu Hipertermia Maligna."
    },
    "highRisk": true
  },
  {
    "id": "isoflurane",
    "genericName": "Isoflurane",
    "brandNames": [
      "Forane",
      "Aerrane",
      "Terrell"
    ],
    "drugClass": "Volatile Inhalation Anesthetic (Halogenated Ether)",
    "indications": {
      "en": "Maintenance of general anesthesia, neuroanesthesia, cardioprotective preconditioning.",
      "id": "Pemeliharaan anestesi umum, bedah saraf, pengkondisian awal kardioproteksi."
    },
    "contraindications": {
      "en": "Malignant Hyperthermia susceptibility, history of halogenated hepatitis.",
      "id": "Kerentanan Hipertermia Maligna, riwayat hepatitis akibat anestesi inhalasi."
    },
    "dosing": {
      "dosePerKg": 1,
      "unit": "vol%",
      "maxDose": 3.5,
      "frequency": "Continuous inhalation titration via calibrated vaporizer",
      "bolusDose": "Maintenance: 1.0 - 2.5 vol% (Adult MAC ~1.15% in O2, ~0.5% in 60% N2O)",
      "notes": {
        "en": "Preserves cerebral autoregulation at <1 MAC; reduces CMRO2. Robust cardioprotective preconditioning.",
        "id": "Mempertahankan autoregulasi serebral pada <1 MAC; menurunkan konsumsi oksigen otak (CMRO2)."
      }
    },
    "onset": "3 - 5 minutes (blood:gas coefficient 1.46)",
    "peak": "5 - 10 minutes",
    "duration": "15 - 30 minutes emergence depending on case length",
    "metabolism": "Extremely resistant to hepatic metabolism (<0.2% metabolized via CYP2E1).",
    "clinicalPearls": {
      "en": "Excellent and economical agent for long neurosurgical cases due to profound reduction in CMRO2 and brain relaxation. Pungent odor precludes mask induction. Theoretical coronary steal syndrome by dilating small coronary resistance arterioles. Trigger for Malignant Hyperthermia.",
      "id": "Agen ekonomis dan sangat stabil untuk bedah saraf karena menurunkan CMRO2 secara signifikan. Beraroma menyengat. Pemicu Hipertermia Maligna."
    },
    "highRisk": true
  },
  {
    "id": "nitrous-oxide",
    "genericName": "Nitrous Oxide (N2O)",
    "brandNames": [
      "Medical Nitrous Oxide",
      "Entonox (50:50 with O2)"
    ],
    "drugClass": "Inorganic Inhalational Anesthetic Gas / NMDA Antagonist",
    "indications": {
      "en": "Anesthetic adjuvant, second gas effect facilitator, labor analgesia (Entonox).",
      "id": "Ajuvan anestesi umum, fasilitasi second gas effect, analgesia persalinan (Entonox)."
    },
    "contraindications": {
      "en": "Closed air spaces (pneumothorax, bowel obstruction, air embolism, middle ear surgery, ocular gas bubble C3F8/SF6 within 30-90 days), severe pulmonary hypertension, severe vitamin B12 deficiency.",
      "id": "Rongga udara tertutup (pneumotoraks, ileus obstruktif, emboli udara, pasca bedah cangkok telinga tengah, gas bola mata C3F8/SF6 dalam 30-90 hari), hipertensi pulmonal berat."
    },
    "dosing": {
      "dosePerKg": 1,
      "unit": "vol%",
      "maxDose": 70,
      "frequency": "Continuous inhalation with minimum 30% oxygen",
      "bolusDose": "50 - 70 vol% co-administered with oxygen (MAC ~104%)",
      "notes": {
        "en": "34x more soluble than nitrogen; rapidly diffuses into closed gas spaces causing dangerous expansion.",
        "id": "34 kali lebih larut dibanding nitrogen; berdifusi cepat ke rongga tertutup dan memperluas volumenya."
      }
    },
    "onset": "< 1 minute (blood:gas coefficient 0.47)",
    "peak": "1 - 2 minutes",
    "duration": "2 - 3 minutes after discontinuation",
    "metabolism": "0.004% metabolized by reductive gut bacteria.",
    "clinicalPearls": {
      "en": "Produces second gas effect and concentration effect accelerating companion volatile agent uptake. Inactivates methionine synthase (Vitamin B12 pathway). MUST administer 100% O2 for 5 minutes after turning off N2O to prevent Diffusion Hypoxia (Fink effect).",
      "id": "Menghasilkan efek gas kedua yang mempercepat induksi agen inhalasi lain. Wajib berikan oksigen 100% selama 5 menit pasca penghentian untuk mencegah Hipoksia Difusi (Fink effect)."
    },
    "highRisk": true
  },
  {
    "id": "fentanyl",
    "genericName": "Fentanyl Citrate",
    "brandNames": [
      "Sublimaze",
      "Durogesic",
      "Fentanyl OGB",
      "Fentanyl Hameln"
    ],
    "drugClass": "Synthetic Phenylpiperidine Opioid Analgesic",
    "indications": {
      "en": "Intraoperative analgesia, induction hemodynamic blunting, balanced general anesthesia, severe acute pain.",
      "id": "Analgesia intraoperatif, peredam lonjakan hemodinamik saat intubasi, anestesi berimbang, nyeri akut berat."
    },
    "contraindications": {
      "en": "Acute severe respiratory depression, severe bronchial asthma, hypersensitivity to fentanyl.",
      "id": "Depresi pernapasan berat akut, asma bronkial berat, hipersensitivitas fentanil."
    },
    "dosing": {
      "dosePerKg": 0.002,
      "unit": "mg",
      "maxDose": 0.25,
      "frequency": "IV bolus q30-60min PRN or continuous infusion",
      "bolusDose": "Analgesia: 1 - 2 mcg/kg IV (0.001 - 0.002 mg/kg); Intubation blunting: 2 - 5 mcg/kg IV",
      "infusionDose": "ICU / OR infusion: 1 - 3 mcg/kg/h",
      "notes": {
        "en": "100x more potent than morphine. Rapid IV bolus can cause chest wall rigidity (wooden chest).",
        "id": "100 kali lebih poten dibanding morfin. Bolus cepat dapat memicu kekakuan dinding dada (wooden chest)."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "3 - 5 minutes",
    "duration": "30 - 60 minutes (redistribution-dependent)",
    "metabolism": "Hepatic CYP3A4 N-dealkylation to inactive norfentanyl; eliminated renally.",
    "clinicalPearls": {
      "en": "High lipid solubility ensures rapid blood-brain penetration. Rapid IV bolus can lock the vocal cords and thoracic musculature; treat with rocuronium or naloxone. Context-sensitive half-time increases markedly with infusions >2 hours.",
      "id": "Kelarutan lemak tinggi menghasilkan onset cepat. Bolus IV cepat dapat mengunci otot dada dan pita suara; tangani dengan rokuronium atau nalokson."
    },
    "highRisk": true
  },
  {
    "id": "remifentanil",
    "genericName": "Remifentanil HCl",
    "brandNames": [
      "Ultiva"
    ],
    "drugClass": "Ultra-Short-Acting Ester Opioid Analgesic",
    "indications": {
      "en": "Intraoperative analgesia during TIVA, craniotomy, neuro-monitoring cases, rapid wakeup anesthesia.",
      "id": "Analgesia intraoperatif selama TIVA, kraniotomi, tindakan neuromonitoring, anestesi dengan pemulihan cepat."
    },
    "contraindications": {
      "en": "Epidural or intrathecal administration (contains neurotoxic glycine vehicle), known opioid allergy.",
      "id": "Pemberian epidural atau intratekal (mengandung glisin yang neurotoksik), alergi opioid."
    },
    "dosing": {
      "dosePerKg": 0.001,
      "unit": "mg",
      "maxDose": 0.1,
      "frequency": "Continuous IV infusion strictly via syringe pump",
      "bolusDose": "Slow bolus: 0.5 - 1.0 mcg/kg IV over 60-90 seconds (avoid rapid push)",
      "infusionDose": "Sedation: 0.05 - 0.15 mcg/kg/min; TIVA with Propofol: 0.15 - 0.5 mcg/kg/min",
      "notes": {
        "en": "Ultra-short context-sensitive half-time (3-4 minutes) regardless of infusion length. ZERO residual analgesia after stopping!",
        "id": "Waktu paruh konstan (3-4 menit) tidak peduli durasi infus. Nol efek analgesia sisa setelah infus dimatikan!"
      }
    },
    "onset": "1 minute",
    "peak": "1.5 - 2 minutes",
    "duration": "5 - 10 minutes (independent of infusion duration)",
    "metabolism": "Rapid non-specific blood and tissue esterases to inactive remifentanil acid (organ-independent).",
    "clinicalPearls": {
      "en": "Ideal for procedures requiring immediate neurological assessment post-op. Because analgesia ceases within 10 minutes, MUST administer longer-acting analgesics (morphine, hydromorphone, paracetamol) 20-30 min prior to emergence to prevent acute pain storm.",
      "id": "Sangat ideal untuk kraniotomi dengan evaluasi saraf segera. Karena efek hilang dalam 10 menit, WAJIB berikan opioid kerja sedang (morfin/parasetamol) 20-30 menit sebelum operasi selesai."
    },
    "highRisk": true
  },
  {
    "id": "sufentanil",
    "genericName": "Sufentanil Citrate",
    "brandNames": [
      "Sufenta"
    ],
    "drugClass": "Potent Synthetic Opioid Analgesic",
    "indications": {
      "en": "Cardiac anesthesia, major craniotomy, labor epidural analgesia adjunct.",
      "id": "Anestesi bedah jantung terbuka, kraniotomi mayor, ajuvan analgesia epidural persalinan."
    },
    "contraindications": {
      "en": "Severe respiratory depression, absence of advanced airway control.",
      "id": "Depresi napas berat, ketiadaan peralatan kendali jalan napas lanjut."
    },
    "dosing": {
      "dosePerKg": 0.0003,
      "unit": "mg",
      "maxDose": 0.05,
      "frequency": "IV bolus or infusion",
      "bolusDose": "0.1 - 0.5 mcg/kg IV (5-10x more potent than fentanyl, 500-1000x morphine); Epidural: 5 - 10 mcg",
      "infusionDose": "Maintenance: 0.1 - 0.5 mcg/kg/h",
      "notes": {
        "en": "Highest therapeutic safety index (LD50/ED50) among clinical opioids.",
        "id": "Memiliki indeks terapeutik tertinggi di antara seluruh opioid klinis."
      }
    },
    "onset": "1 - 3 minutes",
    "peak": "3 - 5 minutes",
    "duration": "20 - 45 minutes",
    "metabolism": "Hepatic CYP3A4 N-dealkylation to active desmethylsufentanil (1/10th potency).",
    "clinicalPearls": {
      "en": "Produces profound analgesia with outstanding cardiovascular stability. Excellent synergy with local anesthetics in thoracic and labor epidurals with minimal motor blockade.",
      "id": "Menghasilkan analgesia kuat dengan stabilitas kardiovaskular sangat tinggi. Kombinasi sangat baik dengan anestesi lokal pada epidural persalinan."
    },
    "highRisk": true
  },
  {
    "id": "morphine",
    "genericName": "Morphine Sulfate",
    "brandNames": [
      "MST Continus",
      "Morphine HCl OGB",
      "Duramorph"
    ],
    "drugClass": "Natural Phenanthrene Opioid Analgesic",
    "indications": {
      "en": "Moderate to severe acute surgical pain, acute pulmonary edema, acute myocardial infarction.",
      "id": "Nyeri bedah akut sedang hingga berat, edema paru akut, infark miokard akut."
    },
    "contraindications": {
      "en": "Severe renal impairment (CrCl < 30 mL/min) due to toxic M6G metabolite accumulation, acute severe asthma.",
      "id": "Gangguan ginjal berat (CrCl < 30 mL/menit) akibat akumulasi metabolit toksik M6G, asma akut berat."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "IV bolus q3-4h PRN",
      "bolusDose": "0.05 - 0.1 mg/kg IV slow push (typically 2 - 5 mg increments in adults)",
      "notes": {
        "en": "Late peak effect (20-30 minutes); do not redose too rapidly to avoid cumulative overdose.",
        "id": "Puncak kerja lambat (20-30 menit); jangan mengulang dosis terlalu cepat guna mencegah penumpukan obat."
      }
    },
    "onset": "5 - 10 minutes",
    "peak": "20 - 30 minutes",
    "duration": "3 - 5 hours",
    "metabolism": "Hepatic glucuronidation to Morphine-3-Glucuronide (M3G, neurotoxic) and Morphine-6-Glucuronide (M6G, active analgesic/respiratory depressant). Both accumulate in renal failure.",
    "clinicalPearls": {
      "en": "Triggers mast cell histamine release causing vasodilation, hypotension, and pruritus. In renal failure, active M6G metabolite accumulates dangerously, leading to prolonged narcosis and respiratory arrest. Prefer hydromorphone or fentanyl in renal dysfunction.",
      "id": "Memicu pelepasan histamin yang menyebabkan hipotensi dan gatal. Pada gagal ginjal, metabolit aktif M6G menumpuk memicu henti napas berkepanjangan. Gunakan fentanil pada gagal ginjal."
    },
    "highRisk": true
  },
  {
    "id": "hydromorphone",
    "genericName": "Hydromorphone HCl",
    "brandNames": [
      "Dilaudid",
      "Jurnista"
    ],
    "drugClass": "Semisynthetic Phenanthrene Opioid Analgesic",
    "indications": {
      "en": "Moderate to severe postoperative pain, especially in patients with renal insufficiency.",
      "id": "Nyeri pascabedah sedang hingga berat, terutama pada pasien dengan penurunan fungsi ginjal."
    },
    "contraindications": {
      "en": "Severe respiratory depression, acute GI obstruction / paralytic ileus.",
      "id": "Depresi pernapasan berat, obstruksi saluran cerna akut / ileus paralitik."
    },
    "dosing": {
      "dosePerKg": 0.015,
      "unit": "mg",
      "maxDose": 2,
      "frequency": "IV bolus q3-4h PRN",
      "bolusDose": "0.01 - 0.02 mg/kg IV (typically 0.5 - 1.5 mg IV in adults, ~5-7x more potent than morphine)",
      "notes": {
        "en": "Lack of active 6-glucuronide metabolites makes it significantly safer than morphine in renal impairment.",
        "id": "Tidak memiliki metabolit aktif 6-glukuronida sehingga jauh lebih aman dibanding morfin pada gangguan ginjal."
      }
    },
    "onset": "5 minutes",
    "peak": "10 - 20 minutes",
    "duration": "3 - 4 hours",
    "metabolism": "Hepatic glucuronidation to inactive Hydromorphone-3-Glucuronide (H3G); excreted renally.",
    "clinicalPearls": {
      "en": "Preferred over morphine in renal failure because it lacks active analgesic metabolites. Causes significantly less histamine release than morphine, resulting in less pruritus, nausea, and hemodynamic instability.",
      "id": "Lebih dipilih dibanding morfin pada gagal ginjal karena tidak memiliki metabolit aktif. Jarang memicu pelepasan histamin sehingga tidak menyebabkan hipotensi atau gatal."
    },
    "highRisk": true
  },
  {
    "id": "alfentanil",
    "genericName": "Alfentanil HCl",
    "brandNames": [
      "Rapifen"
    ],
    "drugClass": "Rapid-Acting Synthetic Opioid Analgesic",
    "indications": {
      "en": "Short intense surgical stimulation (intubation, retrobulbar block, endoscopy), TIVA component.",
      "id": "Stimulasi bedah nyeri hebat berdurasi singkat (intubasi, blok retrobulbar, endoskopi), komponen TIVA."
    },
    "contraindications": {
      "en": "Severe respiratory depression, absence of monitored airway.",
      "id": "Depresi pernapasan berat, ketiadaan pemantauan jalan napas."
    },
    "dosing": {
      "dosePerKg": 0.015,
      "unit": "mg",
      "maxDose": 1.5,
      "frequency": "IV bolus PRN or infusion",
      "bolusDose": "10 - 20 mcg/kg IV (0.01 - 0.02 mg/kg) given 60-90 sec prior to stimulus",
      "infusionDose": "Maintenance: 0.5 - 1.5 mcg/kg/min",
      "notes": {
        "en": "Fastest onset among standard opioids due to low pKa (6.5) yielding ~90% unionized fraction.",
        "id": "Onset tercepat di antara opioid standar karena pKa rendah (6.5) menghasilkan ~90% fraksi tak terionisasi."
      }
    },
    "onset": "< 1 minute",
    "peak": "1.5 minutes",
    "duration": "10 - 15 minutes",
    "metabolism": "Extensive hepatic CYP3A4 oxidation to noralfentanil.",
    "clinicalPearls": {
      "en": "Because 90% is unionized at physiologic pH 7.4, it penetrates the blood-brain barrier almost instantaneously. Ideal for short, acutely stimulating procedural maneuvers.",
      "id": "Karena 90% berbentuk tak terionisasi pada pH 7.4, obat ini menembus sawar darah otak seketika. Sangat cocok untuk prosedur singkat yang sangat nyeri."
    },
    "highRisk": true
  },
  {
    "id": "naloxone",
    "genericName": "Naloxone HCl",
    "brandNames": [
      "Narcan",
      "Nokoba"
    ],
    "drugClass": "Pure Opioid Receptor Antagonist",
    "indications": {
      "en": "Emergency reversal of opioid-induced respiratory depression or overdose.",
      "id": "Pembalikan darurat depresi pernapasan atau overdosis akibat opioid."
    },
    "contraindications": {
      "en": "Known hypersensitivity to naloxone.",
      "id": "Hipersensitivitas terhadap nalokson."
    },
    "dosing": {
      "dosePerKg": 0.001,
      "unit": "mg",
      "maxDose": 2,
      "frequency": "Titrated IV bolus q2-3min PRN",
      "bolusDose": "Post-op respiratory depression: Titrate 0.04 - 0.08 mg (40-80 mcg) IV q2-3min; Overdose arrest: 0.4 - 2.0 mg IV/IM",
      "notes": {
        "en": "Duration of action (30-45 min) is MUCH shorter than most opioids! Observe patient for renarcotization.",
        "id": "Durasi kerja (30-45 menit) JAUH lebih singkat dibanding mayoritas opioid! Pantau risiko renarkotisasi."
      }
    },
    "onset": "1 - 2 minutes IV; 2 - 5 minutes IM/IN",
    "peak": "5 - 15 minutes",
    "duration": "30 - 45 minutes",
    "metabolism": "Hepatic glucuronidation to naloxone-3-glucuronide.",
    "clinicalPearls": {
      "en": "Titrate slowly in 40 mcg increments to restore adequate spontaneous breathing without reversing all surgical analgesia. Sudden high-dose reversal in opioid-dependent patients triggers violent catecholamine storm, severe pain, acute pulmonary edema, and cardiac arrest.",
      "id": "Titrasi perlahan dalam kelipatan 40 mcg untuk mengembalikan ventilasi spontan tanpa menghilangkan semua efek antinyeri. Bolus dosis besar mendadak dapat memicu badai katekolamin dan edema paru akut."
    },
    "highRisk": true
  },
  {
    "id": "ketorolac",
    "genericName": "Ketorolac Tromethamine",
    "brandNames": [
      "Toradol",
      "Remopain",
      "Torasic",
      "Ketorolac OGB",
      "Scantoma"
    ],
    "drugClass": "Injectable NSAID (Pyrrolo-pyrrole Derivative)",
    "indications": {
      "en": "Short-term management of moderate to severe acute postoperative pain.",
      "id": "Tata laksana jangka pendek nyeri pascabedah akut sedang hingga berat."
    },
    "contraindications": {
      "en": "Active GI ulcer/bleeding, acute renal failure, hypovolemia, high bleeding risk / active hematoma, CABG surgery, 3rd trimester pregnancy.",
      "id": "Tukak/perdarahan lambung aktif, gagal ginjal akut, hipovolemia, risiko perdarahan tinggi, pasca operasi CABG, trimester 3 kehamilan."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 30,
      "frequency": "IV/IM q6h PRN (maximum duration strictly 5 days)",
      "bolusDose": "15 - 30 mg IV/IM q6h PRN (max 60 mg/day in elderly/weight <50kg; max 120 mg/day in adults)",
      "notes": {
        "en": "Maximum cumulative duration strictly 5 days due to severe risk of GI hemorrhage and acute renal failure.",
        "id": "Durasi maksimal mutlak 5 hari akibat risiko perdarahan saluran cerna dan gagal ginjal akut."
      }
    },
    "onset": "10 minutes",
    "peak": "30 - 60 minutes",
    "duration": "6 - 8 hours",
    "metabolism": "Hepatic glucuronidation and hydroxylation; 90% excreted in urine.",
    "clinicalPearls": {
      "en": "Superb opioid-sparing efficacy for somatic and orthopedic pain. Reversibly inhibits COX-1/COX-2. Check renal function and surgical hemostasis before administration. Never exceed 5 days.",
      "id": "Efek hemat opioid luar biasa untuk nyeri ortopedi dan somatik. Menghambat agregasi trombosit reversibel. Pastikan hidrasi baik dan hemostasis bedah aman. Maksimal 5 hari."
    },
    "highRisk": false
  },
  {
    "id": "paracetamol-iv",
    "genericName": "Paracetamol IV (Acetaminophen IV)",
    "brandNames": [
      "Sanmol Infus",
      "Perfalgan",
      "Farmadol",
      "Tamoliv",
      "Ofirmev"
    ],
    "drugClass": "Central Non-Opioid Analgesic / Antipyretic",
    "indications": {
      "en": "First-line baseline multimodal perioperative analgesia, treatment of acute fever and pain.",
      "id": "Analgesia multimodal lini pertama perioperatif, penanganan demam dan nyeri akut."
    },
    "contraindications": {
      "en": "Severe acute hepatic impairment, severe active liver disease.",
      "id": "Gangguan fungsi hati berat, penyakit hati aktif berat."
    },
    "dosing": {
      "dosePerKg": 15,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "IV infusion over 15 min q6h PRN",
      "bolusDose": "1000 mg (1 g) IV infused over 15 minutes; <50 kg: 15 mg/kg IV",
      "notes": {
        "en": "Maximum 4000 mg/day (4 g/day) in adults >=50 kg; max 75 mg/kg/day or 2000 mg/day in hepatic impairment.",
        "id": "Maksimal 4000 mg/hari (4 g/hari) pada dewasa >=50 kg; maks 2000 mg/hari pada gangguan hati."
      }
    },
    "onset": "5 - 10 minutes",
    "peak": "15 - 30 minutes",
    "duration": "4 - 6 hours",
    "metabolism": "Hepatic glucuronidation and sulfation (~90%); ~5% metabolized by CYP2E1 to NAPQI (detoxified by glutathione).",
    "clinicalPearls": {
      "en": "Cornerstone of ERAS protocols. Does not inhibit platelets or renal prostaglandins. IV infusion bypasses first-pass hepatic metabolism, reaching early peak CSF concentrations. Antidote for overdose is N-acetylcysteine (NAC).",
      "id": "Pilar utama protokol ERAS. Tidak mengganggu trombosit, lambung, atau ginjal. Infus IV menghasilkan konsentrasi puncak di CSS lebih cepat dibanding oral. Antidotum overdosis: N-asetilsistein."
    },
    "highRisk": false
  },
  {
    "id": "ibuprofen-iv",
    "genericName": "Ibuprofen IV",
    "brandNames": [
      "Caldolor",
      "Proris Infus"
    ],
    "drugClass": "Injectable NSAID (Propionic Acid Derivative)",
    "indications": {
      "en": "Multimodal management of mild to moderate pain, adjunct for severe pain, fever reduction.",
      "id": "Tata laksana multimodal nyeri sedang, ajuvan nyeri berat, penurunan demam tinggi."
    },
    "contraindications": {
      "en": "Active GI bleeding, perioperative CABG, severe renal failure, aspirin-exacerbated respiratory disease.",
      "id": "Perdarahan GI aktif, pasca operasi CABG, gagal ginjal berat, riwayat asma akibat aspirin."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 800,
      "frequency": "IV infusion over 30 min q6h PRN",
      "bolusDose": "400 - 800 mg IV infused over 30 minutes q6h PRN (max 3200 mg/day)",
      "notes": {
        "en": "Must be diluted and infused over at least 30 minutes. Patient should be adequately hydrated.",
        "id": "Wajib diencerkan dan diinfuskan minimal selama 30 menit. Pastikan status hidrasi pasien baik."
      }
    },
    "onset": "15 - 30 minutes",
    "peak": "30 minutes (end of infusion)",
    "duration": "4 - 6 hours",
    "metabolism": "Hepatic CYP2C9 oxidation to inactive metabolites.",
    "clinicalPearls": {
      "en": "Useful non-opioid adjunct in ERAS pathways when oral route is unavailable. Provides simultaneous anti-inflammatory and antipyretic actions. Ensure euvolemia before administering to prevent AKI.",
      "id": "Ajuvan non-opioid yang baik dalam protokol ERAS bila jalur oral belum memungkinkan. Pastikan pasien terhidrasi dengan baik untuk melindungi fungsi ginjal."
    },
    "highRisk": false
  },
  {
    "id": "lidocaine",
    "genericName": "Lidocaine HCl (Lignocaine)",
    "brandNames": [
      "Xylocaine",
      "Lidocaine OGB",
      "Pehacain (with epi)",
      "Extracaine"
    ],
    "drugClass": "Amide Local Anesthetic / Class IB Antiarrhythmic",
    "indications": {
      "en": "Local infiltration, peripheral nerve block, spinal anesthesia, blunting intubation, IV systemic ERAS analgesia, ventricular arrhythmias.",
      "id": "Infiltrasi lokal, blok saraf tepi, anestesi spinal, peredam intubasi, infus analgesia ERAS sistemik, aritmia ventrikel."
    },
    "contraindications": {
      "en": "High-grade AV block (2nd/3rd degree without pacemaker), severe SA block, known amide allergy.",
      "id": "Blok AV derajat 2 atau 3 tanpa alat pacu jantung, blok SA berat, alergi anestesi amida."
    },
    "dosing": {
      "dosePerKg": 4.5,
      "unit": "mg",
      "maxDose": 300,
      "frequency": "Infiltration / IV systemic infusion",
      "bolusDose": "Infiltration plain: max 4.5 mg/kg (max 300 mg); with Epinephrine: max 7 mg/kg (max 500 mg); IV bolus for intubation: 1.0 - 1.5 mg/kg IV",
      "infusionDose": "Perioperative IV ERAS infusion: 1.5 - 2.0 mg/kg/h",
      "notes": {
        "en": "Signs of LAST (toxicity): circumoral numbness, metallic taste, tinnitus, tremors, seizures, coma, and asystole.",
        "id": "Tanda toksisitas LAST: baal sekitar mulut, rasa logam, telinga berdenging, tremor, kejang, hingga henti jantung."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "5 - 15 minutes",
    "duration": "1 - 2 hours plain (2 - 4 hours with epinephrine)",
    "metabolism": "Hepatic CYP1A2 and CYP3A4 dealkylation to active MEGX and GX.",
    "clinicalPearls": {
      "en": "Intravenous systemic lidocaine infusion during open/laparoscopic abdominal surgery reduces opioid consumption, accelerates return of bowel function, and shortens hospital stay. Treat toxicity (LAST) immediately with 20% Lipid Emulsion!",
      "id": "Infus IV lidokain sistemik pada bedah abdomen mempercepat pemulihan fungsi usus dan mengurangi kebutuhan opioid. Bila terjadi toksisitas LAST, segera berikan Emulsi Lipid 20%!"
    },
    "highRisk": true
  },
  {
    "id": "bupivacaine",
    "genericName": "Bupivacaine HCl",
    "brandNames": [
      "Marcaine",
      "Marcaine Spinal Heavy",
      "Regivell",
      "Buniscan"
    ],
    "drugClass": "Long-Acting Amide Local Anesthetic",
    "indications": {
      "en": "Subarachnoid (spinal) anesthesia, epidural anesthesia/analgesia, peripheral nerve blocks, wound infiltration.",
      "id": "Anestesi spinal subaraknoid, analgesia epidural, blok saraf tepi, infiltrasi luka bedah."
    },
    "contraindications": {
      "en": "Intravenous Regional Anesthesia (Bier Block) ABSOLUTELY CONTRAINDICATED; obstetrical paracervical block; severe heart block.",
      "id": "KONTRAINDIKASI MUTLAK untuk anestesi regional intravena (Bier block); blok paraservikal kebidanan."
    },
    "dosing": {
      "dosePerKg": 2,
      "unit": "mg",
      "maxDose": 175,
      "frequency": "Single injection nerve block or spinal",
      "bolusDose": "Infiltration / Nerve block: max 2.0 mg/kg plain (max 175 mg); with Epi: max 2.5 mg/kg (max 225 mg); Spinal Heavy 0.5%: 7.5 - 15 mg (1.5 - 3.0 mL)",
      "notes": {
        "en": "High cardiotoxicity! Accidental IV injection causes refractory ventricular fibrillation and asystole (\"fast in, slow out\").",
        "id": "Kardiotoksisitas tinggi! Injeksi IV tidak sengaja memicu fibrilasi ventrikel refrakter dan henti jantung."
      }
    },
    "onset": "Intermediate (10 - 20 minutes; spinal < 3 min)",
    "peak": "30 - 45 minutes",
    "duration": "4 - 8 hours (up to 12-24 hours with adjuvants)",
    "metabolism": "Hepatic CYP3A4 N-dealkylation to pipecoloxylidide (PPX).",
    "clinicalPearls": {
      "en": "Binds with very high affinity to cardiac voltage-gated sodium channels with slow dissociation kinetics. In inadvertent IV injection, cardiac arrest is refractory to standard resuscitation; initiate 20% Lipid Emulsion immediately and avoid high-dose epinephrine (<1 mcg/kg).",
      "id": "Memiliki afinitas tinggi pada kanal natrium jantung dengan disosiasi lambat. Jika terjadi henti jantung akibat LAST, segera berikan Lipid Emulsion 20% dan batasi dosis epinefrin (<1 mcg/kg)."
    },
    "highRisk": true
  },
  {
    "id": "ropivacaine",
    "genericName": "Ropivacaine HCl",
    "brandNames": [
      "Naropin",
      "Ropivacaine OGB"
    ],
    "drugClass": "Long-Acting Pure S-(-) Enantiomer Amide Local Anesthetic",
    "indications": {
      "en": "Epidural anesthesia and analgesia (labor & post-op), continuous peripheral nerve blocks, TAP blocks.",
      "id": "Anestesi dan analgesia epidural (persalinan & pasca-bedah), blok saraf tepi kontinu, blok TAP."
    },
    "contraindications": {
      "en": "Known amide hypersensitivity, intravenous regional anesthesia (Bier block).",
      "id": "Hipersensitivitas amida, anestesi regional intravena (Bier block)."
    },
    "dosing": {
      "dosePerKg": 3,
      "unit": "mg",
      "maxDose": 250,
      "frequency": "Nerve block bolus or continuous catheter infusion",
      "bolusDose": "Peripheral nerve block (0.2% - 0.75%): max 3.0 mg/kg (max 250 - 300 mg); Epidural bolus: 50 - 150 mg",
      "infusionDose": "Epidural / Perineural infusion (0.2%): 6 - 12 mL/h",
      "notes": {
        "en": "Pure S-(-) enantiomer profile provides substantially lower cardiotoxicity than racemic bupivacaine.",
        "id": "Profil isomer murni S-(-) memberikan profil kardiotoksisitas yang jauh lebih aman dibanding bupivakain."
      }
    },
    "onset": "10 - 15 minutes",
    "peak": "30 - 45 minutes",
    "duration": "4 - 10 hours",
    "metabolism": "Extensive hepatic CYP1A2 and CYP3A4 to 3-hydroxy-ropivacaine.",
    "clinicalPearls": {
      "en": "Produces greater sensory-motor differentiation than bupivacaine: provides excellent dense analgesia with less motor blockade, facilitating early patient mobilization. Significantly safer margin for CNS and cardiac toxicity.",
      "id": "Menghasilkan pemisahan sensorik-motorik yang lebih baik dibanding bupivakain: analgesia pekat dengan blok motorik minimal, mempercepat mobilisasi pasien."
    },
    "highRisk": true
  },
  {
    "id": "levobupivacaine",
    "genericName": "Levobupivacaine HCl",
    "brandNames": [
      "Chirocaine"
    ],
    "drugClass": "Pure S-(-) Enantiomer Amide Local Anesthetic",
    "indications": {
      "en": "Epidural analgesia, peripheral nerve blocks, ophthalmic peribulbar block.",
      "id": "Analgesia epidural, blok saraf tepi perifer, blok peribulbar mata."
    },
    "contraindications": {
      "en": "Amide allergy, intravenous regional anesthesia (Bier block).",
      "id": "Alergi amida, anestesi regional intravena (Bier block)."
    },
    "dosing": {
      "dosePerKg": 2,
      "unit": "mg",
      "maxDose": 150,
      "frequency": "Infiltration / Regional block",
      "bolusDose": "Max single dose 2.0 - 2.5 mg/kg (max 150 mg plain, 200 mg with epinephrine)",
      "notes": {
        "en": "Significantly less myocardial depression and fatal arrhythmia risk compared to racemic bupivacaine.",
        "id": "Risiko depresi miokard dan aritmia fatal jauh lebih rendah dibanding bupivakain rasemat."
      }
    },
    "onset": "10 - 15 minutes",
    "peak": "30 - 45 minutes",
    "duration": "4 - 8 hours",
    "metabolism": "Hepatic CYP3A4 and CYP1A2.",
    "clinicalPearls": {
      "en": "Isolated S-enantiomer of bupivacaine with equivalent potency and block characteristics, but wider therapeutic window for cardiac and neurotoxicity. Safer in high-volume regional blocks.",
      "id": "Isomer S murni bupivakain dengan potensi setara namun margin keamanan terhadap jantung dan otak jauh lebih lebar."
    },
    "highRisk": true
  },
  {
    "id": "mepivacaine",
    "genericName": "Mepivacaine HCl",
    "brandNames": [
      "Scandicaine",
      "Carbocaine",
      "Polocaine"
    ],
    "drugClass": "Intermediate Amide Local Anesthetic",
    "indications": {
      "en": "Infiltration, peripheral nerve block, epidural block, dental anesthesia.",
      "id": "Infiltrasi lokal, blok saraf tepi perifer, blok epidural, anestesi gigi."
    },
    "contraindications": {
      "en": "Known amide allergy; avoid in obstetrical paracervical block due to fetal ion trapping and slow fetal hepatic metabolism.",
      "id": "Alergi amida; hindari pada blok paraservikal kebidanan karena risiko ion trapping pada janin."
    },
    "dosing": {
      "dosePerKg": 4.5,
      "unit": "mg",
      "maxDose": 300,
      "frequency": "Infiltration or peripheral block",
      "bolusDose": "Max 4.5 mg/kg plain (max 300 mg); with Epinephrine: max 7 mg/kg (max 500 mg)",
      "notes": {
        "en": "Lacks intrinsic vasodilator action of lidocaine; provides longer block duration even without epinephrine.",
        "id": "Tidak memiliki efek vasodilatasi sekuat lidokain; durasi kerja lebih panjang meski tanpa epinefrin."
      }
    },
    "onset": "3 - 5 minutes",
    "peak": "15 - 30 minutes",
    "duration": "2 - 3 hours",
    "metabolism": "Hepatic CYP metabolism; renally eliminated.",
    "clinicalPearls": {
      "en": "Reliable fast onset and intermediate duration. Excellent choice for upper extremity plexus blocks where lidocaine is too short and bupivacaine too long. Minimal local tissue irritation.",
      "id": "Onset cepat dan durasi menengah. Pilihan tepat untuk blok pleksus brakialis di mana lidokain terlalu singkat dan bupivakain terlalu lama."
    },
    "highRisk": false
  },
  {
    "id": "lipid-emulsion-20",
    "genericName": "20% Lipid Emulsion (Intralipid)",
    "brandNames": [
      "Intralipid 20%",
      "ClinOleic 20%",
      "Lipofundin 20%"
    ],
    "drugClass": "LAST Antidote / Resuscitation Emulsion",
    "indications": {
      "en": "Local Anesthetic Systemic Toxicity (LAST) resuscitation, cardiac arrest or neurotoxicity from bupivacaine/amides.",
      "id": "Resusitasi toksisitas sistemik anestesi lokal (LAST), henti jantung atau kejang akibat bupivakain/amida."
    },
    "contraindications": {
      "en": "No absolute contraindications in life-threatening LAST arrest! Caution in egg/soy allergy or severe hyperlipidemia.",
      "id": "Tidak ada kontraindikasi mutlak pada kondisi darurat henti jantung akibat LAST!"
    },
    "dosing": {
      "dosePerKg": 1.5,
      "unit": "mL",
      "maxDose": 1000,
      "frequency": "Immediate IV bolus followed by continuous infusion",
      "bolusDose": "Initial bolus: 1.5 mL/kg IV over 2-3 minutes (~100 mL in 70kg adult); repeat 1-2 times for persistent arrest",
      "infusionDose": "Continuous infusion: 0.25 mL/kg/min (~18 mL/min; 1000 mL/h); can increase to 0.5 mL/kg/min. Max total dose 10-12 mL/kg over 30 min.",
      "notes": {
        "en": "Acts as a \"lipid sink\" capturing lipophilic local anesthetics, and acts as a direct myocardial energy substrate.",
        "id": "Bekerja sebagai \"lipid sink\" yang menyerap anestesi lokal lipofilik, serta substrat energi langsung bagi miokard."
      }
    },
    "onset": "Immediate (< 1 minute)",
    "peak": "Immediate",
    "duration": "Cleared by reticuloendothelial system over hours",
    "metabolism": "Reticuloendothelial clearance and hepatic fatty acid oxidation.",
    "clinicalPearls": {
      "en": "FIRST-LINE ANTIDOTE FOR LAST. Continue CPR; avoid vasopressin, beta-blockers, and calcium channel blockers. Keep individual epinephrine doses <1 mcg/kg to avoid impairing lipid resuscitation efficacy. Total max dose 12 mL/kg.",
      "id": "ANTIDOTUM LINI PERTAMA UNTUK LAST. Lanjutkan RJP; hindari vasopresin dan batasi dosis epinefrin (<1 mcg/kg) agar tidak mengganggu efikasi emulsi lipid."
    },
    "highRisk": true
  },
  {
    "id": "norepinephrine",
    "genericName": "Norepinephrine Bitartrate",
    "brandNames": [
      "Levophed",
      "Vascon",
      "Raivas",
      "Levosol"
    ],
    "drugClass": "Potent Alpha-1 > Beta-1 Adrenergic Vasopressor",
    "indications": {
      "en": "First-line vasopressor for septic shock, vasodilatory shock, post-cardiopulmonary bypass vasoplegia.",
      "id": "Vasopresor lini pertama untuk syok septik, syok vasodilatator, vasoplegia pasca-CPB."
    },
    "contraindications": {
      "en": "Uncorrected hypovolemia without ongoing volume resuscitation (except as temporary bridge), mesenteric/peripheral thrombosis.",
      "id": "Hipovolemia yang belum dikoreksi tanpa resusitasi cairan aktif, trombosis vaskular perifer."
    },
    "dosing": {
      "dosePerKg": 0.0001,
      "unit": "mg",
      "maxDose": 0.01,
      "frequency": "Continuous IV infusion strictly titrated to MAP >= 65 mmHg",
      "bolusDose": "Push-dose in OR: 4 - 10 mcg IV bolus for acute spinal/induction hypotension",
      "infusionDose": "Continuous infusion: 0.02 - 1.0 mcg/kg/min (titrate for MAP >= 65 mmHg)",
      "notes": {
        "en": "Prefer central venous access to prevent peripheral extravasation necrosis. Extravasation antidote: Phentolamine 5-10 mg SC.",
        "id": "Lebih disukai lewat akses vena sentral untuk mencegah nekrosis ekstravasasi. Antidotum ekstravasasi: Fentolamin 5-10 mg SK."
      }
    },
    "onset": "30 seconds",
    "peak": "1 - 2 minutes",
    "duration": "1 - 2 minutes",
    "metabolism": "Rapid cellular uptake and enzymatic degradation by COMT and MAO in liver and kidneys.",
    "clinicalPearls": {
      "en": "First-line choice for vasodilatory and septic shock. Potently increases SVR and MAP with modest inotropic support; heart rate is generally stable or slightly reduced via reflex baroreceptors.",
      "id": "Pilihan pertama syok distributif. Meningkatkan SVR dan MAP dengan sedikit efek inotropik; laju jantung cenderung stabil karena refleks baroreseptor."
    },
    "highRisk": true
  },
  {
    "id": "epinephrine",
    "genericName": "Epinephrine (Adrenaline)",
    "brandNames": [
      "Adrenaline OGB",
      "Phapros Adrenaline",
      "EpiPen"
    ],
    "drugClass": "Non-Selective Alpha & Beta Adrenergic Agonist",
    "indications": {
      "en": "ACLS cardiac arrest, anaphylaxis, severe refractory shock, severe bronchospasm, croup nebulization.",
      "id": "Henti jantung ACLS, syok anafilaksis, syok kardiogenik refrakter, bronkospasme berat, croup."
    },
    "contraindications": {
      "en": "No absolute contraindications in life-threatening cardiac arrest or anaphylaxis! Caution in pheochromocytoma, severe CAD.",
      "id": "Tidak ada kontraindikasi mutlak pada henti jantung atau anafilaksis yang mengancam nyawa!"
    },
    "dosing": {
      "dosePerKg": 0.0001,
      "unit": "mg",
      "maxDose": 1,
      "frequency": "IV/IM PRN or continuous infusion",
      "bolusDose": "Cardiac arrest: 1 mg IV/IO q3-5min; Anaphylaxis: 0.3 - 0.5 mg IM (outer thigh); Push-dose: 5 - 20 mcg IV",
      "infusionDose": "Continuous infusion: 0.01 - 0.5 mcg/kg/min (low dose: beta dominant; high dose: alpha dominant)",
      "notes": {
        "en": "In anaphylaxis, intramuscular injection into mid-outer thigh (vastus lateralis) provides fastest, most reliable absorption.",
        "id": "Pada anafilaksis, injeksi intramuskular di paha anterolateral (vastus lateralis) menghasilkan penyerapan tercepat."
      }
    },
    "onset": "IV: 10 - 30 seconds; IM: 3 - 5 minutes",
    "peak": "1 - 3 minutes",
    "duration": "5 - 10 minutes",
    "metabolism": "COMT and MAO in liver, kidneys, and adrenergic nerve terminals.",
    "clinicalPearls": {
      "en": "Drug of choice for anaphylaxis and ACLS arrest. Low doses (0.01-0.05 mcg/kg/min) produce beta-1/beta-2 effects (inotropic/bronchodilation); high doses (>0.1 mcg/kg/min) produce pronounced alpha-1 vasoconstriction. Triggers transient lactic acidosis due to accelerated aerobic glycolysis.",
      "id": "Obat utama anafilaksis dan henti jantung. Dosis rendah menghasilkan efek inotropik beta-1 dan bronkodilasi beta-2; dosis tinggi menghasilkan vasokonstriksi kuat alfa-1."
    },
    "highRisk": true
  },
  {
    "id": "vasopressin",
    "genericName": "Vasopressin (Arginine Vasopressin / ADH)",
    "brandNames": [
      "Pitressin",
      "Vasopressin OGB",
      "Pressyn"
    ],
    "drugClass": "Non-Adrenergic Vasoconstrictor / V1 Receptor Agonist",
    "indications": {
      "en": "Septic shock refractory to norepinephrine, ACE-inhibitor vasoplegic syndrome, post-CPB shock, diabetes insipidus.",
      "id": "Syok septik refrakter katekolamin, sindrom vasoplegia akibat ACE-inhibitor, syok pasca-CPB, diabetes insipidus."
    },
    "contraindications": {
      "en": "Severe coronary artery disease, peripheral vascular gangrene / mesenteric ischemia.",
      "id": "Penyakit arteri koroner berat, iskemia mesenterika atau gangren vaskular perifer."
    },
    "dosing": {
      "dosePerKg": 0.0005,
      "unit": "units",
      "maxDose": 2,
      "frequency": "Fixed continuous IV infusion or push-dose",
      "bolusDose": "Push-dose in OR vasoplegia: 1 - 2 units IV bolus",
      "infusionDose": "Fixed non-titrated infusion: 0.03 - 0.04 units/min (adjunct to norepinephrine)",
      "notes": {
        "en": "Acts on vascular V1 receptors independent of adrenergic receptors. Effective during severe acidosis.",
        "id": "Bekerja pada reseptor V1 vaskular secara independen dari reseptor adrenergik. Tetap efektif pada asidosis berat."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "5 minutes",
    "duration": "10 - 20 minutes",
    "metabolism": "Rapid cleavage by hepatic and renal vascular peptidases.",
    "clinicalPearls": {
      "en": "First-line non-catecholamine vasopressor. Highly effective in restoring vascular tone in acidemic vasoplegic states where adrenergic receptors are desensitized. Does not cause tachyarrhythmias or increase myocardial oxygen demand.",
      "id": "Vasopresor non-adrenergik utama. Sangat efektif memulihkan tonus vaskular pada kondisi asidosis saat reseptor adrenergik tidak merespons. Tidak memicu takikardia."
    },
    "highRisk": true
  },
  {
    "id": "phenylephrine",
    "genericName": "Phenylephrine HCl",
    "brandNames": [
      "Neo-Synephrine",
      "Phenylephrine OGB"
    ],
    "drugClass": "Pure Alpha-1 Selective Vasopressor",
    "indications": {
      "en": "Spinal-induced hypotension (especially Cesarean section), anesthesia-induced vasodilation, neurogenic shock.",
      "id": "Hipotensi akibat anestesi spinal (terutama seksio sesarea), vasodilatasi induksi anestesi, syok neurogenik."
    },
    "contraindications": {
      "en": "Severe sinus bradycardia, severe heart failure with low ejection fraction (increases afterload without inotropy).",
      "id": "Sinus bradikardia berat, gagal jantung berat dengan fraksi ejeksi rendah."
    },
    "dosing": {
      "dosePerKg": 0.001,
      "unit": "mg",
      "maxDose": 0.2,
      "frequency": "IV bolus PRN or continuous infusion",
      "bolusDose": "Push-dose: 50 - 200 mcg IV bolus (0.05 - 0.2 mg) q2-5min",
      "infusionDose": "Continuous infusion: 0.2 - 2.0 mcg/kg/min (or 20 - 200 mcg/min)",
      "notes": {
        "en": "Produces pure systemic arterial vasoconstriction without beta-receptor cardiac stimulation. Reflex bradycardia is common.",
        "id": "Menghasilkan vasokonstriksi arteri murni tanpa stimulasi beta jantung. Sering memicu refleks bradikardia."
      }
    },
    "onset": "30 - 60 seconds",
    "peak": "1 - 2 minutes",
    "duration": "15 - 20 minutes",
    "metabolism": "Hepatic monoamine oxidase (MAO) and sulfate conjugation.",
    "clinicalPearls": {
      "en": "Vasopressor of choice for post-spinal hypotension in obstetrics (less fetal acidosis and higher umbilical cord pH compared to ephedrine). In patients with severe aortic stenosis, it restores coronary perfusion pressure without tachycardic wall stress.",
      "id": "Vasopresor pilihan utama untuk hipotensi pasca spinal pada operasi sesar (risiko asidosis janin lebih rendah dibanding efedrin). Pilihan tepat untuk stenosis aorta."
    },
    "highRisk": true
  },
  {
    "id": "ephedrine",
    "genericName": "Ephedrine HCl",
    "brandNames": [
      "Ephedrine HCl OGB",
      "Akovaz",
      "Corphedrine"
    ],
    "drugClass": "Indirect & Direct Sympathomimetic (Alpha & Beta)",
    "indications": {
      "en": "Anesthesia-induced hypotension, especially when accompanied by bradycardia.",
      "id": "Hipotensi yang diinduksi anestesi, terutama bila disertai bradikardia."
    },
    "contraindications": {
      "en": "Closed-angle glaucoma, non-anaphylactic shock, concurrent MAO inhibitors, severe coronary disease.",
      "id": "Glaukoma sudut tertutup, syok non-anafilaktik, penggunaan bersama MAOI, penyakit jantung koroner berat."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "IV bolus q5-10min PRN (max 50 mg total)",
      "bolusDose": "5 - 10 mg IV bolus q5-10min PRN (max 50 mg cumulative)",
      "notes": {
        "en": "Stimulates release of endogenous norepinephrine. Exhibits tachyphylaxis with repeated doses.",
        "id": "Menstimulasi pelepasan norepinefrin endogen. Mengalami takifilaksis pada pemberian berulang."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "2 - 5 minutes",
    "duration": "10 - 60 minutes",
    "metabolism": "Resistant to COMT/MAO; 70% eliminated unchanged in urine.",
    "clinicalPearls": {
      "en": "Ideal for transient hypotension with bradycardia after spinal block or induction. Tachyphylaxis occurs because presynaptic catecholamine stores are rapidly exhausted upon repeat administration; switch to phenylephrine or norepinephrine if refractory.",
      "id": "Sangat ideal untuk hipotensi yang disertai bradikardia pasca spinal. Takifilaksis dapat terjadi akibat habisnya cadangan katekolamin prasinaps; segera ganti ke fenilefrin jika refrakter."
    },
    "highRisk": false
  },
  {
    "id": "dopamine",
    "genericName": "Dopamine HCl",
    "brandNames": [
      "Dopac",
      "Cetadop",
      "Dopamine Giulini",
      "Inotropin"
    ],
    "drugClass": "Endogenous Inotropic & Vasopressor Catecholamine",
    "indications": {
      "en": "Symptomatic bradycardia refractory to atropine, cardiogenic shock with mild hypotension, septic shock (second line).",
      "id": "Bradikardia simptomatis refrakter terhadap atropin, syok kardiogenik, syok septik lini kedua."
    },
    "contraindications": {
      "en": "Pheochromocytoma, uncorrected tachyarrhythmias, ventricular fibrillation.",
      "id": "Feokromositoma, takiaritmia yang belum terkoreksi, fibrilasi ventrikel."
    },
    "dosing": {
      "dosePerKg": 0.005,
      "unit": "mg",
      "maxDose": 0.02,
      "frequency": "Continuous IV infusion via syringe pump",
      "infusionDose": "Intermediate / Inotropic (Beta-1): 3 - 10 mcg/kg/min; Vasopressor (Alpha-1): 10 - 20 mcg/kg/min",
      "notes": {
        "en": "Low \"renal dose\" (1-3 mcg/kg/min) has NO proven renal protection benefit and is no longer recommended.",
        "id": "Dosis rendah \"renal dose\" (1-3 mcg/kg/menit) terbukti TIDAK memberikan proteksi ginjal dan tidak direkomendasikan lagi."
      }
    },
    "onset": "2 - 4 minutes",
    "peak": "5 minutes",
    "duration": "< 10 minutes",
    "metabolism": "MAO and COMT in liver, kidneys, and plasma.",
    "clinicalPearls": {
      "en": "Dose-dependent pharmacology: Beta-1 dominant at 3-10 mcg/kg/min (increases HR, contractility, and cardiac output); Alpha-1 dominant at >10 mcg/kg/min (vasoconstriction). Associated with high incidence of tachyarrhythmias and higher mortality in cardiogenic shock compared to norepinephrine.",
      "id": "Efek bergantung dosis: Beta-1 pada 3-10 mcg/kg/menit (meningkatkan HR dan kontraktilitas); Alfa-1 pada >10 mcg/kg/menit. Memicu takiaritmia lebih tinggi dibanding norepinefrin."
    },
    "highRisk": true
  },
  {
    "id": "dobutamine",
    "genericName": "Dobutamine HCl",
    "brandNames": [
      "Dobutrex",
      "Dobuject",
      "Inotrop",
      "Cardiject"
    ],
    "drugClass": "Synthetic Inotrope (Beta-1 > Beta-2 Agonist)",
    "indications": {
      "en": "Cardiogenic shock, acute decompensated heart failure with low cardiac output, septic myocardial depression.",
      "id": "Syok kardiogenik, gagal jantung akut dekompensasi dengan curah jantung rendah, disfungsi miokard sepsis."
    },
    "contraindications": {
      "en": "Hypertrophic obstructive cardiomyopathy (HOCM), severe uncorrected hypovolemia.",
      "id": "Kardiomiopati obstruktif hipertrofik (HOCM), hipovolemia berat yang belum dikoreksi."
    },
    "dosing": {
      "dosePerKg": 0.005,
      "unit": "mg",
      "maxDose": 0.02,
      "frequency": "Continuous IV infusion titrated to cardiac index / organ perfusion",
      "infusionDose": "2.5 - 20 mcg/kg/min (typically initiate at 2.5 - 5 mcg/kg/min)",
      "notes": {
        "en": "Potent inotrope and mild vasodilator (\"inodilator\"). May cause hypotension if patient is hypovolemic.",
        "id": "Inotropik kuat dan vasodilator ringan (\"inodilatator\"). Dapat memicu hipotensi jika pasien hipovolemik."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "5 - 10 minutes",
    "duration": "5 - 10 minutes",
    "metabolism": "Hepatic methylation by COMT and conjugation.",
    "clinicalPearls": {
      "en": "Drug of choice for low-output heart failure and cardiogenic shock with adequate blood pressure. Increases myocardial contractility and decreases ventricular afterload. Can trigger ventricular arrhythmias and increase myocardial oxygen consumption.",
      "id": "Obat pilihan untuk gagal jantung dengan curah jantung rendah dan TD adekuat. Meningkatkan kontraktilitas dan menurunkan afterload ventrikel. Pantau timbulnya aritmia ventrikel."
    },
    "highRisk": true
  },
  {
    "id": "milrinone",
    "genericName": "Milrinone Lactate",
    "brandNames": [
      "Primacor",
      "Corotrop"
    ],
    "drugClass": "Phosphodiesterase-3 (PDE-3) Inhibitor (Inodilator)",
    "indications": {
      "en": "Acute heart failure, weaning from cardiopulmonary bypass, severe pulmonary hypertension, right ventricular failure.",
      "id": "Gagal jantung akut, penyapihan dari mesin CPB, hipertensi pulmonal berat, gagal jantung kanan."
    },
    "contraindications": {
      "en": "Severe obstructive aortic or pulmonic valvular disease, severe uncorrected hypotension.",
      "id": "Penyakit katup aorta atau pulmonal obstruktif berat, hipotensi berat yang belum dikoreksi."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "mg",
      "maxDose": 5,
      "frequency": "Loading dose (optional) + continuous IV infusion",
      "bolusDose": "Loading dose: 50 mcg/kg IV over 10-15 minutes (often omitted in acute setting to avoid severe hypotension)",
      "infusionDose": "0.25 - 0.75 mcg/kg/min (reduce dose in renal failure)",
      "notes": {
        "en": "Increases intracellular cAMP in cardiac and vascular smooth muscle independent of beta receptors. Causes potent pulmonary and systemic vasodilation.",
        "id": "Meningkatkan cAMP intraseluler pada miokard dan otot polos vaskular tanpa melalui reseptor beta. Menyebabkan vasodilatasi pulmonal dan sistemik."
      }
    },
    "onset": "5 - 15 minutes",
    "peak": "15 - 30 minutes",
    "duration": "2 - 4 hours (elimination half-life ~2.4h; prolonged in renal failure)",
    "metabolism": "80% eliminated unchanged in urine.",
    "clinicalPearls": {
      "en": "Exceptional inotrope for right heart failure and pulmonary hypertension because it lowers pulmonary vascular resistance (PVR) while boosting RV contractility. Effective even in patients with chronic beta-blocker therapy. Combine with norepinephrine to prevent systemic hypotension.",
      "id": "Inotropik luar biasa untuk gagal jantung kanan dan hipertensi pulmonal karena menurunkan resistensi vaskular paru (PVR). Tetap bekerja baik pada pasien yang mengonsumsi beta-bloker kronis."
    },
    "highRisk": true
  },
  {
    "id": "nicardipine",
    "genericName": "Nicardipine HCl",
    "brandNames": [
      "Perdipine",
      "Tensilo",
      "Nicardipine OGB",
      "Cardene IV"
    ],
    "drugClass": "Dihydropyridine Calcium Channel Blocker",
    "indications": {
      "en": "Hypertensive emergency, perioperative acute hypertension, acute ischemic or hemorrhagic stroke BP control.",
      "id": "Krisis hipertensi, hipertensi akut perioperatif, kendali tekanan darah pada stroke iskemik atau hemoragik."
    },
    "contraindications": {
      "en": "Advanced aortic stenosis, known dihydropyridine hypersensitivity.",
      "id": "Stenosis aorta derajat berat, hipersensitivitas dihidropiridin."
    },
    "dosing": {
      "dosePerKg": 0.07,
      "unit": "mg",
      "maxDose": 15,
      "frequency": "Continuous IV infusion via syringe pump",
      "infusionDose": "Start at 5 mg/h IV; titrate by 2.5 mg/h every 5-15 min to target BP (maximum 15 mg/h; maintenance 3 mg/h)",
      "notes": {
        "en": "Selective arterial vasodilator with negligible negative inotropy or chronotropy. Excellent predictable BP control.",
        "id": "Vasodilator arteri selektif tanpa depresi kontraktilitas jantung. Kendali tekanan darah sangat terprediksi."
      }
    },
    "onset": "2 - 5 minutes",
    "peak": "10 - 15 minutes",
    "duration": "1 - 4 hours",
    "metabolism": "Extensive hepatic metabolism via CYP3A4.",
    "clinicalPearls": {
      "en": "Agent of choice for neurosurgical and stroke BP management. Decreases SVR and blood pressure without depressing cardiac output or compromising cerebral perfusion pressure. Change peripheral IV site q12h to avoid phlebitis.",
      "id": "Obat pilihan untuk tata laksana hipertensi pada bedah saraf dan stroke. Menurunkan SVR tanpa menekan curah jantung atau menurunkan perfusi serebral."
    },
    "highRisk": true
  },
  {
    "id": "labetalol",
    "genericName": "Labetalol HCl",
    "brandNames": [
      "Trandate",
      "Normodyne"
    ],
    "drugClass": "Combined Alpha-1 and Non-Selective Beta Blocker (1:7 Alpha:Beta IV)",
    "indications": {
      "en": "Hypertensive emergency, aortic dissection, preeclampsia/severe pregnancy-induced hypertension, acute postoperative hypertension.",
      "id": "Krisis hipertensi, diseksi aorta, preeklamsia berat, hipertensi akut pascabedah."
    },
    "contraindications": {
      "en": "Severe sinus bradycardia, 2nd or 3rd degree AV block, cardiogenic shock, severe bronchial asthma / COPD.",
      "id": "Sinus bradikardia berat, AV blok derajat 2 atau 3, syok kardiogenik, asma bronkial berat."
    },
    "dosing": {
      "dosePerKg": 0.25,
      "unit": "mg",
      "maxDose": 80,
      "frequency": "IV push q10min PRN or continuous infusion",
      "bolusDose": "10 - 20 mg IV slow push over 2 min; repeat 20 - 80 mg q10min PRN (max 300 mg cumulative)",
      "infusionDose": "Continuous infusion: 0.5 - 2.0 mg/min",
      "notes": {
        "en": "Reduces systemic vascular resistance and blood pressure without provoking reflex tachycardia.",
        "id": "Menurunkan resistensi vaskular sistemik dan tekanan darah tanpa memicu refleks takikardia."
      }
    },
    "onset": "2 - 5 minutes",
    "peak": "5 - 15 minutes",
    "duration": "2 - 6 hours",
    "metabolism": "Hepatic glucuronidation; minimal renal elimination.",
    "clinicalPearls": {
      "en": "First-line therapy for hypertensive crisis in pregnancy/preeclampsia (safe for uteroplacental blood flow) and aortic dissection (blunts shear stress dP/dt). Does not cause dramatic cerebral vasodilation.",
      "id": "Lini pertama krisis hipertensi pada kehamilan/preeklamsia dan diseksi aorta (meredam gaya geser dP/dt). Tidak memicu peningkatan tekanan intrakranial."
    },
    "highRisk": true
  },
  {
    "id": "esmolol",
    "genericName": "Esmolol HCl",
    "brandNames": [
      "Brevibloc"
    ],
    "drugClass": "Ultra-Short-Acting Cardioselective Beta-1 Blocker",
    "indications": {
      "en": "Acute intraoperative tachycardia and hypertension, blunting intubation/emergence sympathetic surges, aortic dissection, SVT rate control.",
      "id": "Takikardia dan hipertensi akut intraoperatif, peredam lonjakan intubasi/siuman, diseksi aorta, kendali SVT."
    },
    "contraindications": {
      "en": "Severe sinus bradycardia, heart block > 1st degree, cardiogenic shock, overt acute heart failure.",
      "id": "Sinus bradikardia berat, AV blok > derajat 1, syok kardiogenik, gagal jantung akut dekompensasi."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 50,
      "frequency": "IV bolus over 1 min + continuous infusion",
      "bolusDose": "Loading bolus: 0.5 mg/kg (500 mcg/kg) IV push over 1 minute",
      "infusionDose": "Continuous infusion: 50 - 300 mcg/kg/min (titrate every 4-5 min)",
      "notes": {
        "en": "Elimination half-life is ~9 minutes due to rapid red blood cell esterase hydrolysis. Rapidly titratable and reversible.",
        "id": "Waktu paruh eliminasi hanya ~9 menit berkat hidrolisis esterase sel darah merah. Sangat mudah dititrasi dan cepat hilang bila distop."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "5 minutes",
    "duration": "10 - 20 minutes",
    "metabolism": "Rapid hydrolysis by erythrocyte cytosol esterases (completely organ-independent).",
    "clinicalPearls": {
      "en": "Ideal beta-blocker in the operating room. If hypotension or excessive bradycardia develops, stopping the infusion leads to rapid recovery within 10-15 minutes. Unaffected by hepatic or renal failure.",
      "id": "Beta-bloker ideal di kamar operasi. Jika terjadi hipotensi atau bradikardia berlebih, penghentian infus memulihkan kondisi dalam 10-15 menit. Tidak dipengaruhi oleh fungsi ginjal atau hati."
    },
    "highRisk": true
  },
  {
    "id": "hydralazine",
    "genericName": "Hydralazine HCl",
    "brandNames": [
      "Apresoline"
    ],
    "drugClass": "Direct Arteriolar Vasodilator",
    "indications": {
      "en": "Severe hypertension in pregnancy (preeclampsia/eclampsia), acute postoperative hypertension.",
      "id": "Hipertensi berat pada kehamilan (preeklamsia/eklamsia), hipertensi akut pascabedah."
    },
    "contraindications": {
      "en": "Coronary artery disease, aortic dissection (provokes reflex tachycardia and increases shear stress dP/dt), mitral valve rheumatic disease.",
      "id": "Penyakit arteri koroner, diseksi aorta (memicu refleks takikardia dan gaya geser dP/dt), penyakit jantung rematik mitral."
    },
    "dosing": {
      "dosePerKg": 0.2,
      "unit": "mg",
      "maxDose": 20,
      "frequency": "IV slow push q20-30min PRN",
      "bolusDose": "5 - 20 mg IV slow push q20-30min PRN (start with 5-10 mg)",
      "notes": {
        "en": "Delayed peak onset (20-30 minutes); avoid rapid repeated doses to prevent severe cumulative hypotension (\"dose stacking\").",
        "id": "Puncak kerja lambat (20-30 menit); hindari pemberian dosis ulang terlalu cepat guna mencegah penumpukan obat."
      }
    },
    "onset": "10 - 20 minutes",
    "peak": "30 - 60 minutes",
    "duration": "4 - 8 hours",
    "metabolism": "Hepatic acetylation (slow acetylators experience higher plasma levels and prolonged effects).",
    "clinicalPearls": {
      "en": "Classic agent for pregnancy-induced hypertension and preeclampsia. Produces prominent baroreceptor-mediated reflex tachycardia and fluid retention; frequently co-administered with a beta-blocker. Beware of delayed hypotension.",
      "id": "Obat klasik untuk hipertensi pada kehamilan dan preeklamsia. Menimbulkan refleks takikardia; sering dipadukan dengan beta-bloker. Waspadai hipotensi lambat."
    },
    "highRisk": false
  },
  {
    "id": "nitroglycerin",
    "genericName": "Nitroglycerin (Glyceryl Trinitrate)",
    "brandNames": [
      "Nitrocine",
      "Glyceryl Trinitrate DBL",
      "Nitrokaf",
      "Tridil"
    ],
    "drugClass": "Organic Nitrate / Venodilator (NO Donor)",
    "indications": {
      "en": "Acute coronary syndrome / myocardial ischemia, acute cardiogenic pulmonary edema, controlled hypotension, uterine relaxation for retained placenta.",
      "id": "Sindrom koroner akut / iskemia miokard, edema paru kardiogenik akut, relaksasi uterus pada retensio plasenta."
    },
    "contraindications": {
      "en": "Concurrent phosphodiesterase-5 inhibitors (sildenafil within 24h, tadalafil within 48h—fatal refractory collapse), severe aortic stenosis, right ventricular myocardial infarction.",
      "id": "Penggunaan bersama obat PDE-5 inhibitor (sildenafil dalam 24 jam, tadalafil dalam 48 jam—risiko kolaps kardiovaskular fatal), stenosis aorta berat, infark ventrikel kanan."
    },
    "dosing": {
      "dosePerKg": 0.0005,
      "unit": "mg",
      "maxDose": 0.2,
      "frequency": "Continuous IV infusion or bolus",
      "bolusDose": "Push-dose in OR: 20 - 100 mcg IV bolus for acute coronary spasm or uterine relaxation",
      "infusionDose": "Continuous infusion: 5 - 200 mcg/min (0.1 - 3.0 mcg/kg/min)",
      "notes": {
        "en": "Predominantly venodilator at low doses (<50 mcg/min), reducing preload (LVEDP); arterial dilation occurs at higher doses.",
        "id": "Dominan venodilatator pada dosis rendah (<50 mcg/menit), menurunkan preload; dilatasi arteri terjadi pada dosis tinggi."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "3 - 5 minutes",
    "duration": "5 - 10 minutes",
    "metabolism": "Extensive hepatic organic nitrate reductase and red blood cell metabolism.",
    "clinicalPearls": {
      "en": "Substantially reduces preload and myocardial wall stress without reducing coronary perfusion pressure. Relaxes uterine hypertonus. Tolerance develops with continuous infusions lasting >24 hours. Must use non-PVC IV tubing to prevent drug adsorption.",
      "id": "Menurunkan preload dan beban kerja miokard tanpa mengorbankan perfusi koroner. Efektif merelaksasi uterus pada retensio plasenta. Gunakan selang infus non-PVC agar obat tidak diserap dinding selang."
    },
    "highRisk": true
  },
  {
    "id": "nitroprusside",
    "genericName": "Sodium Nitroprusside",
    "brandNames": [
      "Nipride",
      "Nitropress"
    ],
    "drugClass": "Direct Balanced Arterial & Venous Dilator (NO Donor)",
    "indications": {
      "en": "Acute hypertensive emergency, controlled intraoperative hypotension, severe acute mitral/aortic regurgitation afterload reduction.",
      "id": "Krisis hipertensi akut, hipotensi kendali intraoperatif, reduksi afterload pada regurgitasi aorta/mitral berat."
    },
    "contraindications": {
      "en": "Compensatory hypertension (coarctation of aorta, AV shunt), severe carotid artery stenosis, Leber optic atrophy, tobacco amblyopia.",
      "id": "Hipertensi kompensatorik (koarktasio aorta, pirau AV), stenosis arteri karotis berat, atrofi optik Leber."
    },
    "dosing": {
      "dosePerKg": 0.001,
      "unit": "mg",
      "maxDose": 0.01,
      "frequency": "Continuous IV infusion strictly via dedicated infusion pump",
      "infusionDose": "0.2 - 2.0 mcg/kg/min (max 10 mcg/kg/min for maximum 10 minutes)",
      "notes": {
        "en": "Protect infusion bag and line from light with opaque sleeve. Risk of cyanide toxicity with prolonged or high-dose infusions.",
        "id": "Lindungi botol dan selang infus dari cahaya. Waspadai risiko toksisitas sianida pada dosis tinggi atau penggunaan lama."
      }
    },
    "onset": "Immediate (seconds)",
    "peak": "1 - 2 minutes",
    "duration": "1 - 5 minutes",
    "metabolism": "Non-enzymatic reaction with hemoglobin releasing 5 cyanide molecules per drug molecule. Converted by liver rhodanase to thiocyanate and renally cleared.",
    "clinicalPearls": {
      "en": "Instantaneous onset and offset. Balanced 1:1 arterial and venous dilation. Cyanide toxicity manifests as unexplained metabolic acidosis, tachyphylaxis, and elevated mixed venous PO2; treat with Sodium Thiosulfate and Hydroxocobalamin.",
      "id": "Onset dan offset instan. Dilatasi seimbang arteri dan vena 1:1. Toksisitas sianida ditandai asidosis metabolik yang tidak dapat dijelaskan; tangani dengan Natrium Tiosulfat dan Hidroksokobalamin."
    },
    "highRisk": true
  },
  {
    "id": "amiodarone",
    "genericName": "Amiodarone HCl",
    "brandNames": [
      "Cordarone",
      "Kendaron",
      "Tiaryt",
      "Nexterone"
    ],
    "drugClass": "Class III Antiarrhythmic (Multi-Channel Blocker)",
    "indications": {
      "en": "ACLS pulseless VT / VF arrest, stable wide-complex ventricular tachycardia, atrial fibrillation rate and rhythm control.",
      "id": "Henti jantung ACLS VT tanpa nadi / VF, takikardia ventrikel stabil, kendali laju dan irama fibrilasi atrium."
    },
    "contraindications": {
      "en": "Severe sinus node dysfunction / sick sinus syndrome, 2nd or 3rd degree AV block without pacemaker, cardiogenic shock, iodine allergy.",
      "id": "Disfungsi nodus sinus berat / SSS, AV blok derajat 2 atau 3 tanpa pacu jantung, syok kardiogenik, alergi yodium."
    },
    "dosing": {
      "dosePerKg": 5,
      "unit": "mg",
      "maxDose": 300,
      "frequency": "IV bolus in arrest; infusion for stable arrhythmias",
      "bolusDose": "ACLS VT/VF arrest: 300 mg IV push; repeat dose 150 mg IV; Stable VT/AFib: 150 mg IV in 100 mL D5W over 10 minutes",
      "infusionDose": "Maintenance: 1 mg/min for 6 hours (360 mg), then 0.5 mg/min for 18 hours (540 mg); max 2.2 g in 24 hours",
      "notes": {
        "en": "Contains ~37% iodine by weight. Rapid IV infusion causes profound hypotension and vasodilation (polysorbate 80 vehicle effect).",
        "id": "Mengandung ~37% yodium. Infus IV cepat dapat memicu hipotensi berat dan vasodilatasi."
      }
    },
    "onset": "Minutes for rate control; electrophysiologic effects take hours",
    "peak": "Variable",
    "duration": "Highly variable (terminal elimination half-life 20 - 100 days)",
    "metabolism": "Extensive hepatic metabolism via CYP3A4 and CYP2C8 to active desethylamiodarone.",
    "clinicalPearls": {
      "en": "Gold standard ACLS antiarrhythmic for shock-refractory VF/VT. Blocks sodium, potassium, calcium channels and has non-competitive alpha/beta adrenergic blocking properties. Long-term toxicities include pulmonary fibrosis, thyroid disease, and hepatotoxicity.",
      "id": "Standar emas antiaritmia ACLS untuk VF/VT refrakter kejut. Menghambat kanal kalium, natrium, kalsium, dan reseptor adrenergik. Waspadai komplikasi jangka panjang fibrosis paru dan tiroid."
    },
    "highRisk": true
  },
  {
    "id": "adenosine",
    "genericName": "Adenosine",
    "brandNames": [
      "Adenocor",
      "Adenoscan"
    ],
    "drugClass": "Endogenous Purine Nucleoside / AV Nodal Blocker",
    "indications": {
      "en": "Conversion of paroxysmal supraventricular tachycardia (PSVT / AVNRT) to sinus rhythm.",
      "id": "Konversi takikardia supraventrikular paroksismal (PSVT / AVNRT) ke irama sinus."
    },
    "contraindications": {
      "en": "2nd or 3rd degree AV block (without pacemaker), sick sinus syndrome, severe active bronchospastic asthma.",
      "id": "AV blok derajat 2 atau 3 tanpa pacu jantung, sick sinus syndrome, asma bronkial berat."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 12,
      "frequency": "Rapid IV push followed immediately by rapid saline flush",
      "bolusDose": "Initial: 6 mg rapid IV push over 1-2 sec + 20 mL saline flush; if no response in 1-2 min, give 12 mg rapid IV push",
      "notes": {
        "en": "Must be administered via large bore proximal IV line (antecubital or central) using double-stopcock rapid push and flush.",
        "id": "Wajib disuntikkan lewat vena proksimal besar (antecubital atau sentral) dengan teknik stopcock dan bilas cepat 20 mL salin."
      }
    },
    "onset": "Immediate (< 10 seconds)",
    "peak": "10 - 20 seconds",
    "duration": "< 10 - 20 seconds (ultra-short half-life < 10 seconds)",
    "metabolism": "Rapid cellular uptake by erythrocytes and vascular endothelial cells; enzymatically deaminated to inosine.",
    "clinicalPearls": {
      "en": "Binds A1 receptors, activating potassium channels and hyperpolarizing the AV node, creating transient complete AV block. Half-life <10 seconds. Antagonized by theophylline/caffeine; potentiated by dipyridamole. Warn patient of brief chest tightness and impending doom sensation.",
      "id": "Menyebabkan blok AV total sementara selama beberapa detik untuk menghentikan sirkuit re-entry. Waktu paruh <10 detik. Pasien akan merasakan sensasi dada tertekan sesaat."
    },
    "highRisk": true
  },
  {
    "id": "calcium-chloride",
    "genericName": "Calcium Chloride 10%",
    "brandNames": [
      "Calcium Chloride 10% DBL"
    ],
    "drugClass": "Concentrated Electrolyte / Cardiac Membrane Stabilizer",
    "indications": {
      "en": "Hyperkalemia with ECG changes, hypocalcemia during massive blood transfusion, calcium channel blocker overdose, hypermagnesemia.",
      "id": "Hiperkalemia dengan perubahan EKG, hipokalsemia akibat transfusi masif, overdosis antagonis kalsium, hipermagnesemia."
    },
    "contraindications": {
      "en": "Hypercalcemia, digitalis toxicity (can precipitate fatal \"stone heart\" contracture / VF).",
      "id": "Hiperkalsemia, intoksikasi digitalis (dapat memicu kekakuan jantung \"stone heart\" fatal)."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "Slow IV push over 2-5 minutes",
      "bolusDose": "500 - 1000 mg (5 - 10 mL of 10% solution) IV slow push over 2-5 minutes",
      "notes": {
        "en": "Provides 3x more elemental calcium (272 mg / 13.6 mEq per 10 mL) than calcium gluconate. Severe tissue necrosis if extravasated!",
        "id": "Mengandung kalsium elemental 3x lebih banyak dibanding kalsium glukonat. Menyebabkan nekrosis jaringan berat bila ekstravasasi!"
      }
    },
    "onset": "Immediate (< 1 minute)",
    "peak": "1 - 2 minutes",
    "duration": "30 - 60 minutes",
    "metabolism": "Directly ionized into elemental calcium in bloodstream.",
    "clinicalPearls": {
      "en": "Provides 3 times more elemental calcium than calcium gluconate. ALWAYS prefer central venous administration due to high risk of severe chemical thrombophlebitis and skin necrosis with extravasation. Life-saving first step in hyperkalemic arrest.",
      "id": "Menyediakan kalsium elemental 3 kali lipat kalsium glukonat. Sangat dianjurkan lewat akses sentral untuk mencegah nekrosis jaringan parah jika ekstravasasi. Tindakan darurat pertama pada henti jantung hiperkalemia."
    },
    "highRisk": true
  },
  {
    "id": "calcium-gluconate",
    "genericName": "Calcium Gluconate 10%",
    "brandNames": [
      "Calcii Gluconas OGB",
      "Calcium Gluconate Ethica"
    ],
    "drugClass": "Electrolyte / Cardiac Membrane Stabilizer",
    "indications": {
      "en": "Hyperkalemia, symptomatic hypocalcemia, magnesium toxicity reversal, hydrofluoric acid burns.",
      "id": "Hiperkalemia, hipokalsemia simptomatis, pembalikan toksisitas magnesium, luka bakar asam hidrofluorat."
    },
    "contraindications": {
      "en": "Hypercalcemia, severe digitalis toxicity.",
      "id": "Hiperkalsemia, keracunan digitalis berat."
    },
    "dosing": {
      "dosePerKg": 30,
      "unit": "mg",
      "maxDose": 3000,
      "frequency": "IV infusion over 5-10 minutes",
      "bolusDose": "1000 - 3000 mg (10 - 30 mL of 10% solution) IV infused over 5-10 minutes",
      "notes": {
        "en": "Provides 93 mg (4.65 mEq) elemental calcium per 10 mL. Preferred over chloride for peripheral IV administration.",
        "id": "Mengandung 93 mg kalsium elemental per 10 mL. Jauh lebih aman dibanding kalsium klorida untuk vena perifer."
      }
    },
    "onset": "1 - 3 minutes",
    "peak": "3 - 5 minutes",
    "duration": "30 - 60 minutes",
    "metabolism": "Hepatic metabolism to release free ionized calcium.",
    "clinicalPearls": {
      "en": "Preferred for peripheral IV line access because extravasation causes significantly less tissue irritation and necrosis compared to calcium chloride. In severe liver failure or shock, calcium chloride is preferred because gluconate requires hepatic cleavage.",
      "id": "Pilihan utama untuk jalur infus perifer karena tidak menyebabkan nekrosis jaringan yang parah jika terjadi rembesan. Menstabilkan membran miokard pada hiperkalemia."
    },
    "highRisk": false
  },
  {
    "id": "magnesium-sulfate",
    "genericName": "Magnesium Sulfate",
    "brandNames": [
      "MgSO4 20% Otsuka",
      "MgSO4 40% Otsuka"
    ],
    "drugClass": "Electrolyte / Neuromuscular & Cardiac Membrane Stabilizer",
    "indications": {
      "en": "Eclampsia / preeclampsia seizure prophylaxis, Torsades de Pointes, severe acute bronchospasm / asthma exacerbation, hypomagnesemia.",
      "id": "Profilaksis dan terapi kejang eklamsia/preeklamsia, Torsades de Pointes, bronkospasme berat, hipomagnesemia."
    },
    "contraindications": {
      "en": "Myasthenia gravis, severe renal failure (CrCl < 20 mL/min), high-degree AV heart block.",
      "id": "Miastenia gravis, gagal ginjal berat, blok jantung derajat tinggi."
    },
    "dosing": {
      "dosePerKg": 40,
      "unit": "mg",
      "maxDose": 4000,
      "frequency": "IV loading infusion followed by maintenance",
      "bolusDose": "Eclampsia loading: 4 - 6 g IV in 100 mL over 15-20 min; Torsades / Bronchospasm: 1 - 2 g IV over 2-15 min",
      "infusionDose": "Eclampsia maintenance: 1 - 2 g/h continuous IV infusion",
      "notes": {
        "en": "Potentiates non-depolarizing neuromuscular blockers dramatically! Antidote for toxicity is IV Calcium Gluconate 1 g.",
        "id": "Sangat memperkuat efek pelemas otot non-depolarisasi! Antidotum keracunan magnesium: Kalsium Glukonat 1 g IV."
      }
    },
    "onset": "Immediate IV",
    "peak": "Immediate",
    "duration": "30 - 60 minutes",
    "metabolism": "Eliminated entirely unchanged by the kidneys.",
    "clinicalPearls": {
      "en": "Competitively blocks calcium entry at motor nerve endings, inhibiting acetylcholine release and relaxing vascular/bronchial smooth muscle. Monitor patellar deep tendon reflexes and respiratory rate (loss of patellar reflexes is first sign of hypermagnesemia toxicity).",
      "id": "Menghambat masuknya kalsium pada ujung saraf motorik. Selalu periksa refleks patela dan laju pernapasan (hilangnya refleks patela adalah tanda awal toksisitas magnesium)."
    },
    "highRisk": true
  },
  {
    "id": "sodium-bicarbonate",
    "genericName": "Sodium Bicarbonate 8.4%",
    "brandNames": [
      "Meylon 8.4% Otsuka",
      "Bicnat",
      "Sodium Bicarbonate 8.4% Hameln"
    ],
    "drugClass": "Systemic Alkalinizing Agent / Sodium & Bicarbonate Donor",
    "indications": {
      "en": "Severe metabolic acidosis (pH < 7.15), life-threatening hyperkalemia, tricyclic antidepressant (TCA) overdose cardiotoxicity, urinary alkalinization.",
      "id": "Asidosis metabolik berat (pH < 7.15), hiperkalemia yang mengancam nyawa, kardiotoksisitas overdosis TCA, alkalisasi urin."
    },
    "contraindications": {
      "en": "Metabolic or respiratory alkalosis, severe hypocalcemia (precipitates tetany), severe hypernatremia.",
      "id": "Alkalosis metabolik atau respiratorik, hipokalsemia berat (memicu tetani), hipernatremia berat."
    },
    "dosing": {
      "dosePerKg": 1,
      "unit": "mEq",
      "maxDose": 100,
      "frequency": "Slow IV push or infusion based on base deficit",
      "bolusDose": "Arrest / Severe crisis: 1 mEq/kg IV push (typically 50 - 100 mEq); TCA cardiotoxicity: 1 - 2 mEq/kg until QRS narrows",
      "notes": {
        "en": "8.4% solution is 1 mEq/mL (hyperosmolar ~2000 mOsm/L). INCOMPATIBLE with calcium salts in the same IV line (precipitates chalk).",
        "id": "Larutan 8.4% setara 1 mEq/mL. JANGAN DICAMPUR dengan kalsium dalam satu jalur infus (membentuk endapan kapur kalsium karbonat)."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "5 minutes",
    "duration": "10 - 30 minutes",
    "metabolism": "Neutralizes hydrogen ions to produce CO2 and water. CO2 MUST be cleared by spontaneous or mechanical alveolar ventilation.",
    "clinicalPearls": {
      "en": "Neutralization generates carbon dioxide (H+ + HCO3- <-> H2CO3 <-> H2O + CO2). Patient MUST have adequate alveolar ventilation to blow off generated CO2; otherwise, CO2 diffuses across cell membranes and paradoxically worsens intracellular acidosis.",
      "id": "Reaksi netralisasi menghasilkan gas CO2. Pasien HARUS memiliki ventilasi adekuat untuk membuang CO2; bila tidak, CO2 masuk ke dalam sel dan memperburuk asidosis intraseluler."
    },
    "highRisk": true
  },
  {
    "id": "dextrose-50",
    "genericName": "Dextrose 50% in Water (D50W)",
    "brandNames": [
      "D50 Otsuka",
      "Dextrose 50% Sanbe"
    ],
    "drugClass": "Hypertonic Carbohydrate Solution",
    "indications": {
      "en": "Acute symptomatic hypoglycemia, hyperkalemia cocktail (paired with regular insulin).",
      "id": "Hipoglikemia akut simptomatis, kombinasi terapi hiperkalemia (bersama insulin reguler)."
    },
    "contraindications": {
      "en": "Hyperglycemia, intracranial hemorrhage, delirium tremens without thiamine.",
      "id": "Hiperglikemia, perdarahan intrakranial aktif, delirium tremens tanpa tiamin."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mL",
      "maxDose": 50,
      "frequency": "IV slow push over 2-3 minutes",
      "bolusDose": "Hypoglycemia: 25 - 50 mL IV push (12.5 - 25 g dextrose); Pediatric: D10W 5 mL/kg IV",
      "notes": {
        "en": "Highly hypertonic (osmolarity ~2525 mOsm/L). Inject into large secure vein to prevent severe phlebitis and necrosis.",
        "id": "Sangat hipertonik (osmolaritas ~2525 mOsm/L). Suntikkan ke vena besar untuk mencegah flebitis dan nekrosis."
      }
    },
    "onset": "< 1 minute",
    "peak": "2 - 3 minutes",
    "duration": "30 - 60 minutes",
    "metabolism": "Rapid cellular uptake and glycolysis into carbon dioxide, water, and ATP.",
    "clinicalPearls": {
      "en": "Immediate treatment for coma from hypoglycemia. In malnourished, chronic alcoholic, or Wernicke-susceptible patients, always administer Thiamine 100 mg IV before or simultaneously with dextrose to prevent precipitation of acute Wernicke encephalopathy.",
      "id": "Pengobatan segera untuk koma hipoglikemia. Pada pasien malnutrisi atau alkoholisme kronis, selalu berikan Tiamin 100 mg IV terlebih dahulu untuk mencegah ensefalopati Wernicke."
    },
    "highRisk": false
  },
  {
    "id": "midazolam",
    "genericName": "Midazolam HCl",
    "brandNames": [
      "Versed",
      "Dormicum",
      "Miloz",
      "Fortanest"
    ],
    "drugClass": "Water-Soluble Short-Acting Benzodiazepine",
    "indications": {
      "en": "Preoperative anxiolysis, procedural sedation, amnesia, induction adjunct, status epilepticus.",
      "id": "Ansiolisis prabedah, sedasi prosedural, amnesia, ajuvan induksi, status epileptikus."
    },
    "contraindications": {
      "en": "Acute narrow-angle glaucoma, severe respiratory insufficiency, known benzodiazepine allergy.",
      "id": "Glaukoma sudut sempit akut, insufisiensi pernapasan berat, alergi benzodiazepin."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "mg",
      "maxDose": 5,
      "frequency": "IV bolus titrated in small increments",
      "bolusDose": "Premedication/Anxiolysis: 0.02 - 0.04 mg/kg IV (typically 1 - 2 mg in adults); Induction: 0.15 - 0.3 mg/kg IV",
      "notes": {
        "en": "Potent anterograde amnesia. Marked synergistic respiratory depression when combined with opioids!",
        "id": "Amnesia anterograd kuat. Depresi napas sangat sinergis bila dikombinasikan dengan opioid!"
      }
    },
    "onset": "1 - 3 minutes",
    "peak": "3 - 5 minutes",
    "duration": "30 - 60 minutes",
    "metabolism": "Hepatic CYP3A4 hydroxylation to 1-hydroxymidazolam (active metabolite; accumulates in renal failure).",
    "clinicalPearls": {
      "en": "Water-soluble imidazole ring open at ampoule pH 3.5 (prevents injection pain and phlebitis); ring closes at physiologic pH 7.4 becoming highly lipophilic to cross the blood-brain barrier. Specific reversal with Flumazenil.",
      "id": "Larut dalam air pada pH ampul (tidak nyeri saat disuntik); cincin menutup pada pH darah 7.4 menjadi sangat larut lemak dan cepat masuk ke otak. Antidotum spesifik: Flumazenil."
    },
    "highRisk": true
  },
  {
    "id": "lorazepam",
    "genericName": "Lorazepam",
    "brandNames": [
      "Ativan",
      "Merlopam",
      "Renaquil"
    ],
    "drugClass": "Intermediate-Acting Benzodiazepine",
    "indications": {
      "en": "Status epilepticus termination, acute agitation, prolonged pre-op anxiolysis, alcohol withdrawal delirium.",
      "id": "Penghentian status epileptikus, agitasi akut, ansiolisis prabedah durasi sedang, delirium putus alkohol."
    },
    "contraindications": {
      "en": "Severe respiratory depression, acute narrow-angle glaucoma, severe hepatic encephalopathy.",
      "id": "Depresi pernapasan berat, glaukoma sudut sempit, ensefalopati hepatikum berat."
    },
    "dosing": {
      "dosePerKg": 0.03,
      "unit": "mg",
      "maxDose": 4,
      "frequency": "Slow IV push over 2 minutes",
      "bolusDose": "0.02 - 0.04 mg/kg IV slow push (typically 1 - 2 mg in adults; max 4 mg in status epilepticus)",
      "notes": {
        "en": "Formulated in propylene glycol vehicle. High-dose continuous infusions can cause propylene glycol lactic acidosis and AKI.",
        "id": "Mengandung propilen glikol. Infus dosis tinggi dapat memicu asidosis laktat propilen glikol dan gagal ginjal akut."
      }
    },
    "onset": "5 - 15 minutes",
    "peak": "30 minutes",
    "duration": "6 - 8 hours",
    "metabolism": "Direct hepatic glucuronidation to inactive lorazepam-glucuronide (no CYP450 involvement; safe in liver disease).",
    "clinicalPearls": {
      "en": "First-line medication for terminating status epilepticus due to longer central anticonvulsant duration than diazepam. Because metabolism is direct glucuronidation without CYP450, it is the safest benzodiazepine in liver cirrhosis and elderly patients.",
      "id": "Obat lini pertama untuk menghentikan status epileptikus karena durasi antikejang sentralnya lebih panjang dibanding diazepam. Tidak melalui CYP450 sehingga paling aman untuk penyakit hati."
    },
    "highRisk": true
  },
  {
    "id": "dexmedetomidine",
    "genericName": "Dexmedetomidine HCl",
    "brandNames": [
      "Precedex",
      "Dexdor"
    ],
    "drugClass": "Highly Selective Alpha-2 Adrenergic Agonist (1600:1 Alpha-2:Alpha-1)",
    "indications": {
      "en": "Procedural sedation, awake fiberoptic intubation, ICU sedation in mechanically ventilated patients, emergence delirium prevention.",
      "id": "Sedasi prosedural, intubasi fiberoptik sadar, sedasi ICU ventilasi mekanik, pencegahan delirium siuman."
    },
    "contraindications": {
      "en": "Advanced heart block (2nd or 3rd degree without pacemaker), severe uncontrolled bradycardia or hypotension.",
      "id": "Blok AV derajat 2 atau 3 tanpa pacu jantung, bradikardia berat atau hipotensi berat tidak terkontrol."
    },
    "dosing": {
      "dosePerKg": 0.001,
      "unit": "mg",
      "maxDose": 0.1,
      "frequency": "Continuous IV infusion via dedicated syringe pump",
      "bolusDose": "Loading dose: 0.5 - 1.0 mcg/kg IV over 10-20 minutes (frequently omitted to prevent acute bradycardia)",
      "infusionDose": "Maintenance: 0.2 - 1.4 mcg/kg/h",
      "notes": {
        "en": "DOES NOT CAUSE RESPIRATORY DEPRESSION! Produces natural-like \"cooperative sedation\" where patients remain easily arousable.",
        "id": "TIDAK MENYEBABKAN DEPRESI PERNAPASAN! Menghasilkan sedasi kooperatif di mana pasien mudah dibangunkan dan dapat diajak bicara."
      }
    },
    "onset": "5 - 10 minutes",
    "peak": "15 minutes",
    "duration": "60 - 120 minutes (elimination half-life ~2 hours)",
    "metabolism": "Extensive hepatic biotransformation via direct glucuronidation and CYP2A6.",
    "clinicalPearls": {
      "en": "Unique sedative that preserves spontaneous respiratory drive—ideal for anticipated difficult airway awake fiberoptic intubations. Acts on locus coeruleus to induce non-REM stage 3 sleep. Can produce dose-dependent sinus bradycardia and biphasic blood pressure response.",
      "id": "Satu-satunya sedatif yang mempertahankan ventilasi spontan—sangat ideal untuk intubasi sadar jalan napas sulit. Bekerja pada lokus seruleus menghasilkan pola tidur alami. Pantau bradikardia."
    },
    "highRisk": true
  },
  {
    "id": "flumazenil",
    "genericName": "Flumazenil",
    "brandNames": [
      "Anexate",
      "Romazicon"
    ],
    "drugClass": "Specific Benzodiazepine Receptor Antagonist (Competitive GABA-A)",
    "indications": {
      "en": "Complete or partial reversal of benzodiazepine sedation or acute benzodiazepine overdose.",
      "id": "Pembalikan total atau parsial sedasi benzodiazepin atau overdosis akut benzodiazepin."
    },
    "contraindications": {
      "en": "Patients on chronic benzodiazepines or with history of seizures (precipitates life-threatening refractory status epilepticus), concurrent tricyclic antidepressant (TCA) overdose.",
      "id": "Pasien dengan riwayat kejang atau pengguna benzodiazepin kronis (memicu status epileptikus fatal refrakter), overdosis TCA."
    },
    "dosing": {
      "dosePerKg": 0.003,
      "unit": "mg",
      "maxDose": 1,
      "frequency": "Titrated IV bolus in 0.1 - 0.2 mg increments",
      "bolusDose": "0.2 mg IV over 15 seconds; repeat 0.1 - 0.2 mg q60s up to max 1.0 mg (max 2.0 mg in ICU)",
      "notes": {
        "en": "Duration of action (45-60 min) is shorter than midazolam or lorazepam; monitor for resedation.",
        "id": "Durasi kerja (45-60 menit) lebih singkat dibanding midazolam/lorazepam; awasi risiko pasien tertidur kembali."
      }
    },
    "onset": "1 - 2 minutes",
    "peak": "3 - 5 minutes",
    "duration": "45 - 60 minutes",
    "metabolism": "Rapid hepatic biotransformation to inactive carboxylic acid.",
    "clinicalPearls": {
      "en": "Specific competitive antagonist at benzodiazepine binding site on GABA-A receptor. Because its half-life is shorter than the agonist, resedation can occur 1-2 hours later. Contraindicated in chronic benzodiazepine users because acute receptor blockade triggers unyielding convulsive status epilepticus.",
      "id": "Antagonis kompetitif spesifik reseptor benzodiazepin pada GABA-A. Pasien dapat tertidur kembali setelah 1 jam. Sangat kontraindikasi pada pengguna benzodiazepin kronis karena memicu kejang hebat yang sulit dihentikan."
    },
    "highRisk": true
  },
  {
    "id": "ondansetron",
    "genericName": "Ondansetron HCl",
    "brandNames": [
      "Zofran",
      "Narfoz",
      "Vomceran",
      "Cetero",
      "Ondansetron OGB"
    ],
    "drugClass": "5-HT3 Serotonin Receptor Antagonist",
    "indications": {
      "en": "Prevention and treatment of postoperative nausea and vomiting (PONV), chemotherapy-induced emesis.",
      "id": "Pencegahan dan pengobatan mual dan muntah pasca-operasi (PONV), emesis kemoterapi."
    },
    "contraindications": {
      "en": "Congenital long QT syndrome, concurrent apomorphine administration (causes profound hypotension and syncope).",
      "id": "Sindrom QT panjang kongenital, penggunaan bersama apomorfin (memicu hipotensi berat dan pingsan)."
    },
    "dosing": {
      "dosePerKg": 0.06,
      "unit": "mg",
      "maxDose": 8,
      "frequency": "IV slow push over 2-5 min at conclusion of surgery",
      "bolusDose": "Adult PONV: 4 - 8 mg IV slow push over 2-5 min at END of surgery; Pediatric: 0.1 mg/kg IV (max 4 mg)",
      "notes": {
        "en": "Most effective when administered at the CONCLUSION of surgery (30 min prior to emergence), not at induction.",
        "id": "Paling efektif diberikan pada AKHIR operasi (30 menit sebelum siuman), bukan saat induksi."
      }
    },
    "onset": "15 - 30 minutes",
    "peak": "30 minutes",
    "duration": "4 - 8 hours",
    "metabolism": "Extensive hepatic hydroxylation and conjugation via CYP3A4, CYP1A2, and CYP2D6.",
    "clinicalPearls": {
      "en": "Cornerstone antiemetic in anesthesia. Most efficacious when given at end of surgery. May cause mild dose-dependent QT prolongation and headache. Safe in pregnancy and pediatrics.",
      "id": "Antiemetik pilar utama anestesi. Paling efektif diberikan pada akhir operasi sebelum bangun. Dapat memperpanjang interval QT ringan dan menyebabkan sakit kepala."
    },
    "highRisk": false
  },
  {
    "id": "dexamethasone",
    "genericName": "Dexamethasone Sodium Phosphate",
    "brandNames": [
      "Kalmethasone",
      "Cortidex",
      "Indexon",
      "Dexamethasone OGB"
    ],
    "drugClass": "Long-Acting Corticosteroid / Antiemetic Adjunct",
    "indications": {
      "en": "PONV prophylaxis, airway edema prevention/treatment, multimodal analgesia adjunct, post-extubation stridor.",
      "id": "Profilaksis PONV, pencegahan edema jalan napas, ajuvan analgesia multimodal, stridor pasca-ekstubasi."
    },
    "contraindications": {
      "en": "Systemic fungal infection, known corticosteroid hypersensitivity.",
      "id": "Infeksi jamur sistemik, hipersensitivitas kortikosteroid."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Single IV dose administered at INDUCTION",
      "bolusDose": "PONV prophylaxis: 4 - 8 mg IV at INDUCTION; Airway edema: 8 - 10 mg IV; Pediatric: 0.15 mg/kg IV (max 8 mg)",
      "notes": {
        "en": "Administer at INDUCTION of anesthesia (opposite of ondansetron) due to delayed onset via genomic receptor modulation.",
        "id": "Berikan saat INDUKSI anestesi (berbeda dengan ondansetron) karena onset kerjanya membutuhkan modulasi transkripsi gen."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "4 - 8 hours",
    "duration": "24 - 72 hours (biological half-life 36 - 54 hours)",
    "metabolism": "Hepatic metabolism to inactive 6-hydroxydexamethasone.",
    "clinicalPearls": {
      "en": "Provides dual benefit: highly potent antiemetic plus opioid-sparing anti-inflammatory analgesia. Administering rapid IV bolus in awake patients causes severe perineal burning/pruritus. May cause transient mild postoperative hyperglycemia.",
      "id": "Memberikan manfaat ganda: antiemetik poten sekaligus pereda nyeri antiinflamasi. Suntikan cepat pada pasien sadar memicu rasa terbakar di area perineum. Pantau gula darah."
    },
    "highRisk": false
  },
  {
    "id": "droperidol",
    "genericName": "Droperidol",
    "brandNames": [
      "Inapsine",
      "Droleptan"
    ],
    "drugClass": "Butyrophenone Dopamine (D2) Receptor Antagonist",
    "indications": {
      "en": "Prevention and rescue treatment of PONV, sedation in acute delirium/agitation.",
      "id": "Pencegahan dan pengobatan darurat PONV, sedasi pada agitasi/delirium akut."
    },
    "contraindications": {
      "en": "Known QT prolongation (QTc > 450 ms in males, > 470 ms in females), Parkinson disease, severe CNS depression.",
      "id": "Pemanjangan interval QT (QTc > 450 ms pria, > 470 ms wanita), penyakit Parkinson, depresi SSP berat."
    },
    "dosing": {
      "dosePerKg": 0.015,
      "unit": "mg",
      "maxDose": 1.25,
      "frequency": "Single low-dose IV bolus at conclusion of surgery",
      "bolusDose": "Low-dose PONV: 0.625 - 1.25 mg IV push at end of surgery",
      "notes": {
        "en": "Exceptionally potent antiemetic at sub-sedative doses (0.625 mg). FDA black box warning for QT prolongation / Torsades.",
        "id": "Sangat poten mencegah mual pada dosis rendah (0.625 mg). Waspadai peringatan perpanjangan interval QT."
      }
    },
    "onset": "3 - 10 minutes",
    "peak": "30 minutes",
    "duration": "2 - 4 hours (sedation up to 12h)",
    "metabolism": "Hepatic oxidation via CYP3A4.",
    "clinicalPearls": {
      "en": "Low dose (0.625 mg) equals ondansetron 4 mg in antiemetic efficacy. D2 blockade in the CTZ is synergistic with 5-HT3 antagonists and dexamethasone. Can occasionally cause extrapyramidal symptoms or akathisia (restlessness).",
      "id": "Dosis rendah (0.625 mg) memiliki efikasi setara ondansetron 4 mg. Sangat sinergis bila dipadukan dengan ondansetron dan deksametason. Dapat memicu gejala ekstrapiramidal atau akatisia."
    },
    "highRisk": true
  },
  {
    "id": "metoclopramide",
    "genericName": "Metoclopramide HCl",
    "brandNames": [
      "Primperan",
      "Plasil",
      "Damaben",
      "Metoclopramide OGB",
      "Reglan"
    ],
    "drugClass": "Prokinetic & Central Dopamine (D2) Antagonist",
    "indications": {
      "en": "Gastric emptying facilitation for full stomach/emergency RSI, diabetic gastroparesis, PONV prophylaxis.",
      "id": "Pengosongan lambung darurat sebelum intubasi lambung penuh, gastroparesis diabetik, profilaksis PONV."
    },
    "contraindications": {
      "en": "Mechanical GI obstruction, perforation, or hemorrhage; pheochromocytoma; Parkinson disease; seizure disorders.",
      "id": "Obstruksi mekanik, perforasi, atau perdarahan saluran cerna; feokromositoma; Parkinson; riwayat kejang."
    },
    "dosing": {
      "dosePerKg": 0.15,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "IV slow push over 2 minutes",
      "bolusDose": "10 mg IV slow push over 1-2 min; Pediatric: 0.1 - 0.15 mg/kg IV",
      "notes": {
        "en": "Increases lower esophageal sphincter (LES) tone and accelerates gastric emptying without changing gastric acid pH.",
        "id": "Meningkatkan tonus sfingter esofagus bawah dan mempercepat pengosongan lambung tanpa mengubah pH asam lambung."
      }
    },
    "onset": "1 - 3 minutes",
    "peak": "10 minutes",
    "duration": "1 - 2 hours",
    "metabolism": "Hepatic CYP2D6 metabolism; excreted renally.",
    "clinicalPearls": {
      "en": "Promotes antegrade gastric motility. Inject slowly over 2 minutes; rapid IV push causes distressing acute akathisia, anxiety, and motor restlessness. Incompatible with concurrent atropine/glycopyrrolate (anticholinergics abolish prokinetic effect).",
      "id": "Mendorong motilitas lambung ke arah usus. Wajib disuntikkan perlahan selama 2 menit; suntikan cepat memicu kecemasan akut dan rasa gelisah motorik (akatisia). Dibatalkan oleh atropin."
    },
    "highRisk": false
  },
  {
    "id": "pantoprazole",
    "genericName": "Pantoprazole Sodium",
    "brandNames": [
      "Pantozol",
      "Panloc",
      "Pranza",
      "Pantoprazole OGB",
      "Protonix"
    ],
    "drugClass": "Proton Pump Inhibitor (PPI)",
    "indications": {
      "en": "Aspiration pneumonitis prophylaxis, acute upper GI bleeding, peptic ulcer disease, stress ulcer prophylaxis.",
      "id": "Profilaksis pneumonia aspirasi, perdarahan saluran cerna atas akut, tukak peptik, profilaksis ulkus stres."
    },
    "contraindications": {
      "en": "Known hypersensitivity to pantoprazole or substituted benzimidazoles.",
      "id": "Hipersensitivitas terhadap pantoprazol atau turunan benzimidazol."
    },
    "dosing": {
      "dosePerKg": 0.6,
      "unit": "mg",
      "maxDose": 80,
      "frequency": "IV slow push or infusion q12-24h",
      "bolusDose": "Prophylaxis: 40 mg IV slow push or infused over 15 min; Upper GI bleed: 80 mg IV bolus then 8 mg/h infusion",
      "notes": {
        "en": "Raises gastric pH above 4.0 within 1 hour, reducing morbidity from acid aspiration (Mendelson syndrome).",
        "id": "Menaikkan pH lambung di atas 4.0 dalam 1 jam, mengurangi keparahan jika terjadi aspirasi asam lambung (sindrom Mendelson)."
      }
    },
    "onset": "15 - 30 minutes",
    "peak": "2 hours",
    "duration": "24 hours",
    "metabolism": "Hepatic CYP2C19 and CYP3A4 to inactive metabolites.",
    "clinicalPearls": {
      "en": "Reduces gastric acid volume and increases pH, providing critical protection against destructive chemical pneumonitis in emergency and obstetric anesthesia. Low CYP2C19 drug interaction profile compared to omeprazole.",
      "id": "Menurunkan volume keasaman lambung, melindungi paru dari kerusakan kimiawi parah jika terjadi aspirasi saat induksi darurat. Interaksi obat jauh lebih sedikit dibanding omeprazol."
    },
    "highRisk": false
  },
  {
    "id": "tranexamic-acid",
    "genericName": "Tranexamic Acid (TXA)",
    "brandNames": [
      "Kalnex",
      "Asamnex",
      "Plasmil",
      "Transamin",
      "Cyklokapron"
    ],
    "drugClass": "Antifibrinolytic / Synthetic Lysine Analogue",
    "indications": {
      "en": "Trauma hemorrhage (CRASH-2 protocol), postpartum hemorrhage (WOMAN trial), cardiac surgery, major orthopedic/spine surgery, hyperfibrinolysis.",
      "id": "Perdarahan trauma (protokol CRASH-2), perdarahan pasca salin (PPH), bedah jantung, bedah ortopedi mayor, hiperfibrinolisis."
    },
    "contraindications": {
      "en": "Active thromboembolic disease (DVT, PE), subarachnoid hemorrhage, acquired defective color vision.",
      "id": "Penyakit tromboemboli aktif (DVT, emboli paru), perdarahan subaraknoid, gangguan penglihatan warna didapat."
    },
    "dosing": {
      "dosePerKg": 15,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "IV infusion over 10-20 min; maintenance infusion or q8h",
      "bolusDose": "Trauma / Obstetric: 1000 mg (1 g) IV over 10 minutes; Surgical: 10 - 20 mg/kg IV over 20 min",
      "infusionDose": "Continuous infusion: 1 - 5 mg/kg/h or repeat 1000 mg at 8h",
      "notes": {
        "en": "Administer within 3 hours of trauma or bleeding onset for maximal survival benefit (no benefit and potential harm if >3h).",
        "id": "Berikan dalam 3 jam pertama sejak cedera/perdarahan untuk manfaat sintasan maksimal (tidak bermanfaat jika >3 jam)."
      }
    },
    "onset": "5 - 15 minutes",
    "peak": "End of infusion",
    "duration": "3 - 4 hours",
    "metabolism": ">95% excreted unchanged in urine by glomerular filtration.",
    "clinicalPearls": {
      "en": "Competitively inhibits plasminogen activation to plasmin, halting fibrin clot breakdown. Massive trials (CRASH-2, WOMAN) prove reduced mortality without increased thromboembolism. Rapid IV push or high doses (>20-30 mg/kg) cause convulsive SEIZURES via GABA-A antagonism.",
      "id": "Menghambat penguraian bekuan darah oleh plasmin. Terbukti menurunkan kematian pada trauma dan perdarahan obstetri. Suntikan cepat atau dosis berlebihan dapat memicu kejang epileptik akibat antagonisme GABA-A."
    },
    "highRisk": true
  },
  {
    "id": "protamine-sulfate",
    "genericName": "Protamine Sulfate",
    "brandNames": [
      "Protamine Choay",
      "Protamine Sulfate Hameln",
      "Protamine OGB"
    ],
    "drugClass": "Specific Heparin Antidote / Basic Polycationic Peptide",
    "indications": {
      "en": "Neutralization of unfractionated heparin anticoagulation post-cardiopulmonary bypass, vascular surgery, or heparin overdose.",
      "id": "Netralisasi efek antikoagulasi heparin pasca-mesin CPB, bedah vaskular, atau overdosis heparin."
    },
    "contraindications": {
      "en": "Known protamine hypersensitivity, previous adverse reaction to protamine.",
      "id": "Hipersensitivitas protamin, riwayat reaksi anafilaktik protamin sebelumnya."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 50,
      "frequency": "Slow IV infusion over at least 10 minutes (max 50 mg in 10 min)",
      "bolusDose": "1 mg per 100 units of circulating active Unfractionated Heparin (slowly over 10-15 minutes)",
      "notes": {
        "en": "Positively charged polycation forms stable salt with negatively charged heparin. Excess uncomplexed protamine exerts its own anticoagulant effect!",
        "id": "Polikation bermuatan positif mengikat heparin membentuk garam netral. Kelebihan protamin bebas justru bersifat antikoagulan!"
      }
    },
    "onset": "< 1 minute IV",
    "peak": "2 - 5 minutes",
    "duration": "2 hours",
    "metabolism": "Neutralization complex is taken up and cleared by the reticuloendothelial system.",
    "clinicalPearls": {
      "en": "High risk of severe anaphylactoid reaction in patients with: prior NPH insulin use, fish allergy (derived from salmon sperm), or vasectomy. Rapid IV injection causes catastrophic PULMONARY HYPERTENSION, acute right ventricular failure, and profound systemic collapse.",
      "id": "Risiko tinggi reaksi anafilaksis berat pada: pengguna insulin NPH, alergi ikan, atau pasca-vasektomi. Injeksi cepat memicu HIPERTENSI PULMONAL KATASTROFIK dan kolaps ventrikel kanan."
    },
    "highRisk": true
  },
  {
    "id": "desmopressin",
    "genericName": "Desmopressin Acetate (DDAVP)",
    "brandNames": [
      "Minirin",
      "Octostim",
      "DDAVP"
    ],
    "drugClass": "Synthetic Vasopressin V2 Receptor Analogue",
    "indications": {
      "en": "von Willebrand disease Type 1, mild Hemophilia A, antiplatelet (aspirin/clopidogrel)-induced platelet dysfunction in urgent surgery.",
      "id": "Penyakit von Willebrand Tipe 1, Hemofilia A ringan, disfungsi trombosit akibat antiplatelet (aspirin/clopidogrel) pada bedah darurat."
    },
    "contraindications": {
      "en": "Severe hyponatremia, CrCl < 50 mL/min, unstable angina, von Willebrand disease Type 2B (causes thrombocytopenia).",
      "id": "Hiponatremia berat, gagal ginjal CrCl < 50 mL/menit, angina pektoris tidak stabil, vWD Tipe 2B."
    },
    "dosing": {
      "dosePerKg": 0.0003,
      "unit": "mg",
      "maxDose": 0.03,
      "frequency": "IV infusion over 20-30 minutes",
      "bolusDose": "0.3 mcg/kg IV (0.0003 mg/kg) in 50 mL saline infused over 20 - 30 minutes",
      "notes": {
        "en": "Stimulates release of endogenous vWF, Factor VIII, and tPA from endothelial Weibel-Palade bodies.",
        "id": "Menstimulasi pelepasan vWF, Faktor VIII, dan tPA endogen dari endotel pembuluh darah."
      }
    },
    "onset": "30 minutes",
    "peak": "60 - 90 minutes",
    "duration": "6 - 8 hours",
    "metabolism": "Hepatic and renal clearance.",
    "clinicalPearls": {
      "en": "Reverses aspirin- and uremia-induced platelet dysfunction for urgent surgery. Free water retention risk: fluid restrict patient and monitor serum sodium to avoid severe dilutional hyponatremia, cerebral edema, and seizures.",
      "id": "Memulihkan fungsi trombosit akibat aspirin atau uremia untuk operasi darurat. Memiliki efek retensi cairan: batasi asupan cairan dan pantau natrium serum untuk mencegah hiponatremia."
    },
    "highRisk": false
  },
  {
    "id": "prothrombin-complex-concentrate",
    "genericName": "Prothrombin Complex Concentrate (4F-PCC)",
    "brandNames": [
      "Beriplex P/N",
      "Octaplex",
      "Cofact",
      "Kcentra"
    ],
    "drugClass": "Four-Factor Hemostatic Concentrate (Factors II, VII, IX, X, Protein C & S)",
    "indications": {
      "en": "Urgent reversal of acquired coagulation factor deficiency induced by Vitamin K antagonists (Warfarin) with acute major bleeding or emergency surgery.",
      "id": "Pembalikan darurat defisiensi faktor pembekuan akibat antagonis Vitamin K (Warfarin) dengan perdarahan mayor atau operasi darurat."
    },
    "contraindications": {
      "en": "Disseminated intravascular coagulation (DIC), heparin-induced thrombocytopenia (HIT; some brands contain trace heparin).",
      "id": "Koagulasi intravaskular diseminata (DIC), trombositopenia akibat heparin (HIT)."
    },
    "dosing": {
      "dosePerKg": 25,
      "unit": "units",
      "maxDose": 5000,
      "frequency": "Single IV infusion dosed by pre-treatment INR",
      "bolusDose": "INR 2 to <4: 25 units Factor IX/kg (max 2500 U); INR 4 to 6: 35 units/kg (max 3500 U); INR >6: 50 units/kg (max 5000 U)",
      "notes": {
        "en": "Infuse at <= 8.4 mL/min (<= 210 units/min). ALWAYS co-administer Vitamin K 10 mg IV to sustain factor production.",
        "id": "Infus dengan kecepatan <= 8.4 mL/menit. WAJIB disertai Vitamin K 10 mg IV agar efek pembekuan bertahan."
      }
    },
    "onset": "Immediate (< 15 - 30 minutes to normalize INR)",
    "peak": "End of infusion",
    "duration": "Normal factor half-lives (Factor VII shortest ~6 hours)",
    "metabolism": "Physiological clearance of human coagulation factors.",
    "clinicalPearls": {
      "en": "First-line for urgent warfarin reversal with active bleeding or emergency surgery. Vastly superior to Fresh Frozen Plasma (FFP) because it normalizes INR within 15 minutes, has zero risk of volume overload (administered in 50-100 mL vs 1500 mL FFP), and carries minimal pathogen risk.",
      "id": "Pilihan pertama pembalikan warfarin darurat. Jauh lebih unggul dibanding FFP (plasma beku segar) karena menormalkan INR dalam 15 menit tanpa risiko kelebihan cairan (volume hanya 50-100 mL)."
    },
    "highRisk": true
  },
  {
    "id": "cefazolin",
    "genericName": "Cefazolin Sodium",
    "brandNames": [
      "Cefazolin OGB",
      "Cazolin",
      "Kefzol",
      "Ancef"
    ],
    "drugClass": "First-Generation Cephalosporin Antibiotic",
    "indications": {
      "en": "Surgical antimicrobial prophylaxis for clean and clean-contaminated procedures (cardiac, orthopedic, general, vascular, OB/GYN).",
      "id": "Profilaksis antibiotik bedah untuk operasi bersih dan bersih-terkontaminasi (bedah tulang, jantung, obgyn, digestif)."
    },
    "contraindications": {
      "en": "Severe immediate IgE-mediated anaphylaxis to cephalosporins.",
      "id": "Riwayat anafilaksis IgE berat terhadap sefalosporin."
    },
    "dosing": {
      "dosePerKg": 30,
      "unit": "mg",
      "maxDose": 3000,
      "frequency": "IV push / infusion within 60 min prior to incision; redose q4h",
      "bolusDose": "Standard adult: 2000 mg (2 g) IV; Weight >= 120 kg: 3000 mg (3 g) IV; Pediatric: 30 mg/kg IV",
      "notes": {
        "en": "Administer within 30-60 minutes before surgical incision. Redose every 4 hours intraoperatively.",
        "id": "Suntikkan 30-60 menit sebelum sayatan kulit. Ulangi dosis setiap 4 jam selama operasi berlangsung."
      }
    },
    "onset": "End of infusion",
    "peak": "5 minutes post-infusion",
    "duration": "4 hours (intraoperative redosing interval)",
    "metabolism": "Excreted unchanged in urine by glomerular filtration (80-100%).",
    "clinicalPearls": {
      "en": "Workhorse #1 antibiotic for surgical prophylaxis worldwide. Excellent bactericidal activity against MSSA and Streptococcus. Cross-reactivity with penicillin allergy is negligible (<1-2%); safe in non-severe penicillin reactions.",
      "id": "Antibiotik profilaksis bedah nomor satu di dunia. Sangat efektif melawan Staph dan Strep. Reaktivitas silang dengan alergi penisilin sangat rendah (<1-2%)."
    },
    "highRisk": false
  },
  {
    "id": "cefuroxime",
    "genericName": "Cefuroxime Sodium",
    "brandNames": [
      "Zinnat",
      "Sharox",
      "Cefuroxime OGB",
      "Ceftum",
      "Zinacef"
    ],
    "drugClass": "Second-Generation Cephalosporin Antibiotic",
    "indications": {
      "en": "Surgical prophylaxis in cardiothoracic, vascular, orthopedic, and abdominal surgery; respiratory tract infections.",
      "id": "Profilaksis bedah kardiotoraks, vaskular, ortopedi, dan abdomen; infeksi saluran napas."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to cephalosporins or beta-lactams.",
      "id": "Hipersensitivitas berat terhadap sefalosporin atau beta-laktam."
    },
    "dosing": {
      "dosePerKg": 25,
      "unit": "mg",
      "maxDose": 1500,
      "frequency": "IV infusion over 15-30 min within 60 min prior to incision; redose q4h",
      "bolusDose": "1500 mg (1.5 g) IV infused over 15-30 min; Pediatric: 50 mg/kg IV",
      "notes": {
        "en": "Expanded Gram-negative coverage compared to cefazolin. Intraoperative redosing interval is 4 hours.",
        "id": "Spektrum Gram negatif lebih luas dibanding sefazolin. Interval pengulangan durante operasi adalah 4 jam."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "4 hours (redosing interval)",
    "metabolism": "Excreted unchanged in urine (90%).",
    "clinicalPearls": {
      "en": "Provides broader Gram-negative coverage (H. influenzae, E. coli, Klebsiella) while preserving robust Gram-positive activity. Frequently chosen in cardiothoracic and open orthopedic procedures.",
      "id": "Cakupan Gram negatif lebih luas dibanding sefazolin. Sering digunakan pada bedah toraks dan ortopedi mayor."
    },
    "highRisk": false
  },
  {
    "id": "vancomycin",
    "genericName": "Vancomycin HCl",
    "brandNames": [
      "Vancocin",
      "Vancep",
      "Vancomycin OGB",
      "Vancomycin Hameln"
    ],
    "drugClass": "Glycopeptide Antibiotic",
    "indications": {
      "en": "Surgical prophylaxis in MRSA carriers or high-risk institutional settings; severe Gram-positive infections; C. difficile colitis (oral).",
      "id": "Profilaksis bedah pada kolonisasi MRSA atau institusi endemis; infeksi Gram positif berat; kolitis C. difficile (oral)."
    },
    "contraindications": {
      "en": "Known hypersensitivity to vancomycin.",
      "id": "Hipersensitivitas terhadap vankomisin."
    },
    "dosing": {
      "dosePerKg": 15,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "IV infusion at rate <= 1000 mg/hour (minimum 60-90 min); redose q8-12h",
      "bolusDose": "15 mg/kg IV (typically 1000 - 1500 mg) infused over 60 - 120 minutes",
      "notes": {
        "en": "Start infusion within 60-120 minutes before surgical incision. Infusion rate must NOT exceed 1000 mg/hour.",
        "id": "Mulai infus 60-120 menit sebelum sayatan bedah. Kecepatan infus TIDAK BOLEH melebihi 1000 mg/jam."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "8 - 12 hours (redosing interval)",
    "metabolism": "80-90% eliminated unchanged in urine by glomerular filtration.",
    "clinicalPearls": {
      "en": "Indicated for surgical prophylaxis in confirmed MRSA colonization, cardiac implant surgery, or severe beta-lactam anaphylaxis. Rapid infusion causes \"Red Man Syndrome\" (histaminoid flushing, erythema, pruritus, and hypotension); prevent by slowing infusion rate to <=1000 mg/h.",
      "id": "Pilihan profilaksis pada pembawa MRSA atau alergi berat beta-laktam. Infus yang terlalu cepat memicu \"Red Man Syndrome\" (kemerahan masif di leher/wajah dan hipotensi); perlambat laju infus."
    },
    "highRisk": true
  },
  {
    "id": "clindamycin",
    "genericName": "Clindamycin Phosphate",
    "brandNames": [
      "Dalacin C",
      "Prolic",
      "Clinium",
      "Clindamycin OGB",
      "Cleocin"
    ],
    "drugClass": "Lincosamide Antibiotic",
    "indications": {
      "en": "Surgical prophylaxis for penicillin-allergic patients; Gram-positive and anaerobic soft tissue infections; toxic shock syndrome antitoxin.",
      "id": "Profilaksis bedah pada pasien alergi penisilin; infeksi jaringan lunak anaerob dan Gram positif."
    },
    "contraindications": {
      "en": "History of pseudomembranous colitis / Clostridioides difficile colitis, ulcerative colitis.",
      "id": "Riwayat kolitis pseudomembranosa / infeksi C. difficile, kolitis ulseratif."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 900,
      "frequency": "IV infusion over 30 min within 60 min before incision; redose q6h",
      "bolusDose": "900 mg IV infused over 30 minutes; Pediatric: 10 mg/kg IV",
      "notes": {
        "en": "Does NOT cover Gram-negative pathogens; combine with gentamicin or cefazolin if indicated. Redose every 6 hours.",
        "id": "TIDAK mencakup kuman Gram negatif; kombinasikan dengan gentamisin jika diperlukan. Ulangi dosis setiap 6 jam."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "6 hours (redosing interval)",
    "metabolism": "Extensive hepatic CYP3A4 metabolism; excreted in bile and urine.",
    "clinicalPearls": {
      "en": "Primary alternative for surgical prophylaxis against Gram-positive staphylococci and anaerobes in patients with severe penicillin anaphylaxis. Has intrinsic mild neuromuscular blocking properties and potentiates nondepolarizing NMBAs.",
      "id": "Alternatif utama profilaksis bedah pada pasien alergi penisilin berat. Memiliki efek pelemas otot intrinsik ringan dan memperkuat blokade neuromuskular NMB."
    },
    "highRisk": false
  },
  {
    "id": "metronidazole",
    "genericName": "Metronidazole",
    "brandNames": [
      "Flagyl",
      "Trichodazol",
      "Fladex",
      "Metronidazole Infus OGB"
    ],
    "drugClass": "Nitroimidazole Antibacterial & Antiprotozoal",
    "indications": {
      "en": "Surgical prophylaxis for colorectal, contaminated abdominal, and gynecologic surgery; intra-abdominal anaerobic infections.",
      "id": "Profilaksis bedah kolorektal, digestif terkontaminasi, dan ginekologi; infeksi anaerob intraabdomen."
    },
    "contraindications": {
      "en": "First trimester of pregnancy, concurrent disulfiram use, hypersensitivity.",
      "id": "Trimester pertama kehamilan, penggunaan bersama disulfiram, hipersensitivitas."
    },
    "dosing": {
      "dosePerKg": 7.5,
      "unit": "mg",
      "maxDose": 500,
      "frequency": "IV infusion over 20-30 min within 60 min prior to incision; redose q8-12h",
      "bolusDose": "500 mg IV infused over 20-30 min; Pediatric: 15 mg/kg IV",
      "notes": {
        "en": "Gold standard anaerobic bactericidal agent (Bacteroides fragilis). Redose q8-12h intraoperatively.",
        "id": "Standar emas pembunuh bakteri anaerob (Bacteroides fragilis). Ulangi dosis setiap 8-12 jam."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "8 - 12 hours (redosing interval)",
    "metabolism": "Extensive hepatic metabolism via CYP2A6 and CYP3A4.",
    "clinicalPearls": {
      "en": "Essential companion to cefazolin or cefuroxime in colorectal and contaminated abdominal surgeries to cover anaerobes. Causes disulfiram-like ethanol reaction. Long half-life rarely requires intraoperative redosing for cases <8 hours.",
      "id": "Kombinasi wajib bersama sefazolin pada bedah kolorektal untuk membasmi anaerob usus. Memiliki reaksi seperti disulfiram terhadap alkohol. Waktu paruh panjang."
    },
    "highRisk": false
  },
  {
    "id": "gentamicin",
    "genericName": "Gentamicin Sulfate",
    "brandNames": [
      "Sagestam",
      "Gentamicin OGB",
      "Garamycin"
    ],
    "drugClass": "Aminoglycoside Antibiotic",
    "indications": {
      "en": "Surgical prophylaxis Gram-negative coverage in penicillin allergy; severe Gram-negative bacteremia; enterococcal synergy.",
      "id": "Profilaksis bedah kuman Gram negatif pada alergi penisilin; bakteremia Gram negatif berat."
    },
    "contraindications": {
      "en": "Myasthenia gravis, pre-existing vestibular or auditory damage, severe acute kidney injury.",
      "id": "Miastenia gravis, kerusakan vestibular atau pendengaran sebelumnya, gagal ginjal akut berat."
    },
    "dosing": {
      "dosePerKg": 2,
      "unit": "mg",
      "maxDose": 300,
      "frequency": "IV infusion over 30-60 minutes; single pre-op dose",
      "bolusDose": "Surgical prophylaxis: 2.0 mg/kg IV single dose infused over 30-60 min; High-dose once daily: 5 mg/kg IV",
      "notes": {
        "en": "Concentration-dependent bactericidal action. Single pre-op dose covers entire surgical procedure.",
        "id": "Mekanisme bactericidal tergantung konsentrasi. Satu dosis preoperatif mencakup seluruh durasi operasi."
      }
    },
    "onset": "End of infusion",
    "peak": "30 minutes post-infusion",
    "duration": "24 hours (long post-antibiotic effect)",
    "metabolism": "Excreted 100% unchanged in urine by glomerular filtration.",
    "clinicalPearls": {
      "en": "Inhibits presynaptic calcium influx and acetylcholine release at the neuromuscular junction, potentiating neuromuscular blockade (treat with IV calcium or neostigmine). Nephrotoxic and ototoxic; single pre-op dose provides excellent safety.",
      "id": "Menghambat pelepasan asetilkolin di taut neuromuskular, memperkuat efek pelemas otot (atasi dengan kalsium IV). Satu dosis preoperatif memiliki profil keamanan yang baik."
    },
    "highRisk": true
  },
  {
    "id": "ampicillin-sulbactam",
    "genericName": "Ampicillin Sodium / Sulbactam Sodium",
    "brandNames": [
      "Unasyn",
      "Viccillin-SX",
      "Bactesyn",
      "Ampicillin-Sulbactam OGB"
    ],
    "drugClass": "Aminopenicillin + Beta-Lactamase Inhibitor",
    "indications": {
      "en": "Surgical prophylaxis in head and neck, gynecologic, and intra-abdominal surgery; polymicrobial infections.",
      "id": "Profilaksis bedah THT/kepala-leher, ginekologi, dan digestif; infeksi polimikrobial."
    },
    "contraindications": {
      "en": "History of severe penicillin anaphylaxis, history of cholestatic jaundice with ampicillin/sulbactam.",
      "id": "Riwayat anafilaksis berat terhadap penisilin, riwayat ikterus kolestatik akibat ampisilin-sulbaktam."
    },
    "dosing": {
      "dosePerKg": 40,
      "unit": "mg",
      "maxDose": 3000,
      "frequency": "IV infusion over 15-30 min; redose q2-3h intraoperatively",
      "bolusDose": "3000 mg (3 g: 2 g ampicillin + 1 g sulbactam) IV infused over 15-30 min; Pediatric: 50 mg/kg IV",
      "notes": {
        "en": "Short elimination half-life requires intraoperative redosing every 2-3 hours!",
        "id": "Waktu paruh eliminasi singkat mengharuskan pengulangan dosis setiap 2-3 jam selama operasi!"
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "2 - 3 hours (redosing interval)",
    "metabolism": "75-85% excreted unchanged in urine by glomerular filtration and tubular secretion.",
    "clinicalPearls": {
      "en": "Broad coverage against Gram-positive, Gram-negative, and anaerobes. Ideal for head & neck contaminated with oral flora. Short half-life means anesthesiologist must remember to redose every 2-3 hours during long surgeries.",
      "id": "Spektrum luas mencakup kuman aerob dan anaerob mulut. Sangat ideal untuk bedah kepala-leher. Ingat untuk mengulang dosis setiap 2-3 jam pada operasi lama."
    },
    "highRisk": false
  },
  {
    "id": "paracetamol",
    "genericName": "Paracetamol (Oral / Rectal)",
    "brandNames": [
      "Panadol",
      "Sanmol",
      "Biogesic",
      "Tylenol",
      "Dumin",
      "Pamol"
    ],
    "drugClass": "Analgesic / Antipyretic",
    "indications": {
      "en": "Mild to moderate pain, fever, multimodal analgesia baseline.",
      "id": "Nyeri ringan hingga sedang, demam, fondasi analgesia multimodal."
    },
    "contraindications": {
      "en": "Severe acute hepatic failure, active severe liver disease.",
      "id": "Gagal hati akut berat, penyakit hati aktif berat."
    },
    "dosing": {
      "dosePerKg": 15,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q4-6h PRN",
      "bolusDose": "Adults: 500 - 1000 mg PO/PR q4-6h (max 4 g/day); Pediatric: 10 - 15 mg/kg PO/PR q4-6h",
      "notes": {
        "en": "Max 75 mg/kg/day or 4g/day. Safe in pregnancy and lactation. Overdose antidote: N-acetylcysteine (NAC).",
        "id": "Maks. 75 mg/kg/hari atau 4g/hari. Aman pada kehamilan. Antidotum overdosis: N-asetilsistein (NAC)."
      }
    },
    "onset": "20 - 30 minutes",
    "peak": "1 - 2 hours",
    "duration": "4 - 6 hours",
    "metabolism": "Hepatic glucuronidation and sulfation (~90%); ~5% metabolized by CYP2E1 to NAPQI.",
    "clinicalPearls": {
      "en": "First-line antipyretic and baseline analgesic for all age groups. Does not impair platelet aggregation or damage gastric mucosa. Check other combination medications to prevent accidental paracetamol overdose.",
      "id": "Antipiretik dan pereda nyeri lini pertama untuk semua usia. Tidak merusak lambung atau membekukan trombosit. Waspadai obat kombinasi flu yang mengandung parasetamol."
    },
    "highRisk": false
  },
  {
    "id": "ibuprofen",
    "genericName": "Ibuprofen (Oral)",
    "brandNames": [
      "Proris",
      "Farsifen",
      "Advil",
      "Motrin",
      "Brufen",
      "Dolofen"
    ],
    "drugClass": "Oral NSAID (Propionic Acid Derivative)",
    "indications": {
      "en": "Mild to moderate inflammatory pain, dysmenorrhea, musculoskeletal pain, fever.",
      "id": "Nyeri inflamasi ringan hingga sedang, dismenore, nyeri muskuloskeletal, demam."
    },
    "contraindications": {
      "en": "Active peptic ulcer / GI bleeding, severe renal impairment, aspirin-exacerbated respiratory disease, 3rd trimester pregnancy.",
      "id": "Tukak lambung aktif / perdarahan GI, gagal ginjal berat, riwayat asma akibat aspirin, trimester 3 kehamilan."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 800,
      "frequency": "q6-8h PRN with food",
      "bolusDose": "Adults: 200 - 400 mg PO q4-6h (max 1200 mg OTC, 2400-3200 mg Rx); Pediatric: 5 - 10 mg/kg PO q6-8h",
      "notes": {
        "en": "Max 40 mg/kg/day or 3.2g/day. Always administer with food or milk to minimize gastric upset.",
        "id": "Maks. 40 mg/kg/hari atau 3.2g/hari. Selalu konsumsi bersama makanan untuk meminimalkan iritasi lambung."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "1 - 2 hours",
    "duration": "4 - 6 hours",
    "metabolism": "Hepatic CYP2C9 oxidation to inactive metabolites; excreted in urine.",
    "clinicalPearls": {
      "en": "Reversible non-selective COX-1 and COX-2 inhibitor. Co-administration of low-dose aspirin requires taking aspirin at least 30 minutes before ibuprofen to avoid competitive blockade of aspirin cardioprotective antiplatelet effect.",
      "id": "Inhibitor COX-1 dan COX-2 reversibel. Minum aspirin minimal 30 menit sebelum ibuprofen agar efek kardioprotektif aspirin tidak terhambat."
    },
    "highRisk": false
  },
  {
    "id": "amoxicillin",
    "genericName": "Amoxicillin Trihydrate",
    "brandNames": [
      "Amoxil",
      "Amoxsan",
      "Lapimox",
      "Yusimox",
      "Amoxicillin OGB"
    ],
    "drugClass": "Aminopenicillin Antibiotic",
    "indications": {
      "en": "Acute otitis media, streptococcal pharyngitis, community-acquired pneumonia, dental prophylaxis.",
      "id": "Otitis media akut, faringitis streptokokus, pneumonia komunitas, profilaksis infeksi gigi."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to penicillins or beta-lactams.",
      "id": "Hipersensitivitas berat terhadap penisilin atau antibiotik beta-laktam."
    },
    "dosing": {
      "dosePerKg": 40,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q8h or q12h",
      "bolusDose": "Adults: 500 mg PO q8h or 875 mg PO q12h; Pediatric: 40 - 90 mg/kg/day divided q8-12h",
      "notes": {
        "en": "Dosing ranges from 40-90 mg/kg/day. High dose (80-90 mg/kg/day) used for acute otitis media.",
        "id": "Dosis berkisar antara 40-90 mg/kg/hari. Dosis tinggi (80-90 mg/kg/hari) untuk otitis media resisten."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "6 - 8 hours",
    "metabolism": "Renal excretion (60-80% unchanged via glomerular filtration and tubular secretion).",
    "clinicalPearls": {
      "en": "First-line antimicrobial for acute bacterial otitis media and sinusitis. Better oral bioavailability and less GI diarrhea than ampicillin. Maculopapular rash occurs in ~90% of patients with Epstein-Barr virus (mononucleosis).",
      "id": "Lini pertama otitis media akut dan sinusitis. Penyerapan oral lebih baik dibanding ampisilin. Ruam makulopapular muncul pada 90% pasien mononukleosis (EBV)."
    },
    "highRisk": false
  },
  {
    "id": "cetirizine",
    "genericName": "Cetirizine HCl",
    "brandNames": [
      "Zyrtec",
      "Incidal-OD",
      "Cetirizine OGB",
      "Ryvel",
      "Cerini"
    ],
    "drugClass": "Second-Generation H1 Antihistamine",
    "indications": {
      "en": "Allergic rhinitis, chronic idiopathic urticaria, allergic conjunctivitis.",
      "id": "Rinitis alergi, urtikaria idiopatik kronis, konjungtivitis alergi."
    },
    "contraindications": {
      "en": "Severe end-stage renal disease (CrCl < 10 mL/min), cetirizine/hydroxyzine allergy.",
      "id": "Gagal ginjal terminal (CrCl < 10 mL/menit), alergi hidroksisin/setirizin."
    },
    "dosing": {
      "dosePerKg": 0.25,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "q24h (once daily)",
      "bolusDose": "Adults: 10 mg PO once daily (or 5 mg q12h); Pediatric: 2.5 - 5 mg once daily",
      "notes": {
        "en": "Low sedation compared to first-generation antihistamines, but may cause mild drowsiness in ~10% of users.",
        "id": "Efek sedasi rendah dibanding generasi pertama, namun dapat memicu kantuk ringan pada sebagian orang."
      }
    },
    "onset": "20 - 60 minutes",
    "peak": "1 hour",
    "duration": "24 hours",
    "metabolism": "Renal excretion (70% unchanged); minimal hepatic metabolism.",
    "clinicalPearls": {
      "en": "Carboxylic acid metabolite of hydroxyzine. Rapid onset and 24-hour duration. Does not cross blood-brain barrier significantly, resulting in much less sedation and zero anticholinergic drying effects.",
      "id": "Metabolit asam hidroksisin. Onset cepat dan bekerja selama 24 jam. Penetrasi ke otak sangat minim sehingga efek kantuk jauh lebih ringan."
    },
    "highRisk": false
  },
  {
    "id": "amlodipine",
    "genericName": "Amlodipine Besylate",
    "brandNames": [
      "Norvasc",
      "Tensivask",
      "Amlodipine OGB",
      "Divask",
      "Theravask"
    ],
    "drugClass": "Dihydropyridine Calcium Channel Blocker (Oral)",
    "indications": {
      "en": "Essential hypertension, chronic stable angina, vasospastic (Prinzmetal) angina.",
      "id": "Hipertensi esensial, angina pektoris stabil kronis, angina vasospastik."
    },
    "contraindications": {
      "en": "Severe hypotension, cardiogenic shock, advanced aortic stenosis.",
      "id": "Hipotensi berat, syok kardiogenik, stenosis aorta berat."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "q24h (once daily)",
      "bolusDose": "Adults: 5 - 10 mg PO once daily (start with 2.5 - 5 mg in elderly/hepatic impairment)",
      "notes": {
        "en": "Long half-life (30-50 hours) ensures consistent 24-hour blood pressure control.",
        "id": "Waktu paruh panjang (30-50 jam) menghasilkan kendali tekanan darah 24 jam yang stabil."
      }
    },
    "onset": "6 - 12 hours",
    "peak": "6 - 9 hours",
    "duration": "24 hours",
    "metabolism": "Extensive hepatic CYP3A4 oxidation to inactive metabolites.",
    "clinicalPearls": {
      "en": "Potent arterial vasodilator with minimal negative inotropy. Most common side effect is dose-dependent peripheral dependent ankle edema (due to precapillary arteriolar vasodilation, not volume overload).",
      "id": "Vasodilator arteri kuat tanpa depresi pompa jantung. Efek samping paling umum adalah bengkak pada pergelangan kaki (edema perifer)."
    },
    "highRisk": false
  },
  {
    "id": "metformin",
    "genericName": "Metformin HCl",
    "brandNames": [
      "Glucophage",
      "Glumin",
      "Metformin OGB",
      "Nevox",
      "Forbetes"
    ],
    "drugClass": "Oral Biguanide Antihyperglycemic Agent",
    "indications": {
      "en": "First-line pharmacotherapy for Type 2 diabetes mellitus, polycystic ovary syndrome (PCOS).",
      "id": "Terapi farmakologis lini pertama diabetes melitus tipe 2, sindrom ovarium polikistik (PCOS)."
    },
    "contraindications": {
      "en": "Severe renal impairment (eGFR < 30 mL/min), acute or chronic metabolic acidosis, shock, severe hypoxia.",
      "id": "Gagal ginjal berat (eGFR < 30 mL/menit), asidosis metabolik akut/kronik, syok, hipoksia berat."
    },
    "dosing": {
      "dosePerKg": 15,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "q12h with meals",
      "bolusDose": "500 mg PO BID or 850 mg PO daily; titrate up to max 2000 - 2550 mg/day",
      "notes": {
        "en": "HOLD 48 hours prior to surgical procedures involving IV iodinated radiocontrast to prevent lactic acidosis.",
        "id": "HENTIKAN 48 jam sebelum prosedur operasi dengan kontras radiologi IV untuk mencegah asidosis laktat."
      }
    },
    "onset": "Days (glycemic stabilization)",
    "peak": "2 - 3 hours",
    "duration": "12 - 24 hours",
    "metabolism": "Eliminated 100% unchanged in urine by tubular secretion.",
    "clinicalPearls": {
      "en": "Decreases hepatic gluconeogenesis and improves peripheral insulin sensitivity without causing hypoglycemia or weight gain. Rare but potentially fatal complication is Metformin-Associated Lactic Acidosis (MALA).",
      "id": "Menurunkan produksi glukosa hati tanpa risiko hipoglikemia. Komplikasi langka namun fatal adalah asidosis laktat terkait metformin (MALA)."
    },
    "highRisk": false
  },
  {
    "id": "omeprazole",
    "genericName": "Omeprazole",
    "brandNames": [
      "Prilosec",
      "Losec",
      "Omeprazole OGB",
      "Inhipump",
      "Omevell"
    ],
    "drugClass": "Proton Pump Inhibitor (PPI)",
    "indications": {
      "en": "GERD, peptic ulcer disease, H. pylori eradication regimens, Zollinger-Ellison syndrome.",
      "id": "GERD, tukak lambung/duodenum, eradikasi H. pylori, sindrom Zollinger-Ellison."
    },
    "contraindications": {
      "en": "Known hypersensitivity to substituted benzimidazoles.",
      "id": "Hipersensitivitas terhadap benzimidazol."
    },
    "dosing": {
      "dosePerKg": 0.7,
      "unit": "mg",
      "maxDose": 40,
      "frequency": "q24h before breakfast",
      "bolusDose": "Adults: 20 - 40 mg PO once daily 30-60 minutes before breakfast; IV: 40 mg once daily",
      "notes": {
        "en": "Irreversibly inhibits H+/K+ ATPase pump. Take 30-60 minutes before the first meal of the day.",
        "id": "Menghambat pompa asam H+/K+ ATPase secara ireversibel. Minum 30-60 menit sebelum sarapan."
      }
    },
    "onset": "1 hour",
    "peak": "2 hours",
    "duration": "24 - 72 hours",
    "metabolism": "Hepatic CYP2C19 and CYP3A4.",
    "clinicalPearls": {
      "en": "Potent CYP2C19 inhibitor; may diminish the antiplatelet conversion of clopidogrel (Plavix) to its active metabolite. In cardiac patients on clopidogrel, prefer pantoprazole.",
      "id": "Menghambat enzim CYP2C19; dapat mengurangi efikasi antiplatelet klopidogrel. Lebih disukai pantoprazol pada pasien jantung."
    },
    "highRisk": false
  },
  {
    "id": "simvastatin",
    "genericName": "Simvastatin",
    "brandNames": [
      "Zocor",
      "Simvastatin OGB",
      "Valemia",
      "Esvat",
      "Cholescor"
    ],
    "drugClass": "HMG-CoA Reductase Inhibitor (Statin)",
    "indications": {
      "en": "Hypercholesterolemia, primary and secondary cardiovascular risk reduction, atherosclerotic plaque stabilization.",
      "id": "Hiperkolesterolemia, reduksi risiko kardiovaskular primer dan sekunder, stabilisasi plak aterosklerotik."
    },
    "contraindications": {
      "en": "Active liver disease, unexplained persistent transaminase elevations, pregnancy, concurrent strong CYP3A4 inhibitors.",
      "id": "Penyakit hati aktif, peningkatan transaminase persisten, kehamilan, penggunaan bersama inhibitor CYP3A4 kuat."
    },
    "dosing": {
      "dosePerKg": 0.3,
      "unit": "mg",
      "maxDose": 40,
      "frequency": "q24h in the evening",
      "bolusDose": "Adults: 10 - 40 mg PO once daily in the evening",
      "notes": {
        "en": "Take in the evening because hepatic cholesterol synthesis peaks overnight. Avoid grapefruit juice.",
        "id": "Konsumsi pada malam hari karena sintesis kolesterol hati memuncak saat malam. Hindari jus grapefruit."
      }
    },
    "onset": "Days (lipid reduction)",
    "peak": "1.3 - 2.4 hours",
    "duration": "24 hours",
    "metabolism": "Extensive hepatic CYP3A4 substrate; high first-pass extraction.",
    "clinicalPearls": {
      "en": "Pleiotropic vascular benefits (endothelial function improvement and plaque stabilization). Severe myopathy/rhabdomyolysis risk when combined with clarithromycin, ketoconazole, amiodarone, or gemfibrozil.",
      "id": "Memiliki manfaat pleiotropik stabilisasi plak pembuluh darah. Risiko miopati dan rabdomiolisis meningkat bila dikombinasi dengan klaritromisin atau amiodaron."
    },
    "highRisk": false
  },
  {
    "id": "salbutamol",
    "genericName": "Salbutamol (Albuterol)",
    "brandNames": [
      "Ventolin",
      "Salbuven",
      "Astharol",
      "Fartolin",
      "Salbutamol OGB"
    ],
    "drugClass": "Short-Acting Beta-2 Adrenergic Agonist (SABA)",
    "indications": {
      "en": "Relief of acute bronchospasm in asthma and COPD, hyperkalemia temporary intracellular shifting.",
      "id": "Pereda bronkospasme akut pada asma dan PPOK, pergeseran kalium intraseluler pada hiperkalemia."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to salbutamol, tachyarrhythmias.",
      "id": "Hipersensitivitas berat terhadap salbutamol, takiaritmia berat."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 5,
      "frequency": "q20min x 3 doses for acute attack, then q2-4h PRN",
      "bolusDose": "MDI Inhaler: 2 - 4 puffs (100 mcg/puff); Nebulizer: 2.5 - 5.0 mg in 3 mL saline q20min PRN",
      "notes": {
        "en": "Relaxes bronchial smooth muscle via adenylate cyclase stimulation. Can cause tremor, tachycardia, and hypokalemia.",
        "id": "Merelaksasi otot polos bronkus. Dapat menimbulkan efek samping tremor tangan, takikardia, dan hipokalemia."
      }
    },
    "onset": "3 - 5 minutes",
    "peak": "15 - 30 minutes",
    "duration": "3 - 5 hours",
    "metabolism": "Hepatic sulfotransferase to inactive sulfate conjugate.",
    "clinicalPearls": {
      "en": "Gold standard rescue bronchodilator. Stimulates Na+/K+ ATPase, driving potassium into cells (useful cocktail component in urgent hyperkalemia management at nebulized doses of 10-20 mg).",
      "id": "Bronkodilator darurat standar emas. Menstimulasi pompa Na+/K+ ATPase dan memasukkan kalium ke dalam sel (efektif untuk hiperkalemia darurat)."
    },
    "highRisk": false
  },
  {
    "id": "ciprofloxacin",
    "genericName": "Ciprofloxacin HCl",
    "brandNames": [
      "Cipro",
      "Baquinor",
      "Ciflox",
      "Ciproxin",
      "Ciprofloxacin OGB"
    ],
    "drugClass": "Second-Generation Fluoroquinolone Antibiotic",
    "indications": {
      "en": "Complicated urinary tract infections, infectious diarrhea, prostatitis, anthrax prophylaxis.",
      "id": "Infeksi saluran kemih berkomplikasi, diare infeksius bakterial, prostatitis."
    },
    "contraindications": {
      "en": "Concurrent tizanidine administration, history of fluoroquinolone tendon rupture, myasthenia gravis.",
      "id": "Penggunaan bersama tizanidin, riwayat ruptur tendon akibat fluorokuinolon, miastenia gravis."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 750,
      "frequency": "q12h PO or IV",
      "bolusDose": "Oral: 250 - 750 mg PO q12h; IV: 200 - 400 mg IV q12h infused over 60 minutes",
      "notes": {
        "en": "FDA black box warning for tendonitis and tendon rupture (Achilles), peripheral neuropathy, and CNS toxicities.",
        "id": "Peringatan keras FDA untuk risiko tendonitis dan ruptur tendon Achilles, neuropati perifer, dan efek SSP."
      }
    },
    "onset": "Rapid (1 hour)",
    "peak": "1 - 2 hours",
    "duration": "12 hours",
    "metabolism": "Hepatic metabolism (CYP1A2 potent inhibitor); renal excretion (40-50% unchanged).",
    "clinicalPearls": {
      "en": "Bactericidal topoisomerase II (DNA gyrase) inhibitor. Potent inhibitor of CYP1A2 (greatly increases theophylline and tizanidine concentrations). Chelation with multivalent cations (calcium, iron, antacids) severely impairs oral absorption.",
      "id": "Inhibitor DNA gyrase. Menghambat kuat enzim CYP1A2. Konsumsi bersama susu, antasida, atau tablet besi menghambat penyerapannya."
    },
    "highRisk": false
  },
  {
    "id": "losartan",
    "genericName": "Losartan Potassium",
    "brandNames": [
      "Cozaar",
      "Acetensa",
      "Losartan OGB",
      "Insaar",
      "Angioten"
    ],
    "drugClass": "Angiotensin II Receptor Blocker (ARB)",
    "indications": {
      "en": "Hypertension, diabetic nephropathy in Type 2 diabetes, stroke risk reduction in hypertensive LVH.",
      "id": "Hipertensi, nefropati diabetik pada diabetes tipe 2, reduksi risiko stroke pada LVH."
    },
    "contraindications": {
      "en": "Pregnancy (teratogenic / fetal toxicity in 2nd/3rd trimesters), concurrent aliskiren in diabetes.",
      "id": "Kehamilan (teratogenik pada trimester 2 dan 3), penggunaan bersama aliskiren pada diabetes."
    },
    "dosing": {
      "dosePerKg": 0.7,
      "unit": "mg",
      "maxDose": 100,
      "frequency": "q24h (once daily)",
      "bolusDose": "Adults: 50 - 100 mg PO once daily (start 25 mg in volume-depleted patients)",
      "notes": {
        "en": "HOLD on the morning of surgery to prevent severe refractory vasoplegic hypotension under general anesthesia.",
        "id": "HENTIKAN pagi hari sebelum operasi untuk mencegah hipotensi vasoplegia refrakter saat anestesi umum."
      }
    },
    "onset": "1 hour",
    "peak": "1 hour (losartan), 3-4 hours (active metabolite E-3174)",
    "duration": "24 hours",
    "metabolism": "Hepatic CYP2C9 and CYP3A4 to potent active carboxylic acid metabolite EXP-3174 (10-40x more potent).",
    "clinicalPearls": {
      "en": "Selectively blocks AT1 receptors, preventing vasoconstriction and aldosterone secretion without causing the dry bradykinin cough typical of ACE inhibitors. Also promotes mild uricosuric excretion (lowers serum uric acid). Refractory intraoperative hypotension responds best to vasopressin.",
      "id": "Menghambat reseptor AT1 tanpa memicu batuk kering bradikinin. Memiliki efek penurun asam urat. Hipotensi intraoperatif refrakter paling efektif diatasi dengan vasopresin."
    },
    "highRisk": false
  },
  {
    "id": "aspirin",
    "genericName": "Aspirin (Acetylsalicylic Acid)",
    "brandNames": [
      "Aspilets",
      "Cardio Aspirin",
      "Miniaspi",
      "Ascardia",
      "Bayer Aspirin"
    ],
    "drugClass": "Antiplatelet Agent / Salicylate NSAID",
    "indications": {
      "en": "Secondary prevention of acute coronary syndromes, ischemic stroke/TIA, primary prevention in high-risk CVD.",
      "id": "Pencegahan sekunder sindrom koroner akut, stroke iskemik/TIA, prevensi kardiovaskular risiko tinggi."
    },
    "contraindications": {
      "en": "Active peptic ulcer bleeding, hemophilia / bleeding disorders, aspirin-induced asthma triad, viral illness in pediatrics (Reye syndrome).",
      "id": "Perdarahan tukak lambung aktif, hemofilia, trias asma aspirin, infeksi virus pada anak (sindrom Reye)."
    },
    "dosing": {
      "dosePerKg": 1.5,
      "unit": "mg",
      "maxDose": 325,
      "frequency": "q24h (once daily)",
      "bolusDose": "Acute coronary syndrome loading: 160 - 325 mg PO chewed; Chronic maintenance: 81 - 100 mg PO once daily",
      "notes": {
        "en": "Irreversibly acetylates platelet COX-1, permanently inhibiting Thromboxane A2 for platelet lifespan (7-10 days).",
        "id": "Mengasetilasi COX-1 secara ireversibel, menghambat Tromboksan A2 seumur hidup trombosit (7-10 hari)."
      }
    },
    "onset": "15 - 30 minutes",
    "peak": "1 - 2 hours",
    "duration": "7 - 10 days (entire lifespan of circulating platelets)",
    "metabolism": "Rapid deacetylation by blood and hepatic esterases to salicylic acid, then hepatic conjugation.",
    "clinicalPearls": {
      "en": "Cornerstone antiplatelet therapy. ASRA guidelines state that aspirin monotherapy is NOT an absolute contraindication to neuraxial anesthesia (spinal/epidural) when bleeding risk is otherwise normal. Do not give to children with fever due to fatal Reye syndrome risk.",
      "id": "Pilar terapi antiplatelet. Menurut pedoman ASRA, monoterapi aspirin BUKAN kontraindikasi mutlak anestesi spinal/epidural bila hemostasis lain normal. Jangan berikan pada anak demam (sindrom Reye)."
    },
    "highRisk": false
  },
  {
    "id": "azithromycin",
    "genericName": "Azithromycin Dihydrate",
    "brandNames": [
      "Zithromax",
      "Zithrax",
      "Zicho",
      "Azithromycin OGB",
      "Aztrin"
    ],
    "drugClass": "Macrolide Antibiotic (Azalide Subclass)",
    "indications": {
      "en": "Community-acquired pneumonia, atypical respiratory infections, acute bacterial exacerbations of COPD, chlamydia.",
      "id": "Pneumonia komunitas, infeksi saluran napas atipikal, eksaserbasi akut PPOK, klamidia."
    },
    "contraindications": {
      "en": "History of cholestatic jaundice / hepatic impairment with prior azithromycin use, macrolide allergy.",
      "id": "Riwayat ikterus kolestatik akibat azitromisin, alergi makrolida."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 500,
      "frequency": "q24h (once daily)",
      "bolusDose": "Adults: 500 mg PO on Day 1, then 250 mg PO daily on Days 2-5 (or 500 mg daily for 3 days); IV: 500 mg once daily",
      "notes": {
        "en": "Extensive intracellular accumulation in tissue and phagocytes; 5-day regimen provides sustained 10-day tissue levels.",
        "id": "Akumulasi intraseluler tinggi pada jaringan; terapi 5 hari memberikan kadar terapeutik selama 10 hari."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "2 - 3 hours",
    "duration": "24 hours (tissue terminal half-life ~68 hours)",
    "metabolism": "Biliary excretion of unchanged drug; minimal CYP3A4 interaction compared to erythromycin.",
    "clinicalPearls": {
      "en": "Bacteriostatic 50S ribosomal subunit inhibitor. Covers Mycoplasma, Legionella, and Chlamydophila. Can cause QT interval prolongation and cardiac arrhythmias; use caution when co-administered with ondansetron or amiodarone.",
      "id": "Menghambat subunit ribosom 50S. Menjangkau bakteri atipikal Mycoplasma dan Legionella. Dapat memperpanjang interval QT; berhati-hati bila dipadukan dengan ondansetron."
    },
    "highRisk": false
  },
  {
    "id": "ceftriaxone",
    "genericName": "Ceftriaxone Sodium",
    "brandNames": [
      "Rocephin",
      "Broadced",
      "Ceftriaxone OGB",
      "Terzicef",
      "Starcef"
    ],
    "drugClass": "Third-Generation Cephalosporin Antibiotic",
    "indications": {
      "en": "Bacterial meningitis, severe sepsis, pyelonephritis, gonococcal infections, hospital-acquired pneumonia.",
      "id": "Meningitis bakterial, sepsis berat, pielonefritis, gonore, pneumonia nosokomial."
    },
    "contraindications": {
      "en": "Hyperbilirubinemic neonates; CO-ADMINISTRATION WITH CALCIUM-CONTAINING IV SOLUTIONS (Ringer Lactate) IN NEONATES (fatal precipitates).",
      "id": "Neonatus hiperbilirubinemia; PEMBERIAN BERSAMA LARUTAN BERISI KALSIUM (Ringer Laktat) PADA NEONATUS (endapan fatal)."
    },
    "dosing": {
      "dosePerKg": 50,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "q12-24h IV infusion",
      "bolusDose": "Adults: 1000 - 2000 mg (1 - 2 g) IV once daily (2 g q12h for meningitis); Pediatric: 50 - 100 mg/kg/day",
      "notes": {
        "en": "Dual route of excretion (biliary 40%, renal 60%); no dosage adjustment required in isolated renal or hepatic failure.",
        "id": "Eliminasi ganda (empedu 40%, ginjal 60%); tidak memerlukan penyesuaian dosis pada gangguan ginjal terisolasi."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "24 hours",
    "metabolism": "Dual elimination: biliary excretion (40%) and renal excretion (60%).",
    "clinicalPearls": {
      "en": "Superb blood-brain barrier penetration in inflamed meninges. High biliary excretion can cause reversible biliary sludging / pseudolithiasis. NEVER mix with calcium-containing IV solutions (Ringer Lactate/Hartmann) due to insoluble precipitate formation.",
      "id": "Penetrasi sawar darah otak sangat baik pada meningitis. Ekskresi empedu tinggi dapat menimbulkan pseudolitiasis empedu. JANGAN PERNAH dicampur cairan Ringer Laktat karena memicu endapan kristal kalsium tak larut."
    },
    "highRisk": true
  },
  {
    "id": "cefixime",
    "genericName": "Cefixime Trihydrate",
    "brandNames": [
      "Cefspan",
      "Cefixime OGB",
      "Spancef",
      "Lanfix",
      "Fixiphar"
    ],
    "drugClass": "Third-Generation Oral Cephalosporin",
    "indications": {
      "en": "Uncomplicated urinary tract infections, acute otitis media, pharyngitis, uncomplicated gonorrhea.",
      "id": "Infeksi saluran kemih tanpa komplikasi, otitis media akut, faringitis, gonore tanpa komplikasi."
    },
    "contraindications": {
      "en": "Hypersensitivity to cephalosporins or beta-lactams.",
      "id": "Hipersensitivitas terhadap sefalosporin atau beta-laktam."
    },
    "dosing": {
      "dosePerKg": 8,
      "unit": "mg",
      "maxDose": 400,
      "frequency": "q12h or q24h",
      "bolusDose": "Adults: 400 mg PO once daily (or 200 mg BID); Pediatric: 8 mg/kg/day divided q12-24h",
      "notes": {
        "en": "Excellent oral step-down for Gram-negative enteric infections. Poor coverage against S. aureus.",
        "id": "Pilihan oral yang sangat baik untuk kuman enterik Gram negatif. Kurang efektif terhadap S. aureus."
      }
    },
    "onset": "2 hours",
    "peak": "3 - 4 hours",
    "duration": "12 - 24 hours",
    "metabolism": "50% excreted unchanged in urine; remainder eliminated in bile.",
    "clinicalPearls": {
      "en": "Standard oral switch therapy for pyelonephritis and enteric bacilli. Note that unlike 1st and 2nd generation cephalosporins, cefixime has very poor activity against Gram-positive staphylococci.",
      "id": "Terapi oral pilihan untuk infeksi saluran kemih enterik. Memiliki aktivitas yang lemah terhadap stafilokokus Gram positif dibanding generasi awal."
    },
    "highRisk": false
  },
  {
    "id": "doxycycline",
    "genericName": "Doxycycline Hyclate",
    "brandNames": [
      "Vibramycin",
      "Doxycycline OGB",
      "Interdoxy",
      "Siclidon"
    ],
    "drugClass": "Tetracycline Class Antibiotic",
    "indications": {
      "en": "Atypical community-acquired pneumonia, community MRSA skin infections, scrub typhus, malaria prophylaxis, pelvic inflammatory disease.",
      "id": "Pneumonia komunitas kuman atipikal, infeksi kulit MRSA komunitas, tifus scrub, profilaksis malaria."
    },
    "contraindications": {
      "en": "Pregnancy (teeth discoloration and bone growth inhibition in fetus), children <8 years of age (except for life-threatening rickettsial disease).",
      "id": "Kehamilan (disklorasi gigi dan penghambatan pertumbuhan tulang janin), anak usia <8 tahun."
    },
    "dosing": {
      "dosePerKg": 2,
      "unit": "mg",
      "maxDose": 200,
      "frequency": "q12h with full glass of water",
      "bolusDose": "Adults: 100 mg PO/IV q12h (loading dose 200 mg on day 1); Pediatric (>45 kg): 100 mg BID",
      "notes": {
        "en": "Drink with a full glass of water and remain upright for at least 30 minutes to prevent pill-induced esophagitis/ulceration.",
        "id": "Minum dengan segelas penuh air dan tetap tegak minimal 30 menit untuk mencegah ulserasi esofagus."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1.5 - 4 hours",
    "duration": "12 - 24 hours",
    "metabolism": "Non-renal elimination via intestinal chelation and fecal excretion. Safe in renal failure!",
    "clinicalPearls": {
      "en": "Safest tetracycline in renal insufficiency because excretion does not depend on the kidneys. Broad-spectrum activity including atypicals (Chlamydia, Mycoplasma), spirochetes (Borrelia), and rickettsia. Causes photosensitivity.",
      "id": "Tetrasiklin paling aman untuk gagal ginjal karena eliminasi tidak melalui ginjal. Efektif untuk kuman atipikal dan spiroseta. Dapat memicu fotosensitivitas kulit."
    },
    "highRisk": false
  },
  {
    "id": "levofloxacin",
    "genericName": "Levofloxacin",
    "brandNames": [
      "Cravit",
      "Levofloxacin OGB",
      "Levaquin",
      "Volequin",
      "Nofaster"
    ],
    "drugClass": "Third-Generation Respiratory Fluoroquinolone",
    "indications": {
      "en": "Community-acquired pneumonia, hospital-acquired pneumonia, acute pyelonephritis, complicated intra-abdominal infections.",
      "id": "Pneumonia komunitas, pneumonia nosokomial, pielonefritis akut, infeksi intraabdomen berat."
    },
    "contraindications": {
      "en": "History of fluoroquinolone-induced tendon rupture, myasthenia gravis, QT prolongation.",
      "id": "Riwayat ruptur tendon akibat fluorokuinolon, miastenia gravis, perpanjangan interval QT."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 750,
      "frequency": "q24h PO or IV (once daily)",
      "bolusDose": "Adults: 500 - 750 mg PO or IV once daily infused over 60 - 90 minutes",
      "notes": {
        "en": "Pure active L-isomer of ofloxacin. Requires dose reduction in renal impairment (CrCl < 50 mL/min).",
        "id": "Isomer aktif murni L dari ofloksasin. Wajib disesuaikan dosisnya pada gangguan ginjal."
      }
    },
    "onset": "1 hour",
    "peak": "1 - 2 hours",
    "duration": "24 hours",
    "metabolism": "Excreted 80% unchanged in urine by glomerular filtration and tubular secretion.",
    "clinicalPearls": {
      "en": "Potent respiratory quinolone covering S. pneumoniae (including penicillin-resistant strains), Legionella, and Pseudomonas aeruginosa. Black box warnings for tendon rupture, peripheral neuropathy, and aortic aneurysm dissection risk.",
      "id": "Kuinolon pernapasan poten untuk S. pneumoniae dan Pseudomonas. Waspadai risiko tendonitis, ruptur tendon, dan diseksi aneurisma aorta."
    },
    "highRisk": false
  },
  {
    "id": "meropenem",
    "genericName": "Meropenem Trihydrate",
    "brandNames": [
      "Meronem",
      "Meropenem OGB",
      "Ronem",
      "Meropen",
      "Tripenem"
    ],
    "drugClass": "Broad-Spectrum Carbapenem Antibiotic",
    "indications": {
      "en": "Severe intra-abdominal infections, septic shock, hospital-acquired/ventilator-associated pneumonia, bacterial meningitis, febrile neutropenia.",
      "id": "Infeksi intraabdomen berat, syok septik, pneumonia ventilator HAP/VAP, meningitis bakterial, demam neutropenia."
    },
    "contraindications": {
      "en": "Severe immediate anaphylaxis to carbapenems or beta-lactams.",
      "id": "Anafilaksis berat terhadap karbapenem atau beta-laktam."
    },
    "dosing": {
      "dosePerKg": 20,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "IV infusion over 30 min (or 3h extended infusion) q8h",
      "bolusDose": "Standard adult: 1000 mg (1 g) IV q8h; Meningitis / Severe sepsis: 2000 mg (2 g) IV q8h; Pediatric: 20 - 40 mg/kg q8h",
      "notes": {
        "en": "Extended infusion over 3 hours optimizes time-dependent killing (T > MIC) in critically ill septic patients.",
        "id": "Infus memanjang selama 3 jam mengoptimalkan efikasi pembunuhan kuman (T > MIC) pada pasien sepsis berat."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "8 hours",
    "metabolism": "Renal dehydropeptidase-1 hydrolysis and glomerular filtration (70% unchanged).",
    "clinicalPearls": {
      "en": "Broadest antibacterial spectrum among all beta-lactams, covering ESBL Gram-negatives, Pseudomonas, and anaerobes. Significantly lower neurotoxicity / seizure risk than imipenem; preferred for central nervous system infections.",
      "id": "Spektrum antibiotik terluas mencakup bakteri Gram negatif ESBL, Pseudomonas, dan anaerob. Risiko kejang jauh lebih rendah dibanding imipenem; pilihan utama infeksi otak."
    },
    "highRisk": true
  },
  {
    "id": "co-amoxiclav",
    "genericName": "Co-Amoxiclav (Amoxicillin / Clavulanic Acid)",
    "brandNames": [
      "Augmentin",
      "Clavamox",
      "Amiclav",
      "Co-Amoxiclav OGB",
      "Claneksi"
    ],
    "drugClass": "Aminopenicillin + Beta-Lactamase Inhibitor",
    "indications": {
      "en": "Animal/human bites, acute bacterial sinusitis, community-acquired aspiration pneumonia, complicated skin and soft tissue infections.",
      "id": "Luka gigitan hewan/manusia, sinusitis bakterial akut, pneumonia aspirasi komunitas, infeksi kulit berkomplikasi."
    },
    "contraindications": {
      "en": "History of co-amoxiclav-associated cholestatic jaundice or hepatic dysfunction, penicillin allergy.",
      "id": "Riwayat ikterus kolestatik akibat amoksisilin-klavulanat, alergi penisilin."
    },
    "dosing": {
      "dosePerKg": 25,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q8h or q12h with meals",
      "bolusDose": "Adults: 625 mg PO q8h or 1000 mg (1 g) PO BID; IV: 1.2 g IV q8h",
      "notes": {
        "en": "Clavulanate restores amoxicillin activity against beta-lactamase producing S. aureus, H. influenzae, and Bacteroides.",
        "id": "Asam klavulanat memulihkan aktivitas amoksisilin melawan kuman penghasil enzim beta-laktamase."
      }
    },
    "onset": "1 hour",
    "peak": "1 - 2 hours",
    "duration": "8 - 12 hours",
    "metabolism": "Amoxicillin cleared renally (60-80%); clavulanate undergoes extensive hepatic metabolism.",
    "clinicalPearls": {
      "en": "First-line therapy for mammalian bite wounds (covers Pasteurella multocida and oral anaerobes). High incidence of clavulanate-mediated gastrointestinal diarrhea; taking with food attenuates side effects.",
      "id": "Pilihan utama luka gigitan hewan (mencakup Pasteurella dan anaerob mulut). Efek samping diare cukup sering; konsumsi bersama makanan."
    },
    "highRisk": false
  },
  {
    "id": "cotrimoxazole",
    "genericName": "Cotrimoxazole (Trimethoprim / Sulfamethoxazole)",
    "brandNames": [
      "Bactrim",
      "Sanprima",
      "Cotrimoxazole OGB",
      "Bactrizol",
      "Primadex"
    ],
    "drugClass": "Sulfonamide Combination Antibacterial",
    "indications": {
      "en": "Pneumocystis jirovecii pneumonia (PCP) prophylaxis and treatment, Stenotrophomonas maltophilia, community MRSA, uncomplicated UTI.",
      "id": "Profilaksis dan terapi pneumonia Pneumocystis jirovecii (PCP), infeksi Stenotrophomonas, infeksi MRSA kulit, ISK."
    },
    "contraindications": {
      "en": "Severe sulfa hypersensitivity, megaloblastic anemia due to folate deficiency, severe hepatic impairment, pregnancy at term.",
      "id": "Hipersensitivitas berat terhadap sulfa, anemia megaloblastik defisiensi folat, gagal hati berat, kehamilan aterm."
    },
    "dosing": {
      "dosePerKg": 5,
      "unit": "mg",
      "maxDose": 320,
      "frequency": "q12h PO or IV (dosed by Trimethoprim component)",
      "bolusDose": "UTI/Skin: 1 - 2 Double Strength (DS: 160mg TMP/800mg SMX) tablets PO q12h; PCP treatment: 15 - 20 mg/kg/day TMP IV divided q6h",
      "notes": {
        "en": "Inhibits sequential steps in bacterial folic acid synthesis. Can cause hyperkalemia and severe dermatologic reactions (SJS/TEN).",
        "id": "Menghambat sintesis asam folat bakteri secara berurutan. Dapat memicu hiperkalemia dan sindrom Stevens-Johnson."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 4 hours",
    "duration": "12 hours",
    "metabolism": "Hepatic CYP2C9 metabolism and renal excretion of active trimethoprim.",
    "clinicalPearls": {
      "en": "Drug of choice for Pneumocystis pneumonia in immunocompromised / HIV patients. Trimethoprim acts like amiloride on renal cortical collecting tubule sodium channels, causing significant hyperkalemia. Inhibits creatinine secretion, causing pseudo-elevation in serum creatinine.",
      "id": "Obat pilihan utama pneumonia Pneumocystis (PCP). Bekerja seperti amilorid di tubulus ginjal memicu hiperkalemia. Menghambat sekresi kreatinin sehingga kreatinin serum tampak meningkat semu."
    },
    "highRisk": false
  },
  {
    "id": "piperacillin-tazobactam",
    "genericName": "Piperacillin / Tazobactam",
    "brandNames": [
      "Zosyn",
      "Tazocin",
      "Pipzo",
      "Tazopip",
      "Piperacillin-Tazobactam OGB"
    ],
    "drugClass": "Antipseudomonal Penicillin + Beta-Lactamase Inhibitor",
    "indications": {
      "en": "Hospital-acquired pneumonia, severe intra-abdominal infections, complicated skin infections, neutropenic fever sepsis.",
      "id": "Pneumonia nosokomial, infeksi intraabdomen berat berkomplikasi, sepsis demam neutropenia."
    },
    "contraindications": {
      "en": "Severe anaphylactic hypersensitivity to penicillins or beta-lactams.",
      "id": "Hipersensitivitas anafilaksis berat terhadap penisilin atau beta-laktam."
    },
    "dosing": {
      "dosePerKg": 75,
      "unit": "mg",
      "maxDose": 4500,
      "frequency": "IV infusion over 30 min (or 4h extended) q6-8h",
      "bolusDose": "Adult standard: 3.375 g IV q6h or 4.5 g IV q8h; Extended infusion: 3.375 g or 4.5 g IV over 4 hours q8h",
      "notes": {
        "en": "Extended infusion (over 4 hours) improves target pharmacodynamics (T > MIC) against Pseudomonas aeruginosa in critically ill patients.",
        "id": "Infus lambat selama 4 jam meningkatkan target farmakodinamik terhadap Pseudomonas aeruginosa pada pasien kritis."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "6 - 8 hours",
    "metabolism": "Renal excretion (68% unchanged piperacillin, 80% tazobactam).",
    "clinicalPearls": {
      "en": "Workhorse broad-spectrum antipseudomonal penicillin. Does NOT cover MRSA. Concurrent administration with IV Vancomycin significantly increases the risk of acute kidney injury (synergistic nephrotoxicity) compared to cefepime + vancomycin.",
      "id": "Antibiotik antipseudomonas spektrum luas. Tidak mencakup MRSA. Kombinasi bersamaan dengan Vankomisin IV sangat meningkatkan risiko cedera ginjal akut (AKI)."
    },
    "highRisk": true
  },
  {
    "id": "cefepime",
    "genericName": "Cefepime HCl",
    "brandNames": [
      "Maxipime",
      "Cefepime OGB",
      "Dolocef",
      "Exepime"
    ],
    "drugClass": "Fourth-Generation Cephalosporin Antibiotic",
    "indications": {
      "en": "Empiric therapy for febrile neutropenia, hospital-acquired pneumonia, complicated UTIs, bacteremia.",
      "id": "Terapi empiris demam neutropenia, pneumonia nosokomial, infeksi saluran kemih berkomplikasi, bakteremia."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to cephalosporins or beta-lactams.",
      "id": "Hipersensitivitas berat terhadap sefalosporin."
    },
    "dosing": {
      "dosePerKg": 30,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "IV infusion over 30 min q8-12h",
      "bolusDose": "Adults: 1000 - 2000 mg (1 - 2 g) IV q8-12h; Pediatric: 50 mg/kg IV q8-12h",
      "notes": {
        "en": "Zwitterion structure allows rapid penetration through Gram-negative outer membrane and blood-brain barrier.",
        "id": "Struktur zwitterion memungkinkan penetrasi cepat menembus membran luar Gram negatif dan sawar darah otak."
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "8 - 12 hours",
    "metabolism": "85% eliminated unchanged in urine by glomerular filtration.",
    "clinicalPearls": {
      "en": "Resistant to AmpC beta-lactamases. Excellent anti-pseudomonal and Gram-positive coverage. CRITICAL SAFETY NOTE: In renal impairment, failure to adjust dosage leads to severe neurotoxicity (encephalopathy, myoclonus, non-convulsive status epilepticus).",
      "id": "Tahan terhadap enzim AmpC beta-laktamase. Pada pasien gagal ginjal, kegagalan menurunkan dosis memicu neurotoksisitas berat (ensefalopati dan status epileptikus)."
    },
    "highRisk": true
  },
  {
    "id": "linezolid",
    "genericName": "Linezolid",
    "brandNames": [
      "Zyvox",
      "Linospan",
      "Linezolid OGB"
    ],
    "drugClass": "Oxazolidinone Class Antibacterial",
    "indications": {
      "en": "Vancomycin-Resistant Enterococcus faecium (VRE) infections, hospital-acquired MRSA pneumonia, complicated skin infections.",
      "id": "Infeksi Enterococcus resisten vankomisin (VRE), pneumonia MRSA nosokomial, infeksi kulit berkomplikasi."
    },
    "contraindications": {
      "en": "Concurrent use of MAOIs or serotonergic drugs (SSRIs, SNRIs, tramadol, fentanyl, meperidine) due to fatal serotonin syndrome.",
      "id": "Penggunaan bersama MAOI atau obat serotonergik (SSRI, tramadol, fentanil) karena risiko sindrom serotonin fatal."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 600,
      "frequency": "q12h PO or IV",
      "bolusDose": "Adults: 600 mg PO or IV q12h infused over 30-120 minutes; Pediatric: 10 mg/kg q8h (<12 yrs) or q12h (>=12 yrs)",
      "notes": {
        "en": "100% oral bioavailability (oral dose equals IV dose). Monitor CBC weekly for reversible myelosuppression / thrombocytopenia.",
        "id": "Bioavailabilitas oral 100% (dosis oral sama dengan dosis IV). Pantau darah rutin mingguan untuk risiko trombositopenia."
      }
    },
    "onset": "1 hour",
    "peak": "1 - 2 hours",
    "duration": "12 hours",
    "metabolism": "Non-enzymatic hepatic oxidation to inactive carboxylic acid metabolites (organ independent).",
    "clinicalPearls": {
      "en": "Reversible non-selective MAO inhibitor. FATAL DRUG INTERACTION: Co-administration with serotonergic psychiatric medications, tramadol, meperidine, or fentanyl triggers life-threatening Serotonin Syndrome. Courses >14-28 days cause bone marrow suppression and optic neuropathy.",
      "id": "Inhibitor MAO reversibel non-selektif. INTERAKSI FATAL: Pemberian bersama fentanil, tramadol, atau antidepresan SSRI memicu Sindrom Serotonin fatal. Penggunaan >2 minggu memicu supresi sumsum tulang."
    },
    "highRisk": true
  },
  {
    "id": "fluconazole",
    "genericName": "Fluconazole",
    "brandNames": [
      "Diflucan",
      "Candizol",
      "Fluconazole OGB",
      "Flucoral"
    ],
    "drugClass": "Triazole Antifungal Agent",
    "indications": {
      "en": "Invasive candidiasis, candidemia, cryptococcal meningitis consolidation, esophageal and mucosal candidiasis.",
      "id": "Kandidiasis invasif, kandidemia, konsolidasi meningitis kriptokokus, kandidiasis mukokutan/esofagus."
    },
    "contraindications": {
      "en": "Concurrent administration of terfenadine, cisapride, or astemizole (risk of fatal QT prolongation / Torsades).",
      "id": "Penggunaan bersama obat yang memperpanjang QT (risiko Torsades de Pointes fatal)."
    },
    "dosing": {
      "dosePerKg": 6,
      "unit": "mg",
      "maxDose": 800,
      "frequency": "q24h PO or IV (once daily)",
      "bolusDose": "Invasive candidiasis: Loading dose 800 mg (12 mg/kg) IV/PO on Day 1, then 400 mg (6 mg/kg) daily; Vaginal: 150 mg single dose",
      "notes": {
        "en": "Near 100% oral bioavailability. Widely distributes into CSF and body fluids. Reduce dose by 50% in renal failure.",
        "id": "Bioavailabilitas oral mendekati 100%. Penetrasi sangat baik ke dalam CSS dan cairan tubuh. Kurangi dosis 50% pada gagal ginjal."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "24 hours (elimination half-life ~30 hours)",
    "metabolism": "80% excreted unchanged in urine by glomerular filtration; minimal hepatic metabolism.",
    "clinicalPearls": {
      "en": "First-line antifungal for susceptible Candida albicans. Inherently inactive against Candida krusei and variable against Candida glabrata. Moderate inhibitor of CYP2C9 and CYP3A4; dramatically increases warfarin levels and INR.",
      "id": "Antijamur lini pertama untuk Candida albicans. Tidak aktif melawan Candida krusei. Menghambat CYP2C9; sangat meningkatkan kadar warfarin dan memanjangkan INR."
    },
    "highRisk": false
  },
  {
    "id": "acyclovir",
    "genericName": "Acyclovir Sodium",
    "brandNames": [
      "Zovirax",
      "Clindex",
      "Acyclovir OGB",
      "Poviral",
      "Matheviral"
    ],
    "drugClass": "Guanosine Analogue Antiviral",
    "indications": {
      "en": "Herpes simplex virus (HSV) encephalitis, neonatal HSV, severe varicella-zoster (VZV) infections in immunocompromised.",
      "id": "Ensefalitis virus herpes simpleks (HSV), HSV neonatal, infeksi berat varisela zoster (VZV)."
    },
    "contraindications": {
      "en": "Known hypersensitivity to acyclovir or valacyclovir.",
      "id": "Hipersensitivitas terhadap asiklovir atau valasiklovir."
    },
    "dosing": {
      "dosePerKg": 10,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "IV infusion over at least 1 hour q8h",
      "bolusDose": "HSV Encephalitis: 10 mg/kg IV q8h infused over 60 min for 14-21 days; Mucocutaneous: 5 mg/kg IV q8h",
      "notes": {
        "en": "Ensure vigorous IV hydration before and during infusion to prevent insoluble acyclovir crystal nephropathy and acute tubular injury.",
        "id": "Pastikan hidrasi cairan IV adekuat sebelum dan selama infus untuk mencegah kristalisasi asiklovir di tubulus ginjal."
      }
    },
    "onset": "1.5 - 2 hours",
    "peak": "1.5 - 2 hours",
    "duration": "8 hours",
    "metabolism": "Renal glomerular filtration and active tubular secretion (80% unchanged).",
    "clinicalPearls": {
      "en": "Requires activation by viral thymidine kinase to acyclovir monophosphate, conferring extreme selectivity for viral-infected cells. Rapid IV push causes crystalline nephropathy and acute renal failure; always infuse over at least 1 hour with adequate hydration.",
      "id": "Memerlukan aktivasi enzim virus timidin kinase sehingga sangat selektif pada sel terinfeksi. Suntikan cepat memicu pengendapan kristal di ginjal; selalu infusi lambat >1 jam."
    },
    "highRisk": false
  },
  {
    "id": "cephalexin",
    "genericName": "Cephalexin Monohydrate",
    "brandNames": [
      "Keflex",
      "Cefabiotic",
      "Cephalexin OGB"
    ],
    "drugClass": "First-Generation Oral Cephalosporin",
    "indications": {
      "en": "Uncomplicated MSSA skin and soft tissue infections, impetigo, streptococcal pharyngitis, uncomplicated cystitis.",
      "id": "Infeksi kulit dan jaringan lunak MSSA tanpa komplikasi, impetigo, faringitis streptokokus, sistitis."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to cephalosporins.",
      "id": "Hipersensitivitas berat terhadap sefalosporin."
    },
    "dosing": {
      "dosePerKg": 25,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q6h or q12h PO",
      "bolusDose": "Adults: 500 mg PO q6h (or 1000 mg BID); Pediatric: 25 - 50 mg/kg/day divided q6-12h",
      "notes": {
        "en": "Excellent oral bioavailability unaffected by food. Workhorse oral antibiotic for MSSA cellulitis.",
        "id": "Bioavailabilitas oral sangat baik. Antibiotik oral utama untuk selulitis akibat kuman MSSA."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "1 hour",
    "duration": "6 hours",
    "metabolism": "Eliminated >90% unchanged in urine by glomerular filtration.",
    "clinicalPearls": {
      "en": "Oral step-down counterpart of cefazolin. High clinical efficacy against MSSA and Group A Streptococcus. Does not cover Enterococcus or MRSA.",
      "id": "Padanan oral dari sefazolin. Sangat efektif untuk infeksi kulit stafilokokus dan streptokokus. Tidak menjangkau MRSA."
    },
    "highRisk": false
  },
  {
    "id": "cefadroxil",
    "genericName": "Cefadroxil Monohydrate",
    "brandNames": [
      "Duricef",
      "Cefat",
      "Cefadroxil OGB",
      "Lapicef",
      "Droxefa"
    ],
    "drugClass": "First-Generation Oral Cephalosporin",
    "indications": {
      "en": "Streptococcal pharyngitis/tonsillitis, skin and soft tissue infections, uncomplicated urinary tract infections.",
      "id": "Faringitis/tonsilitis streptokokus, infeksi kulit dan jaringan lunak, infeksi saluran kemih."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to cephalosporins.",
      "id": "Hipersensitivitas berat terhadap sefalosporin."
    },
    "dosing": {
      "dosePerKg": 30,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q12h or q24h PO",
      "bolusDose": "Adults: 500 - 1000 mg PO BID (q12h) or 1000 mg once daily; Pediatric: 30 mg/kg/day divided q12h",
      "notes": {
        "en": "Longer elimination half-life than cephalexin, allowing convenient twice-daily dosing.",
        "id": "Waktu paruh lebih panjang dibanding sefaleksin, memungkinkan pemberian 2 kali sehari yang nyaman."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1.5 - 2 hours",
    "duration": "12 hours",
    "metabolism": "Excreted >90% unchanged in urine by glomerular filtration.",
    "clinicalPearls": {
      "en": "Preferred oral 1st generation cephalosporin when patient compliance with QID cephalexin is a concern. Stable in acidic gastric juices and food does not delay absorption.",
      "id": "Pilihan sefalosporin generasi ke-1 yang lebih disukai karena kepatuhan minum obat 2 kali sehari lebih tinggi dibanding 4 kali sehari."
    },
    "highRisk": false
  },
  {
    "id": "cefaclor",
    "genericName": "Cefaclor",
    "brandNames": [
      "Ceclor",
      "Capitron",
      "Cefaclor OGB"
    ],
    "drugClass": "Second-Generation Oral Cephalosporin",
    "indications": {
      "en": "Acute otitis media, acute sinusitis, respiratory tract infections, skin infections.",
      "id": "Otitis media akut, sinusitis akut, infeksi saluran napas, infeksi kulit."
    },
    "contraindications": {
      "en": "Severe cephalosporin hypersensitivity.",
      "id": "Hipersensitivitas berat terhadap sefalosporin."
    },
    "dosing": {
      "dosePerKg": 20,
      "unit": "mg",
      "maxDose": 500,
      "frequency": "q8h PO",
      "bolusDose": "Adults: 250 - 500 mg PO q8h (max 2 g/day); Pediatric: 20 - 40 mg/kg/day divided q8h",
      "notes": {
        "en": "Active against H. influenzae, M. catarrhalis, and MSSA. Higher risk of serum sickness-like reactions.",
        "id": "Aktif melawan H. influenzae dan MSSA. Memiliki risiko lebih tinggi memicu reaksi mirip serum sickness."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "30 - 60 minutes",
    "duration": "8 hours",
    "metabolism": "Renal excretion (60-85% unchanged in urine).",
    "clinicalPearls": {
      "en": "Second-generation oral agent with enhanced Gram-negative coverage compared to cephalexin. In pediatric patients, repeated courses carry an increased risk of serum sickness-like reactions (erythema multiforme, fever, arthralgia).",
      "id": "Sefalosporin oral generasi ke-2. Pada anak, penggunaan berulang membawa risiko reaksi mirip serum sickness (demam, ruam multiforme, dan nyeri sendi)."
    },
    "highRisk": false
  },
  {
    "id": "cefoxitin",
    "genericName": "Cefoxitin Sodium",
    "brandNames": [
      "Mefoxin",
      "Cefoxitin OGB"
    ],
    "drugClass": "Second-Generation Cephamycin Antibiotic",
    "indications": {
      "en": "Surgical prophylaxis for colorectal and gynecologic surgery, pelvic inflammatory disease, polymicrobial intra-abdominal infections.",
      "id": "Profilaksis bedah kolorektal dan ginekologi, penyakit radang panggul (PID), infeksi intraabdomen polimikrobial."
    },
    "contraindications": {
      "en": "Severe hypersensitivity to cephalosporins or cephamycins.",
      "id": "Hipersensitivitas berat terhadap sefalosporin."
    },
    "dosing": {
      "dosePerKg": 30,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "IV infusion within 60 min before incision; redose q2h",
      "bolusDose": "Surgical prophylaxis: 2000 mg (2 g) IV infused over 15-30 min within 60 min before incision",
      "notes": {
        "en": "Has intrinsic anaerobic coverage against Bacteroides fragilis. Short half-life requires intraoperative redosing every 2 hours!",
        "id": "Memiliki aktivitas anaerob terhadap Bacteroides fragilis. Waktu paruh singkat mewajibkan pengulangan dosis setiap 2 jam!"
      }
    },
    "onset": "End of infusion",
    "peak": "End of infusion",
    "duration": "2 hours (intraoperative redosing interval)",
    "metabolism": "85% excreted unchanged in urine by glomerular filtration and tubular secretion.",
    "clinicalPearls": {
      "en": "Cephamycin derivative containing a 7-alpha-methoxy group that confers resistance to beta-lactamases and potent anaerobic coverage against Bacteroides fragilis. Shorter half-life than cefazolin; intraoperative redosing must occur strictly every 2 hours.",
      "id": "Derivat sefamisin yang resisten terhadap beta-laktamase dan aktif membunuh anaerob usus. Karena waktu paruhnya pendek, wajib diulang setiap 2 jam selama operasi."
    },
    "highRisk": false
  }
];
