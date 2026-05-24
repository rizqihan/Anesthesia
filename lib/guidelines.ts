import type { GuidelineRecord } from './db';

export const GUIDELINES_DB: GuidelineRecord[] = [
  {
    "title": {
      "en": "Chronic Kidney Disease (CKD)",
      "id": "Penyakit Ginjal Kronis (PGK)"
    },
    "category": "Nephrology",
    "isStructured": true,
    "pdfUrl": "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf",
    "definition": {
      "en": "Chronic Kidney Disease (CKD) is defined as abnormalities of kidney structure or function, present for **>3 months**, with implications for health. It is classified based on cause, **GFR category (G1-G5)**, and **Albuminuria category (A1-A3)**.",
      "id": "Penyakit Ginjal Kronis (PGK) didefinisikan sebagai kelainan struktur atau fungsi ginjal yang berlangsung selama **>3 bulan**, yang berdampak pada kesehatan. Klasifikasinya didasarkan pada penyebab, **kategori GFR (G1-G5)**, dan **kategori Albuminuria (A1-A3)**."
    },
    "symptoms": {
      "en": "• Often asymptomatic in early stages (G1-G3)\n• **Fatigue** and generalized weakness due to anemia\n• **Pruritus** (itching) from uremic toxins\n• **Edema** (peripheral and periorbital) from fluid retention\n• Dyspnea due to fluid overload\n• Nausea, vomiting, and anorexia (in advanced uremia)",
      "id": "• Sering kali tanpa gejala pada stadium awal (G1-G3)\n• **Kelelahan** dan kelemahan umum akibat anemia\n• **Pruritus** (gatal) akibat toksin uremik\n• **Edema** (perifer dan periorbital) akibat retensi cairan\n• Sesak napas karena kelebihan cairan\n• Mual, muntah, dan anoreksia (pada uremia lanjut)"
    },
    "physicalExamination": {
      "en": "• Hypertension (often poorly controlled)\n• Peripheral pitting **edema**\n• Pallor of conjunctiva and skin (anemia)\n• Pleural effusion or pulmonary rales (fluid overload)\n• Uremic frost (late-stage uremia)",
      "id": "• Hipertensi (sering kali sulit dikontrol)\n• **Edema** perifer pitting\n• Pucat pada konjungtiva dan kulit (anemia)\n• Efusi pleura atau ronkhi paru (kelebihan cairan)\n• Uremic frost (uremia stadium akhir)"
    },
    "labFindings": {
      "en": "• Decreased **eGFR <60 mL/min/1.73m²**\n• Urine Albumin-to-Creatinine Ratio **(UACR) >30 mg/g**\n• Anemia (normocytic, normochromic)\n• **Hyperkalemia** (potassium >5.0 mEq/L) and acidosis\n• Hyperphosphatemia and hypocalcemia",
      "id": "• Penurunan **eGFR <60 mL/min/1.73m²**\n• Rasio Albumin-Kreatinin Urin **(UACR) >30 mg/g**\n• Anemia (normositik, normokromik)\n• **Hiperkalemia** (kalium >5,0 mEq/L) dan asidosis\n• Hiperfosfatemia dan hipokalsemia"
    },
    "differentialDiagnosis": {
      "en": "• Acute Kidney Injury (AKI)\n• Nephrotic Syndrome\n• Congestive Heart Failure\n• Hepatic Cirrhosis",
      "id": "• Gangguan Ginjal Akut (AKI)\n• Sindrom Nefrotik\n• Gagal Jantung Kongestif\n• Sirosis Hati"
    },
    "dangerSigns": {
      "en": "• **Hyperkalemia (K+ >6.5 mEq/L)** with ECG changes (peaked T waves)\n• Severe **fluid overload** refractory to diuretics (pulmonary edema)\n• Uremic pericarditis or encephalopathy (altered mental status)\n• Severe metabolic acidosis **(pH <7.1)**",
      "id": "• **Hiperkalemia (K+ >6,5 mEq/L)** dengan perubahan EKG (gelombang T lancip)\n• **Kelebihan cairan** berat yang refrakter terhadap diuretik (edema paru)\n• Perikarditis uremik atau ensefalopati uremik (penurunan kesadaran)\n• Asidosis metabolik berat **(pH <7,1)**"
    },
    "management": {
      "initialTreatment": {
        "en": "• Administer **Furosemide 40-80 mg IV** for hypervolemia\n• Treat hyperkalemia: **Calcium Gluconate 10% 10 mL IV** if ECG changes exist, plus **Insulin 10 units in D50W 50 mL IV**\n• Restrict sodium (<2g/day) and potassium intake",
        "id": "• Berikan **Furosemid 40-80 mg IV** untuk hipervolemia\n• Atasi hiperkalemia: **Kalsium Glukonat 10% 10 mL IV** jika ada perubahan EKG, ditambah **Insulin 10 unit dalam D50W 50 mL IV**\n• Batasi asupan natrium (<2g/hari) dan kalium"
      },
      "definitiveTreatment": {
        "en": "• Initiate **SGLT2 inhibitors** (Dapagliflozin/Empagliflozin) for CKD with UACR >200 mg/g\n• Optimize blood pressure using **ACE inhibitors or ARBs** (titrate to maximum tolerated dose)\n• Prepare for **Renal Replacement Therapy** (Hemodialysis, Peritoneal Dialysis, or Transplant) for G5 CKD",
        "id": "• Mulai **penghambat SGLT2** (Dapagliflozin/Empagliflozin) untuk PGK dengan UACR >200 mg/g\n• Optimalkan tekanan darah menggunakan **ACE inhibitor atau ARB** (titrasi ke dosis maksimal)\n• Persiapkan **Terapi Pengganti Ginjal** (Hemodialisis, Dialisis Peritoneal, atau Transplantasi) pada PGK stadium G5"
      },
      "rehab": {
        "en": "• Regular low-intensity aerobic exercise to combat muscle wasting\n• Comprehensive dietary counseling (low protein for pre-dialysis, high protein for dialysis)",
        "id": "• Olahraga aerobik intensitas rendah secara teratur untuk mencegah penyusutan otot\n• Konseling diet komprehensif (rendah protein untuk pra-dialisis, tinggi protein untuk dialisis)"
      },
      "referral": {
        "en": "• Refer to **Nephrology** if **eGFR <30 mL/min/1.73m² (G4)**, rapid eGFR decline (>5 mL/min/year), or high albuminuria (UACR >300 mg/g)",
        "id": "• Rujuk ke **Spesialis Nefrologi** jika **eGFR <30 mL/min/1.73m² (G4)**, penurunan eGFR cepat (>5 mL/min/tahun), atau albuminuria tinggi (UACR >300 mg/g)"
      },
      "workup": {
        "en": "• Renal ultrasound to assess size and rule out obstruction\n• Monthly serum creatinine, electrolytes (potassium, bicarbonate), and calcium/phosphorus monitoring",
        "id": "• USG ginjal untuk menilai ukuran dan menyingkirkan obstruksi\n• Pemantauan bulanan kreatinin serum, elektrolit (kalium, bikarbonat), dan kalsium/fosfor"
      }
    },
    "followUp": {
      "en": "• Stage G3: Follow-up every **6 months**\n• Stage G4: Follow-up every **3 months**\n• Monitor medication doses and adjust for renal clearance",
      "id": "• Stadium G3: Kontrol setiap **6 bulan**\n• Stadium G4: Kontrol setiap **3 bulan**\n• Pantau dosis obat dan sesuaikan dengan klirens ginjal"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **ACEi/ARB** for renal protection in patients with diabetes and albuminuria\n• Tight glycemic control **(HbA1c <7.0%)**",
        "id": "• **ACEi/ARB** untuk proteksi ginjal pada pasien diabetes dengan albuminuria\n• Kontrol glikemik yang ketat **(HbA1c <7,0%)**"
      },
      "nonPharmacological": {
        "en": "• Maintain low sodium diet (<2,000 mg/day)\n• Avoid nephrotoxic agents (especially **NSAIDs**)\n• Smoking cessation and weight optimization",
        "id": "• Pertahankan diet rendah natrium (<2.000 mg/hari)\n• Hindari agen nefrotoksik (terutama **NSAID**)\n• Berhenti merokok dan optimalkan berat badan"
      }
    },
    "caseExample": {
      "en": "A 62-year-old male with a 15-year history of Type 2 Diabetes presents with persistent peripheral edema. Lab investigations reveal serum creatinine of **2.1 mg/dL**, eGFR of **34 mL/min/1.73m²** (G4 category), and a UACR of **420 mg/g** (A3 category). An ultrasound shows bilaterally shrunken kidneys. The patient is placed on **Dapagliflozin 10 mg daily** and **Losartan 50 mg daily**, and is referred to a nephrologist for pre-dialysis counseling.",
      "id": "Seorang pria 62 tahun dengan riwayat Diabetes Tipe 2 selama 15 tahun datang dengan edema perifer persisten. Pemeriksaan laboratorium menunjukkan kreatinin serum **2,1 mg/dL**, eGFR **34 mL/min/1.73m²** (kategori G4), dan UACR **420 mg/g** (kategori A3). USG menunjukkan ginjal mengecil secara bilateral. Pasien diberikan **Dapagliflozin 10 mg sehari** dan **Losartan 50 mg sehari**, serta dirujuk ke nefrolog untuk konseling pra-dialisis."
    },
    "references": {
      "en": "• KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease (Kidney International 2024)\n• KDIGO CKD Work Group. Kidney Int Suppl. 2024;105(4):S1-S218",
      "id": "• Pedoman Praktik Klinis KDIGO 2024 untuk Evaluasi dan Manajemen Penyakit Ginjal Kronis (Kidney International 2024)\n• KDIGO CKD Work Group. Kidney Int Suppl. 2024;105(4):S1-S218"
    },
    "id": 1,
    "content": {
      "en": "Chronic Kidney Disease (CKD) is defined as abnormalities of kidney structure or function, present for **>3 months**, with implications for health. It is classified based on cause, **GFR category (G1-G5)**, and **Albuminuria category (A1-A3)**.",
      "id": "Penyakit Ginjal Kronis (PGK) didefinisikan sebagai kelainan struktur atau fungsi ginjal yang berlangsung selama **>3 bulan**, yang berdampak pada kesehatan. Klasifikasinya didasarkan pada penyebab, **kategori GFR (G1-G5)**, dan **kategori Albuminuria (A1-A3)**."
    }
  },
  {
    "title": {
      "en": "Chronic Coronary Artery Disease",
      "id": "Penyakit Arteri Koroner Kronis"
    },
    "category": "Cardiology",
    "isStructured": true,
    "definition": {
      "en": "Chronic Coronary Artery Disease (CAD) is a stable, chronic state of coronary artery disease resulting from atherosclerotic plaque accumulation in epicardial arteries. It is characterized by stable anginal symptoms or history of acute coronary syndrome (ACS).",
      "id": "Penyakit Arteri Koroner Kronis (CAD) adalah kondisi kronis yang stabil dari penyakit arteri koroner akibat penumpukan plak aterosklerotik pada arteri epikardial. Ditandai dengan gejala angina stabil atau riwayat sindrom koroner akut (SKA)."
    },
    "symptoms": {
      "en": "• **Stable angina**: substernal chest discomfort or pressure\n• Precipitated by **exertion** or emotional stress\n• Relieved by **rest** or sublingual nitroglycerin within **5 minutes**\n• Radiation to neck, jaw, left arm, or epigastrium\n• 'Anginal equivalents' (dyspnea, fatigue) especially in diabetics and elderly",
      "id": "• **Angina stabil**: rasa tidak nyaman atau tekanan di dada substernal\n• Dipicu oleh **aktivitas** atau stres emosional\n• Mereda dengan **istirahat** atau nitrogliserin sublingual dalam **5 menit**\n• Penjalarang ke leher, rahang, lengan kiri, atau epigastrium\n• 'Ekuivalen angina' (sesak napas, kelelahan) terutama pada penderita diabetes dan lansia"
    },
    "physicalExamination": {
      "en": "• Often normal in stable resting state\n• Hypertension or signs of peripheral arterial disease (bruits, decreased pulses)\n• Heart sounds: S4 gallop during an episode of ischemia\n• Signs of hyperlipidemia (xanthomas, xanthelasma)",
      "id": "• Sering kali normal dalam keadaan istirahat stabil\n• Hipertensi atau tanda penyakit arteri perifer (bruit, denyut nadi menurun)\n• Bunyi jantung: S4 gallop selama episode iskemia\n• Tanda hiperlipidemia (xantoma, xantelasma)"
    },
    "labFindings": {
      "en": "• Normal cardiac enzymes (negative Troponin)\n• Elevated LDL cholesterol (>70 mg/dL without therapy)\n• Impaired fasting glucose or elevated HbA1c\n• Microalbuminuria (risk factor for cardiovascular events)",
      "id": "• Enzim jantung normal (Troponin negatif)\n• Kadar kolesterol LDL tinggi (>70 mg/dL tanpa terapi)\n• Gangguan glukosa puasa atau peningkatan HbA1c\n• Mikroalbuminuria (faktor risiko kejadian kardiovaskular)"
    },
    "differentialDiagnosis": {
      "en": "• GERD / Esophageal spasm\n• Costochondritis\n• Aortic Stenosis\n• Hypertrophic Cardiomyopathy\n• Anxiety / Panic attacks",
      "id": "• GERD / Spasme esofagus\n• Kostokondritis\n• Stenosis Aorta\n• Kardiomiopati Hipertrofik\n• Kecemasan / Serangan panik"
    },
    "dangerSigns": {
      "en": "• **Unstable Angina**: chest pain at rest, or of increasing frequency/intensity\n• Prolonged chest pain **>20 minutes** (suspected MI)\n• Acute dyspnea, syncope, or diaphoresis accompanying pain",
      "id": "• **Angina Tidak Stabil**: nyeri dada saat istirahat, atau dengan frekuensi/intensitas meningkat\n• Nyeri dada berlangsung lama **>20 menit** (kecurigaan infark miokard)\n• Sesak napas akut, sinkop, atau diaforesis yang menyertai nyeri"
    },
    "management": {
      "initialTreatment": {
        "en": "• Administer **Sublingual Nitroglycerin 0.4 mg** during acute chest pain\n• Provide **Aspirin 81-162 mg daily** for antiplatelet therapy\n• Start short-acting **beta-blockers** (e.g. Metoprolol tartrate) for symptomatic relief",
        "id": "• Berikan **Nitrogliserin Sublingual 0,4 mg** saat nyeri dada akut\n• Berikan **Aspirin 81-162 mg sehari** sebagai terapi antiplatelet\n• Mulai **penyekat beta** kerja singkat (misal: Metoprolol tartrat) untuk meredakan gejala"
      },
      "definitiveTreatment": {
        "en": "• Optimize **lipid therapy**: High-intensity statin (**Atorvastatin 40-80 mg daily** or **Rosuvastatin 20-40 mg daily**) to target **LDL <55 mg/dL**\n• Antianginal therapy: Long-acting beta-blockers, Calcium Channel Blockers (Amlodipine), or **Ranolazine**\n• Revascularization via **PCI or CABG** for refractory symptoms or high-risk anatomy",
        "id": "• Optimalkan **terapi lipid**: Statin intensitas tinggi (**Atorvastatin 40-80 mg sehari** atau **Rosuvastatin 20-40 mg sehari**) dengan target **LDL <55 mg/dL**\n• Terapi antiangina: Penyekat beta kerja panjang, Calcium Channel Blocker (Amlodipin), atau **Ranolazin**\n• Revaskularisasi melalui **PCI atau CABG** untuk gejala refrakter atau anatomi risiko tinggi"
      },
      "rehab": {
        "en": "• Enrollment in structured cardiovascular rehabilitation programs\n• Graduated aerobic exercise training (at least **150 mins/week**)",
        "id": "• Pendaftaran dalam program rehabilitasi kardiovaskular terstruktur\n• Latihan olahraga aerobik bertahap (setidaknya **150 menit/minggu**)"
      },
      "referral": {
        "en": "• Refer to **Cardiology** for diagnostic coronary angiography or non-invasive stress testing if symptoms persist despite optimal medical therapy",
        "id": "• Rujuk ke **Spesialis Jantung** untuk angiografi koroner diagnostik atau uji latih beban non-invasif jika gejala menetap meskipun terapi medis optimal"
      },
      "workup": {
        "en": "• 12-lead ECG, transthoracic echocardiogram to assess ejection fraction\n• Cardiac stress testing (exercise treadmill or pharmacologic stress imaging)\n• Coronary Computed Tomography Angiography (CCTA)",
        "id": "• EKG 12-sadapan, ekokardiografi transtorakal untuk menilai fraksi ejeksi\n• Uji latih beban jantung (treadmill atau pencitraan beban farmakologis)\n• Coronary Computed Tomography Angiography (CCTA)"
      }
    },
    "followUp": {
      "en": "• Review every **6-12 months** when stable\n• Monitor lipid panel, HbA1c, renal function, and medication adherence at each visit",
      "id": "• Tinjau setiap **6-12 bulan** jika kondisi stabil\n• Pantau profil lipid, HbA1c, fungsi ginjal, dan kepatuhan pengobatan pada setiap kunjungan"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **Aspirin 81 mg daily** for secondary prevention\n• **Statin therapy** for plaque stabilization\n• ACE inhibitor/ARB for patients with co-existing hypertension, diabetes, or HFrEF",
        "id": "• **Aspirin 81 mg sehari** untuk pencegahan sekunder\n• **Terapi statin** untuk stabilisasi plak\n• ACE inhibitor/ARB untuk pasien dengan hipertensi penyerta, diabetes, atau HFrEF"
      },
      "nonPharmacological": {
        "en": "• Mediterranean-style diet low in saturated fats\n• Smoking cessation (highly critical)\n• Weight optimization (BMI **18.5-24.9 kg/m²**)",
        "id": "• Diet gaya Mediterania rendah lemak jenuh\n• Berhenti merokok (sangat kritis)\n• Optimalisasi berat badan (IMT **18,5-24,9 kg/m²**)"
      }
    },
    "caseExample": {
      "en": "A 58-year-old male presents with a 3-month history of chest tightness when walking up steep hills, resolving within 3 minutes of resting. He has a history of smoking and hypertension. Vital signs are stable. ECG at rest is normal. Troponin is negative. An exercise stress test is positive for reversible ischemia in the anterior wall. The patient is placed on **Atorvastatin 80 mg daily**, **Aspirin 81 mg daily**, and **Metoprolol Succinate 50 mg daily**. He is referred for a coronary angiogram which reveals 75% occlusion of the mid-LAD, managed successfully with a drug-eluting stent.",
      "id": "Seorang pria 58 tahun datang dengan riwayat dada terasa terikat sejak 3 bulan ketika berjalan di bukit yang curam, mereda dalam waktu 3 menit setelah beristirahat. Ia memiliki riwayat merokok dan hipertensi. Tanda-tanda vital stabil. EKG istirahat normal. Troponin negatif. Uji latih beban treadmill positif untuk iskemia reversibel di dinding anterior. Pasien diberikan **Atorvastatin 80 mg sehari**, **Aspirin 81 mg sehari**, dan **Metoprolol Suksinat 50 mg sehari**. Ia dirujuk untuk angiografi koroner yang menunjukkan oklusi 75% pada LAD tengah, yang berhasil ditangani dengan stent eluting obat."
    },
    "references": {
      "en": "• AHA/ACC 2023 Guideline for the Management of Patients With Chronic Coronary Disease (JACC 2023)\n• Virani SS, et al. J Am Coll Cardiol. 2023;82(9):839-928",
      "id": "• Pedoman AHA/ACC 2023 untuk Manajemen Pasien dengan Penyakit Koroner Kronis (JACC 2023)\n• Virani SS, et al. J Am Coll Cardiol. 2023;82(9):839-928"
    },
    "id": 2,
    "content": {
      "en": "Chronic Coronary Artery Disease (CAD) is a stable, chronic state of coronary artery disease resulting from atherosclerotic plaque accumulation in epicardial arteries. It is characterized by stable anginal symptoms or history of acute coronary syndrome (ACS).",
      "id": "Penyakit Arteri Koroner Kronis (CAD) adalah kondisi kronis yang stabil dari penyakit arteri koroner akibat penumpukan plak aterosklerotik pada arteri epikardial. Ditandai dengan gejala angina stabil atau riwayat sindrom koroner akut (SKA)."
    }
  },
  {
    "title": {
      "en": "Community-Acquired Pneumonia (CAP)",
      "id": "Pneumonia Komunitas (CAP)"
    },
    "category": "Pulmonology",
    "isStructured": true,
    "definition": {
      "en": "Community-Acquired Pneumonia (CAP) is an acute infection of the lung parenchyma acquired outside of a healthcare setting. The most common bacterial pathogen is **Streptococcus pneumoniae**, though viral and atypical pathogens are also prevalent.",
      "id": "Pneumonia Komunitas (CAP) adalah infeksi akut pada parenkim paru yang didapat di luar fasilitas pelayanan kesehatan. Patogen bakteri yang paling umum adalah **Streptococcus pneumoniae**, meskipun patogen virus dan atipikal juga prevalen."
    },
    "symptoms": {
      "en": "• Acute onset of **cough** (dry or productive with purulent sputum)\n• **Fever** (>38.0°C) with shaking chills or rigors\n• Pleuritic chest pain\n• **Dyspnea** (shortness of breath)\n• Constitutional symptoms: fatigue, headache, myalgia, anorexia",
      "id": "• Onset akut dari **batuk** (kering atau produktif dengan sputum purulen)\n• **Demam** (>38,0°C) dengan menggigil\n• Nyeri dada pleuritik\n• **Dyspnea** (sesak napas)\n• Gejala konstitusional: kelelahan, sakit kepala, mialgia, anoreksia"
    },
    "physicalExamination": {
      "en": "• Tachypnea (>20 breaths/min), tachycardia, fever\n• Decreased oxygen saturation (SpO2)\n• Auscultation: localized **crackles (crepitations)**, bronchial breath sounds, increased vocal fremitus\n• Dullness to percussion (suggesting lobar consolidation or parapneumonic effusion)",
      "id": "• Takipnea (>20 x/menit), takikardia, demam\n• Penurunan saturasi oksigen (SpO2)\n• Auskultasi: **ronkhi basah kasar (krepitasi)** terlokalisir, suara napas bronkial, fremitus vokal meningkat\n• Pekak pada perkusi (menunjukkan konsolidasi lobar atau efusi parapneumonik)"
    },
    "labFindings": {
      "en": "• Leukocytosis with left shift (or leukopenia in severe cases)\n• Elevated inflammatory markers: **CRP** or **Procalcitonin**\n• Chest Radiograph showing **infiltrate or consolidation** (required for diagnosis)\n• Sputum and blood cultures (in severe cases or prior antibiotic failures)",
      "id": "• Leukositosis dengan left shift (atau leukopenia pada kasus berat)\n• Peningkatan penanda inflamasi: **CRP** atau **Prokalsitonin**\n• Rontgen dada menunjukkan **infiltrat atau konsolidasi** (wajib untuk diagnosis)\n• Kultur sputum dan darah (pada kasus berat atau kegagalan antibiotik sebelumnya)"
    },
    "differentialDiagnosis": {
      "en": "• Acute Bronchitis\n• Pulmonary Embolism\n• Congestive Heart Failure\n• Pulmonary Tuberculosis\n• Lung Malignancy",
      "id": "• Bronkhitis Akut\n• Emboli Paru\n• Gagal Jantung Kongestif\n• Tuberkulosis Paru\n• Keganasan Paru"
    },
    "dangerSigns": {
      "en": "• Altered mental status / confusion\n• Hypotension (SBP <90 mmHg)\n• Tachypnea **>30 breaths/min**\n• Severe hypoxemia (SpO2 <90% on room air)\n• Uremia (BUN **>19 mg/dL**)",
      "id": "• Penurunan kesadaran / kebingungan\n• Hipotensi (TDS <90 mmHg)\n• Takipnea **>30 x/menit**\n• Hipoksemia berat (SpO2 <90% pada udara ruangan)\n• Uremia (BUN **>19 mg/dL**)"
    },
    "management": {
      "initialTreatment": {
        "en": "• Supplement oxygen if SpO2 <92%\n• Risk stratify using **CURB-65** or **PSI (Pneumonia Severity Index)**\n• Initiate empiric antibiotic therapy within **4 hours** of diagnosis\n• Ensure adequate hydration and antipyretics for fever",
        "id": "• Berikan tambahan oksigen jika SpO2 <92%\n• Stratifikasi risiko menggunakan **CURB-65** atau **PSI (Pneumonia Severity Index)**\n• Mulai terapi antibiotik empiris dalam **4 jam** sejak diagnosis\n• Pastikan hidrasi yang memadai dan berikan antipiretik untuk demam"
      },
      "definitiveTreatment": {
        "en": "• Outpatient (no comorbidities): **Amoxicillin 1g tid** OR **Doxycycline 100mg bid** OR a Macrolide\n• Outpatient (with comorbidities): **Co-amoxiclav** plus a **Macrolide** OR respiratory Monotherapy (Levofloxacin 750mg daily)\n• Inpatient (non-severe): IV **Ceftriaxone 1-2g daily** plus **Azithromycin 500mg IV/PO daily**\n• Inpatient (severe): IV Beta-lactam plus respiratory Fluoroquinolone OR Beta-lactam plus Azithromycin. Duration: **5-7 days**",
        "id": "• Rawat Jalan (tanpa komorbid): **Amoksisilin 1g 3x sehari** ATAU **Doksisiklin 100mg 2x sehari** ATAU Makrolida\n• Rawat Jalan (dengan komorbid): **Ko-amoksiklav** ditambah **Makrolida** ATAU Monoterapi respiratorik (Levofloksasin 750mg sehari)\n• Rawat Inap (non-berat): IV **Ceftriaxone 1-2g sehari** ditambah **Azitromisin 500mg IV/PO sehari**\n• Rawat Inap (berat): Beta-laktam IV ditambah Fluoroquinolon respiratorik ATAU Beta-laktam ditambah Azitromisin. Durasi: **5-7 hari**"
      },
      "rehab": {
        "en": "• Deep breathing exercises (incentive spirometry)\n• Gradual mobilization and chest physiotherapy if productive secretions are copious",
        "id": "• Latihan pernapasan dalam (incentive spirometry)\n• Mobilisasi bertahap dan fisioterapi dada jika sekret produktif sangat banyak"
      },
      "referral": {
        "en": "• Transfer to **ICU** if patient meets **1 major** (mechanical ventilation, vasopressor support) or **>=3 minor** criteria of the ATS/IDSA severe CAP guidelines",
        "id": "• Transfer ke **ICU** jika pasien memenuhi **1 kriteria mayor** (ventilasi mekanik, dukungan vasopresor) atau **>=3 kriteria minor** dari pedoman CAP berat ATS/IDSA"
      },
      "workup": {
        "en": "• Chest X-ray at baseline\n• Complete Blood Count (CBC), renal panel, and CRP/Procalcitonin",
        "id": "• Rontgen dada pada awal pemeriksaan\n• Darah Lengkap, panel ginjal, dan CRP/Prokalsitonin"
      }
    },
    "followUp": {
      "en": "• Follow up in **48-72 hours** to assess clinical response\n• Repeat chest X-ray in **6-8 weeks** in patients >50 or smokers to document resolution and rule out malignancy",
      "id": "• Tindak lanjut dalam **48-72 jam** untuk menilai respons klinis\n• Ulangi rontgen dada dalam **6-8 minggu** pada pasien >50 tahun atau perokok untuk dokumentasi resolusi dan menyingkirkan keganasan"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **Pneumococcal vaccination** (PCV15/PCV20 followed by PPSV23 based on age/risk factors)\n• Annual **influenza vaccine**",
        "id": "• **Vaksinasi pneumokokus** (PCV15/PCV20 diikuti oleh PPSV23 berdasarkan usia/faktor risiko)\n• Vaksinasi **influenza tahunan**"
      },
      "nonPharmacological": {
        "en": "• Smoking cessation (reduces pneumococcal risk significantly)\n• Strict hand hygiene and respiratory etiquette",
        "id": "• Berhenti merokok (mengurangi risiko pneumokokus secara signifikan)\n• Kebersihan tangan yang ketat dan etika batuk"
      }
    },
    "caseExample": {
      "en": "A 69-year-old female presents with fever, chills, and a productive cough with rusty sputum. Vital signs: SBP 105/65 mmHg, HR 102 bpm, RR 26 breaths/min, temp 38.6°C, SpO2 93% on room air. Lab results show BUN of **24 mg/dL** and leukocytosis. Chest X-ray shows right lower lobar consolidation. Her **CURB-65 score is 2** (age >= 65, BUN > 19), prompting admission. She is successfully treated with IV **Ceftriaxone 2g daily** and oral **Azithromycin 500mg daily** for 5 days, showing rapid clinical improvement.",
      "id": "Seorang wanita 69 tahun datang dengan demam, menggigil, dan batuk produktif dengan dahak berwarna karat. Tanda vital: TDS 105/65 mmHg, HR 102 x/menit, RR 26 x/menit, suhu 38,6°C, SpO2 93% pada udara ruangan. Hasil lab menunjukkan BUN **24 mg/dL** dan leukositosis. Rontgen dada menunjukkan konsolidasi lobus kanan bawah. Skor **CURB-65 adalah 2** (usia >= 65, BUN > 19), sehingga diputuskan untuk rawat inap. Ia berhasil diobati dengan IV **Ceftriaxone 2g sehari** dan oral **Azitromisin 500mg sehari** selama 5 hari, menunjukkan perbaikan klinis yang cepat."
    },
    "references": {
      "en": "• Diagnosis and Treatment of Adults with Community-acquired Pneumonia: An Official Clinical Practice Guideline of the IDSA and ATS (AJRCCM 2019)\n• Metlay JP, et al. Am J Respir Crit Care Med. 2019;200(7):e45-e67",
      "id": "• Diagnosis dan Pengobatan Orang Dewasa dengan Pneumonia Komunitas: Pedoman Praktik Klinis Resmi IDSA dan ATS (AJRCCM 2019)\n• Metlay JP, et al. Am J Respir Crit Care Med. 2019;200(7):e45-e67"
    },
    "id": 3,
    "content": {
      "en": "Community-Acquired Pneumonia (CAP) is an acute infection of the lung parenchyma acquired outside of a healthcare setting. The most common bacterial pathogen is **Streptococcus pneumoniae**, though viral and atypical pathogens are also prevalent.",
      "id": "Pneumonia Komunitas (CAP) adalah infeksi akut pada parenkim paru yang didapat di luar fasilitas pelayanan kesehatan. Patogen bakteri yang paling umum adalah **Streptococcus pneumoniae**, meskipun patogen virus dan atipikal juga prevalen."
    }
  },
  {
    "title": {
      "en": "Gastrointestinal Dysbiosis & Probiotic Therapy",
      "id": "Disbiosis Gastrointestinal & Terapi Probiotik"
    },
    "category": "Gastroenterology",
    "isStructured": true,
    "definition": {
      "en": "Gastrointestinal Dysbiosis is an imbalance in the composition and function of the gut microbiota, which can contribute to various gastrointestinal disorders (e.g. IBS, antibiotic-associated diarrhea). Probiotic therapy involves the administration of live microorganisms that confer a health benefit on the host.",
      "id": "Disbiosis Gastrointestinal adalah ketidakseimbangan komposisi dan fungsi mikrobiota usus, yang dapat berkontribusi pada berbagai gangguan pencernaan (misal: IBS, diare terkait antibiotik). Terapi probiotik melibatkan pemberian mikroorganisme hidup yang memberikan manfaat kesehatan bagi inangnya."
    },
    "symptoms": {
      "en": "• Abdominal bloating and distension\n• Excessive **flatulence** (gas)\n• Altered bowel habits: diarrhea, constipation, or alternating patterns (IBS-like)\n• Epigastric fullness and dyspepsia\n• Abdominal cramping",
      "id": "• Perut kembung dan begah\n• **Flatulensi** (buang angin) berlebihan\n• Perubahan kebiasaan buang air besar: diare, konstipasi, atau pola bergantian (seperti IBS)\n• Rasa penuh di epigastrium dan dispepsia\n• Kram perut"
    },
    "physicalExamination": {
      "en": "• Abdominal distension (tympanic on percussion)\n• Diffuse mild abdominal tenderness without guarding or rigidity\n• Hyperactive or normal bowel sounds",
      "id": "• Distensi abdomen (timpani pada perkusi)\n• Nyeri tekan abdomen difus derajat ringan tanpa defens muskular atau rigiditas\n• Bising usus hiperaktif atau normal"
    },
    "labFindings": {
      "en": "• Diagnosis is primarily clinical; no routine lab assays are diagnostic for dysbiosis\n• Negative stool cultures for pathogens (to rule out infectious gastroenteritis)\n• High-pressure hydrogen/methane on **breath tests** in cases of Small Intestinal Bacterial Overgrowth (SIBO)",
      "id": "• Diagnosis utamanya bersifat klinis; tidak ada pemeriksaan lab rutin yang diagnostik untuk disbiosis\n• Kultur feses negatif untuk patogen (untuk menyingkirkan gastroenteritis infeksius)\n• Hidrogen/metana tekanan tinggi pada **breath test** pada kasus Pertumbuhan Bakteri Berlebih di Usus Halus (SIBO)"
    },
    "differentialDiagnosis": {
      "en": "• Celiac Disease\n• Inflammatory Bowel Disease (IBD)\n• Small Intestinal Bacterial Overgrowth (SIBO)\n• Lactose Intolerance\n• Infectious Gastroenteritis",
      "id": "• Penyakit Celiac\n• Penyakit Radang Usus (IBD)\n• Pertumbuhan Bakteri Berlebih di Usus Halus (SIBO)\n• Intoleransi Laktosa\n• Gastroenteritis Infeksius"
    },
    "dangerSigns": {
      "en": "• Unexplained **weight loss**\n• Hematochezia (blood in stool) or melena\n• Nocturnal diarrhea waking the patient\n• Fever, persistent severe abdominal pain\n• Persistent anemia (iron deficiency)",
      "id": "• Penurunan **berat badan** yang tidak dapat dijelaskan\n• Hematokezia (darah pada feses) atau melena\n• Diare nokturnal yang membangunkan pasien\n• Demam, nyeri perut hebat yang menetap\n• Anemia persisten (defisiensi besi)"
    },
    "management": {
      "initialTreatment": {
        "en": "• Avoid empirical antibiotics unless SIBO is confirmed\n• Recommend dietary adjustment: decrease simple sugars, increase fiber\n• Start **Probiotic therapy** matching the clinical indication",
        "id": "• Hindari penggunaan antibiotik empiris kecuali SIBO terkonfirmasi\n• Rekomendasikan penyesuaian diet: kurangi gula sederhana, tingkatkan serat\n• Mulai **Terapi probiotik** yang sesuai dengan indikasi klinis"
      },
      "definitiveTreatment": {
        "en": "• For prevention of Antibiotic-Associated Diarrhea (AAD): **Saccharomyces boulardii** OR **Lactobacillus rhamnosus GG** co-administered with antibiotics\n• For Irritable Bowel Syndrome (IBS): Multi-strain probiotics (e.g. Bifidobacterium, Lactobacillus) for at least **1 month**\n• For acute gastroenteritis: Short course of S. boulardii or L. rhamnosus GG to reduce duration",
        "id": "• Untuk pencegahan Diare Terkait Antibiotik (AAD): **Saccharomyces boulardii** ATAU **Lactobacillus rhamnosus GG** yang diberikan bersama antibiotik\n• Untuk Sindrom Iritasi Usus (IBS): Probiotik multi-strain (misal: Bifidobacterium, Lactobacillus) selama minimal **1 bulan**\n• Untuk gastroenteritis akut: Siklus singkat S. boulardii atau L. rhamnosus GG untuk mengurangi durasi"
      },
      "rehab": {
        "en": "• Slow, progressive introduction of prebiotics (fermentable fibers) to support probiotic colonization",
        "id": "• Pengenalan prebiotik (serat fermentasi) secara lambat dan bertahap untuk mendukung kolonisasi probiotik"
      },
      "referral": {
        "en": "• Refer to **Gastroenterology** if warning signs are present, or symptoms are refractory to 4 weeks of dietary and probiotic therapy",
        "id": "• Rujuk ke **Spesialis Gastroenterologi** jika ada tanda bahaya, atau gejala refrakter terhadap 4 minggu terapi diet dan probiotik"
      },
      "workup": {
        "en": "• Stool testing (fecal calprotectin to rule out IBD if clinically suspicious)\n• Serological screen for Celiac disease (tTG-IgA)",
        "id": "• Pemeriksaan feses (kalprotektin fekal untuk menyingkirkan IBD jika dicurigai secara klinis)\n• Skrining serologi untuk penyakit Celiac (tTG-IgA)"
      }
    },
    "followUp": {
      "en": "• Follow up in **2-4 weeks** to evaluate symptomatic improvement and compliance\n• Adjust probiotic strains or dietary protocols if no response",
      "id": "• Tindak lanjut dalam **2-4 minggu** untuk mengevaluasi perbaikan gejala dan kepatuhan\n• Sesuaikan strain probiotik atau protokol diet jika tidak ada respons"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Targeted use of **S. boulardii** during broad-spectrum antibiotic treatment courses",
        "id": "• Penggunaan terarget **S. boulardii** selama siklus pengobatan antibiotik spektrum luas"
      },
      "nonPharmacological": {
        "en": "• High fiber diet rich in diverse plant foods\n• Regular intake of naturally fermented foods (yogurt, kefir, tempeh)\n• Avoidance of unnecessary antibiotic use",
        "id": "• Diet tinggi serat yang kaya akan beragam makanan nabati\n• Konsumsi makanan terfermentasi alami secara rutin (yoghurt, kefir, tempe)\n• Menghindari penggunaan antibiotik yang tidak perlu"
      }
    },
    "caseExample": {
      "en": "A 34-year-old female presents with persistent abdominal bloating and loose stools after completing a 10-day course of Amoxicillin-Clavulanate for sinusitis. She reports **flatulence** and passing 3-4 soft stools daily. Stool cultures are negative. The patient is prescribed **Lactobacillus rhamnosus GG (10 billion CFU daily)** for 14 days and advised to increase intake of soluble fibers. Her bowel movements return to baseline within 5 days, and abdominal bloating resolves completely.",
      "id": "Seorang wanita 34 tahun datang dengan perut kembung persisten dan feses lembek setelah menyelesaikan 10 hari terapi Amoksisilin-Klavulanat untuk sinusitis. Ia melaporkan **flatulensi** dan buang air besar 3-4 kali sehari dengan konsistensi lembek. Kultur feses negatif. Pasien diresepkan **Lactobacillus rhamnosus GG (10 miliar CFU sehari)** selama 14 hari dan disarankan meningkatkan asupan serat larut. Pola buang air besarnya kembali normal dalam 5 hari, dan perut kembung mereda sepenuhnya."
    },
    "references": {
      "en": "• World Gastroenterology Organisation Global Guidelines: Probiotics and Prebiotics (WGO 2023)\n• Guarner F, et al. World Gastroenterology Organisation, 2023",
      "id": "• Pedoman Global Organisasi Gastroenterologi Dunia: Probiotik dan Prebiotik (WGO 2023)\n• Guarner F, et al. World Gastroenterology Organisation, 2023"
    },
    "id": 4,
    "content": {
      "en": "Gastrointestinal Dysbiosis is an imbalance in the composition and function of the gut microbiota, which can contribute to various gastrointestinal disorders (e.g. IBS, antibiotic-associated diarrhea). Probiotic therapy involves the administration of live microorganisms that confer a health benefit on the host.",
      "id": "Disbiosis Gastrointestinal adalah ketidakseimbangan komposisi dan fungsi mikrobiota usus, yang dapat berkontribusi pada berbagai gangguan pencernaan (misal: IBS, diare terkait antibiotik). Terapi probiotik melibatkan pemberian mikroorganisme hidup yang memberikan manfaat kesehatan bagi inangnya."
    }
  },
  {
    "title": {
      "en": "Type 2 Diabetes Mellitus (T2DM)",
      "id": "Diabetes Melitus Tipe 2 (DMT2)"
    },
    "category": "Endocrinology",
    "isStructured": true,
    "definition": {
      "en": "Type 2 Diabetes Mellitus (T2DM) is a chronic metabolic disorder characterized by **insulin resistance** and progressive pancreatic beta-cell dysfunction, leading to chronic **hyperglycemia**. It is associated with significant microvascular and macrovascular complications.",
      "id": "Diabetes Melitus Tipe 2 (DMT2) adalah gangguan metabolik kronis yang ditandai oleh **resistensi insulin** dan disfungsi progresif sel beta pankreas, yang menyebabkan **hiperglikemia** kronis. Kondisi ini dikaitkan dengan komplikasi mikrovaskular dan makrovaskular yang signifikan."
    },
    "symptoms": {
      "en": "• Polyuria (increased urination)\n• Polydipsia (increased thirst)\n• Polyphagia (increased hunger)\n• Unexplained weight loss\n• Blurry vision, frequent infections, or slow-healing wounds\n• Often asymptomatic in early years (diagnosed during screening)",
      "id": "• Poliuria (sering buang air besar)\n• Polidipsia (sering haus)\n• Polifagia (sering lapar)\n• Penurunan berat badan yang tidak dapat dijelaskan\n• Pandangan kabur, infeksi sering, atau luka yang lambat sembuh\n• Sering kali tanpa gejala pada tahun-tahun awal (terdiagnosis saat skrining)"
    },
    "physicalExamination": {
      "en": "• Obesity or high waist circumference\n• Acanthosis nigricans (hyperpigmented velvety patches indicating **insulin resistance**)\n• Decreased peripheral sensation (monofilament test for neuropathy)\n• Diminished peripheral pulses (PAD)\n• Fundoscopy: microaneurysms or cotton wool spots (diabetic retinopathy)",
      "id": "• Obesitas atau lingkar pinggang tinggi\n• Akantosis nigrikans (bercak hiperpigmentasi seperti beludru yang menunjukkan **resistensi insulin**)\n• Penurunan sensasi perifer (tes monofilamen untuk neuropati)\n• Denyut nadi perifer melemah (PAD)\n• Funduskopi: mikroaneurisma atau cotton wool spot (retinopati diabetik)"
    },
    "labFindings": {
      "en": "• Fasting Plasma Glucose **>=126 mg/dL**\n• 2-hour Post-load Glucose **>=200 mg/dL**\n• HbA1c **>=6.5%**\n• Random Plasma Glucose **>=200 mg/dL** with classic symptoms\n• Microalbuminuria (UACR **30-300 mg/g**)",
      "id": "• Glukosa Plasma Puasa **>=126 mg/dL**\n• Glukosa 2 Jam Post-load **>=200 mg/dL**\n• HbA1c **>=6,5%**\n• Glukosa Plasma Acak **>=200 mg/dL** dengan gejala klasik\n• Mikroalbuminuria (UACR **30-300 mg/g**)"
    },
    "differentialDiagnosis": {
      "en": "• Type 1 Diabetes Mellitus\n• LADA (Latent Autoimmune Diabetes in Adults)\n• MODY (Maturity-Onset Diabetes of the Young)\n• Secondary Diabetes (e.g. Cushing's disease, pancreatitis)",
      "id": "• Diabetes Melitus Tipe 1\n• LADA (Latent Autoimmune Diabetes in Adults)\n• MODY (Maturity-Onset Diabetes of the Young)\n• Diabetes Sekunder (misal: penyakit Cushing, pankreatitis)"
    },
    "dangerSigns": {
      "en": "• Diabetic Ketoacidosis (DKA) or Hyperosmolar Hyperglycemic State (HHS) symptoms\n• Altered mental status or lethargy\n• Deep, rapid breathing (**Kussmaul breathing**)\n• Severe dehydration, hypotension\n• Acute hypoglycemic symptoms: sweating, tremor, confusion, seizures **(glucose <70 mg/dL)**",
      "id": "• Gejala Ketoasidosis Diabetik (KAD) atau Status Hiperosmolar Hiperglikemik (SHH)\n• Penurunan kesadaran atau letargi\n• Pernapasan cepat dan dalam (**pernapasan Kussmaul**)\n• Dehidrasi berat, hipotensi\n• Gejala hipoglikemia akut: berkeringat, gemetar, kebingungan, kejang **(glukosa <70 mg/dL)**"
    },
    "management": {
      "initialTreatment": {
        "en": "• Implement therapeutic lifestyle changes (diet and exercise)\n• Initiate **Metformin 500 mg once or twice daily** as first-line pharmacotherapy if no contraindications exist (eGFR >30)\n• If acute symptomatic hyperglycemia is present, start temporary **Insulin therapy**",
        "id": "• Terapkan perubahan gaya hidup terapeutik (diet dan olahraga)\n• Mulai **Metformin 500 mg satu atau dua kali sehari** sebagai farmakoterapi lini pertama jika tidak ada kontraindikasi (eGFR >30)\n• Jika ada hiperglikemia simptomatik akut, mulai **terapi insulin** sementara"
      },
      "definitiveTreatment": {
        "en": "• Personalize glycemic target (generally **HbA1c <7.0%**)\n• If ASCVD, Heart Failure, or CKD is present: Add **SGLT2 inhibitors** (Dapagliflozin) or **GLP-1 receptor agonists** (Semaglutide) regardless of Metformin use\n• If HbA1c remains above target, add secondary agents (DPP-4 inhibitors, Sulfonylureas, Pioglitazone, or basal Insulin)\n• Tight blood pressure control (<130/80 mmHg) and lipid control (Statin therapy)",
        "id": "• Personalisasikan target glikemik (umumnya **HbA1c <7,0%**)\n• Jika ada penyakit ASCVD, Gagal Jantung, atau PGK: Tambahkan **penghambat SGLT2** (Dapagliflozin) atau **agonis reseptor GLP-1** (Semaglutide) tanpa memandang penggunaan Metformin\n• Jika HbA1c tetap di atas target, tambahkan agen sekunder (penghambat DPP-4, Sulfonilurea, Pioglitazon, atau Insulin basal)\n• Kontrol tekanan darah yang ketat (<130/80 mmHg) dan kontrol lipid (terapi Statin)"
      },
      "rehab": {
        "en": "• Structured diabetic education program\n• Podiatry care and regular foot checks to prevent diabetic ulcers",
        "id": "• Program edukasi diabetes terstruktur\n• Perawatan podiatri dan pemeriksaan kaki rutin untuk mencegah ulkus diabetikum"
      },
      "referral": {
        "en": "• Refer to **Endocrinology** if glycemic control is refractory to triple therapy, recurrent severe hypoglycemia occurs, or for advanced complications (retinopathy, severe neuropathy)",
        "id": "• Rujuk ke **Spesialis Endokrinologi** jika kontrol glikemik refrakter terhadap terapi rangkap tiga, terjadi hipoglikemia berat berulang, atau komplikasi lanjut (retinopati, neuropati berat)"
      },
      "workup": {
        "en": "• HbA1c every **3-6 months**\n• Annual lipid panel, serum creatinine, eGFR, and **UACR**\n• Annual comprehensive foot exam and dilated eye exam",
        "id": "• Pemeriksaan HbA1c setiap **3-6 bulan**\n• Pemantauan profil lipid, kreatinin serum, eGFR, dan **UACR** tahunan\n• Pemeriksaan kaki komprehensif dan pemeriksaan mata tahunan"
      }
    },
    "followUp": {
      "en": "• Check patient every **3 months** until glycemic target is achieved, then every **6 months**",
      "id": "• Periksa pasien setiap **3 bulan** hingga target glikemik tercapai, kemudian setiap **6 bulan**"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **Metformin** may be considered for prevention of T2DM in patients with prediabetes (especially if BMI >35, age <60, or prior gestational diabetes)",
        "id": "• **Metformin** dapat dipertimbangkan untuk pencegahan DMT2 pada pasien prediabetes (terutama jika IMT >35, usia <60 tahun, atau riwayat diabetes gestasional)"
      },
      "nonPharmacological": {
        "en": "• Intensive lifestyle modification: **150 mins/week** of moderate aerobic activity\n• Hypocaloric diet aiming for **>7% weight loss**\n• Smoking cessation",
        "id": "• Modifikasi gaya hidup intensif: **150 menit/minggu** aktivitas aerobik sedang\n• Diet hipokalori dengan target **penurunan berat badan >7%**\n• Berhenti merokok"
      }
    },
    "caseExample": {
      "en": "A 52-year-old overweight female is diagnosed with T2DM during a routine screening. Her fasting blood glucose is **142 mg/dL** and **HbA1c is 7.6%**. She has mild hypertension but no kidney disease or cardiovascular history. The patient is prescribed **Metformin 500 mg twice daily** and receives structured dietary counseling focusing on low-glycemic foods. After 3 months, her HbA1c decreases to **6.8%**, and she reports successfully losing **4 kg** of body weight.",
      "id": "Seorang wanita 52 tahun dengan kelebihan berat badan terdiagnosis DMT2 saat skrining rutin. Gula darah puasanya **142 mg/dL** dan **HbA1c 7,6%**. Ia memiliki hipertensi ringan tetapi tidak ada penyakit ginjal atau riwayat penyakit kardiovaskular. Pasien diresepkan **Metformin 500 mg dua kali sehari** dan menerima konseling diet terstruktur yang berfokus pada makanan rendah glikemik. Setelah 3 bulan, HbA1c-nya turun menjadi **6,8%**, dan ia melaporkan berhasil menurunkan berat badan sebanyak **4 kg**."
    },
    "references": {
      "en": "• ADA/EASD Consensus Report: Management of Hyperglycemia in Type 2 Diabetes (Diabetes Care 2022)\n• AACE Clinical Practice Guideline: Developing a Diabetes Mellitus Comprehensive Care Plan (Endocr Pract 2023)\n• Davies MJ, et al. Diabetes Care. 2022;45(11):2753-2786\n• Samson SL, et al. Endocr Pract. 2023;29(5):305-340",
      "id": "• Laporan Konsensus ADA/EASD: Manajemen Hiperglycemia pada Diabetes Tipe 2 (Diabetes Care 2022)\n• Pedoman Praktik Klinis AACE: Menyusun Rencana Perawatan Komprehensif Diabetes Melitus (Endocr Pract 2023)\n• Davies MJ, et al. Diabetes Care. 2022;45(11):2753-2786\n• Samson SL, et al. Endocr Pract. 2023;29(5):305-340"
    },
    "id": 5,
    "content": {
      "en": "Type 2 Diabetes Mellitus (T2DM) is a chronic metabolic disorder characterized by **insulin resistance** and progressive pancreatic beta-cell dysfunction, leading to chronic **hyperglycemia**. It is associated with significant microvascular and macrovascular complications.",
      "id": "Diabetes Melitus Tipe 2 (DMT2) adalah gangguan metabolik kronis yang ditandai oleh **resistensi insulin** dan disfungsi progresif sel beta pankreas, yang menyebabkan **hiperglikemia** kronis. Kondisi ini dikaitkan dengan komplikasi mikrovaskular dan makrovaskular yang signifikan."
    }
  },
  {
    "title": {
      "en": "Bronchial Asthma",
      "id": "Asma Bronkial"
    },
    "category": "Pulmonology",
    "isStructured": true,
    "definition": {
      "en": "Bronchial Asthma is a heterogeneous chronic inflammatory disease of the airways, characterized by history of respiratory symptoms such as wheezing, shortness of breath, chest tightness, and cough, along with variable expiratory airflow limitation.",
      "id": "Asma Bronkial adalah penyakit inflamasi kronis heterogen pada saluran napas, ditandai oleh riwayat gejala respirasi seperti mengi, sesak napas, dada terasa terikat, dan batuk, serta hambatan aliran udara ekspirasi yang bervariasi."
    },
    "symptoms": {
      "en": "• Wheezing (high-pitched whistling sound on exhalation)\n• **Dyspnea** (shortness of breath)\n• Chest tightness or pressure\n• Cough (often worse at night or early morning)\n• Symptoms triggered by exercise, cold air, allergens, or viral infections",
      "id": "• Mengi (suara bersiul bernada tinggi saat mengembuskan napas)\n• **Dyspnea** (sesak napas)\n• Rasa terikat atau tertekan di dada\n• Batuk (sering kali memburuk pada malam hari atau pagi-pagi sekali)\n• Gejala dipicu oleh aktivitas fisik, udara dingin, alergen, atau infeksi virus"
    },
    "physicalExamination": {
      "en": "• Auscultation: widespread **expiratory wheezing** (may be absent during mild remission)\n• Dry cough during examination\n• Signs of atopy (allergic rhinitis, nasal polyps, or atopic dermatitis)\n• Accessory muscle use during acute exacerbations",
      "id": "• Auskultasi: **mengi ekspirasi** luas (dapat menghilang saat remisi ringan)\n• Batuk kering selama pemeriksaan\n• Tanda atopi (rhinitis alergi, polip hidung, atau dermatitis atopik)\n• Penggunaan otot bantu napas selama eksaserbasi akut"
    },
    "labFindings": {
      "en": "• Spirometry: demonstrating **reversible airway obstruction** (increase in FEV1 by **>12%** and **>200 mL** post-bronchodilator)\n• Diurnal PEF variability **>10%**\n• Elevated blood eosinophils or high serum IgE (allergic phenotype)\n• Sputum eosinophilia",
      "id": "• Spirometri: menunjukkan **obstruksi saluran napas reversibel** (peningkatan FEV1 sebesar **>12%** dan **>200 mL** pasca-bronkodilator)\n• Variabilitas PEF harian **>10%**\n• Peningkatan eosinofil darah atau kadar IgE serum yang tinggi (fenotip alergi)\n• Eosinofilia sputum"
    },
    "differentialDiagnosis": {
      "en": "• COPD\n• Vocal Cord Dysfunction\n• Congestive Heart Failure\n• Foreign Body Aspiration\n• Gastroesophageal Reflux Disease (GERD)",
      "id": "• PPOK\n• Disfungsi Pita Suara\n• Gagal Jantung Kongestif\n• Aspirasi Benda Asing\n• Gastroesophageal Reflux Disease (GERD)"
    },
    "dangerSigns": {
      "en": "• Silent chest (complete absence of wheezing due to minimal airflow)\n• Inability to speak full sentences due to breathlessness\n• Cyanosis or SpO2 **<90%** on room air\n• Bradycardia, confusion, or somnolence",
      "id": "• Silent chest (mengi menghilang sepenuhnya karena aliran udara minimal)\n• Ketidakmampuan berbicara kalimat utuh karena sesak napas\n• Sianosis atau SpO2 **<90%** pada udara ruangan\n• Bradikardia, kebingungan, atau somnolen"
    },
    "management": {
      "initialTreatment": {
        "en": "• Administer short-acting beta-agonists (**SABA, e.g. Salbutamol**) via MDI/nebulizer for quick symptom relief\n• Initiate systemic corticosteroids for moderate-to-severe exacerbations\n• Maintain oxygen saturation **93-95%**",
        "id": "• Berikan beta-agonis kerja singkat (**SABA, misal: Salbutamol**) melalui MDI/nebulisasi untuk pelegaan gejala secara cepat\n• Mulai kortikosteroid sistemik untuk eksaserbasi derajat sedang-berat\n• Pertahankan saturasi oksigen **93-95%**"
      },
      "definitiveTreatment": {
        "en": "• **GINA Track 1 (Preferred)**: Low-dose **ICS-Formoterol** (Budesonide/Formoterol) as needed for reliever in Steps 1-2, and as maintenance and reliever (SMART) in Steps 3-5\n• GINA Track 2: SABA as reliever with daily maintenance **ICS** (Fluticasone or Budesonide)\n• Titrate therapy up or down in a step-wise approach based on symptom control",
        "id": "• **GINA Jalur 1 (Pilihan Utama)**: **ICS-Formoterol** dosis rendah (Budesonid/Formoterol) bila perlu sebagai pelega pada Tahap 1-2, serta sebagai pemeliharaan dan pelega (SMART) pada Tahap 3-5\n• GINA Jalur 2: SABA sebagai pelega dengan **ICS** pemeliharaan harian (Flutikason atau Budesonid)\n• Titrasi terapi naik atau turun dalam pendekatan bertahap berdasarkan kontrol gejala"
      },
      "rehab": {
        "en": "• Breathing control techniques (Buteyko breathing method)\n• Physical conditioning to improve exercise tolerance",
        "id": "• Teknik kontrol pernapasan (metode pernapasan Buteyko)\n• Pengondisian fisik untuk meningkatkan toleransi aktivitas fisik"
      },
      "referral": {
        "en": "• Refer to **Pulmonology** for severe asthma (Step 4-5) uncontrolled despite high-dose ICS-LABA, history of life-threatening exacerbation, or diagnostic uncertainty",
        "id": "• Rujuk ke **Spesialis Paru** untuk asma berat (Tahap 4-5) yang tidak terkontrol meskipun menggunakan ICS-LABA dosis tinggi, riwayat eksaserbasi yang mengancam jiwa, atau keraguan diagnosis"
      },
      "workup": {
        "en": "• Spirometry or Peak Flow monitoring\n• Inhaler technique check at every single visit (highly critical)\n• Assessment of comorbidities (rhinosinusitis, GERD, obesity)",
        "id": "• Spirometri atau pemantauan Peak Flow\n• Pemeriksaan teknik penggunaan inhaler pada setiap kunjungan (sangat kritis)\n• Penilaian komorbiditas (rinosinusitis, GERD, obesitas)"
      }
    },
    "followUp": {
      "en": "• Review **1-3 months** after starting treatment, then every **3-12 months**\n• Within **1 week** following any acute asthma exacerbation",
      "id": "• Tinjau **1-3 bulan** setelah memulai pengobatan, kemudian setiap **3-12 bulan**\n• Dalam **1 minggu** setelah terjadinya eksaserbasi asma akut"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Consistent use of daily **controller inhalers** (ICS/LABA)\n• Annual **influenza vaccine**\n• Pneumococcal vaccination for high-risk patients",
        "id": "• Penggunaan konsisten **inhaler pengontrol** harian (ICS/LABA)\n• Vaksinasi **influenza tahunan**\n• Vaksinasi pneumokokus untuk pasien berisiko tinggi"
      },
      "nonPharmacological": {
        "en": "• Avoidance of known triggers (dust mites, pet dander, tobacco smoke, air pollution)\n• Maintaining indoor humidity levels <50%\n• Wearing a mask or avoiding outdoor exercise in cold air",
        "id": "• Penghindaran pemicu yang diketahui (tungau debu, bulu hewan peliharaan, asap rokok, polusi udara)\n• Menjaga tingkat kelembapan ruangan <50%\n• Mengenakan masker atau menghindari olahraga di luar ruangan dalam udara dingin"
      }
    },
    "caseExample": {
      "en": "A 24-year-old male presents with wheezing and dry cough, worse at night and during early morning workouts. Spirometry demonstrates FEV1/FVC of **68%**, which increases to **82%** (a 14% and 240 mL improvement) after Salbutamol inhalation. The patient is placed on **Budesonide/Formoterol 160/4.5 mcg as-needed** (GINA Track 1, Steps 1-2). His inhaler technique is verified in office. At his 1-month follow-up, he reports complete symptom resolution and no night-time awakenings.",
      "id": "Seorang pria 24 tahun datang dengan mengi dan batuk kering, memburuk pada malam hari dan selama latihan pagi. Spirometri menunjukkan FEV1/FVC **68%**, yang meningkat menjadi **82%** (peningkatan 14% dan 240 mL) setelah inhalasi Salbutamol. Pasien diberikan **Budesonid/Formoterol 160/4.5 mcg bila perlu** (GINA Jalur 1, Tahap 1-2). Teknik penggunaan inhalernya diverifikasi di klinik. Pada kontrol 1 bulan, ia melaporkan resolusi gejala lengkap dan tidak ada terbangun di malam hari."
    },
    "references": {
      "en": "• Global Strategy for Asthma Management and Prevention (GINA 2023)\n• Reddel HK, et al. Global Initiative for Asthma, 2023",
      "id": "• Strategi Global untuk Manajemen dan Pencegahan Asma (GINA 2023)\n• Reddel HK, et al. Global Initiative for Asthma, 2023"
    },
    "id": 6,
    "content": {
      "en": "Bronchial Asthma is a heterogeneous chronic inflammatory disease of the airways, characterized by history of respiratory symptoms such as wheezing, shortness of breath, chest tightness, and cough, along with variable expiratory airflow limitation.",
      "id": "Asma Bronkial adalah penyakit inflamasi kronis heterogen pada saluran napas, ditandai oleh riwayat gejala respirasi seperti mengi, sesak napas, dada terasa terikat, dan batuk, serta hambatan aliran udara ekspirasi yang bervariasi."
    }
  },
  {
    "title": {
      "en": "Chronic Obstructive Pulmonary Disease (COPD)",
      "id": "Penyakit Paru Obstruktif Kronis (PPOK)"
    },
    "category": "Pulmonology",
    "isStructured": true,
    "definition": {
      "en": "Chronic Obstructive Pulmonary Disease (COPD) is a common, preventable, and treatable lung condition characterized by persistent respiratory symptoms and **airflow limitation** due to airway and/or alveolar abnormalities, usually caused by significant exposure to noxious particles or gases (predominantly **tobacco smoke**).",
      "id": "Penyakit Paru Obstruktif Kronis (PPOK) adalah kondisi paru yang umum, dapat dicegah, dan dapat diobati yang ditandai oleh gejala pernapasan persisten dan **keterbatasan aliran udara** akibat kelainan saluran napas dan/atau alveolus, biasanya disebabkan oleh paparan signifikan terhadap partikel atau gas berbahaya (terutama **asap rokok**)."
    },
    "symptoms": {
      "en": "• **Chronic and progressive dyspnea** (the most characteristic symptom)\n• Chronic cough (often productive with sputum)\n• Chronic sputum production\n• Wheezing and chest tightness\n• Fatigue, weight loss, and muscle wasting in advanced stages",
      "id": "• **Sesak napas kronis dan progresif** (gejala yang paling khas)\n• Batuk kronis (sering kali produktif dengan dahak)\n• Produksi dahak kronis\n• Mengi dan dada terasa sesak\n• Kelelahan, penurunan berat badan, dan penyusutan otot pada stadium lanjut"
    },
    "physicalExamination": {
      "en": "• Tachypnea and prolonged expiration phase\n• Accessory muscle use and pursed-lip breathing\n• **Barrel chest** (increased anteroposterior chest diameter)\n• Auscultation: decreased breath sounds, wheezing, and coarse crackles\n• Cyanosis or peripheral edema (signs of **cor pulmonale** / right-sided heart failure)",
      "id": "• Takipnea dan fase ekspirasi yang memanjang\n• Penggunaan otot bantu napas dan pernapasan pursed-lip\n• **Barrel chest** (peningkatan diameter dada anteroposterior)\n• Auskultasi: suara napas menurun, mengi, dan ronkhi basah kasar\n• Sianosis atau edema perifer (tanda-tanda **kor pulmonale** / gagal jantung kanan)"
    },
    "labFindings": {
      "en": "• Spirometry (Gold Standard): post-bronchodilator **FEV1/FVC < 0.70** confirming persistent airflow limitation\n• Elevated blood eosinophils (used to predict **ICS** response; high if **>=300 cells/uL**)\n• Hypoxemia or hypercapnia on arterial blood gas (ABG) in severe cases\n• Polycythemia (elevated hematocrit due to chronic hypoxia)",
      "id": "• Spirometri (Gold Standard): **FEV1/FVC < 0,70** pasca-bronkodilator mengonfirmasi keterbatasan aliran udara persisten\n• Peningkatan eosinofil darah (digunakan meramalkan respons **ICS**; tinggi jika **>=300 sel/uL**)\n• Hipoksemia atau hiperkapnia pada analisis gas darah (AGD) pada kasus berat\n• Polisitemia (peningkatan hematokrit akibat hipoksia kronis)"
    },
    "differentialDiagnosis": {
      "en": "• Bronchial Asthma\n• Congestive Heart Failure\n• Bronchiectasis\n• Pulmonary Tuberculosis\n• Obliterative Bronchiolitis",
      "id": "• Asma Bronkial\n• Gagal Jantung Kongestif\n• Bronkiektasis\n• Tuberkulosis Paru\n• Bronkiolitis Obliteratif"
    },
    "dangerSigns": {
      "en": "• Severe dyspnea at rest, chest pain, or cyanosis\n• Altered mental status, confusion, or somnolence (suggestive of **CO₂ narcosis**)\n• Accessory muscle fatigue or paradoxical chest wall movements\n• SpO2 **<88%** or acute worsening of peripheral edema",
      "id": "• Sesak napas berat saat istirahat, nyeri dada, atau sianosis\n• Penurunan kesadaran, kebingungan, atau somnolen (menunjukkan **narkosis CO₂**)\n• Kelelahan otot bantu napas atau gerakan dinding dada paradoks\n• SpO2 **<88%** atau pemburukan akut edema perifer"
    },
    "management": {
      "initialTreatment": {
        "en": "• Optimize supplemental oxygen therapy (target **88-92%** to avoid hypercapnic respiratory failure)\n• Administer short-acting bronchodilators (**SABA plus SAMA**; Salbutamol + Ipratropium)\n• Initiate oral corticosteroids (**Prednisolone 40 mg daily** for **5 days**) for acute exacerbations",
        "id": "• Optimalkan terapi oksigen tambahan (target **88-92%** untuk menghindari gagal napas hiperkapnia)\n• Berikan bronkodilator kerja singkat (**SABA ditambah SAMA**; Salbutamol + Ipratropium)\n• Mulai kortikosteroid oral (**Prednisolon 40 mg sehari** selama **5 hari**) untuk eksaserbasi akut"
      },
      "definitiveTreatment": {
        "en": "• Classify patients into **GOLD A, B, or E** groups\n• Group A: A bronchodilator (SABA or LABA)\n• Group B: **LABA plus LAMA** (e.g. Indacaterol/Glycopyrronium)\n• Group E (>=2 moderate exacerbations or >=1 leading to hospitalization): **LABA + LAMA**; add **ICS** (Fluticasone) if blood eosinophils **>=300 cells/uL**\n• Long-term oxygen therapy (LTOT) for stable patients with severe resting hypoxemia (PaO2 <=55 mmHg)",
        "id": "• Klasifikasikan pasien ke dalam grup **GOLD A, B, atau E**\n• Grup A: Bronkodilator (SABA atau LABA)\n• Grup B: **LABA ditambah LAMA** (misal: Indakaterol/Glikopironium)\n• Grup E (>=2 eksaserbasi sedang atau >=1 yang memicu rawat inap): **LABA + LAMA**; tambahkan **ICS** (Flutikason) jika eosinofil darah **>=300 sel/uL**\n• Terapi oksigen jangka panjang (LTOT) untuk pasien stabil dengan hipoksemia istirahat berat (PaO2 <=55 mmHg)"
      },
      "rehab": {
        "en": "• **Pulmonary rehabilitation** (highly recommended for GOLD B and E) to improve exercise capacity and quality of life\n• Controlled breathing exercises (diaphragmatic breathing)",
        "id": "• **Rehabilitasi paru** (sangat direkomendasikan untuk GOLD B dan E) untuk meningkatkan kapasitas olahraga dan kualitas hidup\n• Latihan pernapasan terkontrol (pernapasan diafragma)"
      },
      "referral": {
        "en": "• Refer to **Pulmonology** for diagnostic uncertainty, early-onset COPD (<40 years), frequent exacerbations (>=3/year), severe/very severe airflow limitation (FEV1 <50% predicted), or evaluation for lung volume reduction surgery",
        "id": "• Rujuk ke **Spesialis Paru** jika ada keraguan diagnosis, onset PPOK usia muda (<40 tahun), eksaserbasi sering (>=3/tahun), keterbatasan aliran udara berat/sangat berat (FEV1 <50% prediksi), atau evaluasi bedah reduksi volume paru"
      },
      "workup": {
        "en": "• Spirometry with bronchodilator test\n• Chest X-ray or high-resolution chest CT (HRCT) to assess emphysema\n• Screening for **Alpha-1 antitrypsin deficiency** in younger patients",
        "id": "• Spirometri dengan uji bronkodilator\n• Rontgen dada atau CT scan dada resolusi tinggi (HRCT) untuk menilai emfisema\n• Skrining untuk **defisiensi antitripsin Alpha-1** pada pasien muda"
      }
    },
    "followUp": {
      "en": "• Regular follow-up every **3-6 months** to monitor symptom control, exacerbation frequency, inhaler technique, and spirometric decline",
      "id": "• Kontrol rutin setiap **3-6 bulan** untuk memantau kontrol gejala, frekuensi eksaserbasi, teknik penggunaan inhaler, dan penurunan fungsi spirometri"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Adherence to **LABA/LAMA/ICS** maintenance regimens\n• Mandatory annual **influenza vaccine**\n• **Pneumococcal vaccines** (PCV20 or PCV15/PPSV23)\n• COVID-19 and pertussis (Tdap) vaccinations",
        "id": "• Kepatuhan terhadap rejimen pemeliharaan **LABA/LAMA/ICS**\n• Wajib vaksinasi **influenza tahunan**\n• **Vaksinasi pneumokokus** (PCV20 atau PCV15/PPSV23)\n• Vaksinasi COVID-19 dan pertusis (Tdap)"
      },
      "nonPharmacological": {
        "en": "• Complete **smoking cessation** (the single most effective intervention to slow GFR/lung decline)\n• Avoidance of occupational or environmental air pollution",
        "id": "• Berhenti **merokok secara total** (satu-satunya intervensi paling efektif untuk memperlambat penurunan fungsi paru)\n• Penghindaran polusi udara akibat kerja atau lingkungan sekitar"
      }
    },
    "caseExample": {
      "en": "A 66-year-old male former smoker presents with worsening shortness of breath during daily walks and a chronic productive morning cough. Spirometry demonstrates a post-bronchodilator **FEV1/FVC of 54%** and FEV1 of **46%** predicted (GOLD Stage 3, Severe). He reports having 2 moderate exacerbations requiring oral steroids in the past year. Blood eosinophils are **320 cells/uL**. The patient is classified as **GOLD Group E** and started on triple therapy: **Budesonide/Glycopyrronium/Formoterol (ICS/LAMA/LABA)**. He is enrolled in pulmonary rehabilitation and reports significant improvement in exercise tolerance after 8 weeks.",
      "id": "Seorang pria 66 tahun mantan perokok datang dengan sesak napas yang memburuk saat jalan kaki harian dan batuk pagi produktif kronis. Spirometri menunjukkan **FEV1/FVC 54%** pasca-bronkodilator dan FEV1 **46%** nilai prediksi (GOLD Stadium 3, Berat). Ia melaporkan mengalami 2 kali eksaserbasi sedang yang membutuhkan steroid oral dalam setahun terakhir. Eosinofil darahnya **320 sel/uL**. Pasien diklasifikasikan sebagai **GOLD Grup E** dan dimulai terapi kombinasi tiga: **Budesonid/Glikopironium/Formoterol (ICS/LAMA/LABA)**. Ia didaftarkan untuk rehabilitasi paru dan melaporkan perbaikan signifikan pada toleransi latihan fisik setelah 8 minggu."
    },
    "references": {
      "en": "• Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease (GOLD 2024)\n• Agusti A, et al. Global Initiative for Chronic Obstructive Lung Disease, 2024",
      "id": "• Strategi Global untuk Diagnosis, Tata Laksana, dan Pencegahan Penyakit Paru Obstruktif Kronis (GOLD 2024)\n• Agusti A, et al. Global Initiative for Chronic Obstructive Lung Disease, 2024"
    },
    "id": 7,
    "content": {
      "en": "Chronic Obstructive Pulmonary Disease (COPD) is a common, preventable, and treatable lung condition characterized by persistent respiratory symptoms and **airflow limitation** due to airway and/or alveolar abnormalities, usually caused by significant exposure to noxious particles or gases (predominantly **tobacco smoke**).",
      "id": "Penyakit Paru Obstruktif Kronis (PPOK) adalah kondisi paru yang umum, dapat dicegah, dan dapat diobati yang ditandai oleh gejala pernapasan persisten dan **keterbatasan aliran udara** akibat kelainan saluran napas dan/atau alveolus, biasanya disebabkan oleh paparan signifikan terhadap partikel atau gas berbahaya (terutama **asap rokok**)."
    }
  },
  {
    "title": {
      "en": "Essential Hypertension",
      "id": "Hipertensi Esensial"
    },
    "category": "Cardiology",
    "isStructured": true,
    "definition": {
      "en": "Essential Hypertension is defined as persistent elevation of systemic arterial blood pressure **(systolic >=140 mmHg and/or diastolic >=90 mmHg)**, occurring without an identifiable secondary medical cause, resulting in progressive cardiovascular and renal target-organ damage.",
      "id": "Hipertensi Esensial didefinisikan sebagai peningkatan persisten tekanan darah arteri sistemik **(sistolik >=140 mmHg dan/atau diastolik >=90 mmHg)**, terjadi tanpa adanya penyebab medis sekunder yang teridentifikasi, yang mengakibatkan kerusakan organ sasaran kardiovaskular dan ginjal secara progresif."
    },
    "symptoms": {
      "en": "• Sering kali tanpa gejala ('The Silent Killer')\n• Occasional occipital headache (worse in the morning)\n• Dizziness, lightheadedness, or tinnitus\n• Dyspnea or chest discomfort (suggesting early cardiac involvement)",
      "id": "• Sering kali tanpa gejala ('Pembunuh Senyap')\n• Kadang sakit kepala oksipital (memburuk di pagi hari)\n• Pusing, kliyengan, atau tinnitus (telinga berdenging)\n• Sesak napas atau rasa tidak nyaman di dada (menunjukkan keterlibatan jantung awal)"
    },
    "physicalExamination": {
      "en": "• Accurately measured blood pressure **>=140/90 mmHg** on **>=2 separate occasions**\n• High body mass index (BMI) or abdominal obesity\n• S4 heart sound or displaced apex beat (left ventricular hypertrophy)\n• Diminished or delayed femoral pulses (to screen for coarctation)\n• Hypertensive retinopathy on fundoscopy",
      "id": "• Tekanan darah terukur akurat **>=140/90 mmHg** pada **>=2 kesempatan terpisah**\n• Indeks massa tubuh (IMT) tinggi atau obesitas abdominal\n• Suara jantung S4 atau iktus kordis bergeser (hipertrofi ventrikel kiri)\n• Denyut nadi femoralis melemah atau terlambat (skrining koarktasi)\n• Retinopati hipertensif pada pemeriksaan funduskopi"
    },
    "labFindings": {
      "en": "• Elevated fasting plasma glucose and lipid panel (risk stratification)\n• Normal or elevated serum creatinine (assess renal function)\n• **Microalbuminuria** (UACR 30-300 mg/g) indicating early target organ damage\n• Hypokalemia (if secondary aldosteronism is present)",
      "id": "• Peningkatan glukosa plasma puasa dan profil lipid (stratifikasi risiko)\n• Kreatinin serum normal atau meningkat (menilai fungsi ginjal)\n• **Mikroalbuminuria** (UACR 30-300 mg/g) menunjukkan kerusakan organ sasaran dini\n• Hipokalemia (jika terdapat aldosteronisme sekunder)"
    },
    "differentialDiagnosis": {
      "en": "• Secondary Hypertension: Renovascular disease, Primary Aldosteronism, Pheochromocytoma, Obstructive Sleep Apnea, Cushing's syndrome",
      "id": "• Hipertensi Sekunder: Penyakit renovaskular, Aldosteronisme Primer, Feokromositoma, Obstructive Sleep Apnea, sindrom Cushing"
    },
    "dangerSigns": {
      "en": "• **Hypertensive Emergency**: blood pressure **>180/120 mmHg** with acute target organ damage\n• Acute chest pain (angina, MI, or aortic dissection)\n• Dyspnea, crackles, and orthopnea (acute pulmonary edema)\n• Severe headache, confusion, seizures, or focal neurological deficits (encephalopathy or stroke)\n• Papilledema on fundoscopy",
      "id": "• **Kedaruratan Hipertensi**: tekanan darah **>180/120 mmHg** dengan kerusakan organ sasaran akut\n• Nyeri dada akut (angina, MI, atau diseksi aorta)\n• Sesak napas, ronkhi, dan ortopnea (edema paru akut)\n• Sakit kepala hebat, kebingungan, kejang, atau defisit neurologis fokal (ensefalopati atau stroke)\n• Papiledema pada pemeriksaan funduskopi"
    },
    "management": {
      "initialTreatment": {
        "en": "• For Hypertensive Emergencies: Lower MAP by **no more than 20-25%** within the first hour using IV titratable agents (**Nicardipine** or **Labetalol IV**)\n• For stable Stage 1: Implement lifestyle modifications immediately; initiate drug therapy if high cardiovascular risk exists",
        "id": "• Untuk Kedaruratan Hipertensi: Turunkan MAP **tidak lebih dari 20-25%** dalam jam pertama menggunakan agen IV tertitrasi (**Nikardipin** atau **Labetalol IV**)\n• Untuk Stadium 1 stabil: Terapkan modifikasi gaya hidup segera; mulai terapi obat jika terdapat risiko kardiovaskular tinggi"
      },
      "definitiveTreatment": {
        "en": "• Target Blood Pressure: **<130/80 mmHg** in most patients if tolerated\n• First-line monotherapy or dual combination (Preferred): **ACEi (Lisinopril) or ARB (Valsartan)** combined with a **Calcium Channel Blocker (Amlodipine)** OR a **Thiazide diuretic**\n• Triple combination: ACEi/ARB + CCB + Diuretic for uncontrolled blood pressure\n• Add **Spironolactone (25-50 mg daily)** for resistant hypertension (failing triple therapy)",
        "id": "• Target Tekanan Darah: **<130/80 mmHg** pada sebagian besar pasien jika ditoleransi\n• Monoterapi lini pertama atau kombinasi ganda (Pilihan Utama): **ACEi (Lisinopril) atau ARB (Valsartan)** dikombinasikan dengan **Calcium Channel Blocker (Amlodipin)** ATAU **diuretik Tiazid**\n• Kombinasi tiga: ACEi/ARB + CCB + Diuretik untuk tekanan darah yang tidak terkontrol\n• Tambahkan **Spironolakton (25-50 mg sehari)** untuk hipertensi resistan (gagal terapi kombinasi tiga)"
      },
      "rehab": {
        "en": "• Participation in regular aerobic physical activities\n• Stress reduction techniques (mindfulness, meditation)",
        "id": "• Partisipasi dalam aktivitas fisik aerobik secara teratur\n• Teknik reduksi stres (mindfulness, meditasi)"
      },
      "referral": {
        "en": "• Refer to **Cardiology / Nephrology** if secondary hypertension is suspected, for resistant hypertension, or for young-onset hypertension (<30 years)",
        "id": "• Rujuk ke **Spesialis Jantung / Ginjal-Hipertensi** jika dicurigai hipertensi sekunder, untuk hipertensi resistan, atau onset hipertensi usia muda (<30 tahun)"
      },
      "workup": {
        "en": "• Baseline 12-lead ECG (screen for left ventricular hypertrophy or ischemia)\n• Renal panel, electrolytes, fasting lipids, HbA1c, and UACR screening",
        "id": "• EKG 12-sadapan awal (skrining hipertrofi ventrikel kiri atau iskemia)\n• Panel ginjal, elektrolit, lipid puasa, HbA1c, dan skrining UACR"
      }
    },
    "followUp": {
      "en": "• Review in **1 month** after starting or adjusting medication, then every **3-6 months** once blood pressure is stable",
      "id": "• Tinjau dalam **1 bulan** setelah memulai atau menyesuaikan obat, kemudian setiap **3-6 bulan** setelah tekanan darah stabil"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Prophylactic drug therapy is not recommended for prehypertension; focus solely on lifestyle modification",
        "id": "• Terapi obat profilaksis tidak direkomendasikan untuk prehipertensi; fokus sepenuhnya pada modifikasi gaya hidup"
      },
      "nonPharmacological": {
        "en": "• Strict **Sodium restriction <2,000 mg/day** (equivalent to <5 g salt/day)\n• DASH diet rich in vegetables, fruits, and whole grains\n• Limit alcohol intake and achieve **smoking cessation**\n• Regular dynamic aerobic exercise (**150 mins/week**)",
        "id": "• Batasi **asupan Natrium <2.000 mg/hari** (setara <5 g garam/hari)\n• Diet DASH kaya sayuran, buah-buahan, dan biji-bijian utuh\n• Batasi asupan alkohol dan lakukan **berhenti merokok**\n• Olahraga aerobik dinamis teratur (**150 menit/minggu**)"
      }
    },
    "caseExample": {
      "en": "A 49-year-old male presents for a routine check-up. His blood pressure is **152/94 mmHg**, and it remains elevated at **148/96 mmHg** on a repeat check 2 weeks later. He is moderately overweight and reports a diet high in processed foods. Workup shows normal electrolytes, creatinine, and ECG. UACR is slightly elevated at **45 mg/g**. The patient is started on a single pill combination of **Valsartan 80 mg and Amlodipine 5 mg daily**, and is counseled on salt restriction. At his 1-month follow-up, his blood pressure is well-controlled at **126/78 mmHg**.",
      "id": "Seorang pria 49 tahun datang untuk pemeriksaan rutin. Tekanan darahnya **152/94 mmHg**, dan tetap tinggi pada **148/96 mmHg** pada pemeriksaan ulang 2 minggu kemudian. Ia kelebihan berat badan tingkat sedang dan melaporkan diet tinggi makanan olahan. Pemeriksaan menunjukkan elektrolit, kreatinin, dan EKG normal. UACR sedikit meningkat pada **45 mg/g**. Pasien mulai diberikan kombinasi satu tablet **Valsartan 80 mg dan Amlodipin 5 mg sehari**, serta diedukasi tentang pembatasan garam. Pada kontrol 1 bulan, tekanan darahnya terkontrol dengan baik pada **126/78 mmHg**."
    },
    "references": {
      "en": "• 2024 ESC Guidelines for the Management of Elevated Blood Pressure and Hypertension (European Heart Journal 2024)\n• McEvoy JW, et al. Eur Heart J. 2024;45(36):3347-3453",
      "id": "• Pedoman ESC 2024 untuk Manajemen Tekanan Darah Tinggi dan Hipertensi (European Heart Journal 2024)\n• McEvoy JW, et al. Eur Heart J. 2024;45(36):3347-3453"
    },
    "id": 8,
    "content": {
      "en": "Essential Hypertension is defined as persistent elevation of systemic arterial blood pressure **(systolic >=140 mmHg and/or diastolic >=90 mmHg)**, occurring without an identifiable secondary medical cause, resulting in progressive cardiovascular and renal target-organ damage.",
      "id": "Hipertensi Esensial didefinisikan sebagai peningkatan persisten tekanan darah arteri sistemik **(sistolik >=140 mmHg dan/atau diastolik >=90 mmHg)**, terjadi tanpa adanya penyebab medis sekunder yang teridentifikasi, yang mengakibatkan kerusakan organ sasaran kardiovaskular dan ginjal secara progresif."
    }
  },
  {
    "title": {
      "en": "Gestational Hypertension & Preeclampsia",
      "id": "Hipertensi Gestasional & Preeklamsia"
    },
    "category": "Obstetrics",
    "isStructured": true,
    "definition": {
      "en": "Gestational Hypertension is new-onset blood pressure **>=140/90 mmHg** after **20 weeks of gestation** in a previously normotensive patient, without proteinuria. Preeclampsia is defined as gestational hypertension accompanied by **proteinuria** or new-onset systemic end-organ dysfunction (renal, hepatic, hematologic, or neurological).",
      "id": "Hipertensi Gestasional adalah tekanan darah tinggi onset baru **>=140/90 mmHg** setelah **kehamilan 20 minggu** pada pasien yang sebelumnya normotensif, tanpa proteinuria. Preeklamsia didefinisikan sebagai hipertensi gestasional disertai dengan **proteinuria** atau disfungsi organ sasaran sistemik onset baru (ginjal, hati, hematologi, atau saraf)."
    },
    "symptoms": {
      "en": "• Often asymptomatic initially\n• **Severe, persistent headache** (refractory to acetaminophen)\n• **Visual disturbances** (scotomas, blurry vision, double vision)\n• Epigastric or right upper quadrant pain (hepatic swelling)\n• Rapidly worsening peripheral edema or sudden facial/hand swelling\n• Dyspnea due to pulmonary edema",
      "id": "• Sering kali tanpa gejala pada awalnya\n• **Sakit kepala hebat dan menetap** (refrakter terhadap asetaminofen)\n• **Gangguan penglihatan** (skotoma, pandangan kabur, pandangan ganda)\n• Nyeri epigastrium atau kuadran kanan atas perut (pembengkakan hati)\n• Edema perifer yang memburuk dengan cepat atau bengkak mendadak pada wajah/tangan\n• Sesak napas akibat edema paru"
    },
    "physicalExamination": {
      "en": "• Blood pressure **>=140/90 mmHg** (severe range if **>=160/110 mmHg**)\n• Hyperreflexia or **clonus** (neurological excitability)\n• Right upper quadrant tenderness on palpation\n• Generalized edema (facial/hand/sacral pitting edema)",
      "id": "• Tekanan darah **>=140/90 mmHg** (derajat berat jika **>=160/110 mmHg**)\n• Hiperrefleksia atau **klonus** (eksitabilitas sistem saraf)\n• Nyeri tekan kuadran kanan atas perut pada palpasi\n• Edema umum (edema pitting pada wajah/tangan/sakral)"
    },
    "labFindings": {
      "en": "• Proteinuria: **>=300 mg** in a 24-hour urine collection, or protein-to-creatinine ratio **>=0.3**, or urine dipstick **>=2+**\n• Thrombocytopenia (platelets **<100,000/uL**)\n• Elevated serum creatinine **>1.1 mg/dL**\n• Elevated transaminases (AST/ALT) to twice normal values\n• Hemolysis (schistocytes on smear, elevated LDH, low haptoglobin in **HELLP syndrome**)",
      "id": "• Proteinuria: **>=300 mg** pada penampungan urin 24 jam, atau rasio protein-kreatinin **>=0,3**, atau dipstick urin **>=2+**\n• Trombositopenia (trombosit **<100.000/uL**)\n• Kreatinin serum meningkat **>1,1 mg/dL**\n• Transaminase (AST/ALT) meningkat hingga dua kali nilai normal\n• Hemolisis (skistosit pada sediaan apus, peningkatan LDH, haptoglobin rendah pada **sindrom HELLP**)"
    },
    "differentialDiagnosis": {
      "en": "• Chronic Essential Hypertension\n• Gestational Trophoblastic Disease\n• Acute Fatty Liver of Pregnancy\n• Thrombotic Thrombocytopenic Purpura (TTP) / HUS",
      "id": "• Hipertensi Esensial Kronis\n• Penyakit Trofoblas Gestasional\n• Perlemakan Hati Akut pada Kehamilan\n• Purpura Trombositopenik Trombotik (TTP) / HUS"
    },
    "dangerSigns": {
      "en": "• Blood pressure **>=160/110 mmHg** (severe preeclampsia)\n• **Eclampsia**: generalized tonic-clonic seizures in a preeclamptic patient\n• Severe persistent RUQ pain, thrombocytopenia, or active bleeding\n• Pulmonary edema (rales, hypoxia, severe dyspnea)\n• Altered mental status or cortical blindness",
      "id": "• Tekanan darah **>=160/110 mmHg** (preeklamsia berat)\n• **Eklamsia**: kejang tonik-klonik umum pada pasien preeklamsia\n• Nyeri hebat menetap kuadran kanan atas perut, trombositopenia, atau perdarahan aktif\n• Edema paru (ronkhi, hipoksia, sesak napas berat)\n• Penurunan kesadaran atau kebutaan kortikal"
    },
    "management": {
      "initialTreatment": {
        "en": "• Supplement oxygen for hypoxemia or seizure activity\n• For severe range BP: Administer fast-acting antihypertensives: **IV Labetalol 20 mg** (repeat 40-80 mg) or **Hydralazine 5-10 mg IV**, or **oral Nifedipine 10-20 mg**\n• For seizure prevention in severe preeclampsia/eclampsia: Administer **Magnesium Sulfate 4-6 g IV bolus** over 20 mins, followed by **1-2 g/hour continuous infusion**",
        "id": "• Berikan tambahan oksigen untuk hipoksia atau aktivitas kejang\n• Untuk TD derajat berat: Berikan antihipertensi kerja cepat: **IV Labetalol 20 mg** (ulangi 40-80 mg) atau **Hidralasin 5-10 mg IV**, atau **Nifedipin oral 10-20 mg**\n• Pencegahan kejang pada preeklamsia berat/eklamsia: Berikan **Magnesium Sulfat bolus IV 4-6 g** selama 20 menit, diikuti **infus kontinu 1-2 g/jam**"
      },
      "definitiveTreatment": {
        "en": "• **Delivery is the only definitive cure**\n• Gestational Hypertension or Preeclampsia without severe features: Plan delivery at **37 weeks 0 days** gestation\n• Preeclampsia with severe features: Deliver at **34 weeks 0 days** gestation, or immediately if maternal or fetal deterioration occurs\n• Antihypertensive therapy for chronic maintenance: **Methyldopa (250-500 mg tid)** or oral **Nifedipine ER (30-60 mg daily)**",
        "id": "• **Persalinan adalah satu-satunya penyembuhan definitif**\n• Hipertensi Gestasional atau Preeklamsia tanpa gejala berat: Rencanakan persalinan pada kehamilan **37 minggu 0 hari**\n• Preeklamsia dengan gejala berat: Lahirkan pada kehamilan **34 minggu 0 hari**, atau segera melahirkan jika terjadi perburukan kondisi ibu atau janin\n• Terapi antihipertensi pemeliharaan kronis: **Metildopa (250-500 mg 3x sehari)** atau oral **Nifedipin ER (30-60 mg sehari)**"
      },
      "rehab": {
        "en": "• Adequate bed rest in lateral decubitus position to improve placental perfusion\n• Close monitoring post-partum (eclampsia can occur up to 4-6 weeks post-delivery)",
        "id": "• Istirahat baring (bed rest) yang cukup dalam posisi lateral dekubitus untuk meningkatkan perfusi plasenta\n• Pemantauan ketat pasca-persalinan (eklamsia dapat terjadi hingga 4-6 minggu pasca-salin)"
      },
      "referral": {
        "en": "• Refer immediately to **Maternal-Fetal Medicine (High-Risk Obstetrics)** or admit to a tertiary care facility with neonatal intensive care (NICU) capabilities for preeclampsia with severe features",
        "id": "• Segera rujuk ke **Spesialis Kedokteran Fetomaternal (Obstetri Risiko Tinggi)** atau rawat di fasilitas perawatan tersier dengan fasilitas NICU untuk preeklamsia dengan gejala berat"
      },
      "workup": {
        "en": "• Urinalysis, 24-hour urine protein or protein-creatinine ratio\n• CBC (platelets), AST/ALT, serum creatinine, LDH, coagulation studies\n• Fetal assessment: Non-Stress Test (NST), biophysical profile, and umbilical artery Doppler ultrasound",
        "id": "• Urinalisis, protein urin 24 jam atau rasio protein-kreatinin\n• Darah Lengkap (trombosit), AST/ALT, kreatinin serum, LDH, studi koagulasi\n• Pemantauan janin: Non-Stress Test (NST), profil biofisik, dan USG Doppler arteri umbilikalis"
      }
    },
    "followUp": {
      "en": "• Monitor BP twice weekly post-discharge; check within **3-7 days** post-partum\n• Re-evaluate renal function and proteinuria at **6-12 weeks** post-partum",
      "id": "• Pantau TD dua kali seminggu setelah pulang; periksa dalam **3-7 hari** pasca-salin\n• Evaluasi ulang fungsi ginjal dan proteinuria pada **6-12 minggu** pasca-salin"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **Low-dose Aspirin (81-150 mg daily)** starting between **12-16 weeks** of gestation until delivery for patients at high risk of preeclampsia",
        "id": "• **Aspirin dosis rendah (81-150 mg sehari)** dimulai antara **12-16 minggu** kehamilan hingga persalinan untuk pasien dengan risiko tinggi preeklamsia"
      },
      "nonPharmacological": {
        "en": "• Ensure adequate calcium intake (especially in calcium-deficient populations)\n• Avoid excessive weight gain during pregnancy",
        "id": "• Pastikan asupan kalsium yang adekuat (terutama pada populasi defisiensi kalsium)\n• Hindari kenaikan berat badan berlebih selama kehamilan"
      }
    },
    "caseExample": {
      "en": "A 29-year-old G1P0 female at **32 weeks** gestation presents with a 2-day history of a persistent dull headache and mild blurry vision. Her blood pressure is **164/114 mmHg**. Reflexes are **3+** with 2 beats of ankle clonus. Lab results show platelets of **112,000/uL**, creatinine **1.2 mg/dL**, and a urine dipstick showing **3+ protein**. The diagnosis is **Preeclampsia with severe features**. She is started on a **Magnesium Sulfate IV infusion (4 g bolus, then 2 g/h)** for seizure prophylaxis, and receives **IV Labetalol 20 mg** which lowers her BP to 142/90. She is given **Betamethasone 12 mg IM** for fetal lung maturity and is transferred to a tertiary facility for delivery planning.",
      "id": "Seorang wanita G1P0 berusia 29 tahun pada usia kehamilan **32 minggu** datang dengan riwayat sakit kepala tumpul menetap selama 2 hari dan pandangan sedikit kabur. Tekanan darahnya **164/114 mmHg**. Refleksnya **3+** dengan klonus pergelangan kaki 2 ketukan. Hasil lab menunjukkan trombosit **112.000/uL**, kreatinin **1,2 mg/dL**, dan dipstick urin menunjukkan **protein 3+**. Diagnosisnya adalah **Preeklamsia dengan gejala berat**. Ia mulai diberikan **infus IV Magnesium Sulfat (bolus 4 g, kemudian 2 g/jam)** untuk profilaksis kejang, dan menerima **IV Labetalol 20 mg** yang menurunkan TD-nya menjadi 142/90. Ia diberikan **Betametason 12 mg IM** untuk pematangan paru janin dan ditransfer ke fasilitas tersier untuk rencana melahirkan."
    },
    "references": {
      "en": "• Gestational Hypertension and Preeclampsia: ACOG Practice Bulletin, Number 222 (Obstetrics & Gynecology 2020)\n• American College of Obstetricians and Gynecologists. Obstet Gynecol. 2020;135(6):e237-e260",
      "id": "• Hipertensi Gestasional dan Preeklamsia: Buletin Praktik ACOG, Nomor 222 (Obstetrics & Gynecology 2020)\n• American College of Obstetricians and Gynecologists. Obstet Gynecol. 2020;135(6):e237-e260"
    },
    "id": 9,
    "content": {
      "en": "Gestational Hypertension is new-onset blood pressure **>=140/90 mmHg** after **20 weeks of gestation** in a previously normotensive patient, without proteinuria. Preeclampsia is defined as gestational hypertension accompanied by **proteinuria** or new-onset systemic end-organ dysfunction (renal, hepatic, hematologic, or neurological).",
      "id": "Hipertensi Gestasional adalah tekanan darah tinggi onset baru **>=140/90 mmHg** setelah **kehamilan 20 minggu** pada pasien yang sebelumnya normotensif, tanpa proteinuria. Preeklamsia didefinisikan sebagai hipertensi gestasional disertai dengan **proteinuria** atau disfungsi organ sasaran sistemik onset baru (ginjal, hati, hematologi, atau saraf)."
    }
  },
  {
    "title": {
      "en": "Difficult Airway Management",
      "id": "Manajemen Jalan Napas Sulit"
    },
    "category": "Anesthesiology",
    "isStructured": true,
    "pdfUrl": "https://pubs.asahq.org/anesthesiology/article/136/1/31/135246/2022-American-Society-of-Anesthesiologists",
    "definition": {
      "en": "A Difficult Airway is defined as a clinical situation in which a conventionally trained anesthesiologist experiences difficulty with facemask ventilation, upper airway obstruction, laryngoscopy, tracheal intubation, or surgical airway placement.",
      "id": "Jalan Napas Sulit (Difficult Airway) didefinisikan sebagai situasi klinis di mana spesialis anestesi yang terlatih secara konvensional mengalami kesulitan dalam ventilasi sungkup wajah, obstruksi jalan napas atas, laringoskopi, intubasi trakea, atau pemasangan jalan napas bedah."
    },
    "symptoms": {
      "en": "• Preoperative or emergency presentation: history of difficult intubation or sleep apnea\n• Snoring, gasping, or daytime somnolence\n• Hoarseness, stridor, or wheezing indicating partial airway compromise\n• Dyspnea or orthopnea",
      "id": "• Presentasi pra-bedah atau darurat: riwayat kesulitan intubasi atau sleep apnea\n• Mendengkur, terengah-engah, atau somnolen siang hari\n• Suara serak, stridor, atau mengi menunjukkan gangguan jalan napas parsial\n• Sesak napas atau ortopnea"
    },
    "physicalExamination": {
      "en": "• **Mallampati Score Class III or IV** (poor visualization of pharyngeal structures)\n• Short thyromental distance **(<6 cm)**\n• Limited neck extension or cervical spine mobility\n• High, arched palate or prominent upper incisors\n• Large neck circumference **(>40 cm)** or micrognathia (receding chin)",
      "id": "• **Skor Mallampati Kelas III atau IV** (visualisasi struktur faring buruk)\n• Jarak tiroid-mental yang pendek **(<6 cm)**\n• Ekstensi leher atau mobilitas tulang belakang servikal terbatas\n• Palatum tinggi melengkung atau insisivus atas menonjol\n• Lingkar leher yang besar **(>40 cm)** atau mikrognatia (dagu mundur)"
    },
    "labFindings": {
      "en": "• Chest or neck radiographs showing tracheal stenosis, masses, or cervical spine osteophytes\n• CT or MRI of the neck demonstrating anatomical airway compression\n• Desaturation on pulse oximetry during assessment",
      "id": "• Rontgen dada atau leher menunjukkan stenosis trakea, massa, atau osteofit servikal\n• CT atau MRI leher menunjukkan kompresi anatomis jalan napas\n• Desaturasi pada oksimetri nadi selama penilaian"
    },
    "differentialDiagnosis": {
      "en": "• Epiglottitis / Peritonsillar abscess\n• Laryngeal Stenosis or web\n• Large Mediastinal or Thyroid Mass\n• Cervical Spine Ankylosis (Ankylosing Spondylitis)",
      "id": "• Epiglotitis / Abses peritonsilar\n• Stenosis atau anyaman laring\n• Massa Mediastinum Besar atau Massa Tiroid\n• Ankilosis Tulang Belakang Servikal (Ankylosing Spondylitis)"
    },
    "dangerSigns": {
      "en": "• **Cannot Ventilate, Cannot Intubate (CVCI)**: life-threatening inability to maintain oxygenation via mask/SAD and failure of tracheal intubation\n• Rapidly dropping oxygen saturation **(SpO2 <80%)**\n• Cyanosis, bradycardia (late sign of severe hypoxia)\n• Severe upper airway trauma or swelling from repeated intubation attempts",
      "id": "• **Cannot Ventilate, Cannot Intubate (CVCI)**: ketidakmampuan mengancam jiwa untuk mempertahankan oksigenasi melalui sungkup/SAD dan kegagalan intubasi trakea\n• Saturasi oksigen turun dengan cepat **(SpO2 <80%)**\n• Sianosis, bradikardia (tanda lanjut hipoksia berat)\n• Trauma jalan napas atas berat atau bengkak akibat upaya intubasi yang berulang"
    },
    "management": {
      "initialTreatment": {
        "en": "• Call for **additional assistance** immediately\n• Pre-oxygenate with **100% O₂** via high-flow nasal cannula or non-rebreather mask\n• Maximize facemask ventilation using **two-handed technique** and oral/nasopharyngeal airways",
        "id": "• Segera panggil **bantuan tambahan**\n• Lakukan pre-oksigenasi dengan **O₂ 100%** melalui kanula hidung aliran tinggi atau sungkup non-rebreather\n• Maksimalkan ventilasi sungkup wajah menggunakan **teknik dua tangan** dan pipa jalan napas oral/nasofaring"
      },
      "definitiveTreatment": {
        "en": "• If difficult intubation is anticipated: Perform **Awake Fiberoptic Intubation** under local anesthesia (lidocaine) as the safest approach\n• Unanticipated difficult intubation: Limit intubation attempts **(maximum 3 attempts)** to avoid airway trauma\n• Insert a **Supraglottic Airway Device (SAD/LMA)** as a rescue device if mask ventilation fails\n• If CVCI scenario occurs: Immediately perform an emergency **Surgical Cricothyroidotomy** (scalpel-bougie technique)",
        "id": "• Jika jalan napas sulit sudah diantisipasi: Lakukan **Intubasi Serat Optik Sadar (Awake Fiberoptic Intubation)** di bawah anestesi lokal (lidokain) sebagai pendekatan teraman\n• Intubasi sulit tidak diantisipasi: Batasi upaya intubasi **(maksimal 3 kali upaya)** untuk menghindari trauma jalan napas\n• Pasang **Alat Jalan Napas Supraglotis (SAD/LMA)** sebagai alat penyelamat jika ventilasi sungkup gagal\n• Jika skenario CVCI terjadi: Segera lakukan **Krikotiroidotomi Bedah** darurat (teknik scalpel-bougie)"
      },
      "rehab": {
        "en": "• Close monitoring in the PACU or ICU for signs of airway edema or hematoma\n• Post-operative counseling and providing the patient with a difficult airway letter/card",
        "id": "• Pemantauan ketat di PACU atau ICU untuk mendeteksi tanda-tanda edema jalan napas atau hematoma\n• Konseling pasca-operasi dan membekali pasien dengan surat/kartu jalan napas sulit"
      },
      "referral": {
        "en": "• Consult a senior anesthesiologist or ENT surgeon preoperatively if a severely distorted airway anatomy is identified",
        "id": "• Konsultasikan dengan spesialis anestesi senior atau dokter spesialis THT sebelum operasi jika teridentifikasi anatomi jalan napas yang sangat menyimpang"
      },
      "workup": {
        "en": "• Clinical assessment of airway features (Mallampati, thyromental distance, neck mobility)\n• Fiberoptic nasendoscopy or virtual CT bronchoscopy if indicated",
        "id": "• Penilaian klinis karakteristik jalan napas (Mallampati, jarak tiroid-mental, mobilitas leher)\n• Nasendoskopi serat optik atau CT bronkoskopi virtual jika diindikasikan"
      }
    },
    "followUp": {
      "en": "• Re-evaluate the patient's airway post-operatively for signs of trauma (dental, laryngeal damage)\n• Ensure the difficult airway event is documented in the national registry if applicable",
      "id": "• Evaluasi kembali jalan napas pasien pasca-operasi untuk mendeteksi tanda trauma (gigi, kerusakan laring)\n• Pastikan kejadian jalan napas sulit didokumentasikan dalam rekam medis secara jelas"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Anti-sialagogues (Glycopyrrolate 0.2 mg IV) to dry secretions before fiberoptic intubation\n• Topical vasoconstrictors (e.g. Oxymetazoline) for nasal fiberoptic pathways",
        "id": "• Anti-sialagoga (Glikopirolat 0,2 mg IV) untuk mengeringkan sekret sebelum intubasi serat optik\n• Vasokonstriktor topikal (misal: Oksimetazolin) untuk jalur serat optik hidung"
      },
      "nonPharmacological": {
        "en": "• Proper patient positioning: **'Sniffing position'** for normal patients, or **ramped position** for obese patients to align oral, pharyngeal, and laryngeal axes\n• Ensure all difficult airway equipment (videolaryngoscope, fiberoptic scope, bougie, LMAs) is checked and immediately available",
        "id": "• Posisi pasien yang tepat: **'Posisi menghirup (sniffing)'** untuk pasien normal, atau **posisi menanjak (ramped)** pada pasien obesitas untuk menyejajarkan sumbu oral, faring, dan laring\n• Pastikan semua peralatan jalan napas sulit (videolaringoskop, teropong serat optik, bougie, LMA) telah diperiksa dan tersedia segera"
      }
    },
    "caseExample": {
      "en": "A 52-year-old morbidly obese male (BMI **44 kg/m²**) presents for elective hernia repair. Airway assessment reveals a **Mallampati Class IV** airway, short neck, and limited extension. A difficult airway is anticipated. The anesthesia team decides on an **Awake Fiberoptic Intubation**. The airway is topicalized with nebulized and atomized 4% Lidocaine. Using a flexible fiberoptic bronchoscope, the vocal cords are visualized, and a size 7.5 endotracheal tube is advanced smoothly over the scope into the trachea. Correct placement is confirmed via capnography, and general anesthesia is then induced safely.",
      "id": "Seorang pria 52 tahun dengan obesitas morbid (IMT **44 kg/m²**) datang untuk operasi elektif perbaikan hernia. Penilaian jalan napas menunjukkan jalan napas **Mallampati Kelas IV**, leher pendek, dan ekstensi terbatas. Jalan napas sulit diantisipasi. Tim anestesi memutuskan untuk melakukan **Intubasi Serat Optik Sadar**. Jalan napas diberikan anestesi topikal dengan nebulisasi Lidokain 4%. Menggunakan bronkoskop serat optik fleksibel, pita suara divisualisasikan, dan pipa endotrakeal ukuran 7,5 didorong secara mulus melalui teropong ke dalam trakea. Penempatan yang benar dikonfirmasi melalui kapnografi, dan anestesi umum kemudian diinduksi dengan aman."
    },
    "references": {
      "en": "• 2022 American Society of Anesthesiologists Practice Guidelines for Management of the Difficult Airway (Anesthesiology 2022)\n• Apfelbaum JL, et al. Anesthesiology. 2022;136(1):31-53",
      "id": "• Pedoman Praktik American Society of Anesthesiologists 2022 untuk Manajemen Jalan Napas Sulit (Anesthesiology 2022)\n• Apfelbaum JL, et al. Anesthesiology. 2022;136(1):31-53"
    },
    "id": 10,
    "content": {
      "en": "A Difficult Airway is defined as a clinical situation in which a conventionally trained anesthesiologist experiences difficulty with facemask ventilation, upper airway obstruction, laryngoscopy, tracheal intubation, or surgical airway placement.",
      "id": "Jalan Napas Sulit (Difficult Airway) didefinisikan sebagai situasi klinis di mana spesialis anestesi yang terlatih secara konvensional mengalami kesulitan dalam ventilasi sungkup wajah, obstruksi jalan napas atas, laringoskopi, intubasi trakea, atau pemasangan jalan napas bedah."
    }
  },
  {
    "title": {
      "en": "Preoperative Fasting (NPO)",
      "id": "Puasa Prabedah (NPO)"
    },
    "category": "Anesthesiology",
    "isStructured": true,
    "definition": {
      "en": "Preoperative Fasting (NPO, Nil Per Os) guidelines define the minimum duration of fasting prior to elective procedures requiring general anesthesia, regional anesthesia, or procedural sedation. Its main purpose is to reduce the volume and acidity of gastric contents, minimizing the risk of **pulmonary aspiration**.",
      "id": "Panduan Puasa Prabedah (NPO, Nil Per Os) menetapkan durasi minimum puasa sebelum prosedur elektif yang memerlukan anestesi umum, anestesi regional, atau sedasi prosedural. Tujuan utamanya adalah untuk mengurangi volume dan keasaman lambung, meminimalkan risiko **aspirasi paru**."
    },
    "symptoms": {
      "en": "• Clinical assessment of fasting status: verify time of last intake\n• Nausea, vomiting, or epigastric discomfort if fasting was inadequate\n• Heartburn or symptoms of gastroesophageal reflux disease (GERD)",
      "id": "• Penilaian klinis status puasa: verifikasi waktu makan/minum terakhir\n• Mual, muntah, atau rasa tidak nyaman di epigastrium jika puasa tidak adekuat\n• Heartburn atau gejala penyakit refluks gastroesofageal (GERD)"
    },
    "physicalExamination": {
      "en": "• Assess for factors delaying gastric emptying: pregnancy, diabetes (gastroparesis), obesity, bowel obstruction, or severe pain/anxiety\n• Gastric ultrasound (point-of-care) to objectively assess gastric volume in borderline/doubtful fasting cases",
      "id": "• Nilai faktor-faktor yang menunda pengosongan lambung: kehamilan, diabetes (gastroparesis), obesitas, obstruksi usus, atau nyeri/kecemasan hebat\n• USG lambung (point-of-care) untuk menilai volume lambung secara objektif pada kasus puasa yang meragukan"
    },
    "labFindings": {
      "en": "• Standard pre-operative labs do not assess fasting status\n• High gastric volume **(>1.5 mL/kg)** or low pH (<2.5) on aspirate if gastric tube is placed",
      "id": "• Laboratorium pra-operasi standar tidak menilai status puasa\n• Volume lambung yang tinggi **(>1,5 mL/kg)** atau pH rendah (<2,5) pada cairan aspirasi jika pipa lambung dipasang"
    },
    "differentialDiagnosis": {
      "en": "• Full stomach due to gastroparesis, bowel obstruction, or emergency trauma status despite adequate NPO hours",
      "id": "• Lambung penuh akibat gastroparesis, obstruksi usus, atau status trauma darurat meskipun jam NPO telah adekuat"
    },
    "dangerSigns": {
      "en": "• **Active vomiting** or silent regurgitation during induction of anesthesia\n• Coughing, bronchospasm, or severe hypoxemia during induction (suggestive of active aspiration)\n• Respiratory failure or severe chemical pneumonitis (**Mendelson's syndrome**)",
      "id": "• **Muntah aktif** atau regurgitasi senyap saat induksi anestesi\n• Batuk, bronkospasme, atau hipoksia berat saat induksi (mencurigakan adanya aspirasi aktif)\n• Gagal napas atau pneumonitis kimia berat (**sindrom Mendelson**)"
    },
    "management": {
      "initialTreatment": {
        "en": "• Verify NPO compliance prior to transferring patient to the operating room\n• If aspiration occurs during induction: Tilt head down/lateral, suction the oropharynx immediately, intubate tracheal, and suction down the endotracheal tube *before* initiating positive pressure ventilation",
        "id": "• Verifikasi kepatuhan NPO sebelum memindahkan pasien ke kamar operasi\n• Jika terjadi aspirasi saat induksi: Miringkan kepala ke bawah/lateral, lakukan penyedotan (suction) orofaring segera, lakukan intubasi trakea, dan sedot cairan dari pipa endotrakeal *sebelum* memulai ventilasi tekanan positif"
      },
      "definitiveTreatment": {
        "en": "• Standard Elective NPO Guidelines (ASA):\n  - **Clear liquids**: Minimum **2 hours** fasting (water, pulp-free juice, clear tea, black coffee)\n  - **Breast milk**: Minimum **4 hours**\n  - **Infant formula**: Minimum **6 hours**\n  - **Light meal** (toast and clear liquid): Minimum **6 hours**\n  - **Heavy meal** (fatty, fried, or meat foods): Minimum **8 hours**\n• For emergency procedures with a full stomach: Perform **Rapid Sequence Induction (RSI)** with **cricoid pressure (Sellick maneuver)** and avoidance of manual bag-mask ventilation",
        "id": "• Panduan NPO Elektif Standar (ASA):\n  - **Cairan jernih**: Minimal **2 jam** puasa (air putih, jus tanpa ampas, teh bening, kopi hitam)\n  - **ASI**: Minimal **4 jam**\n  - **Susu formula**: Minimal **6 jam**\n  - **Makanan ringan** (roti panggang & cairan jernih): Minimal **6 jam**\n  - **Makanan berat** (berlemak, digoreng, atau daging): Minimal **8 jam**\n• Untuk prosedur darurat dengan lambung penuh: Lakukan **Rapid Sequence Induction (RSI)** dengan **tekanan krikoid (maneuver Sellick)** dan hindari ventilasi sungkup manual"
      },
      "rehab": {
        "en": "• Post-operative diet resumption as soon as the patient is fully awake, oriented, and airway reflexes are restored",
        "id": "• Pemulihan diet pasca-operasi segera setelah pasien sadar penuh, orientasi baik, dan refleks jalan napas telah pulih"
      },
      "referral": {
        "en": "• Consult a senior anesthesiologist if there is diagnostic doubt regarding gastric emptying in a high-risk patient",
        "id": "• Konsultasikan dengan spesialis anestesi senior jika ada keraguan mengenai pengosongan lambung pada pasien risiko tinggi"
      },
      "workup": {
        "en": "• Clinical interview regarding exact timing and contents of last meal\n• Point-of-Care Gastric Ultrasound (POCUS) if available to assess gastric fluid/solid state",
        "id": "• Wawancara klinis mengenai waktu tepat dan isi makanan terakhir\n• USG Lambung Point-of-Care (POCUS) jika tersedia untuk menilai cairan/makanan padat lambung"
      }
    },
    "followUp": {
      "en": "• Monitor for 24-48 hours for signs of aspiration pneumonia (fever, hypoxemia, new infiltrates) if a micro-aspiration was suspected",
      "id": "• Pantau selama 24-48 jam terhadap tanda-tanda pneumonia aspirasi (demam, hipoksemia, infiltrat baru) jika dicurigai terjadi mikro-aspirasi"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **Prokinetics** (Metoclopramide 10 mg IV) to accelerate gastric emptying in patients with gastroparesis\n• **H2-blockers** (Ranitidine 50 mg IV) or **PPIs** (Omeprazole 40 mg IV) to reduce gastric acid secretion\n• **Antacids** (non-particulate sodium citrate 30 mL orally) to neutralize existing gastric acid before RSI",
        "id": "• **Prokinetik** (Metoklopramid 10 mg IV) untuk mempercepat pengosongan lambung pada pasien gastroparesis\n• **Penghambat H2** (Ranitidin 50 mg IV) atau **PPI** (Omeprazole 40 mg IV) untuk mengurangi sekresi asam lambung\n• **Antasida** (natrium sitrat non-partikulat 30 mL oral) untuk menetralkan asam lambung sebelum RSI"
      },
      "nonPharmacological": {
        "en": "• Rigid patient and family preoperative education regarding fasting guidelines\n• Scheduling high-risk patients (diabetics, pregnant patients) as the first case of the day to avoid prolonged NPO times",
        "id": "• Edukasi prabedah yang ketat kepada pasien dan keluarga mengenai panduan puasa\n• Menjadwalkan pasien risiko tinggi (diabetes, hamil) sebagai urutan pertama operasi hari itu untuk menghindari waktu NPO yang terlalu lama"
      }
    },
    "caseExample": {
      "en": "A 45-year-old female with poorly controlled Type 2 Diabetes is scheduled for elective cholecystectomy. She complied with the **8-hour fasting** for solids. However, due to diabetic gastroparesis, she reports feeling unusually full. A point-of-care gastric ultrasound reveals significant liquid volume in the gastric antrum. To prevent aspiration, she is given **Metoclopramide 10 mg IV** and **Ranitidine 50 mg IV** 1 hour prior to surgery. Anesthesia is induced safely using a **Rapid Sequence Induction (RSI)** with cricoid pressure, and a cuffed endotracheal tube is placed successfully.",
      "id": "Seorang wanita 45 tahun dengan Diabetes Tipe 2 terkontrol buruk dijadwalkan untuk kolesistektomi elektif. Ia telah mematuhi **puasa 8 jam** untuk makanan padat. Namun, karena gastroparesis diabetik, ia merasa perutnya masih terasa penuh. USG lambung point-of-care menunjukkan volume cairan signifikan di antrum lambung. Untuk mencegah aspirasi, ia diberikan **Metoklopramid 10 mg IV** dan **Ranitidin 50 mg IV** 1 jam sebelum operasi. Anestesi diinduksi dengan aman menggunakan **Rapid Sequence Induction (RSI)** dengan tekanan krikoid, dan pipa endotrakeal dengan cuff berhasil dipasang."
    },
    "references": {
      "en": "• Practice Guidelines for Preoperative Fasting: An Updated Report by the American Society of Anesthesiologists (Anesthesiology 2017)\n• American Society of Anesthesiologists Committee. Anesthesiology. 2017;126(3):376-393",
      "id": "• Pedoman Praktik Puasa Prabedah: Laporan Diperbarui oleh American Society of Anesthesiologists (Anesthesiology 2017)\n• American Society of Anesthesiologists Committee. Anesthesiology. 2017;126(3):376-393"
    },
    "id": 11,
    "content": {
      "en": "Preoperative Fasting (NPO, Nil Per Os) guidelines define the minimum duration of fasting prior to elective procedures requiring general anesthesia, regional anesthesia, or procedural sedation. Its main purpose is to reduce the volume and acidity of gastric contents, minimizing the risk of **pulmonary aspiration**.",
      "id": "Panduan Puasa Prabedah (NPO, Nil Per Os) menetapkan durasi minimum puasa sebelum prosedur elektif yang memerlukan anestesi umum, anestesi regional, atau sedasi prosedural. Tujuan utamanya adalah untuk mengurangi volume dan keasaman lambung, meminimalkan risiko **aspirasi paru**."
    }
  },
  {
    "title": {
      "en": "Enhanced Recovery After Surgery (ERAS)",
      "id": "Pemulihan Cepat Pasca Operasi (ERAS)"
    },
    "category": "Surgery",
    "isStructured": true,
    "definition": {
      "en": "Enhanced Recovery After Surgery (ERAS) is a multimodal, multidisciplinary perioperative care pathway designed to achieve early recovery for patients undergoing major surgery by reducing the body's stress response to surgical trauma.",
      "id": "Pemulihan Cepat Pasca Operasi (ERAS) adalah jalur perawatan perioperatif multimodal dan multidisiplin yang dirancang untuk mempercepat pemulihan pasien yang menjalani operasi besar dengan mengurangi respons stres tubuh terhadap trauma bedah."
    },
    "symptoms": {
      "en": "• Postoperative evaluation: check for **pain** level, nausea, vomiting, return of bowel function, and mobility\n• Dizziness or fatigue limiting mobilization",
      "id": "• Evaluasi pasca-operasi: cek tingkat **nyeri**, mual, muntah, kembalinya fungsi usus (flatus/defekasi), dan mobilitas\n• Pusing atau lemas yang membatasi mobilisasi"
    },
    "physicalExamination": {
      "en": "• Assess surgical wound for hematoma, active bleeding, or infection\n• Evaluation of abdominal distension, bowel sounds (ileus screening)\n• Hemodynamic evaluation (BP, HR, fluid balance)\n• Respiratory effort and oxygen saturation",
      "id": "• Nilai luka operasi terhadap hematoma, perdarahan aktif, atau infeksi\n• Evaluasi distensi abdomen, bising usus (skrining ileus)\n• Evaluasi hemodinamik (TD, HR, keseimbangan cairan)\n• Usaha napas dan saturasi oksigen"
    },
    "labFindings": {
      "en": "• Normal postoperative hemoglobin and electrolytes\n• Controlled inflammatory response (decrease in CRP over postoperative days)\n• Balanced lactate levels indicating adequate systemic tissue perfusion",
      "id": "• Hemoglobin dan elektrolit pasca-operasi normal\n• Respons inflamasi terkontrol (penurunan CRP seiring hari pasca-operasi)\n• Kadar laktat seimbang menunjukkan perfusi jaringan sistemik adekuat"
    },
    "differentialDiagnosis": {
      "en": "• Postoperative ileus, deep vein thrombosis (DVT), postoperative wound infection, severe postoperative pain, or anastomotic leak",
      "id": "• Ileus pasca-operasi, trombosis vena dalam (DVT), infeksi luka operasi, nyeri hebat pasca-operasi, atau kebocoran anastomosis"
    },
    "dangerSigns": {
      "en": "• Refractory postoperative pain, severe abdominal distension, or persistent vomiting\n• Tachycardia and hypotension (suggestive of internal bleeding or sepsis)\n• High fever or purulent discharge from surgical wound\n• New-onset dyspnea or calf swelling (pulmonary embolism or DVT)",
      "id": "• Nyeri pasca-operasi refrakter, distensi abdomen berat, atau muntah persisten\n• Takikardia dan hipotensi (mencurigakan perdarahan internal atau sepsis)\n• Demam tinggi atau cairan purulen dari luka operasi\n• Sesak napas onset baru atau bengkak pada betis (emboli paru atau DVT)"
    },
    "management": {
      "initialTreatment": {
        "en": "• Optimize multimodal analgesia immediately: **Paracetamol 1g IV** and **Ketorolac 30 mg IV** to minimize opioid requirements\n• Initiate active warming in the operating room to maintain **normothermia (core temp >36°C)**\n• Minimize postoperative IV fluids; shift to oral intake as soon as possible",
        "id": "• Optimalkan analgesia multimodal segera: **Parasetamol 1g IV** dan **Ketorolak 30 mg IV** untuk meminimalkan kebutuhan opioid\n• Mulai penghangatan aktif di kamar operasi untuk mempertahankan **normotermia (suhu inti >36°C)**\n• Minimalkan cairan IV pasca-operasi; alihkan ke asupan oral secepat mungkin"
      },
      "definitiveTreatment": {
        "en": "• **Preoperative phase**:\n  - No prolonged fasting (NPO clear liquids until **2 hours** before)\n  - **Carbohydrate loading**: Drink 400 mL of 12.5% carbohydrate drink 2 hours prior to induction\n• **Intraoperative phase**:\n  - Goal-Directed Fluid Therapy (GDFT)\n  - Multimodal PONV prophylaxis (Dexamethasone + Ondansetron)\n• **Postoperative phase**:\n  - Multimodal opioid-sparing analgesia (scheduled paracetamol, NSAIDs, regional blocks)\n  - Early feeding (solid food within 4 hours)\n  - **Early mobilization** (out of bed within 2-4 hours of surgery)\n  - Early removal of urinary catheters and surgical drains",
        "id": "• **Fase prabedah**:\n  - Tidak ada puasa berkepanjangan (puasa cairan jernih hingga **2 jam** sebelumnya)\n  - **Carbohydrate loading**: Minum 400 mL minuman karbohidrat 12,5% pada 2 jam sebelum induksi\n• **Fase intraoperatif**:\n  - Goal-Directed Fluid Therapy (GDFT)\n  - Profilaksis PONV multimodal (Deksametason + Ondansetron)\n• **Fase pasca-operasi**:\n  - Analgesia bebas opioid multimodal (jadwal rutin parasetamol, NSAID, blok regional)\n  - Nutrisi dini (makanan padat dalam 4 jam)\n  - **Mobilisasi dini** (turun dari tempat tidur dalam 2-4 jam pasca-operasi)\n  - Pelepasan dini kateter urin dan drainase bedah"
      },
      "rehab": {
        "en": "• Active chest physiotherapy, breathing exercises, and daily progressive walking goals post-discharge",
        "id": "• Fisioterapi dada aktif, latihan pernapasan, dan target jalan kaki progresif harian setelah pulang"
      },
      "referral": {
        "en": "• Consult General Surgery or Gynecology immediately if surgical complications (bleeding, leak, bowel obstruction) are suspected postoperatively",
        "id": "• Konsultasikan segera dengan Bedah Umum atau Ginekologi jika dicurigai komplikasi bedah (perdarahan, kebocoran, obstruksi usus) pasca-operasi"
      },
      "workup": {
        "en": "• Daily assessment of pain score (VAS), mobilization hours, and oral intake volume\n• Monitoring fluid balance and electrolytes postoperatively",
        "id": "• Penilaian harian skor nyeri (VAS), durasi mobilisasi, dan volume asupan oral\n• Pemantauan keseimbangan cairan dan elektrolit pasca-operasi"
      }
    },
    "followUp": {
      "en": "• Follow up in **1 week** (clinic visit or telephone call) to review wound healing, bowel function, and pain control",
      "id": "• Tindak lanjut dalam **1 minggu** (kontrol klinik atau telepon) untuk memantau penyembuhan luka, fungsi usus, dan kontrol nyeri"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Prophylactic low-molecular-weight heparin (**Enoxaparin 40 mg SC daily**) for DVT prevention in high-risk pelvic/oncology surgeries\n• Preoperative carbohydrate drink to prevent insulin resistance",
        "id": "• Profilaksis low-molecular-weight heparin (**Enoksaparin 40 mg SC sehari**) untuk pencegahan DVT pada operasi panggul/onkologi risiko tinggi\n• Minuman karbohidrat prabedah untuk mencegah resistensi insulin"
      },
      "nonPharmacological": {
        "en": "• Intermittent pneumatic compression devices on legs\n• Comprehensive patient and family preoperative counseling to align expectations regarding early mobilization and nutrition",
        "id": "• Penggunaan alat kompresi pneumatik intermiten pada kaki\n• Konseling prabedah komprehensif kepada pasien dan keluarga untuk menyamakan ekspektasi tentang mobilisasi dini dan nutrisi"
      }
    },
    "caseExample": {
      "en": "A 62-year-old female undergoes an elective major colorectal resection. The **ERAS protocol** is implemented. She drinks a carbohydrate loading drink 2 hours before induction. Intraoperatively, she receives a thoracic epidural block, goal-directed IV fluids, and active heating. She is fully awake in the recovery room, normothermic, and pain-free. Within 4 hours, she is eating a light solid meal and **mobilizing out of bed** to a chair. Epidural is removed on Day 2, transitioned to oral Paracetamol and Celecoxib. She is discharged home safely on Day 3 with complete return of bowel function.",
      "id": "Seorang wanita 62 tahun menjalani reseksi kolorektal mayor elektif. **Protokol ERAS** diterapkan. Ia meminum minuman karbohidrat 2 jam sebelum induksi. Secara intraoperatif, ia menerima blok epidural torakal, cairan IV goal-directed, dan penghangatan aktif. Ia sadar penuh di ruang pemulihan, normotermia, dan bebas nyeri. Dalam waktu 4 jam, ia mengonsumsi makanan padat ringan dan **mobilisasi turun dari tempat tidur** ke kursi. Kateter epidural dilepas pada Hari ke-2, dialihkan ke Parasetamol oral dan Selecoxib. Ia pulang ke rumah dengan aman pada Hari ke-3 dengan pemulihan fungsi usus yang lengkap."
    },
    "references": {
      "en": "• Guidelines for Perioperative Care in Elective Colorectal Surgery: Enhanced Recovery After Surgery (ERAS) Society Recommendations (World Journal of Surgery 2023)\n• Gustafsson UO, et al. World J Surg. 2023;47(1):1-28",
      "id": "• Pedoman Perawatan Perioperatif pada Bedah Kolorektal Elektif: Rekomendasi ERAS Society (World Journal of Surgery 2023)\n• Gustafsson UO, et al. World J Surg. 2023;47(1):1-28"
    },
    "id": 12,
    "content": {
      "en": "Enhanced Recovery After Surgery (ERAS) is a multimodal, multidisciplinary perioperative care pathway designed to achieve early recovery for patients undergoing major surgery by reducing the body's stress response to surgical trauma.",
      "id": "Pemulihan Cepat Pasca Operasi (ERAS) adalah jalur perawatan perioperatif multimodal dan multidisiplin yang dirancang untuk mempercepat pemulihan pasien yang menjalani operasi besar dengan mengurangi respons stres tubuh terhadap trauma bedah."
    }
  },
  {
    "title": {
      "en": "Sepsis & Septic Shock",
      "id": "Sepsis & Syok Septik"
    },
    "category": "Critical Care",
    "isStructured": true,
    "definition": {
      "en": "Sepsis is defined as life-threatening organ dysfunction caused by a dysregulated host response to infection. Septic Shock is a subset of sepsis in which particularly profound circulatory, cellular, and metabolic abnormalities are associated with a greater risk of mortality, characterized by persistent hypotension requiring vasopressors to maintain **MAP >= 65 mmHg** and serum lactate **>2 mmol/L** despite adequate fluid resuscitation.",
      "id": "Sepsis didefinisikan sebagai disfungsi organ yang mengancam jiwa akibat disregulasi respons imun tubuh terhadap infeksi. Syok Septik adalah subset dari sepsis di mana kelainan sirkulasi, seluler, dan metabolik yang mendalam dikaitkan dengan risiko kematian yang lebih tinggi, ditandai dengan hipotensi persisten yang memerlukan vasopresor untuk mempertahankan **MAP >= 65 mmHg** dan laktat serum **>2 mmol/L** meskipun resusitasi cairan telah adekuat."
    },
    "symptoms": {
      "en": "• Fever (>38.0°C) or hypothermia (<36.0°C)\n• Severe chills or rigors\n• **Altered mental status**, acute confusion, or lethargy\n• Tachypnea and profound weakness\n• Extreme pain or discomfort\n• Oliguria (decreased urine output)",
      "id": "• Demam (>38,0°C) atau hipotermia (<36,0°C)\n• Menggigil hebat\n• **Penurunan kesadaran**, kebingungan akut, atau letargi\n• Takipnea dan kelemahan fisik yang mendalam\n• Nyeri atau rasa tidak nyaman yang hebat\n• Oliguria (penurunan produksi urin)"
    },
    "physicalExamination": {
      "en": "• Hypotension (systolic blood pressure **<100 mmHg**)\n• Tachycardia (heart rate **>100 bpm**)\n• Tachypnea (respiratory rate **>22 breaths/min**)\n• Altered consciousness (Glasgow Coma Scale **<15**)\n• Cold, clammy, mottled skin (poor peripheral perfusion) or warm, flushed skin in early distributive shock\n• Delayed capillary refill time **(>2 seconds)**",
      "id": "• Hipotensi (tekanan darah sistolik **<100 mmHg**)\n• Takikardia (denyut jantung **>100 x/menit**)\n• Takipnea (frekuensi napas **>22 x/menit**)\n• Penurunan kesadaran (Glasgow Coma Scale **<15**)\n• Kulit dingin, basah, pucat (perfusi perifer buruk) atau kulit hangat kemerahan pada awal syok distributif\n• Capillary refill time memanjang **(>2 detik)**"
    },
    "labFindings": {
      "en": "• Elevated **serum lactate >2.0 mmol/L** (indicating tissue hypoperfusion)\n• Leukocytosis (>12,000/uL) or leukopenia (<4,000/uL)\n• Thrombocytopenia (platelets <100,000/uL)\n• Elevated serum creatinine or acute oliguria\n• Elevated inflammatory biomarkers: **CRP** or **Procalcitonin**\n• Metabolic acidosis with bicarbonate depletion",
      "id": "• Peningkatan **laktat serum >2.0 mmol/L** (menunjukkan hipoperfusi jaringan)\n• Leukositosis (>12.000/uL) atau leukopenia (<4.000/uL)\n• Trombositopenia (trombosit <100.000/uL)\n• Kreatinin serum meningkat atau oliguria akut\n• Penanda inflamasi meningkat: **CRP** atau **Prokalsitonin**\n• Asidosis metabolik dengan penurunan bikarbonat"
    },
    "differentialDiagnosis": {
      "en": "• Hypovolemic Shock\n• Cardiogenic Shock\n• Anaphylactic Shock\n• Acute Adrenal Crisis\n• Severe Acute Pancreatitis",
      "id": "• Syok Hipovolemik\n• Syok Kardiogenik\n• Syok Anafilaktik\n• Krisis Adrenal Akut\n• Pankreatitis Akut Berat"
    },
    "dangerSigns": {
      "en": "• Persistent hypotension refractory to initial **30 mL/kg** fluid challenge\n• Severe lactic acidosis **(lactate >4.0 mmol/L)**\n• Respiratory failure requiring mechanical ventilation\n• Obtundation or coma\n• Anuria or severe acute kidney injury",
      "id": "• Hipotensi persisten yang refrakter terhadap loading cairan awal **30 mL/kg**\n• Asidosis laktat berat **(laktat >4,0 mmol/L)**\n• Gagal napas yang memerlukan ventilasi mekanik\n• Obtundasi atau koma\n• Anuria atau gangguan ginjal akut berat"
    },
    "management": {
      "initialTreatment": {
        "en": "• Measure **serum lactate** immediately; repeat every 2-4 hours if elevated (>2 mmol/L)\n• Obtain **blood cultures** (at least 2 sets) before administering antibiotics\n• Administer broad-spectrum **IV antibiotics** (e.g. Piperacillin-Tazobactam or Meropenem) within **1 hour** of recognition\n• Rapidly infuse **30 mL/kg** of IV crystalloid fluid (Normal Saline or Ringer's Lactate) within the first 3 hours",
        "id": "• Ukur **laktat serum** segera; ulangi setiap 2-4 jam jika tinggi (>2 mmol/L)\n• Ambil sampel **kultur darah** (minimal 2 set) sebelum memberikan antibiotik\n• Berikan **antibiotik IV** spektrum luas (misal: Piperasilin-Tazobaktam atau Meropenem) dalam **1 jam** pertama sejak dikenali\n• Infuskan secara cepat **30 mL/kg** cairan kristaloid IV (Normal Salin atau Ringer Laktat) dalam 3 jam pertama"
      },
      "definitiveTreatment": {
        "en": "• If hypotension persists during or after fluid resuscitation: Start **Norepinephrine** immediately (first-choice vasopressor) titrated to maintain **MAP >= 65 mmHg**\n• Add **Vasopressin** (up to 0.03 units/min) if MAP remains below target\n• For septic shock refractory to fluids and vasopressors: Initiate **IV Hydrocortisone 200 mg/day** (either 50 mg IV q6h or continuous infusion)\n• Identify and control the source of infection (abscess drainage, debridement, line removal) within **12 hours**",
        "id": "• Jika hipotensi menetap selama atau setelah resusitasi cairan: Segera mulai **Norepinefrin** (vasopresor pilihan utama) dititrasi untuk mempertahankan **MAP >= 65 mmHg**\n• Tambahkan **Vasopresin** (hingga 0,03 unit/menit) jika MAP tetap di bawah target\n• Untuk syok septik yang refrakter terhadap cairan dan vasopresor: Mulai **IV Hidrokortison 200 mg/hari** (baik 50 mg IV tiap 6 jam atau infus kontinu)\n• Identifikasi dan kendalikan sumber infeksi (drainase abses, debridemen, pelepasan kateter) dalam **12 jam**"
      },
      "rehab": {
        "en": "• Prevention of Post-Intensive Care Syndrome (PICS): early mobilization, physical therapy in the ICU, and structured nutritional support",
        "id": "• Pencegahan Post-Intensive Care Syndrome (PICS): mobilisasi dini, terapi fisik di ICU, dan dukungan nutrisi terstruktur"
      },
      "referral": {
        "en": "• Admit immediately to the **Intensive Care Unit (ICU)**. Consult Infectious Diseases, General Surgery, or Interventional Radiology for urgent source control",
        "id": "• Segera rawat di **Unit Perawatan Intensif (ICU)**. Konsultasikan ke Spesialis Penyakit Dalam, Bedah Umum, atau Radiologi Intervensi untuk pengendalian sumber infeksi darurat"
      },
      "workup": {
        "en": "• Continuous invasive arterial blood pressure monitoring\n• Serial electrolytes, renal panel, coagulation parameters, arterial blood gas, and lactate clearance tracking",
        "id": "• Pemantauan tekanan darah arterial invasif kontinu\n• Pemantauan serial elektrolit, fungsi ginjal, parameter koagulasi, gas darah arteri, dan klirens laktat"
      }
    },
    "followUp": {
      "en": "• Long-term clinic review to assess cognitive decline, muscular weakness, renal function recovery, and psychological health (PTSD screening)",
      "id": "• Evaluasi jangka panjang di klinik untuk menilai penurunan kognitif, kelemahan otot, pemulihan fungsi ginjal, dan kesehatan psikologis (skrining PTSD)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Timely and appropriate prophylactic antibiotics for high-risk surgical procedures\n• Maintain up-to-date vaccinations (Influenza, Pneumococcal, COVID-19)",
        "id": "• Pemberian antibiotik profilaksis yang tepat waktu untuk prosedur bedah berisiko tinggi\n• Pastikan vaksinasi lengkap (Influenza, Pneumokokus, COVID-19)"
      },
      "nonPharmacological": {
        "en": "• Strict **hand hygiene** protocols and aseptic techniques for all invasive lines/procedures\n• Rapid recognition and treatment of localized infections (UTI, cellulitis, pneumonia)",
        "id": "• Protokol **kebersihan tangan** yang ketat dan teknik aseptik untuk semua pemasangan kateter/prosedur invasif\n• Pengenalan dan penanganan cepat infeksi lokal (ISK, selulitis, pneumonia)"
      }
    },
    "caseExample": {
      "en": "A 71-year-old male presents with acute confusion, fever of **39.2°C**, and hypotension (**82/44 mmHg**). His heart rate is 114 bpm, respiratory rate 26 breaths/min. Urinalysis reveals massive pyuria. Blood and urine cultures are drawn, and **IV Meropenem 1g** is started. He receives **3 L of Ringer's Lactate** IV. Despite fluid resuscitation, his BP remains **84/42 mmHg** and lactate is **3.8 mmol/L**. Norepinephrine infusion is initiated via a central line and titrated to maintain MAP > 65 mmHg, and he is transferred to the ICU for invasive monitoring.",
      "id": "Seorang pria 71 tahun datang dengan kebingungan akut, demam **39,2°C**, dan hipotensi (**82/44 mmHg**). Denyut jantungnya 114 x/menit, frekuensi napas 26 x/menit. Urinalisis menunjukkan piuria masif. Kultur darah dan urin diambil, dan **IV Meropenem 1g** dimulai. Ia menerima **3 L Ringer Laktat** IV. Meskipun resusitasi cairan telah diberikan, TD-nya tetap **84/42 mmHg** dan laktat **3,8 mmol/L**. Infus Norepinefrin dimulai melalui kateter vena sentral dan dititrasi untuk mempertahankan MAP > 65 mmHg, lalu ia dipindahkan ke ICU untuk pemantauan invasif."
    },
    "references": {
      "en": "• Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock (Intensive Care Medicine 2021)\n• Evans L, et al. Intensive Care Med. 2021;47(11):1181-1247",
      "id": "• Kampanye Surviving Sepsis: Pedoman Internasional untuk Manajemen Sepsis dan Syok Septik (Intensive Care Medicine 2021)\n• Evans L, et al. Intensive Care Med. 2021;47(11):1181-1247"
    },
    "id": 13,
    "content": {
      "en": "Sepsis is defined as life-threatening organ dysfunction caused by a dysregulated host response to infection. Septic Shock is a subset of sepsis in which particularly profound circulatory, cellular, and metabolic abnormalities are associated with a greater risk of mortality, characterized by persistent hypotension requiring vasopressors to maintain **MAP >= 65 mmHg** and serum lactate **>2 mmol/L** despite adequate fluid resuscitation.",
      "id": "Sepsis didefinisikan sebagai disfungsi organ yang mengancam jiwa akibat disregulasi respons imun tubuh terhadap infeksi. Syok Septik adalah subset dari sepsis di mana kelainan sirkulasi, seluler, dan metabolik yang mendalam dikaitkan dengan risiko kematian yang lebih tinggi, ditandai dengan hipotensi persisten yang memerlukan vasopresor untuk mempertahankan **MAP >= 65 mmHg** dan laktat serum **>2 mmol/L** meskipun resusitasi cairan telah adekuat."
    }
  },
  {
    "title": {
      "en": "Pulmonary Tuberculosis (TB)",
      "id": "Tuberkulosis Paru (TB)"
    },
    "category": "Infectious",
    "isStructured": true,
    "definition": {
      "en": "Pulmonary Tuberculosis (TB) is a chronic, communicable bacterial infection of the lungs caused by **Mycobacterium tuberculosis**. It is characterized by granulomatous inflammation, caseous necrosis, and is transmitted via airborne droplets.",
      "id": "Tuberkulosis Paru (TB) adalah infeksi bakteri paru kronis yang menular, disebabkan oleh **Mycobacterium tuberculosis**. Kondisi ini ditandai oleh inflamasi granulomatosa, nekrosis kaseosa, dan ditularkan melalui droplet udara."
    },
    "symptoms": {
      "en": "• Chronic cough lasting **>=2 weeks** (often productive, occasionally hemoptysis)\n• **B-symptoms**: unexplained weight loss, night sweats, low-grade fever\n• Fatigue, malaise, and anorexia\n• Pleuritic chest pain\n• Dyspnea in advanced parenchymal destruction",
      "id": "• Batuk kronis yang berlangsung **>=2 minggu** (sering kali produktif, kadang hemoptisis)\n• **Gejala B**: penurunan berat badan tanpa sebab, keringat malam, demam subfebris\n• Kelelahan, lemas, dan anoreksia\n• Nyeri dada pleuritik\n• Sesak napas pada kerusakan parenkim paru tingkat lanjut"
    },
    "physicalExamination": {
      "en": "• Chronically ill-looking, muscle wasting (cachexia)\n• Fever, tachycardia, or tachypnea\n• Auscultation: localized bronchial breath sounds, crackles (especially in upper zones)\n• Diminished chest expansion (fibrosis or pleural effusion)",
      "id": "• Tampak sakit kronis, penyusutan otot (kakeksia)\n• Demam, takikardia, atau takipnea\n• Auskultasi: suara napas bronkial terlokalisir, ronkhi basah (terutama di lobus atas)\n• Ekspansi dada menurun (fibrosis atau efusi pleura)"
    },
    "labFindings": {
      "en": "• **GeneXpert MTB/RIF (Rapid Molecular Test)**: High sensitivity, detects Rifampicin resistance (preferred diagnostic tool)\n• Sputum Acid-Fast Bacilli (AFB) smear microscopy (3 specimens)\n• Positive mycobacterial culture (Gold Standard, takes 2-6 weeks)\n• Chest radiograph showing **upper lobe infiltrates, cavitation**, or miliary pattern",
      "id": "• **GeneXpert MTB/RIF (Tes Cepat Molekuler)**: Sensitivitas tinggi, mendeteksi resistensi Rifampisin (alat diagnosis pilihan utama)\n• Mikroskopi sediaan apus BTA sputum (3 spesimen)\n• Kultur mikobakteri positif (Gold Standard, membutuhkan waktu 2-6 minggu)\n• Rontgen dada menunjukkan **infiltrat lobus atas, kavitasi**, atau pola milier"
    },
    "differentialDiagnosis": {
      "en": "• Community-Acquired Pneumonia\n• Lung Abscess\n• Bronchiectasis\n• Lung Malignancy\n• Fungal Lung Infections (e.g. Aspergilloma)",
      "id": "• Pneumonia Komunitas\n• Abses Paru\n• Bronkiektasis\n• Keganasan Paru\n• Infeksi Jamur Paru (misal: Aspergilloma)"
    },
    "dangerSigns": {
      "en": "• Massive **hemoptysis** (>200 mL blood in 24 hours, danger of asphyxiation)\n• Severe dyspnea, hypoxia, or respiratory failure\n• Signs of disseminated (Miliary) TB: severe headache/stiff neck (TB meningitis)\n• Severe drug-induced hepatitis (ALT/AST **>3-5 times** normal with symptoms)",
      "id": "• **Hemoptisis** masif (>200 mL darah dalam 24 jam, bahaya asfiksia)\n• Sesak napas berat, hipoksia, atau gagal napas\n• Tanda TB diseminata (Milier): sakit kepala hebat/kaku kuduk (meningitis TB)\n• Hepatitis imbas obat yang berat (ALT/AST **>3-5 kali** normal disertai gejala)"
    },
    "management": {
      "initialTreatment": {
        "en": "• For active TB, initiate standard **4-drug regimen (HRZE)** immediately\n• Direct Observation Therapy (DOTS) to secure adherence\n• Provide nutritional support and patient education regarding therapy duration\n• Isolate patient in a well-ventilated room or negative pressure isolation room",
        "id": "• Untuk TB aktif, segera mulai **rejimen 4-obat standar (HRZE)**\n• Terapkan Pengawasan Menelan Obat (PMO/DOTS) untuk menjamin kepatuhan\n• Berikan dukungan nutrisi dan edukasi pasien mengenai durasi terapi\n• Isolasi pasien di ruangan berventilasi baik atau ruang isolasi tekanan negatif"
      },
      "definitiveTreatment": {
        "en": "• **Intensive Phase (2 months)**: Daily **Rifampicin (R), Isoniazid (H), Pyrazinamide (Z), and Ethambutol (E)** based on weight bands\n• **Continuation Phase (4 months)**: Daily **Rifampicin (R) and Isoniazid (H)** for a total of **6 months** of treatment\n• Standard fixed-dose combinations (FDC) are highly preferred\n• Adjust therapy if GeneXpert reveals Rifampicin resistance (MDR-TB protocol)\n• Supplement with **Pyridoxine (Vitamin B6) 10-25 mg daily** to prevent isoniazid-induced peripheral neuropathy",
        "id": "• **Fase Intensif (2 bulan)**: **Rifampisin (R), Isoniazid (H), Pirazinamid (Z), dan Etambutol (E)** harian sesuai berat badan\n• **Fase Lanjutan (4 bulan)**: **Rifampisin (R) dan Isoniazid (H)** harian untuk total pengobatan **6 bulan**\n• Kombinasi dosis tetap (KDT/FDC) sangat dipilih utama\n• Sesuaikan terapi jika GeneXpert menunjukkan resistensi Rifampisin (protokol TB-MDR)\n• Tambahkan **Piridoksin (Vitamin B6) 10-25 mg sehari** untuk mencegah neuropati perifer imbas isoniazid"
      },
      "rehab": {
        "en": "• Pulmonary rehabilitation for patients with significant residual lung damage or fibrosis post-treatment",
        "id": "• Rehabilitasi paru untuk pasien dengan kerusakan paru sisa atau fibrosis yang signifikan pasca-pengobatan"
      },
      "referral": {
        "en": "• Refer to **Pulmonology / Clinical Tropical Medicine** if multidrug-resistant TB (MDR-TB) is suspected, for severe drug-induced hepatitis, or for extra-pulmonary TB (meningitis, osteoarticular)",
        "id": "• Rujuk ke **Spesialis Paru / Penyakit Dalam** jika dicurigai TB resistan obat (TB-MDR), terjadi hepatitis imbas obat berat, atau TB ekstra-paru (meningitis, osteoartikular)"
      },
      "workup": {
        "en": "• Sputum smear at baseline, end of 2 months, and end of treatment (month 6)\n• Monitor liver function tests (AST, ALT, bilirubin) monthly, especially in high-risk patients",
        "id": "• Apusan sputum pada awal, akhir bulan ke-2, dan akhir pengobatan (bulan ke-6)\n• Pantau fungsi hati (AST, ALT, bilirubin) setiap bulan, terutama pada pasien risiko tinggi"
      }
    },
    "followUp": {
      "en": "• Monthly clinical review to assess weight gain, resolution of symptoms, medication adherence, and screen for side effects (visual changes with ethambutol, joint pain with pyrazinamide)",
      "id": "• Evaluasi klinis bulanan untuk menilai kenaikan berat badan, resolusi gejala, kepatuhan obat, dan skrining efek samping (gangguan visual akibat etambutol, nyeri sendi akibat pirazinamid)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **BCG vaccination** at birth for infants\n• **Tuberculosis Preventive Treatment (TPT)**: **Isoniazid daily for 6 months (6H)** or **Rifapentine plus Isoniazid weekly for 3 months (3HP)** for close contacts of active TB cases after ruling out active disease",
        "id": "• **Vaksinasi BCG** pada bayi saat lahir\n• **Terapi Pencegahan Tuberkulosis (TPT)**: **Isoniazid harian selama 6 bulan (6H)** atau **Rifapentin plus Isoniazid mingguan selama 3 bulan (3HP)** untuk kontak erat kasus TB aktif setelah menyingkirkan penyakit aktif"
      },
      "nonPharmacological": {
        "en": "• Ensure adequate residential ventilation and sunlight exposure (UV light kills TB bacilli)\n• Use particulate respirators (**N95 masks**) for healthcare workers managing active TB cases",
        "id": "• Pastikan ventilasi rumah memadai dan paparan sinar matahari cukup (sinar UV membunuh basil TB)\n• Gunakan respirator partikulat (**masker N95**) bagi petugas kesehatan yang menangani kasus TB aktif"
      }
    },
    "caseExample": {
      "en": "A 32-year-old male presents with a 3-week history of a productive cough, low-grade afternoon fever, and unintended **5 kg weight loss**. He reports experiencing profuse night sweats. A chest radiograph reveals bilateral upper lobe patchy infiltrates and a small cavity in the right apex. Sputum GeneXpert is positive for **M. tuberculosis** and shows no rifampicin resistance. The patient is placed on weight-banded **HRZE fixed-dose combination** daily under DOTS supervision, along with **Pyridoxine 10 mg daily**. At his 2-month follow-up, his cough has resolved, sputum smear is negative, and he has gained **3 kg**.",
      "id": "Seorang pria 32 tahun datang dengan riwayat batuk produktif selama 3 minggu, demam subfebris pada sore hari, dan penurunan **berat badan 5 kg** yang tidak disengaja. Ia melaporkan mengalami keringat malam yang banyak. Rontgen dada menunjukkan infiltrat bercak bilateral pada lobus atas dan kavitasi kecil di apeks kanan. GeneXpert sputum positif untuk **M. tuberculosis** dan menunjukkan tidak ada resistensi rifampisin. Pasien diberikan **kombinasi dosis tetap (KDT) HRZE** harian sesuai berat badan di bawah pengawasan PMO, bersama dengan **Piridoksin 10 mg sehari**. Pada kontrol 2 bulan, batuknya mereda, apusan sputum negatif BTA, dan berat badannya naik **3 kg**."
    },
    "references": {
      "en": "• WHO Consolidated Guidelines on Tuberculosis: Treatment of Drug-Susceptible Tuberculosis (World Health Organization 2022)\n• World Health Organization. WHO Guidelines Approved by the Guidelines Review Committee, 2022",
      "id": "• Pedoman Konsolidasi WHO tentang Tuberkulosis: Pengobatan Tuberkulosis Sensitif Obat (Organisasi Kesehatan Dunia 2022)\n• World Health Organization. WHO Guidelines Approved by the Guidelines Review Committee, 2022"
    },
    "id": 14,
    "content": {
      "en": "Pulmonary Tuberculosis (TB) is a chronic, communicable bacterial infection of the lungs caused by **Mycobacterium tuberculosis**. It is characterized by granulomatous inflammation, caseous necrosis, and is transmitted via airborne droplets.",
      "id": "Tuberkulosis Paru (TB) adalah infeksi bakteri paru kronis yang menular, disebabkan oleh **Mycobacterium tuberculosis**. Kondisi ini ditandai oleh inflamasi granulomatosa, nekrosis kaseosa, dan ditularkan melalui droplet udara."
    }
  },
  {
    "title": {
      "en": "Liver Cirrhosis",
      "id": "Sirosis Hati"
    },
    "category": "Hepatology",
    "isStructured": true,
    "definition": {
      "en": "Liver Cirrhosis is the late stage of progressive hepatic fibrosis characterized by distortion of the normal hepatic architecture, formation of regenerative nodules, and vascular reorganization, leading to **portal hypertension** and hepatic insufficiency.",
      "id": "Sirosis Hati adalah stadium akhir dari fibrosis hati progresif yang ditandai oleh distorsi arsitektur hati normal, pembentukan nodul regeneratif, dan reorganisasi vaskular, yang menyebabkan **hipertensi porta** dan insufisiensi fungsi hati."
    },
    "symptoms": {
      "en": "• Often asymptomatic in compensated phase\n• **Fatigue**, muscle weakness, and anorexia\n• Abdominal distension and swelling (ascites)\n• Jaundice (yellowing of skin and eyes)\n• Easy bruising or mucosal bleeding\n• Altered sleep patterns or confusion (encephalopathy)",
      "id": "• Sering kali tanpa gejala pada fase kompensasi\n• **Kelelahan**, kelemahan otot, dan anoreksia\n• Perut membesar dan bengkak (asites)\n• Ikterus (kuning pada kulit dan mata)\n• Mudah memar atau perdarahan mukosa\n• Gangguan pola tidur atau kebingungan (ensefalopati)"
    },
    "physicalExamination": {
      "en": "• Jaundice, icteric sclera\n• **Stigmata of chronic liver disease**: spider angiomas (on chest/neck), palmar erythema, gynecomastia, testicular atrophy, Dupuytren's contracture\n• **Ascites**: abdominal distension, shifting dullness, fluid wave\n• Splenomegaly (portal hypertension sign)\n• Asterixis ('flapping tremor') indicating hepatic encephalopathy",
      "id": "• Ikterus, sklera ikterik\n• **Stigmata penyakit hati kronis**: spider angioma (pada dada/leher), eritema palmaris, ginekomastia, atrofi testis, kontraktur Dupuytren\n• **Asites**: distensi abdomen, pekak beralih (shifting dullness), undulasi (fluid wave)\n• Splenomegali (tanda hipertensi porta)\n• Asteriksis ('flapping tremor') menunjukkan ensefalopati hepatikum"
    },
    "labFindings": {
      "en": "• Thrombocytopenia (platelets **<150,000/uL** due to hypersplenism - highly sensitive marker)\n• Prolonged prothrombin time **(elevated PT/INR)**\n• Hypoalbuminemia (serum albumin **<3.5 g/dL**)\n• Hyperbilirubinemia\n• Elevated transaminases (AST often > ALT in cirrhotic stage)\n• Macrocytic anemia",
      "id": "• Trombositopenia (trombosit **<150.000/uL** akibat hipersplenisme - penanda sangat sensitif)\n• Waktu protrombin memanjang **(PT/INR meningkat)**\n• Hipoalbuminemia (albumin serum **<3,5 g/dL**)\n• Hiperbilirubinemia\n• Transaminase meningkat (AST sering kali > ALT pada stadium sirosis)\n• Anemia makrositik"
    },
    "differentialDiagnosis": {
      "en": "• Congestive Heart Failure (Cardiac Cirrhosis)\n• Budd-Chiari Syndrome\n• Portal Vein Thrombosis\n• Schistosomiasis\n• Constrictive Pericarditis",
      "id": "• Gagal Jantung Kongestif (Sirosis Kardiak)\n• Sindrom Budd-Chiari\n• Trombosis Vena Porta\n• Skistosomiasis\n• Perikarditis Konstriktif"
    },
    "dangerSigns": {
      "en": "• **Variceal Hemorrhage**: hematemesis or massive melena (emergency)\n• **Hepatic Encephalopathy Stage III/IV**: somnolence, stupor, or coma\n• **Spontaneous Bacterial Peritonitis (SBP)**: high fever, severe abdominal pain, rebound tenderness\n• Acute Kidney Injury (**Hepatorenal Syndrome**): rapid rise in creatinine, severe oliguria",
      "id": "• **Perdarahan Varises**: hematemesis (muntah darah) atau melena masif (darurat)\n• **Ensefalopati Hepatikum Stadium III/IV**: somnolen, stupor, atau koma\n• **Peritonitis Bakteri Spontan (SBP)**: demam tinggi, nyeri perut hebat, nyeri lepas\n• Gangguan Ginjal Akut (**Sindrom Hepatorenal**): peningkatan kreatinin yang cepat, oliguria berat"
    },
    "management": {
      "initialTreatment": {
        "en": "• For acute variceal bleed: Secure airway, start **IV Octreotide 50 mcg bolus** followed by **50 mcg/hour continuous infusion**, administer prophylactic **Ceftriaxone 1g IV daily**\n• For tense ascites: Perform therapeutic paracentesis; administer **6-8 g of Albumin IV** per liter of ascites fluid removed if >5 liters extracted\n• Restrict sodium (<2g/day) and restrict free water if hyponatremic",
        "id": "• Untuk perdarahan varises akut: Amankan jalan napas, mulai **IV Oktreotid bolus 50 mcg** diikuti **infus kontinu 50 mcg/jam**, berikan profilaksis **Ceftriaxone 1g IV sehari**\n• Untuk asites tegang: Lakukan parasentesis terapeutik; berikan **IV Albumin 6-8 g** per liter cairan asites yang dikeluarkan jika >5 liter diekstraksi\n• Batasi natrium (<2g/hari) dan batasi air bebas jika terjadi hiponatremia"
      },
      "definitiveTreatment": {
        "en": "• Manage portal hypertension: **Carvedilol (6.25-12.5 mg daily)** or **Propranolol** as primary/secondary prophylaxis for varices\n• Manage ascites: Dual diuretic therapy: **Spironolactone 100 mg** combined with **Furosemide 40 mg orally daily** (ratio 100:40, titrate up to max 400:160)\n• Manage hepatic encephalopathy: **Lactulose (15-30 mL orally tid)** to achieve 2-3 soft stools/day, plus **Rifaximin 550 mg bid**\n• Evaluate for **Liver Transplantation** (only definitive cure; calculated via **MELD Score**)",
        "id": "• Kelola hipertensi porta: **Karvedilol (6,25-12,5 mg sehari)** atau **Propranolol** sebagai profilaksis primer/sekunder untuk varises\n• Kelola asites: Terapi diuretik ganda: **Spironolakton 100 mg** dikombinasikan dengan **Furosemid 40 mg oral sehari** (rasio 100:40, dititrasi hingga maksimal 400:160)\n• Kelola ensefalopati: **Laktulosa (15-30 mL oral 3x sehari)** untuk mencapai 2-3 kali BAB lembek/hari, ditambah **Rifaksimin 550 mg 2x sehari**\n• Evaluasi untuk **Transplantasi Hati** (satu-satunya penyembuhan definitif; dihitung via **Skor MELD**)"
      },
      "rehab": {
        "en": "• Specialized nutritional support: high protein (1.2-1.5 g/kg/day), high calorie, and a late-night carbohydrate snack to prevent muscle catabolism",
        "id": "• Dukungan nutrisi khusus: tinggi protein (1,2-1,5 g/kg/hari), tinggi kalori, dan camilan karbohidrat malam hari untuk mencegah katabolisme otot"
      },
      "referral": {
        "en": "• Refer to **Gastroenterology / Hepatology** for baseline screening endoscopy for varices, and refer to a transplant center if Child-Pugh Score Class B/C or MELD Score >= 15",
        "id": "• Rujuk ke **Spesialis Gastroenterologi-Hepatologi** untuk endoskopi skrining awal varises, dan rujuk ke pusat transplantasi jika Skor Child-Pugh Kelas B/C atau Skor MELD >= 15"
      },
      "workup": {
        "en": "• Screening **Upper Endoscopy (EGD)** to detect varices\n• Abdominal ultrasound and **Alpha-Fetoprotein (AFP) every 6 months** for hepatocellular carcinoma (HCC) surveillance\n• Calculate Child-Pugh and MELD scores regularly",
        "id": "• Skrining **Endoskopi SCBA (EGD)** untuk mendeteksi varises\n• USG abdomen dan **Alpha-Fetoprotein (AFP) setiap 6 bulan** untuk surveilans karsinoma hepatoseluler (HCC)\n• Hitung skor Child-Pugh dan MELD secara berkala"
      }
    },
    "followUp": {
      "en": "• Routine follow-up every **3-6 months** to monitor complications, fluid balance, renal function, and screen for HCC",
      "id": "• Kontrol rutin setiap **3-6 bulan** untuk memantau komplikasi, keseimbangan cairan, fungsi ginjal, dan skrining HCC"
    },
    "prevention": {
      "pharmacological": {
        "en": "• **Hepatitis B vaccination** for all susceptible patients\n• Antiviral therapy (e.g. Tenofovir) for patients with chronic HBV to halt cirrhosis progression\n• Daily oral **Norfloxacin or Co-trimoxazole** for secondary SBP prophylaxis in survivors",
        "id": "• **Vaksinasi Hepatitis B** untuk semua pasien yang rentan\n• Terapi antivirus (misal: Tenofovir) untuk pasien dengan HBV kronis untuk menghentikan progresi sirosis\n• Oral **Norfloksasin atau Ko-trimoksazol** harian untuk profilaksis sekunder SBP pada penyintas"
      },
      "nonPharmacological": {
        "en": "• Absolute **avoidance of alcohol**\n• Discontinue hepatotoxic drugs and avoid raw shellfish\n• Weight reduction and metabolic control in non-alcoholic fatty liver disease (MASLD)",
        "id": "• **Penghindaran total terhadap alkohol**\n• Hentikan obat hepatotoksik dan hindari kerang mentah\n• Penurunan berat badan dan kontrol metabolik pada penyakit perlemakan hati non-alkoholik (MASLD)"
      }
    },
    "caseExample": {
      "en": "A 56-year-old male with a history of chronic Hepatitis C presents with progressive abdominal swelling and yellow eyes. Physical exam reveals a distended abdomen with positive shifting dullness, spider angiomas on his chest, and scleral icterus. Lab results: platelets **78,000/uL**, albumin **2.8 g/dL**, bilirubin **3.1 mg/dL**, and PT/INR **1.6**. Diagnosed with **decompensated liver cirrhosis (Child-Pugh Class B)**. He is placed on **Spironolactone 100 mg and Furosemide 40 mg daily**, restricted to <2g sodium daily, and scheduled for a screening EGD which subsequently reveals small non-bleeding esophageal varices, managed with **Carvedilol 6.25 mg daily**.",
      "id": "Seorang pria 56 tahun dengan riwayat Hepatitis C kronis datang dengan perut yang membesar secara progresif dan mata kuning. Pemeriksaan fisik menunjukkan perut buncit dengan pekak beralih positif, spider angioma pada dada, dan sklera ikterik. Hasil lab: trombosit **78.000/uL**, albumin **2,8 g/dL**, bilirubin **3,1 mg/dL**, dan PT/INR **1,6**. Terdiagnosis **sirosis hati dekompensasi (Child-Pugh Kelas B)**. Ia diberikan **Spironolakton 100 mg dan Furosemid 40 mg sehari**, dibatasi natrium <2g harian, dan dijadwalkan untuk EGD skrining yang kemudian menunjukkan varises esofagus kecil tanpa perdarahan, yang dikelola dengan **Karvedilol 6,25 mg sehari**."
    },
    "references": {
      "en": "• AASLD Practice Guidance on the Management of Ascites, Spontaneous Bacterial Peritonitis, and Hepatorenal Syndrome in Patients with Cirrhosis (Hepatology 2021)\n• Biggins SW, et al. Hepatology. 2021;74(2):1014-1048",
      "id": "• Panduan Praktik AASLD tentang Manajemen Asites, Peritonitis Bakteri Spontan, dan Sindrom Hepatorenal pada Pasien dengan Sirosis (Hepatology 2021)\n• Biggins SW, et al. Hepatology. 2021;74(2):1014-1048"
    },
    "id": 15,
    "content": {
      "en": "Liver Cirrhosis is the late stage of progressive hepatic fibrosis characterized by distortion of the normal hepatic architecture, formation of regenerative nodules, and vascular reorganization, leading to **portal hypertension** and hepatic insufficiency.",
      "id": "Sirosis Hati adalah stadium akhir dari fibrosis hati progresif yang ditandai oleh distorsi arsitektur hati normal, pembentukan nodul regeneratif, dan reorganisasi vaskular, yang menyebabkan **hipertensi porta** dan insufisiensi fungsi hati."
    }
  },
  {
    "title": {
      "en": "Rheumatoid Arthritis",
      "id": "Artritis Reumatoid"
    },
    "category": "Rheumatology",
    "isStructured": true,
    "definition": {
      "en": "Rheumatoid Arthritis (RA) is a chronic, systemic autoimmune inflammatory disease characterized by symmetric polyarthritis, primarily affecting small joints of the hands and feet, leading to progressive joint destruction, deformity, and systemic extra-articular manifestations.",
      "id": "Artritis Reumatoid (RA) adalah penyakit inflamasi autoimun sistemik kronis yang ditandai oleh poliartritis simetris, terutama mengenai sendi-sendi kecil pada tangan dan kaki, yang menyebabkan kerusakan sendi progresif, deformitas, dan manifestasi ekstra-artikular sistemik."
    },
    "symptoms": {
      "en": "• Symmetric joint pain and swelling (especially MCP, PIP, MTP joints)\n• **Morning stiffness lasting >1 hour** (improves with physical activity)\n• Fatigue, low-grade fever, and unintended weight loss\n• Joint deformities in late stages (swan-neck, boutonniere, ulnar deviation)\n• Decreased grip strength",
      "id": "• Nyeri dan bengkak sendi simetris (terutama sendi MCP, PIP, MTP)\n• **Kaku pagi hari berlangsung >1 jam** (membaik dengan aktivitas fisik)\n• Kelelahan, demam subfebris, dan penurunan berat badan tanpa sebab\n• Deformitas sendi pada stadium lanjut (swan-neck, boutonniere, deviasi ulnar)\n• Kekuatan genggaman tangan menurun"
    },
    "physicalExamination": {
      "en": "• Symmetric joint swelling, tenderness, and warmth on palpation ('boggy' swelling indicative of synovitis)\n• Limited range of motion in affected joints\n• Rheumatoid nodules (subcutaneous, firm, painless over pressure points)\n• Ulnar deviation of fingers, boutonniere deformity (PIP flexion, DIP hyperextension), swan-neck deformity (PIP hyperextension, DIP flexion)",
      "id": "• Bengkak sendi simetris, nyeri tekan, dan hangat pada palpasi (bengkak 'boggy' yang menunjukkan sinovitis)\n• Keterbatasan rentang gerak pada sendi yang terkena\n• Nodul reumatoid (subkutan, padat, tidak nyeri pada titik-titik tekanan)\n• Deviasi ulnar jari-jari tangan, deformitas boutonniere (fleksi PIP, hiperekstensi DIP), deformitas swan-neck (hiperekstensi PIP, fleksi DIP)"
    },
    "labFindings": {
      "en": "• Positive Rheumatoid Factor **(RF)** (sensitivity ~70%)\n• Positive Anti-Cyclic Citrullinated Peptide **(anti-CCP)** antibodies (specificity **>95%** - highly specific)\n• Elevated inflammatory markers: **ESR** and **CRP**\n• Normocytic, normochromic anemia (anemia of chronic disease)\n• Synovial fluid analysis: inflammatory pattern (leukocytes 5,000-50,000/uL)",
      "id": "• Faktor Reumatoid **(RF)** positif (sensitivitas ~70%)\n• Antibodi Anti-Cyclic Citrullinated Peptide **(anti-CCP)** positif (spesifisitas **>95%** - sangat spesifik)\n• Peningkatan penanda inflamasi: **LED** dan **CRP**\n• Anemia normositik normokromik (anemia penyakit kronis)\n• Analisis cairan sendi: pola inflamasi (leukosit 5.000-50.000/uL)"
    },
    "differentialDiagnosis": {
      "en": "• Osteoarthritis (non-inflammatory, asymmetric, no morning stiffness)\n• Psoriatic Arthritis\n• Systemic Lupus Erythematosus (SLE)\n• Gouty Arthritis\n• Reactive Arthritis",
      "id": "• Osteoartritis (non-inflamasi, asimetris, tanpa kaku pagi hari)\n• Artritis Psoriatik\n• Lupus Eritematosus Sistemik (SLE)\n• Artritis Gout\n• Artritis Reaktif"
    },
    "dangerSigns": {
      "en": "• **Atlantoaxial subluxation**: neck pain radiating to occiput, paresthesias, or signs of cervical myelopathy (emergency)\n• Rheumatoid vasculitis (cutaneous ulcers, digital gangrene, mononeuritis multiplex)\n• Scleritis (severe eye pain, redness, photophobia - threatens vision)\n• Severe cytopenias or systemic infections secondary to immunosuppressive therapy",
      "id": "• **Subluksasi atlantoaksial**: nyeri leher menjalar ke oksiput, parestesia, atau tanda mielopati servikal (darurat)\n• Vaskulitis reumatoid (ulkus kulit, gangren digital, mononeuritis multipleks)\n• Skleritis (nyeri mata hebat, kemerahan, fotofobia - mengancam penglihatan)\n• Sitopenia berat atau infeksi sistemik akibat terapi imunosupresif"
    },
    "management": {
      "initialTreatment": {
        "en": "• Control acute pain and inflammation: scheduled **NSAIDs** (e.g. Meloxicam 7.5-15 mg daily) or low-dose **oral Glucocorticoids (Prednisone <=10 mg daily)** as 'bridge therapy'\n• Initiate first-line Disease-Modifying Antirheumatic Drugs (DMARDs) as early as possible",
        "id": "• Kontrol nyeri akut dan inflamasi: **NSAID** rutin (misal: Meloksikam 7,5-15 mg sehari) atau **Glukokortikoid oral dosis rendah (Prednison <=10 mg sehari)** sebagai 'terapi jembatan'\n• Mulai Disease-Modifying Antirheumatic Drugs (DMARDs) lini pertama secepat mungkin"
      },
      "definitiveTreatment": {
        "en": "• **Methotrexate (10-15 mg orally once weekly)** is the anchor first-line DMARD (always co-prescribe **Folic Acid 5 mg weekly** to reduce side effects)\n• Alternative or adjunctive DMARDs: **Leflunomide (10-20 mg daily)**, **Sulfasalazine**, or **Hydroxychloroquine**\n• For refractory cases (moderate-to-high disease activity despite optimal DMARDs): Add biological DMARDs (TNF inhibitors: **Adalimumab** or **Etanercept**) or JAK inhibitors (Tofacitinib)\n• Strict 'Treat-to-Target' strategy aiming for clinical remission or low disease activity",
        "id": "• **Metotreksat (10-15 mg oral seminggu sekali)** adalah DMARD lini pertama utama (selalu resepkan bersama **Asam Folat 5 mg seminggu** untuk mengurangi efek samping)\n• DMARD alternatif atau tambahan: **Leflunomid (10-20 mg sehari)**, **Sulfasalasin**, atau **Hidroksiklorokuin**\n• Untuk kasus refrakter (aktivitas penyakit sedang-berat meskipun DMARD optimal): Tambahkan DMARD biologis (penghambat TNF: **Adalimumab** atau **Etanersept**) atau penghambat JAK (Tofasitinib)\n• Terapkan strategi 'Treat-to-Target' yang ketat dengan target remisi klinis atau aktivitas penyakit rendah"
      },
      "rehab": {
        "en": "• Physical therapy to preserve joint mobility, improve muscle strength, and occupational therapy for joint protection techniques and assistive devices",
        "id": "• Terapi fisik untuk menjaga mobilitas sendi, meningkatkan kekuatan otot, dan terapi okupasi untuk teknik perlindungan sendi serta alat bantu"
      },
      "referral": {
        "en": "• Refer to **Rheumatology** immediately upon diagnosis (ideally within 6 weeks of symptom onset) to establish DMARD therapy and prevent irreversible erosive joint damage",
        "id": "• Rujuk ke **Spesialis Reumatologi** segera setelah terdiagnosis (ideally dalam 6 minggu dari onset gejala) untuk memulai terapi DMARD dan mencegah kerusakan sendi erosif ireversibel"
      },
      "workup": {
        "en": "• X-rays of hands, wrists, and feet at baseline (evaluate for joint space narrowing and marginal erosions)\n• Baseline screening for latent TB (QuantiFERON or TST) and Hepatitis B/C prior to initiating DMARDs\n• Monthly CBC, AST/ALT, and creatinine monitoring when starting Methotrexate",
        "id": "• Rontgen tangan, pergelangan tangan, dan kaki pada awal (evaluasi penyempitan celah sendi dan erosi marginal)\n• Skrining awal untuk TB laten (QuantiFERON atau TST) dan Hepatitis B/C sebelum memulai DMARD\n• Pemantauan bulanan Darah Lengkap, AST/ALT, dan kreatinin saat memulai Metotreksat"
      }
    },
    "followUp": {
      "en": "• Review every **1-3 months** when disease is active, then every **6 months** once stable clinical remission is achieved\n• Assess disease activity using validated scores (DAS28 or CDAI)",
      "id": "• Tinjau setiap **1-3 bulan** saat penyakit aktif, kemudian setiap **6 bulan** setelah remisi klinis yang stabil tercapai\n• Nilai aktivitas penyakit menggunakan skor tervalidasi (DAS28 atau CDAI)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• There are no pharmacological measures to prevent the onset of RA; primary focus is early DMARD intervention to prevent joint destruction",
        "id": "• Tidak ada tindakan farmakologis untuk mencegah onset RA; fokus utama adalah intervensi DMARD dini untuk mencegah kerusakan sendi"
      },
      "nonPharmacological": {
        "en": "• Smoking cessation (highly critical as smoking increases RA risk and severity and reduces DMARD response)\n• Balanced anti-inflammatory diet (rich in omega-3 fatty acids)",
        "id": "• Berhenti merokok (sangat kritis karena merokok meningkatkan risiko/keparahan RA dan mengurangi respons DMARD)\n• Diet anti-inflamasi seimbang (kaya asam lemak omega-3)"
      }
    },
    "caseExample": {
      "en": "A 36-year-old female presents with a 6-week history of pain, swelling, and stiffness in her bilateral wrists, MCP, and PIP joints. She reports experiencing severe **morning stiffness lasting 2 hours**. Physical exam reveals symmetric swelling and tenderness of 10 small joints. Laboratory workup reveals positive **anti-CCP (>100 U/mL)**, positive RF, and elevated **CRP (24 mg/L)**. X-rays show early periarticular osteopenia. The patient is diagnosed with **Rheumatoid Arthritis** and immediately started on oral **Methotrexate 15 mg once weekly** combined with **Folic Acid 5 mg weekly**, and low-dose **Prednisone 5 mg daily** as a bridge. At her 3-month review, her morning stiffness has reduced to 10 minutes, joint swelling has resolved, and CRP is normal.",
      "id": "Seorang wanita 36 tahun datang dengan riwayat nyeri, bengkak, dan kaku pada kedua pergelangan tangan, sendi MCP, dan PIP selama 6 minggu. Ia mengeluhkan **kaku pagi hari yang parah selama 2 jam**. Pemeriksaan fisik menunjukkan bengkak simetris dan nyeri tekan pada 10 sendi kecil. Pemeriksaan lab menunjukkan **anti-CCP positif (>100 U/mL)**, RF positif, dan peningkatan **CRP (24 mg/L)**. Rontgen menunjukkan osteopenia periartikular awal. Pasien terdiagnosis **Artritis Reumatoid** dan segera dimulai terapi oral **Metotreksat 15 mg seminggu sekali** dikombinasikan dengan **Asam Folat 5 mg seminggu**, serta **Prednison 5 mg sehari** dosis rendah sebagai jembatan. Pada evaluasi 3 bulan, kaku paginya berkurang menjadi 10 menit, bengkak sendi mereda, dan CRP normal."
    },
    "references": {
      "en": "• 2021 American College of Rheumatology Guideline for the Treatment of Rheumatoid Arthritis (Arthritis & Rheumatology 2021)\n• Fraenkel L, et al. Arthritis Rheumatol. 2021;73(7):1108-1123",
      "id": "• Pedoman American College of Rheumatology 2021 untuk Pengobatan Artritis Reumatoid (Arthritis & Rheumatology 2021)\n• Fraenkel L, et al. Arthritis Rheumatol. 2021;73(7):1108-1123"
    },
    "id": 16,
    "content": {
      "en": "Rheumatoid Arthritis (RA) is a chronic, systemic autoimmune inflammatory disease characterized by symmetric polyarthritis, primarily affecting small joints of the hands and feet, leading to progressive joint destruction, deformity, and systemic extra-articular manifestations.",
      "id": "Artritis Reumatoid (RA) adalah penyakit inflamasi autoimun sistemik kronis yang ditandai oleh poliartritis simetris, terutama mengenai sendi-sendi kecil pada tangan dan kaki, yang menyebabkan kerusakan sendi progresif, deformitas, dan manifestasi ekstra-artikular sistemik."
    }
  },
  {
    "title": {
      "en": "Migraine",
      "id": "Migrain"
    },
    "category": "Neurology",
    "isStructured": true,
    "definition": {
      "en": "Migraine is a common, chronic neurovascular disorder characterized by recurrent episodes of severe headache, often unilateral, throbbing, and associated with sensory hypersensitivity (photophobia, phonophobia) and autonomic dysfunction. It can present with aura (sensory or visual disturbances preceding pain) or without aura.",
      "id": "Migrain adalah gangguan neurovaskular kronis yang umum ditandai oleh episode sakit kepala hebat yang berulang, sering kali unilateral, berdenyut, dan dikaitkan dengan hipersensitivitas sensorik (fotofobia, fonofobia) serta disfungsi otonom. Dapat muncul dengan aura (gangguan sensorik/visual sebelum nyeri) atau tanpa aura."
    },
    "symptoms": {
      "en": "• Moderate-to-severe headache, typically **unilateral** and **throbbing/pulsating**\n• Aggravated by **routine physical activity** (walking or climbing stairs)\n• Accompanied by **nausea** and/or vomiting\n• High sensitivity to light (**photophobia**) and sound (**phonophobia**)\n• Aura symptoms (visual scotomas, zigzag lines, paresthesias) lasting **5-60 minutes** prior to headache onset in 20-30% of patients",
      "id": "• Sakit kepala sedang-berat, biasanya **unilateral** (satu sisi) dan **berdenyut**\n• Diperberat oleh **aktivitas fisik rutin** (berjalan atau naik tangga)\n• Disertai **mual** dan/atau muntah\n• Sensitivitas tinggi terhadap cahaya (**fotofobia**) dan suara (**fonofobia**)\n• Gejala aura (skotoma visual, garis zigzag, parestesia) berlangsung **5-60 menit** sebelum onset sakit kepala pada 20-30% pasien"
    },
    "physicalExamination": {
      "en": "• Neurological exam is entirely normal in primary migraine (highly critical to rule out secondary causes)\n• Cranial/cervical muscle tenderness during an acute attack\n• Autonomic signs (nasal congestion, rhinorrhea, or mild ptosis) may occur occasionally",
      "id": "• Pemeriksaan neurologis sepenuhnya normal pada migrain primer (sangat kritis untuk menyingkirkan penyebab sekunder)\n• Nyeri tekan otot kranial/servikal selama serangan akut\n• Tanda otonom (kongesti hidung, rinorea, atau ptosis ringan) dapat terjadi kadang-kadang"
    },
    "labFindings": {
      "en": "• Diagnosis is entirely clinical; standard labs are normal\n• Brain MRI or CT is normal (indicated only to rule out structural lesions when red flags are present)",
      "id": "• Diagnosis sepenuhnya klinis; pemeriksaan lab standar normal\n• MRI atau CT scan otak normal (hanya diindikasikan untuk menyingkirkan lesi struktural jika terdapat tanda bahaya)"
    },
    "differentialDiagnosis": {
      "en": "• Tension-Type Headache\n• Cluster Headache\n• Medication Overuse Headache (rebound headache)\n• Temporal Arteritis (Giant Cell Arteritis in elderly)\n• Idiopathic Intracranial Hypertension",
      "id": "• Sakit Kepala Tipe Tegang (Tension-Type)\n• Sakit Kepala Kluster\n• Sakit Kepala Akibat Overuse Obat (nyeri kepala rebound)\n• Arteritis Temporal (Giant Cell Arteritis pada lansia)\n• Hipertensi Intrakranial Idiopatik"
    },
    "dangerSigns": {
      "en": "• **'SNOOP' Red Flags**: Sudden onset ('thunderclap' headache), New-onset in patient **>50 years old**, Onset with fever/stiff neck, Systemic signs (cancer, HIV), or Progressive headache worsening over weeks\n• Focal neurological deficits (weakness, sensory loss) during headache that are not typical of patient's established aura\n• New-onset headache in pregnant or postpartum patients",
      "id": "• **Tanda Bahaya 'SNOOP'**: Onset mendadak ('sakit kepala thunderclap'), Onset baru pada pasien **usia >50 tahun**, Onset disertai demam/kaku kuduk, Tanda sistemik (kanker, HIV), atau Sakit kepala progresif memburuk berminggu-minggu\n• Defisit neurologis fokal (kelemahan, mati rasa) selama sakit kepala yang tidak khas untuk aura pasien yang sudah biasa terjadi\n• Sakit kepala onset baru pada pasien hamil atau pasca-persalinan"
    },
    "management": {
      "initialTreatment": {
        "en": "• Advise rest in a quiet, dark room\n• For mild-to-moderate attacks: Administer **Acetaminophen 1,000 mg** OR simple NSAIDs (**Ibuprofen 400-800 mg** or **Ketoprofen**)\n• Co-administer an antiemetic (**Metoclopramide 10 mg IV/PO**) to treat nausea and accelerate gastric absorption",
        "id": "• Sarankan istirahat di ruangan yang tenang dan gelap\n• Untuk serangan ringan-sedang: Berikan **Asetaminofen 1.000 mg** ATAU NSAID sederhana (**Ibuprofen 400-800 mg** atau **Ketoprofen**)\n• Berikan bersama antiemetik (**Metoklopramid 10 mg IV/PO**) untuk mengatasi mual dan mempercepat absorpsi lambung"
      },
      "definitiveTreatment": {
        "en": "• For moderate-to-severe attacks (or when NSAIDs fail): Administer migraine-specific **Triptans** (e.g. **Sumatriptan 50-100 mg orally** or **Zolmitriptan**; repeat once after 2 hours if needed; avoid in ischemic heart disease or uncontrolled hypertension)\n• **Preventive therapy** (indicated if >=4 attacks/month or severe disability):\n  - First-line oral agents: **Propranolol (40-160 mg daily)**, **Amitriptyline (10-50 mg nightly)**, **Topiramate (50-100 mg daily)**, or **Sodium Valproate**\n  - Select preventive agent based on patient's comorbidities (e.g. Amitriptyline if insomnia/depression, Propranolol if hypertension)\n• Avoid acute medication use **>=10 days/month** (triptans) or **>=15 days/month** (NSAIDs) to prevent **Medication Overuse Headache**",
        "id": "• Untuk serangan sedang-berat (atau ketika NSAID gagal): Berikan **Triptan** spesifik migrain (misal: **Sumatriptan 50-100 mg oral** atau **Zolmitriptan**; ulangi sekali setelah 2 jam jika perlu; hindari pada penyakit jantung iskemik atau hipertensi tidak terkontrol)\n• **Terapi Pencegahan** (diindikasikan jika >=4 serangan/bulan atau disabilitas berat):\n  - Agen oral lini pertama: **Propranolol (40-160 mg sehari)**, **Amitriptilin (10-50 mg malam hari)**, **Topiramat (50-100 mg sehari)**, atau **Natrium Valproat**\n  - Pilih agen pencegahan berdasarkan komorbiditas pasien (misal: Amitriptilin jika insomnia/depresi, Propranolol jika hipertensi)\n• Hindari penggunaan obat akut **>=10 hari/bulan** (triptan) atau **>=15 hari/bulan** (NSAID) untuk mencegah **Sakit Kepala Akibat Overuse Obat**"
      },
      "rehab": {
        "en": "• Cognitive Behavioral Therapy (CBT) for stress management, relaxation training, and biofeedback",
        "id": "• Terapi Perilaku Kognitif (CBT) untuk manajemen stres, latihan relaksasi, dan biofeedback"
      },
      "referral": {
        "en": "• Refer to **Neurology** for chronic migraine (>=15 days/month), failure of >=2 oral preventive agents, diagnostic uncertainty, or suspected secondary headache",
        "id": "• Rujuk ke **Spesialis Saraf** untuk migrain kronis (>=15 hari/bulan), kegagalan >=2 agen pencegah oral, keraguan diagnosis, atau dicurigai sakit kepala sekunder"
      },
      "workup": {
        "en": "• Clinical headache diary to track frequency, triggers, and acute medication use\n• Brain neuroimaging (MRI preferred) if red flags are present",
        "id": "• Buku catatan harian sakit kepala klinis untuk memantau frekuensi, pemicu, dan penggunaan obat akut\n• Pencitraan otak (MRI lebih dipilih) jika terdapat tanda bahaya"
      }
    },
    "followUp": {
      "en": "• Follow up in **4-8 weeks** after starting acute or preventive treatment to assess efficacy (target **50% reduction in headache frequency**) and tolerability",
      "id": "• Tindak lanjut dalam **4-8 minggu** setelah memulai terapi akut atau pencegahan untuk menilai efikasi (target **penurunan frekuensi sakit kepala sebesar 50%**) dan tolerabilitas"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Adherence to daily **preventive medications** (e.g. Amitriptyline, Propranolol, or Topiramate)\n• Calcitonin gene-related peptide (CGRP) monoclonal antibodies (e.g. Erenumab) for refractory chronic cases",
        "id": "• Kepatuhan terhadap **obat pencegah harian** (misal: Amitriptilin, Propranolol, atau Topiramat)\n• Antibodi monoklonal CGRP (misal: Erenumab) untuk kasus kronis yang refrakter"
      },
      "nonPharmacological": {
        "en": "• Maintain consistent sleep-wake cycles and regular meal times\n• Adequate hydration (at least **2 L water/day**)\n• Identify and avoid specific triggers (e.g. monosodium glutamate, red wine, aged cheese, stress, skipped meals)\n• Regular moderate physical exercise",
        "id": "• Jaga siklus tidur-bangun yang konsisten dan waktu makan yang teratur\n• Hidrasi yang adekuat (minimal **2 L air/hari**)\n• Identifikasi dan hindari pemicu spesifik (misal: MSG, anggur merah, keju lama, stres, melewatkan waktu makan)\n• Olahraga fisik sedang secara teratur"
      }
    },
    "caseExample": {
      "en": "A 28-year-old female presents with recurrent throbbing headaches on the right side of her head, occurring **5-6 times per month** for the past year. The headache is severe, lasts **12-24 hours**, is accompanied by **nausea** and extreme vomiting, and requires her to lie down in a dark room. She reports seeing flashing zigzag lines in her vision for **20 minutes** before the headache starts. Neurological exam is normal. The diagnosis is **Migraine with aura**. She is prescribed **Sumatriptan 50 mg orally** at the onset of headache, along with **Metoclopramide 10 mg**. For prevention, she is started on **Propranolol 40 mg daily**. At her 2-month follow-up, she reports only 2 mild headache attacks, successfully managed with Sumatriptan.",
      "id": "Seorang wanita 28 tahun datang dengan keluhan sakit kepala berdenyut berulang pada sisi kanan kepalanya, terjadi **5-6 kali per bulan** selama setahun terakhir. Sakit kepala dirasakan berat, berlangsung **12-24 jam**, disertai **mual** dan muntah hebat, serta mengharuskan ia berbaring di ruangan gelap. Ia melaporkan melihat garis-garis zigzag berkilau pada penglihatannya selama **20 menit** sebelum sakit kepala dimulai. Pemeriksaan neurologis normal. Diagnosisnya adalah **Migrain dengan aura**. Ia diresepkan **Sumatriptan 50 mg oral** pada saat onset sakit kepala, bersama dengan **Metoklopramid 10 mg**. Untuk pencegahan, ia diberikan **Propranolol 40 mg sehari**. Pada kontrol 2 bulan, ia melaporkan hanya mengalami 2 serangan sakit kepala ringan, yang berhasil diatasi dengan Sumatriptan."
    },
    "references": {
      "en": "• American Headache Society Consensus Statement on the Treatment of Migraine (Headache 2021)\n• Ailani J, et al. Headache. 2021;61(7):1021-1039",
      "id": "• Pernyataan Konsensus American Headache Society tentang Pengobatan Migrain (Headache 2021)\n• Ailani J, et al. Headache. 2021;61(7):1021-1039"
    },
    "id": 17,
    "content": {
      "en": "Migraine is a common, chronic neurovascular disorder characterized by recurrent episodes of severe headache, often unilateral, throbbing, and associated with sensory hypersensitivity (photophobia, phonophobia) and autonomic dysfunction. It can present with aura (sensory or visual disturbances preceding pain) or without aura.",
      "id": "Migrain adalah gangguan neurovaskular kronis yang umum ditandai oleh episode sakit kepala hebat yang berulang, sering kali unilateral, berdenyut, dan dikaitkan dengan hipersensitivitas sensorik (fotofobia, fonofobia) serta disfungsi otonom. Dapat muncul dengan aura (gangguan sensorik/visual sebelum nyeri) atau tanpa aura."
    }
  },
  {
    "title": {
      "en": "Acute Limb Ischemia (ALI)",
      "id": "Iskemia Tungkai Akut (ALI)"
    },
    "category": "Interventional Radiology",
    "isStructured": true,
    "definition": {
      "en": "Acute Limb Ischemia (ALI) is defined as a sudden decrease in limb perfusion that causes a potential threat to limb viability. It is a medical emergency requiring rapid diagnosis and revascularization to prevent amputation and systemic complications.",
      "id": "Iskemia Tungkai Akut (ALI) didefinisikan sebagai penurunan mendadak perfusi tungkai yang menyebabkan ancaman potensial terhadap viabilitas ekstremitas. Ini adalah keadaan darurat medis yang memerlukan diagnosis cepat dan revaskularisasi untuk mencegah amputasi serta komplikasi sistemik."
    },
    "symptoms": {
      "en": "• Sudden onset of severe extremity **pain** (often distal and progressive)\n• Numbness, paresthesia, or sensory loss\n• Inability to move toes or fingers (motor weakness/paralysis)\n• Coldness or temperature discrepancy in the affected limb\n• Pale or mottled skin color",
      "id": "• Serangan mendadak **nyeri** ekstremitas yang hebat (sering kali distal dan progresif)\n• Mati rasa, parestesia, atau hilangnya sensorik\n• Ketidakmampuan untuk menggerakkan jari kaki atau tangan (kelemahan motorik/paralisis)\n• Rasa dingin atau perbedaan suhu pada tungkai yang terkena\n• Warna kulit pucat atau bercak kebiruan (mottling)"
    },
    "physicalExamination": {
      "en": "• The **6 Ps**: **Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia** (cold limb)\n• Absent peripheral pulses (dorsalis pedis, posterior tibial, popliteal, femoral)\n• Loss of light touch, pinprick sensation, and motor dysfunction (Rutherford classification)\n• Delayed capillary refill time **(>3 seconds)** or complete absence",
      "id": "• **6 P**: **Pain (nyeri), Pallor (pucat), Pulselessness (hilangnya nadi), Paresthesia (kesemutan), Paralysis (kelumpuhan), Poikilothermia (dingin)**\n• Hilangnya denyut nadi perifer (dorsalis pedis, tibialis posterior, popliteal, femoralis)\n• Hilangnya sensasi sentuhan ringan, tusukan jarum, dan disfungsi motorik (klasifikasi Rutherford)\n• Capillary refill time memanjang **(>3 detik)** atau tidak terdeteksi sama sekali"
    },
    "labFindings": {
      "en": "• **Arterial Duplex Ultrasound**: demonstrating absence of flow or thrombosis in target vessel\n• **CT Angiography (CTA)**: Gold standard to define the level and extent of occlusion and guide intervention\n• Elevated serum lactate and creatine kinase (CK) indicating skeletal muscle ischemia\n• Elevated serum creatinine or myoglobinuria (rhabdomyolysis in late stages)",
      "id": "• **USG Duplex Arteri**: menunjukkan tidak adanya aliran darah atau trombosis pada pembuluh darah target\n• **CT Angiografi (CTA)**: Standar emas untuk menentukan tingkat dan luasnya oklusi serta memandu intervensi\n• Peningkatan laktat serum dan kreatin kinase (CK) yang menunjukkan iskemia otot rangka\n• Peningkatan kreatinin serum atau mioglobinuria (rabdomiolisis pada stadium lanjut)"
    },
    "differentialDiagnosis": {
      "en": "• Phlegmasia Cerulea Dolens (severe venous thrombosis)\n• Acute Deep Vein Thrombosis (DVT)\n• Aortic Dissection extending to iliac arteries\n• Compartment Syndrome\n• Severe Peripheral Artery Disease (PAD) flare",
      "id": "• Phlegmasia Cerulea Dolens (trombosis vena berat)\n• Trombosis Vena Dalam Akut (DVT)\n• Diseksi Aorta yang meluas ke arteri iliaka\n• Sindrom Kompartemen\n• Eksaserbasi Penyakit Arteri Perifer (PAD) berat"
    },
    "dangerSigns": {
      "en": "• **Complete paralysis and sensory loss** (Rutherford Class III - irreversible ischemia, limb is non-viable)\n• **Profound systemic toxicity**: hyperkalemia, severe metabolic acidosis, and acute renal failure (myonephropathic syndrome)\n• Demarcated mottling that is non-blanching\n• Compartment syndrome development post-reperfusion",
      "id": "• **Paralisis total dan hilangnya sensasi** (Rutherford Kelas III - iskemia ireversibel, tungkai tidak layak diselamatkan)\n• **Toksisitas sistemik yang mendalam**: hiperkalemia, asidosis metabolik berat, dan gagal ginjal akut (sindrom mionefropati)\n• Mottling yang terdemarkasi dan tidak memucat saat ditekan (non-blanching)\n• Perkembangan sindrom kompartemen pasca-reperfusi"
    },
    "management": {
      "initialTreatment": {
        "en": "• Initiate **IV Unfractionated Heparin** immediately (80 U/kg bolus followed by 18 U/kg/h infusion) to prevent thrombus propagation\n• Place limb in a **dependent position** (neutral or slightly down, do not elevate or apply heat/cold)\n• Provide aggressive pain management with IV opioids\n• Ensure adequate hydration with IV crystalloids to protect renal function",
        "id": "• Segera mulai **Heparin IV Tidak Terfraksinasi** (bolus 80 U/kg diikuti infus 18 U/kg/jam) untuk mencegah perambatan trombus\n• Posisikan tungkai dalam posisi **dependen** (netral atau sedikit ke bawah, jangan dielevasi atau diberi panas/dingin)\n• Berikan manajemen nyeri yang agresif dengan opioid IV\n• Pastikan hidrasi yang adekuat dengan kristaloid IV untuk melindungi fungsi ginjal"
      },
      "definitiveTreatment": {
        "en": "• Urgent **Endovascular Intervention** by Interventional Radiology (IR):\n  - **Catheter-Directed Thrombolysis (CDT)**: local infusion of Alteplase/rtPA directly into the clot for viable/threatened limbs (Rutherford I & IIa)\n  - **Percutaneous Mechanical Thrombectomy (PMT)**: rapid clot removal using mechanical devices (e.g. AngioJet, Penumbra)\n• Surgical revascularization (fogarty catheter embolectomy, bypass) if endovascular access is unavailable or contraindicated\n• Perform urgent **amputation** if limb is determined non-viable (Rutherford Class III) to avoid fatal systemic reperfusion injury",
        "id": "• **Intervensi Endovaskular** darurat oleh Radiologi Intervensi (IR):\n  - **Catheter-Directed Thrombolysis (CDT)**: infus lokal Alteplase/rtPA langsung ke dalam bekuan darah untuk tungkai yang masih viable/terancam (Rutherford I & IIa)\n  - **Percutaneous Mechanical Thrombectomy (PMT)**: pembuangan cepat bekuan darah menggunakan perangkat mekanis (misal: AngioJet, Penumbra)\n• Revaskularisasi bedah (embolektomi kateter Fogarty, bypass) jika akses endovaskular tidak tersedia atau kontraindikasi\n• Lakukan **amputasi** darurat jika tungkai diputuskan tidak viable (Rutherford Kelas III) untuk menghindari cedera reperfusi sistemik yang fatal"
      },
      "workup": {
        "en": "• Urgent bilateral ankle-brachial index (ABI) and continuous pulse oximetry monitoring\n• Post-procedure surveillance of distal pulses via Doppler ultrasound\n• Monitor serum potassium, creatine kinase, and creatinine hourly post-reperfusion to detect reperfusion injury",
        "id": "• Pengukuran ankle-brachial index (ABI) bilateral darurat dan pemantauan oksimetri nadi kontinu\n• Surveilans denyut nadi perifer distal pasca-prosedur menggunakan USG Doppler\n• Pantau kalium serum, kreatin kinase, dan kreatinin setiap jam pasca-reperfusi untuk mendeteksi cedera reperfusi"
      },
      "rehab": {
        "en": "• Early mobilization after hemostasis of arterial access site is achieved\n• Physical therapy to restore muscle strength and range of motion in the ischemic limb",
        "id": "• Mobilisasi dini setelah hemostasis di lokasi akses arteri tercapai\n• Terapi fisik untuk memulihkan kekuatan otot dan rentang gerak pada tungkai yang terkena iskemia"
      },
      "referral": {
        "en": "• Emergency consult to **Interventional Radiology** for catheter-based intervention, and **Vascular Surgery** for hybrid or surgical revascularization",
        "id": "• Konsultasi darurat ke **Radiologi Intervensi** untuk intervensi berbasis kateter, dan **Bedah Vaskular** untuk revaskularisasi hibrida atau bedah"
      }
    },
    "followUp": {
      "en": "• Clinical review in **1-2 weeks** to assess vascular patency, wound healing of access sites, and resolve residual neuropathy\n• Serial ankle-brachial index (ABI) measurements and duplex ultrasound surveillance at 1, 3, 6, and 12 months",
      "id": "• Evaluasi klinis dalam **1-2 minggu** untuk menilai patensi pembuluh darah, penyembuhan luka akses arteri, dan memulihkan neuropati sisa\n• Pengukuran ankle-brachial index (ABI) serial dan surveilans USG duplex pada 1, 3, 6, dan 12 bulan"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Long-term antiplatelet therapy (**Aspirin 81-100 mg daily** or **Clopidogrel 75 mg daily**)\n• High-intensity statin therapy (e.g. Atorvastatin 40-80 mg daily) for cardiovascular risk reduction\n• Therapeutic anticoagulation (e.g. Warfarin or DOAC) if the source is embolic (e.g., Atrial Fibrillation)",
        "id": "• Terapi antiplatelet jangka panjang (**Aspirin 81-100 mg sehari** atau **Klopidogrel 75 mg sehari**)\n• Terapi statin intensitas tinggi (misal: Atorvastatin 40-80 mg sehari) untuk reduksi risiko kardiovaskular\n• Antikoagulan terapeutik (misal: Warfarin atau DOAC) jika sumbernya adalah emboli (misal: Fibrilasi Atrium)"
      },
      "nonPharmacological": {
        "en": "• Absolute **smoking cessation**\n• Strict control of diabetes mellitus (HbA1c < 7.0%), hypertension, and hyperlipidemia\n• Regular walking program to stimulate collateral vessel formation",
        "id": "• **Berhenti merokok secara total**\n• Kontrol ketat diabetes melitus (HbA1c < 7,0%), hipertensi, dan hiperlipidemia\n• Program jalan kaki teratur untuk merangsang pembentukan pembuluh darah kolateral"
      }
    },
    "caseExample": {
      "en": "A 68-year-old male with a history of poorly controlled atrial fibrillation presents with a sudden onset of severe, excruciating pain and coldness in his right leg for 4 hours. On examination, the right leg is pale, cold to the touch, with a complete loss of sensation and mild motor weakness in his right foot (Rutherford Class IIb). Dorsalis pedis and posterior tibial pulses are completely absent. Urgently performed CT Angiography reveals an acute embolic occlusion at the bifurcation of the right common femoral artery. He is immediately heparinized. Interventional Radiology performs emergency **Percutaneous Mechanical Thrombectomy** using an AngioJet catheter and initiates local **Catheter-Directed Thrombolysis (rtPA)**. Within 6 hours, complete flow is restored, right foot sensation and motor function return to normal, and a strong dorsalis pedis pulse is palpable.",
      "id": "Seorang pria 68 tahun dengan riwayat fibrilasi atrium yang tidak terkontrol datang dengan onset mendadak nyeri hebat yang menyiksa dan rasa dingin pada tungkai kanan sejak 4 jam lalu. Pada pemeriksaan, tungkai kanan tampak pucat, dingin saat disentuh, disertai hilangnya sensasi sensorik total dan kelemahan motorik ringan pada kaki kanan (Rutherford Kelas IIb). Denyut nadi dorsalis pedis dan tibialis posterior menghilang total. CT Angiografi darurat menunjukkan oklusi emboli akut pada bifurkasio arteri femoralis komunis kanan. Pasien segera diberikan heparin IV. Radiologi Intervensi melakukan **Percutaneous Mechanical Thrombectomy** darurat menggunakan kateter AngioJet dan memulai **Catheter-Directed Thrombolysis (rtPA)** lokal. Dalam 6 jam, aliran darah pulih sepenuhnya, sensasi dan fungsi motorik kaki kanan kembali normal, serta denyut nadi dorsalis pedis teraba kuat."
    },
    "references": {
      "en": "• 2016 AHA/ACC Guideline on the Management of Patients With Peripheral Arterial Disease (Circulation 2017)\n• Gerhard-Herman MD, et al. Circulation. 2017;135(11):e726-e779",
      "id": "• Pedoman AHA/ACC 2016 tentang Manajemen Pasien dengan Penyakit Arteri Perifer (Circulation 2017)\n• Gerhard-Herman MD, et al. Circulation. 2017;135(11):e726-e779"
    },
    "id": 18,
    "content": {
      "en": "Acute Limb Ischemia (ALI) is defined as a sudden decrease in limb perfusion that causes a potential threat to limb viability. It is a medical emergency requiring rapid diagnosis and revascularization to prevent amputation and systemic complications.",
      "id": "Iskemia Tungkai Akut (ALI) didefinisikan sebagai penurunan mendadak perfusi tungkai yang menyebabkan ancaman potensial terhadap viabilitas ekstremitas. Ini adalah keadaan darurat medis yang memerlukan diagnosis cepat dan revaskularisasi untuk mencegah amputasi serta komplikasi sistemik."
    }
  },
  {
    "title": {
      "en": "Anaphylaxis Emergency Management",
      "id": "Penatalaksanaan Darurat Anafilaksis"
    },
    "category": "Emergency",
    "isStructured": true,
    "definition": {
      "en": "Anaphylaxis is a severe, life-threatening systemic hypersensitivity reaction characterized by rapid onset of airway, breathing, or circulatory problems, usually associated with skin and mucosal changes.",
      "id": "Anafilaksis adalah reaksi hipersensitivitas sistemik yang parah dan mengancam jiwa yang ditandai oleh onset cepat masalah jalan napas, pernapasan, atau sirkulasi, biasanya disertai perubahan kulit dan mukosa."
    },
    "symptoms": {
      "en": "• Rapid onset of **dyspnea**, **wheezing**, and **stridor**\n• Throat tightness and difficulty swallowing\n• **Urticaria** and **angioedema** (swelling of lips, tongue, eyelids)\n• Dizziness, confusion, and feeling of impending doom\n• Abdominal cramps, nausea, and vomiting\n• **Hypotension** and **tachycardia**",
      "id": "• Onset cepat dari **sesak napas**, **mengi (wheezing)**, dan **stridor**\n• Rasa terikat di tenggorokan dan kesulitan menelan\n• **Urtikaria (biduran)** dan **angioedema** (bengkak pada bibir, lidah, kelopak mata)\n• Pusing, kebingungan, dan perasaan terancam bahaya maut\n• Kram perut, mual, dan muntah\n• **Hipotensi** dan **takikardia**"
    },
    "physicalExamination": {
      "en": "• Hypotension, tachycardia, tachypnea, cyanosis\n• Upper airway stridor, expiratory wheezing, or decreased breath sounds\n• Warm, flushed skin or urticarial rash and soft tissue edema\n• Altered mental status secondary to cerebral hypoperfusion",
      "id": "• Hipotensi, takikardia, takipnea, sianosis\n• Stridor jalan napas atas, mengi ekspirasi, atau suara napas menurun\n• Kulit hangat kemerahan atau ruam urtikaria dan edema jaringan lunak\n• Penurunan kesadaran sekunder akibat hipoperfusi serebral"
    },
    "labFindings": {
      "en": "• Clinical diagnosis; do not delay treatment. **Serum tryptase levels** (measured **1-2 hours** after onset) can retrospectively confirm the diagnosis.",
      "id": "• Diagnosis klinis; jangan menunda pengobatan. **Kadar triptase serum** (diukur **1-2 jam** setelah onset) dapat mengonfirmasi diagnosis secara retrospektif."
    },
    "differentialDiagnosis": {
      "en": "• Severe Acute Asthma\n• Vasovagal Syncope\n• Panic Attack / Hyperventilation\n• Foreign Body Airway Obstruction",
      "id": "• Asma Akut Berat\n• Sinkop Vasovagal\n• Serangan Panik / Hiperventilasi\n• Obstruksi Jalan Napas Benda Asing"
    },
    "dangerSigns": {
      "en": "• Stridor, severe wheezing, or silent chest\n• Oxygen saturation **<92%** on room air\n• Hypotension **(systolic BP <90 mmHg)**\n• Bradycardia (late sign of impending arrest)\n• Refractory symptoms after **2 doses** of Epinephrine",
      "id": "• Stridor, mengi berat, atau silent chest\n• Saturasi oksigen **<92%** pada udara ruangan\n• Hipotensi **(TD sistolik <90 mmHg)**\n• Bradikardia (tanda lanjut ancaman henti jantung)\n• Gejala refrakter setelah pemberian **2 dosis** Epinefrin"
    },
    "management": {
      "initialTreatment": {
        "en": "• Administer **Epinephrine IM 1:1000 (0.3-0.5 mg)** immediately in the anterolateral thigh\n• Establish airway and provide **high-flow oxygen**\n• Position patient flat with **legs elevated** to restore venous return\n• Start **IV fluid resuscitation** with Normal Saline **1-2 L**",
        "id": "• Segera berikan **Epinefrin IM 1:1000 (0,3-0,5 mg)** di paha anterolateral\n• Amankan jalan napas dan berikan **oksigen aliran tinggi**\n• Baringkan pasien terlentang dengan **kaki ditinggikan** untuk memulihkan aliran balik vena\n• Mulai **resusitasi cairan IV** dengan Normal Salin **1-2 L**"
      },
      "definitiveTreatment": {
        "en": "• Repeat Epinephrine every **5-15 minutes** if symptoms are refractory\n• Administer adjunctive **IV/PO antihistamines** (H1 blocker Diphenhydramine 25-50 mg, H2 blocker Ranitidine 50 mg)\n• Start **systemic corticosteroids** (Methylprednisolone 125 mg IV or Hydrocortisone 200 mg IV) to prevent biphasic reactions\n• Provide inhaled beta-agonists (Albuterol/Salbutamol) for bronchospasm",
        "id": "• Ulangi Epinefrin setiap **5-15 menit** jika gejala masih refrakter\n• Berikan **antihistamin IV/PO** tambahan (penghambat H1 Difenhidramin 25-50 mg, penghambat H2 Ranitidin 50 mg)\n• Mulai **kortikosteroid sistemik** (Metilprednisolon 125 mg IV atau Hidrokortison 200 mg IV) untuk mencegah reaksi bifasik\n• Berikan beta-agonis inhalasi (Albuterol/Salbutamol) untuk bronkospasme"
      },
      "rehab": {
        "en": "• Ensure patient and family are thoroughly educated on allergen avoidance and how to use an epinephrine auto-injector",
        "id": "• Pastikan pasien dan keluarga diedukasi dengan teliti mengenai penghindaran alergen dan cara menggunakan auto-injektor epinefrin"
      },
      "referral": {
        "en": "• Refer to an **Allergist/Immunologist** for comprehensive allergy testing and action plan formulation",
        "id": "• Rujuk ke **Spesialis Alergi/Imunologi** untuk tes alergi komprehensif dan penyusunan rencana tindakan"
      },
      "workup": {
        "en": "• Continuous blood pressure, ECG, and pulse oximetry monitoring for at least **4-8 hours** post-resolution",
        "id": "• Pemantauan tekanan darah, EKG, dan oksimetri nadi kontinu selama minimal **4-8 jam** pasca-resolusi"
      }
    },
    "followUp": {
      "en": "• Clinic follow-up in **1-2 weeks**; provide a prescription for **two Epinephrine auto-injectors** (e.g. EpiPen)",
      "id": "• Kontrol klinik dalam **1-2 minggu**; berikan resep untuk **dua buah auto-injektor Epinefrin** (misal: EpiPen)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Prescription of **Epinephrine auto-injectors**\n• Immunotherapy (desensitization) for specific allergens like insect venom",
        "id": "• Peresepan **auto-injektor Epinefrin**\n• Imunoterapi (desensitisasi) untuk alergen spesifik seperti bisa serangga"
      },
      "nonPharmacological": {
        "en": "• Strict avoidance of known allergen triggers\n• Wearing medical alert jewelry at all times",
        "id": "• Penghindaran ketat terhadap pemicu alergen yang diketahui\n• Mengenakan gelang penanda medis setiap saat"
      }
    },
    "caseExample": {
      "en": "A 28-year-old female presents to the ER with sudden onset generalized hives, lip swelling, severe wheezing, and a blood pressure of **82/46 mmHg**, 15 minutes after eating a cookie containing nuts. She was immediately given **IM Epinephrine 0.3 mg**, laid flat with elevated legs, and started on high-flow oxygen and normal saline IV. Her symptoms resolved after a single dose, and she was observed for **6 hours** before discharge with an EpiPen prescription.",
      "id": "Seorang wanita 28 tahun datang ke UGD dengan gatal-gatal seluruh tubuh mendadak, bibir bengkak, mengi berat, dan tekanan darah **82/46 mmHg**, 15 menit setelah makan kue kering yang mengandung kacang. Pasien segera diberikan **Epinefrin IM 0.3 mg**, dibaringkan terlentang dengan kaki ditinggikan, serta diberikan oksigen aliran tinggi dan infus normal salin. Gejalanya mereda setelah satu dosis, dan diobservasi selama **6 jam** sebelum dipulangkan dengan resep EpiPen."
    },
    "references": {
      "en": "• World Allergy Organization Anaphylaxis Guidelines 2020 (WAO Journal 2020)\n• Cardona V, et al. World Allergy Organ J. 2020;13(10):100472",
      "id": "• Pedoman Anafilaksis Organisasi Alergi Dunia 2020 (WAO Journal 2020)\n• Cardona V, et al. World Allergy Organ J. 2020;13(10):100472"
    },
    "id": 19,
    "content": {
      "en": "Anaphylaxis is a severe, life-threatening systemic hypersensitivity reaction characterized by rapid onset of airway, breathing, or circulatory problems, usually associated with skin and mucosal changes.",
      "id": "Anafilaksis adalah reaksi hipersensitivitas sistemik yang parah dan mengancam jiwa yang ditandai oleh onset cepat masalah jalan napas, pernapasan, atau sirkulasi, biasanya disertai perubahan kulit dan mukosa."
    }
  },
  {
    "title": {
      "en": "Status Asthmaticus Management",
      "id": "Penatalaksanaan Status Astmatikus"
    },
    "category": "Pulmonology",
    "isStructured": true,
    "definition": {
      "en": "Status asthmaticus is an acute, severe asthma exacerbation that does not respond to initial standard bronchodilator therapy and represents a life-threatening medical emergency.",
      "id": "Status astmatikus adalah eksaserbasi asma akut berat yang tidak merespons terapi bronkodilator standar awal dan merupakan keadaan darurat medis yang mengancam jiwa."
    },
    "symptoms": {
      "en": "• Severe dyspnea, orthopnea, and chest tightness\n• **Inability to speak in full sentences** due to breathlessness\n• Agitation, confusion, or extreme exhaustion\n• Persistent dry cough",
      "id": "• Sesak napas berat, ortopnea, dan dada terasa terikat\n• **Ketidakmampuan berbicara dalam kalimat utuh** akibat sesak\n• Gelisah, kebingungan, atau kelelahan luar biasa\n• Batuk kering persisten"
    },
    "physicalExamination": {
      "en": "• Tachypnea **(>30/min)** and tachycardia **(>120 bpm)**\n• Accessory muscle use and intercostal retractions\n• Loud expiratory/inspiratory wheezing or **'silent chest'**\n• Pulsus paradoxus **(>20 mmHg)** and diaphoresis",
      "id": "• Takipnea **(>30 x/menit)** dan takikardia **(>120 x/menit)**\n• Penggunaan otot bantu napas dan retraksi interkostal\n• Mengi inspirasi/ekspirasi nyaring atau **'silent chest'**\n• Pulsus paradoksus **(>20 mmHg)** dan diaforesis"
    },
    "labFindings": {
      "en": "• Peak Expiratory Flow (PEF) **<50% predicted**\n• ABG showing hypoxia and a dangerous transition to **normal/elevated PaCO2** indicating respiratory muscle fatigue\n• Elevated serum lactic acid",
      "id": "• Peak Expiratory Flow (PEF) **<50% nilai prediksi**\n• AGD menunjukkan hipoksia dan transisi berbahaya ke **PaCO2 normal/meningkat** yang menunjukkan kelelahan otot napas\n• Peningkatan asam laktat serum"
    },
    "differentialDiagnosis": {
      "en": "• Acute COPD Exacerbation\n• Acute Decompensated Heart Failure (Cardiac Asthma)\n• Upper Airway Foreign Body Obstruction\n• Pulmonary Embolism",
      "id": "• Eksaserbasi PPOK Akut\n• Gagal Jantung Dekompensasi Akut (Asma Kardial)\n• Obstruksi Benda Asing Jalan Napas Atas\n• Emboli Paru"
    },
    "dangerSigns": {
      "en": "• **Silent chest** (complete absence of wheezing)\n• Cyanosis or SpO2 **<90%** on high-flow oxygen\n• Somnolence, confusion, or exhaustion\n• Bradycardia",
      "id": "• **Silent chest** (mengi menghilang sama sekali)\n• Sianosis atau SpO2 **<90%** pada oksigen aliran tinggi\n• Somnolen, kebingungan, atau kelelahan luar biasa\n• Bradikardia"
    },
    "management": {
      "initialTreatment": {
        "en": "• Administer **high-flow oxygen** to maintain SpO2 **93-95%**\n• Continuous nebulized **SABA (Salbutamol 2.5-5 mg)** combined with **Ipratropium (0.5 mg)** every 20 minutes for 3 doses\n• Start **systemic corticosteroids** immediately: **IV Methylprednisolone 60-125 mg** or **IV Hydrocortisone 200 mg**",
        "id": "• Berikan **oksigen aliran tinggi** untuk mempertahankan SpO2 **93-95%**\n• Nebulisasi kontinu **SABA (Salbutamol 2,5-5 mg)** dikombinasikan dengan **Ipratropium (0,5 mg)** setiap 20 menit sebanyak 3 dosis\n• Segera mulai **kortikosteroid sistemik**: **IV Metilprednisolon 60-125 mg** atau **IV Hidrokortison 200 mg**"
      },
      "definitiveTreatment": {
        "en": "• Administer **IV Magnesium Sulfate 2 g** over 20 minutes for refractory bronchospasm\n• Consider subcutaneous **Terbutaline 0.25 mg** or IM Epinephrine\n• Initiate Non-Invasive Positive Pressure Ventilation (NIPPV) or emergency endotracheal intubation if respiratory failure occurs",
        "id": "• Berikan **IV Magnesium Sulfat 2 g** selama 20 menit untuk bronkospasme refrakter\n• Pertimbangkan **Terbutalin subkutan 0,25 mg** atau Epinefrin IM\n• Mulai ventilasi tekanan positif non-invasif (NIPPV) atau intubasi endotrakeal darurat jika terjadi gagal napas"
      },
      "rehab": {
        "en": "• Pulmonary rehabilitation post-discharge, focusing on breathing control and correct inhaler technique",
        "id": "• Rehabilitasi paru pasca-pemulangan, berfokus pada kontrol pernapasan dan perbaikan teknik inhaler"
      },
      "referral": {
        "en": "• Admit to **ICU** for impending respiratory failure. Refer to Pulmonologist for outpatient follow-up plan",
        "id": "• Rawat di **ICU** jika ada ancaman gagal napas. Rujuk ke Spesialis Paru untuk rencana tindak lanjut rawat jalan"
      },
      "workup": {
        "en": "• Serial PEF measurements, continuous pulse oximetry, serial ABG, chest X-ray to rule out pneumothorax",
        "id": "• Pengukuran PEF serial, oksimetri nadi kontinu, AGD serial, rontgen dada untuk menyingkirkan pneumotoraks"
      }
    },
    "followUp": {
      "en": "• Follow up in **2-7 days** post-discharge; provide a written **Asthma Action Plan** and oral corticosteroid course (Prednisone 40-50 mg daily for 5-7 days)",
      "id": "• Kontrol dalam **2-7 hari** pasca-pulang; berikan **Rencana Aksi Asma** tertulis dan satu siklus kortikosteroid oral (Prednison 40-50 mg sehari selama 5-7 hari)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Consistent use of daily **inhaled corticosteroids (ICS) or ICS-LABA**\n• Annual **influenza vaccine**",
        "id": "• Penggunaan konsisten **kortikosteroid inhalasi (ICS) atau ICS-LABA** harian\n• Vaksinasi **influenza tahunan**"
      },
      "nonPharmacological": {
        "en": "• Strict avoidance of asthma triggers (smoke, allergens, extreme cold)\n• Daily monitoring of peak expiratory flow (PEF)",
        "id": "• Penghindaran ketat terhadap pemicu asma (asap, alergen, dingin ekstrem)\n• Pemantauan harian arus puncak ekspirasi (PEF)"
      }
    },
    "caseExample": {
      "en": "A 19-year-old male with a history of severe asthma presents to the ER with extreme shortness of breath, only able to speak in single words, and accessory muscle use. Despite taking his albuterol inhaler 10 times at home, his chest is quiet with minimal air entry. He was started on continuous albuterol-ipratropium nebulization, received IV Methylprednisolone 125 mg, and IV Magnesium Sulfate 2 g over 20 mins. His peak flow improved from 120 L/min to 280 L/min, and he was admitted for observation.",
      "id": "Seorang pemuda 19 tahun dengan riwayat asma berat datang ke UGD dengan sesak napas ekstrem, hanya mampu berbicara satu kata, dan menggunakan otot bantu napas. Meskipun telah menggunakan inhaler albuterol 10 kali di rumah, dadanya terdengar sunyi (silent chest) dengan aliran udara minimal. Ia segera mulai dinebulisasi albuterol-ipratropium secara kontinu, menerima Metilprednisolon IV 125 mg, dan Magnesium Sulfat IV 2 g selama 20 menit. Arus puncak ekspirasi membaik dari 120 L/menit menjadi 280 L/menit, dan ia dirawat inap untuk observasi."
    },
    "references": {
      "en": "• Global Initiative for Asthma (GINA) 2023 Executive Summary (Eur Respir J 2023)\n• Reddel HK, et al. Global Initiative for Asthma, 2023",
      "id": "• Ringkasan Eksekutif Global Initiative for Asthma (GINA) 2023 (Eur Respir J 2023)\n• Reddel HK, et al. Global Initiative for Asthma, 2023"
    },
    "id": 20,
    "content": {
      "en": "Status asthmaticus is an acute, severe asthma exacerbation that does not respond to initial standard bronchodilator therapy and represents a life-threatening medical emergency.",
      "id": "Status astmatikus adalah eksaserbasi asma akut berat yang tidak merespons terapi bronkodilator standar awal dan merupakan keadaan darurat medis yang mengancam jiwa."
    }
  },
  {
    "title": {
      "en": "Septic Shock Management Protocol",
      "id": "Protokol Penatalaksanaan Syok Septik"
    },
    "category": "Critical Care",
    "isStructured": true,
    "definition": {
      "en": "Septic shock is a subset of sepsis in which particularly profound circulatory, cellular, and metabolic abnormalities are associated with a greater risk of mortality than with sepsis alone, characterized by persistent hypotension requiring vasopressors to maintain MAP >= 65 mmHg and serum lactate > 2 mmol/L despite adequate fluid resuscitation.",
      "id": "Syok septik adalah subset dari sepsis di mana kelainan sirkulasi, seluler, dan metabolik yang sangat mendalam dikaitkan dengan risiko kematian yang lebih besar daripada sepsis saja, ditandai oleh hipotensi persisten yang memerlukan vasopresor untuk mempertahankan MAP >= 65 mmHg dan laktat serum > 2 mmol/L meskipun telah dilakukan resusitasi cairan yang adekuat."
    },
    "symptoms": {
      "en": "• Fever or hypothermia, severe chills, and tachypnea\n• **Confusion** or altered mental status\n• Extreme weakness, oliguria, or anuria\n• Cold and clammy skin or warm flushed skin (early distributive phase)",
      "id": "• Demam atau hipotermia, menggigil hebat, dan takipnea\n• **Kebingungan** atau penurunan kesadaran\n• Kelemahan ekstrem, oliguria, atau anuria\n• Kulit dingin basah atau hangat kemerahan (fase awal distributif)"
    },
    "physicalExamination": {
      "en": "• Hypotension **(SBP <90 mmHg, MAP <65 mmHg)** and tachycardia **(>100 bpm)**\n• Tachypnea **(>22/min)**\n• Fever **(>38.0°C)** or hypothermia **(<36.0°C)**\n• Delayed capillary refill **(>2s)** or bounding pulses, dry mucous membranes",
      "id": "• Hipotensi **(TDS <90 mmHg, MAP <65 mmHg)** dan takikardia **(>100 x/menit)**\n• Takipnea **(>22 x/menit)**\n• Demam **(>38,0°C)** atau hipotermia **(<36,0°C)**\n• Capillary refill time memanjang **(>2 detik)** atau nadi kuat/cepat, mukosa kering"
    },
    "labFindings": {
      "en": "• Serum lactate **>2.0 mmol/L**\n• Leukocytosis **(>12,000/uL)** or leukopenia **(<4,000/uL)**\n• Thrombocytopenia, elevated creatinine, elevated procalcitonin or CRP\n• Metabolic acidosis with elevated anion gap",
      "id": "• Laktat serum **>2.0 mmol/L**\n• Leukositosis **(>12.000/uL)** atau leukopenia **(<4.000/uL)**\n• Trombositopenia, kreatinin meningkat, prokalsitonin atau CRP meningkat\n• Asidosis metabolik dengan peningkatan anion gap"
    },
    "differentialDiagnosis": {
      "en": "• Hypovolemic Shock\n• Cardiogenic Shock\n• Anaphylactic Shock\n• Acute Adrenal Crisis\n• Acute Pulmonary Embolism",
      "id": "• Syok Hipovolemik\n• Syok Kardiogenik\n• Syok Anafilaktik\n• Krisis Adrenal Akut\n• Emboli Paru Akut"
    },
    "dangerSigns": {
      "en": "• Persistent hypotension despite fluid challenge\n• Severe lactic acidosis **(lactate >4.0 mmol/L)**\n• Obtundation, coma, or anuria\n• Refractory hypoxemia",
      "id": "• Hipotensi persisten meskipun telah diberikan cairan\n• Asidosis laktat berat **(laktat >4,0 mmol/L)**\n• Obtundasi, koma, atau anuria\n• Hipoksemia refrakter"
    },
    "management": {
      "initialTreatment": {
        "en": "• Measure lactate level immediately. Obtain blood cultures before administering antibiotics.\n• Administer broad-spectrum **IV antibiotics (e.g. Piperacillin-Tazobactam 4.5g IV)** within **1 hour** of recognition\n• Rapidly infuse **30 mL/kg** of IV crystalloid fluid (Normal Saline or Balanced Crystalloids) within the first 3 hours",
        "id": "• Ukur kadar laktat segera. Lakukan kultur darah sebelum pemberian antibiotik.\n• Berikan **antibiotik IV spektrum luas (misal: Piperasilin-Tazobaktam 4,5g IV)** dalam **1 jam** setelah dikenali\n• Infuskan secara cepat **30 mL/kg** cairan kristaloid IV (Normal Salin atau Kristaloid Seimbang) dalam 3 jam pertama"
      },
      "definitiveTreatment": {
        "en": "• If hypotension persists during or after fluid resuscitation: Start **Norepinephrine** (first choice vasopressor) titrated to maintain **MAP >= 65 mmHg**\n• Add **Vasopressin** if MAP remains low; add Dobutamine if myocardial dysfunction is present\n• Control the infectious source (e.g. abscess drainage, debridement) within **12 hours**\n• Consider low-dose **IV Hydrocortisone (200 mg/day)** for refractory shock",
        "id": "• Jika hipotensi menetap selama atau setelah resusitasi cairan: Segera mulai **Norepinefrin** (vasopresor pilihan pertama) dititrasi untuk mempertahankan **MAP >= 65 mmHg**\n• Tambahkan **Vasopresin** jika MAP tetap rendah; tambahkan Dobutamin jika terdapat disfungsi miokard\n• Kendalikan sumber infeksi (misal: drainase abses, debridemen) dalam **12 jam**\n• Pertimbangkan **IV Hidrokortison dosis rendah (200 mg/hari)** untuk syok refrakter"
      },
      "rehab": {
        "en": "• Post-intensive care syndrome (PICS) prevention: early mobilization in the ICU, physical therapy, and nutritional support",
        "id": "• Pencegahan post-intensive care syndrome (PICS): mobilisasi dini di ICU, terapi fisik, dan dukungan nutrisi"
      },
      "referral": {
        "en": "• Admit to **Intensive Care Unit (ICU)** immediately. Consult Infectious Diseases, General Surgery, or Interventional Radiology for source control",
        "id": "• Segera rawat di **Unit Perawatan Intensif (ICU)**. Konsultasikan dengan Spesialis Penyakit Dalam/Tropik Infeksi, Bedah Umum, atau Radiologi Intervensi untuk pengendalian sumber"
      },
      "workup": {
        "en": "• Continuous invasive arterial blood pressure monitoring, central venous pressure and ScvO2 monitoring, serial lactate every 2-4 hours",
        "id": "• Pemantauan tekanan darah arterial invasif kontinu, pemantauan tekanan vena sentral dan ScvO2, laktat serial setiap 2-4 jam"
      }
    },
    "followUp": {
      "en": "• Regular post-ICU clinical review; monitor renal function, resolve anemia, support psychological health (depression/PTSD screening)",
      "id": "• Peninjauan klinis pasca-ICU secara berkala; pantau fungsi ginjal, atasi anemia, dukung kesehatan psikologis (skrining depresi/PTSD)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Vigilant vaccine adherence (Pneumococcal, Influenza, COVID-19)\n• Appropriate and timely prophylactic antibiotics for high-risk surgical procedures",
        "id": "• Kepatuhan vaksinasi yang ketat (Pneumokokus, Influenza, COVID-19)\n• Antibiotik profilaksis yang tepat dan tepat waktu untuk prosedur bedah berisiko tinggi"
      },
      "nonPharmacological": {
        "en": "• Hand hygiene, proper wound care, aseptic technique for all invasive procedures and catheter insertions",
        "id": "• Kebersihan tangan (hand hygiene), perawatan luka yang tepat, teknik aseptik untuk semua prosedur invasif dan pemasangan kateter"
      }
    },
    "caseExample": {
      "en": "A 67-year-old male with a history of benign prostatic hyperplasia presents with confusion, fever (39.1C), and hypotension (84/40 mmHg). Heart rate is 115 bpm, respiratory rate 24/min. Urinalysis shows pyuria. Blood cultures and urine cultures are drawn. He is given 2 L of normal saline and IV Ceftriaxone. Despite fluid resuscitation, his blood pressure remains 86/42 mmHg and serum lactate is 3.5 mmol/L. He is started on IV Norepinephrine infusion titrated to maintain MAP >= 65 mmHg and transferred to the ICU.",
      "id": "Seorang pria 67 tahun dengan riwayat hiperplasia prostat jinak datang dengan kebingungan, demam (39,1C), dan hipotensi (84/40 mmHg). Denyut jantung 115 x/menit, frekuensi napas 24 x/menit. Urinalisis menunjukkan piuria. Kultur darah dan urin diambil. Pasien diberikan 2 L normal salin dan Ceftriaxone IV. Meskipun telah dilakukan resusitasi cairan, tekanan darah tetap 86/42 mmHg dan laktat serum 3,5 mmol/L. Ia mulai diberikan infus Norepinefrin IV yang dititrasi untuk mempertahankan MAP >= 65 mmHg dan dipindahkan ke ICU."
    },
    "references": {
      "en": "• Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021 (Intensive Care Med 2021)\n• Evans L, et al. Intensive Care Med. 2021;47(11):1181-1247",
      "id": "• Kampanye Surviving Sepsis: Pedoman Internasional untuk Manajemen Sepsis dan Syok Septik 2021 (Intensive Care Med 2021)\n• Evans L, et al. Intensive Care Med. 2021;47(11):1181-1247"
    },
    "id": 21,
    "content": {
      "en": "Septic shock is a subset of sepsis in which particularly profound circulatory, cellular, and metabolic abnormalities are associated with a greater risk of mortality than with sepsis alone, characterized by persistent hypotension requiring vasopressors to maintain MAP >= 65 mmHg and serum lactate > 2 mmol/L despite adequate fluid resuscitation.",
      "id": "Syok septik adalah subset dari sepsis di mana kelainan sirkulasi, seluler, dan metabolik yang sangat mendalam dikaitkan dengan risiko kematian yang lebih besar daripada sepsis saja, ditandai oleh hipotensi persisten yang memerlukan vasopresor untuk mempertahankan MAP >= 65 mmHg dan laktat serum > 2 mmol/L meskipun telah dilakukan resusitasi cairan yang adekuat."
    }
  },
  {
    "title": {
      "en": "Acute Myocardial Infarction (STEMI/NSTEMI)",
      "id": "Infark Miokard Akut (STEMI/NSTEMI)"
    },
    "category": "Cardiology",
    "isStructured": true,
    "definition": {
      "en": "Acute myocardial infarction (AMI) is myocardial necrosis resulting from acute obstruction of a coronary artery, classified into ST-segment elevation myocardial infarction (STEMI) or non-ST-segment elevation myocardial infarction (NSTEMI) based on ECG changes.",
      "id": "Infark miokard akut (IMA) adalah nekrosis miokard yang disebabkan oleh obstruksi akut arteri koroner, diklasifikasikan menjadi infark miokard dengan elevasi segmen ST (STEMI) atau infark miokard tanpa elevasi segmen ST (NSTEMI) berdasarkan perubahan EKG."
    },
    "symptoms": {
      "en": "• Crushing retrosternal chest pain or pressure ('elephant sitting on chest')\n• Pain radiating to **left arm**, neck, jaw, or back\n• Pain lasting **>20 minutes**, refractory to rest\n• Diaphoresis, dyspnea, nausea, vomiting, or lightheadedness",
      "id": "• Nyeri dada retrosternal seperti ditekan atau diremas ('seperti ditindih gajah')\n• Nyeri menjalar ke **lengan kiri**, leher, rahang, atau punggung\n• Nyeri berlangsung **>20 menit**, tidak mereda dengan istirahat\n• Diaforesis (keringat dingin), sesak napas, mual, muntah, atau pusing"
    },
    "physicalExamination": {
      "en": "• Anxiety, pale and diaphoretic skin\n• Hypertension or hypotension, tachycardia or bradycardia\n• Auscultation: S4 gallop, new mitral regurgitation murmur, or pulmonary rales (heart failure)",
      "id": "• Gelisah, kulit pucat dan berkeringat dingin\n• Hipertensi atau hipotensi, takikardia atau bradikardia\n• Auskultasi: gallop S4, bising regurgitasi mitral baru, atau ronkhi basah paru (gagal jantung)"
    },
    "labFindings": {
      "en": "• Elevated cardiac biomarkers: **Troponin I or T** (rising within **2-4 hours**, peaking at 24 hours)\n• Elevated CK-MB\n• Mild leukocytosis and hyperglycemia",
      "id": "• Biomarker jantung meningkat: **Troponin I atau T** (meningkat dalam **2-4 jam**, memuncak pada 24 jam)\n• CK-MB meningkat\n• Leukositosis dan hiperglikemia ringan"
    },
    "differentialDiagnosis": {
      "en": "• Aortic Dissection\n• Acute Pulmonary Embolism\n• Acute Pericarditis / Myocarditis\n• Tension Pneumothorax\n• Gastroesophageal Reflux Disease (GERD)",
      "id": "• Diseksi Aorta\n• Emboli Paru Akut\n• Perikarditis / Miokarditis Akut\n• Tension Pneumotoraks\n• Penyakit Refluks Gastroesofageal (GERD)"
    },
    "dangerSigns": {
      "en": "• **Cardiogenic shock** (systolic BP <90 mmHg with signs of hypoperfusion)\n• Pulmonary edema (rales >50% of lung fields; Killip Class III/IV)\n• Sustained **Ventricular Tachycardia or Fibrillation**\n• High-degree AV block or persistent severe chest pain",
      "id": "• **Syok kardiogenik** (TD sistolik <90 mmHg dengan tanda hipoperfusi)\n• Edema paru (ronkhi >50% lapangan paru; Killip Kelas III/IV)\n• **Takikardia Ventrikel atau Fibrilasi Ventrikel** persisten\n• Blok AV derajat tinggi atau nyeri dada hebat menetap"
    },
    "management": {
      "initialTreatment": {
        "en": "• Chew **Aspirin 162-325 mg** immediately\n• Give **Sublingual Nitroglycerin 0.4 mg** every 5 minutes up to 3 doses (avoid if SBP <90 mmHg or if PDE-5 inhibitors used)\n• Administer supplemental oxygen if SpO2 <90%\n• Load P2Y12 inhibitor (**Clopidogrel 300-600 mg** or **Ticagrelor 180 mg**)\n• IV Morphine for refractory pain",
        "id": "• Kunyah **Aspirin 162-325 mg** segera\n• Berikan **Nitrogliserin sublingual 0,4 mg** setiap 5 menit hingga 3 dosis (hindari jika TDS <90 mmHg atau jika menggunakan inhibitor PDE-5)\n• Berikan oksigen tambahan jika SpO2 <90%\n• Berikan dosis muatan (loading) inhibitor P2Y12 (**Klopidogrel 300-600 mg** atau **Tikagrelor 180 mg**)\n• IV Morfin untuk nyeri refrakter"
      },
      "definitiveTreatment": {
        "en": "• For STEMI: Emergency **Primary Percutaneous Coronary Intervention (PCI)** within **90 minutes** of first medical contact. If PCI unavailable within 120 mins, administer fibrinolytic therapy (**Alteplase**) within 30 mins of arrival\n• For NSTEMI: Risk stratify and plan early invasive strategy within 24-48 hours. Initiate anticoagulation (**Enoxaparin/LMWH** or **UFH**)",
        "id": "• Untuk STEMI: **Intervensi Koroner Perkutan (IKP/PCI) Primer** darurat dalam waktu **90 menit** sejak kontak medis pertama. Jika PCI tidak tersedia dalam 120 menit, berikan terapi fibrinolitik (**Alteplase**) dalam 30 menit setelah tiba\n• Untuk NSTEMI: Stratifikasi risiko dan rencanakan strategi invasif dini dalam 24-48 jam. Mulai antikoagulasi (**Enoksaparin/LMWH** atau **UFH**)"
      },
      "rehab": {
        "en": "• Cardiac rehabilitation program starting during hospitalization, focusing on progressive exercise and smoking cessation",
        "id": "• Program rehabilitasi jantung yang dimulai selama rawat inap, berfokus pada latihan progresif dan berhenti merokok"
      },
      "referral": {
        "en": "• Admit to **Cardiac Care Unit (CCU)** immediately. Consult Interventional Cardiologist. Refer to Cardiothoracic Surgery if CABG is indicated",
        "id": "• Segera rawat di **Cardiovascular Care Unit (CCU/ICCU)**. Konsultasi segera dengan Spesialis Jantung Intervensi. Rujuk ke Bedah Toraks Kardiovaskular jika operasi CABG diindikasikan"
      },
      "workup": {
        "en": "• Immediate **12-lead ECG** (repeat every 15-30 mins for ongoing pain), serial troponins, echocardiography to assess ejection fraction",
        "id": "• **EKG 12-sadapan** segera (ulangi setiap 15-30 menit jika nyeri berlangsung), troponin serial, ekokardiografi untuk menilai fraksi ejeksi"
      }
    },
    "followUp": {
      "en": "• Follow up with cardiologist in **1-2 weeks**; lifetime **DAPT** for 12 months, followed by aspirin monotherapy. Long-term risk factor control",
      "id": "• Kontrol dengan spesialis jantung dalam **1-2 minggu**; **DAPT** seumur hidup/selama 12 bulan, diikuti dengan monoterapi aspirin. Kontrol faktor risiko jangka panjang"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Daily Aspirin, high-intensity statins (**Atorvastatin 80 mg**), beta-blockers, and ACE inhibitors",
        "id": "• Aspirin harian, statin intensitas tinggi (**Atorvastatin 80 mg**), penyekat beta, dan ACE inhibitor"
      },
      "nonPharmacological": {
        "en": "• Mediterranean diet, regular aerobic exercise (**150 mins/week**), smoking cessation, and weight control",
        "id": "• Diet Mediterania, olahraga aerobik teratur (**150 menit/minggu**), berhenti merokok, dan kontrol berat badan"
      }
    },
    "caseExample": {
      "en": "A 55-year-old diabetic male presents with acute crushing chest pain for 1 hour, radiating to his jaw, with cold sweats. His 12-lead ECG reveals ST-segment elevation in leads V1-V4. SBP is 135/85 mmHg, HR 92 bpm. He immediately chews 325 mg Aspirin, receives sublingual nitroglycerin, and Clopidogrel 600 mg is administered. He is taken directly to the catheterization lab for primary PCI, where a totally occluded left anterior descending (LAD) artery is opened and a drug-eluting stent is placed within 45 minutes of arrival.",
      "id": "Seorang pria 55 tahun dengan diabetes datang dengan nyeri dada seperti diremas akut selama 1 jam, menjalar ke rahang, disertai keringat dingin. EKG 12-sadapan menunjukkan elevasi segmen ST di sadapan V1-V4. TDS 135/85 mmHg, HR 92 x/menit. Pasien segera mengunyah Aspirin 325 mg, mendapat nitrogliserin sublingual, dan diberikan Klopidogrel 600 mg. Ia langsung dibawa ke lab kateterisasi untuk PCI primer, di mana arteri desendens anterior kiri (LAD) yang tersumbat total dibuka dan dipasang stent eluting obat dalam waktu 45 menit setelah tiba."
    },
    "references": {
      "en": "• 2023 AHA/ACC Clinical Performance and Quality Measures for Adults With Coronary Artery Disease (JACC 2023)\n• Virani SS, et al. J Am Coll Cardiol. 2023;82(9):839-928",
      "id": "• Parameter Kinerja Klinis dan Kualitas AHA/ACC 2023 untuk Orang Dewasa dengan Penyakit Arteri Koroner (JACC 2023)\n• Virani SS, et al. J Am Coll Cardiol. 2023;82(9):839-928"
    },
    "id": 22,
    "content": {
      "en": "Acute myocardial infarction (AMI) is myocardial necrosis resulting from acute obstruction of a coronary artery, classified into ST-segment elevation myocardial infarction (STEMI) or non-ST-segment elevation myocardial infarction (NSTEMI) based on ECG changes.",
      "id": "Infark miokard akut (IMA) adalah nekrosis miokard yang disebabkan oleh obstruksi akut arteri koroner, diklasifikasikan menjadi infark miokard dengan elevasi segmen ST (STEMI) atau infark miokard tanpa elevasi segmen ST (NSTEMI) berdasarkan perubahan EKG."
    }
  },
  {
    "title": {
      "en": "Acute Ischemic Stroke Guideline",
      "id": "Pedoman Stroke Iskemik Akut"
    },
    "category": "Neurology",
    "isStructured": true,
    "definition": {
      "en": "Acute ischemic stroke is characterized by the sudden onset of focal neurological deficits caused by a disruption of blood supply to a specific region of the brain, leading to cerebral infarction.",
      "id": "Stroke iskemik akut ditandai oleh onset mendadak defisit neurologis fokal yang disebabkan oleh gangguan aliran darah ke area tertentu di otak, menyebabkan infark serebral."
    },
    "symptoms": {
      "en": "• **Sudden unilateral weakness** or numbness of the face, arm, or leg\n• Sudden difficulty speaking or understanding speech (**aphasia**)\n• Sudden vision loss in one or both eyes\n• Sudden trouble walking, dizziness, loss of balance, or coordination",
      "id": "• **Kelemahan unilateral mendadak** atau mati rasa pada wajah, lengan, atau kaki\n• Kesulitan berbicara atau memahami pembicaraan (**afasia**) mendadak\n• Gangguan penglihatan mendadak pada satu atau kedua mata\n• Kesulitan berjalan mendadak, pusing, hilangnya keseimbangan, atau koordinasi"
    },
    "physicalExamination": {
      "en": "• Standardized assessment using the **NIH Stroke Scale (NIHSS)**\n• Facial droop, asymmetric arm/leg drift, or dysarthria\n• Sensory deficits, hemianopia, or aphasia\n• Normal or elevated blood pressure",
      "id": "• Penilaian standar menggunakan **NIH Stroke Scale (NIHSS)**\n• Wajah miring (mencong), kelemahan lengan/tungkai asimetris, atau disartria\n• Defisit sensorik, hemianopia, atau afasia\n• Tekanan darah normal atau meningkat"
    },
    "labFindings": {
      "en": "• **Non-contrast Head CT** (Gold Standard to rule out intracranial hemorrhage before thrombolysis)\n• Baseline fingerstick glucose (must rule out hypoglycemia)\n• Coagulation studies (PT/INR, aPTT), CBC, electrolytes",
      "id": "• **CT Scan Kepala Tanpa Kontras** (Gold Standard untuk menyingkirkan perdarahan intrakranial sebelum trombolisis)\n• Pemeriksaan glukosa stik jari (wajib menyingkirkan hipoglikemia)\n• Studi koagulasi (PT/INR, aPTT), Darah Lengkap, elektrolit"
    },
    "differentialDiagnosis": {
      "en": "• Intracranial Hemorrhage\n• Hypoglycemia (stroke mimic)\n• Todd's Paralysis (post-ictal)\n• Hemiplegic Migraine\n• Brain Tumor",
      "id": "• Perdarahan Intrakranial\n• Hipoglikemia (peniru stroke)\n• Kelumpuhan Todd (pasca-kejang)\n• Migrain Hemiplegik\n• Tumor Otak"
    },
    "dangerSigns": {
      "en": "• Brain herniation signs (pupillary asymmetry, progressive stupor)\n• Severe hypertension **(>185/110 mmHg)** refractory to treatment\n• Rapidly deteriorating conscious level or active airway compromise",
      "id": "• Tanda herniasi otak (asimetri pupil, stupor progresif)\n• Hipertensi berat **(>185/110 mmHg)** yang refrakter terhadap pengobatan\n• Penurunan kesadaran cepat atau gangguan jalan napas aktif"
    },
    "management": {
      "initialTreatment": {
        "en": "• Establish time of **'last known well'**\n• Maintain airway and check fingerstick glucose immediately\n• Do not lower BP unless **>220/120 mmHg** (or **>185/110 mmHg** if thrombolysis candidate)\n• Transfer immediately to CT suite",
        "id": "• Tetapkan waktu **'terakhir kali terlihat sehat'**\n• Jaga jalan napas dan cek glukosa stik jari segera\n• Jangan turunkan TD kecuali **>220/120 mmHg** (atau **>185/110 mmHg** jika kandidat trombolisis)\n• Segera transfer ke ruang CT Scan"
      },
      "definitiveTreatment": {
        "en": "• Administer **IV Alteplase (0.9 mg/kg, max 90 mg)** within **4.5 hours** of symptom onset if eligible (exclude hemorrhage on CT)\n• Perform **Mechanical Thrombectomy** within **24 hours** for large vessel occlusion (LVO) in the anterior circulation\n• Administer **Aspirin 162-325 mg** within 24-48 hours (delay 24h if Alteplase given)\n• Control BP using IV **Nicardipine** or **Labetalol**",
        "id": "• Berikan **IV Alteplase (0,9 mg/kg, maks 90 mg)** dalam **4,5 jam** sejak onset gejala jika memenuhi syarat (singkirkan perdarahan pada CT)\n• Lakukan **Trombektomi Mekanik** dalam **24 jam** untuk oklusi pembuluh darah besar (LVO) pada sirkulasi anterior\n• Berikan **Aspirin 162-325 mg** dalam 24-48 jam (tunda 24 jam jika Alteplase diberikan)\n• Kontrol TD menggunakan IV **Nikardipin** atau **Labetalol**"
      },
      "rehab": {
        "en": "• Early multidisciplinary rehabilitation: physiotherapy, speech therapy, and occupational therapy starting within **24-48 hours**",
        "id": "• Rehabilitasi multidisiplin dini: fisioterapi, terapi wicara, dan terapi okupasi dimulai dalam **24-48 jam**"
      },
      "referral": {
        "en": "• Admit to **Stroke Unit** or Neuro-ICU. Consult Neurologist and Interventional Neuroradiologist immediately",
        "id": "• Rawat di **Unit Stroke** atau Neuro-ICU. Konsultasi segera dengan Spesialis Saraf dan Neuroradiolog Intervensi"
      },
      "workup": {
        "en": "• Brain CT or MRI, CT angiogram of head/neck, transthoracic echocardiogram, carotid duplex ultrasound, lipid panel, HbA1c",
        "id": "• CT atau MRI Otak, CT Angiografi kepala/leher, ekokardiografi transtorakal, USG karotis, profil lipid, HbA1c"
      }
    },
    "followUp": {
      "en": "• Regular follow-up with neurologist; monitor secondary prevention compliance, assess functional independence (modified Rankin Scale)",
      "id": "• Kontrol rutin dengan spesialis saraf; pantau kepatuhan pencegahan sekunder, nilai tingkat kemandirian fungsional (Skor Rankin Modifikasi)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Long-term antiplatelet therapy (**Aspirin 81 mg daily** or **Clopidogrel 75 mg daily**)\n• High-intensity statins (**Atorvastatin 40-80 mg daily**)\n• Optimal blood pressure and glycemic control",
        "id": "• Terapi antiplatelet jangka panjang (**Aspirin 81 mg sehari** atau **Klopidogrel 75 mg sehari**)\n• Statin intensitas tinggi (**Atorvastatin 40-80 mg sehari**)\n• Kontrol tekanan darah dan glikemik yang optimal"
      },
      "nonPharmacological": {
        "en": "• Smoking cessation, healthy low-sodium diet, regular moderate exercise, and weight control",
        "id": "• Berhenti merokok, diet sehat rendah natrium, olahraga sedang teratur, dan kontrol berat badan"
      }
    },
    "caseExample": {
      "en": "A 68-year-old male is brought to the ER with sudden weakness of the right arm and leg and difficulty speaking, starting **90 minutes ago**. NIHSS score is 14. Fingerstick glucose is 112 mg/dL, BP 172/96 mmHg. Immediate non-contrast head CT is negative for hemorrhage. The patient meets all criteria and is given **IV Alteplase 63 mg (0.9 mg/kg)**, with 10% given as bolus and the rest infused over 1 hour. His symptoms significantly improve overnight (NIHSS drops to 3). Brain MRI 24 hours later shows a small lacunar infarct in the left internal capsule. He is started on Aspirin 81 mg and Atorvastatin 40 mg daily.",
      "id": "Seorang pria 68 tahun dibawa ke UGD dengan kelemahan mendadak pada lengan dan tungkai kanan serta kesulitan berbicara, dimulai **90 menit yang lalu**. Skor NIHSS 14. Glukosa stik jari 112 mg/dL, TD 172/96 mmHg. CT scan kepala tanpa kontras segera menunjukkan hasil negatif untuk perdarahan. Pasien memenuhi semua kriteria dan diberikan **IV Alteplase 63 mg (0,9 mg/kg)**, dengan 10% diberikan sebagai bolus dan sisanya diinfuskan selama 1 jam. Gejalanya membaik secara signifikan keesokan harinya (NIHSS turun menjadi 3). MRI otak 24 jam kemudian menunjukkan infark lakunar kecil di kapsula interna kiri. Ia mulai diberikan Aspirin 81 mg dan Atorvastatin 40 mg sehari."
    },
    "references": {
      "en": "• 2019 Guidelines for the Early Management of Patients With Acute Ischemic Stroke (Stroke 2019)\n• Powers WJ, et al. Stroke. 2019;50(12):e344-e418",
      "id": "• Pedoman 2019 untuk Penatalaksanaan Awal Pasien dengan Stroke Iskemik Akut (Stroke 2019)\n• Powers WJ, et al. Stroke. 2019;50(12):e344-e418"
    },
    "id": 23,
    "content": {
      "en": "Acute ischemic stroke is characterized by the sudden onset of focal neurological deficits caused by a disruption of blood supply to a specific region of the brain, leading to cerebral infarction.",
      "id": "Stroke iskemik akut ditandai oleh onset mendadak defisit neurologis fokal yang disebabkan oleh gangguan aliran darah ke area tertentu di otak, menyebabkan infark serebral."
    }
  },
  {
    "title": {
      "en": "Diabetic Ketoacidosis (DKA) Protocol",
      "id": "Protokol Ketoasidosis Diabetik (KAD)"
    },
    "category": "Endocrinology",
    "isStructured": true,
    "definition": {
      "en": "Diabetic Ketoacidosis (DKA) is an acute, life-threatening metabolic complication of diabetes characterized by the triad of hyperglycemia, metabolic acidosis, and increased total body ketone concentration.",
      "id": "Ketoasidosis Diabetik (KAD) adalah komplikasi metabolik akut dan mengancam jiwa dari diabetes yang ditandai oleh trias hiperglikemia, asidosis metabolik, dan peningkatan konsentrasi keton tubuh total."
    },
    "symptoms": {
      "en": "• Polyuria, polydipsia, and significant weight loss\n• **Nausea, vomiting, and abdominal pain** (often mimicking an acute abdomen)\n• Generalized weakness and fatigue\n• Deep, sighing respiration (**Kussmaul breathing**)\n• Fruity odor of the breath (acetone)",
      "id": "• Poliuria, polidipsia, dan penurunan berat badan yang signifikan\n• **Mual, muntah, dan nyeri perut** (sering kali meniru akut abdomen)\n• Kelemahan umum dan kelelahan\n• Pernapasan cepat dan dalam (**pernapasan Kussmaul**)\n• Bau napas seperti buah manis (aseton)"
    },
    "physicalExamination": {
      "en": "• Signs of severe dehydration (dry mucous membranes, decreased skin turgor, sunken eyes)\n• Tachycardia and hypotension (shock in severe cases)\n• Tachypnea and Kussmaul breathing\n• Altered mental status: lethargy to coma\n• Epigastric tenderness",
      "id": "• Tanda dehidrasi berat (mukosa kering, turgor kulit menurun, mata cowong)\n• Takikardia dan hipotensi (syok pada kasus berat)\n• Takipnea dan pernapasan Kussmaul\n• Penurunan kesadaran: letargi hingga koma\n• Nyeri tekan epigastrium"
    },
    "labFindings": {
      "en": "• Blood glucose **>250 mg/dL**\n• Arterial pH **<7.30** or serum bicarbonate **<18 mEq/L**\n• Elevated blood or urine ketones\n• Elevated anion gap **(>12 mEq/L)**\n• Pseudohyponatremia (adjust sodium for glucose) and variable potassium levels",
      "id": "• Gula darah **>250 mg/dL**\n• pH arteri **<7,30** atau bikarbonat serum **<18 mEq/L**\n• Peningkatan keton darah atau urin\n• Anion gap meningkat **(>12 mEq/L)**\n• Pseudohiponatremia (sesuaikan natrium terhadap glukosa) dan kadar kalium yang bervariasi"
    },
    "differentialDiagnosis": {
      "en": "• Hyperosmolar Hyperglycemic State (HHS)\n• Alcoholic Ketoacidosis\n• Starvation Ketosis\n• Uremic Acidosis\n• Toxic Alcohol Ingestion (Methanol, Ethylene Glycol)",
      "id": "• Status Hiperosmolar Hiperglikemik (SHH)\n• Ketoasidosis Alkoholik\n• Ketosis Kelaparan\n• Asidosis Uremikum\n• Keracunan Alkohol Toksik (Metanol, Etilen Glikol)"
    },
    "dangerSigns": {
      "en": "• Severe acidosis **(pH <7.0)** or severe hypokalemia **(<3.3 mEq/L)**\n• Hemodynamic instability or refractory shock\n• Cerebral edema signs (new headache, bradycardia, worsening obtundation, especially in children)\n• Severe oliguria or anuria",
      "id": "• Asidosis berat **(pH <7,0)** atau hipokalemia berat **(<3,3 mEq/L)**\n• Ketidakstabilan hemodinamik atau syok refrakter\n• Tanda edema serebral (sakit kepala baru, bradikardia, obtundasi memburuk, terutama pada anak)\n• Oliguria berat atau anuria"
    },
    "management": {
      "initialTreatment": {
        "en": "• Secure airway and start high-flow IV access\n• Fluid resuscitation: Infuse **1-1.5 L** of **0.9% Normal Saline** over the first hour\n• Check **serum potassium** immediately; do *not* start insulin if potassium is **<3.3 mEq/L**",
        "id": "• Amankan jalan napas dan pasang jalur infus ukuran besar\n• Resusitasi cairan: Infuskan **1-1,5 L** **Normal Salin 0,9%** pada jam pertama\n• Cek **kalium serum** segera; jangan *pernah* memulai insulin jika kalium **<3,3 mEq/L**"
      },
      "definitiveTreatment": {
        "en": "• **Fluid therapy**: Continue 0.9% NS at 250-500 mL/h; switch to **D5W in 0.45% saline** once blood glucose drops to **<250 mg/dL**\n• **Insulin therapy**: Administer **Regular Insulin IV infusion (0.1 units/kg/hour)**. Aim for glucose decline of **50-75 mg/dL/hour**\n• **Potassium replacement**: Add **20-30 mEq KCl per liter** of IV fluid to maintain potassium between **4.0-5.0 mEq/L**\n• Continue IV insulin until DKA resolves (pH >= 7.30, HCO3 >= 15 mEq/L, and anion gap closed <12)",
        "id": "• **Terapi cairan**: Lanjutkan NS 0,9% dengan laju 250-500 mL/jam; alihkan ke **D5% dalam Salin 0,45%** setelah gula darah turun **<250 mg/dL**\n• **Terapi insulin**: Berikan **infus IV Insulin Regular (0,1 unit/kg/jam)**. Targetkan penurunan glukosa **50-75 mg/dL/jam**\n• **Koreksi Kalium**: Tambahkan **20-30 mEq KCl per liter** cairan IV untuk mempertahankan kalium di kisaran **4,0-5,0 mEq/L**\n• Lanjutkan insulin IV hingga KAD teratasi (pH >= 7,30, HCO3 >= 15 mEq/L, dan anion gap menutup <12)"
      },
      "rehab": {
        "en": "• Nutritional counseling and transitions back to oral diet. Initiate subcutaneous basal insulin **2 hours** before stopping IV insulin",
        "id": "• Konseling nutrisi dan transisi kembali ke diet oral. Mulai insulin basal subkutan **2 jam** sebelum menghentikan infus insulin IV"
      },
      "referral": {
        "en": "• Admit to **ICU** or High Dependency Unit (HDU) for severe DKA (pH < 7.0, altered mental status, or potassium < 3.3)",
        "id": "• Rawat di **ICU** atau High Dependency Unit (HDU) untuk KAD berat (pH < 7,0, penurunan kesadaran, atau kalium < 3,3)"
      },
      "workup": {
        "en": "• Hourly capillary glucose, basic metabolic panel (electrolytes, BUN, creatinine), venous pH, and ketones every 2-4 hours",
        "id": "• Glukosa kapiler setiap jam, panel metabolik dasar (elektrolit, BUN, kreatinin), pH vena, dan keton setiap 2-4 jam"
      }
    },
    "followUp": {
      "en": "• Post-discharge diabetes education; evaluate triggers (inadequate insulin, infection, pump malfunction). Follow up in clinic within 1-2 weeks",
      "id": "• Edukasi diabetes pasca-pemulangan; evaluasi pemicu (dosis insulin kurang, infeksi, kerusakan pompa insulin). Kontrol di klinik dalam 1-2 minggu"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Strict adherence to daily insulin regimens. Avoid skipping basal insulin doses during illness ('Sick Day Rules')",
        "id": "• Kepatuhan ketat terhadap rejimen insulin harian. Hindari melewatkan dosis insulin basal saat sakit ('Sick Day Rules')"
      },
      "nonPharmacological": {
        "en": "• Patient education on home blood glucose and ketone monitoring during sick days. Maintaining adequate hydration",
        "id": "• Edukasi pasien mengenai pemantauan glukosa darah dan keton mandiri di rumah saat sakit. Menjaga hidrasi adekuat"
      }
    },
    "caseExample": {
      "en": "A 21-year-old female with Type 1 Diabetes presents to the ER with severe nausea, vomiting, abdominal pain, and deep, rapid breathing. She reports skipping her insulin doses for the past 2 days. Her BP is 96/58 mmHg, HR 118 bpm, RR 28 breaths/min. Capillary glucose is **412 mg/dL**. Labs reveal arterial pH of **7.12**, bicarbonate of **9 mEq/L**, and positive serum ketones. Potassium is **4.2 mEq/L**. She is given **1.5 L of normal saline IV** in the first hour, and started on an **IV Regular Insulin infusion at 7 units/h** with **20 mEq KCl** added to each subsequent liter of fluid. Her DKA successfully resolves after 12 hours of therapy.",
      "id": "Seorang wanita 21 tahun dengan Diabetes Tipe 1 datang ke UGD dengan mual berat, muntah, nyeri perut, dan pernapasan yang cepat dan dalam. Ia mengaku melewatkan dosis insulinnya selama 2 hari terakhir. TD-nya 96/58 mmHg, HR 118 x/menit, RR 28 x/menit. Glukosa kapiler **412 mg/dL**. Pemeriksaan lab menunjukkan pH arteri **7,12**, bikarbonat **9 mEq/L**, dan keton serum positif. Kalium **4,2 mEq/L**. Ia diberikan **1,5 L normal salin IV** pada jam pertama, lalu dimulai **infus IV Insulin Reguler dengan laju 7 unit/jam** dengan **20 mEq KCl** ditambahkan pada setiap liter cairan berikutnya. KAD-nya berhasil teratasi setelah 12 jam terapi."
    },
    "references": {
      "en": "• ADA Consensus Statement on Hyperglycemic Crises in Adult Patients With Diabetes (Diabetes Care 2009)\n• Kitabchi AE, et al. Diabetes Care. 2009;32(7):1335-1343",
      "id": "• Pernyataan Konsensus ADA tentang Krisis Hiperglikemik pada Pasien Dewasa dengan Diabetes (Diabetes Care 2009)\n• Kitabchi AE, et al. Diabetes Care. 2009;32(7):1335-1343"
    },
    "id": 24,
    "content": {
      "en": "Diabetic Ketoacidosis (DKA) is an acute, life-threatening metabolic complication of diabetes characterized by the triad of hyperglycemia, metabolic acidosis, and increased total body ketone concentration.",
      "id": "Ketoasidosis Diabetik (KAD) adalah komplikasi metabolik akut dan mengancam jiwa dari diabetes yang ditandai oleh trias hiperglikemia, asidosis metabolik, dan peningkatan konsentrasi keton tubuh total."
    }
  },
  {
    "title": {
      "en": "Pulmonary Embolism (PE) Clinical Guideline",
      "id": "Pedoman Klinis Emboli Paru (EP)"
    },
    "category": "Pulmonology",
    "isStructured": true,
    "definition": {
      "en": "Pulmonary Embolism (PE) is a life-threatening obstruction of the pulmonary arterial bed, most commonly resulting from a thrombus originating in the deep veins of the lower extremities (deep vein thrombosis).",
      "id": "Emboli Paru (EP) adalah obstruksi arteri pulmonal yang mengancam jiwa, paling sering disebabkan oleh trombus yang berasal dari vena dalam ekstremitas bawah (deep vein thrombosis/DVT)."
    },
    "symptoms": {
      "en": "• **Sudden onset of dyspnea** (most common symptom)\n• Pleuritic chest pain (worse with deep breathing)\n• Cough, hemoptysis (coughing up blood)\n• Syncope or near-syncope (suggestive of massive PE)\n• Apprehension, anxiety, or feeling of impending doom",
      "id": "• **Onset sesak napas mendadak** (gejala paling umum)\n• Nyeri dada pleuritik (memburuk dengan napas dalam)\n• Batuk, hemoptisis (batuk darah)\n• Sinkop atau hampir pingsan (mencurigakan EP masif)\n• Cemas, gelisah, atau ketakutan akan kematian"
    },
    "physicalExamination": {
      "en": "• Tachypnea **(>20 breaths/min)** and tachycardia **(>100 bpm)**\n• Low oxygen saturation (SpO2)\n• Auscultation: usually clear lungs; loud P2 heart sound, tricuspid regurgitation murmur\n• Unilateral leg swelling, warmth, and tenderness (signs of **DVT**)\n• Hypotension or obstructive shock (massive PE)",
      "id": "• Takipnea **(>20 x/menit)** dan takikardia **(>100 x/menit)**\n• Saturasi oksigen rendah (SpO2)\n• Auskultasi: biasanya paru bersih; bunyi jantung P2 mengeras, bising regurgitasi trikuspid\n• Bengkak tungkai unilateral, hangat, dan nyeri tekan (tanda-tanda **DVT**)\n• Hipotensi atau syok obstruktif (EP masif)"
    },
    "labFindings": {
      "en": "• **CT Pulmonary Angiography (CTPA)**: Gold Standard diagnostic imaging\n• Elevated **D-Dimer** (useful only to rule out PE in low/moderate probability cases)\n• Elevated Troponin and BNP (signs of **right ventricular strain**)\n• ECG showing sinus tachycardia, S1Q3T3 pattern, or right bundle branch block (RBBB)",
      "id": "• **CT Pulmonary Angiography (CTPA)**: Gold Standard pencitraan diagnostik\n• Kadar **D-Dimer** meningkat (hanya berguna menyingkirkan EP pada probabilitas rendah/sedang)\n• Peningkatan Troponin dan BNP (tanda **regangan ventrikel kanan**)\n• EKG menunjukkan takikardia sinus, pola S1Q3T3, atau right bundle branch block (RBBB)"
    },
    "differentialDiagnosis": {
      "en": "• Acute Myocardial Infarction\n• Tension Pneumothorax\n• Aortic Dissection\n• Pneumonia / Pleurisy\n• Acute Exacerbation of Asthma or COPD",
      "id": "• Infark Miokard Akut\n• Tension Pneumotoraks\n• Diseksi Aorta\n• Pneumonia / Pleuritis\n• Eksaserbasi Akut Asma atau PPOK"
    },
    "dangerSigns": {
      "en": "• **Massive PE**: hypotension (systolic BP <90 mmHg) or shock\n• Severe refractory hypoxemia (SpO2 <90% on high-flow oxygen)\n• Right ventricular dysfunction on echocardiogram\n• Recurrent syncope",
      "id": "• **EP Masif**: hipotensi (TD sistolik <90 mmHg) atau syok\n• Hipoksemia refrakter berat (SpO2 <90% pada oksigen aliran tinggi)\n• Disfungsi ventrikel kanan pada ekokardiogram\n• Sinkop berulang"
    },
    "management": {
      "initialTreatment": {
        "en": "• Supplement oxygen immediately to maintain SpO2 >=90%\n• Risk stratify using **Wells Score** or **Geneva Score** and the **PESI (Pulmonary Embolism Severity Index)**\n• Initiate anticoagulation immediately if clinical suspicion is high and no contraindications exist (e.g. **Enoxaparin 1 mg/kg SC q12h**)",
        "id": "• Berikan tambahan oksigen segera untuk mempertahankan SpO2 >=90%\n• Stratifikasi risiko menggunakan **Wells Score** atau **Geneva Score** dan **PESI (Pulmonary Embolism Severity Index)**\n• Segera mulai antikoagulasi jika kecurigaan klinis tinggi dan tidak ada kontraindikasi (misal: **Enoksaparin 1 mg/kg SC tiap 12 jam**)"
      },
      "definitiveTreatment": {
        "en": "• For massive PE (hemodynamic instability): Administer **thrombolytic therapy (IV Alteplase 100 mg over 2 hours)** if no contraindications exist\n• For submassive PE (stable BP but right heart strain): Monitor closely; consider thrombolysis if clinical deterioration occurs\n• For stable patients: Long-term anticoagulation with **DOACs** (Apixaban, Rivaroxaban) or Warfarin for at least **3 months**\n• Consider **IVC Filter** only if absolute contraindications to anticoagulation exist",
        "id": "• Untuk EP masif (instabilitas hemodinamik): Berikan **terapi trombolitik (IV Alteplase 100 mg selama 2 jam)** jika tidak ada kontraindikasi\n• Untuk EP submasif (TD stabil tetapi ada regangan jantung kanan): Pantau ketat; pertimbangkan trombolisis jika terjadi perburukan klinis\n• Untuk pasien stabil: Antikoagulasi jangka panjang dengan **DOAC** (Apixaban, Rivaroxaban) atau Warfarin selama minimal **3 bulan**\n• Pertimbangkan **Filter IVC** hanya jika terdapat kontraindikasi absolut terhadap antikoagulasi"
      },
      "rehab": {
        "en": "• Gradual resumption of physical activity; monitor for post-PE syndrome (chronic thromboembolic pulmonary hypertension / CTEPH)",
        "id": "• Pemulihan aktivitas fisik secara bertahap; pantau sindrom pasca-EP (hipertensi pulmonal tromboemboli kronis / CTEPH)"
      },
      "referral": {
        "en": "• Admit massive and submassive PE to the **ICU**. Consult Interventional Radiology or Cardiothoracic Surgery for mechanical thrombectomy or surgical embolectomy if thrombolysis is contraindicated",
        "id": "• Rawat EP masif dan submasif di **ICU**. Konsultasikan ke Radiologi Intervensi atau Bedah Toraks Kardiovaskular untuk trombektomi mekanik atau embolektomi bedah jika trombolisis merupakan kontraindikasi"
      },
      "workup": {
        "en": "• Wells Score, D-Dimer, CTPA, bedside transthoracic echocardiogram to assess right heart strain, lower extremity venous duplex ultrasound",
        "id": "• Wells Score, D-Dimer, CTPA, ekokardiografi transtorakal bedside untuk menilai regangan jantung kanan, USG duplex vena ekstremitas bawah"
      }
    },
    "followUp": {
      "en": "• Review in anticoagulation clinic regularly; monitor for bleeding complications. Re-evaluate at **3 months** to decide on duration of therapy",
      "id": "• Tinjau di klinik antikoagulasi secara berkala; pantau komplikasi perdarahan. Evaluasi ulang pada **3 bulan** untuk memutuskan durasi terapi"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Prophylactic anticoagulation (**Enoxaparin 40 mg SC daily**) for hospitalized medical/surgical patients with high VTE risk",
        "id": "• Antikoagulasi profilaksis (**Enoksaparin 40 mg SC sehari**) untuk pasien rawat inap medis/bedah dengan risiko tinggi VTE"
      },
      "nonPharmacological": {
        "en": "• Early post-operative mobilization, use of sequential compression devices (SCDs) or compression stockings",
        "id": "• Mobilisasi pasca-operasi dini, penggunaan sequential compression devices (SCD) atau stoking kompresi"
      }
    },
    "caseExample": {
      "en": "A 62-year-old female presents with sudden onset severe shortness of breath and right-sided pleuritic chest pain. She underwent total knee replacement surgery 2 weeks ago. On exam: HR 118 bpm, RR 26 breaths/min, BP 115/72 mmHg, SpO2 88% on room air. Her right calf is swollen and tender. Wells score is high (7 points). She is started on high-flow oxygen and IV Heparin. A CTPA reveals a large saddle pulmonary embolus. Bedside echocardiogram shows right ventricular dilation but stable blood pressure (submassive PE). She is transferred to the ICU for close monitoring and continuous Heparin infusion, showing gradual improvement over 4 days.",
      "id": "Seorang wanita 62 tahun datang dengan sesak napas berat mendadak dan nyeri dada pleuritik sisi kanan. Ia menjalani operasi penggantian sendi lutut total 2 minggu lalu. Pemeriksaan: HR 118 x/menit, RR 26 x/menit, TD 115/72 mmHg, SpO2 88% pada udara ruangan. Betis kanannya bengkak dan nyeri tekan. Skor Wells tinggi (7 poin). Ia mulai diberikan oksigen aliran tinggi dan Heparin IV. CTPA menunjukkan emboli paru pelana (saddle) yang besar. Ekokardiografi menunjukkan pelebaran ventrikel kanan tetapi tekanan darah stabil (EP submasif). Ia dipindahkan ke ICU untuk pemantauan ketat dan infus Heparin kontinu, menunjukkan perbaikan bertahap selama 4 hari."
    },
    "references": {
      "en": "• 2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism (European Heart Journal 2020)\n• Konstantinides SV, et al. Eur Heart J. 2020;41(4):543-603",
      "id": "• Pedoman ESC 2019 untuk Diagnosis dan Penatalaksanaan Emboli Paru Akut (European Heart Journal 2020)\n• Konstantinides SV, et al. Eur Heart J. 2020;41(4):543-603"
    },
    "id": 25,
    "content": {
      "en": "Pulmonary Embolism (PE) is a life-threatening obstruction of the pulmonary arterial bed, most commonly resulting from a thrombus originating in the deep veins of the lower extremities (deep vein thrombosis).",
      "id": "Emboli Paru (EP) adalah obstruksi arteri pulmonal yang mengancam jiwa, paling sering disebabkan oleh trombus yang berasal dari vena dalam ekstremitas bawah (deep vein thrombosis/DVT)."
    }
  },
  {
    "title": {
      "en": "Tension Pneumothorax Emergency Guideline",
      "id": "Pedoman Darurat Tension Pneumotoraks"
    },
    "category": "Emergency",
    "isStructured": true,
    "definition": {
      "en": "Tension Pneumothorax is a life-threatening, progressive accumulation of air in the pleural space under positive pressure, resulting in lung collapse, mediastinal shift, compression of the contralateral lung, and compromised venous return leading to cardiovascular collapse.",
      "id": "Tension Pneumotoraks adalah akumulasi udara progresif yang mengancam jiwa di rongga pleura di bawah tekanan positif, yang mengakibatkan kolaps paru, pergeseran mediastinum, kompresi paru kontralateral, dan terganggunya aliran balik vena yang menyebabkan kolaps kardiovaskular."
    },
    "symptoms": {
      "en": "• **Sudden onset of severe dyspnea** and pleuritic chest pain\n• Extreme agitation, apprehension, and air hunger\n• Dizziness, near-syncope, or loss of consciousness",
      "id": "• **Onset sesak napas berat mendadak** dan nyeri dada pleuritik\n• Kegelisahan ekstrem, ketakutan, dan rasa lapar udara\n• Pusing, hampir pingsan, atau hilangnya kesadaran"
    },
    "physicalExamination": {
      "en": "• Severe tachypnea, hypoxia, hypotension **(shock)**, and tachycardia\n• **Absence of breath sounds** on the affected side\n• **Hyperresonance** on percussion on the affected side\n• **Tracheal deviation** to the contralateral (opposite) side (late sign)\n• Distended neck veins (JVD due to impaired venous return)\n• Asymmetric chest wall expansion",
      "id": "• Takipnea berat, hipoksia, hipotensi **(syok)**, dan takikardia\n• **Suara napas menghilang** pada sisi yang sakit\n• **Hiperresonan** pada perkusi di sisi yang sakit\n• **Deviasi trakea** ke sisi kontralateral (berlawanan) (tanda lanjut)\n• Distensi vena leher (JVD akibat hambatan aliran balik vena)\n• Ekspansi dinding dada asimetris"
    },
    "labFindings": {
      "en": "• Tension pneumothorax is a **purely clinical diagnosis**; do *not* wait for chest X-ray or labs before treating\n• Bedside **thoracic ultrasound** showing absence of lung sliding\n• Arterial blood gas showing severe hypoxemia and respiratory acidosis",
      "id": "• Tension pneumotoraks adalah **diagnosis murni klinis**; jangan *pernah* menunggu rontgen dada atau lab sebelum mengobati\n• **USG toraks** bedside menunjukkan hilangnya tanda lung sliding\n• Analisis gas darah menunjukkan hipoksemia berat dan asidosis respiratorik"
    },
    "differentialDiagnosis": {
      "en": "• Cardiac Tamponade\n• Massive Hemothorax\n• Acute Myocardial Infarction\n• Massive Pulmonary Embolism",
      "id": "• Tamponade Jantung\n• Hemotoraks Masif\n• Infark Miokard Akut\n• Emboli Paru Masif"
    },
    "dangerSigns": {
      "en": "• Severe hypotension and bradycardia (impending cardiac arrest)\n• Loss of consciousness or severe agitation\n• Rapidly dropping oxygen saturation **(<80%)**\n• Asymmetry of pupils or signs of profound shock",
      "id": "• Hipotensi berat dan bradikardia (ancaman henti jantung)\n• Hilang kesadaran atau kegelisahan ekstrem\n• Saturasi oksigen turun cepat **(<80%)**\n• Asimetri pupil atau tanda-tanda syok yang mendalam"
    },
    "management": {
      "initialTreatment": {
        "en": "• Administer high-flow oxygen immediately\n• Perform **Needle Decompression** immediately: Insert a large-bore needle (14-16 G) in the **2nd intercostal space, midclavicular line** OR **5th intercostal space, anterior/mid-axillary line** on the affected side\n• Confirm rush of air and conversion of tension to simple pneumothorax",
        "id": "• Berikan oksigen aliran tinggi segera\n• Segera lakukan **Dekompresi Jarum**: Masukkan jarum ukuran besar (14-16 G) di **sela iga ke-2, garis midklavikula** ATAU **sela iga ke-5, garis anterior/mid-aksila** pada sisi yang sakit\n• Konfirmasi adanya hembusan udara keluar dan perubahan tension menjadi pneumotoraks sederhana"
      },
      "definitiveTreatment": {
        "en": "• Immediately follow needle decompression with **Chest Tube insertion (Tube Thoracostomy)** (usually 28-32 Fr placed in the 5th intercostal space, mid-axillary line)\n• Connect the chest tube to a **water-seal drainage system (WSD)**\n• Confirm lung re-expansion with a chest radiograph post-procedure",
        "id": "• Segera ikuti dekompresi jarum dengan **pemasangan selang dada (Torakostomi Selang)** (biasanya ukuran 28-32 Fr dipasang di sela iga ke-5, garis mid-aksila)\n• Hubungkan selang dada ke **sistem drainase segel air (WSD)**\n• Konfirmasi re-ekspansi paru dengan rontgen dada pasca-prosedur"
      },
      "rehab": {
        "en": "• Chest physiotherapy, incentive spirometry, and deep breathing exercises to promote lung re-expansion",
        "id": "• Fisioterapi dada, spirometri insentif, dan latihan napas dalam untuk mendorong re-ekspansi paru"
      },
      "referral": {
        "en": "• Consult a **Thoracic Surgeon** immediately. Admit to surgical ICU or high-dependency unit",
        "id": "• Konsultasi segera dengan **Spesialis Bedah Toraks**. Rawat di ICU bedah atau unit high-dependency"
      },
      "workup": {
        "en": "• Post-chest tube X-ray, continuous pulse oximetry, and clinical monitoring of chest tube air leak and fluid drainage",
        "id": "• Rontgen dada pasca-selang dada, oksimetri nadi kontinu, dan pemantauan klinis adanya kebocoran udara serta cairan drainase selang dada"
      }
    },
    "followUp": {
      "en": "• Monitor chest tube WSD until air leak ceases and lung is fully expanded. Remove tube after 24 hours of no leak and trial of clamping",
      "id": "• Pantau WSD selang dada hingga kebocoran udara berhenti dan paru mengembang penuh. Lepas selang dada setelah 24 jam tanpa kebocoran dan uji coba klem"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Standard pain management (oral/IV NSAIDs or opioids) to facilitate deep breathing and prevent splinting",
        "id": "• Manajemen nyeri standar (NSAID oral/IV atau opioid) untuk memfasilitasi pernapasan dalam dan mencegah nyeri saat bernapas"
      },
      "nonPharmacological": {
        "en": "• Advise patient to avoid scuba diving or flying in unpressurized aircraft until complete resolution and clearance by a pulmonologist/surgeon",
        "id": "• Sarankan pasien menghindari penyelaman atau terbang dengan pesawat tanpa tekanan udara hingga resolusi lengkap dan dinyatakan aman oleh spesialis paru/bedah"
      }
    },
    "caseExample": {
      "en": "A 24-year-old male is brought to the ER following a motor vehicle collision. He is extremely dyspneic, agitated, and cyanotic. His BP is **74/38 mmHg**, HR 132 bpm, SpO2 76% on high-flow oxygen. Physical exam reveals absent breath sounds and hyperresonance on the left hemithorax, with marked tracheal deviation to the right. The physician immediately performs **needle decompression** by inserting a 14 G angiocatheter into the left 2nd intercostal space at the midclavicular line. A loud hiss of air is heard, and his BP immediately rises to **112/68 mmHg** and SpO2 to 94%. A **chest tube** is then placed and connected to WSD.",
      "id": "Seorang pemuda 24 tahun dibawa ke UGD setelah tabrakan kendaraan bermotor. Ia sesak napas berat, gelisah, dan sianosis. TD-nya **74/38 mmHg**, HR 132 x/menit, SpO2 76% pada oksigen aliran tinggi. Pemeriksaan fisik menunjukkan suara napas menghilang dan hiperresonan pada hemitoraks kiri, disertai deviasi trakea yang jelas ke kanan. Dokter segera melakukan **dekompresi jarum** dengan memasukkan angiokateter 14 G ke sela iga ke-2 kiri di garis midklavikula. Suara hembusan udara terdengar keras, dan TD segera naik menjadi **112/68 mmHg** dan SpO2 94%. **Selang dada** kemudian dipasang dan dihubungkan ke WSD."
    },
    "references": {
      "en": "• Advanced Trauma Life Support (ATLS) Student Course Manual, 10th Edition (American College of Surgeons 2018)\n• American College of Surgeons Committee on Trauma, 2018",
      "id": "• Buku Manual Kursus Siswa Advanced Trauma Life Support (ATLS), Edisi ke-10 (American College of Surgeons 2018)\n• American College of Surgeons Committee on Trauma, 2018"
    },
    "id": 26,
    "content": {
      "en": "Tension Pneumothorax is a life-threatening, progressive accumulation of air in the pleural space under positive pressure, resulting in lung collapse, mediastinal shift, compression of the contralateral lung, and compromised venous return leading to cardiovascular collapse.",
      "id": "Tension Pneumotoraks adalah akumulasi udara progresif yang mengancam jiwa di rongga pleura di bawah tekanan positif, yang mengakibatkan kolaps paru, pergeseran mediastinum, kompresi paru kontralateral, dan terganggunya aliran balik vena yang menyebabkan kolaps kardiovaskular."
    }
  },
  {
    "title": {
      "en": "Status Epilepticus Management Protocol",
      "id": "Protokol Penatalaksanaan Status Epileptikus"
    },
    "category": "Neurology",
    "isStructured": true,
    "definition": {
      "en": "Status Epilepticus is defined as a continuous seizure lasting **>=5 minutes**, or recurrent seizures without full recovery of consciousness between episodes, representing a critical neurological emergency.",
      "id": "Status Epileptikus didefinisikan sebagai kejang terus-menerus selama **>=5 menit**, atau kejang berulang tanpa pemulihan kesadaran penuh di antara episode-episode kejang, yang merupakan kedaruratan neurologis kritis."
    },
    "symptoms": {
      "en": "• Continuous, generalized tonic-clonic convulsions\n• Alternatively: non-convulsive status (altered mental status, blank staring, subtle motor twitches)\n• Inability to arouse the patient",
      "id": "• Kejang tonik-klonik umum yang terus-menerus\n• Alternatif: status non-konvulsif (penurunan kesadaran, tatapan kosong, kedutan motorik halus)\n• Ketidakmampuan untuk menyadarkan pasien"
    },
    "physicalExamination": {
      "en": "• Active tonic-clonic movements, jaw clenching, tongue biting\n• Tachycardia, hypertension, hyperthermia, and diaphoresis\n• Post-ictal flaccidity, extensor plantar responses (Babinski sign)\n• Assess pupil size and reactivity (to rule out herniation/structural lesions)",
      "id": "• Gerakan tonik-klonik aktif, rahang terkatup rapat, lidah tergigit\n• Takikardia, hipertensi, hipertermia, dan diaforesis\n• Flaksiditas pasca-kejang, respons ekstensor plantar (tanda Babinski)\n• Nilai ukuran dan reaktivitas pupil (untuk menyingkirkan herniasi/lesi struktural)"
    },
    "labFindings": {
      "en": "• Diagnosis is clinical; do not delay treatment. Urgent fingerstick glucose (must rule out hypoglycemia)\n• Acid-fast lactic acidosis on blood gas\n• Abnormal serum anticonvulsant levels (subtherapeutic in known epileptics)\n• EEG showing continuous epileptiform discharges (essential for non-convulsive status)",
      "id": "• Diagnosis bersifat klinis; jangan menunda pengobatan. Cek glukosa stik jari segera (wajib menyingkirkan hipoglikemia)\n• Asidosis laktat berat pada analisis gas darah\n• Kadar obat antikonvulsan serum abnormal (subterapeutik pada pasien epilepsi)\n• EKG/EEG menunjukkan lepas muatan listrik epileptiform kontinu (penting untuk status non-konvulsif)"
    },
    "differentialDiagnosis": {
      "en": "• Psychogenic Non-Epileptic Seizures (PNES)\n• Severe Syncope with myoclonic jerks\n• Decerebrate posturing (intracranial hemorrhage/herniation)\n• Severe Rigidity / Serotonin Syndrome",
      "id": "• Kejang Non-Epileptik Psikogenik (PNES)\n• Sinkop Berat dengan sentakan mioklonik\n• Postur deserebrasi (perdarahan/herniasi intrakranial)\n• Rigiditas Berat / Sindrom Serotonin"
    },
    "dangerSigns": {
      "en": "• Seizure duration **>30 minutes** (increased risk of irreversible neuronal injury)\n• Airway compromise, hypoxia, or active aspiration\n• Hyperthermia **(temp >40.0°C)**\n• Cardiac arrhythmias or cardiovascular collapse",
      "id": "• Durasi kejang **>30 menit** (meningkatkan risiko kerusakan neuron ireversibel)\n• Gangguan jalan napas, hipoksia, atau aspirasi aktif\n• Hipertermia **(suhu >40,0°C)**\n• Aritmia jantung atau kolaps kardiovaskular"
    },
    "management": {
      "initialTreatment": {
        "en": "• Secure airway, provide **100% oxygen**, and obtain IV access immediately\n• Test fingerstick glucose; administer **50 mL of D50W IV** immediately if hypoglycemic\n• **First Line (0-10 mins)**: Administer **IV Diazepam 10 mg** over 2 mins (or **IV Lorazepam 4 mg**); repeat once if seizure continues after 5 mins. If no IV access, give **IM Midazolam 10 mg** or **rectal Diazepam**",
        "id": "• Amankan jalan napas, berikan **oksigen 100%**, dan pasang jalur IV segera\n• Cek glukosa stik jari; berikan **50 mL D50W IV** segera jika hipoglikemia\n• **Lini Pertama (0-10 menit)**: Berikan **IV Diazepam 10 mg** selama 2 menit (atau **IV Lorazepam 4 mg**); ulangi sekali jika kejang berlanjut setelah 5 menit. Jika tidak ada jalur IV, berikan **IM Midazolam 10 mg** atau **Diazepam rektal**"
      },
      "definitiveTreatment": {
        "en": "• **Second Line (10-30 mins)**: If seizure persists after benzodiazepines, administer IV antiepileptic loading dose: **IV Levetiracetam 60 mg/kg (max 4500 mg)** over 10 mins OR **IV Phenytoin/Fos phenytoin 20 mg PE/kg** OR **IV Sodium Valproate 40 mg/kg**\n• **Third Line (>30 mins - Refractory)**: If kejang persists: Initiate continuous infusion of anesthetic dose: **Propofol (loading 1-2 mg/kg, then 2-10 mg/kg/h)** OR **Midazolam** or **Ketamine**. Requires endotracheal intubation, mechanical ventilation, and continuous EEG monitoring",
        "id": "• **Lini Kedua (10-30 menit)**: Jika kejang berlanjut setelah benzodiazepin, berikan dosis muatan antiepilepsi IV: **IV Levetiracetam 60 mg/kg (maks 4500 mg)** selama 10 menit ATAU **IV Fenitoin/Fosfenitoin 20 mg PE/kg** ATAU **IV Natrium Valproat 40 mg/kg**\n• **Lini Ketiga (>30 menit - Refrakter)**: Jika kejang menetap: Mulai infus kontinu dosis anestesi: **Propofol (loading 1-2 mg/kg, lalu 2-10 mg/kg/jam)** ATAU **Midazolam** atau **Ketamin**. Memerlukan intubasi endotrakeal, ventilasi mekanik, dan pemantauan EEG kontinu"
      },
      "rehab": {
        "en": "• Prevent aspiration pneumonia post-seizure; support mobilization once patient is fully awake and oriented",
        "id": "• Cegah pneumonia aspirasi pasca-kejang; dukung mobilisasi setelah pasien sadar penuh dan orientasi baik"
      },
      "referral": {
        "en": "• Admit to **ICU** for refractory status epilepticus requiring anesthetic infusions and intubation. Consult Neurologist immediately",
        "id": "• Rawat di **ICU** untuk status epileptikus refrakter yang membutuhkan infus anestesi dan intubasi. Konsultasi segera dengan Spesialis Saraf"
      },
      "workup": {
        "en": "• CBC, electrolytes, calcium, magnesium, renal and liver function, toxicology screen, anticonvulsant drug levels, brain CT after stabilization",
        "id": "• Darah Lengkap, elektrolit, kalsium, magnesium, fungsi ginjal dan hati, skrining toksikologi, kadar obat antikonvulsan, CT scan otak setelah stabil"
      }
    },
    "followUp": {
      "en": "• Follow up with Neurologist in **1-2 weeks**; optimize long-term oral antiepileptic drug maintenance, check drug levels and monitor for side effects",
      "id": "• Kontrol dengan spesialis saraf dalam **1-2 minggu**; optimalkan pemeliharaan obat antiepilepsi oral jangka panjang, periksa kadar obat, dan pantau efek samping"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Strict adherence to daily oral antiepileptic drugs (e.g. Levetiracetam, Valproate). Avoid abrupt drug cessation",
        "id": "• Kepatuhan ketat terhadap obat antiepilepsi oral harian (misal: Levetiracetam, Valproat). Hindari penghentian obat mendadak"
      },
      "nonPharmacological": {
        "en": "• Avoid sleep deprivation, limit alcohol, manage stress, and avoid seizure triggers (flashing lights if photosensitive)",
        "id": "• Hindari kurang tidur, batasi alkohol, kelola stres, dan hindari pemicu kejang (stimulasi cahaya jika fotosensitif)"
      }
    },
    "caseExample": {
      "en": "A 30-year-old male with a history of epilepsy is brought to the ER by EMS, actively seizing with generalized tonic-clonic convulsions. The seizure started 15 minutes ago and has been continuous. His airway is secured with a nasopharyngeal airway, and 100% oxygen is started. An IV line is established, and he is given IV Diazepam 10 mg, which fails to stop the seizure. A second dose of 10 mg is given 5 minutes later, but the convulsions persist. He is then given a loading dose of IV Levetiracetam (3000 mg over 10 minutes), after which the seizure terminates.",
      "id": "Seorang pria 30 tahun dengan riwayat epilepsi dibawa ke UGD oleh ambulans dalam keadaan kejang tonik-klonik umum aktif. Kejang dimulai 15 menit yang lalu dan terus-menerus. Jalan napas diamankan dengan pipa nasofaring, dan oksigen 100% dimulai. Jalur IV dipasang dan diberikan Diazepam IV 10 mg, tetapi kejang tidak berhenti. Dosis kedua 10 mg diberikan 5 menit kemudian, namun kejang berlanjut. Ia kemudian diberikan dosis muatan Levetiracetam IV (3000 mg selama 10 menit), setelah itu kejang berhenti."
    },
    "references": {
      "en": "• Guidelines for the Treatment of Convulsive Status Epilepticus in Children and Adults: American Epilepsy Society (Epilepsy Currents 2016)\n• Glauser T, et al. Epilepsy Curr. 2016;16(1):48-61",
      "id": "• Pedoman untuk Pengobatan Status Epileptikus Konvulsif pada Anak-anak dan Dewasa: American Epilepsy Society (Epilepsy Currents 2016)\n• Glauser T, et al. Epilepsy Curr. 2016;16(1):48-61"
    },
    "id": 27,
    "content": {
      "en": "Status Epilepticus is defined as a continuous seizure lasting **>=5 minutes**, or recurrent seizures without full recovery of consciousness between episodes, representing a critical neurological emergency.",
      "id": "Status Epileptikus didefinisikan sebagai kejang terus-menerus selama **>=5 menit**, atau kejang berulang tanpa pemulihan kesadaran penuh di antara episode-episode kejang, yang merupakan kedaruratan neurologis kritis."
    }
  },
  {
    "title": {
      "en": "Acute Upper GI Bleeding Guideline",
      "id": "Pedoman Perdarahan SCBA Akut"
    },
    "category": "Gastroenterology",
    "isStructured": true,
    "definition": {
      "en": "Acute Upper Gastrointestinal Bleeding (UGIB) is defined as bleeding originating proximal to the ligament of Treitz, presenting as hematemesis, melena, or hematochezia, classified into non-variceal (typically peptic ulcer disease) or variceal (due to portal hypertension) bleeding.",
      "id": "Perdarahan Saluran Cerna Bagian Atas (SCBA) Akut didefinisikan sebagai perdarahan yang berasal dari bagian proksimal ligamentum Treitz, muncul sebagai hematemesis (muntah darah), melena (BAB hitam), atau hematokezia, diklasifikasikan menjadi perdarahan non-variseal (biasanya penyakit ulkus peptikum) atau variseal (akibat hipertensi porta)."
    },
    "symptoms": {
      "en": "• Hematemesis (bright red blood or 'coffee-ground' emesis)\n• **Melena** (black, tarry, foul-smelling stools)\n• Hematochezia (bright red rectal bleeding, in massive fast bleeding)\n• Epigastric pain or dyspepsia\n• Dizziness, lightheadedness, or syncope",
      "id": "• Hematemesis (muntah darah merah segar atau seperti ampas kopi)\n• **Melena** (BAB hitam beraspal dan berbau busuk)\n• Hematokezia (perdarahan merah segar per rektum pada perdarahan masif cepat)\n• Nyeri epigastrium atau dispepsia\n• Pusing, kliyengan, atau sinkop"
    },
    "physicalExamination": {
      "en": "• Tachycardia, hypotension, or orthostatic vital sign changes\n• Pallor, cold extremities, and dry mucous membranes\n• Stigmata of liver cirrhosis: spider angiomas, palmar erythema, ascites, splenomegaly\n• Epigastric tenderness\n• DRE positive for melena",
      "id": "• Takikardia, hipotensi, atau perubahan tanda vital ortostatik\n• Pucat, ekstremitas dingin, dan membran mukosa kering\n• Stigmata sirosis hati: spider angioma, eritema palmaris, asites, splenomegali\n• Nyeri tekan epigastrium\n• Colok dubur (DRE) positif melena"
    },
    "labFindings": {
      "en": "• Decreased hemoglobin and hematocrit (may lag in acute bleeding)\n• Elevated BUN-to-creatinine ratio **(>30:1)**\n• Coagulation abnormalities (elevated PT/INR)\n• Thrombocytopenia, metabolic acidosis",
      "id": "• Penurunan hemoglobin dan hematokrit (dapat terlambat pada perdarahan akut)\n• Peningkatan rasio BUN terhadap kreatinin **(>30:1)**\n• Kelainan koagulasi (PT/INR meningkat)\n• Trombositopenia, asidosis metabolik"
    },
    "differentialDiagnosis": {
      "en": "• Peptic Ulcer Disease (gastric/duodenal)\n• Esophageal or Gastric Varices\n• Mallory-Weiss Tear\n• Erosive Gastritis\n• Gastric Malignancy",
      "id": "• Penyakit Ulkus Peptikum (lambung/duodenum)\n• Varises Esofagus atau Lambung\n• Robekan Mallory-Weiss\n• Gastritis Erosif\n• Keganasan Lambung"
    },
    "dangerSigns": {
      "en": "• **Hemodynamic shock** (SBP <90 mmHg, HR >120 bpm, cold sweats, confusion)\n• Recurrent vomiting of fresh blood\n• Failure of endoscopic therapy\n• Severe hepatic encephalopathy, anuria",
      "id": "• **Syok hemodinamik** (TDS <90 mmHg, HR >120 x/menit, keringat dingin, kebingungan)\n• Muntah darah segar berulang\n• Kegagalan terapi endoskopi\n• Ensefalopati hepatikum berat, anuria"
    },
    "management": {
      "initialTreatment": {
        "en": "• Obtain two large-bore IV lines. Start aggressive fluid infusion to maintain SBP >90 mmHg\n• Transfuse Packed Red Blood Cells (PRBCs) if **Hb <7 g/dL** (target 7-8 g/dL; target 9 g/dL in cardiovascular disease)\n• Start high-dose IV Proton Pump Inhibitor: **Esomeprazole 80 mg IV bolus**, followed by **8 mg/hour continuous infusion**",
        "id": "• Pasang dua jalur IV ukuran besar. Mulai infus cairan agresif untuk mempertahankan TDS >90 mmHg\n• Transfusikan PRBC jika **Hb <7 g/dL** (target 7-8 g/dL; target 9 g/dL pada penyakit kardiovaskular)\n• Mulai Proton Pump Inhibitor IV dosis tinggi: **Esomeprazole 80 mg IV bolus**, diikuti **infus kontinu 8 mg/jam**"
      },
      "definitiveTreatment": {
        "en": "• For suspected variceal bleeding: Add **IV Octreotide (50 mcg bolus, then 50 mcg/h)** and prophylactic **IV Ceftriaxone 1g daily**\n• Perform **Urgent Upper Endoscopy (EGD)** within **24 hours** (within 12 hours for variceal bleeding)\n• Perform endoscopic band ligation (EBL) for varices, or thermal/mechanical coagulation for ulcers\n• Arrange for TIPS or surgery if refractory",
        "id": "• Untuk dugaan perdarahan variseal: Tambahkan **IV Oktreotid (bolus 50 mcg, lalu 50 mcg/jam)** dan profilaksis **IV Ceftriaxone 1g sehari**\n• Lakukan **Endoskopi SCBA (EGD) Segera** dalam **24 jam** (dalam 12 jam untuk perdarahan variseal)\n• Lakukan ligasi band endoskopik (EBL) untuk varises, atau koagulasi termal/mekanis untuk ulkus\n• Rencanakan TIPS atau pembedahan jika refrakter"
      },
      "rehab": {
        "en": "• Nutritional assessment, oral iron supplementation for anemia recovery",
        "id": "• Penilaian gizi, suplementasi zat besi oral untuk pemulihan anemia"
      },
      "referral": {
        "en": "• Admit high-risk patients to **ICU**. Consult Gastroenterologist immediately. Consult Surgery and Interventional Radiology for refractory bleeding",
        "id": "• Rawat pasien risiko tinggi di **ICU**. Konsultasi segera dengan Spesialis Gastroenterologi. Konsultasikan ke Bedah dan Radiologi Intervensi jika perdarahan refrakter"
      },
      "workup": {
        "en": "• Upper Endoscopy (EGD), serial hemoglobin checks every 4-6 hours, Glasgow-Blatchford Score (GBS) at presentation",
        "id": "• Endoskopi SCBA (EGD), pemeriksaan hemoglobin serial setiap 4-6 jam, Glasgow-Blatchford Score (GBS) pada saat datang"
      }
    },
    "followUp": {
      "en": "• Follow up in clinic in **2-4 weeks**; test for and treat **H. pylori** if positive. Continue oral PPI for 4-8 weeks",
      "id": "• Kontrol di klinik dalam **2-4 minggu**; uji dan obati **H. pylori** jika positif. Lanjutkan PPI oral selama 4-8 minggu"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Co-prescription of PPI with NSAIDs in high-risk patients\n• Non-selective beta-blockers (**Carvedilol, Propranolol**) for primary/secondary variceal prophylaxis",
        "id": "• Peresepan PPI bersama NSAID pada pasien risiko tinggi\n• Penyekat beta non-selektif (**Karvedilol, Propranolol**) untuk profilaksis varises primer/sekunder"
      },
      "nonPharmacological": {
        "en": "• Avoid NSAIDs, limit alcohol, smoking cessation. Regular screening endoscopy in cirrhotic patients",
        "id": "• Hindari NSAID, batasi alkohol, berhenti merokok. Endoskopi skrining rutin pada pasien sirosis"
      }
    },
    "caseExample": {
      "en": "A 58-year-old male with a history of osteoarthritis on daily Ibuprofen presents with vomiting coffee-ground blood and passing black tarry stools since yesterday. On exam: HR 112 bpm, BP 98/60 mmHg, pale conjunctiva. Glasgow-Blatchford score is 11 (high risk). He is started on IV Normal Saline, given Pantoprazole 80 mg bolus, and transfused 1 unit of PRBC. Urgent EGD reveals a 1.5 cm bleeding duodenal ulcer (Forrest Class Ib), which is successfully treated with epinephrine injection and hemoclip placement. He is discharged on oral PPI.",
      "id": "Seorang pria 58 tahun dengan riwayat osteoartritis yang mengonsumsi Ibuprofen harian datang dengan muntah hitam seperti kopi dan melena sejak kemarin. Pemeriksaan: HR 112 x/menit, BP 98/60 mmHg, konjungtiva pucat. Skor Glasgow-Blatchford 11 (risiko tinggi). Ia mulai diberikan Normal Salin IV, Pantoprazole 80 mg bolus, dan transfusi 1 unit PRBC. EGD darurat menunjukkan ulkus duodenum berukuran 1,5 cm yang berdarah (Kelas Forrest Ib), berhasil ditangani dengan injeksi epinefrin dan pemasangan hemoclip. Ia dipulangkan dengan PPI oral."
    },
    "references": {
      "en": "• Management of Patients with Acute Lower Gastrointestinal Bleeding: An ACG Clinical Guideline (American Journal of Gastroenterology 2016)\n• Laine L, et al. Am J Gastroenterol. 2016;111(5):659-674",
      "id": "• Penatalaksanaan Pasien dengan Perdarahan Saluran Cerna Bagian Bawah Akut: Pedoman Klinis ACG (American Journal of Gastroenterology 2016)\n• Laine L, et al. Am J Gastroenterol. 2016;111(5):659-674"
    },
    "id": 28,
    "content": {
      "en": "Acute Upper Gastrointestinal Bleeding (UGIB) is defined as bleeding originating proximal to the ligament of Treitz, presenting as hematemesis, melena, or hematochezia, classified into non-variceal (typically peptic ulcer disease) or variceal (due to portal hypertension) bleeding.",
      "id": "Perdarahan Saluran Cerna Bagian Atas (SCBA) Akut didefinisikan sebagai perdarahan yang berasal dari bagian proksimal ligamentum Treitz, muncul sebagai hematemesis (muntah darah), melena (BAB hitam), atau hematokezia, diklasifikasikan menjadi perdarahan non-variseal (biasanya penyakit ulkus peptikum) atau variseal (akibat hipertensi porta)."
    }
  },
  {
    "title": {
      "en": "Closed Fracture Management",
      "id": "Penatalaksanaan Fraktur Tertutup"
    },
    "category": "Orthopedics",
    "isStructured": true,
    "definition": {
      "en": "A closed fracture is a bone fracture where the overlying skin remains intact and there is no direct communication between the bone break and the external environment. It is classified based on anatomical location, fracture line pattern, displacement, and the degree of closed soft tissue injury using the **Tscherne Classification (Grade 0 to Grade 3)**.",
      "id": "Fraktur tertutup adalah patah tulang di mana kulit di atasnya tetap utuh dan tidak ada hubungan langsung antara patahan tulang dengan lingkungan luar. Diklasifikasikan berdasarkan lokasi anatomis, pola garis patahan, pergeseran (displacement), dan derajat cedera jaringan lunak tertutup menggunakan **Klasifikasi Tscherne (Grade 0 hingga Grade 3)**."
    },
    "symptoms": {
      "en": "• Severe localized **pain** and exquisite tenderness over the fracture site\n• Rapid onset of localized **swelling** (edema) and ecchymosis (bruising)\n• Visible **deformity** (e.g., angulation, shortening, rotation)\n• Complete or partial **loss of function** / inability to bear weight\n• Subjective feeling or sound of a 'snap' or 'pop' at the time of injury\n• Paresthesia or numbness distal to the injury if adjacent nerves are compressed",
      "id": "• **Nyeri** hebat yang terlokalisir dan nyeri tekan yang nyata pada area fraktur\n• **Pembengkakan** (edema) dan ekimosis (lebam) terlokalisir yang muncul dengan cepat\n• **Deformitas** yang terlihat (misal: angulasi, pemendekan, rotasi)\n• **Hilangnya fungsi** lengkap atau parsial / ketidakmampuan menumpu beban\n• Sensasi subjektif atau terdengar bunyi 'krek' atau 'patah' saat cedera\n• Parestesia atau mati rasa distal dari cedera jika saraf di sekitarnya tertekan"
    },
    "physicalExamination": {
      "en": "• **Look**: Inspect for deformity, swelling, bruising, muscle spasm, and verify skin integrity (confirm no puncture wounds/abrasions communicating with fracture)\n• **Feel**: Palpate gently for point tenderness, warmth, and bony crepitus (avoid eliciting crepitus intentionally)\n• **Move**: Assess active and passive range of motion of adjacent joints (restricted due to pain)\n• **Neurovascular Assessment (CRITICAL)**: \n  • Check distal pulses (radial, dorsalis pedis, posterior tibial) and capillary refill time (<2 seconds)\n  • Test motor function (e.g., finger extension for radial nerve, toe dorsiflexion for deep peroneal nerve)\n  • Test sensory function in anatomical dermatomes distal to the injury",
      "id": "• **Look (Inspeksi)**: Nilai adanya deformitas, bengkak, lebam, spasme otot, dan pastikan integritas kulit (pastikan tidak ada luka tusuk/abrasi yang berhubungan dengan fraktur)\n• **Feel (Palpasi)**: Palpasi secara lembut untuk menilai nyeri tekan titik, kehangatan, dan krepitasi tulang (hindari memicu krepitasi secara sengaja)\n• **Move (Gerakan)**: Nilai rentang gerak aktif dan pasif sendi di sekitarnya (terbatas karena nyeri)\n• **Pemeriksaan Neurovaskular (SANGAT KRITIS)**:\n  • Periksa denyut nadi distal (radialis, dorsalis pedis, tibialis posterior) dan waktu pengisian kapiler / CRT (<2 detik)\n  • Uji fungsi motorik (misal: ekstensi jari untuk saraf radialis, dorsofleksi jempol kaki untuk saraf peroneal dalam)\n  • Uji fungsi sensorik pada dermatom anatomis distal dari cedera"
    },
    "labFindings": {
      "en": "• **Radiography (Gold Standard)**: Obtain plain X-rays in at least **two orthogonal views (AP and Lateral)**, including the **joint above and the joint below** the suspected fracture\n• **CT Scan**: Indicated for complex intra-articular fractures (e.g., tibial plateau, acetabular, or calcaneal fractures) to evaluate articular step-off and plan reconstruction\n• **MRI**: Reserved for suspected occult fractures (e.g., hip stress fracture) or soft tissue/ligamentous injuries\n• **Labs**: Baseline CBC, coagulation screen, and electrolytes if operative management is planned",
      "id": "• **Radiografi (Gold Standard)**: Lakukan foto polos minimal dalam **dua proyeksi ortogonal (AP dan Lateral)**, mencakup **sendi di atas dan di bawah** area yang dicurigai fraktur\n• **CT Scan**: Diindikasikan untuk fraktur intra-artikular yang kompleks (misal: dataran tibia, asetabulum, atau kalkaneus) untuk mengevaluasi step-off artikular dan merencanakan rekonstruksi\n• **MRI**: Khusus untuk dugaan fraktur okult (misal: fraktur stres panggul) atau cedera jaringan lunak/ligamen\n• **Lab**: Darah Lengkap (CBC), profil koagulasi, dan elektrolit dasar jika direncanakan tindakan operatif"
    },
    "differentialDiagnosis": {
      "en": "• Joint Dislocation / Subluxation\n• Open Fracture (small puncture wound nearby requires treatment as open)\n• Severe Ligamentous Sprain or Muscle Strain\n• Acute Compartment Syndrome (can co-exist with closed fracture)\n• Pathological Fracture (secondary to tumor, infection, or severe osteoporosis)",
      "id": "• Dislokasi / Subluksasi Sendi\n• Fraktur Terbuka (luka tusuk kecil di dekatnya harus ditangani sebagai fraktur terbuka)\n• Sprain Ligamen Berat atau Strain Otot\n• Sindrom Kompartemen Akut (dapat terjadi bersamaan dengan fraktur tertutup)\n• Fraktur Patologis (sekunder akibat tumor, infeksi, atau osteoporosis berat)"
    },
    "dangerSigns": {
      "en": "• **Acute Compartment Syndrome**: Marked by the **6 Ps** (Pain out of proportion/with passive stretch, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia)\n• **Vascular Compromise**: Cold, pale, pulseless extremity distal to fracture\n• **Neurological Deficit**: Sudden or progressive loss of motor/sensory function distal to the injury\n• **Fat Embolism Syndrome (especially long bone fractures)**: Classic triad of progressive hypoxemia/dyspnea, neurological abnormalities (confusion/lethargy), and petechial rash (chest/axilla)\n• **Soft Tissue Necrosis**: Tense skin with blistering (fracture blisters) or skin tenting over a displaced bone fragment",
      "id": "• **Sindrom Kompartemen Akut**: Ditandai dengan **6 P** (Pain/nyeri hebat yang tidak sebanding/dengan peregangan pasif, Pallor/pucat, Pulselessness/nadi tidak teraba, Paresthesia/kesemutan, Paralysis/lumpuh, Poikilothermia/dingin)\n• **Gangguan Vaskular**: Ekstremitas dingin, pucat, dan nadi tidak teraba di distal fraktur\n• **Defisit Neuologis**: Kehilangan fungsi motorik/sensorik secara tiba-tiba atau progresif di distal cedera\n• **Sindrom Emboli Lemak (terutama fraktur tulang panjang)**: Trias klasik hipoksemia/sesak napas progresif, kelainan neurologis (kebingungan/letargi), dan ruam petekie (dada/aksila)\n• **Nekrosis Jaringan Lunak**: Kulit tegang disertai lepuhan (fracture blisters) atau kulit yang tertarik kencang (tenting) di atas fragmen tulang yang bergeser"
    },
    "management": {
      "initialTreatment": {
        "en": "• **Immobilize Immediately**: Apply a temporary, well-padded **splint** spanning the joints above and below the fracture to prevent further soft tissue damage (do not attempt reduction without adequate analgesia unless neurovascular compromise is present)\n• **RICE Protocol**: Rest the extremity, apply Ice packs, apply gentle Compression (splinting), and Elevate the limb above the heart level to minimize edema\n• **Analgesia**: Administer **Paracetamol 1g IV/PO** and/or NSAIDs (e.g., **Ketorolac 30mg IV** or **Ibuprofen 400mg PO**). For severe pain, consider low-dose IV opioids (e.g., **Fentanyl 50-100 mcg IV**)\n• **Tetanus Prophylaxis**: Unnecessary if skin is strictly intact, but review immunization status",
        "id": "• **Imobilisasi Segera**: Pasang **bidai (splint)** sementara yang dilapisi bantalan cukup, mencakup sendi di atas dan di bawah fraktur untuk mencegah kerusakan jaringan lunak lebih lanjut (jangan lakukan reduksi tanpa analgesia yang adekuat kecuali ada gangguan neurovaskular)\n• **Protokol RICE**: Istirahatkan (Rest) ekstremitas, kompres Es (Ice), berikan Kompresi ringan/pembidaian (Compression), dan Tinggikan (Elevate) anggota gerak di atas level jantung untuk mengurangi edema\n• **Analgesia**: Berikan **Parasetamol 1g IV/PO** dan/atau NSAID (misal: **Ketorolac 30mg IV** atau **Ibuprofen 400mg PO**). Untuk nyeri hebat, pertimbangkan opioid IV dosis rendah (misal: **Fentanil 50-100 mcg IV**)\n• **Profilaksis Tetanus**: Tidak diperlukan jika kulit benar-benar utuh, namun tinjau kembali status imunisasi"
      },
      "definitiveTreatment": {
        "en": "• **Non-Operative (Closed Reduction & Casting)**: Indicated for stable, minimally displaced, or non-displaced fractures. Perform closed reduction under hematoma block, conscious sedation, or regional block, followed by application of a rigid circumferential **plaster or fiberglass cast**\n• **Operative Management (ORIF/OREF)**: Indicated for unstable, displaced, intra-articular, or open-equivalent fractures (e.g., skin tenting). \n  • **ORIF (Open Reduction and Internal Fixation)** using plates, screws, or intramedullary nails\n  • **External Fixation (OREF)** for severe closed soft tissue injury (Tscherne Grade 2/3) or polytrauma patients (damage control orthopedics)",
        "id": "• **Non-Operatif (Reduksi Tertutup & Gips)**: Diindikasikan untuk fraktur stabil, pergeseran minimal, atau tanpa pergeseran. Lakukan reduksi tertutup di bawah blok hematoma, sedasi sadar, atau blok regional, diikuti dengan pemasangan **gips sirkular plaster atau fiberglass** yang kaku\n• **Penatalaksanaan Operatif (ORIF/OREF)**: Diindikasikan untuk fraktur tidak stabil, bergeser nyata, intra-artikular, atau ekuivalen terbuka (misal: kulit tenting).\n  • **ORIF (Open Reduction and Internal Fixation)** menggunakan plat, sekrup, atau pen intrameduler (intramedullary nail)\n  • **Fiksasi Eksternal (OREF)** untuk cedera jaringan lunak tertutup yang berat (Tscherne Grade 2/3) atau pasien polikitrauma (damage control orthopedics)"
      },
      "rehab": {
        "en": "• Initiate early active range of motion of **unaffected joints** (e.g., fingers, toes, shoulder) immediately\n• Progressive **weight-bearing** as tolerated, guided by clinical and radiological healing (usually starting around 4-6 weeks for lower limb)\n• Directed physical therapy for muscle strengthening, joint mobilization, and gait training post-immobilization to prevent joint stiffness and muscle atrophy",
        "id": "• Mulai gerakan aktif dini pada **sendi yang tidak terkena** (misal: jari tangan, jari kaki, bahu) segera\n• **Menumpu beban (weight-bearing)** secara progresif sesuai toleransi, dipandu oleh penyembuhan klinis dan radiologis (biasanya mulai sekitar 4-6 minggu untuk anggota gerak bawah)\n• Fisioterapi terarah untuk penguatan otot, mobilisasi sendi, dan latihan berjalan setelah masa imobilisasi selesai untuk mencegah kekakuan sendi dan atrofi otot"
      },
      "referral": {
        "en": "• **Urgently Refer to Orthopedic Surgeon** for:\n  • Signs of acute compartment syndrome or arterial injury\n  • Irreducible fractures or failed closed reduction\n  • Open fractures or closed fractures with high risk of skin breakdown (tenting)\n  • Displaced intra-articular fractures, unstable fracture patterns, or pediatric fractures crossing the growth plate (Salter-Harris classification)",
        "id": "• **Rujuk Segera ke Spesialis Ortopedi** untuk:\n  • Tanda-tanda sindrom kompartemen akut atau cedera arteri\n  • Fraktur yang tidak dapat direduksi atau kegagalan reduksi tertutup\n  • Fraktur terbuka atau fraktur tertutup dengan risiko tinggi kerusakan kulit (tenting)\n  • Fraktur intra-artikular yang bergeser, pola fraktur tidak stabil, atau fraktur pediatrik yang melewati lempeng pertumbuhan (klasifikasi Salter-Harris)"
      },
      "workup": {
        "en": "• Pre-operative planning: Standard X-rays (orthogonal views), baseline laboratory work (CBC, electrolytes, coagulation profile, type and screen), and ECG if patient is >40 years or has cardiac comorbidities",
        "id": "• Perencanaan pre-operatif: Foto polos standar (proyeksi ortogonal), pemeriksaan laboratorium dasar (Darah Lengkap, elektrolit, profil koagulasi, golongan darah), dan EKG jika pasien berusia >40 tahun atau memiliki komorbiditas jantung"
      }
    },
    "followUp": {
      "en": "• Clinical and radiographic assessment in clinic at **1-2 weeks** post-injury to check for displacement in a cast\n• Follow-up at **6 weeks** and **12 weeks** to assess clinical stability (absence of pain/movement at fracture site) and radiographic evidence of bony union (callus formation bridging the fracture)\n• Monitor cast care and evaluate for skin irritation or pressure sores",
      "id": "• Evaluasi klinis dan radiografis di poliklinik pada **1-2 minggu** pasca-cedera untuk memantau pergeseran di dalam gips\n• Kontrol pada **6 minggu** dan **12 minggu** untuk menilai stabilitas klinis (tidak adanya nyeri/gerakan pada area fraktur) dan bukti radiografis penyembuhan tulang (terbentuknya kalus yang menjembatani fraktur)\n• Pantau perawatan gips dan evaluasi adanya iritasi kulit atau luka akibat tekanan"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Calcium supplementation (**1000-1200 mg daily**) and Vitamin D3 (**800-1000 IU daily**) to optimize bone mineral density\n• Anti-resorptive or anabolic therapy (e.g., Bisphosphonates, Teriparatide) in diagnosed osteoporosis patients",
        "id": "• Suplementasi kalsium (**1000-1200 mg sehari**) dan Vitamin D3 (**800-1000 IU sehari**) untuk mengoptimalkan densitas mineral tulang\n• Terapi anti-resorptif atau anabolik (misal: Bifosfonat, Teriparatide) pada pasien yang terdiagnosis osteoporosis"
      },
      "nonPharmacological": {
        "en": "• Home safety evaluations and **fall prevention programs** for elderly patients\n• Regular weight-bearing and resistance training exercises to maintain bone strength and balance\n• Use of appropriate protective gear during sports and high-risk activities",
        "id": "• Evaluasi keamanan rumah dan **program pencegahan jatuh** untuk pasien lansia\n• Latihan menumpu beban dan latihan resistensi secara teratur untuk menjaga kekuatan tulang dan keseimbangan\n• Penggunaan alat pelindung diri yang sesuai saat berolahraga dan aktivitas berisiko tinggi"
      }
    },
    "caseExample": {
      "en": "A 34-year-old male presents to the emergency department after falling from a 2-meter ladder, landing on his right lower leg. He reports immediate severe pain and inability to bear weight. On examination, there is marked swelling and anterolateral angulation of the mid-shaft tibia, but the skin is completely intact with no wounds. Distal pulses (dorsalis pedis and posterior tibial) are strong, and sensation/motor function are intact. X-rays reveal a displaced spiral fracture of the mid-shaft tibia. The leg is immobilized in a well-padded long-leg posterior splint, elevated, and IV Ketorolac is administered for pain. He undergoes uneventful Open Reduction and Internal Fixation (ORIF) with an intramedullary nail the following day.",
      "id": "Seorang pria 34 tahun datang ke instalasi gawat darurat setelah jatuh dari tangga setinggi 2 meter dan bertumpu pada tungkai kanan bawahnya. Ia melaporkan nyeri hebat seketika dan ketidakmampuan menumpu beban. Pada pemeriksaan fisik, terdapat pembengkakan nyata dan angulasi anterolateral pada diafisis tibia, namun kulit benar-benar utuh tanpa adanya luka. Denyut nadi distal (dorsalis pedis dan tibialis posterior) teraba kuat, serta fungsi sensorik dan motorik utuh. Foto rontgen menunjukkan fraktur spiral bergeser pada diafisis tibia. Tungkai diimobilisasi dengan bidai posterior kaki panjang (long-leg splint) yang dilapisi bantalan cukup, ditinggikan, dan diberikan Ketorolac IV untuk nyeri. Ia menjalani tindakan Open Reduction and Internal Fixation (ORIF) dengan pen intrameduler (intramedullary nail) keesokan harinya tanpa komplikasi."
    },
    "references": {
      "en": "• AAOS Clinical Practice Guideline on the Management of Acute Tibial Shaft Fractures (American Academy of Orthopaedic Surgeons 2021)\n• Advanced Trauma Life Support (ATLS) Student Course Manual, 10th Edition (American College of Surgeons)",
      "id": "• Pedoman Praktik Klinis AAOS tentang Penatalaksanaan Fraktur Batang Tibia Akut (American Academy of Orthopaedic Surgeons 2021)\n• Buku Panduan Kursus Siswa Advanced Trauma Life Support (ATLS), Edisi ke-10 (American College of Surgeons)"
    },
    "id": 29,
    "content": {
      "en": "A closed fracture is a bone fracture where the overlying skin remains intact and there is no direct communication between the bone break and the external environment. It is classified based on anatomical location, fracture line pattern, displacement, and the degree of closed soft tissue injury using the **Tscherne Classification (Grade 0 to Grade 3)**.",
      "id": "Fraktur tertutup adalah patah tulang di mana kulit di atasnya tetap utuh dan tidak ada hubungan langsung antara patahan tulang dengan lingkungan luar. Diklasifikasikan berdasarkan lokasi anatomis, pola garis patahan, pergeseran (displacement), dan derajat cedera jaringan lunak tertutup menggunakan **Klasifikasi Tscherne (Grade 0 hingga Grade 3)**."
    }
  },
  {
    "title": {
      "en": "Open Fracture Management",
      "id": "Penatalaksanaan Fraktur Terbuka"
    },
    "category": "Orthopedics",
    "isStructured": true,
    "definition": {
      "en": "An open fracture (also known as a compound fracture) is a bone fracture associated with a breach of the overlying skin and soft tissues, leading to direct communication between the fracture site and the external environment. It is considered a surgical emergency and is classified using the **Gustilo-Anderson Classification (Grade I, II, IIIA, IIIB, or IIIC)** based on wound size, energy, and degree of soft tissue injury/vascular compromise.",
      "id": "Fraktur terbuka (dikenal juga sebagai compound fracture) adalah patah tulang yang disertai robekan pada kulit dan jaringan lunak di atasnya, sehingga terjadi hubungan langsung antara area patahan tulang dengan lingkungan luar. Kondisi ini dianggap sebagai kegawatdaruratan bedah dan diklasifikasikan menggunakan **Klasifikasi Gustilo-Anderson (Grade I, II, IIIA, IIIB, atau IIIC)** berdasarkan ukuran luka, energi trauma, serta derajat cedera jaringan lunak/gangguan vaskular."
    },
    "symptoms": {
      "en": "• **Visible bone fragments** protruding through a skin wound\n• A skin wound (ranging from a puncture <1 cm to a massive laceration) overlying or near the fracture site\n• Severe localized **pain**, muscle spasm, and extreme tenderness\n• Active external **bleeding** or hematoma formation\n• Obvious limb **deformity** (e.g., severe angulation, rotation, or shortening)\n• Instability, crepitus, and complete loss of function of the affected extremity",
      "id": "• **Fragmen tulang yang terlihat** menonjol keluar menembus luka kulit\n• Luka kulit (berkisar dari luka tusuk <1 cm hingga laserasi masif) di atas atau dekat area fraktur\n• **Nyeri** terlokalisir yang hebat, spasme otot, dan nyeri tekan ekstrem\n• **Perdarahan** aktif eksternal atau pembentukan hematoma\n• **Deformitas** tungkai yang nyata (misal: angulasi hebat, rotasi, atau pemendekan)\n• Instabilitas, krepitasi, dan hilangnya fungsi lengkap pada ekstremitas yang terkena"
    },
    "physicalExamination": {
      "en": "• **Wound Inspection**: Assess wound size, degree of contamination (soil, dirt, agricultural debris), soft tissue devitalization, and bone exposure. **DO NOT probe or deeply explore the wound in the ED** to prevent introducing further contamination. Cover with sterile saline-soaked dressing immediately\n• **Integity & Deformity**: Note active bleeding, skin tenting, muscle loss, and fracture instability\n• **Neurovascular Assessment (MANDATORY & REPEATED)**: \n  • Palpate distal pulses (radial, ulnar, dorsalis pedis, posterior tibial) and check capillary refill time (<2 seconds). Compare with the uninjured limb\n  • Assess sensory dermatomes and motor function of major peripheral nerves distal to the injury (e.g., radial, median, ulnar nerves for upper limb; femoral, sciatic, tibial, peroneal nerves for lower limb)",
      "id": "• **Inspeksi Luka**: Nilai ukuran luka, derajat kontaminasi (tanah, kotoran, bahan pertanian), devitalisasi jaringan lunak, dan paparan tulang. **JANGAN lakukan probing atau eksplorasi mendalam pada luka di IGD** untuk mencegah masuknya kontaminasi lebih lanjut. Segera tutup dengan kassa steril yang dibasahi salin\n• **Integritas & Deformitas**: Catat perdarahan aktif, kulit tenting, hilangnya jaringan otot, dan instabilitas fraktur\n• **Pemeriksaan Neurovaskular (WAJIB & BERULANG)**:\n  • Raba denyut nadi distal (radialis, ulnaris, dorsalis pedis, tibialis posterior) dan periksa waktu pengisian kapiler / CRT (<2 detik). Bandingkan dengan tungkai yang sehat\n  • Nilai dermatom sensorik dan fungsi motorik saraf perifer utama di distal cedera (misal: saraf radialis, medianus, ulnaris untuk anggota gerak atas; saraf femoralis, iskiadikus, tibialis, peroneal untuk anggota gerak bawah)"
    },
    "labFindings": {
      "en": "• **Radiography**: Obtain urgent plain X-rays in at least **two orthogonal views (AP and Lateral)**, including the **joint above and the joint below** the fracture site\n• **Baseline Labs**: Complete Blood Count (CBC), coagulation profile (PT/INR, aPTT), serum electrolytes, renal function (urea, creatinine), and **Type and Screen / Crossmatch** (high risk of blood loss in Grades II/III)\n• **Wound Cultures**: Routinely taken intra-operatively during initial debridement (pre-operative ED wound cultures are not recommended as they correlate poorly with subsequent pathogens)",
      "id": "• **Radiografi**: Lakukan foto polos segera minimal dalam **dua proyeksi ortogonal (AP dan Lateral)**, mencakup **sendi di atas dan di bawah** area fraktur\n• **Lab Dasar**: Darah Lengkap (CBC), profil koagulasi (PT/INR, aPTT), elektrolit serum, fungsi ginjal (ureum, kreatinin), dan **Golongan Darah & Uji Silang / Crossmatch** (risiko tinggi kehilangan darah pada Grade II/III)\n• **Kultur Luka**: Rutin diambil secara intra-operatif selama debridement awal (kultur luka di IGD sebelum operasi tidak direkomendasikan karena korelasinya buruk dengan patogen penyebab infeksi berikutnya)"
    },
    "differentialDiagnosis": {
      "en": "• Closed Fracture with severe soft tissue abrasion (Tscherne Grade 3)\n• Joint Dislocation with associated skin laceration (open dislocation)\n• Severe soft tissue laceration/crush injury without underlying fracture\n• Pathological open fracture (secondary to osteomyelitis or bone tumor)",
      "id": "• Fraktur Tertutup dengan abrasi jaringan lunak berat (Tscherne Grade 3)\n• Dislokasi Sendi disertai laserasi kulit (dislokasi terbuka)\n• Laserasi/cedera remuk (crush injury) jaringan lunak berat tanpa patah tulang di bawahnya\n• Fraktur Terbuka Patologis (sekunder akibat tumor, infeksi, atau osteoporosis berat)"
    },
    "dangerSigns": {
      "en": "• **Arterial Occlusion / Vascular Injury (Gustilo Grade IIIC)**: Cold, pale, pulseless extremity distal to fracture with capillary refill >3 seconds, or active pulsatile hemorrhage\n• **Acute Compartment Syndrome**: Severe pain out of proportion to injury, pain with passive stretch, paresthesia, and firm swelling over muscle compartments (can occur even with an open wound)\n• **Gas Gangrene (Clostridial Myonecrosis)**: Rapidly progressive systemic sepsis, severe localized pain, crepitus (subcutaneous gas), bronze-colored skin discoloration, and foul-smelling dishwater-like wound drainage\n• **Hemorrhagic Shock**: Hypotension (SBP <90 mmHg), tachycardia (HR >120 bpm), cold clammy skin, tachypnea, and altered mental status",
      "id": "• **Oklusi Arteri / Cedera Vaskular (Gustilo Grade IIIC)**: Ekstremitas dingin, pucat, dan nadi tidak teraba di distal fraktur dengan CRT >3 detik, atau perdarahan aktif berdenyut (pulsatif)\n• **Sindrom Kompartemen Akut**: Nyeri hebat yang tidak sebanding dengan cedera, nyeri saat peregangan pasif, parestesia, dan bengkak tegang pada kompartemen otot (dapat terjadi meskipun ada luka terbuka)\n• **Gas Gangrene (Mionekrosis Klostridial)**: Sepsis sistemik yang berkembang cepat, nyeri hebat terlokalisir, krepitasi (gas subkutan), perubahan warna kulit menjadi perunggu, dan cairan luka berbau busuk seperti cucian daging\n• **Syok Hemoragik**: Hipotensi (TDS <90 mmHg), takikardia (HR >120 x/menit), kulit dingin dan basah, takipnea, serta penurunan kesadaran"
    },
    "management": {
      "initialTreatment": {
        "en": "• **Immediate Wound Care**: Apply a **sterile saline-soaked dressing** over the wound immediately. **Do not attempt to reduce the fracture or push bone fragments back into the wound** in the ED. Keep dressing intact until in the operating room\n• **Antibiotic Prophylaxis (CRITICAL - Give within 3 hours)**:\n  • **Gustilo Grade I & II**: First-generation Cephalosporin (**Cefazolin 2g IV q8h**)\n  • **Gustilo Grade III**: Add Aminoglycoside (**Gentamicin 5 mg/kg IV daily** or **1.5 mg/kg IV q8h**)\n  • **Soil/Farm Contamination (Anaerobe cover)**: Add **Penicillin G 4 million units IV q4h** OR **Metronidazole 500mg IV q8h**\n• **Tetanus Prophylaxis**: Give **Tetanus Toxoid 0.5 mL IM** plus **Tetanus Immunoglobulin (TIG) 250 units IM** if immunization is incomplete/unknown or >5 years since last dose and wound is highly contaminated\n• **Immobilization**: Apply a temporary splint to stabilize the limb, reduce pain, and prevent further soft tissue injury\n• **Resuscitation & Analgesia**: Aggressive IV crystalloids if hemodynamically unstable, and administer **Fentanyl 50-100 mcg IV** or **Morphine 5-10 mg IV** for pain",
        "id": "• **Perawatan Luka Segera**: Segera pasang **kassa steril yang dibasahi salin** di atas luka. **Jangan mencoba mereduksi fraktur atau mendorong fragmen tulang kembali ke dalam luka** di IGD. Pertahankan kassa tetap tertutup hingga berada di kamar operasi\n• **Profilaksis Antibiotik (SANGAT KRITIS - Berikan dalam 3 jam)**:\n  • **Gustilo Grade I & II**: Sefalosporin generasi pertama (**Cefazolin 2g IV setiap 8 jam**)\n  • **Gustilo Grade III**: Tambahkan Aminoglikosida (**Gentamisin 5 mg/kg IV sehari** atau **1,5 mg/kg IV setiap 8 jam**)\n  • **Kontaminasi Tanah/Pertanian (Cakupan Anaerob)**: Tambahkan **Penisilin G 4 juta unit IV setiap 4 jam** ATAU **Metronidazol 500mg IV setiap 8 jam**\n• **Profilaksis Tetanus**: Berikan **Tetanus Toksoid 0,5 mL IM** ditambah **Tetanus Imunoglobulin (TIG) 250 unit IM** jika imunisasi tidak lengkap/tidak diketahui atau >5 tahun sejak dosis terakhir dan luka sangat terkontaminasi\n• **Imobilisasi**: Pasang bidai sementara untuk menstabilkan tungkai, mengurangi nyeri, dan mencegah cedera jaringan lunak lebih lanjut\n• **Resusitasi & Analgesia**: Berikan kristaloid IV agresif jika hemodinamik tidak stabil, dan berikan **Fentanil 50-100 mcg IV** atau **Morfin 5-10 mg IV** untuk nyeri"
      },
      "definitiveTreatment": {
        "en": "• **Urgent Surgical Debridement & Irrigation**: The cornerstone of open fracture management. Perform in the operating room **within 24 hours of injury** (ideally within 6 hours for highly contaminated or Grade III fractures). Involves meticulous removal of all devitalized tissue, foreign debris, and aggressive serial irrigation (using 3-9 liters of warm saline)\n• **Fracture Stabilization**:\n  • **External Fixation (OREF)**: Temporarily stabilized in highly contaminated wounds, severe soft tissue loss, or polytrauma (Damage Control Orthopedics)\n  • **Internal Fixation (ORIF or Intramedullary Nailing)**: Indicated for Gustilo Grade I, II, and IIIA fractures with clean wounds and minimal soft tissue damage\n• **Wound Closure**: Gustilo Grade I and II wounds can often be closed primarily or delayed primarily. Grade III wounds require delayed closure, split-thickness skin grafts, or muscle flaps (local or free) for coverage, ideally **within 72 hours** to 7 days",
        "id": "• **Debridement & Irigasi Bedah Segera**: Landasan utama penatalaksanaan fraktur terbuka. Lakukan di kamar operasi **dalam waktu 24 jam setelah cedera** (idealnya dalam 6 jam untuk luka sangat terkontaminasi atau fraktur Grade III). Melibatkan pembersihan teliti semua jaringan devitalisasi, benda asing, dan irigasi serial agresif (menggunakan 3-9 liter cairan salin hangat)\n• **Stabilisasi Fraktur**:\n  • **Fiksasi Eksternal (OREF)**: Stabilisasi sementara pada luka yang sangat terkontaminasi, hilangnya jaringan lunak yang parah, atau polikitrauma (Damage Control Orthopedics)\n  • **Fiksasi Internal (ORIF atau Pen Intrameduler)**: Diindikasikan untuk fraktur Gustilo Grade I, II, dan IIIA dengan luka bersih dan kerusakan jaringan lunak minimal\n• **Penutupan Luka**: Luka Gustilo Grade I dan II sering kali dapat ditutup primer atau penutupan primer tertunda. Luka Grade III memerlukan penutupan tertunda, gips kulit split-thickness (STSG), atau flap otot (lokal atau bebas) untuk penutupan, idealnya **dalam waktu 72 jam** hingga 7 hari"
      },
      "rehab": {
        "en": "• Early active motion of **unaffected joints** starting post-op day 1 to prevent stiffness\n• Non-weight-bearing or touch-down weight-bearing of the affected limb until radiographic evidence of early union is present (highly variable based on fracture type and fixation stability)\n• Graduated resistance exercises and gait training under direct supervision of physical therapy",
        "id": "• Gerakan aktif dini pada **sendi yang tidak terkena** mulai hari ke-1 pasca-operasi untuk mencegah kekakuan\n• Non-weight-bearing atau touch-down weight-bearing pada tungkai yang sakit sampai terdapat bukti radiografis penyembuhan tulang awal (sangat bervariasi berdasarkan jenis fraktur dan stabilitas fiksasi)\n• Latihan resistensi bertahap dan latihan berjalan di bawah pengawasan langsung fisioterapi"
      },
      "referral": {
        "en": "• **Immediate Transfer to Trauma Center / Orthopedic Surgeon**: Every open fracture requires urgent orthopedic surgical intervention. Direct communication with the orthopedic registrar/consultant should occur immediately upon patient presentation",
        "id": "• **Transfer Segera ke Pusat Trauma / Spesialis Ortopedi**: Setiap fraktur terbuka memerlukan intervensi bedah ortopedi segera. Komunikasi langsung dengan dokter ortopedi harus dilakukan segera setelah pasien datang"
      },
      "workup": {
        "en": "• Pre-operative check: Meticulous documentation of wound appearance and neurovascular status, plain films (AP/Lateral), standard pre-op laboratory testing (CBC, coagulation profile, electrolytes, type and crossmatch), and chest X-ray/ECG based on age and comorbidities",
        "id": "• Pemeriksaan pre-operatif: Dokumentasi teliti tampilan luka dan status neurovaskular, foto polos (AP/Lateral), laboratorium standar pre-operasi (Darah Lengkap, profil koagulasi, elektrolit, golongan darah & uji silang), serta rontgen dada/EKG berdasarkan usia dan komorbiditas"
      }
    },
    "followUp": {
      "en": "• Highly frequent post-operative clinical checks to monitor for **surgical site infection (SSI)**, skin necrosis, or compartment syndrome\n• Long-term outpatient follow-up at **2 weeks, 6 weeks, 12 weeks, 6 months, and 1 year** to assess clinical healing, range of motion, and radiographic union (look for delayed union, non-union, or osteomyelitis)",
      "id": "• Pemeriksaan klinis pasca-operasi yang sangat sering untuk memantau adanya **infeksi daerah operasi (IDO)**, nekrosis kulit, atau sindrom kompartemen\n• Tindak lanjut rawat jalan jangka panjang pada **2 minggu, 6 minggu, 12 minggu, 6 bulan, dan 1 tahun** untuk menilai penyembuhan klinis, rentang gerak, dan penyembuhan radiografis (pantau delayed union, non-union, atau osteomielitis)"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Strict adherence to antibiotic discontinuation guidelines: **discontinue prophylaxis within 24 hours** after definitive wound closure (prolonged antibiotic courses do not reduce infection rates and increase risk of resistance)",
        "id": "• Kepatuhan ketat terhadap pedoman penghentian antibiotik: **hentikan profilaksis dalam waktu 24 jam** setelah penutupan luka definitif (pemberian antibiotik jangka panjang tidak mengurangi angka infeksi dan meningkatkan risiko resistensi)"
      },
      "nonPharmacological": {
        "en": "• Strict sterile technique during all dressing changes prior to surgery\n• Meticulous intra-operative mechanical debridement (the single most effective factor in preventing post-traumatic osteomyelitis)",
        "id": "• Teknik steril yang ketat selama setiap penggantian kassa sebelum operasi\n• Debridement mekanis intra-operatif yang sangat teliti (faktor tunggal paling efektif dalam mencegah osteomielitis pasca-trauma)"
      }
    },
    "caseExample": {
      "en": "A 42-year-old construction worker presents to the emergency department after a 3-meter fall, landing on a metal bar. He has severe pain in his left lower leg. Examination reveals a 5 cm jagged transverse laceration over the mid-shaft tibia, with exposed cortical bone heavily contaminated with rust and dirt. Distal pulses are palpable and strong, and sensation is intact. X-rays show a displaced transverse tibia-fibula fracture. In the ED, a sterile saline-soaked dressing is applied, the leg is stabilized in a posterior splint, and he is immediately given **IV Cefazolin 2g**, **IV Gentamicin 240mg (5 mg/kg)**, and **Tetanus Toxoid + TIG**. He is taken to the operating room within 4 hours, where he undergoes aggressive surgical irrigation (9 liters of saline), thorough debridement of devitalized muscle and bone, and temporary stabilization with a unilateral **External Fixator (OREF)**. Definitive ORIF and delayed primary closure are performed 5 days later after soft tissues stabilize.",
      "id": "Seorang pekerja konstruksi 42 tahun datang ke instalasi gawat darurat setelah jatuh dari ketinggian 3 meter dan bertumpu pada tiang besi. Ia mengalami nyeri hebat pada tungkai bawah kiri. Pemeriksaan fisik menunjukkan laserasi transversal bergerigi sepanjang 5 cm pada diafisis tibia, dengan tulang kortikal terekspos yang sangat terkontaminasi karat dan kotoran. Denyut nadi distal teraba kuat, dan fungsi sensorik utuh. Foto polos menunjukkan fraktur tibia-fibula transversal bergeser. Di IGD, segera dipasang kassa steril dibasahi salin, tungkai distabilkan dengan bidai posterior, dan segera diberikan **Cefazolin 2g IV**, **Gentamisin 240mg IV (5 mg/kg)**, serta **Tetanus Toksoid + TIG**. Pasien dibawa ke kamar operasi dalam 4 jam, menjalani irigasi bedah agresif (9 liter salin), debridement menyeluruh pada otot dan tulang yang devitalisasi, serta stabilisasi sementara dengan **Fiksasi Eksternal (OREF)** unilateral. Tindakan ORIF definitif dan penutupan primer tertunda dilakukan 5 hari kemudian setelah kondisi jaringan lunak stabil."
    },
    "references": {
      "en": "• EAST Practice Management Guidelines for Prophylactic Antibiotics in Open Fractures (Eastern Association for the Surgery of Trauma 2011)\n• OTA/ACS Guidelines on the Care of Patients with Open Fractures (Orthopaedic Trauma Association 2022)\n• Advanced Trauma Life Support (ATLS) Student Course Manual, 10th Edition (American College of Surgeons)",
      "id": "• Pedoman Manajemen Praktik EAST untuk Antibiotik Profilaksis pada Fraktur Terbuka (Eastern Association for the Surgery of Trauma 2011)\n• Pedoman OTA/ACS tentang Perawatan Pasien dengan Fraktur Terbuka (Orthopaedic Trauma Association 2022)\n• Buku Panduan Kursus Siswa Advanced Trauma Life Support (ATLS), Edisi ke-10 (American College of Surgeons)"
    },
    "id": 30,
    "content": {
      "en": "An open fracture (also known as a compound fracture) is a bone fracture associated with a breach of the overlying skin and soft tissues, leading to direct communication between the fracture site and the external environment. It is considered a surgical emergency and is classified using the **Gustilo-Anderson Classification (Grade I, II, IIIA, IIIB, or IIIC)** based on wound size, energy, and degree of soft tissue injury/vascular compromise.",
      "id": "Fraktur terbuka (dikenal juga sebagai compound fracture) adalah patah tulang yang disertai robekan pada kulit dan jaringan lunak di atasnya, sehingga terjadi hubungan langsung antara area patahan tulang dengan lingkungan luar. Kondisi ini dianggap sebagai kegawatdaruratur kegawatdaruratan bedah dan diklasifikasikan menggunakan **Klasifikasi Gustilo-Anderson (Grade I, II, IIIA, IIIB, atau IIIC)** berdasarkan ukuran luka, energi trauma, serta derajat cedera jaringan lunak/gangguan vaskular."
    }
  },
  {
    "title": {
      "en": "Constipation Management",
      "id": "Penatalaksanaan Konstipasi"
    },
    "category": "Gastroenterology",
    "isStructured": true,
    "definition": {
      "en": "Constipation is a common gastrointestinal symptom characterized by infrequent bowel movements (typically **<3 times per week**), difficult stool passage (straining, painful defecation), hard or lumpy stools (**Bristol Stool Chart Types 1 and 2**), or a sensation of incomplete evacuation. It is classified into primary (functional, slow-transit, or dyssynergic defecation) or secondary (caused by medications, systemic/endocrine diseases, structural lesions, or neurological disorders). Functional constipation in adults is diagnosed using the **Rome IV Criteria**.",
      "id": "Konstipasi adalah gejala gastrointestinal umum yang ditandai dengan frekuensi buang air besar yang jarang (biasanya **<3 kali per minggu**), kesulitan mengeluarkan feses (harus mengejan, nyeri saat BAB), feses keras atau bergumpal (**Bristol Stool Chart Tipe 1 dan 2**), atau sensasi evakuasi yang tidak tuntas. Diklasifikasikan menjadi primer (fungsional, transit lambat, atau disfungsi defekasi/disinergi) atau sekunder (akibat obat-obatan, penyakit sistemik/endokrin, lesi struktural, atau gangguan neurologis). Konstipasi fungsional pada orang dewasa didiagnosis menggunakan **Kriteria Rome IV**."
    },
    "symptoms": {
      "en": "• **Infrequent stools**: <3 spontaneous bowel movements per week\n• Straining during at least 25% of defecations\n• Hard or lumpy stools (Bristol Type 1-2) in at least 25% of defecations\n• Sensation of **incomplete evacuation** in at least 25% of defecations\n• Sensation of **anorectal obstruction/blockage** in at least 25% of defecations\n• Manual maneuvers required to facilitate defecation (e.g., digital evacuation, pelvic floor support) in at least 25% of defecations\n• Abdominal bloating, mild lower abdominal discomfort, and flatulence",
      "id": "• **BAB Jarang**: <3 kali buang air besar spontan per minggu\n• Mengejan keras pada setidaknya 25% proses defekasi\n• Feses keras atau bergumpal (Bristol Tipe 1-2) pada setidaknya 25% proses defekasi\n• Sensasi **evakuasi tidak tuntas** pada setidaknya 25% proses defekasi\n• Sensasi **hambatan/sumbatan anorektal** pada setidaknya 25% proses defekasi\n• Memerlukan manuver manual untuk memudahkan defekasi (misal: evakuasi digital, penyangga dasar panggul) pada setidaknya 25% proses defekasi\n• Perut kembung, rasa tidak nyaman pada perut bagian bawah, dan flatulensi"
    },
    "physicalExamination": {
      "en": "• **Abdominal Examination**: Inspect for distension. Palpate for tenderness or palpable fecal masses (especially in the left lower quadrant). Auscultate for normal or hypoactive bowel sounds\n• **Digital Rectal Examination (DRE - CRITICAL)**: \n  • Inspect the perianal area for hemorrhoids, anal fissures, skin tags, or rectal prolapse\n  • Assess resting sphincter tone and squeeze pressure (rule out hypertonicity)\n  • Verify presence of **fecal impaction** (hard, dry stool in the rectal vault)\n  • Assess pelvic floor coordination: Ask the patient to bear down (push); normally, the puborectalis muscle relaxes and the anal sphincter opens. A paradoxical contraction or lack of relaxation indicates **pelvic floor dyssynergia**\n  • Rule out palpable rectal masses",
      "id": "• **Pemeriksaan Abdomen**: Inspeksi adanya distensi. Palpasi untuk menilai nyeri tekan atau massa feses yang teraba (terutama di kuadran kiri bawah). Auskultasi bising usus normal atau hipoaktif\n• **Colok Dubur (DRE - SANGAT KRITIS)**:\n  • Inspeksi area perianal untuk menilai hemoroid, fisura ani, skin tag, atau prolaps rektum\n  • Nilai tonus sfingter saat istirahat dan tekanan jepitan (singkirkan hipertonisitas)\n  • Pastikan adanya **impaksi fekal** (feses keras dan kering di dalam ampula rektum)\n  • Nilai koordinasi dasar panggul: Minta pasien mengejan; normalnya, otot puborektalis relaksasi dan sfingter ani terbuka. Kontraksi paradoksikal atau ketiadaan relaksasi menunjukkan **disinergi dasar panggul**\n  • Singkirkan adanya massa rektum yang teraba"
    },
    "labFindings": {
      "en": "• **Basic Labs (indicated for red flags or refractory cases)**: \n  • Complete Blood Count (CBC) to screen for anemia (suggesting malignancy or chronic bleeding)\n  • Serum Calcium (hypercalcemia causes constipation)\n  • Thyroid Stimulating Hormone (**TSH** - hypothyroidism screen)\n  • Serum electrolytes and fasting blood glucose (diabetes screen)\n• **Endoscopy**: **Colonoscopy** is indicated in patients **>=45 years** (or >=50 years depending on local screening guidelines) with new-onset symptoms, or at any age in the presence of alarm signs\n• **Physiological Testing (refractory constipation)**: Anorectal manometry and Balloon Expulsion Test to diagnose dyssynergic defecation; Colonic Transit Study (Sitzmark radiopaque markers) to evaluate for slow-transit constipation",
      "id": "• **Lab Dasar (diindikasikan untuk tanda bahaya atau kasus refrakter)**:\n  • Darah Lengkap (CBC) untuk skrining anemia (mencurigakan keganasan atau perdarahan skor)\n  • Kalsium Serum (hiperkalsemia menyebabkan konstipasi)\n  • Thyroid Stimulating Hormone (**TSH** - skrining hipotiroidisme)\n  • Elektrolit serum dan gula darah puasa (skrining diabetes)\n• **Endoskopi**: **Kolonoskopi** diindikasikan pada pasien **usia >=45 tahun** (atau >=50 tahun tergantung pedoman skrining lokal) dengan gejala yang baru muncul, atau pada usia berapa pun jika terdapat tanda bahaya\n• **Pemeriksaan Fisiologis (konstipasi refrakter)**: Manometri anorektal dan Uji Pengeluaran Balon (Balloon Expulsion Test) untuk mendiagnosis disinergi defekasi; Studi Transit Kolon (marker radiopak Sitzmark) untuk mengevaluasi konstipasi transit lambat"
    },
    "differentialDiagnosis": {
      "en": "• Irritable Bowel Syndrome with Constipation (IBS-C - marked by prominent abdominal pain relieved by defecation)\n• Colorectal Malignancy / Mechanical Obstruction\n• Medication-Induced Constipation (especially **Opioids, Calcium Channel Blockers (Diltiazem/Verapamil), Anticholinergics, Iron supplements**)\n• Hypothyroidism or Hypercalcemia\n• Pelvic Floor Dyssynergia (obstructed defecation syndrome)\n• Slow-Transit Constipation (colonic inertia)",
      "id": "• Sindrom Iritasi Usus dengan Konstipasi (IBS-C - ditandai dengan nyeri perut menonjol yang membaik setelah defekasi)\n• Keganasan Kolorektal / Obstruksi Mekanis\n• Konstipasi Akibat Obat-obatan (terutama **Opioid, Calcium Channel Blocker (Diltiazem/Verapamil), Antikolinergik, Suplemen zat besi**)\n• Hipotiroidisme atau Hiperkalsemia\n• Disinergi Dasar Panggul (sindrom obstruksi defekasi)\n• Konstipasi Transit Lambat (inersia kolon)"
    },
    "dangerSigns": {
      "en": "• **Alarm Symptoms (Red Flags - require urgent referral for Colonoscopy)**:\n  • New-onset constipation in a patient **>=45-50 years**\n  • Unexplained **weight loss** (>10% of body weight in 6 months)\n  • Rectal bleeding (**hematochezia**) or positive fecal occult blood\n  • Iron deficiency anemia\n  • Family history of colorectal cancer or Inflammatory Bowel Disease (IBD)\n  • Sudden change in bowel habits or progressive worsening\n  • Palpable abdominal or rectal mass\n  • Persistent fever, vomiting, or severe abdominal pain (suggesting mechanical bowel obstruction)",
      "id": "• **Gejala Alarm (Tanda Bahaya - memerlukan rujukan segera untuk Kolonoskopi)**:\n  • Konstipasi yang baru muncul pada pasien **usia >=45-50 tahun**\n  • Penurunan **berat badan** yang tidak dapat dijelaskan (>10% berat badan dalam 6 bulan)\n  • Perdarahan rektum (**hematokezia**) atau darah samar feses positif\n  • Anemia defisiensi besi\n  • Riwayat keluarga dengan kanker kolorektal atau Inflammatory Bowel Disease (IBD)\n  • Perubahan pola buang air besar yang mendadak atau memburuk secara progresif\n  • Teraba massa pada abdomen atau rektum\n  • Demam persisten, muntah, atau nyeri perut hebat (mencurigakan obstruksi usus mekanis)"
    },
    "management": {
      "initialTreatment": {
        "en": "• **Dietary Modification**: Gradually increase dietary fiber intake to **25-30 g/day** (fruits, vegetables, whole grains, psyllium husks). *Note: Fiber should be avoided in severe slow-transit constipation or megacolon*\n• **Hydration & Exercise**: Maintain adequate fluid intake (**1.5-2.0 Liters/day** of water) and increase daily physical activity\n• **Bowel Training**: Instruct the patient to attempt defecation consistently **15-30 minutes after meals** (especially breakfast, utilizing the gastrocolic reflex) and never ignore the urge to defecate. Advise optimal toilet positioning using a footstool to elevate knees (straightens the anorectal angle)\n• **Fecal Impaction Relief**: If DRE confirms impaction, perform digital disimpaction or administer a **Glycerin Suppository** or **Phosphate Enema** before starting oral laxatives",
        "id": "• **Modifikasi Diet**: Tingkatkan asupan serat secara bertahap hingga **25-30 g/hari** (buah, sayur, gandum utuh, sekam psyllium). *Catatan: Serat harus dihindari pada konstipasi transit lambat yang berat atau megakolon*\n• **Hidrasi & Olahraga**: Pertahankan asupan cairan yang cukup (**1,5-2,0 Liter/hari** air) dan tingkatkan aktivitas fisik harian\n• **Bowel Training**: Instruksikan pasien untuk mencoba BAB secara konsisten **15-30 menit setelah makan** (terutama sarapan, memanfaatkan refleks gastrokolik) dan jangan pernah mengabaikan keinginan BAB. Sarankan posisi toilet yang optimal menggunakan bangku kaki untuk meninggikan lutut (meluruskan sudut anorektal)\n• **Penanganan Impaksi Fekal**: Jika DRE memastikan adanya impaksi, lakukan evakuasi digital atau berikan **Supositoria Gliserin** atau **Enema Fosfat** sebelum memulai laksatif oral"
      },
      "definitiveTreatment": {
        "en": "• **Step 1: Osmotic Laxatives (First-Line)**: Start **Polyethylene Glycol (PEG 3350) 17 g PO daily** dissolved in water OR **Lactulose 15-30 mL PO daily**. These draw water into the intestinal lumen, softening the stool and increasing frequency\n• **Step 2: Bulk-Forming Laxatives**: **Psyllium 3.4 g PO once to thrice daily** with a full glass of water (if tolerated and dietary fiber is insufficient)\n• **Step 3: Stimulant Laxatives (As-Needed/Rescue)**: Add **Bisacodyl 5-10 mg PO/PR daily** or **Senna 8.6-17.2 mg PO daily**. Use for short courses or rescue therapy (e.g., when no bowel movement occurs for 2 days) to stimulate colonic motility. *Note: Avoid chronic daily stimulant laxative overuse*\n• **Step 4: Opioid-Induced Constipation (OIC)**: Start a combination of osmotic and stimulant laxatives. For refractory OIC, utilize Peripherally Acting Mu-Opioid Receptor Antagonists (PAMORAs) such as **Methylnaltrexone 12 mg SC daily** or **Naloxegol 25 mg PO daily**\n• **Step 5: Pelvic Floor Dyssynergia**: The gold standard treatment is **Anorectal Biofeedback Therapy** (re-trains pelvic floor relaxation during straining); laxatives are often ineffective",
        "id": "• **Langkah 1: Laksatif Osmotik (Lini Pertama)**: Mulai **Polietilen Glikol (PEG 3350) 17 g PO sehari** dilarutkan dalam air ATAU **Laktulosa 15-30 mL PO sehari**. Obat ini menarik air ke dalam lumen usus, melunakkan feses dan meningkatkan frekuensi\n• **Langkah 2: Laksatif Pembentuk Massa (Bulk-Forming)**: **Psyllium 3,4 g PO satu hingga tiga kali sehari** dengan segelas penuh air (jika ditoleransi dan serat makanan tidak mencukupi)\n• **Langkah 3: Laksatif Stimulan (Sesuai Kebutuhan/Penyelamat)**: Tambahkan **Bisakodil 5-10 mg PO/PR sehari** atau **Senna 8,6-17,2 mg PO sehari**. Gunakan untuk jangka pendek atau terapi penyelamat (misal: jika tidak ada BAB selama 2 hari) untuk merangsang motilitas kolon. *Catatan: Hindari penggunaan laksatif stimulan harian kronis secara berlebihan*\n• **Langkah 4: Konstipasi Akibat Opioid (OIC)**: Mulai kombinasi laksatif osmotik dan stimulan. Untuk OIC yang refrakter, gunakan Peripherally Acting Mu-Opioid Receptor Antagonists (PAMORA) seperti **Metilnaltrekson 12 mg SC sehari** atau **Naloksegol 25 mg PO sehari**\n• **Langkah 5: Disinergi Dasar Panggul**: Terapi standar emas adalah **Terapi Biofeedback Anorektal** (melatih kembali relaksasi dasar panggul saat mengejan); laksatif sering kali tidak efektif"
      },
      "rehab": {
        "en": "• Comprehensive biofeedback training sessions (usually 5-6 sessions) for pelvic floor dyssynergia\n• Long-term dietary maintenance and structured daily bowel routine habits to sustain regular colonic transit",
        "id": "• Sesi latihan biofeedback komprehensif (biasanya 5-6 sesi) untuk disinergi dasar panggul\n• Pemeliharaan diet jangka panjang dan pembiasaan rutinitas buang air besar harian yang terstruktur untuk mempertahankan transit kolon yang teratur"
      },
      "referral": {
        "en": "• **Refer to Gastroenterology** for:\n  • Presence of any alarm symptoms (Red Flags)\n  • Refractory constipation failing to respond to 4-6 weeks of optimal osmotic and stimulant laxative therapies\n  • Suspected pelvic floor dyssynergia (requires physiological testing and biofeedback)\n• **Refer to General Surgery** for mechanical bowel obstruction, severe rectal prolapse, or refractory slow-transit constipation failing all medical treatments (may require subtotal colectomy)",
        "id": "• **Rujuk ke Spesialis Gastroenterologi** untuk:\n  • Adanya salah satu gejala alarm (Tanda Bahaya)\n  • Konstipasi refrakter yang gagal merespons terapi optimal laksatif osmotik dan stimulan selama 4-6 minggu\n  • Kecurigaan disinergi dasar panggul (memerlukan pemeriksaan fisiologis dan biofeedback)\n• **Rujuk ke Spesialis Bedah Umum** untuk obstruksi usus mekanis, prolaps rektum berat, atau konstipasi transit lambat refrakter yang gagal dengan semua terapi medis (mungkin memerlukan kolektomi subtotal)"
      },
      "workup": {
        "en": "• Diagnostic algorithm: Apply Rome IV criteria, assess for secondary causes (review medication list, check thyroid and calcium panels), perform DRE, check for alarm signs, and arrange colonoscopy if indicated",
        "id": "• Algoritma diagnostik: Terapkan kriteria Rome IV, nilai penyebab sekunder (tinjau daftar obat, periksa panel tiroid dan kalsium), lakukan colok dubur, periksa tanda bahaya, dan jadwalkan kolonoskopi jika diindikasikan"
      }
    },
    "followUp": {
      "en": "• Re-evaluate in **2-4 weeks** after initiating therapy to assess stool consistency (Bristol Stool Chart target Type 3-4), frequency, and ease of evacuation\n• Adjust laxative dosages to the minimum effective dose to maintain 1 soft stool daily or every other day\n• Monitor for side effects (abdominal cramping, diarrhea, flatulence) and electrolyte shifts in elderly patients on long-term laxatives",
      "id": "• Evaluasi ulang dalam **2-4 minggu** setelah memulai terapi untuk menilai konsistensi feses (target Bristol Stool Chart Tipe 3-4), frekuensi, dan kemudahan pengeluaran\n• Sesuaikan dosis laksatif ke dosis efektif minimal untuk mempertahankan 1 kali BAB lunak setiap hari atau dua hari sekali\n• Pantau efek samping (kram perut, diare, flatulensi) dan pergeseran elektrolit pada pasien lansia dengan penggunaan laksatif jangka panjang"
    },
    "prevention": {
      "pharmacological": {
        "en": "• Proactively co-prescribe a prophylactic bowel regimen (e.g., **PEG 3350 or Senna**) when initiating chronic constipating medications, especially **Opioids** or high-dose oral **Iron** supplements\n• Periodically review and de-prescribe unnecessary constipating drugs",
        "id": "• Berikan resep regimen saluran cerna profilaksis secara proaktif (misal: **PEG 3350 atau Senna**) saat memulai pengobatan kronis yang memicu konstipasi, terutama **Opioid** atau suplemen **Zat Besi** oral dosis tinggi\n• Tinjau secara berkala dan hentikan (de-preskripsi) obat-obatan pemicu konstipasi yang tidak diperlukan"
      },
      "nonPharmacological": {
        "en": "• High daily dietary fiber intake (25-30g) and consistent daily hydration (1.5-2L water)\n• Regular physical exercise (promotes bowel peristalsis)\n• Establish a regular unhurried time for daily bowel movements (usually after breakfast) to maintain natural colonic reflexes",
        "id": "• Asupan serat makanan harian yang tinggi (25-30g) dan hidrasi harian yang konsisten (1,5-2L air)\n• Latihan fisik secara teratur (merangsang peristaltik usus)\n• Tetapkan waktu khusus yang santai untuk buang air besar harian (biasanya setelah sarapan) untuk menjaga refleks alami kolon"
      }
    },
    "caseExample": {
      "en": "A 67-year-old female presents to the emergency department after passing hard, lumpy stools (Bristol Type 1) only twice a week, accompanied by severe straining and a feeling of blockage. She was recently started on **Diltiazem 180 mg PO daily** for hypertension. She denies weight loss, fever, or hematochezia. On examination, her abdomen is mildy distended with fecal fullness in the LLQ. DRE reveals a large amount of hard, dry stool in the rectal vault (fecal impaction), normal sphincter tone, and appropriate pelvic floor relaxation. Her TSH and serum calcium are normal. A baseline colonoscopy completed 2 years ago was normal. Fecal impaction is relieved in the clinic with a glycerin suppository. Diltiazem is discontinued and switched to an ARB (**Losartan 50 mg PO daily**). She is prescribed **Polyethylene Glycol 17 g PO daily**, educated on increasing fiber (oatmeal, prunes) and water intake, and advised to attempt defecation 20 minutes after breakfast. At a 3-week follow-up, she reports passing a soft, formed stool (Bristol Type 4) daily with no straining or laxative side effects.",
      "id": "Seorang wanita 67 tahun datang dengan riwayat BAB feses keras bergumpal (Bristol Tipe 1) sejak 4 bulan hanya dua kali seminggu, disertai mengejan keras dan rasa tersumbat. Ia baru saja mulai mengonsumsi **Diltiazem 180 mg PO sehari** untuk hipertensi. Ia menyangkal adanya penurunan berat badan, demam, atau hematokezia. Pada pemeriksaan abdomen, perut tampak sedikit cembung dengan massa fekal teraba di LLQ. DRE menunjukkan adanya feses keras dan kering dalam jumlah banyak di rektum (impaksi fekal), tonus sfingter normal, dan relaksasi dasar panggul yang sesuai. TSH dan kalsium serum normal. Kolonoskopi dasar yang diselesaikan 2 tahun lalu normal. Impaksi fekal diatasi di klinik dengan supositoria gliserin. Diltiazem dihentikan dan diganti dengan ARB (**Losartan 50 mg PO sehari**). Ia diresepkan **Polietilen Glikol 17 g PO sehari**, diberikan edukasi untuk meningkatkan asupan serat (oatmeal, prune) dan air, serta disarankan mencoba BAB 20 menit setelah sarapan. Pada kontrol 3 minggu, ia melaporkan BAB feses lunak berbentuk (Bristol Tipe 4) setiap hari tanpa mengejan atau efek samping laksatif."
    },
    "references": {
      "en": "• AGA Medical Position Statement on Guidelines for the Evaluation and Management of Constipation (Gastroenterology 2013)\n• Rome IV Criteria for Functional Gastrointestinal Disorders (Gastroenterology 2016)\n• Bharucha AE, et al. Gastroenterology. 2013;144(1):211-217\n• Lacy BE, et al. Gastroenterology. 2016;150(6):1393-1407",
      "id": "• Pernyataan Posisi Medis AGA tentang Pedoman Evaluasi dan Penatalaksanaan Konstipasi (Gastroenterology 2013)\n• Kriteria Rome IV untuk Gangguan Gastrointestinal Fungsional (Gastroenterology 2016)\n• Bharucha AE, et al. Gastroenterology. 2013;144(1):211-217\n• Lacy BE, et al. Gastroenterology. 2016;150(6):1393-1407"
    },
    "id": 31,
    "content": {
      "en": "Constipation is a common gastrointestinal symptom characterized by infrequent bowel movements (typically **<3 times per week**), difficult stool passage (straining, painful defecation), hard or lumpy stools (**Bristol Stool Chart Types 1 and 2**), or a sensation of incomplete evacuation. It is classified into primary (functional, slow-transit, or dyssynergic defecation) or secondary (caused by medications, systemic/endocrine diseases, structural lesions, or neurological disorders). Functional constipation in adults is diagnosed using the **Rome IV Criteria**.",
      "id": "Konstipasi adalah gejala gastrointestinal umum yang ditandai dengan frekuensi buang air besar yang jarang (biasanya **<3 kali per minggu**), kesulitan mengeluarkan feses (harus mengejan, nyeri saat BAB), feses keras atau bergumpal (**Bristol Stool Chart Tipe 1 dan 2**), atau sensasi evakuasi yang tidak tuntas. Diklasifikasikan menjadi primer (fungsional, transit lambat, atau disfungsi defekasi/disinergi) atau sekunder (akibat obat-obatan, penyakit sistemik/endokrin, lesi struktural, atau gangguan neurologis). Konstipasi fungsional pada orang dewasa didiagnosis menggunakan **Kriteria Rome IV**."
    }
  }
];
