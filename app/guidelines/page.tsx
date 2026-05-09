'use client';

import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@/lib/db';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { BookOpen, Search, WifiOff } from 'lucide-react';

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

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden max-w-4xl">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-[13px] rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
              placeholder={language === 'en' ? 'Search guidelines...' : 'Cari pedoman...'}
            />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {!guidelines ? (
            <div className="p-8 text-center text-[13px] text-slate-500">
              <span className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin inline-block mr-2 align-middle"></span>
              {language === 'en' ? 'Loading database...' : 'Memuat database...'}
            </div>
          ) : guidelines.length === 0 ? (
            <div className="p-8 text-center text-[13px] text-slate-500">
              {language === 'en' ? 'No guidelines found' : 'Tidak ada pedoman ditemukan'}
            </div>
          ) : (
            guidelines.map(g => (
               <div key={g.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex gap-2 items-start justify-between">
                     <span className="font-semibold text-sky-700 text-[14px]">
                       {language === 'en' ? g.title.en : g.title.id}
                     </span>
                     <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                        {g.category}
                     </span>
                  </div>
                  <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
                     {language === 'en' ? g.content.en : g.content.id}
                  </p>
               </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
