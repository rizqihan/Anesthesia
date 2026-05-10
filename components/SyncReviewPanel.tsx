'use client';

import React, { useState } from 'react';
import { translations } from '@/lib/i18n';
import { useAppStore } from '@/store/appStore';
import { X, Check, ExternalLink, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { AISearchSource } from '@/lib/ai';

type DatasetType = 'icd10' | 'drugs' | 'guidelines';

interface SyncReviewPanelProps {
  datasetType: DatasetType;
  entries: Record<string, unknown>[];
  sources: AISearchSource[];
  hasGrounding: boolean;
  onApprove: (selectedEntries: Record<string, unknown>[]) => void;
  onDismiss: () => void;
}

const datasetColors: Record<DatasetType, string> = {
  icd10: '#fbbf24',
  drugs: '#a78bfa',
  guidelines: '#34d399',
};

export default function SyncReviewPanel({
  datasetType,
  entries,
  sources,
  hasGrounding,
  onApprove,
  onDismiss,
}: SyncReviewPanelProps) {
  const { language } = useAppStore();
  const t = translations[language];
  const color = datasetColors[datasetType];

  const [selected, setSelected] = useState<Set<number>>(() => new Set(entries.map((_, i) => i)));
  const [showSources, setShowSources] = useState(false);

  const toggleItem = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === entries.length) setSelected(new Set());
    else setSelected(new Set(entries.map((_, i) => i)));
  };

  const handleApprove = () => {
    const selectedEntries = entries.filter((_, i) => selected.has(i));
    onApprove(selectedEntries);
  };

  const renderEntry = (entry: Record<string, unknown>, idx: number) => {
    const isSelected = selected.has(idx);

    if (datasetType === 'icd10') {
      const e = entry as { code: string; name: string; indonesian: string };
      return (
        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer"
          style={{
            background: isSelected ? 'rgba(251,191,36,0.06)' : 'transparent',
            border: `1px solid ${isSelected ? 'rgba(251,191,36,0.2)' : 'var(--border-subtle)'}`,
          }}
          onClick={() => toggleItem(idx)}>
          <div className="mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
            style={{
              borderColor: isSelected ? color : 'rgba(255,255,255,0.2)',
              background: isSelected ? color : 'transparent',
            }}>
            {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono font-[800] text-[12px]" style={{ color }}>{e.code}</span>
              <span className="font-[600] text-[12px]" style={{ color: 'var(--text-primary)' }}>{e.name}</span>
            </div>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{e.indonesian}</span>
          </div>
        </div>
      );
    }

    if (datasetType === 'drugs') {
      const e = entry as { id: string; genericName: string; drugClass: string; brandNames: string[] };
      return (
        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer"
          style={{
            background: isSelected ? 'rgba(167,139,250,0.06)' : 'transparent',
            border: `1px solid ${isSelected ? 'rgba(167,139,250,0.2)' : 'var(--border-subtle)'}`,
          }}
          onClick={() => toggleItem(idx)}>
          <div className="mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
            style={{
              borderColor: isSelected ? color : 'rgba(255,255,255,0.2)',
              background: isSelected ? color : 'transparent',
            }}>
            {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-[700] text-[13px]" style={{ color }}>{e.genericName}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-[600]" style={{ color: 'var(--text-secondary)' }}>{e.drugClass}</span>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{e.brandNames?.join(', ')}</span>
            </div>
          </div>
        </div>
      );
    }

    // guidelines
    const e = entry as { title: { en: string; id: string }; category: string; content: { en: string; id: string } };
    return (
      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer"
        style={{
          background: isSelected ? 'rgba(52,211,153,0.06)' : 'transparent',
          border: `1px solid ${isSelected ? 'rgba(52,211,153,0.2)' : 'var(--border-subtle)'}`,
        }}
        onClick={() => toggleItem(idx)}>
        <div className="mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
          style={{
            borderColor: isSelected ? color : 'rgba(255,255,255,0.2)',
            background: isSelected ? color : 'transparent',
          }}>
          {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-[700] text-[13px]" style={{ color }}>{language === 'en' ? e.title?.en : e.title?.id}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-[600] px-1.5 py-0.5 rounded" style={{ background: 'rgba(52,211,153,0.1)', color }}>{e.category}</span>
          </div>
          <p className="text-[11px] mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {language === 'en' ? e.content?.en : e.content?.id}
          </p>
        </div>
      </div>
    );
  };

  const datasetLabel = datasetType === 'icd10' ? t.icd10_dictionary : datasetType === 'drugs' ? t.drug_formulary : t.clinical_guidelines;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div className="p-5 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
              <Sparkles className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <h2 className="text-[15px] font-[800]" style={{ color: 'var(--text-primary)' }}>{t.review_results}</h2>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {datasetLabel} — {entries.length} {t.entries_found}
              </p>
            </div>
          </div>
          <button onClick={onDismiss} className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grounding Sources */}
        {sources.length > 0 && (
          <div className="px-5 pt-3 shrink-0">
            <button onClick={() => setShowSources(!showSources)}
              className="flex items-center gap-1.5 text-[11px] font-[600] transition-colors"
              style={{ color: 'var(--text-muted)' }}>
              <Globe className="w-3 h-3" />
              <span>{t.sources} ({sources.length})</span>
            </button>
            <AnimatePresence>
              {showSources && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-2">
                  <div className="flex flex-wrap gap-1.5 pb-2">
                    {sources.slice(0, 8).map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-[500] transition-colors"
                        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                        <ExternalLink className="w-2.5 h-2.5" />
                        {s.title || new URL(s.url).hostname}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* No live search warning */}
        {!hasGrounding && (
          <div className="mx-5 mt-3 px-3 py-2 rounded-lg text-[11px] font-[500] shrink-0"
            style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}>
            ⚠️ {t.no_live_search}
          </div>
        )}

        {/* Select All toggle */}
        <div className="px-5 pt-3 pb-1 flex items-center justify-between shrink-0">
          <button onClick={toggleAll} className="text-[11px] font-[600] transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            {selected.size === entries.length ? t.deselect_all : t.select_all}
          </button>
          <span className="text-[11px] font-[600]" style={{ color: 'var(--text-secondary)' }}>
            {selected.size}/{entries.length}
          </span>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto px-5 pb-3 space-y-2 min-h-0">
          {entries.length === 0 ? (
            <div className="py-12 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
              {t.no_new_data}
            </div>
          ) : (
            entries.map((entry, idx) => renderEntry(entry, idx))
          )}
        </div>

        {/* Action Bar */}
        <div className="p-4 flex gap-3 shrink-0" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onDismiss}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-[600] transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
            {t.dismiss}
          </button>
          <button onClick={handleApprove} disabled={selected.size === 0}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-[700] transition-all disabled:opacity-40"
            style={{ background: `linear-gradient(135deg, ${color}dd, ${color})`, color: '#000', boxShadow: `0 0 20px ${color}30` }}>
            {t.approve_selected} ({selected.size})
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
