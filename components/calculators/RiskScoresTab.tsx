'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  ShieldAlert,
  HeartPulse,
  Activity,
  Brain,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  RefreshCw,
  Info,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  calculateWellsDvt,
  calculateWellsPe,
  calculateCha2ds2Vasc,
  calculateCurb65,
  calculatePsi,
  calculateQsofa,
  calculateSofa,
  calculateGcs,
  calculateNihss,
  calculateMeldNa,
  calculateChildPugh,
  calculateCkdEpi2021,
  WellsDvtInput,
  WellsPeInput,
  Cha2ds2VascInput,
  Curb65Input,
  PsiInput,
  QsofaInput,
  SofaInput,
  GcsInput,
  NihssInput,
  ThrombolysisChecklist,
  MeldNaInput,
  ChildPughInput,
  CkdEpi2021Input,
} from '@/lib/riskScores';

const inputClass = "glass-input w-full px-3 py-2 text-[12.5px] font-[500]";
const labelClass = "block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1";

interface RiskScoreTabProps {
  initialScore?: string;
}

export default function RiskScoresTab({ initialScore = 'wells_dvt' }: RiskScoreTabProps) {
  const { language, activeCase, patientLabs, updatePatientLabs } = useAppStore();
  const [selectedScore, setSelectedScore] = useState(initialScore);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ==========================================
  // 1. WELLS DVT STATE
  // ==========================================
  const [wellsDvt, setWellsDvt] = useState<WellsDvtInput>({
    activeCancer: false,
    paralysisOrImmobilization: false,
    bedriddenOrMajorSurgery: false,
    localizedTenderness: false,
    entireLegSwollen: false,
    calfSwellingGt3cm: false,
    pittingEdemaConfined: false,
    collateralSuperficialVeins: false,
    previousDvt: false,
    alternativeDiagnosisLikely: false,
  });

  // ==========================================
  // 2. WELLS PE STATE (+ PERC)
  // ==========================================
  const [wellsPe, setWellsPe] = useState<WellsPeInput>({
    clinicalSignsDvt: false,
    alternativeDiagnosisLessLikely: false,
    heartRateGt100: false,
    immobilizationOrSurgery: false,
    previousDvtPe: false,
    hemoptysis: false,
    malignancy: false,
    percCriteria: {
      ageGte50: false,
      heartRateGte100: false,
      spo2Lt95: false,
      unilateralLegSwelling: false,
      hemoptysis: false,
      recentSurgeryOrTrauma: false,
      priorDvtPe: false,
      hormoneUse: false,
    },
  });

  // ==========================================
  // 3. CHA2DS2-VASc STATE
  // ==========================================
  const [cha2ds2Vasc, setCha2ds2Vasc] = useState<Cha2ds2VascInput>({
    age: parseInt(activeCase.patientAge, 10) || 65,
    sex: activeCase.patientSex || 'M',
    chf: false,
    hypertension: false,
    diabetes: false,
    strokeOrTiaOrVte: false,
    vascularDisease: false,
  });

  // Sync activeCase age/sex changes
  useEffect(() => {
    if (activeCase.patientAge) {
      const parsedAge = parseInt(activeCase.patientAge, 10);
      if (!isNaN(parsedAge)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCha2ds2Vasc((prev) => ({ ...prev, age: parsedAge }));
      }
    }
    if (activeCase.patientSex) {
      setCha2ds2Vasc((prev) => ({ ...prev, sex: activeCase.patientSex }));
    }
  }, [activeCase.patientAge, activeCase.patientSex]);

  // ==========================================
  // 4. CURB-65 & PSI STATE
  // ==========================================
  const [pneumoniaTool, setPneumoniaTool] = useState<'curb65' | 'psi'>('curb65');
  const [curb65, setCurb65] = useState<Curb65Input>({
    confusion: false,
    bunGt19: (parseFloat(patientLabs.bloodUreaNitrogen) || 0) > 19,
    rrGte30: false,
    bpLow: false,
    ageGte65: (parseInt(activeCase.patientAge, 10) || 0) >= 65,
  });

  const [psi, setPsi] = useState<PsiInput>({
    age: parseInt(activeCase.patientAge, 10) || 65,
    sex: activeCase.patientSex || 'M',
    nursingHomeResident: false,
    neoplasticDisease: false,
    liverDisease: false,
    chf: false,
    cerebrovascularDisease: false,
    renalDisease: false,
    alteredMentalStatus: false,
    rrGte30: false,
    sbpLt90: false,
    tempAbnormal: false,
    pulseGte125: false,
    arterialPhLt735: false,
    bunGte30: (parseFloat(patientLabs.bloodUreaNitrogen) || 0) >= 30,
    sodiumLt130: (parseFloat(patientLabs.sodium) || 140) < 130,
    glucoseGte250: (parseFloat(patientLabs.glucose) || 100) >= 250,
    hematocritLt30: false,
    pao2Lt60orSpo2Lt90: false,
    pleuralEffusion: false,
  });

  // ==========================================
  // 5. qSOFA & SOFA STATE
  // ==========================================
  const [sepsisTool, setSepsisTool] = useState<'qsofa' | 'sofa'>('qsofa');
  const [qsofa, setQsofa] = useState<QsofaInput>({
    alteredMentalStatus: false,
    rrGte22: false,
    sbpLte100: false,
  });

  const [sofa, setSofa] = useState<SofaInput>({
    pao2Fio2: 400,
    mechanicallyVentilated: false,
    platelets: parseFloat(patientLabs.platelets) || 220,
    bilirubin: parseFloat(patientLabs.totalBilirubin) || 0.8,
    cardiovascular: {
      map: 80,
      dopamineDose: 0,
      dobutamineDose: 0,
      epinephrineDose: 0,
      norepinephrineDose: 0,
    },
    gcs: 15,
    creatinine: parseFloat(patientLabs.serumCreatinine) || 0.9,
    urineOutput24h: 1500,
  });

  const [sofaVasopressor, setSofaVasopressor] = useState<'none' | 'dopamine_low' | 'dobutamine' | 'dopamine_mid' | 'epi_norepi_low' | 'dopamine_high' | 'epi_norepi_high'>('none');

  const handleVasopressorChange = (val: string) => {
    setSofaVasopressor(val as any);
    let dopamineDose = 0;
    let dobutamineDose = 0;
    let epinephrineDose = 0;
    let norepinephrineDose = 0;
    if (val === 'dopamine_low') dopamineDose = 5;
    else if (val === 'dobutamine') dobutamineDose = 5;
    else if (val === 'dopamine_mid') dopamineDose = 10;
    else if (val === 'epi_norepi_low') norepinephrineDose = 0.08;
    else if (val === 'dopamine_high') dopamineDose = 20;
    else if (val === 'epi_norepi_high') norepinephrineDose = 0.15;

    setSofa((prev) => ({
      ...prev,
      cardiovascular: {
        ...prev.cardiovascular,
        dopamineDose,
        dobutamineDose,
        epinephrineDose,
        norepinephrineDose,
      },
    }));
  };

  // ==========================================
  // 6. GCS & GCS-P STATE
  // ==========================================
  const [gcsInput, setGcsInput] = useState<GcsInput>({
    eyeOpening: 4,
    verbalResponse: 5,
    motorResponse: 6,
    unreactivePupils: 0,
  });

  // ==========================================
  // 7. NIHSS & THROMBOLYSIS STATE
  // ==========================================
  const [nihssInput, setNihssInput] = useState<NihssInput>({
    loc1a: 0,
    loc1bQuestions: 0,
    loc1cCommands: 0,
    bestGaze: 0,
    visualFields: 0,
    facialPalsy: 0,
    motorArmLeft: 0,
    motorArmRight: 0,
    motorLegLeft: 0,
    motorLegRight: 0,
    limbAtaxia: 0,
    sensory: 0,
    bestLanguage: 0,
    dysarthria: 0,
    extinctionInattention: 0,
  });

  const [thrombolysisChecklist, setThrombolysisChecklist] = useState<ThrombolysisChecklist>({
    timeFromLknHours: 2.0,
    noIntracranialHemorrhage: true,
    sbpLt185AndDbpLt110: true,
    glucoseGt50: true,
    plateletsGte100k: (parseFloat(patientLabs.platelets) || 200) >= 100,
    inrLte17AndNoDoac: (parseFloat(patientLabs.inr) || 1.0) <= 1.7,
    noRecentTraumaSurgeryOrStroke: true,
  });

  // ==========================================
  // 8. MELD-Na & CHILD-PUGH STATE
  // ==========================================
  const [hepaticTool, setHepaticTool] = useState<'meld_na' | 'child_pugh'>('meld_na');
  const [meldNaInput, setMeldNaInput] = useState<MeldNaInput>({
    creatinine: parseFloat(patientLabs.serumCreatinine) || 1.1,
    bilirubin: parseFloat(patientLabs.totalBilirubin) || 1.2,
    inr: parseFloat(patientLabs.inr) || 1.1,
    sodium: parseFloat(patientLabs.sodium) || 136,
    onDialysisTwicePastWeek: false,
  });

  const [childPughInput, setChildPughInput] = useState<ChildPughInput>({
    bilirubin: parseFloat(patientLabs.totalBilirubin) || 1.2,
    albumin: parseFloat(patientLabs.albumin) || 3.8,
    inr: parseFloat(patientLabs.inr) || 1.1,
    ascites: 'none',
    encephalopathy: 'none',
  });

  // ==========================================
  // 9. CKD-EPI 2021 STATE
  // ==========================================
  const [ckdEpiInput, setCkdEpiInput] = useState<CkdEpi2021Input>({
    creatinine: parseFloat(patientLabs.serumCreatinine) || 1.0,
    age: parseInt(activeCase.patientAge, 10) || 55,
    sex: activeCase.patientSex || 'M',
  });

  const scoreOptions = [
    { id: 'wells_dvt', label: 'Wells DVT', icon: Activity, tag: 'VTE' },
    { id: 'wells_pe', label: 'Wells PE + PERC', icon: AlertTriangle, tag: 'Pulmonary' },
    { id: 'cha2ds2_vasc', label: 'CHA₂DS₂-VASc', icon: HeartPulse, tag: 'Cardiology' },
    { id: 'curb_psi', label: 'CURB-65 & PSI', icon: FileText, tag: 'Pulmonary' },
    { id: 'sepsis', label: 'qSOFA & SOFA', icon: ShieldAlert, tag: 'Critical Care' },
    { id: 'gcs', label: 'GCS & GCS-P', icon: Brain, tag: 'Neuro' },
    { id: 'nihss', label: 'NIHSS + TNK/tPA', icon: Stethoscope, tag: 'Stroke' },
    { id: 'hepatic', label: 'MELD-Na / Child-Pugh', icon: Activity, tag: 'Hepatology' },
    { id: 'ckd_epi', label: 'CKD-EPI 2021', icon: RefreshCw, tag: 'Nephrology' },
  ];

  return (
    <div className="space-y-5">
      {/* Score Grid / Selector */}
      <div>
        <label className={labelClass}>
          {language === 'en' ? 'Select Clinical Risk Score' : 'Pilih Skor Risiko Klinis'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {scoreOptions.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedScore === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setSelectedScore(item.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.04]">
                    {item.tag}
                  </span>
                </div>
                <span className="text-[12.5px] font-[700] tracking-tight">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Score Calculator Card */}
      <div className="glass-card-static p-5 border border-white/10 rounded-2xl">
        <AnimatePresence mode="wait">
          {/* =========================================================
              1. WELLS DVT
             ========================================================= */}
          {selectedScore === 'wells_dvt' && (
            <motion.div
              key="wells_dvt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Wells DVT Criteria</h3>
                  <p className="text-[11.5px] text-slate-400">Pretest probability stratification for Deep Vein Thrombosis</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setWellsDvt({
                      activeCancer: false,
                      paralysisOrImmobilization: false,
                      bedriddenOrMajorSurgery: false,
                      localizedTenderness: false,
                      entireLegSwollen: false,
                      calfSwellingGt3cm: false,
                      pittingEdemaConfined: false,
                      collateralSuperficialVeins: false,
                      previousDvt: false,
                      alternativeDiagnosisLikely: false,
                    })
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'activeCancer', label: 'Active cancer (treatment within 6 months or palliative)', points: '+1' },
                  { key: 'paralysisOrImmobilization', label: 'Paralysis, paresis, or recent plaster cast of lower extremity', points: '+1' },
                  { key: 'bedriddenOrMajorSurgery', label: 'Recently bedridden >3 days or major surgery within 12 weeks', points: '+1' },
                  { key: 'localizedTenderness', label: 'Localized tenderness along distribution of deep venous system', points: '+1' },
                  { key: 'entireLegSwollen', label: 'Entire leg swollen', points: '+1' },
                  { key: 'calfSwellingGt3cm', label: 'Calf swelling >3 cm larger than asymptomatic leg (10cm below tibial tuberosity)', points: '+1' },
                  { key: 'pittingEdemaConfined', label: 'Pitting edema confined to the symptomatic leg', points: '+1' },
                  { key: 'collateralSuperficialVeins', label: 'Collateral superficial veins (non-varicose)', points: '+1' },
                  { key: 'previousDvt', label: 'Previously documented DVT', points: '+1' },
                  { key: 'alternativeDiagnosisLikely', label: 'Alternative diagnosis at least as likely as DVT (e.g. cellulitis, Baker cyst, muscle tear)', points: '-2' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      wellsDvt[item.key as keyof WellsDvtInput]
                        ? 'bg-blue-600/15 border-blue-500/40 text-blue-200'
                        : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={!!wellsDvt[item.key as keyof WellsDvtInput]}
                        onChange={(e) =>
                          setWellsDvt((prev) => ({ ...prev, [item.key]: e.target.checked }))
                        }
                        className="w-4 h-4 rounded accent-blue-600"
                      />
                      <span className="text-[12px]">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 ml-2 shrink-0">
                      {item.points}
                    </span>
                  </label>
                ))}
              </div>

              {/* Result Summary */}
              {(() => {
                const res = calculateWellsDvt(wellsDvt);
                const badgeColor =
                  res.riskTierThree === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : res.riskTierThree === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-[700] uppercase text-slate-400">Wells DVT Score</span>
                        <span className="text-[24px] font-[800] font-mono text-blue-400 tabular-nums">
                          {res.score}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                          {res.riskTierThree} Risk ({res.riskTierTwo})
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(`Wells DVT Score: ${res.score} (${res.riskTierThree} Risk) - ${res.clinicalAction}`)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                          title="Copy"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="text-[12px] text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                      <span className="font-semibold text-slate-200">Probability:</span> {res.dvtProbability}
                    </div>
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                      💡 <strong>Clinical Recommendation:</strong> {res.clinicalAction}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* =========================================================
              2. WELLS PE (+ PERC)
             ========================================================= */}
          {selectedScore === 'wells_pe' && (
            <motion.div
              key="wells_pe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Wells PE Score & PERC Rule-Out</h3>
                  <p className="text-[11.5px] text-slate-400">Pulmonary Embolism probability and bedside rule-out</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'clinicalSignsDvt', label: 'Clinical signs and symptoms of DVT (leg swelling, pain)', points: '+3.0' },
                  { key: 'alternativeDiagnosisLessLikely', label: 'Alternative diagnosis less likely than PE', points: '+3.0' },
                  { key: 'heartRateGt100', label: 'Heart rate > 100 beats/min', points: '+1.5' },
                  { key: 'immobilizationOrSurgery', label: 'Immobilization ≥3 consecutive days or surgery in past 4 weeks', points: '+1.5' },
                  { key: 'previousDvtPe', label: 'Previous documented DVT or PE', points: '+1.5' },
                  { key: 'hemoptysis', label: 'Hemoptysis', points: '+1.0' },
                  { key: 'malignancy', label: 'Malignancy (active or within 6 months)', points: '+1.0' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      wellsPe[item.key as keyof WellsPeInput]
                        ? 'bg-amber-600/15 border-amber-500/40 text-amber-200'
                        : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={!!wellsPe[item.key as keyof WellsPeInput]}
                        onChange={(e) =>
                          setWellsPe((prev) => ({ ...prev, [item.key]: e.target.checked }))
                        }
                        className="w-4 h-4 rounded accent-amber-500"
                      />
                      <span className="text-[12px]">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 ml-2 shrink-0">
                      {item.points}
                    </span>
                  </label>
                ))}
              </div>

              {/* PERC Section */}
              {(() => {
                const peRes = calculateWellsPe(wellsPe);
                return (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-bold text-slate-200 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-emerald-400" />
                        PERC Rule-Out Criteria (Pulmonary Embolism Rule-out Criteria)
                      </div>
                      <span className="text-[10.5px] text-slate-400">Strictly for Low-Risk (Wells &lt; 2)</span>
                    </div>
                    {peRes.percApplicable ? (
                      <p className="text-[11px] text-slate-400">
                        Wells PE is Low risk (&lt;2.0): If ALL 8 criteria below are negative, PE is clinically ruled out without D-dimer.
                      </p>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
                        ⚠️ <strong>PERC Inapplicable:</strong> Wells PE score is ≥ 2.0 (Moderate/High risk). PERC cannot safely rule out PE; diagnostic testing (D-dimer or CTA) is required.
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {[
                        { key: 'ageGte50', label: 'Age ≥ 50' },
                        { key: 'heartRateGte100', label: 'Heart Rate ≥ 100 bpm' },
                        { key: 'spo2Lt95', label: 'SpO2 < 95% on room air' },
                        { key: 'unilateralLegSwelling', label: 'Unilateral leg swelling' },
                        { key: 'hemoptysis', label: 'Hemoptysis' },
                        { key: 'recentSurgeryOrTrauma', label: 'Recent surgery / trauma (≤4 wks)' },
                        { key: 'priorDvtPe', label: 'Prior DVT or PE' },
                        { key: 'hormoneUse', label: 'Exogenous estrogen / hormone use' },
                      ].map((perc) => (
                        <label key={perc.key} className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!wellsPe.percCriteria?.[perc.key as keyof typeof wellsPe.percCriteria]}
                            onChange={(e) =>
                              setWellsPe((prev) => ({
                                ...prev,
                                percCriteria: {
                                  ...prev.percCriteria,
                                  [perc.key]: e.target.checked,
                                },
                              }))
                            }
                            className="w-3.5 h-3.5 rounded accent-rose-500"
                          />
                          <span>{perc.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Result Summary */}
              {(() => {
                const res = calculateWellsPe(wellsPe);
                const badgeColor =
                  res.threeTierRisk === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : res.threeTierRisk === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-[700] uppercase text-slate-400">Wells PE Score</span>
                        <span className="text-[24px] font-[800] font-mono text-amber-400 tabular-nums">
                          {res.score.toFixed(1)}
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {res.threeTierRisk} Risk (PE {res.twoTierRisk})
                      </span>
                    </div>

                    {res.percRuleOut && (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11.5px] text-emerald-300 font-semibold">
                        ✅ PERC Criteria Met: PE safely ruled out without D-dimer or CTA.
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-slate-800/80 border border-white/5 text-[11.5px] text-slate-200 leading-relaxed">
                      <strong>Next Clinical Step:</strong> {res.clinicalAction}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* =========================================================
              3. CHA2DS2-VASc
             ========================================================= */}
          {selectedScore === 'cha2ds2_vasc' && (
            <motion.div
              key="cha2ds2_vasc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">CHA₂DS₂-VASc Score</h3>
                  <p className="text-[11.5px] text-slate-400">Atrial fibrillation stroke risk and anticoagulation threshold</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Patient Age (years)</label>
                  <input
                    type="number"
                    value={cha2ds2Vasc.age}
                    onChange={(e) => setCha2ds2Vasc((prev) => ({ ...prev, age: parseInt(e.target.value, 10) || 0 }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Sex Assigned at Birth</label>
                  <div className="flex rounded-lg border border-white/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setCha2ds2Vasc((prev) => ({ ...prev, sex: 'M' }))}
                      className={`flex-1 py-1.5 text-[12px] font-bold ${
                        cha2ds2Vasc.sex === 'M' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Male (0 pt)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCha2ds2Vasc((prev) => ({ ...prev, sex: 'F' }))}
                      className={`flex-1 py-1.5 text-[12px] font-bold ${
                        cha2ds2Vasc.sex === 'F' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Female (+1 pt)
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'chf', label: 'Congestive Heart Failure / LV dysfunction (EF ≤ 40%)', points: '+1' },
                  { key: 'hypertension', label: 'Hypertension (resting BP >140/90 or on antihypertensives)', points: '+1' },
                  { key: 'diabetes', label: 'Diabetes Mellitus (oral agents or insulin)', points: '+1' },
                  { key: 'strokeOrTiaOrVte', label: 'Prior Stroke, TIA, or Thromboembolism', points: '+2' },
                  { key: 'vascularDisease', label: 'Vascular Disease (prior MI, peripheral artery disease, aortic plaque)', points: '+1' },
                ].map((crit) => (
                  <label
                    key={crit.key}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      cha2ds2Vasc[crit.key as keyof Cha2ds2VascInput]
                        ? 'bg-blue-600/15 border-blue-500/40 text-blue-200'
                        : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={!!cha2ds2Vasc[crit.key as keyof Cha2ds2VascInput]}
                        onChange={(e) =>
                          setCha2ds2Vasc((prev) => ({ ...prev, [crit.key]: e.target.checked }))
                        }
                        className="w-4 h-4 rounded accent-blue-600"
                      />
                      <span className="text-[12px]">{crit.label}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 ml-2 shrink-0">
                      {crit.points}
                    </span>
                  </label>
                ))}
              </div>

              {(() => {
                const res = calculateCha2ds2Vasc(cha2ds2Vasc);
                const badgeColor =
                  res.riskLevel === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : res.riskLevel === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-[700] uppercase text-slate-400">Score</span>
                        <span className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                          {res.score}
                        </span>
                        <span className="text-[12px] text-slate-400">
                          (Stroke risk: <strong className="text-white">{res.annualStrokeRiskPercent}%/year</strong>)
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {res.riskLevel} Risk
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                      💡 <strong>Guideline Recommendation:</strong> {res.anticoagulationRecommendation}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* =========================================================
              4. CURB-65 & PSI
             ========================================================= */}
          {selectedScore === 'curb_psi' && (
            <motion.div
              key="curb_psi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Community-Acquired Pneumonia Triage</h3>
                  <p className="text-[11.5px] text-slate-400">Outpatient vs Inpatient vs ICU disposition stratification</p>
                </div>
                <div className="flex rounded-lg border border-white/10 p-0.5 bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setPneumoniaTool('curb65')}
                    className={`px-3 py-1 rounded text-[11px] font-bold ${
                      pneumoniaTool === 'curb65' ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    CURB-65
                  </button>
                  <button
                    type="button"
                    onClick={() => setPneumoniaTool('psi')}
                    className={`px-3 py-1 rounded text-[11px] font-bold ${
                      pneumoniaTool === 'psi' ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    PSI (PORT)
                  </button>
                </div>
              </div>

              {pneumoniaTool === 'curb65' ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {[
                      { key: 'confusion', label: 'C - Confusion (disorientation to person, place, or time)', points: '+1' },
                      { key: 'bunGt19', label: 'U - BUN > 19 mg/dL (>7 mmol/L)', points: '+1' },
                      { key: 'rrGte30', label: 'R - Respiratory Rate ≥ 30 breaths/min', points: '+1' },
                      { key: 'bpLow', label: 'B - Blood Pressure low (SBP < 90 mmHg or DBP ≤ 60 mmHg)', points: '+1' },
                      { key: 'ageGte65', label: '65 - Age ≥ 65 years', points: '+1' },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                          curb65[item.key as keyof Curb65Input]
                            ? 'bg-blue-600/15 border-blue-500/40 text-blue-200'
                            : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={!!curb65[item.key as keyof Curb65Input]}
                            onChange={(e) => setCurb65((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                            className="w-4 h-4 rounded accent-blue-600"
                          />
                          <span className="text-[12px]">{item.label}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 ml-2 shrink-0">
                          {item.points}
                        </span>
                      </label>
                    ))}
                  </div>

                  {(() => {
                    const res = calculateCurb65(curb65);
                    const badgeColor =
                      res.score >= 3
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : res.score === 2
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-[700] uppercase text-slate-400">CURB-65 Score</span>
                            <span className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                              {res.score}
                            </span>
                            <span className="text-[12px] text-slate-400">
                              (30-day mortality: <strong className="text-white">{res.mortalityPercent}</strong>)
                            </span>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                            {res.triageGroup}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                          💡 <strong>Triage Recommendation:</strong> {res.recommendation}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Patient Age</label>
                      <input
                        type="number"
                        value={psi.age}
                        onChange={(e) => setPsi((prev) => ({ ...prev, age: parseInt(e.target.value, 10) || 0 }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Sex</label>
                      <select
                        value={psi.sex}
                        onChange={(e) => setPsi((prev) => ({ ...prev, sex: e.target.value as 'M' | 'F' }))}
                        className={inputClass}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female (-10 pts)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {[
                      { key: 'nursingHomeResident', label: 'Nursing home resident (+10)' },
                      { key: 'neoplasticDisease', label: 'Neoplastic disease (+30)' },
                      { key: 'liverDisease', label: 'Liver disease (+20)' },
                      { key: 'chf', label: 'Congestive heart failure (+10)' },
                      { key: 'cerebrovascularDisease', label: 'Cerebrovascular disease (+10)' },
                      { key: 'renalDisease', label: 'Renal disease (+10)' },
                      { key: 'alteredMentalStatus', label: 'Altered mental status (+20)' },
                      { key: 'rrGte30', label: 'RR ≥ 30 breaths/min (+20)' },
                      { key: 'sbpLt90', label: 'SBP < 90 mmHg (+20)' },
                      { key: 'tempAbnormal', label: 'Temp <35°C or ≥40°C (+15)' },
                      { key: 'pulseGte125', label: 'Pulse ≥ 125 bpm (+10)' },
                      { key: 'arterialPhLt735', label: 'Arterial pH < 7.35 (+30)' },
                      { key: 'bunGte30', label: 'BUN ≥ 30 mg/dL (+20)' },
                      { key: 'sodiumLt130', label: 'Sodium < 130 mEq/L (+20)' },
                      { key: 'glucoseGte250', label: 'Glucose ≥ 250 mg/dL (+10)' },
                      { key: 'hematocritLt30', label: 'Hematocrit < 30% (+10)' },
                      { key: 'pao2Lt60orSpo2Lt90', label: 'PaO2 < 60 mmHg or SpO2 < 90% (+10)' },
                      { key: 'pleuralEffusion', label: 'Pleural effusion (+10)' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!psi[item.key as keyof PsiInput]}
                          onChange={(e) => setPsi((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                          className="w-3.5 h-3.5 rounded accent-blue-600"
                        />
                        <span className="text-slate-300">{item.label}</span>
                      </label>
                    ))}
                  </div>

                  {(() => {
                    const res = calculatePsi(psi);
                    const badgeColor =
                      res.classTier === 'Class V' || res.classTier === 'Class IV'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : res.classTier === 'Class III'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-[700] uppercase text-slate-400">PSI Score</span>
                            <span className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                              {res.score}
                            </span>
                            <span className="text-[12px] text-slate-400">
                              (Mortality: <strong className="text-white">{res.mortalityPercent}</strong>)
                            </span>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                            {res.classTier}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                          💡 <strong>Triage Recommendation:</strong> {res.triageRecommendation}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          )}

          {/* =========================================================
              5. qSOFA & SOFA
             ========================================================= */}
          {selectedScore === 'sepsis' && (
            <motion.div
              key="sepsis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Sepsis-3 Severity Stratification</h3>
                  <p className="text-[11.5px] text-slate-400">Bedside screen (qSOFA) and multi-organ trajectory (SOFA)</p>
                </div>
                <div className="flex rounded-lg border border-white/10 p-0.5 bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setSepsisTool('qsofa')}
                    className={`px-3 py-1 rounded text-[11px] font-bold ${
                      sepsisTool === 'qsofa' ? 'bg-rose-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    qSOFA
                  </button>
                  <button
                    type="button"
                    onClick={() => setSepsisTool('sofa')}
                    className={`px-3 py-1 rounded text-[11px] font-bold ${
                      sepsisTool === 'sofa' ? 'bg-rose-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Full SOFA
                  </button>
                </div>
              </div>

              {sepsisTool === 'qsofa' ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {[
                      { key: 'alteredMentalStatus', label: 'Altered mental status (Glasgow Coma Scale < 15)', points: '+1' },
                      { key: 'rrGte22', label: 'Respiratory Rate ≥ 22 breaths/min (tachypnea)', points: '+1' },
                      { key: 'sbpLte100', label: 'Systolic Blood Pressure ≤ 100 mmHg (hypotension)', points: '+1' },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                          qsofa[item.key as keyof QsofaInput]
                            ? 'bg-rose-600/15 border-rose-500/40 text-rose-200'
                            : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={!!qsofa[item.key as keyof QsofaInput]}
                            onChange={(e) => setQsofa((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                            className="w-4 h-4 rounded accent-rose-600"
                          />
                          <span className="text-[12.5px]">{item.label}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 ml-2 shrink-0">
                          {item.points}
                        </span>
                      </label>
                    ))}
                  </div>

                  {(() => {
                    const res = calculateQsofa(qsofa);
                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-[700] uppercase text-slate-400">qSOFA Score</span>
                            <span className="text-[26px] font-[800] font-mono text-rose-400 tabular-nums">
                              {res.score} / 3
                            </span>
                          </div>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                              res.isHighRisk
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            }`}
                          >
                            {res.isHighRisk ? 'High Sepsis Risk (≥2)' : 'Low Risk (<2)'}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-[11.5px] text-rose-200 leading-relaxed">
                          {res.clinicalAction}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>PaO₂/FiO₂ Ratio</label>
                      <input
                        type="number"
                        value={sofa.pao2Fio2}
                        onChange={(e) => setSofa((prev) => ({ ...prev, pao2Fio2: parseFloat(e.target.value) || 0 }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Platelets (×10³/µL)</label>
                      <input
                        type="number"
                        value={sofa.platelets}
                        onChange={(e) => setSofa((prev) => ({ ...prev, platelets: parseFloat(e.target.value) || 0 }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Total Bilirubin (mg/dL)</label>
                      <input
                        type="number"
                        value={sofa.bilirubin}
                        onChange={(e) => setSofa((prev) => ({ ...prev, bilirubin: parseFloat(e.target.value) || 0 }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Mean Arterial Pressure (MAP, mmHg)</label>
                      <input
                        type="number"
                        value={sofa.cardiovascular.map}
                        onChange={(e) =>
                          setSofa((prev) => ({
                            ...prev,
                            cardiovascular: { ...prev.cardiovascular, map: parseFloat(e.target.value) || 0 },
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Vasopressor Support (Cardiovascular SOFA)</label>
                      <select
                        value={sofaVasopressor}
                        onChange={(e) => handleVasopressorChange(e.target.value)}
                        className={inputClass}
                      >
                        <option value="none">No vasopressors (MAP only)</option>
                        <option value="dopamine_low">Dopamine ≤ 5 mcg/kg/min (+2 pts)</option>
                        <option value="dobutamine">Dobutamine any dose (+2 pts)</option>
                        <option value="dopamine_mid">Dopamine 5.1 - 15 mcg/kg/min (+3 pts)</option>
                        <option value="epi_norepi_low">Norepi / Epi ≤ 0.1 mcg/kg/min (+3 pts)</option>
                        <option value="dopamine_high">Dopamine &gt; 15 mcg/kg/min (+4 pts)</option>
                        <option value="epi_norepi_high">Norepi / Epi &gt; 0.1 mcg/kg/min (+4 pts)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Glasgow Coma Scale (GCS)</label>
                      <input
                        type="number"
                        min="3"
                        max="15"
                        value={sofa.gcs}
                        onChange={(e) => setSofa((prev) => ({ ...prev, gcs: parseInt(e.target.value, 10) || 15 }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Creatinine (mg/dL)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={sofa.creatinine}
                        onChange={(e) => setSofa((prev) => ({ ...prev, creatinine: parseFloat(e.target.value) || 0 }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <label className="flex items-center gap-2 text-[12px] text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sofa.mechanicallyVentilated}
                        onChange={(e) => setSofa((prev) => ({ ...prev, mechanicallyVentilated: e.target.checked }))}
                        className="w-4 h-4 rounded accent-rose-600"
                      />
                      <span>Patient is on Mechanical Ventilation / CPAP</span>
                    </label>
                  </div>

                  {(() => {
                    const res = calculateSofa(sofa);
                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-[700] uppercase text-slate-400">Total SOFA Score</span>
                            <span className="text-[26px] font-[800] font-mono text-rose-400 tabular-nums">
                              {res.totalScore} / 24
                            </span>
                            <span className="text-[12px] text-slate-400">
                              (Estimated mortality: <strong className="text-white">{res.mortalityEstimate}</strong>)
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10.5px]">
                          <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                            <div className="text-slate-400">Resp</div>
                            <div className="text-[14px] font-bold text-white">{res.respirationScore}</div>
                          </div>
                          <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                            <div className="text-slate-400">Coag</div>
                            <div className="text-[14px] font-bold text-white">{res.coagulationScore}</div>
                          </div>
                          <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                            <div className="text-slate-400">Liver</div>
                            <div className="text-[14px] font-bold text-white">{res.liverScore}</div>
                          </div>
                          <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                            <div className="text-slate-400">CV</div>
                            <div className="text-[14px] font-bold text-white">{res.cardiovascularScore}</div>
                          </div>
                          <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                            <div className="text-slate-400">CNS</div>
                            <div className="text-[14px] font-bold text-white">{res.cnsScore}</div>
                          </div>
                          <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                            <div className="text-slate-400">Renal</div>
                            <div className="text-[14px] font-bold text-white">{res.renalScore}</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-800/80 text-[11.5px] text-slate-300 leading-relaxed">
                          📌 {res.sepsisSignificance}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          )}

          {/* =========================================================
              6. GCS & GCS-P
             ========================================================= */}
          {selectedScore === 'gcs' && (
            <motion.div
              key="gcs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Glasgow Coma Scale & GCS-Pupils (GCS-P)</h3>
                  <p className="text-[11.5px] text-slate-400">Neurological assessment and airway protection requirement</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Eye Opening */}
                <div>
                  <label className={labelClass}>Eye Opening (E)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { val: 4, label: 'Spontaneous (4)' },
                      { val: 3, label: 'To Sound (3)' },
                      { val: 2, label: 'To Pressure (2)' },
                      { val: 1, label: 'None (1)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setGcsInput((prev) => ({ ...prev, eyeOpening: item.val as any }))}
                        className={`p-2 rounded-lg border text-[11.5px] font-bold text-center transition-colors ${
                          gcsInput.eyeOpening === item.val
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verbal Response */}
                <div>
                  <label className={labelClass}>Verbal Response (V)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { val: 5, label: 'Oriented (5)' },
                      { val: 4, label: 'Confused (4)' },
                      { val: 3, label: 'Inappropriate (3)' },
                      { val: 2, label: 'Incomprehensible (2)' },
                      { val: 1, label: 'None (1)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setGcsInput((prev) => ({ ...prev, verbalResponse: item.val as any }))}
                        className={`p-2 rounded-lg border text-[11px] font-bold text-center transition-colors ${
                          gcsInput.verbalResponse === item.val
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Motor Response */}
                <div>
                  <label className={labelClass}>Motor Response (M)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { val: 6, label: 'Obeys Commands (6)' },
                      { val: 5, label: 'Localising Pain (5)' },
                      { val: 4, label: 'Normal Flexion / Withdrawal (4)' },
                      { val: 3, label: 'Abnormal Flexion / Decorticate (3)' },
                      { val: 2, label: 'Extension / Decerebrate (2)' },
                      { val: 1, label: 'None (1)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setGcsInput((prev) => ({ ...prev, motorResponse: item.val as any }))}
                        className={`p-2 rounded-lg border text-[11px] font-bold text-center transition-colors ${
                          gcsInput.motorResponse === item.val
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pupil Reactivity Score (PRS) */}
                <div className="pt-2 border-t border-white/5">
                  <label className={labelClass}>Pupil Reactivity Score (PRS)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { val: 0, label: 'Both pupils react to light (PRS 0)' },
                      { val: 1, label: 'One pupil unreactive (PRS 1)' },
                      { val: 2, label: 'Neither pupil reacts (PRS 2)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setGcsInput((prev) => ({ ...prev, unreactivePupils: item.val as any }))}
                        className={`p-2 rounded-lg border text-[11px] font-bold text-center transition-colors ${
                          gcsInput.unreactivePupils === item.val
                            ? 'bg-amber-600 border-amber-500 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {(() => {
                const res = calculateGcs(gcsInput);
                const badgeColor =
                  res.severity === 'Severe'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : res.severity === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">GCS (E+V+M)</div>
                          <div className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                            {res.gcs} <span className="text-[13px] text-slate-400 font-normal">/ 15</span>
                          </div>
                        </div>
                        <div className="border-l border-white/10 pl-3">
                          <div className="text-[10px] uppercase font-bold text-slate-400">GCS-P (GCS - PRS)</div>
                          <div className="text-[26px] font-[800] font-mono text-amber-400 tabular-nums">
                            {res.gcsp}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {res.severity} Brain Injury
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                      💡 <strong>Airway Protection Guidance:</strong> {res.airwayImplication}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* =========================================================
              7. NIHSS & THROMBOLYSIS
             ========================================================= */}
          {selectedScore === 'nihss' && (
            <motion.div
              key="nihss"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">NIHSS & Thrombolysis (tPA/TNK) Checklist</h3>
                  <p className="text-[11.5px] text-slate-400">National Institutes of Health Stroke Scale and acute IVT eligibility</p>
                </div>
              </div>

              {/* 11 Items Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className={labelClass}>1a. Level of Consciousness</label>
                    <select
                      value={nihssInput.loc1a}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, loc1a: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Alert, keenly responsive</option>
                      <option value="1">1 - Not alert, arousable by minor stimulation</option>
                      <option value="2">2 - Not alert, requires repeated stimulation</option>
                      <option value="3">3 - Comatose, motor responses only</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>1b. LOC Questions (Month, Age)</label>
                    <select
                      value={nihssInput.loc1bQuestions}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, loc1bQuestions: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Answers both correctly</option>
                      <option value="1">1 - Answers one correctly</option>
                      <option value="2">2 - Answers neither correctly</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>1c. LOC Commands (Open/Close Eyes, Grip)</label>
                    <select
                      value={nihssInput.loc1cCommands}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, loc1cCommands: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Performs both tasks correctly</option>
                      <option value="1">1 - Performs one task correctly</option>
                      <option value="2">2 - Performs neither task correctly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className={labelClass}>2. Best Gaze</label>
                    <select
                      value={nihssInput.bestGaze}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, bestGaze: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Normal</option>
                      <option value="1">1 - Partial gaze palsy</option>
                      <option value="2">2 - Forced deviation / total palsy</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>3. Visual Fields</label>
                    <select
                      value={nihssInput.visualFields}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, visualFields: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No visual loss</option>
                      <option value="1">1 - Partial hemianopia</option>
                      <option value="2">2 - Complete hemianopia</option>
                      <option value="3">3 - Bilateral hemianopia / cortical blindness</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>4. Facial Palsy</label>
                    <select
                      value={nihssInput.facialPalsy}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, facialPalsy: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Normal symmetrical movements</option>
                      <option value="1">1 - Minor paralysis (flattened nasolabial fold)</option>
                      <option value="2">2 - Partial paralysis (lower face)</option>
                      <option value="3">3 - Complete paralysis of one or both sides</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className={labelClass}>5a. Left Arm Drift</label>
                    <select
                      value={nihssInput.motorArmLeft}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, motorArmLeft: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No drift</option>
                      <option value="1">1 - Drift before 10s</option>
                      <option value="2">2 - Some effort against gravity</option>
                      <option value="3">3 - No effort against gravity</option>
                      <option value="4">4 - No movement</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>5b. Right Arm Drift</label>
                    <select
                      value={nihssInput.motorArmRight}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, motorArmRight: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No drift</option>
                      <option value="1">1 - Drift before 10s</option>
                      <option value="2">2 - Some effort against gravity</option>
                      <option value="3">3 - No effort against gravity</option>
                      <option value="4">4 - No movement</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>6a. Left Leg Drift</label>
                    <select
                      value={nihssInput.motorLegLeft}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, motorLegLeft: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No drift</option>
                      <option value="1">1 - Drift before 5s</option>
                      <option value="2">2 - Some effort against gravity</option>
                      <option value="3">3 - No effort against gravity</option>
                      <option value="4">4 - No movement</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>6b. Right Leg Drift</label>
                    <select
                      value={nihssInput.motorLegRight}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, motorLegRight: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No drift</option>
                      <option value="1">1 - Drift before 5s</option>
                      <option value="2">2 - Some effort against gravity</option>
                      <option value="3">3 - No effort against gravity</option>
                      <option value="4">4 - No movement</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  <div>
                    <label className={labelClass}>7. Limb Ataxia</label>
                    <select
                      value={nihssInput.limbAtaxia}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, limbAtaxia: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Absent</option>
                      <option value="1">1 - Present in 1 limb</option>
                      <option value="2">2 - Present in 2 limbs</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>8. Sensory</label>
                    <select
                      value={nihssInput.sensory}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, sensory: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Normal</option>
                      <option value="1">1 - Mild-to-moderate loss</option>
                      <option value="2">2 - Severe-to-total loss</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>9. Best Language</label>
                    <select
                      value={nihssInput.bestLanguage}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, bestLanguage: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No aphasia</option>
                      <option value="1">1 - Mild-to-moderate aphasia</option>
                      <option value="2">2 - Severe aphasia</option>
                      <option value="3">3 - Mute / global aphasia</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>10. Dysarthria</label>
                    <select
                      value={nihssInput.dysarthria}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, dysarthria: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - Normal articulation</option>
                      <option value="1">1 - Mild-to-moderate</option>
                      <option value="2">2 - Severe / unintelligible</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>11. Extinction</label>
                    <select
                      value={nihssInput.extinctionInattention}
                      onChange={(e) => setNihssInput((prev) => ({ ...prev, extinctionInattention: parseInt(e.target.value, 10) }))}
                      className={inputClass}
                    >
                      <option value="0">0 - No abnormality</option>
                      <option value="1">1 - Inattention in 1 modality</option>
                      <option value="2">2 - Profound hemi-inattention</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Thrombolysis Checklist Accordion/Panel */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-200">
                    IV Thrombolysis (Alteplase / Tenecteplase) Checklist
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Hours from Last Known Normal:</span>
                    <input
                      type="number"
                      step="0.5"
                      value={thrombolysisChecklist.timeFromLknHours}
                      onChange={(e) =>
                        setThrombolysisChecklist((prev) => ({
                          ...prev,
                          timeFromLknHours: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-16 px-2 py-1 text-[11px] glass-input text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  {[
                    { key: 'noIntracranialHemorrhage', label: 'No intracranial hemorrhage on non-contrast CT' },
                    { key: 'sbpLt185AndDbpLt110', label: 'Blood Pressure < 185/110 mmHg' },
                    { key: 'glucoseGt50', label: 'Blood Glucose > 50 mg/dL' },
                    { key: 'plateletsGte100k', label: 'Platelets ≥ 100,000 /µL' },
                    { key: 'inrLte17AndNoDoac', label: 'INR ≤ 1.7 & No DOAC in prior 48 hours' },
                    { key: 'noRecentTraumaSurgeryOrStroke', label: 'No major head trauma, stroke, or surgery <3 mo' },
                  ].map((chk) => (
                    <label key={chk.key} className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={!!thrombolysisChecklist[chk.key as keyof ThrombolysisChecklist]}
                        onChange={(e) =>
                          setThrombolysisChecklist((prev) => ({
                            ...prev,
                            [chk.key]: e.target.checked,
                          }))
                        }
                        className="w-3.5 h-3.5 rounded accent-emerald-500"
                      />
                      <span>{chk.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(() => {
                const res = calculateNihss(nihssInput, thrombolysisChecklist);
                const badgeColor =
                  res.score >= 21
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : res.score >= 16
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : res.score >= 5
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-[700] uppercase text-slate-400">NIHSS Score</span>
                        <span className="text-[26px] font-[800] font-mono text-purple-400 tabular-nums">
                          {res.score} / 42
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {res.severityTier}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-lg border text-[11.5px] leading-relaxed ${
                        res.thrombolysisEligible
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <strong>IV Thrombolysis Assessment:</strong> {res.thrombolysisRemarks}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* =========================================================
              8. MELD-Na & CHILD-PUGH
             ========================================================= */}
          {selectedScore === 'hepatic' && (
            <motion.div
              key="hepatic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Hepatic Function & Cirrhosis Scoring</h3>
                  <p className="text-[11.5px] text-slate-400">MELD-Na waitlist mortality and Child-Pugh surgical risk</p>
                </div>
                <div className="flex rounded-lg border border-white/10 p-0.5 bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setHepaticTool('meld_na')}
                    className={`px-3 py-1 rounded text-[11px] font-bold ${
                      hepaticTool === 'meld_na' ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    MELD-Na
                  </button>
                  <button
                    type="button"
                    onClick={() => setHepaticTool('child_pugh')}
                    className={`px-3 py-1 rounded text-[11px] font-bold ${
                      hepaticTool === 'child_pugh' ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Child-Pugh
                  </button>
                </div>
              </div>

              {hepaticTool === 'meld_na' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className={labelClass}>Creatinine (mg/dL)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={meldNaInput.creatinine}
                        onChange={(e) =>
                          setMeldNaInput((prev) => ({ ...prev, creatinine: parseFloat(e.target.value) || 1.0 }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Total Bilirubin (mg/dL)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={meldNaInput.bilirubin}
                        onChange={(e) =>
                          setMeldNaInput((prev) => ({ ...prev, bilirubin: parseFloat(e.target.value) || 1.0 }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>INR</label>
                      <input
                        type="number"
                        step="0.1"
                        value={meldNaInput.inr}
                        onChange={(e) => setMeldNaInput((prev) => ({ ...prev, inr: parseFloat(e.target.value) || 1.0 }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Sodium (mEq/L)</label>
                      <input
                        type="number"
                        value={meldNaInput.sodium}
                        onChange={(e) =>
                          setMeldNaInput((prev) => ({ ...prev, sodium: parseFloat(e.target.value) || 135 }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer text-[12px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={meldNaInput.onDialysisTwicePastWeek}
                      onChange={(e) =>
                        setMeldNaInput((prev) => ({ ...prev, onDialysisTwicePastWeek: e.target.checked }))
                      }
                      className="w-4 h-4 rounded accent-blue-600"
                    />
                    <span>Dialyzed ≥2 times in the past 7 days (Creatinine bounded to 4.0 mg/dL)</span>
                  </label>

                  {(() => {
                    const res = calculateMeldNa(meldNaInput);
                    const badgeColor =
                      res.meldNa >= 30
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : res.meldNa >= 20
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="text-[10px] uppercase font-bold text-slate-400">Original MELD</div>
                              <div className="text-[22px] font-[800] font-mono text-slate-300 tabular-nums">
                                {res.meld}
                              </div>
                            </div>
                            <div className="border-l border-white/10 pl-3">
                              <div className="text-[10px] uppercase font-bold text-slate-400">MELD-Na Score</div>
                              <div className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                                {res.meldNa}
                              </div>
                            </div>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                            90-Day Mortality: {res.mortality90Day}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                          💡 <strong>Clinical Allocation:</strong> {res.allocationCategory}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>Total Bilirubin (mg/dL)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={childPughInput.bilirubin}
                        onChange={(e) =>
                          setChildPughInput((prev) => ({ ...prev, bilirubin: parseFloat(e.target.value) || 1.0 }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Albumin (g/dL)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={childPughInput.albumin}
                        onChange={(e) =>
                          setChildPughInput((prev) => ({ ...prev, albumin: parseFloat(e.target.value) || 3.5 }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>INR</label>
                      <input
                        type="number"
                        step="0.1"
                        value={childPughInput.inr}
                        onChange={(e) =>
                          setChildPughInput((prev) => ({ ...prev, inr: parseFloat(e.target.value) || 1.0 }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Ascites</label>
                      <select
                        value={childPughInput.ascites}
                        onChange={(e) =>
                          setChildPughInput((prev) => ({ ...prev, ascites: e.target.value as any }))
                        }
                        className={inputClass}
                      >
                        <option value="none">None (1 pt)</option>
                        <option value="slight_moderate">Slight / Diuretic-responsive (2 pts)</option>
                        <option value="severe_refractory">Severe / Refractory (3 pts)</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Hepatic Encephalopathy</label>
                      <select
                        value={childPughInput.encephalopathy}
                        onChange={(e) =>
                          setChildPughInput((prev) => ({ ...prev, encephalopathy: e.target.value as any }))
                        }
                        className={inputClass}
                      >
                        <option value="none">None (1 pt)</option>
                        <option value="grade_1_2">Grade I - II (mild confusion, asterixis) (2 pts)</option>
                        <option value="grade_3_4">Grade III - IV (somnolence, stupor, coma) (3 pts)</option>
                      </select>
                    </div>
                  </div>

                  {(() => {
                    const res = calculateChildPugh(childPughInput);
                    const badgeColor =
                      res.classGroup === 'Class C'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : res.classGroup === 'Class B'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-[700] uppercase text-slate-400">Child-Pugh Score</span>
                            <span className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                              {res.score} / 15
                            </span>
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                            {res.classGroup} (1-Yr Survival: {res.oneYearSurvival})
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11.5px] text-blue-200 leading-relaxed">
                          ⚠️ <strong>Perioperative Mortality Risk:</strong> {res.perioperativeMortality}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          )}

          {/* =========================================================
              9. CKD-EPI 2021
             ========================================================= */}
          {selectedScore === 'ckd_epi' && (
            <motion.div
              key="ckd_epi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">CKD-EPI 2021 (Race-Free eGFR)</h3>
                  <p className="text-[11.5px] text-slate-400">
                    Modern non-race-based estimated Glomerular Filtration Rate equation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Serum Creatinine (mg/dL)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={ckdEpiInput.creatinine}
                    onChange={(e) =>
                      setCkdEpiInput((prev) => ({ ...prev, creatinine: parseFloat(e.target.value) || 1.0 }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Age (years)</label>
                  <input
                    type="number"
                    value={ckdEpiInput.age}
                    onChange={(e) =>
                      setCkdEpiInput((prev) => ({ ...prev, age: parseInt(e.target.value, 10) || 50 }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Sex Assigned at Birth</label>
                  <div className="flex rounded-lg border border-white/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setCkdEpiInput((prev) => ({ ...prev, sex: 'M' }))}
                      className={`flex-1 py-1.5 text-[12px] font-bold ${
                        ckdEpiInput.sex === 'M' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setCkdEpiInput((prev) => ({ ...prev, sex: 'F' }))}
                      className={`flex-1 py-1.5 text-[12px] font-bold ${
                        ckdEpiInput.sex === 'F' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              {(() => {
                const res = calculateCkdEpi2021(ckdEpiInput);
                const badgeColor =
                  res.egfr < 30
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : res.egfr < 60
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-[700] uppercase text-slate-400">eGFR</span>
                        <span className="text-[28px] font-[800] font-mono text-purple-400 tabular-nums">
                          {res.egfr}
                        </span>
                        <span className="text-[12px] text-slate-400 font-normal">mL/min/1.73m²</span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        Stage {res.stage} ({res.description})
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[11.5px] text-purple-200 leading-relaxed">
                      💊 <strong>Anesthesia & Medication Stewardship:</strong> {res.dosingRecommendation}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
