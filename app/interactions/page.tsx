'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Pill, Cpu, ShieldAlert } from 'lucide-react';
import { generateAIResponse } from '@/lib/ai';

export default function InteractionsPage() {
  const { language, isOffline } = useAppStore();
  const t = translations[language];
  const [drugs, setDrugs] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!drugs.trim()) return;
    setLoading(true);
    setResult('');
    setError('');

    if (isOffline) {
      // Mock offline database for interaction
      setTimeout(() => {
        const query = drugs.toLowerCase();
        if (query.includes('aspirin') && query.includes('warfarin')) {
            setResult(language === 'en' 
                ? 'OFFLINE DATABASE MATCH: Severe interaction detected. Increased risk of bleeding. Use with extreme caution.' 
                : 'COCOK DENGAN DATABASE OFFLINE: Interaksi berat terdeteksi. Peningkatan risiko pendarahan. Gunakan dengan sangat hati-hati.');
        } else {
             setResult(language === 'en' 
                ? 'OFFLINE MODE: No offline match found for this combination. Please connect to internet for full AI analysis.' 
                : 'MODE OFFLINE: Tidak ditemukan kecocokan offline untuk kombinasi ini. Harap sambungkan ke internet untuk analisis AI lengkap.');
        }
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const prompt = `Act as a clinical pharmacologist. Check interactions for these drugs: "${drugs}". 
      Respond in ${language === 'en' ? 'English' : 'Indonesian'}. 
      Format:
      - Severity (Mild/Moderate/Severe)
      - Mechanism of Interaction
      - Clinical Management Recommendations
      Be concise. Include a disclaimer at the end.`;

      const responseText = await generateAIResponse(prompt);

      setResult(responseText);
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Failed to check interaction.' : 'Gagal mengecek interaksi.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.interaction_checker}</h2>
          <span className="inline-flex items-center space-x-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100">
            <Cpu className="w-3 h-3" />
            <span>{t.requires_ai}</span>
          </span>
        </div>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'Check pharmacological interactions.' : 'Cek interaksi farmakologis.'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden max-w-2xl">
        <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700">
          {language === 'en' ? 'Interaction Query' : 'Kueri Interaksi'}
        </div>
        <div className="p-3.5 flex flex-col gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.enter_drugs}</label>
            <input 
              type="text"
              value={drugs}
              onChange={(e) => setDrugs(e.target.value)}
              className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
              placeholder={language === 'en' ? "e.g., Amiodarone, Digoxin..." : "misal: Amiodaron, Digoksin..."}
            />
          </div>
          
          <button 
            onClick={handleCheck}
            disabled={loading || !drugs.trim()}
            className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="flex space-x-2 items-center">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                 <span>{language === 'en' ? 'Checking...' : 'Mengecek...'}</span>
              </div>
            ) : (
               <>
                 <ShieldAlert className="w-4 h-4" />
                 <span>{t.check_interactions}</span>
               </>
            )}
          </button>

          {error && (
            <div className="mt-2 p-3 text-[12px] text-red-700 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded">
              <h3 className="font-semibold text-[13px] border-b border-slate-200 pb-1 mb-2 text-slate-800">{t.result}</h3>
              <div className="text-[12px] text-slate-700 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-[11px] text-slate-400 max-w-2xl text-center mt-4">
        {t.disclaimer}
      </div>
    </div>
  );
}
