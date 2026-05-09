'use client';

import React from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Settings, Cpu, Wifi, WifiOff, AlertTriangle, Database } from 'lucide-react';
import db from '@/lib/db';
import { ICD10_DB } from '@/lib/icd10';
import { DRUG_DB } from '@/lib/drugs';
import { GUIDELINES_DB } from '@/lib/guidelines';

export default function SettingsPage() {
  const store = useAppStore();
  const t = translations[store.language];

  const isAiConfigured = () => {
    if (store.aiProvider === 'custom_gemini' && !store.customGeminiKey.trim()) return false;
    if (store.aiProvider === 'openai_compatible' && (!store.openaiEndpoint.trim() || !store.openaiKey.trim())) return false;
    return true;
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-slate-900 mb-1">{t.settings}</h2>
        <p className="text-slate-500 text-[13px]">
          {store.language === 'en' ? 'Manage your application preferences.' : 'Kelola preferensi aplikasi Anda.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden max-w-2xl">
          <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700 flex justify-between items-center">
            <span className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>{t.ai_config}</span>
            </span>
            <div className="flex items-center space-x-1 text-[11px] font-semibold">
              <span className="text-slate-500">{t.ai_status}:</span>
              {store.isOffline ? (
                <span className="text-red-600 flex items-center"><WifiOff className="w-3 h-3 mr-1"/> {t.offline}</span>
              ) : isAiConfigured() ? (
                <span className="text-green-600 flex items-center"><Wifi className="w-3 h-3 mr-1"/> {t.ready}</span>
              ) : (
                <span className="text-orange-600 flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> {t.missing_config}</span>
              )}
            </div>
          </div>
          <div className="p-3.5 flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.ai_provider}</label>
              <select
                value={store.aiProvider}
                onChange={(e) => store.setAiProvider(e.target.value as any)}
                className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 bg-white"
              >
                <option value="default_gemini">{t.default_gemini}</option>
                <option value="custom_gemini">{t.custom_gemini}</option>
                <option value="openai_compatible">{t.openai_compatible}</option>
              </select>
            </div>

            {store.aiProvider === 'custom_gemini' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.api_key} (Gemini)</label>
                <input 
                  type="password"
                  value={store.customGeminiKey}
                  onChange={(e) => store.setCustomGeminiKey(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                  placeholder="AIzaSy..."
                />
              </div>
            )}

            {store.aiProvider === 'openai_compatible' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.endpoint_url}</label>
                  <input 
                    type="text"
                    value={store.openaiEndpoint}
                    onChange={(e) => store.setOpenaiEndpoint(e.target.value)}
                    className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    placeholder="https://api.groq.com/openai/v1"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.api_key}</label>
                  <input 
                    type="password"
                    value={store.openaiKey}
                    onChange={(e) => store.setOpenaiKey(e.target.value)}
                    className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    placeholder="sk-..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.model_name}</label>
                  <input 
                    type="text"
                    value={store.openaiModel}
                    onChange={(e) => store.setOpenaiModel(e.target.value)}
                    className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    placeholder="llama-3.3-70b-versatile"
                  />
                </div>
              </div>
            )}

            <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 border border-slate-100 rounded">
              {store.language === 'en' ? 'Configuration is automatically saved to your local browser storage.' : 'Konfigurasi otomatis tersimpan di penyimpanan browser lokal Anda.'}
            </div>
          </div>
        </div>

        {/* Database Sync Card */}
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden max-w-2xl">
          <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700 flex justify-between items-center">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
              <span>{t.database_sync}</span>
            </span>
            <div className="flex items-center space-x-1 text-[11px] font-semibold">
              <span className="text-slate-500">{t.last_synced}:</span>
              <span className="text-slate-700">
                {store.lastSyncDate ? new Date(store.lastSyncDate).toLocaleDateString() : t.never_synced}
              </span>
            </div>
          </div>
          <div className="p-3.5 flex flex-col gap-4">
            <div className="border border-slate-200 rounded divide-y divide-slate-100 bg-white">
              <div className="px-3 py-2.5 flex items-center justify-between text-[13px]">
                <span className="font-semibold text-slate-700">{t.icd10_dictionary}</span>
                <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{t.up_to_date}</span>
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between text-[13px]">
                <span className="font-semibold text-slate-700">{t.drug_formulary}</span>
                <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{t.up_to_date}</span>
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between text-[13px]">
                <span className="font-semibold text-slate-700">{t.clinical_guidelines}</span>
                <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{t.up_to_date}</span>
              </div>
            </div>
            
            <button
              onClick={async () => {
                const btn = document.getElementById('sync-btn');
                if(btn){
                  btn.innerHTML = `<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block align-middle mr-2"></span>${t.syncing}`;
                  btn.setAttribute('disabled', 'true');
                  
                  try {
                    await db.icd10.bulkPut(ICD10_DB);
                    await db.drugs.bulkPut(DRUG_DB);
                    await db.guidelines.bulkPut(GUIDELINES_DB);
                    store.setLastSyncDate(new Date().toISOString());
                  } catch (e) {
                    console.error("Sync error", e);
                  }

                  setTimeout(() => {
                    btn.innerHTML = t.sync_now;
                    btn.removeAttribute('disabled');
                  }, 500);
                }
              }}
              id="sync-btn"
              className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
            >
              {t.sync_now}
            </button>

            <div className="pt-2 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Developer Data Generation (Offline DB)</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={async () => {
                    const newDrugs = Array.from({length: 100}).map((_, i) => {
                      const idNum = Math.floor(Math.random() * 100000);
                      return {
                        id: `gen_drug_${idNum}`,
                        genericName: `Generated Drug ${idNum}`,
                        brandNames: [`Brand ${idNum}`],
                        drugClass: 'Analgesic',
                        indications: { en: 'Pain relief', id: 'Pereda nyeri' },
                        contraindications: { en: 'None', id: 'Tidak ada' },
                        dosing: { 
                           dosePerKg: 10, 
                           unit: 'mg', 
                           maxDose: 1000, 
                           frequency: 'q8h',
                           notes: { en: 'Generated', id: 'Generated' }
                        }
                      };
                    });
                    await db.drugs.bulkPut(newDrugs);
                    alert("Added 100 drugs");
                  }}
                  className="rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2 text-[12px] hover:bg-slate-200 transition-colors focus:outline-none"
                >
                  +100 Drugs
                </button>
                <button
                  onClick={async () => {
                    const newIcd10 = Array.from({length: 100}).map((_, i) => {
                       const idNum = Math.floor(Math.random() * 900);
                       return {
                         code: `X${idNum}`,
                         name: `Generated condition ${idNum}`,
                         indonesian: `Kondisi buatan ${idNum}` 
                       };
                    });
                    await db.icd10.bulkPut(newIcd10);
                    alert("Added 100 ICD-10");
                  }}
                  className="rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2 text-[12px] hover:bg-slate-200 transition-colors focus:outline-none"
                >
                  +100 ICD-10
                </button>
                <button
                  onClick={async () => {
                    const newGuidelines = Array.from({length: 10}).map((_, i) => ({
                      title: { en: `Guideline ${i}`, id: `Panduan ${i}` },
                      category: 'General Practice',
                      content: { en: 'Mock guideline content...', id: 'Konten panduan buatan...' }
                    }));
                    await db.guidelines.bulkAdd(newGuidelines);
                    alert("Added 10 Guidelines");
                  }}
                  className="rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2 text-[12px] hover:bg-slate-200 transition-colors focus:outline-none"
                >
                  +10 Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
