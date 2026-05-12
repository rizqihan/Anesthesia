'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Book, Search, WifiOff } from 'lucide-react';
import db from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';

export default function Icd10Page() {
  const { language } = useAppStore();
  const t = translations[language];
  const [icdSearch, setIcdSearch] = useState('');

  const filteredICD = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    if (!icdSearch) return [];
    const q = icdSearch.toLowerCase();
    return db.icd10.filter(item =>
      item.code.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.indonesian.toLowerCase().includes(q)
    ).limit(50).toArray();
  }, [icdSearch]);

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="icon-box" style={{ background: 'linear-gradient(135deg,#b45309,#f59e0b)', boxShadow: '0 0 16px rgba(245,158,11,0.35)' }}>
          <Book className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.icd10_search}</h1>
          <span className="badge-offline mt-0.5 inline-flex"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
        </div>
      </div>

      <div className="glass-card-static overflow-hidden">
        <div className="section-header">
          <Book className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <span className="section-header-label">{t.icd10_search}</span>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" value={icdSearch} onChange={(e) => setIcdSearch(e.target.value)} autoFocus
              className="glass-input w-full pl-9 pr-3 py-2.5 text-[13px] font-[500]"
              placeholder={t.search_icd} />
          </div>

          <AnimatePresence>
            {icdSearch && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-xl overflow-hidden divide-y divide-white/[0.06] max-h-[520px] overflow-y-auto" style={{ border: '1px solid var(--border-card)' }}>
                {filteredICD && filteredICD.length > 0 ? filteredICD.map((item, idx) => (
                  <motion.div key={item.code} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.3), duration: 0.25, ease: 'easeOut' }}
                    className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 transition-colors cursor-default"
                    style={{ background: 'var(--bg-card)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}>
                    <div className="flex items-center gap-3">
                      <span className="font-[800] text-[13px] w-16 shrink-0 font-mono" style={{ color: '#fbbf24' }}>{item.code}</span>
                      <span className="font-[500] text-[13px]" style={{ color: 'var(--text-primary)' }}>
                        {language === 'en' ? item.name : item.indonesian}
                      </span>
                    </div>
                    <span className="text-[11px] ml-[76px] sm:ml-0" style={{ color: 'var(--text-muted)' }}>
                      {language === 'en' ? item.indonesian : item.name}
                    </span>
                  </motion.div>
                )) : (
                  <div className="py-10 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
                    {language === 'en' ? 'No ICD-10 codes found.' : 'Tidak ada kode ICD-10 ditemukan.'}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!icdSearch && (
            <div className="py-10 text-center rounded-xl text-[12px]" style={{ border: '1px dashed rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>
              {t.search_icd}
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>{t.disclaimer}</div>
    </div>
  );
}
