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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={async () => {
                    const prefixes = ['Amox', 'Cef', 'Liso', 'Meto', 'Aten', 'Simva', 'Losa', 'Val', 'Ome', 'Panto', 'Lopa', 'Gaba', 'Pre', 'Flu', 'Ser'];
                    const suffixes = ['icillin', 'tazidime', 'pril', 'prolol', 'olol', 'statin', 'sartan', 'prazole', 'ramine', 'pentin', 'oxetine', 'traline'];
                    const classes = ['Antibiotic', 'Antihypertensive', 'Statin', 'PPI', 'Antidepressant', 'Analgesic'];
                    
                    const newDrugs = Array.from({length: 100}).map((_, i) => {
                      const idNum = Math.floor(Math.random() * 100000);
                      const pref = prefixes[Math.floor(Math.random() * prefixes.length)];
                      const suff = suffixes[Math.floor(Math.random() * suffixes.length)];
                      const cls = classes[Math.floor(Math.random() * classes.length)];
                      return {
                        id: `gen_drug_${idNum}`,
                        genericName: `${pref}${suff}`,
                        brandNames: [`${pref.toUpperCase()}MAX`, `${suff.toUpperCase()}PRO`],
                        drugClass: cls,
                        indications: { en: 'Standard clinical indication', id: 'Indikasi klinis standar' },
                        contraindications: { en: 'Hypersensitivity', id: 'Hipersensitivitas' },
                        dosing: { dosePerKg: 10, unit: 'mg', maxDose: 1000, frequency: 'daily', notes: { en: 'Take with food', id: 'Minum bersama makanan' } }
                      };
                    });
                    await db.drugs.bulkPut(newDrugs);
                    alert("Added 100 Realistic Drugs");
                  }}
                  className="rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2 text-[12px] hover:bg-slate-200 transition-colors focus:outline-none"
                >
                  +100 Drugs
                </button>
                <button
                  onClick={async () => {
                    const letters = ['I', 'J', 'E', 'M', 'K', 'N', 'L'];
                    const conditions = ['Disease', 'Disorder', 'Syndrome', 'Infection', 'Inflammation', 'Failure'];
                    const organs = ['Heart', 'Lung', 'Kidney', 'Liver', 'Digestive', 'Nervous System'];
                    const newIcd10 = Array.from({length: 100}).map((_, i) => {
                       const letter = letters[Math.floor(Math.random() * letters.length)];
                       const num = Math.floor(Math.random() * 99);
                       const organ = organs[Math.floor(Math.random() * organs.length)];
                       const cond = conditions[Math.floor(Math.random() * conditions.length)];
                       return {
                         code: `${letter}${num.toString().padStart(2, '0')}`,
                         name: `${organ} ${cond}`,
                         indonesian: `Penyakit ${organ} (${cond})` 
                       };
                    });
                    await db.icd10.bulkPut(newIcd10);
                    alert("Added 100 Realistic ICD-10");
                  }}
                  className="rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2 text-[12px] hover:bg-slate-200 transition-colors focus:outline-none"
                >
                  +100 ICD-10
                </button>
                <button
                  onClick={async () => {
                    const realGuidelines = [
                      { title: { en: 'KDIGO 2024 CKD Guideline', id: 'Pedoman PGK KDIGO 2024' }, category: 'Nephrology', content: { en: 'Comprehensive guidelines for the evaluation and management of Chronic Kidney Disease, emphasizing eGFR and albuminuria.', id: 'Pedoman komprehensif untuk evaluasi dan manajemen Penyakit Ginjal Kronis, menekankan eGFR dan albuminuria.' } },
                      { title: { en: 'AHA/ACC 2023 Coronary Disease', id: 'AHA/ACC 2023 Penyakit Koroner' }, category: 'Cardiology', content: { en: 'Guideline for the management of patients with chronic coronary disease, focusing on lifestyle, medical therapy, and revascularization.', id: 'Pedoman untuk manajemen pasien dengan penyakit koroner kronis, dengan fokus pada gaya hidup, terapi medis, dan revaskularisasi.' } },
                      { title: { en: 'IDSA/ATS 2019 CAP Guidelines', id: 'Pedoman CAP IDSA/ATS 2019' }, category: 'Pulmonology', content: { en: 'Diagnosis and treatment of adults with community-acquired pneumonia, including macrolide and beta-lactam recommendations.', id: 'Diagnosis dan pengobatan orang dewasa dengan pneumonia didapat dari komunitas, termasuk rekomendasi makrolida dan beta-laktam.' } },
                      { title: { en: 'WGO 2023 Probiotics & Prebiotics', id: 'WGO 2023 Probiotik & Prebiotik' }, category: 'Gastroenterology', content: { en: 'Global guidelines detailing evidence-based indications for probiotic and prebiotic strains in gastrointestinal disorders.', id: 'Pedoman global yang merinci indikasi berbasis bukti untuk strain probiotik dan prebiotik pada gangguan gastrointestinal.' } },
                      { title: { en: 'EASD/ADA 2022 Hyperglycemia', id: 'Hiperglikemia EASD/ADA 2022' }, category: 'Endocrinology', content: { en: 'Consensus report on the management of hyperglycemia in type 2 diabetes, highlighting weight management and cardiovascular risk.', id: 'Laporan konsensus tentang manajemen hiperglikemia pada diabetes tipe 2, menyoroti manajemen berat badan dan risiko kardiovaskular.' } },
                      { title: { en: 'GINA 2023 Asthma Strategy', id: 'Strategi Asma GINA 2023' }, category: 'Pulmonology', content: { en: 'Global strategy for asthma management and prevention, advocating against SABA-only treatment.', id: 'Strategi global untuk manajemen dan pencegahan asma, merekomendasikan untuk menghindari pengobatan hanya dengan SABA.' } },
                      { title: { en: 'GOLD 2024 COPD Strategy', id: 'Strategi PPOK GOLD 2024' }, category: 'Pulmonology', content: { en: 'Diagnosis, management, and prevention of COPD, introducing the ABE assessment tool and blood eosinophil guides.', id: 'Diagnosis, tata laksana, dan pencegahan PPOK, memperkenalkan alat penilaian ABE dan panduan eosinofil darah.' } },
                      { title: { en: 'AACE 2023 T2D Algorithm', id: 'Algoritma DM Tipe 2 AACE 2023' }, category: 'Endocrinology', content: { en: 'Comprehensive algorithm for type 2 diabetes management, featuring complication-centric approaches.', id: 'Algoritma komprehensif untuk manajemen diabetes tipe 2, menampilkan pendekatan yang berpusat pada komplikasi.' } },
                      { title: { en: 'ESC 2024 Hypertension', id: 'Hipertensi ESC 2024' }, category: 'Cardiology', content: { en: 'European guidelines for the management of elevated blood pressure and hypertension, updating target blood pressure goals.', id: 'Pedoman Eropa untuk manajemen tekanan darah tinggi dan hipertensi, memperbarui target pencapaian tekanan darah.' } },
                      { title: { en: 'ACOG Gestational Hypertension', id: 'Hipertensi Gestasional ACOG' }, category: 'Obstetrics', content: { en: 'Practice bulletin on the diagnosis and management of gestational hypertension and preeclampsia.', id: 'Buletin praktik tentang diagnosis dan pengelolaan hipertensi gestasional dan preeklamsia.' } }
                    ];
                    await db.guidelines.bulkAdd(realGuidelines);
                    alert("Added 10 Real Clinical Guidelines");
                  }}
                  className="rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2 text-[12px] hover:bg-slate-200 transition-colors focus:outline-none"
                >
                  +10 Guidelines
                </button>
                <button
                  onClick={async () => {
                    if (confirm("Clear all AI-generated test data?")) {
                      const drugs = await db.drugs.toArray();
                      const aiDrugs = drugs.filter(d => d.id?.startsWith('ai_') || d.id?.startsWith('gen_drug_')).map(d => d.id);
                      await db.drugs.bulkDelete(aiDrugs);

                      // Also let's just clear everything that has generic name starting with Amox, Cef, etc? No, standard wipe is fine.
                      const icds = await db.icd10.toArray();
                      // Delete anything not in the base DB (this is safe if users only use these buttons)
                      const baseIcdCodes = ['A09', 'E11', 'I10', 'J06.9', 'K21.9', 'J45'];
                      const mockIcds = icds.filter(d => d.code.startsWith('ai_') || d.code.startsWith('X') || !baseIcdCodes.includes(d.code)).map(d => d.code);
                      await db.icd10.bulkDelete(mockIcds);

                      const guidelines = await db.guidelines.toArray();
                      // Delete any guideline that has 'Mock guideline content' or was generated with 'Guideline ' prefix
                      const aiGuidelines = guidelines
                        .filter(d => 
                          d.content.en.includes('Mock guideline content') || 
                          d.title.en.includes('WHO Hand') || 
                          d.title.en.startsWith('Guideline ') || 
                          d.category === 'General Practice'
                        )
                        .map(d => d.id as number);
                      await db.guidelines.bulkDelete(aiGuidelines);

                      alert("Cleared Generated Data");
                    }
                  }}
                  className="rounded bg-red-50 text-red-600 border border-red-200 font-semibold py-2 text-[12px] hover:bg-red-100 transition-colors focus:outline-none"
                >
                  Clear Generated
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
