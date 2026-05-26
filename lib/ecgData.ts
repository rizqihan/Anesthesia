export interface ECGDiagnosisRecord {
  id: string;
  title: { en: string; id: string };
  category: 'acs' | 'st-equivalent' | 'red-flags' | 'arrhythmia';
  overview: { en: string; id: string };
  ecgPattern: {
    keyFindings: { en: string[]; id: string[] };
    leads: { en: string; id: string };
    waveformType: string;
  };
  diagnosticCriteria: { en: string; id: string };
  supportingDiagnostics: { en: string; id: string };
  differentialDiagnosis: { en: string; id: string };
  treatment: {
    initial: { en: string; id: string };
    definitive: { en: string; id: string };
    caution: { en: string; id: string };
    referral: { en: string; id: string };
  };
  pearls: { en: string; id: string };
  references: { en: string; id: string };
}

export const ECG_DIAGNOSES_DB: ECGDiagnosisRecord[] = [
  {
    id: 'stemi',
    title: {
      en: 'STEMI (ST-Elevation Myocardial Infarction)',
      id: 'STEMI (Infark Miokard dengan Elevasi ST)'
    },
    category: 'acs',
    overview: {
      en: 'STEMI is a life-threatening clinical syndrome characterized by myocardial ischemia associated with ECG ST-segment elevation, reflecting complete transmural coronary artery occlusion. Immediate reperfusion therapy is mandatory to salvage myocardium.',
      id: 'STEMI adalah sindrom klinis yang mengancam jiwa ditandai oleh iskemia miokard yang disertai dengan elevasi segmen ST pada EKG, mencerminkan oklusi total transmural arteri koroner. Terapi reperfusi segera wajib dilakukan untuk menyelamatkan miokardium.'
    },
    ecgPattern: {
      waveformType: 'stemi',
      leads: {
        en: 'Dependent on vessel: Anterior (V1-V4), Inferior (II, III, aVF), Lateral (I, aVL, V5-V6), Right Ventricular (V3R-V4R).',
        id: 'Tergantung pembuluh darah: Anterior (V1-V4), Inferior (II, III, aVF), Lateral (I, aVL, V5-V6), Ventrikel Kanan (V3R-V4R).'
      },
      keyFindings: {
        en: [
          'New J-point ST elevation in at least 2 contiguous leads (≥1 mm in all leads except V2-V3; in V2-V3, ≥2 mm in men ≥40 years, ≥2.5 mm in men <40 years, or ≥1.5 mm in women).',
          'Reciprocal ST depression in anatomically opposite leads (e.g., ST depression in I, aVL for inferior STEMI).',
          'Hyperacute T waves (broad, symmetric, tall T waves) early in the presentation.',
          'Evolutionary changes: ST elevation → T wave inversion → Pathological Q waves.'
        ],
        id: [
          'Elevasi ST titik J baru di minimal 2 sadapan berdekatan (≥1 mm di semua sadapan kecuali V2-V3; di V2-V3, ≥2 mm pada pria ≥40 tahun, ≥2.5 mm pada pria <40 tahun, atau ≥1.5 mm pada wanita).',
          'Depresi ST resiprokal di sadapan yang berlawanan secara anatomis (misal, depresi ST di I, aVL untuk STEMI inferior).',
          'Gelombang T hiperakut (lebar, simetris, tinggi) pada fase awal.',
          'Perubahan evolusioner: Elevasi ST → Inversi gelombang T → Gelombang Q patologis.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Clinical Presentation:** Angina-like chest pain lasting >20 minutes, radiating to the left arm, neck, or jaw, unrelieved by nitrates, accompanied by diaphoresis, dyspnea, or nausea.\n\n**ECG Criteria:** Significant J-point elevation in at least two contiguous leads, excluding mimic conditions (e.g., LBBB, Brugada, early repolarization, pericarditis).\n\n**Biomarkers:** High-sensitivity Cardiac Troponin (hs-cTn) T or I is elevated, though reperfusion should not be delayed waiting for lab results.',
      id: '**Presentasi Klinis:** Nyeri dada tipikal (angina) berlangsung >20 menit, menjalar ke lengan kiri, leher, atau rahang, tidak membaik dengan nitrat, disertai keringat dingin, sesak napas, atau mual.\n\n**Kriteria EKG:** Elevasi segmen ST yang signifikan pada titik J di minimal dua sadapan berdekatan, menyingkirkan kondisi peniru (misal, LBBB, Brugada, repolarisasi dini, perikarditis).\n\n**Biomarker:** Troponin Jantung sensitivitas tinggi (hs-cTn) T atau I meningkat, namun terapi reperfusi tidak boleh ditunda demi menunggu hasil laboratorium.'
    },
    supportingDiagnostics: {
      en: '1. **High-sensitivity Cardiac Troponin:** Baseline and serial draws.\n2. **Bedside Echocardiography:** To assess regional wall motion abnormalities (RWMA) and rule out mechanical complications (e.g., free wall rupture, VSD).\n3. **Chest X-Ray:** To evaluate for pulmonary congestion/edema and rule out aortic dissection.\n4. **Routine Labs:** Serum electrolytes, renal function, coagulation profile, lipid panel.',
      id: '1. **Troponin Jantung Sensitivitas Tinggi:** Pemeriksaan awal dan serial.\n2. **Ekokardiografi Bedside:** Untuk menilai kelainan gerakan dinding regional (RWMA) dan menyingkirkan komplikasi mekanis (misal, ruptur dinding bebas, VSD).\n3. **Rontgen Dada:** Untuk mengevaluasi bendungan/edema paru dan menyingkirkan diseksi aorta.\n4. **Lab Rutin:** Elektrolit serum, fungsi ginjal, profil koagulasi, profil lipid.'
    },
    differentialDiagnosis: {
      en: '1. **Acute Pericarditis:** Diffuse concave ST elevation with PR segment depression, lacking reciprocal changes.\n2. **Left Ventricular Aneurysm:** Persistent ST elevation after previous MI, typically with deep Q waves in V1-V4.\n3. **Benign Early Repolarization (BER):** Widespread concave ST elevation with J-notch or fishhook morphology, stable over time, common in young athletic males.\n4. **Aortic Dissection:** Can cause inferior STEMI if it dissects into the RCA; severe tearing chest pain radiating to the back.',
      id: '1. **Perikarditis Akut:** Elevasi ST konkaf difus disertai depresi segmen PR, tidak ada perubahan resiprokal.\n2. **Aneurisma Ventrikel Kiri:** Elevasi ST persisten setelah infark miokard sebelumnya, biasanya dengan gelombang Q dalam di V1-V4.\n3. **Repolarisasi Dini Jinak (BER):** Elevasi ST konkaf tersebar luas dengan takik J atau morfologi kail ikan (fishhook), stabil seiring waktu, sering terjadi pada pria muda atletis.\n4. **Diseksi Aorta:** Dapat menyebabkan STEMI inferior jika robekan mengenai pangkal arteri koroner kanan (RCA); nyeri dada robek hebat menjalar ke punggung.'
    },
    treatment: {
      initial: {
        en: '1. **Oxygen:** Titrate to maintain SpO2 ≥ 90% (or ≥ 92% in patients with COPD).\n2. **Antiplatelets:** Aspirin 160-320 mg chewed immediately, combined with a P2Y12 inhibitor (Clopidogrel 300-600 mg load, Ticagrelor 180 mg load, or Prasugrel 60 mg load).\n3. **Anticoagulation:** Unfractionated Heparin (UFH) 70-100 U/kg IV bolus, or Enoxaparin 0.5 mg/kg IV bolus followed by subcutaneous dose.\n4. **Nitrates:** Sublingual Nitroglycerin 0.4 mg every 5 minutes up to 3 doses for ischemic pain control (avoid in inferior/RV infarction or hypotension).\n5. **Analgesia:** Morphine 2-4 mg IV slow injection for severe chest pain.',
        id: '1. **Oksigen:** Titrasi untuk mempertahankan SpO2 ≥ 90% (atau ≥ 92% pada pasien PPOK).\n2. **Antiplatelet:** Aspirin 160-320 mg dikunyah segera, dikombinasikan dengan penghambat P2Y12 (Klopidogrel 300-600 mg loading, Tikagrelor 180 mg loading, atau Prasugrel 60 mg loading).\n3. **Antikoagulan:** Heparin tidak terfraksi (UFH) bolus IV 70-100 U/kg, atau Enoksaparin 0.5 mg/kg bolus IV diikuti dosis subkutan.\n4. **Nitrat:** Nitrogliserin sublingual 0.4 mg setiap 5 menit hingga 3 dosis untuk mengontrol nyeri iskemik (hindari pada infark inferior/RV atau hipotensi).\n5. **Analgesia:** Morfin 2-4 mg IV injeksi lambat untuk nyeri dada hebat.'
      },
      definitive: {
        en: '1. **Primary Percutaneous Coronary Intervention (PCI):** The gold standard. Goal is door-to-balloon time ≤ 90 minutes (≤ 120 minutes if transferred from a non-PCI center).\n2. **Fibrinolytic Therapy:** Indicated if primary PCI cannot be performed within 120 minutes of first medical contact and there are no contraindications. Goal is door-to-needle time ≤ 30 minutes. Regimens: Tenecteplase (weight-based IV bolus), Alteplase, or Reteplase.',
        id: '1. **Intervensi Koroner Perkutan Primer (PCI Primer):** Standar utama. Target waktu door-to-balloon adalah ≤ 90 menit (≤ 120 menit jika dirujuk dari pusat non-PCI).\n2. **Terapi Fibrinolitik:** Diindikasikan jika PCI primer tidak dapat dilakukan dalam waktu 120 menit sejak kontak medis pertama dan tidak ada kontraindikasi. Target waktu door-to-needle adalah ≤ 30 menit. Regimen: Tenekteplase (bolus IV berdasarkan berat badan), Alteplase, atau Reteplase.'
      },
      caution: {
        en: '• **Inferior/RV Infarction:** Avoid Nitrates and Morphine as they reduce preload and cause catastrophic hypotension. Treat hypotension with IV fluids.\n• **Fibrinolysis Absolute Contraindications:** History of hemorrhagic stroke, ischemic stroke within 6 months, active internal bleeding, suspected aortic dissection, known intracranial neoplasm.',
        id: '• **Infark Inferior/Ventrikel Kanan:** Hindari Nitrat dan Morfin karena menurunkan preload dan dapat menyebabkan hipotensi berat. Atasi hipotensi dengan cairan IV bolus.\n• **Kontraindikasi Absolut Fibrinolisis:** Riwayat stroke hemoragik, stroke iskemik dalam 6 bulan, perdarahan internal aktif, kecurigaan diseksi aorta, neoplasma intrakranial.'
      },
      referral: {
        en: 'Immediate transfer to a PCI-capable center. If undergoing fibrinolysis at a non-PCI center, plan a routine early transfer for rescue PCI (if fibrinolysis fails) or routine angiography within 2-24 hours.',
        id: 'Rujukan segera ke pusat dengan fasilitas PCI. Jika menjalani fibrinolisis di pusat non-PCI, rencanakan rujukan segera untuk PCI penyelamatan (jika fibrinolisis gagal) atau angiografi rutin dalam 2-24 jam.'
      }
    },
    pearls: {
      en: '**"Time is Muscle."** Every minute of delay increases myocardial necrosis. If inferior STEMI is identified, ALWAYS obtain right-sided leads (V3R, V4R) to check for Right Ventricular Infarction and posterior leads (V7-V9) if standard leads are equivocal.',
      id: '**"Waktu adalah Otot."** Setiap menit keterlambatan meningkatkan nekrosis miokardium. Jika STEMI inferior teridentifikasi, SELALU rekam sadapan sisi kanan (V3R, V4R) untuk memeriksa Infark Ventrikel Kanan dan sadapan posterior (V7-V9) jika sadapan standar meragukan.'
    },
    references: {
      en: '1. **2023 ESC Guidelines** for the management of acute coronary syndromes.\n2. **2013 ACCF/AHA Guideline** for the Management of ST-Elevation Myocardial Infarction.',
      id: '1. **Pedoman ESC 2023** untuk pengelolaan sindrom koroner akut.\n2. **Pedoman ACCF/AHA 2013** untuk Pengelolaan Infark Miokard dengan Elevasi ST.'
    }
  },
  {
    id: 'nstemi',
    title: {
      en: 'NSTEMI (Non-ST-Elevation Myocardial Infarction)',
      id: 'NSTEMI (Infark Miokard tanpa Elevasi ST)'
    },
    category: 'acs',
    overview: {
      en: 'NSTEMI results from partial or transient coronary artery occlusion leading to myocardial necrosis. Unlike STEMI, transmural infarction is absent. Diagnosis is established by ischemic symptoms, ECG changes (ST depression or T wave inversion), and elevated cardiac biomarkers.',
      id: 'NSTEMI terjadi akibat oklusi koroner parsial atau transien yang menyebabkan nekrosis miokardium. Berbeda dengan STEMI, tidak ada infark transmural. Diagnosis ditegakkan melalui gejala iskemik, perubahan EKG (depresi ST atau inversi gelombang T), dan peningkatan biomarker jantung.'
    },
    ecgPattern: {
      waveformType: 'nstemi',
      leads: {
        en: 'Widespread or localized (dependent on ischemia territory). Common in V4-V6, I, aVL, or II, III, aVF.',
        id: 'Tersebar luas atau terlokalisasi (tergantung wilayah iskemia). Sering di V4-V6, I, aVL, atau II, III, aVF.'
      },
      keyFindings: {
        en: [
          'Horizontal or downsloping ST-segment depression ≥0.5 mm in 2 contiguous leads.',
          'T-wave inversion ≥1 mm in 2 contiguous leads with prominent R waves or R/S ratio >1.',
          'Transient ST-segment elevation (lasting <20 minutes).',
          'Can present with a completely normal ECG in up to 30% of cases.'
        ],
        id: [
          'Depresi segmen ST horizontal atau downsloping ≥0.5 mm di 2 sadapan berdekatan.',
          'Inversi gelombang T ≥1 mm di 2 sadapan berdekatan dengan gelombang R menonjol atau rasio R/S >1.',
          'Elevasi segmen ST transien (berlangsung <20 menit).',
          'Dapat menunjukkan EKG yang sepenuhnya normal pada sekitar 30% kasus.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Clinical Presentation:** Ischemic chest discomfort occurring at rest or with minimal exertion, accelerating in frequency or severity.\n\n**ECG:** ST depression, T wave inversion, or non-specific changes, without persistent ST elevation.\n\n**Cardiac Biomarkers:** Mandatory rise and/or fall of High-sensitivity Cardiac Troponin (hs-cTn) with at least one value above the 99th percentile upper reference limit.',
      id: '**Presentasi Klinis:** Ketidaknyamanan dada iskemik yang terjadi saat istirahat atau aktivitas minimal, meningkat dalam frekuensi atau intensitas.\n\n**EKG:** Depresi segmen ST, inversi gelombang T, atau perubahan non-spesifik, tanpa elevasi ST yang persisten.\n\n**Biomarker Jantung:** Kenaikan dan/atau penurunan wajib dari Troponin Jantung sensitivitas tinggi (hs-cTn) dengan setidaknya satu nilai di atas persentil ke-99 batas referensi atas.'
    },
    supportingDiagnostics: {
      en: '1. **Serial hs-cTn:** Performed at 0, 1, 2, or 3 hours (ESC fast-track protocols).\n2. **Echocardiography:** Assess for left ventricular function and regional wall motion abnormalities.\n3. **Risk Stratification Tools:** **GRACE score** (predicts 6-month mortality) and **TIMI score** to guide the timing of invasive therapy.',
      id: '1. **hs-cTn Serial:** Dilakukan pada 0, 1, 2, atau 3 jam (protokol jalur cepat ESC).\n2. **Ekokardiografi:** Menilai fungsi ventrikel kiri dan adanya kelainan gerakan dinding regional.\n3. **Alat Stratifikasi Risiko:** **Skor GRACE** (memprediksi mortalitas 6 bulan) dan **Skor TIMI** untuk memandu penentuan waktu terapi invasif.'
    },
    differentialDiagnosis: {
      en: '1. **Unstable Angina:** Identical presentation and ECG findings, but with **negative** cardiac troponins.\n2. **Myocarditis:** Chest pain, elevated troponin, and ST/T changes, but typically associated with viral prodrome and diffuse ST elevations.\n3. **Takotsubo Cardiomyopathy:** Stress-induced cardiomyopathy mimicking ACS, characterized by apical ballooning on echo.\n4. **Pulmonary Embolism:** Acute chest pain, dyspnea, elevated troponins; look for right strain pattern on ECG.',
      id: '1. **Angina Tidak Stabil:** Presentasi klinis dan temuan EKG yang identik, tetapi dengan troponin jantung yang **negatif**.\n2. **Miokarditis:** Nyeri dada, peningkatan troponin, dan perubahan ST/T, tetapi biasanya berhubungan dengan prodromal virus dan elevasi ST difus.\n3. **Kardiomiopati Takotsubo:** Kardiomiopati akibat stres yang meniru SKA, ditandai dengan gambaran balon apikal pada ekokardiografi.\n4. **Emboli Paru:** Nyeri dada akut, sesak napas, peningkatan troponin; cari pola regangan ventrikel kanan pada EKG.'
    },
    treatment: {
      initial: {
        en: '1. **Dual Antiplatelet Therapy (DAPT):** Aspirin 160-320 mg chewed immediately, plus Clopidogrel 300-600 mg loading (or Ticagrelor 180 mg loading). Note: Prasugrel is reserved for when coronary anatomy is known before PCI.\n2. **Anticoagulation:** Fondaparinux 2.5 mg subcutaneous daily (preferred over Enoxaparin due to lower bleeding risk) or Enoxaparin 1 mg/kg subcutaneously every 12 hours.\n3. **Anti-ischemics:** Sublingual Nitroglycerin or IV Nitroglycerin infusion (avoid in hypotension). Beta-blockers (e.g., Metoprolol 25-50 mg orally every 12 hours) if no signs of heart failure or bronchospasm.',
        id: '1. **Terapi Antiplatelet Ganda (DAPT):** Aspirin 160-320 mg dikunyah segera, ditambah Klopidogrel 300-600 mg loading (atau Tikagrelor 180 mg loading). Catatan: Prasugrel dicadangkan jika anatomi koroner sudah diketahui sebelum PCI.\n2. **Antikoagulan:** Fondaparinuks 2.5 mg subkutan harian (lebih disukai daripada Enoksaparin karena risiko perdarahan lebih rendah) atau Enoksaparin 1 mg/kg subkutan setiap 12 jam.\n3. **Anti-iskemik:** Nitrogliserin sublingual atau infus IV (hindari pada hipotensi). Beta-blocker (misal, Metoprolol 25-50 mg oral setiap 12 jam) jika tidak ada tanda gagal jantung atau bronkospasme.'
      },
      definitive: {
        en: '1. **Invasive Strategy (Coronary Angiography + PCI/CABG):** Timing depends on risk:\n   - **Immediate Invasive (<2h):** Hemodynamic instability, cardiogenic shock, refractory chest pain, life-threatening arrhythmias.\n   - **Early Invasive (<24h):** GRACE score >140, dynamic ST/T changes, serial rise in troponin.\n   - **Selective Invasive (<72h):** GRACE <140, diabetes, renal insufficiency, prior CABG/PCI.',
        id: '1. **Strategi Invasif (Angiografi Koroner + PCI/CABG):** Penentuan waktu tergantung risiko:\n   - **Invasif Segera (<2 jam):** Instabilitas hemodinamik, syok kardiogenik, nyeri dada refrakter, aritmia mengancam jiwa.\n   - **Invasif Dini (<24 jam):** Skor GRACE >140, perubahan ST/T dinamis, kenaikan troponin serial.\n   - **Invasif Selektif (<72 jam):** GRACE <140, diabetes, insufisiensi ginjal, riwayat CABG/PCI sebelumnya.'
      },
      caution: {
        en: '• Do not load P2Y12 inhibitors if urgent CABG is highly anticipated.\n• Carefully assess bleeding risk using the **CRUSADE** or **Academic Research Consortium for High Bleeding Risk (ARC-HBR)** criteria before initiating intensive antithrombotic therapy.',
        id: '• Jangan memberikan loading penghambat P2Y12 jika CABG cito/mendesak sangat diantisipasi.\n• Nilai risiko perdarahan secara hati-hati menggunakan kriteria **CRUSADE** atau **ARC-HBR** sebelum memulai terapi antitrombotik intensif.'
      },
      referral: {
        en: 'Refer to a hospital with an interventional cardiology service. High-risk patients should be transferred urgently within 24 hours.',
        id: 'Rujuk ke rumah sakit dengan fasilitas kateterisasi jantung. Pasien dengan risiko tinggi harus dirujuk secara mendesak dalam waktu 24 jam.'
      }
    },
    pearls: {
      en: 'NSTEMI can be highly dynamic. A normal baseline ECG does not rule out acute coronary syndrome. Dynamic T-wave inversion during active chest pain is highly specific for myocardial ischemia. Check troponins serial-wise.',
      id: 'NSTEMI dapat sangat dinamis. EKG awal yang normal tidak menyingkirkan sindrom koroner akut. Inversi gelombang T dinamis saat nyeri dada berlangsung sangat spesifik untuk iskemia miokard. Periksa troponin secara serial.'
    },
    references: {
      en: '1. **2023 ESC Guidelines** for the management of acute coronary syndromes.\n2. **2014 AHA/ACC Guideline** for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes.',
      id: '1. **Pedoman ESC 2023** untuk pengelolaan sindrom koroner akut.\n2. **Pedoman AHA/ACC 2014** untuk Pengelolaan Pasien dengan Sindrom Koroner Akut tanpa Elevasi ST.'
    }
  },
  {
    id: 'de_winter',
    title: {
      en: 'de Winter T Waves (ST-Equivalent)',
      id: 'Gelombang T de Winter (Ekuivalen ST)'
    },
    category: 'st-equivalent',
    overview: {
      en: 'de Winter T waves represent an under-recognized ST-elevation equivalent morphology, signifying acute, complete proximal Left Anterior Descending (LAD) coronary artery occlusion. It is found in ~2% of acute LAD occlusions and requires emergent reperfusion.',
      id: 'Gelombang T de Winter mewakili morfologi ekuivalen elevasi segmen ST yang kurang dikenali, menandakan oklusi total akut proksimal arteri koroner Left Anterior Descending (LAD). Ditemukan pada ~2% oklusi LAD akut dan memerlukan reperfusi darurat.'
    },
    ecgPattern: {
      waveformType: 'de_winter',
      leads: {
        en: 'Precordial leads V1-V6; reciprocal ST elevation in lead aVR.',
        id: 'Sadapan prekordial V1-V6; elevasi ST resiprokal di sadapan aVR.'
      },
      keyFindings: {
        en: [
          'Tall, prominent, symmetric T waves in precordial leads (V1-V6).',
          'Upsloping ST-segment depression >1 mm at the J-point in leads V1-V6.',
          'Reciprocal ST-segment elevation (0.5 mm to 2 mm) in lead aVR.',
          'Loss of normal precordial R wave progression.'
        ],
        id: [
          'Gelombang T yang tinggi, menonjol, dan simetris di sadapan prekordial (V1-V6).',
          'Depresi segmen ST tipe upsloping >1 mm pada titik J di sadapan V1-V6.',
          'Elevasi segmen ST resiprokal (0.5 mm hingga 2 mm) di sadapan aVR.',
          'Hilangnya progresi gelombang R prekordial yang normal.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Triad:** Upsloping ST depression in precordial leads, tall symmetric T waves, and ST elevation in aVR, in a patient with ongoing ischemic chest pain. This pattern persists without progressing to typical ST elevation.',
      id: '**Triad EKG:** Depresi ST tipe upsloping di sadapan prekordial, gelombang T tinggi simetris, dan elevasi ST di aVR, pada pasien dengan nyeri dada iskemik yang sedang berlangsung. Pola ini menetap tanpa berkembang menjadi elevasi ST yang khas.'
    },
    supportingDiagnostics: {
      en: '1. **Emergent Coronary Angiography:** Primary diagnostic tool to confirm LAD occlusion.\n2. **Serial Troponins:** Will show rapid and significant elevation.\n3. **Echocardiography:** Demonstrates anterior wall and/or apical hypokinesis/akinesis.',
      id: '1. **Angiografi Koroner Segera:** Alat diagnostik utama untuk mengonfirmasi oklusi LAD.\n2. **Troponin Serial:** Akan menunjukkan peningkatan yang cepat dan signifikan.\n3. **Ekokardiografi:** Menunjukkan hipokinesia/akinesia dinding anterior dan/atau apikal.'
    },
    differentialDiagnosis: {
      en: '1. **Hyperkalemia:** Tall, peaked T waves, but typically narrow-based, with associated PR prolongation, QRS widening, and lacking precordial ST depression/aVR elevation.\n2. **Benign Early Repolarization:** Precordial T waves are tall, but with concave ST elevation rather than upsloping ST depression.\n3. **Hyperacute STEMI:** Tall, broad T waves, but usually with J-point elevation, not depression.',
      id: '1. **Hiperkalemia:** Gelombang T tinggi memuncak (peaked), tetapi biasanya dengan basis sempit, disertai pemanjangan PR, pelebaran QRS, dan tidak ada depresi ST prekordial/elevasi aVR.\n2. **Repolarisasi Dini Jinak:** Gelombang T prekordial tinggi, tetapi dengan elevasi ST konkaf, bukan depresi ST upsloping.\n3. **STEMI Hiperakut:** Gelombang T tinggi dan lebar, tetapi biasanya dengan elevasi titik J, bukan depresi.'
    },
    treatment: {
      initial: {
        en: '1. Treat identically to STEMI.\n2. Chew Aspirin 160-320 mg + load Clopidogrel 600 mg or Ticagrelor 180 mg immediately.\n3. IV Heparin bolus (70-100 U/kg) or Enoxaparin.\n4. Avoid sublingual nitrates if hemodynamically unstable, though they can be used with caution for pain.',
        id: '1. Tangani secara identik dengan STEMI.\n2. Kunyah Aspirin 160-320 mg + loading Klopidogrel 600 mg atau Tikagrelor 180 mg segera.\n3. Bolus Heparin IV (70-100 U/kg) atau Enoksaparin.\n4. Hindari nitrat sublingual jika hemodinamik tidak stabil, meskipun dapat digunakan dengan hati-hati untuk nyeri dada.'
      },
      definitive: {
        en: '**Emergent Coronary Intervention (PCI):** The patient must go immediately to the catheterization lab for coronary stenting. Fibrinolysis should be initiated if transfer to a PCI center takes >120 minutes, as this is a functional STEMI.',
        id: '**Intervensi Koroner Segera (PCI):** Pasien harus segera dibawa ke lab kateterisasi untuk pemasangan stent koroner. Fibrinolisis harus dimulai jika waktu rujukan ke pusat PCI >120 menit, karena ini secara fungsional adalah STEMI.'
      },
      caution: {
        en: 'Do not mistake this for simple ischemia or NSTEMI and delay coronary intervention. This is a STEMI equivalent that represents a hyperacute occlusion.',
        id: 'Jangan salah mengira pola ini sebagai iskemia biasa atau NSTEMI biasa lalu menunda intervensi koroner. Ini adalah ekuivalen STEMI yang mewakili oklusi hiperakut.'
      },
      referral: {
        en: 'Immediate activating of the STEMI protocol and transfer to a PCI-capable center.',
        id: 'Aktivasi segera protokol STEMI dan rujukan cepat ke pusat dengan fasilitas PCI.'
      }
    },
    pearls: {
      en: 'de Winter T waves are easy to misdiagnose as "NSTEMI" or "benign peaked T waves." Recognizing this pattern is critical because these patients have an active, complete proximal LAD occlusion and will suffer massive anterior infarction if reperfusion is delayed.',
      id: 'Gelombang T de Winter mudah salah didiagnosis sebagai "NSTEMI" atau "gelombang T peaked jinak". Mengenali pola ini sangat penting karena pasien ini mengalami oklusi total LAD proksimal aktif dan akan mengalami infark anterior masif jika reperfusi ditunda.'
    },
    references: {
      en: '1. de Winter RJ, et al. A new ECG sign of proximal LAD occlusion. N Engl J Med 2008; 359:2071-2073.',
      id: '1. de Winter RJ, dkk. Tanda EKG baru dari oklusi LAD proksimal. N Engl J Med 2008; 359:2071-2073.'
    }
  },
  {
    id: 'wellens',
    title: {
      en: 'Wellens Syndrome (ST-Equivalent)',
      id: 'Sindrom Wellens (Ekuivalen ST)'
    },
    category: 'st-equivalent',
    overview: {
      en: 'Wellens Syndrome is a pre-infarction state characterized by specific T-wave abnormalities in V2-V3 during a pain-free period, representing critical proximal Left Anterior Descending (LAD) coronary artery stenosis. It heralds an impending massive anterior wall myocardial infarction.',
      id: 'Sindrom Wellens adalah kondisi pre-infark yang ditandai oleh kelainan gelombang T spesifik di V2-V3 selama periode bebas nyeri, mewakili stenosis kritis proksimal arteri koroner Left Anterior Descending (LAD). Ini menandakan ancaman infark miokard dinding anterior masif.'
    },
    ecgPattern: {
      waveformType: 'wellens',
      leads: {
        en: 'Precordial leads V2-V3 (may extend to V1-V4).',
        id: 'Sadapan prekordial V2-V3 (dapat meluas ke V1-V4).'
      },
      keyFindings: {
        en: [
          'Type A Wellens (~25% of cases): Biphasic T waves in V2-V3 (initial positive deflection followed by terminal negative deflection).',
          'Type B Wellens (~75% of cases): Deeply and symmetrically inverted T waves in V2-V3.',
          'Minimal or no ST-segment elevation (<1 mm).',
          'No pathological Q waves in precordial leads.',
          'ECG abnormalities are observed **when the patient is pain-free**.'
        ],
        id: [
          'Wellens Tipe A (~25% kasus): Gelombang T bifasik di V2-V3 (defleksi positif awal diikuti oleh defleksi negatif akhir).',
          'Wellens Tipe B (~75% kasus): Inversi gelombang T yang dalam dan simetris di V2-V3.',
          'Elevasi segmen ST minimal atau tidak ada (<1 mm).',
          'Tidak ada gelombang Q patologis di sadapan prekordial.',
          'Kelainan EKG diamati **saat pasien sedang bebas nyeri dada**.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '1. Prior history of anginal pain.\n2. Deeply inverted (Type B) or biphasic (Type A) T waves in V2-V3 (pain-free state).\n3. Normal precordial R-wave progression.\n4. No pathological Q waves.\n5. Insignificant ST elevation (<1 mm).\n6. Normal or minimally elevated cardiac enzymes.',
      id: '1. Riwayat nyeri dada angina sebelumnya.\n2. Inversi gelombang T yang dalam (Tipe B) atau bifasik (Tipe A) di V2-V3 (kondisi bebas nyeri).\n3. Progresi gelombang R prekordial yang normal.\n4. Tidak ada gelombang Q patologis.\n5. Elevasi ST tidak signifikan (<1 mm).\n6. Enzim jantung normal atau hanya meningkat minimal.'
    },
    supportingDiagnostics: {
      en: '1. **Coronary Angiography:** Gold standard, showing severe proximal LAD stenosis (often >90%).\n2. **Echocardiography:** May show transient anterior/septal hypokinesia during pain.\n3. **Note:** Stress testing is strictly CONTRAINDICATED as it can precipitate complete LAD occlusion and sudden death.',
      id: '1. **Angiografi Koroner:** Standar emas, menunjukkan stenosis hebat LAD proksimal (sering kali >90%).\n2. **Ekokardiografi:** Dapat menunjukkan hipokinesia anterior/septal transien saat nyeri dada.\n3. **Catatan:** Uji latih beban jantung (Stress testing) dikontraindikasikan secara mutlak karena dapat memicu oklusi total LAD dan kematian mendadak.'
    },
    differentialDiagnosis: {
      en: '1. **Central Nervous System (CNS) Disease:** Deeply inverted T waves ("cerebral T waves"), but usually wide, diffuse across most leads, and associated with QTc prolongation.\n2. **Pulmonary Embolism:** T-wave inversion in V1-V3, but usually accompanied by sinus tachycardia, right axis deviation, or S1Q3T3.\n3. **Right Bundle Branch Block:** T wave inversion in V1-V3, but with widened QRS (>120 ms) and rSR\' morphology.',
      id: '1. **Penyakit Sistem Saraf Pusat (SSP):** Inversi gelombang T yang sangat dalam ("cerebral T waves"), tetapi biasanya lebar, difus di sebagian besar sadapan, dan disertai perpanjangan QTc.\n2. **Emboli Paru:** Inversi gelombang T di V1-V3, tetapi biasanya disertai takikardia sinus, deviasi aksis kanan, atau S1Q3T3.\n3. **Right Bundle Branch Block:** Inversi gelombang T di V1-V3, tetapi dengan QRS melebar (>120 ms) dan morfologi rSR\'.'
    },
    treatment: {
      initial: {
        en: '1. Management is similar to high-risk NSTEMI.\n2. Aspirin 160-320 mg chewed + P2Y12 inhibitor load.\n3. Subcutaneous Anticoagulation (Fondaparinux or Enoxaparin).\n4. Nitrates can be used if chest pain recurs.',
        id: '1. Penanganan mirip dengan NSTEMI risiko tinggi.\n2. Aspirin 160-320 mg dikunyah + loading penghambat P2Y12.\n3. Antikoagulan subkutan (Fondaparinuks atau Enoksaparin).\n4. Nitrat dapat digunakan jika nyeri dada berulang.'
      },
      definitive: {
        en: '**Early Coronary Angiography and Revascularization:** Urgently perform PCI (stenting) or CABG. This is the definitive treatment to prevent massive anterior wall MI.',
        id: '**Angiografi Koroner dan Revaskularisasi Dini:** Lakukan PCI (stenting) atau CABG secara mendesak. Ini adalah terapi definitif untuk mencegah infark miokard dinding anterior masif.'
      },
      caution: {
        en: '• **NO STRESS TESTING:** Absolutely avoid treadmill or chemical stress tests. The critical LAD stenosis will occlude completely, causing acute anterior STEMI, VF, or death.\n• Avoid excessive beta-blockade if hemodynamically unstable.',
        id: '• **JANGAN MELAKUKAN UJI LATIH BEBAN (STRESS TEST):** Sangat hindari treadmill atau chemical stress test. Stenosis LAD yang kritis akan menyumbat total, menyebabkan STEMI anterior akut, fibrilasi ventrikel, atau kematian.\n• Hindari beta-blocker dosis tinggi jika hemodinamik tidak stabil.'
      },
      referral: {
        en: 'Urgent referral for coronary angiography within 24 hours. Do not discharge these patients from the ED.',
        id: 'Rujukan mendesak untuk angiografi koroner dalam waktu 24 jam. Jangan memulangkan pasien ini dari UGD.'
      }
    },
    pearls: {
      en: 'The classic Wellens ECG is recorded **when the chest pain has resolved**. During active chest pain, the T waves may pseudonormalize (look upright and normal) or develop ST elevation. Therefore, serial ECGs in pain-free and painful states are essential.',
      id: 'EKG Wellens klasik terekam **saat nyeri dada telah mereda**. Saat nyeri dada aktif kembali, gelombang T dapat mengalami pseudonormalisasi (tampak tegak dan normal) atau berkembang menjadi elevasi ST. Oleh karena itu, EKG serial saat bebas nyeri dan saat nyeri sangat penting.'
    },
    references: {
      en: '1. de Zwaan C, et al. Characteristic electrocardiographic pattern indicating a critical stenosis of the LAD. Am Heart J 1982; 103:730-736.',
      id: '1. de Zwaan C, dkk. Pola elektrokardiografi khas yang menunjukkan stenosis kritis pada LAD. Am Heart J 1982; 103:730-736.'
    }
  },
  {
    id: 'posterior_mi',
    title: {
      en: 'Posterior Myocardial Infarction (ST-Equivalent)',
      id: 'Infark Miokard Posterior (Ekuivalen ST)'
    },
    category: 'st-equivalent',
    overview: {
      en: 'Posterior MI involves the posterior wall of the left ventricle, typically caused by occlusion of the Left Circumflex (LCx) or Right Coronary Artery (RCA). Standard 12-lead ECG does not directly view the posterior wall, making this condition frequently missed. It represents a STEMI equivalent.',
      id: 'MI Posterior melibatkan dinding posterior ventrikel kiri, biasanya disebabkan oleh oklusi arteri sirkumfleksa kiri (LCx) atau arteri koroner kanan (RCA). EKG 12-sadapan standar tidak secara langsung melihat dinding posterior, membuat kondisi ini sering terlewatkan. Ini merupakan ekuivalen STEMI.'
    },
    ecgPattern: {
      waveformType: 'posterior_mi',
      leads: {
        en: 'Anteroseptal leads V1-V3 (as reciprocal changes). Direct elevation in posterior leads V7-V9.',
        id: 'Sadapan anteroseptal V1-V3 (sebagai perubahan resiprokal). Elevasi langsung di sadapan posterior V7-V9.'
      },
      keyFindings: {
        en: [
          'Horizontal ST-segment depression in V1-V3.',
          'Tall, broad R waves in V1-V3 (R/S ratio >1 in V2).',
          'Upright, prominent T waves in V1-V3.',
          'ST elevation ≥0.5 mm in posterior leads V7-V9 (placed at posterior axillary line, scapular line, and paraspinal line at the 5th intercostal space).'
        ],
        id: [
          'Depresi segmen ST horizontal di V1-V3.',
          'Gelombang R yang tinggi dan lebar di V1-V3 (rasio R/S >1 di V2).',
          'Gelombang T tegak dan menonjol di V1-V3.',
          'Elevasi ST ≥0.5 mm di sadapan posterior V7-V9 (ditempatkan pada garis aksila posterior, garis skapula, dan garis paraspinal pada sela iga ke-5).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Standard 12-lead:** ST depression in V1-V3 with tall R waves and upright T waves. \n\n**Posterior Lead ECG (V7-V9):** Mandatory to confirm diagnosis. ST-segment elevation ≥0.5 mm in at least one lead (V7-V9) is diagnostic for acute posterior STEMI.',
      id: '**EKG 12-Sadapan Standar:** Depresi ST di V1-V3 dengan gelombang R tinggi dan gelombang T tegak. \n\n**EKG Sadapan Posterior (V7-V9):** Wajib dilakukan untuk konfirmasi diagnosis. Elevasi segmen ST ≥0.5 mm di minimal satu sadapan (V7-V9) adalah diagnostik untuk posterior STEMI akut.'
    },
    supportingDiagnostics: {
      en: '1. **15-lead ECG:** Incorporating V7, V8, and V9.\n2. **Emergent Coronary Angiography:** Visualizes LCx or RCA occlusion.\n3. **Echocardiography:** Shows posterior wall regional wall motion abnormalities.',
      id: '1. **EKG 15-Sadapan:** Memasukkan sadapan V7, V8, dan V9.\n2. **Angiografi Koroner Segera:** Memvisualisasikan oklusi LCx atau RCA.\n3. **Ekokardiografi:** Menunjukkan kelainan gerakan dinding regional pada dinding posterior.'
    },
    differentialDiagnosis: {
      en: '1. **Anterior Ischemia:** Causes ST depression in V1-V3, but typically has downslope/inversion of T waves, and R waves are small/diminished (not tall).\n2. **Right Ventricular Hypertrophy (RVH):** Tall R waves in V1 with right axis deviation, but ST depression is downsloping with T wave inversion (strain pattern), and history is chronic.',
      id: '1. **Iskemia Anterior:** Menyebabkan depresi ST di V1-V3, tetapi biasanya memiliki gelombang T downsloping/inversi, dan gelombang R kecil/menurun (bukan tinggi).\n2. **Hipertrofi Ventrikel Kanan (RVH):** Gelombang R tinggi di V1 dengan deviasi aksis kanan, tetapi depresi ST tipe downsloping disertai inversi gelombang T (pola regangan), dan riwayat bersifat kronis.'
    },
    treatment: {
      initial: {
        en: '1. Manage as STEMI.\n2. Chew Aspirin 160-320 mg + load Clopidogrel 600 mg or Ticagrelor 180 mg immediately.\n3. IV UFH or Enoxaparin bolus.\n4. Nitrates can be used with caution (avoid if concurrent inferior/RV MI is present).',
        id: '1. Tangani sebagai STEMI.\n2. Kunyah Aspirin 160-320 mg + loading Klopidogrel 600 mg atau Tikagrelor 180 mg segera.\n3. Bolus IV UFH atau Enoksaparin.\n4. Nitrat dapat digunakan dengan hati-hati (hindari jika ada infark inferior/RV bersamaan).'
      },
      definitive: {
        en: '**Emergent Reperfusion (Primary PCI):** Transfer immediately to the cath lab. If primary PCI is unavailable within 120 minutes, administer fibrinolytic therapy.',
        id: '**Reperfusi Segera (PCI Primer):** Segera rujuk ke lab kateterisasi. Jika PCI primer tidak tersedia dalam 120 menit, berikan terapi fibrinolitik.'
      },
      caution: {
        en: '• Do not mistake posterior MI for simple anterior ischemia. If you see ST depression in V1-V3, you MUST perform a posterior lead ECG.\n• ~50% of posterior MIs occur alongside inferior STEMI; look closely for ST elevation in II, III, aVF.',
        id: '• Jangan salah mengira MI posterior sebagai iskemia anterior biasa. Jika Anda melihat depresi ST di V1-V3, Anda WAJIB merekam EKG sadapan posterior.\n• ~50% kasus MI posterior terjadi bersamaan dengan STEMI inferior; perhatikan baik-baik elevasi ST di II, III, aVF.'
      },
      referral: {
        en: 'Immediate transfer to a PCI center as a STEMI alert.',
        id: 'Rujukan segera ke pusat PCI sebagai alarm STEMI.'
      }
    },
    pearls: {
      en: 'If you "flip the ECG upside down and look through the back of the paper," the reciprocal ST depression and tall R waves in V1-V3 look exactly like standard ST elevation and Q waves of an anterior STEMI. This is a classic bedside diagnostic trick!',
      id: 'Jika Anda "membalik kertas EKG secara terbalik dan melihatnya dari belakang kertas terhadap cahaya," depresi ST resiprokal dan gelombang R tinggi di V1-V3 tampak persis seperti elevasi ST standar dan gelombang Q dari STEMI anterior. Ini adalah trik diagnosis klasik di bedside!'
    },
    references: {
      en: '1. 2023 ESC Guidelines for the management of acute coronary syndromes.',
      id: '1. Pedoman ESC 2023 untuk pengelolaan sindrom koroner akut.'
    }
  },
  {
    id: 'brugada',
    title: {
      en: 'Brugada Syndrome (Red Flag)',
      id: 'Sindrom Brugada (Tanda Bahaya)'
    },
    category: 'red-flags',
    overview: {
      en: 'Brugada Syndrome is an autosomal dominant genetic channelopathy characterized by abnormal ECG findings in V1-V2 and an increased risk of sudden cardiac death due to polymorphic ventricular tachycardia or ventricular fibrillation, typically in young, otherwise healthy individuals.',
      id: 'Sindrom Brugada adalah kanalopati genetik autosomal dominan yang ditandai oleh temuan EKG abnormal di V1-V2 dan peningkatan risiko kematian jantung mendadak akibat takikardia ventrikel polimorfik atau fibrilasi ventrikel, biasanya pada individu muda yang sehat.'
    },
    ecgPattern: {
      waveformType: 'brugada',
      leads: {
        en: 'Right precordial leads V1-V2.',
        id: 'Sadapan prekordial kanan V1-V2.'
      },
      keyFindings: {
        en: [
          'Type 1 (Diagnostic): Coved ST elevation >2 mm in V1-V2 followed by a negative T wave.',
          'Type 2 (Suggestive): Saddle-back ST elevation >2 mm in V1-V2 with a positive or biphasic T wave.',
          'Type 3 (Suggestive): Coved or saddle-back ST elevation <1 mm in V1-V2.',
          'Note: The Brugada pattern can be transient and unmasked by fever, large meals, vagal tone, or sodium channel blockers.'
        ],
        id: [
          'Tipe 1 (Diagnostik): Elevasi ST berbentuk kubah (coved) >2 mm di V1-V2 diikuti oleh gelombang T negatif.',
          'Tipe 2 (Sugestif): Elevasi ST berbentuk pelana kuda (saddle-back) >2 mm di V1-V2 dengan gelombang T positif atau bifasik.',
          'Tipe 3 (Sugestif): Elevasi ST coved atau saddle-back <1 mm di V1-V2.',
          'Catatan: Pola Brugada dapat bersifat transien dan dipicu oleh demam, makan kenyang, tonus vagal, atau obat penyekat kanal natrium.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Type 1 ECG pattern** (coved ST elevation ≥2 mm in V1-V2) either spontaneously or unmasked by sodium channel blocker provocation (e.g., Ajmaline, Flecainide), AND at least one of:\n- Documented VF or polymorphic VT.\n- Family history of sudden cardiac death at <45 years.\n- Coved-type ECG in family members.\n- Inducibility of VT/VF during electrophysiology study.\n- Syncope or nocturnal agonal respiration.',
      id: '**Pola EKG Tipe 1** (elevasi ST coved ≥2 mm di V1-V2) baik secara spontan atau dipicu oleh obat penyekat kanal natrium (misal, Ajmaline, Flecainide), DAN setidaknya salah satu dari:\n- VF atau VT polimorfik terdokumentasi.\n- Riwayat keluarga dengan kematian mendadak pada usia <45 tahun.\n- Pola EKG tipe coved pada anggota keluarga.\n- VT/VF dapat diinduksi saat studi elektrofisiologi.\n- Sinkop atau pernapasan agonal nokturnal.'
    },
    supportingDiagnostics: {
      en: '1. **Genetic Testing:** SCN5A gene mutations (found in ~20-30% of cases).\n2. **Drug Challenge Test:** Using sodium channel blockers to unmask the pattern (under continuous resuscitation monitoring).\n3. **Electrophysiology Study (EPS):** To evaluate VT/VF inducibility for risk stratification.',
      id: '1. **Tes Genetik:** Mutasi gen SCN5A (ditempan pada ~20-30% kasus).\n2. **Uji Provokasi Obat:** Menggunakan penyekat kanal natrium untuk memunculkan pola Brugada (di bawah pemantauan resusitasi ketat).\n3. **Studi Elektrofisiologi (EPS):** Untuk mengevaluasi keterinduksian VT/VF guna stratifikasi risiko.'
    },
    differentialDiagnosis: {
      en: '1. **Right Bundle Branch Block (RBBB):** Shows rSR\' with a slurred S wave in lateral leads, whereas Brugada has J-point coving without lateral slurred S wave.\n2. **Acute Pericarditis:** Shows diffuse concave ST elevation, but not localized to V1-V2 and lacks the coved morphology.\n3. **Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC):** Shows epsilon waves (notched QRS) in V1-V3, T wave inversion, and RV dilation.',
      id: '1. **Right Bundle Branch Block (RBBB):** Menunjukkan rSR\' dengan gelombang S lebar di sadapan lateral, sedangkan Brugada memiliki coving titik J tanpa gelombang S lateral yang lebar.\n2. **Perikarditis Akut:** Menunjukkan elevasi ST konkaf difus, tetapi tidak terlokalisasi di V1-V2 dan tidak memiliki morfologi coved.\n3. **Kardiomiopati Ventrikel Kanan Aritmogenik (ARVC):** Menunjukkan gelombang epsilon (takik QRS) di V1-V3, inversi gelombang T, dan dilatasi RV.'
    },
    treatment: {
      initial: {
        en: '1. **Aggressive Fever Control:** Administer Antipyretics (Paracetamol) immediately for any fever, as high body temperature triggers lethal arrhythmias.\n2. **Avoid Trigger Medications:** Discontinue any Brugada-triggering drugs (antiarrhythmics, tricyclic antidepressants, anesthetics, cocaine - see drug reference at BrugadaRx.com).\n3. **Emergency Resuscitation:** Prepare for immediate defibrillation if polymorphic VT/VF occurs.',
        id: '1. **Kontrol Demam Agresif:** Berikan Antipiretik (Parasetamol) segera untuk demam apa pun, karena suhu tubuh tinggi memicu aritmia letal.\n2. **Hindari Obat Pemicu:** Hentikan obat yang memicu Brugada (antiaritmia golongan tertentu, antidepresan trisiklik, anestesi tertentu, kokain - lihat referensi obat di BrugadaRx.com).\n3. **Resusitasi Darurat:** Bersiap untuk defibrilasi segera jika VT/VF polimorfik terjadi.'
      },
      definitive: {
        en: '1. **Implantable Cardioverter-Defibrillator (ICD):** The only proven effective therapy for preventing sudden cardiac death in symptomatic patients (survivors of arrest or those with syncope).\n2. **Medical Therapy:** Quinidine (class Ia antiarrhythmic) can be used to suppress VT/VF storms or in patients where ICD is contraindicated.\n3. **Catheter Ablation:** Epicardial catheter ablation of the RV outflow tract (RVOT) in refractory patients.',
        id: '1. **Implantable Cardioverter-Defibrillator (ICD):** Satu-satunya terapi yang terbukti efektif untuk mencegah kematian mendadak pada pasien bergejala (penyintas henti jantung atau dengan riwayat sinkop).\n2. **Terapi Medis:** Kuinidin (antiaritmia kelas Ia) dapat digunakan untuk menekan badai VT/VF atau pada pasien dengan kontraindikasi ICD.\n3. **Ablasi Kateter:** Ablasi kateter epikardial pada right ventricular outflow tract (RVOT) pada pasien refrakter.'
      },
      caution: {
        en: '• **Do not use Class Ic antiarrhythmics (Flecainide, Propafenone)** as they will severely worsen the condition.\n• Avoid local anesthetics (e.g., Bupivacaine) in large doses.',
        id: '• **Jangan gunakan antiaritmia Kelas Ic (Flecainide, Propafenone)** karena akan memperburuk kondisi secara drastis.\n• Hindari anestesi lokal (misal, Bupivakain) dalam dosis besar.'
      },
      referral: {
        en: 'Refer all patients with suspected Brugada ECG pattern to a Cardiac Electrophysiologist for risk stratification.',
        id: 'Rujuk semua pasien dengan kecurigaan pola EKG Brugada ke spesialis Elektrofisiologi Jantung untuk stratifikasi risiko.'
      }
    },
    pearls: {
      en: 'Fever is the most common trigger for Brugada VT/VF storms. A patient presenting with fever and a "coved" ST elevation in V1-V2 should be treated with immediate cooling and IV antipyretics while monitoring in an ICU environment.',
      id: 'Demam adalah pemicu paling umum untuk badai VT/VF Brugada. Pasien yang datang dengan demam dan elevasi ST "coved" di V1-V2 harus dirawat dengan pendinginan segera dan antipiretik IV saat dipantau di lingkungan ICU.'
    },
    references: {
      en: '1. Brugada P, Brugada J. Right bundle branch block, persistent ST segment elevation and sudden cardiac death. J Am Coll Cardiol 1992; 20:1391-1396.\n2. BrugadaRx.com (Official drug safety list).',
      id: '1. Brugada P, Brugada J. Blok cabang berkas kanan, elevasi segmen ST persisten, dan kematian jantung mendadak. J Am Coll Cardiol 1992; 20:1391-1396.\n2. BrugadaRx.com (Daftar keamanan obat resmi).'
    }
  },
  {
    id: 'hyperkalemia',
    title: {
      en: 'Hyperkalemia (Red Flag)',
      id: 'Hiperkalemia (Tanda Bahaya)'
    },
    category: 'red-flags',
    overview: {
      en: 'Hyperkalemia (serum potassium >5.5 mEq/L) is a medical emergency that disrupts myocardial electrical conduction. It causes progressive ECG changes, culminating in ventricular fibrillation, asystole, or a "sine wave" rhythm.',
      id: 'Hiperkalemia (kalium serum >5.5 mEq/L) adalah kegawatdaruratan medis yang mengganggu konduksi listrik miokardium. Ini menyebabkan perubahan EKG progresif, yang berpuncak pada fibrilasi ventrikel, asistol, atau ritme "sine wave" (gelombang sinus).'
    },
    ecgPattern: {
      waveformType: 'hyperkalemia',
      leads: {
        en: 'Diffuse/Widespread across all leads.',
        id: 'Difus/Tersebar luas di semua sadapan.'
      },
      keyFindings: {
        en: [
          'K+ ~5.5 - 6.5 mEq/L: Tall, narrow-based, peaked T waves ("tent-shaped") especially in precordial leads.',
          'K+ ~6.5 - 7.0 mEq/L: Prolonged PR interval, flattened or lost P waves, and mild QRS widening.',
          'K+ ~7.0 - 8.0 mEq/L: Markedly widened QRS, bundle branch blocks, or fascicular blocks.',
          'K+ >8.0 mEq/L: "Sine Wave" pattern (fusion of widened QRS and T wave) leading to VF/asystole.'
        ],
        id: [
          'K+ ~5.5 - 6.5 mEq/L: Gelombang T tinggi, berbasis sempit, dan memuncak (seperti tenda) terutama di sadapan prekordial.',
          'K+ ~6.5 - 7.0 mEq/L: Interval PR memanjang, gelombang P mendatar atau hilang, dan pelebaran QRS ringan.',
          'K+ ~7.0 - 8.0 mEq/L: QRS sangat melebar, bundle branch block, atau fascicular block.',
          'K+ >8.0 mEq/L: Pola "Sine Wave" (fusi QRS lebar dan gelombang T) yang memicu VF/asystole.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Clinical Presentation:** Muscle weakness, paralysis, paresthesias, bradycardia, or cardiac arrest.\n\n**ECG Findings:** Sequential changes starting with tall peaked T waves, followed by P wave flattening, QRS widening, and finally sine wave pattern.\n\n**Laboratory Confirmation:** Serum potassium level >5.5 mEq/L (rule out pseudohyperkalemia from hemolyzed blood sample).',
      id: '**Presentasi Klinis:** Kelemahan otot, kelumpuhan, parestesia, bradikardia, atau henti jantung.\n\n**Temuan EKG:** Perubahan sekuensial dimulai dengan gelombang T tinggi memuncak, diikuti oleh pendataran gelombang P, pelebaran QRS, dan akhirnya pola gelombang sinus.\n\n**Konfirmasi Laboratorium:** Kadar kalium serum >5.5 mEq/L (singkirkan pseudohiperkalemia akibat sampel darah yang hemolisis).'
    },
    supportingDiagnostics: {
      en: '1. **Serum Electrolytes:** Immediate point-of-care or laboratory potassium, sodium, calcium, magnesium.\n2. **Renal Function Tests:** Blood urea nitrogen (BUN) and Creatinine (acute or chronic kidney injury is the main cause).\n3. **Arterial Blood Gas (ABG):** To evaluate for metabolic acidosis, which shifts potassium extracellularly.',
      id: '1. **Elektrolit Serum:** Pemeriksaan kalium, natrium, kalsium, magnesium segera di bedside atau laboratorium.\n2. **Fungsi Ginjal:** Ureum dan Kreatinin darah (gangguan ginjal akut atau kronis adalah penyebab utama).\n3. **Analisis Gas Darah (AGD):** Untuk mengevaluasi asidosis metabolik, yang menggeser kalium ke ekstraseluler.'
    },
    differentialDiagnosis: {
      en: '1. **Hyperacute STEMI:** Causes tall T waves, but they are broad-based and accompanied by J-point ST elevation.\n2. **Tricyclic Antidepressant (TCA) Toxicity:** Causes widened QRS, but typically with sinus tachycardia and a prominent R wave in lead aVR.\n3. **Severe Hypothermia:** Widens the QRS and can cause Osborn (J) waves, but is clinically distinguishable.',
      id: '1. **STEMI Hiperakut:** Menyebabkan gelombang T tinggi, tetapi berbasis lebar dan disertai elevasi ST titik J.\n2. **Toksisitas Antidepresan Trisiklik (TCA):** Menyebabkan QRS melebar, tetapi biasanya dengan takikardia sinus dan gelombang R menonjol di sadapan aVR.\n3. **Hipotermia Berat:** Memperlebar QRS dan dapat menyebabkan gelombang Osborn (J), tetapi dapat dibedakan secara klinis.'
    },
    treatment: {
      initial: {
        en: '1. **Myocardial Stabilization (First Line):** Calcium Gluconate 10% 10 mL IV over 5-10 minutes (or Calcium Chloride if central line). Onset is 1-3 mins; stabilizes cardiac membrane. Repeat if ECG abnormalities persist after 5 mins.\n2. **Shifting Potassium Into Cells:**\n   - **Insulin-Dextrose:** 10 Units of Regular Insulin IV plus 50 mL of Dextrose 50% (D50) IV over 15-30 minutes.\n   - **Beta-2 Agonist:** Nebulized Albuterol/Salbutamol 10-20 mg over 10-15 minutes.\n   - **Sodium Bicarbonate:** 50-100 mEq IV over 5 minutes (primarily if severe metabolic acidosis is present).\n3. **Potassium Elimination:**\n   - **Loop Diuretics:** Furosemide 40-80 mg IV if renal function is intact.\n   - **Cation Exchange Resins:** Sodium Zirconium Cyclosilicate (SZC) or Patiromer.',
        id: '1. **Stabilisasi Miokardium (Langkah Utama):** Kalsium Glukonat 10% 10 mL IV selama 5-10 menit (atau Kalsium Klorida jika ada jalur sentral). Efek mulai dalam 1-3 menit; menstabilkan membran jantung. Ulangi jika kelainan EKG menetap setelah 5 menit.\n2. **Menggeser Kalium ke Dalam Sel:**\n   - **Insulin-Dekstrosa:** 10 Unit Insulin Reguler IV ditambah 50 mL Dekstrosa 50% (D50) IV selama 15-30 menit.\n   - **Agonis Beta-2:** Nebulisasi Albuterol/Salbutamol 10-20 mg selama 10-15 menit.\n   - **Natrium Bikarbonat:** 50-100 mEq IV selama 5 menit (terutama jika ada asidosis metabolik berat).\n3. **Eliminasi Kalium:**\n   - **Diuretik Loop:** Furosemid 40-80 mg IV jika fungsi ginjal baik.\n   - **Resin Penukar Kation:** Sodium Zirconium Cyclosilicate (SZC) atau Patiromer.'
      },
      definitive: {
        en: '**Hemodialysis:** The definitive treatment for removing potassium from the body, especially in patients with end-stage renal disease (ESRD) or severe acute kidney injury who are unresponsive to medical shifting therapy.',
        id: '**Hemodialisis:** Terapi definitif untuk membuang kalium dari tubuh, terutama pada pasien dengan gagal ginjal stadium akhir (ESRD) atau gangguan ginjal akut berat yang tidak responsif terhadap terapi pemindahan medis.'
      },
      caution: {
        en: '• Calcium gluconate **does not lower serum potassium levels**; it only protects the heart. You must follow it with potassium-lowering therapies.\n• Avoid calcium administration in digoxin toxicity (suspected "stone heart" risk, though controversial).',
        id: '• Kalsium glukonat **tidak menurunkan kadar kalium serum**; ia hanya melindungi jantung. Anda harus melanjutkannya dengan terapi penurun kalium.\n• Hindari pemberian kalsium pada toksisitas digoksin (kecurigaan risiko "stone heart", meskipun kontroversial).'
      },
      referral: {
        en: 'Urgent nephrology referral and transfer to a unit capable of emergent hemodialysis if refractory to medical therapy or in severe acute kidney injury.',
        id: 'Rujukan nefrologi segera dan rujukan ke unit yang mampu melakukan hemodialisis darurat jika refrakter terhadap terapi medis atau pada gangguan ginjal akut berat.'
      }
    },
    pearls: {
      en: 'Never wait for laboratory confirmation of potassium if the ECG strongly suggests hyperkalemia in a patient with a history of renal failure. Administer IV Calcium immediately, as sudden VF is highly likely.',
      id: 'Jangan pernah menunggu konfirmasi laboratorium untuk kalium jika EKG sangat menunjukkan hiperkalemia pada pasien dengan riwayat gagal ginjal. Berikan Kalsium IV segera, karena VF mendadak sangat mungkin terjadi.'
    },
    references: {
      en: '1. Palmer BF, Clegg DJ. Diagnosis and treatment of hyperkalemia. Cleveland Clinic Journal of Medicine 2017; 84:934-942.',
      id: '1. Palmer BF, Clegg DJ. Diagnosis dan pengobatan hiperkalemia. Cleveland Clinic Journal of Medicine 2017; 84:934-942.'
    }
  },
  {
    id: 'pe',
    title: {
      en: 'Pulmonary Embolism (Red Flag)',
      id: 'Emboli Paru (Tanda Bahaya)'
    },
    category: 'red-flags',
    overview: {
      en: 'Pulmonary Embolism (PE) is an obstruction of the pulmonary arterial bed, most commonly by thrombi originating from deep vein thrombosis (DVT). While ECG is not highly sensitive, characteristic "right heart strain" findings can provide critical clues in unstable patients.',
      id: 'Emboli Paru adalah penyumbatan pada pembuluh darah pulmonal, paling sering disebabkan oleh trombus yang berasal dari Deep Vein Thrombosis (DVT). Meskipun EKG tidak sangat sensitif, temuan khas "regangan jantung kanan" dapat memberikan petunjuk penting pada pasien tidak stabil.'
    },
    ecgPattern: {
      waveformType: 'pe',
      leads: {
        en: 'Leads I, III, and V1-V4.',
        id: 'Sadapan I, III, dan V1-V4.'
      },
      keyFindings: {
        en: [
          'Sinus Tachycardia: The most common ECG finding in acute PE (~40% of cases).',
          'S1Q3T3 Pattern (Classic but only ~20% sensitive): Deep S wave in lead I, pathological Q wave in lead III, and T-wave inversion in lead III.',
          'Right Ventricular Strain Pattern: T-wave inversions in V1-V4 (often extending to inferior leads II, III, aVF).',
          'Right Axis Deviation (RAD) or New Right Bundle Branch Block (complete or incomplete).',
          'Clockwise rotation (persistent S wave in V6).'
        ],
        id: [
          'Takikardia Sinus: Temuan EKG paling umum pada emboli paru akut (~40% kasus).',
          'Pola S1Q3T3 (Klasik tetapi hanya ~20% sensitif): Gelombang S dalam di sadapan I, gelombang Q patologis di sadapan III, dan inversi gelombang T di sadapan III.',
          'Pola Regangan Ventrikel Kanan (Right Ventricular Strain): Inversi gelombang T di V1-V4 (sering kali meluas ke sadapan inferior II, III, aVF).',
          'Deviasi Aksis Kanan (RAD) atau Right Bundle Branch Block baru (lengkap atau tidak lengkap).',
          'Rotasi searah jarum jam (gelombang S persisten di V6).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Clinical Risk Stratification:** Use **Wells Criteria** or **Geneva Score** to determine clinical probability.\n\n**Diagnostic Pathways:**\n- **Low/Intermediate Risk:** Check **D-Dimer**; if negative, PE is ruled out.\n- **High Risk or Positive D-Dimer:** Perform **CT Pulmonary Angiography (CTPA)** (gold standard).\n- **Bedside Echo:** High diagnostic utility in unstable patients, showing right ventricular overload (McConnell\'s sign).',
      id: '**Stratifikasi Risiko Klinis:** Gunakan **Kriteria Wells** atau **Skor Geneva** untuk menentukan probabilitas klinis.\n\n**Alur Diagnostik:**\n- **Risiko Rendah/Sedang:** Periksa **D-Dimer**; jika negatif, emboli paru dapat disingkirkan.\n- **Risiko Tinggi atau D-Dimer Positif:** Lakukan **CT Pulmonary Angiography (CTPA)** (standar emas).\n- **Ekokardiografi Bedside:** Sangat berguna pada pasien tidak stabil, menunjukkan beban berlebih ventrikel kanan (McConnell\'s sign).'
    },
    supportingDiagnostics: {
      en: '1. **CT Pulmonary Angiography (CTPA):** Diagnostic standard.\n2. **Bedside Echocardiography:** Useful for evaluating RV dysfunction and ruling out other acute causes of shock.\n3. **D-Dimer:** High sensitivity, low specificity.\n4. **Arterial Blood Gas (ABG):** Typically shows hypoxemia, hypocapnia, and respiratory alkalosis.',
      id: '1. **CT Pulmonary Angiography (CTPA):** Standar diagnostik utama.\n2. **Ekokardiografi Bedside:** Berguna untuk mengevaluasi disfungsi RV dan menyingkirkan penyebab syok akut lainnya.\n3. **D-Dimer:** Sensitivitas tinggi, spesifisitas rendah.\n4. **Analisis Gas Darah (AGD):** Biasanya menunjukkan hipoksemia, hipokapnia, dan alkalosis respiratorik.'
    },
    differentialDiagnosis: {
      en: '1. **Acute Coronary Syndrome:** Can also cause chest pain, dyspnea, and T wave inversions, but lacks right ventricular strain features and CTPA findings.\n2. **Aortic Dissection:** Severe tearing chest pain, distinguished by mediastinal widening on CXR and CT chest.\n3. **Pneumothorax:** Sudden pleuritic chest pain and dyspnea, diagnosed via chest X-ray or ultrasound.',
      id: '1. **Sindrom Koroner Akut:** Dapat menyebabkan nyeri dada, sesak napas, dan inversi gelombang T, tetapi tidak memiliki fitur regangan ventrikel kanan dan temuan CTPA.\n2. **Diseksi Aorta:** Nyeri dada robek hebat, dibedakan dengan pelebaran mediastinum pada rontgen dada dan CT dada.\n3. **Pneumotoraks:** Nyeri dada pleuritrik mendadak dan sesak napas, didiagnosis melalui rontgen dada atau USG dada.'
    },
    treatment: {
      initial: {
        en: '1. **Hemodynamic Stabilization:** Avoid aggressive fluid boluses (limit to 500 mL as excessive fluids worsen RV failure). Support blood pressure with vasopressors (Norepinephrine) or inotropes (Dobutamine).\n2. **Anticoagulation:** Start immediately if clinical suspicion is high and no contraindications. **UFH IV infusion** (preferred in unstable patients due to short half-life and reversibility) or **Low Molecular Weight Heparin (LMWH)** e.g., Enoxaparin 1 mg/kg subcutaneously every 12 hours.',
        id: '1. **Stabilisasi Hemodinamik:** Hindari bolus cairan agresif (batasi hingga 500 mL karena cairan berlebih memperburuk gagal jantung kanan). Dukung tekanan darah dengan vasopresor (Norepinefrin) atau inotropik (Dobutamin).\n2. **Antikoagulan:** Mulai segera jika kecurigaan klinis tinggi dan tidak ada kontraindikasi. **Infus UFH IV** (lebih disukai pada pasien tidak stabil karena waktu paruh pendek dan dapat dinetralkan) atau **Low Molecular Weight Heparin (LMWH)** misal, Enoksaparin 1 mg/kg subkutan setiap 12 jam.'
      },
      definitive: {
        en: '1. **Systemic Thrombolysis:** Indicated in **high-risk PE (massive PE)** presenting with hemodynamic instability (shock, hypotension). Regimen: Alteplase 100 mg IV over 2 hours.\n2. **Surgical Embolectomy or Catheter-directed Treatment:** Indicated if systemic thrombolysis is contraindicated or has failed.',
        id: '1. **Trombolisis Sistemik:** Diindikasikan pada **emboli paru risiko tinggi (massive PE)** yang disertai dengan instabilitas hemodinamik (syok, hipotensi). Regimen: Alteplase 100 mg IV selama 2 jam.\n2. **Embolektomi Bedah atau Terapi Kateter (Catheter-directed):** Diindikasikan jika trombolisis sistemik dikontraindikasikan atau gagal.'
      },
      caution: {
        en: '• **Thrombolysis Contraindications:** Assess carefully as fibrinolytic therapy carries a 2% risk of intracranial hemorrhage.\n• Limit IV fluids to avoid worsening right ventricular dilation and lowering cardiac output.',
        id: '• **Kontraindikasi Trombolisis:** Nilai secara hati-hati karena terapi fibrinolitik membawa risiko perdarahan intrakranial sebesar 2%.\n• Batasi cairan IV untuk menghindari perburukan dilatasi ventrikel kanan dan penurunan curah jantung.'
      },
      referral: {
        en: 'In massive PE, activate the Pulmonary Embolism Response Team (PERT) if available, and transfer immediately to an ICU/cardiac care unit with interventional/cardiothoracic services.',
        id: 'Pada emboli paru masif, aktifkan Tim Respons Emboli Paru (PERT) jika tersedia, dan rujuk segera ke ICU/CVCU dengan fasilitas intervensi/kardiotoraks.'
      }
    },
    pearls: {
      en: 'The classic S1Q3T3 pattern is highly famous but **rarely seen**. Sinus tachycardia combined with T-wave inversion in V1-V4 is a far more common and clinically useful indicator of acute right ventricular strain from PE.',
      id: 'Pola S1Q3T3 yang klasik sangat terkenal tetapi **jarang terlihat**. Takikardia sinus yang dikombinasikan dengan inversi gelombang T di V1-V4 jauh lebih umum dan merupakan indikator klinis yang lebih berguna untuk regangan ventrikel kanan akut akibat PE.'
    },
    references: {
      en: '1. **2019 ESC Guidelines** for the diagnosis and management of acute pulmonary embolism.\n2. **2021 CHEST Guidelines** for Antithrombotic Therapy for VTE Disease.',
      id: '1. **Pedoman ESC 2019** untuk diagnosis dan pengelolaan emboli paru akut.\n2. **Pedoman CHEST 2021** untuk Terapi Antitrombotik pada Penyakit VTE.'
    }
  },
  {
    id: 'chb',
    title: {
      en: 'Complete Heart Block (Third-Degree AV Block) (Red Flag)',
      id: 'Blok Jantung Total (AV Block Derajat Tiga) (Tanda Bahaya)'
    },
    category: 'red-flags',
    overview: {
      en: 'Complete Heart Block (CHB) is characterized by complete failure of electrical conduction from the atria to the ventricles. The atria and ventricles beat independently of each other under the control of separate pacemakers. It can cause severe hypoperfusion, syncope, and cardiac arrest.',
      id: 'Blok Jantung Total ditandai oleh kegagalan total konduksi listrik dari atrium ke ventrikel. Atrium dan ventrikel berdenyut secara independen satu sama lain di bawah kendali alat pacu jantung yang terpisah. Kondisi ini dapat menyebabkan hipoperfusi berat, sinkop, dan henti jantung.'
    },
    ecgPattern: {
      waveformType: 'chb',
      leads: {
        en: 'Diffuse; evident across all leads.',
        id: 'Difus; terlihat jelas di semua sadapan.'
      },
      keyFindings: {
        en: [
          'AV Dissociation: P waves and QRS complexes occur independently with no relationship between them (variable PR intervals).',
          'Regular atrial rate (PP interval is constant, typically 60-100 bpm) and regular ventricular rate (RR interval is constant, typically 20-50 bpm).',
          'Atrial rate is faster than ventricular rate.',
          'Narrow QRS escape rhythm (junctional escape, 40-60 bpm) or wide QRS escape rhythm (ventricular escape, 20-40 bpm).'
        ],
        id: [
          'Disosiasi AV: Gelombang P dan kompleks QRS muncul secara independen tanpa hubungan di antara keduanya (interval PR bervariasi).',
          'Laju atrium reguler (interval PP konstan, biasanya 60-100 kali/menit) dan laju ventrikel reguler (interval RR konstan, biasanya 20-50 kali/menit).',
          'Laju atrium lebih cepat daripada laju ventrikel.',
          'Irama penyelamat (escape rhythm) QRS sempit (junctional escape, 40-60 bpm) atau QRS lebar (ventricular escape, 20-40 bpm).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Criteria:** Complete independence of P waves and QRS complexes, both occurring at regular but different rates, with a ventricular rate significantly slower than the atrial rate.\n\n**Clinical Presentation:** Dizziness, lightheadedness, fatigue, chest pain, dyspnea, syncope (Stokes-Adams attacks), severe hypotension, or bradycardia.',
      id: '**Kriteria EKG:** Independensi penuh gelombang P dan kompleks QRS, keduanya terjadi pada laju yang reguler tetapi berbeda, dengan laju ventrikel secara signifikan lebih lambat daripada laju atrium.\n\n**Presentasi Klinis:** Pusing, kliyengan, kelelahan, nyeri dada, sesak napas, sinkop (serangan Stokes-Adams), hipotensi berat, atau bradikardia.'
    },
    supportingDiagnostics: {
      en: '1. **Serum Electrolytes:** Rule out hyperkalemia or hypermagnesemia.\n2. **Serum Digoxin Level:** Rule out digoxin toxicity (a common cause of CHB).\n3. **Thyroid Function Tests:** Severe hypothyroidism can cause bradyarrhythmias.\n4. **Echocardiography:** To assess structural heart disease or wall motion abnormalities (e.g., from inferior MI).',
      id: '1. **Elektrolit Serum:** Singkirkan hiperkalemia atau hipermagnesemia.\n2. **Kadar Digoksin Serum:** Singkirkan toksisitas digoksin (penyebab umum dari blok jantung total).\n3. **Fungsi Tiroid:** Hipotiroidisme berat dapat menyebabkan bradiaritmia.\n4. **Ekokardiografi:** Untuk menilai penyakit jantung struktural atau kelainan gerakan dinding (misal, akibat infark inferior).'
    },
    differentialDiagnosis: {
      en: '1. **Second-Degree AV Block (Mobitz Type II):** Some P waves conduct to the ventricles, maintaining a constant PR interval for conducted beats. In CHB, no P waves conduct.\n2. **AV Dissociation without block:** E.g., accelerated junctional rhythm overtaking a slow sinus rhythm, but the ventricular rate is faster than or equal to the atrial rate.',
      id: '1. **AV Block Derajat Dua (Mobitz Tipe II):** Beberapa gelombang P terhantar ke ventrikel, mempertahankan interval PR konstan untuk denyut yang terhantar. Pada CHB, tidak ada gelombang P yang terhantar.\n2. **Disosiasi AV Tanpa Blok:** Misal, irama junctional terakselerasi yang mendahului irama sinus lambat, tetapi laju ventrikel lebih cepat atau sama dengan laju atrium.'
    },
    treatment: {
      initial: {
        en: '1. **Atropine:** 1 mg IV bolus every 3-5 minutes up to a maximum of 3 mg. Note: Often ineffective in wide-QRS infranodal blocks.\n2. **Transcutaneous Pacing (TCP):** Immediate initiation in unstable patients (hypotension, altered mental status, shock, severe chest pain). Set pacing rate to 60-80 bpm and increase current (mA) until electrical and mechanical capture is confirmed.\n3. **Chronotropic Infusions:** If pacing is delayed or ineffective, start **Epinephrine infusion** (2-10 mcg/min) or **Dopamine infusion** (5-20 mcg/kg/min).',
        id: '1. **Atropin:** Bolus IV 1 mg setiap 3-5 menit hingga maksimum 3 mg. Catatan: Sering kali tidak efektif pada blok infranodal dengan QRS lebar.\n2. **Transcutaneous Pacing (TCP):** Mulai segera pada pasien tidak stabil (hipotensi, penurunan kesadaran, syok, nyeri dada hebat). Atur laju pacing ke 60-80 kali/menit dan tingkatkan arus (mA) hingga capture listrik dan mekanik terkonfirmasi.\n3. **Infus Kronotropik:** Jika pacing tertunda atau tidak efektif, mulai **infus Epinefrin** (2-10 mcg/menit) atau **infus Dopamin** (5-20 mcg/kg/menit).'
      },
      definitive: {
        en: '1. **Temporary Transvenous Pacing:** Placement of a pacing wire in the right ventricle, serving as a bridge to a permanent pacemaker.\n2. **Permanent Pacemaker (PPM) Implantation:** The definitive treatment for chronic, irreversible third-degree AV block.',
        id: '1. **Pacing Transvena Sementara (Temporary Pacemaker):** Pemasangan kabel pacu jantung di ventrikel kanan, berfungsi sebagai jembatan menuju pacu jantung permanen.\n2. **Implantasi Pacu Jantung Permanen (PPM):** Terapi definitif untuk blok AV derajat tiga kronis dan ireversibel.'
      },
      caution: {
        en: '• **Do not delay transcutaneous pacing** in symptomatic patients while waiting for atropine to work, especially if the escape rhythm is wide.\n• Avoid beta-blockers, calcium channel blockers, and digoxin as they will worsen the block.',
        id: '• **Jangan menunda transcutaneous pacing** pada pasien bergejala sambil menunggu atropin bekerja, terutama jika escape rhythm melebar.\n• Hindari beta-blocker, antagonis kalsium, dan digoksin karena akan memperburuk blok.'
      },
      referral: {
        en: 'Urgent transfer to a coronary care unit or hospital with cardiac pacing and electrophysiology capabilities.',
        id: 'Rujukan segera ke unit perawatan intensif jantung atau rumah sakit dengan fasilitas pacu jantung dan elektrofisiologi.'
      }
    },
    pearls: {
      en: 'Complete heart block complicating an **acute inferior MI** is often at the AV node level (narrow QRS escape, responsive to atropine, often transient). However, complete block in an **acute anterior MI** is usually infranodal (wide QRS escape, atropine-resistant, high mortality, requires immediate pacing).',
      id: 'Blok jantung total yang mempersulit **MI inferior akut** sering kali terjadi pada tingkat nodus AV (QRS sempit, responsif terhadap atropin, sering bersifat transien). Namun, blok total pada **MI anterior akut** biasanya bersifat infranodal (QRS lebar, resisten terhadap atropin, mortalitas tinggi, memerlukan pacing segera).'
    },
    references: {
      en: '1. **2018 ACC/AHA/HRS Guideline** on the Evaluation and Management of Patients with Bradycardia and Cardiac Conduction Delay.',
      id: '1. **Pedoman ACC/AHA/HRS 2018** tentang Evaluasi dan Pengelolaan Pasien dengan Bradikardia dan Keterlambatan Konduksi Jantung.'
    }
  },
  {
    id: 'left_main',
    title: {
      en: 'Left Main Coronary Artery Stenosis (LMCA) (Red Flag)',
      id: 'Stenosis Arteri Koroner Kiri Utama (LMCA) (Tanda Bahaya)'
    },
    category: 'red-flags',
    overview: {
      en: 'Left Main Coronary Artery (LMCA) stenosis represents critical obstruction of the major vessel supplying >75% of the left ventricular myocardium. It has a extremely high mortality and displays a characteristic ECG pattern of widespread ST depression with ST elevation in lead aVR.',
      id: 'Stenosis Arteri Koroner Kiri Utama (LMCA) mewakili penyumbatan kritis pada pembuluh darah utama yang menyuplai >75% miokardium ventrikel kiri. Kondisi ini memiliki mortalitas sangat tinggi dan menunjukkan pola EKG khas berupa depresi ST luas dengan elevasi ST di sadapan aVR.'
    },
    ecgPattern: {
      waveformType: 'left_main',
      leads: {
        en: 'Widespread precordial/lateral leads (ST depression); lead aVR and V1 (ST elevation).',
        id: 'Tersebar luas di sadapan prekordial/lateral (depresi ST); sadapan aVR dan V1 (elevasi ST).'
      },
      keyFindings: {
        en: [
          'Widespread horizontal or downsloping ST-segment depression ≥1 mm in multiple leads (typically V4-V6, I, II, aVL).',
          'ST-segment elevation ≥1 mm in lead aVR.',
          'ST elevation in aVR is greater than or equal to ST elevation in V1 (aVR ≥ V1).',
          'Highly suggestive of Left Main stenosis, 3-vessel disease, or diffuse subendocardial ischemia.'
        ],
        id: [
          'Depresi segmen ST horizontal atau downsloping ≥1 mm yang tersebar luas di banyak sadapan (biasanya V4-V6, I, II, aVL).',
          'Elevasi segmen ST ≥1 mm di sadapan aVR.',
          'Elevasi ST di aVR lebih besar dari atau sama dengan elevasi ST di V1 (aVR ≥ V1).',
          'Sangat menunjukkan stenosis Left Main, penyakit 3 pembuluh darah (3-vessel disease), atau iskemia subendokardial difus.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Presentation:** Widespread ST depression ≥1 mm in ≥6 leads, with ST elevation in aVR ≥1 mm, in a patient with severe ischemic chest pain, dyspnea, or cardiogenic shock.\n\n**Note:** This pattern represents severe global subendocardial ischemia due to oxygen supply/demand mismatch from critical LMCA stenosis.',
      id: '**Presentasi EKG:** Depresi ST difus ≥1 mm di ≥6 sadapan, dengan elevasi ST di aVR ≥1 mm, pada pasien dengan nyeri dada iskemik berat, sesak napas, atau syok kardiogenik.\n\n**Catatan:** Pola ini mewakili iskemia subendokardial global yang berat akibat ketidakseimbangan pasokan/kebutuhan oksigen dari stenosis LMCA kritis.'
    },
    supportingDiagnostics: {
      en: '1. **Emergent Coronary Angiography:** Gold standard to visualize the degree of Left Main stenosis.\n2. **Echocardiography:** Assess for global ventricular dysfunction and rule out mechanical complications.\n3. **Serial Troponins:** Typically rise rapidly to very high levels.',
      id: '1. **Angiografi Koroner Segera:** Standar utama untuk memvisualisasikan derajat stenosis Left Main.\n2. **Ekokardiografi:** Menilai disfungsi ventrikel global dan menyingkirkan komplikasi mekanis.\n3. **Troponin Serial:** Biasanya meningkat cepat hingga kadar yang sangat tinggi.'
    },
    differentialDiagnosis: {
      en: '1. **Severe Three-Vessel Disease:** Can present with identical ECG findings; distinguished via coronary angiography.\n2. **Severe Anemia or Hypoxia:** Extreme supply-demand mismatch causing global subendocardial ischemia in patients with pre-existing stable CAD.',
      id: '1. **Penyakit Tiga Pembuluh Darah Berat:** Dapat datang dengan temuan EKG yang identik; dibedakan melalui angiografi koroner.\n2. **Anemia atau Hipoksia Berat:** Ketidakseimbangan ekstrim antara suplai-kebutuhan oksigen yang menyebabkan iskemia subendokardial global pada pasien dengan PJK stabil sebelumnya.'
    },
    treatment: {
      initial: {
        en: '1. Treat as extremely high-risk ACS.\n2. Oxygen titration (SpO2 ≥90%).\n3. Aspirin 160-320 mg chewed + load Clopidogrel 600 mg or Ticagrelor 180 mg immediately.\n4. Anticoagulation (UFH IV bolus + infusion).\n5. Control heart rate and blood pressure carefully; avoid severe hypotension.',
        id: '1. Tangani sebagai SKA dengan risiko sangat tinggi.\n2. Titrasi oksigen (SpO2 ≥90%).\n3. Aspirin 160-320 mg dikunyah + loading Klopidogrel 600 mg atau Tikagrelor 180 mg segera.\n4. Antikoagulan (UFH bolus IV + infus).\n5. Kontrol laju jantung dan tekanan darah secara hati-hati; hindari hipotensi berat.'
      },
      definitive: {
        en: '1. **Emergent Coronary Angiography:** Immediate transfer to the catheterization lab.\n2. **Revascularization:** **Coronary Artery Bypass Grafting (CABG)** is historically the gold standard for significant LMCA disease, though **PCI with drug-eluting stents** is increasingly utilized in selected patients depending on anatomical complexity (SYNTAX score).',
        id: '1. **Angiografi Koroner Segera:** Rujuk segera ke lab kateterisasi.\n2. **Revaskularisasi:** **Coronary Artery Bypass Grafting (CABG)** secara historis merupakan standar utama untuk penyakit LMCA yang signifikan, meskipun **PCI dengan drug-eluting stent** semakin banyak digunakan pada pasien terpilih tergantung kompleksitas anatomi (skor SYNTAX).'
      },
      caution: {
        en: '• **Do not delay angiography.** This pattern has a high risk of rapid progression to cardiogenic shock, VF, or sudden death.\n• Avoid excessive beta-blockade if there are signs of decompensated heart failure or low output state.',
        id: '• **Jangan menunda angiografi.** Pola ini memiliki risiko tinggi untuk berkembang cepat menjadi syok kardiogenik, VF, atau kematian mendadak.\n• Hindari beta-blocker dosis tinggi jika ada tanda-tanda gagal jantung dekompensasi atau curah jantung rendah.'
      },
      referral: {
        en: 'Immediate transfer to a tertiary hospital with comprehensive cardiothoracic surgery and interventional cardiology facilities.',
        id: 'Rujukan segera ke rumah sakit tersier dengan fasilitas bedah kardiotoraks komprehensif dan kardiologi intervensi.'
      }
    },
    pearls: {
      en: 'ST elevation in lead aVR is an underappreciated "lead of death." When accompanied by diffuse ST depression, it strongly predicts critical Left Main occlusion or severe multi-vessel disease. Recognize it early and keep the defibrillator pads nearby.',
      id: 'Elevasi ST di sadapan aVR adalah sadapan yang kurang dihargai ("lead of death"). Bila disertai dengan depresi ST difus, ini sangat memprediksi oklusi Left Main kritis atau penyakit multi-vessel yang berat. Kenali lebih awal dan siapkan ped defibrilator di dekat pasien.'
    },
    references: {
      en: '1. Rokos IC, et al. Electrocardiographic ST-segment elevation in lead aVR. Catheter Cardiovasc Interv 2008; 72:343-348.',
      id: '1. Rokos IC, dkk. Elevasi segmen ST elektrokardiografi di sadapan aVR. Catheter Cardiovasc Interv 2008; 72:343-348.'
    }
  },
  {
    id: 'unstable_angina',
    title: {
      en: 'Unstable Angina (ACS)',
      id: 'Angina Tidak Stabil (SKA)'
    },
    category: 'acs',
    overview: {
      en: 'Unstable Angina is a form of Acute Coronary Syndrome caused by transient, non-occlusive coronary thrombosis. It presents with ischemic symptoms without myocardial necrosis (negative biomarkers), but carries a high risk of progressing to myocardial infarction.',
      id: 'Angina Tidak Stabil adalah bentuk Sindrom Koroner Akut yang disebabkan oleh trombosis koroner non-oklusif yang bersifat transien. Penyakit ini datang dengan gejala iskemik tanpa nekrosis miokardium (biomarker negatif), tetapi membawa risiko tinggi untuk berkembang menjadi infark miokard.'
    },
    ecgPattern: {
      waveformType: 'unstable_angina',
      leads: {
        en: 'Variables; can be normal or show transient ST depression/T-wave inversion.',
        id: 'Bervariasi; dapat normal atau menunjukkan depresi ST/inversi gelombang T transien.'
      },
      keyFindings: {
        en: [
          'Transient ST-segment depression ≥0.5 mm during active chest pain.',
          'Transient T-wave inversion ≥1 mm during chest pain.',
          'ECG returns to baseline once chest pain resolves.',
          'Often shows completely normal ECG findings (~50% of cases).'
        ],
        id: [
          'Depresi segmen ST transien ≥0.5 mm saat nyeri dada aktif.',
          'Inversi gelombang T transien ≥1 mm saat nyeri dada.',
          'EKG kembali ke kondisi awal setelah nyeri dada mereda.',
          'Sering kali menunjukkan temuan EKG yang sepenuhnya normal (~50% kasus).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Clinical definition (angina presenting in 1 of 3 ways):**\n1. Rest angina (usually lasting >20 minutes).\n2. New-onset severe angina.\n3. Crescendo angina (increasingly frequent, longer, or lower threshold).\n\n**Biomarkers:** Cardiac troponin levels are **strictly normal (negative)** on serial testing, which differentiates it from NSTEMI.',
      id: '**Definisi klinis (angina yang datang dalam salah satu dari 3 cara):**\n1. Angina saat istirahat (biasanya berlangsung >20 menit).\n2. Angina onset baru yang berat.\n3. Angina crescendo (semakin sering, lebih lama, atau dengan ambang batas aktivitas lebih rendah).\n\n**Biomarker:** Kadar troponin jantung **tetap normal (negatif)** pada pemeriksaan serial, yang membedakannya dengan NSTEMI.'
    },
    supportingDiagnostics: {
      en: '1. **Serial hs-cTn:** Essential to rule out NSTEMI.\n2. **Echocardiography:** Rule out structural abnormalities or mechanical issues.\n3. **Outpatient/Inpatient Stress Testing or CT Coronary Angiography:** For low-risk patients once they are pain-free for 12-24 hours.',
      id: '1. **hs-cTn Serial:** Sangat penting untuk menyingkirkan NSTEMI.\n2. **Ekokardiografi:** Menyingkirkan kelainan struktural atau masalah mekanik.\n3. **Uji Latih Beban Jantung (Stress Test) atau CT Angiografi Koroner:** Untuk pasien risiko rendah setelah bebas nyeri selama 12-24 jam.'
    },
    differentialDiagnosis: {
      en: '1. **NSTEMI:** Distinguishable only by positive cardiac troponins.\n2. **Gastroesophageal Reflux Disease (GERD) / Esophageal Spasm:** Can mimic angina; relieved by antacids or nitrates (esophageal spasm), requiring cardiac rule-out.\n3. **Stable Angina:** Chest pain occurs predictably with exertion and resolves rapidly with rest or sublingual nitroglycerin.',
      id: '1. **NSTEMI:** Dapat dibedakan hanya dengan adanya troponin jantung yang positif.\n2. **GERD / Spasme Esofagus:** Dapat meniru angina; membaik dengan antasida atau nitrat (pada spasme esofagus), membutuhkan pemeriksaan jantung untuk menyingkirkan SKA.\n3. **Angina Stabil:** Nyeri dada terjadi secara terprediksi saat aktivitas dan membaik cepat dengan istirahat atau nitrogliserin sublingual.'
    },
    treatment: {
      initial: {
        en: '1. **Antiplatelet:** Aspirin 160-320 mg chewed immediately, plus Clopidogrel 300 mg loading (or Ticagrelor 180 mg).\n2. **Anticoagulation:** Fondaparinux 2.5 mg subcutaneous daily or Enoxaparin 1 mg/kg subcutaneously.\n3. **Anti-ischemic:** Sublingual Nitroglycerin for chest pain. Oral Beta-blocker if hemodynamically stable.\n4. **Statins:** High-intensity statin (Atorvastatin 80 mg or Rosuvastatin 40 mg) initiated early.',
        id: '1. **Antiplatelet:** Aspirin 160-320 mg dikunyah segera, ditambah Klopidogrel 300 mg loading (atau Tikagrelor 180 mg).\n2. **Antikoagulan:** Fondaparinuks 2.5 mg subkutan harian atau Enoksaparin 1 mg/kg subkutan.\n3. **Anti-iskemik:** Nitrogliserin sublingual untuk nyeri dada. Beta-blocker oral jika hemodinamik stabil.\n4. **Statin:** Statin intensitas tinggi (Atorvastatin 80 mg atau Rosuvastatin 40 mg) dimulai sejak dini.'
      },
      definitive: {
        en: '1. **Risk Stratification:** High-risk patients (recurrent pain, dynamic ECG changes) should undergo coronary angiography and PCI/CABG within 24-72 hours.\n2. **Medical Management:** Low-risk patients can be managed with optimized medical therapy (DAPT, beta-blockers, ACE inhibitors, high-dose statins) and outpatient follow-up.',
        id: '1. **Stratifikasi Risiko:** Pasien risiko tinggi (nyeri berulang, perubahan EKG dinamis) harus menjalani angiografi koroner dan PCI/CABG dalam 24-72 jam.\n2. **Tata Laksana Medis:** Pasien risiko rendah dapat dikelola dengan terapi medis optimal (DAPT, beta-blocker, penghambat ACE, statin dosis tinggi) dan kontrol rawat jalan.'
      },
      caution: {
        en: 'Avoid thrombolytic therapy in Unstable Angina; it increases bleeding risks without showing any clinical benefit in non-occlusive coronary disease.',
        id: 'Hindari terapi trombolitik pada Angina Tidak Stabil; terapi ini meningkatkan risiko perdarahan tanpa menunjukkan manfaat klinis pada penyakit koroner non-oklusif.'
      },
      referral: {
        en: 'Admit for monitoring and evaluation. Refer to cardiology for risk stratification and scheduling of coronary angiogram if indicated.',
        id: 'Rawat inap untuk pemantauan dan evaluasi. Rujuk ke kardiologi untuk stratifikasi risiko dan penjadwalan angiografi koroner jika diindikasikan.'
      }
    },
    pearls: {
      en: 'Unstable angina is a warning sign. A negative troponin does not mean the patient is safe. It is a highly unstable state; ~10% of these patients will suffer a myocardial infarction or cardiac arrest within 30 days if left untreated.',
      id: 'Angina tidak stabil adalah tanda peringatan. Troponin negatif tidak berarti pasien aman. Ini adalah kondisi yang sangat tidak stabil; ~10% dari pasien ini akan mengalami infark miokard atau henti jantung dalam waktu 30 hari jika tidak diobati.'
    },
    references: {
      en: '1. **2023 ESC Guidelines** for the management of acute coronary syndromes.',
      id: '1. **Pedoman ESC 2023** untuk pengelolaan sindrom koroner akut.'
    }
  },
  {
    id: 'wpw',
    title: {
      en: 'Wolff-Parkinson-White (WPW) Syndrome (Arrhythmia)',
      id: 'Sindrom Wolff-Parkinson-White (WPW) (Aritmia)'
    },
    category: 'arrhythmia',
    overview: {
      en: 'WPW Syndrome is a congenital pre-excitation syndrome caused by an accessory pathway (Bundle of Kent) that bypasses the AV node. It predisposes patients to tachyarrhythmias (such as AVRT and pre-excited AFib) and can occasionally lead to sudden cardiac death.',
      id: 'Sindrom WPW adalah sindrom pre-eksitasi kongenital yang disebabkan oleh jalur tambahan (Bundle of Kent) yang memintas nodus AV. Kondisi ini membuat pasien rentan terhadap takiaritmia (seperti AVRT dan AFib dengan pre-eksitasi) dan terkadang dapat menyebabkan kematian mendadak.'
    },
    ecgPattern: {
      waveformType: 'wpw',
      leads: {
        en: 'Diffuse; delta waves and QRS changes visible in multiple leads, particularly precordial V1-V6.',
        id: 'Difus; gelombang delta dan perubahan QRS terlihat di banyak sadapan, terutama prekordial V1-V6.'
      },
      keyFindings: {
        en: [
          'Short PR interval (<120 ms).',
          'Delta wave: Slurred, slow upstroke of the QRS complex.',
          'Widened QRS complex (>110 ms) due to pre-excitation.',
          'Secondary ST-segment and T-wave changes (discordant to QRS axis).'
        ],
        id: [
          'Interval PR pendek (<120 ms).',
          'Gelombang Delta: Slur/tanjakan naik yang lambat pada kompleks QRS.',
          'Kompleks QRS melebar (>110 ms) akibat pre-eksitasi.',
          'Perubahan sekunder segmen ST dan gelombang T (diskordan terhadap aksis QRS).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Features:** Characterized by PR <120 ms, delta wave, and QRS >110 ms in a patient with a history of paroxysmal palpitations or documented tachycardia (AVRT).',
      id: '**Fitur EKG:** Ditandai oleh PR <120 ms, gelombang delta, dan QRS >110 ms pada pasien dengan riwayat palpitasi paroksimal atau takikardia terdokumentasi (AVRT).'
    },
    supportingDiagnostics: {
      en: '1. **Holter Monitoring:** To document paroxysmal arrhythmias.\n2. **Echocardiography:** Rule out associated structural heart disease (e.g., Ebstein\'s anomaly).\n3. **Electrophysiology Study (EPS):** To localize the accessory pathway and assess its refractory period (risk stratification for sudden death).',
      id: '1. **Pemantauan Holter:** Untuk mendokumentasikan aritmia paroksimal.\n2. **Ekokardiografi:** Menyingkirkan penyakit jantung struktural terkait (misal, anomali Ebstein).\n3. **Studi Elektrofisiologi (EPS):** Untuk melokalisasi jalur tambahan dan menilai periode refrakternya (stratifikasi risiko kematian mendadak).'
    },
    differentialDiagnosis: {
      en: '1. **Bundle Branch Blocks (LBBB/RBBB):** Cause widened QRS, but have normal PR intervals and lack delta waves.\n2. **Left Ventricular Hypertrophy:** Can show widened QRS and ST/T changes, but PR interval is normal.\n3. **Myocardial Infarction:** Delta waves can mimic pathological Q waves ("pseudo-infarction pattern" e.g., in inferior leads).',
      id: '1. **Bundle Branch Block (LBBB/RBBB):** Menyebabkan QRS melebar, tetapi memiliki interval PR normal dan tidak ada gelombang delta.\n2. **Hipertrofi Ventrikel Kiri (LVH):** Dapat menunjukkan QRS melebar dan perubahan ST/T, tetapi interval PR normal.\n3. **Infark Miokard:** Gelombang delta dapat meniru gelombang Q patologis ("pola pseudo-infark" misal, di sadapan inferior).'
    },
    treatment: {
      initial: {
        en: '1. **Hemodynamically Unstable Tachycardia (AVRT or AFib):** Emergent synchronized cardioversion.\n2. **Hemodynamically Stable Narrow-Complex Tachycardia (Orthodromic AVRT):** Vagal maneuvers first-line, followed by **Adenosine** 6 mg IV rapid push (then 12 mg if unsuccessful).\n3. **Stable Pre-excited Atrial Fibrillation (Wide QRS, irregular, very fast):** Administer **Procainamide** IV or **Ibutilide**. Avoid AV nodal blocking agents.',
        id: '1. **Takiaritmia Tidak Stabil (AVRT atau AFib):** Kardioversi tersinkronisasi darurat.\n2. **Takiaritmia Kompleks Sempit Stabil (Orthodromic AVRT):** Manuver vagal sebagai lini pertama, diikuti oleh **Adenosin** 6 mg IV push cepat (lalu 12 mg jika tidak berhasil).\n3. **Atrial Fibrilasi dengan Pre-eksitasi Stabil (QRS lebar, ireguler, sangat cepat):** Berikan **Prokainamid** IV atau **Ibutilide**. Hindari obat penyekat nodus AV.'
      },
      definitive: {
        en: '**Catheter Ablation:** Radiofrequency catheter ablation of the accessory pathway is the gold standard definitive therapy. It has a >95% success rate and cures the syndrome.',
        id: '**Ablasi Kateter:** Ablasi kateter frekuensi radio pada jalur tambahan adalah terapi definitif standar utama. Memiliki tingkat keberhasilan >95% dan menyembuhkan sindrom ini.'
      },
      caution: {
        en: '• **CRITICAL WARNING:** In pre-excited AFib, AV nodal blockers (**Adenosine, Beta-blockers, Calcium Channel Blockers, Digoxin**) are strictly CONTRAINDICATED. Blocking the AV node will divert all electrical impulses through the accessory pathway, leading to ventricular rates >300 bpm, VF, and sudden cardiac death.',
        id: '• **PERINGATAN KRITIS:** Pada AFib dengan pre-eksitasi, penyekat nodus AV (**Adenosin, Beta-blocker, Antagonis Kalsium, Digoksin**) dikontraindikasikan secara mutlak. Menyekat nodus AV akan mengalihkan semua impuls listrik melalui jalur tambahan, menyebabkan laju ventrikel >300 kali/menit, VF, dan kematian jantung mendadak.'
      },
      referral: {
        en: 'Refer all patients with Brugada or WPW ECG patterns to a cardiac electrophysiologist for elective or urgent catheter ablation evaluation.',
        id: 'Rujuk semua pasien dengan pola EKG WPW ke spesialis elektrofisiologi jantung untuk evaluasi ablasi kateter secara elektif atau mendesak.'
      }
    },
    pearls: {
      en: 'Always inspect the PR interval and the QRS upstroke in any young patient presenting with paroxysmal tachycardia. If the QRS is wide and irregular (pre-excited AFib), NEVER administer Adenosine or Diltiazem. Reach for Procainamide or synchronized cardioversion.',
      id: 'Selalu periksa interval PR dan tanjakan naik QRS pada pasien muda yang datang dengan takikardia paroksimal. Jika QRS lebar dan ireguler (AFib dengan pre-eksitasi), JANGAN PERNAH berikan Adenosin atau Diltiazem. Gunakan Prokainamid atau kardioversi tersinkronisasi.'
    },
    references: {
      en: '1. **2015 ACC/AHA/HRS Guideline** for the Management of Adult Patients with Supraventricular Tachycardia.\n2. **2020 ESC Guidelines** for the management of patients with supraventricular tachycardia.',
      id: '1. **Pedoman ACC/AHA/HRS 2015** untuk Pengelolaan Pasien Dewasa dengan Takikardia Supraventrikel.\n2. **Pedoman ESC 2020** untuk pengelolaan pasien dengan takikardia supraventrikel.'
    }
  },
  {
    id: 'afib',
    title: {
      en: 'Atrial Fibrillation (AFib) (Arrhythmia)',
      id: 'Fibrilasi Atrium (AFib) (Aritmia)'
    },
    category: 'arrhythmia',
    overview: {
      en: 'Atrial Fibrillation is the most common sustained cardiac arrhythmia. It is characterized by chaotic, rapid atrial electrical activation leading to irregular ventricular response. It carries a significant risk of thromboembolic stroke and tachy-induced cardiomyopathy.',
      id: 'Fibrilasi Atrium adalah aritmia jantung persisten yang paling sering terjadi. Ditandai oleh aktivasi listrik atrium yang kacau dan cepat, menyebabkan respons ventrikel yang ireguler. Kondisi ini membawa risiko signifikan stroke tromboemboli dan kardiomiopati akibat takikardia.'
    },
    ecgPattern: {
      waveformType: 'afib',
      leads: {
        en: 'Diffuse; best seen in V1 and inferior leads II, III, aVF.',
        id: 'Difus; paling jelas terlihat di V1 dan sadapan inferior II, III, aVF.'
      },
      keyFindings: {
        en: [
          'Absence of distinct, repeating P waves.',
          'Presence of chaotic, irregular fibrillatory (f) waves (rates 350-600 bpm).',
          '"Irregularly irregular" ventricular rhythm (irregular R-R intervals).',
          'Narrow QRS complexes (unless co-existing bundle branch block or rate-related aberrancy).'
        ],
        id: [
          'Absennya gelombang P yang jelas dan berulang.',
          'Adanya gelombang fibrilasi (f) yang kacau dan ireguler (laju 350-600 kali/menit).',
          'Irama ventrikel yang "ireguler ireguler" (interval R-R tidak teratur).',
          'Kompleks QRS sempit (kecuali ada bundle branch block atau aberansi terkait laju jantung).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Confirmation:** A standard 12-lead ECG or single-lead ECG strip showing irregularly irregular rhythm without P waves lasting for at least 30 seconds is diagnostic.',
      id: '**Konfirmasi EKG:** EKG 12-sadapan standar atau strip EKG sadapan tunggal menunjukkan irama ireguler ireguler tanpa gelombang P yang berlangsung minimal 30 detik sudah menegakkan diagnosis.'
    },
    supportingDiagnostics: {
      en: '1. **Echocardiography (TTE/TEE):** TTE to evaluate for chamber sizes, valve disease, and LV function. TEE is mandatory before cardioversion to rule out left atrial appendage (LAA) thrombus.\n2. **Thyroid Function Tests (TSH, Free T4):** Hyperthyroidism is a classic reversible cause.\n3. **Serum Electrolytes:** Potassium and Magnesium.\n4. **Stroke Risk Stratification:** Calculate **CHA2DS2-VASc score**.\n5. **Bleeding Risk:** Calculate **HAS-BLED score**.',
      id: '1. **Ekokardiografi (TTE/TEE):** TTE untuk mengevaluasi ukuran ruang jantung, penyakit katup, dan fungsi LV. TEE wajib dilakukan sebelum kardioversi untuk menyingkirkan trombus pada left atrial appendage (LAA).\n2. **Fungsi Tiroid (TSH, T4 Bebas):** Hipertiroidisme adalah penyebab klasik yang reversibel.\n3. **Elektrolit Serum:** Kalium dan Magnesium.\n4. **Stratifikasi Risiko Stroke:** Hitung **skor CHA2DS2-VASc**.\n5. **Risiko Perdarahan:** Hitung **skor HAS-BLED**.'
    },
    differentialDiagnosis: {
      en: '1. **Atrial Flutter with Variable Block:** Shows regular biphasic flutter (sawtooth) waves, though ventricular rate can be irregular.\n2. **Multifocal Atrial Tachycardia (MAT):** Irregular rhythm, but has distinct P waves with ≥3 different morphologies, commonly associated with COPD.\n3. **Frequent Premature Atrial Contractions (PACs):** Can make the rhythm look irregular, but baseline sinus P waves are present.',
      id: '1. **Atrial Flutter dengan Blok Bervariasi:** Menunjukkan gelombang flutter (gigi gergaji) reguler bifasik, meskipun laju ventrikel dapat ireguler.\n2. **Takikardia Atrium Multifokal (MAT):** Irama ireguler, tetapi memiliki gelombang P jelas dengan ≥3 morfologi berbeda, sering dikaitkan dengan PPOK.\n3. **Kontraksi Atrium Prematur (PAC) multipel/frequent:** Dapat membuat irama tampak tidak teratur, tetapi gelombang P sinus awal tetap ada.'
    },
    treatment: {
      initial: {
        en: '1. **Hemodynamically Unstable:** Emergent synchronized cardioversion (start at 120-200 J biphasic).\n2. **Hemodynamically Stable Rate Control:**\n   - **Beta-blockers:** Metoprolol 2.5-5 mg IV bolus up to 3 doses, or Bisoprolol 2.5-5 mg orally.\n   - **Calcium Channel Blockers:** Diltiazem 0.25 mg/kg IV bolus over 2 minutes, then infusion (avoid in heart failure).\n   - **Digoxin:** 0.25-0.5 mg IV/PO (preferred in decompensated heart failure with hypotension).\n3. **Anticoagulation:** Initiate based on stroke risk (CHA2DS2-VASc ≥1 in men, ≥2 in women) using **NOACs** (Apixaban, Rivaroxaban, Dabigatran) or Warfarin.',
        id: '1. **Tidak Stabil secara Hemodinamik:** Kardioversi tersinkronisasi segera (mulai 120-200 J bifasik).\n2. **Kontrol Laju Jantung (Rate Control) Stabil:**\n   - **Beta-blocker:** Metoprolol 2.5-5 mg bolus IV hingga 3 dosis, atau Bisoprolol 2.5-5 mg oral.\n   - **Antagonis Kalsium:** Diltiazem 0.25 mg/kg bolus IV selama 2 menit, dilanjutkan infus (hindari pada gagal jantung).\n   - **Digoksin:** 0.25-0.5 mg IV/PO (lebih disukai pada gagal jantung dekompensasi dengan hipotensi).\n3. **Antikoagulan:** Mulai berdasarkan risiko stroke (CHA2DS2-VASc ≥1 pada pria, ≥2 pada wanita) menggunakan **NOAC** (Apiksaban, Rivaroksaban, Dabigatran) atau Warfarin.'
      },
      definitive: {
        en: '1. **Rhythm Control (Cardioversion):** Electrical or chemical (Amiodarone, Flecainide) cardioversion. Note: If AFib duration >48h, anticoagulate for at least 3 weeks before or perform TEE to rule out thrombus.\n2. **Catheter Ablation:** Pulmonary Vein Isolation (PVI) is the gold standard for symptomatic paroxysmal/persistent AFib refractory to medications.',
        id: '1. **Kontrol Irama (Rhythm Control - Kardioversi):** Kardioversi listrik atau kimia (Amiodaron, Flekainid). Catatan: Jika durasi AFib >48 jam, berikan antikoagulan minimal 3 minggu sebelumnya atau lakukan TEE untuk menyingkirkan trombus.\n2. **Ablasi Kateter:** Isolasi Vena Pulmonal (PVI) adalah terapi standar utama untuk AFib paroksimal/persisten bergejala yang refrakter terhadap obat.'
      },
      caution: {
        en: '• **Do not cardiovert stable AFib >48h** without prior 3-week anticoagulation or TEE, due to high risk of thromboembolic stroke.\n• Avoid Diltiazem/Verapamil in patients with reduced ejection fraction (HFrEF) as they are negative inotropes.',
        id: '• **Jangan melakukan kardioversi pada AFib stabil >48 jam** tanpa antikoagulan 3 minggu sebelumnya atau TEE, karena risiko tinggi stroke tromboemboli.\n• Hindari Diltiazem/Verapamil pada pasien dengan fraksi ejeksi rendah (HFrEF) karena bersifat inotropik negatif.'
      },
      referral: {
        en: 'Refer to cardiology for long-term rhythm control strategy, anticoagulation management, or evaluation for catheter ablation.',
        id: 'Rujuk ke spesialis jantung untuk strategi kontrol irama jangka panjang, manajemen antikoagulan, atau evaluasi untuk ablasi kateter.'
      }
    },
    pearls: {
      en: 'Before rate-controlling a patient with AFib, always ask: **Is this WPW?** If the QRS is wide and irregular, it is pre-excited AFib. Giving Diltiazem or Digoxin will cause ventricular fibrillation. Procainamide or electrical cardioversion is the only answer.',
      id: 'Sebelum mengontrol laju jantung pada pasien AFib, selalu tanyakan: **Apakah ini WPW?** Jika QRS lebar dan ireguler, itu adalah AFib dengan pre-eksitasi. Memberikan Diltiazem atau Digoksin akan memicu fibrilasi ventrikel. Prokainamid atau kardioversi listrik adalah satu-satunya jawaban.'
    },
    references: {
      en: '1. **2020 ESC Guidelines** for the diagnosis and management of atrial fibrillation.\n2. **2023 ACC/AHA/ACCP/HRS Guideline** for the Diagnosis and Management of Atrial Fibrillation.',
      id: '1. **Pedoman ESC 2020** untuk diagnosis dan pengelolaan fibrilasi atrium.\n2. **Pedoman ACC/AHA/ACCP/HRS 2023** untuk Diagnosis dan Pengelolaan Fibrilasi Atrium.'
    }
  },
  {
    id: 'aflutter',
    title: {
      en: 'Atrial Flutter (Arrhythmia)',
      id: 'Atrial Flutter / Gelepar Atrium (Aritmia)'
    },
    category: 'arrhythmia',
    overview: {
      en: 'Atrial Flutter is a macro-reentrant supraventricular tachycardia, most commonly circling the tricuspid valve annulus in the right atrium (cavotricuspid isthmus dependent). It characteristically shows rapid, regular flutter waves with a sawtooth appearance.',
      id: 'Atrial Flutter adalah takikardia supraventrikel makro-reentrant, paling sering memutari anulus katup trikuspid di atrium kanan (tergantung pada isthmus kavotrikuspid). Ciri khasnya menunjukkan gelombang flutter yang cepat dan reguler dengan tampilan gigi gergaji.'
    },
    ecgPattern: {
      waveformType: 'aflutter',
      leads: {
        en: 'Inferior leads II, III, aVF (typical sawtooth waves); V1 (upright flutter waves).',
        id: 'Sadapan inferior II, III, aVF (gelombang gigi gergaji khas); V1 (gelombang flutter tegak).'
      },
      keyFindings: {
        en: [
          'Regular, rapid atrial rate (F waves) at 250-350 bpm.',
          'Classic "sawtooth" morphology (negative flutter waves in II, III, aVF in typical counterclockwise flutter).',
          'Ventricular rate is determined by the AV conduction ratio (most commonly 2:1 block, resulting in a ventricular rate of ~150 bpm).',
          'Constant RR intervals (unless variable AV block is present).'
        ],
        id: [
          'Laju atrium reguler dan cepat (gelombang F) pada 250-350 kali/menit.',
          'Morfologi "gigi gergaji" klasik (gelombang flutter negatif di II, III, aVF pada flutter counterclockwise khas).',
          'Laju ventrikel ditentukan oleh rasio konduksi AV (paling sering blok 2:1, menghasilkan laju ventrikel ~150 kali/menit).',
          'Interval RR konstan (kecuali jika ada blok AV yang bervariasi).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Identification:** Presence of regular, sawtooth F waves at ~300 bpm, commonly with a 2:1, 3:1, or 4:1 AV block. Suspect atrial flutter in any stable narrow QRS tachycardia presenting at exactly ~150 bpm.',
      id: '**Identifikasi EKG:** Adanya gelombang F gigi gergaji yang teratur pada laju ~300 kali/menit, biasanya dengan blok AV 2:1, 3:1, atau 4:1. Dicurigai atrial flutter pada takikardia QRS sempit stabil yang muncul dengan laju tepat ~150 kali/menit.'
    },
    supportingDiagnostics: {
      en: '1. **Echocardiography (TTE/TEE):** Assess for structural heart disease. TEE to rule out left atrial thrombus prior to cardioversion.\n2. **Thyroid Panel & Electrolytes:** Standard reversible cause screening.\n3. **Thromboembolic Risk:** Use CHA2DS2-VASc score (same as AFib).',
      id: '1. **Ekokardiografi (TTE/TEE):** Menilai penyakit jantung struktural. TEE untuk menyingkirkan trombus atrium kiri sebelum kardioversi.\n2. **Panel Tiroid & Elektrolit:** Skrining standar untuk penyebab yang reversibel.\n3. **Risiko Tromboemboli:** Gunakan skor CHA2DS2-VASc (sama seperti AFib).'
    },
    differentialDiagnosis: {
      en: '1. **Atrial Fibrillation:** Irregularly irregular, lacking the regular, uniform sawtooth waves.\n2. **AVNRT or AVRT:** Show distinct, retrograde P waves (if visible) and operate at rates of 150-250 bpm, without flutter waves.\n3. **Sinus Tachycardia:** Has normal sinus P waves and fluctuates with exertion/stress, whereas flutter rate remains fixed.',
      id: '1. **Fibrilasi Atrium:** Irama ireguler ireguler, tidak memiliki gelombang gigi gergaji yang teratur dan seragam.\n2. **AVNRT atau AVRT:** Menunjukkan gelombang P retrograde yang jelas (jika terlihat) dan beroperasi pada laju 150-250 kali/menit, tanpa gelombang flutter.\n3. **Takikardia Sinus:** Memiliki gelombang P sinus normal dan berfluktuasi dengan aktivitas/stres, sedangkan laju flutter cenderung tetap.'
    },
    treatment: {
      initial: {
        en: '1. **Hemodynamically Unstable:** Emergent synchronized cardioversion (highly sensitive to low energy, starting at 50-100 J).\n2. **Hemodynamically Stable Rate Control:** Similar to AFib but clinically more difficult to achieve rate control. Use Beta-blockers (Metoprolol) or Calcium Channel Blockers (Diltiazem).\n3. **Anticoagulation:** Mandated based on CHA2DS2-VASc score, identical to AFib protocols.',
        id: '1. **Tidak Stabil secara Hemodinamik:** Kardioversi tersinkronisasi segera (sangat sensitif terhadap energi rendah, mulai 50-100 J).\n2. **Kontrol Laju Jantung Stabil:** Mirip dengan AFib tetapi secara klinis lebih sulit dicapai kontrol lajunya. Gunakan Beta-blocker (Metoprolol) atau Antagonis Kalsium (Diltiazem).\n3. **Antikoagulan:** Wajib diberikan berdasarkan skor CHA2DS2-VASc, identik dengan protokol AFib.'
      },
      definitive: {
        en: '**Catheter Ablation:** Catheter ablation of the **cavotricuspid isthmus (CTI)** in the right atrium is the definitive therapy of choice. It has a >95% success rate and is highly curative with low recurrence rates.',
        id: '**Ablasi Kateter:** Ablasi kateter pada **cavotricuspid isthmus (CTI)** di atrium kanan adalah terapi definitif pilihan utama. Memiliki tingkat keberhasilan >95% dan sangat menyembuhkan dengan tingkat kekambuhan yang rendah.'
      },
      caution: {
        en: '• Be extremely careful when administering class Ic antiarrhythmics (Flecainide) without an AV nodal blocker; they can slow the flutter rate and precipitate a 1:1 AV conduction, leading to a ventricular rate of 250-300 bpm.\n• Apply same anticoagulation rules as AFib before cardioversion.',
        id: '• Sangat berhati-hati saat memberikan antiaritmia kelas Ic (Flekainid) tanpa penyekat nodus AV; obat ini dapat memperlambat laju flutter dan memicu konduksi AV 1:1, menyebabkan laju ventrikel 250-300 kali/menit.\n• Terapkan aturan antikoagulan yang sama seperti AFib sebelum melakukan kardioversi.'
      },
      referral: {
        en: 'Refer to an electrophysiologist for elective catheter ablation, which is highly successful and preferred over long-term medical rate control.',
        id: 'Rujuk ke spesialis elektrofisiologi untuk ablasi kateter elektif, yang memiliki tingkat keberhasilan tinggi dan lebih disukai daripada kontrol laju medis jangka panjang.'
      }
    },
    pearls: {
      en: '**"The 150 Rule."** If you see a narrow complex tachycardia with a ventricular rate of exactly ~150 bpm, it is Atrial Flutter with 2:1 block until proven otherwise. Turn on the "double speed" recording or administer Adenosine to transiently block the AV node and unmask the sawtooth waves.',
      id: '**"Aturan 150."** Jika Anda melihat takikardia kompleks sempit dengan laju ventrikel tepat ~150 kali/menit, itu adalah Atrial Flutter dengan blok 2:1 sampai terbukti sebaliknya. Rekam EKG dengan kecepatan ganda atau berikan Adenosin untuk memblok nodus AV secara transien dan memunculkan gelombang gigi gergaji.'
    },
    references: {
      en: '1. **2020 ESC Guidelines** for the management of patients with supraventricular tachycardia.',
      id: '1. **Pedoman ESC 2020** untuk pengelolaan pasien dengan takikardia supraventrikel.'
    }
  },
  {
    id: 'long_qt',
    title: {
      en: 'Long QT Syndrome (Red Flag)',
      id: 'Sindrom Long QT (Tanda Bahaya)'
    },
    category: 'red-flags',
    overview: {
      en: 'Long QT Syndrome (LQTS) is a myocardial repolarization disorder characterized by a prolonged QT interval on the ECG. It predisposes patients to torsades de pointes (a polymorphic VT), which can lead to syncope, seizures, or sudden cardiac death.',
      id: 'Sindrom Long QT adalah gangguan repolarisasi miokardium yang ditandai oleh perpanjangan interval QT pada EKG. Kondisi ini membuat pasien rentan terhadap torsades de pointes (VT polimorfik), yang dapat menyebabkan sinkop, kejang, atau kematian jantung mendadak.'
    },
    ecgPattern: {
      waveformType: 'long_qt',
      leads: {
        en: 'Diffuse; best measured in leads II, V5, or V6.',
        id: 'Difus; paling baik diukur di sadapan II, V5, atau V6.'
      },
      keyFindings: {
        en: [
          'Prolonged corrected QT (QTc) interval (typically QTc >470 ms in females, >450 ms in males; QTc >500 ms is a high-risk red flag).',
          'T-wave abnormalities (notched T waves, biphasic T waves, or T-wave alternans).',
          'QTc prolongation is calculated using Bazett\'s formula: QTc = QT / √RR.',
          'Bradycardia or prominent U waves may coexist.'
        ],
        id: [
          'Perpanjangan interval QT terkoreksi (QTc) (biasanya QTc >470 ms pada wanita, >450 ms pada pria; QTc >500 ms adalah tanda bahaya risiko tinggi).',
          'Kelainan gelombang T (gelombang T berlekuk, bifasik, atau alternans gelombang T).',
          'Perpanjangan QTc dihitung menggunakan rumus Bazett: QTc = QT / √RR.',
          'Bradikardia atau gelombang U yang menonjol dapat menyertai.'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**Schwartz Score:** Combines clinical history (syncope, family history of sudden death), ECG features (QTc length, T-wave alternans, bradycardia), and genetic findings.\n\n**Acquired causes:** Must exclude electrolyte abnormalities (Hypokalemia, Hypomagnesemia, Hypocalcemia) and QTc-prolonging drugs.',
      id: '**Skor Schwartz:** Menggabungkan riwayat klinis (sinkop, riwayat keluarga dengan kematian mendadak), fitur EKG (panjang QTc, alternans gelombang T, bradikardia), dan temuan genetik.\n\n**Penyebab Didapat (Acquired):** Wajib menyingkirkan kelainan elektrolit (Hipokalemia, Hipomagnesemia, Hipokalsemia) dan obat-obatan yang memperpanjang QTc.'
    },
    supportingDiagnostics: {
      en: '1. **Serum Electrolytes:** Immediate Potassium, Magnesium, and Calcium.\n2. **Genetic Testing:** Identifies congenital LQTS subtypes (LQT1, LQT2, LQT3 are the most common).\n3. **Holter Monitor:** Evaluates dynamic QT changes and ventricular ectopy.\n4. **Exercise Treadmill Test:** Blunted QTc adaptation to exercise is key in LQT1.',
      id: '1. **Elektrolit Serum:** Pemeriksaan Kalium, Magnesium, dan Kalsium segera.\n2. **Tes Genetik:** Mengidentifikasi subtipe LQTS kongenital (LQT1, LQT2, LQT3 adalah yang paling umum).\n3. **Pemantauan Holter:** Mengevaluasi perubahan QT dinamis dan ektopi ventrikel.\n4. **Uji Latih Beban (Treadmill):** Adaptasi QTc yang tumpul terhadap aktivitas sangat penting pada LQT1.'
    },
    differentialDiagnosis: {
      en: '1. **Electrolyte Imbalance:** Hypokalemia and hypomagnesemia prolong the QT interval and must be ruled out before diagnosing congenital LQTS.\n2. **Drug-Induced QT Prolongation:** Numerous drugs (e.g., Amiodarone, Haloperidol, Levofloxacin, Ondansetron) prolong the QT; check CredibleMeds.org.',
      id: '1. **Ketidakseimbangan Elektrolit:** Hipokalemia dan hipomagnesemia memperpanjang interval QT dan harus disingkirkan sebelum mendiagnosis LQTS kongenital.\n2. **Perpanjangan QT Akibat Obat:** Banyak obat (misal, Amiodaron, Haloperidol, Levofloksasin, Ondansetron) memperpanjang QT; cek CredibleMeds.org.'
    },
    treatment: {
      initial: {
        en: '1. **Acute Torsades de Pointes (Polymorphic VT with prolonged QT):**\n   - **Hemodynamically Unstable:** Immediate unsynchronized cardioversion (defibrillation).\n   - **Hemodynamically Stable:** **Magnesium Sulfate** 2 g IV bolus over 1-2 minutes, followed by an infusion of 3-20 mg/min. Correct hypokalemia aggressively (target K+ >4.5 mEq/L).\n   - **Overdrive Pacing:** Temporary transvenous pacing at 90-110 bpm to shorten the QT interval and suppress torsades trigger.\n2. **Discontinue all QTc-prolonging drugs.**',
        id: '1. **Torsades de Pointes Akut (VT Polimorfik dengan perpanjangan QT):**\n   - **Tidak Stabil secara Hemodinamik:** Defibrilasi segera (kardioversi tidak tersinkronisasi).\n   - **Stabil secara Hemodinamik:** **Magnesium Sulfat** 2 g IV bolus selama 1-2 menit, diikuti dengan infus 3-20 mg/menit. Koreksi hipokalemia secara agresif (target K+ >4.5 mEq/L).\n   - **Overdrive Pacing:** Pacu jantung transvena sementara pada laju 90-110 kali/menit untuk memperpendek interval QT dan menekan pemicu torsades.\n2. **Hentikan semua obat yang memperpanjang QTc.**'
      },
      definitive: {
        en: '1. **Congenital LQTS Long-Term Management:**\n   - **Beta-blockers:** **Nadolol** or **Propranolol** (preferred) are highly effective in LQT1 and LQT2.\n   - **Implantable Cardioverter-Defibrillator (ICD):** Recommended for patients with syncope or cardiac arrest despite beta-blocker therapy.\n   - **Left Cardiac Sympathetic Denervation (LCSD):** Surgical option for refractory patients.',
        id: '1. **Tata Laksana Jangka Panjang LQTS Kongenital:**\n   - **Beta-blocker:** **Nadolol** atau **Propranolol** (lebih disukai) sangat efektif pada LQT1 dan LQT2.\n   - **Implantable Cardioverter-Defibrillator (ICD):** Direkomendasikan untuk pasien dengan sinkop atau henti jantung meskipun sudah mendapat terapi beta-blocker.\n   - **Denervasi Simpatis Jantung Kiri (LCSD):** Pilihan bedah untuk pasien refrakter.'
      },
      caution: {
        en: '• **Do not use Amiodarone, Sotalol, or Procainamide** to treat Torsades de Pointes. These antiarrhythmics prolong the QT interval and will worsen the arrhythmia, potentially causing cardiac arrest.\n• Keep a comprehensive list of QTc-prolonging drugs (CredibleMeds.org).',
        id: '• **Jangan gunakan Amiodaron, Sotalol, atau Prokainamid** untuk mengobati Torsades de Pointes. Antiaritmia ini memperpanjang interval QT dan akan memperburuk aritmia, yang dapat memicu henti jantung.\n• Selalu periksa daftar obat yang memperpanjang QTc (CredibleMeds.org).'
      },
      referral: {
        en: 'Refer all patients with unexplained QTc >470 ms (females) or >450 ms (males) to a cardiac electrophysiologist or genetic cardiologist.',
        id: 'Rujuk semua pasien dengan QTc >470 ms (wanita) atau >450 ms (pria) yang tidak dapat dijelaskan ke spesialis elektrofisiologi jantung.'
      }
    },
    pearls: {
      en: 'A QTc >500 ms is a ticking time bomb. The risk of torsades de pointes increases exponentially when the QTc exceeds 500 ms. If a patient is on multiple QT-prolonging drugs, monitor the QTc daily and stop offending agents immediately.',
      id: 'QTc >500 ms adalah bom waktu. Risiko torsades de pointes meningkat secara eksponensial ketika QTc melebihi 500 ms. Jika pasien menggunakan beberapa obat yang memperpanjang QT, pantau QTc setiap hari dan segera hentikan obat pemicu.'
    },
    references: {
      en: '1. **2022 ESC Guidelines** for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death.\n2. **CredibleMeds.org** (QTc drug safety database).',
      id: '1. **Pedoman ESC 2022** untuk pengelolaan pasien dengan aritmia ventrikel dan pencegahan kematian jantung mendadak.\n2. **CredibleMeds.org** (Database keamanan obat QTc).'
    }
  },
  {
    id: 'lbbb',
    title: {
      en: 'Left Bundle Branch Block (LBBB) (Arrhythmia/ACS presentation)',
      id: 'Blok Cabang Berkas Kiri / LBBB (Aritmia / Presentasi SKA)'
    },
    category: 'arrhythmia',
    overview: {
      en: 'Left Bundle Branch Block (LBBB) occurs when conduction through the left bundle branch is obstructed, delaying left ventricular depolarization. It alters QRS morphology, masks ischemic changes on ECG, and is often a sign of underlying structural heart disease (hypertension, CAD, cardiomyopathy).',
      id: 'Left Bundle Branch Block terjadi ketika konduksi melalui cabang berkas kiri terhambat, memperlambat depolarisasi ventrikel kiri. Ini mengubah morfologi QRS, menutupi tanda iskemia pada EKG, dan sering kali merupakan tanda adanya penyakit jantung struktural (hipertensi, PJK, kardiomiopati).'
    },
    ecgPattern: {
      waveformType: 'lbbb',
      leads: {
        en: 'Lateral leads I, aVL, V5-V6; precordial leads V1-V3.',
        id: 'Sadapan lateral I, aVL, V5-V6; sadapan prekordial V1-V3.'
      },
      keyFindings: {
        en: [
          'QRS duration ≥120 ms in adults.',
          'Broad, monophasic, or notched R waves in lateral leads (I, aVL, V5-V6), lacking Q waves.',
          'QS or rS complex in right precordial leads V1-V3 with a dominant, deep S wave.',
          'Secondary ST-segment and T-wave discordance (ST depression and T inversion in leads with upright QRS; ST elevation and upright T in leads with negative QRS).'
        ],
        id: [
          'Durasi QRS ≥120 ms pada dewasa.',
          'Gelombang R lebar, monofasik, atau berlekuk di sadapan lateral (I, aVL, V5-V6), tanpa gelombang Q.',
          'Kompleks QS atau rS di sadapan prekordial kanan V1-V3 dengan gelombang S dominan yang dalam.',
          'Diskordansi segmen ST dan gelombang T sekunder (depresi ST dan inversi T di sadapan dengan QRS positif; elevasi ST dan T tegak di sadapan dengan QRS negatif).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Diagnostic:** QRS ≥120 ms, broad/notched R waves in lateral leads, absent Q waves in I, V5, V6, and discordant ST/T changes.\n\n**Evaluating Ischemia (Sgarbossa Criteria):** In patients with LBBB and suspected acute MI, standard STEMI criteria cannot be used. Use **Sgarbossa Criteria** (Score ≥3 is highly specific for MI):\n1. Concordant ST elevation ≥1 mm in ≥1 lead (5 points).\n2. Concordant ST depression ≥1 mm in V1-V3 (3 points).\n3. Discordant ST elevation ≥5 mm (or ST/S ratio ≤ -0.25 in modified criteria) in ≥1 lead (2 points).',
      id: '**Diagnostik EKG:** QRS ≥120 ms, gelombang R lebar/berlekuk di sadapan lateral, tidak ada gelombang Q di I, V5, V6, dan perubahan ST/T diskordan.\n\n**Mengevaluasi Iskemia (Kriteria Sgarbossa):** Pada pasien dengan LBBB dan kecurigaan MI akut, kriteria STEMI standar tidak dapat digunakan. Gunakan **Kriteria Sgarbossa** (Skor ≥3 sangat spesifik untuk MI):\n1. Elevasi ST konkordan ≥1 mm di ≥1 sadapan (5 poin).\n2. Depresi ST konkordan ≥1 mm di V1-V3 (3 poin).\n3. Elevasi ST diskordan ≥5 mm (atau rasio ST/S ≤ -0.25 pada kriteria modifikasi) di ≥1 sadapan (2 poin).'
    },
    supportingDiagnostics: {
      en: '1. **Echocardiography:** Assess for left ventricular hypertrophy, regional wall motion abnormalities, and ejection fraction.\n2. **High-sensitivity Troponins:** If acute coronary syndrome is suspected.\n3. **Coronary Angiography:** If modified Sgarbossa criteria are positive or patient is hemodynamically unstable.',
      id: '1. **Ekokardiografi:** Menilai hipertrofi ventrikel kiri, kelainan gerakan dinding regional, dan fraksi ejeksi.\n2. **Troponin Jantung Sensitivitas Tinggi:** Jika dicurigai adanya sindrom koroner akut.\n3. **Angiografi Koroner:** Jika kriteria Sgarbossa (atau modifikasi) positif atau pasien tidak stabil secara hemodinamik.'
    },
    differentialDiagnosis: {
      en: '1. **Right Bundle Branch Block:** QRS ≥120 ms, but shows rSR\' in V1-V3 and slurred S wave in lateral leads.\n2. **Pacemaker Rhythm:** Ventricular pacing displays a wide QRS resembling LBBB, but with visible pacing spikes preceding the QRS.\n3. **Left Ventricular Hypertrophy:** Widens QRS and causes ST depression/T-wave inversion, but QRS is usually <120 ms.',
      id: '1. **Right Bundle Branch Block:** QRS ≥120 ms, tetapi menunjukkan rSR\' di V1-V3 dan gelombang S lebar di sadapan lateral.\n2. **Irama Pacu Jantung (Pacemaker):** Pacing ventrikel menampilkan QRS lebar menyerupai LBBB, tetapi dengan spike pacu jantung yang terlihat sebelum QRS.\n3. **Hipertrofi Ventrikel Kiri (LVH):** Memperlebar QRS dan menyebabkan depresi ST/inversi gelombang T, tetapi QRS biasanya <120 ms.'
    },
    treatment: {
      initial: {
        en: '1. **Asymptomatic Isolated LBBB:** No acute treatment required.\n2. **LBBB with Suspected Acute MI (Chest Pain):** Treat identically to STEMI. Assess using Sgarbossa or modified Sgarbossa criteria. If hemodynamically unstable or Sgarbossa positive, initiate emergent reperfusion (PCI).\n3. Antiplatelets and anticoagulants as in ACS if myocardial infarction is suspected.',
        id: '1. **LBBB Terisolasi Tanpa Gejala:** Tidak memerlukan penanganan akut.\n2. **LBBB dengan Kecurigaan MI Akut (Nyeri Dada):** Tangani secara identik dengan STEMI. Nilai menggunakan kriteria Sgarbossa atau Sgarbossa modifikasi. Jika hemodinamik tidak stabil atau Sgarbossa positif, mulai reperfusi segera (PCI).\n3. Antiplatelet dan antikoagulan seperti pada SKA jika dicurigai adanya infark miokard.'
      },
      definitive: {
        en: '1. **Revascularization:** Emergent PCI/CABG if acute MI is confirmed.\n2. **Cardiac Resynchronization Therapy (CRT):** Indicated for patients with heart failure (EF ≤35%), NYHA class II-IV symptoms, and LBBB with QRS ≥150 ms despite optimal medical therapy.',
        id: '1. **Revaskularisasi:** PCI/CABG darurat jika MI akut terkonfirmasi.\n2. **Cardiac Resynchronization Therapy (CRT):** Diindikasikan untuk pasien dengan gagal jantung (EF ≤35%), gejala NYHA kelas II-IV, dan LBBB dengan QRS ≥150 ms meskipun sudah mendapat terapi medis optimal.'
      },
      caution: {
        en: '• **Do not ignore new or presumed new LBBB** in a patient with chest pain; historically it was treated as a STEMI alert.\n• Avoid excessive beta-blockade if patient is in decompensated heart failure.',
        id: '• **Jangan mengabaikan LBBB baru atau dianggap baru** pada pasien dengan nyeri dada; secara historis ini ditangani langsung sebagai alarm STEMI.\n• Hindari beta-blocker dosis tinggi jika pasien dalam kondisi gagal jantung dekompensasi.'
      },
      referral: {
        en: 'Refer patients with new LBBB to cardiology for coronary evaluation and echocardiography.',
        id: 'Rujuk pasien dengan LBBB baru ke spesialis jantung untuk evaluasi koroner dan ekokardiografi.'
      }
    },
    pearls: {
      en: 'LBBB causes ST elevation in V1-V3 as a normal secondary repolarization abnormality. Do not mistake this baseline discordant ST elevation for acute STEMI. Use Sgarbossa criteria: **concordant** ST changes (ST elevation in leads with positive QRS, or ST depression in V1-V3) are the true markers of acute infarction in LBBB.',
      id: 'LBBB menyebabkan elevasi ST di V1-V3 sebagai kelainan repolarisasi sekunder yang normal. Jangan salah mengira elevasi ST diskordan ini sebagai STEMI akut. Gunakan kriteria Sgarbossa: perubahan ST **konkordan** (elevasi ST pada sadapan dengan QRS positif, atau depresi ST di V1-V3) adalah penanda infark akut yang sebenarnya pada LBBB.'
    },
    references: {
      en: '1. Sgarbossa EB, et al. Electrocardiographic diagnosis of acute myocardial infarction in the presence of left bundle-branch block. N Engl J Med 1996; 334:481-487.\n2. 2023 ESC Guidelines for the management of acute coronary syndromes.',
      id: '1. Sgarbossa EB, dkk. Diagnosis elektrokardiografi infark miokard akut pada kondisi blok cabang berkas kiri. N Engl J Med 1996; 334:481-487.\n2. Pedoman ESC 2023 untuk pengelolaan sindrom koroner akut.'
    }
  },
  {
    id: 'rbbb',
    title: {
      en: 'Right Bundle Branch Block (RBBB) (Arrhythmia)',
      id: 'Blok Cabang Berkas Kanan / RBBB (Aritmia)'
    },
    category: 'arrhythmia',
    overview: {
      en: 'Right Bundle Branch Block (RBBB) is caused by obstruction of conduction in the right bundle branch, delaying right ventricular depolarization. RBBB can be benign or occur in association with structural heart disease, acute right ventricular strain (e.g., PE), or coronary artery disease.',
      id: 'Right Bundle Branch Block disebabkan oleh hambatan konduksi pada cabang berkas kanan, memperlambat depolarisasi ventrikel kanan. RBBB dapat bersifat jinak atau terjadi bersamaan dengan penyakit jantung struktural, regangan ventrikel kanan akut (misal, emboli paru), atau penyakit arteri koroner.'
    },
    ecgPattern: {
      waveformType: 'rbbb',
      leads: {
        en: 'Right precordial V1-V3 (QRS morphology); lateral leads I, aVL, V5-V6.',
        id: 'Prekordial kanan V1-V3 (morfologi QRS); sadapan lateral I, aVL, V5-V6.'
      },
      keyFindings: {
        en: [
          'QRS duration ≥120 ms in adults.',
          'rSR\' or "M-shaped" QRS complex in right precordial leads V1-V3 (R\' is typically taller than r).',
          'Broad, slurred S wave in lateral leads (I, aVL, V5-V6) that is longer than the R wave duration.',
          'Secondary ST depression and T-wave inversion in right precordial leads V1-V3 (discordant to the late R\').'
        ],
        id: [
          'Durasi QRS ≥120 ms pada dewasa.',
          'Kompleks QRS berbentuk rSR\' atau "M-shape" di sadapan prekordial kanan V1-V3 (R\' biasanya lebih tinggi dari r).',
          'Gelombang S yang lebar dan slurred di sadapan lateral (I, aVL, V5-V6) yang lebih lama dari durasi gelombang R.',
          'Depresi ST sekunder dan inversi gelombang T di sadapan prekordial kanan V1-V3 (diskordan terhadap R\' akhir).'
        ]
      }
    },
    diagnosticCriteria: {
      en: '**ECG Diagnostic:** QRS ≥120 ms, rSR\' in V1-V3, and broad slurred S waves in lateral leads (I, aVL, V5-V6). In contrast to LBBB, RBBB does **not** mask ST-elevation ischemic changes, allowing standard STEMI diagnosis.',
      id: '**Diagnostik EKG:** QRS ≥120 ms, rSR\' di V1-V3, dan gelombang S lebar/lambat di sadapan lateral (I, aVL, V5-V6). Berbeda dengan LBBB, RBBB **tidak** menutupi perubahan iskemik elevasi ST, sehingga diagnosis STEMI standar dapat tetap ditegakkan.'
    },
    supportingDiagnostics: {
      en: '1. **Echocardiography:** Assess for right ventricular hypertrophy, dilation, and pulmonary artery pressures.\n2. **CTPA:** If acute RBBB presents with dyspnea and chest pain (rule out acute pulmonary embolism).\n3. **Troponin:** If acute coronary syndrome is clinically suspected.',
      id: '1. **Ekokardiografi:** Menilai hipertrofi ventrikel kanan, dilatasi, dan tekanan arteri pulmonal.\n2. **CTPA:** Jika RBBB akut disertai dengan sesak napas dan nyeri dada (menyingkirkan emboli paru akut).\n3. **Troponin:** Jika sindrom koroner akut dicurigai secara klinis.'
    },
    differentialDiagnosis: {
      en: '1. **Left Bundle Branch Block:** QRS ≥120 ms, but shows deep S waves in V1-V3 and broad monophasic R waves in lateral leads.\n2. **Brugada Syndrome:** Displays coved ST elevation in V1-V2 resembling RBBB, but lacks the broad slurred S wave in lateral leads.\n3. **Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC):** Shows epsilon waves and T-wave inversion in V1-V3.',
      id: '1. **Left Bundle Branch Block:** QRS ≥120 ms, tetapi menunjukkan gelombang S dalam di V1-V3 dan gelombang R lebar monofasik di sadapan lateral.\n2. **Sindrom Brugada:** Menampilkan elevasi ST coved di V1-V2 menyerupai RBBB, tetapi tidak memiliki gelombang S lebar di sadapan lateral.\n3. **Kardiomiopati Ventrikel Kanan Aritmogenik (ARVC):** Menunjukkan gelombang epsilon dan inversi gelombang T di V1-V3.'
    },
    treatment: {
      initial: {
        en: '1. **Asymptomatic Isolated RBBB:** No acute treatment required.\n2. **New RBBB in Acute Chest Pain/Dyspnea:** Evaluate for underlying causes: ACS (especially anterior STEMI) or acute Pulmonary Embolism.\n3. Support hemodynamics if right ventricular failure is present.',
        id: '1. **RBBB Terisolasi Tanpa Gejala:** Tidak memerlukan penanganan akut.\n2. **RBBB Baru pada Nyeri Dada/Sesak Napas Akut:** Evaluasi penyebab mendasar: SKA (terutama STEMI anterior) atau Emboli Paru akut.\n3. Dukung hemodinamik jika terjadi gagal ventrikel kanan.'
      },
      definitive: {
        en: '1. **Treat Underlying Condition:** Reperfusion for ACS, anticoagulation/thrombolysis for PE.\n2. **Permanent Pacemaker:** Indicated if RBBB is associated with symptomatic advanced second- or third-degree AV block, or alternating bundle branch block.',
        id: '1. **Obati Kondisi Mendasar:** Reperfusi untuk SKA, antikoagulan/trombolisis untuk emboli paru.\n2. **Pacu Jantung Permanen:** Diindikasikan jika RBBB disertai dengan blok AV derajat dua atau tiga lanjut yang bergejala, atau blok cabang berkas yang bergantian (alternating bundle branch block).'
      },
      caution: {
        en: '• **RBBB does not mask STEMI.** If you see RBBB with ST elevation in precordial leads, treat it as an acute STEMI immediately.\n• Check for associated fascicular blocks (bifascicular block), which increases risk of complete AV block.',
        id: '• **RBBB tidak menutupi STEMI.** Jika Anda melihat RBBB dengan elevasi ST di sadapan prekordial, segera tangani sebagai STEMI akut.\n• Periksa adanya blok fasikular terkait (blok bifasikular), yang meningkatkan risiko blok AV total.'
      },
      referral: {
        en: 'Refer to cardiology if new RBBB is detected, or if associated with syncope, bradycardia, or structural heart disease.',
        id: 'Rujuk ke spesialis jantung jika RBBB baru terdeteksi, atau jika disertai sinkop, bradikardia, atau penyakit jantung struktural.'
      }
    },
    pearls: {
      en: 'A new RBBB in a patient presenting with severe dyspnea and tachycardia should immediately raise suspicion for an acute massive Pulmonary Embolism causing sudden right ventricular strain. Look for the classic S1Q3T3 pattern as a secondary clue.',
      id: 'RBBB baru pada pasien dengan sesak napas berat dan takikardia harus segera memicu kecurigaan adanya Emboli Paru masif akut yang menyebabkan regangan ventrikel kanan mendadak. Cari pola S1Q3T3 sebagai petunjuk sekunder.'
    },
    references: {
      en: '1. **2018 ACC/AHA/HRS Guideline** on the Evaluation and Management of Patients with Bradycardia and Cardiac Conduction Delay.',
      id: '1. **Pedoman ACC/AHA/HRS 2018** tentang Evaluasi dan Pengelolaan Pasien dengan Bradikardia dan Keterlambatan Konduksi Jantung.'
    }
  }
];
