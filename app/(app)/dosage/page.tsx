'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Syringe, WifiOff, AlertTriangle, ArrowLeft, Copy, Check, Activity, Zap, Info, ShieldCheck } from 'lucide-react';
import db from '@/lib/db';
import { DRUG_DB, type Drug } from '@/lib/drugs';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SyringePumpTitrator from '@/components/infusion/SyringePumpTitrator';

interface DosageCalcResult {
  drugId: string;
  weight: number;
  rawDose: number;
  dose: number;
  maxReached: boolean;
}

function DosageCalculatorContent() {
  const { language, activeCase } = useAppStore();
  const t = translations[language];
  const searchParams = useSearchParams();
  const initDrugId = searchParams?.get('drug');
  const initMode = searchParams?.get('mode');

  const [dosageMode, setDosageMode] = useState<'bolus' | 'infusion'>(
    initMode === 'infusion' ? 'infusion' : 'bolus'
  );

  const liveDrugs = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    const drugs = await db.drugs.toArray();
    return drugs.filter(d => Boolean(d.dosing) && d.dosing.unit !== 'vol%');
  }, []);

  const calculableDrugs = useMemo(() => {
    if (liveDrugs && liveDrugs.length > 0) return liveDrugs;
    return DRUG_DB.filter(d => Boolean(d.dosing) && d.dosing.unit !== 'vol%');
  }, [liveDrugs]);

  const bestInitialDrug = (initDrugId && calculableDrugs.some(d => d.id === initDrugId)) ? initDrugId : (calculableDrugs[0]?.id || '');
  const [weight, setWeight] = useState(activeCase.patientWeight || '70');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [copied, setCopied] = useState(false);

  const actualSelectedDrug = selectedDrug || bestInitialDrug;
  const drug = calculableDrugs.find(d => d.id === actualSelectedDrug);

  // Synchronize calculation reactively via useMemo (zero cascading renders, guaranteed consistency)
  const displayedResult = useMemo<DosageCalcResult | null>(() => {
    const w = parseFloat(weight);
    if (!drug?.dosing || !(w > 0)) return null;

    const rawDose = +(w * drug.dosing.dosePerKg).toFixed(2);
    const maxDose = drug.dosing.maxDose;
    const maxReached = typeof maxDose === 'number' && maxDose > 0 && rawDose >= maxDose;
    const finalDose = maxReached ? maxDose : rawDose;

    return {
      drugId: drug.id,
      weight: w,
      rawDose,
      dose: finalDose,
      maxReached,
    };
  }, [weight, drug]);

  const handleDrugChange = (newDrugId: string) => {
    setSelectedDrug(newDrugId);
  };

  const handleWeightChange = (newWeight: string) => {
    setWeight(newWeight);
  };

  const adjustWeight = (delta: number) => {
    const current = parseFloat(weight) || 70;
    const nextVal = Math.max(1, Math.min(300, +(current + delta).toFixed(1)));
    setWeight(nextVal.toString());
  };

  const handleCopy = () => {
    if (displayedResult && drug?.dosing) {
      navigator.clipboard.writeText(
        `${displayedResult.dose.toFixed(1)} ${drug.dosing.unit} (${drug.genericName}) — Patient ${displayedResult.weight}kg`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* ─── Hero Header & Mode Switcher ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-100 dark:bg-[#0c121e]/80 hover:bg-slate-200 dark:hover:bg-white/5 transition-all text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          </Link>
          <div className="icon-box" style={{ background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', boxShadow: '0 0 16px rgba(14,165,233,0.35)' }}>
            <Syringe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {language === 'en' ? 'Drug Dosage & Syringe Infusion Suite' : 'Kalkulator Dosis & Infus Syringe'}
            </h1>
            <span className="badge-offline mt-0.5 inline-flex"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
          </div>
        </div>

        {/* Segmented Mode Selector */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 dark:bg-slate-900/80 dark:border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDosageMode('bolus')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
              dosageMode === 'bolus'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Single Bolus Dose' : 'Dosis Bolus'}</span>
          </button>
          <button
            type="button"
            onClick={() => setDosageMode('infusion')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
              dosageMode === 'infusion'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Syringe Pump Titrator' : 'Titrator Pompa Infus'}</span>
          </button>
        </div>
      </div>

      {/* ─── Mode Content ─── */}
      {dosageMode === 'infusion' ? (
        <SyringePumpTitrator />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs dark:shadow-none">
            <div className="section-header">
              <span className="section-header-label">{language === 'en' ? 'Calculate Dosage' : 'Hitung Dosis'}</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="form-label">{language === 'en' ? 'Select Drug' : 'Pilih Obat'}</label>
                <select 
                  value={actualSelectedDrug} 
                  onChange={(e) => handleDrugChange(e.target.value)} 
                  className="glass-input w-full px-3 py-2.5 text-[13px] bg-white dark:bg-[#0a0f1d] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                >
                  {calculableDrugs.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.genericName} ({d.dosing?.dosePerKg} {d.dosing?.unit}/kg)
                    </option>
                  ))}
                </select>

                {drug?.dosing && (
                  <div className="mt-2.5 p-3 rounded-xl text-[11px] space-y-2 bg-sky-50 border border-sky-200 dark:bg-sky-500/10 dark:border-sky-500/20">
                    <div>
                      <span className="font-[700] text-sky-800 dark:text-[#38bdf8]">Info: </span>
                      <span className="text-slate-700 dark:text-[var(--text-secondary)]">
                        {language === 'en' ? drug.dosing.notes.en : drug.dosing.notes.id}
                      </span>
                    </div>

                    {(drug.dosing.bolusDose || drug.dosing.infusionDose) && (
                      <div className="text-[10.5px] border-t border-sky-200 dark:border-sky-500/20 pt-1.5 space-y-1">
                        {drug.dosing.bolusDose && (
                          <div>
                            <span className="font-bold text-sky-900 dark:text-sky-300">💉 Bolus / Oral Regimen: </span>
                            <span className="text-slate-800 dark:text-slate-200 font-[500]">{drug.dosing.bolusDose}</span>
                          </div>
                        )}
                        {drug.dosing.infusionDose && (
                          <div>
                            <span className="font-bold text-indigo-900 dark:text-indigo-300">💧 Infusion: </span>
                            <span className="text-slate-800 dark:text-slate-200 font-[500]">{drug.dosing.infusionDose}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-400 text-[10px] pt-1 border-t border-sky-200/80 dark:border-white/[0.04]">
                      <span className="font-[600]">Freq: {drug.dosing.frequency}</span>
                      <span className="font-[800] text-slate-900 dark:text-slate-200">Max Single: {drug.dosing.maxDose} {drug.dosing.unit}</span>
                      {drug.onset && <span>⚡ Onset: {drug.onset}</span>}
                      {drug.duration && <span>⏱️ Duration: {drug.duration}</span>}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="form-label mb-0">{t.patient_weight}</label>
                  <div className="flex items-center gap-1">
                    {[-5, -1, 1, 5].map((delta) => (
                      <motion.button
                        key={delta}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => adjustWeight(delta)}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-[700] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-white/[0.04] dark:hover:bg-white/10 dark:border-white/10 dark:text-slate-300 cursor-pointer"
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => handleWeightChange(e.target.value)} 
                  className="glass-input w-full px-3 py-2.5 text-[14px] font-mono font-[700] bg-white dark:bg-[#0a0f1d] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white" 
                  placeholder="e.g. 70" 
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Doses recalculate reactively and clamp strictly to maximum safety limits.'
                    : 'Dosis terhitung reaktif dan otomatis dibatasi batas aman maksimal.'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {displayedResult && drug?.dosing && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 text-center relative group bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xs dark:shadow-none"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy dose to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </motion.button>

                  <div className="text-[10px] font-[800] uppercase tracking-[1.5px] mb-2 text-slate-500 dark:text-[var(--text-muted)]">
                    {language === 'en' ? 'Recommended Clinical Dose' : 'Dosis Rekomendasi Klinis'}
                  </div>

                  {/* Main Recommended Value */}
                  <div className="text-[48px] font-[800] tracking-tight font-mono tabular-nums text-sky-600 dark:text-[#38bdf8] leading-none mb-2">
                    {displayedResult.dose.toFixed(1)}
                    <span className="text-[18px] font-[500] ml-2 text-slate-600 dark:text-[var(--text-secondary)]">{drug.dosing.unit}</span>
                  </div>

                  {/* Mathematical Formula Transparency */}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-white/10">
                    <span>
                      {displayedResult.weight} kg × {drug.dosing.dosePerKg} {drug.dosing.unit}/kg = {displayedResult.rawDose.toFixed(1)} {drug.dosing.unit}
                    </span>
                  </div>

                  {/* Safety Cap Badge */}
                  {displayedResult.maxReached && (
                    <div className="mt-3.5 flex flex-col items-center gap-1 p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30 text-[11.5px]">
                      <div className="flex items-center gap-1.5 font-[800]">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>
                          {language === 'en'
                            ? `CAPPED AT MAXIMUM DOSE (${drug.dosing.maxDose} ${drug.dosing.unit})`
                            : `DIBATASI PADA DOSIS MAKSIMAL (${drug.dosing.maxDose} ${drug.dosing.unit})`}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-amber-800/90 dark:text-amber-300/80">
                        {language === 'en'
                          ? `Raw weight formula yields ${displayedResult.rawDose.toFixed(1)} ${drug.dosing.unit}, clamped to single dose ceiling for patient safety.`
                          : `Perhitungan berat badan menghasilkan ${displayedResult.rawDose.toFixed(1)} ${drug.dosing.unit}, dibatasi batas aman demi keselamatan pasien.`}
                      </p>
                    </div>
                  )}

                  {/* Adult Oral Regimen Helper if Applicable */}
                  {displayedResult.weight >= 40 && drug.dosing.bolusDose && (
                    <div className="mt-3 text-left p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 dark:bg-white/[0.02] dark:border-white/[0.06] text-[10.5px] text-slate-600 dark:text-slate-400">
                      <span className="font-[700] text-slate-800 dark:text-slate-200">Standard Adult Practice: </span>
                      <span>{drug.dosing.bolusDose}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!displayedResult && (
              <div className="p-6 flex items-center justify-center min-h-[160px] rounded-2xl bg-white dark:bg-[#0c1222] border border-dashed border-slate-200 dark:border-white/[0.08] shadow-xs dark:shadow-none">
                <p className="text-[12px] text-slate-500 dark:text-[var(--text-muted)]">
                  {language === 'en' ? 'Enter patient weight to compute dose' : 'Masukkan berat pasien untuk menghitung dosis'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DosagePage() {
  return (
    <Suspense fallback={<div className="p-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>Loading...</div>}>
      <DosageCalculatorContent />
    </Suspense>
  );
}
