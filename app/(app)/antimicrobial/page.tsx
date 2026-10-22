'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import {
  SYNDROMIC_CATEGORIES,
  PATHOGEN_SPECTRUM_LIST,
  calculatePatientRenalMetrics,
  getDrugRenalAdjustment,
  calculateVancomycinRegimen,
  calculateHartfordAminoglycoside,
  SyndromicCategory,
  SyndromeScenario,
  PathogenSpectrum,
} from '@/lib/antimicrobialData';
import { exportBedsideRoundsPDF } from '@/lib/pdfGenerator';
import {
  ShieldAlert,
  Droplet,
  AlertOctagon,
  FileText,
  Printer,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Layers,
  ArrowRight,
  User,
  Scale,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AntimicrobialPage() {
  const { activeCase, patientLabs, updatePatientLabs, language } = useAppStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('pneumonia');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [activeRegimenType, setActiveRegimenType] = useState<'firstLine' | 'alternative'>('firstLine');
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [showNomogramModal, setShowNomogramModal] = useState<'vancomycin' | 'aminoglycosides' | null>(null);

  // Live Patient Renal Metrics
  const renal = calculatePatientRenalMetrics(activeCase, patientLabs);
  const crcl = renal.crcl;
  const egfr = renal.egfr;
  const weight = renal.weight;
  const serumCr = renal.serumCr;

  const currentCategory: SyndromicCategory =
    SYNDROMIC_CATEGORIES.find((c) => c.id === selectedCategoryId) || SYNDROMIC_CATEGORIES[0];
  const currentScenario: SyndromeScenario =
    currentCategory.scenarios[selectedScenarioIndex] || currentCategory.scenarios[0];

  const currentRegimen =
    activeRegimenType === 'firstLine' || !currentScenario.alternativeRegimen
      ? currentScenario.firstLineRegimen
      : currentScenario.alternativeRegimen;

  // Handle Quick Creatinine Adjustment
  const handleSetCreatinine = (val: string) => {
    updatePatientLabs({ serumCreatinine: val });
  };

  const crPresets = ['0.8', '1.2', '1.8', '2.5', '4.0'];

  // Handle 1-Tap SBAR PDF Export
  const handleExportSbar = () => {
    setIsExportingPdf(true);
    try {
      const drugsForExport = currentRegimen.drugs.map((d) => {
        const adj = getDrugRenalAdjustment(d.drugId, crcl);
        return {
          name: d.name,
          standardDose: d.standardDoseText,
          recommendedDose: `${adj.recommendedDose} ${adj.recommendedInterval}`,
          interval: adj.recommendedInterval,
          route: d.route,
          renalAlert: adj.neurotoxicityAlert || adj.clinicalNote || adj.synergyNephrotoxicityAlert,
        };
      });

      exportBedsideRoundsPDF({
        activeCase,
        patientLabs,
        antimicrobialRegimen: {
          syndromeTitle: currentCategory.name,
          scenarioTitle: currentScenario.title,
          drugs: drugsForExport,
        },
      });
    } catch (e) {
      console.error('Failed to export SBAR PDF:', e);
    } finally {
      setTimeout(() => setIsExportingPdf(false), 800);
    }
  };

  // Vancomycin live calculation
  const vancoRegimen = calculateVancomycinRegimen(weight, crcl);

  // Hartford Aminoglycosides live calculation
  const gentHartford = calculateHartfordAminoglycoside('Gentamicin', weight, crcl);
  const amikHartford = calculateHartfordAminoglycoside('Amikacin', weight, crcl);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* ─── Top Header Card ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1424] border border-white/10 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[20px] font-[900] tracking-tight text-white flex items-center gap-2">
              <span>Antimicrobial Stewardship & Renal Clearance</span>
              <span className="text-[10px] font-[800] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Phase 3
              </span>
            </h1>
            <p className="text-[12px] text-slate-400 mt-0.5">
              Evidence-based syndromic regimens, dynamic Cockcroft-Gault renal cutoffs, and hospital-grade SBAR rounds export
            </p>
          </div>
        </div>

        {/* 1-Tap SBAR Export Trigger Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleExportSbar}
          disabled={isExportingPdf}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-[800] text-[13px] shadow-lg shadow-blue-500/20 border border-blue-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          title="Export current patient context and antimicrobial regimen to SBAR PDF"
        >
          <Printer className="w-4 h-4" />
          <span>{isExportingPdf ? 'Generating SBAR PDF...' : 'Export SBAR PDF'}</span>
        </motion.button>
      </div>

      {/* ─── Live Patient Renal Clearance HUD ─── */}
      <div className="p-5 rounded-2xl bg-[#0b101d] border border-white/10 relative overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-[800] uppercase tracking-wider text-cyan-400">
                Active Patient Renal Clearance HUD
              </div>
              <div className="text-[13px] font-[600] text-slate-300 flex items-center gap-2">
                <span>Weight: <strong className="font-mono text-white">{weight} kg</strong></span>
                <span>•</span>
                <span>Age: <strong className="font-mono text-white">{renal.age}y</strong></span>
                <span>•</span>
                <span>Sex: <strong className="font-mono text-white">{renal.sex}</strong></span>
              </div>
            </div>
          </div>

          {/* Creatinine Quick-Adjuster Form */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-[700] text-slate-400">Serum Cr (mg/dL):</span>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="20"
              value={patientLabs.serumCreatinine || '1.0'}
              onChange={(e) => handleSetCreatinine(e.target.value)}
              className="w-20 px-2.5 py-1.5 min-h-[44px] rounded-lg bg-white/[0.05] border border-white/15 text-white font-mono font-[700] text-[14px] text-center tabular-nums focus:outline-none focus:border-cyan-500"
              aria-label="Serum Creatinine in mg/dL"
            />
            <div className="flex items-center gap-1">
              {crPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSetCreatinine(preset)}
                  className={`min-h-[38px] px-2 py-1 rounded text-[11px] font-mono font-[700] transition-colors border ${
                    (patientLabs.serumCreatinine || '1.0') === preset
                      ? 'bg-cyan-500/25 border-cyan-500/40 text-cyan-300'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Clearance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          {/* Cockcroft-Gault */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="text-[11px] font-[800] uppercase tracking-wide text-slate-400">
              Cockcroft-Gault CrCl
            </div>
            <div className="my-1.5 flex items-baseline gap-1.5">
              <span className="text-[26px] font-[900] font-mono text-cyan-300 tabular-nums">
                {crcl}
              </span>
              <span className="text-[11px] font-[600] text-slate-400">mL/min</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Primary guideline metric for antibiotic renal cutoffs
            </div>
          </div>

          {/* CKD-EPI 2021 */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="text-[11px] font-[800] uppercase tracking-wide text-slate-400">
              CKD-EPI 2021 eGFR
            </div>
            <div className="my-1.5 flex items-baseline gap-1.5">
              <span className="text-[26px] font-[900] font-mono text-purple-300 tabular-nums">
                {egfr}
              </span>
              <span className="text-[11px] font-[600] text-slate-400">mL/min/1.73m²</span>
            </div>
            <div className="text-[11px] text-purple-300 font-[600]">
              Stage {renal.ckdStage} (Race-Free Standard)
            </div>
          </div>

          {/* Dosing Status Badge */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
              crcl < 30
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : crcl < 60
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
            }`}
          >
            <div className="text-[11px] font-[800] uppercase tracking-wide flex items-center gap-1.5">
              {crcl < 30 ? (
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              ) : crcl < 60 ? (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Renal Dosing Status</span>
            </div>
            <div className="my-1 text-[16px] font-[800] tracking-tight">
              {crcl < 30
                ? 'CRITICAL RENAL ADJUSTMENT'
                : crcl < 60
                ? 'RENAL DOSE ADJUSTMENT'
                : 'STANDARD UNADJUSTED DOSE'}
            </div>
            <div className="text-[11px] opacity-90 leading-tight">
              {renal.stageDescription}
            </div>
          </div>
        </div>

        {/* High-Contrast Renal Warning Banner if CrCl < 60 */}
        {crcl < 60 && (
          <div
            className={`mt-3.5 p-3 rounded-xl border flex items-center gap-2.5 text-[12px] font-[700] ${
              crcl < 30
                ? 'bg-rose-900/40 border-rose-500/60 text-rose-100'
                : 'bg-amber-900/30 border-amber-500/50 text-amber-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <div>
              {crcl < 30 ? (
                <span>
                  <strong>CRITICAL WARNING:</strong> Patient CrCl is <strong>{crcl} mL/min</strong>. Nitrofurantoin is strictly contraindicated. Cefepime requires aggressive reduction to 1g q24h to avoid fatal neurotoxicity and non-convulsive status epilepticus!
                </span>
              ) : (
                <span>
                  <strong>RENAL ADJUSTMENT ACTIVE:</strong> Patient CrCl is <strong>{crcl} mL/min</strong>. Antibiotic intervals extended (Cefepime q12h, Pip-Tazo 3.375g q6h, Meropenem q12h).
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── Interactive Syndromic Category Chips ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SYNDROMIC_CATEGORIES.map((category) => {
          const isSelected = category.id === selectedCategoryId;
          return (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                setSelectedCategoryId(category.id);
                setSelectedScenarioIndex(0);
                setActiveRegimenType('firstLine');
              }}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-[13px] font-[700] border transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-blue-600/30 border-blue-500/50 text-blue-200 shadow-md shadow-blue-500/10'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ─── Category Overview & Scenario Tabs ─── */}
      <div className="p-5 rounded-2xl bg-[#0e1424] border border-white/10 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-[800] text-white">
              {currentCategory.name}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNomogramModal('vancomycin')}
                className="text-[11px] font-[700] px-2.5 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 transition-colors cursor-pointer"
              >
                Vancomycin Calculator
              </button>
              <button
                onClick={() => setShowNomogramModal('aminoglycosides')}
                className="text-[11px] font-[700] px-2.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-colors cursor-pointer"
              >
                Hartford Aminoglycoside
              </button>
            </div>
          </div>
          <p className="text-[12px] text-slate-400 mt-0.5">{currentCategory.description}</p>
        </div>

        {/* Scenario Sub-Chips */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/[0.06]">
          {currentCategory.scenarios.map((sc, idx) => {
            const isScActive = idx === selectedScenarioIndex;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioIndex(idx);
                  setActiveRegimenType('firstLine');
                }}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-[12px] font-[700] border transition-all text-left flex items-center gap-2 cursor-pointer ${
                  isScActive
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Active Clinical Scenario Detail Card ─── */}
      <div className="space-y-4">
        {/* Scenario Header & Criteria */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-[800] uppercase tracking-wider text-blue-400">
              Clinical Scenario Criteria
            </div>
            <div className="text-[15px] font-[800] text-white mt-0.5">
              {currentScenario.title}
            </div>
            <div className="text-[12px] text-slate-300 mt-1 leading-relaxed">
              {currentScenario.patientCriteria}
            </div>
          </div>

          {/* First-Line vs Alternative Switcher */}
          {currentScenario.alternativeRegimen && (
            <div className="flex rounded-xl p-1 bg-white/[0.04] border border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setActiveRegimenType('firstLine')}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-[12px] font-[700] transition-all cursor-pointer ${
                  activeRegimenType === 'firstLine'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                First-Line Regimen
              </button>
              <button
                type="button"
                onClick={() => setActiveRegimenType('alternative')}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-[12px] font-[700] transition-all cursor-pointer ${
                  activeRegimenType === 'alternative'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Alternative Regimen
              </button>
            </div>
          )}
        </div>

        {/* Risk Factors Alert Banner if present */}
        {currentScenario.riskFactorsAlert && (
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-[12px] flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Risk Stratification:</strong> {currentScenario.riskFactorsAlert}
            </div>
          </div>
        )}

        {/* ─── Regimen Antibiotic Cards ─── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[12px] font-[800] text-slate-300 uppercase tracking-wider">
              {currentRegimen.title}
            </span>
            <span className="text-[11px] text-slate-400 font-[600]">
              Recommended Duration: <strong className="text-white">{currentScenario.duration}</strong>
            </span>
          </div>

          {currentRegimen.drugs.map((drug) => {
            const adj = getDrugRenalAdjustment(drug.drugId, crcl);

            return (
              <div
                key={drug.drugId}
                className={`p-4 rounded-xl border transition-all ${
                  adj.isContraindicated
                    ? 'bg-rose-950/25 border-rose-500/50'
                    : adj.neurotoxicityAlert
                    ? 'bg-amber-950/25 border-amber-500/50'
                    : adj.isAdjusted
                    ? 'bg-[#0f172a] border-cyan-500/30'
                    : 'bg-[#0c1222] border-white/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-[800] text-white">
                        {drug.name}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10">
                        {drug.route}
                      </span>
                      {adj.isContraindicated && (
                        <span className="text-[10px] font-[800] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                          CONTRAINDICATED
                        </span>
                      )}
                      {!adj.isContraindicated && adj.isAdjusted && (
                        <span className="text-[10px] font-[800] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                          RENAL ADJUSTED
                        </span>
                      )}
                    </div>

                    {drug.rationale && (
                      <p className="text-[12px] text-slate-400 mt-1">
                        {drug.rationale}
                      </p>
                    )}

                    {/* Pathogen Coverage Spectrum Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {drug.spectrum.map((specId: PathogenSpectrum) => {
                        const badgeInfo = PATHOGEN_SPECTRUM_LIST.find((b) => b.id === specId);
                        if (!badgeInfo) return null;
                        return (
                          <span
                            key={specId}
                            className={`text-[10px] px-2 py-0.5 rounded-md border font-[700] ${badgeInfo.badgeClass}`}
                          >
                            {badgeInfo.shortLabel}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dosage Comparison Box */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                    {/* Unadjusted Standard Dose */}
                    <div className="text-right sm:text-left pr-2 border-r border-white/10">
                      <div className="text-[10px] uppercase font-[700] text-slate-500">Standard Dose</div>
                      <div className="text-[12px] font-mono text-slate-400 tabular-nums">
                        {drug.standardDoseText}
                      </div>
                    </div>

                    {/* Patient Adjusted Dose */}
                    <div className="text-right sm:text-left pl-1">
                      <div className="text-[10px] uppercase font-[800] text-cyan-400">
                        Patient Dose (CrCl: {crcl})
                      </div>
                      <div
                        className={`text-[14px] font-[800] font-mono tabular-nums ${
                          adj.isContraindicated
                            ? 'text-rose-400'
                            : adj.isAdjusted
                            ? 'text-amber-300'
                            : 'text-emerald-300'
                        }`}
                      >
                        {adj.recommendedDose} {adj.recommendedInterval}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Neurotoxicity Alert Box */}
                {adj.neurotoxicityAlert && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-950/40 border border-amber-500/50 text-amber-200 text-[11px] leading-relaxed flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>HIGH RISK WARNING:</strong> {adj.neurotoxicityAlert}
                    </div>
                  </div>
                )}

                {/* Synergy Nephrotoxicity Alert Box */}
                {adj.synergyNephrotoxicityAlert && (
                  <div className="mt-3 p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-200 text-[11px] leading-relaxed flex items-start gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>NEPHROTOXICITY ALERT:</strong> {adj.synergyNephrotoxicityAlert}
                    </div>
                  </div>
                )}

                {/* Clinical Dosing Note */}
                {adj.clinicalNote && !adj.neurotoxicityAlert && (
                  <div className="mt-2 text-[11px] text-slate-400 italic flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{adj.clinicalNote}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Regimen Clinical Guidance Notes */}
          {currentRegimen.notes && (
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-[12px] text-blue-200 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong>Guideline Strategy:</strong> {currentRegimen.notes}
              </div>
            </div>
          )}
        </div>

        {/* ─── Evidence-Based Clinical Pearls Box ─── */}
        {currentScenario.clinicalPearls.length > 0 && (
          <div className="p-4 rounded-xl bg-[#090e1a] border border-white/10 space-y-2">
            <div className="text-[11px] font-[800] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Evidence-Based Clinical Pearls & Trial Evidence</span>
            </div>
            <ul className="space-y-1.5 text-[12px] text-slate-300">
              {currentScenario.clinicalPearls.map((pearl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{pearl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ─── Modal: Vancomycin Calculator ─── */}
      <AnimatePresence>
        {showNomogramModal === 'vancomycin' && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg p-6 bg-[#0e1424] border border-white/10 rounded-2xl shadow-2xl relative space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-[800] text-white">Vancomycin Dosing Protocol</h3>
                    <p className="text-[11px] text-slate-400">Weight-calculated loading & maintenance</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNomogramModal(null)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                  <div className="text-[11px] font-[800] uppercase text-indigo-300">
                    Calculated Regimen ({weight} kg, CrCl: {crcl} mL/min)
                  </div>
                  <div className="text-[13px] text-white">
                    • <strong>Loading Dose:</strong> <span className="font-mono font-bold text-indigo-200">{vancoRegimen.loadingDoseText}</span>
                  </div>
                  <div className="text-[13px] text-white">
                    • <strong>Maintenance Dose:</strong> <span className="font-mono font-bold text-indigo-200">{vancoRegimen.maintenanceDoseText}</span>
                  </div>
                  <div className="text-[11px] text-indigo-300 mt-1">
                    {vancoRegimen.targetTroughText}
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-300 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <div className="font-[800] text-slate-200 uppercase mb-1">Monitoring Pearls:</div>
                  {vancoRegimen.monitoringPearls.map((p, i) => (
                    <div key={i}>• {p}</div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowNomogramModal(null)}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-white/[0.08] hover:bg-white/15 text-white font-[700] text-[13px] transition-colors"
              >
                Close Calculator
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Modal: Hartford Aminoglycoside Nomogram ─── */}
      <AnimatePresence>
        {showNomogramModal === 'aminoglycosides' && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg p-6 bg-[#0e1424] border border-white/10 rounded-2xl shadow-2xl relative space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-[800] text-white">Hartford Extended-Interval Nomogram</h3>
                    <p className="text-[11px] text-slate-400">Once-daily aminoglycoside dosing protocol</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNomogramModal(null)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {/* Gentamicin / Tobramycin */}
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                  <div className="text-[11px] font-[800] uppercase text-cyan-300">
                    Gentamicin / Tobramycin (7 mg/kg)
                  </div>
                  <div className="text-[14px] font-[800] font-mono text-white">
                    {gentHartford.totalDoseMg} mg IV {gentHartford.intervalText}
                  </div>
                  <div className="text-[11px] text-cyan-200">
                    Target Trough: {gentHartford.targetTrough} • Target Peak: {gentHartford.targetPeak}
                  </div>
                </div>

                {/* Amikacin */}
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                  <div className="text-[11px] font-[800] uppercase text-purple-300">
                    Amikacin (15 mg/kg)
                  </div>
                  <div className="text-[14px] font-[800] font-mono text-white">
                    {amikHartford.totalDoseMg} mg IV {amikHartford.intervalText}
                  </div>
                  <div className="text-[11px] text-purple-200">
                    Target Trough: {amikHartford.targetTrough} • Target Peak: {amikHartford.targetPeak}
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[11px] text-slate-300">
                  <strong>Hartford Guideline:</strong> Draw random serum level 6–14 hours after start of first infusion. If CrCl &lt; 20 mL/min, extended-interval is contraindicated; switch to conventional multiple-daily dosing.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowNomogramModal(null)}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-white/[0.08] hover:bg-white/15 text-white font-[700] text-[13px] transition-colors"
              >
                Close Nomogram
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
