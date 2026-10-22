'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Activity,
  AlertTriangle,
  Flame,
  Droplet,
  HeartPulse,
  Save,
  Check,
  Copy,
  Info,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  analyzeAbg,
  calculateCorrectedSodium,
  calculateFreeWaterDeficit,
  calculatePotassiumRepletion,
  AbgInput,
  BodyWaterSexCategory,
} from '@/lib/labFormulas';

const inputClass = "glass-input w-full px-3 py-2 text-[12.5px] font-[500]";
const labelClass = "block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1";

export default function DiagnosticLabTab() {
  const { language, patientLabs, updatePatientLabs, activeCase } = useAppStore();
  const [activeSubTab, setActiveSubTab] = useState<'abg' | 'electrolytes'>('abg');
  const [electrolyteEngine, setElectrolyteEngine] = useState<'corr_na' | 'free_water' | 'k_repletion'>('corr_na');

  const [copied, setCopied] = useState(false);
  const [syncedFeedback, setSyncedFeedback] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ==========================================
  // 1. ABG STATE
  // ==========================================
  const [abgPh, setAbgPh] = useState('7.32');
  const [abgPaco2, setAbgPaco2] = useState('28');
  const [abgHco3, setAbgHco3] = useState(patientLabs.bicarbonate || '14');
  const [abgNa, setAbgNa] = useState(patientLabs.sodium || '138');
  const [abgCl, setAbgCl] = useState(patientLabs.chloride || '102');
  const [abgAlbumin, setAbgAlbumin] = useState(patientLabs.albumin || '4.0');
  const [abgPao2, setAbgPao2] = useState('85');
  const [abgFio2, setAbgFio2] = useState('21');

  // Save current lab fields back to store
  const handleSaveLabsToProfile = () => {
    const updates: Parameters<typeof updatePatientLabs>[0] = {};
    if (activeSubTab === 'abg') {
      if (abgNa) updates.sodium = abgNa;
      if (abgCl) updates.chloride = abgCl;
      if (abgHco3) updates.bicarbonate = abgHco3;
      if (abgAlbumin) updates.albumin = abgAlbumin;
    } else {
      if (electrolyteEngine === 'corr_na') {
        if (corrNaMeas) updates.sodium = corrNaMeas;
        if (corrNaGlucose) updates.glucose = corrNaGlucose;
      } else if (electrolyteEngine === 'free_water') {
        if (fwdSodium) updates.sodium = fwdSodium;
      } else if (electrolyteEngine === 'k_repletion') {
        if (kCurrent) updates.potassium = kCurrent;
      }
    }
    updatePatientLabs(updates);
    setSyncedFeedback(true);
    setTimeout(() => setSyncedFeedback(false), 2000);
  };

  // ==========================================
  // 2. ELECTROLYTE STATES
  // ==========================================
  // Hyperglycemia-corrected Na
  const [corrNaMeas, setCorrNaMeas] = useState(patientLabs.sodium || '128');
  const [corrNaGlucose, setCorrNaGlucose] = useState(patientLabs.glucose || '550');

  // Free Water Deficit
  const [fwdWeight, setFwdWeight] = useState(activeCase.patientWeight || '70');
  const [fwdSodium, setFwdSodium] = useState(patientLabs.sodium || '158');
  const [fwdCategory, setFwdCategory] = useState<BodyWaterSexCategory>(
    activeCase.patientSex === 'F' ? 'adult_female' : 'adult_male'
  );

  // Potassium Repletion
  const [kCurrent, setKCurrent] = useState(patientLabs.potassium || '3.1');
  const [kTarget, setKTarget] = useState('4.0');
  const [kRenalFailure, setKRenalFailure] = useState(false);

  // Calculate current ABG
  const parsedPh = parseFloat(abgPh) || 7.4;
  const parsedPaco2 = parseFloat(abgPaco2) || 40;
  const parsedHco3 = parseFloat(abgHco3) || 24;
  const parsedNa = abgNa ? parseFloat(abgNa) : undefined;
  const parsedCl = abgCl ? parseFloat(abgCl) : undefined;
  const parsedAlb = abgAlbumin ? parseFloat(abgAlbumin) : undefined;
  const parsedPao2 = abgPao2 ? parseFloat(abgPao2) : undefined;
  const parsedFio2 = abgFio2 ? parseFloat(abgFio2) : undefined;

  const abgResult = analyzeAbg({
    ph: parsedPh,
    paco2: parsedPaco2,
    hco3: parsedHco3,
    sodium: parsedNa,
    chloride: parsedCl,
    albumin: parsedAlb,
    pao2: parsedPao2,
    fio2: parsedFio2,
  });

  return (
    <div className="space-y-5">
      {/* Top Header Switcher: ABG Analyzer vs Electrolyte Engines */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pb-1">
        <div className="grid grid-cols-2 rounded-xl p-1 bg-white/[0.03] border border-white/10 gap-1">
          <button
            type="button"
            onClick={() => setActiveSubTab('abg')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 ${
              activeSubTab === 'abg'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate hidden sm:inline">4-Step ABG Analyzer</span>
            <span className="truncate sm:hidden">4-Step ABG</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('electrolytes')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 ${
              activeSubTab === 'electrolytes'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplet className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate hidden sm:inline">Electrolyte Safety Engines</span>
            <span className="truncate sm:hidden">Electrolytes</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSaveLabsToProfile}
          className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 shrink-0"
          title="Save entered electrolytes to patient store"
        >
          {syncedFeedback ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Saved to Patient Profile</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-blue-400" />
              <span>Save Labs</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* =========================================================
            SUBTAB 1: 4-STEP ABG ANALYZER
           ========================================================= */}
        {activeSubTab === 'abg' && (
          <motion.div
            key="abg_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="glass-card-static p-5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">Arterial Blood Gas (ABG) Interpreter</h3>
                  <p className="text-[11.5px] text-slate-400">
                    Step-by-step disturbance classification, Winter&apos;s formula, and Delta-Delta ratio
                  </p>
                </div>
              </div>

              {/* Lab Inputs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>pH (7.35 - 7.45)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={abgPh}
                    onChange={(e) => setAbgPh(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 7.32"
                  />
                </div>
                <div>
                  <label className={labelClass}>PaCO₂ (mmHg) (35 - 45)</label>
                  <input
                    type="number"
                    value={abgPaco2}
                    onChange={(e) => setAbgPaco2(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 28"
                  />
                </div>
                <div>
                  <label className={labelClass}>HCO₃⁻ (mEq/L) (22 - 26)</label>
                  <input
                    type="number"
                    value={abgHco3}
                    onChange={(e) => setAbgHco3(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 14"
                  />
                </div>
                <div>
                  <label className={labelClass}>Na⁺ (mEq/L)</label>
                  <input
                    type="number"
                    value={abgNa}
                    onChange={(e) => setAbgNa(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 138"
                  />
                </div>
                <div>
                  <label className={labelClass}>Cl⁻ (mEq/L)</label>
                  <input
                    type="number"
                    value={abgCl}
                    onChange={(e) => setAbgCl(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 102"
                  />
                </div>
                <div>
                  <label className={labelClass}>Albumin (g/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={abgAlbumin}
                    onChange={(e) => setAbgAlbumin(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 4.0"
                  />
                </div>
              </div>

              {/* Optional Oxygenation Bar */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <div>
                  <label className={labelClass}>PaO₂ (mmHg, optional)</label>
                  <input
                    type="number"
                    value={abgPao2}
                    onChange={(e) => setAbgPao2(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 85"
                  />
                </div>
                <div>
                  <label className={labelClass}>FiO₂ (%, optional)</label>
                  <input
                    type="number"
                    value={abgFio2}
                    onChange={(e) => setAbgFio2(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 21"
                  />
                </div>
              </div>

              {/* Visual 4-Step Breakdown Cards */}
              <div className="space-y-3 pt-2">
                {/* Step 1 & 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step 1: Acid-Base Status
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[15px] font-[800] ${
                          abgResult.step1PhStatus === 'Acidemia'
                            ? 'text-rose-400'
                            : abgResult.step1PhStatus === 'Alkalemia'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {abgResult.step1PhStatus}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        (pH: {parsedPh})
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step 2: Primary Disturbance
                    </div>
                    <div className="text-[14px] font-[800] text-blue-300">
                      {abgResult.step2PrimaryDisorder}
                    </div>
                  </div>
                </div>

                {/* Step 3: Compensation */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step 3: Secondary Compensation Assessment
                    </div>
                    <span
                      className={`text-[10.5px] font-bold px-2 py-0.5 rounded ${
                        abgResult.step3Compensation.isCompensated
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {abgResult.step3Compensation.isCompensated ? 'Appropriately Compensated' : 'Uncompensated / Mixed'}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-slate-300">
                    {abgResult.step3Compensation.expectedValueText}
                  </div>
                  {abgResult.step3Compensation.concomitantDisorder && (
                    <div className="text-[12px] font-semibold text-rose-300 pt-0.5">
                      🚨 {abgResult.step3Compensation.concomitantDisorder}
                    </div>
                  )}
                </div>

                {/* Step 4: Anion Gap and Delta-Delta Ratio */}
                {abgResult.step4AnionGap && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Step 4: Anion Gap & Delta-Delta Ratio
                      </div>
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded ${
                          abgResult.step4AnionGap.isHighAnionGap
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {abgResult.step4AnionGap.isHighAnionGap ? 'High Anion Gap Acidosis' : 'Normal Anion Gap'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-slate-400">Raw Anion Gap</div>
                        <div className="text-[16px] font-[800] text-white">
                          {abgResult.step4AnionGap.rawAnionGap}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-slate-400">Albumin-Corrected AG</div>
                        <div className="text-[16px] font-[800] text-blue-400">
                          {abgResult.step4AnionGap.correctedAnionGap ?? 'N/A'}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-slate-400">Delta Gap (ΔAG)</div>
                        <div className="text-[16px] font-[800] text-white">
                          {abgResult.step4AnionGap.deltaGap ?? 'N/A'}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-slate-400">Δ/Δ Ratio</div>
                        <div className="text-[16px] font-[800] text-purple-400">
                          {abgResult.step4AnionGap.deltaDeltaRatio ?? 'N/A'}
                        </div>
                      </div>
                    </div>

                    {abgResult.step4AnionGap.deltaDeltaInterpretation && (
                      <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[11.5px] text-purple-200 leading-relaxed">
                        🧬 <strong>Anion Gap / Delta-Delta Interpretation:</strong> {abgResult.step4AnionGap.deltaDeltaInterpretation}
                      </div>
                    )}
                  </div>
                )}

                {/* Oxygenation P/F Ratio */}
                {abgResult.pfRatio && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-[12px]">
                    <span className="text-slate-300">
                      PaO₂/FiO₂ Ratio: <strong className="text-blue-400 font-mono">{abgResult.pfRatio.ratio}</strong>
                    </span>
                    <span className="font-semibold text-slate-200">
                      {abgResult.pfRatio.ardsCategory}
                    </span>
                  </div>
                )}

                {/* Overall Diagnostic Summary Banner */}
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      Final Synthesized Diagnosis
                    </div>
                    <div className="text-[13.5px] font-[800] text-white mt-0.5">
                      {abgResult.summaryDiagnosis}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`ABG Interpretation: ${abgResult.summaryDiagnosis}`)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                    title="Copy interpretation"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            SUBTAB 2: ELECTROLYTE ENGINES
           ========================================================= */}
        {activeSubTab === 'electrolytes' && (
          <motion.div
            key="electrolytes_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Engine Sub-selector */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setElectrolyteEngine('corr_na')}
                className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all min-w-0 ${
                  electrolyteEngine === 'corr_na'
                    ? 'bg-blue-600/20 border-blue-500/50 text-white font-bold'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400'
                }`}
              >
                <div className="text-[11px] sm:text-[12px] truncate">Corrected Na</div>
                <div className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5 truncate">Katz & Hillier</div>
              </button>
              <button
                type="button"
                onClick={() => setElectrolyteEngine('free_water')}
                className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all min-w-0 ${
                  electrolyteEngine === 'free_water'
                    ? 'bg-blue-600/20 border-blue-500/50 text-white font-bold'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400'
                }`}
              >
                <div className="text-[11px] sm:text-[12px] truncate">Free Water</div>
                <div className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5 truncate">Hypernatremia</div>
              </button>
              <button
                type="button"
                onClick={() => setElectrolyteEngine('k_repletion')}
                className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all min-w-0 ${
                  electrolyteEngine === 'k_repletion'
                    ? 'bg-blue-600/20 border-blue-500/50 text-white font-bold'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400'
                }`}
              >
                <div className="text-[11px] sm:text-[12px] truncate">Potassium</div>
                <div className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5 truncate">IV Limits</div>
              </button>
            </div>

            <div className="glass-card-static p-5 border border-white/10 rounded-2xl">
              {/* 1. Corrected Sodium */}
              {electrolyteEngine === 'corr_na' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[16px] font-[800] text-slate-100">
                      Hyperglycemia-Corrected Sodium
                    </h3>
                    <p className="text-[11.5px] text-slate-400">
                      Corrects for osmotic fluid shift in diabetic ketoacidosis (DKA) and hyperosmolar hyperglycemic state (HHS)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Measured Serum Sodium (mEq/L)</label>
                      <input
                        type="number"
                        value={corrNaMeas}
                        onChange={(e) => setCorrNaMeas(e.target.value)}
                        className={inputClass}
                        placeholder="e.g. 128"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Serum Glucose (mg/dL)</label>
                      <input
                        type="number"
                        value={corrNaGlucose}
                        onChange={(e) => setCorrNaGlucose(e.target.value)}
                        className={inputClass}
                        placeholder="e.g. 550"
                      />
                    </div>
                  </div>

                  {(() => {
                    const mNa = parseFloat(corrNaMeas) || 135;
                    const glu = parseFloat(corrNaGlucose) || 100;
                    const res = calculateCorrectedSodium(mNa, glu);

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Hillier Formula (Standard)</div>
                            <div className="text-[26px] font-[800] font-mono text-blue-400 tabular-nums">
                              {res.hillierSodium} <span className="text-[12px] font-normal text-slate-400">mEq/L</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1">+2.4 mEq/L per 100 mg/dL glu</div>
                          </div>

                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Katz Formula (Classic)</div>
                            <div className="text-[26px] font-[800] font-mono text-slate-200 tabular-nums">
                              {res.katzSodium} <span className="text-[12px] font-normal text-slate-400">mEq/L</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1">+1.6 mEq/L per 100 mg/dL glu</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-800/80 text-[11.5px] text-slate-300 leading-relaxed">
                          💡 <strong>Clinical Guidance:</strong> {res.clinicalGuidance}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 2. Free Water Deficit */}
              {electrolyteEngine === 'free_water' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[16px] font-[800] text-slate-100">
                      Free Water Deficit in Hypernatremia
                    </h3>
                    <p className="text-[11.5px] text-slate-400">
                      Calculates replacement volume and strict hourly sodium decrease limit
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>Patient Weight (kg)</label>
                      <input
                        type="number"
                        value={fwdWeight}
                        onChange={(e) => setFwdWeight(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Serum Sodium (mEq/L)</label>
                      <input
                        type="number"
                        value={fwdSodium}
                        onChange={(e) => setFwdSodium(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Patient Category</label>
                      <select
                        value={fwdCategory}
                        onChange={(e) => setFwdCategory(e.target.value as any)}
                        className={inputClass}
                      >
                        <option value="adult_male">Adult Male (TBW 60%)</option>
                        <option value="adult_female">Adult Female (TBW 50%)</option>
                        <option value="elderly_male">Elderly Male (TBW 50%)</option>
                        <option value="elderly_female">Elderly Female (TBW 45%)</option>
                        <option value="child">Child (TBW 60%)</option>
                      </select>
                    </div>
                  </div>

                  {(() => {
                    const wt = parseFloat(fwdWeight) || 70;
                    const na = parseFloat(fwdSodium) || 150;
                    const res = calculateFreeWaterDeficit({
                      weightKg: wt,
                      serumSodium: na,
                      category: fwdCategory,
                    });

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Free Water Deficit</div>
                            <div className="text-[28px] font-[800] font-mono text-cyan-400 tabular-nums">
                              {res.freeWaterDeficitLiters} <span className="text-[13px] font-normal text-slate-400">Liters</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Estimated TBW</div>
                            <div className="text-[18px] font-bold text-slate-200">
                              {res.totalBodyWaterLiters} L
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-[11.5px] text-amber-200 leading-relaxed">
                          ⏱️ <strong>Correction Velocity Limit:</strong> {res.maxHourlyCorrectionRate}
                        </div>

                        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11.5px] text-rose-200 leading-relaxed font-semibold">
                          {res.safetyAlert}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 3. Potassium Repletion */}
              {electrolyteEngine === 'k_repletion' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[16px] font-[800] text-slate-100">
                      Potassium Repletion & Infusion Limits
                    </h3>
                    <p className="text-[11.5px] text-slate-400">
                      Calculates deficit, safe peripheral/central infusion rates, and concurrent magnesium requirement
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Current Potassium (mEq/L)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={kCurrent}
                        onChange={(e) => setKCurrent(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Target Potassium (mEq/L)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={kTarget}
                        onChange={(e) => setKTarget(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer text-[12px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={kRenalFailure}
                      onChange={(e) => setKRenalFailure(e.target.checked)}
                      className="w-4 h-4 rounded accent-rose-600"
                    />
                    <span>Patient has Advanced Kidney Failure (eGFR &lt; 30 mL/min or AKI)</span>
                  </label>

                  {(() => {
                    const curK = parseFloat(kCurrent) || 3.5;
                    const tgtK = parseFloat(kTarget) || 4.0;
                    const res = calculatePotassiumRepletion({
                      currentPotassium: curK,
                      targetPotassium: tgtK,
                      hasRenalFailure: kRenalFailure,
                    });

                    return (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                        {res.isHyperkalemic ? (
                          <div className="p-3.5 rounded-lg bg-rose-950/70 border border-rose-500/50 space-y-2">
                            <div className="flex items-center gap-2 text-rose-300 font-bold text-[12.5px]">
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                              Critical Hyperkalemia Emergency
                            </div>
                            <p className="text-[11.5px] text-rose-200 leading-relaxed">
                              {res.hyperkalemiaAlert}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Total Body Deficit</div>
                                <div className="text-[28px] font-[800] font-mono text-emerald-400 tabular-nums">
                                  ~{res.estimatedDeficitMeq} <span className="text-[13px] font-normal text-slate-400">mEq</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px]">
                              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                                <strong>Peripheral IV Limit:</strong> {res.peripheralIvLimit}
                              </div>
                              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                                <strong>Central CVC Line:</strong> {res.centralIvLimit}
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-500/20 text-[11.5px] text-blue-200">
                              💊 {res.oralPreferenceNote}
                            </div>
                          </>
                        )}

                        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11.5px] text-rose-200 leading-relaxed font-semibold">
                          {res.magnesiumRequirementAlert}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
