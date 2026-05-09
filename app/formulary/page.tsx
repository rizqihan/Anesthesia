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
  const [selectedClass, setSelectedClass] = useState<string>('');
  
  const drugClasses = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    const drugs = await db.drugs.toArray();
    const classes = new Set(drugs.map(d => d.drugClass));
    return Array.from(classes).sort();
  }, []) || [];
  
  const filteredDrugs = useLiveQuery(async () => {
    if (typeof window === 'undefined') return [];
    if (!drugSearch && !selectedClass) return [];
    
    let result = await db.drugs.toArray();
    
    if (selectedClass) {
      result = result.filter(item => item.drugClass === selectedClass);
    }
    
    if (drugSearch) {
      const query = drugSearch.toLowerCase();
      result = result.filter(
        item => item.genericName.toLowerCase().includes(query) || 
        item.brandNames.some(brand => brand.toLowerCase().includes(query))
      );
    }
    
    return result.slice(0, 50);
  }, [drugSearch, selectedClass]);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.drug_formulary}</h2>
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
            <WifiOff className="w-3 h-3" />
            <span>{t.offline_capable}</span>
          </span>
        </div>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'Search for generic and brand drugs, indications, and formulations offline.' : 'Cari obat generik dan paten, indikasi, serta formulasi secara offline.'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden max-w-4xl shadow-sm">
        <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700 flex items-center space-x-2">
          <Pill className="w-4 h-4 text-slate-500" />
          <span>{t.drug_formulary}</span>
        </div>
        <div className="p-3.5 flex flex-col gap-3">
          <div className="flex flex-col gap-2 relative">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  value={drugSearch}
                  onChange={(e) => setDrugSearch(e.target.value)}
                  className="w-full rounded-md border border-slate-300 pl-9 pr-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-all font-medium"
                  placeholder={language === 'en' ? 'Search generic or brand names...' : 'Cari nama generik atau paten...'}
                  autoFocus
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-md border transition-colors ${showFilters || selectedClass ? 'bg-sky-50 border-sky-200 text-sky-600' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'}`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-50 border border-slate-200 rounded-md p-3 overflow-hidden"
                >
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    {language === 'en' ? 'Drug Class' : 'Kelas Obat'}
                  </label>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full text-[13px] border-slate-300 rounded-md py-1.5 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                  >
                    <option value="">{language === 'en' ? 'All Classes' : 'Semua Kelas'}</option>
                    {drugClasses.map(dc => (
                      <option key={dc} value={dc}>{dc}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {(drugSearch || selectedClass) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-slate-200 rounded divide-y divide-slate-100 bg-white max-h-[600px] overflow-y-auto"
              >
                {filteredDrugs && filteredDrugs.length > 0 ? (
                  filteredDrugs.map((item, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={item.id} 
                      className="p-4 flex flex-col gap-2 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-sky-700 text-[15px]">{item.genericName}</h3>
                          <div className="text-[12px] text-slate-500 mt-0.5">
                            <span className="font-semibold text-slate-600">{language === 'en' ? 'Brands: ' : 'Merek: '}</span> 
                            {item.brandNames.join(', ')}
                          </div>
                        </div>
                        {item.dosing && (
                          <Link href={`/dosage?drug=${item.id}`} className="shrink-0 bg-sky-50 text-sky-600 hover:bg-sky-100 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors inline-flex items-center space-x-1 border border-sky-100">
                             <Syringe className="w-3 h-3" />
                             <span>{language === 'en' ? 'Dosage Calculator' : 'Kalkulator Dosis'}</span>
                          </Link>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                         <div className="bg-slate-50 rounded p-3 border border-slate-100">
                           <div className="flex items-center space-x-1 text-slate-700 font-semibold text-[12px] mb-1">
                             <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                             <span>{language === 'en' ? 'Indications' : 'Indikasi'}</span>
                           </div>
                           <p className="text-[12px] text-slate-600 leading-relaxed">
                             {language === 'en' ? item.indications.en : item.indications.id}
                           </p>
                         </div>
                         <div className="bg-rose-50 rounded p-3 border border-rose-100">
                           <div className="flex items-center space-x-1 text-rose-700 font-semibold text-[12px] mb-1">
                             <AlertTriangle className="w-3.5 h-3.5" />
                             <span>{language === 'en' ? 'Contraindications' : 'Kontraindikasi'}</span>
                           </div>
                           <p className="text-[12px] text-rose-600 leading-relaxed">
                             {language === 'en' ? item.contraindications.en : item.contraindications.id}
                           </p>
                         </div>
                      </div>
                      
                      {item.dosing && (
                        <div className="bg-white border text-slate-500 border-slate-200 rounded p-3 text-[12px]">
                          <span className="font-semibold text-slate-700">{language === 'en' ? 'Common Dose: ' : 'Dosis Umum: '}</span>
                          {item.dosing.dosePerKg} {item.dosing.unit}/kg ({item.dosing.frequency}). {language === 'en' ? item.dosing.notes.en : item.dosing.notes.id}
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="px-3 py-8 text-center text-[12px] text-slate-500">
                     {language === 'en' ? 'No drugs found for your search.' : 'Tidak ada obat yang ditemukan.'}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!(drugSearch || selectedClass) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-slate-400 text-[12px] border border-dashed border-slate-200 rounded bg-slate-50"
              >
                {language === 'en' ? 'Search or filter for a drug' : 'Cari atau filter obat'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
