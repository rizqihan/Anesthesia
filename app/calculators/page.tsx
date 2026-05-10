'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Calculator, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const inputClass = "glass-input w-full px-3 py-2.5 text-[13px] font-[500]";
const labelClass = "form-label";

// Extracted outside to prevent remount on parent re-render
function GenderToggle({ value, onChange, maleLabel, femaleLabel }: { value: 'M' | 'F'; onChange: (v: 'M' | 'F') => void; maleLabel: string; femaleLabel: string }) {
  return (
    <div className="gender-toggle">
      {(['M', 'F'] as const).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onChange(g)}
          className={`gender-btn ${value === g ? 'gender-btn-active' : ''}`}
        >
          {g === 'M' ? maleLabel : femaleLabel}
        </button>
      ))}
    </div>
  );
}

function BigResult({ label, value, unit, color }: { label: string; value: string; unit?: string; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="result-box text-center"
    >
      <div className="text-[10px] font-[700] uppercase tracking-[1.5px] mb-2" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-[38px] font-[800] tracking-tight" style={{ color: color || '#60a5fa' }}>
        {value}
        {unit && <span className="text-[16px] font-[400] ml-1.5" style={{ color: 'var(--text-secondary)' }}>{unit}</span>}
      </div>
    </motion.div>
  );
}

