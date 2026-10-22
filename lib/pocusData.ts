export type POCUSProtocolId = 'efast' | 'blue' | 'focus' | 'vascular';

export type ProbeType = 'Curvilinear' | 'Phased Array' | 'Linear';

export type Echogenicity = 'anechoic' | 'hypoechoic' | 'isoechoic' | 'hyperechoic';

export interface AcousticLandmark {
  id: string;
  name: string;
  x: number; // 0-100% position on simulated ultrasound screen
  y: number; // 0-100% position on simulated ultrasound screen
  description: string;
  echogenicity: Echogenicity;
}

export interface MannequinTarget {
  x: number; // 0-100% on body mannequin
  y: number; // 0-100% on body mannequin
  view: 'anterior' | 'posterior';
  angleDeg: number; // probe indicator rotation angle (0 = cephalad/up, 90 = patient right)
  lockRadiusPx?: number; // default 18px
}

export interface POCUSCase {
  id: string;
  protocol: POCUSProtocolId;
  windowId: string;
  title: string;
  subtitle: string;
  probeType: ProbeType;
  frequencyRange: string;
  probeOrientation: string;
  mannequinPosition: MannequinTarget;
  acousticLandmarks: AcousticLandmark[];
  normalDescription: string;
  normalFindings: string[];
  pathologyTitle: string;
  pathologyDescription: string;
  pathologySignName: string;
  pathologyFindings: string[];
  clinicalPearls: string[];
  pitfalls: string[];
  proceduralSteps: string[];
  decisionTree: {
    question: string;
    positiveFinding: string;
    positiveAction: string;
    negativeFinding: string;
    negativeAction: string;
  };
}

export interface POCUSProtocolMeta {
  id: POCUSProtocolId;
  title: string;
  shortDesc: string;
  defaultProbe: ProbeType;
  caseIds: string[];
  clinicalObjective: string;
}

export const POCUS_PROTOCOLS: POCUSProtocolMeta[] = [
  {
    id: 'efast',
    title: 'eFAST (Extended FAST)',
    shortDesc: 'Rapid detection of hemoperitoneum, hemopericardium & pneumothorax in trauma',
    defaultProbe: 'Curvilinear',
    caseIds: ['efast-ruq', 'efast-luq', 'efast-pelvis', 'efast-subxiphoid', 'efast-lung-ant'],
    clinicalObjective: 'Rule out occult hemorrhage and tension pneumothorax within 60 seconds during initial trauma survey (ATLS/PHTLS).'
  },
  {
    id: 'blue',
    title: 'BLUE Protocol',
    shortDesc: 'Bedside Lung Ultrasound in Emergency for acute respiratory failure differentiation',
    defaultProbe: 'Linear',
    caseIds: ['blue-a-lines', 'blue-b-lines', 'blue-sliding', 'blue-lung-point', 'blue-effusion', 'blue-consolidation'],
    clinicalObjective: 'Rapidly categorize dyspneic patients into pulmonary edema, pneumothorax, pneumonia, asthma/COPD, or pulmonary embolism within 3 minutes.'
  },
  {
    id: 'focus',
    title: 'FOCUS (Cardiac & Hemodynamics)',
    shortDesc: 'Point-of-care cardiac assessment, contractility & volume responsiveness',
    defaultProbe: 'Phased Array',
    caseIds: ['focus-plax', 'focus-psax', 'focus-a4c', 'focus-subcostal', 'focus-ivc'],
    clinicalObjective: 'Differentiate shock states (cardiogenic, hypovolemic, distributive, obstructive), assess biventricular function and volume status.'
  },
  {
    id: 'vascular',
    title: 'Vascular Access & DVT Compression',
    shortDesc: 'Real-time central line guidance and lower extremity deep vein thrombosis screening',
    defaultProbe: 'Linear',
    caseIds: ['vasc-ijv', 'vasc-femoral', 'vasc-dvt'],
    clinicalObjective: 'Zero-failure cannulation under real-time dynamic needle guidance and bedside rule-out of proximal deep vein thrombosis.'
  }
];

