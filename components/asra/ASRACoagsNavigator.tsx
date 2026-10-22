'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  ASRA_DRUG_DATABASE,
  evaluateAsraSafety,
  BlockType,
} from '@/lib/asraCoagsData';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  FlaskConical,
  Activity,
  Check,
  Copy,
  Info,
  Calendar,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ASRACoagsNavigator() {
  const { activeCase, patientLabs } = useAppStore();
  const [selectedDrugId, setSelectedDrugId] = useState<string>('enoxaparin_prophylactic');
  const [blockType, setBlockType] = useState<BlockType>('neuraxial');
  const [hoursSinceLastDose, setHoursSinceLastDose] = useState<number>(8);
  const [inr, setInr] = useState<number>(parseFloat(patientLabs.inr || '') || 1.1);
  const [crCl, setCrCl] = useState<number>(75);
  const [copied, setCopied] = useState<boolean>(false);

  const evaluation = evaluateAsraSafety(
    selectedDrugId,
    blockType,
    hoursSinceLastDose,
    selectedDrugId === 'warfarin' ? inr : undefined,
    selectedDrugId === 'dabigatran' ? crCl : undefined
  );

  const handleCopyClearance = () => {
    const text = `ASRA CLEARANCE: ${evaluation.actionSummary} | Drug: ${evaluation.drug.genericName} (${hoursSinceLastDose}h elapsed vs ${evaluation.requiredPreOpWaitHours}h required) | Procedure: ${blockType.replace('_', ' ').toUpperCase()} | Catheter: ${evaluation.catheterPermitted ? 'Permitted' : 'CONTRAINDICATED'} | Restart: ${evaluation.drug.postProcedureRestartDisplay}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const blockOptions: { type: BlockType; label: string; desc: string }[] = [
    {
      type: 'neuraxial',
      label: 'Neuraxial (Spinal / Epidural)',
      desc: 'Highest risk: Compressive spinal epidural hematoma with permanent neurologic injury',
    },
    {
      type: 'deep_plexus',
      label: 'Deep Plexus / Compartment',
      desc: 'Lumbar plexus, paravertebral, sciatic; non-compressible bleeding sites',
    },
    {
      type: 'superficial',
      label: 'Superficial Peripheral',
      desc: 'Axillary, femoral, TAP, rectus sheath; direct compression possible',
    },
    {
      type: 'catheter_removal',
      label: 'Catheter Removal',
      desc: 'Pulling indwelling epidural or perineural catheter carries identical risk',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero Header ─── */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-[800] text-slate-100 flex items-center gap-2">
              ASRA Coags & Regional Hold-Time Matrix
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ASRA 5th Consensus
              </span>
            </h2>
            <p className="text-[11.5px] text-slate-400">
              Spinal epidural hematoma prevention: pre-procedure washout, catheter pull, and restart intervals
            </p>
          </div>
        </div>
      </div>

      {/* ─── Block Type Selector ─── */}
      <div className="space-y-2">
        <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400">
          Select Planned Regional Procedure
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {blockOptions.map((opt) => {
            const isSel = blockType === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setBlockType(opt.type)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSel
                    ? 'bg-rose-600/20 border-rose-500/60 text-white shadow-md'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="text-[12px] font-[800]">{opt.label}</div>
                <div className="text-[10.5px] text-slate-400 mt-1 leading-tight">{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Drug Selector ─── */}
      <div className="space-y-2">
        <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400">
          Select Active Antithrombotic / Anticoagulant
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {ASRA_DRUG_DATABASE.map((d) => {
            const isSel = d.id === selectedDrugId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDrugId(d.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSel
                    ? 'bg-rose-500/25 border-rose-500/60 text-white'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-[700] text-slate-200">{d.genericName}</span>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                    {d.drugClass}
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-400 mt-0.5 truncate">{d.regimen}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Clinical Timing Inputs ─── */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400">
              Hours Elapsed Since Last Dose
            </label>
            <span className="text-[11px] text-slate-500">
              Adjust time elapsed from the patient&apos;s last administered dose
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={Math.max(168, evaluation.requiredPreOpWaitHours * 1.5)}
              step="1"
              value={hoursSinceLastDose}
              onChange={(e) => setHoursSinceLastDose(parseInt(e.target.value, 10))}
              className="w-36 accent-rose-500 cursor-pointer"
            />
            <span className="font-mono font-[800] text-[16px] text-rose-400 tabular-nums w-14 text-right">
              {hoursSinceLastDose} h
            </span>
          </div>
        </div>

        {/* Conditional Lab Inputs */}
        {selectedDrugId === 'warfarin' && (
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
            <span className="text-[12px] text-slate-300 font-[600]">
              Current Documented INR (Target ≤ 1.4):
            </span>
            <input
              type="number"
              step="0.1"
              value={inr}
              onChange={(e) => setInr(parseFloat(e.target.value) || 1.0)}
              className="glass-input w-24 px-2 py-1 text-center font-mono font-bold text-amber-400"
            />
          </div>
        )}

        {selectedDrugId === 'dabigatran' && (
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
            <span className="text-[12px] text-slate-300 font-[600]">
              Patient CrCl (mL/min) for Washout Clearance:
            </span>
            <input
              type="number"
              value={crCl}
              onChange={(e) => setCrCl(parseFloat(e.target.value) || 50)}
              className="glass-input w-24 px-2 py-1 text-center font-mono font-bold text-cyan-400"
            />
          </div>
        )}
      </div>

      {/* ─── Safety Evaluation HUD ─── */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          evaluation.isSafeForProcedure
            ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
            : 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
        } space-y-4`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            {evaluation.isSafeForProcedure ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            )}
            <div>
              <span className="text-[11px] font-[700] uppercase text-slate-400">
                Hemostatic Safety Assessment
              </span>
              <div
                className={`text-[17px] font-[900] ${
                  evaluation.isSafeForProcedure ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {evaluation.isSafeForProcedure ? 'SAFE TO PROCEED' : 'DELAY PROCEDURE — DO NOT PUNCTURE'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11.5px] font-mono font-bold px-3 py-1 rounded-full border ${
                evaluation.isSafeForProcedure
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              {evaluation.isSafeForProcedure
                ? `Washout Complete (${hoursSinceLastDose}h / ${evaluation.requiredPreOpWaitHours}h)`
                : `Wait Another ${evaluation.remainingWaitHours} Hours`}
            </span>
          </div>
        </div>

        {/* Safety Warnings List */}
        {evaluation.safetyWarnings.length > 0 && (
          <div className="space-y-2">
            {evaluation.safetyWarnings.map((w, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/30 text-[12px] text-rose-200 flex items-start gap-2 leading-relaxed"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}

        {/* Hold & Restart Timeline Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
            <span className="text-[10px] uppercase font-[700] text-slate-400 block mb-0.5">
              1. Pre-Op Hold Time
            </span>
            <div className="text-[14px] font-[800] text-slate-100 font-mono">
              {evaluation.drug.preProcedureHoldDisplay}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Before needle puncture</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
            <span className="text-[10px] uppercase font-[700] text-slate-400 block mb-0.5">
              2. Catheter Policy
            </span>
            <div
              className={`text-[14px] font-[800] font-mono ${
                evaluation.catheterPermitted ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {evaluation.catheterPermitted ? 'Permitted' : 'CONTRAINDICATED'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {evaluation.drug.catheterRemovalHoldDisplay}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
            <span className="text-[10px] uppercase font-[700] text-slate-400 block mb-0.5">
              3. Post-Op Restart
            </span>
            <div className="text-[14px] font-[800] text-slate-100 font-mono">
              {evaluation.drug.postProcedureRestartDisplay}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Post-catheter: {evaluation.drug.postCatheterRestartDisplay}
            </div>
          </div>
        </div>

        {/* Laboratory & Monitoring Requirements */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-[700] uppercase text-slate-300">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mandatory Laboratory Requirements & Evidence ({evaluation.drug.asraEvidenceLevel})</span>
          </div>
          <ul className="space-y-1 text-[11.5px] text-slate-400">
            {evaluation.laboratoryRequirements.map((req, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical Pearls */}
        <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-[11.5px] text-slate-300 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">ASRA Expert Consensus:</strong> {evaluation.drug.clinicalPearls}
          </div>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopyClearance}
          className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-[12px] font-[700] flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Preoperative Regional Clearance Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Preoperative Regional Anesthesia Clearance</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