export default function CalculatorsPage() {
  const { language } = useAppStore();
  const t = translations[language] as any;

  const [activeTab, setActiveTab] = useState('bmi');

  // BMI State
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<null | { bmi: string; category: string; color: string }>(null);

  // IBW/ABW State
  const [ibwGender, setIbwGender] = useState<'M' | 'F'>('M');
  const [ibwHeight, setIbwHeight] = useState('');
  const [ibwActualWeight, setIbwActualWeight] = useState('');
  const [ibwResult, setIbwResult] = useState<null | { ibw: string; abw: string }>(null);

  // CG State
  const [cgAge, setCgAge] = useState('');
  const [cgWeight, setCgWeight] = useState('');
  const [cgCr, setCgCr] = useState('');
  const [cgGender, setCgGender] = useState<'M' | 'F'>('M');
  const [cgResult, setCgResult] = useState<string | null>(null);

  // eGFR State
  const [egfrAge, setEgfrAge] = useState('');
  const [egfrCr, setEgfrCr] = useState('');
  const [egfrGender, setEgfrGender] = useState<'M' | 'F'>('M');
  const [egfrResult, setEgfrResult] = useState<string | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = '';
      let color = '#60a5fa';
      if (bmi < 18.5) { category = language === 'en' ? 'Underweight' : 'Kekurangan berat badan'; color = '#38bdf8'; }
      else if (bmi < 25) { category = language === 'en' ? 'Normal weight' : 'Normal'; color = '#34d399'; }
      else if (bmi < 30) { category = language === 'en' ? 'Overweight' : 'Kelebihan berat badan'; color = '#fbbf24'; }
      else { category = language === 'en' ? 'Obesity' : 'Obesitas'; color = '#fb7185'; }
      setBmiResult({ bmi: bmi.toFixed(1), category, color });
    }
  };

  const calculateIBW = () => {
    const h = parseFloat(ibwHeight);
    const w = parseFloat(ibwActualWeight);
    if (h > 0 && w > 0) {
      const heightInches = h / 2.54;
      let ibw = (ibwGender === 'M' ? 50.0 : 45.5) + (heightInches > 60 ? 2.3 * (heightInches - 60) : 0);
      const abw = ibw + 0.4 * (w - ibw);
      setIbwResult({ ibw: ibw.toFixed(1), abw: abw.toFixed(1) });
    }
  };

  const calculateCG = () => {
    const age = parseFloat(cgAge), w = parseFloat(cgWeight), cr = parseFloat(cgCr);
    if (age > 0 && w > 0 && cr > 0) {
      let crcl = ((140 - age) * w) / (72 * cr);
      if (cgGender === 'F') crcl *= 0.85;
      setCgResult(crcl.toFixed(1));
    }
  };

  const calculateEgfr = () => {
    const age = parseFloat(egfrAge), cr = parseFloat(egfrCr);
    if (age > 0 && cr > 0) {
      const k = egfrGender === 'F' ? 0.7 : 0.9;
      const alpha = egfrGender === 'F' ? -0.241 : -0.302;
      let egfr = 142 * Math.pow(Math.min(cr / k, 1), alpha) * Math.pow(Math.max(cr / k, 1), -1.2) * Math.pow(0.9938, age);
      if (egfrGender === 'F') egfr *= 1.012;
      setEgfrResult(egfr.toFixed(1));
    }
  };

  const tabs = [
    { id: 'bmi', label: t.bmi },
    { id: 'ibw', label: t.ibw_abw },
    { id: 'cg', label: t.creatinine_clearance },
    { id: 'egfr', label: t.egfr_calculator },
  ];

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="icon-box" style={{ background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)', boxShadow: '0 0 16px rgba(59,130,246,0.35)' }}>
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.medical_calculators}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="badge-offline"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-[12px] font-[600] transition-all ${activeTab === tab.id ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="glass-card-static overflow-hidden">
        <div className="section-header">
          <span className="section-header-label">{tabs.find(item => item.id === activeTab)?.label}</span>
        </div>
        <div className="p-5">
          <AnimatePresence mode="wait">
            {activeTab === 'bmi' && (
              <motion.div key="bmi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.weight}</label><input type="number" value={bmiWeight} onChange={e => setBmiWeight(e.target.value)} className={inputClass} placeholder="e.g. 65" /></div>
                  <div><label className={labelClass}>{t.height}</label><input type="number" value={bmiHeight} onChange={e => setBmiHeight(e.target.value)} className={inputClass} placeholder="e.g. 170" /></div>
                </div>
                <button type="button" onClick={calculateBMI} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {bmiResult && <BigResult label="BMI" value={bmiResult.bmi} color={bmiResult.color} />}
                {bmiResult && (
                  <div className="text-center text-[13px] font-[700] mt-1" style={{ color: bmiResult.color }}>{bmiResult.category}</div>
                )}
              </motion.div>
            )}

            {activeTab === 'ibw' && (
              <motion.div key="ibw" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex flex-col gap-4">
                <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{t.bmi_info}</p>
                <div><label className={labelClass}>{t.gender}</label><GenderToggle value={ibwGender} onChange={setIbwGender} maleLabel={t.male} femaleLabel={t.female} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.weight}</label><input type="number" value={ibwActualWeight} onChange={e => setIbwActualWeight(e.target.value)} className={inputClass} placeholder="e.g. 80" /></div>
                  <div><label className={labelClass}>{t.height}</label><input type="number" value={ibwHeight} onChange={e => setIbwHeight(e.target.value)} className={inputClass} placeholder="e.g. 170" /></div>
                </div>
                <button type="button" onClick={calculateIBW} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {ibwResult && (
                  <div className="grid grid-cols-2 gap-3">
                    <BigResult label={t.ideal_body_weight} value={ibwResult.ibw} unit="kg" color="#34d399" />
                    <BigResult label={t.adjusted_body_weight} value={ibwResult.abw} unit="kg" color="#fbbf24" />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'cg' && (
              <motion.div key="cg" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.age}</label><input type="number" value={cgAge} onChange={e => setCgAge(e.target.value)} className={inputClass} placeholder="e.g. 50" /></div>
                  <div><label className={labelClass}>{t.gender}</label><GenderToggle value={cgGender} onChange={setCgGender} maleLabel={t.male} femaleLabel={t.female} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.weight}</label><input type="number" value={cgWeight} onChange={e => setCgWeight(e.target.value)} className={inputClass} placeholder="e.g. 70" /></div>
                  <div><label className={labelClass}>{t.serum_creatinine}</label><input type="number" value={cgCr} onChange={e => setCgCr(e.target.value)} className={inputClass} placeholder="e.g. 1.2" /></div>
                </div>
                <button type="button" onClick={calculateCG} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {cgResult && <BigResult label="Creatinine Clearance (mL/min)" value={cgResult} color="#38bdf8" />}
              </motion.div>
            )}

            {activeTab === 'egfr' && (
              <motion.div key="egfr" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.age}</label><input type="number" value={egfrAge} onChange={e => setEgfrAge(e.target.value)} className={inputClass} placeholder="e.g. 50" /></div>
                  <div><label className={labelClass}>{t.gender}</label><GenderToggle value={egfrGender} onChange={setEgfrGender} maleLabel={t.male} femaleLabel={t.female} /></div>
                </div>
                <div><label className={labelClass}>{t.serum_creatinine}</label><input type="number" value={egfrCr} onChange={e => setEgfrCr(e.target.value)} className={inputClass} placeholder="e.g. 1.2" /></div>
                <button type="button" onClick={calculateEgfr} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {egfrResult && <BigResult label="eGFR (mL/min/1.73m²)" value={egfrResult} color="#a78bfa" />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Explanation & Pitfalls Card */}
      <motion.div 
        key={`info-${activeTab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="glass-card-static overflow-hidden"
      >
        <div className="section-header">
          <span className="section-header-label">{t.explanation_pitfalls}</span>
        </div>
        <div className="p-5">
          <div className="text-[13px] font-[500] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {activeTab === 'bmi' && t.info_bmi}
            {activeTab === 'ibw' && t.info_ibw}
            {activeTab === 'cg' && t.info_cg}
            {activeTab === 'egfr' && t.info_egfr}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
