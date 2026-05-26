'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { 
  ECG_SIM_CASES, 
  generateECGPath, 
  ECGSimCase 
} from '@/lib/ecgSimCases';
import { 
  ArrowLeft, Eye, EyeOff, BookOpen, AlertCircle, Info, Heart, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function ECGSimulatorPage() {
  const { language } = useAppStore();
  const t = translations[language];

  // State
  const [selectedCaseId, setSelectedCaseId] = useState<string>(ECG_SIM_CASES[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [solvedCases, setSolvedCases] = useState<{ [caseId: string]: boolean }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [caseId: string]: number | null }>({});
  const [wrongSelections, setWrongSelections] = useState<{ [caseId: string]: { [optionIdx: number]: boolean } }>({});
  const [viewDiagnosis, setViewDiagnosis] = useState<boolean>(false);
  const [scenarioExpanded, setScenarioExpanded] = useState<boolean>(true);

  // Active case object
  const activeCase = useMemo(() => {
    return ECG_SIM_CASES.find(c => c.id === selectedCaseId) || ECG_SIM_CASES[0];
  }, [selectedCaseId]);

  // Next/prev calculations and progress tracking
  const activeIndex = useMemo(() => {
    return ECG_SIM_CASES.findIndex(c => c.id === activeCase.id);
  }, [activeCase]);

  const nextCase = useMemo(() => {
    if (activeIndex !== -1 && activeIndex < ECG_SIM_CASES.length - 1) {
      return ECG_SIM_CASES[activeIndex + 1];
    }
    return null;
  }, [activeIndex]);

  const solvedCount = useMemo(() => {
    return Object.keys(solvedCases).filter(id => solvedCases[id]).length;
  }, [solvedCases]);

  const totalCount = ECG_SIM_CASES.length;

  const allCasesFinished = useMemo(() => {
    return solvedCount === totalCount;
  }, [solvedCount, totalCount]);

  // Categories for filtering
  const categories = [
    { id: 'all', label: t.ecg_sim_all_categories },
    { id: 'acs', label: t.ecg_sim_cat_acs },
    { id: 'arrhythmia', label: t.ecg_sim_cat_arrhythmia },
    { id: 'conduction', label: t.ecg_sim_cat_conduction },
    { id: 'emergency', label: t.ecg_sim_cat_emergency },
    { id: 'structural', label: t.ecg_sim_cat_structural }
  ];

  // Filtered cases
  const filteredCases = useMemo(() => {
    if (activeCategory === 'all') return ECG_SIM_CASES;
    return ECG_SIM_CASES.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  // Handle case selection
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setViewDiagnosis(solvedCases[caseId] || false);
    // Reset scenario expanded state on new case
    setScenarioExpanded(true);
  };

  const handleSelectOption = (optionIdx: number) => {
    if (solvedCases[activeCase.id]) return;

    setSelectedOptions(prev => ({
      ...prev,
      [activeCase.id]: optionIdx
    }));

    if (optionIdx === activeCase.correctOptionIndex) {
      // Correct!
      setSolvedCases(prev => ({
        ...prev,
        [activeCase.id]: true
      }));
      setViewDiagnosis(true);
    } else {
      // Incorrect!
      setWrongSelections(prev => {
        const caseWrongs = prev[activeCase.id] || {};
        return {
          ...prev,
          [activeCase.id]: {
            ...caseWrongs,
            [optionIdx]: true
          }
        };
      });
    }
  };

  const handleHideDiagnosis = () => {
    setViewDiagnosis(false);
    setSolvedCases(prev => {
      const updated = { ...prev };
      delete updated[activeCase.id];
      return updated;
    });
    setSelectedOptions(prev => ({
      ...prev,
      [activeCase.id]: null
    }));
    setWrongSelections(prev => ({
      ...prev,
      [activeCase.id]: {}
    }));
  };

  const handleResetProgress = () => {
    setSolvedCases({});
    setSelectedOptions({});
    setWrongSelections({});
    setViewDiagnosis(false);
    setSelectedCaseId(ECG_SIM_CASES[0].id);
    setActiveCategory('all');
  };

  const isRevealed = viewDiagnosis;

  // Blinking heart effect for active tachycardia/bradycardia cases
  const [heartBlink, setHeartBlink] = useState<boolean>(false);
  useEffect(() => {
    const intervalTime = (60 / activeCase.heartRate) * 1000;
    const interval = setInterval(() => {
      setHeartBlink(true);
      setTimeout(() => setHeartBlink(false), 150);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [activeCase.heartRate]);

  // Lead configuration map for grid layout
  // Column-ordered or row-ordered: Real 12-lead layout typically printed as 4 rows, 3 columns:
  // Row 1: I, aVR, V1
  // Row 2: II, aVL, V2
  // Row 3: III, aVF, V3
  // Row 4: V4, V5, V6
  const gridLeads = [
    { name: 'I', label: 'I (Limb Lead)' },
    { name: 'aVR', label: 'aVR (Augmented)' },
    { name: 'V1', label: 'V1 (Precordial)' },
    { name: 'II', label: 'II (Limb Lead)' },
    { name: 'aVL', label: 'aVL (Augmented)' },
    { name: 'V2', label: 'V2 (Precordial)' },
    { name: 'III', label: 'III (Limb Lead)' },
    { name: 'aVF', label: 'aVF (Augmented)' },
    { name: 'V3', label: 'V3 (Precordial)' },
    { name: 'V4', label: 'V4 (Precordial)' },
    { name: 'V5', label: 'V5 (Precordial)' },
    { name: 'V6', label: 'V6 (Precordial)' }
  ];

  // Helper to color difficulty badges
  const getDifficultyStyles = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25';
      case 'intermediate':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
      case 'advanced':
      default:
        return 'bg-rose-500/15 text-rose-400 border-rose-500/25';
    }
  };

  // Helper for Category localization
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'acs': return t.ecg_sim_cat_acs;
      case 'arrhythmia': return t.ecg_sim_cat_arrhythmia;
      case 'conduction': return t.ecg_sim_cat_conduction;
      case 'emergency': return t.ecg_sim_cat_emergency;
      case 'structural':
      default: return t.ecg_sim_cat_structural;
    }
  };

  return (
    <div className="min-h-screen bg-[#03070c] text-gray-100 flex flex-col pb-12 font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* ─── Global Background Effects ─── */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.01] rounded-full blur-[150px] pointer-events-none" />

      {/* ─── HEADER BAR ─── */}
      <header className="sticky top-0 z-30 bg-[#03070c]/80 backdrop-blur-md border-b border-white/[0.06] py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/ecg"
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] text-gray-400 hover:text-white transition-all select-none"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-white font-[850] text-[15px] sm:text-[17px] tracking-tight">
                {t.ecg_sim_title}
              </h1>
              <p className="text-gray-500 text-[10.5px] font-[500] hidden sm:block">
                {t.ecg_sim_desc}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-black/30 border border-white/[0.04] p-1.5 px-3 rounded-2xl shrink-0">
            <div className="flex items-center gap-1.5">
              <Heart className={`w-4 h-4 text-rose-500 ${heartBlink ? 'scale-125' : 'scale-100'} transition-transform duration-100`} fill="currentColor" />
              <span className="text-[12px] font-[800] font-mono text-white leading-none">
                {activeCase.heartRate} <span className="text-[10px] text-gray-500 font-normal">BPM</span>
              </span>
            </div>
            <div className="w-[1px] h-3 bg-white/[0.08]" />
            <span className="text-[10.5px] font-extrabold text-emerald-400 uppercase tracking-wider font-mono">
              {activeCase.rhythm[language]}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 w-full flex flex-col gap-5">
        
        {/* ─── CASE SELECTOR ─── */}
        <section className="flex flex-col gap-2.5">
          {/* Category Filter Tabs & Progress Stats */}
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.03] pb-1.5 select-none overflow-hidden">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // Auto select first case in newly active category if current case is excluded
                    const isCurrentInCat = cat.id === 'all' || ECG_SIM_CASES.find(c => c.id === selectedCaseId)?.category === cat.id;
                    if (!isCurrentInCat) {
                      const firstInCat = ECG_SIM_CASES.find(c => c.category === cat.id);
                      if (firstInCat) handleSelectCase(firstInCat.id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[10.5px] font-[800] whitespace-nowrap transition-all border shrink-0`}
                  style={activeCategory === cat.id ? {
                    background: 'rgba(16,185,129,0.15)',
                    borderColor: 'rgba(16,185,129,0.3)',
                    color: '#34d399'
                  } : {
                    background: 'transparent',
                    borderColor: 'rgba(255,255,255,0.04)',
                    color: '#9ca3af'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Solved Progress Stats Badge */}
            <div className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10.5px] font-bold text-gray-400 shrink-0 font-mono flex items-center gap-1.5">
              <span>{language === 'en' ? 'Solved' : 'Terpecahkan'}:</span>
              <span className="text-emerald-400 font-extrabold">{solvedCount}</span>
              <span className="text-gray-600">/</span>
              <span>{totalCount}</span>
            </div>
          </div>

          {/* Cases Horizontal Scroll */}
          <div className="flex items-center gap-3 overflow-x-auto py-1 px-0.5 no-scrollbar">
            {filteredCases.map((caseItem) => {
              const isActive = caseItem.id === selectedCaseId;
              const hasBeenSolved = solvedCases[caseItem.id] || false;
              return (
                <button
                  key={caseItem.id}
                  onClick={() => handleSelectCase(caseItem.id)}
                  className={`flex flex-col gap-1 text-left p-3.5 rounded-2xl min-w-[200px] max-w-[220px] transition-all border shrink-0 relative overflow-hidden ${
                    isActive 
                      ? 'bg-emerald-500/[0.04] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                      : 'bg-[#0b1019]/60 border-white/[0.04] hover:bg-[#0b1019] hover:border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getDifficultyStyles(caseItem.difficulty)}`}>
                      {t[`ecg_sim_${caseItem.difficulty}`]}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold">
                      {getCategoryLabel(caseItem.category)}
                    </span>
                  </div>
                  
                  <h4 className={`text-[12px] font-extrabold mt-2 leading-tight ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {caseItem.title[language]}
                  </h4>

                  {/* Tiny Status Indicator */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${hasBeenSolved ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className="text-[9.5px] font-bold text-gray-500 font-mono">
                      {hasBeenSolved ? (language === 'en' ? 'Solved' : 'Terpecahkan') : (language === 'en' ? 'Unsolved' : 'Belum Terjawab')}
                    </span>
                  </div>

                  {/* Left accent bar on active item */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── CLINICAL SCENARIO & REVEAL SECTION ─── */}
        <section className="glass-card overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/30 to-blue-500/20" />
          
          {/* Header toggle */}
          <div 
            onClick={() => setScenarioExpanded(!scenarioExpanded)}
            className="p-4 flex items-center justify-between cursor-pointer select-none bg-black/10"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h2 className="text-[13px] font-[800] uppercase tracking-wider text-white">
                {t.ecg_sim_clinical_scenario}
              </h2>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${scenarioExpanded ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence initial={false}>
            {scenarioExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/[0.04]"
              >
                <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start justify-between">
                  {/* Scenario text & MCQ Options */}
                  <div className="flex-1 w-full">
                    <p className="text-gray-300 text-[13px] leading-relaxed font-medium">
                      {activeCase.clinicalScenario[language]}
                    </p>
                    
                    {/* MCQ Options Stack */}
                    <div className="mt-5 flex flex-col gap-2.5 max-w-xl w-full">
                      <h4 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-0.5">
                        {language === 'en' ? 'Select your diagnosis:' : 'Pilih diagnosis Anda:'}
                      </h4>
                      {activeCase.options[language].map((option, idx) => {
                        const isCorrect = idx === activeCase.correctOptionIndex;
                        const isSelected = selectedOptions[activeCase.id] === idx;
                        const isWrong = wrongSelections[activeCase.id]?.[idx] || false;
                        const isSolved = solvedCases[activeCase.id] || false;

                        let btnStyle = "bg-[#0b1019]/40 border-white/[0.04] text-gray-300 hover:bg-[#0b1019]/70 hover:border-white/[0.08]";
                        let letterStyle = "bg-white/[0.04] border-white/[0.06] text-gray-400";
                        
                        if (isSolved && isCorrect) {
                          btnStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.05)]";
                          letterStyle = "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";
                        } else if (isWrong) {
                          btnStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.05)]";
                          letterStyle = "bg-rose-500/20 border-rose-500/20 text-rose-400";
                        } else if (isSelected) {
                          btnStyle = "bg-blue-500/10 border-blue-500/30 text-blue-300";
                          letterStyle = "bg-blue-500/20 border-blue-500/20 text-blue-400";
                        }

                        const letter = String.fromCharCode(65 + idx); // 'A', 'B', 'C'

                        return (
                          <motion.button
                            key={idx}
                            disabled={isSolved}
                            onClick={() => handleSelectOption(idx)}
                            animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : {}}
                            transition={{ duration: 0.35 }}
                            className={`w-full p-3.5 rounded-xl border flex items-center gap-3.5 text-left text-[12.5px] font-bold transition-all hover:scale-[1.005] select-none ${btnStyle}`}
                          >
                            <span className={`w-6 h-6 shrink-0 rounded-lg border flex items-center justify-center text-[11px] font-extrabold font-mono ${letterStyle}`}>
                              {letter}
                            </span>
                            <span className="leading-tight">{option}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Splitter on MD screens */}
                  <div className="hidden md:block w-[1px] self-stretch bg-white/[0.06] mx-1" />

                  {/* Interactive Reveal Area */}
                  <div className="w-full md:w-[350px] shrink-0 flex flex-col gap-3">
                    <AnimatePresence mode="wait">
                      {!isRevealed ? (
                        <motion.div
                          key="unsolved-placeholder"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="w-full p-6 py-8 rounded-2xl bg-black/10 border border-white/[0.04] flex flex-col items-center justify-center text-center gap-3 relative"
                        >
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                            <Info className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="text-white font-extrabold text-[13px]">
                              {language === 'en' ? 'Diagnosis Locked' : 'Diagnosis Terkunci'}
                            </h4>
                            <p className="text-gray-500 text-[11px] mt-1 leading-normal max-w-[220px] mx-auto">
                              {language === 'en' 
                                ? 'Select the correct diagnosis on the left to unlock clinical findings!' 
                                : 'Pilih diagnosis yang benar di sebelah kiri untuk membuka temuan klinis!'}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="diagnosis-panel"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full p-4.5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 relative"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9.5px] font-[800] uppercase text-emerald-400 tracking-wider">
                              {language === 'en' ? 'FINAL DIAGNOSIS' : 'DIAGNOSIS AKHIR'}
                            </span>
                            <button
                              onClick={handleHideDiagnosis}
                              className="text-[9.5px] font-[800] text-gray-500 hover:text-gray-300 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04]"
                            >
                              <EyeOff className="w-3 h-3" />
                              <span>{language === 'en' ? 'Hide' : 'Sembunyikan'}</span>
                            </button>
                          </div>
                          
                          <h3 className="text-white font-[850] text-[14px] leading-snug flex items-start gap-1.5">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{activeCase.diagnosis[language]}</span>
                          </h3>

                          {/* Key Findings List */}
                          <div className="mt-4 border-t border-white/[0.05] pt-3">
                            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                              {t.ecg_sim_key_findings}
                            </h4>
                            <ul className="flex flex-col gap-2">
                              {activeCase.keyFindings[language].map((finding, idx) => (
                                <li key={idx} className="text-gray-300 text-[11px] leading-relaxed flex items-start gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                                  <span>{finding}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Next Case / Reset Progress Buttons */}
                          <div className="mt-4 pt-3 border-t border-white/[0.05] flex flex-col gap-2">
                            {allCasesFinished ? (
                              <button
                                onClick={handleResetProgress}
                                className="w-full py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/40 text-amber-300 font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all select-none animate-pulse"
                              >
                                {language === 'en' ? 'Reset All Cases & Progress' : 'Reset Semua Kasus & Progres'}
                              </button>
                            ) : nextCase ? (
                              <button
                                onClick={() => handleSelectCase(nextCase.id)}
                                className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all select-none"
                              >
                                <span>{language === 'en' ? 'Next Case' : 'Kasus Berikutnya'}</span>
                                <span className="text-[9.5px] opacity-60 font-mono">({activeIndex + 2}/{totalCount})</span>
                              </button>
                            ) : (
                              <button
                                onClick={handleResetProgress}
                                className="w-full py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/40 text-amber-300 font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all select-none"
                              >
                                {language === 'en' ? 'Reset All Cases & Progress' : 'Reset Semua Kasus & Progres'}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ─── 12-LEAD ECG GRID ─── */}
        <section className="flex flex-col gap-3">
          {/* ECG Grid Header Context */}
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 px-1 font-mono">
            <div className="flex items-center gap-3">
              <span>{t.ecg_sim_paper_speed}: <strong className="text-gray-400">25 mm/s</strong></span>
              <span className="w-[1.5px] h-2.5 bg-white/[0.06]" />
              <span>{t.ecg_sim_gain}: <strong className="text-gray-400">10 mm/mV</strong></span>
            </div>
            <span className="text-[10px] text-gray-600 hidden sm:inline">
              {t.ecg_sim_disclaimer}
            </span>
          </div>

          {/* Standard 4x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* SVG GRID DEFS FOR ALL LEADS TO SHARE PATTERN */}
            <svg className="absolute w-0 h-0 pointer-events-none">
              <defs>
                {/* 1mm small pink grid square */}
                <pattern id="ecg-grid-small" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#f43f5e" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>
                {/* 5mm large pink grid square (5x5 small squares) */}
                <pattern id="ecg-grid-large" width="25" height="25" patternUnits="userSpaceOnUse">
                  <rect width="25" height="25" fill="url(#ecg-grid-small)" />
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f43f5e" strokeWidth="0.8" strokeOpacity="0.3" />
                </pattern>
              </defs>
            </svg>

            {gridLeads.map((lead) => {
              // Memorize static path for current case and lead to avoid laggy renders
              const pathString = useMemo(() => {
                return generateECGPath(450, 110, activeCase, lead.name);
              }, [activeCase, lead.name]);

              return (
                <div 
                  key={lead.name}
                  className="rounded-2xl border border-white/[0.06] bg-[#0c111b] overflow-hidden relative"
                >
                  {/* Lead Panel Header */}
                  <div className="absolute top-2.5 left-3.5 z-10 select-none flex items-center gap-1.5">
                    <span className="text-[14px] font-[900] text-white font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {lead.name}
                    </span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase font-sans tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] hidden sm:inline">
                      {lead.label}
                    </span>
                  </div>

                  {/* ECG Grid Panel Background (renders grid-large pattern) */}
                  <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
                    <div className="w-[450px] h-[110px] relative bg-[#0b0e14]">
                      <svg width="450" height="110" className="absolute top-0 left-0 z-0">
                        {/* Grid Paper */}
                        <rect width="450" height="110" fill="url(#ecg-grid-large)" />
                        
                        {/* Static Tracing Path */}
                        <path 
                          d={pathString} 
                          fill="none" 
                          stroke="#10b981" // Emerald neon color for the line
                          strokeWidth="1.8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="drop-shadow-[0_0_2.5px_rgba(16,185,129,0.45)]"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── RHYTHM STRIP (LEAD II) ─── */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c111b] overflow-hidden relative">
            <div className="absolute top-2.5 left-3.5 z-10 select-none flex items-center gap-1.5">
              <span className="text-[14px] font-[900] text-rose-400 font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {t.ecg_sim_rhythm_strip}
              </span>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
              {/* Rhythm strip is longer: 900px wide for 5 seconds of tracing */}
              <div className="w-[900px] h-[120px] relative bg-[#0b0e14]">
                <svg width="900" height="120" className="absolute top-0 left-0 z-0">
                  <rect width="900" height="120" fill="url(#ecg-grid-large)" />
                  <path 
                    d={useMemo(() => {
                      // Call path generator with double-width to render 5s continuous rhythm strip
                      const rhythmCase = { ...activeCase };
                      return generateECGPath(900, 120, rhythmCase, 'II');
                    }, [activeCase])} 
                    fill="none" 
                    stroke="#fb7185" // Rose neon for visual distinct rhythm strip
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_2.5px_rgba(251,113,133,0.45)]"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ─── bottom info panel ─── */}
        <footer className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-gray-500 shrink-0" />
            <p className="text-[10.5px] text-gray-500 leading-normal">
              {t.ecg_sim_disclaimer}
            </p>
          </div>
          <Link
            href="/ecg"
            className="text-[11px] font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider shrink-0"
          >
            {t.ecg_sim_back}
          </Link>
        </footer>

      </main>
    </div>
  );
}
