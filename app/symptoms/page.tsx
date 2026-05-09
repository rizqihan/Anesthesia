'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Activity, AlertTriangle, Cpu, WifiOff } from 'lucide-react';
import { generateAIResponse } from '@/lib/ai';

export default function SymptomCheckerPage() {
  const { language, isOffline } = useAppStore();
  const t = translations[language];
  const [symptom, setSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!symptom.trim()) return;
    setLoading(true);
    setResult('');
    setError('');

    if (isOffline) {
      setError(language === 'en' 
        ? 'OFFLINE MODE: Symptom Checker requires internet connection for AI analysis.' 
        : 'MODE OFFLINE: Pemeriksa Gejala memerlukan koneksi internet untuk analisis AI.');
      setLoading(false);
      return;
    }

    try {
      const prompt = `You are a medical assistant app tool used by doctors. The doctor is analyzing these symptoms: "${symptom}". 
      Respond in ${language === 'en' ? 'English' : 'Indonesian'}. 
      Provide a concise differential diagnosis, flag any red flags strictly, and recommend next steps. 
      Start with a medical disclaimer.`;

      const responseText = await generateAIResponse(prompt);

      setResult(responseText);
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Failed to process request. Please try again.' : 'Gagal memproses permintaan. Silakan coba lagi.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-[18px] font-bold text-slate-900">{t.symptom_checker}</h2>
          <div className="flex space-x-1.5">
            <span className="inline-flex items-center space-x-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100">
              <Cpu className="w-3 h-3" />
              <span>{t.requires_ai}</span>
            </span>
          </div>
        </div>
        <p className="text-slate-500 text-[13px]">
          {language === 'en' ? 'AI-powered diagnostic assistance.' : 'Bantuan diagnostik didukung AI.'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 flex flex-col overflow-hidden max-w-4xl">
        <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 uppercase tracking-[0.5px] text-[13px] font-bold text-slate-700">
          {language === 'en' ? 'Symptom Entry' : 'Entri Gejala'}
        </div>
        <div className="p-3.5 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.describe_symptoms}</label>
              <textarea 
                rows={5}
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="w-full rounded border border-slate-300 px-2 py-2 text-[13px] focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 resize-none"
                placeholder={language === 'en' ? "e.g., 45yo male presenting with sudden onset chest pain radiating to left arm..." : "misal: pria 45 tahun datang dengan keluhan nyeri dada mendadak menjalar ke lengan kiri..."}
              />
            </div>
            
            <button 
              onClick={handleAnalyze}
              disabled={loading || !symptom.trim()}
              className="w-full rounded bg-sky-600 text-white font-semibold py-2.5 text-[13px] hover:bg-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center space-x-2 mt-auto"
            >
              {loading ? (
                <div className="flex space-x-2 items-center">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                   <span>{language === 'en' ? 'Analyzing...' : 'Menganalisis...'}</span>
                </div>
              ) : (
                 <>
                   <Cpu className="w-4 h-4" />
                   <span>{t.analyze_symptoms}</span>
                 </>
              )}
            </button>
          </div>

          <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-4 flex flex-col">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {language === 'en' ? 'Possible Conditions' : 'Kemungkinan Kondisi'}
            </label>
            
            {!result && !error && !loading && (
               <div className="flex-1 flex items-center justify-center text-[12px] text-slate-400 border border-dashed border-slate-300 rounded bg-slate-50 p-4 text-center min-h-[150px]">
                 {language === 'en' ? 'Results will appear here.' : 'Hasil akan muncul di sini.'}
               </div>
            )}

            {error && (
                <div className="flex-1 p-3 text-[12px] text-red-700 bg-red-50 border border-red-200 rounded min-h-[150px]">
                    {error}
                </div>
            )}

            {result && (
              <div className="flex-1 bg-white border border-slate-300 rounded p-3 overflow-y-auto max-h-[300px]">
                <div className="text-[12px] text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-[11px] text-slate-400 max-w-4xl text-center mt-4">
        {t.disclaimer}
      </div>
    </div>
  );
}
