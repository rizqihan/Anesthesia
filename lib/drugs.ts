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
    "id": "acyclovir_oral",
    "genericName": "Acyclovir (Oral / IV)",
    "brandNames": [
      "Zovirax",
      "Clinovir",
      "Poviral",
      "Matrovir",
      "Scanvir"
    ],
    "drugClass": "Antiviral Guanosine Analogue (DNA Polymerase Inhibitor)",
    "indications": {
      "en": "Herpes zoster (shingles), herpes simplex virus (HSV-1 and HSV-2: genital herpes, mucocutaneous infections), varicella zoster (chickenpox), HSV encephalitis (IV).",
      "id": "Herpes zoster (cacar ular), herpes simpleks (HSV-1 & HSV-2: herpes genital/labialis), varisela (cacar air), ensefalitis HSV (IV)."
    },
    "contraindications": {
      "en": "Hypersensitivity to acyclovir or valacyclovir.",
      "id": "Hipersensitivitas terhadap asiklovir atau valasiklovir."
    },
    "dosing": {
      "dosePerKg": 10.0,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "5 times daily (PO) or q8h (IV)",
      "bolusDose": "Herpes Zoster: 800 mg PO 5 times daily (q4h while awake) x 7-10 days; HSV Genital: 200 mg PO 5x/day or 400 mg PO TID x 7-10 days; Encephalitis IV: 10 mg/kg IV q8h",
      "notes": {
        "en": "Poor oral bioavailability (15-30%), hence requiring frequent 5x/day dosing. When administering IV, infuse over at least 1 hour with adequate hydration to prevent renal tubular crystallization.",
        "id": "Bioavailabilitas oral rendah (15-30%), sehingga membutuhkan frekuensi minum 5x sehari. Infus IV wajib diberikan minimal selama 1 jam dengan hidrasi cukup untuk mencegah kristalisasi intratubular ginjal."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1.5 - 2 hours",
    "duration": "4 - 8 hours (half-life 2.5-3 hours in normal renal function)",
    "metabolism": "Partially converted to 9-carboxymethoxymethylguanine (10-15%); primarily eliminated unchanged in urine by glomerular filtration and tubular secretion (60-90%).",
    "clinicalPearls": {
      "en": "Requires viral thymidine kinase for initial monophosphorylation, ensuring high selectivity for infected cells. Must be initiated within 72 hours of herpes zoster rash onset for maximal efficacy in reducing post-herpetic neuralgia.",
      "id": "Membutuhkan enzim timidina kinase virus untuk monofosforilasi, menjadikannya sangat selektif pada sel terinfeksi. Harus dimulai dalam 72 jam pertama sejak ruam zoster muncul untuk memangkas risiko neuralgia paska herpetik (NPH)."
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
    "id": "amlodipine",
    "genericName": "Amlodipine Besylate",
    "brandNames": [
      "Norvasc",
      "Tensivask",
      "Amdixal",
      "Divask",
      "Theravask"
    ],
    "drugClass": "Dihydropyridine Calcium Channel Blocker (CCB)",
    "indications": {
      "en": "Essential hypertension, chronic stable angina, vasospastic (Prinzmetal) angina, Raynaud phenomenon.",
      "id": "Hipertensi esensial, angina pektoris stabil kronis, angina Prinzmetal (vasospastik), fenomena Raynaud."
    },
    "contraindications": {
      "en": "Severe hypotension (SBP <90 mmHg), cardiogenic shock, severe aortic stenosis, unstable angina post-MI.",
      "id": "Hipotensi berat (TDS <90 mmHg), syok kardiogenik, stenosis aorta berat, angina tidak stabil pasca-MI."
    },
    "dosing": {
      "dosePerKg": 0.08,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Once daily (q24h)",
      "bolusDose": "Adults: 5 mg PO once daily (initial 2.5 mg in elderly, small, or hepatic impairment); titrate to 10 mg/day",
      "notes": {
        "en": "Long elimination half-life (30-50 hours) allows once-daily dosing with smooth 24-hour hemodynamic profile. Missing one dose rarely causes rebound hypertension.",
        "id": "Waktu paruh panjang (30-50 jam) menghasilkan kontrol tensi 24 jam yang halus. Lupa minum 1 dosis jarang menyebabkan lonjakan tensi rebound."
      }
    },
    "onset": "6 - 12 hours (gradual)",
    "peak": "6 - 12 hours",
    "duration": "24 - 36 hours",
    "metabolism": "Extensively hepatic by CYP3A4 to inactive metabolites; renal (60%) and fecal (20-25%). Elimination half-life 30-50h.",
    "clinicalPearls": {
      "en": "Does not depress SA/AV nodal conduction. Most common adverse effect is dose-dependent dependent peripheral edema (not due to fluid retention, but precapillary arteriolar dilation). Combining with an ACEI/ARB balances capillary pressures and reduces edema by 50%.",
      "id": "Tidak menekan konduksi nodus SA/AV. Efek samping tersering adalah edema perifer dependen dosis (bukan retensi cairan, melainkan vasodilatasi prekapiler). Kombinasi dengan ACEI/ARB menyeimbangkan tekanan kapiler dan memangkas edema hingga 50%."
    },
    "highRisk": false
  },
  {
    "id": "amoxicillin_oral",
    "genericName": "Amoxicillin",
    "brandNames": [
      "Amoxil",
      "Kalmoxillin",
      "Yusimox",
      "Amobiotic",
      "Hiconcil"
    ],
    "drugClass": "Aminopenicillin Antibiotic (Oral)",
    "indications": {
      "en": "Acute otitis media, streptococcal pharyngitis, community-acquired pneumonia (outpatient high-dose), acute bacterial rhinosinusitis, H. pylori eradication regimen, dental prophylaxis.",
      "id": "Otitis media akut, faringitis streptokokus, pneumonia komunitas rawat jalan, sinusitis bakterial, eradikasi H. pylori, profilaksis endokarditis dental."
    },
    "contraindications": {
      "en": "Severe immediate hypersensitivity (anaphylaxis) to penicillins or beta-lactams.",
      "id": "Hipersensitivitas anafilaksis berat terhadap penisilin atau antibiotik beta-laktam."
    },
    "dosing": {
      "dosePerKg": 25.0,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q8h or q12h",
      "bolusDose": "Adults: 500 mg PO q8h or 875 mg PO q12h (High-dose pneumonia: 1000 mg PO TID); Pediatric: 45 - 90 mg/kg/day PO divided q8-12h",
      "notes": {
        "en": "High oral bioavailability (~75-90%) unaffected by food. High-dose (90 mg/kg/day) required to overcome penicillin-intermediate Streptococcus pneumoniae.",
        "id": "Bioavailabilitas oral tinggi (~75-90%) tidak terpengaruh makanan. Dosis tinggi (90 mg/kg/hari) diperlukan untuk mengatasi S. pneumoniae resisten sedang."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "6 - 8 hours",
    "metabolism": "Minimal hepatic metabolism (~10-25%); primarily excreted unchanged via renal glomerular filtration and tubular secretion (60-80%).",
    "clinicalPearls": {
      "en": "Causes widespread non-allergic maculopapular rash (90%) in patients with acute Epstein-Barr Virus (Infectious Mononucleosis); do not confuse with true penicillin allergy. Adjust dose in renal impairment (eGFR <30 mL/min).",
      "id": "Menyebabkan ruam makulopapular non-alergi (90%) jika diberikan pada pasien Mononukleosis Infeksiosa (EBV); jangan disalahartikan sebagai alergi penisilin sejati. Sesuaikan dosis jika eGFR <30 mL/menit."
    },
    "highRisk": false
  },
  {
    "id": "amoxicillin_clavulanate",
    "genericName": "Amoxicillin + Clavulanic Acid (Co-Amoxiclav)",
    "brandNames": [
      "Augmentin",
      "Clavamox",
      "Claneksi",
      "Amiclav",
      "Curam"
    ],
    "drugClass": "Beta-Lactam + Beta-Lactamase Inhibitor Combination",
    "indications": {
      "en": "Human and animal bite wounds, acute bacterial sinusitis, acute exacerbation of chronic bronchitis, uncomplicated community-acquired pneumonia, complicated odontogenic infections, pediatric otitis media.",
      "id": "Luka gigitan hewan/manusia, sinusitis bakterial akut, PPOK eksaserbasi akut, pneumonia komunitas, infeksi odontogenik berat, otitis media anak."
    },
    "contraindications": {
      "en": "History of amoxicillin-clavulanate-associated cholestatic jaundice or hepatic dysfunction, severe penicillin allergy.",
      "id": "Riwayat ikterus kolestatik atau disfungsi hepar akibat amoksisilin-klavulanat, alergi berat penisilin."
    },
    "dosing": {
      "dosePerKg": 25.0,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q8h or q12h with meals",
      "bolusDose": "Adults: 625 mg (500/125) PO TID or 1000 mg (875/125) PO BID; Severe / Bites: 1000 mg BID or 1.2 g IV q8h",
      "notes": {
        "en": "Always take with food to minimize nausea and diarrhea caused by clavulanic acid. Formulations with 7:1 or 14:1 amox:clav ratio cause less diarrhea than 4:1.",
        "id": "Wajib diminum bersama awal makanan untuk mengurangi efek mual dan diare akibat asam klavulanat. Rasio amoksisilin:klavulanat 7:1 lebih ramah saluran cerna."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "8 - 12 hours",
    "metabolism": "Clavulanic acid extensively metabolized hepatically; amoxicillin excreted largely unchanged in urine.",
    "clinicalPearls": {
      "en": "First-line empirical oral therapy for mammalian bite wounds (covers Pasteurella multocida, Eikenella corrodens, oral anaerobes, and MSSA). Clavulanate component is a recognized cause of drug-induced cholestatic liver injury, especially in older men.",
      "id": "Terapi oral lini pertama untuk luka gigitan hewan/manusia (mencakup Pasteurella, Eikenella, dan kuman anaerob). Asam klavulanat dapat memicu ikterus kolestatik pada pria usia lanjut."
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
    "id": "apixaban",
    "genericName": "Apixaban",
    "brandNames": [
      "Eliquis"
    ],
    "drugClass": "Direct Oral Factor Xa Inhibitor (DOAC)",
    "indications": {
      "en": "Stroke prevention in non-valvular AF (ARISTOTLE trial), treatment of DVT/PE (AMPLIFY trial), DVT prophylaxis in hip/knee arthroplasty.",
      "id": "Pencegahan stroke pada fibrilasi atrium non-valvular (ARISTOTLE trial), terapi DVT/PE (AMPLIFY), profilaksis DVT ortopedi."
    },
    "contraindications": {
      "en": "Active pathological bleeding, severe hepatic impairment (Child-Pugh C), mechanical prosthetic heart valves.",
      "id": "Perdarahan aktif, sirosis hepar berat (Child-Pugh C), katup jantung prostetik mekanik."
    },
    "dosing": {
      "dosePerKg": 0.07,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "BID (twice daily)",
      "bolusDose": "NVAF: 5 mg PO BID (reduce to 2.5 mg BID if >=2 of: age >=80y, weight <=60kg, serum Cr >=1.5 mg/dL); Acute DVT/PE: 10 mg PO BID x 7 days, then 5 mg BID",
      "notes": {
        "en": "Lowest renal excretion among DOACs (~27%). Food does not affect absorption.",
        "id": "Eliminasi ginjal terendah di antara golongan DOAC (~27%). Makanan tidak mempengaruhi absorpsi."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "3 - 4 hours",
    "duration": "12 hours (terminal half-life ~12 hours)",
    "metabolism": "Hepatic CYP3A4/5-mediated O-demethylation and sulfation (~25%); renal excretion ~27%; biliary/fecal excretion ~50%.",
    "clinicalPearls": {
      "en": "Demonstrated superior reduction in stroke/systemic embolism AND superior reduction in major bleeding compared to warfarin in ARISTOTLE trial. Safest DOAC in mild-to-moderate chronic kidney disease and elderly due to low renal clearance. Specific antidote: Andexanet alfa.",
      "id": "Terbukti unggul menurunkan stroke dan sekaligus unggul menurunkan risiko perdarahan mayor dibanding warfarin (uji ARISTOTLE). DOAC paling aman pada lansia dan gangguan ginjal ringan-sedang. Antidotum: Andeksanet alfa."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Premature Discontinuation Increases Risk of Thrombotic Events; Spinal/Epidural Hematoma Risk.",
      "id": "Penghentian Prematur Meningkatkan Risiko Kejadian Trombotik; Risiko Hematoma Spinal/Epidural."
    }
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
    "id": "aspirin_cardio",
    "genericName": "Aspirin (Cardioprotective / Antiplatelet)",
    "brandNames": [
      "Aspilets",
      "Cardioaspirin",
      "Thrombo Aspilets",
      "Ascardia",
      "Bayer Low-Dose"
    ],
    "drugClass": "Antiplatelet / Irreversible COX-1 Inhibitor",
    "indications": {
      "en": "Acute coronary syndrome (loading dose), secondary prevention of ischemic heart disease, ischemic stroke/TIA, coronary stent maintenance (DAPT).",
      "id": "Sindrom koroner akut (loading dose), pencegahan sekunder PJK, stroke iskemik/TIA, pasca stent koroner (DAPT)."
    },
    "contraindications": {
      "en": "Active GI bleeding / peptic ulcer, severe bleeding diathesis, aspirin-induced asthma / triad (Samter triad), children <16y with viral infection (Reye syndrome).",
      "id": "Perdarahan GI aktif, diatesis perdarahan berat, asma induksi aspirin (trias Samter), anak <16 tahun infeksi virus (sindrom Reye)."
    },
    "dosing": {
      "dosePerKg": 1.2,
      "unit": "mg",
      "maxDose": 325,
      "frequency": "Once daily with food (loading chewed in ACS)",
      "bolusDose": "ACS Loading: 160 - 325 mg PO chewed immediately (non-enteric coated); Daily Maintenance: 75 - 100 mg PO once daily",
      "notes": {
        "en": "In acute STEMI/NSTEMI, must be chewed for rapid buccal/gastric absorption. Irreversibly acetylates platelet COX-1 for the 7-10 day lifespan of the platelet.",
        "id": "Pada SKA akut harus dikunyah agar cepat diserap. Mengasetilasi COX-1 trombosit secara ireversibel selama masa hidup trombosit (7-10 hari)."
      }
    },
    "onset": "Chewed: 15 - 30 minutes; Swallowed enteric: 1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "7 - 10 days (lifetime of the platelet)",
    "metabolism": "Rapidly hydrolyzed in plasma and liver to salicylate (half-life 15-20 min); salicylate metabolized by hepatic conjugation and renal clearance.",
    "clinicalPearls": {
      "en": "Irreversible inhibition of thromboxane A2 (TXA2). Hold 5-7 days before elective surgeries with high bleeding risk, but CONTINUE for cardiac surgeries and high-risk secondary prevention where ischemic risk outweighs bleeding.",
      "id": "Hambatan ireversibel terhadap tromboksan A2. Tunda 5-7 hari sebelum bedah elektif risiko tinggi perdarahan, namun DIPERTAHANKAN pada bedah bypass jantung (CABG) dan risiko iskemik tinggi."
    },
    "highRisk": true
  },
  {
    "id": "atorvastatin",
    "genericName": "Atorvastatin Calcium",
    "brandNames": [
      "Lipitor",
      "Truvaz",
      "Atofar",
      "Stator"
    ],
    "drugClass": "HMG-CoA Reductase Inhibitor (High-Intensity Statin)",
    "indications": {
      "en": "Primary and secondary prevention of cardiovascular events, acute coronary syndrome (early high-intensity statin), hypercholesterolemia, familial hypercholesterolemia.",
      "id": "Pencegahan primer & sekunder kejadian kardiovaskular, sindrom koroner akut (statin intensitas tinggi dini), hiperkolesterolemia."
    },
    "contraindications": {
      "en": "Active acute liver disease, unexplained persistent elevations of hepatic transaminases, pregnancy (teratogenic), breastfeeding.",
      "id": "Penyakit hati akut aktif, peningkatan transaminase persisten, kehamilan (teratogenik), menyusui."
    },
    "dosing": {
      "dosePerKg": 0.3,
      "unit": "mg",
      "maxDose": 80,
      "frequency": "Once daily (any time of day)",
      "bolusDose": "ACS / Secondary Prevention (High-intensity): 40 - 80 mg PO once daily; Moderate-intensity: 10 - 20 mg PO once daily",
      "notes": {
        "en": "Long terminal half-life (14h, with active metabolites 20-30h) allows dosing at any time of day, unlike simvastatin which requires evening administration.",
        "id": "Waktu paruh panjang (14 jam, metabolit aktif 20-30 jam) memungkinkan diminum kapan saja (tidak harus malam hari)."
      }
    },
    "onset": "1 - 2 weeks for LDL reduction, peak effect 4 weeks",
    "peak": "1 - 2 hours",
    "duration": "24 - 48 hours (active metabolites inhibit HMG-CoA reductase for 20-30h)",
    "metabolism": "Extensively hepatic by CYP3A4 to ortho- and parahydroxylated active metabolites. Biliary/fecal elimination (>98%).",
    "clinicalPearls": {
      "en": "Cornerstone of post-ACS therapy (PROVE-IT TIMI 22 trial: 80 mg daily reduces mortality). Pleiotropic effects include plaque stabilization and anti-inflammatory properties (lowers hs-CRP). Grapefruit juice increases serum concentrations via CYP3A4 inhibition.",
      "id": "Fondasi terapi pasca-SKA (PROVE-IT TIMI 22 trial: 80 mg/hari memangkas mortalitas). Memiliki efek pleiotropik stabilisasi plak ateroma. Grapefruit juice meningkatkan kadar obat via hambatan CYP3A4."
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
    "id": "azithromycin",
    "genericName": "Azithromycin",
    "brandNames": [
      "Zithromax",
      "Zicho",
      "Zycin",
      "Aztrin",
      "Mezatrin"
    ],
    "drugClass": "Azalide Macrolide Antibiotic (50S Ribosomal Inhibitor)",
    "indications": {
      "en": "Community-acquired pneumonia (atypical pathogens: Mycoplasma, Chlamydia, Legionella), acute bacterial sinusitis, pertussis, chlamydial urethritis/cervicitis, traveler's diarrhea.",
      "id": "Pneumonia komunitas (patogen atipik: Mycoplasma, Legionella), sinusitis bakterial, pertusis, uretritis Chlamydia, diare traveler."
    },
    "contraindications": {
      "en": "History of cholestatic jaundice or hepatic dysfunction with prior azithromycin, hypersensitivity to macrolides.",
      "id": "Riwayat ikterus kolestatik akibat azitromisin, hipersensitivitas terhadap golongan makrolida."
    },
    "dosing": {
      "dosePerKg": 10.0,
      "unit": "mg",
      "maxDose": 500,
      "frequency": "Once daily (q24h)",
      "bolusDose": "CAP: 500 mg PO on Day 1, followed by 250 mg PO once daily on Days 2-5 (or 500 mg daily x 3 days); Chlamydia: 1000 mg PO single dose stat",
      "notes": {
        "en": "Massive intracellular and tissue accumulation (tissue concentrations 10-50x higher than plasma). Long tissue half-life (~68 hours) allows 3-to-5-day short course therapy.",
        "id": "Akumulasi intraseluler dan jaringan sangat masif (kadar jaringan 10-50x lebih tinggi dibanding plasma). Waktu paruh jaringan panjang (~68 jam) memungkinkan terapi singkat 3-5 hari."
      }
    },
    "onset": "2 - 3 hours",
    "peak": "2 - 4 hours",
    "duration": "24+ hours (terminal tissue elimination half-life 68 hours)",
    "metabolism": "Hepatic demethylation and conjugation (minimal); excreted primarily unchanged in bile/feces (>80%); only 6-12% excreted in urine.",
    "clinicalPearls": {
      "en": "Lacks the potent CYP3A4 inhibition seen with erythromycin and clarithromycin, resulting in vastly fewer drug interactions. Post-antibiotic effect of 48-72h. Can cause QT prolongation and torsades de pointes; use caution in patients with baseline long QTc or electrolyte abnormalities.",
      "id": "Tidak menghambat CYP3A4 secara agresif seperti eritromisin/klaritromisin sehingga minim interaksi obat. Efek pasca-antibiotik 48-72 jam. Waspadai perpanjangan interval QTc dan aritmia torsades de pointes."
    },
    "highRisk": false
  },
  {
    "id": "bisoprolol",
    "genericName": "Bisoprolol Fumarate",
    "brandNames": [
      "Concor",
      "Maintate",
      "B-Beta",
      "Bisovell",
      "Lodoz"
    ],
    "drugClass": "Cardioselective Beta-1 Blocker",
    "indications": {
      "en": "Hypertension, chronic heart failure with reduced ejection fraction (CIBIS-II trial), stable angina pectoris, post-MI rate control.",
      "id": "Hipertensi, gagal jantung kronis HFrEF (uji CIBIS-II), angina pektoris stabil, kontrol laju pasca infark miokard."
    },
    "contraindications": {
      "en": "Acute decompensated heart failure, cardiogenic shock, 2nd or 3rd degree AV block without pacemaker, sick sinus syndrome, severe sinus bradycardia (<50 bpm), severe asthma.",
      "id": "Gagal jantung dekompensasi akut, syok kardiogenik, blok AV derajat 2 atau 3 tanpa pacu jantung, sinus bradikardia berat (<50 bpm), asma berat."
    },
    "dosing": {
      "dosePerKg": 0.08,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Once daily (q24h)",
      "bolusDose": "HTN/Angina: 5 mg PO once daily (titrate to 10-20 mg); HFrEF: start 1.25 mg once daily, titrate bi-weekly to target 10 mg/day",
      "notes": {
        "en": "Highly beta-1 selective (beta-1 to beta-2 ratio ~120:1). Balanced 50% hepatic clearance and 50% renal elimination.",
        "id": "Sangat selektif beta-1 (rasio beta-1 banding beta-2 ~120:1). Klirens seimbang: 50% hepar dan 50% ginjal."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "2 - 4 hours",
    "duration": "24 hours",
    "metabolism": "Balanced 50/50 clearance: 50% metabolized by liver (CYP3A4/CYP2D6), 50% excreted unchanged in urine. Half-life 10-12 hours.",
    "clinicalPearls": {
      "en": "Highest beta-1 selectivity among common beta-blockers, significantly safer in COPD/mild asthma than atenolol or metoprolol. Balanced dual elimination means no dose adjustment needed in mild-to-moderate single organ failure.",
      "id": "Selektivitas beta-1 tertinggi, jauh lebih aman pada pasien PPOK/asma ringan dibanding propranolol atau metoprolol. Eliminasi seimbang 50/50 hepar/ginjal meminimalkan akumulasi."
    },
    "highRisk": true
  },
  {
    "id": "budesonide_inhaler",
    "genericName": "Budesonide (Inhalation / Nebulizer)",
    "brandNames": [
      "Pulmicort",
      "Obucort",
      "Symbicort",
      "Budesma"
    ],
    "drugClass": "Inhaled Corticosteroid (ICS)",
    "indications": {
      "en": "Maintenance treatment of persistent asthma, acute croup (laryngotracheobronchitis in children), COPD maintenance, post-extubation laryngeal edema prophylaxis.",
      "id": "Pemeliharaan asma persisten, croup akut pada anak (laringotrakeobronkitis), PPOK stabil, profilaksis edema laring pasca-ekstubasi."
    },
    "contraindications": {
      "en": "Primary treatment of status asthmaticus or acute bronchospasm episodes requiring rapid bronchodilation.",
      "id": "Bukan terapi tunggal penyelamat pada status asmatikus akut yang membutuhkan bronkodilatasi cepat."
    },
    "dosing": {
      "dosePerKg": 0.02,
      "unit": "mg",
      "maxDose": 2,
      "frequency": "BID (q12h)",
      "bolusDose": "Asthma Maintenance: 200 - 800 mcg inhaled BID (max 1600 mcg/day); Pediatric Croup: 2 mg nebulized single dose stat; Post-extubation Stridor: 1 - 2 mg neb",
      "notes": {
        "en": "Rinse mouth with water and spit out after inhalation to prevent oral candidiasis (thrush) and dysphonia.",
        "id": "Kumur mulut dengan air dan buang setelah menghirup untuk mencegah sariawan jamur (kandidiasis oral) dan suara serak."
      }
    },
    "onset": "Nebulized croup: 1 - 2 hours; Asthma control: 24 hours to 2 weeks",
    "peak": "1 - 2 weeks for peak anti-inflammatory effect",
    "duration": "12 - 24 hours",
    "metabolism": "High first-pass hepatic metabolism (90%) via CYP3A4 to inactive metabolites; minimizes systemic corticosteroid side effects.",
    "clinicalPearls": {
      "en": "Cornerstone of modern asthma management (GINA guidelines recommend ICS-containing controller for all adults). In pediatric croup, a single 2 mg nebulized dose is as effective as oral dexamethasone in resolving stridor.",
      "id": "Fondasi tata laksana asma modern (panduan GINA mewajibkan pengendali berbasis steroid inhalasi). Pada croup anak, 2 mg nebulisasi sama ampuhnya dengan deksametason oral dalam meredakan stridor."
    },
    "highRisk": false
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
    "id": "candesartan",
    "genericName": "Candesartan Cilexetil",
    "brandNames": [
      "Atacand",
      "Canderin",
      "Blopress",
      "Candepress"
    ],
    "drugClass": "Angiotensin II Receptor Blocker (ARB)",
    "indications": {
      "en": "Hypertension, heart failure (NYHA II-IV, LVEF <=40% to reduce CV death and hospitalizations - CHARM program), migraine prophylaxis.",
      "id": "Hipertensi, gagal jantung (NYHA II-IV, LVEF <=40% - program CHARM), profilaksis migrain kronis."
    },
    "contraindications": {
      "en": "Pregnancy, severe hepatic impairment, cholestasis, bilateral renal artery stenosis.",
      "id": "Kehamilan, gangguan hepar berat, kolestasis, stenosis arteri renalis bilateral."
    },
    "dosing": {
      "dosePerKg": 0.2,
      "unit": "mg",
      "maxDose": 32,
      "frequency": "Once daily (q24h)",
      "bolusDose": "HTN: 8 - 16 mg PO once daily (max 32 mg/day); Heart failure: 4 mg once daily, double at 2-week intervals to target 32 mg/day",
      "notes": {
        "en": "Prodrug converted during GI absorption into candesartan. Highest receptor affinity (AT1) among ARBs.",
        "id": "Prodrug yang dikonversi saat absorpsi GI menjadi candesartan. Memiliki afinitas reseptor AT1 tertinggi di antara golongan ARB."
      }
    },
    "onset": "2 - 3 hours",
    "peak": "3 - 4 hours",
    "duration": "24+ hours (insurmountable AT1 binding)",
    "metabolism": "Gastrointestinal ester hydrolysis during absorption; minor hepatic CYP2C9; renal (33%) and biliary (67%) excretion.",
    "clinicalPearls": {
      "en": "Slowest dissociation from AT1 receptors gives prolonged 24h smooth blood pressure control. Evidence-based second-line migraine prophylaxis agent.",
      "id": "Disosiasi paling lambat dari reseptor AT1 memberikan kontrol tensi 24 jam sangat stabil. Terbukti efektif sebagai profilaksis migrain lini kedua."
    },
    "highRisk": false
  },
  {
    "id": "captopril",
    "genericName": "Captopril",
    "brandNames": [
      "Capoten",
      "Tensobon",
      "Otoryl",
      "Farmoten"
    ],
    "drugClass": "ACE Inhibitor (Short-Acting)",
    "indications": {
      "en": "Hypertensive urgency (sublingual/oral), hypertension, congestive heart failure, post-myocardial infarction.",
      "id": "Urgensi hipertensi (sublingual/oral), hipertensi, gagal jantung kongestif, pasca infark miokard."
    },
    "contraindications": {
      "en": "Pregnancy (all trimesters - teratogenic), bilateral renal artery stenosis, history of ACEI-induced angioedema, concurrent sacubitril.",
      "id": "Kehamilan (teratogenik), stenosis arteri renalis bilateral, riwayat angioedema akibat ACEI, penggunaan bersama sakubitril."
    },
    "dosing": {
      "dosePerKg": 0.3,
      "unit": "mg",
      "maxDose": 50,
      "frequency": "q8h (1h before meals)",
      "bolusDose": "Hypertensive urgency: 12.5 - 25 mg PO/SL stat; Chronic HTN: 12.5 - 25 mg PO BID-TID (max 150 mg/day)",
      "notes": {
        "en": "Take 1 hour before meals (food decreases absorption by 30-40%). Check serum potassium and creatinine within 1-2 weeks.",
        "id": "Minum 1 jam sebelum makan (makanan menurunkan absorpsi 30-40%). Pantau kalium serum dan kreatinin dalam 1-2 minggu."
      }
    },
    "onset": "15 - 30 minutes (faster SL)",
    "peak": "60 - 90 minutes",
    "duration": "6 - 12 hours",
    "metabolism": "Hepatic oxidation and disulfide dimerization; ~50% excreted unchanged in urine.",
    "clinicalPearls": {
      "en": "Gold standard for bedside hypertensive urgency due to rapid oral/sublingual onset. Dry cough occurs in 5-20% due to bradykinin accumulation. Hold 24h prior to elective surgery to prevent refractory post-induction hypotension.",
      "id": "Pilihan utama urgensi hipertensi bedside karena onset oral/sublingual cepat. Batuk kering terjadi pada 5-20% akibat akumulasi bradikinin. Hentikan 24 jam sebelum anestesi elektif untuk mencegah hipotensi refrakter pasca induksi."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Fetal Toxicity: Can cause fetal harm and death when administered to pregnant women. Discontinue immediately upon pregnancy detection.",
      "id": "Toksisitas Fetal: Menyebabkan cedera dan kematian janin. Hentikan segera jika kehamilan terdeteksi."
    }
  },
  {
    "id": "carbamazepine",
    "genericName": "Carbamazepine",
    "brandNames": [
      "Tegretol",
      "Bamgetol",
      "Teril"
    ],
    "drugClass": "Iminostilbene Anticonvulsant (Sodium Channel Blocker)",
    "indications": {
      "en": "Trigeminal neuralgia (first-line drug of choice), focal seizures with or without secondary generalization, acute bipolar mania.",
      "id": "Neuralgia trigeminal (obat pilihan utama lini pertama), kejang fokal epileptik, episode mania bipolar akut."
    },
    "contraindications": {
      "en": "Bone marrow depression, concurrent or recent (within 14 days) MAO inhibitors, AV block, porphyria.",
      "id": "Depresi sumsum tulang, penggunaan MAOI dalam 14 hari, blok AV, porfiria."
    },
    "dosing": {
      "dosePerKg": 5.0,
      "unit": "mg",
      "maxDose": 1200,
      "frequency": "BID or TID with meals",
      "bolusDose": "Trigeminal Neuralgia: Start 100 mg PO BID, increase by 100 mg q12h until pain relief (usual 200 mg TID-QID, max 1200 mg/day); Epilepsy: Start 200 mg BID, titrate to 800-1200 mg/day",
      "notes": {
        "en": "Therapeutic serum level: 4 - 12 mcg/mL. Exhibits auto-induction of its own metabolism (induces CYP3A4, shortening its own half-life from 36 hours initially down to 12-15 hours after 2-4 weeks).",
        "id": "Kadar terapeutik darah: 4 - 12 mcg/mL. Mengalami 'auto-induksi' metabolisme sendiri (menginduksi CYP3A4 sehingga waktu paruhnya memendek dari 36 jam menjadi 12 jam setelah 2-4 minggu pemakaian)."
      }
    },
    "onset": "Slow oral absorption (several hours to days for neuralgic pain relief)",
    "peak": "4 - 8 hours",
    "duration": "12 - 24 hours",
    "metabolism": "Extensively hepatic via CYP3A4 to active 10,11-epoxide metabolite (anticonvulsant activity); excreted in urine (72%) and feces (28%).",
    "clinicalPearls": {
      "en": "Unrivaled gold standard for Trigeminal Neuralgia ('tic douloureux'). Strong association with Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN) in patients of Asian descent carrying the HLA-B*1502 allele (mandatory genetic screening prior to initiation). Causes SIADH with severe hyponatremia and aplastic anemia.",
      "id": "Standar emas nomor satu Neuralgia Trigeminal. Berisiko fatal memicu Sindrom Stevens-Johnson (SJS) pada etnis Asia pembawa alel HLA-B*1502. Sering memicu SIADH dengan hiponatremia berat serta anemia aplastik."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Serious Dermatologic Reactions and HLA-B*1502 Allele; Aplastic Anemia and Agranulocytosis.",
      "id": "Reaksi Kulit Berat (SJS/TEN) Terkait Alel HLA-B*1502; Anemia Aplastik dan Agranulositosis."
    }
  },
  {
    "id": "carvedilol",
    "genericName": "Carvedilol",
    "brandNames": [
      "Dilatrend",
      "Coreg",
      "V-Bloc",
      "Blotadyl"
    ],
    "drugClass": "Non-Selective Beta + Alpha-1 Blocker",
    "indications": {
      "en": "Heart failure with reduced ejection fraction (COPERNICUS, US Carvedilol trials), left ventricular dysfunction post-MI (CAPRICORN), hypertension.",
      "id": "Gagal jantung HFrEF (uji COPERNICUS), disfungsi ventrikel kiri pasca-MI (CAPRICORN), hipertensi esensial."
    },
    "contraindications": {
      "en": "Severe decompensated heart failure requiring IV inotropes, bronchial asthma/bronchospasm, severe bradycardia, 2nd/3rd degree AV block, severe hepatic impairment.",
      "id": "Gagal jantung dekompensasi berat butuh inotropik IV, asma bronkial/bronkospasme, bradikardia berat, blok AV derajat 2/3, gangguan hepar berat."
    },
    "dosing": {
      "dosePerKg": 0.35,
      "unit": "mg",
      "maxDose": 50,
      "frequency": "BID with meals",
      "bolusDose": "HFrEF: 3.125 mg PO BID, double every 2 weeks to target 25 mg BID (<85 kg) or 50 mg BID (>85 kg); HTN: 6.25 mg BID up to 25 mg BID",
      "notes": {
        "en": "Must be taken with food to slow absorption rate and reduce the incidence of orthostatic hypotension.",
        "id": "Wajib diminum bersama makanan untuk memperlambat laju absorpsi dan mencegah hipotensi ortostatik."
      }
    },
    "onset": "1 hour",
    "peak": "1 - 2 hours",
    "duration": "12 hours (terminal half-life 7-10h)",
    "metabolism": "Extensively hepatic by CYP2D6 and CYP2C9; stereoselective; excreted in bile/feces (>98%).",
    "clinicalPearls": {
      "en": "Dual alpha-1 vasodilating and non-selective beta-blocking action reduces afterload without reflex tachycardia. Strong antioxidant properties. Superior mortality reduction in severe heart failure.",
      "id": "Kombinasi blokade alfa-1 (vasodilatasi) dan beta non-selektif menurunkan afterload tanpa takikardia refleks. Memiliki sifat antioksidan kuat. Menurunkan mortalitas gagal jantung berat."
    },
    "highRisk": true
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
    "id": "cefixime",
    "genericName": "Cefixime",
    "brandNames": [
      "Cefspan",
      "Spancef",
      "Ceptik",
      "Fixacep",
      "Suprax"
    ],
    "drugClass": "Third-Generation Oral Cephalosporin",
    "indications": {
      "en": "Uncomplicated urinary tract infections (pyelonephritis step-down), uncomplicated gonococcal urethritis/cervicitis, acute otitis media, bacterial exacerbation of chronic bronchitis, enteric fever / typhoid step-down.",
      "id": "Infeksi saluran kemih (step-down pielonefritis), gonore tanpa komplikasi, otitis media akut, demam tifoid step-down."
    },
    "contraindications": {
      "en": "Severe immediate anaphylaxis to cephalosporins.",
      "id": "Riwayat anafilaksis berat terhadap antibiotik sefalosporin."
    },
    "dosing": {
      "dosePerKg": 8.0,
      "unit": "mg",
      "maxDose": 400,
      "frequency": "Once daily or divided BID",
      "bolusDose": "Adults: 200 - 400 mg PO once daily (or 200 mg BID); Gonorrhea: 800 mg PO single stat dose (plus azithromycin/doxycycline); Pediatric: 8 mg/kg/day PO divided q12-24h",
      "notes": {
        "en": "Oral bioavailability ~40-50%. Oral suspension produces significantly higher peak blood levels than tablets for pediatric otitis media.",
        "id": "Bioavailabilitas oral ~40-50%. Suspensi oral menghasilkan kadar puncak darah lebih tinggi dibanding tablet."
      }
    },
    "onset": "2 - 4 hours",
    "peak": "3 - 4 hours (tablet), 2 - 3 hours (suspension)",
    "duration": "24 hours",
    "metabolism": "Predominantly excreted unchanged in urine (~50%) by glomerular filtration; ~10% excreted in bile.",
    "clinicalPearls": {
      "en": "Potent activity against Gram-negative bacilli (E. coli, Klebsiella, Proteus, Salmonella). Zero activity against Pseudomonas aeruginosa, Enterococcus, or Staphylococcus aureus. Excellent oral step-down for urosepsis.",
      "id": "Sangat paten terhadap bakteri Gram-negatif (E. coli, Klebsiella, Salmonella). TIDAK MEMILIKI aktivitas terhadap Pseudomonas atau Stafilokokus. Pilihan utama rawat jalan urosepsis."
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
    "id": "ceftriaxone_extended",
    "genericName": "Ceftriaxone Sodium (IV / IM)",
    "brandNames": [
      "Rocephin",
      "Broadced",
      "Cefaxon",
      "Terbac",
      "Ceftrex"
    ],
    "drugClass": "Third-Generation Broad-Spectrum Cephalosporin",
    "indications": {
      "en": "Bacterial meningitis, severe community-acquired pneumonia, sepsis, pyelonephritis, intra-abdominal infections, disseminated gonorrhea, infective endocarditis, Lyme disease.",
      "id": "Meningitis bakterial, pneumonia komunitas berat, sepsis, pielonefritis akut, infeksi intra-abdomen, gonore diseminata, endokarditis infektif."
    },
    "contraindications": {
      "en": "Hyperbilirubinemic neonates (displaces bilirubin from albumin causing kernicterus), concurrent IV calcium in neonates <=28 days (fatal calcium-ceftriaxone precipitate in lungs and kidneys).",
      "id": "Neonatus hiperbilirubinemia (memicu kernikterus), pemberian bersama kalsium IV pada neonatus <=28 hari (presipitasi kristal kalsium fatal di paru dan ginjal)."
    },
    "dosing": {
      "dosePerKg": 50.0,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "q12h or q24h IV/IM",
      "bolusDose": "Standard Severe Infection: 1 - 2 g IV q24h; Bacterial Meningitis: 2 g IV q12h; Gonorrhea: 500 mg IM single dose; Pediatric: 50 - 100 mg/kg/day divided q12-24h",
      "notes": {
        "en": "Dual biliary (40%) and renal (60%) excretion; no dose adjustment needed in isolated renal impairment unless accompanied by hepatic failure.",
        "id": "Eliminasi ganda bilier (40%) dan ginjal (60%); tidak memerlukan penyesuaian dosis pada gangguan ginjal terisolasi."
      }
    },
    "onset": "IV: immediate; IM: 1 - 2 hours",
    "peak": "End of infusion (IV); 1 - 3 hours (IM)",
    "duration": "24 hours (elimination half-life ~8 hours)",
    "metabolism": "Not metabolized; excreted unchanged via bile into feces (33-67%) and urine (33-67%).",
    "clinicalPearls": {
      "en": "Workhorse hospital antibiotic. Exceptional CSF penetration (crosses inflamed blood-brain barrier). Long half-life permits once-daily outpatient parenteral antimicrobial therapy (OPAT). Causes biliary sludging / pseudolithiasis on ultrasound with prolonged high-dose use (reversible).",
      "id": "Antibiotik andalan rumah sakit. Penetrasi sawar darah otak (CSS) sangat tinggi. Waktu paruh panjang memungkinkan dosis 1x sehari. Penggunaan lama dapat memicu 'sludge' empedu / pseudolitiasis pada USG abdomen (reversibel)."
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
    "id": "celecoxib",
    "genericName": "Celecoxib",
    "brandNames": [
      "Celebrex",
      "Celebrex Pfizer",
      "Novex",
      "Celexal"
    ],
    "drugClass": "Selective COX-2 Inhibitor NSAID",
    "indications": {
      "en": "Multimodal postoperative analgesia, osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, acute pain, primary dysmenorrhea.",
      "id": "Analgesia multimodal pasca bedah, osteoartritis, artritis reumatoid, nyeri akut, dismenore primer."
    },
    "contraindications": {
      "en": "Coronary artery bypass graft (CABG) surgery perioperative period, severe sulfonamide allergy, active GI ulcer/bleeding, severe renal/hepatic impairment.",
      "id": "Periode perioperatif bedah bypass jantung (CABG), alergi berat sulfonamid, tukak lambung aktif, gagal ginjal/hepar berat."
    },
    "dosing": {
      "dosePerKg": 3.0,
      "unit": "mg",
      "maxDose": 400,
      "frequency": "Once daily or BID",
      "bolusDose": "Preop Preemptive Analgesia: 200 - 400 mg PO single dose 1h preop; Acute Pain / Postop: 400 mg initial PO, then 200 mg BID PRN",
      "notes": {
        "en": "Does NOT impair platelet aggregation (no COX-1 inhibition); safe to administer immediately pre- and postoperatively without increasing surgical bleeding risk.",
        "id": "TIDAK mengganggu agregasi trombosit (tidak menghambat COX-1); sangat aman diberikan sebelum dan sesudah operasi tanpa menambah risiko perdarahan."
      }
    },
    "onset": "45 - 60 minutes",
    "peak": "2 - 3 hours",
    "duration": "12 - 24 hours (elimination half-life ~11 hours)",
    "metabolism": "Hepatic primarily via CYP2C9 to inactive metabolites; excreted in feces (57%) and urine (27%).",
    "clinicalPearls": {
      "en": "Gold standard oral NSAID for ERAS (Enhanced Recovery After Surgery) protocols due to gastroprotective profile (50% less GI ulceration than non-selective NSAIDs) and zero antiplatelet effect. Still carries class renal toxicity (constricts afferent arterioles).",
      "id": "Pilihan utama protokol ERAS (Enhanced Recovery After Surgery) karena ramah lambung dan bebas risiko perdarahan trombosit. Tetap memiliki toksisitas ginjal khas NSAID (konstriksi arteriol aferen)."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Cardiovascular and Gastrointestinal Risk: Increased risk of serious cardiovascular thrombotic events (MI and stroke); risk of serious GI bleeding/ulceration.",
      "id": "Risiko Kardiovaskular dan Gastrointestinal: Peningkatan risiko infark miokard dan stroke; risiko perdarahan lambung."
    }
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
    "id": "cetirizine",
    "genericName": "Cetirizine Hydrochloride",
    "brandNames": [
      "Incidal-OD",
      "Ryvel",
      "Zyrtec",
      "Cerini",
      "Betarhin",
      "Tiriz"
    ],
    "drugClass": "Second-Generation H1 Antihistamine",
    "indications": {
      "en": "Allergic rhinitis, chronic urticaria, atopic dermatitis pruritus, allergic conjunctivitis, histamine-mediated drug rash.",
      "id": "Rinitis alergi, urtikaria kronis, pruritus dermatitis atopik, konjungtivitis alergi, gatal biduran alergi obat."
    },
    "contraindications": {
      "en": "Severe renal impairment (CrCl <10 mL/min or end-stage renal disease).",
      "id": "Gagal ginjal stadium akhir (CrCl <10 mL/menit)."
    },
    "dosing": {
      "dosePerKg": 0.14,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Once daily (evening)",
      "bolusDose": "Adults and Children >=6y: 10 mg PO once daily (or 5 mg BID); Children 2-5y: 2.5 - 5 mg PO once daily; Renal impairment: 5 mg daily",
      "notes": {
        "en": "Second-generation antihistamine with low blood-brain barrier penetration; substantially less sedating than diphenhydramine or chlorpheniramine, though ~10% may still experience mild somnolence.",
        "id": "Antihistamin generasi ke-2 dengan penetrasi sawar darah otak rendah; jauh lebih tidak mengantuk dibanding CTM atau difenhidramin."
      }
    },
    "onset": "20 - 60 minutes (fastest among 2nd gen)",
    "peak": "1 hour",
    "duration": "24 hours",
    "metabolism": "Minimal hepatic metabolism; primarily eliminated unchanged in urine (70%) and feces (10%). Half-life 8-10 hours.",
    "clinicalPearls": {
      "en": "Fastest onset among second-generation oral antihistamines (<30 min). Active carboxylic acid metabolite of hydroxyzine. Ideal for rapid relief of acute urticaria and allergic reactions without cognitive impairment.",
      "id": "Onset kerja tercepat di antara antihistamin generasi ke-2 (<30 menit). Merupakan metabolit aktif hidroksizin. Sangat efektif untuk gatal biduran akut tanpa mengganggu konsentrasi berkendara."
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
    "id": "ciprofloxacin_oral",
    "genericName": "Ciprofloxacin Hydrochloride",
    "brandNames": [
      "Cipro",
      "Ciflox",
      "Baquinor",
      "Ciproxin",
      "Pharflox"
    ],
    "drugClass": "Fluoroquinolone Antibiotic (DNA Gyrase / Topoisomerase IV Inhibitor)",
    "indications": {
      "en": "Complicated urinary tract infections, pyelonephritis, infectious diarrhea (shigellosis, salmonellosis, traveler's diarrhea), prostatitis, bone and joint infections, hospital-acquired pneumonia adjunct (covers Pseudomonas).",
      "id": "Infeksi saluran kemih berkomplikasi, pielonefritis, diare infeksius (Shigella, Salmonella), prostatitis, infeksi tulang & sendi, pneumonia nosokomial (antipseudomonas)."
    },
    "contraindications": {
      "en": "Concurrent administration with tizanidine, history of fluoroquinolone-induced tendinitis or tendon rupture, myasthenia gravis (exacerbates muscle weakness).",
      "id": "Penggunaan bersama tizanidin, riwayat ruptur tendon akibat kuinolon, miastenia gravis (memperberat kelemahan otot)."
    },
    "dosing": {
      "dosePerKg": 10.0,
      "unit": "mg",
      "maxDose": 750,
      "frequency": "q12h",
      "bolusDose": "Adults: 500 - 750 mg PO q12h (or 400 mg IV q8-12h); Uncomplicated UTI: 250 - 500 mg PO q12h x 3-7 days",
      "notes": {
        "en": "High bioavailability (~70-80%). Must separate by at least 2h before or 6h after divalent cations (antacids, iron, calcium, sucralfate, dairy products) which chelate and abolish absorption.",
        "id": "Bioavailabilitas tinggi (~70-80%). Pisahkan minimal 2 jam sebelum atau 6 jam setelah kation divalen (antasida, besi, kalsium, susu) yang mengikat dan mematikan absorpsinya."
      }
    },
    "onset": "1 hour",
    "peak": "1 - 2 hours",
    "duration": "12 hours",
    "metabolism": "Partially hepatic (15%) to 4 metabolites; primarily excreted unchanged in urine (40-50%) and feces (20-35%).",
    "clinicalPearls": {
      "en": "Potent oral antipseudomonal activity. Inhibitor of CYP1A2 (increases theophylline, tizanidine, clozapine levels). Carry FDA black-box warnings for tendinitis/tendon rupture (especially Achilles), peripheral neuropathy, CNS toxicities, and QT prolongation.",
      "id": "Pilihan oral utama untuk Pseudomonas aeruginosa. Menghambat CYP1A2. Memiliki peringatan kotak hitam (black-box) FDA untuk tendinitis/ruptur tendon Achilles, neuropati perifer, dan perpanjangan interval QT."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Serious Adverse Reactions: Tendinitis, tendon rupture, peripheral neuropathy, central nervous system effects, and exacerbation of myasthenia gravis.",
      "id": "Reaksi Merugikan Berat: Tendinitis, ruptur tendon Achilles, neuropati perifer, efek SSP, dan perburukan miastenia gravis."
    }
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
    "id": "clopidogrel",
    "genericName": "Clopidogrel Bisulfate",
    "brandNames": [
      "Plavix",
      "CPG",
      "Clopisan",
      "Plavigrel",
      "Artepid"
    ],
    "drugClass": "Thienopyridine P2Y12 Platelet Inhibitor (Irreversible)",
    "indications": {
      "en": "Acute coronary syndrome (STEMI/NSTEMI), PCI/stenting, recent MI, recent stroke or established peripheral arterial disease (CAPRIE trial).",
      "id": "Sindrom koroner akut (STEMI/NSTEMI), intervensi koroner perkutan (PCI/stent), pasca stroke/PAD (CAPRIE trial)."
    },
    "contraindications": {
      "en": "Active pathological bleeding (peptic ulcer or intracranial hemorrhage), severe hepatic impairment.",
      "id": "Perdarahan patologis aktif (tukak lambung atau perdarahan intrakranial), gangguan hepar berat."
    },
    "dosing": {
      "dosePerKg": 1.0,
      "unit": "mg",
      "maxDose": 600,
      "frequency": "Once daily",
      "bolusDose": "ACS / Pre-PCI Loading: 300 - 600 mg PO stat; Maintenance: 75 mg PO once daily",
      "notes": {
        "en": "Prodrug requiring two-step hepatic CYP2C19 activation. 600 mg loading dose achieves >80% platelet inhibition in 2 hours.",
        "id": "Prodrug yang membutuhkan aktivasi CYP2C19 hepar 2-tahap. Dosis muat 600 mg mencapai >80% inhibisi trombosit dalam 2 jam."
      }
    },
    "onset": "Loading 600 mg: 2 hours; 75 mg daily: 3 - 7 days to steady-state",
    "peak": "2 hours post 600 mg dose",
    "duration": "5 - 7 days (lifetime of platelet)",
    "metabolism": "85% hydrolyzed by esterases to inactive carboxylic acid; 15% metabolized by CYP2C19, CYP1A2, CYP2B6 to active thiol metabolite.",
    "clinicalPearls": {
      "en": "CYP2C19 poor metabolizers have diminished platelet inhibition and higher cardiovascular event rates. Omeprazole and esomeprazole compete for CYP2C19 and can reduce clopidogrel efficacy by 40% (prefer pantoprazole). Hold 5 days prior to elective surgery.",
      "id": "Individu dengan polimorfisme CYP2C19 memiliki respons lebih rendah. Omeprazol berkompetisi pada CYP2C19 dan dapat menurunkan aktivasi klopidogrel hingga 40% (gunakan pantoprazol). Hentikan 5 hari sebelum operasi elektif."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Diminished Antiplatelet Effect in Patients with CYP2C19 Poor Metabolizer Genotype.",
      "id": "Penurunan Efek Antiplatelet pada Pasien dengan Genotipe Poor Metabolizer CYP2C19."
    }
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
    "id": "dabigatran",
    "genericName": "Dabigatran Etexilate",
    "brandNames": [
      "Pradaxa"
    ],
    "drugClass": "Direct Oral Thrombin Inhibitor (DOAC)",
    "indications": {
      "en": "Stroke prevention in non-valvular atrial fibrillation (RE-LY trial), treatment and secondary prevention of DVT and PE, VTE prophylaxis after hip/knee replacement.",
      "id": "Pencegahan stroke pada fibrilasi atrium non-valvular (uji RE-LY), terapi dan pencegahan sekunder DVT/PE, profilaksis VTE ortopedi."
    },
    "contraindications": {
      "en": "Active pathological bleeding, mechanical prosthetic heart valves, severe renal impairment (CrCl <15-30 mL/min).",
      "id": "Perdarahan aktif, katup jantung mekanik prostetik, gagal ginjal berat (CrCl <15-30 mL/menit)."
    },
    "dosing": {
      "dosePerKg": 2.0,
      "unit": "mg",
      "maxDose": 150,
      "frequency": "BID (q12h)",
      "bolusDose": "NVAF: 150 mg PO BID (reduce to 110 mg PO BID if age >=80y, high bleeding risk, or CrCl 30-49 mL/min); DVT/PE treatment: 150 mg PO BID following 5-10 days of parenteral anticoagulation",
      "notes": {
        "en": "Capsules contain tartaric acid core for absorption; do NOT open, break, or chew capsules (opening increases bioavailability by 75% and dramatically increases bleeding risk).",
        "id": "Kapsul mengandung inti asam tartarat; DILARANG membuka, menggerus, atau mengunyah kapsul (membuka kapsul meningkatkan absorpsi 75% dan memicu perdarahan)."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "12 - 24 hours (elimination half-life 12-17 hours)",
    "metabolism": "Prodrug converted by plasma and hepatic esterases to active dabigatran; 80% eliminated unchanged by the kidneys.",
    "clinicalPearls": {
      "en": "Highest renal clearance among DOACs (80% renal); extreme caution and frequent monitoring required in renal impairment. Dyspepsia and GI burning occur in 10-15% of patients. Specific monoclonal Fab reversal antidote is available: Idarucizumab (Praxbind) 5g IV, which reverses anticoagulation within minutes.",
      "id": "Eliminasi ginjal tertinggi di antara DOAC (80% lewat ginjal); sangat sensitif terhadap penurunan CrCl. Dispepsia dan rasa perih lambung terjadi pada 10-15%. Memiliki antidotum pembalik spesifik: Idarusizumab (Praxbind) 5g IV yang menetralkan efek dalam hitungan menit."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Premature Discontinuation Increases Risk of Thrombotic Events; Spinal/Epidural Hematoma Risk.",
      "id": "Penghentian Prematur Meningkatkan Risiko Kejadian Trombotik; Risiko Hematoma Spinal/Epidural."
    }
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
    "id": "digoxin",
    "genericName": "Digoxin",
    "brandNames": [
      "Lanoxin",
      "Fargoxin",
      "Digoxin Indo Farma"
    ],
    "drugClass": "Cardiac Glycoside / Na+/K+-ATPase Inhibitor",
    "indications": {
      "en": "Rate control in atrial fibrillation / flutter with heart failure, symptomatic chronic HFrEF (DIG trial).",
      "id": "Kontrol laju pada fibrilasi atrium dengan gagal jantung, terapi simptomatik HFrEF kronis (DIG trial)."
    },
    "contraindications": {
      "en": "Ventricular fibrillation/tachycardia, Wolff-Parkinson-White syndrome with AF, hypertrophic obstructive cardiomyopathy, 2nd/3rd degree AV block.",
      "id": "Fibrilasi ventrikel/takikardia ventrikel, sindrom WPW dengan AF, kardiomiopati obstruktif hipertrofik, blok AV derajat 2/3."
    },
    "dosing": {
      "dosePerKg": 0.003,
      "unit": "mg",
      "maxDose": 0.25,
      "frequency": "Once daily (q24h)",
      "bolusDose": "Maintenance: 0.125 - 0.25 mg PO once daily (elderly/renal: 0.0625 - 0.125 mg every other day or daily); Rapid digitalization: 0.5 mg IV/PO then 0.25 mg q6h x 2",
      "notes": {
        "en": "Narrow therapeutic index (therapeutic serum level: 0.5 - 0.9 ng/mL for HF, 0.8 - 2.0 ng/mL for AF). Hypokalemia markedly increases toxicity.",
        "id": "Indeks terapi sangat sempit (kadar terapeutik: 0.5 - 0.9 ng/mL pada HF, 0.8 - 2.0 ng/mL pada AF). Hipokalemia memicu toksisitas fatal."
      }
    },
    "onset": "Oral: 1 - 2 hours; IV: 5 - 30 minutes",
    "peak": "2 - 6 hours",
    "duration": "3 - 4 days (half-life 36-48 hours in normal renal function)",
    "metabolism": "Primarily excreted unchanged by kidneys (50-70%) via P-glycoprotein. Half-life prolonged to 4-6 days in anuria.",
    "clinicalPearls": {
      "en": "Positive inotrope and negative chronotrope. Classic Salvador Dali 'sagging' ST depression on ECG. Toxicity presents with nausea, vomiting, yellow-green halos (xanthopsia), and bidirectional ventricular tachycardia. Antidote: Digoxin Immune Fab (DigiFab).",
      "id": "Inotropik positif sekaligus kronotropik negatif. Gambaran EKG khas 'Salvador Dali mustache' (depresi ST melengkung). Gejala toksisitas: mual, muntah, halo kuning-hijau (xantopsia), dan VT dua arah. Antidotum: DigiFab."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Appropriate Dosing: Digitalis should not be used in the treatment of obesity or for weight loss. Toxicity can be life-threatening.",
      "id": "Dosis Tepat: Digitalis tidak boleh digunakan untuk terapi obesitas. Toksisitas dapat mematikan."
    }
  },
  {
    "id": "diltiazem_oral",
    "genericName": "Diltiazem Hydrochloride (Oral)",
    "brandNames": [
      "Herbesser",
      "Cardizem",
      "Diltiazem Dexa",
      "Farmabes"
    ],
    "drugClass": "Non-Dihydropyridine Calcium Channel Blocker (Benzothiazepine)",
    "indications": {
      "en": "Rate control in atrial fibrillation and atrial flutter, chronic stable angina, coronary artery vasospasm (Prinzmetal angina), hypertension.",
      "id": "Kontrol laju pada fibrilasi atrium/flutter, angina pektoris stabil kronis, vasospasme arteri koroner (Prinzmetal), hipertensi."
    },
    "contraindications": {
      "en": "Severe hypotension (SBP <90 mmHg), acute myocardial infarction with pulmonary congestion, 2nd or 3rd degree AV block, sick sinus syndrome, HFrEF with LVEF <40%.",
      "id": "Hipotensi berat (TDS <90 mmHg), infark miokard akut dengan kongesti paru, blok AV derajat 2/3, HFrEF dengan LVEF <40%."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 360,
      "frequency": "TID (immediate release) or once daily (extended release)",
      "bolusDose": "Chronic Angina/AF: 30 - 60 mg PO TID or QID (or 120 - 240 mg PO once daily CD/ER formulation; max 360 mg/day)",
      "notes": {
        "en": "Slows AV nodal conduction without the marked peripheral edema of dihydropyridines (amlodipine) or the intense inotropic depression of verapamil.",
        "id": "Memperlambat konduksi nodus AV tanpa edema perifer hebat khas amlodipin atau depresi inotropik sekuat verapamil."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "2 - 3 hours",
    "duration": "6 - 8 hours (ER forms: 24 hours)",
    "metabolism": "Extensively hepatic via CYP3A4 to desacetyldiltiazem (25-50% activity of parent); biliary/fecal (65%) and renal (35%) excretion.",
    "clinicalPearls": {
      "en": "Moderate CYP3A4 and P-glycoprotein inhibitor; markedly increases serum levels of statins (simvastatin, atorvastatin), DOACs, and cyclosporine. Contraindicated in heart failure with reduced ejection fraction due to negative inotropy.",
      "id": "Menghambat CYP3A4; meningkatkan kadar statin (simvastatin), DOAC, dan siklosporin. Kontraindikasi pada gagal jantung fraksi ejeksi rendah (HFrEF) karena efek inotropik negatif."
    },
    "highRisk": false
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
    "id": "domperidone",
    "genericName": "Domperidone",
    "brandNames": [
      "Vometa",
      "Motilium",
      "Domperidone Dexa",
      "Vesperum",
      "Tilarin"
    ],
    "drugClass": "Peripheral Dopamine D2 Receptor Antagonist (Prokinetic / Antiemetic)",
    "indications": {
      "en": "Diabetic gastroparesis, delayed gastric emptying, symptomatic nausea and vomiting, functional dyspepsia with postprandial fullness.",
      "id": "Gastroparesis diabetik, perlambatan pengosongan lambung, mual dan muntah simptomatik, dispepsia fungsional dengan kembung/begah."
    },
    "contraindications": {
      "en": "Prolonged QTc interval or concurrent QTc-prolonging drugs, gastrointestinal hemorrhage/mechanical obstruction/perforation, prolactin-releasing pituitary tumor (prolactinoma), moderate-to-severe hepatic impairment.",
      "id": "Perpanjangan interval QTc, perdarahan atau perforasi saluran cerna, tumor prolaktinoma hipofisis, gangguan hepar sedang-berat."
    },
    "dosing": {
      "dosePerKg": 0.14,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "TID (15-30 min before meals)",
      "bolusDose": "Adults: 10 mg PO TID 15-30 minutes before meals (max 30 mg/day; shortest duration <=1 week); Pediatric: 0.25 mg/kg PO TID (max 30 mg/day)",
      "notes": {
        "en": "Does not readily cross the blood-brain barrier, resulting in near-zero extrapyramidal symptoms compared to metoclopramide.",
        "id": "Hampir tidak menembus sawar darah otak, sehingga bebas dari efek samping ekstrapiramidal (EPS) kaku leher/distonia yang sering terjadi pada metoklopramid."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "30 - 60 minutes",
    "duration": "6 - 8 hours (half-life 7-9 hours)",
    "metabolism": "Extensively hepatic via CYP3A4 N-dealkylation and hydroxylation; excreted in feces (66%) and urine (31%).",
    "clinicalPearls": {
      "en": "Blocks dopamine D2 receptors in the chemoreceptor trigger zone (CTZ - which lies outside the blood-brain barrier) and upper GI tract, accelerating gastric emptying and duodenal coordination. Lacks central dystonias, but blocks hERG potassium channels with risk of ventricular arrhythmias / QTc prolongation at doses >30 mg/day or in patients >60 years.",
      "id": "Bekerja di CTZ (yang berada di luar sawar darah otak), memicu pengosongan lambung tanpa menyebabkan efek kaku distonia otak. Waspadai risiko aritmia ventrikel bila dosis melebihi 30 mg/hari atau pada pasien usia >60 tahun."
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
    "id": "doxycycline",
    "genericName": "Doxycycline Hyclate",
    "brandNames": [
      "Vibramycin",
      "Doxicor",
      "Interdoxin",
      "Dohixat",
      "Siclidon"
    ],
    "drugClass": "Tetracycline Antibiotic (30S Ribosomal Inhibitor)",
    "indications": {
      "en": "Community-acquired pneumonia, atypical pneumonia, scrub typhus / rickettsial diseases, leptospirosis (treatment & prophylaxis), malaria prophylaxis, Lyme disease, Chlamydia, severe acne.",
      "id": "Pneumonia komunitas atipik, tifus scrub (riketsia), leptospirosis (terapi & profilaksis banjir), profilaksis malaria, infeksi Chlamydia, jerawat vulgaris berat."
    },
    "contraindications": {
      "en": "Pregnancy (2nd/3rd trimester: tooth discoloration and enamel hypoplasia, maternal hepatotoxicity), children <8 years (except life-threatening rickettsial infections / scrub typhus).",
      "id": "Kehamilan trimester 2 & 3 (disklorasi gigi permanen janin dan hipoplasia email), anak <8 tahun (kecuali infeksi fatal riketsia/leptospirosis berat)."
    },
    "dosing": {
      "dosePerKg": 2.5,
      "unit": "mg",
      "maxDose": 200,
      "frequency": "q12h with full glass of water",
      "bolusDose": "Adults: 100 mg PO q12h (Day 1: 100 mg BID loading, then 100 mg once daily or BID); Leptospirosis Prophylaxis: 200 mg PO once weekly",
      "notes": {
        "en": "Must be taken with a full glass of water (>=250 mL) and patient must remain upright for at least 30 minutes to prevent pill-induced severe esophageal ulceration.",
        "id": "Wajib diminum dengan segelas penuh air putih (>=250 mL) dan posisi tubuh tegak minimal 30 menit untuk mencegah ulkus esofagus yang sangat nyeri."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1.5 - 4 hours",
    "duration": "12 - 24 hours (elimination half-life 18-22 hours)",
    "metabolism": "Non-enzymatic clearance via chelation in the GI tract; excreted in feces (40-60%) and urine (35-45%). Safe in renal failure without dose adjustment.",
    "clinicalPearls": {
      "en": "Unlike older tetracyclines, doxycycline is eliminated primarily through non-renal GI pathways, requiring zero dose reduction in severe kidney disease or dialysis. Drug of choice for tropical rickettsial diseases and leptospirosis.",
      "id": "Berbeda dari tetrasiklin generasi lama, doksisiklin dieliminasi terutama lewat saluran cerna (feses), sehingga tidak membutuhkan penyesuaian dosis pada gagal ginjal maupun cuci darah. Obat pilihan utama leptospirosis dan riketsia."
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
    "id": "empagliflozin",
    "genericName": "Empagliflozin",
    "brandNames": [
      "Jardiance"
    ],
    "drugClass": "Sodium-Glucose Cotransporter 2 (SGLT2) Inhibitor",
    "indications": {
      "en": "Type 2 Diabetes Mellitus, Heart Failure with reduced or preserved ejection fraction (EMPEROR-Reduced and EMPEROR-Preserved trials), Chronic Kidney Disease progression reduction (EMPA-KIDNEY trial).",
      "id": "DM Tipe 2, Gagal Jantung HFrEF dan HFpEF (EMPEROR trials), memperlambat progresi Penyakit Ginjal Kronis (EMPA-KIDNEY trial)."
    },
    "contraindications": {
      "en": "Hypersensitivity to empagliflozin, patients on dialysis, severe diabetic ketoacidosis, prior euglycemic DKA.",
      "id": "Hipersensitivitas, pasien dialisis, ketoasidosis diabetik aktif, riwayat DKA euglikemik."
    },
    "dosing": {
      "dosePerKg": 0.14,
      "unit": "mg",
      "maxDose": 25,
      "frequency": "Once daily in the morning",
      "bolusDose": "Heart Failure / CKD / T2DM: 10 mg PO once daily in the morning; may increase to 25 mg once daily for additional glycemic control",
      "notes": {
        "en": "Can be used for heart failure and CKD regardless of diabetes status. SGLT2 inhibitors should be withheld 3-4 days prior to elective major surgery to prevent perioperative euglycemic DKA.",
        "id": "Dapat digunakan untuk gagal jantung dan PGK tanpa memandang status diabetes. Wajib dihentikan 3-4 hari sebelum operasi besar elektif untuk mencegah DKA euglikemik."
      }
    },
    "onset": "Days (glucosuria begins immediately)",
    "peak": "1.5 hours",
    "duration": "24 hours",
    "metabolism": "Hepatic glucuronidation by UGT2B7, UGT1A3, UGT1A8, UGT1A9 to inactive metabolites; excreted in feces (41%) and urine (54%).",
    "clinicalPearls": {
      "en": "Groundbreaking cardiorenal medicine. Decreases intraglomerular pressure, reduces preload/afterload, and promotes osmotic diuresis and weight loss. Most common side effects are genital mycotic infections (candidiasis) and urinary tract infections. Always maintain hydration.",
      "id": "Obat kardiorenal revolusioner. Menurunkan tekanan intraglomerulus, mengurangi preload/afterload miokard, dan memicu diuresis osmotik. Waspadai infeksi jamur genital (kandidiasis) dan DKA euglikemik saat puasa/stres bedah."
    },
    "highRisk": false
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
    "id": "fluconazole",
    "genericName": "Fluconazole",
    "brandNames": [
      "Diflucan",
      "Zemyc",
      "Flucoral",
      "Cryptal",
      "Kifluzol"
    ],
    "drugClass": "Triazole Antifungal (14-alpha-Demethylase Inhibitor)",
    "indications": {
      "en": "Vulvovaginal candidiasis, oropharyngeal/esophageal candidiasis, candidemia / invasive candidiasis, cryptococcal meningitis (maintenance), antifungal prophylaxis in immunocompromised hosts.",
      "id": "Kandidiasis vulvovagina, kandidiasis oral/esofagus, kandidemia invasif, meningitis kriptokokus (fase pemeliharaan), profilaksis jamur pada imunokompromais."
    },
    "contraindications": {
      "en": "Hypersensitivity to azoles, coadministration with CYP3A4 substrates that prolong QT interval (cisapride, terfenadine, astemizole, pimozide, quinidine).",
      "id": "Hipersensitivitas terhadap azol, penggunaan bersama obat pemanjang QT interval."
    },
    "dosing": {
      "dosePerKg": 6.0,
      "unit": "mg",
      "maxDose": 800,
      "frequency": "Once daily (PO / IV)",
      "bolusDose": "Vaginal Candidiasis: 150 mg PO single dose stat; Oropharyngeal: 200 mg PO Day 1, then 100 mg once daily; Invasive Candidiasis / Cryptococcal: 400 - 800 mg IV/PO once daily",
      "notes": {
        "en": "Oral bioavailability is >90% (oral dose equals IV dose). Excellent penetration into CSF (70-90% of serum levels), saliva, and skin.",
        "id": "Bioavailabilitas oral >90% (dosis oral sama persis dengan IV). Penetrasi cairan serebrospinal (CSS) sangat tinggi (70-90% kadar serum)."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1 - 2 hours",
    "duration": "24+ hours (elimination half-life ~30 hours)",
    "metabolism": "Minimal hepatic metabolism (~11%); excreted predominantly unchanged in urine (80%). Reduce dose by 50% if CrCl <=50 mL/min.",
    "clinicalPearls": {
      "en": "Moderate-to-potent inhibitor of CYP2C9 and CYP2C19, and moderate inhibitor of CYP3A4. Causes substantial increases in warfarin (INR spike), phenytoin, sulfonylureas, and tacrolimus levels. Most Candida albicans are highly susceptible; Candida krusei is intrinsically resistant.",
      "id": "Menghambat CYP2C9, CYP2C19, dan CYP3A4. Meningkatkan kadar warfarin (lonjakan INR), fenitoin, dan sulfonilurea secara drastis. Candida albicans sangat sensitif; Candida krusei resisten intrinsik."
    },
    "highRisk": false
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
    "id": "furosemide_oral",
    "genericName": "Furosemide (Oral)",
    "brandNames": [
      "Lasix",
      "Uresix",
      "Farsix",
      "Gralixa"
    ],
    "drugClass": "Loop Diuretic (Na-K-2Cl Cotransporter Inhibitor)",
    "indications": {
      "en": "Edema associated with heart failure, cirrhosis, renal disease (including nephrotic syndrome), chronic hypertension adjunct.",
      "id": "Edema akibat gagal jantung, sirosis, penyakit ginjal (termasuk sindrom nefrotik), ajuvan hipertensi."
    },
    "contraindications": {
      "en": "Anuria, severe hypokalemia, severe hyponatremia, hypovolemia/dehydration, hepatic coma.",
      "id": "Anuria, hipokalemia berat, hiponatremia berat, dehidrasi berat, koma hepatikum."
    },
    "dosing": {
      "dosePerKg": 0.6,
      "unit": "mg",
      "maxDose": 160,
      "frequency": "Once daily or BID (morning/afternoon)",
      "bolusDose": "Edema: 20 - 40 mg PO once daily (max 80-160 mg/day; in severe renal failure up to 200-500 mg PO)",
      "notes": {
        "en": "Oral bioavailability is ~50% (oral 40 mg PO ~ IV 20 mg). Take in morning to prevent nocturia.",
        "id": "Bioavailabilitas oral ~50% (40 mg PO setara 20 mg IV). Minum pagi hari untuk mencegah nokturia."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "1 - 2 hours",
    "duration": "6 - 8 hours ('LA-SIX' = lasts six hours)",
    "metabolism": "Minimal hepatic glucuronidation (~10%); actively secreted unchanged by organic acid transport into proximal tubule (80%).",
    "clinicalPearls": {
      "en": "Name derived from 'LAsts SIX hours'. Causes profound excretion of Na+, Cl-, K+, Mg2+, and Ca2+. Ototoxic at high doses especially when combined with aminoglycosides.",
      "id": "Nama Lasix berasal dari 'LAsts SIX hours'. Memicu ekskresi masif Na+, K+, Mg2+, dan Ca2+. Ototoksik dosis tinggi terutama jika digabung aminoglikosida."
    },
    "highRisk": false
  },
  {
    "id": "gabapentin",
    "genericName": "Gabapentin",
    "brandNames": [
      "Neurontin",
      "Alpentin",
      "Gabexal",
      "Epiven",
      "Sipentin"
    ],
    "drugClass": "Alpha-2-Delta Calcium Channel Ligand (Neuropathic Analgesic)",
    "indications": {
      "en": "Post-herpetic neuralgia, diabetic peripheral neuropathy, multimodal perioperative analgesia (opioid-sparing), restless legs syndrome.",
      "id": "Neuralgia paska herpetik, neuropati diabetik perifer, analgesia multimodal perioperatif (hemat opioid), restless legs syndrome."
    },
    "contraindications": {
      "en": "Hypersensitivity to gabapentin.",
      "id": "Hipersensitivitas terhadap gabapentin."
    },
    "dosing": {
      "dosePerKg": 5.0,
      "unit": "mg",
      "maxDose": 1200,
      "frequency": "TID (q8h)",
      "bolusDose": "Preop Opioid-Sparing: 300 - 600 mg PO single dose 1-2h prior to surgery; Neuropathy: Start 300 mg PO Day 1, 300 mg BID Day 2, 300 mg TID Day 3 (titrate to 900-3600 mg/day)",
      "notes": {
        "en": "Absorption occurs via saturable L-amino acid transport in small intestine; higher doses yield lower percentage bioavailability (60% at 300 mg, drops to 35% at 1600 mg).",
        "id": "Absorpsi terjadi lewat transporter L-amino asam yang tersaturasi; makin tinggi dosis makin rendah bioavailabilitasnya (60% pada 300 mg, turun ke 35% pada 1600 mg)."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "2 - 3 hours",
    "duration": "8 hours (elimination half-life 5-7 hours)",
    "metabolism": "Zero hepatic metabolism; eliminated 100% unchanged in urine. Must adjust strictly in renal impairment.",
    "clinicalPearls": {
      "en": "Binds alpha-2-delta subunit of voltage-gated calcium channels, decreasing excitatory neurotransmitter release (substance P, glutamate). Does not act on GABA receptors despite name. Primary side effects: somnolence, dizziness, peripheral edema. High risk of respiratory depression when combined with opioids.",
      "id": "Berikatan dengan subunit alfa-2-delta kanal kalsium, menghambat pelepasan neurotransmiter eksitatorik. Tidak bekerja pada reseptor GABA. Efek samping: mengantuk, pusing, ataksia. Sinergis memicu depresi napas bila digabung opioid."
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
    "id": "glimepiride",
    "genericName": "Glimepiride",
    "brandNames": [
      "Amaryl",
      "Glucoryl",
      "Metrix",
      "Versibet"
    ],
    "drugClass": "Second-Generation Sulfonylurea",
    "indications": {
      "en": "Type 2 Diabetes Mellitus as adjunct to diet and exercise, or in combination with metformin/insulin.",
      "id": "Diabetes Melitus Tipe 2 sebagai ajuvan diet dan olahraga, atau kombinasi dengan metformin/insulin."
    },
    "contraindications": {
      "en": "Hypersensitivity to sulfonylureas or sulfonamides, Type 1 DM, diabetic ketoacidosis, severe renal or hepatic impairment.",
      "id": "Hipersensitivitas terhadap sulfonilurea/sulfonamid, DM Tipe 1, ketoasidosis diabetik, gagal ginjal atau hepar berat."
    },
    "dosing": {
      "dosePerKg": 0.03,
      "unit": "mg",
      "maxDose": 8,
      "frequency": "Once daily with breakfast",
      "bolusDose": "Initial: 1 - 2 mg PO once daily with breakfast; titrate at 1-2 week intervals to max 4 - 8 mg once daily",
      "notes": {
        "en": "Take immediately before or with the first main meal of the day. Risk of prolonged hypoglycemia; patient must not skip meals.",
        "id": "Minum segera sebelum atau bersama sarapan pagi. Risiko hipoglikemia berkepanjangan; pasien tidak boleh melewatkan jam makan."
      }
    },
    "onset": "2 - 3 hours",
    "peak": "2 - 3 hours",
    "duration": "24 hours",
    "metabolism": "Completely metabolized by hepatic CYP2C9 to active M1 metabolite (one-third activity) and inactive M2 metabolite; excreted in urine (60%) and feces (40%).",
    "clinicalPearls": {
      "en": "Stimulates pancreatic beta-cell insulin secretion by closing ATP-sensitive potassium channels. Lower risk of hypoglycemia compared to glibenclamide/glyburide, but still carries high risk in elderly or skipped meals.",
      "id": "Memicu sekresi insulin sel beta pankreas dengan menutup kanal K-ATP. Risiko hipoglikemia lebih rendah dari glibenklamid, namun tetap berisiko pada lansia atau telat makan."
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
    "id": "haloperidol_oral",
    "genericName": "Haloperidol (Oral / IM)",
    "brandNames": [
      "Haldol",
      "Serenace",
      "Lodomer",
      "Govotil"
    ],
    "drugClass": "First-Generation Typical Antipsychotic (Butyrophenone)",
    "indications": {
      "en": "Hospital and ICU delirium with agitation, acute psychosis, Tourette syndrome, refractory nausea/vomiting in palliative care.",
      "id": "Delirium rumah sakit/ICU dengan agitasi berat, psikosis akut, sindrom Tourette, mual/muntah refrakter paliatif."
    },
    "contraindications": {
      "en": "Parkinson disease, dementia with Lewy bodies, severe CNS depression, comatose states, baseline prolonged QTc (>500 ms).",
      "id": "Penyakit Parkinson, demensia Lewy body, depresi SSP berat, koma, perpanjangan interval QTc dasar (>500 ms)."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "PRN or BID-TID",
      "bolusDose": "Acute Delirium / Agitation: 0.5 - 2 mg PO/IM (elderly: 0.25 - 0.5 mg; severe ICU agitation: 2 - 5 mg IV/IM q4-8h PRN; max 10-20 mg/day)",
      "notes": {
        "en": "Potent D2 dopamine receptor antagonist. Monitor continuous ECG for QTc prolongation when administering IV.",
        "id": "Antagonis kuat reseptor dopamin D2. Pantau EKG kontinu untuk perpanjangan QTc saat diberikan via IV."
      }
    },
    "onset": "IV: 5 - 15 minutes; IM: 20 - 30 minutes; Oral: 30 - 60 minutes",
    "peak": "20 minutes (IV), 30-45 minutes (IM), 2-6 hours (oral)",
    "duration": "6 - 12 hours (half-life 18-24 hours)",
    "metabolism": "Extensively hepatic via glucuronidation (50-60%) and CYP3A4 / CYP2D6; excreted in feces (40%) and urine (30%).",
    "clinicalPearls": {
      "en": "Preferred agent for hyperactive delirium in ICU because it lacks anticholinergic sedation. High risk of extrapyramidal symptoms (EPS: acute dystonia, parkinsonism, akathisia; treat with diphenhydramine). Risk of Neuroleptic Malignant Syndrome (NMS).",
      "id": "Pilihan utama delirium hiperaktif di ICU karena tidak menyebabkan sedasi antikolinergik. Risiko tinggi gejala ekstrapiramidal (EPS: distonia akut, akatisia; obati dengan difenhidramin). Waspadai Sindrom Neuroleptik Maligna (SNM)."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Increased Mortality in Elderly Patients with Dementia-Related Psychosis.",
      "id": "Peningkatan Mortalitas pada Pasien Lansia dengan Psikosis Terkait Demensia."
    }
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
    "id": "hyoscine_butylbromide",
    "genericName": "Hyoscine Butylbromide (Scopolamine Butylbromide)",
    "brandNames": [
      "Buscopan",
      "Gitas",
      "Hyoscine Generik",
      "Spasmolit"
    ],
    "drugClass": "Peripheral Antispasmodic / Quaternary Ammonium Anticholinergic",
    "indications": {
      "en": "Acute gastrointestinal smooth muscle spasm (colic pain), renal and ureteral colic, biliary colic, irritable bowel syndrome (IBS), diagnostic endoscopy/radiology antispasmodic.",
      "id": "Spasme akut otot polos saluran cerna (kolik abdomen), kolik ureter/ginjal, kolik bilier kandung empedu, kram perut sindrom iritasi usus (IBS)."
    },
    "contraindications": {
      "en": "Untreated narrow-angle glaucoma, mechanical stenosis of the GI tract, paralytic ileus, toxic megacolon, myasthenia gravis, severe tachycardia/arrhythmias.",
      "id": "Glaukoma sudut sempit akut, stenosis mekanik saluran cerna, ileus paralitik, megakolon toksik, miastenia gravis, takiaritmia berat."
    },
    "dosing": {
      "dosePerKg": 0.25,
      "unit": "mg",
      "maxDose": 20,
      "frequency": "TID or QID (or IV/IM stat)",
      "bolusDose": "Acute Colic IV/IM: 20 mg slow IV (over 1 min) or IM, may repeat in 30 min if needed (max 100 mg/day); Oral: 10 - 20 mg PO TID-QID",
      "notes": {
        "en": "Quaternary ammonium derivative: does NOT cross the blood-brain barrier. Completely devoid of central anticholinergic toxicity (no central sedation, delirium, or hallucination seen with scopolamine/atropine).",
        "id": "Garam amonium kuaterner: TIDAK menembus sawar darah otak. Bebas dari efek delirium, halusinasi, dan kantuk khas atropin atau skopolamin biasa."
      }
    },
    "onset": "IV: 2 - 5 minutes; IM: 10 - 15 minutes; Oral: 20 - 30 minutes",
    "peak": "IV: immediate; Oral: 1 hour",
    "duration": "4 - 6 hours",
    "metabolism": "Partially hydrolyzed by plasma esterases; high renal clearance of active drug (50%) and biliary elimination.",
    "clinicalPearls": {
      "en": "Potent competitive muscarinic M3 antagonist on visceral smooth muscle. Rapidly relieves crampy abdominal colic without altering mental status. IV administration frequently causes mild transient tachycardia and blurred vision (cycloplegia).",
      "id": "Antagonis muskarinik M3 kuat pada otot polos organ viseral. Meredakan nyeri kolik perut melilit dalam hitungan menit tanpa mengaburkan kesadaran pasien. Pemberian IV dapat memicu takikardia ringan dan pandangan kabur sementara."
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
    "id": "insulin_glargine",
    "genericName": "Insulin Glargine",
    "brandNames": [
      "Lantus",
      "Basaglar",
      "Toujeo",
      "Ezelin"
    ],
    "drugClass": "Long-Acting Basal Insulin Analogue",
    "indications": {
      "en": "Basal glycemic control in Type 1 and Type 2 Diabetes Mellitus.",
      "id": "Kontrol glukosa basal pada Diabetes Melitus Tipe 1 dan Tipe 2."
    },
    "contraindications": {
      "en": "Hypoglycemia, hypersensitivity to insulin glargine. NEVER administer intravenously.",
      "id": "Hipoglikemia, hipersensitivitas. DILARANG KERAS disuntikkan secara intravena."
    },
    "dosing": {
      "dosePerKg": 0.2,
      "unit": "IU",
      "maxDose": 80,
      "frequency": "Once daily (same time every day, usually bedtime)",
      "bolusDose": "Initial T2DM: 10 units SubQ once daily or 0.1 - 0.2 units/kg SubQ once daily at bedtime; titrate by 2-4 units every 3 days to fasting BG 80-130 mg/dL",
      "notes": {
        "en": "Formulated at acidic pH 4.0; precipitates into microprecipitates upon SubQ injection at neutral tissue pH, creating a smooth, peakless 24h basal release. Do NOT mix with any other insulin in the same syringe.",
        "id": "Diformulasikan pada pH asam 4.0; membentuk mikropresipitat di jaringan subkutan netral, melepaskan insulin secara 'peakless' selama 24 jam. JANGAN dicampur dengan insulin lain dalam satu spuit."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "Peakless (flat, constant plasma concentration)",
    "duration": "24 hours (Toujeo U-300 up to 36 hours)",
    "metabolism": "Metabolized at carboxyl terminus of B chain in SubQ tissue to active metabolites M1 and M2.",
    "clinicalPearls": {
      "en": "Peakless profile minimizes nocturnal hypoglycemia compared to NPH insulin. In perioperative setting, administer 75-80% of normal evening dose the night before surgery to prevent both intraoperative hypoglycemia and ketoacidosis.",
      "id": "Profil datar tanpa puncak (peakless) mencegah hipoglikemia nokturnal dibanding NPH. Pada fase perioperatif, berikan 75-80% dari dosis malam harian sebelum hari operasi."
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
    "id": "isosorbide_dinitrate",
    "genericName": "Isosorbide Dinitrate (ISDN / Sublingual / Oral)",
    "brandNames": [
      "Cedocard",
      "Farsorbid",
      "Isoket",
      "Vasocard",
      "Isordil"
    ],
    "drugClass": "Organic Nitrate Vasodilator (NO Donor)",
    "indications": {
      "en": "Acute relief and prophylaxis of angina pectoris, acute decompensated heart failure with pulmonary edema (preload reducer), chronic HFrEF in combination with hydralazine (A-HeFT trial).",
      "id": "Tata laksana akut dan profilaksis angina pektoris, gagal jantung akut dengan edema paru (penurunan preload), terapi gagal jantung kronis bersama hidralazin."
    },
    "contraindications": {
      "en": "Concurrent use of PDE-5 inhibitors (sildenafil within 24h, tadalafil within 48h - causes catastrophic fatal refractory hypotension), severe aortic stenosis, hypertrophic cardiomyopathy, right ventricular myocardial infarction.",
      "id": "Penggunaan PDE-5 inhibitor (sildenafil dalam 24 jam, tadalafil 48 jam - memicu syok hipotensi refrakter fatal), stenosis aorta berat, infark ventrikel kanan."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 40,
      "frequency": "SL PRN or PO TID with nitrate-free interval",
      "bolusDose": "Acute Angina / Pulmonary Edema: 5 mg SL every 5-10 min PRN (up to 3 doses); Chronic Angina: 10 - 40 mg PO TID (at 7 AM, 12 PM, 5 PM to ensure a 14h nitrate-free overnight window)",
      "notes": {
        "en": "Nitrate tolerance develops within 24-48 hours of continuous exposure; requires a mandatory 10-14 hour nitrate-free interval every day (typically overnight) to restore vascular sulfhydryl groups.",
        "id": "Toleransi nitrat terjadi dalam 24-48 jam pemakaian kontinu; membutuhkan interval bebas nitrat 10-14 jam setiap malam agar reseptor vaskular kembali peka."
      }
    },
    "onset": "Sublingual: 2 - 5 minutes; Oral: 20 - 40 minutes",
    "peak": "Sublingual: 10 - 15 minutes; Oral: 1 - 2 hours",
    "duration": "Sublingual: 1 - 2 hours; Oral: 4 - 6 hours",
    "metabolism": "Hepatic denitration to active metabolites isosorbide-2-mononitrate and isosorbide-5-mononitrate (half-life 5 hours); renal excretion.",
    "clinicalPearls": {
      "en": "Venodilator > arteriolar dilator; markedly reduces cardiac preload and left ventricular end-diastolic wall stress. Throbbing nitrate headache is very common (treat with paracetamol; do not stop medication). In acute inferior MI, obtain right-sided ECG (V4R) before giving nitrates to avoid precipitating shock from RV infarction.",
      "id": "Venodilator kuat; menurunkan preload dan kongesti paru secara dramatis. Nyeri kepala berdenyut adalah efek samping lazim (obati dengan parasetamol). Pada infark inferior, rekam sadapan kanan (V4R) sebelum memberi nitrat untuk mencegah syok pada infark ventrikel kanan."
    },
    "highRisk": false
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
    "id": "lactulose",
    "genericName": "Lactulose",
    "brandNames": [
      "Duphalac",
      "Constulose",
      "Lactulax",
      "Opilax",
      "Lantulos"
    ],
    "drugClass": "Osmotic Laxative / Ammonia Detoxicant",
    "indications": {
      "en": "Hepatic encephalopathy (prevention and treatment in cirrhosis), chronic constipation.",
      "id": "Ensefalopati hepatikum (pencegahan dan terapi pada sirosis), konstipasi kronis."
    },
    "contraindications": {
      "en": "Galactosemia, bowel obstruction, acute surgical abdomen.",
      "id": "Galaktosemia, obstruksi usus mekanik, abdomen akut bedah."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mL",
      "maxDose": 90,
      "frequency": "TID or QID",
      "bolusDose": "Hepatic Encephalopathy: 30 - 45 mL (20-30 g) PO q1-2h until 2 soft bowel movements, then 15 - 30 mL PO TID-QID titrated to 2-3 soft stools/day; Constipation: 15 - 30 mL PO daily",
      "notes": {
        "en": "Synthetic non-absorbable disaccharide. In comatose HE patients, can be administered as retention enema (300 mL lactulose in 700 mL water retained for 30-60 min).",
        "id": "Disakarida sintetis non-absorbable. Pada koma ensefalopati hepatikum, dapat diberikan sebagai retensi enema (300 mL laktulosa dalam 700 mL air ditahan 30-60 menit)."
      }
    },
    "onset": "Constipation: 24 - 48 hours; Hepatic Encephalopathy: 1 - 2 hours",
    "peak": "24 - 48 hours",
    "duration": "Variable with transit time",
    "metabolism": "Reaches colon 100% intact; degraded by colonic bacteria (Lactobacillus, Bacteroides) into lactic acid and acetic acid.",
    "clinicalPearls": {
      "en": "Acidifies colonic lumen (pH ~5.0), converting diffusible lipophilic ammonia (NH3) into non-absorbable ammonium ions (NH4+) which are trapped and excreted in stool ('ammonia trapping'). Target stool output in liver cirrhosis is strictly 2-3 soft bowel movements per day.",
      "id": "Mengasamkan lumen kolon (pH ~5.0), mengubah amonia difusibel (NH3) menjadi ion amonium (NH4+) yang terperangkap dan dibuang bersama tinja ('ammonia trapping'). Target terapi sirosis adalah persis 2-3 kali BAB lunak per hari."
    },
    "highRisk": false
  },
  {
    "id": "lansoprazole",
    "genericName": "Lansoprazole",
    "brandNames": [
      "Prevacid",
      "Prosogan",
      "Compraz",
      "Laprazol",
      "Laz"
    ],
    "drugClass": "Proton Pump Inhibitor (H+/K+-ATPase Inhibitor)",
    "indications": {
      "en": "Erosive esophagitis, gastroesophageal reflux disease (GERD), duodenal and gastric ulcers, NSAID-associated ulcer prevention, H. pylori eradication.",
      "id": "Esofagitis erosif, GERD, tukak lambung dan duodenum, profilaksis tukak akibat NSAID, eradikasi H. pylori."
    },
    "contraindications": {
      "en": "Hypersensitivity to PPIs, concurrent use with rilpivirine.",
      "id": "Hipersensitivitas terhadap golongan PPI."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 60,
      "frequency": "Once daily (30-60 min before breakfast)",
      "bolusDose": "GERD/Ulcers: 30 mg PO once daily in the morning before food; H. pylori: 30 mg PO BID (as part of triple/quadruple therapy x 14 days)",
      "notes": {
        "en": "Take 30-60 minutes before breakfast. Fast-dissolving oral disintegrating tablet (ODT) formulation is available for dysphagic or tube-fed patients.",
        "id": "Minum 30-60 menit sebelum sarapan. Tersedia tablet larut cepat (ODT) yang sangat mudah diberikan pada pasien pasca stroke atau dengan selang NGT."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "1.5 - 2 hours",
    "duration": "24+ hours",
    "metabolism": "Extensively hepatic via CYP2C19 and CYP3A4 to inactive metabolites; excreted in feces (67%) and urine (33%).",
    "clinicalPearls": {
      "en": "Higher bioavailability (80-85%) than omeprazole. Significantly less CYP2C19 inhibition compared to omeprazole, creating less interference with clopidogrel bioactivation. Rapid and profound daytime acid suppression.",
      "id": "Bioavailabilitas lebih tinggi (80-85%) dibanding omeprazol. Hambatan terhadap enzim CYP2C19 jauh lebih lemah sehingga lebih aman didampingkan dengan klopidogrel pada pasien penyakit jantung koroner."
    },
    "highRisk": false
  },
  {
    "id": "levetiracetam",
    "genericName": "Levetiracetam",
    "brandNames": [
      "Keppra",
      "Levipil",
      "Letiram",
      "Kenep"
    ],
    "drugClass": "Second-Generation Antiepileptic (SV2A Ligand)",
    "indications": {
      "en": "Focal-onset seizures, generalized tonic-clonic seizures, myoclonic seizures, status epilepticus (second-line IV bolus), neurotrauma seizure prophylaxis.",
      "id": "Kejang onset fokal, kejang tonik-klonik umum, kejang mioklonik, status epileptikus lini kedua (IV), profilaksis kejang cedera kepala."
    },
    "contraindications": {
      "en": "Hypersensitivity to levetiracetam or pyrrolidone derivatives.",
      "id": "Hipersensitivitas terhadap levetirasetam atau derivat pirolidon."
    },
    "dosing": {
      "dosePerKg": 20.0,
      "unit": "mg",
      "maxDose": 3000,
      "frequency": "BID (q12h)",
      "bolusDose": "Status Epilepticus: 60 mg/kg IV bolus over 10-15 min (max 4500 mg); Maintenance: 500 mg PO/IV BID, titrate up to 1500 mg BID (max 3000 mg/day)",
      "notes": {
        "en": "100% oral bioavailability (oral and IV dosing are 1:1 interchangeable). Zero hepatic CYP metabolism or drug interactions.",
        "id": "Bioavailabilitas oral 100% (dosis oral dan IV identik 1:1). Tidak dimetabolisme oleh enzim CYP hepar sehingga bebas interaksi obat."
      }
    },
    "onset": "IV: 5 - 15 minutes; Oral: 30 - 60 minutes",
    "peak": "1 hour (oral), end of infusion (IV)",
    "duration": "12 hours (elimination half-life 6-8 hours)",
    "metabolism": "Non-hepatic enzymatic hydrolysis (acetamidase) in whole blood (24%); excreted predominantly unchanged in urine (66%). Adjust strictly by CrCl.",
    "clinicalPearls": {
      "en": "Binds presynaptic vesicle protein SV2A to inhibit neurotransmitter release. First-line anticonvulsant in critical care due to lack of drug interactions and hemodynamic stability. Behavioral side effects (irritability, aggression, depression, 'Keppra rage') occur in 10-15% of patients.",
      "id": "Berikatan dengan protein vesikel presinaptik SV2A. Antikonvulsan lini pertama ICU karena bebas interaksi obat dan hemodinamik stabil. Efek samping psikiatri (agitasi, mudah marah, depresi / 'Keppra rage') terjadi pada 10-15% pasien."
    },
    "highRisk": false
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
    "id": "levothyroxine",
    "genericName": "Levothyroxine Sodium (T4)",
    "brandNames": [
      "Euthyrox",
      "Synthroid",
      "Levothyroxine Dexa",
      "Thyrax Duotab"
    ],
    "drugClass": "Synthetic Thyroid Hormone (Thyroxine / T4)",
    "indications": {
      "en": "Primary, secondary, and tertiary hypothyroidism, myxedema coma (IV/PO), pituitary TSH suppression in thyroid cancer.",
      "id": "Hipotiroidisme primer, sekunder, dan tersier, koma miksedema (IV/PO), supresi TSH pada kanker tiroid."
    },
    "contraindications": {
      "en": "Untreated subclinical or overt thyrotoxicosis, acute uncorrected adrenal insufficiency (initiating thyroid hormone can precipitate fatal adrenal crisis), acute myocardial infarction.",
      "id": "Tirotoksikosis yang belum diobati, insufisiensi adrenal akut yang belum dikoreksi (memicu krisis adrenal fatal), infark miokard akut."
    },
    "dosing": {
      "dosePerKg": 1.6,
      "unit": "mcg",
      "maxDose": 200,
      "frequency": "Once daily on empty stomach (30-60 min before breakfast)",
      "bolusDose": "Adult Hypothyroidism: 1.6 mcg/kg/day PO (young healthy adults: 100-125 mcg/day; elderly or coronary disease: start 12.5 - 25 mcg/day); Myxedema coma: 200 - 400 mcg IV loading",
      "notes": {
        "en": "Must be taken on an empty stomach with a full glass of water, 30-60 minutes before breakfast. Separate by at least 4 hours from calcium, iron, or antacids.",
        "id": "Wajib diminum saat perut kosong dengan segelas air putih, 30-60 menit sebelum sarapan. Pisahkan minimal 4 jam dari suplemen kalsium, zat besi, atau antasida."
      }
    },
    "onset": "Oral: 3 - 5 days for initial therapeutic response; 4 - 6 weeks for full biochemical steady state",
    "peak": "2 - 4 hours for absorption; peak tissue effect in 3-4 weeks",
    "duration": "1 - 3 weeks after discontinuation (terminal half-life 6-7 days)",
    "metabolism": "Deiodinated in peripheral tissues (liver and kidneys) to triiodothyronine (T3, active hormone).",
    "clinicalPearls": {
      "en": "Always rule out or treat coexisting adrenal insufficiency with hydrocortisone BEFORE starting levothyroxine to avoid triggering acute addisonian crisis. Monitor TSH every 6-8 weeks until stable. In coronary artery disease, 'start low and go slow' (12.5-25 mcg/day) to prevent angina or arrhythmias.",
      "id": "Selalu pastikan kecukupan adrenal sebelum memberikan levotiroksin; suplementasi hormon tiroid meningkatkan klirens kortisol dan dapat memicu krisis adrenal fatal. Pada PJK mulai dari dosis kecil (12.5-25 mcg/hari)."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Not for Treatment of Obesity or Weight Loss: Thyroid hormones should not be used alone or with other agents for the treatment of obesity.",
      "id": "Bukan untuk Pengobatan Obesitas: Dilarang keras digunakan untuk menurunkan berat badan."
    }
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
    "id": "lisinopril",
    "genericName": "Lisinopril",
    "brandNames": [
      "Zestril",
      "Prinivil",
      "Noperten",
      "Inhitril"
    ],
    "drugClass": "ACE Inhibitor (Non-Prodrug)",
    "indications": {
      "en": "Hypertension, congestive heart failure (adjunct), acute myocardial infarction (within 24h), diabetic nephropathy.",
      "id": "Hipertensi, gagal jantung kongestif, infark miokard akut (dalam 24 jam pertama), nefropati diabetik."
    },
    "contraindications": {
      "en": "Pregnancy, angioedema history, bilateral renal artery stenosis.",
      "id": "Kehamilan, riwayat angioedema, stenosis arteri renalis bilateral."
    },
    "dosing": {
      "dosePerKg": 0.15,
      "unit": "mg",
      "maxDose": 40,
      "frequency": "Once daily (q24h)",
      "bolusDose": "HTN: 10 mg PO once daily (initial 5 mg if elderly/renal); Heart failure: 2.5 - 5 mg once daily, titrate to 20 - 40 mg/day",
      "notes": {
        "en": "Pure active drug, not a prodrug; does not require hepatic activation. Safe in patients with severe hepatic impairment.",
        "id": "Bukan prodrug, langsung aktif tanpa metabolisme hepar; aman pada pasien dengan gangguan fungsi hepar berat."
      }
    },
    "onset": "1 hour",
    "peak": "6 hours",
    "duration": "24 hours",
    "metabolism": "Excreted 100% unchanged in urine; zero hepatic metabolism.",
    "clinicalPearls": {
      "en": "Only ACEI completely excreted unchanged renally without hepatic metabolism. Excellent choice in liver disease patients. Dose must be adjusted strictly according to CrCl.",
      "id": "Satu-satunya ACEI yang diekskresikan 100% utuh lewat ginjal tanpa metabolisme hepar. Pilihan utama pada pasien sirosis/hepatopati. Dosis disesuaikan CrCl."
    },
    "highRisk": false
  },
  {
    "id": "loperamide",
    "genericName": "Loperamide Hydrochloride",
    "brandNames": [
      "Imodium",
      "Lodia",
      "Renamid",
      "Motul"
    ],
    "drugClass": "Peripheral Mu-Opioid Receptor Agonist (Antidiarrheal)",
    "indications": {
      "en": "Symptomatic control of acute non-specific diarrhea, chronic diarrhea associated with inflammatory bowel disease, high-output ileostomy reduction.",
      "id": "Terapi simptomatik diare akut non-spesifik, diare kronis IBD, pengurangan output stoma ileostomi."
    },
    "contraindications": {
      "en": "Bloody diarrhea (dysentery), high fever, acute ulcerative colitis (risk of toxic megacolon), pseudomembranous colitis (C. difficile), children <2 years.",
      "id": "Diare berdarah (disentri), demam tinggi, kolitis ulseratif akut (risiko megakolon toksik), diare akibat C. difficile, anak <2 tahun."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "mg",
      "maxDose": 16,
      "frequency": "After each loose stool",
      "bolusDose": "Acute Diarrhea: Initial 4 mg (2 capsules) PO stat, followed by 2 mg after each unformed stool (max 16 mg/day; OTC max 8 mg/day)",
      "notes": {
        "en": "Acts locally on intestinal circular and longitudinal muscles. Discontinue if no improvement within 48 hours.",
        "id": "Bekerja lokal pada otot sirkular dan longitudinal usus. Hentikan jika tidak ada perbaikan dalam 48 jam."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "4 - 5 hours",
    "duration": "24 hours (elimination half-life 10.8 hours)",
    "metabolism": "Extensively metabolized by hepatic CYP3A4 and CYP2C8; active P-glycoprotein efflux at blood-brain barrier prevents CNS opioid effects at therapeutic doses.",
    "clinicalPearls": {
      "en": "Opioid that does not cross blood-brain barrier at therapeutic doses due to P-glycoprotein efflux pump. Massive supratherapeutic doses taken by abusers ('poor man's methadone') inhibit hERG potassium channels and cause fatal QTc prolongation, torsades de pointes, and cardiac arrest.",
      "id": "Opioid yang tidak menembus sawar otak pada dosis normal karena dipompa keluar oleh P-glikoprotein. Penyalahgunaan dosis masif sangat berbahaya karena memicu perpanjangan QTc, torsades de pointes, dan henti jantung mendadak."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Torsades de Pointes and Cardiac Arrest with higher than recommended doses.",
      "id": "Torsades de Pointes dan Henti Jantung Fatal pada penggunaan dosis di atas rekomendasi."
    }
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
    "id": "losartan",
    "genericName": "Losartan Potassium",
    "brandNames": [
      "Cozaar",
      "Insaar",
      "Angioten",
      "Acetensa"
    ],
    "drugClass": "Angiotensin II Receptor Blocker (ARB)",
    "indications": {
      "en": "Hypertension, diabetic nephropathy in Type 2 DM, stroke risk reduction in HTN with LVH (LIFE trial).",
      "id": "Hipertensi, nefropati diabetik pada DM tipe 2, reduksi risiko stroke pada hipertensi dengan LVH (LIFE trial)."
    },
    "contraindications": {
      "en": "Pregnancy, severe hepatic impairment, bilateral renal artery stenosis, concurrent aliskiren in diabetes.",
      "id": "Kehamilan, gangguan hepar berat, stenosis arteri renalis bilateral, penggunaan bersama aliskiren pada diabetes."
    },
    "dosing": {
      "dosePerKg": 0.7,
      "unit": "mg",
      "maxDose": 100,
      "frequency": "Once daily (or BID)",
      "bolusDose": "Initial: 50 mg PO once daily (25 mg if hypovolemic/elderly); max 100 mg once daily or divided BID",
      "notes": {
        "en": "Does not cause dry bradykinin cough typical of ACE inhibitors. Exhibits mild uricosuric property (lowers serum uric acid).",
        "id": "Tidak menyebabkan batuk kering bradikinin seperti ACEI. Memiliki efek urikosurik unik (menurunkan asam urat serum)."
      }
    },
    "onset": "1 hour",
    "peak": "3 - 4 hours (active metabolite EXP3174)",
    "duration": "24 hours",
    "metabolism": "Hepatic CYP2C9 and CYP3A4 to EXP3174 (10-40x more potent than parent). Biliary (60%) and renal (35%) excretion.",
    "clinicalPearls": {
      "en": "First-line alternative when ACE inhibitors cause cough or mild rash. Mild uricosuric effect makes it the ideal antihypertensive for patients with comorbid gout.",
      "id": "Alternatif lini pertama saat pasien mengalami batuk akibat ACEI. Efek urikosurik menjadikannya antihipertensi ideal pada pasien dengan komorbid asam urat/gout."
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
    "id": "metformin",
    "genericName": "Metformin Hydrochloride",
    "brandNames": [
      "Glucophage",
      "Glumin",
      "Formell",
      "Nevoril",
      "Diaformin"
    ],
    "drugClass": "Biguanide Oral Antidiabetic",
    "indications": {
      "en": "First-line pharmacotherapy for Type 2 Diabetes Mellitus, prediabetes, Polycystic Ovary Syndrome (PCOS).",
      "id": "Farmakoterapi lini pertama Diabetes Melitus Tipe 2, prediabetes, Sindrom Ovarium Polikistik (PCOS)."
    },
    "contraindications": {
      "en": "Severe renal impairment (eGFR <30 mL/min), acute or chronic metabolic acidosis, acute tissue hypoperfusion/hypoxia (sepsis, cardiogenic/hypovolemic shock, acute MI, severe heart failure).",
      "id": "Gagal ginjal berat (eGFR <30 mL/menit), asidosis metabolik/laktat, kondisi hipoksia jaringan akut (syok, sepsis, infark miokard akut)."
    },
    "dosing": {
      "dosePerKg": 10.0,
      "unit": "mg",
      "maxDose": 2000,
      "frequency": "BID or TID with meals",
      "bolusDose": "Initial: 500 mg PO BID or 850 mg once daily with meals; titrate weekly to 1000 mg BID or 850 mg TID (max 2000-2550 mg/day)",
      "notes": {
        "en": "Take with meals to minimize GI side effects. Check eGFR annually; do not initiate if eGFR 30-45 mL/min, max 1000 mg/day if eGFR drops to 30-44 mL/min.",
        "id": "Minum bersama makanan untuk meminimalkan mual/diare. Pantau eGFR berkala; jangan mulai jika eGFR 30-45, dosis maksimal 1000 mg/hari jika eGFR 30-44."
      }
    },
    "onset": "Days to weeks for glycemic control",
    "peak": "2 - 3 hours (immediate release); 4 - 8 hours (extended release)",
    "duration": "12 - 24 hours",
    "metabolism": "Not metabolized by liver; eliminated 100% unchanged in urine by tubular secretion. Half-life ~6.2 hours.",
    "clinicalPearls": {
      "en": "Inhibits hepatic gluconeogenesis via AMPK activation. Weight-neutral or promotes mild weight loss; zero intrinsic risk of hypoglycemia as monotherapy. Discontinue 48h before IV iodinated contrast procedures in patients with eGFR 30-60 mL/min to prevent lactic acidosis.",
      "id": "Menekan glukoneogenesis hepar lewat aktivasi AMPK. Berat badan netral/turun; bebas risiko hipoglikemia bila monoterapi. Tunda 48 jam sebelum tindakan kontras iodin bila eGFR 30-60 untuk mencegah asidosis laktat."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Lactic Acidosis: Rare but fatal accumulation can occur, especially in renal impairment, sepsis, hypoxemia, or excessive alcohol intake.",
      "id": "Asidosis Laktat: Akumulasi jarang namun fatal, terutama pada gangguan fungsi ginjal, sepsis, atau hipoksemia berat."
    }
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
      "dosePerKg": 0.14,
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
    "id": "metoprolol_succinate",
    "genericName": "Metoprolol Succinate (Extended Release)",
    "brandNames": [
      "Toprol-XL",
      "Seloken CR",
      "Betaloc CR"
    ],
    "drugClass": "Cardioselective Beta-1 Blocker (Extended Release)",
    "indications": {
      "en": "Heart failure with reduced ejection fraction (MERIT-HF trial), hypertension, angina pectoris.",
      "id": "Gagal jantung HFrEF (uji MERIT-HF), hipertensi, angina pektoris."
    },
    "contraindications": {
      "en": "Severe bradycardia (<45 bpm), 2nd or 3rd degree heart block, cardiogenic shock, decompensated heart failure.",
      "id": "Bradikardia berat (<45 bpm), blok AV derajat 2/3, syok kardiogenik, gagal jantung dekompensasi akut."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 200,
      "frequency": "Once daily (q24h)",
      "bolusDose": "HFrEF: Start 12.5 - 25 mg PO once daily; double every 2 weeks to target 200 mg PO once daily (MERIT-HF target dose); HTN: 25 - 100 mg daily",
      "notes": {
        "en": "Extended-release formulation releases drug at a zero-order constant rate over 24 hours. Must NOT be substituted 1:1 with short-acting metoprolol tartrate.",
        "id": "Sediaan lepas lambat melepaskan obat secara konstan selama 24 jam. JANGAN tertukar dengan metoprolol tartrat (durasi pendek)."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "6 - 12 hours",
    "duration": "24 hours",
    "metabolism": "Extensively hepatic by CYP2D6; renal elimination of inactive metabolites (95%).",
    "clinicalPearls": {
      "en": "One of only three beta-blockers proven to reduce mortality in heart failure (along with bisoprolol and carvedilol). Dose titration must reach the 200 mg daily target for full mortality benefit demonstrated in MERIT-HF.",
      "id": "Satu dari tiga beta-blocker yang terbukti menurunkan mortalitas pada gagal jantung (bersama bisoprolol dan karvedilol). Target dosis MERIT-HF adalah 200 mg/hari."
    },
    "highRisk": true
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
    "id": "misoprostol",
    "genericName": "Misoprostol",
    "brandNames": [
      "Cytotec",
      "Gastrul",
      "Noprostol",
      "Misotrol",
      "Invotec"
    ],
    "drugClass": "Prostaglandin E1 (PGE1) Analogue Uterotonic",
    "indications": {
      "en": "Postpartum hemorrhage (prevention and treatment when oxytocin is unavailable), medical abortion, cervical ripening for labor induction, NSAID ulcer prophylaxis.",
      "id": "Pencegahan & tata laksana perdarahan pasca salin (PPH) saat oksitosin tidak tersedia, induksi pematangan serviks, pencegahan tukak NSAID."
    },
    "contraindications": {
      "en": "Hypersensitivity to prostaglandins, prior uterine rupture or previous cesarean delivery (relative for labor induction due to rupture risk).",
      "id": "Hipersensitivitas prostaglandin, riwayat sesar sebelumnya (kontraindikasi relatif induksi karena risiko ruptur uteri)."
    },
    "dosing": {
      "dosePerKg": 10.0,
      "unit": "mcg",
      "maxDose": 1000,
      "frequency": "Single stat dose (Sublingual, Buccal, Oral, or Rectal)",
      "bolusDose": "PPH Treatment (WHO guideline): 800 mcg sublingually or rectally stat; PPH Prophylaxis: 400 - 600 mcg PO/SL stat; Cervical ripening: 25 mcg intravaginally q3-6h",
      "notes": {
        "en": "Sublingual administration provides fastest onset, highest peak concentration, and greatest bioavailability. Shivering and transient high fever (>38-40C) are common dose-dependent side effects.",
        "id": "Pemberian sublingual memberikan onset tercepat dan bioavailabilitas tertinggi. Menggigil hebat dan demam tinggi transien (>38-40C) adalah efek samping umum."
      }
    },
    "onset": "Sublingual: 8 minutes; Oral: 10 - 15 minutes; Rectal: 20 minutes",
    "peak": "Sublingual: 30 minutes; Oral: 30 minutes; Rectal: 60 - 90 minutes",
    "duration": "Sublingual: 3 hours; Rectal: 4 hours",
    "metabolism": "Rapid de-esterification to active misoprostol acid; hepatic fatty acid oxidizing systems; renal excretion (73%).",
    "clinicalPearls": {
      "en": "Stable at tropical room temperature without refrigeration, making it the essential life-saving uterotonic in resource-limited and rural settings where oxytocin cold-chain is unreliable. High fever up to 40C after 800 mcg is expected and resolves within hours (educate nurses not to confuse with sepsis).",
      "id": "Sangat stabil pada suhu ruangan tropis tanpa kulkas, menjadikannya penyelamat nyawa utama di daerah terpencil yang minim rantai dingin oksitosin. Demam hingga 40C setelah 800 mcg adalah wajar dan mereda dalam hitungan jam (jangan keliru dengan sepsis puerperalis)."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Uterine Rupture Risk when used for labor induction in patients with previous cesarean section; Teratogenicity.",
      "id": "Risiko Ruptur Uteri pada riwayat seksio sesarea; Teratogenik pada kehamilan muda."
    }
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
    "id": "acetylcysteine",
    "genericName": "N-Acetylcysteine (NAC / IV / Oral)",
    "brandNames": [
      "Fluimucil",
      "Parvolex",
      "Acetilcisteina",
      "Hidonac"
    ],
    "drugClass": "Antidote (Acetaminophen Overdose) / Mucolytic",
    "indications": {
      "en": "Acetaminophen (paracetamol) overdose toxicity (Rumack-Matthew nomogram), acute liver failure, contrast-induced nephropathy prevention, thick mucous plugging / mucolytic.",
      "id": "Keracunan / overdosis parasetamol (nomogram Rumack-Matthew), gagal hati akut, mukolitik dahak kental saluran napas."
    },
    "contraindications": {
      "en": "No absolute contraindications in life-threatening acetaminophen poisoning. Hypersensitivity / anaphylactoid reaction managed with slowing infusion and antihistamines.",
      "id": "Tidak ada kontraindikasi mutlak pada keracunan parasetamol yang mengancam nyawa. Reaksi anafilaktoid ditangani dengan memperlambat infus dan antihistamin."
    },
    "dosing": {
      "dosePerKg": 150.0,
      "unit": "mg",
      "maxDose": 21000,
      "frequency": "3-bag IV protocol or 72-hour oral protocol",
      "bolusDose": "IV 21-Hour Protocol: Bag 1: 150 mg/kg IV in 200 mL D5W over 60 min; Bag 2: 50 mg/kg IV in 500 mL D5W over 4h; Bag 3: 100 mg/kg IV in 1000 mL D5W over 16h (Total: 300 mg/kg)",
      "notes": {
        "en": "Replenishes glutathione stores, detoxifying the toxic reactive metabolite NAPQI into non-toxic mercapturic acid. Maximum hepatoprotection achieved when administered within 8 hours of acute ingestion.",
        "id": "Memulihkan cadangan glutation hepar, mendetoksifikasi metabolit toksik NAPQI menjadi asam merkapturat non-toksik. Efek proteksi hepar 100% jika diberikan dalam 8 jam pertama."
      }
    },
    "onset": "IV: immediate cellular glutathione replenishment; Oral: 30 - 60 minutes",
    "peak": "End of 1-hour loading infusion",
    "duration": "Continuous protocol duration",
    "metabolism": "Deacetylated in liver to L-cysteine, incorporated into glutathione; renal excretion (30%).",
    "clinicalPearls": {
      "en": "Anaphylactoid reactions (flushing, erythema, bronchospasm, hypotension) occur in up to 10-20% during the fast initial 1-hour loading infusion. Do NOT permanently stop NAC; pause or slow the infusion rate, administer IV diphenhydramine/antihistamine, and resume once symptoms resolve.",
      "id": "Reaksi anafilaktoid (kemerahan, bronkospasme, hipotensi) terjadi pada 10-20% saat loading infus cepat 1 jam pertama. JANGAN hentikan total; cukup perlambat laju infus, berikan difenhidramin IV, dan lanjutkan kembali setelah gejala mereda."
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
    "id": "omeprazole",
    "genericName": "Omeprazole",
    "brandNames": [
      "Prilosec",
      "Losec",
      "OMZ",
      "Ozid",
      "Lokev",
      "Dudencer"
    ],
    "drugClass": "Proton Pump Inhibitor (H+/K+-ATPase Inhibitor)",
    "indications": {
      "en": "Gastroesophageal Reflux Disease (GERD), peptic ulcer disease, acute upper GI bleeding (IV infusion), stress ulcer prophylaxis in ICU, H. pylori eradication regimen, Zollinger-Ellison syndrome.",
      "id": "GERD, tukak lambung dan duodenum, perdarahan saluran cerna atas akut, profilaksis tukak stres ICU, eradikasi H. pylori."
    },
    "contraindications": {
      "en": "Hypersensitivity to PPIs, concurrent use with rilpivirine.",
      "id": "Hipersensitivitas terhadap PPI, penggunaan bersama rilpivirin."
    },
    "dosing": {
      "dosePerKg": 0.6,
      "unit": "mg",
      "maxDose": 80,
      "frequency": "Once daily (30-60 min before breakfast) or continuous IV",
      "bolusDose": "GERD/Ulcer: 20 - 40 mg PO once daily 30-60 min before breakfast; Upper GI Bleed IV: 80 mg IV bolus over 30 min, then 8 mg/h continuous IV infusion x 72h",
      "notes": {
        "en": "Must be taken 30-60 minutes before the first meal of the day when parietal cell proton pumps are actively recruited. Capsules contain enteric-coated granules; do not crush or chew.",
        "id": "Wajib diminum 30-60 menit sebelum sarapan pagi saat pompa proton sel parietal paling aktif. Jangan gerus atau kunyah kapsul enteric-coated."
      }
    },
    "onset": "1 hour for acid suppression; full effect 3-4 days",
    "peak": "2 hours",
    "duration": "Up to 72 hours (irreversible covalent bonding to H+/K+ ATPase pump)",
    "metabolism": "Extensively hepatic via CYP2C19 (major) and CYP3A4 to inactive hydroxyomeprazole and omeprazole sulfone. Excreted in urine (80%) and feces (20%).",
    "clinicalPearls": {
      "en": "In upper GI bleeding, maintaining intragastric pH >6 promotes platelet aggregation and clot stabilization over ulcer bed. Competitively inhibits CYP2C19 (reduces clopidogrel activation by up to 40%; prefer pantoprazole in patients on DAPT). Chronic use associated with hypomagnesemia, C. difficile infection, and B12 deficiency.",
      "id": "Pada perdarahan lambung, menjaga pH lambung >6 sangat penting untuk stabilisasi bekuan darah trombosit. Menghambat CYP2C19 (mengurangi efektivitas klopidogrel; gunakan pantoprazol pada pasien stent). Penggunaan kronis memicu defisiensi B12 dan hipomagnesemia."
    },
    "highRisk": false
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
    "id": "oxytocin",
    "genericName": "Oxytocin",
    "brandNames": [
      "Pitocin",
      "Syntocinon",
      "Induxin",
      "Oxytocin Kalbe"
    ],
    "drugClass": "Uterotonic Hormone / Nonapeptide",
    "indications": {
      "en": "Postpartum hemorrhage (PPH) prevention and treatment (first-line uterotonic), labor induction and augmentation.",
      "id": "Pencegahan dan tata laksana perdarahan pasca persalinan (HPP / PPH) lini pertama, induksi dan augmentasi persalinan."
    },
    "contraindications": {
      "en": "Significant cephalopelvic disproportion, fetal distress where delivery is not imminent, uterine rupture risk (prior classical cesarean section), hyperactive/hypertonic uterus.",
      "id": "Disproporsi sefalopelvik signifikan, gawat janin saat persalinan belum iminen, riwayat sesar klasik (risiko ruptur uteri), hipertonus uteri."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "IU",
      "maxDose": 40,
      "frequency": "IV infusion / IM bolus",
      "bolusDose": "PPH Prophylaxis: 10 units IM immediately after delivery of anterior shoulder/infant, OR 5 units slow IV bolus (>1-2 min) followed by 20-40 units in 1000 mL crystalloid at 125-250 mL/h; PPH Treatment: up to 40 units in 1000 mL",
      "notes": {
        "en": "Rapid IV push causes marked systemic vasodilation, profound hypotension, reflex tachycardia, and myocardial ischemia. NEVER give rapid IV push bolus.",
        "id": "Suntikan bolus IV cepat memicu vasodilatasi sistemik masif, hipotensi berat, takikardia refleks, dan iskemia miokard. DILARANG KERAS memberikan bolus IV kilat."
      }
    },
    "onset": "IV: immediate (<1 minute); IM: 3 - 5 minutes",
    "peak": "IV: immediate; IM: 30 - 60 minutes",
    "duration": "IV: 20 - 30 minutes; IM: 2 - 3 hours",
    "metabolism": "Rapid hepatic, renal, and circulating placental oxytocinase degradation. Elimination half-life 1-6 minutes.",
    "clinicalPearls": {
      "en": "Gold standard uterotonic for PPH prophylaxis worldwide. Structurally similar to antidiuretic hormone (ADH/vasopressin); prolonged high-dose infusions with hypotonic fluids (e.g. D5W) can cause severe water intoxication, hyponatremia, seizures, and maternal coma.",
      "id": "Standar emas pencegahan perdarahan pasca salin (HPP). Berkerabat dengan hormon ADH; infus dosis tinggi berlarut-larut dengan cairan hipotonik dapat memicu intoksikasi air, hiponatremia berat, kejang, dan koma maternal."
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
    "id": "phenytoin",
    "genericName": "Phenytoin Sodium",
    "brandNames": [
      "Dilantin",
      "Kutoin",
      "Decatona",
      "Curelep"
    ],
    "drugClass": "Hydantoin Anticonvulsant (Voltage-Gated Sodium Channel Blocker)",
    "indications": {
      "en": "Status epilepticus (second-line IV bolus), generalized tonic-clonic seizures, focal seizures, post-craniotomy seizure prophylaxis.",
      "id": "Status epileptikus lini kedua (IV), kejang tonik-klonik umum, kejang fokal, profilaksis kejang pasca kraniotomi."
    },
    "contraindications": {
      "en": "Sinus bradycardia, sinoatrial block, second- and third-degree AV block, Adams-Stokes syndrome, hypersensitivity to hydantoins.",
      "id": "Sinus bradikardia, blok SA, blok AV derajat 2/3, sindrom Adams-Stokes, hipersensitivitas hidantoin."
    },
    "dosing": {
      "dosePerKg": 20.0,
      "unit": "mg",
      "maxDose": 1500,
      "frequency": "TID or BID (IV loading stat)",
      "bolusDose": "Status Epilepticus Loading: 20 mg/kg IV infused at a rate NOT exceeding 50 mg/min (elderly/cardiac: max 25 mg/min) in 0.9% NaCl only; Maintenance: 100 mg PO/IV TID (4-7 mg/kg/day)",
      "notes": {
        "en": "Must ONLY be diluted in 0.9% Normal Saline (precipitates instantly in dextrose solutions). Max IV infusion rate 50 mg/min to prevent cardiovascular collapse. Extravasation causes 'Purple Glove Syndrome'.",
        "id": "HANYA boleh dilarutkan dalam NaCl 0.9% (seketika mengkristal dalam cairan dekstrosa). Kecepatan infus maksimal 50 mg/menit untuk mencegah kolaps jantung. Ekstravasasi menyebabkan 'Purple Glove Syndrome'."
      }
    },
    "onset": "IV: 20 - 30 minutes; Oral: 2 - 4 hours",
    "peak": "End of IV infusion; Oral: 3 - 12 hours",
    "duration": "24 hours (half-life variable 12-36 hours due to non-linear kinetics)",
    "metabolism": "Hepatic saturation (Michaelis-Menten) kinetics via CYP2C9 and CYP2C19. Small dose increases can result in disproportionately massive toxic serum spikes.",
    "clinicalPearls": {
      "en": "Exhibits zero-order (non-linear) pharmacokinetics: enzyme saturation occurs within therapeutic range (10-20 mcg/mL). Toxicity manifests as horizontal nystagmus (>20 mcg/mL), ataxia and slurred speech (>30 mcg/mL), and coma/lethargy (>40 mcg/mL). Highly protein bound (90%); in hypoalbuminemia (albumin <4 g/dL), calculate corrected phenytoin level.",
      "id": "Memiliki farmakokinetik non-linear (Michaelis-Menten): kenaikan dosis sedikit dapat melipatgandakan kadar darah menjadi toksik. Gejala toksisitas: nistagmus (>20 mcg/mL), ataksia sempoyongan (>30 mcg/mL), dan koma (>40 mcg/mL). Hitung rumus koreksi pada hipoalbuminemia."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Cardiovascular Risk with Rapid Infusion: Infusion rate must not exceed 50 mg/min in adults; risk of severe hypotension and cardiac arrhythmias.",
      "id": "Risiko Kardiovaskular Infus Cepat: Laju infus dilarang melebihi 50 mg/menit; risiko hipotensi berat dan aritmia jantung mematikan."
    }
  },
  {
    "id": "phytomenadione",
    "genericName": "Phytomenadione / Vitamin K1",
    "brandNames": [
      "Konakion MM",
      "Neo-K",
      "Phytomenadione Generik",
      "K-Vit"
    ],
    "drugClass": "Coagulation Factor Coenzyme / Warfarin Antidote",
    "indications": {
      "en": "Warfarin-induced elevated INR and bleeding, prophylaxis and treatment of hemorrhagic disease of the newborn (vitamin K deficiency bleeding / VKDB), hypoprothrombinemia from malabsorption or prolonged antibiotics.",
      "id": "Pembalikan INR tinggi akibat warfarin dan perdarahan, profilaksis perdarahan defisiensi vitamin K pada bayi baru lahir (APGO/IDAI), hipoprotrombinemia."
    },
    "contraindications": {
      "en": "Hypersensitivity to phytomenadione. NEVER administer intravenously via rapid bolus (causes fatal anaphylaxis/cardiovascular collapse).",
      "id": "Hipersensitivitas. DILARANG KERAS disuntikkan bolus IV cepat (memicu anafilaksis dan henti jantung fatal)."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Stat dose, repeat in 12-24h if needed",
      "bolusDose": "Warfarin Life-Threatening Bleed: 5 - 10 mg slow IV infusion in 50 mL NS over >=30 min (with 4-factor PCC); Warfarin High INR (4.5-10 no bleed): 1 - 2.5 mg PO; Neonatal Prophylaxis: 1 mg IM single dose at birth (preterm: 0.5 mg IM)",
      "notes": {
        "en": "Requires slow IV administration over >=30 minutes. Oral route is preferred over SubQ or IM for non-emergent reversal because SubQ absorption is erratic and unpredictable.",
        "id": "Wajib diberikan infus IV lambat >=30 menit. Rute oral lebih disukai dibanding SubQ untuk koreksi non-emergensi karena absorpsi SubQ tidak teratur."
      }
    },
    "onset": "IV: 1 - 2 hours for initial coagulation response; Oral: 6 - 12 hours; Full INR correction 24 hours",
    "peak": "24 hours",
    "duration": "Several days to weeks",
    "metabolism": "Rapidly metabolized hepatically by glucuronidation and sulfation; excreted in bile (50%) and urine (20%).",
    "clinicalPearls": {
      "en": "Stimulates hepatic synthesis of active factors II, VII, IX, X, Protein C, and Protein S. In urgent life-threatening bleeding, Vitamin K alone takes 12-24 hours to synthesize new factors; ALWAYS co-administer 4-factor Prothrombin Complex Concentrate (PCC) or Fresh Frozen Plasma (FFP) for immediate replacement.",
      "id": "Menstimulasi sintesis faktor pembekuan II, VII, IX, X di hepar. Pada perdarahan darurat, Vitamin K butuh 12-24 jam untuk membentuk faktor baru; SELALU berikan bersama 4-factor PCC atau FFP untuk penggantian instan seketika."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Anaphylaxis and Fatal Reactions with IV and IM Injection: Severe reactions resembling anaphylaxis reported during and immediately after IV administration.",
      "id": "Reaksi Anafilaksis Fatal pada Suntikan IV Cepat: Reaksi kolaps kardiovaskular berat dilaporkan pada pemberian IV terlalu cepat."
    }
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
    "id": "prednisone",
    "genericName": "Prednisone",
    "brandNames": [
      "Pehacort",
      "Prednisone Generik",
      "Deltasone",
      "Rayos"
    ],
    "drugClass": "Intermediate-Acting Synthetic Glucocorticoid",
    "indications": {
      "en": "Acute exacerbation of asthma and COPD, systemic autoimmune diseases (SLE, rheumatoid arthritis, polymyalgia rheumatica), nephrotic syndrome, acute gout, allergic reactions.",
      "id": "Eksaserbasi akut asma dan PPOK, penyakit autoimun sistemik (Lupus/SLE, artritis reumatoid), sindrom nefrotik, serangan gout akut, reaksi alergi berat."
    },
    "contraindications": {
      "en": "Systemic fungal infections, live viral vaccines in patients receiving immunosuppressive doses.",
      "id": "Infeksi jamur sistemik, vaksin virus hidup pada dosis imunosupresif."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 60,
      "frequency": "Once daily with breakfast (morning)",
      "bolusDose": "Asthma/COPD Exacerbation: 40 - 50 mg PO once daily in morning x 5 days (no taper needed for <=5 days); Autoimmune/Nephrotic: 1 mg/kg/day PO (max 60-80 mg/day)",
      "notes": {
        "en": "Prodrug rapidly converted in liver by 11-beta-hydroxysteroid dehydrogenase type 1 into active prednisolone. Take in the morning to mimic natural physiological circadian cortisol rhythm.",
        "id": "Prodrug yang dikonversi di hepar menjadi prednisolon aktif. Minum pagi hari untuk meniru ritme sirkadian kortisol alami tubuh."
      }
    },
    "onset": "1 - 2 hours for cellular uptake; genomic anti-inflammatory effects take 4 - 8 hours",
    "peak": "1 - 2 hours",
    "duration": "18 - 36 hours (biological half-life)",
    "metabolism": "Rapid hepatic reduction to prednisolone; subsequent glucuronide conjugation and renal excretion.",
    "clinicalPearls": {
      "en": "Glucocorticoid to mineralocorticoid potency ratio is 4:0.8 (predominantly anti-inflammatory with minimal sodium retention compared to hydrocortisone). Courses >2-3 weeks cause hypothalamic-pituitary-adrenal (HPA) axis suppression requiring gradual taper. Provide 'stress-dose' steroids in perioperative stress if on chronic therapy.",
      "id": "Aktivitas antiinflamasi 4x lebih kuat dibanding hidrokortison dengan retensi cairan minimal. Penggunaan >2-3 minggu menekan aksis HPA dan butuh 'tapering off'. Berikan 'stress-dose steroid' saat operasi jika pasien dalam terapi kronis."
    },
    "highRisk": false
  },
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
    "id": "propranolol",
    "genericName": "Propranolol Hydrochloride",
    "brandNames": [
      "Inderal",
      "Farmadral",
      "Propranolol Dexa"
    ],
    "drugClass": "Non-Selective Beta-Adrenergic Blocker",
    "indications": {
      "en": "Thyroid storm / thyrotoxic crisis (inhibits peripheral T4 to T3 conversion), portal hypertension (variceal bleeding prophylaxis), essential tremor, performance anxiety, migraine prophylaxis, hypertrophic cardiomyopathy.",
      "id": "Krisis tiroid / badai tiroid (menghambat konversi T4 ke T3), hipertensi portal (pencegahan perdarahan varises esofagus), tremor esensial, profilaksis migrain."
    },
    "contraindications": {
      "en": "Bronchial asthma or active bronchospasm, severe sinus bradycardia, second- or third-degree AV block, cardiogenic shock, uncompensated heart failure.",
      "id": "Asma bronkial atau bronkospasme aktif, bradikardia sinus berat, blok AV derajat 2 atau 3, syok kardiogenik."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 160,
      "frequency": "BID to QID",
      "bolusDose": "Thyroid Storm: 60 - 80 mg PO q4-6h (or 1 - 2 mg slow IV q4h); Portal HTN: 20 - 40 mg PO BID (titrate to resting HR 55-60 bpm); Tremor/Migraine: 40 mg PO BID-TID",
      "notes": {
        "en": "High lipid solubility allows rapid crossing of the blood-brain barrier. In thyroid storm, high doses (>160 mg/day) directly block 5'-monodeiodinase, reducing serum T3 levels by ~30%.",
        "id": "Kelarutan lemak tinggi menembus sawar otak dengan cepat. Pada badai tiroid, dosis tinggi (>160 mg/hari) memblokade enzim deiodinase perifer, menurunkan T3 sebesar ~30%."
      }
    },
    "onset": "Oral: 30 - 60 minutes; IV: 2 - 5 minutes",
    "peak": "1 - 2 hours",
    "duration": "6 - 12 hours (half-life 3-5 hours)",
    "metabolism": "Extensive first-pass hepatic metabolism via CYP2D6 and CYP1A2 (bioavailability ~25%); excreted in urine (96%).",
    "clinicalPearls": {
      "en": "Drug of choice for rapid adrenergic and peripheral metabolic control in Thyroid Storm. First-line for primary and secondary prevention of esophageal variceal hemorrhage in cirrhosis (decreases portal venous inflow via splanchnic vasoconstriction and beta-1 cardiac output reduction).",
      "id": "Obat pilihan utama untuk kontrol adrenergik pada Badai Tiroid. Pilihan utama pencegahan perdarahan varises esofagus pada sirosis hepatis (menurunkan tekanan vena porta via vasokonstriksi splanknikus)."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Cardiac Ischemia after Abrupt Discontinuation: Exacerbation of angina and myocardial infarction reported following abrupt cessation.",
      "id": "Iskemia Jantung Pasca Penghentian Mendadak: Penghentian tiba-tiba memicu eksaserbasi angina dan infark miokard akut."
    }
  },
  {
    "id": "propylthiouracil",
    "genericName": "Propylthiouracil (PTU)",
    "brandNames": [
      "PTU Generik",
      "Propylthiouracil Dexa"
    ],
    "drugClass": "Thioamide Antithyroid Agent",
    "indications": {
      "en": "Thyroid storm / acute thyrotoxic crisis, hyperthyroidism in pregnancy (first trimester), Graves disease intolerant to methimazole.",
      "id": "Krisis tiroid / thyroid storm, hipertiroidisme pada kehamilan (khusus trimester pertama), penyakit Graves yang intoleran metimazol."
    },
    "contraindications": {
      "en": "Hypersensitivity, severe preexisting liver injury or acute hepatitis.",
      "id": "Hipersensitivitas, gangguan hepar berat atau hepatitis akut."
    },
    "dosing": {
      "dosePerKg": 5.0,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "q6-8h",
      "bolusDose": "Thyroid Storm: 500 - 1000 mg PO/NG loading, followed by 200 - 250 mg PO q4-6h; Chronic Hyperthyroidism: 100 - 150 mg PO TID",
      "notes": {
        "en": "Unique advantage over methimazole: inhibits peripheral conversion of T4 to T3 in addition to blocking thyroid hormone synthesis.",
        "id": "Keunggulan unik dibanding metimazol: menghambat konversi perifer T4 menjadi T3 selain memblokade sintesis hormon di tiroid."
      }
    },
    "onset": "Within 1 - 2 hours for peripheral T4-to-T3 inhibition; clinical euthyroid state takes 4-8 weeks",
    "peak": "1 - 2 hours",
    "duration": "6 - 8 hours (half-life 1-2 hours, requires TID/QID dosing)",
    "metabolism": "Hepatic glucuronidation; excreted in urine (35%).",
    "clinicalPearls": {
      "en": "Drug of choice in Thyroid Storm because it rapidly halts peripheral T4-to-T3 conversion. Preferred in 1st trimester of pregnancy because methimazole causes embryopathy (aplasia cutis). Risk of severe hepatotoxicity and agranulocytosis (educate patient to report sore throat or fever immediately).",
      "id": "Obat pilihan utama pada Badai Tiroid karena memotong konversi perifer T4 ke T3. Pilihan utama pada trimester pertama kehamilan karena metimazol menyebabkan aplasia kutis. Waspadai agranulositosis (laporkan demam/nyeri tenggorok)."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Severe Liver Injury and Acute Hepatic Failure; Preferred in First Trimester Pregnancy only.",
      "id": "Kerusakan Hati Berat dan Gagal Hati Akut; Hanya diutamakan pada Kehamilan Trimester Pertama."
    }
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
    "id": "quetiapine",
    "genericName": "Quetiapine Fumarate",
    "brandNames": [
      "Seroquel",
      "Q-Pin",
      "Seroquel XR"
    ],
    "drugClass": "Second-Generation Atypical Antipsychotic (D2/5-HT2A Antagonist)",
    "indications": {
      "en": "Hospital/ICU delirium (especially in Parkinson disease or Lewy body dementia where haloperidol is contraindicated), schizophrenia, bipolar depression and mania, major depressive disorder adjunct.",
      "id": "Delirium rumah sakit/ICU (terutama pada penyakit Parkinson di mana haloperidol kontraindikasi), skizofrenia, depresi dan mania bipolar."
    },
    "contraindications": {
      "en": "Hypersensitivity to quetiapine, comatose state.",
      "id": "Hipersensitivitas terhadap quetiapin, kondisi koma."
    },
    "dosing": {
      "dosePerKg": 0.5,
      "unit": "mg",
      "maxDose": 800,
      "frequency": "BID or QHS",
      "bolusDose": "Hospital Delirium / Agitation: 25 - 50 mg PO at bedtime (elderly start 12.5 - 25 mg PO; titrate to 50-100 mg BID as needed); Bipolar / Schizophrenia: 300 - 800 mg/day",
      "notes": {
        "en": "Lowest affinity for D2 receptors among all antipsychotics, resulting in virtually zero risk of extrapyramidal symptoms (EPS) or worsening of motor symptoms in Parkinson disease.",
        "id": "Afinitas reseptor D2 terendah di antara seluruh antipsikotik, sehingga bebas risiko gejala ekstrapiramidal (EPS) dan aman pada pasien Parkinson."
      }
    },
    "onset": "30 - 60 minutes",
    "peak": "1.5 hours",
    "duration": "12 hours (terminal half-life ~6-7 hours)",
    "metabolism": "Extensively hepatic via CYP3A4 to inactive metabolites; excreted in urine (73%) and feces (20%).",
    "clinicalPearls": {
      "en": "Drug of choice for psychosis, agitation, and delirium in patients with underlying Parkinson Disease or Dementia with Lewy Bodies, where typical neuroleptics (haloperidol) can trigger irreversible rigidity and death. Strong H1 histamine blockade causes significant sedation (helpful for nocturnal delirium/sundowning).",
      "id": "Obat pilihan utama untuk psikosis, agitasi, dan delirium pada pasien Parkinson atau Demensia Lewy Body (di mana haloperidol dilarang keras). Blokade H1 kuat memberikan efek penenang tidur yang sangat baik untuk delirium malam hari (sundowning)."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Increased Mortality in Elderly Patients with Dementia-Related Psychosis; Suicidal Thoughts and Behaviors.",
      "id": "Peningkatan Mortalitas pada Pasien Lansia dengan Psikosis Terkait Demensia; Ide Bunuh Diri pada Usia Muda."
    }
  },
  {
    "id": "ramipril",
    "genericName": "Ramipril",
    "brandNames": [
      "Altace",
      "Triatec",
      "Ramipril Dexa",
      "Hyperil"
    ],
    "drugClass": "ACE Inhibitor (Long-Acting Prodrug)",
    "indications": {
      "en": "Hypertension, heart failure post-MI, reduction in risk of MI, stroke, and cardiovascular death in high-risk patients (HOPE trial), diabetic nephropathy.",
      "id": "Hipertensi, gagal jantung pasca-MI, reduksi risiko stroke/MI/kematian KV pada risiko tinggi (HOPE trial), nefropati diabetik."
    },
    "contraindications": {
      "en": "Pregnancy, bilateral renal artery stenosis, angioedema with previous ACE inhibitor, concomitant aliskiren in diabetes.",
      "id": "Kehamilan, stenosis arteri renalis bilateral, riwayat angioedema ACEI, penggunaan bersama aliskiren pada diabetes."
    },
    "dosing": {
      "dosePerKg": 0.05,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Once daily (q24h)",
      "bolusDose": "Initial: 2.5 mg PO once daily (1.25 mg if on diuretics/renal impairment); titrate to 5 - 10 mg once daily",
      "notes": {
        "en": "Prodrug bioactivated in liver to ramiprilat. Can be taken with or without food.",
        "id": "Prodrug yang dibioaktivasi di hepar menjadi ramiprilat. Dapat diminum bersama atau tanpa makanan."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "3 - 6 hours",
    "duration": "24 hours",
    "metabolism": "Hepatic cleavage to active metabolite ramiprilat (6x more potent than parent); renal elimination (60%).",
    "clinicalPearls": {
      "en": "Proven survival and cardiovascular protection in HOPE trial. Mild Cr increase (<30%) is hemodynamically expected and acceptable.",
      "id": "Terbukti memberikan proteksi kardiovaskular dan memperpanjang harapan hidup (HOPE trial). Peningkatan kreatinin ringan (<30%) wajar secara hemodinamik."
    },
    "highRisk": false,
    "blackBoxWarning": {
      "en": "Fetal Toxicity: Black box warning for pregnancy category D (2nd and 3rd trimester). Discontinue as soon as pregnancy is confirmed.",
      "id": "Toksisitas Fetal: Kontraindikasi mutlak pada kehamilan trimester 2 dan 3. Hentikan segera saat hamil."
    }
  },
  {
    "id": "insulin_regular",
    "genericName": "Regular Human Insulin (Short-Acting)",
    "brandNames": [
      "Humulin R",
      "Actrapid",
      "Novolin R",
      "Insuman Rapid"
    ],
    "drugClass": "Short-Acting Human Insulin",
    "indications": {
      "en": "Diabetic Ketoacidosis (DKA), Hyperosmolar Hyperglycemic State (HHS), severe perioperative hyperglycemia, hyperkalemia emergency shift (with D50W), routine mealtime T1DM/T2DM control.",
      "id": "Ketoasidosis Diabetik (KAD), Status Hiperosmolar Hiperglikemik (HHS), hiperglikemia perioperatif, kedaruratan hiperkalemia (bersama D50), kontrol DM tipe 1 & 2."
    },
    "contraindications": {
      "en": "Hypoglycemia (blood glucose <70 mg/dL), uncorrected hypokalemia (insulin drives K+ into cells, precipitating fatal arrhythmias).",
      "id": "Hipoglikemia (GDS <70 mg/dL), hipokalemia yang belum dikoreksi (insulin memasukkan K+ ke intrasel, memicu aritmia fatal)."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "IU",
      "maxDose": 100,
      "frequency": "AC meals (SubQ) or Continuous IV infusion",
      "bolusDose": "DKA IV infusion: 0.14 units/kg/h continuous IV (or 0.1 units/kg IV bolus followed by 0.1 units/kg/h); Hyperkalemia: 10 units IV with 50 mL D50W over 15-30 min; SubQ meal: 0.1 - 0.2 units/kg 30 min before meals",
      "notes": {
        "en": "Only insulin form approved for continuous intravenous infusion. When preparing IV infusion, flush 50 mL through tubing as insulin binds to PVC plastic.",
        "id": "Satu-satunya bentuk insulin yang lazim untuk infus intravena kontinu. Saat menyiapkan infus, bilas 50 mL cairan melalui selang infus karena insulin menempel pada plastik PVC."
      }
    },
    "onset": "IV: 10 - 15 minutes; SubQ: 30 - 60 minutes",
    "peak": "IV: 15 - 30 minutes; SubQ: 2 - 4 hours",
    "duration": "IV: 30 - 60 minutes; SubQ: 6 - 8 hours",
    "metabolism": "Hepatic (50%), renal (30%), and muscle/adipose degradation by insulinase. Elimination half-life IV ~5-10 minutes.",
    "clinicalPearls": {
      "en": "In DKA, do not start insulin if serum potassium is <3.3 mEq/L (replete K+ first). Target blood glucose decrease in DKA is 50-75 mg/dL per hour. In hyperkalemia shift, 10 units Regular Insulin + 50 mL D50W drops serum K+ by 0.5-1.0 mEq/L within 30 minutes.",
      "id": "Pada KAD jangan berikan insulin bila K+ <3.3 mEq/L (koreksi kalium dulu). Target penurunan GDS pada KAD adalah 50-75 mg/dL per jam. Pada hiperkalemia, 10 IU Insulin Reguler + 50 mL D50W menurunkan K+ sebesar 0.5-1.0 mEq/L dalam 30 menit."
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
    "id": "rivaroxaban",
    "genericName": "Rivaroxaban",
    "brandNames": [
      "Xarelto"
    ],
    "drugClass": "Direct Oral Factor Xa Inhibitor (DOAC)",
    "indications": {
      "en": "Non-valvular atrial fibrillation stroke prevention, treatment and secondary prevention of DVT and PE, VTE thromboprophylaxis post-orthopedic surgery, CAD/PAD vascular protection (COMPASS trial).",
      "id": "Pencegahan stroke pada fibrilasi atrium non-valvular, terapi DVT/PE, profilaksis pasca bedah ortopedi, proteksi vaskular PAD/CAD (uji COMPASS)."
    },
    "contraindications": {
      "en": "Active clinically significant bleeding, hepatic disease with coagulopathy (Child-Pugh B or C), CrCl <15 mL/min, mechanical heart valves, antiphospholipid syndrome.",
      "id": "Perdarahan aktif bermakna, sirosis Child-Pugh B/C, CrCl <15 mL/menit, katup jantung mekanik, sindrom antifosfolipid."
    },
    "dosing": {
      "dosePerKg": 0.28,
      "unit": "mg",
      "maxDose": 20,
      "frequency": "Once daily with evening meal (or BID during acute DVT loading)",
      "bolusDose": "NVAF: 20 mg PO once daily with evening meal (15 mg if CrCl 15-49 mL/min); Acute DVT/PE: 15 mg PO BID with food x 21 days, then 20 mg once daily",
      "notes": {
        "en": "Doses >=15 mg MUST be taken with food (fasting bioavailability drops from 100% to 66%). No routine coagulation monitoring required.",
        "id": "Dosis >=15 mg WAJIB diminum bersama makanan (pada kondisi puasa absorpsi anjlok dari 100% ke 66%). Tidak memerlukan pemantauan INR rutin."
      }
    },
    "onset": "2 - 4 hours (rapid)",
    "peak": "2 - 4 hours",
    "duration": "24 hours (terminal half-life 5-9h in young, 11-13h in elderly)",
    "metabolism": "Dual elimination: 66% metabolized by liver (CYP3A4/3A5, CYP2J2), 33% excreted unchanged by kidneys via P-gp/BCRP.",
    "clinicalPearls": {
      "en": "Fixed dosing without food for 10 mg (prophylaxis), but 15 mg and 20 mg have obligate food requirement for absorption. Hold 24 hours prior to low-bleeding risk surgery and 48 hours for high-risk / neuraxial anesthesia. Specific reversal agent: Andexanet alfa.",
      "id": "Dosis 15 mg dan 20 mg wajib diminum dengan makan malam untuk absorpsi maksimal. Hentikan 24 jam sebelum prosedur risiko rendah dan 48 jam sebelum anestesi spinal/epidural. Antidotum spesifik: Andeksanet alfa."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Premature Discontinuation Increases Risk of Thrombotic Events; Epidural/Spinal Hematoma Risk with Neuraxial Anesthesia.",
      "id": "Penghentian Prematur Meningkatkan Risiko Trombosis; Risiko Hematoma Spinal/Epidural pada Anestesi Neuraksial."
    }
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
    "id": "sacubitril_valsartan",
    "genericName": "Sacubitril / Valsartan",
    "brandNames": [
      "Entresto",
      "Uperio"
    ],
    "drugClass": "Angiotensin Receptor-Neprilysin Inhibitor (ARNI)",
    "indications": {
      "en": "Heart failure with reduced ejection fraction (HFrEF; PARADIGM-HF trial demonstrated 20% reduction in CV death and hospitalizations), heart failure with preserved ejection fraction (HFpEF; PARAGON-HF trial).",
      "id": "Gagal jantung HFrEF (uji PARADIGM-HF memangkas kematian KV dan hospitalisasi sebesar 20%), gagal jantung HFpEF (PARAGON-HF)."
    },
    "contraindications": {
      "en": "History of angioedema with any ACE inhibitor or ARB, concurrent use with ACE inhibitors (MANDATORY 36-hour washout period before starting ARNI to prevent life-threatening angioedema), pregnancy.",
      "id": "Riwayat angioedema, penggunaan bersama ACE inhibitor (WAJIB 'washout' minimal 36 jam untuk mencegah angioedema mematikan), kehamilan."
    },
    "dosing": {
      "dosePerKg": 0.7,
      "unit": "mg",
      "maxDose": 200,
      "frequency": "BID (q12h)",
      "bolusDose": "Initial: 24/26 mg (50 mg) PO BID (or 49/51 mg [100 mg] PO BID if previously on high-dose ACEI/ARB); double every 2-4 weeks to target 97/103 mg (200 mg) PO BID",
      "notes": {
        "en": "Combines neprilysin inhibitor (sacubitril, boosting endogenous natriuretic peptides BNP, ANP, bradykinin, and adrenomedullin) with ARB (valsartan, blocking AT1 receptor).",
        "id": "Menggabungkan penghambat neprilisin (sacubitril, meningkatkan hormon peptida natriuretik endogen) dengan ARB (valsartan)."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "Sacubitrilat: 2 hours; Valsartan: 1.5 - 3 hours",
    "duration": "12 hours (elimination half-life ~12 hours)",
    "metabolism": "Sacubitril rapidly bioactivated by esterases to active neprilysin inhibitor LBQ657; valsartan minimally metabolized. Excreted in urine (52-68%) and feces (37-48%).",
    "clinicalPearls": {
      "en": "Replaces ACEI/ARB as class I cornerstone therapy for HFrEF. Because sacubitril inhibits neprilysin, plasma BNP is degraded more slowly and will be falsely elevated; use NT-proBNP (not degraded by neprilysin) to assess true heart failure decompensation. Strict 36-hour washout when switching from ACE inhibitor.",
      "id": "Fondasi kelas 1 menggantikan ACEI/ARB pada gagal jantung HFrEF. Karena neprilisin dihambat, kadar BNP akan meningkat palsu; gunakan NT-proBNP untuk evaluasi dekompensasi jantung. Wajib jeda 36 jam saat alih obat dari golongan ACEI."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Fetal Toxicity: Can cause fetal harm and death when administered during pregnancy.",
      "id": "Toksisitas Fetal: Menyebabkan cedera dan kematian janin jika diminum saat hamil."
    }
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
    "id": "salbutamol_inhaler",
    "genericName": "Salbutamol / Albuterol (MDI / Nebulizer)",
    "brandNames": [
      "Ventolin",
      "Asthalin",
      "Combivent",
      "Fartolin",
      "Salbuven"
    ],
    "drugClass": "Short-Acting Beta-2 Agonist (SABA Bronchodilator)",
    "indications": {
      "en": "Acute asthma exacerbation, acute bronchospasm, COPD exacerbation, exercise-induced bronchospasm prophylaxis, hyperkalemia emergency shift.",
      "id": "Eksaserbasi asma akut, bronkospasme akut, eksaserbasi PPOK, profilaksis asma induksi olahraga, terapi darurat hiperkalemia."
    },
    "contraindications": {
      "en": "Hypersensitivity to salbutamol or albuterol.",
      "id": "Hipersensitivitas terhadap salbutamol."
    },
    "dosing": {
      "dosePerKg": 0.1,
      "unit": "mg",
      "maxDose": 5,
      "frequency": "PRN (q20m x 3 in acute crisis, then q1-4h)",
      "bolusDose": "Acute Bronchospasm MDI: 4 - 8 puffs (100 mcg/puff) via spacer q20 min x 3 doses; Nebulizer: 2.5 - 5 mg nebulized in 3 mL NS q20 min x 3; Hyperkalemia: 10 - 20 mg nebulized",
      "notes": {
        "en": "High-dose nebulized salbutamol (10-20 mg = 4-8 nebules) shifts potassium intracellularly, lowering serum K+ by 0.5 - 1.0 mEq/L within 30 minutes.",
        "id": "Salbutamol nebulisasi dosis tinggi (10-20 mg = 4-8 nebules) memasukkan kalium ke intraseluler, menurunkan K+ serum 0.5-1.0 mEq/L dalam 30 menit."
      }
    },
    "onset": "Inhaled: 3 - 5 minutes; Nebulized: 5 minutes",
    "peak": "30 - 60 minutes",
    "duration": "3 - 6 hours",
    "metabolism": "Hepatic conjugation to inactive salbutamol 4'-O-sulfate; excreted in urine (80-90%).",
    "clinicalPearls": {
      "en": "First-line bronchodilator for intraoperative wheezing and acute bronchospasm. Common side effects: tachycardia, skeletal muscle tremor, hypokalemia, and transient paradoxical ventilation-perfusion mismatch. Always use a spacer with MDI for 4x higher lung deposition.",
      "id": "Bronkodilator lini pertama bronkospasme akut kamar operasi dan IGD. Efek samping: takikardia, tremor otot rangka, dan hipokalemia. Selalu gunakan 'spacer' pada MDI untuk deposisi paru 4x lebih baik."
    },
    "highRisk": false
  },
  {
    "id": "semaglutide",
    "genericName": "Semaglutide (SubQ / Oral)",
    "brandNames": [
      "Ozempic",
      "Rybelsus",
      "Wegovy"
    ],
    "drugClass": "Glucagon-Like Peptide-1 (GLP-1) Receptor Agonist",
    "indications": {
      "en": "Type 2 Diabetes Mellitus glycemic control, major adverse cardiovascular event (MACE) reduction (SUSTAIN-6 trial), chronic weight management in obesity (STEP trials), heart failure with preserved ejection fraction and obesity (STEP-HFpEF).",
      "id": "Kontrol glukosa DM Tipe 2, reduksi kejadian kardiovaskular mayor (MACE), tata laksana obesitas kronis, gagal jantung HFpEF dengan obesitas."
    },
    "contraindications": {
      "en": "Personal or family history of medullary thyroid carcinoma (MTC), Multiple Endocrine Neoplasia syndrome type 2 (MEN 2), history of severe pancreatitis, pregnancy.",
      "id": "Riwayat pribadi/keluarga karsinoma tiroid meduler (MTC), sindrom MEN 2, riwayat pankreatitis berat, kehamilan."
    },
    "dosing": {
      "dosePerKg": 0.01,
      "unit": "mg",
      "maxDose": 2.4,
      "frequency": "Once weekly (SubQ) or Once daily on empty stomach (Oral Rybelsus)",
      "bolusDose": "SubQ Ozempic: Start 0.25 mg SubQ once weekly x 4 weeks, escalate to 0.5 mg weekly; if needed after 4 weeks increase to 1.0 mg weekly (max 2.0 mg for T2D, 2.4 mg Wegovy for obesity); Oral Rybelsus: 3 mg daily x 30 days, then 7 mg daily",
      "notes": {
        "en": "Slows gastric emptying significantly. High risk of pulmonary aspiration during induction of general anesthesia! ASA consensus guidelines recommend holding weekly GLP-1 RAs for 1 week prior to elective surgery and performing gastric ultrasound.",
        "id": "Memperlambat pengosongan lambung secara signifikan. Risiko tinggi aspirasi paru saat induksi anestesi umum! Panduan ASA menganjurkan menunda semaglutide 1 minggu sebelum operasi elektif dan evaluasi USG lambung."
      }
    },
    "onset": "Glucose lowering within days; maximum weight loss over 20 - 68 weeks",
    "peak": "1 - 3 days post SubQ dose",
    "duration": "1 week (terminal elimination half-life ~1 week / 168 hours)",
    "metabolism": "Proteolytic cleavage of peptide backbone and beta-oxidation of fatty acid side chain; excreted in urine and feces.",
    "clinicalPearls": {
      "en": "Produces unprecedented average weight loss of 15-18% in clinical trials. Causes profound delayed gastric emptying, nausea, vomiting, and constipation. Perioperative alert: Gastric ultrasound frequently reveals full stomach ('frosted glass' antrum) even after standard 8-hour fasting; consider Rapid Sequence Induction (RSI) if not held.",
      "id": "Menghasilkan penurunan berat badan rata-rata 15-18%. Sangat memperlambat pengosongan lambung. Peringatan anestesi: Pasien sering kali masih memiliki lambung penuh meski sudah puasa 8 jam; lakukan RSI bila obat belum ditunda 1 minggu."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Risk of Thyroid C-Cell Tumors (Medullary Thyroid Carcinoma).",
      "id": "Risiko Tumor Sel C Tiroid (Karsinoma Tiroid Meduler)."
    }
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
    "id": "sodium_valproate",
    "genericName": "Sodium Valproate / Valproic Acid",
    "brandNames": [
      "Depakote",
      "Divalpro",
      "Epilim",
      "Falpro",
      "Ikalep"
    ],
    "drugClass": "Broad-Spectrum Anticonvulsant / Mood Stabilizer",
    "indications": {
      "en": "Generalized and focal seizures, status epilepticus, acute bipolar mania, migraine prophylaxis.",
      "id": "Kejang umum dan fokal, status epileptikus, mania bipolar akut, profilaksis migrain kronis."
    },
    "contraindications": {
      "en": "Pregnancy (major teratogen: neural tube defects, lower IQ), severe hepatic disease/dysfunction, urea cycle disorders, mitochondrial disorders (POLG mutations).",
      "id": "Kehamilan (teratogenik berat: spina bifida, defisit IQ), gangguan hepar berat, gangguan siklus urea, mutasi POLG mitokondria."
    },
    "dosing": {
      "dosePerKg": 20.0,
      "unit": "mg",
      "maxDose": 3000,
      "frequency": "BID or TID",
      "bolusDose": "Status Epilepticus: 40 mg/kg IV over 5-10 min (max 3000 mg); Maintenance: 15 - 30 mg/kg/day PO divided BID/TID (titrate to serum level 50-100 mcg/mL)",
      "notes": {
        "en": "Therapeutic trough level: 50 - 100 mcg/mL. High plasma protein binding (~90%), saturable at higher levels.",
        "id": "Kadar terapeutik darah: 50 - 100 mcg/mL. Ikatan protein plasma tinggi (~90%), tersaturasi pada kadar tinggi."
      }
    },
    "onset": "IV: 5 - 15 minutes; Oral: 1 - 2 hours",
    "peak": "1 - 4 hours",
    "duration": "12 - 24 hours (half-life 9-16 hours)",
    "metabolism": "Extensively hepatic via glucuronidation (30-50%) and mitochondrial beta-oxidation (40%). CYP-mediated oxidation is minor (<10%).",
    "clinicalPearls": {
      "en": "Broadest-spectrum antiepileptic available. Potent CYP and UGT inhibitor (markedly doubles lamotrigine levels; risk of toxic epidermal necrolysis). Causes hyperammonemic encephalopathy with normal LFTs. Antidote for valproate-induced hyperammonemia: L-carnitine.",
      "id": "Antiepilepsi spektrum paling luas. Menghambat metabolisme lamotrigin (meningkatkan kadar 2x lipat; risiko sindrom Stevens-Johnson). Dapat memicu ensefalopati hiperamoniemia meski SGOT/SGPT normal. Antidotum: L-karnitin."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Hepatic Failure (especially age <2y), Teratogenicity (neural tube defects), Pancreatitis.",
      "id": "Gagal Hati Fatal (terutama anak <2 tahun), Teratogenisitas Berat (defek bumbung saraf), Pankreatitis Akut."
    }
  },
  {
    "id": "spironolactone",
    "genericName": "Spironolactone",
    "brandNames": [
      "Aldactone",
      "Carpiaton",
      "Spirolactone",
      "Letonal"
    ],
    "drugClass": "Mineralocorticoid Receptor Antagonist (Aldosterone Blocker)",
    "indications": {
      "en": "HFrEF (RALES trial), resistant hypertension, primary hyperaldosteronism (Conn syndrome), cirrhotic ascites, hypokalemia.",
      "id": "Gagal jantung HFrEF (RALES trial), hipertensi resisten, hiperaldosteronisme primer, asites sirosis hepatis, hipokalemia."
    },
    "contraindications": {
      "en": "Hyperkalemia (serum K+ >5.0 mEq/L), severe renal impairment (eGFR <30 mL/min or Cr >2.5 mg/dL in men, >2.0 in women), Addison disease.",
      "id": "Hiperkalemia (K+ >5.0 mEq/L), gagal ginjal berat (eGFR <30 mL/menit), penyakit Addison."
    },
    "dosing": {
      "dosePerKg": 0.7,
      "unit": "mg",
      "maxDose": 100,
      "frequency": "Once daily (morning)",
      "bolusDose": "HFrEF: 12.5 - 25 mg PO once daily (titrate to 50 mg); Ascites: 100 mg PO once daily (ratio 100 mg spirono : 40 mg furosemide); HTN: 25 - 50 mg/day",
      "notes": {
        "en": "Potassium-sparing diuretic. Monitor serum potassium and creatinine at 1 week, 4 weeks, and every 3-6 months. Avoid potassium supplements and NSAIDs.",
        "id": "Diuretik hemat kalium. Pantau kalium dan kreatinin pada minggu ke-1, ke-4, dan tiap 3-6 bulan. Hindari suplemen kalium dan NSAID."
      }
    },
    "onset": "2 - 3 days (slow peak diuretic effect)",
    "peak": "2 - 3 days",
    "duration": "48 - 72 hours (active metabolites canrenone and 7-alpha-thiomethylspironolactone)",
    "metabolism": "Rapid and extensive hepatic conversion to active metabolites (canrenone half-life 16-20h). Excreted in urine and bile.",
    "clinicalPearls": {
      "en": "Blocks aldosterone-mediated cardiac fibrosis and myocardial remodeling. In cirrhotic ascites, maintain the classic 100:40 mg Spironolactone-to-Furosemide ratio to preserve normokalemia. Gynecomastia occurs in ~10% with long-term use (switch to eplerenone).",
      "id": "Menghambat remodeling dan fibrosis miokard akibat aldosteron. Pada asites sirosis, jaga rasio klasik 100 mg Spironolakton : 40 mg Furosemid untuk menjaga normokalemia. Ginekomastia terjadi pada ~10% penggunaan kronis (ganti ke eplerenon)."
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
    "id": "sucralfate",
    "genericName": "Sucralfate",
    "brandNames": [
      "Inpepsa",
      "Neciblok",
      "Ulsafate",
      "Carafate",
      "Episan"
    ],
    "drugClass": "Gastric Mucosal Cytoprotective Agent (Aluminum-Sucrose Complex)",
    "indications": {
      "en": "Active duodenal and gastric ulcers, stress ulcer prophylaxis, radiation proctitis/esophagitis, NSAID-induced mucosal injury.",
      "id": "Tukak lambung dan duodenum aktif, profilaksis tukak stres, esofagitis/proktitis radiasi, pencegahan cedera mukosa NSAID."
    },
    "contraindications": {
      "en": "Hypersensitivity, patients with end-stage renal disease (aluminum accumulation and toxicity).",
      "id": "Hipersensitivitas, pasien gagal ginjal kronis terminal (akumulasi dan toksisitas aluminium)."
    },
    "dosing": {
      "dosePerKg": 15.0,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "QID (1h before meals and at bedtime)",
      "bolusDose": "Adults: 1 g (10 mL suspension or 1 tablet) PO 1 hour before meals and at bedtime (total 4 g/day) on an empty stomach",
      "notes": {
        "en": "Requires acidic gastric pH for activation; do not take within 30 minutes of antacids. Separates other oral medications by at least 2 hours as sucralfate binds and prevents their absorption.",
        "id": "Membutuhkan pH asam lambung untuk aktivasi pasta pelindung; jangan diminum bersamaan antasida. Pisahkan obat oral lain minimal 2 jam karena sukralfat mengikat obat lain."
      }
    },
    "onset": "1 - 2 hours",
    "peak": "Locally acting on ulcer crater",
    "duration": "Up to 6 hours (binds to ulcer proteins)",
    "metabolism": "Minimally absorbed (<5%); excreted 95% unchanged in feces. Absorbed aluminum is excreted by the kidneys.",
    "clinicalPearls": {
      "en": "Dissociates in acidic gastric environment into sucrose octasulfate and aluminum hydroxide, forming a viscous, negatively-charged paste that selectively binds positively-charged proteins in ulcer craters, creating a physical barrier against acid, pepsin, and bile salts. Does NOT alter gastric acid secretion.",
      "id": "Membentuk pasta kental bermuatan negatif yang menempel erat pada kawah luka tukak lambung, menciptakan 'plester pelindung' fisik terhadap asam lambung dan pepsin. Tidak mengubah produksi asam lambung."
    },
    "highRisk": false
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
    "id": "ticagrelor",
    "genericName": "Ticagrelor",
    "brandNames": [
      "Brilinta",
      "Possia"
    ],
    "drugClass": "Reversible Non-Thienopyridine P2Y12 Platelet Inhibitor",
    "indications": {
      "en": "Acute coronary syndrome (STEMI and NSTEMI/UA; PLATO trial demonstrated superior mortality reduction vs clopidogrel), post-PCI stenting, high-risk CAD with prior MI (PEGASUS-TIMI 54).",
      "id": "Sindrom koroner akut (STEMI, NSTEMI, UAP; uji PLATO menunjukkan penurunan mortalitas lebih unggul dibanding klopidogrel), pasca stent PCI."
    },
    "contraindications": {
      "en": "Active pathological bleeding, history of intracranial hemorrhage, severe hepatic impairment, concurrent strong CYP3A4 inhibitors/inducers.",
      "id": "Perdarahan aktif, riwayat perdarahan intrakranial, gangguan hepar berat."
    },
    "dosing": {
      "dosePerKg": 1.2,
      "unit": "mg",
      "maxDose": 180,
      "frequency": "BID (q12h)",
      "bolusDose": "ACS Loading: 180 mg PO single stat dose (two 90 mg tablets); Maintenance: 90 mg PO BID (after 1 year: 60 mg PO BID)",
      "notes": {
        "en": "Direct-acting drug, NOT a prodrug; does not require metabolic activation like clopidogrel. Reversibly binds the P2Y12 receptor at an allosteric site.",
        "id": "Bekerja langsung, bukan prodrug; tidak memerlukan aktivasi hepar seperti klopidogrel. Mengikat reseptor P2Y12 secara reversibel."
      }
    },
    "onset": "30 minutes (reaches >80% platelet inhibition in 2 hours)",
    "peak": "1.5 hours (parent), 2.5 hours (active metabolite AR-C124910XX)",
    "duration": "Platelet function recovers within 3 - 5 days post discontinuation",
    "metabolism": "Extensively hepatic via CYP3A4/5 to active metabolite AR-C124910XX (equipotent to parent); biliary and fecal elimination (58%), renal (26%).",
    "clinicalPearls": {
      "en": "Direct, reversible binding provides faster, more potent, and more consistent platelet inhibition than clopidogrel without resistance. Dyspnea (self-limiting, unrelated to bronchospasm or heart failure) occurs in 10-15% of patients due to adenosine reuptake inhibition. Hold 5 days prior to elective CABG.",
      "id": "Inhibisi trombosit jauh lebih konsisten dan kuat dibanding klopidogrel. Efek samping sesak napas (dyspnea) terjadi pada 10-15% akibat hambatan reuptake adenosin (bersifat jinak). Hentikan 5 hari sebelum operasi bypass CABG."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Bleeding Risk; Aspirin Doses Above 100 mg Daily Reduce Effectiveness of Ticagrelor.",
      "id": "Risiko Perdarahan; Dosis Aspirin Pendamping di Atas 100 mg/hari Menurunkan Efektivitas Tikagrelor."
    }
  },
  {
    "id": "tramadol",
    "genericName": "Tramadol Hydrochloride",
    "brandNames": [
      "Ultram",
      "Tramal",
      "Tradyl",
      "Centrasic",
      "Tradosik"
    ],
    "drugClass": "Centrally Acting Synthetic Opioid Analgesic / SNRI",
    "indications": {
      "en": "Moderate to moderately severe acute and chronic pain, multimodal postoperative analgesia.",
      "id": "Nyeri akut dan kronis derajat sedang hingga berat, analgesia multimodal pasca operasi."
    },
    "contraindications": {
      "en": "Severe respiratory depression, acute intoxication with alcohol/hypnotics/narcotics, concurrent use of MAO inhibitors within 14 days, children <12 years (or <18y post-tonsillectomy).",
      "id": "Depresi napas berat, intoksikasi alkohol/hipnotik, penggunaan MAOI dalam 14 hari, anak <12 tahun (atau <18 tahun pasca tonsilektomi)."
    },
    "dosing": {
      "dosePerKg": 1.0,
      "unit": "mg",
      "maxDose": 100,
      "frequency": "q6h PRN",
      "bolusDose": "Adults: 50 - 100 mg PO/IV q4-6h PRN (max 400 mg/day; elderly >75y max 300 mg/day)",
      "notes": {
        "en": "Dual mechanism of action: weak mu-opioid receptor agonist PLUS inhibition of serotonin and norepinephrine reuptake (SNRI). High emetic potential (always co-prescribe ondansetron/antiemetic).",
        "id": "Mekanisme ganda: agonis reseptor mu-opioid ditambah penghambatan reuptake serotonin dan norepinefrin (SNRI). Efek mual/muntah tinggi (selalu dampingi antiemetik)."
      }
    },
    "onset": "Oral: 30 - 60 minutes; IV: 10 - 15 minutes",
    "peak": "2 hours (oral)",
    "duration": "4 - 6 hours (half-life ~6 hours)",
    "metabolism": "Hepatic via CYP2D6 to active M1 metabolite (O-desmethyltramadol, which has 200-300x higher mu-opioid affinity than parent drug) and CYP3A4 to inactive M2.",
    "clinicalPearls": {
      "en": "Lowers seizure threshold; contraindicated in active epilepsy. High risk of Serotonin Syndrome when combined with SSRIs, SNRIs, or triptans. Ultra-rapid CYP2D6 metabolizers convert tramadol rapidly to active M1, putting them at high risk of fatal opioid respiratory depression (FDA contraindication in children). Naloxone reverses mu-opioid effects but does not reverse seizure risk.",
      "id": "Menurunkan ambang kejang (hati-hati pada riwayat epilepsi). Risiko tinggi Sindrom Serotonin jika digabung SSRI/SNRI. Pasien dengan enzim CYP2D6 ultra-rapid metabolizer menghasilkan metabolit M1 masif yang memicu henti napas fatal. Nalokson menetralkan efek opioid namun tidak menetralkan risiko kejang."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Addiction, Abuse, and Misuse; Life-Threatening Respiratory Depression; Accidental Ingestion; Ultra-Rapid Metabolism Risk in Children.",
      "id": "Ketergantungan dan Penyalahgunaan; Depresi Pernapasan Fatal; Bahaya Fatal pada Anak dengan Metabolisme Cepat CYP2D6."
    }
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
    "id": "ursodeoxycholic_acid",
    "genericName": "Ursodeoxycholic Acid (UDCA / Ursodiol)",
    "brandNames": [
      "Urdafalk",
      "Estazor",
      "Ursochol",
      "Deursil"
    ],
    "drugClass": "Hydrophilic Bile Acid / Hepatoprotective Choleretic",
    "indications": {
      "en": "Primary Biliary Cholangitis (PBC; slows disease progression and delays liver transplantation), intrahepatic cholestasis of pregnancy (IHCP), radiolucent gallstone dissolution in functioning gallbladder, total parenteral nutrition (TPN) cholestasis prevention.",
      "id": "Primary Biliary Cholangitis (PBC), kolestasis intrahepatik pada kehamilan (IHCP), melarutkan batu empedu kolesterol radiolusen, kolestasis akibat nutrisi parenteral total (TPN)."
    },
    "contraindications": {
      "en": "Acute cholecystitis, complete biliary obstruction, radio-opaque calcified gallstones, non-functioning gallbladder.",
      "id": "Kolesistitis akut, obstruksi total saluran empedu, batu empedu terkalsifikasi radioopak."
    },
    "dosing": {
      "dosePerKg": 13.0,
      "unit": "mg",
      "maxDose": 1000,
      "frequency": "BID or TID with meals",
      "bolusDose": "PBC: 13 - 15 mg/kg/day PO divided BID/TID with food; Cholestasis of Pregnancy: 10 - 15 mg/kg/day PO divided BID/TID; Gallstone Dissolution: 8 - 10 mg/kg/day in 2-3 divided doses",
      "notes": {
        "en": "Take with meals to enhance absorption. Replaces toxic hydrophobic bile acids (cholic and chenodeoxycholic acids) in the circulating bile pool.",
        "id": "Minum bersama makanan untuk penyerapan optimal. Menggantikan asam empedu hidrofobik yang hepatotoksik dalam sirkulasi empedu."
      }
    },
    "onset": "Biochemical improvement in LFTs within 2 - 4 weeks; gallstone dissolution takes 6 - 24 months",
    "peak": "1 - 3 hours",
    "duration": "Maintained with continuous therapy",
    "metabolism": "Undergoes extensive enterohepatic circulation (~80% extracted by liver on first pass); conjugated with glycine/taurine and excreted into bile; unabsorbed drug converted by colonic bacteria to lithocholic acid and eliminated in feces.",
    "clinicalPearls": {
      "en": "Naturally occurring hydrophilic tertiary bile acid. Protects cholangiocytes and hepatocytes from cytotoxic bile acid-induced apoptosis, stimulates hepatobiliary secretion, and reduces total serum bile acid levels in pregnancy, protecting the fetus from bile-acid induced sudden intrauterine demise.",
      "id": "Asam empedu hidrofilik pelindung sel hati. Melindungi sel hepatosit dari apoptosis, menstimulasi aliran empedu, dan memangkas kadar asam empedu darah pada kolestasis kehamilan (IHCP) sehingga mencegah kematian janin mendadak."
    },
    "highRisk": false
  },
  {
    "id": "valsartan",
    "genericName": "Valsartan",
    "brandNames": [
      "Diovan",
      "Valsartan Dexa",
      "Valpress"
    ],
    "drugClass": "Angiotensin II Receptor Blocker (ARB)",
    "indications": {
      "en": "Hypertension, heart failure with reduced ejection fraction (HFrEF; Val-HeFT trial), post-myocardial infarction LV dysfunction (VALIANT trial).",
      "id": "Hipertensi, gagal jantung HFrEF (Val-HeFT trial), disfungsi ventrikel kiri pasca infark miokard (VALIANT trial)."
    },
    "contraindications": {
      "en": "Pregnancy, severe hepatic impairment/cirrhosis, biliary obstruction, bilateral renal artery stenosis.",
      "id": "Kehamilan, gangguan hepar berat/sirosis, obstruksi bilier, stenosis arteri renalis bilateral."
    },
    "dosing": {
      "dosePerKg": 1.1,
      "unit": "mg",
      "maxDose": 320,
      "frequency": "Once daily (HTN) or BID (Heart Failure)",
      "bolusDose": "HTN: 80 - 160 mg PO once daily (max 320 mg); Heart failure: 40 mg PO BID, titrate up to 160 mg PO BID",
      "notes": {
        "en": "Food decreases AUC by 40%, but take consistently with or without food. In heart failure, target dose is 160 mg BID.",
        "id": "Makanan menurunkan AUC 40%, konsumsi secara konsisten. Pada gagal jantung target dosis adalah 160 mg BID."
      }
    },
    "onset": "2 hours",
    "peak": "4 - 6 hours",
    "duration": "24 hours",
    "metabolism": "Minimal hepatic metabolism (~20%); primarily excreted unchanged via bile/feces (83%) and urine (13%).",
    "clinicalPearls": {
      "en": "Extensively validated in post-MI and HFrEF patients. Component of ARNI (Entresto). Safe in renal insufficiency as 83% is eliminated via feces.",
      "id": "Tervalidasi kuat pada pasien pasca-MI dan HFrEF. Komponen utama ARNI (Entresto). Aman pada insufisiensi ginjal karena 83% eliminasi lewat feses/bilier."
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
    "id": "verapamil_oral",
    "genericName": "Verapamil Hydrochloride (Oral)",
    "brandNames": [
      "Isoptin",
      "Calan",
      "Vericard"
    ],
    "drugClass": "Non-Dihydropyridine Calcium Channel Blocker (Phenylalkylamine)",
    "indications": {
      "en": "Supraventricular tachycardia (PSVT prophylaxis), rate control in atrial fibrillation/flutter, chronic angina, hypertrophic obstructive cardiomyopathy, cluster headache prophylaxis.",
      "id": "Profilaksis takikardia supraventrikular (PSVT), kontrol laju fibrilasi atrium, angina pektoris, kardiomiopati hipertrofik, profilaksis sakit kepala klaster."
    },
    "contraindications": {
      "en": "HFrEF (LVEF <40%), cardiogenic shock, 2nd or 3rd degree AV block, severe hypotension, WPW syndrome with atrial fibrillation (can precipitate fatal ventricular fibrillation).",
      "id": "Gagal jantung HFrEF (LVEF <40%), syok kardiogenik, blok AV derajat 2/3, sindrom WPW dengan fibrilasi atrium (memicu VF fatal)."
    },
    "dosing": {
      "dosePerKg": 1.0,
      "unit": "mg",
      "maxDose": 480,
      "frequency": "TID or QID (or daily ER)",
      "bolusDose": "Oral: 80 - 120 mg PO TID (max 480 mg/day); Cluster Headache: 240 - 480 mg/day divided TID; IV acute PSVT: 2.5 - 5 mg slow IV over 2 min",
      "notes": {
        "en": "Most potent negative inotrope among calcium channel blockers. Severe constipation occurs in up to 30% of patients due to colonic smooth muscle inhibition.",
        "id": "Inotropik negatif terkuat di antara seluruh golongan CCB. Konstipasi berat terjadi pada hingga 30% pasien karena hambatan otot polos kolon."
      }
    },
    "onset": "Oral: 1 - 2 hours; IV: 1 - 5 minutes",
    "peak": "Oral: 1 - 2 hours; IV: 3 - 5 minutes",
    "duration": "Oral: 6 - 8 hours (ER: 24h); IV: 30 - 60 minutes",
    "metabolism": "Extensive first-pass hepatic metabolism (bioavailability only 20-35%) via CYP3A4 to active norverapamil. Excreted in urine (70%) and feces (16%).",
    "clinicalPearls": {
      "en": "Never combine IV verapamil with IV beta-blockers due to risk of fatal complete heart block and asystole. Potent inhibitor of P-glycoprotein and CYP3A4; doubles serum digoxin concentrations (mandatory 50% digoxin dose reduction when starting verapamil).",
      "id": "JANGAN PERNAH menggabungkan verapamil IV dengan beta-blocker IV karena risiko asistol dan total AV block fatal. Menggandakan kadar serum digoksin (wajib potong dosis digoksin 50%)."
    },
    "highRisk": true
  },
  {
    "id": "warfarin",
    "genericName": "Warfarin Sodium",
    "brandNames": [
      "Coumadin",
      "Simarc-2",
      "Warfarin Dexa",
      "Marevan"
    ],
    "drugClass": "Vitamin K Antagonist (Anticoagulant)",
    "indications": {
      "en": "Mechanical prosthetic heart valves, venous thromboembolism (DVT/PE treatment and prophylaxis), non-valvular atrial fibrillation with high stroke risk.",
      "id": "Katup jantung mekanik prostetik, tromboemboli vena (DVT/PE), fibrilasi atrium dengan risiko stroke tinggi."
    },
    "contraindications": {
      "en": "Pregnancy (teratogenic / fetal warfarin syndrome; except 2nd trimester mechanical valves with careful evaluation), active severe hemorrhage, high fall risk.",
      "id": "Kehamilan (sindrom warfarin janin teratogenik), perdarahan aktif berat, risiko jatuh tinggi."
    },
    "dosing": {
      "dosePerKg": 0.07,
      "unit": "mg",
      "maxDose": 10,
      "frequency": "Once daily (evening)",
      "bolusDose": "Initial: 2.5 - 5 mg PO once daily in evening; adjust according to INR (target 2.0-3.0 for AF/DVT, 2.5-3.5 for mechanical mitral valve)",
      "notes": {
        "en": "Inhibits Vitamin K epoxide reductase (VKORC1), depleting factors II, VII, IX, X and Protein C and S. Bridge with heparin/LMWH for at least 5 days until INR is therapeutic for 2 consecutive days.",
        "id": "Menghambat vitamin K epoksida reduktase (faktor II, VII, IX, X, Protein C & S). Wajib 'bridging' dengan heparin/LMWH minimal 5 hari hingga INR target tercapai 2 hari berturut-turut."
      }
    },
    "onset": "24 - 72 hours for initial INR rise; 5 - 7 days for full antithrombotic effect (clearing Factor II)",
    "peak": "72 - 96 hours",
    "duration": "2 - 5 days post discontinuation",
    "metabolism": "S-warfarin (5x more potent) metabolized by CYP2C9; R-warfarin metabolized by CYP1A2, CYP3A4. Renal excretion of metabolites (92%).",
    "clinicalPearls": {
      "en": "Transient hypercoagulable state during first 24-48h due to rapid depletion of Protein C (short half-life ~8h); never initiate without concurrent parenteral anticoagulant in acute thrombosis. Reversal: Vitamin K1 (Phytomenadione) 5-10 mg slow IV and 4-factor Prothrombin Complex Concentrate (PCC) for emergency bleeding.",
      "id": "Status hiperkoagulasi sementara terjadi 24-48 jam pertama karena penurunan drastis Protein C (half-life pendek ~8 jam); jangan pernah mulai tanpa heparin pendamping pada trombosis akut. Antidotum emergensi: Vitamin K1 dan 4-factor PCC."
    },
    "highRisk": true,
    "blackBoxWarning": {
      "en": "Bleeding Risk: Can cause major or fatal bleeding. Regular monitoring of INR is required.",
      "id": "Risiko Perdarahan: Dapat menyebabkan perdarahan fatal. Pemantauan INR rutin adalah keharusan mutlak."
    }
  }
];
