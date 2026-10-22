'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Baby,
  Activity,
  HeartPulse,
  TrendingUp,
  AlertTriangle,
  Check,
  ShieldCheck,
  Stethoscope,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  calculateWhoGrowth,
  PEDIATRIC_VITAL_NORMS,
  calculateApgarScore,
  calculateSilvermanScore,
  ApgarScoreInput,
  SilvermanScoreInput,
} from '@/lib/pediatricData';

export default function PediatricGrowthSuite() {
  const { language, activeCase } = useAppStore();
  const [subTab, setSubTab] = useState<'growth' | 'vitals' | 'apgar' | 'silverman'>('growth');

  // Growth State
  const [growthAgeMonths, setGrowthAgeMonths] = useState(
    activeCase.patientAge ? (parseInt(activeCase.patientAge, 10) * 12).toString() : '24'
  );
  const [growthSex, setGrowthSex] = useState<'M' | 'F'>(activeCase.patientSex || 'M');
  const [growthWeight, setGrowthWeight] = useState(activeCase.patientWeight || '12.5');
  const [growthHeight, setGrowthHeight] = useState(activeCase.patientHeight || '87');

  const ageM = parseFloat(growthAgeMonths) || 24;
  const wKg = parseFloat(growthWeight) || 12.5;
  const hCm = parseFloat(growthHeight) || 87;
  const bmiVal = hCm > 0 ? +((wKg / ((hCm / 100) * (hCm / 100))).toFixed(1)) : 16.5;

  const weightResult = calculateWhoGrowth('weight', ageM, wKg, growthSex);
  const heightResult = calculateWhoGrowth('height', ageM, hCm, growthSex);
  const bmiResult = calculateWhoGrowth('bmi', ageM, bmiVal, growthSex);

  // APGAR State
  const [apgar, setApgar] = useState<ApgarScoreInput>({
    appearance: 2,
    pulse: 2,
    grimace: 2,
    activity: 2,
    respiration: 2,
  });
  const apgarResult = calculateApgarScore(apgar);

  // Silverman State
  const [silverman, setSilverman] = useState<SilvermanScoreInput>({
    upperChest: 0,
    lowerChest: 0,
    xiphoidRetraction: 0,
    naresDilatation: 0,
    expiratoryGrunt: 0,
  });
  const silvermanResult = calculateSilvermanScore(silverman);

  return (
    <div className="space-y-4">
      {/* Sub-tab Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 p-1 rounded-2xl bg-white/[0.03] border border-white/10 gap-1 shadow-inner">
        {[
          { id: 'growth', label: 'WHO Growth Z-Scores', short: 'WHO Growth', icon: TrendingUp },
          { id: 'vitals', label: 'Age Vital Sign Norms', short: 'Vital Norms', icon: Activity },
          { id: 'apgar', label: 'APGAR Neonatal Score', short: 'APGAR', icon: Baby },
          { id: 'silverman', label: 'Silverman Retractions', short: 'Silverman RDS', icon: Stethoscope },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id as any)}
              className={`py-2 px-2 rounded-xl text-[11px] sm:text-[12px] font-[700] transition-all flex items-center justify-center gap-1.5 min-w-0 ${
                isActive
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate hidden sm:inline">{tab.label}</span>
              <span className="truncate sm:hidden">{tab.short}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* =========================================================
            1. WHO GROWTH Z-SCORES & PERCENTILES
           ========================================================= */}
        {subTab === 'growth' && (
          <motion.div
            key="growth_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="glass-card-static p-5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">
                    WHO Child Growth Standards (0–5 Years)
                  </h3>
                  <p className="text-[11.5px] text-slate-400">
                    International multicentre reference standards for Weight, Height, and BMI-for-Age
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  WHO 2006
                </span>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1">
                    Age (Months)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={growthAgeMonths}
                    onChange={(e) => setGrowthAgeMonths(e.target.value)}
                    className="glass-input w-full px-3 py-2 text-[12.5px]"
                    placeholder="e.g. 24"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1">
                    Sex
                  </label>
                  <div className="flex rounded-xl p-0.5 bg-white/[0.04] border border-white/10 h-[38px] items-center">
                    <button
                      type="button"
                      onClick={() => setGrowthSex('M')}
                      className={`flex-1 py-1 text-[12px] font-[700] rounded-lg transition-colors ${
                        growthSex === 'M' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGrowthSex('F')}
                      className={`flex-1 py-1 text-[12px] font-[700] rounded-lg transition-colors ${
                        growthSex === 'F' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={growthWeight}
                    onChange={(e) => setGrowthWeight(e.target.value)}
                    className="glass-input w-full px-3 py-2 text-[12.5px]"
                    placeholder="e.g. 12.5"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-[700] uppercase tracking-wider text-slate-400 mb-1">
                    Height / Length (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={growthHeight}
                    onChange={(e) => setGrowthHeight(e.target.value)}
                    className="glass-input w-full px-3 py-2 text-[12.5px]"
                    placeholder="e.g. 87"
                  />
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Weight-for-Age */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Weight-for-Age</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                      {weightResult.zScore > 0 ? `+${weightResult.zScore}` : weightResult.zScore}
                    </span>
                    <span className="text-[12px] text-slate-400 font-mono">SD</span>
                  </div>
                  <div className="text-[12px] font-mono text-blue-300">
                    Percentile: <strong>{weightResult.percentile}%</strong>
                  </div>
                  <div className="text-[11px] font-[700] pt-1" style={{ color: weightResult.color }}>
                    {weightResult.classification}
                  </div>
                </div>

                {/* Height-for-Age */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Height-for-Age</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                      {heightResult.zScore > 0 ? `+${heightResult.zScore}` : heightResult.zScore}
                    </span>
                    <span className="text-[12px] text-slate-400 font-mono">SD</span>
                  </div>
                  <div className="text-[12px] font-mono text-blue-300">
                    Percentile: <strong>{heightResult.percentile}%</strong>
                  </div>
                  <div className="text-[11px] font-[700] pt-1" style={{ color: heightResult.color }}>
                    {heightResult.classification}
                  </div>
                </div>

                {/* BMI-for-Age */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-slate-400">BMI-for-Age ({bmiVal})</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[26px] font-[900] font-mono text-slate-100 tabular-nums">
                      {bmiResult.zScore > 0 ? `+${bmiResult.zScore}` : bmiResult.zScore}
                    </span>
                    <span className="text-[12px] text-slate-400 font-mono">SD</span>
                  </div>
                  <div className="text-[12px] font-mono text-blue-300">
                    Percentile: <strong>{bmiResult.percentile}%</strong>
                  </div>
                  <div className="text-[11px] font-[700] pt-1" style={{ color: bmiResult.color }}>
                    {bmiResult.classification}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            2. AGE-STRATIFIED VITAL SIGN NORMS MATRIX
           ========================================================= */}
        {subTab === 'vitals' && (
          <motion.div
            key="vitals_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card-static p-5 border border-white/10 rounded-2xl space-y-4 overflow-hidden"
          >
            <div>
              <h3 className="text-[16px] font-[800] text-slate-100">
                Pediatric & Neonatal Normal Vital Signs Reference
              </h3>
              <p className="text-[11.5px] text-slate-400">
                American Heart Association (PALS) & Nelson Textbook of Pediatrics physiological norms
              </p>
            </div>

            <div className="overflow-x-auto no-scrollbar -mx-5 px-5">
              <table className="w-full text-left text-[11.5px] border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase font-mono tracking-wider">
                    <th className="py-2.5 pr-3">Stage & Age</th>
                    <th className="py-2.5 px-3">Heart Rate (Awake)</th>
                    <th className="py-2.5 px-3">Respiratory Rate</th>
                    <th className="py-2.5 px-3">Blood Pressure (SBP)</th>
                    <th className="py-2.5 pl-3 text-rose-300">Hypotension Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {PEDIATRIC_VITAL_NORMS.map((norm) => (
                    <tr key={norm.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-3 font-[700] text-slate-200">
                        <div>{norm.stageName}</div>
                        <div className="text-[10px] font-normal text-slate-400">{norm.ageRange}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-300">{norm.hrAwake}</td>
                      <td className="py-3 px-3 font-mono text-cyan-300">{norm.rrRange}</td>
                      <td className="py-3 px-3 font-mono text-blue-300">{norm.sbpRange}</td>
                      <td className="py-3 pl-3 font-mono text-rose-400/90 text-[11px]">
                        {norm.hypotensionThresholdSbp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            3. NEONATAL APGAR SCORE
           ========================================================= */}
        {subTab === 'apgar' && (
          <motion.div
            key="apgar_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="glass-card-static p-5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">
                    Neonatal APGAR Score (1 & 5 Minutes)
                  </h3>
                  <p className="text-[11.5px] text-slate-400">
                    Standardized assessment of newborn transition and resuscitation response
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[28px] font-[900] font-mono tabular-nums" style={{ color: apgarResult.color }}>
                    {apgarResult.totalScore} <span className="text-[14px] text-slate-400 font-sans">/ 10</span>
                  </div>
                  <div className="text-[11px] font-[700]" style={{ color: apgarResult.color }}>
                    {apgarResult.interpretation}
                  </div>
                </div>
              </div>

              {/* 5 Parameters */}
              <div className="space-y-3">
                {[
                  {
                    key: 'appearance' as const,
                    name: 'Appearance (Color)',
                    options: ['0: Blue, pale all over', '1: Acrocyanotic (Pink body, blue extremities)', '2: Completely pink'],
                  },
                  {
                    key: 'pulse' as const,
                    name: 'Pulse (Heart Rate)',
                    options: ['0: Absent', '1: < 100 bpm', '2: ≥ 100 bpm'],
                  },
                  {
                    key: 'grimace' as const,
                    name: 'Grimace (Reflex Irritability)',
                    options: ['0: Floppy, no response', '1: Minimal grimace with suction', '2: Prompt vigorous cry, sneeze, cough'],
                  },
                  {
                    key: 'activity' as const,
                    name: 'Activity (Muscle Tone)',
                    options: ['0: Flaccid, limp', '1: Some flexion of extremities', '2: Active vigorous motion, good flexion'],
                  },
                  {
                    key: 'respiration' as const,
                    name: 'Respiration (Effort)',
                    options: ['0: Absent / Apneic', '1: Slow, irregular, gasping', '2: Robust, strong lusty cry'],
                  },
                ].map((item) => (
                  <div key={item.key} className="space-y-1.5">
                    <div className="text-[11.5px] font-[700] text-slate-300">{item.name}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      {item.options.map((opt, val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setApgar({ ...apgar, [item.key]: val as any })}
                          className={`p-2.5 rounded-xl border text-left text-[11px] font-semibold transition-all ${
                            apgar[item.key] === val
                              ? 'bg-blue-600/25 border-blue-500/50 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Trigger Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[11px] font-mono uppercase text-slate-400">NRP Action Guidance</div>
                <p className="text-[12px] text-slate-200 leading-relaxed">
                  {apgarResult.actionGuidance}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            4. SILVERMAN-ANDERSON RESPIRATORY SCORE
           ========================================================= */}
        {subTab === 'silverman' && (
          <motion.div
            key="silverman_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="glass-card-static p-5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-[16px] font-[800] text-slate-100">
                    Silverman-Anderson Respiratory Retraction Index
                  </h3>
                  <p className="text-[11.5px] text-slate-400">
                    Evaluates severity of neonatal respiratory distress syndrome (RDS)
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[28px] font-[900] font-mono tabular-nums" style={{ color: silvermanResult.color }}>
                    {silvermanResult.totalScore} <span className="text-[14px] text-slate-400 font-sans">/ 10</span>
                  </div>
                  <div className="text-[11px] font-[700]" style={{ color: silvermanResult.color }}>
                    {silvermanResult.interpretation}
                  </div>
                </div>
              </div>

              {/* 5 Silverman Parameters */}
              <div className="space-y-3">
                {[
                  {
                    key: 'upperChest' as const,
                    name: 'Upper Chest Movement',
                    options: ['0: Synchronized with abdomen', '1: Lag on inspiration', '2: See-saw paradox breathing'],
                  },
                  {
                    key: 'lowerChest' as const,
                    name: 'Lower Chest Retraction',
                    options: ['0: None', '1: Just visible intercostal sinking', '2: Marked deep retractions'],
                  },
                  {
                    key: 'xiphoidRetraction' as const,
                    name: 'Xiphoid Retraction',
                    options: ['0: None', '1: Just visible subxiphoid notch', '2: Marked prominent retraction'],
                  },
                  {
                    key: 'naresDilatation' as const,
                    name: 'Nares Dilatation (Flaring)',
                    options: ['0: None', '1: Minimal flaring on inspiration', '2: Marked wide nostril flaring'],
                  },
                  {
                    key: 'expiratoryGrunt' as const,
                    name: 'Expiratory Grunt',
                    options: ['0: None', '1: Audible only with stethoscope', '2: Audible with naked ear'],
                  },
                ].map((item) => (
                  <div key={item.key} className="space-y-1.5">
                    <div className="text-[11.5px] font-[700] text-slate-300">{item.name}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      {item.options.map((opt, val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSilverman({ ...silverman, [item.key]: val as any })}
                          className={`p-2.5 rounded-xl border text-left text-[11px] font-semibold transition-all ${
                            silverman[item.key] === val
                              ? 'bg-blue-600/25 border-blue-500/50 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Trigger Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[11px] font-mono uppercase text-slate-400">Clinical Action Required</div>
                <p className="text-[12px] text-slate-200 leading-relaxed font-semibold">
                  {silvermanResult.clinicalAction}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
