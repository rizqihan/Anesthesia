'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { FileText, X, Copy, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateStructuredSoapNote } from '@/lib/soapGenerator';

interface SOAPNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SOAPNoteModal({ isOpen, onClose }: SOAPNoteModalProps) {
  const { activeCase, patientLabs, language } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [additionalDiagnosis, setAdditionalDiagnosis] = useState('');
  const [planNotes, setPlanNotes] = useState('');
  const [format, setFormat] = useState<'plain' | 'markdown'>('plain');

  const isIndonesian = language === 'id';

  const { plainText, markdown, timestamp } = generateStructuredSoapNote({
    activeCase,
    patientLabs,
    additionalDiagnosis,
    planNotes,
    language,
  });

  const contentToCopy = format === 'plain' ? plainText : markdown;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([contentToCopy], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const prefix = isIndonesian ? 'SOAP_CPPT' : 'SOAP_Note';
    a.download = `${prefix}_${activeCase.patientAge || 'Pt'}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl bg-[#0c121e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#090e1a]/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-[15px] font-[800] text-slate-100 flex items-center gap-2">
                  <span>
                    {isIndonesian ? 'Catatan Perkembangan SOAP Terstruktur' : 'Structured SOAP Progress Note'}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {isIndonesian ? 'SIAP EHR / CPPT' : 'EHR READY'}
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isIndonesian
                    ? 'Disintesis dari parameter kasus aktif, lab, skor risiko & dosis darurat'
                    : 'Synthesized from active case, labs, risk scores & emergency orders'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Customization Toolbar */}
          <div className="px-5 py-3 bg-[#080d17]/60 border-b border-white/[0.05] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
            <div>
              <label className="text-[10px] font-[700] uppercase tracking-wider text-slate-400 mb-1 block">
                {isIndonesian ? 'Diagnosis Utama / Indikasi' : 'Primary Diagnosis / Indication'}
              </label>
              <input
                type="text"
                value={additionalDiagnosis}
                onChange={(e) => setAdditionalDiagnosis(e.target.value)}
                placeholder={isIndonesian ? 'cth. Apendisitis Akut / Syok Septik' : 'e.g. Acute Appendicitis / Septic Shock'}
                className="glass-input w-full px-2.5 py-1.5 text-[12px]"
              />
            </div>
            <div>
              <label className="text-[10px] font-[700] uppercase tracking-wider text-slate-400 mb-1 block">
                {isIndonesian ? 'Catatan Rencana Tambahan' : 'Additional Plan Notes'}
              </label>
              <input
                type="text"
                value={planNotes}
                onChange={(e) => setPlanNotes(e.target.value)}
                placeholder={isIndonesian ? 'cth. Puasa tengah malam, sampel darah terkirim' : 'e.g. NPO past midnight, Type & Screen sent'}
                className="glass-input w-full px-2.5 py-1.5 text-[12px]"
              />
            </div>
          </div>

          {/* Format Switcher */}
          <div className="flex items-center justify-between px-5 py-2 bg-white/[0.01] border-b border-white/[0.05] text-[11px]">
            <div className="flex rounded-lg p-0.5 bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => setFormat('plain')}
                className={`px-2.5 py-1 rounded-md font-[700] transition-colors ${
                  format === 'plain' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isIndonesian ? 'Teks Biasa (SIMRS / HIS)' : 'Plain Text (HIS / EHR)'}
              </button>
              <button
                type="button"
                onClick={() => setFormat('markdown')}
                className={`px-2.5 py-1 rounded-md font-[700] transition-colors ${
                  format === 'markdown' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Markdown
              </button>
            </div>

            <span className="text-slate-400 font-mono text-[10px]">{timestamp}</span>
          </div>

          {/* Note Preview Body */}
          <div className="p-5 flex-1 overflow-y-auto">
            <pre className="p-4 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11.5px] leading-relaxed text-slate-300 whitespace-pre-wrap select-all">
              {contentToCopy}
            </pre>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-3.5 border-t border-white/[0.08] bg-[#090e1a]/90 flex items-center justify-between gap-3">
            <button
              onClick={handleDownload}
              className="px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-[12px] font-[600] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>{isIndonesian ? 'Unduh .txt' : 'Download .txt'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-[12px] font-[600] text-slate-400 hover:text-white"
              >
                {isIndonesian ? 'Tutup' : 'Close'}
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                className="btn-primary px-4 py-2 text-[12.5px] font-[700] flex items-center gap-1.5 rounded-xl shadow-lg shadow-purple-600/30 bg-purple-600 hover:bg-purple-500"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{isIndonesian ? 'Tersalin ke Clipboard!' : 'Copied to Clipboard!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{isIndonesian ? 'Salin Catatan SOAP' : 'Copy SOAP Note'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
