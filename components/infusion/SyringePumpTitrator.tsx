'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  INFUSION_PROTOCOLS,
  calculateInfusionRate,
  calculateDoseFromRate,
  InfusionProtocol,
} from '@/lib/infusionData';
import {
  Syringe,
  Activity,
  ArrowRightLeft,
  Info,
  Clock,
  Check,
  Copy,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SyringePumpTitrator() {
  const { activeCase } = useAppStore();
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>('norepinephrine');
  const [selectedSyringeIndex, setSelectedSyringeIndex] = useState<number>(0);
  const [weightKg, setWeightKg] = useState<number>(
    parseFloat(activeCase.patientWeight || '') || 70
  );
  const [dose, setDose] = useState<number>(0.05);
  const [manualRateMlHr, setManualRateMlHr] = useState<string>('');
  const [isReverseMode, setIsReverseMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync with activeCase
  useEffect(() => {
    const w = parseFloat(activeCase.patientWeight || '');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (w > 0) setWeightKg(w);
  }, [activeCase.patientWeight]);

  const protocol =
    INFUSION_PROTOCOLS.find((p) => p.id === selectedProtocolId) || INFUSION_PROTOCOLS[0];

  // Reset dose when protocol changes
  const handleProtocolChange = (id: string) => {
    setSelectedProtocolId(id);
    setSelectedSyringeIndex(0);
    const p = INFUSION_PROTOCOLS.find((item) => item.id === id) || INFUSION_PROTOCOLS[0];
    setDose(p.defaultDose);
    setIsReverseMode(false);
    setManualRateMlHr('');
  };

  const calculation = calculateInfusionRate(
    selectedProtocolId,
    dose,
    weightKg,
    selectedSyringeIndex
  );

  const handleManualRateChange = (rateStr: string) => {
    setManualRateMlHr(rateStr);
    const r = parseFloat(rateStr);
    if (!isNaN(r) && r >= 0) {
      const calcDose = calculateDoseFromRate(
        selectedProtocolId,
        r,
        weightKg,
        selectedSyringeIndex
      );
      setDose(calcDose);
    }
  };

  const handleCopyOrder = () => {
    const text = `INFUSION ORDER: ${protocol.name} at ${dose} ${protocol.doseUnit} (${calculation.rateMlHr} mL/hr) via ${calculation.syringe.label}. Patient Wt: ${weightKg} kg.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group protocols by category
  const categories = Array.from(new Set(INFUSION_PROTOCOLS.map((p) => p.category)));

  return (
    <div className="space-y-6">
      {/* ─── Top Strip: Weight & Mode Toggle ─── */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Syringe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-[800] text-slate-100 flex items-center gap-2">
              Syringe Pump Titrator (50 mL)
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ICU / OR Standards
              </span>
            </h2>
            <p className="text-[11.5px] text-slate-400">
              Bidirectional rate conversion between target dose and syringe pump mL/hr
            </p>
          </div>
        </div>

        {/* Weight Dial */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/10">
          <span className="text-[11px] font-[700] uppercase text-slate-400 px-1">Weight:</span>
          <button
            type="button"
            onClick={() => setWeightKg((w) => Math.max(1, w - 5))}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
          >
            -5
          </button>
          <span className="font-mono font-[800] text-sm text-cyan-400 px-1.5 tabular-nums">
            {weightKg} kg
          </span>
          <button
            type="button"
            onClick={() => setWeightKg((w) => w + 5)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
          >
            +5
          </button>
        </div>
      </div>

      {/* ─── Category & Protocol Selector Chips ─── */}
      <div className="space-y-2">
        <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400">
          Select Vasoactive / Anesthetic Agent
        </label>
        <div className="flex flex-wrap gap-1.5">
          {INFUSION_PROTOCOLS.map((p) => {
            const isSel = p.id === selectedProtocolId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleProtocolChange(p.id)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-[700] transition-all flex items-center gap-1.5 border ${
                  isSel
                    ? 'bg-cyan-600/25 border-cyan-500/60 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <span>{p.name}</span>
                <span className="text-[9.5px] font-mono opacity-70 px-1 rounded bg-white/5">
                  {p.doseUnit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Syringe Concentration Selector ─── */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
        <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400">
          Syringe Dilution / Concentration Preset
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {protocol.syringePresets.map((s, idx) => {
            const isSel = idx === selectedSyringeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSyringeIndex(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSel
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                    : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[12px] font-[700] text-slate-200">{s.label}</div>
                <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                  {s.concentrationMcgPerMl} {protocol.doseUnit.includes('unit') ? 'units/mL' : protocol.doseUnit.includes('mg') ? 'mg/mL' : 'mcg/mL'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Interactive HUD / Rate Calculator ─── */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c162c] to-[#070c18] border border-cyan-500/30 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-[11px] font-[700] uppercase text-cyan-400 tracking-wider">
              {protocol.category} Titration HUD
            </span>
            <div className="text-[16px] font-[800] text-slate-100">{protocol.name}</div>
          </div>
          <button
            type="button"
            onClick={() => setIsReverseMode(!isReverseMode)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-[700] border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 flex items-center gap-1.5 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{isReverseMode ? 'Switch to Dose Mode' : 'Reverse: Set Pump mL/hr'}</span>
          </button>
        </div>

        {/* Main Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Target Dose Card */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
            <span className="text-[11px] font-[700] uppercase text-slate-400 mb-1">Target Dose</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[36px] font-[900] font-mono text-cyan-400 tabular-nums">
                {dose}
              </span>
              <span className="text-[13px] font-mono text-slate-400">{protocol.doseUnit}</span>
            </div>
            {!isReverseMode && (
              <div className="mt-3 space-y-1.5">
                <input
                  type="range"
                  min={protocol.minDose}
                  max={protocol.maxDose}
                  step={protocol.step}
                  value={dose}
                  onChange={(e) => setDose(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>{protocol.minDose}</span>
                  <span>Default: {protocol.defaultDose}</span>
                  <span>{protocol.maxDose}</span>
                </div>
              </div>
            )}
          </div>

          {/* Syringe Pump Rate Card */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between">
            <span className="text-[11px] font-[700] uppercase text-cyan-300 mb-1">
              Syringe Pump Infusion Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[36px] font-[900] font-mono text-emerald-400 tabular-nums">
                {calculation.rateMlHr}
              </span>
              <span className="text-[14px] font-mono text-slate-300 font-bold">mL / hr</span>
            </div>

            {isReverseMode ? (
              <div className="mt-3">
                <label className="block text-[10.5px] uppercase font-[700] text-cyan-300 mb-1">
                  Enter Current Pump Rate:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    placeholder={calculation.rateMlHr.toString()}
                    value={manualRateMlHr}
                    onChange={(e) => handleManualRateChange(e.target.value)}
                    className="glass-input w-full px-3 py-1.5 font-mono text-[14px] text-emerald-400 font-bold"
                  />
                  <span className="text-[12px] font-mono text-slate-400">mL/hr</span>
                </div>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-slate-400 mt-2 truncate">
                {calculation.calculationFormula}
              </div>
            )}
          </div>
        </div>

        {/* Copy Order Button */}
        <button
          type="button"
          onClick={handleCopyOrder}
          className="w-full py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-200 text-[12.5px] font-[700] flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Infusion Order Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Standard Nursing Infusion Order</span>
            </>
          )}
        </button>
      </div>

      {/* ─── Titration Ladder Table ─── */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <h3 className="text-[13px] font-[800] text-slate-200">
            Quick Titration Reference Ladder ({weightKg} kg)
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {calculation.titrationSteps.map((step, idx) => {
            const isCurrent = Math.abs(step.dose - dose) < protocol.step * 0.5;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDose(step.dose);
                  setIsReverseMode(false);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/25 border-cyan-500 text-white shadow-md'
                    : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] text-slate-300'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400">
                  {step.dose} {protocol.doseUnit.split('/')[0]}
                </div>
                <div className="text-[15px] font-[800] font-mono text-cyan-300 tabular-nums">
                  {step.rateMlHr}
                </div>
                <div className="text-[9px] font-mono text-slate-500">mL/hr</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Clinical Pearls & Titration Goals ─── */}
      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2 text-[12px] text-cyan-200/90 leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300">Titration Goal:</strong> {protocol.titrationGoals}
          </div>
        </div>
        <div className="flex items-start gap-2 pt-1 border-t border-cyan-500/10">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300">Clinical Pearls:</strong> {protocol.clinicalPearls}
          </div>
        </div>
      </div>
    </div>
  );
}
