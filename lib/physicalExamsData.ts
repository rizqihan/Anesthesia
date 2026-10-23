import type { PhysicalExamRecord } from './db';

export const PHYSICAL_EXAMS_DB: PhysicalExamRecord[] = [
  {
    id: 1,
    title: {
      en: "Cranial Nerve System Exam (CN I - XII)",
      id: "Pemeriksaan Sistem Saraf Kranial (CN I - XII)"
    },
    category: "Neurology",
    definition: {
      en: "A comprehensive neurological examination of the 12 cranial nerves to assess sensory, motor, and autonomic brainstem and cerebral functions.",
      id: "Pemeriksaan neurologis komprehensif dari 12 saraf kranial untuk menilai fungsi sensorik, motorik, dan otonom batang otak serta serebral."
    },
    preparation: {
      en: "Ensure a quiet room. Prepare examination tools: smelling substances (coffee/soap), Snellen chart, penlight, cotton wisp, tuning fork (256/512 Hz), tongue depressor, and aromatic substances.",
      id: "Pastikan ruangan tenang. Siapkan alat pemeriksaan: bahan aroma (kopi/sabun), kartu Snellen, penlight, kapas, garpu tala (256/512 Hz), sudip lidah, dan bahan berasa."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "CN I (Olfactory): Test sense of smell in each nostril individually using non-irritating scents (e.g., coffee, soap) with patient's eyes closed.",
          id: "CN I (Olfactory): Uji indra penciuman pada masing-masing lubang hidung secara bergantian menggunakan aroma non-iritan (misal: kopi, sabun) dengan mata pasien tertutup."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Correctly identifies common odors in both nostrils.",
          id: "Dapat mengidentifikasi aroma umum dengan benar di kedua lubang hidung."
        },
        abnormalFindings: {
          en: "Anosmia (loss of smell) or hyposmia, unilateral or bilateral.",
          id: "Anosmia (hilangnya penciuman) atau hiposmia, unilateral atau bilateral."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "CN II (Optic): Assess visual acuity (Snellen chart), visual fields by confrontation, and perform pupillary light reflex (afferent pathway).",
          id: "CN II (Optic): Nilai ketajaman penglihatan (kartu Snellen), lapang pandang dengan metode konfrontasi, dan lakukan refleks cahaya pupil (jalur aferen)."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Visual acuity 20/20, full visual fields, symmetric direct and consensual pupillary constriction.",
          id: "Ketajaman penglihatan 20/20, lapang pandang penuh, konstriksi pupil langsung dan konsensual yang simetris."
        },
        abnormalFindings: {
          en: "Decreased acuity, visual field defects (hemianopsia), or absent afferent pupillary light reflex (Marcus Gunn pupil).",
          id: "Penurunan ketajaman, defek lapang pandang (hemianopsia), atau tidak adanya refleks cahaya pupil aferen (pupil Marcus Gunn)."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "CN III (Oculomotor): Assess pupillary response to light (efferent pathway), accommodation, and eyelid elevation (ptosis check).",
          id: "CN III (Oculomotor): Nilai respons pupil terhadap cahaya (jalur eferen), akomodasi, dan elevasi kelopak mata (pemeriksaan ptosis)."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "No ptosis; pupils constrict symmetrically to light and accommodation.",
          id: "Tidak ada ptosis; pupil berkontraksi secara simetris terhadap cahaya dan akomodasi."
        },
        abnormalFindings: {
          en: "Ptosis, dilated pupil (mydriasis), or lack of pupillary constriction.",
          id: "Ptosis, pupil melebar (midriasis), atau tidak adanya konstriksi pupil."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "CN III, IV & VI (Extraocular Movements): Test the six cardinal directions of gaze ('H' shape pattern) to evaluate oculomotor, trochlear, and abducens nerve functions.",
          id: "CN III, IV & VI (Gerakan Ekstraokular): Uji enam arah gerakan bola mata (pola berbentuk 'H') untuk mengevaluasi fungsi saraf okulomotor, troklear, dan abdusen."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Smooth conjugate eye movements in all directions without nystagmus or strabismus.",
          id: "Gerakan mata konjugat yang mulus ke semua arah tanpa nystagmus atau strabismus."
        },
        abnormalFindings: {
          en: "Diplopia, strabismus, nystagmus, or restriction of gaze in specific directions (e.g., CN VI palsy results in inability to abduct eye).",
          id: "Diplopia, strabismus, nystagmus, atau hambatan gerakan bola mata pada arah tertentu (misal: kelumpuhan CN VI menyebabkan ketidakmampuan abduksi mata)."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "CN V (Trigeminal): Test facial sensation (light touch/pain) in ophthalmic (V1), maxillary (V2), and mandibular (V3) branches. Palpate masseter muscles while patient clenches teeth, and test corneal reflex.",
          id: "CN V (Trigeminal): Uji sensasi wajah (sentuhan halus/nyeri) pada cabang oftalmik (V1), maksila (V2), dan mandibula (V3). Palpasi otot masseter saat pasien merapatkan gigi, dan uji refleks kornea."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Intact and symmetric bilateral facial sensation. Strong, symmetric muscle contraction when clenching. Intact corneal reflex.",
          id: "Sensasi wajah bilateral utuh dan simetris. Kontraksi otot yang kuat dan simetris saat merapatkan gigi. Refleks kornea utuh."
        },
        abnormalFindings: {
          en: "Hypesthesia/anesthesia of facial zones, weakness in jaw clenching, or absent corneal reflex.",
          id: "Hipestesia/anestesia pada zona wajah, kelemahan saat merapatkan rahang, atau hilangnya refleks kornea."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "CN VII (Facial): Ask patient to raise eyebrows, frown, close eyes tightly against resistance, show teeth, smile, and puff out cheeks.",
          id: "CN VII (Facial): Minta pasien mengangkat alis, mengerutkan dahi, memejamkan mata rapat-rapat melawan tahanan, memperlihatkan gigi, tersenyum, dan menggembungkan pipi."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Symmetric facial expressions, full forehead wrinkling, strong eye closure, symmetric smile.",
          id: "Ekspresi wajah simetris, kerutan dahi penuh, penutupan mata kuat, senyuman simetris."
        },
        abnormalFindings: {
          en: "Facial asymmetry, flattened nasolabial fold, Bell's palsy (entire half of face including forehead), or central facial palsy (forehead spared).",
          id: "Asimetri wajah, lipatan nasolabial mendatar, Bell's palsy (seluruh separuh wajah termasuk dahi), atau paresis fasialis sentral (dahi tidak terkena)."
        }
      },
      {
        stepNumber: 7,
        instruction: {
          en: "CN VIII (Vestibulocochlear): Whisper test at 2 feet. Perform Rinne test (air vs bone conduction on mastoid) and Weber test (tuning fork at vertex).",
          id: "CN VIII (Vestibulocochlear): Tes bisik pada jarak 60 cm. Lakukan tes Rinne (konduksi udara vs tulang pada mastoid) dan tes Weber (garpu tala di verteks)."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Whispered words heard equally in both ears. Rinne positive (Air Conduction > Bone Conduction bilaterally). Weber midline without lateralization.",
          id: "Kata bisikan terdengar seimbang di kedua telinga. Rinne positif (Hantaran Udara > Hantaran Tulang bilateral). Weber di garis tengah tanpa lateralisasi."
        },
        abnormalFindings: {
          en: "Conductive hearing loss (Rinne negative, Weber lateralizes to affected ear) or Sensorineural hearing loss (Weber lateralizes to normal ear).",
          id: "Tuli konduktif (Rinne negatif, Weber lateralisasi ke telinga sakit) atau Tuli sensorineural (Weber lateralisasi ke telinga sehat)."
        }
      },
      {
        stepNumber: 8,
        instruction: {
          en: "CN IX & X (Glossopharyngeal & Vagus): Observe uvula and soft palate elevation when patient says 'Ah'. Assess swallow function and gag reflex.",
          id: "CN IX & X (Glossopharyngeal & Vagus): Amati elevasi uvula dan palatum mole saat pasien berucap 'Ah'. Nilai fungsi menelan dan refleks muntah (gag reflex)."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Symmetric soft palate elevation with uvula remaining midline. Normal swallowing and intact gag reflex.",
          id: "Elevasi palatum mole simetris dengan uvula tetap di garis tengah. Menelan normal dan refleks muntah utuh."
        },
        abnormalFindings: {
          en: "Uvula deviates away from the affected side, failure of palate elevation on weak side, hoarseness, dysphagia, or absent gag reflex.",
          id: "Uvula berdeviasi menjauhi sisi yang sakit, kegagalan elevasi palatum pada sisi yang lemah, suara serak, disfagia, atau hilangnya refleks muntah."
        }
      },
      {
        stepNumber: 9,
        instruction: {
          en: "CN XI (Accessory): Assess trapezius strength by asking patient to shrug shoulders against resistance. Assess sternocleidomastoid by asking patient to turn head against resistance.",
          id: "CN XI (Accessory): Nilai kekuatan trapezius dengan meminta pasien mengangkat bahu melawan tahanan. Nilai sternokleidomastoid dengan meminta pasien menoleh melawan tahanan."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Strong and symmetric shoulder shrug and head turning against resistance.",
          id: "Angkat bahu dan tolehan kepala kuat serta simetris melawan tahanan."
        },
        abnormalFindings: {
          en: "Weakness or shoulder droop on affected side, inability to turn head toward the opposite side.",
          id: "Kelemahan atau bahu terkulai pada sisi yang sakit, ketidakmampuan menoleh ke arah sisi berlawanan."
        }
      },
      {
        stepNumber: 10,
        instruction: {
          en: "CN XII (Hypoglossal): Inspect tongue at rest in mouth for fasciculations or atrophy. Ask patient to protrude tongue and move it rapidly side to side.",
          id: "CN XII (Hypoglossal): Inspeksi lidah saat istirahat di dasar mulut untuk fasikulasi atau atrofi. Minta pasien menjulurkan lidah dan menggerakkannya cepat ke kanan-kiri."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Tongue protrudes straight in the midline without tremors, fasciculations, or atrophy.",
          id: "Lidah menjulur lurus di garis tengah tanpa tremor, fasikulasi, atau atrofi."
        },
        abnormalFindings: {
          en: "Tongue deviates toward the weak/lesioned side (LMN lesion), fasciculations, or pronounced atrophy.",
          id: "Lidah berdeviasi ke arah sisi yang lemah/mengalami lesi (lesi LMN), fasikulasi, atau atrofi yang nyata."
        }
      }
    ]
  },
  {
    id: 2,
    title: {
      en: "General Head-to-Toe Physical Exam",
      id: "Pemeriksaan Fisik Umum Head-to-Toe"
    },
    category: "General Medicine",
    definition: {
      en: "A standard comprehensive systematic head-to-toe physical assessment utilized to evaluate all major organ systems and general physiological status.",
      id: "Penilaian fisik head-to-toe sistematis komprehensif standar yang digunakan untuk mengevaluasi semua sistem organ utama dan status fisiologis umum."
    },
    preparation: {
      en: "Sanitize hands. Explain procedure to patient. Gather stethoscope, penlight, sphygmomanometer, thermometer, and ensure patient comfort and privacy.",
      id: "Sanitasi tangan. Jelaskan prosedur kepada pasien. Siapkan stetoskop, penlight, sfigmomanometer, termometer, serta pastikan kenyamanan dan privasi pasien."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Head & Neck: Inspect skull, hair, and face. Examine conjunctiva for anemia, sclera for icterus. Palpate thyroid gland, trachea alignment, cervical lymph nodes, and assess jugular venous pressure (JVP).",
          id: "Kepala & Leher: Inspeksi tengkorak, rambut, dan wajah. Periksa konjungtiva untuk anemia, sklera untuk ikterus. Palpasi kelenjar tiroid, keselarasan trakea, kelenjar getah bening servikal, dan nilai tekanan vena jugularis (JVP)."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Normocephalic, pink conjunctiva, white sclera. Trachea midline, non-palpable thyroid, JVP < 3 cm above sternal angle.",
          id: "Normosefali, konjungtiva merah muda, sklera putih. Trakea di garis tengah, tiroid tidak teraba, JVP < 3 cm di atas sudut sternum."
        },
        abnormalFindings: {
          en: "Conjunctival pallor, icteric sclera, goiter (enlarged thyroid), lymphadenopathy, or elevated JVP (> 4 cm).",
          id: "Anemia konjungtiva (pucat), sklera ikterik, struma (pembesaran tiroid), limfadenopati, atau peningkatan JVP (> 4 cm)."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Thorax & Lungs: Inspect chest symmetry and breathing pattern. Palpate tactile fremitus. Percuss lung fields. Auscultate vesicular breath sounds systematically on anterior and posterior chest.",
          id: "Toraks & Paru: Inspeksi kesimetrisan dada dan pola napas. Palpasi fremitus taktil. Perkusi lapang paru. Auskultasi suara napas vesikuler secara sistematis pada dada anterior dan posterior."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Symmetric chest expansion, resonant percussion notes, normal vesicular breath sounds without crackles or wheezing.",
          id: "Ekspansi dada simetris, suara perkusi sonor, suara napas vesikuler normal tanpa ronkhi atau mengi."
        },
        abnormalFindings: {
          en: "Asymmetric expansion, dullness to percussion (consolidation/effusion), hyperresonance (pneumothorax), rales/crackles, or wheezing.",
          id: "Ekspansi asimetris, perkusi redup (konsolidasi/efusi), hipersonor (pneumotoraks), ronkhi basah, atau mengi (wheezing)."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Cardiovascular System: Inspect and palpate apex beat (5th intercostal space midclavicular line). Auscultate heart sounds at aortic, pulmonic, tricuspid, and mitral areas.",
          id: "Sistem Kardiovaskular: Inspeksi dan palpasi iktus kordis (ICS 5 linea midklavikularis kiri). Auskultasi bunyi jantung pada area aorta, pulmonal, trikuspid, dan mitral."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Apex beat non-displaced. Regular S1 and S2 heart sounds, physiological splitting of S2, no murmurs, rubs, or gallops.",
          id: "Iktus kordis tidak bergeser. Bunyi jantung S1 dan S2 murni reguler, splitting fisiologis S2, tidak ada bising/murmur, gesekan, atau gallop."
        },
        abnormalFindings: {
          en: "Displaced apex beat (cardiomegaly), irregular rhythm (arrhythmia), pathological murmurs, S3/S4 gallop rhythm, or pericardial friction rub.",
          id: "Iktus kordis bergeser (kardiomegali), irama ireguler (aritmia), murmur patologis, irama gallop S3/S4, atau gesekan perikardial."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Abdomen: Inspect abdominal contours. Auscultate bowel sounds in 4 quadrants. Percuss liver span and tympany. Perform light and deep palpation for tenderness, guarding, liver/spleen enlargement.",
          id: "Abdomen: Inspeksi kontur perut. Auskultasi bising usus di 4 kuadran. Perkusi batas hepar dan timpani. Lakukan palpasi ringan dan dalam untuk nyeri tekan, defans muskular, pembesaran hepar/lien."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Soft, non-tender, normal normoactive bowel sounds (5-30/min), tympanitic, no hepatosplenomegaly or peritoneal signs.",
          id: "Supel, tidak ada nyeri tekan, bising usus normoaktif (5-30x/menit), timpani, tidak ada hepatosplenomegali atau tanda peritonitis."
        },
        abnormalFindings: {
          en: "Rigidity (board-like abdomen), rebound tenderness, localized guarding, absent or hyperactive high-pitched bowel sounds, organomegaly.",
          id: "Defans muskular/rigiditas, nyeri lepas (rebound tenderness), bising usus hilang atau meningkat dengan nada tinggi, organomegali."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Upper Extremities: Inspect skin, nails (clubbing, capillary refill time). Palpate radial and brachial pulses. Assess muscle bulk, tone, power (0-5), and sensation.",
          id: "Ekstremitas Atas: Inspeksi kulit, kuku (clubbing, capillary refill time). Palpasi nadi radialis dan brakialis. Nilai massa otot, tonus, kekuatan (0-5), dan sensibilitas."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Warm peripheries, capillary refill < 2 seconds, equal bounding radial pulses, motor power 5/5 bilaterally, intact sensation.",
          id: "Akral hangat, capillary refill < 2 detik, nadi radialis teraba kuat dan seimbang, kekuatan motorik 5/5 bilateral, sensibilitas utuh."
        },
        abnormalFindings: {
          en: "Cold clammy extremities, prolonged CRT (> 2 sec), weak/absent pulses, motor weakness (< 5/5), tremors, or sensory deficits.",
          id: "Akral dingin dan lembap, CRT memanjang (> 2 detik), nadi lemah/tidak teraba, paresis/kelemahan (< 5/5), tremor, atau defisit sensorik."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "Lower Extremities: Inspect for varicose veins and dependent edema. Palpate femoral, popliteal, posterior tibial, and dorsalis pedis pulses. Check for calf tenderness (DVT signs) and deep tendon reflexes.",
          id: "Ekstremitas Bawah: Inspeksi varises dan edema dependen. Palpasi nadi femoralis, poplitea, tibialis posterior, dan dorsalis pedis. Periksa nyeri betis (tanda DVT) dan refleks tendon dalam."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "No pitting edema, non-tender calves, palpable symmetric distal pulses, brisk normal patellar and Achilles reflexes (2+).",
          id: "Tidak ada edema pitting, betis tidak nyeri tekan, nadi distal teraba simetris, refleks patela dan Achilles normal (2+)."
        },
        abnormalFindings: {
          en: "Diminished dorsalis pedis pulse, unilateral/bilateral pitting edema, painful varicosities, or abnormal reflexes.",
          id: "Nadi dorsalis pedis berkurang, edema pitting unilateral/bilateral, varises yang nyeri, atau refleks abnormal."
        }
      }
    ]
  },
  {
    id: 3,
    title: {
      en: "Low Back Pain Physical Exam",
      id: "Pemeriksaan Fisik Nyeri Punggung Bawah"
    },
    category: "Orthopedics",
    definition: {
      en: "A systematic clinical assessment of the lumbar spine, neurological pathways, and musculature to diagnose the etiology of low back pain and rule out red flags.",
      id: "Penilaian klinis sistematis dari tulang belakang lumbal, jalur saraf, dan otot untuk mendiagnosis etiologi nyeri punggung bawah dan menyingkirkan tanda bahaya (red flags)."
    },
    preparation: {
      en: "Explain the procedure. Expose the back and lower limbs. Prepare a reflex hammer and examination table. Patient starts in standing position.",
      id: "Jelaskan prosedur. Buka area punggung dan kaki. Siapkan palu refleks dan meja pemeriksaan. Pasien memulai pemeriksaan dalam posisi berdiri."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Inspection: Observe the patient's gait, posture, lumbar curvature (lordosis, scoliosis), pelvic symmetry, and skin markings while standing.",
          id: "Inspeksi: Amati cara berjalan (gait), postur tubuh, kelengkungan lumbar (lordosis, skoliosis), kesimetrisan panggul, dan tanda kulit saat pasien berdiri."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Symmetric erect posture, normal lumbar lordosis, straight spine, and smooth symmetric gait.",
          id: "Postur tegak simetris, lordosis lumbar normal, tulang belakang lurus, dan cara berjalan mulus simetris."
        },
        abnormalFindings: {
          en: "Antalgic gait, scoliosis, flattening of lumbar lordosis, pelvic tilt, or muscle wasting.",
          id: "Gait antalgik (pincang menahan nyeri), skoliosis, lordosis lumbar mendatar, panggul miring, atau atrofi otot."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Range of Motion: Assess active lumbar flexion (finger-to-floor), extension, lateral flexion, and rotation. Note restriction or pain reproduction.",
          id: "Rentang Gerak (Range of Motion): Nilai fleksi lumbal aktif (jari ke lantai), ekstensi, fleksi lateral, dan rotasi. Catat adanya hambatan atau timbulnya nyeri."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Flexion 40-60°, extension 20-35°, lateral bending 15-20° bilaterally without pain reproduction.",
          id: "Fleksi 40-60°, ekstensi 20-35°, pembengkokan lateral 15-20° bilateral tanpa memicu rasa nyeri."
        },
        abnormalFindings: {
          en: "Markedly restricted range of motion, severe pain on lumbar extension (facet/spondylolisthesis) or flexion (disc herniation).",
          id: "Keterbatasan rentang gerak yang nyata, nyeri hebat saat ekstensi (facet/spondilolistesis) atau fleksi (hernia nukleus pulposus)."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Palpation: Palpate spinous processes from T12 to S1, sacroiliac joints, and paraspinal musculature for step-offs, tenderness, and muscle spasm.",
          id: "Palpasi: Palpasi prosesus spinosus dari T12 hingga S1, sendi sakroiliaka, dan otot paraspinal untuk mencari pergeseran (step-off), nyeri tekan, dan spasme otot."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Smooth spinal alignment, non-tender spinous processes, supple paraspinal muscles without spasm.",
          id: "Keselarasan tulang belakang mulus, prosesus spinosus tidak nyeri tekan, otot paraspinal lentur tanpa spasme."
        },
        abnormalFindings: {
          en: "Focal bony tenderness (fracture/infection/malignancy), palpable step-off defect (spondylolisthesis), paraspinal muscle spasm.",
          id: "Nyeri tekan tulang fokal (fraktur/infeksi/keganasan), defek step-off teraba (spondilolistesis), spasme otot paraspinal."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Straight Leg Raise (Lasegue's Test): Patient supine. Passively raise the straight leg by flexing the hip. Positive if radiating pain below knee occurs between 30° and 70°. Confirm with Braggard test (ankle dorsiflexion).",
          id: "Straight Leg Raise (Tes Lasegue): Pasien telentang. Angkat tungkai lurus secara pasif dengan memfleksikan panggul. Positif jika timbul nyeri menjalar ke bawah lutut pada sudut 30°-70°. Konfirmasi dengan tes Braggard (dorsofleksi pergelangan kaki)."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Leg elevates comfortably up to 80-90° without radiating electric shock-like or burning pain.",
          id: "Tungkai dapat terangkat nyaman hingga 80-90° tanpa rasa nyeri menjalar seperti tersengat listrik atau terbakar."
        },
        abnormalFindings: {
          en: "True positive Lasegue: Sharp radicular pain radiating down the posterior leg below the knee between 30°-70°, indicating **L4-S1 nerve root compression / disc herniation**.",
          id: "Lasegue Positif sejati: Nyeri tajam radikuler menjalar ke tungkai belakang di bawah lutut antara sudut 30°-70°, menunjukkan **kompresi akar saraf L4-S1 / HNP**."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Femoral Nerve Stretch Test: Position patient prone. Passively flex the knee to 90° and extend the hip. Note reproduction of anterior thigh pain.",
          id: "Femoral Nerve Stretch Test: Posisikan pasien dalam kondisi tengkurap. Fleksikan lutut secara pasif hingga 90° lalu ekstensikan panggul. Catat jika ada nyeri yang menjalar ke paha depan."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "No radiating pain in the anterior thigh.",
          id: "Tidak ada nyeri menjalar di paha depan."
        },
        abnormalFindings: {
          en: "Positive test: Radicular pain radiating down the anterior thigh, indicating **L2-L4 nerve root pathology**.",
          id: "Tes Positif: Nyeri radikuler menjalar ke paha bagian depan, menunjukkan **patologi akar saraf L2-L4**."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "Neurological Assessment: Test motor strength, sensation, and reflexes of L4 (patellar reflex, ankle dorsiflexion), L5 (great toe extension), and S1 (Achilles reflex, ankle plantarflexion).",
          id: "Asesmen Neurologis: Uji kekuatan motorik, sensasi, dan refleks L4 (refleks patela, dorsofleksi pergelangan kaki), L5 (ekstensi jempol kaki), dan S1 (refleks Achilles, plantarfleksi pergelangan kaki)."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Bilateral motor strength 5/5, symmetric intact dermatomal sensation, symmetric reflexes (2+).",
          id: "Kekuatan motorik bilateral 5/5, sensasi dermatom utuh simetris, refleks simetris (2+)."
        },
        abnormalFindings: {
          en: "Foot drop (L5 weakness), weak plantarflexion (S1 weakness), sensory loss in L4/L5/S1 dermatomes, or asymmetric/absent deep tendon reflexes.",
          id: "Foot drop (kelemahan L5), plantarfleksi lemah (kelemahan S1), hilangnya sensasi dermatom L4/L5/S1, atau refleks tendon dalam asimetris/hilang."
        }
      }
    ]
  },
  {
    id: 4,
    title: {
      en: "Comprehensive Cardiovascular Examination",
      id: "Pemeriksaan Kardiovaskular Komprehensif"
    },
    category: "Cardiology",
    definition: {
      en: "An exhaustive physical evaluation of the heart, central hemodynamics, jugular venous pressure, peripheral perfusion, and cardiac murmurs.",
      id: "Evaluasi fisik komprehensif jantung, hemodinamik sentral, tekanan vena jugularis, perfusi perifer, dan bising jantung."
    },
    preparation: {
      en: "Expose anterior chest. Patient positioned at 45 degrees inclination. Good ambient lighting. Stethoscope with functional diaphragm and bell. Centimeter ruler.",
      id: "Buka dada bagian depan. Pasien berbaring dengan kemiringan 45 derajat. Pencahayaan ruangan baik. Stetoskop dengan diafragma dan bell yang berfungsi. Penggaris sentimeter."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "General Inspection & Peripheral Signs: Examine hands and nails for **splinter hemorrhages**, **Janeway lesions**, **Osler nodes**, clubbing, and peripheral cyanosis. Inspect face for malar flush (mitral stenosis) and xanthelasma.",
          id: "Inspeksi Umum & Tanda Perifer: Periksa tangan dan kuku untuk **perdarahan splinter**, **lesi Janeway**, **nodus Osler**, jari tabuh (clubbing), dan sianosis perifer. Periksa wajah untuk malar flush (stenosis mitral) dan xanthelasma."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Warm extremities, pink nail beds, capillary refill < 2 seconds, no clubbing or stigmata of infective endocarditis.",
          id: "Ekstremitas hangat, bantalan kuku merah muda, capillary refill < 2 detik, tidak ada clubbing atau stigmata endokarditis infektif."
        },
        abnormalFindings: {
          en: "Splinter hemorrhages / Osler nodes in **infective endocarditis**, central cyanosis in cyanotic heart disease, xanthomas in severe hyperlipidemia.",
          id: "Perdarahan splinter / nodus Osler pada **endokarditis infektif**, sianosis sentral pada penyakit jantung sianotik, xanthoma pada hiperlipidemia berat."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Jugular Venous Pressure (JVP) & Carotid Pulse: Tangential lighting across the right internal jugular vein. Measure vertical height above sternal angle at 45°. Assess waveforms (a, c, v waves; x and y descents). Palpate carotid pulse volume and character.",
          id: "Tekanan Vena Jugularis (JVP) & Nadi Karotis: Pencahayaan tangensial pada vena jugularis interna kanan. Ukur tinggi vertikal di atas sudut sternum (angulus Ludovici) pada posisi 45°. Nilai gelombang (a, c, v; x dan y descent). Palpasi volume dan karakter denyut nadi karotis."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "JVP vertical height <= 3 cm above sternal angle (total <= 8 cm H2O). Carotid pulse brisk with smooth upstroke and downstroke.",
          id: "Tinggi vertikal JVP <= 3 cm di atas sudut sternum (total <= 8 cm H2O). Denyut karotis teraba tegas dengan upstroke dan downstroke normal."
        },
        abnormalFindings: {
          en: "Elevated JVP (> 4 cm) indicating **right ventricular failure / fluid overload / cardiac tamponade**; Kussmaul sign (paradoxical JVP rise on inspiration); pulsus parvus et tardus in **aortic stenosis**.",
          id: "Peningkatan JVP (> 4 cm) menandakan **gagal jantung kanan / overload cairan / tamponade jantung**; tanda Kussmaul (peningkatan paradoksal JVP saat inspirasi); pulsus parvus et tardus pada **stenosis aorta**."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Precordial Inspection & Palpation: Inspect for surgical sternotomy scars or visible pulsations. Palpate apex beat (5th ICS midclavicular line), assessing location, size (< 2.5 cm), and character. Palpate parasternal area for **right ventricular heave** and heart base for **palpable thrills**.",
          id: "Inspeksi & Palpasi Prekordial: Inspeksi bekas luka sternotomi atau pulsasi yang tampak. Palpasi iktus kordis (ICS 5 linea midklavikularis), nilai lokasi, ukuran (< 2.5 cm), dan karakternya. Palpasi area parasternal untuk mencari **RV heave** dan basis jantung untuk **thrill/getaran bising**."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Apex beat localized to 5th intercostal space, left midclavicular line; tapping quality, diameter < 2.5 cm. No thrills or right ventricular heaves.",
          id: "Iktus kordis teraba di sela iga ke-5 linea midklavikularis kiri; ketukan halus, diameter < 2.5 cm. Tidak ada thrill atau heaving ventrikel kanan."
        },
        abnormalFindings: {
          en: "Laterally or inferiorly displaced, diffuse, hyperdynamic apex beat in **left ventricular dilatation / cardiomegaly**; sustained left parasternal heave in **pulmonary hypertension / RV hypertrophy**; palpable thrill in grade IV+ murmurs.",
          id: "Iktus kordis bergeser ke lateral/kaudal, difus, dan hiperdinamik pada **dilatasi ventrikel kiri / kardiomegali**; heaving parasternal kiri persisten pada **hipertensi pulmonal / hipertrofi ventrikel kanan**; thrill teraba pada murmur derajat IV+."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Cardiac Auscultation across 4 Standard Areas: Systematically auscultate with diaphragm and bell at Aortic (2nd RICS), Pulmonic (2nd LICS), Tricuspid (4th-5th LICS), and Mitral (5th LICS midclavicular line) areas. Examine S1, S2 splitting, extra sounds, and murmurs.",
          id: "Auskultasi Jantung pada 4 Area Standar: Auskultasi sistematis dengan diafragma dan bell pada area Aorta (ICS 2 parasternal kanan), Pulmonal (ICS 2 parasternal kiri), Triukuspid (ICS 4-5 parasternal kiri), dan Mitral (ICS 5 linea midklavikularis). Evaluasi bunyi S1, S2 splitting, bunyi tambahan, dan bising jantung."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Regular rhythm, S1 loudest at apex, S2 loudest at base with physiological inspiratory splitting. No murmurs, third (S3), or fourth (S4) heart sounds.",
          id: "Irama reguler, S1 terdengar paling keras di apeks, S2 paling keras di basis dengan splitting inspiratori fisiologis. Tidak ada murmur, bunyi jantung ketiga (S3), atau keempat (S4)."
        },
        abnormalFindings: {
          en: "Holosystolic murmur radiating to axilla in **mitral regurgitation**; crescendo-decrescendo systolic ejection murmur radiating to carotids in **aortic stenosis**; early diastolic decrescendo murmur in **aortic regurgitation**; opening snap and mid-diastolic rumble in **mitral stenosis**; **S3 gallop** in acute systolic heart failure.",
          id: "Murmur holosistolik menjalar ke aksila pada **regurgitasi mitral**; murmur ejeksi sistolik krecendo-dekresendo menjalar ke karotis pada **stenosis aorta**; murmur diastolik dini pada **regurgitasi aorta**; opening snap dan rumble mid-diastolik pada **stenosis mitral**; **gallop S3** pada gagal jantung sistolik akut."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Dynamic Cardiac Maneuvers: Turn patient into left lateral decubitus position and listen to apex with bell for mitral stenosis and S3/S4. Have patient sit upright, lean forward, exhale completely, and hold breath while auscultating left sternal border with diaphragm for aortic regurgitation.",
          id: "Manuver Dinamis Jantung: Posisikan pasien miring ke kiri (left lateral decubitus) dan dengarkan apeks dengan bell untuk mendeteksi stenosis mitral dan S3/S4. Minta pasien duduk tegak, condong ke depan, ekspirasi maksimal dan tahan napas, lalu auskultasi batas sternum kiri dengan diafragma untuk mendeteksi regurgitasi aorta."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "No diastolic rumbles, rubs, or accentuated low-frequency sounds elicited by positional maneuvers.",
          id: "Tidak ada murmur diastolik, gesekan perikardial, atau bunyi frekuensi rendah tambahan yang dipicu oleh perubahan posisi."
        },
        abnormalFindings: {
          en: "Accentuates faint high-pitched early diastolic murmur of **aortic regurgitation** or low-pitched rumbling murmur of **mitral stenosis**; pericardial friction rub in **acute pericarditis**.",
          id: "Memperjelas murmur diastolik dini bernada tinggi pada **regurgitasi aorta** atau murmur rumble bernada rendah pada **stenosis mitral**; gesekan perikardial (friction rub) pada **perikarditis akut**."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "Peripheral Edema & Volume Assessment: Press firmly with thumb for 5 seconds over the medial malleolus, anterior tibial border, and sacrum (if bedridden). Quantify pitting edema (1+ to 4+). Auscultate lung bases for cardiac pulmonary edema rales.",
          id: "Pemeriksaan Edema Perifer & Status Volume: Tekan kuat dengan ibu jari selama 5 detik di atas maleolus medialis, pretibia anterior, dan sakrum (bila tirah baring). Nilai derajat pitting edema (1+ hingga 4+). Auskultasi basis paru untuk mencari ronkhi basah halus edema paru kardiogenik."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "No pitting edema over malleoli or shins. Clear lung bases bilaterally without crackles.",
          id: "Tidak ada edema pitting di atas maleolus atau pretibia. Lapang paru bersih bilateral tanpa ronkhi basah."
        },
        abnormalFindings: {
          en: "Bilateral pitting dependent edema (1+ to 4+) and bilateral bibasilar fine inspiratory crackles in **congestive heart failure**.",
          id: "Edema pitting bilateral (1+ hingga 4+) dan ronkhi basah halus inspiratoir bilateral pada **gagal jantung kongestif**."
        }
      }
    ]
  },
  {
    id: 5,
    title: {
      en: "Comprehensive Respiratory Examination",
      id: "Pemeriksaan Respirasi Komprehensif"
    },
    category: "Pulmonology",
    definition: {
      en: "A detailed clinical evaluation of respiratory rate, thoracic dynamics, percussion resonance, vocal fremitus, breath sounds, and adventitious acoustic phenomena.",
      id: "Evaluasi klinis mendalam laju respirasi, dinamika toraks, resonansi perkusi, fremitus vokal, suara napas, dan fenomena akustik tambahan."
    },
    preparation: {
      en: "Expose patient's chest fully. Patient seated comfortably if tolerated. Warm the stethoscope diaphragm. Ensure quiet environment for accurate auscultation.",
      id: "Buka dada pasien seperlunya dengan menjaga privasi. Pasien duduk tegak nyaman bila memungkinkan. Hangatkan diafragma stetoskop. Pastikan ruangan hening untuk auskultasi akurat."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Respiratory Pattern & Work of Breathing: Observe respiratory rate surreptitiously for 60 seconds. Inspect for use of accessory muscles (**sternocleidomastoid**, scalenes), intercostal retractions, pursed-lip breathing, and nasal flaring.",
          id: "Pola Pernapasan & Usaha Napas: Amati laju pernapasan secara tenang selama 60 detik penuh. Inspeksi penggunaan otot bantu napas (**sternokleidomastoid**, skalenus), retraksi interkostal, pernapasan cuping hidung, dan pursed-lip breathing."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Eupnea, resting respiratory rate 12-18 breaths/min, smooth unlabored breathing without accessory muscle activation.",
          id: "Eupnea, laju napas istirahat 12-18 kali/menit, pernapasan tenang tanpa penggunaan otot bantu napas."
        },
        abnormalFindings: {
          en: "Tachypnea (> 22/min), bradypnea (< 10/min), active sternocleidomastoid recruitment indicating **acute respiratory failure / severe airway obstruction**; Cheyne-Stokes breathing in central hypoperfusion / heart failure.",
          id: "Takipnea (> 22x/menit), bradipnea (< 10x/menit), rekrutmen aktif otot sternokleidomastoid yang menandakan **gagal napas akut / obstruksi jalan napas berat**; pernapasan Cheyne-Stokes pada hipoperfusi sentral / gagal jantung."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Thoracic Inspection & Tracheal Position: Inspect chest shape for barrel chest (increased AP diameter), pectus excavatum, or scoliosis. Gently palpate the trachea in the suprasternal notch to confirm midline alignment.",
          id: "Inspeksi Toraks & Posisi Trakea: Inspeksi bentuk dada untuk barrel chest (peningkatan diameter anteroposterior), pectus excavatum, atau skoliosis. Palpasi trakea secara lembut pada fosa suprasternal untuk memastikan posisi di garis tengah."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Symmetric chest wall, anteroposterior to transverse diameter ratio 1:2. Trachea strictly midline in suprasternal notch.",
          id: "Dinding dada simetris, rasio diameter anteroposterior terhadap transversal 1:2. Trakea tepat di garis tengah pada fosa suprasternal."
        },
        abnormalFindings: {
          en: "Tracheal deviation away from the affected side in **tension pneumothorax** or massive pleural effusion; tracheal deviation toward the affected side in **massive atelectasis / lung collapse**.",
          id: "Deviasi trakea menjauhi sisi lesi pada **tension pneumothorax** atau efusi pleura masif; deviasi trakea mendekati sisi lesi pada **atelektasis masif / kolaps paru**."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Chest Wall Palpation & Expansion: Place hands firmly on anterior and posterior chest wall with thumbs meeting at midline; observe symmetric thumb separation during deep inspiration. Palpate tactile vocal fremitus with ulnar border of hands while patient repeats 'ninety-nine' (or 'tujuh-tujuh'). Palpate for subcutaneous crepitus.",
          id: "Palpasi & Ekspansi Dinding Dada: Letakkan kedua tangan pada dinding dada anterior dan posterior dengan kedua ibu jari bertemu di garis tengah; amati pemisahan simetris ibu jari saat inspirasi dalam. Palpasi fremitus taktil dengan tepi ulnar tangan saat pasien mengulang 'tujuh-tujuh'. Palpasi krepitasi subkutan."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Symmetric chest expansion >= 3-5 cm. Equal, moderate tactile vocal fremitus throughout both lung fields. No subcutaneous emphysema.",
          id: "Ekspansi dada simetris >= 3-5 cm. Fremitus taktil teraba simetris dan sedang di seluruh lapang paru. Tidak ada krepitasi subkutan."
        },
        abnormalFindings: {
          en: "Asymmetric expansion; increased tactile fremitus over **lobar consolidation / pneumonia**; decreased or absent fremitus in **pleural effusion** or **pneumothorax**; subcutaneous crepitus in tracheobronchial rupture / pneumomediastinum.",
          id: "Ekspansi asimetris; peningkatan fremitus taktil pada **konsolidasi lobaris / pneumonia**; fremitus menurun atau hilang pada **efusi pleura** atau **pneumotoraks**; krepitasi subkutan pada ruptur trakeobronkial / pneumomediastinum."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Systematic Chest Percussion: Percuss symmetrical anterior, lateral, and posterior lung fields, comparing left to right. Assess resonant quality and map the level of diaphragmatic excursion (normal 3-5 cm).",
          id: "Perkusi Sistematis Dinding Dada: Lakukan perkusi secara simetris pada area anterior, lateral, dan posterior dada, membandingkan sisi kiri dan kanan. Evaluasi kualitas sonor dan petakan rentang pergerakan diafragma (normal 3-5 cm)."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Resonant percussion note throughout all lung zones. Normal cardiac and hepatic dullness boundaries. Diaphragmatic excursion 3-5 cm.",
          id: "Bunyi perkusi sonor (resonant) di seluruh lapang paru. Batas redup jantung dan hepar normal. Ekskursi diafragma 3-5 cm."
        },
        abnormalFindings: {
          en: "Dullness or stony dullness over **pleural effusion** or dense consolidation; hyperresonance or tympany over **pneumothorax** or severe emphysema.",
          id: "Redup pekak (stony dull) pada **efusi pleura** atau konsolidasi padat; hipersonor pada **pneumotoraks** atau emfisema berat."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Auscultation of Breath Sounds: Auscultate through a full respiratory cycle at each position using stethoscope diaphragm, comparing identical contralateral sites. Listen for intensity, vesicular quality, bronchial transformation, crackles, wheezes, and pleural rubs.",
          id: "Auskultasi Suara Napas: Auskultasi selama satu siklus napas penuh pada setiap titik dengan diafragma stetoskop, membandingkan sisi yang sama secara kontralateral. Dengarkan intensitas, karakter vesikuler, suara bronkial, ronkhi, mengi, dan friction rub pleura."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Vesicular breath sounds over peripheral lung fields (soft, low-pitched, inspiratory phase longer than expiratory). No adventitious sounds.",
          id: "Suara napas vesikuler di seluruh lapang paru perifer (lembut, nada rendah, fase inspirasi lebih panjang dari ekspirasi). Tidak ada suara napas tambahan."
        },
        abnormalFindings: {
          en: "Bronchial breath sounds in peripheral fields indicating **consolidation**; fine end-inspiratory crackles (Velcro-like) in pulmonary fibrosis/edema; coarse crackles in bronchitis/pneumonia; expiratory wheezes in **bronchospasm / asthma / COPD**; absent breath sounds in **pneumothorax / massive effusion**.",
          id: "Suara napas bronkial di area perifer menandakan **konsolidasi**; ronkhi basah halus akhir inspirasi pada fibrosis/edema paru; ronkhi kasar pada bronkitis/pneumonia; mengi ekspiratoir pada **bronkospasme / asma / PPOK**; suara napas hilang total pada **pneumotoraks / efusi masif**."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "Transmitted Voice Sounds (Vocal Resonance): Auscultate while patient whispers 'one-two-three' or says 'ninety-nine'. Test for **egophony** by asking patient to say 'E-E-E'; sound transforms to nasal 'A-A-A' over consolidated lung.",
          id: "Pemeriksaan Resonansi Suara (Transmitted Voice Sounds): Auskultasi saat pasien berbisik 'satu-dua-tiga' atau berbicara biasa. Uji **egofoni** dengan meminta pasien mengucapkan 'I-I-I'; suara akan bertransformasi menjadi 'E-E-E' sengau di atas jaringan paru yang mengalami konsolidasi."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Muffled, indistinct voice sounds transmitted to stethoscope; patient's 'E' remains heard as 'E'. Whispered words are virtually inaudible.",
          id: "Suara terdengar teredam dan tidak jelas; suara 'I' tetap terdengar sebagai 'I'. Bisikan kata hampir tidak terdengar."
        },
        abnormalFindings: {
          en: "Positive egophony ('E' to 'A' transition) and whispered pectoriloquy over **pulmonary consolidation / pneumonia**.",
          id: "Egofoni positif (transisi bunyi 'I' menjadi 'E' sengau) dan whispered pectoriloquy yang terdengar jelas pada **konsolidasi paru / pneumonia**."
        }
      }
    ]
  },
  {
    id: 6,
    title: {
      en: "Preoperative Airway Assessment for Anesthesia",
      id: "Asesmen Jalan Napas Pra-Anestesi Komprehensif"
    },
    category: "Anesthesiology",
    definition: {
      en: "A crucial clinical examination conducted prior to surgery to predict difficult bag-valve-mask ventilation, supraglottic airway placement, and direct or video endotracheal intubation.",
      id: "Pemeriksaan klinis krusial pra-bedah untuk memprediksi kesulitan ventilasi bag-valve-mask, pemasangan sungkup laring (LMA), dan intubasi endotrakeal langsung maupun videolaringoskopi."
    },
    preparation: {
      en: "Patient seated comfortably at eye level. Remove dental prostheses or dentures. Penlight and millimeter ruler available. Position patient with head in neutral position initially.",
      id: "Pasien duduk tegak nyaman sejajar mata pemeriksa. Lepaskan gigi palsu lepasan. Siapkan penlight dan penggaris milimeter. Pasien berada dalam posisi kepala netral pada awalnya."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Mallampati Classification: Patient sits upright with head neutral, opens mouth maximally, and protrudes tongue fully **WITHOUT phonating** (saying 'ah'). Inspect pharyngeal structures illuminated by penlight.",
          id: "Klasifikasi Skor Mallampati: Pasien duduk tegak dengan kepala netral, membuka mulut selebar mungkin, dan menjulurkan lidah maksimal **TANPA bersuara** (jangan bilang 'ah'). Inspeksi struktur faring dengan penlight."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "**Mallampati Class I**: Soft palate, faucial pillars, uvula, and tonsillar pillars fully visible; or **Class II**: Soft palate, faucial pillars, and upper uvula visible (Predicts easy laryngoscopy).",
          id: "**Mallampati Kelas I**: Palatum mole, pilar fausium, uvula, dan pilar tonsil terlihat jelas; atau **Kelas II**: Palatum mole, pilar fausium, dan uvula bagian atas terlihat (Memprediksi laringoskopi mudah)."
        },
        abnormalFindings: {
          en: "**Mallampati Class III**: Only soft palate and base of uvula visible; or **Mallampati Class IV**: Only hard palate visible; soft palate entirely hidden (High risk of difficult direct laryngoscopy, Cormack-Lehane III-IV).",
          id: "**Mallampati Kelas III**: Hanya palatum mole dan dasar uvula yang terlihat; atau **Mallampati Kelas IV**: Hanya palatum durum yang terlihat; palatum mole tertutup seluruhnya (Risiko tinggi kesulitan laringoskopi langsung)."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Inter-Incisor Gap / Mouth Opening: Measure the vertical distance between the upper and lower central incisors (or alveolar ridges if edentulous) at maximal voluntary mouth opening.",
          id: "Jarak Inter-Incisor / Bukaan Mulut: Ukur jarak vertikal antara gigi seri tengah atas dan bawah (atau gusi alveolar bila edentulus) saat bukaan mulut maksimal sukarela."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Inter-incisor distance >= 4.0 cm (typically 3 patient fingerbreadths), allowing easy insertion of standard laryngoscope blade.",
          id: "Jarak inter-incisor >= 4.0 cm (umumnya setara 3 jari pasien), memungkinkan insersi bilah laringoskop standar dengan mudah."
        },
        abnormalFindings: {
          en: "Restricted mouth opening < 3.0 cm (< 2 fingerbreadths) indicating severe risk of **difficult laryngoscopy and inability to introduce airway devices**.",
          id: "Bukaan mulut terbatas < 3.0 cm (< 2 jari) menandakan risiko berat **kesulitan laringoskopi dan hambatan insersi alat jalan napas**."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Upper Lip Bite Test (ULBT): Ask the patient to extend the mandible forward and bite the upper lip with their lower incisors as far as possible.",
          id: "Upper Lip Bite Test (ULBT): Minta pasien memajukan rahang bawah (mandibula) ke depan dan menggigit bibir atas dengan gigi seri bawah sejauh mungkin."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "**Class 1**: Lower incisors can bite the upper lip above the vermilion border; or **Class 2**: Lower incisors bite below the vermilion border (Good mandibular subluxation).",
          id: "**Kelas 1**: Gigi seri bawah dapat menggigit bibir atas melampaui batas vermilion; atau **Kelas 2**: Gigi seri bawah menggigit di bawah batas vermilion (Subluksasi mandibula baik)."
        },
        abnormalFindings: {
          en: "**Class 3**: Lower incisors cannot bite the upper lip at all (Poor subluxation capacity; highly predictive of difficult laryngoscopy).",
          id: "**Kelas 3**: Gigi seri bawah tidak dapat menggigit bibir atas sama sekali (Kemampuan subluksasi buruk; prediktor kuat kesulitan intubasi)."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Thyromental Distance (Patil's Test) & Sternomental Distance: Measure straight-line distance from the thyroid cartilage prominence (Adam's apple) to the tip of the bony mentum with head in full extension. Also measure distance from sternal notch to mentum.",
          id: "Jarak Tiromental (Tes Patil) & Jarak Sternomental: Ukur jarak garis lurus dari tonjolan kartilago tiroid (jakun) ke ujung mentum (dagu) dengan kepala ekstensi penuh. Ukur juga jarak dari takik suprasternal ke dagu."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Thyromental distance >= 6.5 cm (>= 3 patient fingerbreadths). Sternomental distance >= 12.5 cm. Adequate space for tongue displacement during laryngoscopy.",
          id: "Jarak tiromental >= 6.5 cm (>= 3 jari pasien). Jarak sternomental >= 12.5 cm. Ruang cukup untuk pergeseran lidah saat laringoskopi."
        },
        abnormalFindings: {
          en: "Short thyromental distance < 6.0 cm or sternomental distance < 12.5 cm indicating **anterior larynx / receding mandible** with acute laryngeal axis.",
          id: "Jarak tiromental pendek < 6.0 cm atau sternomental < 12.5 cm menandakan **laring letak anterior / retrognatia** dengan aksis laringeal yang curam."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Cervical Spine Range of Motion: Assess neck flexion and atlanto-occipital joint extension. Ask patient to look straight down at chest, then tilt head all the way back to look at ceiling.",
          id: "Rentang Gerak Tulang Belakang Leher (C-Spine Mobility): Nilai fleksi leher dan ekstensi sendi atlanto-oksipital. Minta pasien menunduk melihat dada, lalu menengadah maksimal menatap langit-langit."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Atlanto-occipital extension >= 35 degrees without pain or radicular paresthesias. Allows optimal 'sniffing position' for visual axis alignment.",
          id: "Ekstensi atlanto-oksipital >= 35 derajat tanpa rasa nyeri atau parestesia. Memungkinkan posisi menghidu ('sniffing position') optimal untuk penyelarasan sumbu visual."
        },
        abnormalFindings: {
          en: "Restricted extension (< 30 degrees) in cervical spondylosis, rheumatoid arthritis, ankylosing spondylitis, or prior cervical fusion (Predicts difficult direct line of sight).",
          id: "Ekstensi terbatas (< 30 derajat) pada spondilosis servikal, artritis reumatoid, ankilosing spondilitis, atau riwayat fusi leher (Memprediksi hambatan garis pandang laring)."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "Dentition, Facial Anatomy & Mask Ventilation Predictors (MOANs / LEMON): Inspect for loose/chipped teeth, prominent maxillary incisors, edentulous gums, macroglossia, thick beard, morbid obesity (BMI > 35), and history of snoring / obstructive sleep apnea.",
          id: "Pemeriksaan Gigi, Anatomi Wajah & Prediktor Ventilasi Sungkup (MOANs / LEMON): Periksa gigi goyang/patah, gigi seri atas tonggos, ompong, makroglosia, jenggot lebat, obesitas morbid (BMI > 35), dan riwayat mendengkur / obstructive sleep apnea."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Sound dentition without loose crowns, clean-shaven or minimal facial hair, normal BMI, no history of snoring, low risk for mask ventilation difficulty.",
          id: "Gigi geligi kuat tanpa mahkota goyang, wajah tercukur rapi, BMI normal, tidak ada riwayat mendengkur, risiko rendah kesulitan ventilasi sungkup."
        },
        abnormalFindings: {
          en: "High risk of difficult mask ventilation: **Beard**, **Obesity (BMI > 30)**, **No teeth (edentulous)**, **Elderly (> 55)**, **Snores / OSA** (BONES criteria). Prepare oral/nasal airways, two-person technique, and videolaryngoscope.",
          id: "Risiko tinggi kesulitan ventilasi sungkup: **Jenggot lebat**, **Obesitas (BMI > 30)**, **Tidak bergigi (edentulus)**, **Lanjut usia (> 55)**, **Mendengkur / OSA** (kriteria BONES). Siapkan airway orofaring, teknik dua penolong, dan videolaringoskop."
        }
      }
    ]
  },
  {
    id: 7,
    title: {
      en: "Comprehensive Abdominal & Peritoneal Signs Exam",
      id: "Pemeriksaan Abdomen & Tanda Peritonitis Komprehensif"
    },
    category: "Gastroenterology",
    definition: {
      en: "A structured 4-step assessment (Inspection, Auscultation, Percussion, Palpation) of the abdominal wall, visceral organs, ascites, and specialized signs of surgical acute abdomen.",
      id: "Penilaian terstruktur 4 langkah (Inspeksi, Auskultasi, Perkusi, Palpasi) dinding abdomen, organ visceral, asites, dan tanda-tanda khusus akut abdomen bedah."
    },
    preparation: {
      en: "Patient supine with arms at sides and knees slightly flexed to relax abdominal wall muscles. Warm hands and stethoscope. Ask patient to identify focal painful areas first.",
      id: "Pasien berbaring telentang dengan lengan di samping dan lutut sedikit ditekuk untuk mengendurkan otot dinding perut. Hangatkan tangan dan stetoskop. Minta pasien menunjukkan area nyeri terlebih dahulu."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Abdominal Wall Inspection: Inspect contour (scaphoid, flat, distended), symmetry, surgical scars, visible pulsations, caput medusae, and ecchymoses (**Cullen's sign** periumbilical, **Grey Turner's sign** in flanks).",
          id: "Inspeksi Dinding Abdomen: Inspeksi kontur (skafoid, datar, distensi), kesimetrisan, parut operasi, pulsasi tampak, kaput medusa, dan ekimosis (**tanda Cullen** periumbilikal, **tanda Grey Turner** di area panggul)."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Symmetric, flat or rounded contour; unblemished skin, no dilated collateral veins, no visible masses or abnormal peristaltic waves.",
          id: "Simetris, kontur datar atau sedikit cembung; kulit bersih, tidak ada pelebaran vena kolateral, tidak ada massa atau gerakan peristaltik tampak."
        },
        abnormalFindings: {
          en: "Generalized distension in bowel obstruction/ascites; caput medusae in portal hypertension; Cullen / Grey Turner sign indicating **retroperitoneal hemorrhage / acute necrotizing pancreatitis**.",
          id: "Distensi generalisata pada obstruksi usus/asites; kaput medusa pada hipertensi porta; tanda Cullen / Grey Turner yang menandakan **perdarahan retroperitoneal / pankreatitis nekrotikans akut**."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Auscultation of Bowel Sounds & Bruits: Place warmed stethoscope diaphragm gently in right lower quadrant (ileocecal valve area) and all 4 quadrants for at least 1-2 minutes BEFORE palpating or percussing. Listen for renal and aortic vascular bruits.",
          id: "Auscultasi Bising Usus & Bruit: Letakkan diafragma stetoskop hangat di kuadran kanan bawah (area katup ileosekal) dan keempat kuadran selama minimal 1-2 menit SEBELUM palpasi atau perkusi. Dengarkan bruit vaskular aorta dan arteri renalis."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Normal normoactive bowel sounds (gurgles and clicks occurring 5 to 30 times per minute). Absence of renal or aortic vascular bruits.",
          id: "Bising usus normoaktif (bunyi gemerincing dan klik 5 hingga 30 kali per menit). Tidak ada bruit vaskular aorta atau arteri renalis."
        },
        abnormalFindings: {
          en: "High-pitched, metallic 'tinkling' rushes in **mechanical bowel obstruction**; completely absent bowel sounds (> 3-5 min) in **paralytic ileus or generalized peritonitis**; systolic epigastric bruit in renal artery stenosis.",
          id: "Bising usus meningkat bernada tinggi 'tinkling' logam pada **obstruksi mekanik usus**; bising usus hilang total (> 3-5 menit) pada **ileus paralitik atau peritonitis generalisata**; bruit sistolik epigastrium pada stenosis arteri renalis."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Percussion & Ascites Mapping: Percuss all 4 quadrants assessing tympany vs dullness. Measure liver span at right midclavicular line. If distended, test for **shifting dullness** (turn patient to side) and **fluid wave test**.",
          id: "Perkusi & Pemetaan Asites: Lakukan perkusi di 4 kuadran menilai batas timpani vs pekak. Ukur batas hepar (liver span) pada linea midklavikularis kanan. Bila ada distensi, uji **shifting dullness** (miringkan pasien) dan **undulasi cairan (fluid wave)**."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Predominantly tympanitic percussion note due to bowel gas. Normal liver span 6-12 cm in midclavicular line. Negative shifting dullness and fluid wave.",
          id: "Dominan suara timpani karena gas usus. Batas hepar normal 6-12 cm pada linea midklavikularis kanan. Shifting dullness dan fluid wave negatif."
        },
        abnormalFindings: {
          en: "Positive shifting dullness indicating **free peritoneal fluid / ascites (> 1500 mL)**; loss of liver dullness with diffuse hyperresonance in **pneumoperitoneum / hollow viscus perforation**.",
          id: "Shifting dullness positif menandakan **cairan bebas peritoneal / asites (> 1500 mL)**; hilangnya batas pekak hepar menjadi hipersonor pada **pneumoperitoneum / perforasi organ berongga**."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Light and Deep Palpation: Begin with gentle light palpation away from the site of pain to identify tenderness, muscle guarding, and superficial masses. Proceed to deep bimanual palpation assessing liver edge, spleen tip, and renal ballotability.",
          id: "Palpasi Ringan dan Dalam: Mulai dengan palpasi ringan lembut menjauhi area nyeri untuk menilai nyeri tekan, defans muskular, dan massa superfisial. Lanjutkan dengan palpasi dalam bimanual untuk menilai tepi hepar, apeks lien, dan ballotement ginjal."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Abdomen soft, non-tender, no guarding. Liver edge smooth and non-tender or non-palpable. Spleen not palpable in Traube's space.",
          id: "Perut supel, tidak ada nyeri tekan, tidak ada defans muskular. Tepi hepar teraba kenyal licin atau tidak teraba. Limpa tidak teraba di ruang Traube."
        },
        abnormalFindings: {
          en: "Involuntary abdominal wall rigidity ('board-like abdomen') and **rebound tenderness (Blumberg sign)** indicating **acute peritonitis**; firm nodular hepatomegaly in liver cirrhosis / metastasis; splenomegaly.",
          id: "Rigiditas dinding perut involunter ('papan') dan **nyeri lepas (tanda Blumberg)** yang menandakan **peritonitis akut**; hepatomegali keras berbenjol pada sirosis / metastasis; splenomegali."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Specialized Acute Abdomen Maneuvers: Perform **Murphy's sign** (palpate RUQ during deep inspiration; positive if sharp arrest occurs in acute cholecystitis); palpate **McBurney's point** (1/3 distance from ASIS to umbilicus); test **Rovsing's sign** (LLQ pressure causes RLQ pain); test **Psoas sign** and **Obturator sign**.",
          id: "Manuver Khusus Akut Abdomen: Lakukan **tanda Murphy** (palpasi kuadran kanan atas saat inspirasi dalam; positif bila ada henti napas mendadak akibat nyeri pada kolesistitis akut); palpasi **titik McBurney** (1/3 jarak SIAS ke umbilikus); uji **tanda Rovsing** (tekanan di kiri bawah memicu nyeri kanan bawah); uji **tanda Psoas** dan **tanda Obturator**."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Murphy's sign negative. No focal tenderness at McBurney's point. Rovsing, Psoas, and Obturator signs negative.",
          id: "Tanda Murphy negatif. Tidak ada nyeri tekan fokal pada titik McBurney. Tanda Rovsing, Psoas, dan Obturator negatif."
        },
        abnormalFindings: {
          en: "Positive Murphy's sign in **acute cholecystitis**; positive McBurney tenderness, Rovsing, Psoas, or Obturator signs highly suggestive of **acute appendicitis** requiring surgical consultation.",
          id: "Tanda Murphy positif pada **kolesistitis akut**; nyeri tekan McBurney, Rovsing, Psoas, atau Obturator positif sangat mengarah pada **apendisitis akut** yang membutuhkan konsultasi bedah cito."
        }
      }
    ]
  },
  {
    id: 8,
    title: {
      en: "Motor, Sensory & Reflex Neurological Examination",
      id: "Pemeriksaan Neurologis Motorik, Sensorik & Refleks"
    },
    category: "Neurology",
    definition: {
      en: "A comprehensive assessment of muscular power, tone, bulk, deep tendon reflexes, pathologic pyramidal reflexes, and dermatomal sensory pathways.",
      id: "Penilaian komprehensif kekuatan otot, tonus, massa otot, refleks tendon dalam, refleks patologis piramidal, dan jalur sensorik dermatom."
    },
    preparation: {
      en: "Comfortable room temperature. Expose limbs symmetrically. Prepare Taylor/Queen Square reflex hammer, cotton wisp, disposable neuro-pin, and 128 Hz tuning fork.",
      id: "Suhu ruangan nyaman. Buka ekstremitas secara simetris. Siapkan palu refleks Taylor/Queen Square, kapas halus, jarum neuro steril sekali pakai, dan garpu tala 128 Hz."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Muscle Bulk & Tone: Inspect all major muscle groups for symmetry, atrophy, and fasciculations. Passively flex and extend joints to assess tone (flaccidity, spasticity with clasp-knife catch, rigidity).",
          id: "Massa & Tonus Otot: Inspeksi kelompok otot utama untuk kesimetrisan, atrofi, dan fasikulasi. Gerakkan sendi secara pasif untuk menilai tonus (flaksid/hipotonus, spastisitas clasp-knife, rigiditas lead-pipe/cogwheel)."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Symmetric muscle bulk without atrophy or fasciculations. Normal resting tone with smooth passive resistance.",
          id: "Massa otot simetris tanpa atrofi atau fasikulasi. Tonus istirahat normal dengan resistensi pasif yang mulus."
        },
        abnormalFindings: {
          en: "Focal muscle wasting and fasciculations in **Lower Motor Neuron (LMN) lesions** (e.g. ALS, peripheral neuropathy); spastic hypertonia with clasp-knife phenomenon in **Upper Motor Neuron (UMN) lesions / stroke**; cogwheel rigidity in Parkinsonism.",
          id: "Penyusutan otot fokal dan fasikulasi pada **lesi Lower Motor Neuron (LMN)**; hipertonia spastik dengan fenomena pisau lipat (clasp-knife) pada **lesi Upper Motor Neuron (UMN) / stroke**; rigiditas roda bergigi pada Parkinsonisme."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Muscle Strength Testing (MRC Scale 0-5): Systematically test strength against resistance in key muscle groups: C5 (deltoid abduction), C6 (biceps flexion/wrist extension), C7 (triceps extension/wrist flexion), C8 (finger flexors), T1 (finger abductors), L2 (hip flexors), L3-L4 (knee extension), L4 (ankle dorsiflexion), L5 (great toe extension), S1 (ankle plantarflexion).",
          id: "Uji Kekuatan Otot (Skala MRC 0-5): Uji kekuatan melawan tahanan pada kelompok otot kunci secara sistematis: C5 (abduksi deltoid), C6 (fleksi biseps/ekstensi pergelangan), C7 (ekstensi triseps), C8 (fleksi jari), T1 (abduksi jari), L2 (fleksi panggul), L3-L4 (ekstensi lutut), L4 (dorsofleksi pergelangan), L5 (ekstensi jempol), S1 (plantarfleksi pergelangan)."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Grade 5/5 power throughout all muscle groups bilaterally against full maximal examiner resistance.",
          id: "Kekuatan derajat 5/5 di seluruh kelompok otot bilateral melawan tahanan maksimal pemeriksa."
        },
        abnormalFindings: {
          en: "Paresis or paralysis: Grade 0 (no movement), Grade 1 (trace flicker), Grade 2 (movement with gravity eliminated), Grade 3 (against gravity only), Grade 4 (against moderate resistance). Unilateral hemiparesis in stroke; paraparesis in spinal cord injury.",
          id: "Paresis atau paralisis: Derajat 0 (tidak ada gerakan sama sekali), Derajat 1 (kontraksi samar/flicker), Derajat 2 (gerakan tanpa gravitasi), Derajat 3 (mampu melawan gravitasi saja), Derajat 4 (melawan tahanan sedang). Hemiparesis unilateral pada stroke; paraparesis pada cedera medula spinalis."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Deep Tendon Reflexes (DTRs): Elicit reflexes symmetrically and grade from 0 to 4+: Biceps (C5-C6), Brachioradialis (C6), Triceps (C7), Patellar knee jerk (L3-L4), and Achilles ankle jerk (S1). Use Jendrassik reinforcement maneuver if reflexes are difficult to elicit.",
          id: "Refleks Tendon Dalam (DTR): Ketuk refleks secara simetris dan nilai derajat 0 hingga 4+: Biseps (C5-C6), Brakhioradialis (C6), Triseps (C7), Patela (L3-L4), dan Achilles (S1). Gunakan manuver pengalih Jendrassik bila refleks sulit dibangkitkan."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Grade 2+ brisk, symmetric reflexes throughout all upper and lower extremities without spread or clonus.",
          id: "Refleks derajat 2+ normal dan simetris di seluruh ekstremitas atas dan bawah tanpa penyebaran atau klonus."
        },
        abnormalFindings: {
          en: "Hyperreflexia (Grade 3+ to 4+) with sustained ankle clonus in **UMN pyramidal lesions**; hyporeflexia or areflexia (Grade 0 to 1+) in **LMN lesions / Guillain-Barré syndrome / severe diabetic polyneuropathy**.",
          id: "Hiperrefleksia (Derajat 3+ hingga 4+) dengan klonus pergelangan kaki persisten pada **lesi piramidal UMN**; hiporefleksia atau arefleksia (Derajat 0 hingga 1+) pada **lesi LMN / sindrom Guillain-Barré / polineuropati diabetik**."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Pathological Plantar Response (Babinski Sign): Stroke the lateral aspect of the plantar foot sole firmly from the heel forward across the ball of the foot using a blunt instrument (e.g. handle of reflex hammer).",
          id: "Respons Plantar Patologis (Tanda Babinski): Goreskan tepi lateral telapak kaki secara tegas dari tumit melengkung ke arah pangkal ibu jari kaki menggunakan benda tumpul (gagang palu refleks)."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Normal flexor response: Downward plantarflexion of all toes (negative Babinski).",
          id: "Respons fleksor normal: Plantarfleksi ke arah bawah dari seluruh jari kaki (Babinski negatif)."
        },
        abnormalFindings: {
          en: "**Positive Babinski sign**: Slow dorsiflexion (extension) of the great toe accompanied by fanning (abduction) of the other toes, pathognomonic of **corticospinal tract / UMN pyramidal dysfunction**.",
          id: "**Tanda Babinski positif**: Dorsofleksi (ekstensi) lambat dari ibu jari kaki disertai mekarnya (fanning) jari-jari lainnya, patognomonis untuk **gangguan traktus kortikospinalis / lesi UMN**."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Dermatomal Sensory Testing: Test light touch (cotton wisp), pain sensation (sterile pinprick), temperature, vibration (128 Hz tuning fork over distal bony prominences), and joint position sense (proprioception at distal interphalangeal joints) across representative dermatomes.",
          id: "Uji Sensorik Dermatom: Uji raba halus (kapas), rasa nyeri (jarum steril), suhu, getar (garpu tala 128 Hz di tonjolan tulang distal), dan propriosepsi posisi sendi pada sendi interfalang distal melintasi dermatom representatif."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Intact, symmetric light touch, sharp pinprick sensation, vibration (> 10 sec), and accurate joint position detection bilaterally.",
          id: "Sensasi raba halus, tusukan jarum, rasa getar (> 10 detik), dan deteksi posisi sendi yang utuh dan simetris bilateral."
        },
        abnormalFindings: {
          en: "Sensory level cutoff in **spinal cord transection / compressive myelopathy**; 'stocking-and-glove' distal symmetrical sensory loss in **peripheral diabetic neuropathy**; hemianesthesia in stroke.",
          id: "Batas sensorik tegas (sensory level) pada **transeksi medula spinalis / mielopati kompresif**; pola 'sarung tangan dan kaus kaki' (stocking-glove) pada **neuropati diabetik**; hemianestesia pada stroke."
        }
      }
    ]
  },
  {
    id: 9,
    title: {
      en: "Cerebellar Function & Coordination Exam",
      id: "Pemeriksaan Fungsi Serebelar & Koordinasi"
    },
    category: "Neurology",
    definition: {
      en: "A targeted bedside assessment of cerebellar hemispheric and midline vermian integrity, dysmetria, intention tremor, dysdiadochokinesia, and postural ataxia.",
      id: "Penilaian klinis terarah integritas hemisfer dan vermis serebelar, dismetria, tremor intensional, disdiadokokinesis, dan ataksia postural."
    },
    preparation: {
      en: "Ensure patient safety against falls. Stand close during standing and gait testing. Clear examination area of obstacles.",
      id: "Pastikan keamanan pasien dari risiko jatuh. Berdiri dekat pasien saat pengujian berdiri dan berjalan. Bersihkan area dari rintangan."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Finger-to-Nose Test & Dysmetria: Ask the patient to fully extend their arm and touch their nose with index finger, then touch examiner's outstretched finger back and forth at varying locations.",
          id: "Tes Jari-ke-Hidung & Dismetria: Minta pasien merentangkan lengan penuh dan menyentuh ujung hidungnya dengan telunjuk, lalu bergantian menyentuh ujung jari pemeriksa yang berpindah-pindah lokasi."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Smooth, rapid, accurate movements without hesitation, overshooting, or terminal shaking.",
          id: "Gerakan mulus, cepat, akurat tanpa keraguan, overshooting (kelewat batas), atau gemetar di akhir gerakan."
        },
        abnormalFindings: {
          en: "**Dysmetria** (past-pointing or under-shooting target) and prominent **kinetic / intention tremor** (worsening oscillation near target) indicating **ipsilateral cerebellar hemisphere lesion**.",
          id: "**Dismetria** (overshooting melewati target) dan **tremor intensional** yang nyata (osilasi makin memburuk mendekati target), menandakan **lesi hemisfer serebelar ipsilateral**."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Rapid Alternating Movements (Dysdiadochokinesia): Ask patient to rapidly pronate and supinate one hand on the palm of the other, or slap their thighs alternating between palm and dorsum as fast as possible.",
          id: "Gerakan Cepat Bergantian (Disdiadokokinesis): Minta pasien membolak-balikkan tangan (pronasi dan supinasi) secara cepat di atas telapak tangan lainnya atau di atas paha secepat mungkin."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Rapid, rhythmic, smooth, and symmetric alternating hand movements bilaterally.",
          id: "Gerakan bolak-balik tangan yang cepat, berirama teratur, mulus, dan simetris bilateral."
        },
        abnormalFindings: {
          en: "**Dysdiadochokinesia**: Slow, irregular, clumsy, arrhythmic movements characteristic of cerebellar neocortex dysfunction.",
          id: "**Disdiadokokinesis**: Gerakan lambat, terputus-putus, kaku, dan tidak berirama yang khas pada disfungsi neokorteks serebelar."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Heel-to-Shin Test: With patient supine, ask them to place the heel of one foot on the opposite knee and slide it smoothly straight down the crest of the shin to the ankle, and repeat.",
          id: "Tes Tumit-ke-Tulang Kering (Heel-to-Shin): Dengan pasien berbaring, minta pasien meletakkan tumit satu kaki di atas lutut yang berlawanan dan meluncurkannya lurus ke bawah sepanjang tulang kering hingga pergelangan kaki."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Heel stays precisely on the anterior tibial crest and slides smoothly without wavering.",
          id: "Tumit tetap berada tepat di atas krista tibia anterior dan meluncur mulus tanpa goyah atau tergelincir."
        },
        abnormalFindings: {
          en: "Inability to maintain heel on shin; erratically oscillates from side to side or falls off the leg, indicating **lower extremity cerebellar ataxia**.",
          id: "Ketidakmampuan menjaga tumit di tulang kering; berosilasi liar ke kanan-kiri atau tergelincir jatuh, menandakan **ataksia serebelar ekstremitas bawah**."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Romberg Test & Differentiating Sensory vs Cerebellar Ataxia: Ask patient to stand with feet close together and arms crossed. First observe stability with eyes open for 20-30 seconds, then have patient CLOSE eyes.",
          id: "Tes Romberg & Pembedaan Ataksia Sensorik vs Serebelar: Minta pasien berdiri tegak dengan kedua kaki rapat dan kedua tangan menyilang di dada. Amati kestabilan dengan mata terbuka selama 20-30 detik, lalu minta pasien MENUTUP mata."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Maintains upright posture with minimal swaying with both eyes open and eyes closed.",
          id: "Mampu mempertahankan postur tegak stabil dengan goyangan minimal baik saat mata terbuka maupun tertutup."
        },
        abnormalFindings: {
          en: "**Positive Romberg sign**: Steady with eyes open, but sways heavily or falls immediately upon closing eyes, indicating **Sensory Ataxia (dorsal column / proprioceptive loss)**. In contrast, **Cerebellar ataxia** patients are unsteady even with eyes OPEN.",
          id: "**Tanda Romberg positif**: Stabil saat mata terbuka, tetapi langsung bergoyang hebat atau terjatuh saat menutup mata, menandakan **Ataksia Sensorik (gangguan kolumna dorsalis / propriosepsi)**. Sebaliknya, pada **ataksia serebelar**, pasien sudah goyah bahkan saat mata TERBUKA."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Tandem Gait (Heel-to-Toe Walking): Ask patient to walk in a straight line placing the heel of the front foot directly touching the toes of the back foot.",
          id: "Gait Tandem (Berjalan Tumit-ke-Jari): Minta pasien berjalan lurus ke depan dengan menempatkan tumit kaki depan tepat menyentuh ujung jari kaki belakang (seperti berjalan di atas tali)."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Smooth, steady tandem walking along a straight line without stepping sideways or losing balance.",
          id: "Berjalan tandem lurus dengan mulus dan mantap tanpa melangkah melebar ke samping atau kehilangan keseimbangan."
        },
        abnormalFindings: {
          en: "Broad-based staggering gait, inability to perform tandem walking, persistent lurching toward the side of the lesion (**midline vermis / flocculonodular lesion**).",
          id: "Gait melebar sempoyongan seperti orang mabuk (ataksia trunkal), ketidakmampuan berjalan tandem, selalu condong/jatuh ke sisi lesi (**lesi vermis garis tengah / lobus flokulonodularis**)."
        }
      }
    ]
  },
  {
    id: 10,
    title: {
      en: "Peripheral Vascular Examination & Allen Test",
      id: "Pemeriksaan Vaskular Perifer & Tes Allen"
    },
    category: "Cardiology",
    definition: {
      en: "A vital vascular assessment covering peripheral pulse palpation (0-4+ scale), ulnar collateral circulation testing (Modified Allen Test) prior to arterial line cannulation, capillary refill, and deep venous evaluation.",
      id: "Pemeriksaan vaskular vital mencakup palpasi nadi perifer (skala 0-4+), pengujian sirkulasi kolateral arteri ulnaris (Tes Allen Modifikasi) sebelum kanulasi arteri line, capillary refill, dan evaluasi vena dalam."
    },
    preparation: {
      en: "Expose arms and legs symmetrically. Ambient room temperature comfortable to prevent peripheral vasoconstriction. Stop watch or second hand for Allen test timing.",
      id: "Buka ekstremitas atas dan bawah secara simetris. Suhu ruangan hangat dan nyaman untuk mencegah vasokonstriksi perifer. Jam dengan penunjuk detik untuk mengukur waktu tes Allen."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Upper Extremity Pulse Palpation: Palpate radial and brachial pulses bilaterally. Grade pulse amplitude: 0 (absent), 1+ (diminished/weak), 2+ (normal), 3+ (increased/full), 4+ (bounding/water-hammer). Check for radio-radial or radio-femoral delay.",
          id: "Palpasi Nadi Ekstremitas Atas: Palpasi denyut nadi radialis dan brakialis bilateral. Nilai amplitudo nadi: 0 (tidak teraba), 1+ (lemah/berkurang), 2+ (normal), 3+ (kuat), 4+ (bounding/water-hammer). Periksa adanya keterlambatan radio-radialis atau radio-femoralis."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Equal, synchronous 2+ normal pulses bilaterally without radio-radial or radio-femoral delay.",
          id: "Denyut nadi 2+ normal, sinkron, dan seimbang bilateral tanpa keterlambatan denyut radio-radialis atau radio-femoralis."
        },
        abnormalFindings: {
          en: "Asymmetric or absent pulses in **arterial embolism / peripheral artery disease / subclavian steal**; radio-femoral pulse delay in **aortic coarctation**; bounding water-hammer pulse in severe aortic regurgitation.",
          id: "Nadi asimetris atau hilang pada **emboli arteri / penyakit arteri perifer / subclavian steal**; perlambatan radio-femoralis pada **koarktasio aorta**; water-hammer pulse bounding pada regurgitasi aorta berat."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Modified Allen Test for Radial Artery Cannulation: Elevate patient's hand and ask them to clench fist tightly for 30 seconds. Simultaneously compress both the **radial and ulnar arteries** firmly at the wrist. Have patient open hand (palm appears blanched). Release pressure ONLY on the **ulnar artery** while observing palmar reperfusion time.",
          id: "Tes Allen Modifikasi untuk Kanulasi Arteri Line: Angkat tangan pasien dan minta mengepalkan tinju rapat selama 30 detik. Tekan kedua arteri **radialis dan ulnaris** secara bersamaan di pergelangan tangan. Minta pasien membuka telapak tangan (tampak pucat/blanched). Lepaskan tekanan HANYA pada **arteri ulnaris** dan amati waktu pemulihan warna telapak tangan."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "**Normal / Positive Allen Test**: Prompt flush and reperfusion of the entire palm occurs within **< 5 to 7 seconds**, demonstrating adequate ulnar collateral circulation. Safe to proceed with radial artery cannulation.",
          id: "**Tes Allen Normal / Positif**: Pemulihan warna kemerahan (flushing) seluruh telapak tangan terjadi dalam waktu **< 5 hingga 7 detik**, membuktikan kecukupan kolateral arteri ulnaris. Aman untuk pemasangan arterial line radialis."
        },
        abnormalFindings: {
          en: "**Abnormal / Negative Allen Test**: Palm remains pale and blanched for **> 10 to 14 seconds** (Inadequate ulnar collateral flow; absolute contraindication to radial arterial line placement due to high risk of hand ischemia).",
          id: "**Tes Allen Abnormal / Negatif**: Telapak tangan tetap pucat selama **> 10 hingga 14 detik** (Kolateral ulnaris tidak memadai; kontraindikasi kanulasi arteri radialis karena risiko iskemia tangan)."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Lower Extremity Pulse Palpation: Systematically palpate bilateral: Femoral pulse (mid-inguinal point), Popliteal pulse (deep in popliteal fossa with knee slightly flexed), Posterior Tibial pulse (behind and below medial malleolus), and Dorsalis Pedis pulse (dorsum of foot lateral to extensor hallucis longus tendon).",
          id: "Palpasi Nadi Ekstremitas Bawah: Palpasi denyut nadi bilateral secara sistematis: Nadi femoralis (titik tengah inguinal), Nadi poplitea (fosa poplitea dengan lutut fleksi santai), Nadi tibialis posterior (belakang maleolus medialis), dan Nadi dorsalis pedis (punggung kaki lateral tendon ekstensor halusis longus)."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Palpable, symmetric 2+ pulses throughout femoral, popliteal, posterior tibial, and dorsalis pedis vessels bilaterally.",
          id: "Denyut nadi 2+ normal dan simetris pada pembuluh darah femoralis, poplitea, tibialis posterior, dan dorsalis pedis bilateral."
        },
        abnormalFindings: {
          en: "Diminished or absent distal pulses in **Peripheral Artery Disease (PAD)**; acute cold, pale, pulseless, painful limb in **acute arterial occlusion (6 Ps)** requiring emergency thrombectomy.",
          id: "Nadi distal berkurang atau menghilang pada **Penyakit Arteri Perifer (PAD)**; tungkai dingin, pucat, nyeri, parastesia, dan pulseless mendadak pada **oklusi arteri akut (6P)** yang membutuhkan trombektomi darurat."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Capillary Refill Time (CRT) & Temperature: Compress the pulp of the index finger or great toe for 5 seconds until blanching occurs, release and time the return of pink color. Palpate skin temperature from proximal thigh to distal toes using dorsum of hands.",
          id: "Capillary Refill Time (CRT) & Suhu Kulit: Tekan ujung jari tangan atau jempol kaki selama 5 detik hingga memucat, lepaskan dan hitung waktu kembalinya warna merah muda. Raba suhu kulit dari paha proksimal ke ujung jari menggunakan punggung tangan."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Brisk capillary refill time < 2.0 seconds. Warm skin temperature uniformly distributed to distal digits.",
          id: "Capillary refill time cepat < 2.0 detik. Suhu kulit hangat merata hingga ke ujung jari-jari."
        },
        abnormalFindings: {
          en: "Prolonged CRT (> 3 seconds) indicating **systemic hypoperfusion, circulatory shock, or severe arterial insufficiency**; distinct temperature demarcation line in acute arterial obstruction.",
          id: "CRT memanjang (> 3 detik) menandakan **hipoperfusi sistemik, syok sirkulasi, atau insufisiensi arteri berat**; batas demarkasi suhu dingin yang tegas pada obstruksi arteri akut."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Deep Vein Thrombosis (DVT) Physical Signs: Inspect legs for unilateral calf swelling, erythema, and prominent superficial collateral veins. Measure calf circumference at a point 10 cm below the tibial tuberosity bilaterally. Palpate along deep venous tract for focal tenderness.",
          id: "Tanda Fisik Trombosis Vena Dalam (DVT): Inspeksi tungkai untuk pembengkakan betis unilateral, kemerahan, dan pelebaran vena superfisial. Ukur lingkar betis pada titik 10 cm di bawah tuberositas tibia secara bilateral. Palpasi sepanjang jalur vena dalam untuk mencari nyeri tekan fokal."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Calf circumferences symmetric (difference < 1 cm), non-tender calves, absence of asymmetric swelling or erythema.",
          id: "Lingkar betis simetris (perbedaan < 1 cm), betis tidak nyeri tekan, tidak ada pembengkakan asimetris atau kemerahan."
        },
        abnormalFindings: {
          en: "Unilateral calf swelling with circumference **> 3 cm greater than asymptomatic side**, localized deep tenderness, and pitting edema indicating high probability of **acute Deep Vein Thrombosis (Wells DVT criteria)**.",
          id: "Pembengkakan betis unilateral dengan lingkar **> 3 cm lebih besar dibandingkan sisi sehat**, nyeri tekan lokal, dan edema pitting menandakan probabilitas tinggi **DVT akut (kriteria Wells DVT)**."
        }
      }
    ]
  },
  {
    id: 11,
    title: {
      en: "Thyroid & Endocrine Neck Examination",
      id: "Pemeriksaan Tiroid & Endokrin Leher"
    },
    category: "Endocrinology",
    definition: {
      en: "A structured head and neck endocrine exam focusing on thyroid gland inspection, bimanual swallowing palpation, retrosternal goiter assessment, and tetany signs (Chvostek & Trousseau).",
      id: "Pemeriksaan endokrin kepala dan leher terstruktur berfokus pada inspeksi kelenjar tiroid, palpasi bimanual saat menelan, penilaian struma retrosternal, dan tanda tetani hipokalsemia (Chvostek & Trousseau)."
    },
    preparation: {
      en: "Patient seated comfortably. Provide a cup of water for swallowing evaluation. Adequate tangent lighting. Sphygmomanometer cuff available for Trousseau test.",
      id: "Pasien duduk tegak nyaman. Sediakan segelas air minum untuk evaluasi gerakan menelan. Pencahayaan tangensial memadai. Manset tensimeter tersedia untuk tes Trousseau."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Thyroid Gland Inspection: Inspect anterior neck with neck slightly extended. Ask patient to take a sip of water and swallow. Observe for upward movement of thyroid cartilage and gland, asymmetry, visible masses, and dilated veins.",
          id: "Inspeksi Kelenjar Tiroid: Inspeksi leher anterior dengan leher sedikit ekstensi. Minta pasien meminum seteguk air dan menelannya. Amati pergerakan ke atas dari kartilago tiroid dan kelenjar, kesimetrisan, massa tampak, dan pelebaran vena."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Thyroid gland not visibly enlarged; smooth, symmetric upward excursion during swallowing without bulging nodules.",
          id: "Kelenjar tiroid tidak tampak membesar; gerakan ke atas simetris dan mulus saat menelan tanpa nodul yang menonjol."
        },
        abnormalFindings: {
          en: "Visible diffuse or multinodular goiter; fixed neck mass that fails to elevate on swallowing (invasive thyroid carcinoma / fixed lymphadenopathy).",
          id: "Struma difus atau multinodular yang tampak jelas; massa leher terfiksir yang tidak ikut terangkat saat menelan (karsinoma tiroid invasif / limfadenopati terfiksir)."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Bimanual Palpation of Thyroid: Stand behind the seated patient. Place index and middle fingers of both hands on lower neck below cricoid cartilage. Ask patient to swallow water; palpate thyroid isthmus and both lateral lobes for size, consistency, nodules, and tenderness.",
          id: "Palpasi Bimanual Tiroid: Pemeriksa berdiri di belakang pasien yang duduk. Letakkan jari telunjuk dan tengah kedua tangan di leher bagian bawah di bawah kartilago krikoid. Minta pasien menelan air; palpasi isthmus tiroid dan kedua lobus lateral untuk menilai ukuran, konsistensi, nodul, dan nyeri tekan."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Thyroid is barely palpable or soft and non-palpable, rubbery, smooth, movable, non-tender, with no discrete nodules.",
          id: "Kelenjar tiroid hampir tidak teraba atau kenyal lembut, licin, mudah digerakkan, tidak nyeri tekan, tanpa nodul diskret."
        },
        abnormalFindings: {
          en: "Hard, stony, irregular, fixed solitary nodule suspicious for **thyroid malignancy**; tender enlarged gland in subacute de Quervain's thyroiditis; diffuse soft enlargement with thrill in Graves' disease.",
          id: "Nodul soliter keras, tidak rata, dan terfiksir yang mencurigakan **keganasan tiroid**; pembesaran tiroid yang sangat nyeri tekan pada tiroiditis subakut de Quervain; pembesaran difus lembut disertai getaran (thrill) pada penyakit Graves."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Thyroid Auscultation: Place the bell of the stethoscope over the superior poles of the thyroid gland. Listen for continuous systolic-diastolic vascular bruits while patient holds their breath.",
          id: "Auskultasi Tiroid: Letakkan bell stetoskop di atas kutub superior kedua lobus kelenjar tiroid. Dengarkan adanya bruit vaskular sistolik-diastolik saat pasien menahan napas sejenak."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "No vascular bruits audible over the thyroid gland lobes.",
          id: "Tidak terdengar bruit vaskular di atas lobus kelenjar tiroid."
        },
        abnormalFindings: {
          en: "Systolic or continuous vascular bruit pathognomonic of **severe hyperthyroidism / Graves' disease** resulting from markedly increased parenchymal blood flow.",
          id: "Bruit vaskular sistolik atau kontinu yang patognomonis untuk **hipertiroidisme berat / penyakit Graves** akibat peningkatan drastis aliran darah parenkim."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Pemberton's Sign for Retrosternal Goiter: Ask the patient to elevate both arms straight above their head until touching the ears, and hold this position for 60 seconds.",
          id: "Tanda Pemberton untuk Struma Retrosternal: Minta pasien mengangkat kedua lengan lurus ke atas kepala hingga menyentuh telinga, dan pertahankan posisi ini selama 60 detik."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "No facial flushing, cyanosis, neck vein engorgement, or respiratory stridor during 60 seconds of arm elevation.",
          id: "Tidak ada kemerahan wajah (facial flushing), sianosis, distensi vena leher, atau stridor pernapasan selama 60 detik mengangkat lengan."
        },
        abnormalFindings: {
          en: "**Positive Pemberton's sign**: Progressive facial plethora, cyanosis, distended jugular veins, and stridor indicating **thoracic inlet obstruction from a large retrosternal goiter**.",
          id: "**Tanda Pemberton positif**: Plethora kemerahan wajah progresif, sianosis, vena jugularis melebar, dan stridor yang menandakan **obstruksi pintu atas panggul dada (thoracic inlet) akibat struma retrosternal besar**."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Hypocalcemia & Latent Tetany Signs: Test **Chvostek's sign** by tapping the facial nerve 2 cm anterior to the ear tragus. Test **Trousseau's sign** by inflating a sphygmomanometer cuff on the upper arm to 20 mmHg above systolic BP for 3 minutes.",
          id: "Tanda Hipokalsemia & Tetani Laten: Uji **tanda Chvostek** dengan mengetuk saraf fasialis 2 cm di depan tragus telinga. Uji **tanda Trousseau** dengan mengembangkan manset tensimeter di lengan atas 20 mmHg di atas tekanan darah sistolik selama 3 menit."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "No facial twitching upon tapping. No carpopedal spasm after 3 minutes of cuff inflation.",
          id: "Tidak ada kedutan otot wajah saat diketuk. Tidak ada spasme karpopedal setelah 3 menit inflasi manset."
        },
        abnormalFindings: {
          en: "Chvostek sign positive (ipsilateral twitching of facial/lip muscles); **Trousseau sign positive** (carpopedal spasm: wrist flexion, metacarpophalangeal flexion, finger extension, and thumb adduction), highly sensitive for **acute severe hypocalcemia** following thyroidectomy.",
          id: "Tanda Chvostek positif (kedutan otot wajah/bibir ipsilateral); **tanda Trousseau positif** (spasme karpopedal: fleksi pergelangan dan MCP, ekstensi interfalang, adduksi ibu jari 'tangan obstetri'), sangat sensitif untuk **hipokalsemia berat akut pasca-tiroidektomi**."
        }
      }
    ]
  },
  {
    id: 12,
    title: {
      en: "Pediatric Physical & Neonatal Distress Exam",
      id: "Pemeriksaan Fisik Pediatrik & Kegawatan Neonatus"
    },
    category: "Pediatrics",
    definition: {
      en: "A high-yield pediatric assessment evaluating anterior fontanelle tension, the Silverman-Anderson respiratory retraction index, clinical dehydration scoring, and neonatal primitive reflexes.",
      id: "Pemeriksaan pediatrik mendalam mengevaluasi tegangan ubun-ubun besar (fontanela anterior), indeks retraksi distres napas Silverman-Anderson, derajat dehidrasi klinis, dan refleks primitif neonatus."
    },
    preparation: {
      en: "Warm environment to prevent neonatal hypothermia. Patient calm or sleeping initially for heart/lung auscultation. Warm hands and stethoscope.",
      id: "Suhu ruangan hangat untuk mencegah hipotermia neonatus. Pasien tenang atau tertidur pada awalnya untuk auskultasi jantung/paru. Hangatkan tangan dan stetoskop."
    },
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: "Anterior Fontanelle Palpation: With the infant held upright and calm (not crying), gently palpate the diamond-shaped anterior fontanelle assessing size, softness, and contour.",
          id: "Palpasi Fontanela Anterior (Ubun-ubun Besar): Dengan bayi digendong tegak dan tenang (tidak sedang menangis), raba fontanela anterior yang berbentuk belah ketupat untuk menilai ukuran, kelunakan, dan konturnya."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Soft, flat or slightly sunken, pulsating synchronously with peripheral pulses in a calm upright infant.",
          id: "Lunak, datar atau sedikit cekung, berdenyut sinkron dengan denyut nadi perifer pada bayi yang tenang."
        },
        abnormalFindings: {
          en: "**Tense, bulging fontanelle** in elevated intracranial pressure, meningitis, or hydrocephalus; **severely sunken fontanelle** in significant dehydration / hypovolemia.",
          id: "**Fontanela tegang dan membonjol** pada peningkatan tekanan intrakranial, meningitis, atau hidrosefalus; **fontanela sangat cekung** pada dehidrasi berat / hipovolemia."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Silverman-Anderson Respiratory Distress Index: Score 5 parameters from 0 to 2 each: 1) Upper chest synchronization, 2) Lower chest indrawing, 3) Xiphoid retraction, 4) Nares flaring, 5) Expiratory grunting.",
          id: "Indeks Distres Pernapasan Silverman-Anderson: Beri skor 5 parameter masing-masing 0 hingga 2: 1) Gerakan dada atas & perut sinkron, 2) Retraksi interkostal bawah, 3) Retraksi xiphoid, 4) Pernapasan cuping hidung, 5) Grunting (merintih) ekspirasi."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "**Score 0**: Synchronous abdominal and thoracic expansion, no retractions, no nasal flaring, no grunting (No respiratory distress).",
          id: "**Skor 0**: Gerakan dada dan perut sinkron, tidak ada retraksi, tidak ada napas cuping hidung, tidak ada grunting (Tidak ada distres napas)."
        },
        abnormalFindings: {
          en: "**Score >= 6 to 10**: Severe respiratory distress (paradoxical see-saw breathing, marked intercostal and xiphoid retractions, audible expiratory grunt without stethoscope) requiring immediate CPAP / endotracheal intubation.",
          id: "**Skor >= 6 hingga 10**: Distres pernapasan berat (gerakan paradoksal see-saw, retraksi interkostal dan xifoid nyata, merintih terdengar tanpa stetoskop) membutuhkan CPAP segera / intubasi endotrakeal."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Clinical Dehydration Assessment (WHO Scoring): Evaluate general appearance (alert vs lethargic/unconscious), sunken eyes, tears when crying, thirst (drinks normally vs eagerly vs unable to drink), and skin pinch turgor on abdomen (time to recoil).",
          id: "Penilaian Dehidrasi Klinis (Skoring WHO): Evaluasi keadaan umum (sadar vs rewel vs letargis/koma), mata cekung, ada tidaknya air mata saat menangis, rasa haus (minum biasa vs haus lahap vs tidak bisa minum), dan turgor kulit perut (cubitan kulit kembali cepat atau lambat)."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Alert, active, normal eyes, moist mucous membranes, tears present, skin pinch recoils instantaneously (< 1 sec). No dehydration.",
          id: "Sadar, aktif, mata tidak cekung, mukosa basah, air mata ada, cubitan kulit perut kembali sangat cepat (< 1 detik). Tanpa dehidrasi."
        },
        abnormalFindings: {
          en: "**Severe Dehydration**: Lethargic or unconscious, deeply sunken eyes, dry mouth, unable to drink, skin pinch turgor recoils very slowly (> 2 seconds). Requires emergency IV crystalloid bolus resuscitation (Plan C).",
          id: "**Dehidrasi Berat**: Letargis atau tidak sadar, mata sangat cekung, mulut sangat kering, tidak dapat minum, turgor kulit kembali sangat lambat (> 2 detik). Memerlukan resusitasi cairan kristaloid IV darurat (Rencana C)."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Neonatal Primitive Reflexes: Test **Moro reflex** (sudden head drop causes bilateral arm abduction, extension, then adduction); **Palmar grasp** (finger in palm elicits firm flexion); **Sucking and Rooting** (stroking cheek turns head toward stimulus).",
          id: "Refleks Primitif Neonatus: Uji **refleks Moro** (penurunan kepala mendadak memicu abduksi dan ekstensi lengan bilateral diikuti adduksi memeluk); **refleks genggam palmar** (sentuhan di telapak memicu fleksi kuat); **refleks hisap & rooting** (sentuhan di pipi memicu penolehan kepala mencari puting)."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Vigorous, symmetric Moro reflex, strong bilateral palmar grasp, prompt rooting and active sucking reflexes in term newborn.",
          id: "Refleks Moro kuat dan simetris, genggaman palmar bilateral kuat, rooting cepat dan refleks hisap aktif pada bayi cukup bulan."
        },
        abnormalFindings: {
          en: "Asymmetric Moro reflex indicating **clavicle fracture or brachial plexus injury (Erb's palsy)**; absent primitive reflexes indicating severe perinatal asphyxia / hypoxic-ischemic encephalopathy.",
          id: "Refleks Moro asimetris menandakan **fraktur klavikula atau cedera pleksus brakialis (Erb's palsy)**; hilangnya refleks primitif menandakan asfiksia perinatal berat / ensefalopati hipoksik iskemik."
        }
      }
    ]
  }
];
