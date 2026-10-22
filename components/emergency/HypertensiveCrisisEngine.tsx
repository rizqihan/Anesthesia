'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Flame,
  AlertTriangle,
  ShieldAlert,
  Activity,
  Heart,
  Droplet,
  Copy,
  Check,
  Info,
  TrendingDown,
  CheckCircle2,
  Syringe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  evaluateHypertensiveCrisis,
  calculateNicardipineInfusion,
  calculateNitroprussideInfusion,
  calculateLabetalolDosing,
} from '@/lib/emergencyProtocols';

export default function HypertensiveCrisisEngine() {
  const { language, activeCase } = useAppStore();
  const weight = parseFloat(activeCase.patientWeight) || 70;

  // Blood pressure inputs
  const [sbp, setSbp] = useState<number>(210);
  const [dbp, setDbp] = useState<number>(120);

  // Target Organ Damage flags
  const [hasAorticDissection, setHasAorticDissection] = useState<boolean>(false);
  const [organDamageFlags, setOrganDamageFlags] = useState<{
    encephalopathy: boolean;
    stroke: boolean;
    pulmonaryEdema: boolean;
    acuteCoronary: boolean;
    renalFailure: boolean;
    eclampsia: boolean;
    papilledema: boolean;
  }>({
    encephalopathy: false,
    stroke: false,
    pulmonaryEdema: false,
    acuteCoronary: false,
    renalFailure: false,
    eclampsia: false,
    papilledema: false,
  });

  // Infusion calculator sliders
  const [nicardipineDose, setNicardipineDose] = useState<number>(5);
  const [nitroprussideDose, setNitroprussideDose] = useState<number>(0.5);
  const [labetalolDose, setLabetalolDose] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const hasAnyOrganDamage =
    hasAorticDissection || Object.values(organDamageFlags).some(Boolean);

  const crisis = evaluateHypertensiveCrisis(
    sbp,
    dbp,
    hasAnyOrganDamage,
    hasAorticDissection
  );

  const nicardipine = calculateNicardipineInfusion(nicardipineDose);
  const nitroprusside = calculateNitroprussideInfusion(weight, nitroprussideDose);
  const labetalol = calculateLabetalolDosing(labetalolDose);

  const toggleOrganFlag = (key: keyof typeof organDamageFlags) => {
    setOrganDamageFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopySummary = () => {
    const summary = [
      `HYPERTENSIVE CRISIS CLINICAL ASSESSMENT`,
      `Baseline Blood Pressure: ${sbp}/${dbp} mmHg | MAP: ${crisis.map} mmHg`,
      `Classification: ${crisis.isEmergency ? 'HYPERTENSIVE EMERGENCY (ICU / IV Therapy)' : 'HYPERTENSIVE URGENCY (Oral Therapy)'}`,
      `Aortic Dissection Protocol: ${hasAorticDissection ? 'ACTIVE' : 'No'}`,
      `----------------------------------------`,
      hasAorticDissection
        ? `AORTIC DISSECTION IMMEDIATE TARGETS:
• Target SBP: ${crisis.aorticDissectionTargetSbp} within 15–20 minutes!
• Target Heart Rate: ${crisis.aorticDissectionTargetHr}
• Critical Rule: ${crisis.aorticDissectionBetaBlockerRule}`
        : `STANDARD MAP REDUCTION TARGETS:
• Hour 1 Target MAP (20–25% reduction): ${crisis.targetMapHour1Min} to ${crisis.targetMapHour1Max} mmHg
• Estimated Hour 1 SBP Target: ${crisis.targetSbpEstimatedHour1Min} to ${crisis.targetSbpEstimatedHour1Max} mmHg
• Hours 2–6 Target: ${crisis.targetHours2to6}`,
      `----------------------------------------`,
      `FIRST-LINE IV INFUSION TITRATIONS:`,
      `1. Nicardipine IV: ${nicardipine.doseMgPerHr} mg/hr (${nicardipine.rateMlPerHr} mL/hr of 0.1 mg/mL).`,
      `2. Labetalol IV: ${labetalol.bolusDoseMg} mg bolus -> Infusion ${labetalol.infusionMgPerMin} mg/min (${labetalol.rateMlPerHrNeat} mL/hr neat).`,
      `3. Sodium Nitroprusside: ${nitroprusside.doseMcgPerKgPerMin} mcg/kg/min (${nitroprusside.rateMlPerHr} mL/hr of 200 mcg/mL).`,
    ];
    navigator.clipboard.writeText(summary.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-[900] text-slate-100">
                  {language === 'en'
                    ? 'Hypertensive Crisis Titration Engine'
                    : 'Kalkulator Titrasi Krisis Hipertensi'}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-[800] border uppercase tracking-wider ${
                    crisis.isEmergency
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {crisis.isEmergency ? 'Emergency (IV)' : 'Urgency (Oral)'}
                </span>
              </div>
              <p className="text-[12px] text-slate-400">
                {language === 'en'
                  ? 'Differentiate Emergency vs Urgency, calculate safe 20–25% MAP reduction boundaries, and titrate IV infusions'
                  : 'Diferensiasi Emergensi vs Urgensi, target penurunan MAP 20-25% jam pertama, dan titrasi infus'}
              </p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopySummary}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[12px] font-[700] flex items-center gap-1.5 self-start md:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Assessment</span>
              </>
            )}
          </motion.button>
        </div>

        {/* BP Input & Baseline MAP Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-1">
            <label className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Systolic BP (mmHg)
            </label>
            <input
              type="number"
              min="80"
              max="300"
              value={sbp}
              onChange={(e) => setSbp(Number(e.target.value) || 0)}
              className="glass-input w-full px-3 py-2 text-[20px] font-mono font-[900] text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Diastolic BP (mmHg)
            </label>
            <input
              type="number"
              min="40"
              max="200"
              value={dbp}
              onChange={(e) => setDbp(Number(e.target.value) || 0)}
              className="glass-input w-full px-3 py-2 text-[20px] font-mono font-[900] text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-[700] uppercase tracking-wider text-blue-400">
              Current Baseline MAP
            </label>
            <div className="h-[46px] px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-[22px] font-mono font-[900] text-blue-400 tabular-nums">
                {crisis.map}
              </span>
              <span className="text-[11px] font-mono text-slate-500">mmHg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Organ Damage (TOD) Screener */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-[16px] font-[800] text-slate-100">
              {language === 'en'
                ? 'Target Organ Damage (TOD) Screener'
                : 'Skrining Kerusakan Organ Target'}
            </h3>
            <p className="text-[12px] text-slate-400">
              Check all acute end-organ compromise present to confirm Hypertensive Emergency
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-[800] border ${
              crisis.isEmergency
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {crisis.isEmergency ? 'Emergency Confirmed' : 'No Acute TOD (Urgency)'}
          </span>
        </div>

        {/* Special Aortic Dissection Toggle */}
        <label
          className={`p-4 rounded-xl border cursor-pointer select-none transition-all block ${
            hasAorticDissection
              ? 'bg-rose-950/40 border-rose-500 shadow-md ring-1 ring-rose-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={hasAorticDissection}
                onChange={() => setHasAorticDissection(!hasAorticDissection)}
                className="mt-1 w-4 h-4 rounded text-rose-600 bg-slate-950 border-slate-700 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-[800] text-rose-300">
                    Acute Aortic Dissection / Ruptured Thoracic Aneurysm
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 uppercase">
                    Immediate Override Protocol
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Severe tearing chest/back pain, pulse deficit, new aortic regurgitation murmur. Requires rapid reduction within 20 min (SBP &lt; 120 and HR &lt; 60 bpm) with Beta-blocker FIRST!
                </p>
              </div>
            </div>
          </div>
        </label>

        {/* Other Organ Damage Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {[
            {
              key: 'encephalopathy' as const,
              label: 'Hypertensive Encephalopathy',
              desc: 'Altered mental status, severe headache, confusion, seizures, cortical blindness',
            },
            {
              key: 'stroke' as const,
              label: 'Acute Stroke (Ischemic or ICH)',
              desc: 'Focal neurological deficit; permissive hypertension applies in acute ischemic stroke',
            },
            {
              key: 'pulmonaryEdema' as const,
              label: 'Acute Pulmonary Edema / LV Failure',
              desc: 'Severe dyspnea, orthopnea, bilateral rales, pink frothy sputum; IV Nitroglycerin preferred',
            },
            {
              key: 'acuteCoronary' as const,
              label: 'Acute Coronary Syndrome (STEMI / NSTEMI)',
              desc: 'Ischemic chest discomfort, ST changes, elevated troponin',
            },
            {
              key: 'renalFailure' as const,
              label: 'Acute Kidney Injury (Rapid Cr Rise)',
              desc: 'Oliguria, rapidly worsening creatinine, microscopic hematuria or red cell casts',
            },
            {
              key: 'eclampsia' as const,
              label: 'Preeclampsia / Eclampsia',
              desc: 'Pregnancy > 20 weeks with BP > 160/110 + proteinuria/headache; give IV Labetalol + MgSO4',
            },
            {
              key: 'papilledema' as const,
              label: 'Malignant Retinopathy (Grade 3/4)',
              desc: 'Bilateral optic disc edema (papilledema), flame hemorrhages, cotton-wool exudates',
            },
          ].map((item) => (
            <label
              key={item.key}
              className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer text-[12px] select-none transition-all ${
                organDamageFlags[item.key]
                  ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                  : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <input
                type="checkbox"
                checked={organDamageFlags[item.key]}
                onChange={() => toggleOrganFlag(item.key)}
                className="mt-0.5 w-4 h-4 rounded text-rose-600 bg-slate-950 border-slate-700 cursor-pointer"
              />
              <div>
                <div className="font-[700]">{item.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Reduction Target Box (Emergency vs Aortic Dissection vs Urgency) */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        {hasAorticDissection ? (
          /* AORTIC DISSECTION PROTOCOL DISPLAY */
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500 space-y-3">
            <div className="flex items-center gap-2 text-rose-300 font-[800] text-[15px]">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Acute Aortic Dissection Protocol Targets</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-500/40">
                <div className="text-[11px] font-[700] text-rose-400 uppercase tracking-wider">
                  Target Systolic BP (Within 20 min)
                </div>
                <div className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                  &lt; 120 <span className="text-[14px] text-slate-400 font-normal">mmHg (100–120)</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-500/40">
                <div className="text-[11px] font-[700] text-rose-400 uppercase tracking-wider">
                  Target Heart Rate
                </div>
                <div className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                  &lt; 60 <span className="text-[14px] text-slate-400 font-normal">bpm</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-black/40 text-[12px] text-rose-200 border border-rose-500/30 space-y-1">
              <div className="font-[800]">CRITICAL SEQUENCE: Beta-Blockade Before Vasodilator</div>
              <p>
                Initiate IV <strong>Esmolol</strong> (500 mcg/kg bolus over 1 min, then 50–200 mcg/kg/min) or <strong>Labetalol</strong> (20 mg bolus, titrating to HR &lt; 60 bpm) <em>FIRST</em>. Only add Nicardipine or Nitroprusside if SBP remains &gt; 120 mmHg after HR is controlled. Giving vasodilators first causes reflex tachycardia, markedly accelerating aortic tear propagation!
              </p>
            </div>
          </div>
        ) : crisis.isEmergency ? (
          /* STANDARD HYPERTENSIVE EMERGENCY (20-25% MAP REDUCTION) */
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-400" />
                <h3 className="text-[15px] font-[800] text-slate-100">
                  Standard Hypertensive Emergency 20–25% MAP Reduction Boundaries
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Current MAP: <strong className="text-slate-200">{crisis.map} mmHg</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-[700] text-blue-400 uppercase tracking-wider">
                  Hour 1 Target MAP
                </div>
                <div className="text-[24px] font-[900] font-mono text-blue-200 tabular-nums my-0.5">
                  {crisis.targetMapHour1Min}–{crisis.targetMapHour1Max} <span className="text-[13px] text-slate-400 font-normal">mmHg</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Lower MAP by maximum 20% to 25% in hour 1 to preserve cerebral/renal autoregulation.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-[700] text-cyan-400 uppercase tracking-wider">
                  Estimated Hour 1 SBP Target
                </div>
                <div className="text-[24px] font-[900] font-mono text-cyan-200 tabular-nums my-0.5">
                  ~{crisis.targetSbpEstimatedHour1Min}–{crisis.targetSbpEstimatedHour1Max} <span className="text-[13px] text-slate-400 font-normal">mmHg</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Avoid precipitous drops; titrate parenteral infusion slowly.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-[700] text-emerald-400 uppercase tracking-wider">
                  Hours 2 to 6 Target
                </div>
                <div className="text-[24px] font-[900] font-mono text-emerald-200 tabular-nums my-0.5">
                  160 / 100 <span className="text-[13px] text-slate-400 font-normal">mmHg</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  If patient is clinically stable, transition slowly toward baseline over 24–48 hours.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* HYPERTENSIVE URGENCY (NO IV THERAPY) */
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-[800] text-[14px]">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Hypertensive Urgency: Oral Therapy Recommended</span>
            </div>
            <p className="text-[12px] text-slate-300 leading-relaxed">
              No acute target organ damage identified. <strong>Rapid IV blood pressure reduction is contraindicated</strong> and may cause cerebral, myocardial, or renal hypoperfusion. Treat with oral agents (e.g., Captopril 25 mg PO, Labetalol 200 mg PO, or Amlodipine 5–10 mg PO) in an observation setting. Target gradual reduction over 24–48 hours with outpatient follow-up.
            </p>
          </div>
        )}
      </div>

      {/* First-Line Parenteral Infusion Calculators */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Syringe className="w-4 h-4 text-blue-400" />
            <h3 className="text-[16px] font-[800] text-slate-100">
              {language === 'en'
                ? 'First-Line Antihypertensive Infusion Titrators'
                : 'Kalkulator Titrasi Infus Antihipertensi'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nicardipine Calculator */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-[800] text-blue-400 uppercase tracking-wider">
                Nicardipine (Cardene)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">
                0.1 mg/mL
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                  {nicardipine.doseMgPerHr} <span className="text-[14px] text-slate-400 font-normal">mg/hr</span>
                </span>
                <span className="text-[16px] font-[800] font-mono text-blue-400 tabular-nums">
                  {nicardipine.rateMlPerHr} mL/hr
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                step="0.5"
                value={nicardipineDose}
                onChange={(e) => setNicardipineDose(Number(e.target.value))}
                className="w-full mt-2 accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2">
                <span>3 mg/hr</span>
                <span>5 mg/hr (Start)</span>
                <span>15 mg/hr (Max)</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[5, 7.5, 10, 15].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNicardipineDose(preset)}
                    className={`px-3 py-2 min-h-[44px] min-w-[44px] rounded-xl text-[12px] font-mono font-[700] border flex items-center justify-center transition-colors ${
                      nicardipineDose === preset
                        ? 'bg-blue-600/30 border-blue-500/60 text-blue-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset} mg/h
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {nicardipine.titrationAdvice} Standard preparation: 25 mg in 250 mL D5W or NS.
            </p>
          </div>

          {/* Labetalol Calculator */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-[800] text-purple-400 uppercase tracking-wider">
                Labetalol (Alpha/Beta)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300">
                1:7 Ratio IV
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                  {labetalol.infusionMgPerMin} <span className="text-[14px] text-slate-400 font-normal">mg/min</span>
                </span>
                <span className="text-[14px] font-[800] font-mono text-purple-300 tabular-nums">
                  {labetalol.infusionMgPerHr} mg/hr
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={labetalolDose}
                onChange={(e) => setLabetalolDose(Number(e.target.value))}
                className="w-full mt-2 accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2">
                <span>0.5 mg/min</span>
                <span>2 mg/min (Std)</span>
                <span>8 mg/min (Max)</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[1, 2, 4, 8].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setLabetalolDose(preset)}
                    className={`px-3 py-2 min-h-[44px] min-w-[44px] rounded-xl text-[12px] font-mono font-[700] border flex items-center justify-center transition-colors ${
                      labetalolDose === preset
                        ? 'bg-purple-600/30 border-purple-500/60 text-purple-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset} mg/min
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <div>• Initial Bolus: <strong className="text-slate-200">20 mg IV over 2 min</strong></div>
              <div>• Neat (5 mg/mL): <strong className="text-purple-300 font-mono">{labetalol.rateMlPerHrNeat} mL/hr</strong></div>
              <div>• Dilute (1 mg/mL): <strong className="text-purple-300 font-mono">{labetalol.rateMlPerHrDilute} mL/hr</strong></div>
              <div>• Cumulative max 300 mg. Avoid in severe asthma or heart block.</div>
            </div>
          </div>

          {/* Sodium Nitroprusside Calculator */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-[800] text-amber-400 uppercase tracking-wider">
                Nitroprusside (Nipride)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300">
                200 mcg/mL
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                  {nitroprusside.doseMcgPerKgPerMin} <span className="text-[12px] text-slate-400 font-normal">mcg/kg/min</span>
                </span>
                <div className="text-right">
                  <span className="text-[16px] font-[800] font-mono text-amber-400 tabular-nums">
                    {nitroprusside.rateMlPerHr} mL/hr
                  </span>
                  <div className="text-[10px] font-mono text-slate-500">for {weight} kg</div>
                </div>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={nitroprussideDose}
                onChange={(e) => setNitroprussideDose(Number(e.target.value))}
                className="w-full mt-2 accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2">
                <span>0.2</span>
                <span>0.5 (Start)</span>
                <span>2.0 (Cyanide Alert)</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[0.3, 0.5, 1.0, 2.0].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNitroprussideDose(preset)}
                    className={`px-3 py-2 min-h-[44px] min-w-[44px] rounded-xl text-[12px] font-mono font-[700] border flex items-center justify-center transition-colors ${
                      nitroprussideDose === preset
                        ? 'bg-amber-600/30 border-amber-500/60 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset} mcg/kg/min
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {nitroprusside.warningNotice} Concentration: 50 mg in 250 mL D5W. Arterial line required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
