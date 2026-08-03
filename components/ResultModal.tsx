'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileJson } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { translations } from '@/lib/i18n';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categoryTag?: string;
  statusTag?: string;
  agentName?: string;
  queryLabel: string;
  queryText: string;
  resultLabel: string;
  markdownContent: string;
  onDownloadPDF: () => void;
  onDownloadJSON?: () => void;
  language: 'en' | 'id';
}

export default function ResultModal({
  isOpen,
  onClose,
  title,
  categoryTag,
  statusTag,
  agentName,
  queryLabel,
  queryText,
  resultLabel,
  markdownContent,
  onDownloadPDF,
  onDownloadJSON,
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

  const handleJSONExport = () => {
    if (onDownloadJSON) {
      onDownloadJSON();
      return;
    }
    const reportData = {
      title,
      category: categoryTag || '',
      status: statusTag || '',
      agent: agentName || 'Anesthesia Agent',
      query: { label: queryLabel, content: queryText },
      result: { label: resultLabel, content: markdownContent },
      exportedAt: new Date().toISOString(),
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(reportData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

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
            <div className="p-5 border-b border-white/[0.06] flex items-start justify-between shrink-0 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {categoryTag && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded font-[800] uppercase tracking-wider bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {categoryTag}
                    </span>
                  )}
                  {statusTag && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-[800] tracking-wide bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {statusTag}
                    </span>
                  )}
                </div>
                <h2 className="text-[16px] md:text-[18px] font-[800] text-white leading-tight">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-all text-neutral-400 hover:text-white"
                title={t.close}
              >
                <X className="w-5 h-5" />
              </button>
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

              {/* Disclaimer inside content body */}
              <div className="pt-4 border-t border-white/[0.05] text-[10.5px] text-gray-500 leading-relaxed font-[500]">
                {t.disclaimer}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/20 border-t border-white/[0.06] flex items-center justify-between shrink-0">
              <span className="text-[10px] text-gray-500">
                {agentName || 'Anesthesia Agent v1.2'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onDownloadPDF}
                  className="px-3.5 py-2 rounded-xl text-[11.5px] font-[700] transition-all flex items-center gap-1.5 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer border border-white/[0.06]"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.download_pdf}</span>
                </button>
                <button
                  type="button"
                  onClick={handleJSONExport}
                  className="px-3.5 py-2 rounded-xl text-[11.5px] font-[700] transition-all flex items-center gap-1.5 text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer border border-emerald-500/20"
                >
                  <FileJson className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export JSON</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-[11.5px] font-[700] transition-all flex items-center gap-1.5 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
