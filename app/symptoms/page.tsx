'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Activity, Cpu, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { generateAIResponse } from '@/lib/ai';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SymptomCheckerPage() {
  const { language, isOffline, symptomHistory, addSymptomHistory, clearSymptomHistory } = useAppStore();
  const t = translations[language];
  const [symptom, setSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!symptom.trim()) return;
    setLoading(true); setResult(''); setError('');
    if (isOffline) {
      setError(language === 'en' ? 'OFFLINE MODE: Requires internet for AI analysis.' : 'MODE OFFLINE: Memerlukan internet.');
      setLoading(false); return;
    }
    try {
      const prompt = `You are a medical assistant used by doctors. Analyze: "${symptom}". Respond in ${language === 'en' ? 'English' : 'Indonesian'}. Provide differential diagnosis, red flags, and next steps. Start with a disclaimer.`;
      const aiResponse = await generateAIResponse(prompt);
      setResult(aiResponse);
      addSymptomHistory({ query: symptom, result: aiResponse });
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Failed to analyze.' : 'Gagal menganalisis.'));
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="icon-box" style={{ background: 'linear-gradient(135deg,#047857,#10b981)', boxShadow: '0 0 16px rgba(16,185,129,0.35)' }}>
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.symptom_checker}</h1>
          <span className="badge-ai mt-0.5 inline-flex"><Cpu className="w-2.5 h-2.5" />{t.requires_ai}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="glass-card-static overflow-hidden">
          <div className="section-header">
            <span className="section-header-label">{language === 'en' ? 'Symptom Entry' : 'Entri Gejala'}</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <label className="form-label">{t.describe_symptoms}</label>
              <textarea rows={6} value={symptom} onChange={(e) => setSymptom(e.target.value)}
                className="glass-input w-full px-3 py-2.5 text-[13px] font-[500] resize-none"
                placeholder={language === 'en' ? 'e.g., 45yo male with sudden onset chest pain radiating to left arm, diaphoresis...' : 'mis: Pria 45 tahun, nyeri dada mendadak menjalar ke lengan kiri...'} />
            </div>
            <button type="button" onClick={handleAnalyze} disabled={loading || !symptom.trim()} className="btn-primary w-full py-2.5 text-[13px] flex items-center justify-center gap-2">
              {loading ? (<><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin-slow" /><span>{language === 'en' ? 'Analyzing...' : 'Menganalisis...'}</span></>) : (<><Cpu className="w-4 h-4" /><span>{t.analyze_symptoms}</span></>)}
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="glass-card-static overflow-hidden flex flex-col">
          <div className="section-header">
            <span className="section-header-label">{language === 'en' ? 'Possible Conditions' : 'Kemungkinan Kondisi'}</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {!result && !error && !loading && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center rounded-xl min-h-[160px]" style={{ border: '1px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'Results will appear here.' : 'Hasil akan muncul di sini.'}</p>
                </motion.div>
              )}
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center gap-3 min-h-[160px]">
                  <span className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin-slow" style={{ borderColor: 'rgba(16,185,129,0.6)', borderTopColor: 'transparent' }} />
                  <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{language === 'en' ? 'AI is thinking...' : 'AI sedang berpikir...'}</span>
                </motion.div>
              )}
              {error && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#fb7185' }} />
                  <span className="text-[12px]" style={{ color: '#fda4af' }}>{error}</span>
                </motion.div>
              )}
              {result && (
                <motion.div key="result" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="result-box overflow-y-auto max-h-[360px] flex-1">
                  <div className="text-[13px] leading-relaxed prose prose-invert prose-sm max-w-none prose-p:text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)]"><ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {symptomHistory.length > 0 && (
        <div className="glass-card-static overflow-hidden mt-4">
          <div className="section-header justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <span className="section-header-label">{t.history}</span>
            </div>
            <button onClick={clearSymptomHistory} className="text-[11px] font-[600] flex items-center gap-1.5 transition-colors hover:opacity-80" style={{ color: 'var(--accent-rose)' }}>
              <Trash2 className="w-3.5 h-3.5" />
              {t.clear_history}
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {symptomHistory.map((item) => (
              <div key={item.id} className="p-4 hover:bg-white/5 cursor-pointer transition-colors" onClick={() => { setSymptom(item.query); setResult(item.result); setError(''); }}>
                <div className="flex justify-between items-start mb-1.5 gap-4">
                  <span className="text-[13px] font-[600] leading-snug line-clamp-1" style={{ color: 'var(--text-primary)' }}>{item.query}</span>
                  <span className="text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>
                    {new Date(item.timestamp).toLocaleTimeString(language === 'en' ? 'en-US' : 'id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-[11px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {item.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>{t.disclaimer}</div>
    </div>
  );
}
