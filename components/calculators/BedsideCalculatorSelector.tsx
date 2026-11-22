'use client';

import React, { useState, useMemo } from 'react';
import {
  Scale,
  Droplets,
  Clock,
  Wind,
  Baby,
  Activity,
  ShieldAlert,
  FlaskConical,
  Stethoscope,
  Search,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HeartPulse,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface BedsideCalculatorItem {
  id: string;
  label: string;
  shortName: string;
  category: 'dosing' | 'fluids' | 'airway' | 'cardio' | 'renal';
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle: string;
  keywords: string[];
}

interface BedsideCalculatorSelectorProps {
  activeTab: string;
  onSelectTab: (id: string) => void;
  language: 'id' | 'en';
  t: Record<string, string>;
}

export default function BedsideCalculatorSelector({
  activeTab,
  onSelectTab,
  language,
  t,
}: BedsideCalculatorSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Definition of all 14 Bedside calculators
  const calculators: BedsideCalculatorItem[] = useMemo(() => [
    // 1. Dosing & Anthropometry
    {
      id: 'bmi',
      label: t.bmi || (language === 'en' ? 'BMI Calculator' : 'Kalkulator IMT'),
      shortName: 'IMT / BMI',
      category: 'dosing',
      tag: language === 'en' ? 'Anthropometry' : 'Antropometri',
      icon: Scale,
      color: 'emerald',
      subtitle: language === 'en' ? 'Body Mass Index classification' : 'Klasifikasi indeks massa tubuh & status gizi',
      keywords: ['imt', 'bmi', 'berat', 'tinggi', 'obesitas', 'body mass index', 'weight'],
    },
    {
      id: 'ibw',
      label: t.ibw_abw || (language === 'en' ? 'IBW & ABW' : 'BBI & BBD'),
      shortName: 'BBI & BBD',
      category: 'dosing',
      tag: language === 'en' ? 'Dosing' : 'Dosis Obat',
      icon: Scale,
      color: 'emerald',
      subtitle: language === 'en' ? 'Ideal & Adjusted Body Weight (Devine)' : 'Berat badan ideal & penyesuaian dosis anestesi',
      keywords: ['bbi', 'bbd', 'ibw', 'abw', 'ideal', 'adjusted', 'devine', 'dosing'],
    },

    // 2. Fluids & Blood
    {
      id: 'fm',
      label: t.fluid_maintenance || (language === 'en' ? 'Fluid Maintenance (4-2-1 Rule)' : 'Rumus Cairan Rumatan (Aturan 4-2-1)'),
      shortName: 'Aturan 4-2-1',
      category: 'fluids',
      tag: language === 'en' ? 'Fluids' : 'Cairan',
      icon: Droplets,
      color: 'blue',
      subtitle: language === 'en' ? 'Hourly maintenance fluid rate (mL/h)' : 'Laju cairan rumatan per jam (mL/jam)',
      keywords: ['4-2-1', 'cairan', 'rumatan', 'infus', 'fluid', 'maintenance', 'holiday', 'holliday'],
    },
    {
      id: 'hs',
      label: t.holliday_segar || (language === 'en' ? 'Holliday-Segar Formula' : 'Rumus Holliday-Segar'),
      shortName: 'Holliday-Segar',
      category: 'fluids',
      tag: language === 'en' ? 'Fluids' : 'Cairan',
      icon: Clock,
      color: 'blue',
      subtitle: language === 'en' ? '24h maintenance fluid & IV drip rate (gtt/min)' : 'Kebutuhan cairan 24 jam & tetesan infus (TPM)',
      keywords: ['holliday', 'segar', 'tpm', 'tetesan', 'infus', 'cairan', 'drip', 'rumatan', '24 jam'],
    },
    {
      id: 'abl',
      label: t.allowable_blood_loss || (language === 'en' ? 'Allowable Blood Loss (ABL)' : 'Kehilangan Darah yang Diizinkan (ABL)'),
      shortName: 'ABL Transfusi',
      category: 'fluids',
      tag: language === 'en' ? 'Blood' : 'Darah',
      icon: Droplets,
      color: 'rose',
      subtitle: language === 'en' ? 'Maximum allowable bleeding before transfusion' : 'Ambang batas estimasi perdarahan sebelum transfusi',
      keywords: ['abl', 'darah', 'perdarahan', 'transfusi', 'hct', 'hematokrit', 'ebv', 'blood loss'],
    },

    // 3. Airway & Pulmonary
    {
      id: 'mallampati',
      label: t.mallampati_title || (language === 'en' ? 'Mallampati Airway Score' : 'Skor Airway Mallampati'),
      shortName: 'Mallampati',
      category: 'airway',
      tag: language === 'en' ? 'Airway' : 'Airway',
      icon: Stethoscope,
      color: 'cyan',
      subtitle: language === 'en' ? 'Oropharynx visibility & intubation difficulty' : 'Visualisasi struktur orofaring & kesulitan intubasi',
      keywords: ['mallampati', 'airway', 'intubasi', 'orofaring', 'uvula', 'faring', 'difficult'],
    },
    {
      id: 'ett',
      label: t.pediatric_ett || (language === 'en' ? 'Pediatric ETT Size & Depth' : 'Ukuran & Kedalaman ETT Pediatrik'),
      shortName: 'ETT Pediatrik',
      category: 'airway',
      tag: language === 'en' ? 'Pediatric' : 'Pediatrik',
      icon: Baby,
      color: 'cyan',
      subtitle: language === 'en' ? 'Cuffed/uncuffed endotracheal tube size & depth' : 'Ukuran pipa ETT (cuff/uncuffed) & batas kedalaman',
      keywords: ['ett', 'pediatrik', 'anak', 'cuff', 'uncuffed', 'kedalaman', 'intubasi', 'tube'],
    },
    {
      id: 'pf',
      label: t.pf_ratio || (language === 'en' ? 'PaO2/FiO2 Ratio (P/F Ratio)' : 'Rasio PaO2/FiO2 (Rasio P/F)'),
      shortName: 'Rasio P/F',
      category: 'airway',
      tag: language === 'en' ? 'Respiration' : 'Respirasi',
      icon: Wind,
      color: 'cyan',
      subtitle: language === 'en' ? 'Berlin criteria ARDS severity assessment' : 'Penilaian gangguan oksigenasi & derajat ARDS',
      keywords: ['pf', 'pao2', 'fio2', 'rasio', 'ards', 'oksigenasi', 'hipoksemia', 'berlin'],
    },
    {
      id: 'ag',
      label: t.alveolar_gas || (language === 'en' ? 'Alveolar Gas Equation' : 'Persamaan Gas Alveolar'),
      shortName: 'Gas Alveolar',
      category: 'airway',
      tag: language === 'en' ? 'Respiration' : 'Respirasi',
      icon: Wind,
      color: 'cyan',
      subtitle: language === 'en' ? 'PAO2 estimation & Alveolar-arterial (A-a) gradient' : 'Tekanan PAO2 & gradien oksigen A-a',
      keywords: ['alveolar', 'gas', 'pao2', 'a-a', 'gradien', 'ventilasi', 'rq', 'gradient'],
    },

    // 4. Cardio & Risk
    {
      id: 'map',
      label: t.map || (language === 'en' ? 'Mean Arterial Pressure (MAP)' : 'Tekanan Arteri Rata-Rata (MAP)'),
      shortName: 'MAP Arteri',
      category: 'cardio',
      tag: language === 'en' ? 'Hemodynamics' : 'Hemodinamik',
      icon: Activity,
      color: 'amber',
      subtitle: language === 'en' ? 'Vital organ perfusion pressure estimate' : 'Estimasi tekanan perfusi organ vital (target ≥65 mmHg)',
      keywords: ['map', 'tekanan', 'arteri', 'perfusi', 'tensi', 'sbp', 'dbp', 'mean arterial'],
    },
    {
      id: 'asa',
      label: t.asa_title || (language === 'en' ? 'ASA Physical Status Classification' : 'Klasifikasi Status Fisik ASA'),
      shortName: 'Status Fisik ASA',
      category: 'cardio',
      tag: language === 'en' ? 'Pre-op' : 'Pre-op',
      icon: ShieldAlert,
      color: 'amber',
      subtitle: language === 'en' ? 'Preoperative physical status & anesthesia risk' : 'Stratifikasi risiko pra-bedah anestesi ASA I-VI',
      keywords: ['asa', 'status fisik', 'pre-op', 'morbiditas', 'emergency', 'classification'],
    },

    // 5. Renal & Electrolytes
    {
      id: 'cg',
      label: t.creatinine_clearance || (language === 'en' ? 'Creatinine Clearance (Cockcroft-Gault)' : 'Klirens Kreatinin (Cockcroft-Gault)'),
      shortName: 'Cockcroft-Gault',
      category: 'renal',
      tag: language === 'en' ? 'Renal' : 'Ginjal',
      icon: FlaskConical,
      color: 'violet',
      subtitle: language === 'en' ? 'CrCl estimation for drug clearance & dosing' : 'Estimasi CrCl untuk penyesuaian dosis obat nefrotoksik',
      keywords: ['cockcroft', 'gault', 'crcl', 'klirens', 'kreatinin', 'ginjal', 'dosis', 'renal'],
    },
    {
      id: 'egfr',
      label: t.egfr_calculator || (language === 'en' ? 'eGFR (CKD-EPI)' : 'Kalkulator eGFR (CKD-EPI)'),
      shortName: 'eGFR (CKD-EPI)',
      category: 'renal',
      tag: language === 'en' ? 'Renal' : 'Ginjal',
      icon: FlaskConical,
      color: 'violet',
      subtitle: language === 'en' ? 'Estimated GFR (CKD-EPI 2021 formula)' : 'Laju filtrasi glomerulus berbasis rumus CKD-EPI',
      keywords: ['egfr', 'ckd', 'epi', 'filtrasi', 'glomerulus', 'ginjal', 'renal'],
    },
    {
      id: 'anion_gap',
      label: t.anion_gap_title || (language === 'en' ? 'Serum Anion Gap & Corrected Calcium' : 'Anion Gap & Kalsium Terkoreksi'),
      shortName: 'Anion Gap & Ca',
      category: 'renal',
      tag: language === 'en' ? 'Electrolytes' : 'Elektrolit',
      icon: FlaskConical,
      color: 'violet',
      subtitle: language === 'en' ? 'Metabolic acidosis & hypoalbuminemia correction' : 'Evaluasi asidosis metabolik & koreksi kalsium albumin',
      keywords: ['anion gap', 'ag', 'kalsium', 'albumin', 'asidosis', 'elektrolit', 'calcium'],
    },
  ], [t, language]);

  // Categories definition
  const categories = useMemo(() => [
    {
      id: 'all',
      label: language === 'en' ? 'All' : 'Semua',
      icon: Sparkles,
      count: calculators.length,
    },
    {
      id: 'fluids',
      label: language === 'en' ? 'Fluids & Blood' : 'Cairan & Darah',
      icon: Droplets,
      count: calculators.filter(c => c.category === 'fluids').length,
    },
    {
      id: 'airway',
      label: language === 'en' ? 'Airway & Lungs' : 'Airway & Paru',
      icon: Wind,
      count: calculators.filter(c => c.category === 'airway').length,
    },
    {
      id: 'dosing',
      label: language === 'en' ? 'Dosing & Body' : 'Dosis & Fisik',
      icon: Scale,
      count: calculators.filter(c => c.category === 'dosing').length,
    },
    {
      id: 'cardio',
      label: language === 'en' ? 'Cardio & Risk' : 'Kardio & Risiko',
      icon: HeartPulse,
      count: calculators.filter(c => c.category === 'cardio').length,
    },
    {
      id: 'renal',
      label: language === 'en' ? 'Renal & Labs' : 'Renal & Lab',
      icon: FlaskConical,
      count: calculators.filter(c => c.category === 'renal').length,
    },
  ], [calculators, language]);

  // Filtered calculators based on category and search query
  const filteredCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return calculators.filter((calc) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
      if (!matchesCategory) return false;

      // Query match
      if (!q) return true;
      return (
        calc.label.toLowerCase().includes(q) ||
        calc.shortName.toLowerCase().includes(q) ||
        calc.tag.toLowerCase().includes(q) ||
        calc.subtitle.toLowerCase().includes(q) ||
        calc.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });
  }, [calculators, selectedCategory, searchQuery]);

  // Active calculator item
  const activeCalculator = useMemo(() => {
    return calculators.find(c => c.id === activeTab) || calculators[0];
  }, [calculators, activeTab]);

  const ActiveIcon = activeCalculator.icon;

  return (
    <div className="space-y-3">
      {/* Active Calculator Header Banner with Collapsible Picker Toggle */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm transition-all">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50 dark:bg-blue-600/15 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 shrink-0 shadow-sm">
              <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9.5px] font-[800] uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/25">
                  {activeCalculator.tag}
                </span>
                <span className="text-[10.5px] font-[600] text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Active Calculator' : 'Kalkulator Aktif'}
                </span>
              </div>
              <h2 className="text-[14px] sm:text-[15px] font-[800] text-slate-900 dark:text-white tracking-tight truncate mt-0.5">
                {activeCalculator.label}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11.5px] sm:text-[12px] font-[700] transition-all shrink-0 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
          >
            <span>{isCollapsed ? (language === 'en' ? 'Browse All' : 'Pilih Lainnya') : (language === 'en' ? 'Collapse' : 'Sembunyikan')}</span>
            {isCollapsed ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Selector Section */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden space-y-3"
          >
            {/* Top Toolbar: Search Bar + Quick Category Filters */}
            <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/40 border border-slate-200 dark:border-white/[0.08] space-y-2.5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Search calculator (e.g. MAP, Holliday, ETT, ABL, CrCl)...'
                      : 'Cari kalkulator (misal: MAP, Holliday, ETT, ABL, CrCl)...'
                  }
                  className="w-full pl-9 pr-9 py-2 rounded-xl text-[12.5px] font-[500] bg-white dark:bg-[#0c121e]/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] sm:text-[11.5px] font-[700] whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm border border-blue-500'
                          : 'bg-white dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{cat.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                        isSelected ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculators Responsive Grid */}
            {filteredCalculators.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400">
                <Search className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                <p className="text-[13px] font-[600]">
                  {language === 'en' ? 'No calculators found' : 'Kalkulator tidak ditemukan'}
                </p>
                <p className="text-[11.5px] text-slate-500 mt-1">
                  {language === 'en'
                    ? `No result for "${searchQuery}". Try different keywords.`
                    : `Tidak ada hasil untuk "${searchQuery}". Coba kata kunci lain.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-3 px-3 py-1.5 rounded-lg text-[11.5px] font-[600] bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-white/10 transition-colors"
                >
                  {language === 'en' ? 'Reset search & filters' : 'Reset pencarian & filter'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredCalculators.map((calc) => {
                  const Icon = calc.icon;
                  const isActive = activeTab === calc.id;

                  return (
                    <motion.button
                      key={calc.id}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => onSelectTab(calc.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between group min-w-0 ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-indigo-500/15 dark:from-blue-600/25 dark:to-indigo-600/25 border-blue-500 text-slate-900 dark:text-white shadow-[0_0_16px_rgba(59,130,246,0.2)] ring-1 ring-blue-500/50'
                          : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/[0.06] hover:bg-slate-50/80 dark:hover:bg-white/[0.06] hover:border-blue-500/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {/* Top Row: Icon + Badge + Active indicator */}
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                              isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider truncate ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-400/30'
                                : 'bg-slate-50 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/[0.04]'
                            }`}
                          >
                            {calc.tag}
                          </span>
                        </div>

                        {isActive && (
                          <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-500/40">
                            <Check className="w-3 h-3 text-blue-600 dark:text-blue-300" />
                          </div>
                        )}
                      </div>

                      {/* Main Title & Subtitle */}
                      <div>
                        <div
                          className={`text-[12.5px] font-[700] leading-snug line-clamp-2 transition-colors ${
                            isActive ? 'text-blue-900 dark:text-white' : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white'
                          }`}
                        >
                          {calc.label}
                        </div>
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 leading-normal">
                          {calc.subtitle}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
