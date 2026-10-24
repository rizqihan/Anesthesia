'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, Database, ShieldCheck, Tag } from 'lucide-react';
import { APP_VERSION, BUILD_DATE, DB_SCHEMA_VERSION, RELEASE_NAME, APP_CHANGELOG } from '@/lib/version';

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'id';
}

export default function ReleaseNotesModal({ isOpen, onClose, language }: ReleaseNotesModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-purple-50/50 to-transparent dark:from-blue-950/40 dark:via-purple-950/20 dark:to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[16px] sm:text-[18px] font-[800] text-slate-900 dark:text-white">
                    {language === 'en' ? 'Version & Release Notes' : 'Versi & Catatan Rilis'}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-bold">
                    v{APP_VERSION}
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 font-medium">
                  {RELEASE_NAME} • {BUILD_DATE}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close release notes"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* System Spec Subheader */}
          <div className="px-5 py-2.5 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 gap-2">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Storage: Dexie IndexedDB v{DB_SCHEMA_VERSION}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Offline-First Clinical PWA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>React 19 • Next.js 16</span>
            </div>
          </div>

          {/* Scrollable Changelog List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar">
            {APP_CHANGELOG.map((rel) => (
              <div
                key={rel.version}
                className={`p-4 rounded-xl border transition-all ${
                  rel.highlight
                    ? 'bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-500/30 shadow-sm dark:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                    : 'bg-slate-50/50 border-slate-200 dark:bg-white/[0.02] dark:border-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] font-[800] text-blue-600 dark:text-blue-400">
                      v{rel.version}
                    </span>
                    {rel.highlight && (
                      <span className="text-[9px] font-[800] tracking-wide px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40">
                        {language === 'en' ? 'LATEST' : 'TERBARU'}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{rel.date}</span>
                </div>

                <h3 className="text-[13px] font-[700] text-slate-800 dark:text-slate-200 mb-2.5">
                  {rel.title}
                </h3>

                <ul className="space-y-1.5">
                  {rel.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#070c16] flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              © 2026 Anesthesia Clinical Assistant
            </span>
            <button
              onClick={onClose}
              className="btn-primary px-4 py-1.5 text-[12px] font-[700]"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
