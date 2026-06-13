'use client';

import React, { useState, Suspense } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Syringe, WifiOff, AlertTriangle, ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function DosageCalculatorContent() {
  const { language } = useAppStore();
  const t = translations[language];
  const searchParams = useSearchParams();
  const initDrugId = searchParams?.get('drug');

  const calculableDrugs = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    const drugs = await db.drugs.toArray();
    return drugs.filter(d => Boolean(d.dosing));
  }, []) || [];

  const bestInitialDrug = (initDrugId && calculableDrugs.some(d => d.id === initDrugId)) ? initDrugId : (calculableDrugs[0]?.id || '');
  const [weight, setWeight] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [result, setResult] = useState<{ dose: number; maxReached: boolean } | null>(null);

  const actualSelectedDrug = selectedDrug || bestInitialDrug;
  const drug = calculableDrugs.find(d => d.id === actualSelectedDrug);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (w > 0 && drug?.dosing) {
      let dose = w * drug.dosing.dosePerKg;
      let maxReached = false;
      if (dose > drug.dosing.maxDose) { dose = drug.dosing.maxDose; maxReached = true; }
      setResult({ dose, maxReached });
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/">
          <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div className="icon-box" style={{ background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', boxShadow: '0 0 16px rgba(14,165,233,0.35)' }}>
          <Syringe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.dosage_calculator}</h1>
          <span className="badge-offline mt-0.5 inline-flex"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card-static overflow-hidden">
          <div className="section-header">
            <span className="section-header-label">{language === 'en' ? 'Calculate Dosage' : 'Hitung Dosis'}</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <label className="form-label">{language === 'en' ? 'Select Drug' : 'Pilih Obat'}</label>
              <select value={actualSelectedDrug} onChange={(e) => setSelectedDrug(e.target.value)} className="glass-input w-full px-3 py-2.5 text-[13px]">
                {calculableDrugs.map(d => (<option key={d.id} value={d.id}>{d.genericName} ({d.dosing?.dosePerKg} {d.dosing?.unit}/kg)</option>))}
              </select>
              {drug?.dosing && (
                <div className="mt-2 p-3 rounded-lg text-[11px]" style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)' }}>
                  <span className="font-[600]" style={{ color: '#38bdf8' }}>Info: </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? drug.dosing.notes.en : drug.dosing.notes.id}</span>
                  <br />
                  <span style={{ color: 'var(--text-muted)' }}>Freq: {drug.dosing.frequency} | Max: {drug.dosing.maxDose} {drug.dosing.unit}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label">{t.patient_weight}</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="glass-input w-full px-3 py-2.5 text-[13px]" placeholder="e.g. 20" />
            </div>
            <button type="button" onClick={handleCalculate} disabled={!weight} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-card-static p-6 text-center">
                <div className="text-[10px] font-[700] uppercase tracking-[1.5px] mb-2" style={{ color: 'var(--text-muted)' }}>
                  {language === 'en' ? 'Recommended Dose' : 'Dosis Rekomendasi'}
                </div>
                <div className="text-[48px] font-[800] tracking-tight" style={{ color: '#38bdf8' }}>
                  {result.dose.toFixed(1)}
                  <span className="text-[18px] font-[400] ml-2" style={{ color: 'var(--text-secondary)' }}>{drug?.dosing?.unit}</span>
                </div>
                {result.maxReached && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-[600]" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Maximum dose reached' : 'Mencapai batas maksimal'}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {!result && (
            <div className="glass-card-static p-6 flex items-center justify-center min-h-[160px]" style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'Result will appear here' : 'Hasil akan muncul di sini'}</p>
            </div>
          )}
        </div>
      </div>
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
