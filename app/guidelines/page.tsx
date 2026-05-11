'use client';

import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@/lib/db';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { BookOpen, Search, WifiOff, FileText, HeartPulse, Stethoscope, Wind, Baby, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('cardio')) return <HeartPulse className="w-5 h-5" style={{ color: '#fb7185' }} />;
  if (cat.includes('pulmonology') || cat.includes('respiratory')) return <Wind className="w-5 h-5" style={{ color: '#60a5fa' }} />;
  if (cat.includes('obste') || cat.includes('pediat') || cat.includes('matern')) return <Baby className="w-5 h-5" style={{ color: '#f472b6' }} />;
  if (cat.includes('endocrin') || cat.includes('gastro')) return <Pill className="w-5 h-5" style={{ color: '#fbbf24' }} />;
  return <Stethoscope className="w-5 h-5" style={{ color: '#a78bfa' }} />;
};

const getCategoryStyle = (category: string): { bg: string; border: string; color: string } => {
  const cat = category.toLowerCase();
  if (cat.includes('cardio')) return { bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.25)', color: '#fb7185' };
  if (cat.includes('pulmonology')) return { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', color: '#60a5fa' };
  if (cat.includes('obste')) return { bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.25)', color: '#f472b6' };
  if (cat.includes('endocrin') || cat.includes('gastro')) return { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', color: '#fbbf24' };
  return { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', color: '#a78bfa' };
};

export default function GuidelinesPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const [search, setSearch] = useState('');

  const guidelines = useLiveQuery(() => {
    if (typeof window === 'undefined') return [];
    if (!search.trim()) return db.guidelines.limit(20).toArray();
    return db.guidelines.filter(g =>
      g.title.en.toLowerCase().includes(search.toLowerCase()) ||
      g.title.id.toLowerCase().includes(search.toLowerCase())
    ).limit(20).toArray();
  }, [search]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="icon-box" style={{ background: 'linear-gradient(135deg,#0f766e,#14b8a6)', boxShadow: '0 0 16px rgba(20,184,166,0.35)' }}>
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.clinical_guidelines_title}</h1>
            <span className="badge-offline mt-0.5 inline-flex"><WifiOff className="w-2.5 h-2.5" />{t.offline_capable}</span>
          </div>
        </div>
        <div className="relative w-full sm:w-auto sm:min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            className="glass-input w-full pl-9 pr-3 py-2.5 text-[13px] font-[500]"
            placeholder={language === 'en' ? 'Search guidelines...' : 'Cari pedoman...'} />
        </div>
      </div>

      <div className="relative min-h-[300px]">
        {!guidelines ? (
          <div className="flex items-center justify-center gap-3 py-16">
            <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin-slow" style={{ borderColor: 'rgba(20,184,166,0.5)', borderTopColor: 'transparent' }} />
            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? 'Loading database...' : 'Memuat database...'}</span>
          </div>
        ) : guidelines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <BookOpen className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
            <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'No guidelines found.' : 'Tidak ada pedoman ditemukan.'}</span>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden" animate="show"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}>
            <AnimatePresence mode="popLayout">
              {guidelines.map(g => {
                const catStyle = getCategoryStyle(g.category);
                return (
                  <motion.div key={g.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                    className="glass-card flex flex-col h-full group cursor-default overflow-hidden">
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-xl transition-all group-hover:scale-105"
                          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}` }}>
                          {getCategoryIcon(g.category)}
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-[700] uppercase tracking-wider"
                          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color }}>
                          {g.category}
                        </span>
                      </div>
                      <h3 className="font-[700] text-[14px] leading-snug mb-3 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {language === 'en' ? g.title.en : g.title.id}
                      </h3>
                      <p className="text-[12px] leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'en' ? g.content.en : g.content.id}
                      </p>
                    </div>
                    <a
                      href={g.pdfUrl ? g.pdfUrl : `https://www.google.com/search?q=${encodeURIComponent(language === 'en' ? g.title.en : g.title.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 flex items-center gap-2 text-[11px] font-[500] transition-all block w-full"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = catStyle.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                      {g.pdfUrl ? (
                        <>
                          <FileText className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Read full guideline' : 'Baca pedoman lengkap'}</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Search on Google' : 'Cari di Google'}</span>
                        </>
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
