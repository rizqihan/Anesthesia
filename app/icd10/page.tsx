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
  const filteredICD = useLiveQuery(
    async () => {
      if (!icdSearch) return [];
      const query = icdSearch.toLowerCase();
      // Manual filter works well for partial word queries on small/medium DB
      return db.icd10
        .filter(item => 
          item.code.toLowerCase().includes(query) || 
          item.name.toLowerCase().includes(query) || 
          item.indonesian.toLowerCase().includes(query)
        )
        .limit(50)
        .toArray();
    },
    [icdSearch]
  );

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.icd10_search}</h2>
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
            <WifiOff className="w-3 h-3" />
            <span>{t.offline_capable}</span>
          </span>
        </div>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'Search for ICD-10 codes and conditions offline.' : 'Cari kode ICD-10 dan kondisi secara offline.'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden max-w-4xl shadow-sm">
        <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700 flex items-center space-x-2">
          <Book className="w-4 h-4 text-slate-500" />
          <span>{t.icd10_search}</span>
        </div>
        <div className="p-3.5 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text"
              value={icdSearch}
              onChange={(e) => setIcdSearch(e.target.value)}
              className="w-full rounded-md border border-slate-300 pl-9 pr-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-all font-medium"
              placeholder={t.search_icd}
              autoFocus
            />
          </div>
          
          <AnimatePresence>
            {icdSearch && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-slate-200 rounded divide-y divide-slate-100 bg-white max-h-[500px] overflow-y-auto"
              >
                {filteredICD && filteredICD.length > 0 ? (
                  filteredICD.map((item, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      key={item.code} 
                      className="px-3 py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-[13px] hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                         <span className="font-bold text-sky-700 w-14 shrink-0">{item.code}</span>
                         <span className="text-slate-800 font-medium">{language === 'en' ? item.name : item.indonesian}</span>
                      </div>
                      <span className="text-slate-500 text-[11px] mt-1 sm:mt-0">{language === 'en' ? item.indonesian : item.name}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-3 py-8 text-center text-[12px] text-slate-500">
                     {language === 'en' ? 'No ICD-10 codes found for your search.' : 'Tidak ada kode ICD-10 yang ditemukan.'}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {!icdSearch && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-slate-400 text-[12px] border border-dashed border-slate-200 rounded bg-slate-50"
            >
              {t.search_icd}
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="text-[11px] text-slate-400 max-w-4xl text-center mt-4">
        {t.disclaimer}
      </div>
    </div>
  );
}
