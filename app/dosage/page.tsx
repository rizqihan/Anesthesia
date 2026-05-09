'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Syringe, WifiOff } from 'lucide-react';
import db from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';

function DosageCalculatorContent() {
  const { language } = useAppStore();
  const t = translations[language];
  const searchParams = useSearchParams();
  const initDrugId = searchParams?.get('drug');

  // Only drugs with dosing info
  const calculableDrugs = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    const drugs = await db.drugs.toArray();
    return drugs.filter(d => Boolean(d.dosing));
  }, []) || [];

  const bestInitialDrug = (initDrugId && calculableDrugs.some(d => d.id === initDrugId)) 
    ? initDrugId 
    : (calculableDrugs[0]?.id || '');

  const [weight, setWeight] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [result, setResult] = useState<{ dose: number, maxReached: boolean } | null>(null);

  const actualSelectedDrug = selectedDrug || bestInitialDrug;
  const drug = calculableDrugs.find(d => d.id === actualSelectedDrug);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (w > 0 && drug && drug.dosing) {
      let calculatedDose = w * drug.dosing.dosePerKg;
      let maxReached = false;
      if (calculatedDose > drug.dosing.maxDose) {
        calculatedDose = drug.dosing.maxDose;
        maxReached = true;
      }
      setResult({ dose: calculatedDose, maxReached });
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.dosage_calculator}</h2>
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
            <WifiOff className="w-3 h-3" />
            <span>{t.offline_capable}</span>
          </span>
        </div>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'Weight-based dosing reference.' : 'Referensi dosis berbasis berat badan.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700">
            {language === 'en' ? 'Calculate Dosage' : 'Hitung Dosis'}
          </div>
          <div className="p-3.5 flex-1 flex flex-col gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {language === 'en' ? 'Select Drug' : 'Pilih Obat'}
              </label>
              <select
                value={actualSelectedDrug}
                onChange={(e) => setSelectedDrug(e.target.value)}
                className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 bg-white"
              >
                {calculableDrugs.map(d => (
                  <option key={d.id} value={d.id}>{d.genericName} ({d.dosing?.dosePerKg} {d.dosing?.unit}/kg)</option>
                ))}
              </select>
              {drug && drug.dosing && (
                <div className="mt-2 text-[12px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">Info: </span> 
                  {language === 'en' ? drug.dosing.notes.en : drug.dosing.notes.id} 
                  <br />
                  <span className="text-[11px] text-slate-400 mt-1 block">Freq: {drug.dosing.frequency} | Max: {drug.dosing.maxDose} {drug.dosing.unit}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.patient_weight}</label>
              <input 
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                placeholder="e.g. 20"
              />
            </div>

            <button 
              onClick={handleCalculate}
              disabled={!weight}
              className="mt-2 w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
            >
              {t.calculate}
            </button>

            {result && (
              <div className="mt-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded text-center">
                <div className="text-[11px] text-slate-500 uppercase font-semibold">
                  {language === 'en' ? 'Recommended Dose' : 'Dosis Rekomendasi'}
                </div>
                <div className="text-[24px] font-bold text-sky-600 flex justify-center items-baseline space-x-1">
                  <span>{result.dose.toFixed(1)}</span>
                  <span className="text-[14px] text-slate-500 font-normal">{drug?.dosing?.unit}</span>
                </div>
                {result.maxReached && (
                  <div className="mt-1 text-[11px] font-semibold text-orange-600 bg-orange-100 rounded px-2 py-0.5 inline-block">
                    {language === 'en' ? 'Maximum adult dose reached' : 'Mencapai batas maksimal dosis'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DosagePage() {
  return (
    <Suspense fallback={<div className="p-4 text-slate-500 text-sm">Loading dosage calculator...</div>}>
      <DosageCalculatorContent />
    </Suspense>
  );
}
