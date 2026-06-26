'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Book, Search, WifiOff, ArrowLeft, ChevronDown, ChevronRight, Folder, Database, Info } from 'lucide-react';
import db from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const CHAPTERS = [
  'Chapter I: Certain infectious and parasitic diseases',
  'Chapter II: Neoplasms',
  'Chapter III: Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism',
  'Chapter IV: Endocrine, nutritional and metabolic diseases',
  'Chapter V: Mental and behavioural disorders',
  'Chapter VI: Diseases of the nervous system',
  'Chapter VII: Diseases of the eye and adnexa',
  'Chapter VIII: Diseases of the ear and mastoid process',
  'Chapter IX: Diseases of the circulatory system',
  'Chapter X: Diseases of the respiratory system',
  'Chapter XI: Diseases of the digestive system',
  'Chapter XII: Diseases of the skin and subcutaneous tissue',
  'Chapter XIII: Diseases of the musculoskeletal system and connective tissue',
  'Chapter XIV: Diseases of the genitourinary system',
  'Chapter XV: Pregnancy, childbirth and the puerperium',
  'Chapter XVI: Certain conditions originating in the perinatal period',
  'Chapter XVII: Congenital malformations, deformations and chromosomal abnormalities',
  'Chapter XVIII: Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified',
  'Chapter XIX: Injury, poisoning and certain other consequences of external causes',
  'Chapter XX: External causes of morbidity and mortality',
  'Chapter XXI: Factors influencing health status and contact with health services',
  'Chapter XXII: Codes for special purposes'
];

