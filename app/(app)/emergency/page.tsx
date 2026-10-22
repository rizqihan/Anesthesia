'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import {
  AlertOctagon,
  ArrowLeft,
  Heart,
  Zap,
  ShieldAlert,
  Activity,
  Syringe,
  Flame,
  Droplet,
  Copy,
  Check,
  Baby,
  Brain,
  TrendingDown,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ACLSCycleTimer from '@/components/emergency/ACLSCycleTimer';
import BroselowTapePicker from '@/components/emergency/BroselowTapePicker';
import StatusEpilepticusTimeline from '@/components/emergency/StatusEpilepticusTimeline';
import HypertensiveCrisisEngine from '@/components/emergency/HypertensiveCrisisEngine';

type EmergencyModuleTab =
  | 'push_doses'
  | 'acls_cpr'
  | 'broselow'
  | 'status_epilepticus'
  | 'hypertensive_crisis';

export default function EmergencyPage() {
  const { activeCase, setActiveCase, language } = useAppStore();
  const weight = parseFloat(activeCase.patientWeight) || 70;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Top-level module navigation
  const [selectedModule, setSelectedModule] = useState<EmergencyModuleTab>('push_doses');

  // Sub-tabs for Push Doses
  const [pushDoseSubTab, setPushDoseSubTab] = useState<
    'cardiac' | 'hypotension' | 'anaphylaxis' | 'airway' | 'mh' | 'last'
  >('cardiac');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const adjustWeight = (delta: number) => {
    const updated = Math.max(1, Math.min(300, +(weight + delta).toFixed(1)));
    setActiveCase({ patientWeight: updated.toString() });
  };

  // Computed doses for Push Doses
  const epiArrest = Math.min(1.0, +(weight * 0.01).toFixed(2));
  const amiodarone1 = 300;
  const amiodarone2 = 150;

  const ephedrineDose = Math.min(10, +(weight * 0.1).toFixed(1));
  const phenylephrineDose = Math.min(100, +(weight * 1.5).toFixed(0));
  const atropineDose = Math.max(0.2, Math.min(1.0, +(weight * 0.02).toFixed(2)));

  const epiAnaphylaxisIM = Math.min(0.5, +(weight * 0.01).toFixed(2));
  const succinylcholineIV = +(weight * 1.5).toFixed(0);
  const sugammadexImmediate = +(weight * 16).toFixed(0);
  const sugammadexRoutine = +(weight * 2).toFixed(0);

  const dantroleneBolusMg = +(weight * 2.5).toFixed(0);
  const dantroleneVials = Math.ceil(dantroleneBolusMg / 20);
  const dantroleneWaterMl = dantroleneVials * 60;

  const lipidBolusMl = +(weight * 1.5).toFixed(1);
  const lipidInfusionMlPerHr = +((weight * 0.25) * 60).toFixed(0);

  const moduleTabs = [
    {
      id: 'push_doses' as const,
      label: language === 'en' ? 'Crisis Push Doses' : 'Dosis Cepat Darurat',
      icon: Syringe,
    },
    {
      id: 'acls_cpr' as const,
      label: language === 'en' ? 'ACLS CPR Timer' : 'Timer RJP ACLS',
      icon: Heart,
    },
    {
      id: 'broselow' as const,
      label: language === 'en' ? 'Pediatric Broselow' : 'Broselow Anak',
      icon: Baby,
    },
    {
      id: 'status_epilepticus' as const,
      label: language === 'en' ? 'Status Epilepticus' : 'Status Epileptikus',
      icon: Brain,
    },
    {
      id: 'hypertensive_crisis' as const,
      label: language === 'en' ? 'Hypertensive Crisis' : 'Krisis Hipertensi',
      icon: TrendingDown,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
        <div className="flex items-center gap-3.5">
          <Link href="/dashboard">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 min-h-[44px] min-w-[44px] rounded-xl border border-white/10 bg-[#0c121e]/80 hover:bg-white/5 transition-all text-slate-300 hover:text-white shrink-0 flex items-center justify-center"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          </Link>
          <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-300 shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-[900] tracking-tight text-rose-100">
                {language === 'en'
                  ? 'Resuscitation & Acute Emergency Suite'
                  : 'Pusat Resusitasi & Krisis Darurat Akut'}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-[800] bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                High Alert
              </span>
            </div>
            <p className="text-[12px] text-rose-200/70">
              {language === 'en'
                ? 'Rapid protocols, cycle timers, Broselow pediatric sizing, and emergency titrations'
                : 'Protokol cepat, timer siklus, ukuran Broselow anak, dan titrasi darurat'}
            </p>
          </div>
        </div>

        {/* Weight Controller pill with Steppers */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#0a0f1d] border border-white/15">
          <span className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Weight' : 'Berat'}:
          </span>
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => adjustWeight(-5)}
              className="px-2 py-1 min-h-[32px] rounded bg-white/5 hover:bg-white/10 text-slate-400 text-[11px] font-mono"
              aria-label="Decrease weight by 5 kg"
            >
              -5
            </motion.button>
            <input
              type="number"
              step="1"
              min="1"
              max="250"
              value={activeCase.patientWeight}
              onChange={(e) => setActiveCase({ patientWeight: e.target.value })}
              className="w-14 bg-transparent text-center font-mono font-[800] text-[15px] text-blue-400 focus:outline-none"
              aria-label="Patient weight in kg"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => adjustWeight(5)}
              className="px-2 py-1 min-h-[32px] rounded bg-white/5 hover:bg-white/10 text-slate-400 text-[11px] font-mono"
              aria-label="Increase weight by 5 kg"
            >
              +5
            </motion.button>
          </div>
          <span className="text-[12px] font-[700] text-slate-400 font-mono">kg</span>
        </div>
      </div>

      {/* Main Module Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {moduleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedModule === tab.id;
          return (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={tab.id}
              onClick={() => setSelectedModule(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-[13px] font-[700] transition-all relative ${
                isActive
                  ? 'bg-rose-600/25 border border-rose-500/50 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* TAB 1: CRISIS PUSH DOSES */}
      {selectedModule === 'push_doses' && (
        <div className="space-y-5">
          {/* Sub-tabs for Push Doses */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'cardiac', label: language === 'en' ? 'Cardiac Arrest' : 'Henti Jantung', icon: Heart },
              { id: 'hypotension', label: language === 'en' ? 'Hypotension & Bradycardia' : 'Hipotensi & Bradikardia', icon: Zap },
              { id: 'anaphylaxis', label: language === 'en' ? 'Anaphylaxis' : 'Anafilaksis', icon: Activity },
              { id: 'airway', label: language === 'en' ? 'Airway & Laryngospasm' : 'Jalan Napas & Spasme', icon: Syringe },
              { id: 'mh', label: 'Malignant Hyperthermia (MH)', icon: Flame },
              { id: 'last', label: 'LAST (Lipid Rescue)', icon: Droplet },
            ].map((sub) => {
              const Icon = sub.icon;
              const isActive = pushDoseSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setPushDoseSubTab(sub.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg text-[12px] font-[600] transition-colors border ${
                    isActive
                      ? 'bg-slate-800 border-slate-600 text-slate-100'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>

          {/* Push Dose Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pushDoseSubTab === 'cardiac' && (
              <>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-rose-500/30 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-rose-400">
                      Epinephrine (Adrenaline)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      0.01 mg/kg IV
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[34px] font-[900] font-mono tabular-nums text-slate-100">
                      {epiArrest} <span className="text-[16px] font-[500] text-slate-400">mg IV</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${epiArrest} mg IV Epinephrine`, 'epi')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copy dose"
                    >
                      {copiedId === 'epi' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    Standard 1:10,000 solution (0.1 mg/mL) = <strong className="text-rose-300 font-mono">{(epiArrest * 10).toFixed(1)} mL</strong>. Administer every 3–5 minutes during CPR. Flush with 20 mL normal saline.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1424] border border-amber-500/30 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-amber-400">
                      Amiodarone IV
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Refractory VF / pVT
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[34px] font-[900] font-mono tabular-nums text-slate-100">
                      {amiodarone1} <span className="text-[16px] font-[500] text-slate-400">mg IV Bolus</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard('300 mg IV Amiodarone', 'amio')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copy dose"
                    >
                      {copiedId === 'amio' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    First dose 300 mg IV push after 3rd shock. Second dose <strong className="text-amber-300 font-mono">{amiodarone2} mg</strong> after 5th shock if ventricular fibrillation persists.
                  </p>
                </div>
              </>
            )}

            {pushDoseSubTab === 'hypotension' && (
              <>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-blue-400">
                      Ephedrine IV Bolus
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">0.1 mg/kg</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                      {ephedrineDose} <span className="text-[16px] font-[500] text-slate-400">mg</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${ephedrineDose} mg IV Ephedrine`, 'ephedrine')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === 'ephedrine' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    Ideal for hypotension with concurrent bradycardia. Dilute 50 mg into 10 mL (5 mg/mL) and give 1–2 mL aliquots.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-cyan-400">
                      Phenylephrine IV Bolus
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">1.0-2.0 mcg/kg</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                      {phenylephrineDose} <span className="text-[16px] font-[500] text-slate-400">mcg</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${phenylephrineDose} mcg IV Phenylephrine`, 'phenyl')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === 'phenyl' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    Pure alpha-1 agonist for hypotension with normo/tachycardia. Dilute 10 mg into 100 mL (100 mcg/mL) and titrate 50–100 mcg (0.5–1 mL).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 relative md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-amber-400">
                      Atropine Sulfate IV
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">0.02 mg/kg</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                      {atropineDose} <span className="text-[16px] font-[500] text-slate-400">mg</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${atropineDose} mg IV Atropine`, 'atropine')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === 'atropine' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    Vagolytic for symptomatic sinus bradycardia. Adult minimum dose 0.5 mg, pediatric minimum 0.1 mg to avoid paradoxical bradycardia.
                  </p>
                </div>
              </>
            )}

            {pushDoseSubTab === 'anaphylaxis' && (
              <>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-rose-500/30 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-rose-400">
                      Epinephrine 1:1,000 (IM)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">0.01 mg/kg IM</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                      {epiAnaphylaxisIM} <span className="text-[16px] font-[500] text-slate-400">mg IM</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${epiAnaphylaxisIM} mg IM Epinephrine`, 'epi-im')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === 'epi-im' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    Inject immediately into anterolateral thigh. Repeat every 5–15 minutes if required (max single adult dose: 0.5 mg).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-blue-400">
                      Secondary Adjuncts
                    </span>
                  </div>
                  <ul className="text-[12px] text-slate-300 space-y-2 mt-2">
                    <li>• <strong>Diphenhydramine:</strong> {Math.min(50, weight * 1)} mg IV push (H1 blocker)</li>
                    <li>• <strong>Hydrocortisone:</strong> {Math.min(200, weight * 2)} mg IV push (Corticosteroid)</li>
                    <li>• <strong>IV Fluids:</strong> Crystalloid bolus 20–30 mL/kg ({(weight * 20).toFixed(0)}–{(weight * 30).toFixed(0)} mL) for distributive shock</li>
                  </ul>
                </div>
              </>
            )}

            {pushDoseSubTab === 'airway' && (
              <>
                <div className="p-5 rounded-2xl bg-[#0e1424] border border-cyan-500/30 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-cyan-400">
                      Succinylcholine (Laryngospasm)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">1.0-1.5 mg/kg IV</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                      {succinylcholineIV} <span className="text-[16px] font-[500] text-slate-400">mg IV</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${succinylcholineIV} mg IV Succinylcholine`, 'sux')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === 'sux' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    For severe laryngospasm refractory to 100% O2 positive pressure mask ventilation (pediatric with no IV access: 3–4 mg/kg IM with Atropine 0.02 mg/kg).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1424] border border-emerald-500/30 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-[800] uppercase tracking-wider text-emerald-400">
                      Sugammadex (Rocuronium Reversal)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Immediate vs Routine</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[32px] font-[900] font-mono text-slate-100 tabular-nums">
                      {sugammadexImmediate} <span className="text-[16px] font-[500] text-slate-400">mg (Immediate Rescue)</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(`${sugammadexImmediate} mg IV Sugammadex`, 'sugam')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === 'sugam' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    Immediate reversal 3 min post-1.2 mg/kg Rocuronium: <strong className="text-emerald-300 font-mono">{sugammadexImmediate} mg (16 mg/kg)</strong>. Routine T2 reversal: <strong className="text-slate-200 font-mono">{sugammadexRoutine} mg (2 mg/kg)</strong>.
                  </p>
                </div>
              </>
            )}

            {pushDoseSubTab === 'mh' && (
              <div className="md:col-span-2 p-6 rounded-2xl bg-[#0e1424] border border-rose-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-rose-500" />
                    <h3 className="text-[16px] font-[800] text-rose-200">
                      Malignant Hyperthermia (MH) Acute Protocol
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-[700] bg-rose-500/20 text-rose-300 font-mono">
                    Initial Bolus: 2.5 mg/kg IV push
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider mb-1">
                      Dantrolene Total Dose
                    </div>
                    <div className="text-[28px] font-[900] font-mono text-rose-300 tabular-nums">
                      {dantroleneBolusMg} mg
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider mb-1">
                      Vials Needed (20mg/vial)
                    </div>
                    <div className="text-[28px] font-[900] font-mono text-amber-300 tabular-nums">
                      {dantroleneVials} vials
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider mb-1">
                      Sterile Water Required
                    </div>
                    <div className="text-[28px] font-[900] font-mono text-cyan-300 tabular-nums">
                      {dantroleneWaterMl} mL
                    </div>
                  </div>
                </div>

                <div className="text-[12px] text-slate-300 space-y-1.5 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <p>1. <strong>Stop volatile anesthetics &amp; succinylcholine immediately</strong>. Turn on 100% O2 high flow (&ge; 10 L/min); hyperventilate to clear CO2.</p>
                  <p>2. Reconstitute each 20 mg Dantrolene vial with 60 mL sterile water (no bacteriostatic preservative). Shake until clear.</p>
                  <p>3. Repeat Dantrolene 2.5 mg/kg every 5–10 minutes until hypermetabolism resolves (max cumulative 10 mg/kg).</p>
                  <p>4. Active cooling: Cold IV saline, iced gastric lavage, surface ice packs. Stop cooling at 38°C to avoid hypothermia.</p>
                </div>
              </div>
            )}

            {pushDoseSubTab === 'last' && (
              <div className="md:col-span-2 p-6 rounded-2xl bg-[#0e1424] border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-400" />
                    <h3 className="text-[16px] font-[800] text-blue-200">
                      Local Anesthetic Systemic Toxicity (LAST) — 20% Lipid Rescue
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-[700] bg-blue-500/20 text-blue-300 font-mono">
                    ASRA Protocol
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider mb-1">
                      Initial 20% Lipid Bolus (1.5 mL/kg)
                    </div>
                    <div className="text-[28px] font-[900] font-mono text-blue-300 tabular-nums">
                      {lipidBolusMl} mL over 1 min
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] font-[700] text-slate-400 uppercase tracking-wider mb-1">
                      Continuous Infusion (0.25 mL/kg/min)
                    </div>
                    <div className="text-[28px] font-[900] font-mono text-emerald-300 tabular-nums">
                      {lipidInfusionMlPerHr} mL/hr
                    </div>
                  </div>
                </div>

                <div className="text-[12px] text-slate-300 space-y-1.5 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <p>• Repeat bolus once or twice for persistent cardiovascular collapse; can increase infusion to 0.5 mL/kg/min.</p>
                  <p>• Avoid Vasopressin, Calcium channel blockers, Beta blockers, or local anesthetics.</p>
                  <p>• If Epinephrine used during CPR: use low doses (&lt; 1 mcg/kg, e.g. 10–50 mcg boluses) to prevent exacerbating arrhythmia.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ACLS CPR TIMER */}
      {selectedModule === 'acls_cpr' && <ACLSCycleTimer />}

      {/* TAB 3: PEDIATRIC BROSELOW */}
      {selectedModule === 'broselow' && <BroselowTapePicker />}

      {/* TAB 4: STATUS EPILEPTICUS */}
      {selectedModule === 'status_epilepticus' && <StatusEpilepticusTimeline />}

      {/* TAB 5: HYPERTENSIVE CRISIS */}
      {selectedModule === 'hypertensive_crisis' && <HypertensiveCrisisEngine />}
    </div>
  );
}
