'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Brain,
  Clock,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Copy,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { calculateStatusEpilepticusDoses } from '@/lib/emergencyProtocols';

export default function StatusEpilepticusTimeline() {
  const { language, activeCase } = useAppStore();
  const weight = parseFloat(activeCase.patientWeight) || 70;
  const doses = calculateStatusEpilepticusDoses(weight);

  // Stopwatch state
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPhaseTab, setSelectedPhaseTab] = useState<1 | 2 | 3 | 4>(1);
  const [copied, setCopied] = useState(false);

  // Checklists for each phase
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Determine current active clinical phase based on elapsed seconds
  const currentElapsedPhase: 1 | 2 | 3 | 4 =
    elapsedSec < 300 ? 1 : elapsedSec < 1200 ? 2 : elapsedSec < 2400 ? 3 : 4;

  // Format seconds into MM:SS
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyProtocol = () => {
    const summary = [
      `STATUS EPILEPTICUS RESUSCITATION SUMMARY`,
      `Patient Weight: ${weight} kg | Elapsed Seizure Duration: ${formatTime(elapsedSec)}`,
      `Current Clinical Phase: Phase ${currentElapsedPhase}`,
      `----------------------------------------`,
      `PHASE 1: STABILIZATION (0–5 MIN)`,
      `• Airway, 100% O2, Capillary Glucose check`,
      `• Dextrose: ${doses.phase1.dextroseBolus}`,
      `• Thiamine: ${doses.phase1.thiamineAdult}`,
      `----------------------------------------`,
      `PHASE 2: FIRST-LINE BENZODIAZEPINES (5–20 MIN)`,
      `• Lorazepam IV: ${doses.phase2FirstLine.lorazepamIv.doseMg} mg IV (${doses.phase2FirstLine.lorazepamIv.volumeMl} mL of 2mg/mL) over 2 min`,
      `• Diazepam IV: ${doses.phase2FirstLine.diazepamIv.doseMg} mg IV over 2 min`,
      `• Midazolam IM (no IV access): ${doses.phase2FirstLine.midazolamIm.doseMg} mg IM`,
      `----------------------------------------`,
      `PHASE 3: SECOND-LINE NON-SEDATING AEDs (20–40 MIN)`,
      `• Levetiracetam (Keppra): ${doses.phase3SecondLine.keppra.doseMg} mg IV in 100 mL NS over 10 min`,
      `• Fosphenytoin: ${doses.phase3SecondLine.fosphenytoin.doseMgPe} mg PE IV`,
      `• Valproate Sodium: ${doses.phase3SecondLine.valproate.doseMg} mg IV over 5–10 min`,
      `----------------------------------------`,
      `PHASE 4: REFRACTORY STATUS & RSI (40+ MIN)`,
      `• Intubation & Mechanical Ventilation with neuroprotective RSI`,
      `• Propofol: ${doses.phase4Refractory.propofolBolusMg} mg IV bolus -> Infusion ${doses.phase4Refractory.propofolInfusionRange}`,
      `• Midazolam: ${doses.phase4Refractory.midazolamBolusMg} mg IV bolus -> Infusion ${doses.phase4Refractory.midazolamInfusionRange}`,
      `• Ketamine: ${doses.phase4Refractory.ketamineBolusMg} mg IV bolus -> Infusion ${doses.phase4Refractory.ketamineInfusionRange}`,
      `• Continuous EEG monitoring target: burst suppression (10–15s)`,
    ];
    navigator.clipboard.writeText(summary.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const phases = [
    {
      phaseNumber: 1 as const,
      timeframe: '0–5 min',
      title: language === 'en' ? 'Phase 1: Stabilization & Triage' : 'Fase 1: Stabilisasi & Triase',
    },
    {
      phaseNumber: 2 as const,
      timeframe: '5–20 min',
      title: language === 'en' ? 'Phase 2: First-Line Therapy' : 'Fase 2: Terapi Lini Pertama',
    },
    {
      phaseNumber: 3 as const,
      timeframe: '20–40 min',
      title: language === 'en' ? 'Phase 3: Urgent Second-Line AED' : 'Fase 3: OAE Lini Kedua',
    },
    {
      phaseNumber: 4 as const,
      timeframe: '40+ min',
      title: language === 'en' ? 'Phase 4: Refractory Status & RSI' : 'Fase 4: Status Refrakter & RSI',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stopwatch & Escalation Header */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-[900] text-slate-100">
                  {language === 'en'
                    ? 'Status Epilepticus Escalation Timeline'
                    : 'Protokol Eskalasi Status Epileptikus'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-[800] bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase">
                  AES / Neurocritical Care
                </span>
              </div>
              <p className="text-[12px] text-slate-400">
                {language === 'en'
                  ? 'Sequential 4-phase time-locked management protocol calculated for current patient weight'
                  : 'Protokol penatalaksanaan kejang berurutan 4 fase dengan perhitungan dosis otomatis'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyProtocol}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[12px] font-[700] flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Protocol</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Stopwatch Bar & Phase Highlighting */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-[700] uppercase tracking-wider text-slate-400">
                Seizure Duration:
              </span>
              <span className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                {formatTime(elapsedSec)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRunning(!isRunning)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-[13px] font-[800] flex items-center gap-1.5 transition-colors ${
                  isRunning
                    ? 'bg-amber-600/30 border border-amber-500/50 text-amber-200'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isRunning ? 'Pause Timer' : 'Start Seizure Timer'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsRunning(false);
                  setElapsedSec(0);
                }}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[12px]"
                title="Reset Stopwatch"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-400">Current Phase:</span>
            <span
              className={`px-3 py-1 rounded-xl text-[12px] font-[800] border font-mono ${
                currentElapsedPhase === 1
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  : currentElapsedPhase === 2
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : currentElapsedPhase === 3
                  ? 'bg-slate-800 text-slate-200 border-slate-600'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              }`}
            >
              Phase {currentElapsedPhase} ({phases[currentElapsedPhase - 1].timeframe})
            </span>
          </div>
        </div>

        {/* 4-Phase Stepper Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {phases.map((p) => {
            const isSelected = selectedPhaseTab === p.phaseNumber;
            const isLivePhase = currentElapsedPhase === p.phaseNumber;
            return (
              <button
                key={p.phaseNumber}
                onClick={() => setSelectedPhaseTab(p.phaseNumber)}
                className={`min-h-[44px] p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500/80 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-[800] text-blue-400">
                    Phase {p.phaseNumber}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {p.timeframe}
                  </span>
                </div>
                <div className="text-[12px] font-[700] text-slate-200 line-clamp-1">
                  {p.title}
                </div>
                {isLivePhase && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Detail Content */}
      <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl space-y-5">
        {selectedPhaseTab === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-[16px] font-[800] text-slate-100">
                  Phase 1: Stabilization &amp; Triage (0–5 minutes)
                </h3>
                <p className="text-[12px] text-slate-400">
                  Assess ABCs, oxygenate, rule out hypoglycemia, secure IV/IO access
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                Target: Under 5 min
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Point of Care Glucose Box */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-amber-400">
                  Point-of-Care Capillary Glucose
                </div>
                <div className="text-[20px] font-[900] font-mono text-slate-100 tabular-nums">
                  {doses.phase1.dextroseBolus}
                </div>
                <p className="text-[12px] text-slate-400">
                  Check fingerstick glucose immediately. Treat if &lt; 60 mg/dL (3.3 mmol/L).
                </p>
                <div className="p-2.5 rounded bg-slate-950/80 text-[11px] text-slate-300 border border-slate-800 mt-2">
                  <strong className="text-amber-300">Adult Thiamine Rule:</strong> {doses.phase1.thiamineAdult}
                </div>
              </div>

              {/* Phase 1 Action Checklist */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-2">
                  Key Immediate Actions
                </div>
                {[
                  { id: 'p1_airway', text: 'Maintain patent airway, suction secretions, position on side' },
                  { id: 'p1_o2', text: 'High-flow 100% O2 via non-rebreather mask or bag-valve-mask' },
                  { id: 'p1_access', text: 'Establish large-bore IV or IO access immediately' },
                  { id: 'p1_labs', text: 'Send STAT labs: glucose, electrolytes, ionized Ca, Mg, AED levels, tox screen' },
                  { id: 'p1_monitor', text: 'Continuous ECG, pulse oximetry, EtCO2, and blood pressure monitoring' },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-2.5 cursor-pointer text-[12px] text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={!!checkedItems[item.id]}
                      onChange={() => toggleCheck(item.id)}
                      className="mt-0.5 w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                    />
                    <span className={checkedItems[item.id] ? 'line-through text-slate-500' : ''}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedPhaseTab === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-[16px] font-[800] text-slate-100">
                  Phase 2: Emergent First-Line Benzodiazepines (5–20 minutes)
                </h3>
                <p className="text-[12px] text-slate-400">
                  Give adequate full doses. Prepare second-line AED simultaneously!
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Seizure &gt; 5 min
              </span>
            </div>

            {/* Clinical Warning Banner */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[12px] text-slate-300 leading-relaxed">
                <strong className="text-amber-200">Avoid Underdosing:</strong> Subtherapeutic benzodiazepine doses fail to terminate status epilepticus and markedly increase progression to refractory status. Choose ONE route and administer full dose:
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option A: Lorazepam IV */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-amber-400">
                  Option A: Lorazepam IV (Preferred IV)
                </div>
                <div className="text-[22px] font-[900] font-mono text-slate-100 tabular-nums my-1">
                  {doses.phase2FirstLine.lorazepamIv.doseMg} mg <span className="text-[14px] text-slate-400">IV push</span>
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  2 mg/mL = <strong className="text-amber-300">{doses.phase2FirstLine.lorazepamIv.volumeMl} mL</strong>
                </div>
                <p className="text-[11px] text-slate-400">
                  {doses.phase2FirstLine.lorazepamIv.instruction} Max 4 mg single dose.
                </p>
              </div>

              {/* Option B: Diazepam IV */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-blue-400">
                  Option B: Diazepam IV (Alternative IV)
                </div>
                <div className="text-[22px] font-[900] font-mono text-slate-100 tabular-nums my-1">
                  {doses.phase2FirstLine.diazepamIv.doseMg} mg <span className="text-[14px] text-slate-400">IV push</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {doses.phase2FirstLine.diazepamIv.instruction} (0.15–0.2 mg/kg, max 10 mg). Rapid brain redistribution.
                </p>
              </div>

              {/* Option C: Midazolam IM */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-emerald-400">
                  Option C: Midazolam IM (No IV Access)
                </div>
                <div className="text-[22px] font-[900] font-mono text-slate-100 tabular-nums my-1">
                  {doses.phase2FirstLine.midazolamIm.doseMg} mg <span className="text-[14px] text-slate-400">IM</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {doses.phase2FirstLine.midazolamIm.instruction} First choice when IV access is delayed.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedPhaseTab === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-[16px] font-[800] text-slate-100">
                  Phase 3: Urgent Second-Line IV Anticonvulsants (20–40 minutes)
                </h3>
                <p className="text-[12px] text-slate-400">
                  Administer if seizure continues after first-line benzodiazepines. Choose ONE agent:
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700">
                Seizure &gt; 20 min
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Keppra */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-[700] uppercase tracking-wider text-blue-400">
                    Levetiracetam (Keppra)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">
                    60 mg/kg
                  </span>
                </div>
                <div className="text-[24px] font-[900] font-mono text-slate-100 tabular-nums my-1">
                  {doses.phase3SecondLine.keppra.doseMg} mg <span className="text-[14px] text-slate-400">IV</span>
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  {doses.phase3SecondLine.keppra.rate}
                </div>
                <p className="text-[11px] text-slate-400">
                  {doses.phase3SecondLine.keppra.instruction} Max 4,500 mg.
                </p>
              </div>

              {/* Fosphenytoin */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-[700] uppercase tracking-wider text-slate-300">
                    Fosphenytoin (Cerebyx)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    20 mg PE/kg
                  </span>
                </div>
                <div className="text-[24px] font-[900] font-mono text-slate-100 tabular-nums my-1">
                  {doses.phase3SecondLine.fosphenytoin.doseMgPe} mg PE <span className="text-[14px] text-slate-400">IV</span>
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  {doses.phase3SecondLine.fosphenytoin.maxRate}
                </div>
                <p className="text-[11px] text-slate-400">
                  {doses.phase3SecondLine.fosphenytoin.instruction} Max 1,500 mg PE.
                </p>
              </div>

              {/* Valproate */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-[700] uppercase tracking-wider text-amber-400">
                    Valproate Sodium
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300">
                    40 mg/kg
                  </span>
                </div>
                <div className="text-[24px] font-[900] font-mono text-slate-100 tabular-nums my-1">
                  {doses.phase3SecondLine.valproate.doseMg} mg <span className="text-[14px] text-slate-400">IV</span>
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  {doses.phase3SecondLine.valproate.rate}
                </div>
                <p className="text-[11px] text-slate-400">
                  {doses.phase3SecondLine.valproate.instruction} Max 3,000 mg.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedPhaseTab === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-[16px] font-[800] text-slate-100">
                  Phase 4: Refractory Status Epilepticus (40+ minutes)
                </h3>
                <p className="text-[12px] text-slate-400">
                  Endotracheal intubation, neuroprotective RSI, continuous IV anesthetic infusions, and cEEG
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                Refractory Status
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-[12px] text-slate-300 leading-relaxed">
              <strong className="text-rose-200">ICU / Anesthesia Protocol:</strong> Intubate immediately with Rocuronium 1.2 mg/kg. Target continuous EEG burst suppression (10–15s inter-burst intervals) for 24–48 hours. Keep Norepinephrine infusion ready for hypotension.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Propofol */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-rose-400">
                  Propofol Infusion
                </div>
                <div className="text-[13px] text-slate-300">
                  Bolus: <strong className="text-rose-300 font-mono text-[16px]">{doses.phase4Refractory.propofolBolusMg} mg</strong> (1.5 mg/kg)
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  Infusion: <strong className="text-slate-100">{doses.phase4Refractory.propofolInfusionRange}</strong>
                </div>
                <p className="text-[11px] text-slate-400">
                  Monitor for Propofol Infusion Syndrome (PRIS) if &gt; 48h or &gt; 5 mg/kg/hr.
                </p>
              </div>

              {/* Midazolam */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-amber-400">
                  Midazolam Infusion
                </div>
                <div className="text-[13px] text-slate-300">
                  Bolus: <strong className="text-amber-300 font-mono text-[16px]">{doses.phase4Refractory.midazolamBolusMg} mg</strong> (0.2 mg/kg)
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  Infusion: <strong className="text-slate-100">{doses.phase4Refractory.midazolamInfusionRange}</strong>
                </div>
                <p className="text-[11px] text-slate-400">
                  Titrate up every 15 min until burst suppression on continuous EEG.
                </p>
              </div>

              {/* Ketamine */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-[700] uppercase tracking-wider text-blue-400">
                  Ketamine Infusion
                </div>
                <div className="text-[13px] text-slate-300">
                  Bolus: <strong className="text-blue-300 font-mono text-[16px]">{doses.phase4Refractory.ketamineBolusMg} mg</strong> (2 mg/kg)
                </div>
                <div className="text-[12px] font-mono text-slate-300">
                  Infusion: <strong className="text-slate-100">{doses.phase4Refractory.ketamineInfusionRange}</strong>
                </div>
                <p className="text-[11px] text-slate-400">
                  Potent NMDA receptor antagonist; excellent synergy when GABA receptors downregulate.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
