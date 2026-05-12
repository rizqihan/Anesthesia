'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Pill, Search, WifiOff, AlertTriangle, BookOpen, Syringe, Filter } from 'lucide-react';
import db from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function FormularyPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const [drugSearch, setDrugSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  const drugClasses = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    const drugs = await db.drugs.toArray();
    return Array.from(new Set(drugs.map(d => d.drugClass))).sort();
  }, []) || [];

  const filteredDrugs = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    if (!drugSearch && !selectedClass) return [];
    let result = await db.drugs.toArray();
    if (selectedClass) result = result.filter(item => item.drugClass === selectedClass);
    if (drugSearch) {
      const q = drugSearch.toLowerCase();
      result = result.filter(item => item.genericName.toLowerCase().includes(q) || item.brandNames.some(b => b.toLowerCase().includes(q)));
    }
    return result.slice(0, 50);
  }, [drugSearch, selectedClass]);

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="icon-box" style={{ background: 'linear-gradient(135deg,#5b21b6,#8b5cf6)', boxShadow: '0 0 16px rgba(139,92,246,0.35)' }}>
          <Pill className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.drug_formulary}</h1>
          <span className="badge-offline mt-0.5 inline-flex"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
        </div>
      </div>

      <div className="glass-card-static overflow-hidden">
        <div className="section-header">
          <Pill className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <span className="section-header-label">{t.drug_formulary}</span>
        </div>
        <div className="p-5 flex flex-col gap-3">
          {/* Search row */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="text" value={drugSearch} onChange={(e) => setDrugSearch(e.target.value)} autoFocus
                className="glass-input w-full pl-9 pr-3 py-2.5 text-[13px] font-[500]"
                placeholder={language === 'en' ? 'Search generic or brand names...' : 'Cari nama generik atau paten...'} />
            </div>
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 rounded-lg transition-all"
              style={showFilters || selectedClass ? { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', color: 'var(--text-muted)' }}>
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">{language === 'en' ? 'Drug Class' : 'Kelas Obat'}</label>
                  <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="glass-input w-full px-3 py-2 text-[13px]">
                    <option value="">{language === 'en' ? 'All Classes' : 'Semua Kelas'}</option>
                    {drugClasses.map(dc => (<option key={dc} value={dc}>{dc}</option>))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(drugSearch || selectedClass) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="rounded-xl overflow-hidden divide-y divide-white/[0.06] max-h-[600px] overflow-y-auto" style={{ border: '1px solid var(--border-card)' }}>
                {filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs.map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.04, 0.3), duration: 0.25, ease: 'easeOut' }}
                    className="p-4 flex flex-col gap-3 transition-colors" style={{ background: 'var(--bg-card)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-[700] text-[15px]" style={{ color: '#ffffff' }}>{item.genericName}</h3>
                        <span className="inline-block mt-1 mb-1 px-2 py-0.5 rounded-md text-[10px] font-[600]" style={{ background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.25)' }}>{item.drugClass}</span>
                        <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                          <span className="font-[600]" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'Brands: ' : 'Merek: '}</span>{item.brandNames.join(', ')}
                        </div>
                      </div>
                      {item.dosing && (
                        <Link href={`/dosage?drug=${item.id}`} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-[600] transition-all"
                          style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', color: '#38bdf8' }}>
                          <Syringe className="w-3 h-3" />
                          <span>{language === 'en' ? 'Dosage Calc' : 'Kalk. Dosis'}</span>
                        </Link>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <BookOpen className="w-3.5 h-3.5" style={{ color: '#34d399' }} />
                          <span className="text-[11px] font-[700]" style={{ color: '#34d399' }}>{language === 'en' ? 'Indications' : 'Indikasi'}</span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? item.indications.en : item.indications.id}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.15)' }}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#fb7185' }} />
                          <span className="text-[11px] font-[700]" style={{ color: '#fb7185' }}>{language === 'en' ? 'Contraindications' : 'Kontraindikasi'}</span>
                        </div>
                        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? item.contraindications.en : item.contraindications.id}</p>
                      </div>
                    </div>
                    {item.dosing && (
                      <div className="p-2.5 rounded-lg text-[12px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                        <span className="font-[600]" style={{ color: 'var(--text-primary)' }}>{language === 'en' ? 'Common Dose: ' : 'Dosis Umum: '}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.dosing.dosePerKg} {item.dosing.unit}/kg ({item.dosing.frequency}). {language === 'en' ? item.dosing.notes.en : item.dosing.notes.id}</span>
                      </div>
                    )}
                  </motion.div>
                )) : (
                  <div className="py-10 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'No drugs found.' : 'Tidak ada obat ditemukan.'}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!(drugSearch || selectedClass) && (
            <div className="py-10 text-center rounded-xl text-[12px]" style={{ border: '1px dashed rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>
              {language === 'en' ? 'Search or filter for a drug to get started' : 'Cari atau filter obat untuk memulai'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