export default function Icd10Page() {
  const store = useAppStore();
  const { language } = store;
  const t = translations[language];
  const [icdSearch, setIcdSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'browse'>('search');
  
  // Chapter browser states
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  // Search query
  const filteredICD = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    if (!icdSearch) return [];
    const q = icdSearch.toLowerCase();
    
    // Sort curated/matching codes first
    return db.icd10.filter(item => {
      const codeMatch = item.code.toLowerCase().includes(q);
      const nameMatch = item.name.toLowerCase().includes(q);
      const indoMatch = item.indonesian ? item.indonesian.toLowerCase().includes(q) : false;
      return codeMatch || nameMatch || indoMatch;
    }).limit(100).toArray();
  }, [icdSearch]);

  // Get code count in DB
  const totalCodesCount = useLiveQuery(async () => {
    if (typeof window === 'undefined') return 0;
    return db.icd10.count();
  }, []);

  // Fetch codes in selected chapter
  const chapterCodes = useLiveQuery(async () => {
    if (typeof window === 'undefined' || !expandedChapter) return [];
    return db.icd10.where('chapter').equals(expandedChapter).toArray();
  }, [expandedChapter]);

  // Group chapter codes by block
  const blocksMap = React.useMemo(() => {
    const map = new Map<string, typeof chapterCodes>();
    if (!chapterCodes) return map;
    for (const record of chapterCodes) {
      const block = record.block || 'Other';
      if (!map.has(block)) {
        map.set(block, []);
      }
      map.get(block)!.push(record);
    }
    return map;
  }, [chapterCodes]);

  const toggleChapter = (chapter: string) => {
    if (expandedChapter === chapter) {
      setExpandedChapter(null);
      setExpandedBlock(null);
    } else {
      setExpandedChapter(chapter);
      setExpandedBlock(null);
    }
  };

  const toggleBlock = (block: string) => {
    setExpandedBlock(expandedBlock === block ? null : block);
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-10">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="p-2 rounded-xl border border-white/[0.06] bg-[#0c121e]/80 hover:bg-white/5 transition-all text-gray-400 hover:text-white shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div className="icon-box" style={{ background: 'linear-gradient(135deg,#b45309,#f59e0b)', boxShadow: '0 0 16px rgba(245,158,11,0.35)' }}>
            <Book className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {t.icd10_search}
            </h1>
            <span className="badge-offline mt-0.5 inline-flex">
              <WifiOff className="w-2.5 h-2.5" />
              {t.offline_capable}
            </span>
          </div>
        </div>
        
        {totalCodesCount !== undefined && totalCodesCount > 0 && (
          <div className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-[#0f172a]/60 text-[11px] font-[700] text-amber-400 font-mono">
            {totalCodesCount.toLocaleString()} {language === 'en' ? 'Codes Loaded' : 'Kode Dimuat'}
          </div>
        )}
      </div>

      {/* ─── Tab Switcher ─── */}
      <div className="flex border-b border-white/[0.06] gap-6">
        <button
          onClick={() => setActiveTab('search')}
          className={`pb-2.5 text-[13px] font-[700] border-b-2 transition-all relative ${
            activeTab === 'search' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {language === 'en' ? 'Search Database' : 'Cari Database'}
        </button>
        <button
          onClick={() => setActiveTab('browse')}
          className={`pb-2.5 text-[13px] font-[700] border-b-2 transition-all relative ${
            activeTab === 'browse' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {language === 'en' ? 'Browse by Chapter' : 'Telusuri per Bab'}
        </button>
      </div>

      {/* ─── Search Tab ─── */}
      {activeTab === 'search' && (
        <div className="glass-card-static overflow-hidden">
          <div className="section-header">
            <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span className="section-header-label">
              {language === 'en' ? 'Search ICD-10 Registry' : 'Cari Registri ICD-10'}
            </span>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={icdSearch}
                onChange={(e) => setIcdSearch(e.target.value)}
                autoFocus
                className="glass-input w-full pl-9 pr-3 py-2.5 text-[13px] font-[500]"
                placeholder={t.search_icd}
              />
            </div>

            <AnimatePresence>
              {icdSearch && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="rounded-xl overflow-hidden divide-y divide-white/[0.06] max-h-[520px] overflow-y-auto"
                  style={{ border: '1px solid var(--border-card)' }}
                >
                  {filteredICD && filteredICD.length > 0 ? (
                    filteredICD.map((item) => (
                      <div
                        key={item.code}
                        className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors cursor-default"
                        style={{ background: 'var(--bg-card)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <span className="font-[850] text-[13px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[#fbbf24] font-mono shrink-0">
                            {item.code}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-[600] text-[13px]" style={{ color: 'var(--text-primary)' }}>
                              {item.name}
                            </span>
                            {item.indonesian && (
                              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                {item.indonesian}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.chapter && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 font-medium shrink-0 self-start sm:self-center">
                            {item.chapter.split(':')[0]}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      {language === 'en' ? 'No ICD-10 codes found.' : 'Tidak ada kode ICD-10 ditemukan.'}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!icdSearch && (
              <div
                className="py-12 text-center rounded-xl text-[12px] flex flex-col items-center justify-center gap-2"
                style={{ border: '1px dashed rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}
              >
                <Search className="w-5 h-5 opacity-40" />
                <span>{t.search_icd}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Browse Tab ─── */}
      {activeTab === 'browse' && (
        <div className="space-y-3">
          {/* Status Check if empty */}
          {totalCodesCount === 0 && (
            <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-[13px] text-yellow-200 flex gap-3 items-start">
              <Info className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-[700] mb-0.5">
                  {language === 'en' ? 'Database seeding in progress' : 'Penyemaian database sedang berlangsung'}
                </p>
                <p className="opacity-80 text-[12px]">
                  {language === 'en'
                    ? 'The full 10,400+ ICD-10 database is currently loading. Please check back in a few seconds.'
                    : 'Database lengkap 10.400+ ICD-10 sedang dimuat. Silakan periksa kembali beberapa detik lagi.'}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            {CHAPTERS.map((chapter) => {
              const isChapterExpanded = expandedChapter === chapter;
              return (
                <div key={chapter} className="glass-card-static overflow-hidden">
                  {/* Chapter Header */}
                  <button
                    onClick={() => toggleChapter(chapter)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-3.5 pr-4">
                      <Folder className={`w-4 h-4 mt-1 shrink-0 ${isChapterExpanded ? 'text-amber-400' : 'text-gray-400'}`} />
                      <span className="font-[700] text-[13px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {chapter}
                      </span>
                    </div>
                    {isChapterExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {/* Chapter Content */}
                  <AnimatePresence>
                    {isChapterExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/[0.06] bg-black/[0.15] overflow-hidden"
                      >
                        {chapterCodes && chapterCodes.length > 0 ? (
                          <div className="p-4 space-y-2">
                            {Array.from(blocksMap.keys()).sort().map((block) => {
                              const blockCodes = blocksMap.get(block) || [];
                              const isBlockExpanded = expandedBlock === block;
                              return (
                                <div
                                  key={block}
                                  className="rounded-lg border border-white/[0.04] bg-white/[0.01] overflow-hidden"
                                >
                                  {/* Block Header */}
                                  <button
                                    onClick={() => toggleBlock(block)}
                                    className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-white/[0.02]"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-[11px] font-[800] bg-white/[0.08] px-2 py-0.5 rounded font-mono text-amber-400">
                                        {block}
                                      </span>
                                      <span className="text-[12px] font-[600]" style={{ color: 'var(--text-secondary)' }}>
                                        {blockCodes.length} {language === 'en' ? 'codes' : 'kode'}
                                      </span>
                                    </div>
                                    {isBlockExpanded ? (
                                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                    )}
                                  </button>

                                  {/* Block Codes */}
                                  <AnimatePresence>
                                    {isBlockExpanded && (
                                      <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="divide-y divide-white/[0.04] bg-black/[0.2] overflow-hidden"
                                      >
                                        {blockCodes
                                          .sort((a, b) => a.code.localeCompare(b.code))
                                          .map((item) => (
                                            <div
                                              key={item.code}
                                              className="px-4 py-2 flex items-start gap-3 hover:bg-white/[0.02] transition-colors"
                                            >
                                              <span className="font-[800] text-[12px] font-mono text-amber-500/90 w-16 shrink-0 pt-0.5">
                                                {item.code}
                                              </span>
                                              <div className="flex flex-col">
                                                <span className="text-[12.5px] font-[500]" style={{ color: 'var(--text-primary)' }}>
                                                  {item.name}
                                                </span>
                                                {item.indonesian && (
                                                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                                    {item.indonesian}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="py-6 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
                            {language === 'en' ? 'No codes in this chapter.' : 'Tidak ada kode di bab ini.'}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
        {t.disclaimer}
      </div>
    </div>
  );
}
