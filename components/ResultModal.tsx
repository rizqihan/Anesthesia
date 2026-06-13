'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { translations } from '@/lib/i18n';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  queryLabel: string;
  queryText: string;
  resultLabel: string;
  markdownContent: string;
  onDownloadPDF: () => void;
  language: 'en' | 'id';
}

export default function ResultModal({
  isOpen,
  onClose,
  title,
  queryLabel,
  queryText,
  resultLabel,
  markdownContent,
  onDownloadPDF,
  language,
}: ResultModalProps) {
  const t = translations[language];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden z-10 glass-card-static border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between shrink-0 gap-4">
              <h2 className="text-[16px] md:text-[18px] font-[800] text-white leading-tight">
                {title}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onDownloadPDF}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-neutral-300 hover:text-white flex items-center gap-1.5 text-[12px] font-[600]"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="hidden sm:inline">{t.download_pdf}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-neutral-400 hover:text-white"
                  title={t.close}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Input Query Summary */}
              <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-extrabold mb-1">
                  {queryLabel}
                </h4>
                <p className="text-[13px] text-gray-300 font-[500] leading-relaxed">
                  {queryText}
                </p>
              </div>

              {/* AI Result Section */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-wider text-blue-400 font-extrabold flex items-center gap-1.5 border-b border-white/[0.05] pb-2">
                  <span className="status-dot status-dot-green" />
                  {resultLabel}
                </h4>
                <div className="text-[14px] leading-relaxed prose prose-invert prose-sm max-w-none prose-p:text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)] prose-table:border-collapse prose-th:border prose-th:border-white/10 prose-th:p-2 prose-td:border prose-td:border-white/10 prose-td:p-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/20 border-t border-white/[0.06] flex items-center justify-between shrink-0 text-[10px] text-gray-500">
              <span>{t.disclaimer}</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all text-[11px] font-[600]"
              >
                {t.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
