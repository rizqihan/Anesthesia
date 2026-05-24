'use client';

import React, { useState } from 'react';
import { translations } from '@/lib/i18n';
import { useAppStore } from '@/store/appStore';
import { X, Check, ExternalLink, Sparkles, Globe, ArrowRight, Plus, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { AISearchSource } from '@/lib/ai';
import type { UpdatedEntry } from '@/lib/syncAgent';

type DatasetType = 'icd10' | 'drugs' | 'guidelines' | 'physicalExams';

interface SyncReviewPanelProps {
  datasetType: DatasetType;
  newEntries: Record<string, unknown>[];
  updatedEntries: UpdatedEntry<Record<string, unknown>>[];
  sources: AISearchSource[];
  hasGrounding: boolean;
  onApprove: (newSelected: Record<string, unknown>[], updateSelected: Record<string, unknown>[]) => void;
  onDismiss: () => void;
}

const datasetColors: Record<DatasetType, string> = {
  icd10: '#fbbf24',
  drugs: '#a78bfa',
  guidelines: '#34d399',
  physicalExams: '#818cf8',
};

export default function SyncReviewPanel({
  datasetType,
  newEntries,
  updatedEntries,
  sources,
  hasGrounding,
  onApprove,
  onDismiss,
}: SyncReviewPanelProps) {
  const { language } = useAppStore();
  const t = translations[language];
  const color = datasetColors[datasetType];

  const totalCount = newEntries.length + updatedEntries.length;
  const [selectedNew, setSelectedNew] = useState<Set<number>>(() => new Set(newEntries.map((_, i) => i)));
  const [selectedUpdates, setSelectedUpdates] = useState<Set<number>>(() => new Set(updatedEntries.map((_, i) => i)));
  const [showSources, setShowSources] = useState(false);

  const totalSelected = selectedNew.size + selectedUpdates.size;

  const toggleNew = (idx: number) => {
    setSelectedNew(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; });
  };
  const toggleUpdate = (idx: number) => {
    setSelectedUpdates(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; });
  };
  const toggleAll = () => {
    if (totalSelected === totalCount) {
      setSelectedNew(new Set());
      setSelectedUpdates(new Set());
    } else {
      setSelectedNew(new Set(newEntries.map((_, i) => i)));
      setSelectedUpdates(new Set(updatedEntries.map((_, i) => i)));
    }
  };

  const handleApprove = () => {
    const selNew = newEntries.filter((_, i) => selectedNew.has(i));
    const selUpdated = updatedEntries.filter((_, i) => selectedUpdates.has(i)).map(u => u.new);
    onApprove(selNew, selUpdated);
  };

  // ─── Diff helper: highlight changed text ───
  const DiffText = ({ label, oldVal, newVal }: { label: string; oldVal: string; newVal: string }) => {
    if (oldVal === newVal) return null;
    return (
      <div className="mt-1.5">
        <span className="text-[9px] font-[700] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="px-2 py-1.5 rounded text-[11px] leading-relaxed"
            style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.12)', color: '#fca5a5' }}>
            <span className="text-[9px] font-[700] block mb-0.5" style={{ color: '#fb7185' }}>OLD</span>
            {oldVal}
          </div>
          <div className="px-2 py-1.5 rounded text-[11px] leading-relaxed"
            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)', color: '#86efac' }}>
            <span className="text-[9px] font-[700] block mb-0.5" style={{ color: '#34d399' }}>NEW</span>
            {newVal}
          </div>
        </div>
      </div>
    );
  };

  // ─── Render: new entry ───
  const renderNewEntry = (entry: Record<string, unknown>, idx: number) => {
    const isSelected = selectedNew.has(idx);
    const bgSelected = `${color}09`;
    const borderSelected = `${color}33`;

    return (
      <div key={`new-${idx}`} className="flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer"
        style={{ background: isSelected ? bgSelected : 'transparent', border: `1px solid ${isSelected ? borderSelected : 'var(--border-subtle)'}` }}
        onClick={() => toggleNew(idx)}>
        <Checkbox checked={isSelected} color={color} />
        <div className="flex-1 min-w-0">
          {datasetType === 'icd10' && renderICD10(entry as { code: string; name: string; indonesian: string })}
          {datasetType === 'drugs' && renderDrug(entry as { genericName: string; drugClass: string; brandNames: string[] })}
          {datasetType === 'guidelines' && renderGuideline(entry as { title: { en: string; id: string }; category: string; content: { en: string; id: string } })}
          {datasetType === 'physicalExams' && renderPhysicalExam(entry as any)}
        </div>
      </div>
    );
  };

  // ─── Render: updated entry with diff ───
  const renderUpdatedEntry = (update: UpdatedEntry<Record<string, unknown>>, idx: number) => {
    const isSelected = selectedUpdates.has(idx);

    return (
      <div key={`upd-${idx}`} className="p-3 rounded-lg transition-all cursor-pointer"
        style={{ background: isSelected ? 'rgba(59,130,246,0.05)' : 'transparent', border: `1px solid ${isSelected ? 'rgba(59,130,246,0.2)' : 'var(--border-subtle)'}` }}
        onClick={() => toggleUpdate(idx)}>
        <div className="flex items-start gap-3">
          <Checkbox checked={isSelected} color="#60a5fa" />
          <div className="flex-1 min-w-0">
            {datasetType === 'icd10' && renderICD10Diff(
              update.old as { code: string; name: string; indonesian: string },
              update.new as { code: string; name: string; indonesian: string },
            )}
            {datasetType === 'drugs' && renderDrugDiff(
              update.old as { id: string; genericName: string; drugClass: string; brandNames: string[]; indications: { en: string; id: string }; contraindications: { en: string; id: string } },
              update.new as { id: string; genericName: string; drugClass: string; brandNames: string[]; indications: { en: string; id: string }; contraindications: { en: string; id: string } },
            )}
            {datasetType === 'guidelines' && renderGuidelineDiff(
              update.old as { title: { en: string; id: string }; category: string; content: { en: string; id: string } },
              update.new as { title: { en: string; id: string }; category: string; content: { en: string; id: string } },
            )}
            {datasetType === 'physicalExams' && renderPhysicalExamDiff(update.old as any, update.new as any)}
          </div>
        </div>
      </div>
    );
  };

  // ─── Dataset-specific renderers ───
  const renderICD10 = (e: { code: string; name: string; indonesian: string }) => (
    <>
      <div className="flex items-center gap-2">
        <span className="font-mono font-[800] text-[12px]" style={{ color }}>{e.code}</span>
        <span className="font-[600] text-[12px]" style={{ color: 'var(--text-primary)' }}>{e.name}</span>
      </div>
      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{e.indonesian}</span>
    </>
  );

  const renderDrug = (e: { genericName: string; drugClass: string; brandNames: string[] }) => (
    <>
      <span className="font-[700] text-[13px]" style={{ color }}>{e.genericName}</span>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[11px] font-[600]" style={{ color: 'var(--text-secondary)' }}>{e.drugClass}</span>
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{e.brandNames?.join(', ')}</span>
      </div>
    </>
  );

  const renderGuideline = (e: any) => (
    <>
      <span className="font-[700] text-[13px]" style={{ color }}>{language === 'en' ? e.title?.en : e.title?.id}</span>
      <div className="mt-0.5 flex items-center gap-2">
        <span className="text-[11px] font-[600] px-1.5 py-0.5 rounded" style={{ background: `${color}18`, color }}>{e.category}</span>
      </div>
      <p className="text-[11px] mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? (e.definition?.en || e.content?.en) : (e.definition?.id || e.content?.id)}</p>
    </>
  );

  // ─── Diff renderers ───
  const renderICD10Diff = (o: { code: string; name: string; indonesian: string }, n: { code: string; name: string; indonesian: string }) => (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-mono font-[800] text-[12px]" style={{ color }}>{n.code}</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-[700]"
          style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
          <RefreshCw className="w-2.5 h-2.5" /> UPDATE
        </span>
      </div>
      <DiffText label="Name" oldVal={o.name} newVal={n.name} />
      <DiffText label="Indonesian" oldVal={o.indonesian} newVal={n.indonesian} />
    </div>
  );

  const renderDrugDiff = (
    o: { id: string; genericName: string; drugClass: string; brandNames: string[]; indications: { en: string; id: string }; contraindications: { en: string; id: string } },
    n: { id: string; genericName: string; drugClass: string; brandNames: string[]; indications: { en: string; id: string }; contraindications: { en: string; id: string } }
  ) => (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-[700] text-[13px]" style={{ color }}>{n.genericName}</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-[700]"
          style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
          <RefreshCw className="w-2.5 h-2.5" /> UPDATE
        </span>
      </div>
      <DiffText label={language === 'en' ? 'Indications' : 'Indikasi'} oldVal={language === 'en' ? o.indications?.en : o.indications?.id} newVal={language === 'en' ? n.indications?.en : n.indications?.id} />
      <DiffText label={language === 'en' ? 'Contraindications' : 'Kontraindikasi'} oldVal={language === 'en' ? o.contraindications?.en : o.contraindications?.id} newVal={language === 'en' ? n.contraindications?.en : n.contraindications?.id} />
      <DiffText label={language === 'en' ? 'Brands' : 'Merek'} oldVal={o.brandNames?.join(', ')} newVal={n.brandNames?.join(', ')} />
    </div>
  );

  const renderGuidelineDiff = (o: any, n: any) => (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-[700] text-[13px]" style={{ color }}>{language === 'en' ? n.title?.en : n.title?.id}</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-[700]"
          style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
          <RefreshCw className="w-2.5 h-2.5" /> UPDATE
        </span>
      </div>
      <DiffText label={language === 'en' ? 'Definition / Content' : 'Definisi / Konten'} oldVal={language === 'en' ? (o.definition?.en || o.content?.en) : (o.definition?.id || o.content?.id)} newVal={language === 'en' ? (n.definition?.en || n.content?.en) : (n.definition?.id || n.content?.id)} />
    </div>
  );

  const renderPhysicalExam = (e: any) => (
    <>
      <span className="font-[700] text-[13px]" style={{ color }}>{language === 'en' ? e.title?.en : e.title?.id}</span>
      <div className="mt-0.5 flex items-center gap-2">
        <span className="text-[11px] font-[600] px-1.5 py-0.5 rounded" style={{ background: `${color}18`, color }}>{e.category}</span>
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{e.steps?.length} {language === 'en' ? 'Steps' : 'Langkah'}</span>
      </div>
      <p className="text-[11px] mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{language === 'en' ? e.definition?.en : e.definition?.id}</p>
    </>
  );

  const renderPhysicalExamDiff = (o: any, n: any) => (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-[700] text-[13px]" style={{ color }}>{language === 'en' ? n.title?.en : n.title?.id}</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-[700]"
          style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
          <RefreshCw className="w-2.5 h-2.5" /> UPDATE
        </span>
      </div>
      <DiffText label={language === 'en' ? 'Definition' : 'Definisi'} oldVal={language === 'en' ? o.definition?.en : o.definition?.id} newVal={language === 'en' ? n.definition?.en : n.definition?.id} />
      <DiffText label={language === 'en' ? 'Steps Count' : 'Jumlah Langkah'} oldVal={o.steps?.length?.toString()} newVal={n.steps?.length?.toString()} />
    </div>
  );

  const datasetLabel = datasetType === 'icd10' ? t.icd10_dictionary : datasetType === 'drugs' ? t.drug_formulary : datasetType === 'guidelines' ? t.clinical_guidelines : t.physical_exam_title;

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
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
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
                {datasetLabel} — {newEntries.length} new, {updatedEntries.length} updated
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
                        {s.title || (() => { try { return new URL(s.url).hostname; } catch { return s.url; } })()}
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
            {totalSelected === totalCount ? t.deselect_all : t.select_all}
          </button>
          <span className="text-[11px] font-[600]" style={{ color: 'var(--text-secondary)' }}>
            {totalSelected}/{totalCount}
          </span>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto px-5 pb-3 space-y-2 min-h-0">
          {totalCount === 0 ? (
            <div className="py-12 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
              {t.no_new_data}
            </div>
          ) : (
            <>
              {/* Updated entries section */}
              {updatedEntries.length > 0 && (
                <>
                  <div className="flex items-center gap-2 pt-2 pb-1">
                    <RefreshCw className="w-3 h-3" style={{ color: '#60a5fa' }} />
                    <span className="text-[11px] font-[700] uppercase tracking-wider" style={{ color: '#60a5fa' }}>
                      {language === 'en' ? 'Updated' : 'Diperbarui'} ({updatedEntries.length})
                    </span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(96,165,250,0.15)' }} />
                  </div>
                  {updatedEntries.map((update, idx) => renderUpdatedEntry(update, idx))}
                </>
              )}

              {/* New entries section */}
              {newEntries.length > 0 && (
                <>
                  <div className="flex items-center gap-2 pt-2 pb-1">
                    <Plus className="w-3 h-3" style={{ color }} />
                    <span className="text-[11px] font-[700] uppercase tracking-wider" style={{ color }}>
                      {language === 'en' ? 'New' : 'Baru'} ({newEntries.length})
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${color}25` }} />
                  </div>
                  {newEntries.map((entry, idx) => renderNewEntry(entry, idx))}
                </>
              )}
            </>
          )}
        </div>

        {/* Action Bar */}
        <div className="p-4 flex gap-3 shrink-0" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onDismiss}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-[600] transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
            {t.dismiss}
          </button>
          <button onClick={handleApprove} disabled={totalSelected === 0}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-[700] transition-all disabled:opacity-40"
            style={{ background: `linear-gradient(135deg, ${color}dd, ${color})`, color: '#000', boxShadow: `0 0 20px ${color}30` }}>
            {t.approve_selected} ({totalSelected})
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Shared checkbox component ───
function Checkbox({ checked, color }: { checked: boolean; color: string }) {
  return (
    <div className="mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
      style={{ borderColor: checked ? color : 'rgba(255,255,255,0.2)', background: checked ? color : 'transparent' }}>
      {checked && <Check className="w-2.5 h-2.5 text-black" />}
    </div>
  );
}
