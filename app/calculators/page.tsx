'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Calculator, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CalculatorsPage() {
  const { language } = useAppStore();
  const t = translations[language] as any;

  const [activeTab, setActiveTab] = useState('bmi');

  // BMI State
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<null | { bmi: string, category: string }>(null);

  // IBW/ABW State
  const [ibwGender, setIbwGender] = useState<'M' | 'F'>('M');
  const [ibwHeight, setIbwHeight] = useState('');
  const [ibwActualWeight, setIbwActualWeight] = useState('');
  const [ibwResult, setIbwResult] = useState<null | { ibw: string, abw: string }>(null);

  // Cockcroft-Gault State
  const [cgAge, setCgAge] = useState('');
  const [cgWeight, setCgWeight] = useState('');
  const [cgCr, setCgCr] = useState('');
  const [cgGender, setCgGender] = useState<'M' | 'F'>('M');
  const [cgResult, setCgResult] = useState<string | null>(null);

  // eGFR (CKD-EPI) State
  const [egfrAge, setEgfrAge] = useState('');
  const [egfrCr, setEgfrCr] = useState('');
  const [egfrGender, setEgfrGender] = useState<'M' | 'F'>('M');
  const [egfrResult, setEgfrResult] = useState<string | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100; // cm to m
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = '';
      if (bmi < 18.5) category = language === 'en' ? 'Underweight' : 'Kekurangan berat badan';
      else if (bmi >= 18.5 && bmi < 24.9) category = language === 'en' ? 'Normal weight' : 'Normal';
      else if (bmi >= 25 && bmi < 29.9) category = language === 'en' ? 'Overweight' : 'Kelebihan berat badan';
      else category = language === 'en' ? 'Obesity' : 'Obesitas';
      
      setBmiResult({ bmi: bmi.toFixed(1), category });
    }
  };

  const calculateIBW = () => {
    const h = parseFloat(ibwHeight);
    const w = parseFloat(ibwActualWeight);
    if (h > 0 && w > 0) {
      let ibw = 0;
      const heightInches = (h / 2.54);
      if (heightInches > 60) {
        ibw = (ibwGender === 'M' ? 50.0 : 45.5) + 2.3 * (heightInches - 60);
      } else {
        ibw = ibwGender === 'M' ? 50.0 : 45.5;
      }
      
      const abw = ibw + 0.4 * (w - ibw);

      setIbwResult({
        ibw: ibw.toFixed(1),
        abw: abw.toFixed(1)
      });
    }
  };

  const calculateCG = () => {
    const age = parseFloat(cgAge);
    const w = parseFloat(cgWeight);
    const cr = parseFloat(cgCr);
    
    if (age > 0 && w > 0 && cr > 0) {
      let crcl = ((140 - age) * w) / (72 * cr);
      if (cgGender === 'F') {
        crcl = crcl * 0.85;
      }
      setCgResult(crcl.toFixed(1));
    }
  };

  const calculateEgfr = () => {
    const age = parseFloat(egfrAge);
    const cr = parseFloat(egfrCr);

    if (age > 0 && cr > 0) {
      // 2021 CKD-EPI without race
      const k = egfrGender === 'F' ? 0.7 : 0.9;
      const alpha = egfrGender === 'F' ? -0.241 : -0.302;
      const min = Math.min(cr / k, 1);
      const max = Math.max(cr / k, 1);
      
      let egfr = 142 * Math.pow(min, alpha) * Math.pow(max, -1.200) * Math.pow(0.9938, age);
      if (egfrGender === 'F') egfr *= 1.012;
      
      setEgfrResult(egfr.toFixed(1));
    }
  };

  const tabs = [
    { id: 'bmi', label: t.bmi },
    { id: 'ibw', label: t.ibw_abw },
    { id: 'cg', label: t.creatinine_clearance },
    { id: 'egfr', label: t.egfr_calculator }
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.medical_calculators}</h2>
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
            <WifiOff className="w-3 h-3" />
            <span>{t.offline_capable}</span>
          </span>
        </div>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'Clinical decision support calculators.' : 'Kalkulator dukungan keputusan klinis.'}
        </p>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
              activeTab === tab.id 
                ? 'bg-sky-600 text-white shadow-sm' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700">
          {tabs.find(t => t.id === activeTab)?.label}
        </div>
        
        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'bmi' && (
              <motion.div
                key="bmi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.weight}</label>
                    <input 
                      type="number" 
                      value={bmiWeight}
                      onChange={(e) => setBmiWeight(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 65"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.height}</label>
                    <input 
                      type="number" 
                      value={bmiHeight}
                      onChange={(e) => setBmiHeight(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 170"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={calculateBMI}
                  className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none"
                >
                  {t.calculate}
                </button>
                {bmiResult && (
                  <div className="mt-2 p-4 bg-slate-50 border border-dashed border-slate-300 rounded text-center">
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">BMI</div>
                    <div className="text-[32px] font-bold text-slate-900">{bmiResult.bmi}</div>
                    <div className="text-[14px] font-bold text-sky-600 uppercase tracking-wide">{bmiResult.category}</div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'ibw' && (
              <motion.div
                key="ibw"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4"
              >
                <p className="text-[12px] text-slate-500">{t.bmi_info}</p>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.gender}</label>
                  <div className="flex rounded border border-slate-300 p-1 bg-slate-50">
                    <button 
                      onClick={() => setIbwGender('M')}
                      className={`flex-1 py-2 text-[13px] rounded font-semibold transition-colors ${ibwGender === 'M' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {t.male}
                    </button>
                    <button 
                      onClick={() => setIbwGender('F')}
                      className={`flex-1 py-2 text-[13px] rounded font-semibold transition-colors ${ibwGender === 'F' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {t.female}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.weight}</label>
                    <input 
                      type="number" 
                      value={ibwActualWeight}
                      onChange={(e) => setIbwActualWeight(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 65"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.height}</label>
                    <input 
                      type="number" 
                      value={ibwHeight}
                      onChange={(e) => setIbwHeight(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 170"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={calculateIBW}
                  className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none"
                >
                  {t.calculate}
                </button>
                {ibwResult && (
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded text-center">
                      <div className="text-[11px] text-emerald-700 font-semibold mb-1">{t.ideal_body_weight}</div>
                      <div className="text-[20px] font-bold text-emerald-900">{ibwResult.ibw} <span className="text-[14px]">kg</span></div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded text-center">
                      <div className="text-[11px] text-amber-700 font-semibold mb-1">{t.adjusted_body_weight}</div>
                      <div className="text-[20px] font-bold text-amber-900">{ibwResult.abw} <span className="text-[14px]">kg</span></div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'cg' && (
              <motion.div
                key="cg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.age}</label>
                    <input 
                      type="number" 
                      value={cgAge}
                      onChange={(e) => setCgAge(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.gender}</label>
                    <div className="flex rounded border border-slate-300 p-1 bg-slate-50 h-[38px]">
                      <button 
                        onClick={() => setCgGender('M')}
                        className={`flex-1 text-[13px] rounded transition-colors font-semibold ${cgGender === 'M' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {t.male}
                      </button>
                      <button 
                        onClick={() => setCgGender('F')}
                        className={`flex-1 text-[13px] rounded transition-colors font-semibold ${cgGender === 'F' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {t.female}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.weight}</label>
                    <input 
                      type="number" 
                      value={cgWeight}
                      onChange={(e) => setCgWeight(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 70"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.serum_creatinine}</label>
                    <input 
                      type="number" 
                      value={cgCr}
                      onChange={(e) => setCgCr(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 1.2"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={calculateCG}
                  className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none"
                >
                  {t.calculate}
                </button>
                {cgResult && (
                  <div className="mt-2 p-4 bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-between">
                    <div className="text-[12px] text-slate-500 font-semibold uppercase leading-tight">Creatinine Clearance<br/>(mL/min)</div>
                    <div className="text-[32px] font-bold text-slate-900">{cgResult}</div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'egfr' && (
              <motion.div
                key="egfr"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.age}</label>
                    <input 
                      type="number" 
                      value={egfrAge}
                      onChange={(e) => setEgfrAge(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.gender}</label>
                    <div className="flex rounded border border-slate-300 p-1 bg-slate-50 h-[38px]">
                      <button 
                        onClick={() => setEgfrGender('M')}
                        className={`flex-1 text-[13px] rounded transition-colors font-semibold ${egfrGender === 'M' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {t.male}
                      </button>
                      <button 
                        onClick={() => setEgfrGender('F')}
                        className={`flex-1 text-[13px] rounded transition-colors font-semibold ${egfrGender === 'F' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {t.female}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.serum_creatinine}</label>
                  <input 
                    type="number" 
                    value={egfrCr}
                    onChange={(e) => setEgfrCr(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    placeholder="e.g. 1.2"
                  />
                </div>
                
                <button 
                  onClick={calculateEgfr}
                  className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none"
                >
                  {t.calculate}
                </button>
                {egfrResult && (
                  <div className="mt-2 p-4 bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-between">
                    <div className="text-[12px] text-slate-500 font-semibold uppercase leading-tight">eGFR<br/>(mL/min/1.73m²)</div>
                    <div className="text-[32px] font-bold text-slate-900">{egfrResult}</div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

