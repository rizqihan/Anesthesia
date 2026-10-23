'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import {
  Pill,
  Search,
  WifiOff,
  AlertTriangle,
  BookOpen,
  Syringe,
  Filter,
  ArrowLeft,
  Zap,
  Clock,
  Target,
  Dna,
  Lightbulb,
  ShieldAlert,
  Flame,
  X
} from 'lucide-react';
import db from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const QUICK_FILTER_CLASSES = [
  { id: 'all', en: 'All Drugs', idLang: 'Semua Obat' },
  { id: 'high_risk', en: '⚠️ High-Alert', idLang: '⚠️ Risiko Tinggi' },
  { id: 'IV Hypnotic', en: 'IV Hypnotics', idLang: 'Hipnotik IV' },
  { id: 'Neuromuscular', en: 'Neuromuscular', idLang: 'Pelemas Otot' },
  { id: 'Volatile', en: 'Inhalational', idLang: 'Anestesi Inhalasi' },
  { id: 'Opioid', en: 'Opioids & Pain', idLang: 'Opioid & Nyeri' },
  { id: 'Local Anesthetic', en: 'Local Anesthetics', idLang: 'Anestesi Lokal' },
  { id: 'Vasopressor', en: 'Vasopressors / Inotropes', idLang: 'Vasopresor / Inotropik' },
  { id: 'Cardiovascular', en: 'Antiarrhythmic / BP', idLang: 'Antiaritmia / TD' },
  { id: 'Emergency', en: 'Emergency / Electrolytes', idLang: 'Darurat & Elektrolit' },
  { id: 'Sedative', en: 'Sedatives / Amnestic', idLang: 'Sedasi & Ansiolitik' },
  { id: 'Antiemetic', en: 'Antiemetic / PONV', idLang: 'Antiemetik / PONV' },
  { id: 'Hemostasis', en: 'Hemostasis & Reversal', idLang: 'Hemostasis & Reversal' },
  { id: 'Antibiotic', en: 'Antimicrobials', idLang: 'Antimikroba' }
];

