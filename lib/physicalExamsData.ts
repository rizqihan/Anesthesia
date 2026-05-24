import { PhysicalExamRecord } from './db';

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
          en: "CN VII (Facial): Observe facial symmetry at rest. Ask the patient to raise eyebrows, close eyes tightly against resistance, smile, frown, and puff cheeks.",
          id: "CN VII (Facial): Amati kesimetrisan wajah saat istirahat. Minta pasien mengangkat alis, menutup mata rapat-rapat melawan tahanan, tersenyum, cemberut, dan menggembungkan pipi."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Symmetric facial expressions and muscle strength bilaterally. No drooping of mouth or eye.",
          id: "Ekspresi wajah dan kekuatan otot yang simetris secara bilateral. Tidak ada sudut mulut atau kelopak mata yang turun."
        },
        abnormalFindings: {
          en: "Facial asymmetry, flat nasolabial fold, or weakness (e.g., Bell's Palsy vs central stroke facial weakness).",
          id: "Asimetri wajah, lipatan nasolabial datar, atau kelemahan (misal: Bell's Palsy vs kelemahan wajah stroke sentral)."
        }
      },
      {
        stepNumber: 7,
        instruction: {
          en: "CN VIII (Vestibulocochlear): Assess hearing with the whispered voice test. If abnormal, perform Weber and Rinne tests using a 512 Hz tuning fork.",
          id: "CN VIII (Vestibulocochlear): Nilai pendengaran dengan tes bisik. Jika abnormal, lakukan tes Weber dan Rinne menggunakan garpu tala 512 Hz."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Whisper heard at 2 feet symmetrically. Rinne: Air conduction > Bone conduction (AC > BC). Weber: Midline localization of sound.",
          id: "Bisikan terdengar pada jarak 2 kaki secara simetris. Rinne: Hantaran udara > hantaran tulang (AC > BC). Weber: Suara terdengar di tengah (tidak ada lateralisasi)."
        },
        abnormalFindings: {
          en: "Hearing loss. Conductive: BC > AC in Rinne, lateralizes to affected ear in Weber. Sensorineural: AC > BC but reduced, lateralizes to normal ear in Weber.",
          id: "Gangguan pendengaran. Konduktif: BC > AC pada Rinne, lateralisasi ke telinga yang sakit pada Weber. Sensorineural: AC > BC tetapi berkurang, lateralisasi ke telinga normal pada Weber."
        }
      },
      {
        stepNumber: 8,
        instruction: {
          en: "CN IX & X (Glossopharyngeal & Vagus): Observe palate elevation when patient says 'Ah'. Assess swallow, voice quality, and test the gag reflex if indicated.",
          id: "CN IX & X (Glossopharyngeal & Vagus): Amati elevasi palatum mole saat pasien mengucapkan 'Ah'. Nilai kemampuan menelan, kualitas suara, dan uji refleks muntah jika diindikasikan."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Symmetric elevation of soft palate and uvula stays in the midline. Normal swallowing and hoarseness-free voice.",
          id: "Elevasi simetris dari palatum mole dan uvula tetap berada di garis tengah. Kemampuan menelan normal dan suara tidak serak."
        },
        abnormalFindings: {
          en: "Asymmetric palate elevation, uvula deviating to the unaffected side (CN X lesion), hoarse voice, or dysphagia.",
          id: "Elevasi palatum yang asimetris, uvula berdeviasi ke sisi yang sehat (lesi CN X), suara serak, atau disfagia."
        }
      },
      {
        stepNumber: 9,
        instruction: {
          en: "CN XI (Accessory): Assess motor strength of sternocleidomastoid (patient turns head against resistance) and trapezius muscles (patient shrugs shoulders against resistance).",
          id: "CN XI (Accessory): Nilai kekuatan motorik otot sternokleidomastoideus (pasien memutar kepala melawan tahanan) dan otot trapezius (pasien mengangkat bahu melawan tahanan)."
        },
        bodyPartId: "neck",
        normalFindings: {
          en: "Strong, symmetric head turn and shoulder shrugging bilateral.",
          id: "Gerakan memutar kepala dan angkat bahu yang kuat dan simetris secara bilateral."
        },
        abnormalFindings: {
          en: "Weakness or asymmetry in shoulder shrugging or head turning, muscle atrophy.",
          id: "Kelemahan atau asimetri dalam mengangkat bahu atau memutar kepala, atrofi otot."
        }
      },
      {
        stepNumber: 10,
        instruction: {
          en: "CN XII (Hypoglossal): Inspect tongue at rest inside mouth for fasciculations/atrophy. Ask patient to protrude tongue and move it side to side.",
          id: "CN XII (Hypoglossal): Inspeksi lidah saat istirahat di dalam mulut untuk melihat adanya fasikulasi/atrofi. Minta pasien menjulurkan lidah dan menggerakkannya ke kanan dan kiri."
        },
        bodyPartId: "head",
        normalFindings: {
          en: "Tongue protrudes straight in the midline without fasciculations, deviations, or atrophy. Symmetric lateral movements.",
          id: "Lidah menjulur lurus di garis tengah tanpa fasikulasi, deviasi, atau atrofi. Gerakan lateral yang simetris."
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
          id: "Konjungtiva pucat, sklera ikterik, struma (pembesaran tiroid), limfadenopati, atau JVP meningkat (> 4 cm)."
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Chest & Lungs: Inspect chest wall expansion. Palpate for tactile fremitus. Percuss lung fields. Auscultate anterior and posterior lung fields for breath sounds.",
          id: "Dada & Paru: Inspeksi ekspansi dinding dada. Palpasi untuk taktil fremitus. Perkusi lapang paru. Auskultasi lapang paru anterior dan posterior untuk suara napas."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "Symmetric chest expansion, resonant percussion, vesicular breath sounds without crackles or wheezing.",
          id: "Ekspansi dada simetris, perkusi sonor, suara napas vesikuler tanpa ronkhi atau mengi."
        },
        abnormalFindings: {
          en: "Asymmetric expansion, dullness/hyperresonance, crackles, wheezing, or decreased breath sounds.",
          id: "Ekspansi asimetris, pekak/hiperkesonor, ronkhi, mengi, atau penurunan suara napas."
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Cardiovascular: Inspect and palpate apical impulse (PMI). Auscultate heart sounds (S1, S2) at aortic, pulmonic, tricuspid, and mitral areas.",
          id: "Kardiovaskular: Inspeksi dan palpasi iktus kordis (PMI). Auskultasi suara jantung (S1, S2) pada area aorta, pulmonal, trikuspid, dan mitral."
        },
        bodyPartId: "chest",
        normalFindings: {
          en: "PMI in 5th intercostal space, midclavicular line. Regular S1 and S2 sounds, no murmurs or gallops.",
          id: "Iktus kordis di sela iga ke-5, garis midklavikula. Suara S1 dan S2 reguler, tidak ada bising jantung (murmur) atau gallop."
        },
        abnormalFindings: {
          en: "Displaced PMI, murmurs (systolic/diastolic), S3/S4 gallop, or friction rub.",
          id: "Iktus kordis bergeser, murmur (sistolik/diastolik), gallop S3/S4, atau friction rub."
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Abdomen: Inspect abdominal contour. Auscultate bowel sounds in all 4 quadrants. Percuss for tympany. Palpate lightly and deeply for tenderness, organomegaly (liver, spleen).",
          id: "Abdomen: Inspeksi kontur perut. Auskultasi bising usus di semua 4 kuadran. Perkusi untuk menilai timpani. Palpasi ringan dan dalam untuk mendeteksi nyeri tekan, organomegali (hati, limpa)."
        },
        bodyPartId: "abdomen",
        normalFindings: {
          en: "Flat or rounded, active bowel sounds (5-30/min), tympanic percussion, soft, non-tender, no palpable organomegaly.",
          id: "Datar atau supel, bising usus aktif (5-30 kali/menit), perkusi timpani, lembut, tidak ada nyeri tekan, tidak teraba organomegali."
        },
        abnormalFindings: {
          en: "Distention, absent or hyperactive bowel sounds, dullness (ascites), abdominal tenderness/guarding, hepatomegaly or splenomegaly.",
          id: "Distensi, bising usus tidak ada atau hiperaktif, pekak alih (asites), nyeri tekan/defans muskuler, hepatomegali atau splenomegali."
        }
      },
      {
        stepNumber: 5,
        instruction: {
          en: "Upper Extremities: Assess peripheral pulses (radial, brachial), capillary refill time (CRT), skin turgor, joint range of motion (ROM), motor strength, and deep tendon reflexes (biceps, triceps).",
          id: "Ekstremitas Atas: Nilai denyut nadi perifer (radial, brakial), capillary refill time (CRT), turgor kulit, range of motion (ROM) sendi, kekuatan motorik, dan refleks tendon dalam (biseps, triseps)."
        },
        bodyPartId: "arms",
        normalFindings: {
          en: "Pulses strong and symmetric (2+), CRT < 2 seconds, instant skin snap, full ROM, 5/5 motor strength, normal reflexes (2+).",
          id: "Nadi kuat dan simetris (2+), CRT < 2 detik, turgor kulit elastis kembali instan, ROM penuh, kekuatan motorik 5/5, refleks normal (2+)."
        },
        abnormalFindings: {
          en: "Weak/absent pulses, CRT > 2 seconds, poor turgor, restricted ROM, motor weakness (< 5/5), or hyper/hyporeflexia.",
          id: "Nadi lemah/hilang, CRT > 2 detik, turgor buruk, ROM terbatas, kelemahan motorik (< 5/5), atau hiper/hiporefleksia."
        }
      },
      {
        stepNumber: 6,
        instruction: {
          en: "Lower Extremities: Assess peripheral pulses (dorsalis pedis, posterior tibial), inspect for varicose veins, assess for pitting edema, joint range of motion (ROM), and deep tendon reflexes (patellar, Achilles).",
          id: "Ekstremitas Bawah: Nilai denyut nadi perifer (dorsalis pedis, tibialis posterior), inspeksi varises, nilai edema pitting, range of motion (ROM) sendi, dan refleks tendon dalam (patela, Achilles)."
        },
        bodyPartId: "legs",
        normalFindings: {
          en: "Pulses 2+ symmetric, no edema, no visible varicose veins, full ROM, normal reflexes (2+).",
          id: "Nadi 2+ simetris, tidak ada edema, tidak ada varises, ROM penuh, refleks normal (2+)."
        },
        abnormalFindings: {
          en: "Diminished dorsalis pedis pulse, unilateral/bilateral pitting edema, painful varicosities, or abnormal reflexes.",
          id: "Nadi dorsalis pedis berkurang, edema pitting unilateral/bilateral, varises yang nyeri, atau refleks abnormal."
        }
      }
    ]
  }
];
