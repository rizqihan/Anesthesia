'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/i18n';
import { Pill, Cpu, ShieldAlert, AlertCircle } from 'lucide-react';
import { generateAIResponse } from '@/lib/ai';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function InteractionsPage() {
  const { language, isOffline } = useAppStore();
  const t = translations[language];
  const [drugs, setDrugs] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!drugs.trim()) return;
    setLoading(true); setResult(''); setError('');
    if (isOffline) {
      setError(language === 'en' ? 'OFFLINE MODE: Requires internet for AI analysis.' : 'MODE OFFLINE: Memerlukan internet untuk analisis AI.');
      setLoading(false); return;
    }
    try {
      const prompt = `Act as a clinical pharmacologist. Check interactions for: "${drugs}". Respond in ${language === 'en' ? 'English' : 'Indonesian'}. Format: Severity, Mechanism, Management. Be concise. Add disclaimer.`;
      setResult(await generateAIResponse(prompt));
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Failed.' : 'Gagal.'));
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="icon-box" style={{ background: 'linear-gradient(135deg,#be123c,#f43f5e)', boxShadow: '0 0 16px rgba(244,63,94,0.35)' }}>
          <Pill className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[18px] font-[800] tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.interaction_checker}</h1>
          <span className="badge-ai mt-0.5 inline-flex"><Cpu className="w-2.5 h-2.5" />{t.requires_ai}</span>
        </div>
      </div>

      <div className="glass-card-static overflow-hidden">
        <div className="section-header">
          <ShieldAlert className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <span className="section-header-label">{language === 'en' ? 'Interaction Query' : 'Kueri Interaksi'}</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="form-label">{t.enter_drugs}</label>
            <input type="text" value={drugs} onChange={(e) => setDrugs(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              className="glass-input w-full px-3 py-2.5 text-[13px] font-[500]"
              placeholder={language === 'en' ? 'e.g., Amiodarone, Digoxin, Warfarin...' : 'mis: Amiodaron, Digoksin...'} />
          </div>
          <button type="button" onClick={handleCheck} disabled={loading || !drugs.trim()} className="btn-primary w-full py-2.5 text-[13px] flex items-center justify-center gap-2">
            {loading ? (<><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin-slow" /><span>{language === 'en' ? 'Analyzing...' : 'Menganalisis...'}</span></>) : (<><ShieldAlert className="w-4 h-4" /><span>{t.check_interactions}</span></>)}
          </button>
          <AnimatePresence>
            {error && (<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#fb7185' }} /><span className="text-[12px] leading-relaxed" style={{ color: '#fda4af' }}>{error}</span></motion.div>)}
            {result && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="result-box"><div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}><span className="status-dot status-dot-green" /><span className="text-[11px] font-[700] uppercase tracking-[1px]" style={{ color: 'var(--text-secondary)' }}>{t.result}</span></div><div className="text-[13px] leading-relaxed prose prose-invert prose-sm max-w-none prose-p:text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)]"><ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown></div></motion.div>)}
          </AnimatePresence>
        </div>
      </div>
      <div className="text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>{t.disclaimer}</div>
    </div>
  );
}
