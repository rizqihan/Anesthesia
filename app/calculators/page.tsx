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

  // MAP State
  const [mapSbp, setMapSbp] = useState('');
  const [mapDbp, setMapDbp] = useState('');
  const [mapResult, setMapResult] = useState<string | null>(null);

  // Pediatric ETT State
  const [ettAge, setEttAge] = useState('');
  const [ettResult, setEttResult] = useState<null | { uncuffed: string; cuffed: string; depth: string }>(null);

  // ABL State
  const [ablWeight, setAblWeight] = useState('');
  const [ablPatientType, setAblPatientType] = useState<'premature_neonate' | 'term_neonate' | 'infant' | 'adult_male' | 'adult_female'>('adult_male');
  const [ablHctInit, setAblHctInit] = useState('');
  const [ablHctTarget, setAblHctTarget] = useState('');
  const [ablResult, setAblResult] = useState<null | { ebv: string; abl: string }>(null);

  // P/F Ratio State
  const [pfPao2, setPfPao2] = useState('');
  const [pfFio2, setPfFio2] = useState('');
  const [pfResult, setPfResult] = useState<null | { ratio: string; severity: string; color: string }>(null);

  // Alveolar Gas State
  const [agFio2, setAgFio2] = useState('21'); // Default to room air
  const [agPaco2, setAgPaco2] = useState('40'); // Default normal PaCO2
  const [agPatm, setAgPatm] = useState('760'); // Default at sea level
  const [agRq, setAgRq] = useState('0.8'); // Default normal RQ
  const [agPao2, setAgPao2] = useState(''); // Optional arterial PaO2 for A-a gradient
  const [agResult, setAgResult] = useState<null | { pao2: string; aaGradient: string | null }>(null);

  // Fluid Maintenance State
  const [fmWeight, setFmWeight] = useState('');
  const [fmResult, setFmResult] = useState<string | null>(null);

  // Holliday-Segar State
  const [hsWeight, setHsWeight] = useState('');
  const [hsDripFactor, setHsDripFactor] = useState('20');
  const [hsResult, setHsResult] = useState<null | { daily: string; hourly: string; tpm: string }>(null);

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

  const calculateMAP = () => {
    const sbp = parseFloat(mapSbp);
    const dbp = parseFloat(mapDbp);
    if (sbp > 0 && dbp > 0) {
      const map = dbp + (sbp - dbp) / 3;
      setMapResult(map.toFixed(1));
    }
  };

  const calculateETT = () => {
    const age = parseFloat(ettAge);
    if (age > 0) {
      const uncuffed = age / 4 + 4;
      const cuffed = age / 4 + 3.5;
      const depth = age / 2 + 12;
      setEttResult({
        uncuffed: uncuffed.toFixed(1),
        cuffed: cuffed.toFixed(1),
        depth: depth.toFixed(1)
      });
    }
  };

  const EBV_FACTORS = {
    premature_neonate: 95,
    term_neonate: 85,
    infant: 80,
    adult_male: 75,
    adult_female: 65,
  };

  const calculateABL = () => {
    const w = parseFloat(ablWeight);
    const hcti = parseFloat(ablHctInit);
    const hctf = parseFloat(ablHctTarget);
    if (w > 0 && hcti > 0 && hctf > 0 && hcti > hctf) {
      const ebvFactor = EBV_FACTORS[ablPatientType];
      const ebv = w * ebvFactor;
      const abl = ebv * ((hcti - hctf) / hcti);
      setAblResult({
        ebv: ebv.toFixed(0),
        abl: abl.toFixed(0)
      });
    }
  };

  const calculatePF = () => {
    const pao2 = parseFloat(pfPao2);
    const fio2 = parseFloat(pfFio2);
    if (pao2 > 0 && fio2 > 0) {
      const fio2Fraction = fio2 / 100;
      const ratio = pao2 / fio2Fraction;
      
      let severity = '';
      let color = '#34d399'; // Normal
      if (ratio < 100) {
        severity = t.severe_ards;
        color = '#f43f5e'; // Red
      } else if (ratio < 200) {
        severity = t.moderate_ards;
        color = '#fbbf24'; // Amber
      } else if (ratio < 300) {
        severity = t.mild_ards;
        color = '#60a5fa'; // Blue
      } else {
        severity = t.none_normal;
        color = '#34d399'; // Green
      }
      
      setPfResult({
        ratio: ratio.toFixed(0),
        severity,
        color
      });
    }
  };

  const calculateAlveolarGas = () => {
    const fio2 = parseFloat(agFio2);
    const paco2 = parseFloat(agPaco2);
    const patm = parseFloat(agPatm);
    const rq = parseFloat(agRq);
    
    if (fio2 > 0 && paco2 > 0 && patm > 0 && rq > 0) {
      const pao2Val = (fio2 / 100) * (patm - 47) - (paco2 / rq);
      
      let aaGradientVal: string | null = null;
      const arterialPao2 = parseFloat(agPao2);
      if (arterialPao2 > 0) {
        const gradient = pao2Val - arterialPao2;
        aaGradientVal = gradient.toFixed(1);
      }
      
      setAgResult({
        pao2: pao2Val.toFixed(1),
        aaGradient: aaGradientVal
      });
    }
  };

  const calculateFluidMaintenance = () => {
    const w = parseFloat(fmWeight);
    if (w > 0) {
      let rate = 0;
      if (w <= 10) {
        rate = w * 4;
      } else if (w <= 20) {
        rate = 40 + (w - 10) * 2;
      } else {
        rate = 60 + (w - 20) * 1;
      }
      setFmResult(rate.toFixed(0));
    }
  };

  const calculateHS = () => {
    const w = parseFloat(hsWeight);
    const df = parseFloat(hsDripFactor);
    if (w > 0 && df > 0) {
      let daily = 0;
      if (w <= 10) {
        daily = w * 100;
      } else if (w <= 20) {
        daily = 1000 + (w - 10) * 50;
      } else {
        daily = 1500 + (w - 20) * 20;
      }
      const hourly = daily / 24;
      const tpm = (hourly * df) / 60;
      setHsResult({
        daily: daily.toFixed(0),
        hourly: hourly.toFixed(1),
        tpm: tpm.toFixed(1)
      });
    }
  };

  const tabs = [
    { id: 'bmi', label: t.bmi },
    { id: 'ibw', label: t.ibw_abw },
    { id: 'cg', label: t.creatinine_clearance },
    { id: 'egfr', label: t.egfr_calculator },
    { id: 'map', label: t.map },
    { id: 'ett', label: t.pediatric_ett },
    { id: 'abl', label: t.allowable_blood_loss },
    { id: 'pf', label: t.pf_ratio },
    { id: 'ag', label: t.alveolar_gas },
    { id: 'fm', label: t.fluid_maintenance },
    { id: 'hs', label: t.holliday_segar },
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

      {/* Calculator Selector Dropdown */}
      <div className="space-y-1.5">
        <label className={labelClass}>{t.select_calculator}</label>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="glass-input w-full px-3 py-2.5 text-[13px] font-[600]"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Card */}
      <div className="glass-card-static overflow-hidden">
        <div className="p-5">
          <AnimatePresence mode="wait">
            {activeTab === 'bmi' && (
              <motion.div key="bmi" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
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
              <motion.div key="ibw" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
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
              <motion.div key="cg" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
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
              <motion.div key="egfr" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.age}</label><input type="number" value={egfrAge} onChange={e => setEgfrAge(e.target.value)} className={inputClass} placeholder="e.g. 50" /></div>
                  <div><label className={labelClass}>{t.gender}</label><GenderToggle value={egfrGender} onChange={setEgfrGender} maleLabel={t.male} femaleLabel={t.female} /></div>
                </div>
                <div><label className={labelClass}>{t.serum_creatinine}</label><input type="number" value={egfrCr} onChange={e => setEgfrCr(e.target.value)} className={inputClass} placeholder="e.g. 1.2" /></div>
                <button type="button" onClick={calculateEgfr} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {egfrResult && <BigResult label="eGFR (mL/min/1.73m²)" value={egfrResult} color="#a78bfa" />}
              </motion.div>
            )}

            {activeTab === 'map' && (
              <motion.div key="map" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.systolic_bp}</label><input type="number" value={mapSbp} onChange={e => setMapSbp(e.target.value)} className={inputClass} placeholder="e.g. 120" /></div>
                  <div><label className={labelClass}>{t.diastolic_bp}</label><input type="number" value={mapDbp} onChange={e => setMapDbp(e.target.value)} className={inputClass} placeholder="e.g. 80" /></div>
                </div>
                <button type="button" onClick={calculateMAP} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {mapResult && <BigResult label={t.map} value={mapResult} unit="mmHg" color="#60a5fa" />}
              </motion.div>
            )}

            {activeTab === 'ett' && (
              <motion.div key="ett" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div><label className={labelClass}>{t.age}</label><input type="number" value={ettAge} onChange={e => setEttAge(e.target.value)} className={inputClass} placeholder="e.g. 6" min="1" max="18" step="any" /></div>
                <button type="button" onClick={calculateETT} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {ettResult && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <BigResult label={t.uncuffed_ett} value={ettResult.uncuffed} unit="mm ID" color="#38bdf8" />
                    <BigResult label={t.cuffed_ett} value={ettResult.cuffed} unit="mm ID" color="#34d399" />
                    <BigResult label={t.ett_depth} value={ettResult.depth} unit="cm" color="#fbbf24" />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'abl' && (
              <motion.div key="abl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.weight}</label><input type="number" value={ablWeight} onChange={e => setAblWeight(e.target.value)} className={inputClass} placeholder="e.g. 70" /></div>
                  <div>
                    <label className={labelClass}>{t.patient_category}</label>
                    <select value={ablPatientType} onChange={e => setAblPatientType(e.target.value as any)} className={`${inputClass} bg-slate-900 border-slate-700`}>
                      <option value="adult_male">{t.adult_male}</option>
                      <option value="adult_female">{t.adult_female}</option>
                      <option value="infant">{t.infant}</option>
                      <option value="term_neonate">{t.term_neonate}</option>
                      <option value="premature_neonate">{t.premature_neonate}</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.initial_hct}</label><input type="number" value={ablHctInit} onChange={e => setAblHctInit(e.target.value)} className={inputClass} placeholder="e.g. 45" /></div>
                  <div><label className={labelClass}>{t.target_hct}</label><input type="number" value={ablHctTarget} onChange={e => setAblHctTarget(e.target.value)} className={inputClass} placeholder="e.g. 30" /></div>
                </div>
                <button type="button" onClick={calculateABL} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {ablResult && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BigResult label={t.estimated_blood_volume} value={ablResult.ebv} unit="mL" color="#34d399" />
                    <BigResult label={t.allowable_blood_loss_result} value={ablResult.abl} unit="mL" color="#fb7185" />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'pf' && (
              <motion.div key="pf" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.pao2}</label><input type="number" value={pfPao2} onChange={e => setPfPao2(e.target.value)} className={inputClass} placeholder="e.g. 80" /></div>
                  <div><label className={labelClass}>{t.fio2}</label><input type="number" value={pfFio2} onChange={e => setPfFio2(e.target.value)} className={inputClass} placeholder="e.g. 40" /></div>
                </div>
                <button type="button" onClick={calculatePF} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {pfResult && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BigResult label={t.pf_ratio_result} value={pfResult.ratio} color={pfResult.color} />
                    <BigResult label={t.ards_severity} value={pfResult.severity} color={pfResult.color} />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'ag' && (
              <motion.div key="ag" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>{t.fio2}</label><input type="number" value={agFio2} onChange={e => setAgFio2(e.target.value)} className={inputClass} placeholder="e.g. 21" /></div>
                  <div><label className={labelClass}>{t.paco2}</label><input type="number" value={agPaco2} onChange={e => setAgPaco2(e.target.value)} className={inputClass} placeholder="e.g. 40" /></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={labelClass}>{t.patm}</label><input type="number" value={agPatm} onChange={e => setAgPatm(e.target.value)} className={inputClass} placeholder="e.g. 760" /></div>
                  <div><label className={labelClass}>{t.rq}</label><input type="number" value={agRq} onChange={e => setAgRq(e.target.value)} className={inputClass} placeholder="e.g. 0.8" step="0.1" /></div>
                  <div><label className={labelClass}>{t.pao2}</label><input type="number" value={agPao2} onChange={e => setAgPao2(e.target.value)} className={inputClass} placeholder="e.g. 90" /></div>
                </div>
                <button type="button" onClick={calculateAlveolarGas} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {agResult && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BigResult label={t.alveolar_pao2} value={agResult.pao2} unit="mmHg" color="#38bdf8" />
                    {agResult.aaGradient !== null ? (
                      <BigResult label={t.aa_gradient} value={agResult.aaGradient} unit="mmHg" color="#fb7185" />
                    ) : (
                      <div className="result-box flex items-center justify-center text-[11px] text-center" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? 'Enter arterial PaO2 to calculate A-a gradient' : 'Masukkan PaO2 arteri untuk menghitung gradien A-a'}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'fm' && (
              <motion.div key="fm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div><label className={labelClass}>{t.weight}</label><input type="number" value={fmWeight} onChange={e => setFmWeight(e.target.value)} className={inputClass} placeholder="e.g. 25" /></div>
                <button type="button" onClick={calculateFluidMaintenance} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {fmResult && <BigResult label={t.maintenance_fluid_rate} value={fmResult} unit="mL/hr" color="#38bdf8" />}
              </motion.div>
            )}

            {activeTab === 'hs' && (
              <motion.div key="hs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t.weight}</label>
                    <input type="number" value={hsWeight} onChange={e => setHsWeight(e.target.value)} className={inputClass} placeholder="e.g. 25" />
                  </div>
                  <div>
                    <label className={labelClass}>{t.drip_factor}</label>
                    <select value={hsDripFactor} onChange={e => setHsDripFactor(e.target.value)} className={`${inputClass} bg-slate-900 border-slate-700`}>
                      <option value="20">{t.macro_20}</option>
                      <option value="15">{t.macro_15}</option>
                      <option value="60">{t.micro_60}</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={calculateHS} className="btn-primary w-full py-2.5 text-[13px]">{t.calculate}</button>
                {hsResult && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <BigResult label={t.daily_volume} value={hsResult.daily} unit="mL/day" color="#38bdf8" />
                    <BigResult label={t.hourly_rate} value={hsResult.hourly} unit="mL/hr" color="#34d399" />
                    <BigResult label={t.drops_per_minute} value={hsResult.tpm} unit="gtt/min" color="#fbbf24" />
                  </div>
                )}
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
            {activeTab === 'map' && t.info_map}
            {activeTab === 'ett' && t.info_pediatric_ett}
            {activeTab === 'abl' && t.info_allowable_blood_loss}
            {activeTab === 'pf' && t.info_pf_ratio}
            {activeTab === 'ag' && t.info_alveolar_gas}
            {activeTab === 'fm' && t.info_fluid_maintenance}
            {activeTab === 'hs' && t.info_holliday_segar}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