export default function FormularyPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const [drugSearch, setDrugSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');

  const allDrugs = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    return await db.drugs.toArray();
  }, []) || [];

  const drugClasses = Array.from(new Set(allDrugs.map(d => d.drugClass))).sort();

  const filteredDrugs = allDrugs.filter(item => {
    // 1. Search filter
    if (drugSearch.trim()) {
      const q = drugSearch.toLowerCase().trim();
      const matchesGeneric = item.genericName.toLowerCase().includes(q);
      const matchesBrand = item.brandNames.some(b => b.toLowerCase().includes(q));
      const matchesClass = item.drugClass.toLowerCase().includes(q);
      const matchesIndication =
        item.indications.en.toLowerCase().includes(q) ||
        item.indications.id.toLowerCase().includes(q);
      const matchesPearl =
        item.clinicalPearls?.en.toLowerCase().includes(q) ||
        item.clinicalPearls?.id.toLowerCase().includes(q);
      if (!matchesGeneric && !matchesBrand && !matchesClass && !matchesIndication && !matchesPearl) {
        return false;
      }
    }

    // 2. Dropdown class filter
    if (selectedClass && item.drugClass !== selectedClass) {
      return false;
    }

    // 3. Quick filter pill
    if (quickFilter === 'high_risk') {
      return Boolean(item.highRisk);
    } else if (quickFilter === 'IV Hypnotic') {
      return item.drugClass.toLowerCase().includes('hypnotic') || item.drugClass.toLowerCase().includes('general anesthetic');
    } else if (quickFilter === 'Neuromuscular') {
      return item.drugClass.toLowerCase().includes('neuromuscular') || item.drugClass.toLowerCase().includes('reversal') || item.drugClass.toLowerCase().includes('anticholinesterase') || item.drugClass.toLowerCase().includes('anticholinergic');
    } else if (quickFilter === 'Volatile') {
      return item.drugClass.toLowerCase().includes('volatile') || item.drugClass.toLowerCase().includes('inhalation');
    } else if (quickFilter === 'Opioid') {
      return item.drugClass.toLowerCase().includes('opioid') || item.drugClass.toLowerCase().includes('analgesic') || item.drugClass.toLowerCase().includes('nsaid');
    } else if (quickFilter === 'Local Anesthetic') {
      return item.drugClass.toLowerCase().includes('local anesthetic') || item.drugClass.toLowerCase().includes('last antidote');
    } else if (quickFilter === 'Vasopressor') {
      return item.drugClass.toLowerCase().includes('vasopressor') || item.drugClass.toLowerCase().includes('inotrope') || item.drugClass.toLowerCase().includes('inodilator');
    } else if (quickFilter === 'Cardiovascular') {
      return item.drugClass.toLowerCase().includes('antiarrhythmic') || item.drugClass.toLowerCase().includes('vasodilator') || item.drugClass.toLowerCase().includes('blocker') || item.drugClass.toLowerCase().includes('arb');
    } else if (quickFilter === 'Emergency') {
      return item.drugClass.toLowerCase().includes('electrolyte') || item.drugClass.toLowerCase().includes('alkalinizing') || item.drugClass.toLowerCase().includes('carbohydrate');
    } else if (quickFilter === 'Sedative') {
      return item.drugClass.toLowerCase().includes('benzodiazepine') || item.drugClass.toLowerCase().includes('alpha-2') || item.drugClass.toLowerCase().includes('sedative');
    } else if (quickFilter === 'Antiemetic') {
      return item.drugClass.toLowerCase().includes('antiemetic') || item.drugClass.toLowerCase().includes('prokinetic') || item.drugClass.toLowerCase().includes('proton pump') || item.drugClass.toLowerCase().includes('corticosteroid');
    } else if (quickFilter === 'Hemostasis') {
      return item.drugClass.toLowerCase().includes('antifibrinolytic') || item.drugClass.toLowerCase().includes('heparin antidote') || item.drugClass.toLowerCase().includes('hemostatic') || item.drugClass.toLowerCase().includes('antiplatelet');
    } else if (quickFilter === 'Antibiotic') {
      return item.drugClass.toLowerCase().includes('antibiotic') || item.drugClass.toLowerCase().includes('antibacterial') || item.drugClass.toLowerCase().includes('antifungal') || item.drugClass.toLowerCase().includes('antiviral');
    }

    return true;
  });

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div
            className="icon-box"
            style={{
              background: 'linear-gradient(135deg,#5b21b6,#8b5cf6)',
              boxShadow: '0 0 16px rgba(139,92,246,0.35)'
            }}
          >
            <Pill className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {t.drug_formulary}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-bold">
                {allDrugs.length} {language === 'en' ? 'Drugs' : 'Obat'}
              </span>
            </div>
            <span className="badge-offline mt-0.5 inline-flex">
              <WifiOff className="w-2.5 h-2.5" />
              {t.offline_capable}
            </span>
          </div>
        </div>

        <Link
          href="/dosage"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[12px] font-[600] bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all shadow-sm"
        >
          <Syringe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'en' ? 'Dosage Calculator' : 'Kalkulator Dosis'}</span>
          <span className="sm:hidden">{language === 'en' ? 'Calc' : 'Kalk'}</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="glass-card-static overflow-hidden">
        <div className="section-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span className="section-header-label">
              {language === 'en' ? 'Acute Care & Hospital Formulary' : 'Formularium Anestesi & Rawat Kritis'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {filteredDrugs.length} / {allDrugs.length}
          </span>
        </div>

        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* Search Row */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                value={drugSearch}
                onChange={(e) => setDrugSearch(e.target.value)}
                autoFocus
                className="glass-input w-full pl-9 pr-8 py-2.5 text-[13px] font-[500]"
                placeholder={
                  language === 'en'
                    ? 'Search generic, brand names, indications, clinical pearls...'
                    : 'Cari nama generik, merek paten, indikasi, mutiara klinis...'
                }
              />
              {drugSearch && (
                <button
                  type="button"
                  onClick={() => setDrugSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 rounded-lg transition-all shrink-0"
              style={
                showFilters || selectedClass
                  ? { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', color: 'var(--text-muted)' }
              }
              title={language === 'en' ? 'Toggle Filter by Class' : 'Filter berdasarkan Kelas'}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Category Chips Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {QUICK_FILTER_CLASSES.map((chip) => {
              const isActive = quickFilter === chip.id;
              const isHighAlert = chip.id === 'high_risk';
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setQuickFilter(chip.id);
                    setSelectedClass('');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-[600] shrink-0 transition-all ${
                    isActive
                      ? isHighAlert
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                        : 'bg-violet-600/30 text-violet-200 border border-violet-500/40 shadow-sm'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 border border-white/[0.06]'
                  }`}
                >
                  {language === 'en' ? chip.en : chip.idLang}
                </button>
              );
            })}
          </div>

          {/* Expandable Class Dropdown Filter */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="p-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}
                >
                  <label className="form-label">{language === 'en' ? 'Specific Drug Class' : 'Kelas Obat Spesifik'}</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      if (e.target.value) setQuickFilter('all');
                    }}
                    className="glass-input w-full px-3 py-2 text-[13px]"
                  >
                    <option value="">{language === 'en' ? 'All Classes' : 'Semua Kelas'}</option>
                    {drugClasses.map((dc) => (
                      <option key={dc} value={dc}>
                        {dc}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results List */}
          <div
            className="rounded-xl overflow-hidden divide-y divide-white/[0.06] max-h-[720px] overflow-y-auto"
            style={{ border: '1px solid var(--border-card)' }}
          >
            {filteredDrugs.length > 0 ? (
              filteredDrugs.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col gap-3.5 transition-colors"
                  style={{ background: 'var(--bg-card)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
                >
                  {/* Card Top Row */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-[800] text-[16px] text-white tracking-tight">
                          {item.genericName}
                        </h3>
                        {item.highRisk && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-[800] tracking-wide uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40"
                            title={language === 'en' ? 'High-Alert Medication: Exercise High Vigilance' : 'Obat Kewaspadaan Tinggi (High-Alert)'}
                          >
                            <Flame className="w-2.5 h-2.5 text-rose-400" />
                            {language === 'en' ? 'High Alert' : 'Risiko Tinggi'}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span
                          className="inline-block px-2 py-0.5 rounded-md text-[10px] font-[600]"
                          style={{
                            background: 'rgba(139,92,246,0.15)',
                            color: '#c4b5fd',
                            border: '1px solid rgba(139,92,246,0.25)'
                          }}
                        >
                          {item.drugClass}
                        </span>
                        <div className="text-[12px] text-slate-300">
                          <span className="font-[600] text-slate-400">
                            {language === 'en' ? 'Brands: ' : 'Merek: '}
                          </span>
                          <span className="text-slate-200">{item.brandNames.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {item.dosing && (
                      <Link
                        href={`/dosage?drug=${item.id}`}
                        className="self-start shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-[600] transition-all bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300"
                      >
                        <Syringe className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Dosage Calculator' : 'Kalkulator Dosis'}</span>
                      </Link>
                    )}
                  </div>

                  {/* Pharmacokinetics Strip */}
                  {(item.onset || item.peak || item.duration || item.metabolism) && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px]">
                      {item.onset && (
                        <div className="flex items-start gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Onset</span>
                            <span className="text-slate-200 font-[500]">{item.onset}</span>
                          </div>
                        </div>
                      )}
                      {item.peak && (
                        <div className="flex items-start gap-1.5">
                          <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Peak</span>
                            <span className="text-slate-200 font-[500]">{item.peak}</span>
                          </div>
                        </div>
                      )}
                      {item.duration && (
                        <div className="flex items-start gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Duration</span>
                            <span className="text-slate-200 font-[500]">{item.duration}</span>
                          </div>
                        </div>
                      )}
                      {item.metabolism && (
                        <div className="flex items-start gap-1.5 col-span-2 sm:col-span-1">
                          <Dna className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Metabolism</span>
                            <span className="text-slate-200 font-[500] truncate block" title={item.metabolism}>
                              {item.metabolism}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dosing Section */}
                  {item.dosing && (
                    <div
                      className="p-3 rounded-lg text-[12px] flex flex-col gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Syringe className="w-3.5 h-3.5 text-sky-400" />
                          <span className="font-[700] text-sky-300">
                            {language === 'en' ? 'Standard Dosing: ' : 'Dosis Standar: '}
                          </span>
                          <span className="font-mono font-[700] text-white">
                            {item.dosing.dosePerKg} {item.dosing.unit}/kg
                          </span>
                          <span className="text-slate-400">({item.dosing.frequency})</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          Max: {item.dosing.maxDose} {item.dosing.unit}
                        </span>
                      </div>

                      {/* Bolus / Infusion Specific Callouts */}
                      {(item.dosing.bolusDose || item.dosing.infusionDose) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 pt-1.5 border-t border-white/[0.06]">
                          {item.dosing.bolusDose && (
                            <div className="text-[11.5px] text-cyan-200/90">
                              <span className="font-bold text-cyan-400">💉 Bolus: </span>
                              {item.dosing.bolusDose}
                            </div>
                          )}
                          {item.dosing.infusionDose && (
                            <div className="text-[11.5px] text-indigo-200/90">
                              <span className="font-bold text-indigo-400">💧 Infusion: </span>
                              {item.dosing.infusionDose}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-[11.5px] text-slate-300 italic mt-0.5">
                        {language === 'en' ? item.dosing.notes.en : item.dosing.notes.id}
                      </div>
                    </div>
                  )}

                  {/* Indications & Contraindications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <BookOpen className="w-3.5 h-3.5" style={{ color: '#34d399' }} />
                        <span className="text-[11px] font-[700]" style={{ color: '#34d399' }}>
                          {language === 'en' ? 'Indications' : 'Indikasi'}
                        </span>
                      </div>
                      <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? item.indications.en : item.indications.id}
                      </p>
                    </div>

                    <div
                      className="p-3 rounded-lg"
                      style={{ background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.15)' }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#fb7185' }} />
                        <span className="text-[11px] font-[700]" style={{ color: '#fb7185' }}>
                          {language === 'en' ? 'Contraindications & Safety Warnings' : 'Kontraindikasi & Peringatan Keamanan'}
                        </span>
                      </div>
                      <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? item.contraindications.en : item.contraindications.id}
                      </p>
                    </div>
                  </div>

                  {/* Clinical & Anesthesia Pearls */}
                  {item.clinicalPearls && (
                    <div className="p-3 rounded-lg bg-violet-950/20 border border-violet-500/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-[11px] font-[700] text-violet-300">
                          {language === 'en' ? 'Anesthesia & Clinical Pearls' : 'Mutiara Klinis & Anestesi'}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-300 leading-relaxed">
                        {language === 'en' ? item.clinicalPearls.en : item.clinicalPearls.id}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-[13px] text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p>{language === 'en' ? 'No matching medications found.' : 'Tidak ada obat yang cocok ditemukan.'}</p>
                <button
                  type="button"
                  onClick={() => {
                    setDrugSearch('');
                    setSelectedClass('');
                    setQuickFilter('all');
                  }}
                  className="mt-2 text-violet-400 hover:text-violet-300 text-[12px] underline"
                >
                  {language === 'en' ? 'Clear filters' : 'Hapus filter'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