export const POCUS_CASES: Record<string, POCUSCase> = {
  // ─────────────────────────────────────────────────────────────
  // 1. eFAST PROTOCOL
  // ─────────────────────────────────────────────────────────────
  'efast-ruq': {
    id: 'efast-ruq',
    protocol: 'efast',
    windowId: 'ruq',
    title: 'RUQ - Morison\'s Pouch & Hepatorenal Recess',
    subtitle: 'Most sensitive dependent space in supine patient for hemoperitoneum',
    probeType: 'Curvilinear',
    frequencyRange: '2.5 - 5.0 MHz',
    probeOrientation: 'Marker cephalad (towards patient head) along mid-axillary line at 8th to 11th intercostal space. Rotate slightly oblique to align with intercostal rib spaces.',
    mannequinPosition: {
      x: 65,
      y: 44,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'liver', name: 'Liver Parenchyma', x: 42, y: 35, description: 'Homogeneous medium-level echogenicity', echogenicity: 'isoechoic' },
      { id: 'kidney', name: 'Right Kidney Cortex & Medulla', x: 62, y: 65, description: 'Echogenic capsule with darker cortex and bright central sinus', echogenicity: 'hypoechoic' },
      { id: 'morison', name: 'Morison\'s Pouch (Hepatorenal Interface)', x: 50, y: 52, description: 'Potential space between liver and right kidney', echogenicity: 'hyperechoic' },
      { id: 'diaphragm', name: 'Right Diaphragm', x: 28, y: 22, description: 'Bright curved hyperechoic specular reflector', echogenicity: 'hyperechoic' },
      { id: 'subdiaph', name: 'Subdiaphragmatic / Pleural Space', x: 20, y: 15, description: 'Normal mirror image artifact; fluid appears anechoic superior to diaphragm', echogenicity: 'hypoechoic' }
    ],
    normalDescription: 'Smooth, direct apposition between liver and kidney parenchyma without intervening black space. Diaphragmatic mirror image artifact visible superiorly.',
    normalFindings: [
      'Crisp hyperechoic line separating liver capsule from renal capsule',
      'No anechoic stripe in hepatorenal recess',
      'Normal mirror image artifact of liver tissue visible above the diaphragmatic dome',
      'Absence of spine sign (vertebral bodies cease abruptly above the diaphragm due to lung air)'
    ],
    pathologyTitle: 'Positive Free Fluid (Hemoperitoneum)',
    pathologyDescription: 'Anechoic (jet black) stripe or triangular collection separating the liver and right kidney. Most commonly collects at the inferior tip of the liver or the inferior renal pole.',
    pathologySignName: 'Anechoic Stripe in Morison\'s Pouch',
    pathologyFindings: [
      'Anechoic fluid layer separating visceral peritoneum of liver and kidney',
      'Fluid accumulation tracking down to the inferior renal pole',
      'Blunting of the hepatorenal angle',
      'Hemothorax if anechoic fluid is noted superior to the diaphragm (accompanied by positive Spine Sign)'
    ],
    clinicalPearls: [
      'Morison\'s pouch can detect as little as 150-250 mL of free intraperitoneal fluid in a supine patient.',
      'Always sweep through the entire kidney from superior pole to inferior pole; free fluid often gathers first at the inferior liver tip.',
      'Trendelenburg position increases the sensitivity of RUQ detection by encouraging dependent pooling from the pelvis.'
    ],
    pitfalls: [
      'Do not confuse perinephric retroperitoneal fat with free fluid; fat is hyperechoic/heterogeneous, not completely anechoic.',
      'Gallbladder duplication artifact or duodenal fluid can mimic a localized fluid pocket; confirm boundaries.',
      'Mirror image artifact of the liver above the diaphragm is NORMAL; do not misinterpret as consolidation or mass.'
    ],
    proceduralSteps: [
      'Place curvilinear probe in mid-axillary line at 8th-11th intercostal space, marker cephalad.',
      'Identify liver and right kidney interface simultaneously.',
      'Fan probe anterior-to-posterior to scan the entire 3D volume of Morison\'s pouch.',
      'Slide cephalad to inspect the diaphragm and costophrenic angle for hemothorax.',
      'Slide caudad to inspect the inferior pole of the right kidney.'
    ],
    decisionTree: {
      question: 'Is there an anechoic fluid stripe in the hepatorenal recess or subdiaphragmatic space?',
      positiveFinding: 'Anechoic fluid present',
      positiveAction: 'Hemoperitoneum confirmed. In hemodynamically unstable trauma, immediate surgical or interventional laparotomy activation.',
      negativeFinding: 'No fluid detected',
      negativeAction: 'Proceed immediately to LUQ and Pelvic windows. Repeat eFAST in 15-30 minutes if clinical suspicion persists.'
    }
  },

  'efast-luq': {
    id: 'efast-luq',
    protocol: 'efast',
    windowId: 'luq',
    title: 'LUQ - Splenorenal & Subdiaphragmatic Window',
    subtitle: 'Evaluation of spleen, left kidney, subphrenic space, and left hemothorax',
    probeType: 'Curvilinear',
    frequencyRange: '2.5 - 5.0 MHz',
    probeOrientation: 'Marker cephalad along posterior axillary line at 6th to 9th intercostal space (knuckles often touching the bed).',
    mannequinPosition: {
      x: 35,
      y: 45,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'spleen', name: 'Spleen Parenchyma', x: 40, y: 36, description: 'Homogeneous crescent-shaped organ', echogenicity: 'isoechoic' },
      { id: 'left_kidney', name: 'Left Kidney', x: 60, y: 65, description: 'Renal cortex and central sinus', echogenicity: 'hypoechoic' },
      { id: 'splenorenal', name: 'Splenorenal Interface', x: 48, y: 50, description: 'Potential space between spleen and left kidney', echogenicity: 'hyperechoic' },
      { id: 'subphrenic', name: 'Subphrenic Space (Between Spleen & Diaphragm)', x: 30, y: 22, description: 'Most frequent site of left-sided free fluid collection', echogenicity: 'hypoechoic' }
    ],
    normalDescription: 'Spleen and left kidney closely apposed. No fluid between diaphragm and superior spleen contour. Normal lung curtain sliding above diaphragm.',
    normalFindings: [
      'Intact splenorenal interface with no fluid gap',
      'Clean hyperechoic diaphragm superior to spleen',
      'No fluid collection in the subphrenic space'
    ],
    pathologyTitle: 'Positive LUQ Free Fluid / Splenic Laceration',
    pathologyDescription: 'Anechoic fluid collection found primarily in the subdiaphragmatic space above the spleen, or between spleen and left kidney.',
    pathologySignName: 'Subphrenic / Splenorenal Free Fluid',
    pathologyFindings: [
      'Anechoic fluid layer between spleen and left hemidiaphragm',
      'Free fluid pooling around inferior splenic tip',
      'Possible heterogeneous hematoma in splenic parenchyma if fractured'
    ],
    clinicalPearls: [
      'Unlike the RUQ where fluid pools between liver and kidney, in the LUQ fluid pools FIRST between the spleen and the diaphragm!',
      'The left kidney is positioned more posterior and superior than the right; place your knuckles directly on the stretcher mattress to obtain the view.',
      'Gastric air and rib shadowing frequently obstruct this window; have patient take a deep breath or slide one intercostal space higher.'
    ],
    pitfalls: [
      'Stomach fundus filled with fluid or food can resemble a cystic mass or fluid collection; look for peristalsis and rugal folds.',
      'Tail of pancreas can mimic a subcapsular hematoma if unfamiliar with anatomy.'
    ],
    proceduralSteps: [
      'Place probe at posterior axillary line, 6th-9th intercostal space, marker pointing toward head.',
      'Identify diaphragm, spleen, and left kidney.',
      'Inspect the subdiaphragmatic space superior to the spleen carefully.',
      'Fan through the splenorenal space and inferior splenic pole.',
      'Tilt beam cephalad to evaluate the left costophrenic pleural space for hemothorax.'
    ],
    decisionTree: {
      question: 'Is free fluid present superior to the spleen or in the splenorenal recess?',
      positiveFinding: 'Subphrenic or splenorenal fluid identified',
      positiveAction: 'High likelihood of splenic trauma / hemoperitoneum. Correlate with hemodynamics; prepare for surgical exploration.',
      negativeFinding: 'Clear interfaces without anechoic space',
      negativeAction: 'Proceed to Pelvic (suprapubic) window.'
    }
  },

  'efast-pelvis': {
    id: 'efast-pelvis',
    protocol: 'efast',
    windowId: 'pelvis',
    title: 'Pelvic - Suprapubic (Rectovesical / Douglas)',
    subtitle: 'Deepest dependent anatomical space of the peritoneal cavity',
    probeType: 'Curvilinear',
    frequencyRange: '2.5 - 5.0 MHz',
    probeOrientation: 'Place 1-2 cm superior to pubic symphysis. Transverse view: marker to patient right. Sagittal view: marker cephalad.',
    mannequinPosition: {
      x: 50,
      y: 60,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'bladder', name: 'Urinary Bladder Lumen', x: 50, y: 45, description: 'Smooth, thin-walled anechoic acoustic window', echogenicity: 'anechoic' },
      { id: 'rectovesical', name: 'Rectovesical Pouch (Male) / Pouch of Douglas (Female)', x: 50, y: 72, description: 'Dependent peritoneal space posterior to bladder / uterus', echogenicity: 'isoechoic' },
      { id: 'prostate_uterus', name: 'Prostate / Uterus', x: 50, y: 62, description: 'Midline reproductive pelvic structures', echogenicity: 'isoechoic' }
    ],
    normalDescription: 'Distended anechoic bladder with smooth thin walls and posterior acoustic enhancement. No fluid posterior or lateral to the bladder.',
    normalFindings: [
      'Anechoic urine-filled bladder serving as acoustic window',
      'No secondary anechoic fluid pockets outside the bladder wall',
      'Intact pelvic fascial planes'
    ],
    pathologyTitle: 'Pelvic Hemoperitoneum',
    pathologyDescription: 'Free fluid pooling in the rectovesical pouch (males) or rectouterine pouch of Douglas (females), or lateral to the bladder wings.',
    pathologySignName: 'Free Fluid Posterior to Bladder',
    pathologyFindings: [
      'Anechoic or particulate fluid collection posterior to bladder wall',
      'Free fluid capping the fundus of the uterus',
      'Fluid tracking into bilateral paravesical gutters'
    ],
    clinicalPearls: [
      'Perform pelvic ultrasound BEFORE placing a Foley catheter; an empty bladder collapses the acoustic window completely.',
      'Scan in BOTH transverse and sagittal planes to verify whether fluid is truly intraperitoneal versus an intraluminal Foley balloon.',
      'Internal echoes within pelvic fluid suggest clotted blood or ruptured viscous contents.'
    ],
    pitfalls: [
      'Foley catheter balloon can be mistaken for the bladder lumen if the bladder is completely empty.',
      'Ovarian cysts or physiological free fluid in ovulating females can create false positives in trauma.'
    ],
    proceduralSteps: [
      'Place probe 2 cm above pubic symphysis in midline with marker to patient right (transverse).',
      'Angle probe steeply caudad into the pelvic brim.',
      'Sweep through the full craniocaudal extent of the bladder.',
      'Rotate probe 90 degrees with marker cephalad (sagittal plane).',
      'Inspect the retrovesical pouch or pouch of Douglas behind the uterus/prostate.'
    ],
    decisionTree: {
      question: 'Is there extraluminal anechoic fluid posterior or lateral to the urinary bladder?',
      positiveFinding: 'Pelvic free fluid present',
      positiveAction: 'Trauma hemoperitoneum identified. Assess abdominal exam and hemodynamic stability.',
      negativeFinding: 'No extraluminal fluid',
      negativeAction: 'Proceed to Subxiphoid pericardial window.'
    }
  },

  'efast-subxiphoid': {
    id: 'efast-subxiphoid',
    protocol: 'efast',
    windowId: 'subxiphoid',
    title: 'Subxiphoid - Pericardial & Cardiac Tamponade',
    subtitle: 'Identification of hemopericardium, pericardial effusion, and RV collapse',
    probeType: 'Phased Array',
    frequencyRange: '1.5 - 4.0 MHz',
    probeOrientation: 'Flat against epigastrium just inferior to xiphoid process, marker to patient right, beam aimed towards left shoulder.',
    mannequinPosition: {
      x: 50,
      y: 38,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'left_liver', name: 'Left Hepatic Lobe', x: 50, y: 22, description: 'Acoustic window through which cardiac structures are visualized', echogenicity: 'isoechoic' },
      { id: 'pericardium', name: 'Pericardial Sac', x: 50, y: 35, description: 'Bright hyperechoic fibrous membrane surrounding myocardium', echogenicity: 'hyperechoic' },
      { id: 'rv', name: 'Right Ventricle (Anterior)', x: 45, y: 45, description: 'Chamber immediately adjacent to left liver lobe', echogenicity: 'anechoic' },
      { id: 'lv', name: 'Left Ventricle', x: 62, y: 60, description: 'Thick muscular chamber on lateral aspect', echogenicity: 'anechoic' }
    ],
    normalDescription: 'Smooth contact between pericardium and epicardium without separating fluid layer. Liver left lobe acts as acoustic window.',
    normalFindings: [
      'Parietal and visceral pericardium appear as single echogenic line in systole and diastole',
      'Vigorous biventricular contraction without chamber collapse',
      'No anechoic space anterior to RV or posterior to LV'
    ],
    pathologyTitle: 'Hemopericardium / Cardiac Tamponade',
    pathologyDescription: 'Anechoic fluid band separating the pericardial layers. Diastolic right ventricular anterior wall collapse indicates tamponade physiology.',
    pathologySignName: 'Pericardial Effusion & RV Diastolic Inversion',
    pathologyFindings: [
      'Anechoic fluid layer encircling the right and left ventricles',
      'Right ventricular free wall indentation/collapse during ventricular diastole',
      'Right atrial inversion during ventricular systole (>33% of cardiac cycle)',
      'Plethoric IVC with 0% respiratory collapse'
    ],
    clinicalPearls: [
      'Lay the probe almost parallel with the patient\'s abdominal wall to direct the beam under the ribs.',
      'In cardiac tamponade, hemodynamic collapse occurs due to intrapericardial pressure exceeding RV diastolic filling pressure.',
      'Emergency pericardiocentesis under direct ultrasound visualization can be lifesaving in pulseless electrical activity (PEA).'
    ],
    pitfalls: [
      'Epicardial fat pad can be mistaken for pericardial effusion; fat pad is anterior only, gelatinous, and moves synchronously with the heart.',
      'Pleural effusion tracks posterior to the descending aorta, whereas pericardial effusion tracks anterior to descending aorta.'
    ],
    proceduralSteps: [
      'Apply generous gel to subxiphoid region.',
      'Place phased array probe flat against abdomen with indicator notch to patient right.',
      'Press firmly into epigastrium while angling beam toward left shoulder.',
      'Use liver as acoustic window to bring all 4 cardiac chambers into view.',
      'Inspect anterior RV wall and posterior LV wall for fluid collection.'
    ],
    decisionTree: {
      question: 'Is there a pericardial fluid collection with diastolic RV collapse?',
      positiveFinding: 'Pericardial effusion with tamponade signs',
      positiveAction: 'Immediate cardiac tamponade protocol: volume resuscitate, prepare for urgent pericardiocentesis or emergent sternotomy.',
      negativeFinding: 'No pericardial effusion',
      negativeAction: 'Rule out hemopericardium; proceed to thoracic pleural windows.'
    }
  },

  'efast-lung-ant': {
    id: 'efast-lung-ant',
    protocol: 'efast',
    windowId: 'lung-ant',
    title: 'Anterior Lung - Thoracic Pneumothorax Window',
    subtitle: 'Identification of normal lung sliding vs absent sliding and lung point',
    probeType: 'Linear',
    frequencyRange: '6.0 - 12.0 MHz',
    probeOrientation: 'Longitudinal across 2nd to 4th intercostal spaces in mid-clavicular line, marker cephalad.',
    mannequinPosition: {
      x: 38,
      y: 28,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'rib1', name: 'Superior Rib & Acoustic Shadow', x: 25, y: 32, description: 'Rounded hyperechoic cortex with dark posterior shadow', echogenicity: 'hyperechoic' },
      { id: 'rib2', name: 'Inferior Rib & Acoustic Shadow', x: 75, y: 32, description: 'Rounded hyperechoic cortex with dark posterior shadow', echogenicity: 'hyperechoic' },
      { id: 'pleura', name: 'Pleural Line', x: 50, y: 38, description: 'Bright horizontal hyperechoic line ~0.5 cm below ribs ("Bat sign")', echogenicity: 'hyperechoic' },
      { id: 'a_line', name: 'A-Line (Reverberation)', x: 50, y: 72, description: 'Repetitive horizontal artifact equidistant from skin to pleura', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Visible shimmering "ants marching" lung sliding at pleural line with respiratory movement. In M-mode: Seashore Sign.',
    normalFindings: [
      'Normal visceral and parietal pleura dynamic translation (sliding)',
      'Presence of horizontal reverberation A-lines',
      'M-mode shows classic Seashore Sign (waves on beach)',
      'Pneumothorax 100% ruled out at this specific intercostal space'
    ],
    pathologyTitle: 'Pneumothorax (Absent Lung Sliding)',
    pathologyDescription: 'Complete absence of pleural sliding due to air separating the visceral and parietal pleura. In M-mode: Barcode Sign (Stratosphere Sign).',
    pathologySignName: 'Barcode Sign & Lung Point',
    pathologyFindings: [
      'Static, motionless pleural line without shimmering',
      'M-mode displays horizontal parallel lines throughout entire depth (Barcode Sign)',
      'Absent B-lines and absent lung pulse',
      'Pathognomonic Lung Point at transition boundary where sliding intermittently appears'
    ],
    clinicalPearls: [
      'Lung ultrasound is significantly more sensitive (90-95%) than supine anterior chest radiograph (50%) for traumatic pneumothorax.',
      'The presence of lung sliding rules out pneumothorax at that probe location with 100% negative predictive value.',
      'The Lung Point is 100% specific for pneumothorax and marks its physical anatomical boundary.'
    ],
    pitfalls: [
      'Mainstem intubation causes absent lung sliding in the contralateral unventilated lung; check ETT depth first.',
      'Severe bullous emphysema or pleurodesis can cause absent lung sliding without pneumothorax; search for Lung Point.'
    ],
    proceduralSteps: [
      'Place linear high-frequency probe vertically in 2nd-3rd intercostal space midclavicular line.',
      'Identify two adjacent rib shadows and the pleural line between them ("Bat Sign").',
      'Observe pleural line for shimmering lung sliding.',
      'Switch to M-mode with cursor placed over pleural line.',
      'Confirm Seashore sign (normal) or Barcode sign (pneumothorax).'
    ],
    decisionTree: {
      question: 'Is lung sliding absent with a barcode sign on M-mode?',
      positiveFinding: 'Absent sliding + Barcode sign',
      positiveAction: 'Pneumothorax confirmed. In tension pneumothorax with shock, perform immediate needle decompression / finger thoracostomy.',
      negativeFinding: 'Normal lung sliding present (Seashore sign)',
      negativeAction: 'Pneumothorax ruled out at this site. Scan contralateral hemithorax.'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 2. BLUE PROTOCOL (LUNG ULTRASOUND)
  // ─────────────────────────────────────────────────────────────
  'blue-a-lines': {
    id: 'blue-a-lines',
    protocol: 'blue',
    windowId: 'blue-a',
    title: 'Normal Aeration - A-Line Profile',
    subtitle: 'Physiological horizontal reverberation artifacts indicative of dry ventilated lung',
    probeType: 'Linear',
    frequencyRange: '6.0 - 12.0 MHz',
    probeOrientation: 'Longitudinal perpendicular to ribs, marker cephalad, anterior BLUE points.',
    mannequinPosition: {
      x: 35,
      y: 32,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'pleural_line', name: 'Pleural Line', x: 50, y: 35, description: 'Smooth hyperechoic horizontal reflector', echogenicity: 'hyperechoic' },
      { id: 'a1', name: 'A1 Reverberation Line', x: 50, y: 60, description: 'First exact harmonic copy of pleural line', echogenicity: 'hyperechoic' },
      { id: 'a2', name: 'A2 Reverberation Line', x: 50, y: 85, description: 'Second equidistant reverberation copy', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Crisp pleural sliding accompanied by equidistant horizontal hyperechoic A-lines. M-mode shows classic Seashore Sign.',
    normalFindings: [
      'Normal lung sliding at pleural line',
      'Horizontal A-lines repeating at intervals equal to skin-to-pleura distance',
      '< 3 B-lines per rib space'
    ],
    pathologyTitle: 'A-Profile in Respiratory Distress',
    pathologyDescription: 'When accompanied by normal sliding: COPD or asthma exacerbation. When accompanied by DVT: Pulmonary Embolism (A-profile with DVT).',
    pathologySignName: 'A-Profile (COPD/Asthma vs PE)',
    pathologyFindings: [
      'A-profile (predominant A-lines with preserved lung sliding)',
      'No interstitial fluid or consolidation in anterior fields',
      'Indication to screen lower extremity veins for DVT in suspected pulmonary embolism'
    ],
    clinicalPearls: [
      'In the BLUE protocol, an A-profile with normal sliding warrants immediate venous compression screening; positive DVT confirms PE with 99% specificity.',
      'If venous compression is negative in A-profile, consider acute bronchospasm (Asthma/COPD).'
    ],
    pitfalls: [
      'Do not assume normal lungs based on anterior fields alone; posterior-lateral scanning (PLAPS) is essential.'
    ],
    proceduralSteps: [
      'Examine upper and lower BLUE points bilaterally.',
      'Identify rib heads and pleural line.',
      'Assess for horizontal A-lines and synchronous sliding.'
    ],
    decisionTree: {
      question: 'Is A-profile present with preserved lung sliding?',
      positiveFinding: 'A-profile with sliding',
      positiveAction: 'Check venous compression for DVT. If negative, treat for COPD/Asthma exacerbation.',
      negativeFinding: 'B-lines or absent sliding noted',
      negativeAction: 'Switch to B-profile or Pneumothorax assessment algorithm.'
    }
  },

  'blue-b-lines': {
    id: 'blue-b-lines',
    protocol: 'blue',
    windowId: 'blue-b',
    title: 'Interstitial Syndrome - B-Lines (Lung Rockets)',
    subtitle: 'Vertical laser-like artifacts indicating pulmonary edema / interstitial fluid',
    probeType: 'Linear',
    frequencyRange: '6.0 - 10.0 MHz',
    probeOrientation: 'Longitudinal, anterior and lateral intercostal spaces, marker cephalad.',
    mannequinPosition: {
      x: 62,
      y: 32,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'pleural_line', name: 'Pleural Line', x: 50, y: 30, description: 'Origin of vertical comet-tail artifacts', echogenicity: 'hyperechoic' },
      { id: 'b_line_1', name: 'Vertical B-Line 1', x: 38, y: 65, description: 'Hyperechoic laser-like ray erasing A-lines down to bottom of screen', echogenicity: 'hyperechoic' },
      { id: 'b_line_2', name: 'Vertical B-Line 2', x: 52, y: 65, description: 'Synchronous moving laser artifact', echogenicity: 'hyperechoic' },
      { id: 'b_line_3', name: 'Vertical B-Line 3', x: 68, y: 65, description: 'Third B-line fulfilling interstitial criteria (>= 3/space)', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Aerated lung shows 0 to 2 B-lines per space without erasing A-lines.',
    normalFindings: [
      'Normal aeration with <= 2 isolated B-lines per acoustic window',
      'Preserved horizontal A-lines'
    ],
    pathologyTitle: 'Alveolar-Interstitial Syndrome (B-Profile)',
    pathologyDescription: '3 or more B-lines per intercostal space, arising from the pleural line, extending to the bottom of the screen without fading, moving synchronously with lung sliding, and erasing A-lines.',
    pathologySignName: 'B-Profile (Pulmonary Edema / ARDS)',
    pathologyFindings: [
      '>= 3 B-lines per intercostal space ("lung rockets")',
      'Bilateral diffuse B-lines indicative of cardiogenic pulmonary edema or ARDS',
      'Confluent B-lines ("white lung") in severe alveolar flooding',
      'Irregular thickened pleural line with subpleural consolidations suggests ARDS/pneumonitis'
    ],
    clinicalPearls: [
      'Bilateral anterior B-profile has 97% sensitivity and 95% specificity for cardiogenic pulmonary edema in acute dyspnea.',
      'B-lines clear rapidly (within hours) following successful diuresis or dialysis, making them an excellent dynamic titration tool.',
      'Cardiogenic edema displays smooth pleura and diffuse symmetrical B-lines; ARDS shows spared areas and irregular pleura.'
    ],
    pitfalls: [
      'Do not confuse short Z-lines with true B-lines. Z-lines are poorly defined, do not erase A-lines, and fade after 2-4 cm.',
      'Focal unilateral B-lines indicate localized pneumonia, atelectasis, or pulmonary contusion, NOT systemic pulmonary edema.'
    ],
    proceduralSteps: [
      'Scan anterior and lateral chest in all 4 BLUE quadrants bilaterally.',
      'Count number of B-lines visible in each intercostal space between ribs.',
      'Check whether B-lines are diffuse and bilateral or focal.',
      'Correlate with cardiac contractility and IVC collapsibility.'
    ],
    decisionTree: {
      question: 'Are >= 3 B-lines per intercostal space present bilaterally in anterior fields?',
      positiveFinding: 'Bilateral B-profile',
      positiveAction: 'Diagnose pulmonary edema / alveolar-interstitial syndrome. Initiate CPAP/PEEP, nitrates, loop diuretics; assess cardiac function.',
      negativeFinding: 'Focal or absent B-lines',
      negativeAction: 'Consider focal pneumonia, pulmonary contusion, or non-interstitial dyspnea causes.'
    }
  },

  'blue-sliding': {
    id: 'blue-sliding',
    protocol: 'blue',
    windowId: 'blue-slide',
    title: 'Pleural Dynamics - Lung Sliding & M-Mode Analysis',
    subtitle: 'Direct differentiation of normal seashore sign from barcode/stratosphere sign',
    probeType: 'Linear',
    frequencyRange: '6.0 - 13.0 MHz',
    probeOrientation: 'Longitudinal, 2nd intercostal space midclavicular line.',
    mannequinPosition: {
      x: 38,
      y: 22,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'chest_wall', name: 'Parietal Soft Tissues', x: 50, y: 20, description: 'Static horizontal parallel muscular strata', echogenicity: 'isoechoic' },
      { id: 'pleural_line', name: 'Pleural Interface', x: 50, y: 40, description: 'Visceral-parietal translation line', echogenicity: 'hyperechoic' },
      { id: 'lung_parenchyma', name: 'Subpleural Aeration', x: 50, y: 70, description: 'Dynamic speckled granular texture (Seashore) vs linear pattern (Barcode)', echogenicity: 'isoechoic' }
    ],
    normalDescription: 'In 2D: Glistering, shimmering movement at the pleural line. In M-Mode: Seashore Sign (linear horizontal lines in chest wall + granular speckling below pleura).',
    normalFindings: [
      'Continuous dynamic sliding with each tidal ventilation',
      'Normal Seashore Sign on M-Mode strip',
      'Normal lung pulse (cardiac transmission to pleura)'
    ],
    pathologyTitle: 'Abolished Lung Sliding (Barcode / Stratosphere Sign)',
    pathologyDescription: 'No movement at pleural line. M-mode reveals rigid horizontal parallel lines extending throughout all depths of the image.',
    pathologySignName: 'Barcode / Stratosphere Sign',
    pathologyFindings: [
      'Complete cessation of visceral pleura motion',
      'Uniform horizontal lines across whole M-mode depth',
      'Absent lung pulse in pneumothorax'
    ],
    clinicalPearls: [
      'Normal lung sliding has 100% negative predictive value for pneumothorax at that exact intercostal location.',
      'In cardiac arrest, absent lung sliding + absent lung pulse helps confirm tension pneumothorax or bilateral mainstem intubation.',
      'Double-buffered scrolling M-mode provides instant bedside documentation for electronic medical records.'
    ],
    pitfalls: [
      'High respiratory rates or patient shivering can create false motion artifacts; look closely at the pleural line specifically.'
    ],
    proceduralSteps: [
      'Position linear probe over anterior apex.',
      'Ensure depth is adjusted so pleural line sits in upper half of screen.',
      'Activate M-mode and place cursor over the pleural line.',
      'Acquire a 5-second respiratory sweep.'
    ],
    decisionTree: {
      question: 'Does M-mode show Seashore sign (granular) or Barcode sign (horizontal lines)?',
      positiveFinding: 'Barcode / Stratosphere sign',
      positiveAction: 'Pneumothorax likely. Search for Lung Point to confirm 100% specificity.',
      negativeFinding: 'Seashore sign',
      negativeAction: 'Pneumothorax excluded at this intercostal window.'
    }
  },

  'blue-lung-point': {
    id: 'blue-lung-point',
    protocol: 'blue',
    windowId: 'blue-point',
    title: 'Pathognomonic Lung Point',
    subtitle: 'The exact physical boundary of a partial pneumothorax',
    probeType: 'Linear',
    frequencyRange: '6.0 - 12.0 MHz',
    probeOrientation: 'Longitudinal, walk probe laterally and posteriorly from anterior chest along intercostal spaces.',
    mannequinPosition: {
      x: 32,
      y: 35,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'sliding_zone', name: 'Aerated Sliding Zone', x: 30, y: 40, description: 'Normal pleura with seashore pattern during inspiration', echogenicity: 'hyperechoic' },
      { id: 'transition_pt', name: 'Lung Point Transition', x: 50, y: 40, description: 'Exact focal boundary alternating sliding and barcode', echogenicity: 'hyperechoic' },
      { id: 'pneumo_zone', name: 'Pneumothorax Zone', x: 70, y: 40, description: 'Absent sliding with continuous barcode pattern', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'No transition zone exists in healthy lungs; sliding is present throughout all lung fields.',
    normalFindings: [
      'Uniform sliding across all contiguous intercostal spaces',
      'No alternating or intermittent patterns on M-mode'
    ],
    pathologyTitle: 'Pathognomonic Lung Point Confirmed',
    pathologyDescription: 'On 2D ultrasound, sudden periodic replacement of absent sliding by normal lung sliding with respiration. On M-mode, alternating Seashore and Barcode signs in the same sweep.',
    pathologySignName: 'Lung Point (100% Pneumothorax Specificity)',
    pathologyFindings: [
      'Cyclic transition between sliding (inflating lung contacting wall) and no sliding (pneumothorax air separating pleura)',
      '100% specificity for confirming pneumothorax',
      'Location of lung point correlates directly with size of pneumothorax (anterior = small, midaxillary = moderate, posterior = large)'
    ],
    clinicalPearls: [
      'The lung point is absent in complete total lung collapse (as no lung contacts the chest wall); look for absent sliding everywhere.',
      'Quantify pneumothorax size by charting the anatomic position of the lung point: anterior to midaxillary line is typically manageable conservatively if patient is asymptomatic.'
    ],
    pitfalls: [
      'Do not confuse cardiac pulsation (lung pulse) with a lung point; lung point alternates strictly with respiration, not heart beats.'
    ],
    proceduralSteps: [
      'Identify absent lung sliding anteriorly.',
      'Slide the probe laterally rib-by-rib toward the posterior axillary line.',
      'Watch for the exact point where sliding intermittently returns on inspiration.',
      'Engage M-mode to capture both seashore and barcode patterns on the same strip.'
    ],
    decisionTree: {
      question: 'Is a cyclic respiratory Lung Point identified?',
      positiveFinding: 'Lung Point confirmed',
      positiveAction: 'Pneumothorax definitively diagnosed (100% specific). Assess clinical stability and depth of lung point for drainage decision.',
      negativeFinding: 'No lung point seen',
      negativeAction: 'If sliding is absent everywhere, suspect total lung collapse or severe bullous disease.'
    }
  },

  'blue-effusion': {
    id: 'blue-effusion',
    protocol: 'blue',
    windowId: 'blue-eff',
    title: 'Pleural Effusion - Quad & Sinusoid Signs',
    subtitle: 'Postero-lateral alveolar and/or pleural syndrome (PLAPS)',
    probeType: 'Curvilinear',
    frequencyRange: '2.5 - 5.0 MHz',
    probeOrientation: 'Posterolateral chest (PLAPS point), marker cephalad, aligned with intercostal space.',
    mannequinPosition: {
      x: 72,
      y: 48,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'rib_sup', name: 'Superior Rib Shadow', x: 25, y: 25, description: 'Upper boundary of acoustic frame', echogenicity: 'hyperechoic' },
      { id: 'rib_inf', name: 'Inferior Rib Shadow', x: 75, y: 25, description: 'Lower boundary of acoustic frame', echogenicity: 'hyperechoic' },
      { id: 'pleural_line', name: 'Parietal Pleura', x: 50, y: 32, description: 'Superficial boundary of quad sign', echogenicity: 'hyperechoic' },
      { id: 'effusion_fluid', name: 'Pleural Fluid Collection', x: 50, y: 52, description: 'Anechoic/hypoechoic space within Quad borders', echogenicity: 'anechoic' },
      { id: 'visceral_line', name: 'Visceral Pleura / Lung Line', x: 50, y: 68, description: 'Deep boundary of quad sign showing flapping lung', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Aerated lung directly apposed to chest wall. No fluid between parietal and visceral pleura.',
    normalFindings: [
      'No anechoic collection above the diaphragm',
      'Absence of quad sign',
      'Vertebrae shadow cut off at diaphragm (negative spine sign)'
    ],
    pathologyTitle: 'Pleural Effusion (Hemothorax / Hydrothorax)',
    pathologyDescription: '2D: Quad sign (anechoic fluid pocket bounded by upper rib, lower rib, parietal pleura, and visceral lung line). M-mode: Sinusoid sign (respiratory movement of visceral pleura toward parietal pleura).',
    pathologySignName: 'Quad Sign & Sinusoid Sign',
    pathologyFindings: [
      'Anechoic fluid in pleural cavity above the diaphragm',
      'Quad sign bounded by 4 distinct anatomic borders',
      'Floating, flapping atelectatic lung within fluid ("Jellyfish sign")',
      'Positive Spine Sign: thoracic vertebral bodies visible above diaphragm through fluid',
      'Sinusoid wave on M-mode representing respiratory undulation'
    ],
    clinicalPearls: [
      'Ultrasound is superior to chest radiography for detecting minimal pleural effusions (detects as little as 20 mL).',
      'Internal septations or echogenic debris indicate exudate, empyema, or hemothorax; simple transudate is completely anechoic.',
      'Use real-time ultrasound guidance for thoracentesis to mark safe puncture site >= 1.5 cm above diaphragm.'
    ],
    pitfalls: [
      'High-riding subdiaphragmatic fluid (ascites) can be confused with pleural effusion; always identify the bright diaphragmatic reflector first.'
    ],
    proceduralSteps: [
      'Place curvilinear probe at posterior axillary line at the level of the diaphragm.',
      'Identify diaphragm, spleen/liver, and pleural cavity above.',
      'Measure maximum interpleural distance at end-expiration for volume estimation.',
      'Switch to M-mode to demonstrate Sinusoid sign.'
    ],
    decisionTree: {
      question: 'Is Quad sign present with anechoic fluid and Sinusoid sign?',
      positiveFinding: 'Pleural effusion confirmed',
      positiveAction: 'Assess volume and respiratory compromise. Consider ultrasound-guided thoracentesis or tube thoracostomy.',
      negativeFinding: 'No pleural fluid',
      negativeAction: 'Exclude pleural effusion; consider parenchymal or vascular etiology.'
    }
  },

  'blue-consolidation': {
    id: 'blue-consolidation',
    protocol: 'blue',
    windowId: 'blue-cons',
    title: 'Consolidation - Hepatization & Shred Sign',
    subtitle: 'Detection of lobar pneumonia, atelectasis, and pulmonary infarction',
    probeType: 'Curvilinear',
    frequencyRange: '2.5 - 5.0 MHz',
    probeOrientation: 'Longitudinal or oblique over affected pulmonary area, marker cephalad.',
    mannequinPosition: {
      x: 60,
      y: 40,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'pleural_defect', name: 'Irregular Pleural Margin', x: 50, y: 30, description: 'Interrupted, jagged pleural contour', echogenicity: 'hyperechoic' },
      { id: 'hepatization', name: 'Tissue-Like Lung (Hepatization)', x: 50, y: 50, description: 'Echo-texture mimicking liver/spleen parenchyma', echogenicity: 'isoechoic' },
      { id: 'bronchogram', name: 'Air Bronchograms', x: 45, y: 55, description: 'Bright punctate or branching hyperechoic foci with acoustic shadowing', echogenicity: 'hyperechoic' },
      { id: 'shred_sign', name: 'Shred Sign (Fractal Line)', x: 50, y: 70, description: 'Irregular frayed boundary between consolidated and aerated lung', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Aerated lung prevents visualization of deeper parenchyma beyond the pleural line.',
    normalFindings: [
      'Clean pleural line with normal A-lines or physiological B-lines',
      'No parenchymal liver-like tissue visible'
    ],
    pathologyTitle: 'Lobar Pneumonia / Lung Consolidation',
    pathologyDescription: 'Loss of aeration converts lung into solid tissue-like organ (Hepatization). Irregular ragged deep border creates the Shred Sign. Punctate bright echoes represent Air Bronchograms.',
    pathologySignName: 'Hepatization & Shred Sign (Air Bronchograms)',
    pathologyFindings: [
      'Tissue-like pattern mimicking liver parenchyma (hepatization)',
      'Irregular jagged subpleural border (Shred sign)',
      'Dynamic air bronchograms (bright linear echoes that move with respiration, confirming patent airways in pneumonia)',
      'Static air bronchograms (associated with obstructive resorption atelectasis)'
    ],
    clinicalPearls: [
      'Dynamic air bronchograms have 90% positive predictive value for infectious pneumonia over compressive atelectasis.',
      'Ultrasound has 94% sensitivity for pneumonia compared to 65% for standard supine portable CXR.',
      'Vascular Doppler within consolidated lung can differentiate necrotic abscess from viable pneumonia.'
    ],
    pitfalls: [
      'Do not confuse the true liver with consolidated right lower lobe; always identify the intervening diaphragm.'
    ],
    proceduralSteps: [
      'Place probe over suspicious thoracic zone.',
      'Adjust depth and gain to visualize parenchymal echotexture.',
      'Observe air bronchograms for dynamic inspiratory motion.'
    ],
    decisionTree: {
      question: 'Is hepatized lung tissue with shred sign or dynamic air bronchograms present?',
      positiveFinding: 'Lung consolidation identified',
      positiveAction: 'Diagnose pneumonia/consolidation. Initiate targeted antimicrobial therapy and pulmonary toilet.',
      negativeFinding: 'Uniform aeration without tissue density',
      negativeAction: 'Rule out gross consolidation in scanned window.'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3. FOCUS (CARDIAC & HEMODYNAMICS)
  // ─────────────────────────────────────────────────────────────
  'focus-plax': {
    id: 'focus-plax',
    protocol: 'focus',
    windowId: 'focus-plax',
    title: 'Parasternal Long Axis (PLAX)',
    subtitle: 'Primary hemodynamic view: LV contractility, chamber sizes, and valves',
    probeType: 'Phased Array',
    frequencyRange: '1.5 - 4.0 MHz',
    probeOrientation: '3rd or 4th intercostal space immediately left of the sternum. Probe marker directed towards patient\'s right shoulder (approximately 10 o\'clock).',
    mannequinPosition: {
      x: 44,
      y: 33,
      view: 'anterior',
      angleDeg: 45,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'rv', name: 'Right Ventricle Outflow Tract (RVOT)', x: 45, y: 25, description: 'Anterior chamber closest to probe transducer', echogenicity: 'anechoic' },
      { id: 'ivs', name: 'Interventricular Septum (IVS)', x: 48, y: 38, description: 'Muscular wall between RV and LV', echogenicity: 'isoechoic' },
      { id: 'lv', name: 'Left Ventricle Cavity', x: 45, y: 55, description: 'Central contractile chamber', echogenicity: 'anechoic' },
      { id: 'mv', name: 'Mitral Valve (Anterior & Posterior Leaflets)', x: 62, y: 52, description: 'Bicuspid valve opening towards LV cavity', echogenicity: 'hyperechoic' },
      { id: 'av', name: 'Aortic Valve & Root', x: 68, y: 36, description: 'Right and non-coronary cusps opening into aorta', echogenicity: 'hyperechoic' },
      { id: 'la', name: 'Left Atrium', x: 75, y: 55, description: 'Posterior chamber receiving pulmonary venous return', echogenicity: 'anechoic' },
      { id: 'dao', name: 'Descending Thoracic Aorta (Cross-Section)', x: 72, y: 78, description: 'Circular anechoic structure posterior to LA/LV groove', echogenicity: 'anechoic' }
    ],
    normalDescription: 'Vigorous LV systolic thickening (>30-40%) with anterior mitral valve leaflet almost touching the septum in diastole (EPSS < 7 mm). Internal diameter RV : Aorta : LA roughly 1:1:1.',
    normalFindings: [
      'Normal LV fractional shortening and ejection fraction (>55%)',
      'End-point septal separation (EPSS) < 7 mm',
      'No pericardial effusion anterior to descending aorta',
      'Symmetric aortic valve leaflet excursion'
    ],
    pathologyTitle: 'Severe LV Systolic Dysfunction / Dilated Cardiomyopathy',
    pathologyDescription: 'Hypokinetic or akinetic LV walls with minimal systolic thickening (<10%). Dilated spherical left ventricle with markedly increased EPSS (>10-15 mm) indicating severely depressed ejection fraction.',
    pathologySignName: 'Severely Depressed LVEF & Increased EPSS',
    pathologyFindings: [
      'LV walls fail to thicken or contract concentrically',
      'EPSS > 10 mm (anterior mitral leaflet fails to open toward septum)',
      'Global hypokinesis with dilated LV cavity',
      'Possible spontaneous echo contrast (smoke) in LA/LV'
    ],
    clinicalPearls: [
      'EPSS (E-point septal separation) measured on M-mode through the anterior mitral valve leaflet correlates strongly with left ventricular ejection fraction: EPSS < 7 mm = normal EF; EPSS > 10 mm = reduced EF (<40%).',
      'Pericardial fluid tracks ANTERIOR to the descending aorta; pleural fluid tracks POSTERIOR to the descending aorta.',
      'In hypovolemic shock, PLAX shows "kissing papillary muscles" where LV walls touch at end-systole.'
    ],
    pitfalls: [
      'Do not foreshorten the LV; ensure the beam cuts through the true apex and aortic root simultaneously.'
    ],
    proceduralSteps: [
      'Place phased array probe at left 3rd-4th intercostal space, marker towards right shoulder.',
      'Align beam to visualize the longest dimension of the LV from mitral valve to apex.',
      'Evaluate anterior RVOT, IVS, LV lumen, posterior wall, MV, AV, and LA.',
      'Assess qualitative EF: normal, moderately depressed, severely depressed, or hyperdynamic.'
    ],
    decisionTree: {
      question: 'Is LV systolic contractility normal, hyperdynamic, or severely depressed?',
      positiveFinding: 'Severely depressed LVEF (EPSS > 10 mm)',
      positiveAction: 'Diagnose cardiogenic shock / severe systolic heart failure. Inotropes (dobutamine/milrinone), cautious afterload reduction, avoid volume overloading.',
      negativeFinding: 'Hyperdynamic LV ("kissing walls")',
      negativeAction: 'Diagnose hypovolemic or distributive (septic) shock. Initiate volume resuscitation.'
    }
  },

  'focus-psax': {
    id: 'focus-psax',
    protocol: 'focus',
    windowId: 'focus-psax',
    title: 'Parasternal Short Axis (PSAX) - Papillary Level',
    subtitle: 'Concentric LV geometry, regional wall motion, and RV pressure/volume overload',
    probeType: 'Phased Array',
    frequencyRange: '1.5 - 4.0 MHz',
    probeOrientation: 'From PLAX position, rotate probe 90 degrees clockwise with marker directed towards patient\'s left shoulder (approximately 2 o\'clock).',
    mannequinPosition: {
      x: 44,
      y: 33,
      view: 'anterior',
      angleDeg: 135,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'rv_crescent', name: 'Right Ventricle (Crescentic)', x: 30, y: 35, description: 'Crescent-shaped low-pressure chamber wrapping around LV', echogenicity: 'anechoic' },
      { id: 'ivs_curved', name: 'Interventricular Septum', x: 42, y: 48, description: 'Normally convex toward RV throughout cardiac cycle', echogenicity: 'isoechoic' },
      { id: 'lv_doughnut', name: 'Left Ventricle Cavity ("Doughnut")', x: 55, y: 55, description: 'Circular thick-walled muscular ring', echogenicity: 'anechoic' },
      { id: 'pm_pap', name: 'Posteromedial Papillary Muscle', x: 68, y: 65, description: 'Echogenic mound at 4-5 o\'clock position', echogenicity: 'isoechoic' },
      { id: 'al_pap', name: 'Anterolateral Papillary Muscle', x: 48, y: 68, description: 'Echogenic mound at 7-8 o\'clock position', echogenicity: 'isoechoic' }
    ],
    normalDescription: 'Left ventricle forms a round circular "doughnut" with symmetric concentric wall thickening toward the center. RV is crescentic with thin wall.',
    normalFindings: [
      'Circular LV chamber maintaining rounded shape in systole and diastole',
      'Normal concentric contraction of all 6 wall segments',
      'RV smaller than LV (RV:LV area ratio < 0.6)',
      'Curved interventricular septum projecting into RV'
    ],
    pathologyTitle: 'RV Strain / Cor Pulmonale ("D-Shaped" Left Ventricle)',
    pathologyDescription: 'Flattening of the interventricular septum creating a "D-shaped" LV. Diastolic flattening indicates volume overload; systolic flattening indicates pressure overload (e.g. massive pulmonary embolism).',
    pathologySignName: 'D-Sign (RV Pressure / Volume Overload)',
    pathologyFindings: [
      'Flattened interventricular septum compressing LV into "D" contour',
      'Enlarged right ventricle (RV size >= LV size)',
      'Paradoxical septal bounce',
      'Severe pulmonary hypertension or massive pulmonary embolism physiology'
    ],
    clinicalPearls: [
      'The D-sign at the papillary level in an unstable patient with sudden shock is highly indicative of acute massive pulmonary embolism or RV failure.',
      'Diastolic flattening only = RV volume overload (ASD, tricuspid regurgitation).',
      'Systolic + Diastolic flattening = RV pressure overload (Acute pulmonary embolism, ARDS with high PEEP, severe pulmonary arterial hypertension).'
    ],
    pitfalls: [
      'Do not confuse the aortic valve level (Mercedes-Benz sign) or mitral valve level (fish mouth) with the papillary level; the papillary level is the standard for wall motion and septal flattening.'
    ],
    proceduralSteps: [
      'Start in PLAX, rotate 90 degrees clockwise toward left shoulder.',
      'Tilt beam slightly caudad until the two papillary muscle mounds (anterolateral and posteromedial) are visible inside the round LV.',
      'Assess circularity of LV and whether the septum flattens during systole or diastole.'
    ],
    decisionTree: {
      question: 'Is the LV circular or compressed into a "D-shaped" configuration by the RV?',
      positiveFinding: 'D-shaped LV with RV dilation',
      positiveAction: 'Diagnose acute RV strain / cor pulmonale. Evaluate for massive pulmonary embolism; prepare systemic thrombolysis or ECMO, avoid fluid boluses.',
      negativeFinding: 'Circular doughnut LV with normal septum',
      negativeAction: 'RV overload excluded. Assess concentric wall motion.'
    }
  },

  'focus-a4c': {
    id: 'focus-a4c',
    protocol: 'focus',
    windowId: 'focus-a4c',
    title: 'Apical 4-Chamber (A4C)',
    subtitle: 'Direct biventricular comparison, chamber size ratio, and valvular function',
    probeType: 'Phased Array',
    frequencyRange: '1.5 - 4.0 MHz',
    probeOrientation: 'Cardiac apex (5th intercostal space, anterior axillary line, inferolateral to nipple), marker towards patient\'s left axilla (3 o\'clock).',
    mannequinPosition: {
      x: 58,
      y: 42,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'lv_apex', name: 'Left Ventricle & Apex', x: 60, y: 35, description: 'Cone-shaped muscular chamber forming the anatomical apex', echogenicity: 'anechoic' },
      { id: 'rv_apex', name: 'Right Ventricle', x: 38, y: 40, description: 'Triangular chamber; does NOT form cardiac apex normally', echogenicity: 'anechoic' },
      { id: 'mv_valve', name: 'Mitral Valve', x: 62, y: 55, description: 'Inserted more toward base than tricuspid valve', echogenicity: 'hyperechoic' },
      { id: 'tv_valve', name: 'Tricuspid Valve', x: 38, y: 57, description: 'Inserted more apically than mitral valve (normal offset)', echogenicity: 'hyperechoic' },
      { id: 'la_chamber', name: 'Left Atrium', x: 62, y: 75, description: 'Left-sided receiving chamber', echogenicity: 'anechoic' },
      { id: 'ra_chamber', name: 'Right Atrium', x: 38, y: 75, description: 'Right-sided receiving chamber', echogenicity: 'anechoic' }
    ],
    normalDescription: 'Left ventricle forms the true apex. RV is roughly two-thirds the size of the LV (RV/LV ratio < 0.6). Tricuspid valve leaflets insert slightly more apically than mitral valve leaflets.',
    normalFindings: [
      'LV apex forming the true anatomical tip of heart',
      'Normal RV/LV basal diameter ratio (< 0.67)',
      'Normal TAPSE (> 17 mm) indicating preserved RV longitudinal function',
      'No McConnell\'s sign'
    ],
    pathologyTitle: 'Acute Cor Pulmonale / McConnell\'s Sign',
    pathologyDescription: 'Severe RV enlargement with RV diameter exceeding LV diameter (RV/LV ratio > 1.0). McConnell\'s Sign: Akinesia of RV mid-free wall with preserved hyperdynamic apical contraction.',
    pathologySignName: 'McConnell\'s Sign & RV:LV Ratio > 1.0',
    pathologyFindings: [
      'RV larger than LV (RV/LV ratio > 1.0), with RV now sharing or forming the cardiac apex',
      'McConnell\'s sign: Hypokinesis/akinesia of RV mid-free wall with preserved apex motion (77% specific for acute pulmonary embolism)',
      'Severe tricuspid regurgitation jet',
      'TAPSE < 16 mm indicating depressed RV systolic function'
    ],
    clinicalPearls: [
      'In a normal heart, the LV forms the apex. If the RV forms the cardiac apex, the RV is pathologically dilated.',
      'TAPSE (Tricuspid Annular Plane Systolic Excursion): Place M-mode cursor through the lateral tricuspid annulus; normal excursion is > 17 mm. < 16 mm signifies RV failure.',
      'McConnell\'s sign is a distinctive regional RV wall motion abnormality characteristic of acute PE.'
    ],
    pitfalls: [
      'Avoid foreshortening the apex by placing the probe too high on the chest wall; slide down and laterally until the true apex is visualised.'
    ],
    proceduralSteps: [
      'Place probe at cardiac impulse / 5th intercostal space anterior axillary line.',
      'Angle beam towards patient\'s right shoulder.',
      'Adjust depth to visualize both atria and both ventricles.',
      'Measure RV basal diameter vs LV basal diameter.',
      'Assess TAPSE using M-mode cursor aligned through lateral tricuspid annulus.'
    ],
    decisionTree: {
      question: 'Is the RV/LV diameter ratio > 1.0 or is McConnell\'s sign present?',
      positiveFinding: 'RV dilation (RV/LV > 1.0) with McConnell\'s sign',
      positiveAction: 'High probability of acute pulmonary embolism with RV decompensation. Activate Pulmonary Embolism Response Team (PERT).',
      negativeFinding: 'Normal RV/LV ratio (< 0.67)',
      negativeAction: 'Acute RV failure unlikely. Evaluate LV filling and systolic performance.'
    }
  },

  'focus-subcostal': {
    id: 'focus-subcostal',
    protocol: 'focus',
    windowId: 'focus-sub',
    title: 'Subcostal 4-Chamber (S4C)',
    subtitle: 'Alternative cardiac window when parasternal views are obscured by COPD / mechanical ventilation',
    probeType: 'Phased Array',
    frequencyRange: '1.5 - 4.0 MHz',
    probeOrientation: 'Subxiphoid epigastrium, marker to patient\'s right, beam tilted cephalad towards left clavicle.',
    mannequinPosition: {
      x: 50,
      y: 38,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'liver_acoustic', name: 'Left Hepatic Lobe', x: 50, y: 22, description: 'Liver acoustic window', echogenicity: 'isoechoic' },
      { id: 'rv_sub', name: 'Right Ventricle', x: 42, y: 40, description: 'Chamber adjacent to liver border', echogenicity: 'anechoic' },
      { id: 'ra_sub', name: 'Right Atrium', x: 30, y: 55, description: 'Right receiving chamber', echogenicity: 'anechoic' },
      { id: 'lv_sub', name: 'Left Ventricle', x: 62, y: 48, description: 'Left chamber with thicker muscular wall', echogenicity: 'anechoic' },
      { id: 'la_sub', name: 'Left Atrium', x: 68, y: 68, description: 'Deepest chamber', echogenicity: 'anechoic' },
      { id: 'pericardial_rim', name: 'Pericardial Space', x: 50, y: 32, description: 'Fibrous layer between liver and RV wall', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Liver clearly visualized anteriorly. All 4 chambers seen in subcostal profile. No pericardial fluid separating liver from RV.',
    normalFindings: [
      'Normal interatrial septum without aneurysmal bowing',
      'No pericardial fluid collection',
      'Normal RV wall thickness (< 5 mm in diastole)'
    ],
    pathologyTitle: 'Pericardial Tamponade / Interatrial Septal Bowing',
    pathologyDescription: 'Circumferential anechoic fluid with diastolic RV collapse and right atrial inversion.',
    pathologySignName: 'Pericardial Tamponade in Subcostal View',
    pathologyFindings: [
      'Anechoic fluid band separating anterior RV wall from liver capsule',
      'Diastolic indentation of RV free wall',
      'Systolic inversion of right atrial wall lasting > 1/3 of cardiac cycle'
    ],
    clinicalPearls: [
      'Subcostal view does not require stopping chest compressions during CPR for more than 5-10 seconds.',
      'Best view for assessing pericardial effusion thickness and guiding emergency pericardiocentesis.',
      'Bending the patient\'s knees relaxes abdominal wall musculature and improves probe acoustic contact.'
    ],
    pitfalls: [
      'Excessive bowel gas can obscure view; apply steady, gentle downward pressure.'
    ],
    proceduralSteps: [
      'Place probe flat against epigastrium, marker to patient right.',
      'Aim beam under sternum towards left shoulder.',
      'Use liver tissue as acoustic window to focus on all 4 chambers.'
    ],
    decisionTree: {
      question: 'Is there a hemodynamically significant pericardial effusion?',
      positiveFinding: 'Pericardial effusion with RA/RV collapse',
      positiveAction: 'Immediate cardiac tamponade protocol.',
      negativeFinding: 'No effusion',
      negativeAction: 'Rotate probe 90 degrees counter-clockwise to inspect Inferior Vena Cava (IVC).'
    }
  },

  'focus-ivc': {
    id: 'focus-ivc',
    protocol: 'focus',
    windowId: 'focus-ivc',
    title: 'Inferior Vena Cava (IVC) - Hemodynamic Status',
    subtitle: 'Dynamic volume status, CVP estimation, and fluid responsiveness',
    probeType: 'Phased Array',
    frequencyRange: '1.5 - 4.0 MHz',
    probeOrientation: 'Subxiphoid midline, rotated 90 degrees from S4C with marker cephalad, tilted slightly to patient\'s right.',
    mannequinPosition: {
      x: 52,
      y: 40,
      view: 'anterior',
      angleDeg: 0,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'ivc_lumen', name: 'IVC Lumen', x: 50, y: 55, description: 'Tubular anechoic vessel entering right atrium', echogenicity: 'anechoic' },
      { id: 'ra_junction', name: 'Right Atrial Junction', x: 50, y: 25, description: 'Cavo-atrial junction', echogenicity: 'hyperechoic' },
      { id: 'hepatic_vein', name: 'Hepatic Vein Entry', x: 55, y: 40, description: 'Branch draining into IVC', echogenicity: 'anechoic' },
      { id: 'measurement_zone', name: 'Measurement Point (2 cm from RA)', x: 50, y: 48, description: 'Standard clinical caliper measurement location', echogenicity: 'isoechoic' }
    ],
    normalDescription: 'Diameter 1.5 - 2.1 cm with > 50% collapsibility on quiet inspiration in spontaneously breathing patients, corresponding to normal CVP (3-8 mmHg).',
    normalFindings: [
      'Normal baseline caliber (1.5 - 2.1 cm)',
      'Normal inspiratory collapse (50 - 75%)',
      'Estimated central venous pressure (CVP) ~ 5-8 mmHg'
    ],
    pathologyTitle: 'Plethoric Non-Collapsing IVC vs Flat Collapsing IVC',
    pathologyDescription: 'Plethoric: IVC > 2.1 cm with < 50% inspiratory collapse (CVP 10-20 mmHg, indicates fluid overload, RV failure, tamponade, or PE). Flat: IVC < 1.5 cm with complete 100% collapse (CVP 0-5 mmHg, indicates severe hypovolemia).',
    pathologySignName: 'IVC Collapsibility / Distensibility Index',
    pathologyFindings: [
      'Spontaneously breathing: Collapsibility Index = (Max - Min) / Max * 100%',
      'Mechanically ventilated: Distensibility Index = (Max - Min) / Min * 100% (>= 18% indicates fluid responsiveness)',
      'Plethoric IVC (> 2.1 cm, < 50% collapse): high CVP (10-20 mmHg)',
      'Flat IVC (< 1.5 cm, > 50% collapse): low CVP (0-5 mmHg)'
    ],
    clinicalPearls: [
      'Measure IVC diameter 1.5 - 2.0 cm caudal to the cavoatrial junction (or immediately caudal to hepatic vein insertion).',
      'In spontaneous breathing, inspiration creates NEGATIVE intrathoracic pressure -> IVC collapses.',
      'In positive pressure mechanical ventilation, inspiration creates POSITIVE intrathoracic pressure -> IVC distends!',
      'Never rely on IVC alone for fluid bolus decisions; correlate with clinical context, stroke volume variation, and lung ultrasound (B-lines).'
    ],
    pitfalls: [
      'Aorta can be mistaken for IVC; differentiate by checking left vs right of spine, thick pulsatile wall, and Doppler waveform.',
      'Spontaneous respiratory efforts in ventilated patients invalidate the distensibility equation; patient must be fully passive with Vt >= 8 mL/kg.'
    ],
    proceduralSteps: [
      'Find subcostal 4-chamber cardiac view.',
      'Rotate probe 90 degrees counter-clockwise so marker points to head.',
      'Trace IVC entering right atrium.',
      'Position M-mode cursor 2 cm caudal to cavoatrial junction.',
      'Measure maximum and minimum diameters over full respiratory cycle.'
    ],
    decisionTree: {
      question: 'What is the IVC diameter and respiratory variation?',
      positiveFinding: 'IVC > 2.1 cm with < 50% collapsibility',
      positiveAction: 'Estimated CVP high (10-20 mmHg). High risk of fluid overload; withhold fluid boluses, consider diuresis or inotropes.',
      negativeFinding: 'IVC < 1.5 cm with > 50% collapsibility',
      negativeAction: 'Estimated CVP low (0-5 mmHg). Patient is volume depleted and likely fluid responsive.'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 4. VASCULAR ACCESS & DVT COMPRESSION
  // ─────────────────────────────────────────────────────────────
  'vasc-ijv': {
    id: 'vasc-ijv',
    protocol: 'vascular',
    windowId: 'vasc-ijv',
    title: 'Internal Jugular Vein (IJV) - Central Venous Access',
    subtitle: 'Short vs Long axis orientation, dynamic needle tracking & carotid relationship',
    probeType: 'Linear',
    frequencyRange: '6.0 - 13.0 MHz',
    probeOrientation: 'Short axis (transverse): marker to patient\'s right at apex of Sedillot\'s triangle between sternal and clavicular heads of SCM. Long axis: rotate 90 degrees with marker cephalad.',
    mannequinPosition: {
      x: 43,
      y: 15,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'scm_muscle', name: 'Sternocleidomastoid Muscle', x: 50, y: 20, description: 'Superficial muscle band overlying vascular sheath', echogenicity: 'hypoechoic' },
      { id: 'ijv_lumen', name: 'Internal Jugular Vein', x: 40, y: 50, description: 'Large, thin-walled, oval, compressible vessel anterolateral to carotid', echogenicity: 'anechoic' },
      { id: 'carotid_lumen', name: 'Common Carotid Artery', x: 65, y: 55, description: 'Round, thick-walled, non-compressible, pulsatile medial vessel', echogenicity: 'anechoic' },
      { id: 'thyroid_lobe', name: 'Thyroid Gland (Medial)', x: 85, y: 65, description: 'Medial homogeneous glandular tissue', echogenicity: 'isoechoic' }
    ],
    normalDescription: 'IJV is anterolateral to carotid artery, thin-walled, non-pulsatile, and completely compresses with light probe pressure. Expands with Valsalva or Trendelenburg.',
    normalFindings: [
      'Complete wall-to-wall coaptation of IJV on compression',
      'Carotid artery resists compression and displays systolic pulsation',
      'No intraluminal echogenic thrombus',
      'IJV caliber increases > 20% in Trendelenburg position'
    ],
    pathologyTitle: 'IJV Thrombosis / Anatomical Overlap with Carotid',
    pathologyDescription: 'Non-compressible IJV with internal echogenic thrombus, or severe anatomical medial displacement directly anterior or medial to carotid artery (high puncture risk).',
    pathologySignName: 'Non-Compressible Vein / High-Risk Overlap',
    pathologyFindings: [
      'Incomplete collapse under probe compression (confirms acute or chronic thrombosis)',
      'Intraluminal echogenic clot',
      'Direct anterior-posterior overlap of IJV over carotid artery (carotid immediately posterior to vein puncture path)'
    ],
    clinicalPearls: [
      'Central line placement without real-time ultrasound guidance is no longer standard of care (ASA & NICE guidelines).',
      'Short axis provides view of adjacent carotid to prevent inadvertent arterial puncture; long axis allows tracking the needle tip along its entire course.',
      'Combined technique: Puncture in short axis for lateral safety, rotate to long axis to confirm wire placement in vein lumen before dilation.'
    ],
    pitfalls: [
      'Excessive probe pressure can collapse the vein completely, making it invisible and leading to through-and-through puncture of both vein and underlying carotid artery.'
    ],
    proceduralSteps: [
      'Place patient in 15-degree Trendelenburg position to distend IJV.',
      'Sterile prep and sheath on high-frequency linear probe.',
      'Identify IJV and carotid artery; confirm complete vein compressibility.',
      'Center IJV on screen, introduce needle at 45-degree angle, tracking hyperechoic needle tip in real-time.',
      'Visualize flash of dark venous blood, advance wire, confirm wire in lumen in long axis before dilating.'
    ],
    decisionTree: {
      question: 'Is the IJV fully compressible and patent without overriding the carotid artery?',
      positiveFinding: 'Patent, compressible, favorable lateral position',
      positiveAction: 'Safe to proceed with real-time ultrasound-guided central line placement.',
      negativeFinding: 'Thrombosed or directly overriding carotid',
      negativeAction: 'Do not puncture. Evaluate contralateral IJV or femoral vein.'
    }
  },

  'vasc-femoral': {
    id: 'vasc-femoral',
    protocol: 'vascular',
    windowId: 'vasc-fem',
    title: 'Femoral Vein & Artery - NAVEL Anatomy',
    subtitle: 'Groin vascular access, anatomy mapping, and compressibility screening',
    probeType: 'Linear',
    frequencyRange: '6.0 - 13.0 MHz',
    probeOrientation: 'Transverse across inguinal crease, marker to patient\'s right.',
    mannequinPosition: {
      x: 43,
      y: 65,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'cfa_lumen', name: 'Common Femoral Artery', x: 40, y: 50, description: 'Lateral, pulsatile, thick-walled circular vessel', echogenicity: 'anechoic' },
      { id: 'cfv_lumen', name: 'Common Femoral Vein', x: 60, y: 50, description: 'Medial, compressible oval vessel receiving saphenous junction', echogenicity: 'anechoic' },
      { id: 'gsv_junction', name: 'Great Saphenous Vein Junction ("Mickey Mouse")', x: 68, y: 35, description: 'Superficial vein draining into CFV medially', echogenicity: 'anechoic' },
      { id: 'fem_nerve', name: 'Femoral Nerve Zone', x: 22, y: 48, description: 'Lateral hyperechoic honeycomb structure in fascial plane', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Common Femoral Vein lies medial to Common Femoral Artery (NAVEL: Nerve, Artery, Vein, Empty, Lymphatics). Completely compresses with gentle downward pressure.',
    normalFindings: [
      'Complete wall-to-wall collapse of CFV on compression',
      'Saphenofemoral junction visible medially',
      'Artery remains patent and round under compression'
    ],
    pathologyTitle: 'Femoral Vein Thrombosis / Anatomical Variants',
    pathologyDescription: 'Non-compressible femoral vein lumen or visible intraluminal clot. Duplication of femoral vein.',
    pathologySignName: 'Non-Compressible Common Femoral Vein',
    pathologyFindings: [
      'Failure of anterior and posterior venous walls to touch completely',
      'Echogenic intraluminal material representing deep vein thrombosis',
      'Loss of normal venous respiratory variation and augmentation'
    ],
    clinicalPearls: [
      'In CPR, femoral vein catheterization does not interfere with chest compressions.',
      'Remember the "Mickey Mouse sign" at the saphenofemoral junction: CFV is the face, CFA is the lateral ear, GSV is the medial ear.',
      'Puncture 1-2 cm below the inguinal ligament to avoid intraperitoneal bleeding above the ligament.'
    ],
    pitfalls: [
      'Puncturing below the bifurcation of the femoral artery can lead to pseudoaneurysm or arteriovenous fistula.'
    ],
    proceduralSteps: [
      'Place linear probe transversely just inferior to inguinal ligament.',
      'Identify CFA laterally and CFV medially.',
      'Test compressibility by applying vertical pressure with the probe.',
      'Under real-time guidance, advance needle into the anterior wall of the CFV.'
    ],
    decisionTree: {
      question: 'Is the CFV fully compressible with no intraluminal clot?',
      positiveFinding: 'Compressible CFV',
      positiveAction: 'Proceed with femoral cannulation under direct real-time visualization.',
      negativeFinding: 'Incomplete compression / intraluminal clot',
      negativeAction: 'DVT confirmed. Abort cannulation at this site; initiate anticoagulation protocol.'
    }
  },

  'vasc-dvt': {
    id: 'vasc-dvt',
    protocol: 'vascular',
    windowId: 'vasc-dvt',
    title: 'Lower Extremity DVT Compression Examination',
    subtitle: 'Standard 2-point and 3-point bedside venous compression rule-out',
    probeType: 'Linear',
    frequencyRange: '6.0 - 13.0 MHz',
    probeOrientation: 'Transverse to the vein axis, marker to patient\'s right. Test Point 1: Common femoral vein at saphenous junction. Test Point 2: Popliteal vein behind the knee.',
    mannequinPosition: {
      x: 43,
      y: 82,
      view: 'anterior',
      angleDeg: 90,
      lockRadiusPx: 18,
    },
    acousticLandmarks: [
      { id: 'pop_vein', name: 'Popliteal Vein', x: 50, y: 45, description: 'Superficial to popliteal artery in popliteal fossa', echogenicity: 'anechoic' },
      { id: 'pop_artery', name: 'Popliteal Artery', x: 50, y: 68, description: 'Deeper pulsatile thick-walled vessel', echogenicity: 'anechoic' },
      { id: 'fascia_pop', name: 'Popliteal Fascial Border', x: 50, y: 25, description: 'Dense fibrous boundary', echogenicity: 'hyperechoic' }
    ],
    normalDescription: 'Vein lumen collapses completely with opposing walls touching (wall-to-wall coaptation) upon gentle probe compression at all test points.',
    normalFindings: [
      '100% complete compression of common femoral vein at saphenous junction',
      '100% complete compression of femoral vein bifurcation',
      '100% complete compression of popliteal vein in popliteal fossa',
      'Absence of intraluminal echogenic mass'
    ],
    pathologyTitle: 'Deep Vein Thrombosis (DVT) Confirmed',
    pathologyDescription: 'Non-compressible vein: persistent lumen under probe pressure sufficient to deform the adjacent artery. Hypoechoic or echogenic thrombus in lumen.',
    pathologySignName: 'Non-Compressible Vein (Diagnostic for DVT)',
    pathologyFindings: [
      'Incomplete compression: failure of anterior and posterior walls to coapt',
      'Direct visualization of intraluminal clot',
      'Vein distended larger than accompanying artery',
      'Absent Doppler flow or absent flow augmentation with distal calf squeeze'
    ],
    clinicalPearls: [
      '2-point compression ultrasonography (CFV + Popliteal) has 99% sensitivity for clinically significant proximal deep vein thrombosis in symptomatic patients.',
      'Compression must be done in the TRANSVERSE plane; in longitudinal view, the probe can slip off the vein and give a false impression of collapse.',
      'Apply enough pressure to slightly deform the companion artery; if the vein still has an open lumen, DVT is confirmed.'
    ],
    pitfalls: [
      'A fresh acute thrombus is often completely anechoic (jet black) and looks identical to liquid blood; only lack of compressibility reveals it!',
      'Lymph nodes can mimic a clotted vein; trace the structure proximally and distally to ensure it is tubular.'
    ],
    proceduralSteps: [
      'Patient supine with hip slightly externally rotated and knee flexed.',
      'Compress Common Femoral Vein from 1 cm above saphenous junction down to bifurcation.',
      'Flex patient knee 30 degrees, place probe in popliteal fossa transversely.',
      'Identify popliteal vein (superficial to artery) and compress to complete wall coaptation.'
    ],
    decisionTree: {
      question: 'Are the Common Femoral and Popliteal veins 100% compressible?',
      positiveFinding: 'Non-compressible segment identified',
      positiveAction: 'Deep vein thrombosis confirmed. Initiate therapeutic anticoagulation (LMWH/DOAC) if no contraindications.',
      negativeFinding: '100% complete compression at all sites',
      negativeAction: 'Proximal lower extremity DVT ruled out with high confidence.'
    }
  }
};

// ─────────────────────────────────────────────────────────────
// CLINICAL CALCULATION ENGINES
// ─────────────────────────────────────────────────────────────

/**
 * 1. IVC Collapsibility Index (Caval Index in spontaneously breathing patients)
 * Formula: ((IVC_max - IVC_min) / IVC_max) * 100%
 */
export function calculateIvcCollapsibility(maxDiameterCm: number, minDiameterCm: number): {
  indexPct: number;
  cvpEstimate: string;
  volumeResponsiveness: string;
  interpretation: string;
  isValid: boolean;
} {
  if (
    typeof maxDiameterCm !== 'number' ||
    typeof minDiameterCm !== 'number' ||
    isNaN(maxDiameterCm) ||
    isNaN(minDiameterCm) ||
    maxDiameterCm <= 0 ||
    minDiameterCm < 0 ||
    minDiameterCm > maxDiameterCm
  ) {
    return {
      indexPct: 0,
      cvpEstimate: 'Invalid input',
      volumeResponsiveness: 'Unknown',
      interpretation: 'Max diameter must be positive and greater than or equal to Min diameter.',
      isValid: false
    };
  }

  const indexPct = Math.round((((maxDiameterCm - minDiameterCm) / maxDiameterCm) * 100) * 10) / 10;

  let cvpEstimate = '5 - 10 mmHg (Intermediate)';
  let volumeResponsiveness = 'Possible / Intermediate';
  let interpretation = '';

  if (maxDiameterCm < 2.1 && indexPct > 50) {
    cvpEstimate = '0 - 5 mmHg (Low CVP, ~3 mmHg)';
    volumeResponsiveness = 'High Likelihood (Fluid Responsive)';
    interpretation = 'Normal to small IVC with >50% inspiratory collapse indicates low right atrial pressure and high probability of cardiac output increase with volume loading.';
  } else if (maxDiameterCm > 2.1 && indexPct < 50) {
    cvpEstimate = '10 - 20 mmHg (High CVP, ~15 mmHg)';
    volumeResponsiveness = 'Low Likelihood (Risk of Volume Overload)';
    interpretation = 'Plethoric IVC with <50% collapse indicates elevated central venous pressure. Fluid loading is unlikely to increase cardiac output and risks pulmonary edema.';
  } else {
    cvpEstimate = '5 - 10 mmHg (Intermediate, ~8 mmHg)';
    volumeResponsiveness = 'Indeterminate / Test with Passive Leg Raise (PLR)';
    interpretation = 'Intermediate IVC parameters. Correlate with clinical exam, dynamic passive leg raise test, or stroke volume variation.';
  }

  return {
    indexPct,
    cvpEstimate,
    volumeResponsiveness,
    interpretation,
    isValid: true
  };
}

/**
 * 2. IVC Distensibility Index (in mechanically ventilated patients)
 * Formula: ((IVC_max - IVC_min) / IVC_min) * 100%
 */
export function calculateIvcDistensibility(maxDiameterCm: number, minDiameterCm: number): {
  indexPct: number;
  volumeResponsiveness: string;
  interpretation: string;
  isValid: boolean;
} {
  if (
    typeof maxDiameterCm !== 'number' ||
    typeof minDiameterCm !== 'number' ||
    isNaN(maxDiameterCm) ||
    isNaN(minDiameterCm) ||
    maxDiameterCm <= 0 ||
    minDiameterCm <= 0 ||
    minDiameterCm > maxDiameterCm
  ) {
    return {
      indexPct: 0,
      volumeResponsiveness: 'Unknown',
      interpretation: 'Both diameters must be positive, and Max diameter must be >= Min diameter.',
      isValid: false
    };
  }

  const indexPct = Math.round((((maxDiameterCm - minDiameterCm) / minDiameterCm) * 100) * 10) / 10;

  let volumeResponsiveness = 'Low Likelihood';
  let interpretation = '';

  if (indexPct >= 18) {
    volumeResponsiveness = 'Fluid Responsive (dIVC >= 18%)';
    interpretation = 'In passive mechanical ventilation (Vt >= 8 mL/kg, sinus rhythm, no spontaneous breathing), dIVC >= 18% has high sensitivity and specificity for fluid responsiveness.';
  } else {
    volumeResponsiveness = 'Unlikely Fluid Responsive (dIVC < 18%)';
    interpretation = 'Distensibility index < 18% indicates that positive pressure tidal inflation does not significantly alter venous return; fluid bolus unlikely to improve stroke volume.';
  }

  return {
    indexPct,
    volumeResponsiveness,
    interpretation,
    isValid: true
  };
}

/**
 * 3. 3-Axis Bladder Volume Calculator
 * Formula (prolate ellipsoid): Volume (mL) = Length * Width * Height * 0.523
 */
export function calculateBladderVolume(lengthCm: number, widthCm: number, heightCm: number): {
  volumeMl: number;
  isRetention: boolean;
  clinicalRecommendation: string;
  isValid: boolean;
} {
  if (
    typeof lengthCm !== 'number' ||
    typeof widthCm !== 'number' ||
    typeof heightCm !== 'number' ||
    isNaN(lengthCm) ||
    isNaN(widthCm) ||
    isNaN(heightCm) ||
    lengthCm <= 0 ||
    widthCm <= 0 ||
    heightCm <= 0
  ) {
    return {
      volumeMl: 0,
      isRetention: false,
      clinicalRecommendation: 'Invalid dimensions. All three axes must be positive numbers.',
      isValid: false
    };
  }

  // Standard prolate ellipsoid factor: pi / 6 = 0.523598775598...
  const volumeMl = Math.round(lengthCm * widthCm * heightCm * 0.523 * 10) / 10;
  const isRetention = volumeMl >= 400;

  let clinicalRecommendation = 'Normal post-void residual (<100 mL). No intervention required.';
  if (volumeMl >= 400) {
    clinicalRecommendation = 'Acute urinary retention (Volume >= 400 mL). High risk of detrusor injury; recommend prompt in-and-out catheterization or Foley insertion.';
  } else if (volumeMl >= 250) {
    clinicalRecommendation = 'Mild to moderate urinary retention (250 - 399 mL). Encourage spontaneous voiding in PACU; re-scan in 30-60 minutes.';
  } else if (volumeMl >= 100) {
    clinicalRecommendation = 'Mild residual volume (100 - 249 mL). Clinically acceptable post-void residual; monitor symptoms.';
  }

  return {
    volumeMl,
    isRetention,
    clinicalRecommendation,
    isValid: true
  };
}

/**
 * 4. Elliptical Area Calculator
 * Formula: Area = pi * (axis1 / 2) * (axis2 / 2) = (pi * axis1 * axis2) / 4
 */
export function calculateEllipseArea(axis1Cm: number, axis2Cm: number): {
  areaCm2: number;
  isValid: boolean;
} {
  if (
    typeof axis1Cm !== 'number' ||
    typeof axis2Cm !== 'number' ||
    isNaN(axis1Cm) ||
    isNaN(axis2Cm) ||
    axis1Cm <= 0 ||
    axis2Cm <= 0
  ) {
    return {
      areaCm2: 0,
      isValid: false
    };
  }

  const areaCm2 = Math.round(((Math.PI * axis1Cm * axis2Cm) / 4) * 100) / 100;
  return {
    areaCm2,
    isValid: true
  };
}
