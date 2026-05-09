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
  if (cat.includes('cardio')) return <HeartPulse className="w-5 h-5 text-rose-500" />;
  if (cat.includes('pulmonology') || cat.includes('respiratory')) return <Wind className="w-5 h-5 text-sky-500" />;
  if (cat.includes('obste') || cat.includes('pediat') || cat.includes('matern')) return <Baby className="w-5 h-5 text-pink-500" />;
  if (cat.includes('endocrin') || cat.includes('gastro')) return <Pill className="w-5 h-5 text-amber-500" />;
  return <Stethoscope className="w-5 h-5 text-indigo-500" />;
};

const getCategoryColor = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('cardio')) return 'bg-rose-50 text-rose-700 border-rose-100';
  if (cat.includes('pulmonology')) return 'bg-sky-50 text-sky-700 border-sky-100';
  if (cat.includes('obste')) return 'bg-pink-50 text-pink-700 border-pink-100';
  if (cat.includes('endocrin') || cat.includes('gastro')) return 'bg-amber-50 text-amber-700 border-amber-100';
  return 'bg-indigo-50 text-indigo-700 border-indigo-100';
};

export default function GuidelinesPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const [search, setSearch] = useState('');

  const guidelines = useLiveQuery(
    () => {
      if (typeof window === 'undefined') return [];
      if (!search.trim()) {
        return db.guidelines.limit(20).toArray();
      }
      return db.guidelines
        .filter(g => 
          g.title.en.toLowerCase().includes(search.toLowerCase()) || 
          g.title.id.toLowerCase().includes(search.toLowerCase())
        )
        .limit(20)
        .toArray();
    },
    [search]
  );

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.clinical_guidelines_title}</h2>
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
            <WifiOff className="w-3 h-3" />
            <span>{t.offline_capable}</span>
          </span>
        </div>
        <p className="text-slate-500 text-[13px]">
          {t.clinical_guidelines_desc}
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-lg">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-lg border border-slate-300 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 bg-white shadow-sm"
            placeholder={language === 'en' ? 'Search guidelines by title or keyword...' : 'Cari pedoman berdasarkan judul atau kata kunci...'}
          />
        </div>
      </div>

      <div className="relative min-h-[300px]">
        {!guidelines ? (
          <div className="absolute inset-0 flex items-center justify-center text-[14px] text-slate-500">
            <span className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin inline-block mr-3"></span>
            {language === 'en' ? 'Loading database...' : 'Memuat database...'}
          </div>
        ) : guidelines.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[14px] text-slate-500">
            <BookOpen className="w-10 h-10 text-slate-300 mb-3" />
            {language === 'en' ? 'No guidelines found.' : 'Tidak ada pedoman ditemukan.'}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            <AnimatePresence mode="popLayout">
              {guidelines.map(g => (
                <motion.div 
                  key={g.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col h-full group"
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                        {getCategoryIcon(g.category)}
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${getCategoryColor(g.category)}`}>
                        {g.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-3 group-hover:text-sky-700 transition-colors">
                      {language === 'en' ? g.title.en : g.title.id}
                    </h3>
                    
                    <p className="text-[13px] text-slate-600 leading-relaxed max-w-prose">
                      {language === 'en' ? g.content.en : g.content.id}
                    </p>
                  </div>
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-[12px] font-medium text-slate-500 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 hover:text-sky-600 cursor-pointer transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                      {language === 'en' ? 'Read full guideline' : 'Baca pedoman lengkap'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
